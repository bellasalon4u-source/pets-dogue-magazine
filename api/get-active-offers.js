"use strict";

/*
=========================================================
PETS & DOGUE
PUBLIC ACTIVE CLUB OFFERS API
=========================================================

Purpose:
- Reads offers from Supabase securely on the server.
- Never exposes SUPABASE_SECRET_KEY to the browser.
- Returns ONLY active offers.
- Returns ONLY offers currently within their validity dates.
- All offers are available to ALL active PETS & DOGUE
  Club subscribers.
- No monthly / annual separation.
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

  /*
  Offers can change,
  so don't allow long browser caching.
  */

  res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=30, stale-while-revalidate=60"
  );

  res.end(
    JSON.stringify(payload)
  );

}

/* =========================================================
   SUPABASE
========================================================= */

async function supabaseRequest(
  path
) {

  const response =
    await fetch(
      `${SUPABASE_URL}/rest/v1/${path}`,
      {
        method:
          "GET",

        headers: {
          apikey:
            SUPABASE_SECRET_KEY,

          Authorization:
            `Bearer ${SUPABASE_SECRET_KEY}`,

          Accept:
            "application/json"
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
        JSON.parse(raw);

    } catch {

      data =
        raw;
    }

  }

  if (
    !response.ok
  ) {

    const message =
      data?.message ||
      data?.hint ||
      data?.details ||
      `Supabase request failed with status ${response.status}.`;

    const error =
      new Error(message);

    error.status =
      response.status;

    throw error;
  }

  return data;

}

/* =========================================================
   SAFE STRING
========================================================= */

function safeString(
  value,
  maxLength = 2000
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
   CATEGORY
========================================================= */

function normalizeCategory(
  value
) {

  const category =
    safeString(
      value,
      80
    ).toLowerCase();

  const valid =
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

  return valid.has(category)
    ? category
    : "other";

}

/* =========================================================
   IMAGE
========================================================= */

function safeImage(
  value
) {

  const image =
    safeString(
      value,
      1600000
    );

  if (
    !image
  ) {

    return "";
  }

  if (
    image.startsWith(
      "https://"
    )
  ) {

    return image;
  }

  /*
  Current partner form may still store compressed
  image data as a data URL.

  This is allowed temporarily until images are moved
  into Supabase Storage.
  */

  if (
    /^data:image\/(jpeg|jpg|png|webp);base64,/i
      .test(image)
  ) {

    return image;
  }

  return "";

}

/* =========================================================
   MAP DATABASE OFFER
========================================================= */

function mapOffer(
  row
) {

  return {

    id:
      safeString(
        row.id,
        100
      ),

    businessName:
      safeString(
        row.business_name,
        200
      ),

    category:
      normalizeCategory(
        row.category
      ),

    title:
      safeString(
        row.title,
        250
      ),

    description:
      safeString(
        row.description,
        2000
      ),

    discount:
      safeString(
        row.discount_text,
        120
      ),

    saving:
      safeString(
        row.saving_text,
        120
      ),

    /*
    Promo code is returned because the current
    special-offers page handles locking in the UI.

    Later, when Club identity is fully server-backed,
    code claiming will move behind a protected endpoint.
    */

    promoCode:
      safeString(
        row.promo_code,
        120
      ),

    redemptionType:
      row.redemption_type === "offline"
        ? "offline"
        : "online",

    partnerUrl:
      safeString(
        row.partner_url,
        1200
      ),

    offlineInstructions:
      safeString(
        row.offline_instructions,
        2000
      ),

    image:
      safeImage(
        row.image_url
      ),

    startsAt:
      safeString(
        row.starts_at,
        80
      ),

    endsAt:
      safeString(
        row.ends_at,
        80
      ),

    maxRedemptions:
      row.max_redemptions === null
        ? null
        : Number(
            row.max_redemptions
          ),

    oneUsePerSubscriber:
      row.one_use_per_subscriber !== false,

    accessScope:
      "all_subscribers",

    status:
      "active",

    createdAt:
      safeString(
        row.created_at,
        80
      )

  };

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

  if (
    !SUPABASE_URL ||
    !SUPABASE_SECRET_KEY
  ) {

    console.error(
      "PETS & DOGUE: Supabase environment variables are missing."
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Offers database is not configured."
      }
    );

  }

  try {

    const now =
      new Date()
        .toISOString();

    /*
    Only retrieve offers which are:

    status = active
    start <= now
    end >= now

    Sorting:
    newest active offers first.
    */

    const query =
      [
        "select=" +
        [
          "id",
          "business_name",
          "category",
          "title",
          "description",
          "discount_text",
          "saving_text",
          "promo_code",
          "redemption_type",
          "partner_url",
          "offline_instructions",
          "image_url",
          "starts_at",
          "ends_at",
          "max_redemptions",
          "one_use_per_subscriber",
          "access_scope",
          "status",
          "created_at"
        ].join(","),

        "status=eq.active",

        `starts_at=lte.${encodeURIComponent(
          now
        )}`,

        `ends_at=gte.${encodeURIComponent(
          now
        )}`,

        "order=created_at.desc",

        "limit=100"
      ]
        .join("&");

    const rows =
      await supabaseRequest(
        `offers?${query}`
      );

    const offers =
      Array.isArray(rows)
        ? rows
            .filter(
              row =>
                row &&
                row.status === "active" &&
                row.access_scope === "all_subscribers"
            )
            .map(
              mapOffer
            )
        : [];

    return sendJson(
      res,
      200,
      {
        ok:
          true,

        count:
          offers.length,

        offers,

        generatedAt:
          new Date()
            .toISOString()
      }
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE active offers API error:",
      error
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Unable to load PETS & DOGUE offers."
      }
    );

  }

};
