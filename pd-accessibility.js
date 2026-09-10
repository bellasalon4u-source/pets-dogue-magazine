"use strict";

/*
=========================================================
PETS & DOGUE
GLOBAL ACCESSIBILITY + SMART LOCAL NARRATION
=========================================================

Each article, card, rubric or topic can have its own
speaker button.

SMART NARRATION:
- reads only the selected block
- follows the selected PETS & DOGUE language
- recognises mixed-language text
- English words inside Russian/Ukrainian/etc are spoken
  with an English voice instead of Russian transcription
- converts visual symbols into meaningful words
- location pin = location
- phone icon/number = phone number
- card number = bank card number
- email = email
- website = website
- prices such as £1 are spoken naturally
- ages such as "2 years" are adapted to the chosen language
- decorative symbols are not read as strange object names

Ignore narration:
data-pd-speech-ignore

Explicit readable block:
data-pd-readable

Explicit speaker:
data-pd-speech-toggle
data-pd-speech-target="#elementId"
=========================================================
*/

(function(){

"use strict";


/* =========================================================
SETTINGS
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


const LATIN_LANGUAGES = new Set([
"en","fr","de","es","it","pt","nl","pl",
"cs","sk","hu","ro","sv","da","no","fi","tr"
]);


/* =========================================================
BUTTON / SCREEN READER LABELS
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
SEMANTIC WORDS
========================================================= */

const SEMANTIC = {

en:{
location:"Location",
phone:"Phone number",
card:"Bank card number",
email:"Email",
website:"Website",
home:"Home",
prize:"Prize",
winner:"Winner",
and:"and",
or:"or",
plus:"plus",
male:"Male",
female:"Female"
},

uk:{
location:"Місцезнаходження",
phone:"Номер телефону",
card:"Номер банківської картки",
email:"Електронна пошта",
website:"Вебсайт",
home:"Дім",
prize:"Приз",
winner:"Переможець",
and:"і",
or:"або",
plus:"плюс",
male:"Самець",
female:"Самка"
},

ru:{
location:"Местоположение",
phone:"Номер телефона",
card:"Номер банковской карты",
email:"Электронная почта",
website:"Веб-сайт",
home:"Дом",
prize:"Приз",
winner:"Победитель",
and:"и",
or:"или",
plus:"плюс",
male:"Самец",
female:"Самка"
},

fr:{
location:"Localisation",
phone:"Numéro de téléphone",
card:"Numéro de carte bancaire",
email:"Adresse e-mail",
website:"Site web",
home:"Domicile",
prize:"Prix",
winner:"Gagnant",
and:"et",
or:"ou",
plus:"plus",
male:"Mâle",
female:"Femelle"
},

de:{
location:"Standort",
phone:"Telefonnummer",
card:"Bankkartennummer",
email:"E-Mail",
website:"Webseite",
home:"Zuhause",
prize:"Preis",
winner:"Gewinner",
and:"und",
or:"oder",
plus:"plus",
male:"Männlich",
female:"Weiblich"
},

es:{
location:"Ubicación",
phone:"Número de teléfono",
card:"Número de tarjeta bancaria",
email:"Correo electrónico",
website:"Sitio web",
home:"Hogar",
prize:"Premio",
winner:"Ganador",
and:"y",
or:"o",
plus:"más",
male:"Macho",
female:"Hembra"
},

it:{
location:"Posizione",
phone:"Numero di telefono",
card:"Numero della carta bancaria",
email:"Email",
website:"Sito web",
home:"Casa",
prize:"Premio",
winner:"Vincitore",
and:"e",
or:"o",
plus:"più",
male:"Maschio",
female:"Femmina"
},

pt:{
location:"Localização",
phone:"Número de telefone",
card:"Número do cartão bancário",
email:"Email",
website:"Website",
home:"Casa",
prize:"Prémio",
winner:"Vencedor",
and:"e",
or:"ou",
plus:"mais",
male:"Macho",
female:"Fêmea"
},

nl:{
location:"Locatie",
phone:"Telefoonnummer",
card:"Bankkaartnummer",
email:"E-mail",
website:"Website",
home:"Thuis",
prize:"Prijs",
winner:"Winnaar",
and:"en",
or:"of",
plus:"plus",
male:"Mannelijk",
female:"Vrouwelijk"
},

pl:{
location:"Lokalizacja",
phone:"Numer telefonu",
card:"Numer karty bankowej",
email:"E-mail",
website:"Strona internetowa",
home:"Dom",
prize:"Nagroda",
winner:"Zwycięzca",
and:"i",
or:"lub",
plus:"plus",
male:"Samiec",
female:"Samica"
},

cs:{
location:"Poloha",
phone:"Telefonní číslo",
card:"Číslo bankovní karty",
email:"E-mail",
website:"Web",
home:"Domov",
prize:"Cena",
winner:"Vítěz",
and:"a",
or:"nebo",
plus:"plus",
male:"Samec",
female:"Samice"
},

sk:{
location:"Poloha",
phone:"Telefónne číslo",
card:"Číslo bankovej karty",
email:"E-mail",
website:"Web",
home:"Domov",
prize:"Cena",
winner:"Víťaz",
and:"a",
or:"alebo",
plus:"plus",
male:"Samec",
female:"Samica"
},

hu:{
location:"Hely",
phone:"Telefonszám",
card:"Bankkártyaszám",
email:"E-mail",
website:"Weboldal",
home:"Otthon",
prize:"Díj",
winner:"Győztes",
and:"és",
or:"vagy",
plus:"plusz",
male:"Hím",
female:"Nőstény"
},

ro:{
location:"Locație",
phone:"Număr de telefon",
card:"Număr card bancar",
email:"E-mail",
website:"Site web",
home:"Acasă",
prize:"Premiu",
winner:"Câștigător",
and:"și",
or:"sau",
plus:"plus",
male:"Mascul",
female:"Femelă"
},

bg:{
location:"Местоположение",
phone:"Телефонен номер",
card:"Номер на банкова карта",
email:"Имейл",
website:"Уебсайт",
home:"Дом",
prize:"Награда",
winner:"Победител",
and:"и",
or:"или",
plus:"плюс",
male:"Мъжки",
female:"Женски"
},

el:{
location:"Τοποθεσία",
phone:"Αριθμός τηλεφώνου",
card:"Αριθμός τραπεζικής κάρτας",
email:"Email",
website:"Ιστότοπος",
home:"Σπίτι",
prize:"Βραβείο",
winner:"Νικητής",
and:"και",
or:"ή",
plus:"συν",
male:"Αρσενικό",
female:"Θηλυκό"
},

sv:{
location:"Plats",
phone:"Telefonnummer",
card:"Bankkortsnummer",
email:"E-post",
website:"Webbplats",
home:"Hem",
prize:"Pris",
winner:"Vinnare",
and:"och",
or:"eller",
plus:"plus",
male:"Hane",
female:"Hona"
},

da:{
location:"Placering",
phone:"Telefonnummer",
card:"Bankkortnummer",
email:"E-mail",
website:"Website",
home:"Hjem",
prize:"Præmie",
winner:"Vinder",
and:"og",
or:"eller",
plus:"plus",
male:"Han",
female:"Hun"
},

no:{
location:"Sted",
phone:"Telefonnummer",
card:"Bankkortnummer",
email:"E-post",
website:"Nettsted",
home:"Hjem",
prize:"Premie",
winner:"Vinner",
and:"og",
or:"eller",
plus:"pluss",
male:"Hann",
female:"Hunn"
},

fi:{
location:"Sijainti",
phone:"Puhelinnumero",
card:"Pankkikortin numero",
email:"Sähköposti",
website:"Verkkosivusto",
home:"Koti",
prize:"Palkinto",
winner:"Voittaja",
and:"ja",
or:"tai",
plus:"plus",
male:"Uros",
female:"Naaras"
},

tr:{
location:"Konum",
phone:"Telefon numarası",
card:"Banka kartı numarası",
email:"E-posta",
website:"Web sitesi",
home:"Ev",
prize:"Ödül",
winner:"Kazanan",
and:"ve",
or:"veya",
plus:"artı",
male:"Erkek",
female:"Dişi"
},

ar:{
location:"الموقع",
phone:"رقم الهاتف",
card:"رقم البطاقة البنكية",
email:"البريد الإلكتروني",
website:"الموقع الإلكتروني",
home:"المنزل",
prize:"الجائزة",
winner:"الفائز",
and:"و",
or:"أو",
plus:"زائد",
male:"ذكر",
female:"أنثى"
},

hi:{
location:"स्थान",
phone:"फ़ोन नंबर",
card:"बैंक कार्ड नंबर",
email:"ईमेल",
website:"वेबसाइट",
home:"घर",
prize:"पुरस्कार",
winner:"विजेता",
and:"और",
or:"या",
plus:"प्लस",
male:"नर",
female:"मादा"
}

};


/* =========================================================
COUNT UNITS
========================================================= */

const COUNT_UNITS = {

en:{
year:["year","years"],
week:["week","weeks"],
month:["month","months"],
day:["day","days"],
pound:["pound","pounds"]
},

uk:{
year:["рік","роки","років"],
week:["тиждень","тижні","тижнів"],
month:["місяць","місяці","місяців"],
day:["день","дні","днів"],
pound:["фунт","фунти","фунтів"]
},

ru:{
year:["год","года","лет"],
week:["неделя","недели","недель"],
month:["месяц","месяца","месяцев"],
day:["день","дня","дней"],
pound:["фунт","фунта","фунтов"]
},

bg:{
year:["година","години"],
week:["седмица","седмици"],
month:["месец","месеца"],
day:["ден","дни"],
pound:["паунд","паунда"]
},

fr:{
year:["an","ans"],
week:["semaine","semaines"],
month:["mois","mois"],
day:["jour","jours"],
pound:["livre sterling","livres sterling"]
},

de:{
year:["Jahr","Jahre"],
week:["Woche","Wochen"],
month:["Monat","Monate"],
day:["Tag","Tage"],
pound:["Pfund","Pfund"]
},

es:{
year:["año","años"],
week:["semana","semanas"],
month:["mes","meses"],
day:["día","días"],
pound:["libra","libras"]
},

it:{
year:["anno","anni"],
week:["settimana","settimane"],
month:["mese","mesi"],
day:["giorno","giorni"],
pound:["sterlina","sterline"]
},

pt:{
year:["ano","anos"],
week:["semana","semanas"],
month:["mês","meses"],
day:["dia","dias"],
pound:["libra","libras"]
},

nl:{
year:["jaar","jaar"],
week:["week","weken"],
month:["maand","maanden"],
day:["dag","dagen"],
pound:["pond","pond"]
},

pl:{
year:["rok","lata"],
week:["tydzień","tygodnie"],
month:["miesiąc","miesiące"],
day:["dzień","dni"],
pound:["funt","funty"]
},

cs:{
year:["rok","roky"],
week:["týden","týdny"],
month:["měsíc","měsíce"],
day:["den","dny"],
pound:["libra","libry"]
},

sk:{
year:["rok","roky"],
week:["týždeň","týždne"],
month:["mesiac","mesiace"],
day:["deň","dni"],
pound:["libra","libry"]
},

hu:{
year:["év","év"],
week:["hét","hét"],
month:["hónap","hónap"],
day:["nap","nap"],
pound:["font","font"]
},

ro:{
year:["an","ani"],
week:["săptămână","săptămâni"],
month:["lună","luni"],
day:["zi","zile"],
pound:["liră","lire"]
},

el:{
year:["έτος","έτη"],
week:["εβδομάδα","εβδομάδες"],
month:["μήνας","μήνες"],
day:["ημέρα","ημέρες"],
pound:["λίρα","λίρες"]
},

sv:{
year:["år","år"],
week:["vecka","veckor"],
month:["månad","månader"],
day:["dag","dagar"],
pound:["pund","pund"]
},

da:{
year:["år","år"],
week:["uge","uger"],
month:["måned","måneder"],
day:["dag","dage"],
pound:["pund","pund"]
},

no:{
year:["år","år"],
week:["uke","uker"],
month:["måned","måneder"],
day:["dag","dager"],
pound:["pund","pund"]
},

fi:{
year:["vuosi","vuotta"],
week:["viikko","viikkoa"],
month:["kuukausi","kuukautta"],
day:["päivä","päivää"],
pound:["punta","puntaa"]
},

tr:{
year:["yıl","yıl"],
week:["hafta","hafta"],
month:["ay","ay"],
day:["gün","gün"],
pound:["sterlin","sterlin"]
},

ar:{
year:["سنة","سنوات"],
week:["أسبوع","أسابيع"],
month:["شهر","أشهر"],
day:["يوم","أيام"],
pound:["جنيه إسترليني","جنيهات إسترلينية"]
},

hi:{
year:["वर्ष","वर्ष"],
week:["सप्ताह","सप्ताह"],
month:["महीना","महीने"],
day:["दिन","दिन"],
pound:["पाउंड","पाउंड"]
}

};


/* =========================================================
COMMON ENGLISH WORDS
========================================================= */

const ENGLISH_HINT_WORDS = new Set([
"pets",
"dogue",
"marketplace",
"pomeranian",
"cockapoo",
"british",
"shorthair",
"grooming",
"styling",
"photography",
"rabbit",
"london",
"bristol",
"manchester",
"brighton",
"bournemouth",
"edition",
"cover",
"star",
"club",
"editorial"
]);


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
"main .topic-card",

"main .market-intro",
"main .section-head",
"main .browse-card",
"main .listing-card",
"main .publish-strip",

"main .community-copy",
"main .result-card",
"main .community-note-inner",

"main .intro-photo",
"main .how",
"main .prize-box",
"main .rules",
"main .hall-cta",

"main .impact",
"main .rescue-cta",

".modal-sheet",
".modal-content",
".detail-description"

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

let queueIndex =
0;

let speaking =
false;

let stopped =
false;

let readableCounter =
0;

let updateTimer =
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


return normalizeLanguage(
document.documentElement.lang ||
"en"
);

}


function getLabels(){

return LABELS[
getCurrentLanguage()
] ||
LABELS.en;

}


function getSemantic(){

return SEMANTIC[
getCurrentLanguage()
] ||
SEMANTIC.en;

}


/* =========================================================
LIVE REGION
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
z-index:30;
box-shadow:0 4px 16px rgba(0,0,0,.22);
-webkit-tap-highlight-color:transparent;
user-select:none;
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


function excludedTextNode(
element,
root
){

if(
!element
){

return true;

}


if(
element.closest(
[
"script",
"style",
"noscript",
"template",
"svg",
"canvas",
"[hidden]",
'[aria-hidden="true"]',
"[data-pd-speech-ignore]",
".pd-local-speaker",
".pd-sr-only"
].join(",")
)
){

return true;

}


const interactive =
element.closest(
"button,input,select,textarea,form"
);


if(
interactive &&
interactive !== root &&
!root.contains(interactive)
){

return true;

}


if(
interactive &&
interactive !== root
){

return true;

}


const navigation =
element.closest(
"nav"
);


if(
navigation &&
navigation !== root
){

return true;

}


return false;

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
parent,
element
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


if(
value
){

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
PLURAL FORMS
========================================================= */

function slavicForm(
number,
forms
){

const value =
Math.abs(
Number(number)
);


const lastTwo =
value % 100;


const last =
value % 10;


if(
lastTwo >= 11 &&
lastTwo <= 14
){

return forms[2] ||
forms[1];

}


if(
last === 1
){

return forms[0];

}


if(
last >= 2 &&
last <= 4
){

return forms[1];

}


return forms[2] ||
forms[1];

}


function countUnit(
number,
unit,
language
){

const table =
COUNT_UNITS[
language
] ||
COUNT_UNITS.en;


const forms =
table[
unit
] ||
COUNT_UNITS.en[
unit
];


if(
["ru","uk"].includes(
language
)
){

return slavicForm(
number,
forms
);

}


return Number(number) === 1
? forms[0]
: forms[1];

}


/* =========================================================
SMART TEXT NORMALISATION
========================================================= */

function normalizeSemanticText(
rawText
){

const language =
getCurrentLanguage();


const semantic =
SEMANTIC[
language
] ||
SEMANTIC.en;


let text =
String(
rawText ||
""
);


/*
Location and contact icons.
*/

text =
text.replace(
/📍/g,
" " +
semantic.location +
": "
);


text =
text.replace(
/(?:☎️?|📞|📱)/g,
" " +
semantic.phone +
": "
);


text =
text.replace(
/(?:💳|💳️)/g,
" " +
semantic.card +
": "
);


text =
text.replace(
/(?:📧|✉️?|✉)/g,
" " +
semantic.email +
": "
);


text =
text.replace(
/(?:🌐|🔗)/g,
" " +
semantic.website +
": "
);


text =
text.replace(
/(?:🏠|🏡)/g,
" " +
semantic.home +
": "
);


text =
text.replace(
/🎁/g,
" " +
semantic.prize +
": "
);


text =
text.replace(
/🏆/g,
" " +
semantic.winner +
": "
);


/*
Remove decorative visual symbols.
*/

text =
text
.replace(/[◆◇◈✦✧★☆♧⌘◉●○]/g," ")
.replace(/[♡♥❤❤️]+/g," ")
.replace(/[→←↗↘↑↓⇢➜➝]+/g,", ")
.replace(/[＋+](?=\s*[A-Za-zА-Яа-яІіЇїЄєҐґ])/g," ")
.replace(/·/g,", ")
.replace(/\s+[|]\s+/g,", ");


/*
Ampersand and slash become meaningful conjunctions.
*/

text =
text.replace(
/\s*&\s*/g,
" " +
semantic.and +
" "
);


text =
text.replace(
/\s+\/\s+/g,
" " +
semantic.or +
" "
);


/*
Gender words.
*/

text =
text.replace(
/\bFemale\b/gi,
semantic.female
);


text =
text.replace(
/\bMale\b/gi,
semantic.male
);


/*
English age units are converted to the selected language.
Example:
2 years -> 2 года
12 weeks -> 12 недель
*/

text =
text.replace(
/\b(\d+)\s*(years?|yrs?)\b/gi,
function(
match,
number
){

return number +
" " +
countUnit(
number,
"year",
language
);

}
);


text =
text.replace(
/\b(\d+)\s*(weeks?|wks?)\b/gi,
function(
match,
number
){

return number +
" " +
countUnit(
number,
"week",
language
);

}
);


text =
text.replace(
/\b(\d+)\s*(months?|mos?)\b/gi,
function(
match,
number
){

return number +
" " +
countUnit(
number,
"month",
language
);

}
);


text =
text.replace(
/\b(\d+)\s*(days?)\b/gi,
function(
match,
number
){

return number +
" " +
countUnit(
number,
"day",
language
);

}
);


/*
British pounds.
*/

text =
text.replace(
/£\s*(\d+)(?![\d.,])/g,
function(
match,
number
){

return number +
" " +
countUnit(
number,
"pound",
language
);

}
);


/*
Bank card numbers.
Detect 13–19 digits, including spaces or hyphens.
*/

text =
text.replace(
/(?:\b(?:\d[ -]?){13,19}\b)/g,
function(match){

const digits =
match.replace(
/\D/g,
""
);


if(
digits.length < 13 ||
digits.length > 19
){

return match;

}


return (
semantic.card +
": " +
digits
.split("")
.join(" ")
);

}
);


/*
Phone numbers.
Numbers are separated digit by digit for clarity.
*/

text =
text.replace(
/(?:\+\d[\d\s().-]{7,}\d)/g,
function(match){

const digits =
match.replace(
/\D/g,
""
);


if(
digits.length < 8
){

return match;

}


return (
semantic.phone +
": " +
semantic.plus +
" " +
digits
.split("")
.join(" ")
);

}
);


/*
Email.
*/

text =
text.replace(
/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
function(match){

return (
semantic.email +
": " +
match
);

}
);


/*
URLs.
*/

text =
text.replace(
/https?:\/\/[^\s]+/gi,
function(match){

return (
semantic.website +
": " +
match
);

}
);


/*
Clean spaces while keeping punctuation for natural pauses.
*/

text =
text
.replace(/\s+([,.!?;:])/g,"$1")
.replace(/([,.!?;:])(?=[^\s])/g,"$1 ")
.replace(/\s+/g," ")
.trim();


return text;

}


/* =========================================================
SCRIPT DETECTION
========================================================= */

function scriptOfCharacter(
character
){

if(
/[A-Za-zÀ-ÖØ-öø-ÿĀ-ž]/.test(
character
)
){

return "latin";

}


if(
/[\u0400-\u052F]/.test(
character
)
){

return "cyrillic";

}


if(
/[\u0370-\u03FF\u1F00-\u1FFF]/.test(
character
)
){

return "greek";

}


if(
/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(
character
)
){

return "arabic";

}


if(
/[\u0900-\u097F]/.test(
character
)
){

return "devanagari";

}


return "neutral";

}


function localeForScript(
script,
selectedLanguage,
text=""
){

if(
script === "cyrillic"
){

if(
selectedLanguage === "uk"
){

return SPEECH_LOCALES.uk;

}


if(
selectedLanguage === "bg"
){

return SPEECH_LOCALES.bg;

}


return SPEECH_LOCALES.ru;

}


if(
script === "greek"
){

return SPEECH_LOCALES.el;

}


if(
script === "arabic"
){

return SPEECH_LOCALES.ar;

}


if(
script === "devanagari"
){

return SPEECH_LOCALES.hi;

}


if(
script === "latin"
){

if(
!LATIN_LANGUAGES.has(
selectedLanguage
)
){

return SPEECH_LOCALES.en;

}


const words =
String(
text
)
.toLowerCase()
.match(
/[a-zà-öø-ÿā-ž]+/g
) ||
[];


const strongEnglish =
words.some(
word =>
ENGLISH_HINT_WORDS.has(
word
)
);


if(
strongEnglish
){

return SPEECH_LOCALES.en;

}


return SPEECH_LOCALES[
selectedLanguage
] ||
SPEECH_LOCALES.en;

}


return SPEECH_LOCALES[
selectedLanguage
] ||
SPEECH_LOCALES.en;

}


/* =========================================================
SPLIT TEXT BY WRITING SYSTEM
========================================================= */

function splitByScript(
text
){

const selectedLanguage =
getCurrentLanguage();


const segments =
[];

let currentText =
"";

let currentScript =
null;


function flush(){

const clean =
currentText
.replace(/\s+/g," ")
.trim();


if(
clean
){

segments.push({
text:clean,
lang:
localeForScript(
currentScript ||
"neutral",
selectedLanguage,
clean
)
});

}


currentText =
"";

currentScript =
null;

}


for(
const character
of text
){

const script =
scriptOfCharacter(
character
);


if(
script === "neutral"
){

currentText +=
character;

continue;

}


if(
!currentScript
){

currentScript =
script;

currentText +=
character;

continue;

}


if(
script === currentScript
){

currentText +=
character;

continue;

}


flush();


currentScript =
script;

currentText =
character;

}


flush();


return segments;

}


/* =========================================================
TEXT CHUNKS
========================================================= */

function splitLongText(
text,
maxLength
){

const words =
String(text)
.split(/\s+/);


const output =
[];

let current =
"";


words.forEach(
function(word){

const candidate =
current
? current + " " + word
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


function makeSpeechQueue(
text
){

const normalized =
normalizeSemanticText(
text
);


if(
!normalized
){

return [];

}


const scriptSegments =
splitByScript(
normalized
);


const output =
[];


scriptSegments.forEach(
function(segment){

const sentences =
segment.text.match(
/[^.!?。！？…]+[.!?。！？…]+|[^.!?。！？…]+$/g
) ||
[
segment.text
];


sentences.forEach(
function(sentence){

const value =
sentence.trim();


if(
!value
){

return;

}


splitLongText(
value,
220
)
.forEach(
function(part){

if(
part.trim()
){

output.push({
text:
part.trim(),
lang:
segment.lang
});

}

}
);

}
);

}
);


return output;

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


const requested =
String(
locale ||
""
)
.toLowerCase();


const exact =
voices.find(
voice =>
String(
voice.lang
)
.toLowerCase() ===
requested
);


if(
exact
){

return exact;

}


const language =
requested
.split("-")[0];


return voices.find(
voice =>
String(
voice.lang
)
.toLowerCase()
.startsWith(
language
)
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
active
? "true"
: "false"
);


button.dataset.speaking =
active
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

speechQueue =
[];

queueIndex =
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
READ QUEUE
========================================================= */

function speakNext(){

if(
stopped ||
!speaking
){

return;

}


if(
queueIndex >=
speechQueue.length
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


const item =
speechQueue[
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
0.96;


utterance.pitch =
1;


utterance.volume =
1;


const voice =
chooseVoice(
item.lang
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


queueIndex +=
1;


window.setTimeout(
speakNext,
35
);

};


utterance.onerror =
function(event){

if(
event.error === "canceled" ||
event.error === "interrupted"
){

return;

}


queueIndex +=
1;


window.setTimeout(
speakNext,
35
);

};


window.speechSynthesis.speak(
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


if(
speaking &&
activeButton === button
){

stopSpeech(
true
);


return;

}


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
makeSpeechQueue(
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


speechQueue =
prepared;


queueIndex =
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
TARGET
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
".content-card",
".world-card",
".category-card",
".rubric-card",
".topic-card",
".listing-card",
".browse-card",
".result-card",
".publish-strip",
".impact",
".rescue-cta",
"section"
].join(",")
);

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


const readableText =
getTextFromElement(
element
);


if(
readableText.length <
25
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
).find(
child =>
child.matches &&
child.matches(
"[data-pd-speech-toggle]"
)
);


if(
existing
){

existing.setAttribute(
"data-pd-speech-target",
"#" +
element.id
);


existing.setAttribute(
"aria-controls",
element.id
);


bindButton(
existing
);


return;

}


/*
Buttons and links must not contain another real button.
For those blocks we use an accessible span role=button.
*/

const isInteractiveRoot =
element.matches(
"button,a"
);


const control =
isInteractiveRoot
? document.createElement("span")
: document.createElement("button");


if(
isInteractiveRoot
){

control.setAttribute(
"role",
"button"
);


control.setAttribute(
"tabindex",
"0"
);

}else{

control.type =
"button";

}


control.className =
"pd-local-speaker";


control.setAttribute(
"data-pd-speech-toggle",
"true"
);


control.setAttribute(
"data-pd-speech-target",
"#" +
element.id
);


control.setAttribute(
"aria-controls",
element.id
);


control.setAttribute(
"aria-pressed",
"false"
);


control.setAttribute(
"data-pd-speech-ignore",
"true"
);


control.innerHTML =
speakerSvg() +
`
<span
class="pd-sr-only pd-speaker-label"
></span>
`;


element.appendChild(
control
);


bindButton(
control
);

}


/* =========================================================
BIND BUTTON
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


if(
button.getAttribute(
"role"
) === "button"
){

button.addEventListener(
"keydown",
function(event){

if(
event.key === "Enter" ||
event.key === " "
){

event.preventDefault();

event.stopPropagation();

button.click();

}

}
);

}


updateAllButtonLabels();

}


/* =========================================================
LEGACY BUTTONS
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
INSTALL SPEAKERS
========================================================= */

function installLocalSpeakers(){

const elements =
new Set();


document
.querySelectorAll(
READABLE_SELECTOR
)
.forEach(
element =>
elements.add(
element
)
);


/*
Top-level rubrics.
*/

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
50
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
80
);

}


/* =========================================================
DYNAMIC CONTENT
========================================================= */

const observer =
new MutationObserver(
function(mutations){

let changed =
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

changed =
true;

break;

}

}


if(
!changed
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
makeSpeechQueue(
text
);


if(
!speechQueue.length
){

return false;

}


queueIndex =
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
VOICES READY
========================================================= */

if(
"speechSynthesis" in window
){

window.speechSynthesis.addEventListener?.(
"voiceschanged",
function(){

updateAllButtonLabels();

}
);

}


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
