"use strict";

/* =========================================================
   PETS & DOGUE
   COMMUNITY PET-FRIENDLY API

   Supports:
   - shared pet policy
   - Inside / Outside confirmation
   - Yes / No community voting
   - vote counters
   - one vote per browser/device key
   - exact venue/address matching

   Future:
   - Pet Photos will use the same place_key
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
  ).trim();

const POLICY_TABLE =
  "pet_place_policies";

const VOTE_TABLE =
  "pet_place_votes";

const MAX_BODY_BYTES =
  32 * 1024;

const MAX_ROWS =
  5000;


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


function numberOrNull(value){

  if(
    value === null ||
    value === undefined ||
    value === ""
  ){
    return null;
  }

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : null;

}


function validLatitude(value){

  return (
    value !== null &&
    value >= -90 &&
    value <= 90
  );

}


function validLongitude(value){

  return (
    value !== null &&
    value >= -180 &&
    value <= 180
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


function cleanVote(value){

  const vote =
    clean(
      value,
      20
    )
    .toLowerCase();

  if(
    vote === "yes" ||
    vote === "no"
  ){
    return vote;
  }

  return "";

}


/* =========================================================
   BODY
========================================================= */

async function bodyOf(request){

  const length =
    Number(
      request.headers[
        "content-length"
      ] || 0
    );

  if(
    Number.isFinite(length) &&
    length > MAX_BODY_BYTES
  ){

    throw new Error(
      "Request body is too large."
    );

  }


  if(
    request.body &&
    typeof request.body === "object"
  ){

    return request.body;

  }


  if(
    typeof request.body === "string"
  ){

    if(
      Buffer.byteLength(
        request.body,
        "utf8"
      ) > MAX_BODY_BYTES
    ){

      throw new Error(
        "Request body is too large."
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
   SUPABASE
========================================================= */

function supabaseHeaders(
  extra = {}
){

  return {

    apikey:
      SUPABASE_KEY,

    Authorization:
      `Bearer ${SUPABASE_KEY}`,

    "Content-Type":
      "application/json",

    ...extra

  };

}


async function supabase(
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
            options.headers || {}
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


  if(!response.ok){

    const message =
      data &&
      typeof data === "object"

        ? (
            data.message ||
            data.error ||
            JSON.stringify(data)
          )

        : String(
            data ||
            `Supabase error ${response.status}`
          );


    throw new Error(
      message
    );

  }


  return data;

}


/* =========================================================
   POLICY NORMALISATION
========================================================= */

function normalizePolicy(row){

  if(
    !row ||
    typeof row !== "object"
  ){
    return null;
  }


  return {

    id:
      row.id ?? null,

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

    latitude:
      numberOrNull(
        row.latitude
      ),

    longitude:
      numberOrNull(
        row.longitude
      ),

    inside:
      Boolean(
        row.inside
      ),

    outside:
      Boolean(
        row.outside
      ),

    source:
      clean(
        row.source,
        100
      ) ||
      "community",

    confirmedBy:
      clean(
        row.confirmed_by,
        100
      ) ||
      "community",

    createdAt:
      row.created_at || null,

    updatedAt:
      row.updated_at || null

  };

}


/* =========================================================
   READ POLICIES
========================================================= */

async function readPolicies(){

  const select =
    [
      "id",
      "place_key",
      "place_name",
      "address",
      "latitude",
      "longitude",
      "inside",
      "outside",
      "source",
      "confirmed_by",
      "created_at",
      "updated_at"
    ]
    .join(",");


  const rows =
    await supabase(
      `/rest/v1/${POLICY_TABLE}` +
      `?select=${encodeURIComponent(select)}` +
      `&order=updated_at.desc` +
      `&limit=${MAX_ROWS}`,
      {
        method:"GET"
      }
    );


  return Array.isArray(rows)
    ? rows
        .map(
          normalizePolicy
        )
        .filter(Boolean)
    : [];

}


/* =========================================================
   FIND POLICY
========================================================= */

async function findPolicy(
  placeKey
){

  const key =
    encodeURIComponent(
      placeKey
    );


  const rows =
    await supabase(
      `/rest/v1/${POLICY_TABLE}` +
      `?place_key=eq.${key}` +
      `&select=*` +
      `&limit=1`,
      {
        method:"GET"
      }
    );


  return (
    Array.isArray(rows) &&
    rows.length
  )
    ? rows[0]
    : null;

}/* =========================================================
   SAVE INSIDE / OUTSIDE POLICY
========================================================= */

async function savePolicy(input){

  const placeKey =
    clean(
      input.placeKey ||
      input.place_key,
      500
    );

  const placeName =
    clean(
      input.placeName ||
      input.place_name,
      300
    );

  const address =
    clean(
      input.address,
      1000
    );

  const latitude =
    numberOrNull(
      input.latitude
    );

  const longitude =
    numberOrNull(
      input.longitude
    );

  const requestedInside =
    boolean(
      input.inside
    );

  const requestedOutside =
    boolean(
      input.outside
    );


  if(!placeKey){

    throw new Error(
      "placeKey is required."
    );

  }


  if(!placeName){

    throw new Error(
      "placeName is required."
    );

  }


  if(
    !requestedInside &&
    !requestedOutside
  ){

    throw new Error(
      "Select Inside, Outside, or both."
    );

  }


  if(
    latitude !== null &&
    !validLatitude(latitude)
  ){

    throw new Error(
      "Invalid latitude."
    );

  }


  if(
    longitude !== null &&
    !validLongitude(longitude)
  ){

    throw new Error(
      "Invalid longitude."
    );

  }


  const existing =
    await findPolicy(
      placeKey
    );


  const inside =
    Boolean(
      requestedInside ||
      existing?.inside
    );

  const outside =
    Boolean(
      requestedOutside ||
      existing?.outside
    );


  const payload = {

    place_key:
      placeKey,

    place_name:
      placeName,

    address:
      address ||
      clean(
        existing?.address,
        1000
      ) ||
      null,

    latitude:
      validLatitude(latitude)
        ? latitude
        : numberOrNull(
            existing?.latitude
          ),

    longitude:
      validLongitude(longitude)
        ? longitude
        : numberOrNull(
            existing?.longitude
          ),

    inside,

    outside,

    source:
      "pets-dogue-community",

    confirmed_by:
      "community",

    updated_at:
      new Date()
        .toISOString()

  };


  const rows =
    await supabase(
      `/rest/v1/${POLICY_TABLE}` +
      `?on_conflict=place_key`,
      {
        method:"POST",

        headers:{
          Prefer:
            "resolution=merge-duplicates,return=representation"
        },

        body:
          JSON.stringify(
            payload
          )
      }
    );


  const saved =
    Array.isArray(rows) &&
    rows.length
      ? rows[0]
      : payload;


  return normalizePolicy(
    saved
  );

}


/* =========================================================
   VOTE NORMALISATION
========================================================= */

function normalizeVote(row){

  if(
    !row ||
    typeof row !== "object"
  ){
    return null;
  }


  return {

    id:
      row.id ?? null,

    placeKey:
      clean(
        row.place_key,
        500
      ),

    voterKey:
      clean(
        row.voter_key,
        200
      ),

    vote:
      cleanVote(
        row.vote
      ),

    createdAt:
      row.created_at || null,

    updatedAt:
      row.updated_at || null

  };

}


/* =========================================================
   READ VOTES
========================================================= */

async function readVotes(){

  try{

    const rows =
      await supabase(
        `/rest/v1/${VOTE_TABLE}` +
        `?select=id,place_key,voter_key,vote,created_at,updated_at` +
        `&limit=${MAX_ROWS}`,
        {
          method:"GET"
        }
      );


    return Array.isArray(rows)
      ? rows
          .map(
            normalizeVote
          )
          .filter(Boolean)
      : [];


  }catch(error){

    console.warn(
      "PETS & DOGUE votes table:",
      error.message
    );

    return [];

  }

}


/* =========================================================
   VOTE SUMMARIES
========================================================= */

function voteSummaries(votes){

  const map =
    new Map();


  votes
    .filter(Boolean)
    .forEach(
      item=>{

        if(
          !item.placeKey ||
          !item.vote
        ){
          return;
        }


        if(
          !map.has(
            item.placeKey
          )
        ){

          map.set(
            item.placeKey,
            {
              placeKey:
                item.placeKey,

              yes:
                0,

              no:
                0,

              total:
                0,

              yesPercent:
                0,

              noPercent:
                0,

              communityPetFriendly:
                false,

              communityRejected:
                false
            }
          );

        }


        const summary =
          map.get(
            item.placeKey
          );


        if(
          item.vote === "yes"
        ){

          summary.yes += 1;

        }


        if(
          item.vote === "no"
        ){

          summary.no += 1;

        }


        summary.total =
          summary.yes +
          summary.no;


        summary.yesPercent =
          summary.total
            ? Math.round(
                (
                  summary.yes /
                  summary.total
                ) *
                100
              )
            : 0;


        summary.noPercent =
          summary.total
            ? Math.round(
                (
                  summary.no /
                  summary.total
                ) *
                100
              )
            : 0;


        summary.communityPetFriendly =
          (
            summary.yes >= 2 &&
            summary.yes >=
              summary.no
          );


        summary.communityRejected =
          (
            summary.no >= 5 &&
            summary.noPercent >= 70
          );

      }
    );


  return Array.from(
    map.values()
  );

}


/* =========================================================
   SAVE YES / NO VOTE
========================================================= */

async function saveVote(input){

  const placeKey =
    clean(
      input.placeKey ||
      input.place_key,
      500
    );

  const voterKey =
    clean(
      input.voterKey ||
      input.voter_key,
      200
    );

  const vote =
    cleanVote(
      input.vote
    );


  if(!placeKey){

    throw new Error(
      "placeKey is required."
    );

  }


  if(
    !voterKey ||
    voterKey.length < 8
  ){

    throw new Error(
      "voterKey is required."
    );

  }


  if(!vote){

    throw new Error(
      "Vote must be yes or no."
    );

  }


  const payload = {

    place_key:
      placeKey,

    voter_key:
      voterKey,

    vote,

    updated_at:
      new Date()
        .toISOString()

  };


  const rows =
    await supabase(
      `/rest/v1/${VOTE_TABLE}` +
      `?on_conflict=place_key,voter_key`,
      {
        method:"POST",

        headers:{
          Prefer:
            "resolution=merge-duplicates,return=representation"
        },

        body:
          JSON.stringify(
            payload
          )
      }
    );


  const saved =
    Array.isArray(rows) &&
    rows.length
      ? rows[0]
      : payload;


  return normalizeVote(
    saved
  );

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
    !allowedOrigin(origin)
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
    request.method === "OPTIONS"
  ){

    response
      .status(204)
      .end();

    return;

  }


  /* =====================================================
     GET
  ===================================================== */

  if(
    request.method === "GET"
  ){

    try{

      const [
        policies,
        votes
      ] =
        await Promise.all([
          readPolicies(),
          readVotes()
        ]);


      const voteSummary =
        voteSummaries(
          votes
        );


      return sendJson(
        response,
        200,
        {
          ok:true,

          policies,

          votes:
            voteSummary,

          policyCount:
            policies.length,

          votePlaceCount:
            voteSummary.length
        }
      );


    }catch(error){

      console.error(
        "PET COMMUNITY GET:",
        error
      );


      return sendJson(
        response,
        500,
        {
          ok:false,

          error:
            "Could not load community pet data."
        }
      );

    }

  }


  /* =====================================================
     POST
  ===================================================== */

  if(
    request.method === "POST"
  ){

    try{

      const body =
        await bodyOf(
          request
        );


      const action =
        clean(
          body.action,
          50
        )
        .toLowerCase();


      /*
         Backward compatibility.

         The current page sends
         Inside / Outside confirmation
         without an action value.
      */

      if(
        !action ||
        action === "policy" ||
        action === "confirm"
      ){

        const policy =
          await savePolicy(
            body
          );


        return sendJson(
          response,
          200,
          {
            ok:true,

            policy
          }
        );

      }


      /*
         COMMUNITY YES / NO VOTE
      */

      if(
        action === "vote"
      ){

        const vote =
          await saveVote(
            body
          );


        const votes =
          await readVotes();


        const summary =
          voteSummaries(
            votes
          )
          .find(
            item=>
              item.placeKey ===
              vote.placeKey
          ) || {

            placeKey:
              vote.placeKey,

            yes:
              0,

            no:
              0,

            total:
              0,

            yesPercent:
              0,

            noPercent:
              0,

            communityPetFriendly:
              false,

            communityRejected:
              false

          };


        return sendJson(
          response,
          200,
          {
            ok:true,

            vote,

            summary
          }
        );

      }


      return sendJson(
        response,
        400,
        {
          ok:false,

          error:
            "Unknown action."
        }
      );


    }catch(error){

      console.error(
        "PET COMMUNITY POST:",
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
              "Could not save community data.",
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
