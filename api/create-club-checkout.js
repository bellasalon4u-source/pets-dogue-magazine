"use strict";

/*
  PETS & DOGUE CLUB
  Stripe Checkout Session creator

  Plans:
  - free   = 30-day complimentary trial, then £1/month
  - monthly = £1/month
  - annual  = £10/year

  Stripe Checkout automatically offers supported payment methods
  such as:
  - Apple Pay
  - Google Pay
  - credit/debit cards

  depending on the customer's device, browser, country,
  Stripe account settings and domain verification.

  Required Vercel environment variable:
  STRIPE_SECRET_KEY

  Recommended:
  PUBLIC_SITE_URL=https://your-domain.com
*/

const STRIPE_API_URL =
  "https://api.stripe.com/v1/checkout/sessions";


const PLANS = {

  free: {
    id: "free",
    name: "PETS & DOGUE Club — Complimentary Trial",
    description:
      "30-day complimentary trial, then £1 per month until cancelled.",
    amount: 100,
    currency: "gbp",
    interval: "month",
    intervalCount: 1,
    trialDays: 30
  },

  monthly: {
    id: "monthly",
    name: "PETS & DOGUE Club — Monthly Membership",
    description:
      "PETS & DOGUE Club monthly membership.",
    amount: 100,
    currency: "gbp",
    interval: "month",
    intervalCount: 1,
    trialDays: 0
  },

  annual: {
    id: "annual",
    name: "PETS & DOGUE Club — Annual Membership",
    description:
      "PETS & DOGUE Club annual membership.",
    amount: 1000,
    currency: "gbp",
    interval: "year",
    intervalCount: 1,
    trialDays: 0
  }

};


const STRIPE_LOCALES = new Set([
  "auto",
  "bg",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "fi",
  "fr",
  "hu",
  "it",
  "ja",
  "nb",
  "nl",
  "pl",
  "pt",
  "ro",
  "ru",
  "sk",
  "sv",
  "tr"
]);


function sendJson(res, status, payload) {

  res.statusCode = status;

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store, max-age=0"
  );

  res.end(
    JSON.stringify(payload)
  );

}


function cleanString(value, maxLength = 250) {

  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .slice(0, maxLength);

}


function validEmail(value) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(value || "").trim()
  );

}


function getRequestOrigin(req) {

  const configured =
    cleanString(
      process.env.PUBLIC_SITE_URL || "",
      500
    );

  if (configured) {

    return configured.replace(
      /\/+$/,
      ""
    );

  }

  const forwardedProto =
    cleanString(
      req.headers["x-forwarded-proto"] || "",
      20
    );

  const protocol =
    forwardedProto === "http"
      ? "http"
      : "https";

  const forwardedHost =
    cleanString(
      req.headers["x-forwarded-host"] || "",
      300
    );

  const regularHost =
    cleanString(
      req.headers.host || "",
      300
    );

  const host =
    forwardedHost ||
    regularHost;

  if (!host) {
    return "";
  }

  return `${protocol}://${host}`;

}


function getStripeLocale(language) {

  const normalized =
    cleanString(
      language || "",
      10
    )
      .toLowerCase()
      .split("-")[0];

  if (normalized === "no") {
    return "nb";
  }

  if (
    normalized === "uk" ||
    normalized === "ar" ||
    normalized === "hi"
  ) {

    return "auto";

  }

  return STRIPE_LOCALES.has(normalized)
    ? normalized
    : "auto";

}


function append(
  params,
  key,
  value
) {

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {

    return;

  }

  params.append(
    key,
    String(value)
  );

}


async function readRequestBody(req) {

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

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  const raw =
    Buffer
      .concat(chunks)
      .toString("utf8");

  if (!raw.trim()) {
    return {};
  }

  try {

    return JSON.parse(raw);

  } catch (error) {

    return {};

  }

}


module.exports = async function handler(
  req,
  res
) {

  if (req.method !== "POST") {

    res.setHeader(
      "Allow",
      "POST"
    );

    return sendJson(
      res,
      405,
      {
        ok: false,
        error: "Method not allowed."
      }
    );

  }


  const stripeSecretKey =
    cleanString(
      process.env.STRIPE_SECRET_KEY || "",
      300
    );


  if (!stripeSecretKey) {

    console.error(
      "PETS & DOGUE: STRIPE_SECRET_KEY is not configured."
    );

    return sendJson(
      res,
      500,
      {
        ok: false,
        error:
          "Payment service is not configured yet."
      }
    );

  }


  let body;

  try {

    body =
      await readRequestBody(req);

  } catch (error) {

    return sendJson(
      res,
      400,
      {
        ok: false,
        error: "Invalid request."
      }
    );

  }


  const planId =
    cleanString(
      body.plan || "",
      30
    );


  const plan =
    PLANS[planId];


  if (!plan) {

    return sendJson(
      res,
      400,
      {
        ok: false,
        error: "Invalid membership plan."
      }
    );

  }


  const email =
    cleanString(
      body.email || "",
      254
    );


  if (!validEmail(email)) {

    return sendJson(
      res,
      400,
      {
        ok: false,
        error: "A valid email address is required."
      }
    );

  }


  const firstName =
    cleanString(
      body.firstName || "",
      100
    );


  const country =
    cleanString(
      body.country || "",
      10
    )
      .toUpperCase();


  const petName =
    cleanString(
      body.petName || "",
      100
    );


  const petType =
    cleanString(
      body.petType || "",
      50
    );


  const breed =
    cleanString(
      body.breed || "",
      150
    );


  const breedId =
    cleanString(
      body.breedId || "",
      150
    );


  const language =
    cleanString(
      body.language || "en",
      10
    )
      .toLowerCase();


  const origin =
    getRequestOrigin(req);


  if (!origin) {

    return sendJson(
      res,
      500,
      {
        ok: false,
        error:
          "Unable to determine the website address."
      }
    );

  }


  const successUrl =
    `${origin}/club.html` +
    `?membership=success` +
    `&plan=${encodeURIComponent(plan.id)}` +
    `&session_id={CHECKOUT_SESSION_ID}`;


  const cancelUrl =
    `${origin}/club.html` +
    `?membership=cancelled` +
    `&plan=${encodeURIComponent(plan.id)}`;


  const params =
    new URLSearchParams();


  append(
    params,
    "mode",
    "subscription"
  );


  append(
    params,
    "success_url",
    successUrl
  );


  append(
    params,
    "cancel_url",
    cancelUrl
  );


  append(
    params,
    "customer_email",
    email
  );


  append(
    params,
    "client_reference_id",
    `club_${plan.id}_${Date.now()}`
  );


  append(
    params,
    "locale",
    getStripeLocale(language)
  );


  append(
    params,
    "allow_promotion_codes",
    "true"
  );


  append(
    params,
    "billing_address_collection",
    "auto"
  );


  /*
    Stripe "card" payment method includes eligible wallets
    such as Apple Pay and Google Pay inside Stripe Checkout.
  */

  append(
    params,
    "payment_method_types[0]",
    "card"
  );


  /*
    Subscription price.
  */

  append(
    params,
    "line_items[0][quantity]",
    "1"
  );


  append(
    params,
    "line_items[0][price_data][currency]",
    plan.currency
  );


  append(
    params,
    "line_items[0][price_data][unit_amount]",
    plan.amount
  );


  append(
    params,
    "line_items[0][price_data][recurring][interval]",
    plan.interval
  );


  append(
    params,
    "line_items[0][price_data][recurring][interval_count]",
    plan.intervalCount
  );


  append(
    params,
    "line_items[0][price_data][product_data][name]",
    plan.name
  );


  append(
    params,
    "line_items[0][price_data][product_data][description]",
    plan.description
  );


  /*
    The free plan is not a fake £0 subscription.

    Stripe creates the real £1/month subscription,
    stores a valid payment method and starts charging only
    after the complimentary 30-day trial.
  */

  if (plan.trialDays > 0) {

    append(
      params,
      "subscription_data[trial_period_days]",
      plan.trialDays
    );

  }


  /*
    Metadata is useful later for:
    - webhook verification
    - account creation
    - membership records
    - receipts
    - customer support
  */

  append(
    params,
    "metadata[brand]",
    "PETS & DOGUE"
  );


  append(
    params,
    "metadata[membership_plan]",
    plan.id
  );


  append(
    params,
    "metadata[member_email]",
    email
  );


  append(
    params,
    "metadata[member_first_name]",
    firstName
  );


  append(
    params,
    "metadata[country]",
    country
  );


  append(
    params,
    "metadata[language]",
    language
  );


  append(
    params,
    "metadata[pet_name]",
    petName
  );


  append(
    params,
    "metadata[pet_type]",
    petType
  );


  append(
    params,
    "metadata[pet_breed]",
    breed
  );


  append(
    params,
    "metadata[pet_breed_id]",
    breedId
  );


  append(
    params,
    "subscription_data[metadata][membership_plan]",
    plan.id
  );


  append(
    params,
    "subscription_data[metadata][member_email]",
    email
  );


  append(
    params,
    "subscription_data[metadata][language]",
    language
  );


  append(
    params,
    "subscription_data[metadata][pet_name]",
    petName
  );


  append(
    params,
    "subscription_data[metadata][pet_type]",
    petType
  );


  append(
    params,
    "subscription_data[metadata][pet_breed_id]",
    breedId
  );


  try {

    const stripeResponse =
      await fetch(
        STRIPE_API_URL,
        {
          method: "POST",

          headers: {

            Authorization:
              `Bearer ${stripeSecretKey}`,

            "Content-Type":
              "application/x-www-form-urlencoded"

          },

          body:
            params.toString()

        }
      );


    const stripeData =
      await stripeResponse.json();


    if (
      !stripeResponse.ok ||
      !stripeData ||
      !stripeData.id ||
      !stripeData.url
    ) {

      console.error(
        "PETS & DOGUE Stripe Checkout error:",
        stripeData
      );


      return sendJson(
        res,
        stripeResponse.status || 500,
        {
          ok: false,
          error:
            stripeData &&
            stripeData.error &&
            stripeData.error.message
              ? stripeData.error.message
              : "Unable to create payment session."
        }
      );

    }


    return sendJson(
      res,
      200,
      {
        ok: true,

        sessionId:
          stripeData.id,

        checkoutUrl:
          stripeData.url,

        plan:
          plan.id

      }
    );


  } catch (error) {

    console.error(
      "PETS & DOGUE payment server error:",
      error
    );


    return sendJson(
      res,
      500,
      {
        ok: false,
        error:
          "Unable to connect to the payment service."
      }
    );

  }

};
