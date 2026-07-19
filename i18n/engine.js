(function () {
  "use strict";

  const STORAGE_KEY = "pets_dogue_language";
  const DEFAULT_LANGUAGE = "en";

  const supportedLanguages = {
    en: { code: "en", label: "English", shortLabel: "EN", locale: "en-GB", direction: "ltr" },
    uk: { code: "uk", label: "Українська", shortLabel: "UA", locale: "uk-UA", direction: "ltr" },
    ru: { code: "ru", label: "Русский", shortLabel: "RU", locale: "ru-RU", direction: "ltr" },
    fr: { code: "fr", label: "Français", shortLabel: "FR", locale: "fr-FR", direction: "ltr" },
    de: { code: "de", label: "Deutsch", shortLabel: "DE", locale: "de-DE", direction: "ltr" },
    es: { code: "es", label: "Español", shortLabel: "ES", locale: "es-ES", direction: "ltr" },
    it: { code: "it", label: "Italiano", shortLabel: "IT", locale: "it-IT", direction: "ltr" },
    pt: { code: "pt", label: "Português", shortLabel: "PT", locale: "pt-PT", direction: "ltr" },
    nl: { code: "nl", label: "Nederlands", shortLabel: "NL", locale: "nl-NL", direction: "ltr" },
    pl: { code: "pl", label: "Polski", shortLabel: "PL", locale: "pl-PL", direction: "ltr" },
    cs: { code: "cs", label: "Čeština", shortLabel: "CZ", locale: "cs-CZ", direction: "ltr" },
    sk: { code: "sk", label: "Slovenčina", shortLabel: "SK", locale: "sk-SK", direction: "ltr" },
    hu: { code: "hu", label: "Magyar", shortLabel: "HU", locale: "hu-HU", direction: "ltr" },
    ro: { code: "ro", label: "Română", shortLabel: "RO", locale: "ro-RO", direction: "ltr" },
    bg: { code: "bg", label: "Български", shortLabel: "BG", locale: "bg-BG", direction: "ltr" },
    el: { code: "el", label: "Ελληνικά", shortLabel: "GR", locale: "el-GR", direction: "ltr" },
    sv: { code: "sv", label: "Svenska", shortLabel: "SE", locale: "sv-SE", direction: "ltr" },
    da: { code: "da", label: "Dansk", shortLabel: "DK", locale: "da-DK", direction: "ltr" },
    no: { code: "no", label: "Norsk", shortLabel: "NO", locale: "nb-NO", direction: "ltr" },
    fi: { code: "fi", label: "Suomi", shortLabel: "FI", locale: "fi-FI", direction: "ltr" },
    tr: { code: "tr", label: "Türkçe", shortLabel: "TR", locale: "tr-TR", direction: "ltr" },
    ar: { code: "ar", label: "العربية", shortLabel: "AR", locale: "ar-SA", direction: "rtl" },
    hi: { code: "hi", label: "हिन्दी", shortLabel: "HI", locale: "hi-IN", direction: "ltr" }
  };

  function getSavedLanguageCode() {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    return supportedLanguages[savedLanguage] ? savedLanguage : DEFAULT_LANGUAGE;
  }

  function getCurrentLanguage() {
    return supportedLanguages[getSavedLanguageCode()];
  }

  function setDocumentLanguage(languageCode) {
    const language = supportedLanguages[languageCode] || supportedLanguages[DEFAULT_LANGUAGE];
    document.documentElement.lang = language.code;
    document.documentElement.dir = language.direction;
    document.body.classList.toggle("rtl-language", language.direction === "rtl");
  }

  function getTranslationGroup(groupName, languageCode) {
    const translations = window.PetsDogueTranslations || {};
    const group = translations[groupName];
    if (!group) return null;
    return group[languageCode] || group[DEFAULT_LANGUAGE] || null;
  }

  function getNestedValue(object, path) {
    if (!object || !path) return undefined;
    return path.split(".").reduce((currentValue, key) => {
      if (
        currentValue &&
        Object.prototype.hasOwnProperty.call(currentValue, key)
      ) {
        return currentValue[key];
      }
      return undefined;
    }, object);
  }

  function resolveTranslation(translationKey, languageCode) {
    if (!translationKey) return undefined;

    const separatorIndex = translationKey.indexOf(".");
    if (separatorIndex === -1) return undefined;

    const groupName = translationKey.slice(0, separatorIndex);
    const valuePath = translationKey.slice(separatorIndex + 1);
    const currentGroup = getTranslationGroup(groupName, languageCode);

    let translatedValue = getNestedValue(currentGroup, valuePath);

    if (
      translatedValue === undefined &&
      languageCode !== DEFAULT_LANGUAGE
    ) {
      const fallbackGroup = getTranslationGroup(groupName, DEFAULT_LANGUAGE);
      translatedValue = getNestedValue(fallbackGroup, valuePath);
    }

    return translatedValue;
  }

  function translateTextElements(languageCode) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const translatedValue = resolveTranslation(
        element.getAttribute("data-i18n"),
        languageCode
      );

      if (translatedValue !== undefined && translatedValue !== null) {
        element.textContent = String(translatedValue);
      }
    });
  }

  function translateHtmlElements(languageCode) {
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const translatedValue = resolveTranslation(
        element.getAttribute("data-i18n-html"),
        languageCode
      );

      if (translatedValue !== undefined && translatedValue !== null) {
        element.innerHTML = String(translatedValue);
      }
    });
  }

  function translatePlaceholders(languageCode) {
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const translatedValue = resolveTranslation(
        element.getAttribute("data-i18n-placeholder"),
        languageCode
      );

      if (translatedValue !== undefined && translatedValue !== null) {
        element.setAttribute("placeholder", String(translatedValue));
      }
    });
  }

  function translateAttributes(languageCode) {
    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      const configuration = element.getAttribute("data-i18n-attr");
      if (!configuration) return;

      configuration
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => {
          const separatorIndex = item.indexOf(":");
          if (separatorIndex === -1) return;

          const attributeName = item.slice(0, separatorIndex).trim();
          const translationKey = item.slice(separatorIndex + 1).trim();
          const translatedValue = resolveTranslation(translationKey, languageCode);

          if (
            attributeName &&
            translatedValue !== undefined &&
            translatedValue !== null
          ) {
            element.setAttribute(attributeName, String(translatedValue));
          }
        });
    });
  }

  function translateMetadata(languageCode) {
    const translatedTitle = resolveTranslation("common.meta.title", languageCode);
    const translatedDescription = resolveTranslation(
      "common.meta.description",
      languageCode
    );

    if (translatedTitle) document.title = translatedTitle;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta && translatedDescription) {
      descriptionMeta.setAttribute("content", translatedDescription);
    }
  }

  function updateLanguageControls(languageCode) {
    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) languageSelect.value = languageCode;

    document.querySelectorAll("[data-language-current]").forEach((element) => {
      element.textContent = supportedLanguages[languageCode].shortLabel;
    });

    document.querySelectorAll("[data-language-option]").forEach((element) => {
      const isActive =
        element.getAttribute("data-language-option") === languageCode;

      element.classList.toggle("active", isActive);
      element.setAttribute("aria-pressed", String(isActive));
    });
  }

  function dispatchLanguageChange(languageCode) {
    window.dispatchEvent(
      new CustomEvent("petsdogue:languagechange", {
        detail: { language: supportedLanguages[languageCode] }
      })
    );
  }

  function applyLanguage(languageCode) {
    const safeLanguageCode = supportedLanguages[languageCode]
      ? languageCode
      : DEFAULT_LANGUAGE;

    setDocumentLanguage(safeLanguageCode);
    translateTextElements(safeLanguageCode);
    translateHtmlElements(safeLanguageCode);
    translatePlaceholders(safeLanguageCode);
    translateAttributes(safeLanguageCode);
    translateMetadata(safeLanguageCode);
    updateLanguageControls(safeLanguageCode);
    dispatchLanguageChange(safeLanguageCode);
  }

  function setLanguage(languageCode) {
    if (!supportedLanguages[languageCode]) return false;

    localStorage.setItem(STORAGE_KEY, languageCode);
    applyLanguage(languageCode);
    return true;
  }

  function translate(key, languageCode) {
    const safeLanguageCode =
      languageCode && supportedLanguages[languageCode]
        ? languageCode
        : getSavedLanguageCode();

    return resolveTranslation(key, safeLanguageCode);
  }

  function bindLanguageControls() {
    document.addEventListener("click", (event) => {
      const option = event.target.closest("[data-language-option]");
      if (!option) return;

      setLanguage(option.getAttribute("data-language-option"));
    });

    document.addEventListener("change", (event) => {
      if (event.target && event.target.id === "languageSelect") {
        setLanguage(event.target.value);
      }
    });
  }

  function initialise() {
    bindLanguageControls();
    applyLanguage(getSavedLanguageCode());
    document.documentElement.classList.add("i18n-ready");
  }

  window.PetsDogueLanguage = {
    initialise,
    applyLanguage,
    setLanguage,
    getCurrentLanguage,
    getSupportedLanguages() {
      return { ...supportedLanguages };
    },
    translate
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, { once: true });
  } else {
    initialise();
  }
})();
