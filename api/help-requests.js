"use strict";

/*
  PETS & DOGUE — Help requests API

  GET  /api/help-requests?lat=...&lng=...&radius=15
       &category=veterinary&animal_type=dog

  POST /api/help-requests
       Requires a signed-in Supabase user and Privacy Policy consent.
       New requests are always submitted as pending.

  Uses the existing Vercel environment variables:
  - SUPABASE_URL
  - SUPABASE_SECRET_KEY
*/

const SUPABASE_URL = String(
  process.env.SUPABASE_URL || ""
).replace(/\/+$/, "");

const SUPABASE_SECRET_KEY = String(
  process.env.SUPABASE_SECRET_KEY || ""
);

const PRIVACY_POLICY_VERSION = "v1";

const CATEGORIES = new Set([
  "lost_found",
  "veterinary",
  "food",
  "temporary_home",
  "adoption",
  "volunteers",
  "other"
]);

const ANIMAL_TYPES = new Set([
  "dog",
  "cat",
  "bird",
  "rabbit",
  "small_pet",
  "reptile",
  "other"
]);

const REQUEST_KIND = "request";

const MAX_RADIUS_KM = 100;
const MAX_RESULTS = 60;
const DATABASE_SCAN_LIMIT = 500;

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

function supabaseHeaders(accessToken) {
  const headers = {
    apikey: SUPABASE_SECRET_KEY,
    "Content-Type": "application/json"
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  } else if (SUPABASE_SECRET_KEY.startsWith("eyJ")) {
    /*
      Legacy Supabase service-role JWT keys require Authorization.
      New sb_secret_ keys are sent as apikey only.
    */
    headers.Authorization =
      `Bearer ${SUPABASE_SECRET_KEY}`;
  }

  return headers;
}

function cleanText(value, maxLength) {
  return String(value == null ? "" : value)
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
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

function haversineKm(lat1, lng1, lat2, lng2) {
  const toRadians = (degrees) =>
    degrees * Math.PI / 180;

  const earthRadiusKm = 6371.0088;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;

  return (
    2 *
    earthRadiusKm *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
}

function readFilters(req) {
  const query = req.query || {};
  const lat = Number(query.lat);
  const lng = Number(query.lng);
  const radius = Number(query.radius || 15);
  const limit = Number(query.limit || MAX_RESULTS);
  const kind = String(query.kind || REQUEST_KIND).trim();

  if (
    query.lat == null ||
    query.lng == null ||
    !Number.isFinite(lat) ||
    lat < -90 ||
    lat > 90 ||
    !Number.isFinite(lng) ||
    lng < -180 ||
    lng > 180
  ) {
    return {
      error: "Valid lat and lng coordinates are required."
    };
  }

  if (!Number.isFinite(radius) || radius < 1) {
    return {
      error: "Radius must be at least 1 km."
    };
  }

  const category = String(query.category || "").trim();
  const animalType = String(query.animal_type || "").trim();

  if (kind !== REQUEST_KIND) {
    return {
      error: "Only help requests are available."
    };
  }

  if (category && !CATEGORIES.has(category)) {
    return { error: "Invalid help category." };
  }

  if (animalType && !ANIMAL_TYPES.has(animalType)) {
    return { error: "Invalid animal type." };
  }

  return {
    lat,
    lng,
    radius: Math.min(radius, MAX_RADIUS_KM),
    limit: Math.max(
      1,
      Math.min(
        MAX_RESULTS,
        Number.isFinite(limit) ? Math.round(limit) : MAX_RESULTS
      )
    ),
    category,
    animalType,
    kind: REQUEST_KIND
  };
}

async function getAuthenticatedUser(accessToken) {
  const response = await fetch(
    `${SUPABASE_URL}/auth/v1/user`,
    {
      method: "GET",
      headers: supabaseHeaders(accessToken)
    }
  );

  if (!response.ok) {
    return null;
  }

  const user = await response.json();

  return user && user.id
    ? user
    : null;
}

async function listHelpRequests(req, res) {
  const filters = readFilters(req);

  if (filters.error) {
    return sendJson(res, 400, {
      ok: false,
      error: filters.error
    });
  }

  const endpoint = new URL(
    `${SUPABASE_URL}/rest/v1/help_requests`
  );

  endpoint.searchParams.set(
    "select",
    [
      "id",
      "kind",
      "category",
      "animal_type",
      "title",
      "description",
      "location_label",
      "latitude",
      "longitude",
      "image_url",
      "created_at"
    ].join(",")
  );

  endpoint.searchParams.set("status", "eq.approved");
  endpoint.searchParams.set("kind", `eq.${REQUEST_KIND}`);
  endpoint.searchParams.set("order", "created_at.desc");
  endpoint.searchParams.set(
    "limit",
    String(DATABASE_SCAN_LIMIT)
  );

  if (filters.category) {
    endpoint.searchParams.set(
      "category",
      `eq.${filters.category}`
    );
  }

  if (filters.animalType) {
    endpoint.searchParams.set(
      "animal_type",
      `eq.${filters.animalType}`
    );
  }

  const response = await fetch(endpoint.toString(), {
    method: "GET",
    headers: supabaseHeaders("")
  });

  if (!response.ok) {
    console.error(
      "Help requests read failed:",
      response.status
    );

    return sendJson(res, 502, {
      ok: false,
      error: "Help requests are temporarily unavailable."
    });
  }

  const rows = await response.json();

  const items = (Array.isArray(rows) ? rows : [])
    .filter((row) => {
      if (
        row.kind !== REQUEST_KIND ||
        row.category === "free_items"
      ) {
        return false;
      }

      const distance = haversineKm(
        filters.lat,
        filters.lng,
        Number(row.latitude),
        Number(row.longitude)
      );

      return distance <= filters.radius;
    })
    .map((row) => {
      const distance = haversineKm(
        filters.lat,
        filters.lng,
        Number(row.latitude),
        Number(row.longitude)
      );

      /*
        Exact coordinates are used for radius filtering but are not
        returned to the public page to protect people's home locations.
      */
      return {
        id: row.id,
        kind: REQUEST_KIND,
        category: row.category,
        animal_type: row.animal_type,
        title: row.title,
        description: row.description,
        location_label: row.location_label,
        distance_km: Number(distance.toFixed(1)),
        image_url: row.image_url,
        created_at: row.created_at
      };
    })
    .sort((a, b) => a.distance_km - b.distance_km)
    .slice(0, filters.limit);

  return sendJson(res, 200, {
    ok: true,
    filters: {
      radius_km: filters.radius,
      category: filters.category || "all",
      animal_type: filters.animalType || "all",
      kind: REQUEST_KIND
    },
    count: items.length,
    items
  });
}

async function createHelpRequest(req, res) {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    return sendJson(res, 503, {
      ok: false,
      error: "Help requests are not configured."
    });
  }

  const accessToken = getBearerToken(req);

  if (!accessToken) {
    return sendJson(res, 401, {
      ok: false,
      error: "Sign in is required to submit a help request."
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

  if (body.privacy_policy_accepted !== true) {
    return sendJson(res, 400, {
      ok: false,
      error: "Please accept the Privacy Policy before submitting."
    });
  }

  const submittedKind = String(
    body.kind || REQUEST_KIND
  ).trim();

  if (submittedKind !== REQUEST_KIND) {
    return sendJson(res, 400, {
      ok: false,
      error: "Only help requests can be submitted."
    });
  }

  const category = String(body.category || "").trim();
  const animalType = String(body.animal_type || "").trim();
  const title = cleanText(body.title, 120);
  const description = cleanText(body.description, 2500);
  const locationLabel = cleanText(body.location_label, 180);
  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);
  const imageURL = String(body.image_url || "").trim();

  if (!CATEGORIES.has(category)) {
    return sendJson(res, 400, {
      ok: false,
      error: "Choose a help category."
    });
  }

  if (!ANIMAL_TYPES.has(animalType)) {
    return sendJson(res, 400, {
      ok: false,
      error: "Choose an animal type."
    });
  }

  if (title.length < 3 || description.length < 10) {
    return sendJson(res, 400, {
      ok: false,
      error: "Add a title and a short description."
    });
  }

  if (locationLabel.length < 2) {
    return sendJson(res, 400, {
      ok: false,
      error: "Add the area where help is needed."
    });
  }

  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    return sendJson(res, 400, {
      ok: false,
      error: "A valid location is required."
    });
  }

  if (
    imageURL &&
    !/^https:\/\//i.test(imageURL)
  ) {
    return sendJson(res, 400, {
      ok: false,
      error: "Images must use a secure HTTPS address."
    });
  }

  const requestData = {
    kind: REQUEST_KIND,
    category,
    animal_type: animalType,
    title,
    description,
    location_label: locationLabel,
    latitude,
    longitude,
    image_url: imageURL || null,
    privacy_policy_accepted_at: new Date().toISOString(),
    privacy_policy_version: PRIVACY_POLICY_VERSION,
    status: "pending",
    created_by: user.id
  };

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/help_requests?select=id,status,created_at`,
    {
      method: "POST",
      headers: {
        ...supabaseHeaders(accessToken),
        Prefer: "return=representation"
      },
      body: JSON.stringify(requestData)
    }
  );

  const responseText = await response.text();

  if (!response.ok) {
    console.error(
      "Help request submission failed:",
      response.status
    );

    return sendJson(res, 502, {
      ok: false,
      error: "The request could not be submitted. Please try again."
    });
  }

  let savedRows = [];

  try {
    savedRows = responseText
      ? JSON.parse(responseText)
      : [];
  } catch {
    savedRows = [];
  }

  const saved = Array.isArray(savedRows)
    ? savedRows[0]
    : null;

  return sendJson(res, 201, {
    ok: true,
    message: "Your request was sent for moderation.",
    request: saved
      ? {
          id: saved.id,
          status: saved.status,
          created_at: saved.created_at
        }
      : null
  });
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.statusCode = 204;
    return res.end();
  }

  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    return sendJson(res, 503, {
      ok: false,
      error: "Help requests are not configured."
    });
  }

  try {
    if (req.method === "GET") {
      return await listHelpRequests(req, res);
    }

    if (req.method === "POST") {
      return await createHelpRequest(req, res);
    }

    res.setHeader("Allow", "GET, POST, OPTIONS");
    return sendJson(res, 405, {
      ok: false,
      error: "Method not allowed."
    });
  } catch (error) {
    console.error("Help requests API error:", error);

    return sendJson(res, 500, {
      ok: false,
      error: "Help requests are temporarily unavailable."
    });
  }
};
