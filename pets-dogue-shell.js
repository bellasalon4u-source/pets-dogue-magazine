"use strict";

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

const I18N={
  "en":{
    menu:"Contents",
    signIn:"Log in",
    joinClub:"Join Club",
    language:"Language",
    contact:"Contact us",
    openMenu:"Open menu",
    closeMenu:"Close menu",
    home:"Home",
    profile:"Profile / Subscription",
    nav:[
      "Edition",
      "Cover Stars",
      "Discounts",
      "Pet-Friendly",
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
  "uk":{
    menu:"Зміст",
    signIn:"Увійти",
    joinClub:"Вступити до клубу",
    language:"Мова",
    contact:"Зв’язатися з нами",
    openMenu:"Відкрити меню",
    closeMenu:"Закрити меню",
    home:"Головна",
    profile:"Профіль / Підписка",
    nav:[
      "Видання",
      "Зірки обкладинки",
      "Знижки",
      "Pet-Friendly",
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
  "ru":{
    menu:"Содержание",
    signIn:"Log in",
    joinClub:"Подписаться",
    language:"Язык",
    contact:"Связаться с нами",
    openMenu:"Открыть меню",
    closeMenu:"Закрыть меню",
    home:"Главная",
    profile:"Профиль / Подписка",
    nav:[
      "Издание",
      "Звёзды обложки",
      "Скидки",
      "Pet-Friendly",
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
  "fr":{
    menu:"Sommaire",
    signIn:"Connexion",
    joinClub:"Rejoindre le Club",
    language:"Langue",
    contact:"Nous contacter",
    openMenu:"Ouvrir le menu",
    closeMenu:"Fermer le menu",
    home:"Accueil",
    profile:"Profil / Abonnement",
    nav:[
      "Édition",
      "Stars de couverture",
      "Réductions",
      "Pet-Friendly",
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
  "de":{
    menu:"Inhalt",
    signIn:"Anmelden",
    joinClub:"Club beitreten",
    language:"Sprache",
    contact:"Kontakt",
    openMenu:"Menü öffnen",
    closeMenu:"Menü schließen",
    home:"Startseite",
    profile:"Profil / Abo",
    nav:[
      "Ausgabe",
      "Cover Stars",
      "Rabatte",
      "Pet-Friendly",
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
  "es":{
    menu:"Contenido",
    signIn:"Iniciar sesión",
    joinClub:"Únete al Club",
    language:"Idioma",
    contact:"Contáctanos",
    openMenu:"Abrir menú",
    closeMenu:"Cerrar menú",
    home:"Inicio",
    profile:"Perfil / Suscripción",
    nav:[
      "Edición",
      "Estrellas de portada",
      "Descuentos",
      "Pet-Friendly",
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
  "it":{
    menu:"Contenuti",
    signIn:"Accedi",
    joinClub:"Unisciti al Club",
    language:"Lingua",
    contact:"Contattaci",
    openMenu:"Apri menu",
    closeMenu:"Chiudi menu",
    home:"Home",
    profile:"Profilo / Abbonamento",
    nav:[
      "Edizione",
      "Cover Stars",
      "Sconti",
      "Pet-Friendly",
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
  "pt":{
    menu:"Conteúdo",
    signIn:"Entrar",
    joinClub:"Entrar no Club",
    language:"Idioma",
    contact:"Contacte-nos",
    openMenu:"Abrir menu",
    closeMenu:"Fechar menu",
    home:"Início",
    profile:"Perfil / Subscrição",
    nav:[
      "Edição",
      "Estrelas da capa",
      "Descontos",
      "Pet-Friendly",
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
  "nl":{
    menu:"Inhoud",
    signIn:"Inloggen",
    joinClub:"Word lid",
    language:"Taal",
    contact:"Contact",
    openMenu:"Menu openen",
    closeMenu:"Menu sluiten",
    home:"Home",
    profile:"Profiel / Abonnement",
    nav:[
      "Editie",
      "Coversterren",
      "Kortingen",
      "Pet-Friendly",
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
  "pl":{
    menu:"Spis treści",
    signIn:"Zaloguj się",
    joinClub:"Dołącz do klubu",
    language:"Język",
    contact:"Kontakt",
    openMenu:"Otwórz menu",
    closeMenu:"Zamknij menu",
    home:"Strona główna",
    profile:"Profil / Subskrypcja",
    nav:[
      "Wydanie",
      "Gwiazdy okładki",
      "Zniżki",
      "Pet-Friendly",
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
  "cs":{
    menu:"Obsah",
    signIn:"Přihlásit se",
    joinClub:"Vstoupit do klubu",
    language:"Jazyk",
    contact:"Kontaktujte nás",
    openMenu:"Otevřít menu",
    closeMenu:"Zavřít menu",
    home:"Domů",
    profile:"Profil / Předplatné",
    nav:[
      "Vydání",
      "Hvězdy obálky",
      "Slevy",
      "Pet-Friendly",
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
  "sk":{
    menu:"Obsah",
    signIn:"Prihlásiť sa",
    joinClub:"Vstúpiť do klubu",
    language:"Jazyk",
    contact:"Kontaktujte nás",
    openMenu:"Otvoriť menu",
    closeMenu:"Zavrieť menu",
    home:"Domov",
    profile:"Profil / Predplatné",
    nav:[
      "Vydanie",
      "Hviezdy obálky",
      "Zľavy",
      "Pet-Friendly",
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
  "hu":{
    menu:"Tartalom",
    signIn:"Belépés",
    joinClub:"Csatlakozás",
    language:"Nyelv",
    contact:"Kapcsolat",
    openMenu:"Menü megnyitása",
    closeMenu:"Menü bezárása",
    home:"Kezdőlap",
    profile:"Profil / Előfizetés",
    nav:[
      "Kiadás",
      "Címlapsztárok",
      "Kedvezmények",
      "Pet-Friendly",
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
  "ro":{
    menu:"Conținut",
    signIn:"Autentificare",
    joinClub:"Intră în Club",
    language:"Limbă",
    contact:"Contactați-ne",
    openMenu:"Deschide meniul",
    closeMenu:"Închide meniul",
    home:"Acasă",
    profile:"Profil / Abonament",
    nav:[
      "Ediție",
      "Vedete de copertă",
      "Reduceri",
      "Pet-Friendly",
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
  "bg":{
    menu:"Съдържание",
    signIn:"Вход",
    joinClub:"Влезте в клуба",
    language:"Език",
    contact:"Свържете се с нас",
    openMenu:"Отвори менюто",
    closeMenu:"Затвори менюто",
    home:"Начало",
    profile:"Профил / Абонамент",
    nav:[
      "Издание",
      "Звезди на корицата",
      "Отстъпки",
      "Pet-Friendly",
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
  "el":{
    menu:"Περιεχόμενα",
    signIn:"Σύνδεση",
    joinClub:"Εγγραφή στο Club",
    language:"Γλώσσα",
    contact:"Επικοινωνία",
    openMenu:"Άνοιγμα μενού",
    closeMenu:"Κλείσιμο μενού",
    home:"Αρχική",
    profile:"Προφίλ / Συνδρομή",
    nav:[
      "Έκδοση",
      "Αστέρια εξωφύλλου",
      "Εκπτώσεις",
      "Pet-Friendly",
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
  "sv":{
    menu:"Innehåll",
    signIn:"Logga in",
    joinClub:"Gå med i klubben",
    language:"Språk",
    contact:"Kontakta oss",
    openMenu:"Öppna meny",
    closeMenu:"Stäng meny",
    home:"Hem",
    profile:"Profil / Prenumeration",
    nav:[
      "Utgåva",
      "Omslagsstjärnor",
      "Rabatter",
      "Pet-Friendly",
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
  "da":{
    menu:"Indhold",
    signIn:"Log ind",
    joinClub:"Bliv medlem",
    language:"Sprog",
    contact:"Kontakt os",
    openMenu:"Åbn menu",
    closeMenu:"Luk menu",
    home:"Hjem",
    profile:"Profil / Abonnement",
    nav:[
      "Udgave",
      "Forsidestjerner",
      "Rabatter",
      "Pet-Friendly",
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
  "no":{
    menu:"Innhold",
    signIn:"Logg inn",
    joinClub:"Bli med i klubben",
    language:"Språk",
    contact:"Kontakt oss",
    openMenu:"Åpne meny",
    closeMenu:"Lukk meny",
    home:"Hjem",
    profile:"Profil / Abonnement",
    nav:[
      "Utgave",
      "Forsidestjerner",
      "Rabatter",
      "Pet-Friendly",
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
  "fi":{
    menu:"Sisältö",
    signIn:"Kirjaudu",
    joinClub:"Liity klubiin",
    language:"Kieli",
    contact:"Ota yhteyttä",
    openMenu:"Avaa valikko",
    closeMenu:"Sulje valikko",
    home:"Etusivu",
    profile:"Profiili / Tilaus",
    nav:[
      "Numero",
      "Kansitähdet",
      "Alennukset",
      "Pet-Friendly",
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
  "tr":{
    menu:"İçindekiler",
    signIn:"Giriş yap",
    joinClub:"Kulübe katıl",
    language:"Dil",
    contact:"Bize ulaşın",
    openMenu:"Menüyü aç",
    closeMenu:"Menüyü kapat",
    home:"Ana sayfa",
    profile:"Profil / Abonelik",
    nav:[
      "Sürüm",
      "Kapak yıldızları",
      "İndirimler",
      "Pet-Friendly",
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
  "ar":{
    menu:"المحتويات",
    signIn:"تسجيل الدخول",
    joinClub:"انضم إلى النادي",
    language:"اللغة",
    contact:"اتصل بنا",
    openMenu:"فتح القائمة",
    closeMenu:"إغلاق القائمة",
    home:"الرئيسية",
    profile:"الملف الشخصي / الاشتراك",
    nav:[
      "الإصدار",
      "نجوم الغلاف",
      "الخصومات",
      "Pet-Friendly",
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
  "hi":{
    menu:"विषय-सूची",
    signIn:"लॉग इन",
    joinClub:"क्लब से जुड़ें",
    language:"भाषा",
    contact:"संपर्क करें",
    openMenu:"मेनू खोलें",
    closeMenu:"मेनू बंद करें",
    home:"होम",
    profile:"प्रोफ़ाइल / सदस्यता",
    nav:[
      "एडिशन",
      "कवर स्टार्स",
      "छूट",
      "Pet-Friendly",
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

const NAV_ITEMS=[
  {key:"magazine",url:"issue-01.html",image:"file_00000000a9d471fda9b4629589be22a9.png"},
  {key:"coverStars",url:"members-gallery.html",image:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=82"},
  {key:"discounts",url:"special-offers.html",image:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=82"},
  {key:"petFriendly",url:"pet-friendly-places.html",image:"https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=82"},
  {key:"marketplace",url:"pet-marketplace.html",image:"https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=500&q=82"},
  {key:"travel",url:"pet-travel.html",image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=82"},
  {key:"fashion",url:"pet-fashion.html",image:"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=82"},
  {key:"health",url:"wellness.html",image:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=500&q=82"},
  {key:"articles",url:"articles.html",image:"https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=500&q=82"},
  {key:"photos",url:"photos.html",image:"https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=82"},
  {key:"community",url:"local-community.html",image:"https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=500&q=82"},
  {key:"contests",url:"contests.html",image:"https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=500&q=82"},
  {key:"animalHelp",url:"pets-in-need.html",image:"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=82"},
  {key:"partners",url:"partners.html",image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=82"}
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

const HOME_TOP=["petFriendly","discounts","animalHelp","community","marketplace"];
const HOME_BOTTOM=["partners","magazine","coverStars","contests","articles","photos","fashion","health"];

const ICONS={
  petFriendly:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6.7" cy="8" r="2"/><circle cx="11.1" cy="5.8" r="2"/><circle cx="15.5" cy="6.8" r="2"/><circle cx="18" cy="10.5" r="2"/><path d="M7.5 16.4c0-3 2-5.1 4.6-5.1s4.6 2.1 4.6 5.1c0 2.2-1.7 3.6-4.6 3.6s-4.6-1.4-4.6-3.6Z"/></svg>`,
  discounts:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7"/><circle cx="7.5" cy="7.5" r="2.2"/><circle cx="16.5" cy="16.5" r="2.2"/></svg>`,
  animalHelp:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 9.4c0 5.5-8.5 10.1-8.5 10.1S3.5 14.9 3.5 9.4A4.4 4.4 0 0 1 12 7.7a4.4 4.4 0 0 1 8.5 1.7Z"/></svg>`,
  community:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8.5" r="2.5"/><path d="M2.8 19c.8-4 2.8-6 5.6-6 3 0 5 2.1 5.7 6"/><path d="M13.2 13.5c3.8-.7 6.6 1.1 7.3 5.5"/></svg>`,
  marketplace:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>`,
  partners:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.2 8.8 6.7 6.3a2.7 2.7 0 0 0-3.8 3.8l4 4a2.7 2.7 0 0 0 3.8 0l1-1"/><path d="m14.8 15.2 2.5 2.5a2.7 2.7 0 0 0 3.8-3.8l-4-4a2.7 2.7 0 0 0-3.8 0l-1 1"/><path d="m8.5 15.5 7-7"/></svg>`,
  magazine:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7a3 3 0 0 1 3 3v11H7a3 3 0 0 0-3 1V5Z"/><path d="M20 5h-3a3 3 0 0 0-3 3v11h3a3 3 0 0 1 3 1V5Z"/></svg>`,
  coverStars:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3Z"/></svg>`,
  contests:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v4c0 4-1.7 6-4 6s-4-2-4-6V4Z"/><path d="M8 6H4v2c0 3 1.7 4.5 4.5 4.8"/><path d="M16 6h4v2c0 3-1.7 4.5-4.5 4.8"/><path d="M12 14v4"/><path d="M8 21h8"/><path d="M9 18h6"/></svg>`,
  articles:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3Z"/><path d="M14 3v4h4"/><path d="M9 11h6M9 15h6M9 19h4"/></svg>`,
  photos:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m5 17 4-4 3 3 2-2 5 3"/></svg>`,
  fashion:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c.6 4.8 2.2 6.5 7 7-4.8.6-6.4 2.2-7 7-.6-4.8-2.2-6.4-7-7 4.8-.5 6.4-2.2 7-7Z"/><path d="M19 14c.3 2.6 1.2 3.5 3.8 3.8-2.6.3-3.5 1.2-3.8 3.8-.3-2.6-1.2-3.5-3.8-3.8 2.6-.3 3.5-1.2 3.8-3.8Z"/></svg>`,
  health:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16M4 12h16"/></svg>`
};

let shellLanguage="en";
let activeKey="";
let isHome=false;
let observer=null;
let internalLanguageChange=false;
let lastY=Math.max(0,window.scrollY||0);
let direction=0;
let accumulated=0;
let ticking=false;

function normalizeLanguage(value){
  const raw=String(value||"").trim().toLowerCase().replace("_","-");
  if(!raw) return "";
  const base=raw.split("-")[0];
  return LANGUAGE_ALIASES[base]||base;
}

function supportedLanguage(value){
  return Object.prototype.hasOwnProperty.call(I18N,normalizeLanguage(value));
}

function currentFile(){
  const file=(window.location.pathname||"").split("/").filter(Boolean).pop();
  return (file||"index.html").toLowerCase();
}

function detectActiveKey(){
  const file=currentFile();
  if(PAGE_KEYS[file]) return PAGE_KEYS[file];
  const path=(window.location.pathname||"").toLowerCase();
  for(const [name,key] of Object.entries(PAGE_KEYS)){
    if(path.includes(name.replace(".html",""))) return key;
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
    const el=document.querySelector(selector);
    if(el&&el.id!=="pdGlobalLanguage") return el;
  }

  return null;
}

function detectInitialLanguage(){
  try{
    const saved=normalizeLanguage(localStorage.getItem(LANGUAGE_KEY)||"");
    if(saved&&supportedLanguage(saved)) return saved;
  }catch(error){}

  const existing=findExistingLanguageSelect();
  if(existing){
    const code=normalizeLanguage(existing.value);
    if(supportedLanguage(code)) return code;
  }

  const htmlLang=normalizeLanguage(document.documentElement.lang||"");
  return supportedLanguage(htmlLang)?htmlLang:"en";
}

function persistLanguage(language){
  const code=normalizeLanguage(language);
  if(!supportedLanguage(code)) return;
  shellLanguage=code;

  try{
    localStorage.setItem(LANGUAGE_KEY,code);
  }catch(error){}

  document.documentElement.lang=code;
  document.documentElement.dir=code==="ar"?"rtl":"ltr";
}

function t(){
  return I18N[shellLanguage]||I18N.en;
}

function navLabel(key){
  const index=NAV_INDEX[key];
  return t().nav[index]||I18N.en.nav[index]||key;
}

function navItem(key){
  return NAV_ITEMS.find(item=>item.key===key)||null;
}

function escapeHTML(value){
  return String(value??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function installStyles(){
  document.getElementById("pdGlobalShellStyles")?.remove();

  const style=document.createElement("style");
  style.id="pdGlobalShellStyles";
  style.textContent=`
  :root{
    --pd-black:#050505;
    --pd-black-soft:#0a0a0a;
    --pd-black-card:#0c0c0c;
    --pd-cream:#f7f4ed;
    --pd-gold:#c69b45;
    --pd-gold-soft:#efd78f;
    --pd-gold-line:rgba(198,155,69,.35);
    --pd-white:#ffffff;
    --pd-white-soft:rgba(255,255,255,.82);
    --pd-green:#65e51f;
    --pd-blue:#1769d2;
    --pd-blue-strong:#0d57b7;
    --pd-blue-shadow:rgba(23,105,210,.34);
    --pd-scarlet:#ff304f;
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
    position:fixed;
    inset:0 0 auto 0;
    z-index:14000;
    background:var(--pd-black);
    color:var(--pd-white);
    font-family:var(--pd-sans);
    direction:ltr;
    border-bottom:1px solid rgba(255,255,255,.07);
    box-shadow:0 10px 28px rgba(0,0,0,.22);
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
    min-height:76px;
    display:grid;
    grid-template-columns:56px minmax(0,1fr) auto;
    align-items:center;
    padding:10px 14px;
    background:
      linear-gradient(
        180deg,
        #050505 0%,
        #070707 68%,
        #090909 100%
      );
    border-bottom:1px solid var(--pd-gold-line);
  }

  #pdGlobalMenuButton{
    width:46px;
    height:46px;
    border:0;
    background:transparent;
    color:var(--pd-white);
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:7px;
    padding:7px;
    cursor:pointer;
  }

  #pdGlobalMenuButton span{
    width:31px;
    height:2.7px;
    background:var(--pd-white);
    border-radius:999px;
    display:block;
  }

  #pdGlobalBrand{
    justify-self:center;
    text-decoration:none;
    text-align:center;
    color:var(--pd-gold);
    font-family:var(--pd-serif);
    line-height:.86;
    white-space:nowrap;
    text-shadow:0 1px 0 rgba(255,255,255,.03);
  }

  #pdGlobalBrandSmall{
    display:block;
    font-size:8px;
    letter-spacing:4px;
    text-transform:uppercase;
    color:var(--pd-gold);
  }

  #pdGlobalBrandBig{
    display:block;
    margin-top:6px;
    font-size:42px;
    letter-spacing:1.8px;
    color:var(--pd-gold);
  }

  #pdGlobalHeaderActions{
    position:relative;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    gap:10px;
  }

  #pdGlobalHome,
  #pdGlobalProfile{
    width:50px;
    height:50px;
    flex:0 0 50px;
    border-radius:16px;
    display:flex;
    align-items:center;
    justify-content:center;
    text-decoration:none;
  }

  #pdGlobalHome{
    border:1px solid rgba(255,255,255,.2);
    background:rgba(255,255,255,.03);
    color:var(--pd-white);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.04);
  }

  #pdGlobalProfile{
    border:1px solid rgba(255,255,255,.08);
    background:
      linear-gradient(
        180deg,
        #1e74e8 0%,
        var(--pd-blue) 48%,
        var(--pd-blue-strong) 100%
      );
    color:var(--pd-white);
    padding:0;
    cursor:pointer;
    box-shadow:
      0 8px 18px var(--pd-blue-shadow),
      inset 0 1px 0 rgba(255,255,255,.18);
  }

  #pdGlobalHome svg,
  #pdGlobalProfile svg{
    width:29px;
    height:29px;
    fill:none;
    stroke:currentColor;
    stroke-width:2.2;
    stroke-linecap:round;
    stroke-linejoin:round;
  }

  #pdGlobalProfile[aria-expanded="true"]{
    box-shadow:
      0 0 0 2px rgba(23,105,210,.34),
      0 10px 20px var(--pd-blue-shadow),
      inset 0 1px 0 rgba(255,255,255,.18);
  }

  #pdGlobalHomeNav{
    background:#080808;
    border-top:1px solid rgba(255,255,255,.04);
  }

  .pd-global-nav-row{
    display:grid;
    width:100%;
    overflow:hidden;
    background:#080808;
  }

  #pdGlobalTopRow{
    grid-template-columns:repeat(5,minmax(0,1fr));
    border-bottom:1px solid rgba(255,255,255,.08);
  }

  #pdGlobalBottomRow{
    grid-template-columns:repeat(8,minmax(0,1fr));
  }

  .pd-global-nav-link{
    min-width:0;
    min-height:66px;
    padding:8px 4px 7px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:6px;
    border-right:1px solid rgba(255,255,255,.08);
    background:#090909;
    color:var(--pd-white);
    text-decoration:none;
    text-align:center;
  }

  .pd-global-nav-link:last-child{
    border-right:0;
  }

  #pdGlobalBottomRow .pd-global-nav-link{
    min-height:62px;
    padding:7px 3px 6px;
    gap:5px;
  }

  .pd-global-nav-icon{
    width:28px;
    height:28px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:var(--pd-white);
  }

  .pd-global-nav-icon svg{
    width:26px;
    height:26px;
    fill:none;
    stroke:currentColor;
    stroke-width:2.05;
    stroke-linecap:round;
    stroke-linejoin:round;
  }

  #pdGlobalBottomRow .pd-global-nav-icon{
    width:24px;
    height:24px;
  }

  #pdGlobalBottomRow .pd-global-nav-icon svg{
    width:23px;
    height:23px;
  }

  .pd-global-nav-label{
    width:100%;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow:hidden;
    color:var(--pd-white);
    font-size:12px;
    line-height:1.08;
    font-weight:800;
    white-space:normal;
    overflow-wrap:break-word;
  }

  #pdGlobalBottomRow .pd-global-nav-label{
    font-size:11px;
    line-height:1.04;
  }

  .pd-global-nav-link.active{
    background:
      linear-gradient(
        180deg,
        rgba(198,155,69,.12) 0%,
        rgba(11,11,11,1) 100%
      );
    box-shadow:inset 0 -3px 0 var(--pd-gold);
  }

  .pd-global-nav-link.active .pd-global-nav-label,
  .pd-global-nav-link.active .pd-global-nav-icon{
    color:var(--pd-gold-soft);
  }

  .pd-global-nav-link.pd-partners{
    background:#090909;
    box-shadow:inset 0 0 0 2px var(--pd-scarlet);
  }

  .pd-global-nav-link.pd-partners.active{
    box-shadow:
      inset 0 0 0 2px var(--pd-scarlet),
      inset 0 -3px 0 var(--pd-gold);
  }

  #pdGlobalProfileMenu{
    position:absolute;
    top:60px;
    right:0;
    z-index:14200;
    width:226px;
    padding:11px;
    background:#0b0b0b;
    border:1px solid rgba(255,255,255,.09);
    border-radius:18px;
    box-shadow:0 18px 42px rgba(0,0,0,.36);
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
    padding:4px 4px 10px;
    color:var(--pd-white);
    font-size:11px;
    font-weight:900;
    letter-spacing:.6px;
    text-transform:uppercase;
  }

  .pd-global-profile-link{
    min-height:44px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:999px;
    background:#fff;
    color:#111;
    text-decoration:none;
    font-size:12px;
    font-weight:900;
    border:1.5px solid #fff;
  }

  .pd-global-profile-link + .pd-global-profile-link{
    margin-top:8px;
  }

  .pd-global-profile-link.club{
    background:var(--pd-green);
    border-color:var(--pd-green);
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
    transition:.22s ease;
  }

  #pdGlobalOverlay.open{
    opacity:1;
    visibility:visible;
    pointer-events:auto;
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

  html[dir="rtl"] #pdGlobalProfileMenu{
    right:auto;
    left:0;
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
    flex:0 0 43px;
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
  #pdGlobalProfile:focus-visible,
  #pdGlobalLanguage:focus-visible,
  #pdGlobalMenu a:focus-visible,
  #pdGlobalProfileMenu a:focus-visible,
  .pd-global-nav-link:focus-visible{
    outline:3px solid var(--pd-green);
    outline-offset:2px;
  }

  @media(max-width:620px){
    #pdGlobalHeaderMain{
      min-height:72px;
      grid-template-columns:50px minmax(0,1fr) auto;
      padding:9px 10px;
    }

    #pdGlobalBrandSmall{
      font-size:7px;
      letter-spacing:3px;
    }

    #pdGlobalBrandBig{
      font-size:31px;
      letter-spacing:1.4px;
    }

    #pdGlobalHeaderActions{
      gap:8px;
    }

    #pdGlobalHome,
    #pdGlobalProfile{
      width:46px;
      height:46px;
      flex-basis:46px;
      border-radius:14px;
    }

    #pdGlobalHome svg,
    #pdGlobalProfile svg{
      width:27px;
      height:27px;
    }

    .pd-global-nav-link{
      min-height:62px;
      padding:7px 3px 6px;
      gap:5px;
    }

    #pdGlobalBottomRow .pd-global-nav-link{
      min-height:59px;
      padding:6px 2px 5px;
      gap:4px;
    }

    .pd-global-nav-icon{
      width:26px;
      height:26px;
    }

    .pd-global-nav-icon svg{
      width:25px;
      height:25px;
    }

    #pdGlobalBottomRow .pd-global-nav-icon{
      width:23px;
      height:23px;
    }

    #pdGlobalBottomRow .pd-global-nav-icon svg{
      width:22px;
      height:22px;
    }

    .pd-global-nav-label{
      font-size:11px;
    }

    #pdGlobalBottomRow .pd-global-nav-label{
      font-size:10px;
    }
  }

  @media(max-width:390px){
    #pdGlobalBrandBig{
      font-size:29px;
    }

    .pd-global-nav-label{
      font-size:10.2px;
    }

    #pdGlobalBottomRow .pd-global-nav-label{
      font-size:9px;
      letter-spacing:-.1px;
    }

    #pdGlobalMenu{
      width:90vw;
      min-width:270px;
    }
  }

  @media(max-width:350px){
    #pdGlobalBottomRow .pd-global-nav-label{
      font-size:8.5px;
    }
  }

  @media(min-width:900px){
    #pdGlobalHeaderMain,
    #pdGlobalTopRow,
    #pdGlobalBottomRow{
      max-width:1500px;
      margin:auto;
    }
  }

  @media(prefers-reduced-motion:reduce){
    #pdGlobalHeader,
    #pdGlobalMenu,
    #pdGlobalOverlay,
    #pdGlobalProfileMenu{
      transition:none;
    }
  }
  `;
  document.head.appendChild(style);
}

function hideExistingShell(){
  const selectors=[
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
    ".pd-secondary-nav"
  ];

  selectors.forEach(selector=>{
    document.querySelectorAll(selector).forEach(el=>{
      if(["pdGlobalHeader","pdGlobalMenu","pdGlobalOverlay"].includes(el.id)) return;
      el.classList.add("pd-global-old-shell-hidden");
    });
  });
}

function watchLegacyShell(){
  if(observer) return;
  observer=new MutationObserver(hideExistingShell);
  observer.observe(document.body,{childList:true,subtree:true});
}

function renderHomeNavigation(){
  if(!isHome) return;

  const top=document.getElementById("pdGlobalTopRow");
  const bottom=document.getElementById("pdGlobalBottomRow");
  if(!top||!bottom) return;

  const render=keys=>keys.map(key=>{
    const active=key===activeKey;
    const partners=key==="partners";

    return `
      <a
        class="pd-global-nav-link${active?" active":""}${partners?" pd-partners":""}"
        href="${escapeHTML(navItem(key)?.url||"index.html")}"
        data-pd-nav="${escapeHTML(key)}"
        aria-label="${escapeHTML(navLabel(key))}"
        ${active?'aria-current="page"':""}
      >
        <span class="pd-global-nav-icon">${ICONS[key]||""}</span>
        <span class="pd-global-nav-label">${escapeHTML(navLabel(key))}</span>
      </a>
    `;
  }).join("");

  top.innerHTML=render(HOME_TOP);
  bottom.innerHTML=render(HOME_BOTTOM);
}

function renderProfileMenu(){
  const menu=document.getElementById("pdGlobalProfileMenu");
  if(!menu) return;

  const copy=t();
  const open=menu.classList.contains("open");

  menu.innerHTML=`
    <div class="pd-global-profile-title">${escapeHTML(copy.profile)}</div>
    <a class="pd-global-profile-link" href="account.html" role="menuitem">${escapeHTML(copy.signIn)}</a>
    <a class="pd-global-profile-link club" href="club.html" role="menuitem">${escapeHTML(copy.joinClub)}</a>
  `;

  if(open){
    menu.classList.add("open");
    menu.setAttribute("aria-hidden","false");
  }
}

function createHeader(){
  if(document.getElementById("pdGlobalHeader")) return;

  const copy=t();
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
        <span id="pdGlobalBrandSmall">PETS &amp;</span>
        <span id="pdGlobalBrandBig">DOGUE</span>
      </a>

      <div id="pdGlobalHeaderActions">
        <a id="pdGlobalHome" href="index.html" aria-label="${escapeHTML(copy.home)}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
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
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path>
          </svg>
        </button>

        <div id="pdGlobalProfileMenu" role="menu" aria-hidden="true"></div>
      </div>
    </div>

    ${
      isHome
      ?`
      <div id="pdGlobalHomeNav">
        <nav id="pdGlobalTopRow" class="pd-global-nav-row" aria-label="Primary PETS & DOGUE sections"></nav>
        <nav id="pdGlobalBottomRow" class="pd-global-nav-row" aria-label="Editorial PETS & DOGUE sections"></nav>
      </div>
      `
      :""
    }
  `;

  const spacer=document.createElement("div");
  spacer.id="pdGlobalHeaderSpacer";

  document.body.insertBefore(spacer,document.body.firstChild);
  document.body.insertBefore(header,spacer);

  document.getElementById("pdGlobalMenuButton")?.addEventListener("click",openMenu);
  document.getElementById("pdGlobalProfile")?.addEventListener("click",event=>{
    event.stopPropagation();
    toggleProfileMenu();
  });

  renderProfileMenu();
  renderHomeNavigation();
  requestAnimationFrame(syncHeaderSpacer);
}

function syncHeaderSpacer(){
  const header=document.getElementById("pdGlobalHeader");
  const spacer=document.getElementById("pdGlobalHeaderSpacer");

  if(header&&spacer){
    spacer.style.height=`${Math.ceil(header.getBoundingClientRect().height)}px`;
  }
}

function showHeader(){
  document.getElementById("pdGlobalHeader")?.classList.remove("pd-global-header-hidden");
}

function hideHeader(){
  document.getElementById("pdGlobalHeader")?.classList.add("pd-global-header-hidden");
}

function handleScroll(){
  if(ticking) return;

  ticking=true;

  requestAnimationFrame(()=>{
    const current=Math.max(0,window.scrollY||0);
    const delta=current-lastY;
    const dir=delta>0?1:delta<0?-1:0;
    const menuOpen=document.getElementById("pdGlobalMenu")?.classList.contains("open");
    const profileOpen=document.getElementById("pdGlobalProfileMenu")?.classList.contains("open");

    if(current<=10||menuOpen||profileOpen){
      showHeader();
      accumulated=0;
    }else if(dir){
      if(dir!==direction) accumulated=0;
      accumulated+=Math.abs(delta);

      if(dir>0&&accumulated>=22){
        hideHeader();
        accumulated=0;
      }else if(dir<0&&accumulated>=10){
        showHeader();
        accumulated=0;
      }

      direction=dir;
    }

    lastY=current;
    ticking=false;
  });
}

function createSideMenu(){
  if(document.getElementById("pdGlobalMenu")) return;

  const overlay=document.createElement("div");
  overlay.id="pdGlobalOverlay";

  const menu=document.createElement("aside");
  menu.id="pdGlobalMenu";
  menu.setAttribute("aria-hidden","true");

  document.body.appendChild(overlay);
  document.body.appendChild(menu);

  overlay.addEventListener("click",closeMenu);
}

function renderSideMenu(){
  const menu=document.getElementById("pdGlobalMenu");
  if(!menu) return;

  const copy=t();
  const oldScroll=menu.querySelector(".pd-global-menu-scroll")?.scrollTop||0;
  const wasOpen=menu.classList.contains("open");

  const cards=NAV_ITEMS.map(item=>{
    const active=item.key===activeKey;
    const partner=item.key==="partners";

    return `
      <a
        class="pd-global-menu-card${active?" active":""}${partner?" pd-menu-partners":""}"
        href="${escapeHTML(item.url)}"
        data-pd-nav="${escapeHTML(item.key)}"
        ${active?'aria-current="page"':""}
      >
        <span class="pd-global-menu-card-image">
          <img
            src="${escapeHTML(item.image)}"
            alt=""
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
          >
        </span>

        <span class="pd-global-menu-card-copy">
          <h3>${escapeHTML(navLabel(item.key))}</h3>
        </span>
      </a>
    `;
  }).join("");

  menu.innerHTML=`
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
        ${LANGUAGE_OPTIONS.map(([code,label])=>
          `<option value="${escapeHTML(code)}" ${code===shellLanguage?"selected":""}>${escapeHTML(label)}</option>`
        ).join("")}
      </select>

      <nav id="pdGlobalMenuList" aria-label="PETS & DOGUE">
        ${cards}
      </nav>

      <div class="pd-global-menu-footer">
        <a href="contact.html">${escapeHTML(copy.contact)}</a>
      </div>
    </div>
  `;

  document.getElementById("pdGlobalClose")?.addEventListener("click",closeMenu);
  document.getElementById("pdGlobalLanguage")?.addEventListener("change",event=>{
    applyLanguage(event.target.value,{syncPage:true,announce:true});
  });

  if(wasOpen){
    menu.classList.add("open");
    menu.setAttribute("aria-hidden","false");

    requestAnimationFrame(()=>{
      const scroll=menu.querySelector(".pd-global-menu-scroll");
      if(scroll) scroll.scrollTop=oldScroll;
    });
  }
}

function openMenu(){
  showHeader();
  closeProfileMenu();

  const menu=document.getElementById("pdGlobalMenu");
  const overlay=document.getElementById("pdGlobalOverlay");
  if(!menu||!overlay) return;

  menu.classList.add("open");
  overlay.classList.add("open");
  menu.setAttribute("aria-hidden","false");
  document.getElementById("pdGlobalMenuButton")?.setAttribute("aria-expanded","true");
  document.body.classList.add("pd-global-menu-open");
}

function closeMenu(){
  const menu=document.getElementById("pdGlobalMenu");
  const overlay=document.getElementById("pdGlobalOverlay");
  if(!menu||!overlay) return;

  menu.classList.remove("open");
  overlay.classList.remove("open");
  menu.setAttribute("aria-hidden","true");
  document.getElementById("pdGlobalMenuButton")?.setAttribute("aria-expanded","false");
  document.body.classList.remove("pd-global-menu-open");
}

function openProfileMenu(){
  showHeader();

  const menu=document.getElementById("pdGlobalProfileMenu");
  const button=document.getElementById("pdGlobalProfile");
  if(!menu||!button) return;

  menu.classList.add("open");
  menu.setAttribute("aria-hidden","false");
  button.setAttribute("aria-expanded","true");
}

function closeProfileMenu(){
  const menu=document.getElementById("pdGlobalProfileMenu");
  const button=document.getElementById("pdGlobalProfile");
  if(!menu||!button) return;

  menu.classList.remove("open");
  menu.setAttribute("aria-hidden","true");
  button.setAttribute("aria-expanded","false");
}

function toggleProfileMenu(){
  const menu=document.getElementById("pdGlobalProfileMenu");
  if(!menu) return;
  menu.classList.contains("open")?closeProfileMenu():openProfileMenu();
}

function valueForExistingSelect(select,language){
  const reverse={uk:"ua",cs:"cz",el:"gr",sv:"se",da:"dk"};
  const candidates=[language,reverse[language]].filter(Boolean);

  for(const candidate of candidates){
    const exact=Array.from(select.options||[]).find(option=>option.value===candidate);
    if(exact) return exact.value;
  }

  const normalized=Array.from(select.options||[]).find(option=>normalizeLanguage(option.value)===language);
  return normalized?normalized.value:"";
}

function syncExistingPageLanguage(language){
  const code=normalizeLanguage(language);
  if(!supportedLanguage(code)) return false;

  let handled=false;

  if(window.PetsDogueLanguage){
    const controller=window.PetsDogueLanguage;

    for(const setter of ["setLanguage","changeLanguage","selectLanguage"]){
      if(typeof controller[setter]==="function"){
        try{
          controller[setter](code);
          handled=true;
        }catch(error){}
        break;
      }
    }
  }

  if(!handled&&typeof window.renderLanguage==="function"){
    try{
      window.renderLanguage(code);
      handled=true;
    }catch(error){}
  }

  const existing=findExistingLanguageSelect();
  if(existing){
    const value=valueForExistingSelect(existing,code);

    if(value&&existing.value!==value){
      try{
        existing.value=value;
        existing.dispatchEvent(new Event("change",{bubbles:true}));
        handled=true;
      }catch(error){}
    }
  }

  return handled;
}

function updateShellText(){
  const copy=t();

  document.getElementById("pdGlobalMenuButton")?.setAttribute("aria-label",copy.openMenu);
  document.getElementById("pdGlobalHome")?.setAttribute("aria-label",copy.home);
  document.getElementById("pdGlobalProfile")?.setAttribute("aria-label",copy.profile);

  renderProfileMenu();
  renderHomeNavigation();
  renderSideMenu();

  requestAnimationFrame(syncHeaderSpacer);
}

function applyLanguage(language,{syncPage=true,announce=true}={}){
  const code=normalizeLanguage(language);
  if(!supportedLanguage(code)) return;

  internalLanguageChange=true;
  persistLanguage(code);

  if(syncPage) syncExistingPageLanguage(code);
  updateShellText();

  if(announce){
    window.dispatchEvent(new CustomEvent("petsdogue:languagechange",{
      detail:{language:code,source:"global-shell"}
    }));
  }

  setTimeout(()=>{
    internalLanguageChange=false;
  },0);
}

function handleDocumentClick(event){
  const profileMenu=document.getElementById("pdGlobalProfileMenu");
  const profileButton=document.getElementById("pdGlobalProfile");

  if(
    profileMenu?.classList.contains("open") &&
    !profileMenu.contains(event.target) &&
    !profileButton?.contains(event.target)
  ){
    closeProfileMenu();
  }
}

function handleEscape(event){
  if(event.key!=="Escape") return;

  closeProfileMenu();

  if(document.getElementById("pdGlobalMenu")?.classList.contains("open")){
    closeMenu();
  }
}

function listenForExternalLanguageChanges(){
  window.addEventListener("petsdogue:languagechange",event=>{
    if(internalLanguageChange) return;

    const code=normalizeLanguage(event?.detail?.language||"");
    if(code&&supportedLanguage(code)&&code!==shellLanguage){
      persistLanguage(code);
      updateShellText();
    }
  });

  window.addEventListener("storage",event=>{
    if(event.key!==LANGUAGE_KEY) return;

    const code=normalizeLanguage(event.newValue||"");
    if(code&&supportedLanguage(code)&&code!==shellLanguage){
      persistLanguage(code);
      updateShellText();
    }
  });
}

function init(){
  if(document.documentElement.dataset.petsDogueGlobalShell==="4") return;
  document.documentElement.dataset.petsDogueGlobalShell="4";

  isHome=currentFile()==="index.html";
  activeKey=detectActiveKey();
  shellLanguage=detectInitialLanguage();

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

  window.addEventListener("scroll",handleScroll,{passive:true});
  window.addEventListener("resize",()=>{
    syncHeaderSpacer();
    showHeader();
  },{passive:true});

  document.addEventListener("click",handleDocumentClick);
  document.addEventListener("keydown",handleEscape);

  window.PetsDogueShell={
    getLanguage(){return shellLanguage;},
    setLanguage(language){applyLanguage(language,{syncPage:true,announce:true});},
    openMenu,
    closeMenu,
    showHeader,
    hideHeader,
    openProfile:openProfileMenu,
    closeProfile:closeProfileMenu
  };
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",init,{once:true});
}else{
  init();
}

})();
