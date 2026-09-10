"use strict";

/* =========================================================
PETS & DOGUE
LOCAL COMMUNITY — LIVE DISCOVERY AGGREGATOR
Vercel Serverless Function

Finds fresh LOCAL animal/community information for the
selected place and radius:
- events, meetups, group walks, breed meetups
- dog/cat shows, exhibitions, festivals, adoption days
- lost / seen / found pets
- help, volunteers, foster, adoption
- local animal news

No extra npm packages required.

Optional environment variables:
SERPAPI_API_KEY=
SERPER_API_KEY=
BRAVE_SEARCH_API_KEY=
BING_SEARCH_API_KEY=
TICKETMASTER_API_KEY=
NEWSAPI_API_KEY=
DEEPL_API_KEY=
========================================================= */

const DEFAULT_LIMIT = 32;
const MAX_LIMIT = 60;
const DEFAULT_RADIUS_KM = 15;
const MAX_RADIUS_KM = 100;
const REQUEST_TIMEOUT = 5200;
const MAX_PROVIDER_RESULTS = 10;
const CACHE_SECONDS = 180;

const CATEGORIES = [
  "event",
  "lost",
  "seen",
  "found",
  "help",
  "volunteers",
  "foster",
  "adoption",
  "news"
];

const WEIGHTS = {
  event:3,
  lost:2,
  seen:1,
  found:1,
  help:1,
  volunteers:1,
  foster:1,
  adoption:2,
  news:1
};

const LANGUAGES = new Set([
  "en","uk","ru","fr","de","es","it","pt","nl","pl","cs","sk",
  "hu","ro","bg","el","sv","da","no","fi","tr","ar","hi"
]);

const LANGUAGE_ALIASES = {
  ua:"uk",
  cz:"cs",
  gr:"el",
  se:"sv",
  dk:"da"
};

const EVENT_HINTS = {
  en:"pet events dog meetups group dog walks dog shows cat shows pet festivals adoption events",
  uk:"події для тварин зустрічі собак прогулянки виставки фестивалі адопція",
  ru:"мероприятия для животных встречи собак прогулки выставки фестивали пристройство",
  fr:"événements animaux rencontres chiens promenades expositions festivals adoption",
  de:"Tierveranstaltungen Hundetreffen Spaziergänge Ausstellungen Festivals Adoption",
  es:"eventos mascotas encuentros perros paseos exposiciones festivales adopción",
  it:"eventi animali raduni cani passeggiate mostre festival adozioni",
  pt:"eventos animais encontros cães passeios exposições festivais adoção",
  nl:"dierenevenementen hondenmeetups wandelingen shows festivals adoptie",
  pl:"wydarzenia dla zwierząt spotkania psów spacery wystawy festiwale adopcja",
  cs:"zvířecí akce setkání psů procházky výstavy festivaly adopce",
  sk:"zvieracie podujatia stretnutia psov prechádzky výstavy festivaly adopcia",
  hu:"állatos események kutyatalálkozók séták kiállítások fesztiválok örökbefogadás",
  ro:"evenimente animale întâlniri câini plimbări expoziții festivaluri adopție",
  bg:"събития за животни срещи кучета разходки изложби фестивали осиновяване",
  el:"εκδηλώσεις ζώων συναντήσεις σκύλων βόλτες εκθέσεις φεστιβάλ υιοθεσία",
  sv:"djurevenemang hundträffar promenader utställningar festivaler adoption",
  da:"dyrearrangementer hundetræf gåture udstillinger festivaler adoption",
  no:"dyrearrangementer hundetreff turer utstillinger festivaler adopsjon",
  fi:"eläintapahtumat koiratapaamiset kävelyt näyttelyt festivaalit adoptio",
  tr:"evcil hayvan etkinlikleri köpek buluşmaları yürüyüşler gösteriler festivaller sahiplendirme",
  ar:"فعاليات الحيوانات لقاءات الكلاب نزهات عروض مهرجانات تبني",
  hi:"पालतू कार्यक्रम डॉग मीटअप वॉक शो उत्सव गोद लेना"
};

const TERMS = {
  event:[
    "pet event","dog event","dog meetup","breed meetup","group dog walk",
    "puppy social","dog show","cat show","pet exhibition","pet festival",
    "animal festival","adoption event","shelter open day","pet charity event",
    "dog agility event","dog training workshop"
  ],
  lost:["lost dog","lost cat","missing pet","missing dog","missing cat"],
  seen:["lost dog sighting","lost cat sighting","stray pet sighting","dog seen roaming"],
  found:["lost pet found","lost dog found","lost cat found","pet reunited"],
  help:["animal rescue needs help","animal shelter needs help","urgent animal help","pet fundraiser"],
  volunteers:["animal shelter volunteers","animal rescue volunteers","dog rescue volunteers"],
  foster:["animal foster home needed","dog foster needed","cat foster needed"],
  adoption:["dog adoption","cat adoption","pet adoption","animal needs home","pet looking for family"],
  news:["local animal news","local pet news","animal welfare news","dog news","cat news"]
};

const KEYWORDS = {
  found:["found","reunited","returned home","back home","owner found","найден","нашёлся","знайден","retrouvé","gefunden","encontrado","ritrovato","gevonden","odnalezion","nalezen","nájden","megtalált","găsit","намерен","βρέθηκε","hittad","fundet","funnet","löytynyt","bulundu","تم العثور","मिला"],
  lost:["lost dog","lost cat","missing dog","missing cat","missing pet","lost pet","пропала собака","пропал кот","пропала кошка","потерялся","загубився","chien perdu","chat perdu","hund vermisst","katze vermisst","perro perdido","gato perdido","cane smarrito","gatto smarrito","cão perdido","hond vermist","kat vermist","zaginął pies","ztracený pes","stratený pes","elveszett kutya","câine pierdut","изгубено куче","χαμένος σκύλος","försvunnen hund","savnet hund","kadonnut koira","kayıp köpek","كلب مفقود","खोया कुत्ता"],
  seen:["sighted","sighting","seen roaming","spotted","видели","заметили","бачили","gesichtet","aperçu","avistado","avvistato","widziano","viděn","videný","látták","văzut","видяно","εθεάθη","sedd","set","nähty","görüldü","شوهد","देखा गया"],
  event:["event","meetup","meet up","meeting","group walk","dog walk","breed meetup","puppy social","dog show","cat show","pet show","animal show","exhibition","expo","festival","pet fair","adoption day","adoption event","open day","charity event","fundraising event","training event","workshop","agility","competition","parade","мероприятие","встреча","выставка","прогулка","фестиваль","подія","зустріч","виставка","прогулянка"],
  volunteers:["volunteer","volunteers","volunteering","волонтер","волонтёр","bénévole","freiwillige","voluntario","volontari","wolontariusz","dobrovolník","önkéntes","voluntar","εθελον","frivillig","vapaaehtois","gönüllü","متطوع","स्वयंसेव"],
  foster:["foster","foster home","temporary foster","передерж","перетрим","famille d'accueil","pflegestelle","acogida","stallo","acolhimento","opvanggezin","dom tymczasowy","dočasná péče","dočasná starostlivosť","ideiglenes befogadó","găzduire temporară","временен дом","φιλοξενία","jourhem","plejehjem","fosterhjem","sijaiskoti","geçici yuva","استضافة مؤقتة","अस्थायी घर"],
  adoption:["adopt","adoption","adoptable","needs a home","looking for home","looking for family","forever home","ищет дом","ищет семью","шукає дім","adopter","zuhause gesucht","adopción","adozione","adoção","adoptie","adopcji","k adopci","adopciu","örökbefogadás","adopție","осиновяване","υιοθεσία","adopsjon","adoptoitavaksi","sahiplendirme","للتبني","गोद"],
  help:["help needed","needs help","urgent help","appeal","fundraiser","donation","rescue appeal","нужна помощь","потрібна допомога","besoin d'aide","braucht hilfe","necesita ayuda","serve aiuto","precisa ajuda","hulp nodig","potrzebuje pomocy","potřebuje pomoc","potrebuje pomoc","segítség","nevoie ajutor","нужда помощ","χρειάζεται βοήθεια","behöver hjälp","trenger hjelp","tarvitsee apua","yardım","يحتاج مساعدة","मदद चाहिए"]
};

const TRUSTED = [
  "rspca.org.uk","bluecross.org.uk","dogstrust.org.uk","cats.org.uk",
  "eventbrite.","meetup.com","allevents.in","ticketmaster.",
  "thekennelclub.org.uk","gov.",".gov","facebook.com","instagram.com"
];

const BLOCKED = ["pinterest.com","quora.com","tiktok.com"];

function normalizeLanguage(value){
  let code = String(value || "en").trim().toLowerCase().split(/[-_]/)[0];
  code = LANGUAGE_ALIASES[code] || code;
  return LANGUAGES.has(code) ? code : "en";
}

function cleanText(value){
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi," ")
    .replace(/<style[\s\S]*?<\/style>/gi," ")
    .replace(/<[^>]+>/g," ")
    .replace(/&nbsp;/g," ")
    .replace(/&amp;/g,"&")
    .replace(/&quot;/g,'"')
    .replace(/&#39;|&#x27;/g,"'")
    .replace(/&lt;/g,"<")
    .replace(/&gt;/g,">")
    .replace(/\s+/g," ")
    .trim();
}

function safeUrl(value){
  try{
    const url = new URL(String(value || ""));
    return ["http:","https:"].includes(url.protocol) ? url.toString() : "";
  }catch{
    return "";
  }
}

function hostname(value){
  try{
    return new URL(value).hostname.toLowerCase().replace(/^www\./,"");
  }catch{
    return "";
  }
}

function stripTracking(value){
  try{
    const url = new URL(value);
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","fbclid","gclid"].forEach(key=>url.searchParams.delete(key));
    return url.toString();
  }catch{
    return value;
  }
}

function isBlocked(value){
  const host = hostname(value);
  return BLOCKED.some(domain=>host===domain || host.endsWith("."+domain));
}

function unique(values){
  return [...new Set(values.filter(Boolean))];
}

function clamp(value,min,max){
  return Math.min(Math.max(Number(value)||0,min),max);
}

function numberOrNull(value){
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeDate(value){
  if(!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function daysUntil(value){
  if(!value) return null;
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? null : (ms-Date.now())/86400000;
}

function ageDays(value){
  if(!value) return 999;
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? 999 : (Date.now()-ms)/86400000;
}

function includesAny(text,words){
  const value = String(text || "").toLowerCase();
  return words.some(word=>value.includes(String(word).toLowerCase()));
}

function idFor(value){
  let hash = 2166136261;
  for(const char of String(value || "")){
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash,16777619);
  }
  return "community-"+(hash>>>0).toString(36);
}

function xmlTag(block,tag){
  const match = String(block||"").match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,`i`));
  return match ? cleanText(match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,"$1")) : "";
}

function quote(value){
  return `"${String(value || "").replace(/"/g,"")}"`;
}

function parseDateFromText(text){
  const value = String(text || "");

  const iso = value.match(/\b(20\d{2})-(\d{2})-(\d{2})(?:[T\s](\d{1,2}):(\d{2}))?/);
  if(iso){
    const d = new Date(Number(iso[1]),Number(iso[2])-1,Number(iso[3]),Number(iso[4]||12),Number(iso[5]||0));
    if(!Number.isNaN(d.getTime())) return d.toISOString();
  }

  const numeric = value.match(/\b(\d{1,2})[\/.](\d{1,2})[\/.](20\d{2})\b/);
  if(numeric){
    const d = new Date(Number(numeric[3]),Number(numeric[2])-1,Number(numeric[1]),12,0);
    if(!Number.isNaN(d.getTime())) return d.toISOString();
  }

  const months = {
    jan:0,january:0,
    feb:1,february:1,
    mar:2,march:2,
    apr:3,april:3,
    may:4,
    jun:5,june:5,
    jul:6,july:6,
    aug:7,august:7,
    sep:8,sept:8,september:8,
    oct:9,october:9,
    nov:10,november:10,
    dec:11,december:11
  };

  const named = value.match(/\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2})(?:,?\s+(20\d{2}))?/i);

  if(named){
    const key = named[1].toLowerCase();
    const month = months[key];

    if(Number.isInteger(month)){
      const now = new Date();
      let year = Number(named[3] || now.getFullYear());
      let d = new Date(year,month,Number(named[2]),12,0);

      if(!named[3] && d.getTime()<Date.now()-21*86400000){
        d = new Date(year+1,month,Number(named[2]),12,0);
      }

      if(!Number.isNaN(d.getTime())){
        return d.toISOString();
      }
    }
  }

  return null;
}

function haversine(lat1,lng1,lat2,lng2){
  if(![lat1,lng1,lat2,lng2].every(Number.isFinite)){
    return null;
  }

  const toRad = d=>d*Math.PI/180;
  const dLat = toRad(lat2-lat1);
  const dLng = toRad(lng2-lng1);

  const a =
  Math.sin(dLat/2)**2 +
  Math.cos(toRad(lat1)) *
  Math.cos(toRad(lat2)) *
  Math.sin(dLng/2)**2;

  return 6371*2*Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1-a)
  );
}

async function fetchTimeout(
  url,
  options={},
  timeout=REQUEST_TIMEOUT
){
  const controller = new AbortController();
  const timer = setTimeout(
    ()=>controller.abort(),
    timeout
  );

  try{
    return await fetch(
      url,
      {
        ...options,
        signal:controller.signal
      }
    );
  }finally{
    clearTimeout(timer);
  }
}

function readQuery(req){
  const query = req.query || {};
  const category = String(query.category || "").toLowerCase();

  return {
    language:normalizeLanguage(query.lang),
    location:cleanText(query.location || "").slice(0,180),
    latitude:Number(query.lat),
    longitude:Number(query.lng),
    radius:clamp(
      query.radius || DEFAULT_RADIUS_KM,
      1,
      MAX_RADIUS_KM
    ),
    limit:Math.round(
      clamp(
        query.limit || DEFAULT_LIMIT,
        1,
        MAX_LIMIT
      )
    ),
    category:CATEGORIES.includes(category)
    ? category
    : ""
  };
}

function validate(params){
  if(
    !params.location &&
    (
      !Number.isFinite(params.latitude) ||
      !Number.isFinite(params.longitude)
    )
  ){
    return "location or coordinates are required";
  }

  if(
    Number.isFinite(params.latitude) &&
    (
      params.latitude < -90 ||
      params.latitude > 90
    )
  ){
    return "invalid latitude";
  }

  if(
    Number.isFinite(params.longitude) &&
    (
      params.longitude < -180 ||
      params.longitude > 180
    )
  ){
    return "invalid longitude";
  }

  return null;
}

async function reverseLocation(
  lat,
  lng,
  language
){
  try{
    const url =
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=12&addressdetails=1&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`;

    const response =
    await fetchTimeout(
      url,
      {
        headers:{
          "Accept-Language":language,
          "User-Agent":"PETS-DOGUE-Community/3.0"
        }
      },
      4200
    );

    if(!response.ok){
      return null;
    }

    return normalizeLocation(
      await response.json()
    );

  }catch{
    return null;
  }
}

async function forwardLocation(
  location,
  language
){
  try{
    const url =
    `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encodeURIComponent(location)}`;

    const response =
    await fetchTimeout(
      url,
      {
        headers:{
          "Accept-Language":language,
          "User-Agent":"PETS-DOGUE-Community/3.0"
        }
      },
      4200
    );

    if(!response.ok){
      return null;
    }

    const data = await response.json();

    return (
      Array.isArray(data) &&
      data.length
    )
    ? normalizeLocation(data[0])
    : null;

  }catch{
    return null;
  }
}

function normalizeLocation(data){
  const a = data?.address || {};

  const city =
  a.city ||
  a.town ||
  a.village ||
  a.municipality ||
  a.hamlet ||
  a.suburb ||
  "";

  const district =
  a.city_district ||
  a.suburb ||
  a.borough ||
  "";

  const county =
  a.county ||
  a.state_district ||
  "";

  const state =
  a.state ||
  a.region ||
  "";

  const country =
  a.country ||
  "";

  return {
    name:
    unique([
      city,
      county,
      state,
      country
    ])
    .slice(0,3)
    .join(", ") ||
    cleanText(data.display_name),

    displayName:
    cleanText(data.display_name),

    city,
    district,
    county,
    state,
    country,

    countryCode:
    String(
      a.country_code ||
      ""
    )
    .toLowerCase(),

    latitude:
    numberOrNull(data.lat),

    longitude:
    numberOrNull(data.lon)
  };
}

function localityName(
  requested,
  resolved
){
  return cleanText(
    resolved?.city ||
    resolved?.district ||
    String(requested || "")
    .split(",")[0] ||
    resolved?.county ||
    requested ||
    ""
  );
}

function locationContext(
  requested,
  resolved
){
  return unique([
    localityName(
      requested,
      resolved
    ),
    resolved?.county,
    resolved?.state,
    resolved?.country
  ])
  .filter(Boolean)
  .slice(0,4)
  .join(", ");
}

function localityTokens(
  requested,
  resolved
){
  const candidates =
  unique([
    String(requested || "")
    .split(",")[0],
    resolved?.city,
    resolved?.district,
    resolved?.county
  ])
  .filter(Boolean);

  const stop =
  new Set([
    "city",
    "district",
    "county",
    "region",
    "borough",
    "greater",
    "metropolitan",
    "municipality"
  ]);

  return unique(
    candidates
    .flatMap(
      value=>
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
      token=>
      token.length>=3 &&
      !stop.has(token)
    )
  )
  .slice(0,10);
}

function localityEvidence(
  raw,
  requested,
  resolved
){
  const tokens =
  localityTokens(
    requested,
    resolved
  );

  const text =
  [
    raw.title,
    raw.description,
    raw.venue,
    raw.address,
    raw.location,
    raw.url
  ]
  .join(" ")
  .toLowerCase();

  let matches = 0;

  tokens.forEach(
    token=>{
      if(text.includes(token)){
        matches++;
      }
    }
  );

  return {
    matches,
    score:
    tokens.length
    ? matches/tokens.length
    : 0
  };
}

function buildQuery(
  category,
  location,
  resolved,
  language
){
  const context =
  locationContext(
    location,
    resolved
  );

  const terms =
  unique(
    TERMS[category] ||
    []
  )
  .slice(
    0,
    category==="event"
    ? 9
    : 5
  )
  .map(quote);

  const localHint =
  category==="event"
  ? String(
    EVENT_HINTS[language] ||
    ""
  )
  .trim()
  : "";

  const localPart =
  localHint
  ? `(${localHint}) OR `
  : "";

  return (
    `(${localPart}${terms.join(" OR ")}) ${quote(context)}`
  );
}

function buildEventPlatformQuery(
  location,
  resolved
){
  const context =
  locationContext(
    location,
    resolved
  );

  return (
    `("dog" OR "pet" OR "cat" OR "puppy") ` +
    `("event" OR "meetup" OR "walk" OR "show" OR "festival" OR "exhibition" OR "adoption") ` +
    `(site:eventbrite.com OR site:meetup.com OR site:allevents.in OR site:facebook.com/events) ` +
    `${quote(context)}`
  );
}

function classify(
  title,
  description,
  suggested
){
  const text =
  `${title} ${description}`
  .toLowerCase();

  if(
    includesAny(
      text,
      KEYWORDS.found
    ) &&
    (
      includesAny(
        text,
        KEYWORDS.lost
      ) ||
      suggested==="found"
    )
  ){
    return {
      type:"found",
      status:"found"
    };
  }

  if(
    includesAny(
      text,
      KEYWORDS.lost
    )
  ){
    return {
      type:"lost",
      status:"active"
    };
  }

  if(
    includesAny(
      text,
      KEYWORDS.seen
    )
  ){
    return {
      type:"seen",
      status:"active"
    };
  }

  if(
    includesAny(
      text,
      KEYWORDS.event
    )
  ){
    return {
      type:"event",
      status:"active"
    };
  }

  if(
    includesAny(
      text,
      KEYWORDS.volunteers
    )
  ){
    return {
      type:"volunteers",
      status:"active"
    };
  }

  if(
    includesAny(
      text,
      KEYWORDS.foster
    )
  ){
    return {
      type:"foster",
      status:"active"
    };
  }

  if(
    includesAny(
      text,
      KEYWORDS.adoption
    )
  ){
    return {
      type:"adoption",
      status:"active"
    };
  }

  if(
    includesAny(
      text,
      KEYWORDS.help
    )
  ){
    return {
      type:"help",
      status:"active"
    };
  }

  return {
    type:
    CATEGORIES.includes(suggested)
    ? suggested
    : "news",
    status:"active"
  };
}

function maxAge(type){
  return ({
    lost:60,
    seen:30,
    found:120,
    event:240,
    help:90,
    volunteers:180,
    foster:180,
    adoption:180,
    news:60
  })[type] || 60;
}

function fresh(item){
  if(
    item.type==="event" &&
    item.eventStart
  ){
    const d =
    daysUntil(
      item.eventStart
    );

    return (
      d===null ||
      (
        d>=-1.5 &&
        d<=365
      )
    );
  }

  return (
    !item.publishedAt ||
    ageDays(
      item.publishedAt
    )<=maxAge(item.type)
  );
}

function countryCode(resolved){
  const code =
  String(
    resolved?.countryCode ||
    ""
  )
  .toLowerCase();

  return code==="gb"
  ? "uk"
  : (
    code ||
    "uk"
  );
}

function googleNewsLocale(language){
  const map = {
    en:{hl:"en-GB",gl:"GB",ceid:"GB:en"},
    uk:{hl:"uk",gl:"UA",ceid:"UA:uk"},
    ru:{hl:"ru",gl:"GB",ceid:"GB:ru"},
    fr:{hl:"fr",gl:"FR",ceid:"FR:fr"},
    de:{hl:"de",gl:"DE",ceid:"DE:de"},
    es:{hl:"es",gl:"ES",ceid:"ES:es"},
    it:{hl:"it",gl:"IT",ceid:"IT:it"},
    pt:{hl:"pt-PT",gl:"PT",ceid:"PT:pt-150"},
    nl:{hl:"nl",gl:"NL",ceid:"NL:nl"},
    pl:{hl:"pl",gl:"PL",ceid:"PL:pl"},
    cs:{hl:"cs",gl:"CZ",ceid:"CZ:cs"},
    sk:{hl:"sk",gl:"SK",ceid:"SK:sk"},
    hu:{hl:"hu",gl:"HU",ceid:"HU:hu"},
    ro:{hl:"ro",gl:"RO",ceid:"RO:ro"},
    bg:{hl:"bg",gl:"BG",ceid:"BG:bg"},
    el:{hl:"el",gl:"GR",ceid:"GR:el"},
    sv:{hl:"sv",gl:"SE",ceid:"SE:sv"},
    da:{hl:"da",gl:"DK",ceid:"DK:da"},
    no:{hl:"no",gl:"NO",ceid:"NO:no"},
    fi:{hl:"fi",gl:"FI",ceid:"FI:fi"},
    tr:{hl:"tr",gl:"TR",ceid:"TR:tr"},
    ar:{hl:"ar",gl:"AE",ceid:"AE:ar"},
    hi:{hl:"hi",gl:"IN",ceid:"IN:hi"}
  };

  return map[language] ||
  map.en;
}

async function braveSearch(
  query,
  category,
  language
){
  const key =
  process.env.BRAVE_SEARCH_API_KEY;

  if(!key){
    return [];
  }

  try{
    const freshness =
    [
      "event",
      "adoption",
      "volunteers",
      "foster"
    ]
    .includes(category)
    ? "py"
    : "pm";

    const url =
    `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${MAX_PROVIDER_RESULTS}&safesearch=moderate&text_decorations=false&spellcheck=true&freshness=${freshness}`;

    const response =
    await fetchTimeout(
      url,
      {
        headers:{
          Accept:"application/json",
          "X-Subscription-Token":key
        }
      }
    );

    if(!response.ok){
      return [];
    }

    const data =
    await response.json();

    return (
      data.web?.results ||
      []
    )
    .map(
      r=>({
        provider:"brave",
        category,
        title:cleanText(r.title),
        description:cleanText(r.description),
        url:safeUrl(r.url),
        image:safeUrl(
          r.thumbnail?.src ||
          ""
        ),
        publishedAt:
        normalizeDate(
          r.page_age ||
          r.age
        ),
        eventStart:
        parseDateFromText(
          `${r.title || ""} ${r.description || ""}`
        ),
        source:hostname(r.url),
        language
      })
    );

  }catch{
    return [];
  }
}

async function serperSearch(
  query,
  category,
  language,
  resolved
){
  const key =
  process.env.SERPER_API_KEY;

  if(!key){
    return [];
  }

  try{
    const response =
    await fetchTimeout(
      "https://google.serper.dev/search",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "X-API-KEY":key
        },
        body:
        JSON.stringify({
          q:query,
          num:MAX_PROVIDER_RESULTS,
          hl:language,
          gl:countryCode(resolved),
          location:
          localityName(
            "",
            resolved
          ) || undefined,
          tbs:
          category==="event"
          ? "qdr:y"
          : "qdr:m"
        })
      }
    );

    if(!response.ok){
      return [];
    }

    const data =
    await response.json();

    const output =
    (
      data.organic ||
      []
    )
    .map(
      r=>({
        provider:"serper",
        category,
        title:cleanText(r.title),
        description:cleanText(r.snippet),
        url:safeUrl(r.link),
        image:"",
        publishedAt:
        normalizeDate(r.date),
        eventStart:
        parseDateFromText(
          `${r.title || ""} ${r.snippet || ""} ${r.date || ""}`
        ),
        source:hostname(r.link),
        language
      })
    );

    for(
      const event of
      Array.isArray(data.events)
      ? data.events
      : []
    ){
      const address =
      Array.isArray(event.address)
      ? event.address.join(", ")
      : cleanText(
        event.address ||
        event.venue ||
        ""
      );

      output.push({
        provider:"serper-event",
        category:"event",
        title:
        cleanText(event.title),
        description:
        cleanText(event.description),
        url:
        safeUrl(
          event.link ||
          event.url
        ),
        image:
        safeUrl(
          event.thumbnail ||
          ""
        ),
        publishedAt:null,
        eventStart:
        parseDateFromText(
          `${event.date?.start_date || ""} ${event.date?.when || ""}`
        ),
        source:
        cleanText(
          event.source ||
          hostname(
            event.link ||
            event.url
          )
        ),
        language,
        venue:
        cleanText(event.venue),
        address,
        localityGuaranteed:true
      });
    }

    return output;

  }catch{
    return [];
  }
}

async function serpApiSearch(
  query,
  category,
  language,
  resolved
){
  const key =
  process.env.SERPAPI_API_KEY ||
  process.env.SERPAPI_KEY;

  if(!key){
    return [];
  }

  try{
    const params =
    new URLSearchParams({
      engine:"google",
      q:query,
      api_key:key,
      hl:language,
      gl:countryCode(resolved),
      num:String(
        MAX_PROVIDER_RESULTS
      )
    });

    if(category==="event"){
      params.set(
        "tbs",
        "qdr:y"
      );
    }

    const local =
    localityName(
      "",
      resolved
    );

    if(local){
      params.set(
        "location",
        local
      );
    }

    const response =
    await fetchTimeout(
      "https://serpapi.com/search.json?" +
      params.toString(),
      {},
      6000
    );

    if(!response.ok){
      return [];
    }

    const data =
    await response.json();

    const output =
    (
      Array.isArray(
        data.organic_results
      )
      ? data.organic_results
      : []
    )
    .map(
      r=>({
        provider:"serpapi",
        category,
        title:
        cleanText(r.title),
        description:
        cleanText(r.snippet),
        url:
        safeUrl(r.link),
        image:
        safeUrl(
          r.thumbnail ||
          ""
        ),
        publishedAt:
        normalizeDate(r.date),
        eventStart:
        parseDateFromText(
          `${r.title || ""} ${r.snippet || ""} ${r.date || ""}`
        ),
        source:
        hostname(r.link),
        language
      })
    );

    for(
      const event of
      Array.isArray(
        data.events_results
      )
      ? data.events_results
      : []
    ){
      const address =
      Array.isArray(event.address)
      ? event.address.join(", ")
      : cleanText(
        event.address ||
        ""
      );

      const link =
      safeUrl(
        event.link ||
        event.ticket_info?.[0]?.link ||
        ""
      );

      output.push({
        provider:"serpapi-event",
        category:"event",
        title:
        cleanText(event.title),
        description:
        cleanText(event.description),
        url:link,
        image:
        safeUrl(
          event.thumbnail ||
          event.image ||
          ""
        ),
        publishedAt:null,
        eventStart:
        parseDateFromText(
          `${event.date?.start_date || ""} ${event.date?.when || ""} ${event.time || ""}`
        ),
        source:
        cleanText(
          event.ticket_info?.[0]?.source ||
          hostname(link)
        ),
        language,
        venue:
        cleanText(
          event.venue?.name ||
          event.venue ||
          ""
        ),
        address,
        localityGuaranteed:true
      });
    }

    return output;

  }catch{
    return [];
  }
}

async function bingSearch(
  query,
  category,
  language
){
  const key =
  process.env.BING_SEARCH_API_KEY;

  if(!key){
    return [];
  }

  try{
    const market =
    ({
      en:"en-GB",
      uk:"uk-UA",
      ru:"ru-RU",
      fr:"fr-FR",
      de:"de-DE",
      es:"es-ES",
      it:"it-IT",
      pt:"pt-PT",
      nl:"nl-NL",
      pl:"pl-PL",
      cs:"cs-CZ",
      sk:"sk-SK",
      hu:"hu-HU",
      ro:"ro-RO",
      bg:"bg-BG",
      el:"el-GR",
      sv:"sv-SE",
      da:"da-DK",
      no:"nb-NO",
      fi:"fi-FI",
      tr:"tr-TR",
      ar:"ar-SA",
      hi:"hi-IN"
    })[language] ||
    "en-GB";

    const freshness =
    category==="event"
    ? "Year"
    : "Month";

    const url =
    `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}&count=${MAX_PROVIDER_RESULTS}&responseFilter=Webpages&safeSearch=Moderate&mkt=${encodeURIComponent(market)}&freshness=${freshness}`;

    const response =
    await fetchTimeout(
      url,
      {
        headers:{
          "Ocp-Apim-Subscription-Key":
          key
        }
      }
    );

    if(!response.ok){
      return [];
    }

    const data =
    await response.json();

    return (
      data.webPages?.value ||
      []
    )
    .map(
      r=>({
        provider:"bing",
        category,
        title:
        cleanText(r.name),
        description:
        cleanText(r.snippet),
        url:
        safeUrl(r.url),
        image:"",
        publishedAt:
        normalizeDate(
          r.dateLastCrawled
        ),
        eventStart:
        parseDateFromText(
          `${r.name || ""} ${r.snippet || ""}`
        ),
        source:
        hostname(r.url),
        language
      })
    );

  }catch{
    return [];
  }
}

async function googleNewsSearch(
  query,
  category,
  language
){
  try{
    const locale =
    googleNewsLocale(
      language
    );

    const url =
    `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${encodeURIComponent(locale.hl)}&gl=${encodeURIComponent(locale.gl)}&ceid=${encodeURIComponent(locale.ceid)}`;

    const response =
    await fetchTimeout(
      url,
      {
        headers:{
          "User-Agent":
          "PETS-DOGUE-Community/3.0"
        }
      },
      4500
    );

    if(!response.ok){
      return [];
    }

    const xml =
    await response.text();

    return (
      xml.match(
        /<item>[\s\S]*?<\/item>/gi
      ) ||
      []
    )
    .slice(
      0,
      MAX_PROVIDER_RESULTS
    )
    .map(
      block=>{
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

        return {
          provider:"google-news",
          category,
          title,
          description,
          url:safeUrl(link),
          image:"",
          publishedAt:
          normalizeDate(
            xmlTag(
              block,
              "pubDate"
            )
          ),
          eventStart:
          parseDateFromText(
            `${title} ${description}`
          ),
          source:
          xmlTag(
            block,
            "source"
          ) ||
          hostname(link),
          language
        };
      }
    )
    .filter(
      item=>
      item.title &&
      item.url
    );

  }catch{
    return [];
  }
}

function gdeltDate(value){
  const text =
  String(value || "");

  const match =
  text.match(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/
  );

  if(!match){
    return normalizeDate(value);
  }

  return new Date(
    Date.UTC(
      Number(match[1]),
      Number(match[2])-1,
      Number(match[3]),
      Number(match[4]),
      Number(match[5]),
      Number(match[6])
    )
  )
  .toISOString();
}

async function gdeltSearch(
  query,
  category,
  language
){
  try{
    const url =
    `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=ArtList&maxrecords=${MAX_PROVIDER_RESULTS}&format=json&sort=HybridRel`;

    const response =
    await fetchTimeout(
      url,
      {
        headers:{
          "User-Agent":
          "PETS-DOGUE-Community/3.0"
        }
      },
      4500
    );

    if(!response.ok){
      return [];
    }

    const data =
    await response.json();

    return (
      Array.isArray(
        data.articles
      )
      ? data.articles
      : []
    )
    .map(
      a=>({
        provider:"gdelt",
        category,
        title:
        cleanText(a.title),
        description:
        cleanText(a.description),
        url:
        safeUrl(a.url),
        image:
        safeUrl(a.socialimage),
        publishedAt:
        gdeltDate(a.seendate),
        eventStart:
        parseDateFromText(
          `${a.title || ""} ${a.description || ""}`
        ),
        source:
        cleanText(
          a.domain ||
          hostname(a.url)
        ),
        language:
        a.language ||
        language
      })
    );

  }catch{
    return [];
  }
}

async function newsApiSearch(
  query,
  category,
  language
){
  const key =
  process.env.NEWSAPI_API_KEY;

  if(!key){
    return [];
  }

  try{
    const url =
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=${MAX_PROVIDER_RESULTS}&apiKey=${encodeURIComponent(key)}`;

    const response =
    await fetchTimeout(
      url,
      {
        headers:{
          "User-Agent":
          "PETS-DOGUE-Community/3.0"
        }
      }
    );

    if(!response.ok){
      return [];
    }

    const data =
    await response.json();

    return (
      Array.isArray(data.articles)
      ? data.articles
      : []
    )
    .map(
      a=>({
        provider:"newsapi",
        category,
        title:
        cleanText(a.title),
        description:
        cleanText(
          a.description ||
          a.content
        ),
        url:
        safeUrl(a.url),
        image:
        safeUrl(a.urlToImage),
        publishedAt:
        normalizeDate(
          a.publishedAt
        ),
        eventStart:
        parseDateFromText(
          `${a.title || ""} ${a.description || ""}`
        ),
        source:
        cleanText(
          a.source?.name ||
          hostname(a.url)
        ),
        language
      })
    );

  }catch{
    return [];
  }
}

function ticketDate(date){
  return date
  .toISOString()
  .replace(
    /\.\d{3}Z$/,
    "Z"
  );
}

async function ticketmasterKeyword(
  keyword,
  resolved,
  radius,
  language
){
  const key =
  process.env.TICKETMASTER_API_KEY;

  if(
    !key ||
    !Number.isFinite(
      resolved?.latitude
    ) ||
    !Number.isFinite(
      resolved?.longitude
    )
  ){
    return [];
  }

  try{
    const now =
    new Date();

    const future =
    new Date(
      now.getTime() +
      365*86400000
    );

    const params =
    new URLSearchParams({
      apikey:key,
      latlong:
      `${resolved.latitude},${resolved.longitude}`,
      radius:
      String(
        Math.max(
          1,
          Math.round(radius)
        )
      ),
      unit:"km",
      size:"30",
      sort:"date,asc",
      keyword,
      startDateTime:
      ticketDate(now),
      endDateTime:
      ticketDate(future)
    });

    const response =
    await fetchTimeout(
      "https://app.ticketmaster.com/discovery/v2/events.json?" +
      params.toString(),
      {},
      6000
    );

    if(!response.ok){
      return [];
    }

    const data =
    await response.json();

    return (
      data._embedded?.events ||
      []
    )
    .map(
      event=>{
        const venue =
        event._embedded?.venues?.[0] ||
        {};

        const image =
        Array.isArray(event.images)
        ? (
          [...event.images]
          .sort(
            (a,b)=>
            (Number(b.width)||0) -
            (Number(a.width)||0)
          )[0]?.url ||
          ""
        )
        : "";

        const address =
        [
          venue.address?.line1,
          venue.city?.name,
          venue.state?.name,
          venue.country?.name
        ]
        .filter(Boolean)
        .join(", ");

        return {
          provider:"ticketmaster",
          category:"event",

          title:
          cleanText(
            event.name
          ),

          description:
          cleanText(
            event.info ||
            event.pleaseNote ||
            event.description ||
            ""
          ),

          url:
          safeUrl(
            event.url
          ),

          image:
          safeUrl(image),

          publishedAt:null,

          eventStart:
          normalizeDate(
            event.dates?.start?.dateTime ||
            event.dates?.start?.localDate
          ),

          source:
          "Ticketmaster",

          language,

          venue:
          cleanText(
            venue.name
          ),

          address,

          location:
          cleanText(
            venue.city?.name ||
            ""
          ),

          latitude:
          numberOrNull(
            venue.location?.latitude
          ),

          longitude:
          numberOrNull(
            venue.location?.longitude
          ),

          official:true,

          localityGuaranteed:true
        };
      }
    )
    .filter(
      event=>
      includesAny(
        `${event.title} ${event.description}`,
        [
          "dog",
          "pet",
          "cat",
          "puppy",
          "animal",
          "adoption",
          ...KEYWORDS.event
        ]
      )
    );

  }catch{
    return [];
  }
}

async function ticketmasterEvents(
  resolved,
  radius,
  language
){
  if(
    !process.env.TICKETMASTER_API_KEY
  ){
    return [];
  }

  const settled =
  await Promise.allSettled(
    [
      "dog",
      "pet",
      "cat",
      "animal"
    ]
    .map(
      keyword=>
      ticketmasterKeyword(
        keyword,
        resolved,
        radius,
        language
      )
    )
  );

  return settled.flatMap(
    result=>
    result.status==="fulfilled" &&
    Array.isArray(result.value)
    ? result.value
    : []
  );
}

function broadAvailable(){
  return Boolean(
    process.env.SERPAPI_API_KEY ||
    process.env.SERPAPI_KEY ||
    process.env.SERPER_API_KEY ||
    process.env.BRAVE_SEARCH_API_KEY ||
    process.env.BING_SEARCH_API_KEY
  );
}

async function broadSearch(
  query,
  category,
  language,
  resolved
){
  const tasks = [];

  if(
    process.env.SERPAPI_API_KEY ||
    process.env.SERPAPI_KEY
  ){
    tasks.push(
      serpApiSearch(
        query,
        category,
        language,
        resolved
      )
    );
  }

  if(
    process.env.SERPER_API_KEY
  ){
    tasks.push(
      serperSearch(
        query,
        category,
        language,
        resolved
      )
    );
  }

  if(
    process.env.BRAVE_SEARCH_API_KEY
  ){
    tasks.push(
      braveSearch(
        query,
        category,
        language
      )
    );
  }

  if(
    process.env.BING_SEARCH_API_KEY
  ){
    tasks.push(
      bingSearch(
        query,
        category,
        language
      )
    );
  }

  const settled =
  await Promise.allSettled(
    tasks.slice(0,3)
  );

  return settled.flatMap(
    result=>
    result.status==="fulfilled" &&
    Array.isArray(result.value)
    ? result.value
    : []
  );
}

async function fallbackSearch(
  query,
  category,
  language
){
  const tasks = [
    googleNewsSearch(
      query,
      category,
      language
    )
  ];

  if(
    !broadAvailable() ||
    [
      "event",
      "lost",
      "found",
      "help",
      "news"
    ]
    .includes(category)
  ){
    tasks.push(
      gdeltSearch(
        query,
        category,
        language
      )
    );
  }

  if(
    process.env.NEWSAPI_API_KEY &&
    [
      "event",
      "lost",
      "found",
      "help",
      "news"
    ]
    .includes(category)
  ){
    tasks.push(
      newsApiSearch(
        query,
        category,
        language
      )
    );
  }

  const settled =
  await Promise.allSettled(
    tasks
  );

  return settled.flatMap(
    result=>
    result.status==="fulfilled" &&
    Array.isArray(result.value)
    ? result.value
    : []
  );
}

async function searchCategory(
  category,
  location,
  resolved,
  language,
  focused
){
  const queries = [
    buildQuery(
      category,
      location,
      resolved,
      language
    )
  ];

  if(
    category==="event" &&
    focused
  ){
    queries.push(
      buildEventPlatformQuery(
        location,
        resolved
      )
    );
  }

  const settled =
  await Promise.allSettled(
    queries.map(
      async query=>{
        const providers =
        await Promise.allSettled([
          broadSearch(
            query,
            category,
            language,
            resolved
          ),
          fallbackSearch(
            query,
            category,
            language
          )
        ]);

        return providers.flatMap(
          result=>
          result.status==="fulfilled" &&
          Array.isArray(result.value)
          ? result.value
          : []
        );
      }
    )
  );

  return settled.flatMap(
    result=>
    result.status==="fulfilled" &&
    Array.isArray(result.value)
    ? result.value
    : []
  );
}

async function searchEverything(
  location,
  resolved,
  language,
  radius,
  category
){
  if(category){
    const direct =
    await searchCategory(
      category,
      location,
      resolved,
      language,
      true
    );

    if(category==="event"){
      direct.push(
        ...await ticketmasterEvents(
          resolved,
          radius,
          language
        )
      );
    }

    return direct;
  }

  const settled =
  await Promise.allSettled(
    CATEGORIES.map(
      type=>
      searchCategory(
        type,
        location,
        resolved,
        language,
        false
      )
    )
  );

  const results =
  settled.flatMap(
    result=>
    result.status==="fulfilled" &&
    Array.isArray(result.value)
    ? result.value
    : []
  );

  results.push(
    ...await ticketmasterEvents(
      resolved,
      radius,
      language
    )
  );

  return results;
}

function normalizeItems(
  rawItems,
  requested,
  resolved,
  coords,
  radius
){
  const output = [];

  for(const raw of rawItems){
    const url =
    stripTracking(
      safeUrl(raw.url)
    );

    if(
      !url ||
      isBlocked(url)
    ){
      continue;
    }

    const title =
    cleanText(raw.title);

    const description =
    cleanText(
      raw.description
    );

    if(
      !title ||
      title.length<5
    ){
      continue;
    }

    const classification =
    classify(
      title,
      description,
      raw.category
    );

    const lat =
    numberOrNull(
      raw.latitude ??
      raw.lat
    );

    const lng =
    numberOrNull(
      raw.longitude ??
      raw.lng
    );

    const distance =
    haversine(
      coords.latitude,
      coords.longitude,
      lat,
      lng
    );

    if(
      distance!==null &&
      distance>radius*1.25
    ){
      continue;
    }

    const locality =
    localityEvidence(
      {
        title,
        description,
        venue:raw.venue,
        address:raw.address,
        location:raw.location,
        url
      },
      requested,
      resolved
    );

    if(
      distance===null &&
      locality.matches===0 &&
      raw.localityGuaranteed!==true
    ){
      continue;
    }

    const eventStart =
    normalizeDate(
      raw.eventStart
    ) ||
    (
      classification.type==="event"
      ? parseDateFromText(
        `${title} ${description}`
      )
      : null
    );

    const item = {
      id:
      idFor(
        `${url}|${title}`
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
      "web",

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
        raw.venue ||
        localityName(
          requested,
          resolved
        ) ||
        requested
      ),

      venue:
      cleanText(
        raw.venue
      ),

      address:
      cleanText(
        raw.address
      ),

      lat,
      lng,

      distanceKm:
      distance,

      official:
      Boolean(
        raw.official
      ),

      localityGuaranteed:
      Boolean(
        raw.localityGuaranteed
      ),

      relevance:
      locality.score,

      localityMatches:
      locality.matches
    };

    if(
      fresh(item)
    ){
      output.push(item);
    }
  }

  return output;
}

function normalizeForDuplicate(value){
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

function similarity(a,b){
  const one =
  new Set(
    normalizeForDuplicate(a)
    .split(" ")
    .filter(
      word=>
      word.length>=4
    )
  );

  const two =
  new Set(
    normalizeForDuplicate(b)
    .split(" ")
    .filter(
      word=>
      word.length>=4
    )
  );

  if(
    !one.size ||
    !two.size
  ){
    return 0;
  }

  let common = 0;

  one.forEach(
    word=>{
      if(two.has(word)){
        common++;
      }
    }
  );

  return (
    common /
    Math.min(
      one.size,
      two.size
    )
  );
}

function sourceBoost(url){
  const host =
  hostname(url);

  return TRUSTED.some(
    hint=>
    host.includes(hint) ||
    String(url || "")
    .includes(hint)
  )
  ? 8
  : 0;
}

function score(item){
  let value =
  Math.min(
    item.relevance*45,
    45
  ) +
  Math.min(
    (item.localityMatches || 0)*8,
    24
  );

  if(
    item.localityGuaranteed
  ){
    value += 12;
  }

  if(item.publishedAt){
    value +=
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

  if(item.type==="event"){
    value += 12;

    const until =
    daysUntil(
      item.eventStart
    );

    if(
      until!==null &&
      until>=0
    ){
      value +=
      Math.max(
        4,
        28 -
        Math.min(
          until,
          24
        )
      );
    }
  }

  if(item.image){
    value += 7;
  }

  if(
    item.description?.length>=55
  ){
    value += 5;
  }

  if(item.official){
    value += 10;
  }

  if(
    [
      "serpapi-event",
      "serper-event",
      "ticketmaster"
    ]
    .includes(
      item.provider
    )
  ){
    value += 10;
  }else if(
    [
      "serpapi",
      "serper",
      "brave",
      "bing"
    ]
    .includes(
      item.provider
    )
  ){
    value += 5;
  }

  if(
    item.distanceKm!==null
  ){
    value +=
    Math.max(
      0,
      14 -
      Math.min(
        item.distanceKm,
        14
      )
    );
  }

  return (
    value +
    sourceBoost(
      item.url
    )
  );
}

function deduplicate(items){
  const byUrl =
  new Map();

  for(const item of items){
    const key =
    stripTracking(
      item.url
    );

    const old =
    byUrl.get(key);

    if(
      !old ||
      score(item)>score(old)
    ){
      byUrl.set(
        key,
        item
      );
    }
  }

  const sorted =
  [...byUrl.values()]
  .sort(
    (a,b)=>
    score(b)-score(a)
  );

  const output = [];

  for(const item of sorted){
    if(
      !output.some(
        old=>
        old.type===item.type &&
        similarity(
          old.title,
          item.title
        )>=.76
      )
    ){
      output.push(item);
    }
  }

  return output;
}

function balance(
  items,
  limit,
  category
){
  if(category){
    return [...items]
    .sort(
      (a,b)=>
      score(b)-score(a)
    )
    .slice(
      0,
      limit
    );
  }

  const buckets =
  Object.fromEntries(
    CATEGORIES.map(
      type=>[
        type,
        []
      ]
    )
  );

  items.forEach(
    item=>
    (
      buckets[item.type] ||
      buckets.news
    )
    .push(item)
  );

  Object.values(
    buckets
  )
  .forEach(
    bucket=>
    bucket.sort(
      (a,b)=>
      score(b)-score(a)
    )
  );

  const output = [];

  let progress = true;

  while(
    output.length<limit &&
    progress
  ){
    progress = false;

    for(const type of CATEGORIES){
      for(
        let i=0;
        i<(WEIGHTS[type] || 1) &&
        output.length<limit;
        i++
      ){
        const next =
        buckets[type]
        .shift();

        if(next){
          output.push(next);
          progress = true;
        }
      }
    }
  }

  return output;
}

function counts(items){
  const result = {
    all:items.length,
    lost:0,
    seen:0,
    found:0,
    event:0,
    help:0,
    volunteers:0,
    foster:0,
    adoption:0,
    news:0
  };

  items.forEach(
    item=>{
      if(
        Object.prototype
        .hasOwnProperty
        .call(
          result,
          item.type
        )
      ){
        result[item.type]++;
      }
    }
  );

  return result;
}

const DEEPL_CODES = {
  en:"EN",
  uk:"UK",
  ru:"RU",
  fr:"FR",
  de:"DE",
  es:"ES",
  it:"IT",
  pt:"PT-PT",
  nl:"NL",
  pl:"PL",
  cs:"CS",
  sk:"SK",
  hu:"HU",
  ro:"RO",
  bg:"BG",
  el:"EL",
  sv:"SV",
  da:"DA",
  no:"NB",
  fi:"FI",
  tr:"TR"
};

async function translateItems(
  items,
  language
){
  const key =
  process.env.DEEPL_API_KEY;

  const target =
  DEEPL_CODES[language];

  if(
    language==="en" ||
    !key ||
    !target ||
    !items.length
  ){
    return items;
  }

  const selected =
  items.slice(0,24);

  const body =
  new URLSearchParams();

  selected.forEach(
    item=>{
      body.append(
        "text",
        item.title
      );

      body.append(
        "text",
        item.description
      );
    }
  );

  body.append(
    "target_lang",
    target
  );

  const endpoint =
  key.endsWith(":fx")
  ? "https://api-free.deepl.com/v2/translate"
  : "https://api.deepl.com/v2/translate";

  try{
    const response =
    await fetchTimeout(
      endpoint,
      {
        method:"POST",
        headers:{
          Authorization:
          "DeepL-Auth-Key " +
          key,

          "Content-Type":
          "application/x-www-form-urlencoded"
        },
        body:
        body.toString()
      },
      7000
    );

    if(!response.ok){
      return items;
    }

    const data =
    await response.json();

    if(
      !Array.isArray(
        data.translations
      ) ||
      data.translations.length !==
      selected.length*2
    ){
      return items;
    }

    let index = 0;

    const map =
    new Map();

    selected.forEach(
      item=>
      map.set(
        item.id,
        {
          title:
          cleanText(
            data.translations[index++].text
          ),

          description:
          cleanText(
            data.translations[index++].text
          )
        }
      )
    );

    return items.map(
      item=>{
        const translated =
        map.get(
          item.id
        );

        return translated
        ? {
          ...item,

          originalTitle:
          item.title,

          originalDescription:
          item.description,

          title:
          translated.title ||
          item.title,

          description:
          translated.description ||
          item.description,

          translated:true
        }
        : item;
      }
    );

  }catch{
    return items;
  }
}

function eventStatus(value){
  const diff =
  daysUntil(value);

  if(diff===null){
    return null;
  }

  if(diff<-1){
    return "past";
  }

  if(diff<1){
    return "today";
  }

  if(diff<2){
    return "tomorrow";
  }

  if(diff<=7){
    return "this_week";
  }

  return "upcoming";
}

function providerStatus(){
  return {
    serpApi:
    Boolean(
      process.env.SERPAPI_API_KEY ||
      process.env.SERPAPI_KEY
    ),

    serper:
    Boolean(
      process.env.SERPER_API_KEY
    ),

    brave:
    Boolean(
      process.env.BRAVE_SEARCH_API_KEY
    ),

    bing:
    Boolean(
      process.env.BING_SEARCH_API_KEY
    ),

    gdelt:true,

    googleNews:true,

    newsApi:
    Boolean(
      process.env.NEWSAPI_API_KEY
    ),

    ticketmaster:
    Boolean(
      process.env.TICKETMASTER_API_KEY
    ),

    deepl:
    Boolean(
      process.env.DEEPL_API_KEY
    )
  };
}

function publicItem(
  item,
  coords
){
  return {
    id:item.id,

    type:item.type,

    status:item.status,

    eventStatus:
    item.type==="event"
    ? eventStatus(
      item.eventStart
    )
    : null,

    title:item.title,

    description:
    item.description,

    originalTitle:
    item.originalTitle ||
    null,

    originalDescription:
    item.originalDescription ||
    null,

    translated:
    Boolean(
      item.translated
    ),

    url:item.url,

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
      coords.latitude
    )
    ? coords.latitude
    : null,

    searchLng:
    Number.isFinite(
      coords.longitude
    )
    ? coords.longitude
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
    Boolean(
      item.official
    ),

    isLive:true
  };
}

function sendJson(
  res,
  status,
  payload
){
  res.statusCode =
  status;

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600`
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
    JSON.stringify(payload)
  );
}

module.exports =
async function handler(
  req,
  res
){
  if(req.method==="OPTIONS"){
    res.statusCode = 204;

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

  if(req.method!=="GET"){
    sendJson(
      res,
      405,
      {
        ok:false,
        error:"Method not allowed"
      }
    );

    return;
  }

  const startedAt =
  Date.now();

  const params =
  readQuery(req);

  const error =
  validate(params);

  if(error){
    sendJson(
      res,
      400,
      {
        ok:false,
        error
      }
    );

    return;
  }

  try{
    let resolved = null;

    let lat =
    Number.isFinite(
      params.latitude
    )
    ? params.latitude
    : null;

    let lng =
    Number.isFinite(
      params.longitude
    )
    ? params.longitude
    : null;

    let location =
    params.location;

    if(
      Number.isFinite(
        params.latitude
      ) &&
      Number.isFinite(
        params.longitude
      )
    ){
      resolved =
      await reverseLocation(
        params.latitude,
        params.longitude,
        params.language
      );

      if(!location){
        location =
        resolved?.name ||
        resolved?.displayName ||
        "";
      }

    }else{
      resolved =
      await forwardLocation(
        location,
        params.language
      );

      if(resolved){
        lat =
        resolved.latitude;

        lng =
        resolved.longitude;
      }
    }

    if(!location){
      sendJson(
        res,
        400,
        {
          ok:false,
          error:
          "Could not resolve location"
        }
      );

      return;
    }

    const raw =
    await searchEverything(
      location,
      resolved,
      params.language,
      params.radius,
      params.category
    );

    let items =
    normalizeItems(
      raw,
      location,
      resolved,
      {
        latitude:lat,
        longitude:lng
      },
      params.radius
    );

    items =
    deduplicate(items);

    if(params.category){
      items =
      items.filter(
        item=>
        item.type===
        params.category
      );
    }

    const allCounts =
    counts(items);

    items =
    balance(
      items,
      params.limit,
      params.category
    );

    items =
    await translateItems(
      items,
      params.language
    );

    sendJson(
      res,
      200,
      {
        ok:true,

        live:true,

        generatedAt:
        new Date()
        .toISOString(),

        tookMs:
        Date.now() -
        startedAt,

        query:{
          location:
          cleanText(location),

          canonicalLocation:
          cleanText(
            resolved?.name ||
            location
          ),

          lat,
          lng,

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

        resolvedLocation:
        resolved,

        providers:
        providerStatus(),

        counts:
        allCounts,

        items:
        items.map(
          item=>
          publicItem(
            item,
            {
              latitude:lat,
              longitude:lng
            }
          )
        )
      }
    );

  }catch(error){
    console.error(
      "PETS & DOGUE Community Discovery error:",
      error
    );

    sendJson(
      res,
      500,
      {
        ok:false,

        live:false,

        generatedAt:
        new Date()
        .toISOString(),

        error:
        "Community discovery temporarily unavailable",

        providers:
        providerStatus(),

        counts:{
          all:0,
          lost:0,
          seen:0,
          found:0,
          event:0,
          help:0,
          volunteers:0,
          foster:0,
          adoption:0,
          news:0
        },

        items:[]
      }
    );
  }
};
