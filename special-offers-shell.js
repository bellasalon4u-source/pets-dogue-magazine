"use strict";

/* =========================================================
PETS & DOGUE
SPECIAL OFFERS — MASTER HEADER SHELL

VISUAL REFERENCE:
issue-01.html

ONLY:
- unified header scale
- hamburger
- PETS & DOGUE logo
- home icon
- fixed global rubric order
- Discounts active
- free horizontal native swipe
- language selector inside menu

DOES NOT CHANGE:
- offers
- country/location logic
- Club verification
- vouchers
- Stripe
- API calls
- offer cards
- existing page translations
========================================================= */

(function(){

const LANGUAGE_KEY="pets_dogue_language";

const LANGUAGE_ALIASES={
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};


/* =========================================================
ONE GLOBAL NAVIGATION ORDER
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
key:"marketplace",
url:"pet-marketplace.html"
},

{
key:"contests",
url:"contests.html"
},

{
key:"partners",
url:"partners.html"
}

];


/* =========================================================
23 LANGUAGES
========================================================= */

const NAV_TEXT={

en:{
menu:"Contents",
profile:"Profile",
subscribe:"Subscribe",
language:"Language",
magazine:"Magazine",
coverStars:"Cover Stars",
offers:"Discounts",
places:"Pet-Friendly Welcome",
articles:"Articles",
photos:"Photos",
fashion:"Fashion",
wellness:"Health",
community:"Community",
marketplace:"Marketplace",
contests:"Contests",
partners:"Partners"
},

uk:{
menu:"Зміст",
profile:"Профіль",
subscribe:"Підписка",
language:"Мова",
magazine:"Журнал",
coverStars:"Зірки обкладинки",
offers:"Знижки",
places:"Улюбленцям раді",
articles:"Статті",
photos:"Фото",
fashion:"Мода",
wellness:"Здоров’я",
community:"Спільнота",
marketplace:"Маркетплейс",
contests:"Конкурси",
partners:"Партнери"
},

ru:{
menu:"Содержание",
profile:"Профиль",
subscribe:"Подписка",
language:"Язык",
magazine:"Журнал",
coverStars:"Звёзды обложки",
offers:"Скидки",
places:"Питомцам рады",
articles:"Статьи",
photos:"Фото",
fashion:"Мода",
wellness:"Здоровье",
community:"Сообщество",
marketplace:"Маркетплейс",
contests:"Конкурсы",
partners:"Партнёры"
},

fr:{
menu:"Sommaire",
profile:"Profil",
subscribe:"Abonnement",
language:"Langue",
magazine:"Magazine",
coverStars:"Stars de couverture",
offers:"Réductions",
places:"Animaux bienvenus",
articles:"Articles",
photos:"Photos",
fashion:"Mode",
wellness:"Santé",
community:"Communauté",
marketplace:"Marketplace",
contests:"Concours",
partners:"Partenaires"
},

de:{
menu:"Inhalt",
profile:"Profil",
subscribe:"Abo",
language:"Sprache",
magazine:"Magazin",
coverStars:"Cover Stars",
offers:"Rabatte",
places:"Tiere willkommen",
articles:"Artikel",
photos:"Fotos",
fashion:"Mode",
wellness:"Gesundheit",
community:"Community",
marketplace:"Marktplatz",
contests:"Wettbewerbe",
partners:"Partner"
},

es:{
menu:"Contenido",
profile:"Perfil",
subscribe:"Suscripción",
language:"Idioma",
magazine:"Revista",
coverStars:"Estrellas de portada",
offers:"Descuentos",
places:"Mascotas bienvenidas",
articles:"Artículos",
photos:"Fotos",
fashion:"Moda",
wellness:"Salud",
community:"Comunidad",
marketplace:"Marketplace",
contests:"Concursos",
partners:"Socios"
},

it:{
menu:"Contenuti",
profile:"Profilo",
subscribe:"Abbonamento",
language:"Lingua",
magazine:"Rivista",
coverStars:"Cover Star",
offers:"Sconti",
places:"Animali benvenuti",
articles:"Articoli",
photos:"Foto",
fashion:"Moda",
wellness:"Salute",
community:"Community",
marketplace:"Marketplace",
contests:"Concorsi",
partners:"Partner"
},

pt:{
menu:"Conteúdo",
profile:"Perfil",
subscribe:"Assinatura",
language:"Idioma",
magazine:"Revista",
coverStars:"Estrelas da capa",
offers:"Descontos",
places:"Animais bem-vindos",
articles:"Artigos",
photos:"Fotos",
fashion:"Moda",
wellness:"Saúde",
community:"Comunidade",
marketplace:"Marketplace",
contests:"Concursos",
partners:"Parceiros"
},

nl:{
menu:"Inhoud",
profile:"Profiel",
subscribe:"Abonnement",
language:"Taal",
magazine:"Magazine",
coverStars:"Coversterren",
offers:"Kortingen",
places:"Huisdieren welkom",
articles:"Artikelen",
photos:"Foto's",
fashion:"Mode",
wellness:"Gezondheid",
community:"Community",
marketplace:"Marktplaats",
contests:"Wedstrijden",
partners:"Partners"
},

pl:{
menu:"Spis treści",
profile:"Profil",
subscribe:"Subskrypcja",
language:"Język",
magazine:"Magazyn",
coverStars:"Gwiazdy okładki",
offers:"Zniżki",
places:"Pupile mile widziane",
articles:"Artykuły",
photos:"Zdjęcia",
fashion:"Moda",
wellness:"Zdrowie",
community:"Społeczność",
marketplace:"Marketplace",
contests:"Konkursy",
partners:"Partnerzy"
},

cs:{
menu:"Obsah",
profile:"Profil",
subscribe:"Předplatné",
language:"Jazyk",
magazine:"Magazín",
coverStars:"Hvězdy obálky",
offers:"Slevy",
places:"Mazlíčci vítáni",
articles:"Články",
photos:"Fotografie",
fashion:"Móda",
wellness:"Zdraví",
community:"Komunita",
marketplace:"Marketplace",
contests:"Soutěže",
partners:"Partneři"
},

sk:{
menu:"Obsah",
profile:"Profil",
subscribe:"Predplatné",
language:"Jazyk",
magazine:"Magazín",
coverStars:"Hviezdy obálky",
offers:"Zľavy",
places:"Miláčikovia vítaní",
articles:"Články",
photos:"Fotografie",
fashion:"Móda",
wellness:"Zdravie",
community:"Komunita",
marketplace:"Marketplace",
contests:"Súťaže",
partners:"Partneri"
},

hu:{
menu:"Tartalom",
profile:"Profil",
subscribe:"Előfizetés",
language:"Nyelv",
magazine:"Magazin",
coverStars:"Címlapsztárok",
offers:"Kedvezmények",
places:"Állatbarát",
articles:"Cikkek",
photos:"Fotók",
fashion:"Divat",
wellness:"Egészség",
community:"Közösség",
marketplace:"Piactér",
contests:"Versenyek",
partners:"Partnerek"
},

ro:{
menu:"Conținut",
profile:"Profil",
subscribe:"Abonament",
language:"Limbă",
magazine:"Revistă",
coverStars:"Vedete de copertă",
offers:"Reduceri",
places:"Animale binevenite",
articles:"Articole",
photos:"Fotografii",
fashion:"Modă",
wellness:"Sănătate",
community:"Comunitate",
marketplace:"Marketplace",
contests:"Concursuri",
partners:"Parteneri"
},

bg:{
menu:"Съдържание",
profile:"Профил",
subscribe:"Абонамент",
language:"Език",
magazine:"Списание",
coverStars:"Звезди на корицата",
offers:"Отстъпки",
places:"Любимци добре дошли",
articles:"Статии",
photos:"Снимки",
fashion:"Мода",
wellness:"Здраве",
community:"Общност",
marketplace:"Маркетплейс",
contests:"Конкурси",
partners:"Партньори"
},

el:{
menu:"Περιεχόμενα",
profile:"Προφίλ",
subscribe:"Συνδρομή",
language:"Γλώσσα",
magazine:"Περιοδικό",
coverStars:"Αστέρια εξωφύλλου",
offers:"Εκπτώσεις",
places:"Κατοικίδια ευπρόσδεκτα",
articles:"Άρθρα",
photos:"Φωτογραφίες",
fashion:"Μόδα",
wellness:"Υγεία",
community:"Κοινότητα",
marketplace:"Marketplace",
contests:"Διαγωνισμοί",
partners:"Συνεργάτες"
},

sv:{
menu:"Innehåll",
profile:"Profil",
subscribe:"Prenumeration",
language:"Språk",
magazine:"Magasin",
coverStars:"Omslagsstjärnor",
offers:"Rabatter",
places:"Husdjur välkomna",
articles:"Artiklar",
photos:"Foton",
fashion:"Mode",
wellness:"Hälsa",
community:"Community",
marketplace:"Marknadsplats",
contests:"Tävlingar",
partners:"Partners"
},

da:{
menu:"Indhold",
profile:"Profil",
subscribe:"Abonnement",
language:"Sprog",
magazine:"Magasin",
coverStars:"Forsidestjerner",
offers:"Rabatter",
places:"Kæledyr velkomne",
articles:"Artikler",
photos:"Fotos",
fashion:"Mode",
wellness:"Sundhed",
community:"Community",
marketplace:"Marketplace",
contests:"Konkurrencer",
partners:"Partnere"
},

no:{
menu:"Innhold",
profile:"Profil",
subscribe:"Abonnement",
language:"Språk",
magazine:"Magasin",
coverStars:"Forsidestjerner",
offers:"Rabatter",
places:"Kjæledyr velkomne",
articles:"Artikler",
photos:"Bilder",
fashion:"Mote",
wellness:"Helse",
community:"Fellesskap",
marketplace:"Markedsplass",
contests:"Konkurranser",
partners:"Partnere"
},

fi:{
menu:"Sisältö",
profile:"Profiili",
subscribe:"Tilaus",
language:"Kieli",
magazine:"Lehti",
coverStars:"Kansitähdet",
offers:"Alennukset",
places:"Lemmikit tervetulleita",
articles:"Artikkelit",
photos:"Kuvat",
fashion:"Muoti",
wellness:"Terveys",
community:"Yhteisö",
marketplace:"Marketplace",
contests:"Kilpailut",
partners:"Kumppanit"
},

tr:{
menu:"İçindekiler",
profile:"Profil",
subscribe:"Abonelik",
language:"Dil",
magazine:"Dergi",
coverStars:"Kapak yıldızları",
offers:"İndirimler",
places:"Evcil hayvanlar hoş geldi",
articles:"Makaleler",
photos:"Fotoğraflar",
fashion:"Moda",
wellness:"Sağlık",
community:"Topluluk",
marketplace:"Pazar",
contests:"Yarışmalar",
partners:"Ortaklar"
},

ar:{
menu:"المحتويات",
profile:"الملف الشخصي",
subscribe:"الاشتراك",
language:"اللغة",
magazine:"المجلة",
coverStars:"نجوم الغلاف",
offers:"الخصومات",
places:"الحيوانات مرحب بها",
articles:"المقالات",
photos:"الصور",
fashion:"الموضة",
wellness:"الصحة",
community:"المجتمع",
marketplace:"السوق",
contests:"المسابقات",
partners:"الشركاء"
},

hi:{
menu:"सामग्री",
profile:"प्रोफ़ाइल",
subscribe:"सदस्यता",
language:"भाषा",
magazine:"पत्रिका",
coverStars:"कवर स्टार",
offers:"छूट",
places:"पालतू जानवरों का स्वागत है",
articles:"लेख",
photos:"फ़ोटो",
fashion:"फ़ैशन",
wellness:"स्वास्थ्य",
community:"समुदाय",
marketplace:"मार्केटप्लेस",
contests:"प्रतियोगिताएँ",
partners:"पार्टनर"
}

};


/* =========================================================
LANGUAGE SELECT
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
INSTALL STYLE
========================================================= */

function installStyles(){

const oldStyle=
document.getElementById(
"pd-special-shell-style"
);

if(
oldStyle
){

oldStyle.remove();

}


const style=
document.createElement(
"style"
);

style.id=
"pd-special-shell-style";


style.textContent=`

/* =========================================================
PETS & DOGUE
EXACT COMPACT MASTER HEADER SCALE
========================================================= */

.pd-original-header-hidden{
display:none !important;
}


/* =========================================================
MASTER HEADER
========================================================= */

.pd-master-header{
position:sticky !important;

top:0 !important;

z-index:5000 !important;

width:100% !important;

background:#050505 !important;

color:#fff !important;

border-bottom:1px solid #292929 !important;
}


/* =========================================================
TOP ROW

Reference:
desktop 88px
tablet 84px
mobile 78px
========================================================= */

.pd-header-main{
height:88px;

min-height:88px;

max-width:1600px;

margin:auto;

padding:0 18px;

display:grid;

grid-template-columns:
58px
minmax(0,1fr)
58px;

align-items:center;

gap:10px;
}


/* =========================================================
HAMBURGER
========================================================= */

.pd-menu-button{
width:46px;

height:46px;

padding:7px;

border:0;

background:transparent;

display:grid;

align-content:center;

gap:6px;
}

.pd-menu-button span{
display:block;

width:100%;

height:2px;

background:#fff;

border-radius:999px;
}


/* =========================================================
BRAND
========================================================= */

.pd-brand{
justify-self:center;

text-align:center;

font-family:
Georgia,
"Times New Roman",
serif;

line-height:.83;

white-space:nowrap;

text-decoration:none;
}

.pd-brand-small{
font-size:10px;

letter-spacing:2px;

color:#c89b3c;

text-transform:uppercase;
}

.pd-brand-big{
margin-top:6px;

font-family:
Georgia,
"Times New Roman",
serif;

font-size:39px;

font-weight:400;

letter-spacing:3px;

color:#c89b3c;
}


/* =========================================================
HOME
========================================================= */

.pd-home-button{
justify-self:end;

width:46px;

height:46px;

display:flex;

align-items:center;

justify-content:center;

background:transparent;

border:0;

color:#fff;

text-decoration:none;
}

.pd-home-button svg{
display:block;

width:31px;

height:31px;

fill:none;

stroke:currentColor;

stroke-width:2.4;

stroke-linecap:round;

stroke-linejoin:round;
}


/* =========================================================
GLOBAL RUBRIC NAVIGATION
========================================================= */

.pd-category-nav{
width:100%;

height:50px;

min-height:50px;

display:flex;

align-items:stretch;

padding:0 8px;

gap:0;

overflow-x:auto;

overflow-y:hidden;

background:#070707;

border-top:1px solid #262626;

border-bottom:1px solid #262626;

scrollbar-width:none;

-webkit-overflow-scrolling:touch;

overscroll-behavior-x:contain;

scroll-behavior:auto;

scroll-snap-type:none;

touch-action:pan-x;
}

.pd-category-nav::-webkit-scrollbar{
display:none;
}

.pd-category-nav a{
position:relative;

flex:0 0 auto;

min-width:max-content;

height:50px;

padding:0 18px;

display:flex;

align-items:center;

justify-content:center;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:12px;

font-weight:900;

letter-spacing:.55px;

line-height:1;

text-transform:uppercase;

white-space:nowrap;

color:#fff;

text-decoration:none;

-webkit-user-drag:none;

user-select:none;
}

.pd-category-nav a.active{
color:#efd277;
}

.pd-category-nav a.active::after{
content:"";

position:absolute;

left:17px;

right:17px;

bottom:0;

height:3px;

background:
linear-gradient(
90deg,
#8c6011,
#f5dc8b,
#9b6a12
);
}


/* =========================================================
SIDE MENU OVERLAY
========================================================= */

.pd-shell-overlay{
position:fixed;

inset:0;

z-index:9000;

background:rgba(0,0,0,.72);

opacity:0;

visibility:hidden;

transition:
opacity .22s ease,
visibility .22s ease;

backdrop-filter:blur(2px);

-webkit-backdrop-filter:blur(2px);
}

.pd-shell-overlay.show{
opacity:1;

visibility:visible;
}


/* =========================================================
SIDE MENU
========================================================= */

.pd-shell-menu{
position:fixed;

top:0;

left:0;

bottom:0;

z-index:9100;

width:min(520px,90vw);

max-width:520px;

background:#f8f5ee;

color:#111;

overflow-y:auto;

transform:translateX(-103%);

transition:transform .28s ease;
}

.pd-shell-menu.open{
transform:translateX(0);
}

.pd-shell-menu-head{
position:sticky;

top:0;

z-index:5;

height:88px;

min-height:88px;

display:flex;

align-items:center;

justify-content:space-between;

padding:16px 22px;

background:#080808;

color:#fff;
}

.pd-shell-menu-head h2{
font-family:
Georgia,
"Times New Roman",
serif;

font-size:37px;

font-weight:400;

line-height:1;
}

.pd-shell-close{
width:45px;

height:45px;

border:0;

border-radius:50%;

display:flex;

align-items:center;

justify-content:center;

background:#fff;

color:#111;

font-size:29px;

line-height:1;
}

.pd-shell-tools{
display:grid;

grid-template-columns:1fr 1fr;

gap:9px;

padding:15px;

border-bottom:1px solid #d3cdc1;
}

.pd-shell-tool{
height:49px;

border:2px solid #111;

display:flex;

align-items:center;

justify-content:center;

background:#fff;

color:#111;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:11px;

font-weight:900;

text-transform:uppercase;

text-decoration:none;
}

.pd-shell-tool.club{
background:#65e51f;

border-color:#65e51f;
}

.pd-shell-language{
margin:15px;

padding:10px 13px;

border:2px solid #111;

background:#fff;
}

.pd-shell-language label{
display:block;

margin-bottom:7px;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:9px;

font-weight:900;

letter-spacing:2px;

color:#777;
}

.pd-shell-language select{
width:100%;

height:40px;

border:0;

outline:0;

background:#fff;

color:#111;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:14px;

font-weight:800;
}

.pd-shell-list{
display:grid;

gap:7px;

padding:0 15px 25px;
}

.pd-shell-list a{
min-height:54px;

padding:0 16px;

display:flex;

align-items:center;

border:2px solid #111;

background:#fff;

color:#111;

font-family:
Georgia,
"Times New Roman",
serif;

font-size:19px;

text-decoration:none;
}

.pd-shell-list a.active{
background:#111;

color:#efd277;
}


/* =========================================================
BODY MENU LOCK
========================================================= */

body.pd-menu-open{
overflow:hidden !important;
}


/* =========================================================
RTL
========================================================= */

html[dir="rtl"] .pd-shell-menu{
left:auto;

right:0;

transform:translateX(103%);
}

html[dir="rtl"] .pd-shell-menu.open{
transform:translateX(0);
}


/*
Keep physical category order identical
to all other languages.
*/

html[dir="rtl"] .pd-category-nav{
direction:ltr;
}

html[dir="rtl"] .pd-category-nav a{
direction:rtl;
}


/* =========================================================
TABLET
========================================================= */

@media(max-width:1000px){

.pd-header-main{
height:84px;

min-height:84px;

grid-template-columns:
54px
minmax(0,1fr)
54px;

padding:0 13px;
}

.pd-brand-big{
font-size:37px;
}

.pd-brand-small{
font-size:9px;
}

.pd-home-button{
width:42px;

height:42px;
}

.pd-home-button svg{
width:29px;

height:29px;
}

.pd-category-nav{
height:48px;

min-height:48px;
}

.pd-category-nav a{
height:48px;

padding:0 17px;

font-size:11.5px;
}

}


/* =========================================================
MOBILE
EXACT SCALE OF THE APPROVED ISSUE HEADER
========================================================= */

@media(max-width:850px){

.pd-header-main{
height:78px !important;

min-height:78px !important;

grid-template-columns:
48px
minmax(0,1fr)
48px !important;

gap:5px;

padding:
0
10px !important;
}


/* HAMBURGER */

.pd-menu-button{
width:43px !important;

height:43px !important;

padding:7px 5px !important;

gap:5px !important;
}

.pd-menu-button span{
height:2px !important;
}


/* LOGO */

.pd-brand-small{
font-size:8px !important;

letter-spacing:1.65px !important;
}

.pd-brand-big{
font-size:31px !important;

letter-spacing:1.8px !important;

margin-top:5px !important;
}


/* HOME */

.pd-home-button{
width:43px !important;

height:43px !important;
}

.pd-home-button svg{
width:29px !important;

height:29px !important;
}


/* CATEGORY STRIP */

.pd-category-nav{
height:46px !important;

min-height:46px !important;

padding:
0
7px !important;

overflow-x:auto !important;

overflow-y:hidden !important;

-webkit-overflow-scrolling:touch !important;

touch-action:pan-x !important;

scroll-behavior:auto !important;
}

.pd-category-nav a{
height:46px !important;

padding:
0
16px !important;

font-size:11.5px !important;

letter-spacing:.45px !important;
}

.pd-category-nav a.active::after{
left:15px !important;

right:15px !important;

height:3px !important;
}


/* SIDE MENU */

.pd-shell-menu{
width:min(520px,90vw);
}

.pd-shell-menu-head{
height:78px;

min-height:78px;

padding:13px 17px;
}

.pd-shell-menu-head h2{
font-size:32px;
}

.pd-shell-close{
width:42px;

height:42px;

font-size:27px;
}

}


/* =========================================================
SMALL MOBILE
========================================================= */

@media(max-width:390px){

.pd-header-main{
padding:
0
8px !important;
}

.pd-brand-big{
font-size:30px !important;

letter-spacing:1.6px !important;
}

.pd-category-nav a{
padding:
0
15px !important;

font-size:11px !important;
}

}

`;

document.head.appendChild(
style
);

}


/* =========================================================
LANGUAGE
========================================================= */

function normalizeLanguage(
value
){

const raw=
String(
value||
"en"
)
.toLowerCase();


return(
LANGUAGE_ALIASES[raw]||
raw
);

}


function getLanguage(){

const saved=
normalizeLanguage(
localStorage.getItem(
LANGUAGE_KEY
)||
document.documentElement.lang||
"en"
);


return(
NAV_TEXT[saved]
?saved
:"en"
);

}


/* =========================================================
CREATE MASTER HEADER
========================================================= */

function createMasterHeader(){

if(
document.getElementById(
"pdMasterHeader"
)
){

return;

}


const originalHeader=
document.querySelector(
"header.site-header"
);


if(
originalHeader
){

originalHeader.classList.add(
"pd-original-header-hidden"
);

}


const header=
document.createElement(
"header"
);


header.className=
"pd-master-header";


header.id=
"pdMasterHeader";


header.innerHTML=`

<div class="pd-header-main">

<button
class="pd-menu-button"
id="pdMasterMenuButton"
type="button"
aria-label="Open menu"
>

<span></span>
<span></span>
<span></span>

</button>


<a
class="pd-brand notranslate"
href="index.html"
translate="no"
>

<div class="pd-brand-small">
PETS &amp;
</div>

<div class="pd-brand-big">
DOGUE
</div>

</a>


<a
class="pd-home-button"
href="index.html"
aria-label="Home"
>

<svg viewBox="0 0 24 24">

<path d="M3 10.5 12 3l9 7.5V21H3Z"></path>

<path d="M9 21v-7h6v7"></path>

</svg>

</a>

</div>


<nav
class="pd-category-nav"
id="pdCategoryNav"
aria-label="PETS & DOGUE sections"
>
</nav>

`;


if(
originalHeader
){

originalHeader.parentNode.insertBefore(
header,
originalHeader
);

}else{

document.body.insertBefore(
header,
document.body.firstChild
);

}


document
.getElementById(
"pdMasterMenuButton"
)
?.addEventListener(
"click",
openMenu
);

}


/* =========================================================
CREATE SIDE MENU
========================================================= */

function createMenu(){

if(
document.getElementById(
"pdShellMenu"
)
){

return;

}


const overlay=
document.createElement(
"div"
);


overlay.className=
"pd-shell-overlay";


overlay.id=
"pdShellOverlay";


const menu=
document.createElement(
"aside"
);


menu.className=
"pd-shell-menu";


menu.id=
"pdShellMenu";


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
OPEN / CLOSE MENU
========================================================= */

function openMenu(){

document
.getElementById(
"pdShellMenu"
)
?.classList
.add(
"open"
);


document
.getElementById(
"pdShellOverlay"
)
?.classList
.add(
"show"
);


document.body.classList.add(
"pd-menu-open"
);

}


function closeMenu(){

document
.getElementById(
"pdShellMenu"
)
?.classList
.remove(
"open"
);


document
.getElementById(
"pdShellOverlay"
)
?.classList
.remove(
"show"
);


document.body.classList.remove(
"pd-menu-open"
);

}


/* =========================================================
RENDER TOP NAVIGATION
========================================================= */

function renderNavigation(){

const language=
getLanguage();


const tr=
NAV_TEXT[language]||
NAV_TEXT.en;


const nav=
document.getElementById(
"pdCategoryNav"
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

const active=
item.key==="offers";


return`

<a
href="${item.url}"
class="${active?"active":""}"
${active?'aria-current="page"':""}
>

${tr[item.key]}

</a>

`;

}
)
.join("");


requestAnimationFrame(
()=>{

nav.scrollLeft=
previousScroll;

}
);

}


/* =========================================================
RENDER SIDE MENU
========================================================= */

function renderMenu(){

const language=
getLanguage();


const tr=
NAV_TEXT[language]||
NAV_TEXT.en;


const menu=
document.getElementById(
"pdShellMenu"
);


if(
!menu
){

return;

}


menu.innerHTML=`

<div class="pd-shell-menu-head">

<h2>
${tr.menu}
</h2>

<button
class="pd-shell-close"
id="pdShellClose"
type="button"
aria-label="Close menu"
>
×
</button>

</div>


<div class="pd-shell-tools">

<a
class="pd-shell-tool"
href="account.html"
>
${tr.profile}
</a>

<a
class="pd-shell-tool club"
href="club.html"
>
${tr.subscribe}
</a>

</div>


<div class="pd-shell-language">

<label for="pdShellLanguage">
${tr.language.toUpperCase()}
</label>


<select
id="pdShellLanguage"
aria-label="${tr.language}"
>

${LANGUAGE_OPTIONS
.map(
item=>`

<option
value="${item[0]}"
${item[0]===language?"selected":""}
>

${item[1]}

</option>

`
)
.join("")}

</select>

</div>


<nav class="pd-shell-list">

${NAV_ITEMS
.map(
item=>`

<a
href="${item.url}"
class="${item.key==="offers"?"active":""}"
>

${tr[item.key]}

</a>

`
)
.join("")}

</nav>

`;


document
.getElementById(
"pdShellClose"
)
?.addEventListener(
"click",
closeMenu
);


document
.getElementById(
"pdShellLanguage"
)
?.addEventListener(
"change",
handleLanguageChange
);

}


/* =========================================================
LANGUAGE CHANGE
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


/*
Prefer the page's existing language engine.
*/

if(
typeof window.renderLanguage===
"function"
){

try{

window.renderLanguage(
language
);

}catch(error){

console.warn(
"PETS & DOGUE language refresh:",
error
);

}

}


/*
Synchronise the original Special Offers
language selector if it exists.
*/

const originalLanguageSelect=
document.getElementById(
"languageSelect"
);


if(
originalLanguageSelect
){

originalLanguageSelect.value=
language;


originalLanguageSelect.dispatchEvent(
new Event(
"change",
{
bubbles:true
}
)
);

}


if(
language==="ar"
){

document.documentElement.dir=
"rtl";

}else{

document.documentElement.dir=
"ltr";

}


document.documentElement.lang=
language;


renderNavigation();

renderMenu();

}


/* =========================================================
POSITION ACTIVE RUBRIC ONLY ONCE

After this the browser owns the swipe.
No repeated centring.
========================================================= */

function positionActiveOnce(){

const nav=
document.getElementById(
"pdCategoryNav"
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

return;

}


requestAnimationFrame(
()=>{

requestAnimationFrame(
()=>{

try{

active.scrollIntoView({

behavior:"auto",

block:"nearest",

inline:"center"

});

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
SYNC SHELL AFTER EXTERNAL LANGUAGE CHANGE
========================================================= */

function syncShellLanguage(){

renderNavigation();

renderMenu();

}


/* =========================================================
START
========================================================= */

function start(){

installStyles();

createMasterHeader();

createMenu();

renderNavigation();

renderMenu();


setTimeout(
positionActiveOnce,
80
);


/*
Synchronise if the original selector changes.
*/

const originalLanguageSelect=
document.getElementById(
"languageSelect"
);


originalLanguageSelect
?.addEventListener(
"change",
()=>{

setTimeout(
syncShellLanguage,
0
);

}
);


/*
Existing PETS & DOGUE i18n event.
*/

window.addEventListener(
"petsdogue:languagechange",
()=>{

setTimeout(
syncShellLanguage,
0
);

}
);


/*
Browser language event.
*/

window.addEventListener(
"languagechange",
()=>{

setTimeout(
syncShellLanguage,
0
);

}
);


/*
Another browser tab changed language.
*/

window.addEventListener(
"storage",
event=>{

if(
event.key===
LANGUAGE_KEY
){

syncShellLanguage();

}

}
);


/*
Escape closes menu.
*/

document.addEventListener(
"keydown",
event=>{

if(
event.key==="Escape"
){

closeMenu();

}

}
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
