"use strict";

/*
=========================================================
PETS & DOGUE
PARTNER REDEMPTION LOGIN
=========================================================

Purpose:

- authenticate an authorised PETS & DOGUE partner
- NEVER expose PETS_DOGUE_REDEEM_SECRET to public HTML
- validate the partner access secret on the server
- create a signed HttpOnly partner session cookie
- session expires automatically after 12 hours

The browser cannot read the resulting cookie.
It is sent automatically to protected /api endpoints.
=========================================================
*/

const crypto =
  require("crypto");

const PARTNER_COOKIE_NAME =
  "pets_dogue_partner_redeem_session";

const COOKIE_VERSION =
  "v1";

const SESSION_SECONDS =
  12 * 60 * 60;

/* =========================================================
RESPONSE
========================================================= */

function sendJson(
  res,
  status,
  payload
) {

  res.statusCode =
    status;

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store, max-age=0"
  );

  res.setHeader(
    "Pragma",
    "no-cache"
  );

  res.setHeader(
    "X-Content-Type-Options",
    "nosniff"
  );

  res.setHeader(
    "Referrer-Policy",
    "no-referrer"
  );

  res.end(
    JSON.stringify(
      payload
    )
  );

}

/* =========================================================
CLEAN STRING
========================================================= */

function cleanString(
  value,
  maxLength = 2000
) {

  if (
    typeof value !==
      "string"
  ) {

    return "";

  }

  return value
    .trim()
    .slice(
      0,
      maxLength
    );

}

/* =========================================================
SAFE COMPARE
========================================================= */

function safeEqual(
  first,
  second
) {

  const a =
    Buffer.from(
      String(
        first ||
        ""
      )
    );

  const b =
    Buffer.from(
      String(
        second ||
        ""
      )
    );

  if (
    a.length !==
      b.length
  ) {

    return false;

  }

  return crypto
    .timingSafeEqual(
      a,
      b
    );

}

/* =========================================================
REQUEST BODY
========================================================= */

async function readRequestBody(
  req
) {

  if (
    req.body &&
    typeof req.body ===
      "object"
  ) {

    return req.body;

  }

  if (
    typeof req.body ===
      "string"
  ) {

    if (
      req.body.length >
        10000
    ) {

      throw new Error(
        "Request too large."
      );

    }

    if (
      !req.body.trim()
    ) {

      return {};

    }

    try {

      return JSON.parse(
        req.body
      );

    } catch {

      return {};

    }

  }

  const chunks =
    [];

  let total =
    0;

  for await (
    const chunk of req
  ) {

    const buffer =
      Buffer.isBuffer(
        chunk
      )
        ? chunk
        : Buffer.from(
            chunk
          );

    total +=
      buffer.length;

    if (
      total >
        10000
    ) {

      throw new Error(
        "Request too large."
      );

    }

    chunks.push(
      buffer
    );

  }

  if (
    !chunks.length
  ) {

    return {};

  }

  const raw =
    Buffer
      .concat(
        chunks
      )
      .toString(
        "utf8"
      )
      .trim();

  if (
    !raw
  ) {

    return {};

  }

  try {

    return JSON.parse(
      raw
    );

  } catch {

    return {};

  }

}

/* =========================================================
REDEEM SECRET
========================================================= */

function getRedeemSecret() {

  return cleanString(
    process.env
      .PETS_DOGUE_REDEEM_SECRET ||
    "",
    2000
  );

}

/* =========================================================
PARTNER COOKIE SECRET
========================================================= */

function getPartnerCookieSecret(
  redeemSecret
) {

  return crypto
    .createHash(
      "sha256"
    )
    .update(
      `pets-dogue-partner-session:${redeemSecret}`
    )
    .digest(
      "hex"
    );

}

/* =========================================================
SIGN SESSION
========================================================= */

function signPayload(
  encodedPayload,
  secret
) {

  return crypto
    .createHmac(
      "sha256",
      secret
    )
    .update(
      encodedPayload
    )
    .digest(
      "base64url"
    );

}

/* =========================================================
CREATE PARTNER SESSION
========================================================= */

function createPartnerSession(
  redeemSecret
) {

  const now =
    Math.floor(
      Date.now() /
      1000
    );

  const expiresAt =
    now +
    SESSION_SECONDS;

  const payload = {

    role:
      "partner_redeem",

    iat:
      now,

    exp:
      expiresAt,

    nonce:
      crypto
        .randomBytes(
          12
        )
        .toString(
          "hex"
        )

  };

  const encodedPayload =
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

  const secret =
    getPartnerCookieSecret(
      redeemSecret
    );

  const signature =
    signPayload(
      encodedPayload,
      secret
    );

  return {

    value:
      [
        COOKIE_VERSION,
        encodedPayload,
        signature
      ]
      .join("."),

    expiresAt

  };

}

/* =========================================================
SET COOKIE
========================================================= */

function setPartnerCookie(
  res,
  session
) {

  res.setHeader(
    "Set-Cookie",
    [
      `${PARTNER_COOKIE_NAME}=${session.value}`,
      "Path=/api/",
      `Max-Age=${SESSION_SECONDS}`,
      "HttpOnly",
      "Secure",
      "SameSite=Strict"
    ]
    .join("; ")
  );

}

/* =========================================================
HANDLER
========================================================= */

module.exports =
async function handler(
  req,
  res
) {

  if (
    req.method !==
      "POST"
  ) {

    res.setHeader(
      "Allow",
      "POST"
    );

    return sendJson(
      res,
      405,
      {

        ok:
          false,

        error:
          "Method not allowed."

      }
    );

  }

  const redeemSecret =
    getRedeemSecret();

  if (
    redeemSecret.length <
      32
  ) {

    console.error(
      "PETS & DOGUE partner login: PETS_DOGUE_REDEEM_SECRET is not configured."
    );

    return sendJson(
      res,
      503,
      {

        ok:
          false,

        error:
          "Partner redemption is not configured."

      }
    );

  }

  let body;

  try {

    body =
      await readRequestBody(
        req
      );

  } catch {

    return sendJson(
      res,
      400,
      {

        ok:
          false,

        error:
          "Invalid request."

      }
    );

  }

  const accessKey =
    cleanString(
      body?.accessKey ||
      body?.key ||
      "",
      2000
    );

  if (
    !accessKey
  ) {

    return sendJson(
      res,
      400,
      {

        ok:
          false,

        error:
          "Partner access key is required."

      }
    );

  }

  if (
    !safeEqual(
      accessKey,
      redeemSecret
    )
  ) {

    /*
    Never reveal whether any part of the key was correct.
    */

    return sendJson(
      res,
      401,
      {

        ok:
          false,

        authenticated:
          false,

        error:
          "Invalid partner access key."

      }
    );

  }

  const session =
    createPartnerSession(
      redeemSecret
    );

  setPartnerCookie(
    res,
    session
  );

  return sendJson(
    res,
    200,
    {

      ok:
        true,

      authenticated:
        true,

      expiresAt:
        new Date(
          session.expiresAt *
          1000
        )
        .toISOString()

    }
  );

};
