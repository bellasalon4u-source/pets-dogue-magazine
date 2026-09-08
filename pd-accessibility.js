"use strict";

/*
=========================================================
PETS & DOGUE
GLOBAL ACCESSIBILITY + TEXT NARRATION
=========================================================

Purpose:

- One shared narration system for PETS & DOGUE
- Speaker button for text-to-speech
- Reads the current visible page text
- Reads selected text first when the user selected something
- Uses the currently selected PETS & DOGUE language
- Supports all 23 website languages
- Accessible by keyboard
- Accessible aria-labels
- Second press stops narration
- Long pages are split into safe speech chunks
- Existing page buttons may use:
  data-pd-speech-toggle
- Elements that must never be read may use:
  data-pd-speech-ignore

Global API:

window.PetsDogueNarration.speak()
window.PetsDogueNarration.stop()
window.PetsDogueNarration.toggle()
window.PetsDogueNarration.getReadableText()
window.PetsDogueNarration.isSpeaking()

=========================================================
*/


(function(){

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


/* =========================================================
SPEECH LOCALES
========================================================= */

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
ACCESSIBILITY LABELS
========================================================= */

const SPEECH_TEXT = {

en:{
listen:"Listen to this page",
stop:"Stop reading",
reading:"Reading page aloud.",
stopped:"Reading stopped.",
empty:"There is no readable text on this page.",
unsupported:"Text-to-speech is not supported by this browser."
},

uk:{
listen:"Прослухати цю сторінку",
stop:"Зупинити озвучування",
reading:"Сторінка читається вголос.",
stopped:"Озвучування зупинено.",
empty:"На цій сторінці немає тексту для озвучування.",
unsupported:"Цей браузер не підтримує озвучування тексту."
},

ru:{
listen:"Прослушать эту страницу",
stop:"Остановить чтение",
reading:"Страница читается вслух.",
stopped:"Чтение остановлено.",
empty:"На этой странице нет текста для озвучивания.",
unsupported:"Этот браузер не поддерживает озвучивание текста."
},

fr:{
listen:"Écouter cette page",
stop:"Arrêter la lecture",
reading:"Lecture de la page en cours.",
stopped:"Lecture arrêtée.",
empty:"Il n’y a aucun texte à lire sur cette page.",
unsupported:"La lecture vocale n’est pas prise en charge par ce navigateur."
},

de:{
listen:"Diese Seite anhören",
stop:"Vorlesen stoppen",
reading:"Die Seite wird vorgelesen.",
stopped:"Vorlesen gestoppt.",
empty:"Auf dieser Seite gibt es keinen vorlesbaren Text.",
unsupported:"Dieser Browser unterstützt keine Sprachausgabe."
},

es:{
listen:"Escuchar esta página",
stop:"Detener lectura",
reading:"La página se está leyendo en voz alta.",
stopped:"Lectura detenida.",
empty:"No hay texto para leer en esta página.",
unsupported:"Este navegador no admite la lectura de texto."
},

it:{
listen:"Ascolta questa pagina",
stop:"Interrompi lettura",
reading:"La pagina viene letta ad alta voce.",
stopped:"Lettura interrotta.",
empty:"Non c’è testo da leggere in questa pagina.",
unsupported:"Questo browser non supporta la lettura vocale."
},

pt:{
listen:"Ouvir esta página",
stop:"Parar leitura",
reading:"A página está a ser lida em voz alta.",
stopped:"Leitura parada.",
empty:"Não existe texto para ler nesta página.",
unsupported:"Este navegador não suporta leitura de texto."
},

nl:{
listen:"Deze pagina beluisteren",
stop:"Voorlezen stoppen",
reading:"De pagina wordt voorgelezen.",
stopped:"Voorlezen gestopt.",
empty:"Er is geen leesbare tekst op deze pagina.",
unsupported:"Deze browser ondersteunt geen tekst-naar-spraak."
},

pl:{
listen:"Posłuchaj tej strony",
stop:"Zatrzymaj czytanie",
reading:"Strona jest czytana na głos.",
stopped:"Czytanie zatrzymane.",
empty:"Na tej stronie nie ma tekstu do odczytania.",
unsupported:"Ta przeglądarka nie obsługuje odczytywania tekstu."
},

cs:{
listen:"Poslechnout tuto stránku",
stop:"Zastavit čtení",
reading:"Stránka se čte nahlas.",
stopped:"Čtení zastaveno.",
empty:"Na této stránce není text ke čtení.",
unsupported:"Tento prohlížeč nepodporuje převod textu na řeč."
},

sk:{
listen:"Vypočuť túto stránku",
stop:"Zastaviť čítanie",
reading:"Stránka sa číta nahlas.",
stopped:"Čítanie zastavené.",
empty:"Na tejto stránke nie je text na čítanie.",
unsupported:"Tento prehliadač nepodporuje čítanie textu."
},

hu:{
listen:"Az oldal meghallgatása",
stop:"Felolvasás leállítása",
reading:"Az oldal felolvasása folyamatban.",
stopped:"A felolvasás leállt.",
empty:"Ezen az oldalon nincs felolvasható szöveg.",
unsupported:"Ez a böngésző nem támogatja a szövegfelolvasást."
},

ro:{
listen:"Ascultă această pagină",
stop:"Oprește citirea",
reading:"Pagina este citită cu voce tare.",
stopped:"Citirea a fost oprită.",
empty:"Nu există text de citit pe această pagină.",
unsupported:"Acest browser nu acceptă citirea textului."
},

bg:{
listen:"Прослушайте тази страница",
stop:"Спрете четенето",
reading:"Страницата се чете на глас.",
stopped:"Четенето е спряно.",
empty:"На тази страница няма текст за четене.",
unsupported:"Този браузър не поддържа озвучаване на текст."
},

el:{
listen:"Ακούστε αυτή τη σελίδα",
stop:"Διακοπή ανάγνωσης",
reading:"Η σελίδα διαβάζεται δυνατά.",
stopped:"Η ανάγνωση σταμάτησε.",
empty:"Δεν υπάρχει κείμενο για ανάγνωση σε αυτή τη σελίδα.",
unsupported:"Αυτό το πρόγραμμα περιήγησης δεν υποστηρίζει ανάγνωση κειμένου."
},

sv:{
listen:"Lyssna på den här sidan",
stop:"Stoppa uppläsningen",
reading:"Sidan läses upp.",
stopped:"Uppläsningen stoppades.",
empty:"Det finns ingen text att läsa på den här sidan.",
unsupported:"Den här webbläsaren stöder inte textuppläsning."
},

da:{
listen:"Lyt til denne side",
stop:"Stop oplæsning",
reading:"Siden læses højt.",
stopped:"Oplæsningen er stoppet.",
empty:"Der er ingen tekst at læse på denne side.",
unsupported:"Denne browser understøtter ikke tekst-til-tale."
},

no:{
listen:"Lytt til denne siden",
stop:"Stopp opplesing",
reading:"Siden leses høyt.",
stopped:"Opplesingen er stoppet.",
empty:"Det finnes ingen tekst å lese på denne siden.",
unsupported:"Denne nettleseren støtter ikke tekst-til-tale."
},

fi:{
listen:"Kuuntele tämä sivu",
stop:"Lopeta lukeminen",
reading:"Sivua luetaan ääneen.",
stopped:"Lukeminen lopetettiin.",
empty:"Tällä sivulla ei ole luettavaa tekstiä.",
unsupported:"Tämä selain ei tue tekstin puheeksi muuntamista."
},

tr:{
listen:"Bu sayfayı dinle",
stop:"Okumayı durdur",
reading:"Sayfa sesli okunuyor.",
stopped:"Okuma durduruldu.",
empty:"Bu sayfada okunabilir metin yok.",
unsupported:"Bu tarayıcı metinden sese özelliğini desteklemiyor."
},

ar:{
listen:"استمع إلى هذه الصفحة",
stop:"إيقاف القراءة",
reading:"تتم قراءة الصفحة بصوت عالٍ.",
stopped:"تم إيقاف القراءة.",
empty:"لا يوجد نص قابل للقراءة في هذه الصفحة.",
unsupported:"هذا المتصفح لا يدعم تحويل النص إلى كلام."
},

hi:{
listen:"इस पेज को सुनें",
stop:"पढ़ना बंद करें",
reading:"पेज को आवाज़ में पढ़ा जा रहा है।",
stopped:"पढ़ना बंद कर दिया गया।",
empty:"इस पेज पर पढ़ने योग्य टेक्स्ट नहीं है।",
unsupported:"यह ब्राउज़र टेक्स्ट-टू-स्पीच का समर्थन नहीं करता।"
}

};


/* =========================================================
STATE
========================================================= */

let speechActive =
false;

let speechStopped =
false;

let speechChunks =
[];

let speechChunkIndex =
0;

let currentUtterance =
null;


/* =========================================================
HELPERS
========================================================= */

function normalizeLanguage(
value
){

let language =
String(
value ||
"en"
)
.toLowerCase()
.trim();


if(
language.includes("-")
){

language =
language.split("-")[0];

}


if(
language.includes("_")
){

language =
language.split("_")[0];

}


const aliases = {

ua:"uk",

cz:"cs",

gr:"el",

se:"sv",

dk:"da"

};


language =
aliases[language] ||
language;


return SUPPORTED_LANGUAGES.includes(
language
)
? language
: "en";

}


function getCurrentLanguage(){

try{

if(
window.PetsDogueLanguage &&
typeof window.PetsDogueLanguage.getCurrentLanguage ===
"function"
){

const current =
window.PetsDogueLanguage
.getCurrentLanguage();


if(
typeof current ===
"string"
){

return normalizeLanguage(
current
);

}


if(
current &&
typeof current.code ===
"string"
){

return normalizeLanguage(
current.code
);

}

}

}catch(error){
}


const htmlLanguage =
document.documentElement.lang;


if(
htmlLanguage
){

return normalizeLanguage(
htmlLanguage
);

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


return "en";

}


function getTranslation(){

const language =
getCurrentLanguage();


return SPEECH_TEXT[
language
] ||
SPEECH_TEXT.en;

}


function getSpeechLocale(){

const language =
getCurrentLanguage();


return SPEECH_LOCALES[
language
] ||
SPEECH_LOCALES.en;

}


/* =========================================================
STATUS
========================================================= */

function ensureLiveRegion(){

let region =
document.getElementById(
"pdSpeechStatus"
);


if(
region
){

return region;

}


region =
document.createElement(
"div"
);


region.id =
"pdSpeechStatus";


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


Object.assign(
region.style,
{

position:"fixed",

width:"1px",

height:"1px",

padding:"0",

margin:"-1px",

overflow:"hidden",

clip:"rect(0,0,0,0)",

whiteSpace:"nowrap",

border:"0"

}
);


document.body.appendChild(
region
);


return region;

}


function announce(
message
){

const region =
ensureLiveRegion();


region.textContent =
"";


setTimeout(
()=>{

region.textContent =
message;

},
30
);

}


/* =========================================================
FLOATING SPEAKER BUTTON
========================================================= */

function createGlobalSpeakerButton(){

if(
document.querySelector(
"[data-pd-speech-toggle]"
)
){

return;

}


if(
document.getElementById(
"pdGlobalSpeechButton"
)
){

return;

}


const button =
document.createElement(
"button"
);


button.id =
"pdGlobalSpeechButton";


button.type =
"button";


button.setAttribute(
"data-pd-speech-toggle",
"true"
);


button.setAttribute(
"aria-pressed",
"false"
);


button.setAttribute(
"data-pd-speech-ignore",
"true"
);


button.innerHTML = `
<span
aria-hidden="true"
class="pd-speech-icon"
>
<svg
viewBox="0 0 32 32"
focusable="false"
aria-hidden="true"
>
<path d="M5 13h6l7-6v18l-7-6H5z"></path>
<path d="M22 11c2 1.5 3 3.1 3 5s-1 3.5-3 5"></path>
<path d="M25 7c3.3 2.5 5 5.5 5 9s-1.7 6.5-5 9"></path>
</svg>
</span>

<span
class="pd-speech-visually-hidden"
></span>
`;


Object.assign(
button.style,
{

position:"fixed",

right:"18px",

bottom:"max(18px, env(safe-area-inset-bottom))",

width:"52px",

height:"52px",

borderRadius:"50%",

border:"2px solid #c89a32",

background:"#070707",

color:"#ffffff",

display:"flex",

alignItems:"center",

justifyContent:"center",

padding:"0",

zIndex:"7600",

boxShadow:"0 8px 24px rgba(0,0,0,.28)",

cursor:"pointer",

WebkitTapHighlightColor:"transparent"

}
);


const style =
document.createElement(
"style"
);


style.id =
"pdSpeechAccessibilityStyles";


style.setAttribute(
"data-pd-speech-ignore",
"true"
);


style.textContent = `

#pdGlobalSpeechButton svg{
width:27px;
height:27px;
display:block;
fill:none;
stroke:currentColor;
stroke-width:2.2;
stroke-linecap:round;
stroke-linejoin:round;
}

#pdGlobalSpeechButton:hover{
transform:translateY(-1px);
}

#pdGlobalSpeechButton:focus-visible{
outline:3px solid #65e51f;
outline-offset:4px;
}

#pdGlobalSpeechButton[data-speaking="true"]{
border-color:#65e51f;
box-shadow:
0 0 0 4px rgba(101,229,31,.16),
0 8px 24px rgba(0,0,0,.3);
}

#pdGlobalSpeechButton[data-speaking="true"]::after{
content:"";
position:absolute;
right:1px;
top:1px;
width:10px;
height:10px;
border-radius:50%;
background:#65e51f;
border:2px solid #070707;
}

.pd-speech-visually-hidden{
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

@media(max-width:700px){

#pdGlobalSpeechButton{
right:13px!important;
bottom:max(13px, env(safe-area-inset-bottom))!important;
width:49px!important;
height:49px!important;
}

}

@media(prefers-reduced-motion:reduce){

#pdGlobalSpeechButton{
transition:none!important;
}

}

`;


document.head.appendChild(
style
);


document.body.appendChild(
button
);


updateButtons();

}


/* =========================================================
BUTTON LABELS
========================================================= */

function updateButtons(){

const text =
getTranslation();


document
.querySelectorAll(
"[data-pd-speech-toggle]"
)
.forEach(
button=>{

const label =
speechActive
? text.stop
: text.listen;


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
speechActive
? "true"
: "false"
);


button.dataset.speaking =
speechActive
? "true"
: "false";


const hidden =
button.querySelector(
".pd-speech-visually-hidden"
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
VISIBLE TEXT
========================================================= */

function isExcludedElement(
element
){

if(
!element ||
element.nodeType !== 1
){

return false;

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
"header",
"nav",
"aside",
"footer",
"form",
"button",
"input",
"select",
"textarea",
"[hidden]",
'[aria-hidden="true"]',
"[data-pd-speech-ignore]",
".menu-overlay",
".side-menu"
].join(",")
)
);

}


function isVisibleElement(
element
){

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


if(
Number(
style.opacity
) === 0
){

return false;

}


return true;

}


function getSelectedText(){

try{

const selection =
window.getSelection();


if(
!selection
){

return "";

}


const text =
selection
.toString()
.replace(/\s+/g," ")
.trim();


return text.length >= 2
? text
: "";

}catch(error){

return "";

}

}


function getReadableText(){

const selected =
getSelectedText();


if(
selected
){

return selected;

}


if(
!document.body
){

return "";

}


const walker =
document.createTreeWalker(

document.body,

NodeFilter.SHOW_TEXT,

{

acceptNode(
node
){

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
!parent
){

return NodeFilter.FILTER_REJECT;

}


if(
isExcludedElement(
parent
)
){

return NodeFilter.FILTER_REJECT;

}


if(
!isVisibleElement(
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

parts.push(
text
);

}

}


return parts
.join(" ")
.replace(/\s+/g," ")
.trim();

}


/* =========================================================
TEXT CHUNKS
========================================================= */

function splitLongPart(
text,
maxLength
){

const words =
text.split(/\s+/);


const result =
[];

let current =
"";


words.forEach(
word=>{

const candidate =
current
? current + " " + word
: word;


if(
candidate.length >
maxLength &&
current
){

result.push(
current.trim()
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
current.trim()
){

result.push(
current.trim()
);

}


return result;

}


function createSpeechChunks(
text
){

const MAX_LENGTH =
220;


const normalized =
String(
text ||
""
)
.replace(/\s+/g," ")
.trim();


if(
!normalized
){

return [];

}


const sentences =
normalized.match(
/[^.!?。！？…]+[.!?。！？…]+|[^.!?。！？…]+$/g
) ||
[
normalized
];


const chunks =
[];

let current =
"";


sentences.forEach(
sentence=>{

const clean =
sentence.trim();


if(
!clean
){

return;

}


if(
clean.length >
MAX_LENGTH
){

if(
current
){

chunks.push(
current.trim()
);


current =
"";

}


splitLongPart(
clean,
MAX_LENGTH
)
.forEach(
part=>{

chunks.push(
part
);

}
);


return;

}


const candidate =
current
? current + " " + clean
: clean;


if(
candidate.length >
MAX_LENGTH
){

if(
current
){

chunks.push(
current.trim()
);

}


current =
clean;

}else{

current =
candidate;

}

}
);


if(
current
){

chunks.push(
current.trim()
);

}


return chunks;

}


/* =========================================================
VOICE
========================================================= */

function getBestVoice(
locale
){

if(
!("speechSynthesis" in window)
){

return null;

}


const voices =
window.speechSynthesis
.getVoices();


if(
!voices ||
!voices.length
){

return null;

}


const exact =
voices.find(
voice=>
String(
voice.lang
)
.toLowerCase() ===
String(
locale
)
.toLowerCase()
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
voice=>
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
STOP
========================================================= */

function stopSpeech(
announceStop = true
){

speechStopped =
true;

speechActive =
false;

speechChunks =
[];

speechChunkIndex =
0;

currentUtterance =
null;


if(
"speechSynthesis" in window
){

window.speechSynthesis.cancel();

}


updateButtons();


if(
announceStop
){

announce(
getTranslation().stopped
);

}

}


/* =========================================================
SPEAK CHUNK
========================================================= */

function speakNextChunk(){

if(
speechStopped ||
!speechActive
){

return;

}


if(
speechChunkIndex >=
speechChunks.length
){

speechActive =
false;

speechStopped =
false;

currentUtterance =
null;

updateButtons();

return;

}


const text =
speechChunks[
speechChunkIndex
];


const locale =
getSpeechLocale();


const utterance =
new SpeechSynthesisUtterance(
text
);


currentUtterance =
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
getBestVoice(
locale
);


if(
voice
){

utterance.voice =
voice;

}


utterance.onend =
()=>{

if(
speechStopped
){

return;

}


speechChunkIndex += 1;


setTimeout(
speakNextChunk,
25
);

};


utterance.onerror =
event=>{

if(
event.error ===
"canceled" ||
event.error ===
"interrupted"
){

return;

}


speechChunkIndex += 1;


setTimeout(
speakNextChunk,
25
);

};


window.speechSynthesis.speak(
utterance
);

}


/* =========================================================
START
========================================================= */

function startSpeech(
customText
){

const translation =
getTranslation();


if(
!(
"speechSynthesis" in window
) ||
typeof window.SpeechSynthesisUtterance ===
"undefined"
){

announce(
translation.unsupported
);


return false;

}


stopSpeech(
false
);


const text =
String(
customText ||
getReadableText()
)
.replace(/\s+/g," ")
.trim();


if(
!text
){

announce(
translation.empty
);


return false;

}


speechChunks =
createSpeechChunks(
text
);


if(
!speechChunks.length
){

announce(
translation.empty
);


return false;

}


speechChunkIndex =
0;

speechStopped =
false;

speechActive =
true;


updateButtons();


announce(
translation.reading
);


speakNextChunk();


return true;

}


/* =========================================================
TOGGLE
========================================================= */

function toggleSpeech(){

if(
speechActive
){

stopSpeech(
true
);


return;

}


startSpeech();

}


/* =========================================================
BUTTON BINDING
========================================================= */

function bindSpeechButtons(){

document
.querySelectorAll(
"[data-pd-speech-toggle]"
)
.forEach(
button=>{

if(
button.dataset.pdSpeechBound ===
"true"
){

return;

}


button.dataset.pdSpeechBound =
"true";


button.addEventListener(
"click",
event=>{

event.preventDefault();

toggleSpeech();

}
);

}
);


updateButtons();

}


/* =========================================================
LANGUAGE REFRESH
========================================================= */

function languageChanged(){

if(
speechActive
){

stopSpeech(
false
);

}


updateButtons();

}


/* =========================================================
DYNAMIC BUTTONS
========================================================= */

const observer =
new MutationObserver(
mutations=>{

let needsBinding =
false;


for(
const mutation of mutations
){

if(
mutation.type ===
"childList" &&
mutation.addedNodes.length
){

needsBinding =
true;

break;

}

}


if(
needsBinding
){

bindSpeechButtons();

}

}
);


/* =========================================================
EVENTS
========================================================= */

window.addEventListener(
"petsdogue:languagechange",
languageChanged
);


window.addEventListener(
"storage",
event=>{

if(
event.key ===
LANGUAGE_KEY
){

languageChanged();

}

}
);


document.addEventListener(
"visibilitychange",
()=>{

if(
document.hidden &&
speechActive
){

stopSpeech(
false
);

}

}
);


window.addEventListener(
"beforeunload",
()=>{

stopSpeech(
false
);

}
);


/* =========================================================
PUBLIC API
========================================================= */

window.PetsDogueNarration = {

speak(
text
){

return startSpeech(
text
);

},

stop(){

stopSpeech(
true
);

},

toggle(){

toggleSpeech();

},

getReadableText(){

return getReadableText();

},

isSpeaking(){

return speechActive;

}

};


/* =========================================================
START
========================================================= */

function init(){

ensureLiveRegion();

createGlobalSpeakerButton();

bindSpeechButtons();


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
