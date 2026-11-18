"use strict";

/*
  PETS & DOGUE — Help authentication API

  GET  /api/help-auth
       Returns the Supabase URL and publishable key for the site.

  POST /api/help-auth
       { "action": "signup", "email": "...", "password": "...",
         "privacy_policy_accepted": true }
       { "action": "login", "email": "...", "password": "..." }

  Environment variables:
  - SUPABASE_URL
  - SUPABASE_PUBLISHABLE_KEY
*/

const SUPABASE_URL = String(
  process.env.SUPABASE_URL || ""
).replace(/\/+$/, "");

const SUPABASE_PUBLISHABLE_KEY = String(
  process.env.SUPABASE_PUBLISHABLE_KEY || ""
).trim();

const PRIVACY_POLICY_VERSION = "v1";

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.end(JSON.stringify(payload));
}

function getConfigError() {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return "Authentication is not configured.";
  }

  try {
    const url = new URL(SUPABASE_URL);
    if (url.protocol !== "https:") {
      return "Authentication is not configured.";
    }
  } catch {
    return "Authentication is not configured.";
  }

  return "";
}

function isSameOrigin(req) {
  const originHeader = req.headers && req.headers.origin;
  if (!originHeader) return true;

  const requestHost = String(
    req.headers.host || ""
  ).toLowerCase();

  try {
    const originHost = new URL(originHeader).host.toLowerCase();
    return Boolean(requestHost && originHost === requestHost);
  } catch {
    return false;
  }
}

function readBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }

  return null;
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function validEmail(value) {
  return (
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

function getUpstreamError(data) {
  const message =
    data && (
      data.msg ||
      data.message ||
      data.error_description ||
      data.error
    );

  if (typeof message === "string" && message.trim()) {
    return message.trim().slice(0, 240);
  }

  return "Sign-in could not be completed. Please try again.";
}

function safeSession(data) {
  if (!data || !data.access_token) return null;

  return {
    access_token: String(data.access_token),
    refresh_token: String(data.refresh_token || ""),
    token_type: String(data.token_type || "bearer"),
    expires_in: Number(data.expires_in || 0),
    expires_at: Number(data.expires_at || 0)
  };
}

function safeUser(data) {
  const user = data && data.user;
  if (!user || typeof user !== "object") return null;

  return {
    id: String(user.id || ""),
    email: String(user.email || ""),
    email_confirmed_at: user.email_confirmed_at || null
  };
}

async function authenticate(action, email, password, accepted) {
  const isSignup = action === "signup";
  const endpoint = isSignup
    ? `${SUPABASE_URL}/auth/v1/signup`
    : `${SUPABASE_URL}/auth/v1/token?grant_type=password`;

  const payload = {
    email,
    password
  };

  if (isSignup) {
    payload.data = {
      privacy_policy_accepted: true,
      privacy_policy_accepted_at: new Date().toISOString(),
      privacy_policy_version: PRIVACY_POLICY_VERSION
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const status =
      response.status >= 400 && response.status < 500
        ? response.status
        : 502;

    return {
      status,
      body: {
        ok: false,
        error: getUpstreamError(data)
      }
    };
  }

  return {
    status: 200,
    body: {
      ok: true,
      action,
      session: safeSession(data),
      user: safeUser(data),
      needsEmailConfirmation: isSignup && !data.access_token,
      privacyPolicyAccepted: isSignup ? accepted : undefined,
      privacyPolicyVersion: isSignup
        ? PRIVACY_POLICY_VERSION
        : undefined
    }
  };
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    return sendJson(res, 204, {});
  }

  if (!isSameOrigin(req)) {
    return sendJson(res, 403, {
      ok: false,
      error: "This request is not allowed."
    });
  }

  const configError = getConfigError();
  if (configError) {
    return sendJson(res, 503, {
      ok: false,
      error: configError
    });
  }

  if (req.method === "GET") {
    return sendJson(res, 200, {
      ok: true,
      supabaseUrl: SUPABASE_URL,
      publishableKey: SUPABASE_PUBLISHABLE_KEY,
      privacyPolicyVersion: PRIVACY_POLICY_VERSION
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    return sendJson(res, 405, {
      ok: false,
      error: "Method not allowed."
    });
  }

  const body = readBody(req);
  if (!body) {
    return sendJson(res, 400, {
      ok: false,
      error: "Enter your email and password."
    });
  }

  const action = String(body.action || "").trim();
  const email = cleanEmail(body.email);
  const password = String(body.password || "");

  if (action !== "signup" && action !== "login") {
    return sendJson(res, 400, {
      ok: false,
      error: "Choose sign-up or sign-in."
    });
  }

  if (!validEmail(email)) {
    return sendJson(res, 400, {
      ok: false,
      error: "Enter a valid email address."
    });
  }

  if (password.length < 6 || password.length > 128) {
    return sendJson(res, 400, {
      ok: false,
      error: "Password must be between 6 and 128 characters."
    });
  }

  if (
    action === "signup" &&
    body.privacy_policy_accepted !== true
  ) {
    return sendJson(res, 400, {
      ok: false,
      error: "Accept the Privacy Policy before registering."
    });
  }

  try {
    const result = await authenticate(
      action,
      email,
      password,
      body.privacy_policy_accepted === true
    );

    return sendJson(res, result.status, result.body);
  } catch (error) {
    console.error("PETS & DOGUE authentication API error:", error);

    return sendJson(res, 502, {
      ok: false,
      error: "Authentication is temporarily unavailable."
    });
  }
};
