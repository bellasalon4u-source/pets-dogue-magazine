(function () {
"use strict";

/* =========================================================
   PETS & DOGUE — GLOBAL LANGUAGE SYSTEM
   The original language of the website is English.
========================================================= */

const PD_LANGUAGE_KEY = "pets_dogue_language";
const PD_GOOGLE_COOKIE = "googtrans";
const PD_SOURCE_LANGUAGE = "en";

const PD_LANGUAGES = [
{
code:"en",
googleCode:"en",
label:"English",
short:"EN",
flag:"🇬🇧",
direction:"ltr",
speech:"en-GB"
},
{
code:"ru",
googleCode:"ru",
label:"Русский",
short:"RU",
flag:"🇷🇺",
direction:"ltr",
speech:"ru-RU"
},
{
code:"uk",
googleCode:"uk",
label:"Українська",
short:"UA",
flag:"🇺🇦",
direction:"ltr",
speech:"uk-UA"
},
{
code:"cs",
googleCode:"cs",
label:"Čeština",
short:"CZ",
flag:"🇨🇿",
direction:"ltr",
speech:"cs-CZ"
},
{
code:"pl",
googleCode:"pl",
label:"Polski",
short:"PL",
flag:"🇵🇱",
direction:"ltr",
speech:"pl-PL"
},
{
code:"es",
googleCode:"es",
label:"Español",
short:"ES",
flag:"🇪🇸",
direction:"ltr",
speech:"es-ES"
},
{
code:"it",
googleCode:"it",
label:"Italiano",
short:"IT",
flag:"🇮🇹",
direction:"ltr",
speech:"it-IT"
},
{
code:"de",
googleCode:"de",
label:"Deutsch",
short:"DE",
flag:"🇩🇪",
direction:"ltr",
speech:"de-DE"
},
{
code:"ar",
googleCode:"ar",
label:"العربية",
short:"AR",
flag:"🇸🇦",
direction:"rtl",
speech:"ar-SA"
},
{
code:"hi",
googleCode:"hi",
label:"हिन्दी",
short:"HI",
flag:"🇮🇳",
direction:"ltr",
speech:"hi-IN"
}
];

let selectedLanguage =
readStoredLanguage() ||
detectBrowserLanguage();

let googleApplyAttempts = 0;
let googleChromeObserver = null;
let contentObserver = null;

/* =========================================================
   LANGUAGE HELPERS
========================================================= */

function readStoredLanguage() {
try {
const storedLanguage =
localStorage.getItem(PD_LANGUAGE_KEY);

const exists =
PD_LANGUAGES.some(language =>
language.code === storedLanguage
);

return exists
? storedLanguage
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

function getLanguage(languageCode) {
return (
PD_LANGUAGES.find(language =>
language.code === languageCode
) ||
PD_LANGUAGES[0]
);
}

/* =========================================================
   COOKIE MANAGEMENT
========================================================= */

function getCurrentDomain() {
const hostname =
window.location.hostname;

if(
!hostname ||
hostname === "localhost" ||
hostname === "127.0.0.1" ||
hostname.includes(":")
) {
return "";
}

return hostname;
}

function writeCookie(
name,
value,
days,
domain
) {
const expires =
new Date(
Date.now() +
days * 24 * 60 * 60 * 1000
).toUTCString();

let cookie =
`${name}=${value};expires=${expires};path=/;SameSite=Lax`;

if(domain) {
cookie += `;domain=${domain}`;
}

document.cookie = cookie;
}

function removeCookie(
name,
domain
) {
let cookie =
`${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;

if(domain) {
cookie += `;domain=${domain}`;
}

document.cookie = cookie;
}

function clearGoogleLanguageCookie() {
const domain =
getCurrentDomain();

removeCookie(
PD_GOOGLE_COOKIE,
""
);

if(domain) {
removeCookie(
PD_GOOGLE_COOKIE,
domain
);

removeCookie(
PD_GOOGLE_COOKIE,
"." + domain
);
}

try {
localStorage.removeItem(
PD_GOOGLE_COOKIE
);
} catch(error) {
console.warn(error);
}
}

function setGoogleLanguageCookie(
languageCode
) {
const language =
getLanguage(languageCode);

if(language.code === PD_SOURCE_LANGUAGE) {
clearGoogleLanguageCookie();
return;
}

const translationValue =
`/${PD_SOURCE_LANGUAGE}/${language.googleCode}`;

const domain =
getCurrentDomain();

writeCookie(
PD_GOOGLE_COOKIE,
translationValue,
365,
""
);

if(domain) {
writeCookie(
PD_GOOGLE_COOKIE,
translationValue,
365,
domain
);

writeCookie(
PD_GOOGLE_COOKIE,
translationValue,
365,
"." + domain
);
}

try {
localStorage.setItem(
PD_GOOGLE_COOKIE,
translationValue
);
} catch(error) {
console.warn(error);
}
}

/*
The cookie is prepared immediately, before the page translation
interface is initialised.
*/

setGoogleLanguageCookie(
selectedLanguage
);

/* =========================================================
   DOCUMENT LANGUAGE AND RTL
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
   BRAND AND ORIGINAL NAME PROTECTION
========================================================= */

function protectElement(element) {
if(!element) {
return;
}

element.classList.add(
"notranslate"
);

element.setAttribute(
"translate",
"no"
);
}

function protectBrandElements(root = document) {
if(!root.querySelectorAll) {
return;
}

/*
These selectors should contain only actual logos or official
names that must remain in their original form.
*/

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
"[data-no-translate]",
'[translate="no"]'
].join(",")
)
.forEach(protectElement);

/*
Protect only elements whose complete text is exactly a brand.
Do not protect a full headline merely because it includes DOGUE.
*/

const exactProtectedTexts = [
"PETS & DOGUE",
"DOGUE",
"pets &"
];

root
.querySelectorAll("*")
.forEach(element => {
if(element.children.length !== 0) {
return;
}

const text =
String(
element.textContent ||
""
)
.trim();

if(
exactProtectedTexts.includes(text)
) {
protectElement(element);
}
});
}

/* =========================================================
   PLACEHOLDERS, TITLES AND ACCESSIBILITY TEXT
========================================================= */

function markTranslatableAttributes(root = document) {
if(!root.querySelectorAll) {
return;
}

/*
Google normally translates visible text.
These attributes are kept available for the translation engine
and future manual translation systems.
*/

root
.querySelectorAll(
[
"input[placeholder]",
"textarea[placeholder]",
"[title]",
"[aria-label]",
"img[alt]"
].join(",")
)
.forEach(element => {
if(
element.matches(
'[translate="no"], .notranslate, [data-no-translate]'
)
) {
return;
}

element.setAttribute(
"data-pd-translatable",
"true"
);
});
}

/* =========================================================
   GLOBAL STYLES
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
right:18px;
bottom:18px;
z-index:999998;
display:flex;
align-items:center;
justify-content:center;
gap:9px;
min-width:108px;
height:56px;
padding:0 19px;
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
box-shadow:0 18px 44px rgba(0,0,0,.34);
background:#fff8df;
}

#pd-language-button .pd-language-globe{
font-size:24px;
line-height:1;
}

#pd-language-overlay{
position:fixed;
inset:0;
z-index:999999;
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
display:flex;
align-items:center;
justify-content:space-between;
gap:20px;
padding:24px;
background:#111;
color:#fff;
position:sticky;
top:0;
z-index:2;
}

.pd-language-header h2{
font-family:Georgia,serif;
font-size:32px;
font-weight:normal;
margin:0;
}

.pd-language-close{
width:44px;
height:44px;
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
border-color:#111;
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

/* Hide the Google translation controls and top banner. */

#google_translate_element{
position:fixed!important;
left:-99999px!important;
top:-99999px!important;
width:1px!important;
height:1px!important;
overflow:hidden!important;
opacity:0!important;
pointer-events:none!important;
}

.goog-te-banner-frame,
.goog-te-banner-frame.skiptranslate,
iframe.goog-te-banner-frame,
.goog-te-balloon-frame,
.goog-te-menu-frame,
.goog-tooltip,
.goog-tooltip:hover{
display:none!important;
visibility:hidden!important;
height:0!important;
max-height:0!important;
}

body > .skiptranslate{
display:none!important;
visibility:hidden!important;
height:0!important;
max-height:0!important;
}

html,
body{
top:0!important;
margin-top:0!important;
}

body.pd-rtl #pd-language-button{
right:auto;
left:18px;
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
height:56px;
min-width:112px;
padding:0 17px;
font-size:16px;
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
}
`;

document.head.appendChild(
style
);
}

/* =========================================================
   REMOVE GOOGLE BANNER AND PAGE OFFSET
========================================================= */

function removeGoogleInterface() {
document
.querySelectorAll(
[
".goog-te-banner-frame",
"iframe.goog-te-banner-frame",
".goog-te-balloon-frame",
".goog-te-menu-frame",
".goog-tooltip",
"body > .skiptranslate"
].join(",")
)
.forEach(element => {
if(
element.id ===
"google_translate_element"
) {
return;
}

element.style.setProperty(
"display",
"none",
"important"
);

element.style.setProperty(
"visibility",
"hidden",
"important"
);

element.style.setProperty(
"height",
"0",
"important"
);
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

function observeGoogleInterface() {
if(googleChromeObserver) {
return;
}

googleChromeObserver =
new MutationObserver(() => {
removeGoogleInterface();
});

googleChromeObserver.observe(
document.documentElement,
{
childList:true,
subtree:true,
attributes:true,
attributeFilter:[
"style",
"class"
]
}
);
}

/* =========================================================
   DYNAMIC CMS CONTENT OBSERVER
========================================================= */

function processDynamicContent(node) {
if(
!node ||
node.nodeType !== Node.ELEMENT_NODE
) {
return;
}

protectBrandElements(node);
markTranslatableAttributes(node);
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
mutations.forEach(mutation => {
mutation.addedNodes.forEach(node => {
processDynamicContent(node);
});
});

removeGoogleInterface();
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
   GOOGLE TRANSLATE CONTAINER
========================================================= */

function createGoogleContainer() {
if(
document.getElementById(
"google_translate_element"
)
) {
return;
}

const container =
document.createElement("div");

container.id =
"google_translate_element";

container.className =
"notranslate";

container.setAttribute(
"translate",
"no"
);

document.body.appendChild(
container
);
}

/* =========================================================
   LANGUAGE SELECTOR
========================================================= */

function createLanguageInterface() {
if(
document.getElementById(
"pd-language-button"
)
) {
return;
}

const currentLanguage =
getLanguage(selectedLanguage);

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
"aria-label",
"Choose language"
);

button.innerHTML = `
<span class="pd-language-globe">🌐</span>
<span id="pd-language-current">${currentLanguage.short}</span>
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

overlay.innerHTML = `
<div
id="pd-language-modal"
role="dialog"
aria-modal="true"
aria-labelledby="pd-language-title">

<div class="pd-language-header">

<h2 id="pd-language-title">
Choose Your Language
</h2>

<button
type="button"
class="pd-language-close"
aria-label="Close language menu">
×
</button>

</div>

<p class="pd-language-intro">
Choose a language for PETS & DOGUE. Your selection will remain active across every page until you choose another language.
</p>

<div id="pd-language-grid"></div>

</div>
`;

document.body.appendChild(
button
);

document.body.appendChild(
overlay
);

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

if(
language.code ===
selectedLanguage
) {
option.classList.add(
"pd-active"
);
}

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

grid.appendChild(
option
);
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
}

function updateLanguageInterface() {
const language =
getLanguage(selectedLanguage);

const current =
document.getElementById(
"pd-language-current"
);

if(current) {
current.textContent =
language.short;
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
const overlay =
document.getElementById(
"pd-language-overlay"
);

if(!overlay) {
return;
}

overlay.classList.add(
"pd-open"
);

document.body.style.overflow =
"hidden";
}

function closeLanguageMenu() {
const overlay =
document.getElementById(
"pd-language-overlay"
);

if(!overlay) {
return;
}

overlay.classList.remove(
"pd-open"
);

document.body.style.overflow =
"";
}

/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage(languageCode) {
const language =
getLanguage(languageCode);

selectedLanguage =
language.code;

storeLanguage(
selectedLanguage
);

setGoogleLanguageCookie(
selectedLanguage
);

applyDocumentLanguage();
updateLanguageInterface();
closeLanguageMenu();

try {
sessionStorage.setItem(
"pd_language_last_change",
selectedLanguage
);
} catch(error) {
console.warn(error);
}

/*
Reloading ensures Google translates the full document,
including advertisements and CMS-generated content.
*/

window.location.reload();
}

/* =========================================================
   GOOGLE TRANSLATE INITIALISATION
========================================================= */

function initializeGoogleTranslation() {
window.googleTranslateElementInit =
function () {
if(
!window.google ||
!window.google.translate
) {
return;
}

new window.google.translate.TranslateElement(
{
pageLanguage:PD_SOURCE_LANGUAGE,

includedLanguages:
PD_LANGUAGES
.filter(language =>
language.code !== PD_SOURCE_LANGUAGE
)
.map(language =>
language.googleCode
)
.join(","),

autoDisplay:false,
multilanguagePage:true
},
"google_translate_element"
);

googleApplyAttempts = 0;

setTimeout(
applySavedGoogleLanguage,
300
);
};

if(
document.querySelector(
'script[data-pd-google-translate="true"]'
)
) {
return;
}

const script =
document.createElement("script");

script.src =
"https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

script.async =
true;

script.defer =
true;

script.dataset.pdGoogleTranslate =
"true";

script.onerror =
function () {
console.warn(
"PETS & DOGUE translation service could not be loaded."
);
};

document.head.appendChild(
script
);
}

function applySavedGoogleLanguage() {
removeGoogleInterface();

if(
selectedLanguage ===
PD_SOURCE_LANGUAGE
) {
return;
}

const language =
getLanguage(selectedLanguage);

const select =
document.querySelector(
".goog-te-combo"
);

if(!select) {
googleApplyAttempts++;

if(googleApplyAttempts < 30) {
setTimeout(
applySavedGoogleLanguage,
350
);
}

return;
}

if(
select.value !==
language.googleCode
) {
select.value =
language.googleCode;

select.dispatchEvent(
new Event(
"change",
{
bubbles:true
}
)
);
}

setTimeout(
removeGoogleInterface,
50
);

setTimeout(
removeGoogleInterface,
250
);

setTimeout(
removeGoogleInterface,
700
);

setTimeout(
removeGoogleInterface,
1500
);
}

/* =========================================================
   RESTORE LANGUAGE AFTER NAVIGATION
========================================================= */

function restoreLanguageAfterNavigation() {
const storedLanguage =
readStoredLanguage();

if(storedLanguage) {
selectedLanguage =
storedLanguage;
}

setGoogleLanguageCookie(
selectedLanguage
);

applyDocumentLanguage();
updateLanguageInterface();
protectBrandElements();
markTranslatableAttributes();

googleApplyAttempts = 0;

if(
selectedLanguage !==
PD_SOURCE_LANGUAGE
) {
setTimeout(
applySavedGoogleLanguage,
100
);

setTimeout(
applySavedGoogleLanguage,
450
);

setTimeout(
applySavedGoogleLanguage,
1000
);

setTimeout(
applySavedGoogleLanguage,
1800
);
}

removeGoogleInterface();
}

window.addEventListener(
"pageshow",
event => {
restoreLanguageAfterNavigation();

if(event.persisted) {
setTimeout(
restoreLanguageAfterNavigation,
200
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

document.addEventListener(
"visibilitychange",
() => {
if(
document.visibilityState ===
"visible"
) {
restoreLanguageAfterNavigation();
}
}
);

/* =========================================================
   INITIALISE SYSTEM
========================================================= */

function initializeTranslationSystem() {
selectedLanguage =
readStoredLanguage() ||
selectedLanguage;

setGoogleLanguageCookie(
selectedLanguage
);

createStyles();
applyDocumentLanguage();
protectBrandElements();
markTranslatableAttributes();
createGoogleContainer();
createLanguageInterface();
updateLanguageInterface();
observeGoogleInterface();
observeDynamicContent();
removeGoogleInterface();
initializeGoogleTranslation();
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

changeLanguage:changeLanguage,

setLanguage:changeLanguage,

open:openLanguageMenu,

close:closeLanguageMenu,

restore:restoreLanguageAfterNavigation,

protect:function (element) {
protectElement(element);
}
};

})();
