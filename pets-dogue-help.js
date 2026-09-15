"use strict";

/* =========================================================
   PETS & DOGUE
   GLOBAL HELP ASSISTANT

   MISO HELP
   - floating draggable button
   - opens contextual Help / FAQ
   - multilingual
   - Arabic RTL
   - search
   - text-to-speech
   - automatic speech when Help opens
   - speaker button pauses/resumes speech
   - remembers floating button position

   IMPORTANT
   This file is intentionally isolated from the existing
   PETS & DOGUE shell and page functionality.
========================================================= */

(function(){

  const LANGUAGE_KEY =
    "pets_dogue_language";

  const POSITION_KEY =
    "pets_dogue_help_position_v1";

  const aliases = {
    ua:"uk",
    cz:"cs",
    gr:"el",
    se:"sv",
    dk:"da"
  };

  const supported = [
    "en","uk","ru","fr","de","es","it","pt","nl","pl","cs","sk",
    "hu","ro","bg","el","sv","da","no","fi","tr","ar","hi"
  ];


  /* =======================================================
     MISO ICON
  ======================================================= */

  const FALLBACK_MISO =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffffff"/>
            <stop offset="1" stop-color="#f0eadc"/>
          </linearGradient>
        </defs>

        <circle cx="80" cy="80" r="76" fill="url(#bg)"/>

        <path
          d="M45 62 C27 54 23 36 32 23 C47 28 57 39 59 52"
          fill="#f4e4bd"
          stroke="#111"
          stroke-width="5"
        />

        <path
          d="M115 62 C133 54 137 36 128 23 C113 28 103 39 101 52"
          fill="#f4e4bd"
          stroke="#111"
          stroke-width="5"
        />

        <path
          d="M42 82 C42 49 58 35 80 35 C102 35 118 49 118 82
             C118 116 100 134 80 134 C60 134 42 116 42 82Z"
          fill="#fff4d8"
          stroke="#111"
          stroke-width="5"
        />

        <path
          d="M42 75 C42 48 56 31 80 31 C104 31 118 48 118 75"
          fill="none"
          stroke="#111"
          stroke-width="8"
          stroke-linecap="round"
        />

        <circle cx="64" cy="78" r="6" fill="#111"/>
        <circle cx="96" cy="78" r="6" fill="#111"/>

        <path
          d="M74 94 Q80 89 86 94 Q80 101 74 94Z"
          fill="#111"
        />

        <path
          d="M68 105 Q80 116 92 105"
          fill="none"
          stroke="#111"
          stroke-width="4"
          stroke-linecap="round"
        />

        <circle cx="128" cy="122" r="5" fill="#54ef0b"/>
      </svg>
    `);


  /* =======================================================
     LANGUAGE
  ======================================================= */

  function detectLanguage(){

    let value = "";

    try{
      value =
        localStorage.getItem(
          LANGUAGE_KEY
        ) || "";
    }catch{}

    value =
      String(value)
        .toLowerCase()
        .replace("_","-")
        .split("-")[0];

    value =
      aliases[value] ||
      value;

    return supported.includes(value)
      ? value
      : "en";
  }


  /* =======================================================
     UI TRANSLATIONS
  ======================================================= */

  const UI = {

    en:{
      help:"Help",
      title:"How can Miso help?",
      intro:"Welcome to PETS & DOGUE Help. Choose a topic below or type your question in the search box.",
      search:"Search Help",
      placeholder:"What would you like to know?",
      topics:"Help topics",
      results:"Search results",
      noResults:"No matching answers found. Try different words.",
      close:"Close Help",
      speak:"Read aloud",
      stop:"Stop reading",
      back:"Back to all topics"
    },

    uk:{
      help:"Допомога",
      title:"Як Місо може допомогти?",
      intro:"Ласкаво просимо до довідки PETS & DOGUE. Оберіть тему нижче або введіть своє запитання в пошуку.",
      search:"Пошук у довідці",
      placeholder:"Що ви хочете дізнатися?",
      topics:"Розділи допомоги",
      results:"Результати пошуку",
      noResults:"Відповідей не знайдено. Спробуйте інші слова.",
      close:"Закрити довідку",
      speak:"Озвучити",
      stop:"Зупинити озвучення",
      back:"До всіх тем"
    },

    ru:{
      help:"Помощь",
      title:"Чем Мисо может помочь?",
      intro:"Добро пожаловать в помощь PETS & DOGUE. Выберите интересующую тему или напишите свой вопрос в строке поиска.",
      search:"Поиск по помощи",
      placeholder:"Что вы хотите узнать?",
      topics:"Разделы помощи",
      results:"Результаты поиска",
      noResults:"Подходящих ответов не найдено. Попробуйте другие слова.",
      close:"Закрыть помощь",
      speak:"Озвучить",
      stop:"Остановить озвучку",
      back:"Ко всем разделам"
    },

    fr:{
      help:"Aide",
      title:"Comment Miso peut-elle vous aider ?",
      intro:"Bienvenue dans l'aide PETS & DOGUE. Choisissez un sujet ou saisissez votre question.",
      search:"Rechercher dans l'aide",
      placeholder:"Que souhaitez-vous savoir ?",
      topics:"Rubriques d'aide",
      results:"Résultats",
      noResults:"Aucune réponse correspondante.",
      close:"Fermer l'aide",
      speak:"Lire à voix haute",
      stop:"Arrêter la lecture",
      back:"Tous les sujets"
    },

    de:{
      help:"Hilfe",
      title:"Wie kann Miso helfen?",
      intro:"Willkommen bei PETS & DOGUE Hilfe. Wähle ein Thema oder gib deine Frage ein.",
      search:"Hilfe durchsuchen",
      placeholder:"Was möchtest du wissen?",
      topics:"Hilfethemen",
      results:"Suchergebnisse",
      noResults:"Keine passende Antwort gefunden.",
      close:"Hilfe schließen",
      speak:"Vorlesen",
      stop:"Vorlesen stoppen",
      back:"Alle Themen"
    },

    es:{
      help:"Ayuda",
      title:"¿Cómo puede ayudarte Miso?",
      intro:"Bienvenido a la ayuda de PETS & DOGUE. Elige un tema o escribe tu pregunta.",
      search:"Buscar ayuda",
      placeholder:"¿Qué quieres saber?",
      topics:"Temas de ayuda",
      results:"Resultados",
      noResults:"No se encontraron respuestas.",
      close:"Cerrar ayuda",
      speak:"Leer en voz alta",
      stop:"Detener lectura",
      back:"Todos los temas"
    },

    ar:{
      help:"المساعدة",
      title:"كيف يمكن لميسو مساعدتك؟",
      intro:"مرحباً بك في مساعدة PETS & DOGUE. اختر موضوعاً أو اكتب سؤالك في البحث.",
      search:"البحث في المساعدة",
      placeholder:"ماذا تريد أن تعرف؟",
      topics:"مواضيع المساعدة",
      results:"نتائج البحث",
      noResults:"لم يتم العثور على إجابات مطابقة.",
      close:"إغلاق المساعدة",
      speak:"قراءة بصوت عالٍ",
      stop:"إيقاف القراءة",
      back:"كل المواضيع"
    }

  };


  const languageFallbacks = {

    it:{help:"Aiuto",title:"Come può aiutarti Miso?"},
    pt:{help:"Ajuda",title:"Como a Miso pode ajudar?"},
    nl:{help:"Help",title:"Hoe kan Miso helpen?"},
    pl:{help:"Pomoc",title:"Jak Miso może pomóc?"},
    cs:{help:"Nápověda",title:"Jak může Miso pomoci?"},
    sk:{help:"Pomoc",title:"Ako môže Miso pomôcť?"},
    hu:{help:"Súgó",title:"Hogyan segíthet Miso?"},
    ro:{help:"Ajutor",title:"Cum vă poate ajuta Miso?"},
    bg:{help:"Помощ",title:"Как може Мисо да помогне?"},
    el:{help:"Βοήθεια",title:"Πώς μπορεί να βοηθήσει η Miso;"},
    sv:{help:"Hjälp",title:"Hur kan Miso hjälpa?"},
    da:{help:"Hjælp",title:"Hvordan kan Miso hjælpe?"},
    no:{help:"Hjelp",title:"Hvordan kan Miso hjelpe?"},
    fi:{help:"Ohje",title:"Miten Miso voi auttaa?"},
    tr:{help:"Yardım",title:"Miso nasıl yardımcı olabilir?"},
    hi:{help:"सहायता",title:"Miso कैसे मदद कर सकती है?"}

  };


  Object.entries(languageFallbacks)
    .forEach(([language,values])=>{

      UI[language] = {
        ...UI.en,
        ...values
      };

    });


  /* =======================================================
     HELP CONTENT
  ======================================================= */

  const CONTENT = {

    en:[

      {
        id:"start",
        icon:"✦",
        title:"Getting started",
        description:"What PETS & DOGUE is and how to use the platform.",
        items:[
          {
            q:"What is PETS & DOGUE?",
            a:"PETS & DOGUE is a digital lifestyle platform for pets and the people who love them — bringing together stories, practical guides, pet-friendly places, health, fashion, photography, community, contests, rescue, Marketplace, member benefits and useful services."
          },
          {
            q:"Do I need an account to use PETS & DOGUE?",
            a:"No. Visitors can explore PETS & DOGUE without signing in. Subscription unlocks member discounts and special offers and lets members post up to 50 free Marketplace ads."
          },
          {
            q:"What do the three lines at the top mean?",
            a:"The three-line button opens Contents. From there you can move between PETS & DOGUE sections, change language, sign in or subscribe."
          }
        ]
      },

      {
        id:"language",
        icon:"文",
        title:"Language",
        description:"Change the platform language and keep your selection.",
        items:[
          {
            q:"How do I change the language?",
            a:"Open the Contents menu using the three-line button. Choose Language and select your language. PETS & DOGUE remembers your selection."
          },
          {
            q:"Does PETS & DOGUE support Arabic?",
            a:"Yes. Arabic uses a right-to-left layout on supported PETS & DOGUE pages."
          }
        ]
      },

      {
        id:"petfriendly",
        icon:"🐾",
        title:"Pet-Friendly Places",
        description:"Find places, use the map, save places and check pet rules.",
        items:[
          {
            q:"How do Pet-Friendly Places work?",
            a:"Open Pet-Friendly Places and allow location access or search for a city, postcode or area. Choose a category and search radius. Places appear as cards and map markers."
          },
          {
            q:"How do I add a pet-friendly place?",
            a:"Open Pet-Friendly Places and choose Add place. Add information about the exact venue."
          },
          {
            q:"How do I save a place?",
            a:"Tap the heart on the place card. You can find the place again in Saved."
          },
          {
            q:"How do I get directions?",
            a:"Tap Route on the place. You can continue with Google Maps, Waze or Apple Maps."
          }
        ]
      },

      {
        id:"community",
        icon:"♥",
        title:"Local Community",
        description:"Local posts and useful information for pet owners.",
        items:[
          {
            q:"What is Local Community?",
            a:"Local Community is separate from Pet-Friendly Places. It is for local posts, updates and useful information shared with pet owners around a location."
          },
          {
            q:"Is Local Community the same as Pet-Friendly Places?",
            a:"No. A venue belongs in Pet-Friendly Places. A local post, update or community message belongs in Local Community."
          }
        ]
      },

      {
        id:"marketplace",
        icon:"▢",
        title:"Marketplace",
        description:"Buying, selling and Marketplace member benefits.",
        items:[
          {
            q:"What is Marketplace?",
            a:"Marketplace is the PETS & DOGUE area for relevant pet-related listings and offers."
          },
          {
            q:"What Marketplace benefit do subscribers receive?",
            a:"Subscribers can post up to 50 free Marketplace ads."
          }
        ]
      },

      {
        id:"membership",
        icon:"★",
        title:"Membership & benefits",
        description:"Subscription, discounts and member features.",
        items:[
          {
            q:"What do I get by subscribing?",
            a:"Members receive access to PETS & DOGUE discounts and special offers and can post up to 50 free Marketplace ads."
          },
          {
            q:"Can I use PETS & DOGUE without subscribing?",
            a:"Yes. General platform content and features remain available to visitors."
          },
          {
            q:"Where do I sign in?",
            a:"Use Profile or open Contents and choose Sign In. New users can choose Subscribe."
          }
        ]
      },

      {
        id:"content",
        icon:"◉",
        title:"Stories, photos & participation",
        description:"Edition, Cover Star, Articles, Photos, Fashion and Contests.",
        items:[
          {
            q:"Where can I find PETS & DOGUE stories?",
            a:"Use Edition and Articles for editorial stories and guides. Fashion and Health contain specialist content, while Photos focuses on visual features."
          },
          {
            q:"What is Cover Star?",
            a:"Cover Star highlights pets appearing as special stars of PETS & DOGUE."
          },
          {
            q:"Where do I find contests?",
            a:"Open Contests from PETS & DOGUE navigation or the Contents menu."
          }
        ]
      },

      {
        id:"accessibility",
        icon:"🔊",
        title:"Accessibility & audio",
        description:"How PETS & DOGUE reads content aloud.",
        items:[
          {
            q:"How do I make PETS & DOGUE read text aloud?",
            a:"Use the speaker control on supported PETS & DOGUE pages."
          },
          {
            q:"How do I stop Miso speaking?",
            a:"Tap the speaker button in Help. Tap it again to start reading the current Help information aloud."
          }
        ]
      },

      {
        id:"business",
        icon:"◆",
        title:"For businesses & advertisers",
        description:"Working with PETS & DOGUE.",
        items:[
          {
            q:"Can a business advertise with PETS & DOGUE?",
            a:"Yes. Open Advertise with us for information about opportunities for brands and businesses."
          },
          {
            q:"Why PETS & DOGUE?",
            a:"PETS & DOGUE brings editorial content, practical pet services, local discovery, community, Marketplace, participation and member benefits together in one ecosystem."
          }
        ]
      }

    ],


    ru:[

      {
        id:"start",
        icon:"✦",
        title:"Начало работы",
        description:"Что такое PETS & DOGUE и как пользоваться платформой.",
        items:[
          {
            q:"Что такое PETS & DOGUE?",
            a:"PETS & DOGUE — цифровая lifestyle-платформа для питомцев и людей, которые их любят. Здесь собраны истории, полезные материалы, pet-friendly места, здоровье, мода, фотографии, сообщество, конкурсы, помощь животным, Marketplace и полезные сервисы."
          },
          {
            q:"Нужен ли аккаунт?",
            a:"Нет. Основной контент и функции доступны без входа. Подписка даёт скидки, специальные предложения и возможность разместить до 50 бесплатных объявлений в Marketplace."
          },
          {
            q:"Что означают три полоски сверху?",
            a:"Они открывают меню Contents. Через него можно переходить между разделами, менять язык, входить в профиль и оформлять подписку."
          }
        ]
      },

      {
        id:"language",
        icon:"文",
        title:"Язык",
        description:"Как изменить язык платформы.",
        items:[
          {
            q:"Как поменять язык?",
            a:"Откройте меню Contents кнопкой с тремя полосками. В разделе Language выберите нужный язык. PETS & DOGUE запомнит выбор."
          },
          {
            q:"Поддерживается ли арабский?",
            a:"Да. При выборе арабского поддерживаемые страницы переключаются на направление справа налево."
          }
        ]
      },

      {
        id:"petfriendly",
        icon:"🐾",
        title:"Pet-Friendly Places",
        description:"Поиск мест, карта, сохранение и правила для животных.",
        items:[
          {
            q:"Как работает Pet-Friendly Places?",
            a:"Разрешите определение местоположения или введите город, индекс или район. Выберите категорию и радиус поиска. Места появятся карточками и на карте."
          },
          {
            q:"Как добавить pet-friendly место?",
            a:"Откройте Pet-Friendly Places и выберите Add place. Добавьте информацию о конкретном заведении."
          },
          {
            q:"Как сохранить место?",
            a:"Нажмите сердечко на карточке. Позже место можно найти в Saved."
          },
          {
            q:"Как построить маршрут?",
            a:"Нажмите Route и выберите Google Maps, Waze или Apple Maps."
          }
        ]
      },

      {
        id:"community",
        icon:"♥",
        title:"Local Community",
        description:"Локальные публикации и информация сообщества.",
        items:[
          {
            q:"Что такое Local Community?",
            a:"Local Community — отдельный от Pet-Friendly Places раздел для локальных публикаций, обновлений и полезной информации."
          },
          {
            q:"Это то же самое, что Pet-Friendly Places?",
            a:"Нет. Заведения находятся в Pet-Friendly Places. Локальные публикации и сообщения находятся в Local Community."
          }
        ]
      },

      {
        id:"marketplace",
        icon:"▢",
        title:"Marketplace",
        description:"Объявления и преимущества подписчиков.",
        items:[
          {
            q:"Что такое Marketplace?",
            a:"Marketplace — раздел PETS & DOGUE для объявлений и предложений, связанных с питомцами."
          },
          {
            q:"Что получает подписчик?",
            a:"Подписчик может разместить до 50 бесплатных объявлений в Marketplace."
          }
        ]
      },

      {
        id:"membership",
        icon:"★",
        title:"Подписка и преимущества",
        description:"Преимущества подписчиков PETS & DOGUE.",
        items:[
          {
            q:"Что даёт подписка?",
            a:"Подписчики получают скидки и специальные предложения PETS & DOGUE и могут разместить до 50 бесплатных объявлений в Marketplace."
          },
          {
            q:"Можно ли пользоваться без подписки?",
            a:"Да. Основной контент и функции доступны посетителям без подписки."
          },
          {
            q:"Где войти?",
            a:"Используйте Profile или откройте Contents и выберите Sign In. Новый пользователь может выбрать Subscribe."
          }
        ]
      },

      {
        id:"content",
        icon:"◉",
        title:"Материалы и участие",
        description:"Edition, Cover Star, Articles, Photos, Fashion и Contests.",
        items:[
          {
            q:"Где читать материалы?",
            a:"Edition и Articles содержат редакционные истории и полезные материалы. Fashion, Health и Photos содержат соответствующий тематический контент."
          },
          {
            q:"Что такое Cover Star?",
            a:"Cover Star — раздел с питомцами, которые становятся яркими героями PETS & DOGUE."
          },
          {
            q:"Где конкурсы?",
            a:"Откройте Contests через навигацию PETS & DOGUE или меню Contents."
          }
        ]
      },

      {
        id:"accessibility",
        icon:"🔊",
        title:"Озвучка и доступность",
        description:"Как слушать информацию PETS & DOGUE.",
        items:[
          {
            q:"Как включить чтение вслух?",
            a:"Используйте значок громкоговорителя на поддерживаемых страницах."
          },
          {
            q:"Как остановить Мисо?",
            a:"Нажмите громкоговоритель в окне Help. Повторное нажатие снова включает чтение."
          }
        ]
      },

      {
        id:"business",
        icon:"◆",
        title:"Для бизнеса и рекламодателей",
        description:"Сотрудничество с PETS & DOGUE.",
        items:[
          {
            q:"Можно ли рекламировать бизнес?",
            a:"Да. Откройте Advertise with us для информации о возможностях сотрудничества."
          }
        ]
      }

    ]

  };


  function contentFor(language){

    if(CONTENT[language]){
      return CONTENT[language];
    }

    return CONTENT.en;

  }


  function ui(language,key){

    return (
      UI[language]?.[key] ||
      UI.en[key] ||
      key
    );

  }


  /* =======================================================
     STYLES
  ======================================================= */

  function installStyles(){

    if(
      document.getElementById(
        "petsDogueHelpStyles"
      )
    ){
      return;
    }

    const style =
      document.createElement(
        "style"
      );

    style.id =
      "petsDogueHelpStyles";

    style.textContent = `

      #pdHelpButton{
        position:fixed;
        right:18px;
        bottom:calc(20px + env(safe-area-inset-bottom));
        z-index:2147483000;
        width:72px;
        height:72px;
        padding:0;
        overflow:hidden;
        border:3px solid #111;
        border-radius:50%;
        background:#fff;
        box-shadow:0 10px 30px rgba(0,0,0,.24);
        touch-action:none;
        user-select:none;
        -webkit-user-select:none;
        cursor:grab;
      }

      #pdHelpButton:active{
        cursor:grabbing;
      }

      #pdHelpButton img{
        display:block;
        width:100%;
        height:100%;
        object-fit:cover;
        pointer-events:none;
      }

      #pdHelpButton::after{
        content:"?";
        position:absolute;
        right:0;
        bottom:0;
        width:23px;
        height:23px;
        display:grid;
        place-items:center;
        border:2px solid #111;
        border-radius:50%;
        background:#54ef0b;
        color:#071007;
        font:900 14px/1 Arial,sans-serif;
      }

      #pdHelpBackdrop{
        position:fixed;
        inset:0;
        z-index:2147483001;
        display:none;
        background:rgba(0,0,0,.54);
        backdrop-filter:blur(3px);
      }

      #pdHelpBackdrop.pd-help-open{
        display:block;
      }

      #pdHelpPanel{
        position:fixed;
        z-index:2147483002;
        right:14px;
        bottom:14px;
        width:min(470px,calc(100vw - 28px));
        height:min(760px,calc(100dvh - 28px));
        display:none;
        flex-direction:column;
        overflow:hidden;
        border:1px solid #111;
        border-radius:26px;
        background:#f4efe4;
        color:#111;
        box-shadow:0 30px 80px rgba(0,0,0,.34);
        font-family:Arial,Helvetica,sans-serif;
      }

      #pdHelpPanel.pd-help-open{
        display:flex;
      }

      #pdHelpPanel[dir="rtl"]{
        direction:rtl;
        text-align:right;
      }

      .pd-help-head{
        flex:0 0 auto;
        display:flex;
        align-items:center;
        gap:12px;
        padding:14px;
        background:#070707;
        color:#fff;
      }

      .pd-help-miso{
        flex:0 0 52px;
        width:52px;
        height:52px;
        overflow:hidden;
        border:2px solid #fff;
        border-radius:50%;
        background:#fff;
      }

      .pd-help-miso img{
        width:100%;
        height:100%;
        object-fit:cover;
      }

      .pd-help-head-copy{
        min-width:0;
        flex:1;
      }

      .pd-help-brand{
        margin:0 0 2px;
        color:#54ef0b;
        font-size:10px;
        font-weight:900;
        letter-spacing:1.4px;
        text-transform:uppercase;
      }

      .pd-help-head h2{
        margin:0;
        color:#fff;
        font:400 23px/1.05 Georgia,serif;
      }

      .pd-help-head-actions{
        display:flex;
        gap:7px;
      }

      .pd-help-round{
        flex:0 0 42px;
        width:42px;
        height:42px;
        display:grid;
        place-items:center;
        padding:0;
        border:1px solid rgba(255,255,255,.55);
        border-radius:50%;
        background:#fff;
        color:#111;
        font-size:19px;
        font-weight:900;
      }

      .pd-help-round.pd-speaking{
        background:#54ef0b;
      }

      .pd-help-body{
        min-height:0;
        flex:1;
        overflow:auto;
        overscroll-behavior:contain;
        padding:17px;
      }

      .pd-help-intro{
        margin:0 0 15px;
        color:#575148;
        font-size:14px;
        line-height:1.48;
      }

      .pd-help-search{
        position:relative;
        margin-bottom:18px;
      }

      .pd-help-search input{
        width:100%;
        height:52px;
        padding:0 46px 0 16px;
        border:1px solid #bdb6a8;
        border-radius:15px;
        outline:0;
        background:#fff;
        color:#111;
        font-size:15px;
      }

      #pdHelpPanel[dir="rtl"] .pd-help-search input{
        padding:0 16px 0 46px;
      }

      .pd-help-search-icon{
        position:absolute;
        top:50%;
        right:16px;
        transform:translateY(-50%);
        pointer-events:none;
        font-size:20px;
      }

      #pdHelpPanel[dir="rtl"] .pd-help-search-icon{
        right:auto;
        left:16px;
      }

      .pd-help-section-title{
        margin:0 0 10px;
        font-size:11px;
        font-weight:900;
        letter-spacing:1.1px;
        text-transform:uppercase;
      }

      .pd-help-topics{
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:10px;
      }

      .pd-help-topic{
        min-height:132px;
        padding:14px;
        border:1px solid #cfc7b8;
        border-radius:17px;
        background:#fff;
        text-align:left;
        color:#111;
      }

      #pdHelpPanel[dir="rtl"] .pd-help-topic{
        text-align:right;
      }

      .pd-help-topic:hover{
        border-color:#111;
      }

      .pd-help-topic-icon{
        width:37px;
        height:37px;
        display:grid;
        place-items:center;
        margin-bottom:10px;
        border-radius:50%;
        background:#54ef0b;
        font-size:18px;
        font-style:normal;
      }

      .pd-help-topic strong{
        display:block;
        margin-bottom:5px;
        font-size:14px;
        line-height:1.15;
      }

      .pd-help-topic small{
        display:block;
        color:#6e685f;
        font-size:11px;
        line-height:1.35;
      }

      .pd-help-back{
        min-height:40px;
        margin:0 0 12px;
        padding:0 14px;
        border:1px solid #111;
        border-radius:999px;
        background:#fff;
        color:#111;
        font-weight:900;
      }

      .pd-help-faq{
        overflow:hidden;
        margin-bottom:9px;
        border:1px solid #cfc7b8;
        border-radius:15px;
        background:#fff;
      }

      .pd-help-question{
        width:100%;
        min-height:58px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        padding:12px 14px;
        border:0;
        background:#fff;
        color:#111;
        text-align:left;
        font-weight:900;
        line-height:1.25;
      }

      #pdHelpPanel[dir="rtl"] .pd-help-question{
        text-align:right;
      }

      .pd-help-answer{
        display:none;
        padding:0 14px 15px;
        color:#575148;
        font-size:14px;
        line-height:1.5;
      }

      .pd-help-faq.pd-expanded .pd-help-answer{
        display:block;
      }

      .pd-help-empty{
        padding:35px 15px;
        border:1px solid #cfc7b8;
        border-radius:17px;
        background:#fff;
        color:#575148;
        text-align:center;
      }

      .pd-help-footer{
        flex:0 0 auto;
        padding:10px 14px calc(10px + env(safe-area-inset-bottom));
        border-top:1px solid #cfc7b8;
        background:#fff;
        color:#6e685f;
        text-align:center;
        font-size:10px;
        font-weight:800;
        letter-spacing:.5px;
      }

      @media(max-width:560px){

        #pdHelpButton{
          width:66px;
          height:66px;
          right:14px;
          bottom:calc(16px + env(safe-area-inset-bottom));
        }

        #pdHelpPanel{
          right:0;
          bottom:0;
          width:100vw;
          height:min(88dvh,820px);
          border-left:0;
          border-right:0;
          border-bottom:0;
          border-radius:24px 24px 0 0;
        }

        .pd-help-body{
          padding:14px;
        }

        .pd-help-topics{
          gap:8px;
        }

        .pd-help-topic{
          min-height:124px;
          padding:12px;
        }

      }

      @media(max-width:370px){

        .pd-help-topics{
          grid-template-columns:1fr;
        }

      }

      #pdHelpButton:focus-visible,
      #pdHelpPanel button:focus-visible,
      #pdHelpPanel input:focus-visible{
        outline:3px solid #54ef0b;
        outline-offset:3px;
      }

    `;

    document.head.appendChild(
      style
    );

  }


  /* =======================================================
     DOM
  ======================================================= */

  let button = null;
  let panel = null;
  let backdrop = null;
  let bodyBox = null;
  let searchInput = null;
  let speakerButton = null;

  let language =
    detectLanguage();

  let activeTopic =
    "";

  let speaking =
    false;


  function iconUrl(){

    return (
      window.PETS_DOGUE_HELP_ICON ||
      "/miso-help.png"
    );

  }


  function imageMarkup(){

    return `
      <img
        src="${iconUrl()}"
        alt="Miso"
        onerror="
          if(!this.dataset.fallback){
            this.dataset.fallback='1';
            this.src='${FALLBACK_MISO}';
          }
        "
      >
    `;

  }


  function buildDom(){

    if(
      document.getElementById(
        "pdHelpButton"
      )
    ){
      return;
    }

    installStyles();

    backdrop =
      document.createElement(
        "div"
      );

    backdrop.id =
      "pdHelpBackdrop";

    backdrop.setAttribute(
      "aria-hidden",
      "true"
    );

    panel =
      document.createElement(
        "section"
      );

    panel.id =
      "pdHelpPanel";

    panel.setAttribute(
      "role",
      "dialog"
    );

    panel.setAttribute(
      "aria-modal",
      "true"
    );

    button =
      document.createElement(
        "button"
      );

    button.id =
      "pdHelpButton";

    button.type =
      "button";

    button.innerHTML =
      imageMarkup();

    document.body.append(
      backdrop,
      panel,
      button
    );

    renderPanel();

    bindFloatingButton();

    backdrop.addEventListener(
      "click",
      closeHelp
    );

    window.addEventListener(
      "resize",
      keepButtonOnScreen
    );

  }


  /* =======================================================
     PANEL
  ======================================================= */

  function renderPanel(){

    if(!panel){
      return;
    }

    language =
      detectLanguage();

    const rtl =
      language === "ar";

    panel.dir =
      rtl
        ? "rtl"
        : "ltr";

    panel.setAttribute(
      "aria-label",
      ui(language,"help")
    );

    button?.setAttribute(
      "aria-label",
      ui(language,"help")
    );

    panel.innerHTML = `

      <header class="pd-help-head">

        <div class="pd-help-miso">
          ${imageMarkup()}
        </div>

        <div class="pd-help-head-copy">

          <div class="pd-help-brand">
            PETS &amp; DOGUE · ${escapeHtml(ui(language,"help"))}
          </div>

          <h2>
            ${escapeHtml(ui(language,"title"))}
          </h2>

        </div>

        <div class="pd-help-head-actions">

          <button
            id="pdHelpSpeaker"
            class="pd-help-round"
            type="button"
            aria-label="${escapeHtml(ui(language,"speak"))}"
          >
            🔊
          </button>

          <button
            id="pdHelpClose"
            class="pd-help-round"
            type="button"
            aria-label="${escapeHtml(ui(language,"close"))}"
          >
            ×
          </button>

        </div>

      </header>

      <div
        id="pdHelpBody"
        class="pd-help-body"
      >

        <p class="pd-help-intro">
          ${escapeHtml(ui(language,"intro"))}
        </p>

        <div class="pd-help-search">

          <input
            id="pdHelpSearch"
            type="search"
            autocomplete="off"
            aria-label="${escapeHtml(ui(language,"search"))}"
            placeholder="${escapeHtml(ui(language,"placeholder"))}"
          >

          <span class="pd-help-search-icon">
            ⌕
          </span>

        </div>

        <div id="pdHelpContent"></div>

      </div>

      <footer class="pd-help-footer">
        PETS &amp; DOGUE — One world. Every pet.
      </footer>

    `;

    bodyBox =
      panel.querySelector(
        "#pdHelpContent"
      );

    searchInput =
      panel.querySelector(
        "#pdHelpSearch"
      );

    speakerButton =
      panel.querySelector(
        "#pdHelpSpeaker"
      );

    panel
      .querySelector(
        "#pdHelpClose"
      )
      .addEventListener(
        "click",
        closeHelp
      );

    speakerButton
      .addEventListener(
        "click",
        toggleSpeech
      );

    searchInput
      .addEventListener(
        "input",
        function(){

          activeTopic = "";

          renderSearch(
            this.value
          );

        }
      );

    renderTopics();

  }


  /* =======================================================
     TOPICS
  ======================================================= */

  function renderTopics(){

    if(!bodyBox){
      return;
    }

    const content =
      contentFor(
        language
      );

    bodyBox.innerHTML = `

      <h3 class="pd-help-section-title">
        ${escapeHtml(ui(language,"topics"))}
      </h3>

      <div class="pd-help-topics">

        ${content.map(topic=>`

          <button
            class="pd-help-topic"
            type="button"
            data-help-topic="${escapeHtml(topic.id)}"
          >

            <i class="pd-help-topic-icon">
              ${topic.icon}
            </i>

            <strong>
              ${escapeHtml(topic.title)}
            </strong>

            <small>
              ${escapeHtml(topic.description)}
            </small>

          </button>

        `).join("")}

      </div>

    `;

    bodyBox
      .querySelectorAll(
        "[data-help-topic]"
      )
      .forEach(topicButton=>{

        topicButton.addEventListener(
          "click",
          ()=>{

            openTopic(
              topicButton.dataset.helpTopic
            );

          }
        );

      });

  }


  function openTopic(id){

    activeTopic =
      id;

    const topic =
      contentFor(language)
        .find(
          item =>
            item.id === id
        );

    if(!topic){
      return;
    }

    bodyBox.innerHTML = `

      <button
        id="pdHelpBack"
        class="pd-help-back"
        type="button"
      >
        ← ${escapeHtml(ui(language,"back"))}
      </button>

      <h3 class="pd-help-section-title">
        ${topic.icon}
        ${escapeHtml(topic.title)}
      </h3>

      ${topic.items.map((item,index)=>
        faqMarkup(
          item,
          index === 0
        )
      ).join("")}

    `;

    bodyBox
      .querySelector(
        "#pdHelpBack"
      )
      .addEventListener(
        "click",
        ()=>{

          activeTopic = "";

          renderTopics();

        }
      );

    bindFaqs();

    bodyBox
      .closest(
        ".pd-help-body"
      )
      ?.scrollTo({
        top:0,
        behavior:"smooth"
      });

  }


  /* =======================================================
     SEARCH
  ======================================================= */

  function normalizeSearch(value){

    return String(
      value || ""
    )
      .toLocaleLowerCase()
      .normalize("NFKD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .trim();

  }


  function allAnswers(){

    const output = [];

    contentFor(language)
      .forEach(topic=>{

        topic.items
          .forEach(item=>{

            output.push({
              ...item,
              topic:topic.title,
              icon:topic.icon
            });

          });

      });

    return output;

  }


  function renderSearch(query){

    const cleanQuery =
      normalizeSearch(
        query
      );

    if(
      cleanQuery.length < 2
    ){

      renderTopics();
      return;

    }

    const words =
      cleanQuery
        .split(/\s+/)
        .filter(Boolean);

    const matches =
      allAnswers()
        .map(item=>{

          const haystack =
            normalizeSearch(
              [
                item.topic,
                item.q,
                item.a
              ].join(" ")
            );

          const score =
            words.reduce(
              (total,word)=>
                total +
                (
                  haystack.includes(word)
                    ? 1
                    : 0
                ),
              0
            );

          return {
            ...item,
            score
          };

        })
        .filter(
          item =>
            item.score > 0
        )
        .sort(
          (a,b)=>
            b.score -
            a.score
        );

    if(!matches.length){

      bodyBox.innerHTML = `

        <h3 class="pd-help-section-title">
          ${escapeHtml(ui(language,"results"))}
        </h3>

        <div class="pd-help-empty">
          ${escapeHtml(ui(language,"noResults"))}
        </div>

      `;

      return;

    }

    bodyBox.innerHTML = `

      <h3 class="pd-help-section-title">
        ${escapeHtml(ui(language,"results"))}
      </h3>

      ${matches
        .slice(0,20)
        .map(
          (item,index)=>
            faqMarkup(
              item,
              index === 0
            )
        )
        .join("")
      }

    `;

    bindFaqs();

  }


  /* =======================================================
     FAQ
  ======================================================= */

  function faqMarkup(
    item,
    expanded = false
  ){

    return `

      <article
        class="pd-help-faq ${expanded ? "pd-expanded" : ""}"
      >

        <button
          class="pd-help-question"
          type="button"
          aria-expanded="${expanded ? "true" : "false"}"
        >

          <span>
            ${escapeHtml(item.q)}
          </span>

          <span>
            ${expanded ? "−" : "+"}
          </span>

        </button>

        <div class="pd-help-answer">
          ${escapeHtml(item.a)}
        </div>

      </article>

    `;

  }


  function bindFaqs(){

    bodyBox
      .querySelectorAll(
        ".pd-help-question"
      )
      .forEach(question=>{

        question.addEventListener(
          "click",
          ()=>{

            const faq =
              question.closest(
                ".pd-help-faq"
              );

            const expanded =
              faq.classList.toggle(
                "pd-expanded"
              );

            question.setAttribute(
              "aria-expanded",
              String(expanded)
            );

            question
              .querySelector(
                "span:last-child"
              )
              .textContent =
                expanded
                  ? "−"
                  : "+";

          }
        );

      });

  }


  /* =======================================================
     SPEECH
  ======================================================= */

  function speechLanguage(){

    const map = {
      en:"en-GB",
      uk:"uk-UA",
      ru:"ru-RU",
      fr:"fr-FR",
      de:"de-DE",
      es:"es-ES",
      it:"it-IT",
      pt:"pt-PT",
      nl:"nl-NL",
      pl:"pl-PL",
      cs:"cs-CZ",
      sk:"sk-SK",
      hu:"hu-HU",
      ro:"ro-RO",
      bg:"bg-BG",
      el:"el-GR",
      sv:"sv-SE",
      da:"da-DK",
      no:"nb-NO",
      fi:"fi-FI",
      tr:"tr-TR",
      ar:"ar-SA",
      hi:"hi-IN"
    };

    return (
      map[language] ||
      language
    );

  }


  function textToSpeak(){

    if(!panel){
      return "";
    }

    const visibleText =
      panel
        .querySelector(
          "#pdHelpBody"
        )
        ?.innerText ||
        "";

    return [
      ui(language,"title"),
      visibleText
    ]
      .filter(Boolean)
      .join(". ");

  }


  function stopSpeech(){

    if(
      "speechSynthesis" in window
    ){

      window.speechSynthesis.cancel();

    }

    speaking = false;

    updateSpeaker();

  }


  function startSpeech(){

    if(
      !(
        "speechSynthesis" in window
      )
    ){
      return;
    }

    const text =
      textToSpeak();

    if(!text){
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.lang =
      speechLanguage();

    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart =
      ()=>{

        speaking = true;
        updateSpeaker();

      };

    utterance.onend =
      ()=>{

        speaking = false;
        updateSpeaker();

      };

    utterance.onerror =
      ()=>{

        speaking = false;
        updateSpeaker();

      };

    window.speechSynthesis.speak(
      utterance
    );

  }


  function toggleSpeech(){

    if(speaking){
      stopSpeech();
    }else{
      startSpeech();
    }

  }


  function updateSpeaker(){

    if(!speakerButton){
      return;
    }

    speakerButton.classList.toggle(
      "pd-speaking",
      speaking
    );

    speakerButton.textContent =
      speaking
        ? "🔇"
        : "🔊";

    const label =
      speaking
        ? ui(language,"stop")
        : ui(language,"speak");

    speakerButton.setAttribute(
      "aria-label",
      label
    );

    speakerButton.title =
      label;

  }


  /* =======================================================
     OPEN / CLOSE

     IMPORTANT:
     Every new opening ALWAYS starts from the main
     Help Topics screen.
  ======================================================= */

  function openHelp(){

    language =
      detectLanguage();

    activeTopic = "";

    stopSpeech();

    renderPanel();

    if(searchInput){
      searchInput.value = "";
    }

    renderTopics();

    const helpBody =
      panel?.querySelector(
        ".pd-help-body"
      );

    if(helpBody){
      helpBody.scrollTop = 0;
    }

    panel.classList.add(
      "pd-help-open"
    );

    backdrop.classList.add(
      "pd-help-open"
    );

    button.style.visibility =
      "hidden";

    document.body.style.overflow =
      "hidden";

    setTimeout(
      ()=>{

        searchInput?.focus({
          preventScroll:true
        });

      },
      80
    );

    setTimeout(
      startSpeech,
      220
    );

  }


  function closeHelp(){

    stopSpeech();

    activeTopic = "";

    panel?.classList.remove(
      "pd-help-open"
    );

    backdrop?.classList.remove(
      "pd-help-open"
    );

    if(button){

      button.style.visibility =
        "visible";

    }

    document.body.style.overflow =
      "";

  }


  /* =======================================================
     DRAGGABLE FLOATING MISO
  ======================================================= */

  function savedPosition(){

    try{

      return JSON.parse(
        localStorage.getItem(
          POSITION_KEY
        ) || "null"
      );

    }catch{

      return null;

    }

  }


  function savePosition(
    left,
    top
  ){

    try{

      localStorage.setItem(
        POSITION_KEY,
        JSON.stringify({
          left,
          top
        })
      );

    }catch{}

  }


  function restorePosition(){

    if(!button){
      return;
    }

    const saved =
      savedPosition();

    if(
      !saved ||
      !Number.isFinite(saved.left) ||
      !Number.isFinite(saved.top)
    ){
      return;
    }

    button.style.left =
      `${saved.left}px`;

    button.style.top =
      `${saved.top}px`;

    button.style.right =
      "auto";

    button.style.bottom =
      "auto";

    keepButtonOnScreen();

  }


  function keepButtonOnScreen(){

    if(!button){
      return;
    }

    const rect =
      button.getBoundingClientRect();

    const padding = 8;

    const maxLeft =
      Math.max(
        padding,
        window.innerWidth -
        rect.width -
        padding
      );

    const maxTop =
      Math.max(
        padding,
        window.innerHeight -
        rect.height -
        padding
      );

    const left =
      Math.min(
        Math.max(
          rect.left,
          padding
        ),
        maxLeft
      );

    const top =
      Math.min(
        Math.max(
          rect.top,
          padding
        ),
        maxTop
      );

    button.style.left =
      `${left}px`;

    button.style.top =
      `${top}px`;

    button.style.right =
      "auto";

    button.style.bottom =
      "auto";

  }


  function bindFloatingButton(){

    let dragging = false;
    let moved = false;

    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    button.addEventListener(
      "pointerdown",
      event=>{

        if(
          event.button !== undefined &&
          event.button !== 0
        ){
          return;
        }

        const rect =
          button.getBoundingClientRect();

        dragging = true;
        moved = false;

        startX =
          event.clientX;

        startY =
          event.clientY;

        startLeft =
          rect.left;

        startTop =
          rect.top;

        button.setPointerCapture?.(
          event.pointerId
        );

      }
    );


    button.addEventListener(
      "pointermove",
      event=>{

        if(!dragging){
          return;
        }

        const dx =
          event.clientX -
          startX;

        const dy =
          event.clientY -
          startY;

        if(
          Math.abs(dx) > 5 ||
          Math.abs(dy) > 5
        ){
          moved = true;
        }

        if(!moved){
          return;
        }

        event.preventDefault();

        const width =
          button.offsetWidth;

        const height =
          button.offsetHeight;

        const padding = 8;

        const left =
          Math.min(
            Math.max(
              startLeft + dx,
              padding
            ),
            window.innerWidth -
            width -
            padding
          );

        const top =
          Math.min(
            Math.max(
              startTop + dy,
              padding
            ),
            window.innerHeight -
            height -
            padding
          );

        button.style.left =
          `${left}px`;

        button.style.top =
          `${top}px`;

        button.style.right =
          "auto";

        button.style.bottom =
          "auto";

      }
    );


    button.addEventListener(
      "pointerup",
      event=>{

        if(!dragging){
          return;
        }

        dragging = false;

        button.releasePointerCapture?.(
          event.pointerId
        );

        if(moved){

          const rect =
            button.getBoundingClientRect();

          savePosition(
            rect.left,
            rect.top
          );

          return;

        }

        openHelp();

      }
    );


    button.addEventListener(
      "pointercancel",
      ()=>{

        dragging = false;

      }
    );


    button.addEventListener(
      "keydown",
      event=>{

        if(
          event.key === "Enter" ||
          event.key === " "
        ){

          event.preventDefault();

          openHelp();

        }

      }
    );

    restorePosition();

  }


  /* =======================================================
     HELPERS
  ======================================================= */

  function escapeHtml(value){

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


  /* =======================================================
     LANGUAGE EVENTS
  ======================================================= */

  window.addEventListener(
    "petsdogue:languagechange",
    ()=>{

      const wasOpen =
        panel?.classList.contains(
          "pd-help-open"
        );

      stopSpeech();

      language =
        detectLanguage();

      activeTopic = "";

      renderPanel();

      if(wasOpen){

        panel.classList.add(
          "pd-help-open"
        );

        renderTopics();

        setTimeout(
          startSpeech,
          180
        );

      }

    }
  );


  window.addEventListener(
    "storage",
    event=>{

      if(
        event.key !==
        LANGUAGE_KEY
      ){
        return;
      }

      const wasOpen =
        panel?.classList.contains(
          "pd-help-open"
        );

      stopSpeech();

      language =
        detectLanguage();

      activeTopic = "";

      renderPanel();

      if(wasOpen){

        panel.classList.add(
          "pd-help-open"
        );

        renderTopics();

      }

    }
  );


  /* =======================================================
     ESCAPE
  ======================================================= */

  document.addEventListener(
    "keydown",
    event=>{

      if(
        event.key === "Escape" &&
        panel?.classList.contains(
          "pd-help-open"
        )
      ){

        closeHelp();

      }

    }
  );


  /* =======================================================
     PUBLIC API
  ======================================================= */

  window.PetsDogueHelp = {

    open:
      openHelp,

    close:
      closeHelp,

    speak:
      startSpeech,

    stop:
      stopSpeech

  };


  /* =======================================================
     INIT
  ======================================================= */

  function init(){

    buildDom();

    restorePosition();

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
