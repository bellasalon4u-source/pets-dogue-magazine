"use strict";

/*
=========================================================
PETS & DOGUE
VISITOR COUNTRY DETECTION
=========================================================

Purpose:

- Detect the visitor's current country approximately
  from deployment/request location headers.
- Do NOT request precise GPS coordinates.
- Do NOT expose IP addresses.
- Used by Special Offers for "Near me".

The customer can always override the detected country
manually in the Special Offers country selector.
=========================================================
*/

/* =========================================================
   COUNTRY NAMES
========================================================= */

const COUNTRY_NAMES = {

  GB: "United Kingdom",
  UA: "Ukraine",
  FR: "France",
  DE: "Germany",
  ES: "Spain",
  IT: "Italy",
  PT: "Portugal",
  NL: "Netherlands",
  BE: "Belgium",
  LU: "Luxembourg",
  IE: "Ireland",
  PL: "Poland",
  CZ: "Czech Republic",
  SK: "Slovakia",
  HU: "Hungary",
  RO: "Romania",
  BG: "Bulgaria",
  GR: "Greece",
  AT: "Austria",
  CH: "Switzerland",
  SE: "Sweden",
  DK: "Denmark",
  NO: "Norway",
  FI: "Finland",
  EE: "Estonia",
  LV: "Latvia",
  LT: "Lithuania",
  HR: "Croatia",
  SI: "Slovenia",
  RS: "Serbia",
  ME: "Montenegro",
  AL: "Albania",
  MK: "North Macedonia",
  BA: "Bosnia and Herzegovina",
  MD: "Moldova",
  TR: "Türkiye",
  CY: "Cyprus",
  MT: "Malta",
  IS: "Iceland",

  US: "United States",
  CA: "Canada",
  MX: "Mexico",
  BR: "Brazil",
  AR: "Argentina",

  AU: "Australia",
  NZ: "New Zealand",

  AE: "United Arab Emirates",
  SA: "Saudi Arabia",
  QA: "Qatar",

  EG: "Egypt",
  MA: "Morocco",
  ZA: "South Africa",

  IN: "India",
  JP: "Japan",
  KR: "South Korea",
  SG: "Singapore",
  TH: "Thailand",
  ID: "Indonesia",
  MY: "Malaysia",
  PH: "Philippines"

};

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
    "private, no-store, max-age=0"
  );

  res.end(
    JSON.stringify(payload)
  );

}

/* =========================================================
   HEADER HELPERS
========================================================= */

function firstHeaderValue(
  value
) {

  if (
    Array.isArray(value)
  ) {

    return String(
      value[0] || ""
    ).trim();

  }

  return String(
    value || ""
  )
    .split(",")[0]
    .trim();

}

function normalizeCountryCode(
  value
) {

  const code =
    firstHeaderValue(
      value
    )
      .toUpperCase()
      .slice(0, 2);

  if (
    !/^[A-Z]{2}$/.test(
      code
    )
  ) {

    return "";
  }

  return code;

}

function cleanLocationText(
  value,
  maxLength = 160
) {

  let text =
    firstHeaderValue(
      value
    );

  if (
    !text
  ) {

    return "";
  }

  /*
  Some infrastructure may URL-encode city/region names.
  */

  try {

    text =
      decodeURIComponent(
        text
      );

  } catch {

    /*
    Keep original value if decoding fails.
    */

  }

  return text
    .replace(
      /[\u0000-\u001F\u007F]/g,
      ""
    )
    .trim()
    .slice(
      0,
      maxLength
    );

}

/* =========================================================
   DETECTION
========================================================= */

function detectCountryCode(
  req
) {

  /*
  Vercel commonly provides:

  x-vercel-ip-country

  Fallback headers are included for compatibility with
  other deployment/proxy setups.

  We NEVER return or store the visitor's IP address.
  */

  const candidates = [

    req.headers?.["x-vercel-ip-country"],

    req.headers?.["cf-ipcountry"],

    req.headers?.["cloudfront-viewer-country"],

    req.headers?.["x-country-code"]

  ];

  for (
    const candidate
    of candidates
  ) {

    const code =
      normalizeCountryCode(
        candidate
      );

    if (
      code
    ) {

      return code;
    }

  }

  return "";

}

function detectCity(
  req
) {

  const candidates = [

    req.headers?.["x-vercel-ip-city"],

    req.headers?.["x-city"],

    req.headers?.["cf-ipcity"]

  ];

  for (
    const candidate
    of candidates
  ) {

    const city =
      cleanLocationText(
        candidate
      );

    if (
      city
    ) {

      return city;
    }

  }

  return "";

}

function detectRegion(
  req
) {

  const candidates = [

    req.headers?.["x-vercel-ip-country-region"],

    req.headers?.["x-vercel-ip-region"],

    req.headers?.["x-region"]

  ];

  for (
    const candidate
    of candidates
  ) {

    const region =
      cleanLocationText(
        candidate
      );

    if (
      region
    ) {

      return region;
    }

  }

  return "";

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
    req.method !== "GET"
  ) {

    res.setHeader(
      "Allow",
      "GET"
    );

    return sendJson(
      res,
      405,
      {
        ok: false,
        error: "Method not allowed."
      }
    );

  }

  try {

    const countryCode =
      detectCountryCode(
        req
      );

    const city =
      detectCity(
        req
      );

    const region =
      detectRegion(
        req
      );

    /*
    If deployment cannot determine the location,
    do not guess a country.

    The Special Offers page will simply keep the
    user's saved/manual country selection.
    */

    if (
      !countryCode
    ) {

      return sendJson(
        res,
        200,
        {

          ok: true,

          detected: false,

          countryCode: null,

          countryName: null,

          city: null,

          region: null,

          accuracy: "unavailable"

        }
      );

    }

    const countryName =
      COUNTRY_NAMES[
        countryCode
      ] || countryCode;

    return sendJson(
      res,
      200,
      {

        ok: true,

        detected: true,

        countryCode,

        countryName,

        city:
          city || null,

        region:
          region || null,

        /*
        Important wording:

        This is approximate network/deployment location,
        NOT precise GPS.
        */

        accuracy: "country"

      }
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE location detection error:",
      error
    );

    /*
    Location detection must never break the offers page.
    */

    return sendJson(
      res,
      200,
      {

        ok: true,

        detected: false,

        countryCode: null,

        countryName: null,

        city: null,

        region: null,

        accuracy: "unavailable"

      }
    );

  }

};
