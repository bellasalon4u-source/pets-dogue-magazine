"use strict";

/*
=========================================================
PETS & DOGUE CLUB
VERIFY STRIPE MEMBERSHIP CHECKOUT
=========================================================

Purpose:

- Verify a PETS & DOGUE Club Stripe Checkout Session
- Verify the real Stripe Subscription
- Confirm that the subscription belongs to PETS & DOGUE
- Confirm membership plan
- Confirm recurring Stripe price
- Confirm active/trialing membership status
- Return safe membership data to club.html

IMPORTANT:

This endpoint does NOT trust browser/localStorage values.

Stripe is the source of truth.
=========================================================
*/

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

    const message =
      data?.error?.message ||
      "Stripe request failed.";

    const error =
      new Error(
        message
      );

    error.status =
      response.status;

    throw error;

  }

  return data;

}

/* =========================================================
   PLAN CONFIGURATION
========================================================= */

function getExpectedPlan(
  plan
) {

  if (
    plan === "free"
  ) {

    return {

      plan:
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

      plan:
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

      plan:
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
   DATE
========================================================= */

function unixToIso(
  unix
) {

  const value =
    Number(
      unix
    );

  if (
    !Number.isFinite(
      value
    ) ||
    value <= 0
  ) {

    return null;

  }

  return new Date(
    value * 1000
  ).toISOString();

}

/* =========================================================
   SUBSCRIPTION ITEM
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

  const item =
    items[0];

  const price =
    item?.price;

  if (
    !price ||
    price.object !== "price"
  ) {

    return null;

  }

  return price;

}

/* =========================================================
   MAIN HANDLER
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
    req.method !== "POST"
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

        error:
          "Method not allowed."

      }
    );

  }

  /* =======================================================
     CONFIGURATION
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

        error:
          "Club verification is not configured."

      }
    );

  }

  /* =======================================================
     BODY
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

        error:
          "A valid Stripe Checkout Session ID is required."

      }
    );

  }

  try {

    /* =====================================================
       LOAD CHECKOUT SESSION

       Expand:
       - subscription
       - subscription items prices
       - customer
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

      return sendJson(
        res,
        404,
        {

          ok:
            false,

          verified:
            false,

          error:
            "Checkout Session was not found."

        }
      );

    }

    /* =====================================================
       CHECKOUT MODE
    ===================================================== */

    if (
      session.mode !==
      "subscription"
    ) {

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
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

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
            false,

          error:
            "This payment does not belong to PETS & DOGUE Club."

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

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
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

      return sendJson(
        res,
        400,
        {

          ok:
            false,

          verified:
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

          checkoutStatus:
            session.status ||
            null,

          paymentStatus:
            session.payment_status ||
            null,

          message:
            "Stripe Checkout has not been completed."

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
            "Checkout plan and subscription plan do not match."

        }
      );

    }

    /* =====================================================
       SUBSCRIPTION STATUS

       Club access is valid only while Stripe says:
       - trialing
       - active
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

          membership: {

            plan,

            status:
              subscriptionStatus ||
              "inactive",

            access:
              false

          },

          stripe: {

            sessionId:
              session.id,

            subscriptionId:
              subscription.id

          }

        }
      );

    }

    /* =====================================================
       VERIFY REAL RECURRING PRICE
    ===================================================== */

    const price =
      getSubscriptionPrice(
        subscription
      );

    if (
      !price
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
            "Unable to verify the Stripe subscription price."

        }
      );

    }

    if (
      price.active !== true
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
       MEMBER EMAIL
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

    const memberEmail =
      checkoutEmail ||
      metadataEmail;

    if (
      !memberEmail ||
      !validEmail(
        memberEmail
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
            "Unable to verify the Club member email."

        }
      );

    }

    /*
    If both values exist they should belong to the same member.
    */

    if (
      checkoutEmail &&
      metadataEmail &&
      checkoutEmail !==
        metadataEmail
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
            "Club member email does not match the Stripe customer."

        }
      );

    }

    /* =====================================================
       MEMBER
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
       SUBSCRIPTION DATES
    ===================================================== */

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

    /* =====================================================
       CUSTOMER
    ===================================================== */

    const customer =
      session.customer &&
      typeof session.customer ===
        "object"
        ? session.customer
        : null;

    const customerId =
      typeof session.customer ===
        "string"
        ? session.customer
        : customer?.id ||
          null;

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

        membership: {

          status:
            subscriptionStatus,

          plan,

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

          currentPeriodStart,

          currentPeriodEnd,

          trialStart,

          trialEnd,

          createdAt

        },

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

          customerId,

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

        error:
          error?.message ||
          "Unable to verify PETS & DOGUE Club membership."

      }
    );

  }

};
