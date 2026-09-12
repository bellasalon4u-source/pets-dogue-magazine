"use strict";

/* =========================================================
PETS & DOGUE
MASTER GLOBAL SHELL

PURPOSE
- ONE INTERNAL-PAGE HEADER
- ONE SIDE MENU
- ONE LANGUAGE STATE
- ONE ACTIVE RUBRIC STATE
- PROFILE ACCESS NEXT TO HOME

IMPORTANT
- PAGE CONTENT AND PAGE-SPECIFIC FUNCTIONS ARE NOT REBUILT HERE.
- LANGUAGE REMAINS AVAILABLE INSIDE THE SIDE MENU.
- THE INTERNAL HEADER CONTAINS ONLY:
  MENU / BRAND / HOME / PROFILE.
- PROFILE OPENS SIGN IN + JOIN CLUB.
- ARABIC USES RTL.
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

const NAV_ITEMS=[
  {
    key:"magazine",
    url:"issue-01.html",
    image:"file_00000000a9d471fda9b4629589be22a9.png"
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
    image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=82"
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
    image:"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=82"
  },
  {
    key:"partners",
    url:"partners.html",
    image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=82"
  }
];

const PAGE_KEYS={
  "issue-01.html":"magazine",
  "issue-02.html":"magazine",
  "magazine.html":"magazine",
  "archive.html":"magazine",

  "members-gallery.html":"coverStars",
  "cover-stars.html":"coverStars",
  "become-cover-star.html":"coverStars",
  "submit-pet.html":"coverStars",
  "hall-of-fame.html":"coverStars",

  "special-offers.html":"discounts",

  "pet-friendly-places.html":"petFriendly",

  "pet-marketplace.html":"marketplace",

  "pet-travel.html":"travel",
  "travel.html":"travel",

  "pet-fashion.html":"fashion",

  "wellness.html":"health",
  "health.html":"health",

  "articles.html":"articles",
  "article.html":"articles",

  "photos.html":"photos",

  "local-community.html":"community",
  "community.html":"community",
  "social.html":"community",
  "events.html":"community",

  "contests.html":"contests",

  "pets-in-need.html":"animalHelp",
  "rescue.html":"animalHelp",
  "help.html":"animalHelp",
  "volunteer-network.html":"animalHelp",

  "partners.html":"partners"
};

const NAV_INDEX={
  magazine:0,
  coverStars:1,
  discounts:2,
  petFriendly:3,
  marketplace:4,
  travel:5,
  fashion:6,
  health:7,
  articles:8,
  photos:9,
  community:10,
  contests:11,
  animalHelp:12,
  partners:13
};

const TEXT={
  "en": {
    "menu": "Contents",
    "signIn": "Sign In",
    "joinClub": "Join Club",
    "language": "Language",
    "contact": "Contact us",
    "openMenu": "Open menu",
    "closeMenu": "Close menu",
    "home": "Home",
    "profile": "Profile",
    "nav": [
      "Edition",
      "Cover Stars",
      "Discounts",
      "Pet-Friendly Places",
      "Marketplace",
      "Travel",
      "Fashion",
      "Health",
      "Articles",
      "Photos",
      "Community",
      "Contests",
      "Pets in Need",
      "Partners"
    ],
    "desc": [
      "Open PETS & DOGUE Edition 01 — the latest curated digital edition.",
      "Enter your pet and compete for the next cover.",
      "Discover member discounts and special offers.",
      "Discover pet-friendly places with maps, routes, contacts and useful information.",
      "Buy, sell and discover pet products and services.",
      "Pet-friendly travel, routes, stays and useful trip planning.",
      "Style, accessories and pet fashion.",
      "Health, grooming and everyday pet care.",
      "Editorial stories, interviews and practical guides.",
      "Portraits, galleries and visual stories.",
      "Connect with pet lovers, places and local events.",
      "Take part in PETS & DOGUE competitions.",
      "Rescue, adoption and help for animals in need.",
      "Selected brands, services and PETS & DOGUE partners."
    ]
  },
  "uk": {
    "menu": "Зміст",
    "signIn": "Увійти",
    "joinClub": "Вступити до клубу",
    "language": "Мова",
    "contact": "Зв’язатися з нами",
    "openMenu": "Відкрити меню",
    "closeMenu": "Закрити меню",
    "home": "Головна",
    "profile": "Профіль",
    "nav": [
      "Видання",
      "Зірки обкладинки",
      "Знижки",
      "Місця Pet-Friendly",
      "Маркетплейс",
      "Подорожі",
      "Мода",
      "Здоров’я",
      "Статті",
      "Фото",
      "Спільнота",
      "Конкурси",
      "Допомога тваринам",
      "Партнери"
    ],
    "desc": [
      "Відкрийте PETS & DOGUE Edition 01 — найновіше цифрове видання.",
      "Подайте свого улюбленця та змагайтеся за наступну обкладинку.",
      "Відкривайте знижки для учасників і спеціальні пропозиції.",
      "Знаходьте місця, дружні до тварин, з картами, маршрутами й контактами.",
      "Купуйте, продавайте та знаходьте товари й послуги для тварин.",
      "Подорожі з тваринами, маршрути, проживання та корисне планування.",
      "Стиль, аксесуари та мода для улюбленців.",
      "Здоров’я, грумінг і щоденний догляд.",
      "Редакційні історії, інтерв’ю та практичні поради.",
      "Портрети, галереї та візуальні історії.",
      "Спілкуйтеся з любителями тварин і знаходьте місцеві події.",
      "Беріть участь у конкурсах PETS & DOGUE.",
      "Порятунок, адопція та допомога тваринам.",
      "Відібрані бренди, послуги та партнери PETS & DOGUE."
    ]
  },
  "ru": {
    "menu": "Содержание",
    "signIn": "Войти",
    "joinClub": "Вступить в клуб",
    "language": "Язык",
    "contact": "Связаться с нами",
    "openMenu": "Открыть меню",
    "closeMenu": "Закрыть меню",
    "home": "Главная",
    "profile": "Профиль",
    "nav": [
      "Издание",
      "Звёзды обложки",
      "Скидки",
      "Pet-Friendly места",
      "Маркетплейс",
      "Путешествия",
      "Мода",
      "Здоровье",
      "Статьи",
      "Фото",
      "Сообщество",
      "Конкурсы",
      "Помощь животным",
      "Партнёры"
    ],
    "desc": [
      "Откройте PETS & DOGUE Edition 01 — наше актуальное цифровое издание.",
      "Заявите своего питомца и поборитесь за следующую обложку.",
      "Открывайте скидки для подписчиков и специальные предложения.",
      "Находите pet-friendly места с картами, маршрутами и контактами.",
      "Покупайте, продавайте и находите товары и услуги для питомцев.",
      "Путешествия с питомцами, маршруты, проживание и полезное планирование.",
      "Стиль, аксессуары и мода для питомцев.",
      "Здоровье, груминг и ежедневный уход.",
      "Редакционные истории, интервью и практические гиды.",
      "Портреты, галереи и визуальные истории.",
      "Общайтесь с любителями животных и находите местные события.",
      "Участвуйте в конкурсах PETS & DOGUE.",
      "Спасение, поиск дома и помощь животным.",
      "Отобранные бренды, услуги и партнёры PETS & DOGUE."
    ]
  },
  "fr": {
    "menu": "Sommaire",
    "signIn": "Connexion",
    "joinClub": "Rejoindre le Club",
    "language": "Langue",
    "contact": "Nous contacter",
    "openMenu": "Ouvrir le menu",
    "closeMenu": "Fermer le menu",
    "home": "Accueil",
    "profile": "Profil",
    "nav": [
      "Édition",
      "Stars de couverture",
      "Réductions",
      "Lieux Pet-Friendly",
      "Marketplace",
      "Voyage",
      "Mode",
      "Santé",
      "Articles",
      "Photos",
      "Communauté",
      "Concours",
      "Aide aux animaux",
      "Partenaires"
    ],
    "desc": [
      "Ouvrez PETS & DOGUE Edition 01, notre dernière édition numérique.",
      "Inscrivez votre animal pour tenter la prochaine couverture.",
      "Découvrez les réductions membres et les offres spéciales.",
      "Trouvez des lieux pet-friendly avec cartes, itinéraires et contacts.",
      "Achetez, vendez et découvrez des produits et services pour animaux.",
      "Voyages avec animaux, itinéraires, hébergements et conseils pratiques.",
      "Style, accessoires et mode pour animaux.",
      "Santé, toilettage et soins quotidiens.",
      "Histoires, interviews et guides pratiques.",
      "Portraits, galeries et histoires visuelles.",
      "Rejoignez les amoureux des animaux et les événements locaux.",
      "Participez aux concours PETS & DOGUE.",
      "Sauvetage, adoption et aide aux animaux.",
      "Marques, services et partenaires PETS & DOGUE sélectionnés."
    ]
  },
  "de": {
    "menu": "Inhalt",
    "signIn": "Anmelden",
    "joinClub": "Club beitreten",
    "language": "Sprache",
    "contact": "Kontakt",
    "openMenu": "Menü öffnen",
    "closeMenu": "Menü schließen",
    "home": "Startseite",
    "profile": "Profil",
    "nav": [
      "Ausgabe",
      "Cover Stars",
      "Rabatte",
      "Tierfreundliche Orte",
      "Marktplatz",
      "Reisen",
      "Mode",
      "Gesundheit",
      "Artikel",
      "Fotos",
      "Community",
      "Wettbewerbe",
      "Hilfe für Tiere",
      "Partner"
    ],
    "desc": [
      "Öffnen Sie PETS & DOGUE Edition 01, die aktuelle digitale Ausgabe.",
      "Melden Sie Ihr Tier für das nächste Cover an.",
      "Entdecken Sie Mitgliederrabatte und Sonderangebote.",
      "Finden Sie tierfreundliche Orte mit Karten, Routen und Kontakten.",
      "Kaufen, verkaufen und entdecken Sie Produkte und Services für Tiere.",
      "Tierfreundliche Reisen, Routen, Unterkünfte und praktische Planung.",
      "Stil, Accessoires und Tiermode.",
      "Gesundheit, Pflege und tägliche Betreuung.",
      "Editorials, Interviews und praktische Ratgeber.",
      "Porträts, Galerien und visuelle Geschichten.",
      "Vernetzen Sie sich mit Tierfreunden und lokalen Events.",
      "Nehmen Sie an PETS & DOGUE Wettbewerben teil.",
      "Rettung, Adoption und Hilfe für Tiere.",
      "Ausgewählte Marken, Services und PETS & DOGUE Partner."
    ]
  },
  "es": {
    "menu": "Contenido",
    "signIn": "Iniciar sesión",
    "joinClub": "Únete al Club",
    "language": "Idioma",
    "contact": "Contáctanos",
    "openMenu": "Abrir menú",
    "closeMenu": "Cerrar menú",
    "home": "Inicio",
    "profile": "Perfil",
    "nav": [
      "Edición",
      "Estrellas de portada",
      "Descuentos",
      "Lugares Pet-Friendly",
      "Marketplace",
      "Viajes",
      "Moda",
      "Salud",
      "Artículos",
      "Fotos",
      "Comunidad",
      "Concursos",
      "Ayuda a animales",
      "Socios"
    ],
    "desc": [
      "Abre PETS & DOGUE Edition 01, la edición digital más reciente.",
      "Inscribe a tu mascota y compite por la próxima portada.",
      "Descubre descuentos para miembros y ofertas especiales.",
      "Encuentra lugares pet-friendly con mapas, rutas y contactos.",
      "Compra, vende y descubre productos y servicios para mascotas.",
      "Viajes con mascotas, rutas, alojamientos y planificación útil.",
      "Estilo, accesorios y moda para mascotas.",
      "Salud, peluquería y cuidados diarios.",
      "Historias, entrevistas y guías prácticas.",
      "Retratos, galerías e historias visuales.",
      "Conecta con amantes de los animales y eventos locales.",
      "Participa en concursos PETS & DOGUE.",
      "Rescate, adopción y ayuda para animales.",
      "Marcas, servicios y socios PETS & DOGUE seleccionados."
    ]
  },
  "it": {
    "menu": "Contenuti",
    "signIn": "Accedi",
    "joinClub": "Unisciti al Club",
    "language": "Lingua",
    "contact": "Contattaci",
    "openMenu": "Apri menu",
    "closeMenu": "Chiudi menu",
    "home": "Home",
    "profile": "Profilo",
    "nav": [
      "Edizione",
      "Cover Stars",
      "Sconti",
      "Luoghi Pet-Friendly",
      "Marketplace",
      "Viaggi",
      "Moda",
      "Salute",
      "Articoli",
      "Foto",
      "Community",
      "Concorsi",
      "Aiuto agli animali",
      "Partner"
    ],
    "desc": [
      "Apri PETS & DOGUE Edition 01, l’ultima edizione digitale.",
      "Iscrivi il tuo animale e concorri per la prossima copertina.",
      "Scopri sconti per i membri e offerte speciali.",
      "Trova luoghi pet-friendly con mappe, percorsi e contatti.",
      "Compra, vendi e scopri prodotti e servizi per animali.",
      "Viaggi con animali, percorsi, soggiorni e pianificazione utile.",
      "Stile, accessori e moda per animali.",
      "Salute, toelettatura e cura quotidiana.",
      "Storie, interviste e guide pratiche.",
      "Ritratti, gallerie e storie visive.",
      "Connettiti con chi ama gli animali e con gli eventi locali.",
      "Partecipa ai concorsi PETS & DOGUE.",
      "Salvataggio, adozione e aiuto agli animali.",
      "Brand, servizi e partner PETS & DOGUE selezionati."
    ]
  },
  "pt": {     "signIn": "Entrar",
    "joinClub": "Entrar no Club",
    "language": "Idioma",
    "contact": "Contacte-nos",
    "openMenu": "Abrir menu",
    "closeMenu": "Fechar menu",
    "home": "Início",
    "profile": "Perfil",
    "nav": [
      "Edição",
      "Estrelas da capa",
      "Descontos",
      "Locais Pet-Friendly",
      "Marketplace",
      "Viagens",
      "Moda",
      "Saúde",
      "Artigos",
      "Fotos",
      "Comunidade",
      "Concursos",
      "Ajuda aos animais",
      "Parceiros"
    ],
    "desc": [
      "Abra a PETS & DOGUE Edition 01, a edição digital mais recente.",
      "Inscreva o seu animal e concorra à próxima capa.",
      "Descubra descontos para membros e ofertas especiais.",
      "Encontre locais pet-friendly com mapas, rotas e contactos.",
      "Compre, venda e descubra produtos e serviços para animais.",
      "Viagens com animais, rotas, alojamentos e planeamento útil.",
      "Estilo, acessórios e moda para animais.",
      "Saúde, grooming e cuidados diários.",
      "Histórias, entrevistas e guias práticos.",
      "Retratos, galerias e histórias visuais.",
      "Ligue-se a amantes de animais e eventos locais.",
      "Participe nos concursos PETS & DOGUE.",
      "Resgate, adoção e ajuda aos animais.",
      "Marcas, serviços e parceiros PETS & DOGUE selecionados."
    ]
  },
  "nl": {
    "menu": "Inhoud",
    "signIn": "Inloggen",
    "joinClub": "Word lid",
    "language": "Taal",
    "contact": "Contact",
    "openMenu": "Menu openen",
    "closeMenu": "Menu sluiten",
    "home": "Home",
    "profile": "Profiel",
    "nav": [
      "Editie",
      "Coversterren",
      "Kortingen",
      "Huisdiervriendelijke plekken",
      "Marktplaats",
      "Reizen",
      "Mode",
      "Gezondheid",
      "Artikelen",
      "Foto's",
      "Community",
      "Wedstrijden",
      "Hulp voor dieren",
      "Partners"
    ],
    "desc": [
      "Open PETS & DOGUE Edition 01, de nieuwste digitale editie.",
      "Meld je huisdier aan voor de volgende cover.",
      "Ontdek ledenkortingen en speciale aanbiedingen.",
      "Vind huisdiervriendelijke plekken met kaarten, routes en contacten.",
      "Koop, verkoop en ontdek producten en diensten voor huisdieren.",
      "Reizen met huisdieren, routes, verblijven en handige reisplanning.",
      "Stijl, accessoires en mode voor huisdieren.",
      "Gezondheid, verzorging en dagelijkse zorg.",
      "Verhalen, interviews en praktische gidsen.",
      "Portretten, galerijen en visuele verhalen.",
      "Kom in contact met dierenliefhebbers en lokale evenementen.",
      "Doe mee aan PETS & DOGUE wedstrijden.",
      "Redding, adoptie en hulp voor dieren.",
      "Geselecteerde merken, diensten en PETS & DOGUE partners."
    ]
  },
  "pl": {
    "menu": "Spis treści",
    "signIn": "Zaloguj się",
    "joinClub": "Dołącz do klubu",
    "language": "Język",
    "contact": "Kontakt",
    "openMenu": "Otwórz menu",
    "closeMenu": "Zamknij menu",
    "home": "Strona główna",
    "profile": "Profil",
    "nav": [
      "Wydanie",
      "Gwiazdy okładki",
      "Zniżki",
      "Miejsca Pet-Friendly",
      "Marketplace",
      "Podróże",
      "Moda",
      "Zdrowie",
      "Artykuły",
      "Zdjęcia",
      "Społeczność",
      "Konkursy",
      "Pomoc zwierzętom",
      "Partnerzy"
    ],
    "desc": [
      "Otwórz PETS & DOGUE Edition 01, najnowsze wydanie cyfrowe.",
      "Zgłoś pupila i zawalcz o następną okładkę.",
      "Odkrywaj zniżki członkowskie i oferty specjalne.",
      "Znajduj miejsca pet-friendly z mapami, trasami i kontaktami.",
      "Kupuj, sprzedawaj i odkrywaj produkty oraz usługi dla zwierząt.",
      "Podróże ze zwierzętami, trasy, noclegi i przydatne planowanie.",
      "Styl, akcesoria i moda dla zwierząt.",
      "Zdrowie, pielęgnacja i codzienna opieka.",
      "Historie, wywiady i praktyczne poradniki.",
      "Portrety, galerie i historie wizualne.",
      "Poznawaj miłośników zwierząt i lokalne wydarzenia.",
      "Bierz udział w konkursach PETS & DOGUE.",
      "Ratowanie, adopcja i pomoc zwierzętom.",
      "Wybrane marki, usługi i partnerzy PETS & DOGUE."
    ]
  },
  "cs": {
    "menu": "Obsah",
    "signIn": "Přihlásit se",
    "joinClub": "Vstoupit do klubu",
    "language": "Jazyk",
    "contact": "Kontaktujte nás",
    "openMenu": "Otevřít menu",
    "closeMenu": "Zavřít menu",
    "home": "Domů",
    "profile": "Profil",
    "nav": [
      "Vydání",
      "Hvězdy obálky",
      "Slevy",
      "Pet-Friendly místa",
      "Marketplace",
      "Cestování",
      "Móda",
      "Zdraví",
      "Články",
      "Fotografie",
      "Komunita",
      "Soutěže",
      "Pomoc zvířatům",
      "Partneři"
    ],
    "desc": [
      "Otevřete PETS & DOGUE Edition 01, nejnovější digitální vydání.",
      "Přihlaste svého mazlíčka na příští obálku.",
      "Objevte členské slevy a speciální nabídky.",
      "Najděte pet-friendly místa s mapami, trasami a kontakty.",
      "Nakupujte, prodávejte a objevujte produkty a služby pro zvířata.",
      "Cestování se zvířaty, trasy, ubytování a užitečné plánování.",
      "Styl, doplňky a móda pro zvířata.",
      "Zdraví, péče a každodenní starostlivost.",
      "Příběhy, rozhovory a praktické průvodce.",
      "Portréty, galerie a vizuální příběhy.",
      "Spojte se s milovníky zvířat a místními akcemi.",
      "Zapojte se do soutěží PETS & DOGUE.",
      "Záchrana, adopce a pomoc zvířatům.",
      "Vybrané značky, služby a partneři PETS & DOGUE."
    ]
  },
  "sk": {
    "menu": "Obsah",
    "signIn": "Prihlásiť sa",
    "joinClub": "Vstúpiť do klubu",
    "language": "Jazyk",
    "contact": "Kontaktujte nás",
    "openMenu": "Otvoriť menu",
    "closeMenu": "Zavrieť menu",
    "home": "Domov",
    "profile": "Profil",
    "nav": [
      "Vydanie",
      "Hviezdy obálky",
      "Zľavy",
      "Pet-Friendly miesta",
      "Marketplace",
      "Cestovanie",
      "Móda",
      "Zdravie",
      "Články",
      "Fotografie",
      "Komunita",
      "Súťaže",
      "Pomoc zvieratám",
      "Partneri"
    ],
    "desc": [
      "Otvorte PETS & DOGUE Edition 01, najnovšie digitálne vydanie.",
      "Prihláste svojho miláčika na ďalšiu obálku.",
      "Objavte členské zľavy a špeciálne ponuky.",
      "Nájdite pet-friendly miesta s mapami, trasami a kontaktmi.",
      "Nakupujte, predávajte a objavujte produkty a služby pre zvieratá.",
      "Cestovanie so zvieratami, trasy, ubytovanie a užitočné plánovanie.",
      "Štýl, doplnky a móda pre zvieratá.",
      "Zdravie, starostlivosť a každodenná péče.",
      "Príbehy, rozhovory a praktickí sprievodcovia.",
      "Portréty, galérie a vizuálne príbehy.",
      "Spojte sa s milovníkmi zvierat a miestnymi podujatiami.",
      "Zapojte sa do súťaží PETS & DOGUE.",
      "Záchrana, adopcia a pomoc zvieratám.",
      "Vybrané značky, služby a partneri PETS & DOGUE."
    ]
  },
  "hu": {
    "menu": "Tartalom",
    "signIn": "Belépés",
    "joinClub": "Csatlakozás",
    "language": "Nyelv",
    "contact": "Kapcsolat",
    "openMenu": "Menü megnyitása",
    "closeMenu": "Menü bezárása",
    "home": "Kezdőlap",
    "profile": "Profil",
    "nav": [
      "Kiadás",
      "Címlapsztárok",
      "Kedvezmények",
      "Állatbarát helyek",
      "Piactér",
      "Utazás",
      "Divat",
      "Egészség",
      "Cikkek",
      "Fotók",
      "Közösség",
      "Versenyek",
      "Állatsegítés",
      "Partnerek"
    ],
    "desc": [
      "Nyissa meg a PETS & DOGUE Edition 01 legújabb digitális kiadását.",
      "Nevezze kedvencét a következő címlapra.",
      "Fedezze fel a tagi kedvezményeket és különleges ajánlatokat.",
      "Találjon állatbarát helyeket térképekkel, útvonalakkal és elérhetőségekkel.",
      "Vásároljon, adjon el és fedezzen fel kisállat-termékeket és szolgáltatásokat.",
      "Kisállatbarát utazás, útvonalak, szállások és hasznos tervezés.",
      "Stílus, kiegészítők és kisállatdivat.",
      "Egészség, ápolás és mindennapi gondozás.",
      "Történetek, interjúk és gyakorlati útmutatók.",
      "Portrék, galériák és vizuális történetek.",
      "Kapcsolódjon állatbarátokhoz és helyi eseményekhez.",
      "Vegyen részt PETS & DOGUE versenyeken.",
      "Mentés, örökbefogadás és segítség az állatoknak.",
      "Válogatott márkák, szolgáltatások és PETS & DOGUE partnerek."
    ]
  },
  "ro": {
    "menu": "Conținut",
    "signIn": "Autentificare",
    "joinClub": "Intră în Club",
    "language": "Limbă",
    "contact": "Contactați-ne",
    "openMenu": "Deschide meniul",
    "closeMenu": "Închide meniul",
    "home": "Acasă",
    "profile": "Profil",
    "nav": [
      "Ediție",
      "Vedete de copertă",
      "Reduceri",
      "Locuri Pet-Friendly",
      "Marketplace",
      "Călătorii",
      "Modă",
      "Sănătate",
      "Articole",
      "Fotografii",
      "Comunitate",
      "Concursuri",
      "Ajutor pentru animale",
      "Parteneri"
    ],
    "desc": [
      "Deschide PETS & DOGUE Edition 01, cea mai nouă ediție digitală.",
      "Înscrie animalul pentru următoarea copertă.",
      "Descoperă reduceri pentru membri și oferte speciale.",
      "Găsește locuri pet-friendly cu hărți, rute și contacte.",
      "Cumpără, vinde și descoperă produse și servicii pentru animale.",
      "Călătorii cu animale, rute, cazare și planificare utilă.",
      "Stil, accesorii și modă pentru animale.",
      "Sănătate, grooming și îngrijire zilnică.",
      "Povești, interviuri și ghiduri practice.",
      "Portrete, galerii și povești vizuale.",
      "Conectează-te cu iubitori de animale și evenimente locale.",
      "Participă la concursurile PETS & DOGUE.",
      "Salvare, adopție și ajutor pentru animale.",
      "Branduri, servicii și parteneri PETS & DOGUE selectați."
    ]
  },
  "bg": {
    "menu": "Съдържание",
    "signIn": "Вход",
    "joinClub": "Влезте в клуба",
    "language": "Език",
    "contact": "Свържете се с нас",
    "openMenu": "Отвори менюто",
    "closeMenu": "Затвори менюто",
    "home": "Начало",
    "profile": "Профил",
    "nav": [
      "Издание",
      "Звезди на корицата",
      "Отстъпки",
      "Pet-Friendly места",
      "Маркетплейс",
      "Пътуване",
      "Мода",
      "Здраве",
      "Статии",
      "Снимки",
      "Общност",
      "Конкурси",
      "Помощ за животни",
      "Партньори"
    ],
    "desc": [
      "Отворете PETS & DOGUE Edition 01, най-новото дигитално издание.",
      "Запишете любимеца си за следващата корица.",
      "Открийте отстъпки за членове и специални предложения.",
      "Намерете pet-friendly места с карти, маршрути и контакти.",
      "Купувайте, продавайте и откривайте продукти и услуги за животни.",
      "Пътувания с домашни любимци, маршрути, места за престой и полезно планиране.",
      "Стил, аксесоари и мода за животни.",
      "Здраве, груминг и ежедневна грижа.",
      "Истории, интервюта и практични ръководства.",
      "Портрети, галерии и визуални истории.",
      "Свържете се с любители на животни и местни събития.",
      "Участвайте в конкурсите на PETS & DOGUE.",
      "Спасяване, осиновяване и помощ за животни.",
      "Подбрани марки, услуги и партньори на PETS & DOGUE."
    ]
  },
  "el": {
    "menu": "Περιεχόμενα",
    "signIn": "Σύνδεση",
    "joinClub": "Εγγραφή στο Club",
    "language": "Γλώσσα",
    "contact": "Επικοινωνία",
    "openMenu": "Άνοιγμα μενού",
    "closeMenu": "Κλείσιμο μενού",
    "home": "Αρχική",
    "profile": "Προφίλ",
    "nav": [
      "Έκδοση",
      "Αστέρια εξωφύλλου",
      "Εκπτώσεις",
      "Pet-Friendly μέρη",
      "Marketplace",
      "Ταξίδια",
      "Μόδα",
      "Υγεία",
      "Άρθρα",
      "Φωτογραφίες",
      "Κοινότητα",
      "Διαγωνισμοί",
      "Βοήθεια ζώων",
      "Συνεργάτες"
    ],
    "desc": [
      "Ανοίξτε το PETS & DOGUE Edition 01, την πιο πρόσφατη ψηφιακή έκδοση.",
      "Δηλώστε το κατοικίδιό σας για το επόμενο εξώφυλλο.",
      "Ανακαλύψτε εκπτώσεις μελών και ειδικές προσφορές.",
      "Βρείτε pet-friendly μέρη με χάρτες, διαδρομές και επαφές.",
      "Αγοράστε, πουλήστε και ανακαλύψτε προϊόντα και υπηρεσίες για κατοικίδια.",
      "Ταξίδια με κατοικίδια, διαδρομές, διαμονή και χρήσιμος σχεδιασμός.",
      "Στυλ, αξεσουάρ και μόδα για κατοικίδια.",
      "Υγεία, περιποίηση και καθημερινή φροντίδα.",
      "Ιστορίες, συνεντεύξεις και πρακτικοί οδηγοί.",
      "Πορτρέτα, γκαλερί και οπτικές ιστορίες.",
      "Συνδεθείτε με φίλους των ζώων και τοπικές εκδηλώσεις.",
      "Λάβετε μέρος στους διαγωνισμούς PETS & DOGUE.",
      "Διάσωση, υιοθεσία και βοήθεια για ζώα.",
      "Επιλεγμένες μάρκες, υπηρεσίες και συνεργάτες PETS & DOGUE."
    ]
  },
  "sv": {
    "menu": "Innehåll",
    "signIn": "Logga in",
    "joinClub": "Gå med i klubben",
    "language": "Språk",
    "contact": "Kontakta oss",
    "openMenu": "Öppna meny",
    "closeMenu": "Stäng meny",
    "home": "Hem",
    "profile": "Profil",
    "nav": [
      "Utgåva",
      "Omslagsstjärnor",
      "Rabatter",
      "Djurvänliga platser",
      "Marknadsplats",
      "Resor",
      "Mode",
      "Hälsa",
      "Artiklar",
      "Foton",
      "Community",
      "Tävlingar",
      "Hjälp för djur",
      "Partners"
    ],
    "desc": [
      "Öppna PETS & DOGUE Edition 01, den senaste digitala utgåvan.",
      "Anmäl ditt husdjur till nästa omslag.",
      "Upptäck medlemsrabatter och specialerbjudanden.",
      "Hitta djurvänliga platser med kartor, rutter och kontakter.",
      "Köp, sälj och upptäck produkter och tjänster för husdjur.",
      "Resor med husdjur, rutter, boenden och praktisk planering.",
      "Stil, accessoarer och husdjursmode.",
      "Hälsa, pälsvård och daglig omsorg.",
      "Berättelser, intervjuer och praktiska guider.",
      "Porträtt, gallerier och visuella berättelser.",
      "Träffa djurvänner och hitta lokala evenemang.",
      "Delta i PETS & DOGUE-tävlingar.",
      "Räddning, adoption och hjälp för djur.",
      "Utvalda varumärken, tjänster och PETS & DOGUE-partners."
    ]
  },
  "da": {
    "menu": "Indhold",
    "signIn": "Log ind",
    "joinClub": "Bliv medlem",
    "language": "Sprog",
    "contact": "Kontakt os",
    "openMenu": "Åbn menu",
    "closeMenu": "Luk menu",
    "home": "Hjem",
    "profile": "Profil",
    "nav": [
      "Udgave",
      "Forsidestjerner",
      "Rabatter",
      "Kæledyrsvenlige steder",
      "Markedsplads",
      "Rejser",
      "Mode",
      "Sundhed",
      "Artikler",
      "Fotos",
      "Fællesskab",
      "Konkurrencer",
      "Hjælp til dyr",
      "Partnere"
    ],
    "desc": [
      "Åbn PETS & DOGUE Edition 01, den nyeste digitale udgave.",
      "Tilmeld dit kæledyr til den næste forside.",
      "Opdag medlemsrabatter og særlige tilbud.",
      "Find kæledyrsvenlige steder med kort, ruter og kontakter.",
      "Køb, sælg og opdag produkter og tjenester til kæledyr.",
      "Rejser med kæledyr, ruter, ophold og praktisk planlægning.",
      "Stil, tilbehør og mode til kæledyr.",
      "Sundhed, pleje og daglig omsorg.",
      "Historier, interviews og praktiske guider.",
      "Portrætter, gallerier og visuelle historier.",
      "Mød dyrevenner og find lokale arrangementer.",
      "Deltag i PETS & DOGUE-konkurrencer.",
      "Redning, adoption og hjælp til dyr.",
      "Udvalgte brands, tjenester og PETS & DOGUE-partnere."
    ]
  },
  "no": {
    "menu": "Innhold",
    "signIn": "Logg inn",
    "joinClub": "Bli med i klubben",
    "language": "Språk",
    "contact": "Kontakt oss",
    "openMenu": "Åpne meny",
    "closeMenu": "Lukk meny",
    "home": "Hjem",
    "profile": "Profil",
    "nav": [
      "Utgave",
      "Forsidestjerner",
      "Rabatter",
      "Dyrevennlige steder",
      "Markedsplass",
      "Reiser",
      "Mote",
      "Helse",
      "Artikler",
      "Bilder",
      "Fellesskap",
      "Konkurranser",
      "Hjelp til dyr",
      "Partnere"
    ],
    "desc": [
      "Åpne PETS & DOGUE Edition 01, den nyeste digitale utgaven.",
      "Meld på kjæledyret ditt til neste forside.",      "Oppdag medlemsrabatter og spesialtilbud.",
      "Finn dyrevennlige steder med kart, ruter og kontakter.",
      "Kjøp, selg og oppdag produkter og tjenester for kjæledyr.",
      "Reiser med kjæledyr, ruter, opphold og nyttig planlegging.",
      "Stil, tilbehør og kjæledyrsmote.",
      "Helse, stell og daglig omsorg.",
      "Historier, intervjuer og praktiske guider.",
      "Portretter, gallerier og visuelle historier.",
      "Møt dyrevenner og finn lokale arrangementer.",
      "Delta i PETS & DOGUE-konkurranser.",
      "Redning, adopsjon og hjelp til dyr.",
      "Utvalgte merkevarer, tjenester og PETS & DOGUE-partnere."
    ]
  },
  "fi": {
    "menu": "Sisältö",
    "signIn": "Kirjaudu",
    "joinClub": "Liity klubiin",
    "language": "Kieli",
    "contact": "Ota yhteyttä",
    "openMenu": "Avaa valikko",
    "closeMenu": "Sulje valikko",
    "home": "Etusivu",
    "profile": "Profiili",
    "nav": [
      "Numero",
      "Kansitähdet",
      "Alennukset",
      "Lemmikkiystävälliset paikat",
      "Markkinapaikka",
      "Matkailu",
      "Muoti",
      "Terveys",
      "Artikkelit",
      "Kuvat",
      "Yhteisö",
      "Kilpailut",
      "Apua eläimille",
      "Kumppanit"
    ],
    "desc": [
      "Avaa PETS & DOGUE Edition 01, uusin digitaalinen numero.",
      "Ilmoita lemmikkisi seuraavan kannen kilpailuun.",
      "Tutustu jäsenalennuksiin ja erikoistarjouksiin.",
      "Löydä lemmikkiystävällisiä paikkoja karttoineen, reitteineen ja yhteystietoineen.",
      "Osta, myy ja löydä lemmikkituotteita ja palveluita.",
      "Lemmikkiystävällinen matkailu, reitit, majoitukset ja hyödyllinen suunnittelu.",
      "Tyyliä, asusteita ja lemmikkimuotia.",
      "Terveys, trimmaus ja päivittäinen hoito.",
      "Tarinoita, haastatteluja ja käytännön oppaita.",
      "Muotokuvia, gallerioita ja visuaalisia tarinoita.",
      "Tapaa eläinystäviä ja löydä paikallisia tapahtumia.",
      "Osallistu PETS & DOGUE -kilpailuihin.",
      "Pelastus, adoptio ja apu eläimille.",
      "Valitut brändit, palvelut ja PETS & DOGUE -kumppanit."
    ]
  },
  "tr": {
    "menu": "İçindekiler",
    "signIn": "Giriş yap",
    "joinClub": "Kulübe katıl",
    "language": "Dil",
    "contact": "Bize ulaşın",
    "openMenu": "Menüyü aç",
    "closeMenu": "Menüyü kapat",
    "home": "Ana sayfa",
    "profile": "Profil",
    "nav": [
      "Sürüm",
      "Kapak yıldızları",
      "İndirimler",
      "Pet-Friendly yerler",
      "Pazar yeri",
      "Seyahat",
      "Moda",
      "Sağlık",
      "Makaleler",
      "Fotoğraflar",
      "Topluluk",
      "Yarışmalar",
      "Hayvanlara yardım",
      "Ortaklar"
    ],
    "desc": [
      "En yeni dijital sayı olan PETS & DOGUE Edition 01’i açın.",
      "Evcil hayvanınızı bir sonraki kapak için aday gösterin.",
      "Üye indirimlerini ve özel teklifleri keşfedin.",
      "Haritalar, rotalar ve iletişim bilgileriyle pet-friendly yerler bulun.",
      "Evcil hayvan ürünleri ve hizmetleri alın, satın ve keşfedin.",
      "Evcil hayvanlarla seyahat, rotalar, konaklama ve yararlı planlama.",
      "Stil, aksesuarlar ve evcil hayvan modası.",
      "Sağlık, bakım ve günlük bakım.",
      "Hikâyeler, röportajlar ve pratik rehberler.",
      "Portreler, galeriler ve görsel hikâyeler.",
      "Hayvanseverlerle bağlantı kurun ve yerel etkinlikleri bulun.",
      "PETS & DOGUE yarışmalarına katılın.",
      "Kurtarma, sahiplendirme ve hayvanlara yardım.",
      "Seçilmiş markalar, hizmetler ve PETS & DOGUE ortakları."
    ]
  },
  "ar": {
    "menu": "المحتويات",
    "signIn": "تسجيل الدخول",
    "joinClub": "انضم إلى النادي",
    "language": "اللغة",
    "contact": "اتصل بنا",
    "openMenu": "فتح القائمة",
    "closeMenu": "إغلاق القائمة",
    "home": "الرئيسية",
    "profile": "الملف الشخصي",
    "nav": [
      "الإصدار",
      "نجوم الغلاف",
      "الخصومات",
      "أماكن صديقة للحيوانات",
      "السوق",
      "السفر",
      "الموضة",
      "الصحة",
      "المقالات",
      "الصور",
      "المجتمع",
      "المسابقات",
      "مساعدة الحيوانات",
      "الشركاء"
    ],
    "desc": [
      "افتح PETS & DOGUE Edition 01، أحدث إصدار رقمي.",
      "رشّح حيوانك الأليف للظهور على الغلاف القادم.",
      "اكتشف خصومات الأعضاء والعروض الخاصة.",
      "اعثر على أماكن صديقة للحيوانات مع الخرائط والمسارات وبيانات الاتصال.",
      "اشترِ وبِع واكتشف منتجات وخدمات الحيوانات الأليفة.",
      "السفر مع الحيوانات الأليفة والمسارات والإقامة والتخطيط المفيد.",
      "الأناقة والإكسسوارات وموضة الحيوانات الأليفة.",
      "الصحة والعناية اليومية والتجميل.",
      "قصص ومقابلات وأدلة عملية.",
      "صور شخصية ومعارض وقصص بصرية.",
      "تواصل مع محبي الحيوانات واكتشف الفعاليات المحلية.",
      "شارك في مسابقات PETS & DOGUE.",
      "الإنقاذ والتبنّي ومساعدة الحيوانات المحتاجة.",
      "علامات تجارية وخدمات وشركاء مختارون من PETS & DOGUE."
    ]
  },
  "hi": {
    "menu": "विषय-सूची",
    "signIn": "लॉग इन",
    "joinClub": "क्लब से जुड़ें",
    "language": "भाषा",
    "contact": "संपर्क करें",
    "openMenu": "मेनू खोलें",
    "closeMenu": "मेनू बंद करें",
    "home": "होम",
    "profile": "प्रोफ़ाइल",
    "nav": [
      "एडिशन",
      "कवर स्टार्स",
      "छूट",
      "Pet-Friendly स्थान",
      "मार्केटप्लेस",
      "यात्रा",
      "फैशन",
      "स्वास्थ्य",
      "लेख",
      "फ़ोटो",
      "समुदाय",
      "प्रतियोगिताएँ",
      "ज़रूरतमंद पशु",
      "पार्टनर्स"
    ],
    "desc": [
      "PETS & DOGUE Edition 01 खोलें — नवीनतम डिजिटल संस्करण।",
      "अपने पालतू को अगली कवर प्रतियोगिता में शामिल करें।",
      "सदस्य छूट और विशेष ऑफ़र खोजें।",
      "मैप, रूट और संपर्क जानकारी के साथ pet-friendly स्थान खोजें।",
      "पालतू उत्पाद और सेवाएँ खरीदें, बेचें और खोजें।",
      "पालतू जानवरों के साथ यात्रा, मार्ग, ठहरने की जगहें और उपयोगी योजना।",
      "स्टाइल, एक्सेसरीज़ और पालतू फैशन।",
      "स्वास्थ्य, ग्रूमिंग और रोज़मर्रा की देखभाल।",
      "कहानियाँ, इंटरव्यू और उपयोगी गाइड।",
      "पोर्ट्रेट, गैलरी और विज़ुअल स्टोरीज़।",
      "पालतू प्रेमियों से जुड़ें और स्थानीय कार्यक्रम खोजें।",
      "PETS & DOGUE प्रतियोगिताओं में भाग लें।",
      "रेस्क्यू, गोद लेना और ज़रूरतमंद पशुओं की मदद।",
      "चुने हुए ब्रांड, सेवाएँ और PETS & DOGUE पार्टनर्स।"
    ]
  }
};

let shellLanguage="en";
let activeKey="";
let legacyObserver=null;
let internalLanguageChange=false;

function normalizeLanguage(value){
  const raw=String(value||"")
    .trim()
    .toLowerCase()
    .replace("_","-");

  if(!raw){
    return"";
  }

  const base=raw.split("-")[0];

  return LANGUAGE_ALIASES[base]||base;
}

function supportedLanguage(value){
  return Object.prototype.hasOwnProperty.call(
    TEXT,
    normalizeLanguage(value)
  );
}

function currentFile(){
  const path=window.location.pathname||"";
  const file=path.split("/").filter(Boolean).pop()||"index.html";
  return file.toLowerCase();
}

function detectActiveKey(){
  const file=currentFile();

  if(PAGE_KEYS[file]){
    return PAGE_KEYS[file];
  }

  const path=(window.location.pathname||"").toLowerCase();

  for(const [name,key] of Object.entries(PAGE_KEYS)){
    const short=name.replace(".html","");
    if(path.includes(short)){
      return key;
    }
  }

  return"";
}

function findExistingLanguageSelect(){
  const selectors=[
    "#pdLanguageSelect",
    "#headerLanguageSelect",
    "#languageSelect",
    "#language",
    "#langSelect",
    "select[data-language-select]",
    "select[name='language']",
    "select[name='lang']"
  ];

  for(const selector of selectors){
    const select=document.querySelector(selector);

    if(
      select &&
      select.id!=="pdGlobalLanguage"
    ){
      return select;
    }
  }

  return null;
}

function detectInitialLanguage(){
  const stored=normalizeLanguage(
    localStorage.getItem(LANGUAGE_KEY)||""
  );

  if(stored&&supportedLanguage(stored)){
    return stored;
  }

  const existing=findExistingLanguageSelect();
  const fromSelect=existing
    ?normalizeLanguage(existing.value)
    :"";

  if(fromSelect&&supportedLanguage(fromSelect)){
    return fromSelect;
  }

  const htmlLang=normalizeLanguage(
    document.documentElement.lang||""
  );

  if(htmlLang&&supportedLanguage(htmlLang)){
    return htmlLang;
  }

  return"en";
}

function persistLanguage(language){
  const code=normalizeLanguage(language);

  if(!supportedLanguage(code)){
    return;
  }

  shellLanguage=code;

  try{
    localStorage.setItem(
      LANGUAGE_KEY,
      code
    );
  }catch(error){
    console.warn(
      "PETS & DOGUE language storage:",
      error
    );
  }

  document.documentElement.lang=code;
  document.documentElement.dir=
    code==="ar"
      ?"rtl"
      :"ltr";
}

function escapeHTML(value){
  return String(value??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function shellCopy(){
  return TEXT[shellLanguage]||TEXT.en;
}

function navName(item){
  const copy=shellCopy();
  const index=NAV_INDEX[item.key];
  return copy.nav[index]||TEXT.en.nav[index]||item.key;
}

function navDescription(item){
  const copy=shellCopy();
  const index=NAV_INDEX[item.key];
  return copy.desc[index]||TEXT.en.desc[index]||"";
}

function installStyles(){
  const previous=document.getElementById(
    "pdGlobalShellStyles"
  );

  if(previous){
    previous.remove();
  }

  const style=document.createElement("style");
  style.id="pdGlobalShellStyles";

  style.textContent=`
  :root{
    --pd-shell-black:#070707;
    --pd-shell-cream:#f7f4ed;
    --pd-shell-gold:#c99729;
    --pd-shell-gold-light:#efd47a;
    --pd-shell-green:#65e51f;
    --pd-shell-serif:Georgia,"Times New Roman",serif;
    --pd-shell-sans:Arial,Helvetica,sans-serif;
  }

  .pd-global-old-shell-hidden{
    display:none!important;
  }

  body.pd-global-menu-open{
    overflow:hidden!important;
  }

  #pdGlobalHeader{
    position:sticky;
    top:0;
    z-index:14000;
    width:100%;
    height:68px;
    background:var(--pd-shell-black);
    color:#fff;
    border-bottom:1px solid #262626;
    font-family:var(--pd-shell-sans);
  }

  #pdGlobalHeaderMain{
    width:100%;
    height:68px;
    display:grid;
    grid-template-columns:52px minmax(0,1fr) auto;
    align-items:center;
    padding:0 8px;
    margin:0 auto;
  }

  #pdGlobalMenuButton{
    width:42px;
    height:42px;
    border:0;
    background:transparent;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:5px;
    padding:7px;
    cursor:pointer;
  }

  #pdGlobalMenuButton span{
    display:block;
    width:27px;
    height:2px;
    background:#fff;
    border-radius:20px;
  }

  #pdGlobalBrand{
    justify-self:center;
    min-width:0;
    text-align:center;
    font-family:var(--pd-shell-serif);
    color:var(--pd-shell-gold);
    line-height:.86;
    text-decoration:none;
    white-space:nowrap;
  }

  #pdGlobalBrandSmall{
    display:block;
    font-size:8px;
    font-weight:400;
    letter-spacing:3px;
    text-transform:uppercase;
  }

  #pdGlobalBrandBig{
    display:block;
    margin-top:5px;
    font-size:25px;
    font-weight:400;
    letter-spacing:2px;
  }

  #pdGlobalHeaderActions{
    position:relative;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    gap:6px;
  }

  #pdGlobalHome,
  #pdGlobalProfile{
    width:38px;
    height:38px;
    flex:0 0 38px;
    display:flex;
    align-items:center;
    justify-content:center;
    border:1px solid #3e3e3e;
    border-radius:12px;
    background:#111;
    color:#fff;
    text-decoration:none;
  }

  #pdGlobalProfile{
    padding:0;
    cursor:pointer;
  }

  #pdGlobalHome svg,
  #pdGlobalProfile svg{
    width:22px;
    height:22px;
    fill:none;
    stroke:currentColor;
    stroke-width:2;
    stroke-linecap:round;
    stroke-linejoin:round;
  }

  #pdGlobalProfile[aria-expanded="true"]{
    border-color:var(--pd-shell-green);
  }

  #pdGlobalProfileMenu{
    position:absolute;
    top:46px;
    right:0;
    z-index:14200;
    width:210px;
    padding:10px;
    border:1px solid #2f2f2f;    border-radius:16px;
    background:#0b0b0b;
    box-shadow:0 18px 42px rgba(0,0,0,.34);
    opacity:0;
    visibility:hidden;
    transform:translateY(-5px);
    transition:
      opacity .18s ease,
      transform .18s ease,
      visibility .18s ease;
  }

  #pdGlobalProfileMenu.open{
    opacity:1;
    visibility:visible;
    transform:translateY(0);
  }

  .pd-global-profile-title{
    padding:4px 4px 9px;
    color:#fff;
    font-size:11px;
    font-weight:900;
    letter-spacing:.9px;
    text-transform:uppercase;
  }

  .pd-global-profile-link{
    min-height:42px;
    display:flex;
    align-items:center;
    justify-content:center;
    border:1.5px solid #fff;
    border-radius:999px;
    background:#fff;
    color:#111;
    font-size:12px;
    font-weight:900;
    text-decoration:none;
  }

  .pd-global-profile-link + .pd-global-profile-link{
    margin-top:7px;
  }

  .pd-global-profile-link.club{
    border-color:var(--pd-shell-green);
    background:var(--pd-shell-green);
  }

  #pdGlobalOverlay{
    position:fixed;
    inset:0;
    z-index:15000;
    background:rgba(0,0,0,.68);
    backdrop-filter:blur(3px);
    -webkit-backdrop-filter:blur(3px);
    opacity:0;
    visibility:hidden;
    pointer-events:none;
    transition:
      opacity .22s ease,
      visibility .22s ease;
  }

  #pdGlobalOverlay.open{
    opacity:1;
    visibility:visible;
    pointer-events:auto;
  }

  #pdGlobalMenu{
    position:fixed;
    left:0;
    top:0;
    z-index:15100;
    width:min(78vw,390px);
    min-width:286px;
    max-width:390px;
    height:100dvh;
    background:var(--pd-shell-cream);
    color:#111;
    transform:translateX(-102%);
    transition:transform .24s ease;
    box-shadow:20px 0 55px rgba(0,0,0,.28);
    overflow:hidden;
    display:flex;
    flex-direction:column;
    font-family:var(--pd-shell-sans);
  }

  #pdGlobalMenu.open{
    transform:translateX(0);
  }

  html[dir="rtl"] #pdGlobalMenu{
    left:auto;
    right:0;
    transform:translateX(102%);
  }

  html[dir="rtl"] #pdGlobalMenu.open{
    transform:translateX(0);
  }

  html[dir="rtl"] #pdGlobalProfileMenu{
    right:auto;
    left:0;
  }

  .pd-global-menu-head{
    height:86px;
    min-height:86px;
    flex:none;
    background:var(--pd-shell-black);
    color:#fff;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 17px;
  }

  .pd-global-menu-head h2{
    margin:0;
    font:normal 31px/1 var(--pd-shell-serif);
  }

  #pdGlobalClose{
    width:43px;
    height:43px;
    flex:0 0 43px;
    border:1px solid #555;
    border-radius:50%;
    background:transparent;
    color:#fff;
    font-size:27px;
    font-weight:300;
    line-height:1;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0;
    cursor:pointer;
  }

  .pd-global-menu-scroll{
    min-height:0;
    flex:1 1 auto;
    overflow-y:auto;
    overflow-x:hidden;
    padding:12px 11px 24px;
    -webkit-overflow-scrolling:touch;
    overscroll-behavior:contain;
  }

  .pd-global-account{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:8px;
    margin-bottom:12px;
  }

  .pd-global-account a{
    height:48px;
    min-width:0;
    border-radius:999px;
    border:2px solid #171717;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0 10px;
    background:#fff;
    color:#111;
    font-size:12px;
    font-weight:900;
    line-height:1.1;
    text-align:center;
    text-decoration:none;
  }

  .pd-global-account a.club{
    background:var(--pd-shell-green);
    border-color:var(--pd-shell-green);
  }

  .pd-global-language-label{
    display:block;
    margin:0 3px 6px;
    color:#777;
    font-size:9px;
    font-weight:900;
    letter-spacing:1.6px;
    text-transform:uppercase;
  }

  #pdGlobalLanguage{
    width:100%;
    height:51px;
    margin:0 0 12px;
    padding:0 15px;
    border:2px solid #1b1b1b;
    border-radius:999px;
    outline:0;
    background:#fff;
    color:#111;
    font-family:var(--pd-shell-sans);
    font-size:14px;
    font-weight:800;
  }

  #pdGlobalMenuList{
    display:grid;
    grid-template-columns:1fr;
    gap:7px;
  }

  .pd-global-menu-card{
    min-width:0;
    min-height:82px;
    display:grid;
    grid-template-columns:82px minmax(0,1fr);
    border:2px solid #191919;
    border-radius:18px;
    background:#fff;
    color:#111;
    overflow:hidden;
    text-decoration:none;
  }

  .pd-global-menu-card.active{
    background:#0b0b0b;
    color:#fff;
  }

  .pd-global-menu-card-image{
    display:block;
    width:82px;
    min-height:82px;
    overflow:hidden;
    background:#ddd;
  }

  .pd-global-menu-card img{
    display:block;
    width:82px;
    height:100%;
    min-height:82px;
    object-fit:cover;
  }

  .pd-global-menu-card-copy{
    min-width:0;
    padding:10px 11px;
    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  .pd-global-menu-card h3{
    margin:0;
    font:700 19px/1 var(--pd-shell-serif);
  }

  .pd-global-menu-card.active h3{
    color:var(--pd-shell-gold-light);
  }

  .pd-global-menu-card p{
    margin:4px 0 0;
    color:#706c66;
    font-size:11px;
    line-height:1.25;
  }

  .pd-global-menu-card.active p{
    color:#ddd;
  }

  .pd-global-menu-footer{
    padding:14px 2px 0;
    text-align:center;
  }

  .pd-global-menu-footer a{
    display:inline-flex;
    align-items:center;
    min-height:38px;
    padding:0 16px;
    border-bottom:1px solid #111;
    color:#111;
    font-size:12px;
    font-weight:900;
    text-decoration:none;
  }

  #pdGlobalMenuButton:focus-visible,
  #pdGlobalClose:focus-visible,
  #pdGlobalHome:focus-visible,
  #pdGlobalProfile:focus-visible,
  #pdGlobalLanguage:focus-visible,
  #pdGlobalMenu a:focus-visible,
  #pdGlobalProfileMenu a:focus-visible{
    outline:3px solid var(--pd-shell-green);
    outline-offset:3px;
  }

  @media(max-width:360px){
    #pdGlobalHeaderMain{
      grid-template-columns:46px minmax(0,1fr) auto;
      padding-left:5px;
      padding-right:5px;
    }

    #pdGlobalHeaderActions{
      gap:4px;
    }

    #pdGlobalHome,
    #pdGlobalProfile{
      width:35px;
      height:35px;
      flex-basis:35px;
      border-radius:10px;
    }

    #pdGlobalBrandSmall{
      font-size:7px;
      letter-spacing:2px;
    }

    #pdGlobalBrandBig{
      font-size:22px;
      letter-spacing:1.4px;
    }

    #pdGlobalMenu{
      width:86vw;
      min-width:270px;
    }
  }

  @media(min-width:900px){
    #pdGlobalHeaderMain{
      max-width:1500px;
      padding-left:18px;
      padding-right:18px;
    }

    #pdGlobalMenu{
      width:390px;
      max-width:390px;
    }
  }

  @media(prefers-reduced-motion:reduce){
    #pdGlobalMenu,
    #pdGlobalOverlay,
    #pdGlobalProfileMenu{
      transition:none;
    }
  }

  /* PET-FRIENDLY MENU VISUAL STANDARD */
  #pdGlobalMenu{
    width:min(552px,88vw);
    max-width:552px;
  }

  .pd-global-menu-head{
    height:157px;
    min-height:157px;
    padding:35px 29px 28px;
  }

  .pd-global-menu-head h2{
    font-size:51px;
  }

  #pdGlobalClose{
    width:78px;
    height:78px;
    flex-basis:78px;
    font-size:35px;
  }

  .pd-global-menu-scroll{
    padding:23px 20px 34px;
  }

  .pd-global-account{
    gap:14px;
    margin-bottom:21px;
  }

  .pd-global-account a{
    min-height:88px;
    height:auto;
    border-width:3px;
    padding:12px 16px;
    font-size:20px;
  }

  .pd-global-language-label{
    margin:0 5px 11px;
    font-size:15px;
    letter-spacing:2.7px;
  }

  #pdGlobalLanguage{
    min-height:94px;
    height:94px;
    margin-bottom:22px;
    padding:0 35px;
    border-width:3px;
    font-size:22px;
  }

  #pdGlobalMenuList{
    gap:14px;
  }

  .pd-global-menu-card{
    min-height:204px;
    grid-template-columns:154px minmax(0,1fr);
    border-width:3px;
    border-radius:32px;
  }

  .pd-global-menu-card-image{
    width:154px;
    min-height:198px;
  }

  .pd-global-menu-card img{
    width:154px;
    min-height:198px;
  }

  .pd-global-menu-card-copy{
    padding:23px 18px 19px 20px;
  }

  .pd-global-menu-card h3{
    font-size:31px;
    line-height:.96;
    text-transform:uppercase;
  }

  .pd-global-menu-card p{
    margin-top:8px;
    font-size:18px;
    line-height:1.25;
  }

  .pd-global-menu-footer a{
    min-height:60px;
    font-size:16px;
  }

  @media(max-width:430px){
    #pdGlobalMenu{
      width:92vw;
      max-width:92vw;
    }

    .pd-global-menu-head{
      height:138px;
      min-height:138px;
      padding:25px 18px;
    }

    .pd-global-menu-head h2{
      font-size:43px;
    }

    #pdGlobalClose{
      width:66px;
      height:66px;
      flex-basis:66px;
      font-size:31px;
    }

    .pd-global-menu-scroll{
      padding:19px 17px 28px;
    }

    .pd-global-account{
      gap:10px;
    }

    .pd-global-account a{
      min-height:76px;
      font-size:16px;
    }

    #pdGlobalLanguage{
      min-height:82px;
      height:82px;
      padding:0 25px;
      font-size:18px;    }

    .pd-global-menu-card{
      min-height:176px;
      grid-template-columns:125px minmax(0,1fr);
      border-radius:28px;
    }

    .pd-global-menu-card-image{
      width:125px;
      min-height:170px;
    }

    .pd-global-menu-card img{
      width:125px;
      min-height:170px;
    }

    .pd-global-menu-card-copy{
      padding:17px 12px 16px 16px;
    }

    .pd-global-menu-card h3{
      font-size:24px;
    }

    .pd-global-menu-card p{
      font-size:15px;
    }
  }
  `;

  document.head.appendChild(style);
}

function hideExistingShell(){
  const selectors=[
    "body > .account-bar",
    "body > header:not(#pdGlobalHeader)",
    "body > header.site-header",
    "body > .site-header",
    "body > header.pd-topbar",
    "body > .pd-topbar",
    "#pdMasterHeader",
    ".pd-master-header",
    "#pdShellMenu",
    "#pdShellOverlay",
    ".menu-overlay:not(#pdGlobalOverlay)",
    ".side-menu:not(#pdGlobalMenu)",
    ".pd-menu-overlay:not(#pdGlobalOverlay)",
    ".pd-drawer:not(#pdGlobalMenu)",
    ".primary-nav",
    ".category-nav",
    ".global-nav",
    ".rubric-nav",
    ".desktop-categories",
    "#categoryNav",
    ".pd-primary-nav",
    ".pd-secondary-nav"
  ];

  selectors.forEach(selector=>{
    document
      .querySelectorAll(selector)
      .forEach(element=>{
        if(
          element.id==="pdGlobalHeader"||
          element.id==="pdGlobalMenu"||
          element.id==="pdGlobalOverlay"
        ){
          return;
        }

        element.classList.add(
          "pd-global-old-shell-hidden"
        );
      });
  });
}

function watchForLegacyShell(){
  if(legacyObserver){
    return;
  }

  legacyObserver=new MutationObserver(
    ()=>hideExistingShell()
  );

  legacyObserver.observe(
    document.body,
    {
      childList:true,
      subtree:true
    }
  );
}

function createHeader(){
  if(document.getElementById("pdGlobalHeader")){
    return;
  }

  const copy=shellCopy();
  const header=document.createElement("header");
  header.id="pdGlobalHeader";

  header.innerHTML=`
    <div id="pdGlobalHeaderMain">

      <button
        id="pdGlobalMenuButton"
        type="button"
        aria-label="${escapeHTML(copy.openMenu)}"
        aria-controls="pdGlobalMenu"
        aria-expanded="false"
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
        aria-label="PETS & DOGUE"
      >
        <span id="pdGlobalBrandSmall">
          PETS &amp;
        </span>

        <span id="pdGlobalBrandBig">
          DOGUE
        </span>
      </a>

      <div id="pdGlobalHeaderActions">

        <a
          id="pdGlobalHome"
          href="index.html"
          aria-label="${escapeHTML(copy.home)}"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"></path>
          </svg>
        </a>

        <button
          id="pdGlobalProfile"
          type="button"
          aria-label="${escapeHTML(copy.profile)}"
          aria-controls="pdGlobalProfileMenu"
          aria-expanded="false"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path>
          </svg>
        </button>

        <div
          id="pdGlobalProfileMenu"
          role="menu"
          aria-hidden="true"
        >
        </div>

      </div>

    </div>
  `;

  document.body.insertBefore(
    header,
    document.body.firstChild
  );

  document
    .getElementById("pdGlobalMenuButton")
    ?.addEventListener(
      "click",
      openMenu
    );

  document
    .getElementById("pdGlobalProfile")
    ?.addEventListener(
      "click",
      event=>{
        event.stopPropagation();
        toggleProfileMenu();
      }
    );

  renderProfileMenu();
}

function createSideMenu(){
  if(document.getElementById("pdGlobalMenu")){
    return;
  }

  const overlay=document.createElement("div");
  overlay.id="pdGlobalOverlay";

  const menu=document.createElement("aside");
  menu.id="pdGlobalMenu";
  menu.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.appendChild(overlay);
  document.body.appendChild(menu);

  overlay.addEventListener(
    "click",
    closeMenu
  );
}

function renderProfileMenu(){
  const menu=document.getElementById(
    "pdGlobalProfileMenu"
  );

  if(!menu){
    return;
  }

  const copy=shellCopy();
  const wasOpen=menu.classList.contains("open");

  menu.innerHTML=`
    <div class="pd-global-profile-title">
      ${escapeHTML(copy.profile)}
    </div>

    <a
      class="pd-global-profile-link"
      href="account.html"
      role="menuitem"
    >
      ${escapeHTML(copy.signIn)}
    </a>

    <a
      class="pd-global-profile-link club"
      href="club.html"
      role="menuitem"
    >
      ${escapeHTML(copy.joinClub)}
    </a>
  `;

  if(wasOpen){
    menu.classList.add("open");
    menu.setAttribute("aria-hidden","false");
  }
}

function openProfileMenu(){
  const menu=document.getElementById(
    "pdGlobalProfileMenu"
  );
  const button=document.getElementById(
    "pdGlobalProfile"
  );

  if(!menu||!button){
    return;
  }

  menu.classList.add("open");
  menu.setAttribute("aria-hidden","false");
  button.setAttribute("aria-expanded","true");
}

function closeProfileMenu(){
  const menu=document.getElementById(
    "pdGlobalProfileMenu"
  );
  const button=document.getElementById(
    "pdGlobalProfile"
  );

  if(!menu||!button){
    return;
  }

  menu.classList.remove("open");
  menu.setAttribute("aria-hidden","true");
  button.setAttribute("aria-expanded","false");
}

function toggleProfileMenu(){
  const menu=document.getElementById(
    "pdGlobalProfileMenu"
  );

  if(!menu){
    return;
  }

  if(menu.classList.contains("open")){
    closeProfileMenu();
  }else{
    openProfileMenu();
  }
}

function openMenu(){
  const menu=document.getElementById(
    "pdGlobalMenu"
  );
  const overlay=document.getElementById(
    "pdGlobalOverlay"
  );
  const button=document.getElementById(
    "pdGlobalMenuButton"
  );

  if(!menu||!overlay){
    return;
  }

  closeProfileMenu();

  menu.classList.add("open");
  overlay.classList.add("open");
  menu.setAttribute("aria-hidden","false");
  button?.setAttribute("aria-expanded","true");

  document.body.classList.add(
    "pd-global-menu-open"
  );
}

function closeMenu(){
  const menu=document.getElementById(
    "pdGlobalMenu"
  );
  const overlay=document.getElementById(
    "pdGlobalOverlay"
  );
  const button=document.getElementById(
    "pdGlobalMenuButton"
  );

  if(!menu||!overlay){
    return;
  }

  menu.classList.remove("open");
  overlay.classList.remove("open");
  menu.setAttribute("aria-hidden","true");
  button?.setAttribute("aria-expanded","false");

  document.body.classList.remove(
    "pd-global-menu-open"
  );
}

function renderSideMenu(){
  const menu=document.getElementById(
    "pdGlobalMenu"
  );

  if(!menu){
    return;
  }

  const copy=shellCopy();
  const oldScroll=
    menu.querySelector(".pd-global-menu-scroll")?.scrollTop||0;
  const wasOpen=
    menu.classList.contains("open");

  const cards=NAV_ITEMS
    .map(item=>{
      const active=
        item.key===activeKey;

      return`
        <a
          class="pd-global-menu-card ${active?"active":""}"
          href="${item.url}"
          data-pd-nav="${item.key}"
          ${active?'aria-current="page"':""}
        >
          <span class="pd-global-menu-card-image">
            <img
              src="${item.image}"
              alt=""
              loading="lazy"
              decoding="async"
              referrerpolicy="no-referrer"
            >
          </span>

          <span class="pd-global-menu-card-copy">
            <h3>
              ${escapeHTML(navName(item))}
            </h3>

            <p>
              ${escapeHTML(navDescription(item))}
            </p>
          </span>
        </a>
      `;
    })
    .join("");

  menu.innerHTML=`
    <div class="pd-global-menu-head">

      <h2>
        ${escapeHTML(copy.menu)}
      </h2>

      <button
        id="pdGlobalClose"
        type="button"
        aria-label="${escapeHTML(copy.closeMenu)}"
      >
        ×
      </button>

    </div>

    <div class="pd-global-menu-scroll">

      <div class="pd-global-account">

        <a href="account.html">
          ${escapeHTML(copy.signIn)}
        </a>

        <a
          class="club"
          href="club.html"
        >
          ${escapeHTML(copy.joinClub)}
        </a>

      </div>

      <label
        class="pd-global-language-label"
        for="pdGlobalLanguage"
      >
        ${escapeHTML(copy.language)}
      </label>

      <select
        id="pdGlobalLanguage"
        aria-label="${escapeHTML(copy.language)}"
      >
        ${LANGUAGE_OPTIONS
          .map(option=>`
            <option
              value="${option[0]}"
              ${option[0]===shellLanguage?"selected":""}
            >
              ${option[1]}
            </option>
          `)
          .join("")}
      </select>

      <nav
        id="pdGlobalMenuList"
        aria-label="PETS & DOGUE"
      >
        ${cards}
      </nav>

      <div class="pd-global-menu-footer">
        <a href="contact.html">
          ${escapeHTML(copy.contact)}
        </a>
      </div>

    </div>
  `;

  document
    .getElementById("pdGlobalClose")
    ?.addEventListener(
      "click",      closeMenu
    );

  document
    .getElementById("pdGlobalLanguage")
    ?.addEventListener(
      "change",
      event=>{
        applyLanguage(
          event.target.value,
          {
            syncPage:true,
            announce:true
          }
        );
      }
    );

  if(wasOpen){
    menu.classList.add("open");
    menu.setAttribute("aria-hidden","false");

    requestAnimationFrame(()=>{
      const scroll=menu.querySelector(
        ".pd-global-menu-scroll"
      );

      if(scroll){
        scroll.scrollTop=oldScroll;
      }
    });
  }
}

function updateHeaderLanguage(){
  const copy=shellCopy();

  document
    .getElementById("pdGlobalMenuButton")
    ?.setAttribute(
      "aria-label",
      copy.openMenu
    );

  document
    .getElementById("pdGlobalHome")
    ?.setAttribute(
      "aria-label",
      copy.home
    );

  document
    .getElementById("pdGlobalProfile")
    ?.setAttribute(
      "aria-label",
      copy.profile
    );
}

function valueForExistingSelect(
  select,
  language
){
  const reverseAliases={
    uk:"ua",
    cs:"cz",
    el:"gr",
    sv:"se",
    da:"dk"
  };

  const candidates=[
    language,
    reverseAliases[language]
  ].filter(Boolean);

  for(const candidate of candidates){
    const exact=Array
      .from(select.options||[])
      .find(option=>
        option.value===candidate
      );

    if(exact){
      return exact.value;
    }
  }

  const normalized=Array
    .from(select.options||[])
    .find(option=>
      normalizeLanguage(option.value)===language
    );

  return normalized
    ?normalized.value
    :"";
}

function syncExistingPageLanguage(language){
  const code=normalizeLanguage(language);

  if(!supportedLanguage(code)){
    return false;
  }

  let handled=false;

  if(window.PetsDogueLanguage){
    const controller=
      window.PetsDogueLanguage;

    for(const setter of[
      "setLanguage",
      "changeLanguage",
      "selectLanguage"
    ]){
      if(typeof controller[setter]==="function"){
        try{
          controller[setter](code);
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

  if(
    !handled &&
    typeof window.renderLanguage==="function"
  ){
    try{
      window.renderLanguage(code);
      handled=true;
    }catch(error){
      console.warn(
        "PETS & DOGUE renderLanguage:",
        error
      );
    }
  }

  const existing=findExistingLanguageSelect();

  if(existing){
    const value=valueForExistingSelect(
      existing,
      code
    );

    if(
      value &&
      existing.value!==value
    ){
      try{
        existing.value=value;
        existing.dispatchEvent(
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
          "PETS & DOGUE existing language select:",
          error
        );
      }
    }
  }

  return handled;
}

function refreshShellLanguage(){
  updateHeaderLanguage();
  renderProfileMenu();
  renderSideMenu();
}

function applyLanguage(
  language,
  {
    syncPage=true,
    announce=true
  }={}
){
  const code=normalizeLanguage(language);

  if(!supportedLanguage(code)){
    return;
  }

  internalLanguageChange=true;
  persistLanguage(code);

  if(syncPage){
    syncExistingPageLanguage(code);
  }

  refreshShellLanguage();

  if(announce){
    window.dispatchEvent(
      new CustomEvent(
        "petsdogue:languagechange",
        {
          detail:{
            language:code,
            source:"global-shell"
          }
        }
      )
    );
  }

  setTimeout(()=>{
    internalLanguageChange=false;
  },0);
}

function preserveLanguageBeforeNavigation(event){
  const link=event.target.closest(
    "a[data-pd-nav]"
  );

  if(!link){
    return;
  }

  try{
    localStorage.setItem(
      LANGUAGE_KEY,
      shellLanguage
    );
  }catch(error){
    console.warn(
      "PETS & DOGUE language storage:",
      error
    );
  }
}

function handleDocumentClick(event){
  const profileMenu=document.getElementById(
    "pdGlobalProfileMenu"
  );
  const profileButton=document.getElementById(
    "pdGlobalProfile"
  );

  if(
    profileMenu?.classList.contains("open") &&
    !profileMenu.contains(event.target) &&
    !profileButton?.contains(event.target)
  ){
    closeProfileMenu();
  }
}

function handleEscape(event){
  if(event.key!=="Escape"){
    return;
  }

  closeProfileMenu();

  const menu=document.getElementById(
    "pdGlobalMenu"
  );

  if(menu?.classList.contains("open")){
    closeMenu();
  }
}

function listenForExternalLanguageChanges(){
  window.addEventListener(
    "petsdogue:languagechange",
    event=>{
      if(internalLanguageChange){
        return;
      }

      const code=normalizeLanguage(
        event?.detail?.language||""
      );

      if(
        code &&
        supportedLanguage(code) &&
        code!==shellLanguage
      ){
        persistLanguage(code);
        refreshShellLanguage();
      }
    }
  );

  window.addEventListener(
    "storage",
    event=>{
      if(event.key!==LANGUAGE_KEY){
        return;
      }

      const code=normalizeLanguage(
        event.newValue||""
      );

      if(
        code &&
        supportedLanguage(code) &&
        code!==shellLanguage
      ){
        persistLanguage(code);
        refreshShellLanguage();
      }
    }
  );
}

function init(){
  if(
    document.documentElement.dataset
      .petsDogueGlobalShell==="1"
  ){
    return;
  }

  document.documentElement.dataset
    .petsDogueGlobalShell="1";

  activeKey=detectActiveKey();
  shellLanguage=detectInitialLanguage();

  persistLanguage(shellLanguage);
  installStyles();
  hideExistingShell();
  createHeader();
  createSideMenu();
  renderSideMenu();
  refreshShellLanguage();
  watchForLegacyShell();
  listenForExternalLanguageChanges();

  document.addEventListener(
    "click",
    preserveLanguageBeforeNavigation
  );

  document.addEventListener(
    "click",
    handleDocumentClick
  );

  document.addEventListener(
    "keydown",
    handleEscape
  );

  window.PetsDogueShell={
    getLanguage(){
      return shellLanguage;
    },

    setLanguage(language){
      applyLanguage(
        language,
        {
          syncPage:true,
          announce:true
        }
      );
    },

    openMenu,
    closeMenu,
    openProfile:openProfileMenu,
    closeProfile:closeProfileMenu
  };
}

if(document.readyState==="loading"){
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
