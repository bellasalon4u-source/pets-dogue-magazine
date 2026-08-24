"use strict";

/*
=========================================================
PETS & DOGUE
Pet-Friendly Places API
Vercel Serverless Function

Required environment variable:

GOOGLE_PLACES_API_KEY
or
GOOGLE_MAPS_API_KEY

This API:
1. Searches real Google Places.
2. Returns real Google place photos.
3. Proxies photos through this endpoint so the API key
   is never exposed in the browser.
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

const GOOGLE_PLACE_BASE =
  "https://places.googleapis.com/v1";

const DEFAULT_MAX_RESULTS =
  20;

const MAX_RADIUS_METERS =
  50000;


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
    "hotel",
    "lodging"
  ],

  veterinary:[
    "veterinary_care"
  ],

  "pet-shop":[
    "pet_store"
  ],

  "dog-park":[
    "dog_park",
    "park"
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
   HELPERS
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
  value
){

  return String(
    value ?? ""
  ).trim();

}


function getPhotoProxyUrl(
  request,
  photoName,
  width = 1000
){

  if(
    !photoName
  ){

    return "";

  }

  const host =
    request.headers[
      "x-forwarded-host"
    ] ||
    request.headers.host ||
    "";

  const protocol =
    request.headers[
      "x-forwarded-proto"
    ] ||
    "https";

  if(
    !host
  ){

    return (
      "/api/pet-friendly-places?photo=" +
      encodeURIComponent(
        photoName
      ) +
      "&width=" +
      encodeURIComponent(
        width
      )
    );

  }

  return (
    protocol +
    "://" +
    host +
    "/api/pet-friendly-places?photo=" +
    encodeURIComponent(
      photoName
    ) +
    "&width=" +
    encodeURIComponent(
      width
    )
  );

}


function normalizeCategory(
  category
){

  const value =
    cleanString(
      category
    )
      .toLowerCase();

  const aliases = {

    cafes:"cafe",
    coffee:"cafe",
    coffee_shop:"cafe",

    restaurants:"restaurant",

    hotels:"hotel",
    lodging:"hotel",

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


function detectCategoryFromTypes(
  types
){

  const values =
    Array.isArray(
      types
    )
      ? types
      : [];

  if(
    values.includes(
      "veterinary_care"
    )
  ){

    return "veterinary";

  }

  if(
    values.includes(
      "pet_store"
    )
  ){

    return "pet-shop";

  }

  if(
    values.includes(
      "dog_park"
    )
  ){

    return "park";

  }

  if(
    values.includes(
      "beach"
    )
  ){

    return "beach";

  }

  if(
    values.includes(
      "hotel"
    ) ||
    values.includes(
      "lodging"
    )
  ){

    return "hotel";

  }

  if(
    values.includes(
      "restaurant"
    )
  ){

    return "restaurant";

  }

  if(
    values.includes(
      "cafe"
    ) ||
    values.includes(
      "coffee_shop"
    )
  ){

    return "cafe";

  }

  if(
    values.includes(
      "park"
    )
  ){

    return "park";

  }

  if(
    values.includes(
      "event_venue"
    )
  ){

    return "events";

  }

  return "other";

}


function getDisplayName(
  place
){

  if(
    typeof place?.displayName ===
    "string"
  ){

    return place.displayName;

  }

  return (
    place?.displayName?.text ||
    ""
  );

}


function getPhoto(
  request,
  place
){

  const photos =
    Array.isArray(
      place?.photos
    )
      ? place.photos
      : [];

  if(
    !photos.length
  ){

    return null;

  }

  const photo =
    photos[0];

  const name =
    cleanString(
      photo?.name
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
        photo.widthPx
      ),
    heightPx:
      numberOrNull(
        photo.heightPx
      ),
    url:
      getPhotoProxyUrl(
        request,
        name,
        1000
      )
  };

}


/* =========================================================
   PET FRIENDLY DETECTION
========================================================= */

function isExplicitlyDogFriendly(
  place
){

  if(
    place?.allowsDogs ===
    true
  ){

    return true;

  }

  return false;

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
  requestedCategory
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
      place?.types
    );

  let category =
    requestedCategory;

  if(
    !category ||
    category === "all" ||
    category === "dog-park"
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

  const photo =
    getPhoto(
      request,
      place
    );

  const openingHours =
    place?.currentOpeningHours
      ? {
          openNow:
            typeof place
              .currentOpeningHours
              .openNow ===
            "boolean"
              ? place
                  .currentOpeningHours
                  .openNow
              : null,

          weekdayDescriptions:
            Array.isArray(
              place
                .currentOpeningHours
                .weekdayDescriptions
            )
              ? place
                  .currentOpeningHours
                  .weekdayDescriptions
              : []
        }
      : null;

  const petFriendly =
    isExplicitlyDogFriendly(
      place
    ) ||
    categoryNaturallyPetRelevant(
      category
    );

  return {

    id:
      cleanString(
        place.id
      ) ||
      (
        "google-" +
        lat +
        "-" +
        lng
      ),

    providerId:
      cleanString(
        place.id
      ),

    source:
      "google",

    name:
      getDisplayName(
        place
      ) ||
      "Pet-friendly place",

    category,

    types:
      Array.isArray(
        place.types
      )
        ? place.types
        : [],

    address:
      cleanString(
        place.formattedAddress
      ),

    location:{
      lat,
      lng
    },

    rating:
      numberOrNull(
        place.rating
      ),

    ratingCount:
      numberOrNull(
        place.userRatingCount
      ) ||
      0,

    website:
      cleanString(
        place.websiteUri
      ),

    googleMapsUrl:
      cleanString(
        place.googleMapsUri
      ),

    phone:
      cleanString(
        place.nationalPhoneNumber ||
        place.internationalPhoneNumber
      ),

    openingHours,

    allowsDogs:
      place?.allowsDogs ===
      true,

    photo,

    photos:
      Array.isArray(
        place.photos
      )
        ? place.photos
            .slice(
              0,
              5
            )
            .map(
              function(item){

                const name =
                  cleanString(
                    item?.name
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
                      item.widthPx
                    ),
                  heightPx:
                    numberOrNull(
                      item.heightPx
                    ),
                  url:
                    getPhotoProxyUrl(
                      request,
                      name,
                      1000
                    )
                };

              }
            )
            .filter(Boolean)
        : [],

    petFriendly:{
      allowed:
        petFriendly,
      verified:
        isExplicitlyDogFriendly(
          place
        )
    }

  };

}


/* =========================================================
   GOOGLE FIELD MASK
========================================================= */

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.types",
  "places.rating",
  "places.userRatingCount",
  "places.websiteUri",
  "places.googleMapsUri",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.currentOpeningHours",
  "places.photos",
  "places.allowsDogs"
].join(",");


/* =========================================================
   GOOGLE REQUEST
========================================================= */

async function googleFetch(
  url,
  body
){

  const response =
    await fetch(
      url,
      {
        method:"POST",

        headers:{
          "Content-Type":
            "application/json",

          "X-Goog-Api-Key":
            GOOGLE_API_KEY,

          "X-Goog-FieldMask":
            FIELD_MASK
        },

        body:
          JSON.stringify(
            body
          )
      }
    );

  const data =
    await response
      .json()
      .catch(
        function(){

          return {};

        }
      );

  if(
    !response.ok
  ){

    const message =
      data?.error?.message ||
      data?.message ||
      (
        "Google Places request failed with status " +
        response.status
      );

    throw new Error(
      message
    );

  }

  return data;

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

  const types =
    CATEGORY_TYPES[
      category
    ] ||
    [];

  if(
    !types.length
  ){

    return [];

  }

  const body = {

    includedTypes:
      types,

    maxResultCount:
      clamp(
        maxResults,
        1,
        20
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
    await googleFetch(
      GOOGLE_NEARBY_URL,
      body
    );

  const places =
    Array.isArray(
      data?.places
    )
      ? data.places
      : [];

  return places
    .map(
      function(place){

        return normalizeGooglePlace(
          request,
          place,
          category
        );

      }
    )
    .filter(Boolean);

}


/* =========================================================
   TEXT SEARCH
   Used as a supplement for categories where Nearby Search
   may return too few results.
========================================================= */

async function searchTextCategory(
  request,
  latitude,
  longitude,
  radius,
  category,
  maxResults
){

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
      "dog show pet event equestrian event"

  };

  const textQuery =
    queries[
      category
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
        20
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
    await googleFetch(
      GOOGLE_TEXT_URL,
      body
    );

  const places =
    Array.isArray(
      data?.places
    )
      ? data.places
      : [];

  return places
    .map(
      function(place){

        return normalizeGooglePlace(
          request,
          place,
          category
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
      lat2 - lat1
    );

  const dLng =
    toRad(
      lng2 - lng1
    );

  const a =
    Math.sin(
      dLat / 2
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
      dLng / 2
    ) ** 2;

  return (
    earthRadius *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );

}


/* =========================================================
   DEDUPLICATION
========================================================= */

function mergePlaces(
  places,
  latitude,
  longitude
){

  const map =
    new Map();

  places
    .filter(Boolean)
    .forEach(
      function(place){

        const id =
          cleanString(
            place.id
          );

        const fallbackKey =
          (
            cleanString(
              place.name
            )
              .toLowerCase() +
            "|" +
            Number(
              place.location?.lat
            ).toFixed(5) +
            "|" +
            Number(
              place.location?.lng
            ).toFixed(5)
          );

        const key =
          id ||
          fallbackKey;

        if(
          !map.has(
            key
          )
        ){

          map.set(
            key,
            place
          );

          return;

        }

        const existing =
          map.get(
            key
          );

        /*
        Prefer the version with a photo.
        */

        if(
          !existing.photo &&
          place.photo
        ){

          map.set(
            key,
            Object.assign(
              {},
              existing,
              place
            )
          );

        }

      }
    );

  return Array.from(
    map.values()
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

  const nearbyPromise =
    searchNearbyCategory(
      request,
      latitude,
      longitude,
      radius,
      category,
      maxResults
    )
      .catch(
        function(error){

          console.warn(
            "Nearby search failed:",
            category,
            error.message
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
      category,
      maxResults
    )
      .catch(
        function(error){

          console.warn(
            "Text search failed:",
            category,
            error.message
          );

          return [];

        }
      );

  const result =
    await Promise.all([
      nearbyPromise,
      textPromise
    ]);

  return mergePlaces(
    [
      ...result[0],
      ...result[1]
    ],
    latitude,
    longitude
  )
    .filter(
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
    .slice(
      0,
      maxResults
    );

}


/* =========================================================
   SEARCH ALL
========================================================= */

async function searchAllCategories(
  request,
  latitude,
  longitude,
  radius,
  maxResults
){

  /*
  We search the categories separately because Google Nearby
  Search gives much better real-place coverage this way.
  */

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
                "Category search failed:",
                category,
                error.message
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

  /*
  Prefer places with real Google photos for the editorial
  card grid, but retain distance as the main order.
  */

  places.sort(
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
        1
      ){

        return distanceDifference;

      }

      const aPhoto =
        a.photo
          ? 1
          : 0;

      const bPhoto =
        b.photo
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
          b.rating || 0
        ) -
        Number(
          a.rating || 0
        )
      );

    }
  );

  return places.slice(
    0,
    maxResults
  );

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
      request.query?.photo
    );

  if(
    !photoName
  ){

    return response
      .status(400)
      .json({
        ok:false,
        error:
          "Missing photo name."
      });

  }

  /*
  Only allow valid Google Places photo resource names.
  */

  if(
    !/^places\/[^/]+\/photos\/[^/]+$/i.test(
      photoName
    )
  ){

    return response
      .status(400)
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
    1000;

  const width =
    Math.round(
      clamp(
        requestedWidth,
        200,
        1600
      )
    );

  const mediaUrl =
    GOOGLE_PLACE_BASE +
    "/" +
    photoName +
    "/media" +
    "?maxWidthPx=" +
    encodeURIComponent(
      width
    ) +
    "&skipHttpRedirect=true" +
    "&key=" +
    encodeURIComponent(
      GOOGLE_API_KEY
    );

  const metadataResponse =
    await fetch(
      mediaUrl,
      {
        headers:{
          "Accept":
            "application/json"
        }
      }
    );

  if(
    !metadataResponse.ok
  ){

    const errorText =
      await metadataResponse
        .text()
        .catch(
          function(){

            return "";

          }
        );

    console.error(
      "Google photo metadata error:",
      metadataResponse.status,
      errorText
    );

    return response
      .status(
        metadataResponse.status
      )
      .json({
        ok:false,
        error:
          "Google photo could not be loaded."
      });

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
      metadata?.photoUri
    );

  if(
    !photoUri
  ){

    return response
      .status(404)
      .json({
        ok:false,
        error:
          "Photo URL was not returned."
      });

  }

  const imageResponse =
    await fetch(
      photoUri,
      {
        redirect:"follow"
      }
    );

  if(
    !imageResponse.ok
  ){

    return response
      .status(
        imageResponse.status
      )
      .json({
        ok:false,
        error:
          "Photo image could not be loaded."
      });

  }

  const contentType =
    imageResponse.headers.get(
      "content-type"
    ) ||
    "image/jpeg";

  const arrayBuffer =
    await imageResponse.arrayBuffer();

  const buffer =
    Buffer.from(
      arrayBuffer
    );

  response.setHeader(
    "Content-Type",
    contentType
  );

  response.setHeader(
    "Cache-Control",
    "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000"
  );

  response.setHeader(
    "Content-Length",
    String(
      buffer.length
    )
  );

  return response
    .status(200)
    .send(
      buffer
    );

}


/* =========================================================
   MAIN SEARCH HANDLER
========================================================= */

async function handleSearch(
  request,
  response
){

  const body =
    request.body ||
    {};

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

    return response
      .status(400)
      .json({
        ok:false,
        error:
          "Latitude and longitude are required."
      });

  }

  if(
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ){

    return response
      .status(400)
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
      20
    );

  const category =
    normalizeCategory(
      body.category
    );

  let places =
    [];

  if(
    category === "all"
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
  Final safety filter:
  no record without usable coordinates reaches the browser.
  */

  places =
    places.filter(
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

  response.setHeader(
    "Cache-Control",
    "s-maxage=300, stale-while-revalidate=900"
  );

  return response
    .status(200)
    .json({
      ok:true,

      center:{
        latitude,
        longitude
      },

      radius,

      category,

      count:
        places.length,

      places
    });

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
        .status(204)
        .end();

    }

    if(
      !GOOGLE_API_KEY
    ){

      return response
        .status(500)
        .json({
          ok:false,
          error:
            "Google Places API key is not configured. Add GOOGLE_PLACES_API_KEY or GOOGLE_MAPS_API_KEY in Vercel Environment Variables."
        });

    }

    try{

      /*
      GET with ?photo=...
      Returns the real Google photo image.
      */

      if(
        request.method === "GET" &&
        request.query?.photo
      ){

        return await proxyGooglePhoto(
          request,
          response
        );

      }

      /*
      Small status check.
      */

      if(
        request.method === "GET"
      ){

        return response
          .status(200)
          .json({
            ok:true,
            service:
              "PETS & DOGUE Pet-Friendly Places API",
            configured:true
          });

      }

      /*
      Place search.
      */

      if(
        request.method === "POST"
      ){

        return await handleSearch(
          request,
          response
        );

      }

      response.setHeader(
        "Allow",
        "GET, POST, OPTIONS"
      );

      return response
        .status(405)
        .json({
          ok:false,
          error:
            "Method not allowed."
        });

    }catch(
      error
    ){

      console.error(
        "Pet-Friendly Places API:",
        error
      );

      return response
        .status(500)
        .json({
          ok:false,
          error:
            error?.message ||
            "Unexpected server error."
        });

    }

  };
