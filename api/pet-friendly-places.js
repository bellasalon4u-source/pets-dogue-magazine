"use strict";

/*
=========================================================
PETS & DOGUE
PET-FRIENDLY PLACES API
Geoapify + OpenStreetMap friendly architecture
=========================================================

Environment variable:

GEOAPIFY_API_KEY

WHAT THIS API DOES

POST /api/pet-friendly-places

1. Nearby/category search
{
  latitude,
  longitude,
  radius,
  category,
  maxResults,
  language,
  regionCode
}

2. Autocomplete
{
  action:"autocomplete",
  query:"Brixton",
  latitude:51.46,
  longitude:-0.11,
  radius:15000,
  language:"en"
}

3. Place details
{
  action:"details",
  placeId:"..."
}

The browser keeps OpenStreetMap / Overpass as a fallback.
Google Places is NOT required.
=========================================================
*/


/* =========================================================
CONFIG
========================================================= */

const GEOAPIFY_API_KEY =
  process.env.GEOAPIFY_API_KEY ||
  "";

const GEOAPIFY_PLACES_URL =
  "https://api.geoapify.com/v2/places";

const GEOAPIFY_AUTOCOMPLETE_URL =
  "https://api.geoapify.com/v1/geocode/autocomplete";

const GEOAPIFY_DETAILS_URL =
  "https://api.geoapify.com/v2/place-details";

const NOMINATIM_SEARCH_URL =
  "https://nominatim.openstreetmap.org/search";

const NOMINATIM_REVERSE_URL =
  "https://nominatim.openstreetmap.org/reverse";

const DEFAULT_MAX_RESULTS = 40;
const MAX_RESULTS = 60;

const DEFAULT_RADIUS_METERS = 15000;
const MAX_RADIUS_METERS = 50000;

const REQUEST_TIMEOUT = 8500;


/* =========================================================
SUPPORTED CATEGORIES
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
HEADERS
========================================================= */

function setCommonHeaders(res){

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  res.setHeader(
    "X-Content-Type-Options",
    "nosniff"
  );

  res.setHeader(
    "Cache-Control",
    "no-store"
  );

}


/* =========================================================
GENERAL HELPERS
========================================================= */

function cleanString(
  value,
  maxLength = 2000
){

  if(
    value === undefined ||
    value === null
  ){
    return "";
  }

  return String(value)
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

  return /^[a-z]{2,3}$/i.test(
    language
  )
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
    gastropub:"pub",
    gastropubs:"pub",
    biergarten:"pub",

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

    shop:"pet-shop",
    petshop:"pet-shop",
    pet_store:"pet-shop",

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
      url.protocol === "http:" ||
      url.protocol === "https:"
    ){
      return url.href;
    }

  }catch(error){}

  return "";

}


function sleep(ms){

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  );

}


/* =========================================================
FETCH WITH TIMEOUT
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
      () =>
        controller.abort(),
      timeout
    );

  try{

    const response =
      await fetch(
        url,
        {
          ...options,
          signal:controller.signal
        }
      );

    const data =
      await response
      .json()
      .catch(
        () => ({})
      );

    if(!response.ok){

      const message =
        cleanString(
          data?.message ||
          data?.error ||
          `HTTP ${response.status}`,
          500
        );

      throw new Error(
        message
      );

    }

    return data;

  }finally{

    clearTimeout(
      timer
    );

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
    value =>
      value *
      Math.PI /
      180;

  const dLat =
    rad(
      lat2 - lat1
    );

  const dLon =
    rad(
      lon2 - lon1
    );

  const a =
    Math.sin(
      dLat / 2
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
      dLon / 2
    ) ** 2;

  return (
    R *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );

}


/* =========================================================
CATEGORY DETECTION
========================================================= */

function detectCategory(
  categories,
  raw = {},
  name = ""
){

  const list =
    safeArray(
      categories
    )
    .map(
      item =>
        cleanString(
          item,
          120
        )
        .toLowerCase()
    );

  const text =
    (
      cleanString(
        name,
        300
      )
      +
      " "
      +
      cleanString(
        raw.shop,
        100
      )
      +
      " "
      +
      cleanString(
        raw.amenity,
        100
      )
      +
      " "
      +
      cleanString(
        raw.cuisine,
        100
      )
    )
    .toLowerCase();

  if(
    list.some(
      item =>
        item.startsWith(
          "pet.veterinary"
        )
    )
  ){
    return "veterinary";
  }

  if(
    list.some(
      item =>
        item.startsWith(
          "pet.shop"
        )
    )
  ){
    return "pet-shop";
  }

  if(
    list.some(
      item =>
        item.startsWith(
          "pet.dog_park"
        )
    )
  ){
    return "park";
  }

  if(
    list.some(
      item =>
        item.startsWith(
          "pet.service"
        )
    )
  ){

    if(
      /groom|grooming|salon|dog wash|pet wash/i
      .test(text)
    ){
      return "grooming";
    }

    return "grooming";
  }

  if(
    list.some(
      item =>
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
      item =>
        item.startsWith(
          "accommodation"
        )
    )
  ){
    return "hotel";
  }

  if(
    list.some(
      item =>
        item.startsWith(
          "activity.events_venue"
        )
    )
  ){
    return "events";
  }

  if(
    list.some(
      item =>
        item.startsWith(
          "leisure.park"
        )
    )
  ){
    return "park";
  }

  if(
    list.some(
      item =>
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
      item =>
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
      item =>
        item.startsWith(
          "catering.restaurant"
        )
    )
  ){
    return "restaurant";
  }

  if(
    list.some(
      item =>
        item.startsWith(
          "catering.cafe"
        )
    )
  ){
    return "cafe";
  }

  return "other";

}/* =========================================================
PET FRIENDLY DETECTION
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
      item =>
        String(item)
        .toLowerCase()
    );

  if(
    categories.some(
      item =>
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
      item =>
        String(item)
        .toLowerCase()
    );

  if(
    conditions.some(
      item =>
        item === "no-dogs"
        ||
        item.startsWith(
          "no-dogs."
        )
    )
  ){
    return false;
  }

  if(
    conditions.some(
      item =>
        item === "dogs"
        ||
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
    cleanString(
      raw.dog ||
      raw.dogs ||
      raw["dog:conditional"],
      100
    )
    .toLowerCase();

  if(
    dogValue === "no"
    ||
    dogValue === "false"
  ){
    return false;
  }

  if(
    [
      "yes",
      "leashed",
      "designated",
      "permissive",
      "allowed"
    ]
    .includes(
      dogValue
    )
  ){
    return true;
  }

  if(
    properties?.facilities?.dogs ===
    true
  ){
    return true;
  }

  return null;

}


/* =========================================================
PHOTO
========================================================= */

function extractPhoto(
  properties
){

  const raw =
    properties?.datasource?.raw ||
    {};

  const candidates = [
    properties?.image,
    properties?.photo,
    raw.image,
    raw["image:url"],
    raw.photo
  ];

  for(
    const item
    of
    candidates
  ){

    const url =
      safeUrl(item);

    if(url){
      return url;
    }

  }

  return "";

}


/* =========================================================
WEBSITE / PHONE
========================================================= */

function extractWebsite(
  properties
){

  const raw =
    properties?.datasource?.raw ||
    {};

  return safeUrl(
    properties?.website ||
    properties?.contact?.website ||
    raw.website ||
    raw["contact:website"] ||
    ""
  );

}


function extractPhone(
  properties
){

  const raw =
    properties?.datasource?.raw ||
    {};

  return cleanString(
    properties?.contact?.phone ||
    properties?.contact?.mobile ||
    raw.phone ||
    raw["contact:phone"] ||
    raw["contact:mobile"] ||
    "",
    120
  );

}


/* =========================================================
GEOAPIFY NORMALISATION
========================================================= */

function normalizeGeoFeature(
  feature,
  center = null,
  categoryHint = ""
){

  if(
    !feature ||
    typeof feature !== "object"
  ){
    return null;
  }

  const properties =
    feature.properties ||
    {};

  const coordinates =
    safeArray(
      feature?.geometry?.coordinates
    );

  const lat =
    numberOrNull(
      properties.lat ??
      coordinates[1]
    );

  const lng =
    numberOrNull(
      properties.lon ??
      coordinates[0]
    );

  if(
    lat === null ||
    lng === null
  ){
    return null;
  }

  const name =
    cleanString(
      properties.name ||
      properties.address_line1 ||
      properties.formatted ||
      "Pet-friendly place",
      300
    );

  const category =
    (
      categoryHint &&
      categoryHint !== "all"
    )
      ? categoryHint
      : detectCategory(
          properties.categories,
          properties?.datasource?.raw,
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
      800
    );

  const photo =
    extractPhoto(
      properties
    );

  const providerId =
    cleanString(
      properties.place_id ||
      properties.datasource?.raw?.osm_id ||
      `${lat}-${lng}`,
      500
    );

  const distance =
    center
      ? distanceKm(
          center.lat,
          center.lng,
          lat,
          lng
        )
      : numberOrNull(
          properties.distance
        );

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query="
    +
    encodeURIComponent(
      `${lat},${lng}`
    );

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
      lat,
      lng
    },

    distance,

    rating:
      null,

    ratingCount:
      0,

    website:
      extractWebsite(
        properties
      ),

    phone:
      extractPhone(
        properties
      ),

    googleMapsUrl,

    photos:
      photo
      ? [photo]
      : [],

    photo,

    allowsDogs:
      detectAllowsDogs(
        properties,
        category
      ),

    openNow:
      null

  };

}


/* =========================================================
DEDUPLICATION
========================================================= */

function identityKey(place){

  if(
    place?.providerId
  ){
    return (
      "id:" +
      place.providerId
    );
  }

  return [
    cleanString(
      place?.name,
      300
    )
    .toLowerCase()
    .replace(
      /[^\p{L}\p{N}]+/gu,
      ""
    ),

    Number(
      place?.location?.lat ||
      0
    )
    .toFixed(4),

    Number(
      place?.location?.lng ||
      0
    )
    .toFixed(4)

  ]
  .join("|");

}


function mergePlaces(
  groups,
  maxResults
){

  const map =
    new Map();

  safeArray(groups)
  .flat()
  .filter(Boolean)
  .forEach(
    place => {

      const key =
        identityKey(
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
            place.allowsDogs === true ||
            existing.allowsDogs === true
              ? true
              : (
                  place.allowsDogs === false &&
                  existing.allowsDogs === false
                )
                ? false
                : null
        }
      );

    }
  );

  return Array.from(
    map.values()
  )
  .sort(
    (a,b) =>
      (
        a.distance ??
        999999
      )
      -
      (
        b.distance ??
        999999
      )
  )
  .slice(
    0,
    maxResults
  );

}


/* =========================================================
GEOAPIFY PLACES REQUEST
========================================================= */

async function geoapifyPlacesRequest({
  latitude,
  longitude,
  radius,
  categories,
  conditions = "",
  language = "en",
  limit = 40
}){

  if(!GEOAPIFY_API_KEY){
    return [];
  }

  if(
    !categories ||
    !categories.length
  ){
    return [];
  }

  const url =
    new URL(
      GEOAPIFY_PLACES_URL
    );

  url.searchParams.set(
    "categories",
    unique(
      categories
    )
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
          Accept:"application/json"
        }
      }
    );

  return safeArray(
    data?.features
  );

}


/* =========================================================
CATEGORY SEARCH
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
      limit:maxResults
    });

  const center = {
    lat:latitude,
    lng:longitude
  };

  return features
    .map(
      feature =>
        normalizeGeoFeature(
          feature,
          center,
          category
        )
    )
    .filter(Boolean)
    .filter(
      place =>
        place.allowsDogs !==
        false
    );

}


/* =========================================================
ALL CATEGORIES SEARCH

Only confirmed dog-friendly lifestyle places are included here.
Pet services are inherently relevant and are fetched separately.
This keeps the "All categories" feed useful.
========================================================= */

async function searchAllCategories({
  latitude,
  longitude,
  radius,
  maxResults,
  language
}){

  const lifestyleLimit =
    Math.min(
      40,
      maxResults
    );

  const petLimit =
    Math.min(
      20,
      maxResults
    );

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
        conditions:
          "dogs",
        language,
        limit:lifestyleLimit
      }),

      geoapifyPlacesRequest({
        latitude,
        longitude,
        radius,
        categories:
          ALL_PET_SERVICE_CATEGORIES,
        language,
        limit:petLimit
      })

    ]);

  const center = {
    lat:latitude,
    lng:longitude
  };

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
      feature =>
        normalizeGeoFeature(
          feature,
          center,
          ""
        )
    )
    .filter(Boolean)
    .map(
      place => ({
        ...place,
        allowsDogs:
          place.allowsDogs === false
            ? false
            : true
      })
    )
    .filter(
      place =>
        place.allowsDogs !==
        false
    );

  const petServices =
    petFeatures
    .map(
      feature =>
        normalizeGeoFeature(
          feature,
          center,
          ""
        )
    )
    .filter(Boolean)
    .map(
      place => ({
        ...place,
        allowsDogs:true
      })
    );

  return mergePlaces(
    [
      lifestyle,
      petServices
    ],
    maxResults
  );

}/* =========================================================
AUTOCOMPLETE
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
    "8"
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
          Accept:"application/json"
        }
      }
    );

  return safeArray(
    data?.results
  )
  .map(
    item => {

      const placeId =
        cleanString(
          item.place_id,
          500
        );

      const name =
        cleanString(
          item.name ||
          item.address_line1 ||
          item.formatted ||
          "",
          300
        );

      const address =
        cleanString(
          item.formatted ||
          [
            item.address_line1,
            item.address_line2
          ]
          .filter(Boolean)
          .join(", "),
          800
        );

      return {

        placeId,

        name,

        address,

        text:
          address ||
          name,

        latitude:
          numberOrNull(
            item.lat
          ),

        longitude:
          numberOrNull(
            item.lon
          ),

        distanceMeters:
          numberOrNull(
            item.distance
          ),

        source:
          "geoapify"

      };

    }
  )
  .filter(
    item =>
      item.placeId
  );

}


/* =========================================================
NOMINATIM AUTOCOMPLETE FALLBACK

Used when Geoapify key is absent or autocomplete fails.
========================================================= */

function encodeNominatimPlace(
  item
){

  const payload = {

    lat:
      numberOrNull(
        item.lat
      ),

    lon:
      numberOrNull(
        item.lon
      ),

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
        800
      )

  };

  return (
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
    )
  );

}


function decodeNominatimPlace(
  placeId
){

  const value =
    cleanString(
      placeId,
      4000
    );

  if(
    !value.startsWith(
      "nom:"
    )
  ){
    return null;
  }

  try{

    return JSON.parse(
      Buffer
      .from(
        value.slice(4),
        "base64url"
      )
      .toString(
        "utf8"
      )
    );

  }catch(error){

    return null;

  }

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
          Accept:"application/json",
          "User-Agent":
            "PETS-DOGUE/1.0 petsanddogue.com"
        }
      }
    );

  return safeArray(data)
    .map(
      item => {

        const name =
          cleanString(
            item.name ||
            String(
              item.display_name ||
              ""
            )
            .split(",")[0],
            300
          );

        return {

          placeId:
            encodeNominatimPlace(
              item
            ),

          name,

          address:
            cleanString(
              item.display_name,
              800
            ),

          text:
            cleanString(
              item.display_name,
              800
            ),

          latitude:
            numberOrNull(
              item.lat
            ),

          longitude:
            numberOrNull(
              item.lon
            ),

          distanceMeters:
            null,

          source:
            "osm"

        };

      }
    )
    .filter(
      item =>
        item.placeId
    );

}


/* =========================================================
PLACE DETAILS — GEOAPIFY
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
      url.toString(),
      {
        headers:{
          Accept:"application/json"
        }
      }
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


/* =========================================================
PLACE DETAILS — NOMINATIM FALLBACK
========================================================= */

async function nominatimDetails(
  placeId,
  language
){

  const stored =
    decodeNominatimPlace(
      placeId
    );

  if(
    !stored ||
    !Number.isFinite(
      Number(stored.lat)
    )
    ||
    !Number.isFinite(
      Number(stored.lon)
    )
  ){
    return null;
  }

  const latitude =
    Number(
      stored.lat
    );

  const longitude =
    Number(
      stored.lon
    );

  let reverse =
    null;

  try{

    const url =
      new URL(
        NOMINATIM_REVERSE_URL
      );

    url.searchParams.set(
      "format",
      "jsonv2"
    );

    url.searchParams.set(
      "lat",
      String(latitude)
    );

    url.searchParams.set(
      "lon",
      String(longitude)
    );

    url.searchParams.set(
      "zoom",
      "18"
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

    reverse =
      await fetchJson(
        url.toString(),
        {
          headers:{
            Accept:"application/json",
            "User-Agent":
              "PETS-DOGUE/1.0 petsanddogue.com"
          }
        },
        6500
      );

  }catch(error){}

  const name =
    cleanString(
      reverse?.name ||
      stored.name ||
      "Pet-friendly place",
      300
    );

  const address =
    cleanString(
      reverse?.display_name ||
      stored.address ||
      "",
      800
    );

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query="
    +
    encodeURIComponent(
      `${latitude},${longitude}`
    );

  return {

    id:
      placeId,

    providerId:
      placeId,

    source:
      "osm",

    name,

    category:
      "other",

    address,

    location:{
      lat:latitude,
      lng:longitude
    },

    rating:null,
    ratingCount:0,

    website:"",
    phone:"",

    googleMapsUrl,

    photos:[],
    photo:"",

    allowsDogs:null,
    openNow:null

  };

}


/* =========================================================
AUTOCOMPLETE ACTION
========================================================= */

async function handleAutocomplete(
  body
){

  const query =
    cleanString(
      body?.query,
      300
    );

  if(
    query.length < 2
  ){

    return {
      ok:true,
      suggestions:[]
    };

  }

  const latitude =
    numberOrNull(
      body?.latitude
    );

  const longitude =
    numberOrNull(
      body?.longitude
    );

  const language =
    normalizeLanguage(
      body?.language
    );

  if(
    GEOAPIFY_API_KEY
  ){

    try{

      const suggestions =
        await geoapifyAutocomplete({
          query,
          latitude,
          longitude,
          language
        });

      if(
        suggestions.length
      ){

        return {
          ok:true,
          provider:"geoapify",
          suggestions
        };

      }

    }catch(error){

      console.warn(
        "Geoapify autocomplete:",
        error?.message ||
        error
      );

    }

  }

  try{

    const suggestions =
      await nominatimAutocomplete({
        query,
        language
      });

    return {
      ok:true,
      provider:"openstreetmap",
      suggestions
    };

  }catch(error){

    console.warn(
      "Nominatim autocomplete:",
      error?.message ||
      error
    );

    return {
      ok:true,
      provider:"openstreetmap",
      suggestions:[]
    };

  }

}


/* =========================================================
DETAILS ACTION
========================================================= */

async function handleDetails(
  body
){

  const placeId =
    cleanString(
      body?.placeId,
      4000
    );

  const language =
    normalizeLanguage(
      body?.language
    );

  if(!placeId){

    return {
      ok:false,
      error:
        "Missing placeId"
    };

  }

  if(
    placeId.startsWith(
      "nom:"
    )
  ){

    const place =
      await nominatimDetails(
        placeId,
        language
      );

    return {
      ok:Boolean(place),
      provider:"openstreetmap",
      place
    };

  }

  if(
    GEOAPIFY_API_KEY
  ){

    try{

      const place =
        await geoapifyDetails(
          placeId,
          language
        );

      if(place){

        return {
          ok:true,
          provider:"geoapify",
          place
        };

      }

    }catch(error){

      console.warn(
        "Geoapify details:",
        error?.message ||
        error
      );

    }

  }

  return {
    ok:false,
    error:
      "Place details unavailable",
    place:null
  };

}/* =========================================================
NEARBY SEARCH
========================================================= */

async function handleNearby(
  body
){

  const latitude =
    numberOrNull(
      body?.latitude
    );

  const longitude =
    numberOrNull(
      body?.longitude
    );

  if(
    latitude === null ||
    longitude === null ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ){

    return {
      status:400,
      payload:{
        ok:false,
        error:
          "Invalid latitude or longitude"
      }
    };

  }

  const radius =
    clamp(
      Number(
        body?.radius ||
        DEFAULT_RADIUS_METERS
      ),
      100,
      MAX_RADIUS_METERS
    );

  const maxResults =
    clamp(
      Number(
        body?.maxResults ||
        DEFAULT_MAX_RESULTS
      ),
      1,
      MAX_RESULTS
    );

  const category =
    normalizeCategory(
      body?.category
    );

  const language =
    normalizeLanguage(
      body?.language
    );

  /*
  Saved is handled in the browser/local storage,
  so the API does not need to search it.
  */

  if(
    category === "saved"
  ){

    return {
      status:200,
      payload:{
        ok:true,
        provider:
          GEOAPIFY_API_KEY
          ? "geoapify"
          : "openstreetmap",
        places:[]
      }
    };

  }

  /*
  If the Geoapify key is absent,
  return a successful empty result.

  The browser will immediately continue
  with its existing Overpass / OpenStreetMap fallback.
  */

  if(
    !GEOAPIFY_API_KEY
  ){

    return {
      status:200,
      payload:{
        ok:true,
        provider:"openstreetmap-fallback",
        places:[],
        note:
          "GEOAPIFY_API_KEY is not configured"
      }
    };

  }

  try{

    let places = [];

    if(
      category === "all"
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

    /*
    Strict radius check on our side as well.
    */

    places =
      places
      .filter(
        place => {

          const distance =
            numberOrNull(
              place.distance
            );

          return (
            distance === null ||
            distance <=
            (
              radius /
              1000
            )
            +
            0.25
          );

        }
      )
      .slice(
        0,
        maxResults
      );

    return {
      status:200,
      payload:{
        ok:true,
        provider:"geoapify",
        category,
        count:places.length,
        places
      }
    };

  }catch(error){

    console.error(
      "Pet-friendly nearby search:",
      error
    );

    /*
    Do NOT hard-fail the page.
    The browser can continue with Overpass.
    */

    return {
      status:200,
      payload:{
        ok:true,
        provider:"openstreetmap-fallback",
        category,
        places:[],
        warning:
          cleanString(
            error?.message ||
            "Geoapify unavailable",
            500
          )
      }
    };

  }

}


/* =========================================================
MAIN HANDLER
========================================================= */

module.exports =
async function handler(
  req,
  res
){

  setCommonHeaders(
    res
  );

  if(
    req.method ===
    "OPTIONS"
  ){

    res
    .status(204)
    .end();

    return;

  }


  /*
  Old Google-photo proxy is no longer used.
  Keep GET harmless so old cached clients do not crash.
  */

  if(
    req.method ===
    "GET"
  ){

    res
    .status(200)
    .json({
      ok:true,
      provider:"geoapify",
      message:
        "PETS & DOGUE Pet-Friendly Places API"
    });

    return;

  }


  if(
    req.method !==
    "POST"
  ){

    res
    .status(405)
    .json({
      ok:false,
      error:
        "Method not allowed"
    });

    return;

  }


  const body =
    req.body &&
    typeof req.body ===
    "object"
      ? req.body
      : {};


  const action =
    cleanString(
      body.action,
      50
    )
    .toLowerCase();


  /*
  AUTOCOMPLETE
  */

  if(
    action ===
    "autocomplete"
  ){

    try{

      const result =
        await handleAutocomplete(
          body
        );

      res
      .status(200)
      .json(
        result
      );

    }catch(error){

      console.error(
        "Autocomplete:",
        error
      );

      res
      .status(200)
      .json({
        ok:true,
        suggestions:[]
      });

    }

    return;

  }


  /*
  DETAILS
  */

  if(
    action ===
    "details"
  ){

    try{

      const result =
        await handleDetails(
          body
        );

      res
      .status(
        result.ok
          ? 200
          : 404
      )
      .json(
        result
      );

    }catch(error){

      console.error(
        "Place details:",
        error
      );

      res
      .status(404)
      .json({
        ok:false,
        error:
          "Place details unavailable",
        place:null
      });

    }

    return;

  }


  /*
  NEARBY SEARCH
  */

  const result =
    await handleNearby(
      body
    );

  res
  .status(
    result.status
  )
  .json(
    result.payload
  );

};
