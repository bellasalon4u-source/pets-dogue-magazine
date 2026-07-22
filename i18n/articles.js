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
