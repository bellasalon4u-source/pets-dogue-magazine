"use strict";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

function supabaseHeaders() {
  const headers = {
    "Content-Type": "application/json",
    apikey: SUPABASE_SECRET_KEY || ""
  };

  /*
    Legacy JWT service-role keys require Authorization.
    New Supabase secret keys beginning with sb_secret_
    should be sent as apikey only.
  */
  if (
    typeof SUPABASE_SECRET_KEY === "string" &&
    SUPABASE_SECRET_KEY.startsWith("eyJ")
  ) {
    headers.Authorization = `Bearer ${SUPABASE_SECRET_KEY}`;
  }

  return headers;
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, {
      ok: false,
      error: "Method not allowed."
    });
  }

  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    return sendJson(res, 500, {
      ok: false,
      error: "Cover Star database is not configured."
    });
  }

  try {
    const now = new Date().toISOString();

    const endpoint =
      `${SUPABASE_URL}/rest/v1/cover_star_candidates` +
      `?select=id,name,species,breed,image_url,preview,story,votes_count,display_order,voting_starts_at,voting_ends_at,status` +
      `&status=eq.active` +
      `&order=display_order.asc,created_at.asc`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: supabaseHeaders()
    });

    const rawText = await response.text();

    let rows;

    try {
      rows = rawText ? JSON.parse(rawText) : [];
    } catch {
      rows = [];
    }

    if (!response.ok) {
      console.error(
        "PETS & DOGUE cover-stars Supabase error:",
        response.status,
        rawText
      );

      return sendJson(res, 502, {
        ok: false,
        error: "Unable to load Cover Star candidates."
      });
    }

    if (!Array.isArray(rows)) {
      rows = [];
    }

    const candidates = rows
      .filter((candidate) => {
        if (!candidate || candidate.status !== "active") {
          return false;
        }

        if (
          candidate.voting_starts_at &&
          new Date(candidate.voting_starts_at).getTime() >
            new Date(now).getTime()
        ) {
          return false;
        }

        if (
          candidate.voting_ends_at &&
          new Date(candidate.voting_ends_at).getTime() <
            new Date(now).getTime()
        ) {
          return false;
        }

        return true;
      })
      .map((candidate) => ({
        id: String(candidate.id),
        name: String(candidate.name || ""),
        species: String(candidate.species || ""),
        breed: String(candidate.breed || ""),
        image: String(candidate.image_url || ""),
        preview: String(candidate.preview || ""),
        story: String(candidate.story || ""),
        votes: Number(candidate.votes_count || 0),
        votingStartsAt: candidate.voting_starts_at || null,
        votingEndsAt: candidate.voting_ends_at || null
      }));

    return sendJson(res, 200, {
      ok: true,
      candidates
    });
  } catch (error) {
    console.error("PETS & DOGUE cover-stars API error:", error);

    return sendJson(res, 500, {
      ok: false,
      error: "Unable to load Cover Star candidates."
    });
  }
};
