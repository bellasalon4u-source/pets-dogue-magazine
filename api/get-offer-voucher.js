"use strict";

/*
=========================================================
PETS & DOGUE
PROTECTED CLUB MEMBER DISCOUNT
=========================================================

This endpoint:

- verifies the signed HttpOnly Club cookie
- re-checks the real Stripe subscription
- allows only active / trialing Club membership
- loads the requested offer from Supabase
- supports BOTH:
    1. online promo codes
    2. in-store member barcodes
- checks offer dates and stock
- checks whether the member already redeemed the offer
- never exposes member email inside the barcode
- never marks an offer redeemed just by opening it

IMPORTANT:

ONLINE
Returns the protected partner promo code.

IN STORE
Creates a member-specific signed barcode token.
The barcode token expires automatically and can later
be checked by a protected merchant scan endpoint.

Opening/showing a voucher does NOT count as redemption.
=========================================================
*/

const crypto =
  require("crypto");

const STRIPE_API_BASE =
  "https://api.stripe.com/v1";

const CLUB_COOKIE_NAME =
  "pets_dogue_club_session";

const COOKIE_VERSION =
  "v1";

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

const VALID_REDEMPTION_TYPES =
  new Set([
    "online",
    "offline"
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

/* =========================================================
REQUEST BODY
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
      "string" &&
    req.body.trim()
  ) {

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

  for await (
    const chunk of req
  ) {

    chunks.push(
      Buffer.isBuffer(
        chunk
      )
        ? chunk
        : Buffer.from(
            chunk
          )
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
COOKIES
========================================================= */

function parseCookies(
  req
) {

  const raw =
    cleanString(
      req.headers?.cookie ||
      "",
      12000
    );

  const result =
    {};

  if (
    !raw
  ) {

    return result;

  }

  raw
    .split(";")
    .forEach(
      part => {

        const index =
          part.indexOf("=");

        if (
          index < 1
        ) {

          return;

        }

        const key =
          part
            .slice(
              0,
              index
            )
            .trim();

        const value =
          part
            .slice(
              index + 1
            )
            .trim();

        if (
          key
        ) {

          result[key] =
            value;

        }

      }
    );

  return result;

}

/* =========================================================
SESSION SECRET
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
    configured.length >= 32
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

/* =========================================================
VOUCHER SECRET
========================================================= */

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
    configured.length >= 32
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
COOKIE SIGNATURE
========================================================= */

function signCookiePayload(
  encodedPayload,
  secret
) {

  return crypto
    .createHmac(
      "sha256",
      secret
    )
    .update(
      encodedPayload
    )
    .digest(
      "base64url"
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
VERIFY CLUB COOKIE
========================================================= */

function verifyClubCookie(
  req,
  secret
) {

  const cookies =
    parseCookies(
      req
    );

  const raw =
    cleanString(
      cookies[
        CLUB_COOKIE_NAME
      ] ||
      "",
      12000
    );

  if (
    !raw
  ) {

    return {
      ok: false,
      reason: "missing"
    };

  }

  const parts =
    raw.split(".");

  if (
    parts.length !== 3
  ) {

    return {
      ok: false,
      reason: "invalid"
    };

  }

  const [
    version,
    encodedPayload,
    signature
  ] =
    parts;

  if (
    version !==
      COOKIE_VERSION
  ) {

    return {
      ok: false,
      reason: "version"
    };

  }

  const expectedSignature =
    signCookiePayload(
      encodedPayload,
      secret
    );

  if (
    !safeEqual(
      signature,
      expectedSignature
    )
  ) {

    return {
      ok: false,
      reason: "signature"
    };

  }

  let payload;

  try {

    payload =
      JSON.parse(
        Buffer
          .from(
            encodedPayload,
            "base64url"
          )
          .toString(
            "utf8"
          )
      );

  } catch {

    return {
      ok: false,
      reason: "payload"
    };

  }

  const subscriptionId =
    cleanString(
      payload?.sub ||
      "",
      300
    );

  const email =
    cleanString(
      payload?.email ||
      "",
      254
    )
    .toLowerCase();

  const plan =
    cleanString(
      payload?.plan ||
      "",
      30
    )
    .toLowerCase();

  const expiresAt =
    Number(
      payload?.exp ||
      0
    );

  if (
    !subscriptionId
      .startsWith(
        "sub_"
      )
  ) {

    return {
      ok: false,
      reason: "subscription"
    };

  }

  if (
    !validEmail(
      email
    )
  ) {

    return {
      ok: false,
      reason: "email"
    };

  }

  if (
    !VALID_PLANS.has(
      plan
    )
  ) {

    return {
      ok: false,
      reason: "plan"
    };

  }

  if (
    !Number.isFinite(
      expiresAt
    ) ||
    expiresAt <=
      Math.floor(
        Date.now() /
        1000
      )
  ) {

    return {
      ok: false,
      reason: "expired"
    };

  }

  return {

    ok:
      true,

    subscriptionId,

    email,

    plan

  };

}

/* =========================================================
CLEAR COOKIE
========================================================= */

function clearClubCookie(
  res
) {

  res.setHeader(
    "Set-Cookie",
    [
      `${CLUB_COOKIE_NAME}=`,
      "Path=/",
      "Max-Age=0",
      "HttpOnly",
      "Secure",
      "SameSite=Lax"
    ].join("; ")
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
EXPECTED PLAN
========================================================= */

function getExpectedPlan(
  plan
) {

  if (
    plan === "free" ||
    plan === "monthly"
  ) {

    return {

      amount:
        100,

      interval:
        "month"

    };

  }

  if (
    plan === "annual"
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
VERIFY STRIPE MEMBERSHIP
========================================================= */

async function verifyStripeMembership(
  cookie,
  secretKey
) {

  const subscription =
    await stripeRequest(
      `/subscriptions/${encodeURIComponent(
        cookie.subscriptionId
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
    plan !==
      cookie.plan
  ) {

    return {
      active: false
    };

  }

  const memberEmail =
    cleanString(
      metadata.member_email ||
      "",
      254
    )
    .toLowerCase();

  if (
    !validEmail(
      memberEmail
    ) ||
    memberEmail !==
      cookie.email
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

    email:
      memberEmail,

    subscriptionId:
      cookie.subscriptionId,

    status,

    plan

  };

}

/* =========================================================
SUPABASE
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

async function supabaseRequest(
  path
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

  const response =
    await fetch(
      `${url}/rest/v1/${path}`,
      {

        method:
          "GET",

        headers: {

          apikey:
            secret,

          Authorization:
            `Bearer ${secret}`,

          "Content-Type":
            "application/json",

          Accept:
            "application/json"

        }

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

    throw new Error(
      data?.message ||
      data?.hint ||
      data?.details ||
      "Supabase request failed."
    );

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
      "promo_code",
      "redemption_type",
      "offline_instructions",
      "starts_at",
      "ends_at",
      "max_redemptions",
      "redemptions_count",
      "one_use_per_subscriber",
      "access_scope",
      "status",
      "location_scope",
      "country_code",
      "country_name",
      "city"
    ]
    .join(",");

  const rows =
    await supabaseRequest(
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
REDEMPTION CHECK
========================================================= */

async function hasAlreadyRedeemed(
  offerId,
  email
) {

  const rows =
    await supabaseRequest(
      `offer_redemptions?offer_id=eq.${encodeURIComponent(
        offerId
      )}&subscriber_email=eq.${encodeURIComponent(
        email
      )}&status=eq.redeemed&select=id&limit=1`
    );

  return (
    Array.isArray(
      rows
    ) &&
    rows.length > 0
  );

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

  const status =
    cleanString(
      offer.status ||
      "",
      40
    )
    .toLowerCase();

  if (
    status !==
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

  const redemptionType =
    cleanString(
      offer.redemption_type ||
      "",
      30
    )
    .toLowerCase();

  if (
    !VALID_REDEMPTION_TYPES.has(
      redemptionType
    )
  ) {

    return {

      ok:
        false,

      status:
        400,

      error:
        "This offer cannot be redeemed."

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
        "This offer is not available to this membership."

    };

  }

  const now =
    Date.now();

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
        "All discounts for this offer have been used."

    };

  }

  if (
    redemptionType ===
      "online"
  ) {

    const promoCode =
      cleanString(
        offer.promo_code ||
        "",
        150
      );

    if (
      !promoCode
    ) {

      return {

        ok:
          false,

        status:
          410,

        error:
          "Online discount code is unavailable."

      };

    }

  }

  return {

    ok:
      true,

    redemptionType,

    startsAt:
      starts,

    endsAt:
      ends

  };

}

/* =========================================================
PERSONAL MEMBER BARCODE
========================================================= */

function createMemberBarcode(
  offer,
  membership,
  voucherSecret
) {

  const offerId =
    cleanString(
      offer.id ||
      "",
      100
    );

  const email =
    cleanString(
      membership.email ||
      "",
      254
    )
    .toLowerCase();

  const subscriptionId =
    cleanString(
      membership.subscriptionId ||
      "",
      300
    );

  const nowSeconds =
    Math.floor(
      Date.now() /
      1000
    );

  const offerEndSeconds =
    Math.floor(
      new Date(
        offer.ends_at
      )
      .getTime() /
      1000
    );

  /*
  Barcode is refreshed at least every 24 hours.
  It will never outlive the offer itself.
  */

  const expiresAt =
    Math.min(
      offerEndSeconds,
      nowSeconds +
        86400
    );

  const offerPrefix =
    offerId
      .replace(
        /-/g,
        ""
      )
      .slice(
        0,
        12
      )
      .toUpperCase();

  /*
  Member fingerprint contains no email
  and cannot be reversed back to the email.
  */

  const memberFingerprint =
    crypto
      .createHash(
        "sha256"
      )
      .update(
        `${email}|${subscriptionId}`
      )
      .digest(
        "hex"
      )
      .slice(
        0,
        10
      )
      .toUpperCase();

  const expiryCode =
    expiresAt
      .toString(
        36
      )
      .toUpperCase();

  const signature =
    crypto
      .createHmac(
        "sha256",
        voucherSecret
      )
      .update(
        [
          offerId,
          email,
          subscriptionId,
          expiresAt
        ].join("|")
      )
      .digest(
        "hex"
      )
      .slice(
        0,
        16
      )
      .toUpperCase();

  const barcodeValue =
    [
      "PD1",
      offerPrefix,
      memberFingerprint,
      expiryCode,
      signature
    ]
    .join("-");

  return {

    value:
      barcodeValue,

    expiresAt,

    expiresAtIso:
      new Date(
        expiresAt *
        1000
      )
      .toISOString()

  };

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
      500,
      {

        ok:
          false,

        error:
          "Club verification is unavailable."

      }
    );

  }

  let body =
    {};

  try {

    body =
      await readRequestBody(
        req
      );

  } catch {

    return sendJson(
      res,
      400,
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
      body.offerId ||
      "",
      100
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

  /* =======================================================
  VERIFY SIGNED CLUB COOKIE
  ======================================================= */

  const cookieSecret =
    getCookieSecret(
      stripeSecretKey
    );

  const cookie =
    verifyClubCookie(
      req,
      cookieSecret
    );

  if (
    !cookie.ok
  ) {

    clearClubCookie(
      res
    );

    return sendJson(
      res,
      401,
      {

        ok:
          false,

        membershipRequired:
          true,

        reason:
          cookie.reason,

        error:
          "An active PETS & DOGUE Club membership is required."

      }
    );

  }

  /* =======================================================
  VERIFY REAL STRIPE MEMBERSHIP
  ======================================================= */

  let membership;

  try {

    membership =
      await verifyStripeMembership(
        cookie,
        stripeSecretKey
      );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE discount Stripe verification:",
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

    clearClubCookie(
      res
    );

    return sendJson(
      res,
      401,
      {

        ok:
          false,

        membershipRequired:
          true,

        error:
          "Your PETS & DOGUE Club membership is not active."

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
      "PETS & DOGUE discount offer lookup:",
      error
    );

    return sendJson(
      res,
      500,
      {

        ok:
          false,

        error:
          "Unable to load this offer."

      }
    );

  }

  const validation =
    validateOffer(
      offer
    );

  if (
    !validation.ok
  ) {

    return sendJson(
      res,
      validation.status,
      {

        ok:
          false,

        error:
          validation.error

      }
    );

  }

  /* =======================================================
  CHECK PREVIOUS REDEMPTION
  ======================================================= */

  if (
    offer.one_use_per_subscriber !==
      false
  ) {

    let redeemed;

    try {

      redeemed =
        await hasAlreadyRedeemed(
          offer.id,
          membership.email
        );

    } catch (
      error
    ) {

      console.error(
        "PETS & DOGUE redemption lookup:",
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
            "Unable to verify this discount right now."

        }
      );

    }

    if (
      redeemed
    ) {

      return sendJson(
        res,
        409,
        {

          ok:
            false,

          alreadyRedeemed:
            true,

          error:
            "You have already used this PETS & DOGUE Club offer."

        }
      );

    }

  }

  /* =======================================================
  ONLINE DISCOUNT
  ======================================================= */

  if (
    validation.redemptionType ===
      "online"
  ) {

    const promoCode =
      cleanString(
        offer.promo_code ||
        "",
        150
      );

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        voucher: {

          offerId:
            offer.id,

          redemptionType:
            "online",

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

          promoCode,

          barcodeValue:
            null,

          instructions:
            "",

          validUntil:
            offer.ends_at ||
            null,

          location: {

            scope:
              offer.location_scope ||
              "international",

            countryCode:
              offer.country_code ||
              null,

            countryName:
              offer.country_name ||
              null,

            city:
              offer.city ||
              null

          },

          oneUsePerSubscriber:
            offer.one_use_per_subscriber !==
            false,

          redeemed:
            false

        }

      }
    );

  }

  /* =======================================================
  IN-STORE MEMBER BARCODE
  ======================================================= */

  const voucherSecret =
    getVoucherSecret(
      stripeSecretKey
    );

  const memberBarcode =
    createMemberBarcode(
      offer,
      membership,
      voucherSecret
    );

  return sendJson(
    res,
    200,
    {

      ok:
        true,

      voucher: {

        offerId:
          offer.id,

        redemptionType:
          "offline",

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

        /*
        Important:
        offline promoCode is intentionally null.

        The frontend will therefore use barcodeValue,
        which is the protected personal member token.
        */

        promoCode:
          null,

        barcodeValue:
          memberBarcode.value,

        barcodeExpiresAt:
          memberBarcode.expiresAtIso,

        instructions:
          cleanString(
            offer.offline_instructions ||
            "",
            1500
          ),

        validUntil:
          offer.ends_at ||
          null,

        location: {

          scope:
            offer.location_scope ||
            "country",

          countryCode:
            offer.country_code ||
            null,

          countryName:
            offer.country_name ||
            null,

          city:
            offer.city ||
            null

        },

        oneUsePerSubscriber:
          offer.one_use_per_subscriber !==
          false,

        redeemed:
          false

      }

    }
  );

};
