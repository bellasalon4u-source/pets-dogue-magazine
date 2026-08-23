"use strict";

/*
=========================================================
PETS & DOGUE
TRACKED ONLINE OFFER REDIRECT
=========================================================

Flow:

PETS & DOGUE Special Offer
        ↓
/api/use-offer?id=OFFER_ID
        ↓
Validate offer on server
        ↓
Register tracked action
        ↓
Redirect to partner website

IMPORTANT:

- Opening an offer card is NOT a redemption.
- Clicking "Use Offer" is NOT a completed sale.
- This endpoint only records customer interest / click.
- A voucher becomes REDEEMED only after a later
  confirmed purchase/redemption flow.
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
   RESPONSE HELPERS
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

function redirect(
  res,
  url
) {

  res.statusCode = 302;

  res.setHeader(
    "Location",
    url
  );

  res.setHeader(
    "Cache-Control",
    "no-store, max-age=0"
  );

  res.end();

}

/* =========================================================
   CLEAN STRING
========================================================= */

function cleanString(
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
   UUID
========================================================= */

function isUuid(
  value
) {

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    .test(
      String(value || "")
    );

}

/* =========================================================
   SAFE PARTNER URL
========================================================= */

function normalizePartnerUrl(
  value
) {

  const raw =
    cleanString(
      value,
      1500
    );

  if (
    !raw
  ) {

    return "";
  }

  try {

    const url =
      new URL(
        raw
      );

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {

      return "";
    }

    return url
      .toString();

  } catch {

    return "";
  }

}

/* =========================================================
   SUPABASE REQUEST
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
          options.method ||
          "GET",

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
   LOAD OFFER
========================================================= */

async function loadOffer(
  offerId
) {

  const encodedId =
    encodeURIComponent(
      offerId
    );

  const rows =
    await supabaseRequest(
      `offers?id=eq.${encodedId}&select=id,status,starts_at,ends_at,redemption_type,partner_url,promo_code,views_count,max_redemptions,redemptions_count&limit=1`
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
   VALIDATE ACTIVE OFFER
========================================================= */

function validateOffer(
  offer
) {

  if (
    !offer
  ) {

    return {
      valid:
        false,

      reason:
        "Offer not found."
    };

  }

  if (
    offer.status !== "active"
  ) {

    return {
      valid:
        false,

      reason:
        "Offer is not active."
    };

  }

  if (
    offer.redemption_type !== "online"
  ) {

    return {
      valid:
        false,

      reason:
        "This is not an online offer."
    };

  }

  const now =
    Date.now();

  const start =
    new Date(
      offer.starts_at
    ).getTime();

  const end =
    new Date(
      offer.ends_at
    ).getTime();

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end)
  ) {

    return {
      valid:
        false,

      reason:
        "Offer dates are invalid."
    };

  }

  if (
    now < start
  ) {

    return {
      valid:
        false,

      reason:
        "Offer has not started yet."
    };

  }

  if (
    now > end
  ) {

    return {
      valid:
        false,

      reason:
        "Offer has expired."
    };

  }

  const maximum =
    offer.max_redemptions === null
      ? null
      : Number(
          offer.max_redemptions
        );

  const redeemed =
    Number(
      offer.redemptions_count || 0
    );

  if (
    maximum !== null &&
    Number.isFinite(maximum) &&
    maximum > 0 &&
    redeemed >= maximum
  ) {

    return {
      valid:
        false,

      reason:
        "No vouchers remain."
    };

  }

  const partnerUrl =
    normalizePartnerUrl(
      offer.partner_url
    );

  if (
    !partnerUrl
  ) {

    return {
      valid:
        false,

      reason:
        "Partner website is unavailable."
    };

  }

  return {
    valid:
      true,

    partnerUrl
  };

}

/* =========================================================
   CLICK TRACKING
========================================================= */

async function registerTrackedClick(
  offer
) {

  /*
  Current database already has views_count.

  For this stage we use it as the server-side count of
  tracked "Use Offer" actions.

  This is NOT a redemption counter.

  redemptions_count stays unchanged.

  Later we can split analytics into:
  - card views
  - clicks
  - claims
  - redeemed purchases
  once the dedicated analytics table is added.
  */

  const current =
    Math.max(
      0,
      Number(
        offer.views_count || 0
      )
    );

  const next =
    current + 1;

  const encodedId =
    encodeURIComponent(
      offer.id
    );

  await supabaseRequest(
    `offers?id=eq.${encodedId}`,
    {

      method:
        "PATCH",

      headers: {
        Prefer:
          "return=minimal"
      },

      body: {
        views_count:
          next
      }

    }
  );

}

/* =========================================================
   ADD PETS & DOGUE PARAMETERS
========================================================= */

function buildDestinationUrl(
  partnerUrl,
  offer
) {

  const url =
    new URL(
      partnerUrl
    );

  /*
  These parameters let compatible partner websites
  identify PETS & DOGUE traffic.

  Existing partner parameters are preserved.
  */

  if (
    !url.searchParams.has(
      "utm_source"
    )
  ) {

    url.searchParams.set(
      "utm_source",
      "petsanddogue"
    );

  }

  if (
    !url.searchParams.has(
      "utm_medium"
    )
  ) {

    url.searchParams.set(
      "utm_medium",
      "club_offer"
    );

  }

  if (
    !url.searchParams.has(
      "utm_campaign"
    )
  ) {

    url.searchParams.set(
      "utm_campaign",
      `offer_${offer.id}`
    );

  }

  if (
    !url.searchParams.has(
      "pd_offer"
    )
  ) {

    url.searchParams.set(
      "pd_offer",
      offer.id
    );

  }

  /*
  Promo code is added as a URL parameter.

  A compatible partner checkout can automatically
  read this value.

  If the partner does not support automatic code
  application, the member can still use the visible
  PETS & DOGUE promo code.
  */

  if (
    offer.promo_code &&
    !url.searchParams.has(
      "pd_code"
    )
  ) {

    url.searchParams.set(
      "pd_code",
      String(
        offer.promo_code
      )
    );

  }

  return url
    .toString();

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
      "PETS & DOGUE use-offer: Supabase configuration is missing."
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

  /* =======================================================
     OFFER ID
  ======================================================= */

  const offerId =
    cleanString(
      req.query?.id,
      100
    );

  if (
    !offerId ||
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
          "Invalid offer."
      }
    );

  }

  /* =======================================================
     LOAD + CHECK OFFER
  ======================================================= */

  try {

    const offer =
      await loadOffer(
        offerId
      );

    const check =
      validateOffer(
        offer
      );

    if (
      !check.valid
    ) {

      return sendJson(
        res,
        404,
        {
          ok:
            false,

          error:
            check.reason
        }
      );

    }

    /* =====================================================
       TRACK CLICK

       Tracking failure should NOT prevent a legitimate
       customer from reaching the partner.
    ===================================================== */

    try {

      await registerTrackedClick(
        offer
      );

    } catch (
      trackingError
    ) {

      console.error(
        "PETS & DOGUE offer tracking error:",
        trackingError
      );

    }

    /* =====================================================
       REDIRECT
    ===================================================== */

    const destination =
      buildDestinationUrl(
        check.partnerUrl,
        offer
      );

    return redirect(
      res,
      destination
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE use-offer error:",
      error
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Unable to open this offer."
      }
    );

  }

};
