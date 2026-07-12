(function () {
"use strict";

const PD_LANGUAGE_KEY = "pets_dogue_language";

const PD_LANGUAGES = [
{
code:"en",
googleCode:"en",
label:"English",
short:"EN",
flag:"🇬🇧",
direction:"ltr"
},
{
code:"ru",
googleCode:"ru",
label:"Русский",
short:"RU",
flag:"🇷🇺",
direction:"ltr"
},
{
code:"uk",
googleCode:"uk",
label:"Українська",
short:"UA",
flag:"🇺🇦",
direction:"ltr"
},
{
code:"cs",
googleCode:"cs",
label:"Čeština",
short:"CZ",
flag:"🇨🇿",
direction:"ltr"
},
{
code:"pl",
googleCode:"pl",
label:"Polski",
short:"PL",
flag:"🇵🇱",
direction:"ltr"
},
{
code:"es",
googleCode:"es",
label:"Español",
short:"ES",
flag:"🇪🇸",
direction:"ltr"
},
{
code:"it",
googleCode:"it",
label:"Italiano",
short:"IT",
flag:"🇮🇹",
direction:"ltr"
},
{
code:"de",
googleCode:"de",
label:"Deutsch",
short:"DE",
flag:"🇩🇪",
direction:"ltr"
},
{
code:"ar",
googleCode:"ar",
label:"العربية",
short:"AR",
flag:"🇸🇦",
direction:"rtl"
},
{
code:"hi",
googleCode:"hi",
label:"हिन्दी",
short:"HI",
flag:"🇮🇳",
direction:"ltr"
}
];

let selectedLanguage =
localStorage.getItem(PD_LANGUAGE_KEY) ||
detectBrowserLanguage();

function detectBrowserLanguage() {
const browserLanguage =
String(
navigator.language ||
navigator.userLanguage ||
"en"
)
.toLowerCase();

const exactMatch =
PD_LANGUAGES.find(language =>
browserLanguage === language.code ||
browserLanguage.startsWith(language.code + "-")
);

return exactMatch
? exactMatch.code
: "en";
}

function getLanguage(code) {
return (
PD_LANGUAGES.find(language =>
language.code === code
) ||
PD_LANGUAGES[0]
);
}

function setCookie(name,value,days) {
const expires =
new Date(
Date.now() +
days * 24 * 60 * 60 * 1000
).toUTCString();

document.cookie =
`${name}=${value};expires=${expires};path=/;SameSite=Lax`;
}

function deleteCookie(name) {
document.cookie =
`${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

function prepareBrandProtection() {
const protectedTexts = [
"PETS & DOGUE",
"DOGUE",
"Miso",
"PETS & DOGUE Club",
"DOGUE Verified",
"DOGUE Trust"
];

const walker =
document.createTreeWalker(
document.body,
NodeFilter.SHOW_ELEMENT
);

const elements = [];

while(walker.nextNode()) {
elements.push(walker.currentNode);
}

elements.forEach(element => {
if(
element.children.length === 0 &&
protectedTexts.some(text =>
element.textContent &&
element.textContent.includes(text)
)
) {
element.setAttribute("translate","no");
element.classList.add("notranslate");
}
});

document
.querySelectorAll(
".brand,.brand-small,.brand-big,.logo-small,.logo-big,.footer-brand"
)
.forEach(element => {
element.setAttribute("translate","no");
element.classList.add("notranslate");
});
}

function applyDirection(languageCode) {
const language =
getLanguage(languageCode);

document.documentElement.lang =
language.code;

document.documentElement.dir =
language.direction;

document.body.classList.toggle(
"pd-rtl",
language.direction === "rtl"
);
}

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
z-index:9998;
display:flex;
align-items:center;
gap:8px;
min-width:82px;
height:50px;
padding:0 16px;
border:2px solid #111;
border-radius:999px;
background:#fff;
color:#111;
font-family:Arial,Helvetica,sans-serif;
font-size:13px;
font-weight:800;
letter-spacing:.5px;
cursor:pointer;
box-shadow:0 12px 35px rgba(0,0,0,.18);
transition:transform .2s ease,box-shadow .2s ease;
}

#pd-language-button:hover{
transform:translateY(-3px);
box-shadow:0 16px 40px rgba(0,0,0,.22);
}

#pd-language-button .pd-language-globe{
font-size:19px;
}

#pd-language-overlay{
position:fixed;
inset:0;
z-index:9999;
display:none;
align-items:center;
justify-content:center;
padding:20px;
background:rgba(0,0,0,.76);
backdrop-filter:blur(7px);
}

#pd-language-overlay.pd-open{
display:flex;
}

#pd-language-modal{
width:min(660px,100%);
max-height:88vh;
overflow-y:auto;
background:#f8f7f3;
border:3px solid #111;
border-radius:34px;
box-shadow:0 30px 90px rgba(0,0,0,.38);
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
font-size:31px;
font-weight:normal;
margin:0;
}

.pd-language-close{
width:43px;
height:43px;
border:none;
border-radius:50%;
background:#fff;
color:#111;
font-size:24px;
cursor:pointer;
}

.pd-language-intro{
padding:23px 24px 8px;
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
min-height:70px;
padding:14px 16px;
border:2px solid #111;
border-radius:20px;
background:#fff;
color:#111;
text-align:left;
cursor:pointer;
transition:transform .2s ease,background .2s ease;
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
font-size:27px;
}

.pd-language-name{
display:block;
font-size:16px;
font-weight:800;
}

.pd-language-code{
display:block;
margin-top:3px;
font-size:11px;
color:#666;
letter-spacing:1px;
}

#google_translate_element{
position:fixed!important;
left:-10000px!important;
top:-10000px!important;
width:1px!important;
height:1px!important;
overflow:hidden!important;
opacity:0!important;
pointer-events:none!important;
}

.goog-te-banner-frame,
.goog-te-banner-frame.skiptranslate{
display:none!important;
}

body{
top:0!important;
}

body.pd-rtl #pd-language-button{
right:auto;
left:18px;
}

body.pd-rtl .pd-language-option{
text-align:right;
}

body.pd-rtl .pd-language-header{
direction:rtl;
}

@media(max-width:600px){
#pd-language-button{
right:12px;
bottom:12px;
height:47px;
padding:0 14px;
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

document.head.appendChild(style);
}

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

document.body.appendChild(container);
}

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
Select a language for PETS & DOGUE. Your choice will be remembered on this device.
</p>

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

if(language.code === selectedLanguage) {
option.classList.add("pd-active");
}

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
changeLanguage(language.code);
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
if(
event.target === overlay
) {
closeLanguageMenu();
}
}
);

document.addEventListener(
"keydown",
event => {
if(
event.key === "Escape"
) {
closeLanguageMenu();
}
}
);
}

function openLanguageMenu() {
document
.getElementById(
"pd-language-overlay"
)
?.classList.add(
"pd-open"
);

document.body.style.overflow =
"hidden";
}

function closeLanguageMenu() {
document
.getElementById(
"pd-language-overlay"
)
?.classList.remove(
"pd-open"
);

document.body.style.overflow =
"";
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

function changeLanguage(languageCode) {
const language =
getLanguage(languageCode);

selectedLanguage =
language.code;

localStorage.setItem(
PD_LANGUAGE_KEY,
language.code
);

applyDirection(
language.code
);

updateLanguageInterface();
closeLanguageMenu();

if(language.code === "en") {
deleteCookie("googtrans");
deleteCookie("googtrans");

try {
localStorage.removeItem(
"googtrans"
);
} catch(error) {
console.warn(error);
}

window.location.reload();
return;
}

const translationValue =
`/en/${language.googleCode}`;

setCookie(
"googtrans",
translationValue,
365
);

try {
localStorage.setItem(
"googtrans",
translationValue
);
} catch(error) {
console.warn(error);
}

window.location.reload();
}

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
pageLanguage:"en",
includedLanguages:
PD_LANGUAGES
.filter(language =>
language.code !== "en"
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

setTimeout(
applySavedGoogleLanguage,
600
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

document.head.appendChild(script);
}

function applySavedGoogleLanguage() {
if(
selectedLanguage === "en"
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
setTimeout(
applySavedGoogleLanguage,
700
);
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
}

function initializeTranslationSystem() {
createStyles();
createGoogleContainer();
prepareBrandProtection();
applyDirection(selectedLanguage);
createLanguageInterface();
updateLanguageInterface();
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

window.PetsDogueLanguage = {
languages:PD_LANGUAGES,
getCurrentLanguage:function () {
return getLanguage(
selectedLanguage
);
},
changeLanguage:changeLanguage,
open:openLanguageMenu,
close:closeLanguageMenu
};

})();
