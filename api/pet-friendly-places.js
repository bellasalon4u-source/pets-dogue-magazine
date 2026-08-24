"use strict";

/*
=========================================================
PETS & DOGUE
REAL PET-FRIENDLY PLACES
Google Places API (New)
=========================================================

Purpose:
- Search real nearby businesses
- Keep GOOGLE_PLACES_API_KEY hidden on Vercel
- Return normalized place data to the website
- Support pet-friendly discovery

Required Vercel environment variable:
GOOGLE_PLACES_API_KEY

Google endpoint:
https://places.googleapis.com/v1/places:searchNearby
=========================================================
*/

const GOOGLE_PLACES_API_URL =
  "https://places.googleapis.com/v1/places:searchNearby";

const MAX_RADIUS_METERS =
  25000;

const MAX_RESULTS =
  20;

/*
=========================================================
SUPPORTED CATEGORIES
=========================================================

Google Places API (New) Nearby Search accepts
official Google place types.

Parks / beaches can continue to be supplemented
from OpenStreetMap on the front end.
=========================================================
*/

const CATEGORY_TYPES = {

  all: [],

  cafe: [
    "cafe"
  ],

  restaurant: [
    "restaurant"
  ],

  hotel: [
    "hotel"
  ],

  veterinary: [
    "veterinary_care"
  ],

  "pet-shop": [
    "pet_store"
  ]

};

/*
=========================================================
CORS + RESPONSE
=========================================================
*/

function setCors(
  req,
  res
) {

  const origin =
    String(
      req.headers?.origin || ""
    ).trim();

  const allowedOrigins =
    new Set([
      "https://petsanddogue.com",
      "https://www.petsanddogue.com",
      "https://pets-dogue-magazine.vercel.app"
    ]);

  if (
    origin &&
    (
      allowedOrigins.has(origin) ||
      origin.endsWith(
        ".vercel.app"
      )
    )
  ) {

    res.setHeader(
      "Access-Control-Allow-Origin",
      origin
    );

  }

  res.setHeader(
    "Vary",
    "Origin"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

}

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

  res.end(
    JSON.stringify(
      payload
    )
  );

}

/*
=========================================================
HELPERS
=========================================================
*/

function cleanString(
  value,
  maxLength = 200
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

function finiteNumber(
  value
) {

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : null;

}

function clamp(
  value,
  minimum,
  maximum
) {

  return Math.min(
    maximum,
    Math.max(
      minimum,
      value
    )
  );

}

function normalizeCategory(
  value
) {

  const category =
    cleanString(
      value || "all",
      50
    )
      .toLowerCase();

  return Object.prototype.hasOwnProperty.call(
    CATEGORY_TYPES,
    category
  )
    ? category
    : "all";

}

function getDisplayName(
  place
) {

  if (
    place?.displayName?.text
  ) {

    return cleanString(
      place.displayName.text,
      300
    );

  }

  return "";

}

function getPhone(
  place
) {

  return (
    cleanString(
      place?.internationalPhoneNumber || "",
      100
    ) ||
    cleanString(
      place?.nationalPhoneNumber || "",
      100
    )
  );

}

function getOpeningData(
  place
) {

  const opening =
    place?.regularOpeningHours;

  if (
    !opening ||
    typeof opening !== "object"
  ) {

    return {
      openNow:
        null,

      weekdayDescriptions:
        []
    };

  }

  return {

    openNow:
      typeof opening.openNow === "boolean"
        ? opening.openNow
        : null,

    weekdayDescriptions:
      Array.isArray(
        opening.weekdayDescriptions
      )
        ? opening.weekdayDescriptions
            .map(
              item =>
                cleanString(
                  item,
                  300
                )
            )
            .filter(Boolean)
        : []

  };

}

function normalizePhoto(
  photo
) {

  if (
    !photo ||
    typeof photo !== "object"
  ) {

    return null;

  }

  const name =
    cleanString(
      photo.name || "",
      500
    );

  if (
    !name
  ) {

    return null;

  }

  return {

    name,

    widthPx:
      finiteNumber(
        photo.widthPx
      ),

    heightPx:
      finiteNumber(
        photo.heightPx
      ),

    authorAttributions:
      Array.isArray(
        photo.authorAttributions
      )
        ? photo.authorAttributions
        : []

  };

}

function normalizePlace(
  place
) {

  const opening =
    getOpeningData(
      place
    );

  const latitude =
    finiteNumber(
      place?.location?.latitude
    );

  const longitude =
    finiteNumber(
      place?.location?.longitude
    );

  const allowsDogs =
    typeof place?.allowsDogs ===
      "boolean"
      ? place.allowsDogs
      : null;

  const photo =
    Array.isArray(
      place?.photos
    ) &&
    place.photos.length
      ? normalizePhoto(
          place.photos[0]
        )
      : null;

  return {

    id:
      cleanString(
        place?.id || "",
        300
      ),

    source:
      "google",

    name:
      getDisplayName(
        place
      ),

    address:
      cleanString(
        place?.formattedAddress || "",
        500
      ),

    location: {

      lat:
        latitude,

      lng:
        longitude

    },

    primaryType:
      cleanString(
        place?.primaryType || "",
        100
      ),

    types:
      Array.isArray(
        place?.types
      )
        ? place.types
            .map(
              type =>
                cleanString(
                  type,
                  100
                )
            )
            .filter(Boolean)
        : [],

    rating:
      finiteNumber(
        place?.rating
      ),

    userRatingCount:
      finiteNumber(
        place?.userRatingCount
      ),

    googleMapsUrl:
      cleanString(
        place?.googleMapsUri || "",
        1000
      ),

    website:
      cleanString(
        place?.websiteUri || "",
        1000
      ),

    phone:
      getPhone(
        place
      ),

    businessStatus:
      cleanString(
        place?.businessStatus || "",
        100
      ),

    openingHours: {

      openNow:
        opening.openNow,

      weekdayDescriptions:
        opening.weekdayDescriptions

    },

    petFriendly: {

      allowsDogs,

      verified:
        allowsDogs === true,

      source:
        allowsDogs === true
          ? "google"
          : "unknown"

    },

    photo,

    /*
    Reserved for future PETS & DOGUE
    verification through Supabase.
    */

    petsDogueVerified:
      false

  };

}

/*
=========================================================
BODY
=========================================================
*/

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
    const chunk
    of req
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

/*
=========================================================
GOOGLE REQUEST
=========================================================
*/

async function searchGooglePlaces({
  apiKey,
  latitude,
  longitude,
  radius,
  category,
  maxResults
}) {

  const requestBody = {

    maxResultCount:
      maxResults,

    rankPreference:
      "POPULARITY",

    locationRestriction: {

      circle: {

        center: {

          latitude,

          longitude

        },

        radius

      }

    }

  };

  const includedTypes =
    CATEGORY_TYPES[
      category
    ];

  if (
    Array.isArray(
      includedTypes
    ) &&
    includedTypes.length
  ) {

    requestBody.includedTypes =
      includedTypes;

  }

  const fieldMask = [
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.location",
    "places.primaryType",
    "places.types",
    "places.rating",
    "places.userRatingCount",
    "places.googleMapsUri",
    "places.websiteUri",
    "places.internationalPhoneNumber",
    "places.nationalPhoneNumber",
    "places.regularOpeningHours",
    "places.photos",
    "places.businessStatus",
    "places.allowsDogs"
  ].join(",");

  const response =
    await fetch(
      GOOGLE_PLACES_API_URL,
      {

        method:
          "POST",

        headers: {

          "Content-Type":
            "application/json",

          "X-Goog-Api-Key":
            apiKey,

          "X-Goog-FieldMask":
            fieldMask

        },

        body:
          JSON.stringify(
            requestBody
          )

      }
    );

  const raw =
    await response.text();

  let data = {};

  if (
    raw
  ) {

    try {

      data =
        JSON.parse(
          raw
        );

    } catch {

      data = {
        raw
      };

    }

  }

  if (
    !response.ok
  ) {

    console.error(
      "PETS & DOGUE Google Places error:",
      {
        status:
          response.status,

        data
      }
    );

    const googleMessage =
      cleanString(
        data?.error?.message || "",
        500
      );

    const error =
      new Error(
        googleMessage ||
        "Google Places request failed."
      );

    error.status =
      response.status;

    throw error;

  }

  const places =
    Array.isArray(
      data?.places
    )
      ? data.places
      : [];

  return places;

}

/*
=========================================================
HANDLER
=========================================================
*/

module.exports =
async function handler(
  req,
  res
) {

  setCors(
    req,
    res
  );

  if (
    req.method === "OPTIONS"
  ) {

    res.statusCode =
      204;

    return res.end();

  }

  if (
    req.method !== "POST"
  ) {

    res.setHeader(
      "Allow",
      "POST, OPTIONS"
    );

    return sendJson(
      res,
      405,
      {

        ok:
          false,

        error:
          "Method not allowed. Use POST."

      }
    );

  }

  const apiKey =
    cleanString(
      process.env.GOOGLE_PLACES_API_KEY || "",
      500
    );

  if (
    !apiKey
  ) {

    console.error(
      "PETS & DOGUE: GOOGLE_PLACES_API_KEY is missing."
    );

    return sendJson(
      res,
      500,
      {

        ok:
          false,

        error:
          "Google Places is not configured."

      }
    );

  }

  let body = {};

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
          "Invalid request body."

      }
    );

  }

  const latitude =
    finiteNumber(
      body.latitude ??
      body.lat
    );

  const longitude =
    finiteNumber(
      body.longitude ??
      body.lng
    );

  if (
    latitude === null ||
    latitude < -90 ||
    latitude > 90
  ) {

    return sendJson(
      res,
      400,
      {

        ok:
          false,

        error:
          "A valid latitude is required."

      }
    );

  }

  if (
    longitude === null ||
    longitude < -180 ||
    longitude > 180
  ) {

    return sendJson(
      res,
      400,
      {

        ok:
          false,

        error:
          "A valid longitude is required."

      }
    );

  }

  const requestedRadius =
    finiteNumber(
      body.radius
    );

  const radius =
    requestedRadius === null
      ? 5000
      : clamp(
          requestedRadius,
          100,
          MAX_RADIUS_METERS
        );

  const requestedMaxResults =
    finiteNumber(
      body.maxResults
    );

  const maxResults =
    requestedMaxResults === null
      ? MAX_RESULTS
      : Math.round(
          clamp(
            requestedMaxResults,
            1,
            MAX_RESULTS
          )
        );

  const category =
    normalizeCategory(
      body.category
    );

  try {

    const googlePlaces =
      await searchGooglePlaces({
        apiKey,
        latitude,
        longitude,
        radius,
        category,
        maxResults
      });

    const places =
      googlePlaces
        .map(
          normalizePlace
        )
        .filter(
          place =>
            place.id &&
            place.name &&
            place.location.lat !== null &&
            place.location.lng !== null
        );

    /*
    Future stage:

    Merge PETS & DOGUE Verified places
    from Supabase here before returning.

    Google Places remains the real-world
    business source, while our database
    will hold our own verification,
    partner status and community data.
    */

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        source:
          "google_places",

        category,

        search: {

          latitude,

          longitude,

          radius,

          maxResults

        },

        count:
          places.length,

        places

      }
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE pet-friendly places error:",
      error
    );

    const upstreamStatus =
      Number(
        error?.status
      );

    let status =
      500;

    if (
      upstreamStatus === 400
    ) {

      status =
        400;

    }

    if (
      upstreamStatus === 401 ||
      upstreamStatus === 403
    ) {

      status =
        502;

    }

    if (
      upstreamStatus === 429
    ) {

      status =
        429;

    }

    return sendJson(
      res,
      status,
      {

        ok:
          false,

        error:
          error?.message ||
          "Unable to load pet-friendly places."

      }
    );

  }

};
