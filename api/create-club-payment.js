"use strict";

/*
=========================================================
PETS & DOGUE CLUB
Custom Stripe Checkout Session for embedded Elements
=========================================================

PLANS

free
- £0 today
- 30-day free trial
- then £1/month
- automatic renewal

monthly
- £1 today
- £1/month
- automatic renewal

annual
- £10 today
- £10/year
- automatic renewal

REQUIRED VERCEL ENVIRONMENT VARIABLES

STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
STRIPE_PRICE_MONTHLY
STRIPE_PRICE_ANNUAL

OPTIONAL

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
CLEAN STRING
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


/* =========================================================
EMAIL
========================================================= */

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
REQUEST BODY
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
WEBSITE ORIGIN
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
    options.method ||
    "GET";

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

    error.stripeCode =
      data?.error?.code ||
      "";

    error.stripeType =
      data?.error?.type ||
      "";

    throw error;
  }

  return data;

}


/* =========================================================
STRIPE LOCALE
========================================================= */

function stripeLocale(
  language
) {

  const locales = {

    en:"en",

    uk:"auto",

    ru:"ru",

    fr:"fr",

    de:"de",

    es:"es",

    it:"it",

    pt:"pt",

    nl:"nl",

    pl:"pl",

    cs:"cs",

    sk:"auto",

    hu:"hu",

    ro:"ro",

    bg:"bg",

    el:"el",

    sv:"sv",

    da:"da",

    no:"nb",

    fi:"fi",

    tr:"tr",

    ar:"auto",

    hi:"auto"

  };

  return locales[
    language
  ] || "auto";

}


/* =========================================================
PLAN CONFIG
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

      amount:
        0,

      recurringAmount:
        100,

      interval:
        "month",

      trialDays:
        30,

      billingLabel:
        "£0 today · £1/month after 30-day trial"

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

      amount:
        100,

      recurringAmount:
        100,

      interval:
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

      amount:
        1000,

      recurringAmount:
        1000,

      interval:
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
VALIDATE PRICE
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
      "PETS & DOGUE Club prices must use GBP."
    );
  }

  if (
    Number(
      price.unit_amount
    ) !==
    config.recurringAmount
  ) {

    throw new Error(
      `Incorrect Stripe amount for ${config.id} membership.`
    );
  }

  if (
    !price.recurring
  ) {

    throw new Error(
      "PETS & DOGUE Club Stripe Price must be recurring."
    );
  }

  if (
    price.recurring.interval !==
    config.interval
  ) {

    throw new Error(
      `Incorrect Stripe renewal interval for ${config.id} membership.`
    );
  }

  if (
    Number(
      price.recurring.interval_count || 1
    ) !== 1
  ) {

    throw new Error(
      "Membership must renew every single billing period."
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

        ok:false,

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
      500
    );

  const publishableKey =
    cleanString(
      process.env
        .STRIPE_PUBLISHABLE_KEY ||
      "",
      500
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

        ok:false,

        error:
          "Stripe secret key is not configured."

      }
    );
  }

  if (
    !publishableKey
  ) {

    console.error(
      "PETS & DOGUE: STRIPE_PUBLISHABLE_KEY is missing."
    );

    return sendJson(
      res,
      500,
      {

        ok:false,

        error:
          "Stripe publishable key is not configured."

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

        ok:false,

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

        ok:false,

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

        ok:false,

        error:
          "This membership plan is not configured."

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

        ok:false,

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

        ok:false,

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

        ok:false,

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

  const aliases = {

    ua:"uk",

    cz:"cs",

    gr:"el",

    se:"sv",

    dk:"da"

  };

  if (
    aliases[
      language
    ]
  ) {

    language =
      aliases[
        language
      ];
  }

  if (
    !VALID_LANGUAGES.has(
      language
    )
  ) {

    language =
      "en";
  }


  /* =======================================================
  OPTIONAL PET DATA
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
  WEBSITE
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

        ok:false,

        error:
          "Unable to determine PETS & DOGUE website address."

      }
    );
  }


  try {

    /* =====================================================
    VERIFY STRIPE PRICE
    ===================================================== */

    const stripePrice =
      await validateRecurringPrice(
        planConfig.priceId,
        planConfig,
        secretKey
      );


    /* =====================================================
    MEMBERSHIP METADATA
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
        planConfig.interval,

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
    CREATE CUSTOM CHECKOUT SESSION

    IMPORTANT:
    We intentionally DO NOT set payment_method_types.

    Stripe therefore uses payment methods enabled and
    eligible in the Stripe Dashboard.

    This allows compatible methods such as:
    - Cards
    - Apple Pay
    - Google Pay
    - PayPal
    - Link

    depending on Stripe account approval, browser,
    device, country and payment-method availability.
    ===================================================== */

    const params =
      new URLSearchParams();


    params.append(
      "mode",
      "subscription"
    );


    params.append(
      "ui_mode",
      "custom"
    );


    params.append(
      "line_items[0][price]",
      stripePrice.id
    );


    params.append(
      "line_items[0][quantity]",
      "1"
    );


    /*
    Collect a payment method even when today's
    payment is £0 during the 30-day trial.
    */

    params.append(
      "payment_method_collection",
      "always"
    );


    /*
    Existing email from the membership form.
    */

    params.append(
      "customer_email",
      email
    );


    /*
    Stripe language.
    */

    params.append(
      "locale",
      stripeLocale(
        language
      )
    );


    /*
    Promotion-code support can remain available
    for future PETS & DOGUE campaigns.
    */

    params.append(
      "allow_promotion_codes",
      "true"
    );


    /*
    Return after redirect-based methods,
    authentication, PayPal, etc.
    */

    params.append(
      "return_url",
      `${origin}/club.html?club_return=1&plan=${encodeURIComponent(
        plan
      )}&session_id={CHECKOUT_SESSION_ID}`
    );


    /*
    Store membership details on both
    Checkout Session and Subscription.
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
    FREE PLAN:
    same £1/month subscription,
    but first 30 days are free.
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
      Do not continue paid membership after trial
      if Stripe has no usable payment method.
      */

      params.append(
        "subscription_data[trial_settings][end_behavior][missing_payment_method]",
        "cancel"
      );
    }


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
      !checkout.client_secret
    ) {

      throw new Error(
        "Stripe did not return a valid custom Checkout Session."
      );
    }


    /* =====================================================
    SUCCESS
    ===================================================== */

    return sendJson(
      res,
      200,
      {

        ok:true,

        flow:
          "checkout",

        sessionId:
          checkout.id,

        clientSecret:
          checkout.client_secret,

        publishableKey:
          publishableKey,

        plan:
          plan,

        trialDays:
          planConfig.trialDays,

        dueToday:
          planConfig.amount,

        recurringAmount:
          planConfig.recurringAmount,

        billingInterval:
          planConfig.interval,

        currency:
          "gbp",

        recurring:
          true,

        access:
          "all_club_benefits",

        specialOffersAccess:
          "all"

      }
    );


  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE custom Club Checkout error:",
      {

        message:
          error?.message || "",

        status:
          error?.status || null,

        stripeCode:
          error?.stripeCode || "",

        stripeType:
          error?.stripeType || ""

      }
    );


    const status =
      Number(
        error?.status
      ) === 400
        ? 400
        : 500;


    return sendJson(
      res,
      status,
      {

        ok:false,

        error:
          error?.message ||
          "Unable to prepare PETS & DOGUE Club payment."

      }
    );

  }

};
