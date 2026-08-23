"use strict";

/*
=========================================================
PETS & DOGUE
CREATE PARTNER OFFER
=========================================================

Server rules:

- Discount: 1% — 99%
- Available vouchers: 1 — 1,000,000
- PETS & DOGUE commission: fixed 1%
- Partner CANNOT modify commission
- One voucher per subscriber
- Final promo code generated server-side
- New offers enter moderation as "pending"
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

const FIXED_COMMISSION_PERCENT = 1;

const MIN_DISCOUNT_PERCENT = 1;
const MAX_DISCOUNT_PERCENT = 99;

const MIN_VOUCHERS = 1;
const MAX_VOUCHERS = 1000000;

const VALID_REDEMPTION_TYPES =
  new Set([
    "online",
    "offline"
  ]);

const CATEGORY_MAP = {

  "0": "veterinary",
  "1": "grooming",
  "2": "pet_food",
  "3": "pet_shop",
  "4": "travel",
  "5": "pet_friendly",
  "6": "training",
  "7": "accessories",
  "8": "insurance",
  "9": "photography",
  "10": "experiences",
  "11": "other",

  veterinary: "veterinary",
  grooming: "grooming",
  pet_food: "pet_food",
  pet_shop: "pet_shop",
  travel: "travel",
  pet_friendly: "pet_friendly",
  training: "training",
  accessories: "accessories",
  insurance: "insurance",
  photography: "photography",
  experiences: "experiences",
  other: "other"

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
    "no-store, max-age=0"
  );

  res.end(
    JSON.stringify(payload)
  );

}

/* =========================================================
   INPUT HELPERS
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

function cleanEmail(
  value
) {

  return cleanString(
    value,
    254
  ).toLowerCase();

}

function isValidEmail(
  value
) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(
      String(value || "")
    );

}

function cleanNumber(
  value,
  fallback = 0
) {

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;

}

function clampInteger(
  value,
  min,
  max,
  fallback
) {

  const number =
    Math.round(
      cleanNumber(
        value,
        fallback
      )
    );

  return Math.min(
    max,
    Math.max(
      min,
      number
    )
  );

}

/* =========================================================
   REQUEST BODY
========================================================= */

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
    const chunk of req
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

/* =========================================================
   SUPABASE
========================================================= */

async function supabaseRequest(
  path,
  options = {}
) {

  const headers = {

    apikey:
      SUPABASE_SECRET_KEY,

    Authorization:
      `Bearer ${SUPABASE_SECRET_KEY}`,

    "Content-Type":
      "application/json",

    ...options.headers

  };

  const response =
    await fetch(
      `${SUPABASE_URL}/rest/v1/${path}`,
      {
        method:
          options.method || "GET",

        headers,

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

    const message =
      data?.message ||
      data?.hint ||
      data?.details ||
      `Supabase request failed with status ${response.status}.`;

    const error =
      new Error(
        message
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
   PARTNER
========================================================= */

async function findPartnerByEmail(
  email
) {

  const encodedEmail =
    encodeURIComponent(
      email
    );

  const rows =
    await supabaseRequest(
      `partners?email=eq.${encodedEmail}&select=id,business_name,email,status&limit=1`
    );

  if (
    Array.isArray(rows) &&
    rows.length
  ) {

    return rows[0];
  }

  return null;

}

async function createPartner(
  account
) {

  const created =
    await supabaseRequest(
      "partners",
      {
        method:
          "POST",

        headers: {
          Prefer:
            "return=representation"
        },

        body: [
          {

            business_name:
              account.businessName,

            business_type:
              account.businessType || null,

            contact_name:
              account.contactName || null,

            email:
              account.email,

            country:
              account.country || null,

            website:
              account.website || null,

            address:
              account.address || null,

            status:
              "pending"

          }
        ]
      }
    );

  if (
    !Array.isArray(created) ||
    !created[0]?.id
  ) {

    throw new Error(
      "Unable to create partner account."
    );
  }

  return created[0];

}

async function getOrCreatePartner(
  account
) {

  const existing =
    await findPartnerByEmail(
      account.email
    );

  if (
    existing
  ) {

    return existing;
  }

  try {

    return await createPartner(
      account
    );

  } catch (
    error
  ) {

    if (
      Number(
        error.status
      ) === 409
    ) {

      const retry =
        await findPartnerByEmail(
          account.email
        );

      if (
        retry
      ) {

        return retry;
      }

    }

    throw error;
  }

}

/* =========================================================
   DISCOUNT
========================================================= */

function parseDiscountPercent(
  value
) {

  /*
  Accepted examples:

  20
  "20"
  "20%"
  "-20%"
  */

  const raw =
    String(
      value ?? ""
    )
      .trim()
      .replace(
        "%",
        ""
      )
      .replace(
        "-",
        ""
      );

  const number =
    Number(
      raw
    );

  if (
    !Number.isFinite(number)
  ) {

    return null;
  }

  const rounded =
    Math.round(
      number
    );

  if (
    rounded <
      MIN_DISCOUNT_PERCENT ||
    rounded >
      MAX_DISCOUNT_PERCENT
  ) {

    return null;
  }

  return rounded;

}

/* =========================================================
   PROMO CODE
========================================================= */

function randomCharacters(
  length
) {

  const alphabet =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let output = "";

  for (
    let index = 0;
    index < length;
    index++
  ) {

    const position =
      Math.floor(
        Math.random() *
        alphabet.length
      );

    output +=
      alphabet[position];

  }

  return output;

}

function generatePromoCode() {

  return `DOGUE-${randomCharacters(6)}`;

}

async function promoCodeExists(
  code
) {

  const encoded =
    encodeURIComponent(
      code
    );

  const rows =
    await supabaseRequest(
      `offers?promo_code=eq.${encoded}&select=id&limit=1`
    );

  return (
    Array.isArray(rows) &&
    rows.length > 0
  );

}

async function generateUniquePromoCode() {

  for (
    let attempt = 0;
    attempt < 12;
    attempt++
  ) {

    const code =
      generatePromoCode();

    const exists =
      await promoCodeExists(
        code
      );

    if (
      !exists
    ) {

      return code;
    }

  }

  return `DOGUE-${Date.now()
    .toString(36)
    .toUpperCase()
    .slice(-8)}`;

}

/* =========================================================
   IMAGE
========================================================= */

function cleanImage(
  value
) {

  const image =
    cleanString(
      value,
      1600000
    );

  if (
    !image
  ) {

    return null;
  }

  if (
    image.startsWith(
      "https://"
    )
  ) {

    return image;
  }

  if (
    /^data:image\/(jpeg|jpg|png|webp);base64,/i
      .test(
        image
      )
  ) {

    if (
      image.length >
      1500000
    ) {

      throw new Error(
        "Offer image is too large."
      );
    }

    return image;
  }

  throw new Error(
    "Invalid offer image."
  );

}

/* =========================================================
   DATE
========================================================= */

function normalizeDate(
  value,
  endOfDay = false
) {

  const raw =
    cleanString(
      value,
      40
    );

  if (
    !raw
  ) {

    return null;
  }

  let date;

  if (
    /^\d{4}-\d{2}-\d{2}$/
      .test(
        raw
      )
  ) {

    date =
      new Date(
        `${raw}${
          endOfDay
            ? "T23:59:59.999Z"
            : "T00:00:00.000Z"
        }`
      );

  } else {

    date =
      new Date(
        raw
      );

  }

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return null;
  }

  return date
    .toISOString();

}

/* =========================================================
   URL
========================================================= */

function normalizeHttpsUrl(
  value
) {

  const raw =
    cleanString(
      value,
      1200
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
   HANDLER
========================================================= */

module.exports =
async function handler(
  req,
  res
) {

  if (
    req.method !== "POST"
  ) {

    res.setHeader(
      "Allow",
      "POST"
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
      "PETS & DOGUE Supabase environment variables are missing."
    );

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          "Database connection is not configured."
      }
    );

  }

  let body;

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
          "Invalid request."
      }
    );

  }

  /* =======================================================
     PARTNER
  ======================================================= */

  const businessName =
    cleanString(
      body.businessName,
      200
    );

  const businessType =
    cleanString(
      body.businessType,
      100
    );

  const contactName =
    cleanString(
      body.contactName,
      150
    );

  const partnerEmail =
    cleanEmail(
      body.partnerEmail
    );

  const country =
    cleanString(
      body.country,
      100
    );

  const website =
    normalizeHttpsUrl(
      body.website
    );

  const address =
    cleanString(
      body.address,
      500
    );

  if (
    !businessName
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "Business name is required."
      }
    );

  }

  if (
    !isValidEmail(
      partnerEmail
    )
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "A valid partner email is required."
      }
    );

  }

  /* =======================================================
     OFFER
  ======================================================= */

  const externalId =
    cleanString(
      body.externalId,
      150
    );

  const category =
    CATEGORY_MAP[
      cleanString(
        body.category,
        50
      )
    ] || "other";

  const title =
    cleanString(
      body.title,
      220
    );

  const description =
    cleanString(
      body.description,
      1500
    );

  const discountPercent =
    parseDiscountPercent(
      body.discount
    );

  const savingText =
    cleanString(
      body.saving,
      100
    );

  const redemptionType =
    cleanString(
      body.redemptionType,
      30
    ).toLowerCase();

  const partnerUrl =
    normalizeHttpsUrl(
      body.partnerUrl
    );

  const offlineInstructions =
    cleanString(
      body.offlineInstructions,
      1500
    );

  const startsAt =
    normalizeDate(
      body.start,
      false
    );

  const endsAt =
    normalizeDate(
      body.end,
      true
    );

  const maxRedemptions =
    clampInteger(
      body.maxRedemptions,
      MIN_VOUCHERS,
      MAX_VOUCHERS,
      500
    );

  /*
  SECURITY:

  We intentionally DO NOT use:

  body.commissionPercent

  The browser cannot determine the commission.
  PETS & DOGUE controls this value here.
  */

  const commissionPercent =
    FIXED_COMMISSION_PERCENT;

  /* =======================================================
     VALIDATION
  ======================================================= */

  if (
    !title
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "Offer title is required."
      }
    );

  }

  if (
    discountPercent === null
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "Discount must be between 1% and 99%."
      }
    );

  }

  if (
    !VALID_REDEMPTION_TYPES.has(
      redemptionType
    )
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "Invalid redemption type."
      }
    );

  }

  if (
    !startsAt ||
    !endsAt
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "Valid offer dates are required."
      }
    );

  }

  if (
    new Date(
      endsAt
    ).getTime() <=
    new Date(
      startsAt
    ).getTime()
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "Offer end date must be after the start date."
      }
    );

  }

  if (
    redemptionType === "online" &&
    !partnerUrl
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          "A valid partner website is required for an online offer."
      }
    );

  }

  let imageUrl = null;

  try {

    imageUrl =
      cleanImage(
        body.image
      );

  } catch (
    error
  ) {

    return sendJson(
      res,
      400,
      {
        ok:
          false,

        error:
          error.message
      }
    );

  }

  /* =======================================================
     CREATE PARTNER + OFFER
  ======================================================= */

  try {

    const partner =
      await getOrCreatePartner(
        {
          businessName,
          businessType,
          contactName,
          email:
            partnerEmail,
          country,
          website,
          address
        }
      );

    const promoCode =
      await generateUniquePromoCode();

    const discountText =
      `-${discountPercent}%`;

    const offerRows =
      await supabaseRequest(
        "offers",
        {
          method:
            "POST",

          headers: {
            Prefer:
              "return=representation"
          },

          body: [
            {

              partner_id:
                partner.id,

              external_id:
                externalId || null,

              business_name:
                businessName,

              partner_email:
                partnerEmail,

              category,

              title,

              description:
                description || null,

              discount_text:
                discountText,

              saving_text:
                savingText || null,

              promo_code:
                promoCode,

              redemption_type:
                redemptionType,

              partner_url:
                redemptionType === "online"
                  ? partnerUrl
                  : null,

              offline_instructions:
                redemptionType === "offline"
                  ? offlineInstructions || null
                  : null,

              image_url:
                imageUrl,

              starts_at:
                startsAt,

              ends_at:
                endsAt,

              max_redemptions:
                maxRedemptions,

              commission_percent:
                commissionPercent,

              one_use_per_subscriber:
                true,

              access_scope:
                "all_subscribers",

              status:
                "pending"

            }
          ]
        }
      );

    if (
      !Array.isArray(
        offerRows
      ) ||
      !offerRows[0]?.id
    ) {

      throw new Error(
        "Offer was not saved."
      );
    }

    const offer =
      offerRows[0];

    return sendJson(
      res,
      200,
      {

        ok:
          true,

        offer: {

          id:
            offer.id,

          externalId:
            offer.external_id,

          partnerId:
            offer.partner_id,

          businessName:
            offer.business_name,

          category:
            offer.category,

          title:
            offer.title,

          description:
            offer.description,

          discount:
            offer.discount_text,

          discountPercent,

          saving:
            offer.saving_text,

          promoCode:
            offer.promo_code,

          redemptionType:
            offer.redemption_type,

          partnerUrl:
            offer.partner_url,

          startsAt:
            offer.starts_at,

          endsAt:
            offer.ends_at,

          maxRedemptions:
            offer.max_redemptions,

          commissionPercent:
            FIXED_COMMISSION_PERCENT,

          oneUsePerSubscriber:
            true,

          accessScope:
            "all_subscribers",

          status:
            offer.status,

          createdAt:
            offer.created_at

        }

      }
    );

  } catch (
    error
  ) {

    console.error(
      "PETS & DOGUE create partner offer error:",
      error
    );

    if (
      Number(
        error.status
      ) === 409
    ) {

      return sendJson(
        res,
        409,
        {
          ok:
            false,

          error:
            "This offer has already been submitted."
        }
      );

    }

    return sendJson(
      res,
      500,
      {
        ok:
          false,

        error:
          error?.message ||
          "Unable to save the offer."
      }
    );

  }

};
