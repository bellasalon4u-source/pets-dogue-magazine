"use strict";

/* =========================================================
   PETS & DOGUE
   PET PHOTOS API

   GET
   - returns approved animal photos for one exact venue

   POST
   - accepts compressed image from browser
   - requires animalVisible = true
   - requires takenAtVenue = true
   - stores file in Supabase Storage
   - creates moderation record in pet_place_photos
   - photo starts as "pending"

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

const MAX_BODY_BYTES =
  6 * 1024 * 1024;

const MAX_IMAGE_BYTES =
  4 * 1024 * 1024;

const MAX_RESULTS =
  100;


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
      "Image upload is too large."
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
        "Image upload is too large."
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


  const text =
    await response.text();


  let data = null;


  if(text){

    try{

      data =
        JSON.parse(text);

    }catch{

      data =
        text;

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

}/* =========================================================
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

    if(
      Number(
        error.status
      ) !==
      404
    ){

      /*
         Some Supabase projects return
         another status when bucket does not exist.
         We still attempt creation.
      */

    }

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
       If another request created
       the bucket milliseconds earlier,
       continue normally.
    */

    const message =
      String(
        error.message ||
        ""
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
    match[1];


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
    mime ===
    "image/png"
      ? "png"
      : mime ===
        "image/webp"
        ? "webp"
        : "jpg";


  return {
    mime,
    buffer,
    extension
  };

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
   RATE LIMIT
========================================================= */

async function recentUploadExists(
  placeKey,
  uploaderKey
){

  if(
    !placeKey ||
    !uploaderKey
  ){

    return false;

  }


  const since =
    new Date(
      Date.now() -
      2 * 60 * 1000
    )
    .toISOString();


  const path =
    `/rest/v1/${TABLE}` +
    `?place_key=eq.${encodeURIComponent(placeKey)}` +
    `&uploader_key=eq.${encodeURIComponent(uploaderKey)}` +
    `&created_at=gte.${encodeURIComponent(since)}` +
    `&select=id` +
    `&limit=1`;


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


    return (
      Array.isArray(rows) &&
      rows.length >
        0
    );

  }catch{

    return false;

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

}/* =========================================================
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
     POST NEW PHOTO
  ===================================================== */

  if(
    request.method ===
    "POST"
  ){

    let uploadedPath =
      "";


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
          body.animalVisible ||
          body.animal_visible
        );


      const takenAtVenue =
        boolean(
          body.takenAtVenue ||
          body.taken_at_venue
        );


      const area =
        safeArea(
          body.area
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
          "The photo must be taken at this exact venue."
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


      const recent =
        await recentUploadExists(
          placeKey,
          uploaderKey
        );


      if(recent){

        throw new Error(
          "Please wait before uploading another photo for this place."
        );

      }


      const image =
        decodeImageData(
          body.imageData ||
          body.image_data
        );


      const folder =
        slug(
          placeKey
        );


      uploadedPath =
        `${folder}/` +
        `${Date.now()}-` +
        `${randomId()}.` +
        `${image.extension}`;


      const imageUrl =
        await uploadImage(
          uploadedPath,
          image
        );


      const record =
        await savePhotoRecord({

          placeKey,

          placeName,

          address,

          uploaderKey,

          area,

          imageUrl

        });


      return sendJson(
        response,
        201,
        {
          ok:true,

          status:
            "pending",

          message:
            "Photo submitted for review.",

          photo:{
            id:
              record.id ||
              null,

            placeKey,

            imageUrl,

            area,

            status:
              "pending"
          }
        }
      );


    }catch(error){

      console.error(
        "PET PHOTOS POST:",
        error
      );


      /*
         If database insert fails after
         Storage upload, attempt cleanup.
      */

      if(
        uploadedPath
      ){

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

        }catch(cleanupError){

          console.warn(
            "Pet photo cleanup:",
            cleanupError
          );

        }

      }


      return sendJson(
        response,
        400,
        {
          ok:false,

          error:
            clean(
              error.message ||
              "Could not upload pet photo.",
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
