const crypto = require("crypto");

/* =========================================================
   PETS & DOGUE
   PARTNER SPECIAL OFFER API

   Flow:
   Advertiser form
   → server validation
   → upload images
   → calculate real placement number
   → 1st / every 10th FREE
   → otherwise £5 Stripe Checkout
   → store submission
   → moderation after payment/free submission
========================================================= */

const SUPABASE_URL =
  String(process.env.SUPABASE_URL || "")
    .trim()
    .replace(/\/+$/, "");

const SUPABASE_KEY =
  String(
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  ).trim();

const STRIPE_SECRET_KEY =
  String(
    process.env.STRIPE_SECRET_KEY || ""
  ).trim();

const STORAGE_BUCKET =
  "partner-offer-images";

const MAX_BODY_BYTES =
  16 * 1024 * 1024;

const MAX_IMAGE_BYTES =
  5 * 1024 * 1024;

const MAX_IMAGES = 3;

const STANDARD_PRICE_PENCE = 500;

const ALLOWED_IMAGE_TYPES =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp"
  ]);

/* =========================================================
   RESPONSE
========================================================= */

function sendJson(
  response,
  status,
  payload
) {

  response.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  response.setHeader(
    "Cache-Control",
    "no-store"
  );

  response.status(status).json(payload);

}

/* =========================================================
   STRINGS
========================================================= */

function cleanString(
  value,
  maxLength = 500
) {

  return String(value || "")
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);

}

function normalizeEmail(value) {

  return cleanString(
    value,
    254
  ).toLowerCase();

}

function validEmail(value) {

  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  ).test(value);

}

function normalizeUrl(value) {

  const raw =
    cleanString(
      value,
      1000
    );

  if (!raw) {
    return "";
  }

  let parsed;

  try {

    parsed =
      new URL(raw);

  } catch (error) {

    try {

      parsed =
        new URL(
          "https://" + raw
        );

    } catch (secondError) {

      return "";

    }

  }

  if (
    parsed.protocol !== "https:" &&
    parsed.protocol !== "http:"
  ) {

    return "";

  }

  return parsed.toString();

}

/* =========================================================
   DATE
========================================================= */

function validDateString(value) {

  return (
    /^\d{4}-\d{2}-\d{2}$/
  ).test(value);

}

function parseDate(value) {

  if (!validDateString(value)) {
    return null;
  }

  const date =
    new Date(
      value + "T00:00:00.000Z"
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return null;

  }

  return date;

}

/* =========================================================
   BOOLEAN / NUMBER
========================================================= */

function parseBoolean(value) {

  return (
    String(value)
      .toLowerCase() ===
    "true"
  );

}

function parsePositiveInteger(
  value
) {

  const text =
    cleanString(
      value,
      20
    );

  if (!text) {
    return null;
  }

  const number =
    Number(text);

  if (
    !Number.isInteger(number) ||
    number < 1 ||
    number > 1000000
  ) {

    return null;

  }

  return number;

}

/* =========================================================
   REQUEST BODY
========================================================= */

async function readRawBody(
  request
) {

  const chunks = [];

  let total = 0;

  for await (
    const chunk of request
  ) {

    const buffer =
      Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(chunk);

    total +=
      buffer.length;

    if (
      total >
      MAX_BODY_BYTES
    ) {

      const error =
        new Error(
          "Upload is too large."
        );

      error.statusCode = 413;

      throw error;

    }

    chunks.push(buffer);

  }

  return Buffer.concat(
    chunks
  );

}

/* =========================================================
   MULTIPART PARSER
========================================================= */

function getBoundary(
  contentType
) {

  const match =
    String(contentType || "")
      .match(
        /boundary=(?:"([^"]+)"|([^;]+))/i
      );

  return (
    match?.[1] ||
    match?.[2] ||
    ""
  ).trim();

}

function parseContentDisposition(
  value
) {

  const nameMatch =
    value.match(
      /name="([^"]*)"/i
    );

  const fileMatch =
    value.match(
      /filename="([^"]*)"/i
    );

  return {

    name:
      nameMatch
        ? nameMatch[1]
        : "",

    filename:
      fileMatch
        ? fileMatch[1]
        : ""

  };

}

function parseMultipart(
  buffer,
  boundary
) {

  const fields = {};

  const files = [];

  const boundaryBuffer =
    Buffer.from(
      "--" + boundary
    );

  const headerSeparator =
    Buffer.from(
      "\r\n\r\n"
    );

  let cursor = 0;

  while (true) {

    let start =
      buffer.indexOf(
        boundaryBuffer,
        cursor
      );

    if (start === -1) {
      break;
    }

    start +=
      boundaryBuffer.length;

    if (
      buffer
        .slice(
          start,
          start + 2
        )
        .toString() ===
      "--"
    ) {

      break;

    }

    if (
      buffer
        .slice(
          start,
          start + 2
        )
        .toString() ===
      "\r\n"
    ) {

      start += 2;

    }

    const headerEnd =
      buffer.indexOf(
        headerSeparator,
        start
      );

    if (headerEnd === -1) {
      break;
    }

    const headerText =
      buffer
        .slice(
          start,
          headerEnd
        )
        .toString(
          "utf8"
        );

    const nextBoundary =
      buffer.indexOf(
        boundaryBuffer,
        headerEnd + 4
      );

    if (
      nextBoundary === -1
    ) {

      break;

    }

    let bodyEnd =
      nextBoundary;

    if (
      buffer
        .slice(
          bodyEnd - 2,
          bodyEnd
        )
        .toString() ===
      "\r\n"
    ) {

      bodyEnd -= 2;

    }

    const content =
      buffer.slice(
        headerEnd + 4,
        bodyEnd
      );

    const headers = {};

    headerText
      .split("\r\n")
      .forEach(line => {

        const separator =
          line.indexOf(":");

        if (
          separator === -1
        ) {

          return;

        }

        const key =
          line
            .slice(
              0,
              separator
            )
            .trim()
            .toLowerCase();

        const value =
          line
            .slice(
              separator + 1
            )
            .trim();

        headers[key] =
          value;

      });

    const disposition =
      parseContentDisposition(
        headers[
          "content-disposition"
        ] || ""
      );

    if (
      !disposition.name
    ) {

      cursor =
        nextBoundary;

      continue;

    }

    if (
      disposition.filename
    ) {

      files.push({

        fieldName:
          disposition.name,

        filename:
          disposition.filename,

        contentType:
          cleanString(
            headers[
              "content-type"
            ],
            100
          ).toLowerCase(),

        data:
          content

      });

    } else {

      fields[
        disposition.name
      ] =
        content.toString(
          "utf8"
        );

    }

    cursor =
      nextBoundary;

  }

  return {
    fields,
    files
  };

}

/* =========================================================
   IMAGE VALIDATION
========================================================= */

function extensionForType(
  contentType
) {

  if (
    contentType ===
    "image/jpeg"
  ) {

    return "jpg";

  }

  if (
    contentType ===
    "image/png"
  ) {

    return "png";

  }

  if (
    contentType ===
    "image/webp"
  ) {

    return "webp";

  }

  return "";

}

function looksLikeImage(
  file
) {

  const data =
    file.data;

  if (
    !Buffer.isBuffer(data) ||
    data.length < 12
  ) {

    return false;

  }

  if (
    file.contentType ===
    "image/jpeg"
  ) {

    return (
      data[0] === 0xff &&
      data[1] === 0xd8 &&
      data[
        data.length - 2
      ] === 0xff &&
      data[
        data.length - 1
      ] === 0xd9
    );

  }

  if (
    file.contentType ===
    "image/png"
  ) {

    return (
      data
        .slice(0, 8)
        .equals(
          Buffer.from([
            0x89,
            0x50,
            0x4e,
            0x47,
            0x0d,
            0x0a,
            0x1a,
            0x0a
          ])
        )
    );

  }

  if (
    file.contentType ===
    "image/webp"
  ) {

    return (
      data
        .slice(0, 4)
        .toString() ===
      "RIFF" &&
      data
        .slice(8, 12)
        .toString() ===
      "WEBP"
    );

  }

  return false;

}

/* =========================================================
   SUPABASE
========================================================= */

function requireSupabase() {

  if (
    !SUPABASE_URL ||
    !SUPABASE_KEY
  ) {

    const error =
      new Error(
        "PETS & DOGUE database is not configured."
      );

    error.statusCode = 500;

    throw error;

  }

}

async function supabaseFetch(
  path,
  options = {}
) {

  requireSupabase();

  const headers = {

    apikey:
      SUPABASE_KEY,

    Authorization:
      "Bearer " +
      SUPABASE_KEY,

    ...(
      options.headers ||
      {}
    )

  };

  const response =
    await fetch(
      SUPABASE_URL + path,
      {
        ...options,
        headers
      }
    );

  return response;

}

/* =========================================================
   ADVERTISER IDENTITY

   Temporary server-side business identity until the
   full Partner Account authentication is connected.

   UK company number is preferred.
   Otherwise legal/business name + verified email are used.
========================================================= */

function advertiserKey({
  companyNumber,
  legalName,
  businessName,
  businessEmail
}) {

  const company =
    cleanString(
      companyNumber,
      20
    )
      .toUpperCase()
      .replace(
        /[^A-Z0-9]/g,
        ""
      );

  const source =
    company
      ? "UKCOMPANY:" +
        company
      :
        "EMAILBUSINESS:" +
        normalizeEmail(
          businessEmail
        ) +
        "|" +
        cleanString(
          legalName ||
          businessName,
          160
        ).toLowerCase();

  return crypto
    .createHash("sha256")
    .update(source)
    .digest("hex");

}

/* =========================================================
   REAL PLACEMENT HISTORY
========================================================= */

async function countQualifyingPlacements(
  key
) {

  const query =
    new URLSearchParams();

  query.set(
    "select",
    "id"
  );

  query.set(
    "advertiser_key",
    "eq." + key
  );

  query.set(
    "payment_status",
    "in.(free,paid)"
  );

  query.set(
    "status",
    "not.in.(cancelled,rejected)"
  );

  const response =
    await supabaseFetch(
      "/rest/v1/partner_offer_submissions?" +
      query.toString(),
      {
        method:"GET",

        headers:{
          Prefer:
            "count=exact",

          Range:
            "0-0"
        }
      }
    );

  if (
    !response.ok
  ) {

    const detail =
      await response.text();

    throw new Error(
      "Unable to calculate placement history. " +
      detail.slice(0, 200)
    );

  }

  const contentRange =
    response.headers.get(
      "content-range"
    ) || "";

  const totalText =
    contentRange
      .split("/")
      .pop();

  const total =
    Number(totalText);

  return (
    Number.isFinite(total)
      ? total
      : 0
  );

}

function calculatePlacement(
  previousCount
) {

  const placementNumber =
    Number(previousCount) + 1;

  const isFree =
    placementNumber === 1 ||
    placementNumber % 10 === 0;

  return {

    placementNumber,

    isFree,

    amountPence:
      isFree
        ? 0
        : STANDARD_PRICE_PENCE

  };

}

/* =========================================================
   STORAGE
========================================================= */

async function uploadImage(
  submissionId,
  file,
  index
) {

  if (
    !ALLOWED_IMAGE_TYPES.has(
      file.contentType
    )
  ) {

    const error =
      new Error(
        "Unsupported image type."
      );

    error.statusCode = 400;

    throw error;

  }

  if (
    !looksLikeImage(file)
  ) {

    const error =
      new Error(
        "Invalid image file."
      );

    error.statusCode = 400;

    throw error;

  }

  if (
    file.data.length >
    MAX_IMAGE_BYTES
  ) {

    const error =
      new Error(
        "Each image must be 5 MB or smaller."
      );

    error.statusCode = 413;

    throw error;

  }

  const extension =
    extensionForType(
      file.contentType
    );

  const objectPath =
    submissionId +
    "/" +
    String(index + 1) +
    "-" +
    crypto
      .randomBytes(8)
      .toString("hex") +
    "." +
    extension;

  const response =
    await supabaseFetch(
      "/storage/v1/object/" +
      STORAGE_BUCKET +
      "/" +
      objectPath,
      {
        method:"POST",

        headers:{
          "Content-Type":
            file.contentType,

          "x-upsert":
            "false"
        },

        body:
          file.data
      }
    );

  if (
    !response.ok
  ) {

    const detail =
      await response.text();

    throw new Error(
      "Unable to upload image. " +
      detail.slice(0, 200)
    );

  }

  return {

    path:
      objectPath,

    url:
      SUPABASE_URL +
      "/storage/v1/object/public/" +
      STORAGE_BUCKET +
      "/" +
      objectPath

  };

}

async function removeUploadedImages(
  paths
) {

  if (
    !Array.isArray(paths) ||
    paths.length === 0
  ) {

    return;

  }

  try {

    await supabaseFetch(
      "/storage/v1/object/" +
      STORAGE_BUCKET,
      {
        method:"DELETE",

        headers:{
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify({
            prefixes:
              paths
          })
      }
    );

  } catch (error) {

    console.error(
      "PETS & DOGUE image cleanup error:",
      error
    );

  }

} /* =========================================================
   DATABASE INSERT
========================================================= */

async function createSubmission(
  record
) {

  const response =
    await supabaseFetch(
      "/rest/v1/partner_offer_submissions",
      {
        method:"POST",

        headers:{
          "Content-Type":
            "application/json",

          Prefer:
            "return=representation"
        },

        body:
          JSON.stringify(
            record
          )
      }
    );

  const text =
    await response.text();

  let data = [];

  try {

    data =
      text
        ? JSON.parse(text)
        : [];

  } catch (error) {

    data = [];

  }

  if (
    !response.ok
  ) {

    throw new Error(
      "Unable to save offer submission. " +
      text.slice(0, 300)
    );

  }

  return (
    Array.isArray(data)
      ? data[0]
      : data
  );

}

async function updateSubmission(
  id,
  values
) {

  const query =
    new URLSearchParams({
      id:
        "eq." + id
    });

  const response =
    await supabaseFetch(
      "/rest/v1/partner_offer_submissions?" +
      query.toString(),
      {
        method:"PATCH",

        headers:{
          "Content-Type":
            "application/json",

          Prefer:
            "return=minimal"
        },

        body:
          JSON.stringify(values)
      }
    );

  if (
    !response.ok
  ) {

    const detail =
      await response.text();

    throw new Error(
      "Unable to update submission. " +
      detail.slice(0, 200)
    );

  }

}

/* =========================================================
   STRIPE
========================================================= */

function requireStripe() {

  if (
    !STRIPE_SECRET_KEY
  ) {

    const error =
      new Error(
        "Payment system is not configured."
      );

    error.statusCode = 500;

    throw error;

  }

}

function requestOrigin(
  request
) {

  const forwardedProto =
    cleanString(
      request.headers[
        "x-forwarded-proto"
      ],
      20
    );

  const protocol =
    forwardedProto ||
    "https";

  const forwardedHost =
    cleanString(
      request.headers[
        "x-forwarded-host"
      ],
      300
    );

  const host =
    forwardedHost ||
    cleanString(
      request.headers.host,
      300
    );

  if (!host) {

    return (
      "https://www.petsanddogue.com"
    );

  }

  return (
    protocol +
    "://" +
    host
  );

}

async function createStripeCheckout({
  request,
  submissionId,
  businessName,
  businessEmail,
  offerTitle,
  placementNumber
}) {

  requireStripe();

  const origin =
    requestOrigin(
      request
    );

  const params =
    new URLSearchParams();

  params.set(
    "mode",
    "payment"
  );

  params.set(
    "customer_creation",
    "always"
  );

  params.set(
    "customer_email",
    businessEmail
  );

  params.set(
    "billing_address_collection",
    "required"
  );

  params.set(
    "invoice_creation[enabled]",
    "true"
  );

  params.set(
    "line_items[0][quantity]",
    "1"
  );

  params.set(
    "line_items[0][price_data][currency]",
    "gbp"
  );

  params.set(
    "line_items[0][price_data][unit_amount]",
    String(
      STANDARD_PRICE_PENCE
    )
  );

  params.set(
    "line_items[0][price_data][product_data][name]",
    "PETS & DOGUE Special Offer Placement"
  );

  params.set(
    "line_items[0][price_data][product_data][description]",
    "Special offer placement #" +
    placementNumber +
    " · " +
    offerTitle
  );

  params.set(
    "metadata[service]",
    "partner_special_offer"
  );

  params.set(
    "metadata[submission_id]",
    submissionId
  );

  params.set(
    "metadata[placement_number]",
    String(
      placementNumber
    )
  );

  params.set(
    "metadata[business_name]",
    businessName.slice(
      0,
      500
    )
  );

  params.set(
    "payment_intent_data[metadata][service]",
    "partner_special_offer"
  );

  params.set(
    "payment_intent_data[metadata][submission_id]",
    submissionId
  );

  params.set(
    "payment_intent_data[metadata][placement_number]",
    String(
      placementNumber
    )
  );

  params.set(
    "success_url",
    origin +
    "/partner-offer-success.html?session_id={CHECKOUT_SESSION_ID}"
  );

  params.set(
    "cancel_url",
    origin +
    "/partner-special-offer.html?payment=cancelled&ref=" +
    encodeURIComponent(
      submissionId
    )
  );

  const response =
    await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method:"POST",

        headers:{
          Authorization:
            "Bearer " +
            STRIPE_SECRET_KEY,

          "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body:
          params.toString()
      }
    );

  const data =
    await response.json()
      .catch(
        () => ({})
      );

  if (
    !response.ok ||
    !data.id ||
    !data.url
  ) {

    console.error(
      "PETS & DOGUE Stripe Checkout error:",
      data
    );

    const error =
      new Error(
        data?.error?.message ||
        "Unable to create secure payment."
      );

    error.statusCode = 502;

    throw error;

  }

  return data;

}

/* =========================================================
   MAIN
========================================================= */

module.exports =
async function handler(
  request,
  response
) {

  if (
    request.method !==
    "POST"
  ) {

    response.setHeader(
      "Allow",
      "POST"
    );

    return sendJson(
      response,
      405,
      {
        ok:false,
        error:
          "Method not allowed."
      }
    );

  }

  let uploadedPaths = [];

  let submissionId = "";

  try {

    requireSupabase();

    const contentType =
      cleanString(
        request.headers[
          "content-type"
        ],
        500
      );

    if (
      !contentType
        .toLowerCase()
        .startsWith(
          "multipart/form-data"
        )
    ) {

      return sendJson(
        response,
        415,
        {
          ok:false,
          error:
            "Expected multipart form data."
        }
      );

    }

    const boundary =
      getBoundary(
        contentType
      );

    if (!boundary) {

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "Invalid form upload."
        }
      );

    }

    const rawBody =
      await readRawBody(
        request
      );

    const parsed =
      parseMultipart(
        rawBody,
        boundary
      );

    const fields =
      parsed.fields;

    const incomingImages =
      parsed.files
        .filter(
          file =>
            /^photo[1-3]$/
              .test(
                file.fieldName
              )
        )
        .slice(
          0,
          MAX_IMAGES
        );

    if (
      parsed.files.length >
      MAX_IMAGES
    ) {

      const error =
        new Error(
          "Maximum 3 images are allowed."
        );

      error.statusCode = 400;

      throw error;

    }

    /* =====================================================
       BUSINESS
    ===================================================== */

    const businessName =
      cleanString(
        fields.businessName,
        120
      );

    const legalName =
      cleanString(
        fields.legalName,
        160
      );

    const companyNumber =
      cleanString(
        fields.companyNumber,
        20
      )
        .toUpperCase();

    const businessEmail =
      normalizeEmail(
        fields.businessEmail
      );

    const phone =
      cleanString(
        fields.phone,
        60
      );

    const website =
      normalizeUrl(
        fields.website
      );

    const billingAddress =
      cleanString(
        fields.billingAddress,
        500
      );

    /* =====================================================
       OFFER
    ===================================================== */

    const redemptionType =
      cleanString(
        fields.redemptionType,
        20
      )
        .toLowerCase();

    const offerTitle =
      cleanString(
        fields.offerTitle,
        90
      );

    const discount =
      cleanString(
        fields.discount,
        50
      );

    const category =
      cleanString(
        fields.category,
        80
      );

    const city =
      cleanString(
        fields.city,
        100
      );

    const startDateText =
      cleanString(
        fields.startDate,
        10
      );

    const endDateText =
      cleanString(
        fields.endDate,
        10
      );

    const description =
      cleanString(
        fields.description,
        650
      );

    const termsText =
      cleanString(
        fields.terms,
        650
      );

    const promoCode =
      cleanString(
        fields.promoCode,
        40
      );

    const maxRedemptions =
      parsePositiveInteger(
        fields.maxRedemptions
      );

    const oneUse =
      parseBoolean(
        fields.oneUse
      );

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      !businessName ||
      !businessEmail ||
      !validEmail(
        businessEmail
      ) ||
      !website ||
      !offerTitle ||
      !discount ||
      !category ||
      !city ||
      !description ||
      !termsText
    ) {

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "Please complete all required fields."
        }
      );

    }

    if (
      redemptionType !==
        "offline" &&
      redemptionType !==
        "online"
    ) {

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "Invalid redemption type."
        }
      );

    }

    if (
      redemptionType ===
        "online" &&
      !promoCode
    ) {

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "Please add an online promotional code."
        }
      );

    }

    const startDate =
      parseDate(
        startDateText
      );

    const endDate =
      parseDate(
        endDateText
      );

    if (
      !startDate ||
      !endDate ||
      endDate <
      startDate
    ) {

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "Invalid campaign dates."
        }
      );

    }

    const today =
      new Date();

    today.setUTCHours(
      0,
      0,
      0,
      0
    );

    if (
      startDate <
      today
    ) {

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "The campaign start date cannot be in the past."
        }
      );

    }

    const durationDays =
      Math.round(
        (
          endDate.getTime() -
          startDate.getTime()
        ) /
        86400000
      );

    if (
      durationDays >
      366
    ) {

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "A special offer can run for a maximum of 12 months."
        }
      );

    }

    /* =====================================================
       BUSINESS IDENTITY + SERVER PRICE
    ===================================================== */

    const businessKey =
      advertiserKey({
        companyNumber,
        legalName,
        businessName,
        businessEmail
      });

    const previousCount =
      await countQualifyingPlacements(
        businessKey
      );

    const pricing =
      calculatePlacement(
        previousCount
      );

    /* =====================================================
       SUBMISSION ID
    ===================================================== */

    submissionId =
      crypto.randomUUID();

    /* =====================================================
       PHOTOS
    ===================================================== */

    const uploadedImages = [];

    for (
      let index = 0;
      index <
      incomingImages.length;
      index += 1
    ) {

      const uploaded =
        await uploadImage(
          submissionId,
          incomingImages[index],
          index
        );

      uploadedImages.push(
        uploaded
      );

      uploadedPaths.push(
        uploaded.path
      );

    }

    /* =====================================================
       STORE OFFER
    ===================================================== */

    const now =
      new Date()
        .toISOString();

    const record = {

      id:
        submissionId,

      advertiser_key:
        businessKey,

      business_name:
        businessName,

      legal_name:
        legalName ||
        businessName,

      company_number:
        companyNumber ||
        null,

      business_email:
        businessEmail,

      phone:
        phone ||
        null,

      website,

      billing_address:
        billingAddress ||
        null,

      country_code:
        "GB",

      country_name:
        "United Kingdom",

      title:
        offerTitle,

      discount,

      category,

      city,

      description,

      terms_text:
        termsText,

      redemption_type:
        redemptionType,

      promo_code:
        redemptionType ===
          "online"
          ? promoCode
          : null,

      max_redemptions:
        maxRedemptions,

      one_use_per_subscriber:
        oneUse,

      starts_at:
        startDateText,

      ends_at:
        endDateText,

      image_urls:
        uploadedImages
          .map(
            image =>
              image.url
          ),

      image_paths:
        uploadedImages
          .map(
            image =>
              image.path
          ),

      placement_number:
        pricing
          .placementNumber,

      placement_fee_pence:
        pricing
          .amountPence,

      currency:
        "GBP",

      is_free_placement:
        pricing
          .isFree,

      payment_status:
        pricing.isFree
          ? "free"
          : "awaiting_payment",

      status:
        pricing.isFree
          ? "pending_review"
          : "awaiting_payment",

      access_scope:
        "all_subscribers",

      submitted_at:
        now,

      updated_at:
        now

    };

    await createSubmission(
      record
    );

    /* =====================================================
       FREE PLACEMENT
    ===================================================== */

    if (
      pricing.isFree
    ) {

      return sendJson(
        response,
        200,
        {
          ok:true,

          free:true,

          amountPence:0,

          currency:"GBP",

          placementNumber:
            pricing
              .placementNumber,

          submissionId,

          status:
            "pending_review",

          message:
            "Your free placement has been submitted for review."
        }
      );

    }

    /* =====================================================
       £5 PLACEMENT
    ===================================================== */

    let checkout;

    try {

      checkout =
        await createStripeCheckout({
          request,
          submissionId,
          businessName,
          businessEmail,
          offerTitle,
          placementNumber:
            pricing
              .placementNumber
        });

    } catch (error) {

      await updateSubmission(
        submissionId,
        {
          payment_status:
            "checkout_failed",

          status:
            "payment_issue",

          updated_at:
            new Date()
              .toISOString()
        }
      ).catch(
        updateError => {

          console.error(
            "PETS & DOGUE failed to mark Stripe error:",
            updateError
          );

        }
      );

      throw error;

    }

    await updateSubmission(
      submissionId,
      {

        stripe_checkout_session_id:
          checkout.id,

        payment_status:
          "awaiting_payment",

        updated_at:
          new Date()
            .toISOString()

      }
    );

    return sendJson(
      response,
      200,
      {
        ok:true,

        free:false,

        amountPence:
          STANDARD_PRICE_PENCE,

        currency:
          "GBP",

        placementNumber:
          pricing
            .placementNumber,

        submissionId,

        checkoutUrl:
          checkout.url,

        status:
          "awaiting_payment"
      }
    );

  } catch (error) {

    console.error(
      "PETS & DOGUE partner special offer error:",
      error
    );

    if (
      uploadedPaths.length
    ) {

      await removeUploadedImages(
        uploadedPaths
      );

    }

    return sendJson(
      response,
      Number(
        error.statusCode
      ) || 500,
      {
        ok:false,

        error:
          Number(
            error.statusCode
          ) >= 400 &&
          Number(
            error.statusCode
          ) < 500
            ? error.message
            : "Unable to submit the offer right now. Please try again."
      }
    );

  }

};
