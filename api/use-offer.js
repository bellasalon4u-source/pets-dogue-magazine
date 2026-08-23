"use strict";

/*
=========================================================
PETS & DOGUE
SECURE ONLINE CLUB OFFER REDIRECT
=========================================================

Purpose:

- Protect online Club offers
- Read signed HttpOnly Club session cookie
- Verify the real Stripe subscription on every use
- Allow only ACTIVE / TRIALING Club members
- Verify PETS & DOGUE Club metadata
- Verify recurring Stripe plan
- Load the offer privately from Supabase
- Check that the offer is active and usable
- Prevent a confirmed redeemed offer being used again
- Track the click
- Redirect to the partner website

IMPORTANT:

A click is NOT a redemption.

Online redemption must only be marked after a confirmed
purchase / conversion from the partner or affiliate system.
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

function redirect(
  res,
  location
) {

  res.statusCode =
    302;

  res.setHeader(
    "Cache-Control",
    "no-store, max-age=0"
  );

  res.setHeader(
    "Pragma",
    "no-cache"
  );

  res.setHeader(
    "Location",
    location
  );

  res.end();

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
   COOKIE
========================================================= */

function parseCookies(
  req
) {

  const cookieHeader =
    cleanString(
      req.headers?.cookie ||
      "",
      12000
    );

  const result =
    {};

  if (
    !cookieHeader
  ) {

    return result;

  }

  cookieHeader
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

   MUST MATCH verify-club-checkout.js
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

  let payload =
    null;

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

  if (
    !payload ||
    typeof payload !==
      "object"
  ) {

    return {
      ok: false,
      reason: "payload"
    };

  }

  const subscriptionId =
    cleanString(
      payload.sub || "",
      300
    );

  const sessionId =
    cleanString(
      payload.sid || "",
      300
    );

  const email =
    cleanString(
      payload.email || "",
      254
    ).toLowerCase();

  const plan =
    cleanString(
      payload.plan || "",
      30
    ).toLowerCase();

  const expiresAt =
    Number(
      payload.exp || 0
    );

  const issuedAt =
    Number(
      payload.iat || 0
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
    !sessionId.startsWith(
      "cs_"
    )
  ) {

    return {
      ok: false,
      reason: "session"
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

  const now =
    Math.floor(
      Date.now() /
      1000
    );

  if (
    !Number.isFinite(
      expiresAt
    ) ||
    expiresAt <= now
  ) {

    return {
      ok: false,
      reason: "expired"
    };

  }

  if (
    !Number.isFinite(
      issuedAt
    ) ||
    issuedAt <= 0 ||
    issuedAt > now + 300
  ) {

    return {
      ok: false,
      reason: "issued_at"
    };

  }

  return {

    ok:
      true,

    payload: {

      subscriptionId,

      sessionId,

      customerId:
        cleanString(
          payload.customer ||
          "",
          300
        ),

      email,

      plan,

      issuedAt,

      expiresAt

    }

  };

}

/* =========================================================
   CLEAR INVALID CLUB COOKIE
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

    error.stripe =
      data;

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
    plan === "free"
  ) {

    return {

      amount:
        100,

      interval:
        "month"

    };

  }

  if (
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
   VERIFY REAL STRIPE MEMBERSHIP
========================================================= */

async function verifyStripeMembership(
  cookieMembership,
  secretKey
) {

  const subscription =
    await stripeRequest(
      `/subscriptions/${encodeURIComponent(
        cookieMembership.subscriptionId
      )}?expand[]=items.data.price`,
      secretKey
    );

  if (
    !subscription ||
    subscription.object !==
      "subscription"
  ) {

    return {
      active: false,
      reason: "subscription_not_found"
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
      active: false,
      reason: "invalid_source"
    };

  }

  if (
    metadata.access_scope !==
    "all_club_benefits"
  ) {

    return {
      active: false,
      reason: "invalid_access"
    };

  }

  if (
    metadata.special_offers_access !==
    "all"
  ) {

    return {
      active: false,
      reason: "no_special_offers_access"
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

      active:
        false,

      reason:
        "inactive",

      status

    };

  }

  const stripePlan =
    cleanString(
      metadata.membership_plan ||
      "",
      30
    ).toLowerCase();

  if (
    !VALID_PLANS.has(
      stripePlan
    ) ||
    stripePlan !==
      cookieMembership.plan
  ) {

    return {
      active: false,
      reason: "plan_mismatch"
    };

  }

  const stripeEmail =
    cleanString(
      metadata.member_email ||
      "",
      254
    ).toLowerCase();

  if (
    !validEmail(
      stripeEmail
    ) ||
    stripeEmail !==
      cookieMembership.email
  ) {

    return {
      active: false,
      reason: "email_mismatch"
    };

  }

  const expected =
    getExpectedPlan(
      stripePlan
    );

  if (
    !expected
  ) {

    return {
      active: false,
      reason: "invalid_plan"
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
      active: false,
      reason: "price_missing"
    };

  }

  if (
    price.active !==
    true
  ) {

    return {
      active: false,
      reason: "price_inactive"
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
      active: false,
      reason: "currency"
    };

  }

  if (
    Number(
      price.unit_amount
    ) !==
    expected.amount
  ) {

    return {
      active: false,
      reason: "amount"
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
      active: false,
      reason: "interval"
    };

  }

  /*
  Stripe status is still checked on every request.

  cancel_at_period_end does NOT remove access immediately.
  The customer keeps Club benefits until Stripe changes
  the subscription status after the paid/trial period ends.
  */

  return {

    active:
      true,

    subscription,

    status,

    plan:
      stripePlan,

    email:
      stripeEmail

  };

}

/* =========================================================
   SUPABASE
========================================================= */

function getSupabaseConfig() {

  const url =
    cleanString(
      process.env
        .SUPABASE_URL ||
      "",
      1000
    )
      .replace(
        /\/+$/,
        ""
      );

  const secret =
    cleanString(
      process.env
        .SUPABASE_SECRET_KEY ||
      "",
      2000
    );

  return {
    url,
    secret
  };

}

async function supabaseRequest(
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

  const headers = {

    apikey:
      secret,

    Authorization:
      `Bearer ${secret}`,

    "Content-Type":
      "application/json",

    ...(options.headers || {})

  };

  const response =
    await fetch(
      `${url}/rest/v1/${path}`,
      {

        method:
          options.method ||
          "GET",

        headers,

        body:
          options.body !==
          undefined
            ? JSON.stringify(
                options.body
              )
            : undefined

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
        `Supabase request failed with status ${response.status}.`
      );

    error.status =
      response.status;

    error.data =
      data;

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

  const select =
    [
      "id",
      "business_name",
      "title",
      "promo_code",
      "redemption_type",
      "partner_url",
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
      "city",
      "views_count"
    ].join(",");

  const rows =
    await supabaseRequest(
      `offers?id=eq.${encodeURIComponent(
        offerId
      )}&select=${encodeURIComponent(
        select
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
    offer.access_scope !==
    "all_subscribers"
  ) {

    return {
      ok: false,
      status: 403,
      error: "This offer is not available to this membership."
    };

  }

  if (
    offer.redemption_type !==
    "online"
  ) {

    return {
      ok: false,
      status: 400,
      error: "This is not an online offer."
    };

  }

  const partnerUrl =
    cleanString(
      offer.partner_url ||
      "",
      2000
    );

  if (
    !partnerUrl
  ) {

    return {
      ok: false,
      status: 410,
      error: "Partner website is unavailable."
    };

  }

  try {

    const url =
      new URL(
        partnerUrl
      );

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {

      throw new Error(
        "Invalid protocol."
      );

    }

  } catch {

    return {
      ok: false,
      status: 400,
      error: "Invalid partner website."
    };

  }

  const now =
    Date.now();

  const startsAt =
    new Date(
      offer.starts_at
    ).getTime();

  const endsAt =
    new Date(
      offer.ends_at
    ).getTime();

  if (
    !Number.isFinite(
      startsAt
    ) ||
    !Number.isFinite(
      endsAt
    )
  ) {

    return {
      ok: false,
      status: 410,
      error: "Offer dates are invalid."
    };

  }

  if (
    now < startsAt
  ) {

    return {
      ok: false,
      status: 403,
      error: "This offer has not started yet."
    };

  }

  if (
    now > endsAt
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

  return {
    ok: true
  };

}

/* =========================================================
   ALREADY REDEEMED
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
   TRACK CLICK
========================================================= */

async function incrementOfferClick(
  offer
) {

  const current =
    Math.max(
      0,
      Number(
        offer.views_count ||
        0
      )
    );

  /*
  A click is analytics only.

  It must NOT:
  - increment redemptions_count
  - create redeemed status
  - consume the member's voucher
  */

  await supabaseRequest(
    `offers?id=eq.${encodeURIComponent(
      offer.id
    )}`,
    {

      method:
        "PATCH",

      headers: {

        Prefer:
          "return=minimal"

      },

      body: {

        views_count:
          current + 1

      }

    }
  );

}

/* =========================================================
   BUILD TRACKED PARTNER URL
========================================================= */

function buildPartnerUrl(
  offer
) {

  const url =
    new URL(
      offer.partner_url
    );

  /*
  PETS & DOGUE attribution
  */

  url.searchParams.set(
    "utm_source",
    "petsanddogue"
  );

  url.searchParams.set(
    "utm_medium",
    "club_offer"
  );

  url.searchParams.set(
    "utm_campaign",
    `offer_${offer.id}`
  );

  url.searchParams.set(
    "pd_offer",
    String(
      offer.id
    )
  );

  /*
  The promo code is intentionally NOT returned by
  /api/get-active-offers.

  It is only inserted here AFTER server-side membership
  verification.
  */

  if (
    offer.promo_code
  ) {

    url.searchParams.set(
      "pd_code",
      String(
        offer.promo_code
      )
    );

  }

  return url.toString();

}

/* =========================================================
   HANDLER
========================================================= */

module.exports =
async function handler(
  req,
  res
) {

  /* =======================================================
     METHOD
  ======================================================= */

  if (
    req.method !==
    "GET"
  ) {

    res.setHeader(
      "Allow",
      "GET"
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

    console.error(
      "PETS & DOGUE use-offer: STRIPE_SECRET_KEY is missing."
    );

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

    console.error(
      "PETS & DOGUE use-offer: Supabase configuration is missing."
    );

    return sendJson(
      res,
      500,
      {

        ok:
          false,

        error:
          "Offer service is unavailable."

      }
    );

  }

  /* =======================================================
     OFFER ID
  ======================================================= */

  const offerId =
    cleanString(
      req.query?.id ||
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

  const cookieResult =
    verifyClubCookie(
      req,
      cookieSecret
    );

  if (
    !cookieResult.ok
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
          cookieResult.reason,

        error:
          "An active PETS & DOGUE Club membership is required."

      }
    );

  }

  /* =======================================================
     VERIFY REAL STRIPE SUBSCRIPTION
  ======================================================= */

  let verifiedMembership;

  try {

    verifiedMembership =
      await verifyStripeMembership(
        cookieResult.payload,
        stripeSecretKey
      );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE Stripe membership check failed:",
      error
    );

    /*
    Stripe verification failure must fail CLOSED.

    We do not allow the offer when Stripe cannot confirm
    membership.
    */

    return sendJson(
      res,
      503,
      {

        ok:
          false,

        membershipRequired:
          true,

        error:
          "Unable to verify Club membership right now. Please try again."

      }
    );

  }

  if (
    !verifiedMembership.active
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
          verifiedMembership.reason ||
          "inactive",

        membershipStatus:
          verifiedMembership.status ||
          null,

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
      "PETS & DOGUE offer lookup failed:",
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

  /* =======================================================
     VALIDATE OFFER
  ======================================================= */

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
     ONE USE PER SUBSCRIBER

     Only a confirmed REDEEMED record blocks future use.

     Merely opening this redirect does NOT consume the offer.
  ======================================================= */

  if (
    offer.one_use_per_subscriber !==
    false
  ) {

    try {

      const redeemed =
        await hasAlreadyRedeemed(
          offer.id,
          verifiedMembership.email
        );

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

    } catch (
      error
    ) {

      console.error(
        "PETS & DOGUE redemption lookup failed:",
        error
      );

      /*
      Fail closed.

      If we cannot confirm whether the one-use offer has
      already been redeemed, do not risk granting it twice.
      */

      return sendJson(
        res,
        503,
        {

          ok:
            false,

          error:
            "Unable to verify this voucher right now. Please try again."

        }
      );

    }

  }

  /* =======================================================
     BUILD PRIVATE TRACKED REDIRECT
  ======================================================= */

  let destination;

  try {

    destination =
      buildPartnerUrl(
        offer
      );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE invalid partner URL:",
      error
    );

    return sendJson(
      res,
      500,
      {

        ok:
          false,

        error:
          "The partner website is unavailable."

      }
    );

  }

  /* =======================================================
     ANALYTICS

     Failure to record a click should NOT stop a valid member
     from reaching the partner website.
  ======================================================= */

  try {

    await incrementOfferClick(
      offer
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE click tracking failed:",
      error
    );

  }

  /* =======================================================
     REDIRECT
  ======================================================= */

  return redirect(
    res,
    destination
  );

};
