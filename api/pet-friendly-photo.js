"use strict";

/* =========================================================
   PETS & DOGUE
   FREE VENUE PHOTO RESOLVER

   Order:
   1. Official venue website:
      og:image
      twitter:image
   2. Wikimedia Commons fallback

   No Google Places photo API.
========================================================= */

const WIKIMEDIA_API =
  "https://commons.wikimedia.org/w/api.php";

const TIMEOUT =
  6500;

const MAX_HTML_BYTES =
  900000;


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
  max = 2000
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


function safeHttpUrl(value){

  const raw =
    text(
      value,
      3000
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


function htmlDecode(value){

  return String(
    value ||
    ""
  )
  .replace(/&amp;/gi,"&")
  .replace(/&quot;/gi,'"')
  .replace(/&#39;/gi,"'")
  .replace(/&lt;/gi,"<")
  .replace(/&gt;/gi,">");

}


/* =========================================================
   SSRF PROTECTION
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
   SAFE WEBSITE FETCH
========================================================= */

async function fetchHtml(
  startUrl
){

  let current =
    safeHttpUrl(
      startUrl
    );


  for(
    let redirect = 0;
    redirect < 4;
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


    const allowed =
      await hostnameIsSafe(
        parsed.hostname
      );


    if(!allowed){

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

          return{
            html:"",
            finalUrl:""
          };

        }


        current =
          new URL(
            location,
            current
          ).href;


        continue;

      }


      if(!response.ok){

        return{
          html:"",
          finalUrl:""
        };

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

        return{
          html:"",
          finalUrl:""
        };

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

      return{
        html:"",
        finalUrl:""
      };

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
   META IMAGE PARSER
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

      return htmlDecode(
        match[1]
      );

    }

  }


  return "";

}


function websiteImage(
  html,
  pageUrl
){

  if(
    !html ||
    !pageUrl
  ){

    return "";

  }


  const candidate =
    metaContent(
      html,
      "og:image"
    )
    ||
    metaContent(
      html,
      "og:image:url"
    )
    ||
    metaContent(
      html,
      "twitter:image"
    )
    ||
    metaContent(
      html,
      "twitter:image:src"
    );


  if(!candidate){

    return "";

  }


  try{

    const resolved =
      new URL(
        candidate,
        pageUrl
      );


    if(
      resolved.protocol === "https:" ||
      resolved.protocol === "http:"
    ){

      return resolved.href;

    }

  }catch{}


  return "";

}


/* =========================================================
   WIKIMEDIA
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


  const locality =
    text(
      address,
      300
    )
    .split(",")
    .slice(
      0,
      3
    )
    .join(" ");


  const query =
    [
      `"${venue}"`,
      locality
    ]
    .filter(Boolean)
    .join(" ");


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
    query
  );

  url.searchParams.set(
    "gsrnamespace",
    "6"
  );

  url.searchParams.set(
    "gsrlimit",
    "6"
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
          signal:
            controller.signal
        }
      );


    if(!response.ok){

      return "";

    }


    const data =
      await response.json();


    const pages =
      Object.values(
        data?.query?.pages ||
        {}
      );


    const blocked =
      /logo|icon|map|flag|coat of arms|diagram|svg|poster|menu/i;


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
        page?.imageinfo?.[0]?.thumburl
        ||
        page?.imageinfo?.[0]?.url
        ||
        "";


      const safe =
        safeHttpUrl(
          image
        );


      if(safe){

        return safe;

      }

    }


    return "";

  }catch{

    return "";

  }finally{

    clearTimeout(
      timer
    );

  }

}


/* =========================================================
   BODY
========================================================= */

function bodyOf(req){

  if(
    req.body &&
    typeof req.body === "object"
  ){

    return req.body;

  }


  if(
    typeof req.body === "string"
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
    req.method === "OPTIONS"
  ){

    res
      .status(204)
      .end();

    return;

  }


  if(
    req.method !== "POST"
  ){

    return send(
      res,
      405,
      {
        ok:false,
        error:"Method not allowed."
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


  if(!name){

    return send(
      res,
      400,
      {
        ok:false,
        error:"Place name is required."
      }
    );

  }


  /* -------------------------
     1. OFFICIAL WEBSITE
  ------------------------- */

  if(website){

    const page =
      await fetchHtml(
        website
      );


    const photo =
      websiteImage(
        page.html,
        page.finalUrl
      );


    if(photo){

      return send(
        res,
        200,
        {
          ok:true,
          source:"website",
          photo
        }
      );

    }

  }


  /* -------------------------
     2. WIKIMEDIA
  ------------------------- */

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
        source:"wikimedia",
        photo:
          commons
      }
    );

  }


  /* -------------------------
     NOTHING FOUND
  ------------------------- */

  return send(
    res,
    200,
    {
      ok:true,
      source:"fallback",
      photo:""
    }
  );

};
