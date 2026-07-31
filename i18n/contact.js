window.PetsDogueTranslations =
  window.PetsDogueTranslations || {};

window.PetsDogueTranslations.contact = {
  en: {
    meta: {
      title: "Contact - PETS & DOGUE"
    },

    navigation: {
      home: "Home",
      latestIssue: "Latest Issue",
      archive: "Archive",
      articles: "Articles",
      categories: "Categories",
      about: "About",
      advertise: "Advertise",
      contact: "Contact"
    },

    hero: {
      title: "Contact Us",
      text:
        "Advertising enquiries, media partnerships, editorial submissions, cover star applications and general questions."
    },

    form: {
      fullName: "Full Name",
      namePlaceholder: "Your name",

      email: "Email Address",
      emailPlaceholder: "your@email.com",

      company: "Company (optional)",
      companyPlaceholder: "Company name",

      message: "Message",
      messagePlaceholder: "Write your message...",

      send: "Send Message"
    },

    information: {
      title: "PETS & DOGUE Editorial Office",
      emailLabel: "Email:",
      text:
        "For advertising, collaborations, cover features and editorial opportunities, please contact our team."
    }
  },

  uk: {
    meta: {
      title: "Контакти - PETS & DOGUE"
    },

    navigation: {
      home: "Головна",
      latestIssue: "Останній випуск",
      archive: "Архів",
      articles: "Статті",
      categories: "Категорії",
      about: "Про нас",
      advertise: "Реклама",
      contact: "Контакти"
    },

    hero: {
      title: "Зв’яжіться з нами",
      text:
        "Запити щодо реклами, медіапартнерства, редакційні матеріали, заявки на участь на обкладинці та загальні запитання."
    },

    form: {
      fullName: "Повне ім’я",
      namePlaceholder: "Ваше ім’я",

      email: "Електронна пошта",
      emailPlaceholder: "your@email.com",

      company: "Компанія (необов’язково)",
      companyPlaceholder: "Назва компанії",

      message: "Повідомлення",
      messagePlaceholder: "Напишіть ваше повідомлення...",

      send: "Надіслати повідомлення"
    },

    information: {
      title: "Редакція PETS & DOGUE",
      emailLabel: "Електронна пошта:",
      text:
        "Щодо реклами, співпраці, публікацій на обкладинці та редакційних можливостей звертайтеся до нашої команди."
    }
  },

  ru: {
    meta: {
      title: "Контакты - PETS & DOGUE"
    },

    navigation: {
      home: "Главная",
      latestIssue: "Последний выпуск",
      archive: "Архив",
      articles: "Статьи",
      categories: "Категории",
      about: "О нас",
      advertise: "Реклама",
      contact: "Контакты"
    },

    hero: {
      title: "Свяжитесь с нами",
      text:
        "Вопросы о рекламе, медиапартнёрстве, редакционных материалах, заявках на обложку и общие обращения."
    },

    form: {
      fullName: "Полное имя",
      namePlaceholder: "Ваше имя",

      email: "Электронная почта",
      emailPlaceholder: "your@email.com",

      company: "Компания (необязательно)",
      companyPlaceholder: "Название компании",

      message: "Сообщение",
      messagePlaceholder: "Напишите ваше сообщение...",

      send: "Отправить сообщение"
    },

    information: {
      title: "Редакция PETS & DOGUE",
      emailLabel: "Электронная почта:",
      text:
        "По вопросам рекламы, сотрудничества, публикаций на обложке и редакционных возможностей обращайтесь к нашей команде."
    }
  },

  es: {
    meta: {
      title: "Contacto - PETS & DOGUE"
    },

    navigation: {
      home: "Inicio",
      latestIssue: "Último número",
      archive: "Archivo",
      articles: "Artículos",
      categories: "Categorías",
      about: "Sobre nosotros",
      advertise: "Publicidad",
      contact: "Contacto"
    },

    hero: {
      title: "Contáctanos",
      text:
        "Consultas publicitarias, colaboraciones con medios, envíos editoriales, solicitudes para aparecer en portada y preguntas generales."
    },

    form: {
      fullName: "Nombre completo",
      namePlaceholder: "Tu nombre",

      email: "Correo electrónico",
      emailPlaceholder: "your@email.com",

      company: "Empresa (opcional)",
      companyPlaceholder: "Nombre de la empresa",

      message: "Mensaje",
      messagePlaceholder: "Escribe tu mensaje...",

      send: "Enviar mensaje"
    },

    information: {
      title: "Oficina editorial de PETS & DOGUE",
      emailLabel: "Correo electrónico:",
      text:
        "Para publicidad, colaboraciones, apariciones en portada y oportunidades editoriales, contacta con nuestro equipo."
    }
  }
};

(function () {
  "use strict";

  function setText(selector, key) {
    const element =
      document.querySelector(selector);

    if (element) {
      element.setAttribute(
        "data-i18n",
        key
      );
    }
  }

  function setMany(selector, keys) {
    document
      .querySelectorAll(selector)
      .forEach(function (element, index) {
        if (keys[index]) {
          element.setAttribute(
            "data-i18n",
            keys[index]
          );
        }
      });
  }

  function getLanguageCode() {
    if (
      window.PetsDogueLanguage &&
      typeof window.PetsDogueLanguage
        .getCurrentLanguage === "function"
    ) {
      return window.PetsDogueLanguage
        .getCurrentLanguage().code;
    }

    return (
      new URLSearchParams(
        window.location.search
      ).get("lang") ||
      localStorage.getItem(
        "pets_dogue_language"
      ) ||
      "en"
    );
  }

  function getDictionary() {
    const language =
      getLanguageCode();

    return (
      window.PetsDogueTranslations
        .contact[language] ||
      window.PetsDogueTranslations
        .contact.en
    );
  }

  function prepareNavigation() {
    setMany(
      "header nav a",
      [
        "contact.navigation.home",
        "contact.navigation.latestIssue",
        "contact.navigation.archive",
        "contact.navigation.articles",
        "contact.navigation.categories",
        "contact.navigation.about",
        "contact.navigation.advertise",
        "contact.navigation.contact"
      ]
    );
  }

  function prepareHero() {
    setText(
      ".hero h1",
      "contact.hero.title"
    );

    setText(
      ".hero p",
      "contact.hero.text"
    );
  }

  function prepareForm() {
    setMany(
      ".contact-box label",
      [
        "contact.form.fullName",
        "contact.form.email",
        "contact.form.company",
        "contact.form.message"
      ]
    );

    setText(
      ".contact-box button",
      "contact.form.send"
    );
  }

  function translatePlaceholders() {
    const dictionary =
      getDictionary();

    const inputs =
      document.querySelectorAll(
        ".contact-box input"
      );

    if (inputs[0]) {
      inputs[0].placeholder =
        dictionary.form.namePlaceholder;
    }

    if (inputs[1]) {
      inputs[1].placeholder =
        dictionary.form.emailPlaceholder;
    }

    if (inputs[2]) {
      inputs[2].placeholder =
        dictionary.form.companyPlaceholder;
    }

    const textarea =
      document.querySelector(
        ".contact-box textarea"
      );

    if (textarea) {
      textarea.placeholder =
        dictionary.form.messagePlaceholder;
    }
  }

  function prepareInformation() {
    setText(
      ".info h2",
      "contact.information.title"
    );

    const paragraphs =
      document.querySelectorAll(
        ".info p"
      );

    if (paragraphs[1]) {
      paragraphs[1].setAttribute(
        "data-i18n",
        "contact.information.text"
      );
    }
  }

  function translateEmail() {
    const dictionary =
      getDictionary();

    const emailParagraph =
      document.querySelector(
        ".info p"
      );

    if (emailParagraph) {
      emailParagraph.innerHTML =
        dictionary.information.emailLabel +
        " " +
        '<a href="mailto:petsanddogue@gmail.com">' +
        "petsanddogue@gmail.com" +
        "</a>";
    }
  }

  function prepareFooter() {
    setText(
      "footer > p",
      "common.footer.subtitle"
    );
  }

  function updateMetadata() {
    document.title =
      getDictionary().meta.title;

    document.documentElement.lang =
      getLanguageCode();
  }

  function updateManualTranslations() {
    translatePlaceholders();
    translateEmail();
    updateMetadata();
  }

  function preparePage() {
    prepareNavigation();
    prepareHero();
    prepareForm();
    prepareInformation();
    prepareFooter();
    updateManualTranslations();
  }

  window.addEventListener(
    "petsdogue:languagechange",
    function () {
      window.setTimeout(
        updateManualTranslations,
        0
      );
    }
  );

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      preparePage,
      {
        once: true
      }
    );
  } else {
    preparePage();
  }
})();
