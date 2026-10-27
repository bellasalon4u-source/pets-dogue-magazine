// Supabase Edge Function: community-events
// Public event reads; event submissions are stored as pending for moderation.

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.petsanddogue.com",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Vary": "Origin",
};

const allowedOrigins = new Set([
  "https://www.petsanddogue.com",
  "https://petsanddogue.com",
]);

const allowedAnimals = new Set(["dog", "cat", "other"]);

function json(body: unknown, status = 200, origin = "") {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Access-Control-Allow-Origin": allowedOrigins.has(origin)
        ? origin
        : "https://www.petsanddogue.com",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function decodeImage(value: unknown): Uint8Array | null {
  if (typeof value !== "string" || value.length > 1_400_000) return null;

  const encoded = value.replace(/^data:image\/jpeg;base64,/, "");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) return null;

  try {
    const binary = atob(encoded);
    if (binary.length < 100 || binary.length > 1_000_000) return null;

    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

    // Проверяем, что это JPEG.
    if (
      bytes[0] !== 0xff ||
      bytes[1] !== 0xd8 ||
      bytes[bytes.length - 2] !== 0xff ||
      bytes[bytes.length - 1] !== 0xd9
    ) return null;

    return bytes;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";

  if (origin && !allowedOrigins.has(origin)) {
    return json({ error: "forbidden" }, 403, origin);
  }

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const base = (Deno.env.get("SUPABASE_URL") || "").replace(/\/$/, "");
  const key =
    Deno.env.get("SUPABASE_SECRET_KEY") ||
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!base || !key) {
    return json({ error: "unavailable" }, 503, origin);
  }

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  const rest = (path: string, init: RequestInit = {}) =>
    fetch(`${base}/rest/v1/${path}`, {
      ...init,
      headers: { ...headers, ...init.headers },
      signal: AbortSignal.timeout(15_000),
    });

  if (req.method === "GET") {
    try {
      const query = new URLSearchParams({
        select:
          "id,title,description,location,event_start,latitude,longitude,animal_types,media_type,media_path",
        category: "eq.event",
        status: "eq.published",
        event_start: `gte.${new Date().toISOString()}`,
        order: "event_start.asc",
        limit: "100",
      });

      const response = await rest(`community_posts?${query}`);

      if (!response.ok) {
        return json({ error: "unavailable" }, 503, origin);
      }

      return json({ events: await response.json() }, 200, origin);
    } catch {
      return json({ error: "unavailable" }, 503, origin);
    }
  }

  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405, origin);
  }

  if (!(req.headers.get("content-type") || "").includes("application/json")) {
    return json({ error: "invalid_format" }, 415, origin);
  }

  let body: Record<string, unknown>;

  try {
    const raw = await req.text();

    if (raw.length > 1_500_000) {
      return json({ error: "too_large" }, 413, origin);
    }

    body = JSON.parse(raw);

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error();
    }
  } catch {
    return json({ error: "invalid_request" }, 400, origin);
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const location =
    typeof body.location === "string" ? body.location.trim() : "";
  const date =
    typeof body.event_start === "string"
      ? new Date(body.event_start)
      : null;

  const animals = Array.isArray(body.animal_types)
    ? [...new Set(
      body.animal_types.filter(
        (item): item is string =>
          typeof item === "string" && allowedAnimals.has(item),
      ),
    )]
    : [];

  if (
    title.length < 1 ||
    title.length > 120 ||
    description.length < 1 ||
    description.length > 2500 ||
    location.length < 1 ||
    location.length > 180 ||
    !date ||
    !Number.isFinite(date.getTime()) ||
    date.getTime() <= Date.now() ||
    !animals.length
  ) {
    return json({ error: "invalid_event" }, 400, origin);
  }

  const image = body.image ? decodeImage(body.image) : null;

  if (body.image && !image) {
    return json({ error: "invalid_image" }, 400, origin);
  }

  // Использует имеющийся ограничитель частоты загрузок, если он настроен.
  const ip = (req.headers.get("x-forwarded-for") || "")
    .split(",")[0]
    .trim();

  if (ip) {
    try {
      const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(`community-events:${ip}`),
      );

      const actor = Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      const limited = await rest("rpc/pd_reserve_photo_upload", {
        method: "POST",
        body: JSON.stringify({ p_actor: actor }),
      });

      if (limited.ok && await limited.json() !== true) {
        return json({ error: "daily_limit" }, 429, origin);
      }
    } catch {
      // Если ограничитель временно недоступен, продолжаем проверку события.
    }
  }

  let mediaPath: string | null = null;

  if (image) {
    mediaPath = `events/${crypto.randomUUID()}.jpg`;

    try {
      const upload = await fetch(
        `${base}/storage/v1/object/pd-photos-review/${mediaPath}`,
        {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "image/jpeg",
            "x-upsert": "false",
          },
          body: image,
          signal: AbortSignal.timeout(20_000),
        },
      );

      if (!upload.ok) {
        return json({ error: "upload_failed" }, 503, origin);
      }
    } catch {
      return json({ error: "upload_failed" }, 503, origin);
    }
  }

  try {
    const row = {
      category: "event",
      title,
      description,
      location,
      event_start: date.toISOString(),
      latitude: typeof body.latitude === "number" ? body.latitude : null,
      longitude: typeof body.longitude === "number" ? body.longitude : null,
      animal_types: animals,
      media_type: image ? "photo" : "none",
      media_path: mediaPath,
      status: "pending",
    };

    const response = await rest("community_posts", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(row),
    });

    if (!response.ok) {
      if (mediaPath) {
        await fetch(`${base}/storage/v1/object/pd-photos-review`, {
          method: "DELETE",
          headers,
          body: JSON.stringify({ prefixes: [mediaPath] }),
        }).catch(() => undefined);
      }

      return json({ error: "submission_failed" }, 503, origin);
    }

    const rows = await response.json();

    return json(
      { status: "pending", id: rows?.[0]?.id ?? null },
      201,
      origin,
    );
  } catch {
    return json({ error: "submission_failed" }, 503, origin);
  }
});
