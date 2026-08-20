"use strict";

/*
  PETS & DOGUE CLUB
  Stripe Customer Portal

  Purpose:
  - open the official Stripe customer portal
  - allow member to manage billing
  - update payment card
  - view subscription
  - cancel membership
  - view Stripe billing history

  SECURITY:
  The browser does NOT send a trusted Stripe customer ID.

  It sends the verified Checkout Session ID.
  The server retrieves that session directly from Stripe
  and obtains the customer ID from Stripe itself.

  Required Vercel environment variable:
  STRIPE_SECRET_KEY

  Recommended:
  PUBLIC_SITE_URL=https://your-domain.com
*/

const STRIPE_API_BASE =
  "https://api.stripe.com/v1";


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


function validCheckoutSessionId(
  value
) {

  return /^cs_(test|live)_[A-Za-z0-9_]+$/
    .test(
      String(
        value || ""
      )
    );

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


async function stripeGet(
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


function getCustomerId(
  session
) {

  if (
    !session
  ) {

    return "";

  }


  if (
    typeof session.customer === "string"
  ) {

    return session.customer;

  }


  if (
    session.customer &&
    typeof session.customer === "object" &&
    typeof session.customer.id === "string"
  ) {

    return session.customer.id;

  }


  return "";

}


function getSessionEmail(
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


  return "";

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

        ok:
          false,

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

        ok:
          false,

        error:
          "Billing management is not configured yet."

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

        ok:
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
    !validCheckoutSessionId(
      sessionId
    )
  ) {

    return sendJson(
      res,
      400,
      {

        ok:
          false,

        error:
          "A valid Checkout Session is required."

      }
    );

  }


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

    /*
      STEP 1

      Retrieve the Checkout Session directly from Stripe.

      We intentionally do not accept customerId
      from the browser.
    */

    const session =
      await stripeGet(
        `/checkout/sessions/${encodeURIComponent(sessionId)}`,
        secretKey
      );


    if (
      !session ||
      session.status !== "complete"
    ) {

      return sendJson(
        res,
        403,
        {

          ok:
            false,

          error:
            "This checkout session is not complete."

        }
      );

    }


    /*
      This endpoint belongs specifically to
      PETS & DOGUE Club subscriptions.
    */

    if (
      session.mode !== "subscription"
    ) {

      return sendJson(
        res,
        403,
        {

          ok:
            false,

          error:
            "This is not a Club subscription session."

        }
      );

    }


    const membershipPlan =
      cleanString(

        session.metadata &&
        session.metadata.membership_plan

          ? session.metadata.membership_plan

          : "",

        30
      );


    if (
      ![
        "free",
        "monthly",
        "annual"
      ].includes(
        membershipPlan
      )
    ) {

      return sendJson(
        res,
        403,
        {

          ok:
            false,

          error:
            "This session does not belong to a valid Club membership."

        }
      );

    }


    const customerId =
      getCustomerId(
        session
      );


    if (
      !customerId
    ) {

      return sendJson(
        res,
        404,
        {

          ok:
            false,

          error:
            "Stripe customer was not found."

        }
      );

    }


    /*
      STEP 2

      Retrieve the customer.

      This also makes sure that the customer
      still exists in Stripe before opening
      the billing portal.
    */

    const customer =
      await stripeGet(
        `/customers/${encodeURIComponent(customerId)}`,
        secretKey
      );


    if (
      !customer ||
      customer.deleted === true
    ) {

      return sendJson(
        res,
        404,
        {

          ok:
            false,

          error:
            "Stripe customer is no longer available."

        }
      );

    }


    /*
      STEP 3

      Create Stripe Billing Portal session.

      Stripe controls the secure billing screens.

      The member can manage whatever features
      are enabled in:

      Stripe Dashboard
      → Settings
      → Billing
      → Customer portal
    */

    const params =
      new URLSearchParams();


    params.append(
      "customer",
      customerId
    );


    /*
      After the customer finishes managing
      their billing they return to account.html.
    */

    params.append(
      "return_url",
      `${origin}/account.html?billing=return`
    );


    const portalSession =
      await stripePost(
        "/billing_portal/sessions",
        params,
        secretKey
      );


    if (
      !portalSession ||
      !portalSession.url
    ) {

      throw new Error(
        "Stripe did not return a billing portal URL."
      );

    }


    /*
      Never expose unnecessary Stripe customer data.

      Only the secure portal URL and basic membership
      context are returned.
    */

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        portalUrl:
          portalSession.url,

        membership: {

          plan:
            membershipPlan,

          email:
            getSessionEmail(
              session
            )

        }

      }
    );


  } catch (error) {

    console.error(
      "PETS & DOGUE Stripe portal error:",
      error
    );


    const stripeStatus =
      Number(
        error.status
      );


    let status =
      500;


    if (
      stripeStatus === 400
    ) {

      status =
        400;

    }


    if (
      stripeStatus === 401 ||
      stripeStatus === 403
    ) {

      status =
        500;

    }


    if (
      stripeStatus === 404
    ) {

      status =
        404;

    }


    return sendJson(
      res,
      status,
      {

        ok:
          false,

        error:
          status === 404

            ? "Membership billing information was not found."

            : "Unable to open membership billing management."

      }
    );

  }

};
