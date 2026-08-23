"use strict";

/*
=========================================================
PETS & DOGUE
ADMIN OFFER STATUS
=========================================================

Purpose:
- Approve partner offers
- Pause offers
- Reject offers
- Keep moderation server-side

Security:
- Requires PETS_DOGUE_ADMIN_KEY from Vercel env
- Secret is NEVER stored in browser code
=========================================================
*/

const SUPABASE_URL =
  String(
    process.env.SUPABASE_URL || ""
  )
    .trim()
    .replace(/\/+$/, "");

const SUPABASE_SECRET_KEY =
  String(
    process.env.SUPABASE_SECRET_KEY || ""
  ).trim();

const ADMIN_KEY =
  String(
    process.env.PETS_DOGUE_ADMIN_KEY || ""
  ).trim();

const ALLOWED_STATUSES =
  new Set([
    "pending",
    "active",
    "paused",
    "rejected"
  ]);

/* =========================================================
   RESPONSE
========================================================= */

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

  res.end(
    JSON.stringify(payload)
  );

}

/* =========================================================
   INPUT
========================================================= */

function cleanString(
  value,
  maxLength = 500
) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";
  }

  return String(value)
    .trim()
    .slice(
      0,
      maxLength
    );

}

function isUuid(
  value
) {

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    .test(
      String(value || "")
    );

}

async function readBody(
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

  } catch {

    return {};
  }

}

/* =========================================================
   SUPABASE
========================================================= */

async function supabaseRequest(
  path,
  options = {}
) {

  const response =
    await fetch(
      `${SUPABASE_URL}/rest/v1/${path}`,
      {

        method:
          options.method || "GET",

        headers: {

          apikey:
            SUPABASE_SECRET_KEY,

          Authorization:
            `Bearer ${SUPABASE_SECRET_KEY}`,

          "Content-Type":
            "application/json",

          ...(options.headers || {})

        },

        body:
          options.body
            ? JSON.stringify(
                options.body
              )
            : undefined

      }
    );

  const raw =
    await response.text();

  let data = null;

  if (
    raw
  ) {

    try {

      data =
        JSON.parse(
          raw
        );

    } catch {

      data =
        raw;
    }

  }

  if (
    !response.ok
  ) {

    const error =
      new Error(
        data?.message ||
        data?.hint ||
        data?.details ||
        `Supabase request failed with status ${response.status}.`
      );

    error.status =
      response.status;

    error.data =
      data;

    throw error;
  }

  return data;

}

/* =========================================================
   AUTH
========================================================= */

function getProvidedAdminKey(
  req,
  body
) {

  const fromHeader =
    cleanString(
      req.headers?.["x-pets-dogue-admin-key"],
      500
    );

  if (
    fromHeader
  ) {

    return fromHeader;
  }

  return cleanString(
    body.adminKey,
    500
  );

}

function isAuthorized(
  provided
) {

  if (
    !ADMIN_KEY ||
    !provided
  ) {

    return false;
  }

  return provided === ADMIN_KEY;

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

  /* =======================================================
     CONFIG
  ======================================================= */

  if (
    !SUPABASE_URL ||
    !SUPABASE_SECRET_KEY
  ) {

    console.error(
      "PETS & DOGUE admin offer status: Supabase environment variables are missing."
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Database connection is not configured."
      }
    );

  }

  if (
    !ADMIN_KEY
  ) {

    console.error(
      "PETS & DOGUE admin offer status: PETS_DOGUE_ADMIN_KEY is missing."
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Admin access is not configured."
      }
    );

  }

  let body;

  try {

    body =
      await readBody(
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
     ADMIN AUTH
  ======================================================= */

  const providedAdminKey =
    getProvidedAdminKey(
      req,
      body
    );

  if (
    !isAuthorized(
      providedAdminKey
    )
  ) {

    return sendJson(
      res,
      401,
      {
        ok:
          false,

        error:
          "Unauthorized."
      }
    );

  }

  /* =======================================================
     OFFER + STATUS
  ======================================================= */

  const offerId =
    cleanString(
      body.offerId,
      100
    );

  const status =
    cleanString(
      body.status,
      30
    ).toLowerCase();

  if (
    !isUuid(
      offerId
    )
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "Invalid offer ID."
      }
    );

  }

  if (
    !ALLOWED_STATUSES.has(
      status
    )
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "Invalid status."
      }
    );

  }

  try {

    const encodedId =
      encodeURIComponent(
        offerId
      );

    const updated =
      await supabaseRequest(
        `offers?id=eq.${encodedId}`,
        {

          method:
            "PATCH",

          headers: {
            Prefer:
              "return=representation"
          },

          body: {
            status
          }

        }
      );

    if (
      !Array.isArray(
        updated
      ) ||
      !updated.length
    ) {

      return sendJson(
        res,
        404,
        {
          ok:
            false,

          error:
            "Offer not found."
        }
      );

    }

    const offer =
      updated[0];

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        offer: {

          id:
            offer.id,

          businessName:
            offer.business_name,

          title:
            offer.title,

          status:
            offer.status,

          startsAt:
            offer.starts_at,

          endsAt:
            offer.ends_at,

          updatedAt:
            offer.updated_at

        }

      }
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE admin offer status error:",
      error
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          error?.message ||
          "Unable to update offer status."
      }
    );

  }

};
