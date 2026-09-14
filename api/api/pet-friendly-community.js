/* =========================================================
   PETS & DOGUE
   SHARED PET-FRIENDLY COMMUNITY POLICY API

   Purpose:
   - Read shared Inside / Outside pet policies
   - Save policy for one exact place/address
   - Keep Supabase secret key on the server only
   - Never allow browser clients to delete policies
   - Merge confirmations additively:
     existing true values cannot be erased by another visitor
========================================================= */

const SUPABASE_URL =
  String(process.env.SUPABASE_URL || "")
    .trim()
    .replace(/\/+$/, "");

const SUPABASE_KEY =
  String(
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  ).trim();

const TABLE_NAME = "pet_place_policies";

const MAX_BODY_BYTES = 32 * 1024;

const MAX_RESULTS = 2000;


/* =========================================================
   RESPONSE
========================================================= */

function sendJson(response, status, payload) {

  response.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  response.setHeader(
    "Cache-Control",
    "no-store"
  );

  response.status(status).json(payload);

}


/* =========================================================
   CORS / ORIGIN
========================================================= */

function normalizeOrigin(value) {

  return String(value || "")
    .trim()
    .toLowerCase();

}


function isAllowedOrigin(origin) {

  if (!origin) {
    return true;
  }

  let parsed;

  try {

    parsed = new URL(origin);

  } catch (error) {

    return false;

  }

  const host =
    String(parsed.hostname || "")
      .toLowerCase();

  if (
    host === "petsanddogue.com" ||
    host === "www.petsanddogue.com" ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app")
  ) {

    return true;

  }

  return false;

}


function applyCors(request, response) {

  const origin =
    normalizeOrigin(
      request.headers.origin
    );

  if (
    origin &&
    isAllowedOrigin(origin)
  ) {

    response.setHeader(
      "Access-Control-Allow-Origin",
      origin
    );

    response.setHeader(
      "Vary",
      "Origin"
    );

  }

  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

}


/* =========================================================
   STRING HELPERS
========================================================= */

function cleanString(
  value,
  maxLength = 500
) {

  return String(value || "")
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);

}


function cleanPlaceKey(value) {

  return cleanString(
    value,
    500
  );

}


/* =========================================================
   NUMBER HELPERS
========================================================= */

function finiteNumber(value) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return null;

  }

  const number =
    Number(value);

  if (
    !Number.isFinite(number)
  ) {

    return null;

  }

  return number;

}


function validLatitude(value) {

  return (
    value !== null &&
    value >= -90 &&
    value <= 90
  );

}


function validLongitude(value) {

  return (
    value !== null &&
    value >= -180 &&
    value <= 180
  );

}


/* =========================================================
   BOOLEAN
========================================================= */

function toBoolean(value) {

  return (
    value === true ||
    value === 1 ||
    String(value)
      .toLowerCase() === "true"
  );

}


/* =========================================================
   BODY
========================================================= */

async function readBody(request) {

  const contentLength =
    Number(
      request.headers[
        "content-length"
      ] || 0
    );

  if (
    Number.isFinite(contentLength) &&
    contentLength > MAX_BODY_BYTES
  ) {

    throw new Error(
      "Request body is too large."
    );

  }

  if (
    request.body &&
    typeof request.body === "object"
  ) {

    return request.body;

  }

  if (
    typeof request.body === "string"
  ) {

    if (
      Buffer.byteLength(
        request.body,
        "utf8"
      ) > MAX_BODY_BYTES
    ) {

      throw new Error(
        "Request body is too large."
      );

    }

    try {

      return JSON.parse(
        request.body
      );

    } catch (error) {

      throw new Error(
        "Invalid JSON body."
      );

    }

  }

  return {};

}


/* =========================================================
   SUPABASE
========================================================= */

function supabaseHeaders(
  extra = {}
) {

  return {
    apikey: SUPABASE_KEY,
    Authorization:
      `Bearer ${SUPABASE_KEY}`,
    "Content-Type":
      "application/json",
    ...extra
  };

}


async function supabaseRequest(
  path,
  options = {}
) {

  if (
    !SUPABASE_URL ||
    !SUPABASE_KEY
  ) {

    throw new Error(
      "Supabase environment variables are missing."
    );

  }

  const response =
    await fetch(
      `${SUPABASE_URL}${path}`,
      {
        ...options,
        headers: supabaseHeaders(
          options.headers || {}
        )
      }
    );

  const text =
    await response.text();

  let data = null;

  if (text) {

    try {

      data =
        JSON.parse(text);

    } catch (error) {

      data = text;

    }

  }

  if (!response.ok) {

    const message =
      data &&
      typeof data === "object"
        ? (
            data.message ||
            data.error ||
            JSON.stringify(data)
          )
        : String(
            data ||
            `Supabase error ${response.status}`
          );

    throw new Error(message);

  }

  return data;

}


/* =========================================================
   NORMALIZE POLICY
========================================================= */

function normalizePolicy(row) {

  if (
    !row ||
    typeof row !== "object"
  ) {

    return null;

  }

  const latitude =
    finiteNumber(
      row.latitude
    );

  const longitude =
    finiteNumber(
      row.longitude
    );

  return {

    id:
      row.id ?? null,

    placeKey:
      cleanPlaceKey(
        row.place_key
      ),

    placeName:
      cleanString(
        row.place_name,
        300
      ),

    address:
      cleanString(
        row.address,
        1000
      ),

    latitude:
      validLatitude(latitude)
        ? latitude
        : null,

    longitude:
      validLongitude(longitude)
        ? longitude
        : null,

    inside:
      Boolean(row.inside),

    outside:
      Boolean(row.outside),

    source:
      cleanString(
        row.source,
        100
      ) || "community",

    confirmedBy:
      cleanString(
        row.confirmed_by,
        100
      ) || "community",

    createdAt:
      row.created_at || null,

    updatedAt:
      row.updated_at || null

  };

}


/* =========================================================
   READ ALL SHARED POLICIES
========================================================= */

async function readPolicies() {

  const select =
    [
      "id",
      "place_key",
      "place_name",
      "address",
      "latitude",
      "longitude",
      "inside",
      "outside",
      "source",
      "confirmed_by",
      "created_at",
      "updated_at"
    ].join(",");

  const path =
    `/rest/v1/${TABLE_NAME}` +
    `?select=${encodeURIComponent(select)}` +
    `&order=updated_at.desc` +
    `&limit=${MAX_RESULTS}`;

  const rows =
    await supabaseRequest(
      path,
      {
        method: "GET"
      }
    );

  return Array.isArray(rows)
    ? rows
        .map(normalizePolicy)
        .filter(Boolean)
    : [];

}


/* =========================================================
   FIND ONE POLICY
========================================================= */

async function findPolicy(
  placeKey
) {

  const encodedKey =
    encodeURIComponent(placeKey);

  const select =
    [
      "id",
      "place_key",
      "place_name",
      "address",
      "latitude",
      "longitude",
      "inside",
      "outside",
      "source",
      "confirmed_by",
      "created_at",
      "updated_at"
    ].join(",");

  const path =
    `/rest/v1/${TABLE_NAME}` +
    `?place_key=eq.${encodedKey}` +
    `&select=${encodeURIComponent(select)}` +
    `&limit=1`;

  const rows =
    await supabaseRequest(
      path,
      {
        method: "GET"
      }
    );

  if (
    !Array.isArray(rows) ||
    !rows.length
  ) {

    return null;

  }

  return rows[0];

}


/* =========================================================
   UPSERT POLICY
========================================================= */

async function savePolicy(input) {

  const placeKey =
    cleanPlaceKey(
      input.placeKey ||
      input.place_key
    );

  const placeName =
    cleanString(
      input.placeName ||
      input.place_name,
      300
    );

  const address =
    cleanString(
      input.address,
      1000
    );

  const latitude =
    finiteNumber(
      input.latitude
    );

  const longitude =
    finiteNumber(
      input.longitude
    );

  const requestedInside =
    toBoolean(
      input.inside
    );

  const requestedOutside =
    toBoolean(
      input.outside
    );

  const source =
    cleanString(
      input.source,
      100
    ) || "pets-dogue-community";

  const confirmedBy =
    cleanString(
      input.confirmedBy ||
      input.confirmed_by,
      100
    ) || "community";

  if (!placeKey) {

    throw new Error(
      "placeKey is required."
    );

  }

  if (!placeName) {

    throw new Error(
      "placeName is required."
    );

  }

  if (
    !requestedInside &&
    !requestedOutside
  ) {

    throw new Error(
      "Select Inside, Outside, or both."
    );

  }

  if (
    latitude !== null &&
    !validLatitude(latitude)
  ) {

    throw new Error(
      "Invalid latitude."
    );

  }

  if (
    longitude !== null &&
    !validLongitude(longitude)
  ) {

    throw new Error(
      "Invalid longitude."
    );

  }

  const existing =
    await findPolicy(
      placeKey
    );

  /*
    Community confirmations are additive.

    Example:
    Existing:
    inside  = false
    outside = true

    New visitor confirms inside:
    inside  = true
    outside remains true

    A visitor cannot erase an already confirmed permission.
  */

  const inside =
    Boolean(
      requestedInside ||
      (existing && existing.inside)
    );

  const outside =
    Boolean(
      requestedOutside ||
      (existing && existing.outside)
    );

  const payload = {

    place_key:
      placeKey,

    place_name:
      placeName,

    address:
      address ||
      cleanString(
        existing?.address,
        1000
      ) ||
      null,

    latitude:
      validLatitude(latitude)
        ? latitude
        : (
            validLatitude(
              finiteNumber(
                existing?.latitude
              )
            )
              ? finiteNumber(
                  existing.latitude
                )
              : null
          ),

    longitude:
      validLongitude(longitude)
        ? longitude
        : (
            validLongitude(
              finiteNumber(
                existing?.longitude
              )
            )
              ? finiteNumber(
                  existing.longitude
                )
              : null
          ),

    inside,

    outside,

    source,

    confirmed_by:
      confirmedBy,

    updated_at:
      new Date()
        .toISOString()

  };

  const path =
    `/rest/v1/${TABLE_NAME}` +
    `?on_conflict=place_key`;

  const rows =
    await supabaseRequest(
      path,
      {
        method: "POST",

        headers: {
          Prefer:
            "resolution=merge-duplicates,return=representation"
        },

        body:
          JSON.stringify(payload)
      }
    );

  const saved =
    Array.isArray(rows) &&
    rows.length
      ? rows[0]
      : payload;

  return normalizePolicy(
    saved
  );

}


/* =========================================================
   HANDLER
========================================================= */

module.exports =
async function handler(
  request,
  response
) {

  applyCors(
    request,
    response
  );

  const origin =
    normalizeOrigin(
      request.headers.origin
    );

  if (
    origin &&
    !isAllowedOrigin(origin)
  ) {

    return sendJson(
      response,
      403,
      {
        ok: false,
        error: "Origin not allowed."
      }
    );

  }

  if (
    request.method === "OPTIONS"
  ) {

    response.status(204).end();
    return;

  }


  /* -------------------------
     GET
  ------------------------- */

  if (
    request.method === "GET"
  ) {

    try {

      const policies =
        await readPolicies();

      return sendJson(
        response,
        200,
        {
          ok: true,
          count:
            policies.length,
          policies
        }
      );

    } catch (error) {

      console.error(
        "PET FRIENDLY COMMUNITY GET ERROR:",
        error
      );

      return sendJson(
        response,
        500,
        {
          ok: false,
          error:
            "Could not load shared pet policies."
        }
      );

    }

  }


  /* -------------------------
     POST
  ------------------------- */

  if (
    request.method === "POST"
  ) {

    try {

      const body =
        await readBody(
          request
        );

      const policy =
        await savePolicy(
          body
        );

      return sendJson(
        response,
        200,
        {
          ok: true,
          policy
        }
      );

    } catch (error) {

      console.error(
        "PET FRIENDLY COMMUNITY POST ERROR:",
        error
      );

      const message =
        cleanString(
          error?.message,
          500
        );

      const clientError =
        (
          message ===
            "placeKey is required." ||
          message ===
            "placeName is required." ||
          message ===
            "Select Inside, Outside, or both." ||
          message ===
            "Invalid latitude." ||
          message ===
            "Invalid longitude." ||
          message ===
            "Invalid JSON body." ||
          message ===
            "Request body is too large."
        );

      return sendJson(
        response,
        clientError
          ? 400
          : 500,
        {
          ok: false,
          error:
            clientError
              ? message
              : "Could not save pet policy."
        }
      );

    }

  }


  /* -------------------------
     METHOD NOT ALLOWED
  ------------------------- */

  response.setHeader(
    "Allow",
    "GET, POST, OPTIONS"
  );

  return sendJson(
    response,
    405,
    {
      ok: false,
      error:
        "Method not allowed."
    }
  );

};
