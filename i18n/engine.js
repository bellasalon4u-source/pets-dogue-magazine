(function () {
  "use strict";

  const STORAGE_KEY = "pets_dogue_language";
  const DEFAULT_LANGUAGE = "en";

  const supportedLanguages = {
    en: {
      code: "en",
      label: "English",
      shortLabel: "EN",
      locale: "en-GB",
      direction: "ltr"
    },

    ru: {
      code: "ru",
      label: "Русский",
      shortLabel: "RU",
      locale: "ru-RU",
      direction: "ltr"
    },

    uk: {
      code: "uk",
      label: "Українська",
      shortLabel: "UA",
      locale: "uk-UA",
      direction: "ltr"
    }
  };

  function getSavedLanguageCode() {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    return supportedLanguages[savedLanguage]
      ? savedLanguage
      : DEFAULT_LANGUAGE;
  }

  function getCurrentLanguage() {
    const languageCode = getSavedLanguageCode();

    return supportedLanguages[languageCode];
  }

  function setDocumentLanguage(languageCode) {
    const language =
      supportedLanguages[languageCode] ||
      supportedLanguages[DEFAULT_LANGUAGE];

    document.documentElement.lang = language.code;
    document.documentElement.dir = language.direction;
  }

  function getTranslationGroup(groupName, languageCode) {
    const translations =
      window.PetsDogueTranslations || {};

    const group = translations[groupName];

    if (!group) {
      return null;
    }

    return (
      group[languageCode] ||
      group[DEFAULT_LANGUAGE] ||
      null
    );
  }

  function getNestedValue(object, path) {
    if (!object || !path) {
      return undefined;
    }

    return path
      .split(".")
      .reduce((currentValue, key) => {
        if (
          currentValue &&
          Object.prototype.hasOwnProperty.call(
            currentValue,
            key
          )
        ) {
          return currentValue[key];
        }

        return undefined;
      }, object);
  }

  function resolveTranslation(
    translationKey,
    languageCode
  ) {
    if (!translationKey) {
      return undefined;
    }

    const separatorIndex =
      translationKey.indexOf(".");

    if (separatorIndex === -1) {
      return undefined;
    }

    const groupName =
      translationKey.slice(0, separatorIndex);

    const valuePath =
      translationKey.slice(separatorIndex + 1);

    const currentGroup =
      getTranslationGroup(
        groupName,
        languageCode
      );

    let translatedValue =
      getNestedValue(
        currentGroup,
        valuePath
      );

    if (
      translatedValue === undefined &&
      languageCode !== DEFAULT_LANGUAGE
    ) {
      const fallbackGroup =
        getTranslationGroup(
          groupName,
          DEFAULT_LANGUAGE
        );

      translatedValue =
        getNestedValue(
          fallbackGroup,
          valuePath
        );
    }

    return translatedValue;
  }

  function translateTextElements(languageCode) {
    const elements =
      document.querySelectorAll(
        "[data-i18n]"
      );

    elements.forEach((element) => {
      const translationKey =
        element.getAttribute("data-i18n");

      const translatedValue =
        resolveTranslation(
          translationKey,
          languageCode
        );

      if (
        translatedValue === undefined ||
        translatedValue === null
      ) {
        return;
      }

      element.textContent =
        String(translatedValue);
    });
  }

  function translateHtmlElements(languageCode) {
    const elements =
      document.querySelectorAll(
        "[data-i18n-html]"
      );

    elements.forEach((element) => {
      const translationKey =
        element.getAttribute(
          "data-i18n-html"
        );

      const translatedValue =
        resolveTranslation(
          translationKey,
          languageCode
        );

      if (
        translatedValue === undefined ||
        translatedValue === null
      ) {
        return;
      }

      element.innerHTML =
        String(translatedValue);
    });
  }

  function translatePlaceholders(languageCode) {
    const elements =
      document.querySelectorAll(
        "[data-i18n-placeholder]"
      );

    elements.forEach((element) => {
      const translationKey =
        element.getAttribute(
          "data-i18n-placeholder"
        );

      const translatedValue =
        resolveTranslation(
          translationKey,
          languageCode
        );

      if (
        translatedValue === undefined ||
        translatedValue === null
      ) {
        return;
      }

      element.setAttribute(
        "placeholder",
        String(translatedValue)
      );
    });
  }

  function translateAttributes(languageCode) {
    const elements =
      document.querySelectorAll(
        "[data-i18n-attr]"
      );

    elements.forEach((element) => {
      const configuration =
        element.getAttribute(
          "data-i18n-attr"
        );

      if (!configuration) {
        return;
      }

      configuration
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => {
          const separatorIndex =
            item.indexOf(":");

          if (separatorIndex === -1) {
            return;
          }

          const attributeName =
            item
              .slice(0, separatorIndex)
              .trim();

          const translationKey =
            item
              .slice(separatorIndex + 1)
              .trim();

          const translatedValue =
            resolveTranslation(
              translationKey,
              languageCode
            );

          if (
            !attributeName ||
            translatedValue === undefined ||
            translatedValue === null
          ) {
            return;
          }

          element.setAttribute(
            attributeName,
            String(translatedValue)
          );
        });
    });
  }

  function translateMetadata(languageCode) {
    const translatedTitle =
      resolveTranslation(
        "common.meta.title",
        languageCode
      );

    const translatedDescription =
      resolveTranslation(
        "common.meta.description",
        languageCode
      );

    if (translatedTitle) {
      document.title =
        translatedTitle;
    }

    const descriptionMeta =
      document.querySelector(
        'meta[name="description"]'
      );

    if (
      descriptionMeta &&
      translatedDescription
    ) {
      descriptionMeta.setAttribute(
        "content",
        translatedDescription
      );
    }
  }

  function updateLanguageControls(languageCode) {
    const language =
      supportedLanguages[languageCode];

    document
      .querySelectorAll(
        "[data-language-current]"
      )
      .forEach((element) => {
        element.textContent =
          language.shortLabel;
      });

    document
      .querySelectorAll(
        "[data-language-option]"
      )
      .forEach((element) => {
        const optionLanguage =
          element.getAttribute(
            "data-language-option"
          );

        const isActive =
          optionLanguage === languageCode;

        element.classList.toggle(
          "active",
          isActive
        );

        element.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });
  }

  function dispatchLanguageChange(languageCode) {
    const language =
      supportedLanguages[languageCode];

    window.dispatchEvent(
      new CustomEvent(
        "petsdogue:languagechange",
        {
          detail: {
            language
          }
        }
      )
    );
  }

  function applyLanguage(languageCode) {
    const safeLanguageCode =
      supportedLanguages[languageCode]
        ? languageCode
        : DEFAULT_LANGUAGE;

    setDocumentLanguage(
      safeLanguageCode
    );

    translateTextElements(
      safeLanguageCode
    );

    translateHtmlElements(
      safeLanguageCode
    );

    translatePlaceholders(
      safeLanguageCode
    );

    translateAttributes(
      safeLanguageCode
    );

    translateMetadata(
      safeLanguageCode
    );

    updateLanguageControls(
      safeLanguageCode
    );

    dispatchLanguageChange(
      safeLanguageCode
    );
  }

  function setLanguage(languageCode) {
    if (
      !supportedLanguages[languageCode]
    ) {
      return false;
    }

    localStorage.setItem(
      STORAGE_KEY,
      languageCode
    );

    applyLanguage(
      languageCode
    );

    return true;
  }

  function translate(key, languageCode) {
    const safeLanguageCode =
      languageCode &&
      supportedLanguages[languageCode]
        ? languageCode
        : getSavedLanguageCode();

    return resolveTranslation(
      key,
      safeLanguageCode
    );
  }

  function bindLanguageControls() {
    document.addEventListener(
      "click",
      (event) => {
        const option =
          event.target.closest(
            "[data-language-option]"
          );

        if (!option) {
          return;
        }

        const languageCode =
          option.getAttribute(
            "data-language-option"
          );

        setLanguage(languageCode);
      }
    );
  }

  function initialise() {
    bindLanguageControls();

    applyLanguage(
      getSavedLanguageCode()
    );

    document.documentElement.classList.add(
      "i18n-ready"
    );
  }

  window.PetsDogueLanguage = {
    initialise,
    applyLanguage,
    setLanguage,
    getCurrentLanguage,
    getSupportedLanguages() {
      return {
        ...supportedLanguages
      };
    },
    translate
  };

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initialise,
      {
        once: true
      }
    );
  } else {
    initialise();
  }
})();
