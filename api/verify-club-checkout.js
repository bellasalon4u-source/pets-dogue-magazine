"use strict";

/*
=========================================================
PETS & DOGUE CLUB
VERIFY STRIPE MEMBERSHIP CHECKOUT
=========================================================

Stripe is the source of truth.

This endpoint:

- verifies the Stripe Checkout Session
- verifies the recurring Stripe Subscription
- confirms PETS & DOGUE Club metadata
- confirms plan / price / currency / interval
- grants access only for:
    active
    trialing
- returns the membership structure expected by club.html
- creates a secure HttpOnly Club session cookie

The Club cookie will later be checked server-side by:
- /api/use-offer
- protected voucher endpoints

IMPORTANT:
The browser cannot read the HttpOnly cookie with JavaScript.
=========================================================
*/

const crypto =
  require("crypto");

const STRIPE_API_BASE =
  "https://api.stripe.com/v1";

const VALID_PLANS =
  new Set([
    "free",
    "monthly",
    "annual"
  ]);

const ACTIVE_MEMBERSHIP_STATUSES =
  new Set([
    "active",
    "trialing"
  ]);

const CLUB_COOKIE_NAME =
  "pets_dogue_club_session";

const COOKIE_VERSION =
  "v1";

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
   EXPECTED PLAN
========================================================= */

function getExpectedPlan(
  plan
) {

  if (
    plan === "free"
  ) {

    return {

      id:
        "free",

      amount:
        100,

      interval:
        "month",

      trial:
        true

    };

  }

  if (
    plan === "monthly"
  ) {

    return {

      id:
        "monthly",

      amount:
        100,

      interval:
        "month",

      trial:
        false

    };

  }

  if (
    plan === "annual"
  ) {

    return {

      id:
        "annual",

      amount:
        1000,

      interval:
        "year",

      trial:
        false

    };

  }

  return null;

}

/* =========================================================
   PRICE
========================================================= */

function getSubscriptionPrice(
  subscription
) {

  const items =
    subscription?.items?.data;

  if (
    !Array.isArray(
      items
    ) ||
    !items.length
  ) {

    return null;

  }

  const price =
    items[0]?.price;

  if (
    !price ||
    price.object !==
      "price"
  ) {

    return null;

  }

  return price;

}

/* =========================================================
   CUSTOMER
========================================================= */

function getCustomerId(
  session
) {

  if (
    typeof session.customer ===
      "string"
  ) {

    return session.customer;

  }

  if (
    session.customer &&
    typeof session.customer ===
      "object"
  ) {

    return session.customer.id ||
      null;

  }

  return null;

}

/* =========================================================
   CLUB COOKIE SECRET
========================================================= */

function getCookieSecret(
  stripeSecretKey
) {

  /*
  Preferred:
  PETS_DOGUE_SESSION_SECRET

  If it has not been created yet, derive a private signing
  secret from the existing Stripe secret.

  This means the user does NOT need to stop now and add
  another Vercel environment variable.

  Later PETS_DOGUE_SESSION_SECRET can be added independently.
  */

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
   BASE64 URL
========================================================= */

function base64UrlEncode(
  value
) {

  return Buffer
    .from(
      value,
      "utf8"
    )
    .toString(
      "base64url"
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

/* =========================================================
   COOKIE
========================================================= */

function setClubCookie(
  res,
  payload,
  secret,
  maxAgeSeconds
) {

  const encodedPayload =
    base64UrlEncode(
      JSON.stringify(
        payload
      )
    );

  const signature =
    signCookiePayload(
      encodedPayload,
      secret
    );

  const cookieValue =
    `${COOKIE_VERSION}.${encodedPayload}.${signature}`;

  const maxAge =
    Math.max(
      60,
      Math.min(
        Number(
          maxAgeSeconds
        ) || 3600,
        60 * 60 * 24 * 400
      )
    );

  const parts = [

    `${CLUB_COOKIE_NAME}=${cookieValue}`,

    "Path=/",

    `Max-Age=${Math.floor(
      maxAge
    )}`,

    "HttpOnly",

    "Secure",

    "SameSite=Lax"

  ];

  res.setHeader(
    "Set-Cookie",
    parts.join("; ")
  );

}

/* =========================================================
   CLEAR CLUB COOKIE
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

        verified:
          false,

        active:
          false,

        error:
          "Method not allowed."

      }
    );

  }

  /* =======================================================
     STRIPE CONFIG
  ======================================================= */

  const secretKey =
    cleanString(
      process.env
        .STRIPE_SECRET_KEY ||
      "",
      300
    );

  if (
    !secretKey
  ) {

    console.error(
      "PETS & DOGUE Club verification: STRIPE_SECRET_KEY is missing."
    );

    return sendJson(
      res,
      500,
      {

        ok:
          false,

        verified:
          false,

        active:
          false,

        error:
          "Club verification is not configured."

      }
    );

  }

  /* =======================================================
     REQUEST
  ======================================================= */

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

        verified:
          false,

        active:
          false,

        error:
          "Invalid request."

      }
    );

  }

  const sessionId =
    cleanString(
      body.sessionId || "",
      300
    );

  if (
    !sessionId ||
    !sessionId.startsWith(
      "cs_"
    )
  ) {

    return sendJson(
      res,
      400,
      {

        ok:
          false,

        verified:
          false,

        active:
          false,

        error:
          "A valid Stripe Checkout Session ID is required."

      }
    );

  }

  try {

    /* =====================================================
       CHECKOUT SESSION
    ===================================================== */

    const session =
      await stripeRequest(
        `/checkout/sessions/${encodeURIComponent(
          sessionId
        )}?expand[]=subscription&expand[]=subscription.items.data.price&expand[]=customer`,
        secretKey
      );

    if (
      !session ||
      session.object !==
        "checkout.session"
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        404,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Checkout Session was not found."

        }
      );

    }

    /* =====================================================
       SUBSCRIPTION CHECKOUT ONLY
    ===================================================== */

    if (
      session.mode !==
      "subscription"
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "This Checkout Session is not a Club subscription."

        }
      );

    }

    /* =====================================================
       SESSION METADATA
    ===================================================== */

    const sessionMetadata =
      session.metadata ||
      {};

    if (
      sessionMetadata.source !==
      "pets_dogue_club"
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "This Checkout Session does not belong to PETS & DOGUE Club."

        }
      );

    }

    const plan =
      cleanString(
        sessionMetadata
          .membership_plan ||
        "",
        30
      ).toLowerCase();

    if (
      !VALID_PLANS.has(
        plan
      )
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Invalid PETS & DOGUE Club membership plan."

        }
      );

    }

    const expectedPlan =
      getExpectedPlan(
        plan
      );

    if (
      !expectedPlan
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Unable to verify the selected Club plan."

        }
      );

    }

    /* =====================================================
       CHECKOUT STATUS
    ===================================================== */

    if (
      session.status !==
      "complete"
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

          verified:
            false,

          active:
            false,

          state:
            "checkout_incomplete",

          checkoutStatus:
            session.status ||
            null,

          paymentStatus:
            session.payment_status ||
            null

        }
      );

    }

    /* =====================================================
       SUBSCRIPTION
    ===================================================== */

    const subscription =
      session.subscription &&
      typeof session.subscription ===
        "object"
        ? session.subscription
        : null;

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
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Stripe subscription could not be verified."

        }
      );

    }

    /* =====================================================
       SUBSCRIPTION METADATA
    ===================================================== */

    const subscriptionMetadata =
      subscription.metadata ||
      {};

    if (
      subscriptionMetadata.source !==
      "pets_dogue_club"
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "This subscription does not belong to PETS & DOGUE Club."

        }
      );

    }

    if (
      subscriptionMetadata
        .access_scope !==
      "all_club_benefits"
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Invalid Club access scope."

        }
      );

    }

    if (
      subscriptionMetadata
        .special_offers_access !==
      "all"
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Special Offers access is invalid."

        }
      );

    }

    const subscriptionPlan =
      cleanString(
        subscriptionMetadata
          .membership_plan ||
        "",
        30
      ).toLowerCase();

    if (
      subscriptionPlan !==
      plan
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Checkout plan and Stripe subscription plan do not match."

        }
      );

    }

    /* =====================================================
       SUBSCRIPTION STATUS
    ===================================================== */

    const subscriptionStatus =
      cleanString(
        subscription.status ||
        "",
        50
      ).toLowerCase();

    const active =
      ACTIVE_MEMBERSHIP_STATUSES
        .has(
          subscriptionStatus
        );

    if (
      !active
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

          verified:
            true,

          active:
            false,

          state:
            "membership_inactive",

          membership: {

            plan,

            status:
              subscriptionStatus ||
              "inactive",

            active:
              false,

            access:
              false,

            accessScope:
              null,

            specialOffersAccess:
              false

          }

        }
      );

    }

    /* =====================================================
       PRICE
    ===================================================== */

    const price =
      getSubscriptionPrice(
        subscription
      );

    if (
      !price
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Unable to verify the Stripe subscription price."

        }
      );

    }

    if (
      price.active !==
      true
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "The Club subscription price is inactive."

        }
      );

    }

    if (
      String(
        price.currency ||
        ""
      ).toLowerCase() !==
      "gbp"
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Invalid Club subscription currency."

        }
      );

    }

    if (
      Number(
        price.unit_amount
      ) !==
      expectedPlan.amount
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "The Club subscription amount is invalid."

        }
      );

    }

    if (
      !price.recurring
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "The Club subscription is not recurring."

        }
      );

    }

    if (
      price.recurring.interval !==
      expectedPlan.interval
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "The Club subscription renewal interval is invalid."

        }
      );

    }

    if (
      Number(
        price.recurring
          .interval_count ||
        1
      ) !==
      1
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "The Club subscription billing interval is invalid."

        }
      );

    }

    /* =====================================================
       EMAIL
    ===================================================== */

    const checkoutEmail =
      cleanString(
        session
          .customer_details
          ?.email ||
        session
          .customer_email ||
        "",
        254
      ).toLowerCase();

    const metadataEmail =
      cleanString(
        subscriptionMetadata
          .member_email ||
        sessionMetadata
          .member_email ||
        "",
        254
      ).toLowerCase();

    const customerEmail =
      session.customer &&
      typeof session.customer ===
        "object"
        ? cleanString(
            session.customer.email ||
            "",
            254
          ).toLowerCase()
        : "";

    const memberEmail =
      checkoutEmail ||
      customerEmail ||
      metadataEmail;

    if (
      !memberEmail ||
      !validEmail(
        memberEmail
      )
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Unable to verify the Club member email."

        }
      );

    }

    if (
      checkoutEmail &&
      metadataEmail &&
      checkoutEmail !==
        metadataEmail
    ) {

      clearClubCookie(
        res
      );

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          active:
            false,

          error:
            "Club member email does not match the Stripe customer."

        }
      );

    }

    /* =====================================================
       MEMBER DETAILS
    ===================================================== */

    const firstName =
      cleanString(
        subscriptionMetadata
          .member_first_name ||
        sessionMetadata
          .member_first_name ||
        "",
        100
      );

    const country =
      cleanString(
        subscriptionMetadata
          .country ||
        sessionMetadata
          .country ||
        "",
        10
      ).toUpperCase();

    const language =
      cleanString(
        subscriptionMetadata
          .language ||
        sessionMetadata
          .language ||
        "en",
        10
      ).toLowerCase();

    /* =====================================================
       DATES
    ===================================================== */

    const createdAt =
      unixToIso(
        subscription.created
      );

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

    /* =====================================================
       CREATE SECURE CLUB COOKIE

       Cookie contains only identifiers needed to re-check
       the real Stripe subscription server-side.

       It does NOT contain:
       - Stripe secret key
       - payment card details
       - promo codes
    ===================================================== */

    const nowSeconds =
      Math.floor(
        Date.now() /
        1000
      );

    const stripePeriodEnd =
      Number(
        subscription
          .current_period_end ||
        subscription
          .trial_end ||
        0
      );

    /*
    Cookie must never outlive the current verified Stripe
    billing period.

    Maximum safety cap: 400 days.
    */

    const fallbackSeconds =
      60 * 60;

    const secondsUntilPeriodEnd =
      stripePeriodEnd > nowSeconds
        ? stripePeriodEnd -
          nowSeconds
        : fallbackSeconds;

    const cookieMaxAge =
      Math.max(
        60,
        Math.min(
          secondsUntilPeriodEnd,
          60 * 60 * 24 * 400
        )
      );

    const cookieSecret =
      getCookieSecret(
        secretKey
      );

    setClubCookie(
      res,
      {

        sid:
          session.id,

        sub:
          subscription.id,

        customer:
          getCustomerId(
            session
          ),

        plan,

        email:
          memberEmail,

        iat:
          nowSeconds,

        exp:
          nowSeconds +
          cookieMaxAge

      },
      cookieSecret,
      cookieMaxAge
    );

    /* =====================================================
       MEMBERSHIP OBJECT FOR CURRENT CLUB.HTML
    ===================================================== */

    const membership = {

      plan,

      status:
        subscriptionStatus,

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
        memberEmail,

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
          expectedPlan.amount,

        amountFormatted:
          `£${(
            expectedPlan.amount /
            100
          ).toFixed(2)}`,

        currency:
          "GBP",

        interval:
          expectedPlan.interval

      },

      stripe: {

        checkoutSessionId:
          session.id,

        subscriptionId:
          subscription.id,

        customerId:
          getCustomerId(
            session
          ),

        priceId:
          price.id,

        checkoutStatus:
          session.status,

        paymentStatus:
          session.payment_status,

        subscriptionStatus,

        livemode:
          Boolean(
            session.livemode
          )

      },

      verifiedAt:
        new Date()
          .toISOString()

    };

    /* =====================================================
       SUCCESS
    ===================================================== */

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        verified:
          true,

        active:
          true,

        state:
          "active_membership",

        membership,

        member: {

          firstName,

          email:
            memberEmail,

          country,

          language

        },

        stripe: {

          sessionId:
            session.id,

          subscriptionId:
            subscription.id,

          customerId:
            getCustomerId(
              session
            ),

          priceId:
            price.id,

          checkoutStatus:
            session.status,

          paymentStatus:
            session.payment_status,

          subscriptionStatus,

          livemode:
            Boolean(
              session.livemode
            )

        }

      }
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE verify Club checkout error:",
      error
    );

    clearClubCookie(
      res
    );

    let status =
      500;

    if (
      Number(
        error.status
      ) ===
      404
    ) {

      status =
        404;

    } else if (
      Number(
        error.status
      ) ===
      400
    ) {

      status =
        400;

    }

    return sendJson(
      res,
      status,
      {

        ok:
          false,

        verified:
          false,

        active:
          false,

        state:
          "verification_error",

        error:
          error?.message ||
          "Unable to verify PETS & DOGUE Club membership."

      }
    );

  }

};
