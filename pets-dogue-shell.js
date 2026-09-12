"use strict";

/* =========================================================
PETS & DOGUE — HEADER ONLY

IMPORTANT:
- This file changes ONLY the global header.
- Existing rubric content, cards, maps, search, TTS, forms,
  side menu and page-specific JavaScript are not rebuilt here.
- Language is NOT shown in the header. It stays in the side menu.
- Home page gets a compact image masthead above the header.
- Internal pages start directly with the compact header.
- The two rubric rows scroll horizontally.
- Scroll down (finger up): header hides.
- Scroll up (finger down): header returns.
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
    menu:"Open menu",profile:"Profile",partners:"Partners",signIn:"Sign In",joinClub:"Join Club",
    labels:{petFriendly:"Pet-Friendly",discounts:"Discounts",help:"Help",community:"Community",marketplace:"Marketplace",edition:"Edition",coverStars:"Cover Stars",contests:"Contests",articles:"Articles",photos:"Photos",fashion:"Fashion",health:"Health"}
  },
  uk:{
    menu:"Відкрити меню",profile:"Профіль",partners:"Партнери",signIn:"Увійти",joinClub:"Вступити до клубу",
    labels:{petFriendly:"Pet-Friendly",discounts:"Знижки",help:"Допомога",community:"Спільнота",marketplace:"Маркетплейс",edition:"Видання",coverStars:"Зірки обкладинки",contests:"Конкурси",articles:"Статті",photos:"Фото",fashion:"Мода",health:"Здоров’я"}
  },
  ru:{
    menu:"Открыть меню",profile:"Профиль",partners:"Партнёры",signIn:"Войти",joinClub:"Подписаться",
    labels:{petFriendly:"Pet-Friendly",discounts:"Скидки",help:"Помощь",community:"Сообщество",marketplace:"Маркетплейс",edition:"Издание",coverStars:"Звёзды обложки",contests:"Конкурсы",articles:"Статьи",photos:"Фото",fashion:"Мода",health:"Здоровье"}
  },
  fr:{
    menu:"Ouvrir le menu",profile:"Profil",partners:"Partenaires",signIn:"Connexion",joinClub:"Rejoindre le Club",
    labels:{petFriendly:"Pet-Friendly",discounts:"Réductions",help:"Aide",community:"Communauté",marketplace:"Marketplace",edition:"Édition",coverStars:"Stars de couverture",contests:"Concours",articles:"Articles",photos:"Photos",fashion:"Mode",health:"Santé"}
  },
  de:{
    menu:"Menü öffnen",profile:"Profil",partners:"Partner",signIn:"Anmelden",joinClub:"Club beitreten",
    labels:{petFriendly:"Tierfreundlich",discounts:"Rabatte",help:"Hilfe",community:"Community",marketplace:"Marktplatz",edition:"Ausgabe",coverStars:"Cover Stars",contests:"Wettbewerbe",articles:"Artikel",photos:"Fotos",fashion:"Mode",health:"Gesundheit"}
  },
  es:{
    menu:"Abrir menú",profile:"Perfil",partners:"Socios",signIn:"Iniciar sesión",joinClub:"Únete al Club",
    labels:{petFriendly:"Pet-Friendly",discounts:"Descuentos",help:"Ayuda",community:"Comunidad",marketplace:"Marketplace",edition:"Edición",coverStars:"Estrellas de portada",contests:"Concursos",articles:"Artículos",photos:"Fotos",fashion:"Moda",health:"Salud"}
  },
  it:{
    menu:"Apri menu",profile:"Profilo",partners:"Partner",signIn:"Accedi",joinClub:"Unisciti al Club",
    labels:{petFriendly:"Pet-Friendly",discounts:"Sconti",help:"Aiuto",community:"Community",marketplace:"Marketplace",edition:"Edizione",coverStars:"Cover Stars",contests:"Concorsi",articles:"Articoli",photos:"Foto",fashion:"Moda",health:"Salute"}
  },
  pt:{
    menu:"Abrir menu",profile:"Perfil",partners:"Parceiros",signIn:"Entrar",joinClub:"Entrar no Clube",
    labels:{petFriendly:"Pet-Friendly",discounts:"Descontos",help:"Ajuda",community:"Comunidade",marketplace:"Marketplace",edition:"Edição",coverStars:"Estrelas da capa",contests:"Concursos",articles:"Artigos",photos:"Fotos",fashion:"Moda",health:"Saúde"}
  },
  nl:{
    menu:"Menu openen",profile:"Profiel",partners:"Partners",signIn:"Inloggen",joinClub:"Word lid",
    labels:{petFriendly:"Pet-Friendly",discounts:"Kortingen",help:"Hulp",community:"Community",marketplace:"Marktplaats",edition:"Editie",coverStars:"Coversterren",contests:"Wedstrijden",articles:"Artikelen",photos:"Foto’s",fashion:"Mode",health:"Gezondheid"}
  },
  pl:{
    menu:"Otwórz menu",profile:"Profil",partners:"Partnerzy",signIn:"Zaloguj się",joinClub:"Dołącz do klubu",
    labels:{petFriendly:"Pet-Friendly",discounts:"Zniżki",help:"Pomoc",community:"Społeczność",marketplace:"Marketplace",edition:"Wydanie",coverStars:"Gwiazdy okładki",contests:"Konkursy",articles:"Artykuły",photos:"Zdjęcia",fashion:"Moda",health:"Zdrowie"}
  },
  cs:{
    menu:"Otevřít menu",profile:"Profil",partners:"Partneři",signIn:"Přihlásit se",joinClub:"Vstoupit do klubu",
    labels:{petFriendly:"Pet-Friendly",discounts:"Slevy",help:"Pomoc",community:"Komunita",marketplace:"Marketplace",edition:"Vydání",coverStars:"Hvězdy obálky",contests:"Soutěže",articles:"Články",photos:"Fotografie",fashion:"Móda",health:"Zdraví"}
  },
  sk:{
    menu:"Otvoriť menu",profile:"Profil",partners:"Partneri",signIn:"Prihlásiť sa",joinClub:"Vstúpiť do klubu",
    labels:{petFriendly:"Pet-Friendly",discounts:"Zľavy",help:"Pomoc",community:"Komunita",marketplace:"Marketplace",edition:"Vydanie",coverStars:"Hviezdy obálky",contests:"Súťaže",articles:"Články",photos:"Fotografie",fashion:"Móda",health:"Zdravie"}
  },
  hu:{
    menu:"Menü megnyitása",profile:"Profil",partners:"Partnerek",signIn:"Belépés",joinClub:"Csatlakozás",
    labels:{petFriendly:"Állatbarát",discounts:"Kedvezmények",help:"Segítség",community:"Közösség",marketplace:"Piactér",edition:"Kiadás",coverStars:"Címlapsztárok",contests:"Versenyek",articles:"Cikkek",photos:"Fotók",fashion:"Divat",health:"Egészség"}
  },
  ro:{
    menu:"Deschide meniul",profile:"Profil",partners:"Parteneri",signIn:"Autentificare",joinClub:"Intră în Club",
    labels:{petFriendly:"Pet-Friendly",discounts:"Reduceri",help:"Ajutor",community:"Comunitate",marketplace:"Marketplace",edition:"Ediție",coverStars:"Vedete de copertă",contests:"Concursuri",articles:"Articole",photos:"Fotografii",fashion:"Modă",health:"Sănătate"}
  },
  bg:{
    menu:"Отвори менюто",profile:"Профил",partners:"Партньори",signIn:"Вход",joinClub:"Влезте в клуба",
    labels:{petFriendly:"Pet-Friendly",discounts:"Отстъпки",help:"Помощ",community:"Общност",marketplace:"Маркетплейс",edition:"Издание",coverStars:"Звезди на корицата",contests:"Конкурси",articles:"Статии",photos:"Снимки",fashion:"Мода",health:"Здраве"}
  },
  el:{
    menu:"Άνοιγμα μενού",profile:"Προφίλ",partners:"Συνεργάτες",signIn:"Σύνδεση",joinClub:"Εγγραφή στο Club",
    labels:{petFriendly:"Pet-Friendly",discounts:"Εκπτώσεις",help:"Βοήθεια",community:"Κοινότητα",marketplace:"Marketplace",edition:"Έκδοση",coverStars:"Αστέρια εξωφύλλου",contests:"Διαγωνισμοί",articles:"Άρθρα",photos:"Φωτογραφίες",fashion:"Μόδα",health:"Υγεία"}
  },
  sv:{
    menu:"Öppna meny",profile:"Profil",partners:"Partners",signIn:"Logga in",joinClub:"Gå med i klubben",
    labels:{petFriendly:"Djurvänligt",discounts:"Rabatter",help:"Hjälp",community:"Community",marketplace:"Marknadsplats",edition:"Utgåva",coverStars:"Omslagsstjärnor",contests:"Tävlingar",articles:"Artiklar",photos:"Foton",fashion:"Mode",health:"Hälsa"}
  },
  da:{
    menu:"Åbn menu",profile:"Profil",partners:"Partnere",signIn:"Log ind",joinClub:"Bliv medlem",
    labels:{petFriendly:"Kæledyrsvenligt",discounts:"Rabatter",help:"Hjælp",community:"Fællesskab",marketplace:"Markedsplads",edition:"Udgave",coverStars:"Forsidestjerner",contests:"Konkurrencer",articles:"Artikler",photos:"Fotos",fashion:"Mode",health:"Sundhed"}
  },
  no:{
    menu:"Åpne meny",profile:"Profil",partners:"Partnere",signIn:"Logg inn",joinClub:"Bli med i klubben",
    labels:{petFriendly:"Dyrevennlig",discounts:"Rabatter",help:"Hjelp",community:"Fellesskap",marketplace:"Markedsplass",edition:"Utgave",coverStars:"Forsidestjerner",contests:"Konkurranser",articles:"Artikler",photos:"Bilder",fashion:"Mote",health:"Helse"}
  },
  fi:{
    menu:"Avaa valikko",profile:"Profiili",partners:"Kumppanit",signIn:"Kirjaudu",joinClub:"Liity klubiin",
    labels:{petFriendly:"Lemmikkiystävällinen",discounts:"Alennukset",help:"Apua",community:"Yhteisö",marketplace:"Markkinapaikka",edition:"Numero",coverStars:"Kansitähdet",contests:"Kilpailut",articles:"Artikkelit",photos:"Kuvat",fashion:"Muoti",health:"Terveys"}
  },
  tr:{
    menu:"Menüyü aç",profile:"Profil",partners:"Ortaklar",signIn:"Giriş yap",joinClub:"Kulübe katıl",
    labels:{petFriendly:"Pet-Friendly",discounts:"İndirimler",help:"Yardım",community:"Topluluk",marketplace:"Pazar yeri",edition:"Sürüm",coverStars:"Kapak yıldızları",contests:"Yarışmalar",articles:"Makaleler",photos:"Fotoğraflar",fashion:"Moda",health:"Sağlık"}
  },
  ar:{
    menu:"فتح القائمة",profile:"الملف الشخصي",partners:"الشركاء",signIn:"تسجيل الدخول",joinClub:"انضم إلى النادي",
    labels:{petFriendly:"صديق للحيوانات",discounts:"الخصومات",help:"المساعدة",community:"المجتمع",marketplace:"السوق",edition:"الإصدار",coverStars:"نجوم الغلاف",contests:"المسابقات",articles:"المقالات",photos:"الصور",fashion:"الموضة",health:"الصحة"}
  },
  hi:{
    menu:"मेनू खोलें",profile:"प्रोफ़ाइल",partners:"पार्टनर्स",signIn:"लॉग इन",joinClub:"क्लब से जुड़ें",
    labels:{petFriendly:"Pet-Friendly",discounts:"छूट",help:"मदद",community:"समुदाय",marketplace:"मार्केटप्लेस",edition:"एडिशन",coverStars:"कवर स्टार्स",contests:"प्रतियोगिताएँ",articles:"लेख",photos:"फ़ोटो",fashion:"फैशन",health:"स्वास्थ्य"}
  }
};

let language="en";
let activeKey="";
let oldHeaderObserver=null;
let lastScrollY=Math.max(0,window.scrollY||0);
let lastDirection=0;
let accumulated=0;
let scrollTicking=false;

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
    COPY,
    normalizeLanguage(value)
  );
}

function currentFile(){
  const path=window.location.pathname||"";
  return(
    path.split("/").filter(Boolean).pop()
    ||
    "index.html"
  ).toLowerCase();
}

function isHomePage(){
  return currentFile()==="index.html";
}

function detectActiveKey(){
  const file=currentFile();

  if(PAGE_KEYS[file]){
    return PAGE_KEYS[file];
  }

  const path=(window.location.pathname||"").toLowerCase();

  for(const [fileName,key] of Object.entries(PAGE_KEYS)){
    if(path.includes(fileName.replace(".html",""))){
      return key;
    }
  }

  return"";
}

function findPageLanguageSelect(){
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
    const element=document.querySelector(selector);

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

    if(saved&&supportedLanguage(saved)){
      return saved;
    }
  }catch(error){}

  const pageSelect=findPageLanguageSelect();
  const fromSelect=normalizeLanguage(pageSelect?.value||"");

  if(fromSelect&&supportedLanguage(fromSelect)){
    return fromSelect;
  }

  const htmlLanguage=normalizeLanguage(
    document.documentElement.lang||""
  );

  return supportedLanguage(htmlLanguage)
    ?htmlLanguage
    :"en";
}

function copy(){
  return COPY[language]||COPY.en;
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
  document.getElementById("pdHeaderOnlyStyles")?.remove();

  const style=document.createElement("style");
  style.id="pdHeaderOnlyStyles";

  style.textContent=`
    :root{
      --pdh-black:#050505;
      --pdh-black-soft:#090909;
      --pdh-white:#fff;
      --pdh-gold:#c69b45;
      --pdh-gold-light:#ecd28a;
      --pdh-green:#65e51f;
      --pdh-line:rgba(255,255,255,.20);
      --pdh-serif:Georgia,"Times New Roman",serif;
      --pdh-sans:Arial,Helvetica,sans-serif;
    }

    .pd-header-old-hidden{
      display:none!important;
    }

    #pdHomeHeaderImage{
      position:relative;
      width:100%;
      height:clamp(96px,24vw,150px);
      overflow:hidden;
      background:#111;
    }

    #pdHomeHeaderImage img{
      display:block;
      width:100%;
      height:100%;
      object-fit:cover;
      object-position:center 38%;
    }

    #pdLuxuryHeader{
      position:sticky;
      top:0;
      z-index:14000;
      width:100%;
      background:var(--pdh-black);
      color:var(--pdh-white);
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
      min-height:48px;
      display:grid;
      grid-template-columns:39px minmax(92px,1fr) auto auto;
      align-items:center;
      gap:6px;
      padding:4px 9px;
      background:var(--pdh-black);
      border-bottom:1px solid var(--pdh-line);
      direction:ltr;
    }

    #pdLuxuryMenuButton{
      width:38px;
      height:38px;
      border:0;
      padding:4px 0;
      background:transparent;
      display:flex;
      flex-direction:column;
      justify-content:center;
      gap:5px;
      cursor:pointer;
    }

    #pdLuxuryMenuButton span{
      display:block;
      width:29px;
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
      font-size:19px;
      line-height:1;
      letter-spacing:.1px;
    }

    #pdLuxuryPartners{
      height:31px;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      padding:0 11px;
      border:1px solid #fff;
      border-radius:999px;
      background:#fff;
      color:#111;
      text-decoration:none;
      font-size:9px;
      line-height:1;
      font-weight:900;
      letter-spacing:.25px;
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
    }     #pdLuxuryProfileButton svg{
      width:21px;
      height:21px;
      flex:0 0 21px;
      fill:none;
      stroke:currentColor;
      stroke-width:1.85;
      stroke-linecap:round;
      stroke-linejoin:round;
    }

    .pd-luxury-profile-label{
      font-size:9px;
      line-height:1;
      font-weight:800;
      white-space:nowrap;
    }

    #pdLuxuryProfileButton[aria-expanded="true"]{
      color:var(--pdh-gold-light);
    }

    #pdLuxuryProfileMenu{
      position:absolute;
      top:40px;
      right:0;
      z-index:14200;
      width:202px;
      padding:9px;
      border:1px solid #333;
      border-radius:14px;
      background:#0b0b0b;
      box-shadow:0 18px 42px rgba(0,0,0,.35);
      opacity:0;
      visibility:hidden;
      transform:translateY(-5px);
      transition:opacity .18s ease,transform .18s ease,visibility .18s ease;
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
      letter-spacing:.5px;
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

    .pd-luxury-profile-link + .pd-luxury-profile-link{
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
      border-bottom:1px solid var(--pdh-line);
    }

    .pd-luxury-row{
      display:flex;
      align-items:stretch;
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
      min-height:32px;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:0 17px;
      border-right:1px solid rgba(255,255,255,.08);
      color:#f7f7f7;
      text-decoration:none;
      font-family:var(--pdh-serif);
      font-size:12px;
      line-height:1;
      font-weight:400;
    }

    .pd-luxury-row-link:last-child{
      padding-right:26px;
    }

    .pd-luxury-row-link.active{
      color:var(--pdh-gold-light);
    }

    .pd-luxury-row-link.active::after{
      content:"";
      position:absolute;
      left:13px;
      right:13px;
      bottom:0;
      height:2px;
      background:var(--pdh-gold);
    }

    .pd-luxury-row-shell::after{
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
      font:25px/1 var(--pdh-serif);
      pointer-events:none;
      background:linear-gradient(90deg,rgba(8,8,8,0),#080808 58%);
    }

    html[dir="rtl"] .pd-luxury-row-shell::after{
      content:"‹";
      right:auto;
      left:0;
      background:linear-gradient(270deg,rgba(8,8,8,0),#080808 58%);
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
        grid-template-columns:37px minmax(86px,1fr) auto auto;
        gap:4px;
        padding-left:7px;
        padding-right:7px;
      }

      #pdLuxuryBrand{
        font-size:17px;
      }

      #pdLuxuryPartners{
        height:30px;
        padding:0 9px;
        font-size:8.5px;
      }

      .pd-luxury-profile-label{
        font-size:8.5px;
      }

      .pd-luxury-row-link{
        min-height:31px;
        padding-left:15px;
        padding-right:15px;
        font-size:11.5px;
      }

      #pdHomeHeaderImage{
        height:clamp(94px,25vw,126px);
      }
    }

    @media(max-width:340px){
      .pd-luxury-profile-label{
        display:none;
      }

      #pdLuxuryMainBar{
        grid-template-columns:36px minmax(82px,1fr) auto 29px;
      }

      #pdLuxuryPartners{
        padding:0 8px;
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

function hideOldHeaders(){
  const selectors=[
    "body > header:not(#pdLuxuryHeader)",
    "body > .site-header",
    "body > .topbar",
    "body > .mobile-header",
    "body > .main-header",
    "body > .pd-topbar",
    "#pdMasterHeader",
    ".pd-master-header",
    ".desktop-categories",
    ".primary-nav",
    ".category-nav",
    ".global-nav",
    ".rubric-nav",
    "#categoryNav",
    ".pd-primary-nav",
    ".pd-secondary-nav"
  ];

  selectors.forEach(selector=>{
    document.querySelectorAll(selector).forEach(element=>{
      if(element.id==="pdLuxuryHeader"){
        return;
      }

      element.classList.add("pd-header-old-hidden");
    });
  });
}

function watchOldHeaders(){
  if(oldHeaderObserver){
    return;
  }

  oldHeaderObserver=new MutationObserver(()=>hideOldHeaders());

  oldHeaderObserver.observe(
    document.body,
    {childList:true,subtree:true}
  );
}

function getHomeImageSource(){
  const explicit=String(
    window.PETS_DOGUE_HOME_MASTHEAD_SRC||""
  ).trim();

  if(explicit){
    return explicit;
  }

  const marked=document.querySelector(
    "[data-pd-home-masthead-src]"
  );

  if(marked){
    const markedSource=
      marked.getAttribute("data-pd-home-masthead-src")
      ||
      marked.getAttribute("src")
      ||
      "";

    if(markedSource){
      return markedSource;
    }
  }

  const currentHomeCover=document.querySelector(
    ".latest-cover img"
  );

  if(currentHomeCover?.getAttribute("src")){
    return currentHomeCover.getAttribute("src");
  }

  const fallback=document.querySelector(
    ".hero img, main img"
  );

  return fallback?.getAttribute("src")||"";
}

function createHomeImage(){
  if(!isHomePage()){
    return;
  }

  if(document.getElementById("pdHomeHeaderImage")){
    return;
  }

  const source=getHomeImageSource();

  if(!source){
    return;
  }

  const holder=document.createElement("div");
  holder.id="pdHomeHeaderImage";

  holder.innerHTML=`
    <img
      src="${escapeHTML(source)}"
      alt="PETS & DOGUE"
      decoding="async"
      fetchpriority="high"
    >
  `;

  document.body.insertBefore(holder,document.body.firstChild);
}

function headerCopy(){
  return copy();
}

function renderRows(){
  const top=document.getElementById("pdLuxuryTopRow");
  const bottom=document.getElementById("pdLuxuryBottomRow");

  if(!top||!bottom){
    return;
  }

  const labels=headerCopy().labels;

  const build=keys=>keys.map(key=>`
    <a
      class="pd-luxury-row-link${key===activeKey?" active":""}"
      href="${escapeHTML(ROUTES[key])}"
      data-pd-header-link="${escapeHTML(key)}"
      ${key===activeKey?'aria-current="page"':""}
    >
      ${escapeHTML(labels[key]||COPY.en.labels[key]||key)}
    </a>
  `).join("");

  top.innerHTML=build(TOP_KEYS);
  bottom.innerHTML=build(BOTTOM_KEYS);

  requestAnimationFrame(()=>{
    const active=document.querySelector(
      ".pd-luxury-row-link.active"
    );

    active?.scrollIntoView({
      block:"nearest",
      inline:"center",
      behavior:"auto"
    });
  });
}

function renderProfileMenu(){
  const menu=document.getElementById("pdLuxuryProfileMenu");

  if(!menu){
    return;
  }

  const text=headerCopy();
  const wasOpen=menu.classList.contains("open");

  menu.innerHTML=`
    <div class="pd-luxury-profile-title">
      ${escapeHTML(text.profile)}
    </div>

    <a class="pd-luxury-profile-link" href="account.html">
      ${escapeHTML(text.signIn)}
    </a>

    <a class="pd-luxury-profile-link club" href="club.html">
      ${escapeHTML(text.joinClub)}
    </a>
  `;

  if(wasOpen){
    menu.classList.add("open");
    menu.setAttribute("aria-hidden","false");
  }
}

function createHeader(){
  if(document.getElementById("pdLuxuryHeader")){
    return;
  }

  const text=headerCopy();
  const header=document.createElement("header");
  header.id="pdLuxuryHeader";

  header.innerHTML=`
    <div id="pdLuxuryMainBar">
      <button
        id="pdLuxuryMenuButton"
        type="button"
        aria-label="${escapeHTML(text.menu)}"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>       <a
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
        ${escapeHTML(text.partners)}
      </a>

      <div id="pdLuxuryProfileWrap">
        <button
          id="pdLuxuryProfileButton"
          type="button"
          aria-label="${escapeHTML(text.profile)}"
          aria-controls="pdLuxuryProfileMenu"
          aria-expanded="false"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path>
          </svg>

          <span class="pd-luxury-profile-label">
            ${escapeHTML(text.profile)}
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

  const homeImage=document.getElementById("pdHomeHeaderImage");

  if(homeImage){
    homeImage.insertAdjacentElement("afterend",header);
  }else{
    document.body.insertBefore(header,document.body.firstChild);
  }

  document
    .getElementById("pdLuxuryMenuButton")
    ?.addEventListener("click",openExistingSideMenu);

  document
    .getElementById("pdLuxuryProfileButton")
    ?.addEventListener("click",event=>{
      event.stopPropagation();
      toggleProfileMenu();
    });

  renderProfileMenu();
  renderRows();
}

function openExistingSideMenu(){
  showHeader();
  closeProfileMenu();

  const pageOpenMenu=window.openMenu;

  if(
    typeof pageOpenMenu==="function"&&
    pageOpenMenu!==openExistingSideMenu
  ){
    try{
      pageOpenMenu();
      return;
    }catch(error){}
  }

  for(const functionName of[
    "openSideMenu",
    "showMenu"
  ]){
    const candidate=window[functionName];

    if(typeof candidate==="function"){
      try{
        candidate();
        return;
      }catch(error){}
    }
  }

  const menu=document.querySelector(
    "#sideMenu,.side-menu,#pdGlobalMenu,.pd-drawer"
  );

  const overlay=document.querySelector(
    "#menuOverlay,.menu-overlay,#pdGlobalOverlay,.pd-menu-overlay"
  );

  if(menu){
    menu.classList.add("open","active","show");
    menu.setAttribute("aria-hidden","false");
    document.body.classList.add("menu-open","pd-global-menu-open");
  }

  if(overlay){
    overlay.classList.add("open","active","show");
  }
}

function openProfileMenu(){
  showHeader();

  const menu=document.getElementById("pdLuxuryProfileMenu");
  const button=document.getElementById("pdLuxuryProfileButton");

  if(!menu||!button){
    return;
  }

  menu.classList.add("open");
  menu.setAttribute("aria-hidden","false");
  button.setAttribute("aria-expanded","true");
}

function closeProfileMenu(){
  const menu=document.getElementById("pdLuxuryProfileMenu");
  const button=document.getElementById("pdLuxuryProfileButton");

  if(!menu||!button){
    return;
  }

  menu.classList.remove("open");
  menu.setAttribute("aria-hidden","true");
  button.setAttribute("aria-expanded","false");
}

function toggleProfileMenu(){
  const menu=document.getElementById("pdLuxuryProfileMenu");

  if(!menu){
    return;
  }

  if(menu.classList.contains("open")){
    closeProfileMenu();
  }else{
    openProfileMenu();
  }
}

function showHeader(){
  document
    .getElementById("pdLuxuryHeader")
    ?.classList.remove("pd-header-hidden");
}

function hideHeader(){
  document
    .getElementById("pdLuxuryHeader")
    ?.classList.add("pd-header-hidden");
}

function sideMenuIsOpen(){
  const candidates=[
    "#sideMenu",
    ".side-menu",
    "#pdGlobalMenu",
    ".pd-drawer"
  ];

  return candidates.some(selector=>{
    const menu=document.querySelector(selector);

    return Boolean(
      menu&&(
        menu.classList.contains("open")||
        menu.classList.contains("active")||
        menu.classList.contains("show")||
        menu.getAttribute("aria-hidden")==="false"
      )
    );
  });
}

function handleScroll(){
  if(scrollTicking){
    return;
  }

  scrollTicking=true;

  requestAnimationFrame(()=>{
    const current=Math.max(0,window.scrollY||0);
    const delta=current-lastScrollY;
    const direction=
      delta>0
        ?1
        :delta<0
          ?-1
          :0;

    const profileOpen=
      document.getElementById("pdLuxuryProfileMenu")
        ?.classList.contains("open");

    if(
      current<=8||
      sideMenuIsOpen()||
      profileOpen
    ){
      showHeader();
      accumulated=0;
    }else if(direction!==0){
      if(direction!==lastDirection){
        accumulated=0;
      }

      accumulated+=Math.abs(delta);

      if(direction>0&&accumulated>=16){
        hideHeader();
        accumulated=0;
      }

      if(direction<0&&accumulated>=8){
        showHeader();
        accumulated=0;
      }

      lastDirection=direction;
    }

    lastScrollY=current;
    scrollTicking=false;
  });
}

function refreshLanguage(nextLanguage){
  const code=normalizeLanguage(nextLanguage);

  if(!supportedLanguage(code)){
    return;
  }

  language=code;

  const text=headerCopy();

  document
    .getElementById("pdLuxuryMenuButton")
    ?.setAttribute("aria-label",text.menu);

  const partner=document.getElementById("pdLuxuryPartners");
  if(partner){
    partner.textContent=text.partners;
  }

  const profileButton=document.getElementById("pdLuxuryProfileButton");
  profileButton?.setAttribute("aria-label",text.profile);

  const profileLabel=profileButton?.querySelector(
    ".pd-luxury-profile-label"
  );

  if(profileLabel){
    profileLabel.textContent=text.profile;
  }

  renderRows();
  renderProfileMenu();
}

function listenForLanguageChanges(){
  window.addEventListener(
    "petsdogue:languagechange",
    event=>{
      refreshLanguage(
        event?.detail?.language||detectLanguage()
      );
    }
  );

  window.addEventListener(
    "storage",
    event=>{
      if(event.key===LANGUAGE_KEY){
        refreshLanguage(event.newValue||detectLanguage());
      }
    }
  );

  document.addEventListener(
    "change",
    event=>{
      const target=event.target;

      if(!(target instanceof HTMLSelectElement)){
        return;
      }

      const looksLikeLanguage=
        target.matches(
          "#pdLanguageSelect,#headerLanguageSelect,#languageSelect,#language,#langSelect,select[data-language-select],select[name='language'],select[name='lang']"
        );

      if(looksLikeLanguage){
        setTimeout(()=>{
          refreshLanguage(target.value||detectLanguage());
        },0);
      }
    }
  );
}

function handleDocumentClick(event){
  const menu=document.getElementById("pdLuxuryProfileMenu");
  const button=document.getElementById("pdLuxuryProfileButton");

  if(
    menu?.classList.contains("open")&&
    !menu.contains(event.target)&&
    !button?.contains(event.target)
  ){
    closeProfileMenu();
  }
}

function handleEscape(event){
  if(event.key==="Escape"){
    closeProfileMenu();
  }
}

function init(){
  if(
    document.documentElement.dataset.petsDogueHeaderOnly
    ===
    "1"
  ){
    return;
  }

  document.documentElement.dataset.petsDogueHeaderOnly="1";

  language=detectLanguage();
  activeKey=detectActiveKey();

  installStyles();
  hideOldHeaders();
  createHomeImage();
  createHeader();
  refreshLanguage(language);
  watchOldHeaders();
  listenForLanguageChanges();
  showHeader();

  window.addEventListener(
    "scroll",
    handleScroll,
    {passive:true}
  );

  window.addEventListener(
    "resize",
    showHeader,
    {passive:true}
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
    refreshLanguage
  };
}

if(document.readyState==="loading"){
  document.addEventListener(
    "DOMContentLoaded",
    init,
    {once:true}
  );
}else{
  init();
}

})();
