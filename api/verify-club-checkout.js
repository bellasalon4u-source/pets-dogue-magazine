"use strict";

/*
=========================================================
PETS & DOGUE CLUB
VERIFY STRIPE MEMBERSHIP CHECKOUT
=========================================================

Stripe is the source of truth.

This endpoint:

- verifies the Stripe Checkout Session
- verifies the real recurring Stripe Subscription
- confirms PETS & DOGUE Club metadata
- confirms the selected membership plan
- confirms price / currency / billing interval
- accepts Club access only for:
  active
  trialing
- returns data in the structure already expected
  by the current club.html
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
    price.object !== "price"
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
       MUST BE SUBSCRIPTION CHECKOUT
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

          active:
            false,

          error:
            "This Checkout Session is not a Club subscription."

        }
      );

    }

    /* =====================================================
       CHECKOUT METADATA
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
       CHECKOUT MUST BE COMPLETE
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
            "Checkout plan and Stripe subscription plan do not match."

        }
      );

    }

    /* =====================================================
       REAL STRIPE STATUS
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

    /*
    Do not grant Club access for:

    incomplete
    incomplete_expired
    past_due
    unpaid
    canceled
    paused
    */

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
              false,

            email:
              "",

            stripe: {

              checkoutSessionId:
                session.id,

              subscriptionId:
                subscription.id,

              customerId:
                getCustomerId(
                  session
                )

            }

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

    /* =====================================================
       CURRENCY
    ===================================================== */

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

    /* =====================================================
       PRICE AMOUNT
    ===================================================== */

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

    /* =====================================================
       RECURRING
    ===================================================== */

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
       VERIFY EMAIL
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
    Metadata was created by our Checkout endpoint.

    If Stripe Checkout has an email and metadata has
    an email, they must represent the same member.
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

       These names intentionally match the structure
       already used by current club.html.
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

    /*
    For trial:
    membership begins at trial_start.

    Otherwise:
    current_period_start is the best start value.
    */

    const startedAt =
      trialStart ||
      currentPeriodStart ||
      createdAt;

    /*
    Current Club access remains valid through the
    current Stripe billing period.

    During the free introductory membership this
    will normally be the end of the current trial /
    subscription period.
    */

    const validUntil =
      currentPeriodEnd ||
      trialEnd ||
      null;

    /*
    If cancellation is already scheduled,
    there is no future renewal payment.

    Otherwise current_period_end is the next
    renewal point.
    */

    const nextPayment =
      subscription
        .cancel_at_period_end === true
        ? null
        : currentPeriodEnd;

    /* =====================================================
       BILLING
    ===================================================== */

    const billingAmount =
      expectedPlan.amount;

    const billingFormatted =
      `£${(
        billingAmount /
        100
      ).toFixed(2)}`;

    /* =====================================================
       MEMBERSHIP OBJECT

       IMPORTANT:

       Current club.html stores THIS object directly
       in localStorage under:

       petsDogueMembership

       Therefore all fields needed by Club and
       Special Offers are included inside it.
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
          billingAmount,

        amountFormatted:
          billingFormatted,

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

        /*
        Also return structured fields outside membership
        for future server-side integrations.
        */

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
