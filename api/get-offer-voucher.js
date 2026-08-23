"use strict";

/*
=========================================================
PETS & DOGUE
PROTECTED OFFLINE CLUB VOUCHER
=========================================================

Purpose:

- Return an offline voucher only to a verified
  PETS & DOGUE Club member
- Verify signed HttpOnly Club cookie
- Re-check the real Stripe subscription
- Allow only active / trialing membership
- Load private promo code from Supabase
- Check offer availability and dates
- Check voucher stock
- Check whether this member already redeemed the offer

IMPORTANT:

Opening/showing the voucher does NOT mark it as redeemed.

A voucher becomes REDEEMED only after confirmed
partner redemption / scan in a later protected endpoint.
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

  res.end(
    JSON.stringify(
      payload
    )
  );

}

/* =========================================================
   CLEAN VALUES
========================================================= */

function cleanString(
  value,
  maxLength = 500
) {

  if (
    typeof value !== "string"
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
        value || ""
      ).trim()
    );

}

function isUuid(
  value
) {

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    .test(
      String(
        value || ""
      )
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
    typeof req.body === "object"
  ) {

    return req.body;

  }

  if (
    typeof req.body === "string" &&
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
   COOKIE SECRET
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
        first || ""
      )
    );

  const b =
    Buffer.from(
      String(
        second || ""
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
      ] || "",
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
    ).toLowerCase();

  const plan =
    cleanString(
      payload?.plan ||
      "",
      30
    ).toLowerCase();

  const expiresAt =
    Number(
      payload?.exp ||
      0
    );

  if (
    !subscriptionId.startsWith(
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
   PLAN CONFIG
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
    ).toLowerCase();

  if (
    !ACTIVE_MEMBERSHIP_STATUSES.has(
      status
    )
  ) {

    return {
      active: false,
      status
    };

  }

  const plan =
    cleanString(
      metadata.membership_plan ||
      "",
      30
    ).toLowerCase();

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
    ).toLowerCase();

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
      "price"
  ) {

    return {
      active: false
    };

  }

  if (
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
    ).toLowerCase() !==
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
    ) !== 1
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

}

/* =========================================================
   OFFER VALIDATION
========================================================= */

function validateOffer(
  offer
) {

  if (
    !offer
  ) {

    return {
      ok: false,
      status: 404,
      error: "Offer not found."
    };

  }

  if (
    offer.status !==
      "active"
  ) {

    return {
      ok: false,
      status: 410,
      error: "This offer is not active."
    };

  }

  if (
    offer.redemption_type !==
      "offline"
  ) {

    return {
      ok: false,
      status: 400,
      error: "This is not an offline voucher."
    };

  }

  if (
    offer.access_scope !==
      "all_subscribers"
  ) {

    return {
      ok: false,
      status: 403,
      error: "This offer is not available to this membership."
    };

  }

  const now =
    Date.now();

  const starts =
    new Date(
      offer.starts_at
    ).getTime();

  const ends =
    new Date(
      offer.ends_at
    ).getTime();

  if (
    !Number.isFinite(
      starts
    ) ||
    !Number.isFinite(
      ends
    )
  ) {

    return {
      ok: false,
      status: 410,
      error: "Offer dates are invalid."
    };

  }

  if (
    now < starts
  ) {

    return {
      ok: false,
      status: 403,
      error: "This offer has not started yet."
    };

  }

  if (
    now > ends
  ) {

    return {
      ok: false,
      status: 410,
      error: "This offer has expired."
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
    maximum !== null &&
    Number.isFinite(
      maximum
    ) &&
    maximum > 0 &&
    redeemed >=
      maximum
  ) {

    return {
      ok: false,
      status: 410,
      error: "All vouchers for this offer have been used."
    };

  }

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
      ok: false,
      status: 410,
      error: "Voucher code is unavailable."
    };

  }

  return {
    ok: true
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
     COOKIE
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
     STRIPE MEMBERSHIP
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
      "PETS & DOGUE voucher Stripe verification:",
      error
    );

    return sendJson(
      res,
      503,
      {

        ok:
          false,

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
     OFFER
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
      "PETS & DOGUE voucher offer lookup:",
      error
    );

    return sendJson(
      res,
      500,
      {

        ok:
          false,

        error:
          "Unable to load this voucher."

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
     ALREADY REDEEMED
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
        "PETS & DOGUE voucher redemption lookup:",
        error
      );

      return sendJson(
        res,
        503,
        {

          ok:
            false,

          error:
            "Unable to verify this voucher right now."

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
     SAFE VOUCHER RESPONSE

     Viewing this response does NOT mark the voucher used.
  ======================================================= */

  return sendJson(
    res,
    200,
    {

      ok:
        true,

      voucher: {

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

        promoCode:
          cleanString(
            offer.promo_code ||
            "",
            150
          ),

        barcodeValue:
          cleanString(
            offer.promo_code ||
            "",
            150
          ),

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
