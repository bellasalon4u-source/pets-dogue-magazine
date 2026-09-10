"use strict";

/* =========================================================
PETS & DOGUE
LOCAL COMMUNITY — FREE DISCOVERY

FREE PUBLIC SOURCES ONLY:
- Google News RSS
- GDELT
- Reddit public RSS
- OpenStreetMap / Overpass
- OpenStreetMap / Nominatim

NO:
- SerpApi
- Serper
- Brave
- Bing
- NewsAPI
- DeepL
- paid search API

CATEGORIES:
- lost
- seen
- found
- event
- group
- help
- volunteers
- foster
- adoption
- news
========================================================= */


/* =========================================================
CONFIG
========================================================= */

const DEFAULT_LIMIT = 40;
const MAX_LIMIT = 60;

const DEFAULT_RADIUS_KM = 15;
const MAX_RADIUS_KM = 100;

const REQUEST_TIMEOUT = 6500;
const OVERPASS_TIMEOUT = 9000;

const CACHE_SECONDS = 600;

const CATEGORIES = [
  "lost",
  "seen",
  "found",
  "event",
  "group",
  "help",
  "volunteers",
  "foster",
  "adoption",
  "news"
];

const SUPPORTED_LANGUAGES = new Set([
  "en",
  "uk",
  "ru",
  "fr",
  "de",
  "es",
  "it",
  "pt",
  "nl",
  "pl",
  "cs",
  "sk",
  "hu",
  "ro",
  "bg",
  "el",
  "sv",
  "da",
  "no",
  "fi",
  "tr",
  "ar",
  "hi"
]);

const LANGUAGE_ALIASES = {
  ua: "uk",
  cz: "cs",
  gr: "el",
  se: "sv",
  dk: "da"
};


/* =========================================================
SEARCH WORDS
========================================================= */

const SEARCH_TERMS = {

  lost: [
    "lost dog",
    "lost cat",
    "missing pet",
    "missing dog",
    "missing cat"
  ],

  seen: [
    "lost dog sighting",
    "lost cat sighting",
    "missing pet sighting",
    "dog seen roaming",
    "cat seen roaming"
  ],

  found: [
    "lost dog found",
    "lost cat found",
    "missing pet found",
    "pet reunited",
    "owner found"
  ],

  event: [
    "pet event",
    "dog event",
    "dog meetup",
    "cat meetup",
    "breed meetup",
    "group dog walk",
    "dog walking event",
    "dog show",
    "cat show",
    "pet show",
    "pet exhibition",
    "pet festival",
    "animal festival",
    "adoption event",
    "shelter event",
    "dog agility event"
  ],

  group: [
    "dog club",
    "cat club",
    "pet club",
    "breed club",
    "kennel club",
    "dog owners group",
    "cat owners group",
    "pet owners group",
    "dog lovers group",
    "cat lovers group",
    "dog walking group",
    "pet community group",
    "neighbourhood pet group",
    "neighborhood pet group",
    "animal association",
    "dog society",
    "cat society"
  ],

  help: [
    "animal rescue help",
    "pet rescue appeal",
    "animal shelter needs help",
    "animal fundraiser",
    "pet fundraiser"
  ],

  volunteers: [
    "animal shelter volunteers",
    "animal rescue volunteers",
    "dog rescue volunteers",
    "cat rescue volunteers"
  ],

  foster: [
    "dog foster needed",
    "cat foster needed",
    "animal foster needed",
    "temporary foster pet"
  ],

  adoption: [
    "dog adoption",
    "cat adoption",
    "pet adoption",
    "animal needs home",
    "pet looking for family"
  ],

  news: [
    "local animal news",
    "local pet news",
    "animal welfare news",
    "dog news",
    "cat news"
  ]

};


/* =========================================================
LOCAL LANGUAGE HINTS
========================================================= */

const LOCAL_HINTS = {

  en: {
    event: "pet event dog meetup",
    group: "dog club cat club pet group",
    lost: "lost pet",
    seen: "lost pet sighting",
    found: "pet found",
    help: "animal rescue help",
    volunteers: "animal volunteers",
    foster: "pet foster",
    adoption: "pet adoption",
    news: "local animal news"
  },

  uk: {
    event: "події для тварин зустріч собак",
    group: "клуб собак клуб котів група власників тварин",
    lost: "загублена тварина",
    seen: "помітили загублену тварину",
    found: "тварину знайдено",
    help: "допомога тваринам",
    volunteers: "волонтери для тварин",
    foster: "перетримка тварин",
    adoption: "тварина шукає родину",
    news: "місцеві новини про тварин"
  },

  ru: {
    event: "мероприятия для животных встреча собак",
    group: "клуб собак клуб кошек группа владельцев животных",
    lost: "пропало животное",
    seen: "видели пропавшее животное",
    found: "животное найдено",
    help: "помощь животным",
    volunteers: "волонтеры для животных",
    foster: "передержка животных",
    adoption: "животное ищет семью",
    news: "местные новости животных"
  },

  fr: {
    event: "événement animaux rencontre chiens",
    group: "club chiens club chats groupe animaux"
  },

  de: {
    event: "Tierveranstaltung Hundetreffen",
    group: "Hundeverein Katzenverein Tiergruppe"
  },

  es: {
    event: "evento mascotas encuentro perros",
    group: "club perros club gatos grupo mascotas"
  },

  it: {
    event: "evento animali raduno cani",
    group: "club cani club gatti gruppo animali"
  },

  pt: {
    event: "evento animais encontro cães",
    group: "clube cães clube gatos grupo animais"
  },

  nl: {
    event: "dierenevenement honden meetup",
    group: "hondenclub kattenclub dierengroep"
  },

  pl: {
    event: "wydarzenie dla zwierząt spotkanie psów",
    group: "klub psów klub kotów grupa zwierząt"
  },

  cs: {
    event: "zvířecí akce setkání psů",
    group: "klub psů klub koček skupina zvířat"
  },

  sk: {
    event: "zvieracie podujatie stretnutie psov",
    group: "klub psov klub mačiek skupina zvierat"
  },

  hu: {
    event: "állatos esemény kutyás találkozó",
    group: "kutyaklub macskaklub állatos csoport"
  },

  ro: {
    event: "eveniment animale întâlnire câini",
    group: "club câini club pisici grup animale"
  },

  bg: {
    event: "събитие за животни среща кучета",
    group: "клуб кучета клуб котки група животни"
  },

  el: {
    event: "εκδήλωση ζώων συνάντηση σκύλων",
    group: "λέσχη σκύλων λέσχη γατών ομάδα ζώων"
  },

  sv: {
    event: "djurevent hundträff",
    group: "hundklubb kattklubb djurgrupp"
  },

  da: {
    event: "dyrearrangement hundetræf",
    group: "hundeklub katteklub dyregruppe"
  },

  no: {
    event: "dyrearrangement hundetreff",
    group: "hundeklubb katteklubb dyregruppe"
  },

  fi: {
    event: "eläintapahtuma koiratapaaminen",
    group: "koirakerho kissakerho eläinryhmä"
  },

  tr: {
    event: "evcil hayvan etkinliği köpek buluşması",
    group: "köpek kulübü kedi kulübü hayvan grubu"
  },

  ar: {
    event: "فعالية حيوانات لقاء كلاب",
    group: "نادي كلاب نادي قطط مجموعة حيوانات"
  },

  hi: {
    event: "पालतू कार्यक्रम डॉग मीटअप",
    group: "डॉग क्लब कैट क्लब पालतू समूह"
  }

};


/* =========================================================
CLASSIFICATION
========================================================= */

const KEYWORDS = {

  found: [
    "found",
    "reunited",
    "returned home",
    "back home",
    "owner found",
    "safe home",
    "найден",
    "нашёлся",
    "нашлась",
    "знайден",
    "retrouvé",
    "gefunden",
    "encontrado",
    "ritrovato",
    "gevonden",
    "odnalezion",
    "nalezen",
    "nájden",
    "hittad",
    "fundet",
    "funnet",
    "löytynyt",
    "bulundu"
  ],

  lost: [
    "lost dog",
    "lost cat",
    "missing dog",
    "missing cat",
    "missing pet",
    "lost pet",
    "пропала собака",
    "пропал кот",
    "пропала кошка",
    "потерялся",
    "потерялась",
    "загубився",
    "загубилася",
    "chien perdu",
    "chat perdu",
    "hund vermisst",
    "katze vermisst",
    "perro perdido",
    "gato perdido",
    "cane smarrito",
    "gatto smarrito"
  ],

  seen: [
    "sighting",
    "sighted",
    "spotted",
    "seen roaming",
    "stray seen",
    "видели",
    "заметили",
    "бачили",
    "gesichtet",
    "aperçu",
    "avistado",
    "avvistato",
    "widziano",
    "nähty",
    "görüldü"
  ],

  event: [
    "event",
    "events",
    "meetup",
    "meet up",
    "meet-up",
    "festival",
    "dog show",
    "cat show",
    "pet show",
    "animal show",
    "exhibition",
    "expo",
    "pet fair",
    "dog fair",
    "adoption day",
    "adoption event",
    "open day",
    "charity event",
    "fundraising event",
    "agility",
    "competition",
    "мероприятие",
    "событие",
    "встреча",
    "выставка",
    "фестиваль",
    "подія",
    "зустріч",
    "виставка"
  ],

  group: [
    "dog club",
    "cat club",
    "pet club",
    "breed club",
    "kennel club",
    "dog society",
    "cat society",
    "animal association",
    "dog owners group",
    "cat owners group",
    "pet owners group",
    "dog lovers group",
    "cat lovers group",
    "walking group",
    "dog walking group",
    "pet community group",
    "neighbourhood pet group",
    "neighborhood pet group",
    "клуб собак",
    "клуб кошек",
    "группа любителей собак",
    "группа любителей кошек",
    "группа владельцев собак",
    "группа владельцев кошек",
    "кинологический клуб",
    "кінологічний клуб",
    "група власників собак",
    "група власників котів",
    "hundeverein",
    "katzenverein",
    "club perros",
    "club cani",
    "hondenclub",
    "kattenclub",
    "klub psów",
    "klub koček",
    "klub psov",
    "hundklubb",
    "hundeklub",
    "koirakerho",
    "köpek kulübü"
  ],

  volunteers: [
    "volunteer",
    "volunteers",
    "volunteering",
    "волонтер",
    "волонтёр",
    "добровол",
    "bénévole",
    "freiwillige",
    "voluntario",
    "volontari",
    "wolontariusz",
    "dobrovolník",
    "frivillig",
    "vapaaehtois",
    "gönüllü"
  ],

  foster: [
    "foster",
    "foster home",
    "temporary foster",
    "temporary home",
    "передерж",
    "перетрим",
    "famille d'accueil",
    "pflegestelle",
    "acogida",
    "stallo",
    "acolhimento",
    "opvanggezin",
    "dom tymczasowy",
    "dočasná péče",
    "jourhem",
    "plejehjem",
    "fosterhjem",
    "sijaiskoti"
  ],

  adoption: [
    "adopt",
    "adoption",
    "adoptable",
    "needs a home",
    "looking for home",
    "looking for family",
    "forever home",
    "ищет дом",
    "ищет семью",
    "шукає дім",
    "шукає родину",
    "adopter",
    "zuhause gesucht",
    "adopción",
    "adozione",
    "adoção",
    "adoptie",
    "adopcji",
    "k adopci",
    "adopsjon"
  ],

  help: [
    "help needed",
    "needs help",
    "urgent help",
    "appeal",
    "fundraiser",
    "donation",
    "rescue appeal",
    "нужна помощь",
    "нужна допомога",
    "потрібна допомога",
    "besoin d'aide",
    "braucht hilfe",
    "necesita ayuda",
    "serve aiuto",
    "hulp nodig",
    "potrzebuje pomocy",
    "trenger hjelp",
    "tarvitsee apua"
  ]

};


/* =========================================================
UTILITIES
========================================================= */

function normalizeLanguage(value) {

  let language = String(value || "en")
    .trim()
    .toLowerCase()
    .split(/[-_]/)[0];

  language =
    LANGUAGE_ALIASES[language] ||
    language;

  return SUPPORTED_LANGUAGES.has(language)
    ? language
    : "en";
}


function cleanText(value) {

  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}


function safeUrl(value) {

  try {

    const url = new URL(
      String(value || "")
    );

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return "";
    }

    return url.toString();

  } catch {
    return "";
  }
}


function hostname(value) {

  try {

    return new URL(value)
      .hostname
      .toLowerCase()
      .replace(/^www\./, "");

  } catch {
    return "";
  }
}


function stripTracking(value) {

  try {

    const url = new URL(value);

    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "mc_cid",
      "mc_eid"
    ].forEach(
      key => url.searchParams.delete(key)
    );

    return url.toString();

  } catch {
    return value;
  }
}


function unique(values) {

  return [
    ...new Set(
      values.filter(Boolean)
    )
  ];
}


function clamp(value, min, max) {

  return Math.min(
    Math.max(
      Number(value) || 0,
      min
    ),
    max
  );
}


function numberOrNull(value) {

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}


function normalizeDate(value) {

  if (!value) {
    return null;
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return date.toISOString();
}


function ageDays(value) {

  if (!value) {
    return 999;
  }

  const time =
    new Date(value).getTime();

  if (
    Number.isNaN(time)
  ) {
    return 999;
  }

  return (
    Date.now() -
    time
  ) / 86400000;
}


function daysUntil(value) {

  if (!value) {
    return null;
  }

  const time =
    new Date(value).getTime();

  if (
    Number.isNaN(time)
  ) {
    return null;
  }

  return (
    time -
    Date.now()
  ) / 86400000;
}


function includesAny(
  text,
  keywords
) {

  const normalized =
    String(text || "")
      .toLowerCase();

  return keywords.some(
    keyword =>
      normalized.includes(
        String(keyword)
          .toLowerCase()
      )
  );
}


function createId(value) {

  let hash =
    2166136261;

  for (
    const character of
    String(value || "")
  ) {

    hash ^=
      character.charCodeAt(0);

    hash =
      Math.imul(
        hash,
        16777619
      );
  }

  return (
    "community-" +
    (hash >>> 0)
      .toString(36)
  );
}


/* =========================================================
XML
========================================================= */

function xmlTag(
  block,
  tag
) {

  const regex =
    new RegExp(
      `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,
      "i"
    );

  const match =
    String(block || "")
      .match(regex);

  if (!match) {
    return "";
  }

  return cleanText(
    match[1]
      .replace(
        /<!\[CDATA\[([\s\S]*?)\]\]>/g,
        "$1"
      )
  );
}


function xmlAttribute(
  block,
  tag,
  attribute
) {

  const regex =
    new RegExp(
      `<${tag}[^>]*${attribute}=["']([^"']+)["'][^>]*>`,
      "i"
    );

  const match =
    String(block || "")
      .match(regex);

  return match
    ? cleanText(match[1])
    : "";
}


/* =========================================================
FETCH
========================================================= */

async function fetchWithTimeout(
  url,
  options = {},
  timeout = REQUEST_TIMEOUT
) {

  const controller =
    new AbortController();

  const timer =
    setTimeout(
      () => controller.abort(),
      timeout
    );

  try {

    return await fetch(
      url,
      {
        ...options,
        signal: controller.signal
      }
    );

  } finally {

    clearTimeout(timer);
  }
}


/* =========================================================
REQUEST
========================================================= */

function readQuery(req) {

  const query =
    req.query || {};

  const category =
    String(
      query.category ||
      ""
    )
      .trim()
      .toLowerCase();

  return {

    language:
      normalizeLanguage(
        query.lang
      ),

    location:
      cleanText(
        query.location ||
        ""
      ).slice(0, 180),

    latitude:
      Number(
        query.lat
      ),

    longitude:
      Number(
        query.lng
      ),

    radius:
      clamp(
        query.radius ||
        DEFAULT_RADIUS_KM,
        1,
        MAX_RADIUS_KM
      ),

    limit:
      Math.round(
        clamp(
          query.limit ||
          DEFAULT_LIMIT,
          1,
          MAX_LIMIT
        )
      ),

    category:
      CATEGORIES.includes(
        category
      )
        ? category
        : ""
  };
}


function validateRequest(params) {

  if (
    !params.location &&
    (
      !Number.isFinite(
        params.latitude
      ) ||
      !Number.isFinite(
        params.longitude
      )
    )
  ) {
    return "location or coordinates are required";
  }

  if (
    Number.isFinite(
      params.latitude
    ) &&
    (
      params.latitude < -90 ||
      params.latitude > 90
    )
  ) {
    return "invalid latitude";
  }

  if (
    Number.isFinite(
      params.longitude
    ) &&
    (
      params.longitude < -180 ||
      params.longitude > 180
    )
  ) {
    return "invalid longitude";
  }

  return null;
}


/* =========================================================
NOMINATIM
========================================================= */

async function reverseLocation(
  latitude,
  longitude,
  language
) {

  try {

    const url =
      "https://nominatim.openstreetmap.org/reverse" +
      "?format=jsonv2" +
      "&zoom=12" +
      "&addressdetails=1" +
      "&lat=" +
      encodeURIComponent(latitude) +
      "&lon=" +
      encodeURIComponent(longitude);

    const response =
      await fetchWithTimeout(
        url,
        {
          headers: {
            "Accept-Language":
              language,

            "User-Agent":
              "PETS-DOGUE-Community/4.0"
          }
        },
        5000
      );

    if (!response.ok) {
      return null;
    }

    return normalizeLocation(
      await response.json()
    );

  } catch {
    return null;
  }
}


async function forwardLocation(
  location,
  language
) {

  try {

    const url =
      "https://nominatim.openstreetmap.org/search" +
      "?format=jsonv2" +
      "&limit=1" +
      "&addressdetails=1" +
      "&q=" +
      encodeURIComponent(location);

    const response =
      await fetchWithTimeout(
        url,
        {
          headers: {
            "Accept-Language":
              language,

            "User-Agent":
              "PETS-DOGUE-Community/4.0"
          }
        },
        5000
      );

    if (!response.ok) {
      return null;
    }

    const results =
      await response.json();

    if (
      !Array.isArray(results) ||
      !results.length
    ) {
      return null;
    }

    return normalizeLocation(
      results[0]
    );

  } catch {
    return null;
  }
}


function normalizeLocation(data) {

  const address =
    data?.address || {};

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.hamlet ||
    "";

  const district =
    address.city_district ||
    address.suburb ||
    address.borough ||
    "";

  const county =
    address.county ||
    address.state_district ||
    "";

  const state =
    address.state ||
    address.region ||
    "";

  const country =
    address.country ||
    "";

  return {

    name:
      unique([
        city,
        county,
        state,
        country
      ])
        .slice(0, 3)
        .join(", ") ||
      cleanText(
        data.display_name
      ),

    displayName:
      cleanText(
        data.display_name
      ),

    city,

    district,

    county,

    state,

    country,

    countryCode:
      String(
        address.country_code ||
        ""
      ).toLowerCase(),

    latitude:
      numberOrNull(
        data.lat
      ),

    longitude:
      numberOrNull(
        data.lon
      )
  };
}


/* =========================================================
LOCATION
========================================================= */

function mainLocationName(
  requested,
  resolved
) {

  return cleanText(
    resolved?.city ||
    resolved?.district ||
    String(
      requested ||
      ""
    ).split(",")[0] ||
    resolved?.county ||
    requested ||
    ""
  );
}


function locationQueryText(
  requested,
  resolved
) {

  return unique([
    mainLocationName(
      requested,
      resolved
    ),
    resolved?.district,
    resolved?.county,
    resolved?.state
  ])
    .filter(Boolean)
    .slice(0, 3)
    .join(" ");
}


function strongLocationTokens(
  requested,
  resolved
) {

  const values = unique([
    String(
      requested ||
      ""
    ).split(",")[0],

    resolved?.city,

    resolved?.district,

    resolved?.county
  ]);

  return unique(
    values
      .flatMap(
        value =>
          String(value)
            .toLowerCase()
            .normalize("NFKD")
            .replace(
              /[^\p{L}\p{N}\s-]+/gu,
              " "
            )
            .split(/[\s-]+/)
      )
      .filter(
        token =>
          token.length >= 3
      )
  );
}


function localityEvidence(
  item,
  requested,
  resolved
) {

  const tokens =
    strongLocationTokens(
      requested,
      resolved
    );

  if (!tokens.length) {

    return {
      matches: 0,
      score: 0
    };
  }

  const text = [
    item.title,
    item.description,
    item.venue,
    item.address,
    item.location,
    item.url
  ]
    .join(" ")
    .toLowerCase();

  let matches = 0;

  for (
    const token of
    tokens
  ) {

    if (
      text.includes(token)
    ) {
      matches++;
    }
  }

  return {
    matches,
    score:
      matches /
      tokens.length
  };
}


/* =========================================================
DISTANCE
========================================================= */

function haversineKm(
  lat1,
  lng1,
  lat2,
  lng2
) {

  if (
    ![
      lat1,
      lng1,
      lat2,
      lng2
    ].every(
      Number.isFinite
    )
  ) {
    return null;
  }

  const toRadians =
    degrees =>
      degrees *
      Math.PI /
      180;

  const dLat =
    toRadians(
      lat2 - lat1
    );

  const dLng =
    toRadians(
      lng2 - lng1
    );

  const first =
    toRadians(lat1);

  const second =
    toRadians(lat2);

  const a =
    Math.sin(
      dLat / 2
    ) ** 2 +
    Math.cos(first) *
    Math.cos(second) *
    Math.sin(
      dLng / 2
    ) ** 2;

  return (
    6371 *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );
}


/* =========================================================
DATES
========================================================= */

function parseDateFromText(text) {

  const value =
    String(text || "");

  const iso =
    value.match(
      /\b(20\d{2})-(\d{2})-(\d{2})(?:[T\s](\d{1,2}):(\d{2}))?/
    );

  if (iso) {

    const date =
      new Date(
        Number(iso[1]),
        Number(iso[2]) - 1,
        Number(iso[3]),
        Number(
          iso[4] ||
          12
        ),
        Number(
          iso[5] ||
          0
        )
      );

    if (
      !Number.isNaN(
        date.getTime()
      )
    ) {
      return date.toISOString();
    }
  }

  const numeric =
    value.match(
      /\b(\d{1,2})[\/.](\d{1,2})[\/.](20\d{2})\b/
    );

  if (numeric) {

    const date =
      new Date(
        Number(numeric[3]),
        Number(numeric[2]) - 1,
        Number(numeric[1]),
        12,
        0
      );

    if (
      !Number.isNaN(
        date.getTime()
      )
    ) {
      return date.toISOString();
    }
  }

  const monthNames = {
    january: 0,
    jan: 0,
    february: 1,
    feb: 1,
    march: 2,
    mar: 2,
    april: 3,
    apr: 3,
    may: 4,
    june: 5,
    jun: 5,
    july: 6,
    jul: 6,
    august: 7,
    aug: 7,
    september: 8,
    sept: 8,
    sep: 8,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    december: 11,
    dec: 11
  };

  const named =
    value.match(
      /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2})(?:,?\s+(20\d{2}))?/i
    );

  if (named) {

    const month =
      monthNames[
        named[1]
          .toLowerCase()
      ];

    if (
      Number.isInteger(month)
    ) {

      const current =
        new Date();

      let year =
        Number(
          named[3] ||
          current.getFullYear()
        );

      let date =
        new Date(
          year,
          month,
          Number(named[2]),
          12,
          0
        );

      if (
        !named[3] &&
        date.getTime() <
        Date.now() -
        21 * 86400000
      ) {

        date =
          new Date(
            year + 1,
            month,
            Number(named[2]),
            12,
            0
          );
      }

      if (
        !Number.isNaN(
          date.getTime()
        )
      ) {
        return date.toISOString();
      }
    }
  }

  return null;
}


/* =========================================================
QUERY BUILDING
========================================================= */

function quoteTerm(value) {

  return (
    '"' +
    String(value || "")
      .replace(/"/g, "") +
    '"'
  );
}


function searchTermsFor(
  category,
  language
) {

  const local =
    LOCAL_HINTS[
      language
    ]?.[
      category
    ];

  return unique([
    local,
    ...(
      SEARCH_TERMS[
        category
      ] ||
      []
    )
  ])
    .filter(Boolean)
    .slice(0, 7);
}


function buildQuery(
  category,
  location,
  resolved,
  language
) {

  const terms =
    searchTermsFor(
      category,
      language
    );

  const local =
    locationQueryText(
      location,
      resolved
    );

  return (
    "(" +
    terms
      .map(quoteTerm)
      .join(" OR ") +
    ") " +
    quoteTerm(local)
  );
}


/* =========================================================
GOOGLE NEWS
========================================================= */

function googleNewsLocale(
  language
) {

  const locales = {

    en: {
      hl: "en-GB",
      gl: "GB",
      ceid: "GB:en"
    },

    uk: {
      hl: "uk",
      gl: "UA",
      ceid: "UA:uk"
    },

    ru: {
      hl: "ru",
      gl: "GB",
      ceid: "GB:ru"
    },

    fr: {
      hl: "fr",
      gl: "FR",
      ceid: "FR:fr"
    },

    de: {
      hl: "de",
      gl: "DE",
      ceid: "DE:de"
    },

    es: {
      hl: "es",
      gl: "ES",
      ceid: "ES:es"
    },

    it: {
      hl: "it",
      gl: "IT",
      ceid: "IT:it"
    },

    pt: {
      hl: "pt-PT",
      gl: "PT",
      ceid: "PT:pt-150"
    },

    nl: {
      hl: "nl",
      gl: "NL",
      ceid: "NL:nl"
    },

    pl: {
      hl: "pl",
      gl: "PL",
      ceid: "PL:pl"
    },

    cs: {
      hl: "cs",
      gl: "CZ",
      ceid: "CZ:cs"
    },

    sk: {
      hl: "sk",
      gl: "SK",
      ceid: "SK:sk"
    },

    hu: {
      hl: "hu",
      gl: "HU",
      ceid: "HU:hu"
    },

    ro: {
      hl: "ro",
      gl: "RO",
      ceid: "RO:ro"
    },

    bg: {
      hl: "bg",
      gl: "BG",
      ceid: "BG:bg"
    },

    el: {
      hl: "el",
      gl: "GR",
      ceid: "GR:el"
    },

    sv: {
      hl: "sv",
      gl: "SE",
      ceid: "SE:sv"
    },

    da: {
      hl: "da",
      gl: "DK",
      ceid: "DK:da"
    },

    no: {
      hl: "no",
      gl: "NO",
      ceid: "NO:no"
    },

    fi: {
      hl: "fi",
      gl: "FI",
      ceid: "FI:fi"
    },

    tr: {
      hl: "tr",
      gl: "TR",
      ceid: "TR:tr"
    },

    ar: {
      hl: "ar",
      gl: "AE",
      ceid: "AE:ar"
    },

    hi: {
      hl: "hi",
      gl: "IN",
      ceid: "IN:hi"
    }
  };

  return (
    locales[language] ||
    locales.en
  );
}


async function googleNewsSearch(
  query,
  category,
  language
) {

  try {

    const locale =
      googleNewsLocale(
        language
      );

    const url =
      "https://news.google.com/rss/search" +
      "?q=" +
      encodeURIComponent(query) +
      "&hl=" +
      encodeURIComponent(
        locale.hl
      ) +
      "&gl=" +
      encodeURIComponent(
        locale.gl
      ) +
      "&ceid=" +
      encodeURIComponent(
        locale.ceid
      );

    const response =
      await fetchWithTimeout(
        url,
        {
          headers: {
            "User-Agent":
              "PETS-DOGUE-Community/4.0"
          }
        },
        5500
      );

    if (!response.ok) {
      return [];
    }

    const xml =
      await response.text();

    const blocks =
      xml.match(
        /<item>[\s\S]*?<\/item>/gi
      ) || [];

    return blocks
      .slice(0, 15)
      .map(
        block => {

          const title =
            xmlTag(
              block,
              "title"
            );

          const description =
            xmlTag(
              block,
              "description"
            );

          const link =
            xmlTag(
              block,
              "link"
            );

          const pubDate =
            xmlTag(
              block,
              "pubDate"
            );

          const source =
            xmlTag(
              block,
              "source"
            );

          return {

            provider:
              "google-news",

            category,

            title,

            description,

            url:
              safeUrl(link),

            image: "",

            publishedAt:
              normalizeDate(
                pubDate
              ),

            eventStart:
              category === "event"
                ? parseDateFromText(
                    title +
                    " " +
                    description
                  )
                : null,

            source:
              source ||
              hostname(link),

            language,

            location: "",

            venue: "",

            address: "",

            latitude: null,

            longitude: null
          };
        }
      )
      .filter(
        item =>
          item.title &&
          item.url
      );

  } catch {
    return [];
  }
}


/* =========================================================
GDELT
========================================================= */

function parseGdeltDate(value) {

  const text =
    String(value || "");

  const match =
    text.match(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/
    );

  if (!match) {
    return normalizeDate(value);
  }

  return new Date(
    Date.UTC(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
      Number(match[4]),
      Number(match[5]),
      Number(match[6])
    )
  ).toISOString();
}


async function gdeltSearch(
  query,
  category,
  language
) {

  try {

    const url =
      "https://api.gdeltproject.org/api/v2/doc/doc" +
      "?query=" +
      encodeURIComponent(query) +
      "&mode=ArtList" +
      "&maxrecords=18" +
      "&format=json" +
      "&sort=HybridRel";

    const response =
      await fetchWithTimeout(
        url,
        {
          headers: {
            "User-Agent":
              "PETS-DOGUE-Community/4.0"
          }
        },
        5500
      );

    if (!response.ok) {
      return [];
    }

    const data =
      await response.json();

    const articles =
      Array.isArray(
        data.articles
      )
        ? data.articles
        : [];

    return articles.map(
      article => {

        const title =
          cleanText(
            article.title
          );

        const description =
          cleanText(
            article.description
          );

        return {

          provider:
            "gdelt",

          category,

          title,

          description,

          url:
            safeUrl(
              article.url
            ),

          image:
            safeUrl(
              article.socialimage
            ),

          publishedAt:
            parseGdeltDate(
              article.seendate
            ),

          eventStart:
            category === "event"
              ? parseDateFromText(
                  title +
                  " " +
                  description
                )
              : null,

          source:
            cleanText(
              article.domain ||
              hostname(
                article.url
              )
            ),

          language:
            normalizeLanguage(
              article.language ||
              language
            ),

          location: "",

          venue: "",

          address: "",

          latitude: null,

          longitude: null
        };
      }
    );

  } catch {
    return [];
  }
}


/* =========================================================
REDDIT RSS
========================================================= */

async function redditSearch(
  query,
  category,
  language
) {

  try {

    const url =
      "https://www.reddit.com/search.rss" +
      "?q=" +
      encodeURIComponent(query) +
      "&sort=new" +
      "&t=year";

    const response =
      await fetchWithTimeout(
        url,
        {
          headers: {
            "User-Agent":
              "PETS-DOGUE-Community/4.0"
          }
        },
        5500
      );

    if (!response.ok) {
      return [];
    }

    const xml =
      await response.text();

    const blocks =
      xml.match(
        /<entry>[\s\S]*?<\/entry>/gi
      ) || [];

    return blocks
      .slice(0, 12)
      .map(
        block => {

          const title =
            xmlTag(
              block,
              "title"
            );

          const content =
            xmlTag(
              block,
              "content"
            );

          const updated =
            xmlTag(
              block,
              "updated"
            );

          const link =
            xmlAttribute(
              block,
              "link",
              "href"
            );

          const authorBlock =
            block.match(
              /<author>[\s\S]*?<\/author>/i
            )?.[0] || "";

          const author =
            xmlTag(
              authorBlock,
              "name"
            );

          return {

            provider:
              "reddit",

            category,

            title,

            description:
              content,

            url:
              safeUrl(link),

            image: "",

            publishedAt:
              normalizeDate(
                updated
              ),

            eventStart:
              category === "event"
                ? parseDateFromText(
                    title +
                    " " +
                    content
                  )
                : null,

            source:
              author
                ? "Reddit · " +
                  author
                : "Reddit",

            language,

            location: "",

            venue: "",

            address: "",

            latitude: null,

            longitude: null
          };
        }
      )
      .filter(
        item =>
          item.title &&
          item.url
      );

  } catch {
    return [];
  }
}


/* =========================================================
OPENSTREETMAP — CLUBS / GROUPS
========================================================= */

async function osmGroups(
  latitude,
  longitude,
  radiusKm,
  language
) {

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return [];
  }

  const radiusMeters =
    Math.min(
      100000,
      Math.max(
        1000,
        Math.round(
          radiusKm *
          1000
        )
      )
    );

  const query = `
[out:json][timeout:12];
(
  nwr["club"](around:${radiusMeters},${latitude},${longitude});
  nwr["office"="association"]["name"~"dog|cat|pet|animal|kennel|canine|feline|breed",i](around:${radiusMeters},${latitude},${longitude});
  nwr["name"~"dog club|cat club|pet club|kennel club|canine club|feline club|breed club|dog society|cat society|animal association",i](around:${radiusMeters},${latitude},${longitude});
);
out center tags;
`;

  try {

    const response =
      await fetchWithTimeout(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded; charset=UTF-8",

            "User-Agent":
              "PETS-DOGUE-Community/4.0"
          },

          body:
            "data=" +
            encodeURIComponent(query)
        },
        OVERPASS_TIMEOUT
      );

    if (!response.ok) {
      return [];
    }

    const data =
      await response.json();

    const elements =
      Array.isArray(
        data.elements
      )
        ? data.elements
        : [];

    return elements
      .slice(0, 40)
      .map(
        element => {

          const tags =
            element.tags || {};

          const title =
            cleanText(
              tags.name ||
              tags["name:en"] ||
              ""
            );

          if (!title) {
            return null;
          }

          const itemLat =
            numberOrNull(
              element.lat ??
              element.center?.lat
            );

          const itemLng =
            numberOrNull(
              element.lon ??
              element.center?.lon
            );

          const website =
            safeUrl(
              tags.website ||
              tags["contact:website"] ||
              tags.url ||
              ""
            );

          const facebook =
            safeUrl(
              tags.facebook ||
              tags["contact:facebook"] ||
              ""
            );

          const osmUrl =
            `https://www.openstreetmap.org/${element.type}/${element.id}`;

          const address =
            cleanText(
              [
                tags["addr:housenumber"],
                tags["addr:street"],
                tags["addr:city"],
                tags["addr:postcode"]
              ]
                .filter(Boolean)
                .join(" ")
            );

          const description =
            cleanText(
              [
                tags.description,
                tags.club
                  ? "Club"
                  : "",
                tags.office === "association"
                  ? "Association"
                  : "",
                tags.sport,
                tags.community_centre,
                facebook
                  ? "Community group"
                  : ""
              ]
                .filter(Boolean)
                .join(" · ")
            );

          return {

            provider:
              "openstreetmap",

            category:
              "group",

            title,

            description:
              description ||
              "Local pet club, group or animal association.",

            url:
              website ||
              facebook ||
              osmUrl,

            image: "",

            publishedAt: null,

            eventStart: null,

            source:
              "OpenStreetMap",

            language,

            location:
              tags["addr:city"] ||
              "",

            venue:
              title,

            address,

            latitude:
              itemLat,

            longitude:
              itemLng
          };
        }
      )
      .filter(Boolean);

  } catch {
    return [];
  }
}


/* =========================================================
FREE SEARCH
========================================================= */

async function searchFreeSources(
  query,
  category,
  language,
  includeReddit = false
) {

  const jobs = [

    googleNewsSearch(
      query,
      category,
      language
    ),

    gdeltSearch(
      query,
      category,
      language
    )
  ];

  if (includeReddit) {

    jobs.push(
      redditSearch(
        query,
        category,
        language
      )
    );
  }

  const settled =
    await Promise.allSettled(
      jobs
    );

  return settled.flatMap(
    result =>
      result.status ===
      "fulfilled" &&
      Array.isArray(
        result.value
      )
        ? result.value
        : []
  );
}


/* =========================================================
SEARCH CATEGORY
========================================================= */

async function searchCategory(
  category,
  location,
  resolved,
  language
) {

  const query =
    buildQuery(
      category,
      location,
      resolved,
      language
    );

  const includeReddit =
    [
      "lost",
      "seen",
      "found",
      "event",
      "group",
      "help",
      "adoption"
    ].includes(
      category
    );

  return searchFreeSources(
    query,
    category,
    language,
    includeReddit
  );
}


/* =========================================================
SEARCH EVERYTHING
========================================================= */

async function searchEverything(
  params,
  resolved
) {

  const {
    location,
    language,
    radius,
    category
  } = params;

  if (category) {

    const results =
      await searchCategory(
        category,
        location,
        resolved,
        language
      );

    if (
      category ===
      "group"
    ) {

      const groups =
        await osmGroups(
          params.latitude,
          params.longitude,
          radius,
          language
        );

      results.push(
        ...groups
      );
    }

    return results;
  }


  /*
  Full Community screen:
  categories are searched in parallel.

  No paid API calls.
  */

  const settled =
    await Promise.allSettled(
      CATEGORIES.map(
        categoryName =>
          searchCategory(
            categoryName,
            location,
            resolved,
            language
          )
      )
    );

  const results =
    settled.flatMap(
      result =>
        result.status ===
        "fulfilled" &&
        Array.isArray(
          result.value
        )
          ? result.value
          : []
    );


  const groups =
    await osmGroups(
      params.latitude,
      params.longitude,
      radius,
      language
    );

  results.push(
    ...groups
  );

  return results;
}


/* =========================================================
CLASSIFY
========================================================= */

function classifyItem(
  title,
  description,
  suggestedCategory
) {

  const text =
    (
      String(title || "") +
      " " +
      String(description || "")
    ).toLowerCase();


  if (
    includesAny(
      text,
      KEYWORDS.found
    ) &&
    (
      includesAny(
        text,
        KEYWORDS.lost
      ) ||
      suggestedCategory ===
      "found"
    )
  ) {

    return {
      type: "found",
      status: "found"
    };
  }


  if (
    includesAny(
      text,
      KEYWORDS.lost
    )
  ) {

    return {
      type: "lost",
      status: "active"
    };
  }


  if (
    includesAny(
      text,
      KEYWORDS.seen
    )
  ) {

    return {
      type: "seen",
      status: "active"
    };
  }


  if (
    suggestedCategory ===
    "group" ||
    includesAny(
      text,
      KEYWORDS.group
    )
  ) {

    return {
      type: "group",
      status: "active"
    };
  }


  if (
    suggestedCategory ===
    "event" ||
    includesAny(
      text,
      KEYWORDS.event
    )
  ) {

    return {
      type: "event",
      status: "active"
    };
  }


  if (
    includesAny(
      text,
      KEYWORDS.volunteers
    )
  ) {

    return {
      type: "volunteers",
      status: "active"
    };
  }


  if (
    includesAny(
      text,
      KEYWORDS.foster
    )
  ) {

    return {
      type: "foster",
      status: "active"
    };
  }


  if (
    includesAny(
      text,
      KEYWORDS.adoption
    )
  ) {

    return {
      type: "adoption",
      status: "active"
    };
  }


  if (
    includesAny(
      text,
      KEYWORDS.help
    )
  ) {

    return {
      type: "help",
      status: "active"
    };
  }


  if (
    CATEGORIES.includes(
      suggestedCategory
    )
  ) {

    return {
      type:
        suggestedCategory,
      status:
        "active"
    };
  }


  return {
    type: "news",
    status: "active"
  };
}


/* =========================================================
FRESHNESS
========================================================= */

function passesFreshness(item) {

  if (
    item.type ===
    "group"
  ) {
    return true;
  }


  if (
    item.type ===
    "event"
  ) {

    if (
      item.eventStart
    ) {

      const until =
        daysUntil(
          item.eventStart
        );

      if (
        until !== null &&
        until < -1.5
      ) {
        return false;
      }

      if (
        until !== null &&
        until > 365
      ) {
        return false;
      }
    }

    if (
      item.publishedAt &&
      ageDays(
        item.publishedAt
      ) > 120
    ) {
      return false;
    }

    return true;
  }


  if (
    !item.publishedAt
  ) {
    return true;
  }


  const maximumAge = {

    lost: 60,

    seen: 30,

    found: 120,

    help: 90,

    volunteers: 180,

    foster: 180,

    adoption: 240,

    news: 45
  };


  return (
    ageDays(
      item.publishedAt
    ) <=
    (
      maximumAge[
        item.type
      ] ||
      90
    )
  );
}


/* =========================================================
NORMALIZE RESULTS
========================================================= */

function normalizeItems(
  rawItems,
  location,
  resolved,
  coordinates,
  radius
) {

  const output = [];


  for (
    const raw of
    rawItems
  ) {

    const url =
      stripTracking(
        safeUrl(
          raw.url
        )
      );

    if (!url) {
      continue;
    }


    const title =
      cleanText(
        raw.title
      );

    const description =
      cleanText(
        raw.description
      );


    if (
      !title ||
      title.length < 4
    ) {
      continue;
    }


    const classification =
      classifyItem(
        title,
        description,
        raw.category
      );


    const latitude =
      numberOrNull(
        raw.latitude ??
        raw.lat
      );

    const longitude =
      numberOrNull(
        raw.longitude ??
        raw.lng
      );


    const distance =
      haversineKm(
        coordinates.latitude,
        coordinates.longitude,
        latitude,
        longitude
      );


    if (
      distance !== null &&
      distance >
      radius * 1.35
    ) {
      continue;
    }


    const evidence =
      localityEvidence(
        {
          title,
          description,
          venue:
            raw.venue,
          address:
            raw.address,
          location:
            raw.location,
          url
        },
        location,
        resolved
      );


    /*
    Internet result without coordinates
    must contain local evidence.

    OpenStreetMap results have coordinates,
    so they do not need text locality evidence.
    */

    if (
      distance === null &&
      raw.provider !==
      "openstreetmap" &&
      evidence.matches === 0
    ) {
      continue;
    }


    const eventStart =
      classification.type ===
      "event"
        ? (
            normalizeDate(
              raw.eventStart
            ) ||
            parseDateFromText(
              title +
              " " +
              description
            )
          )
        : null;


    const item = {

      id:
        createId(
          url +
          "|" +
          title
        ),

      type:
        classification.type,

      status:
        classification.status,

      title,

      description:
        description ||
        title,

      url,

      image:
        safeUrl(
          raw.image
        ),

      source:
        cleanText(
          raw.source ||
          hostname(url)
        ),

      provider:
        raw.provider ||
        "free-web",

      publishedAt:
        normalizeDate(
          raw.publishedAt
        ),

      eventStart,

      language:
        normalizeLanguage(
          raw.language
        ),

      location:
        cleanText(
          raw.location ||
          mainLocationName(
            location,
            resolved
          )
        ),

      venue:
        cleanText(
          raw.venue
        ),

      address:
        cleanText(
          raw.address
        ),

      lat:
        latitude,

      lng:
        longitude,

      distanceKm:
        distance,

      relevance:
        evidence.score,

      localityMatches:
        evidence.matches
    };


    if (
      passesFreshness(
        item
      )
    ) {

      output.push(
        item
      );
    }
  }


  return output;
}


/* =========================================================
DUPLICATES
========================================================= */

function duplicateText(value) {

  return String(
    value ||
    ""
  )
    .toLowerCase()
    .normalize("NFKD")
    .replace(
      /[^\p{L}\p{N}]+/gu,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}


function similarity(
  first,
  second
) {

  const a =
    new Set(
      duplicateText(
        first
      )
        .split(" ")
        .filter(
          word =>
            word.length >= 4
        )
    );

  const b =
    new Set(
      duplicateText(
        second
      )
        .split(" ")
        .filter(
          word =>
            word.length >= 4
        )
    );

  if (
    !a.size ||
    !b.size
  ) {
    return 0;
  }

  let common = 0;

  for (
    const word of
    a
  ) {

    if (
      b.has(word)
    ) {
      common++;
    }
  }

  return (
    common /
    Math.min(
      a.size,
      b.size
    )
  );
}


/* =========================================================
SCORING
========================================================= */

function scoreItem(item) {

  let score = 0;


  score +=
    Math.min(
      item.relevance *
      50,
      50
    );


  score +=
    Math.min(
      (
        item.localityMatches ||
        0
      ) *
      9,
      27
    );


  if (
    item.publishedAt
  ) {

    score +=
      Math.max(
        0,
        28 -
        Math.min(
          Math.max(
            0,
            ageDays(
              item.publishedAt
            )
          ),
          28
        )
      );
  }


  if (
    item.type ===
    "event"
  ) {

    score += 16;

    if (
      item.eventStart
    ) {

      const until =
        daysUntil(
          item.eventStart
        );

      if (
        until !== null &&
        until >= 0
      ) {

        score +=
          Math.max(
            4,
            30 -
            Math.min(
              until,
              26
            )
          );
      }
    }
  }


  if (
    item.type ===
    "group"
  ) {

    score += 18;
  }


  if (
    item.provider ===
    "openstreetmap"
  ) {

    score += 14;
  }


  if (
    item.provider ===
    "google-news"
  ) {

    score += 6;
  }


  if (
    item.provider ===
    "reddit"
  ) {

    score += 5;
  }


  if (
    item.image
  ) {

    score += 5;
  }


  if (
    item.description &&
    item.description.length >= 60
  ) {

    score += 4;
  }


  if (
    item.distanceKm !== null
  ) {

    score +=
      Math.max(
        0,
        15 -
        Math.min(
          item.distanceKm,
          15
        )
      );
  }


  return score;
}


function deduplicate(items) {

  const byUrl =
    new Map();


  for (
    const item of
    items
  ) {

    const key =
      stripTracking(
        item.url
      );

    const existing =
      byUrl.get(key);

    if (
      !existing ||
      scoreItem(item) >
      scoreItem(existing)
    ) {

      byUrl.set(
        key,
        item
      );
    }
  }


  const sorted =
    [
      ...byUrl.values()
    ]
      .sort(
        (a, b) =>
          scoreItem(b) -
          scoreItem(a)
      );


  const output = [];


  for (
    const item of
    sorted
  ) {

    const duplicate =
      output.some(
        existing =>
          existing.type ===
          item.type &&
          similarity(
            existing.title,
            item.title
          ) >= 0.78
      );

    if (!duplicate) {

      output.push(
        item
      );
    }
  }


  return output;
}


/* =========================================================
BALANCE
========================================================= */

function balanceItems(
  items,
  limit,
  requestedCategory
) {

  if (
    requestedCategory
  ) {

    return [
      ...items
    ]
      .sort(
        (a, b) =>
          scoreItem(b) -
          scoreItem(a)
      )
      .slice(
        0,
        limit
      );
  }


  const weights = {

    lost: 2,

    seen: 1,

    found: 1,

    event: 4,

    group: 4,

    help: 1,

    volunteers: 1,

    foster: 1,

    adoption: 2,

    news: 2
  };


  const buckets = {};


  for (
    const category of
    CATEGORIES
  ) {

    buckets[
      category
    ] = [];
  }


  for (
    const item of
    items
  ) {

    const type =
      CATEGORIES.includes(
        item.type
      )
        ? item.type
        : "news";

    buckets[
      type
    ].push(
      item
    );
  }


  Object.values(
    buckets
  )
    .forEach(
      bucket =>
        bucket.sort(
          (a, b) =>
            scoreItem(b) -
            scoreItem(a)
        )
    );


  const output = [];

  let progress = true;


  while (
    output.length <
    limit &&
    progress
  ) {

    progress = false;


    for (
      const category of
      CATEGORIES
    ) {

      const amount =
        weights[
          category
        ] || 1;


      for (
        let index = 0;
        index < amount;
        index++
      ) {

        if (
          output.length >=
          limit
        ) {
          break;
        }


        const item =
          buckets[
            category
          ].shift();


        if (item) {

          output.push(
            item
          );

          progress = true;
        }
      }
    }
  }


  return output;
}


/* =========================================================
COUNTS
========================================================= */

function emptyCounts() {

  return {

    all: 0,

    lost: 0,

    seen: 0,

    found: 0,

    event: 0,

    group: 0,

    help: 0,

    volunteers: 0,

    foster: 0,

    adoption: 0,

    news: 0
  };
}


function buildCounts(items) {

  const counts =
    emptyCounts();

  counts.all =
    items.length;


  for (
    const item of
    items
  ) {

    if (
      Object.prototype
        .hasOwnProperty
        .call(
          counts,
          item.type
        )
    ) {

      counts[
        item.type
      ]++;
    }
  }


  return counts;
}


/* =========================================================
EVENT STATUS
========================================================= */

function eventStatus(
  eventStart
) {

  const difference =
    daysUntil(
      eventStart
    );


  if (
    difference === null
  ) {
    return null;
  }


  if (
    difference < -1
  ) {
    return "past";
  }


  if (
    difference < 1
  ) {
    return "today";
  }


  if (
    difference < 2
  ) {
    return "tomorrow";
  }


  if (
    difference <= 7
  ) {
    return "this_week";
  }


  return "upcoming";
}


/* =========================================================
PUBLIC ITEM
========================================================= */

function publicItem(
  item,
  coordinates
) {

  return {

    id:
      item.id,

    type:
      item.type,

    status:
      item.status,

    eventStatus:
      item.type ===
      "event"
        ? eventStatus(
            item.eventStart
          )
        : null,

    title:
      item.title,

    description:
      item.description,

    originalTitle:
      null,

    originalDescription:
      null,

    translated:
      false,

    url:
      item.url,

    image:
      item.image ||
      "",

    source:
      item.source ||
      hostname(
        item.url
      ),

    provider:
      item.provider,

    publishedAt:
      item.publishedAt,

    eventStart:
      item.eventStart ||
      null,

    language:
      item.language,

    location:
      item.location,

    venue:
      item.venue ||
      "",

    address:
      item.address ||
      "",

    lat:
      Number.isFinite(
        item.lat
      )
        ? item.lat
        : null,

    lng:
      Number.isFinite(
        item.lng
      )
        ? item.lng
        : null,

    searchLat:
      Number.isFinite(
        coordinates.latitude
      )
        ? coordinates.latitude
        : null,

    searchLng:
      Number.isFinite(
        coordinates.longitude
      )
        ? coordinates.longitude
        : null,

    distanceKm:
      typeof item.distanceKm ===
      "number"
        ? Number(
            item.distanceKm
              .toFixed(1)
          )
        : null,

    official:
      false,

    isLive:
      true
  };
}


/* =========================================================
PROVIDERS
========================================================= */

function providerStatus() {

  return {

    freeOnly: true,

    googleNews: true,

    gdelt: true,

    reddit: true,

    openStreetMap: true,

    nominatim: true,

    serpApi: false,

    serper: false,

    brave: false,

    bing: false,

    newsApi: false,

    ticketmaster: false,

    deepl: false
  };
}


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
    `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=1800`
  );

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  res.end(
    JSON.stringify(
      payload
    )
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
    req.method ===
    "OPTIONS"
  ) {

    res.statusCode =
      204;

    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type"
    );

    res.end();

    return;
  }


  if (
    req.method !==
    "GET"
  ) {

    sendJson(
      res,
      405,
      {
        ok: false,
        error:
          "Method not allowed"
      }
    );

    return;
  }


  const startedAt =
    Date.now();

  const params =
    readQuery(req);

  const validationError =
    validateRequest(
      params
    );


  if (
    validationError
  ) {

    sendJson(
      res,
      400,
      {
        ok: false,
        error:
          validationError
      }
    );

    return;
  }


  try {

    let resolvedLocation =
      null;

    let latitude =
      Number.isFinite(
        params.latitude
      )
        ? params.latitude
        : null;

    let longitude =
      Number.isFinite(
        params.longitude
      )
        ? params.longitude
        : null;

    let location =
      params.location;


    /* =====================================================
    RESOLVE LOCATION
    ===================================================== */

    if (
      Number.isFinite(
        params.latitude
      ) &&
      Number.isFinite(
        params.longitude
      )
    ) {

      resolvedLocation =
        await reverseLocation(
          params.latitude,
          params.longitude,
          params.language
        );

      if (!location) {

        location =
          resolvedLocation?.name ||
          resolvedLocation?.displayName ||
          "";
      }

    } else if (
      location
    ) {

      resolvedLocation =
        await forwardLocation(
          location,
          params.language
        );

      if (
        resolvedLocation
      ) {

        latitude =
          resolvedLocation.latitude;

        longitude =
          resolvedLocation.longitude;
      }
    }


    if (!location) {

      sendJson(
        res,
        400,
        {
          ok: false,
          error:
            "Could not resolve location"
        }
      );

      return;
    }


    /*
    Use resolved coordinates for OSM and radius checks.
    */

    if (
      !Number.isFinite(
        latitude
      ) &&
      Number.isFinite(
        resolvedLocation?.latitude
      )
    ) {

      latitude =
        resolvedLocation.latitude;
    }


    if (
      !Number.isFinite(
        longitude
      ) &&
      Number.isFinite(
        resolvedLocation?.longitude
      )
    ) {

      longitude =
        resolvedLocation.longitude;
    }


    const searchParams = {

      ...params,

      location,

      latitude,

      longitude
    };


    /* =====================================================
    SEARCH
    ===================================================== */

    const rawResults =
      await searchEverything(
        searchParams,
        resolvedLocation
      );


    /* =====================================================
    NORMALIZE
    ===================================================== */

    let items =
      normalizeItems(
        rawResults,
        location,
        resolvedLocation,
        {
          latitude,
          longitude
        },
        params.radius
      );


    /* =====================================================
    DEDUPLICATE
    ===================================================== */

    items =
      deduplicate(
        items
      );


    /* =====================================================
    CATEGORY
    ===================================================== */

    if (
      params.category
    ) {

      items =
        items.filter(
          item =>
            item.type ===
            params.category
        );
    }


    /*
    Counts are calculated BEFORE visual result limit,
    so filter counters remain correct.
    */

    const counts =
      buildCounts(
        items
      );


    /* =====================================================
    BALANCE
    ===================================================== */

    const visibleItems =
      balanceItems(
        items,
        params.limit,
        params.category
      );


    /* =====================================================
    RESPONSE
    ===================================================== */

    sendJson(
      res,
      200,
      {

        ok: true,

        live: true,

        freeOnly: true,

        generatedAt:
          new Date()
            .toISOString(),

        tookMs:
          Date.now() -
          startedAt,

        query: {

          location:
            cleanText(
              location
            ),

          canonicalLocation:
            cleanText(
              resolvedLocation?.name ||
              location
            ),

          lat:
            latitude,

          lng:
            longitude,

          radiusKm:
            params.radius,

          language:
            params.language,

          category:
            params.category ||
            "all",

          limit:
            params.limit
        },

        resolvedLocation,

        providers:
          providerStatus(),

        counts,

        items:
          visibleItems.map(
            item =>
              publicItem(
                item,
                {
                  latitude,
                  longitude
                }
              )
          )
      }
    );


  } catch (error) {

    console.error(
      "PETS & DOGUE Community Discovery error:",
      error
    );

    sendJson(
      res,
      500,
      {

        ok: false,

        live: false,

        freeOnly: true,

        generatedAt:
          new Date()
            .toISOString(),

        error:
          "Community discovery temporarily unavailable",

        providers:
          providerStatus(),

        counts:
          emptyCounts(),

        items: []
      }
    );
  }
};
