(function () {
  "use strict";

  const LANGUAGE_KEY = "pets_dogue_language";
  const CACHE_KEY = "pets_dogue_translation_cache_v18";
  const SOURCE_LANGUAGE = "en";
  const API_ENDPOINT = "/api/translate";

  const LANGUAGES = [
    { code: "en", label: "English", short: "EN", dir: "ltr", speech: "en-GB" },
    { code: "uk", label: "Українська", short: "UA", dir: "ltr", speech: "uk-UA" },
    { code: "ru", label: "Русский", short: "RU", dir: "ltr", speech: "ru-RU" },
    { code: "fr", label: "Français", short: "FR", dir: "ltr", speech: "fr-FR" },
    { code: "de", label: "Deutsch", short: "DE", dir: "ltr", speech: "de-DE" },
    { code: "es", label: "Español", short: "ES", dir: "ltr", speech: "es-ES" },
    { code: "it", label: "Italiano", short: "IT", dir: "ltr", speech: "it-IT" },
    { code: "pt", label: "Português", short: "PT", dir: "ltr", speech: "pt-PT" },
    { code: "nl", label: "Nederlands", short: "NL", dir: "ltr", speech: "nl-NL" },
    { code: "pl", label: "Polski", short: "PL", dir: "ltr", speech: "pl-PL" },
    { code: "cs", label: "Čeština", short: "CZ", dir: "ltr", speech: "cs-CZ" },
    { code: "sk", label: "Slovenčina", short: "SK", dir: "ltr", speech: "sk-SK" },
    { code: "hu", label: "Magyar", short: "HU", dir: "ltr", speech: "hu-HU" },
    { code: "ro", label: "Română", short: "RO", dir: "ltr", speech: "ro-RO" },
    { code: "bg", label: "Български", short: "BG", dir: "ltr", speech: "bg-BG" },
    { code: "el", label: "Ελληνικά", short: "GR", dir: "ltr", speech: "el-GR" },
    { code: "sv", label: "Svenska", short: "SE", dir: "ltr", speech: "sv-SE" },
    { code: "da", label: "Dansk", short: "DK", dir: "ltr", speech: "da-DK" },
    { code: "no", label: "Norsk", short: "NO", dir: "ltr", speech: "nb-NO" },
    { code: "fi", label: "Suomi", short: "FI", dir: "ltr", speech: "fi-FI" },
    { code: "tr", label: "Türkçe", short: "TR", dir: "ltr", speech: "tr-TR" },
    { code: "ar", label: "العربية", short: "AR", dir: "rtl", speech: "ar-SA" },
    { code: "hi", label: "हिन्दी", short: "HI", dir: "ltr", speech: "hi-IN" }
  ];

  const LANGUAGE_ALIASES = {
    ua: "uk",
    cz: "cs",
    gr: "el",
    se: "sv",
    dk: "da"
  };

  const EXCLUDED_SELECTOR = [
    "script",
    "style",
    "noscript",
    "code",
    "pre",
    "svg",
    "canvas",
    "iframe",
    "video",
    "audio",
    "[translate='no']",
    ".notranslate",
    "[data-pd-no-translate]",
    "[data-pd-brand]"
  ].join(",");

  const ATTRIBUTES = [
    "placeholder",
    "title",
    "aria-label",
    "alt"
  ];

  const PROTECTED_TEXTS = new Set([
    "PETS & DOGUE",
    "DOGUE",
    "pets &",
    "Miso",
    "Richie",
    "Pi",
    "Pablo",
    "Jessica",
    "DOGUE Trust",
    "DOGUE Verified"
  ]);

  const originalTextNodes = new WeakMap();
  const originalAttributes = new WeakMap();

  let selectedLanguage = readSavedLanguage() || SOURCE_LANGUAGE;
  let cache = readCache();
  let translationRunning = false;
  let requestVersion = 0;
  let observer = null;
  let observerTimer = null;

  function normalizeLanguageCode(value) {
    const raw = String(value || "")
      .toLowerCase()
      .trim()
      .replace("_", "-")
      .split("-")[0];

    const normalized = LANGUAGE_ALIASES[raw] || raw;

    return LANGUAGES.some(function (language) {
      return language.code === normalized;
    }) ? normalized : SOURCE_LANGUAGE;
  }

  function getLanguage(code) {
    const normalized = normalizeLanguageCode(code);

    return LANGUAGES.find(function (language) {
      return language.code === normalized;
    }) || LANGUAGES[0];
  }

  function readSavedLanguage() {
    try {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      if (!stored) return "";

      const value = normalizeLanguageCode(stored);

      return LANGUAGES.some(function (language) {
        return language.code === value;
      }) ? value : "";
    } catch (error) {
      return "";
    }
  }

  function saveLanguage(code) {
    try {
      localStorage.setItem(
        LANGUAGE_KEY,
        normalizeLanguageCode(code)
      );
    } catch (error) {
      console.warn("Unable to save selected language.", error);
    }
  }

  function readCache() {
    try {
      const stored = JSON.parse(
        localStorage.getItem(CACHE_KEY) || "{}"
      );

      return (
        stored &&
        typeof stored === "object" &&
        !Array.isArray(stored)
      ) ? stored : {};
    } catch (error) {
      return {};
    }
  }

  function saveCache() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.warn("Unable to save translation cache.", error);
    }
  }

  function hashText(text) {
    let hash = 2166136261;

    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0).toString(36) + "_" + text.length;
  }

  function getCachedTranslation(languageCode, text) {
    const languageCache = cache[languageCode];
    if (!languageCache) return "";

    const item = languageCache[hashText(text)];

    return item && item.original === text
      ? item.translation || ""
      : "";
  }

  function storeTranslation(languageCode, original, translation) {
    if (!cache[languageCode]) {
      cache[languageCode] = {};
    }

    cache[languageCode][hashText(original)] = {
      original: original,
      translation: translation
    };
  }

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function containsLetters(value) {
    try {
      return /\p{L}/u.test(String(value || ""));
    } catch (error) {
      return /[A-Za-zА-Яа-яЁёІіЇїЄє]/.test(String(value || ""));
    }
  }

  function shouldTranslate(value) {
    const text = normalizeText(value);

    if (!text || text.length < 2 || !containsLetters(text)) {
      return false;
    }

    if (PROTECTED_TEXTS.has(text)) return false;

    if (
      /^(https?:\/\/|mailto:|tel:|javascript:|data:image)/i.test(text)
    ) {
      return false;
    }

    return true;
  }

  function isProtectedElement(element) {
    return (
      !element ||
      !element.closest ||
      Boolean(element.closest(EXCLUDED_SELECTOR))
    );
  }

  function protectBrandElements(root) {
    if (!root || !root.querySelectorAll) return;

    root.querySelectorAll([
      ".brand",
      ".brand-small",
      ".brand-big",
      ".logo",
      ".logo-small",
      ".logo-big",
      ".footer-brand",
      "[data-pd-brand]",
      ".notranslate",
      "[translate='no']"
    ].join(",")).forEach(function (element) {
      element.classList.add("notranslate");
      element.setAttribute("translate", "no");
      element.setAttribute("data-pd-brand", "true");
    });
  }

  function rememberTextNode(node) {
    if (!originalTextNodes.has(node)) {
      originalTextNodes.set(node, node.nodeValue || "");
    }
  }

  function rememberAttribute(element, attributeName) {
    let attributes = originalAttributes.get(element);

    if (!attributes) {
      attributes = {};
      originalAttributes.set(element, attributes);
    }

    if (attributes[attributeName] === undefined) {
      attributes[attributeName] =
        element.getAttribute(attributeName) || "";
    }
  }

  function rememberDocumentTitle() {
    if (
      document.documentElement.dataset.pdOriginalTitle === undefined
    ) {
      document.documentElement.dataset.pdOriginalTitle =
        document.title || "";
    }
  }

  function restoreOriginalContent(root) {
    const scope = root || document.body;
    if (!scope) return;

    const walker = document.createTreeWalker(
      scope,
      NodeFilter.SHOW_TEXT
    );

    let node;
    while ((node = walker.nextNode())) {
      if (
        !node.parentElement ||
        isProtectedElement(node.parentElement)
      ) {
        continue;
      }

      const original = originalTextNodes.get(node);
      if (original !== undefined) {
        node.nodeValue = original;
      }
    }

    scope.querySelectorAll("*").forEach(function (element) {
      const attributes = originalAttributes.get(element);
      if (!attributes) return;

      Object.keys(attributes).forEach(function (attributeName) {
        element.setAttribute(
          attributeName,
          attributes[attributeName]
        );
      });
    });

    const originalTitle =
      document.documentElement.dataset.pdOriginalTitle;

    if (originalTitle !== undefined) {
      document.title = originalTitle;
    }
  }

  function collectTextEntries(root) {
    const scope = root || document.body;
    const entries = [];
    if (!scope) return entries;

    const walker = document.createTreeWalker(
      scope,
      NodeFilter.SHOW_TEXT
    );

    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || isProtectedElement(parent)) continue;

      rememberTextNode(node);
      const original = originalTextNodes.get(node);
      if (!shouldTranslate(original)) continue;

      entries.push({
        type: "text",
        node: node,
        original: original
      });
    }

    scope.querySelectorAll("*").forEach(function (element) {
      if (isProtectedElement(element)) return;

      ATTRIBUTES.forEach(function (attributeName) {
        if (!element.hasAttribute(attributeName)) return;

        rememberAttribute(element, attributeName);

        const attributes = originalAttributes.get(element);
        const original = attributes[attributeName];
        if (!shouldTranslate(original)) return;

        entries.push({
          type: "attribute",
          element: element,
          attribute: attributeName,
          original: original
        });
      });
    });

    rememberDocumentTitle();

    const title =
      document.documentElement.dataset.pdOriginalTitle || "";

    if (shouldTranslate(title)) {
      entries.push({
        type: "title",
        original: title
      });
    }

    return entries;
  }

  function uniqueTexts(entries) {
    const seen = new Set();
    const result = [];

    entries.forEach(function (entry) {
      const text = normalizeText(entry.original);
      if (!text || seen.has(text)) return;

      seen.add(text);
      result.push(text);
    });

    return result;
  }

  function splitIntoBatches(texts, maxItems, maxCharacters) {
    const batches = [];
    let batch = [];
    let characters = 0;

    texts.forEach(function (text) {
      const length = text.length;

      if (
        batch.length &&
        (
          batch.length >= maxItems ||
          characters + length > maxCharacters
        )
      ) {
        batches.push(batch);
        batch = [];
        characters = 0;
      }

      batch.push(text);
      characters += length;
    });

    if (batch.length) batches.push(batch);
    return batches;
  }

  async function requestTranslations(texts, targetLanguage) {
    if (!texts.length) return [];

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source: SOURCE_LANGUAGE,
        target: targetLanguage,
        texts: texts
      })
    });

    if (!response.ok) {
      throw new Error(
        "Translation request failed: " + response.status
      );
    }

    const data = await response.json();

    const translations = Array.isArray(data.translations)
      ? data.translations
      : Array.isArray(data.results)
        ? data.results
        : [];

    if (translations.length !== texts.length) {
      throw new Error("Invalid translation response.");
    }

    return translations.map(function (item) {
      if (typeof item === "string") return item;

      if (item && typeof item.translation === "string") {
        return item.translation;
      }

      if (item && typeof item.text === "string") {
        return item.text;
      }

      return "";
    });
  }

  function applyEntries(entries, languageCode) {
    entries.forEach(function (entry) {
      const original = normalizeText(entry.original);
      const translated = getCachedTranslation(
        languageCode,
        original
      );

      if (!translated) return;

      if (entry.type === "text") {
        entry.node.nodeValue = preserveWhitespace(
          entry.original,
          translated
        );
        return;
      }

      if (entry.type === "attribute") {
        entry.element.setAttribute(entry.attribute, translated);
        return;
      }

      if (entry.type === "title") {
        document.title = translated;
      }
    });
  }

  function preserveWhitespace(original, translated) {
    const source = String(original || "");
    const leading = (source.match(/^\s*/) || [""])[0];
    const trailing = (source.match(/\s*$/) || [""])[0];

    return leading + translated + trailing;
  }

  function updateDocumentLanguage(languageCode) {
    const language = getLanguage(languageCode);

    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir;

    document.body && document.body.setAttribute(
      "dir",
      language.dir
    );
  }

  function syncLanguageControls(languageCode) {
    const normalized = normalizeLanguageCode(languageCode);

    document.querySelectorAll([
      "select[data-language-select]",
      "select#languageSelect",
      "select#language-select",
      "select#langSelect",
      "select#lang-select"
    ].join(",")).forEach(function (select) {
      const option = Array.from(select.options || []).find(
        function (item) {
          return normalizeLanguageCode(item.value) === normalized;
        }
      );

      if (option) {
        select.value = option.value;
      }
    });

    document.querySelectorAll("[data-language]").forEach(
      function (element) {
        const code = normalizeLanguageCode(
          element.getAttribute("data-language")
        );

        const active = code === normalized;
        element.classList.toggle("active", active);
        element.classList.toggle("is-active", active);

        if (active) {
          element.setAttribute("aria-current", "true");
        } else {
          element.removeAttribute("aria-current");
        }
      }
    );
  }

  function showStatus() {
    return;
  }

  function hideStatus() {
    const status = document.getElementById(
      "pd-translation-status"
    );

    if (status) {
      status.classList.remove("pd-visible");
      status.hidden = true;
    }
  }

  function removeLegacyStatus() {
    const status = document.getElementById(
      "pd-translation-status"
    );

    if (status) status.remove();

    document.querySelectorAll([
      ".pd-translation-status",
      ".translation-status",
      "[data-translation-status]"
    ].join(",")).forEach(function (element) {
      element.remove();
    });
  }

  function dispatchLanguageEvent(languageCode) {
    const detail = {
      language: normalizeLanguageCode(languageCode)
    };

    window.dispatchEvent(
      new CustomEvent("petsdogue:languagechange", {
        detail: detail
      })
    );
  }

  async function translatePage(requestedLanguage, options) {
    const settings = options || {};
    const languageCode = normalizeLanguageCode(requestedLanguage);
    const currentRequest = ++requestVersion;

    selectedLanguage = languageCode;

    saveLanguage(languageCode);
    updateDocumentLanguage(languageCode);
    syncLanguageControls(languageCode);
    removeLegacyStatus();

    // Articles with local dictionaries manage their own content.
    if (document.querySelector("main[data-pd-no-translate]")) {
      if (!settings.silentEvent) {
        dispatchLanguageEvent(languageCode);
      }
      return;
    }

    if (languageCode === SOURCE_LANGUAGE) {
      restoreOriginalContent(document.body);
      hideStatus();

      if (!settings.silentEvent) {
        dispatchLanguageEvent(languageCode);
      }
      return;
    }

    if (translationRunning) {
      translationRunning = false;
    }

    translationRunning = true;

    const entries = collectTextEntries(document.body);
    const texts = uniqueTexts(entries);

    const missing = texts.filter(function (text) {
      return !getCachedTranslation(languageCode, text);
    });

    applyEntries(entries, languageCode);

    if (!missing.length) {
      translationRunning = false;
      hideStatus();
      removeLegacyStatus();

      if (!settings.silentEvent) {
        dispatchLanguageEvent(languageCode);
      }
      return;
    }

    const batches = splitIntoBatches(missing, 40, 6000);

    try {
      for (let index = 0; index < batches.length; index += 1) {
        if (currentRequest !== requestVersion) return;

        const batch = batches[index];
        const translations = await requestTranslations(
          batch,
          languageCode
        );

        batch.forEach(function (original, translationIndex) {
          const translated = translations[translationIndex];

          if (translated && typeof translated === "string") {
            storeTranslation(
              languageCode,
              original,
              translated
            );
          }
        });

        saveCache();

        if (currentRequest !== requestVersion) return;
        applyEntries(entries, languageCode);
      }
    } catch (error) {
      console.warn(
        "PETS & DOGUE translation unavailable.",
        error
      );
    } finally {
      if (currentRequest === requestVersion) {
        translationRunning = false;
        hideStatus();
        removeLegacyStatus();

        if (!settings.silentEvent) {
          dispatchLanguageEvent(languageCode);
        }
      }
    }
  }

  function bindLanguageControls() {
    document.querySelectorAll([
      "select[data-language-select]",
      "select#languageSelect",
      "select#language-select",
      "select#langSelect",
      "select#lang-select"
    ].join(",")).forEach(function (select) {
      if (select.dataset.pdLanguageBound === "1") return;

      select.dataset.pdLanguageBound = "1";

      select.addEventListener("change", function () {
        translatePage(select.value);
      });
    });

    document.querySelectorAll("[data-language]").forEach(
      function (element) {
        if (element.dataset.pdLanguageBound === "1") return;

        element.dataset.pdLanguageBound = "1";

        element.addEventListener("click", function () {
          const language = element.getAttribute("data-language");
          if (language) translatePage(language);
        });
      }
    );

    syncLanguageControls(selectedLanguage);
  }

  function startObserver() {
    if (observer || !document.body) return;

    observer = new MutationObserver(function (mutations) {
      let relevant = false;

      mutations.forEach(function (mutation) {
        if (mutation.type !== "childList") return;

        if (mutation.addedNodes && mutation.addedNodes.length) {
          relevant = true;
        }
      });

      if (!relevant) return;

      clearTimeout(observerTimer);

      observerTimer = setTimeout(function () {
        bindLanguageControls();
        protectBrandElements(document.body);
        removeLegacyStatus();

        if (selectedLanguage !== SOURCE_LANGUAGE) {
          translatePage(selectedLanguage, {
            silentEvent: true
          });
        }
      }, 120);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function speakText(text) {
    if (!("speechSynthesis" in window)) return false;

    const cleanText = normalizeText(text);
    if (!cleanText) return false;

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const language = getLanguage(selectedLanguage);

    utterance.lang = language.speech || language.code;
    window.speechSynthesis.speak(utterance);

    return true;
  }

  function getReadablePageText() {
    const root = document.querySelector("main") || document.body;
    if (!root) return "";

    const clone = root.cloneNode(true);

    clone.querySelectorAll([
      "script",
      "style",
      "noscript",
      "nav",
      "button",
      "select",
      "option",
      "svg",
      "[aria-hidden='true']",
      "[data-pd-no-speech]"
    ].join(",")).forEach(function (element) {
      element.remove();
    });

    return normalizeText(clone.textContent || "");
  }

  function bindSpeechControls() {
    document.querySelectorAll([
      "[data-read-page]",
      "[data-speak-page]",
      "[data-tts]",
      ".tts-button",
      ".read-aloud"
    ].join(",")).forEach(function (button) {
      if (button.dataset.pdSpeechBound === "1") return;

      button.dataset.pdSpeechBound = "1";

      button.addEventListener("click", function () {
        const explicit = button.getAttribute("data-speech-text");

        speakText(explicit || getReadablePageText());
      });
    });
  }

  function exposePublicAPI() {
    window.PetsDogueTranslations = {
      languages: LANGUAGES.slice(),

      aliases: Object.assign({}, LANGUAGE_ALIASES),

      getLanguage: function () {
        return selectedLanguage;
      },

      setLanguage: function (languageCode) {
        return translatePage(languageCode);
      },

      translatePage: function (languageCode) {
        return translatePage(languageCode);
      },

      restoreEnglish: function () {
        return translatePage(SOURCE_LANGUAGE);
      },

      speak: function (text) {
        return speakText(text);
      },

      stopSpeech: function () {
        stopSpeech();
      }
    };

    window.PetsDogueI18n = window.PetsDogueTranslations;
    window.PD_LANGUAGES = LANGUAGES.slice();
  }

  function bindExternalLanguageEvents() {
    window.addEventListener(
      "petsdogue:languagechange",
      function (event) {
        if (
          !document.querySelector("main[data-pd-no-translate]")
        ) {
          return;
        }

        const detail = event.detail || {};
        const code = normalizeLanguageCode(
          detail.language || detail.lang || detail.code
        );

        ++requestVersion;
        selectedLanguage = code;
        saveLanguage(code);
        updateDocumentLanguage(code);
        syncLanguageControls(code);
      }
    );

    window.addEventListener(
      "petsdogue:setlanguage",
      function (event) {
        if (!event.detail || !event.detail.language) return;

        const language = normalizeLanguageCode(
          event.detail.language
        );

        if (language === selectedLanguage) {
          updateDocumentLanguage(language);
          syncLanguageControls(language);
          return;
        }

        translatePage(language, {
          silentEvent: true
        });
      }
    );

    window.addEventListener("storage", function (event) {
      if (event.key !== LANGUAGE_KEY || !event.newValue) return;

      const language = normalizeLanguageCode(event.newValue);
      if (language === selectedLanguage) return;

      translatePage(language, {
        silentEvent: true
      });
    });
  }

  function restoreLanguageOnPageShow() {
    window.addEventListener("pageshow", function () {
      const saved =
        readSavedLanguage() ||
        selectedLanguage ||
        SOURCE_LANGUAGE;

      selectedLanguage = normalizeLanguageCode(saved);
      updateDocumentLanguage(selectedLanguage);

      bindLanguageControls();
      bindSpeechControls();
      protectBrandElements(document.body);
      removeLegacyStatus();

      if (selectedLanguage === SOURCE_LANGUAGE) {
        restoreOriginalContent(document.body);
        syncLanguageControls(selectedLanguage);
        return;
      }

      translatePage(selectedLanguage, {
        silentEvent: true
      });
    });
  }

  function initialize() {
    protectBrandElements(document.body);
    rememberDocumentTitle();

    bindLanguageControls();
    bindSpeechControls();
    bindExternalLanguageEvents();
    restoreLanguageOnPageShow();
    exposePublicAPI();
    removeLegacyStatus();

    selectedLanguage = readSavedLanguage() || SOURCE_LANGUAGE;

    updateDocumentLanguage(selectedLanguage);
    syncLanguageControls(selectedLanguage);

    if (selectedLanguage !== SOURCE_LANGUAGE) {
      translatePage(selectedLanguage, {
        silentEvent: true
      });
    } else {
      restoreOriginalContent(document.body);
    }

    startObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
