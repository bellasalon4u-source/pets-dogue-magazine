"use strict";

/*
=========================================================
PETS & DOGUE — ACCESSIBLE MULTILINGUAL NARRATION
=========================================================
Single narration engine.
Exactly one speaker per readable topic.
Old/manual speaker controls are removed to prevent duplicates.
The first utterance starts directly from the user's tap for
reliable Android/Chrome playback.
=========================================================
*/

(function(){

"use strict";

const LANGUAGE_KEY = "pets_dogue_language";

const SUPPORTED = [
"en","uk","ru","fr","de","es","it","pt","nl","pl","cs","sk",
"hu","ro","bg","el","sv","da","no","fi","tr","ar","hi"
];

const ALIASES = {
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};

const LOCALES = {
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
};

const UI = {

en:{
listen:"Listen to this topic",
stop:"Stop reading",
reading:"Reading this topic aloud.",
stopped:"Reading stopped.",
empty:"There is no readable text in this topic.",
unsupported:"Text-to-speech is not supported by this browser."
},

uk:{
listen:"Прослухати цю тему",
stop:"Зупинити озвучування",
reading:"Ця тема читається вголос.",
stopped:"Озвучування зупинено.",
empty:"У цій темі немає тексту для озвучування.",
unsupported:"Цей браузер не підтримує озвучування тексту."
},

ru:{
listen:"Прослушать эту тему",
stop:"Остановить чтение",
reading:"Эта тема читается вслух.",
stopped:"Чтение остановлено.",
empty:"В этой теме нет текста для озвучивания.",
unsupported:"Этот браузер не поддерживает озвучивание текста."
},

fr:{
listen:"Écouter ce contenu",
stop:"Arrêter la lecture",
reading:"Lecture de ce contenu en cours.",
stopped:"Lecture arrêtée.",
empty:"Aucun texte à lire.",
unsupported:"La lecture vocale n’est pas prise en charge."
},

de:{
listen:"Diesen Inhalt anhören",
stop:"Vorlesen stoppen",
reading:"Dieser Inhalt wird vorgelesen.",
stopped:"Vorlesen gestoppt.",
empty:"Kein Text zum Vorlesen.",
unsupported:"Dieser Browser unterstützt keine Sprachausgabe."
},

es:{
listen:"Escuchar este contenido",
stop:"Detener lectura",
reading:"Este contenido se está leyendo en voz alta.",
stopped:"Lectura detenida.",
empty:"No hay texto para leer.",
unsupported:"Este navegador no admite lectura de texto."
},

it:{
listen:"Ascolta questo contenuto",
stop:"Interrompi lettura",
reading:"Questo contenuto viene letto ad alta voce.",
stopped:"Lettura interrotta.",
empty:"Nessun testo da leggere.",
unsupported:"Questo browser non supporta la lettura vocale."
},

pt:{
listen:"Ouvir este conteúdo",
stop:"Parar leitura",
reading:"Este conteúdo está a ser lido em voz alta.",
stopped:"Leitura parada.",
empty:"Não existe texto para ler.",
unsupported:"Este navegador não suporta leitura de texto."
},

nl:{
listen:"Deze inhoud beluisteren",
stop:"Voorlezen stoppen",
reading:"Deze inhoud wordt voorgelezen.",
stopped:"Voorlezen gestopt.",
empty:"Geen tekst om voor te lezen.",
unsupported:"Deze browser ondersteunt geen tekst-naar-spraak."
},

pl:{
listen:"Posłuchaj tej treści",
stop:"Zatrzymaj czytanie",
reading:"Ta treść jest czytana na głos.",
stopped:"Czytanie zatrzymane.",
empty:"Brak tekstu do odczytania.",
unsupported:"Ta przeglądarka nie obsługuje odczytywania tekstu."
},

cs:{
listen:"Poslechnout tento obsah",
stop:"Zastavit čtení",
reading:"Tento obsah se čte nahlas.",
stopped:"Čtení zastaveno.",
empty:"Není zde text ke čtení.",
unsupported:"Prohlížeč nepodporuje převod textu na řeč."
},

sk:{
listen:"Vypočuť tento obsah",
stop:"Zastaviť čítanie",
reading:"Tento obsah sa číta nahlas.",
stopped:"Čítanie zastavené.",
empty:"Nie je tu text na čítanie.",
unsupported:"Prehliadač nepodporuje čítanie textu."
},

hu:{
listen:"A tartalom meghallgatása",
stop:"Felolvasás leállítása",
reading:"A tartalom felolvasása folyamatban.",
stopped:"A felolvasás leállt.",
empty:"Nincs felolvasható szöveg.",
unsupported:"A böngésző nem támogatja a felolvasást."
},

ro:{
listen:"Ascultă acest conținut",
stop:"Oprește citirea",
reading:"Acest conținut este citit cu voce tare.",
stopped:"Citirea a fost oprită.",
empty:"Nu există text de citit.",
unsupported:"Browserul nu acceptă citirea textului."
},

bg:{
listen:"Прослушайте тази тема",
stop:"Спрете четенето",
reading:"Темата се чете на глас.",
stopped:"Четенето е спряно.",
empty:"Няма текст за четене.",
unsupported:"Браузърът не поддържа озвучаване."
},

el:{
listen:"Ακούστε αυτό το περιεχόμενο",
stop:"Διακοπή ανάγνωσης",
reading:"Το περιεχόμενο διαβάζεται δυνατά.",
stopped:"Η ανάγνωση σταμάτησε.",
empty:"Δεν υπάρχει κείμενο.",
unsupported:"Δεν υποστηρίζεται η φωνητική ανάγνωση."
},

sv:{
listen:"Lyssna på detta innehåll",
stop:"Stoppa uppläsningen",
reading:"Innehållet läses upp.",
stopped:"Uppläsningen stoppades.",
empty:"Det finns ingen text att läsa.",
unsupported:"Webbläsaren stöder inte textuppläsning."
},

da:{
listen:"Lyt til dette indhold",
stop:"Stop oplæsning",
reading:"Indholdet læses højt.",
stopped:"Oplæsningen er stoppet.",
empty:"Der er ingen tekst at læse.",
unsupported:"Browseren understøtter ikke tekst-til-tale."
},

no:{
listen:"Lytt til dette innholdet",
stop:"Stopp opplesing",
reading:"Innholdet leses høyt.",
stopped:"Opplesingen er stoppet.",
empty:"Det finnes ingen tekst å lese.",
unsupported:"Nettleseren støtter ikke tekst-til-tale."
},

fi:{
listen:"Kuuntele tämä sisältö",
stop:"Lopeta lukeminen",
reading:"Sisältöä luetaan ääneen.",
stopped:"Lukeminen lopetettiin.",
empty:"Ei luettavaa tekstiä.",
unsupported:"Selain ei tue tekstin puheeksi muuntamista."
},

tr:{
listen:"Bu içeriği dinle",
stop:"Okumayı durdur",
reading:"Bu içerik sesli okunuyor.",
stopped:"Okuma durduruldu.",
empty:"Okunabilir metin yok.",
unsupported:"Tarayıcı metinden sese özelliğini desteklemiyor."
},

ar:{
listen:"استمع إلى هذا المحتوى",
stop:"إيقاف القراءة",
reading:"تتم قراءة هذا المحتوى بصوت عالٍ.",
stopped:"تم إيقاف القراءة.",
empty:"لا يوجد نص قابل للقراءة.",
unsupported:"المتصفح لا يدعم تحويل النص إلى كلام."
},

hi:{
listen:"इस विषय को सुनें",
stop:"पढ़ना बंद करें",
reading:"इस विषय को आवाज़ में पढ़ा जा रहा है।",
stopped:"पढ़ना बंद कर दिया गया।",
empty:"पढ़ने योग्य टेक्स्ट नहीं है।",
unsupported:"ब्राउज़र टेक्स्ट-टू-स्पीच का समर्थन नहीं करता।"
}

};


const TERMS = {

en:{
location:"Location",
phone:"Phone number",
card:"Bank card",
email:"Email",
website:"Website",
winner:"Winner",
prize:"Prize",
date:"Date",
time:"Time",
distance:"Distance",
favourite:"Favourite",
pounds:"pounds"
},

uk:{
location:"Місцезнаходження",
phone:"Номер телефону",
card:"Банківська картка",
email:"Електронна пошта",
website:"Вебсайт",
winner:"Переможець",
prize:"Приз",
date:"Дата",
time:"Час",
distance:"Відстань",
favourite:"Обране",
pounds:"фунтів стерлінгів"
},

ru:{
location:"Местоположение",
phone:"Номер телефона",
card:"Банковская карта",
email:"Электронная почта",
website:"Веб-сайт",
winner:"Победитель",
prize:"Приз",
date:"Дата",
time:"Время",
distance:"Расстояние",
favourite:"Избранное",
pounds:"фунтов стерлингов"
},

fr:{
location:"Localisation",
phone:"Numéro de téléphone",
card:"Carte bancaire",
email:"Adresse e-mail",
website:"Site internet",
winner:"Gagnant",
prize:"Prix",
date:"Date",
time:"Heure",
distance:"Distance",
favourite:"Favori",
pounds:"livres sterling"
},

de:{
location:"Standort",
phone:"Telefonnummer",
card:"Bankkarte",
email:"E-Mail",
website:"Webseite",
winner:"Gewinner",
prize:"Preis",
date:"Datum",
time:"Uhrzeit",
distance:"Entfernung",
favourite:"Favorit",
pounds:"Pfund"
},

es:{
location:"Ubicación",
phone:"Número de teléfono",
card:"Tarjeta bancaria",
email:"Correo electrónico",
website:"Sitio web",
winner:"Ganador",
prize:"Premio",
date:"Fecha",
time:"Hora",
distance:"Distancia",
favourite:"Favorito",
pounds:"libras"
},

it:{
location:"Posizione",
phone:"Numero di telefono",
card:"Carta bancaria",
email:"Email",
website:"Sito web",
winner:"Vincitore",
prize:"Premio",
date:"Data",
time:"Ora",
distance:"Distanza",
favourite:"Preferito",
pounds:"sterline"
},

pt:{
location:"Localização",
phone:"Número de telefone",
card:"Cartão bancário",
email:"Email",
website:"Website",
winner:"Vencedor",
prize:"Prémio",
date:"Data",
time:"Hora",
distance:"Distância",
favourite:"Favorito",
pounds:"libras"
},

nl:{
location:"Locatie",
phone:"Telefoonnummer",
card:"Bankkaart",
email:"E-mail",
website:"Website",
winner:"Winnaar",
prize:"Prijs",
date:"Datum",
time:"Tijd",
distance:"Afstand",
favourite:"Favoriet",
pounds:"pond"
},

pl:{
location:"Lokalizacja",
phone:"Numer telefonu",
card:"Karta bankowa",
email:"E-mail",
website:"Strona internetowa",
winner:"Zwycięzca",
prize:"Nagroda",
date:"Data",
time:"Czas",
distance:"Odległość",
favourite:"Ulubione",
pounds:"funtów"
},

cs:{
location:"Poloha",
phone:"Telefonní číslo",
card:"Bankovní karta",
email:"E-mail",
website:"Webová stránka",
winner:"Vítěz",
prize:"Cena",
date:"Datum",
time:"Čas",
distance:"Vzdálenost",
favourite:"Oblíbené",
pounds:"liber"
},

sk:{
location:"Poloha",
phone:"Telefónne číslo",
card:"Banková karta",
email:"E-mail",
website:"Webová stránka",
winner:"Víťaz",
prize:"Cena",
date:"Dátum",
time:"Čas",
distance:"Vzdialenosť",
favourite:"Obľúbené",
pounds:"libier"
},

hu:{
location:"Hely",
phone:"Telefonszám",
card:"Bankkártya",
email:"E-mail",
website:"Weboldal",
winner:"Győztes",
prize:"Díj",
date:"Dátum",
time:"Idő",
distance:"Távolság",
favourite:"Kedvenc",
pounds:"font"
},

ro:{
location:"Locație",
phone:"Număr de telefon",
card:"Card bancar",
email:"E-mail",
website:"Site web",
winner:"Câștigător",
prize:"Premiu",
date:"Dată",
time:"Oră",
distance:"Distanță",
favourite:"Favorit",
pounds:"lire"
},

bg:{
location:"Местоположение",
phone:"Телефонен номер",
card:"Банкова карта",
email:"Имейл",
website:"Уебсайт",
winner:"Победител",
prize:"Награда",
date:"Дата",
time:"Час",
distance:"Разстояние",
favourite:"Любимо",
pounds:"паунда"
},

el:{
location:"Τοποθεσία",
phone:"Αριθμός τηλεφώνου",
card:"Τραπεζική κάρτα",
email:"Email",
website:"Ιστότοπος",
winner:"Νικητής",
prize:"Βραβείο",
date:"Ημερομηνία",
time:"Ώρα",
distance:"Απόσταση",
favourite:"Αγαπημένο",
pounds:"λίρες"
},

sv:{
location:"Plats",
phone:"Telefonnummer",
card:"Bankkort",
email:"E-post",
website:"Webbplats",
winner:"Vinnare",
prize:"Pris",
date:"Datum",
time:"Tid",
distance:"Avstånd",
favourite:"Favorit",
pounds:"pund"
},

da:{
location:"Placering",
phone:"Telefonnummer",
card:"Bankkort",
email:"E-mail",
website:"Hjemmeside",
winner:"Vinder",
prize:"Præmie",
date:"Dato",
time:"Tid",
distance:"Afstand",
favourite:"Favorit",
pounds:"pund"
},

no:{
location:"Sted",
phone:"Telefonnummer",
card:"Bankkort",
email:"E-post",
website:"Nettside",
winner:"Vinner",
prize:"Premie",
date:"Dato",
time:"Tid",
distance:"Avstand",
favourite:"Favoritt",
pounds:"pund"
},

fi:{
location:"Sijainti",
phone:"Puhelinnumero",
card:"Pankkikortti",
email:"Sähköposti",
website:"Verkkosivusto",
winner:"Voittaja",
prize:"Palkinto",
date:"Päivämäärä",
time:"Aika",
distance:"Etäisyys",
favourite:"Suosikki",
pounds:"puntaa"
},

tr:{
location:"Konum",
phone:"Telefon numarası",
card:"Banka kartı",
email:"E-posta",
website:"Web sitesi",
winner:"Kazanan",
prize:"Ödül",
date:"Tarih",
time:"Saat",
distance:"Mesafe",
favourite:"Favori",
pounds:"sterlin"
},

ar:{
location:"الموقع",
phone:"رقم الهاتف",
card:"بطاقة بنكية",
email:"البريد الإلكتروني",
website:"الموقع الإلكتروني",
winner:"الفائز",
prize:"الجائزة",
date:"التاريخ",
time:"الوقت",
distance:"المسافة",
favourite:"المفضلة",
pounds:"جنيه إسترليني"
},

hi:{
location:"स्थान",
phone:"फ़ोन नंबर",
card:"बैंक कार्ड",
email:"ईमेल",
website:"वेबसाइट",
winner:"विजेता",
prize:"पुरस्कार",
date:"तारीख",
time:"समय",
distance:"दूरी",
favourite:"पसंदीदा",
pounds:"पाउंड"
}

};


const READABLE_SELECTORS = [

"[data-pd-readable]",

".hero-content",

"main article",

"main .article-card",

"main .story-card",

"main .feature-card",

"main .editorial-card",

"main .content-card",

"main .world-card",

"main .category-card",

"main .rubric-card",

"main .topic-card",

"main .card",

"main .listing-card",

"main .intro-photo",

"main .how",

"main .prize-box",

"main .rules",

"main .impact-copy",

"main .rescue-copy",

"main .publish-strip",

"main .community-note-inner"

].join(",");


const OLD_SPEAKER_SELECTORS = [

"[data-pd-speech-toggle]",

"[data-read-aloud]",

"[data-speech-toggle]",

"[data-speech-target]",

".pd-local-speaker",

".speaker-button",

".speaker-btn",

".listen-button",

".read-aloud-button",

".speech-button",

".speech-btn",

".tts-button",

".tts-btn",

".narration-button",

".narration-btn",

".audio-reader-button"

].join(",");


let activeButton = null;

let activeUtterance = null;

let queue = [];

let queueIndex = 0;

let isReading = false;

let manuallyStopped = false;

let idCounter = 0;

let refreshTimer = null;


/* =========================================================
LANGUAGE
========================================================= */

function normalizeLanguage(value){

let code =
String(
value ||
"en"
)
.trim()
.toLowerCase();

if(
code.includes("-")
){

code =
code.split("-")[0];

}

if(
code.includes("_")
){

code =
code.split("_")[0];

}

code =
ALIASES[code] ||
code;

return SUPPORTED.includes(code)
?code
:"en";

}


function currentLanguage(){

try{

if(
window.PetsDogueLanguage &&
typeof window.PetsDogueLanguage.getCurrentLanguage ===
"function"
){

const value =
window.PetsDogueLanguage
.getCurrentLanguage();

if(
typeof value ===
"string"
){

return normalizeLanguage(
value
);

}

if(
value &&
typeof value.code ===
"string"
){

return normalizeLanguage(
value.code
);

}

}

}catch(error){
}


try{

const saved =
localStorage.getItem(
LANGUAGE_KEY
);

if(saved){

return normalizeLanguage(
saved
);

}

}catch(error){
}


return normalizeLanguage(
document.documentElement.lang ||
"en"
);

}


function labels(){

return UI[
currentLanguage()
] ||
UI.en;

}


function locale(){

return LOCALES[
currentLanguage()
] ||
"en-GB";

}


function terms(){

return TERMS[
currentLanguage()
] ||
TERMS.en;

}


/* =========================================================
LIVE REGION
========================================================= */

function ensureLiveRegion(){

let el =
document.getElementById(
"pdNarrationStatus"
);

if(el){

return el;

}

el =
document.createElement(
"div"
);

el.id =
"pdNarrationStatus";

el.className =
"pd-a11y-sr-only";

el.setAttribute(
"role",
"status"
);

el.setAttribute(
"aria-live",
"polite"
);

el.setAttribute(
"aria-atomic",
"true"
);

el.setAttribute(
"data-pd-speech-ignore",
"true"
);

document.body.appendChild(
el
);

return el;

}


function announce(text){

const region =
ensureLiveRegion();

region.textContent =
"";

setTimeout(
()=>{

region.textContent =
text;

},
20
);

}


/* =========================================================
STYLES
========================================================= */

function addStyles(){

if(
document.getElementById(
"pdNarrationStylesV4"
)
){

return;

}

const style =
document.createElement(
"style"
);

style.id =
"pdNarrationStylesV4";

style.setAttribute(
"data-pd-speech-ignore",
"true"
);

style.textContent = `

.pd-a11y-sr-only{
position:absolute!important;
width:1px!important;
height:1px!important;
padding:0!important;
margin:-1px!important;
overflow:hidden!important;
clip:rect(0,0,0,0)!important;
white-space:nowrap!important;
border:0!important;
}

.pd-a11y-readable{
position:relative!important;
}

.pd-a11y-speaker{
position:absolute;
top:14px;
right:14px;
width:42px;
height:42px;
display:flex;
align-items:center;
justify-content:center;
padding:0;
margin:0;
border:2px solid #c89b3c;
border-radius:50%;
background:rgba(7,7,7,.94);
color:#fff;
cursor:pointer;
z-index:60;
box-shadow:0 4px 16px rgba(0,0,0,.2);
-webkit-tap-highlight-color:transparent;
}

html[dir="rtl"] .pd-a11y-speaker{
right:auto;
left:14px;
}

.pd-a11y-speaker svg{
display:block;
width:23px;
height:23px;
fill:none;
stroke:currentColor;
stroke-width:2.1;
stroke-linecap:round;
stroke-linejoin:round;
pointer-events:none;
}

.pd-a11y-speaker:focus-visible{
outline:3px solid #65e51f;
outline-offset:3px;
}

.pd-a11y-speaker[data-speaking="true"]{
border-color:#65e51f;
box-shadow:
0 0 0 4px rgba(101,229,31,.18),
0 4px 18px rgba(0,0,0,.28);
}

.pd-a11y-speaker[data-speaking="true"]:after{
content:"";
position:absolute;
top:-1px;
right:-1px;
width:9px;
height:9px;
border-radius:50%;
background:#65e51f;
border:2px solid #070707;
}

html[dir="rtl"]
.pd-a11y-speaker[data-speaking="true"]:after{
right:auto;
left:-1px;
}

@media(max-width:700px){

.pd-a11y-speaker{
width:39px;
height:39px;
top:10px;
right:10px;
}

html[dir="rtl"] .pd-a11y-speaker{
right:auto;
left:10px;
}

.pd-a11y-speaker svg{
width:21px;
height:21px;
}

}

`;

document.head.appendChild(
style
);

}


/* =========================================================
ICON
========================================================= */

function icon(){

return `
<svg
viewBox="0 0 32 32"
focusable="false"
aria-hidden="true"
>
<path d="M5 13h6l7-6v18l-7-6H5z"></path>
<path d="M22 11c2 1.5 3 3.1 3 5s-1 3.5-3 5"></path>
<path d="M25 7c3.3 2.5 5 5.5 5 9s-1.7 6.5-5 9"></path>
</svg>
`;

}


/* =========================================================
REMOVE ALL OLD SPEAKERS
========================================================= */

function looksLikeOldSpeaker(button){

if(
!button ||
button.nodeType !== 1
){

return false;

}

if(
button.matches(
".pd-a11y-speaker,[data-pd-a11y-speaker='1']"
)
){

return false;

}

if(
button.matches(
OLD_SPEAKER_SELECTORS
)
){

return true;

}

if(
button.tagName !== "BUTTON" &&
button.tagName !== "A"
){

return false;

}

const signature = [

button.className,

button.id,

button.getAttribute(
"aria-label"
),

button.getAttribute(
"title"
),

button.getAttribute(
"onclick"
),

button.getAttribute(
"data-action"
)

]
.filter(Boolean)
.join(" ")
.toLowerCase();

return /(speaker|speech|speak|listen|read.?aloud|narrat|text.?to.?speech|tts|озвуч|прослуш|слушать|читать вслух|голос)/i
.test(
signature
);

}


function removeOldSpeakers(){

document
.querySelectorAll(
OLD_SPEAKER_SELECTORS
)
.forEach(
el=>{

if(
!el.matches(
".pd-a11y-speaker,[data-pd-a11y-speaker='1']"
)
){

el.remove();

}

}
);

document
.querySelectorAll(
"button,a"
)
.forEach(
el=>{

if(
looksLikeOldSpeaker(
el
)
){

el.remove();

}

}
);

}


/* =========================================================
READ VISIBLE TEXT
========================================================= */

function visible(el){

if(
!el ||
el.nodeType !== 1
){

return false;

}

const style =
getComputedStyle(
el
);

return (
style.display !==
"none" &&
style.visibility !==
"hidden" &&
style.visibility !==
"collapse"
);

}


function excluded(parent){

if(!parent){

return true;

}

return Boolean(
parent.closest(
[
"script",
"style",
"noscript",
"template",
"svg",
"canvas",
"button",
"input",
"select",
"textarea",
"form",
"nav",
"[hidden]",
'[aria-hidden="true"]',
"[data-pd-speech-ignore]",
".pd-a11y-speaker",
".pd-a11y-sr-only"
].join(",")
)
);

}


function textOf(element){

if(!element){

return "";

}

const walker =
document.createTreeWalker(

element,

NodeFilter.SHOW_TEXT,

{

acceptNode(node){

const text =
String(
node.nodeValue ||
""
)
.replace(/\s+/g," ")
.trim();

if(!text){

return NodeFilter.FILTER_REJECT;

}

const parent =
node.parentElement;

if(
!parent ||
excluded(parent) ||
!visible(parent)
){

return NodeFilter.FILTER_REJECT;

}

return NodeFilter.FILTER_ACCEPT;

}

}

);

const parts = [];

let node;

while(
(
node =
walker.nextNode()
)
){

const value =
String(
node.nodeValue ||
""
)
.replace(/\s+/g," ")
.trim();

if(value){

parts.push(
value
);

}

}

return parts
.join(" ")
.replace(/\s+/g," ")
.trim();

}


/* =========================================================
SEMANTIC SYMBOLS
========================================================= */

function semanticText(text){

const t =
terms();

let value =
String(
text ||
""
);

value =
value.replace(
/📍|📌|🗺️?/gu,
` ${t.location}: `
);

value =
value.replace(
/📞|☎️?|📱/gu,
` ${t.phone}: `
);

value =
value.replace(
/💳|🏦/gu,
` ${t.card}: `
);

value =
value.replace(
/📧|✉️?/gu,
` ${t.email}: `
);

value =
value.replace(
/🌐|🔗/gu,
` ${t.website}: `
);

value =
value.replace(
/🏆/gu,
` ${t.winner}: `
);

value =
value.replace(
/🎁/gu,
` ${t.prize}: `
);

value =
value.replace(
/📅|🗓️?/gu,
` ${t.date}: `
);

value =
value.replace(
/⏰|🕒/gu,
` ${t.time}: `
);

value =
value.replace(
/📏/gu,
` ${t.distance}: `
);

value =
value.replace(
/❤️|♥|♡/gu,
` ${t.favourite}: `
);

value =
value.replace(
/£\s*([0-9]+(?:[.,][0-9]+)?)/g,
(
_,
amount
)=>
` ${amount} ${t.pounds} `
);

value =
value.replace(
/\b(?:\d{4}[\s-]?){3}\d{4}\b/g,
number=>
`${t.card}: ${
number
.replace(/\D/g,"")
.split("")
.join(" ")
}`
);

value =
value.replace(
/(?:\+\s*)?\d[\d\s().-]{7,}\d/g,
number=>
`${t.phone}: ${
number
.replace(/\D/g,"")
.split("")
.join(" ")
}`
);

value =
value.replace(
/[◆◇♦♢✦✧●○◉⌘♧✓✔︎✅]/gu,
" "
);

value =
value.replace(
/[→←↑↓►◄]/gu,
" "
);

value =
value.replace(
/\s*[·•]\s*/g,
", "
);

value =
value.replace(
/\s+\/\s+/g,
", "
);

value =
value.replace(
/\s+/g,
" "
)
.replace(
/\s+([,.!?;:])/g,
"$1"
)
.trim();

return localiseCommonWords(
value
);

}


/* =========================================================
COMMON ENGLISH UI WORDS
========================================================= */

function localiseCommonWords(text){

const lang =
currentLanguage();

if(
lang ===
"ru"
){

return text

.replace(
/\b1\s+year\b/gi,
"1 год"
)

.replace(
/\b([2-4])\s+years\b/gi,
"$1 года"
)

.replace(
/\b(\d+)\s+years\b/gi,
"$1 лет"
)

.replace(
/\b1\s+month\b/gi,
"1 месяц"
)

.replace(
/\b(\d+)\s+months\b/gi,
"$1 месяцев"
)

.replace(
/\b1\s+week\b/gi,
"1 неделя"
)

.replace(
/\b(\d+)\s+weeks\b/gi,
"$1 недель"
)

.replace(
/\bFemale\b/gi,
"Самка"
)

.replace(
/\bMale\b/gi,
"Самец"
)

.replace(
/\bFREE\b/gi,
"Бесплатно"
)

.replace(
/\bREHOME\b/gi,
"Ищет дом"
)

.replace(
/\bFOR SALE\b/gi,
"Продажа"
)

.replace(
/\bSERVICE\b/gi,
"Услуга"
);

}


if(
lang ===
"uk"
){

return text

.replace(
/\b1\s+year\b/gi,
"1 рік"
)

.replace(
/\b([2-4])\s+years\b/gi,
"$1 роки"
)

.replace(
/\b(\d+)\s+years\b/gi,
"$1 років"
)

.replace(
/\b1\s+month\b/gi,
"1 місяць"
)

.replace(
/\b(\d+)\s+months\b/gi,
"$1 місяців"
)

.replace(
/\b1\s+week\b/gi,
"1 тиждень"
)

.replace(
/\b(\d+)\s+weeks\b/gi,
"$1 тижнів"
)

.replace(
/\bFemale\b/gi,
"Самка"
)

.replace(
/\bMale\b/gi,
"Самець"
)

.replace(
/\bFREE\b/gi,
"Безкоштовно"
)

.replace(
/\bREHOME\b/gi,
"Шукає дім"
)

.replace(
/\bFOR SALE\b/gi,
"Продаж"
)

.replace(
/\bSERVICE\b/gi,
"Послуга"
);

}

return text;

}


/* =========================================================
SPLIT TEXT
========================================================= */

function splitChunks(
text,
max=190
){

const clean =
String(
text ||
""
)
.replace(/\s+/g," ")
.trim();

if(!clean){

return [];

}

const sentences =
clean.match(
/[^.!?。！？…]+[.!?。！？…]+|[^.!?。！？…]+$/g
) ||
[
clean
];

const out = [];

for(
const sentence
of sentences
){

const s =
sentence.trim();

if(!s){

continue;

}

if(
s.length <=
max
){

out.push(
s
);

continue;

}

let current =
"";

for(
const word
of s.split(/\s+/)
){

const test =
current
?current + " " + word
:word;

if(
test.length >
max &&
current
){

out.push(
current
);

current =
word;

}else{

current =
test;

}

}

if(current){

out.push(
current
);

}

}

return out;

}


/* =========================================================
MULTILINGUAL SEGMENTS
========================================================= */

function pushSegment(
result,
text,
lang
){

const clean =
String(
text ||
""
)
.replace(/\s+/g," ")
.trim();

if(clean){

result.push({
text:clean,
lang
});

}

}


function splitByLanguage(text){

const selected =
currentLanguage();

const selectedLocale =
LOCALES[selected] ||
"en-GB";

const result = [];

const nonLatin =
new Set([
"ru",
"uk",
"bg",
"el",
"ar",
"hi"
]);


if(
!nonLatin.has(
selected
)
){

const regex =
/PETS\s*&\s*DOGUE/gi;

let last = 0;

let match;

while(
(
match =
regex.exec(text)
)
){

if(
match.index >
last
){

pushSegment(
result,
text.slice(
last,
match.index
),
selectedLocale
);

}

pushSegment(
result,
match[0],
"en-GB"
);

last =
regex.lastIndex;

}

if(
last <
text.length
){

pushSegment(
result,
text.slice(last),
selectedLocale
);

}

if(
!result.length
){

pushSegment(
result,
text,
selectedLocale
);

}

return result;

}


const regex =
/(?:PETS\s*&\s*DOGUE|[A-Za-z][A-Za-z'’.-]*(?:\s+[A-Za-z][A-Za-z'’.-]*)*)/g;

let last = 0;

let match;

while(
(
match =
regex.exec(text)
)
){

if(
match.index >
last
){

pushSegment(
result,
text.slice(
last,
match.index
),
selectedLocale
);

}

pushSegment(
result,
match[0],
"en-GB"
);

last =
regex.lastIndex;

}

if(
last <
text.length
){

pushSegment(
result,
text.slice(last),
selectedLocale
);

}

if(
!result.length
){

pushSegment(
result,
text,
selectedLocale
);

}

return result;

}


function buildQueue(text){

const result = [];

for(
const chunk
of splitChunks(
semanticText(text)
)
){

for(
const segment
of splitByLanguage(chunk)
){

result.push(
segment
);

}

}

return result;

}


/* =========================================================
VOICE
========================================================= */

function chooseVoice(lang){

if(
!(
"speechSynthesis" in window
)
){

return null;

}

const voices =
speechSynthesis
.getVoices();

if(
!voices.length
){

return null;

}

const wanted =
String(
lang ||
""
)
.toLowerCase();

return (

voices.find(
voice=>
String(
voice.lang ||
""
)
.toLowerCase() ===
wanted
)

||

voices.find(
voice=>
String(
voice.lang ||
""
)
.toLowerCase()
.startsWith(
wanted.split("-")[0]
)
)

||

null

);

}


/* =========================================================
BUTTON STATE
========================================================= */

function updateButtons(){

const l =
labels();

document
.querySelectorAll(
".pd-a11y-speaker"
)
.forEach(
button=>{

const active =
button ===
activeButton &&
isReading;

button.setAttribute(
"aria-label",
active
?l.stop
:l.listen
);

button.setAttribute(
"title",
active
?l.stop
:l.listen
);

button.setAttribute(
"aria-pressed",
active
?"true"
:"false"
);

button.dataset.speaking =
active
?"true"
:"false";

}
);

}


/* =========================================================
STOP
========================================================= */

function stopReading(
shouldAnnounce=false
){

manuallyStopped =
true;

isReading =
false;

queue =
[];

queueIndex =
0;

activeUtterance =
null;

activeButton =
null;

try{

if(
"speechSynthesis" in window &&
(
speechSynthesis.speaking ||
speechSynthesis.pending ||
speechSynthesis.paused
)
){

speechSynthesis.cancel();

}

}catch(error){
}

updateButtons();

if(
shouldAnnounce
){

announce(
labels().stopped
);

}

}


/* =========================================================
SPEAK
========================================================= */

function speakNext(){

if(
manuallyStopped ||
!isReading
){

return;

}

if(
queueIndex >=
queue.length
){

isReading =
false;

activeUtterance =
null;

activeButton =
null;

updateButtons();

return;

}

const item =
queue[
queueIndex
];

const utterance =
new SpeechSynthesisUtterance(
item.text
);

activeUtterance =
utterance;

utterance.lang =
item.lang;

utterance.rate =
0.94;

utterance.pitch =
1;

utterance.volume =
1;

const voice =
chooseVoice(
item.lang
);

if(voice){

utterance.voice =
voice;

}

utterance.onend =
()=>{

if(
manuallyStopped
){

return;

}

queueIndex +=
1;

speakNext();

};

utterance.onerror =
event=>{

if(
manuallyStopped ||
event.error ===
"canceled" ||
event.error ===
"interrupted"
){

return;

}

queueIndex +=
1;

speakNext();

};

try{

speechSynthesis.resume();

speechSynthesis.speak(
utterance
);

}catch(error){

queueIndex +=
1;

speakNext();

}

}


/* =========================================================
START
========================================================= */

function startReading(
element,
button
){

const l =
labels();

if(
!(
"speechSynthesis" in window
) ||
typeof SpeechSynthesisUtterance ===
"undefined"
){

announce(
l.unsupported
);

return;

}

if(
isReading &&
activeButton ===
button
){

stopReading(
true
);

return;

}

if(
isReading ||
speechSynthesis.speaking ||
speechSynthesis.pending
){

try{

speechSynthesis.cancel();

}catch(error){
}

}

const text =
textOf(
element
);

if(!text){

announce(
l.empty
);

return;

}

const prepared =
buildQueue(
text
);

if(
!prepared.length
){

announce(
l.empty
);

return;

}

queue =
prepared;

queueIndex =
0;

manuallyStopped =
false;

isReading =
true;

activeButton =
button;

updateButtons();

announce(
l.reading
);


/*
IMPORTANT:
Speech begins immediately inside the real user click.
Do not move this into setTimeout.
This fixes silent playback on Android/Chrome.
*/

speakNext();

}


/* =========================================================
CREATE ONE SPEAKER
========================================================= */

function createButton(element){

if(
!element ||
element.nodeType !==
1
){

return;

}

if(
element.matches(
"button,a,input,select,textarea"
)
){

return;

}

if(
textOf(element).length <
35
){

return;

}

if(
element.querySelector(
":scope > .pd-a11y-speaker"
)
){

return;

}

element.classList.add(
"pd-a11y-readable"
);

if(
!element.id
){

idCounter +=
1;

element.id =
"pd-a11y-topic-" +
idCounter;

}

const button =
document.createElement(
"button"
);

button.type =
"button";

button.className =
"pd-a11y-speaker";

button.setAttribute(
"data-pd-a11y-speaker",
"1"
);

button.setAttribute(
"data-pd-speech-ignore",
"true"
);

button.setAttribute(
"aria-controls",
element.id
);

button.setAttribute(
"aria-pressed",
"false"
);

button.innerHTML =
icon();

button.addEventListener(
"click",
event=>{

event.preventDefault();

event.stopPropagation();

event.stopImmediatePropagation();

startReading(
element,
button
);

}
);

element.appendChild(
button
);

}


/* =========================================================
COLLECT TOPICS
========================================================= */

function collectTopics(){

const candidates =
new Set();

document
.querySelectorAll(
READABLE_SELECTORS
)
.forEach(
element=>{

candidates.add(
element
);

}
);


/*
Top-level section is added only when it is
a real single topic, not a container holding
several smaller readable cards.
*/

document
.querySelectorAll(
"main > section"
)
.forEach(
section=>{

const nested =
Array.from(
section.querySelectorAll(
READABLE_SELECTORS
)
)
.some(
element=>
element !==
section
);

if(
!nested &&
textOf(section).length >=
70
){

candidates.add(
section
);

}

}
);


return Array
.from(
candidates
)
.filter(
element=>{

if(
element.hasAttribute(
"data-pd-readable"
)
){

return true;

}

const nestedCandidate =
Array.from(
element.querySelectorAll(
READABLE_SELECTORS
)
)
.some(
child=>
child !==
element
);

return (

!nestedCandidate

||

element.matches(
[
".hero-content",
".intro-photo",
".how",
".prize-box",
".rules",
".impact-copy",
".rescue-copy",
".publish-strip",
".community-note-inner",
"article",
".card",
".listing-card"
].join(",")
)

);

}
);

}


/* =========================================================
INSTALL
========================================================= */

function install(){

/*
First remove every speaker made by older
page-level narration systems.
*/

removeOldSpeakers();


/*
Safety: this version itself may never show
more than one direct speaker in one topic.
*/

document
.querySelectorAll(
".pd-a11y-speaker"
)
.forEach(
button=>{

const parent =
button.parentElement;

if(!parent){

return;

}

const siblings =
parent.querySelectorAll(
":scope > .pd-a11y-speaker"
);

if(
siblings.length >
1 &&
button !==
siblings[0]
){

button.remove();

}

}
);


for(
const element
of collectTopics()
){

createButton(
element
);

}

updateButtons();

}


/* =========================================================
LANGUAGE CHANGE
========================================================= */

function onLanguageChange(){

if(
isReading
){

stopReading(
false
);

}

setTimeout(
()=>{

install();

updateButtons();

},
60
);

}


/* =========================================================
DYNAMIC CONTENT
========================================================= */

const observer =
new MutationObserver(
mutations=>{

if(
!mutations.some(
mutation=>
mutation.type ===
"childList" &&
mutation.addedNodes.length
)
){

return;

}

clearTimeout(
refreshTimer
);

refreshTimer =
setTimeout(
install,
120
);

}
);


/* =========================================================
PUBLIC API
========================================================= */

window.PetsDogueNarration = {

speakElement(element){

if(
typeof element ===
"string"
){

element =
document.querySelector(
element
);

}

if(!element){

return false;

}

createButton(
element
);

const button =
element.querySelector(
":scope > .pd-a11y-speaker"
);

if(!button){

return false;

}

startReading(
element,
button
);

return true;

},


speak(text){

if(
!text ||
!(
"speechSynthesis" in window
)
){

return false;

}

if(
isReading ||
speechSynthesis.speaking ||
speechSynthesis.pending
){

try{

speechSynthesis.cancel();

}catch(error){
}

}

queue =
buildQueue(
text
);

if(
!queue.length
){

return false;

}

queueIndex =
0;

manuallyStopped =
false;

isReading =
true;

activeButton =
null;

announce(
labels().reading
);

speakNext();

return true;

},


stop(){

stopReading(
true
);

},


isSpeaking(){

return isReading;

},


refresh(){

install();

}

};


/* =========================================================
EVENTS
========================================================= */

window.addEventListener(
"petsdogue:languagechange",
onLanguageChange
);

window.addEventListener(
"languagechange",
onLanguageChange
);

window.addEventListener(
"storage",
event=>{

if(
event.key ===
LANGUAGE_KEY
){

onLanguageChange();

}

}
);

document.addEventListener(
"visibilitychange",
()=>{

if(
document.hidden &&
isReading
){

stopReading(
false
);

}

}
);

window.addEventListener(
"beforeunload",
()=>{

stopReading(
false
);

}
);


/* =========================================================
INIT
========================================================= */

function init(){

addStyles();

ensureLiveRegion();

install();

if(
"speechSynthesis" in window
){

try{

speechSynthesis.getVoices();

}catch(error){
}

}

if(
document.body
){

observer.observe(
document.body,
{
childList:true,
subtree:true
}
);

}

}


if(
document.readyState ===
"loading"
){

document.addEventListener(
"DOMContentLoaded",
init,
{
once:true
}
);

}else{

init();

}

})();
