"use strict";

/*
=========================================================
PETS & DOGUE
PROTECTED PARTNER OFFER REDEMPTION
=========================================================

Purpose:

- redeem an IN-STORE PETS & DOGUE Club discount
- accept a protected member barcode
- require protected partner/server authorization
- verify the barcode signature
- re-check the real Stripe subscription
- verify that the Club membership is active / trialing
- verify the offer in Supabase
- prevent repeat redemption where required
- mark the offer as redeemed only after confirmed scan

IMPORTANT:

This endpoint is NOT for public browser use.

A partner scanner / merchant portal will call this endpoint
through protected server-side authorization.

The barcode itself contains:
- no email
- no name
- no payment details

Expected new barcode format:

PD2-<HEX_SUBSCRIPTION_ID>-<EXPIRY_BASE36>-<SIGNATURE>

The offer ID is sent separately by the merchant scanner.

=========================================================
*/

const crypto =
  require("crypto");

const STRIPE_API_BASE =
  "https://api.stripe.com/v1";

const ACTIVE_MEMBERSHIP_STATUSES =
  new Set([
    "active",
    "trialing"
  ]);

const VALID_PLANS =
  new Set([
    "free",
    "monthly",
    "annual"
  ]);

/* =========================================================
RESPONSE
========================================================= */

function sendJson(
  res,
  status,
  payload
) {

  res.statusCode =
    status;

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store, max-age=0"
  );

  res.setHeader(
    "Pragma",
    "no-cache"
  );

  res.setHeader(
    "X-Content-Type-Options",
    "nosniff"
  );

  res.setHeader(
    "Referrer-Policy",
    "no-referrer"
  );

  res.end(
    JSON.stringify(
      payload
    )
  );

}

/* =========================================================
VALUES
========================================================= */

function cleanString(
  value,
  maxLength = 500
) {

  if (
    typeof value !==
      "string"
  ) {

    return "";

  }

  return value
    .trim()
    .slice(
      0,
      maxLength
    );

}

function validEmail(
  value
) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(
      String(
        value ||
        ""
      )
      .trim()
    );

}

function isUuid(
  value
) {

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    .test(
      String(
        value ||
        ""
      )
    );

}

function safeEqual(
  first,
  second
) {

  const a =
    Buffer.from(
      String(
        first ||
        ""
      )
    );

  const b =
    Buffer.from(
      String(
        second ||
        ""
      )
    );

  if (
    a.length !==
      b.length
  ) {

    return false;

  }

  return crypto
    .timingSafeEqual(
      a,
      b
    );

}

/* =========================================================
BODY
========================================================= */

async function readRequestBody(
  req
) {

  if (
    req.body &&
    typeof req.body ===
      "object"
  ) {

    return req.body;

  }

  if (
    typeof req.body ===
      "string"
  ) {

    if (
      req.body.length >
        20000
    ) {

      throw new Error(
        "Request body is too large."
      );

    }

    if (
      !req.body.trim()
    ) {

      return {};

    }

    try {

      return JSON.parse(
        req.body
      );

    } catch {

      return {};

    }

  }

  const chunks =
    [];

  let total =
    0;

  for await (
    const chunk of req
  ) {

    const buffer =
      Buffer.isBuffer(
        chunk
      )
        ? chunk
        : Buffer.from(
            chunk
          );

    total +=
      buffer.length;

    if (
      total >
        20000
    ) {

      throw new Error(
        "Request body is too large."
      );

    }

    chunks.push(
      buffer
    );

  }

  if (
    !chunks.length
  ) {

    return {};

  }

  const raw =
    Buffer
      .concat(
        chunks
      )
      .toString(
        "utf8"
      )
      .trim();

  if (
    !raw
  ) {

    return {};

  }

  try {

    return JSON.parse(
      raw
    );

  } catch {

    return {};

  }

}

/* =========================================================
PARTNER REDEMPTION SECRET
========================================================= */

function getRedeemSecret() {

  return cleanString(
    process.env
      .PETS_DOGUE_REDEEM_SECRET ||
    "",
    2000
  );

}

function readAuthorizationSecret(
  req
) {

  const authorization =
    cleanString(
      req.headers?.authorization ||
      "",
      2200
    );

  if (
    authorization
      .toLowerCase()
      .startsWith(
        "bearer "
      )
  ) {

    return authorization
      .slice(
        7
      )
      .trim();

  }

  return cleanString(
    req.headers?.[
      "x-pets-dogue-redeem-key"
    ] ||
    "",
    2000
  );

}

function verifyPartnerAuthorization(
  req
) {

  const configured =
    getRedeemSecret();

  if (
    configured.length <
      32
  ) {

    return {

      ok:
        false,

      configured:
        false

    };

  }

  const supplied =
    readAuthorizationSecret(
      req
    );

  if (
    !supplied
  ) {

    return {

      ok:
        false,

      configured:
        true

    };

  }

  return {

    ok:
      safeEqual(
        supplied,
        configured
      ),

    configured:
      true

  };

}

/* =========================================================
SESSION / VOUCHER SECRET
========================================================= */

function getCookieSecret(
  stripeSecretKey
) {

  const configured =
    cleanString(
      process.env
        .PETS_DOGUE_SESSION_SECRET ||
      "",
      1000
    );

  if (
    configured.length >=
      32
  ) {

    return configured;

  }

  return crypto
    .createHash(
      "sha256"
    )
    .update(
      `pets-dogue-club-cookie:${stripeSecretKey}`
    )
    .digest(
      "hex"
    );

}

function getVoucherSecret(
  stripeSecretKey
) {

  const configured =
    cleanString(
      process.env
        .PETS_DOGUE_VOUCHER_SECRET ||
      "",
      1000
    );

  if (
    configured.length >=
      32
  ) {

    return configured;

  }

  const sessionSecret =
    getCookieSecret(
      stripeSecretKey
    );

  return crypto
    .createHash(
      "sha256"
    )
    .update(
      `pets-dogue-voucher:${sessionSecret}`
    )
    .digest(
      "hex"
    );

}

/* =========================================================
BARCODE
========================================================= */

function decodeSubscriptionIdHex(
  value
) {

  const hex =
    cleanString(
      value,
      300
    )
    .toUpperCase();

  if (
    !hex ||
    hex.length %
      2 !==
      0 ||
    !/^[0-9A-F]+$/
      .test(
        hex
      )
  ) {

    return "";

  }

  try {

    const subscriptionId =
      Buffer
        .from(
          hex,
          "hex"
        )
        .toString(
          "utf8"
        );

    if (
      !subscriptionId
        .startsWith(
          "sub_"
        )
    ) {

      return "";

    }

    return subscriptionId;

  } catch {

    return "";

  }

}

function parseBarcode(
  value
) {

  const barcode =
    cleanString(
      value,
      600
    )
    .toUpperCase();

  const match =
    barcode.match(
      /^PD2-([0-9A-F]+)-([0-9A-Z]+)-([0-9A-F]{24})$/
    );

  if (
    !match
  ) {

    return {

      ok:
        false,

      reason:
        "format"

    };

  }

  const subscriptionId =
    decodeSubscriptionIdHex(
      match[1]
    );

  if (
    !subscriptionId
  ) {

    return {

      ok:
        false,

      reason:
        "subscription"

    };

  }

  const expiresAt =
    parseInt(
      match[2],
      36
    );

  if (
    !Number.isFinite(
      expiresAt
    )
  ) {

    return {

      ok:
        false,

      reason:
        "expiry"

    };

  }

  if (
    expiresAt <=
      Math.floor(
        Date.now() /
        1000
      )
  ) {

    return {

      ok:
        false,

      reason:
        "expired",

      expiresAt

    };

  }

  return {

    ok:
      true,

    subscriptionId,

    expiresAt,

    signature:
      match[3]

  };

}

function createExpectedBarcodeSignature(
  offerId,
  subscriptionId,
  expiresAt,
  secret
) {

  return crypto
    .createHmac(
      "sha256",
      secret
    )
    .update(
      [
        offerId,
        subscriptionId,
        expiresAt
      ].join("|")
    )
    .digest(
      "hex"
    )
    .slice(
      0,
      24
    )
    .toUpperCase();

}

function verifyBarcodeSignature(
  parsedBarcode,
  offerId,
  voucherSecret
) {

  const expected =
    createExpectedBarcodeSignature(
      offerId,
      parsedBarcode.subscriptionId,
      parsedBarcode.expiresAt,
      voucherSecret
    );

  return safeEqual(
    parsedBarcode.signature,
    expected
  );

}

/* =========================================================
STRIPE
========================================================= */

async function stripeRequest(
  path,
  secretKey
) {

  const response =
    await fetch(
      `${STRIPE_API_BASE}${path}`,
      {

        method:
          "GET",

        headers: {

          Authorization:
            `Bearer ${secretKey}`

        }

      }
    );

  let data =
    null;

  try {

    data =
      await response.json();

  } catch {

    data =
      null;

  }

  if (
    !response.ok
  ) {

    const error =
      new Error(
        data?.error?.message ||
        "Stripe request failed."
      );

    error.status =
      response.status;

    throw error;

  }

  return data;

}

/* =========================================================
PLAN
========================================================= */

function getExpectedPlan(
  plan
) {

  if (
    plan ===
      "free" ||
    plan ===
      "monthly"
  ) {

    return {

      amount:
        100,

      interval:
        "month"

    };

  }

  if (
    plan ===
      "annual"
  ) {

    return {

      amount:
        1000,

      interval:
        "year"

    };

  }

  return null;

}

/* =========================================================
VERIFY REAL STRIPE MEMBERSHIP
========================================================= */

async function verifyStripeMembership(
  subscriptionId,
  secretKey
) {

  const subscription =
    await stripeRequest(
      `/subscriptions/${encodeURIComponent(
        subscriptionId
      )}?expand[]=items.data.price`,
      secretKey
    );

  if (
    !subscription ||
    subscription.object !==
      "subscription"
  ) {

    return {
      active: false
    };

  }

  const metadata =
    subscription.metadata ||
    {};

  if (
    metadata.source !==
      "pets_dogue_club"
  ) {

    return {
      active: false
    };

  }

  if (
    metadata.access_scope !==
      "all_club_benefits"
  ) {

    return {
      active: false
    };

  }

  if (
    metadata.special_offers_access !==
      "all"
  ) {

    return {
      active: false
    };

  }

  const status =
    cleanString(
      subscription.status ||
      "",
      50
    )
    .toLowerCase();

  if (
    !ACTIVE_MEMBERSHIP_STATUSES.has(
      status
    )
  ) {

    return {

      active:
        false,

      status

    };

  }

  const plan =
    cleanString(
      metadata.membership_plan ||
      "",
      30
    )
    .toLowerCase();

  if (
    !VALID_PLANS.has(
      plan
    )
  ) {

    return {
      active: false
    };

  }

  const email =
    cleanString(
      metadata.member_email ||
      "",
      254
    )
    .toLowerCase();

  if (
    !validEmail(
      email
    )
  ) {

    return {
      active: false
    };

  }

  const expected =
    getExpectedPlan(
      plan
    );

  if (
    !expected
  ) {

    return {
      active: false
    };

  }

  const price =
    subscription
      ?.items
      ?.data
      ?.[0]
      ?.price;

  if (
    !price ||
    price.object !==
      "price" ||
    price.active !==
      true
  ) {

    return {
      active: false
    };

  }

  if (
    String(
      price.currency ||
      ""
    )
    .toLowerCase() !==
      "gbp"
  ) {

    return {
      active: false
    };

  }

  if (
    Number(
      price.unit_amount
    ) !==
      expected.amount
  ) {

    return {
      active: false
    };

  }

  if (
    !price.recurring ||
    price.recurring.interval !==
      expected.interval ||
    Number(
      price.recurring
        .interval_count ||
      1
    ) !==
      1
  ) {

    return {
      active: false
    };

  }

  return {

    active:
      true,

    subscriptionId:
      subscription.id,

    email,

    plan,

    status

  };

}

/* =========================================================
SUPABASE CONFIG
========================================================= */

function getSupabaseConfig() {

  return {

    url:
      cleanString(
        process.env
          .SUPABASE_URL ||
        "",
        1000
      )
      .replace(
        /\/+$/,
        ""
      ),

    secret:
      cleanString(
        process.env
          .SUPABASE_SECRET_KEY ||
        "",
        2000
      )

  };

}

async function supabaseFetch(
  path,
  options = {}
) {

  const {
    url,
    secret
  } =
    getSupabaseConfig();

  if (
    !url ||
    !secret
  ) {

    throw new Error(
      "Supabase is not configured."
    );

  }

  const method =
    options.method ||
    "GET";

  const headers = {

    apikey:
      secret,

    Authorization:
      `Bearer ${secret}`,

    "Content-Type":
      "application/json",

    Accept:
      "application/json"

  };

  if (
    options.prefer
  ) {

    headers.Prefer =
      options.prefer;

  }

  const response =
    await fetch(
      `${url}/rest/v1/${path}`,
      {

        method,

        headers,

        body:
          options.body ===
            undefined
            ? undefined
            : JSON.stringify(
                options.body
              )

      }
    );

  const raw =
    await response.text();

  let data =
    null;

  if (
    raw
  ) {

    try {

      data =
        JSON.parse(
          raw
        );

    } catch {

      data =
        raw;

    }

  }

  if (
    !response.ok
  ) {

    const error =
      new Error(
        data?.message ||
        data?.hint ||
        data?.details ||
        "Supabase request failed."
      );

    error.status =
      response.status;

    throw error;

  }

  return data;

}

/* =========================================================
LOAD OFFER
========================================================= */

async function getOffer(
  offerId
) {

  const fields =
    [
      "id",
      "business_name",
      "title",
      "redemption_type",
      "starts_at",
      "ends_at",
      "max_redemptions",
      "redemptions_count",
      "one_use_per_subscriber",
      "access_scope",
      "status"
    ]
    .join(",");

  const rows =
    await supabaseFetch(
      `offers?id=eq.${encodeURIComponent(
        offerId
      )}&select=${encodeURIComponent(
        fields
      )}&limit=1`
    );

  if (
    !Array.isArray(
      rows
    ) ||
    !rows.length
  ) {

    return null;

  }

  return rows[0];

}

/* =========================================================
CHECK PREVIOUS REDEMPTION
========================================================= */

async function getExistingRedemption(
  offerId,
  email
) {

  const rows =
    await supabaseFetch(
      `offer_redemptions?offer_id=eq.${encodeURIComponent(
        offerId
      )}&subscriber_email=eq.${encodeURIComponent(
        email
      )}&status=eq.redeemed&select=id&limit=1`
    );

  if (
    !Array.isArray(
      rows
    ) ||
    !rows.length
  ) {

    return null;

  }

  return rows[0];

} /* =========================================================
OFFER VALIDATION
========================================================= */

function validateOffer(
  offer
) {

  if (
    !offer
  ) {

    return {

      ok:
        false,

      status:
        404,

      error:
        "Offer not found."

    };

  }

  if (
    cleanString(
      offer.status ||
      "",
      30
    )
    .toLowerCase() !==
      "active"
  ) {

    return {

      ok:
        false,

      status:
        410,

      error:
        "This offer is not active."

    };

  }

  if (
    cleanString(
      offer.redemption_type ||
      "",
      30
    )
    .toLowerCase() !==
      "offline"
  ) {

    return {

      ok:
        false,

      status:
        400,

      error:
        "This offer is not an in-store barcode offer."

    };

  }

  if (
    offer.access_scope !==
      "all_subscribers"
  ) {

    return {

      ok:
        false,

      status:
        403,

      error:
        "This offer is not available to Club members."

    };

  }

  const starts =
    new Date(
      offer.starts_at
    )
    .getTime();

  const ends =
    new Date(
      offer.ends_at
    )
    .getTime();

  const now =
    Date.now();

  if (
    !Number.isFinite(
      starts
    ) ||
    !Number.isFinite(
      ends
    )
  ) {

    return {

      ok:
        false,

      status:
        410,

      error:
        "Offer dates are invalid."

    };

  }

  if (
    now <
      starts
  ) {

    return {

      ok:
        false,

      status:
        403,

      error:
        "This offer has not started yet."

    };

  }

  if (
    now >
      ends
  ) {

    return {

      ok:
        false,

      status:
        410,

      error:
        "This offer has expired."

    };

  }

  const maximum =
    offer.max_redemptions ===
      null
      ? null
      : Number(
          offer.max_redemptions
        );

  const redeemed =
    Number(
      offer.redemptions_count ||
      0
    );

  if (
    maximum !==
      null &&
    Number.isFinite(
      maximum
    ) &&
    maximum > 0 &&
    redeemed >=
      maximum
  ) {

    return {

      ok:
        false,

      status:
        410,

      error:
        "All available discounts for this offer have been redeemed."

    };

  }

  return {

    ok:
      true,

    redeemed,

    maximum

  };

}

/* =========================================================
CREATE REDEMPTION
========================================================= */

async function createRedemption(
  offer,
  membership
) {

  const body = {

    offer_id:
      offer.id,

    subscriber_email:
      membership.email,

    status:
      "redeemed"

  };

  const rows =
    await supabaseFetch(
      "offer_redemptions",
      {

        method:
          "POST",

        prefer:
          "return=representation",

        body

      }
    );

  if (
    Array.isArray(
      rows
    ) &&
    rows.length
  ) {

    return rows[0];

  }

  return null;

}

/* =========================================================
UPDATE OFFER COUNTER
========================================================= */

async function updateOfferRedemptionCount(
  offer
) {

  const current =
    Number(
      offer.redemptions_count ||
      0
    );

  const next =
    current +
    1;

  try {

    await supabaseFetch(
      `offers?id=eq.${encodeURIComponent(
        offer.id
      )}`,
      {

        method:
          "PATCH",

        prefer:
          "return=minimal",

        body: {

          redemptions_count:
            next

        }

      }
    );

  } catch (
    error
  ) {

    /*
    The redemption itself has already succeeded.

    We do not roll it back if the cached counter update fails.
    The redemption table remains the source of truth for
    member-level redemption checks.
    */

    console.error(
      "PETS & DOGUE redemption counter update:",
      error
    );

  }

}

/* =========================================================
HANDLER
========================================================= */

module.exports =
async function handler(
  req,
  res
) {

  if (
    req.method !==
      "POST"
  ) {

    res.setHeader(
      "Allow",
      "POST"
    );

    return sendJson(
      res,
      405,
      {

        ok:
          false,

        error:
          "Method not allowed."

      }
    );

  }

  /* =======================================================
  PARTNER AUTHORIZATION
  ======================================================= */

  const partnerAuthorization =
    verifyPartnerAuthorization(
      req
    );

  if (
    !partnerAuthorization
      .configured
  ) {

    return sendJson(
      res,
      503,
      {

        ok:
          false,

        configurationRequired:
          true,

        error:
          "Partner redemption is not configured."

      }
    );

  }

  if (
    !partnerAuthorization.ok
  ) {

    return sendJson(
      res,
      401,
      {

        ok:
          false,

        error:
          "Partner authorization is required."

      }
    );

  }

  /* =======================================================
  CONFIG
  ======================================================= */

  const stripeSecretKey =
    cleanString(
      process.env
        .STRIPE_SECRET_KEY ||
      "",
      300
    );

  if (
    !stripeSecretKey
  ) {

    return sendJson(
      res,
      503,
      {

        ok:
          false,

        error:
          "Club verification is unavailable."

      }
    );

  }

  const {
    url:
      supabaseUrl,

    secret:
      supabaseSecret

  } =
    getSupabaseConfig();

  if (
    !supabaseUrl ||
    !supabaseSecret
  ) {

    return sendJson(
      res,
      503,
      {

        ok:
          false,

        error:
          "Offer redemption storage is unavailable."

      }
    );

  }

  /* =======================================================
  BODY
  ======================================================= */

  let body;

  try {

    body =
      await readRequestBody(
        req
      );

  } catch (
    error
  ) {

    return sendJson(
      res,
      413,
      {

        ok:
          false,

        error:
          "Invalid request."

      }
    );

  }

  const offerId =
    cleanString(
      body?.offerId ||
      "",
      100
    );

  const barcodeValue =
    cleanString(
      body?.barcodeValue ||
      body?.barcode ||
      "",
      600
    );

  if (
    !isUuid(
      offerId
    )
  ) {

    return sendJson(
      res,
      400,
      {

        ok:
          false,

        error:
          "A valid offer ID is required."

      }
    );

  }

  if (
    !barcodeValue
  ) {

    return sendJson(
      res,
      400,
      {

        ok:
          false,

        error:
          "A PETS & DOGUE member barcode is required."

      }
    );

  }

  /* =======================================================
  PARSE BARCODE
  ======================================================= */

  const parsedBarcode =
    parseBarcode(
      barcodeValue
    );

  if (
    !parsedBarcode.ok
  ) {

    const expired =
      parsedBarcode.reason ===
        "expired";

    return sendJson(
      res,
      expired
        ? 410
        : 400,
      {

        ok:
          false,

        barcodeValid:
          false,

        expired,

        error:
          expired
            ? "This member barcode has expired. Ask the member to refresh their PETS & DOGUE Club voucher."
            : "This is not a valid PETS & DOGUE member barcode."

      }
    );

  }

  /* =======================================================
  VERIFY SIGNATURE
  ======================================================= */

  const voucherSecret =
    getVoucherSecret(
      stripeSecretKey
    );

  const signatureValid =
    verifyBarcodeSignature(
      parsedBarcode,
      offerId,
      voucherSecret
    );

  if (
    !signatureValid
  ) {

    return sendJson(
      res,
      403,
      {

        ok:
          false,

        barcodeValid:
          false,

        error:
          "This PETS & DOGUE member barcode could not be verified."

      }
    );

  }

  /* =======================================================
  LOAD OFFER
  ======================================================= */

  let offer;

  try {

    offer =
      await getOffer(
        offerId
      );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE redeem offer lookup:",
      error
    );

    return sendJson(
      res,
      503,
      {

        ok:
          false,

        temporary:
          true,

        error:
          "Unable to verify this offer right now."

      }
    );

  }

  const offerValidation =
    validateOffer(
      offer
    );

  if (
    !offerValidation.ok
  ) {

    return sendJson(
      res,
      offerValidation.status,
      {

        ok:
          false,

        error:
          offerValidation.error

      }
    );

  }

  /* =======================================================
  VERIFY CURRENT STRIPE MEMBERSHIP
  ======================================================= */

  let membership;

  try {

    membership =
      await verifyStripeMembership(
        parsedBarcode.subscriptionId,
        stripeSecretKey
      );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE redeem Stripe verification:",
      error
    );

    return sendJson(
      res,
      503,
      {

        ok:
          false,

        temporary:
          true,

        error:
          "Unable to verify Club membership right now."

      }
    );

  }

  if (
    !membership.active
  ) {

    return sendJson(
      res,
      403,
      {

        ok:
          false,

        membershipActive:
          false,

        error:
          "This PETS & DOGUE Club membership is not active."

      }
    );

  }

  /* =======================================================
  CHECK IF ALREADY REDEEMED
  ======================================================= */

  if (
    offer.one_use_per_subscriber !==
      false
  ) {

    let existing;

    try {

      existing =
        await getExistingRedemption(
          offer.id,
          membership.email
        );

    } catch (
      error
    ) {

      console.error(
        "PETS & DOGUE redemption duplicate check:",
        error
      );

      return sendJson(
        res,
        503,
        {

          ok:
            false,

          temporary:
            true,

          error:
            "Unable to verify previous use of this offer."

        }
      );

    }

    if (
      existing
    ) {

      return sendJson(
        res,
        409,
        {

          ok:
            false,

          alreadyRedeemed:
            true,

          barcodeValid:
            true,

          membershipActive:
            true,

          error:
            "This Club member has already redeemed this offer."

        }
      );

    }

  }

  /* =======================================================
  FINAL EXPIRY CHECK

  We check again immediately before writing.
  ======================================================= */

  if (
    parsedBarcode.expiresAt <=
      Math.floor(
        Date.now() /
        1000
      )
  ) {

    return sendJson(
      res,
      410,
      {

        ok:
          false,

        barcodeValid:
          false,

        expired:
          true,

        error:
          "This member barcode has expired."

      }
    );

  }

  /* =======================================================
  CREATE REDEMPTION
  ======================================================= */

  let redemption;

  try {

    redemption =
      await createRedemption(
        offer,
        membership
      );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE create redemption:",
      error
    );

    /*
    A database uniqueness rule may later return an error here
    if two scans happen at almost exactly the same time.
    That is safer than issuing the same one-use discount twice.
    */

    return sendJson(
      res,
      409,
      {

        ok:
          false,

        error:
          "This offer could not be redeemed. It may already have been used."

      }
    );

  }

  await updateOfferRedemptionCount(
    offer
  );

  const redeemedAt =
    new Date()
      .toISOString();

  /* =======================================================
  SAFE SUCCESS RESPONSE

  Do not return the member's email to the merchant client.
  ======================================================= */

  return sendJson(
    res,
    200,
    {

      ok:
        true,

      redeemed:
        true,

      barcodeValid:
        true,

      membershipActive:
        true,

      redemption: {

        id:
          redemption?.id ||
          null,

        offerId:
          offer.id,

        businessName:
          cleanString(
            offer.business_name ||
            "",
            200
          ),

        title:
          cleanString(
            offer.title ||
            "",
            220
          ),

        redeemedAt,

        membershipPlan:
          membership.plan,

        membershipStatus:
          membership.status

      }

    }
  );

};
