"use strict";

/* =========================================================
   PETS & DOGUE
   PET-FRIENDLY PLACES API

   FREE / LOW-COST DISCOVERY STACK
   - Geoapify
   - OpenStreetMap fallback in browser
   - Wikimedia Commons photo fallback

   IMPORTANT
   - No Google Places API
   - One broad Geoapify request per category
   - "All" uses broad lifestyle + pet services
   - Confirmed dog-friendly places are detected and prioritised
     by the frontend
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const GEOAPIFY_API_KEY =
  String(
    process.env.GEOAPIFY_API_KEY || ""
  ).trim();

const GEOAPIFY_PLACES_URL =
  "https://api.geoapify.com/v2/places";

const GEOAPIFY_AUTOCOMPLETE_URL =
  "https://api.geoapify.com/v1/geocode/autocomplete";

const GEOAPIFY_DETAILS_URL =
  "https://api.geoapify.com/v2/place-details";

const NOMINATIM_SEARCH_URL =
  "https://nominatim.openstreetmap.org/search";

const WIKIMEDIA_API_URL =
  "https://commons.wikimedia.org/w/api.php";

const MAX_RESULTS = 60;

const DEFAULT_RESULTS = 60;

const MAX_RADIUS_METERS =
  50000;

const DEFAULT_RADIUS_METERS =
  15000;

const REQUEST_TIMEOUT =
  9000;


/* =========================================================
   CATEGORY CONFIG
========================================================= */

const CATEGORY_CONFIG = {

  cafe:{
    geo:[
      "catering.cafe"
    ],
    intrinsicPetFriendly:false
  },

  restaurant:{
    geo:[
      "catering.restaurant"
    ],
    intrinsicPetFriendly:false
  },

  pub:{
    geo:[
      "catering.pub",
      "catering.biergarten",
      "catering.bar"
    ],
    intrinsicPetFriendly:false
  },

  pizzeria:{
    geo:[
      "catering.fast_food.pizza",
      "catering.restaurant"
    ],
    intrinsicPetFriendly:false
  },

  hotel:{
    geo:[
      "accommodation.hotel",
      "accommodation.guest_house",
      "accommodation.hostel",
      "accommodation.motel"
    ],
    intrinsicPetFriendly:false
  },

  park:{
    geo:[
      "pet.dog_park",
      "leisure.park"
    ],
    intrinsicPetFriendly:false
  },

  beach:{
    geo:[
      "beach"
    ],
    intrinsicPetFriendly:false
  },

  veterinary:{
    geo:[
      "pet.veterinary"
    ],
    intrinsicPetFriendly:true
  },

  "pet-shop":{
    geo:[
      "pet.shop"
    ],
    intrinsicPetFriendly:true
  },

  grooming:{
    geo:[
      "pet.service"
    ],
    intrinsicPetFriendly:true
  },

  events:{
    geo:[
      "activity.events_venue"
    ],
    intrinsicPetFriendly:false
  }

};


const ALL_LIFESTYLE_CATEGORIES = [

  "catering.cafe",

  "catering.restaurant",

  "catering.pub",

  "catering.biergarten",

  "catering.bar",

  "catering.fast_food.pizza",

  "accommodation.hotel",

  "accommodation.guest_house",

  "accommodation.hostel",

  "accommodation.motel",

  "leisure.park",

  "beach",

  "activity.events_venue"

];


const ALL_PET_SERVICE_CATEGORIES = [

  "pet.dog_park",

  "pet.veterinary",

  "pet.shop",

  "pet.service"

];


/* =========================================================
   RESPONSE
========================================================= */

function setCommonHeaders(
  response
){

  response.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  response.setHeader(
    "Access-Control-Allow-Methods",
    "POST,OPTIONS"
  );

  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  response.setHeader(
    "X-Content-Type-Options",
    "nosniff"
  );

}


function sendJson(
  response,
  status,
  payload,
  cache = false
){

  response.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  response.setHeader(
    "Cache-Control",
    cache
      ? "public, s-maxage=300, stale-while-revalidate=900"
      : "no-store"
  );

  response
    .status(status)
    .json(payload);

}


/* =========================================================
   GENERAL HELPERS
========================================================= */

function cleanString(
  value,
  maxLength = 2000
){

  if(
    value === null ||
    value === undefined
  ){

    return "";

  }

  return String(value)
    .replace(/\u0000/g,"")
    .trim()
    .slice(
      0,
      maxLength
    );

}


function safeArray(value){

  return Array.isArray(value)
    ? value
    : [];

}


function numberOrNull(value){

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : null;

}


function clamp(
  value,
  min,
  max
){

  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );

}


function unique(values){

  return Array.from(
    new Set(
      safeArray(values)
        .filter(Boolean)
    )
  );

}


function normalizeLanguage(value){

  const raw =
    cleanString(
      value,
      20
    )
    .toLowerCase()
    .replace(
      "_",
      "-"
    );

  const base =
    raw.split("-")[0];

  const aliases = {

    ua:"uk",

    cz:"cs",

    gr:"el",

    se:"sv",

    dk:"da"

  };

  const language =
    aliases[base] ||
    base ||
    "en";

  return /^[a-z]{2,3}$/i
    .test(language)
      ? language
      : "en";

}


function normalizeCategory(value){

  const raw =
    cleanString(
      value,
      100
    )
    .toLowerCase();

  const aliases = {

    cafes:"cafe",

    coffee:"cafe",

    coffeeshop:"cafe",

    coffee_shop:"cafe",

    restaurants:"restaurant",

    pubs:"pub",

    bar:"pub",

    bars:"pub",

    pizza:"pizzeria",

    pizzas:"pizzeria",

    pizzerias:"pizzeria",

    hotels:"hotel",

    lodging:"hotel",

    parks:"park",

    dogpark:"park",

    dog_park:"park",

    beaches:"beach",

    vet:"veterinary",

    vets:"veterinary",

    veterinarian:"veterinary",

    veterinary_care:"veterinary",

    petshop:"pet-shop",

    pet_store:"pet-shop",

    shop:"pet-shop",

    groom:"grooming",

    groomer:"grooming",

    groomers:"grooming",

    pet_grooming:"grooming",

    event:"events",

    show:"events",

    shows:"events",

    saved:"saved",

    all:"all"

  };

  const category =
    aliases[raw] ||
    raw ||
    "all";

  if(
    category === "all" ||
    category === "saved" ||
    CATEGORY_CONFIG[category]
  ){

    return category;

  }

  return "all";

}


function safeUrl(value){

  const raw =
    cleanString(
      value,
      2000
    );

  if(!raw){

    return "";

  }

  try{

    const url =
      new URL(raw);

    if(
      url.protocol === "https:" ||
      url.protocol === "http:"
    ){

      return url.href;

    }

  }catch(error){}

  return "";

}


/* =========================================================
   FETCH
========================================================= */

async function fetchJson(
  url,
  options = {},
  timeout = REQUEST_TIMEOUT
){

  const controller =
    new AbortController();

  const timer =
    setTimeout(
      ()=>{
        controller.abort();
      },
      timeout
    );

  try{

    const response =
      await fetch(
        url,
        {
          ...options,
          signal:
            controller.signal
        }
      );

    const data =
      await response
        .json()
        .catch(
          ()=>({})
        );

    if(!response.ok){

      throw new Error(
        cleanString(
          data?.message ||
          data?.error ||
          `HTTP ${response.status}`,
          500
        )
      );

    }

    return data;

  }finally{

    clearTimeout(timer);

  }

}


/* =========================================================
   DISTANCE
========================================================= */

function distanceKm(
  lat1,
  lon1,
  lat2,
  lon2
){

  const R =
    6371;

  const rad =
    value=>
      value *
      Math.PI /
      180;

  const dLat =
    rad(
      lat2-lat1
    );

  const dLon =
    rad(
      lon2-lon1
    );

  const a =
    Math.sin(
      dLat/2
    ) ** 2
    +
    Math.cos(
      rad(lat1)
    )
    *
    Math.cos(
      rad(lat2)
    )
    *
    Math.sin(
      dLon/2
    ) ** 2;

  return (
    R *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1-a)
    )
  );

}


/* =========================================================
   CATEGORY DETECTION
========================================================= */

function detectCategory(
  categories,
  properties = {},
  name = ""
){

  const list =
    safeArray(categories)
      .map(
        item=>
          String(item)
            .toLowerCase()
      );

  const raw =
    properties?.datasource?.raw ||
    {};

  const text =
    [
      name,
      raw.amenity,
      raw.shop,
      raw.tourism,
      raw.leisure,
      raw.cuisine
    ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();


  if(
    list.some(
      item=>
        item.startsWith(
          "pet.veterinary"
        )
    )
  ){

    return "veterinary";

  }


  if(
    list.some(
      item=>
        item.startsWith(
          "pet.shop"
        )
    )
  ){

    return "pet-shop";

  }


  if(
    list.some(
      item=>
        item.startsWith(
          "pet.service"
        )
    )
  ){

    return "grooming";

  }


  if(
    list.some(
      item=>
        item.startsWith(
          "pet.dog_park"
        )
    )
  ){

    return "park";

  }


  if(
    list.some(
      item=>
        item === "beach" ||
        item.startsWith(
          "beach."
        )
    )
  ){

    return "beach";

  }


  if(
    list.some(
      item=>
        item.startsWith(
          "accommodation"
        )
    )
  ){

    return "hotel";

  }


  if(
    list.some(
      item=>
        item.startsWith(
          "activity.events_venue"
        )
    )
  ){

    return "events";

  }


  if(
    list.some(
      item=>
        item.startsWith(
          "leisure.park"
        )
    )
  ){

    return "park";

  }


  if(
    list.some(
      item=>
        item.includes(
          "pizza"
        )
    )
    ||
    /pizza|pizzeria/i
      .test(text)
  ){

    return "pizzeria";

  }


  if(
    list.some(
      item=>
        item.startsWith(
          "catering.pub"
        )
        ||
        item.startsWith(
          "catering.biergarten"
        )
        ||
        item.startsWith(
          "catering.bar"
        )
    )
  ){

    return "pub";

  }


  if(
    list.some(
      item=>
        item.startsWith(
          "catering.restaurant"
        )
    )
  ){

    return "restaurant";

  }


  if(
    list.some(
      item=>
        item.startsWith(
          "catering.cafe"
        )
    )
  ){

    return "cafe";

  }


  return "other";

}


/* =========================================================
   PET-FRIENDLY DETECTION
========================================================= */

function detectAllowsDogs(
  properties,
  category
){

  if(
    category === "veterinary" ||
    category === "pet-shop" ||
    category === "grooming"
  ){

    return true;

  }


  const categories =
    safeArray(
      properties?.categories
    )
    .map(
      item=>
        String(item)
          .toLowerCase()
    );


  if(
    categories.some(
      item=>
        item.startsWith(
          "pet.dog_park"
        )
    )
  ){

    return true;

  }


  const conditions =
    safeArray(
      properties?.conditions
    )
    .map(
      item=>
        String(item)
          .toLowerCase()
    );


  if(
    conditions.some(
      item=>
        item === "no-dogs" ||
        item.startsWith(
          "no-dogs."
        )
    )
  ){

    return false;

  }


  if(
    conditions.some(
      item=>
        item === "dogs" ||
        item.startsWith(
          "dogs."
        )
    )
  ){

    return true;

  }


  const raw =
    properties?.datasource?.raw ||
    {};


  const dogValue =
    String(
      raw.dog ||
      raw.dogs ||
      raw["dog:access"] ||
      raw["dogs_allowed"] ||
      ""
    )
    .trim()
    .toLowerCase();


  if(
    [
      "no",
      "private",
      "customers:no"
    ]
    .includes(dogValue)
  ){

    return false;

  }


  if(
    [
      "yes",
      "leashed",
      "designated",
      "permissive",
      "customers",
      "allowed"
    ]
    .includes(dogValue)
  ){

    return true;

  }


  const description =
    [
      raw.description,
      raw.note,
      raw["dog:conditional"],
      properties?.description
    ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();


  if(
    /\b(no dogs|dogs prohibited|dogs not allowed)\b/i
      .test(description)
  ){

    return false;

  }


  if(
    /\b(dog friendly|dogs welcome|dogs allowed|pet friendly|pets welcome)\b/i
      .test(description)
  ){

    return true;

  }


  return null;

}


/* =========================================================
   IMAGE HELPERS
========================================================= */

function commonsFileUrl(value){

  const raw =
    cleanString(
      value,
      2000
    );

  if(!raw){

    return "";

  }


  if(
    /^https?:\/\//i
      .test(raw)
  ){

    return safeUrl(raw);

  }


  const filename =
    raw
      .replace(
        /^file:/i,
        ""
      )
      .trim();


  if(!filename){

    return "";

  }


  return (
    "https://commons.wikimedia.org/wiki/Special:FilePath/"
    +
    encodeURIComponent(filename)
  );

}


function extractPhotos(properties){

  const raw =
    properties?.datasource?.raw ||
    {};

  const wiki =
    properties?.wiki_and_media ||
    {};

  const candidates = [

    properties?.image,

    properties?.image_url,

    properties?.photo,

    wiki?.image,

    wiki?.image_url,

    raw.image,

    raw.image_url,

    raw.photo,

    raw.wikimedia_commons,

    raw["wikimedia_commons:image"],

    raw["contact:image"]

  ];


  const photos =
    [];


  candidates
    .filter(Boolean)
    .forEach(
      value=>{

        const photo =
          commonsFileUrl(value);

        if(
          photo &&
          !photos.includes(photo)
        ){

          photos.push(photo);

        }

      }
    );


  return photos;

}


/* =========================================================
   NORMALIZE GEOAPIFY PLACE
========================================================= */

function normalizeGeoFeature(
  feature,
  center = null,
  categoryHint = ""
){

  const properties =
    feature?.properties ||
    {};

  const coordinates =
    feature?.geometry?.coordinates ||
    [];


  const longitude =
    numberOrNull(
      coordinates[0] ??
      properties.lon ??
      properties.longitude
    );


  const latitude =
    numberOrNull(
      coordinates[1] ??
      properties.lat ??
      properties.latitude
    );


  if(
    latitude === null ||
    longitude === null
  ){

    return null;

  }


  const providerId =
    cleanString(
      properties.place_id ||
      properties.datasource?.raw?.osm_id ||
      properties.osm_id ||
      feature.id ||
      `${latitude},${longitude}`,
      500
    );


  const name =
    cleanString(
      properties.name ||
      properties.address_line1 ||
      properties.formatted ||
      "Place",
      300
    );


  const category =
    categoryHint &&
    categoryHint !== "all"
      ? categoryHint
      : detectCategory(
          properties.categories,
          properties,
          name
        );


  const address =
    cleanString(
      properties.formatted ||
      [
        properties.address_line1,
        properties.address_line2
      ]
      .filter(Boolean)
      .join(", "),
      1000
    );


  const website =
    safeUrl(
      properties.website ||
      properties.datasource?.raw?.website ||
      properties.datasource?.raw?.["contact:website"] ||
      ""
    );


  const phone =
    cleanString(
      properties.contact?.phone ||
      properties.phone ||
      properties.datasource?.raw?.phone ||
      properties.datasource?.raw?.["contact:phone"] ||
      "",
      150
    );


  const photos =
    extractPhotos(
      properties
    );


  const allowsDogs =
    detectAllowsDogs(
      properties,
      category
    );


  let openNow =
    null;


  if(
    typeof properties.opening_hours?.open_now ===
    "boolean"
  ){

    openNow =
      properties.opening_hours.open_now;

  }


  const distance =

    center &&
    Number.isFinite(center.lat) &&
    Number.isFinite(center.lng)

      ? distanceKm(
          center.lat,
          center.lng,
          latitude,
          longitude
        )

      : null;


  return {

    id:
      "geoapify-" +
      providerId,

    providerId,

    source:
      "geoapify",

    name,

    category,

    address,

    location:{
      lat:latitude,
      lng:longitude
    },

    distance,

    rating:null,

    ratingCount:0,

    website,

    phone,

    googleMapsUrl:
      "",

    photos,

    photo:
      photos[0] ||
      "",

    allowsDogs,

    openNow

  };

}


/* =========================================================
   GEOAPIFY REQUEST
========================================================= */

async function geoapifyPlacesRequest({

  latitude,

  longitude,

  radius,

  categories,

  language,

  limit = MAX_RESULTS

}){

  if(
    !GEOAPIFY_API_KEY ||
    !categories?.length
  ){

    return [];

  }


  const url =
    new URL(
      GEOAPIFY_PLACES_URL
    );


  url.searchParams.set(
    "categories",
    unique(categories)
      .join(",")
  );


  url.searchParams.set(
    "filter",
    `circle:${longitude},${latitude},${radius}`
  );


  url.searchParams.set(
    "bias",
    `proximity:${longitude},${latitude}`
  );


  url.searchParams.set(
    "limit",
    String(
      clamp(
        limit,
        1,
        MAX_RESULTS
      )
    )
  );


  url.searchParams.set(
    "lang",
    normalizeLanguage(
      language
    )
  );


  url.searchParams.set(
    "apiKey",
    GEOAPIFY_API_KEY
  );


  const data =
    await fetchJson(
      url.toString(),
      {
        headers:{
          Accept:
            "application/json"
        }
      }
    );


  return safeArray(
    data?.features
  );

}


/* =========================================================
   SINGLE CATEGORY SEARCH

   IMPORTANT:
   We intentionally request ALL nearby places in the selected
   category, not only places already tagged "dogs".

   The frontend then sorts:
   1. confirmed pet-friendly
   2. unconfirmed

   This fixes the problem where useful venues disappear only
   because Geoapify/OSM has no dog tag yet.
========================================================= */

async function searchSingleCategory({

  latitude,

  longitude,

  radius,

  category,

  maxResults,

  language

}){

  const config =
    CATEGORY_CONFIG[
      category
    ];


  if(!config){

    return [];

  }


  const features =
    await geoapifyPlacesRequest({

      latitude,

      longitude,

      radius,

      categories:
        config.geo,

      language,

      limit:
        maxResults

    });


  const center = {
    lat:latitude,
    lng:longitude
  };


  return features

    .map(
      feature=>
        normalizeGeoFeature(
          feature,
          center,
          category
        )
    )

    .filter(Boolean)

    .filter(
      place=>
        place.allowsDogs !== false
    )

    .sort(
      (a,b)=>{

        const aConfirmed =
          a.allowsDogs === true;

        const bConfirmed =
          b.allowsDogs === true;


        if(
          aConfirmed !==
          bConfirmed
        ){

          return aConfirmed
            ? -1
            : 1;

        }


        return (
          (a.distance ?? 999999)
          -
          (b.distance ?? 999999)
        );

      }
    )

    .slice(
      0,
      maxResults
    );

}


/* =========================================================
   ALL CATEGORIES

   OLD LOGIC:
   Geoapify conditions=dogs
   → too few places

   NEW LOGIC:
   1. Broad lifestyle discovery
   2. Pet services discovery
   3. Detect confirmed pet-friendly data where available
   4. Keep unknown places too
   5. Remove explicit "dogs not allowed"
========================================================= */

async function searchAllCategories({

  latitude,

  longitude,

  radius,

  maxResults,

  language

}){

  const center = {
    lat:latitude,
    lng:longitude
  };


  const [

    lifestyleResult,

    petResult

  ] =
    await Promise.allSettled([


      geoapifyPlacesRequest({

        latitude,

        longitude,

        radius,

        categories:
          ALL_LIFESTYLE_CATEGORIES,

        language,

        limit:
          MAX_RESULTS

      }),


      geoapifyPlacesRequest({

        latitude,

        longitude,

        radius,

        categories:
          ALL_PET_SERVICE_CATEGORIES,

        language,

        limit:
          Math.min(
            30,
            MAX_RESULTS
          )

      })


    ]);


  const lifestyleFeatures =

    lifestyleResult.status ===
    "fulfilled"

      ? lifestyleResult.value

      : [];


  const petFeatures =

    petResult.status ===
    "fulfilled"

      ? petResult.value

      : [];


  const lifestyle =

    lifestyleFeatures

      .map(
        feature=>
          normalizeGeoFeature(
            feature,
            center,
            ""
          )
      )

      .filter(Boolean)

      .filter(
        place=>
          place.allowsDogs !== false
      );


  const petServices =

    petFeatures

      .map(
        feature=>
          normalizeGeoFeature(
            feature,
            center,
            ""
          )
      )

      .filter(Boolean)

      .map(
        place=>({
          ...place,
          allowsDogs:true
        })
      );


  const map =
    new Map();


  [
    ...lifestyle,
    ...petServices
  ]
  .forEach(
    place=>{

      const key =
        place.providerId ||
        `${place.name}|${place.location.lat}|${place.location.lng}`;


      const existing =
        map.get(key);


      if(!existing){

        map.set(
          key,
          place
        );

        return;

      }


      map.set(
        key,
        {

          ...existing,

          ...place,

          photo:
            place.photo ||
            existing.photo ||
            "",

          photos:
            place.photos?.length
              ? place.photos
              : existing.photos ||
                [],

          website:
            place.website ||
            existing.website ||
            "",

          phone:
            place.phone ||
            existing.phone ||
            "",

          allowsDogs:
            (
              place.allowsDogs === true ||
              existing.allowsDogs === true
            )
              ? true
              : null

        }
      );

    }
  );


  return Array.from(
    map.values()
  )

    .sort(
      (a,b)=>{

        const aConfirmed =
          a.allowsDogs === true;

        const bConfirmed =
          b.allowsDogs === true;


        if(
          aConfirmed !==
          bConfirmed
        ){

          return aConfirmed
            ? -1
            : 1;

        }


        return (
          (a.distance ?? 999999)
          -
          (b.distance ?? 999999)
        );

      }
    )

    .slice(
      0,
      maxResults
    );

}


/* =========================================================
   AUTOCOMPLETE — GEOAPIFY
========================================================= */

async function geoapifyAutocomplete({

  query,

  latitude,

  longitude,

  language

}){

  if(!GEOAPIFY_API_KEY){

    return [];

  }


  const url =
    new URL(
      GEOAPIFY_AUTOCOMPLETE_URL
    );


  url.searchParams.set(
    "text",
    query
  );


  url.searchParams.set(
    "format",
    "json"
  );


  url.searchParams.set(
    "limit",
    "10"
  );


  url.searchParams.set(
    "lang",
    normalizeLanguage(
      language
    )
  );


  if(
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)
  ){

    url.searchParams.set(
      "bias",
      `proximity:${longitude},${latitude}`
    );

  }


  url.searchParams.set(
    "apiKey",
    GEOAPIFY_API_KEY
  );


  const data =
    await fetchJson(
      url.toString(),
      {
        headers:{
          Accept:
            "application/json"
        }
      }
    );


  return safeArray(
    data?.results
  )

    .map(
      item=>({

        placeId:
          cleanString(
            item.place_id,
            500
          ),

        name:
          cleanString(
            item.name ||
            item.address_line1 ||
            item.formatted ||
            "",
            300
          ),

        address:
          cleanString(
            item.formatted ||
            [
              item.address_line1,
              item.address_line2
            ]
            .filter(Boolean)
            .join(", "),
            1000
          ),

        text:
          cleanString(
            item.formatted ||
            item.name ||
            "",
            1000
          ),

        latitude:
          numberOrNull(
            item.lat
          ),

        longitude:
          numberOrNull(
            item.lon
          ),

        source:
          "geoapify"

      })
    )

    .filter(
      item=>
        item.placeId
    );

}


/* =========================================================
   AUTOCOMPLETE — NOMINATIM FALLBACK
========================================================= */

async function nominatimAutocomplete({

  query,

  language

}){

  const url =
    new URL(
      NOMINATIM_SEARCH_URL
    );


  url.searchParams.set(
    "format",
    "jsonv2"
  );


  url.searchParams.set(
    "q",
    query
  );


  url.searchParams.set(
    "limit",
    "8"
  );


  url.searchParams.set(
    "addressdetails",
    "1"
  );


  url.searchParams.set(
    "accept-language",
    normalizeLanguage(
      language
    )
  );


  const data =
    await fetchJson(
      url.toString(),
      {
        headers:{
          Accept:
            "application/json",

          "User-Agent":
            "PETS-DOGUE/1.0 petsanddogue.com"
        }
      }
    );


  return safeArray(data)

    .map(
      item=>{

        const latitude =
          numberOrNull(
            item.lat
          );

        const longitude =
          numberOrNull(
            item.lon
          );


        const payload = {

          lat:
            latitude,

          lon:
            longitude,

          name:
            cleanString(
              item.name ||
              String(
                item.display_name ||
                ""
              )
              .split(",")[0],
              300
            ),

          address:
            cleanString(
              item.display_name,
              1000
            )

        };


        const placeId =
          "nom:" +
          Buffer
            .from(
              JSON.stringify(
                payload
              ),
              "utf8"
            )
            .toString(
              "base64url"
            );


        return {

          placeId,

          name:
            payload.name,

          address:
            payload.address,

          text:
            payload.address,

          latitude,

          longitude,

          source:
            "osm"

        };

      }
    );

}


/* =========================================================
   DETAILS
========================================================= */

async function geoapifyDetails(
  placeId,
  language
){

  if(
    !GEOAPIFY_API_KEY ||
    !placeId
  ){

    return null;

  }


  const url =
    new URL(
      GEOAPIFY_DETAILS_URL
    );


  url.searchParams.set(
    "id",
    placeId
  );


  url.searchParams.set(
    "lang",
    normalizeLanguage(
      language
    )
  );


  url.searchParams.set(
    "apiKey",
    GEOAPIFY_API_KEY
  );


  const data =
    await fetchJson(
      url.toString()
    );


  const feature =
    safeArray(
      data?.features
    )[0];


  if(!feature){

    return null;

  }


  return normalizeGeoFeature(
    feature,
    null,
    ""
  );

}


function nominatimDetails(
  placeId
){

  if(
    !String(placeId)
      .startsWith(
        "nom:"
      )
  ){

    return null;

  }


  try{

    const payload =
      JSON.parse(
        Buffer
          .from(
            String(placeId)
              .slice(4),
            "base64url"
          )
          .toString(
            "utf8"
          )
      );


    const latitude =
      numberOrNull(
        payload.lat
      );

    const longitude =
      numberOrNull(
        payload.lon
      );


    if(
      latitude === null ||
      longitude === null
    ){

      return null;

    }


    return {

      id:
        placeId,

      providerId:
        placeId,

      source:
        "osm",

      name:
        cleanString(
          payload.name ||
          "Place",
          300
        ),

      category:
        "other",

      address:
        cleanString(
          payload.address,
          1000
        ),

      location:{
        lat:
          latitude,
        lng:
          longitude
      },

      rating:null,

      ratingCount:0,

      website:"",

      phone:"",

      googleMapsUrl:"",

      photos:[],

      photo:"",

      allowsDogs:null,

      openNow:null

    };

  }catch(error){

    return null;

  }

}


/* =========================================================
   WIKIMEDIA PHOTO FALLBACK

   Used only when the frontend asks for a missing photo.
   No paid image API is required.
========================================================= */

async function wikimediaPhoto({

  name,

  address

}){

  const cleanName =
    cleanString(
      name,
      200
    );


  if(
    cleanName.length < 3
  ){

    return "";

  }


  const locality =
    cleanString(
      address,
      300
    )
    .split(",")
    .slice(0,3)
    .join(" ");


  const query =
    [
      `"${cleanName}"`,
      locality
    ]
    .filter(Boolean)
    .join(" ");


  const url =
    new URL(
      WIKIMEDIA_API_URL
    );


  url.searchParams.set(
    "action",
    "query"
  );


  url.searchParams.set(
    "format",
    "json"
  );


  url.searchParams.set(
    "generator",
    "search"
  );


  url.searchParams.set(
    "gsrsearch",
    query
  );


  url.searchParams.set(
    "gsrnamespace",
    "6"
  );


  url.searchParams.set(
    "gsrlimit",
    "5"
  );


  url.searchParams.set(
    "prop",
    "imageinfo"
  );


  url.searchParams.set(
    "iiprop",
    "url"
  );


  url.searchParams.set(
    "iiurlwidth",
    "1200"
  );


  const data =
    await fetchJson(
      url.toString(),
      {},
      7000
    );


  const pages =
    Object.values(
      data?.query?.pages ||
      {}
    );


  const blocked =
    /logo|icon|map|flag|coat of arms|diagram|svg/i;


  const candidate =
    pages.find(
      page=>{

        const title =
          String(
            page?.title ||
            ""
          );


        const url =
          page?.imageinfo?.[0]?.thumburl ||
          page?.imageinfo?.[0]?.url ||
          "";


        return (
          url &&
          !blocked.test(title)
        );

      }
    );


  return safeUrl(
    candidate?.imageinfo?.[0]?.thumburl ||
    candidate?.imageinfo?.[0]?.url ||
    ""
  );

}


/* =========================================================
   BODY
========================================================= */

async function getBody(request){

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

    try{

      return JSON.parse(
        request.body
      );

    }catch(error){

      return {};

    }

  }


  return {};

}


/* =========================================================
   MAIN HANDLER
========================================================= */

module.exports =
async function handler(
  request,
  response
){

  setCommonHeaders(
    response
  );


  if(
    request.method ===
    "OPTIONS"
  ){

    response
      .status(204)
      .end();

    return;

  }


  if(
    request.method !==
    "POST"
  ){

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


  try{

    const body =
      await getBody(
        request
      );


    const action =
      cleanString(
        body.action,
        50
      )
      .toLowerCase();


    const language =
      normalizeLanguage(
        body.language
      );


    /* =====================================================
       PHOTO FALLBACK
    ===================================================== */

    if(
      action ===
      "photo"
    ){

      const photo =
        await wikimediaPhoto({

          name:
            body.name,

          address:
            body.address

        })
        .catch(
          ()=>""
        );


      return sendJson(
        response,
        200,
        {
          ok:true,
          photo
        },
        true
      );

    }


    /* =====================================================
       AUTOCOMPLETE
    ===================================================== */

    if(
      action ===
      "autocomplete"
    ){

      const query =
        cleanString(
          body.query,
          300
        );


      if(
        query.length < 2
      ){

        return sendJson(
          response,
          200,
          {
            ok:true,
            suggestions:[]
          }
        );

      }


      const latitude =
        numberOrNull(
          body.latitude
        );


      const longitude =
        numberOrNull(
          body.longitude
        );


      let suggestions =
        [];


      try{

        suggestions =
          await geoapifyAutocomplete({

            query,

            latitude,

            longitude,

            language

          });

      }catch(error){

        console.warn(
          "Geoapify autocomplete:",
          error?.message
        );

      }


      if(
        !suggestions.length
      ){

        try{

          suggestions =
            await nominatimAutocomplete({

              query,

              language

            });

        }catch(error){

          console.warn(
            "Nominatim autocomplete:",
            error?.message
          );

        }

      }


      return sendJson(
        response,
        200,
        {
          ok:true,
          suggestions
        },
        true
      );

    }


    /* =====================================================
       DETAILS
    ===================================================== */

    if(
      action ===
      "details"
    ){

      const placeId =
        cleanString(
          body.placeId,
          4000
        );


      let place =
        null;


      if(
        placeId.startsWith(
          "nom:"
        )
      ){

        place =
          nominatimDetails(
            placeId
          );

      }else{

        try{

          place =
            await geoapifyDetails(
              placeId,
              language
            );

        }catch(error){

          console.warn(
            "Geoapify details:",
            error?.message
          );

        }

      }


      return sendJson(
        response,
        200,
        {
          ok:true,
          provider:
            place?.source ||
            "geoapify",
          place
        },
        true
      );

    }


    /* =====================================================
       NEARBY SEARCH
    ===================================================== */

    const latitude =
      numberOrNull(
        body.latitude
      );


    const longitude =
      numberOrNull(
        body.longitude
      );


    if(
      latitude === null ||
      longitude === null
    ){

      return sendJson(
        response,
        400,
        {
          ok:false,
          error:
            "Valid latitude and longitude are required."
        }
      );

    }


    const radius =
      clamp(
        Number(
          body.radius ||
          DEFAULT_RADIUS_METERS
        ),
        500,
        MAX_RADIUS_METERS
      );


    const category =
      normalizeCategory(
        body.category
      );


    const maxResults =
      clamp(
        Number(
          body.maxResults ||
          DEFAULT_RESULTS
        ),
        1,
        MAX_RESULTS
      );


    if(
      category ===
      "saved"
    ){

      return sendJson(
        response,
        200,
        {
          ok:true,
          provider:
            "local",
          places:[]
        }
      );

    }


    if(
      !GEOAPIFY_API_KEY
    ){

      return sendJson(
        response,
        200,
        {
          ok:true,
          provider:
            "openstreetmap-fallback",
          places:[]
        }
      );

    }


    let places =
      [];


    if(
      category ===
      "all"
    ){

      places =
        await searchAllCategories({

          latitude,

          longitude,

          radius,

          maxResults,

          language

        });

    }else{

      places =
        await searchSingleCategory({

          latitude,

          longitude,

          radius,

          category,

          maxResults,

          language

        });

    }


    return sendJson(
      response,
      200,
      {
        ok:true,
        provider:
          "geoapify",
        count:
          places.length,
        places
      },
      true
    );


  }catch(error){

    console.error(
      "PET FRIENDLY API ERROR:",
      error
    );


    return sendJson(
      response,
      500,
      {
        ok:false,
        error:
          cleanString(
            error?.message ||
            "Pet-friendly search failed.",
            500
          )
      }
    );

  }

};
