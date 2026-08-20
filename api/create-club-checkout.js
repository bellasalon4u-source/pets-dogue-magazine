"use strict";

/*
  PETS & DOGUE CLUB
  Stripe Checkout Session Creator

  Plans:

  free
  - 30 day complimentary trial
  - then £1 / month
  - payment method is collected during checkout

  monthly
  - £1 / month

  annual
  - £10 / year


  REQUIRED VERCEL ENVIRONMENT VARIABLES

  STRIPE_SECRET_KEY
  STRIPE_PRICE_MONTHLY
  STRIPE_PRICE_ANNUAL

  Recommended:

  PUBLIC_SITE_URL=https://your-domain.com


  IMPORTANT

  Apple Pay and Google Pay are displayed automatically
  by Stripe Checkout when they are available for the
  customer's device, browser, country and Stripe account.

  We use Stripe's "card" payment method because Stripe
  wallets are presented through the card payment method
  when eligible.
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
    "ru",
    "uk",
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
   CLEAN INPUT
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
      )
      .trim()
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

    } catch (error) {

      return {};

    }

  }


  const chunks = [];


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

  } catch (error) {

    return {};

  }

}


/* =========================================================
   SITE URL
========================================================= */

function getOrigin(
  req
) {

  const configured =
    cleanString(
      process.env.PUBLIC_SITE_URL || "",
      500
    );


  if (
    configured
  ) {

    return configured
      .replace(
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


  if (
    !host
  ) {

    return "";

  }


  return `${protocol}://${host}`;

}


/* =========================================================
   STRIPE
========================================================= */

async function stripePost(
  path,
  params,
  secretKey
) {

  const response =
    await fetch(
      `${STRIPE_API_BASE}${path}`,
      {

        method:
          "POST",

        headers: {

          Authorization:
            `Bearer ${secretKey}`,

          "Content-Type":
            "application/x-www-form-urlencoded"

        },

        body:
          params.toString()

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

    const message =

      data &&
      data.error &&
      data.error.message

        ? data.error.message

        : "Stripe request failed.";


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
   PLAN CONFIG
========================================================= */

function getPlanConfig(
  plan
) {

  const monthlyPrice =
    cleanString(
      process.env.STRIPE_PRICE_MONTHLY || "",
      300
    );


  const annualPrice =
    cleanString(
      process.env.STRIPE_PRICE_ANNUAL || "",
      300
    );


  if (
    plan === "free"
  ) {

    return {

      priceId:
        monthlyPrice,

      trialDays:
        30

    };

  }


  if (
    plan === "monthly"
  ) {

    return {

      priceId:
        monthlyPrice,

      trialDays:
        0

    };

  }


  if (
    plan === "annual"
  ) {

    return {

      priceId:
        annualPrice,

      trialDays:
        0

    };

  }


  return {

    priceId:
      "",

    trialDays:
      0

  };

}


/* =========================================================
   STRIPE LANGUAGE
========================================================= */

function stripeLocale(
  language
) {

  /*
    Stripe supports many locales.

    Some PETS & DOGUE codes need small normalization.
  */

  const map = {

    en:
      "en",

    ru:
      "ru",

    uk:
      "auto",

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


  return map[language] ||
    "auto";

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


  /* -------------------------------------------------------
     STRIPE SECRET KEY
  ------------------------------------------------------- */

  const secretKey =
    cleanString(
      process.env.STRIPE_SECRET_KEY || "",
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


  /* -------------------------------------------------------
     BODY
  ------------------------------------------------------- */

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

        ok:
          false,

        error:
          "Invalid request."

      }
    );

  }


  /* -------------------------------------------------------
     PLAN
  ------------------------------------------------------- */

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
    !planConfig.priceId
  ) {

    console.error(
      `PETS & DOGUE: Stripe price is missing for plan "${plan}".`
    );


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


  /* -------------------------------------------------------
     MEMBER
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     LANGUAGE
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     OPTIONAL PET DATA
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     ORIGIN
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     METADATA

     We copy metadata to BOTH:

     Checkout Session
     +
     Stripe Subscription

     This allows our secure verification endpoint
     to recover membership information reliably.
  ------------------------------------------------------- */

  const metadata = {

    membership_plan:
      plan,

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


  /* -------------------------------------------------------
     CREATE CHECKOUT
  ------------------------------------------------------- */

  try {

    const params =
      new URLSearchParams();


    /*
      Subscription Checkout.
    */

    params.append(
      "mode",
      "subscription"
    );


    /*
      Stripe card payment method.

      Apple Pay / Google Pay can appear automatically
      when available and configured.
    */

    params.append(
      "payment_method_types[]",
      "card"
    );


    /*
      For a trial we still want Stripe Checkout
      to collect a payment method.

      That allows automatic conversion from:
      30 free days → £1/month.
    */

    params.append(
      "payment_method_collection",
      "always"
    );


    /*
      Customer email is already known from
      the PETS & DOGUE questionnaire.
    */

    params.append(
      "customer_email",
      email
    );


    /*
      One subscription product.
    */

    params.append(
      "line_items[0][price]",
      planConfig.priceId
    );


    params.append(
      "line_items[0][quantity]",
      "1"
    );


    /*
      Stripe Checkout language.
    */

    params.append(
      "locale",
      stripeLocale(
        language
      )
    );


    /*
      Billing address can be collected when Stripe
      needs it for the payment method.
    */

    params.append(
      "billing_address_collection",
      "auto"
    );


    /*
      Promotion codes can be enabled later from
      Stripe without rebuilding the checkout UI.
    */

    params.append(
      "allow_promotion_codes",
      "true"
    );


    /*
      Success URL.

      Stripe replaces:
      {CHECKOUT_SESSION_ID}

      with the real secure Checkout Session ID.
    */

    params.append(
      "success_url",
      `${origin}/club.html?membership=success&plan=${encodeURIComponent(plan)}&session_id={CHECKOUT_SESSION_ID}`
    );


    /*
      Cancel URL.

      The customer returns to Club and can retry.
    */

    params.append(
      "cancel_url",
      `${origin}/club.html?membership=cancelled&plan=${encodeURIComponent(plan)}`
    );


    /*
      Checkout Session metadata.
    */

    appendMetadata(
      params,
      "metadata",
      metadata
    );


    /*
      Subscription metadata.

      This stays attached to the Stripe subscription
      for later verification and billing management.
    */

    appendMetadata(
      params,
      "subscription_data[metadata]",
      metadata
    );


    /*
      Complimentary first month.
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

    }


    const checkout =
      await stripePost(
        "/checkout/sessions",
        params,
        secretKey
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


    /*
      Return only what the browser needs.

      No Stripe secret information is exposed.
    */

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
          plan

      }
    );


  } catch (error) {

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
          status === 400

            ? cleanString(
                error.message ||
                "Stripe rejected the Checkout request.",
                300
              )

            : "Unable to create the secure payment session."

      }
    );

  }

};
