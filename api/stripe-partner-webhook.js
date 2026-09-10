const crypto = require("crypto");

/* =========================================================
   PETS & DOGUE
   STRIPE WEBHOOK — PARTNER SPECIAL OFFERS

   Stripe payment
   → verify Stripe signature
   → identify PETS & DOGUE submission
   → confirm real payment
   → save invoice / receipt information
   → send offer to moderation
========================================================= */

const STRIPE_SECRET_KEY =
  String(
    process.env.STRIPE_SECRET_KEY || ""
  ).trim();

const STRIPE_WEBHOOK_SECRET =
  String(
    process.env.STRIPE_WEBHOOK_SECRET || ""
  ).trim();

const SUPABASE_URL =
  String(
    process.env.SUPABASE_URL || ""
  )
    .trim()
    .replace(/\/+$/, "");

const SUPABASE_KEY =
  String(
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  ).trim();

const MAX_BODY_BYTES =
  2 * 1024 * 1024;

const SIGNATURE_TOLERANCE_SECONDS =
  300;


/* =========================================================
   RESPONSE
========================================================= */

function sendJson(
  response,
  status,
  payload
) {

  response.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  response.setHeader(
    "Cache-Control",
    "no-store"
  );

  return response
    .status(status)
    .json(payload);

}


/* =========================================================
   BASIC HELPERS
========================================================= */

function cleanString(
  value,
  maxLength = 500
) {

  return String(value || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);

}


function validUuid(value) {

  return (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  ).test(
    String(value || "")
  );

}


/* =========================================================
   RAW REQUEST BODY
========================================================= */

async function readRawBody(
  request
) {

  const chunks = [];

  let total = 0;

  for await (
    const chunk of request
  ) {

    const buffer =
      Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(chunk);

    total +=
      buffer.length;

    if (
      total >
      MAX_BODY_BYTES
    ) {

      const error =
        new Error(
          "Webhook body is too large."
        );

      error.statusCode = 413;

      throw error;

    }

    chunks.push(buffer);

  }

  return Buffer.concat(
    chunks
  );

}


/* =========================================================
   STRIPE WEBHOOK SIGNATURE
========================================================= */

function parseStripeSignature(
  header
) {

  const result = {
    timestamp:null,
    signatures:[]
  };

  String(header || "")
    .split(",")
    .forEach(part => {

      const pieces =
        part
          .trim()
          .split("=");

      if (
        pieces.length < 2
      ) {

        return;

      }

      const key =
        pieces.shift();

      const value =
        pieces.join("=");

      if (
        key === "t"
      ) {

        const timestamp =
          Number(value);

        if (
          Number.isFinite(timestamp)
        ) {

          result.timestamp =
            timestamp;

        }

      }

      if (
        key === "v1" &&
        value
      ) {

        result.signatures.push(
          value
        );

      }

    });

  return result;

}


function safeCompareHex(
  expected,
  received
) {

  try {

    const a =
      Buffer.from(
        expected,
        "hex"
      );

    const b =
      Buffer.from(
        received,
        "hex"
      );

    if (
      a.length === 0 ||
      b.length === 0 ||
      a.length !== b.length
    ) {

      return false;

    }

    return crypto
      .timingSafeEqual(
        a,
        b
      );

  } catch (error) {

    return false;

  }

}


function verifyStripeSignature(
  rawBody,
  signatureHeader
) {

  if (
    !STRIPE_WEBHOOK_SECRET
  ) {

    const error =
      new Error(
        "Stripe webhook secret is not configured."
      );

    error.statusCode = 500;

    throw error;

  }

  const parsed =
    parseStripeSignature(
      signatureHeader
    );

  if (
    !parsed.timestamp ||
    parsed.signatures.length === 0
  ) {

    return false;

  }

  const now =
    Math.floor(
      Date.now() / 1000
    );

  if (
    Math.abs(
      now -
      parsed.timestamp
    ) >
    SIGNATURE_TOLERANCE_SECONDS
  ) {

    return false;

  }

  const signedPayload =
    String(
      parsed.timestamp
    ) +
    "." +
    rawBody.toString(
      "utf8"
    );

  const expectedSignature =
    crypto
      .createHmac(
        "sha256",
        STRIPE_WEBHOOK_SECRET
      )
      .update(
        signedPayload,
        "utf8"
      )
      .digest("hex");

  return parsed.signatures
    .some(signature =>
      safeCompareHex(
        expectedSignature,
        signature
      )
    );

}


/* =========================================================
   SUPABASE
========================================================= */

function requireSupabase() {

  if (
    !SUPABASE_URL ||
    !SUPABASE_KEY
  ) {

    const error =
      new Error(
        "Supabase is not configured."
      );

    error.statusCode = 500;

    throw error;

  }

}


async function supabaseFetch(
  path,
  options = {}
) {

  requireSupabase();

  return fetch(
    SUPABASE_URL + path,
    {
      ...options,

      headers:{
        apikey:
          SUPABASE_KEY,

        Authorization:
          "Bearer " +
          SUPABASE_KEY,

        ...(
          options.headers ||
          {}
        )
      }
    }
  );

}


async function updateSubmission(
  submissionId,
  checkoutSessionId,
  values
) {

  const query =
    new URLSearchParams();

  query.set(
    "id",
    "eq." +
    submissionId
  );

  if (
    checkoutSessionId
  ) {

    query.set(
      "stripe_checkout_session_id",
      "eq." +
      checkoutSessionId
    );

  }

  const response =
    await supabaseFetch(
      "/rest/v1/partner_offer_submissions?" +
      query.toString(),
      {
        method:"PATCH",

        headers:{
          "Content-Type":
            "application/json",

          Prefer:
            "return=minimal"
        },

        body:
          JSON.stringify(
            values
          )
      }
    );

  if (
    !response.ok
  ) {

    const detail =
      await response.text();

    throw new Error(
      "Unable to update partner submission. " +
      detail.slice(
        0,
        300
      )
    );

  }

}


/* =========================================================
   STRIPE REST API
========================================================= */

function requireStripe() {

  if (
    !STRIPE_SECRET_KEY
  ) {

    const error =
      new Error(
        "Stripe secret key is not configured."
      );

    error.statusCode = 500;

    throw error;

  }

}


async function stripeGet(
  path
) {

  requireStripe();

  const response =
    await fetch(
      "https://api.stripe.com" +
      path,
      {
        method:"GET",

        headers:{
          Authorization:
            "Bearer " +
            STRIPE_SECRET_KEY
        }
      }
    );

  const data =
    await response
      .json()
      .catch(
        () => ({})
      );

  if (
    !response.ok
  ) {

    throw new Error(
      data?.error?.message ||
      "Stripe API request failed."
    );

  }

  return data;

}


/* =========================================================
   INVOICE
========================================================= */

async function getInvoiceDetails(
  invoiceId
) {

  if (
    !invoiceId
  ) {

    return {
      id:null,
      number:null,
      pdf:null
    };

  }

  try {

    const invoice =
      await stripeGet(
        "/v1/invoices/" +
        encodeURIComponent(
          invoiceId
        )
      );

    return {

      id:
        cleanString(
          invoice.id,
          200
        ) || null,

      number:
        cleanString(
          invoice.number,
          200
        ) || null,

      pdf:
        cleanString(
          invoice.invoice_pdf,
          2000
        ) || null

    };

  } catch (error) {

    console.error(
      "PETS & DOGUE invoice lookup error:",
      error
    );

    return {
      id:
        cleanString(
          invoiceId,
          200
        ) || null,

      number:null,
      pdf:null
    };

  }

}


/* =========================================================
   PAYMENT INTENT + RECEIPT
========================================================= */

async function getPaymentDetails(
  paymentIntentId
) {

  if (
    !paymentIntentId
  ) {

    return {
      paymentIntentId:null,
      receiptUrl:null
    };

  }

  try {

    const query =
      new URLSearchParams();

    query.append(
      "expand[]",
      "latest_charge"
    );

    const paymentIntent =
      await stripeGet(
        "/v1/payment_intents/" +
        encodeURIComponent(
          paymentIntentId
        ) +
        "?" +
        query.toString()
      );

    let receiptUrl = null;

    if (
      paymentIntent.latest_charge &&
      typeof paymentIntent.latest_charge ===
        "object"
    ) {

      receiptUrl =
        cleanString(
          paymentIntent
            .latest_charge
            .receipt_url,
          2000
        ) || null;

    }

    return {

      paymentIntentId:
        cleanString(
          paymentIntent.id,
          200
        ) ||
        cleanString(
          paymentIntentId,
          200
        ) ||
        null,

      receiptUrl

    };

  } catch (error) {

    console.error(
      "PETS & DOGUE payment lookup error:",
      error
    );

    return {

      paymentIntentId:
        cleanString(
          paymentIntentId,
          200
        ) || null,

      receiptUrl:null

    };

  }

}


/* =========================================================
   HANDLE SUCCESSFUL CHECKOUT
========================================================= */

async function handleSuccessfulCheckout(
  session
) {

  const metadata =
    session &&
    typeof session.metadata ===
      "object"
      ? session.metadata
      : {};

  if (
    metadata.service !==
    "partner_special_offer"
  ) {

    return {
      ignored:true
    };

  }

  const submissionId =
    cleanString(
      metadata.submission_id,
      100
    );

  if (
    !validUuid(
      submissionId
    )
  ) {

    throw new Error(
      "Invalid partner submission ID."
    );

  }

  const sessionId =
    cleanString(
      session.id,
      200
    );

  if (
    !sessionId
  ) {

    throw new Error(
      "Stripe Checkout session ID is missing."
    );

  }

  const paymentStatus =
    cleanString(
      session.payment_status,
      50
    ).toLowerCase();

  if (
    paymentStatus !== "paid" &&
    paymentStatus !==
      "no_payment_required"
  ) {

    await updateSubmission(
      submissionId,
      sessionId,
      {
        stripe_payment_intent_id:
          cleanString(
            session.payment_intent,
            200
          ) || null,

        stripe_invoice_id:
          cleanString(
            session.invoice,
            200
          ) || null,

        payment_status:
          "awaiting_payment",

        status:
          "awaiting_payment",

        updated_at:
          new Date()
            .toISOString()
      }
    );

    return {
      paid:false
    };

  }

  const invoiceId =
    cleanString(
      session.invoice,
      200
    );

  const paymentIntentId =
    cleanString(
      session.payment_intent,
      200
    );

  const [
    invoice,
    payment
  ] =
    await Promise.all([

      getInvoiceDetails(
        invoiceId
      ),

      getPaymentDetails(
        paymentIntentId
      )

    ]);

  const paidAt =
    new Date()
      .toISOString();

  await updateSubmission(
    submissionId,
    sessionId,
    {

      stripe_payment_intent_id:
        payment
          .paymentIntentId,

      stripe_invoice_id:
        invoice.id,

      stripe_invoice_number:
        invoice.number,

      stripe_invoice_pdf:
        invoice.pdf,

      stripe_receipt_url:
        payment.receiptUrl,

      payment_status:
        "paid",

      status:
        "pending_review",

      payment_completed_at:
        paidAt,

      updated_at:
        paidAt

    }
  );

  return {
    paid:true
  };

}


/* =========================================================
   HANDLE FAILED / EXPIRED CHECKOUT
========================================================= */

async function handlePaymentProblem(
  session,
  paymentStatus
) {

  const metadata =
    session &&
    typeof session.metadata ===
      "object"
      ? session.metadata
      : {};

  if (
    metadata.service !==
    "partner_special_offer"
  ) {

    return {
      ignored:true
    };

  }

  const submissionId =
    cleanString(
      metadata.submission_id,
      100
    );

  const sessionId =
    cleanString(
      session.id,
      200
    );

  if (
    !validUuid(
      submissionId
    ) ||
    !sessionId
  ) {

    return {
      ignored:true
    };

  }

  await updateSubmission(
    submissionId,
    sessionId,
    {

      payment_status:
        paymentStatus,

      status:
        "payment_issue",

      updated_at:
        new Date()
          .toISOString()

    }
  );

  return {
    updated:true
  };

}


/* =========================================================
   MAIN WEBHOOK
========================================================= */

module.exports =
async function handler(
  request,
  response
) {

  if (
    request.method !==
    "POST"
  ) {

    response.setHeader(
      "Allow",
      "POST"
    );

    return sendJson(
      response,
      405,
      {
        ok:false,
        error:
          "Method not allowed."
      }
    );

  }

  try {

    requireSupabase();

    const rawBody =
      await readRawBody(
        request
      );

    const signatureHeader =
      request.headers[
        "stripe-signature"
      ];

    const validSignature =
      verifyStripeSignature(
        rawBody,
        signatureHeader
      );

    if (
      !validSignature
    ) {

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "Invalid Stripe signature."
        }
      );

    }

    let event;

    try {

      event =
        JSON.parse(
          rawBody.toString(
            "utf8"
          )
        );

    } catch (error) {

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "Invalid webhook JSON."
        }
      );

    }

    const eventType =
      cleanString(
        event.type,
        200
      );

    const object =
      event &&
      event.data &&
      event.data.object
        ? event.data.object
        : null;

    if (
      !object
    ) {

      return sendJson(
        response,
        200,
        {
          ok:true,
          ignored:true
        }
      );

    }

    switch (
      eventType
    ) {

      case "checkout.session.completed":

        await handleSuccessfulCheckout(
          object
        );

        break;


      case "checkout.session.async_payment_succeeded":

        await handleSuccessfulCheckout(
          object
        );

        break;


      case "checkout.session.async_payment_failed":

        await handlePaymentProblem(
          object,
          "failed"
        );

        break;


      case "checkout.session.expired":

        await handlePaymentProblem(
          object,
          "expired"
        );

        break;


      default:

        return sendJson(
          response,
          200,
          {
            ok:true,
            ignored:true,
            eventType
          }
        );

    }

    return sendJson(
      response,
      200,
      {
        ok:true,
        received:true,
        eventType
      }
    );

  } catch (error) {

    console.error(
      "PETS & DOGUE Stripe partner webhook error:",
      error
    );

    return sendJson(
      response,
      Number(
        error.statusCode
      ) || 500,
      {
        ok:false,
        error:
          Number(
            error.statusCode
          ) >= 400 &&
          Number(
            error.statusCode
          ) < 500
            ? error.message
            : "Webhook processing failed."
      }
    );

  }

};
