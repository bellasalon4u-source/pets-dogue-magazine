window.PetsDogueTranslations =
  window.PetsDogueTranslations || {};

window.PetsDogueTranslations.articles = {
  en: {
    hero: {
      kicker: "PETS & DOGUE EDITORIAL",
      title: "Stories Worth Seeing, Reading and Hearing",
      description:
        "Discover visual journalism, luxury animal lifestyle, useful guides, travel, wellness, fashion, interviews and rescue stories.",
      explore: "Explore Stories",
      listen: "Listen To An Article",
      cover: "Become A Cover Star"
    },

    search: {
      placeholder:
        "Search stories, categories or topics...",
      button: "Search",
      all: "All",
      coverStars: "Cover Stars",
      fashion: "Fashion",
      travel: "Travel",
      wellness: "Wellness",
      rescue: "Rescue",
      community: "Community",
      places: "Places"
    },

    sections: {
      editor: "Editor’s Selection",
      editorDescription:
        "The stories, images and useful guides selected by the PETS & DOGUE editorial team.",
      latest: "Latest Stories",
      visual: "Visual Journalism",
      gallery: "OPEN PHOTO GALLERY →",
      emptyTitle: "No matching stories",
      emptyDescription:
        "Try another search word or select a different category."
    },

    newsletter: {
      title: "Receive New PETS & DOGUE Stories",
      description:
        "Get new issues, narrated articles, visual editorials and useful animal lifestyle guides.",
      placeholder: "Your email address",
      button: "SUBSCRIBE"
    }
  },

  uk: {
    hero: {
      kicker: "РЕДАКЦІЯ PETS & DOGUE",
      title:
        "Історії, які варто бачити, читати й слухати",
      description:
        "Відкрийте для себе візуальну журналістику, розкішний стиль життя з тваринами, корисні гіди, подорожі, здоров’я, моду, інтерв’ю та історії порятунку.",
      explore: "Переглянути історії",
      listen: "Слухати статтю",
      cover: "Стати зіркою обкладинки"
    },

    search: {
      placeholder:
        "Шукати історії, категорії або теми...",
      button: "Пошук",
      all: "Усі",
      coverStars: "Зірки обкладинки",
      fashion: "Мода",
      travel: "Подорожі",
      wellness: "Здоров’я",
      rescue: "Допомога",
      community: "Спільнота",
      places: "Місця"
    },

    sections: {
      editor: "Вибір редакції",
      editorDescription:
        "Історії, зображення та корисні гіди, обрані редакцією PETS & DOGUE.",
      latest: "Останні історії",
      visual: "Візуальна журналістика",
      gallery: "ВІДКРИТИ ФОТОГАЛЕРЕЮ →",
      emptyTitle: "Історій не знайдено",
      emptyDescription:
        "Спробуйте інше слово або оберіть іншу категорію."
    },

    newsletter: {
      title:
        "Отримуйте нові історії PETS & DOGUE",
      description:
        "Нові випуски, озвучені статті, візуальні матеріали та корисні гіди.",
      placeholder: "Ваша електронна адреса",
      button: "ПІДПИСАТИСЯ"
    }
  },

  ru: {
    hero: {
      kicker: "РЕДАКЦИЯ PETS & DOGUE",
      title:
        "Истории, которые стоит видеть, читать и слушать",
      description:
        "Откройте визуальную журналистику, роскошный образ жизни с животными, полезные гиды, путешествия, здоровье, моду, интервью и истории спасения.",
      explore: "Смотреть истории",
      listen: "Слушать статью",
      cover: "Стать звездой обложки"
    },

    search: {
      placeholder:
        "Искать истории, категории или темы...",
      button: "Поиск",
      all: "Все",
      coverStars: "Звёзды обложки",
      fashion: "Мода",
      travel: "Путешествия",
      wellness: "Здоровье",
      rescue: "Помощь",
      community: "Сообщество",
      places: "Места"
    },

    sections: {
      editor: "Выбор редакции",
      editorDescription:
        "Истории, изображения и полезные гиды, выбранные редакцией PETS & DOGUE.",
      latest: "Последние истории",
      visual: "Визуальная журналистика",
      gallery: "ОТКРЫТЬ ФОТОГАЛЕРЕЮ →",
      emptyTitle: "Истории не найдены",
      emptyDescription:
        "Попробуйте другое слово или выберите другую категорию."
    },

    newsletter: {
      title:
        "Получайте новые истории PETS & DOGUE",
      description:
        "Новые выпуски, озвученные статьи, визуальные материалы и полезные гиды.",
      placeholder:
        "Ваш адрес электронной почты",
      button: "ПОДПИСАТЬСЯ"
    }
  },

  es: {
    hero: {
      kicker: "EDITORIAL PETS & DOGUE",
      title:
        "Historias que vale la pena ver, leer y escuchar",
      description:
        "Descubre periodismo visual, estilo de vida animal de lujo, guías útiles, viajes, bienestar, moda, entrevistas e historias de rescate.",
      explore: "Explorar historias",
      listen: "Escuchar un artículo",
      cover:
        "Convertirse en estrella de portada"
    },

    search: {
      placeholder:
        "Buscar historias, categorías o temas...",
      button: "Buscar",
      all: "Todas",
      coverStars: "Estrellas de portada",
      fashion: "Moda",
      travel: "Viajes",
      wellness: "Bienestar",
      rescue: "Rescate",
      community: "Comunidad",
      places: "Lugares"
    },

    sections: {
      editor: "Selección de la redacción",
      editorDescription:
        "Historias, imágenes y guías útiles seleccionadas por PETS & DOGUE.",
      latest: "Últimas historias",
      visual: "Periodismo visual",
      gallery: "ABRIR GALERÍA DE FOTOS →",
      emptyTitle:
        "No hay historias coincidentes",
      emptyDescription:
        "Prueba otra palabra o selecciona otra categoría."
    },

    newsletter: {
      title:
        "Recibe nuevas historias de PETS & DOGUE",
      description:
        "Nuevos números, artículos narrados, editoriales visuales y guías útiles.",
      placeholder: "Tu correo electrónico",
      button: "SUSCRIBIRSE"
    }
  }
};

(function () {
  "use strict";

  function addText(selector, key) {
    const element =
      document.querySelector(selector);

    if (element) {
      element.setAttribute("data-i18n", key);
    }
  }

  function addPlaceholder(selector, key) {
    const element =
      document.querySelector(selector);

    if (element) {
      element.setAttribute(
        "data-i18n-placeholder",
        key
      );
    }
  }

  function addMany(selector, keys) {
    document
      .querySelectorAll(selector)
      .forEach((element, index) => {
        if (keys[index]) {
          element.setAttribute(
            "data-i18n",
            keys[index]
          );
        }
      });
  }

  function prepareArticlesPage() {
    addText(
      ".account-side:first-child .account-link",
      "common.account.signIn"
    );

    addText(
      ".account-center",
      "common.account.edition"
    );

    addText(
      ".account-side.right .account-link",
      "common.account.joinClub"
    );

    addText(
      ".side-menu-header h2",
      "common.menu.contents"
    );

    addMany(".category-nav a", [
      "common.navigation.magazine",
      "common.navigation.articles",
      "common.navigation.photos",
      "common.navigation.coverStars",
      "common.navigation.fashion",
      "common.navigation.wellness",
      "common.navigation.travel",
      "common.navigation.places",
      "common.navigation.rescue",
      "common.navigation.contests",
      "common.navigation.community"
    ]);

    addText(
      ".hero-kicker",
      "articles.hero.kicker"
    );

    addText(
      ".hero h1",
      "articles.hero.title"
    );

    addText(
      ".hero p",
      "articles.hero.description"
    );

    addMany(".hero-actions .btn", [
      "articles.hero.explore",
      "articles.hero.listen",
      "articles.hero.cover"
    ]);

    addPlaceholder(
      "#articleSearch",
      "articles.search.placeholder"
    );

    addText(
      ".search-box button",
      "articles.search.button"
    );

    addMany(".filters .filter", [
      "articles.search.all",
      "articles.search.coverStars",
      "articles.search.fashion",
      "articles.search.travel",
      "articles.search.wellness",
      "articles.search.rescue",
      "articles.search.community",
      "articles.search.places"
    ]);

    const sectionHeadings =
      document.querySelectorAll(
        ".section-heading"
      );

    if (sectionHeadings[0]) {
      const title =
        sectionHeadings[0]
          .querySelector("h2");

      const description =
        sectionHeadings[0]
          .querySelector("p");

      if (title) {
        title.setAttribute(
          "data-i18n",
          "articles.sections.editor"
        );
      }

      if (description) {
        description.setAttribute(
          "data-i18n",
          "articles.sections.editorDescription"
        );
      }
    }

    if (sectionHeadings[1]) {
      const title =
        sectionHeadings[1]
          .querySelector("h2");

      if (title) {
        title.setAttribute(
          "data-i18n",
          "articles.sections.latest"
        );
      }
    }

    addText(
      ".visual-title h2",
      "articles.sections.visual"
    );

    addText(
      ".visual-title a",
      "articles.sections.gallery"
    );

    addText(
      "#emptyState h3",
      "articles.sections.emptyTitle"
    );

    addText(
      "#emptyState p",
      "articles.sections.emptyDescription"
    );

    addText(
      ".newsletter-inner h2",
      "articles.newsletter.title"
    );

    addText(
      ".newsletter-inner p",
      "articles.newsletter.description"
    );

    addPlaceholder(
      "#newsletterEmail",
      "articles.newsletter.placeholder"
    );

    addText(
      ".newsletter-form button",
      "articles.newsletter.button"
    );

    addText(
      ".footer-subtitle",
      "common.footer.subtitle"
    );

    addMany(".footer-links a", [
      "common.footer.home",
      "common.footer.latestIssue",
      "common.footer.articles",
      "common.footer.photos",
      "common.footer.coverStars",
      "common.footer.places",
      "common.footer.club",
      "common.footer.partners",
      "common.footer.contact",
      "common.footer.privacy",
      "common.footer.terms"
    ]);

    addText(
      ".admin-link",
      "common.footer.admin"
    );
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      prepareArticlesPage,
      { once: true }
    );
  } else {
    prepareArticlesPage();
  }
})();
/* COMPLETE ARTICLES PAGE TRANSLATIONS */

Object.assign(
  window.PetsDogueTranslations.articles.en,
  {
    stories: {
      coverStars: "Cover Stars",
      fashion: "Fashion",
      travel: "Travel",
      wellness: "Wellness",
      rescue: "Rescue",
      places: "Places",
      volunteers: "Volunteers",
      community: "Community"
    },

    results: {
      one: "One editorial story available.",
      many: "{count} editorial stories available."
    },

    featured: {
      mainLabel: "COVER STAR · LISTEN",
      mainTitle:
        "How To Prepare Your Pet for a Professional Magazine Photoshoot",
      mainDescription:
        "Comfort, grooming, light and the details that transform a beautiful portrait into an editorial image.",

      travelLabel: "TRAVEL · LISTEN",
      travelTitle:
        "The Rise of Luxury Pet-Friendly Hotels",

      rescueLabel: "RESCUE · LISTEN",
      rescueTitle:
        "Why Visibility Can Change an Animal’s Life"
    },

    cards: {
      audio: "🔊 AUDIO",
      readListen: "READ & LISTEN",

      photoshootCategory: "COVER STAR",
      photoshootTitle:
        "How To Prepare Your Pet for a Professional Magazine Photoshoot",
      photoshootDescription:
        "Simple grooming, lighting and comfort techniques for a beautiful editorial portrait.",

      fashionCategory: "FASHION",
      fashionTitle:
        "The New Rules of Luxury Pet Style",
      fashionDescription:
        "Modern animal fashion is becoming lighter, more expressive and more comfortable.",

      travelCategory: "TRAVEL",
      travelTitle:
        "The Rise of Luxury Pet-Friendly Hotels",
      travelDescription:
        "Hotels are redesigning the guest experience for people travelling with animal companions.",

      wellnessCategory: "WELLNESS",
      wellnessTitle:
        "Daily Rituals for a Calmer and Happier Pet",
      wellnessDescription:
        "Small routines can support comfort, confidence and a stronger relationship with your animal.",

      rescueCategory: "RESCUE",
      rescueTitle:
        "Why Visibility Can Change an Animal’s Life",
      rescueDescription:
        "A photograph and an honest story can connect rescue animals with support and future homes.",

      placesCategory: "PLACES",
      placesTitle:
        "How DOGUE Trust Protects Pet-Friendly Recommendations",
      placesDescription:
        "Community reports, verification and moderation can keep local information useful.",

      volunteersCategory: "COMMUNITY",
      volunteersTitle:
        "The People Helping Animals Behind the Scenes",
      volunteersDescription:
        "Volunteers provide transport, fostering, photography, fundraising and practical help.",

      communityCategory: "LOCAL COMMUNITY",
      communityTitle:
        "What Pet Owners Recommend Near You",
      communityDescription:
        "Local knowledge can reveal trusted walks, cafés, services and useful support nearby."
    },

    visualCards: {
      coverLabel: "COVER STAR",
      coverTitle: "The Face of a Future Issue",
      travelLabel: "TRAVEL",
      travelTitle: "Beautiful Escapes With Your Pet",
      fashionLabel: "FASHION",
      fashionTitle: "Editorial Style",
      rescueLabel: "RESCUE",
      rescueTitle: "A Life Worth Seeing",
      wellnessLabel: "WELLNESS",
      wellnessTitle: "Daily Care",
      localLabel: "LOCAL",
      localTitle: "Together Near You"
    },

    cover: {
      myPet: "MY PET IS",
      title: "THE NEXT\nCOVER STAR",
      enter: "TAP TO ENTER →"
    }
  }
);

Object.assign(
  window.PetsDogueTranslations.articles.ru,
  {
    stories: {
      coverStars: "Звёзды обложки",
      fashion: "Мода",
      travel: "Путешествия",
      wellness: "Здоровье",
      rescue: "Помощь",
      places: "Места",
      volunteers: "Волонтёры",
      community: "Сообщество"
    },

    results: {
      one: "Доступна одна редакционная история.",
      many: "Доступно историй: {count}."
    },

    featured: {
      mainLabel: "ЗВЕЗДА ОБЛОЖКИ · СЛУШАТЬ",
      mainTitle:
        "Как подготовить питомца к профессиональной журнальной фотосессии",
      mainDescription:
        "Комфорт, груминг, свет и детали, превращающие красивый портрет в редакционный снимок.",

      travelLabel: "ПУТЕШЕСТВИЯ · СЛУШАТЬ",
      travelTitle:
        "Расцвет роскошных отелей для путешествий с питомцами",

      rescueLabel: "ПОМОЩЬ · СЛУШАТЬ",
      rescueTitle:
        "Почему внимание может изменить жизнь животного"
    },

    cards: {
      audio: "🔊 АУДИО",
      readListen: "ЧИТАТЬ И СЛУШАТЬ",

      photoshootCategory: "ЗВЕЗДА ОБЛОЖКИ",
      photoshootTitle:
        "Как подготовить питомца к профессиональной журнальной фотосессии",
      photoshootDescription:
        "Простые приёмы груминга, освещения и создания комфорта для красивого редакционного портрета.",

      fashionCategory: "МОДА",
      fashionTitle:
        "Новые правила роскошного стиля для питомцев",
      fashionDescription:
        "Современная мода для животных становится легче, выразительнее и комфортнее.",

      travelCategory: "ПУТЕШЕСТВИЯ",
      travelTitle:
        "Расцвет роскошных отелей для путешествий с питомцами",
      travelDescription:
        "Отели меняют впечатления гостей, путешествующих вместе с животными.",

      wellnessCategory: "ЗДОРОВЬЕ",
      wellnessTitle:
        "Ежедневные ритуалы для спокойного и счастливого питомца",
      wellnessDescription:
        "Небольшие привычки помогают укрепить спокойствие, уверенность и отношения с животным.",

      rescueCategory: "ПОМОЩЬ",
      rescueTitle:
        "Почему внимание может изменить жизнь животного",
      rescueDescription:
        "Фотография и честная история помогают животным найти поддержку и будущий дом.",

      placesCategory: "МЕСТА",
      placesTitle:
        "Как DOGUE Trust проверяет рекомендации pet-friendly мест",
      placesDescription:
        "Отзывы сообщества, проверка и модерация помогают сохранять информацию полезной.",

      volunteersCategory: "СООБЩЕСТВО",
      volunteersTitle:
        "Люди, которые помогают животным за кулисами",
      volunteersDescription:
        "Волонтёры помогают с перевозкой, передержкой, фотографиями, сборами и практической поддержкой.",

      communityCategory: "МЕСТНОЕ СООБЩЕСТВО",
      communityTitle:
        "Что владельцы питомцев рекомендуют рядом с вами",
      communityDescription:
        "Местные жители знают проверенные маршруты, кафе, услуги и полезную поддержку."
    },

    visualCards: {
      coverLabel: "ЗВЕЗДА ОБЛОЖКИ",
      coverTitle: "Лицо будущего выпуска",
      travelLabel: "ПУТЕШЕСТВИЯ",
      travelTitle: "Красивые путешествия с питомцем",
      fashionLabel: "МОДА",
      fashionTitle: "Редакционный стиль",
      rescueLabel: "ПОМОЩЬ",
      rescueTitle: "Жизнь, которую стоит увидеть",
      wellnessLabel: "ЗДОРОВЬЕ",
      wellnessTitle: "Ежедневная забота",
      localLabel: "РЯДОМ",
      localTitle: "Вместе рядом с вами"
    },

    cover: {
      myPet: "МОЙ ПИТОМЕЦ —",
      title: "СЛЕДУЮЩАЯ\nЗВЕЗДА ОБЛОЖКИ",
      enter: "ПРИНЯТЬ УЧАСТИЕ →"
    }
  }
);

Object.assign(
  window.PetsDogueTranslations.articles.uk,
  {
    stories: {
      coverStars: "Зірки обкладинки",
      fashion: "Мода",
      travel: "Подорожі",
      wellness: "Здоров’я",
      rescue: "Допомога",
      places: "Місця",
      volunteers: "Волонтери",
      community: "Спільнота"
    },

    results: {
      one: "Доступна одна редакційна історія.",
      many: "Доступно історій: {count}."
    },

    featured: {
      mainLabel: "ЗІРКА ОБКЛАДИНКИ · СЛУХАТИ",
      mainTitle:
        "Як підготувати улюбленця до професійної журнальної фотосесії",
      mainDescription:
        "Комфорт, грумінг, світло й деталі, що перетворюють гарний портрет на редакційне фото.",

      travelLabel: "ПОДОРОЖІ · СЛУХАТИ",
      travelTitle:
        "Розквіт розкішних готелів для подорожей з улюбленцями",

      rescueLabel: "ДОПОМОГА · СЛУХАТИ",
      rescueTitle:
        "Чому увага може змінити життя тварини"
    },

    cards: {
      audio: "🔊 АУДІО",
      readListen: "ЧИТАТИ ТА СЛУХАТИ",

      photoshootCategory: "ЗІРКА ОБКЛАДИНКИ",
      photoshootTitle:
        "Як підготувати улюбленця до професійної журнальної фотосесії",
      photoshootDescription:
        "Прості прийоми грумінгу, освітлення та комфорту для красивого редакційного портрета.",

      fashionCategory: "МОДА",
      fashionTitle:
        "Нові правила розкішного стилю для улюбленців",
      fashionDescription:
        "Сучасна мода для тварин стає легшою, виразнішою та комфортнішою.",

      travelCategory: "ПОДОРОЖІ",
      travelTitle:
        "Розквіт розкішних готелів для подорожей з улюбленцями",
      travelDescription:
        "Готелі змінюють досвід гостей, які подорожують разом із тваринами.",

      wellnessCategory: "ЗДОРОВ’Я",
      wellnessTitle:
        "Щоденні ритуали для спокійного й щасливого улюбленця",
      wellnessDescription:
        "Невеликі звички підтримують комфорт, упевненість і міцніший зв’язок із твариною.",

      rescueCategory: "ДОПОМОГА",
      rescueTitle:
        "Чому увага може змінити життя тварини",
      rescueDescription:
        "Фотографія та чесна історія допомагають тваринам знайти підтримку й майбутній дім.",

      placesCategory: "МІСЦЯ",
      placesTitle:
        "Як DOGUE Trust перевіряє рекомендації pet-friendly місць",
      placesDescription:
        "Відгуки спільноти, перевірка та модерація допомагають зберігати інформацію корисною.",

      volunteersCategory: "СПІЛЬНОТА",
      volunteersTitle:
        "Люди, які допомагають тваринам за лаштунками",
      volunteersDescription:
        "Волонтери допомагають із перевезенням, перетримкою, фотографіями, зборами та практичною підтримкою.",

      communityCategory: "МІСЦЕВА СПІЛЬНОТА",
      communityTitle:
        "Що власники улюбленців рекомендують поруч із вами",
      communityDescription:
        "Місцеві жителі знають перевірені маршрути, кафе, послуги й корисну підтримку."
    },

    visualCards: {
      coverLabel: "ЗІРКА ОБКЛАДИНКИ",
      coverTitle: "Обличчя майбутнього випуску",
      travelLabel: "ПОДОРОЖІ",
      travelTitle: "Прекрасні подорожі з улюбленцем",
      fashionLabel: "МОДА",
      fashionTitle: "Редакційний стиль",
      rescueLabel: "ДОПОМОГА",
      rescueTitle: "Життя, яке варто побачити",
      wellnessLabel: "ЗДОРОВ’Я",
      wellnessTitle: "Щоденна турбота",
      localLabel: "ПОРУЧ",
      localTitle: "Разом поруч із вами"
    },

    cover: {
      myPet: "МІЙ УЛЮБЛЕНЕЦЬ —",
      title: "НАСТУПНА\nЗІРКА ОБКЛАДИНКИ",
      enter: "ВЗЯТИ УЧАСТЬ →"
    }
  }
);

Object.assign(
  window.PetsDogueTranslations.articles.es,
  {
    stories: {
      coverStars: "Estrellas de portada",
      fashion: "Moda",
      travel: "Viajes",
      wellness: "Bienestar",
      rescue: "Rescate",
      places: "Lugares",
      volunteers: "Voluntarios",
      community: "Comunidad"
    },

    results: {
      one: "Hay una historia editorial disponible.",
      many: "Hay {count} historias editoriales disponibles."
    },

    featured: {
      mainLabel: "ESTRELLA DE PORTADA · ESCUCHAR",
      mainTitle:
        "Cómo preparar a tu mascota para una sesión fotográfica profesional",
      mainDescription:
        "Comodidad, aseo, luz y detalles que convierten un retrato bonito en una imagen editorial.",

      travelLabel: "VIAJES · ESCUCHAR",
      travelTitle:
        "El auge de los hoteles de lujo pet-friendly",

      rescueLabel: "RESCATE · ESCUCHAR",
      rescueTitle:
        "Por qué la visibilidad puede cambiar la vida de un animal"
    },

    cards: {
      audio: "🔊 AUDIO",
      readListen: "LEER Y ESCUCHAR",

      photoshootCategory: "ESTRELLA DE PORTADA",
      photoshootTitle:
        "Cómo preparar a tu mascota para una sesión fotográfica profesional",
      photoshootDescription:
        "Técnicas sencillas de aseo, iluminación y comodidad para un retrato editorial.",

      fashionCategory: "MODA",
      fashionTitle:
        "Las nuevas reglas del estilo de lujo para mascotas",
      fashionDescription:
        "La moda animal moderna es más ligera, expresiva y cómoda.",

      travelCategory: "VIAJES",
      travelTitle:
        "El auge de los hoteles de lujo pet-friendly",
      travelDescription:
        "Los hoteles están mejorando la experiencia de quienes viajan con animales.",

      wellnessCategory: "BIENESTAR",
      wellnessTitle:
        "Rituales diarios para una mascota más tranquila y feliz",
      wellnessDescription:
        "Las pequeñas rutinas favorecen la comodidad, la confianza y una relación más fuerte.",

      rescueCategory: "RESCATE",
      rescueTitle:
        "Por qué la visibilidad puede cambiar la vida de un animal",
      rescueDescription:
        "Una fotografía y una historia sincera pueden conectar a los animales con ayuda y futuros hogares.",

      placesCategory: "LUGARES",
      placesTitle:
        "Cómo DOGUE Trust protege las recomendaciones pet-friendly",
      placesDescription:
        "Los reportes, la verificación y la moderación mantienen útil la información local.",

      volunteersCategory: "COMUNIDAD",
      volunteersTitle:
        "Las personas que ayudan a los animales entre bastidores",
      volunteersDescription:
        "Los voluntarios ayudan con transporte, acogida, fotografía, recaudación y apoyo práctico.",

      communityCategory: "COMUNIDAD LOCAL",
      communityTitle:
        "Lo que recomiendan los dueños de mascotas cerca de ti",
      communityDescription:
        "El conocimiento local revela paseos, cafés, servicios y apoyo de confianza."
    },

    visualCards: {
      coverLabel: "ESTRELLA DE PORTADA",
      coverTitle: "El rostro de un futuro número",
      travelLabel: "VIAJES",
      travelTitle: "Hermosas escapadas con tu mascota",
      fashionLabel: "MODA",
      fashionTitle: "Estilo editorial",
      rescueLabel: "RESCATE",
      rescueTitle: "Una vida que merece ser vista",
      wellnessLabel: "BIENESTAR",
      wellnessTitle: "Cuidados diarios",
      localLabel: "LOCAL",
      localTitle: "Juntos cerca de ti"
    },

    cover: {
      myPet: "MI MASCOTA ES",
      title: "LA PRÓXIMA\nESTRELLA DE PORTADA",
      enter: "PARTICIPAR →"
    }
  }
);

(function () {
  "use strict";

  function setKey(element, key) {
    if (element) {
      element.setAttribute("data-i18n", key);
    }
  }

  function prepareCompleteArticlesTranslations() {
    const storyLabels =
      document.querySelectorAll(".story-item span");

    const storyKeys = [
      "coverStars",
      "fashion",
      "travel",
      "wellness",
      "rescue",
      "places",
      "volunteers",
      "community"
    ];

    storyLabels.forEach((element, index) => {
      if (storyKeys[index]) {
        setKey(
          element,
          `articles.stories.${storyKeys[index]}`
        );
      }
    });

    const featuredCards =
      document.querySelectorAll(
        ".featured-main, .featured-small"
      );

    if (featuredCards[0]) {
      setKey(
        featuredCards[0].querySelector(".featured-copy span"),
        "articles.featured.mainLabel"
      );

      setKey(
        featuredCards[0].querySelector(".featured-copy h2"),
        "articles.featured.mainTitle"
      );

      setKey(
        featuredCards[0].querySelector(".featured-copy p"),
        "articles.featured.mainDescription"
      );
    }

    if (featuredCards[1]) {
      setKey(
        featuredCards[1].querySelector(".featured-copy span"),
        "articles.featured.travelLabel"
      );

      setKey(
        featuredCards[1].querySelector(".featured-copy h2"),
        "articles.featured.travelTitle"
      );
    }

    if (featuredCards[2]) {
      setKey(
        featuredCards[2].querySelector(".featured-copy span"),
        "articles.featured.rescueLabel"
      );

      setKey(
        featuredCards[2].querySelector(".featured-copy h2"),
        "articles.featured.rescueTitle"
      );
    }

    const cardKeys = [
      "photoshoot",
      "fashion",
      "travel",
      "wellness",
      "rescue",
      "places",
      "volunteers",
      "community"
    ];

    document
      .querySelectorAll(".article-card")
      .forEach((card, index) => {
        const key = cardKeys[index];
        if (!key) return;

        setKey(
          card.querySelector(".audio-badge"),
          "articles.cards.audio"
        );

        setKey(
          card.querySelector(".article-category"),
          `articles.cards.${key}Category`
        );

        setKey(
          card.querySelector(".article-content h3"),
          `articles.cards.${key}Title`
        );

        setKey(
          card.querySelector(".article-content > p"),
          `articles.cards.${key}Description`
        );

        setKey(
          card.querySelector(".read-button"),
          "articles.cards.readListen"
        );
      });

    const visualKeys = [
      "cover",
      "travel",
      "fashion",
      "rescue",
      "wellness",
      "local"
    ];

    document
      .querySelectorAll(".visual-card")
      .forEach((card, index) => {
        const key = visualKeys[index];
        if (!key) return;

        setKey(
          card.querySelector(".visual-copy span"),
          `articles.visualCards.${key}Label`
        );

        setKey(
          card.querySelector(".visual-copy h3"),
          `articles.visualCards.${key}Title`
        );
      });

    setKey(
      document.querySelector(".star span"),
      "articles.cover.myPet"
    );

    setKey(
      document.querySelector(".star strong"),
      "articles.cover.title"
    );

    setKey(
      document.querySelector(".star em"),
      "articles.cover.enter"
    );
  }

  function updateTranslatedResults() {
    const cards =
      Array.from(
        document.querySelectorAll(".article-card")
      );

    const visibleCount =
      cards.filter((card) => {
        return card.style.display !== "none";
      }).length;

    const language =
      window.PetsDogueLanguage &&
      window.PetsDogueLanguage.getCurrentLanguage
        ? window.PetsDogueLanguage.getCurrentLanguage()
        : { code: "en" };

    const translations =
      window.PetsDogueTranslations.articles[
        language.code
      ] ||
      window.PetsDogueTranslations.articles.en;

    const resultsText =
      document.getElementById("resultsText");

    if (!resultsText) return;

    if (visibleCount === 1) {
      resultsText.textContent =
        translations.results.one;
    } else {
      resultsText.textContent =
        translations.results.many.replace(
          "{count}",
          visibleCount
        );
    }
  }

  const originalFilterArticles =
    window.filterArticles;

  if (typeof originalFilterArticles === "function") {
    window.filterArticles = function () {
      originalFilterArticles();
      updateTranslatedResults();
    };
  }

  window.addEventListener(
    "petsdogue:languagechange",
    function () {
      setTimeout(
        updateTranslatedResults,
        0
      );
    }
  );

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        prepareCompleteArticlesTranslations();
        updateTranslatedResults();
      },
      { once: true }
    );
  } else {
    prepareCompleteArticlesTranslations();
    updateTranslatedResults();
  }
})();
