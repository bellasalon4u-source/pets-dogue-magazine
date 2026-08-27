"use strict";

/* =========================================================
PETS & DOGUE
GLOBAL HEADER + RUBRIC NAV + COMPACT SIDE MENU

ONE SHARED VISUAL / FUNCTIONAL STANDARD FOR CATEGORY PAGES.

THIS FILE CHANGES ONLY:
- top header
- hamburger button
- PETS & DOGUE logo
- home button
- horizontal rubric navigation
- compact left side menu
- language control inside side menu

THIS FILE DOES NOT CHANGE:
- page content
- article logic
- audio
- maps
- search
- filters
- marketplace
- community
- offers
- Club payments
- Stripe
- partner data
- forms
- APIs
- page-specific translations

LANGUAGES:
en, uk, ru, fr, de, es, it, pt, nl, pl, cs, sk,
hu, ro, bg, el, sv, da, no, fi, tr, ar, hi

LANGUAGE STORAGE:
pets_dogue_language

ARABIC:
RTL page support is preserved.
The physical rubric order stays identical on every language.
========================================================= */

(function(){

"use strict";


/* =========================================================
CONFIG
========================================================= */

const LANGUAGE_KEY=
"pets_dogue_language";


const LANGUAGE_ALIASES={

ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"

};


/* =========================================================
ONE PERMANENT RUBRIC ORDER

NEVER REORDER THIS LIST PER ACTIVE PAGE.
========================================================= */

const NAV_ITEMS=[

{
key:"magazine",
url:"issue-01.html"
},

{
key:"coverStars",
url:"members-gallery.html"
},

{
key:"offers",
url:"special-offers.html"
},

{
key:"places",
url:"pet-friendly-places.html"
},

{
key:"articles",
url:"articles.html"
},

{
key:"photos",
url:"photos.html"
},

{
key:"travel",
url:"pet-travel.html"
},

{
key:"fashion",
url:"pet-fashion.html"
},

{
key:"wellness",
url:"wellness.html"
},

{
key:"community",
url:"local-community.html"
},

{
key:"contests",
url:"contests.html"
},

{
key:"rescue",
url:"pets-in-need.html"
},

{
key:"marketplace",
url:"pet-marketplace.html"
},

{
key:"partners",
url:"partners.html"
}

];


/* =========================================================
PATH → ACTIVE RUBRIC
========================================================= */

const PAGE_KEYS={

"issue-01.html":"magazine",

"members-gallery.html":"coverStars",

"special-offers.html":"offers",

"pet-friendly-places.html":"places",

"articles.html":"articles",

"photos.html":"photos",

"pet-travel.html":"travel",

"pet-fashion.html":"fashion",

"wellness.html":"wellness",

"local-community.html":"community",

"contests.html":"contests",

"pets-in-need.html":"rescue",

"pet-marketplace.html":"marketplace",

"partners.html":"partners"

};


/* =========================================================
23-LANGUAGE HEADER / MENU TRANSLATIONS
========================================================= */

const TEXT={

en:{
menu:"Contents",
profile:"Profile",
club:"Join Club",
language:"Language",
contact:"Contact us",

magazine:"Magazine",
coverStars:"Cover Stars",
offers:"Discounts",
places:"Pets Welcome",
articles:"Articles",
photos:"Photos",
travel:"Travel",
fashion:"Fashion",
wellness:"Health",
community:"Community",
contests:"Contests",
rescue:"Help",
marketplace:"Marketplace",
partners:"Partners"
},


uk:{
menu:"Зміст",
profile:"Профіль",
club:"Вступити до клубу",
language:"Мова",
contact:"Зв’язатися з нами",

magazine:"Журнал",
coverStars:"Зірки обкладинки",
offers:"Знижки",
places:"Улюбленцям раді",
articles:"Статті",
photos:"Фото",
travel:"Подорожі",
fashion:"Мода",
wellness:"Здоров’я",
community:"Спільнота",
contests:"Конкурси",
rescue:"Допомога",
marketplace:"Маркетплейс",
partners:"Партнери"
},


ru:{
menu:"Содержание",
profile:"Профиль",
club:"Вступить в клуб",
language:"Язык",
contact:"Связаться с нами",

magazine:"Журнал",
coverStars:"Звёзды обложки",
offers:"Скидки",
places:"Питомцам рады",
articles:"Статьи",
photos:"Фото",
travel:"Путешествия",
fashion:"Мода",
wellness:"Здоровье",
community:"Сообщество",
contests:"Конкурсы",
rescue:"Помощь",
marketplace:"Маркетплейс",
partners:"Партнёры"
},


fr:{
menu:"Sommaire",
profile:"Profil",
club:"Rejoindre le Club",
language:"Langue",
contact:"Nous contacter",

magazine:"Magazine",
coverStars:"Stars de couverture",
offers:"Réductions",
places:"Animaux bienvenus",
articles:"Articles",
photos:"Photos",
travel:"Voyages",
fashion:"Mode",
wellness:"Santé",
community:"Communauté",
contests:"Concours",
rescue:"Aide",
marketplace:"Marketplace",
partners:"Partenaires"
},


de:{
menu:"Inhalt",
profile:"Profil",
club:"Club beitreten",
language:"Sprache",
contact:"Kontakt",

magazine:"Magazin",
coverStars:"Cover Stars",
offers:"Rabatte",
places:"Tiere willkommen",
articles:"Artikel",
photos:"Fotos",
travel:"Reisen",
fashion:"Mode",
wellness:"Gesundheit",
community:"Community",
contests:"Wettbewerbe",
rescue:"Hilfe",
marketplace:"Marktplatz",
partners:"Partner"
},


es:{
menu:"Contenido",
profile:"Perfil",
club:"Únete al Club",
language:"Idioma",
contact:"Contáctanos",

magazine:"Revista",
coverStars:"Estrellas de portada",
offers:"Descuentos",
places:"Mascotas bienvenidas",
articles:"Artículos",
photos:"Fotos",
travel:"Viajes",
fashion:"Moda",
wellness:"Salud",
community:"Comunidad",
contests:"Concursos",
rescue:"Ayuda",
marketplace:"Marketplace",
partners:"Socios"
},


it:{
menu:"Contenuti",
profile:"Profilo",
club:"Unisciti al Club",
language:"Lingua",
contact:"Contattaci",

magazine:"Rivista",
coverStars:"Cover Star",
offers:"Sconti",
places:"Animali benvenuti",
articles:"Articoli",
photos:"Foto",
travel:"Viaggi",
fashion:"Moda",
wellness:"Salute",
community:"Community",
contests:"Concorsi",
rescue:"Aiuto",
marketplace:"Marketplace",
partners:"Partner"
},


pt:{
menu:"Conteúdo",
profile:"Perfil",
club:"Entrar no Club",
language:"Idioma",
contact:"Contacte-nos",

magazine:"Revista",
coverStars:"Estrelas da capa",
offers:"Descontos",
places:"Animais bem-vindos",
articles:"Artigos",
photos:"Fotos",
travel:"Viagens",
fashion:"Moda",
wellness:"Saúde",
community:"Comunidade",
contests:"Concursos",
rescue:"Ajuda",
marketplace:"Marketplace",
partners:"Parceiros"
},


nl:{
menu:"Inhoud",
profile:"Profiel",
club:"Word lid van Club",
language:"Taal",
contact:"Contact",

magazine:"Magazine",
coverStars:"Coversterren",
offers:"Kortingen",
places:"Huisdieren welkom",
articles:"Artikelen",
photos:"Foto's",
travel:"Reizen",
fashion:"Mode",
wellness:"Gezondheid",
community:"Community",
contests:"Wedstrijden",
rescue:"Hulp",
marketplace:"Marktplaats",
partners:"Partners"
},


pl:{
menu:"Spis treści",
profile:"Profil",
club:"Dołącz do Club",
language:"Język",
contact:"Kontakt",

magazine:"Magazyn",
coverStars:"Gwiazdy okładki",
offers:"Zniżki",
places:"Pupile mile widziane",
articles:"Artykuły",
photos:"Zdjęcia",
travel:"Podróże",
fashion:"Moda",
wellness:"Zdrowie",
community:"Społeczność",
contests:"Konkursy",
rescue:"Pomoc",
marketplace:"Marketplace",
partners:"Partnerzy"
},


cs:{
menu:"Obsah",
profile:"Profil",
club:"Vstoupit do Club",
language:"Jazyk",
contact:"Kontaktujte nás",

magazine:"Magazín",
coverStars:"Hvězdy obálky",
offers:"Slevy",
places:"Mazlíčci vítáni",
articles:"Články",
photos:"Fotografie",
travel:"Cestování",
fashion:"Móda",
wellness:"Zdraví",
community:"Komunita",
contests:"Soutěže",
rescue:"Pomoc",
marketplace:"Marketplace",
partners:"Partneři"
},


sk:{
menu:"Obsah",
profile:"Profil",
club:"Vstúpiť do Club",
language:"Jazyk",
contact:"Kontaktujte nás",

magazine:"Magazín",
coverStars:"Hviezdy obálky",
offers:"Zľavy",
places:"Miláčikovia vítaní",
articles:"Články",
photos:"Fotografie",
travel:"Cestovanie",
fashion:"Móda",
wellness:"Zdravie",
community:"Komunita",
contests:"Súťaže",
rescue:"Pomoc",
marketplace:"Marketplace",
partners:"Partneri"
},


hu:{
menu:"Tartalom",
profile:"Profil",
club:"Csatlakozás a Clubhoz",
language:"Nyelv",
contact:"Kapcsolat",

magazine:"Magazin",
coverStars:"Címlapsztárok",
offers:"Kedvezmények",
places:"Állatbarát",
articles:"Cikkek",
photos:"Fotók",
travel:"Utazás",
fashion:"Divat",
wellness:"Egészség",
community:"Közösség",
contests:"Versenyek",
rescue:"Segítség",
marketplace:"Piactér",
partners:"Partnerek"
},


ro:{
menu:"Conținut",
profile:"Profil",
club:"Intră în Club",
language:"Limbă",
contact:"Contactați-ne",

magazine:"Revistă",
coverStars:"Vedete de copertă",
offers:"Reduceri",
places:"Animale binevenite",
articles:"Articole",
photos:"Fotografii",
travel:"Călătorii",
fashion:"Modă",
wellness:"Sănătate",
community:"Comunitate",
contests:"Concursuri",
rescue:"Ajutor",
marketplace:"Marketplace",
partners:"Parteneri"
},


bg:{
menu:"Съдържание",
profile:"Профил",
club:"Влезте в Club",
language:"Език",
contact:"Свържете се с нас",

magazine:"Списание",
coverStars:"Звезди на корицата",
offers:"Отстъпки",
places:"Любимци добре дошли",
articles:"Статии",
photos:"Снимки",
travel:"Пътувания",
fashion:"Мода",
wellness:"Здраве",
community:"Общност",
contests:"Конкурси",
rescue:"Помощ",
marketplace:"Маркетплейс",
partners:"Партньори"
},


el:{
menu:"Περιεχόμενα",
profile:"Προφίλ",
club:"Εγγραφή στο Club",
language:"Γλώσσα",
contact:"Επικοινωνία",

magazine:"Περιοδικό",
coverStars:"Αστέρια εξωφύλλου",
offers:"Εκπτώσεις",
places:"Κατοικίδια ευπρόσδεκτα",
articles:"Άρθρα",
photos:"Φωτογραφίες",
travel:"Ταξίδια",
fashion:"Μόδα",
wellness:"Υγεία",
community:"Κοινότητα",
contests:"Διαγωνισμοί",
rescue:"Βοήθεια",
marketplace:"Marketplace",
partners:"Συνεργάτες"
},


sv:{
menu:"Innehåll",
profile:"Profil",
club:"Gå med i Club",
language:"Språk",
contact:"Kontakta oss",

magazine:"Magasin",
coverStars:"Omslagsstjärnor",
offers:"Rabatter",
places:"Husdjur välkomna",
articles:"Artiklar",
photos:"Foton",
travel:"Resor",
fashion:"Mode",
wellness:"Hälsa",
community:"Community",
contests:"Tävlingar",
rescue:"Hjälp",
marketplace:"Marknadsplats",
partners:"Partners"
},


da:{
menu:"Indhold",
profile:"Profil",
club:"Tilmeld Club",
language:"Sprog",
contact:"Kontakt os",

magazine:"Magasin",
coverStars:"Forsidestjerner",
offers:"Rabatter",
places:"Kæledyr velkomne",
articles:"Artikler",
photos:"Fotos",
travel:"Rejser",
fashion:"Mode",
wellness:"Sundhed",
community:"Community",
contests:"Konkurrencer",
rescue:"Hjælp",
marketplace:"Marketplace",
partners:"Partnere"
},


no:{
menu:"Innhold",
profile:"Profil",
club:"Bli med i Club",
language:"Språk",
contact:"Kontakt oss",

magazine:"Magasin",
coverStars:"Forsidestjerner",
offers:"Rabatter",
places:"Kjæledyr velkomne",
articles:"Artikler",
photos:"Bilder",
travel:"Reiser",
fashion:"Mote",
wellness:"Helse",
community:"Fellesskap",
contests:"Konkurranser",
rescue:"Hjelp",
marketplace:"Markedsplass",
partners:"Partnere"
},


fi:{
menu:"Sisältö",
profile:"Profiili",
club:"Liity Clubiin",
language:"Kieli",
contact:"Ota yhteyttä",

magazine:"Lehti",
coverStars:"Kansitähdet",
offers:"Alennukset",
places:"Lemmikit tervetulleita",
articles:"Artikkelit",
photos:"Kuvat",
travel:"Matkailu",
fashion:"Muoti",
wellness:"Terveys",
community:"Yhteisö",
contests:"Kilpailut",
rescue:"Apu",
marketplace:"Marketplace",
partners:"Kumppanit"
},


tr:{
menu:"İçindekiler",
profile:"Profil",
club:"Club'a katıl",
language:"Dil",
contact:"Bize ulaşın",

magazine:"Dergi",
coverStars:"Kapak yıldızları",
offers:"İndirimler",
places:"Evcil hayvanlar hoş geldi",
articles:"Makaleler",
photos:"Fotoğraflar",
travel:"Seyahat",
fashion:"Moda",
wellness:"Sağlık",
community:"Topluluk",
contests:"Yarışmalar",
rescue:"Yardım",
marketplace:"Pazar",
partners:"Ortaklar"
},


ar:{
menu:"المحتويات",
profile:"الملف الشخصي",
club:"الانضمام إلى النادي",
language:"اللغة",
contact:"اتصل بنا",

magazine:"المجلة",
coverStars:"نجوم الغلاف",
offers:"الخصومات",
places:"الحيوانات مرحب بها",
articles:"المقالات",
photos:"الصور",
travel:"السفر",
fashion:"الموضة",
wellness:"الصحة",
community:"المجتمع",
contests:"المسابقات",
rescue:"المساعدة",
marketplace:"السوق",
partners:"الشركاء"
},


hi:{
menu:"सामग्री",
profile:"प्रोफ़ाइल",
club:"क्लब में शामिल हों",
language:"भाषा",
contact:"संपर्क करें",

magazine:"पत्रिका",
coverStars:"कवर स्टार",
offers:"छूट",
places:"पालतू जानवरों का स्वागत है",
articles:"लेख",
photos:"फ़ोटो",
travel:"यात्रा",
fashion:"फ़ैशन",
wellness:"स्वास्थ्य",
community:"समुदाय",
contests:"प्रतियोगिताएँ",
rescue:"मदद",
marketplace:"मार्केटप्लेस",
partners:"पार्टनर"
}

};


/* =========================================================
LANGUAGE OPTIONS
========================================================= */

const LANGUAGE_OPTIONS=[

["en","🇬🇧 EN — English"],

["uk","🇺🇦 UA — Українська"],

["ru","🇷🇺 RU — Русский"],

["fr","🇫🇷 FR — Français"],

["de","🇩🇪 DE — Deutsch"],

["es","🇪🇸 ES — Español"],

["it","🇮🇹 IT — Italiano"],

["pt","🇵🇹 PT — Português"],

["nl","🇳🇱 NL — Nederlands"],

["pl","🇵🇱 PL — Polski"],

["cs","🇨🇿 CZ — Čeština"],

["sk","🇸🇰 SK — Slovenčina"],

["hu","🇭🇺 HU — Magyar"],

["ro","🇷🇴 RO — Română"],

["bg","🇧🇬 BG — Български"],

["el","🇬🇷 GR — Ελληνικά"],

["sv","🇸🇪 SE — Svenska"],

["da","🇩🇰 DK — Dansk"],

["no","🇳🇴 NO — Norsk"],

["fi","🇫🇮 FI — Suomi"],

["tr","🇹🇷 TR — Türkçe"],

["ar","🇸🇦 AR — العربية"],

["hi","🇮🇳 HI — हिन्दी"]

];


/* =========================================================
STATE
========================================================= */

let activeKey=
"";


let activePositionDone=
false;


let userTouchedRubrics=
false;


/* =========================================================
HELPERS
========================================================= */

function normalizeLanguage(
value
){

let code=
String(
value||
"en"
)
.trim()
.toLowerCase();


if(
code.includes("-")
){

code=
code.split("-")[0];

}


if(
code.includes("_")
){

code=
code.split("_")[0];

}


return(
LANGUAGE_ALIASES[code]||
code||
"en"
);

}


function getLanguage(){

let language=
"";


if(
window.PetsDogueLanguage &&
typeof window.PetsDogueLanguage
.getCurrentLanguage===
"function"
){

try{

const result=
window.PetsDogueLanguage
.getCurrentLanguage();


if(
typeof result===
"string"
){

language=
result;

}else if(
result &&
typeof result===
"object"
){

language=
result.code||
result.language||
result.lang||
"";

}

}catch(error){

console.warn(
"PETS & DOGUE: language read failed.",
error
);

}

}


language=
normalizeLanguage(
language||
localStorage.getItem(
LANGUAGE_KEY
)||
document.documentElement.lang||
"en"
);


return(
TEXT[language]
?language
:"en"
);

}


function currentFilename(){

const path=
String(
window.location.pathname||
""
);


const file=
path
.split("/")
.filter(Boolean)
.pop();


return(
file||
"index.html"
);

}


function getActiveKey(){

return(
PAGE_KEYS[
currentFilename()
]||
""
);

}


/* =========================================================
MASTER CSS
========================================================= */

function installStyles(){

const previous=
document.getElementById(
"pdGlobalShellStyles"
);


if(
previous
){

previous.remove();

}


const style=
document.createElement(
"style"
);


style.id=
"pdGlobalShellStyles";


style.textContent=`

/* =========================================================
HIDE ONLY OLD TOP SHELL ELEMENTS MARKED BY JS
========================================================= */

.pd-global-old-shell-hidden{
display:none !important;
}


/* =========================================================
MASTER HEADER
========================================================= */

#pdGlobalHeader{
position:sticky;

top:0;

z-index:7000;

width:100%;

background:#070707;

color:#fff;

border-bottom:1px solid #292929;

font-family:
Arial,
Helvetica,
sans-serif;
}


/* =========================================================
TOP ROW
APPROVED COMPACT SCALE
========================================================= */

#pdGlobalHeaderMain{
height:78px;

min-height:78px;

display:grid;

grid-template-columns:
48px
minmax(0,1fr)
48px;

align-items:center;

gap:5px;

padding:0 10px;

margin:0 auto;

max-width:1500px;
}


/* =========================================================
HAMBURGER
========================================================= */

#pdGlobalMenuButton{
width:43px;

height:43px;

padding:7px 5px;

border:0;

background:transparent;

display:grid;

align-content:center;

gap:5px;
}

#pdGlobalMenuButton span{
display:block;

width:100%;

height:2px;

background:#fff;

border-radius:99px;
}


/* =========================================================
LOGO
========================================================= */

#pdGlobalBrand{
justify-self:center;

display:flex;

flex-direction:column;

align-items:center;

justify-content:center;

text-align:center;

white-space:nowrap;

text-decoration:none;
}

#pdGlobalBrandSmall{
font-family:
Georgia,
"Times New Roman",
serif;

font-size:8px;

font-weight:400;

line-height:1;

letter-spacing:1.65px;

text-transform:uppercase;

color:#c89b3c;
}

#pdGlobalBrandBig{
margin-top:5px;

font-family:
Georgia,
"Times New Roman",
serif;

font-size:31px;

font-weight:400;

line-height:.82;

letter-spacing:1.8px;

color:#c89b3c;
}


/* =========================================================
HOME
========================================================= */

#pdGlobalHome{
justify-self:end;

width:43px;

height:43px;

display:flex;

align-items:center;

justify-content:center;

border:0;

background:transparent;

color:#fff;

text-decoration:none;
}

#pdGlobalHome svg{
width:29px;

height:29px;

fill:none;

stroke:#fff;

stroke-width:2.15;

stroke-linecap:round;

stroke-linejoin:round;
}


/* =========================================================
RUBRIC STRIP
========================================================= */

#pdGlobalRubrics{
position:relative;

width:100%;

height:46px;

min-height:46px;

display:flex;

align-items:stretch;

gap:0;

padding:0 7px;

margin:0;

overflow-x:auto;

overflow-y:hidden;

background:#070707;

border-top:1px solid #292929;

border-bottom:1px solid #292929;

scrollbar-width:none;

-webkit-overflow-scrolling:touch;

touch-action:pan-x;

overscroll-behavior-inline:contain;

scroll-behavior:auto;

scroll-snap-type:none;

direction:ltr;
}

#pdGlobalRubrics::-webkit-scrollbar{
display:none;

width:0;

height:0;
}

#pdGlobalRubrics::before,
#pdGlobalRubrics::after{
content:"";

display:block;

flex:0 0 8px;

height:1px;

pointer-events:none;
}

#pdGlobalRubrics a{
position:relative;

flex:0 0 auto;

min-width:max-content;

height:46px;

padding:0 16px;

display:flex;

align-items:center;

justify-content:center;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:11.5px;

font-weight:900;

line-height:1;

letter-spacing:.45px;

text-transform:uppercase;

white-space:nowrap;

color:#fff;

text-decoration:none;

user-select:none;

-webkit-user-select:none;

-webkit-user-drag:none;
}

#pdGlobalRubrics a.active{
color:#efd38c;
}

#pdGlobalRubrics a.active::after{
content:"";

position:absolute;

left:15px;

right:15px;

bottom:0;

height:3px;

background:
linear-gradient(
90deg,
#8c6011 0%,
#d3a33d 25%,
#fff0a6 50%,
#d3a33d 75%,
#8c6011 100%
);
}


/* =========================================================
OVERLAY
========================================================= */

#pdGlobalOverlay{
position:fixed;

inset:0;

z-index:8900;

background:rgba(0,0,0,.58);

opacity:0;

visibility:hidden;

pointer-events:none;

transition:
opacity .22s ease,
visibility .22s ease;

backdrop-filter:blur(1px);

-webkit-backdrop-filter:blur(1px);
}

#pdGlobalOverlay.show{
opacity:1;

visibility:visible;

pointer-events:auto;
}


/* =========================================================
COMPACT SIDE MENU

IMPORTANT:
NOT FULL SCREEN.
LEFT SIDE ONLY.
========================================================= */

#pdGlobalMenu{
position:fixed;

top:0;

left:0;

bottom:0;

z-index:9000;

width:min(82vw,340px);

max-width:340px;

background:#f7f3ea;

color:#111;

overflow-y:auto;

overscroll-behavior:contain;

box-shadow:
14px
0
32px
rgba(0,0,0,.24);

transform:translateX(-104%);

transition:transform .27s ease;

font-family:
Arial,
Helvetica,
sans-serif;
}

#pdGlobalMenu.open{
transform:translateX(0);
}


/* =========================================================
MENU HEADER
========================================================= */

.pd-global-menu-head{
position:sticky;

top:0;

z-index:4;

height:74px;

min-height:74px;

padding:0 15px 0 18px;

display:flex;

align-items:center;

justify-content:space-between;

background:#080808;

color:#fff;

border-bottom:1px solid #292929;
}

.pd-global-menu-head h2{
margin:0;

font-family:
Georgia,
"Times New Roman",
serif;

font-size:29px;

font-weight:400;

line-height:1;
}

#pdGlobalClose{
width:39px;

height:39px;

display:flex;

align-items:center;

justify-content:center;

border:1px solid #444;

border-radius:50%;

background:#111;

color:#fff;

font-size:25px;

font-weight:300;

line-height:1;
}


/* =========================================================
PROFILE + CLUB
========================================================= */

.pd-global-account{
display:grid;

grid-template-columns:1fr 1fr;

gap:7px;

padding:12px;

border-bottom:1px solid #d7d1c6;
}

.pd-global-account a{
min-height:44px;

padding:7px 9px;

display:flex;

align-items:center;

justify-content:center;

text-align:center;

border:1.5px solid #111;

border-radius:8px;

background:#fff;

color:#111;

font-size:10.5px;

font-weight:900;

line-height:1.15;

text-transform:uppercase;

text-decoration:none;
}

.pd-global-account a.club{
background:#65e51f;

border-color:#65e51f;
}


/* =========================================================
LANGUAGE
========================================================= */

.pd-global-language{
padding:11px 12px 12px;

border-bottom:1px solid #d7d1c6;
}

.pd-global-language label{
display:block;

margin:0 0 6px 2px;

font-size:8px;

font-weight:900;

letter-spacing:1.8px;

text-transform:uppercase;

color:#777;
}

#pdGlobalLanguage{
width:100%;

height:43px;

padding:0 12px;

border:1.5px solid #111;

border-radius:8px;

outline:0;

background:#fff;

color:#111;

font-size:12px;

font-weight:800;
}


/* =========================================================
MENU RUBRICS
========================================================= */

#pdGlobalMenuList{
display:grid;

gap:5px;

padding:10px 12px 16px;
}

#pdGlobalMenuList a{
min-height:40px;

padding:8px 12px;

display:flex;

align-items:center;

border:1.5px solid #111;

border-radius:8px;

background:#fff;

color:#111;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:11px;

font-weight:850;

line-height:1.15;

text-transform:uppercase;

text-decoration:none;
}

#pdGlobalMenuList a.active{
background:#111;

color:#efd38c;

border-color:#111;
}


/* =========================================================
CONTACT
========================================================= */

.pd-global-menu-footer{
padding:0 12px 18px;
}

.pd-global-menu-footer a{
min-height:42px;

display:flex;

align-items:center;

justify-content:center;

border:0;

border-radius:8px;

background:#d4a536;

color:#111;

font-size:11px;

font-weight:900;

text-transform:uppercase;

text-decoration:none;
}


/* =========================================================
BODY LOCK
========================================================= */

body.pd-global-menu-open{
overflow:hidden !important;
}


/* =========================================================
RTL

Page remains RTL.
Global navigation physical order remains fixed.
========================================================= */

html[dir="rtl"] #pdGlobalRubrics{
direction:ltr;
}

html[dir="rtl"] #pdGlobalRubrics a{
direction:rtl;
}

html[dir="rtl"] #pdGlobalMenu{
left:auto;

right:0;

box-shadow:
-14px
0
32px
rgba(0,0,0,.24);

transform:translateX(104%);
}

html[dir="rtl"] #pdGlobalMenu.open{
transform:translateX(0);
}

html[dir="rtl"] .pd-global-menu-head,
html[dir="rtl"] #pdGlobalMenuList a{
text-align:right;
}


/* =========================================================
VERY SMALL MOBILE
========================================================= */

@media(max-width:390px){

#pdGlobalHeaderMain{
height:76px;

min-height:76px;

grid-template-columns:
46px
minmax(0,1fr)
46px;

padding:0 8px;
}

#pdGlobalBrandBig{
font-size:30px;

letter-spacing:1.6px;
}

#pdGlobalRubrics{
height:45px;

min-height:45px;

padding-left:5px;

padding-right:5px;
}

#pdGlobalRubrics a{
height:45px;

padding-left:15px;

padding-right:15px;

font-size:11px;
}

}


/* =========================================================
TABLET / DESKTOP

Same proportions, slightly more breathing room.
========================================================= */

@media(min-width:851px){

#pdGlobalHeaderMain{
height:88px;

min-height:88px;

grid-template-columns:
56px
minmax(0,1fr)
56px;

padding:0 18px;
}

#pdGlobalMenuButton{
width:48px;

height:48px;

padding:7px;

gap:6px;
}

#pdGlobalBrandSmall{
font-size:10px;

letter-spacing:2px;
}

#pdGlobalBrandBig{
font-size:39px;

letter-spacing:3px;

margin-top:6px;
}

#pdGlobalHome{
width:48px;

height:48px;
}

#pdGlobalHome svg{
width:31px;

height:31px;
}

#pdGlobalRubrics{
height:50px;

min-height:50px;

padding:0 10px;
}

#pdGlobalRubrics a{
height:50px;

padding:0 18px;

font-size:12px;
}

}


/* =========================================================
REDUCED MOTION
========================================================= */

@media(prefers-reduced-motion:reduce){

#pdGlobalMenu,
#pdGlobalOverlay{
transition:none;
}

}

`;


document.head.appendChild(
style
);

}


/* =========================================================
MARK EXISTING TOP SHELL

We keep the original elements in the DOM.
We only hide their visual copy.
This minimizes risk to page-specific JS.
========================================================= */

function hideExistingShell(){

const elements=
[
...document.querySelectorAll(
"header.site-header"
)
];


elements.forEach(
element=>{

if(
element.id!=="pdGlobalHeader"
){

element.classList.add(
"pd-global-old-shell-hidden"
);

}

}
);


/*
Some pages have the rubric strip outside the header.
Hide only a top-of-page strip with known navigation classes.
*/

const navSelectors=[

".primary-nav",

".category-nav",

".global-nav",

".rubric-nav",

"#categoryNav"

];


navSelectors.forEach(
selector=>{

document
.querySelectorAll(
selector
)
.forEach(
element=>{

if(
element.id===
"pdGlobalRubrics"
){

return;

}


const rect=
element
.getBoundingClientRect();


if(
rect.top<
320
){

element.classList.add(
"pd-global-old-shell-hidden"
);

}

}
);

}
);

}


/* =========================================================
CREATE HEADER
========================================================= */

function createHeader(){

if(
document.getElementById(
"pdGlobalHeader"
)
){

return;

}


const header=
document.createElement(
"header"
);


header.id=
"pdGlobalHeader";


header.innerHTML=`

<div id="pdGlobalHeaderMain">

<button
id="pdGlobalMenuButton"
type="button"
aria-label="Open menu"
>

<span></span>
<span></span>
<span></span>

</button>


<a
id="pdGlobalBrand"
class="notranslate"
href="index.html"
translate="no"
>

<span id="pdGlobalBrandSmall">
PETS &amp;
</span>

<span id="pdGlobalBrandBig">
DOGUE
</span>

</a>


<a
id="pdGlobalHome"
href="index.html"
aria-label="Home"
>

<svg
viewBox="0 0 24 24"
aria-hidden="true"
>

<path d="M3 10.5 12 3l9 7.5V21H3Z"></path>

<path d="M9 21v-7h6v7"></path>

</svg>

</a>

</div>


<nav
id="pdGlobalRubrics"
aria-label="PETS & DOGUE sections"
>
</nav>

`;


const firstBodyChild=
document.body.firstChild;


document.body.insertBefore(
header,
firstBodyChild
);


document
.getElementById(
"pdGlobalMenuButton"
)
.addEventListener(
"click",
openMenu
);

}


/* =========================================================
CREATE MENU
========================================================= */

function createSideMenu(){

if(
document.getElementById(
"pdGlobalMenu"
)
){

return;

}


const overlay=
document.createElement(
"div"
);


overlay.id=
"pdGlobalOverlay";


const menu=
document.createElement(
"aside"
);


menu.id=
"pdGlobalMenu";


menu.setAttribute(
"aria-hidden",
"true"
);


document.body.appendChild(
overlay
);


document.body.appendChild(
menu
);


overlay.addEventListener(
"click",
closeMenu
);

}


/* =========================================================
OPEN / CLOSE
========================================================= */

function openMenu(){

const menu=
document.getElementById(
"pdGlobalMenu"
);


const overlay=
document.getElementById(
"pdGlobalOverlay"
);


if(
!menu||
!overlay
){

return;

}


menu.classList.add(
"open"
);


overlay.classList.add(
"show"
);


menu.setAttribute(
"aria-hidden",
"false"
);


document.body.classList.add(
"pd-global-menu-open"
);

}


function closeMenu(){

const menu=
document.getElementById(
"pdGlobalMenu"
);


const overlay=
document.getElementById(
"pdGlobalOverlay"
);


if(
!menu||
!overlay
){

return;

}


menu.classList.remove(
"open"
);


overlay.classList.remove(
"show"
);


menu.setAttribute(
"aria-hidden",
"true"
);


document.body.classList.remove(
"pd-global-menu-open"
);

}


/* =========================================================
RENDER TOP RUBRICS
========================================================= */

function renderRubrics(){

const language=
getLanguage();


const labels=
TEXT[language]||
TEXT.en;


const nav=
document.getElementById(
"pdGlobalRubrics"
);


if(
!nav
){

return;

}


const previousScroll=
nav.scrollLeft;


nav.innerHTML=
NAV_ITEMS
.map(
item=>{

const isActive=
item.key===
activeKey;


return`

<a
href="${item.url}"
class="${isActive?"active":""}"
${isActive?'aria-current="page"':""}
>

${labels[item.key]}

</a>

`;

}
)
.join("");


if(
userTouchedRubrics
){

requestAnimationFrame(
()=>{

nav.scrollLeft=
previousScroll;

}
);

}

}


/* =========================================================
RENDER SIDE MENU
========================================================= */

function renderSideMenu(){

const language=
getLanguage();


const labels=
TEXT[language]||
TEXT.en;


const menu=
document.getElementById(
"pdGlobalMenu"
);


if(
!menu
){

return;

}


menu.innerHTML=`

<div class="pd-global-menu-head">

<h2>
${labels.menu}
</h2>


<button
id="pdGlobalClose"
type="button"
aria-label="Close menu"
>
×
</button>

</div>


<div class="pd-global-account">

<a href="account.html">

${labels.profile}

</a>


<a
class="club"
href="club.html"
>

${labels.club}

</a>

</div>


<div class="pd-global-language">

<label for="pdGlobalLanguage">

${labels.language}

</label>


<select
id="pdGlobalLanguage"
aria-label="${labels.language}"
>

${LANGUAGE_OPTIONS
.map(
option=>`

<option
value="${option[0]}"
${option[0]===language?"selected":""}
>

${option[1]}

</option>

`
)
.join("")}

</select>

</div>


<nav id="pdGlobalMenuList">

${NAV_ITEMS
.map(
item=>`

<a
href="${item.url}"
class="${item.key===activeKey?"active":""}"
>

${labels[item.key]}

</a>

`
)
.join("")}

</nav>


<div class="pd-global-menu-footer">

<a href="contact.html">

${labels.contact}

</a>

</div>

`;


document
.getElementById(
"pdGlobalClose"
)
.addEventListener(
"click",
closeMenu
);


document
.getElementById(
"pdGlobalLanguage"
)
.addEventListener(
"change",
handleLanguageChange
);

}


/* =========================================================
LANGUAGE CHANGE

Do not replace any page translation system.
Update its existing storage key and emit the event
that current PETS & DOGUE pages already listen to.
========================================================= */

function handleLanguageChange(
event
){

const language=
normalizeLanguage(
event.target.value
);


localStorage.setItem(
LANGUAGE_KEY,
language
);


document.documentElement.lang=
language;


document.documentElement.dir=
language==="ar"
?"rtl"
:"ltr";


/*
If an existing language controller exposes
a setter, use it.
*/

if(
window.PetsDogueLanguage
){

const controller=
window.PetsDogueLanguage;


const setters=[

"setLanguage",

"changeLanguage",

"selectLanguage"

];


for(
const setter of setters
){

if(
typeof controller[setter]===
"function"
){

try{

controller[setter](
language
);

}catch(error){

console.warn(
"PETS & DOGUE language setter failed.",
error
);

}


break;

}

}

}


/*
Synchronize an existing page language select,
if the page already has one.
*/

const existingSelect=
document.getElementById(
"languageSelect"
);


if(
existingSelect &&
existingSelect!==event.target
){

try{

existingSelect.value=
language;


existingSelect.dispatchEvent(
new Event(
"change",
{
bubbles:true
}
)
);

}catch(error){

console.warn(
"PETS & DOGUE existing language select sync failed.",
error
);

}

}


/*
Pages such as articles.html already listen for
this event and re-render their own translated content.
*/

window.dispatchEvent(
new Event(
"petsdogue:languagechange"
)
);


renderRubrics();

renderSideMenu();

}


/* =========================================================
ACTIVE RUBRIC POSITION

ONE TIME ONLY.

After the first positioning:
NO forced recenter on scroll.
NO forced recenter on resize.
NO forced recenter on touch.
========================================================= */

function positionActiveOnce(){

if(
activePositionDone||
userTouchedRubrics
){

return;

}


const nav=
document.getElementById(
"pdGlobalRubrics"
);


if(
!nav
){

return;

}


const active=
nav.querySelector(
"a.active"
);


if(
!active
){

activePositionDone=
true;

return;

}


activePositionDone=
true;


requestAnimationFrame(
()=>{

requestAnimationFrame(
()=>{

try{

active.scrollIntoView(
{
behavior:"auto",
block:"nearest",
inline:"center"
}
);

}catch(error){

const target=
active.offsetLeft-
(
nav.clientWidth-
active.offsetWidth
)/
2;


nav.scrollLeft=
Math.max(
0,
target
);

}

}
);

}
);

}


/* =========================================================
FREE NATIVE SWIPE
========================================================= */

function installRubricInteraction(){

const nav=
document.getElementById(
"pdGlobalRubrics"
);


if(
!nav
){

return;

}


if(
nav.dataset.interactionReady===
"1"
){

return;

}


nav.dataset.interactionReady=
"1";


[
"touchstart",
"pointerdown",
"wheel"
]
.forEach(
eventName=>{

nav.addEventListener(
eventName,
()=>{

userTouchedRubrics=
true;

},
{
passive:true
}
);

}
);

}


/* =========================================================
LANGUAGE REFRESH FROM PAGE / OTHER TAB
========================================================= */

function refreshShellLanguage(){

renderRubrics();

renderSideMenu();

}


/* =========================================================
ESCAPE

Capture phase prevents an old page-specific Escape handler
from navigating away while this menu is open.
========================================================= */

function handleEscape(
event
){

if(
event.key!=="Escape"
){

return;

}


const menu=
document.getElementById(
"pdGlobalMenu"
);


if(
!menu||
!menu.classList.contains(
"open"
)
){

return;

}


event.preventDefault();

event.stopPropagation();

event.stopImmediatePropagation();


closeMenu();

}


/* =========================================================
START
========================================================= */

function start(){

activeKey=
getActiveKey();


installStyles();


/*
Hide visual copies of the old header/navigation only.
Existing elements stay in DOM so their page JS is not destroyed.
*/

hideExistingShell();


createHeader();

createSideMenu();


renderRubrics();

renderSideMenu();


installRubricInteraction();


setTimeout(
positionActiveOnce,
90
);


/*
Refresh shell labels if the page's current i18n system changes.
*/

window.addEventListener(
"petsdogue:languagechange",
()=>{

setTimeout(
refreshShellLanguage,
0
);

}
);


/*
Cross-tab language persistence.
*/

window.addEventListener(
"storage",
event=>{

if(
event.key===
LANGUAGE_KEY
){

setTimeout(
refreshShellLanguage,
0
);

}

}
);


/*
Close side menu with Escape without triggering
an old page-specific Escape action.
*/

document.addEventListener(
"keydown",
handleEscape,
true
);

}


/* =========================================================
INITIALISE
========================================================= */

if(
document.readyState===
"loading"
){

document.addEventListener(
"DOMContentLoaded",
start,
{
once:true
}
);

}else{

start();

}

})();
