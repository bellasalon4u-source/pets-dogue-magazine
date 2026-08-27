"use strict";

/* =========================================================
PETS & DOGUE
SPECIAL OFFERS — MASTER VISUAL SHELL

ONLY:
- unified PETS & DOGUE header
- hamburger menu
- home icon
- fixed global rubric order
- Discounts active
- free horizontal rubric swipe
- language selector moved into menu

DOES NOT CHANGE:
- offers
- location detection
- country selection
- Club verification
- vouchers
- Stripe access
- offer modals
- API calls
- existing 23-language offer translations
========================================================= */

(function(){

const LANGUAGE_KEY="pets_dogue_language";

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
NAVIGATION TRANSLATIONS
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
subscribe:"Підписка",
language:"Мова",
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
subscribe:"Подписка",
language:"Язык",
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
subscribe:"Abonnement",
language:"Langue",
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
subscribe:"Abo",
language:"Sprache",
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
subscribe:"Suscripción",
language:"Idioma",
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
subscribe:"Abbonamento",
language:"Lingua",
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
subscribe:"Assinatura",
language:"Idioma",
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
subscribe:"Abonnement",
language:"Taal",
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
subscribe:"Subskrypcja",
language:"Język",
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
subscribe:"Předplatné",
language:"Jazyk",
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
subscribe:"Predplatné",
language:"Jazyk",
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
subscribe:"Előfizetés",
language:"Nyelv",
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
subscribe:"Abonament",
language:"Limbă",
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
subscribe:"Абонамент",
language:"Език",
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
subscribe:"Συνδρομή",
language:"Γλώσσα",
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
subscribe:"Prenumeration",
language:"Språk",
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
subscribe:"Abonnement",
language:"Sprog",
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
subscribe:"Abonnement",
language:"Språk",
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
subscribe:"Tilaus",
language:"Kieli",
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
subscribe:"Abonelik",
language:"Dil",
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
subscribe:"الاشتراك",
language:"اللغة",
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
subscribe:"सदस्यता",
language:"भाषा",
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
STYLE
========================================================= */

function installStyles(){

if(
document.getElementById("pd-special-shell-style")
){
return;
}

const style=document.createElement("style");

style.id="pd-special-shell-style";

style.textContent=`

/* =========================================================
SPECIAL OFFERS MASTER HEADER
========================================================= */

.site-header.pd-master-header{
position:sticky !important;
top:0 !important;
z-index:5000 !important;

width:100% !important;
height:auto !important;
min-height:0 !important;

padding:0 !important;

display:block !important;

background:#070707 !important;
color:#fff !important;

border-bottom:1px solid #292929 !important;
}


/* =========================================================
TOP ROW
========================================================= */

.pd-master-header .pd-header-main{
width:100%;
max-width:1440px;

height:116px;
min-height:116px;

margin:0 auto;

padding:0 28px;

display:grid;

grid-template-columns:
72px
minmax(0,1fr)
72px;

align-items:center;
}


/* =========================================================
MENU BUTTON
========================================================= */

.pd-master-header .menu-button{
justify-self:start;

width:54px !important;
height:54px !important;

padding:8px 3px !important;

border:0 !important;

background:transparent !important;

display:grid !important;
align-content:center !important;

gap:7px !important;
}

.pd-master-header .menu-button span{
display:block !important;

width:100% !important;
height:3px !important;

background:#fff !important;

border-radius:999px !important;
}


/* =========================================================
BRAND
========================================================= */

.pd-master-header .brand{
justify-self:center !important;
align-self:center !important;

display:flex !important;
flex-direction:column !important;

align-items:center !important;
justify-content:center !important;

text-align:center !important;

font-family:
Georgia,
"Times New Roman",
serif !important;

line-height:.88 !important;

white-space:nowrap !important;
}

.pd-master-header .brand small{
display:block !important;

font-size:13px !important;

font-weight:400 !important;

line-height:1 !important;

letter-spacing:2.5px !important;

color:#c99a2e !important;
}

.pd-master-header .brand strong{
display:block !important;

margin-top:7px !important;

font-size:52px !important;

font-weight:400 !important;

line-height:.78 !important;

letter-spacing:4px !important;

color:#c99a2e !important;
}


/* =========================================================
HOME
========================================================= */

.pd-home-button{
justify-self:end;

width:54px;
height:54px;

display:flex;

align-items:center;
justify-content:center;

border:0;

background:transparent;

color:#fff;
}

.pd-home-button svg{
width:33px;
height:33px;

fill:none;

stroke:#fff;
stroke-width:2;

stroke-linecap:round;
stroke-linejoin:round;
}


/* =========================================================
NAVIGATION
========================================================= */

.pd-category-nav{
position:relative;

width:100%;

height:66px;
min-height:66px;

display:flex;

align-items:stretch;

gap:0;

padding:0;
margin:0;

overflow-x:auto;
overflow-y:hidden;

background:#070707;

border-top:1px solid #292929;
border-bottom:1px solid #292929;

scrollbar-width:none;

-webkit-overflow-scrolling:touch;

scroll-behavior:auto;

scroll-snap-type:none;

overscroll-behavior-x:contain;

touch-action:pan-x;
}

.pd-category-nav::-webkit-scrollbar{
display:none;
}

.pd-category-nav::before,
.pd-category-nav::after{
content:"";

display:block;

flex:0 0 34px;

height:1px;

pointer-events:none;
}

.pd-category-nav a{
position:relative;

flex:0 0 auto;

min-width:max-content;

height:66px;

padding:0 22px;

display:flex;

align-items:center;
justify-content:center;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:14px;

font-weight:900;

line-height:1;

letter-spacing:.55px;

text-transform:uppercase;

white-space:nowrap;

color:#fff;

text-decoration:none;

-webkit-user-drag:none;
}

.pd-category-nav a.active{
color:#f1d783;
}

.pd-category-nav a.active::after{
content:"";

position:absolute;

left:20px;
right:20px;
bottom:0;

height:4px;

background:
linear-gradient(
90deg,
#70470a 0%,
#c99428 25%,
#fff0a6 50%,
#c99428 75%,
#70470a 100%
);
}


/* =========================================================
SIDE MENU
========================================================= */

.pd-shell-overlay{
position:fixed;

inset:0;

z-index:9000;

background:rgba(0,0,0,.74);

opacity:0;

visibility:hidden;

transition:.22s ease;

backdrop-filter:blur(3px);
}

.pd-shell-overlay.show{
opacity:1;
visibility:visible;
}

.pd-shell-menu{
position:fixed;

top:0;
left:0;
bottom:0;

z-index:9100;

width:min(560px,90vw);

background:#f8f5ee;

color:#111;

transform:translateX(-103%);

transition:transform .28s ease;

overflow-y:auto;
}

.pd-shell-menu.open{
transform:translateX(0);
}

.pd-shell-menu-head{
position:sticky;

top:0;

z-index:5;

height:112px;

padding:18px 22px;

display:flex;

align-items:center;
justify-content:space-between;

background:#080808;

color:#fff;
}

.pd-shell-menu-head h2{
font-family:
Georgia,
"Times New Roman",
serif;

font-size:43px;

font-weight:400;
}

.pd-shell-close{
width:50px;
height:50px;

border:0;

border-radius:50%;

background:#fff;

color:#111;

font-size:32px;

line-height:1;
}

.pd-shell-tools{
display:grid;

grid-template-columns:1fr 1fr;

gap:9px;

padding:15px;
}

.pd-shell-tool{
height:50px;

border:2px solid #111;

display:flex;

align-items:center;
justify-content:center;

background:#fff;

font-size:11px;

font-weight:900;

text-transform:uppercase;
}

.pd-shell-tool.club{
background:#65e51f;

border-color:#65e51f;
}

.pd-shell-language{
margin:0 15px 15px;

padding:10px 13px;

border:2px solid #111;

background:#fff;
}

.pd-shell-language label{
display:block;

margin-bottom:7px;

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

font-size:14px;

font-weight:800;
}

.pd-shell-list{
display:grid;

gap:7px;

padding:0 15px 25px;
}

.pd-shell-list a{
min-height:58px;

padding:0 16px;

display:flex;

align-items:center;

border:2px solid #111;

background:#fff;

font-family:
Georgia,
"Times New Roman",
serif;

font-size:20px;
}

.pd-shell-list a.active{
background:#111;

color:#f1d783;
}


/* =========================================================
HIDE ORIGINAL RIGHT AREA
========================================================= */

.pd-master-header .header-right{
display:none !important;
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
Keep physical rubric order identical in Arabic.
Text itself remains RTL.
*/

html[dir="rtl"] .pd-category-nav{
direction:ltr;
}

html[dir="rtl"] .pd-category-nav a{
direction:rtl;
}


/* =========================================================
MOBILE
========================================================= */

@media(max-width:760px){

.pd-master-header .pd-header-main{
height:112px;
min-height:112px;

padding:0 18px;

grid-template-columns:
58px
minmax(0,1fr)
58px;
}

.pd-master-header .menu-button{
width:50px !important;
height:50px !important;

gap:6px !important;
}

.pd-master-header .menu-button span{
height:3px !important;
}

.pd-master-header .brand small{
font-size:11px !important;

letter-spacing:2.1px !important;
}

.pd-master-header .brand strong{
font-size:45px !important;

letter-spacing:3px !important;

margin-top:7px !important;
}

.pd-home-button{
width:50px;
height:50px;
}

.pd-home-button svg{
width:31px;
height:31px;
}

.pd-category-nav{
height:64px;
min-height:64px;
}

.pd-category-nav::before,
.pd-category-nav::after{
flex:0 0 max(
24px,
calc(50vw - 105px)
);
}

.pd-category-nav a{
height:64px;

padding:0 18px;

font-size:13px;

letter-spacing:.45px;
}

.pd-category-nav a.active::after{
left:17px;
right:17px;

height:4px;
}

.pd-shell-menu{
width:min(92vw,520px);
}

.pd-shell-menu-head{
height:100px;

padding:15px 18px;
}

.pd-shell-menu-head h2{
font-size:37px;
}

}


/* =========================================================
SMALL MOBILE
========================================================= */

@media(max-width:430px){

.pd-master-header .pd-header-main{
height:108px;
min-height:108px;

padding-left:14px;
padding-right:14px;
}

.pd-master-header .brand strong{
font-size:42px !important;
}

.pd-master-header .brand small{
font-size:10px !important;
}

.pd-category-nav a{
padding-left:16px;
padding-right:16px;

font-size:12.5px;
}

.pd-category-nav::before,
.pd-category-nav::after{
flex-basis:max(
20px,
calc(50vw - 98px)
);
}

}

`;

document.head.appendChild(style);

}


/* =========================================================
CURRENT LANGUAGE
========================================================= */

function getLanguage(){

const saved=
localStorage.getItem(LANGUAGE_KEY)||
document.documentElement.lang||
"en";

return NAV_TEXT[saved]
?saved
:"en";

}


/* =========================================================
BUILD SIDE MENU
========================================================= */

function createMenu(){

const overlay=
document.createElement("div");

overlay.className=
"pd-shell-overlay";

overlay.id=
"pdShellOverlay";


const menu=
document.createElement("aside");

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


return{
overlay,
menu
};

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


document.body
.classList
.add(
"menu-open"
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


document.body
.classList
.remove(
"menu-open"
);

}


/* =========================================================
RENDER MENU
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

<label>
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
event=>{

const value=
event.target.value;


localStorage.setItem(
LANGUAGE_KEY,
value
);


/*
Use existing Special Offers language function.

This preserves all current translations and page state.
*/

if(
typeof window.renderLanguage===
"function"
){

window.renderLanguage(
value
);

}else{

const oldSelect=
document.getElementById(
"languageSelect"
);

if(
oldSelect
){

oldSelect.value=
value;

oldSelect.dispatchEvent(
new Event(
"change",
{
bubbles:true
}
)
);

}

}


renderNavigation();

renderMenu();

}
);

}


/* =========================================================
RENDER NAVIGATION
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


const oldScroll=
nav.scrollLeft;


nav.innerHTML=
NAV_ITEMS
.map(
item=>`
<a
href="${item.url}"
class="${item.key==="offers"?"active":""}"
${item.key==="offers"?'aria-current="page"':""}
>
${tr[item.key]}
</a>
`
)
.join("");


requestAnimationFrame(
()=>{

nav.scrollLeft=
oldScroll;

}
);

}


/* =========================================================
CENTRE DISCOUNTS ONCE
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
".active"
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
)/2;


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
BUILD HEADER
========================================================= */

function buildHeader(){

const header=
document.querySelector(
"header.site-header"
);


if(
!header
){
return;
}


header.classList.add(
"pd-master-header"
);


/*
Keep the original menu button and brand.
This avoids breaking any existing identifiers used by
the Special Offers page.
*/

const menuButton=
document.getElementById(
"menuButton"
);


const brand=
header.querySelector(
".brand"
);


if(
!menuButton||
!brand
){
return;
}


/*
Remove original inline onclick assigned by
the current Special Offers script.
*/

menuButton.onclick=
null;


/*
Create master row.
*/

const main=
document.createElement(
"div"
);

main.className=
"pd-header-main";


main.appendChild(
menuButton
);


main.appendChild(
brand
);


/*
Home icon.
*/

const home=
document.createElement(
"a"
);

home.className=
"pd-home-button";

home.href=
"index.html";

home.setAttribute(
"aria-label",
"Home"
);

home.innerHTML=`

<svg
viewBox="0 0 24 24"
aria-hidden="true"
>

<path d="M3 10.5 12 3l9 7.5V21H3Z"></path>

<path d="M9 21v-7h6v7"></path>

</svg>

`;


main.appendChild(
home
);


/*
Keep the old header-right in DOM because
the existing page language logic refers to
languageSelect and clubLink.

It is simply hidden visually.
*/

const oldRight=
header.querySelector(
".header-right"
);


header.innerHTML="";


header.appendChild(
main
);


if(
oldRight
){

header.appendChild(
oldRight
);

}


/*
Add permanent rubric navigation.
*/

const nav=
document.createElement(
"nav"
);

nav.className=
"pd-category-nav";

nav.id=
"pdCategoryNav";


header.appendChild(
nav
);


menuButton.addEventListener(
"click",
event=>{

event.preventDefault();

event.stopPropagation();

openMenu();

}
);


renderNavigation();

}


/* =========================================================
LANGUAGE SYNCHRONISATION
========================================================= */

function syncLanguage(){

const language=
getLanguage();


const oldSelect=
document.getElementById(
"languageSelect"
);


if(
oldSelect &&
oldSelect.value!==language
){

oldSelect.value=
language;

}


renderNavigation();

renderMenu();

}


/* =========================================================
START
========================================================= */

function start(){

installStyles();

createMenu();

buildHeader();

renderMenu();

positionActiveOnce();


/*
Listen to the existing hidden language selector too.
*/

const oldSelect=
document.getElementById(
"languageSelect"
);


oldSelect
?.addEventListener(
"change",
()=>{

setTimeout(
syncLanguage,
0
);

}
);


/*
Language may also change from another browser tab.
*/

window.addEventListener(
"storage",
event=>{

if(
event.key===
LANGUAGE_KEY
){

syncLanguage();

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


/*
The current Special Offers script is placed before
this file and is already loaded when this runs.
*/

if(
document.readyState==="loading"
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
