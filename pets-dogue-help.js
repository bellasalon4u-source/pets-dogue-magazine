"use strict";

/* =========================================================
   PETS & DOGUE
   GLOBAL MISO HELP / FAQ

   IMPORTANT:
   1. Clicking Miso ALWAYS opens the MAIN HELP TOPICS screen.
   2. Topic -> questions -> answer.
   3. Closing and reopening NEVER restores an old topic.
   4. Search always starts from all FAQ content.
   5. Full multilingual support + Arabic RTL.
   6. Text-to-speech preserved.
   7. Floating Miso remains draggable.
   8. Miso image: /miso-help.png
   9. Visual design and behaviour must remain unchanged.
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
     COMPLETE UI TRANSLATIONS
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
      intro: "Retrouvez ici des réponses rapides sur PETS & DOGUE. Choisissez une rubrique ci-dessous ou saisissez votre question dans la recherche.",
      search: "Rechercher dans l’aide",
      placeholder: "Que souhaitez-vous savoir ?",
      topics: "Rubriques d’aide",
      results: "Résultats de recherche",
      noResults: "Aucune réponse correspondante. Essayez d’autres mots.",
      close: "Fermer l’aide",
      speak: "Lire à voix haute",
      stop: "Arrêter la lecture",
      backTopics: "Toutes les rubriques",
      backQuestions: "Retour aux questions"
    },

    de: {
      help: "Hilfe",
      title: "Wie kann Miso helfen?",
      intro: "Hier findest du schnelle Antworten zu PETS & DOGUE. Wähle unten einen Bereich oder gib deine Frage in die Suche ein.",
      search: "Hilfe durchsuchen",
      placeholder: "Was möchtest du wissen?",
      topics: "Hilfethemen",
      results: "Suchergebnisse",
      noResults: "Keine passende Antwort gefunden. Versuche andere Wörter.",
      close: "Hilfe schließen",
      speak: "Vorlesen",
      stop: "Vorlesen stoppen",
      backTopics: "Zurück zu allen Themen",
      backQuestions: "Zurück zu den Fragen"
    },

    es: {
      help: "Ayuda",
      title: "¿Cómo puede ayudarte Miso?",
      intro: "Aquí encontrarás respuestas rápidas sobre PETS & DOGUE. Elige una sección o escribe tu pregunta en la búsqueda.",
      search: "Buscar en Ayuda",
      placeholder: "¿Qué quieres saber?",
      topics: "Temas de ayuda",
      results: "Resultados de búsqueda",
      noResults: "No se encontraron respuestas. Prueba con otras palabras.",
      close: "Cerrar ayuda",
      speak: "Leer en voz alta",
      stop: "Detener lectura",
      backTopics: "Volver a todos los temas",
      backQuestions: "Volver a las preguntas"
    },

    it: {
      help: "Aiuto",
      title: "Come può aiutarti Miso?",
      intro: "Qui trovi risposte rapide su PETS & DOGUE. Scegli una sezione qui sotto oppure scrivi la tua domanda nella ricerca.",
      search: "Cerca nell’aiuto",
      placeholder: "Cosa vorresti sapere?",
      topics: "Argomenti di aiuto",
      results: "Risultati della ricerca",
      noResults: "Nessuna risposta corrispondente. Prova con altre parole.",
      close: "Chiudi l’aiuto",
      speak: "Leggi ad alta voce",
      stop: "Interrompi la lettura",
      backTopics: "Torna a tutti gli argomenti",
      backQuestions: "Torna alle domande"
    },

    pt: {
      help: "Ajuda",
      title: "Como a Miso pode ajudar?",
      intro: "Aqui encontra respostas rápidas sobre PETS & DOGUE. Escolha uma secção abaixo ou escreva a sua pergunta na pesquisa.",
      search: "Pesquisar na ajuda",
      placeholder: "O que gostaria de saber?",
      topics: "Tópicos de ajuda",
      results: "Resultados da pesquisa",
      noResults: "Não foram encontradas respostas. Tente outras palavras.",
      close: "Fechar ajuda",
      speak: "Ler em voz alta",
      stop: "Parar leitura",
      backTopics: "Voltar a todos os tópicos",
      backQuestions: "Voltar às perguntas"
    },

    nl: {
      help: "Help",
      title: "Hoe kan Miso helpen?",
      intro: "Hier vind je snelle antwoorden over PETS & DOGUE. Kies hieronder een onderwerp of typ je vraag in de zoekbalk.",
      search: "Zoeken in Help",
      placeholder: "Wat wil je weten?",
      topics: "Help-onderwerpen",
      results: "Zoekresultaten",
      noResults: "Geen passende antwoorden gevonden. Probeer andere woorden.",
      close: "Help sluiten",
      speak: "Voorlezen",
      stop: "Voorlezen stoppen",
      backTopics: "Terug naar alle onderwerpen",
      backQuestions: "Terug naar de vragen"
    },

    pl: {
      help: "Pomoc",
      title: "Jak Miso może pomóc?",
      intro: "Tutaj znajdziesz szybkie odpowiedzi dotyczące PETS & DOGUE. Wybierz sekcję poniżej lub wpisz pytanie w wyszukiwarce.",
      search: "Szukaj w pomocy",
      placeholder: "Czego chcesz się dowiedzieć?",
      topics: "Tematy pomocy",
      results: "Wyniki wyszukiwania",
      noResults: "Nie znaleziono pasujących odpowiedzi. Spróbuj innych słów.",
      close: "Zamknij pomoc",
      speak: "Czytaj na głos",
      stop: "Zatrzymaj czytanie",
      backTopics: "Wróć do wszystkich tematów",
      backQuestions: "Wróć do pytań"
    },

    cs: {
      help: "Nápověda",
      title: "Jak může Miso pomoci?",
      intro: "Zde najdete rychlé odpovědi o PETS & DOGUE. Vyberte níže požadovanou sekci nebo napište svou otázku do vyhledávání.",
      search: "Hledat v nápovědě",
      placeholder: "Co byste chtěli vědět?",
      topics: "Témata nápovědy",
      results: "Výsledky vyhledávání",
      noResults: "Nebyly nalezeny žádné odpovídající odpovědi. Zkuste jiná slova.",
      close: "Zavřít nápovědu",
      speak: "Přečíst nahlas",
      stop: "Zastavit čtení",
      backTopics: "Zpět ke všem tématům",
      backQuestions: "Zpět k otázkám"
    },

    sk: {
      help: "Pomoc",
      title: "Ako môže Miso pomôcť?",
      intro: "Tu nájdete rýchle odpovede o PETS & DOGUE. Vyberte si sekciu nižšie alebo napíšte svoju otázku do vyhľadávania.",
      search: "Hľadať v pomoci",
      placeholder: "Čo by ste chceli vedieť?",
      topics: "Témy pomoci",
      results: "Výsledky vyhľadávania",
      noResults: "Nenašli sa žiadne zodpovedajúce odpovede. Skúste iné slová.",
      close: "Zavrieť pomoc",
      speak: "Čítať nahlas",
      stop: "Zastaviť čítanie",
      backTopics: "Späť na všetky témy",
      backQuestions: "Späť k otázkam"
    },

    hu: {
      help: "Súgó",
      title: "Hogyan segíthet Miso?",
      intro: "Itt gyors válaszokat talál a PETS & DOGUE használatával kapcsolatban. Válasszon egy témát, vagy írja be kérdését a keresőbe.",
      search: "Keresés a súgóban",
      placeholder: "Mit szeretne tudni?",
      topics: "Súgótémák",
      results: "Keresési eredmények",
      noResults: "Nem található megfelelő válasz. Próbáljon más szavakat.",
      close: "Súgó bezárása",
      speak: "Felolvasás",
      stop: "Felolvasás leállítása",
      backTopics: "Vissza az összes témához",
      backQuestions: "Vissza a kérdésekhez"
    },

    ro: {
      help: "Ajutor",
      title: "Cum vă poate ajuta Miso?",
      intro: "Aici găsiți răspunsuri rapide despre PETS & DOGUE. Alegeți o secțiune de mai jos sau introduceți întrebarea în căutare.",
      search: "Căutare în ajutor",
      placeholder: "Ce doriți să aflați?",
      topics: "Subiecte de ajutor",
      results: "Rezultatele căutării",
      noResults: "Nu au fost găsite răspunsuri potrivite. Încercați alte cuvinte.",
      close: "Închide ajutorul",
      speak: "Citește cu voce tare",
      stop: "Oprește citirea",
      backTopics: "Înapoi la toate subiectele",
      backQuestions: "Înapoi la întrebări"
    },

    bg: {
      help: "Помощ",
      title: "Как може Мисо да помогне?",
      intro: "Тук ще намерите бързи отговори за PETS & DOGUE. Изберете раздел по-долу или въведете въпроса си в търсенето.",
      search: "Търсене в помощта",
      placeholder: "Какво искате да знаете?",
      topics: "Теми за помощ",
      results: "Резултати от търсенето",
      noResults: "Не са намерени подходящи отговори. Опитайте с други думи.",
      close: "Затвори помощта",
      speak: "Прочети на глас",
      stop: "Спри четенето",
      backTopics: "Назад към всички теми",
      backQuestions: "Назад към въпросите"
    },

    el: {
      help: "Βοήθεια",
      title: "Πώς μπορεί να βοηθήσει η Miso;",
      intro: "Εδώ θα βρείτε γρήγορες απαντήσεις για το PETS & DOGUE. Επιλέξτε μια ενότητα παρακάτω ή γράψτε την ερώτησή σας στην αναζήτηση.",
      search: "Αναζήτηση στη βοήθεια",
      placeholder: "Τι θα θέλατε να μάθετε;",
      topics: "Θέματα βοήθειας",
      results: "Αποτελέσματα αναζήτησης",
      noResults: "Δεν βρέθηκαν σχετικές απαντήσεις. Δοκιμάστε άλλες λέξεις.",
      close: "Κλείσιμο βοήθειας",
      speak: "Ανάγνωση δυνατά",
      stop: "Διακοπή ανάγνωσης",
      backTopics: "Πίσω σε όλα τα θέματα",
      backQuestions: "Πίσω στις ερωτήσεις"
    },

    sv: {
      help: "Hjälp",
      title: "Hur kan Miso hjälpa?",
      intro: "Här hittar du snabba svar om PETS & DOGUE. Välj ett avsnitt nedan eller skriv din fråga i sökfältet.",
      search: "Sök i hjälpen",
      placeholder: "Vad vill du veta?",
      topics: "Hjälpämnen",
      results: "Sökresultat",
      noResults: "Inga matchande svar hittades. Prova andra ord.",
      close: "Stäng hjälpen",
      speak: "Läs högt",
      stop: "Stoppa uppläsning",
      backTopics: "Tillbaka till alla ämnen",
      backQuestions: "Tillbaka till frågorna"
    },

    da: {
      help: "Hjælp",
      title: "Hvordan kan Miso hjælpe?",
      intro: "Her finder du hurtige svar om PETS & DOGUE. Vælg et emne nedenfor, eller skriv dit spørgsmål i søgefeltet.",
      search: "Søg i hjælp",
      placeholder: "Hvad vil du gerne vide?",
      topics: "Hjælpemner",
      results: "Søgeresultater",
      noResults: "Ingen passende svar fundet. Prøv andre ord.",
      close: "Luk hjælp",
      speak: "Læs højt",
      stop: "Stop oplæsning",
      backTopics: "Tilbage til alle emner",
      backQuestions: "Tilbage til spørgsmål"
    },

    no: {
      help: "Hjelp",
      title: "Hvordan kan Miso hjelpe?",
      intro: "Her finner du raske svar om PETS & DOGUE. Velg et emne nedenfor, eller skriv spørsmålet ditt i søkefeltet.",
      search: "Søk i hjelp",
      placeholder: "Hva vil du vite?",
      topics: "Hjelpeemner",
      results: "Søkeresultater",
      noResults: "Ingen passende svar funnet. Prøv andre ord.",
      close: "Lukk hjelp",
      speak: "Les høyt",
      stop: "Stopp opplesing",
      backTopics: "Tilbake til alle emner",
      backQuestions: "Tilbake til spørsmål"
    },

    fi: {
      help: "Ohje",
      title: "Miten Miso voi auttaa?",
      intro: "Täältä löydät nopeita vastauksia PETS & DOGUE -palvelusta. Valitse aihe alta tai kirjoita kysymyksesi hakuun.",
      search: "Hae ohjeesta",
      placeholder: "Mitä haluaisit tietää?",
      topics: "Ohjeaiheet",
      results: "Hakutulokset",
      noResults: "Sopivia vastauksia ei löytynyt. Kokeile muita sanoja.",
      close: "Sulje ohje",
      speak: "Lue ääneen",
      stop: "Lopeta lukeminen",
      backTopics: "Takaisin kaikkiin aiheisiin",
      backQuestions: "Takaisin kysymyksiin"
    },

    tr: {
      help: "Yardım",
      title: "Miso nasıl yardımcı olabilir?",
      intro: "PETS & DOGUE hakkında hızlı yanıtları burada bulabilirsiniz. Aşağıdan bir bölüm seçin veya sorunuzu aramaya yazın.",
      search: "Yardımda ara",
      placeholder: "Ne öğrenmek istersiniz?",
      topics: "Yardım konuları",
      results: "Arama sonuçları",
      noResults: "Eşleşen yanıt bulunamadı. Farklı kelimeler deneyin.",
      close: "Yardımı kapat",
      speak: "Sesli oku",
      stop: "Okumayı durdur",
      backTopics: "Tüm konulara dön",
      backQuestions: "Sorulara dön"
    },

    ar: {
      help: "المساعدة",
      title: "كيف يمكن لميسو مساعدتك؟",
      intro: "ستجد هنا إجابات سريعة حول PETS & DOGUE. اختر قسماً أدناه أو اكتب سؤالك في البحث.",
      search: "البحث في المساعدة",
      placeholder: "ماذا تريد أن تعرف؟",
      topics: "مواضيع المساعدة",
      results: "نتائج البحث",
      noResults: "لم يتم العثور على إجابات مطابقة. جرّب كلمات أخرى.",
      close: "إغلاق المساعدة",
      speak: "قراءة بصوت عالٍ",
      stop: "إيقاف القراءة",
      backTopics: "العودة إلى جميع المواضيع",
      backQuestions: "العودة إلى الأسئلة"
    },

    hi: {
      help: "सहायता",
      title: "Miso कैसे मदद कर सकती है?",
      intro: "PETS & DOGUE के बारे में त्वरित उत्तर यहाँ मिलेंगे। नीचे कोई विषय चुनें या खोज में अपना प्रश्न लिखें।",
      search: "सहायता में खोजें",
      placeholder: "आप क्या जानना चाहते हैं?",
      topics: "सहायता विषय",
      results: "खोज परिणाम",
      noResults: "कोई संबंधित उत्तर नहीं मिला। दूसरे शब्द आज़माएँ।",
      close: "सहायता बंद करें",
      speak: "ज़ोर से पढ़ें",
      stop: "पढ़ना बंद करें",
      backTopics: "सभी विषयों पर वापस जाएँ",
      backQuestions: "प्रश्नों पर वापस जाएँ"
    }

  };

  /* =======================================================
     HELP CONTENT
     PART 1 CONTINUES IN THE NEXT BLOCK
  ======================================================= */

  const CONTENT = {    en: [

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
            q: "Is PETS & DOGUE advertising only for UK businesses?",
            a: "No. PETS & DOGUE is an online international platform. Advertising and collaboration opportunities are intended for businesses and brands from different countries."
          }
        ]
      }

    ],

    uk: [

      {
        id: "start",
        icon: "✦",
        title: "Початок роботи",
        description: "Що таке PETS & DOGUE та як користуватися платформою.",
        items: [
          {
            q: "Що таке PETS & DOGUE?",
            a: "PETS & DOGUE — це цифрова lifestyle-платформа для тварин і людей, які їх люблять. В одному місці вона об’єднує оригінальні історії, практичні поради, pet-friendly місця, здоров’я, моду, фотографію, спільноту, конкурси, допомогу тваринам, Marketplace, переваги для учасників і корисні сервіси."
          },
          {
            q: "Чи потрібен обліковий запис для користування PETS & DOGUE?",
            a: "Ні. Основний контент і функції PETS & DOGUE доступні відвідувачам без входу. Підписка надає доступ до знижок і спеціальних пропозицій та дозволяє учасникам розміщувати до 50 безкоштовних оголошень у Marketplace."
          },
          {
            q: "Що означають три лінії вгорі?",
            a: "Кнопка з трьома лініями відкриває меню Contents. Звідти можна переходити між розділами PETS & DOGUE, змінювати мову, входити в профіль або оформлювати підписку."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Мова",
        description: "Змініть мову платформи та збережіть свій вибір.",
        items: [
          {
            q: "Як змінити мову?",
            a: "Відкрийте меню Contents кнопкою з трьома лініями. У блоці Language виберіть потрібну мову. PETS & DOGUE запам’ятає ваш вибір."
          },
          {
            q: "Чи підтримує PETS & DOGUE арабську мову?",
            a: "Так. Для арабської мови підтримувані сторінки PETS & DOGUE використовують напрямок тексту справа наліво."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Знаходьте місця, користуйтеся картою, зберігайте місця та перевіряйте правила для тварин.",
        items: [
          {
            q: "Як працює Pet-Friendly Places?",
            a: "Відкрийте Pet-Friendly Places і дозвольте доступ до місцезнаходження або знайдіть місто, поштовий індекс чи район. Виберіть категорію та радіус пошуку. Місця з’являться у вигляді карток і позначок на карті."
          },
          {
            q: "Як додати pet-friendly місце?",
            a: "Відкрийте Pet-Friendly Places і виберіть Add place. Додайте інформацію саме про це місце або заклад."
          },
          {
            q: "Як зберегти місце?",
            a: "Натисніть сердечко на картці місця. Потім його можна знову знайти в Saved."
          },
          {
            q: "Як прокласти маршрут?",
            a: "Натисніть Route на картці місця. Далі можна скористатися Google Maps, Waze або Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Local Community",
        description: "Місцеві публікації та корисна інформація для власників тварин.",
        items: [
          {
            q: "Що таке Local Community?",
            a: "Local Community — це окремий розділ, не Pet-Friendly Places. Він призначений для місцевих публікацій, оновлень і корисної інформації для власників тварин у певній місцевості."
          },
          {
            q: "Local Community — це те саме, що Pet-Friendly Places?",
            a: "Ні. Конкретний заклад або місце належить до Pet-Friendly Places. Місцева публікація, оновлення або повідомлення спільноти належить до Local Community."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Купівля, продаж і переваги Marketplace для учасників.",
        items: [
          {
            q: "Що таке Marketplace?",
            a: "Marketplace — це розділ PETS & DOGUE для актуальних оголошень і пропозицій, пов’язаних із тваринами."
          },
          {
            q: "Яку перевагу в Marketplace отримують підписники?",
            a: "Підписники можуть розміщувати до 50 безкоштовних оголошень у Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Підписка та переваги",
        description: "Підписка, знижки та функції для учасників.",
        items: [
          {
            q: "Що я отримую з підпискою?",
            a: "Учасники отримують доступ до знижок і спеціальних пропозицій PETS & DOGUE та можуть розміщувати до 50 безкоштовних оголошень у Marketplace."
          },
          {
            q: "Чи можна користуватися PETS & DOGUE без підписки?",
            a: "Так. Основний контент і загальні функції платформи залишаються доступними відвідувачам."
          },
          {
            q: "Де увійти в профіль?",
            a: "Скористайтеся кнопкою Profile або відкрийте Contents і виберіть Sign In. Нові користувачі можуть вибрати Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Історії, фото та участь",
        description: "Edition, Cover Star, Articles, Photos, Fashion і Contests.",
        items: [
          {
            q: "Де знайти історії PETS & DOGUE?",
            a: "Використовуйте Edition та Articles для редакційних історій і матеріалів. Fashion і Health містять тематичний контент, а Photos присвячений візуальним матеріалам."
          },
          {
            q: "Що таке Cover Star?",
            a: "Cover Star дає тваринам можливість стати особливими зірками PETS & DOGUE."
          },
          {
            q: "Де знайти конкурси?",
            a: "Відкрийте Contests у навігації PETS & DOGUE або через меню Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Доступність та озвучення",
        description: "Як PETS & DOGUE озвучує текст.",
        items: [
          {
            q: "Як увімкнути озвучення тексту?",
            a: "Скористайтеся кнопкою динаміка на сторінках PETS & DOGUE, де доступна функція озвучення."
          },
          {
            q: "Як зупинити озвучення Місо?",
            a: "Натисніть кнопку динаміка у вікні допомоги. Повторне натискання запускає озвучення поточної інформації знову."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Для бізнесу та рекламодавців",
        description: "Реклама та співпраця з PETS & DOGUE.",
        items: [
          {
            q: "Чи може бізнес рекламуватися в PETS & DOGUE?",
            a: "Так. Відкрийте Advertise with us, щоб дізнатися про можливості для брендів і бізнесу."
          },
          {
            q: "Реклама PETS & DOGUE доступна лише бізнесам у Великій Британії?",
            a: "Ні. PETS & DOGUE — міжнародна онлайн-платформа. Можливості реклами та співпраці призначені для бізнесів і брендів з різних країн."
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
            a: "PETS & DOGUE — цифровая lifestyle-платформа для питомцев и людей, которые их любят. Здесь в одном месте собраны оригинальные истории, практические материалы, pet-friendly места, здоровье, мода, фотографии, сообщество, конкурсы, помощь животным, Marketplace, преимущества для участников и полезные сервисы."
          },
          {
            q: "Нужен ли аккаунт для использования PETS & DOGUE?",
            a: "Нет. Основной контент и общие функции PETS & DOGUE доступны посетителям без входа. Подписка даёт доступ к скидкам и специальным предложениям и позволяет участникам размещать до 50 бесплатных объявлений в Marketplace."
          },
          {
            q: "Что означают три полоски сверху?",
            a: "Кнопка с тремя полосками открывает меню Contents. Через него можно переходить между разделами PETS & DOGUE, менять язык, входить в профиль или оформлять подписку."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Язык",
        description: "Измените язык платформы и сохраните свой выбор.",
        items: [
          {
            q: "Как поменять язык?",
            a: "Откройте меню Contents кнопкой с тремя полосками. В блоке Language выберите нужный язык. PETS & DOGUE запомнит ваш выбор."
          },
          {
            q: "Поддерживает ли PETS & DOGUE арабский язык?",
            a: "Да. Для арабского языка поддерживаемые страницы PETS & DOGUE используют направление текста справа налево."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Поиск мест, карта, сохранение мест и правила для животных.",
        items: [
          {
            q: "Как работает Pet-Friendly Places?",
            a: "Откройте Pet-Friendly Places и разрешите доступ к местоположению или найдите город, почтовый индекс или район. Выберите категорию и радиус поиска. Места появятся в виде карточек и отметок на карте."
          },
          {
            q: "Как добавить pet-friendly место?",
            a: "Откройте Pet-Friendly Places и выберите Add place. Добавьте информацию о конкретном месте или заведении."
          },
          {
            q: "Как сохранить место?",
            a: "Нажмите сердечко на карточке места. Позже его можно снова найти в Saved."
          },
          {
            q: "Как построить маршрут?",
            a: "Нажмите Route на карточке места. Затем можно продолжить через Google Maps, Waze или Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Local Community",
        description: "Локальные публикации и полезная информация для владельцев животных.",
        items: [
          {
            q: "Что такое Local Community?",
            a: "Local Community — отдельный раздел, не Pet-Friendly Places. Он предназначен для местных публикаций, обновлений и полезной информации для владельцев животных в определённой местности."
          },
          {
            q: "Local Community — это то же самое, что Pet-Friendly Places?",
            a: "Нет. Конкретное заведение или место относится к Pet-Friendly Places. Локальная публикация, обновление или сообщение сообщества относится к Local Community."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Покупка, продажа и преимущества Marketplace для участников.",
        items: [
          {
            q: "Что такое Marketplace?",
            a: "Marketplace — раздел PETS & DOGUE для актуальных объявлений и предложений, связанных с питомцами."
          },
          {
            q: "Какое преимущество в Marketplace получают подписчики?",
            a: "Подписчики могут размещать до 50 бесплатных объявлений в Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Подписка и преимущества",
        description: "Подписка, скидки и функции для участников.",
        items: [
          {
            q: "Что я получаю с подпиской?",
            a: "Участники получают доступ к скидкам и специальным предложениям PETS & DOGUE и могут размещать до 50 бесплатных объявлений в Marketplace."
          },
          {
            q: "Можно ли пользоваться PETS & DOGUE без подписки?",
            a: "Да. Основной контент и общие функции платформы остаются доступными посетителям."
          },
          {
            q: "Где войти в профиль?",
            a: "Используйте кнопку Profile или откройте Contents и выберите Sign In. Новые пользователи могут выбрать Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Истории, фото и участие",
        description: "Edition, Cover Star, Articles, Photos, Fashion и Contests.",
        items: [
          {
            q: "Где найти истории PETS & DOGUE?",
            a: "Используйте Edition и Articles для редакционных историй и материалов. Fashion и Health содержат тематический контент, а Photos посвящён визуальным материалам."
          },
          {
            q: "Что такое Cover Star?",
            a: "Cover Star даёт питомцам возможность стать особыми звёздами PETS & DOGUE."
          },
          {
            q: "Где найти конкурсы?",
            a: "Откройте Contests в навигации PETS & DOGUE или через меню Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Доступность и озвучивание",
        description: "Как PETS & DOGUE читает текст вслух.",
        items: [
          {
            q: "Как включить озвучивание текста?",
            a: "Используйте кнопку динамика на страницах PETS & DOGUE, где доступна функция озвучивания."
          },
          {
            q: "Как остановить озвучивание Мисо?",
            a: "Нажмите кнопку динамика в окне помощи. Повторное нажатие снова запускает озвучивание текущей информации."
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
            q: "Может ли бизнес рекламироваться в PETS & DOGUE?",
            a: "Да. Откройте Advertise with us, чтобы узнать о возможностях для брендов и бизнеса."
          },
          {
            q: "Реклама PETS & DOGUE доступна только бизнесам из Великобритании?",
            a: "Нет. PETS & DOGUE — международная онлайн-платформа. Возможности рекламы и сотрудничества предназначены для бизнесов и брендов из разных стран."
          }
        ]
      }

    ],    fr: [

      {
        id: "start",
        icon: "✦",
        title: "Bien démarrer",
        description: "Découvrez PETS & DOGUE et comment utiliser la plateforme.",
        items: [
          {
            q: "Qu’est-ce que PETS & DOGUE ?",
            a: "PETS & DOGUE est une plateforme lifestyle numérique pour les animaux et les personnes qui les aiment. Elle réunit au même endroit des histoires originales, des guides pratiques, des lieux pet-friendly, la santé, la mode, la photographie, la communauté, les concours, le sauvetage, Marketplace, les avantages membres et des services utiles."
          },
          {
            q: "Ai-je besoin d’un compte pour utiliser PETS & DOGUE ?",
            a: "Non. Le contenu général et les principales fonctionnalités de PETS & DOGUE sont accessibles aux visiteurs sans connexion. L’abonnement donne accès aux réductions et offres spéciales et permet aux membres de publier jusqu’à 50 annonces gratuites sur Marketplace."
          },
          {
            q: "À quoi servent les trois lignes en haut ?",
            a: "Le bouton à trois lignes ouvre le menu Contents. Vous pouvez y accéder aux différentes sections de PETS & DOGUE, changer la langue, vous connecter ou vous abonner."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Langue",
        description: "Changez la langue de la plateforme et conservez votre sélection.",
        items: [
          {
            q: "Comment changer la langue ?",
            a: "Ouvrez le menu Contents avec le bouton à trois lignes. Dans Language, sélectionnez la langue souhaitée. PETS & DOGUE mémorise votre choix."
          },
          {
            q: "PETS & DOGUE prend-il en charge l’arabe ?",
            a: "Oui. Les pages PETS & DOGUE compatibles utilisent une mise en page de droite à gauche pour l’arabe."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Trouvez des lieux, utilisez la carte, enregistrez vos favoris et consultez les règles concernant les animaux.",
        items: [
          {
            q: "Comment fonctionne Pet-Friendly Places ?",
            a: "Ouvrez Pet-Friendly Places et autorisez l’accès à votre position ou recherchez une ville, un code postal ou une zone. Choisissez une catégorie et un rayon de recherche. Les lieux apparaissent sous forme de fiches et de repères sur la carte."
          },
          {
            q: "Comment ajouter un lieu pet-friendly ?",
            a: "Ouvrez Pet-Friendly Places et choisissez Add place. Ajoutez les informations concernant précisément ce lieu ou cet établissement."
          },
          {
            q: "Comment enregistrer un lieu ?",
            a: "Appuyez sur le cœur de la fiche du lieu. Vous pourrez ensuite le retrouver dans Saved."
          },
          {
            q: "Comment obtenir un itinéraire ?",
            a: "Appuyez sur Route sur la fiche du lieu. Vous pouvez ensuite continuer avec Google Maps, Waze ou Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Communauté locale",
        description: "Publications locales et informations utiles pour les propriétaires d’animaux.",
        items: [
          {
            q: "Qu’est-ce que la Communauté locale ?",
            a: "La Communauté locale est distincte de Pet-Friendly Places. Elle est destinée aux publications locales, aux actualités et aux informations utiles pour les propriétaires d’animaux dans une zone donnée."
          },
          {
            q: "La Communauté locale est-elle la même chose que Pet-Friendly Places ?",
            a: "Non. Un établissement ou un lieu précis appartient à Pet-Friendly Places. Une publication locale, une actualité ou un message de la communauté appartient à la Communauté locale."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Achat, vente et avantages Marketplace pour les membres.",
        items: [
          {
            q: "Qu’est-ce que Marketplace ?",
            a: "Marketplace est l’espace PETS & DOGUE consacré aux annonces et offres pertinentes liées aux animaux."
          },
          {
            q: "Quel avantage Marketplace les abonnés reçoivent-ils ?",
            a: "Les abonnés peuvent publier jusqu’à 50 annonces gratuites sur Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Abonnement et avantages",
        description: "Abonnement, réductions et fonctionnalités réservées aux membres.",
        items: [
          {
            q: "Que comprend l’abonnement ?",
            a: "Les membres ont accès aux réductions et offres spéciales PETS & DOGUE et peuvent publier jusqu’à 50 annonces gratuites sur Marketplace."
          },
          {
            q: "Puis-je utiliser PETS & DOGUE sans abonnement ?",
            a: "Oui. Le contenu général et les principales fonctionnalités de la plateforme restent accessibles aux visiteurs."
          },
          {
            q: "Où puis-je me connecter ?",
            a: "Utilisez Profile ou ouvrez Contents et choisissez Sign In. Les nouveaux utilisateurs peuvent choisir Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Histoires, photos et participation",
        description: "Edition, Cover Star, Articles, Photos, Fashion et Contests.",
        items: [
          {
            q: "Où trouver les histoires PETS & DOGUE ?",
            a: "Utilisez Edition et Articles pour les histoires éditoriales et les guides. Fashion et Health proposent du contenu spécialisé, tandis que Photos est consacré aux contenus visuels."
          },
          {
            q: "Qu’est-ce que Cover Star ?",
            a: "Cover Star permet aux animaux de devenir des stars spéciales de PETS & DOGUE."
          },
          {
            q: "Où trouver les concours ?",
            a: "Ouvrez Contests depuis la navigation PETS & DOGUE ou le menu Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Accessibilité et audio",
        description: "Comment PETS & DOGUE lit le contenu à voix haute.",
        items: [
          {
            q: "Comment faire lire le texte à voix haute ?",
            a: "Utilisez le bouton haut-parleur sur les pages PETS & DOGUE compatibles avec la lecture audio."
          },
          {
            q: "Comment arrêter Miso de parler ?",
            a: "Appuyez sur le bouton haut-parleur dans l’aide. Appuyez de nouveau pour relancer la lecture des informations actuellement affichées."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Entreprises et annonceurs",
        description: "Publicité et collaboration avec PETS & DOGUE.",
        items: [
          {
            q: "Une entreprise peut-elle faire de la publicité sur PETS & DOGUE ?",
            a: "Oui. Ouvrez Advertise with us pour découvrir les possibilités proposées aux marques et aux entreprises."
          },
          {
            q: "La publicité PETS & DOGUE est-elle réservée aux entreprises britanniques ?",
            a: "Non. PETS & DOGUE est une plateforme internationale en ligne. Les possibilités de publicité et de collaboration sont destinées aux entreprises et aux marques de différents pays."
          }
        ]
      }

    ],

    de: [

      {
        id: "start",
        icon: "✦",
        title: "Erste Schritte",
        description: "Was PETS & DOGUE ist und wie die Plattform funktioniert.",
        items: [
          {
            q: "Was ist PETS & DOGUE?",
            a: "PETS & DOGUE ist eine digitale Lifestyle-Plattform für Haustiere und die Menschen, die sie lieben. Sie vereint Originalgeschichten, praktische Ratgeber, tierfreundliche Orte, Gesundheit, Mode, Fotografie, Community, Wettbewerbe, Tierrettung, Marketplace, Mitgliedervorteile und nützliche Services an einem Ort."
          },
          {
            q: "Brauche ich ein Konto, um PETS & DOGUE zu nutzen?",
            a: "Nein. Allgemeine Inhalte und Funktionen von PETS & DOGUE sind für Besucher ohne Anmeldung verfügbar. Ein Abonnement bietet Zugang zu Rabatten und Sonderangeboten und ermöglicht Mitgliedern, bis zu 50 kostenlose Anzeigen auf Marketplace zu veröffentlichen."
          },
          {
            q: "Was bedeuten die drei Linien oben?",
            a: "Die Schaltfläche mit den drei Linien öffnet das Menü Contents. Dort können Sie zwischen den Bereichen von PETS & DOGUE wechseln, die Sprache ändern, sich anmelden oder ein Abonnement abschließen."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Sprache",
        description: "Ändern Sie die Sprache der Plattform und speichern Sie Ihre Auswahl.",
        items: [
          {
            q: "Wie ändere ich die Sprache?",
            a: "Öffnen Sie Contents über die Schaltfläche mit den drei Linien. Wählen Sie unter Language die gewünschte Sprache aus. PETS & DOGUE merkt sich Ihre Auswahl."
          },
          {
            q: "Unterstützt PETS & DOGUE Arabisch?",
            a: "Ja. Unterstützte PETS & DOGUE-Seiten verwenden für Arabisch ein Layout von rechts nach links."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Orte finden, Karte verwenden, Orte speichern und Regeln für Tiere prüfen.",
        items: [
          {
            q: "Wie funktioniert Pet-Friendly Places?",
            a: "Öffnen Sie Pet-Friendly Places und erlauben Sie den Standortzugriff oder suchen Sie nach einer Stadt, Postleitzahl oder Gegend. Wählen Sie eine Kategorie und einen Suchradius. Orte erscheinen als Karten und Markierungen auf der Karte."
          },
          {
            q: "Wie füge ich einen tierfreundlichen Ort hinzu?",
            a: "Öffnen Sie Pet-Friendly Places und wählen Sie Add place. Fügen Sie Informationen über den konkreten Ort oder Betrieb hinzu."
          },
          {
            q: "Wie speichere ich einen Ort?",
            a: "Tippen Sie auf das Herz auf der Ortskarte. Später finden Sie den Ort unter Saved wieder."
          },
          {
            q: "Wie erhalte ich eine Route?",
            a: "Tippen Sie auf Route auf der Ortskarte. Anschließend können Sie Google Maps, Waze oder Apple Maps verwenden."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Lokale Community",
        description: "Lokale Beiträge und nützliche Informationen für Tierhalter.",
        items: [
          {
            q: "Was ist die Lokale Community?",
            a: "Die Lokale Community ist von Pet-Friendly Places getrennt. Sie ist für lokale Beiträge, Neuigkeiten und nützliche Informationen für Tierhalter in einer bestimmten Gegend gedacht."
          },
          {
            q: "Ist die Lokale Community dasselbe wie Pet-Friendly Places?",
            a: "Nein. Ein bestimmter Betrieb oder Ort gehört zu Pet-Friendly Places. Ein lokaler Beitrag, eine Neuigkeit oder eine Community-Nachricht gehört zur Lokalen Community."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Kaufen, verkaufen und Marketplace-Vorteile für Mitglieder.",
        items: [
          {
            q: "Was ist Marketplace?",
            a: "Marketplace ist der PETS & DOGUE-Bereich für relevante Anzeigen und Angebote rund um Haustiere."
          },
          {
            q: "Welchen Marketplace-Vorteil erhalten Abonnenten?",
            a: "Abonnenten können bis zu 50 kostenlose Anzeigen auf Marketplace veröffentlichen."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Mitgliedschaft und Vorteile",
        description: "Abonnement, Rabatte und Funktionen für Mitglieder.",
        items: [
          {
            q: "Was erhalte ich mit einem Abonnement?",
            a: "Mitglieder erhalten Zugang zu PETS & DOGUE-Rabatten und Sonderangeboten und können bis zu 50 kostenlose Anzeigen auf Marketplace veröffentlichen."
          },
          {
            q: "Kann ich PETS & DOGUE ohne Abonnement nutzen?",
            a: "Ja. Allgemeine Inhalte und Funktionen der Plattform bleiben für Besucher verfügbar."
          },
          {
            q: "Wo kann ich mich anmelden?",
            a: "Verwenden Sie Profile oder öffnen Sie Contents und wählen Sie Sign In. Neue Nutzer können Subscribe wählen."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Geschichten, Fotos und Mitmachen",
        description: "Edition, Cover Star, Articles, Photos, Fashion und Contests.",
        items: [
          {
            q: "Wo finde ich PETS & DOGUE-Geschichten?",
            a: "Nutzen Sie Edition und Articles für redaktionelle Geschichten und Ratgeber. Fashion und Health enthalten spezielle Inhalte, während Photos visuelle Beiträge zeigt."
          },
          {
            q: "Was ist Cover Star?",
            a: "Cover Star gibt Haustieren die Möglichkeit, besondere Stars von PETS & DOGUE zu werden."
          },
          {
            q: "Wo finde ich Wettbewerbe?",
            a: "Öffnen Sie Contests über die PETS & DOGUE-Navigation oder das Menü Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Barrierefreiheit und Audio",
        description: "So liest PETS & DOGUE Inhalte vor.",
        items: [
          {
            q: "Wie kann ich Text vorlesen lassen?",
            a: "Verwenden Sie die Lautsprecher-Schaltfläche auf unterstützten PETS & DOGUE-Seiten."
          },
          {
            q: "Wie stoppe ich Miso beim Sprechen?",
            a: "Tippen Sie im Hilfebereich auf die Lautsprecher-Schaltfläche. Tippen Sie erneut, um die aktuell angezeigten Informationen wieder vorlesen zu lassen."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Für Unternehmen und Werbekunden",
        description: "Werbung und Zusammenarbeit mit PETS & DOGUE.",
        items: [
          {
            q: "Kann ein Unternehmen bei PETS & DOGUE werben?",
            a: "Ja. Öffnen Sie Advertise with us, um Informationen zu Möglichkeiten für Marken und Unternehmen zu erhalten."
          },
          {
            q: "Ist Werbung bei PETS & DOGUE nur für britische Unternehmen verfügbar?",
            a: "Nein. PETS & DOGUE ist eine internationale Online-Plattform. Werbe- und Kooperationsmöglichkeiten richten sich an Unternehmen und Marken aus verschiedenen Ländern."
          }
        ]
      }

    ],

    es: [

      {
        id: "start",
        icon: "✦",
        title: "Primeros pasos",
        description: "Qué es PETS & DOGUE y cómo utilizar la plataforma.",
        items: [
          {
            q: "¿Qué es PETS & DOGUE?",
            a: "PETS & DOGUE es una plataforma digital de estilo de vida para mascotas y las personas que las quieren. Reúne en un solo lugar historias originales, guías prácticas, lugares pet-friendly, salud, moda, fotografía, comunidad, concursos, rescate, Marketplace, beneficios para miembros y servicios útiles."
          },
          {
            q: "¿Necesito una cuenta para usar PETS & DOGUE?",
            a: "No. El contenido general y las funciones principales de PETS & DOGUE están disponibles para los visitantes sin iniciar sesión. La suscripción ofrece acceso a descuentos y ofertas especiales y permite a los miembros publicar hasta 50 anuncios gratuitos en Marketplace."
          },
          {
            q: "¿Qué significan las tres líneas de la parte superior?",
            a: "El botón de tres líneas abre el menú Contents. Desde allí puedes moverte entre las secciones de PETS & DOGUE, cambiar el idioma, iniciar sesión o suscribirte."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Idioma",
        description: "Cambia el idioma de la plataforma y conserva tu selección.",
        items: [
          {
            q: "¿Cómo cambio el idioma?",
            a: "Abre el menú Contents con el botón de tres líneas. En Language selecciona el idioma que quieras. PETS & DOGUE recordará tu elección."
          },
          {
            q: "¿PETS & DOGUE admite árabe?",
            a: "Sí. Las páginas compatibles de PETS & DOGUE utilizan un diseño de derecha a izquierda para el árabe."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Encuentra lugares, utiliza el mapa, guarda sitios y consulta las normas para mascotas.",
        items: [
          {
            q: "¿Cómo funciona Pet-Friendly Places?",
            a: "Abre Pet-Friendly Places y permite el acceso a tu ubicación o busca una ciudad, código postal o zona. Elige una categoría y un radio de búsqueda. Los lugares aparecerán como tarjetas y marcadores en el mapa."
          },
          {
            q: "¿Cómo añado un lugar pet-friendly?",
            a: "Abre Pet-Friendly Places y selecciona Add place. Añade información sobre el lugar o establecimiento concreto."
          },
          {
            q: "¿Cómo guardo un lugar?",
            a: "Pulsa el corazón de la tarjeta del lugar. Después podrás encontrarlo de nuevo en Saved."
          },
          {
            q: "¿Cómo obtengo indicaciones?",
            a: "Pulsa Route en la tarjeta del lugar. Después puedes continuar con Google Maps, Waze o Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Comunidad local",
        description: "Publicaciones locales e información útil para propietarios de mascotas.",
        items: [
          {
            q: "¿Qué es la Comunidad local?",
            a: "La Comunidad local es independiente de Pet-Friendly Places. Está destinada a publicaciones locales, novedades e información útil para propietarios de mascotas de una zona."
          },
          {
            q: "¿La Comunidad local es lo mismo que Pet-Friendly Places?",
            a: "No. Un establecimiento o lugar concreto pertenece a Pet-Friendly Places. Una publicación local, una actualización o un mensaje de la comunidad pertenece a la Comunidad local."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Compra, venta y beneficios de Marketplace para miembros.",
        items: [
          {
            q: "¿Qué es Marketplace?",
            a: "Marketplace es el área de PETS & DOGUE para anuncios y ofertas relevantes relacionados con mascotas."
          },
          {
            q: "¿Qué beneficio de Marketplace reciben los suscriptores?",
            a: "Los suscriptores pueden publicar hasta 50 anuncios gratuitos en Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Suscripción y beneficios",
        description: "Suscripción, descuentos y funciones para miembros.",
        items: [
          {
            q: "¿Qué obtengo con una suscripción?",
            a: "Los miembros tienen acceso a descuentos y ofertas especiales de PETS & DOGUE y pueden publicar hasta 50 anuncios gratuitos en Marketplace."
          },
          {
            q: "¿Puedo utilizar PETS & DOGUE sin suscripción?",
            a: "Sí. El contenido general y las funciones principales de la plataforma siguen disponibles para los visitantes."
          },
          {
            q: "¿Dónde inicio sesión?",
            a: "Utiliza Profile o abre Contents y selecciona Sign In. Los nuevos usuarios pueden seleccionar Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Historias, fotos y participación",
        description: "Edition, Cover Star, Articles, Photos, Fashion y Contests.",
        items: [
          {
            q: "¿Dónde encuentro las historias de PETS & DOGUE?",
            a: "Utiliza Edition y Articles para historias editoriales y guías. Fashion y Health contienen contenido especializado, mientras que Photos está dedicado al contenido visual."
          },
          {
            q: "¿Qué es Cover Star?",
            a: "Cover Star ofrece a las mascotas la oportunidad de convertirse en estrellas especiales de PETS & DOGUE."
          },
          {
            q: "¿Dónde encuentro los concursos?",
            a: "Abre Contests desde la navegación de PETS & DOGUE o desde el menú Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Accesibilidad y audio",
        description: "Cómo PETS & DOGUE lee el contenido en voz alta.",
        items: [
          {
            q: "¿Cómo hago que PETS & DOGUE lea el texto en voz alta?",
            a: "Utiliza el botón del altavoz en las páginas compatibles de PETS & DOGUE."
          },
          {
            q: "¿Cómo hago que Miso deje de hablar?",
            a: "Pulsa el botón del altavoz en Ayuda. Vuelve a pulsarlo para iniciar de nuevo la lectura de la información que estás viendo."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Para empresas y anunciantes",
        description: "Publicidad y colaboración con PETS & DOGUE.",
        items: [
          {
            q: "¿Puede una empresa anunciarse en PETS & DOGUE?",
            a: "Sí. Abre Advertise with us para conocer las oportunidades disponibles para marcas y empresas."
          },
          {
            q: "¿La publicidad de PETS & DOGUE es solo para empresas del Reino Unido?",
            a: "No. PETS & DOGUE es una plataforma internacional online. Las oportunidades de publicidad y colaboración están pensadas para empresas y marcas de diferentes países."
          }
        ]
      }

    ],    it: [

      {
        id: "start",
        icon: "✦",
        title: "Per iniziare",
        description: "Cos’è PETS & DOGUE e come utilizzare la piattaforma.",
        items: [
          {
            q: "Cos’è PETS & DOGUE?",
            a: "PETS & DOGUE è una piattaforma digitale lifestyle per gli animali e le persone che li amano. Riunisce in un unico spazio storie originali, guide pratiche, luoghi pet-friendly, salute, moda, fotografia, community, concorsi, aiuto agli animali, Marketplace, vantaggi per i membri e servizi utili."
          },
          {
            q: "Serve un account per usare PETS & DOGUE?",
            a: "No. I contenuti generali e le principali funzioni di PETS & DOGUE sono disponibili ai visitatori senza effettuare l’accesso. L’abbonamento offre accesso a sconti e offerte speciali e consente ai membri di pubblicare fino a 50 annunci gratuiti su Marketplace."
          },
          {
            q: "Cosa significano le tre linee in alto?",
            a: "Il pulsante con le tre linee apre il menu Contents. Da lì puoi spostarti tra le sezioni di PETS & DOGUE, cambiare lingua, accedere oppure abbonarti."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Lingua",
        description: "Cambia la lingua della piattaforma e conserva la tua scelta.",
        items: [
          {
            q: "Come cambio la lingua?",
            a: "Apri il menu Contents con il pulsante a tre linee. In Language seleziona la lingua desiderata. PETS & DOGUE ricorderà la tua scelta."
          },
          {
            q: "PETS & DOGUE supporta l’arabo?",
            a: "Sì. Le pagine PETS & DOGUE supportate utilizzano un layout da destra a sinistra quando è selezionato l’arabo."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Trova luoghi, usa la mappa, salva i preferiti e controlla le regole per gli animali.",
        items: [
          {
            q: "Come funziona Pet-Friendly Places?",
            a: "Apri Pet-Friendly Places e consenti l’accesso alla posizione oppure cerca una città, un codice postale o una zona. Scegli una categoria e un raggio di ricerca. I luoghi appariranno come schede e indicatori sulla mappa."
          },
          {
            q: "Come aggiungo un luogo pet-friendly?",
            a: "Apri Pet-Friendly Places e scegli Add place. Inserisci le informazioni relative al luogo o alla struttura specifica."
          },
          {
            q: "Come salvo un luogo?",
            a: "Tocca il cuore sulla scheda del luogo. Potrai ritrovarlo successivamente in Saved."
          },
          {
            q: "Come ottengo le indicazioni stradali?",
            a: "Tocca Route sulla scheda del luogo. Puoi poi continuare con Google Maps, Waze oppure Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Community locale",
        description: "Post locali e informazioni utili per chi vive con animali.",
        items: [
          {
            q: "Cos’è la Community locale?",
            a: "La Community locale è separata da Pet-Friendly Places. È dedicata a post locali, aggiornamenti e informazioni utili condivise con chi vive con animali in una determinata zona."
          },
          {
            q: "La Community locale è la stessa cosa di Pet-Friendly Places?",
            a: "No. Una struttura o un luogo specifico appartiene a Pet-Friendly Places. Un post locale, un aggiornamento o un messaggio della community appartiene alla Community locale."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Acquisti, vendite e vantaggi Marketplace per i membri.",
        items: [
          {
            q: "Cos’è Marketplace?",
            a: "Marketplace è l’area di PETS & DOGUE dedicata agli annunci e alle offerte pertinenti al mondo degli animali."
          },
          {
            q: "Quale vantaggio Marketplace ricevono gli abbonati?",
            a: "Gli abbonati possono pubblicare fino a 50 annunci gratuiti su Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Abbonamento e vantaggi",
        description: "Abbonamento, sconti e funzioni per i membri.",
        items: [
          {
            q: "Cosa ottengo con l’abbonamento?",
            a: "I membri hanno accesso agli sconti e alle offerte speciali di PETS & DOGUE e possono pubblicare fino a 50 annunci gratuiti su Marketplace."
          },
          {
            q: "Posso usare PETS & DOGUE senza abbonamento?",
            a: "Sì. I contenuti generali e le principali funzioni della piattaforma restano disponibili ai visitatori."
          },
          {
            q: "Dove posso accedere?",
            a: "Usa Profile oppure apri Contents e scegli Sign In. I nuovi utenti possono scegliere Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Storie, foto e partecipazione",
        description: "Edition, Cover Star, Articles, Photos, Fashion e Contests.",
        items: [
          {
            q: "Dove trovo le storie di PETS & DOGUE?",
            a: "Usa Edition e Articles per storie editoriali e guide. Fashion e Health contengono contenuti tematici, mentre Photos è dedicato alle storie visive."
          },
          {
            q: "Cos’è Cover Star?",
            a: "Cover Star offre agli animali la possibilità di diventare protagonisti speciali di PETS & DOGUE."
          },
          {
            q: "Dove trovo i concorsi?",
            a: "Apri Contests dalla navigazione di PETS & DOGUE oppure dal menu Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Accessibilità e audio",
        description: "Come PETS & DOGUE legge i contenuti ad alta voce.",
        items: [
          {
            q: "Come faccio a far leggere il testo ad alta voce?",
            a: "Usa il pulsante dell’altoparlante nelle pagine PETS & DOGUE che supportano la funzione di lettura."
          },
          {
            q: "Come faccio a interrompere la voce di Miso?",
            a: "Tocca il pulsante dell’altoparlante nella finestra Aiuto. Toccalo nuovamente per avviare la lettura delle informazioni attualmente visualizzate."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Per aziende e inserzionisti",
        description: "Pubblicità e collaborazioni con PETS & DOGUE.",
        items: [
          {
            q: "Un’azienda può fare pubblicità su PETS & DOGUE?",
            a: "Sì. Apri Advertise with us per scoprire le opportunità disponibili per aziende e brand."
          },
          {
            q: "La pubblicità su PETS & DOGUE è riservata alle aziende del Regno Unito?",
            a: "No. PETS & DOGUE è una piattaforma online internazionale. Le opportunità pubblicitarie e di collaborazione sono pensate per aziende e brand di diversi Paesi."
          }
        ]
      }

    ],

    pt: [

      {
        id: "start",
        icon: "✦",
        title: "Primeiros passos",
        description: "O que é a PETS & DOGUE e como utilizar a plataforma.",
        items: [
          {
            q: "O que é a PETS & DOGUE?",
            a: "A PETS & DOGUE é uma plataforma digital de lifestyle para animais e para as pessoas que os amam. Reúne num só lugar histórias originais, guias práticos, locais pet-friendly, saúde, moda, fotografia, comunidade, concursos, ajuda a animais, Marketplace, benefícios para membros e serviços úteis."
          },
          {
            q: "Preciso de uma conta para utilizar a PETS & DOGUE?",
            a: "Não. O conteúdo geral e as principais funcionalidades da PETS & DOGUE estão disponíveis aos visitantes sem iniciar sessão. A subscrição dá acesso a descontos e ofertas especiais e permite aos membros publicar até 50 anúncios gratuitos no Marketplace."
          },
          {
            q: "O que significam as três linhas no topo?",
            a: "O botão com três linhas abre o menu Contents. A partir daí pode navegar entre as secções da PETS & DOGUE, alterar o idioma, iniciar sessão ou subscrever."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Idioma",
        description: "Altere o idioma da plataforma e mantenha a sua escolha.",
        items: [
          {
            q: "Como altero o idioma?",
            a: "Abra o menu Contents através do botão com três linhas. Em Language, selecione o idioma pretendido. A PETS & DOGUE memoriza a sua escolha."
          },
          {
            q: "A PETS & DOGUE suporta árabe?",
            a: "Sim. As páginas compatíveis da PETS & DOGUE utilizam uma disposição da direita para a esquerda quando o árabe está selecionado."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Encontre locais, utilize o mapa, guarde locais e consulte as regras para animais.",
        items: [
          {
            q: "Como funciona o Pet-Friendly Places?",
            a: "Abra Pet-Friendly Places e permita o acesso à sua localização ou pesquise uma cidade, código postal ou zona. Escolha uma categoria e um raio de pesquisa. Os locais aparecem como cartões e marcadores no mapa."
          },
          {
            q: "Como adiciono um local pet-friendly?",
            a: "Abra Pet-Friendly Places e escolha Add place. Adicione informações sobre o local ou estabelecimento específico."
          },
          {
            q: "Como guardo um local?",
            a: "Toque no coração no cartão do local. Depois poderá encontrá-lo novamente em Saved."
          },
          {
            q: "Como obtenho indicações?",
            a: "Toque em Route no cartão do local. Depois pode continuar através do Google Maps, Waze ou Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Comunidade local",
        description: "Publicações locais e informações úteis para quem tem animais.",
        items: [
          {
            q: "O que é a Comunidade local?",
            a: "A Comunidade local é separada de Pet-Friendly Places. Destina-se a publicações locais, atualizações e informações úteis partilhadas com pessoas que têm animais numa determinada zona."
          },
          {
            q: "A Comunidade local é igual a Pet-Friendly Places?",
            a: "Não. Um estabelecimento ou local específico pertence a Pet-Friendly Places. Uma publicação local, atualização ou mensagem da comunidade pertence à Comunidade local."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Compra, venda e benefícios do Marketplace para membros.",
        items: [
          {
            q: "O que é o Marketplace?",
            a: "Marketplace é a área da PETS & DOGUE destinada a anúncios e ofertas relevantes relacionados com animais."
          },
          {
            q: "Que benefício do Marketplace recebem os subscritores?",
            a: "Os subscritores podem publicar até 50 anúncios gratuitos no Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Subscrição e benefícios",
        description: "Subscrição, descontos e funcionalidades para membros.",
        items: [
          {
            q: "O que recebo com uma subscrição?",
            a: "Os membros têm acesso a descontos e ofertas especiais da PETS & DOGUE e podem publicar até 50 anúncios gratuitos no Marketplace."
          },
          {
            q: "Posso utilizar a PETS & DOGUE sem subscrição?",
            a: "Sim. O conteúdo geral e as principais funcionalidades da plataforma continuam disponíveis aos visitantes."
          },
          {
            q: "Onde inicio sessão?",
            a: "Utilize Profile ou abra Contents e escolha Sign In. Os novos utilizadores podem escolher Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Histórias, fotografias e participação",
        description: "Edition, Cover Star, Articles, Photos, Fashion e Contests.",
        items: [
          {
            q: "Onde encontro as histórias da PETS & DOGUE?",
            a: "Utilize Edition e Articles para histórias editoriais e guias. Fashion e Health apresentam conteúdos temáticos, enquanto Photos é dedicado aos conteúdos visuais."
          },
          {
            q: "O que é Cover Star?",
            a: "Cover Star dá aos animais a oportunidade de se tornarem estrelas especiais da PETS & DOGUE."
          },
          {
            q: "Onde encontro os concursos?",
            a: "Abra Contests através da navegação da PETS & DOGUE ou do menu Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Acessibilidade e áudio",
        description: "Como a PETS & DOGUE lê os conteúdos em voz alta.",
        items: [
          {
            q: "Como faço para ouvir o texto em voz alta?",
            a: "Utilize o botão do altifalante nas páginas da PETS & DOGUE que suportam a funcionalidade de leitura."
          },
          {
            q: "Como faço a Miso parar de falar?",
            a: "Toque no botão do altifalante na Ajuda. Toque novamente para iniciar a leitura das informações atualmente apresentadas."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Para empresas e anunciantes",
        description: "Publicidade e colaboração com a PETS & DOGUE.",
        items: [
          {
            q: "Uma empresa pode anunciar na PETS & DOGUE?",
            a: "Sim. Abra Advertise with us para conhecer as oportunidades disponíveis para marcas e empresas."
          },
          {
            q: "A publicidade da PETS & DOGUE destina-se apenas a empresas do Reino Unido?",
            a: "Não. A PETS & DOGUE é uma plataforma online internacional. As oportunidades de publicidade e colaboração destinam-se a empresas e marcas de diferentes países."
          }
        ]
      }

    ],

    nl: [

      {
        id: "start",
        icon: "✦",
        title: "Aan de slag",
        description: "Wat PETS & DOGUE is en hoe je het platform gebruikt.",
        items: [
          {
            q: "Wat is PETS & DOGUE?",
            a: "PETS & DOGUE is een digitaal lifestyleplatform voor huisdieren en de mensen die van hen houden. Het brengt originele verhalen, praktische gidsen, huisdiervriendelijke plekken, gezondheid, mode, fotografie, community, wedstrijden, dierenhulp, Marketplace, ledenvoordelen en nuttige diensten samen op één plek."
          },
          {
            q: "Heb ik een account nodig om PETS & DOGUE te gebruiken?",
            a: "Nee. Algemene content en de belangrijkste functies van PETS & DOGUE zijn zonder inloggen beschikbaar voor bezoekers. Een abonnement geeft toegang tot kortingen en speciale aanbiedingen en laat leden tot 50 gratis advertenties op Marketplace plaatsen."
          },
          {
            q: "Wat betekenen de drie lijnen bovenaan?",
            a: "De knop met drie lijnen opent het menu Contents. Van daaruit kun je tussen PETS & DOGUE-onderdelen navigeren, de taal wijzigen, inloggen of een abonnement nemen."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Taal",
        description: "Wijzig de taal van het platform en bewaar je keuze.",
        items: [
          {
            q: "Hoe wijzig ik de taal?",
            a: "Open Contents met de knop met drie lijnen. Selecteer onder Language de gewenste taal. PETS & DOGUE onthoudt je keuze."
          },
          {
            q: "Ondersteunt PETS & DOGUE Arabisch?",
            a: "Ja. Ondersteunde PETS & DOGUE-pagina’s gebruiken voor Arabisch een indeling van rechts naar links."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Vind plekken, gebruik de kaart, bewaar locaties en controleer de regels voor huisdieren.",
        items: [
          {
            q: "Hoe werkt Pet-Friendly Places?",
            a: "Open Pet-Friendly Places en geef toegang tot je locatie of zoek op stad, postcode of gebied. Kies een categorie en zoekafstand. Plekken verschijnen als kaarten en markeringen op de kaart."
          },
          {
            q: "Hoe voeg ik een huisdiervriendelijke plek toe?",
            a: "Open Pet-Friendly Places en kies Add place. Voeg informatie toe over de specifieke locatie of onderneming."
          },
          {
            q: "Hoe bewaar ik een plek?",
            a: "Tik op het hartje op de kaart van de locatie. Je kunt deze later terugvinden onder Saved."
          },
          {
            q: "Hoe krijg ik een route?",
            a: "Tik op Route op de kaart van de locatie. Daarna kun je doorgaan met Google Maps, Waze of Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Lokale community",
        description: "Lokale berichten en nuttige informatie voor huisdiereigenaren.",
        items: [
          {
            q: "Wat is de Lokale community?",
            a: "De Lokale community staat los van Pet-Friendly Places. Deze is bedoeld voor lokale berichten, updates en nuttige informatie voor huisdiereigenaren in een bepaald gebied."
          },
          {
            q: "Is de Lokale community hetzelfde als Pet-Friendly Places?",
            a: "Nee. Een specifieke zaak of locatie hoort bij Pet-Friendly Places. Een lokaal bericht, een update of een communitybericht hoort bij de Lokale community."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Kopen, verkopen en Marketplace-voordelen voor leden.",
        items: [
          {
            q: "Wat is Marketplace?",
            a: "Marketplace is het PETS & DOGUE-gedeelte voor relevante advertenties en aanbiedingen rond huisdieren."
          },
          {
            q: "Welk Marketplace-voordeel krijgen abonnees?",
            a: "Abonnees kunnen tot 50 gratis advertenties op Marketplace plaatsen."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Lidmaatschap en voordelen",
        description: "Abonnement, kortingen en functies voor leden.",
        items: [
          {
            q: "Wat krijg ik met een abonnement?",
            a: "Leden krijgen toegang tot PETS & DOGUE-kortingen en speciale aanbiedingen en kunnen tot 50 gratis advertenties op Marketplace plaatsen."
          },
          {
            q: "Kan ik PETS & DOGUE zonder abonnement gebruiken?",
            a: "Ja. Algemene content en de belangrijkste functies van het platform blijven beschikbaar voor bezoekers."
          },
          {
            q: "Waar kan ik inloggen?",
            a: "Gebruik Profile of open Contents en kies Sign In. Nieuwe gebruikers kunnen Subscribe kiezen."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Verhalen, foto's en deelname",
        description: "Edition, Cover Star, Articles, Photos, Fashion en Contests.",
        items: [
          {
            q: "Waar vind ik PETS & DOGUE-verhalen?",
            a: "Gebruik Edition en Articles voor redactionele verhalen en gidsen. Fashion en Health bevatten gespecialiseerde content, terwijl Photos gericht is op visuele verhalen."
          },
          {
            q: "Wat is Cover Star?",
            a: "Cover Star geeft huisdieren de kans om bijzondere sterren van PETS & DOGUE te worden."
          },
          {
            q: "Waar vind ik wedstrijden?",
            a: "Open Contests via de PETS & DOGUE-navigatie of het menu Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Toegankelijkheid en audio",
        description: "Hoe PETS & DOGUE content hardop voorleest.",
        items: [
          {
            q: "Hoe laat ik PETS & DOGUE tekst hardop voorlezen?",
            a: "Gebruik de luidsprekerknop op PETS & DOGUE-pagina’s die voorlezen ondersteunen."
          },
          {
            q: "Hoe laat ik Miso stoppen met spreken?",
            a: "Tik op de luidsprekerknop in Help. Tik opnieuw om de momenteel weergegeven informatie weer te laten voorlezen."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Voor bedrijven en adverteerders",
        description: "Adverteren en samenwerken met PETS & DOGUE.",
        items: [
          {
            q: "Kan een bedrijf adverteren bij PETS & DOGUE?",
            a: "Ja. Open Advertise with us voor informatie over mogelijkheden voor merken en bedrijven."
          },
          {
            q: "Is adverteren bij PETS & DOGUE alleen voor Britse bedrijven?",
            a: "Nee. PETS & DOGUE is een internationaal online platform. Advertentie- en samenwerkingsmogelijkheden zijn bedoeld voor bedrijven en merken uit verschillende landen."
          }
        ]
      }

    ],

    pl: [

      {
        id: "start",
        icon: "✦",
        title: "Pierwsze kroki",
        description: "Czym jest PETS & DOGUE i jak korzystać z platformy.",
        items: [
          {
            q: "Czym jest PETS & DOGUE?",
            a: "PETS & DOGUE to cyfrowa platforma lifestyle dla zwierząt i ludzi, którzy je kochają. Łączy w jednym miejscu oryginalne historie, praktyczne poradniki, miejsca przyjazne zwierzętom, zdrowie, modę, fotografię, społeczność, konkursy, pomoc zwierzętom, Marketplace, korzyści dla członków i przydatne usługi."
          },
          {
            q: "Czy potrzebuję konta, aby korzystać z PETS & DOGUE?",
            a: "Nie. Ogólne treści i główne funkcje PETS & DOGUE są dostępne dla odwiedzających bez logowania. Subskrypcja daje dostęp do zniżek i ofert specjalnych oraz pozwala członkom publikować do 50 bezpłatnych ogłoszeń w Marketplace."
          },
          {
            q: "Co oznaczają trzy linie u góry?",
            a: "Przycisk z trzema liniami otwiera menu Contents. Możesz z niego przechodzić między sekcjami PETS & DOGUE, zmieniać język, logować się lub wykupić subskrypcję."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Język",
        description: "Zmień język platformy i zachowaj swój wybór.",
        items: [
          {
            q: "Jak zmienić język?",
            a: "Otwórz menu Contents przyciskiem z trzema liniami. W sekcji Language wybierz odpowiedni język. PETS & DOGUE zapamięta Twój wybór."
          },
          {
            q: "Czy PETS & DOGUE obsługuje język arabski?",
            a: "Tak. Obsługiwane strony PETS & DOGUE korzystają dla języka arabskiego z układu od prawej do lewej."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Znajduj miejsca, korzystaj z mapy, zapisuj lokalizacje i sprawdzaj zasady dotyczące zwierząt.",
        items: [
          {
            q: "Jak działa Pet-Friendly Places?",
            a: "Otwórz Pet-Friendly Places i zezwól na dostęp do lokalizacji albo wyszukaj miasto, kod pocztowy lub obszar. Wybierz kategorię i promień wyszukiwania. Miejsca pojawią się jako karty i znaczniki na mapie."
          },
          {
            q: "Jak dodać miejsce przyjazne zwierzętom?",
            a: "Otwórz Pet-Friendly Places i wybierz Add place. Dodaj informacje dotyczące konkretnego miejsca lub obiektu."
          },
          {
            q: "Jak zapisać miejsce?",
            a: "Naciśnij serce na karcie miejsca. Później znajdziesz je ponownie w Saved."
          },
          {
            q: "Jak wyznaczyć trasę?",
            a: "Naciśnij Route na karcie miejsca. Następnie możesz skorzystać z Google Maps, Waze lub Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Lokalna społeczność",
        description: "Lokalne posty i przydatne informacje dla opiekunów zwierząt.",
        items: [
          {
            q: "Czym jest Lokalna społeczność?",
            a: "Lokalna społeczność jest oddzielna od Pet-Friendly Places. Służy do lokalnych postów, aktualności i przydatnych informacji dla opiekunów zwierząt w danym obszarze."
          },
          {
            q: "Czy Lokalna społeczność to to samo co Pet-Friendly Places?",
            a: "Nie. Konkretny lokal lub miejsce należy do Pet-Friendly Places. Lokalny post, aktualizacja lub wiadomość społeczności należy do Lokalnej społeczności."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Kupowanie, sprzedawanie i korzyści Marketplace dla członków.",
        items: [
          {
            q: "Czym jest Marketplace?",
            a: "Marketplace to część PETS & DOGUE przeznaczona na odpowiednie ogłoszenia i oferty związane ze zwierzętami."
          },
          {
            q: "Jaką korzyść w Marketplace otrzymują subskrybenci?",
            a: "Subskrybenci mogą publikować do 50 bezpłatnych ogłoszeń w Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Członkostwo i korzyści",
        description: "Subskrypcja, zniżki i funkcje dla członków.",
        items: [
          {
            q: "Co otrzymuję dzięki subskrypcji?",
            a: "Członkowie otrzymują dostęp do zniżek i ofert specjalnych PETS & DOGUE oraz mogą publikować do 50 bezpłatnych ogłoszeń w Marketplace."
          },
          {
            q: "Czy mogę korzystać z PETS & DOGUE bez subskrypcji?",
            a: "Tak. Ogólne treści i główne funkcje platformy pozostają dostępne dla odwiedzających."
          },
          {
            q: "Gdzie mogę się zalogować?",
            a: "Użyj Profile albo otwórz Contents i wybierz Sign In. Nowi użytkownicy mogą wybrać Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Historie, zdjęcia i udział",
        description: "Edition, Cover Star, Articles, Photos, Fashion i Contests.",
        items: [
          {
            q: "Gdzie znajdę historie PETS & DOGUE?",
            a: "Korzystaj z Edition i Articles, aby czytać historie redakcyjne i poradniki. Fashion i Health zawierają treści tematyczne, a Photos skupia się na materiałach wizualnych."
          },
          {
            q: "Czym jest Cover Star?",
            a: "Cover Star daje zwierzętom możliwość zostania wyjątkowymi gwiazdami PETS & DOGUE."
          },
          {
            q: "Gdzie znajdę konkursy?",
            a: "Otwórz Contests z nawigacji PETS & DOGUE albo z menu Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Dostępność i audio",
        description: "Jak PETS & DOGUE odczytuje treści na głos.",
        items: [
          {
            q: "Jak włączyć odczytywanie tekstu na głos?",
            a: "Użyj przycisku głośnika na stronach PETS & DOGUE obsługujących funkcję odczytywania."
          },
          {
            q: "Jak zatrzymać głos Miso?",
            a: "Naciśnij przycisk głośnika w Pomocy. Naciśnij go ponownie, aby ponownie rozpocząć odczytywanie aktualnie wyświetlanych informacji."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Dla firm i reklamodawców",
        description: "Reklama i współpraca z PETS & DOGUE.",
        items: [
          {
            q: "Czy firma może reklamować się w PETS & DOGUE?",
            a: "Tak. Otwórz Advertise with us, aby poznać możliwości dostępne dla marek i firm."
          },
          {
            q: "Czy reklama w PETS & DOGUE jest tylko dla firm z Wielkiej Brytanii?",
            a: "Nie. PETS & DOGUE jest międzynarodową platformą internetową. Możliwości reklamy i współpracy są przeznaczone dla firm i marek z różnych krajów."
          }
        ]
      }

    ],    cs: [

      {
        id: "start",
        icon: "✦",
        title: "Začínáme",
        description: "Co je PETS & DOGUE a jak platformu používat.",
        items: [
          {
            q: "Co je PETS & DOGUE?",
            a: "PETS & DOGUE je digitální lifestyle platforma pro zvířata a lidi, kteří je milují. Na jednom místě spojuje originální příběhy, praktické průvodce, pet-friendly místa, zdraví, módu, fotografii, komunitu, soutěže, pomoc zvířatům, Marketplace, členské výhody a užitečné služby."
          },
          {
            q: "Potřebuji k používání PETS & DOGUE účet?",
            a: "Ne. Obecný obsah a hlavní funkce PETS & DOGUE jsou návštěvníkům dostupné bez přihlášení. Předplatné poskytuje přístup ke slevám a speciálním nabídkám a umožňuje členům zveřejnit až 50 bezplatných inzerátů na Marketplace."
          },
          {
            q: "Co znamenají tři čáry nahoře?",
            a: "Tlačítko se třemi čárami otevře nabídku Contents. Odtud můžete přecházet mezi sekcemi PETS & DOGUE, změnit jazyk, přihlásit se nebo si aktivovat předplatné."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Jazyk",
        description: "Změňte jazyk platformy a zachovejte svůj výběr.",
        items: [
          {
            q: "Jak změním jazyk?",
            a: "Otevřete nabídku Contents tlačítkem se třemi čárami. V části Language vyberte požadovaný jazyk. PETS & DOGUE si váš výběr zapamatuje."
          },
          {
            q: "Podporuje PETS & DOGUE arabštinu?",
            a: "Ano. Podporované stránky PETS & DOGUE používají pro arabštinu rozložení zprava doleva."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Najděte místa, používejte mapu, ukládejte místa a kontrolujte pravidla pro zvířata.",
        items: [
          {
            q: "Jak funguje Pet-Friendly Places?",
            a: "Otevřete Pet-Friendly Places a povolte přístup k poloze nebo vyhledejte město, PSČ či oblast. Vyberte kategorii a okruh vyhledávání. Místa se zobrazí jako karty a značky na mapě."
          },
          {
            q: "Jak přidám pet-friendly místo?",
            a: "Otevřete Pet-Friendly Places a zvolte Add place. Přidejte informace o konkrétním místě nebo podniku."
          },
          {
            q: "Jak uložím místo?",
            a: "Klepněte na srdce na kartě místa. Později jej znovu najdete v Saved."
          },
          {
            q: "Jak získám trasu?",
            a: "Klepněte na Route na kartě místa. Poté můžete pokračovat pomocí Google Maps, Waze nebo Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Místní komunita",
        description: "Místní příspěvky a užitečné informace pro majitele zvířat.",
        items: [
          {
            q: "Co je Místní komunita?",
            a: "Místní komunita je oddělená od Pet-Friendly Places. Slouží pro místní příspěvky, aktuality a užitečné informace pro majitele zvířat v dané oblasti."
          },
          {
            q: "Je Místní komunita totéž jako Pet-Friendly Places?",
            a: "Ne. Konkrétní podnik nebo místo patří do Pet-Friendly Places. Místní příspěvek, aktualita nebo zpráva komunity patří do Místní komunity."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Nákup, prodej a výhody Marketplace pro členy.",
        items: [
          {
            q: "Co je Marketplace?",
            a: "Marketplace je část PETS & DOGUE určená pro relevantní inzeráty a nabídky související se zvířaty."
          },
          {
            q: "Jakou výhodu Marketplace mají předplatitelé?",
            a: "Předplatitelé mohou zveřejnit až 50 bezplatných inzerátů na Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Členství a výhody",
        description: "Předplatné, slevy a členské funkce.",
        items: [
          {
            q: "Co získám s předplatným?",
            a: "Členové získají přístup ke slevám a speciálním nabídkám PETS & DOGUE a mohou zveřejnit až 50 bezplatných inzerátů na Marketplace."
          },
          {
            q: "Mohu PETS & DOGUE používat bez předplatného?",
            a: "Ano. Obecný obsah a hlavní funkce platformy zůstávají návštěvníkům dostupné."
          },
          {
            q: "Kde se přihlásím?",
            a: "Použijte Profile nebo otevřete Contents a zvolte Sign In. Noví uživatelé mohou zvolit Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Příběhy, fotografie a zapojení",
        description: "Edition, Cover Star, Articles, Photos, Fashion a Contests.",
        items: [
          {
            q: "Kde najdu příběhy PETS & DOGUE?",
            a: "Pro redakční příběhy a průvodce použijte Edition a Articles. Fashion a Health obsahují tematický obsah, zatímco Photos se zaměřuje na vizuální příběhy."
          },
          {
            q: "Co je Cover Star?",
            a: "Cover Star dává zvířatům možnost stát se výjimečnými hvězdami PETS & DOGUE."
          },
          {
            q: "Kde najdu soutěže?",
            a: "Otevřete Contests v navigaci PETS & DOGUE nebo v nabídce Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Přístupnost a audio",
        description: "Jak PETS & DOGUE čte obsah nahlas.",
        items: [
          {
            q: "Jak zapnu čtení textu nahlas?",
            a: "Použijte tlačítko reproduktoru na stránkách PETS & DOGUE, které podporují hlasité čtení."
          },
          {
            q: "Jak zastavím Miso při čtení?",
            a: "Klepněte na tlačítko reproduktoru v nápovědě. Dalším klepnutím znovu spustíte čtení právě zobrazených informací."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Pro firmy a inzerenty",
        description: "Reklama a spolupráce s PETS & DOGUE.",
        items: [
          {
            q: "Může firma inzerovat na PETS & DOGUE?",
            a: "Ano. Otevřete Advertise with us a zjistěte možnosti pro značky a firmy."
          },
          {
            q: "Je reklama na PETS & DOGUE pouze pro britské firmy?",
            a: "Ne. PETS & DOGUE je mezinárodní online platforma. Možnosti reklamy a spolupráce jsou určeny firmám a značkám z různých zemí."
          }
        ]
      }

    ],

    sk: [

      {
        id: "start",
        icon: "✦",
        title: "Začíname",
        description: "Čo je PETS & DOGUE a ako používať platformu.",
        items: [
          {
            q: "Čo je PETS & DOGUE?",
            a: "PETS & DOGUE je digitálna lifestyle platforma pre zvieratá a ľudí, ktorí ich milujú. Na jednom mieste spája originálne príbehy, praktické návody, pet-friendly miesta, zdravie, módu, fotografiu, komunitu, súťaže, pomoc zvieratám, Marketplace, členské výhody a užitočné služby."
          },
          {
            q: "Potrebujem na používanie PETS & DOGUE účet?",
            a: "Nie. Všeobecný obsah a hlavné funkcie PETS & DOGUE sú návštevníkom dostupné bez prihlásenia. Predplatné poskytuje prístup k zľavám a špeciálnym ponukám a umožňuje členom zverejniť až 50 bezplatných inzerátov na Marketplace."
          },
          {
            q: "Čo znamenajú tri čiary hore?",
            a: "Tlačidlo s tromi čiarami otvorí menu Contents. Odtiaľ môžete prechádzať medzi sekciami PETS & DOGUE, zmeniť jazyk, prihlásiť sa alebo si aktivovať predplatné."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Jazyk",
        description: "Zmeňte jazyk platformy a zachovajte svoj výber.",
        items: [
          {
            q: "Ako zmením jazyk?",
            a: "Otvorte menu Contents tlačidlom s tromi čiarami. V časti Language vyberte požadovaný jazyk. PETS & DOGUE si váš výber zapamätá."
          },
          {
            q: "Podporuje PETS & DOGUE arabčinu?",
            a: "Áno. Podporované stránky PETS & DOGUE používajú pre arabčinu rozloženie sprava doľava."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Nájdite miesta, používajte mapu, ukladajte miesta a kontrolujte pravidlá pre zvieratá.",
        items: [
          {
            q: "Ako funguje Pet-Friendly Places?",
            a: "Otvorte Pet-Friendly Places a povoľte prístup k polohe alebo vyhľadajte mesto, PSČ či oblasť. Vyberte kategóriu a okruh vyhľadávania. Miesta sa zobrazia ako karty a značky na mape."
          },
          {
            q: "Ako pridám pet-friendly miesto?",
            a: "Otvorte Pet-Friendly Places a vyberte Add place. Pridajte informácie o konkrétnom mieste alebo prevádzke."
          },
          {
            q: "Ako uložím miesto?",
            a: "Ťuknite na srdce na karte miesta. Neskôr ho opäť nájdete v Saved."
          },
          {
            q: "Ako získam trasu?",
            a: "Ťuknite na Route na karte miesta. Potom môžete pokračovať cez Google Maps, Waze alebo Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Miestna komunita",
        description: "Miestne príspevky a užitočné informácie pre majiteľov zvierat.",
        items: [
          {
            q: "Čo je Miestna komunita?",
            a: "Miestna komunita je oddelená od Pet-Friendly Places. Slúži na miestne príspevky, aktuality a užitočné informácie pre majiteľov zvierat v určitej oblasti."
          },
          {
            q: "Je Miestna komunita to isté ako Pet-Friendly Places?",
            a: "Nie. Konkrétna prevádzka alebo miesto patrí do Pet-Friendly Places. Miestny príspevok, aktualita alebo správa komunity patrí do Miestnej komunity."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Nákup, predaj a výhody Marketplace pre členov.",
        items: [
          {
            q: "Čo je Marketplace?",
            a: "Marketplace je časť PETS & DOGUE určená na relevantné inzeráty a ponuky súvisiace so zvieratami."
          },
          {
            q: "Akú výhodu Marketplace získajú predplatitelia?",
            a: "Predplatitelia môžu zverejniť až 50 bezplatných inzerátov na Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Členstvo a výhody",
        description: "Predplatné, zľavy a členské funkcie.",
        items: [
          {
            q: "Čo získam s predplatným?",
            a: "Členovia získajú prístup k zľavám a špeciálnym ponukám PETS & DOGUE a môžu zverejniť až 50 bezplatných inzerátov na Marketplace."
          },
          {
            q: "Môžem PETS & DOGUE používať bez predplatného?",
            a: "Áno. Všeobecný obsah a hlavné funkcie platformy zostávajú návštevníkom dostupné."
          },
          {
            q: "Kde sa prihlásim?",
            a: "Použite Profile alebo otvorte Contents a vyberte Sign In. Noví používatelia môžu vybrať Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Príbehy, fotografie a zapojenie",
        description: "Edition, Cover Star, Articles, Photos, Fashion a Contests.",
        items: [
          {
            q: "Kde nájdem príbehy PETS & DOGUE?",
            a: "Na redakčné príbehy a návody použite Edition a Articles. Fashion a Health obsahujú tematický obsah, zatiaľ čo Photos sa zameriava na vizuálne príbehy."
          },
          {
            q: "Čo je Cover Star?",
            a: "Cover Star dáva zvieratám možnosť stať sa výnimočnými hviezdami PETS & DOGUE."
          },
          {
            q: "Kde nájdem súťaže?",
            a: "Otvorte Contests v navigácii PETS & DOGUE alebo v menu Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Prístupnosť a audio",
        description: "Ako PETS & DOGUE číta obsah nahlas.",
        items: [
          {
            q: "Ako zapnem čítanie textu nahlas?",
            a: "Použite tlačidlo reproduktora na stránkach PETS & DOGUE, ktoré podporujú hlasné čítanie."
          },
          {
            q: "Ako zastavím Miso pri čítaní?",
            a: "Ťuknite na tlačidlo reproduktora v Pomoci. Ďalším ťuknutím znovu spustíte čítanie aktuálne zobrazených informácií."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Pre firmy a inzerentov",
        description: "Reklama a spolupráca s PETS & DOGUE.",
        items: [
          {
            q: "Môže firma inzerovať na PETS & DOGUE?",
            a: "Áno. Otvorte Advertise with us a pozrite si možnosti pre značky a firmy."
          },
          {
            q: "Je reklama na PETS & DOGUE iba pre britské firmy?",
            a: "Nie. PETS & DOGUE je medzinárodná online platforma. Možnosti reklamy a spolupráce sú určené firmám a značkám z rôznych krajín."
          }
        ]
      }

    ],

    hu: [

      {
        id: "start",
        icon: "✦",
        title: "Első lépések",
        description: "Mi a PETS & DOGUE, és hogyan használható a platform.",
        items: [
          {
            q: "Mi a PETS & DOGUE?",
            a: "A PETS & DOGUE egy digitális lifestyle platform háziállatok és az őket szerető emberek számára. Egy helyen egyesíti az eredeti történeteket, gyakorlati útmutatókat, állatbarát helyeket, egészséggel, divattal és fotózással kapcsolatos tartalmakat, a közösséget, versenyeket, állatmentést, a Marketplace felületet, tagsági előnyöket és hasznos szolgáltatásokat."
          },
          {
            q: "Szükségem van fiókra a PETS & DOGUE használatához?",
            a: "Nem. A PETS & DOGUE általános tartalmai és fő funkciói bejelentkezés nélkül is elérhetők. Az előfizetés kedvezményekhez és különleges ajánlatokhoz biztosít hozzáférést, és lehetővé teszi a tagok számára, hogy legfeljebb 50 ingyenes Marketplace-hirdetést tegyenek közzé."
          },
          {
            q: "Mit jelent a három vonal felül?",
            a: "A három vonalas gomb megnyitja a Contents menüt. Innen válthat a PETS & DOGUE részei között, módosíthatja a nyelvet, bejelentkezhet vagy előfizethet."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Nyelv",
        description: "Módosítsa a platform nyelvét, és őrizze meg a választását.",
        items: [
          {
            q: "Hogyan módosíthatom a nyelvet?",
            a: "Nyissa meg a Contents menüt a három vonalas gombbal. A Language résznél válassza ki a kívánt nyelvet. A PETS & DOGUE megjegyzi a választását."
          },
          {
            q: "A PETS & DOGUE támogatja az arab nyelvet?",
            a: "Igen. A támogatott PETS & DOGUE-oldalak arab nyelven jobbról balra haladó elrendezést használnak."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Keressen helyeket, használja a térképet, mentse a helyeket és ellenőrizze az állatokra vonatkozó szabályokat.",
        items: [
          {
            q: "Hogyan működik a Pet-Friendly Places?",
            a: "Nyissa meg a Pet-Friendly Places részt, és engedélyezze a helyadatok használatát, vagy keressen városra, irányítószámra vagy területre. Válasszon kategóriát és keresési sugarat. A helyek kártyák és térképes jelölők formájában jelennek meg."
          },
          {
            q: "Hogyan adhatok hozzá állatbarát helyet?",
            a: "Nyissa meg a Pet-Friendly Places részt, és válassza az Add place lehetőséget. Adja meg az adott helyre vagy vállalkozásra vonatkozó információkat."
          },
          {
            q: "Hogyan menthetek el egy helyet?",
            a: "Koppintson a hely kártyáján lévő szívre. Később a Saved résznél ismét megtalálhatja."
          },
          {
            q: "Hogyan tervezhetek útvonalat?",
            a: "Koppintson a hely kártyáján a Route lehetőségre. Ezután használhatja a Google Maps, a Waze vagy az Apple Maps alkalmazást."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Helyi közösség",
        description: "Helyi bejegyzések és hasznos információk állattartóknak.",
        items: [
          {
            q: "Mi a Helyi közösség?",
            a: "A Helyi közösség különálló a Pet-Friendly Places résztől. Helyi bejegyzések, frissítések és az adott környék állattartói számára hasznos információk megosztására szolgál."
          },
          {
            q: "A Helyi közösség ugyanaz, mint a Pet-Friendly Places?",
            a: "Nem. Egy konkrét vállalkozás vagy hely a Pet-Friendly Places részhez tartozik. Egy helyi bejegyzés, frissítés vagy közösségi üzenet a Helyi közösséghez tartozik."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Vásárlás, eladás és Marketplace-előnyök a tagok számára.",
        items: [
          {
            q: "Mi a Marketplace?",
            a: "A Marketplace a PETS & DOGUE állatokkal kapcsolatos releváns hirdetéseknek és ajánlatoknak szánt része."
          },
          {
            q: "Milyen Marketplace-előnyt kapnak az előfizetők?",
            a: "Az előfizetők legfeljebb 50 ingyenes hirdetést tehetnek közzé a Marketplace felületén."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Tagság és előnyök",
        description: "Előfizetés, kedvezmények és tagsági funkciók.",
        items: [
          {
            q: "Mit kapok az előfizetéssel?",
            a: "A tagok hozzáférnek a PETS & DOGUE kedvezményeihez és különleges ajánlataihoz, és legfeljebb 50 ingyenes Marketplace-hirdetést tehetnek közzé."
          },
          {
            q: "Használhatom a PETS & DOGUE-t előfizetés nélkül?",
            a: "Igen. A platform általános tartalmai és fő funkciói továbbra is elérhetők a látogatók számára."
          },
          {
            q: "Hol jelentkezhetek be?",
            a: "Használja a Profile lehetőséget, vagy nyissa meg a Contents menüt, és válassza a Sign In lehetőséget. Az új felhasználók a Subscribe lehetőséget választhatják."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Történetek, fotók és részvétel",
        description: "Edition, Cover Star, Articles, Photos, Fashion és Contests.",
        items: [
          {
            q: "Hol találom a PETS & DOGUE történeteit?",
            a: "A szerkesztőségi történetekhez és útmutatókhoz használja az Edition és Articles részeket. A Fashion és Health tematikus tartalmakat kínál, míg a Photos a vizuális történetekre összpontosít."
          },
          {
            q: "Mi a Cover Star?",
            a: "A Cover Star lehetőséget ad az állatoknak, hogy a PETS & DOGUE különleges sztárjaivá váljanak."
          },
          {
            q: "Hol találom a versenyeket?",
            a: "Nyissa meg a Contests részt a PETS & DOGUE navigációjából vagy a Contents menüből."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Akadálymentesség és hang",
        description: "Hogyan olvassa fel a PETS & DOGUE a tartalmat.",
        items: [
          {
            q: "Hogyan olvastathatom fel a szöveget?",
            a: "Használja a hangszóró gombot azokon a PETS & DOGUE-oldalakon, amelyek támogatják a felolvasást."
          },
          {
            q: "Hogyan állíthatom le Miso felolvasását?",
            a: "Koppintson a hangszóró gombra a Súgóban. Újabb koppintással ismét elindíthatja az aktuálisan megjelenített információ felolvasását."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Vállalkozásoknak és hirdetőknek",
        description: "Hirdetés és együttműködés a PETS & DOGUE-val.",
        items: [
          {
            q: "Hirdethet egy vállalkozás a PETS & DOGUE-on?",
            a: "Igen. Nyissa meg az Advertise with us részt, ahol megismerheti a márkák és vállalkozások számára elérhető lehetőségeket."
          },
          {
            q: "A PETS & DOGUE hirdetési lehetőségei csak brit vállalkozásoknak szólnak?",
            a: "Nem. A PETS & DOGUE nemzetközi online platform. A hirdetési és együttműködési lehetőségek különböző országok vállalkozásai és márkái számára érhetők el."
          }
        ]
      }

    ],

    ro: [

      {
        id: "start",
        icon: "✦",
        title: "Primii pași",
        description: "Ce este PETS & DOGUE și cum se utilizează platforma.",
        items: [
          {
            q: "Ce este PETS & DOGUE?",
            a: "PETS & DOGUE este o platformă digitală de lifestyle pentru animale și oamenii care le iubesc. Reunește într-un singur loc povești originale, ghiduri practice, locuri pet-friendly, sănătate, modă, fotografie, comunitate, concursuri, ajutor pentru animale, Marketplace, beneficii pentru membri și servicii utile."
          },
          {
            q: "Am nevoie de un cont pentru a utiliza PETS & DOGUE?",
            a: "Nu. Conținutul general și funcțiile principale PETS & DOGUE sunt disponibile vizitatorilor fără autentificare. Abonamentul oferă acces la reduceri și oferte speciale și permite membrilor să publice până la 50 de anunțuri gratuite în Marketplace."
          },
          {
            q: "Ce înseamnă cele trei linii din partea de sus?",
            a: "Butonul cu trei linii deschide meniul Contents. De acolo puteți naviga între secțiunile PETS & DOGUE, schimba limba, vă puteți autentifica sau abona."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Limbă",
        description: "Schimbați limba platformei și păstrați selecția.",
        items: [
          {
            q: "Cum schimb limba?",
            a: "Deschideți meniul Contents cu butonul cu trei linii. În secțiunea Language selectați limba dorită. PETS & DOGUE va memora alegerea."
          },
          {
            q: "PETS & DOGUE acceptă limba arabă?",
            a: "Da. Paginile PETS & DOGUE compatibile folosesc pentru arabă o dispunere de la dreapta la stânga."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Găsiți locuri, utilizați harta, salvați locații și verificați regulile pentru animale.",
        items: [
          {
            q: "Cum funcționează Pet-Friendly Places?",
            a: "Deschideți Pet-Friendly Places și permiteți accesul la locație sau căutați un oraș, un cod poștal ori o zonă. Alegeți o categorie și o rază de căutare. Locurile vor apărea sub formă de carduri și marcaje pe hartă."
          },
          {
            q: "Cum adaug un loc pet-friendly?",
            a: "Deschideți Pet-Friendly Places și alegeți Add place. Adăugați informații despre locul sau unitatea respectivă."
          },
          {
            q: "Cum salvez un loc?",
            a: "Apăsați pe inimă pe cardul locului. Îl veți putea găsi din nou ulterior în Saved."
          },
          {
            q: "Cum obțin indicații de orientare?",
            a: "Apăsați Route pe cardul locului. Apoi puteți continua cu Google Maps, Waze sau Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Comunitatea locală",
        description: "Postări locale și informații utile pentru proprietarii de animale.",
        items: [
          {
            q: "Ce este Comunitatea locală?",
            a: "Comunitatea locală este separată de Pet-Friendly Places. Este destinată postărilor locale, actualizărilor și informațiilor utile pentru proprietarii de animale dintr-o anumită zonă."
          },
          {
            q: "Comunitatea locală este același lucru cu Pet-Friendly Places?",
            a: "Nu. O unitate sau un loc concret aparține de Pet-Friendly Places. O postare locală, o actualizare sau un mesaj al comunității aparține Comunității locale."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Cumpărare, vânzare și beneficii Marketplace pentru membri.",
        items: [
          {
            q: "Ce este Marketplace?",
            a: "Marketplace este zona PETS & DOGUE pentru anunțuri și oferte relevante legate de animale."
          },
          {
            q: "Ce beneficiu Marketplace primesc abonații?",
            a: "Abonații pot publica până la 50 de anunțuri gratuite în Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Abonament și beneficii",
        description: "Abonament, reduceri și funcții pentru membri.",
        items: [
          {
            q: "Ce primesc prin abonament?",
            a: "Membrii au acces la reducerile și ofertele speciale PETS & DOGUE și pot publica până la 50 de anunțuri gratuite în Marketplace."
          },
          {
            q: "Pot utiliza PETS & DOGUE fără abonament?",
            a: "Da. Conținutul general și funcțiile principale ale platformei rămân disponibile vizitatorilor."
          },
          {
            q: "Unde mă autentific?",
            a: "Utilizați Profile sau deschideți Contents și alegeți Sign In. Utilizatorii noi pot alege Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Povești, fotografii și participare",
        description: "Edition, Cover Star, Articles, Photos, Fashion și Contests.",
        items: [
          {
            q: "Unde găsesc poveștile PETS & DOGUE?",
            a: "Utilizați Edition și Articles pentru povești editoriale și ghiduri. Fashion și Health conțin materiale tematice, iar Photos se concentrează pe conținut vizual."
          },
          {
            q: "Ce este Cover Star?",
            a: "Cover Star oferă animalelor posibilitatea de a deveni vedete speciale PETS & DOGUE."
          },
          {
            q: "Unde găsesc concursurile?",
            a: "Deschideți Contests din navigarea PETS & DOGUE sau din meniul Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Accesibilitate și audio",
        description: "Cum citește PETS & DOGUE conținutul cu voce tare.",
        items: [
          {
            q: "Cum fac PETS & DOGUE să citească textul cu voce tare?",
            a: "Utilizați butonul difuzor pe paginile PETS & DOGUE care acceptă funcția de citire."
          },
          {
            q: "Cum opresc vocea lui Miso?",
            a: "Apăsați butonul difuzor din Ajutor. Apăsați-l din nou pentru a porni din nou citirea informațiilor afișate."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Pentru companii și agenți de publicitate",
        description: "Publicitate și colaborare cu PETS & DOGUE.",
        items: [
          {
            q: "Poate o companie să își facă publicitate pe PETS & DOGUE?",
            a: "Da. Deschideți Advertise with us pentru informații despre oportunitățile disponibile mărcilor și companiilor."
          },
          {
            q: "Publicitatea PETS & DOGUE este doar pentru companiile din Regatul Unit?",
            a: "Nu. PETS & DOGUE este o platformă online internațională. Oportunitățile de publicitate și colaborare sunt destinate companiilor și mărcilor din diferite țări."
          }
        ]
      }

    ],    bg: [

      {
        id: "start",
        icon: "✦",
        title: "Първи стъпки",
        description: "Какво е PETS & DOGUE и как да използвате платформата.",
        items: [
          {
            q: "Какво е PETS & DOGUE?",
            a: "PETS & DOGUE е дигитална lifestyle платформа за животни и хората, които ги обичат. Тя събира на едно място оригинални истории, практични ръководства, места, подходящи за домашни любимци, здраве, мода, фотография, общност, конкурси, помощ за животни, Marketplace, предимства за членове и полезни услуги."
          },
          {
            q: "Нужен ли ми е акаунт, за да използвам PETS & DOGUE?",
            a: "Не. Общото съдържание и основните функции на PETS & DOGUE са достъпни за посетители без вход. Абонаментът дава достъп до отстъпки и специални оферти и позволява на членовете да публикуват до 50 безплатни обяви в Marketplace."
          },
          {
            q: "Какво означават трите линии горе?",
            a: "Бутонът с трите линии отваря менюто Contents. Оттам можете да преминавате между разделите на PETS & DOGUE, да смените езика, да влезете в профила си или да се абонирате."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Език",
        description: "Променете езика на платформата и запазете избора си.",
        items: [
          {
            q: "Как да сменя езика?",
            a: "Отворете менюто Contents с бутона с трите линии. В Language изберете желания език. PETS & DOGUE ще запомни избора ви."
          },
          {
            q: "PETS & DOGUE поддържа ли арабски?",
            a: "Да. Поддържаните страници на PETS & DOGUE използват оформление отдясно наляво, когато е избран арабски език."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Намирайте места, използвайте картата, запазвайте места и проверявайте правилата за животни.",
        items: [
          {
            q: "Как работи Pet-Friendly Places?",
            a: "Отворете Pet-Friendly Places и разрешете достъп до местоположението си или потърсете град, пощенски код или район. Изберете категория и радиус на търсене. Местата ще се покажат като карти и маркери върху картата."
          },
          {
            q: "Как да добавя място, подходящо за домашни любимци?",
            a: "Отворете Pet-Friendly Places и изберете Add place. Добавете информация за конкретното място или обект."
          },
          {
            q: "Как да запазя място?",
            a: "Натиснете сърцето върху картата на мястото. По-късно ще го намерите отново в Saved."
          },
          {
            q: "Как да получа маршрут?",
            a: "Натиснете Route върху картата на мястото. След това можете да продължите с Google Maps, Waze или Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Местна общност",
        description: "Местни публикации и полезна информация за хора с животни.",
        items: [
          {
            q: "Какво е Местна общност?",
            a: "Местната общност е отделна от Pet-Friendly Places. Тя е предназначена за местни публикации, актуализации и полезна информация за хората с животни в определен район."
          },
          {
            q: "Местната общност същото ли е като Pet-Friendly Places?",
            a: "Не. Конкретен обект или място принадлежи към Pet-Friendly Places. Местна публикация, актуализация или съобщение от общността принадлежи към Местната общност."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Покупки, продажби и Marketplace предимства за членове.",
        items: [
          {
            q: "Какво е Marketplace?",
            a: "Marketplace е частта на PETS & DOGUE за подходящи обяви и предложения, свързани с животни."
          },
          {
            q: "Какво Marketplace предимство получават абонатите?",
            a: "Абонатите могат да публикуват до 50 безплатни обяви в Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Членство и предимства",
        description: "Абонамент, отстъпки и функции за членове.",
        items: [
          {
            q: "Какво получавам с абонамента?",
            a: "Членовете получават достъп до отстъпки и специални оферти на PETS & DOGUE и могат да публикуват до 50 безплатни обяви в Marketplace."
          },
          {
            q: "Мога ли да използвам PETS & DOGUE без абонамент?",
            a: "Да. Общото съдържание и основните функции на платформата остават достъпни за посетители."
          },
          {
            q: "Къде мога да вляза в профила си?",
            a: "Използвайте Profile или отворете Contents и изберете Sign In. Новите потребители могат да изберат Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Истории, снимки и участие",
        description: "Edition, Cover Star, Articles, Photos, Fashion и Contests.",
        items: [
          {
            q: "Къде да намеря историите на PETS & DOGUE?",
            a: "Използвайте Edition и Articles за редакционни истории и ръководства. Fashion и Health съдържат тематично съдържание, а Photos е посветено на визуални истории."
          },
          {
            q: "Какво е Cover Star?",
            a: "Cover Star дава възможност на животните да станат специални звезди на PETS & DOGUE."
          },
          {
            q: "Къде са конкурсите?",
            a: "Отворете Contests от навигацията на PETS & DOGUE или от менюто Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Достъпност и аудио",
        description: "Как PETS & DOGUE прочита съдържанието на глас.",
        items: [
          {
            q: "Как да накарам PETS & DOGUE да прочете текста на глас?",
            a: "Използвайте бутона с високоговорител на страниците на PETS & DOGUE, които поддържат функцията за четене."
          },
          {
            q: "Как да спра гласа на Miso?",
            a: "Натиснете бутона с високоговорител в Help. Натиснете го отново, за да стартирате четенето на показаната в момента информация."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "За бизнеси и рекламодатели",
        description: "Реклама и сътрудничество с PETS & DOGUE.",
        items: [
          {
            q: "Може ли бизнес да рекламира в PETS & DOGUE?",
            a: "Да. Отворете Advertise with us, за да видите възможностите за марки и бизнеси."
          },
          {
            q: "Рекламата в PETS & DOGUE само за британски компании ли е?",
            a: "Не. PETS & DOGUE е международна онлайн платформа. Възможностите за реклама и сътрудничество са предназначени за компании и марки от различни държави."
          }
        ]
      }

    ],

    el: [

      {
        id: "start",
        icon: "✦",
        title: "Ξεκινώντας",
        description: "Τι είναι το PETS & DOGUE και πώς χρησιμοποιείται η πλατφόρμα.",
        items: [
          {
            q: "Τι είναι το PETS & DOGUE;",
            a: "Το PETS & DOGUE είναι μια ψηφιακή lifestyle πλατφόρμα για ζώα και για τους ανθρώπους που τα αγαπούν. Συγκεντρώνει σε έναν χώρο πρωτότυπες ιστορίες, πρακτικούς οδηγούς, pet-friendly μέρη, υγεία, μόδα, φωτογραφία, κοινότητα, διαγωνισμούς, βοήθεια για ζώα, Marketplace, προνόμια μελών και χρήσιμες υπηρεσίες."
          },
          {
            q: "Χρειάζομαι λογαριασμό για να χρησιμοποιήσω το PETS & DOGUE;",
            a: "Όχι. Το γενικό περιεχόμενο και οι βασικές λειτουργίες του PETS & DOGUE είναι διαθέσιμα στους επισκέπτες χωρίς σύνδεση. Η συνδρομή παρέχει πρόσβαση σε εκπτώσεις και ειδικές προσφορές και επιτρέπει στα μέλη να δημοσιεύουν έως 50 δωρεάν αγγελίες στο Marketplace."
          },
          {
            q: "Τι σημαίνουν οι τρεις γραμμές επάνω;",
            a: "Το κουμπί με τις τρεις γραμμές ανοίγει το μενού Contents. Από εκεί μπορείτε να μετακινείστε μεταξύ των ενοτήτων του PETS & DOGUE, να αλλάζετε γλώσσα, να συνδέεστε ή να εγγράφεστε."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Γλώσσα",
        description: "Αλλάξτε τη γλώσσα της πλατφόρμας και διατηρήστε την επιλογή σας.",
        items: [
          {
            q: "Πώς αλλάζω γλώσσα;",
            a: "Ανοίξτε το μενού Contents με το κουμπί των τριών γραμμών. Στο Language επιλέξτε τη γλώσσα που θέλετε. Το PETS & DOGUE θα θυμάται την επιλογή σας."
          },
          {
            q: "Το PETS & DOGUE υποστηρίζει αραβικά;",
            a: "Ναι. Οι υποστηριζόμενες σελίδες του PETS & DOGUE χρησιμοποιούν διάταξη από δεξιά προς τα αριστερά όταν είναι επιλεγμένα τα αραβικά."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Βρείτε μέρη, χρησιμοποιήστε τον χάρτη, αποθηκεύστε τοποθεσίες και ελέγξτε τους κανόνες για ζώα.",
        items: [
          {
            q: "Πώς λειτουργεί το Pet-Friendly Places;",
            a: "Ανοίξτε το Pet-Friendly Places και επιτρέψτε την πρόσβαση στην τοποθεσία σας ή αναζητήστε πόλη, ταχυδρομικό κώδικα ή περιοχή. Επιλέξτε κατηγορία και ακτίνα αναζήτησης. Τα μέρη εμφανίζονται ως κάρτες και δείκτες στον χάρτη."
          },
          {
            q: "Πώς προσθέτω ένα pet-friendly μέρος;",
            a: "Ανοίξτε το Pet-Friendly Places και επιλέξτε Add place. Προσθέστε πληροφορίες για το συγκεκριμένο μέρος ή επιχείρηση."
          },
          {
            q: "Πώς αποθηκεύω ένα μέρος;",
            a: "Πατήστε την καρδιά στην κάρτα του μέρους. Αργότερα θα μπορείτε να το βρείτε ξανά στο Saved."
          },
          {
            q: "Πώς βρίσκω διαδρομή;",
            a: "Πατήστε Route στην κάρτα του μέρους. Στη συνέχεια μπορείτε να συνεχίσετε με Google Maps, Waze ή Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Τοπική κοινότητα",
        description: "Τοπικές δημοσιεύσεις και χρήσιμες πληροφορίες για ανθρώπους με ζώα.",
        items: [
          {
            q: "Τι είναι η Τοπική κοινότητα;",
            a: "Η Τοπική κοινότητα είναι ξεχωριστή από το Pet-Friendly Places. Προορίζεται για τοπικές δημοσιεύσεις, ενημερώσεις και χρήσιμες πληροφορίες για ανθρώπους με ζώα σε μια συγκεκριμένη περιοχή."
          },
          {
            q: "Η Τοπική κοινότητα είναι το ίδιο με το Pet-Friendly Places;",
            a: "Όχι. Μια συγκεκριμένη επιχείρηση ή τοποθεσία ανήκει στο Pet-Friendly Places. Μια τοπική δημοσίευση, ενημέρωση ή μήνυμα της κοινότητας ανήκει στην Τοπική κοινότητα."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Αγορές, πωλήσεις και προνόμια Marketplace για μέλη.",
        items: [
          {
            q: "Τι είναι το Marketplace;",
            a: "Το Marketplace είναι η περιοχή του PETS & DOGUE για σχετικές αγγελίες και προσφορές που αφορούν ζώα."
          },
          {
            q: "Ποιο προνόμιο Marketplace έχουν οι συνδρομητές;",
            a: "Οι συνδρομητές μπορούν να δημοσιεύουν έως 50 δωρεάν αγγελίες στο Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Συνδρομή και προνόμια",
        description: "Συνδρομή, εκπτώσεις και λειτουργίες για μέλη.",
        items: [
          {
            q: "Τι λαμβάνω με τη συνδρομή;",
            a: "Τα μέλη αποκτούν πρόσβαση σε εκπτώσεις και ειδικές προσφορές του PETS & DOGUE και μπορούν να δημοσιεύουν έως 50 δωρεάν αγγελίες στο Marketplace."
          },
          {
            q: "Μπορώ να χρησιμοποιώ το PETS & DOGUE χωρίς συνδρομή;",
            a: "Ναι. Το γενικό περιεχόμενο και οι βασικές λειτουργίες της πλατφόρμας παραμένουν διαθέσιμα στους επισκέπτες."
          },
          {
            q: "Πού μπορώ να συνδεθώ;",
            a: "Χρησιμοποιήστε το Profile ή ανοίξτε το Contents και επιλέξτε Sign In. Οι νέοι χρήστες μπορούν να επιλέξουν Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Ιστορίες, φωτογραφίες και συμμετοχή",
        description: "Edition, Cover Star, Articles, Photos, Fashion και Contests.",
        items: [
          {
            q: "Πού βρίσκω τις ιστορίες του PETS & DOGUE;",
            a: "Χρησιμοποιήστε τα Edition και Articles για συντακτικές ιστορίες και οδηγούς. Τα Fashion και Health περιλαμβάνουν θεματικό περιεχόμενο, ενώ το Photos εστιάζει σε οπτικές ιστορίες."
          },
          {
            q: "Τι είναι το Cover Star;",
            a: "Το Cover Star δίνει στα ζώα την ευκαιρία να γίνουν ξεχωριστοί πρωταγωνιστές του PETS & DOGUE."
          },
          {
            q: "Πού βρίσκω τους διαγωνισμούς;",
            a: "Ανοίξτε το Contests από την πλοήγηση του PETS & DOGUE ή από το μενού Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Προσβασιμότητα και ήχος",
        description: "Πώς το PETS & DOGUE διαβάζει το περιεχόμενο δυνατά.",
        items: [
          {
            q: "Πώς μπορώ να ακούσω το κείμενο;",
            a: "Χρησιμοποιήστε το κουμπί ηχείου στις σελίδες του PETS & DOGUE που υποστηρίζουν τη λειτουργία ανάγνωσης."
          },
          {
            q: "Πώς σταματώ τη Miso από το να μιλά;",
            a: "Πατήστε το κουμπί ηχείου στο Help. Πατήστε το ξανά για να ξεκινήσει πάλι η ανάγνωση των πληροφοριών που εμφανίζονται."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Για επιχειρήσεις και διαφημιζόμενους",
        description: "Διαφήμιση και συνεργασία με το PETS & DOGUE.",
        items: [
          {
            q: "Μπορεί μια επιχείρηση να διαφημιστεί στο PETS & DOGUE;",
            a: "Ναι. Ανοίξτε το Advertise with us για να δείτε τις διαθέσιμες ευκαιρίες για επιχειρήσεις και brands."
          },
          {
            q: "Η διαφήμιση στο PETS & DOGUE αφορά μόνο επιχειρήσεις του Ηνωμένου Βασιλείου;",
            a: "Όχι. Το PETS & DOGUE είναι μια διεθνής online πλατφόρμα. Οι ευκαιρίες διαφήμισης και συνεργασίας απευθύνονται σε επιχειρήσεις και brands από διαφορετικές χώρες."
          }
        ]
      }

    ],

    sv: [

      {
        id: "start",
        icon: "✦",
        title: "Kom igång",
        description: "Vad PETS & DOGUE är och hur du använder plattformen.",
        items: [
          {
            q: "Vad är PETS & DOGUE?",
            a: "PETS & DOGUE är en digital lifestyleplattform för husdjur och människorna som älskar dem. Den samlar originalberättelser, praktiska guider, djurvänliga platser, hälsa, mode, fotografi, community, tävlingar, hjälp till djur, Marketplace, medlemsförmåner och användbara tjänster på ett ställe."
          },
          {
            q: "Behöver jag ett konto för att använda PETS & DOGUE?",
            a: "Nej. Allmänt innehåll och plattformens viktigaste funktioner är tillgängliga för besökare utan inloggning. En prenumeration ger tillgång till rabatter och specialerbjudanden och låter medlemmar publicera upp till 50 kostnadsfria annonser på Marketplace."
          },
          {
            q: "Vad betyder de tre linjerna högst upp?",
            a: "Knappen med tre linjer öppnar menyn Contents. Därifrån kan du navigera mellan PETS & DOGUE-sektionerna, byta språk, logga in eller prenumerera."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Språk",
        description: "Byt plattformens språk och behåll ditt val.",
        items: [
          {
            q: "Hur byter jag språk?",
            a: "Öppna Contents med knappen med tre linjer. Välj önskat språk under Language. PETS & DOGUE kommer ihåg ditt val."
          },
          {
            q: "Stöder PETS & DOGUE arabiska?",
            a: "Ja. PETS & DOGUE-sidor som stöds använder en layout från höger till vänster när arabiska är valt."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Hitta platser, använd kartan, spara platser och kontrollera regler för djur.",
        items: [
          {
            q: "Hur fungerar Pet-Friendly Places?",
            a: "Öppna Pet-Friendly Places och tillåt åtkomst till din plats eller sök efter en stad, ett postnummer eller ett område. Välj kategori och sökradie. Platser visas som kort och markörer på kartan."
          },
          {
            q: "Hur lägger jag till en djurvänlig plats?",
            a: "Öppna Pet-Friendly Places och välj Add place. Lägg till information om den specifika platsen eller verksamheten."
          },
          {
            q: "Hur sparar jag en plats?",
            a: "Tryck på hjärtat på platskortet. Du kan hitta platsen igen senare under Saved."
          },
          {
            q: "Hur får jag en rutt?",
            a: "Tryck på Route på platskortet. Därefter kan du fortsätta med Google Maps, Waze eller Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Lokal community",
        description: "Lokala inlägg och användbar information för djurägare.",
        items: [
          {
            q: "Vad är Lokal community?",
            a: "Lokal community är separat från Pet-Friendly Places. Den är avsedd för lokala inlägg, uppdateringar och användbar information för djurägare i ett visst område."
          },
          {
            q: "Är Lokal community samma sak som Pet-Friendly Places?",
            a: "Nej. En specifik verksamhet eller plats hör hemma i Pet-Friendly Places. Ett lokalt inlägg, en uppdatering eller ett communitymeddelande hör hemma i Lokal community."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Köp, sälj och Marketplace-förmåner för medlemmar.",
        items: [
          {
            q: "Vad är Marketplace?",
            a: "Marketplace är PETS & DOGUE-området för relevanta annonser och erbjudanden som rör djur."
          },
          {
            q: "Vilken Marketplace-förmån får prenumeranter?",
            a: "Prenumeranter kan publicera upp till 50 kostnadsfria annonser på Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Medlemskap och förmåner",
        description: "Prenumeration, rabatter och medlemsfunktioner.",
        items: [
          {
            q: "Vad får jag med en prenumeration?",
            a: "Medlemmar får tillgång till PETS & DOGUE-rabatter och specialerbjudanden och kan publicera upp till 50 kostnadsfria annonser på Marketplace."
          },
          {
            q: "Kan jag använda PETS & DOGUE utan prenumeration?",
            a: "Ja. Plattformens allmänna innehåll och viktigaste funktioner förblir tillgängliga för besökare."
          },
          {
            q: "Var loggar jag in?",
            a: "Använd Profile eller öppna Contents och välj Sign In. Nya användare kan välja Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Berättelser, foton och deltagande",
        description: "Edition, Cover Star, Articles, Photos, Fashion och Contests.",
        items: [
          {
            q: "Var hittar jag PETS & DOGUE-berättelser?",
            a: "Använd Edition och Articles för redaktionella berättelser och guider. Fashion och Health innehåller tematiskt innehåll, medan Photos fokuserar på visuella berättelser."
          },
          {
            q: "Vad är Cover Star?",
            a: "Cover Star ger djur möjlighet att bli särskilda stjärnor hos PETS & DOGUE."
          },
          {
            q: "Var hittar jag tävlingarna?",
            a: "Öppna Contests från PETS & DOGUE-navigeringen eller från menyn Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Tillgänglighet och ljud",
        description: "Hur PETS & DOGUE läser innehåll högt.",
        items: [
          {
            q: "Hur får jag texten uppläst?",
            a: "Använd högtalarknappen på PETS & DOGUE-sidor som stöder uppläsning."
          },
          {
            q: "Hur får jag Miso att sluta prata?",
            a: "Tryck på högtalarknappen i Help. Tryck igen för att starta uppläsningen av informationen som visas."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "För företag och annonsörer",
        description: "Annonsering och samarbete med PETS & DOGUE.",
        items: [
          {
            q: "Kan ett företag annonsera hos PETS & DOGUE?",
            a: "Ja. Öppna Advertise with us för information om möjligheter för företag och varumärken."
          },
          {
            q: "Är annonsering hos PETS & DOGUE bara för brittiska företag?",
            a: "Nej. PETS & DOGUE är en internationell onlineplattform. Möjligheter till annonsering och samarbete är avsedda för företag och varumärken från olika länder."
          }
        ]
      }

    ],

    da: [

      {
        id: "start",
        icon: "✦",
        title: "Kom i gang",
        description: "Hvad PETS & DOGUE er, og hvordan platformen bruges.",
        items: [
          {
            q: "Hvad er PETS & DOGUE?",
            a: "PETS & DOGUE er en digital lifestyleplatform for kæledyr og de mennesker, der elsker dem. Den samler originale historier, praktiske guides, kæledyrsvenlige steder, sundhed, mode, fotografi, community, konkurrencer, hjælp til dyr, Marketplace, medlemsfordele og nyttige tjenester ét sted."
          },
          {
            q: "Skal jeg have en konto for at bruge PETS & DOGUE?",
            a: "Nej. Generelt indhold og platformens vigtigste funktioner er tilgængelige for besøgende uden login. Et abonnement giver adgang til rabatter og særlige tilbud og gør det muligt for medlemmer at offentliggøre op til 50 gratis annoncer på Marketplace."
          },
          {
            q: "Hvad betyder de tre linjer øverst?",
            a: "Knappen med tre linjer åbner menuen Contents. Herfra kan du navigere mellem PETS & DOGUE-sektionerne, skifte sprog, logge ind eller abonnere."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Sprog",
        description: "Skift platformens sprog, og behold dit valg.",
        items: [
          {
            q: "Hvordan skifter jeg sprog?",
            a: "Åbn Contents med knappen med tre linjer. Vælg det ønskede sprog under Language. PETS & DOGUE husker dit valg."
          },
          {
            q: "Understøtter PETS & DOGUE arabisk?",
            a: "Ja. Understøttede PETS & DOGUE-sider bruger et højre-til-venstre-layout, når arabisk er valgt."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Find steder, brug kortet, gem steder og se regler for dyr.",
        items: [
          {
            q: "Hvordan fungerer Pet-Friendly Places?",
            a: "Åbn Pet-Friendly Places og tillad adgang til din placering, eller søg efter en by, et postnummer eller et område. Vælg kategori og søgeradius. Steder vises som kort og markører på kortet."
          },
          {
            q: "Hvordan tilføjer jeg et kæledyrsvenligt sted?",
            a: "Åbn Pet-Friendly Places og vælg Add place. Tilføj oplysninger om det konkrete sted eller den konkrete virksomhed."
          },
          {
            q: "Hvordan gemmer jeg et sted?",
            a: "Tryk på hjertet på stedets kort. Du kan senere finde det igen under Saved."
          },
          {
            q: "Hvordan får jeg en rute?",
            a: "Tryk på Route på stedets kort. Derefter kan du fortsætte med Google Maps, Waze eller Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Lokalt community",
        description: "Lokale opslag og nyttige oplysninger for mennesker med kæledyr.",
        items: [
          {
            q: "Hvad er Lokalt community?",
            a: "Lokalt community er adskilt fra Pet-Friendly Places. Det er beregnet til lokale opslag, opdateringer og nyttige oplysninger for mennesker med kæledyr i et bestemt område."
          },
          {
            q: "Er Lokalt community det samme som Pet-Friendly Places?",
            a: "Nej. En bestemt virksomhed eller et bestemt sted hører til Pet-Friendly Places. Et lokalt opslag, en opdatering eller en communitybesked hører til Lokalt community."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Køb, salg og Marketplace-fordele for medlemmer.",
        items: [
          {
            q: "Hvad er Marketplace?",
            a: "Marketplace er PETS & DOGUE-området for relevante annoncer og tilbud med relation til dyr."
          },
          {
            q: "Hvilken Marketplace-fordel får abonnenter?",
            a: "Abonnenter kan offentliggøre op til 50 gratis annoncer på Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Medlemskab og fordele",
        description: "Abonnement, rabatter og medlemsfunktioner.",
        items: [
          {
            q: "Hvad får jeg med et abonnement?",
            a: "Medlemmer får adgang til PETS & DOGUE-rabatter og særlige tilbud og kan offentliggøre op til 50 gratis annoncer på Marketplace."
          },
          {
            q: "Kan jeg bruge PETS & DOGUE uden abonnement?",
            a: "Ja. Platformens generelle indhold og vigtigste funktioner er fortsat tilgængelige for besøgende."
          },
          {
            q: "Hvor logger jeg ind?",
            a: "Brug Profile, eller åbn Contents og vælg Sign In. Nye brugere kan vælge Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Historier, fotos og deltagelse",
        description: "Edition, Cover Star, Articles, Photos, Fashion og Contests.",
        items: [
          {
            q: "Hvor finder jeg PETS & DOGUE-historier?",
            a: "Brug Edition og Articles til redaktionelle historier og guides. Fashion og Health indeholder tematisk indhold, mens Photos fokuserer på visuelle historier."
          },
          {
            q: "Hvad er Cover Star?",
            a: "Cover Star giver dyr mulighed for at blive særlige stjerner hos PETS & DOGUE."
          },
          {
            q: "Hvor finder jeg konkurrencer?",
            a: "Åbn Contests via PETS & DOGUE-navigationen eller menuen Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Tilgængelighed og lyd",
        description: "Hvordan PETS & DOGUE læser indhold højt.",
        items: [
          {
            q: "Hvordan får jeg teksten læst højt?",
            a: "Brug højttalerknappen på PETS & DOGUE-sider, der understøtter oplæsning."
          },
          {
            q: "Hvordan får jeg Miso til at stoppe med at tale?",
            a: "Tryk på højttalerknappen i Help. Tryk igen for at starte oplæsningen af de oplysninger, der vises."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "For virksomheder og annoncører",
        description: "Annoncering og samarbejde med PETS & DOGUE.",
        items: [
          {
            q: "Kan en virksomhed annoncere hos PETS & DOGUE?",
            a: "Ja. Åbn Advertise with us for at se mulighederne for virksomheder og brands."
          },
          {
            q: "Er annoncering hos PETS & DOGUE kun for britiske virksomheder?",
            a: "Nej. PETS & DOGUE er en international onlineplatform. Muligheder for annoncering og samarbejde er beregnet til virksomheder og brands fra forskellige lande."
          }
        ]
      }

    ],    no: [

      {
        id: "start",
        icon: "✦",
        title: "Kom i gang",
        description: "Hva PETS & DOGUE er og hvordan du bruker plattformen.",
        items: [
          {
            q: "Hva er PETS & DOGUE?",
            a: "PETS & DOGUE er en digital lifestyleplattform for kjæledyr og menneskene som elsker dem. Den samler originale historier, praktiske guider, kjæledyrvennlige steder, helse, mote, fotografi, community, konkurranser, hjelp til dyr, Marketplace, medlemsfordeler og nyttige tjenester på ett sted."
          },
          {
            q: "Trenger jeg en konto for å bruke PETS & DOGUE?",
            a: "Nei. Generelt innhold og de viktigste funksjonene i PETS & DOGUE er tilgjengelige for besøkende uten innlogging. Et abonnement gir tilgang til rabatter og spesialtilbud og lar medlemmer publisere opptil 50 gratis annonser på Marketplace."
          },
          {
            q: "Hva betyr de tre linjene øverst?",
            a: "Knappen med tre linjer åpner menyen Contents. Derfra kan du navigere mellom PETS & DOGUE-seksjonene, bytte språk, logge inn eller abonnere."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Språk",
        description: "Bytt språk på plattformen og behold valget ditt.",
        items: [
          {
            q: "Hvordan bytter jeg språk?",
            a: "Åpne Contents med knappen med tre linjer. Velg ønsket språk under Language. PETS & DOGUE husker valget ditt."
          },
          {
            q: "Støtter PETS & DOGUE arabisk?",
            a: "Ja. Støttede PETS & DOGUE-sider bruker et høyre-til-venstre-oppsett når arabisk er valgt."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Finn steder, bruk kartet, lagre steder og sjekk reglene for dyr.",
        items: [
          {
            q: "Hvordan fungerer Pet-Friendly Places?",
            a: "Åpne Pet-Friendly Places og tillat tilgang til posisjonen din, eller søk etter en by, et postnummer eller et område. Velg kategori og søkeradius. Steder vises som kort og markører på kartet."
          },
          {
            q: "Hvordan legger jeg til et kjæledyrvennlig sted?",
            a: "Åpne Pet-Friendly Places og velg Add place. Legg til informasjon om det konkrete stedet eller virksomheten."
          },
          {
            q: "Hvordan lagrer jeg et sted?",
            a: "Trykk på hjertet på stedskortet. Du kan finne stedet igjen senere under Saved."
          },
          {
            q: "Hvordan får jeg en rute?",
            a: "Trykk på Route på stedskortet. Deretter kan du fortsette med Google Maps, Waze eller Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Lokalt community",
        description: "Lokale innlegg og nyttig informasjon for mennesker med dyr.",
        items: [
          {
            q: "Hva er Lokalt community?",
            a: "Lokalt community er separat fra Pet-Friendly Places. Det er beregnet på lokale innlegg, oppdateringer og nyttig informasjon for mennesker med dyr i et bestemt område."
          },
          {
            q: "Er Lokalt community det samme som Pet-Friendly Places?",
            a: "Nei. En bestemt virksomhet eller et bestemt sted hører hjemme i Pet-Friendly Places. Et lokalt innlegg, en oppdatering eller en communitymelding hører hjemme i Lokalt community."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Kjøp, salg og Marketplace-fordeler for medlemmer.",
        items: [
          {
            q: "Hva er Marketplace?",
            a: "Marketplace er PETS & DOGUE-området for relevante annonser og tilbud knyttet til dyr."
          },
          {
            q: "Hvilken Marketplace-fordel får abonnenter?",
            a: "Abonnenter kan publisere opptil 50 gratis annonser på Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Medlemskap og fordeler",
        description: "Abonnement, rabatter og medlemsfunksjoner.",
        items: [
          {
            q: "Hva får jeg med et abonnement?",
            a: "Medlemmer får tilgang til PETS & DOGUE-rabatter og spesialtilbud og kan publisere opptil 50 gratis annonser på Marketplace."
          },
          {
            q: "Kan jeg bruke PETS & DOGUE uten abonnement?",
            a: "Ja. Plattformens generelle innhold og viktigste funksjoner er fortsatt tilgjengelige for besøkende."
          },
          {
            q: "Hvor logger jeg inn?",
            a: "Bruk Profile, eller åpne Contents og velg Sign In. Nye brukere kan velge Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Historier, bilder og deltakelse",
        description: "Edition, Cover Star, Articles, Photos, Fashion og Contests.",
        items: [
          {
            q: "Hvor finner jeg PETS & DOGUE-historier?",
            a: "Bruk Edition og Articles for redaksjonelle historier og guider. Fashion og Health inneholder tematisk innhold, mens Photos fokuserer på visuelle historier."
          },
          {
            q: "Hva er Cover Star?",
            a: "Cover Star gir dyr muligheten til å bli spesielle stjerner hos PETS & DOGUE."
          },
          {
            q: "Hvor finner jeg konkurransene?",
            a: "Åpne Contests fra PETS & DOGUE-navigasjonen eller fra menyen Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Tilgjengelighet og lyd",
        description: "Hvordan PETS & DOGUE leser innhold høyt.",
        items: [
          {
            q: "Hvordan får jeg teksten lest høyt?",
            a: "Bruk høyttalerknappen på PETS & DOGUE-sider som støtter høytlesing."
          },
          {
            q: "Hvordan får jeg Miso til å slutte å snakke?",
            a: "Trykk på høyttalerknappen i Help. Trykk igjen for å starte høytlesingen av informasjonen som vises."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "For bedrifter og annonsører",
        description: "Annonsering og samarbeid med PETS & DOGUE.",
        items: [
          {
            q: "Kan en bedrift annonsere hos PETS & DOGUE?",
            a: "Ja. Åpne Advertise with us for å se mulighetene for bedrifter og merkevarer."
          },
          {
            q: "Er annonsering hos PETS & DOGUE bare for britiske bedrifter?",
            a: "Nei. PETS & DOGUE er en internasjonal nettplattform. Muligheter for annonsering og samarbeid er beregnet på bedrifter og merkevarer fra forskjellige land."
          }
        ]
      }

    ],

    fi: [

      {
        id: "start",
        icon: "✦",
        title: "Aloittaminen",
        description: "Mikä PETS & DOGUE on ja miten alustaa käytetään.",
        items: [
          {
            q: "Mikä PETS & DOGUE on?",
            a: "PETS & DOGUE on digitaalinen lifestyle-alusta lemmikeille ja niitä rakastaville ihmisille. Se kokoaa yhteen alkuperäisiä tarinoita, käytännön oppaita, lemmikkiystävällisiä paikkoja, terveyttä, muotia, valokuvausta, yhteisön, kilpailuja, eläinten auttamista, Marketplacen, jäsenetuja ja hyödyllisiä palveluita."
          },
          {
            q: "Tarvitsenko tilin käyttääkseni PETS & DOGUEa?",
            a: "Et. PETS & DOGUEn yleinen sisältö ja tärkeimmät ominaisuudet ovat vierailijoiden käytettävissä ilman kirjautumista. Tilaus antaa pääsyn alennuksiin ja erikoistarjouksiin sekä mahdollistaa jäsenille enintään 50 ilmaisen Marketplace-ilmoituksen julkaisemisen."
          },
          {
            q: "Mitä yläreunan kolme viivaa tarkoittavat?",
            a: "Kolmen viivan painike avaa Contents-valikon. Sen kautta voit siirtyä PETS & DOGUEn osioiden välillä, vaihtaa kieltä, kirjautua sisään tai tilata jäsenyyden."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Kieli",
        description: "Vaihda alustan kieli ja säilytä valintasi.",
        items: [
          {
            q: "Miten vaihdan kieltä?",
            a: "Avaa Contents kolmen viivan painikkeella. Valitse haluamasi kieli kohdasta Language. PETS & DOGUE muistaa valintasi."
          },
          {
            q: "Tukeeko PETS & DOGUE arabiaa?",
            a: "Kyllä. Tuetut PETS & DOGUE -sivut käyttävät arabiaksi oikealta vasemmalle etenevää asettelua."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Löydä paikkoja, käytä karttaa, tallenna paikkoja ja tarkista eläimiä koskevat säännöt.",
        items: [
          {
            q: "Miten Pet-Friendly Places toimii?",
            a: "Avaa Pet-Friendly Places ja salli sijaintisi käyttö tai hae kaupunkia, postinumeroa tai aluetta. Valitse kategoria ja hakusäde. Paikat näkyvät kortteina ja merkkeinä kartalla."
          },
          {
            q: "Miten lisään lemmikkiystävällisen paikan?",
            a: "Avaa Pet-Friendly Places ja valitse Add place. Lisää tiedot kyseisestä paikasta tai yrityksestä."
          },
          {
            q: "Miten tallennan paikan?",
            a: "Napauta sydäntä paikan kortissa. Löydät paikan myöhemmin uudelleen Saved-osiosta."
          },
          {
            q: "Miten saan reittiohjeet?",
            a: "Napauta Route paikan kortissa. Sen jälkeen voit jatkaa Google Mapsilla, Wazella tai Apple Mapsilla."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Paikallinen yhteisö",
        description: "Paikallisia julkaisuja ja hyödyllistä tietoa eläinten kanssa eläville.",
        items: [
          {
            q: "Mikä Paikallinen yhteisö on?",
            a: "Paikallinen yhteisö on erillinen Pet-Friendly Places -osiosta. Se on tarkoitettu paikallisille julkaisuille, päivityksille ja hyödylliselle tiedolle tietyn alueen eläinten kanssa eläville ihmisille."
          },
          {
            q: "Onko Paikallinen yhteisö sama kuin Pet-Friendly Places?",
            a: "Ei. Tietty yritys tai paikka kuuluu Pet-Friendly Places -osioon. Paikallinen julkaisu, päivitys tai yhteisöviesti kuuluu Paikalliseen yhteisöön."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Ostaminen, myyminen ja Marketplace-edut jäsenille.",
        items: [
          {
            q: "Mikä Marketplace on?",
            a: "Marketplace on PETS & DOGUEn alue eläimiin liittyville asianmukaisille ilmoituksille ja tarjouksille."
          },
          {
            q: "Minkä Marketplace-edun tilaajat saavat?",
            a: "Tilaajat voivat julkaista enintään 50 ilmaista ilmoitusta Marketplacessa."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Jäsenyys ja edut",
        description: "Tilaus, alennukset ja jäsenominaisuudet.",
        items: [
          {
            q: "Mitä saan tilauksella?",
            a: "Jäsenet saavat käyttöönsä PETS & DOGUEn alennukset ja erikoistarjoukset ja voivat julkaista enintään 50 ilmaista ilmoitusta Marketplacessa."
          },
          {
            q: "Voinko käyttää PETS & DOGUEa ilman tilausta?",
            a: "Kyllä. Alustan yleinen sisältö ja tärkeimmät ominaisuudet ovat edelleen vierailijoiden käytettävissä."
          },
          {
            q: "Missä voin kirjautua sisään?",
            a: "Käytä Profile-toimintoa tai avaa Contents ja valitse Sign In. Uudet käyttäjät voivat valita Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Tarinat, kuvat ja osallistuminen",
        description: "Edition, Cover Star, Articles, Photos, Fashion ja Contests.",
        items: [
          {
            q: "Mistä löydän PETS & DOGUE -tarinoita?",
            a: "Edition ja Articles sisältävät toimituksellisia tarinoita ja oppaita. Fashion ja Health sisältävät teemoitettua sisältöä, ja Photos keskittyy visuaalisiin tarinoihin."
          },
          {
            q: "Mikä Cover Star on?",
            a: "Cover Star antaa eläimille mahdollisuuden tulla PETS & DOGUEn erityisiksi tähdiksi."
          },
          {
            q: "Mistä löydän kilpailut?",
            a: "Avaa Contests PETS & DOGUEn navigoinnista tai Contents-valikosta."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Saavutettavuus ja ääni",
        description: "Miten PETS & DOGUE lukee sisällön ääneen.",
        items: [
          {
            q: "Miten saan tekstin luettua ääneen?",
            a: "Käytä kaiutinpainiketta PETS & DOGUE -sivuilla, jotka tukevat ääneen lukemista."
          },
          {
            q: "Miten pysäytän Mison puheen?",
            a: "Napauta kaiutinpainiketta Help-ikkunassa. Napauta sitä uudelleen aloittaaksesi näkyvissä olevien tietojen lukemisen."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "Yrityksille ja mainostajille",
        description: "Mainonta ja yhteistyö PETS & DOGUEn kanssa.",
        items: [
          {
            q: "Voiko yritys mainostaa PETS & DOGUEssa?",
            a: "Kyllä. Avaa Advertise with us nähdäksesi yrityksille ja brändeille tarjolla olevat mahdollisuudet."
          },
          {
            q: "Onko PETS & DOGUEn mainonta tarkoitettu vain brittiläisille yrityksille?",
            a: "Ei. PETS & DOGUE on kansainvälinen verkkoalusta. Mainonta- ja yhteistyömahdollisuudet on tarkoitettu eri maiden yrityksille ja brändeille."
          }
        ]
      }

    ],

    tr: [

      {
        id: "start",
        icon: "✦",
        title: "Başlarken",
        description: "PETS & DOGUE nedir ve platform nasıl kullanılır.",
        items: [
          {
            q: "PETS & DOGUE nedir?",
            a: "PETS & DOGUE, hayvanlar ve onları seven insanlar için dijital bir yaşam tarzı platformudur. Özgün hikâyeleri, pratik rehberleri, evcil hayvan dostu yerleri, sağlık, moda, fotoğrafçılık, topluluk, yarışmalar, hayvanlara yardım, Marketplace, üye avantajları ve faydalı hizmetleri tek bir yerde bir araya getirir."
          },
          {
            q: "PETS & DOGUE kullanmak için hesaba ihtiyacım var mı?",
            a: "Hayır. PETS & DOGUE'un genel içeriği ve temel özellikleri ziyaretçilere giriş yapmadan açıktır. Abonelik, indirimlere ve özel tekliflere erişim sağlar ve üyelerin Marketplace'te 50'ye kadar ücretsiz ilan yayınlamasına olanak tanır."
          },
          {
            q: "Üstteki üç çizgi ne anlama geliyor?",
            a: "Üç çizgili düğme Contents menüsünü açar. Buradan PETS & DOGUE bölümleri arasında gezinebilir, dili değiştirebilir, giriş yapabilir veya abone olabilirsiniz."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "Dil",
        description: "Platformun dilini değiştirin ve seçiminizi koruyun.",
        items: [
          {
            q: "Dili nasıl değiştiririm?",
            a: "Üç çizgili düğmeyle Contents menüsünü açın. Language bölümünden istediğiniz dili seçin. PETS & DOGUE seçiminizi hatırlayacaktır."
          },
          {
            q: "PETS & DOGUE Arapçayı destekliyor mu?",
            a: "Evet. Desteklenen PETS & DOGUE sayfaları Arapça seçildiğinde sağdan sola düzen kullanır."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "Yerleri bulun, haritayı kullanın, yerleri kaydedin ve hayvan kurallarını kontrol edin.",
        items: [
          {
            q: "Pet-Friendly Places nasıl çalışır?",
            a: "Pet-Friendly Places'ı açın ve konum erişimine izin verin veya şehir, posta kodu ya da bölge arayın. Bir kategori ve arama yarıçapı seçin. Yerler kartlar ve harita işaretleri olarak görüntülenir."
          },
          {
            q: "Evcil hayvan dostu bir yeri nasıl eklerim?",
            a: "Pet-Friendly Places'ı açın ve Add place seçeneğini seçin. Belirli yer veya işletme hakkındaki bilgileri ekleyin."
          },
          {
            q: "Bir yeri nasıl kaydederim?",
            a: "Yer kartındaki kalbe dokunun. Daha sonra Saved bölümünde tekrar bulabilirsiniz."
          },
          {
            q: "Nasıl yol tarifi alırım?",
            a: "Yer kartındaki Route seçeneğine dokunun. Ardından Google Maps, Waze veya Apple Maps ile devam edebilirsiniz."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "Yerel topluluk",
        description: "Hayvanlarla yaşayan insanlar için yerel paylaşımlar ve faydalı bilgiler.",
        items: [
          {
            q: "Yerel topluluk nedir?",
            a: "Yerel topluluk, Pet-Friendly Places'tan ayrıdır. Belirli bir bölgedeki hayvan sahipleri için yerel paylaşımlar, güncellemeler ve faydalı bilgiler içindir."
          },
          {
            q: "Yerel topluluk ile Pet-Friendly Places aynı şey mi?",
            a: "Hayır. Belirli bir işletme veya yer Pet-Friendly Places'a aittir. Yerel bir paylaşım, güncelleme veya topluluk mesajı Yerel topluluğa aittir."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "Üyeler için alışveriş, satış ve Marketplace avantajları.",
        items: [
          {
            q: "Marketplace nedir?",
            a: "Marketplace, PETS & DOGUE'un hayvanlarla ilgili uygun ilanlar ve teklifler için ayrılmış bölümüdür."
          },
          {
            q: "Aboneler hangi Marketplace avantajını alır?",
            a: "Aboneler Marketplace'te 50'ye kadar ücretsiz ilan yayınlayabilir."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "Üyelik ve avantajlar",
        description: "Abonelik, indirimler ve üye özellikleri.",
        items: [
          {
            q: "Abonelikle ne elde ederim?",
            a: "Üyeler PETS & DOGUE indirimlerine ve özel tekliflerine erişebilir ve Marketplace'te 50'ye kadar ücretsiz ilan yayınlayabilir."
          },
          {
            q: "PETS & DOGUE'u abonelik olmadan kullanabilir miyim?",
            a: "Evet. Platformun genel içeriği ve temel özellikleri ziyaretçiler için kullanılabilir olmaya devam eder."
          },
          {
            q: "Nereden giriş yapabilirim?",
            a: "Profile'ı kullanın veya Contents'ı açıp Sign In seçeneğini seçin. Yeni kullanıcılar Subscribe seçeneğini seçebilir."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "Hikâyeler, fotoğraflar ve katılım",
        description: "Edition, Cover Star, Articles, Photos, Fashion ve Contests.",
        items: [
          {
            q: "PETS & DOGUE hikâyelerini nerede bulabilirim?",
            a: "Editoryal hikâyeler ve rehberler için Edition ve Articles'ı kullanın. Fashion ve Health tematik içerikler sunarken Photos görsel hikâyelere odaklanır."
          },
          {
            q: "Cover Star nedir?",
            a: "Cover Star, hayvanlara PETS & DOGUE'un özel yıldızlarından biri olma fırsatı verir."
          },
          {
            q: "Yarışmaları nerede bulabilirim?",
            a: "PETS & DOGUE navigasyonundan veya Contents menüsünden Contests'ı açın."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "Erişilebilirlik ve ses",
        description: "PETS & DOGUE içeriği nasıl sesli okur.",
        items: [
          {
            q: "Metni nasıl sesli dinleyebilirim?",
            a: "Sesli okuma özelliğini destekleyen PETS & DOGUE sayfalarındaki hoparlör düğmesini kullanın."
          },
          {
            q: "Miso'nun konuşmasını nasıl durdurabilirim?",
            a: "Help içindeki hoparlör düğmesine dokunun. Görüntülenen bilgilerin okunmasını yeniden başlatmak için tekrar dokunun."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "İşletmeler ve reklamverenler için",
        description: "PETS & DOGUE ile reklam ve iş birliği.",
        items: [
          {
            q: "Bir işletme PETS & DOGUE'da reklam verebilir mi?",
            a: "Evet. Markalar ve işletmeler için mevcut fırsatları görmek üzere Advertise with us bölümünü açın."
          },
          {
            q: "PETS & DOGUE reklamları yalnızca Birleşik Krallık'taki işletmeler için mi?",
            a: "Hayır. PETS & DOGUE uluslararası bir online platformdur. Reklam ve iş birliği fırsatları farklı ülkelerdeki işletmeler ve markalar için tasarlanmıştır."
          }
        ]
      }

    ],    ar: [

      {
        id: "start",
        icon: "✦",
        title: "البدء",
        description: "ما هي PETS & DOGUE وكيفية استخدام المنصة.",
        items: [
          {
            q: "ما هي PETS & DOGUE؟",
            a: "PETS & DOGUE هي منصة رقمية لأسلوب الحياة مخصصة للحيوانات وللأشخاص الذين يحبونها. تجمع في مكان واحد القصص الأصلية والأدلة العملية والأماكن الصديقة للحيوانات والصحة والموضة والتصوير والمجتمع والمسابقات ومساعدة الحيوانات وMarketplace ومزايا الأعضاء والخدمات المفيدة."
          },
          {
            q: "هل أحتاج إلى حساب لاستخدام PETS & DOGUE؟",
            a: "لا. المحتوى العام والوظائف الرئيسية في PETS & DOGUE متاحة للزوار دون تسجيل الدخول. يمنح الاشتراك إمكانية الوصول إلى الخصومات والعروض الخاصة، ويسمح للأعضاء بنشر ما يصل إلى 50 إعلانًا مجانيًا في Marketplace."
          },
          {
            q: "ماذا تعني الخطوط الثلاثة في الأعلى؟",
            a: "يفتح الزر ذو الخطوط الثلاثة قائمة Contents. ومن هناك يمكنك الانتقال بين أقسام PETS & DOGUE وتغيير اللغة وتسجيل الدخول أو الاشتراك."
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "اللغة",
        description: "غيّر لغة المنصة واحتفظ باختيارك.",
        items: [
          {
            q: "كيف أغيّر اللغة؟",
            a: "افتح قائمة Contents باستخدام زر الخطوط الثلاثة. اختر اللغة المطلوبة من Language. ستتذكر PETS & DOGUE اختيارك."
          },
          {
            q: "هل تدعم PETS & DOGUE اللغة العربية؟",
            a: "نعم. تستخدم صفحات PETS & DOGUE المدعومة تخطيطًا من اليمين إلى اليسار عند اختيار اللغة العربية."
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "اعثر على الأماكن واستخدم الخريطة واحفظ المواقع وتحقق من قواعد الحيوانات.",
        items: [
          {
            q: "كيف تعمل Pet-Friendly Places؟",
            a: "افتح Pet-Friendly Places واسمح بالوصول إلى موقعك، أو ابحث عن مدينة أو رمز بريدي أو منطقة. اختر فئة ونطاق البحث. ستظهر الأماكن كبطاقات وعلامات على الخريطة."
          },
          {
            q: "كيف أضيف مكانًا صديقًا للحيوانات؟",
            a: "افتح Pet-Friendly Places واختر Add place. أضف المعلومات الخاصة بالمكان أو النشاط التجاري المحدد."
          },
          {
            q: "كيف أحفظ مكانًا؟",
            a: "اضغط على رمز القلب في بطاقة المكان. يمكنك العثور عليه لاحقًا مرة أخرى في Saved."
          },
          {
            q: "كيف أحصل على الاتجاهات؟",
            a: "اضغط على Route في بطاقة المكان. بعد ذلك يمكنك المتابعة باستخدام Google Maps أو Waze أو Apple Maps."
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "المجتمع المحلي",
        description: "منشورات محلية ومعلومات مفيدة للأشخاص الذين يعيشون مع الحيوانات.",
        items: [
          {
            q: "ما هو المجتمع المحلي؟",
            a: "المجتمع المحلي منفصل عن Pet-Friendly Places. وهو مخصص للمنشورات المحلية والتحديثات والمعلومات المفيدة للأشخاص الذين يعيشون مع الحيوانات في منطقة معينة."
          },
          {
            q: "هل المجتمع المحلي هو نفسه Pet-Friendly Places؟",
            a: "لا. النشاط التجاري أو المكان المحدد ينتمي إلى Pet-Friendly Places. أما المنشور المحلي أو التحديث أو رسالة المجتمع فتنتمي إلى المجتمع المحلي."
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "الشراء والبيع ومزايا Marketplace للأعضاء.",
        items: [
          {
            q: "ما هو Marketplace؟",
            a: "Marketplace هو قسم PETS & DOGUE المخصص للإعلانات والعروض المناسبة المتعلقة بالحيوانات."
          },
          {
            q: "ما ميزة Marketplace التي يحصل عليها المشتركون؟",
            a: "يمكن للمشتركين نشر ما يصل إلى 50 إعلانًا مجانيًا في Marketplace."
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "العضوية والمزايا",
        description: "الاشتراك والخصومات والميزات الخاصة بالأعضاء.",
        items: [
          {
            q: "ماذا أحصل عليه مع الاشتراك؟",
            a: "يحصل الأعضاء على إمكانية الوصول إلى خصومات PETS & DOGUE والعروض الخاصة، ويمكنهم نشر ما يصل إلى 50 إعلانًا مجانيًا في Marketplace."
          },
          {
            q: "هل يمكنني استخدام PETS & DOGUE دون اشتراك؟",
            a: "نعم. يظل المحتوى العام والوظائف الرئيسية للمنصة متاحًا للزوار."
          },
          {
            q: "أين يمكنني تسجيل الدخول؟",
            a: "استخدم Profile أو افتح Contents واختر Sign In. ويمكن للمستخدمين الجدد اختيار Subscribe."
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "القصص والصور والمشاركة",
        description: "Edition وCover Star وArticles وPhotos وFashion وContests.",
        items: [
          {
            q: "أين أجد قصص PETS & DOGUE؟",
            a: "استخدم Edition وArticles للقصص التحريرية والأدلة. يحتوي Fashion وHealth على محتوى متخصص، بينما يركز Photos على القصص المرئية."
          },
          {
            q: "ما هو Cover Star؟",
            a: "يمنح Cover Star الحيوانات فرصة لتصبح من النجوم المميزين في PETS & DOGUE."
          },
          {
            q: "أين أجد المسابقات؟",
            a: "افتح Contests من تنقل PETS & DOGUE أو من قائمة Contents."
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "إمكانية الوصول والصوت",
        description: "كيف تقرأ PETS & DOGUE المحتوى بصوت مرتفع.",
        items: [
          {
            q: "كيف أجعل النص يُقرأ بصوت مرتفع؟",
            a: "استخدم زر مكبر الصوت في صفحات PETS & DOGUE التي تدعم ميزة القراءة الصوتية."
          },
          {
            q: "كيف أوقف Miso عن التحدث؟",
            a: "اضغط على زر مكبر الصوت داخل Help. اضغط عليه مرة أخرى لبدء قراءة المعلومات المعروضة حاليًا."
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "للشركات والمعلنين",
        description: "الإعلان والتعاون مع PETS & DOGUE.",
        items: [
          {
            q: "هل يمكن لشركة الإعلان على PETS & DOGUE؟",
            a: "نعم. افتح Advertise with us لمعرفة الفرص المتاحة للشركات والعلامات التجارية."
          },
          {
            q: "هل الإعلان على PETS & DOGUE مخصص فقط للشركات في المملكة المتحدة؟",
            a: "لا. PETS & DOGUE منصة دولية عبر الإنترنت. فرص الإعلان والتعاون متاحة للشركات والعلامات التجارية من مختلف البلدان."
          }
        ]
      }

    ],

    hi: [

      {
        id: "start",
        icon: "✦",
        title: "शुरुआत",
        description: "PETS & DOGUE क्या है और प्लेटफ़ॉर्म का उपयोग कैसे करें।",
        items: [
          {
            q: "PETS & DOGUE क्या है?",
            a: "PETS & DOGUE पालतू जानवरों और उनसे प्यार करने वाले लोगों के लिए एक डिजिटल लाइफस्टाइल प्लेटफ़ॉर्म है। यह मूल कहानियों, व्यावहारिक गाइड, pet-friendly स्थानों, स्वास्थ्य, फैशन, फ़ोटोग्राफ़ी, समुदाय, प्रतियोगिताओं, पशु सहायता, Marketplace, सदस्य लाभों और उपयोगी सेवाओं को एक ही स्थान पर लाता है।"
          },
          {
            q: "क्या PETS & DOGUE इस्तेमाल करने के लिए मुझे अकाउंट चाहिए?",
            a: "नहीं। PETS & DOGUE की सामान्य सामग्री और मुख्य सुविधाएँ बिना साइन इन किए आगंतुकों के लिए उपलब्ध हैं। सदस्यता से छूट और विशेष ऑफ़र मिलते हैं और सदस्य Marketplace पर 50 तक निःशुल्क विज्ञापन पोस्ट कर सकते हैं।"
          },
          {
            q: "ऊपर की तीन लाइनों का क्या मतलब है?",
            a: "तीन लाइनों वाला बटन Contents मेनू खोलता है। वहाँ से आप PETS & DOGUE के अलग-अलग सेक्शन में जा सकते हैं, भाषा बदल सकते हैं, साइन इन कर सकते हैं या सदस्यता ले सकते हैं।"
          }
        ]
      },

      {
        id: "language",
        icon: "文",
        title: "भाषा",
        description: "प्लेटफ़ॉर्म की भाषा बदलें और अपनी पसंद सुरक्षित रखें।",
        items: [
          {
            q: "मैं भाषा कैसे बदलूँ?",
            a: "तीन लाइनों वाले बटन से Contents खोलें। Language में अपनी पसंद की भाषा चुनें। PETS & DOGUE आपकी पसंद याद रखेगा।"
          },
          {
            q: "क्या PETS & DOGUE अरबी भाषा को सपोर्ट करता है?",
            a: "हाँ। अरबी चुने जाने पर समर्थित PETS & DOGUE पेज दाएँ से बाएँ लेआउट का उपयोग करते हैं।"
          }
        ]
      },

      {
        id: "petfriendly",
        icon: "🐾",
        title: "Pet-Friendly Places",
        description: "स्थान खोजें, नक्शा उपयोग करें, जगहें सेव करें और पशुओं से जुड़े नियम देखें।",
        items: [
          {
            q: "Pet-Friendly Places कैसे काम करता है?",
            a: "Pet-Friendly Places खोलें और अपनी लोकेशन की अनुमति दें या शहर, पोस्टकोड अथवा क्षेत्र खोजें। श्रेणी और खोज का दायरा चुनें। स्थान कार्ड और नक्शे के मार्कर के रूप में दिखाई देंगे।"
          },
          {
            q: "मैं pet-friendly स्थान कैसे जोड़ूँ?",
            a: "Pet-Friendly Places खोलें और Add place चुनें। उस विशेष स्थान या व्यवसाय की जानकारी जोड़ें।"
          },
          {
            q: "मैं कोई स्थान कैसे सेव करूँ?",
            a: "स्थान के कार्ड पर दिल के निशान को दबाएँ। बाद में आप उसे Saved में फिर से पा सकते हैं।"
          },
          {
            q: "मैं रास्ता कैसे प्राप्त करूँ?",
            a: "स्थान के कार्ड पर Route दबाएँ। इसके बाद Google Maps, Waze या Apple Maps से आगे बढ़ सकते हैं।"
          }
        ]
      },

      {
        id: "community",
        icon: "♥",
        title: "स्थानीय समुदाय",
        description: "पालतू जानवरों के साथ रहने वाले लोगों के लिए स्थानीय पोस्ट और उपयोगी जानकारी।",
        items: [
          {
            q: "स्थानीय समुदाय क्या है?",
            a: "स्थानीय समुदाय Pet-Friendly Places से अलग है। यह किसी विशेष क्षेत्र में पालतू जानवरों के साथ रहने वाले लोगों के लिए स्थानीय पोस्ट, अपडेट और उपयोगी जानकारी साझा करने के लिए है।"
          },
          {
            q: "क्या स्थानीय समुदाय और Pet-Friendly Places एक ही चीज़ हैं?",
            a: "नहीं। कोई विशेष व्यवसाय या स्थान Pet-Friendly Places में आता है। स्थानीय पोस्ट, अपडेट या समुदाय संदेश स्थानीय समुदाय में आता है।"
          }
        ]
      },

      {
        id: "marketplace",
        icon: "▢",
        title: "Marketplace",
        description: "सदस्यों के लिए खरीदना, बेचना और Marketplace लाभ।",
        items: [
          {
            q: "Marketplace क्या है?",
            a: "Marketplace PETS & DOGUE का वह क्षेत्र है जहाँ पशुओं से संबंधित उपयुक्त विज्ञापन और ऑफ़र उपलब्ध होते हैं।"
          },
          {
            q: "सदस्यों को Marketplace में क्या लाभ मिलता है?",
            a: "सदस्य Marketplace पर 50 तक निःशुल्क विज्ञापन पोस्ट कर सकते हैं।"
          }
        ]
      },

      {
        id: "membership",
        icon: "★",
        title: "सदस्यता और लाभ",
        description: "सदस्यता, छूट और सदस्यों के लिए सुविधाएँ।",
        items: [
          {
            q: "सदस्यता से मुझे क्या मिलता है?",
            a: "सदस्यों को PETS & DOGUE की छूट और विशेष ऑफ़र मिलते हैं और वे Marketplace पर 50 तक निःशुल्क विज्ञापन पोस्ट कर सकते हैं।"
          },
          {
            q: "क्या मैं बिना सदस्यता के PETS & DOGUE इस्तेमाल कर सकता हूँ?",
            a: "हाँ। प्लेटफ़ॉर्म की सामान्य सामग्री और मुख्य सुविधाएँ आगंतुकों के लिए उपलब्ध रहती हैं।"
          },
          {
            q: "मैं कहाँ साइन इन करूँ?",
            a: "Profile का उपयोग करें या Contents खोलकर Sign In चुनें। नए उपयोगकर्ता Subscribe चुन सकते हैं।"
          }
        ]
      },

      {
        id: "content",
        icon: "◉",
        title: "कहानियाँ, फ़ोटो और भागीदारी",
        description: "Edition, Cover Star, Articles, Photos, Fashion और Contests.",
        items: [
          {
            q: "मुझे PETS & DOGUE की कहानियाँ कहाँ मिलेंगी?",
            a: "संपादकीय कहानियों और गाइड के लिए Edition और Articles का उपयोग करें। Fashion और Health में विषय-विशेष सामग्री है, जबकि Photos दृश्य कहानियों पर केंद्रित है।"
          },
          {
            q: "Cover Star क्या है?",
            a: "Cover Star पालतू जानवरों को PETS & DOGUE के विशेष सितारे बनने का अवसर देता है।"
          },
          {
            q: "प्रतियोगिताएँ कहाँ मिलेंगी?",
            a: "PETS & DOGUE नेविगेशन या Contents मेनू से Contests खोलें।"
          }
        ]
      },

      {
        id: "accessibility",
        icon: "🔊",
        title: "सुलभता और ऑडियो",
        description: "PETS & DOGUE सामग्री को ज़ोर से कैसे पढ़ता है।",
        items: [
          {
            q: "मैं टेक्स्ट को ज़ोर से कैसे सुनूँ?",
            a: "उन PETS & DOGUE पेजों पर स्पीकर बटन का उपयोग करें जो पढ़कर सुनाने की सुविधा का समर्थन करते हैं।"
          },
          {
            q: "मैं Miso को बोलने से कैसे रोकूँ?",
            a: "Help में स्पीकर बटन दबाएँ। वर्तमान में दिखाई जा रही जानकारी को फिर से पढ़ना शुरू करने के लिए इसे दोबारा दबाएँ।"
          }
        ]
      },

      {
        id: "business",
        icon: "◆",
        title: "व्यवसायों और विज्ञापनदाताओं के लिए",
        description: "PETS & DOGUE के साथ विज्ञापन और सहयोग।",
        items: [
          {
            q: "क्या कोई व्यवसाय PETS & DOGUE पर विज्ञापन दे सकता है?",
            a: "हाँ। व्यवसायों और ब्रांडों के लिए उपलब्ध अवसर देखने के लिए Advertise with us खोलें।"
          },
          {
            q: "क्या PETS & DOGUE पर विज्ञापन केवल UK के व्यवसायों के लिए है?",
            a: "नहीं। PETS & DOGUE एक अंतरराष्ट्रीय ऑनलाइन प्लेटफ़ॉर्म है। विज्ञापन और सहयोग के अवसर विभिन्न देशों के व्यवसायों और ब्रांडों के लिए हैं।"
          }
        ]
      }

    ]

  };
