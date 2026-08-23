"use strict";

/*
=========================================================
PETS & DOGUE
PUBLIC ACTIVE CLUB OFFERS
=========================================================

Purpose:

- Return public information needed to DISPLAY offer cards
- Never expose protected redemption information
- Never expose promo codes
- Never expose private partner redirect URLs
- Never expose offline redemption instructions

Protected data is available only through:

ONLINE:
  /api/use-offer.js

OFFLINE:
  /api/get-offer-voucher.js

Both protected endpoints verify the real Stripe
Club subscription server-side.
=========================================================
*/

/* =========================================================
   RESPONSE
========================================================= */

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

  /*
  Offers can change at any time:
  paused
  expired
  voucher quantity exhausted
  etc.

  Do not allow stale browser/CDN responses.
  */

  res.setHeader(
    "Cache-Control",
    "no-store, max-age=0"
  );

  res.setHeader(
    "Pragma",
    "no-cache"
  );

  res.end(
    JSON.stringify(
      payload
    )
  );

}

/* =========================================================
   CLEAN VALUES
========================================================= */

function cleanString(
  value,
  maxLength = 500
) {

  if (
    typeof value !== "string"
  ) {

    return "";

  }

  return value
    .trim()
    .slice(
      0,
      maxLength
    );

}

/* =========================================================
   SUPABASE CONFIG
========================================================= */

function getSupabaseConfig() {

  const url =
    cleanString(
      process.env
        .SUPABASE_URL ||
      "",
      1000
    )
      .replace(
        /\/+$/,
        ""
      );

  const secret =
    cleanString(
      process.env
        .SUPABASE_SECRET_KEY ||
      "",
      2000
    );

  return {
    url,
    secret
  };

}

/* =========================================================
   SUPABASE HEADERS

   Supports:

   New Supabase secret keys:
     sb_secret_...

   Legacy service-role JWT:
     eyJ...
========================================================= */

function buildSupabaseHeaders(
  secret
) {

  const headers = {

    apikey:
      secret,

    "Content-Type":
      "application/json"

  };

  /*
  Legacy service-role keys are JWTs and may also be sent
  through Authorization.

  New sb_secret_... keys should not be blindly treated
  as JWT Bearer tokens.
  */

  if (
    secret.startsWith(
      "eyJ"
    )
  ) {

    headers.Authorization =
      `Bearer ${secret}`;

  }

  return headers;

}

/* =========================================================
   SUPABASE REQUEST
========================================================= */

async function supabaseRequest(
  path
) {

  const {
    url,
    secret
  } =
    getSupabaseConfig();

  if (
    !url ||
    !secret
  ) {

    throw new Error(
      "Supabase is not configured."
    );

  }

  const response =
    await fetch(
      `${url}/rest/v1/${path}`,
      {

        method:
          "GET",

        headers:
          buildSupabaseHeaders(
            secret
          )

      }
    );

  const raw =
    await response.text();

  let data =
    null;

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
   DATE CHECK
========================================================= */

function validDate(
  value
) {

  if (
    !value
  ) {

    return null;

  }

  const time =
    new Date(
      value
    ).getTime();

  if (
    !Number.isFinite(
      time
    )
  ) {

    return null;

  }

  return time;

}

/* =========================================================
   NORMALIZE PUBLIC OFFER
========================================================= */

function normalizePublicOffer(
  row
) {

  /*
  IMPORTANT:

  Deliberately excluded:

  promo_code
  partner_url
  offline_instructions
  partner_email
  commission_percent
  sales_amount

  Those values must never be included in this response.
  */

  return {

    id:
      cleanString(
        row.id || "",
        100
      ),

    businessName:
      cleanString(
        row.business_name ||
        "PETS & DOGUE Partner",
        200
      ),

    category:
      cleanString(
        row.category ||
        "other",
        80
      ),

    title:
      cleanString(
        row.title ||
        "",
        250
      ),

    description:
      cleanString(
        row.description ||
        "",
        1500
      ),

    discount:
      cleanString(
        row.discount_text ||
        "",
        100
      ),

    saving:
      cleanString(
        row.saving_text ||
        "",
        150
      ),

    redemptionType:
      row.redemption_type ===
        "offline"
        ? "offline"
        : "online",

    image:
      cleanString(
        row.image_url ||
        "",
        2500000
      ),

    startsAt:
      row.starts_at ||
      null,

    endsAt:
      row.ends_at ||
      null,

    maxRedemptions:
      row.max_redemptions ===
        null ||
      row.max_redemptions ===
        undefined
        ? null
        : Number(
            row.max_redemptions
          ),

    redemptionsCount:
      Math.max(
        0,
        Number(
          row.redemptions_count ||
          0
        )
      ),

    oneUsePerSubscriber:
      row.one_use_per_subscriber !==
      false,

    accessScope:
      "all_subscribers",

    status:
      "active",

    locationScope:
      row.location_scope ===
        "international"
        ? "international"
        : "country",

    countryCode:
      row.country_code
        ? cleanString(
            row.country_code,
            2
          ).toUpperCase()
        : null,

    countryName:
      row.country_name
        ? cleanString(
            row.country_name,
            120
          )
        : null,

    city:
      row.city
        ? cleanString(
            row.city,
            120
          )
        : null

  };

}

/* =========================================================
   OFFER AVAILABILITY
========================================================= */

function isCurrentlyAvailable(
  row,
  now
) {

  if (
    row.status !==
    "active"
  ) {

    return false;

  }

  if (
    row.access_scope !==
      "all_subscribers"
  ) {

    return false;

  }

  const startsAt =
    validDate(
      row.starts_at
    );

  const endsAt =
    validDate(
      row.ends_at
    );

  if (
    startsAt ===
      null ||
    endsAt ===
      null
  ) {

    return false;

  }

  if (
    now < startsAt ||
    now > endsAt
  ) {

    return false;

  }

  const maxRedemptions =
    row.max_redemptions ===
      null ||
    row.max_redemptions ===
      undefined
      ? null
      : Number(
          row.max_redemptions
        );

  const redemptionsCount =
    Math.max(
      0,
      Number(
        row.redemptions_count ||
        0
      )
    );

  /*
  If the partner created a limited voucher allocation,
  stop publishing the offer once all confirmed
  redemptions have been used.
  */

  if (
    maxRedemptions !==
      null &&
    Number.isFinite(
      maxRedemptions
    ) &&
    maxRedemptions > 0 &&
    redemptionsCount >=
      maxRedemptions
  ) {

    return false;

  }

  /*
  International offers are online only.
  */

  if (
    row.location_scope ===
      "international" &&
    row.redemption_type !==
      "online"
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

  /* =======================================================
     METHOD
  ======================================================= */

  if (
    req.method !==
    "GET"
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

  const {
    url,
    secret
  } =
    getSupabaseConfig();

  if (
    !url ||
    !secret
  ) {

    console.error(
      "PETS & DOGUE get-active-offers: Supabase configuration is missing."
    );

    return sendJson(
      res,
      500,
      {

        ok:
          false,

        offers:
          [],

        error:
          "Offer service is not configured."

      }
    );

  }

  try {

    /*
    Only request fields that are safe or needed for
    server-side availability checks.

    Secret redemption fields are intentionally omitted
    from this SELECT.
    */

    const fields =
      [
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
      ]
      .join(",");

    /*
    Ask Supabase for active offers only.

    Date and voucher-capacity checks are repeated below
    before anything reaches the browser.
    */

    const query =
      [
        `select=${encodeURIComponent(
          fields
        )}`,

        "status=eq.active",

        "access_scope=eq.all_subscribers",

        "order=created_at.desc",

        "limit=100"

      ]
      .join("&");

    const rows =
      await supabaseRequest(
        `offers?${query}`
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
            isCurrentlyAvailable(
              row,
              now
            )
        )
        .map(
          normalizePublicOffer
        )
        .filter(
          offer =>
            Boolean(
              offer.id
            )
        );

    /* =====================================================
       SUCCESS

       Notice that response does NOT include:
       promoCode
       partnerUrl
       offlineInstructions
    ===================================================== */

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        offers,

        count:
          offers.length

      }
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE get-active-offers error:",
      error
    );

    return sendJson(
      res,
      500,
      {

        ok:
          false,

        offers:
          [],

        error:
          "Unable to load PETS & DOGUE Club offers."

      }
    );

  }

};
