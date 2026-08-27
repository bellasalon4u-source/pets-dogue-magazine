"use strict";

/* =========================================================
PETS & DOGUE
GLOBAL HEADER + RUBRIC NAV + COMPACT EDITORIAL SIDE MENU

CURRENT CHANGE ONLY:
1. PROFILE → SIGN IN / ВОЙТИ / LOCAL TRANSLATION
2. EVERY SIDE-MENU CARD ALWAYS HAS A SHORT DESCRIPTION

DOES NOT CHANGE:
- approved header scale
- fixed rubric order
- horizontal swipe
- menu width / scale
- menu photos
- active rubric
- page content
- maps
- search
- filters
- articles
- audio
- marketplace
- community
- offers
- Club payments
- Stripe
- forms
- APIs
- page-specific translations

LANGUAGES:
en, uk, ru, fr, de, es, it, pt, nl, pl, cs, sk,
hu, ro, bg, el, sv, da, no, fi, tr, ar, hi

LANGUAGE STORAGE:
pets_dogue_language
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
ONE FIXED RUBRIC ORDER
NEVER REORDER
========================================================= */

const NAV_ITEMS=[

{
key:"magazine",
url:"issue-01.html",
image:"file_00000000a9d471fda9b4629589be22a9.png"
},

{
key:"coverStars",
url:"members-gallery.html",
image:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80"
},

{
key:"offers",
url:"special-offers.html",
image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80"
},

{
key:"places",
url:"pet-friendly-places.html",
image:"https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80"
},

{
key:"articles",
url:"articles.html",
image:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=500&q=80"
},

{
key:"photos",
url:"photos.html",
image:"https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=500&q=80"
},

{
key:"travel",
url:"pet-travel.html",
image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80"
},

{
key:"fashion",
url:"pet-fashion.html",
image:"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80"
},

{
key:"wellness",
url:"wellness.html",
image:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=500&q=80"
},

{
key:"community",
url:"local-community.html",
image:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=80"
},

{
key:"contests",
url:"contests.html",
image:"https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=500&q=80"
},

{
key:"rescue",
url:"pets-in-need.html",
image:"https://images.unsplash.com/photo-1601758064224-c3c14e3a8cb8?auto=format&fit=crop&w=500&q=80"
},

{
key:"marketplace",
url:"pet-marketplace.html",
image:"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=500&q=80"
},

{
key:"partners",
url:"partners.html",
image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80"
}

];


/* =========================================================
PAGE → ACTIVE RUBRIC
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
23 LANGUAGES
========================================================= */

const TEXT={

en:{
menu:"Contents",
signIn:"Sign In",
club:"Join Club",
language:"Language",
contact:"Contact us",
fallbackDescription:"Explore this PETS & DOGUE section.",

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
signIn:"Увійти",
club:"Вступити до клубу",
language:"Мова",
contact:"Зв’язатися з нами",
fallbackDescription:"Відкрийте цей розділ PETS & DOGUE.",

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
signIn:"Войти",
club:"Вступить в клуб",
language:"Язык",
contact:"Связаться с нами",
fallbackDescription:"Откройте этот раздел PETS & DOGUE.",

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
signIn:"Connexion",
club:"Rejoindre le Club",
language:"Langue",
contact:"Nous contacter",
fallbackDescription:"Découvrez cette rubrique PETS & DOGUE.",

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
signIn:"Anmelden",
club:"Club beitreten",
language:"Sprache",
contact:"Kontakt",
fallbackDescription:"Entdecken Sie diesen PETS & DOGUE Bereich.",

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
signIn:"Iniciar sesión",
club:"Únete al Club",
language:"Idioma",
contact:"Contáctanos",
fallbackDescription:"Explora esta sección de PETS & DOGUE.",

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
signIn:"Accedi",
club:"Unisciti al Club",
language:"Lingua",
contact:"Contattaci",
fallbackDescription:"Esplora questa sezione PETS & DOGUE.",

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
signIn:"Entrar",
club:"Entrar no Club",
language:"Idioma",
contact:"Contacte-nos",
fallbackDescription:"Explore esta secção PETS & DOGUE.",

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
signIn:"Inloggen",
club:"Word lid",
language:"Taal",
contact:"Contact",
fallbackDescription:"Ontdek deze PETS & DOGUE rubriek.",

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
signIn:"Zaloguj się",
club:"Dołącz do klubu",
language:"Język",
contact:"Kontakt",
fallbackDescription:"Odkryj tę sekcję PETS & DOGUE.",

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
signIn:"Přihlásit se",
club:"Vstoupit do klubu",
language:"Jazyk",
contact:"Kontaktujte nás",
fallbackDescription:"Objevte tuto sekci PETS & DOGUE.",

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
signIn:"Prihlásiť sa",
club:"Vstúpiť do klubu",
language:"Jazyk",
contact:"Kontaktujte nás",
fallbackDescription:"Objavte túto sekciu PETS & DOGUE.",

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
signIn:"Belépés",
club:"Csatlakozás",
language:"Nyelv",
contact:"Kapcsolat",
fallbackDescription:"Fedezze fel ezt a PETS & DOGUE rovatot.",

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
signIn:"Autentificare",
club:"Intră în Club",
language:"Limbă",
contact:"Contactați-ne",
fallbackDescription:"Descoperă această secțiune PETS & DOGUE.",

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
signIn:"Вход",
club:"Влезте в клуба",
language:"Език",
contact:"Свържете се с нас",
fallbackDescription:"Разгледайте този раздел на PETS & DOGUE.",

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
signIn:"Σύνδεση",
club:"Εγγραφή στο Club",
language:"Γλώσσα",
contact:"Επικοινωνία",
fallbackDescription:"Ανακαλύψτε αυτή την ενότητα PETS & DOGUE.",

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
signIn:"Logga in",
club:"Gå med i Club",
language:"Språk",
contact:"Kontakta oss",
fallbackDescription:"Utforska denna PETS & DOGUE-sektion.",

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
signIn:"Log ind",
club:"Tilmeld Club",
language:"Sprog",
contact:"Kontakt os",
fallbackDescription:"Udforsk denne PETS & DOGUE-sektion.",

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
signIn:"Logg inn",
club:"Bli med i Club",
language:"Språk",
contact:"Kontakt oss",
fallbackDescription:"Utforsk denne PETS & DOGUE-seksjonen.",

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
signIn:"Kirjaudu",
club:"Liity Clubiin",
language:"Kieli",
contact:"Ota yhteyttä",
fallbackDescription:"Tutustu tähän PETS & DOGUE -osioon.",

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
signIn:"Giriş yap",
club:"Club'a katıl",
language:"Dil",
contact:"Bize ulaşın",
fallbackDescription:"Bu PETS & DOGUE bölümünü keşfedin.",

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
signIn:"تسجيل الدخول",
club:"الانضمام إلى النادي",
language:"اللغة",
contact:"اتصل بنا",
fallbackDescription:"اكتشف هذا القسم من PETS & DOGUE.",

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
signIn:"साइन इन",
club:"क्लब में शामिल हों",
language:"भाषा",
contact:"संपर्क करें",
fallbackDescription:"PETS & DOGUE के इस सेक्शन को देखें।",

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
SPECIFIC CARD DESCRIPTIONS
========================================================= */

const EXTRA_MENU={

en:{
offers:"Club offers and member benefits.",
wellness:"Health, grooming and everyday pet care.",
partners:"Selected brands, services and lifestyle partners."
},

uk:{
offers:"Пропозиції Club та переваги для учасників.",
wellness:"Здоров’я, грумінг і щоденний догляд.",
partners:"Відібрані бренди, послуги та lifestyle-партнери."
},

ru:{
offers:"Предложения Club и преимущества для участников.",
wellness:"Здоровье, груминг и ежедневный уход.",
partners:"Отобранные бренды, услуги и lifestyle-партнёры."
},

fr:{
offers:"Offres du Club et avantages membres.",
wellness:"Santé, toilettage et soins quotidiens.",
partners:"Marques, services et partenaires sélectionnés."
},

de:{
offers:"Club-Angebote und Vorteile für Mitglieder.",
wellness:"Gesundheit, Pflege und tägliche Betreuung.",
partners:"Ausgewählte Marken, Services und Lifestyle-Partner."
},

es:{
offers:"Ofertas del Club y ventajas para miembros.",
wellness:"Salud, cuidado y bienestar diario.",
partners:"Marcas, servicios y socios seleccionados."
},

it:{
offers:"Offerte Club e vantaggi per i membri.",
wellness:"Salute, toelettatura e cura quotidiana.",
partners:"Brand, servizi e partner selezionati."
},

pt:{
offers:"Ofertas do Club e benefícios para membros.",
wellness:"Saúde, cuidados e bem-estar diário.",
partners:"Marcas, serviços e parceiros selecionados."
},

nl:{
offers:"Clubaanbiedingen en ledenvoordelen.",
wellness:"Gezondheid, verzorging en dagelijkse zorg.",
partners:"Geselecteerde merken, diensten en partners."
},

pl:{
offers:"Oferty Club i korzyści dla członków.",
wellness:"Zdrowie, pielęgnacja i codzienna opieka.",
partners:"Wybrane marki, usługi i partnerzy."
},

cs:{
offers:"Nabídky Club a výhody pro členy.",
wellness:"Zdraví, péče a každodenní starostlivost.",
partners:"Vybrané značky, služby a partneři."
},

sk:{
offers:"Ponuky Club a výhody pre členov.",
wellness:"Zdravie, starostlivosť a každodenná starostlivosť.",
partners:"Vybrané značky, služby a partneri."
},

hu:{
offers:"Club ajánlatok és tagsági előnyök.",
wellness:"Egészség, ápolás és mindennapi gondozás.",
partners:"Válogatott márkák, szolgáltatások és partnerek."
},

ro:{
offers:"Oferte Club și beneficii pentru membri.",
wellness:"Sănătate, îngrijire și wellness zilnic.",
partners:"Branduri, servicii și parteneri selectați."
},

bg:{
offers:"Club оферти и предимства за членове.",
wellness:"Здраве, грижа и ежедневен комфорт.",
partners:"Подбрани марки, услуги и партньори."
},

el:{
offers:"Προσφορές Club και προνόμια μελών.",
wellness:"Υγεία, περιποίηση και καθημερινή φροντίδα.",
partners:"Επιλεγμένες μάρκες, υπηρεσίες και συνεργάτες."
},

sv:{
offers:"Club-erbjudanden och medlemsförmåner.",
wellness:"Hälsa, pälsvård och daglig omsorg.",
partners:"Utvalda varumärken, tjänster och partners."
},

da:{
offers:"Club-tilbud og medlemsfordele.",
wellness:"Sundhed, pleje og daglig omsorg.",
partners:"Udvalgte brands, tjenester og partnere."
},

no:{
offers:"Club-tilbud og medlemsfordeler.",
wellness:"Helse, pleie og daglig omsorg.",
partners:"Utvalgte merker, tjenester og partnere."
},

fi:{
offers:"Club-tarjoukset ja jäsenedut.",
wellness:"Terveys, hoito ja päivittäinen hyvinvointi.",
partners:"Valitut brändit, palvelut ja kumppanit."
},

tr:{
offers:"Club teklifleri ve üye avantajları.",
wellness:"Sağlık, bakım ve günlük evcil hayvan bakımı.",
partners:"Seçilmiş markalar, hizmetler ve ortaklar."
},

ar:{
offers:"عروض النادي ومزايا الأعضاء.",
wellness:"الصحة والعناية والرعاية اليومية.",
partners:"علامات وخدمات وشركاء مختارون."
},

hi:{
offers:"Club ऑफ़र और सदस्य लाभ।",
wellness:"स्वास्थ्य, ग्रूमिंग और रोज़मर्रा की देखभाल।",
partners:"चुने हुए ब्रांड, सेवाएँ और पार्टनर।"
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

let activeKey="";

let activePositionDone=false;

let userTouchedRubrics=false;


/* =========================================================
HELPERS
========================================================= */

function normalizeLanguage(value){

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

let language="";


if(
window.PetsDogueLanguage &&
typeof window.PetsDogueLanguage.getCurrentLanguage==="function"
){

try{

const result=
window.PetsDogueLanguage.getCurrentLanguage();


if(
typeof result==="string"
){

language=result;

}else if(
result &&
typeof result==="object"
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


function escapeHTML(value){

return String(
value||
""
)
.replaceAll("&","&amp;")
.replaceAll("<","&lt;")
.replaceAll(">","&gt;")
.replaceAll('"',"&quot;")
.replaceAll("'","&#039;");

}


/* =========================================================
EXISTING PROJECT COMMON I18N
========================================================= */

function getCommonMenu(language){

try{

return(
window.PetsDogueTranslations?.common?.[language]?.menu||
null
);

}catch(error){

return null;

}

}


/* =========================================================
DESCRIPTION HELPER
========================================================= */

function firstUsefulDescription(){

for(
const value of arguments
){

if(
typeof value==="string" &&
value.trim()
){

return value.trim();

}

}


return"";

}


/* =========================================================
MENU CARD COPY

IMPORTANT:
EVERY CARD GETS A DESCRIPTION.

Existing project translations are preferred.
If a specific translated description does not exist,
a translated safe fallback is used.
========================================================= */

function getMenuCardCopy(
key,
language
){

const labels=
TEXT[language]||
TEXT.en;


const common=
getCommonMenu(
language
)||
{};


const extra=
EXTRA_MENU[language]||
EXTRA_MENU.en;


const fallback=
labels.fallbackDescription||
TEXT.en.fallbackDescription;


switch(key){

case"magazine":

return{
title:
common.latestIssue||
common.magazine||
labels.magazine,

description:
firstUsefulDescription(
common.latestIssueDescription,
common.magazineDescription,
fallback
)
};


case"coverStars":

return{
title:
common.coverStar||
common.coverStars||
labels.coverStars,

description:
firstUsefulDescription(
common.coverStarDescription,
common.coverStarsDescription,
fallback
)
};


case"offers":

return{
title:
common.discounts||
common.offers||
labels.offers,

description:
firstUsefulDescription(
common.discountsDescription,
common.offersDescription,
extra.offers,
fallback
)
};


case"places":

return{
title:
common.places||
common.petsWelcome||
labels.places,

description:
firstUsefulDescription(
common.placesDescription,
common.petsWelcomeDescription,
fallback
)
};


case"articles":

return{
title:
common.articles||
labels.articles,

description:
firstUsefulDescription(
common.articlesDescription,
fallback
)
};


case"photos":

return{
title:
common.photos||
labels.photos,

description:
firstUsefulDescription(
common.photosDescription,
fallback
)
};


case"travel":

return{
title:
common.travel||
labels.travel,

description:
firstUsefulDescription(
common.travelDescription,
fallback
)
};


case"fashion":

return{
title:
common.fashion||
labels.fashion,

description:
firstUsefulDescription(
common.fashionDescription,
fallback
)
};


case"wellness":

return{
title:
common.wellness||
common.health||
labels.wellness,

description:
firstUsefulDescription(
common.wellnessDescription,
common.healthDescription,
extra.wellness,
fallback
)
};


case"community":

return{
title:
common.community||
labels.community,

description:
firstUsefulDescription(
common.communityDescription,
fallback
)
};


case"contests":

return{
title:
common.contests||
labels.contests,

description:
firstUsefulDescription(
common.contestsDescription,
fallback
)
};


case"rescue":

return{
title:
common.rescue||
common.help||
labels.rescue,

description:
firstUsefulDescription(
common.rescueDescription,
common.helpDescription,
fallback
)
};


case"marketplace":

return{
title:
common.marketplace||
labels.marketplace,

description:
firstUsefulDescription(
common.marketplaceDescription,
fallback
)
};


case"partners":

return{
title:
common.partners||
labels.partners,

description:
firstUsefulDescription(
common.partnersDescription,
extra.partners,
fallback
)
};


default:

return{
title:
labels[key]||
key,

description:
fallback
};

}

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
HIDE OLD VISUAL SHELL ONLY
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

cursor:pointer;
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
MENU OVERLAY
========================================================= */

#pdGlobalOverlay{
position:fixed;

inset:0;

z-index:8900;

background:rgba(0,0,0,.67);

opacity:0;

visibility:hidden;

pointer-events:none;

transition:
opacity .22s ease,
visibility .22s ease;

backdrop-filter:blur(2px);

-webkit-backdrop-filter:blur(2px);
}

#pdGlobalOverlay.show{
opacity:1;

visibility:visible;

pointer-events:auto;
}


/* =========================================================
EDITORIAL SIDE MENU

APPROVED:
- same photo-card design
- compact
- narrow
- left side
========================================================= */

#pdGlobalMenu{
position:fixed;

top:0;

left:0;

bottom:0;

z-index:9000;

width:min(76vw,300px);

max-width:300px;

background:#fff;

color:#111;

overflow-y:auto;

overflow-x:hidden;

overscroll-behavior:contain;

-webkit-overflow-scrolling:touch;

box-shadow:
12px
0
30px
rgba(0,0,0,.27);

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

z-index:6;

height:68px;

min-height:68px;

padding:0 11px 0 15px;

display:flex;

align-items:center;

justify-content:space-between;

gap:8px;

background:#080808;

color:#fff;

border-bottom:1px solid #292929;
}

.pd-global-menu-head h2{
min-width:0;

margin:0;

font-family:
Georgia,
"Times New Roman",
serif;

font-size:26px;

font-weight:400;

line-height:1;

white-space:nowrap;

overflow:hidden;

text-overflow:ellipsis;
}

#pdGlobalClose{
flex:0 0 auto;

width:37px;

height:37px;

display:flex;

align-items:center;

justify-content:center;

padding:0;

border:1px solid #484848;

border-radius:50%;

background:#111;

color:#fff;

font-size:24px;

font-weight:300;

line-height:1;

cursor:pointer;
}


/* =========================================================
SIGN IN + CLUB
========================================================= */

.pd-global-account{
display:grid;

grid-template-columns:1fr 1fr;

gap:6px;

padding:10px;

background:#fff;

border-bottom:1px solid #dedede;
}

.pd-global-account a{
min-width:0;

min-height:40px;

padding:7px 5px;

display:flex;

align-items:center;

justify-content:center;

text-align:center;

border:1.5px solid #111;

border-radius:999px;

background:#fff;

color:#111;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:9.5px;

font-weight:900;

line-height:1.1;

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
padding:9px 10px 10px;

background:#fff;

border-bottom:1px solid #dedede;
}

.pd-global-language label{
display:block;

margin:0 0 5px 2px;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:7.5px;

font-weight:900;

line-height:1;

letter-spacing:1.55px;

text-transform:uppercase;

color:#777;
}

#pdGlobalLanguage{
width:100%;

height:40px;

padding:0 10px;

border:1.5px solid #111;

border-radius:999px;

outline:0;

background:#faf8f3;

color:#111;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:11px;

font-weight:800;
}


/* =========================================================
PHOTO RUBRIC CARDS
========================================================= */

#pdGlobalMenuList{
display:grid;

grid-template-columns:1fr;

gap:7px;

padding:10px;

background:#fff;
}

.pd-global-menu-card{
position:relative;

min-width:0;

min-height:72px;

display:grid;

grid-template-columns:
64px
minmax(0,1fr);

align-items:stretch;

overflow:hidden;

border:1.5px solid #151515;

border-radius:17px;

background:#faf8f3;

color:#111;

text-decoration:none;
}

.pd-global-menu-card-image{
position:relative;

width:64px;

min-height:72px;

overflow:hidden;

background:#ddd;
}

.pd-global-menu-card-image img{
position:absolute;

inset:0;

width:100%;

height:100%;

display:block;

object-fit:cover;

object-position:center;
}

.pd-global-menu-card-copy{
min-width:0;

padding:8px 8px 7px 9px;

display:flex;

flex-direction:column;

justify-content:center;
}

.pd-global-menu-card h3{
margin:0 0 3px;

font-family:
Georgia,
"Times New Roman",
serif;

font-size:15px;

font-weight:700;

line-height:1.03;

color:#111;

overflow-wrap:anywhere;
}

.pd-global-menu-card p{
margin:0;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:9.3px;

font-weight:400;

line-height:1.3;

color:#676767;

display:-webkit-box;

-webkit-line-clamp:2;

-webkit-box-orient:vertical;

overflow:hidden;
}


/* =========================================================
ACTIVE MENU CARD
========================================================= */

.pd-global-menu-card.active{
background:#0b0b0b;

border-color:#0b0b0b;
}

.pd-global-menu-card.active h3{
color:#efd38c;
}

.pd-global-menu-card.active p{
color:#ddd;
}


/* =========================================================
CONTACT
========================================================= */

.pd-global-menu-footer{
padding:2px 10px 14px;

background:#fff;
}

.pd-global-menu-footer a{
min-height:38px;

display:flex;

align-items:center;

justify-content:center;

padding:7px 10px;

border:1.5px solid #111;

border-radius:999px;

background:#111;

color:#efd38c;

font-family:
Arial,
Helvetica,
sans-serif;

font-size:9.5px;

font-weight:900;

line-height:1;

letter-spacing:.25px;

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
-12px
0
30px
rgba(0,0,0,.27);

transform:translateX(104%);
}

html[dir="rtl"] #pdGlobalMenu.open{
transform:translateX(0);
}

html[dir="rtl"] .pd-global-menu-head{
direction:rtl;
}

html[dir="rtl"] .pd-global-menu-card{
grid-template-columns:
64px
minmax(0,1fr);
}

html[dir="rtl"] .pd-global-menu-card-copy{
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


#pdGlobalMenu{
width:min(76vw,286px);

max-width:286px;
}

.pd-global-menu-head{
height:65px;

min-height:65px;

padding-left:13px;
}

.pd-global-menu-head h2{
font-size:24px;
}

#pdGlobalClose{
width:35px;

height:35px;

font-size:22px;
}

.pd-global-account{
padding:8px;

gap:5px;
}

.pd-global-account a{
min-height:38px;

font-size:9px;
}

.pd-global-language{
padding:8px;
}

#pdGlobalLanguage{
height:38px;

font-size:10.5px;
}

#pdGlobalMenuList{
padding:8px;

gap:6px;
}

.pd-global-menu-card{
min-height:68px;

grid-template-columns:
60px
minmax(0,1fr);

border-radius:16px;
}

.pd-global-menu-card-image{
width:60px;

min-height:68px;
}

.pd-global-menu-card-copy{
padding:
7px
7px
6px
8px;
}

.pd-global-menu-card h3{
font-size:14px;
}

.pd-global-menu-card p{
font-size:8.8px;
}

}


/* =========================================================
TABLET / DESKTOP
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


#pdGlobalMenu{
width:min(340px,32vw);

max-width:340px;
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
HIDE EXISTING TOP SHELL
========================================================= */

function hideExistingShell(){

const elements=[
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


const navSelectors=[

".primary-nav",

".category-nav",

".global-nav",

".rubric-nav",

".desktop-categories",

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
element.id==="pdGlobalRubrics"
){

return;

}


const rect=
element.getBoundingClientRect();


if(
rect.top<340
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


document.body.insertBefore(
header,
document.body.firstChild
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
CREATE SIDE MENU
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
item.key===activeKey;


return`

<a
href="${item.url}"
class="${isActive?"active":""}"
${isActive?'aria-current="page"':""}
>

${escapeHTML(
labels[item.key]
)}

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
SIGN IN COPY
========================================================= */

function getSignInText(
language
){

const common=
getCommonMenu(
language
);


return firstUsefulDescription(
common?.signIn,
common?.login,
TEXT[language]?.signIn,
TEXT.en.signIn
);

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


const signIn=
getSignInText(
language
);


const cards=
NAV_ITEMS
.map(
item=>{

const copy=
getMenuCardCopy(
item.key,
language
);


const active=
item.key===activeKey;


return`

<a
class="pd-global-menu-card ${active?"active":""}"
href="${item.url}"
${active?'aria-current="page"':""}
>

<span class="pd-global-menu-card-image">

<img
src="${item.image}"
alt=""
loading="lazy"
>

</span>


<span class="pd-global-menu-card-copy">

<h3>
${escapeHTML(
copy.title
)}
</h3>

<p>
${escapeHTML(
copy.description
)}
</p>

</span>

</a>

`;

}
)
.join("");


menu.innerHTML=`

<div class="pd-global-menu-head">

<h2>
${escapeHTML(
labels.menu
)}
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

${escapeHTML(
signIn
)}

</a>


<a
class="club"
href="club.html"
>

${escapeHTML(
labels.club
)}

</a>

</div>


<div class="pd-global-language">

<label for="pdGlobalLanguage">

${escapeHTML(
labels.language
)}

</label>


<select
id="pdGlobalLanguage"
aria-label="${escapeHTML(
labels.language
)}"
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

${cards}

</nav>


<div class="pd-global-menu-footer">

<a href="contact.html">

${escapeHTML(
labels.contact
)}

</a>

</div>

`;


document
.getElementById(
"pdGlobalClose"
)
?.addEventListener(
"click",
closeMenu
);


document
.getElementById(
"pdGlobalLanguage"
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


document.documentElement.lang=
language;


document.documentElement.dir=
language==="ar"
?"rtl"
:"ltr";


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
typeof controller[setter]==="function"
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
"PETS & DOGUE language selector sync failed.",
error
);

}

}


window.dispatchEvent(
new Event(
"petsdogue:languagechange"
)
);


renderRubrics();

renderSideMenu();

}


/* =========================================================
POSITION ACTIVE RUBRIC ONCE
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

activePositionDone=true;

return;

}


activePositionDone=true;


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
FREE NATIVE RUBRIC SWIPE
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
nav.dataset.interactionReady==="1"
){

return;

}


nav.dataset.interactionReady="1";


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

userTouchedRubrics=true;

},
{
passive:true
}
);

}
);

}


/* =========================================================
REFRESH LANGUAGE
========================================================= */

function refreshShellLanguage(){

renderRubrics();

renderSideMenu();

}


/* =========================================================
ESCAPE
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


window.addEventListener(
"petsdogue:languagechange",
()=>{

setTimeout(
refreshShellLanguage,
0
);

}
);


window.addEventListener(
"storage",
event=>{

if(
event.key===LANGUAGE_KEY
){

setTimeout(
refreshShellLanguage,
0
);

}

}
);


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
