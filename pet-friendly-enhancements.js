"use strict";

/* =========================================================
   PETS & DOGUE
   PET-FRIENDLY ENHANCEMENTS

   - Better venue photos
   - Search race protection
   - Does not modify global header or page design
========================================================= */

const PD_PHOTO_API =
  "/api/pet-friendly-photo";

let pdSearchSequence =
  0;


/* =========================================================
   PHOTO LOADER
========================================================= */

loadPhoto =
async function(place){

  const identity =
    communityKey(place);


  if(
    photoFor(place) ||
    photoTried.has(identity)
  ){

    return;

  }


  photoTried.add(
    identity
  );


  try{

    const response =
      await fetch(
        PD_PHOTO_API,
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json",

            Accept:
              "application/json"
          },

          body:
            JSON.stringify({

              name:
                place.name,

              address:
                place.address,

              website:
                place.website || "",

              latitude:
                place.location?.lat ?? null,

              longitude:
                place.location?.lng ?? null

            })
        }
      );


    const data =
      await response
        .json()
        .catch(
          ()=>({})
        );


    if(
      !response.ok ||
      data.ok !== true ||
      !data.photo
    ){

      return;

    }


    photoMemory.set(
      identity,
      data.photo
    );


    const cache =
      photoCache();


    cache[identity] =
      data.photo;


    const entries =
      Object.entries(
        cache
      )
      .slice(
        -250
      );


    write(
      PHOTO_CACHE,
      Object.fromEntries(
        entries
      )
    );


    render();


  }catch(error){

    console.warn(
      "PETS & DOGUE photo:",
      error
    );

  }

};


/* =========================================================
   SEARCH SNAPSHOT
========================================================= */

function pdSearchSnapshot(){

  return{

    category:
      cat,

    latitude:
      Number(
        center.lat
      ),

    longitude:
      Number(
        center.lng
      ),

    radiusKm:
      Number(
        radius
      ),

    language:
      lang

  };

}


/* =========================================================
   PROVIDER SEARCH
========================================================= */

async function pdProviderSearch(
  snapshot
){

  if(
    snapshot.category ===
    "saved"
  ){

    return [];

  }


  const response =
    await fetch(
      API,
      {
        method:"POST",

        headers:{
          "Content-Type":
            "application/json",

          Accept:
            "application/json"
        },

        body:
          JSON.stringify({

            latitude:
              snapshot.latitude,

            longitude:
              snapshot.longitude,

            radius:
              Math.round(
                snapshot.radiusKm *
                1000
              ),

            category:
              snapshot.category,

            maxResults:
              60,

            language:
              snapshot.language

          })
      }
    );


  const data =
    await response
      .json()
      .catch(
        ()=>({})
      );


  if(
    !response.ok ||
    data.ok !== true
  ){

    throw new Error(
      data.error ||
      "Search error"
    );

  }


  return (
    data.places ||
    []
  )
  .map(
    place=>
      norm(
        place,
        place.source ||
        "geoapify",
        snapshot.category ===
        "all"
          ? ""
          : snapshot.category
      )
  )
  .filter(Boolean);

}


/* =========================================================
   OSM QUERY
========================================================= */

function pdOsmQuery(
  snapshot
){

  const around =
    `(around:${Math.round(
      snapshot.radiusKm *
      1000
    )},${snapshot.latitude},${snapshot.longitude})`;


  const dog =
    '["dog"~"^(yes|leashed|designated|permissive|outside|limited|conditional)$",i]';


  const queries = {

    cafe:[
      `nwr["amenity"="cafe"]${dog}${around};`
    ],

    restaurant:[
      `nwr["amenity"="restaurant"]${dog}${around};`
    ],

    pub:[
      `nwr["amenity"="pub"]${dog}${around};`,
      `nwr["amenity"="bar"]${dog}${around};`
    ],

    pizzeria:[
      `nwr["amenity"="restaurant"]["cuisine"~"pizza",i]${dog}${around};`
    ],

    hotel:[
      `nwr["tourism"~"^(hotel|guest_house|hostel|motel|apartment|camp_site|caravan_site)$"]${dog}${around};`
    ],

    park:[
      `nwr["leisure"="dog_park"]${around};`,
      `nwr["leisure"="park"]${dog}${around};`
    ],

    beach:[
      `nwr["natural"="beach"]${dog}${around};`
    ],

    veterinary:[
      `nwr["amenity"="veterinary"]${around};`
    ],

    "pet-shop":[
      `nwr["shop"="pet"]${around};`
    ],

    grooming:[
      `nwr["shop"="pet_grooming"]${around};`
    ],

    events:[
      `nwr["amenity"="events_venue"]${dog}${around};`
    ]

  };


  const lines =
    snapshot.category ===
    "all"

      ? Object
          .values(
            queries
          )
          .flat()

      : (
          queries[
            snapshot.category
          ] ||
          []
        );


  if(
    !lines.length
  ){

    return "";

  }


  return (
    "[out:json][timeout:16];(" +
    lines.join("") +
    ");out center tags;"
  );

}


/* =========================================================
   OSM SEARCH
========================================================= */

async function pdOsmSearch(
  snapshot
){

  const query =
    pdOsmQuery(
      snapshot
    );


  if(!query){

    return [];

  }


  const response =
    await fetch(
      OVP,
      {
        method:"POST",

        headers:{
          "Content-Type":
            "application/x-www-form-urlencoded;charset=UTF-8"
        },

        body:
          new URLSearchParams({
            data:
              query
          })
      }
    );


  if(
    !response.ok
  ){

    throw new Error(
      "OpenStreetMap error"
    );

  }


  const data =
    await response.json();


  return (
    data.elements ||
    []
  )
  .map(
    normOsm
  )
  .filter(Boolean);

}


/* =========================================================
   CURRENT SEARCH CHECK
========================================================= */

function pdSearchStillCurrent(
  sequence,
  snapshot
){

  if(
    sequence !==
    pdSearchSequence
  ){

    return false;

  }


  if(
    cat !==
    snapshot.category
  ){

    return false;

  }


  if(
    Number(center.lat) !==
    snapshot.latitude
  ){

    return false;

  }


  if(
    Number(center.lng) !==
    snapshot.longitude
  ){

    return false;

  }


  if(
    Number(radius) !==
    snapshot.radiusKm
  ){

    return false;

  }


  return true;

}


/* =========================================================
   REPLACE SEARCH
========================================================= */

search =
async function(){

  const sequence =
    ++pdSearchSequence;


  const snapshot =
    pdSearchSnapshot();


  limit =
    12;


  if(
    snapshot.category ===
    "saved"
  ){

    if(
      !pdSearchStillCurrent(
        sequence,
        snapshot
      )
    ){

      return;

    }


    render();

    setStatus("");

    return;

  }


  setStatus(
    t("searching")
  );


  let providerPlaces =
    [];


  try{

    providerPlaces =
      await pdProviderSearch(
        snapshot
      );

  }catch(error){

    console.warn(
      "Geoapify search:",
      error
    );

  }


  if(
    !pdSearchStillCurrent(
      sequence,
      snapshot
    )
  ){

    return;

  }


  places =
    merge([
      providerPlaces
    ]);


  render();


  setStatus(
    t("osm")
  );


  let osmPlaces =
    [];


  try{

    osmPlaces =
      await Promise.race([

        pdOsmSearch(
          snapshot
        ),

        new Promise(
          resolve=>
            setTimeout(
              ()=>resolve([]),
              7000
            )
        )

      ]);

  }catch(error){

    console.warn(
      "OpenStreetMap search:",
      error
    );

  }


  if(
    !pdSearchStillCurrent(
      sequence,
      snapshot
    )
  ){

    return;

  }


  places =
    merge([
      providerPlaces,
      osmPlaces
    ]);


  render();

  setStatus("");

};


/* =========================================================
   REFRESH CURRENT PHOTOS
========================================================= */

function pdRefreshVisiblePhotos(){

  try{

    const visible =
      current()
      .slice(
        0,
        12
      );


    visible
      .filter(
        place=>
          !photoFor(place)
      )
      .forEach(
        (place,index)=>{

          setTimeout(
            ()=>loadPhoto(place),
            index * 220
          );

        }
      );


  }catch(error){

    console.warn(
      "Photo refresh:",
      error
    );

  }

}


if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    ()=>{

      setTimeout(
        pdRefreshVisiblePhotos,
        1200
      );

    },
    {
      once:true
    }
  );

}else{

  setTimeout(
    pdRefreshVisiblePhotos,
    1200
  );

}
