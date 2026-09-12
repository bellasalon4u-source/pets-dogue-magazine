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
    url:"travel.html",
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

  "travel.html":"travel",
  "pet-travel.html":"travel",

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
  "en":{
    "menu":"Contents",
    "signIn":"Sign In",
    "joinClub":"Join Club",
    "language":"Language",
    "contact":"Contact us",
    "openMenu":"Open menu",
    "closeMenu":"Close menu",
    "home":"Home",
    "profile":"Profile",
    "nav":[
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
    "desc":[
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

  "uk":{
    "menu":"Зміст",
    "signIn":"Увійти",
    "joinClub":"Вступити до клубу",
    "language":"Мова",
    "contact":"Зв’язатися з нами",
    "openMenu":"Відкрити меню",
    "closeMenu":"Закрити меню",
    "home":"Головна",
    "profile":"Профіль",
    "nav":[
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
    "desc":[
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

  "ru":{
    "menu":"Содержание",
    "signIn":"Войти",
    "joinClub":"Вступить в клуб",
    "language":"Язык",
    "contact":"Связаться с нами",
    "openMenu":"Открыть меню",
    "closeMenu":"Закрыть меню",
    "home":"Главная",
    "profile":"Профиль",
    "nav":[
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
    "desc":[
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

  "fr":{
    "menu":"Sommaire",
    "signIn":"Connexion",
    "joinClub":"Rejoindre le Club",
    "language":"Langue",
    "contact":"Nous contacter",
    "openMenu":"Ouvrir le menu",
    "closeMenu":"Fermer le menu",
    "home":"Accueil",
    "profile":"Profil",
    "nav":[
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
    "desc":[
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

  "de":{
    "menu":"Inhalt",
    "signIn":"Anmelden",
    "joinClub":"Club beitreten",
    "language":"Sprache",
    "contact":"Kontakt",
    "openMenu":"Menü öffnen",
    "closeMenu":"Menü schließen",
    "home":"Startseite",
    "profile":"Profil",
    "nav":[
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
    "desc":[
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
  } ,

  "es":{
    "menu":"Contenido",
    "signIn":"Iniciar sesión",
    "joinClub":"Unirse al Club",
    "language":"Idioma",
    "contact":"Contáctanos",
    "openMenu":"Abrir menú",
    "closeMenu":"Cerrar menú",
    "home":"Inicio",
    "profile":"Perfil",
    "nav":[
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
    "desc":[
      "Abre PETS & DOGUE Edition 01, nuestra edición digital más reciente.",
      "Inscribe a tu mascota y compite por aparecer en la próxima portada.",
      "Descubre descuentos para miembros y ofertas especiales.",
      "Encuentra lugares pet-friendly con mapas, rutas, contactos e información útil.",
      "Compra, vende y descubre productos y servicios para mascotas.",
      "Viajes con mascotas, rutas, alojamientos y planificación útil.",
      "Estilo, accesorios y moda para mascotas.",
      "Salud, peluquería y cuidados diarios para mascotas.",
      "Historias editoriales, entrevistas y guías prácticas.",
      "Retratos, galerías e historias visuales.",
      "Conecta con amantes de los animales y descubre eventos locales.",
      "Participa en los concursos de PETS & DOGUE.",
      "Rescate, adopción y ayuda para animales que lo necesitan.",
      "Marcas, servicios y socios seleccionados de PETS & DOGUE."
    ]
  },

  "it":{
    "menu":"Contenuti",
    "signIn":"Accedi",
    "joinClub":"Entra nel Club",
    "language":"Lingua",
    "contact":"Contattaci",
    "openMenu":"Apri menu",
    "closeMenu":"Chiudi menu",
    "home":"Home",
    "profile":"Profilo",
    "nav":[
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
    "desc":[
      "Apri PETS & DOGUE Edition 01, la nostra più recente edizione digitale.",
      "Iscrivi il tuo animale e partecipa per conquistare la prossima copertina.",
      "Scopri sconti per i membri e offerte speciali.",
      "Trova luoghi pet-friendly con mappe, percorsi, contatti e informazioni utili.",
      "Compra, vendi e scopri prodotti e servizi per animali.",
      "Viaggi con animali, percorsi, soggiorni e pianificazione utile.",
      "Stile, accessori e moda per animali.",
      "Salute, toelettatura e cura quotidiana.",
      "Storie editoriali, interviste e guide pratiche.",
      "Ritratti, gallerie e storie visive.",
      "Connettiti con gli amanti degli animali e scopri eventi locali.",
      "Partecipa ai concorsi PETS & DOGUE.",
      "Salvataggio, adozione e aiuto per gli animali in difficoltà.",
      "Brand, servizi e partner selezionati di PETS & DOGUE."
    ]
  },

  "pt":{
    "menu":"Conteúdo",
    "signIn":"Entrar",
    "joinClub":"Entrar no Clube",
    "language":"Idioma",
    "contact":"Contacte-nos",
    "openMenu":"Abrir menu",
    "closeMenu":"Fechar menu",
    "home":"Início",
    "profile":"Perfil",
    "nav":[
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
    "desc":[
      "Abra PETS & DOGUE Edition 01, a nossa edição digital mais recente.",
      "Inscreva o seu animal e concorra para a próxima capa.",
      "Descubra descontos para membros e ofertas especiais.",
      "Encontre locais pet-friendly com mapas, rotas, contactos e informação útil.",
      "Compre, venda e descubra produtos e serviços para animais.",
      "Viagens com animais, rotas, alojamentos e planeamento útil.",
      "Estilo, acessórios e moda para animais.",
      "Saúde, grooming e cuidados diários.",
      "Histórias editoriais, entrevistas e guias práticos.",
      "Retratos, galerias e histórias visuais.",
      "Ligue-se a amantes de animais e descubra eventos locais.",
      "Participe nos concursos PETS & DOGUE.",
      "Resgate, adoção e ajuda a animais que precisam.",
      "Marcas, serviços e parceiros selecionados de PETS & DOGUE."
    ]
  },

  "nl":{
    "menu":"Inhoud",
    "signIn":"Inloggen",
    "joinClub":"Word lid",
    "language":"Taal",
    "contact":"Neem contact op",
    "openMenu":"Menu openen",
    "closeMenu":"Menu sluiten",
    "home":"Home",
    "profile":"Profiel",
    "nav":[
      "Editie",
      "Cover Stars",
      "Kortingen",
      "Pet-Friendly plaatsen",
      "Marketplace",
      "Reizen",
      "Mode",
      "Gezondheid",
      "Artikelen",
      "Foto's",
      "Community",
      "Wedstrijden",
      "Dieren in nood",
      "Partners"
    ],
    "desc":[
      "Open PETS & DOGUE Edition 01, onze nieuwste digitale editie.",
      "Meld je huisdier aan en maak kans op de volgende cover.",
      "Ontdek ledenkortingen en speciale aanbiedingen.",
      "Vind pet-friendly plaatsen met kaarten, routes, contacten en nuttige informatie.",
      "Koop, verkoop en ontdek producten en diensten voor huisdieren.",
      "Reizen met huisdieren, routes, verblijven en handige reisplanning.",
      "Stijl, accessoires en mode voor huisdieren.",
      "Gezondheid, verzorging en dagelijkse zorg.",
      "Redactionele verhalen, interviews en praktische gidsen.",
      "Portretten, galerijen en visuele verhalen.",
      "Kom in contact met dierenliefhebbers en ontdek lokale evenementen.",
      "Doe mee aan PETS & DOGUE wedstrijden.",
      "Redding, adoptie en hulp voor dieren in nood.",
      "Geselecteerde merken, diensten en PETS & DOGUE partners."
    ]
  },

  "pl":{
    "menu":"Spis treści",
    "signIn":"Zaloguj się",
    "joinClub":"Dołącz do Klubu",
    "language":"Język",
    "contact":"Skontaktuj się z nami",
    "openMenu":"Otwórz menu",
    "closeMenu":"Zamknij menu",
    "home":"Strona główna",
    "profile":"Profil",
    "nav":[
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
    "desc":[
      "Otwórz PETS & DOGUE Edition 01, nasze najnowsze wydanie cyfrowe.",
      "Zgłoś swojego pupila i zawalcz o miejsce na kolejnej okładce.",
      "Odkrywaj zniżki dla członków i oferty specjalne.",
      "Znajduj miejsca pet-friendly z mapami, trasami, kontaktami i przydatnymi informacjami.",
      "Kupuj, sprzedawaj i odkrywaj produkty oraz usługi dla zwierząt.",
      "Podróże ze zwierzętami, trasy, noclegi i przydatne planowanie.",
      "Styl, akcesoria i moda dla zwierząt.",
      "Zdrowie, pielęgnacja i codzienna opieka.",
      "Historie redakcyjne, wywiady i praktyczne poradniki.",
      "Portrety, galerie i historie wizualne.",
      "Łącz się z miłośnikami zwierząt i odkrywaj lokalne wydarzenia.",
      "Bierz udział w konkursach PETS & DOGUE.",
      "Ratowanie, adopcja i pomoc zwierzętom w potrzebie.",
      "Wybrane marki, usługi i partnerzy PETS & DOGUE."
    ]
  } ,

  "cs":{
    "menu":"Obsah",
    "signIn":"Přihlásit se",
    "joinClub":"Vstoupit do klubu",
    "language":"Jazyk",
    "contact":"Kontaktujte nás",
    "openMenu":"Otevřít menu",
    "closeMenu":"Zavřít menu",
    "home":"Domů",
    "profile":"Profil",
    "nav":[
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
    "desc":[
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

  "sk":{
    "menu":"Obsah",
    "signIn":"Prihlásiť sa",
    "joinClub":"Vstúpiť do klubu",
    "language":"Jazyk",
    "contact":"Kontaktujte nás",
    "openMenu":"Otvoriť menu",
    "closeMenu":"Zavrieť menu",
    "home":"Domov",
    "profile":"Profil",
    "nav":[
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
    "desc":[
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

  "hu":{
    "menu":"Tartalom",
    "signIn":"Belépés",
    "joinClub":"Csatlakozás",
    "language":"Nyelv",
    "contact":"Kapcsolat",
    "openMenu":"Menü megnyitása",
    "closeMenu":"Menü bezárása",
    "home":"Kezdőlap",
    "profile":"Profil",
    "nav":[
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
    "desc":[
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

  "ro":{
    "menu":"Conținut",
    "signIn":"Autentificare",
    "joinClub":"Intră în Club",
    "language":"Limbă",
    "contact":"Contactați-ne",
    "openMenu":"Deschide meniul",
    "closeMenu":"Închide meniul",
    "home":"Acasă",
    "profile":"Profil",
    "nav":[
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
    "desc":[
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

  "bg":{
    "menu":"Съдържание",
    "signIn":"Вход",
    "joinClub":"Влезте в клуба",
    "language":"Език",
    "contact":"Свържете се с нас",
    "openMenu":"Отвори менюто",
    "closeMenu":"Затвори менюто",
    "home":"Начало",
    "profile":"Профил",
    "nav":[
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
    "desc":[
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

  "el":{
    "menu":"Περιεχόμενα",
    "signIn":"Σύνδεση",
    "joinClub":"Εγγραφή στο Club",
    "language":"Γλώσσα",
    "contact":"Επικοινωνία",
    "openMenu":"Άνοιγμα μενού",
    "closeMenu":"Κλείσιμο μενού",
    "home":"Αρχική",
    "profile":"Προφίλ",
    "nav":[
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
    "desc":[
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

  "sv":{
    "menu":"Innehåll",
    "signIn":"Logga in",
    "joinClub":"Gå med i klubben",
    "language":"Språk",
    "contact":"Kontakta oss",
    "openMenu":"Öppna meny",
    "closeMenu":"Stäng meny",
    "home":"Hem",
    "profile":"Profil",
    "nav":[
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
    "desc":[
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

  "da":{
    "menu":"Indhold",
    "signIn":"Log ind",
    "joinClub":"Bliv medlem",
    "language":"Sprog",
    "contact":"Kontakt os",
    "openMenu":"Åbn menu",
    "closeMenu":"Luk menu",
    "home":"Hjem",
    "profile":"Profil",
    "nav":[
      "Udgave",
      "Forsidestjerner",
      "Rabatter",
      "Dyrevenlige steder",
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
    "desc":[
      "Åbn PETS & DOGUE Edition 01, den nyeste digitale udgave.",
      "Tilmeld dit kæledyr til den næste forside.",
      "Opdag medlemsrabatter og særlige tilbud.",
      "Find dyrevenlige steder med kort, ruter og kontaktoplysninger.",
      "Køb, sælg og opdag produkter og tjenester til kæledyr.",
      "Rejser med kæledyr, ruter, ophold og praktisk planlægning.",
      "Stil, tilbehør og kæledyrsmode.",
      "Sundhed, pleje og daglig omsorg.",
      "Historier, interviews og praktiske guider.",
      "Portrætter, gallerier og visuelle historier.",
      "Mød dyrevenner og find lokale arrangementer.",
      "Deltag i PETS & DOGUE-konkurrencer.",
      "Redning, adoption og hjælp til dyr.",
      "Udvalgte brands, tjenester og PETS & DOGUE-partnere."
    ]
  },

  "no":{
    "menu":"Innhold",
    "signIn":"Logg inn",
    "joinClub":"Bli med i klubben",
    "language":"Språk",
    "contact":"Kontakt oss",
    "openMenu":"Åpne meny",
    "closeMenu":"Lukk meny",
    "home":"Hjem",
    "profile":"Profil",
    "nav":[
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
    "desc":[
      "Åpne PETS & DOGUE Edition 01, den nyeste digitale utgaven.",
      "Meld på kjæledyret ditt til neste forside.",
      "Oppdag medlemsrabatter og spesialtilbud.",
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

  "fi":{
    "menu":"Sisältö",
    "signIn":"Kirjaudu",
    "joinClub":"Liity klubiin",
    "language":"Kieli",
    "contact":"Ota yhteyttä",
    "openMenu":"Avaa valikko",
    "closeMenu":"Sulje valikko",
    "home":"Etusivu",
    "profile":"Profiili",
    "nav":[
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
    "desc":[
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

  "tr":{
    "menu":"İçindekiler",
    "signIn":"Giriş yap",
    "joinClub":"Kulübe katıl",
    "language":"Dil",
    "contact":"Bize ulaşın",
    "openMenu":"Menüyü aç",
    "closeMenu":"Menüyü kapat",
    "home":"Ana sayfa",
    "profile":"Profil",
    "nav":[
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
    "desc":[
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

  "ar":{
    "menu":"المحتويات",
    "signIn":"تسجيل الدخول",
    "joinClub":"انضم إلى النادي",
    "language":"اللغة",
    "contact":"اتصل بنا",
    "openMenu":"فتح القائمة",
    "closeMenu":"إغلاق القائمة",
    "home":"الرئيسية",
    "profile":"الملف الشخصي",
    "nav":[
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
    "desc":[
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

  "hi":{
    "menu":"विषय-सूची",
    "signIn":"लॉग इन",
    "joinClub":"क्लब से जुड़ें",
    "language":"भाषा",
    "contact":"संपर्क करें",
    "openMenu":"मेनू खोलें",
    "closeMenu":"मेनू बंद करें",
    "home":"होम",
    "profile":"प्रोफ़ाइल",
    "nav":[
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
    "desc":[
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
    return "";
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
  return path.split("/").filter(Boolean).pop()?.toLowerCase()||"index.html";
}

function detectActiveKey(){
  const file=currentFile();

  if(PAGE_KEYS[file]){
    return PAGE_KEYS[file];
  }

  const path=(window.location.pathname||"").toLowerCase();

  for(const [name,key] of Object.entries(PAGE_KEYS)){
    if(path.includes(name.replace(".html",""))){
      return key;
    }
  }

  return "";
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
    const found=document.querySelector(selector);

    if(found && found.id!=="pdGlobalLanguage"){
      return found;
    }
  }

  return null;
}

function detectInitialLanguage(){
  const stored=normalizeLanguage(
    localStorage.getItem(LANGUAGE_KEY)||""
  );

  if(stored && supportedLanguage(stored)){
    return stored;
  }

  const existing=findExistingLanguageSelect();

  if(existing){
    const fromSelect=normalizeLanguage(existing.value);

    if(supportedLanguage(fromSelect)){
      return fromSelect;
    }
  }

  const htmlLang=normalizeLanguage(
    document.documentElement.lang||""
  );

  if(supportedLanguage(htmlLang)){
    return htmlLang;
  }

  return "en";
}

function persistLanguage(language){
  const code=normalizeLanguage(language);

  if(!supportedLanguage(code)){
    return;
  }

  shellLanguage=code;

  try{
    localStorage.setItem(LANGUAGE_KEY,code);
  }catch(error){
    console.warn("PETS & DOGUE language storage:",error);
  }

  document.documentElement.lang=code;
  document.documentElement.dir=code==="ar"?"rtl":"ltr";
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
  const index=NAV_INDEX[item.key];
  const copy=shellCopy();

  return copy.nav[index]
    ||TEXT.en.nav[index]
    ||item.key;
}

function navDescription(item){
  const index=NAV_INDEX[item.key];
  const copy=shellCopy();

  return copy.desc[index]
    ||TEXT.en.desc[index]
    ||"";
} function installStyles(){
  const old=document.getElementById("pdGlobalShellStyles");

  if(old){
    old.remove();
  }

  const style=document.createElement("style");
  style.id="pdGlobalShellStyles";

  style.textContent=`
    :root{
      --pd-black:#070707;
      --pd-cream:#f6f2e9;
      --pd-white:#ffffff;
      --pd-gold:#c99a35;
      --pd-gold-light:#efd88e;
      --pd-green:#65e51f;
      --pd-line:#1b1b1b;
      --pd-grey:#716f6a;
      --pd-serif:Georgia,"Times New Roman",serif;
      --pd-sans:Arial,Helvetica,sans-serif;
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
      background:var(--pd-black);
      color:#fff;
      border-bottom:1px solid #222;
      font-family:var(--pd-sans);
      direction:ltr;
    }

    #pdGlobalHeaderMain{
      width:100%;
      height:68px;
      display:grid;
      grid-template-columns:52px minmax(0,1fr) auto;
      align-items:center;
      padding:0 8px;
    }

    #pdGlobalMenuButton{
      width:44px;
      height:44px;
      border:0;
      background:transparent;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      gap:6px;
      padding:0;
      cursor:pointer;
    }

    #pdGlobalMenuButton span{
      display:block;
      width:27px;
      height:2px;
      border-radius:20px;
      background:#fff;
    }

    #pdGlobalBrand{
      justify-self:center;
      text-decoration:none;
      color:var(--pd-gold);
      text-align:center;
      font-family:var(--pd-serif);
      line-height:.9;
      white-space:nowrap;
    }

    #pdGlobalBrandSmall{
      display:block;
      font-size:7px;
      letter-spacing:3px;
      text-transform:uppercase;
    }

    #pdGlobalBrandBig{
      display:block;
      margin-top:5px;
      font-size:25px;
      letter-spacing:2px;
    }

    #pdGlobalHeaderActions{
      position:relative;
      display:flex;
      align-items:center;
      justify-content:flex-end;
      gap:7px;
    }

    #pdGlobalHome,
    #pdGlobalProfile{
      width:39px;
      height:39px;
      flex:0 0 39px;
      border:1px solid #404040;
      border-radius:11px;
      background:#111;
      color:#fff;
      display:flex;
      align-items:center;
      justify-content:center;
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
      border-color:var(--pd-green);
    }

    #pdGlobalProfileMenu{
      position:absolute;
      top:47px;
      right:0;
      z-index:14200;
      width:220px;
      padding:11px;
      border:1px solid #333;
      border-radius:16px;
      background:#0a0a0a;
      box-shadow:0 18px 42px rgba(0,0,0,.38);
      opacity:0;
      visibility:hidden;
      transform:translateY(-5px);
      transition:.18s ease;
    }

    #pdGlobalProfileMenu.open{
      opacity:1;
      visibility:visible;
      transform:translateY(0);
    }

    .pd-global-profile-title{
      margin:0 0 9px;
      padding:2px 3px;
      color:#fff;
      font-size:11px;
      font-weight:900;
      letter-spacing:.9px;
      text-transform:uppercase;
    }

    .pd-global-profile-link{
      min-height:43px;
      display:flex;
      align-items:center;
      justify-content:center;
      border:2px solid #fff;
      border-radius:999px;
      background:#fff;
      color:#111;
      font-size:12px;
      font-weight:900;
      text-decoration:none;
    }

    .pd-global-profile-link + .pd-global-profile-link{
      margin-top:8px;
    }

    .pd-global-profile-link.club{
      border-color:var(--pd-green);
      background:var(--pd-green);
    }

    #pdGlobalOverlay{
      position:fixed;
      inset:0;
      z-index:15000;
      background:rgba(0,0,0,.68);
      opacity:0;
      visibility:hidden;
      transition:
        opacity .22s ease,
        visibility .22s ease;
    }

    #pdGlobalOverlay.open{
      opacity:1;
      visibility:visible;
    }

    #pdGlobalMenu{
      position:fixed;
      top:0;
      left:0;
      bottom:0;
      z-index:15100;
      width:min(552px,88vw);
      max-width:100%;
      background:var(--pd-cream);
      color:#111;
      overflow-y:auto;
      overscroll-behavior:contain;
      transform:translateX(-102%);
      transition:transform .26s ease;
      box-shadow:16px 0 38px rgba(0,0,0,.24);
      font-family:var(--pd-sans);
      -webkit-overflow-scrolling:touch;
    }

    #pdGlobalMenu.open{
      transform:translateX(0);
    }

    #pdGlobalMenuTop{
      min-height:157px;
      padding:35px 29px 28px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:18px;
      background:#050505;
      color:#fff;
    }

    #pdGlobalMenuTitle{
      margin:0;
      font-family:var(--pd-serif);
      font-size:51px;
      line-height:1;
      font-weight:400;
    }

    #pdGlobalMenuClose{
      width:78px;
      height:78px;
      flex:0 0 78px;
      border:1px solid #5d5d5d;
      border-radius:50%;
      background:transparent;
      color:#fff;
      display:flex;
      align-items:center;
      justify-content:center;
      cursor:pointer;
    }

    #pdGlobalMenuClose svg{
      width:32px;
      height:32px;
      fill:none;
      stroke:currentColor;
      stroke-width:2.4;
      stroke-linecap:round;
    }

    #pdGlobalMenuBody{
      padding:23px 20px 34px;
    }

    #pdGlobalMemberActions{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:14px;
      margin-bottom:21px;
    }

    .pd-global-member-button{
      min-height:88px;
      display:flex;
      align-items:center;
      justify-content:center;
      border:3px solid #1b1b1b;
      border-radius:999px;
      background:#fff;
      color:#111;
      font-size:20px;
      font-weight:900;
      text-decoration:none;
      text-align:center;
      padding:12px 16px;
    }

    .pd-global-member-button.join{
      border-color:var(--pd-green);
      background:var(--pd-green);
    }

    #pdGlobalLanguageLabel{
      display:block;
      margin:0 5px 11px;
      color:#77736b;
      font-size:15px;
      line-height:1;
      font-weight:900;
      letter-spacing:2.7px;
      text-transform:uppercase;
    }

    #pdGlobalLanguageWrap{
      position:relative;
      margin-bottom:22px;
    }

    #pdGlobalLanguage{
      width:100%;
      min-height:94px;
      appearance:none;
      -webkit-appearance:none;
      border:3px solid #1b1b1b;
      border-radius:999px;
      background:#fff;
      color:#111;
      padding:0 62px 0 35px;
      font-size:22px;
      font-weight:800;
      outline:none;
    }

    #pdGlobalLanguageChevron{
      position:absolute;
      right:25px;
      top:50%;
      width:13px;
      height:13px;
      border-right:1.8px solid #111;
      border-bottom:1.8px solid #111;
      transform:translateY(-68%) rotate(45deg);
      pointer-events:none;
    }

    #pdGlobalCards{
      display:grid;
      gap:14px;
    }

    .pd-global-card{
      min-height:204px;
      display:grid;
      grid-template-columns:154px minmax(0,1fr);
      overflow:hidden;
      border:3px solid #191919;
      border-radius:32px;
      background:#fff;
      color:#111;
      text-decoration:none;
    }

    .pd-global-card-image{
      width:100%;
      height:100%;
      min-height:198px;
      object-fit:cover;
      display:block;
    }

    .pd-global-card-copy{
      min-width:0;
      padding:23px 18px 19px 20px;
      display:flex;
      flex-direction:column;
      justify-content:center;
    }

    .pd-global-card-title{
      margin:0 0 8px;
      font-family:var(--pd-serif);
      font-size:31px;
      line-height:.96;
      font-weight:700;
      text-transform:uppercase;
    }

    .pd-global-card-description{
      margin:0;
      color:#6c6963;
      font-size:18px;
      line-height:1.25;
      font-weight:400;
    }

    .pd-global-card.active{
      background:#070707;
      color:var(--pd-gold-light);
    }

    .pd-global-card.active .pd-global-card-description{
      color:#fff;
    }

    #pdGlobalContact{
      min-height:60px;
      margin-top:18px;
      display:flex;
      align-items:center;
      justify-content:center;
      border:2px solid #111;
      border-radius:999px;
      color:#111;
      background:transparent;
      text-decoration:none;
      font-weight:900;
    }

    html[dir="rtl"] #pdGlobalMenuBody{
      direction:rtl;
    }

    html[dir="rtl"] #pdGlobalLanguage{
      padding-left:62px;
      padding-right:35px;
    }

    html[dir="rtl"] #pdGlobalLanguageChevron{
      right:auto;
      left:25px;
    }

    html[dir="rtl"] .pd-global-card-copy{
      text-align:right;
    }

    @media(max-width:620px){
      #pdGlobalHeader{
        height:64px;
      }

      #pdGlobalHeaderMain{
        height:64px;
        grid-template-columns:47px minmax(0,1fr) auto;
        padding:0 7px;
      }

      #pdGlobalBrandSmall{
        font-size:6px;
        letter-spacing:2.4px;
      }

      #pdGlobalBrandBig{
        font-size:22px;
        letter-spacing:1.7px;
      }

      #pdGlobalHome,
      #pdGlobalProfile{
        width:36px;
        height:36px;
        flex-basis:36px;
        border-radius:10px;
      }

      #pdGlobalHome svg,
      #pdGlobalProfile svg{
        width:20px;
        height:20px;
      }

      #pdGlobalHeaderActions{
        gap:5px;
      }

      #pdGlobalMenu{
        width:min(552px,90vw);
      }

      #pdGlobalMenuTop{
        min-height:156px;
        padding:31px 20px 26px;
      }

      #pdGlobalMenuTitle{
        font-size:49px;
      }

      #pdGlobalMenuClose{
        width:78px;
        height:78px;
        flex-basis:78px;
      }

      #pdGlobalMenuBody{
        padding:22px 20px 32px;
      }

      #pdGlobalMemberActions{
        gap:12px;
      }

      .pd-global-member-button{
        min-height:87px;
        font-size:18px;
      }

      #pdGlobalLanguage{
        min-height:94px;
        font-size:20px;
      }

      .pd-global-card{
        min-height:202px;
        grid-template-columns:153px minmax(0,1fr);
        border-radius:31px;
      }

      .pd-global-card-image{
        min-height:196px;
      }

      .pd-global-card-copy{
        padding:20px 15px 18px 19px;
      }

      .pd-global-card-title{
        font-size:29px;
      }

      .pd-global-card-description{
        font-size:17px;
      }
    }

    @media(max-width:430px){
      #pdGlobalBrandBig{
        font-size:19px;
      }

      #pdGlobalBrandSmall{
        font-size:5.5px;
      }

      #pdGlobalMenu{
        width:92vw;
      }

      #pdGlobalMenuTop{
        min-height:138px;
        padding:25px 18px;
      }

      #pdGlobalMenuTitle{
        font-size:43px;
      }

      #pdGlobalMenuClose{
        width:66px;
        height:66px;
        flex-basis:66px;
      }

      #pdGlobalMenuBody{
        padding:19px 17px 28px;
      }

      #pdGlobalMemberActions{
        gap:10px;
      }

      .pd-global-member-button{
        min-height:76px;
        font-size:16px;
      }

      #pdGlobalLanguage{
        min-height:82px;
        font-size:18px;
        padding-left:25px;
      }

      .pd-global-card{
        grid-template-columns:125px minmax(0,1fr);
        min-height:176px;
        border-radius:28px;
      }

      .pd-global-card-image{
        min-height:170px;
      }

      .pd-global-card-copy{
        padding:17px 12px 16px 16px;
      }

      .pd-global-card-title{
        font-size:24px;
      }

      .pd-global-card-description{
        font-size:15px;
      }
    }
  `;

  document.head.appendChild(style);
}

function hideExistingShell(){
  const selectors=[
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
    document.querySelectorAll(selector).forEach(element=>{
      if(
        element.id==="pdGlobalHeader"||
        element.id==="pdGlobalMenu"||
        element.id==="pdGlobalOverlay"
      ){
        return;
      }

      element.classList.add("pd-global-old-shell-hidden");
    });
  });
}

function watchForLegacyShell(){
  if(legacyObserver){
    return;
  }

  legacyObserver=new MutationObserver(()=>{
    hideExistingShell();
  });

  legacyObserver.observe(document.body,{
    childList:true,
    subtree:true
  });
} function createHeader(){
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
        href="index.html"
        aria-label="PETS & DOGUE"
      >
        <span id="pdGlobalBrandSmall">PETS &</span>
        <span id="pdGlobalBrandBig">DOGUE</span>
      </a>

      <div id="pdGlobalHeaderActions">

        <a
          id="pdGlobalHome"
          href="index.html"
          aria-label="${escapeHTML(copy.home)}"
          title="${escapeHTML(copy.home)}"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5"></path>
            <path d="M5 9.5V21h14V9.5"></path>
            <path d="M9 21v-7h6v7"></path>
          </svg>
        </a>

        <button
          id="pdGlobalProfile"
          type="button"
          aria-label="${escapeHTML(copy.profile)}"
          title="${escapeHTML(copy.profile)}"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4.5 21c.7-4.2 3.3-6.5 7.5-6.5s6.8 2.3 7.5 6.5"></path>
          </svg>
        </button>

        <div
          id="pdGlobalProfileMenu"
          aria-hidden="true"
        ></div>

      </div>

    </div>
  `;

  document.body.prepend(header);

  document
    .getElementById("pdGlobalMenuButton")
    .addEventListener("click",openMenu);

  document
    .getElementById("pdGlobalProfile")
    .addEventListener("click",event=>{
      event.stopPropagation();
      toggleProfileMenu();
    });

  renderProfileMenu();
}

function createSideMenu(){
  if(document.getElementById("pdGlobalMenu")){
    return;
  }

  const overlay=document.createElement("div");
  overlay.id="pdGlobalOverlay";
  overlay.setAttribute("aria-hidden","true");

  const menu=document.createElement("aside");
  menu.id="pdGlobalMenu";
  menu.setAttribute("aria-hidden","true");

  menu.innerHTML=`
    <div id="pdGlobalMenuTop">
      <h2 id="pdGlobalMenuTitle"></h2>

      <button
        id="pdGlobalMenuClose"
        type="button"
        aria-label=""
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5 19 19"></path>
          <path d="M19 5 5 19"></path>
        </svg>
      </button>
    </div>

    <div id="pdGlobalMenuBody">

      <div id="pdGlobalMemberActions">
        <a
          class="pd-global-member-button"
          id="pdGlobalSignIn"
          href="club.html#signin"
        ></a>

        <a
          class="pd-global-member-button join"
          id="pdGlobalJoinClub"
          href="club.html#join"
        ></a>
      </div>

      <label
        id="pdGlobalLanguageLabel"
        for="pdGlobalLanguage"
      ></label>

      <div id="pdGlobalLanguageWrap">
        <select
          id="pdGlobalLanguage"
          aria-label="Language"
        ></select>

        <span
          id="pdGlobalLanguageChevron"
          aria-hidden="true"
        ></span>
      </div>

      <nav
        id="pdGlobalCards"
        aria-label="PETS & DOGUE sections"
      ></nav>

      <a
        id="pdGlobalContact"
        href="contact.html"
      ></a>

    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(menu);

  overlay.addEventListener("click",closeMenu);

  document
    .getElementById("pdGlobalMenuClose")
    .addEventListener("click",closeMenu);

  document
    .getElementById("pdGlobalLanguage")
    .addEventListener("change",event=>{
      applyLanguage(event.target.value,{
        syncPage:true,
        announce:true
      });
    });
}

function renderProfileMenu(){
  const menu=document.getElementById("pdGlobalProfileMenu");

  if(!menu){
    return;
  }

  const copy=shellCopy();

  menu.innerHTML=`
    <div class="pd-global-profile-title">
      ${escapeHTML(copy.profile)}
    </div>

    <a
      class="pd-global-profile-link"
      href="club.html#signin"
    >
      ${escapeHTML(copy.signIn)}
    </a>

    <a
      class="pd-global-profile-link club"
      href="club.html#join"
    >
      ${escapeHTML(copy.joinClub)}
    </a>
  `;
}

function openProfileMenu(){
  const button=document.getElementById("pdGlobalProfile");
  const menu=document.getElementById("pdGlobalProfileMenu");

  if(!button||!menu){
    return;
  }

  closeMenu();

  menu.classList.add("open");
  menu.setAttribute("aria-hidden","false");
  button.setAttribute("aria-expanded","true");
}

function closeProfileMenu(){
  const button=document.getElementById("pdGlobalProfile");
  const menu=document.getElementById("pdGlobalProfileMenu");

  if(!button||!menu){
    return;
  }

  menu.classList.remove("open");
  menu.setAttribute("aria-hidden","true");
  button.setAttribute("aria-expanded","false");
}

function toggleProfileMenu(){
  const menu=document.getElementById("pdGlobalProfileMenu");

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
  const menu=document.getElementById("pdGlobalMenu");
  const overlay=document.getElementById("pdGlobalOverlay");
  const button=document.getElementById("pdGlobalMenuButton");

  if(!menu||!overlay){
    return;
  }

  closeProfileMenu();

  document.body.classList.add("pd-global-menu-open");

  menu.classList.add("open");
  overlay.classList.add("open");

  menu.setAttribute("aria-hidden","false");
  overlay.setAttribute("aria-hidden","false");

  if(button){
    button.setAttribute("aria-expanded","true");
  }
}

function closeMenu(){
  const menu=document.getElementById("pdGlobalMenu");
  const overlay=document.getElementById("pdGlobalOverlay");
  const button=document.getElementById("pdGlobalMenuButton");

  document.body.classList.remove("pd-global-menu-open");

  if(menu){
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden","true");
  }

  if(overlay){
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden","true");
  }

  if(button){
    button.setAttribute("aria-expanded","false");
  }
}

function renderSideMenu(){
  const copy=shellCopy();

  const title=document.getElementById("pdGlobalMenuTitle");
  const close=document.getElementById("pdGlobalMenuClose");
  const signIn=document.getElementById("pdGlobalSignIn");
  const join=document.getElementById("pdGlobalJoinClub");
  const languageLabel=document.getElementById("pdGlobalLanguageLabel");
  const select=document.getElementById("pdGlobalLanguage");
  const cards=document.getElementById("pdGlobalCards");
  const contact=document.getElementById("pdGlobalContact");

  if(title){
    title.textContent=copy.menu;
  }

  if(close){
    close.setAttribute("aria-label",copy.closeMenu);
  }

  if(signIn){
    signIn.textContent=copy.signIn;
  }

  if(join){
    join.textContent=copy.joinClub;
  }

  if(languageLabel){
    languageLabel.textContent=copy.language;
  }

  if(contact){
    contact.textContent=copy.contact;
  }

  if(select){
    select.innerHTML=LANGUAGE_OPTIONS
      .map(([code,label])=>`
        <option
          value="${escapeHTML(code)}"
          ${code===shellLanguage?"selected":""}
        >
          ${escapeHTML(label)}
        </option>
      `)
      .join("");

    select.setAttribute("aria-label",copy.language);
  }

  if(cards){
    cards.innerHTML=NAV_ITEMS
      .map(item=>{
        const active=item.key===activeKey;

        return `
          <a
            class="pd-global-card${active?" active":""}"
            href="${escapeHTML(item.url)}"
            ${active?'aria-current="page"':""}
          >
            <img
              class="pd-global-card-image"
              src="${escapeHTML(item.image)}"
              alt=""
              loading="lazy"
            >

            <span class="pd-global-card-copy">
              <strong class="pd-global-card-title">
                ${escapeHTML(navName(item))}
              </strong>

              <span class="pd-global-card-description">
                ${escapeHTML(navDescription(item))}
              </span>
            </span>
          </a>
        `;
      })
      .join("");
  }
}

function updateHeaderLanguage(){
  const copy=shellCopy();

  const menuButton=document.getElementById("pdGlobalMenuButton");
  const home=document.getElementById("pdGlobalHome");
  const profile=document.getElementById("pdGlobalProfile");

  if(menuButton){
    menuButton.setAttribute("aria-label",copy.openMenu);
  }

  if(home){
    home.setAttribute("aria-label",copy.home);
    home.setAttribute("title",copy.home);
  }

  if(profile){
    profile.setAttribute("aria-label",copy.profile);
    profile.setAttribute("title",copy.profile);
  }

  renderProfileMenu();
} function valueForExistingSelect(select,language){
  if(!select){
    return "";
  }

  const wanted=normalizeLanguage(language);

  for(const option of Array.from(select.options||[])){
    const optionValue=normalizeLanguage(option.value);

    if(optionValue===wanted){
      return option.value;
    }

    const optionCode=normalizeLanguage(
      option.getAttribute("data-lang")||""
    );

    if(optionCode===wanted){
      return option.value;
    }
  }

  return "";
}

function syncExistingPageLanguage(language){
  if(internalLanguageChange){
    return;
  }

  const existing=findExistingLanguageSelect();

  if(existing){
    const value=valueForExistingSelect(
      existing,
      language
    );

    if(value && existing.value!==value){
      internalLanguageChange=true;

      existing.value=value;

      existing.dispatchEvent(
        new Event("input",{
          bubbles:true
        })
      );

      existing.dispatchEvent(
        new Event("change",{
          bubbles:true
        })
      );

      internalLanguageChange=false;
    }
  }

  document.dispatchEvent(
    new CustomEvent(
      "pets-dogue-language-change",
      {
        detail:{
          language:normalizeLanguage(language),
          source:"global-shell"
        }
      }
    )
  );
}

function refreshShellLanguage(){
  persistLanguage(shellLanguage);
  updateHeaderLanguage();
  renderSideMenu();
}

function applyLanguage(
  language,
  options={}
){
  const code=normalizeLanguage(language);

  if(!supportedLanguage(code)){
    return;
  }

  const changed=code!==shellLanguage;

  persistLanguage(code);
  updateHeaderLanguage();
  renderSideMenu();

  if(options.syncPage!==false){
    syncExistingPageLanguage(code);
  }

  if(
    changed &&
    options.announce!==false
  ){
    window.dispatchEvent(
      new CustomEvent(
        "pets-dogue-global-language",
        {
          detail:{
            language:code
          }
        }
      )
    );
  }
}

function preserveLanguageBeforeNavigation(event){
  const link=event.target.closest("a");

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
    profileMenu &&
    profileButton &&
    !profileMenu.contains(event.target) &&
    !profileButton.contains(event.target)
  ){
    closeProfileMenu();
  }
}

function handleEscape(event){
  if(event.key!=="Escape"){
    return;
  }

  closeProfileMenu();
  closeMenu();
}

function listenForExternalLanguageChanges(){
  document.addEventListener(
    "change",
    event=>{
      if(internalLanguageChange){
        return;
      }

      const target=event.target;

      if(
        !target ||
        target.tagName!=="SELECT" ||
        target.id==="pdGlobalLanguage"
      ){
        return;
      }

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

      if(
        !selectors.some(selector=>{
          try{
            return target.matches(selector);
          }catch(error){
            return false;
          }
        })
      ){
        return;
      }

      const code=normalizeLanguage(target.value);

      if(
        supportedLanguage(code) &&
        code!==shellLanguage
      ){
        applyLanguage(code,{
          syncPage:false,
          announce:false
        });
      }
    }
  );

  document.addEventListener(
    "pets-dogue-language-change",
    event=>{
      const source=event.detail?.source;

      if(source==="global-shell"){
        return;
      }

      const code=normalizeLanguage(
        event.detail?.language||""
      );

      if(
        supportedLanguage(code) &&
        code!==shellLanguage
      ){
        applyLanguage(code,{
          syncPage:false,
          announce:false
        });
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
  updateHeaderLanguage();

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
      applyLanguage(language,{
        syncPage:true,
        announce:true
      });
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
