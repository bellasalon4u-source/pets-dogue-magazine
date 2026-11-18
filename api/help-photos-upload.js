"use strict";

/*
  PETS & DOGUE — Help listing photo upload

  POST /api/help-photos-upload
  Authorization: Bearer <Supabase access token>

  JSON body:
  {
    "draft_id": "UUID",
    "slot": 0,
    "file_base64": "<base64 JPEG data>"
  }

  Upload one JPEG per request. The Help form may upload up to five
  photos in separate requests and store the returned public URLs.
*/

const SUPABASE_URL = String(
  process.env.SUPABASE_URL || ""
).replace(/\/+$/, "");

const SUPABASE_SECRET_KEY = String(
  process.env.SUPABASE_SECRET_KEY || ""
);

const BUCKET = "pde-help-listing-photos";
const MAX_FILE_BYTES = 800 * 1024;

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }

  return null;
}

function getBearerToken(req) {
  const value =
    req.headers && req.headers.authorization
      ? String(req.headers.authorization)
      : "";

  const match = value.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

function supabaseHeaders(accessToken) {
  const headers = {
    apikey: SUPABASE_SECRET_KEY
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  } else if (SUPABASE_SECRET_KEY.startsWith("eyJ")) {
    headers.Authorization =
      `Bearer ${SUPABASE_SECRET_KEY}`;
  }

  return headers;
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    .test(String(value || ""));
}

async function getAuthenticatedUser(accessToken) {
  const response = await fetch(
    `${SUPABASE_URL}/auth/v1/user`,
    {
      method: "GET",
      headers: supabaseHeaders(accessToken)
    }
  );

  if (!response.ok) return null;

  const user = await response.json();
  return user && user.id ? user : null;
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 405, {
      ok: false,
      error: "Method not allowed."
    });
  }

  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    return sendJson(res, 503, {
      ok: false,
      error: "Photo uploads are not configured."
    });
  }

  try {
    const accessToken = getBearerToken(req);

    if (!accessToken) {
      return sendJson(res, 401, {
        ok: false,
        error: "Sign in is required to upload photos."
      });
    }

    const user = await getAuthenticatedUser(accessToken);

    if (!user) {
      return sendJson(res, 401, {
        ok: false,
        error: "Your session has expired. Please sign in again."
      });
    }

    const body = readBody(req);

    if (!body) {
      return sendJson(res, 400, {
        ok: false,
        error: "A valid JSON request body is required."
      });
    }

    const draftId = String(body.draft_id || "").trim();
    const slot = Number(body.slot);
    const base64 = String(body.file_base64 || "")
      .replace(/^data:image\/jpeg;base64,/i, "")
      .replace(/\s/g, "");

    if (!isUuid(draftId)) {
      return sendJson(res, 400, {
        ok: false,
        error: "A valid draft ID is required."
      });
    }

    if (!Number.isInteger(slot) || slot < 0 || slot > 4) {
      return sendJson(res, 400, {
        ok: false,
        error: "Photo slot must be between 0 and 4."
      });
    }

    if (
      !base64 ||
      base64.length > Math.ceil(MAX_FILE_BYTES * 4 / 3) + 8 ||
      !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)
    ) {
      return sendJson(res, 400, {
        ok: false,
        error: "The JPEG is missing or too large. Maximum size is 800 KB."
      });
    }

    const image = Buffer.from(base64, "base64");

    if (
      image.length === 0 ||
      image.length > MAX_FILE_BYTES ||
      image.toString("hex", 0, 3) !== "ffd8ff"
    ) {
      return sendJson(res, 400, {
        ok: false,
        error: "Upload a valid JPEG photo no larger than 800 KB."
      });
    }

    const objectPath =
      `${user.id}/${draftId}/${slot}-${crypto.randomUUID()}.jpg`;

    const uploadResponse = await fetch(
      `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${objectPath}`,
      {
        method: "POST",
        headers: {
          ...supabaseHeaders(""),
          "Content-Type": "image/jpeg",
          "Cache-Control": "31536000",
          "x-upsert": "false"
        },
        body: image
      }
    );

    if (!uploadResponse.ok) {
      console.error(
        "Help photo upload failed:",
        uploadResponse.status
      );

      return sendJson(res, 502, {
        ok: false,
        error: "The photo could not be uploaded. Please try again."
      });
    }

    const encodedPath = objectPath
      .split("/")
      .map(encodeURIComponent)
      .join("/");

    const publicUrl =
      `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodedPath}`;

    return sendJson(res, 201, {
      ok: true,
      url: publicUrl,
      slot
    });
  } catch (error) {
    console.error("Help photo upload API error:", error);

    return sendJson(res, 500, {
      ok: false,
      error: "Photo uploads are temporarily unavailable."
    });
  }
};
