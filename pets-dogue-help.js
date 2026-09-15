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

     Approved Miso headset artwork can later replace this
     fallback by setting:

     window.PETS_DOGUE_HELP_ICON = "/your-image.png";

     No existing PETS & DOGUE images are changed.
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
          d="M45 62
             C27 54 23 36 32 23
             C47 28 57 39 59 52"
          fill="#f4e4bd"
          stroke="#111"
          stroke-width="5"
          stroke-linejoin="round"
        />

        <path
          d="M115 62
             C133 54 137 36 128 23
             C113 28 103 39 101 52"
          fill="#f4e4bd"
          stroke="#111"
          stroke-width="5"
          stroke-linejoin="round"
        />

        <path
          d="M42 82
             C42 49 58 35 80 35
             C102 35 118 49 118 82
             C118 116 100 134 80 134
             C60 134 42 116 42 82Z"
          fill="#fff4d8"
          stroke="#111"
          stroke-width="5"
        />

        <path
          d="M44 79
             C26 80 25 104 37 111"
          fill="none"
          stroke="#111"
          stroke-width="10"
          stroke-linecap="round"
        />

        <path
          d="M116 79
             C134 80 135 104 123 111"
          fill="none"
          stroke="#111"
          stroke-width="10"
          stroke-linecap="round"
        />

        <path
          d="M42 75
             C42 48 56 31 80 31
             C104 31 118 48 118 75"
          fill="none"
          stroke="#111"
          stroke-width="8"
          stroke-linecap="round"
        />

        <circle cx="64" cy="78" r="6" fill="#111"/>
        <circle cx="96" cy="78" r="6" fill="#111"/>

        <path
          d="M74 94
             Q80 89 86 94
             Q80 101 74 94Z"
          fill="#111"
        />

        <path
          d="M68 105
             Q80 116 92 105"
          fill="none"
          stroke="#111"
          stroke-width="4"
          stroke-linecap="round"
        />

        <path
          d="M123 105
             C143 106 144 119 131 122"
          fill="none"
          stroke="#111"
          stroke-width="5"
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
     CORE TRANSLATIONS
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
      back:"Back to all topics",
      open:"Open",
      quick:"Frequently asked questions"
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
      back:"До всіх тем",
      open:"Відкрити",
      quick:"Часті запитання"
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
      back:"Ко всем разделам",
      open:"Открыть",
      quick:"Часто задаваемые вопросы"
    },

    fr:{
      help:"Aide",
      title:"Comment Miso peut-elle vous aider ?",
      intro:"Bienvenue dans l'aide PETS & DOGUE. Choisissez un sujet ou saisissez votre question.",
      search:"Rechercher dans l'aide",
      placeholder:"Que souhaitez-vous savoir ?",
      topics:"Rubriques d'aide",
      results:"Résultats",
      noResults:"Aucune réponse correspondante. Essayez d'autres mots.",
      close:"Fermer l'aide",
      speak:"Lire à voix haute",
      stop:"Arrêter la lecture",
      back:"Tous les sujets",
      open:"Ouvrir",
      quick:"Questions fréquentes"
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
      back:"Alle Themen",
      open:"Öffnen",
      quick:"Häufige Fragen"
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
      back:"Todos los temas",
      open:"Abrir",
      quick:"Preguntas frecuentes"
    },

    it:{
      help:"Aiuto",
      title:"Come può aiutarti Miso?",
      intro:"Benvenuto nell'assistenza PETS & DOGUE. Scegli un argomento o scrivi la tua domanda.",
      search:"Cerca nell'aiuto",
      placeholder:"Cosa vuoi sapere?",
      topics:"Argomenti di aiuto",
      results:"Risultati",
      noResults:"Nessuna risposta trovata.",
      close:"Chiudi",
      speak:"Leggi ad alta voce",
      stop:"Interrompi lettura",
      back:"Tutti gli argomenti",
      open:"Apri",
      quick:"Domande frequenti"
    },

    pt:{
      help:"Ajuda",
      title:"Como a Miso pode ajudar?",
      intro:"Bem-vindo à ajuda PETS & DOGUE. Escolha um tema ou escreva a sua pergunta.",
      search:"Pesquisar ajuda",
      placeholder:"O que gostaria de saber?",
      topics:"Tópicos de ajuda",
      results:"Resultados",
      noResults:"Nenhuma resposta encontrada.",
      close:"Fechar ajuda",
      speak:"Ler em voz alta",
      stop:"Parar leitura",
      back:"Todos os tópicos",
      open:"Abrir",
      quick:"Perguntas frequentes"
    },

    nl:{
      help:"Help",
      title:"Hoe kan Miso helpen?",
      intro:"Welkom bij PETS & DOGUE Help. Kies een onderwerp of typ je vraag.",
      search:"Help zoeken",
      placeholder:"Wat wil je weten?",
      topics:"Helponderwerpen",
      results:"Zoekresultaten",
      noResults:"Geen passend antwoord gevonden.",
      close:"Help sluiten",
      speak:"Voorlezen",
      stop:"Stop voorlezen",
      back:"Alle onderwerpen",
      open:"Openen",
      quick:"Veelgestelde vragen"
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
      back:"كل المواضيع",
      open:"فتح",
      quick:"الأسئلة الشائعة"
    }

  };


  /* =======================================================
     TRANSLATION FALLBACKS
  ======================================================= */

  const languageFallbacks = {

    pl:{
      help:"Pomoc",
      title:"Jak Miso może pomóc?",
      search:"Szukaj pomocy",
      placeholder:"Co chcesz wiedzieć?",
      topics:"Tematy pomocy",
      results:"Wyniki wyszukiwania",
      close:"Zamknij",
      speak:"Czytaj na głos",
      stop:"Zatrzymaj",
      back:"Wszystkie tematy",
      open:"Otwórz",
      quick:"Częste pytania"
    },

    cs:{
      help:"Nápověda",
      title:"Jak může Miso pomoci?",
      search:"Hledat v nápovědě",
      placeholder:"Co chcete vědět?",
      topics:"Témata nápovědy",
      results:"Výsledky",
      close:"Zavřít",
      speak:"Přečíst nahlas",
      stop:"Zastavit",
      back:"Všechna témata",
      open:"Otevřít",
      quick:"Časté otázky"
    },

    sk:{
      help:"Pomoc",
      title:"Ako môže Miso pomôcť?",
      search:"Hľadať v pomoci",
      placeholder:"Čo chcete vedieť?",
      topics:"Témy pomoci",
      results:"Výsledky",
      close:"Zavrieť",
      speak:"Čítať nahlas",
      stop:"Zastaviť",
      back:"Všetky témy",
      open:"Otvoriť",
      quick:"Časté otázky"
    },

    hu:{
      help:"Súgó",
      title:"Hogyan segíthet Miso?",
      search:"Keresés a súgóban",
      placeholder:"Mit szeretne tudni?",
      topics:"Súgótémák",
      results:"Találatok",
      close:"Bezárás",
      speak:"Felolvasás",
      stop:"Leállítás",
      back:"Minden téma",
      open:"Megnyitás",
      quick:"Gyakori kérdések"
    },

    ro:{
      help:"Ajutor",
      title:"Cum vă poate ajuta Miso?",
      search:"Caută în ajutor",
      placeholder:"Ce doriți să aflați?",
      topics:"Subiecte de ajutor",
      results:"Rezultate",
      close:"Închide",
      speak:"Citește cu voce tare",
      stop:"Oprește",
      back:"Toate subiectele",
      open:"Deschide",
      quick:"Întrebări frecvente"
    },

    bg:{
      help:"Помощ",
      title:"Как може Мисо да помогне?",
      search:"Търсене в помощта",
      placeholder:"Какво искате да знаете?",
      topics:"Теми за помощ",
      results:"Резултати",
      close:"Затвори",
      speak:"Прочети на глас",
      stop:"Спри",
      back:"Всички теми",
      open:"Отвори",
      quick:"Често задавани въпроси"
    },

    el:{
      help:"Βοήθεια",
      title:"Πώς μπορεί να βοηθήσει η Miso;",
      search:"Αναζήτηση βοήθειας",
      placeholder:"Τι θέλετε να μάθετε;",
      topics:"Θέματα βοήθειας",
      results:"Αποτελέσματα",
      close:"Κλείσιμο",
      speak:"Ανάγνωση δυνατά",
      stop:"Διακοπή",
      back:"Όλα τα θέματα",
      open:"Άνοιγμα",
      quick:"Συχνές ερωτήσεις"
    },

    sv:{
      help:"Hjälp",
      title:"Hur kan Miso hjälpa?",
      search:"Sök i hjälp",
      placeholder:"Vad vill du veta?",
      topics:"Hjälpämnen",
      results:"Resultat",
      close:"Stäng",
      speak:"Läs upp",
      stop:"Stoppa",
      back:"Alla ämnen",
      open:"Öppna",
      quick:"Vanliga frågor"
    },

    da:{
      help:"Hjælp",
      title:"Hvordan kan Miso hjælpe?",
      search:"Søg i hjælp",
      placeholder:"Hvad vil du vide?",
      topics:"Hjælpeemner",
      results:"Resultater",
      close:"Luk",
      speak:"Læs højt",
      stop:"Stop",
      back:"Alle emner",
      open:"Åbn",
      quick:"Ofte stillede spørgsmål"
    },

    no:{
      help:"Hjelp",
      title:"Hvordan kan Miso hjelpe?",
      search:"Søk i hjelp",
      placeholder:"Hva vil du vite?",
      topics:"Hjelpeemner",
      results:"Resultater",
      close:"Lukk",
      speak:"Les høyt",
      stop:"Stopp",
      back:"Alle emner",
      open:"Åpne",
      quick:"Vanlige spørsmål"
    },

    fi:{
      help:"Ohje",
      title:"Miten Miso voi auttaa?",
      search:"Hae ohjeesta",
      placeholder:"Mitä haluat tietää?",
      topics:"Ohjeaiheet",
      results:"Tulokset",
      close:"Sulje",
      speak:"Lue ääneen",
      stop:"Lopeta",
      back:"Kaikki aiheet",
      open:"Avaa",
      quick:"Usein kysytyt kysymykset"
    },

    tr:{
      help:"Yardım",
      title:"Miso nasıl yardımcı olabilir?",
      search:"Yardımda ara",
      placeholder:"Ne öğrenmek istiyorsunuz?",
      topics:"Yardım konuları",
      results:"Sonuçlar",
      close:"Kapat",
      speak:"Sesli oku",
      stop:"Durdur",
      back:"Tüm konular",
      open:"Aç",
      quick:"Sık sorulan sorular"
    },

    hi:{
      help:"सहायता",
      title:"Miso कैसे मदद कर सकती है?",
      search:"सहायता खोजें",
      placeholder:"आप क्या जानना चाहते हैं?",
      topics:"सहायता विषय",
      results:"खोज परिणाम",
      close:"बंद करें",
      speak:"ज़ोर से पढ़ें",
      stop:"पढ़ना रोकें",
      back:"सभी विषय",
      open:"खोलें",
      quick:"अक्सर पूछे जाने वाले प्रश्न"
    }

  };


  Object.entries(
    languageFallbacks
  )
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
            a:"PETS & DOGUE is a digital lifestyle platform for pets and the people who love them. You can discover stories, practical guides, pet-friendly places, health, fashion, photography, community, contests, rescue, Marketplace, member benefits and useful services in one place."
          },
          {
            q:"Do I need an account to use PETS & DOGUE?",
            a:"No. Visitors can explore the platform without signing in. Subscription gives access to member discounts and special offers, and lets members post up to 50 free Marketplace ads."
          },
          {
            q:"What do the three lines at the top mean?",
            a:"The three-line menu button opens Contents. From there you can move between PETS & DOGUE sections, change language, sign in or subscribe."
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
            a:"Tap the three-line menu at the top of the page. In Contents, open the Language selector and choose your language. PETS & DOGUE remembers your selected language as you move between pages."
          },
          {
            q:"Why is there no language button in the top navigation?",
            a:"Language selection is kept inside the Contents side menu so the main navigation stays clean and consistent on every page."
          },
          {
            q:"Does PETS & DOGUE support Arabic?",
            a:"Yes. When Arabic is selected, supported PETS & DOGUE pages use right-to-left layout."
          }
        ]
      },

      {
        id:"petfriendly",
        icon:"🐾",
        title:"Pet-Friendly Places",
        description:"Find places, use the map, save places and share pet rules.",
        items:[
          {
            q:"How do Pet-Friendly Places work?",
            a:"Open Pet-Friendly Places and allow location access or search for a city, postcode or area. Choose a category and search radius. Places appear as cards and map markers, with the nearest places shown first."
          },
          {
            q:"How do I add a pet-friendly place?",
            a:"Open Pet-Friendly Places and use Add place. Provide information about the exact venue. Community information can then help other PETS & DOGUE users."
          },
          {
            q:"How do I confirm whether pets are allowed inside or outside?",
            a:"Open Pet policy on a place card. Confirm whether pets are welcome inside, outside, or both. Confirm only information you know about that exact venue."
          },
          {
            q:"How do I save a place?",
            a:"Tap the heart on the place card. You can find it later by opening the Saved category."
          },
          {
            q:"How do I get directions?",
            a:"Tap Route on the place. PETS & DOGUE lets you continue with Google Maps, Waze or Apple Maps."
          }
        ]
      },

      {
        id:"community",
        icon:"♥",
        title:"Local Community",
        description:"Understand local posts and how to publish useful community information.",
        items:[
          {
            q:"What is Local Community?",
            a:"Local Community is separate from Pet-Friendly Places. It is for local posts and useful information shared with pet owners around a location."
          },
          {
            q:"How do I publish in Local Community?",
            a:"Open Local Community and use its publishing option. Choose the appropriate type of post, add the requested information and submit it."
          },
          {
            q:"Is a Local Community post the same as adding a pet-friendly venue?",
            a:"No. A venue belongs in Pet-Friendly Places. A local post, update or community message belongs in Local Community."
          }
        ]
      },

      {
        id:"marketplace",
        icon:"▢",
        title:"Marketplace",
        description:"Buying, selling and member Marketplace benefits.",
        items:[
          {
            q:"What is Marketplace?",
            a:"Marketplace is the PETS & DOGUE area for relevant pet-related listings and offers."
          },
          {
            q:"What Marketplace benefit do subscribers receive?",
            a:"Subscribers can post up to 50 free Marketplace ads as part of their member benefits."
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
            q:"Can I read PETS & DOGUE without subscribing?",
            a:"Yes. General platform content and features remain available to visitors. Subscription unlocks member benefits."
          },
          {
            q:"Where do I sign in?",
            a:"Use the Profile control or open the Contents menu and choose Sign In. Sign in is for existing subscribers; new users can choose Subscribe."
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
            a:"Use Edition and Articles for editorial stories and guides. Fashion and Health contain their specialist content, while Photos focuses on visual features."
          },
          {
            q:"What is Cover Star?",
            a:"Cover Star is the PETS & DOGUE feature connected with pets appearing as highlighted stars of the platform."
          },
          {
            q:"Where do I find contests?",
            a:"Open Contests from the PETS & DOGUE navigation or Contents menu to see available participation opportunities."
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
            a:"Use the speaker control on supported PETS & DOGUE pages. In this Help assistant, the current Help content starts reading when Help opens."
          },
          {
            q:"How do I stop Miso speaking?",
            a:"Tap the speaker button in Help. Tap it again to start reading the current Help information aloud again."
          }
        ]
      },

      {
        id:"business",
        icon:"◆",
        title:"For businesses & advertisers",
        description:"Why businesses can work with PETS & DOGUE.",
        items:[
          {
            q:"Can a business advertise with PETS & DOGUE?",
            a:"Yes. Use Advertise with us for information about opportunities for brands and businesses that want to reach people who care about pets."
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
            a:"PETS & DOGUE — цифровая lifestyle-платформа для питомцев и людей, которые их любят. Здесь в одном месте собраны оригинальные истории, практические материалы, pet-friendly места, здоровье, мода, фотографии, сообщество, конкурсы, помощь животным, Marketplace, преимущества для подписчиков и полезные сервисы."
          },
          {
            q:"Нужен ли аккаунт, чтобы пользоваться PETS & DOGUE?",
            a:"Нет. Пользоваться платформой и смотреть основной контент можно без входа. Подписка даёт доступ к скидкам и специальным предложениям, а также возможность размещать до 50 бесплатных объявлений в Marketplace."
          },
          {
            q:"Что означают три полоски сверху?",
            a:"Кнопка с тремя полосками открывает меню Contents. Через него можно переходить между разделами PETS & DOGUE, менять язык, входить в профиль подписчика или оформлять подписку."
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
            a:"Нажмите три полоски в верхней части страницы. В боковом меню Contents найдите Language и выберите нужный язык. PETS & DOGUE запоминает выбранный язык при переходе между страницами."
          },
          {
            q:"Почему сверху нет отдельной кнопки языка?",
            a:"Выбор языка находится только в боковом меню Contents, чтобы верхняя навигация оставалась чистой и одинаковой на всех страницах."
          },
          {
            q:"Поддерживается ли арабский язык?",
            a:"Да. При выборе арабского языка поддерживаемые страницы PETS & DOGUE автоматически переключаются на направление справа налево."
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
            a:"Откройте Pet-Friendly Places и разрешите определение местоположения либо введите город, почтовый индекс или район. Выберите категорию и радиус поиска. Места отображаются карточками и на карте, а ближайшие показываются первыми."
          },
          {
            q:"Как добавить pet-friendly место?",
            a:"Откройте Pet-Friendly Places и нажмите Add place. Добавьте информацию именно о конкретном заведении. Эта информация поможет другим пользователям PETS & DOGUE."
          },
          {
            q:"Как указать, можно ли с животным внутри или снаружи?",
            a:"На карточке места откройте Pet policy. Можно подтвердить, что животные разрешены внутри, снаружи или в обоих вариантах. Подтверждайте только информацию, которую знаете именно об этом месте."
          },
          {
            q:"Как сохранить место?",
            a:"Нажмите сердечко на карточке. Потом это место можно найти в категории Saved."
          },
          {
            q:"Как построить маршрут?",
            a:"Нажмите Route. Для продолжения маршрута можно выбрать Google Maps, Waze или Apple Maps."
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
            a:"Local Community — отдельный от Pet-Friendly Places раздел. Он предназначен для локальных публикаций и полезной информации для владельцев животных в определённой местности."
          },
          {
            q:"Как добавить публикацию в Local Community?",
            a:"Откройте Local Community и выберите функцию публикации. Укажите подходящий тип публикации, заполните необходимую информацию и отправьте её."
          },
          {
            q:"Публикация Local Community и добавление pet-friendly места — это одно и то же?",
            a:"Нет. Заведение добавляется в Pet-Friendly Places. Локальная публикация, новость или сообщение для сообщества размещается в Local Community."
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
            a:"Marketplace — раздел PETS & DOGUE для подходящих объявлений и предложений, связанных с питомцами."
          },
          {
            q:"Что получает подписчик в Marketplace?",
            a:"Подписчик может разместить до 50 бесплатных объявлений в Marketplace."
          }
        ]
      },

      {
        id:"membership",
        icon:"★",
        title:"Подписка и преимущества",
        description:"Что получает подписчик PETS & DOGUE.",
        items:[
          {
            q:"Что даёт подписка?",
            a:"Подписчики получают доступ к скидкам и специальным предложениям PETS & DOGUE, а также возможность разместить до 50 бесплатных объявлений в Marketplace."
          },
          {
            q:"Можно ли пользоваться PETS & DOGUE без подписки?",
            a:"Да. Основной контент и функции платформы доступны посетителям. Подписка открывает дополнительные преимущества участника."
          },
          {
            q:"Где войти в аккаунт?",
            a:"Используйте значок Profile либо откройте меню Contents и выберите Sign In. Вход предназначен для существующих подписчиков, а новый пользователь может выбрать Subscribe."
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
            q:"Где читать материалы PETS & DOGUE?",
            a:"В Edition и Articles находятся редакционные истории и полезные материалы. Fashion и Health содержат тематический контент, а Photos — визуальные публикации."
          },
          {
            q:"Что такое Cover Star?",
            a:"Cover Star — специальный раздел PETS & DOGUE, связанный с питомцами, которые становятся яркими героями платформы."
          },
          {
            q:"Где находятся конкурсы?",
            a:"Откройте Contests через навигацию PETS & DOGUE или боковое меню Contents."
          }
        ]
      },

      {
        id:"accessibility",
        icon:"🔊",
        title:"Озвучка и доступность",
        description:"Как слушать тексты PETS & DOGUE.",
        items:[
          {
            q:"Как включить чтение текста вслух?",
            a:"На поддерживаемых страницах используйте значок громкоговорителя. В помощнике Мисо текст помощи автоматически начинает озвучиваться после открытия."
          },
          {
            q:"Как заставить Мисо замолчать?",
            a:"Нажмите значок громкоговорителя в окне помощи. Нажмите его ещё раз, чтобы снова начать озвучивание текущего текста."
          }
        ]
      },

      {
        id:"business",
        icon:"◆",
        title:"Для бизнеса и рекламодателей",
        description:"Возможности сотрудничества с PETS & DOGUE.",
        items:[
          {
            q:"Можно ли рекламировать бизнес в PETS & DOGUE?",
            a:"Да. Раздел Advertise with us предназначен для информации о возможностях брендов и компаний, которые хотят обращаться к аудитории людей, любящих животных."
          },
          {
            q:"Почему PETS & DOGUE?",
            a:"PETS & DOGUE объединяет редакционный контент, практические сервисы для питомцев, локальный поиск, сообщество, Marketplace, участие пользователей и преимущества подписчиков в одной экосистеме."
          }
        ]
      }
    ],

    uk:[
      {
        id:"start",
        icon:"✦",
        title:"Початок роботи",
        description:"Що таке PETS & DOGUE і як користуватися платформою.",
        items:[
          {
            q:"Що таке PETS & DOGUE?",
            a:"PETS & DOGUE — цифрова lifestyle-платформа для улюбленців і людей, які їх люблять. Тут зібрані оригінальні історії, практичні матеріали, pet-friendly місця, здоров'я, мода, фотографія, спільнота, конкурси, допомога тваринам, Marketplace, переваги для підписників і корисні сервіси."
          },
          {
            q:"Чи потрібен акаунт?",
            a:"Ні. Основним контентом і функціями можна користуватися без входу. Підписка відкриває знижки, спеціальні пропозиції та можливість розміщувати до 50 безкоштовних оголошень у Marketplace."
          },
          {
            q:"Що означають три смужки зверху?",
            a:"Кнопка з трьома смужками відкриває Contents. Там можна переходити між розділами PETS & DOGUE, змінювати мову, входити в профіль або оформлювати підписку."
          }
        ]
      },

      {
        id:"language",
        icon:"文",
        title:"Мова",
        description:"Як змінити мову PETS & DOGUE.",
        items:[
          {
            q:"Як змінити мову?",
            a:"Натисніть три смужки у верхній частині сторінки. У меню Contents відкрийте Language та виберіть потрібну мову. PETS & DOGUE запам'ятає ваш вибір."
          },
          {
            q:"Чи підтримується арабська?",
            a:"Так. Для арабської мови підтримувані сторінки автоматично використовують напрямок справа наліво."
          }
        ]
      },

      {
        id:"petfriendly",
        icon:"🐾",
        title:"Pet-Friendly Places",
        description:"Місця, карта, збереження та правила для тварин.",
        items:[
          {
            q:"Як працює Pet-Friendly Places?",
            a:"Дозвольте визначення місцезнаходження або введіть місто, поштовий індекс чи район. Виберіть категорію та радіус. Місця з'являться на карті й у картках."
          },
          {
            q:"Як додати pet-friendly місце?",
            a:"У Pet-Friendly Places натисніть Add place та додайте інформацію саме про конкретне місце."
          },
          {
            q:"Як зберегти місце?",
            a:"Натисніть сердечко на картці. Пізніше місце можна знайти в Saved."
          },
          {
            q:"Як побудувати маршрут?",
            a:"Натисніть Route і виберіть Google Maps, Waze або Apple Maps."
          }
        ]
      },

      {
        id:"community",
        icon:"♥",
        title:"Local Community",
        description:"Локальні публікації та інформація спільноти.",
        items:[
          {
            q:"Чим Local Community відрізняється від Pet-Friendly Places?",
            a:"Pet-Friendly Places призначений для конкретних місць. Local Community — для локальних публікацій, оновлень і корисної інформації спільноти."
          },
          {
            q:"Як додати публікацію?",
            a:"Відкрийте Local Community, скористайтеся функцією публікації, виберіть тип повідомлення, заповніть інформацію та надішліть її."
          }
        ]
      },

      {
        id:"membership",
        icon:"★",
        title:"Підписка",
        description:"Переваги учасників PETS & DOGUE.",
        items:[
          {
            q:"Що дає підписка?",
            a:"Підписники отримують доступ до знижок і спеціальних пропозицій та можуть розміщувати до 50 безкоштовних оголошень у Marketplace."
          },
          {
            q:"Чи можна користуватися платформою без підписки?",
            a:"Так. Основний контент і функції доступні відвідувачам без підписки."
          }
        ]
      },

      {
        id:"accessibility",
        icon:"🔊",
        title:"Озвучення",
        description:"Як слухати інформацію вголос.",
        items:[
          {
            q:"Як увімкнути або вимкнути голос?",
            a:"Використовуйте значок гучномовця. Після відкриття Help Місо автоматично починає читати інформацію. Натисніть гучномовець, щоб зупинити читання, і ще раз — щоб увімкнути його."
          }
        ]
      }
    ]

  };


  /* =======================================================
     GENERIC LOCALIZED CONTENT FOR REMAINING LANGUAGES

     UI stays fully localized. Help knowledge falls back
     to English where a dedicated knowledge translation
     has not yet been authored.
  ======================================================= */

  function contentFor(language){

    if(
      CONTENT[language]
    ){

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

      .pd-help-question span:last-child{
        flex:0 0 auto;
        font-size:21px;
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
        line-height:1.45;
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
     PANEL RENDER
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
            title="${escapeHtml(ui(language,"speak"))}"
          >
            🔊
          </button>

          <button
            id="pdHelpClose"
            class="pd-help-round"
            type="button"
            aria-label="${escapeHtml(ui(language,"close"))}"
            title="${escapeHtml(ui(language,"close"))}"
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
              topic:
                topic.title,
              icon:
                topic.icon
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
              ]
              .join(" ")
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


    if(
      !matches.length
    ){

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

    utterance.rate =
      1;

    utterance.pitch =
      1;


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
  ======================================================= */

  function openHelp(){

    language =
      detectLanguage();

    renderPanel();

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


    /*
       User requested automatic speech
       when Help opens.
    */

    setTimeout(
      startSpeech,
      220
    );

  }


  function closeHelp(){

    stopSpeech();

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

    const padding =
      8;

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

    let dragging =
      false;

    let moved =
      false;

    let startX =
      0;

    let startY =
      0;

    let startLeft =
      0;

    let startTop =
      0;


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

        dragging =
          true;

        moved =
          false;

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

          moved =
            true;

        }

        if(!moved){
          return;
        }

        event.preventDefault();

        const width =
          button.offsetWidth;

        const height =
          button.offsetHeight;

        const padding =
          8;

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

        dragging =
          false;

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

        dragging =
          false;

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

     Existing PETS & DOGUE language system remains untouched.
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

      renderPanel();

      if(wasOpen){

        panel.classList.add(
          "pd-help-open"
        );

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

      renderPanel();

      if(wasOpen){

        panel.classList.add(
          "pd-help-open"
        );

      }

    }
  );


  /* =======================================================
     ESCAPE KEY
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

     Allows future pages to open Help without modifying
     the assistant itself.
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
