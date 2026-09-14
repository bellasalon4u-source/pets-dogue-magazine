"use strict";

/* =========================================================
   PETS & DOGUE
   FREE VENUE PHOTO RESOLVER

   FREE PHOTO ORDER:
   1. OpenStreetMap / Nominatim metadata
   2. Wikidata P18 image
   3. Wikipedia page image
   4. Official website image
   5. Wikimedia Commons search

   No Google Places Photos.
========================================================= */

const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/search";

const WIKIDATA_ENTITY_URL =
  "https://www.wikidata.org/wiki/Special:EntityData/";

const WIKIMEDIA_API =
  "https://commons.wikimedia.org/w/api.php";

const WIKIPEDIA_API =
  "https://en.wikipedia.org/w/api.php";

const TIMEOUT =
  7000;

const MAX_HTML_BYTES =
  1200000;


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
   HELPERS
========================================================= */

function text(
  value,
  max = 3000
){

  return String(
    value ??
    ""
  )
  .replace(/\u0000/g,"")
  .trim()
  .slice(
    0,
    max
  );

}


function numberOrNull(value){

  const number =
    Number(value);

  return Number.isFinite(number)
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
  .replace(/&gt;/gi,">");

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
      new URL(raw);

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
    encodeURIComponent(raw)
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

    if(!response.ok){

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
   PRIVATE NETWORK PROTECTION
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
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
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
    Number(match172[1]) >= 16 &&
    Number(match172[1]) <= 31
  ){

    return true;

  }

  if(
    host === "::1" ||
    host.startsWith("fc") ||
    host.startsWith("fd") ||
    host.startsWith("fe80:")
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
      require("node:dns")
        .promises;

    const addresses =
      await dns.lookup(
        hostname,
        {
          all:true,
          verbatim:true
        }
      );

    if(!addresses.length){

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
   SAFE WEBSITE FETCH
========================================================= */

async function fetchHtml(startUrl){

  let current =
    safeHttpUrl(
      startUrl
    );

  for(
    let redirect=0;
    redirect<4;
    redirect++
  ){

    if(!current){

      return{
        html:"",
        finalUrl:""
      };

    }

    const parsed =
      new URL(
        current
      );

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
                "Mozilla/5.0 PETS-DOGUE/1.0",

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

        if(!location){

          break;

        }

        current =
          new URL(
            location,
            current
          ).href;

        continue;

      }

      if(!response.ok){

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
   META IMAGE
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


/* =========================================================
   WEBSITE IMAGE EXTRACTION
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
    url.startsWith("data:") ||
    url.includes("logo") ||
    url.includes("favicon") ||
    url.includes("icon") ||
    url.includes("sprite") ||
    url.includes("avatar") ||
    url.includes("placeholder") ||
    url.includes("tracking") ||
    url.includes("pixel") ||
    url.includes("badge") ||
    url.endsWith(".svg")
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

}


function websitePhoto(
  html,
  pageUrl
){

  if(
    !html ||
    !pageUrl
  ){

    return "";

  }

  const meta = [

    metaContent(
      html,
      "og:image"
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


  const tags =
    html.match(
      /<img\b[^>]*>/gi
    ) || [];


  for(
    const tag of tags
  ){

    const attributes = [

      /(?:data-src)=["']([^"']+)["']/i,

      /(?:data-lazy-src)=["']([^"']+)["']/i,

      /(?:data-original)=["']([^"']+)["']/i,

      /(?:src)=["']([^"']+)["']/i

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

        const url =
          resolveImage(
            match[1],
            pageUrl
          );

        if(url){

          return url;

        }

      }

    }


    const srcset =
      tag.match(
        /(?:srcset|data-srcset)=["']([^"']+)["']/i
      );


    if(
      srcset?.[1]
    ){

      const candidates =
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


      for(
        const candidate of candidates
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

    }

  }


  return "";

}


/* =========================================================
   OSM / NOMINATIM LOOKUP
========================================================= */

async function osmMetadata(
  name,
  address,
  latitude,
  longitude
){

  const query =
    [
      name,
      address
    ]
    .filter(Boolean)
    .join(", ");


  if(
    query.length < 3
  ){

    return null;

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
    "5"
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

    const delta =
      0.03;

    url.searchParams.set(
      "viewbox",
      [
        longitude-delta,
        latitude+delta,
        longitude+delta,
        latitude-delta
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
    !Array.isArray(data) ||
    !data.length
  ){

    return null;

  }


  const targetName =
    String(name)
    .toLowerCase();


  const best =
    data.find(
      item=>
        String(
          item.display_name ||
          ""
        )
        .toLowerCase()
        .includes(
          targetName
        )
    )
    ||
    data[0];


  return best;

}/* =========================================================
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


    if(
      /^https?:\/\//i
        .test(value)
    ){

      const url =
        safeHttpUrl(
          value
        );

      if(url){

        return url;

      }

    }


    if(
      String(value)
        .toLowerCase()
        .startsWith(
          "file:"
        )
    ){

      return commonsFileUrl(
        value
      );

    }

  }


  return "";

}


/* =========================================================
   WIKIDATA P18
========================================================= */

async function wikidataPhoto(qid){

  const clean =
    text(
      qid,
      50
    );


  if(
    !/^Q\d+$/i.test(
      clean
    )
  ){

    return "";

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


  const entity =
    data?.entities?.[
      clean
    ];


  const claims =
    entity?.claims ||
    {};


  const imageClaim =
    claims?.P18?.[0];


  const filename =
    imageClaim
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


/* =========================================================
   WIKIPEDIA PAGE IMAGE
========================================================= */

async function wikipediaPhoto(
  wikipediaTag
){

  const raw =
    text(
      wikipediaTag,
      500
    );


  if(!raw){

    return "";

  }


  let language =
    "en";

  let title =
    raw;


  if(
    raw.includes(":")
  ){

    const parts =
      raw.split(":");

    if(
      /^[a-z]{2,3}$/i.test(
        parts[0]
      )
    ){

      language =
        parts.shift();

      title =
        parts.join(":");

    }

  }


  const endpoint =
    `https://${language}.wikipedia.org/w/api.php`;


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
    "pageimages"
  );

  url.searchParams.set(
    "piprop",
    "original|thumbnail"
  );

  url.searchParams.set(
    "pithumbsize",
    "1200"
  );

  url.searchParams.set(
    "titles",
    title
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


  return safeHttpUrl(
    page?.original?.source ||
    page?.thumbnail?.source ||
    ""
  );

}


/* =========================================================
   WIKIMEDIA SEARCH
========================================================= */

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


  const area =
    text(
      address,
      350
    )
    .split(",")
    .slice(
      0,
      4
    )
    .join(" ");


  const searches = [

    `"${venue}" ${area}`,

    `${venue} London`,

    venue

  ];


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
      "8"
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
        url.toString()
      );


    const pages =
      Object.values(
        data?.query?.pages ||
        {}
      );


    const blocked =
      /logo|icon|map|flag|coat of arms|diagram|svg|poster|menu|symbol/i;


    for(
      const page of pages
    ){

      const title =
        String(
          page?.title ||
          ""
        );


      if(
        blocked.test(
          title
        )
      ){

        continue;

      }


      const image =
        safeHttpUrl(
          page?.imageinfo?.[0]?.thumburl ||
          page?.imageinfo?.[0]?.url ||
          ""
        );


      if(image){

        return image;

      }

    }

  }


  return "";

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
     1. OPENSTREETMAP / NOMINATIM
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


    if(direct){

      return send(
        res,
        200,
        {
          ok:true,
          source:
            "openstreetmap",
          photo:
            direct
        }
      );

    }


    const extra =
      osm.extratags ||
      {};


    if(
      extra.wikidata
    ){

      const image =
        await wikidataPhoto(
          extra.wikidata
        );


      if(image){

        return send(
          res,
          200,
          {
            ok:true,
            source:
              "wikidata",
            photo:
              image
          }
        );

      }

    }


    if(
      extra.wikipedia
    ){

      const image =
        await wikipediaPhoto(
          extra.wikipedia
        );


      if(image){

        return send(
          res,
          200,
          {
            ok:true,
            source:
              "wikipedia",
            photo:
              image
          }
        );

      }

    }

  }


  /* =====================================================
     2. OFFICIAL WEBSITE
  ===================================================== */

  if(website){

    const page =
      await fetchHtml(
        website
      );


    const image =
      websitePhoto(
        page.html,
        page.finalUrl
      );


    if(image){

      return send(
        res,
        200,
        {
          ok:true,
          source:
            "official-website",
          photo:
            image
        }
      );

    }

  }


  /* =====================================================
     3. WIKIMEDIA COMMONS SEARCH
  ===================================================== */

  const commons =
    await wikimediaPhoto(
      name,
      address
    );


  if(commons){

    return send(
      res,
      200,
      {
        ok:true,
        source:
          "wikimedia",
        photo:
          commons
      }
    );

  }


  /* =====================================================
     NOTHING FOUND
  ===================================================== */

  return send(
    res,
    200,
    {
      ok:true,
      source:
        "fallback",
      photo:""
    }
  );

};
