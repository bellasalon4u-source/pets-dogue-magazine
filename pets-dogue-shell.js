"use strict";

(function(){

const LANGUAGE_KEY="pets_dogue_language";
const HOME_MASTHEAD_FILE="pets-dogue-header.png?v=20260912-2";

const LANGUAGE_ALIASES={
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};

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

const ROUTES={
petFriendly:"pet-friendly-places.html",
discounts:"special-offers.html",
help:"pets-in-need.html",
community:"local-community.html",
marketplace:"pet-marketplace.html",
edition:"issue-01.html",
coverStars:"members-gallery.html",
contests:"contests.html",
articles:"articles.html",
photos:"photos.html",
fashion:"pet-fashion.html",
health:"wellness.html",
partners:"partners.html"
};

const PAGE_KEYS={
"pet-friendly-places.html":"petFriendly",
"special-offers.html":"discounts",
"pets-in-need.html":"help",
"rescue.html":"help",
"help.html":"help",
"volunteer-network.html":"help",
"local-community.html":"community",
"community.html":"community",
"social.html":"community",
"events.html":"community",
"pet-marketplace.html":"marketplace",
"issue-01.html":"edition",
"issue-02.html":"edition",
"magazine.html":"edition",
"archive.html":"edition",
"members-gallery.html":"coverStars",
"cover-stars.html":"coverStars",
"become-cover-star.html":"coverStars",
"submit-pet.html":"coverStars",
"hall-of-fame.html":"coverStars",
"contests.html":"contests",
"articles.html":"articles",
"article.html":"articles",
"photos.html":"photos",
"pet-fashion.html":"fashion",
"wellness.html":"health",
"health.html":"health",
"partners.html":"partners"
};

const TOP_KEYS=[
"petFriendly",
"discounts",
"help",
"community",
"marketplace"
];

const BOTTOM_KEYS=[
"edition",
"coverStars",
"contests",
"articles",
"photos",
"fashion",
"health"
];

const COPY={

en:{
menu:"Open menu",
profile:"Profile",
partners:"Partners",
language:"Language",
signIn:"Sign In",
joinClub:"Join Club",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Discounts",
help:"Help",
community:"Community",
marketplace:"Marketplace",
edition:"Edition",
coverStars:"Cover Stars",
contests:"Contests",
articles:"Articles",
photos:"Photos",
fashion:"Fashion",
health:"Health"
}
},

uk:{
menu:"Відкрити меню",
profile:"Профіль",
partners:"Партнери",
language:"Мова",
signIn:"Увійти",
joinClub:"Вступити до клубу",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Знижки",
help:"Допомога",
community:"Спільнота",
marketplace:"Маркетплейс",
edition:"Видання",
coverStars:"Зірки обкладинки",
contests:"Конкурси",
articles:"Статті",
photos:"Фото",
fashion:"Мода",
health:"Здоров’я"
}
},

ru:{
menu:"Открыть меню",
profile:"Профиль",
partners:"Партнёры",
language:"Язык",
signIn:"Войти",
joinClub:"Подписаться",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Скидки",
help:"Помощь",
community:"Сообщество",
marketplace:"Маркетплейс",
edition:"Издание",
coverStars:"Звёзды обложки",
contests:"Конкурсы",
articles:"Статьи",
photos:"Фото",
fashion:"Мода",
health:"Здоровье"
}
},

fr:{
menu:"Ouvrir le menu",
profile:"Profil",
partners:"Partenaires",
language:"Langue",
signIn:"Connexion",
joinClub:"Rejoindre le Club",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Réductions",
help:"Aide",
community:"Communauté",
marketplace:"Marketplace",
edition:"Édition",
coverStars:"Stars de couverture",
contests:"Concours",
articles:"Articles",
photos:"Photos",
fashion:"Mode",
health:"Santé"
}
},

de:{
menu:"Menü öffnen",
profile:"Profil",
partners:"Partner",
language:"Sprache",
signIn:"Anmelden",
joinClub:"Club beitreten",
labels:{
petFriendly:"Tierfreundlich",
discounts:"Rabatte",
help:"Hilfe",
community:"Community",
marketplace:"Marktplatz",
edition:"Ausgabe",
coverStars:"Cover Stars",
contests:"Wettbewerbe",
articles:"Artikel",
photos:"Fotos",
fashion:"Mode",
health:"Gesundheit"
}
},

es:{
menu:"Abrir menú",
profile:"Perfil",
partners:"Socios",
language:"Idioma",
signIn:"Iniciar sesión",
joinClub:"Únete al Club",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Descuentos",
help:"Ayuda",
community:"Comunidad",
marketplace:"Marketplace",
edition:"Edición",
coverStars:"Estrellas de portada",
contests:"Concursos",
articles:"Artículos",
photos:"Fotos",
fashion:"Moda",
health:"Salud"
}
},

it:{
menu:"Apri menu",
profile:"Profilo",
partners:"Partner",
language:"Lingua",
signIn:"Accedi",
joinClub:"Unisciti al Club",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Sconti",
help:"Aiuto",
community:"Community",
marketplace:"Marketplace",
edition:"Edizione",
coverStars:"Cover Stars",
contests:"Concorsi",
articles:"Articoli",
photos:"Foto",
fashion:"Moda",
health:"Salute"
}
},

pt:{
menu:"Abrir menu",
profile:"Perfil",
partners:"Parceiros",
language:"Idioma",
signIn:"Entrar",
joinClub:"Entrar no Clube",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Descontos",
help:"Ajuda",
community:"Comunidade",
marketplace:"Marketplace",
edition:"Edição",
coverStars:"Estrelas da capa",
contests:"Concursos",
articles:"Artigos",
photos:"Fotos",
fashion:"Moda",
health:"Saúde"
}
},

nl:{
menu:"Menu openen",
profile:"Profiel",
partners:"Partners",
language:"Taal",
signIn:"Inloggen",
joinClub:"Word lid",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Kortingen",
help:"Hulp",
community:"Community",
marketplace:"Marktplaats",
edition:"Editie",
coverStars:"Coversterren",
contests:"Wedstrijden",
articles:"Artikelen",
photos:"Foto’s",
fashion:"Mode",
health:"Gezondheid"
}
},

pl:{
menu:"Otwórz menu",
profile:"Profil",
partners:"Partnerzy",
language:"Język",
signIn:"Zaloguj się",
joinClub:"Dołącz do klubu",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Zniżki",
help:"Pomoc",
community:"Społeczność",
marketplace:"Marketplace",
edition:"Wydanie",
coverStars:"Gwiazdy okładki",
contests:"Konkursy",
articles:"Artykuły",
photos:"Zdjęcia",
fashion:"Moda",
health:"Zdrowie"
}
},

cs:{
menu:"Otevřít menu",
profile:"Profil",
partners:"Partneři",
language:"Jazyk",
signIn:"Přihlásit se",
joinClub:"Vstoupit do klubu",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Slevy",
help:"Pomoc",
community:"Komunita",
marketplace:"Marketplace",
edition:"Vydání",
coverStars:"Hvězdy obálky",
contests:"Soutěže",
articles:"Články",
photos:"Fotografie",
fashion:"Móda",
health:"Zdraví"
}
},

sk:{
menu:"Otvoriť menu",
profile:"Profil",
partners:"Partneri",
language:"Jazyk",
signIn:"Prihlásiť sa",
joinClub:"Vstúpiť do klubu",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Zľavy",
help:"Pomoc",
community:"Komunita",
marketplace:"Marketplace",
edition:"Vydanie",
coverStars:"Hviezdy obálky",
contests:"Súťaže",
articles:"Články",
photos:"Fotografie",
fashion:"Móda",
health:"Zdravie"
}
},

hu:{
menu:"Menü megnyitása",
profile:"Profil",
partners:"Partnerek",
language:"Nyelv",
signIn:"Belépés",
joinClub:"Csatlakozás",
labels:{
petFriendly:"Állatbarát",
discounts:"Kedvezmények",
help:"Segítség",
community:"Közösség",
marketplace:"Piactér",
edition:"Kiadás",
coverStars:"Címlapsztárok",
contests:"Versenyek",
articles:"Cikkek",
photos:"Fotók",
fashion:"Divat",
health:"Egészség"
}
},

ro:{
menu:"Deschide meniul",
profile:"Profil",
partners:"Parteneri",
language:"Limbă",
signIn:"Autentificare",
joinClub:"Intră în Club",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Reduceri",
help:"Ajutor",
community:"Comunitate",
marketplace:"Marketplace",
edition:"Ediție",
coverStars:"Vedete de copertă",
contests:"Concursuri",
articles:"Articole",
photos:"Fotografii",
fashion:"Modă",
health:"Sănătate"
}
},

bg:{
menu:"Отвори менюто",
profile:"Профил",
partners:"Партньори",
language:"Език",
signIn:"Вход",
joinClub:"Влезте в клуба",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Отстъпки",
help:"Помощ",
community:"Общност",
marketplace:"Маркетплейс",
edition:"Издание",
coverStars:"Звезди на корицата",
contests:"Конкурси",
articles:"Статии",
photos:"Снимки",
fashion:"Мода",
health:"Здраве"
}
},

el:{
menu:"Άνοιγμα μενού",
profile:"Προφίλ",
partners:"Συνεργάτες",
language:"Γλώσσα",
signIn:"Σύνδεση",
joinClub:"Εγγραφή στο Club",
labels:{
petFriendly:"Pet-Friendly",
discounts:"Εκπτώσεις",
help:"Βοήθεια",
community:"Κοινότητα",
marketplace:"Marketplace",
edition:"Έκδοση",
coverStars:"Αστέρια εξωφύλλου",
contests:"Διαγωνισμοί",
articles:"Άρθρα",
photos:"Φωτογραφίες",
fashion:"Μόδα",
health:"Υγεία"
}
},

sv:{
menu:"Öppna meny",
profile:"Profil",
partners:"Partners",
language:"Språk",
signIn:"Logga in",
joinClub:"Gå med i klubben",
labels:{
petFriendly:"Djurvänligt",
discounts:"Rabatter",
help:"Hjälp",
community:"Community",
marketplace:"Marknadsplats",
edition:"Utgåva",
coverStars:"Omslagsstjärnor",
contests:"Tävlingar",
articles:"Artiklar",
photos:"Foton",
fashion:"Mode",
health:"Hälsa"
}
},

da:{
menu:"Åbn menu",
profile:"Profil",
partners:"Partnere",
language:"Sprog",
signIn:"Log ind",
joinClub:"Bliv medlem",
labels:{
petFriendly:"Kæledyrsvenligt",
discounts:"Rabatter",
help:"Hjælp",
community:"Fællesskab",
marketplace:"Markedsplads",
edition:"Udgave",
coverStars:"Forsidestjerner",
contests:"Konkurrencer",
articles:"Artikler",
photos:"Fotos",
fashion:"Mode",
health:"Sundhed"
}
},

no:{
menu:"Åpne meny",
profile:"Profil",
partners:"Partnere",
language:"Språk",
signIn:"Logg inn",
joinClub:"Bli med i klubben",
labels:{
petFriendly:"Dyrevennlig",
discounts:"Rabatter",
help:"Hjelp",
community:"Fellesskap",
marketplace:"Markedsplass",
edition:"Utgave",
coverStars:"Forsidestjerner",
contests:"Konkurranser",
articles:"Artikler",
photos:"Bilder",
fashion:"Mote",
health:"Helse"
}
},

fi:{
menu:"Avaa valikko",
profile:"Profiili",
partners:"Kumppanit",
language:"Kieli",
signIn:"Kirjaudu",
joinClub:"Liity klubiin",
labels:{
petFriendly:"Lemmikkiystävällinen",
discounts:"Alennukset",
help:"Apua",
community:"Yhteisö",
marketplace:"Markkinapaikka",
edition:"Numero",
coverStars:"Kansitähdet",
contests:"Kilpailut",
articles:"Artikkelit",
photos:"Kuvat",
fashion:"Muoti",
health:"Terveys"
}
},

tr:{
menu:"Menüyü aç",
profile:"Profil",
partners:"Ortaklar",
language:"Dil",
signIn:"Giriş yap",
joinClub:"Kulübe katıl",
labels:{
petFriendly:"Pet-Friendly",
discounts:"İndirimler",
help:"Yardım",
community:"Topluluk",
marketplace:"Pazar yeri",
edition:"Sürüm",
coverStars:"Kapak yıldızları",
contests:"Yarışmalar",
articles:"Makaleler",
photos:"Fotoğraflar",
fashion:"Moda",
health:"Sağlık"
}
},

ar:{
menu:"فتح القائمة",
profile:"الملف الشخصي",
partners:"الشركاء",
language:"اللغة",
signIn:"تسجيل الدخول",
joinClub:"انضم إلى النادي",
labels:{
petFriendly:"صديق للحيوانات",
discounts:"الخصومات",
help:"المساعدة",
community:"المجتمع",
marketplace:"السوق",
edition:"الإصدار",
coverStars:"نجوم الغلاف",
contests:"المسابقات",
articles:"المقالات",
photos:"الصور",
fashion:"الموضة",
health:"الصحة"
}
},

hi:{
menu:"मेनू खोलें",
profile:"प्रोफ़ाइल",
partners:"पार्टनर्स",
language:"भाषा",
signIn:"लॉग इन",
joinClub:"क्लब से जुड़ें",
labels:{
petFriendly:"Pet-Friendly",
discounts:"छूट",
help:"मदद",
community:"समुदाय",
marketplace:"मार्केटप्लेस",
edition:"एडिशन",
coverStars:"कवर स्टार्स",
contests:"प्रतियोगिताएँ",
articles:"लेख",
photos:"फ़ोटो",
fashion:"फैशन",
health:"स्वास्थ्य"
}
}

};

let language="en";
let activeKey="";
let observer=null;
let lastY=Math.max(0,window.scrollY||0);
let lastDirection=0;
let accumulated=0;
let ticking=false;

function normalizeLanguage(v){

const raw=String(v||"")
.trim()
.toLowerCase()
.replace("_","-");

if(!raw){
return"";
}

const base=raw.split("-")[0];

return LANGUAGE_ALIASES[base]||base;

}

function supportedLanguage(v){

return Object.prototype.hasOwnProperty.call(
COPY,
normalizeLanguage(v)
);

}

function currentFile(){

const p=window.location.pathname||"";

return(
p.split("/")
.filter(Boolean)
.pop()
||
"index.html"
).toLowerCase();

}

function isHome(){

return currentFile()==="index.html";

}

function detectActiveKey(){

const f=currentFile();

if(PAGE_KEYS[f]){
return PAGE_KEYS[f];
}

const p=(window.location.pathname||"").toLowerCase();

for(const [name,key] of Object.entries(PAGE_KEYS)){

if(
p.includes(
name.replace(".html","")
)
){

return key;

}

}

return"";

}

function pageLanguageSelect(){

for(const selector of[
"#pdGlobalLanguage",
"#pdLanguageSelect",
"#headerLanguageSelect",
"#languageSelect",
"#language",
"#langSelect",
"select[data-language-select]",
"select[name='language']",
"select[name='lang']"
]){

const element=document.querySelector(
selector
);

if(element){
return element;
}

}

return null;

}

function detectLanguage(){

try{

const saved=normalizeLanguage(
localStorage.getItem(LANGUAGE_KEY)||""
);

if(
saved
&&
supportedLanguage(saved)
){

return saved;

}

}catch(error){}

const select=pageLanguageSelect();

const fromSelect=normalizeLanguage(
select?.value||""
);

if(
fromSelect
&&
supportedLanguage(fromSelect)
){

return fromSelect;

}

const htmlLanguage=normalizeLanguage(
document.documentElement.lang||""
);

return supportedLanguage(htmlLanguage)
?htmlLanguage
:"en";

}

function t(){

return COPY[language]||COPY.en;

}

function esc(v){

return String(v??"")
.replaceAll("&","&amp;")
.replaceAll("<","&lt;")
.replaceAll(">","&gt;")
.replaceAll('"',"&quot;")
.replaceAll("'","&#039;");

}

function installStyles(){

document
.getElementById("pdHeaderOnlyStyles")
?.remove();

const style=document.createElement("style");

style.id="pdHeaderOnlyStyles";

style.textContent=`

:root{
--pdh-black:#050505;
--pdh-white:#fff;
--pdh-gold:#c69b45;
--pdh-gold-light:#ecd28a;
--pdh-green:#65e51f;
--pdh-line:rgba(198,155,69,.68);
--pdh-serif:Georgia,"Times New Roman",serif;
--pdh-sans:Arial,Helvetica,sans-serif;
}

.pd-header-old-hidden{
display:none!important;
}

.account-bar.pd-header-old-hidden{
display:none!important;
}

#pdHomeHeaderImage{
position:relative;
width:100%;
height:clamp(86px,18vw,118px);
overflow:hidden;
background:#111;
}

#pdHomeHeaderImage img{
display:block;
width:100%;
height:100%;
object-fit:cover;
object-position:center center;
}

#pdLuxuryHeader{
position:sticky;
top:0;
z-index:14000;
width:100%;
background:var(--pdh-black);
color:#fff;
font-family:var(--pdh-sans);
transform:translateY(0);
transition:transform .23s cubic-bezier(.2,.75,.2,1);
will-change:transform;
box-shadow:0 7px 20px rgba(0,0,0,.18);
}

#pdLuxuryHeader.pd-header-hidden{
transform:translateY(-102%);
}

#pdLuxuryMainBar{
min-height:46px;
display:grid;
grid-template-columns:38px minmax(90px,1fr) auto auto;
align-items:center;
gap:5px;
padding:4px 8px;
background:#050505;
border-bottom:1px solid var(--pdh-line);
direction:ltr;
}

#pdLuxuryMenuButton{
width:36px;
height:36px;
border:0;
padding:3px 0;
background:transparent;
display:flex;
flex-direction:column;
justify-content:center;
gap:5px;
cursor:pointer;
}

#pdLuxuryMenuButton span{
display:block;
width:28px;
height:2px;
border-radius:999px;
background:#fff;
}

#pdLuxuryBrand{
min-width:0;
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
color:var(--pdh-gold);
text-decoration:none;
font-family:var(--pdh-serif);
font-size:18px;
line-height:1;
}

#pdLuxuryPartners{
height:30px;
display:inline-flex;
align-items:center;
justify-content:center;
padding:0 10px;
border:1px solid #fff;
border-radius:999px;
background:#fff;
color:#111;
text-decoration:none;
font-size:9px;
font-weight:900;
white-space:nowrap;
}

#pdLuxuryProfileWrap{
position:relative;
}

#pdLuxuryProfileButton{
min-width:34px;
height:34px;
border:0;
padding:0 2px;
background:transparent;
color:#fff;
display:flex;
align-items:center;
justify-content:center;
gap:4px;
cursor:pointer;
}

#pdLuxuryProfileButton svg{
width:20px;
height:20px;
fill:none;
stroke:currentColor;
stroke-width:1.85;
stroke-linecap:round;
stroke-linejoin:round;
}

.pd-luxury-profile-label{
font-size:9px;
font-weight:800;
white-space:nowrap;
}

#pdLuxuryProfileMenu{
position:absolute;
top:39px;
right:0;
z-index:14200;
width:200px;
padding:9px;
border:1px solid #333;
border-radius:14px;
background:#0b0b0b;
box-shadow:0 18px 42px rgba(0,0,0,.35);
opacity:0;
visibility:hidden;
transform:translateY(-5px);
transition:.18s ease;
}

#pdLuxuryProfileMenu.open{
opacity:1;
visibility:visible;
transform:translateY(0);
}

.pd-luxury-profile-title{
padding:4px 4px 8px;
color:#fff;
font-size:10px;
font-weight:900;
text-transform:uppercase;
}

.pd-luxury-profile-link{
min-height:39px;
display:flex;
align-items:center;
justify-content:center;
border:1px solid #fff;
border-radius:999px;
background:#fff;
color:#111;
font-size:11px;
font-weight:900;
text-decoration:none;
}

.pd-luxury-profile-link+
.pd-luxury-profile-link{
margin-top:7px;
}

.pd-luxury-profile-link.club{
border-color:var(--pdh-green);
background:var(--pdh-green);
}

#pdLuxuryRows{
background:#080808;
}

.pd-luxury-row-shell{
position:relative;
overflow:hidden;
border-bottom:1px solid rgba(198,155,69,.78);
}

.pd-luxury-row{
display:flex;
overflow-x:auto;
overflow-y:hidden;
white-space:nowrap;
scrollbar-width:none;
-ms-overflow-style:none;
-webkit-overflow-scrolling:touch;
scroll-behavior:smooth;
overscroll-behavior-x:contain;
}

.pd-luxury-row::-webkit-scrollbar{
display:none;
}

.pd-luxury-row-link{
position:relative;
flex:0 0 auto;
min-height:30px;
display:flex;
align-items:center;
justify-content:center;
padding:0 16px;
border-right:1px solid rgba(198,155,69,.62);
color:#f7f7f7;
text-decoration:none;
font-family:var(--pdh-serif);
font-size:11.5px;
}

.pd-luxury-row-link:last-child{
padding-right:26px;
}

.pd-luxury-row-link.active{
color:var(--pdh-gold-light);
}

.pd-luxury-row-link.active:after{
content:"";
position:absolute;
left:10px;
right:10px;
bottom:0;
height:2px;
background:#e0b85e;
box-shadow:0 0 5px rgba(224,184,94,.38);
}

.pd-luxury-row-shell:after{
content:"›";
position:absolute;
top:0;
right:0;
width:20px;
height:100%;
display:flex;
align-items:center;
justify-content:center;
color:#fff;
font:24px/1 var(--pdh-serif);
pointer-events:none;
background:
linear-gradient(
90deg,
rgba(8,8,8,0),
#080808 58%
);
}

html[dir="rtl"] .pd-luxury-row-shell:after{
content:"‹";
right:auto;
left:0;
background:
linear-gradient(
270deg,
rgba(8,8,8,0),
#080808 58%
);
}

.pd-header-menu-language-slot{
margin:10px 12px 14px;
}

.pd-header-menu-language-slot label{
display:block;
margin:0 3px 6px;
color:#777;
font:900 9px/1 var(--pdh-sans);
letter-spacing:1.3px;
text-transform:uppercase;
}

.pd-header-menu-language-slot select{
width:100%!important;
height:48px!important;
margin:0!important;
padding:0 14px!important;
border:2px solid #181818!important;
border-radius:999px!important;
background:#fff!important;
color:#111!important;
font:800 13px/1 var(--pdh-sans)!important;
}

#pdLuxuryMenuButton:focus-visible,
#pdLuxuryPartners:focus-visible,
#pdLuxuryProfileButton:focus-visible,
.pd-luxury-row-link:focus-visible,
#pdLuxuryProfileMenu a:focus-visible{
outline:3px solid var(--pdh-green);
outline-offset:2px;
}

@media(max-width:390px){

#pdLuxuryMainBar{
grid-template-columns:
36px minmax(80px,1fr) auto auto;
gap:4px;
padding-left:6px;
padding-right:6px;
}

#pdLuxuryBrand{
font-size:16.5px;
}

#pdLuxuryPartners{
height:29px;
padding:0 8px;
font-size:8.3px;
}

.pd-luxury-profile-label{
font-size:8.2px;
}

.pd-luxury-row-link{
min-height:29px;
padding:0 14px;
font-size:11px;
}

#pdHomeHeaderImage{
height:clamp(82px,19vw,108px);
}

}

@media(max-width:340px){

.pd-luxury-profile-label{
display:none;
}

#pdLuxuryMainBar{
grid-template-columns:
34px minmax(76px,1fr) auto 28px;
}

}

@media(min-width:900px){

#pdLuxuryMainBar,
#pdLuxuryRows,
#pdHomeHeaderImage{
max-width:1500px;
margin-left:auto;
margin-right:auto;
}

}

@media(prefers-reduced-motion:reduce){

#pdLuxuryHeader,
#pdLuxuryProfileMenu,
.pd-luxury-row{
transition:none;
scroll-behavior:auto;
}

}

`;

document.head.appendChild(style);

}

function hideLegacy(){

for(const selector of[
".account-bar",
".site-header",
".pd-topbar",
"#pdMasterHeader",
".pd-master-header",
".desktop-categories",
".primary-nav",
".category-nav",
".global-nav",
".rubric-nav",
"#categoryNav",
".pd-primary-nav",
".pd-secondary-nav",
"#pdGlobalHeader"
]){

document
.querySelectorAll(selector)
.forEach(element=>{

if(
element.id!=="pdLuxuryHeader"
){

element.classList.add(
"pd-header-old-hidden"
);

}

});

}

}

function watchLegacy(){

if(observer){
return;
}

observer=new MutationObserver(
()=>{

hideLegacy();
ensureLanguageInSideMenu();

}
);

observer.observe(
document.body,
{
childList:true,
subtree:true
}
);

}

function getFallbackImage(){

return document
.querySelector(".latest-cover img")
?.getAttribute("src")
||
document
.querySelector(".hero img,main img")
?.getAttribute("src")
||
"";

}

function createHomeImage(){

if(
!isHome()
||
document.getElementById(
"pdHomeHeaderImage"
)
){
return;
}

const holder=document.createElement("div");

holder.id="pdHomeHeaderImage";

const img=document.createElement("img");

img.alt="PETS & DOGUE";
img.decoding="async";
img.fetchPriority="high";

const fallback=getFallbackImage();

img.src=
window.PETS_DOGUE_HOME_MASTHEAD_SRC
||
HOME_MASTHEAD_FILE;

img.addEventListener(
"error",
()=>{

if(
fallback
&&
img.dataset.fallbackDone!=="1"
){

img.dataset.fallbackDone="1";
img.src=fallback;

}else{

holder.style.display="none";

}

}
);

holder.appendChild(img);

document.body.insertBefore(
holder,
document.body.firstChild
);

}

function renderRows(){

const top=document.getElementById(
"pdLuxuryTopRow"
);

const bottom=document.getElementById(
"pdLuxuryBottomRow"
);

if(
!top
||
!bottom
){
return;
}

const labels=t().labels;

const build=keys=>
keys.map(
key=>`
<a
class="pd-luxury-row-link${key===activeKey?" active":""}"
href="${esc(ROUTES[key])}"
data-pd-header-link="${esc(key)}"
${key===activeKey?'aria-current="page"':""}
>
${esc(labels[key]||COPY.en.labels[key]||key)}
</a>
`
).join("");

top.innerHTML=build(TOP_KEYS);
bottom.innerHTML=build(BOTTOM_KEYS);

requestAnimationFrame(
()=>{

const active=document.querySelector(
".pd-luxury-row-link.active"
);

active?.scrollIntoView({
block:"nearest",
inline:"center",
behavior:"auto"
});

}
);

}

function renderProfile(){

const menu=document.getElementById(
"pdLuxuryProfileMenu"
);

if(!menu){
return;
}

const copy=t();

const wasOpen=menu.classList.contains(
"open"
);

menu.innerHTML=`

<div class="pd-luxury-profile-title">
${esc(copy.profile)}
</div>

<a
class="pd-luxury-profile-link"
href="account.html"
>
${esc(copy.signIn)}
</a>

<a
class="pd-luxury-profile-link club"
href="club.html"
>
${esc(copy.joinClub)}
</a>

`;

if(wasOpen){

menu.classList.add("open");

menu.setAttribute(
"aria-hidden",
"false"
);

}

}

function createHeader(){

if(
document.getElementById(
"pdLuxuryHeader"
)
){
return;
}

const copy=t();

const header=document.createElement(
"header"
);

header.id="pdLuxuryHeader";

header.innerHTML=`

<div id="pdLuxuryMainBar">

<button
id="pdLuxuryMenuButton"
type="button"
aria-label="${esc(copy.menu)}"
>
<span></span>
<span></span>
<span></span>
</button>

<a
id="pdLuxuryBrand"
class="notranslate"
translate="no"
href="index.html"
aria-label="PETS & DOGUE"
>
PETS &amp; DOGUE
</a>

<a
id="pdLuxuryPartners"
href="partners.html"
data-pd-header-link="partners"
>
${esc(copy.partners)}
</a>

<div id="pdLuxuryProfileWrap">

<button
id="pdLuxuryProfileButton"
type="button"
aria-label="${esc(copy.profile)}"
aria-controls="pdLuxuryProfileMenu"
aria-expanded="false"
>

<svg
viewBox="0 0 24 24"
aria-hidden="true"
>
<circle
cx="12"
cy="8"
r="4"
></circle>

<path
d="M4.5 21a7.5 7.5 0 0 1 15 0"
></path>
</svg>

<span class="pd-luxury-profile-label">
${esc(copy.profile)}
</span>

</button>

<div
id="pdLuxuryProfileMenu"
role="menu"
aria-hidden="true"
></div>

</div>

</div>

<div id="pdLuxuryRows">

<div class="pd-luxury-row-shell">

<nav
id="pdLuxuryTopRow"
class="pd-luxury-row"
aria-label="PETS & DOGUE primary sections"
></nav>

</div>

<div class="pd-luxury-row-shell">

<nav
id="pdLuxuryBottomRow"
class="pd-luxury-row"
aria-label="PETS & DOGUE editorial sections"
></nav>

</div>

</div>

`;

const masthead=document.getElementById(
"pdHomeHeaderImage"
);

if(masthead){

masthead.insertAdjacentElement(
"afterend",
header
);

}else{

document.body.insertBefore(
header,
document.body.firstChild
);

}

document
.getElementById(
"pdLuxuryMenuButton"
)
?.addEventListener(
"click",
openExistingMenu
);

document
.getElementById(
"pdLuxuryProfileButton"
)
?.addEventListener(
"click",
event=>{

event.stopPropagation();

toggleProfile();

}
);

renderProfile();
renderRows();

}

function sideMenu(){

return document.querySelector(
"#sideMenu,.side-menu,#pdGlobalMenu,.pd-drawer"
);

}

function ensureLanguageInSideMenu(){

const menu=sideMenu();

if(!menu){
return;
}

let select=pageLanguageSelect();

if(!select){

select=document.createElement(
"select"
);

select.id="pdHeaderLanguageSelect";

for(
const [code,label]
of LANGUAGE_OPTIONS
){

const option=document.createElement(
"option"
);

option.value=code;
option.textContent=label;

select.appendChild(option);

}

select.value=language;

select.addEventListener(
"change",
()=>{

applyLanguage(
select.value
);

}
);

}

if(
menu.contains(select)
){
return;
}

let slot=menu.querySelector(
".pd-header-menu-language-slot"
);

if(!slot){

slot=document.createElement("div");

slot.className=
"pd-header-menu-language-slot";

const label=document.createElement(
"label"
);

label.textContent=t().language;

slot.appendChild(label);

const account=menu.querySelector(
".menu-account,.pd-global-account"
);

if(account){

account.insertAdjacentElement(
"afterend",
slot
);

}else{

menu.prepend(slot);

}

}

slot.appendChild(select);

}

function applyLanguage(code){

code=normalizeLanguage(code);

if(
!supportedLanguage(code)
){
return;
}

language=code;

try{

localStorage.setItem(
LANGUAGE_KEY,
code
);

}catch(error){}

document.documentElement.lang=code;

document.documentElement.dir=
code==="ar"
?"rtl"
:"ltr";

const existing=pageLanguageSelect();

if(
existing
&&
existing.value!==code
){

const reverse={
uk:"ua",
cs:"cz",
el:"gr",
sv:"se",
da:"dk"
};

const candidate=[
code,
reverse[code]
].find(
value=>
Array
.from(existing.options||[])
.some(
option=>option.value===value
)
);

if(candidate){

existing.value=candidate;

existing.dispatchEvent(
new Event(
"change",
{
bubbles:true
}
)
);

}

}

if(
window.PetsDogueLanguage
){

for(const functionName of[
"setLanguage",
"changeLanguage",
"selectLanguage"
]){

if(
typeof window.PetsDogueLanguage[
functionName
]
===
"function"
){

try{

window.PetsDogueLanguage[
functionName
](code);

}catch(error){}

break;

}

}

}else if(
typeof window.renderLanguage
===
"function"
){

try{

window.renderLanguage(code);

}catch(error){}

}

window.dispatchEvent(
new CustomEvent(
"petsdogue:languagechange",
{
detail:{
language:code,
source:"header"
}
}
)
);

refreshText();

}

function openExistingMenu(){

showHeader();
closeProfile();

if(
typeof window.openMenu==="function"
&&
window.openMenu!==openExistingMenu
){

try{

window.openMenu();

setTimeout(
ensureLanguageInSideMenu,
0
);

return;

}catch(error){}

}

for(const functionName of[
"openSideMenu",
"showMenu"
]){

const candidate=window[
functionName
];

if(
typeof candidate
===
"function"
){

try{

candidate();

setTimeout(
ensureLanguageInSideMenu,
0
);

return;

}catch(error){}

}

}

const menu=sideMenu();

const overlay=document.querySelector(
"#menuOverlay,.menu-overlay,#pdGlobalOverlay,.pd-menu-overlay"
);

if(menu){

menu.classList.add(
"open",
"active",
"show"
);

menu.setAttribute(
"aria-hidden",
"false"
);

document.body.classList.add(
"menu-open",
"pd-global-menu-open"
);

ensureLanguageInSideMenu();

}

if(overlay){

overlay.classList.add(
"open",
"active",
"show"
);

}

}

function openProfile(){

showHeader();

const menu=document.getElementById(
"pdLuxuryProfileMenu"
);

const button=document.getElementById(
"pdLuxuryProfileButton"
);

if(
!menu
||
!button
){
return;
}

menu.classList.add(
"open"
);

menu.setAttribute(
"aria-hidden",
"false"
);

button.setAttribute(
"aria-expanded",
"true"
);

}

function closeProfile(){

const menu=document.getElementById(
"pdLuxuryProfileMenu"
);

const button=document.getElementById(
"pdLuxuryProfileButton"
);

if(
!menu
||
!button
){
return;
}

menu.classList.remove(
"open"
);

menu.setAttribute(
"aria-hidden",
"true"
);

button.setAttribute(
"aria-expanded",
"false"
);

}

function toggleProfile(){

document
.getElementById(
"pdLuxuryProfileMenu"
)
?.classList.contains(
"open"
)
?
closeProfile()
:
openProfile();

}

function showHeader(){

document
.getElementById(
"pdLuxuryHeader"
)
?.classList.remove(
"pd-header-hidden"
);

}

function hideHeader(){

document
.getElementById(
"pdLuxuryHeader"
)
?.classList.add(
"pd-header-hidden"
);

}

function menuOpen(){

const menu=sideMenu();

return Boolean(
menu
&&
(
menu.classList.contains(
"open"
)
||
menu.classList.contains(
"active"
)
||
menu.classList.contains(
"show"
)
||
menu.getAttribute(
"aria-hidden"
)
===
"false"
)
);

}

function handleScroll(){

if(ticking){
return;
}

ticking=true;

requestAnimationFrame(
()=>{

const y=Math.max(
0,
window.scrollY||0
);

const delta=y-lastY;

const direction=
delta>0
?1
:delta<0
?-1
:0;

const profileOpen=
document
.getElementById(
"pdLuxuryProfileMenu"
)
?.classList.contains(
"open"
);

if(
y<=8
||
menuOpen()
||
profileOpen
){

showHeader();
accumulated=0;

}else if(direction){

if(
direction!==lastDirection
){

accumulated=0;

}

accumulated+=Math.abs(
delta
);

if(
direction>0
&&
accumulated>=16
){

hideHeader();
accumulated=0;

}else if(
direction<0
&&
accumulated>=8
){

showHeader();
accumulated=0;

}

lastDirection=direction;

}

lastY=y;
ticking=false;

}
);

}

function refreshText(){

const copy=t();

document
.getElementById(
"pdLuxuryMenuButton"
)
?.setAttribute(
"aria-label",
copy.menu
);

const partners=document.getElementById(
"pdLuxuryPartners"
);

if(partners){

partners.textContent=
copy.partners;

}

const profileButton=
document.getElementById(
"pdLuxuryProfileButton"
);

profileButton?.setAttribute(
"aria-label",
copy.profile
);

const profileLabel=
profileButton?.querySelector(
".pd-luxury-profile-label"
);

if(profileLabel){

profileLabel.textContent=
copy.profile;

}

renderRows();
renderProfile();

const languageLabel=
document.querySelector(
".pd-header-menu-language-slot label"
);

if(languageLabel){

languageLabel.textContent=
copy.language;

}

}

function listenLanguage(){

window.addEventListener(
"petsdogue:languagechange",
event=>{

const code=normalizeLanguage(
event?.detail?.language||""
);

if(
code
&&
supportedLanguage(code)
&&
code!==language
){

language=code;

refreshText();

}

}
);

window.addEventListener(
"storage",
event=>{

if(
event.key===LANGUAGE_KEY
){

const code=normalizeLanguage(
event.newValue||""
);

if(
code
&&
supportedLanguage(code)
){

language=code;

refreshText();

}

}

}
);

document.addEventListener(
"change",
event=>{

const element=event.target;

if(
element instanceof HTMLSelectElement
&&
element.matches(
"#pdGlobalLanguage,#pdLanguageSelect,#headerLanguageSelect,#languageSelect,#language,#langSelect,#pdHeaderLanguageSelect,select[data-language-select],select[name='language'],select[name='lang']"
)
){

const code=normalizeLanguage(
element.value
);

if(
code
&&
supportedLanguage(code)
){

language=code;

try{

localStorage.setItem(
LANGUAGE_KEY,
code
);

}catch(error){}

refreshText();

}

}

}
);

}

function handleDocumentClick(event){

const menu=document.getElementById(
"pdLuxuryProfileMenu"
);

const button=document.getElementById(
"pdLuxuryProfileButton"
);

if(
menu?.classList.contains(
"open"
)
&&
!menu.contains(
event.target
)
&&
!button?.contains(
event.target
)
){

closeProfile();

}

}

function handleEscape(event){

if(
event.key==="Escape"
){

closeProfile();

}

}

function init(){

if(
document.documentElement.dataset
.petsDogueHeaderOnly
===
"4"
){
return;
}

document.documentElement.dataset
.petsDogueHeaderOnly="4";

language=detectLanguage();

activeKey=detectActiveKey();

installStyles();

hideLegacy();

createHomeImage();

createHeader();

ensureLanguageInSideMenu();

watchLegacy();

listenLanguage();

showHeader();

window.addEventListener(
"scroll",
handleScroll,
{
passive:true
}
);

window.addEventListener(
"resize",
showHeader,
{
passive:true
}
);

document.addEventListener(
"click",
handleDocumentClick
);

document.addEventListener(
"keydown",
handleEscape
);

window.PetsDogueHeader={
show:showHeader,
hide:hideHeader,
openMenu:openExistingMenu,
refreshLanguage:applyLanguage
};

}

if(
document.readyState
===
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
