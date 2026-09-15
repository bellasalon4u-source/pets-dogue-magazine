"use strict";

(function () {

  const LANGUAGE_KEY = "pets_dogue_language";
  const HOME_MASTHEAD_FILE = "pets-dogue-header.png?v=20260913-global-shell-home-1";
  const PET_FRIENDLY_MANIFEST = "pet-friendly.webmanifest?v=1";
  const PET_FRIENDLY_SW = "pet-friendly-sw.js?v=1";

  const LANGUAGE_ALIASES = {
    ua:"uk",
    cz:"cs",
    gr:"el",
    se:"sv",
    dk:"da"
  };

  const LANGUAGE_OPTIONS = [
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

  const SUPPORTED_LANGUAGES =
    new Set(
      LANGUAGE_OPTIONS.map(item => item[0])
    );

  const ROUTES = {
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
    advertise:"partners.html"
  };

  const PAGE_KEYS = {
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

    "partners.html":"advertise"
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

  const STRINGS = {

    en:[
      "Open menu",
      "Close menu",
      "Contents",
      "Profile",
      "Advertise with us",
      "Language",
      "Sign In",
      "Join Club",
      "Home",
      "Add Pet-Friendly to Home Screen",
      "Keep Pet-Friendly close",
      "Add Pet-Friendly Places to your home screen so it is always one tap away.",
      "Add now",
      "Later",
      "On iPhone: tap Share, then choose Add to Home Screen.",
      "Pet-Friendly Places",
      "Discounts",
      "Help",
      "Community",
      "Marketplace",
      "Edition",
      "Cover Stars",
      "Contests",
      "Articles",
      "Photos",
      "Fashion",
      "Health"
    ],

    uk:[
      "Відкрити меню",
      "Закрити меню",
      "Зміст",
      "Профіль",
      "Реклама у нас",
      "Мова",
      "Увійти",
      "Вступити до клубу",
      "Головна",
      "Додати Pet-Friendly на головний екран",
      "Тримайте Pet-Friendly під рукою",
      "Додайте Pet-Friendly Places на головний екран, щоб відкривати його одним дотиком.",
      "Додати",
      "Пізніше",
      "На iPhone: натисніть Share, потім Add to Home Screen.",
      "Pet-Friendly місця",
      "Знижки",
      "Допомога",
      "Спільнота",
      "Маркетплейс",
      "Видання",
      "Зірки обкладинки",
      "Конкурси",
      "Статті",
      "Фото",
      "Мода",
      "Здоров’я"
    ],

    ru:[
      "Открыть меню",
      "Закрыть меню",
      "Содержание",
      "Профиль",
      "Реклама у нас",
      "Язык",
      "Войти",
      "Вступить в клуб",
      "Главная",
      "Добавить Pet-Friendly на главный экран",
      "Держите Pet-Friendly под рукой",
      "Добавьте Pet-Friendly Places на главный экран, чтобы открывать раздел в один тап.",
      "Добавить",
      "Позже",
      "На iPhone: нажмите Share, затем Add to Home Screen.",
      "Pet-Friendly места",
      "Скидки",
      "Помощь",
      "Сообщество",
      "Маркетплейс",
      "Издание",
      "Звёзды обложки",
      "Конкурсы",
      "Статьи",
      "Фото",
      "Мода",
      "Здоровье"
    ],

    fr:[
      "Ouvrir le menu",
      "Fermer le menu",
      "Sommaire",
      "Profil",
      "Faire de la publicité",
      "Langue",
      "Se connecter",
      "Rejoindre le Club",
      "Accueil",
      "Ajouter Pet-Friendly à l’écran d’accueil",
      "Gardez Pet-Friendly à portée de main",
      "Ajoutez Pet-Friendly Places à votre écran d’accueil pour y accéder en un geste.",
      "Ajouter",
      "Plus tard",
      "Sur iPhone : touchez Partager, puis Ajouter à l’écran d’accueil.",
      "Lieux pet-friendly",
      "Réductions",
      "Aide",
      "Communauté",
      "Marketplace",
      "Édition",
      "Stars de couverture",
      "Concours",
      "Articles",
      "Photos",
      "Mode",
      "Santé"
    ],

    de:[
      "Menü öffnen",
      "Menü schließen",
      "Inhalt",
      "Profil",
      "Bei uns werben",
      "Sprache",
      "Anmelden",
      "Club beitreten",
      "Startseite",
      "Pet-Friendly zum Startbildschirm hinzufügen",
      "Pet-Friendly immer griffbereit",
      "Fügen Sie Pet-Friendly Places zum Startbildschirm hinzu, um es mit einem Tipp zu öffnen.",
      "Hinzufügen",
      "Später",
      "Auf dem iPhone: Teilen antippen und Zum Home-Bildschirm wählen.",
      "Tierfreundliche Orte",
      "Rabatte",
      "Hilfe",
      "Community",
      "Marktplatz",
      "Edition",
      "Cover Stars",
      "Wettbewerbe",
      "Artikel",
      "Fotos",
      "Mode",
      "Gesundheit"
    ],

    es:[
      "Abrir menú",
      "Cerrar menú",
      "Contenido",
      "Perfil",
      "Anúnciate con nosotros",
      "Idioma",
      "Iniciar sesión",
      "Unirse al Club",
      "Inicio",
      "Añadir Pet-Friendly a la pantalla de inicio",
      "Ten Pet-Friendly siempre a mano",
      "Añade Pet-Friendly Places a tu pantalla de inicio para abrirlo con un toque.",
      "Añadir",
      "Más tarde",
      "En iPhone: toca Compartir y luego Añadir a pantalla de inicio.",
      "Lugares pet-friendly",
      "Descuentos",
      "Ayuda",
      "Comunidad",
      "Marketplace",
      "Edición",
      "Estrellas de portada",
      "Concursos",
      "Artículos",
      "Fotos",
      "Moda",
      "Salud"
    ],

    it:[
      "Apri menu",
      "Chiudi menu",
      "Contenuti",
      "Profilo",
      "Pubblicizza con noi",
      "Lingua",
      "Accedi",
      "Unisciti al Club",
      "Home",
      "Aggiungi Pet-Friendly alla schermata Home",
      "Tieni Pet-Friendly a portata di mano",
      "Aggiungi Pet-Friendly Places alla schermata Home per aprirlo con un tocco.",
      "Aggiungi",
      "Più tardi",
      "Su iPhone: tocca Condividi, poi Aggiungi a Home.",
      "Luoghi pet-friendly",
      "Sconti",
      "Aiuto",
      "Community",
      "Marketplace",
      "Edizione",
      "Cover Stars",
      "Concorsi",
      "Articoli",
      "Foto",
      "Moda",
      "Salute"
    ],

    pt:[
      "Abrir menu",
      "Fechar menu",
      "Conteúdo",
      "Perfil",
      "Anuncie connosco",
      "Idioma",
      "Entrar",
      "Entrar no Clube",
      "Início",
      "Adicionar Pet-Friendly ao ecrã principal",
      "Tenha Pet-Friendly sempre à mão",
      "Adicione Pet-Friendly Places ao ecrã principal para abrir com um toque.",
      "Adicionar",
      "Mais tarde",
      "No iPhone: toque em Partilhar e depois Adicionar ao ecrã principal.",
      "Locais pet-friendly",
      "Descontos",
      "Ajuda",
      "Comunidade",
      "Marketplace",
      "Edição",
      "Estrelas de capa",
      "Concursos",
      "Artigos",
      "Fotos",
      "Moda",
      "Saúde"
    ],

    nl:[
      "Menu openen",
      "Menu sluiten",
      "Inhoud",
      "Profiel",
      "Adverteer bij ons",
      "Taal",
      "Inloggen",
      "Word lid",
      "Home",
      "Pet-Friendly aan beginscherm toevoegen",
      "Houd Pet-Friendly dichtbij",
      "Voeg Pet-Friendly Places toe aan je beginscherm zodat het altijd één tik verwijderd is.",
      "Toevoegen",
      "Later",
      "Op iPhone: tik op Delen en kies Zet op beginscherm.",
      "Huisdiervriendelijke plekken",
      "Kortingen",
      "Hulp",
      "Community",
      "Marktplaats",
      "Editie",
      "Cover Stars",
      "Wedstrijden",
      "Artikelen",
      "Foto’s",
      "Mode",
      "Gezondheid"
    ],    pl:[
      "Otwórz menu",
      "Zamknij menu",
      "Spis treści",
      "Profil",
      "Reklamuj się z nami",
      "Język",
      "Zaloguj się",
      "Dołącz do klubu",
      "Strona główna",
      "Dodaj Pet-Friendly do ekranu głównego",
      "Miej Pet-Friendly pod ręką",
      "Dodaj Pet-Friendly Places do ekranu głównego, aby otwierać je jednym dotknięciem.",
      "Dodaj",
      "Później",
      "Na iPhonie: stuknij Udostępnij, a potem Dodaj do ekranu początkowego.",
      "Miejsca przyjazne zwierzętom",
      "Rabaty",
      "Pomoc",
      "Społeczność",
      "Marketplace",
      "Edycja",
      "Gwiazdy okładki",
      "Konkursy",
      "Artykuły",
      "Zdjęcia",
      "Moda",
      "Zdrowie"
    ],

    cs:[
      "Otevřít menu",
      "Zavřít menu",
      "Obsah",
      "Profil",
      "Inzerujte u nás",
      "Jazyk",
      "Přihlásit se",
      "Vstoupit do klubu",
      "Domů",
      "Přidat Pet-Friendly na plochu",
      "Mějte Pet-Friendly po ruce",
      "Přidejte Pet-Friendly Places na plochu a otevřete je jedním klepnutím.",
      "Přidat",
      "Později",
      "Na iPhonu: klepněte na Sdílet a zvolte Přidat na plochu.",
      "Místa přátelská ke zvířatům",
      "Slevy",
      "Pomoc",
      "Komunita",
      "Marketplace",
      "Vydání",
      "Hvězdy obálky",
      "Soutěže",
      "Články",
      "Fotografie",
      "Móda",
      "Zdraví"
    ],

    sk:[
      "Otvoriť menu",
      "Zavrieť menu",
      "Obsah",
      "Profil",
      "Inzerujte u nás",
      "Jazyk",
      "Prihlásiť sa",
      "Vstúpiť do klubu",
      "Domov",
      "Pridať Pet-Friendly na plochu",
      "Majte Pet-Friendly poruke",
      "Pridajte Pet-Friendly Places na plochu a otvorte ich jedným ťuknutím.",
      "Pridať",
      "Neskôr",
      "Na iPhone: ťuknite na Zdieľať a potom Pridať na plochu.",
      "Miesta priateľské k zvieratám",
      "Zľavy",
      "Pomoc",
      "Komunita",
      "Marketplace",
      "Vydanie",
      "Hviezdy obálky",
      "Súťaže",
      "Články",
      "Fotografie",
      "Móda",
      "Zdravie"
    ],

    hu:[
      "Menü megnyitása",
      "Menü bezárása",
      "Tartalom",
      "Profil",
      "Hirdessen nálunk",
      "Nyelv",
      "Bejelentkezés",
      "Csatlakozás a klubhoz",
      "Kezdőlap",
      "Pet-Friendly hozzáadása a kezdőképernyőhöz",
      "Legyen kéznél a Pet-Friendly",
      "Adja hozzá a Pet-Friendly Places oldalt a kezdőképernyőhöz.",
      "Hozzáadás",
      "Később",
      "iPhone-on: koppintson a Megosztásra, majd a Hozzáadás a Főképernyőhöz lehetőségre.",
      "Állatbarát helyek",
      "Kedvezmények",
      "Segítség",
      "Közösség",
      "Marketplace",
      "Kiadás",
      "Címlapsztárok",
      "Versenyek",
      "Cikkek",
      "Fotók",
      "Divat",
      "Egészség"
    ],

    ro:[
      "Deschide meniul",
      "Închide meniul",
      "Cuprins",
      "Profil",
      "Publicitate cu noi",
      "Limbă",
      "Autentificare",
      "Intră în Club",
      "Acasă",
      "Adaugă Pet-Friendly pe ecranul principal",
      "Ține Pet-Friendly la îndemână",
      "Adaugă Pet-Friendly Places pe ecranul principal pentru acces dintr-o atingere.",
      "Adaugă",
      "Mai târziu",
      "Pe iPhone: apasă Partajare, apoi Adaugă pe ecranul principal.",
      "Locuri pet-friendly",
      "Reduceri",
      "Ajutor",
      "Comunitate",
      "Marketplace",
      "Ediție",
      "Vedete de copertă",
      "Concursuri",
      "Articole",
      "Fotografii",
      "Modă",
      "Sănătate"
    ],

    bg:[
      "Отвори меню",
      "Затвори меню",
      "Съдържание",
      "Профил",
      "Рекламирайте при нас",
      "Език",
      "Вход",
      "Влезте в клуба",
      "Начало",
      "Добавете Pet-Friendly на началния екран",
      "Дръжте Pet-Friendly под ръка",
      "Добавете Pet-Friendly Places на началния екран за достъп с едно докосване.",
      "Добави",
      "По-късно",
      "На iPhone: натиснете Share, после Add to Home Screen.",
      "Места за любимци",
      "Отстъпки",
      "Помощ",
      "Общност",
      "Маркетплейс",
      "Издание",
      "Звезди на корицата",
      "Конкурси",
      "Статии",
      "Снимки",
      "Мода",
      "Здраве"
    ],

    el:[
      "Άνοιγμα μενού",
      "Κλείσιμο μενού",
      "Περιεχόμενα",
      "Προφίλ",
      "Διαφημιστείτε μαζί μας",
      "Γλώσσα",
      "Σύνδεση",
      "Εγγραφή στο Club",
      "Αρχική",
      "Προσθήκη Pet-Friendly στην αρχική οθόνη",
      "Έχετε το Pet-Friendly πάντα κοντά",
      "Προσθέστε το Pet-Friendly Places στην αρχική οθόνη.",
      "Προσθήκη",
      "Αργότερα",
      "Σε iPhone: πατήστε Κοινή χρήση και μετά Προσθήκη στην αρχική οθόνη.",
      "Pet-friendly μέρη",
      "Εκπτώσεις",
      "Βοήθεια",
      "Κοινότητα",
      "Marketplace",
      "Έκδοση",
      "Αστέρια εξωφύλλου",
      "Διαγωνισμοί",
      "Άρθρα",
      "Φωτογραφίες",
      "Μόδα",
      "Υγεία"
    ],

    sv:[
      "Öppna meny",
      "Stäng meny",
      "Innehåll",
      "Profil",
      "Annonsera hos oss",
      "Språk",
      "Logga in",
      "Gå med i Club",
      "Hem",
      "Lägg till Pet-Friendly på hemskärmen",
      "Ha Pet-Friendly nära till hands",
      "Lägg till Pet-Friendly Places på hemskärmen så att det alltid är ett tryck bort.",
      "Lägg till",
      "Senare",
      "På iPhone: tryck på Dela och välj Lägg till på hemskärmen.",
      "Djurvänliga platser",
      "Rabatter",
      "Hjälp",
      "Community",
      "Marketplace",
      "Utgåva",
      "Omslagsstjärnor",
      "Tävlingar",
      "Artiklar",
      "Foton",
      "Mode",
      "Hälsa"
    ],

    da:[
      "Åbn menu",
      "Luk menu",
      "Indhold",
      "Profil",
      "Annoncér hos os",
      "Sprog",
      "Log ind",
      "Bliv medlem",
      "Hjem",
      "Føj Pet-Friendly til hjemmeskærmen",
      "Hav Pet-Friendly lige ved hånden",
      "Føj Pet-Friendly Places til hjemmeskærmen, så det altid er ét tryk væk.",
      "Tilføj",
      "Senere",
      "På iPhone: tryk Del og vælg Føj til hjemmeskærm.",
      "Kæledyrsvenlige steder",
      "Rabatter",
      "Hjælp",
      "Fællesskab",
      "Marketplace",
      "Udgave",
      "Forsidestjerner",
      "Konkurrencer",
      "Artikler",
      "Fotos",
      "Mode",
      "Sundhed"
    ],

    no:[
      "Åpne meny",
      "Lukk meny",
      "Innhold",
      "Profil",
      "Annonser hos oss",
      "Språk",
      "Logg inn",
      "Bli med i Club",
      "Hjem",
      "Legg Pet-Friendly til på hjemskjermen",
      "Ha Pet-Friendly lett tilgjengelig",
      "Legg Pet-Friendly Places til på hjemskjermen.",
      "Legg til",
      "Senere",
      "På iPhone: trykk Del og velg Legg til på Hjem-skjerm.",
      "Kjæledyrvennlige steder",
      "Rabatter",
      "Hjelp",
      "Fellesskap",
      "Marketplace",
      "Utgave",
      "Forsidestjerner",
      "Konkurranser",
      "Artikler",
      "Bilder",
      "Mote",
      "Helse"
    ],

    fi:[
      "Avaa valikko",
      "Sulje valikko",
      "Sisältö",
      "Profiili",
      "Mainosta kanssamme",
      "Kieli",
      "Kirjaudu",
      "Liity Clubiin",
      "Koti",
      "Lisää Pet-Friendly aloitusnäyttöön",
      "Pidä Pet-Friendly helposti saatavilla",
      "Lisää Pet-Friendly Places aloitusnäyttöön.",
      "Lisää",
      "Myöhemmin",
      "iPhonessa: napauta Jaa ja valitse Lisää Koti-valikkoon.",
      "Lemmikkiystävälliset paikat",
      "Alennukset",
      "Apua",
      "Yhteisö",
      "Marketplace",
      "Julkaisu",
      "Kansitähdet",
      "Kilpailut",
      "Artikkelit",
      "Kuvat",
      "Muoti",
      "Terveys"
    ],

    tr:[
      "Menüyü aç",
      "Menüyü kapat",
      "İçindekiler",
      "Profil",
      "Bizimle reklam verin",
      "Dil",
      "Giriş yap",
      "Club'a katıl",
      "Ana sayfa",
      "Pet-Friendly’yi ana ekrana ekle",
      "Pet-Friendly her zaman elinizin altında",
      "Pet-Friendly Places’ı ana ekranınıza ekleyin.",
      "Ekle",
      "Daha sonra",
      "iPhone’da: Paylaş’a dokunun, ardından Ana Ekrana Ekle’yi seçin.",
      "Evcil hayvan dostu yerler",
      "İndirimler",
      "Yardım",
      "Topluluk",
      "Marketplace",
      "Edisyon",
      "Kapak yıldızları",
      "Yarışmalar",
      "Makaleler",
      "Fotoğraflar",
      "Moda",
      "Sağlık"
    ],

    ar:[
      "فتح القائمة",
      "إغلاق القائمة",
      "المحتويات",
      "الملف الشخصي",
      "أعلن معنا",
      "اللغة",
      "تسجيل الدخول",
      "انضم إلى النادي",
      "الرئيسية",
      "أضف Pet-Friendly إلى الشاشة الرئيسية",
      "اجعل Pet-Friendly قريبًا دائمًا",
      "أضف Pet-Friendly Places إلى الشاشة الرئيسية للوصول إليه بلمسة واحدة.",
      "إضافة",
      "لاحقًا",
      "على iPhone: اضغط مشاركة ثم اختر إضافة إلى الشاشة الرئيسية.",
      "أماكن صديقة للحيوانات",
      "الخصومات",
      "المساعدة",
      "المجتمع",
      "السوق",
      "الإصدار",
      "نجوم الغلاف",
      "المسابقات",
      "المقالات",
      "الصور",
      "الموضة",
      "الصحة"
    ],

    hi:[
      "मेनू खोलें",
      "मेनू बंद करें",
      "विषय सूची",
      "प्रोफ़ाइल",
      "हमारे साथ विज्ञापन करें",
      "भाषा",
      "साइन इन",
      "क्लब में शामिल हों",
      "होम",
      "Pet-Friendly को होम स्क्रीन पर जोड़ें",
      "Pet-Friendly को पास रखें",
      "Pet-Friendly Places को होम स्क्रीन पर जोड़ें ताकि यह हमेशा एक टैप की दूरी पर रहे।",
      "जोड़ें",
      "बाद में",
      "iPhone पर: Share टैप करें, फिर Add to Home Screen चुनें।",
      "पालतू-अनुकूल स्थान",
      "छूट",
      "मदद",
      "समुदाय",
      "मार्केटप्लेस",
      "संस्करण",
      "कवर स्टार्स",
      "प्रतियोगिताएँ",
      "लेख",
      "फोटो",
      "फैशन",
      "स्वास्थ्य"
    ]

  };

  const DISCOVER_TEXT = {

    en:"Discover every section",
    uk:"Відкрийте для себе всі рубрики",
    ru:"Откройте для себя все рубрики",
    fr:"Découvrez toutes les rubriques",
    de:"Entdecken Sie alle Bereiche",
    es:"Descubre todas las secciones",
    it:"Scopri tutte le sezioni",
    pt:"Descubra todas as secções",
    nl:"Ontdek alle rubrieken",
    pl:"Odkryj wszystkie sekcje",
    cs:"Objevte všechny rubriky",
    sk:"Objavte všetky rubriky",
    hu:"Fedezze fel az összes rovatot",
    ro:"Descoperă toate secțiunile",
    bg:"Открийте всички рубрики",
    el:"Ανακαλύψτε όλες τις ενότητες",
    sv:"Upptäck alla sektioner",
    da:"Oplev alle sektioner",
    no:"Oppdag alle seksjoner",
    fi:"Tutustu kaikkiin osioihin",
    tr:"Tüm bölümleri keşfedin",
    ar:"اكتشف جميع الأقسام",
    hi:"सभी अनुभाग खोजें"

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

  let deferredInstallPrompt = null;

  function normalizeLanguage(value){

    const raw =
      String(value || "")
      .trim()
      .toLowerCase()
      .replace("_","-");

    if(!raw){
      return "";
    }

    const base =
      raw.split("-")[0];

    return (
      LANGUAGE_ALIASES[base] ||
      base
    );

  }

  function supportedLanguage(value){

    return SUPPORTED_LANGUAGES.has(
      normalizeLanguage(value)
    );

  }

  function currentFile(){

    const path =
      window.location.pathname || "";

    return (
      path
      .split("/")
      .filter(Boolean)
      .pop()
      ||
      "index.html"
    )
    .toLowerCase();

  }

  function isHome(){

    return (
      currentFile() ===
      "index.html"
    );

  }

  function detectActiveKey(){

    const file =
      currentFile();

    if(PAGE_KEYS[file]){
      return PAGE_KEYS[file];
    }

    const path =
      (
        window.location.pathname ||
        ""
      )
      .toLowerCase();

    for(
      const [name,key]
      of
      Object.entries(PAGE_KEYS)
    ){

      if(
        path.includes(
          name.replace(
            ".html",
            ""
          )
        )
      ){

        return key;

      }

    }

    return "";

  }

  function isPetFriendlyPage(){

    return (
      detectActiveKey() ===
      "petFriendly"
    );

  }

  function pageLanguageSelect(){

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

    for(
      const selector
      of
      selectors
    ){

      const element =
        document.querySelector(
          selector
        );

      if(
        element &&
        element.id !==
        "pdShellLanguage"
      ){

        return element;

      }

    }

    return null;

  }

  function detectLanguage(){

    try{

      const saved =
        normalizeLanguage(
          localStorage.getItem(
            LANGUAGE_KEY
          )
          ||
          ""
        );

      if(
        saved &&
        supportedLanguage(saved)
      ){

        return saved;

      }

    }catch(error){}

    const fromSelect =
      normalizeLanguage(
        pageLanguageSelect()?.value ||
        ""
      );

    if(
      fromSelect &&
      supportedLanguage(fromSelect)
    ){

      return fromSelect;

    }

    const htmlLang =
      normalizeLanguage(
        document.documentElement.lang ||
        ""
      );

    return supportedLanguage(htmlLang)
      ? htmlLang
      : "en";

  }

  function arr(){

    return (
      STRINGS[language] ||
      STRINGS.en
    );

  }

  function copy(){

    const a =
      arr();

    return {

      openMenu:a[0],
      closeMenu:a[1],
      contents:a[2],
      profile:a[3],
      advertise:a[4],
      language:a[5],
      signIn:a[6],
      joinClub:a[7],
      home:a[8],

      installCta:a[9],
      installTitle:a[10],
      installText:a[11],
      installNow:a[12],
      later:a[13],
      iosHint:a[14],

      labels:{
        petFriendly:a[15],
        discounts:a[16],
        help:a[17],
        community:a[18],
        marketplace:a[19],
        edition:a[20],
        coverStars:a[21],
        contests:a[22],
        articles:a[23],
        photos:a[24],
        fashion:a[25],
        health:a[26]
      }

    };

  }

  function esc(value){

    return String(
      value ??
      ""
    )
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  }

  function persistLanguage(code){

    const normalized =
      normalizeLanguage(code);

    language =
      supportedLanguage(normalized)
      ? normalized
      : "en";

    try{

      localStorage.setItem(
        LANGUAGE_KEY,
        language
      );

    }catch(error){}

    document.documentElement.lang =
      language;

    document.documentElement.dir =
      language === "ar"
      ? "rtl"
      : "ltr";

  }  function installStyles(){

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
transition:transform .23s cubic-bezier(.2,.75,.2,1);
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
minmax(82px,1fr)
34px
auto
auto;
align-items:center;
gap:6px;
padding:4px 8px;
background:var(--pdh-black);
border-bottom:1px solid var(--pdh-gold-line);
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

#pdLuxuryHome{
width:32px;
height:32px;
display:flex;
align-items:center;
justify-content:center;
border:1px solid rgba(255,255,255,.26);
border-radius:10px;
background:#0c0c0c;
color:#fff;
text-decoration:none;
}

#pdLuxuryHome svg{
width:19px;
height:19px;
fill:none;
stroke:currentColor;
stroke-width:1.9;
stroke-linecap:round;
stroke-linejoin:round;
}

#pdLuxuryAdvertise{
min-height:31px;
display:inline-flex;
align-items:center;
justify-content:center;
padding:0 10px;
border:2px solid var(--pdh-red);
border-radius:999px;
background:rgba(219,46,46,.08);
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
transform:translateY(-5px);
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
border-bottom:1px solid var(--pdh-gold-line);
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
min-height:32px;
display:flex;
align-items:center;
justify-content:center;
gap:6px;
padding:0 10px;
color:#f7f7f7;
text-decoration:none;
font-family:var(--pdh-serif);
font-size:11.5px;
border-radius:999px;
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

#pdContentsTicker{
position:relative;
z-index:13950;
width:100%;
height:44px;
display:flex;
align-items:center;
overflow:hidden;
background:#f6f0e4;
color:#111;
border-top:1px solid #c89b3c;
border-bottom:1px solid #c89b3c;
cursor:pointer;
user-select:none;
-webkit-user-select:none;
-webkit-tap-highlight-color:transparent;
}

#pdContentsTicker:hover{
background:#fffaf1;
}

.pd-ticker-marquee{
position:relative;
width:100%;
height:100%;
overflow:hidden;
display:flex;
align-items:center;
}

.pd-ticker-track{
display:flex;
align-items:center;
height:100%;
width:max-content;
min-width:max-content;
direction:ltr;
will-change:transform;
animation:
pdTickerRightToLeft
24s
linear
infinite;
}

.pd-ticker-group{
display:flex;
align-items:center;
height:100%;
flex:0 0 auto;
white-space:nowrap;
}

.pd-ticker-piece{
height:100%;
display:inline-flex;
align-items:center;
gap:10px;
padding:0 30px;
white-space:nowrap;
font-family:var(--pdh-serif);
font-size:17px;
line-height:1;
}

.pd-ticker-title{
font-weight:700;
}

.pd-ticker-separator{
color:#bd8b2e;
}

.pd-ticker-arrow{
font-family:var(--pdh-sans);
font-size:19px;
}

@keyframes pdTickerRightToLeft{

0%{
transform:translate3d(0,0,0);
}

100%{
transform:translate3d(-50%,0,0);
}

}

html[dir="rtl"]
.pd-ticker-track{
animation-name:
pdTickerLeftToRight;
}

html[dir="rtl"]
.pd-ticker-piece{
direction:rtl;
}

html[dir="rtl"]
.pd-ticker-arrow{
transform:scaleX(-1);
}

@keyframes pdTickerLeftToRight{

0%{
transform:translate3d(-50%,0,0);
}

100%{
transform:translate3d(0,0,0);
}

}

#pdShellOverlay{
position:fixed;
inset:0;
z-index:14980;
background:rgba(0,0,0,.56);
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

width:min(94vw,720px);
min-width:286px;
max-width:720px;

background:var(--pdh-cream);
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
transform:translateX(0);
}

html[dir="rtl"]
#pdShellMenu{
left:auto;
right:0;
transform:translateX(104%);
}

html[dir="rtl"]
#pdShellMenu.open{
transform:translateX(0);
}

.pd-shell-menu-head{
min-height:82px;
padding:0 16px;
background:#050505;
color:#fff;
display:flex;
align-items:center;
justify-content:space-between;
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
padding:12px 11px 20px;
-webkit-overflow-scrolling:touch;
}

.pd-shell-account{
display:grid;
grid-template-columns:1fr 1fr;
gap:8px;
margin-bottom:12px;
}

.pd-shell-account a{
min-height:48px;
border:2px solid #181818;
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
border-color:var(--pdh-green);
background:var(--pdh-green);
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
border:2px solid #181818;
border-radius:999px;
background:#fff;
color:#111;
font-size:13px;
font-weight:800;
}

#pdShellCards{
display:grid;
grid-template-columns:
repeat(
2,
minmax(0,1fr)
);
gap:4px;
}

.pd-shell-card{
position:relative;
display:block;
width:100%;
min-width:0;
height:138px;
min-height:138px;

border:0;
border-radius:0;

overflow:hidden;
background:#111;
color:#fff;
text-decoration:none;
isolation:isolate;
}

.pd-shell-card-image{
position:absolute;
inset:0;
z-index:0;

display:block;
width:100%;
height:100%;
min-height:0;

overflow:hidden;
background:#111;
}

.pd-shell-card-image img{
display:block;
width:100%;
height:100%;
min-height:0;
object-fit:cover;
object-position:center;
transition:transform .45s ease;
}

.pd-shell-card::after{
content:"";
position:absolute;
inset:0;
z-index:1;
background:
linear-gradient(
to top,
rgba(0,0,0,.92) 0%,
rgba(0,0,0,.59) 40%,
rgba(0,0,0,.20) 70%,
rgba(0,0,0,.04) 100%
);
pointer-events:none;
}

.pd-shell-card::before{
content:"→";
position:absolute;
right:10px;
bottom:10px;
z-index:4;

width:35px;
height:35px;

display:grid;
place-items:center;

border:
1px solid
#d4a43d;

border-radius:50%;

background:
rgba(5,5,5,.58);

color:#fff;

font-family:var(--pdh-sans);
font-size:18px;
line-height:1;

pointer-events:none;
}

.pd-shell-card-copy{
position:absolute;
left:0;
right:0;
bottom:0;
z-index:3;

display:block;
min-width:0;

padding:
15px
53px
14px
14px;

background:transparent;
}

.pd-shell-card-copy h3{
margin:0;
font:
400
23px/1
var(--pdh-serif);
color:#fff;
text-shadow:
0 2px 12px
rgba(0,0,0,.8);
}

.pd-shell-card-copy .inline{
display:inline;
}

.pd-shell-card.active{
background:#111;
color:#fff;
box-shadow:
inset
0 0 0
2px
rgba(212,164,61,.95);
}

.pd-shell-card.active h3{
color:#fff;
}

.pd-shell-card.advertise,
.pd-shell-card.petfriendly-card{
border:0;
}

.pd-shell-card:hover img{
transform:scale(1.045);
}

html[dir="rtl"]
.pd-shell-card::before{
right:auto;
left:10px;
content:"←";
}

html[dir="rtl"]
.pd-shell-card-copy{
padding:
15px
14px
14px
53px;
text-align:right;
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
background:rgba(0,0,0,.62);
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
transition:transform .18s ease;
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
grid-template-columns:1fr 1fr;
gap:8px;
}

.pd-install-actions button{
min-height:46px;
border-radius:999px;
border:2px solid #181818;
background:#fff;
color:#111;
font-size:12px;
font-weight:900;
cursor:pointer;
}

.pd-install-actions button.primary{
border-color:var(--pdh-green);
background:var(--pdh-green);
}

#pdLuxuryMenuButton:focus-visible,
#pdLuxuryBrand:focus-visible,
#pdLuxuryHome:focus-visible,
#pdLuxuryAdvertise:focus-visible,
#pdLuxuryProfileButton:focus-visible,
.pd-luxury-row-link:focus-visible,
#pdLuxuryProfileMenu a:focus-visible,
.pd-shell-account a:focus-visible,
#pdShellClose:focus-visible,
#pdShellLanguage:focus-visible,
.pd-shell-card:focus-visible,
#pdContentsTicker:focus-visible,
#pdInstallLauncher:focus-visible,
.pd-install-actions button:focus-visible{
outline:
3px solid
var(--pdh-green);
outline-offset:2px;
}

@media(max-width:600px){

#pdContentsTicker{
height:42px;
}

.pd-ticker-piece{
padding:0 24px;
font-size:16px;
}

#pdShellMenu{
width:94vw;
max-width:94vw;
}

#pdShellCards{
grid-template-columns:
repeat(
2,
minmax(0,1fr)
);
gap:4px;
}

.pd-shell-card{
height:128px;
min-height:128px;
}

.pd-shell-card-copy h3{
font-size:20px;
}

}

@media(max-width:390px){

#pdLuxuryMainBar{
grid-template-columns:
36px
minmax(68px,1fr)
30px
auto
auto;
gap:4px;
padding-left:6px;
padding-right:6px;
}

#pdLuxuryBrand{
font-size:16px;
}

#pdLuxuryHome{
width:29px;
height:29px;
border-radius:9px;
}

#pdLuxuryHome svg{
width:17px;
height:17px;
}

#pdLuxuryAdvertise{
min-height:29px;
padding:0 7px;
font-size:7.7px;
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
height:clamp(82px,19vw,108px);
}

}

@media(max-width:370px){

.pd-shell-card{
height:118px;
min-height:118px;
}

.pd-shell-card-copy h3{
font-size:18px;
}

}

@media(max-width:340px){

.pd-luxury-profile-label{
display:none;
}

#pdLuxuryMainBar{
grid-template-columns:
34px
minmax(60px,1fr)
28px
auto
28px;
gap:3px;
}

#pdLuxuryHome{
width:27px;
height:27px;
border-radius:8px;
}

#pdLuxuryAdvertise{
padding:0 6px;
font-size:7.2px;
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

.pd-ticker-track{
animation-duration:48s;
}

}

`;

    document.head.appendChild(
      style
    );

  }

  function hideLegacy(){

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

            if(
              ![
                "pdLuxuryHeader",
                "pdShellMenu",
                "pdShellOverlay",
                "pdInstallLauncher",
                "pdInstallSheet"
              ]
              .includes(
                element.id
              )
            ){

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

  function watchLegacy(){

    if(observer){
      return;
    }

    observer =
      new MutationObserver(
        hideLegacy
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

    return (

      document
      .querySelector(
        ".latest-cover img"
      )
      ?.getAttribute(
        "src"
      )

      ||

      document
      .querySelector(
        ".hero img,main img"
      )
      ?.getAttribute(
        "src"
      )

      ||

      ""

    );

  }

  function createHomeImage(){

    if(
      !isHome() ||
      document.getElementById(
        "pdHomeHeaderImage"
      )
    ){

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
      window.PETS_DOGUE_HOME_MASTHEAD_SRC
      ||
      HOME_MASTHEAD_FILE;

    img.addEventListener(
      "error",
      () => {

        if(
          fallback &&
          img.dataset.fallbackDone !==
          "1"
        ){

          img.dataset.fallbackDone =
            "1";

          img.src =
            fallback;

        }else{

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

  function specialIcon(key){

    if(
      key ===
      "petFriendly"
    ){

      return (
        '<span class="pd-inline-emoji" aria-hidden="true">🐾</span>'
      );

    }

    if(
      key ===
      "help"
    ){

      return (
        '<span class="pd-inline-emoji" aria-hidden="true">❤️</span>'
      );

    }

    return "";

  }

  function navLabel(key){

    return (
      copy().labels[key]
      ||
      englishLabel(key)
      ||
      key
    );

  }

  function englishLabel(key){

    const map = {

      petFriendly:15,
      discounts:16,
      help:17,
      community:18,
      marketplace:19,
      edition:20,
      coverStars:21,
      contests:22,
      articles:23,
      photos:24,
      fashion:25,
      health:26

    };

    return (
      map[key] === undefined
      ? key
      : STRINGS.en[
          map[key]
        ]
    );

  }  function renderRows(){

    const top =
      document.getElementById(
        "pdLuxuryTopRow"
      );

    const bottom =
      document.getElementById(
        "pdLuxuryBottomRow"
      );

    if(
      !top ||
      !bottom
    ){

      return;

    }

    const build =
      keys =>
      keys.map(
        key => {

          const petFriendlyClass =
            key === "petFriendly"
            ? " petfriendly-outline"
            : "";

          const active =
            key === activeKey;

          const label =
            navLabel(key) === key
            ? englishLabel(key)
            : navLabel(key);

          return `

<a
class="pd-luxury-row-link${active ? " active" : ""}${petFriendlyClass}"
href="${esc(ROUTES[key])}"
data-pd-header-link="${esc(key)}"
${active ? 'aria-current="page"' : ""}
>
${specialIcon(key)}
<span>${esc(label)}</span>
</a>

`;

        }
      )
      .join("");

    top.innerHTML =
      build(TOP_KEYS);

    bottom.innerHTML =
      build(BOTTOM_KEYS);

    requestAnimationFrame(
      () => {

        document
        .querySelector(
          ".pd-luxury-row-link.active"
        )
        ?.scrollIntoView(
          {
            block:"nearest",
            inline:"center",
            behavior:"auto"
          }
        );

      }
    );

  }

  function renderProfile(){

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    if(!menu){
      return;
    }

    const text =
      copy();

    const wasOpen =
      menu
      .classList
      .contains(
        "open"
      );

    menu.innerHTML = `

<div class="pd-luxury-profile-title">
${esc(text.profile)}
</div>

<a
class="pd-luxury-profile-link"
href="account.html"
>
${esc(text.signIn)}
</a>

<a
class="pd-luxury-profile-link club"
href="club.html"
>
${esc(text.joinClub)}
</a>

`;

    if(wasOpen){

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

  function createHeader(){

    if(
      document.getElementById(
        "pdLuxuryHeader"
      )
    ){

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

<div id="pdLuxuryMainBar">

<button
id="pdLuxuryMenuButton"
type="button"
aria-label="${esc(text.openMenu)}"
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
id="pdLuxuryHome"
href="index.html"
aria-label="${esc(text.home)}"
>

<svg
viewBox="0 0 24 24"
aria-hidden="true"
>
<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3Z"></path>
</svg>

</a>

<a
id="pdLuxuryAdvertise"
href="${esc(ROUTES.advertise)}"
>
${esc(text.advertise)}
</a>

<div id="pdLuxuryProfileWrap">

<button
id="pdLuxuryProfileButton"
type="button"
aria-label="${esc(text.profile)}"
aria-controls="pdLuxuryProfileMenu"
aria-expanded="false"
>

<svg
viewBox="0 0 24 24"
aria-hidden="true"
>
<circle cx="12" cy="8" r="4"></circle>
<path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path>
</svg>

<span class="pd-luxury-profile-label">
${esc(text.profile)}
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

    const masthead =
      document.getElementById(
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

  function tickerPiece(){

    const text =
      copy();

    const discover =
      DISCOVER_TEXT[language]
      ||
      DISCOVER_TEXT.en;

    const chooseLanguage = {

      en:"Choose language",
      uk:"Оберіть мову",
      ru:"Выберите язык",
      fr:"Choisissez la langue",
      de:"Sprache wählen",
      es:"Elige idioma",
      it:"Scegli la lingua",
      pt:"Escolha o idioma",
      nl:"Kies taal",
      pl:"Wybierz język",
      cs:"Vyberte jazyk",
      sk:"Vyberte jazyk",
      hu:"Válasszon nyelvet",
      ro:"Alege limba",
      bg:"Изберете език",
      el:"Επιλέξτε γλώσσα",
      sv:"Välj språk",
      da:"Vælg sprog",
      no:"Velg språk",
      fi:"Valitse kieli",
      tr:"Dil seçin",
      ar:"اختر اللغة",
      hi:"भाषा चुनें"

    };

    const languageCode = {

      en:"EN",
      uk:"UA",
      ru:"RU",
      fr:"FR",
      de:"DE",
      es:"ES",
      it:"IT",
      pt:"PT",
      nl:"NL",
      pl:"PL",
      cs:"CZ",
      sk:"SK",
      hu:"HU",
      ro:"RO",
      bg:"BG",
      el:"GR",
      sv:"SE",
      da:"DK",
      no:"NO",
      fi:"FI",
      tr:"TR",
      ar:"AR",
      hi:"HI"

    };

    return `

<span class="pd-ticker-piece">

<span aria-hidden="true">
🇬🇧 🇺🇦 🇸🇦
</span>

<span>
${esc(
  chooseLanguage[language]
  ||
  chooseLanguage.en
)}
</span>

<span aria-hidden="true">
🌐 A·文·ع
</span>

<span class="pd-ticker-title">
${esc(
  languageCode[language]
  ||
  "EN"
)}
</span>

<span
class="pd-ticker-separator"
aria-hidden="true"
>
|
</span>

<span class="pd-ticker-title">
${esc(text.contents)}
</span>

<span
class="pd-ticker-separator"
aria-hidden="true"
>
·
</span>

<span>
${esc(discover)}
</span>

<span
class="pd-ticker-arrow"
aria-hidden="true"
>
→
</span>

</span>

`;

  }

  function renderTicker(){

    const ticker =
      document.getElementById(
        "pdContentsTicker"
      );

    if(!ticker){
      return;
    }

    const piece =
      tickerPiece();

    const group = `

<div
class="pd-ticker-group"
aria-hidden="true"
>
${piece}
${piece}
${piece}
${piece}
</div>

`;

    ticker.innerHTML = `

<div class="pd-ticker-marquee">

<div class="pd-ticker-track">

${group}
${group}

</div>

</div>

`;

    const text =
      copy();

    ticker.setAttribute(
      "aria-label",
      text.contents +
      ". " +
      (
        DISCOVER_TEXT[language]
        ||
        DISCOVER_TEXT.en
      )
    );

  }

  function createTicker(){

    let ticker =
      document.getElementById(
        "pdContentsTicker"
      );

    if(ticker){

      renderTicker();

      return;

    }

    const header =
      document.getElementById(
        "pdLuxuryHeader"
      );

    if(!header){
      return;
    }

    ticker =
      document.createElement(
        "div"
      );

    ticker.id =
      "pdContentsTicker";

    ticker.setAttribute(
      "role",
      "button"
    );

    ticker.setAttribute(
      "tabindex",
      "0"
    );

    ticker.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openSideMenu();

      }
    );

    ticker.addEventListener(
      "keydown",
      event => {

        if(
          event.key === "Enter"
          ||
          event.key === " "
        ){

          event.preventDefault();

          openSideMenu();

        }

      }
    );

    header.insertAdjacentElement(
      "afterend",
      ticker
    );

    renderTicker();

  }

  function renderSideMenu(){

    const menu =
      document.getElementById(
        "pdShellMenu"
      );

    if(!menu){
      return;
    }

    const text =
      copy();

    const cards =
      MENU_KEYS
      .map(
        key => {

          const active =
            key === activeKey;

          const advertiseClass =
            key === "advertise"
            ? " advertise"
            : "";

          const petFriendlyClass =
            key === "petFriendly"
            ? " petfriendly-card"
            : "";

          const label =
            key === "advertise"
            ? text.advertise
            : (
                navLabel(key) === key
                ? englishLabel(key)
                : navLabel(key)
              );

          return `

<a
class="pd-shell-card${active ? " active" : ""}${advertiseClass}${petFriendlyClass}"
href="${esc(ROUTES[key])}"
${active ? 'aria-current="page"' : ""}
>

<span class="pd-shell-card-image">

<img
src="${esc(MENU_IMAGES[key] || "")}"
alt=""
loading="lazy"
decoding="async"
referrerpolicy="no-referrer"
>

</span>

<span class="pd-shell-card-copy">

<h3>

<span class="inline">

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
  ([code,label]) =>
  `<option value="${esc(code)}" ${language === code ? "selected" : ""}>${esc(label)}</option>`
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

  function createSideMenu(){

    if(
      !document.getElementById(
        "pdShellOverlay"
      )
    ){

      const overlay =
        document.createElement(
          "div"
        );

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

    if(
      !document.getElementById(
        "pdShellMenu"
      )
    ){

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

      document.body.appendChild(
        menu
      );

    }

    renderSideMenu();

  }

  function openSideMenu(){

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

    if(
      !menu ||
      !overlay
    ){

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

  function closeSideMenu(){

    const menu =
      document.getElementById(
        "pdShellMenu"
      );

    const overlay =
      document.getElementById(
        "pdShellOverlay"
      );

    if(
      !menu ||
      !overlay
    ){

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

  function openProfile(){

    showHeader();

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    const button =
      document.getElementById(
        "pdLuxuryProfileButton"
      );

    if(
      !menu ||
      !button
    ){

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

  function closeProfile(){

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    const button =
      document.getElementById(
        "pdLuxuryProfileButton"
      );

    if(
      !menu ||
      !button
    ){

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

  function toggleProfile(){

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    if(!menu){
      return;
    }

    menu
    .classList
    .contains(
      "open"
    )
    ? closeProfile()
    : openProfile();

  }  function syncExistingLanguageController(code){

    const existing =
      pageLanguageSelect();

    if(existing){

      const reverse = {
        uk:"ua",
        cs:"cz",
        el:"gr",
        sv:"se",
        da:"dk"
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
            option.value === value
          )
        );

      if(
        candidate &&
        existing.value !==
        candidate
      ){

        existing.value =
          candidate;

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

      const functions = [
        "setLanguage",
        "changeLanguage",
        "selectLanguage"
      ];

      for(
        const functionName
        of
        functions
      ){

        if(
          typeof
          window.PetsDogueLanguage[
            functionName
          ]
          ===
          "function"
        ){

          try{

            window
            .PetsDogueLanguage[
              functionName
            ](
              code
            );

          }catch(error){}

          break;

        }

      }

    }else if(
      typeof
      window.renderLanguage
      ===
      "function"
    ){

      try{

        window.renderLanguage(
          code
        );

      }catch(error){}

    }

  }

  function applyLanguage(code){

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
          detail:{
            language,
            source:"header"
          }
        }
      )
    );

  }

  function refreshText(){

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

    if(advertise){

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

    if(profileLabel){

      profileLabel.textContent =
        text.profile;

    }

    renderRows();

    renderProfile();

    renderSideMenu();

    renderTicker();

    renderInstallUI();

  }

  function showHeader(){

    document
    .getElementById(
      "pdLuxuryHeader"
    )
    ?.classList
    .remove(
      "pd-header-hidden"
    );

  }

  function hideHeader(){

    document
    .getElementById(
      "pdLuxuryHeader"
    )
    ?.classList
    .add(
      "pd-header-hidden"
    );

  }

  function sideMenuOpen(){

    return document
    .getElementById(
      "pdShellMenu"
    )
    ?.classList
    .contains(
      "open"
    );

  }

  function handleScroll(){

    if(ticking){
      return;
    }

    ticking = true;

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
          ?.classList
          .contains(
            "open"
          );

        if(
          y <= 8 ||
          sideMenuOpen() ||
          profileOpen
        ){

          showHeader();

          accumulated = 0;

        }else if(direction){

          if(
            direction !==
            lastDirection
          ){

            accumulated = 0;

          }

          accumulated +=
            Math.abs(
              delta
            );

          if(
            direction > 0 &&
            accumulated >= 16
          ){

            hideHeader();

            accumulated = 0;

          }

          else if(
            direction < 0 &&
            accumulated >= 8
          ){

            showHeader();

            accumulated = 0;

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

  function handleDocumentClick(event){

    const menu =
      document.getElementById(
        "pdLuxuryProfileMenu"
      );

    const button =
      document.getElementById(
        "pdLuxuryProfileButton"
      );

    if(
      menu
      ?.classList
      .contains(
        "open"
      )
      &&
      !menu.contains(
        event.target
      )
      &&
      !button
      ?.contains(
        event.target
      )
    ){

      closeProfile();

    }

  }

  function handleEscape(event){

    if(
      event.key ===
      "Escape"
    ){

      closeProfile();

      closeSideMenu();

      closeInstallSheet();

    }

  }

  function listenLanguage(){

    window.addEventListener(
      "petsdogue:languagechange",
      event => {

        const code =
          normalizeLanguage(
            event
            ?.detail
            ?.language
            ||
            ""
          );

        if(
          code &&
          supportedLanguage(code) &&
          code !== language
        ){

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

        if(
          event.key ===
          LANGUAGE_KEY
        ){

          persistLanguage(
            event.newValue ||
            "en"
          );

          refreshText();

        }

      }
    );

  }

  function isIos(){

    return (
      /iphone|ipad|ipod/i
      .test(
        window.navigator.userAgent ||
        ""
      )
    );

  }

  function ensureManifestLink(){

    if(
      !isPetFriendlyPage()
    ){

      return;

    }

    let manifest =
      document.querySelector(
        'link[rel="manifest"]'
      );

    if(!manifest){

      manifest =
        document.createElement(
          "link"
        );

      manifest.rel =
        "manifest";

      document.head.appendChild(
        manifest
      );

    }

    manifest.href =
      PET_FRIENDLY_MANIFEST;

    let theme =
      document.querySelector(
        'meta[name="theme-color"]'
      );

    if(!theme){

      theme =
        document.createElement(
          "meta"
        );

      theme.name =
        "theme-color";

      document.head.appendChild(
        theme
      );

    }

    theme.content =
      "#65e51f";

    let apple =
      document.querySelector(
        'meta[name="apple-mobile-web-app-capable"]'
      );

    if(!apple){

      apple =
        document.createElement(
          "meta"
        );

      apple.name =
        "apple-mobile-web-app-capable";

      document.head.appendChild(
        apple
      );

    }

    apple.content =
      "yes";

    let status =
      document.querySelector(
        'meta[name="apple-mobile-web-app-status-bar-style"]'
      );

    if(!status){

      status =
        document.createElement(
          "meta"
        );

      status.name =
        "apple-mobile-web-app-status-bar-style";

      document.head.appendChild(
        status
      );

    }

    status.content =
      "default";

  }

  function registerPetFriendlySW(){

    if(
      !isPetFriendlyPage() ||
      !(
        "serviceWorker"
        in
        navigator
      )
    ){

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

  function createInstallUI(){

    if(
      !isPetFriendlyPage()
    ){

      return;

    }

    if(
      !document.getElementById(
        "pdInstallLauncher"
      )
    ){

      const launcher =
        document.createElement(
          "button"
        );

      launcher.id =
        "pdInstallLauncher";

      launcher.type =
        "button";

      launcher.addEventListener(
        "click",
        onInstallTap
      );

      document.body.appendChild(
        launcher
      );

    }

    if(
      !document.getElementById(
        "pdInstallSheet"
      )
    ){

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

<h3 id="pdInstallTitle"></h3>

<p id="pdInstallText"></p>

<div class="pd-install-actions">

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

          if(
            event.target ===
            sheet
          ){

            closeInstallSheet();

          }

        }
      );

      document.body.appendChild(
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

  function renderInstallUI(){

    if(
      !isPetFriendlyPage()
    ){

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

    if(launcher){

      launcher.textContent =
        text.installCta;

    }

    if(title){

      title.textContent =
        text.installTitle;

    }

    if(copyElement){

      copyElement.textContent =
        deferredInstallPrompt
        ? text.installText
        : text.iosHint;

    }

    if(primary){

      primary.textContent =
        text.installNow;

    }

    if(later){

      later.textContent =
        text.later;

    }

    updateInstallVisibility();

  }

  function updateInstallVisibility(){

    const launcher =
      document.getElementById(
        "pdInstallLauncher"
      );

    if(!launcher){
      return;
    }

    const standalone =
      window
      .matchMedia(
        "(display-mode: standalone)"
      )
      .matches
      ||
      window.navigator.standalone ===
      true;

    if(standalone){

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
        deferredInstallPrompt
        ||
        isIos()
      )
    );

  }

  function openInstallSheet(){

    document
    .getElementById(
      "pdInstallSheet"
    )
    ?.classList
    .add(
      "open"
    );

  }

  function closeInstallSheet(){

    document
    .getElementById(
      "pdInstallSheet"
    )
    ?.classList
    .remove(
      "open"
    );

  }

  function onInstallTap(){

    renderInstallUI();

    openInstallSheet();

  }

  async function triggerInstallFlow(){

    if(
      deferredInstallPrompt
    ){

      deferredInstallPrompt.prompt();

      try{

        await
        deferredInstallPrompt
        .userChoice;

      }catch(error){}

      deferredInstallPrompt =
        null;

      closeInstallSheet();

      updateInstallVisibility();

      return;

    }

    closeInstallSheet();

  }

  function preparePetFriendlyInstall(){

    if(
      !isPetFriendlyPage()
    ){

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

  function init(){

    if(
      document
      .documentElement
      .dataset
      .petsDogueHeaderOnly
      ===
      "9"
    ){

      return;

    }

    document
    .documentElement
    .dataset
    .petsDogueHeaderOnly =
      "9";

    persistLanguage(
      detectLanguage()
    );

    activeKey =
      detectActiveKey();

    installStyles();

    hideLegacy();

    createHomeImage();

    createHeader();

    createTicker();

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

    window.PetsDogueHeader = {

      show:showHeader,

      hide:hideHeader,

      openMenu:openSideMenu,

      closeMenu:closeSideMenu,

      refreshLanguage:applyLanguage

    };

  }

  if(
    document.readyState ===
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
/* =========================================================
   PETS & DOGUE — GLOBAL MISO HELP
   Loads the independent Help / FAQ assistant on every page
   that already uses pets-dogue-shell.js.
   ========================================================= */

(function () {
  "use strict";

  if (window.__PETS_DOGUE_HELP_LOADER__) {
    return;
  }

  window.__PETS_DOGUE_HELP_LOADER__ = true;

  function loadPetsDogueHelp() {

    if (
      document.querySelector(
        'script[data-pets-dogue-help="true"]'
      )
    ) {
      return;
    }

    const script = document.createElement("script");

    script.src =
      "pets-dogue-help.js?v=20260915-global-help-1";

    script.defer = true;

    script.dataset.petsDogueHelp = "true";

    script.addEventListener("error", function () {
      console.warn(
        "PETS & DOGUE Help could not be loaded."
      );
    });

    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      loadPetsDogueHelp,
      { once: true }
    );

  } else {

    loadPetsDogueHelp();

  }

})();
