"use strict";

/* =========================================================
PETS & DOGUE
MASTER GLOBAL SHELL

FINAL AGREED STRUCTURE

ONE SOURCE OF TRUTH FOR:
- HEADER
- HORIZONTAL RUBRICS
- SIDE MENU
- LANGUAGE OF THE SHELL
- ACTIVE RUBRIC
- FIXED RUBRIC ORDER

IMPORTANT:
THIS FILE DOES NOT CHANGE PAGE CONTENT OR PAGE FUNCTIONS.

DO NOT CHANGE:
- articles
- audio
- maps
- search
- filters
- marketplace logic
- community logic
- contests logic
- Club
- Stripe
- offers
- partners
- forms
- APIs
- page-specific content
- page-specific i18n

LANGUAGES:
en, uk, ru, fr, de, es, it, pt, nl, pl, cs, sk,
hu, ro, bg, el, sv, da, no, fi, tr, ar, hi

LANGUAGE STORAGE:
pets_dogue_language

FINAL RUBRIC ORDER:

1. MAGAZINE
2. COVER STARS
3. DISCOUNTS
4. PET-FRIENDLY
5. MARKETPLACE
6. TRAVEL
7. FASHION
8. HEALTH
9. ARTICLES
10. PHOTOS
11. COMMUNITY
12. CONTESTS
13. PETS IN NEED / ПОМОЩЬ ЖИВОТНЫМ
14. PARTNERS

IMPORTANT:
- NO WELLNESS
- ONLY HEALTH
- NO HELP / RESCUE DUPLICATION
- ONLY ONE "PETS IN NEED / ПОМОЩЬ ЖИВОТНЫМ" RUBRIC
========================================================= */

(function(){

const LANGUAGE_KEY="pets_dogue_language";


/* =========================================================
LANGUAGE ALIASES
========================================================= */

const LANGUAGE_ALIASES={
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};


/* =========================================================
FINAL NAVIGATION
ONE ORDER EVERYWHERE
========================================================= */

const NAV_ITEMS=[

{
key:"magazine",
url:"issue-01.html",
image:"https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=82"
},

{
key:"coverStars",
url:"members-gallery.html",
image:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=82"
},

{
key:"discounts",
url:"special-offers.html",
image:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=82"
},

{
key:"petFriendly",
url:"pet-friendly-places.html",
image:"https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=82"
},

{
key:"marketplace",
url:"pet-marketplace.html",
image:"https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=500&q=82"
},

{
key:"travel",
url:"pet-travel.html",
image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=82"
},

{
key:"fashion",
url:"pet-fashion.html",
image:"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=82"
},

{
key:"health",
url:"wellness.html",
image:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=500&q=82"
},

{
key:"articles",
url:"articles.html",
image:"https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=500&q=82"
},

{
key:"photos",
url:"photos.html",
image:"https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=82"
},

{
key:"community",
url:"local-community.html",
image:"https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=500&q=82"
},

{
key:"contests",
url:"contests.html",
image:"https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=500&q=82"
},

{
key:"animalHelp",
url:"pets-in-need.html",
image:"https://images.unsplash.com/photo-1601758064224-c3c14e3a8cb8?auto=format&fit=crop&w=500&q=82"
},

{
key:"partners",
url:"partners.html",
image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=82"
}

];


/* =========================================================
PAGE → ACTIVE RUBRIC
========================================================= */

const PAGE_KEYS={

"issue-01.html":"magazine",

"members-gallery.html":"coverStars",

"special-offers.html":"discounts",

"pet-friendly-places.html":"petFriendly",

"pet-marketplace.html":"marketplace",

"pet-travel.html":"travel",

"pet-fashion.html":"fashion",

"wellness.html":"health",

"articles.html":"articles",

"photos.html":"photos",

"local-community.html":"community",

"contests.html":"contests",

"pets-in-need.html":"animalHelp",

"partners.html":"partners"

};


/* =========================================================
ALL 23 LANGUAGES

NAVIGATION + MENU + ACCESSIBILITY + CARD DESCRIPTIONS
========================================================= */

const TEXT={


/* =========================================================
ENGLISH
========================================================= */

en:{

menu:"Contents",
signIn:"Sign In",
joinClub:"Join Club",
language:"Language",
contact:"Contact us",
openMenu:"Open menu",
closeMenu:"Close menu",
home:"Home",

nav:{
magazine:"Magazine",
coverStars:"Cover Stars",
discounts:"Discounts",
petFriendly:"Pet-Friendly",
marketplace:"Marketplace",
travel:"Travel",
fashion:"Fashion",
health:"Health",
articles:"Articles",
photos:"Photos",
community:"Community",
contests:"Contests",
animalHelp:"Pets in Need",
partners:"Partners"
},

desc:{
magazine:"Read the latest PETS & DOGUE issue.",
coverStars:"Meet our stars and enter your pet.",
discounts:"Exclusive offers and Club member benefits.",
petFriendly:"Discover places where pets are welcome.",
marketplace:"Buy, sell and discover pet services.",
travel:"Pet-friendly journeys, hotels and destinations.",
fashion:"Style, accessories and pet fashion.",
health:"Health, grooming and everyday pet care.",
articles:"Editorial stories, interviews and guides.",
photos:"Portraits, galleries and visual stories.",
community:"Local people, places, events and support.",
contests:"Take part in PETS & DOGUE competitions.",
animalHelp:"Rescue, adoption and help for animals in need.",
partners:"Selected brands, services and lifestyle partners."
}

},


/* =========================================================
UKRAINIAN
========================================================= */

uk:{

menu:"Зміст",
signIn:"Увійти",
joinClub:"Вступити до клубу",
language:"Мова",
contact:"Зв’язатися з нами",
openMenu:"Відкрити меню",
closeMenu:"Закрити меню",
home:"Головна",

nav:{
magazine:"Журнал",
coverStars:"Зірки обкладинки",
discounts:"Знижки",
petFriendly:"Улюбленцям раді",
marketplace:"Маркетплейс",
travel:"Подорожі",
fashion:"Мода",
health:"Здоров’я",
articles:"Статті",
photos:"Фото",
community:"Спільнота",
contests:"Конкурси",
animalHelp:"Допомога тваринам",
partners:"Партнери"
},

desc:{
magazine:"Читайте останній випуск PETS & DOGUE.",
coverStars:"Знайомтеся із зірками та подавайте свого улюбленця.",
discounts:"Ексклюзивні пропозиції та переваги Club.",
petFriendly:"Місця, де вашим улюбленцям завжди раді.",
marketplace:"Купуйте, продавайте та знаходьте послуги.",
travel:"Подорожі, готелі та напрямки з улюбленцями.",
fashion:"Стиль, аксесуари та мода для улюбленців.",
health:"Здоров’я, грумінг і щоденний догляд.",
articles:"Редакційні історії, інтерв’ю та поради.",
photos:"Портрети, галереї та візуальні історії.",
community:"Люди, місця, події та підтримка поруч.",
contests:"Беріть участь у конкурсах PETS & DOGUE.",
animalHelp:"Порятунок, адопція та допомога тваринам.",
partners:"Відібрані бренди, послуги та партнери."
}

},


/* =========================================================
RUSSIAN
========================================================= */

ru:{

menu:"Содержание",
signIn:"Войти",
joinClub:"Вступить в клуб",
language:"Язык",
contact:"Связаться с нами",
openMenu:"Открыть меню",
closeMenu:"Закрыть меню",
home:"Главная",

nav:{
magazine:"Журнал",
coverStars:"Звёзды обложки",
discounts:"Скидки",
petFriendly:"Питомцам рады",
marketplace:"Маркетплейс",
travel:"Путешествия",
fashion:"Мода",
health:"Здоровье",
articles:"Статьи",
photos:"Фото",
community:"Сообщество",
contests:"Конкурсы",
animalHelp:"Помощь животным",
partners:"Партнёры"
},

desc:{
magazine:"Читайте последний выпуск PETS & DOGUE.",
coverStars:"Знакомьтесь со звёздами и заявляйте питомца.",
discounts:"Эксклюзивные предложения и преимущества Club.",
petFriendly:"Места, где вашим питомцам всегда рады.",
marketplace:"Покупайте, продавайте и находите услуги.",
travel:"Путешествия, отели и маршруты с питомцами.",
fashion:"Стиль, аксессуары и мода для питомцев.",
health:"Здоровье, груминг и ежедневный уход.",
articles:"Редакционные истории, интервью и гиды.",
photos:"Портреты, галереи и визуальные истории.",
community:"Люди, места, события и помощь рядом.",
contests:"Участвуйте в конкурсах PETS & DOGUE.",
animalHelp:"Спасение, поиск дома и помощь животным.",
partners:"Отобранные бренды, услуги и партнёры."
}

},


/* =========================================================
FRENCH
========================================================= */

fr:{

menu:"Sommaire",
signIn:"Connexion",
joinClub:"Rejoindre le Club",
language:"Langue",
contact:"Nous contacter",
openMenu:"Ouvrir le menu",
closeMenu:"Fermer le menu",
home:"Accueil",

nav:{
magazine:"Magazine",
coverStars:"Stars de couverture",
discounts:"Réductions",
petFriendly:"Animaux bienvenus",
marketplace:"Marketplace",
travel:"Voyages",
fashion:"Mode",
health:"Santé",
articles:"Articles",
photos:"Photos",
community:"Communauté",
contests:"Concours",
animalHelp:"Aide aux animaux",
partners:"Partenaires"
},

desc:{
magazine:"Découvrez le dernier numéro de PETS & DOGUE.",
coverStars:"Découvrez nos stars et inscrivez votre animal.",
discounts:"Offres exclusives et avantages du Club.",
petFriendly:"Découvrez les lieux qui accueillent les animaux.",
marketplace:"Achetez, vendez et trouvez des services.",
travel:"Voyages, hôtels et destinations avec animaux.",
fashion:"Style, accessoires et mode pour animaux.",
health:"Santé, toilettage et soins quotidiens.",
articles:"Histoires, interviews et guides éditoriaux.",
photos:"Portraits, galeries et histoires visuelles.",
community:"Personnes, lieux, événements et entraide locale.",
contests:"Participez aux concours PETS & DOGUE.",
animalHelp:"Sauvetage, adoption et aide aux animaux.",
partners:"Marques, services et partenaires sélectionnés."
}

},


/* =========================================================
GERMAN
========================================================= */

de:{

menu:"Inhalt",
signIn:"Anmelden",
joinClub:"Club beitreten",
language:"Sprache",
contact:"Kontakt",
openMenu:"Menü öffnen",
closeMenu:"Menü schließen",
home:"Startseite",

nav:{
magazine:"Magazin",
coverStars:"Cover Stars",
discounts:"Rabatte",
petFriendly:"Tierfreundlich",
marketplace:"Marktplatz",
travel:"Reisen",
fashion:"Mode",
health:"Gesundheit",
articles:"Artikel",
photos:"Fotos",
community:"Community",
contests:"Wettbewerbe",
animalHelp:"Hilfe für Tiere",
partners:"Partner"
},

desc:{
magazine:"Lesen Sie die neueste PETS & DOGUE Ausgabe.",
coverStars:"Entdecken Sie unsere Stars und melden Sie Ihr Tier an.",
discounts:"Exklusive Angebote und Club-Vorteile.",
petFriendly:"Entdecken Sie tierfreundliche Orte.",
marketplace:"Kaufen, verkaufen und Services entdecken.",
travel:"Tierfreundliche Reisen, Hotels und Ziele.",
fashion:"Stil, Accessoires und Tiermode.",
health:"Gesundheit, Pflege und tägliche Betreuung.",
articles:"Editorials, Interviews und Ratgeber.",
photos:"Porträts, Galerien und visuelle Geschichten.",
community:"Lokale Menschen, Orte, Events und Hilfe.",
contests:"Nehmen Sie an PETS & DOGUE Wettbewerben teil.",
animalHelp:"Rettung, Adoption und Hilfe für Tiere.",
partners:"Ausgewählte Marken, Services und Partner."
}

},


/* =========================================================
SPANISH
========================================================= */

es:{

menu:"Contenido",
signIn:"Iniciar sesión",
joinClub:"Únete al Club",
language:"Idioma",
contact:"Contáctanos",
openMenu:"Abrir menú",
closeMenu:"Cerrar menú",
home:"Inicio",

nav:{
magazine:"Revista",
coverStars:"Estrellas de portada",
discounts:"Descuentos",
petFriendly:"Pet-Friendly",
marketplace:"Marketplace",
travel:"Viajes",
fashion:"Moda",
health:"Salud",
articles:"Artículos",
photos:"Fotos",
community:"Comunidad",
contests:"Concursos",
animalHelp:"Ayuda a animales",
partners:"Socios"
},

desc:{
magazine:"Lee el último número de PETS & DOGUE.",
coverStars:"Conoce nuestras estrellas e inscribe a tu mascota.",
discounts:"Ofertas exclusivas y ventajas del Club.",
petFriendly:"Descubre lugares donde admiten mascotas.",
marketplace:"Compra, vende y encuentra servicios.",
travel:"Viajes, hoteles y destinos con mascotas.",
fashion:"Estilo, accesorios y moda para mascotas.",
health:"Salud, peluquería y cuidados diarios.",
articles:"Historias, entrevistas y guías editoriales.",
photos:"Retratos, galerías e historias visuales.",
community:"Personas, lugares, eventos y apoyo local.",
contests:"Participa en concursos PETS & DOGUE.",
animalHelp:"Rescate, adopción y ayuda para animales.",
partners:"Marcas, servicios y socios seleccionados."
}

},


/* =========================================================
ITALIAN
========================================================= */

it:{

menu:"Contenuti",
signIn:"Accedi",
joinClub:"Unisciti al Club",
language:"Lingua",
contact:"Contattaci",
openMenu:"Apri menu",
closeMenu:"Chiudi menu",
home:"Home",

nav:{
magazine:"Rivista",
coverStars:"Cover Stars",
discounts:"Sconti",
petFriendly:"Pet-Friendly",
marketplace:"Marketplace",
travel:"Viaggi",
fashion:"Moda",
health:"Salute",
articles:"Articoli",
photos:"Foto",
community:"Community",
contests:"Concorsi",
animalHelp:"Aiuto agli animali",
partners:"Partner"
},

desc:{
magazine:"Leggi l’ultimo numero di PETS & DOGUE.",
coverStars:"Scopri le nostre star e iscrivi il tuo animale.",
discounts:"Offerte esclusive e vantaggi del Club.",
petFriendly:"Scopri i luoghi che accolgono gli animali.",
marketplace:"Compra, vendi e trova servizi.",
travel:"Viaggi, hotel e destinazioni pet-friendly.",
fashion:"Stile, accessori e moda per animali.",
health:"Salute, toelettatura e cura quotidiana.",
articles:"Storie editoriali, interviste e guide.",
photos:"Ritratti, gallerie e storie visive.",
community:"Persone, luoghi, eventi e supporto locale.",
contests:"Partecipa ai concorsi PETS & DOGUE.",
animalHelp:"Salvataggio, adozione e aiuto agli animali.",
partners:"Brand, servizi e partner selezionati."
}

},


/* =========================================================
PORTUGUESE
========================================================= */

pt:{

menu:"Conteúdo",
signIn:"Entrar",
joinClub:"Entrar no Club",
language:"Idioma",
contact:"Contacte-nos",
openMenu:"Abrir menu",
closeMenu:"Fechar menu",
home:"Início",

nav:{
magazine:"Revista",
coverStars:"Estrelas da capa",
discounts:"Descontos",
petFriendly:"Pet-Friendly",
marketplace:"Marketplace",
travel:"Viagens",
fashion:"Moda",
health:"Saúde",
articles:"Artigos",
photos:"Fotos",
community:"Comunidade",
contests:"Concursos",
animalHelp:"Ajuda aos animais",
partners:"Parceiros"
},

desc:{
magazine:"Leia a edição mais recente da PETS & DOGUE.",
coverStars:"Conheça as nossas estrelas e inscreva o seu animal.",
discounts:"Ofertas exclusivas e benefícios do Club.",
petFriendly:"Descubra locais onde os animais são bem-vindos.",
marketplace:"Compre, venda e encontre serviços.",
travel:"Viagens, hotéis e destinos com animais.",
fashion:"Estilo, acessórios e moda para animais.",
health:"Saúde, grooming e cuidados diários.",
articles:"Histórias editoriais, entrevistas e guias.",
photos:"Retratos, galerias e histórias visuais.",
community:"Pessoas, locais, eventos e apoio local.",
contests:"Participe nos concursos PETS & DOGUE.",
animalHelp:"Resgate, adoção e ajuda aos animais.",
partners:"Marcas, serviços e parceiros selecionados."
}

},


/* =========================================================
DUTCH
========================================================= */

nl:{

menu:"Inhoud",
signIn:"Inloggen",
joinClub:"Word lid",
language:"Taal",
contact:"Contact",
openMenu:"Menu openen",
closeMenu:"Menu sluiten",
home:"Home",

nav:{
magazine:"Magazine",
coverStars:"Coversterren",
discounts:"Kortingen",
petFriendly:"Huisdiervriendelijk",
marketplace:"Marktplaats",
travel:"Reizen",
fashion:"Mode",
health:"Gezondheid",
articles:"Artikelen",
photos:"Foto's",
community:"Community",
contests:"Wedstrijden",
animalHelp:"Hulp voor dieren",
partners:"Partners"
},

desc:{
magazine:"Lees het nieuwste nummer van PETS & DOGUE.",
coverStars:"Ontmoet onze sterren en meld je huisdier aan.",
discounts:"Exclusieve aanbiedingen en Club-voordelen.",
petFriendly:"Ontdek plaatsen waar huisdieren welkom zijn.",
marketplace:"Koop, verkoop en ontdek diensten.",
travel:"Huisdiervriendelijke reizen, hotels en bestemmingen.",
fashion:"Stijl, accessoires en mode voor huisdieren.",
health:"Gezondheid, verzorging en dagelijkse zorg.",
articles:"Redactionele verhalen, interviews en gidsen.",
photos:"Portretten, galerijen en visuele verhalen.",
community:"Lokale mensen, plaatsen, evenementen en steun.",
contests:"Doe mee aan PETS & DOGUE wedstrijden.",
animalHelp:"Redding, adoptie en hulp voor dieren.",
partners:"Geselecteerde merken, diensten en partners."
}

},


/* =========================================================
POLISH
========================================================= */

pl:{

menu:"Spis treści",
signIn:"Zaloguj się",
joinClub:"Dołącz do klubu",
language:"Język",
contact:"Kontakt",
openMenu:"Otwórz menu",
closeMenu:"Zamknij menu",
home:"Strona główna",

nav:{
magazine:"Magazyn",
coverStars:"Gwiazdy okładki",
discounts:"Zniżki",
petFriendly:"Przyjazne zwierzętom",
marketplace:"Marketplace",
travel:"Podróże",
fashion:"Moda",
health:"Zdrowie",
articles:"Artykuły",
photos:"Zdjęcia",
community:"Społeczność",
contests:"Konkursy",
animalHelp:"Pomoc zwierzętom",
partners:"Partnerzy"
},

desc:{
magazine:"Przeczytaj najnowszy numer PETS & DOGUE.",
coverStars:"Poznaj nasze gwiazdy i zgłoś swojego pupila.",
discounts:"Ekskluzywne oferty i korzyści Club.",
petFriendly:"Odkrywaj miejsca przyjazne zwierzętom.",
marketplace:"Kupuj, sprzedawaj i znajduj usługi.",
travel:"Podróże, hotele i miejsca przyjazne zwierzętom.",
fashion:"Styl, akcesoria i moda dla zwierząt.",
health:"Zdrowie, pielęgnacja i codzienna opieka.",
articles:"Historie, wywiady i poradniki redakcyjne.",
photos:"Portrety, galerie i historie wizualne.",
community:"Ludzie, miejsca, wydarzenia i lokalne wsparcie.",
contests:"Bierz udział w konkursach PETS & DOGUE.",
animalHelp:"Ratowanie, adopcja i pomoc zwierzętom.",
partners:"Wybrane marki, usługi i partnerzy."
}

},


/* =========================================================
CZECH
========================================================= */

cs:{

menu:"Obsah",
signIn:"Přihlásit se",
joinClub:"Vstoupit do klubu",
language:"Jazyk",
contact:"Kontaktujte nás",
openMenu:"Otevřít menu",
closeMenu:"Zavřít menu",
home:"Domů",

nav:{
magazine:"Magazín",
coverStars:"Hvězdy obálky",
discounts:"Slevy",
petFriendly:"Přátelské ke zvířatům",
marketplace:"Marketplace",
travel:"Cestování",
fashion:"Móda",
health:"Zdraví",
articles:"Články",
photos:"Fotografie",
community:"Komunita",
contests:"Soutěže",
animalHelp:"Pomoc zvířatům",
partners:"Partneři"
},

desc:{
magazine:"Přečtěte si nejnovější vydání PETS & DOGUE.",
coverStars:"Poznejte naše hvězdy a přihlaste svého mazlíčka.",
discounts:"Exkluzivní nabídky a výhody Club.",
petFriendly:"Objevujte místa přátelská ke zvířatům.",
marketplace:"Nakupujte, prodávejte a hledejte služby.",
travel:"Cestování, hotely a destinace se zvířaty.",
fashion:"Styl, doplňky a móda pro zvířata.",
health:"Zdraví, péče a každodenní starostlivost.",
articles:"Redakční příběhy, rozhovory a průvodci.",
photos:"Portréty, galerie a vizuální příběhy.",
community:"Lidé, místa, události a místní podpora.",
contests:"Zapojte se do soutěží PETS & DOGUE.",
animalHelp:"Záchrana, adopce a pomoc zvířatům.",
partners:"Vybrané značky, služby a partneři."
}

},


/* =========================================================
SLOVAK
========================================================= */

sk:{

menu:"Obsah",
signIn:"Prihlásiť sa",
joinClub:"Vstúpiť do klubu",
language:"Jazyk",
contact:"Kontaktujte nás",
openMenu:"Otvoriť menu",
closeMenu:"Zavrieť menu",
home:"Domov",

nav:{
magazine:"Magazín",
coverStars:"Hviezdy obálky",
discounts:"Zľavy",
petFriendly:"Priateľské k zvieratám",
marketplace:"Marketplace",
travel:"Cestovanie",
fashion:"Móda",
health:"Zdravie",
articles:"Články",
photos:"Fotografie",
community:"Komunita",
contests:"Súťaže",
animalHelp:"Pomoc zvieratám",
partners:"Partneri"
},

desc:{
magazine:"Prečítajte si najnovšie vydanie PETS & DOGUE.",
coverStars:"Spoznajte naše hviezdy a prihláste svojho miláčika.",
discounts:"Exkluzívne ponuky a výhody Club.",
petFriendly:"Objavujte miesta priateľské k zvieratám.",
marketplace:"Nakupujte, predávajte a hľadajte služby.",
travel:"Cestovanie, hotely a destinácie so zvieratami.",
fashion:"Štýl, doplnky a móda pre zvieratá.",
health:"Zdravie, starostlivosť a každodenná péče.",
articles:"Redakčné príbehy, rozhovory a sprievodcovia.",
photos:"Portréty, galérie a vizuálne príbehy.",
community:"Ľudia, miesta, udalosti a miestna podpora.",
contests:"Zapojte sa do súťaží PETS & DOGUE.",
animalHelp:"Záchrana, adopcia a pomoc zvieratám.",
partners:"Vybrané značky, služby a partneri."
}

},


/* =========================================================
HUNGARIAN
========================================================= */

hu:{

menu:"Tartalom",
signIn:"Belépés",
joinClub:"Csatlakozás",
language:"Nyelv",
contact:"Kapcsolat",
openMenu:"Menü megnyitása",
closeMenu:"Menü bezárása",
home:"Kezdőlap",

nav:{
magazine:"Magazin",
coverStars:"Címlapsztárok",
discounts:"Kedvezmények",
petFriendly:"Állatbarát",
marketplace:"Piactér",
travel:"Utazás",
fashion:"Divat",
health:"Egészség",
articles:"Cikkek",
photos:"Fotók",
community:"Közösség",
contests:"Versenyek",
animalHelp:"Állatsegítés",
partners:"Partnerek"
},

desc:{
magazine:"Olvassa el a PETS & DOGUE legújabb számát.",
coverStars:"Ismerje meg sztárjainkat és nevezze kedvencét.",
discounts:"Exkluzív ajánlatok és Club-előnyök.",
petFriendly:"Fedezze fel az állatbarát helyeket.",
marketplace:"Vásároljon, adjon el és találjon szolgáltatásokat.",
travel:"Állatbarát utazások, szállodák és úti célok.",
fashion:"Stílus, kiegészítők és kisállatdivat.",
health:"Egészség, ápolás és mindennapi gondozás.",
articles:"Szerkesztőségi történetek, interjúk és útmutatók.",
photos:"Portrék, galériák és vizuális történetek.",
community:"Helyi emberek, helyek, események és támogatás.",
contests:"Vegyen részt PETS & DOGUE versenyeken.",
animalHelp:"Mentés, örökbefogadás és segítség az állatoknak.",
partners:"Válogatott márkák, szolgáltatások és partnerek."
}

},


/* =========================================================
ROMANIAN
========================================================= */

ro:{

menu:"Conținut",
signIn:"Autentificare",
joinClub:"Intră în Club",
language:"Limbă",
contact:"Contactați-ne",
openMenu:"Deschide meniul",
closeMenu:"Închide meniul",
home:"Acasă",

nav:{
magazine:"Revistă",
coverStars:"Vedete de copertă",
discounts:"Reduceri",
petFriendly:"Pet-Friendly",
marketplace:"Marketplace",
travel:"Călătorii",
fashion:"Modă",
health:"Sănătate",
articles:"Articole",
photos:"Fotografii",
community:"Comunitate",
contests:"Concursuri",
animalHelp:"Ajutor pentru animale",
partners:"Parteneri"
},

desc:{
magazine:"Citește cea mai nouă ediție PETS & DOGUE.",
coverStars:"Descoperă vedetele și înscrie animalul tău.",
discounts:"Oferte exclusive și beneficii Club.",
petFriendly:"Descoperă locuri unde animalele sunt binevenite.",
marketplace:"Cumpără, vinde și găsește servicii.",
travel:"Călătorii, hoteluri și destinații cu animale.",
fashion:"Stil, accesorii și modă pentru animale.",
health:"Sănătate, grooming și îngrijire zilnică.",
articles:"Povești editoriale, interviuri și ghiduri.",
photos:"Portrete, galerii și povești vizuale.",
community:"Oameni, locuri, evenimente și sprijin local.",
contests:"Participă la concursurile PETS & DOGUE.",
animalHelp:"Salvare, adopție și ajutor pentru animale.",
partners:"Branduri, servicii și parteneri selectați."
}

},


/* =========================================================
BULGARIAN
========================================================= */

bg:{

menu:"Съдържание",
signIn:"Вход",
joinClub:"Влезте в клуба",
language:"Език",
contact:"Свържете се с нас",
openMenu:"Отвори менюто",
closeMenu:"Затвори менюто",
home:"Начало",

nav:{
magazine:"Списание",
coverStars:"Звезди на корицата",
discounts:"Отстъпки",
petFriendly:"Любимци добре дошли",
marketplace:"Маркетплейс",
travel:"Пътувания",
fashion:"Мода",
health:"Здраве",
articles:"Статии",
photos:"Снимки",
community:"Общност",
contests:"Конкурси",
animalHelp:"Помощ за животни",
partners:"Партньори"
},

desc:{
magazine:"Прочетете най-новия брой на PETS & DOGUE.",
coverStars:"Запознайте се със звездите и включете любимеца си.",
discounts:"Ексклузивни оферти и Club предимства.",
petFriendly:"Открийте места, където любимците са добре дошли.",
marketplace:"Купувайте, продавайте и намирайте услуги.",
travel:"Пътувания, хотели и дестинации с любимци.",
fashion:"Стил, аксесоари и мода за любимци.",
health:"Здраве, груминг и ежедневна грижа.",
articles:"Редакционни истории, интервюта и ръководства.",
photos:"Портрети, галерии и визуални истории.",
community:"Хора, места, събития и местна подкрепа.",
contests:"Участвайте в конкурсите PETS & DOGUE.",
animalHelp:"Спасяване, осиновяване и помощ за животни.",
partners:"Подбрани марки, услуги и партньори."
}

},


/* =========================================================
GREEK
========================================================= */

el:{

menu:"Περιεχόμενα",
signIn:"Σύνδεση",
joinClub:"Εγγραφή στο Club",
language:"Γλώσσα",
contact:"Επικοινωνία",
openMenu:"Άνοιγμα μενού",
closeMenu:"Κλείσιμο μενού",
home:"Αρχική",

nav:{
magazine:"Περιοδικό",
coverStars:"Αστέρια εξωφύλλου",
discounts:"Εκπτώσεις",
petFriendly:"Φιλικό στα κατοικίδια",
marketplace:"Marketplace",
travel:"Ταξίδια",
fashion:"Μόδα",
health:"Υγεία",
articles:"Άρθρα",
photos:"Φωτογραφίες",
community:"Κοινότητα",
contests:"Διαγωνισμοί",
animalHelp:"Βοήθεια στα ζώα",
partners:"Συνεργάτες"
},

desc:{
magazine:"Διαβάστε το τελευταίο τεύχος του PETS & DOGUE.",
coverStars:"Γνωρίστε τα αστέρια μας και δηλώστε το κατοικίδιό σας.",
discounts:"Αποκλειστικές προσφορές και προνόμια Club.",
petFriendly:"Ανακαλύψτε μέρη φιλικά προς τα κατοικίδια.",
marketplace:"Αγοράστε, πουλήστε και βρείτε υπηρεσίες.",
travel:"Ταξίδια, ξενοδοχεία και προορισμοί με κατοικίδια.",
fashion:"Στυλ, αξεσουάρ και μόδα για κατοικίδια.",
health:"Υγεία, περιποίηση και καθημερινή φροντίδα.",
articles:"Ιστορίες, συνεντεύξεις και οδηγοί.",
photos:"Πορτρέτα, γκαλερί και οπτικές ιστορίες.",
community:"Άνθρωποι, μέρη, εκδηλώσεις και τοπική υποστήριξη.",
contests:"Πάρτε μέρος στους διαγωνισμούς PETS & DOGUE.",
animalHelp:"Διάσωση, υιοθεσία και βοήθεια στα ζώα.",
partners:"Επιλεγμένες μάρκες, υπηρεσίες και συνεργάτες."
}

},


/* =========================================================
SWEDISH
========================================================= */

sv:{

menu:"Innehåll",
signIn:"Logga in",
joinClub:"Gå med i Club",
language:"Språk",
contact:"Kontakta oss",
openMenu:"Öppna meny",
closeMenu:"Stäng meny",
home:"Hem",

nav:{
magazine:"Magasin",
coverStars:"Omslagsstjärnor",
discounts:"Rabatter",
petFriendly:"Husdjursvänligt",
marketplace:"Marknadsplats",
travel:"Resor",
fashion:"Mode",
health:"Hälsa",
articles:"Artiklar",
photos:"Foton",
community:"Community",
contests:"Tävlingar",
animalHelp:"Hjälp för djur",
partners:"Partners"
},

desc:{
magazine:"Läs det senaste numret av PETS & DOGUE.",
coverStars:"Möt våra stjärnor och anmäl ditt husdjur.",
discounts:"Exklusiva erbjudanden och Club-förmåner.",
petFriendly:"Upptäck platser där husdjur är välkomna.",
marketplace:"Köp, sälj och hitta tjänster.",
travel:"Husdjursvänliga resor, hotell och destinationer.",
fashion:"Stil, accessoarer och mode för husdjur.",
health:"Hälsa, pälsvård och daglig omsorg.",
articles:"Redaktionella berättelser, intervjuer och guider.",
photos:"Porträtt, gallerier och visuella berättelser.",
community:"Lokala människor, platser, event och stöd.",
contests:"Delta i PETS & DOGUE-tävlingar.",
animalHelp:"Räddning, adoption och hjälp för djur.",
partners:"Utvalda varumärken, tjänster och partners."
}

},


/* =========================================================
DANISH
========================================================= */

da:{

menu:"Indhold",
signIn:"Log ind",
joinClub:"Tilmeld Club",
language:"Sprog",
contact:"Kontakt os",
openMenu:"Åbn menu",
closeMenu:"Luk menu",
home:"Hjem",

nav:{
magazine:"Magasin",
coverStars:"Forsidestjerner",
discounts:"Rabatter",
petFriendly:"Kæledyrsvenligt",
marketplace:"Marketplace",
travel:"Rejser",
fashion:"Mode",
health:"Sundhed",
articles:"Artikler",
photos:"Fotos",
community:"Community",
contests:"Konkurrencer",
animalHelp:"Hjælp til dyr",
partners:"Partnere"
},

desc:{
magazine:"Læs det nyeste nummer af PETS & DOGUE.",
coverStars:"Mød vores stjerner og tilmeld dit kæledyr.",
discounts:"Eksklusive tilbud og Club-fordele.",
petFriendly:"Find steder hvor kæledyr er velkomne.",
marketplace:"Køb, sælg og find tjenester.",
travel:"Kæledyrsvenlige rejser, hoteller og destinationer.",
fashion:"Stil, tilbehør og mode til kæledyr.",
health:"Sundhed, pleje og daglig omsorg.",
articles:"Redaktionelle historier, interviews og guider.",
photos:"Portrætter, gallerier og visuelle historier.",
community:"Lokale mennesker, steder, events og støtte.",
contests:"Deltag i PETS & DOGUE-konkurrencer.",
animalHelp:"Redning, adoption og hjælp til dyr.",
partners:"Udvalgte brands, tjenester og partnere."
}

},


/* =========================================================
NORWEGIAN
========================================================= */

no:{

menu:"Innhold",
signIn:"Logg inn",
joinClub:"Bli med i Club",
language:"Språk",
contact:"Kontakt oss",
openMenu:"Åpne meny",
closeMenu:"Lukk meny",
home:"Hjem",

nav:{
magazine:"Magasin",
coverStars:"Forsidestjerner",
discounts:"Rabatter",
petFriendly:"Dyrevennlig",
marketplace:"Markedsplass",
travel:"Reiser",
fashion:"Mote",
health:"Helse",
articles:"Artikler",
photos:"Bilder",
community:"Fellesskap",
contests:"Konkurranser",
animalHelp:"Hjelp til dyr",
partners:"Partnere"
},

desc:{
magazine:"Les den nyeste utgaven av PETS & DOGUE.",
coverStars:"Møt stjernene våre og meld på kjæledyret ditt.",
discounts:"Eksklusive tilbud og Club-fordeler.",
petFriendly:"Finn steder hvor kjæledyr er velkomne.",
marketplace:"Kjøp, selg og finn tjenester.",
travel:"Dyrevennlige reiser, hoteller og destinasjoner.",
fashion:"Stil, tilbehør og mote for kjæledyr.",
health:"Helse, pelspleie og daglig omsorg.",
articles:"Redaksjonelle historier, intervjuer og guider.",
photos:"Portretter, gallerier og visuelle historier.",
community:"Lokale mennesker, steder, arrangementer og støtte.",
contests:"Delta i PETS & DOGUE-konkurranser.",
animalHelp:"Redning, adopsjon og hjelp til dyr.",
partners:"Utvalgte merker, tjenester og partnere."
}

},


/* =========================================================
FINNISH
========================================================= */

fi:{

menu:"Sisältö",
signIn:"Kirjaudu",
joinClub:"Liity Clubiin",
language:"Kieli",
contact:"Ota yhteyttä",
openMenu:"Avaa valikko",
closeMenu:"Sulje valikko",
home:"Etusivu",

nav:{
magazine:"Lehti",
coverStars:"Kansitähdet",
discounts:"Alennukset",
petFriendly:"Lemmikkiystävällinen",
marketplace:"Marketplace",
travel:"Matkailu",
fashion:"Muoti",
health:"Terveys",
articles:"Artikkelit",
photos:"Kuvat",
community:"Yhteisö",
contests:"Kilpailut",
animalHelp:"Apua eläimille",
partners:"Kumppanit"
},

desc:{
magazine:"Lue PETS & DOGUE -lehden uusin numero.",
coverStars:"Tapaa tähtemme ja ilmoita lemmikkisi.",
discounts:"Eksklusiivisia tarjouksia ja Club-etuja.",
petFriendly:"Löydä paikkoja, joihin lemmikit ovat tervetulleita.",
marketplace:"Osta, myy ja löydä palveluita.",
travel:"Lemmikkiystävällisiä matkoja, hotelleja ja kohteita.",
fashion:"Tyyliä, asusteita ja lemmikkimuotia.",
health:"Terveyttä, hoitoa ja päivittäistä hyvinvointia.",
articles:"Toimituksellisia tarinoita, haastatteluja ja oppaita.",
photos:"Muotokuvia, gallerioita ja visuaalisia tarinoita.",
community:"Paikallisia ihmisiä, paikkoja, tapahtumia ja tukea.",
contests:"Osallistu PETS & DOGUE -kilpailuihin.",
animalHelp:"Pelastusta, adoptiota ja apua eläimille.",
partners:"Valittuja brändejä, palveluita ja kumppaneita."
}

},


/* =========================================================
TURKISH
========================================================= */

tr:{

menu:"İçindekiler",
signIn:"Giriş yap",
joinClub:"Club'a katıl",
language:"Dil",
contact:"Bize ulaşın",
openMenu:"Menüyü aç",
closeMenu:"Menüyü kapat",
home:"Ana sayfa",

nav:{
magazine:"Dergi",
coverStars:"Kapak yıldızları",
discounts:"İndirimler",
petFriendly:"Evcil hayvan dostu",
marketplace:"Pazar",
travel:"Seyahat",
fashion:"Moda",
health:"Sağlık",
articles:"Makaleler",
photos:"Fotoğraflar",
community:"Topluluk",
contests:"Yarışmalar",
animalHelp:"Hayvanlara yardım",
partners:"Ortaklar"
},

desc:{
magazine:"PETS & DOGUE'un son sayısını okuyun.",
coverStars:"Yıldızlarımızı tanıyın ve evcil hayvanınızı katın.",
discounts:"Özel teklifler ve Club avantajları.",
petFriendly:"Evcil hayvan dostu yerleri keşfedin.",
marketplace:"Alın, satın ve hizmetleri keşfedin.",
travel:"Evcil hayvan dostu seyahatler, oteller ve rotalar.",
fashion:"Stil, aksesuarlar ve evcil hayvan modası.",
health:"Sağlık, bakım ve günlük evcil hayvan bakımı.",
articles:"Editoryal hikâyeler, röportajlar ve rehberler.",
photos:"Portreler, galeriler ve görsel hikâyeler.",
community:"Yerel insanlar, yerler, etkinlikler ve destek.",
contests:"PETS & DOGUE yarışmalarına katılın.",
animalHelp:"Kurtarma, sahiplendirme ve hayvanlara yardım.",
partners:"Seçilmiş markalar, hizmetler ve ortaklar."
}

},


/* =========================================================
ARABIC
========================================================= */

ar:{

menu:"المحتويات",
signIn:"تسجيل الدخول",
joinClub:"الانضمام إلى النادي",
language:"اللغة",
contact:"اتصل بنا",
openMenu:"فتح القائمة",
closeMenu:"إغلاق القائمة",
home:"الرئيسية",

nav:{
magazine:"المجلة",
coverStars:"نجوم الغلاف",
discounts:"الخصومات",
petFriendly:"أماكن صديقة للحيوانات",
marketplace:"السوق",
travel:"السفر",
fashion:"الموضة",
health:"الصحة",
articles:"المقالات",
photos:"الصور",
community:"المجتمع",
contests:"المسابقات",
animalHelp:"مساعدة الحيوانات",
partners:"الشركاء"
},

desc:{
magazine:"اقرأ أحدث إصدار من PETS & DOGUE.",
coverStars:"تعرّف على نجومنا وشارك حيوانك الأليف.",
discounts:"عروض حصرية ومزايا أعضاء النادي.",
petFriendly:"اكتشف الأماكن التي ترحب بالحيوانات.",
marketplace:"اشترِ وبع واعثر على خدمات الحيوانات.",
travel:"رحلات وفنادق ووجهات صديقة للحيوانات.",
fashion:"الأناقة والإكسسوارات وموضة الحيوانات.",
health:"الصحة والعناية والرعاية اليومية.",
articles:"قصص ومقابلات وأدلة تحريرية.",
photos:"صور وبورتريهات وقصص بصرية.",
community:"أشخاص وأماكن وفعاليات ودعم محلي.",
contests:"شارك في مسابقات PETS & DOGUE.",
animalHelp:"إنقاذ وتبنّي ومساعدة الحيوانات المحتاجة.",
partners:"علامات وخدمات وشركاء مختارون."
}

},


/* =========================================================
HINDI
========================================================= */

hi:{

menu:"सामग्री",
signIn:"साइन इन",
joinClub:"क्लब में शामिल हों",
language:"भाषा",
contact:"संपर्क करें",
openMenu:"मेनू खोलें",
closeMenu:"मेनू बंद करें",
home:"होम",

nav:{
magazine:"पत्रिका",
coverStars:"कवर स्टार",
discounts:"छूट",
petFriendly:"पेट-फ्रेंडली",
marketplace:"मार्केटप्लेस",
travel:"यात्रा",
fashion:"फ़ैशन",
health:"स्वास्थ्य",
articles:"लेख",
photos:"फ़ोटो",
community:"समुदाय",
contests:"प्रतियोगिताएँ",
animalHelp:"जानवरों की मदद",
partners:"पार्टनर"
},

desc:{
magazine:"PETS & DOGUE का नवीनतम अंक पढ़ें।",
coverStars:"हमारे सितारों से मिलें और अपने पालतू को शामिल करें।",
discounts:"विशेष ऑफ़र और Club सदस्य लाभ।",
petFriendly:"ऐसी जगहें खोजें जहाँ पालतू जानवरों का स्वागत है।",
marketplace:"खरीदें, बेचें और पालतू सेवाएँ खोजें।",
travel:"पालतू-अनुकूल यात्राएँ, होटल और गंतव्य।",
fashion:"स्टाइल, एक्सेसरीज़ और पालतू फ़ैशन।",
health:"स्वास्थ्य, ग्रूमिंग और रोज़मर्रा की देखभाल।",
articles:"संपादकीय कहानियाँ, इंटरव्यू और गाइड।",
photos:"पोर्ट्रेट, गैलरी और विज़ुअल कहानियाँ।",
community:"स्थानीय लोग, जगहें, कार्यक्रम और सहायता।",
contests:"PETS & DOGUE प्रतियोगिताओं में भाग लें।",
animalHelp:"बचाव, गोद लेना और जरूरतमंद जानवरों की मदद।",
partners:"चुने हुए ब्रांड, सेवाएँ और पार्टनर।"
}

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

let internalLanguageChange=false;


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


function getLanguage(){

let language=
normalizeLanguage(
localStorage.getItem(
LANGUAGE_KEY
)||
document.documentElement.lang||
"en"
);


if(
!TEXT[language]
){

language="en";

}


return language;

}


function escapeHTML(value){

return String(
value||
""
)

.replaceAll(
"&",
"&amp;"
)

.replaceAll(
"<",
"&lt;"
)

.replaceAll(
">",
"&gt;"
)

.replaceAll(
'"',
"&quot;"
)

.replaceAll(
"'",
"&#039;"
);

}


/* =========================================================
CSS
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
HIDE OLD SHELL VISUALLY ONLY
========================================================= */

.pd-global-old-shell-hidden{
display:none !important;
}


/* =========================================================
GLOBAL HEADER
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
HEADER TOP
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

border-radius:999px;
}


/* =========================================================
BRAND
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
TOP RUBRICS
========================================================= */

#pdGlobalRubrics{
position:relative;

width:100%;

height:46px;

min-height:46px;

display:flex;

align-items:stretch;

gap:0;

margin:0;

padding:0 7px;

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

background:rgba(0,0,0,.66);

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
COMPACT SIDE MENU

REFERENCE:
PHOTO CARD MENU

IMPORTANT:
NOT FULL WIDTH
========================================================= */

#pdGlobalMenu{
position:fixed;

top:0;

left:0;

bottom:0;

z-index:9000;

width:min(74vw,292px);

max-width:292px;

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

height:64px;

min-height:64px;

padding:0 10px 0 14px;

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

font-size:24px;

font-weight:400;

line-height:1;

white-space:nowrap;

overflow:hidden;

text-overflow:ellipsis;
}

#pdGlobalClose{
flex:0 0 auto;

width:35px;

height:35px;

display:flex;

align-items:center;

justify-content:center;

padding:0;

border:1px solid #484848;

border-radius:50%;

background:#111;

color:#fff;

font-size:23px;

font-weight:300;

line-height:1;

cursor:pointer;
}


/* =========================================================
SIGN IN / JOIN CLUB
========================================================= */

.pd-global-account{
display:grid;

grid-template-columns:1fr 1fr;

gap:6px;

padding:8px;

background:#fff;

border-bottom:1px solid #dedede;
}

.pd-global-account a{
min-width:0;

min-height:37px;

padding:6px 5px;

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

font-size:8.7px;

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
padding:8px;

background:#fff;

border-bottom:1px solid #dedede;
}

.pd-global-language label{
display:block;

margin:0 0 5px 2px;

font-size:7px;

font-weight:900;

line-height:1;

letter-spacing:1.4px;

text-transform:uppercase;

color:#777;
}

#pdGlobalLanguage{
width:100%;

height:37px;

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

font-size:10.5px;

font-weight:800;
}


/* =========================================================
SIDE MENU PHOTO CARDS
========================================================= */

#pdGlobalMenuList{
display:grid;

grid-template-columns:1fr;

gap:6px;

padding:8px;

background:#fff;
}

.pd-global-menu-card{
position:relative;

min-width:0;

min-height:68px;

display:grid;

grid-template-columns:
60px
minmax(0,1fr);

align-items:stretch;

overflow:hidden;

border:1.5px solid #151515;

border-radius:15px;

background:#faf8f3;

color:#111;

text-decoration:none;
}

.pd-global-menu-card-image{
position:relative;

width:60px;

min-height:68px;

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

padding:7px 7px 6px 8px;

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

font-size:14px;

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

font-size:8.7px;

font-weight:400;

line-height:1.26;

color:#676767;

display:-webkit-box;

-webkit-line-clamp:2;

-webkit-box-orient:vertical;

overflow:hidden;
}


/* =========================================================
ACTIVE SIDE CARD
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
padding:0 8px 12px;

background:#fff;
}

.pd-global-menu-footer a{
min-height:36px;

display:flex;

align-items:center;

justify-content:center;

padding:7px 9px;

border:1.5px solid #111;

border-radius:999px;

background:#111;

color:#efd38c;

font-size:9px;

font-weight:900;

line-height:1;

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

html[dir="rtl"] .pd-global-menu-card-copy{
text-align:right;
}


/* =========================================================
SMALL MOBILE
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
width:min(74vw,280px);

max-width:280px;
}

}


/* =========================================================
DESKTOP
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
width:min(320px,30vw);

max-width:320px;
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
HIDE OLD HEADER / OLD TOP NAV

IMPORTANT:
OLD ELEMENTS STAY IN DOM.
PAGE-SPECIFIC JS IS NOT DESTROYED.
========================================================= */

function hideExistingShell(){

document
.querySelectorAll(
"header.site-header"
)
.forEach(
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
Old special-offers shell.
*/

[
"#pdMasterHeader",
".pd-master-header",
"#pdShellMenu",
"#pdShellOverlay"
]
.forEach(
selector=>{

document
.querySelectorAll(
selector
)
.forEach(
element=>{

element.classList.add(
"pd-global-old-shell-hidden"
);

}
);

}
);


/*
Old horizontal nav bars near the top.
*/

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
rect.top<350
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
CREATE GLOBAL HEADER
========================================================= */

function createHeader(){

if(
document.getElementById(
"pdGlobalHeader"
)
){

return;

}


const language=
getLanguage();


const copy=
TEXT[language]||
TEXT.en;


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
aria-label="${escapeHTML(
copy.openMenu
)}"
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
aria-label="${escapeHTML(
copy.home
)}"
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
aria-label="PETS & DOGUE"
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
?.addEventListener(
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
OPEN / CLOSE MENU
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


const copy=
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


const oldScroll=
nav.scrollLeft;


nav.innerHTML=
NAV_ITEMS
.map(
item=>{

const active=
item.key===activeKey;


return`

<a
href="${item.url}"
class="${active?"active":""}"
${active?'aria-current="page"':""}
>

${escapeHTML(
copy.nav[item.key]
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
oldScroll;

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


const copy=
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


const cards=
NAV_ITEMS
.map(
item=>{

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
copy.nav[item.key]
)}

</h3>


<p>

${escapeHTML(
copy.desc[item.key]
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
copy.menu
)}

</h2>


<button
id="pdGlobalClose"
type="button"
aria-label="${escapeHTML(
copy.closeMenu
)}"
>
×
</button>

</div>


<div class="pd-global-account">

<a href="account.html">

${escapeHTML(
copy.signIn
)}

</a>


<a
class="club"
href="club.html"
>

${escapeHTML(
copy.joinClub
)}

</a>

</div>


<div class="pd-global-language">

<label for="pdGlobalLanguage">

${escapeHTML(
copy.language
)}

</label>


<select
id="pdGlobalLanguage"
aria-label="${escapeHTML(
copy.language
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
copy.contact
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
UPDATE HEADER ACCESSIBILITY TEXT
========================================================= */

function updateHeaderLanguage(){

const language=
getLanguage();


const copy=
TEXT[language]||
TEXT.en;


document
.getElementById(
"pdGlobalMenuButton"
)
?.setAttribute(
"aria-label",
copy.openMenu
);


document
.getElementById(
"pdGlobalHome"
)
?.setAttribute(
"aria-label",
copy.home
);

}


/* =========================================================
EXISTING PAGE LANGUAGE SELECT

Some old pages use:
uk
or
ua

cs
or
cz

etc.

Find whichever option exists.
========================================================= */

function valueForExistingSelect(
select,
language
){

const candidates=[language];


const reverseAliases={

uk:"ua",
cs:"cz",
el:"gr",
sv:"se",
da:"dk"

};


if(
reverseAliases[language]
){

candidates.push(
reverseAliases[language]
);

}


for(
const candidate of candidates
){

const exists=
Array
.from(
select.options||
[]
)
.some(
option=>
option.value===candidate
);


if(
exists
){

return candidate;

}

}


return"";

}


/* =========================================================
SYNC SAVED LANGUAGE WITH EXISTING PAGE

IMPORTANT:
WE USE THE PAGE'S EXISTING TRANSLATION SYSTEM.
WE DO NOT REPLACE PAGE CONTENT TRANSLATIONS.
========================================================= */

function syncExistingPageLanguage(
language
){

document.documentElement.lang=
language;


document.documentElement.dir=
language==="ar"
?"rtl"
:"ltr";


let handled=false;


/*
Existing central controller.
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
typeof controller[setter]==="function"
){

try{

controller[setter](
language
);


handled=true;

}catch(error){

console.warn(
"PETS & DOGUE language controller:",
error
);

}


break;

}

}

}


/*
Some pages expose renderLanguage().
*/

if(
!handled &&
typeof window.renderLanguage==="function"
){

try{

window.renderLanguage(
language
);


handled=true;

}catch(error){

console.warn(
"PETS & DOGUE renderLanguage:",
error
);

}

}


/*
Existing language select.
*/

const existingSelect=
document.getElementById(
"languageSelect"
);


if(
existingSelect
){

const value=
valueForExistingSelect(
existingSelect,
language
);


if(
value &&
existingSelect.value!==value
){

try{

existingSelect.value=
value;


existingSelect.dispatchEvent(
new Event(
"change",
{
bubbles:true
}
)
);


handled=true;

}catch(error){

console.warn(
"PETS & DOGUE language select:",
error
);

}

}

}


return handled;

}


/* =========================================================
LANGUAGE CHANGE FROM GLOBAL MENU
========================================================= */

function handleLanguageChange(
event
){

if(
internalLanguageChange
){

return;

}


const language=
normalizeLanguage(
event.target.value
);


if(
!TEXT[language]
){

return;

}


internalLanguageChange=true;


localStorage.setItem(
LANGUAGE_KEY,
language
);


syncExistingPageLanguage(
language
);


updateHeaderLanguage();

renderRubrics();

renderSideMenu();


window.dispatchEvent(
new CustomEvent(
"petsdogue:languagechange",
{
detail:{
language
}
}
)
);


setTimeout(
()=>{

internalLanguageChange=false;

},
0
);

}


/* =========================================================
POSITION ACTIVE RUBRIC ONCE

ONLY ONCE.

AFTER THIS:
USER CONTROLS THE STRIP.

NO:
- repeated centering
- scroll lock
- resize centering
- forced return
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


activePositionDone=true;


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
FREE NATIVE HORIZONTAL SWIPE
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
REFRESH SHELL LANGUAGE
========================================================= */

function refreshShellLanguage(){

updateHeaderLanguage();

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


/*
Old visual shell stays in DOM but is hidden.
*/

hideExistingShell();


/*
Create the one master shell.
*/

createHeader();

createSideMenu();


/*
Render it.
*/

renderRubrics();

renderSideMenu();

updateHeaderLanguage();


/*
Native horizontal swipe.
*/

installRubricInteraction();


/*
Synchronise page with the language saved by the user.
This fixes pages opening in English unexpectedly.
*/

const savedLanguage=
getLanguage();


syncExistingPageLanguage(
savedLanguage
);


/*
Centre active rubric only once.
*/

setTimeout(
positionActiveOnce,
90
);


/*
Existing page changed its language.
Do not rebuild page functionality.
Only update shell labels.
*/

window.addEventListener(
"petsdogue:languagechange",
event=>{

if(
internalLanguageChange
){

return;

}


const eventLanguage=
normalizeLanguage(
event?.detail?.language||
localStorage.getItem(
LANGUAGE_KEY
)||
document.documentElement.lang
);


if(
TEXT[eventLanguage]
){

localStorage.setItem(
LANGUAGE_KEY,
eventLanguage
);

}


setTimeout(
refreshShellLanguage,
0
);

}
);


/*
Language changed in another browser tab.
*/

window.addEventListener(
"storage",
event=>{

if(
event.key!==LANGUAGE_KEY
){

return;

}


const language=
getLanguage();


syncExistingPageLanguage(
language
);


refreshShellLanguage();

}
);


/*
Escape closes only the global menu.
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
