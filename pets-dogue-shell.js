"use strict";

(function () {
  const LANGUAGE_KEY = "pets_dogue_language";

  const HOME_MASTHEAD_FILE =
    "pets-dogue-header.png?v=20260913-global-shell-1";

  const PET_FRIENDLY_MANIFEST =
    "pet-friendly.webmanifest?v=1";

  const PET_FRIENDLY_SW =
    "pet-friendly-sw.js?v=1";

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

  const MENU_IMAGES = {
    petFriendly:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80",

    discounts:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",

    help:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80",

    community:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80",

    marketplace:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80",

    advertise:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80",

    edition:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=600&q=80",

    coverStars:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80",

    contests:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=600&q=80",

    articles:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=600&q=80",

    photos:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",

    fashion:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",

    health:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80"
  };

  const COPY = {

    en: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      contents: "Contents",
      profile: "Profile",
      advertise: "Advertise with us",
      language: "Language",
      signIn: "Sign In",
      joinClub: "Join Club",

      installCta: "Add Pet-Friendly to Home Screen",
      installTitle: "Keep Pet-Friendly close",
      installText:
        "Add Pet-Friendly Places to your home screen so it is always one tap away.",
      installNow: "Add now",
      later: "Later",
      iosHint:
        "On iPhone: tap Share, then choose Add to Home Screen.",

      labels: {
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
      }
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

      installCta:
        "Додати Pet-Friendly на головний екран",
      installTitle:
        "Тримайте Pet-Friendly під рукою",
      installText:
        "Додайте Pet-Friendly Places на головний екран, щоб відкривати його одним дотиком.",
      installNow: "Додати",
      later: "Пізніше",
      iosHint:
        "На iPhone: натисніть Share, потім Add to Home Screen.",

      labels: {
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
      }
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

      installCta:
        "Добавить Pet-Friendly на главный экран",
      installTitle:
        "Держите Pet-Friendly под рукой",
      installText:
        "Добавьте Pet-Friendly Places на главный экран, чтобы открывать раздел в один тап.",
      installNow: "Добавить",
      later: "Позже",
      iosHint:
        "На iPhone: нажмите Share, затем Add to Home Screen.",

      labels: {
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
      }
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

      installCta:
        "Ajouter Pet-Friendly à l’écran d’accueil",
      installTitle:
        "Gardez Pet-Friendly à portée de main",
      installText:
        "Ajoutez Pet-Friendly Places à votre écran d’accueil pour y accéder en un geste.",
      installNow: "Ajouter",
      later: "Plus tard",
      iosHint:
        "Sur iPhone : touchez Partager, puis Ajouter à l’écran d’accueil.",

      labels: {
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
      }
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

      installCta:
        "Pet-Friendly zum Startbildschirm hinzufügen",
      installTitle:
        "Pet-Friendly immer griffbereit",
      installText:
        "Fügen Sie Pet-Friendly Places zum Startbildschirm hinzu, um es mit einem Tipp zu öffnen.",
      installNow: "Hinzufügen",
      later: "Später",
      iosHint:
        "Auf dem iPhone: Teilen antippen und Zum Home-Bildschirm wählen.",

      labels: {
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
      }
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

      installCta:
        "Añadir Pet-Friendly a la pantalla de inicio",
      installTitle:
        "Ten Pet-Friendly siempre a mano",
      installText:
        "Añade Pet-Friendly Places a tu pantalla de inicio para abrirlo con un toque.",
      installNow: "Añadir",
      later: "Más tarde",
      iosHint:
        "En iPhone: toca Compartir y luego Añadir a pantalla de inicio.",

      labels: {
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
    },

    it: {
      openMenu: "Apri menu",
      closeMenu: "Chiudi menu",
      contents: "Contenuti",
      profile: "Profilo",
      advertise: "Pubblicizza con noi",
      language: "Lingua",
      signIn: "Accedi",
      joinClub: "Unisciti al Club",

      installCta:
        "Aggiungi Pet-Friendly alla schermata Home",
      installTitle:
        "Tieni Pet-Friendly a portata di mano",
      installText:
        "Aggiungi Pet-Friendly Places alla schermata Home per aprirlo con un tocco.",
      installNow: "Aggiungi",
      later: "Più tardi",
      iosHint:
        "Su iPhone: tocca Condividi, poi Aggiungi a Home.",

      labels: {
        petFriendly: "Luoghi pet-friendly",
        discounts: "Sconti",
        help: "Aiuto",
        community: "Community",
        marketplace: "Marketplace",
        edition: "Edizione",
        coverStars: "Cover Stars",
        contests: "Concorsi",
        articles: "Articoli",
        photos: "Foto",
        fashion: "Moda",
        health: "Salute"
      }
    },

    pt: {
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      contents: "Conteúdo",
      profile: "Perfil",
      advertise: "Anuncie connosco",
      language: "Idioma",
      signIn: "Entrar",
      joinClub: "Entrar no Clube",

      installCta:
        "Adicionar Pet-Friendly ao ecrã principal",
      installTitle:
        "Tenha Pet-Friendly sempre à mão",
      installText:
        "Adicione Pet-Friendly Places ao ecrã principal para abrir com um toque.",
      installNow: "Adicionar",
      later: "Mais tarde",
      iosHint:
        "No iPhone: toque em Partilhar e depois Adicionar ao ecrã principal.",

      labels: {
        petFriendly: "Locais pet-friendly",
        discounts: "Descontos",
        help: "Ajuda",
        community: "Comunidade",
        marketplace: "Marketplace",
        edition: "Edição",
        coverStars: "Estrelas de capa",
        contests: "Concursos",
        articles: "Artigos",
        photos: "Fotos",
        fashion: "Moda",
        health: "Saúde"
      }
    },

    nl: {
      openMenu: "Menu openen",
      closeMenu: "Menu sluiten",
      contents: "Inhoud",
      profile: "Profiel",
      advertise: "Adverteer bij ons",
      language: "Taal",
      signIn: "Inloggen",
      joinClub: "Word lid",

      installCta:
        "Pet-Friendly aan beginscherm toevoegen",
      installTitle:
        "Houd Pet-Friendly dichtbij",
      installText:
        "Voeg Pet-Friendly Places toe aan je beginscherm zodat het altijd één tik verwijderd is.",
      installNow: "Toevoegen",
      later: "Later",
      iosHint:
        "Op iPhone: tik op Delen en kies Zet op beginscherm.",

      labels: {
        petFriendly: "Huisdiervriendelijke plekken",
        discounts: "Kortingen",
        help: "Hulp",
        community: "Community",
        marketplace: "Marktplaats",
        edition: "Editie",
        coverStars: "Cover Stars",
        contests: "Wedstrijden",
        articles: "Artikelen",
        photos: "Foto’s",
        fashion: "Mode",
        health: "Gezondheid"
      }
    },

    pl: {
      openMenu: "Otwórz menu",
      closeMenu: "Zamknij menu",
      contents: "Spis treści",
      profile: "Profil",
      advertise: "Reklamuj się z nami",
      language: "Język",
      signIn: "Zaloguj się",
      joinClub: "Dołącz do klubu",

      installCta:
        "Dodaj Pet-Friendly do ekranu głównego",
      installTitle:
        "Miej Pet-Friendly pod ręką",
      installText:
        "Dodaj Pet-Friendly Places do ekranu głównego, aby otwierać je jednym dotknięciem.",
      installNow: "Dodaj",
      later: "Później",
      iosHint:
        "Na iPhonie: stuknij Udostępnij, a potem Dodaj do ekranu początkowego.",

      labels: {
        petFriendly: "Miejsca przyjazne zwierzętom",
        discounts: "Rabaty",
        help: "Pomoc",
        community: "Społeczność",
        marketplace: "Marketplace",
        edition: "Edycja",
        coverStars: "Gwiazdy okładki",
        contests: "Konkursy",
        articles: "Artykuły",
        photos: "Zdjęcia",
        fashion: "Moda",
        health: "Zdrowie"
      }
    },

    cs: {
      openMenu: "Otevřít menu",
      closeMenu: "Zavřít menu",
      contents: "Obsah",
      profile: "Profil",
      advertise: "Inzerujte u nás",
      language: "Jazyk",
      signIn: "Přihlásit se",
      joinClub: "Vstoupit do klubu",

      installCta:
        "Přidat Pet-Friendly na plochu",
      installTitle:
        "Mějte Pet-Friendly po ruce",
      installText:
        "Přidejte Pet-Friendly Places na plochu a otevřete je jedním klepnutím.",
      installNow: "Přidat",
      later: "Později",
      iosHint:
        "Na iPhonu: klepněte na Sdílet a zvolte Přidat na plochu.",

      labels: {
        petFriendly: "Místa přátelská ke zvířatům",
        discounts: "Slevy",
        help: "Pomoc",
        community: "Komunita",
        marketplace: "Marketplace",
        edition: "Vydání",
        coverStars: "Hvězdy obálky",
        contests: "Soutěže",
        articles: "Články",
        photos: "Fotografie",
        fashion: "Móda",
        health: "Zdraví"
      }
    },

    sk: {
      openMenu: "Otvoriť menu",
      closeMenu: "Zavrieť menu",
      contents: "Obsah",
      profile: "Profil",
      advertise: "Inzerujte u nás",
      language: "Jazyk",
      signIn: "Prihlásiť sa",
      joinClub: "Vstúpiť do klubu",

      installCta:
        "Pridať Pet-Friendly na plochu",
      installTitle:
        "Majte Pet-Friendly poruke",
      installText:
        "Pridajte Pet-Friendly Places na plochu a otvorte ich jedným ťuknutím.",
      installNow: "Pridať",
      later: "Neskôr",
      iosHint:
        "Na iPhone: ťuknite na Zdieľať a potom Pridať na plochu.",

      labels: {
        petFriendly: "Miesta priateľské k zvieratám",
        discounts: "Zľavy",
        help: "Pomoc",
        community: "Komunita",
        marketplace: "Marketplace",
        edition: "Vydanie",
        coverStars: "Hviezdy obálky",
        contests: "Súťaže",
        articles: "Články",
        photos: "Fotografie",
        fashion: "Móda",
        health: "Zdravie"
      }
    },

    hu: {
      openMenu: "Menü megnyitása",
      closeMenu: "Menü bezárása",
      contents: "Tartalom",
      profile: "Profil",
      advertise: "Hirdessen nálunk",
      language: "Nyelv",
      signIn: "Bejelentkezés",
      joinClub: "Csatlakozás a klubhoz",

      installCta:
        "Pet-Friendly hozzáadása a kezdőképernyőhöz",
      installTitle:
        "Legyen kéznél a Pet-Friendly",
      installText:
        "Adja hozzá a Pet-Friendly Places oldalt a kezdőképernyőhöz.",
      installNow: "Hozzáadás",
      later: "Később",
      iosHint:
        "iPhone-on: koppintson a Megosztásra, majd a Hozzáadás a Főképernyőhöz lehetőségre.",

      labels: {
        petFriendly: "Állatbarát helyek",
        discounts: "Kedvezmények",
        help: "Segítség",
        community: "Közösség",
        marketplace: "Marketplace",
        edition: "Kiadás",
        coverStars: "Címlapsztárok",
        contests: "Versenyek",
        articles: "Cikkek",
        photos: "Fotók",
        fashion: "Divat",
        health: "Egészség"
      }
    },

    ro: {
      openMenu: "Deschide meniul",
      closeMenu: "Închide meniul",
      contents: "Cuprins",
      profile: "Profil",
      advertise: "Publicitate cu noi",
      language: "Limbă",
      signIn: "Autentificare",
      joinClub: "Intră în Club",

      installCta:
        "Adaugă Pet-Friendly pe ecranul principal",
      installTitle:
        "Ține Pet-Friendly la îndemână",
      installText:
        "Adaugă Pet-Friendly Places pe ecranul principal pentru acces dintr-o atingere.",
      installNow: "Adaugă",
      later: "Mai târziu",
      iosHint:
        "Pe iPhone: apasă Partajare, apoi Adaugă pe ecranul principal.",

      labels: {
        petFriendly: "Locuri pet-friendly",
        discounts: "Reduceri",
        help: "Ajutor",
        community: "Comunitate",
        marketplace: "Marketplace",
        edition: "Ediție",
        coverStars: "Vedete de copertă",
        contests: "Concursuri",
        articles: "Articole",
        photos: "Fotografii",
        fashion: "Modă",
        health: "Sănătate"
      }
    },

    bg: {
      openMenu: "Отвори меню",
      closeMenu: "Затвори меню",
      contents: "Съдържание",
      profile: "Профил",
      advertise: "Рекламирайте при нас",
      language: "Език",
      signIn: "Вход",
      joinClub: "Влезте в клуба",

      installCta:
        "Добавете Pet-Friendly на началния екран",
      installTitle:
        "Дръжте Pet-Friendly под ръка",
      installText:
        "Добавете Pet-Friendly Places на началния екран за достъп с едно докосване.",
      installNow: "Добави",
      later: "По-късно",
      iosHint:
        "На iPhone: натиснете Share, после Add to Home Screen.",

      labels: {
        petFriendly: "Места за любимци",
        discounts: "Отстъпки",
        help: "Помощ",
        community: "Общност",
        marketplace: "Маркетплейс",
        edition: "Издание",
        coverStars: "Звезди на корицата",
        contests: "Конкурси",
        articles: "Статии",
        photos: "Снимки",
        fashion: "Мода",
        health: "Здраве"
      }
    },

    el: {
      openMenu: "Άνοιγμα μενού",
      closeMenu: "Κλείσιμο μενού",
      contents: "Περιεχόμενα",
      profile: "Προφίλ",
      advertise: "Διαφημιστείτε μαζί μας",
      language: "Γλώσσα",
      signIn: "Σύνδεση",
      joinClub: "Εγγραφή στο Club",

      installCta:
        "Προσθήκη Pet-Friendly στην αρχική οθόνη",
      installTitle:
        "Έχετε το Pet-Friendly πάντα κοντά",
      installText:
        "Προσθέστε το Pet-Friendly Places στην αρχική οθόνη.",
      installNow: "Προσθήκη",
      later: "Αργότερα",
      iosHint:
        "Σε iPhone: πατήστε Κοινή χρήση και μετά Προσθήκη στην αρχική οθόνη.",

      labels: {
        petFriendly: "Pet-friendly μέρη",
        discounts: "Εκπτώσεις",
        help: "Βοήθεια",
        community: "Κοινότητα",
        marketplace: "Marketplace",
        edition: "Έκδοση",
        coverStars: "Αστέρια εξωφύλλου",
        contests: "Διαγωνισμοί",
        articles: "Άρθρα",
        photos: "Φωτογραφίες",
        fashion: "Μόδα",
        health: "Υγεία"
      }
    },

    sv: {
      openMenu: "Öppna meny",
      closeMenu: "Stäng meny",
      contents: "Innehåll",
      profile: "Profil",
      advertise: "Annonsera hos oss",
      language: "Språk",
      signIn: "Logga in",
      joinClub: "Gå med i Club",

      installCta:
        "Lägg till Pet-Friendly på hemskärmen",
      installTitle:
        "Ha Pet-Friendly nära till hands",
      installText:
        "Lägg till Pet-Friendly Places på hemskärmen så att det alltid är ett tryck bort.",
      installNow: "Lägg till",
      later: "Senare",
      iosHint:
        "På iPhone: tryck på Dela och välj Lägg till på hemskärmen.",

      labels: {
        petFriendly: "Djurvänliga platser",
        discounts: "Rabatter",
        help: "Hjälp",
        community: "Community",
        marketplace: "Marketplace",
        edition: "Utgåva",
        coverStars: "Omslagsstjärnor",
        contests: "Tävlingar",
        articles: "Artiklar",
        photos: "Foton",
        fashion: "Mode",
        health: "Hälsa"
      }
    },

    da: {
      openMenu: "Åbn menu",
      closeMenu: "Luk menu",
      contents: "Indhold",
      profile: "Profil",
      advertise: "Annoncér hos os",
      language: "Sprog",
      signIn: "Log ind",
      joinClub: "Bliv medlem",

      installCta:
        "Føj Pet-Friendly til hjemmeskærmen",
      installTitle:
        "Hav Pet-Friendly lige ved hånden",
      installText:
        "Føj Pet-Friendly Places til hjemmeskærmen, så det altid er ét tryk væk.",
      installNow: "Tilføj",
      later: "Senere",
      iosHint:
        "På iPhone: tryk Del og vælg Føj til hjemmeskærm.",

      labels: {
        petFriendly: "Kæledyrsvenlige steder",
        discounts: "Rabatter",
        help: "Hjælp",
        community: "Fællesskab",
        marketplace: "Marketplace",
        edition: "Udgave",
        coverStars: "Forsidestjerner",
        contests: "Konkurrencer",
        articles: "Artikler",
        photos: "Fotos",
        fashion: "Mode",
        health: "Sundhed"
      }
    },

    no: {
      openMenu: "Åpne meny",
      closeMenu: "Lukk meny",
      contents: "Innhold",
      profile: "Profil",
      advertise: "Annonser hos oss",
      language: "Språk",
      signIn: "Logg inn",
      joinClub: "Bli med i Club",

      installCta:
        "Legg Pet-Friendly til på hjemskjermen",
      installTitle:
        "Ha Pet-Friendly lett tilgjengelig",
      installText:
        "Legg Pet-Friendly Places til på hjemskjermen.",
      installNow: "Legg til",
      later: "Senere",
      iosHint:
        "På iPhone: trykk Del og velg Legg til på Hjem-skjerm.",

      labels: {
        petFriendly: "Kjæledyrvennlige steder",
        discounts: "Rabatter",
        help: "Hjelp",
        community: "Fellesskap",
        marketplace: "Marketplace",
        edition: "Utgave",
        coverStars: "Forsidestjerner",
        contests: "Konkurranser",
        articles: "Artikler",
        photos: "Bilder",
        fashion: "Mote",
        health: "Helse"
      }
    },

    fi: {
      openMenu: "Avaa valikko",
      closeMenu: "Sulje valikko",
      contents: "Sisältö",
      profile: "Profiili",
      advertise: "Mainosta kanssamme",
      language: "Kieli",
      signIn: "Kirjaudu",
      joinClub: "Liity Clubiin",

      installCta:
        "Lisää Pet-Friendly aloitusnäyttöön",
      installTitle:
        "Pidä Pet-Friendly helposti saatavilla",
      installText:
        "Lisää Pet-Friendly Places aloitusnäyttöön.",
      installNow: "Lisää",
      later: "Myöhemmin",
      iosHint:
        "iPhonessa: napauta Jaa ja valitse Lisää Koti-valikkoon.",

      labels: {
        petFriendly: "Lemmikkiystävälliset paikat",
        discounts: "Alennukset",
        help: "Apua",
        community: "Yhteisö",
        marketplace: "Marketplace",
        edition: "Julkaisu",
        coverStars: "Kansitähdet",
        contests: "Kilpailut",
        articles: "Artikkelit",
        photos: "Kuvat",
        fashion: "Muoti",
        health: "Terveys"
      }
    },

    tr: {
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      contents: "İçindekiler",
      profile: "Profil",
      advertise: "Bizimle reklam verin",
      language: "Dil",
      signIn: "Giriş yap",
      joinClub: "Club'a katıl",

      installCta:
        "Pet-Friendly’yi ana ekrana ekle",
      installTitle:
        "Pet-Friendly her zaman elinizin altında",
      installText:
        "Pet-Friendly Places’ı ana ekranınıza ekleyin.",
      installNow: "Ekle",
      later: "Daha sonra",
      iosHint:
        "iPhone’da: Paylaş’a dokunun, ardından Ana Ekrana Ekle’yi seçin.",

      labels: {
        petFriendly: "Evcil hayvan dostu yerler",
        discounts: "İndirimler",
        help: "Yardım",
        community: "Topluluk",
        marketplace: "Marketplace",
        edition: "Edisyon",
        coverStars: "Kapak yıldızları",
        contests: "Yarışmalar",
        articles: "Makaleler",
        photos: "Fotoğraflar",
        fashion: "Moda",
        health: "Sağlık"
      }
    },

    ar: {
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      contents: "المحتويات",
      profile: "الملف الشخصي",
      advertise: "أعلن معنا",
      language: "اللغة",
      signIn: "تسجيل الدخول",
      joinClub: "انضم إلى النادي",

      installCta:
        "أضف Pet-Friendly إلى الشاشة الرئيسية",
      installTitle:
        "اجعل Pet-Friendly قريبًا دائمًا",
      installText:
        "أضف Pet-Friendly Places إلى الشاشة الرئيسية للوصول إليه بلمسة واحدة.",
      installNow: "إضافة",
      later: "لاحقًا",
      iosHint:
        "على iPhone: اضغط مشاركة ثم اختر إضافة إلى الشاشة الرئيسية.",

      labels: {
        petFriendly: "أماكن صديقة للحيوانات",
        discounts: "الخصومات",
        help: "المساعدة",
        community: "المجتمع",
        marketplace: "السوق",
        edition: "الإصدار",
        coverStars: "نجوم الغلاف",
        contests: "المسابقات",
        articles: "المقالات",
        photos: "الصور",
        fashion: "الموضة",
        health: "الصحة"
      }
    },

    hi: {
      openMenu: "मेनू खोलें",
      closeMenu: "मेनू बंद करें",
      contents: "विषय सूची",
      profile: "प्रोफ़ाइल",
      advertise: "हमारे साथ विज्ञापन करें",
      language: "भाषा",
      signIn: "साइन इन",
      joinClub: "क्लब में शामिल हों",

      installCta:
        "Pet-Friendly को होम स्क्रीन पर जोड़ें",
      installTitle:
        "Pet-Friendly को पास रखें",
      installText:
        "Pet-Friendly Places को होम स्क्रीन पर जोड़ें ताकि यह हमेशा एक टैप की दूरी पर रहे।",
      installNow: "जोड़ें",
      later: "बाद में",
      iosHint:
        "iPhone पर: Share टैप करें, फिर Add to Home Screen चुनें।",

      labels: {
        petFriendly: "पालतू-अनुकूल स्थान",
        discounts: "छूट",
        help: "मदद",
        community: "समुदाय",
        marketplace: "मार्केटप्लेस",
        edition: "संस्करण",
        coverStars: "कवर स्टार्स",
        contests: "प्रतियोगिताएँ",
        articles: "लेख",
        photos: "फोटो",
        fashion: "फैशन",
        health: "स्वास्थ्य"
      }
    }

  };

  let language = "en";

  let activeKey = "";

  let observer = null;

  let lastY =
    Math.max(
      0,
      window.scrollY || 0
    );

  let lastDirection = 0;

  let accumulated = 0;

  let ticking = false;

  let deferredInstallPrompt =
    null;

  function normalizeLanguage(
    value
  ) {

    const raw =
      String(value || "")
      .trim()
      .toLowerCase()
      .replace("_", "-");

    if (!raw) {
      return "";
    }

    const base =
      raw.split("-")[0];

    return (
      LANGUAGE_ALIASES[base] ||
      base
    );

  }

  function supportedLanguage(
    value
  ) {

    return SUPPORTED_LANGUAGES.has(
      normalizeLanguage(value)
    );

  }

  function currentFile() {

    const path =
      window.location.pathname ||
      "";

    return (
      path
      .split("/")
      .filter(Boolean)
      .pop() ||
      "index.html"
    ).toLowerCase();

  }

  function isHome() {

    return (
      currentFile() ===
      "index.html"
    );

  }

  function detectActiveKey() {

    const file =
      currentFile();

    if (
      PAGE_KEYS[file]
    ) {

      return PAGE_KEYS[file];

    }

    const path =
      (
        window.location.pathname ||
        ""
      ).toLowerCase();

    for (
      const [
        name,
        key
      ]
      of
      Object.entries(
        PAGE_KEYS
      )
    ) {

      if (
        path.includes(
          name.replace(
            ".html",
            ""
          )
        )
      ) {

        return key;

      }

    }

    return "";

  }

  function isPetFriendlyPage() {

    return (
      detectActiveKey() ===
      "petFriendly"
    );

  }

  function pageLanguageSelect() {

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

    for (
      const selector
      of selectors
    ) {

      const element =
        document.querySelector(
          selector
        );

      if (
        element &&
        element.id !==
        "pdShellLanguage"
      ) {

        return element;

      }

    }

    return null;

  }

  function detectLanguage() {

    try {

      const saved =
        normalizeLanguage(
          localStorage.getItem(
            LANGUAGE_KEY
          ) || ""
        );

      if (
        saved &&
        supportedLanguage(saved)
      ) {

        return saved;

      }

    } catch (error) {}

    const existing =
      pageLanguageSelect();

    const fromSelect =
      normalizeLanguage(
        existing?.value ||
        ""
      );

    if (
      fromSelect &&
      supportedLanguage(
        fromSelect
      )
    ) {

      return fromSelect;

    }

    const htmlLang =
      normalizeLanguage(
        document
        .documentElement
        .lang ||
        ""
      );

    return supportedLanguage(
      htmlLang
    )
      ? htmlLang
      : "en";

  }

  function copy() {

    return (
      COPY[language] ||
      COPY.en
    );

  }

  function esc(
    value
  ) {

    return String(
      value ?? ""
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

  function persistLanguage(
    code
  ) {

    const normalized =
      normalizeLanguage(
        code
      );

    language =
      supportedLanguage(
        normalized
      )
        ? normalized
        : "en";

    try {

      localStorage.setItem(
        LANGUAGE_KEY,
        language
      );

    } catch (error) {}

    document
      .documentElement
      .lang =
      language;

    document
      .documentElement
      .dir =
      language === "ar"
        ? "rtl"
        : "ltr";

  }

  function installStyles() {

    document
      .getElementById(
        "pdHeaderOnlyStyles"
      )
      ?.remove();

    const style =
      document.createElement(
        "style"
      );

    style.id =
      "pdHeaderOnlyStyles";

    style.textContent = `

:root{
--pdh-black:#050505;
--pdh-white:#ffffff;
--pdh-cream:#f6f1e8;
--pdh-gold:#c69b45;
--pdh-gold-light:#ecd28a;
--pdh-gold-line:rgba(198,155,69,.86);
--pdh-green:#65e51f;
--pdh-red:#db2e2e;
--pdh-shadow:0 12px 34px rgba(0,0,0,.22);
--pdh-serif:Georgia,"Times New Roman",serif;
--pdh-sans:Arial,Helvetica,sans-serif;
}

.pd-header-old-hidden{
display:none!important;
}

body.pd-shell-lock{
overflow:hidden!important;
touch-action:none;
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
transition:
transform .23s
cubic-bezier(.2,.75,.2,1);
will-change:transform;
box-shadow:var(--pdh-shadow);
}

#pdLuxuryHeader.pd-header-hidden{
transform:translateY(-102%);
}

#pdLuxuryMainBar{
min-height:48px;
display:grid;
grid-template-columns:
38px
minmax(92px,1fr)
auto
auto;
align-items:center;
gap:6px;
padding:4px 8px;
background:var(--pdh-black);
border-bottom:
1px solid
var(--pdh-gold-line);
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

#pdLuxuryAdvertise{
min-height:31px;
display:inline-flex;
align-items:center;
justify-content:center;
padding:0 10px;
border:
2px solid
var(--pdh-red);
border-radius:999px;
background:
rgba(219,46,46,.08);
color:#fff;
text-decoration:none;
font-size:8.9px;
font-weight:900;
line-height:1;
white-space:nowrap;
box-shadow:
0 0 0 1px
rgba(219,46,46,.18)
inset;
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
width:208px;
padding:9px;
border:1px solid #333;
border-radius:14px;
background:#0b0b0b;
box-shadow:
0 18px 42px
rgba(0,0,0,.35);
opacity:0;
visibility:hidden;
transform:
translateY(-5px);
transition:.18s ease;
}

html[dir="rtl"]
#pdLuxuryProfileMenu{
right:auto;
left:0;
}

#pdLuxuryProfileMenu.open{
opacity:1;
visibility:visible;
transform:
translateY(0);
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

.pd-luxury-profile-link
+
.pd-luxury-profile-link{
margin-top:7px;
}

.pd-luxury-profile-link.club{
border-color:
var(--pdh-green);
background:
var(--pdh-green);
}

#pdLuxuryRows{
background:#080808;
border-bottom:
1px solid
var(--pdh-gold-line);
}

.pd-luxury-row-shell{
position:relative;
overflow:hidden;
border-bottom:
1px solid
var(--pdh-gold-line);
}

.pd-luxury-row-shell:last-child{
border-bottom:0;
}

.pd-luxury-row{
display:flex;
align-items:center;
gap:6px;
overflow-x:auto;
overflow-y:hidden;
white-space:nowrap;
padding:0 8px;
scrollbar-width:none;
-ms-overflow-style:none;
-webkit-overflow-scrolling:
touch;
scroll-behavior:smooth;
overscroll-behavior-x:
contain;
}

.pd-luxury-row::-webkit-scrollbar{
display:none;
}

.pd-luxury-row-link{
position:relative;
flex:0 0 auto;
min-height:32px;
display:flex;
align-items:center;
justify-content:center;
gap:6px;
padding:0 10px;
color:#f7f7f7;
text-decoration:none;
font-family:
var(--pdh-serif);
font-size:11.5px;
border-radius:999px;
}

.pd-luxury-row-link.active{
color:
var(--pdh-gold-light);
}

.pd-luxury-row-link.active:after{
content:"";
position:absolute;
left:10px;
right:10px;
bottom:0;
height:2px;
background:#e0b85e;
box-shadow:
0 0 5px
rgba(224,184,94,.38);
}

.pd-luxury-row-link.petfriendly-outline{
border:
1px solid
rgba(101,229,31,.95);
box-shadow:
0 0 0 1px
rgba(101,229,31,.14)
inset;
}

.pd-inline-emoji{
display:inline-flex;
align-items:center;
justify-content:center;
font-size:12px;
line-height:1;
}

#pdShellOverlay{
position:fixed;
inset:0;
z-index:14980;
background:
rgba(0,0,0,.56);
opacity:0;
visibility:hidden;
pointer-events:none;
transition:
opacity .2s ease,
visibility .2s ease;
}

#pdShellOverlay.open{
opacity:1;
visibility:visible;
pointer-events:auto;
}

#pdShellMenu{
position:fixed;
top:0;
left:0;
bottom:0;
z-index:14990;
width:min(88vw,388px);
min-width:286px;
background:
var(--pdh-cream);
color:#111;
box-shadow:
26px 0 42px
rgba(0,0,0,.26);
transform:
translateX(-104%);
transition:
transform .24s ease;
display:flex;
flex-direction:column;
overflow:hidden;
}

#pdShellMenu.open{
transform:
translateX(0);
}

html[dir="rtl"]
#pdShellMenu{
left:auto;
right:0;
transform:
translateX(104%);
}

html[dir="rtl"]
#pdShellMenu.open{
transform:
translateX(0);
}

.pd-shell-menu-head{
min-height:82px;
padding:0 16px;
background:#050505;
color:#fff;
display:flex;
align-items:center;
justify-content:
space-between;
}

.pd-shell-menu-head h2{
margin:0;
font:
normal
31px/1
var(--pdh-serif);
}

#pdShellClose{
width:42px;
height:42px;
border:
1px solid
rgba(255,255,255,.42);
border-radius:50%;
background:transparent;
color:#fff;
display:flex;
align-items:center;
justify-content:center;
font-size:28px;
cursor:pointer;
}

.pd-shell-menu-scroll{
flex:1 1 auto;
min-height:0;
overflow-y:auto;
padding:
12px 11px 20px;
-webkit-overflow-scrolling:
touch;
}

.pd-shell-account{
display:grid;
grid-template-columns:
1fr 1fr;
gap:8px;
margin-bottom:12px;
}

.pd-shell-account a{
min-height:48px;
border:
2px solid #181818;
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

.pd-shell-account a.club{
border-color:
var(--pdh-green);
background:
var(--pdh-green);
}

.pd-shell-language-label{
display:block;
margin:0 3px 6px;
color:#6e6e6e;
font-size:9px;
font-weight:900;
letter-spacing:1.2px;
text-transform:uppercase;
}

#pdShellLanguage{
width:100%;
height:49px;
margin:0 0 12px;
padding:0 14px;
border:
2px solid #181818;
border-radius:999px;
background:#fff;
color:#111;
font-size:13px;
font-weight:800;
}

#pdShellCards{
display:grid;
gap:8px;
}

.pd-shell-card{
min-height:84px;
display:grid;
grid-template-columns:
84px
minmax(0,1fr);
border:
2px solid #141414;
border-radius:18px;
background:#fff;
color:#111;
text-decoration:none;
overflow:hidden;
}

.pd-shell-card.active{
background:#090909;
color:#fff;
}

.pd-shell-card.advertise{
border-color:
var(--pdh-red);
box-shadow:
inset
0 0 0 1px
rgba(219,46,46,.18);
}

.pd-shell-card.petfriendly-card{
border-color:
rgba(101,229,31,.95);
box-shadow:
inset
0 0 0 1px
rgba(101,229,31,.18);
}

.pd-shell-card.active h3{
color:
var(--pdh-gold-light);
}

.pd-shell-card-image{
width:84px;
min-height:84px;
overflow:hidden;
background:#ddd;
}

.pd-shell-card-image img{
width:84px;
height:100%;
min-height:84px;
object-fit:cover;
display:block;
}

.pd-shell-card-copy{
min-width:0;
display:flex;
align-items:center;
padding:10px 12px;
}

.pd-shell-card-copy h3{
margin:0;
font:
700
18px/1.06
var(--pdh-serif);
}

.pd-shell-card-copy .inline{
display:inline-flex;
gap:6px;
align-items:center;
}

#pdInstallLauncher{
position:fixed;
right:14px;
bottom:16px;
z-index:14890;
max-width:min(88vw,330px);
min-height:46px;
padding:10px 16px;
border:
1px solid
rgba(101,229,31,.95);
border-radius:999px;
background:#0b0b0b;
color:#fff;
box-shadow:
0 12px 26px
rgba(0,0,0,.28);
display:none;
align-items:center;
justify-content:center;
text-align:center;
font-size:12px;
font-weight:900;
cursor:pointer;
}

html[dir="rtl"]
#pdInstallLauncher{
right:auto;
left:14px;
}

#pdInstallLauncher.show{
display:flex;
}

#pdInstallSheet{
position:fixed;
inset:0;
z-index:14995;
background:
rgba(0,0,0,.62);
opacity:0;
visibility:hidden;
pointer-events:none;
transition:
opacity .18s ease,
visibility .18s ease;
}

#pdInstallSheet.open{
opacity:1;
visibility:visible;
pointer-events:auto;
}

.pd-install-card{
position:absolute;
left:50%;
bottom:18px;
transform:
translateX(-50%)
translateY(12px);
width:min(92vw,420px);
padding:18px 16px 14px;
border-radius:24px;
background:#fff;
color:#111;
box-shadow:
0 18px 42px
rgba(0,0,0,.35);
transition:
transform .18s ease;
}

#pdInstallSheet.open
.pd-install-card{
transform:
translateX(-50%)
translateY(0);
}

.pd-install-card h3{
margin:0 0 8px;
font:
700
22px/1.08
var(--pdh-serif);
}

.pd-install-card p{
margin:0 0 12px;
font-size:14px;
line-height:1.45;
}

.pd-install-actions{
display:grid;
grid-template-columns:
1fr 1fr;
gap:8px;
}

.pd-install-actions button{
min-height:46px;
border-radius:999px;
border:
2px solid #181818;
background:#fff;
color:#111;
font-size:12px;
font-weight:900;
cursor:pointer;
}

.pd-install-actions button.primary{
border-color:
var(--pdh-green);
background:
var(--pdh-green);
}

#pdLuxuryMenuButton:focus-visible,
#pdLuxuryAdvertise:focus-visible,
#pdLuxuryProfileButton:focus-visible,
.pd-luxury-row-link:focus-visible,
#pdLuxuryProfileMenu a:focus-visible,
.pd-shell-account a:focus-visible,
#pdShellClose:focus-visible,
#pdShellLanguage:focus-visible,
.pd-shell-card:focus-visible,
#pdInstallLauncher:focus-visible,
.pd-install-actions button:focus-visible{
outline:
3px solid
var(--pdh-green);
outline-offset:2px;
}

@media(max-width:390px){

#pdLuxuryMainBar{
grid-template-columns:
36px
minmax(74px,1fr)
auto
auto;
gap:4px;
padding-left:6px;
padding-right:6px;
}

#pdLuxuryBrand{
font-size:16px;
}

#pdLuxuryAdvertise{
min-height:29px;
padding:0 8px;
font-size:8px;
}

.pd-luxury-profile-label{
font-size:8px;
}

.pd-luxury-row-link{
min-height:30px;
font-size:10.7px;
padding:0 8px;
}

#pdHomeHeaderImage{
height:
clamp(82px,19vw,108px);
}

}

@media(max-width:340px){

.pd-luxury-profile-label{
display:none;
}

#pdLuxuryMainBar{
grid-template-columns:
34px
minmax(72px,1fr)
auto
28px;
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
.pd-luxury-row,
#pdShellOverlay,
#pdShellMenu,
#pdInstallSheet{
transition:none;
scroll-behavior:auto;
}

}

`;

    document.head.appendChild(
      style
    );

  }

  function hideLegacy() {

    const selectors = [
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
      "#pdGlobalHeader",
      "#sideMenu",
      ".side-menu",
      "#menuOverlay",
      ".menu-overlay",
      "#pdGlobalMenu",
      "#pdGlobalOverlay"
    ];

    selectors.forEach(
      selector => {

        document
          .querySelectorAll(
            selector
          )
          .forEach(
            element => {

              if (
                ![
                  "pdLuxuryHeader",
                  "pdShellMenu",
                  "pdShellOverlay",
                  "pdInstallLauncher",
                  "pdInstallSheet"
                ].includes(
                  element.id
                )
              ) {

                element
                  .classList
                  .add(
                    "pd-header-old-hidden"
                  );

              }

            }
          );

      }
    );

  }

  function watchLegacy() {

    if (observer) {
      return;
    }

    observer =
      new MutationObserver(
        () => {

          hideLegacy();

        }
      );

    observer.observe(
      document.body,
      {
        childList: true,
        subtree: true
      }
    );

  }

  function getFallbackImage() {

    return (
      document
        .querySelector(
          ".latest-cover img"
        )
        ?.getAttribute("src") ||

      document
        .querySelector(
          ".hero img,main img"
        )
        ?.getAttribute("src") ||

      ""
    );

  }

  function createHomeImage() {

    if (
      !isHome() ||
      document.getElementById(
        "pdHomeHeaderImage"
      )
    ) {

      return;

    }

    const holder =
      document.createElement(
        "div"
      );

    holder.id =
      "pdHomeHeaderImage";

    const img =
      document.createElement(
        "img"
      );

    img.alt =
      "PETS & DOGUE";

    img.decoding =
      "async";

    img.fetchPriority =
      "high";

    const fallback =
      getFallbackImage();

    img.src =
      window
        .PETS_DOGUE_HOME_MASTHEAD_SRC ||
      HOME_MASTHEAD_FILE;

    img.addEventListener(
      "error",
      () => {

        if (
          fallback &&
          img.dataset
            .fallbackDone !==
            "1"
        ) {

          img.dataset
            .fallbackDone =
            "1";

          img.src =
            fallback;

        } else {

          holder.style.display =
            "none";

        }

      }
    );

    holder.appendChild(
      img
    );

    document.body.insertBefore(
      holder,
      document.body.firstChild
    );

  }

  function specialIcon(
    key
  ) {

    if (
      key ===
      "petFriendly"
    ) {

      return `
        <span
          class="pd-inline-emoji"
          aria-hidden="true"
        >🐾</span>
      `;

    }

    if (
      key ===
      "help"
    ) {

      return `
        <span
          class="pd-inline-emoji"
          aria-hidden="true"
        >❤️</span>
      `;

    }

    return "";

  }

  function navLabel(
    key
  ) {

    return (
      copy()
        .labels[key] ||
      COPY.en
        .labels[key] ||
      key
    );

  }

  function renderRows() {

    const top =
      document.getElementById(
        "pdLuxuryTopRow"
      );

    const bottom =
      document.getElementById(
        "pdLuxuryBottomRow"
      );

    if (
      !top ||
      !bottom
    ) {

      return;

    }

    const build =
      keys =>

        keys
        .map(
          key => {

            const petFriendlyClass =
              key ===
              "petFriendly"
                ? " petfriendly-outline"
                : "";

            return `

<a
class="pd-luxury-row-link${
key === activeKey
? " active"
: ""
}${petFriendlyClass}"
href="${esc(
ROUTES[key]
)}"
data-pd-header-link="${esc(
key
)}"
${
key === activeKey
? 'aria-current="page"'
: ""
}
>

${specialIcon(key)}

<span>
${esc(
navLabel(key)
)}
</span>

</a>

`;

          }
        )
        .join("");

    top.innerHTML =
      build(
        TOP_KEYS
      );

    bottom.innerHTML =
      build(
        BOTTOM_KEYS
      );

    requestAnimationFrame(
      () => {

        document
          .querySelector(
            ".pd-luxury-row-link.active"
          )
          ?.scrollIntoView(
            {
              block:
                "nearest",
              inline:
                "center",
              behavior:
                "auto"
            }
          );

      }
    );

  }

  function renderProfile() {

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    if (!menu) {
      return;
    }

    const text =
      copy();

    const wasOpen =
      menu.classList.contains(
        "open"
      );

    menu.innerHTML = `

<div
class="pd-luxury-profile-title"
>
${esc(
text.profile
)}
</div>

<a
class="pd-luxury-profile-link"
href="account.html"
>
${esc(
text.signIn
)}
</a>

<a
class="pd-luxury-profile-link club"
href="club.html"
>
${esc(
text.joinClub
)}
</a>

`;

    if (wasOpen) {

      menu
        .classList
        .add(
          "open"
        );

      menu.setAttribute(
        "aria-hidden",
        "false"
      );

    }

  }

  function createHeader() {

    if (
      document.getElementById(
        "pdLuxuryHeader"
      )
    ) {

      return;

    }

    const text =
      copy();

    const header =
      document.createElement(
        "header"
      );

    header.id =
      "pdLuxuryHeader";

    header.innerHTML = `

<div
id="pdLuxuryMainBar"
>

<button
id="pdLuxuryMenuButton"
type="button"
aria-label="${esc(
text.openMenu
)}"
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
id="pdLuxuryAdvertise"
href="${esc(
ROUTES.advertise
)}"
>
${esc(
text.advertise
)}
</a>

<div
id="pdLuxuryProfileWrap"
>

<button
id="pdLuxuryProfileButton"
type="button"
aria-label="${esc(
text.profile
)}"
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

<span
class="pd-luxury-profile-label"
>
${esc(
text.profile
)}
</span>

</button>

<div
id="pdLuxuryProfileMenu"
role="menu"
aria-hidden="true"
></div>

</div>

</div>

<div
id="pdLuxuryRows"
>

<div
class="pd-luxury-row-shell"
>

<nav
id="pdLuxuryTopRow"
class="pd-luxury-row"
aria-label="PETS & DOGUE primary sections"
></nav>

</div>

<div
class="pd-luxury-row-shell"
>

<nav
id="pdLuxuryBottomRow"
class="pd-luxury-row"
aria-label="PETS & DOGUE editorial sections"
></nav>

</div>

</div>

`;

    const masthead =
      document.getElementById(
        "pdHomeHeaderImage"
      );

    if (masthead) {

      masthead
        .insertAdjacentElement(
          "afterend",
          header
        );

    } else {

      document.body
        .insertBefore(
          header,
          document.body
            .firstChild
        );

    }

    document
      .getElementById(
        "pdLuxuryMenuButton"
      )
      ?.addEventListener(
        "click",
        openSideMenu
      );

    document
      .getElementById(
        "pdLuxuryProfileButton"
      )
      ?.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          toggleProfile();

        }
      );

    renderProfile();

    renderRows();

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
      .map(
        key => {

          const active =
            key ===
            activeKey;

          const advertiseClass =
            key ===
            "advertise"
              ? " advertise"
              : "";

          const petFriendlyClass =
            key ===
            "petFriendly"
              ? " petfriendly-card"
              : "";

          const label =
            key ===
            "advertise"
              ? text.advertise
              : navLabel(key);

          return `

<a
class="pd-shell-card${
active
? " active"
: ""
}${advertiseClass}${petFriendlyClass}"
href="${esc(
ROUTES[key]
)}"
${
active
? 'aria-current="page"'
: ""
}
>

<span
class="pd-shell-card-image"
>

<img
src="${esc(
MENU_IMAGES[key] ||
""
)}"
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

<span
class="inline"
>

${specialIcon(key)}

<span>
${esc(label)}
</span>

</span>

</h3>

</span>

</a>

`;

        }
      )
      .join("");

    menu.innerHTML = `

<div
class="pd-shell-menu-head"
>

<h2>
${esc(
text.contents
)}
</h2>

<button
id="pdShellClose"
type="button"
aria-label="${esc(
text.closeMenu
)}"
>
×
</button>

</div>

<div
class="pd-shell-menu-scroll"
>

<div
class="pd-shell-account"
>

<a
href="account.html"
>
${esc(
text.signIn
)}
</a>

<a
class="club"
href="club.html"
>
${esc(
text.joinClub
)}
</a>

</div>

<label
class="pd-shell-language-label"
for="pdShellLanguage"
>
${esc(
text.language
)}
</label>

<select
id="pdShellLanguage"
aria-label="${esc(
text.language
)}"
>

${

LANGUAGE_OPTIONS
.map(
([code,label]) => `

<option
value="${esc(
code
)}"
${
language === code
? " selected"
: ""
}
>
${esc(
label
)}
</option>

`
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

  function createSideMenu() {

    if (
      !document.getElementById(
        "pdShellOverlay"
      )
    ) {

      const overlay =
        document.createElement(
          "div"
        );

      overlay.id =
        "pdShellOverlay";

      overlay
        .addEventListener(
          "click",
          closeSideMenu
        );

      document.body
        .appendChild(
          overlay
        );

    }

    if (
      !document.getElementById(
        "pdShellMenu"
      )
    ) {

      const menu =
        document.createElement(
          "aside"
        );

      menu.id =
        "pdShellMenu";

      menu.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body
        .appendChild(
          menu
        );

    }

    renderSideMenu();

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

    if (
      !menu ||
      !overlay
    ) {

      return;

    }

    menu
      .classList
      .add(
        "open"
      );

    overlay
      .classList
      .add(
        "open"
      );

    menu.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body
      .classList
      .add(
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

    if (
      !menu ||
      !overlay
    ) {

      return;

    }

    menu
      .classList
      .remove(
        "open"
      );

    overlay
      .classList
      .remove(
        "open"
      );

    menu.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body
      .classList
      .remove(
        "pd-shell-lock"
      );

  }

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

    if (
      !menu ||
      !button
    ) {

      return;

    }

    menu
      .classList
      .add(
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

    if (
      !menu ||
      !button
    ) {

      return;

    }

    menu
      .classList
      .remove(
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

  function syncExistingLanguageController(
    code
  ) {

    const existing =
      pageLanguageSelect();

    if (existing) {

      const reverse = {
        uk: "ua",
        cs: "cz",
        el: "gr",
        sv: "se",
        da: "dk"
      };

      const candidate =
        [
          code,
          reverse[code]
        ]
        .find(
          value =>

            Array
            .from(
              existing.options ||
              []
            )
            .some(
              option =>
                option.value ===
                value
            )

        );

      if (
        candidate &&
        existing.value !==
        candidate
      ) {

        existing.value =
          candidate;

        existing.dispatchEvent(
          new Event(
            "change",
            {
              bubbles: true
            }
          )
        );

      }

    }

    if (
      window
        .PetsDogueLanguage
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
          window
            .PetsDogueLanguage[
              functionName
            ] ===
          "function"
        ) {

          try {

            window
              .PetsDogueLanguage[
                functionName
              ](
                code
              );

          } catch (error) {}

          break;

        }

      }

    } else if (
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

  function applyLanguage(
    code
  ) {

    persistLanguage(
      code
    );

    syncExistingLanguageController(
      language
    );

    refreshText();

    window.dispatchEvent(
      new CustomEvent(
        "petsdogue:languagechange",
        {
          detail: {
            language:
              language,
            source:
              "header"
          }
        }
      )
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

    const advertise =
      document.getElementById(
        "pdLuxuryAdvertise"
      );

    if (advertise) {

      advertise.textContent =
        text.advertise;

    }

    const profileButton =
      document.getElementById(
        "pdLuxuryProfileButton"
      );

    profileButton
      ?.setAttribute(
        "aria-label",
        text.profile
      );

    const profileLabel =
      profileButton
      ?.querySelector(
        ".pd-luxury-profile-label"
      );

    if (
      profileLabel
    ) {

      profileLabel.textContent =
        text.profile;

    }

    renderRows();

    renderProfile();

    renderSideMenu();

    renderInstallUI();

  }

  function showHeader() {

    document
      .getElementById(
        "pdLuxuryHeader"
      )
      ?.classList
      .remove(
        "pd-header-hidden"
      );

  }

  function hideHeader() {

    document
      .getElementById(
        "pdLuxuryHeader"
      )
      ?.classList
      .add(
        "pd-header-hidden"
      );

  }

  function sideMenuOpen() {

    return document
      .getElementById(
        "pdShellMenu"
      )
      ?.classList
      .contains(
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
            window.scrollY ||
            0
          );

        const delta =
          y -
          lastY;

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
            ?.classList
            .contains(
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

        } else if (
          direction
        ) {

          if (
            direction !==
            lastDirection
          ) {

            accumulated =
              0;

          }

          accumulated +=
            Math.abs(
              delta
            );

          /*
          Finger moves UP:
          page scrollY increases.
          Header disappears.
          */

          if (
            direction > 0 &&
            accumulated >= 16
          ) {

            hideHeader();

            accumulated =
              0;

          }

          /*
          Finger moves DOWN:
          page scrollY decreases.
          Header returns.
          */

          else if (
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
      menu
        ?.classList
        .contains(
          "open"
        ) &&

      !menu.contains(
        event.target
      ) &&

      !button
        ?.contains(
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

      closeInstallSheet();

    }

  }

  function listenLanguage() {

    window.addEventListener(
      "petsdogue:languagechange",
      event => {

        const code =
          normalizeLanguage(
            event
              ?.detail
              ?.language ||
            ""
          );

        if (
          code &&
          supportedLanguage(
            code
          ) &&
          code !==
          language
        ) {

          persistLanguage(
            code
          );

          refreshText();

        }

      }
    );

    window.addEventListener(
      "storage",
      event => {

        if (
          event.key ===
          LANGUAGE_KEY
        ) {

          persistLanguage(
            event.newValue ||
            "en"
          );

          refreshText();

        }

      }
    );

  }

  function isIos() {

    return (
      /iphone|ipad|ipod/i
      .test(
        window
          .navigator
          .userAgent ||
        ""
      )
    );

  }

  function ensureManifestLink() {

    if (
      !isPetFriendlyPage()
    ) {

      return;

    }

    let manifest =
      document.querySelector(
        'link[rel="manifest"]'
      );

    if (!manifest) {

      manifest =
        document.createElement(
          "link"
        );

      manifest.rel =
        "manifest";

      document.head
        .appendChild(
          manifest
        );

    }

    manifest.href =
      PET_FRIENDLY_MANIFEST;

    let theme =
      document.querySelector(
        'meta[name="theme-color"]'
      );

    if (!theme) {

      theme =
        document.createElement(
          "meta"
        );

      theme.name =
        "theme-color";

      document.head
        .appendChild(
          theme
        );

    }

    theme.content =
      "#65e51f";

    let apple =
      document.querySelector(
        'meta[name="apple-mobile-web-app-capable"]'
      );

    if (!apple) {

      apple =
        document.createElement(
          "meta"
        );

      apple.name =
        "apple-mobile-web-app-capable";

      document.head
        .appendChild(
          apple
        );

    }

    apple.content =
      "yes";

    let status =
      document.querySelector(
        'meta[name="apple-mobile-web-app-status-bar-style"]'
      );

    if (!status) {

      status =
        document.createElement(
          "meta"
        );

      status.name =
        "apple-mobile-web-app-status-bar-style";

      document.head
        .appendChild(
          status
        );

    }

    status.content =
      "default";

  }

  function registerPetFriendlySW() {

    if (
      !isPetFriendlyPage()
    ) {

      return;

    }

    if (
      !(
        "serviceWorker"
        in navigator
      )
    ) {

      return;

    }

    navigator
      .serviceWorker
      .register(
        PET_FRIENDLY_SW
      )
      .catch(
        () => {}
      );

  }

  function createInstallUI() {

    if (
      !isPetFriendlyPage()
    ) {

      return;

    }

    if (
      !document.getElementById(
        "pdInstallLauncher"
      )
    ) {

      const launcher =
        document.createElement(
          "button"
        );

      launcher.id =
        "pdInstallLauncher";

      launcher.type =
        "button";

      launcher
        .addEventListener(
          "click",
          onInstallTap
        );

      document.body
        .appendChild(
          launcher
        );

    }

    if (
      !document.getElementById(
        "pdInstallSheet"
      )
    ) {

      const sheet =
        document.createElement(
          "div"
        );

      sheet.id =
        "pdInstallSheet";

      sheet.innerHTML = `

<div
class="pd-install-card"
role="dialog"
aria-modal="true"
>

<h3
id="pdInstallTitle"
></h3>

<p
id="pdInstallText"
></p>

<div
class="pd-install-actions"
>

<button
id="pdInstallPrimary"
class="primary"
type="button"
></button>

<button
id="pdInstallLater"
type="button"
></button>

</div>

</div>

`;

      sheet.addEventListener(
        "click",
        event => {

          if (
            event.target ===
            sheet
          ) {

            closeInstallSheet();

          }

        }
      );

      document.body
        .appendChild(
          sheet
        );

      document
        .getElementById(
          "pdInstallPrimary"
        )
        ?.addEventListener(
          "click",
          triggerInstallFlow
        );

      document
        .getElementById(
          "pdInstallLater"
        )
        ?.addEventListener(
          "click",
          closeInstallSheet
        );

    }

    renderInstallUI();

  }

  function renderInstallUI() {

    if (
      !isPetFriendlyPage()
    ) {

      return;

    }

    const text =
      copy();

    const launcher =
      document.getElementById(
        "pdInstallLauncher"
      );

    const title =
      document.getElementById(
        "pdInstallTitle"
      );

    const copyElement =
      document.getElementById(
        "pdInstallText"
      );

    const primary =
      document.getElementById(
        "pdInstallPrimary"
      );

    const later =
      document.getElementById(
        "pdInstallLater"
      );

    if (launcher) {

      launcher.textContent =
        text.installCta;

    }

    if (title) {

      title.textContent =
        text.installTitle;

    }

    if (copyElement) {

      copyElement.textContent =
        deferredInstallPrompt
          ? text.installText
          : text.iosHint;

    }

    if (primary) {

      primary.textContent =
        text.installNow;

    }

    if (later) {

      later.textContent =
        text.later;

    }

    updateInstallVisibility();

  }

  function updateInstallVisibility() {

    const launcher =
      document.getElementById(
        "pdInstallLauncher"
      );

    if (!launcher) {
      return;
    }

    const standalone =
      window
        .matchMedia(
          "(display-mode: standalone)"
        )
        .matches ||

      window
        .navigator
        .standalone ===
        true;

    if (
      standalone
    ) {

      launcher
        .classList
        .remove(
          "show"
        );

      return;

    }

    launcher
      .classList
      .toggle(
        "show",
        Boolean(
          deferredInstallPrompt ||
          isIos()
        )
      );

  }

  function openInstallSheet() {

    document
      .getElementById(
        "pdInstallSheet"
      )
      ?.classList
      .add(
        "open"
      );

  }

  function closeInstallSheet() {

    document
      .getElementById(
        "pdInstallSheet"
      )
      ?.classList
      .remove(
        "open"
      );

  }

  function onInstallTap() {

    renderInstallUI();

    openInstallSheet();

  }

  async function triggerInstallFlow() {

    if (
      deferredInstallPrompt
    ) {

      deferredInstallPrompt
        .prompt();

      try {

        await
          deferredInstallPrompt
          .userChoice;

      } catch (error) {}

      deferredInstallPrompt =
        null;

      closeInstallSheet();

      updateInstallVisibility();

      return;

    }

    closeInstallSheet();

  }

  function preparePetFriendlyInstall() {

    if (
      !isPetFriendlyPage()
    ) {

      return;

    }

    ensureManifestLink();

    registerPetFriendlySW();

    createInstallUI();

    window.addEventListener(
      "beforeinstallprompt",
      event => {

        event.preventDefault();

        deferredInstallPrompt =
          event;

        renderInstallUI();

      }
    );

    window.addEventListener(
      "appinstalled",
      () => {

        deferredInstallPrompt =
          null;

        updateInstallVisibility();

        closeInstallSheet();

      }
    );

  }

  function init() {

    if (
      document
        .documentElement
        .dataset
        .petsDogueHeaderOnly ===
      "7"
    ) {

      return;

    }

    document
      .documentElement
      .dataset
      .petsDogueHeaderOnly =
      "7";

    persistLanguage(
      detectLanguage()
    );

    activeKey =
      detectActiveKey();

    installStyles();

    hideLegacy();

    createHomeImage();

    createHeader();

    createSideMenu();

    createInstallUI();

    preparePetFriendlyInstall();

    watchLegacy();

    listenLanguage();

    showHeader();

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

    window.PetsDogueHeader = {
      show: showHeader,
      hide: hideHeader,
      openMenu: openSideMenu,
      closeMenu: closeSideMenu,
      refreshLanguage:
        applyLanguage
    };

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
