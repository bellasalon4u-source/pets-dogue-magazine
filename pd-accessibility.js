"use strict";

/*
=========================================================
PETS & DOGUE
GLOBAL MULTILINGUAL ACCESSIBILITY NARRATION
=========================================================
One topic = one speaker.
No duplicate speakers.
Mixed-language pronunciation.
Semantic reading of icons and common symbols.
=========================================================
*/

(function(){

"use strict";

/* Prevent the file from installing twice */
if(window.__PETS_DOGUE_NARRATION_V4__){

if(
window.PetsDogueNarration &&
typeof window.PetsDogueNarration.refresh === "function"
){
window.PetsDogueNarration.refresh();
}

return;
}

window.__PETS_DOGUE_NARRATION_V4__ = true;


/* =========================================================
LANGUAGES
========================================================= */

const LANGUAGE_KEY =
"pets_dogue_language";

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

const SUPPORTED_LANGUAGES =
Object.keys(SPEECH_LOCALES);


/* =========================================================
BUTTON LABELS
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
reading:"Lecture en cours.",
stopped:"Lecture arrêtée.",
empty:"Il n’y a aucun texte à lire.",
unsupported:"La lecture vocale n’est pas prise en charge."
},

de:{
listen:"Diesen Inhalt anhören",
stop:"Vorlesen stoppen",
reading:"Dieser Inhalt wird vorgelesen.",
stopped:"Vorlesen gestoppt.",
empty:"Kein Text zum Vorlesen.",
unsupported:"Sprachausgabe wird nicht unterstützt."
},

es:{
listen:"Escuchar este contenido",
stop:"Detener lectura",
reading:"Leyendo este contenido.",
stopped:"Lectura detenida.",
empty:"No hay texto para leer.",
unsupported:"La lectura de texto no está disponible."
},

it:{
listen:"Ascolta questo contenuto",
stop:"Interrompi lettura",
reading:"Lettura in corso.",
stopped:"Lettura interrotta.",
empty:"Non c’è testo da leggere.",
unsupported:"La lettura vocale non è supportata."
},

pt:{
listen:"Ouvir este conteúdo",
stop:"Parar leitura",
reading:"Leitura em curso.",
stopped:"Leitura parada.",
empty:"Não existe texto para ler.",
unsupported:"A leitura de texto não é suportada."
},

nl:{
listen:"Deze inhoud beluisteren",
stop:"Voorlezen stoppen",
reading:"Deze inhoud wordt voorgelezen.",
stopped:"Voorlezen gestopt.",
empty:"Geen tekst om voor te lezen.",
unsupported:"Tekst-naar-spraak wordt niet ondersteund."
},

pl:{
listen:"Posłuchaj tej treści",
stop:"Zatrzymaj czytanie",
reading:"Treść jest czytana.",
stopped:"Czytanie zatrzymane.",
empty:"Brak tekstu do odczytania.",
unsupported:"Odczytywanie tekstu nie jest obsługiwane."
},

cs:{
listen:"Poslechnout tento obsah",
stop:"Zastavit čtení",
reading:"Obsah se čte nahlas.",
stopped:"Čtení zastaveno.",
empty:"Není zde text ke čtení.",
unsupported:"Převod textu na řeč není podporován."
},

sk:{
listen:"Vypočuť tento obsah",
stop:"Zastaviť čítanie",
reading:"Obsah sa číta nahlas.",
stopped:"Čítanie zastavené.",
empty:"Nie je tu text na čítanie.",
unsupported:"Čítanie textu nie je podporované."
},

hu:{
listen:"A tartalom meghallgatása",
stop:"Felolvasás leállítása",
reading:"Felolvasás folyamatban.",
stopped:"Felolvasás leállt.",
empty:"Nincs felolvasható szöveg.",
unsupported:"A szövegfelolvasás nem támogatott."
},

ro:{
listen:"Ascultă acest conținut",
stop:"Oprește citirea",
reading:"Conținutul este citit.",
stopped:"Citirea a fost oprită.",
empty:"Nu există text de citit.",
unsupported:"Citirea textului nu este acceptată."
},

bg:{
listen:"Прослушайте тази тема",
stop:"Спрете четенето",
reading:"Темата се чете на глас.",
stopped:"Четенето е спряно.",
empty:"Няма текст за четене.",
unsupported:"Озвучаването не се поддържа."
},

el:{
listen:"Ακούστε αυτό το περιεχόμενο",
stop:"Διακοπή ανάγνωσης",
reading:"Το περιεχόμενο διαβάζεται.",
stopped:"Η ανάγνωση σταμάτησε.",
empty:"Δεν υπάρχει κείμενο για ανάγνωση.",
unsupported:"Η ανάγνωση κειμένου δεν υποστηρίζεται."
},

sv:{
listen:"Lyssna på detta innehåll",
stop:"Stoppa uppläsningen",
reading:"Innehållet läses upp.",
stopped:"Uppläsningen stoppades.",
empty:"Det finns ingen text att läsa.",
unsupported:"Textuppläsning stöds inte."
},

da:{
listen:"Lyt til dette indhold",
stop:"Stop oplæsning",
reading:"Indholdet læses højt.",
stopped:"Oplæsningen er stoppet.",
empty:"Der er ingen tekst at læse.",
unsupported:"Tekst-til-tale understøttes ikke."
},

no:{
listen:"Lytt til dette innholdet",
stop:"Stopp opplesing",
reading:"Innholdet leses høyt.",
stopped:"Opplesingen er stoppet.",
empty:"Det finnes ingen tekst å lese.",
unsupported:"Tekst-til-tale støttes ikke."
},

fi:{
listen:"Kuuntele tämä sisältö",
stop:"Lopeta lukeminen",
reading:"Sisältöä luetaan ääneen.",
stopped:"Lukeminen lopetettiin.",
empty:"Ei luettavaa tekstiä.",
unsupported:"Tekstistä puheeksi -toimintoa ei tueta."
},

tr:{
listen:"Bu içeriği dinle",
stop:"Okumayı durdur",
reading:"İçerik sesli okunuyor.",
stopped:"Okuma durduruldu.",
empty:"Okunabilir metin yok.",
unsupported:"Metinden sese özelliği desteklenmiyor."
},

ar:{
listen:"استمع إلى هذا المحتوى",
stop:"إيقاف القراءة",
reading:"تتم قراءة المحتوى بصوت عالٍ.",
stopped:"تم إيقاف القراءة.",
empty:"لا يوجد نص قابل للقراءة.",
unsupported:"تحويل النص إلى كلام غير مدعوم."
},

hi:{
listen:"इस विषय को सुनें",
stop:"पढ़ना बंद करें",
reading:"विषय को पढ़ा जा रहा है।",
stopped:"पढ़ना बंद कर दिया गया।",
empty:"पढ़ने योग्य टेक्स्ट नहीं है।",
unsupported:"टेक्स्ट-टू-स्पीच उपलब्ध नहीं है।"
}

};


/* =========================================================
SEMANTIC WORDS
========================================================= */

const SEMANTIC = {

en:{
location:"Location",
phone:"Telephone number",
card:"Bank card",
email:"Email",
website:"Website",
heart:"Favourite",
home:"Home",
confirmed:"Confirmed",
star:"Star",
information:"Information",
pound:"pound",
pounds:"pounds",
year:"year",
years:"years",
month:"month",
months:"months",
kilometre:"kilometre",
kilometres:"kilometres",
percent:"percent"
},

ru:{
location:"Местоположение",
phone:"Номер телефона",
card:"Банковская карта",
email:"Электронная почта",
website:"Сайт",
heart:"Избранное",
home:"Дом",
confirmed:"Подтверждено",
star:"Звезда",
information:"Информация",
pound:"фунт",
pounds:"фунтов",
year:"год",
years:"лет",
month:"месяц",
months:"месяцев",
kilometre:"километр",
kilometres:"километров",
percent:"процентов"
},

uk:{
location:"Місцезнаходження",
phone:"Номер телефону",
card:"Банківська картка",
email:"Електронна пошта",
website:"Сайт",
heart:"Обране",
home:"Дім",
confirmed:"Підтверджено",
star:"Зірка",
information:"Інформація",
pound:"фунт",
pounds:"фунтів",
year:"рік",
years:"років",
month:"місяць",
months:"місяців",
kilometre:"кілометр",
kilometres:"кілометрів",
percent:"відсотків"
},

fr:{
location:"Localisation",
phone:"Numéro de téléphone",
card:"Carte bancaire",
email:"E-mail",
website:"Site internet",
heart:"Favori",
home:"Accueil",
confirmed:"Confirmé",
star:"Étoile",
information:"Information",
pound:"livre",
pounds:"livres",
year:"an",
years:"ans",
month:"mois",
months:"mois",
kilometre:"kilomètre",
kilometres:"kilomètres",
percent:"pour cent"
},

de:{
location:"Standort",
phone:"Telefonnummer",
card:"Bankkarte",
email:"E-Mail",
website:"Website",
heart:"Favorit",
home:"Zuhause",
confirmed:"Bestätigt",
star:"Stern",
information:"Information",
pound:"Pfund",
pounds:"Pfund",
year:"Jahr",
years:"Jahre",
month:"Monat",
months:"Monate",
kilometre:"Kilometer",
kilometres:"Kilometer",
percent:"Prozent"
},

es:{
location:"Ubicación",
phone:"Número de teléfono",
card:"Tarjeta bancaria",
email:"Correo electrónico",
website:"Sitio web",
heart:"Favorito",
home:"Hogar",
confirmed:"Confirmado",
star:"Estrella",
information:"Información",
pound:"libra",
pounds:"libras",
year:"año",
years:"años",
month:"mes",
months:"meses",
kilometre:"kilómetro",
kilometres:"kilómetros",
percent:"por ciento"
},

it:{
location:"Posizione",
phone:"Numero di telefono",
card:"Carta bancaria",
email:"Email",
website:"Sito web",
heart:"Preferito",
home:"Casa",
confirmed:"Confermato",
star:"Stella",
information:"Informazione",
pound:"sterlina",
pounds:"sterline",
year:"anno",
years:"anni",
month:"mese",
months:"mesi",
kilometre:"chilometro",
kilometres:"chilometri",
percent:"percento"
},

pt:{
location:"Localização",
phone:"Número de telefone",
card:"Cartão bancário",
email:"E-mail",
website:"Website",
heart:"Favorito",
home:"Casa",
confirmed:"Confirmado",
star:"Estrela",
information:"Informação",
pound:"libra",
pounds:"libras",
year:"ano",
years:"anos",
month:"mês",
months:"meses",
kilometre:"quilómetro",
kilometres:"quilómetros",
percent:"por cento"
},

nl:{
location:"Locatie",
phone:"Telefoonnummer",
card:"Bankkaart",
email:"E-mail",
website:"Website",
heart:"Favoriet",
home:"Thuis",
confirmed:"Bevestigd",
star:"Ster",
information:"Informatie",
pound:"pond",
pounds:"pond",
year:"jaar",
years:"jaar",
month:"maand",
months:"maanden",
kilometre:"kilometer",
kilometres:"kilometer",
percent:"procent"
},

pl:{
location:"Lokalizacja",
phone:"Numer telefonu",
card:"Karta bankowa",
email:"E-mail",
website:"Strona internetowa",
heart:"Ulubione",
home:"Dom",
confirmed:"Potwierdzone",
star:"Gwiazda",
information:"Informacja",
pound:"funt",
pounds:"funtów",
year:"rok",
years:"lat",
month:"miesiąc",
months:"miesięcy",
kilometre:"kilometr",
kilometres:"kilometrów",
percent:"procent"
},

cs:{
location:"Poloha",
phone:"Telefonní číslo",
card:"Bankovní karta",
email:"E-mail",
website:"Web",
heart:"Oblíbené",
home:"Domov",
confirmed:"Potvrzeno",
star:"Hvězda",
information:"Informace",
pound:"libra",
pounds:"liber",
year:"rok",
years:"let",
month:"měsíc",
months:"měsíců",
kilometre:"kilometr",
kilometres:"kilometrů",
percent:"procent"
},

sk:{
location:"Poloha",
phone:"Telefónne číslo",
card:"Banková karta",
email:"E-mail",
website:"Web",
heart:"Obľúbené",
home:"Domov",
confirmed:"Potvrdené",
star:"Hviezda",
information:"Informácia",
pound:"libra",
pounds:"libier",
year:"rok",
years:"rokov",
month:"mesiac",
months:"mesiacov",
kilometre:"kilometer",
kilometres:"kilometrov",
percent:"percent"
},

hu:{
location:"Hely",
phone:"Telefonszám",
card:"Bankkártya",
email:"E-mail",
website:"Weboldal",
heart:"Kedvenc",
home:"Otthon",
confirmed:"Megerősítve",
star:"Csillag",
information:"Információ",
pound:"font",
pounds:"font",
year:"év",
years:"év",
month:"hónap",
months:"hónap",
kilometre:"kilométer",
kilometres:"kilométer",
percent:"százalék"
},

ro:{
location:"Locație",
phone:"Număr de telefon",
card:"Card bancar",
email:"E-mail",
website:"Site",
heart:"Favorit",
home:"Acasă",
confirmed:"Confirmat",
star:"Stea",
information:"Informație",
pound:"liră",
pounds:"lire",
year:"an",
years:"ani",
month:"lună",
months:"luni",
kilometre:"kilometru",
kilometres:"kilometri",
percent:"la sută"
},

bg:{
location:"Местоположение",
phone:"Телефонен номер",
card:"Банкова карта",
email:"Имейл",
website:"Уебсайт",
heart:"Любимо",
home:"Дом",
confirmed:"Потвърдено",
star:"Звезда",
information:"Информация",
pound:"паунд",
pounds:"паунда",
year:"година",
years:"години",
month:"месец",
months:"месеца",
kilometre:"километър",
kilometres:"километра",
percent:"процента"
},

el:{
location:"Τοποθεσία",
phone:"Αριθμός τηλεφώνου",
card:"Τραπεζική κάρτα",
email:"Email",
website:"Ιστότοπος",
heart:"Αγαπημένο",
home:"Σπίτι",
confirmed:"Επιβεβαιωμένο",
star:"Αστέρι",
information:"Πληροφορία",
pound:"λίρα",
pounds:"λίρες",
year:"έτος",
years:"έτη",
month:"μήνας",
months:"μήνες",
kilometre:"χιλιόμετρο",
kilometres:"χιλιόμετρα",
percent:"τοις εκατό"
},

sv:{
location:"Plats",
phone:"Telefonnummer",
card:"Bankkort",
email:"E-post",
website:"Webbplats",
heart:"Favorit",
home:"Hem",
confirmed:"Bekräftat",
star:"Stjärna",
information:"Information",
pound:"pund",
pounds:"pund",
year:"år",
years:"år",
month:"månad",
months:"månader",
kilometre:"kilometer",
kilometres:"kilometer",
percent:"procent"
},

da:{
location:"Placering",
phone:"Telefonnummer",
card:"Bankkort",
email:"E-mail",
website:"Websted",
heart:"Favorit",
home:"Hjem",
confirmed:"Bekræftet",
star:"Stjerne",
information:"Information",
pound:"pund",
pounds:"pund",
year:"år",
years:"år",
month:"måned",
months:"måneder",
kilometre:"kilometer",
kilometres:"kilometer",
percent:"procent"
},

no:{
location:"Sted",
phone:"Telefonnummer",
card:"Bankkort",
email:"E-post",
website:"Nettsted",
heart:"Favoritt",
home:"Hjem",
confirmed:"Bekreftet",
star:"Stjerne",
information:"Informasjon",
pound:"pund",
pounds:"pund",
year:"år",
years:"år",
month:"måned",
months:"måneder",
kilometre:"kilometer",
kilometres:"kilometer",
percent:"prosent"
},

fi:{
location:"Sijainti",
phone:"Puhelinnumero",
card:"Pankkikortti",
email:"Sähköposti",
website:"Verkkosivusto",
heart:"Suosikki",
home:"Koti",
confirmed:"Vahvistettu",
star:"Tähti",
information:"Tietoa",
pound:"punta",
pounds:"puntaa",
year:"vuosi",
years:"vuotta",
month:"kuukausi",
months:"kuukautta",
kilometre:"kilometri",
kilometres:"kilometriä",
percent:"prosenttia"
},

tr:{
location:"Konum",
phone:"Telefon numarası",
card:"Banka kartı",
email:"E-posta",
website:"Web sitesi",
heart:"Favori",
home:"Ev",
confirmed:"Onaylandı",
star:"Yıldız",
information:"Bilgi",
pound:"sterlin",
pounds:"sterlin",
year:"yıl",
years:"yıl",
month:"ay",
months:"ay",
kilometre:"kilometre",
kilometres:"kilometre",
percent:"yüzde"
},

ar:{
location:"الموقع",
phone:"رقم الهاتف",
card:"بطاقة بنكية",
email:"البريد الإلكتروني",
website:"الموقع الإلكتروني",
heart:"المفضلة",
home:"المنزل",
confirmed:"تم التأكيد",
star:"نجمة",
information:"معلومات",
pound:"جنيه",
pounds:"جنيهات",
year:"سنة",
years:"سنوات",
month:"شهر",
months:"أشهر",
kilometre:"كيلومتر",
kilometres:"كيلومترات",
percent:"بالمئة"
},

hi:{
location:"स्थान",
phone:"फ़ोन नंबर",
card:"बैंक कार्ड",
email:"ईमेल",
website:"वेबसाइट",
heart:"पसंदीदा",
home:"घर",
confirmed:"पुष्टि की गई",
star:"सितारा",
information:"जानकारी",
pound:"पाउंड",
pounds:"पाउंड",
year:"वर्ष",
years:"वर्ष",
month:"महीना",
months:"महीने",
kilometre:"किलोमीटर",
kilometres:"किलोमीटर",
percent:"प्रतिशत"
}

};


/* =========================================================
STATE
========================================================= */

let activeButton = null;
let speaking = false;
let stopped = false;

let speechQueue = [];
let speechIndex = 0;

let readableCounter = 0;
let updateTimer = null;


/* =========================================================
LANGUAGE HELPERS
========================================================= */

function normalizeLanguage(value){

let code =
String(value || "en")
.trim()
.toLowerCase();

if(code.includes("-")){
code = code.split("-")[0];
}

if(code.includes("_")){
code = code.split("_")[0];
}

code =
LANGUAGE_ALIASES[code] ||
code;

return SUPPORTED_LANGUAGES.includes(code)
? code
: "en";
}


function getCurrentLanguage(){

try{

if(
window.PetsDogueLanguage &&
typeof window.PetsDogueLanguage.getCurrentLanguage === "function"
){

const result =
window.PetsDogueLanguage.getCurrentLanguage();

if(typeof result === "string"){
return normalizeLanguage(result);
}

if(result && typeof result.code === "string"){
return normalizeLanguage(result.code);
}

}

}catch(error){
}


try{

const saved =
localStorage.getItem(LANGUAGE_KEY);

if(saved){
return normalizeLanguage(saved);
}

}catch(error){
}


return normalizeLanguage(
document.documentElement.lang ||
"en"
);
}


function getLabels(){

return LABELS[getCurrentLanguage()] ||
LABELS.en;
}


function getSemantic(){

return SEMANTIC[getCurrentLanguage()] ||
SEMANTIC.en;
}


/* =========================================================
LIVE REGION
========================================================= */

function ensureLiveRegion(){

let region =
document.getElementById(
"pdNarrationStatus"
);

if(region){
return region;
}

region =
document.createElement("div");

region.id =
"pdNarrationStatus";

region.className =
"pd-sr-only";

region.setAttribute(
"role",
"status"
);

region.setAttribute(
"aria-live",
"polite"
);

region.setAttribute(
"aria-atomic",
"true"
);

region.setAttribute(
"data-pd-speech-ignore",
"true"
);

document.body.appendChild(region);

return region;
}


function announce(text){

const region =
ensureLiveRegion();

region.textContent = "";

setTimeout(
()=>{
region.textContent = text;
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
document.createElement("style");

style.id =
"pdNarrationStyles";

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
position:relative!important;
}

.pd-local-speaker{
position:absolute!important;
top:14px!important;
right:14px!important;
width:44px!important;
height:44px!important;
min-width:44px!important;
min-height:44px!important;
display:flex!important;
align-items:center!important;
justify-content:center!important;
padding:0!important;
margin:0!important;
border:2px solid #c99a2e!important;
border-radius:50%!important;
background:rgba(7,7,7,.94)!important;
color:#fff!important;
cursor:pointer!important;
z-index:999!important;
box-shadow:0 4px 16px rgba(0,0,0,.28)!important;
pointer-events:auto!important;
-webkit-tap-highlight-color:transparent!important;
}

html[dir="rtl"] .pd-local-speaker{
right:auto!important;
left:14px!important;
}

.pd-local-speaker svg{
display:block!important;
width:24px!important;
height:24px!important;
fill:none!important;
stroke:currentColor!important;
stroke-width:2.1!important;
stroke-linecap:round!important;
stroke-linejoin:round!important;
pointer-events:none!important;
}

.pd-local-speaker:focus-visible{
outline:3px solid #65e51f!important;
outline-offset:3px!important;
}

.pd-local-speaker[data-speaking="true"]{
border-color:#65e51f!important;
box-shadow:
0 0 0 4px rgba(101,229,31,.17),
0 4px 18px rgba(0,0,0,.3)!important;
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

.listing-card > .pd-local-speaker,
.result-card > .pd-local-speaker{
top:62px!important;
}

@media(max-width:700px){

.pd-local-speaker{
top:10px!important;
right:10px!important;
width:40px!important;
height:40px!important;
min-width:40px!important;
min-height:40px!important;
}

html[dir="rtl"] .pd-local-speaker{
right:auto!important;
left:10px!important;
}

.listing-card > .pd-local-speaker,
.result-card > .pd-local-speaker{
top:57px!important;
}

}

`;

document.head.appendChild(style);

}


/* =========================================================
SPEAKER ICON
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
TEXT COLLECTION
========================================================= */

function isVisible(element){

if(!element){
return false;
}

const style =
getComputedStyle(element);

return !(
style.display === "none" ||
style.visibility === "hidden" ||
style.visibility === "collapse"
);
}


function shouldIgnoreNode(
element,
root
){

if(!element){
return true;
}

const ignored =
element.closest(
[
"script",
"style",
"noscript",
"template",
"svg",
"canvas",
"input",
"select",
"textarea",
"form",
"nav",
"aside",
"footer",
"[hidden]",
'[aria-hidden="true"]',
"[data-pd-speech-ignore]",
".pd-local-speaker",
".pd-sr-only"
].join(",")
);

if(!ignored){
return false;
}

/*
Allow text if the root itself happens to be an article,
but do not read unrelated controls.
*/
return ignored !== root;
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

const value =
String(node.nodeValue || "")
.replace(/\s+/g," ")
.trim();

if(!value){
return NodeFilter.FILTER_REJECT;
}

const parent =
node.parentElement;

if(
!parent ||
!isVisible(parent) ||
shouldIgnoreNode(parent,element)
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
(node = walker.nextNode())
){

const value =
String(node.nodeValue || "")
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
RUSSIAN / UKRAINIAN WORD FORMS
========================================================= */

function slavicForm(
number,
one,
few,
many
){

const n =
Math.abs(
Math.trunc(Number(number))
);

const n10 =
n % 10;

const n100 =
n % 100;

if(
n10 === 1 &&
n100 !== 11
){
return one;
}

if(
n10 >= 2 &&
n10 <= 4 &&
!(
n100 >= 12 &&
n100 <= 14
)
){
return few;
}

return many;
}


function poundWord(number){

const lang =
getCurrentLanguage();

if(lang === "ru"){
return slavicForm(
number,
"фунт",
"фунта",
"фунтов"
);
}

if(lang === "uk"){
return slavicForm(
number,
"фунт",
"фунти",
"фунтів"
);
}

const s =
getSemantic();

return Number(number) === 1
? s.pound
: s.pounds;
}


function yearWord(number){

const lang =
getCurrentLanguage();

if(lang === "ru"){
return slavicForm(
number,
"год",
"года",
"лет"
);
}

if(lang === "uk"){
return slavicForm(
number,
"рік",
"роки",
"років"
);
}

const s =
getSemantic();

return Number(number) === 1
? s.year
: s.years;
}


function monthWord(number){

const lang =
getCurrentLanguage();

if(lang === "ru"){
return slavicForm(
number,
"месяц",
"месяца",
"месяцев"
);
}

if(lang === "uk"){
return slavicForm(
number,
"місяць",
"місяці",
"місяців"
);
}

const s =
getSemantic();

return Number(number) === 1
? s.month
: s.months;
}


/* =========================================================
SEMANTIC TEXT PREPARATION
========================================================= */

function prepareSemanticText(text){

const s =
getSemantic();

let value =
String(text || "");


/* Important symbols */

value =
value.replace(
/📍|📌|🗺️?/gu,
` ${s.location}: `
);

value =
value.replace(
/📞|☎️?|📱/gu,
` ${s.phone}: `
);

value =
value.replace(
/💳|💳️/gu,
` ${s.card}. `
);

value =
value.replace(
/📧|✉️?|📨/gu,
` ${s.email}: `
);

value =
value.replace(
/🌐|🔗/gu,
` ${s.website}: `
);

value =
value.replace(
/❤️|❤|♥|♡/gu,
` ${s.heart}. `
);

value =
value.replace(
/🏠|🏡|⌂/gu,
` ${s.home}. `
);

value =
value.replace(
/✅|✓|✔/gu,
` ${s.confirmed}. `
);

value =
value.replace(
/⭐|★/gu,
` ${s.star}. `
);

value =
value.replace(
/ℹ️|ⓘ/gu,
` ${s.information}. `
);


/* Currency */

value =
value.replace(
/£\s*(\d+(?:[.,]\d+)?)/g,
function(match,number){

const clean =
number.replace(",",".");

return (
clean +
" " +
poundWord(clean)
);

}
);

value =
value.replace(
/(\d+(?:[.,]\d+)?)\s*£/g,
function(match,number){

const clean =
number.replace(",",".");

return (
clean +
" " +
poundWord(clean)
);

}
);


/* English units inside translated pages */

value =
value.replace(
/\b(\d+)\s*(?:years?|yrs?)\b/gi,
function(match,number){

return (
number +
" " +
yearWord(number)
);

}
);

value =
value.replace(
/\b(\d+)\s*(?:months?|mos?)\b/gi,
function(match,number){

return (
number +
" " +
monthWord(number)
);

}
);

value =
value.replace(
/\b(\d+(?:[.,]\d+)?)\s*km\b/gi,
function(match,number){

return (
number +
" " +
(
Number(
String(number).replace(",",".")
) === 1
? s.kilometre
: s.kilometres
)
);

}
);

value =
value.replace(
/(\d+(?:[.,]\d+)?)\s*%/g,
`$1 ${s.percent}`
);


/* Brand ampersand should sound naturally */

value =
value.replace(
/PETS\s*&\s*DOGUE/gi,
"PETS and DOGUE"
);


/* Separators become natural pauses */

value =
value.replace(
(/\s*[·•●▪■◆◇]\s*/g),
", "
);

value =
value.replace(
(/\s*[|]\s*/g),
", "
);

value =
value.replace(
(/[→←↗↘]/g),
". "
);

value =
value.replace(
(/\s*[-–—]\s*/g),
", "
);


/* Remove repeated punctuation */

value =
value
.replace(/\s+,/g,",")
.replace(/,{2,}/g,",")
.replace(/\s+\./g,".")
.replace(/\.{2,}/g,".")
.replace(/\s+/g," ")
.trim();

return value;
}


/* =========================================================
MIXED LANGUAGE
========================================================= */

const ENGLISH_PHRASES = [
"PETS and DOGUE",
"British Shorthair",
"Pomeranian",
"Cockapoo",
"Golden Retriever",
"French Bulldog",
"Labrador Retriever",
"German Shepherd",
"Yorkshire Terrier",
"Jack Russell",
"Chihuahua",
"Shih Tzu",
"Maine Coon",
"Sphynx",
"Ragdoll",
"Bengal",
"Border Collie",
"Cavalier King Charles Spaniel"
];


function isNonLatinSiteLanguage(language){

return [
"ru",
"uk",
"bg",
"el",
"ar",
"hi"
].includes(language);
}


function protectEnglishPhrases(text){

let value =
text;

const protectedItems = [];

ENGLISH_PHRASES
.sort(
(a,b)=>b.length-a.length
)
.forEach(
phrase=>{

const expression =
new RegExp(
phrase.replace(
/[-/\\^$*+?.()|[\]{}]/g,
"\\$&"
),
"gi"
);

value =
value.replace(
expression,
match=>{

const key =
`@@PDEN${protectedItems.length}@@`;

protectedItems.push(match);

return key;
}
);

}
);

return {
value,
protectedItems
};
}


function splitMixedLanguage(text){

const language =
getCurrentLanguage();

const normalLocale =
SPEECH_LOCALES[language] ||
"en-GB";

if(language === "en"){

return [{
text,
locale:"en-GB"
}];

}

const protectedResult =
protectEnglishPhrases(text);

let value =
protectedResult.value;

const pieces = [];

const tokenRegex =
/@@PDEN\d+@@|[A-Za-z][A-Za-z0-9'’.]*(?:\s+[A-Za-z][A-Za-z0-9'’.]*)*/g;

let lastIndex = 0;
let match;

while(
(match = tokenRegex.exec(value))
){

if(match.index > lastIndex){

const before =
value
.slice(lastIndex,match.index)
.trim();

if(before){

pieces.push({
text:before,
locale:normalLocale
});

}

}

let token =
match[0];

const protectedMatch =
token.match(
/@@PDEN(\d+)@@/
);

if(protectedMatch){

token =
protectedResult.protectedItems[
Number(protectedMatch[1])
] ||
token;

pieces.push({
text:token,
locale:"en-GB"
});

}else if(
isNonLatinSiteLanguage(language)
){

pieces.push({
text:token,
locale:"en-GB"
});

}else{

pieces.push({
text:token,
locale:normalLocale
});

}

lastIndex =
tokenRegex.lastIndex;

}

if(lastIndex < value.length){

const after =
value
.slice(lastIndex)
.trim();

if(after){

pieces.push({
text:after,
locale:normalLocale
});

}

}

return pieces.filter(
item=>item.text.trim()
);
}


/* =========================================================
SENTENCE CHUNKS
========================================================= */

function splitText(text,maxLength=180){

const clean =
String(text || "")
.replace(/\s+/g," ")
.trim();

if(!clean){
return [];
}

const sentences =
clean.match(
/[^.!?。！？…]+[.!?。！？…]+|[^.!?。！？…]+$/g
) || [clean];

const result = [];
let current = "";

sentences.forEach(sentence=>{

const value =
sentence.trim();

if(!value){
return;
}

const candidate =
current
? current + " " + value
: value;

if(
candidate.length > maxLength &&
current
){

result.push(current);
current = value;

}else{

current = candidate;

}

});

if(current){
result.push(current);
}

return result;
}


function buildSpeechQueue(text){

const semanticText =
prepareSemanticText(text);

const chunks =
splitText(
semanticText,
180
);

const queue = [];

chunks.forEach(chunk=>{

splitMixedLanguage(chunk)
.forEach(part=>{

if(part.text.trim()){

queue.push({
text:part.text.trim(),
locale:part.locale
});

}

});

});

return queue;
}


/* =========================================================
VOICE
========================================================= */

function chooseVoice(locale){

if(
!("speechSynthesis" in window)
){
return null;
}

const voices =
speechSynthesis.getVoices();

if(!voices.length){
return null;
}

const exact =
voices.find(
voice=>
String(voice.lang)
.toLowerCase() ===
String(locale)
.toLowerCase()
);

if(exact){
return exact;
}

const prefix =
String(locale)
.split("-")[0]
.toLowerCase();

return voices.find(
voice=>
String(voice.lang)
.toLowerCase()
.startsWith(prefix)
) || null;
}


/* =========================================================
BUTTON STATE
========================================================= */

function updateButtons(){

const labels =
getLabels();

document
.querySelectorAll(
"[data-pd-speech-toggle]"
)
.forEach(button=>{

const active =
button === activeButton &&
speaking;

const label =
active
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
active ? "true" : "false"
);

button.dataset.speaking =
active ? "true" : "false";

});
}


/* =========================================================
STOP
========================================================= */

function stopSpeech(announceStop=false){

stopped = true;
speaking = false;

speechQueue = [];
speechIndex = 0;

if(
"speechSynthesis" in window
){
speechSynthesis.cancel();
}

activeButton = null;

updateButtons();

if(announceStop){
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
speechIndex >= speechQueue.length
){

speaking = false;
stopped = false;
activeButton = null;

updateButtons();

return;
}

const item =
speechQueue[speechIndex];

const utterance =
new SpeechSynthesisUtterance(
item.text
);

utterance.lang =
item.locale;

utterance.rate =
0.94;

utterance.pitch =
1;

utterance.volume =
1;

const voice =
chooseVoice(
item.locale
);

if(voice){
utterance.voice = voice;
}

utterance.onend =
()=>{

if(stopped){
return;
}

speechIndex += 1;

setTimeout(
speakNext,
45
);

};

utterance.onerror =
event=>{

if(
event.error === "canceled" ||
event.error === "interrupted"
){
return;
}

speechIndex += 1;

setTimeout(
speakNext,
60
);

};

speechSynthesis.speak(
utterance
);
}


/* =========================================================
READ ONE BLOCK
========================================================= */

function speakElement(
element,
button
){

const labels =
getLabels();

if(
!("speechSynthesis" in window) ||
typeof SpeechSynthesisUtterance === "undefined"
){

announce(
labels.unsupported
);

return;
}


/* Same button = stop */

if(
speaking &&
activeButton === button
){

stopSpeech(true);
return;
}


/* Stop previous topic */

stopSpeech(false);


const rawText =
getTextFromElement(
element
);

if(!rawText){

announce(
labels.empty
);

return;
}


speechQueue =
buildSpeechQueue(
rawText
);

if(!speechQueue.length){

announce(
labels.empty
);

return;
}


speechIndex = 0;
stopped = false;
speaking = true;
activeButton = button;

updateButtons();

announce(
labels.reading
);


/*
Android Chrome behaves more reliably when speech starts
slightly after cancel().
*/

setTimeout(
speakNext,
70
);

}


/* =========================================================
TARGET
========================================================= */

function resolveTarget(button){

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
".community-copy",
".hero",
".intro-photo",
".how",
".impact-copy",
".rescue-copy",
".community-note-inner",
".prize-box",
".rules",
"section"
].join(",")
);
}


/* =========================================================
BIND BUTTON
========================================================= */

function bindButton(button){

if(
!button ||
button.dataset.pdSpeechBound === "true"
){
return;
}

button.dataset.pdSpeechBound =
"true";

button.addEventListener(
"click",
event=>{

event.preventDefault();
event.stopPropagation();
event.stopImmediatePropagation();

const target =
resolveTarget(button);

if(!target){

announce(
getLabels().empty
);

return;
}

speakElement(
target,
button
);

},
true
);

}


/* =========================================================
CREATE SPEAKER
========================================================= */

function createSpeaker(element){

if(
!element ||
element.closest(
"nav,aside,footer,.modal,.contest-modal"
)
){
return;
}

if(
element.tagName === "BUTTON" ||
element.tagName === "INPUT" ||
element.tagName === "SELECT" ||
element.tagName === "TEXTAREA"
){
return;
}

const text =
getTextFromElement(
element
);

if(text.length < 35){
return;
}

element.classList.add(
"pd-readable-block"
);

if(!element.id){

readableCounter += 1;

element.id =
"pd-readable-" +
readableCounter;
}


/*
Exactly ONE direct speaker per readable block.
*/

const directButtons =
Array.from(
element.children
)
.filter(
child=>
child.matches &&
child.matches(
"[data-pd-speech-toggle]"
)
);

let button =
directButtons[0] ||
null;

directButtons
.slice(1)
.forEach(extra=>{

if(
extra.classList.contains(
"pd-local-speaker"
)
){
extra.remove();
}

});


if(!button){

button =
document.createElement(
"button"
);

button.type =
"button";

button.className =
"pd-local-speaker";

button.dataset.pdGenerated =
"true";

button.setAttribute(
"data-pd-speech-toggle",
"true"
);

button.innerHTML =
speakerSvg() +
'<span class="pd-sr-only pd-speaker-label"></span>';

element.appendChild(
button
);
}


button.setAttribute(
"data-pd-speech-target",
"#" + element.id
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

bindButton(button);

}


/* =========================================================
CANDIDATES
========================================================= */

function collectCandidates(){

const selector = [

"[data-pd-readable]",

".hero",

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

"main .result-card",
"main .listing-card",

"main .community-copy",
"main .intro-photo",
"main .how",
"main .impact-copy",
"main .rescue-copy",
"main .community-note-inner",
"main .prize-box",
"main .rules",

"main > section"

].join(",");

const raw =
Array.from(
document.querySelectorAll(
selector
)
);

const unique =
Array.from(
new Set(raw)
);


/*
A broad section does not receive another speaker
when it already contains smaller readable topics.
This prevents the double speakers seen in Community.
*/

return unique.filter(
element=>{

if(
element.closest(
"nav,aside,footer,.modal,.contest-modal"
)
){
return false;
}

const isBroadSection =
element.matches(
"main > section"
);

if(isBroadSection){

const hasNestedCandidate =
unique.some(
other=>
other !== element &&
element.contains(other) &&
!other.matches("main > section")
);

if(hasNestedCandidate){
return false;
}

}

const explicit =
element.hasAttribute(
"data-pd-readable"
);

if(explicit){

const nestedExplicit =
unique.some(
other=>
other !== element &&
other.hasAttribute(
"data-pd-readable"
) &&
element.contains(other)
);

if(nestedExplicit){
return false;
}

}

return true;
});
}


/* =========================================================
REMOVE OLD DUPLICATE GENERATED BUTTONS
========================================================= */

function cleanOldGeneratedSpeakers(){

const speakers =
Array.from(
document.querySelectorAll(
".pd-local-speaker"
)
);

const grouped =
new Map();

speakers.forEach(button=>{

const target =
button.getAttribute(
"data-pd-speech-target"
) ||
button.getAttribute(
"aria-controls"
) ||
"no-target-" +
Math.random();

if(!grouped.has(target)){
grouped.set(target,[]);
}

grouped.get(target)
.push(button);

});


grouped.forEach(buttons=>{

buttons
.slice(1)
.forEach(button=>{
button.remove();
});

});
}


/* =========================================================
INSTALL
========================================================= */

function installLocalSpeakers(){

cleanOldGeneratedSpeakers();

const candidates =
collectCandidates();

candidates.forEach(
element=>createSpeaker(element)
);

document
.querySelectorAll(
"[data-pd-speech-toggle]"
)
.forEach(
button=>bindButton(button)
);

updateButtons();
}


/* =========================================================
LANGUAGE CHANGE
========================================================= */

function onLanguageChange(){

if(speaking){
stopSpeech(false);
}

updateButtons();

setTimeout(
installLocalSpeakers,
120
);
}


/* =========================================================
DYNAMIC CONTENT
========================================================= */

const observer =
new MutationObserver(
mutations=>{

const changed =
mutations.some(
mutation=>
mutation.type === "childList" &&
mutation.addedNodes.length
);

if(!changed){
return;
}

clearTimeout(
updateTimer
);

updateTimer =
setTimeout(
installLocalSpeakers,
180
);

}
);


/* =========================================================
PUBLIC API
========================================================= */

window.PetsDogueNarration = {

speakElement(element){

if(typeof element === "string"){

element =
document.querySelector(
element
);

}

if(!element){
return false;
}

createSpeaker(element);

const button =
Array.from(
element.children
)
.find(
child=>
child.matches &&
child.matches(
"[data-pd-speech-toggle]"
)
);

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
!("speechSynthesis" in window)
){
return false;
}

stopSpeech(false);

speechQueue =
buildSpeechQueue(
text
);

if(!speechQueue.length){
return false;
}

speechIndex = 0;
stopped = false;
speaking = true;
activeButton = null;

setTimeout(
speakNext,
70
);

return true;
},


stop(){

stopSpeech(true);

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
"languagechange",
onLanguageChange
);

window.addEventListener(
"storage",
event=>{

if(event.key === LANGUAGE_KEY){
onLanguageChange();
}

}
);

document.addEventListener(
"visibilitychange",
()=>{

if(
document.hidden &&
speaking
){
stopSpeech(false);
}

}
);

window.addEventListener(
"beforeunload",
()=>stopSpeech(false)
);


/* =========================================================
INITIALISE
========================================================= */

function init(){

addStyles();

ensureLiveRegion();

/*
Remove duplicates left by the previous version
before rebuilding the speakers.
*/

cleanOldGeneratedSpeakers();

installLocalSpeakers();

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
document.readyState === "loading"
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
