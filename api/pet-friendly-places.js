"use strict";

/* =========================================================
   PETS & DOGUE
   PET-FRIENDLY PLACES API

   SEARCH STACK
   - Geoapify confirmed dog-friendly search
   - Geoapify broad category search
   - OpenStreetMap browser-side enrichment
   - Community confirmations handled on frontend
   - Wikimedia free photo fallback

   IMPORTANT
   - No Google Places API required
   - Confirmed places first
   - Unknown places remain visible
   - Explicit dogs=no places are removed
   - Designed to stay low-cost / free-tier friendly
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

const MAX_RESULTS =
  60;

const DEFAULT_RESULTS =
  60;

const MAX_RADIUS_METERS =
  50000;

const DEFAULT_RADIUS_METERS =
  15000;

const REQUEST_TIMEOUT =
  9000;


/* =========================================================
   CATEGORIES

   IMPORTANT:
   Pizzeria now uses real pizza categories instead of
   the generic catering.restaurant category.
========================================================= */

const CATEGORY_CONFIG = {

  cafe:{
    geo:[
      "catering.cafe"
    ],
    intrinsic:false
  },

  restaurant:{
    geo:[
      "catering.restaurant"
    ],
    intrinsic:false
  },

  pub:{
    geo:[
      "catering.pub",
      "catering.bar",
      "catering.biergarten"
    ],
    intrinsic:false
  },

  pizzeria:{
    geo:[
      "catering.restaurant.pizza",
      "catering.fast_food.pizza"
    ],
    intrinsic:false
  },

  hotel:{
    geo:[
      "accommodation.hotel",
      "accommodation.guest_house",
      "accommodation.hostel",
      "accommodation.motel",
      "accommodation.apartment"
    ],
    intrinsic:false
  },

  park:{
    geo:[
      "pet.dog_park",
      "leisure.park"
    ],
    intrinsic:false
  },

  beach:{
    geo:[
      "beach"
    ],
    intrinsic:false
  },

  veterinary:{
    geo:[
      "pet.veterinary"
    ],
    fallback:[
      "pet"
    ],
    intrinsic:true
  },

  "pet-shop":{
    geo:[
      "pet.shop"
    ],
    fallback:[
      "pet"
    ],
    intrinsic:true
  },

  grooming:{
    geo:[
      "pet.service"
    ],
    fallback:[
      "pet"
    ],
    intrinsic:true
  },

  events:{
    geo:[
      "activity.events_venue"
    ],
    intrinsic:false
  }

};


const ALL_LIFESTYLE = [

  "catering.cafe",

  "catering.restaurant",

  "catering.restaurant.pizza",

  "catering.fast_food.pizza",

  "catering.pub",

  "catering.bar",

  "catering.biergarten",

  "accommodation.hotel",

  "accommodation.guest_house",

  "accommodation.hostel",

  "accommodation.motel",

  "accommodation.apartment",

  "leisure.park",

  "beach",

  "activity.events_venue"

];


const ALL_PET_SERVICES = [

  "pet.dog_park",

  "pet.veterinary",

  "pet.shop",

  "pet.service"

];


/* =========================================================
   RESPONSE
========================================================= */

function setHeaders(res){

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  res.setHeader(
    "X-Content-Type-Options",
    "nosniff"
  );

}


function sendJson(
  res,
  status,
  payload,
  cache = false
){

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    cache
      ? "public, s-maxage=300, stale-while-revalidate=900"
      : "no-store"
  );

  res
    .status(status)
    .json(payload);

}


/* =========================================================
   HELPERS
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


function num(value){

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

  }catch{}

  return "";

}


function normalizeLanguage(value){

  const raw =
    cleanString(
      value,
      20
    )
    .toLowerCase()
    .replace("_","-");

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

    restaurants:"restaurant",

    pubs:"pub",

    bar:"pub",

    bars:"pub",

    pizza:"pizzeria",

    pizzas:"pizzeria",

    pizzerias:"pizzeria",

    hotels:"hotel",

    lodging:"hotel",

    accommodation:"hotel",

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
      ()=>controller.abort(),
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
    Math.sin(dLat/2) ** 2
    +
    Math.cos(rad(lat1))
    *
    Math.cos(rad(lat2))
    *
    Math.sin(dLon/2) ** 2;

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
  properties,
  hint = ""
){

  if(
    hint &&
    hint !== "all"
  ){

    return hint;

  }

  const categories =
    safeArray(
      properties?.categories
    )
    .map(
      value=>
        String(value)
          .toLowerCase()
    );

  const raw =
    properties?.datasource?.raw ||
    {};

  const text =
    [
      properties?.name,
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
    categories.some(
      value=>
        value.startsWith(
          "pet.veterinary"
        )
    )
    ||
    /veterinary|veterinarian|animal hospital|\bvet\b/i
      .test(text)
  ){

    return "veterinary";

  }


  if(
    categories.some(
      value=>
        value.startsWith(
          "pet.shop"
        )
    )
    ||
    /pet shop|pet store|pet supplies/i
      .test(text)
  ){

    return "pet-shop";

  }


  if(
    categories.some(
      value=>
        value.startsWith(
          "pet.service"
        )
    )
    ||
    /groom|grooming|dog wash|pet salon/i
      .test(text)
  ){

    return "grooming";

  }


  if(
    categories.some(
      value=>
        value.startsWith(
          "pet.dog_park"
        )
    )
  ){

    return "park";

  }


  if(
    categories.some(
      value=>
        value === "beach" ||
        value.startsWith(
          "beach."
        )
    )
  ){

    return "beach";

  }


  if(
    categories.some(
      value=>
        value.startsWith(
          "accommodation"
        )
    )
  ){

    return "hotel";

  }


  if(
    categories.some(
      value=>
        value.startsWith(
          "activity.events_venue"
        )
    )
  ){

    return "events";

  }


  if(
    categories.some(
      value=>
        value.startsWith(
          "leisure.park"
        )
    )
  ){

    return "park";

  }


  if(
    categories.some(
      value=>
        value.includes(
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
    categories.some(
      value=>
        value.startsWith(
          "catering.pub"
        )
        ||
        value.startsWith(
          "catering.bar"
        )
        ||
        value.startsWith(
          "catering.biergarten"
        )
    )
  ){

    return "pub";

  }


  if(
    categories.some(
      value=>
        value.startsWith(
          "catering.restaurant"
        )
    )
  ){

    return "restaurant";

  }


  if(
    categories.some(
      value=>
        value.startsWith(
          "catering.cafe"
        )
    )
  ){

    return "cafe";

  }


  return "other";

}


/* =========================================================
   DOG / PET POLICY DETECTION
========================================================= */

function detectAllowsDogs(
  properties,
  category,
  forceConfirmed = false
){

  if(forceConfirmed){

    return true;

  }


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
      value=>
        String(value)
          .toLowerCase()
    );


  if(
    categories.some(
      value=>
        value.startsWith(
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
      value=>
        String(value)
          .toLowerCase()
    );


  if(
    conditions.some(
      value=>
        value === "no-dogs" ||
        value.startsWith(
          "no-dogs."
        )
    )
  ){

    return false;

  }


  if(
    conditions.some(
      value=>
        value === "dogs" ||
        value.startsWith(
          "dogs."
        )
    )
  ){

    return true;

  }


  const raw =
    properties?.datasource?.raw ||
    {};


  const dog =
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
      "private"
    ]
    .includes(dog)
  ){

    return false;

  }


  if(
    [
      "yes",
      "leashed",
      "designated",
      "permissive",
      "outside",
      "limited",
      "conditional",
      "customers",
      "allowed"
    ]
    .includes(dog)
  ){

    return true;

  }


  const notes =
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
      .test(notes)
  ){

    return false;

  }


  if(
    /\b(dog friendly|dogs welcome|dogs allowed|pet friendly|pets welcome)\b/i
      .test(notes)
  ){

    return true;

  }


  return null;

}


/* =========================================================
   PHOTO EXTRACTION
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
      .replace(/^file:/i,"")
      .trim();


  if(!filename){

    return "";

  }


  return (
    "https://commons.wikimedia.org/wiki/Special:FilePath/"
    +
    encodeURIComponent(
      filename
    )
  );

}


function extractPhotos(properties){

  const raw =
    properties?.datasource?.raw ||
    {};

  const media =
    properties?.wiki_and_media ||
    {};

  const candidates = [

    properties?.image,

    properties?.image_url,

    properties?.photo,

    media?.image,

    media?.image_url,

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
      candidate=>{

        const url =
          commonsFileUrl(
            candidate
          );

        if(
          url &&
          !photos.includes(url)
        ){

          photos.push(url);

        }

      }
    );


  return photos;

}


/* =========================================================
   NORMALISE PLACE
========================================================= */

function normalizeFeature(
  feature,
  center,
  hint = "",
  forceConfirmed = false
){

  const properties =
    feature?.properties ||
    {};

  const coordinates =
    feature?.geometry?.coordinates ||
    [];


  const longitude =
    num(
      coordinates[0] ??
      properties.lon ??
      properties.longitude
    );


  const latitude =
    num(
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
      feature.id ||
      properties.osm_id ||
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
    detectCategory(
      properties,
      hint
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
      160
    );


  const photos =
    extractPhotos(
      properties
    );


  const allowsDogs =
    detectAllowsDogs(
      properties,
      category,
      forceConfirmed
    );


  const distance =
    center
      ? distanceKm(
          center.lat,
          center.lng,
          latitude,
          longitude
        )
      : null;


  const openNow =
    typeof properties?.opening_hours?.open_now ===
    "boolean"
      ? properties.opening_hours.open_now
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
      lat:
        latitude,
      lng:
        longitude
    },

    distance,

    rating:null,

    ratingCount:0,

    website,

    phone,

    googleMapsUrl:"",

    photos,

    photo:
      photos[0] ||
      "",

    allowsDogs,

    openNow

  };

}


/* =========================================================
   IDENTITY / MERGE
========================================================= */

function identity(place){

  const name =
    cleanString(
      place?.name,
      300
    )
    .toLowerCase()
    .normalize("NFKD")
    .replace(
      /[^\p{L}\p{N}]+/gu,
      ""
    );


  const address =
    cleanString(
      place?.address,
      500
    )
    .toLowerCase()
    .normalize("NFKD")
    .replace(
      /[^\p{L}\p{N}]+/gu,
      ""
    );


  if(
    name &&
    address
  ){

    return (
      name +
      "|" +
      address
    );

  }


  return [
    name,
    Number(
      place?.location?.lat ||
      0
    ).toFixed(4),
    Number(
      place?.location?.lng ||
      0
    ).toFixed(4)
  ]
  .join("|");

}


function mergePlaces(
  groups,
  maxResults = MAX_RESULTS
){

  const map =
    new Map();


  safeArray(groups)
    .flat()
    .filter(Boolean)
    .forEach(
      place=>{

        if(
          place.allowsDogs ===
          false
        ){

          return;

        }


        const key =
          identity(
            place
          );


        if(
          !map.has(key)
        ){

          map.set(
            key,
            place
          );

          return;

        }


        const existing =
          map.get(key);


        const confirmed =
          existing.allowsDogs === true ||
          place.allowsDogs === true;


        map.set(
          key,
          {

            ...existing,

            ...place,

            website:
              place.website ||
              existing.website ||
              "",

            phone:
              place.phone ||
              existing.phone ||
              "",

            photo:
              place.photo ||
              existing.photo ||
              "",

            photos:
              place.photos?.length
                ? place.photos
                : existing.photos ||
                  [],

            allowsDogs:
              confirmed
                ? true
                : null,

            distance:
              Math.min(
                existing.distance ??
                999999,
                place.distance ??
                999999
              )

          }
        );

      }
    );


  return [
    ...map.values()
  ]
  .sort(
    (a,b)=>{

      const ac =
        a.allowsDogs === true;

      const bc =
        b.allowsDogs === true;


      if(ac !== bc){

        return ac
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
   GEOAPIFY PLACES REQUEST
========================================================= */

async function geoapifyPlaces({

  latitude,

  longitude,

  radius,

  categories,

  conditions = "",

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


  if(conditions){

    url.searchParams.set(
      "conditions",
      conditions
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
    data?.features
  );

}


/* =========================================================
   CATEGORY SEARCH

   TWO SEARCHES:
   1. confirmed dog-friendly
   2. broad category

   Confirmed first, unknown second.
========================================================= */

async function searchCategory({

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


  const center = {
    lat:
      latitude,
    lng:
      longitude
  };


  const [
    confirmedResult,
    broadResult
  ] =
    await Promise.allSettled([


      config.intrinsic

        ? Promise.resolve([])

        : geoapifyPlaces({

            latitude,

            longitude,

            radius,

            categories:
              config.geo,

            conditions:
              "dogs",

            language,

            limit:
              Math.min(
                40,
                MAX_RESULTS
              )

          }),


      geoapifyPlaces({

        latitude,

        longitude,

        radius,

        categories:
          config.geo,

        language,

        limit:
          MAX_RESULTS

      })


    ]);


  const confirmedFeatures =
    confirmedResult.status ===
    "fulfilled"
      ? confirmedResult.value
      : [];


  const broadFeatures =
    broadResult.status ===
    "fulfilled"
      ? broadResult.value
      : [];


  const confirmed =
    confirmedFeatures
      .map(
        feature=>
          normalizeFeature(
            feature,
            center,
            category,
            true
          )
      )
      .filter(Boolean);


  let broad =
    broadFeatures
      .map(
        feature=>
          normalizeFeature(
            feature,
            center,
            category,
            config.intrinsic
          )
      )
      .filter(Boolean)
      .filter(
        place=>
          place.allowsDogs !==
          false
      );


  /* =====================================================
     PET SERVICE FALLBACK

     Geoapify can sometimes have fewer objects under the
     exact pet subcategory.

     Then use parent "pet" and filter the category ourselves.
  ===================================================== */

  if(
    config.fallback?.length &&
    broad.length < 8
  ){

    try{

      const fallbackFeatures =
        await geoapifyPlaces({

          latitude,

          longitude,

          radius,

          categories:
            config.fallback,

          language,

          limit:
            MAX_RESULTS

        });


      const fallback =
        fallbackFeatures
          .map(
            feature=>
              normalizeFeature(
                feature,
                center,
                "",
                false
              )
          )
          .filter(Boolean)
          .filter(
            place=>
              place.category ===
              category
          )
          .map(
            place=>({
              ...place,
              allowsDogs:true
            })
          );


      broad =
        mergePlaces(
          [
            broad,
            fallback
          ],
          MAX_RESULTS
        );

    }catch(error){

      console.warn(
        "Pet parent fallback:",
        error?.message
      );

    }

  }


  return mergePlaces(
    [
      confirmed,
      broad
    ],
    maxResults
  );

}


/* =========================================================
   ALL CATEGORIES

   Confirmed dog-friendly lifestyle places are fetched
   separately so they cannot disappear behind ordinary venues.
========================================================= */

async function searchAll({

  latitude,

  longitude,

  radius,

  maxResults,

  language

}){

  const center = {
    lat:
      latitude,
    lng:
      longitude
  };


  const [
    confirmedLifestyleResult,
    broadLifestyleResult,
    petServicesResult
  ] =
    await Promise.allSettled([


      geoapifyPlaces({

        latitude,

        longitude,

        radius,

        categories:
          ALL_LIFESTYLE,

        conditions:
          "dogs",

        language,

        limit:
          40

      }),


      geoapifyPlaces({

        latitude,

        longitude,

        radius,

        categories:
          ALL_LIFESTYLE,

        language,

        limit:
          60

      }),


      geoapifyPlaces({

        latitude,

        longitude,

        radius,

        categories:
          ALL_PET_SERVICES,

        language,

        limit:
          30

      })


    ]);


  const confirmedLifestyle =
    (
      confirmedLifestyleResult.status ===
      "fulfilled"
        ? confirmedLifestyleResult.value
        : []
    )
    .map(
      feature=>
        normalizeFeature(
          feature,
          center,
          "",
          true
        )
    )
    .filter(Boolean);


  const broadLifestyle =
    (
      broadLifestyleResult.status ===
      "fulfilled"
        ? broadLifestyleResult.value
        : []
    )
    .map(
      feature=>
        normalizeFeature(
          feature,
          center,
          "",
          false
        )
    )
    .filter(Boolean)
    .filter(
      place=>
        place.allowsDogs !==
        false
    );


  const petServices =
    (
      petServicesResult.status ===
      "fulfilled"
        ? petServicesResult.value
        : []
    )
    .map(
      feature=>
        normalizeFeature(
          feature,
          center,
          "",
          false
        )
    )
    .filter(Boolean)
    .map(
      place=>({

        ...place,

        allowsDogs:
          [
            "veterinary",
            "pet-shop",
            "grooming",
            "park"
          ]
          .includes(
            place.category
          )
            ? true
            : place.allowsDogs

      })
    );


  return mergePlaces(
    [
      confirmedLifestyle,
      petServices,
      broadLifestyle
    ],
    maxResults
  );

}


/* =========================================================
   AUTOCOMPLETE
========================================================= */

async function geoAutocomplete({

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
      url.toString()
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
        num(
          item.lat
        ),

      longitude:
        num(
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

        const payload = {

          lat:
            num(item.lat),

          lon:
            num(item.lon),

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

          latitude:
            payload.lat,

          longitude:
            payload.lon,

          source:
            "osm"

        };

      }
    );

}


/* =========================================================
   DETAILS
========================================================= */

async function geoDetails(
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


  return normalizeFeature(
    feature,
    null,
    "",
    false
  );

}


function nomDetails(placeId){

  if(
    !String(placeId)
      .startsWith("nom:")
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
          .toString("utf8")
      );


    const latitude =
      num(payload.lat);

    const longitude =
      num(payload.lon);


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

  }catch{

    return null;

  }

}


/* =========================================================
   WIKIMEDIA PHOTO FALLBACK
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


  const searchText =
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
    searchText
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

        const image =
          page?.imageinfo?.[0]?.thumburl ||
          page?.imageinfo?.[0]?.url ||
          "";

        return (
          image &&
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

async function bodyOf(req){

  if(
    req.body &&
    typeof req.body ===
    "object"
  ){

    return req.body;

  }


  if(
    typeof req.body ===
    "string"
  ){

    try{

      return JSON.parse(
        req.body
      );

    }catch{

      return {};

    }

  }


  return {};

}


/* =========================================================
   HANDLER
========================================================= */

module.exports =
async function handler(
  req,
  res
){

  setHeaders(res);


  if(
    req.method ===
    "OPTIONS"
  ){

    res
      .status(204)
      .end();

    return;

  }


  if(
    req.method !==
    "POST"
  ){

    return sendJson(
      res,
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
      await bodyOf(req);


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
       PHOTO
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
        res,
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
          res,
          200,
          {
            ok:true,
            suggestions:[]
          }
        );

      }


      const latitude =
        num(
          body.latitude
        );

      const longitude =
        num(
          body.longitude
        );


      let suggestions =
        [];


      try{

        suggestions =
          await geoAutocomplete({

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


      if(!suggestions.length){

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
        res,
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
          nomDetails(
            placeId
          );

      }else{

        try{

          place =
            await geoDetails(
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
        res,
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
      num(
        body.latitude
      );

    const longitude =
      num(
        body.longitude
      );


    if(
      latitude === null ||
      longitude === null
    ){

      return sendJson(
        res,
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
        res,
        200,
        {
          ok:true,
          provider:
            "local",
          count:0,
          places:[]
        }
      );

    }


    if(!GEOAPIFY_API_KEY){

      return sendJson(
        res,
        200,
        {
          ok:true,
          provider:
            "openstreetmap-fallback",
          count:0,
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
        await searchAll({

          latitude,

          longitude,

          radius,

          maxResults,

          language

        });

    }else{

      places =
        await searchCategory({

          latitude,

          longitude,

          radius,

          category,

          maxResults,

          language

        });

    }


    return sendJson(
      res,
      200,
      {
        ok:true,
        provider:
          "geoapify",
        category,
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
      res,
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
