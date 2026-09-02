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
  maxResults
}

2. Google Places autocomplete
{
  action:"autocomplete",
  query:"Pizza Express",
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

Autocomplete uses Google Places API (New).

After the user selects a prediction, Place Details retrieves
the canonical Google place record including:

- Google place ID
- official place name
- formatted address
- coordinates
- category/types
- rating
- website
- phone
- Google Maps URL
- opening hours
- photos
- allowsDogs when Google provides it

The same endpoint continues to support all existing nearby
search and photograph functionality.
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

const DEFAULT_MAX_RESULTS =
  20;

const MAX_RESULTS =
  20;

const MAX_RADIUS_METERS =
  50000;

const AUTOCOMPLETE_RADIUS_DEFAULT =
  20000;

const AUTOCOMPLETE_RADIUS_MIN =
  100;

const AUTOCOMPLETE_RADIUS_MAX =
  50000;

const PHOTO_WIDTH_DEFAULT =
  1000;

const PHOTO_WIDTH_MIN =
  200;

const PHOTO_WIDTH_MAX =
  1600;


/* =========================================================
   CATEGORY CONFIG
========================================================= */

const CATEGORY_TYPES = {

  cafe:[
    "cafe",
    "coffee_shop"
  ],

  restaurant:[
    "restaurant"
  ],

  hotel:[
    "hotel"
  ],

  veterinary:[
    "veterinary_care"
  ],

  "pet-shop":[
    "pet_store"
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

function setCommonHeaders(
  response
){

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

function numberOrNull(
  value
){

  const number =
    Number(value);

  return Number.isFinite(
    number
  )
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

  return String(
    value
  )
    .trim()
    .slice(
      0,
      maxLength
    );

}


function safeArray(
  value
){

  return Array.isArray(
    value
  )
    ? value
    : [];

}


function uniqueStrings(
  values
){

  return Array.from(
    new Set(
      safeArray(
        values
      )
        .map(
          function(value){

            return cleanString(
              value,
              200
            );

          }
        )
        .filter(Boolean)
    )
  );

}


/* =========================================================
   LANGUAGE / REGION
========================================================= */

function normalizeLanguageCode(
  value
){

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

  if(
    aliases[
      language
    ]
  ){

    language =
      aliases[
        language
      ];

  }

  /*
  PETS & DOGUE currently uses simple language codes,
  all of which are valid BCP-47 language tags.
  */

  if(
    !/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(
      language
    )
  ){

    return "";

  }

  return language;

}


function normalizeRegionCode(
  value
){

  const region =
    cleanString(
      value,
      10
    )
      .toLowerCase();

  if(
    !/^[a-z]{2}$/.test(
      region
    )
  ){

    return "";

  }

  return region;

}


function normalizeSessionToken(
  value
){

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

  /*
  Keep the token opaque.

  We only remove control characters before passing it
  to Google.
  */

  return token.replace(
    /[\u0000-\u001F\u007F]/g,
    ""
  );

}


/* =========================================================
   PHOTO PROXY URL
========================================================= */

function getPhotoProxyUrl(
  request,
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

  /*
  Always prefer a relative URL.

  This is safe across:
  - production domain
  - Vercel previews
  - custom domain
  - www / non-www
  */

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


/* =========================================================
   CATEGORY NORMALISATION
========================================================= */

function normalizeCategory(
  category
){

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

    park:"park",
    parks:"park",

    dogpark:"dog-park",
    "dog park":"dog-park",
    dog_park:"dog-park",

    beach:"beach",
    beaches:"beach",

    event:"events",
    events:"events",
    show:"events",
    shows:"events",

    all:"all"

  };

  return (
    aliases[value] ||
    value ||
    "all"
  );

}


/* =========================================================
   GOOGLE PLACE TYPES
========================================================= */

function getPlaceTypes(
  place
){

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
    function(value){

      return types.includes(
        value
      );

    }
  );

}


function hasEndingType(
  types,
  ending
){

  return types.some(
    function(type){

      return (
        type === ending ||
        type.endsWith(
          "_" + ending
        )
      );

    }
  );

}


function detectCategoryFromTypes(
  place
){

  const types =
    getPlaceTypes(
      place
    );


  /*
  VETERINARY
  */

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


  /*
  PET SHOP
  */

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


  /*
  DOG PARK
  */

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


  /*
  BEACH
  */

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


  /*
  HOTEL
  */

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
        "resort_hotel"
      ]
    ) ||
    hasEndingType(
      types,
      "hotel"
    )
  ){

    return "hotel";

  }


  /*
  RESTAURANT
  */

  if(
    hasExactType(
      types,
      [
        "restaurant",
        "bar",
        "pub",
        "food_court",
        "brasserie"
      ]
    ) ||
    hasEndingType(
      types,
      "restaurant"
    )
  ){

    return "restaurant";

  }


  /*
  CAFE
  */

  if(
    hasExactType(
      types,
      [
        "cafe",
        "coffee_shop",
        "coffee_store",
        "tea_house"
      ]
    ) ||
    hasEndingType(
      types,
      "cafe"
    )
  ){

    return "cafe";

  }


  /*
  PARK
  */

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


  /*
  EVENT
  */

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
   DISPLAY NAME
========================================================= */

function getDisplayName(
  place
){

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


/* =========================================================
   OPENING HOURS
========================================================= */

function normalizeOpeningHours(
  place
){

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
          function(item){

            return cleanString(
              item,
              300
            );

          }
        )
        .filter(Boolean)

  };

}


/* =========================================================
   PHOTO NORMALISATION
========================================================= */

function normalizePhoto(
  request,
  photo
){

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
        request,
        name,
        PHOTO_WIDTH_DEFAULT
      )

  };

}


function getPhotos(
  request,
  place
){

  return safeArray(
    place?.photos
  )
    .slice(
      0,
      10
    )
    .map(
      function(photo){

        return normalizePhoto(
          request,
          photo
        );

      }
    )
    .filter(Boolean);

}


function getPrimaryPhoto(
  request,
  place
){

  const photos =
    getPhotos(
      request,
      place
    );

  return photos.length
    ? photos[0]
    : null;

}


/* =========================================================
   PET-FRIENDLY DETECTION
========================================================= */

function isExplicitlyDogFriendly(
  place
){

  return (
    place?.allowsDogs ===
    true
  );

}


function categoryNaturallyPetRelevant(
  category
){

  return [
    "veterinary",
    "pet-shop",
    "park",
    "beach",
    "events"
  ].includes(
    category
  );

}


/* =========================================================
   NORMALIZE GOOGLE PLACE
========================================================= */

function normalizeGooglePlace(
  request,
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

  const detectedCategory =
    detectCategoryFromTypes(
      place
    );

  let category =
    normalizeCategory(
      requestedCategory
    );

  if(
    category === "all" ||
    category === "dog-park" ||
    !category
  ){

    category =
      detectedCategory;

  }

  if(
    category === "dog-park"
  ){

    category =
      "park";

  }

  if(
    category === "other" &&
    detectedCategory !== "other"
  ){

    category =
      detectedCategory;

  }

  const photos =
    getPhotos(
      request,
      place
    );

  const photo =
    photos.length
      ? photos[0]
      : null;

  const explicitDogFriendly =
    isExplicitlyDogFriendly(
      place
    );

  const naturallyPetRelevant =
    categoryNaturallyPetRelevant(
      category
    );

  const petFriendly =
    explicitDogFriendly ||
    naturallyPetRelevant;

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

    allowsDogs:
      explicitDogFriendly,

    photo,

    photos,

    petFriendly:{

      allowed:
        petFriendly,

      verified:
        explicitDogFriendly,

      source:
        explicitDogFriendly
          ? "google_allows_dogs"
          : naturallyPetRelevant
            ? "google_place_type"
            : "google_search"

    }

  };

}


/* =========================================================
   GOOGLE POST REQUEST
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


/* =========================================================
   GOOGLE PLACE DETAILS
========================================================= */

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
   AUTOCOMPLETE NORMALISATION
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
        .join(", "),

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


/* =========================================================
   GOOGLE AUTOCOMPLETE
========================================================= */

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

    const radius =
      clamp(
        requestedRadius,
        AUTOCOMPLETE_RADIUS_MIN,
        AUTOCOMPLETE_RADIUS_MAX
      );

    body.locationBias = {

      circle:{

        center:{
          latitude,
          longitude
        },

        radius

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
   MERGE RAW GOOGLE DATA
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
  ].forEach(
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


/* =========================================================
   PHOTO ENRICHMENT
========================================================= */

async function enrichRawPlaceWithDetails(
  place
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
        placeId
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


/* =========================================================
   ENRICH SEARCH RESULTS
========================================================= */

async function enrichSearchPlaces(
  places
){

  const values =
    safeArray(
      places
    );

  return Promise.all(
    values.map(
      function(place){

        return enrichRawPlaceWithDetails(
          place
        );

      }
    )
  );

}


/* =========================================================
   NEARBY SEARCH
========================================================= */

async function searchNearbyCategory(
  request,
  latitude,
  longitude,
  radius,
  category,
  maxResults
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
        MAX_RESULTS
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

  const data =
    await googlePost(
      GOOGLE_NEARBY_URL,
      body
    );

  const rawPlaces =
    safeArray(
      data?.places
    );

  const enrichedPlaces =
    await enrichSearchPlaces(
      rawPlaces
    );

  return enrichedPlaces
    .map(
      function(place){

        return normalizeGooglePlace(
          request,
          place,
          normalizedCategory
        );

      }
    )
    .filter(Boolean);

}


/* =========================================================
   TEXT SEARCH
========================================================= */

async function searchTextCategory(
  request,
  latitude,
  longitude,
  radius,
  category,
  maxResults
){

  const normalizedCategory =
    normalizeCategory(
      category
    );

  const queries = {

    cafe:
      "pet friendly cafe",

    restaurant:
      "pet friendly restaurant",

    hotel:
      "pet friendly hotel",

    veterinary:
      "veterinary clinic",

    "pet-shop":
      "pet shop",

    "dog-park":
      "dog park",

    park:
      "dog friendly park",

    beach:
      "dog friendly beach",

    events:
      "pet event dog show equestrian event"

  };

  const textQuery =
    queries[
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
        MAX_RESULTS
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

  const data =
    await googlePost(
      GOOGLE_TEXT_URL,
      body
    );

  const rawPlaces =
    safeArray(
      data?.places
    );

  const enrichedPlaces =
    await enrichSearchPlaces(
      rawPlaces
    );

  return enrichedPlaces
    .map(
      function(place){

        return normalizeGooglePlace(
          request,
          place,
          normalizedCategory
        );

      }
    )
    .filter(Boolean);

}


/* =========================================================
   DISTANCE
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
    function(value){

      return (
        value *
        Math.PI /
        180
      );

    };

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


/* =========================================================
   PHOTO CHECK
========================================================= */

function placeHasPhoto(
  place
){

  return Boolean(
    place?.photo?.url ||
    (
      Array.isArray(
        place?.photos
      ) &&
      place.photos.some(
        function(photo){

          return Boolean(
            photo?.url
          );

        }
      )
    )
  );

}


/* =========================================================
   DEDUPLICATION HELPERS
========================================================= */

function normalizePlaceIdentityText(
  value
){

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


function fallbackPlaceKey(
  place
){

  const lat =
    numberOrNull(
      place?.location?.lat
    );

  const lng =
    numberOrNull(
      place?.location?.lng
    );

  const name =
    normalizePlaceIdentityText(
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
    normalizePlaceIdentityText(
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

  /*
  Prefer the record that already contains a real photograph.
  */

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

  /*
  Preserve important fields if the preferred record
  happens to have an empty value.
  */

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
    !Array.isArray(
      merged.photos
    ) ||
    !merged.photos.length
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

  return merged;

}


/* =========================================================
   MERGE SEARCH RESULTS
========================================================= */

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
            ? "google|" + providerId
            : "fallback|" + fallbackPlaceKey(
                place
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

          return;

        }

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
    );

  return Array.from(
    placeMap.values()
  )
    .map(
      function(place){

        const distance =
          haversineKm(
            latitude,
            longitude,
            place.location.lat,
            place.location.lng
          );

        return Object.assign(
          {},
          place,
          {
            distance
          }
        );

      }
    )
    .sort(
      function(a,b){

        return (
          Number(
            a.distance
          ) -
          Number(
            b.distance
          )
        );

      }
    );

}


/* =========================================================
   RESULT SORTING
========================================================= */

function sortSearchResults(
  places
){

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

        /*
        Distance remains the primary signal.

        When places are less than about 750 metres apart,
        prefer a result with a real Google photograph.
        */

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
  request,
  latitude,
  longitude,
  radius,
  category,
  maxResults
){

  const normalizedCategory =
    normalizeCategory(
      category
    );

  const nearbyPromise =
    searchNearbyCategory(
      request,
      latitude,
      longitude,
      radius,
      normalizedCategory,
      maxResults
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
      request,
      latitude,
      longitude,
      radius,
      normalizedCategory,
      maxResults
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

  const result =
    await Promise.all([
      nearbyPromise,
      textPromise
    ]);

  const merged =
    mergePlaces(
      [
        ...result[0],
        ...result[1]
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
          1
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
  request,
  latitude,
  longitude,
  radius,
  maxResults
){

  const categories = [
    "cafe",
    "restaurant",
    "hotel",
    "veterinary",
    "pet-shop",
    "dog-park"
  ];

  const perCategory =
    8;

  const promises =
    categories.map(
      function(category){

        return searchOneCategory(
          request,
          latitude,
          longitude,
          radius,
          category,
          perCategory
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
    places
  )
    .slice(
      0,
      maxResults
    );

}


/* =========================================================
   PHOTO RESOURCE VALIDATION
========================================================= */

function validPhotoResource(
  value
){

  const photoName =
    cleanString(
      value,
      1600
    );

  /*
  Google photo resources currently look similar to:

  places/PLACE_ID/photos/PHOTO_REFERENCE

  Keep validation flexible enough for Google resource IDs
  while preventing malformed paths.
  */

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


/* =========================================================
   PHOTO MEDIA REQUEST
========================================================= */

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

    const details =
      await response
        .text()
        .catch(
          function(){

            return "";

          }
        );

    const error =
      new Error(
        "Google photo media request failed."
      );

    error.status =
      response.status;

    error.details =
      details.slice(
        0,
        500
      );

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

    error.details =
      contentType;

    throw error;

  }

  const arrayBuffer =
    await response.arrayBuffer();

  const buffer =
    Buffer.from(
      arrayBuffer
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


/* =========================================================
   PHOTO METADATA FALLBACK
========================================================= */

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

  const arrayBuffer =
    await imageResponse.arrayBuffer();

  const buffer =
    Buffer.from(
      arrayBuffer
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


/* =========================================================
   PHOTO PROXY
========================================================= */

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

  /*
  Attempt 1:
  Direct Google media request.
  */

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

    /*
    Attempt 2:
    Google metadata -> temporary photoUri.
    */

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
   AUTOCOMPLETE REQUEST VALIDATION
========================================================= */

function readAutocompleteOptions(
  body
){

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

  let validLatitude =
    latitude;

  let validLongitude =
    longitude;

  if(
    latitude === null ||
    longitude === null ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ){

    validLatitude =
      null;

    validLongitude =
      null;

  }

  const requestedRadius =
    numberOrNull(
      body.radius
    );

  const radius =
    requestedRadius === null
      ? AUTOCOMPLETE_RADIUS_DEFAULT
      : clamp(
          requestedRadius,
          AUTOCOMPLETE_RADIUS_MIN,
          AUTOCOMPLETE_RADIUS_MAX
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
      validLatitude,

    longitude:
      validLongitude,

    radius

  };

}


/* =========================================================
   AUTOCOMPLETE HANDLER
========================================================= */

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
      request,
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

  let places =
    [];

  if(
    category ===
    "all"
  ){

    places =
      await searchAllCategories(
        request,
        latitude,
        longitude,
        radius,
        maxResults
      );

  }else{

    places =
      await searchOneCategory(
        request,
        latitude,
        longitude,
        radius,
        category,
        maxResults
      );

  }

  /*
  Never send broken coordinate records to the browser.
  */

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

  /*
  ---------------------------------------------------------
  GOOGLE AUTOCOMPLETE
  ---------------------------------------------------------
  */

  if(
    action ===
    "autocomplete"
  ){

    return handleAutocomplete(
      request,
      response
    );

  }


  /*
  ---------------------------------------------------------
  GOOGLE PLACE DETAILS
  ---------------------------------------------------------
  */

  if(
    action ===
    "details"
  ){

    return handlePlaceDetails(
      request,
      response
    );

  }


  /*
  ---------------------------------------------------------
  EXISTING NEARBY SEARCH

  No action is required here.

  This keeps the existing frontend contract working:

  {
    latitude,
    longitude,
    radius,
    category,
    maxResults
  }
  ---------------------------------------------------------
  */

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


    /*
    =======================================================
    CORS PREFLIGHT
    =======================================================
    */

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


    /*
    =======================================================
    GOOGLE API KEY
    =======================================================
    */

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


      /*
      =====================================================
      GET PHOTO
      =====================================================
      */

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


      /*
      =====================================================
      GET SERVICE STATUS
      =====================================================
      */

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
              true

          });

      }


      /*
      =====================================================
      POST
      =====================================================

      Supported:

      action:"autocomplete"
      action:"details"

      or the existing nearby/category search request.
      */

      if(
        request.method ===
        "POST"
      ){

        return await handlePost(
          request,
          response
        );

      }


      /*
      =====================================================
      UNSUPPORTED METHOD
      =====================================================
      */

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

      let status =
        500;

      const upstreamStatus =
        Number(
          error?.status
        );


      /*
      Google validation / bad request
      */

      if(
        upstreamStatus ===
        400
      ){

        status =
          400;

      }


      /*
      Google resource not found
      */

      if(
        upstreamStatus ===
        404
      ){

        status =
          404;

      }


      /*
      Google quota / rate limit
      */

      if(
        upstreamStatus ===
        429
      ){

        status =
          429;

      }


      /*
      Authentication / Google API configuration errors.

      Do not expose Google credentials or internal details
      to the browser.
      */

      if(
        upstreamStatus ===
          401 ||
        upstreamStatus ===
          403
      ){

        status =
          502;

      }


      /*
      Other upstream Google errors
      */

      if(
        upstreamStatus >=
          500 &&
        upstreamStatus <=
          599
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
