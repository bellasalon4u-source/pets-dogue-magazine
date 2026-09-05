"use strict";

/*
=========================================================
PETS & DOGUE
PET-FRIENDLY PLACES API
Vercel Serverless Function
=========================================================

Required environment variable:

GOOGLE_PLACES_API_KEY
or
GOOGLE_MAPS_API_KEY

SUPPORTED REQUESTS

POST
/api/pet-friendly-places

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

Supported categories:
- all
- cafe
- restaurant
- pub
- pizzeria
- hotel
- park
- beach
- veterinary
- pet-shop
- grooming
- events

2. Google Places autocomplete
{
  action:"autocomplete",
  query:"The Latchmere",
  language:"en",
  sessionToken:"...",
  latitude:51.5,
  longitude:-0.1,
  radius:15000,
  regionCode:"uk"
}

3. Google Place Details
{
  action:"details",
  placeId:"...",
  language:"en",
  sessionToken:"...",
  regionCode:"uk"
}

GET
/api/pet-friendly-places?photo=...

Securely proxies real Google place photographs.

IMPORTANT

The Google API key never reaches the browser.

Search behaviour:
- individual categories may include places whose pet policy is unknown;
- places explicitly marked as not allowing dogs are excluded;
- "all" contains every category, including events, but only
  confirmed pet-friendly / inherently animal-service places;
- Google photos are requested directly in search results and
  missing-photo records are enriched through Place Details.
=========================================================
*/


/* =========================================================
   CONFIG
========================================================= */

const GOOGLE_API_KEY =
  process.env.GOOGLE_PLACES_API_KEY ||
  process.env.GOOGLE_MAPS_API_KEY ||
  "";

const GOOGLE_NEARBY_URL =
  "https://places.googleapis.com/v1/places:searchNearby";

const GOOGLE_TEXT_URL =
  "https://places.googleapis.com/v1/places:searchText";

const GOOGLE_AUTOCOMPLETE_URL =
  "https://places.googleapis.com/v1/places:autocomplete";

const GOOGLE_PLACE_BASE =
  "https://places.googleapis.com/v1";

const DEFAULT_MAX_RESULTS = 40;
const MAX_RESULTS = 60;
const GOOGLE_MAX_RESULTS_PER_REQUEST = 20;
const ALL_CATEGORY_RESULTS_PER_CATEGORY = 10;
const MAX_RADIUS_METERS = 50000;
const AUTOCOMPLETE_RADIUS_DEFAULT = 20000;
const AUTOCOMPLETE_RADIUS_MIN = 100;
const AUTOCOMPLETE_RADIUS_MAX = 50000;
const PHOTO_WIDTH_DEFAULT = 1000;
const PHOTO_WIDTH_MIN = 200;
const PHOTO_WIDTH_MAX = 1600;


/* =========================================================
   CATEGORY CONFIG
========================================================= */

const CATEGORY_TYPES = {

  cafe:[
    "cafe",
    "coffee_shop",
    "bakery",
    "tea_house",
    "brunch_restaurant",
    "dog_cafe",
    "cat_cafe"
  ],

  restaurant:[
    "restaurant",
    "buffet_restaurant",
    "family_restaurant",
    "food_court",
    "bar_and_grill",
    "bistro",
    "breakfast_restaurant",
    "brunch_restaurant",
    "fine_dining_restaurant",
    "fast_food_restaurant"
  ],

  pub:[
    "pub",
    "gastropub",
    "brewpub",
    "beer_garden",
    "irish_pub"
  ],

  pizzeria:[
    "pizza_restaurant"
  ],

  hotel:[
    "hotel",
    "lodging",
    "guest_house",
    "bed_and_breakfast",
    "hostel",
    "inn",
    "motel",
    "resort_hotel",
    "extended_stay_hotel",
    "cottage",
    "campground"
  ],

  veterinary:[
    "veterinary_care"
  ],

  "pet-shop":[
    "pet_store"
  ],

  grooming:[
    "pet_care"
  ],

  "dog-park":[
    "dog_park"
  ],

  park:[
    "dog_park",
    "park"
  ],

  beach:[
    "beach"
  ],

  events:[
    "event_venue"
  ]

};

const ALL_SEARCH_CATEGORIES = [
  "cafe",
  "restaurant",
  "pub",
  "pizzeria",
  "hotel",
  "park",
  "beach",
  "veterinary",
  "pet-shop",
  "grooming",
  "events"
];

const TEXT_QUERIES = {

  cafe:
    "pet friendly dog friendly cafe coffee shop",

  restaurant:
    "pet friendly dog friendly restaurant buffet",

  pub:
    "dog friendly pet friendly pub gastropub beer garden",

  pizzeria:
    "dog friendly pet friendly pizzeria pizza restaurant",

  hotel:
    "pet friendly dog friendly hotel guest house accommodation",

  veterinary:
    "veterinary clinic vet animal hospital",

  "pet-shop":
    "pet shop pet store",

  grooming:
    "pet groomer dog groomer cat groomer grooming salon",

  "dog-park":
    "dog park",

  park:
    "dog friendly park dog park",

  beach:
    "dog friendly beach",

  events:
    "dog friendly pet friendly event dog show pet event"

};


/* =========================================================
   FIELD MASKS
========================================================= */

const SEARCH_FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.primaryType",
  "places.primaryTypeDisplayName",
  "places.types",
  "places.rating",
  "places.userRatingCount",
  "places.websiteUri",
  "places.googleMapsUri",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.regularOpeningHours",
  "places.currentOpeningHours",
  "places.photos",
  "places.businessStatus",
  "places.allowsDogs"
].join(",");

const DETAILS_FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "location",
  "primaryType",
  "primaryTypeDisplayName",
  "types",
  "rating",
  "userRatingCount",
  "websiteUri",
  "googleMapsUri",
  "nationalPhoneNumber",
  "internationalPhoneNumber",
  "regularOpeningHours",
  "currentOpeningHours",
  "photos",
  "businessStatus",
  "allowsDogs"
].join(",");

const AUTOCOMPLETE_FIELD_MASK = [
  "suggestions.placePrediction.place",
  "suggestions.placePrediction.placeId",
  "suggestions.placePrediction.text.text",
  "suggestions.placePrediction.structuredFormat.mainText.text",
  "suggestions.placePrediction.structuredFormat.secondaryText.text",
  "suggestions.placePrediction.types",
  "suggestions.placePrediction.distanceMeters"
].join(",");


/* =========================================================
   COMMON HEADERS
========================================================= */

function setCommonHeaders(response){

  response.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS"
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


/* =========================================================
   BASIC HELPERS
========================================================= */

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


function uniqueStrings(values){

  return Array.from(
    new Set(
      safeArray(values)
        .map(
          value =>
            cleanString(
              value,
              200
            )
        )
        .filter(Boolean)
    )
  );

}


function normalizeIdentityText(value){

  return cleanString(
    value,
    600
  )
    .toLowerCase()
    .normalize(
      "NFKD"
    )
    .replace(
      /[^\p{L}\p{N}]+/gu,
      ""
    );

}


/* =========================================================
   LANGUAGE / REGION
========================================================= */

function normalizeLanguageCode(value){

  let language =
    cleanString(
      value,
      40
    )
      .replace(
        "_",
        "-"
      )
      .toLowerCase();

  const aliases = {

    ua:"uk",
    cz:"cs",
    gr:"el",
    se:"sv",
    dk:"da"

  };

  language =
    aliases[
      language
    ] ||
    language;

  if(
    !/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(
      language
    )
  ){

    return "";

  }

  return language;

}


function normalizeRegionCode(value){

  const region =
    cleanString(
      value,
      10
    )
      .toLowerCase();

  return /^[a-z]{2}$/.test(
    region
  )
    ? region
    : "";

}


function normalizeSessionToken(value){

  const token =
    cleanString(
      value,
      500
    );

  if(
    !token
  ){

    return "";

  }

  return token.replace(
    /[\u0000-\u001F\u007F]/g,
    ""
  );

}


/* =========================================================
   CATEGORY NORMALISATION
========================================================= */

function normalizeCategory(category){

  const value =
    cleanString(
      category,
      80
    )
      .toLowerCase();

  const aliases = {

    cafes:"cafe",
    coffee:"cafe",
    coffeeshop:"cafe",
    coffee_shop:"cafe",

    restaurants:"restaurant",
    buffet:"restaurant",
    buffets:"restaurant",
    buffet_restaurant:"restaurant",

    pubs:"pub",
    gastropub:"pub",
    gastropubs:"pub",
    beer_garden:"pub",

    pizza:"pizzeria",
    pizzas:"pizzeria",
    pizzerias:"pizzeria",
    pizza_restaurant:"pizzeria",

    hotels:"hotel",
    lodging:"hotel",
    motel:"hotel",
    resort:"hotel",

    vet:"veterinary",
    vets:"veterinary",
    veterinarian:"veterinary",
    veterinarians:"veterinary",
    veterinary_care:"veterinary",

    shop:"pet-shop",
    petshop:"pet-shop",
    "pet shop":"pet-shop",
    pet_store:"pet-shop",

    groom:"grooming",
    groomer:"grooming",
    groomers:"grooming",
    pet_groomer:"grooming",
    grooming_salon:"grooming",

    parks:"park",

    dogpark:"dog-park",
    "dog park":"dog-park",
    dog_park:"dog-park",

    beaches:"beach",

    event:"events",
    show:"events",
    shows:"events",

    all:"all"

  };

  return (
    aliases[
      value
    ] ||
    value ||
    "all"
  );

}


/* =========================================================
   GOOGLE PLACE TYPES / CATEGORY DETECTION
========================================================= */

function getPlaceTypes(place){

  const types =
    [];

  const primaryType =
    cleanString(
      place?.primaryType,
      160
    )
      .toLowerCase();

  if(
    primaryType
  ){

    types.push(
      primaryType
    );

  }

  safeArray(
    place?.types
  )
    .forEach(
      function(type){

        const normalized =
          cleanString(
            type,
            160
          )
            .toLowerCase();

        if(
          normalized &&
          !types.includes(
            normalized
          )
        ){

          types.push(
            normalized
          );

        }

      }
    );

  return types;

}


function hasExactType(
  types,
  values
){

  return values.some(
    value =>
      types.includes(
        value
      )
  );

}


function hasEndingType(
  types,
  ending
){

  return types.some(
    type =>
      (
        type === ending ||
        type.endsWith(
          "_" + ending
        )
      )
  );

}


function placeSearchText(place){

  return [

    typeof place?.displayName ===
    "string"
      ? place.displayName
      : place?.displayName?.text,

    place?.primaryTypeDisplayName?.text,

    place?.primaryType

  ]
    .filter(Boolean)
    .join(
      " "
    )
    .toLowerCase();

}


function detectCategoryFromTypes(place){

  const types =
    getPlaceTypes(
      place
    );

  const text =
    placeSearchText(
      place
    );

  if(
    hasExactType(
      types,
      [
        "veterinary_care",
        "veterinarian",
        "animal_hospital"
      ]
    )
  ){

    return "veterinary";

  }


  if(
    hasExactType(
      types,
      [
        "pet_store",
        "pet_supply_store"
      ]
    )
  ){

    return "pet-shop";

  }


  if(
    hasExactType(
      types,
      [
        "pet_care"
      ]
    ) &&
    /groom|grooming|pet salon|dog wash/.test(
      text
    )
  ){

    return "grooming";

  }


  if(
    hasExactType(
      types,
      [
        "pizza_restaurant"
      ]
    )
  ){

    return "pizzeria";

  }


  if(
    hasExactType(
      types,
      [
        "pub",
        "gastropub",
        "brewpub",
        "beer_garden",
        "irish_pub"
      ]
    )
  ){

    return "pub";

  }


  if(
    hasExactType(
      types,
      [
        "dog_park"
      ]
    )
  ){

    return "park";

  }


  if(
    hasExactType(
      types,
      [
        "beach"
      ]
    )
  ){

    return "beach";

  }


  if(
    hasExactType(
      types,
      [
        "hotel",
        "lodging",
        "motel",
        "hostel",
        "guest_house",
        "bed_and_breakfast",
        "resort_hotel",
        "extended_stay_hotel",
        "inn",
        "cottage",
        "campground"
      ]
    ) ||
    hasEndingType(
      types,
      "hotel"
    )
  ){

    return "hotel";

  }


  if(
    hasExactType(
      types,
      [
        "restaurant",
        "buffet_restaurant",
        "family_restaurant",
        "food_court",
        "bar_and_grill",
        "bistro",
        "breakfast_restaurant",
        "brunch_restaurant",
        "fine_dining_restaurant",
        "fast_food_restaurant"
      ]
    ) ||
    hasEndingType(
      types,
      "restaurant"
    )
  ){

    return "restaurant";

  }


  if(
    hasExactType(
      types,
      [
        "cafe",
        "coffee_shop",
        "coffee_store",
        "tea_house",
        "bakery",
        "dog_cafe",
        "cat_cafe"
      ]
    ) ||
    hasEndingType(
      types,
      "cafe"
    )
  ){

    return "cafe";

  }


  if(
    hasExactType(
      types,
      [
        "park"
      ]
    )
  ){

    return "park";

  }


  if(
    hasExactType(
      types,
      [
        "event_venue"
      ]
    )
  ){

    return "events";

  }


  return "other";

}


/* =========================================================
   DISPLAY / OPENING HOURS
========================================================= */

function getDisplayName(place){

  if(
    typeof place?.displayName ===
    "string"
  ){

    return cleanString(
      place.displayName,
      500
    );

  }

  return cleanString(
    place?.displayName?.text,
    500
  );

}


function normalizeOpeningHours(place){

  const hours =
    place?.currentOpeningHours ||
    place?.regularOpeningHours ||
    null;

  if(
    !hours
  ){

    return null;

  }

  return {

    openNow:
      typeof hours.openNow ===
      "boolean"
        ? hours.openNow
        : null,

    weekdayDescriptions:
      safeArray(
        hours.weekdayDescriptions
      )
        .map(
          item =>
            cleanString(
              item,
              300
            )
        )
        .filter(Boolean)

  };

}


/* =========================================================
   PHOTO NORMALISATION
========================================================= */

function getPhotoProxyUrl(
  photoName,
  width = PHOTO_WIDTH_DEFAULT
){

  const name =
    cleanString(
      photoName,
      1600
    );

  if(
    !name
  ){

    return "";

  }

  return (
    "/api/pet-friendly-places?photo=" +
    encodeURIComponent(
      name
    ) +
    "&width=" +
    encodeURIComponent(
      width
    )
  );

}


function normalizePhoto(photo){

  const name =
    cleanString(
      photo?.name,
      1600
    );

  if(
    !name
  ){

    return null;

  }

  return {

    name,

    widthPx:
      numberOrNull(
        photo?.widthPx
      ),

    heightPx:
      numberOrNull(
        photo?.heightPx
      ),

    url:
      getPhotoProxyUrl(
        name,
        PHOTO_WIDTH_DEFAULT
      )

  };

}


function getPhotos(place){

  return safeArray(
    place?.photos
  )
    .slice(
      0,
      10
    )
    .map(
      normalizePhoto
    )
    .filter(Boolean);

}


function placeHasPhoto(place){

  return Boolean(

    place?.photo?.url ||

    safeArray(
      place?.photos
    )
      .some(
        photo =>
          Boolean(
            photo?.url
          )
      )

  );

}


/* =========================================================
   PET-FRIENDLY SIGNALS
========================================================= */

function getAllowsDogsValue(place){

  return typeof place?.allowsDogs ===
    "boolean"
      ? place.allowsDogs
      : null;

}


function isNaturallyAnimalRelevant(
  category,
  place
){

  const types =
    getPlaceTypes(
      place
    );

  if(
    [
      "veterinary",
      "grooming"
    ].includes(
      category
    )
  ){

    return true;

  }

  if(
    hasExactType(
      types,
      [
        "dog_park",
        "dog_cafe",
        "cat_cafe"
      ]
    )
  ){

    return true;

  }

  return false;

}


function isConfirmedForAll(place){

  if(
    place?.allowsDogs ===
    true
  ){

    return true;

  }

  return isNaturallyAnimalRelevant(
    normalizeCategory(
      place?.category
    ),
    place
  );

}


/* =========================================================
   NORMALIZE GOOGLE PLACE
========================================================= */

function normalizeGooglePlace(
  place,
  requestedCategory = "all"
){

  const lat =
    numberOrNull(
      place?.location?.latitude
    );

  const lng =
    numberOrNull(
      place?.location?.longitude
    );

  if(
    lat === null ||
    lng === null
  ){

    return null;

  }

  const requested =
    normalizeCategory(
      requestedCategory
    );

  const detected =
    detectCategoryFromTypes(
      place
    );

  let category =
    requested;

  if(
    requested === "all" ||
    requested === "dog-park" ||
    !requested
  ){

    category =
      detected;

  }

  if(
    [
      "pub",
      "pizzeria"
    ].includes(
      detected
    ) ||
    (
      requested === "all" &&
      detected !== "other"
    )
  ){

    category =
      detected;

  }

  if(
    requested ===
    "grooming"
  ){

    category =
      "grooming";

  }

  if(
    category ===
    "dog-park"
  ){

    category =
      "park";

  }

  if(
    category === "other" &&
    detected !== "other"
  ){

    category =
      detected;

  }

  const photos =
    getPhotos(
      place
    );

  const photo =
    photos.length
      ? photos[0]
      : null;

  const allowsDogs =
    getAllowsDogsValue(
      place
    );

  const naturallyRelevant =
    isNaturallyAnimalRelevant(
      category,
      place
    );

  return {

    id:
      cleanString(
        place?.id,
        500
      ) ||
      (
        "google-" +
        lat +
        "-" +
        lng
      ),

    providerId:
      cleanString(
        place?.id,
        500
      ),

    source:
      "google",

    name:
      getDisplayName(
        place
      ) ||
      "Pet-friendly place",

    category,

    categoryLabel:
      cleanString(
        place?.primaryTypeDisplayName?.text ||
        place?.primaryType,
        250
      ),

    types:
      getPlaceTypes(
        place
      ),

    address:
      cleanString(
        place?.formattedAddress,
        800
      ),

    location:{
      lat,
      lng
    },

    rating:
      numberOrNull(
        place?.rating
      ),

    ratingCount:
      numberOrNull(
        place?.userRatingCount
      ) ||
      0,

    website:
      cleanString(
        place?.websiteUri,
        2000
      ),

    googleMapsUrl:
      cleanString(
        place?.googleMapsUri,
        2000
      ),

    phone:
      cleanString(
        place?.internationalPhoneNumber ||
        place?.nationalPhoneNumber,
        200
      ),

    businessStatus:
      cleanString(
        place?.businessStatus,
        120
      ),

    openingHours:
      normalizeOpeningHours(
        place
      ),

    allowsDogs,

    photo,

    photos,

    petFriendly:{

      allowed:
        allowsDogs === true ||
        naturallyRelevant,

      verified:
        allowsDogs !== null ||
        naturallyRelevant,

      source:
        allowsDogs === true
          ? "google_allows_dogs"
          : allowsDogs === false
            ? "google_allows_dogs_no"
            : naturallyRelevant
              ? "google_place_type"
              : "google_search"

    }

  };

}


/* =========================================================
   GOOGLE REQUEST HELPERS
========================================================= */

async function googlePost(
  url,
  body,
  fieldMask = SEARCH_FIELD_MASK
){

  const response =
    await fetch(
      url,
      {

        method:
          "POST",

        headers:{

          "Content-Type":
            "application/json",

          "X-Goog-Api-Key":
            GOOGLE_API_KEY,

          "X-Goog-FieldMask":
            fieldMask

        },

        body:
          JSON.stringify(
            body
          )

      }
    );

  const raw =
    await response.text();

  let data =
    {};

  if(
    raw
  ){

    try{

      data =
        JSON.parse(
          raw
        );

    }catch{

      data = {
        raw
      };

    }

  }

  if(
    !response.ok
  ){

    const message =
      cleanString(
        data?.error?.message ||
        data?.message ||
        "",
        1200
      );

    const error =
      new Error(
        message ||
        (
          "Google Places request failed with status " +
          response.status
        )
      );

    error.status =
      response.status;

    throw error;

  }

  return data;

}


async function fetchPlaceDetails(
  placeId,
  options = {}
){

  const id =
    cleanString(
      placeId,
      500
    );

  if(
    !id
  ){

    return null;

  }

  const query =
    new URLSearchParams();

  const language =
    normalizeLanguageCode(
      options.language
    );

  const regionCode =
    normalizeRegionCode(
      options.regionCode
    );

  const sessionToken =
    normalizeSessionToken(
      options.sessionToken
    );

  if(
    language
  ){

    query.set(
      "languageCode",
      language
    );

  }

  if(
    regionCode
  ){

    query.set(
      "regionCode",
      regionCode
    );

  }

  if(
    sessionToken
  ){

    query.set(
      "sessionToken",
      sessionToken
    );

  }

  const queryString =
    query.toString();

  const url =
    GOOGLE_PLACE_BASE +
    "/places/" +
    encodeURIComponent(
      id
    ) +
    (
      queryString
        ? "?" + queryString
        : ""
    );

  const response =
    await fetch(
      url,
      {

        method:
          "GET",

        headers:{

          "X-Goog-Api-Key":
            GOOGLE_API_KEY,

          "X-Goog-FieldMask":
            DETAILS_FIELD_MASK

        }

      }
    );

  const raw =
    await response.text();

  let data =
    null;

  if(
    raw
  ){

    try{

      data =
        JSON.parse(
          raw
        );

    }catch{

      data =
        null;

    }

  }

  if(
    !response.ok
  ){

    const message =
      cleanString(
        data?.error?.message ||
        data?.message ||
        "",
        1200
      );

    const error =
      new Error(
        message ||
        (
          "Google Place Details request failed with status " +
          response.status
        )
      );

    error.status =
      response.status;

    throw error;

  }

  return data;

}


/* =========================================================
   AUTOCOMPLETE
========================================================= */

function normalizeAutocompletePrediction(
  suggestion
){

  const prediction =
    suggestion?.placePrediction;

  if(
    !prediction
  ){

    return null;

  }

  const resourceName =
    cleanString(
      prediction.place,
      800
    );

  let placeId =
    cleanString(
      prediction.placeId,
      500
    );

  if(
    !placeId &&
    resourceName.startsWith(
      "places/"
    )
  ){

    placeId =
      resourceName.slice(
        "places/".length
      );

  }

  if(
    !placeId
  ){

    return null;

  }

  const fullText =
    cleanString(
      prediction?.text?.text,
      800
    );

  const mainText =
    cleanString(
      prediction?.structuredFormat?.mainText?.text,
      500
    ) ||
    fullText;

  const secondaryText =
    cleanString(
      prediction?.structuredFormat?.secondaryText?.text,
      800
    );

  return {

    placeId,

    place:
      resourceName ||
      (
        "places/" +
        placeId
      ),

    name:
      mainText,

    address:
      secondaryText,

    text:
      fullText ||
      [
        mainText,
        secondaryText
      ]
        .filter(Boolean)
        .join(
          ", "
        ),

    types:
      uniqueStrings(
        prediction.types
      ),

    distanceMeters:
      numberOrNull(
        prediction.distanceMeters
      )

  };

}


async function fetchAutocomplete(
  input,
  options = {}
){

  const query =
    cleanString(
      input,
      300
    );

  if(
    query.length <
    2
  ){

    return [];

  }

  const body = {

    input:
      query,

    includeQueryPredictions:
      false

  };

  const language =
    normalizeLanguageCode(
      options.language
    );

  const regionCode =
    normalizeRegionCode(
      options.regionCode
    );

  const sessionToken =
    normalizeSessionToken(
      options.sessionToken
    );

  if(
    language
  ){

    body.languageCode =
      language;

  }

  if(
    regionCode
  ){

    body.regionCode =
      regionCode;

  }

  if(
    sessionToken
  ){

    body.sessionToken =
      sessionToken;

  }

  const latitude =
    numberOrNull(
      options.latitude
    );

  const longitude =
    numberOrNull(
      options.longitude
    );

  if(
    latitude !== null &&
    longitude !== null &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  ){

    const requestedRadius =
      numberOrNull(
        options.radius
      ) ||
      AUTOCOMPLETE_RADIUS_DEFAULT;

    body.locationBias = {

      circle:{

        center:{
          latitude,
          longitude
        },

        radius:
          clamp(
            requestedRadius,
            AUTOCOMPLETE_RADIUS_MIN,
            AUTOCOMPLETE_RADIUS_MAX
          )

      }

    };

  }

  const data =
    await googlePost(
      GOOGLE_AUTOCOMPLETE_URL,
      body,
      AUTOCOMPLETE_FIELD_MASK
    );

  return safeArray(
    data?.suggestions
  )
    .map(
      normalizeAutocompletePrediction
    )
    .filter(Boolean)
    .slice(
      0,
      8
    );

}


/* =========================================================
   RAW PLACE ENRICHMENT
========================================================= */

function mergeRawPlaceData(
  original,
  details
){

  if(
    !details
  ){

    return original;

  }

  const result =
    Object.assign(
      {},
      original,
      details
    );

  [
    "displayName",
    "formattedAddress",
    "location",
    "primaryType",
    "primaryTypeDisplayName",
    "types",
    "rating",
    "userRatingCount",
    "websiteUri",
    "googleMapsUri",
    "nationalPhoneNumber",
    "internationalPhoneNumber",
    "regularOpeningHours",
    "currentOpeningHours",
    "photos",
    "businessStatus",
    "allowsDogs"
  ]
    .forEach(
      function(key){

        const value =
          details[
            key
          ];

        const emptyArray =
          Array.isArray(
            value
          ) &&
          value.length ===
          0;

        if(
          value === undefined ||
          value === null ||
          value === "" ||
          emptyArray
        ){

          result[
            key
          ] =
            original[
              key
            ];

        }

      }
    );

  return result;

}


async function enrichRawPlaceWithDetails(
  place,
  options = {}
){

  const hasPhotos =
    Array.isArray(
      place?.photos
    ) &&
    place.photos.length >
    0;

  if(
    hasPhotos
  ){

    return place;

  }

  const placeId =
    cleanString(
      place?.id,
      500
    );

  if(
    !placeId
  ){

    return place;

  }

  try{

    const details =
      await fetchPlaceDetails(
        placeId,
        options
      );

    return mergeRawPlaceData(
      place,
      details
    );

  }catch(
    error
  ){

    console.warn(
      "PETS & DOGUE photo enrichment failed:",
      placeId,
      error?.message ||
      error
    );

    return place;

  }

}


async function enrichSearchPlaces(
  places,
  options = {}
){

  return Promise.all(

    safeArray(
      places
    )
      .map(
        place =>
          enrichRawPlaceWithDetails(
            place,
            options
          )
      )

  );

}


/* =========================================================
   NEARBY SEARCH
========================================================= */

async function searchNearbyCategory(
  latitude,
  longitude,
  radius,
  category,
  maxResults,
  options = {}
){

  const normalizedCategory =
    normalizeCategory(
      category
    );

  const types =
    CATEGORY_TYPES[
      normalizedCategory
    ] ||
    [];

  if(
    !types.length
  ){

    return [];

  }

  const body = {

    includedTypes:
      uniqueStrings(
        types
      ),

    maxResultCount:
      clamp(
        maxResults,
        1,
        GOOGLE_MAX_RESULTS_PER_REQUEST
      ),

    rankPreference:
      "DISTANCE",

    locationRestriction:{

      circle:{

        center:{
          latitude,
          longitude
        },

        radius

      }

    }

  };

  if(
    options.language
  ){

    body.languageCode =
      options.language;

  }

  if(
    options.regionCode
  ){

    body.regionCode =
      options.regionCode;

  }

  const data =
    await googlePost(
      GOOGLE_NEARBY_URL,
      body
    );

  const rawPlaces =
    safeArray(
      data?.places
    );

  const enriched =
    await enrichSearchPlaces(
      rawPlaces,
      options
    );

  return enriched
    .map(
      place =>
        normalizeGooglePlace(
          place,
          normalizedCategory
        )
    )
    .filter(Boolean);

}


/* =========================================================
   TEXT SEARCH
========================================================= */

async function searchTextCategory(
  latitude,
  longitude,
  radius,
  category,
  maxResults,
  options = {}
){

  const normalizedCategory =
    normalizeCategory(
      category
    );

  const textQuery =
    TEXT_QUERIES[
      normalizedCategory
    ];

  if(
    !textQuery
  ){

    return [];

  }

  const body = {

    textQuery,

    pageSize:
      clamp(
        maxResults,
        1,
        GOOGLE_MAX_RESULTS_PER_REQUEST
      ),

    locationBias:{

      circle:{

        center:{
          latitude,
          longitude
        },

        radius

      }

    }

  };

  if(
    options.language
  ){

    body.languageCode =
      options.language;

  }

  if(
    options.regionCode
  ){

    body.regionCode =
      options.regionCode;

  }

  const data =
    await googlePost(
      GOOGLE_TEXT_URL,
      body
    );

  const rawPlaces =
    safeArray(
      data?.places
    );

  const enriched =
    await enrichSearchPlaces(
      rawPlaces,
      options
    );

  return enriched
    .map(
      place =>
        normalizeGooglePlace(
          place,
          normalizedCategory
        )
    )
    .filter(Boolean);

}


/* =========================================================
   DISTANCE / MERGE
========================================================= */

function haversineKm(
  lat1,
  lng1,
  lat2,
  lng2
){

  const earthRadius =
    6371;

  const toRad =
    value =>
      value *
      Math.PI /
      180;

  const dLat =
    toRad(
      lat2 -
      lat1
    );

  const dLng =
    toRad(
      lng2 -
      lng1
    );

  const a =
    Math.sin(
      dLat /
      2
    ) ** 2 +
    Math.cos(
      toRad(
        lat1
      )
    ) *
    Math.cos(
      toRad(
        lat2
      )
    ) *
    Math.sin(
      dLng /
      2
    ) ** 2;

  return (
    earthRadius *
    2 *
    Math.atan2(
      Math.sqrt(
        a
      ),
      Math.sqrt(
        1 -
        a
      )
    )
  );

}


function fallbackPlaceKey(place){

  const lat =
    numberOrNull(
      place?.location?.lat
    );

  const lng =
    numberOrNull(
      place?.location?.lng
    );

  const name =
    normalizeIdentityText(
      place?.name
    );

  if(
    lat !== null &&
    lng !== null
  ){

    return (
      name +
      "|" +
      lat.toFixed(
        5
      ) +
      "|" +
      lng.toFixed(
        5
      )
    );

  }

  return (
    name +
    "|" +
    normalizeIdentityText(
      place?.address
    )
  );

}


function mergePlaceRecords(
  existing,
  incoming
){

  if(
    !existing
  ){

    return incoming;

  }

  if(
    !incoming
  ){

    return existing;

  }

  const existingHasPhoto =
    placeHasPhoto(
      existing
    );

  const incomingHasPhoto =
    placeHasPhoto(
      incoming
    );

  let preferred =
    existing;

  let fallback =
    incoming;

  if(
    !existingHasPhoto &&
    incomingHasPhoto
  ){

    preferred =
      incoming;

    fallback =
      existing;

  }

  const merged =
    Object.assign(
      {},
      fallback,
      preferred
    );

  if(
    !cleanString(
      merged.name,
      500
    )
  ){

    merged.name =
      existing.name ||
      incoming.name ||
      "";

  }

  if(
    !cleanString(
      merged.address,
      800
    )
  ){

    merged.address =
      existing.address ||
      incoming.address ||
      "";

  }

  if(
    !cleanString(
      merged.website,
      2000
    )
  ){

    merged.website =
      existing.website ||
      incoming.website ||
      "";

  }

  if(
    !cleanString(
      merged.googleMapsUrl,
      2000
    )
  ){

    merged.googleMapsUrl =
      existing.googleMapsUrl ||
      incoming.googleMapsUrl ||
      "";

  }

  if(
    !cleanString(
      merged.phone,
      200
    )
  ){

    merged.phone =
      existing.phone ||
      incoming.phone ||
      "";

  }

  if(
    !merged.photo
  ){

    merged.photo =
      existing.photo ||
      incoming.photo ||
      null;

  }

  if(
    !safeArray(
      merged.photos
    ).length
  ){

    merged.photos =
      safeArray(
        existing.photos
      ).length
        ? existing.photos
        : safeArray(
            incoming.photos
          );

  }

  if(
    numberOrNull(
      merged.rating
    ) === null
  ){

    merged.rating =
      numberOrNull(
        existing.rating
      ) ??
      numberOrNull(
        incoming.rating
      );

  }

  if(
    !numberOrNull(
      merged.ratingCount
    )
  ){

    merged.ratingCount =
      numberOrNull(
        existing.ratingCount
      ) ||
      numberOrNull(
        incoming.ratingCount
      ) ||
      0;

  }

  if(
    !merged.openingHours
  ){

    merged.openingHours =
      existing.openingHours ||
      incoming.openingHours ||
      null;

  }

  if(
    !merged.location
  ){

    merged.location =
      existing.location ||
      incoming.location ||
      null;

  }

  if(
    existing.allowsDogs ===
      true ||
    incoming.allowsDogs ===
      true
  ){

    merged.allowsDogs =
      true;

  }else if(
    existing.allowsDogs ===
      false ||
    incoming.allowsDogs ===
      false
  ){

    merged.allowsDogs =
      false;

  }else{

    merged.allowsDogs =
      null;

  }

  const specialisedCategories = [
    "grooming",
    "pizzeria",
    "pub"
  ];

  const specialisedCategory =
    specialisedCategories.find(
      category =>
        (
          existing.category ===
            category ||
          incoming.category ===
            category
        )
    );

  if(
    specialisedCategory
  ){

    merged.category =
      specialisedCategory;

  }

  return merged;

}


function mergePlaces(
  places,
  latitude,
  longitude
){

  const placeMap =
    new Map();

  safeArray(
    places
  )
    .filter(Boolean)
    .forEach(
      function(place){

        const lat =
          numberOrNull(
            place?.location?.lat
          );

        const lng =
          numberOrNull(
            place?.location?.lng
          );

        if(
          lat === null ||
          lng === null
        ){

          return;

        }

        const providerId =
          cleanString(
            place?.providerId ||
            place?.id,
            600
          );

        const key =
          providerId
            ? (
                "google|" +
                providerId
              )
            : (
                "fallback|" +
                fallbackPlaceKey(
                  place
                )
              );

        if(
          !placeMap.has(
            key
          )
        ){

          placeMap.set(
            key,
            place
          );

        }else{

          placeMap.set(
            key,
            mergePlaceRecords(
              placeMap.get(
                key
              ),
              place
            )
          );

        }

      }
    );

  return Array.from(
    placeMap.values()
  )
    .map(
      place => ({
        ...place,

        distance:
          haversineKm(
            latitude,
            longitude,
            place.location.lat,
            place.location.lng
          )

      })
    );

}


function sortSearchResults(places){

  return safeArray(
    places
  )
    .slice()
    .sort(
      function(a,b){

        const distanceDifference =
          Number(
            a.distance
          ) -
          Number(
            b.distance
          );

        if(
          Math.abs(
            distanceDifference
          ) >
          0.75
        ){

          return distanceDifference;

        }

        const aPhoto =
          placeHasPhoto(
            a
          )
            ? 1
            : 0;

        const bPhoto =
          placeHasPhoto(
            b
          )
            ? 1
            : 0;

        if(
          aPhoto !==
          bPhoto
        ){

          return (
            bPhoto -
            aPhoto
          );

        }

        return (
          Number(
            b.rating ||
            0
          ) -
          Number(
            a.rating ||
            0
          )
        );

      }
    );

}


/* =========================================================
   SEARCH ONE CATEGORY
========================================================= */

async function searchOneCategory(
  latitude,
  longitude,
  radius,
  category,
  maxResults,
  options = {}
){

  const normalizedCategory =
    normalizeCategory(
      category
    );

  const nearbyPromise =
    searchNearbyCategory(
      latitude,
      longitude,
      radius,
      normalizedCategory,
      maxResults,
      options
    )
      .catch(
        function(error){

          console.warn(
            "PETS & DOGUE Nearby search failed:",
            normalizedCategory,
            error?.message ||
            error
          );

          return [];

        }
      );

  const textPromise =
    searchTextCategory(
      latitude,
      longitude,
      radius,
      normalizedCategory,
      maxResults,
      options
    )
      .catch(
        function(error){

          console.warn(
            "PETS & DOGUE Text search failed:",
            normalizedCategory,
            error?.message ||
            error
          );

          return [];

        }
      );

  const [
    nearby,
    text
  ] =
    await Promise.all([
      nearbyPromise,
      textPromise
    ]);

  const merged =
    mergePlaces(
      [
        ...nearby,
        ...text
      ],
      latitude,
      longitude
    );

  return sortSearchResults(
    merged.filter(
      function(place){

        return (
          place.distance <=
            (
              radius /
              1000
            ) +
            1 &&
          place.allowsDogs !==
            false
        );

      }
    )
  )
    .slice(
      0,
      maxResults
    );

}


/* =========================================================
   SEARCH ALL CATEGORIES
========================================================= */

async function searchAllCategories(
  latitude,
  longitude,
  radius,
  maxResults,
  options = {}
){

  const promises =
    ALL_SEARCH_CATEGORIES.map(
      function(category){

        return searchOneCategory(
          latitude,
          longitude,
          radius,
          category,
          ALL_CATEGORY_RESULTS_PER_CATEGORY,
          options
        )
          .catch(
            function(error){

              console.warn(
                "PETS & DOGUE category search failed:",
                category,
                error?.message ||
                error
              );

              return [];

            }
          );

      }
    );

  const groups =
    await Promise.all(
      promises
    );

  const places =
    mergePlaces(
      groups.flat(),
      latitude,
      longitude
    );

  return sortSearchResults(
    places.filter(
      function(place){

        return (
          place.distance <=
            (
              radius /
              1000
            ) +
            1 &&
          place.allowsDogs !==
            false &&
          isConfirmedForAll(
            place
          )
        );

      }
    )
  )
    .slice(
      0,
      maxResults
    );

}


/* =========================================================
   PHOTO PROXY
========================================================= */

function validPhotoResource(value){

  const photoName =
    cleanString(
      value,
      1600
    );

  return (
    photoName.startsWith(
      "places/"
    ) &&
    photoName.includes(
      "/photos/"
    ) &&
    photoName.length <
      1600 &&
    !photoName.includes(
      ".."
    ) &&
    !photoName.includes(
      "?"
    ) &&
    !photoName.includes(
      "#"
    )
  );

}


async function fetchGooglePhotoBytes(
  photoName,
  width
){

  const mediaUrl =
    GOOGLE_PLACE_BASE +
    "/" +
    photoName +
    "/media?maxWidthPx=" +
    encodeURIComponent(
      width
    );

  const response =
    await fetch(
      mediaUrl,
      {

        method:
          "GET",

        headers:{

          "X-Goog-Api-Key":
            GOOGLE_API_KEY,

          "Accept":
            "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"

        },

        redirect:
          "follow"

      }
    );

  if(
    !response.ok
  ){

    const error =
      new Error(
        "Google photo media request failed."
      );

    error.status =
      response.status;

    throw error;

  }

  const contentType =
    cleanString(
      response.headers.get(
        "content-type"
      ) ||
      "",
      150
    );

  if(
    !contentType.startsWith(
      "image/"
    )
  ){

    const error =
      new Error(
        "Google photo response was not an image."
      );

    error.status =
      502;

    throw error;

  }

  const buffer =
    Buffer.from(
      await response.arrayBuffer()
    );

  if(
    !buffer.length
  ){

    const error =
      new Error(
        "Google photo response was empty."
      );

    error.status =
      404;

    throw error;

  }

  return {
    buffer,
    contentType
  };

}


async function fetchGooglePhotoViaMetadata(
  photoName,
  width
){

  const metadataUrl =
    GOOGLE_PLACE_BASE +
    "/" +
    photoName +
    "/media?maxWidthPx=" +
    encodeURIComponent(
      width
    ) +
    "&skipHttpRedirect=true";

  const metadataResponse =
    await fetch(
      metadataUrl,
      {

        method:
          "GET",

        headers:{

          "X-Goog-Api-Key":
            GOOGLE_API_KEY,

          "Accept":
            "application/json"

        }

      }
    );

  if(
    !metadataResponse.ok
  ){

    const error =
      new Error(
        "Google photo metadata request failed."
      );

    error.status =
      metadataResponse.status;

    throw error;

  }

  const metadata =
    await metadataResponse
      .json()
      .catch(
        function(){

          return null;

        }
      );

  const photoUri =
    cleanString(
      metadata?.photoUri,
      4000
    );

  if(
    !photoUri
  ){

    const error =
      new Error(
        "Google photo URL was not returned."
      );

    error.status =
      404;

    throw error;

  }

  const imageResponse =
    await fetch(
      photoUri,
      {
        redirect:
          "follow"
      }
    );

  if(
    !imageResponse.ok
  ){

    const error =
      new Error(
        "Google photo image request failed."
      );

    error.status =
      imageResponse.status;

    throw error;

  }

  const contentType =
    cleanString(
      imageResponse.headers.get(
        "content-type"
      ) ||
      "",
      150
    );

  if(
    !contentType.startsWith(
      "image/"
    )
  ){

    const error =
      new Error(
        "Google photo metadata URL did not return an image."
      );

    error.status =
      502;

    throw error;

  }

  const buffer =
    Buffer.from(
      await imageResponse.arrayBuffer()
    );

  if(
    !buffer.length
  ){

    const error =
      new Error(
        "Google photo image was empty."
      );

    error.status =
      404;

    throw error;

  }

  return {
    buffer,
    contentType
  };

}


async function proxyGooglePhoto(
  request,
  response
){

  const photoName =
    cleanString(
      request.query?.photo,
      1600
    );

  if(
    !photoName
  ){

    return response
      .status(
        400
      )
      .json({

        ok:false,

        error:
          "Missing photo name."

      });

  }

  if(
    !validPhotoResource(
      photoName
    )
  ){

    return response
      .status(
        400
      )
      .json({

        ok:false,

        error:
          "Invalid photo resource."

      });

  }

  const requestedWidth =
    numberOrNull(
      request.query?.width
    ) ||
    PHOTO_WIDTH_DEFAULT;

  const width =
    Math.round(
      clamp(
        requestedWidth,
        PHOTO_WIDTH_MIN,
        PHOTO_WIDTH_MAX
      )
    );

  let image =
    null;

  try{

    image =
      await fetchGooglePhotoBytes(
        photoName,
        width
      );

  }catch(
    directError
  ){

    console.warn(
      "PETS & DOGUE direct Google photo request failed:",
      directError?.status ||
      "",
      directError?.message ||
      directError
    );

    try{

      image =
        await fetchGooglePhotoViaMetadata(
          photoName,
          width
        );

    }catch(
      metadataError
    ){

      console.error(
        "PETS & DOGUE Google photo failed completely:",
        {

          photoName,

          direct:
            directError?.message ||
            "",

          metadata:
            metadataError?.message ||
            ""

        }
      );

      return response
        .status(
          Number(
            metadataError?.status
          ) ||
          Number(
            directError?.status
          ) ||
          404
        )
        .json({

          ok:false,

          error:
            "Google photo could not be loaded."

        });

    }

  }

  response.setHeader(
    "Content-Type",
    image.contentType
  );

  response.setHeader(
    "Content-Length",
    String(
      image.buffer.length
    )
  );

  response.setHeader(
    "Cache-Control",
    "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000"
  );

  response.setHeader(
    "Cross-Origin-Resource-Policy",
    "cross-origin"
  );

  return response
    .status(
      200
    )
    .send(
      image.buffer
    );

}


/* =========================================================
   AUTOCOMPLETE HANDLER
========================================================= */

function readAutocompleteOptions(body){

  const latitude =
    numberOrNull(
      body.latitude ??
      body.lat
    );

  const longitude =
    numberOrNull(
      body.longitude ??
      body.lng
    );

  const coordinatesValid =
    latitude !== null &&
    longitude !== null &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180;

  const requestedRadius =
    numberOrNull(
      body.radius
    );

  return {

    language:
      normalizeLanguageCode(
        body.language ??
        body.languageCode
      ),

    regionCode:
      normalizeRegionCode(
        body.regionCode ??
        body.region
      ),

    sessionToken:
      normalizeSessionToken(
        body.sessionToken
      ),

    latitude:
      coordinatesValid
        ? latitude
        : null,

    longitude:
      coordinatesValid
        ? longitude
        : null,

    radius:
      requestedRadius === null
        ? AUTOCOMPLETE_RADIUS_DEFAULT
        : clamp(
            requestedRadius,
            AUTOCOMPLETE_RADIUS_MIN,
            AUTOCOMPLETE_RADIUS_MAX
          )

  };

}


async function handleAutocomplete(
  request,
  response
){

  const body =
    request.body &&
    typeof request.body ===
    "object"
      ? request.body
      : {};

  const query =
    cleanString(
      body.query ??
      body.input,
      300
    );

  if(
    query.length <
    2
  ){

    return response
      .status(
        200
      )
      .json({

        ok:true,

        source:
          "google_places_autocomplete",

        suggestions:[]

      });

  }

  const options =
    readAutocompleteOptions(
      body
    );

  const suggestions =
    await fetchAutocomplete(
      query,
      options
    );

  response.setHeader(
    "Cache-Control",
    "private, no-store"
  );

  return response
    .status(
      200
    )
    .json({

      ok:true,

      source:
        "google_places_autocomplete",

      query,

      count:
        suggestions.length,

      suggestions

    });

}


/* =========================================================
   PLACE DETAILS HANDLER
========================================================= */

async function handlePlaceDetails(
  request,
  response
){

  const body =
    request.body &&
    typeof request.body ===
    "object"
      ? request.body
      : {};

  const placeId =
    cleanString(
      body.placeId ??
      body.id,
      500
    );

  if(
    !placeId
  ){

    return response
      .status(
        400
      )
      .json({

        ok:false,

        error:
          "Place ID is required."

      });

  }

  const details =
    await fetchPlaceDetails(
      placeId,
      {

        language:
          body.language ??
          body.languageCode,

        regionCode:
          body.regionCode ??
          body.region,

        sessionToken:
          body.sessionToken

      }
    );

  if(
    !details
  ){

    return response
      .status(
        404
      )
      .json({

        ok:false,

        error:
          "Google place could not be found."

      });

  }

  const place =
    normalizeGooglePlace(
      details,
      "all"
    );

  if(
    !place
  ){

    return response
      .status(
        502
      )
      .json({

        ok:false,

        error:
          "Google returned an incomplete place record."

      });

  }

  response.setHeader(
    "Cache-Control",
    "private, no-store"
  );

  return response
    .status(
      200
    )
    .json({

      ok:true,

      source:
        "google_place_details",

      place

    });

}


/* =========================================================
   MAIN SEARCH HANDLER
========================================================= */

async function handleSearch(
  request,
  response
){

  const body =
    request.body &&
    typeof request.body ===
    "object"
      ? request.body
      : {};

  const latitude =
    numberOrNull(
      body.latitude ??
      body.lat
    );

  const longitude =
    numberOrNull(
      body.longitude ??
      body.lng
    );

  if(
    latitude === null ||
    longitude === null
  ){

    return response
      .status(
        400
      )
      .json({

        ok:false,

        error:
          "Latitude and longitude are required."

      });

  }

  if(
    latitude <
      -90 ||
    latitude >
      90 ||
    longitude <
      -180 ||
    longitude >
      180
  ){

    return response
      .status(
        400
      )
      .json({

        ok:false,

        error:
          "Invalid coordinates."

      });

  }

  const requestedRadius =
    numberOrNull(
      body.radius
    ) ||
    15000;

  const radius =
    clamp(
      requestedRadius,
      100,
      MAX_RADIUS_METERS
    );

  const requestedMaxResults =
    Math.round(
      numberOrNull(
        body.maxResults
      ) ||
      DEFAULT_MAX_RESULTS
    );

  const maxResults =
    clamp(
      requestedMaxResults,
      1,
      MAX_RESULTS
    );

  const category =
    normalizeCategory(
      body.category
    );

  const options = {

    language:
      normalizeLanguageCode(
        body.language ??
        body.languageCode
      ),

    regionCode:
      normalizeRegionCode(
        body.regionCode ??
        body.region
      )

  };

  let places =
    [];

  if(
    category ===
    "all"
  ){

    places =
      await searchAllCategories(
        latitude,
        longitude,
        radius,
        maxResults,
        options
      );

  }else{

    places =
      await searchOneCategory(
        latitude,
        longitude,
        radius,
        category,
        maxResults,
        options
      );

  }

  places =
    safeArray(
      places
    )
      .filter(
        function(place){

          return (
            numberOrNull(
              place?.location?.lat
            ) !== null &&
            numberOrNull(
              place?.location?.lng
            ) !== null
          );

        }
      );

  const photoCount =
    places.filter(
      placeHasPhoto
    ).length;

  response.setHeader(
    "Cache-Control",
    "s-maxage=120, stale-while-revalidate=600"
  );

  return response
    .status(
      200
    )
    .json({

      ok:true,

      source:
        "google_places",

      center:{
        latitude,
        longitude
      },

      radius,

      category,

      confirmedOnly:
        category ===
        "all",

      count:
        places.length,

      photoCount,

      missingPhotoCount:
        Math.max(
          0,
          places.length -
          photoCount
        ),

      places

    });

}


/* =========================================================
   POST ACTION ROUTER
========================================================= */

async function handlePost(
  request,
  response
){

  const body =
    request.body &&
    typeof request.body ===
    "object"
      ? request.body
      : {};

  const action =
    cleanString(
      body.action,
      80
    )
      .toLowerCase();

  if(
    action ===
    "autocomplete"
  ){

    return handleAutocomplete(
      request,
      response
    );

  }

  if(
    action ===
    "details"
  ){

    return handlePlaceDetails(
      request,
      response
    );

  }

  return handleSearch(
    request,
    response
  );

}


/* =========================================================
   API HANDLER
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

      return response
        .status(
          204
        )
        .end();

    }

    if(
      !GOOGLE_API_KEY
    ){

      console.error(
        "PETS & DOGUE: Google Places API key is missing."
      );

      return response
        .status(
          500
        )
        .json({

          ok:false,

          error:
            "Google Places API key is not configured. Add GOOGLE_PLACES_API_KEY or GOOGLE_MAPS_API_KEY in Vercel Environment Variables."

        });

    }

    try{

      if(
        request.method ===
          "GET" &&
        request.query?.photo
      ){

        return await proxyGooglePhoto(
          request,
          response
        );

      }

      if(
        request.method ===
        "GET"
      ){

        return response
          .status(
            200
          )
          .json({

            ok:true,

            service:
              "PETS & DOGUE Pet-Friendly Places API",

            configured:
              true,

            googlePlaces:
              true,

            nearbySearch:
              true,

            textSearch:
              true,

            autocomplete:
              true,

            placeDetails:
              true,

            placeDetailsPhotoEnrichment:
              true,

            photoProxy:
              true,

            categories:[
              "all",
              ...ALL_SEARCH_CATEGORIES
            ],

            allCategoryConfirmedOnly:
              true,

            maxResults:
              MAX_RESULTS

          });

      }

      if(
        request.method ===
        "POST"
      ){

        return await handlePost(
          request,
          response
        );

      }

      response.setHeader(
        "Allow",
        "GET, POST, OPTIONS"
      );

      return response
        .status(
          405
        )
        .json({

          ok:false,

          error:
            "Method not allowed."

        });

    }catch(
      error
    ){

      console.error(
        "PETS & DOGUE Pet-Friendly Places API error:",
        error
      );

      const upstreamStatus =
        Number(
          error?.status
        );

      let status =
        500;

      if(
        upstreamStatus ===
        400
      ){

        status =
          400;

      }else if(
        upstreamStatus ===
        404
      ){

        status =
          404;

      }else if(
        upstreamStatus ===
        429
      ){

        status =
          429;

      }else if(
        upstreamStatus ===
          401 ||
        upstreamStatus ===
          403 ||
        (
          upstreamStatus >=
            500 &&
          upstreamStatus <=
            599
        )
      ){

        status =
          502;

      }

      return response
        .status(
          status
        )
        .json({

          ok:false,

          error:
            cleanString(
              error?.message,
              1200
            ) ||
            "Unexpected server error."

        });

    }

  };
