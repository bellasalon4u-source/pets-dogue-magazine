"use strict";

const crypto = require("crypto");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function supabaseHeaders() {
  const headers = {
    "Content-Type": "application/json",
    apikey: SUPABASE_SECRET_KEY || "",
    Prefer: "return=representation"
  };

  if (
    typeof SUPABASE_SECRET_KEY === "string" &&
    SUPABASE_SECRET_KEY.startsWith("eyJ")
  ) {
    headers.Authorization = `Bearer ${SUPABASE_SECRET_KEY}`;
  }

  return headers;
}

function getClientIp(req) {
  const forwarded =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    "";

  if (Array.isArray(forwarded)) {
    return forwarded[0] || "";
  }

  return String(forwarded)
    .split(",")[0]
    .trim();
}

function getUserAgent(req) {
  return String(req.headers["user-agent"] || "").trim();
}

function createVoterHash(req) {
  const ip = getClientIp(req);
  const userAgent = getUserAgent(req);

  const secretSource =
    process.env.PETS_DOGUE_VOTE_SECRET ||
    process.env.STRIPE_SECRET_KEY ||
    SUPABASE_SECRET_KEY ||
    "pets-dogue-cover-star";

  return crypto
    .createHmac("sha256", secretSource)
    .update(`${ip}|${userAgent}`)
    .digest("hex");
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(value || "")
  );
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  return await new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;

      if (data.length > 100000) {
        reject(new Error("Request body too large."));
      }
    });

    req.on("end", () => {
      if (!data) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error("Invalid JSON."));
      }
    });

    req.on("error", reject);
  });
}

async function loadCandidate(candidateId) {
  const endpoint =
    `${SUPABASE_URL}/rest/v1/cover_star_candidates` +
    `?select=id,status,voting_starts_at,voting_ends_at,votes_count` +
    `&id=eq.${encodeURIComponent(candidateId)}` +
    `&limit=1`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: supabaseHeaders()
  });

  const rawText = await response.text();

  let rows = [];

  try {
    rows = rawText ? JSON.parse(rawText) : [];
  } catch {
    rows = [];
  }

  if (!response.ok) {
    throw new Error(`Candidate lookup failed: ${response.status}`);
  }

  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

async function insertVote(candidateId, voterHash) {
  const endpoint =
    `${SUPABASE_URL}/rest/v1/cover_star_votes`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: supabaseHeaders(),
    body: JSON.stringify({
      candidate_id: candidateId,
      voter_hash: voterHash
    })
  });

  const rawText = await response.text();

  let result = null;

  try {
    result = rawText ? JSON.parse(rawText) : null;
  } catch {
    result = null;
  }

  return {
    ok: response.ok,
    status: response.status,
    result,
    rawText
  };
}

async function getVoteCount(candidateId) {
  const endpoint =
    `${SUPABASE_URL}/rest/v1/cover_star_candidates` +
    `?select=votes_count` +
    `&id=eq.${encodeURIComponent(candidateId)}` +
    `&limit=1`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: supabaseHeaders()
  });

  const rawText = await response.text();

  let rows = [];

  try {
    rows = rawText ? JSON.parse(rawText) : [];
  } catch {
    rows = [];
  }

  if (!response.ok) {
    throw new Error(`Vote count lookup failed: ${response.status}`);
  }

  if (!Array.isArray(rows) || !rows.length) {
    return 0;
  }

  return Number(rows[0].votes_count || 0);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return sendJson(res, 405, {
      ok: false,
      error: "Method not allowed."
    });
  }

  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    return sendJson(res, 500, {
      ok: false,
      error: "Cover Star voting is not configured."
    });
  }

  try {
    const body = await readJsonBody(req);

    const candidateId =
      String(body?.candidateId || "").trim();

    if (!isUuid(candidateId)) {
      return sendJson(res, 400, {
        ok: false,
        error: "Invalid candidate."
      });
    }

    const candidate =
      await loadCandidate(candidateId);

    if (!candidate) {
      return sendJson(res, 404, {
        ok: false,
        error: "Candidate not found."
      });
    }

    if (candidate.status !== "active") {
      return sendJson(res, 409, {
        ok: false,
        error: "Voting is not active for this candidate."
      });
    }

    const now = Date.now();

    if (
      candidate.voting_starts_at &&
      new Date(candidate.voting_starts_at).getTime() > now
    ) {
      return sendJson(res, 409, {
        ok: false,
        error: "Voting has not started yet."
      });
    }

    if (
      candidate.voting_ends_at &&
      new Date(candidate.voting_ends_at).getTime() < now
    ) {
      return sendJson(res, 409, {
        ok: false,
        error: "Voting has ended."
      });
    }

    const voterHash =
      createVoterHash(req);

    const insert =
      await insertVote(
        candidateId,
        voterHash
      );

    if (!insert.ok) {
      const duplicate =
        insert.status === 409 ||
        /duplicate key/i.test(insert.rawText || "") ||
        /23505/.test(insert.rawText || "");

      if (duplicate) {
        const votes =
          await getVoteCount(candidateId);

        return sendJson(res, 200, {
          ok: true,
          duplicate: true,
          votes
        });
      }

      console.error(
        "PETS & DOGUE vote insert error:",
        insert.status,
        insert.rawText
      );

      return sendJson(res, 502, {
        ok: false,
        error: "Unable to save vote."
      });
    }

    const votes =
      await getVoteCount(candidateId);

    return sendJson(res, 200, {
      ok: true,
      duplicate: false,
      votes
    });
  } catch (error) {
    console.error(
      "PETS & DOGUE Cover Star vote API error:",
      error
    );

    return sendJson(res, 500, {
      ok: false,
      error: "Unable to save vote."
    });
  }
};
