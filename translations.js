(function () {
"use strict";

/* =========================================================
   PETS & DOGUE — GLOBAL MULTILINGUAL SYSTEM

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
const PD_CACHE_KEY = "pets_dogue_translation_cache_v5";
const PD_SOURCE_LANGUAGE = "en";
const PD_API_ENDPOINT = "/api/translate";

const PD_BATCH_MAX_ITEMS = 40;
const PD_BATCH_MAX_CHARACTERS = 18000;
const PD_TRANSLATION_DELAY = 350;

const PD_LANGUAGES = [
{
code:"en",
label:"English",
short:"EN",
flag:"🇬🇧",
direction:"ltr",
speech:"en-GB"
},
{
code:"ru",
label:"Русский",
short:"RU",
flag:"🇷🇺",
direction:"ltr",
speech:"ru-RU"
},
{
code:"uk",
label:"Українська",
short:"UA",
flag:"🇺🇦",
direction:"ltr",
speech:"uk-UA"
},
{
code:"cs",
label:"Čeština",
short:"CZ",
flag:"🇨🇿",
direction:"ltr",
speech:"cs-CZ"
},
{
code:"pl",
label:"Polski",
short:"PL",
flag:"🇵🇱",
direction:"ltr",
speech:"pl-PL"
},
{
code:"es",
label:"Español",
short:"ES",
flag:"🇪🇸",
direction:"ltr",
speech:"es-ES"
},
{
code:"it",
label:"Italiano",
short:"IT",
flag:"🇮🇹",
direction:"ltr",
speech:"it-IT"
},
{
code:"de",
label:"Deutsch",
short:"DE",
flag:"🇩🇪",
direction:"ltr",
speech:"de-DE"
},
{
code:"ar",
label:"العربية",
short:"AR",
flag:"🇸🇦",
direction:"rtl",
speech:"ar-SA"
},
{
code:"hi",
label:"हिन्दी",
short:"HI",
flag:"🇮🇳",
direction:"ltr",
speech:"hi-IN"
}
];

const PD_INTERFACE_TEXT = {
en:{
choose:"Choose Your Language",
intro:"Choose a language for PETS & DOGUE. Your selection will stay active across every page.",
close:"Close language menu",
translating:"Translating…",
error:"Translation is temporarily unavailable."
},
ru:{
choose:"Выберите язык",
intro:"Выберите язык PETS & DOGUE. Он останется активным на всех страницах.",
close:"Закрыть выбор языка",
translating:"Переводим…",
error:"Перевод временно недоступен."
},
uk:{
choose:"Оберіть мову",
intro:"Оберіть мову PETS & DOGUE. Вона залишатиметься активною на всіх сторінках.",
close:"Закрити вибір мови",
translating:"Перекладаємо…",
error:"Переклад тимчасово недоступний."
},
cs:{
choose:"Vyberte jazyk",
intro:"Vyberte jazyk PETS & DOGUE. Zůstane aktivní na všech stránkách.",
close:"Zavřít výběr jazyka",
translating:"Překládáme…",
error:"Překlad je dočasně nedostupný."
},
pl:{
choose:"Wybierz język",
intro:"Wybierz język PETS & DOGUE. Pozostanie aktywny na wszystkich stronach.",
close:"Zamknij wybór języka",
translating:"Tłumaczenie…",
error:"Tłumaczenie jest chwilowo niedostępne."
},
es:{
choose:"Elige tu idioma",
intro:"Elige un idioma para PETS & DOGUE. Permanecerá activo en todas las páginas.",
close:"Cerrar selector de idioma",
translating:"Traduciendo…",
error:"La traducción no está disponible temporalmente."
},
it:{
choose:"Scegli la lingua",
intro:"Scegli una lingua per PETS & DOGUE. Rimarrà attiva su tutte le pagine.",
close:"Chiudi selezione lingua",
translating:"Traduzione…",
error:"La traduzione non è momentaneamente disponibile."
},
de:{
choose:"Sprache auswählen",
intro:"Wählen Sie eine Sprache für PETS & DOGUE. Sie bleibt auf allen Seiten aktiv.",
close:"Sprachauswahl schließen",
translating:"Übersetzung…",
error:"Die Übersetzung ist vorübergehend nicht verfügbar."
},
ar:{
choose:"اختر لغتك",
intro:"اختر لغة PETS & DOGUE. ستبقى مفعلة في جميع الصفحات.",
close:"إغلاق قائمة اللغات",
translating:"جارٍ الترجمة…",
error:"الترجمة غير متاحة مؤقتًا."
},
hi:{
choose:"अपनी भाषा चुनें",
intro:"PETS & DOGUE के लिए भाषा चुनें। यह सभी पृष्ठों पर सक्रिय रहेगी।",
close:"भाषा मेनू बंद करें",
translating:"अनुवाद हो रहा है…",
error:"अनुवाद अस्थायी रूप से उपलब्ध नहीं है।"
}
];

const PD_EXCLUDED_TAGS = new Set([
"SCRIPT",
"STYLE",
"NOSCRIPT",
"CODE",
"PRE",
"SVG",
"PATH",
"IFRAME",
"CANVAS",
"VIDEO",
"AUDIO"
]);

const PD_TRANSLATABLE_ATTRIBUTES = [
"placeholder",
"title",
"aria-label",
"alt"
];

const PD_PROTECTED_EXACT_TEXTS = new Set([
"PETS & DOGUE",
"PETS &amp; DOGUE",
"DOGUE",
"pets &",
"Miso",
"DOGUE Trust",
"DOGUE Verified"
]);

let selectedLanguage =
readStoredLanguage() ||
detectBrowserLanguage();

let translationCache =
readTranslationCache();

let contentObserver = null;
let translationTimer = null;
let translationRequestNumber = 0;
let translationRunning = false;
let languageInterfaceCreated = false;

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

function getInterfaceText() {
return (
PD_INTERFACE_TEXT[selectedLanguage] ||
PD_INTERFACE_TEXT.en
);
}

function readStoredLanguage() {
try {
const stored =
localStorage.getItem(PD_LANGUAGE_KEY);

const isValid =
PD_LANGUAGES.some(language =>
language.code === stored
);

return isValid
? stored
: "";
} catch(error) {
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
} catch(error) {
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
.replace(/\s+/g," ")
.trim();
}

function containsLetters(value) {
const text =
String(value || "");

try {
return /\p{L}/u.test(text);
} catch(error) {
return /[A-Za-zА-Яа-яЁёІіЇїЄє]/.test(text);
}
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

if(!containsLetters(text)) {
return false;
}

if(
PD_PROTECTED_EXACT_TEXTS.has(text)
) {
return false;
}

if(
/^(https?:\/\/|mailto:|tel:|javascript:)/i.test(text)
) {
return false;
}

return true;
}

/* =========================================================
   REMOVE OLD GOOGLE TRANSLATE
========================================================= */

function removeCookie(name,domain) {
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

removeCookie("googtrans","");

if(
hostname &&
hostname !== "localhost" &&
hostname !== "127.0.0.1"
) {
removeCookie(
"googtrans",
hostname
);

removeCookie(
"googtrans",
"." + hostname
);
}

try {
localStorage.removeItem("googtrans");
sessionStorage.removeItem("googtrans");
} catch(error) {
console.warn(error);
}

document
.querySelectorAll(
[
"#google_translate_element",
".goog-te-banner-frame",
"iframe.goog-te-banner-frame",
".goog-te-balloon-frame",
".goog-te-menu-frame",
"body > .skiptranslate"
].join(",")
)
.forEach(element => {
element.remove();
});

document.documentElement.style.setProperty(
"top",
"0",
"important"
);

document.documentElement.style.setProperty(
"margin-top",
"0",
"important"
);

if(document.body) {
document.body.style.setProperty(
"top",
"0",
"important"
);

document.body.style.setProperty(
"margin-top",
"0",
"important"
);
}
}

/* =========================================================
   CACHE
========================================================= */

function readTranslationCache() {
try {
const saved =
JSON.parse(
localStorage.getItem(PD_CACHE_KEY) ||
"{}"
);

if(
saved &&
typeof saved === "object" &&
!Array.isArray(saved)
) {
return saved;
}

return {};
} catch(error) {
return {};
}
}

function saveTranslationCache() {
try {
Object.keys(translationCache)
.forEach(languageCode => {
const entries =
Object.entries(
translationCache[languageCode] ||
{}
);

if(entries.length > 2500) {
translationCache[languageCode] =
Object.fromEntries(
entries.slice(-1800)
);
}
});

localStorage.setItem(
PD_CACHE_KEY,
JSON.stringify(translationCache)
);
} catch(error) {
console.warn(
"PETS & DOGUE: translation cache could not be saved.",
error
);
}
}

function createTextKey(text) {
let hash = 2166136261;

for(
let index = 0;
index < text.length;
index++
) {
hash ^= text.charCodeAt(index);
hash = Math.imul(hash,16777619);
}

return (
(hash >>> 0).toString(36) +
"_" +
text.length
);
}

function getCachedTranslation(
languageCode,
originalText
) {
const languageCache =
translationCache[languageCode] ||
{};

const key =
createTextKey(originalText);

const item =
languageCache[key];

if(
item &&
item.original === originalText &&
typeof item.translation === "string"
) {
return item.translation;
}

return "";
}

function setCachedTranslation(
languageCode,
originalText,
translatedText
) {
if(!translationCache[languageCode]) {
translationCache[languageCode] = {};
}

const key =
createTextKey(originalText);

translationCache[languageCode][key] = {
original:originalText,
translation:translatedText
};
}

/* =========================================================
   DOCUMENT LANGUAGE
========================================================= */

function applyDocumentLanguage() {
const language =
getLanguage(selectedLanguage);

document.documentElement.lang =
language.code;

document.documentElement.dir =
language.direction;

if(document.body) {
document.body.classList.toggle(
"pd-rtl",
language.direction === "rtl"
);
}
}

/* =========================================================
   BRAND PROTECTION
========================================================= */

function protectElement(element) {
if(!element) {
return;
}

element.classList.add("notranslate");

element.setAttribute(
"translate",
"no"
);

element.setAttribute(
"data-pd-no-translate",
"true"
);
}

function protectBrandElements(root = document) {
if(
!root ||
!root.querySelectorAll
) {
return;
}

root
.querySelectorAll(
[
".brand",
".brand-small",
".brand-big",
".logo-small",
".logo-big",
".footer-brand",
"[data-pd-brand]",
".notranslate",
'[translate="no"]',
"[data-pd-no-translate]"
].join(",")
)
.forEach(protectElement);

root
.querySelectorAll("*")
.forEach(element => {
if(element.children.length !== 0) {
return;
}

const text =
normalizeText(
element.textContent
);

if(
PD_PROTECTED_EXACT_TEXTS.has(text)
) {
protectElement(element);
}
});
}

function isProtectedElement(element) {
if(!element) {
return true;
}

if(
PD_EXCLUDED_TAGS.has(
element.tagName
)
) {
return true;
}

return Boolean(
element.closest(
[
"script",
"style",
"noscript",
"code",
"pre",
"svg",
"iframe",
"canvas",
"#pd-language-button",
"#pd-language-overlay",
"#pd-translation-status",
".notranslate",
'[translate="no"]',
"[data-pd-no-translate]",
"[data-pd-brand]"
].join(",")
)
);
}

/* =========================================================
   ORIGINAL CONTENT
========================================================= */

function rememberTextNode(node) {
if(!originalTextNodes.has(node)) {
originalTextNodes.set(
node,
node.nodeValue
);
}
}

function getOriginalText(node) {
rememberTextNode(node);

return (
originalTextNodes.get(node) ||
""
);
}

function rememberAttribute(
element,
attributeName
) {
let attributes =
originalAttributes.get(element);

if(!attributes) {
attributes = {};
originalAttributes.set(
element,
attributes
);
}

if(
attributes[attributeName] === undefined
) {
attributes[attributeName] =
element.getAttribute(attributeName) ||
"";
}
}

function getOriginalAttribute(
element,
attributeName
) {
rememberAttribute(
element,
attributeName
);

const attributes =
originalAttributes.get(element);

return (
attributes?.[attributeName] ||
""
);
}

function rememberPageMetadata() {
if(
document.documentElement.dataset
.pdOriginalTitle === undefined
) {
document.documentElement.dataset
.pdOriginalTitle =
document.title || "";
}

document
.querySelectorAll(
[
'meta[name="description"]',
'meta[property="og:title"]',
'meta[property="og:description"]',
'meta[name="twitter:title"]',
'meta[name="twitter:description"]'
].join(",")
)
.forEach(meta => {
if(
meta.dataset.pdOriginalContent === undefined
) {
meta.dataset.pdOriginalContent =
meta.getAttribute("content") ||
"";
}
});
}

/* =========================================================
   RESTORE ENGLISH
========================================================= */

function restoreOriginalContent(root = document.body) {
if(!root) {
return;
}

const walker =
document.createTreeWalker(
root,
NodeFilter.SHOW_TEXT
);

while(walker.nextNode()) {
const node =
walker.currentNode;

if(originalTextNodes.has(node)) {
node.nodeValue =
originalTextNodes.get(node);
}
}

const elements = [];

if(root.nodeType === Node.ELEMENT_NODE) {
elements.push(root);
}

if(root.querySelectorAll) {
elements.push(
...root.querySelectorAll("*")
);
}

elements.forEach(element => {
const attributes =
originalAttributes.get(element);

if(!attributes) {
return;
}

Object.entries(attributes)
.forEach(
([attributeName,value]) => {
element.setAttribute(
attributeName,
value
);
}
);
});

const originalTitle =
document.documentElement.dataset
.pdOriginalTitle;

if(originalTitle !== undefined) {
document.title =
originalTitle;
}

document
.querySelectorAll(
[
'meta[name="description"]',
'meta[property="og:title"]',
'meta[property="og:description"]',
'meta[name="twitter:title"]',
'meta[name="twitter:description"]'
].join(",")
)
.forEach(meta => {
if(
meta.dataset.pdOriginalContent !== undefined
) {
meta.setAttribute(
"content",
meta.dataset.pdOriginalContent
);
}
});
}

/* =========================================================
   COLLECT CONTENT
========================================================= */

function collectTextItems(root) {
const items = [];

if(!root) {
return items;
}

const walker =
document.createTreeWalker(
root,
NodeFilter.SHOW_TEXT,
{
acceptNode(node) {
const parent =
node.parentElement;

if(
!parent ||
isProtectedElement(parent)
) {
return NodeFilter.FILTER_REJECT;
}

const original =
getOriginalText(node);

if(!isUsefulText(original)) {
return NodeFilter.FILTER_REJECT;
}

return NodeFilter.FILTER_ACCEPT;
}
}
);

while(walker.nextNode()) {
const node =
walker.currentNode;

const original =
getOriginalText(node);

items.push({
type:"text",
node,
original,
requestText:normalizeText(original)
});
}

return items;
}

function collectAttributeItems(root) {
const items = [];

if(
!root ||
!root.querySelectorAll
) {
return items;
}

const elements = [];

if(root.nodeType === Node.ELEMENT_NODE) {
elements.push(root);
}

elements.push(
...root.querySelectorAll("*")
);

elements.forEach(element => {
if(isProtectedElement(element)) {
return;
}

PD_TRANSLATABLE_ATTRIBUTES
.forEach(attributeName => {
if(
!element.hasAttribute(attributeName)
) {
return;
}

const original =
getOriginalAttribute(
element,
attributeName
);

if(!isUsefulText(original)) {
return;
}

items.push({
type:"attribute",
element,
attributeName,
original,
requestText:normalizeText(original)
});
});

if(
element.tagName === "INPUT" &&
["button","submit","reset"].includes(
String(element.type || "")
.toLowerCase()
)
) {
rememberAttribute(
element,
"value"
);

const original =
getOriginalAttribute(
element,
"value"
);

if(isUsefulText(original)) {
items.push({
type:"attribute",
element,
attributeName:"value",
original,
requestText:normalizeText(original)
});
}
}
});

return items;
}

function collectMetadataItems() {
const items = [];

rememberPageMetadata();

const originalTitle =
document.documentElement.dataset
.pdOriginalTitle ||
"";

if(isUsefulText(originalTitle)) {
items.push({
type:"document-title",
original:originalTitle,
requestText:normalizeText(originalTitle)
});
}

document
.querySelectorAll(
[
'meta[name="description"]',
'meta[property="og:title"]',
'meta[property="og:description"]',
'meta[name="twitter:title"]',
'meta[name="twitter:description"]'
].join(",")
)
.forEach(meta => {
const original =
meta.dataset.pdOriginalContent ||
"";

if(!isUsefulText(original)) {
return;
}

items.push({
type:"meta",
element:meta,
original,
requestText:normalizeText(original)
});
});

return items;
}

function collectAllItems(root) {
return [
...collectTextItems(root),
...collectAttributeItems(root),
...collectMetadataItems()
];
}

/* =========================================================
   API REQUESTS
========================================================= */

function createBatches(texts) {
const batches = [];

let currentBatch = [];
let currentCharacters = 0;

texts.forEach(text => {
const length =
text.length;

if(
currentBatch.length >=
PD_BATCH_MAX_ITEMS ||
(
currentBatch.length > 0 &&
currentCharacters + length >
PD_BATCH_MAX_CHARACTERS
)
) {
batches.push(currentBatch);
currentBatch = [];
currentCharacters = 0;
}

currentBatch.push(text);
currentCharacters += length;
});

if(currentBatch.length > 0) {
batches.push(currentBatch);
}

return batches;
}

async function requestTranslationBatch(
texts,
targetLanguage
) {
const response =
await fetch(
PD_API_ENDPOINT,
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
sourceLanguage:
PD_SOURCE_LANGUAGE,

targetLanguage,

texts
})
}
);

let data;

try {
data =
await response.json();
} catch(error) {
throw new Error(
"Invalid translation server response."
);
}

if(!response.ok) {
throw new Error(
data?.error ||
`Translation failed (${response.status}).`
);
}

if(
!Array.isArray(data.translations)
) {
throw new Error(
"No translations were returned."
);
}

if(
data.translations.length !==
texts.length
) {
throw new Error(
"Incorrect translation response length."
);
}

return data.translations;
}

async function getTranslations(
requestedTexts,
targetLanguage
) {
const uniqueTexts =
[...new Set(requestedTexts)];

const translations =
new Map();

const missingTexts = [];

uniqueTexts.forEach(originalText => {
const cached =
getCachedTranslation(
targetLanguage,
originalText
);

if(cached) {
translations.set(
originalText,
cached
);
} else {
missingTexts.push(
originalText
);
}
});

const batches =
createBatches(missingTexts);

for(const batch of batches) {
const translatedBatch =
await requestTranslationBatch(
batch,
targetLanguage
);

batch.forEach(
(originalText,index) => {
const translatedText =
String(
translatedBatch[index] ||
originalText
);

translations.set(
originalText,
translatedText
);

setCachedTranslation(
targetLanguage,
originalText,
translatedText
);
}
);

saveTranslationCache();
}

return translations;
}

/* =========================================================
   APPLY TRANSLATIONS
========================================================= */

function preserveWhitespace(
original,
translated
) {
const leading =
original.match(/^\s*/)?.[0] ||
"";

const trailing =
original.match(/\s*$/)?.[0] ||
"";

return (
leading +
translated +
trailing
);
}

function applyTranslatedItem(
item,
translatedText
) {
if(
typeof translatedText !== "string" ||
!translatedText.trim()
) {
return;
}

switch(item.type) {
case "text":
item.node.nodeValue =
preserveWhitespace(
item.original,
translatedText
);
break;

case "attribute":
item.element.setAttribute(
item.attributeName,
translatedText
);
break;

case "document-title":
document.title =
translatedText;
break;

case "meta":
item.element.setAttribute(
"content",
translatedText
);
break;
}
}

/* =========================================================
   TRANSLATION STATUS
========================================================= */

function createTranslationStatus() {
if(
document.getElementById(
"pd-translation-status"
)
) {
return;
}

const status =
document.createElement("div");

status.id =
"pd-translation-status";

status.className =
"notranslate";

status.setAttribute(
"translate",
"no"
);

status.setAttribute(
"data-pd-no-translate",
"true"
);

status.innerHTML = `
<span class="pd-status-spinner"></span>
<span class="pd-status-text"></span>
`;

document.body.appendChild(status);
}

function showTranslationStatus(message) {
const status =
document.getElementById(
"pd-translation-status"
);

if(!status) {
return;
}

const label =
status.querySelector(
".pd-status-text"
);

if(label) {
label.textContent =
message;
}

status.classList.add(
"pd-visible"
);
}

function hideTranslationStatus() {
document
.getElementById(
"pd-translation-status"
)
?.classList.remove(
"pd-visible"
);
}

/* =========================================================
   TRANSLATE PAGE
========================================================= */

async function translatePage(
root = document.body
) {
if(
!root ||
translationRunning
) {
return;
}

const requestNumber =
++translationRequestNumber;

const language =
getLanguage(selectedLanguage);

applyDocumentLanguage();
updateLanguageInterface();
protectBrandElements(root);
rememberPageMetadata();

if(
language.code ===
PD_SOURCE_LANGUAGE
) {
translationRunning = true;

restoreOriginalContent(root);

translationRunning = false;

hideTranslationStatus();

return;
}

translationRunning = true;

showTranslationStatus(
getInterfaceText().translating
);

try {
const items =
collectAllItems(root);

if(items.length === 0) {
return;
}

const requestedTexts =
items.map(item =>
item.requestText
);

const translations =
await getTranslations(
requestedTexts,
language.code
);

if(
requestNumber !==
translationRequestNumber ||
language.code !==
selectedLanguage
) {
return;
}

items.forEach(item => {
const translated =
translations.get(
item.requestText
);

if(translated) {
applyTranslatedItem(
item,
translated
);
}
});
} catch(error) {
console.error(
"PETS & DOGUE translation error:",
error
);

showTranslationStatus(
getInterfaceText().error
);

setTimeout(
hideTranslationStatus,
4500
);

return;
} finally {
translationRunning = false;
}

setTimeout(
hideTranslationStatus,
250
);
}

/* =========================================================
   STYLES
========================================================= */

function createStyles() {
if(
document.getElementById(
"pd-language-styles"
)
) {
return;
}

const style =
document.createElement("style");

style.id =
"pd-language-styles";

style.textContent = `
#pd-language-button{
position:fixed;
right:16px;
bottom:16px;
z-index:2147483000;
display:flex;
align-items:center;
justify-content:center;
gap:9px;
min-width:104px;
height:56px;
padding:0 18px;
border:3px solid #111;
border-radius:999px;
background:#fff;
color:#111;
font-family:Arial,Helvetica,sans-serif;
font-size:16px;
font-weight:900;
letter-spacing:.5px;
cursor:pointer;
box-shadow:0 14px 38px rgba(0,0,0,.28);
transition:
transform .2s ease,
box-shadow .2s ease,
background .2s ease;
}

#pd-language-button:hover{
transform:translateY(-3px);
background:#fff8df;
box-shadow:0 18px 44px rgba(0,0,0,.34);
}

#pd-language-button .pd-language-globe{
font-size:23px;
line-height:1;
}

#pd-language-overlay{
position:fixed;
inset:0;
z-index:2147483001;
display:none;
align-items:center;
justify-content:center;
padding:18px;
background:rgba(0,0,0,.78);
backdrop-filter:blur(8px);
-webkit-backdrop-filter:blur(8px);
}

#pd-language-overlay.pd-open{
display:flex;
}

#pd-language-modal{
width:min(680px,100%);
max-height:88vh;
overflow-y:auto;
background:#f8f7f3;
border:3px solid #111;
border-radius:34px;
box-shadow:0 30px 90px rgba(0,0,0,.44);
}

.pd-language-header{
position:sticky;
top:0;
z-index:2;
display:flex;
align-items:center;
justify-content:space-between;
gap:20px;
padding:24px;
background:#111;
color:#fff;
}

.pd-language-header h2{
margin:0;
font-family:Georgia,serif;
font-size:32px;
font-weight:normal;
}

.pd-language-close{
width:44px;
height:44px;
flex:0 0 44px;
border:none;
border-radius:50%;
background:#fff;
color:#111;
font-size:25px;
cursor:pointer;
}

.pd-language-intro{
padding:23px 24px 7px;
color:#555;
font-size:15px;
line-height:1.65;
}

#pd-language-grid{
display:grid;
grid-template-columns:repeat(2,minmax(0,1fr));
gap:11px;
padding:18px 24px 26px;
}

.pd-language-option{
display:flex;
align-items:center;
gap:13px;
min-height:72px;
padding:14px 16px;
border:2px solid #111;
border-radius:20px;
background:#fff;
color:#111;
text-align:left;
cursor:pointer;
transition:
transform .2s ease,
background .2s ease;
}

.pd-language-option:hover{
transform:translateY(-2px);
background:#fff8df;
}

.pd-language-option.pd-active{
background:#65e51f;
}

.pd-language-flag{
font-size:28px;
}

.pd-language-name{
display:block;
font-size:16px;
font-weight:900;
}

.pd-language-code{
display:block;
margin-top:3px;
font-size:11px;
color:#666;
letter-spacing:1px;
}

#pd-translation-status{
position:fixed;
left:50%;
bottom:24px;
z-index:2147482999;
display:flex;
align-items:center;
gap:10px;
max-width:calc(100% - 150px);
padding:12px 18px;
border:2px solid #111;
border-radius:999px;
background:#111;
color:#fff;
font-family:Arial,Helvetica,sans-serif;
font-size:13px;
font-weight:bold;
box-shadow:0 10px 30px rgba(0,0,0,.24);
opacity:0;
visibility:hidden;
transform:translate(-50%,15px);
transition:
opacity .2s ease,
transform .2s ease,
visibility .2s ease;
}

#pd-translation-status.pd-visible{
opacity:1;
visibility:visible;
transform:translate(-50%,0);
}

.pd-status-spinner{
width:16px;
height:16px;
flex:0 0 16px;
border:2px solid rgba(255,255,255,.35);
border-top-color:#65e51f;
border-radius:50%;
animation:pdSpin .8s linear infinite;
}

@keyframes pdSpin{
to{
transform:rotate(360deg);
}
}

body.pd-rtl{
direction:rtl;
}

body.pd-rtl #pd-language-button{
right:auto;
left:16px;
}

body.pd-rtl .pd-language-option{
text-align:right;
direction:rtl;
}

body.pd-rtl .pd-language-header{
direction:rtl;
}

body.pd-rtl input,
body.pd-rtl textarea,
body.pd-rtl select{
text-align:right;
direction:rtl;
}

@media(max-width:600px){
#pd-language-button{
right:12px;
bottom:12px;
min-width:98px;
height:52px;
padding:0 15px;
font-size:15px;
}

body.pd-rtl #pd-language-button{
right:auto;
left:12px;
}

#pd-language-grid{
grid-template-columns:1fr;
padding:15px;
}

.pd-language-header{
padding:19px;
}

.pd-language-header h2{
font-size:26px;
}

.pd-language-intro{
padding:19px 18px 5px;
}

#pd-translation-status{
bottom:76px;
max-width:calc(100% - 28px);
}
}
`;

document.head.appendChild(style);
}

/* =========================================================
   LANGUAGE INTERFACE
========================================================= */

function createLanguageInterface() {
if(
languageInterfaceCreated ||
document.getElementById(
"pd-language-button"
)
) {
return;
}

languageInterfaceCreated = true;

const button =
document.createElement("button");

button.id =
"pd-language-button";

button.type =
"button";

button.className =
"notranslate";

button.setAttribute(
"translate",
"no"
);

button.setAttribute(
"data-pd-no-translate",
"true"
);

button.innerHTML = `
<span class="pd-language-globe">🌐</span>
<span id="pd-language-current"></span>
`;

const overlay =
document.createElement("div");

overlay.id =
"pd-language-overlay";

overlay.className =
"notranslate";

overlay.setAttribute(
"translate",
"no"
);

overlay.setAttribute(
"data-pd-no-translate",
"true"
);

overlay.innerHTML = `
<div
id="pd-language-modal"
role="dialog"
aria-modal="true"
aria-labelledby="pd-language-title">

<div class="pd-language-header">

<h2 id="pd-language-title"></h2>

<button
type="button"
class="pd-language-close">
×
</button>

</div>

<p class="pd-language-intro"></p>

<div id="pd-language-grid"></div>

</div>
`;

document.body.appendChild(button);
document.body.appendChild(overlay);

const grid =
overlay.querySelector(
"#pd-language-grid"
);

PD_LANGUAGES.forEach(language => {
const option =
document.createElement("button");

option.type =
"button";

option.className =
"pd-language-option";

option.dataset.language =
language.code;

option.innerHTML = `
<span class="pd-language-flag">${language.flag}</span>

<span>
<span class="pd-language-name">${language.label}</span>
<span class="pd-language-code">${language.short}</span>
</span>
`;

option.addEventListener(
"click",
() => {
changeLanguage(
language.code
);
}
);

grid.appendChild(option);
});

button.addEventListener(
"click",
openLanguageMenu
);

overlay
.querySelector(
".pd-language-close"
)
.addEventListener(
"click",
closeLanguageMenu
);

overlay.addEventListener(
"click",
event => {
if(event.target === overlay) {
closeLanguageMenu();
}
});

document.addEventListener(
"keydown",
event => {
if(event.key === "Escape") {
closeLanguageMenu();
}
});

updateLanguageInterface();
}

function updateLanguageInterface() {
const language =
getLanguage(selectedLanguage);

const interfaceText =
getInterfaceText();

const current =
document.getElementById(
"pd-language-current"
);

if(current) {
current.textContent =
language.short;
}

const title =
document.getElementById(
"pd-language-title"
);

if(title) {
title.textContent =
interfaceText.choose;
}

const intro =
document.querySelector(
"#pd-language-overlay .pd-language-intro"
);

if(intro) {
intro.textContent =
interfaceText.intro;
}

const closeButton =
document.querySelector(
"#pd-language-overlay .pd-language-close"
);

if(closeButton) {
closeButton.setAttribute(
"aria-label",
interfaceText.close
);
}

document
.querySelectorAll(
".pd-language-option"
)
.forEach(option => {
option.classList.toggle(
"pd-active",
option.dataset.language ===
selectedLanguage
);
});
}

function openLanguageMenu() {
document
.getElementById(
"pd-language-overlay"
)
?.classList.add(
"pd-open"
);

if(document.body) {
document.body.style.overflow =
"hidden";
}
}

function closeLanguageMenu() {
document
.getElementById(
"pd-language-overlay"
)
?.classList.remove(
"pd-open"
);

if(document.body) {
document.body.style.overflow =
"";
}
}

/* =========================================================
   CHANGE LANGUAGE
========================================================= */

async function changeLanguage(languageCode) {
const language =
getLanguage(languageCode);

translationRequestNumber++;

translationRunning = true;

restoreOriginalContent(
document.body
);

translationRunning = false;

selectedLanguage =
language.code;

storeLanguage(
selectedLanguage
);

applyDocumentLanguage();
updateLanguageInterface();
closeLanguageMenu();

await translatePage(
document.body
);
}

/* =========================================================
   DYNAMIC CONTENT
========================================================= */

function scheduleTranslation() {
clearTimeout(
translationTimer
);

translationTimer =
setTimeout(
() => {
translatePage(
document.body
);
},
PD_TRANSLATION_DELAY
);
}

function observeDynamicContent() {
if(
contentObserver ||
!document.body
) {
return;
}

contentObserver =
new MutationObserver(mutations => {
if(translationRunning) {
return;
}

let newContentFound = false;

mutations.forEach(mutation => {
mutation.addedNodes
.forEach(node => {
if(
node.nodeType ===
Node.ELEMENT_NODE
) {
protectBrandElements(node);
newContentFound = true;
}

if(
node.nodeType ===
Node.TEXT_NODE &&
isUsefulText(node.nodeValue)
) {
newContentFound = true;
}
});
});

if(
newContentFound &&
selectedLanguage !==
PD_SOURCE_LANGUAGE
) {
scheduleTranslation();
}
});

contentObserver.observe(
document.body,
{
childList:true,
subtree:true
}
);
}

/* =========================================================
   NAVIGATION RESTORE
========================================================= */

function restoreLanguageAfterNavigation() {
const stored =
readStoredLanguage();

if(stored) {
selectedLanguage =
stored;
}

removeOldGoogleTranslation();
applyDocumentLanguage();
updateLanguageInterface();

if(
selectedLanguage !==
PD_SOURCE_LANGUAGE
) {
scheduleTranslation();
} else {
restoreOriginalContent(
document.body
);
}
}

window.addEventListener(
"pageshow",
event => {
restoreLanguageAfterNavigation();

if(event.persisted) {
setTimeout(
restoreLanguageAfterNavigation,
150
);
}
}
);

window.addEventListener(
"popstate",
() => {
setTimeout(
restoreLanguageAfterNavigation,
100
);
}
);

window.addEventListener(
"storage",
event => {
if(
event.key ===
PD_LANGUAGE_KEY &&
event.newValue &&
event.newValue !==
selectedLanguage
) {
selectedLanguage =
event.newValue;

restoreLanguageAfterNavigation();
}
}
);

/* =========================================================
   INITIALISE
========================================================= */

async function initializeTranslationSystem() {
selectedLanguage =
readStoredLanguage() ||
selectedLanguage;

removeOldGoogleTranslation();
createStyles();
createLanguageInterface();
createTranslationStatus();
protectBrandElements();
rememberPageMetadata();
applyDocumentLanguage();
updateLanguageInterface();
observeDynamicContent();

await translatePage(
document.body
);
}

if(
document.readyState ===
"loading"
) {
document.addEventListener(
"DOMContentLoaded",
initializeTranslationSystem
);
} else {
initializeTranslationSystem();
}

/* =========================================================
   PUBLIC API
========================================================= */

window.PetsDogueLanguage = {
languages:PD_LANGUAGES,

getCurrentLanguage:function () {
return getLanguage(
selectedLanguage
);
},

getSpeechLanguage:function () {
return getLanguage(
selectedLanguage
).speech;
},

changeLanguage:
changeLanguage,

setLanguage:
changeLanguage,

translatePage:
translatePage,

restore:
restoreLanguageAfterNavigation,

open:
openLanguageMenu,

close:
closeLanguageMenu,

protect:
protectElement,

clearCache:function () {
translationCache = {};

try {
localStorage.removeItem(
PD_CACHE_KEY
);
} catch(error) {
console.warn(error);
}
}
};

})();
