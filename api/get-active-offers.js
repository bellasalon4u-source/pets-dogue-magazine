"use strict";

/*
=========================================================
PETS & DOGUE
GET ACTIVE CLUB OFFERS
=========================================================

Public endpoint.

Returns only data that is safe to expose publicly.

IMPORTANT:
- Promo codes are NOT returned here.
- Partner checkout URLs are NOT returned here.
- Offline staff instructions are NOT returned here.
- Those values must be provided later through protected
  member-only endpoints.

Geography returned:
- locationScope
- countryCode
- countryName
- city
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

        }

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
   NORMALIZE CATEGORY
========================================================= */

function normalizeCategory(
  value
) {

  const allowed =
    new Set([
      "veterinary",
      "grooming",
      "pet_food",
      "pet_shop",
      "travel",
      "pet_friendly",
      "training",
      "accessories",
      "insurance",
      "photography",
      "experiences",
      "other"
    ]);

  const category =
    String(
      value || ""
    )
      .trim()
      .toLowerCase();

  return allowed.has(
    category
  )
    ? category
    : "other";

}

/* =========================================================
   NORMALIZE LOCATION
========================================================= */

function normalizeLocationScope(
  value
) {

  const scope =
    String(
      value || ""
    )
      .trim()
      .toLowerCase();

  if (
    scope === "international"
  ) {

    return "international";
  }

  return "country";

}

function normalizeCountryCode(
  value
) {

  const code =
    String(
      value || ""
    )
      .trim()
      .toUpperCase();

  if (
    /^[A-Z]{2}$/.test(
      code
    )
  ) {

    return code;
  }

  return null;

}

function cleanPublicString(
  value,
  maxLength = 1000
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

/* =========================================================
   MAP OFFER
========================================================= */

function mapOffer(
  row
) {

  const locationScope =
    normalizeLocationScope(
      row.location_scope
    );

  return {

    id:
      String(
        row.id || ""
      ),

    businessName:
      cleanPublicString(
        row.business_name,
        200
      ),

    category:
      normalizeCategory(
        row.category
      ),

    title:
      cleanPublicString(
        row.title,
        220
      ),

    description:
      cleanPublicString(
        row.description,
        1500
      ),

    discount:
      cleanPublicString(
        row.discount_text,
        100
      ),

    saving:
      cleanPublicString(
        row.saving_text,
        100
      ),

    redemptionType:
      row.redemption_type === "offline"
        ? "offline"
        : "online",

    image:
      cleanPublicString(
        row.image_url,
        1600000
      ),

    startsAt:
      row.starts_at || null,

    endsAt:
      row.ends_at || null,

    maxRedemptions:
      row.max_redemptions === null
        ? null
        : Number(
            row.max_redemptions
          ),

    redemptionsCount:
      Number(
        row.redemptions_count || 0
      ),

    oneUsePerSubscriber:
      row.one_use_per_subscriber !== false,

    accessScope:
      row.access_scope === "all_subscribers"
        ? "all_subscribers"
        : "all_subscribers",

    status:
      "active",

    locationScope,

    countryCode:
      locationScope === "country"
        ? normalizeCountryCode(
            row.country_code
          )
        : null,

    countryName:
      locationScope === "country"
        ? cleanPublicString(
            row.country_name,
            120
          ) || null
        : null,

    city:
      locationScope === "country"
        ? cleanPublicString(
            row.city,
            160
          ) || null
        : null

  };

}

/* =========================================================
   OFFER AVAILABILITY
========================================================= */

function isAvailable(
  row,
  now
) {

  if (
    row.status !== "active"
  ) {

    return false;
  }

  if (
    row.access_scope !== "all_subscribers"
  ) {

    return false;
  }

  const starts =
    new Date(
      row.starts_at
    ).getTime();

  const ends =
    new Date(
      row.ends_at
    ).getTime();

  if (
    !Number.isFinite(
      starts
    ) ||
    !Number.isFinite(
      ends
    )
  ) {

    return false;
  }

  if (
    now < starts ||
    now > ends
  ) {

    return false;
  }

  const maximum =
    row.max_redemptions === null
      ? null
      : Number(
          row.max_redemptions
        );

  const redeemed =
    Number(
      row.redemptions_count || 0
    );

  if (
    maximum !== null &&
    Number.isFinite(
      maximum
    ) &&
    maximum > 0 &&
    redeemed >= maximum
  ) {

    return false;
  }

  if (
    row.location_scope === "international" &&
    row.redemption_type !== "online"
  ) {

    return false;
  }

  return true;

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
      "PETS & DOGUE active offers: Supabase environment variables are missing."
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Offer service is unavailable."
      }
    );

  }

  try {

    /*
    Security:

    Only columns safe for public display are selected.

    promo_code
    partner_url
    offline_instructions
    partner_email
    partner_id

    are intentionally excluded.
    */

    const fields = [
      "id",
      "business_name",
      "category",
      "title",
      "description",
      "discount_text",
      "saving_text",
      "redemption_type",
      "image_url",
      "starts_at",
      "ends_at",
      "max_redemptions",
      "redemptions_count",
      "one_use_per_subscriber",
      "access_scope",
      "status",
      "location_scope",
      "country_code",
      "country_name",
      "city",
      "created_at"
    ].join(",");

    const rows =
      await supabaseRequest(
        `offers?status=eq.active&select=${encodeURIComponent(fields)}&order=created_at.desc&limit=100`
      );

    if (
      !Array.isArray(
        rows
      )
    ) {

      throw new Error(
        "Invalid offers response."
      );
    }

    const now =
      Date.now();

    const offers =
      rows
        .filter(
          row =>
            isAvailable(
              row,
              now
            )
        )
        .map(
          mapOffer
        );

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        count:
          offers.length,

        offers

      }
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE get active offers error:",
      error
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Unable to load active offers."
      }
    );

  }

};
