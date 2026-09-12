"use strict";

(function () {
  const LANGUAGE_KEY = "pets_dogue_language";

  const LANGUAGE_ALIASES = {
    ua: "uk",
    cz: "cs",
    gr: "el",
    se: "sv",
    dk: "da"
  };

  const LANGUAGE_OPTIONS = [
    ["en", "🇬🇧 EN — English"],
    ["uk", "🇺🇦 UA — Українська"],
    ["ru", "🇷🇺 RU — Русский"],
    ["fr", "🇫🇷 FR — Français"],
    ["de", "🇩🇪 DE — Deutsch"],
    ["es", "🇪🇸 ES — Español"],
    ["it", "🇮🇹 IT — Italiano"],
    ["pt", "🇵🇹 PT — Português"],
    ["nl", "🇳🇱 NL — Nederlands"],
    ["pl", "🇵🇱 PL — Polski"],
    ["cs", "🇨🇿 CZ — Čeština"],
    ["sk", "🇸🇰 SK — Slovenčina"],
    ["hu", "🇭🇺 HU — Magyar"],
    ["ro", "🇷🇴 RO — Română"],
    ["bg", "🇧🇬 BG — Български"],
    ["el", "🇬🇷 GR — Ελληνικά"],
    ["sv", "🇸🇪 SE — Svenska"],
    ["da", "🇩🇰 DK — Dansk"],
    ["no", "🇳🇴 NO — Norsk"],
    ["fi", "🇫🇮 FI — Suomi"],
    ["tr", "🇹🇷 TR — Türkçe"],
    ["ar", "🇸🇦 AR — العربية"],
    ["hi", "🇮🇳 HI — हिन्दी"]
  ];

  const I18N = {
    en: {
      menu: "Contents",
      signIn: "Sign In",
      joinClub: "Join Club",
      language: "Language",
      contact: "Contact us",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      home: "Home",
      nav: [
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
        "Help",
        "Partners"
      ]
    },
    uk: {
      menu: "Зміст",
      signIn: "Увійти",
      joinClub: "Вступити до клубу",
      language: "Мова",
      contact: "Зв’язатися з нами",
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню",
      home: "Головна",
      nav: [
        "Видання",
        "Зірки обкладинки",
        "Знижки",
        "Pet-Friendly Places",
        "Маркетплейс",
        "Подорожі",
        "Мода",
        "Здоров’я",
        "Статті",
        "Фото",
        "Спільнота",
        "Конкурси",
        "Допомога",
        "Партнери"
      ]
    },
    ru: {
      menu: "Содержание",
      signIn: "Войти",
      joinClub: "Подписаться",
      language: "Язык",
      contact: "Связаться с нами",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      home: "Главная",
      nav: [
        "Издание",
        "Звёзды обложки",
        "Скидки",
        "Pet-Friendly Places",
        "Маркетплейс",
        "Путешествия",
        "Мода",
        "Здоровье",
        "Статьи",
        "Фото",
        "Сообщество",
        "Конкурсы",
        "Помощь",
        "Партнёры"
      ]
    },
    fr: {
      menu: "Sommaire",
      signIn: "Connexion",
      joinClub: "Rejoindre le Club",
      language: "Langue",
      contact: "Nous contacter",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      home: "Accueil",
      nav: [
        "Édition",
        "Stars de couverture",
        "Réductions",
        "Lieux pet-friendly",
        "Marketplace",
        "Voyage",
        "Mode",
        "Santé",
        "Articles",
        "Photos",
        "Communauté",
        "Concours",
        "Aide",
        "Partenaires"
      ]
    },
    de: {
      menu: "Inhalt",
      signIn: "Anmelden",
      joinClub: "Club beitreten",
      language: "Sprache",
      contact: "Kontakt",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      home: "Startseite",
      nav: [
        "Ausgabe",
        "Cover Stars",
        "Rabatte",
        "Pet-Friendly Orte",
        "Marktplatz",
        "Reisen",
        "Mode",
        "Gesundheit",
        "Artikel",
        "Fotos",
        "Community",
        "Wettbewerbe",
        "Hilfe",
        "Partner"
      ]
    },
    es: {
      menu: "Contenido",
      signIn: "Iniciar sesión",
      joinClub: "Únete al Club",
      language: "Idioma",
      contact: "Contáctanos",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      home: "Inicio",
      nav: [
        "Edición",
        "Estrellas de portada",
        "Descuentos",
        "Lugares pet-friendly",
        "Marketplace",
        "Viajes",
        "Moda",
        "Salud",
        "Artículos",
        "Fotos",
        "Comunidad",
        "Concursos",
        "Ayuda",
        "Socios"
      ]
    },
    it: {
      menu: "Contenuti",
      signIn: "Accedi",
      joinClub: "Unisciti al Club",
      language: "Lingua",
      contact: "Contattaci",
      openMenu: "Apri menu",
      closeMenu: "Chiudi menu",
      home: "Home",
      nav: [
        "Edizione",
        "Cover Stars",
        "Sconti",
        "Luoghi pet-friendly",
        "Marketplace",
        "Viaggi",
        "Moda",
        "Salute",
        "Articoli",
        "Foto",
        "Community",
        "Concorsi",
        "Aiuto",
        "Partner"
      ]
    },
    pt: {
      menu: "Conteúdo",
      signIn: "Entrar",
      joinClub: "Entrar no Club",
      language: "Idioma",
      contact: "Contacte-nos",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      home: "Início",
      nav: [
        "Edição",
        "Estrelas da capa",
        "Descontos",
        "Locais pet-friendly",
        "Marketplace",
        "Viagens",
        "Moda",
        "Saúde",
        "Artigos",
        "Fotos",
        "Comunidade",
        "Concursos",
        "Ajuda",
        "Parceiros"
      ]
    },
    nl: {
      menu: "Inhoud",
      signIn: "Inloggen",
      joinClub: "Word lid",
      language: "Taal",
      contact: "Contact",
      openMenu: "Menu openen",
      closeMenu: "Menu sluiten",
      home: "Home",
      nav: [
        "Editie",
        "Coversterren",
        "Kortingen",
        "Pet-friendly plekken",
        "Marktplaats",
        "Reizen",
        "Mode",
        "Gezondheid",
        "Artikelen",
        "Foto’s",
        "Community",
        "Wedstrijden",
        "Hulp",
        "Partners"
      ]
    },
    pl: {
      menu: "Spis treści",
      signIn: "Zaloguj się",
      joinClub: "Dołącz do klubu",
      language: "Język",
      contact: "Kontakt",
      openMenu: "Otwórz menu",
      closeMenu: "Zamknij menu",
      home: "Strona główna",
      nav: [
        "Wydanie",
        "Gwiazdy okładki",
        "Zniżki",
        "Miejsca pet-friendly",
        "Marketplace",
        "Podróże",
        "Moda",
        "Zdrowie",
        "Artykuły",
        "Zdjęcia",
        "Społeczność",
        "Konkursy",
        "Pomoc",
        "Partnerzy"
      ]
    },
    cs: {
      menu: "Obsah",
      signIn: "Přihlásit se",
      joinClub: "Vstoupit do klubu",
      language: "Jazyk",
      contact: "Kontaktujte nás",
      openMenu: "Otevřít menu",
      closeMenu: "Zavřít menu",
      home: "Domů",
      nav: [
        "Vydání",
        "Hvězdy obálky",
        "Slevy",
        "Pet-friendly místa",
        "Marketplace",
        "Cestování",
        "Móda",
        "Zdraví",
        "Články",
        "Fotografie",
        "Komunita",
        "Soutěže",
        "Pomoc",
        "Partneři"
      ]
    },
    sk: {
      menu: "Obsah",
      signIn: "Prihlásiť sa",
      joinClub: "Vstúpiť do klubu",
      language: "Jazyk",
      contact: "Kontaktujte nás",
      openMenu: "Otvoriť menu",
      closeMenu: "Zavrieť menu",
      home: "Domov",
      nav: [
        "Vydanie",
        "Hviezdy obálky",
        "Zľavy",
        "Pet-friendly miesta",
        "Marketplace",
        "Cestovanie",
        "Móda",
        "Zdravie",
        "Články",
        "Fotografie",
        "Komunita",
        "Súťaže",
        "Pomoc",
        "Partneri"
      ]
    },
    hu: {
      menu: "Tartalom",
      signIn: "Belépés",
      joinClub: "Csatlakozás",
      language: "Nyelv",
      contact: "Kapcsolat",
      openMenu: "Menü megnyitása",
      closeMenu: "Menü bezárása",
      home: "Kezdőlap",
      nav: [
        "Kiadás",
        "Címlapsztárok",
        "Kedvezmények",
        "Pet-friendly helyek",
        "Piactér",
        "Utazás",
        "Divat",
        "Egészség",
        "Cikkek",
        "Fotók",
        "Közösség",
        "Versenyek",
        "Segítség",
        "Partnerek"
      ]
    },
    ro: {
      menu: "Conținut",
      signIn: "Autentificare",
      joinClub: "Intră în Club",
      language: "Limbă",
      contact: "Contactați-ne",
      openMenu: "Deschide meniul",
      closeMenu: "Închide meniul",
      home: "Acasă",
      nav: [
        "Ediție",
        "Vedete de copertă",
        "Reduceri",
        "Locuri pet-friendly",
        "Marketplace",
        "Călătorii",
        "Modă",
        "Sănătate",
        "Articole",
        "Fotografii",
        "Comunitate",
        "Concursuri",
        "Ajutor",
        "Parteneri"
      ]
    },
    bg: {
      menu: "Съдържание",
      signIn: "Вход",
      joinClub: "Влезте в клуба",
      language: "Език",
      contact: "Свържете се с нас",
      openMenu: "Отвори менюто",
      closeMenu: "Затвори менюто",
      home: "Начало",
      nav: [
        "Издание",
        "Звезди на корицата",
        "Отстъпки",
        "Pet-friendly места",
        "Маркетплейс",
        "Пътуване",
        "Мода",
        "Здраве",
        "Статии",
        "Снимки",
        "Общност",
        "Конкурси",
        "Помощ",
        "Партньори"
      ]
    },
    el: {
      menu: "Περιεχόμενα",
      signIn: "Σύνδεση",
      joinClub: "Εγγραφή στο Club",
      language: "Γλώσσα",
      contact: "Επικοινωνία",
      openMenu: "Άνοιγμα μενού",
      closeMenu: "Κλείσιμο μενού",
      home: "Αρχική",
      nav: [
        "Έκδοση",
        "Αστέρια εξωφύλλου",
        "Εκπτώσεις",
        "Pet-friendly μέρη",
        "Marketplace",
        "Ταξίδια",
        "Μόδα",
        "Υγεία",
        "Άρθρα",
        "Φωτογραφίες",
        "Κοινότητα",
        "Διαγωνισμοί",
        "Βοήθεια",
        "Συνεργάτες"
      ]
    },
    sv: {
      menu: "Innehåll",
      signIn: "Logga in",
      joinClub: "Gå med i klubben",
      language: "Språk",
      contact: "Kontakta oss",
      openMenu: "Öppna meny",
      closeMenu: "Stäng meny",
      home: "Hem",
      nav: [
        "Utgåva",
        "Omslagsstjärnor",
        "Rabatter",
        "Pet-friendly platser",
        "Marknadsplats",
        "Resor",
        "Mode",
        "Hälsa",
        "Artiklar",
        "Foton",
        "Community",
        "Tävlingar",
        "Hjälp",
        "Partners"
      ]
    },
    da: {
      menu: "Indhold",
      signIn: "Log ind",
      joinClub: "Bliv medlem",
      language: "Sprog",
      contact: "Kontakt os",
      openMenu: "Åbn menu",
      closeMenu: "Luk menu",
      home: "Hjem",
      nav: [
        "Udgave",
        "Forsidestjerner",
        "Rabatter",
        "Pet-friendly steder",
        "Markedsplads",
        "Rejser",
        "Mode",
        "Sundhed",
        "Artikler",
        "Fotos",
        "Fællesskab",
        "Konkurrencer",
        "Hjælp",
        "Partnere"
      ]
    },
    no: {
      menu: "Innhold",
      signIn: "Logg inn",
      joinClub: "Bli med i klubben",
      language: "Språk",
      contact: "Kontakt oss",
      openMenu: "Åpne meny",
      closeMenu: "Lukk meny",
      home: "Hjem",
      nav: [
        "Utgave",
        "Forsidestjerner",
        "Rabatter",
        "Pet-friendly steder",
        "Markedsplass",
        "Reiser",
        "Mote",
        "Helse",
        "Artikler",
        "Bilder",
        "Fellesskap",
        "Konkurranser",
        "Hjelp",
        "Partnere"
      ]
    },
    fi: {
      menu: "Sisältö",
      signIn: "Kirjaudu",
      joinClub: "Liity klubiin",
      language: "Kieli",
      contact: "Ota yhteyttä",
      openMenu: "Avaa valikko",
      closeMenu: "Sulje valikko",
      home: "Etusivu",
      nav: [
        "Numero",
        "Kansitähdet",
        "Alennukset",
        "Pet-friendly paikat",
        "Markkinapaikka",
        "Matkailu",
        "Muoti",
        "Terveys",
        "Artikkelit",
        "Kuvat",
        "Yhteisö",
        "Kilpailut",
        "Apua",
        "Kumppanit"
      ]
    },
    tr: {
      menu: "İçindekiler",
      signIn: "Giriş yap",
      joinClub: "Kulübe katıl",
      language: "Dil",
      contact: "Bize ulaşın",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      home: "Ana sayfa",
      nav: [
        "Sürüm",
        "Kapak yıldızları",
        "İndirimler",
        "Pet-friendly yerler",
        "Pazar yeri",
        "Seyahat",
        "Moda",
        "Sağlık",
        "Makaleler",
        "Fotoğraflar",
        "Topluluk",
        "Yarışmalar",
        "Yardım",
        "Ortaklar"
      ]
    },
    ar: {
      menu: "المحتويات",
      signIn: "تسجيل الدخول",
      joinClub: "انضم إلى النادي",
      language: "اللغة",
      contact: "اتصل بنا",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      home: "الرئيسية",
      nav: [
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
        "المساعدة",
        "الشركاء"
      ]
    },
    hi: {
      menu: "विषय-सूची",
      signIn: "लॉग इन",
      joinClub: "क्लब से जुड़ें",
      language: "भाषा",
      contact: "संपर्क करें",
      openMenu: "मेनू खोलें",
      closeMenu: "मेनू बंद करें",
      home: "होम",
      nav: [
        "एडिशन",
        "कवर स्टार्स",
        "छूट",
        "Pet-Friendly Places",
        "मार्केटप्लेस",
        "यात्रा",
        "फैशन",
        "स्वास्थ्य",
        "लेख",
        "फ़ोटो",
        "समुदाय",
        "प्रतियोगिताएँ",
        "मदद",
        "पार्टनर्स"
      ]
    }
  };

  const NAV_ITEMS = [
    {
      key: "magazine",
      url: "issue-01.html",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "coverStars",
      url: "members-gallery.html",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "discounts",
      url: "special-offers.html",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "petFriendly",
      url: "pet-friendly-places.html",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "marketplace",
      url: "pet-marketplace.html",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "travel",
      url: "pet-travel.html",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "fashion",
      url: "pet-fashion.html",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "health",
      url: "wellness.html",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "articles",
      url: "articles.html",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "photos",
      url: "photos.html",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "community",
      url: "local-community.html",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "contests",
      url: "contests.html",
      image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "animalHelp",
      url: "pets-in-need.html",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80"
    },
    {
      key: "partners",
      url: "partners.html",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80"
    }
  ];

  const NAV_ORDER = [
    "magazine",
    "coverStars",
    "discounts",
    "petFriendly",
    "marketplace",
    "travel",
    "fashion",
    "health",
    "articles",
    "photos",
    "community",
    "contests",
    "animalHelp",
    "partners"
  ];

  const NAV_INDEX = {
    magazine: 0,
    coverStars: 1,
    discounts: 2,
    petFriendly: 3,
    marketplace: 4,
    travel: 5,
    fashion: 6,
    health: 7,
    articles: 8,
    photos: 9,
    community: 10,
    contests: 11,
    animalHelp: 12,
    partners: 13
  };

  const PAGE_KEYS = {
    "index.html": "",
    "issue-01.html": "magazine",
    "issue-02.html": "magazine",
    "magazine.html": "magazine",
    "archive.html": "magazine",

    "members-gallery.html": "coverStars",
    "cover-stars.html": "coverStars",
    "become-cover-star.html": "coverStars",
    "submit-pet.html": "coverStars",
    "hall-of-fame.html": "coverStars",

    "special-offers.html": "discounts",

    "pet-friendly-places.html": "petFriendly",

    "pet-marketplace.html": "marketplace",

    "pet-travel.html": "travel",
    "travel.html": "travel",

    "pet-fashion.html": "fashion",

    "wellness.html": "health",
    "health.html": "health",

    "articles.html": "articles",
    "article.html": "articles",

    "photos.html": "photos",

    "local-community.html": "community",
    "community.html": "community",
    "social.html": "community",
    "events.html": "community",

    "contests.html": "contests",

    "pets-in-need.html": "animalHelp",
    "rescue.html": "animalHelp",
    "help.html": "animalHelp",
    "volunteer-network.html": "animalHelp",

    "partners.html": "partners"
  };

  let shellLanguage = "en";
  let activeKey = "";
  let observer = null;
  let internalLanguageChange = false;
  let lastY = Math.max(0, window.scrollY || 0);
  let ticking = false;
  let direction = 0;
  let accumulated = 0;

  function normalizeLanguage(value) {
    const raw = String(value || "").trim().toLowerCase().replace("_", "-");
    if (!raw) return "";
    const base = raw.split("-")[0];
    return LANGUAGE_ALIASES[base] || base;
  }

  function supportedLanguage(value) {
    return Object.prototype.hasOwnProperty.call(I18N, normalizeLanguage(value));
  }

  function currentFile() {
    const file = (window.location.pathname || "").split("/").filter(Boolean).pop();
    return (file || "index.html").toLowerCase();
  }

  function detectActiveKey() {
    const file = currentFile();
    if (PAGE_KEYS[file] !== undefined) return PAGE_KEYS[file];

    const path = (window.location.pathname || "").toLowerCase();
    for (const [name, key] of Object.entries(PAGE_KEYS)) {
      if (path.includes(name.replace(".html", ""))) return key;
    }
    return "";
  }

  function findExistingLanguageSelect() {
    const selectors = [
      "#pdLanguageSelect",
      "#headerLanguageSelect",
      "#languageSelect",
      "#language",
      "#langSelect",
      "select[data-language-select]",
      "select[name='language']",
      "select[name='lang']"
    ];

    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el && el.id !== "pdGlobalLanguage") return el;
    }

    return null;
  }

  function detectInitialLanguage() {
    try {
      const saved = normalizeLanguage(localStorage.getItem(LANGUAGE_KEY) || "");
      if (saved && supportedLanguage(saved)) return saved;
    } catch (error) {}

    const existing = findExistingLanguageSelect();
    if (existing) {
      const code = normalizeLanguage(existing.value);
      if (supportedLanguage(code)) return code;
    }

    const htmlLang = normalizeLanguage(document.documentElement.lang || "");
    return supportedLanguage(htmlLang) ? htmlLang : "en";
  }

  function persistLanguage(language) {
    const code = normalizeLanguage(language);
    if (!supportedLanguage(code)) return;

    shellLanguage = code;

    try {
      localStorage.setItem(LANGUAGE_KEY, code);
    } catch (error) {}

    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
  }

  function t() {
    return I18N[shellLanguage] || I18N.en;
  }

  function navLabel(key) {
    const idx = NAV_INDEX[key];
    return t().nav[idx] || I18N.en.nav[idx] || key;
  }

  function navItem(key) {
    return NAV_ITEMS.find((item) => item.key === key) || null;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function installStyles() {
    document.getElementById("pdGlobalShellStyles")?.remove();

    const style = document.createElement("style");
    style.id = "pdGlobalShellStyles";
    style.textContent = `
      :root{
        --pd-black:#050505;
        --pd-black-soft:#0b0b0b;
        --pd-white:#ffffff;
        --pd-cream:#f7f4ed;
        --pd-gold:#c69b45;
        --pd-gold-soft:#ecd088;
        --pd-border:rgba(255,255,255,.10);
        --pd-border-soft:rgba(255,255,255,.07);
        --pd-line:rgba(198,155,69,.26);
        --pd-green:#65e51f;
        --pd-scarlet:#ff3a54;
        --pd-serif:Georgia,"Times New Roman",serif;
        --pd-sans:Arial,Helvetica,sans-serif;
      }

      .pd-global-old-shell-hidden{
        display:none !important;
      }

      body.pd-global-menu-open{
        overflow:hidden !important;
      }

      #pdGlobalHeader{
        position:fixed;
        inset:0 0 auto 0;
        z-index:14000;
        background:var(--pd-black);
        color:var(--pd-white);
        font-family:var(--pd-sans);
        border-bottom:1px solid var(--pd-border-soft);
        box-shadow:0 8px 24px rgba(0,0,0,.16);
        transform:translateY(0);
        transition:transform .24s cubic-bezier(.2,.75,.2,1);
        will-change:transform;
      }

      #pdGlobalHeader.pd-global-header-hidden{
        transform:translateY(-101%);
      }

      #pdGlobalHeaderSpacer{
        height:0;
        width:100%;
        pointer-events:none;
      }

      #pdGlobalHeaderMain{
        min-height:84px;
        display:grid;
        grid-template-columns:52px 1fr 52px;
        align-items:center;
        gap:10px;
        padding:10px 18px;
        background:var(--pd-black);
        border-bottom:1px solid var(--pd-line);
      }

      #pdGlobalMenuButton{
        width:44px;
        height:44px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        gap:6px;
        padding:6px 0;
        background:transparent;
        border:0;
        color:var(--pd-white);
        cursor:pointer;
      }

      #pdGlobalMenuButton span{
        display:block;
        width:38px;
        height:3px;
        border-radius:999px;
        background:var(--pd-white);
      }

      #pdGlobalBrand{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        text-decoration:none;
        line-height:.86;
        white-space:nowrap;
        color:var(--pd-gold);
        font-family:var(--pd-serif);
      }

      #pdGlobalBrandSmall{
        display:block;
        margin-bottom:4px;
        font-size:8px;
        letter-spacing:4px;
        text-transform:uppercase;
        color:var(--pd-gold);
      }

      #pdGlobalBrandBig{
        display:block;
        font-size:30px;
        letter-spacing:1.5px;
        color:var(--pd-gold);
      }

      #pdGlobalHome{
        justify-self:end;
        width:42px;
        height:42px;
        display:flex;
        align-items:center;
        justify-content:center;
        text-decoration:none;
        color:var(--pd-white);
        background:transparent;
        border:0;
      }

      #pdGlobalHome svg{
        width:33px;
        height:33px;
        fill:none;
        stroke:currentColor;
        stroke-width:2.1;
        stroke-linecap:round;
        stroke-linejoin:round;
      }

      #pdGlobalNavWrap{
        position:relative;
        background:#080808;
        border-bottom:1px solid var(--pd-border-soft);
      }

      #pdGlobalNav{
        display:flex;
        align-items:center;
        gap:0;
        overflow-x:auto;
        overflow-y:hidden;
        white-space:nowrap;
        scrollbar-width:none;
        -ms-overflow-style:none;
        -webkit-overflow-scrolling:touch;
      }

      #pdGlobalNav::-webkit-scrollbar{
        display:none;
      }

      .pd-global-nav-link{
        position:relative;
        flex:0 0 auto;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-height:52px;
        padding:0 18px;
        color:var(--pd-white);
        text-decoration:none;
        font-size:11px;
        font-weight:800;
        letter-spacing:.5px;
        text-transform:uppercase;
        border-right:1px solid var(--pd-border);
      }

      .pd-global-nav-link:last-child{
        border-right:0;
      }

      .pd-global-nav-link.active{
        color:var(--pd-white);
      }

      .pd-global-nav-link.active::after{
        content:"";
        position:absolute;
        left:12px;
        right:12px;
        bottom:0;
        height:3px;
        background:linear-gradient(90deg,#9f751f 0%,#f1d98b 50%,#9f751f 100%);
      }

      #pdGlobalMenu{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        z-index:15100;
        width:min(78vw,390px);
        min-width:286px;
        max-width:390px;
        background:var(--pd-cream);
        color:#111;
        font-family:var(--pd-sans);
        display:flex;
        flex-direction:column;
        overflow:hidden;
        transform:translateX(-102%);
        transition:transform .25s ease;
        box-shadow:18px 0 48px rgba(0,0,0,.28);
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

      #pdGlobalOverlay{
        position:fixed;
        inset:0;
        z-index:15000;
        background:rgba(0,0,0,.68);
        opacity:0;
        visibility:hidden;
        pointer-events:none;
        transition:.22s ease;
      }

      #pdGlobalOverlay.open{
        opacity:1;
        visibility:visible;
        pointer-events:auto;
      }

      .pd-global-menu-head{
        height:86px;
        min-height:86px;
        padding:0 17px;
        background:#050505;
        color:#fff;
        display:flex;
        align-items:center;
        justify-content:space-between;
      }

      .pd-global-menu-head h2{
        margin:0;
        font:normal 31px/1 var(--pd-serif);
      }

      #pdGlobalClose{
        width:43px;
        height:43px;
        border-radius:50%;
        border:1px solid #575757;
        background:transparent;
        color:#fff;
        font-size:28px;
        line-height:1;
        display:flex;
        align-items:center;
        justify-content:center;
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
        min-height:48px;
        border:2px solid #171717;
        border-radius:999px;
        background:#fff;
        color:#111;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        text-decoration:none;
        padding:8px 10px;
        font-size:12px;
        font-weight:900;
      }

      .pd-global-account a.club{
        background:var(--pd-green);
        border-color:var(--pd-green);
      }

      .pd-global-language-label{
        display:block;
        margin:0 3px 6px;
        color:#777;
        font-size:9px;
        font-weight:900;
        letter-spacing:1.5px;
        text-transform:uppercase;
      }

      #pdGlobalLanguage{
        width:100%;
        height:51px;
        margin:0 0 12px;
        padding:0 15px;
        border:2px solid #1b1b1b;
        border-radius:999px;
        background:#fff;
        color:#111;
        font-size:14px;
        font-weight:800;
        outline:0;
      }

      #pdGlobalMenuList{
        display:grid;
        gap:7px;
      }

      .pd-global-menu-card{
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
        background:#090909;
        color:#fff;
      }

      .pd-global-menu-card-image{
        width:82px;
        min-height:82px;
        display:block;
        background:#ddd;
        overflow:hidden;
      }

      .pd-global-menu-card img{
        width:82px;
        height:100%;
        min-height:82px;
        display:block;
        object-fit:cover;
      }

      .pd-global-menu-card-copy{
        min-width:0;
        padding:10px 11px;
        display:flex;
        align-items:center;
      }

      .pd-global-menu-card h3{
        margin:0;
        font:700 19px/1.05 var(--pd-serif);
      }

      .pd-global-menu-card.active h3{
        color:var(--pd-gold-soft);
      }

      .pd-global-menu-card.pd-menu-partners{
        box-shadow:inset 0 0 0 2px var(--pd-scarlet);
        border-color:transparent;
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
        text-decoration:none;
        font-size:12px;
        font-weight:900;
      }

      #pdGlobalMenuButton:focus-visible,
      #pdGlobalClose:focus-visible,
      #pdGlobalHome:focus-visible,
      #pdGlobalLanguage:focus-visible,
      .pd-global-menu-card:focus-visible,
      .pd-global-account a:focus-visible,
      .pd-global-menu-footer a:focus-visible,
      .pd-global-nav-link:focus-visible{
        outline:3px solid var(--pd-green);
        outline-offset:2px;
      }

      @media (max-width: 640px){
        #pdGlobalHeaderMain{
          min-height:78px;
          padding:10px 14px;
          grid-template-columns:46px 1fr 46px;
        }

        #pdGlobalMenuButton{
          width:40px;
          height:40px;
        }

        #pdGlobalMenuButton span{
          width:34px;
          height:3px;
        }

        #pdGlobalBrandSmall{
          font-size:7px;
          letter-spacing:3px;
        }

        #pdGlobalBrandBig{
          font-size:28px;
          letter-spacing:1.3px;
        }

        #pdGlobalHome{
          width:40px;
          height:40px;
        }

        #pdGlobalHome svg{
          width:31px;
          height:31px;
        }

        .pd-global-nav-link{
          min-height:50px;
          padding:0 16px;
          font-size:10px;
        }
      }

      @media (max-width: 420px){
        #pdGlobalHeaderMain{
          min-height:74px;
          padding:9px 12px;
          gap:8px;
        }

        #pdGlobalBrandBig{
          font-size:26px;
        }

        .pd-global-nav-link{
          min-height:48px;
          padding:0 14px;
        }
      }

      @media (min-width: 900px){
        #pdGlobalHeaderMain,
        #pdGlobalNav{
          max-width:1500px;
          margin:auto;
        }
      }

      @media (prefers-reduced-motion: reduce){
        #pdGlobalHeader,
        #pdGlobalMenu,
        #pdGlobalOverlay{
          transition:none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function hideExistingShell() {
    const selectors = [
      "body > .account-bar",
      "body > header:not(#pdGlobalHeader)",
      "body > .site-header",
      "body > .pd-topbar",
      "#pdMasterHeader",
      ".pd-master-header",
      "#pdShellMenu",
      "#pdShellOverlay",
      "#sideMenu:not(#pdGlobalMenu)",
      "#menuOverlay:not(#pdGlobalOverlay)",
      ".side-menu:not(#pdGlobalMenu)",
      ".menu-overlay:not(#pdGlobalOverlay)",
      ".pd-menu-overlay:not(#pdGlobalOverlay)",
      ".pd-drawer:not(#pdGlobalMenu)",
      "#categoryNav",
      ".pd-primary-nav",
      ".pd-secondary-nav",
      ".mobile-topbar",
      ".mobile-nav"
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (["pdGlobalHeader", "pdGlobalMenu", "pdGlobalOverlay"].includes(el.id)) return;
        el.classList.add("pd-global-old-shell-hidden");
      });
    });
  }

  function watchLegacyShell() {
    if (observer) return;
    observer = new MutationObserver(hideExistingShell);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function renderNav() {
    const nav = document.getElementById("pdGlobalNav");
    if (!nav) return;

    nav.innerHTML = NAV_ORDER.map((key) => {
      const active = key === activeKey;
      const item = navItem(key);
      return `
        <a
          class="pd-global-nav-link${active ? " active" : ""}"
          href="${escapeHTML(item?.url || "index.html")}"
          data-pd-nav="${escapeHTML(key)}"
          ${active ? 'aria-current="page"' : ""}
          aria-label="${escapeHTML(navLabel(key))}"
        >
          <span>${escapeHTML(navLabel(key))}</span>
        </a>
      `;
    }).join("");
  }

  function createHeader() {
    if (document.getElementById("pdGlobalHeader")) return;

    const copy = t();

    const header = document.createElement("header");
    header.id = "pdGlobalHeader";
    header.innerHTML = `
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
          <span id="pdGlobalBrandSmall">PETS &amp;</span>
          <span id="pdGlobalBrandBig">DOGUE</span>
        </a>

        <a id="pdGlobalHome" href="index.html" aria-label="${escapeHTML(copy.home)}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"></path>
          </svg>
        </a>
      </div>

      <div id="pdGlobalNavWrap">
        <nav id="pdGlobalNav" aria-label="PETS & DOGUE sections"></nav>
      </div>
    `;

    const spacer = document.createElement("div");
    spacer.id = "pdGlobalHeaderSpacer";

    document.body.insertBefore(spacer, document.body.firstChild);
    document.body.insertBefore(header, spacer);

    document.getElementById("pdGlobalMenuButton")?.addEventListener("click", openMenu);

    renderNav();
    requestAnimationFrame(syncHeaderSpacer);
  }

  function syncHeaderSpacer() {
    const header = document.getElementById("pdGlobalHeader");
    const spacer = document.getElementById("pdGlobalHeaderSpacer");
    if (!header || !spacer) return;

    spacer.style.height = `${Math.ceil(header.getBoundingClientRect().height)}px`;
  }

  function createSideMenu() {
    if (document.getElementById("pdGlobalMenu")) return;

    const overlay = document.createElement("div");
    overlay.id = "pdGlobalOverlay";

    const menu = document.createElement("aside");
    menu.id = "pdGlobalMenu";
    menu.setAttribute("aria-hidden", "true");

    document.body.appendChild(overlay);
    document.body.appendChild(menu);

    overlay.addEventListener("click", closeMenu);
  }

  function renderSideMenu() {
    const menu = document.getElementById("pdGlobalMenu");
    if (!menu) return;

    const copy = t();
    const wasOpen = menu.classList.contains("open");
    const oldScroll = menu.querySelector(".pd-global-menu-scroll")?.scrollTop || 0;

    const cards = NAV_ORDER.map((key) => {
      const item = navItem(key);
      const active = key === activeKey;
      const isPartners = key === "partners";

      return `
        <a
          class="pd-global-menu-card${active ? " active" : ""}${isPartners ? " pd-menu-partners" : ""}"
          href="${escapeHTML(item?.url || "index.html")}"
          data-pd-nav="${escapeHTML(key)}"
          ${active ? 'aria-current="page"' : ""}
        >
          <span class="pd-global-menu-card-image">
            <img
              src="${escapeHTML(item?.image || "")}"
              alt=""
              loading="lazy"
              decoding="async"
              referrerpolicy="no-referrer"
            >
          </span>
          <span class="pd-global-menu-card-copy">
            <h3>${escapeHTML(navLabel(key))}</h3>
          </span>
        </a>
      `;
    }).join("");

    menu.innerHTML = `
      <div class="pd-global-menu-head">
        <h2>${escapeHTML(copy.menu)}</h2>
        <button id="pdGlobalClose" type="button" aria-label="${escapeHTML(copy.closeMenu)}">×</button>
      </div>

      <div class="pd-global-menu-scroll">
        <div class="pd-global-account">
          <a href="account.html">${escapeHTML(copy.signIn)}</a>
          <a class="club" href="club.html">${escapeHTML(copy.joinClub)}</a>
        </div>

        <label class="pd-global-language-label" for="pdGlobalLanguage">${escapeHTML(copy.language)}</label>

        <select id="pdGlobalLanguage" aria-label="${escapeHTML(copy.language)}">
          ${LANGUAGE_OPTIONS.map(([code, label]) => `
            <option value="${escapeHTML(code)}" ${code === shellLanguage ? "selected" : ""}>
              ${escapeHTML(label)}
            </option>
          `).join("")}
        </select>

        <nav id="pdGlobalMenuList" aria-label="PETS & DOGUE menu">
          ${cards}
        </nav>

        <div class="pd-global-menu-footer">
          <a href="contact.html">${escapeHTML(copy.contact)}</a>
        </div>
      </div>
    `;

    document.getElementById("pdGlobalClose")?.addEventListener("click", closeMenu);
    document.getElementById("pdGlobalLanguage")?.addEventListener("change", (event) => {
      applyLanguage(event.target.value, { syncPage: true, announce: true });
    });

    if (wasOpen) {
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      requestAnimationFrame(() => {
        const scroll = menu.querySelector(".pd-global-menu-scroll");
        if (scroll) scroll.scrollTop = oldScroll;
      });
    }
  }

  function openMenu() {
    const menu = document.getElementById("pdGlobalMenu");
    const overlay = document.getElementById("pdGlobalOverlay");
    if (!menu || !overlay) return;

    menu.classList.add("open");
    overlay.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    document.getElementById("pdGlobalMenuButton")?.setAttribute("aria-expanded", "true");
    document.body.classList.add("pd-global-menu-open");
    showHeader();
  }

  function closeMenu() {
    const menu = document.getElementById("pdGlobalMenu");
    const overlay = document.getElementById("pdGlobalOverlay");
    if (!menu || !overlay) return;

    menu.classList.remove("open");
    overlay.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    document.getElementById("pdGlobalMenuButton")?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("pd-global-menu-open");
  }

  function showHeader() {
    document.getElementById("pdGlobalHeader")?.classList.remove("pd-global-header-hidden");
  }

  function hideHeader() {
    document.getElementById("pdGlobalHeader")?.classList.add("pd-global-header-hidden");
  }

  function handleScroll() {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      const current = Math.max(0, window.scrollY || 0);
      const delta = current - lastY;
      const dir = delta > 0 ? 1 : delta < 0 ? -1 : 0;
      const menuOpen = document.getElementById("pdGlobalMenu")?.classList.contains("open");

      if (current <= 10 || menuOpen) {
        showHeader();
        accumulated = 0;
      } else if (dir) {
        if (dir !== direction) accumulated = 0;
        accumulated += Math.abs(delta);

        if (dir > 0 && accumulated >= 18) {
          hideHeader();
          accumulated = 0;
        } else if (dir < 0 && accumulated >= 10) {
          showHeader();
          accumulated = 0;
        }

        direction = dir;
      }

      lastY = current;
      ticking = false;
    });
  }

  function valueForExistingSelect(select, language) {
    const reverse = { uk: "ua", cs: "cz", el: "gr", sv: "se", da: "dk" };
    const candidates = [language, reverse[language]].filter(Boolean);

    for (const candidate of candidates) {
      const exact = Array.from(select.options || []).find((option) => option.value === candidate);
      if (exact) return exact.value;
    }

    const normalized = Array.from(select.options || []).find(
      (option) => normalizeLanguage(option.value) === language
    );

    return normalized ? normalized.value : "";
  }

  function syncExistingPageLanguage(language) {
    const code = normalizeLanguage(language);
    if (!supportedLanguage(code)) return false;

    let handled = false;

    if (window.PetsDogueLanguage) {
      const controller = window.PetsDogueLanguage;
      for (const setter of ["setLanguage", "changeLanguage", "selectLanguage"]) {
        if (typeof controller[setter] === "function") {
          try {
            controller[setter](code);
            handled = true;
          } catch (error) {}
          break;
        }
      }
    }

    if (!handled && typeof window.renderLanguage === "function") {
      try {
        window.renderLanguage(code);
        handled = true;
      } catch (error) {}
    }

    const existing = findExistingLanguageSelect();
    if (existing) {
      const value = valueForExistingSelect(existing, code);
      if (value && existing.value !== value) {
        try {
          existing.value = value;
          existing.dispatchEvent(new Event("change", { bubbles: true }));
          handled = true;
        } catch (error) {}
      }
    }

    return handled;
  }

  function updateShellText() {
    const copy = t();

    document.getElementById("pdGlobalMenuButton")?.setAttribute("aria-label", copy.openMenu);
    document.getElementById("pdGlobalHome")?.setAttribute("aria-label", copy.home);

    renderNav();
    renderSideMenu();

    requestAnimationFrame(syncHeaderSpacer);
  }

  function applyLanguage(language, { syncPage = true, announce = true } = {}) {
    const code = normalizeLanguage(language);
    if (!supportedLanguage(code)) return;

    internalLanguageChange = true;
    persistLanguage(code);

    if (syncPage) syncExistingPageLanguage(code);
    updateShellText();

    if (announce) {
      window.dispatchEvent(
        new CustomEvent("petsdogue:languagechange", {
          detail: { language: code, source: "global-shell" }
        })
      );
    }

    setTimeout(() => {
      internalLanguageChange = false;
    }, 0);
  }

  function listenForExternalLanguageChanges() {
    window.addEventListener("petsdogue:languagechange", (event) => {
      if (internalLanguageChange) return;

      const code = normalizeLanguage(event?.detail?.language || "");
      if (code && supportedLanguage(code) && code !== shellLanguage) {
        persistLanguage(code);
        updateShellText();
      }
    });

    window.addEventListener("storage", (event) => {
      if (event.key !== LANGUAGE_KEY) return;
      const code = normalizeLanguage(event.newValue || "");
      if (code && supportedLanguage(code) && code !== shellLanguage) {
        persistLanguage(code);
        updateShellText();
      }
    });
  }

  function init() {
    if (document.documentElement.dataset.petsDogueGlobalShell === "5") return;
    document.documentElement.dataset.petsDogueGlobalShell = "5";

    activeKey = detectActiveKey();
    shellLanguage = detectInitialLanguage();

    persistLanguage(shellLanguage);
    installStyles();
    hideExistingShell();
    createHeader();
    createSideMenu();
    renderSideMenu();
    updateShellText();
    watchLegacyShell();
    listenForExternalLanguageChanges();
    showHeader();
    syncHeaderSpacer();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        syncHeaderSpacer();
        showHeader();
      },
      { passive: true }
    );

    window.PetsDogueShell = {
      getLanguage() {
        return shellLanguage;
      },
      setLanguage(language) {
        applyLanguage(language, { syncPage: true, announce: true });
      },
      openMenu,
      closeMenu,
      showHeader,
      hideHeader
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
