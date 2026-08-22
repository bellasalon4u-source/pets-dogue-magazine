"use strict";

/*
=========================================================
PETS & DOGUE CLUB
Stripe recurring subscription checkout
=========================================================

ACCESS:
Every active PETS & DOGUE Club subscription receives
the same Club benefits and Special Offers access.

PLANS:

free
- £0 today
- 30 day free trial
- then £1 every month
- renews automatically until cancelled

monthly
- £1 today
- £1 every month
- renews automatically until cancelled

annual
- £10 today
- £10 every year
- renews automatically until cancelled

REQUIRED ENVIRONMENT VARIABLES:

STRIPE_SECRET_KEY
STRIPE_PRICE_MONTHLY
STRIPE_PRICE_ANNUAL

OPTIONAL:

PUBLIC_SITE_URL
SITE_URL
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

const VALID_LANGUAGES =
  new Set([
    "en",
    "uk",
    "ru",
    "fr",
    "de",
    "es",
    "it",
    "pt",
    "nl",
    "pl",
    "cs",
    "sk",
    "hu",
    "ro",
    "bg",
    "el",
    "sv",
    "da",
    "no",
    "fi",
    "tr",
    "ar",
    "hi"
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
   SITE ORIGIN
========================================================= */

function getOrigin(
  req
) {

  const configured =
    cleanString(
      process.env.PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      "",
      500
    );

  if (
    configured
  ) {

    return configured.replace(
      /\/+$/,
      ""
    );
  }

  const proto =
    cleanString(
      req.headers[
        "x-forwarded-proto"
      ] || "",
      20
    ) || "https";

  const host =
    cleanString(
      req.headers[
        "x-forwarded-host"
      ] ||
      req.headers.host ||
      "",
      300
    );

  if (
    !host
  ) {
    return "";
  }

  return `${proto}://${host}`;

}

/* =========================================================
   STRIPE REQUEST
========================================================= */

async function stripeRequest(
  path,
  secretKey,
  options = {}
) {

  const method =
    options.method || "GET";

  const fetchOptions = {
    method,
    headers: {
      Authorization:
        `Bearer ${secretKey}`
    }
  };

  if (
    options.params
  ) {

    fetchOptions.headers[
      "Content-Type"
    ] =
      "application/x-www-form-urlencoded";

    fetchOptions.body =
      options.params.toString();

  }

  const response =
    await fetch(
      `${STRIPE_API_BASE}${path}`,
      fetchOptions
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
   STRIPE LANGUAGE
========================================================= */

function stripeLocale(
  language
) {

  const locales = {

    en:
      "en",

    uk:
      "auto",

    ru:
      "ru",

    fr:
      "fr",

    de:
      "de",

    es:
      "es",

    it:
      "it",

    pt:
      "pt-BR",

    nl:
      "nl",

    pl:
      "pl",

    cs:
      "cs",

    sk:
      "auto",

    hu:
      "hu",

    ro:
      "ro",

    bg:
      "bg",

    el:
      "el",

    sv:
      "sv",

    da:
      "da",

    no:
      "nb",

    fi:
      "fi",

    tr:
      "tr",

    ar:
      "auto",

    hi:
      "auto"

  };

  return locales[
    language
  ] || "auto";

}

/* =========================================================
   PLAN
========================================================= */

function getPlanConfig(
  plan
) {

  const monthlyPriceId =
    cleanString(
      process.env
        .STRIPE_PRICE_MONTHLY ||
      "",
      300
    );

  const annualPriceId =
    cleanString(
      process.env
        .STRIPE_PRICE_ANNUAL ||
      "",
      300
    );

  if (
    plan === "free"
  ) {

    return {

      id:
        "free",

      priceId:
        monthlyPriceId,

      expectedAmount:
        100,

      expectedInterval:
        "month",

      trialDays:
        30,

      billingLabel:
        "£1/month after 30-day trial"

    };

  }

  if (
    plan === "monthly"
  ) {

    return {

      id:
        "monthly",

      priceId:
        monthlyPriceId,

      expectedAmount:
        100,

      expectedInterval:
        "month",

      trialDays:
        0,

      billingLabel:
        "£1/month"

    };

  }

  if (
    plan === "annual"
  ) {

    return {

      id:
        "annual",

      priceId:
        annualPriceId,

      expectedAmount:
        1000,

      expectedInterval:
        "year",

      trialDays:
        0,

      billingLabel:
        "£10/year"

    };

  }

  return null;

}

/* =========================================================
   VALIDATE STRIPE PRICE

   This prevents an accidental Stripe configuration such as:
   - monthly price configured as one-time
   - annual price configured as monthly
   - wrong amount
   - wrong currency
========================================================= */

async function validateRecurringPrice(
  priceId,
  config,
  secretKey
) {

  if (
    !priceId
  ) {

    throw new Error(
      "Stripe membership price is not configured."
    );
  }

  const price =
    await stripeRequest(
      `/prices/${encodeURIComponent(
        priceId
      )}`,
      secretKey
    );

  if (
    !price ||
    price.object !== "price"
  ) {

    throw new Error(
      "Invalid Stripe membership price."
    );
  }

  if (
    price.active !== true
  ) {

    throw new Error(
      "Stripe membership price is inactive."
    );
  }

  if (
    String(
      price.currency || ""
    ).toLowerCase() !==
    "gbp"
  ) {

    throw new Error(
      "Membership price must use GBP."
    );
  }

  if (
    Number(
      price.unit_amount
    ) !==
    config.expectedAmount
  ) {

    throw new Error(
      `Incorrect Stripe amount for ${config.id} membership.`
    );
  }

  if (
    !price.recurring
  ) {

    throw new Error(
      "Membership Stripe Price must be recurring."
    );
  }

  if (
    price.recurring.interval !==
    config.expectedInterval
  ) {

    throw new Error(
      `Incorrect Stripe renewal interval for ${config.id} membership.`
    );
  }

  if (
    Number(
      price.recurring
        .interval_count || 1
    ) !== 1
  ) {

    throw new Error(
      "Membership billing interval must renew every single billing period."
    );
  }

  return price;

}

/* =========================================================
   METADATA
========================================================= */

function appendMetadata(
  params,
  prefix,
  metadata
) {

  Object.entries(
    metadata
  )
  .forEach(
    ([key,value]) => {

      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        return;
      }

      params.append(
        `${prefix}[${key}]`,
        String(
          value
        )
      );

    }
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

        error:
          "Method not allowed."
      }
    );

  }

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
      "PETS & DOGUE: STRIPE_SECRET_KEY is missing."
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Stripe Checkout is not configured."
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

  /* =======================================================
     PLAN
  ======================================================= */

  const plan =
    cleanString(
      body.plan || "",
      30
    )
    .toLowerCase();

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

        error:
          "Invalid membership plan."
      }
    );

  }

  const planConfig =
    getPlanConfig(
      plan
    );

  if (
    !planConfig ||
    !planConfig.priceId
  ) {

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "This membership plan is not configured yet."
      }
    );

  }

  /* =======================================================
     MEMBER
  ======================================================= */

  const firstName =
    cleanString(
      body.firstName || "",
      100
    );

  const email =
    cleanString(
      body.email || "",
      254
    )
    .toLowerCase();

  const country =
    cleanString(
      body.country || "",
      10
    )
    .toUpperCase();

  if (
    !firstName
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "First name is required."
      }
    );

  }

  if (
    !validEmail(
      email
    )
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "A valid email address is required."
      }
    );

  }

  if (
    !country
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "Country is required."
      }
    );

  }

  /* =======================================================
     LANGUAGE
  ======================================================= */

  let language =
    cleanString(
      body.language || "en",
      10
    )
    .toLowerCase();

  if (
    !VALID_LANGUAGES.has(
      language
    )
  ) {

    language =
      "en";

  }

  /* =======================================================
     OPTIONAL PET DETAILS
  ======================================================= */

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

  const petBreed =
    cleanString(
      body.breed || "",
      150
    );

  const petBreedId =
    cleanString(
      body.breedId || "",
      150
    );

  /* =======================================================
     ORIGIN
  ======================================================= */

  const origin =
    getOrigin(
      req
    );

  if (
    !origin
  ) {

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Unable to determine the website address."
      }
    );

  }

  try {

    /* =====================================================
       SECURITY CHECK:
       VERIFY REAL STRIPE RECURRING PRICE
    ===================================================== */

    const stripePrice =
      await validateRecurringPrice(
        planConfig.priceId,
        planConfig,
        secretKey
      );

    /* =====================================================
       SHARED CLUB ACCESS

       IMPORTANT:
       Monthly and annual subscribers receive exactly
       the same benefits.

       "free" is simply a monthly subscription with
       a 30-day introductory trial.
    ===================================================== */

    const metadata = {

      membership_plan:
        plan,

      access_scope:
        "all_club_benefits",

      special_offers_access:
        "all",

      subscription_type:
        "recurring",

      auto_renew:
        "true",

      billing_interval:
        planConfig.expectedInterval,

      billing_label:
        planConfig.billingLabel,

      trial_days:
        String(
          planConfig.trialDays
        ),

      member_first_name:
        firstName,

      member_email:
        email,

      country:
        country,

      language:
        language,

      pet_name:
        petName,

      pet_type:
        petType,

      pet_breed:
        petBreed,

      pet_breed_id:
        petBreedId,

      source:
        "pets_dogue_club"

    };

    /* =====================================================
       CREATE CHECKOUT SESSION
    ===================================================== */

    const params =
      new URLSearchParams();

    /*
    Recurring subscription.

    This is the key Stripe setting that makes:
    monthly → monthly renewal
    annual  → annual renewal
    */

    params.append(
      "mode",
      "subscription"
    );

    /*
    Use the verified recurring Stripe Price.
    */

    params.append(
      "line_items[0][price]",
      stripePrice.id
    );

    params.append(
      "line_items[0][quantity]",
      "1"
    );

    /*
    Payment method is saved for recurring charges.

    This is especially important for:
    £0 today → £1/month after trial.
    */

    params.append(
      "payment_method_collection",
      "always"
    );

    /*
    Card also enables eligible Apple Pay / Google Pay
    through Stripe Checkout when supported.
    */

    params.append(
      "payment_method_types[]",
      "card"
    );

    /*
    Known member email.
    */

    params.append(
      "customer_email",
      email
    );

    /*
    Localised Stripe Checkout.
    */

    params.append(
      "locale",
      stripeLocale(
        language
      )
    );

    params.append(
      "billing_address_collection",
      "auto"
    );

    /*
    Do not automatically cancel.
    Stripe subscriptions continue renewing until
    the member cancels them.
    */

    params.append(
      "subscription_data[metadata][auto_renew]",
      "true"
    );

    /*
    Store our full metadata on both:
    Checkout Session
    Subscription
    */

    appendMetadata(
      params,
      "metadata",
      metadata
    );

    appendMetadata(
      params,
      "subscription_data[metadata]",
      metadata
    );

    /*
    30-day free introductory period.

    This is still a normal MONTHLY recurring
    subscription. Only the first 30 days are free.
    */

    if (
      planConfig.trialDays > 0
    ) {

      params.append(
        "subscription_data[trial_period_days]",
        String(
          planConfig.trialDays
        )
      );

      /*
      If the future payment fails after the trial,
      Stripe cancels instead of allowing unlimited
      unpaid Club access.
      */

      params.append(
        "subscription_data[trial_settings][end_behavior][missing_payment_method]",
        "cancel"
      );

    }

    /*
    Stripe Checkout can display promotion-code field
    if PETS & DOGUE later decides to create subscription
    promotions.
    */

    params.append(
      "allow_promotion_codes",
      "true"
    );

    /*
    Return from Stripe.
    */

    params.append(
      "success_url",
      `${origin}/club.html?membership=success&plan=${encodeURIComponent(
        plan
      )}&session_id={CHECKOUT_SESSION_ID}`
    );

    params.append(
      "cancel_url",
      `${origin}/club.html?membership=cancelled&plan=${encodeURIComponent(
        plan
      )}`
    );

    const checkout =
      await stripeRequest(
        "/checkout/sessions",
        secretKey,
        {
          method:
            "POST",

          params
        }
      );

    if (
      !checkout ||
      !checkout.id ||
      !checkout.url
    ) {

      throw new Error(
        "Stripe did not return a valid Checkout Session."
      );

    }

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        sessionId:
          checkout.id,

        checkoutUrl:
          checkout.url,

        plan:
          plan,

        access:
          "all_club_benefits",

        specialOffersAccess:
          "all",

        recurring:
          true,

        trialDays:
          planConfig.trialDays,

        billingInterval:
          planConfig.expectedInterval,

        billingAmount:
          planConfig.expectedAmount,

        currency:
          "gbp",

        renewal:
          planConfig.expectedInterval === "year"
            ? "automatic_yearly"
            : "automatic_monthly"

      }
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE Stripe Checkout error:",
      error
    );

    let status =
      500;

    if (
      Number(
        error.status
      ) === 400
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

        error:
          error?.message ||
          "Unable to create membership checkout."

      }
    );

  }

};
