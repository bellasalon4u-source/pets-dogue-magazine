"use strict";

/*
=========================================================
PETS & DOGUE CLUB
CURRENT CLUB SESSION
=========================================================

Purpose:

- Read secure HttpOnly PETS & DOGUE Club cookie
- Verify its signature
- Re-check the real Stripe subscription
- Return current membership status to the website

Used by:
- special-offers.html
- Club account UI
- future member-only pages

IMPORTANT:

Browser localStorage is NOT trusted.

Stripe remains the source of truth.
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

const ACTIVE_STATUSES =
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
   HELPERS
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

function unixToIso(
  value
) {

  const number =
    Number(
      value
    );

  if (
    !Number.isFinite(
      number
    ) ||
    number <= 0
  ) {

    return null;

  }

  return new Date(
    number * 1000
  ).toISOString();

}

/* =========================================================
   COOKIE PARSER
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

  const cookies =
    {};

  if (
    !raw
  ) {

    return cookies;

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

        const name =
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
          name
        ) {

          cookies[name] =
            value;

        }

      }
    );

  return cookies;

}

/* =========================================================
   COOKIE SECRET

   MUST MATCH:
   verify-club-checkout.js
   use-offer.js
   get-offer-voucher.js
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
   SIGNATURE
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
   VERIFY COOKIE
========================================================= */

function verifyCookie(
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

      ok:
        false,

      reason:
        "missing"

    };

  }

  const parts =
    raw.split(".");

  if (
    parts.length !== 3
  ) {

    return {

      ok:
        false,

      reason:
        "invalid"

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

      ok:
        false,

      reason:
        "version"

    };

  }

  const expected =
    signCookiePayload(
      encodedPayload,
      secret
    );

  if (
    !safeEqual(
      signature,
      expected
    )
  ) {

    return {

      ok:
        false,

      reason:
        "signature"

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

      ok:
        false,

      reason:
        "payload"

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

  const issuedAt =
    Number(
      payload?.iat ||
      0
    );

  const expiresAt =
    Number(
      payload?.exp ||
      0
    );

  const now =
    Math.floor(
      Date.now() /
      1000
    );

  if (
    !subscriptionId.startsWith(
      "sub_"
    )
  ) {

    return {

      ok:
        false,

      reason:
        "subscription"

    };

  }

  if (
    !validEmail(
      email
    )
  ) {

    return {

      ok:
        false,

      reason:
        "email"

    };

  }

  if (
    !VALID_PLANS.has(
      plan
    )
  ) {

    return {

      ok:
        false,

      reason:
        "plan"

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

      ok:
        false,

      reason:
        "issued_at"

    };

  }

  if (
    !Number.isFinite(
      expiresAt
    ) ||
    expiresAt <= now
  ) {

    return {

      ok:
        false,

      reason:
        "expired"

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
   STRIPE REQUEST
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
   HANDLER
========================================================= */

module.exports =
async function handler(
  req,
  res
) {

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

        authenticated:
          false,

        active:
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

    console.error(
      "PETS & DOGUE club-session: STRIPE_SECRET_KEY is missing."
    );

    return sendJson(
      res,
      500,
      {

        ok:
          false,

        authenticated:
          false,

        active:
          false,

        error:
          "Club verification is unavailable."

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
    verifyCookie(
      req,
      cookieSecret
    );

  if (
    !cookie.ok
  ) {

    if (
      cookie.reason !==
      "missing"
    ) {

      clearClubCookie(
        res
      );

    }

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        authenticated:
          false,

        active:
          false,

        reason:
          cookie.reason

      }
    );

  }

  /* =======================================================
     STRIPE SUBSCRIPTION
  ======================================================= */

  let subscription;

  try {

    subscription =
      await stripeRequest(
        `/subscriptions/${encodeURIComponent(
          cookie.subscriptionId
        )}?expand[]=items.data.price`,
        stripeSecretKey
      );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE club-session Stripe error:",
      error
    );

    /*
    A deleted/nonexistent Stripe subscription means
    the old browser session must no longer be trusted.
    */

    if (
      Number(
        error.status
      ) === 404
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        200,
        {

          ok:
            true,

          authenticated:
            false,

          active:
            false,

          reason:
            "subscription_not_found"

        }
      );

    }

    /*
    Temporary Stripe outage:
    fail closed but do not destroy the member cookie.
    */

    return sendJson(
      res,
      503,
      {

        ok:
          false,

        authenticated:
          true,

        active:
          false,

        temporary:
          true,

        error:
          "Unable to verify Club membership right now."

      }
    );

  }

  if (
    !subscription ||
    subscription.object !==
    "subscription"
  ) {

    clearClubCookie(
      res
    );

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        authenticated:
          false,

        active:
          false,

        reason:
          "invalid_subscription"

      }
    );

  }

  /* =======================================================
     PETS & DOGUE METADATA
  ======================================================= */

  const metadata =
    subscription.metadata ||
    {};

  if (
    metadata.source !==
      "pets_dogue_club" ||
    metadata.access_scope !==
      "all_club_benefits" ||
    metadata.special_offers_access !==
      "all"
  ) {

    clearClubCookie(
      res
    );

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        authenticated:
          false,

        active:
          false,

        reason:
          "invalid_membership"

      }
    );

  }

  /* =======================================================
     STATUS
  ======================================================= */

  const status =
    cleanString(
      subscription.status ||
      "",
      50
    )
      .toLowerCase();

  if (
    !ACTIVE_STATUSES.has(
      status
    )
  ) {

    clearClubCookie(
      res
    );

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        authenticated:
          true,

        active:
          false,

        status,

        reason:
          "inactive"

      }
    );

  }

  /* =======================================================
     PLAN
  ======================================================= */

  const stripePlan =
    cleanString(
      metadata.membership_plan ||
      "",
      30
    )
      .toLowerCase();

  if (
    !VALID_PLANS.has(
      stripePlan
    ) ||
    stripePlan !==
      cookie.plan
  ) {

    clearClubCookie(
      res
    );

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        authenticated:
          false,

        active:
          false,

        reason:
          "plan_mismatch"

      }
    );

  }

  /* =======================================================
     EMAIL
  ======================================================= */

  const stripeEmail =
    cleanString(
      metadata.member_email ||
      "",
      254
    )
      .toLowerCase();

  if (
    !validEmail(
      stripeEmail
    ) ||
    stripeEmail !==
      cookie.email
  ) {

    clearClubCookie(
      res
    );

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        authenticated:
          false,

        active:
          false,

        reason:
          "email_mismatch"

      }
    );

  }

  /* =======================================================
     PRICE
  ======================================================= */

  const expected =
    getExpectedPlan(
      stripePlan
    );

  const price =
    subscription
      ?.items
      ?.data
      ?.[0]
      ?.price;

  if (
    !expected ||
    !price ||
    price.object !==
      "price" ||
    price.active !==
      true ||
    String(
      price.currency ||
      ""
    ).toLowerCase() !==
      "gbp" ||
    Number(
      price.unit_amount
    ) !==
      expected.amount ||
    !price.recurring ||
    price.recurring.interval !==
      expected.interval ||
    Number(
      price.recurring
        .interval_count ||
      1
    ) !== 1
  ) {

    clearClubCookie(
      res
    );

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        authenticated:
          false,

        active:
          false,

        reason:
          "invalid_price"

      }
    );

  }

  /* =======================================================
     DATES
  ======================================================= */

  const currentPeriodStart =
    unixToIso(
      subscription
        .current_period_start
    );

  const currentPeriodEnd =
    unixToIso(
      subscription
        .current_period_end
    );

  const trialStart =
    unixToIso(
      subscription
        .trial_start
    );

  const trialEnd =
    unixToIso(
      subscription
        .trial_end
    );

  const createdAt =
    unixToIso(
      subscription.created
    );

  const startedAt =
    trialStart ||
    currentPeriodStart ||
    createdAt;

  const validUntil =
    currentPeriodEnd ||
    trialEnd ||
    null;

  const nextPayment =
    subscription
      .cancel_at_period_end ===
        true
      ? null
      : currentPeriodEnd;

  /* =======================================================
     SAFE MEMBER DATA
  ======================================================= */

  const firstName =
    cleanString(
      metadata
        .member_first_name ||
      "",
      100
    );

  const country =
    cleanString(
      metadata.country ||
      "",
      10
    )
      .toUpperCase();

  const language =
    cleanString(
      metadata.language ||
      "en",
      10
    )
      .toLowerCase();

  /* =======================================================
     SUCCESS
  ======================================================= */

  return sendJson(
    res,
    200,
    {

      ok:
        true,

      authenticated:
        true,

      active:
        true,

      membership: {

        status,

        plan:
          stripePlan,

        active:
          true,

        access:
          true,

        accessScope:
          "all_club_benefits",

        specialOffersAccess:
          "all",

        recurring:
          true,

        autoRenew:
          subscription
            .cancel_at_period_end !==
          true,

        cancelAtPeriodEnd:
          Boolean(
            subscription
              .cancel_at_period_end
          ),

        firstName,

        email:
          stripeEmail,

        country,

        language,

        startedAt,

        validUntil,

        nextPayment,

        dates: {

          startedAt,

          validUntil,

          nextPayment,

          currentPeriodStart,

          currentPeriodEnd,

          trialStart,

          trialEnd,

          createdAt

        },

        billing: {

          amount:
            expected.amount,

          amountFormatted:
            `£${(
              expected.amount /
              100
            ).toFixed(2)}`,

          currency:
            "GBP",

          interval:
            expected.interval

        }

      }

    }
  );

};
