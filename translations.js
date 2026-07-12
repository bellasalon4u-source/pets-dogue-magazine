(function () {
"use strict";

/* =========================================================
   PETS & DOGUE — GLOBAL AUTOMATIC TRANSLATION SYSTEM

   Uses:
   POST /api/translate

   Request:
   {
     sourceLanguage: "en",
     targetLanguage: "ru",
     texts: ["Text one", "Text two"]
   }
========================================================= */

const PD_LANGUAGE_KEY = "pets_dogue_language";
const PD_CACHE_KEY = "pets_dogue_translation_cache_v4";
const PD_SOURCE_LANGUAGE = "en";
const PD_API_ENDPOINT = "/api/translate";

const PD_MAX_CACHE_ITEMS_PER_LANGUAGE = 3000;
const PD_BATCH_SIZE = 60;
const PD_TRANSLATION_DELAY = 250;

const PD_LANGUAGES = [
{
code: "en",
label: "English",
short: "EN",
flag: "🇬🇧",
direction: "ltr",
speech: "en-GB"
},
{
code: "ru",
label: "Русский",
short: "RU",
flag: "🇷🇺",
direction: "ltr",
speech: "ru-RU"
},
{
code: "uk",
label: "Українська",
short: "UA",
flag: "🇺🇦",
direction: "ltr",
speech: "uk-UA"
},
{
code: "cs",
label: "Čeština",
short: "CZ",
flag: "🇨🇿",
direction: "ltr",
speech: "cs-CZ"
},
{
code: "pl",
label: "Polski",
short: "PL",
flag: "🇵🇱",
direction: "ltr",
speech: "pl-PL"
},
{
code: "es",
label: "Español",
short: "ES",
flag: "🇪🇸",
direction: "ltr",
speech: "es-ES"
},
{
code: "it",
label: "Italiano",
short: "IT",
flag: "🇮🇹",
direction: "ltr",
speech: "it-IT"
},
{
code: "de",
label: "Deutsch",
short: "DE",
flag: "🇩🇪",
direction: "ltr",
speech: "de-DE"
},
{
code: "ar",
label: "العربية",
short: "AR",
flag: "🇸🇦",
direction: "rtl",
speech: "ar-SA"
},
{
code: "hi",
label: "हिन्दी",
short: "HI",
flag: "🇮🇳",
direction: "ltr",
speech: "hi-IN"
}
];

/* =========================================================
   STATE
========================================================= */

let selectedLanguage =
readStoredLanguage() ||
detectBrowserLanguage();

let translationCache =
readTranslationCache();

let contentObserver = null;
let translationTimer = null;
let translationRequestId = 0;
let isApplyingTranslation = false;
let interfaceCreated = false;

/*
Original English values are stored here so that switching
between languages never translates an already translated phrase.
*/

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();

/* =========================================================
   LANGUAGE HELPERS
========================================================= */

function getLanguage(languageCode) {
return (
PD_LANGUAGES.find(language =>
language.code === languageCode
) ||
PD_LANGUAGES[0]
);
}

function readStoredLanguage() {
try {
const storedLanguage =
localStorage.getItem(PD_LANGUAGE_KEY);

const validLanguage =
PD_LANGUAGES.some(language =>
language.code === storedLanguage
);

return validLanguage
? storedLanguage
: "";
} catch (error) {
console.warn(
"PETS & DOGUE: unable to read saved language.",
error
);

return "";
}
}

function storeLanguage(languageCode) {
try {
localStorage.setItem(
PD_LANGUAGE_KEY,
languageCode
);
} catch (error) {
console.warn(
"PETS & DOGUE: unable to save language.",
error
);
}
}

function detectBrowserLanguage() {
const browserLanguage =
String(
navigator.language ||
navigator.userLanguage ||
PD_SOURCE_LANGUAGE
)
.toLowerCase();

const match =
PD_LANGUAGES.find(language =>
browserLanguage === language.code ||
browserLanguage.startsWith(
language.code + "-"
)
);

return match
? match.code
: PD_SOURCE_LANGUAGE;
}

function normalizeText(value) {
return String(value || "")
.replace(/\s+/g, " ")
.trim();
}

function isUsefulText(value) {
const text =
normalizeText(value);

if(!text) {
return false;
}

if(text.length < 2) {
return false;
}

/*
Ignore values made only from numbers, punctuation,
currency symbols, arrows, stars or emojis.
*/

if(
/^[\d\s.,:;!?+\-–—()%£$€¥₹#@/\\|❤️⭐★☆→←↑↓×■●○✓✔︎]+$/u.test(
text
)
) {
return false;
}

return true;
}

/* =========================================================
   REMOVE OLD GOOGLE TRANSLATE STATE
========================================================= */

function removeCookie(name, domain) {
let cookie =
`${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;

if(domain) {
cookie += `;domain=${domain}`;
}

document.cookie = cookie;
}

function removeOldGoogleTranslation() {
const hostname =
window.location.hostname;

removeCookie("googtrans", "");

if(
hostname &&
hostname !== "localhost" &&
hostname !== "127.0.0.1"
) {
removeCookie("googtrans", hostname);
removeCookie("googtrans", "." +
