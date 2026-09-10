"use strict";

/*
=========================================================
PETS & DOGUE
GLOBAL MULTILINGUAL ACCESSIBILITY NARRATION
=========================================================

- one speaker per topic
- no duplicate speakers
- one central click handler
- fixes Android/Chrome silent speech after cancel()
- reads the currently selected language
- English words inside Cyrillic/Arabic/Hindi text use English voice
- meaningful symbols are spoken logically
- dynamic cards are supported
=========================================================
*/

(function(){

"use strict";


/* =========================================================
CONFIG
========================================================= */

const LANGUAGE_KEY =
"pets_dogue_language";

const SUPPORTED_LANGUAGES = [
"en","uk","ru","fr","de","es","it","pt","nl","pl",
"cs","sk","hu","ro","bg","el","sv","da","no","fi",
"tr","ar","hi"
];

const LANGUAGE_ALIASES = {
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};

const SPEECH_LOCALES = {
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

const NON_LATIN_LANGUAGES =
new Set([
"ru",
"uk",
"bg",
"el",
"ar",
"hi"
]);


/* =========================================================
ACCESSIBILITY LABELS
========================================================= */

const LABELS = {

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
reading:"Este contenido se está leyendo.",
stopped:"Lectura detenida.",
empty:"No hay texto para leer.",
unsupported:"Este navegador no admite lectura de texto."
},

it:{
listen:"Ascolta questo contenuto",
stop:"Interrompi lettura",
reading:"Questo contenuto viene letto.",
stopped:"Lettura interrotta.",
empty:"Nessun testo da leggere.",
unsupported:"Questo browser non supporta la lettura vocale."
},

pt:{
listen:"Ouvir este conteúdo",
stop:"Parar leitura",
reading:"Este conteúdo está a ser lido.",
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
reading:"Conținutul este citit cu voce tare.",
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


/* =========================================================
MEANINGFUL SYMBOLS
========================================================= */

const SEMANTICS = {

en:{
location:"Location",
phone:"Phone number",
card:"Bank card",
email:"Email",
website:"Website",
winner:"Winner",
prize:"Prize",
home:"Home",
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
home:"Дім",
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
home:"Дом",
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
home:"Domicile",
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
home:"Zuhause",
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
home:"Hogar",
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
home:"Casa",
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
home:"Casa",
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
home:"Thuis",
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
home:"Dom",
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
home:"Domov",
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
home:"Domov",
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
home:"Otthon",
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
home:"Casă",
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
home:"Дом",
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
home:"Σπίτι",
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
home:"Hem",
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
home:"Hjem",
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
home:"Hjem",
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
home:"Koti",
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
home:"Ev",
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
home:"المنزل",
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
home:"घर",
date:"तारीख",
time:"समय",
distance:"दूरी",
favourite:"पसंदीदा",
pounds:"पाउंड"
}

};


/* =========================================================
SELECTORS
========================================================= */

const SPEAKER_SELECTOR = [
"[data-pd-speech-toggle]",
"[data-read-aloud]",
".speaker-button",
".speaker-btn",
".listen-button",
".read-aloud-button",
".pd-local-speaker"
].join(",");

const READABLE_SELECTOR = [

"[data-pd-readable]",

"main article",

"main .article-card",

"main .story-card",

"main .feature-card",

"main .editorial-card",

"main .magazine-card",

"main .content-card",

"main .world-card",

"main .category-card",

"main .rubric-card",

"main .topic-card",

"main .card",

"main .listing-card",

"main .community-note-inner",

"main .impact-copy",

"main .rescue-copy",

"main .publish-strip",

".hero-content"

].join(",");

const SECTION_SELECTOR =
"main > section";


/* =========================================================
STATE
========================================================= */

let activeButton =
null;

let activeElement =
null;

let activeUtterance =
null;

let speechQueue =
[];

let speechIndex =
0;

let speaking =
false;

let stopped =
false;

let readableCounter =
0;

let refreshTimer =
null;

let startTimer =
null;


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
LANGUAGE_ALIASES[code] ||
code;

return SUPPORTED_LANGUAGES.includes(
code
)
?code
:"en";

}


function getCurrentLanguage(){

try{

if(
window.PetsDogueLanguage &&
typeof window.PetsDogueLanguage.getCurrentLanguage ===
"function"
){

const result =
window.PetsDogueLanguage
.getCurrentLanguage();

if(
typeof result ===
"string"
){

return normalizeLanguage(
result
);

}

if(
result &&
typeof result.code ===
"string"
){

return normalizeLanguage(
result.code
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


function getLocale(){

return SPEECH_LOCALES[
getCurrentLanguage()
] ||
"en-GB";

}


function getLabels(){

return LABELS[
getCurrentLanguage()
] ||
LABELS.en;

}


function getSemantics(){

return SEMANTICS[
getCurrentLanguage()
] ||
SEMANTICS.en;

}


/* =========================================================
SCREEN READER STATUS
========================================================= */

function ensureLiveRegion(){

let element =
document.getElementById(
"pdNarrationStatus"
);

if(element){
return element;
}

element =
document.createElement(
"div"
);

element.id =
"pdNarrationStatus";

element.className =
"pd-sr-only";

element.setAttribute(
"role",
"status"
);

element.setAttribute(
"aria-live",
"polite"
);

element.setAttribute(
"aria-atomic",
"true"
);

element.setAttribute(
"data-pd-speech-ignore",
"true"
);

document.body.appendChild(
element
);

return element;

}


function announce(text){

const region =
ensureLiveRegion();

region.textContent =
"";

window.setTimeout(
function(){

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
"pdNarrationStyles"
)
){

return;
}

const style =
document.createElement(
"style"
);

style.id =
"pdNarrationStyles";

style.setAttribute(
"data-pd-speech-ignore",
"true"
);

style.textContent = `

.pd-sr-only{
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

.pd-readable-block{
position:relative;
}

.pd-local-speaker{
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
background:rgba(7,7,7,.92);
color:#fff;
cursor:pointer;
z-index:40;
box-shadow:0 4px 16px rgba(0,0,0,.2);
-webkit-tap-highlight-color:transparent;
}

html[dir="rtl"] .pd-local-speaker{
right:auto;
left:14px;
}

.pd-local-speaker svg{
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

.pd-local-speaker:focus-visible{
outline:3px solid #65e51f;
outline-offset:3px;
}

.pd-local-speaker[data-speaking="true"]{
border-color:#65e51f;
box-shadow:
0 0 0 4px rgba(101,229,31,.16),
0 4px 18px rgba(0,0,0,.28);
}

.pd-local-speaker[data-speaking="true"]::after{
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
.pd-local-speaker[data-speaking="true"]::after{
right:auto;
left:-1px;
}

@media(max-width:700px){

.pd-local-speaker{
width:39px;
height:39px;
top:10px;
right:10px;
}

html[dir="rtl"] .pd-local-speaker{
right:auto;
left:10px;
}

.pd-local-speaker svg{
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

function speakerSvg(){

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
VISIBLE TEXT
========================================================= */

function elementVisible(element){

if(
!element ||
element.nodeType !== 1
){

return false;
}

const style =
window.getComputedStyle(
element
);

return !(
style.display === "none" ||
style.visibility === "hidden" ||
style.visibility === "collapse"
);

}


function excludedTextNode(element){

if(!element){
return true;
}

return Boolean(
element.closest(
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
".pd-local-speaker",
".pd-sr-only"
].join(",")
)
);

}


function getTextFromElement(element){

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
excludedTextNode(
parent
) ||
!elementVisible(
parent
)
){

return NodeFilter.FILTER_REJECT;
}

return NodeFilter.FILTER_ACCEPT;

}
}
);

const parts =
[];

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
parts.push(value);
}

}

return parts
.join(" ")
.replace(/\s+/g," ")
.trim();

}


/* =========================================================
SEMANTIC TEXT PREPARATION
========================================================= */

function prepareSemanticText(text){

const s =
getSemantics();

let value =
String(
text ||
""
);

value =
value.replace(
/💳|🏦/gu,
` ${s.card}: `
);

value =
value.replace(
/📞|☎️?|📱/gu,
` ${s.phone}: `
);

value =
value.replace(
/📧|✉️?/gu,
` ${s.email}: `
);

value =
value.replace(
/🌐|🔗/gu,
` ${s.website}: `
);

value =
value.replace(
/📍|🗺️?/gu,
` ${s.location}: `
);

value =
value.replace(
/🏆/gu,
` ${s.winner}: `
);

value =
value.replace(
/🎁/gu,
` ${s.prize}: `
);

value =
value.replace(
/🏠|⌂/gu,
` ${s.home}: `
);

value =
value.replace(
/📅|🗓️?/gu,
` ${s.date}: `
);

value =
value.replace(
/⏰|🕒/gu,
` ${s.time}: `
);

value =
value.replace(
/📏/gu,
` ${s.distance}: `
);

value =
value.replace(
/❤️|♥|♡/gu,
` ${s.favourite}: `
);

value =
value.replace(
/£\s*([0-9]+(?:[.,][0-9]+)?)/g,
function(
match,
amount
){

return ` ${amount} ${s.pounds} `;

}
);


/*
Bank card style numbers.
*/

value =
value.replace(
/\b(?:\d{4}[\s-]?){3}\d{4}\b/g,
function(number){

const digits =
number
.replace(/\D/g,"")
.split("")
.join(" ");

return ` ${s.card}: ${digits} `;

}
);


/*
Long telephone numbers.
Speak digits separately.
*/

value =
value.replace(
/(?:\+\s*)?\d[\d\s().-]{7,}\d/g,
function(number){

const digits =
number
.replace(/\D/g,"")
.split("")
.join(" ");

return ` ${s.phone}: ${digits} `;

}
);


/*
Decorative symbols must not be announced as
"black diamond", "office pen", etc.
*/

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
/\s+[+＋]\s+/gu,
", "
);

value =
value.replace(
/\s*·\s*/g,
", "
);

value =
value.replace(
/\s*•\s*/g,
", "
);

value =
value.replace(
/\s*\/\s*/g,
", "
);

value =
value.replace(
(/\s+/g),
" "
);

value =
value.replace(
/\s+([,.!?;:])/g,
"$1"
);

return value.trim();

}


/* =========================================================
TEXT CHUNKS
========================================================= */

function splitLongText(
text,
maxLength
){

const words =
text.split(/\s+/);

const output =
[];

let current =
"";

words.forEach(
function(word){

const candidate =
current
?current + " " + word
:word;

if(
candidate.length >
maxLength &&
current
){

output.push(
current
);

current =
word;

}else{

current =
candidate;
}

}
);

if(current){
output.push(current);
}

return output;

}


function makeChunks(text){

const MAX_LENGTH =
220;

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
[clean];

const result =
[];

sentences.forEach(
function(sentence){

const value =
sentence.trim();

if(!value){
return;
}

if(
value.length >
MAX_LENGTH
){

splitLongText(
value,
MAX_LENGTH
)
.forEach(
function(part){

result.push(
part
);

}
);

}else{

result.push(
value
);

}

}
);

return result;

}


/* =========================================================
MULTILINGUAL VOICE SEGMENTS
========================================================= */

function addQueueItem(
queue,
text,
locale
){

const clean =
String(
text ||
""
)
.replace(/\s+/g," ")
.trim();

if(!clean){
return;
}

queue.push({
text:clean,
locale
});

}


function segmentChunk(
text
){

const language =
getCurrentLanguage();

const selectedLocale =
getLocale();

const queue =
[];


/*
For Russian, Ukrainian, Bulgarian, Greek,
Arabic and Hindi pages:
Latin words such as British Shorthair,
Pomeranian, London, PETS & DOGUE
are spoken with an English voice instead
of being read as phonetic local-language text.
*/

if(
NON_LATIN_LANGUAGES.has(
language
)
){

const regex =
/(?:PETS\s*&\s*DOGUE|[A-Za-z][A-Za-z0-9'’&.-]*(?:\s+[A-Za-z][A-Za-z0-9'’&.-]*)*)/g;

let lastIndex =
0;

let match;

while(
(
match =
regex.exec(text)
)
){

if(
match.index >
lastIndex
){

addQueueItem(
queue,
text.slice(
lastIndex,
match.index
),
selectedLocale
);

}

addQueueItem(
queue,
match[0],
"en-GB"
);

lastIndex =
regex.lastIndex;

}

if(
lastIndex <
text.length
){

addQueueItem(
queue,
text.slice(
lastIndex
),
selectedLocale
);

}

return queue;

}


/*
For Latin languages keep the selected language,
but PETS & DOGUE remains the English brand.
*/

const brandRegex =
/PETS\s*&\s*DOGUE/gi;

let lastIndex =
0;

let match;

while(
(
match =
brandRegex.exec(text)
)
){

if(
match.index >
lastIndex
){

addQueueItem(
queue,
text.slice(
lastIndex,
match.index
),
selectedLocale
);

}

addQueueItem(
queue,
match[0],
"en-GB"
);

lastIndex =
brandRegex.lastIndex;

}

if(
lastIndex <
text.length
){

addQueueItem(
queue,
text.slice(
lastIndex
),
selectedLocale
);

}

if(!queue.length){

addQueueItem(
queue,
text,
selectedLocale
);

}

return queue;

}


function buildSpeechQueue(text){

const prepared =
prepareSemanticText(
text
);

const chunks =
makeChunks(
prepared
);

const queue =
[];

chunks.forEach(
function(chunk){

segmentChunk(
chunk
)
.forEach(
function(item){

queue.push(
item
);

}
);

}
);

return queue;

}


/* =========================================================
VOICE
========================================================= */

function chooseVoice(locale){

if(
!(
"speechSynthesis" in window
)
){

return null;
}

const voices =
window.speechSynthesis
.getVoices();

if(!voices.length){
return null;
}

const wanted =
String(
locale
)
.toLowerCase();

const exact =
voices.find(
function(voice){

return String(
voice.lang ||
""
)
.toLowerCase() ===
wanted;

}
);

if(exact){
return exact;
}

const language =
wanted.split("-")[0];

return voices.find(
function(voice){

return String(
voice.lang ||
""
)
.toLowerCase()
.startsWith(
language
);

}
) ||
null;

}


/* =========================================================
BUTTON LABELS
========================================================= */

function updateAllButtonLabels(){

const labels =
getLabels();

document
.querySelectorAll(
SPEAKER_SELECTOR
)
.forEach(
function(button){

const isActive =
button === activeButton &&
speaking;

const label =
isActive
?labels.stop
:labels.listen;

button.setAttribute(
"aria-label",
label
);

button.setAttribute(
"title",
label
);

button.setAttribute(
"aria-pressed",
isActive
?"true"
:"false"
);

button.dataset.speaking =
isActive
?"true"
:"false";

}
);

}


/* =========================================================
STOP
========================================================= */

function stopSpeech(
withAnnouncement
){

stopped =
true;

speaking =
false;

speechQueue =
[];

speechIndex =
0;

activeUtterance =
null;

activeElement =
null;

if(startTimer){

window.clearTimeout(
startTimer
);

startTimer =
null;

}

if(
"speechSynthesis" in window
){

try{

window.speechSynthesis.cancel();

}catch(error){
}

}

activeButton =
null;

updateAllButtonLabels();

if(withAnnouncement){

announce(
getLabels().stopped
);

}

}


/* =========================================================
SPEAK QUEUE
========================================================= */

function speakNext(){

if(
stopped ||
!speaking
){

return;
}

if(
speechIndex >=
speechQueue.length
){

speaking =
false;

stopped =
false;

activeButton =
null;

activeElement =
null;

activeUtterance =
null;

updateAllButtonLabels();

return;
}

const item =
speechQueue[
speechIndex
];

const utterance =
new SpeechSynthesisUtterance(
item.text
);

activeUtterance =
utterance;

utterance.lang =
item.locale;

utterance.rate =
0.96;

utterance.pitch =
1;

utterance.volume =
1;

const voice =
chooseVoice(
item.locale
);

if(voice){

utterance.voice =
voice;

}

utterance.onend =
function(){

if(stopped){
return;
}

speechIndex +=
1;

window.setTimeout(
speakNext,
35
);

};

utterance.onerror =
function(event){

if(
stopped ||
event.error === "canceled" ||
event.error === "interrupted"
){

return;
}

speechIndex +=
1;

window.setTimeout(
speakNext,
35
);

};

try{

window.speechSynthesis.resume();

window.speechSynthesis.speak(
utterance
);

}catch(error){

speechIndex +=
1;

window.setTimeout(
speakNext,
50
);

}

}


/* =========================================================
START READING
========================================================= */

function speakElement(
element,
button
){

const labels =
getLabels();

if(
!(
"speechSynthesis" in window
) ||
typeof window.SpeechSynthesisUtterance ===
"undefined"
){

announce(
labels.unsupported
);

return;
}


/*
Press same speaker = stop.
*/

if(
speaking &&
activeButton === button
){

stopSpeech(
true
);

return;
}


/*
Stop previous topic.
*/

stopSpeech(
false
);

const text =
getTextFromElement(
element
);

if(!text){

announce(
labels.empty
);

return;
}

const queue =
buildSpeechQueue(
text
);

if(!queue.length){

announce(
labels.empty
);

return;
}

speechQueue =
queue;

speechIndex =
0;

stopped =
false;

speaking =
true;

activeButton =
button;

activeElement =
element;

updateAllButtonLabels();

announce(
labels.reading
);


/*
Important Android Chrome fix:
speechSynthesis.cancel() followed immediately by speak()
can produce a green active button but no audio.

Small delay after cancel fixes that.
*/

startTimer =
window.setTimeout(
function(){

startTimer =
null;

if(
!stopped &&
speaking
){

try{

window.speechSynthesis.resume();

}catch(error){
}

speakNext();

}

},
90
);

}


/* =========================================================
TARGET RESOLUTION
========================================================= */

function resolveTarget(button){

if(!button){
return null;
}

const selector =
button.getAttribute(
"data-pd-speech-target"
);

if(selector){

try{

const target =
document.querySelector(
selector
);

if(target){
return target;
}

}catch(error){
}

}

const controls =
button.getAttribute(
"aria-controls"
);

if(controls){

const target =
document.getElementById(
controls
);

if(target){
return target;
}

}

return button.closest(
[
"[data-pd-readable]",
"article",
".article-card",
".story-card",
".feature-card",
".editorial-card",
".magazine-card",
".content-card",
".world-card",
".category-card",
".rubric-card",
".topic-card",
".card",
".listing-card",
".community-note-inner",
".impact-copy",
".rescue-copy",
".publish-strip",
".hero-content",
"section"
].join(",")
);

}


/* =========================================================
BUTTON NORMALISATION
========================================================= */

function prepareExistingSpeaker(
button
){

if(!button){
return;
}

button.setAttribute(
"data-pd-speech-toggle",
"true"
);

if(
button.tagName ===
"BUTTON"
){

button.type =
"button";

}

}


/* =========================================================
FIND EXISTING SPEAKER
========================================================= */

function findExistingSpeaker(
element
){

if(!element){
return null;
}

const direct =
Array.from(
element.children
)
.find(
function(child){

return child.matches &&
child.matches(
SPEAKER_SELECTOR
);

}
);

if(direct){
return direct;
}

const descendants =
Array.from(
element.querySelectorAll(
SPEAKER_SELECTOR
)
);

if(!descendants.length){
return null;
}


/*
If this exact block already contains a speaker,
reuse it instead of generating another one.
*/

for(
const button
of descendants
){

const targetSelector =
button.getAttribute(
"data-pd-speech-target"
);

const controls =
button.getAttribute(
"aria-controls"
);

if(
element.id &&
(
targetSelector ===
"#" + element.id ||
controls ===
element.id
)
){

return button;
}

}


/*
For explicitly readable blocks,
a speaker somewhere inside is considered its speaker.
*/

if(
element.hasAttribute(
"data-pd-readable"
)
){

return descendants[0];
}

return null;

}


/* =========================================================
CREATE SPEAKER
========================================================= */

function createSpeakerForElement(
element
){

if(
!element ||
element.dataset.pdNarrationReady ===
"true"
){

return;
}


/*
Never place a button inside another interactive control.
*/

if(
[
"BUTTON",
"A",
"INPUT",
"SELECT",
"TEXTAREA"
]
.includes(
element.tagName
)
){

return;
}

const readableText =
getTextFromElement(
element
);

if(
readableText.length <
35
){

return;
}

element.dataset.pdNarrationReady =
"true";

element.classList.add(
"pd-readable-block"
);

if(!element.id){

readableCounter +=
1;

element.id =
"pd-readable-" +
readableCounter;

}

const existing =
findExistingSpeaker(
element
);

if(existing){

prepareExistingSpeaker(
existing
);

if(
!existing.getAttribute(
"data-pd-speech-target"
)
){

existing.setAttribute(
"data-pd-speech-target",
"#" +
element.id
);

}

existing.setAttribute(
"aria-controls",
element.id
);

return;
}

const button =
document.createElement(
"button"
);

button.type =
"button";

button.className =
"pd-local-speaker";

button.setAttribute(
"data-pd-generated",
"true"
);

button.setAttribute(
"data-pd-speech-toggle",
"true"
);

button.setAttribute(
"data-pd-speech-target",
"#" +
element.id
);

button.setAttribute(
"aria-controls",
element.id
);

button.setAttribute(
"aria-pressed",
"false"
);

button.setAttribute(
"data-pd-speech-ignore",
"true"
);

button.innerHTML =
speakerSvg();

element.appendChild(
button
);

}


/* =========================================================
REMOVE DUPLICATES
========================================================= */

function cleanupDuplicateSpeakers(){

/*
Remove duplicated generated speakers when a block
already contains its own speaker.
*/

document
.querySelectorAll(
".pd-local-speaker"
)
.forEach(
function(button){

const parent =
button.parentElement;

if(!parent){
return;
}

const others =
Array.from(
parent.querySelectorAll(
SPEAKER_SELECTOR
)
)
.filter(
function(other){

return other !== button;

}
);

if(
others.length &&
button.getAttribute(
"data-pd-generated"
) ===
"true"
){

button.remove();

}

}
);


/*
If two buttons point to exactly the same target,
prefer the existing/manual one.
*/

const groups =
new Map();

document
.querySelectorAll(
SPEAKER_SELECTOR
)
.forEach(
function(button){

prepareExistingSpeaker(
button
);

const target =
resolveTarget(
button
);

if(!target){
return;
}

if(
!groups.has(
target
)
){

groups.set(
target,
[]
);

}

groups.get(
target
)
.push(
button
);

}
);

groups.forEach(
function(buttons){

if(
buttons.length <=
1
){

return;
}

let keep =
buttons.find(
function(button){

return button.getAttribute(
"data-pd-generated"
) !==
"true";

}
) ||
buttons[0];

buttons.forEach(
function(button){

if(
button === keep
){

return;
}

if(
button.getAttribute(
"data-pd-generated"
) ===
"true" ||
button.classList.contains(
"pd-local-speaker"
)
){

button.remove();

}

}
);

}
);

}


/* =========================================================
INSTALL
========================================================= */

function installLocalSpeakers(){

/*
First recognise all speakers already present
inside page code.
*/

document
.querySelectorAll(
SPEAKER_SELECTOR
)
.forEach(
prepareExistingSpeaker
);

const elements =
new Set();

document
.querySelectorAll(
READABLE_SELECTOR
)
.forEach(
function(element){

elements.add(
element
);

}
);


/*
Top-level section receives its own speaker only if
it is genuinely one topic.

If the section already contains another readable card
or speaker, no extra section-level icon is created.

This removes the two-speaker problem.
*/

document
.querySelectorAll(
SECTION_SELECTOR
)
.forEach(
function(section){

const nestedSpeaker =
section.querySelector(
SPEAKER_SELECTOR
);

const nestedReadable =
Array.from(
section.querySelectorAll(
READABLE_SELECTOR
)
)
.some(
function(element){

return element !==
section;

}
);

if(
nestedSpeaker ||
nestedReadable
){

return;
}

const text =
getTextFromElement(
section
);

if(
text.length >=
70
){

elements.add(
section
);

}

}
);

elements.forEach(
function(element){

createSpeakerForElement(
element
);

}
);

cleanupDuplicateSpeakers();

updateAllButtonLabels();

}


/* =========================================================
ONE CENTRAL CLICK HANDLER
========================================================= */

/*
Capture phase is intentional.

Some old pages have their own previous narration click
handlers. Those handlers were causing:

1. speaker turns green
2. one handler starts audio
3. another handler immediately cancels it

We intercept the speaker click before the old handler,
so only this global narration engine runs.
*/

function handleSpeakerClick(
event
){

const target =
event.target;

if(
!target ||
!target.closest
){

return;
}

const button =
target.closest(
SPEAKER_SELECTOR
);

if(!button){
return;
}

event.preventDefault();

event.stopPropagation();

event.stopImmediatePropagation();

prepareExistingSpeaker(
button
);

const element =
resolveTarget(
button
);

if(!element){

announce(
getLabels().empty
);

return;
}

speakElement(
element,
button
);

}


/* =========================================================
LANGUAGE CHANGE
========================================================= */

function onLanguageChange(){

if(speaking){

stopSpeech(
false
);

}

window.setTimeout(
function(){

installLocalSpeakers();

updateAllButtonLabels();

},
80
);

}


/* =========================================================
DYNAMIC CONTENT
========================================================= */

const observer =
new MutationObserver(
function(mutations){

const changed =
mutations.some(
function(mutation){

return (
mutation.type ===
"childList" &&
mutation.addedNodes.length
);

}
);

if(!changed){
return;
}

window.clearTimeout(
refreshTimer
);

refreshTimer =
window.setTimeout(
function(){

installLocalSpeakers();

},
150
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

createSpeakerForElement(
element
);

let button =
element.querySelector(
":scope > [data-pd-speech-toggle]"
);

if(!button){

button =
findExistingSpeaker(
element
);

}

if(!button){
return false;
}

speakElement(
element,
button
);

return true;

},


speak(text){

if(!text){
return false;
}

if(
!(
"speechSynthesis" in window
)
){

announce(
getLabels().unsupported
);

return false;
}

stopSpeech(
false
);

speechQueue =
buildSpeechQueue(
text
);

if(
!speechQueue.length
){

return false;
}

speechIndex =
0;

stopped =
false;

speaking =
true;

activeButton =
null;

activeElement =
null;

announce(
getLabels().reading
);

startTimer =
window.setTimeout(
function(){

startTimer =
null;

try{

window.speechSynthesis.resume();

}catch(error){
}

speakNext();

},
90
);

return true;

},


stop(){

stopSpeech(
true
);

},


isSpeaking(){

return speaking;

},


refresh(){

installLocalSpeakers();

}

};


/* =========================================================
EVENTS
========================================================= */

document.addEventListener(
"click",
handleSpeakerClick,
true
);

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
function(event){

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
function(){

if(
document.hidden &&
speaking
){

stopSpeech(
false
);

}

}
);

window.addEventListener(
"beforeunload",
function(){

stopSpeech(
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

installLocalSpeakers();

if(
"speechSynthesis" in window
){

try{

window.speechSynthesis.getVoices();

window.speechSynthesis.addEventListener(
"voiceschanged",
function(){

updateAllButtonLabels();

},
{
once:true
}
);

}catch(error){
}

}

if(document.body){

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
