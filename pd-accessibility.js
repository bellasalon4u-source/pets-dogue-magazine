"use strict";

/*
=========================================================
PETS & DOGUE
GLOBAL ACCESSIBILITY + LOCAL TEXT NARRATION
=========================================================

IMPORTANT:

PETS & DOGUE does NOT use one global page reader.

Every article, story, card or editorial section can have
its own speaker button.

Press speaker:
- reads only that article / topic / section
- uses the currently selected site language
- press again to stop
- pressing another speaker switches to that topic

The system also supports existing buttons using:

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

const LANGUAGE_KEY =
"pets_dogue_language";


const SUPPORTED_LANGUAGES = [
"en",
"uk",
"ru",
"fr",
"de",
"es",
"it",
"pt",
"nl",
"pl",
"cs",
"sk",
"hu",
"ro",
"bg",
"el",
"sv",
"da",
"no",
"fi",
"tr",
"ar",
"hi"
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
READABLE BLOCKS
========================================================= */

/*
The script automatically finds common PETS & DOGUE
content structures.

Explicit data-pd-readable always has priority.
*/

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


/*
Sections are treated as a rubric only when they do not
mainly act as a container for many article cards.
*/

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

let chunks =
[];

let chunkIndex =
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


function getLocale(){

const language =
getCurrentLanguage();


return SPEECH_LOCALES[
language
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
TEXT SPLITTING
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
? current + " " + value
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
button === activeButton &&
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

chunks =
[];

chunkIndex =
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
SPEAK NEXT CHUNK
========================================================= */

function speakNext(){

if(
stopped ||
!speaking
){

return;

}


if(
chunkIndex >=
chunks.length
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


const locale =
getLocale();


const utterance =
new SpeechSynthesisUtterance(
chunks[
chunkIndex
]
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


chunkIndex += 1;


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


chunkIndex += 1;


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
Clicking the same speaker again stops it.
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
Clicking another topic stops the old one first.
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
makeChunks(
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


chunks =
prepared;

chunkIndex =
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


/*
Skip decorative or almost empty blocks.
*/

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

readableCounter += 1;


element.id =
"pd-readable-" +
readableCounter;

}


/*
Do not add another button if this block already
contains its own narration button.
*/

const existing =
Array.from(
element.children
).find(
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


/*
Top-level sections represent site rubrics.
Add a separate speaker for the rubric itself.
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


/*
The visible text may have changed after translation,
so speakers continue reading the new rendered language
when pressed again.
*/

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
const mutation of mutations
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


const temporary =
document.createElement(
"div"
);


temporary.textContent =
text;


temporary.setAttribute(
"data-pd-speech-ignore",
"true"
);


const labels =
getLabels();


if(
!(
"speechSynthesis" in window
)
){

announce(
labels.unsupported
);


return false;

}


stopSpeech(
false
);


chunks =
makeChunks(
text
);


if(
!chunks.length
){

return false;

}


chunkIndex =
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
