"use strict";

/*
  PETS & DOGUE CLUB
  Stripe Checkout verification

  Purpose:
  - verify Checkout Session directly with Stripe
  - never trust URL parameters alone
  - confirm the selected Club plan from Stripe metadata
  - support paid subscriptions and the complimentary-trial plan
  - return subscription dates when Stripe provides them

  Required Vercel environment variable:
  STRIPE_SECRET_KEY
*/

const STRIPE_API_BASE =
  "https://api.stripe.com/v1";


const ALLOWED_PLANS =
  new Set([
    "free",
    "monthly",
    "annual"
  ]);


function sendJson(
  res,
  status,
  payload
) {

  res.statusCode = status;

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
    JSON.stringify(payload)
  );

}


function cleanString(
  value,
  maxLength = 300
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


function isValidCheckoutSessionId(
  value
) {

  return /^cs_(test|live)_[A-Za-z0-9_]+$/
    .test(
      String(value || "")
    );

}


function unixToIso(
  value
) {

  const timestamp =
    Number(value);

  if (
    !Number.isFinite(timestamp) ||
    timestamp <= 0
  ) {
    return null;
  }

  return new Date(
    timestamp * 1000
  ).toISOString();

}


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

    } catch (error) {

      return {};

    }

  }


  const chunks = [];


  for await (
    const chunk of req
  ) {

    chunks.push(
      Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(chunk)
    );

  }


  if (
    !chunks.length
  ) {
    return {};
  }


  const raw =
    Buffer
      .concat(chunks)
      .toString("utf8")
      .trim();


  if (!raw) {
    return {};
  }


  try {

    return JSON.parse(raw);

  } catch (error) {

    return {};

  }

}


async function stripeGet(
  path,
  secretKey
) {

  const response =
    await fetch(
      `${STRIPE_API_BASE}${path}`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${secretKey}`
        }
      }
    );


  let data = null;


  try {

    data =
      await response.json();

  } catch (error) {

    data = null;

  }


  if (
    !response.ok
  ) {

    const stripeMessage =
      data &&
      data.error &&
      data.error.message
        ? data.error.message
        : "Stripe request failed.";


    const error =
      new Error(
        stripeMessage
      );


    error.status =
      response.status;


    throw error;

  }


  return data;

}


function getCustomerEmail(
  session
) {

  if (
    session &&
    session.customer_details &&
    session.customer_details.email
  ) {

    return cleanString(
      session.customer_details.email,
      254
    );

  }


  if (
    session &&
    session.customer_email
  ) {

    return cleanString(
      session.customer_email,
      254
    );

  }


  if (
    session &&
    session.metadata &&
    session.metadata.member_email
  ) {

    return cleanString(
      session.metadata.member_email,
      254
    );

  }


  return "";

}


function getMembershipPlan(
  session,
  subscription
) {

  const candidates = [

    session &&
    session.metadata &&
    session.metadata.membership_plan,

    subscription &&
    subscription.metadata &&
    subscription.metadata.membership_plan

  ];


  for (
    const candidate of candidates
  ) {

    const value =
      cleanString(
        candidate || "",
        30
      );


    if (
      ALLOWED_PLANS.has(value)
    ) {
      return value;
    }

  }


  return "";

}


function subscriptionIsUsable(
  subscription
) {

  if (
    !subscription ||
    typeof subscription !== "object"
  ) {
    return false;
  }


  /*
    Valid Club states.

    trialing:
      complimentary month is active

    active:
      paid subscription is active

    past_due:
      payment issue exists, therefore do NOT activate a new membership

    incomplete:
      payment still unfinished

    incomplete_expired:
      failed

    canceled:
      not active

    unpaid:
      not active
  */

  return [
    "trialing",
    "active"
  ].includes(
    subscription.status
  );

}


function checkoutIsComplete(
  session
) {

  return Boolean(
    session &&
    session.status === "complete"
  );

}


function checkoutPaymentIsAcceptable(
  session,
  subscription
) {

  if (
    !session
  ) {
    return false;
  }


  /*
    Standard paid subscription:
      payment_status = paid

    Free 30-day trial:
      payment_status can be no_payment_required

    The subscription itself must additionally be
    active or trialing.
  */

  const paymentStatus =
    cleanString(
      session.payment_status || "",
      50
    );


  if (
    paymentStatus === "paid"
  ) {
    return true;
  }


  if (
    paymentStatus ===
      "no_payment_required" &&
    subscription &&
    subscription.status === "trialing"
  ) {
    return true;
  }


  return false;

}


module.exports =
async function handler(
  req,
  res
) {

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
        ok: false,
        verified: false,
        error:
          "Method not allowed."
      }
    );

  }


  const secretKey =
    cleanString(
      process.env.STRIPE_SECRET_KEY || "",
      300
    );


  if (
    !secretKey
  ) {

    console.error(
      "PETS & DOGUE: STRIPE_SECRET_KEY is not configured."
    );


    return sendJson(
      res,
      500,
      {
        ok: false,
        verified: false,
        error:
          "Payment verification is not configured."
      }
    );

  }


  let body = {};


  try {

    body =
      await readRequestBody(
        req
      );

  } catch (error) {

    return sendJson(
      res,
      400,
      {
        ok: false,
        verified: false,
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
    !isValidCheckoutSessionId(
      sessionId
    )
  ) {

    return sendJson(
      res,
      400,
      {
        ok: false,
        verified: false,
        error:
          "Invalid Checkout Session."
      }
    );

  }


  try {

    /*
      Step 1:
      Retrieve Checkout Session directly from Stripe.
    */

    const session =
      await stripeGet(
        `/checkout/sessions/${encodeURIComponent(sessionId)}`,
        secretKey
      );


    if (
      !checkoutIsComplete(
        session
      )
    ) {

      return sendJson(
        res,
        200,
        {
          ok: true,
          verified: false,
          state:
            "checkout_not_complete"
        }
      );

    }


    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : (
            session.subscription &&
            session.subscription.id
          )
          ? session.subscription.id
          : "";


    if (
      !subscriptionId
    ) {

      return sendJson(
        res,
        200,
        {
          ok: true,
          verified: false,
          state:
            "subscription_missing"
        }
      );

    }


    /*
      Step 2:
      Retrieve the subscription separately.

      This prevents the browser from deciding whether
      membership is active.
    */

    const subscription =
      await stripeGet(
        `/subscriptions/${encodeURIComponent(subscriptionId)}`,
        secretKey
      );


    const plan =
      getMembershipPlan(
        session,
        subscription
      );


    if (
      !plan
    ) {

      console.error(
        "PETS & DOGUE: verified Stripe session has no valid Club plan.",
        sessionId
      );


      return sendJson(
        res,
        200,
        {
          ok: true,
          verified: false,
          state:
            "invalid_membership_plan"
        }
      );

    }


    const usableSubscription =
      subscriptionIsUsable(
        subscription
      );


    const acceptablePayment =
      checkoutPaymentIsAcceptable(
        session,
        subscription
      );


    if (
      !usableSubscription ||
      !acceptablePayment
    ) {

      return sendJson(
        res,
        200,
        {
          ok: true,
          verified: false,

          state:
            "membership_not_active",

          subscriptionStatus:
            cleanString(
              subscription.status || "",
              50
            ),

          paymentStatus:
            cleanString(
              session.payment_status || "",
              50
            )
        }
      );

    }


    const email =
      getCustomerEmail(
        session
      );


    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : (
            session.customer &&
            session.customer.id
          )
          ? session.customer.id
          : "";


    const memberName =
      cleanString(
        session.metadata &&
        session.metadata.member_first_name
          ? session.metadata.member_first_name
          : "",
        100
      );


    const country =
      cleanString(
        session.metadata &&
        session.metadata.country
          ? session.metadata.country
          : "",
        10
      )
        .toUpperCase();


    const language =
      cleanString(
        session.metadata &&
        session.metadata.language
          ? session.metadata.language
          : "en",
        10
      )
        .toLowerCase();


    const petName =
      cleanString(
        session.metadata &&
        session.metadata.pet_name
          ? session.metadata.pet_name
          : "",
        100
      );


    const petType =
      cleanString(
        session.metadata &&
        session.metadata.pet_type
          ? session.metadata.pet_type
          : "",
        50
      );


    const petBreed =
      cleanString(
        session.metadata &&
        session.metadata.pet_breed
          ? session.metadata.pet_breed
          : "",
        150
      );


    const petBreedId =
      cleanString(
        session.metadata &&
        session.metadata.pet_breed_id
          ? session.metadata.pet_breed_id
          : "",
        150
      );


    const currentPeriodStart =
      unixToIso(
        subscription.current_period_start
      );


    const currentPeriodEnd =
      unixToIso(
        subscription.current_period_end
      );


    const trialStart =
      unixToIso(
        subscription.trial_start
      );


    const trialEnd =
      unixToIso(
        subscription.trial_end
      );


    const created =
      unixToIso(
        subscription.created
      );


    /*
      For a trial membership the actual membership starts
      immediately, not when the first £1 payment occurs.
    */

    const membershipStart =
      trialStart ||
      created ||
      currentPeriodStart;


    /*
      The currently valid membership period ends at Stripe's
      current_period_end.

      We return the Stripe value itself. The frontend can
      display it in the selected language.
    */

    const membershipValidUntil =
      currentPeriodEnd ||
      trialEnd;


    const nextPayment =
      subscription.status === "trialing"
        ? trialEnd
        : currentPeriodEnd;


    /*
      Never return card numbers, CVC or sensitive payment data.
    */

    return sendJson(
      res,
      200,
      {
        ok: true,
        verified: true,

        state:
          subscription.status === "trialing"
            ? "trial_active"
            : "membership_active",

        membership: {

          plan,

          status:
            subscription.status,

          email,

          memberName,

          country,

          language,

          pet: {
            name:
              petName,

            type:
              petType,

            breed:
              petBreed,

            breedId:
              petBreedId
          },

          stripe: {

            checkoutSessionId:
              session.id,

            customerId,

            subscriptionId:
              subscription.id,

            paymentStatus:
              session.payment_status

          },

          dates: {

            startedAt:
              membershipStart,

            validUntil:
              membershipValidUntil,

            nextPayment,

            trialEndsAt:
              trialEnd

          }

        }

      }
    );


  } catch (error) {

    console.error(
      "PETS & DOGUE Stripe verification error:",
      error
    );


    const status =
      Number(error.status) === 404
        ? 404
        : 500;


    return sendJson(
      res,
      status,
      {
        ok: false,
        verified: false,

        error:
          status === 404
            ? "Checkout Session was not found."
            : "Unable to verify the payment session."
      }
    );

  }

};
