"use strict";

/* =========================================================
   PETS & DOGUE
   VERIFIED FREE VENUE PHOTO RESOLVER

   PHOTO PRIORITY:
   1. Exact OSM / Nominatim venue metadata
   2. OSM-linked Wikidata P18
   3. OSM-linked Wikipedia image
   4. Official venue website
   5. Wikimedia Commons only with strong venue match
   6. No uncertain image -> PETS & DOGUE frontend fallback

   IMPORTANT:
   - No Google Places Photos.
   - Never intentionally use a random image from another venue.
   - Accuracy is more important than filling every card.
========================================================= */

const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/search";

const WIKIDATA_ENTITY_URL =
  "https://www.wikidata.org/wiki/Special:EntityData/";

const WIKIMEDIA_API =
  "https://commons.wikimedia.org/w/api.php";

const TIMEOUT =
  7000;

const MAX_HTML_BYTES =
  1200000;

const MAX_NOMINATIM_RESULTS =
  8;


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


function send(
  res,
  status,
  payload
){

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=604800"
  );

  res
    .status(status)
    .json(payload);

}


/* =========================================================
   BASIC HELPERS
========================================================= */

function text(
  value,
  max = 3000
){

  return String(
    value ??
    ""
  )
  .replace(
    /\u0000/g,
    ""
  )
  .trim()
  .slice(
    0,
    max
  );

}


function numberOrNull(value){

  const number =
    Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : null;

}


function decodeHtml(value){

  return String(
    value ||
    ""
  )
  .replace(/&amp;/gi,"&")
  .replace(/&quot;/gi,'"')
  .replace(/&#39;/gi,"'")
  .replace(/&apos;/gi,"'")
  .replace(/&lt;/gi,"<")
  .replace(/&gt;/gi,">")
  .replace(/&#x2F;/gi,"/");

}


function safeHttpUrl(value){

  const raw =
    text(
      value,
      4000
    );

  if(!raw){

    return "";

  }

  try{

    const url =
      new URL(
        raw
      );

    if(
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ){

      return "";

    }

    return url.href;

  }catch{

    return "";

  }

}


function normalizeWords(value){

  return String(
    value ||
    ""
  )
  .normalize("NFKD")
  .replace(
    /[\u0300-\u036f]/g,
    ""
  )
  .toLowerCase()
  .replace(
    /&/g,
    " and "
  )
  .replace(
    /['’]/g,
    ""
  )
  .replace(
    /[^a-z0-9]+/g,
    " "
  )
  .replace(
    /\s+/g,
    " "
  )
  .trim();

}


function meaningfulWords(value){

  const ignored =
    new Set([
      "the",
      "a",
      "an",
      "and",
      "of",
      "at",
      "in",
      "on",
      "hotel",
      "restaurant",
      "cafe",
      "coffee",
      "bar",
      "pub",
      "ltd",
      "limited",
      "uk",
      "united",
      "kingdom"
    ]);

  return normalizeWords(
    value
  )
  .split(" ")
  .filter(
    word=>
      word.length >= 2 &&
      !ignored.has(
        word
      )
  );

}


function tokenOverlap(
  first,
  second
){

  const a =
    meaningfulWords(
      first
    );

  const b =
    new Set(
      meaningfulWords(
        second
      )
    );

  if(
    !a.length ||
    !b.size
  ){

    return 0;

  }

  let matches =
    0;

  for(
    const word of a
  ){

    if(
      b.has(
        word
      )
    ){

      matches += 1;

    }

  }

  return (
    matches /
    a.length
  );

}


function nameMatchScore(
  target,
  candidate
){

  const a =
    normalizeWords(
      target
    );

  const b =
    normalizeWords(
      candidate
    );

  if(
    !a ||
    !b
  ){

    return 0;

  }

  if(
    a === b
  ){

    return 1;

  }

  if(
    b.includes(a) ||
    a.includes(b)
  ){

    return 0.92;

  }

  return tokenOverlap(
    a,
    b
  );

}


function addressParts(value){

  return normalizeWords(
    value
  )
  .split(" ")
  .filter(
    part=>
      part.length >= 3
  );

}


function addressMatchScore(
  target,
  candidate
){

  const a =
    addressParts(
      target
    );

  const b =
    new Set(
      addressParts(
        candidate
      )
    );

  if(
    !a.length ||
    !b.size
  ){

    return 0;

  }

  let matches =
    0;

  for(
    const word of a
  ){

    if(
      b.has(
        word
      )
    ){

      matches += 1;

    }

  }

  return Math.min(
    1,
    matches /
    Math.min(
      a.length,
      6
    )
  );

}


function distanceKm(
  lat1,
  lng1,
  lat2,
  lng2
){

  if(
    ![
      lat1,
      lng1,
      lat2,
      lng2
    ]
    .every(
      Number.isFinite
    )
  ){

    return null;

  }

  const radians =
    value=>
      value *
      Math.PI /
      180;

  const earth =
    6371;

  const dLat =
    radians(
      lat2 -
      lat1
    );

  const dLng =
    radians(
      lng2 -
      lng1
    );

  const a =
    Math.sin(
      dLat / 2
    ) ** 2
    +
    Math.cos(
      radians(
        lat1
      )
    )
    *
    Math.cos(
      radians(
        lat2
      )
    )
    *
    Math.sin(
      dLng / 2
    ) ** 2;

  return (
    earth *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(
        1 - a
      )
    )
  );

}


function commonsFileUrl(filename){

  const raw =
    text(
      filename,
      1000
    )
    .replace(
      /^File:/i,
      ""
    )
    .trim();

  if(!raw){

    return "";

  }

  return (
    "https://commons.wikimedia.org/wiki/Special:FilePath/"
    +
    encodeURIComponent(
      raw
    )
    +
    "?width=1200"
  );

}


/* =========================================================
   FETCH JSON
========================================================= */

async function fetchJson(
  url,
  options = {}
){

  const controller =
    new AbortController();

  const timer =
    setTimeout(
      ()=>controller.abort(),
      TIMEOUT
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

    if(
      !response.ok
    ){

      return null;

    }

    return await response.json();

  }catch{

    return null;

  }finally{

    clearTimeout(
      timer
    );

  }

}


/* =========================================================
   PRIVATE NETWORK / SSRF PROTECTION
========================================================= */

function blockedHostname(hostname){

  const host =
    String(
      hostname ||
      ""
    )
    .trim()
    .toLowerCase();

  if(
    !host ||
    host === "localhost" ||
    host.endsWith(
      ".localhost"
    ) ||
    host.endsWith(
      ".local"
    ) ||
    host.endsWith(
      ".internal"
    )
  ){

    return true;

  }

  if(
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^0\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^192\.168\./.test(host)
  ){

    return true;

  }

  const match172 =
    host.match(
      /^172\.(\d+)\./
    );

  if(
    match172 &&
    Number(
      match172[1]
    ) >= 16 &&
    Number(
      match172[1]
    ) <= 31
  ){

    return true;

  }

  if(
    host === "::1" ||
    host.startsWith(
      "fc"
    ) ||
    host.startsWith(
      "fd"
    ) ||
    host.startsWith(
      "fe80:"
    )
  ){

    return true;

  }

  return false;

}


async function hostnameIsSafe(hostname){

  if(
    blockedHostname(
      hostname
    )
  ){

    return false;

  }

  try{

    const dns =
      require(
        "node:dns"
      )
      .promises;

    const addresses =
      await dns.lookup(
        hostname,
        {
          all:true,
          verbatim:true
        }
      );

    if(
      !addresses.length
    ){

      return false;

    }

    for(
      const item of addresses
    ){

      if(
        blockedHostname(
          item.address
        )
      ){

        return false;

      }

    }

    return true;

  }catch{

    return false;

  }

}


/* =========================================================
   SAFE OFFICIAL WEBSITE FETCH
========================================================= */

async function fetchHtml(startUrl){

  let current =
    safeHttpUrl(
      startUrl
    );

  for(
    let redirect = 0;
    redirect < 4;
    redirect += 1
  ){

    if(!current){

      return{
        html:"",
        finalUrl:""
      };

    }

    let parsed;

    try{

      parsed =
        new URL(
          current
        );

    }catch{

      return{
        html:"",
        finalUrl:""
      };

    }

    if(
      !await hostnameIsSafe(
        parsed.hostname
      )
    ){

      return{
        html:"",
        finalUrl:""
      };

    }

    const controller =
      new AbortController();

    const timer =
      setTimeout(
        ()=>controller.abort(),
        TIMEOUT
      );

    try{

      const response =
        await fetch(
          current,
          {
            method:"GET",

            redirect:"manual",

            signal:
              controller.signal,

            headers:{
              "User-Agent":
                "Mozilla/5.0 (compatible; PETS-DOGUE/1.0; +https://petsanddogue.com)",

              Accept:
                "text/html,application/xhtml+xml"
            }
          }
        );

      if(
        response.status >= 300 &&
        response.status < 400
      ){

        const location =
          response.headers.get(
            "location"
          );

        if(
          !location
        ){

          break;

        }

        const next =
          new URL(
            location,
            current
          );

        if(
          next.protocol !== "https:" &&
          next.protocol !== "http:"
        ){

          break;

        }

        current =
          next.href;

        continue;

      }

      if(
        !response.ok
      ){

        break;

      }

      const type =
        String(
          response.headers.get(
            "content-type"
          ) ||
          ""
        )
        .toLowerCase();

      if(
        !type.includes(
          "text/html"
        )
      ){

        break;

      }

      const html =
        await response.text();

      return{
        html:
          html.slice(
            0,
            MAX_HTML_BYTES
          ),

        finalUrl:
          current
      };

    }catch{

      break;

    }finally{

      clearTimeout(
        timer
      );

    }

  }

  return{
    html:"",
    finalUrl:""
  };

}


/* =========================================================
   HTML META HELPERS
========================================================= */

function metaContent(
  html,
  key
){

  const escaped =
    key.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  const patterns = [

    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i"
    ),

    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["'][^>]*>`,
      "i"
    )

  ];

  for(
    const pattern of patterns
  ){

    const match =
      html.match(
        pattern
      );

    if(
      match?.[1]
    ){

      return decodeHtml(
        match[1]
      );

    }

  }

  return "";

}


function pageTitle(html){

  const og =
    metaContent(
      html,
      "og:title"
    );

  if(og){

    return og;

  }

  const match =
    String(
      html ||
      ""
    )
    .match(
      /<title[^>]*>([\s\S]*?)<\/title>/i
    );

  return match?.[1]
    ? decodeHtml(
        match[1]
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim()
    : "";

}


/* =========================================================
   IMAGE QUALITY FILTER
========================================================= */

function badImage(value){

  const url =
    String(
      value ||
      ""
    )
    .toLowerCase();

  return (
    !url ||
    url.startsWith(
      "data:"
    ) ||
    url.includes(
      "logo"
    ) ||
    url.includes(
      "favicon"
    ) ||
    url.includes(
      "icon"
    ) ||
    url.includes(
      "sprite"
    ) ||
    url.includes(
      "avatar"
    ) ||
    url.includes(
      "placeholder"
    ) ||
    url.includes(
      "tracking"
    ) ||
    url.includes(
      "pixel"
    ) ||
    url.includes(
      "badge"
    ) ||
    url.includes(
      "spinner"
    ) ||
    url.includes(
      "loading"
    ) ||
    url.includes(
      "payment"
    ) ||
    url.includes(
      "trustpilot"
    ) ||
    url.endsWith(
      ".svg"
    ) ||
    url.endsWith(
      ".gif"
    )
  );

}


function resolveImage(
  value,
  pageUrl
){

  const candidate =
    decodeHtml(
      value
    )
    .trim();

  if(
    badImage(
      candidate
    )
  ){

    return "";

  }

  try{

    const url =
      new URL(
        candidate,
        pageUrl
      );

    if(
      url.protocol === "https:" ||
      url.protocol === "http:"
    ){

      return url.href;

    }

  }catch{}

  return "";

}/* =========================================================
   OFFICIAL WEBSITE IMAGE EXTRACTION

   We trust website imagery only when the fetched page
   appears reasonably connected to the requested venue.
========================================================= */

function websiteMatchesVenue(
  html,
  venueName
){

  if(
    !html ||
    !venueName
  ){

    return false;

  }

  const title =
    pageTitle(
      html
    );

  const titleScore =
    nameMatchScore(
      venueName,
      title
    );

  if(
    titleScore >= 0.55
  ){

    return true;

  }

  const ogSite =
    metaContent(
      html,
      "og:site_name"
    );

  if(
    nameMatchScore(
      venueName,
      ogSite
    ) >= 0.55
  ){

    return true;

  }

  const normalizedVenue =
    normalizeWords(
      venueName
    );

  const normalizedHtml =
    normalizeWords(
      String(
        html
      )
      .slice(
        0,
        250000
      )
    );

  if(
    normalizedVenue.length >= 4 &&
    normalizedHtml.includes(
      normalizedVenue
    )
  ){

    return true;

  }

  const venueWords =
    meaningfulWords(
      venueName
    );

  if(
    venueWords.length
  ){

    const hits =
      venueWords.filter(
        word=>
          normalizedHtml.includes(
            word
          )
      )
      .length;

    if(
      hits >= Math.max(
        1,
        Math.ceil(
          venueWords.length *
          0.7
        )
      )
    ){

      return true;

    }

  }

  return false;

}


function websitePhoto(
  html,
  pageUrl,
  venueName
){

  if(
    !html ||
    !pageUrl
  ){

    return "";

  }

  if(
    !websiteMatchesVenue(
      html,
      venueName
    )
  ){

    return "";

  }


  /*
     Social preview images are normally the strongest
     candidate on an official venue website.
  */

  const meta = [

    metaContent(
      html,
      "og:image"
    ),

    metaContent(
      html,
      "og:image:secure_url"
    ),

    metaContent(
      html,
      "og:image:url"
    ),

    metaContent(
      html,
      "twitter:image"
    ),

    metaContent(
      html,
      "twitter:image:src"
    )

  ];


  for(
    const candidate of meta
  ){

    const url =
      resolveImage(
        candidate,
        pageUrl
      );

    if(url){

      return url;

    }

  }


  /*
     If no social image exists, inspect regular images.
     We intentionally reject obvious logos/icons/etc.
  */

  const tags =
    html.match(
      /<img\b[^>]*>/gi
    ) || [];


  const scored = [];


  for(
    const tag of tags
  ){

    const altMatch =
      tag.match(
        /\balt=["']([^"']*)["']/i
      );

    const alt =
      decodeHtml(
        altMatch?.[1] ||
        ""
      );


    const widthMatch =
      tag.match(
        /\bwidth=["']?(\d+)/i
      );

    const heightMatch =
      tag.match(
        /\bheight=["']?(\d+)/i
      );

    const width =
      Number(
        widthMatch?.[1] ||
        0
      );

    const height =
      Number(
        heightMatch?.[1] ||
        0
      );


    const rawCandidates = [];


    const attributes = [

      /\bdata-src=["']([^"']+)["']/i,

      /\bdata-lazy-src=["']([^"']+)["']/i,

      /\bdata-original=["']([^"']+)["']/i,

      /\bsrc=["']([^"']+)["']/i

    ];


    for(
      const attribute of attributes
    ){

      const match =
        tag.match(
          attribute
        );

      if(
        match?.[1]
      ){

        rawCandidates.push(
          match[1]
        );

      }

    }


    const srcset =
      tag.match(
        /\b(?:srcset|data-srcset)=["']([^"']+)["']/i
      );


    if(
      srcset?.[1]
    ){

      const items =
        srcset[1]
        .split(",")
        .map(
          item=>
            item
            .trim()
            .split(/\s+/)[0]
        )
        .filter(Boolean)
        .reverse();

      rawCandidates.unshift(
        ...items
      );

    }


    for(
      const raw of rawCandidates
    ){

      const url =
        resolveImage(
          raw,
          pageUrl
        );

      if(!url){

        continue;

      }


      let score =
        0;


      if(
        width >= 600
      ){

        score += 2;

      }else if(
        width >= 300
      ){

        score += 1;

      }


      if(
        height >= 350
      ){

        score += 2;

      }else if(
        height >= 180
      ){

        score += 1;

      }


      const combined =
        `${url} ${alt}`;


      if(
        nameMatchScore(
          venueName,
          combined
        ) >= 0.5
      ){

        score += 4;

      }


      if(
        /hero|banner|venue|restaurant|hotel|room|interior|exterior|gallery|food|dining|terrace|garden|building/i
        .test(
          combined
        )
      ){

        score += 2;

      }


      if(
        /staff|team|portrait|person|people|award|certificate|press|partner/i
        .test(
          combined
        )
      ){

        score -= 2;

      }


      scored.push({
        url,
        score
      });

    }

  }


  scored.sort(
    (a,b)=>
      b.score -
      a.score
  );


  /*
     Do not use an arbitrary first <img>.
     It must have at least some quality evidence.
  */

  if(
    scored[0] &&
    scored[0].score >= 2
  ){

    return scored[0].url;

  }


  return "";

}


/* =========================================================
   OSM / NOMINATIM LOOKUP
========================================================= */

function osmCandidateName(item){

  const namedetails =
    item?.namedetails ||
    {};

  const address =
    item?.address ||
    {};

  return (
    namedetails.name ||
    namedetails["name:en"] ||
    address.amenity ||
    address.tourism ||
    address.shop ||
    String(
      item?.display_name ||
      ""
    )
    .split(",")[0]
    .trim()
  );

}


function osmCandidateScore(
  item,
  name,
  address,
  latitude,
  longitude
){

  const candidateName =
    osmCandidateName(
      item
    );

  const display =
    String(
      item?.display_name ||
      ""
    );


  const nameScore =
    nameMatchScore(
      name,
      candidateName
    );


  const addressScore =
    addressMatchScore(
      address,
      display
    );


  const candidateLat =
    numberOrNull(
      item?.lat
    );

  const candidateLng =
    numberOrNull(
      item?.lon
    );


  const distance =
    distanceKm(
      latitude,
      longitude,
      candidateLat,
      candidateLng
    );


  let distanceScore =
    0;


  if(
    distance !== null
  ){

    if(
      distance <= 0.08
    ){

      distanceScore =
        1;

    }else if(
      distance <= 0.25
    ){

      distanceScore =
        0.9;

    }else if(
      distance <= 0.6
    ){

      distanceScore =
        0.7;

    }else if(
      distance <= 1.5
    ){

      distanceScore =
        0.4;

    }else if(
      distance <= 3
    ){

      distanceScore =
        0.15;

    }

  }


  let score =
    (
      nameScore *
      0.62
    )
    +
    (
      addressScore *
      0.18
    )
    +
    (
      distanceScore *
      0.20
    );


  /*
     Exact Wikidata / Wikipedia metadata makes the
     candidate more valuable, but does not override
     a poor venue-name match.
  */

  const extra =
    item?.extratags ||
    {};


  if(
    nameScore >= 0.6 &&
    (
      extra.wikidata ||
      extra.wikipedia ||
      extra.image ||
      extra.wikimedia_commons
    )
  ){

    score += 0.05;

  }


  return{
    item,
    score:
      Math.min(
        1,
        score
      ),
    nameScore,
    addressScore,
    distance
  };

}


async function osmMetadata(
  name,
  address,
  latitude,
  longitude
){

  const queries = [];


  if(
    name &&
    address
  ){

    queries.push(
      `${name}, ${address}`
    );

  }


  if(name){

    queries.push(
      name
    );

  }


  let collected =
    [];


  for(
    const query of queries
  ){

    if(
      query.length < 3
    ){

      continue;

    }


    const url =
      new URL(
        NOMINATIM_URL
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
      String(
        MAX_NOMINATIM_RESULTS
      )
    );

    url.searchParams.set(
      "addressdetails",
      "1"
    );

    url.searchParams.set(
      "extratags",
      "1"
    );

    url.searchParams.set(
      "namedetails",
      "1"
    );


    if(
      latitude !== null &&
      longitude !== null
    ){

      /*
         Roughly a few kilometres around the supplied
         coordinates. Coordinates are strong identity
         evidence for local businesses.
      */

      const delta =
        0.045;


      url.searchParams.set(
        "viewbox",
        [
          longitude - delta,
          latitude + delta,
          longitude + delta,
          latitude - delta
        ].join(",")
      );


      url.searchParams.set(
        "bounded",
        "1"
      );

    }


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


    if(
      Array.isArray(
        data
      )
    ){

      collected.push(
        ...data
      );

    }


    /*
       Usually the full name + address query is enough.
       Only use the name-only query if nothing useful
       came back.
    */

    if(
      collected.length
    ){

      break;

    }

  }


  if(
    !collected.length
  ){

    return null;

  }


  /*
     Remove duplicate Nominatim objects.
  */

  const unique =
    new Map();


  for(
    const item of collected
  ){

    const key =
      `${item?.osm_type || ""}:${item?.osm_id || item?.place_id || ""}`;

    if(
      !unique.has(
        key
      )
    ){

      unique.set(
        key,
        item
      );

    }

  }


  const ranked =
    [...unique.values()]
    .map(
      item=>
        osmCandidateScore(
          item,
          name,
          address,
          latitude,
          longitude
        )
    )
    .sort(
      (a,b)=>
        b.score -
        a.score
    );


  const best =
    ranked[0];


  if(!best){

    return null;

  }


  /*
     Strong identity requirement:
     never accept a nearby business just because
     Nominatim returned it first.
  */

  if(
    best.nameScore < 0.5
  ){

    return null;

  }


  if(
    latitude !== null &&
    longitude !== null &&
    best.distance !== null &&
    best.distance > 3
  ){

    return null;

  }


  if(
    best.score < 0.5
  ){

    return null;

  }


  return best.item;

}


/* =========================================================
   OSM DIRECT IMAGE
========================================================= */

function osmDirectImage(osm){

  const extra =
    osm?.extratags ||
    {};


  const candidates = [

    extra.image,

    extra["contact:image"],

    extra.wikimedia_commons,

    extra["wikimedia_commons:image"]

  ];


  for(
    const value of candidates
  ){

    if(!value){

      continue;

    }


    const raw =
      String(
        value
      )
      .trim();


    if(
      /^https?:\/\//i
      .test(
        raw
      )
    ){

      const url =
        safeHttpUrl(
          raw
        );

      if(
        url &&
        !badImage(
          url
        )
      ){

        return url;

      }

    }


    if(
      /^file:/i.test(
        raw
      )
    ){

      return commonsFileUrl(
        raw
      );

    }


    /*
       OSM wikimedia_commons can sometimes contain
       "Category:..." rather than an image.
       A category is not itself a usable venue photo.
    */

    if(
      /^category:/i.test(
        raw
      )
    ){

      continue;

    }

  }


  return "";

}


/* =========================================================
   WIKIDATA
========================================================= */

async function wikidataEntity(qid){

  const clean =
    text(
      qid,
      50
    )
    .toUpperCase();


  if(
    !/^Q\d+$/.test(
      clean
    )
  ){

    return null;

  }


  const url =
    WIKIDATA_ENTITY_URL
    +
    encodeURIComponent(
      clean
    )
    +
    ".json";


  const data =
    await fetchJson(
      url
    );


  return (
    data?.entities?.[
      clean
    ] ||
    null
  );

}


function wikidataLabels(entity){

  const labels =
    entity?.labels ||
    {};


  return Object.values(
    labels
  )
  .map(
    item=>
      text(
        item?.value,
        300
      )
  )
  .filter(Boolean);

}


function wikidataMatchesVenue(
  entity,
  venueName
){

  const labels =
    wikidataLabels(
      entity
    );


  if(
    !labels.length
  ){

    /*
       The QID came directly from the matched OSM
       venue, so missing labels are not enough to
       invalidate that explicit OSM relationship.
    */

    return true;

  }


  return labels.some(
    label=>
      nameMatchScore(
        venueName,
        label
      ) >= 0.5
  );

}


function wikidataP18(entity){

  const filename =
    entity
      ?.claims
      ?.P18
      ?.[0]
      ?.mainsnak
      ?.datavalue
      ?.value;


  if(!filename){

    return "";

  }


  return commonsFileUrl(
    filename
  );

}


async function wikidataPhoto(
  qid,
  venueName
){

  const entity =
    await wikidataEntity(
      qid
    );


  if(!entity){

    return "";

  }


  if(
    !wikidataMatchesVenue(
      entity,
      venueName
    )
  ){

    return "";

  }


  return wikidataP18(
    entity
  );

}


/* =========================================================
   WIKIPEDIA PAGE IMAGE
========================================================= */

function parseWikipediaTag(value){

  const raw =
    text(
      value,
      500
    );


  if(!raw){

    return null;

  }


  let language =
    "en";

  let title =
    raw;


  const colon =
    raw.indexOf(
      ":"
    );


  if(
    colon > 0
  ){

    const possibleLanguage =
      raw
      .slice(
        0,
        colon
      )
      .trim();


    if(
      /^[a-z]{2,3}$/i.test(
        possibleLanguage
      )
    ){

      language =
        possibleLanguage
        .toLowerCase();

      title =
        raw
        .slice(
          colon + 1
        )
        .trim();

    }

  }


  if(!title){

    return null;

  }


  return{
    language,
    title
  };

}


async function wikipediaPhoto(
  wikipediaTag,
  venueName
){

  const parsed =
    parseWikipediaTag(
      wikipediaTag
    );


  if(!parsed){

    return "";

  }


  const endpoint =
    `https://${parsed.language}.wikipedia.org/w/api.php`;


  const url =
    new URL(
      endpoint
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
    "prop",
    "pageimages|info"
  );

  url.searchParams.set(
    "piprop",
    "original|thumbnail|name"
  );

  url.searchParams.set(
    "pithumbsize",
    "1200"
  );

  url.searchParams.set(
    "titles",
    parsed.title
  );

  url.searchParams.set(
    "redirects",
    "1"
  );

  url.searchParams.set(
    "origin",
    "*"
  );


  const data =
    await fetchJson(
      url.toString()
    );


  const pages =
    Object.values(
      data?.query?.pages ||
      {}
    );


  const page =
    pages[0];


  if(
    !page ||
    page.missing !== undefined
  ){

    return "";

  }


  const pageName =
    page.title ||
    parsed.title;


  /*
     The Wikipedia tag came directly from the matched
     OSM venue, but we still reject an obviously
     unrelated title.
  */

  if(
    nameMatchScore(
      venueName,
      pageName
    ) < 0.35
  ){

    return "";

  }


  const image =
    safeHttpUrl(
      page?.original?.source ||
      page?.thumbnail?.source ||
      ""
    );


  if(
    !image ||
    badImage(
      image
    )
  ){

    return "";

  }


  return image;

}/* =========================================================
   WIKIMEDIA COMMONS
   STRICT VERIFIED FALLBACK

   Commons search is deliberately conservative.
   A random visually attractive image is worse than
   PETS & DOGUE fallback.

   We require strong textual evidence that the Commons
   file actually refers to the requested venue.
========================================================= */

function commonsBlockedTitle(value){

  const title =
    String(
      value ||
      ""
    );

  return (
    /logo|icon|flag|coat of arms|diagram|map|route|symbol|poster|menu|advert|advertisement|leaflet|brochure|floor plan|screenshot|qr code|barcode|certificate|award|portrait|headshot|svg/i
    .test(
      title
    )
  );

}


function commonsVenueScore(
  venueName,
  address,
  page
){

  const title =
    String(
      page?.title ||
      ""
    )
    .replace(
      /^File:/i,
      ""
    );


  const info =
    page?.imageinfo?.[0] ||
    {};


  const metadata =
    info.extmetadata ||
    {};


  const description =
    decodeHtml(
      metadata.ImageDescription
        ?.value ||
      metadata.ObjectName
        ?.value ||
      metadata.Categories
        ?.value ||
      ""
    )
    .replace(
      /<[^>]+>/g,
      " "
    );


  const combined =
    [
      title,
      description
    ]
    .filter(Boolean)
    .join(" ");


  const nameScore =
    nameMatchScore(
      venueName,
      combined
    );


  const addressScore =
    addressMatchScore(
      address,
      combined
    );


  let score =
    nameScore *
    0.82;


  if(
    addressScore > 0
  ){

    score +=
      Math.min(
        0.18,
        addressScore *
        0.18
      );

  }


  /*
     Exact venue phrase in filename or description
     is especially strong evidence.
  */

  const normalizedVenue =
    normalizeWords(
      venueName
    );


  const normalizedCombined =
    normalizeWords(
      combined
    );


  if(
    normalizedVenue.length >= 4 &&
    normalizedCombined.includes(
      normalizedVenue
    )
  ){

    score =
      Math.max(
        score,
        0.92
      );

  }


  return{
    score:
      Math.min(
        1,
        score
      ),

    nameScore,

    addressScore,

    combined
  };

}


async function wikimediaPhoto(
  name,
  address
){

  const venue =
    text(
      name,
      200
    );


  if(
    venue.length < 3
  ){

    return "";

  }


  /*
     Address is useful only as verification.
     We do not use generic searches such as
     "venue London", because that can easily
     return another branch or unrelated venue.
  */

  const addressTokens =
    text(
      address,
      350
    )
    .split(",")
    .map(
      item=>
        item.trim()
    )
    .filter(Boolean)
    .slice(
      0,
      3
    )
    .join(" ");


  const searches = [];


  if(
    addressTokens
  ){

    searches.push(
      `"${venue}" ${addressTokens}`
    );

  }


  searches.push(
    `"${venue}"`
  );


  let best =
    null;


  for(
    const searchText of searches
  ){

    const url =
      new URL(
        WIKIMEDIA_API
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
      "10"
    );

    url.searchParams.set(
      "prop",
      "imageinfo"
    );

    url.searchParams.set(
      "iiprop",
      "url|mime|size|extmetadata"
    );

    url.searchParams.set(
      "iiurlwidth",
      "1200"
    );


    const data =
      await fetchJson(
        url.toString()
      );


    const pages =
      Object.values(
        data?.query?.pages ||
        {}
      );


    for(
      const page of pages
    ){

      const title =
        String(
          page?.title ||
          ""
        );


      if(
        commonsBlockedTitle(
          title
        )
      ){

        continue;

      }


      const info =
        page?.imageinfo?.[0];


      if(!info){

        continue;

      }


      const mime =
        String(
          info.mime ||
          ""
        )
        .toLowerCase();


      if(
        mime &&
        !mime.startsWith(
          "image/"
        )
      ){

        continue;

      }


      if(
        mime.includes(
          "svg"
        ) ||
        mime.includes(
          "gif"
        )
      ){

        continue;

      }


      /*
         Reject tiny files where dimensions are known.
      */

      const width =
        Number(
          info.width ||
          0
        );


      const height =
        Number(
          info.height ||
          0
        );


      if(
        width &&
        height &&
        (
          width < 500 ||
          height < 280
        )
      ){

        continue;

      }


      const image =
        safeHttpUrl(
          info.thumburl ||
          info.url ||
          ""
        );


      if(
        !image ||
        badImage(
          image
        )
      ){

        continue;

      }


      const match =
        commonsVenueScore(
          venue,
          address,
          page
        );


      /*
         Very high threshold on purpose.
         If Commons cannot strongly identify the venue,
         we show PETS & DOGUE fallback instead.
      */

      if(
        match.score < 0.78
      ){

        continue;

      }


      if(
        !best ||
        match.score >
        best.score
      ){

        best = {
          image,
          score:
            match.score
        };

      }

    }


    if(
      best &&
      best.score >= 0.92
    ){

      break;

    }

  }


  return best
    ?.image ||
    "";

}


/* =========================================================
   WEBSITE RESOLUTION
========================================================= */

async function officialWebsitePhoto(
  website,
  venueName
){

  if(!website){

    return "";

  }


  const page =
    await fetchHtml(
      website
    );


  if(
    !page.html ||
    !page.finalUrl
  ){

    return "";

  }


  return websitePhoto(
    page.html,
    page.finalUrl,
    venueName
  );

}


/* =========================================================
   BODY
========================================================= */

function bodyOf(req){

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
   PHOTO RESPONSE
========================================================= */

function photoResponse(
  res,
  source,
  photo,
  confidence
){

  return send(
    res,
    200,
    {
      ok:true,

      source,

      photo:
        photo ||
        "",

      confidence:
        confidence ||
        "high"
    }
  );

}


/* =========================================================
   MAIN
========================================================= */

module.exports =
async function handler(
  req,
  res
){

  setHeaders(
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


  if(
    req.method !==
    "POST"
  ){

    return send(
      res,
      405,
      {
        ok:false,

        error:
          "Method not allowed."
      }
    );

  }


  const body =
    bodyOf(
      req
    );


  const name =
    text(
      body.name,
      300
    );


  const address =
    text(
      body.address,
      1000
    );


  const website =
    safeHttpUrl(
      body.website
    );


  const latitude =
    numberOrNull(
      body.latitude
    );


  const longitude =
    numberOrNull(
      body.longitude
    );


  if(!name){

    return send(
      res,
      400,
      {
        ok:false,

        error:
          "Place name is required."
      }
    );

  }


  /* =====================================================
     1. MATCH THE EXACT OSM VENUE

     Nominatim result is not trusted simply because
     it appears first. osmMetadata() already applies
     venue-name/address/coordinate verification.
  ===================================================== */

  const osm =
    await osmMetadata(
      name,
      address,
      latitude,
      longitude
    );


  if(osm){

    const direct =
      osmDirectImage(
        osm
      );


    /*
       This is strongest because the image field is
       directly attached to the matched OSM object.
    */

    if(direct){

      return photoResponse(
        res,
        "openstreetmap",
        direct,
        "very-high"
      );

    }


    const extra =
      osm.extratags ||
      {};


    /* ===================================================
       2. OSM-LINKED WIKIDATA P18
    =================================================== */

    if(
      extra.wikidata
    ){

      const image =
        await wikidataPhoto(
          extra.wikidata,
          name
        );


      if(image){

        return photoResponse(
          res,
          "wikidata",
          image,
          "very-high"
        );

      }

    }


    /* ===================================================
       3. OSM-LINKED WIKIPEDIA
    =================================================== */

    if(
      extra.wikipedia
    ){

      const image =
        await wikipediaPhoto(
          extra.wikipedia,
          name
        );


      if(image){

        return photoResponse(
          res,
          "wikipedia",
          image,
          "very-high"
        );

      }

    }

  }


  /* =====================================================
     4. OFFICIAL WEBSITE

     Only use the image if the website itself appears
     connected to the requested venue.
  ===================================================== */

  if(website){

    const image =
      await officialWebsitePhoto(
        website,
        name
      );


    if(image){

      return photoResponse(
        res,
        "official-website",
        image,
        "high"
      );

    }

  }


  /* =====================================================
     5. STRICT WIKIMEDIA COMMONS SEARCH

     This is intentionally last.
     Commons must strongly identify the venue.
  ===================================================== */

  const commons =
    await wikimediaPhoto(
      name,
      address
    );


  if(commons){

    return photoResponse(
      res,
      "wikimedia",
      commons,
      "verified"
    );

  }


  /* =====================================================
     6. NOTHING VERIFIED

     Do NOT manufacture a photo.
     The frontend already has the PETS & DOGUE
     branded fallback for this exact situation.
  ===================================================== */

  return send(
    res,
    200,
    {
      ok:true,

      source:
        "fallback",

      photo:"",

      confidence:
        "none"
    }
  );

};
