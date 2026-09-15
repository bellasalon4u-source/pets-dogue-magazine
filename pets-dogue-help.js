"use strict";

/* =========================================================
   PETS & DOGUE
   GLOBAL MISO HELP / FAQ

   IMPORTANT:
   1. Clicking Miso ALWAYS opens the MAIN HELP TOPICS screen.
   2. Topic -> questions -> answer.
   3. Closing and reopening NEVER restores an old topic.
   4. Search always starts from all FAQ content.
   5. Multilingual + Arabic RTL.
   6. Text-to-speech preserved.
   7. Floating Miso remains draggable.
   8. Miso image: /miso-help.png
========================================================= */

(function () {

  const LANGUAGE_KEY = "pets_dogue_language";
  const POSITION_KEY = "pets_dogue_help_position_v1";

  const aliases = {
    ua: "uk",
    cz: "cs",
    gr: "el",
    se: "sv",
    dk: "da"
  };

  const supported = [
    "en", "uk", "ru", "fr", "de", "es", "it", "pt", "nl", "pl",
    "cs", "sk", "hu", "ro", "bg", "el", "sv", "da", "no", "fi",
    "tr", "ar", "hi"
  ];

  /* =======================================================
     FALLBACK MISO
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
      </svg>
    `);

  /* =======================================================
     LANGUAGE
  ======================================================= */

  function detectLanguage() {

    let value = "";

    try {
      value = localStorage.getItem(LANGUAGE_KEY) || "";
    } catch (error) {}

    value = String(value)
      .toLowerCase()
      .replace("_", "-")
      .split("-")[0];

    value = aliases[value] || value;

    return supported.includes(value)
      ? value
      : "en";
  }

  /* =======================================================
     UI TRANSLATIONS
  ======================================================= */

  const UI = {

    en: {
      help: "Help",
      title: "How can Miso help?",
      intro: "Quick answers about PETS & DOGUE are collected here. Choose a section below or type your question in search.",
      search: "Search Help",
      placeholder: "What would you like to know?",
      topics: "Help topics",
      results: "Search results",
      noResults: "No matching answers found. Try different words.",
      close: "Close Help",
      speak: "Read aloud",
      stop: "Stop reading",
      backTopics: "Back to all topics",
      backQuestions: "Back to questions"
    },

    uk: {
      help: "Допомога",
      title: "Як Місо може допомогти?",
      intro: "Тут зібрані швидкі відповіді про PETS & DOGUE. Оберіть потрібний розділ нижче або введіть своє запитання в пошуку.",
      search: "Пошук у довідці",
      placeholder: "Що ви хочете дізнатися?",
      topics: "Розділи допомоги",
      results: "Результати пошуку",
      noResults: "Відповідей не знайдено. Спробуйте інші слова.",
      close: "Закрити допомогу",
      speak: "Озвучити",
      stop: "Зупинити озвучення",
      backTopics: "До всіх розділів",
      backQuestions: "До запитань"
    },

    ru: {
      help: "Помощь",
      title: "Чем Мисо может помочь?",
      intro: "Здесь собраны быстрые ответы о PETS & DOGUE. Выберите нужный раздел ниже или напишите свой вопрос в поиске.",
      search: "Поиск по помощи",
      placeholder: "Что вы хотите узнать?",
      topics: "Разделы помощи",
      results: "Результаты поиска",
      noResults: "Подходящих ответов не найдено. Попробуйте другие слова.",
      close: "Закрыть помощь",
      speak: "Озвучить",
      stop: "Остановить озвучку",
      backTopics: "Ко всем разделам",
      backQuestions: "К вопросам"
    },

    fr: {
      help: "Aide",
      title: "Comment Miso peut-elle vous aider ?",
      intro: "Retrouvez ici des réponses rapides sur PETS & DOGUE. Choisissez une rubrique ou saisissez votre question.",
      search: "Rechercher dans l'aide",
      placeholder: "Que souhaitez-vous savoir ?",
      topics: "Rubriques d'aide",
      results: "Résultats",
      noResults: "Aucune réponse correspondante.",
      close: "Fermer l'aide",
      speak: "Lire à voix haute",
      stop: "Arrêter la lecture",
      backTopics: "Toutes les rubriques",
      backQuestions: "Retour aux questions"
    },

    de: {
      help: "Hilfe",
      title: "Wie kann Miso helfen?",
      intro: "Hier findest du schnelle Antworten zu PETS & DOGUE. Wähle einen Bereich oder gib deine Frage ein.",
      search: "Hilfe durchsuchen",
      placeholder: "Was möchtest du wissen?",
      topics: "Hilfethemen",
      results: "Suchergebnisse",
      noResults: "Keine passende Antwort gefunden.",
      close: "Hilfe schließen",
      speak: "Vorlesen",
      stop: "Vorlesen stoppen",
      backTopics: "Alle Themen",
      backQuestions: "Zurück zu den Fragen"
    },

    es: {
      help: "Ayuda",
      title: "¿Cómo puede ayudarte Miso?",
      intro: "Aquí encontrarás respuestas rápidas sobre PETS & DOGUE. Elige una sección o escribe tu pregunta.",
      search: "Buscar ayuda",
      placeholder: "¿Qué quieres saber?",
      topics: "Temas de ayuda",
      results: "Resultados",
      noResults: "No se encontraron respuestas.",
      close: "Cerrar ayuda",
      speak: "Leer en voz alta",
      stop: "Detener lectura",
      backTopics: "Todos los temas",
      backQuestions: "Volver a las preguntas"
    },

    ar: {
      help: "المساعدة",
      title: "كيف يمكن لميسو مساعدتك؟",
      intro: "ستجد هنا إجابات سريعة حول PETS & DOGUE. اختر قسماً أو اكتب سؤالك في البحث.",
      search: "البحث في المساعدة",
      placeholder: "ماذا تريد أن تعرف؟",
      topics: "مواضيع المساعدة",
      results: "نتائج البحث",
      noResults: "لم يتم العثور على إجابات مطابقة.",
      close: "إغلاق المساعدة",
      speak: "قراءة بصوت عالٍ",
      stop: "إيقاف القراءة",
      backTopics: "كل المواضيع",
      backQuestions: "العودة إلى الأسئلة"
    }

  };

  const languageFallbacks = {

    it: {
      help: "Aiuto",
      title: "Come può aiutarti Miso?"
    },

    pt: {
      help: "Ajuda",
      title: "Como a Miso pode ajudar?"
    },

    nl: {
      help: "Help",
      title: "Hoe kan Miso helpen?"
    },

    pl: {
      help: "Pomoc",
      title: "Jak Miso może pomóc?"
    },

    cs: {
      help: "Nápověda",
      title: "Jak může Miso pomoci?"
    },

    sk: {
      help: "Pomoc",
      title: "Ako môže Miso pomôcť?"
    },

    hu: {
      help: "Súgó",
      title: "Hogyan segíthet Miso?"
    },

    ro: {
      help: "Ajutor",
      title: "Cum vă poate ajuta Miso?"
    },

    bg: {
      help: "Помощ",
      title: "Как може Мисо да помогне?"
    },

    el: {
      help: "Βοήθεια",
      title: "Πώς μπορεί να βοηθήσει η Miso;"
    },

    sv: {
      help: "Hjälp",
      title: "Hur kan Miso hjälpa?"
    },

    da: {
      help: "Hjælp",
      title: "Hvordan kan Miso hjælpe?"
    },

    no: {
      help: "Hjelp",
      title: "Hvordan kan Miso hjelpe?"
    },

    fi: {
      help: "Ohje",
      title: "Miten Miso voi auttaa?"
    },

    tr: {
      help: "Yardım",
      title: "Miso nasıl yardımcı olabilir?"
    },

    hi: {
      help: "सहायता",
      title: "Miso कैसे मदद कर सकती है?"
    }

  };

  Object.entries(languageFallbacks).forEach(([language, values]) => {

    UI[language] = {
      ...UI.en,
      ...values
    };

  });

  /* =======================================================
     HELP CONTENT
  ======================================================= */

  const CONTENT = {

    en: [

      {
        id: "start",
        icon: "✦",
        title: "Getting started",
        description: "What PETS & DOGUE is and how to use the platform.",
        items: [
          {
            q: "What is PETS & DOGUE?",
            a: "PETS & DOGUE is a digital lifestyle platform for pets and the people who love them — bringing together original stories, practical guides, pet-friendly places, health, fashion, photography, community, contests, rescue, Marketplace, member benefits and useful services in one place."
          },
          {
            q: "Do I need an account to use PETS & DOGUE?",
            a: "No. PETS & DOGUE content and general features are available to visitors without signing in. Subscription gives access to discounts and special offers and lets members post up to 50 free Marketplace ads."
          },
          {
            q: "What do the three lines at the top mean?",
            a: "The three-line button opens Contents. From there you can move between PETS & DOGUE sections, change language, sign in or subscribe."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Language",
        description: "Change the platform language and keep your selection.",
        items: [
          {
            q: "How do I change the language?",
            a: "Open the Contents menu using the three-line button. Choose Language and select your language. PETS & DOGUE remembers your selection."
          },
          {
            q: "Does PETS & DOGUE support Arabic?",
            a: "Yes. Arabic uses a right-to-left layout on supported PETS & DOGUE pages."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Find places, use the map, save places and check pet rules.",
        items: [
          {
            q: "How do Pet-Friendly Places work?",
            a: "Open Pet-Friendly Places and allow location access or search for a city, postcode or area. Choose a category and search radius. Places appear as cards and map markers."
          },
          {
            q: "How do I add a pet-friendly place?",
            a: "Open Pet-Friendly Places and choose Add place. Add information about the exact venue."
          },
          {
            q: "How do I save a place?",
            a: "Tap the heart on the place card. You can find the place again in Saved."
          },
          {
            q: "How do I get directions?",
            a: "Tap Route on the place. You can continue with Google Maps, Waze or Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Local Community",
        description: "Local posts and useful information for pet owners.",
        items: [
          {
            q: "What is Local Community?",
            a: "Local Community is separate from Pet-Friendly Places. It is for local posts, updates and useful information shared with pet owners around a location."
          },
          {
            q: "Is Local Community the same as Pet-Friendly Places?",
            a: "No. A venue belongs in Pet-Friendly Places. A local post, update or community message belongs in Local Community."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Buying, selling and Marketplace member benefits.",
        items: [
          {
            q: "What is Marketplace?",
            a: "Marketplace is the PETS & DOGUE area for relevant pet-related listings and offers."
          },
          {
            q: "What Marketplace benefit do subscribers receive?",
            a: "Subscribers can post up to 50 free Marketplace ads."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Membership & benefits",
        description: "Subscription, discounts and member features.",
        items: [
          {
            q: "What do I get by subscribing?",
            a: "Members receive access to PETS & DOGUE discounts and special offers and can post up to 50 free Marketplace ads."
          },
          {
            q: "Can I use PETS & DOGUE without subscribing?",
            a: "Yes. General platform content and features remain available to visitors."
          },
          {
            q: "Where do I sign in?",
            a: "Use Profile or open Contents and choose Sign In. New users can choose Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Stories, photos & participation",
        description: "Edition, Cover Star, Articles, Photos, Fashion and Contests.",
        items: [
          {
            q: "Where can I find PETS & DOGUE stories?",
            a: "Use Edition and Articles for editorial stories and guides. Fashion and Health contain specialist content, while Photos focuses on visual features."
          },
          {
            q: "What is Cover Star?",
            a: "Cover Star highlights pets appearing as special stars of PETS & DOGUE."
          },
          {
            q: "Where do I find contests?",
            a: "Open Contests from PETS & DOGUE navigation or the Contents menu."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Accessibility & audio",
        description: "How PETS & DOGUE reads content aloud.",
        items: [
          {
            q: "How do I make PETS & DOGUE read text aloud?",
            a: "Use the speaker control on supported PETS & DOGUE pages."
          },
          {
            q: "How do I stop Miso speaking?",
            a: "Tap the speaker button in Help. Tap it again to start reading the current Help information aloud."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "For businesses & advertisers",
        description: "Advertising and working with PETS & DOGUE.",
        items: [
          {
            q: "Can a business advertise with PETS & DOGUE?",
            a: "Yes. Open Advertise with us for information about opportunities for brands and businesses."
          },
          {
            q: "Why work with PETS & DOGUE?",
            a: "PETS & DOGUE brings editorial content, practical pet services, local discovery, community, Marketplace, participation and member benefits together in one ecosystem."
          }
        ]
      }

    ],

    ru: [

      {
        id: "start",
        icon: "✦",
        title: "Начало работы",
        description: "Что такое PETS & DOGUE и как пользоваться платформой.",
        items: [
          {
            q: "Что такое PETS & DOGUE?",
            a: "PETS & DOGUE — цифровая lifestyle-платформа для питомцев и людей, которые их любят. Здесь собраны оригинальные истории, полезные материалы, pet-friendly места, здоровье, мода, фотографии, сообщество, конкурсы, помощь животным, Marketplace, преимущества для участников и полезные сервисы."
          },
          {
            q: "Нужен ли аккаунт?",
            a: "Нет. Основной контент и функции PETS & DOGUE доступны посетителям без входа. Подписка даёт доступ к скидкам и специальным предложениям и позволяет разместить до 50 бесплатных объявлений в Marketplace."
          },
          {
            q: "Что означают три полоски сверху?",
            a: "Они открывают меню Contents. Через него можно переходить между разделами, менять язык, входить в профиль и оформлять подписку."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Язык",
        description: "Как изменить язык платформы и сохранить выбор.",
        items: [
          {
            q: "Как поменять язык?",
            a: "Откройте меню Contents кнопкой с тремя полосками. В блоке Language выберите нужный язык. PETS & DOGUE запомнит ваш выбор."
          },
          {
            q: "Поддерживается ли арабский?",
            a: "Да. При выборе арабского поддерживаемые страницы используют направление текста справа налево."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Поиск мест, карта, сохранение и правила для животных.",
        items: [
          {
            q: "Как работает Pet-Friendly Places?",
            a: "Разрешите определение местоположения или введите город, индекс или район. Выберите категорию и радиус поиска. Места появятся в карточках и на карте."
          },
          {
            q: "Как добавить pet-friendly место?",
            a: "Откройте Pet-Friendly Places и выберите Add place. Добавьте информацию о конкретном заведении."
          },
          {
            q: "Как сохранить место?",
            a: "Нажмите сердечко на карточке места. Позже его можно снова найти в Saved."
          },
          {
            q: "Как построить маршрут?",
            a: "Нажмите Route на карточке места и выберите Google Maps, Waze или Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Local Community",
        description: "Локальные публикации и полезная информация сообщества.",
        items: [
          {
            q: "Что такое Local Community?",
            a: "Local Community — отдельный от Pet-Friendly Places раздел для локальных публикаций, обновлений и полезной информации для владельцев животных."
          },
          {
            q: "Это то же самое, что Pet-Friendly Places?",
            a: "Нет. Конкретные заведения относятся к Pet-Friendly Places. Локальные публикации, обновления и сообщения сообщества относятся к Local Community."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Объявления и преимущества подписчиков.",
        items: [
          {
            q: "Что такое Marketplace?",
            a: "Marketplace — раздел PETS & DOGUE для объявлений и предложений, связанных с питомцами."
          },
          {
            q: "Что получает подписчик в Marketplace?",
            a: "Подписчик может разместить до 50 бесплатных объявлений в Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Подписка и преимущества",
        description: "Скидки, предложения и функции для участников.",
        items: [
          {
            q: "Что даёт подписка?",
            a: "Подписчики получают доступ к скидкам и специальным предложениям PETS & DOGUE и могут разместить до 50 бесплатных объявлений в Marketplace."
          },
          {
            q: "Можно ли пользоваться PETS & DOGUE без подписки?",
            a: "Да. Основной контент и функции платформы доступны посетителям без подписки."
          },
          {
            q: "Где войти?",
            a: "Используйте Profile или откройте Contents и выберите Sign In. Новый пользователь может выбрать Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Материалы и участие",
        description: "Edition, Cover Star, Articles, Photos, Fashion и Contests.",
        items: [
          {
            q: "Где читать материалы PETS & DOGUE?",
            a: "Edition и Articles содержат редакционные истории и полезные материалы. Fashion, Health и Photos содержат соответствующий тематический контент."
          },
          {
            q: "Что такое Cover Star?",
            a: "Cover Star — раздел с питомцами, которые становятся специальными героями PETS & DOGUE."
          },
          {
            q: "Где найти конкурсы?",
            a: "Откройте Contests через навигацию PETS & DOGUE или меню Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Озвучка и доступность",
        description: "Как слушать информацию PETS & DOGUE.",
        items: [
          {
            q: "Как включить чтение вслух?",
            a: "Используйте значок громкоговорителя на поддерживаемых страницах PETS & DOGUE."
          },
          {
            q: "Как остановить озвучивание в помощи?",
            a: "Нажмите кнопку громкоговорителя в окне помощи. Повторное нажатие снова запускает чтение текущей информации."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Для бизнеса и рекламодателей",
        description: "Реклама и сотрудничество с PETS & DOGUE.",
        items: [
          {
            q: "Можно ли рекламировать бизнес в PETS & DOGUE?",
            a: "Да. Откройте Advertise with us, чтобы узнать о возможностях для брендов и бизнеса."
          },
          {
            q: "Зачем сотрудничать с PETS & DOGUE?",
            a: "PETS & DOGUE объединяет редакционный контент, полезные сервисы, поиск pet-friendly мест, сообщество, Marketplace, участие пользователей и преимущества подписчиков в одной экосистеме."
          }
        ]
      }

    ]

  };

  function contentFor(language) {

    return CONTENT[language] || CONTENT.en;

  }

  function ui(language, key) {

    return (
      UI[language]?.[key] ||
      UI.en[key] ||
      key
    );

  }

  /* =======================================================
     STYLES
  ======================================================= */

  function installStyles() {

    if (document.getElementById("petsDogueHelpStyles")) {
      return;
    }

    const style = document.createElement("style");

    style.id = "petsDogueHelpStyles";

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
        display:block;
        width:100%;
        height:100%;
        object-fit:cover;
      }

      .pd-help-head-copy{
        min-width:0;
        flex:1;
      }

      .pd-help-brand{
        margin:0 0 3px;
        color:#54ef0b;
        font-size:10px;
        font-weight:900;
        letter-spacing:1.4px;
        text-transform:uppercase;
      }

      .pd-help-head h2{
        margin:0;
        color:#fff;
        font:400 24px/1.05 Georgia,serif;
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
        cursor:pointer;
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
        margin:0 0 17px;
        color:#575148;
        font-size:14px;
        line-height:1.5;
      }

      .pd-help-search{
        position:relative;
        margin-bottom:20px;
      }

      .pd-help-search input{
        width:100%;
        height:54px;
        padding:0 48px 0 16px;
        border:1px solid #bdb6a8;
        border-radius:16px;
        outline:0;
        background:#fff;
        color:#111;
        font-size:15px;
      }

      .pd-help-search input:focus{
        border-color:#111;
        box-shadow:0 0 0 3px #54ef0b;
      }

      #pdHelpPanel[dir="rtl"] .pd-help-search input{
        padding:0 16px 0 48px;
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
        margin:0 0 11px;
        font-size:11px;
        font-weight:900;
        letter-spacing:1.25px;
        text-transform:uppercase;
      }

      .pd-help-topics{
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:10px;
      }

      .pd-help-topic{
        position:relative;
        min-height:142px;
        padding:14px 14px 30px;
        border:1px solid #cfc7b8;
        border-radius:18px;
        background:#fff;
        text-align:left;
        color:#111;
        cursor:pointer;
        transition:
          transform .18s ease,
          border-color .18s ease,
          box-shadow .18s ease;
      }

      #pdHelpPanel[dir="rtl"] .pd-help-topic{
        text-align:right;
      }

      .pd-help-topic:hover{
        border-color:#111;
        box-shadow:0 7px 20px rgba(0,0,0,.08);
        transform:translateY(-2px);
      }

      .pd-help-topic-icon{
        width:38px;
        height:38px;
        display:grid;
        place-items:center;
        margin-bottom:11px;
        border-radius:50%;
        background:#54ef0b;
        color:#111;
        font-size:18px;
        font-style:normal;
      }

      .pd-help-topic strong{
        display:block;
        margin-bottom:6px;
        font-size:14px;
        line-height:1.2;
      }

      .pd-help-topic small{
        display:block;
        color:#6e685f;
        font-size:11px;
        line-height:1.38;
      }

      .pd-help-topic-arrow{
        position:absolute;
        right:14px;
        bottom:10px;
        color:#9d978b;
        font-size:19px;
        line-height:1;
      }

      #pdHelpPanel[dir="rtl"] .pd-help-topic-arrow{
        right:auto;
        left:14px;
        transform:scaleX(-1);
      }

      .pd-help-back{
        min-height:40px;
        margin:0 0 13px;
        padding:0 14px;
        border:1px solid #111;
        border-radius:999px;
        background:#fff;
        color:#111;
        font-weight:900;
        cursor:pointer;
      }

      .pd-help-topic-heading{
        margin:2px 0 5px;
        font:400 27px/1.08 Georgia,serif;
      }

      .pd-help-topic-description{
        margin:0 0 16px;
        color:#6e685f;
        font-size:13px;
        line-height:1.45;
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
        min-height:61px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        padding:13px 14px;
        border:0;
        background:#fff;
        color:#111;
        text-align:left;
        font-weight:900;
        font-size:14px;
        line-height:1.3;
        cursor:pointer;
      }

      #pdHelpPanel[dir="rtl"] .pd-help-question{
        text-align:right;
      }

      .pd-help-question-symbol{
        flex:0 0 auto;
        font-size:19px;
      }

      .pd-help-answer{
        display:none;
        padding:0 14px 16px;
        color:#575148;
        font-size:14px;
        line-height:1.55;
      }

      .pd-help-faq.pd-expanded .pd-help-answer{
        display:block;
      }

      .pd-help-answer-view{
        padding:18px;
        border:1px solid #cfc7b8;
        border-radius:18px;
        background:#fff;
      }

      .pd-help-answer-label{
        margin:0 0 9px;
        color:#54c90e;
        font-size:10px;
        font-weight:900;
        letter-spacing:1.2px;
        text-transform:uppercase;
      }

      .pd-help-answer-view h3{
        margin:0 0 14px;
        font:400 25px/1.15 Georgia,serif;
      }

      .pd-help-answer-view p{
        margin:0;
        color:#575148;
        font-size:15px;
        line-height:1.6;
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

        .pd-help-head{
          padding:14px 16px;
        }

        .pd-help-body{
          padding:16px;
        }

        .pd-help-topics{
          gap:9px;
        }

        .pd-help-topic{
          min-height:139px;
          padding:13px 13px 29px;
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

    document.head.appendChild(style);
  }

  /* =======================================================
     DOM STATE
  ======================================================= */

  let button = null;
  let panel = null;
  let backdrop = null;
  let bodyBox = null;
  let searchInput = null;
  let speakerButton = null;

  let language = detectLanguage();

  let currentScreen = "topics";
  let activeTopic = "";
  let activeQuestion = -1;

  let speaking = false;

  /* =======================================================
     IMAGE
  ======================================================= */

  function iconUrl() {

    return (
      window.PETS_DOGUE_HELP_ICON ||
      "/miso-help.png"
    );

  }

  function imageMarkup() {

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

  /* =======================================================
     BUILD DOM
  ======================================================= */

  function buildDom() {

    const oldButton =
      document.getElementById("pdHelpButton");

    const oldBackdrop =
      document.getElementById("pdHelpBackdrop");

    const oldPanel =
      document.getElementById("pdHelpPanel");

    if (oldButton || oldBackdrop || oldPanel) {

      oldButton?.remove();
      oldBackdrop?.remove();
      oldPanel?.remove();

    }

    installStyles();

    backdrop = document.createElement("div");
    backdrop.id = "pdHelpBackdrop";
    backdrop.setAttribute("aria-hidden", "true");

    panel = document.createElement("section");
    panel.id = "pdHelpPanel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");

    button = document.createElement("button");
    button.id = "pdHelpButton";
    button.type = "button";
    button.innerHTML = imageMarkup();

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
     PANEL SHELL
  ======================================================= */

  function renderPanel() {

    if (!panel) {
      return;
    }

    language = detectLanguage();

    const rtl =
      language === "ar";

    panel.dir =
      rtl ? "rtl" : "ltr";

    panel.setAttribute(
      "aria-label",
      ui(language, "help")
    );

    button?.setAttribute(
      "aria-label",
      ui(language, "help")
    );

    panel.innerHTML = `

      <header class="pd-help-head">

        <div class="pd-help-miso">
          ${imageMarkup()}
        </div>

        <div class="pd-help-head-copy">

          <div class="pd-help-brand">
            PETS &amp; DOGUE · ${escapeHtml(ui(language, "help"))}
          </div>

          <h2>
            ${escapeHtml(ui(language, "title"))}
          </h2>

        </div>

        <div class="pd-help-head-actions">

          <button
            id="pdHelpSpeaker"
            class="pd-help-round"
            type="button"
            aria-label="${escapeHtml(ui(language, "speak"))}"
          >
            🔊
          </button>

          <button
            id="pdHelpClose"
            class="pd-help-round"
            type="button"
            aria-label="${escapeHtml(ui(language, "close"))}"
          >
            ×
          </button>

        </div>

      </header>

      <div
        id="pdHelpBodyScroll"
        class="pd-help-body"
      >

        <p class="pd-help-intro">
          ${escapeHtml(ui(language, "intro"))}
        </p>

        <div class="pd-help-search">

          <input
            id="pdHelpSearch"
            type="search"
            autocomplete="off"
            aria-label="${escapeHtml(ui(language, "search"))}"
            placeholder="${escapeHtml(ui(language, "placeholder"))}"
          >

          <span
            class="pd-help-search-icon"
            aria-hidden="true"
          >
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
      panel.querySelector("#pdHelpContent");

    searchInput =
      panel.querySelector("#pdHelpSearch");

    speakerButton =
      panel.querySelector("#pdHelpSpeaker");

    panel
      .querySelector("#pdHelpClose")
      .addEventListener(
        "click",
        closeHelp
      );

    speakerButton.addEventListener(
      "click",
      toggleSpeech
    );

    searchInput.addEventListener(
      "input",
      function () {

        currentScreen = "search";
        activeTopic = "";
        activeQuestion = -1;

        renderSearch(this.value);

      }
    );

    /*
      CRITICAL:
      Building/rebuilding the panel always renders the MAIN screen.
    */
    resetToMainTopics(false);

  }

  /* =======================================================
     RESET TO MAIN TOPICS

     This is the important part:
     Every opening calls this function.
  ======================================================= */

  function resetToMainTopics(clearSearch = true) {

    currentScreen = "topics";
    activeTopic = "";
    activeQuestion = -1;

    if (clearSearch && searchInput) {
      searchInput.value = "";
    }

    renderTopics();

    const scrollBox =
      panel?.querySelector("#pdHelpBodyScroll");

    if (scrollBox) {
      scrollBox.scrollTop = 0;
    }

  }

  /* =======================================================
     MAIN TOPICS SCREEN
  ======================================================= */

  function renderTopics() {

    if (!bodyBox) {
      return;
    }

    currentScreen = "topics";
    activeTopic = "";
    activeQuestion = -1;

    const content =
      contentFor(language);

    bodyBox.innerHTML = `

      <h3 class="pd-help-section-title">
        ${escapeHtml(ui(language, "topics"))}
      </h3>

      <div class="pd-help-topics">

        ${content.map(topic => `

          <button
            class="pd-help-topic"
            type="button"
            data-help-topic="${escapeHtml(topic.id)}"
            aria-label="${escapeHtml(topic.title)}"
          >

            <i
              class="pd-help-topic-icon"
              aria-hidden="true"
            >
              ${topic.icon}
            </i>

            <strong>
              ${escapeHtml(topic.title)}
            </strong>

            <small>
              ${escapeHtml(topic.description)}
            </small>

            <span
              class="pd-help-topic-arrow"
              aria-hidden="true"
            >
              →
            </span>

          </button>

        `).join("")}

      </div>

    `;

    bodyBox
      .querySelectorAll("[data-help-topic]")
      .forEach(topicButton => {

        topicButton.addEventListener(
          "click",
          function () {

            openTopic(
              this.dataset.helpTopic
            );

          }
        );

      });

  }

  /* =======================================================
     TOPIC -> QUESTIONS
  ======================================================= */

  function openTopic(id) {

    const topic =
      contentFor(language)
        .find(item => item.id === id);

    if (!topic) {
      resetToMainTopics();
      return;
    }

    currentScreen = "topic";
    activeTopic = id;
    activeQuestion = -1;

    bodyBox.innerHTML = `

      <button
        id="pdHelpBackTopics"
        class="pd-help-back"
        type="button"
      >
        ← ${escapeHtml(ui(language, "backTopics"))}
      </button>

      <div
        class="pd-help-topic-icon"
        aria-hidden="true"
      >
        ${topic.icon}
      </div>

      <h3 class="pd-help-topic-heading">
        ${escapeHtml(topic.title)}
      </h3>

      <p class="pd-help-topic-description">
        ${escapeHtml(topic.description)}
      </p>

      <div class="pd-help-question-list">

        ${topic.items.map((item, index) => `

          <article class="pd-help-faq">

            <button
              class="pd-help-question"
              type="button"
              data-help-question="${index}"
            >

              <span>
                ${escapeHtml(item.q)}
              </span>

              <span
                class="pd-help-question-symbol"
                aria-hidden="true"
              >
                →
              </span>

            </button>

          </article>

        `).join("")}

      </div>

    `;

    bodyBox
      .querySelector("#pdHelpBackTopics")
      .addEventListener(
        "click",
        function () {

          resetToMainTopics();

        }
      );

    bodyBox
      .querySelectorAll("[data-help-question]")
      .forEach(questionButton => {

        questionButton.addEventListener(
          "click",
          function () {

            openAnswer(
              id,
              Number(this.dataset.helpQuestion)
            );

          }
        );

      });

    scrollHelpToTop();

  }

  /* =======================================================
     QUESTION -> ONE ANSWER
  ======================================================= */

  function openAnswer(topicId, questionIndex) {

    const topic =
      contentFor(language)
        .find(item => item.id === topicId);

    if (!topic) {
      resetToMainTopics();
      return;
    }

    const item =
      topic.items[questionIndex];

    if (!item) {
      openTopic(topicId);
      return;
    }

    currentScreen = "answer";
    activeTopic = topicId;
    activeQuestion = questionIndex;

    bodyBox.innerHTML = `

      <button
        id="pdHelpBackQuestions"
        class="pd-help-back"
        type="button"
      >
        ← ${escapeHtml(ui(language, "backQuestions"))}
      </button>

      <div class="pd-help-answer-view">

        <div class="pd-help-answer-label">
          ${escapeHtml(topic.title)}
        </div>

        <h3>
          ${escapeHtml(item.q)}
        </h3>

        <p>
          ${escapeHtml(item.a)}
        </p>

      </div>

    `;

    bodyBox
      .querySelector("#pdHelpBackQuestions")
      .addEventListener(
        "click",
        function () {

          openTopic(topicId);

        }
      );

    scrollHelpToTop();

  }

  /* =======================================================
     SEARCH
  ======================================================= */

  function normalizeSearch(value) {

    return String(value || "")
      .toLocaleLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  }

  function allAnswers() {

    const output = [];

    contentFor(language).forEach(topic => {

      topic.items.forEach((item, index) => {

        output.push({
          ...item,
          topicId: topic.id,
          questionIndex: index,
          topic: topic.title,
          icon: topic.icon
        });

      });

    });

    return output;

  }

  function renderSearch(query) {

    if (!bodyBox) {
      return;
    }

    const cleanQuery =
      normalizeSearch(query);

    if (cleanQuery.length < 2) {

      resetToMainTopics(false);
      return;

    }

    currentScreen = "search";

    const words =
      cleanQuery
        .split(/\s+/)
        .filter(Boolean);

    const matches =
      allAnswers()
        .map(item => {

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
              (total, word) =>
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
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

    if (!matches.length) {

      bodyBox.innerHTML = `

        <h3 class="pd-help-section-title">
          ${escapeHtml(ui(language, "results"))}
        </h3>

        <div class="pd-help-empty">
          ${escapeHtml(ui(language, "noResults"))}
        </div>

      `;

      return;
    }

    bodyBox.innerHTML = `

      <h3 class="pd-help-section-title">
        ${escapeHtml(ui(language, "results"))}
      </h3>

      ${matches.slice(0, 20).map((item, index) => `

        <article class="pd-help-faq">

          <button
            class="pd-help-question"
            type="button"
            data-search-result="${index}"
          >

            <span>
              ${escapeHtml(item.q)}
            </span>

            <span
              class="pd-help-question-symbol"
              aria-hidden="true"
            >
              →
            </span>

          </button>

        </article>

      `).join("")}

    `;

    bodyBox
      .querySelectorAll("[data-search-result]")
      .forEach(resultButton => {

        resultButton.addEventListener(
          "click",
          function () {

            const result =
              matches[
                Number(this.dataset.searchResult)
              ];

            if (!result) {
              return;
            }

            if (searchInput) {
              searchInput.value = "";
            }

            openAnswer(
              result.topicId,
              result.questionIndex
            );

          }
        );

      });

  }

  /* =======================================================
     SCROLL
  ======================================================= */

  function scrollHelpToTop() {

    const scrollBox =
      panel?.querySelector("#pdHelpBodyScroll");

    if (!scrollBox) {
      return;
    }

    scrollBox.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

  /* =======================================================
     SPEECH
  ======================================================= */

  function speechLanguage() {

    const map = {
      en: "en-GB",
      uk: "uk-UA",
      ru: "ru-RU",
      fr: "fr-FR",
      de: "de-DE",
      es: "es-ES",
      it: "it-IT",
      pt: "pt-PT",
      nl: "nl-NL",
      pl: "pl-PL",
      cs: "cs-CZ",
      sk: "sk-SK",
      hu: "hu-HU",
      ro: "ro-RO",
      bg: "bg-BG",
      el: "el-GR",
      sv: "sv-SE",
      da: "da-DK",
      no: "nb-NO",
      fi: "fi-FI",
      tr: "tr-TR",
      ar: "ar-SA",
      hi: "hi-IN"
    };

    return map[language] || language;
  }

  function textToSpeak() {

    if (!panel) {
      return "";
    }

    const visibleText =
      panel
        .querySelector("#pdHelpBodyScroll")
        ?.innerText || "";

    return [
      ui(language, "title"),
      visibleText
    ]
      .filter(Boolean)
      .join(". ");

  }

  function stopSpeech() {

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    speaking = false;
    updateSpeaker();

  }

  function startSpeech() {

    if (!("speechSynthesis" in window)) {
      return;
    }

    const text =
      textToSpeak();

    if (!text) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang =
      speechLanguage();

    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = function () {

      speaking = true;
      updateSpeaker();

    };

    utterance.onend = function () {

      speaking = false;
      updateSpeaker();

    };

    utterance.onerror = function () {

      speaking = false;
      updateSpeaker();

    };

    window.speechSynthesis.speak(
      utterance
    );

  }

  function toggleSpeech() {

    if (speaking) {
      stopSpeech();
    } else {
      startSpeech();
    }

  }

  function updateSpeaker() {

    if (!speakerButton) {
      return;
    }

    speakerButton.classList.toggle(
      "pd-speaking",
      speaking
    );

    speakerButton.textContent =
      speaking ? "🔇" : "🔊";

    const label =
      speaking
        ? ui(language, "stop")
        : ui(language, "speak");

    speakerButton.setAttribute(
      "aria-label",
      label
    );

    speakerButton.title =
      label;

  }

  /* =======================================================
     OPEN / CLOSE

     ABSOLUTE RULE:
     EVERY OPEN = MAIN HELP TOPICS.
  ======================================================= */

  function openHelp() {

    /*
      Stop anything left from previous session.
    */
    stopSpeech();

    /*
      Re-detect language.
    */
    language = detectLanguage();

    /*
      Rebuild the Help shell so no old rendered state survives.
    */
    renderPanel();

    /*
      Explicitly force MAIN TOPICS.
    */
    resetToMainTopics(true);

    /*
      Show panel only AFTER the main screen has been rendered.
    */
    panel.classList.add(
      "pd-help-open"
    );

    backdrop.classList.add(
      "pd-help-open"
    );

    backdrop.setAttribute(
      "aria-hidden",
      "false"
    );

    button.style.visibility =
      "hidden";

    document.body.style.overflow =
      "hidden";

    /*
      Do NOT automatically focus search.
      This keeps the main topics visible immediately on mobile
      and prevents the keyboard from covering them.
    */

    setTimeout(
      startSpeech,
      250
    );

  }

  function closeHelp() {

    stopSpeech();

    /*
      Destroy navigation state immediately.
    */
    currentScreen = "topics";
    activeTopic = "";
    activeQuestion = -1;

    if (searchInput) {
      searchInput.value = "";
    }

    /*
      Prepare main topics BEFORE next opening.
    */
    if (bodyBox) {
      renderTopics();
    }

    panel?.classList.remove(
      "pd-help-open"
    );

    backdrop?.classList.remove(
      "pd-help-open"
    );

    backdrop?.setAttribute(
      "aria-hidden",
      "true"
    );

    if (button) {
      button.style.visibility = "visible";
    }

    document.body.style.overflow = "";

  }

  /* =======================================================
     DRAGGABLE MISO
  ======================================================= */

  function savedPosition() {

    try {

      return JSON.parse(
        localStorage.getItem(POSITION_KEY) || "null"
      );

    } catch (error) {

      return null;

    }

  }

  function savePosition(left, top) {

    try {

      localStorage.setItem(
        POSITION_KEY,
        JSON.stringify({
          left,
          top
        })
      );

    } catch (error) {}

  }

  function restorePosition() {

    if (!button) {
      return;
    }

    const saved =
      savedPosition();

    if (
      !saved ||
      !Number.isFinite(saved.left) ||
      !Number.isFinite(saved.top)
    ) {
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

  function keepButtonOnScreen() {

    if (!button) {
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
        Math.max(rect.left, padding),
        maxLeft
      );

    const top =
      Math.min(
        Math.max(rect.top, padding),
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

  function bindFloatingButton() {

    let dragging = false;
    let moved = false;

    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    button.addEventListener(
      "pointerdown",
      function (event) {

        if (
          event.button !== undefined &&
          event.button !== 0
        ) {
          return;
        }

        const rect =
          button.getBoundingClientRect();

        dragging = true;
        moved = false;

        startX = event.clientX;
        startY = event.clientY;
        startLeft = rect.left;
        startTop = rect.top;

        button.setPointerCapture?.(
          event.pointerId
        );

      }
    );

    button.addEventListener(
      "pointermove",
      function (event) {

        if (!dragging) {
          return;
        }

        const dx =
          event.clientX - startX;

        const dy =
          event.clientY - startY;

        if (
          Math.abs(dx) > 5 ||
          Math.abs(dy) > 5
        ) {
          moved = true;
        }

        if (!moved) {
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
      function (event) {

        if (!dragging) {
          return;
        }

        dragging = false;

        button.releasePointerCapture?.(
          event.pointerId
        );

        if (moved) {

          const rect =
            button.getBoundingClientRect();

          savePosition(
            rect.left,
            rect.top
          );

          return;
        }

        /*
          ONLY click action:
          always call openHelp(), which always resets to main topics.
        */
        openHelp();

      }
    );

    button.addEventListener(
      "pointercancel",
      function () {

        dragging = false;

      }
    );

    button.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

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

  function escapeHtml(value) {

    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }

  /* =======================================================
     LANGUAGE CHANGE

     If Help is open:
     language change returns to MAIN TOPICS.
  ======================================================= */

  function refreshLanguage() {

    const wasOpen =
      panel?.classList.contains(
        "pd-help-open"
      );

    stopSpeech();

    language =
      detectLanguage();

    currentScreen = "topics";
    activeTopic = "";
    activeQuestion = -1;

    renderPanel();

    if (wasOpen) {

      resetToMainTopics(true);

      panel.classList.add(
        "pd-help-open"
      );

      backdrop.classList.add(
        "pd-help-open"
      );

      backdrop.setAttribute(
        "aria-hidden",
        "false"
      );

    }

  }

  window.addEventListener(
    "petsdogue:languagechange",
    refreshLanguage
  );

  window.addEventListener(
    "storage",
    function (event) {

      if (event.key !== LANGUAGE_KEY) {
        return;
      }

      refreshLanguage();

    }
  );

  /* =======================================================
     ESCAPE
  ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        panel?.classList.contains(
          "pd-help-open"
        )
      ) {

        closeHelp();

      }

    }
  );

  /* =======================================================
     PUBLIC API
  ======================================================= */

  window.PetsDogueHelp = {

    open: function () {
      openHelp();
    },

    close: function () {
      closeHelp();
    },

    home: function () {
      resetToMainTopics(true);
    },

    speak: function () {
      startSpeech();
    },

    stop: function () {
      stopSpeech();
    }

  };

  /* =======================================================
     INIT
  ======================================================= */

  function init() {

    buildDom();
    restorePosition();

  }

  if (document.readyState === "loading") {

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
