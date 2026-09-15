"use strict";

/* =========================================================
   PETS & DOGUE
   PET PHOTOS API

   GET
   - returns approved animal photos for one exact venue

   POST
   - accepts 1–10 compressed images from browser
   - remains compatible with the old single-image request
   - requires animalVisible = true
   - requires takenAtVenue = true
   - stores every file in Supabase Storage
   - creates one moderation record per photo
   - every new photo starts as "pending"
   - preserves Inside / Outside / Terrace / Other

   IMPORTANT
   Only photos showing an animal at the exact venue
   belong in Pet Photos.
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const SUPABASE_URL =
  String(
    process.env.SUPABASE_URL || ""
  )
  .trim()
  .replace(/\/+$/, "");

const SUPABASE_KEY =
  String(
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  )
  .trim();

const TABLE =
  "pet_place_photos";

const BUCKET =
  "pet-place-photos";

const MAX_IMAGE_BYTES =
  4 * 1024 * 1024;

const MAX_BATCH =
  10;

/*
   Browser images are compressed before upload.

   Base64 is larger than the original binary file, so the
   request limit must be larger than MAX_IMAGE_BYTES × 10.
*/
const MAX_BODY_BYTES =
  56 * 1024 * 1024;

const MAX_RESULTS =
  100;

/*
   Instead of blocking the second photo for two minutes,
   allow a reasonable number of submissions in the window.

   This is compatible with:
   - one POST containing up to 10 photos
   - sequential mobile uploads from the frontend
*/
const RATE_WINDOW_MS =
  2 * 60 * 1000;

const MAX_RECENT_PHOTOS =
  20;


/* =========================================================
   RESPONSE
========================================================= */

function sendJson(
  response,
  status,
  payload
){

  response.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  response.setHeader(
    "Cache-Control",
    "no-store"
  );

  response.setHeader(
    "X-Content-Type-Options",
    "nosniff"
  );

  response
    .status(status)
    .json(payload);

}


/* =========================================================
   CORS
========================================================= */

function normalizeOrigin(value){

  return String(
    value || ""
  )
  .trim()
  .toLowerCase();

}


function allowedOrigin(origin){

  if(!origin){
    return true;
  }

  try{

    const url =
      new URL(origin);

    const host =
      String(
        url.hostname || ""
      )
      .toLowerCase();

    return (
      host === "petsanddogue.com" ||
      host === "www.petsanddogue.com" ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".vercel.app")
    );

  }catch{

    return false;

  }

}


function applyCors(
  request,
  response
){

  const origin =
    normalizeOrigin(
      request.headers.origin
    );

  if(
    origin &&
    allowedOrigin(origin)
  ){

    response.setHeader(
      "Access-Control-Allow-Origin",
      origin
    );

    response.setHeader(
      "Vary",
      "Origin"
    );

  }

  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

}


/* =========================================================
   HELPERS
========================================================= */

function clean(
  value,
  max = 500
){

  return String(
    value ?? ""
  )
  .replace(/\u0000/g, "")
  .trim()
  .slice(
    0,
    max
  );

}


function boolean(value){

  return (
    value === true ||
    value === 1 ||
    String(value)
      .toLowerCase() === "true"
  );

}


function safeArea(value){

  const area =
    clean(
      value,
      30
    )
    .toLowerCase();

  return [
    "inside",
    "outside",
    "terrace",
    "other"
  ]
  .includes(area)
    ? area
    : "other";

}


function safeKey(value){

  return clean(
    value,
    500
  );

}


function randomId(){

  if(
    globalThis.crypto &&
    typeof globalThis.crypto.randomUUID ===
      "function"
  ){

    return globalThis.crypto
      .randomUUID();

  }

  return (
    Date.now() +
    "-" +
    Math.random()
      .toString(36)
      .slice(2)
  );

}


function slug(value){

  return clean(
    value,
    200
  )
  .toLowerCase()
  .normalize("NFKD")
  .replace(
    /[\u0300-\u036f]/g,
    ""
  )
  .replace(
    /[^a-z0-9]+/g,
    "-"
  )
  .replace(
    /^-+|-+$/g,
    ""
  )
  .slice(
    0,
    80
  ) || "place";

}


/* =========================================================
   REQUEST BODY
========================================================= */

async function readBody(request){

  const contentLength =
    Number(
      request.headers[
        "content-length"
      ] || 0
    );

  if(
    Number.isFinite(
      contentLength
    ) &&
    contentLength >
      MAX_BODY_BYTES
  ){

    throw new Error(
      "Photo upload is too large."
    );

  }


  if(
    request.body &&
    typeof request.body ===
      "object"
  ){

    return request.body;

  }


  if(
    typeof request.body ===
      "string"
  ){

    if(
      Buffer.byteLength(
        request.body,
        "utf8"
      ) >
      MAX_BODY_BYTES
    ){

      throw new Error(
        "Photo upload is too large."
      );

    }

    try{

      return JSON.parse(
        request.body
      );

    }catch{

      throw new Error(
        "Invalid JSON."
      );

    }

  }


  return {};

}


/* =========================================================
   SUPABASE REQUEST
========================================================= */

function supabaseHeaders(
  extra = {}
){

  return {

    apikey:
      SUPABASE_KEY,

    Authorization:
      `Bearer ${SUPABASE_KEY}`,

    ...extra

  };

}


async function supabaseRequest(
  path,
  options = {}
){

  if(
    !SUPABASE_URL ||
    !SUPABASE_KEY
  ){

    throw new Error(
      "Supabase environment variables are missing."
    );

  }


  const response =
    await fetch(
      `${SUPABASE_URL}${path}`,
      {
        ...options,

        headers:
          supabaseHeaders(
            options.headers ||
            {}
          )
      }
    );


  const responseText =
    await response.text();


  let data = null;


  if(responseText){

    try{

      data =
        JSON.parse(
          responseText
        );

    }catch{

      data =
        responseText;

    }

  }


  if(
    !response.ok
  ){

    const message =
      data &&
      typeof data ===
        "object"
        ? (
            data.message ||
            data.error ||
            JSON.stringify(
              data
            )
          )
        : String(
            data ||
            `Supabase error ${response.status}`
          );


    const error =
      new Error(
        message
      );

    error.status =
      response.status;

    throw error;

  }


  return data;

}


/* =========================================================
   STORAGE BUCKET
========================================================= */

async function ensureBucket(){

  try{

    await supabaseRequest(
      `/storage/v1/bucket/${BUCKET}`,
      {
        method:"GET"
      }
    );

    return;

  }catch(error){

    /*
       If the bucket is missing, attempt creation below.
       Some Supabase projects do not return exactly 404.
    */

  }


  try{

    await supabaseRequest(
      "/storage/v1/bucket",
      {
        method:"POST",

        headers:{
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify({

            id:
              BUCKET,

            name:
              BUCKET,

            public:
              true,

            file_size_limit:
              MAX_IMAGE_BYTES,

            allowed_mime_types:[
              "image/jpeg",
              "image/png",
              "image/webp"
            ]

          })

      }
    );

  }catch(error){

    /*
       Another request can create the bucket between
       our GET and POST. In that case continue normally.
    */

    const message =
      String(
        error.message || ""
      )
      .toLowerCase();

    if(
      !message.includes(
        "already"
      ) &&
      !message.includes(
        "exists"
      )
    ){

      throw error;

    }

  }

}


/* =========================================================
   IMAGE DATA
========================================================= */

function decodeImageData(
  imageData
){

  const value =
    clean(
      imageData,
      MAX_BODY_BYTES
    );


  const match =
    value.match(
      /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=\s]+)$/
    );


  if(!match){

    throw new Error(
      "Unsupported image format."
    );

  }


  const mime =
    match[1]
      .toLowerCase();


  const buffer =
    Buffer.from(
      match[2]
        .replace(
          /\s/g,
          ""
        ),
      "base64"
    );


  if(
    !buffer.length
  ){

    throw new Error(
      "Image is empty."
    );

  }


  if(
    buffer.length >
    MAX_IMAGE_BYTES
  ){

    throw new Error(
      "Image is too large."
    );

  }


  const extension =
    mime === "image/png"
      ? "png"
      : mime === "image/webp"
        ? "webp"
        : "jpg";


  return {
    mime,
    buffer,
    extension
  };

}


/* =========================================================
   IMAGE SIGNATURE VALIDATION
========================================================= */

function validImageSignature(image){

  const buffer =
    image.buffer;


  if(
    image.mime ===
    "image/jpeg"
  ){

    return (
      buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    );

  }


  if(
    image.mime ===
    "image/png"
  ){

    return (
      buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );

  }


  if(
    image.mime ===
    "image/webp"
  ){

    return (
      buffer.length >= 12 &&
      buffer
        .subarray(
          0,
          4
        )
        .toString("ascii") ===
          "RIFF" &&
      buffer
        .subarray(
          8,
          12
        )
        .toString("ascii") ===
          "WEBP"
    );

  }


  return false;

}


/* =========================================================
   PUBLIC URL
========================================================= */

function publicImageUrl(path){

  return (
    `${SUPABASE_URL}` +
    `/storage/v1/object/public/` +
    `${BUCKET}/` +
    path
      .split("/")
      .map(
        encodeURIComponent
      )
      .join("/")
  );

}


/* =========================================================
   UPLOAD STORAGE
========================================================= */

async function uploadImage(
  path,
  image
){

  await ensureBucket();


  await supabaseRequest(
    `/storage/v1/object/${BUCKET}/${path}`,
    {
      method:"POST",

      headers:{
        "Content-Type":
          image.mime,

        "x-upsert":
          "false"
      },

      body:
        image.buffer

    }
  );


  return publicImageUrl(
    path
  );

}


/* =========================================================
   DELETE STORAGE FILE
========================================================= */

async function deleteUploadedImage(
  uploadedPath
){

  if(!uploadedPath){
    return;
  }


  try{

    await supabaseRequest(
      `/storage/v1/object/${BUCKET}`,
      {
        method:"DELETE",

        headers:{
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify({
            prefixes:[
              uploadedPath
            ]
          })

      }
    );

  }catch(error){

    console.warn(
      "Pet photo cleanup:",
      error
    );

  }

}


/* =========================================================
   RATE LIMIT
========================================================= */

async function recentUploadCount(
  placeKey,
  uploaderKey
){

  if(
    !placeKey ||
    !uploaderKey
  ){

    return 0;

  }


  const since =
    new Date(
      Date.now() -
      RATE_WINDOW_MS
    )
    .toISOString();


  const path =
    `/rest/v1/${TABLE}` +
    `?place_key=eq.${encodeURIComponent(placeKey)}` +
    `&uploader_key=eq.${encodeURIComponent(uploaderKey)}` +
    `&created_at=gte.${encodeURIComponent(since)}` +
    `&select=id` +
    `&limit=${MAX_RECENT_PHOTOS + 1}`;


  try{

    const rows =
      await supabaseRequest(
        path,
        {
          method:"GET",

          headers:{
            Accept:
              "application/json"
          }
        }
      );


    return Array.isArray(rows)
      ? rows.length
      : 0;

  }catch{

    /*
       Do not break legitimate uploads only because
       the rate-limit lookup failed.
    */

    return 0;

  }

}


/* =========================================================
   INSERT PHOTO RECORD
========================================================= */

async function savePhotoRecord(
  input
){

  const payload = {

    place_key:
      input.placeKey,

    place_name:
      input.placeName ||
      null,

    address:
      input.address ||
      null,

    image_url:
      input.imageUrl,

    caption:
      null,

    area:
      input.area,

    animal_visible:
      true,

    taken_at_venue:
      true,

    status:
      "pending",

    uploader_key:
      input.uploaderKey ||
      null

  };


  const rows =
    await supabaseRequest(
      `/rest/v1/${TABLE}`,
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
            payload
          )

      }
    );


  return (
    Array.isArray(rows) &&
    rows.length
  )
    ? rows[0]
    : payload;

}


/* =========================================================
   APPROVED PHOTOS
========================================================= */

async function readApprovedPhotos(
  placeKey
){

  const select =
    [
      "id",
      "place_key",
      "place_name",
      "address",
      "image_url",
      "caption",
      "area",
      "created_at",
      "approved_at"
    ]
    .join(",");


  const path =
    `/rest/v1/${TABLE}` +
    `?place_key=eq.${encodeURIComponent(placeKey)}` +
    `&status=eq.approved` +
    `&animal_visible=eq.true` +
    `&taken_at_venue=eq.true` +
    `&select=${encodeURIComponent(select)}` +
    `&order=created_at.desc` +
    `&limit=${MAX_RESULTS}`;


  const rows =
    await supabaseRequest(
      path,
      {
        method:"GET",

        headers:{
          Accept:
            "application/json"
        }
      }
    );


  return Array.isArray(rows)
    ? rows.map(
        row=>({

          id:
            row.id,

          placeKey:
            clean(
              row.place_key,
              500
            ),

          placeName:
            clean(
              row.place_name,
              300
            ),

          address:
            clean(
              row.address,
              1000
            ),

          imageUrl:
            clean(
              row.image_url,
              3000
            ),

          caption:
            clean(
              row.caption,
              500
            ),

          area:
            safeArea(
              row.area
            ),

          createdAt:
            row.created_at ||
            null,

          approvedAt:
            row.approved_at ||
            null

        }))
        .filter(
          item=>
            Boolean(
              item.imageUrl
            )
        )
    : [];

}


/* =========================================================
   NORMALISE UPLOAD ITEMS

   Supports the original request:

   {
     imageData:"...",
     area:"inside"
   }

   and the new picker request:

   {
     images:[
       {
         imageData:"...",
         area:"inside"
       }
     ]
   }
========================================================= */

function normalizeUploadItems(body){

  let items = [];


  if(
    Array.isArray(
      body.images
    )
  ){

    items =
      body.images
        .slice(
          0,
          MAX_BATCH
        )
        .map(
          item=>{

            if(
              typeof item ===
              "string"
            ){

              return {

                imageData:
                  item,

                area:
                  safeArea(
                    body.area
                  )

              };

            }


            return {

              imageData:
                item?.imageData ||
                item?.image_data ||
                "",

              area:
                safeArea(
                  item?.area ||
                  body.area
                )

            };

          });

  }else if(
    body.imageData ||
    body.image_data
  ){

    items = [{

      imageData:
        body.imageData ||
        body.image_data,

      area:
        safeArea(
          body.area
        )

    }];

  }


  return items
    .filter(
      item=>
        Boolean(
          item.imageData
        )
    )
    .slice(
      0,
      MAX_BATCH
    );

}


/* =========================================================
   PROCESS ONE PHOTO
========================================================= */

async function processPhoto(
  input,
  item
){

  const image =
    decodeImageData(
      item.imageData
    );


  if(
    !validImageSignature(
      image
    )
  ){

    throw new Error(
      "The selected file is not a valid image."
    );

  }


  const folder =
    slug(
      input.placeKey
    );


  const uploadedPath =
    `${folder}/` +
    `${Date.now()}-` +
    `${randomId()}.` +
    `${image.extension}`;


  let imageUrl =
    "";


  try{

    imageUrl =
      await uploadImage(
        uploadedPath,
        image
      );


    const record =
      await savePhotoRecord({

        placeKey:
          input.placeKey,

        placeName:
          input.placeName,

        address:
          input.address,

        uploaderKey:
          input.uploaderKey,

        area:
          safeArea(
            item.area
          ),

        imageUrl

      });


    return {

      ok:true,

      id:
        record.id ||
        null,

      placeKey:
        input.placeKey,

      imageUrl,

      area:
        safeArea(
          item.area
        ),

      status:
        "pending"

    };


  }catch(error){

    if(imageUrl){

      await deleteUploadedImage(
        uploadedPath
      );

    }


    throw error;

  }

}


/* =========================================================
   HANDLER
========================================================= */

module.exports =
async function handler(
  request,
  response
){

  applyCors(
    request,
    response
  );


  const origin =
    normalizeOrigin(
      request.headers.origin
    );


  if(
    origin &&
    !allowedOrigin(
      origin
    )
  ){

    return sendJson(
      response,
      403,
      {
        ok:false,
        error:
          "Origin not allowed."
      }
    );

  }


  if(
    request.method ===
    "OPTIONS"
  ){

    response
      .status(204)
      .end();

    return;

  }


  /* =====================================================
     GET APPROVED PET PHOTOS
  ===================================================== */

  if(
    request.method ===
    "GET"
  ){

    try{

      const placeKey =
        safeKey(
          request.query
            ?.placeKey ||
          request.query
            ?.place_key
        );


      if(
        !placeKey
      ){

        return sendJson(
          response,
          400,
          {
            ok:false,
            error:
              "placeKey is required."
          }
        );

      }


      const photos =
        await readApprovedPhotos(
          placeKey
        );


      return sendJson(
        response,
        200,
        {
          ok:true,

          count:
            photos.length,

          photos
        }
      );


    }catch(error){

      console.error(
        "PET PHOTOS GET:",
        error
      );


      return sendJson(
        response,
        500,
        {
          ok:false,
          error:
            "Could not load pet photos."
        }
      );

    }

  }


  /* =====================================================
     POST NEW PET PHOTO(S)
  ===================================================== */

  if(
    request.method ===
    "POST"
  ){

    try{

      const body =
        await readBody(
          request
        );


      const placeKey =
        safeKey(
          body.placeKey ||
          body.place_key
        );


      const placeName =
        clean(
          body.placeName ||
          body.place_name,
          300
        );


      const address =
        clean(
          body.address,
          1000
        );


      const uploaderKey =
        clean(
          body.uploaderKey ||
          body.uploader_key,
          200
        );


      const animalVisible =
        boolean(
          body.animalVisible ??
          body.animal_visible
        );


      const takenAtVenue =
        boolean(
          body.takenAtVenue ??
          body.taken_at_venue
        );


      if(
        !placeKey
      ){

        throw new Error(
          "placeKey is required."
        );

      }


      if(
        !placeName
      ){

        throw new Error(
          "placeName is required."
        );

      }


      /*
         Mandatory PETS & DOGUE rule.
         These confirmations apply to every image
         included in this submission.
      */

      if(
        !animalVisible
      ){

        throw new Error(
          "Only photos showing an animal can be submitted."
        );

      }


      if(
        !takenAtVenue
      ){

        throw new Error(
          "Every photo must be taken at this exact venue."
        );

      }


      if(
        !uploaderKey ||
        uploaderKey.length <
          8
      ){

        throw new Error(
          "Uploader identification is missing."
        );

      }


      const items =
        normalizeUploadItems(
          body
        );


      if(
        !items.length
      ){

        throw new Error(
          "Please choose at least one photo."
        );

      }


      if(
        items.length >
        MAX_BATCH
      ){

        throw new Error(
          `You can upload up to ${MAX_BATCH} photos at once.`
        );

      }


      const recentCount =
        await recentUploadCount(
          placeKey,
          uploaderKey
        );


      if(
        recentCount >=
        MAX_RECENT_PHOTOS
      ){

        return sendJson(
          response,
          429,
          {
            ok:false,

            error:
              "Too many photos were submitted recently. Please wait a moment and try again."
          }
        );

      }


      if(
        recentCount +
        items.length >
        MAX_RECENT_PHOTOS
      ){

        return sendJson(
          response,
          429,
          {
            ok:false,

            error:
              "This upload would exceed the temporary photo submission limit."
          }
        );

      }


      const input = {

        placeKey,

        placeName,

        address,

        uploaderKey

      };


      const uploaded = [];

      const failed = [];


      /*
         Process sequentially.

         This uses less memory than uploading 10 files
         simultaneously and behaves better on mobile and
         serverless environments.
      */

      for(
        let index = 0;
        index < items.length;
        index++
      ){

        try{

          const photo =
            await processPhoto(
              input,
              items[index]
            );


          uploaded.push({

            index,

            ...photo

          });


        }catch(error){

          console.error(
            "PET PHOTO ITEM:",
            error
          );


          failed.push({

            index,

            ok:false,

            error:
              clean(
                error.message ||
                "Could not upload this photo.",
                500
              )

          });

        }

      }


      if(
        !uploaded.length
      ){

        return sendJson(
          response,
          400,
          {
            ok:false,

            status:
              "failed",

            uploaded:
              0,

            failed:
              failed.length,

            errors:
              failed,

            error:
              failed[0]
                ?.error ||
              "Could not upload the selected photos."
          }
        );

      }


      return sendJson(
        response,
        201,
        {
          ok:true,

          status:
            "pending",

          moderation:
            "pending",

          placeKey,

          uploaded:
            uploaded.length,

          failed:
            failed.length,

          photos:
            uploaded,

          errors:
            failed,

          /*
             Keep the old "photo" field when exactly
             one image was uploaded so older frontend
             code remains compatible.
          */

          photo:
            uploaded.length === 1
              ? uploaded[0]
              : null,

          message:
            uploaded.length === 1
              ? "Photo submitted for review."
              : `${uploaded.length} photos submitted for review.`

        }
      );


    }catch(error){

      console.error(
        "PET PHOTOS POST:",
        error
      );


      return sendJson(
        response,
        400,
        {
          ok:false,

          error:
            clean(
              error.message ||
              "Could not upload pet photos.",
              500
            )
        }
      );

    }

  }


  return sendJson(
    response,
    405,
    {
      ok:false,
      error:
        "Method not allowed."
    }
  );

};
