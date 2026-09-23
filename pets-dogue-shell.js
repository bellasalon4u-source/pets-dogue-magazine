"use strict";

(function () {

  /* =========================================================
     PETS & DOGUE — MASTER GLOBAL SHELL
     FINAL ISSUE 01 BRIDGE FIX
     ========================================================= */

  const LANGUAGE_KEY = "pets_dogue_language";

  const HOME_MASTHEAD_FILE =
    "pets-dogue-header.png?v=20260923-master-shell-final";

  const PET_FRIENDLY_MANIFEST =
    "pet-friendly.webmanifest?v=1";

  const PET_FRIENDLY_SW =
    "pet-friendly-sw.js?v=1";


  /* =========================================================
     LANGUAGES
     ========================================================= */

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

  const SUPPORTED_LANGUAGES =
    new Set(
      LANGUAGE_OPTIONS.map(
        item => item[0]
      )
    );


  /* =========================================================
     ROUTES
     ========================================================= */

  const ROUTES = {
    petFriendly: "pet-friendly-places.html",
    discounts: "special-offers.html",
    help: "pets-in-need.html",
    community: "local-community.html",
    marketplace: "pet-marketplace.html",

    edition: "issue-01.html",
    coverStars: "members-gallery.html",
    contests: "contests.html",
    articles: "articles.html",
    photos: "photos.html",
    fashion: "pet-fashion.html",
    health: "wellness.html",

    advertise: "partners.html"
  };


  const PAGE_KEYS = {

    "pet-friendly-places.html": "petFriendly",

    "special-offers.html": "discounts",

    "pets-in-need.html": "help",
    "rescue.html": "help",
    "help.html": "help",
    "volunteer-network.html": "help",

    "local-community.html": "community",
    "community.html": "community",
    "social.html": "community",
    "events.html": "community",

    "pet-marketplace.html": "marketplace",

    "issue-01.html": "edition",
    "issue-02.html": "edition",
    "magazine.html": "edition",
    "archive.html": "edition",

    "members-gallery.html": "coverStars",
    "cover-stars.html": "coverStars",
    "become-cover-star.html": "coverStars",
    "submit-pet.html": "coverStars",
    "hall-of-fame.html": "coverStars",

    "contests.html": "contests",

    "articles.html": "articles",
    "article.html": "articles",

    "photos.html": "photos",

    "pet-fashion.html": "fashion",

    "wellness.html": "health",
    "health.html": "health",

    "partners.html": "advertise"
  };


  const TOP_KEYS = [
    "petFriendly",
    "discounts",
    "help",
    "community",
    "marketplace"
  ];

  const BOTTOM_KEYS = [
    "edition",
    "coverStars",
    "contests",
    "articles",
    "photos",
    "fashion",
    "health"
  ];

  const MENU_KEYS = [
    "petFriendly",
    "discounts",
    "help",
    "community",
    "marketplace",
    "advertise",
    "edition",
    "coverStars",
    "contests",
    "articles",
    "photos",
    "fashion",
    "health"
  ];


  /* =========================================================
     SIDE MENU IMAGES
     ========================================================= */

  const MENU_IMAGES = {

    petFriendly:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=82",

    discounts:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=82",

    help:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=82",

    community:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=82",

    marketplace:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=82",

    advertise:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=82",

    edition:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=82",

    coverStars:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=82",

    contests:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=82",

    articles:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=82",

    photos:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=82",

    fashion:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=82",

    health:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=82"
  };


  /* =========================================================
     GLOBAL TRANSLATIONS
     ========================================================= */

  const STRINGS = {

    en: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      contents: "Contents",
      profile: "Profile",
      advertise: "Advertise with us",
      language: "Language",
      signIn: "Sign In",
      joinClub: "Join Club",
      home: "Home",

      petFriendly: "Pet-Friendly Places",
      discounts: "Discounts",
      help: "Help",
      community: "Community",
      marketplace: "Marketplace",

      edition: "Edition",
      coverStars: "Cover Stars",
      contests: "Contests",
      articles: "Articles",
      photos: "Photos",
      fashion: "Fashion",
      health: "Health"
    },

    uk: {
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню",
      contents: "Зміст",
      profile: "Профіль",
      advertise: "Реклама у нас",
      language: "Мова",
      signIn: "Увійти",
      joinClub: "Вступити до клубу",
      home: "Головна",

      petFriendly: "Pet-Friendly місця",
      discounts: "Знижки",
      help: "Допомога",
      community: "Спільнота",
      marketplace: "Маркетплейс",

      edition: "Видання",
      coverStars: "Зірки обкладинки",
      contests: "Конкурси",
      articles: "Статті",
      photos: "Фото",
      fashion: "Мода",
      health: "Здоров’я"
    },

    ru: {
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      contents: "Содержание",
      profile: "Профиль",
      advertise: "Реклама у нас",
      language: "Язык",
      signIn: "Войти",
      joinClub: "Вступить в клуб",
      home: "Главная",

      petFriendly: "Pet-Friendly места",
      discounts: "Скидки",
      help: "Помощь",
      community: "Сообщество",
      marketplace: "Маркетплейс",

      edition: "Издание",
      coverStars: "Звёзды обложки",
      contests: "Конкурсы",
      articles: "Статьи",
      photos: "Фото",
      fashion: "Мода",
      health: "Здоровье"
    },

    fr: {
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      contents: "Sommaire",
      profile: "Profil",
      advertise: "Faire de la publicité",
      language: "Langue",
      signIn: "Se connecter",
      joinClub: "Rejoindre le Club",
      home: "Accueil",

      petFriendly: "Lieux pet-friendly",
      discounts: "Réductions",
      help: "Aide",
      community: "Communauté",
      marketplace: "Marketplace",

      edition: "Édition",
      coverStars: "Stars de couverture",
      contests: "Concours",
      articles: "Articles",
      photos: "Photos",
      fashion: "Mode",
      health: "Santé"
    },

    de: {
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      contents: "Inhalt",
      profile: "Profil",
      advertise: "Bei uns werben",
      language: "Sprache",
      signIn: "Anmelden",
      joinClub: "Club beitreten",
      home: "Startseite",

      petFriendly: "Tierfreundliche Orte",
      discounts: "Rabatte",
      help: "Hilfe",
      community: "Community",
      marketplace: "Marktplatz",

      edition: "Edition",
      coverStars: "Cover Stars",
      contests: "Wettbewerbe",
      articles: "Artikel",
      photos: "Fotos",
      fashion: "Mode",
      health: "Gesundheit"
    },

    es: {
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      contents: "Contenido",
      profile: "Perfil",
      advertise: "Anúnciate con nosotros",
      language: "Idioma",
      signIn: "Iniciar sesión",
      joinClub: "Unirse al Club",
      home: "Inicio",

      petFriendly: "Lugares pet-friendly",
      discounts: "Descuentos",
      help: "Ayuda",
      community: "Comunidad",
      marketplace: "Marketplace",

      edition: "Edición",
      coverStars: "Estrellas de portada",
      contests: "Concursos",
      articles: "Artículos",
      photos: "Fotos",
      fashion: "Moda",
      health: "Salud"
    }
  };


  /* =========================================================
     LANGUAGE HELPERS
     ========================================================= */

  function normalizeLanguage(value) {

    if (!value) {
      return "en";
    }

    const clean =
      String(value)
        .toLowerCase()
        .trim()
        .replace("_", "-")
        .split("-")[0];

    return LANGUAGE_ALIASES[clean] || clean;
  }


  function supportedLanguage(value) {

    return SUPPORTED_LANGUAGES.has(
      normalizeLanguage(value)
    );
  }


  function detectLanguage() {

    const candidates = [

      localStorage.getItem(
        LANGUAGE_KEY
      ),

      localStorage.getItem(
        "pd_language"
      ),

      localStorage.getItem(
        "pdLanguage"
      ),

      localStorage.getItem(
        "language"
      ),

      localStorage.getItem(
        "lang"
      ),

      document.documentElement.lang,

      navigator.language,

      "en"
    ];

    for (const candidate of candidates) {

      const normalized =
        normalizeLanguage(candidate);

      if (
        normalized &&
        supportedLanguage(normalized)
      ) {
        return normalized;
      }
    }

    return "en";
  }


  let language =
    detectLanguage();


  function persistLanguage(code) {

    const normalized =
      normalizeLanguage(code);

    language =
      supportedLanguage(normalized)
        ? normalized
        : "en";

    /*
      IMPORTANT:
      Save the same language to BOTH the new Master Shell
      key and the legacy keys used by Issue 01.

      This is the bridge that was missing.
    */

    localStorage.setItem(
      LANGUAGE_KEY,
      language
    );

    localStorage.setItem(
      "pd_language",
      language
    );

    localStorage.setItem(
      "pdLanguage",
      language
    );

    localStorage.setItem(
      "language",
      language
    );

    localStorage.setItem(
      "lang",
      language
    );

    document.documentElement.lang =
      language;

    document.documentElement.dir =
      language === "ar"
        ? "rtl"
        : "ltr";

    return language;
  }


  function copy() {

    const fallback =
      STRINGS.en;

    return {
      ...fallback,
      ...(STRINGS[language] || {})
    };
  }


  /* =========================================================
     PAGE
     ========================================================= */

  function currentFile() {

    const pathname =
      window.location.pathname || "";

    const file =
      pathname
        .split("/")
        .pop()
        .toLowerCase();

    return file || "index.html";
  }


  function detectActiveKey() {

    return (
      PAGE_KEYS[currentFile()] ||
      "edition"
    );
  }


  let activeKey =
    detectActiveKey();


  function esc(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =========================================================
     MASTER STYLE
     ========================================================= */

  function installStyles() {

    if (
      document.getElementById(
        "pdMasterShellStyles"
      )
    ) {
      return;
    }

    const style =
      document.createElement("style");

    style.id =
      "pdMasterShellStyles";

    style.textContent = `

      :root{
        --pd-black:#070707;
        --pd-white:#ffffff;
        --pd-gold:#c99a32;
        --pd-green:#66df22;
        --pd-red:#ef3340;
        --pd-shell-height:174px;
      }

      html{
        scroll-behavior:smooth;
      }

      body{
        margin:0;
      }

      body.pd-shell-lock{
        overflow:hidden !important;
      }

      #pdLuxuryHeader,
      #pdLuxuryHeader *{
        box-sizing:border-box;
      }

      #pdLuxuryHeader{
        position:sticky;
        top:0;
        z-index:99990;

        width:100%;

        background:var(--pd-black);
        color:#fff;

        transform:translateY(0);
        transition:
          transform .22s ease,
          opacity .22s ease;

        box-shadow:
          0 1px 0 rgba(201,154,50,.65);
      }

      #pdLuxuryHeader.pd-header-hidden{
        transform:translateY(-100%);
      }

      .pd-shell-mainbar{
        min-height:82px;

        display:grid;
        grid-template-columns:
          auto
          minmax(0,1fr)
          auto
          auto
          auto;

        align-items:center;
        gap:12px;

        padding:
          12px
          max(14px,env(safe-area-inset-right))
          12px
          max(14px,env(safe-area-inset-left));

        border-bottom:
          1px solid rgba(201,154,50,.55);
      }

      #pdLuxuryMenuButton{
        width:52px;
        height:52px;

        padding:0;

        border:0;
        background:transparent;
        color:#fff;

        cursor:pointer;
      }

      #pdLuxuryMenuButton span{
        display:block;

        width:42px;
        height:4px;

        margin:7px auto;

        border-radius:99px;

        background:#fff;
      }

      .pd-shell-brand{
        min-width:0;

        font-family:
          Georgia,
          "Times New Roman",
          serif;

        font-size:
          clamp(21px,4.4vw,32px);

        line-height:1;

        color:#d3a44c;

        white-space:nowrap;
      }

      #pdLuxuryHome{
        width:48px;
        height:48px;

        display:flex;
        align-items:center;
        justify-content:center;

        border:
          1px solid rgba(255,255,255,.28);

        border-radius:13px;

        color:#fff;

        text-decoration:none;

        font-size:29px;
      }

      #pdLuxuryAdvertise{
        min-height:43px;

        display:flex;
        align-items:center;
        justify-content:center;

        padding:0 14px;

        border:
          3px solid #d82f38;

        border-radius:999px;

        color:#fff;

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size:13px;
        font-weight:800;

        text-decoration:none;

        white-space:nowrap;
      }

      .pd-shell-profile-wrap{
        position:relative;
      }

      #pdLuxuryProfileButton{
        min-height:48px;

        display:flex;
        align-items:center;
        justify-content:center;
        gap:7px;

        padding:0 5px;

        border:0;

        background:transparent;
        color:#fff;

        cursor:pointer;

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size:13px;
        font-weight:800;
      }

      .pd-profile-icon{
        width:28px;
        height:28px;

        position:relative;

        display:inline-block;
      }

      .pd-profile-icon::before{
        content:"";

        position:absolute;

        width:12px;
        height:12px;

        left:8px;
        top:1px;

        border:3px solid #fff;
        border-radius:50%;
      }

      .pd-profile-icon::after{
        content:"";

        position:absolute;

        width:24px;
        height:14px;

        left:2px;
        bottom:0;

        border:
          3px solid #fff;

        border-bottom:0;

        border-radius:
          16px
          16px
          0
          0;
      }

      #pdLuxuryProfileMenu{
        position:absolute;

        right:0;
        top:58px;

        width:210px;

        display:none;

        padding:12px;

        background:#fff;
        color:#111;

        border-radius:14px;

        box-shadow:
          0 10px 35px rgba(0,0,0,.3);
      }

      #pdLuxuryProfileMenu.open{
        display:block;
      }

      #pdLuxuryProfileMenu a{
        display:block;

        padding:12px;

        color:#111;

        text-decoration:none;

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-weight:700;
      }

      .pd-shell-row{
        display:flex;

        align-items:center;

        gap:7px;

        overflow-x:auto;
        overflow-y:hidden;

        padding:
          7px
          14px;

        scrollbar-width:none;

        -webkit-overflow-scrolling:touch;
      }

      .pd-shell-row::-webkit-scrollbar{
        display:none;
      }

      .pd-shell-row + .pd-shell-row{
        border-top:
          1px solid rgba(201,154,50,.65);
      }

      .pd-shell-nav-link{
        flex:0 0 auto;

        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:6px;

        min-height:37px;

        padding:
          0
          13px;

        border:
          1px solid transparent;

        border-radius:999px;

        color:#fff;

        text-decoration:none;

        font-family:
          Georgia,
          "Times New Roman",
          serif;

        font-size:
          clamp(15px,3.7vw,20px);

        white-space:nowrap;
      }

      .pd-shell-nav-link.active{
        border-color:var(--pd-gold);
      }

      .pd-shell-nav-link.petFriendly{
        border-color:#59d42a;
      }

      .pd-shell-nav-link.help .pd-special-icon{
        color:#ff2f72;
      }

      #pdShellOverlay{
        position:fixed;
        inset:0;

        z-index:99996;

        visibility:hidden;
        opacity:0;

        background:
          rgba(0,0,0,.64);

        transition:
          opacity .2s ease,
          visibility .2s ease;
      }

      #pdShellOverlay.open{
        visibility:visible;
        opacity:1;
      }

      #pdShellMenu{
        position:fixed;

        z-index:99997;

        top:0;
        left:0;
        bottom:0;

        width:
          min(92vw,430px);

        transform:
          translateX(-102%);

        background:#fff;
        color:#111;

        box-shadow:
          12px
          0
          40px
          rgba(0,0,0,.32);

        transition:
          transform .25s ease;
      }

      html[dir="rtl"] #pdShellMenu{
        left:auto;
        right:0;

        transform:
          translateX(102%);
      }

      #pdShellMenu.open{
        transform:
          translateX(0);
      }

      .pd-shell-menu-head{
        min-height:76px;

        display:flex;
        align-items:center;
        justify-content:space-between;

        padding:12px 17px;

        background:#050505;
        color:#fff;
      }

      .pd-shell-menu-head h2{
        margin:0;

        font-family:
          Georgia,
          "Times New Roman",
          serif;

        font-size:28px;
      }

      #pdShellClose{
        width:46px;
        height:46px;

        border:
          1px solid rgba(255,255,255,.28);

        border-radius:50%;

        background:#151515;
        color:#fff;

        font-size:32px;
        line-height:1;

        cursor:pointer;
      }

      .pd-shell-menu-scroll{
        height:
          calc(100% - 76px);

        overflow-y:auto;

        padding:
          17px
          15px
          30px;
      }

      .pd-shell-account{
        display:grid;

        grid-template-columns:
          1fr
          1fr;

        gap:10px;

        margin-bottom:20px;
      }

      .pd-shell-account a{
        min-height:48px;

        display:flex;
        align-items:center;
        justify-content:center;

        border:
          1px solid #111;

        border-radius:8px;

        color:#111;

        text-decoration:none;

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-weight:800;
      }

      .pd-shell-account a.club{
        border-color:#67df27;

        background:#67df27;
      }

      .pd-shell-language-label{
        display:block;

        margin-bottom:7px;

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size:12px;
        font-weight:900;

        letter-spacing:.12em;
      }

      #pdShellLanguage{
        width:100%;
        min-height:49px;

        margin-bottom:18px;

        padding:0 12px;

        border:
          1px solid #b9b9b9;

        border-radius:7px;

        background:#fff;
        color:#111;

        font-size:16px;
      }

      #pdShellCards{
        display:grid;
        gap:10px;
      }

      .pd-shell-card{
        min-height:84px;

        display:grid;

        grid-template-columns:
          105px
          minmax(0,1fr);

        overflow:hidden;

        border:
          1px solid #dedede;

        border-radius:9px;

        background:#fff;
        color:#111;

        text-decoration:none;
      }

      .pd-shell-card.active{
        border:
          2px solid var(--pd-gold);
      }

      .pd-shell-card-image{
        overflow:hidden;
        background:#eee;
      }

      .pd-shell-card-image img{
        width:100%;
        height:100%;

        min-height:84px;

        display:block;

        object-fit:cover;
      }

      .pd-shell-card-copy{
        display:flex;

        align-items:center;

        padding:12px 14px;
      }

      .pd-shell-card-copy h3{
        margin:0;

        font-family:
          Georgia,
          "Times New Roman",
          serif;

        font-size:18px;
      }

      .pd-shell-card-copy .inline{
        display:flex;

        align-items:center;

        gap:8px;
      }

      @media(max-width:720px){

        .pd-shell-mainbar{
          grid-template-columns:
            auto
            minmax(0,1fr)
            auto
            auto;
        }

        #pdLuxuryAdvertise{
          grid-column:auto;
        }

        .pd-luxury-profile-label{
          display:none;
        }

        #pdLuxuryProfileButton{
          width:42px;
          padding:0;
        }

        .pd-shell-brand{
          font-size:21px;
        }

        #pdLuxuryAdvertise{
          padding:0 10px;
          font-size:11px;
        }
      }

      @media(max-width:480px){

        .pd-shell-mainbar{
          gap:7px;
          padding-left:8px;
          padding-right:8px;
        }

        #pdLuxuryMenuButton{
          width:43px;
        }

        #pdLuxuryMenuButton span{
          width:34px;
          height:3px;
          margin:6px auto;
        }

        .pd-shell-brand{
          font-size:18px;
        }

        #pdLuxuryHome{
          width:42px;
          height:42px;
          font-size:24px;
        }

        #pdLuxuryAdvertise{
          min-height:38px;
          padding:0 8px;
          font-size:10px;
        }
      }

    `;

    document.head.appendChild(
      style
    );
  }


  /* =========================================================
     REMOVE ONLY LEGACY GLOBAL SHELLS
     DO NOT TOUCH ISSUE CONTENT
     ========================================================= */

  function hideLegacy() {

    const selectors = [
      ".global-header",
      ".site-header",
      ".main-header",
      "#globalHeader",
      "#siteHeader"
    ];

    selectors.forEach(
      selector => {

        document
          .querySelectorAll(selector)
          .forEach(element => {

            if (
              !element.closest(
                "#pdLuxuryHeader"
              )
            ) {
              element.style.display =
                "none";
            }
          });
      }
    );
  }


  /* =========================================================
     NAV LABEL
     ========================================================= */

  function labelFor(key) {

    const text =
      copy();

    return (
      text[key] ||
      STRINGS.en[key] ||
      key
    );
  }


  function specialIcon(key) {

    if (key === "petFriendly") {
      return `<span class="pd-special-icon">🐾</span>`;
    }

    if (key === "help") {
      return `<span class="pd-special-icon">♥</span>`;
    }

    return "";
  }


  /* =========================================================
     HEADER
     ========================================================= */

  function createHeader() {

    if (
      document.getElementById(
        "pdLuxuryHeader"
      )
    ) {
      return;
    }

    const header =
      document.createElement("header");

    header.id =
      "pdLuxuryHeader";

    header.innerHTML = `

      <div class="pd-shell-mainbar">

        <button
          id="pdLuxuryMenuButton"
          type="button"
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <a
          class="pd-shell-brand"
          href="index.html"
          aria-label="PETS & DOGUE"
        >
          PETS &amp; DOGUE
        </a>

        <a
          id="pdLuxuryHome"
          href="index.html"
          aria-label="Home"
        >
          ⌂
        </a>

        <a
          id="pdLuxuryAdvertise"
          href="${ROUTES.advertise}"
        >
          Advertise with us
        </a>

        <div class="pd-shell-profile-wrap">

          <button
            id="pdLuxuryProfileButton"
            type="button"
            aria-expanded="false"
          >
            <span
              class="pd-profile-icon"
              aria-hidden="true"
            ></span>

            <span
              class="pd-luxury-profile-label"
            >
              Profile
            </span>
          </button>

          <div
            id="pdLuxuryProfileMenu"
            aria-hidden="true"
          >
            <a href="account.html">
              Sign In
            </a>

            <a href="club.html">
              Join Club
            </a>
          </div>

        </div>

      </div>

      <nav
        id="pdShellTopRow"
        class="pd-shell-row"
        aria-label="Primary sections"
      ></nav>

      <nav
        id="pdShellBottomRow"
        class="pd-shell-row"
        aria-label="Editorial sections"
      ></nav>

    `;

    document.body.insertBefore(
      header,
      document.body.firstChild
    );


    document
      .getElementById(
        "pdLuxuryMenuButton"
      )
      .addEventListener(
        "click",
        openSideMenu
      );


    document
      .getElementById(
        "pdLuxuryProfileButton"
      )
      .addEventListener(
        "click",
        event => {

          event.stopPropagation();

          toggleProfile();
        }
      );


    renderRows();
    renderProfile();
  }


  function renderRows() {

    const top =
      document.getElementById(
        "pdShellTopRow"
      );

    const bottom =
      document.getElementById(
        "pdShellBottomRow"
      );

    if (!top || !bottom) {
      return;
    }

    function render(keys) {

      return keys
        .map(key => {

          const active =
            key === activeKey;

          return `

            <a
              class="
                pd-shell-nav-link
                ${esc(key)}
                ${active ? "active" : ""}
              "
              href="${esc(ROUTES[key])}"
              ${active ? 'aria-current="page"' : ""}
            >

              ${specialIcon(key)}

              <span>
                ${esc(labelFor(key))}
              </span>

            </a>

          `;
        })
        .join("");
    }

    top.innerHTML =
      render(TOP_KEYS);

    bottom.innerHTML =
      render(BOTTOM_KEYS);
  }


  function renderProfile() {

    const text =
      copy();

    const button =
      document.getElementById(
        "pdLuxuryProfileButton"
      );

    const label =
      button?.querySelector(
        ".pd-luxury-profile-label"
      );

    if (button) {

      button.setAttribute(
        "aria-label",
        text.profile
      );
    }

    if (label) {

      label.textContent =
        text.profile;
    }

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    if (menu) {

      menu.innerHTML = `

        <a href="account.html">
          ${esc(text.signIn)}
        </a>

        <a href="club.html">
          ${esc(text.joinClub)}
        </a>

      `;
    }
  }  /* =========================================================
     SIDE MENU
     ========================================================= */

  function createSideMenu() {

    if (
      !document.getElementById(
        "pdShellOverlay"
      )
    ) {

      const overlay =
        document.createElement("div");

      overlay.id =
        "pdShellOverlay";

      overlay.addEventListener(
        "click",
        closeSideMenu
      );

      document.body.appendChild(
        overlay
      );
    }


    if (
      !document.getElementById(
        "pdShellMenu"
      )
    ) {

      const menu =
        document.createElement("aside");

      menu.id =
        "pdShellMenu";

      menu.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.appendChild(
        menu
      );
    }

    renderSideMenu();
  }


  function renderSideMenu() {

    const menu =
      document.getElementById(
        "pdShellMenu"
      );

    if (!menu) {
      return;
    }

    const text =
      copy();

    const cards =
      MENU_KEYS
        .map(key => {

          const active =
            key === activeKey;

          return `

            <a
              class="
                pd-shell-card
                ${active ? "active" : ""}
              "
              href="${esc(ROUTES[key])}"
              ${active ? 'aria-current="page"' : ""}
            >

              <span
                class="pd-shell-card-image"
              >

                <img
                  src="${esc(MENU_IMAGES[key] || "")}"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerpolicy="no-referrer"
                >

              </span>

              <span
                class="pd-shell-card-copy"
              >

                <h3>

                  <span class="inline">

                    ${specialIcon(key)}

                    <span>
                      ${esc(labelFor(key))}
                    </span>

                  </span>

                </h3>

              </span>

            </a>

          `;
        })
        .join("");


    menu.innerHTML = `

      <div class="pd-shell-menu-head">

        <h2>
          ${esc(text.contents)}
        </h2>

        <button
          id="pdShellClose"
          type="button"
          aria-label="${esc(text.closeMenu)}"
        >
          ×
        </button>

      </div>


      <div class="pd-shell-menu-scroll">

        <div class="pd-shell-account">

          <a href="account.html">
            ${esc(text.signIn)}
          </a>

          <a
            class="club"
            href="club.html"
          >
            ${esc(text.joinClub)}
          </a>

        </div>


        <label
          class="pd-shell-language-label"
          for="pdShellLanguage"
        >
          ${esc(text.language)}
        </label>


        <select
          id="pdShellLanguage"
          aria-label="${esc(text.language)}"
        >

          ${
            LANGUAGE_OPTIONS
              .map(
                ([code, label]) =>
                  `<option
                    value="${esc(code)}"
                    ${language === code ? "selected" : ""}
                  >
                    ${esc(label)}
                  </option>`
              )
              .join("")
          }

        </select>


        <nav
          id="pdShellCards"
          aria-label="PETS & DOGUE contents"
        >
          ${cards}
        </nav>

      </div>

    `;


    document
      .getElementById(
        "pdShellClose"
      )
      ?.addEventListener(
        "click",
        closeSideMenu
      );


    /*
      IMPORTANT:
      This is now the ONE master language selector.

      It changes:
      - Master Shell
      - Issue 01
      - localStorage
      - html lang
      - RTL
    */

    document
      .getElementById(
        "pdShellLanguage"
      )
      ?.addEventListener(
        "change",
        event => {

          applyLanguage(
            event.target.value
          );
        }
      );
  }


  function openSideMenu() {

    closeProfile();
    showHeader();

    const menu =
      document.getElementById(
        "pdShellMenu"
      );

    const overlay =
      document.getElementById(
        "pdShellOverlay"
      );

    if (!menu || !overlay) {
      return;
    }

    menu.classList.add(
      "open"
    );

    overlay.classList.add(
      "open"
    );

    menu.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "pd-shell-lock"
    );
  }


  function closeSideMenu() {

    const menu =
      document.getElementById(
        "pdShellMenu"
      );

    const overlay =
      document.getElementById(
        "pdShellOverlay"
      );

    if (!menu || !overlay) {
      return;
    }

    menu.classList.remove(
      "open"
    );

    overlay.classList.remove(
      "open"
    );

    menu.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "pd-shell-lock"
    );
  }


  /* =========================================================
     PROFILE
     ========================================================= */

  function openProfile() {

    showHeader();

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    const button =
      document.getElementById(
        "pdLuxuryProfileButton"
      );

    if (!menu || !button) {
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


  function closeProfile() {

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    const button =
      document.getElementById(
        "pdLuxuryProfileButton"
      );

    if (!menu || !button) {
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


  function toggleProfile() {

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    if (!menu) {
      return;
    }

    if (
      menu.classList.contains(
        "open"
      )
    ) {
      closeProfile();
    } else {
      openProfile();
    }
  }


  /* =========================================================
     LANGUAGE BRIDGE
     ========================================================= */

  function notifyLanguageConsumers(
    code
  ) {

    /*
      Issue 01 currently listens for these
      legacy events.
    */

    document.dispatchEvent(
      new CustomEvent(
        "pd:languagechange",
        {
          detail: {
            language: code,
            lang: code,
            code: code
          }
        }
      )
    );


    document.dispatchEvent(
      new CustomEvent(
        "pd-language-change",
        {
          detail: {
            language: code,
            lang: code,
            code: code
          }
        }
      )
    );


    /*
      New global event.
    */

    window.dispatchEvent(
      new CustomEvent(
        "petsdogue:languagechange",
        {
          detail: {
            language: code,
            source: "master-shell"
          }
        }
      )
    );


    /*
      Direct bridge to Issue 01.

      This makes the page change language immediately,
      even if an old event listener is missing.
    */

    if (
      window.PD_MISO_EDITION &&
      typeof
        window.PD_MISO_EDITION
          .setLanguage ===
        "function"
    ) {

      try {

        window.PD_MISO_EDITION
          .setLanguage(code);

      } catch (error) {

        console.warn(
          "PETS & DOGUE Issue 01 language bridge:",
          error
        );
      }
    }


    /*
      Other older pages.
    */

    if (
      window.PetsDogueLanguage
    ) {

      const functions = [
        "setLanguage",
        "changeLanguage",
        "selectLanguage"
      ];

      for (
        const functionName
        of functions
      ) {

        if (
          typeof
            window.PetsDogueLanguage[
              functionName
            ] ===
          "function"
        ) {

          try {

            window.PetsDogueLanguage[
              functionName
            ](code);

          } catch (error) {}

          break;
        }
      }
    }


    if (
      typeof
        window.renderLanguage ===
      "function"
    ) {

      try {

        window.renderLanguage(
          code
        );

      } catch (error) {}
    }
  }


  function applyLanguage(code) {

    const applied =
      persistLanguage(code);

    refreshText();

    notifyLanguageConsumers(
      applied
    );
  }


  function refreshText() {

    const text =
      copy();


    document
      .getElementById(
        "pdLuxuryMenuButton"
      )
      ?.setAttribute(
        "aria-label",
        text.openMenu
      );


    document
      .getElementById(
        "pdLuxuryHome"
      )
      ?.setAttribute(
        "aria-label",
        text.home
      );


    const advertise =
      document.getElementById(
        "pdLuxuryAdvertise"
      );

    if (advertise) {

      advertise.textContent =
        text.advertise;
    }


    renderRows();
    renderProfile();
    renderSideMenu();
  }


  /* =========================================================
     ISSUE 01 READY BRIDGE
     ========================================================= */

  document.addEventListener(
    "pd:edition-ready",
    function () {

      /*
        Issue script may finish after the shell.
        Send the selected language again once the
        editorial content announces itself ready.
      */

      window.setTimeout(
        function () {

          notifyLanguageConsumers(
            language
          );

        },
        0
      );
    }
  );


  /* =========================================================
     LANGUAGE STORAGE SYNC
     ========================================================= */

  window.addEventListener(
    "storage",
    event => {

      const acceptedKeys = [
        LANGUAGE_KEY,
        "pd_language",
        "pdLanguage",
        "language",
        "lang"
      ];

      if (
        !acceptedKeys.includes(
          event.key
        )
      ) {
        return;
      }

      const next =
        normalizeLanguage(
          event.newValue || "en"
        );

      if (
        !supportedLanguage(next)
      ) {
        return;
      }

      language =
        next;

      document.documentElement.lang =
        language;

      document.documentElement.dir =
        language === "ar"
          ? "rtl"
          : "ltr";

      refreshText();

      notifyLanguageConsumers(
        language
      );
    }
  );


  /* =========================================================
     HEADER SCROLL
     ========================================================= */

  let lastY =
    Math.max(
      0,
      window.scrollY || 0
    );

  let lastDirection =
    0;

  let accumulated =
    0;

  let ticking =
    false;


  function showHeader() {

    document
      .getElementById(
        "pdLuxuryHeader"
      )
      ?.classList.remove(
        "pd-header-hidden"
      );
  }


  function hideHeader() {

    document
      .getElementById(
        "pdLuxuryHeader"
      )
      ?.classList.add(
        "pd-header-hidden"
      );
  }


  function sideMenuOpen() {

    return document
      .getElementById(
        "pdShellMenu"
      )
      ?.classList.contains(
        "open"
      );
  }


  function handleScroll() {

    if (ticking) {
      return;
    }

    ticking =
      true;

    requestAnimationFrame(
      () => {

        const y =
          Math.max(
            0,
            window.scrollY || 0
          );

        const delta =
          y - lastY;

        const direction =
          delta > 0
            ? 1
            : delta < 0
              ? -1
              : 0;


        const profileOpen =
          document
            .getElementById(
              "pdLuxuryProfileMenu"
            )
            ?.classList.contains(
              "open"
            );


        if (
          y <= 8 ||
          sideMenuOpen() ||
          profileOpen
        ) {

          showHeader();

          accumulated =
            0;

        } else if (direction) {

          if (
            direction !==
            lastDirection
          ) {

            accumulated =
              0;
          }


          accumulated +=
            Math.abs(delta);


          /*
            User-approved behaviour:

            scrolling DOWN:
            header disappears

            scrolling UP:
            header returns
          */

          if (
            direction > 0 &&
            accumulated >= 16
          ) {

            hideHeader();

            accumulated =
              0;

          } else if (
            direction < 0 &&
            accumulated >= 8
          ) {

            showHeader();

            accumulated =
              0;
          }


          lastDirection =
            direction;
        }


        lastY =
          y;

        ticking =
          false;
      }
    );
  }


  /* =========================================================
     DOCUMENT EVENTS
     ========================================================= */

  function handleDocumentClick(
    event
  ) {

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    const button =
      document.getElementById(
        "pdLuxuryProfileButton"
      );

    if (
      menu?.classList.contains(
        "open"
      ) &&
      !menu.contains(
        event.target
      ) &&
      !button?.contains(
        event.target
      )
    ) {

      closeProfile();
    }
  }


  function handleEscape(
    event
  ) {

    if (
      event.key ===
      "Escape"
    ) {

      closeProfile();
      closeSideMenu();
    }
  }


  /* =========================================================
     MASTER INITIALISATION
     ========================================================= */

  function init() {

    /*
      Do not initialise twice.
    */

    if (
      document.documentElement
        .dataset
        .petsDogueMasterShell ===
      "1"
    ) {
      return;
    }


    document.documentElement
      .dataset
      .petsDogueMasterShell =
      "1";


    /*
      Preserve selected language.
    */

    persistLanguage(
      detectLanguage()
    );


    activeKey =
      detectActiveKey();


    /*
      Build the approved global shell.
    */

    installStyles();

    hideLegacy();

    createHeader();

    createSideMenu();

    showHeader();


    /*
      Global interaction.
    */

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true
      }
    );


    window.addEventListener(
      "resize",
      showHeader,
      {
        passive: true
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


    /*
      Public API.
    */

    window.PetsDogueHeader = {

      show:
        showHeader,

      hide:
        hideHeader,

      openMenu:
        openSideMenu,

      closeMenu:
        closeSideMenu,

      refreshLanguage:
        applyLanguage,

      setLanguage:
        applyLanguage

    };


    /*
      Synchronise Issue 01 after all scripts
      on the current event loop have had a chance
      to initialise.
    */

    window.setTimeout(
      function () {

        notifyLanguageConsumers(
          language
        );

      },
      0
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();
  }

})();


/* =========================================================
   PETS & DOGUE — GLOBAL MISO HELP

   IMPORTANT:
   The Ask Miso circle remains independent.
   We do NOT recreate or redesign it here.
   We only load the existing approved component.
   ========================================================= */

(function () {

  "use strict";


  if (
    window.__PETS_DOGUE_HELP_LOADER__
  ) {
    return;
  }


  window.__PETS_DOGUE_HELP_LOADER__ =
    true;


  function loadPetsDogueHelp() {

    if (
      document.querySelector(
        'script[data-pets-dogue-help="true"]'
      )
    ) {
      return;
    }


    const script =
      document.createElement(
        "script"
      );


    script.src =
      "pets-dogue-help.js?v=20260923-master-shell-final";


    script.defer =
      true;


    script.dataset
      .petsDogueHelp =
      "true";


    script.addEventListener(
      "error",
      function () {

        console.warn(
          "PETS & DOGUE Help could not be loaded."
        );
      }
    );


    document.head.appendChild(
      script
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      loadPetsDogueHelp,
      {
        once: true
      }
    );

  } else {

    loadPetsDogueHelp();
  }

})();
