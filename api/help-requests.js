"use strict";

/*
  PETS & DOGUE — Help requests API

  GET  /api/help-requests?lat=...&lng=...&radius=15
       &category=veterinary&animal_type=dog&kind=request

  POST /api/help-requests
       Requires a signed-in Supabase user, Privacy Policy consent,
       and publication consent.
       Every user-submitted listing requires an active monthly or annual
       Club membership. Administrators may post without membership.
       New listings are always submitted as pending.
*/

const SUPABASE_URL = String(
  process.env.SUPABASE_URL || ""
).replace(/\/+$/, "");

const SUPABASE_SECRET_KEY = String(
  process.env.SUPABASE_SECRET_KEY || ""
);

const clubSessionHandler = require("./club-session.js");

const PRIVACY_POLICY_VERSION = "v1";
const PUBLICATION_TERMS_VERSION = "2026-11-18-v1";

const CATEGORIES = new Set([
  "lost_found",
  "veterinary",
  "food",
  "temporary_home",
  "adoption",
  "volunteers",
  "transport",
  "other",
  "pet_walking_sitting"
]);

const POST_CATEGORIES = new Set([
  "lost_found",
  "veterinary",
  "temporary_home",
  "adoption",
  "volunteers",
  "transport",
  "other",
  "pet_walking_sitting"
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

const CONTACT_METHODS = new Set([
  "phone",
  "email",
  "whatsapp",
  "viber",
  "telegram"
]);

const REQUEST_KIND = "request";
const FREE_OFFER_KIND = "free_offer";
const LEGACY_SERVICE_OFFER_KIND = "service_offer";
const SERVICE_CATEGORY = "pet_walking_sitting";

const HELP_KINDS = new Set([
  REQUEST_KIND,
  FREE_OFFER_KIND,
  LEGACY_SERVICE_OFFER_KIND
]);

const POST_KINDS = new Set([
  REQUEST_KIND,
  FREE_OFFER_KIND
]);

const MAX_RADIUS_KM = 100;
const MAX_RESULTS = 60;
const DATABASE_SCAN_LIMIT = 500;
const MAX_PHOTOS = 5;
const MAX_PHOTO_URL_LENGTH = 2048;

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

function cleanOptionalText(value, maxLength) {
  const text = cleanText(value, maxLength);
  return text || null;
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

function validHttpsUrl(value) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function validPhone(value) {
  return /^[+\d][\d\s().-]{5,24}$/.test(
    String(value || "").trim()
  );
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const toRadians = degrees =>
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

  let category = String(query.category || "").trim();
  const animalType = String(query.animal_type || "").trim();

  if (!HELP_KINDS.has(kind)) {
    return {
      error: "Invalid help listing type."
    };
  }

  if (category && !CATEGORIES.has(category)) {
    return {
      error: "Invalid help category."
    };
  }

  if (
    kind === LEGACY_SERVICE_OFFER_KIND &&
    category &&
    category !== SERVICE_CATEGORY
  ) {
    return {
      error: "Pet walking and sitting offers must use their own category."
    };
  }

  if (kind === LEGACY_SERVICE_OFFER_KIND) {
    category = SERVICE_CATEGORY;
  }

  if (animalType && !ANIMAL_TYPES.has(animalType)) {
    return {
      error: "Invalid animal type."
    };
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
    kind
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

async function verifyClubMembership(req) {
  let responseBody = "";

  const response = {
    statusCode: 200,
    setHeader() {},
    end(value) {
      responseBody += String(value || "");
    }
  };

  await clubSessionHandler(
    {
      method: "GET",
      headers: req.headers || {}
    },
    response
  );

  let result = {};

  try {
    result = responseBody
      ? JSON.parse(responseBody)
      : {};
  } catch {
    return {
      available: false,
      active: false
    };
  }

  if (response.statusCode >= 500 || result.temporary) {
    return {
      available: false,
      active: false
    };
  }

  const plan = String(
    result.membership?.plan || ""
  ).toLowerCase();

  return {
    available: true,
    active:
      result.ok === true &&
      result.authenticated === true &&
      result.active === true &&
      (plan === "monthly" || plan === "annual"),
    plan
  };
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
      "photo_urls",
      "poster_type",
      "display_name",
      "contact_name",
      "preferred_contact",
      "contact_phone",
      "contact_email",
      "contact_whatsapp",
      "contact_viber",
      "contact_telegram",
      "website_url",
      "facebook_url",
      "instagram_url",
      "created_at"
    ].join(",")
  );

  endpoint.searchParams.set("status", "eq.approved");
  endpoint.searchParams.set("kind", `eq.${filters.kind}`);
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
    .filter(row => {
      if (
        row.kind !== filters.kind ||
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
    .map(row => {
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
        kind: filters.kind,
        category: row.category,
        animal_type: row.animal_type,
        title: row.title,
        description: row.description,
        location_label: row.location_label,
        distance_km: Number(distance.toFixed(1)),
        image_url: row.image_url,
        photo_urls: Array.isArray(row.photo_urls)
          ? row.photo_urls.slice(0, MAX_PHOTOS)
          : (row.image_url ? [row.image_url] : []),
        poster_type: row.poster_type,
        display_name: row.display_name,
        contact_name: row.contact_name,
        preferred_contact: row.preferred_contact,
        contact_phone: row.contact_phone,
        contact_email: row.contact_email,
        contact_whatsapp: row.contact_whatsapp,
        contact_viber: row.contact_viber,
        contact_telegram: row.contact_telegram,
        website_url: row.website_url,
        facebook_url: row.facebook_url,
        instagram_url: row.instagram_url,
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
      kind: filters.kind
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
      error: "Sign in is required to submit a help request.",
      code: "sign_in_required"
    });
  }

  const user = await getAuthenticatedUser(accessToken);

  if (!user) {
    return sendJson(res, 401, {
      ok: false,
      error: "Your session has expired. Please sign in again.",
      code: "session_expired"
    });
  }

  const body = readBody(req);

  if (!body) {
    return sendJson(res, 400, {
      ok: false,
      error: "A valid JSON request body is required.",
      code: "invalid_request"
    });
  }

  if (body.privacy_policy_accepted !== true) {
    return sendJson(res, 400, {
      ok: false,
      error: "Please accept the Privacy Policy before submitting.",
      code: "privacy_consent_required"
    });
  }

  if (
    body.publication_consent_accepted !== true ||
    body.publication_consent_version !== PUBLICATION_TERMS_VERSION
  ) {
    return sendJson(res, 400, {
      ok: false,
      error: "Publication consent is required.",
      code: "publication_consent_required"
    });
  }

  const submittedKind = String(
    body.kind || REQUEST_KIND
  ).trim();

  if (!POST_KINDS.has(submittedKind)) {
    return sendJson(res, 400, {
      ok: false,
      error: "Choose a valid help listing type.",
      code: "invalid_listing_type"
    });
  }

  const category = String(body.category || "").trim();
  const animalType = String(body.animal_type || "").trim();
  const title = cleanText(body.title, 120);
  const description = cleanText(body.description, 2500);
  const locationLabel = cleanText(body.location_label, 180);
  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);

  const legacyImageURL = String(
    body.image_url || ""
  ).trim();

  const rawPhotos = Array.isArray(body.photo_urls)
    ? body.photo_urls
    : (legacyImageURL ? [legacyImageURL] : []);

  const photoURLs = rawPhotos
    .map(value => String(value || "").trim())
    .filter(Boolean);

  const posterType = String(
    body.poster_type || ""
  ).trim();

  const displayName = cleanText(
    body.display_name,
    120
  );

  const contactName = cleanOptionalText(
    body.contact_name,
    120
  );

  const preferredContact = String(
    body.preferred_contact || ""
  ).trim();

  const contactPhone = cleanOptionalText(
    body.contact_phone,
    40
  );

  const contactEmail = cleanOptionalText(
    body.contact_email,
    254
  )?.toLowerCase() || null;

  const contactWhatsapp = cleanOptionalText(
    body.contact_whatsapp,
    40
  );

  const contactViber = cleanOptionalText(
    body.contact_viber,
    40
  );

  const contactTelegram = cleanOptionalText(
    body.contact_telegram,
    40
  );

  const websiteURL = cleanOptionalText(
    body.website_url,
    500
  );

  const facebookURL = cleanOptionalText(
    body.facebook_url,
    500
  );

  const instagramURL = cleanOptionalText(
    body.instagram_url,
    500
  );

  if (!POST_CATEGORIES.has(category)) {
    return sendJson(res, 400, {
      ok: false,
      error: "Choose a supported help category.",
      code: "invalid_category"
    });
  }

  if (!ANIMAL_TYPES.has(animalType)) {
    return sendJson(res, 400, {
      ok: false,
      error: "Choose an animal type.",
      code: "invalid_animal_type"
    });
  }

  if (title.length < 3 || description.length < 10) {
    return sendJson(res, 400, {
      ok: false,
      error: "Add a title and a short description.",
      code: "title_or_description_required"
    });
  }

  if (locationLabel.length < 2) {
    return sendJson(res, 400, {
      ok: false,
      error: "Add the area where help is needed.",
      code: "location_required"
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
      error: "A valid location is required.",
      code: "invalid_location"
    });
  }

  if (
    photoURLs.length > MAX_PHOTOS ||
    photoURLs.some(
      url =>
        url.length > MAX_PHOTO_URL_LENGTH ||
        !validHttpsUrl(url)
    )
  ) {
    return sendJson(res, 400, {
      ok: false,
      error: "Add up to five photos using secure HTTPS addresses.",
      code: "invalid_photos"
    });
  }

  if (
    !["person", "organization"].includes(posterType) ||
    displayName.length < 2
  ) {
    return sendJson(res, 400, {
      ok: false,
      error: "Add the poster name or organization name.",
      code: "poster_details_required"
    });
  }

  if (!CONTACT_METHODS.has(preferredContact)) {
    return sendJson(res, 400, {
      ok: false,
      error: "Choose a contact method.",
      code: "contact_method_required"
    });
  }

  const selectedContact = {
    phone: contactPhone,
    email: contactEmail,
    whatsapp: contactWhatsapp,
    viber: contactViber,
    telegram: contactTelegram
  }[preferredContact];

  if (
    !selectedContact ||
    (
      ["phone", "whatsapp", "viber", "telegram"].includes(preferredContact) &&
      !validPhone(selectedContact)
    )
  ) {
    return sendJson(res, 400, {
      ok: false,
      error: "Add valid details for the selected contact method.",
      code: "contact_details_invalid"
    });
  }

  if (
    preferredContact === "email" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail || "")
  ) {
    return sendJson(res, 400, {
      ok: false,
      error: "Add a valid email address.",
      code: "contact_email_invalid"
    });
  }

  if (
    [websiteURL, facebookURL, instagramURL].some(
      url => !validHttpsUrl(url)
    )
  ) {
    return sendJson(res, 400, {
      ok: false,
      error: "Website and social links must use HTTPS.",
      code: "invalid_profile_link"
    });
  }

  const isAdmin =
    user.app_metadata?.role === "admin";

  if (!isAdmin) {
    const membership = await verifyClubMembership(req);

    if (!membership.available) {
      return sendJson(res, 503, {
        ok: false,
        error: "Membership verification is temporarily unavailable.",
        code: "membership_verification_unavailable"
      });
    }

    if (!membership.active) {
      return sendJson(res, 403, {
        ok: false,
        error: "An active monthly or annual Club membership is required to publish a listing.",
        code: "active_membership_required"
      });
    }
  }

  const now = new Date().toISOString();

  const requestData = {
    kind: submittedKind,
    category,
    animal_type: animalType,
    title,
    description,
    location_label: locationLabel,
    latitude,
    longitude,
    image_url: photoURLs[0] || null,
    photo_urls: photoURLs,
    poster_type: posterType,
    display_name: displayName,
    contact_name: contactName,
    preferred_contact: preferredContact,
    contact_phone: contactPhone,
    contact_email: contactEmail,
    contact_whatsapp: contactWhatsapp,
    contact_viber: contactViber,
    contact_telegram: contactTelegram,
    website_url: websiteURL,
    facebook_url: facebookURL,
    instagram_url: instagramURL,
    privacy_policy_accepted_at: now,
    privacy_policy_version: PRIVACY_POLICY_VERSION,
    publication_consent_accepted_at: now,
    publication_consent_version: PUBLICATION_TERMS_VERSION,
    status: "pending",
    created_by: user.id
  };

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/help_requests?select=id,status,created_at`,
    {
      method: "POST",
      headers: {
        ...supabaseHeaders(""),
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
      error: "The request could not be submitted. Please try again.",
      code: "submission_failed"
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
    message: "Your listing was sent for moderation.",
    request: saved
      ? {
          id: saved.id,
          kind: submittedKind,
          category,
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
      error: "Help requests are not configured.",
      code: "help_api_unavailable"
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
      error: "Method not allowed.",
      code: "method_not_allowed"
    });
  } catch (error) {
    console.error("Help requests API error:", error);

    return sendJson(res, 500, {
      ok: false,
      error: "Help requests are temporarily unavailable.",
      code: "help_api_error"
    });
  }
};
