"use strict";

/*
=========================================================
PETS & DOGUE
GLOBAL ACCESSIBILITY + LOCAL TEXT NARRATION
=========================================================

Every article, story, card or editorial section can have
its own speaker button.

Press speaker:
- reads only that article / topic / section
- uses the currently selected site language
- keeps English words / brand names in English
- converts common icons into their meaning
- press again to stop
- pressing another speaker switches to that topic

Existing buttons are supported with:

data-pd-speech-toggle
data-pd-speech-target="#elementId"

Elements that must not be spoken:

data-pd-speech-ignore
=========================================================
*/

(function(){

"use strict";

/* =========================================================
SETTINGS
========================================================= */

const LANGUAGE_KEY = "pets_dogue_language";

const SUPPORTED_LANGUAGES = [
"en","uk","ru","fr","de","es","it","pt","nl","pl","cs","sk",
"hu","ro","bg","el","sv","da","no","fi","tr","ar","hi"
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

const LATIN_SITE_LANGUAGES = new Set([
"en","fr","de","es","it","pt","nl","pl","cs","sk","hu","ro",
"sv","da","no","fi","tr"
]);

/* =========================================================
ACCESSIBILITY TEXT
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
empty:"Il n’y a aucun texte à lire dans ce contenu.",
unsupported:"La lecture vocale n’est pas prise en charge par ce navigateur."
},

de:{
listen:"Diesen Inhalt anhören",
stop:"Vorlesen stoppen",
reading:"Dieser Inhalt wird vorgelesen.",
stopped:"Vorlesen gestoppt.",
empty:"In diesem Inhalt gibt es keinen vorlesbaren Text.",
unsupported:"Dieser Browser unterstützt keine Sprachausgabe."
},

es:{
listen:"Escuchar este contenido",
stop:"Detener lectura",
reading:"Este contenido se está leyendo en voz alta.",
stopped:"Lectura detenida.",
empty:"No hay texto para leer en este contenido.",
unsupported:"Este navegador no admite la lectura de texto."
},

it:{
listen:"Ascolta questo contenuto",
stop:"Interrompi lettura",
reading:"Questo contenuto viene letto ad alta voce.",
stopped:"Lettura interrotta.",
empty:"Non c’è testo da leggere in questo contenuto.",
unsupported:"Questo browser non supporta la lettura vocale."
},

pt:{
listen:"Ouvir este conteúdo",
stop:"Parar leitura",
reading:"Este conteúdo está a ser lido em voz alta.",
stopped:"Leitura parada.",
empty:"Não existe texto para ler neste conteúdo.",
unsupported:"Este navegador não suporta leitura de texto."
},

nl:{
listen:"Deze inhoud beluisteren",
stop:"Voorlezen stoppen",
reading:"Deze inhoud wordt voorgelezen.",
stopped:"Voorlezen gestopt.",
empty:"Er is geen leesbare tekst in deze inhoud.",
unsupported:"Deze browser ondersteunt geen tekst-naar-spraak."
},

pl:{
listen:"Posłuchaj tej treści",
stop:"Zatrzymaj czytanie",
reading:"Ta treść jest czytana na głos.",
stopped:"Czytanie zatrzymane.",
empty:"W tej treści nie ma tekstu do odczytania.",
unsupported:"Ta przeglądarka nie obsługuje odczytywania tekstu."
},

cs:{
listen:"Poslechnout tento obsah",
stop:"Zastavit čtení",
reading:"Tento obsah se čte nahlas.",
stopped:"Čtení zastaveno.",
empty:"V tomto obsahu není text ke čtení.",
unsupported:"Tento prohlížeč nepodporuje převod textu na řeč."
},

sk:{
listen:"Vypočuť tento obsah",
stop:"Zastaviť čítanie",
reading:"Tento obsah sa číta nahlas.",
stopped:"Čítanie zastavené.",
empty:"V tomto obsahu nie je text na čítanie.",
unsupported:"Tento prehliadač nepodporuje čítanie textu."
},

hu:{
listen:"A tartalom meghallgatása",
stop:"Felolvasás leállítása",
reading:"A tartalom felolvasása folyamatban.",
stopped:"A felolvasás leállt.",
empty:"Ebben a tartalomban nincs felolvasható szöveg.",
unsupported:"Ez a böngésző nem támogatja a szövegfelolvasást."
},

ro:{
listen:"Ascultă acest conținut",
stop:"Oprește citirea",
reading:"Acest conținut este citit cu voce tare.",
stopped:"Citirea a fost oprită.",
empty:"Nu există text de citit în acest conținut.",
unsupported:"Acest browser nu acceptă citirea textului."
},

bg:{
listen:"Прослушайте тази тема",
stop:"Спрете четенето",
reading:"Темата се чете на глас.",
stopped:"Четенето е спряно.",
empty:"В тази тема няма текст за четене.",
unsupported:"Този браузър не поддържа озвучаване на текст."
},

el:{
listen:"Ακούστε αυτό το περιεχόμενο",
stop:"Διακοπή ανάγνωσης",
reading:"Το περιεχόμενο διαβάζεται δυνατά.",
stopped:"Η ανάγνωση σταμάτησε.",
empty:"Δεν υπάρχει κείμενο για ανάγνωση.",
unsupported:"Αυτό το πρόγραμμα περιήγησης δεν υποστηρίζει ανάγνωση κειμένου."
},

sv:{
listen:"Lyssna på detta innehåll",
stop:"Stoppa uppläsningen",
reading:"Innehållet läses upp.",
stopped:"Uppläsningen stoppades.",
empty:"Det finns ingen text att läsa här.",
unsupported:"Den här webbläsaren stöder inte textuppläsning."
},

da:{
listen:"Lyt til dette indhold",
stop:"Stop oplæsning",
reading:"Indholdet læses højt.",
stopped:"Oplæsningen er stoppet.",
empty:"Der er ingen tekst at læse her.",
unsupported:"Denne browser understøtter ikke tekst-til-tale."
},

no:{
listen:"Lytt til dette innholdet",
stop:"Stopp opplesing",
reading:"Innholdet leses høyt.",
stopped:"Opplesingen er stoppet.",
empty:"Det finnes ingen tekst å lese her.",
unsupported:"Denne nettleseren støtter ikke tekst-til-tale."
},

fi:{
listen:"Kuuntele tämä sisältö",
stop:"Lopeta lukeminen",
reading:"Sisältöä luetaan ääneen.",
stopped:"Lukeminen lopetettiin.",
empty:"Tässä sisällössä ei ole luettavaa tekstiä.",
unsupported:"Tämä selain ei tue tekstin puheeksi muuntamista."
},

tr:{
listen:"Bu içeriği dinle",
stop:"Okumayı durdur",
reading:"Bu içerik sesli okunuyor.",
stopped:"Okuma durduruldu.",
empty:"Bu içerikte okunabilir metin yok.",
unsupported:"Bu tarayıcı metinden sese özelliğini desteklemiyor."
},

ar:{
listen:"استمع إلى هذا المحتوى",
stop:"إيقاف القراءة",
reading:"تتم قراءة هذا المحتوى بصوت عالٍ.",
stopped:"تم إيقاف القراءة.",
empty:"لا يوجد نص قابل للقراءة في هذا المحتوى.",
unsupported:"هذا المتصفح لا يدعم تحويل النص إلى كلام."
},

hi:{
listen:"इस विषय को सुनें",
stop:"पढ़ना बंद करें",
reading:"इस विषय को आवाज़ में पढ़ा जा रहा है।",
stopped:"पढ़ना बंद कर दिया गया।",
empty:"इस विषय में पढ़ने योग्य टेक्स्ट नहीं है।",
unsupported:"यह ब्राउज़र टेक्स्ट-टू-स्पीच का समर्थन नहीं करता।"
}

};

/* =========================================================
SEMANTIC WORDS FOR ICONS / SYMBOLS
========================================================= */

const SEMANTIC_LABELS = {

en:{
location:"Location",
phone:"Phone number",
bankCard:"Bank card",
email:"Email",
website:"Website",
address:"Address",
date:"Date",
time:"Time",
price:"Price",
pounds:"pounds",
euros:"euros",
dollars:"dollars",
and:"and"
},

uk:{
location:"Місцезнаходження",
phone:"Номер телефону",
bankCard:"Банківська картка",
email:"Електронна пошта",
website:"Вебсайт",
address:"Адреса",
date:"Дата",
time:"Час",
price:"Ціна",
pounds:"фунтів",
euros:"євро",
dollars:"доларів",
and:"і"
},

ru:{
location:"Местоположение",
phone:"Номер телефона",
bankCard:"Банковская карта",
email:"Электронная почта",
website:"Веб-сайт",
address:"Адрес",
date:"Дата",
time:"Время",
price:"Цена",
pounds:"фунтов",
euros:"евро",
dollars:"долларов",
and:"и"
},

fr:{
location:"Localisation",
phone:"Numéro de téléphone",
bankCard:"Carte bancaire",
email:"E-mail",
website:"Site web",
address:"Adresse",
date:"Date",
time:"Heure",
price:"Prix",
pounds:"livres",
euros:"euros",
dollars:"dollars",
and:"et"
},

de:{
location:"Standort",
phone:"Telefonnummer",
bankCard:"Bankkarte",
email:"E-Mail",
website:"Webseite",
address:"Adresse",
date:"Datum",
time:"Uhrzeit",
price:"Preis",
pounds:"Pfund",
euros:"Euro",
dollars:"Dollar",
and:"und"
},

es:{
location:"Ubicación",
phone:"Número de teléfono",
bankCard:"Tarjeta bancaria",
email:"Correo electrónico",
website:"Sitio web",
address:"Dirección",
date:"Fecha",
time:"Hora",
price:"Precio",
pounds:"libras",
euros:"euros",
dollars:"dólares",
and:"y"
},

it:{
location:"Posizione",
phone:"Numero di telefono",
bankCard:"Carta bancaria",
email:"E-mail",
website:"Sito web",
address:"Indirizzo",
date:"Data",
time:"Ora",
price:"Prezzo",
pounds:"sterline",
euros:"euro",
dollars:"dollari",
and:"e"
},

pt:{
location:"Localização",
phone:"Número de telefone",
bankCard:"Cartão bancário",
email:"E-mail",
website:"Site",
address:"Endereço",
date:"Data",
time:"Hora",
price:"Preço",
pounds:"libras",
euros:"euros",
dollars:"dólares",
and:"e"
},

nl:{
location:"Locatie",
phone:"Telefoonnummer",
bankCard:"Bankkaart",
email:"E-mail",
website:"Website",
address:"Adres",
date:"Datum",
time:"Tijd",
price:"Prijs",
pounds:"pond",
euros:"euro",
dollars:"dollar",
and:"en"
},

pl:{
location:"Lokalizacja",
phone:"Numer telefonu",
bankCard:"Karta bankowa",
email:"E-mail",
website:"Strona internetowa",
address:"Adres",
date:"Data",
time:"Czas",
price:"Cena",
pounds:"funtów",
euros:"euro",
dollars:"dolarów",
and:"i"
},

cs:{
location:"Poloha",
phone:"Telefonní číslo",
bankCard:"Bankovní karta",
email:"E-mail",
website:"Web",
address:"Adresa",
date:"Datum",
time:"Čas",
price:"Cena",
pounds:"liber",
euros:"eur",
dollars:"dolarů",
and:"a"
},

sk:{
location:"Poloha",
phone:"Telefónne číslo",
bankCard:"Banková karta",
email:"E-mail",
website:"Web",
address:"Adresa",
date:"Dátum",
time:"Čas",
price:"Cena",
pounds:"libier",
euros:"eur",
dollars:"dolárov",
and:"a"
},

hu:{
location:"Hely",
phone:"Telefonszám",
bankCard:"Bankkártya",
email:"E-mail",
website:"Weboldal",
address:"Cím",
date:"Dátum",
time:"Idő",
price:"Ár",
pounds:"font",
euros:"euró",
dollars:"dollár",
and:"és"
},

ro:{
location:"Locație",
phone:"Număr de telefon",
bankCard:"Card bancar",
email:"E-mail",
website:"Site web",
address:"Adresă",
date:"Dată",
time:"Oră",
price:"Preț",
pounds:"lire",
euros:"euro",
dollars:"dolari",
and:"și"
},

bg:{
location:"Местоположение",
phone:"Телефонен номер",
bankCard:"Банкова карта",
email:"Имейл",
website:"Уебсайт",
address:"Адрес",
date:"Дата",
time:"Час",
price:"Цена",
pounds:"паунда",
euros:"евро",
dollars:"долара",
and:"и"
},

el:{
location:"Τοποθεσία",
phone:"Αριθμός τηλεφώνου",
bankCard:"Τραπεζική κάρτα",
email:"Ηλεκτρονικό ταχυδρομείο",
website:"Ιστότοπος",
address:"Διεύθυνση",
date:"Ημερομηνία",
time:"Ώρα",
price:"Τιμή",
pounds:"λίρες",
euros:"ευρώ",
dollars:"δολάρια",
and:"και"
},

sv:{
location:"Plats",
phone:"Telefonnummer",
bankCard:"Bankkort",
email:"E-post",
website:"Webbplats",
address:"Adress",
date:"Datum",
time:"Tid",
price:"Pris",
pounds:"pund",
euros:"euro",
dollars:"dollar",
and:"och"
},

da:{
location:"Placering",
phone:"Telefonnummer",
bankCard:"Bankkort",
email:"E-mail",
website:"Websted",
address:"Adresse",
date:"Dato",
time:"Tid",
price:"Pris",
pounds:"pund",
euros:"euro",
dollars:"dollar",
and:"og"
},

no:{
location:"Sted",
phone:"Telefonnummer",
bankCard:"Bankkort",
email:"E-post",
website:"Nettsted",
address:"Adresse",
date:"Dato",
time:"Tid",
price:"Pris",
pounds:"pund",
euros:"euro",
dollars:"dollar",
and:"og"
},

fi:{
location:"Sijainti",
phone:"Puhelinnumero",
bankCard:"Pankkikortti",
email:"Sähköposti",
website:"Verkkosivusto",
address:"Osoite",
date:"Päivämäärä",
time:"Aika",
price:"Hinta",
pounds:"puntaa",
euros:"euroa",
dollars:"dollaria",
and:"ja"
},

tr:{
location:"Konum",
phone:"Telefon numarası",
bankCard:"Banka kartı",
email:"E-posta",
website:"Web sitesi",
address:"Adres",
date:"Tarih",
time:"Saat",
price:"Fiyat",
pounds:"sterlin",
euros:"avro",
dollars:"dolar",
and:"ve"
},

ar:{
location:"الموقع",
phone:"رقم الهاتف",
bankCard:"بطاقة مصرفية",
email:"البريد الإلكتروني",
website:"الموقع الإلكتروني",
address:"العنوان",
date:"التاريخ",
time:"الوقت",
price:"السعر",
pounds:"جنيهات",
euros:"يورو",
dollars:"دولارات",
and:"و"
},

hi:{
location:"स्थान",
phone:"फ़ोन नंबर",
bankCard:"बैंक कार्ड",
email:"ईमेल",
website:"वेबसाइट",
address:"पता",
date:"तारीख",
time:"समय",
price:"कीमत",
pounds:"पाउंड",
euros:"यूरो",
dollars:"डॉलर",
and:"और"
}

};

/* =========================================================
ENGLISH WORDS THAT MUST STAY ENGLISH
========================================================= */

const ENGLISH_TERMS = [
"PETS AND DOGUE",
"PETS & DOGUE",
"Digital lifestyle platform",
"One world Every pet",
"One world. Every pet.",
"Pet Friendly Places",
"Pet Friendly",
"Cover Stars",
"Cover Star",
"Hall Of Fame",
"Marketplace",
"Edition",
"Issue",
"Club",
"Fashion",
"Health",
"Photos",
"Articles",
"Community",
"Contests",
"Partners",
"Rescue",
"Pomeranian",
"Cockapoo",
"British Shorthair"
];

const ENGLISH_TERMS_REGEX = new RegExp(
"(" +
ENGLISH_TERMS
.slice()
.sort(function(a,b){
return b.length-a.length;
})
.map(function(term){
return term.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
})
.join("|") +
")",
"gi"
);

/* =========================================================
READABLE BLOCKS
========================================================= */

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
"main .topic-card"
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

let speechParts =
[];

let speechPartIndex =
0;

let speaking =
false;

let stopped =
false;

let readableCounter =
0;

/* =========================================================
LANGUAGE
========================================================= */

function normalizeLanguage(value){

let code =
String(
value ||
"en"
)
.toLowerCase()
.trim();

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
LANGUAGE_ALIASES[
code
] ||
code;

return SUPPORTED_LANGUAGES.includes(
code
)
? code
: "en";

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

if(
saved
){

return normalizeLanguage(
saved
);

}

}catch(error){
}

if(
document.documentElement.lang
){

return normalizeLanguage(
document.documentElement.lang
);

}

return "en";

}

function getLocale(language){

const code =
normalizeLanguage(
language ||
getCurrentLanguage()
);

return SPEECH_LOCALES[
code
] ||
SPEECH_LOCALES.en;

}

function getLabels(){

const language =
getCurrentLanguage();

return LABELS[
language
] ||
LABELS.en;

}

function getSemanticLabels(){

const language =
getCurrentLanguage();

return SEMANTIC_LABELS[
language
] ||
SEMANTIC_LABELS.en;

}

/* =========================================================
SCREEN READER STATUS
========================================================= */

function ensureLiveRegion(){

let element =
document.getElementById(
"pdNarrationStatus"
);

if(
element
){

return element;

}

element =
document.createElement(
"div"
);

element.id =
"pdNarrationStatus";

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

element.className =
"pd-sr-only";

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
z-index:20;
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

.pd-local-speaker:hover{
transform:translateY(-1px);
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

@media(prefers-reduced-motion:reduce){

.pd-local-speaker{
transition:none!important;
}

}

`;

document.head.appendChild(
style
);

}

/* =========================================================
BUTTON ICON
========================================================= */

function speakerSvg(){

return `

<svg
viewBox="0 0 32 32"
focusable="false"
aria-hidden="true"
>

<path
d="M5 13h6l7-6v18l-7-6H5z"
></path>

<path
d="M22 11c2 1.5 3 3.1 3 5s-1 3.5-3 5"
></path>

<path
d="M25 7c3.3 2.5 5 5.5 5 9s-1.7 6.5-5 9"
></path>

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

if(
style.display ===
"none" ||
style.visibility ===
"hidden" ||
style.visibility ===
"collapse"
){

return false;

}

return true;

}

function excludedTextNode(element){

if(
!element
){

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

if(
!element
){

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

if(
!text
){

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

const textParts =
[];

let node;

while(
(
node =
walker.nextNode()
)
){

const text =
String(
node.nodeValue ||
""
)
.replace(/\s+/g," ")
.trim();

if(
text
){

textParts.push(
text
);

}

}

return textParts
.join(" ")
.replace(/\s+/g," ")
.trim();

}

/* =========================================================
SEMANTIC TEXT PREPARATION
========================================================= */

function replaceToken(
text,
pattern,
replacement
){

return text.replace(
pattern,
function(){

return " " +
replacement +
": ";

}
);

}

function prepareSemanticText(text){

const t =
getSemanticLabels();

let value =
String(
text ||
""
);

/*
Keep the PETS & DOGUE brand English.
*/

value =
value.replace(
/PETS\s*&\s*DOGUE/gi,
"PETS AND DOGUE"
);

/*
Meaningful icons.
*/

value =
replaceToken(
value,
/📍/gu,
t.location
);

value =
replaceToken(
value,
/(?:📞|☎️?|📱)/gu,
t.phone
);

value =
replaceToken(
value,
/💳/gu,
t.bankCard
);

value =
replaceToken(
value,
/(?:📧|✉️?|📩)/gu,
t.email
);

value =
replaceToken(
value,
/(?:🌐|🔗)/gu,
t.website
);

value =
replaceToken(
value,
/(?:🏠|🏡)/gu,
t.address
);

value =
replaceToken(
value,
/(?:📅|🗓️?)/gu,
t.date
);

value =
replaceToken(
value,
/(?:🕒|🕐|🕑|🕓|🕔|🕕|🕖|🕗|🕘|🕙|🕚|🕛|⏰)/gu,
t.time
);

value =
replaceToken(
value,
/💰/gu,
t.price
);

/*
Currency.
*/

value =
value.replace(
/£\s*([0-9][0-9.,]*)/g,
"$1 " +
t.pounds
);

value =
value.replace(
/€\s*([0-9][0-9.,]*)/g,
"$1 " +
t.euros
);

value =
value.replace(
/\$\s*([0-9][0-9.,]*)/g,
"$1 " +
t.dollars
);

/*
Ampersand becomes natural language.
PETS & DOGUE was already protected above.
*/

value =
value.replace(
/\s+&\s+/g,
" " +
t.and +
" "
);

/*
Decorative symbols become pauses or disappear.
They must not be spoken as strange system names.
*/

value =
value
.replace(
/[•·|¦]+/g,
", "
)
.replace(
/[→←↔↗↘↙↖]+/g,
" "
)
.replace(
/[◆◇♦◊✦✧★☆✓✔✅☑⌘◉●○■□▪▫]+/gu,
" "
)
.replace(
/[♡♥❤❤️]+/gu,
""
);

/*
Remove remaining unrecognised pictographic emoji.
Known useful icons have already been converted above.
*/

try{

value =
value.replace(
/\p{Extended_Pictographic}/gu,
" "
);

}catch(error){
}

/*
Punctuation remains as a natural pause.
It is not explicitly pronounced.
*/

value =
value
.replace(
/\s*([,;:])\s*/g,
"$1 "
)
.replace(
/\s*([.!?])\s*/g,
"$1 "
)
.replace(
/\s+/g,
" "
)
.trim();

return value;

}

/* =========================================================
TEXT SPLITTING
========================================================= */

function splitLongText(
text,
maxLength
){

const words =
text.split(
/\s+/
);

const output =
[];

let current =
"";

words.forEach(
function(word){

const candidate =
current
? current +
" " +
word
: word;

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

if(
current
){

output.push(
current
);

}

return output;

}

function makeChunks(text){

const MAX_LENGTH =
230;

const clean =
String(
text ||
""
)
.replace(/\s+/g," ")
.trim();

if(
!clean
){

return [];

}

const sentences =
clean.match(
/[^.!?。！？…]+[.!?。！？…]+|[^.!?。！？…]+$/g
) ||
[
clean
];

const result =
[];

let current =
"";

sentences.forEach(
function(sentence){

const value =
sentence.trim();

if(
!value
){

return;

}

if(
value.length >
MAX_LENGTH
){

if(
current
){

result.push(
current
);

current =
"";

}

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

return;

}

const candidate =
current
? current +
" " +
value
: value;

if(
candidate.length >
MAX_LENGTH
){

if(
current
){

result.push(
current
);

}

current =
value;

}else{

current =
candidate;

}

}
);

if(
current
){

result.push(
current
);

}

return result;

}

/* =========================================================
MIXED-LANGUAGE SPEECH
========================================================= */

function charScript(character){

if(
!character
){

return "common";

}

try{

if(
/\p{Script=Cyrillic}/u.test(
character
)
){

return "cyrillic";

}

if(
/\p{Script=Greek}/u.test(
character
)
){

return "greek";

}

if(
/\p{Script=Arabic}/u.test(
character
)
){

return "arabic";

}

if(
/\p{Script=Devanagari}/u.test(
character
)
){

return "devanagari";

}

if(
/\p{Script=Latin}/u.test(
character
)
){

return "latin";

}

}catch(error){
}

return "common";

}

function localeForScript(
script,
selectedLanguage
){

const selectedLocale =
getLocale(
selectedLanguage
);

if(
script ===
"latin"
){

return LATIN_SITE_LANGUAGES.has(
selectedLanguage
)
? selectedLocale
: SPEECH_LOCALES.en;

}

if(
script ===
"cyrillic"
){

if(
[
"uk",
"ru",
"bg"
]
.includes(
selectedLanguage
)
){

return selectedLocale;

}

return SPEECH_LOCALES.ru;

}

if(
script ===
"greek"
){

return SPEECH_LOCALES.el;

}

if(
script ===
"arabic"
){

return SPEECH_LOCALES.ar;

}

if(
script ===
"devanagari"
){

return SPEECH_LOCALES.hi;

}

return selectedLocale;

}

function splitByScript(
text,
selectedLanguage,
forcedLocale
){

if(
forcedLocale
){

return [
{
text,
locale:forcedLocale
}
];

}

const result =
[];

let currentText =
"";

let currentLocale =
null;

let lastLetterLocale =
getLocale(
selectedLanguage
);

for(
const character
of Array.from(
text
)
){

const script =
charScript(
character
);

let locale;

if(
script ===
"common"
){

locale =
currentLocale ||
lastLetterLocale;

}else{

locale =
localeForScript(
script,
selectedLanguage
);

lastLetterLocale =
locale;

}

if(
currentLocale ===
null
){

currentLocale =
locale;

currentText =
character;

continue;

}

if(
locale ===
currentLocale ||
script ===
"common"
){

currentText +=
character;

continue;

}

if(
currentText.trim()
){

result.push({
text:currentText,
locale:currentLocale
});

}

currentText =
character;

currentLocale =
locale;

}

if(
currentText.trim()
){

result.push({
text:currentText,
locale:
currentLocale ||
getLocale(
selectedLanguage
)
});

}

return result;

}

function splitKnownEnglishTerms(
text,
selectedLanguage
){

/*
For Russian, Ukrainian, Bulgarian, Greek,
Arabic and Hindi every Latin run is automatically
spoken with an English voice.

For Latin-script languages we additionally protect
common PETS & DOGUE English names and terms.
*/

if(
!LATIN_SITE_LANGUAGES.has(
selectedLanguage
) ||
selectedLanguage ===
"en"
){

return splitByScript(
text,
selectedLanguage,
null
);

}

const result =
[];

let lastIndex =
0;

ENGLISH_TERMS_REGEX.lastIndex =
0;

let match;

while(
(
match =
ENGLISH_TERMS_REGEX.exec(
text
)
)
){

if(
match.index >
lastIndex
){

result.push(
...splitByScript(
text.slice(
lastIndex,
match.index
),
selectedLanguage,
null
)
);

}

result.push({
text:match[0],
locale:SPEECH_LOCALES.en
});

lastIndex =
match.index +
match[0].length;

}

if(
lastIndex <
text.length
){

result.push(
...splitByScript(
text.slice(
lastIndex
),
selectedLanguage,
null
)
);

}

return result;

}

function mergeSpeechSegments(
segments
){

const merged =
[];

segments.forEach(
function(segment){

const text =
String(
segment.text ||
""
)
.replace(/\s+/g," ");

if(
!text.trim()
){

return;

}

const previous =
merged[
merged.length -
1
];

if(
previous &&
previous.locale ===
segment.locale
){

previous.text =
(
previous.text +
" " +
text
)
.replace(/\s+/g," ");

}else{

merged.push({
text:text.trim(),
locale:segment.locale
});

}

}
);

return merged;

}

function buildSpeechParts(text){

const selectedLanguage =
getCurrentLanguage();

const semanticText =
prepareSemanticText(
text
);

if(
!semanticText
){

return [];

}

const languageSegments =
mergeSpeechSegments(
splitKnownEnglishTerms(
semanticText,
selectedLanguage
)
);

const parts =
[];

languageSegments.forEach(
function(segment){

makeChunks(
segment.text
)
.forEach(
function(chunk){

parts.push({
text:chunk,
locale:
segment.locale ||
getLocale(
selectedLanguage
)
});

}
);

}
);

return parts;

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

if(
!voices.length
){

return null;

}

const exact =
voices.find(
function(voice){

return String(
voice.lang
)
.toLowerCase() ===
String(
locale
)
.toLowerCase();

}
);

if(
exact
){

return exact;

}

const language =
String(
locale
)
.split("-")[0]
.toLowerCase();

return voices.find(
function(voice){

return String(
voice.lang
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
BUTTON STATE
========================================================= */

function updateAllButtonLabels(){

const labels =
getLabels();

document
.querySelectorAll(
"[data-pd-speech-toggle]"
)
.forEach(
function(button){

const isActive =
button ===
activeButton &&
speaking;

const label =
isActive
? labels.stop
: labels.listen;

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
? "true"
: "false"
);

button.dataset.speaking =
isActive
? "true"
: "false";

const hidden =
button.querySelector(
".pd-speaker-label"
);

if(
hidden
){

hidden.textContent =
label;

}

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

speechParts =
[];

speechPartIndex =
0;

activeUtterance =
null;

activeElement =
null;

if(
"speechSynthesis" in window
){

window.speechSynthesis.cancel();

}

activeButton =
null;

updateAllButtonLabels();

if(
withAnnouncement
){

announce(
getLabels().stopped
);

}

}

/* =========================================================
SPEAK NEXT PART
========================================================= */

function speakNext(){

if(
stopped ||
!speaking
){

return;

}

if(
speechPartIndex >=
speechParts.length
){

speaking =
false;

stopped =
false;

activeUtterance =
null;

activeElement =
null;

activeButton =
null;

updateAllButtonLabels();

return;

}

const part =
speechParts[
speechPartIndex
];

const locale =
part.locale ||
getLocale();

const utterance =
new SpeechSynthesisUtterance(
part.text
);

activeUtterance =
utterance;

utterance.lang =
locale;

utterance.rate =
1;

utterance.pitch =
1;

utterance.volume =
1;

const voice =
chooseVoice(
locale
);

if(
voice
){

utterance.voice =
voice;

}

utterance.onend =
function(){

if(
stopped
){

return;

}

speechPartIndex +=
1;

window.setTimeout(
speakNext,
20
);

};

utterance.onerror =
function(event){

if(
event.error ===
"canceled" ||
event.error ===
"interrupted"
){

return;

}

speechPartIndex +=
1;

window.setTimeout(
speakNext,
20
);

};

window.speechSynthesis.speak(
utterance
);

}

/* =========================================================
START READING ONE BLOCK
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
Press the same button again = stop.
*/

if(
speaking &&
activeButton ===
button
){

stopSpeech(
true
);

return;

}

/*
Another topic stops the previous topic.
*/

stopSpeech(
false
);

const text =
getTextFromElement(
element
);

if(
!text
){

announce(
labels.empty
);

return;

}

const prepared =
buildSpeechParts(
text
);

if(
!prepared.length
){

announce(
labels.empty
);

return;

}

speechParts =
prepared;

speechPartIndex =
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

speakNext();

}

/* =========================================================
TARGET RESOLUTION
========================================================= */

function resolveTarget(button){

const selector =
button.getAttribute(
"data-pd-speech-target"
);

if(
selector
){

try{

const target =
document.querySelector(
selector
);

if(
target
){

return target;

}

}catch(error){
}

}

const controls =
button.getAttribute(
"aria-controls"
);

if(
controls
){

const target =
document.getElementById(
controls
);

if(
target
){

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
"section"
].join(",")
);

}

/* =========================================================
CREATE BUTTON
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

if(
!element.id
){

readableCounter +=
1;

element.id =
"pd-readable-" +
readableCounter;

}

const existing =
Array.from(
element.children
)
.find(
function(child){

return child.matches &&
child.matches(
"[data-pd-speech-toggle]"
);

}
);

if(
existing
){

existing.setAttribute(
"data-pd-speech-target",
"#" +
element.id
);

bindButton(
existing
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
speakerSvg() +
`
<span
class="pd-sr-only pd-speaker-label"
></span>
`;

element.appendChild(
button
);

bindButton(
button
);

}

/* =========================================================
BIND EXISTING BUTTON
========================================================= */

function bindButton(button){

if(
!button ||
button.dataset.pdSpeechBound ===
"true"
){

return;

}

button.dataset.pdSpeechBound =
"true";

button.addEventListener(
"click",
function(event){

event.preventDefault();

event.stopPropagation();

const target =
resolveTarget(
button
);

if(
!target
){

announce(
getLabels().empty
);

return;

}

speakElement(
target,
button
);

}
);

updateAllButtonLabels();

}

/* =========================================================
LEGACY SPEAKER SUPPORT
========================================================= */

function bindLegacyButtons(){

const selector = [
"[data-pd-speech-toggle]",
"[data-read-aloud]",
".speaker-button",
".speaker-btn",
".listen-button",
".read-aloud-button"
].join(",");

document
.querySelectorAll(
selector
)
.forEach(
function(button){

if(
!button.hasAttribute(
"data-pd-speech-toggle"
)
){

button.setAttribute(
"data-pd-speech-toggle",
"true"
);

}

bindButton(
button
);

}
);

}

/* =========================================================
ADD SPEAKERS TO CONTENT
========================================================= */

function installLocalSpeakers(){

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

document
.querySelectorAll(
SECTION_SELECTOR
)
.forEach(
function(section){

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

bindLegacyButtons();

updateAllButtonLabels();

}

/* =========================================================
LANGUAGE CHANGE
========================================================= */

function onLanguageChange(){

if(
speaking
){

stopSpeech(
false
);

}

updateAllButtonLabels();

window.setTimeout(
installLocalSpeakers,
50
);

}

/* =========================================================
DYNAMIC CONTENT
========================================================= */

let updateTimer =
null;

const observer =
new MutationObserver(
function(mutations){

let contentChanged =
false;

for(
const mutation
of mutations
){

if(
mutation.type ===
"childList" &&
mutation.addedNodes.length
){

contentChanged =
true;

break;

}

}

if(
!contentChanged
){

return;

}

window.clearTimeout(
updateTimer
);

updateTimer =
window.setTimeout(
function(){

installLocalSpeakers();

},
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

if(
!element
){

return false;

}

let button =
element.querySelector(
":scope > [data-pd-speech-toggle]"
);

if(
!button
){

createSpeakerForElement(
element
);

button =
element.querySelector(
":scope > [data-pd-speech-toggle]"
);

}

if(
button
){

speakElement(
element,
button
);

return true;

}

return false;

},

speak(text){

if(
!text
){

return false;

}

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

return false;

}

stopSpeech(
false
);

speechParts =
buildSpeechParts(
text
);

if(
!speechParts.length
){

return false;

}

speechPartIndex =
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
labels.reading
);

speakNext();

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

window.addEventListener(
"petsdogue:languagechange",
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
INITIALIZE
========================================================= */

function init(){

addStyles();

ensureLiveRegion();

installLocalSpeakers();

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
