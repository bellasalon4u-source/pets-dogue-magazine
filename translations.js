(function () {
  "use strict";

  const LANGUAGE_KEY = "pets_dogue_language";
  const CACHE_KEY = "pets_dogue_translation_cache_v14";
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

  const STATUS_TEXT = {
    en: {
      translating: "Translating...",
      unavailable: "Translation is temporarily unavailable."
    },
    uk: {
      translating: "Перекладаємо...",
      unavailable: "Переклад тимчасово недоступний."
    },
    ru: {
      translating: "Переводим...",
      unavailable: "Перевод временно недоступен."
    },
    fr: {
      translating: "Traduction...",
      unavailable: "La traduction est temporairement indisponible."
    },
    de: {
      translating: "Übersetzung...",
      unavailable: "Die Übersetzung ist vorübergehend nicht verfügbar."
    },
    es: {
      translating: "Traduciendo...",
      unavailable: "La traducción no está disponible temporalmente."
    },
    it: {
      translating: "Traduzione...",
      unavailable: "La traduzione non è momentaneamente disponibile."
    },
    pt: {
      translating: "A traduzir...",
      unavailable: "A tradução está temporariamente indisponível."
    },
    nl: {
      translating: "Vertalen...",
      unavailable: "De vertaling is tijdelijk niet beschikbaar."
    },
    pl: {
      translating: "Tłumaczenie...",
      unavailable: "Tłumaczenie jest chwilowo niedostępne."
    },
    cs: {
      translating: "Překládáme...",
      unavailable: "Překlad je dočasně nedostupný."
    },
    sk: {
      translating: "Prekladáme...",
      unavailable: "Preklad je dočasne nedostupný."
    },
    hu: {
      translating: "Fordítás...",
      unavailable: "A fordítás átmenetileg nem érhető el."
    },
    ro: {
      translating: "Se traduce...",
      unavailable: "Traducerea este temporar indisponibilă."
    },
    bg: {
      translating: "Превеждаме...",
      unavailable: "Преводът временно не е достъпен."
    },
    el: {
      translating: "Μετάφραση...",
      unavailable: "Η μετάφραση δεν είναι προσωρινά διαθέσιμη."
    },
    sv: {
      translating: "Översätter...",
      unavailable: "Översättningen är tillfälligt otillgänglig."
    },
    da: {
      translating: "Oversætter...",
      unavailable: "Oversættelsen er midlertidigt utilgængelig."
    },
    no: {
      translating: "Oversetter...",
      unavailable: "Oversettelsen er midlertidig utilgjengelig."
    },
    fi: {
      translating: "Käännetään...",
      unavailable: "Käännös ei ole tilapäisesti käytettävissä."
    },
    tr: {
      translating: "Çevriliyor...",
      unavailable: "Çeviri geçici olarak kullanılamıyor."
    },
    ar: {
      translating: "جارٍ الترجمة...",
      unavailable: "الترجمة غير متاحة مؤقتًا."
    },
    hi: {
      translating: "अनुवाद हो रहा है...",
      unavailable: "अनुवाद अस्थायी रूप से उपलब्ध नहीं है।"
    }
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
    "[data-pd-brand]",
    "#pd-translation-status"
  ].join(",");

  const TRANSLATABLE_ATTRIBUTES = [
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

  function getLanguage(code) {
    return (
      LANGUAGES.find(function (language) {
        return language.code === code;
      }) || LANGUAGES[0]
    );
  }

  function readSavedLanguage() {
    try {
      const value = localStorage.getItem(LANGUAGE_KEY);

      return LANGUAGES.some(function (language) {
        return language.code === value;
      })
        ? value
        : "";
    } catch (error) {
      return "";
    }
  }

  function saveLanguage(code) {
    try {
      localStorage.setItem(LANGUAGE_KEY, code);
    } catch (error) {
      console.warn("Unable to save selected language.", error);
    }
  }

  function readCache() {
    try {
      const stored = JSON.parse(
        localStorage.getItem(CACHE_KEY) || "{}"
      );

      if (
        stored &&
        typeof stored === "object" &&
        !Array.isArray(stored)
      ) {
        return stored;
      }

      return {};
    } catch (error) {
      return {};
    }
  }

  function saveCache() {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(cache)
      );
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

    return `${(hash >>> 0).toString(36)}_${text.length}`;
  }

  function getCachedTranslation(languageCode, text) {
    const languageCache = cache[languageCode];

    if (!languageCache) {
      return "";
    }

    const item = languageCache[hashText(text)];

    if (!item || item.original !== text) {
      return "";
    }

    return item.translation || "";
  }

  function storeTranslation(
    languageCode,
    original,
    translation
  ) {
    if (!cache[languageCode]) {
      cache[languageCode] = {};
    }

    cache[languageCode][hashText(original)] = {
      original,
      translation
    };
  }

  function normalizeText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function containsLetters(value) {
    try {
      return /\p{L}/u.test(String(value || ""));
    } catch (error) {
      return /[A-Za-zА-Яа-яЁёІіЇїЄє]/.test(
        String(value || "")
      );
    }
  }

  function shouldTranslate(value) {
    const text = normalizeText(value);

    if (!text || text.length < 2) {
      return false;
    }

    if (!containsLetters(text)) {
      return false;
    }

    if (PROTECTED_TEXTS.has(text)) {
      return false;
    }

    if (
      /^(https?:\/\/|mailto:|tel:|javascript:|data:image)/i.test(
        text
      )
    ) {
      return false;
    }

    return true;
  }

  function isProtectedElement(element) {
    if (!element || !element.closest) {
      return true;
    }

    return Boolean(
      element.closest(EXCLUDED_SELECTOR)
    );
  }

  function protectBrandElements(root) {
    if (!root || !root.querySelectorAll) {
      return;
    }

    root
      .querySelectorAll(
        [
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
        ].join(",")
      )
      .forEach(function (element) {
        element.classList.add("notranslate");
        element.setAttribute("translate", "no");
        element.setAttribute(
          "data-pd-brand",
          "true"
        );
      });
  }

  function rememberTextNode(node) {
    if (!originalTextNodes.has(node)) {
      originalTextNodes.set(
        node,
        node.nodeValue || ""
      );
    }
  }

  function rememberAttribute(
    element,
    attributeName
  ) {
    let attributes =
      originalAttributes.get(element);

    if (!attributes) {
      attributes = {};
      originalAttributes.set(
        element,
        attributes
      );
    }

    if (
      attributes[attributeName] ===
      undefined
    ) {
      attributes[attributeName] =
        element.getAttribute(
          attributeName
        ) || "";
    }
  }

  function rememberDocumentTitle() {
    if (
      document.documentElement.dataset
        .pdOriginalTitle === undefined
    ) {
      document.documentElement.dataset
        .pdOriginalTitle =
        document.title || "";
    }
  }

  function restoreOriginalContent(root) {
    if (!root) {
      return;
    }

    const walker =
      document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT
      );

    while (walker.nextNode()) {
      const node = walker.currentNode;

      if (originalTextNodes.has(node)) {
        node.nodeValue =
          originalTextNodes.get(node);
      }
    }

    const elements = [];

    if (
      root.nodeType ===
      Node.ELEMENT_NODE
    ) {
      elements.push(root);
    }

    if (root.querySelectorAll) {
      elements.push.apply(
        elements,
        root.querySelectorAll("*")
      );
    }

    elements.forEach(function (element) {
      const attributes =
        originalAttributes.get(element);

      if (!attributes) {
        return;
      }

      Object.keys(attributes).forEach(
        function (attributeName) {
          element.setAttribute(
            attributeName,
            attributes[attributeName]
          );
        }
      );
    });

    if (
      document.documentElement.dataset
        .pdOriginalTitle !== undefined
    ) {
      document.title =
        document.documentElement.dataset
          .pdOriginalTitle;
    }
  }

  function collectTranslationItems(root) {
    const items = [];

    if (!root) {
      return items;
    }

    const walker =
      document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function (node) {
            const parent =
              node.parentElement;

            if (
              !parent ||
              isProtectedElement(parent)
            ) {
              return NodeFilter
                .FILTER_REJECT;
            }

            rememberTextNode(node);

            const original =
              originalTextNodes.get(node) ||
              "";

            return shouldTranslate(original)
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
          }
        }
      );

    while (walker.nextNode()) {
      const node = walker.currentNode;

      const original =
        originalTextNodes.get(node) || "";

      items.push({
        type: "text",
        node,
        original,
        requestText:
          normalizeText(original)
      });
    }

    const elements = [];

    if (
      root.nodeType ===
      Node.ELEMENT_NODE
    ) {
      elements.push(root);
    }

    if (root.querySelectorAll) {
      elements.push.apply(
        elements,
        root.querySelectorAll("*")
      );
    }

    elements.forEach(function (element) {
      if (isProtectedElement(element)) {
        return;
      }

      TRANSLATABLE_ATTRIBUTES.forEach(
        function (attributeName) {
          if (
            !element.hasAttribute(
              attributeName
            )
          ) {
            return;
          }

          rememberAttribute(
            element,
            attributeName
          );

          const attributes =
            originalAttributes.get(
              element
            ) || {};

          const original =
            attributes[attributeName] ||
            "";

          if (!shouldTranslate(original)) {
            return;
          }

          items.push({
            type: "attribute",
            element,
            attributeName,
            original,
            requestText:
              normalizeText(original)
          });
        }
      );
    });

    rememberDocumentTitle();

    const originalTitle =
      document.documentElement.dataset
        .pdOriginalTitle || "";

    if (shouldTranslate(originalTitle)) {
      items.push({
        type: "title",
        original: originalTitle,
        requestText:
          normalizeText(originalTitle)
      });
    }

    return items;
  }

  function createBatches(texts) {
    const batches = [];
    let currentBatch = [];
    let currentCharacters = 0;

    texts.forEach(function (text) {
      const nextCharacters =
        currentCharacters + text.length;

      if (
        currentBatch.length >= 30 ||
        (
          currentBatch.length > 0 &&
          nextCharacters > 10000
        )
      ) {
        batches.push(currentBatch);
        currentBatch = [];
        currentCharacters = 0;
      }

      currentBatch.push(text);
      currentCharacters += text.length;
    });

    if (currentBatch.length > 0) {
      batches.push(currentBatch);
    }

    return batches;
  }

  async function requestTranslations(
    texts,
    targetLanguage
  ) {
    const response = await fetch(
      API_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          sourceLanguage:
            SOURCE_LANGUAGE,
          targetLanguage,
          texts
        })
      }
    );

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error(
        "Translation server returned an invalid response."
      );
    }

    if (!response.ok) {
      throw new Error(
        data.error ||
          `Translation request failed with status ${response.status}.`
      );
    }

    if (
      !Array.isArray(
        data.translations
      ) ||
      data.translations.length !==
        texts.length
    ) {
      throw new Error(
        "Translation server returned an incorrect number of translations."
      );
    }

    return data.translations;
  }

  async function getTranslations(
    texts,
    targetLanguage
  ) {
    const uniqueTexts =
      Array.from(new Set(texts));

    const result = new Map();
    const missingTexts = [];

    uniqueTexts.forEach(function (text) {
      const cached =
        getCachedTranslation(
          targetLanguage,
          text
        );

      if (cached) {
        result.set(text, cached);
      } else {
        missingTexts.push(text);
      }
    });

    const batches =
      createBatches(missingTexts);

    for (const batch of batches) {
      const translations =
        await requestTranslations(
          batch,
          targetLanguage
        );

      batch.forEach(
        function (original, index) {
          const translated =
            String(
              translations[index] ||
                original
            );

          result.set(
            original,
            translated
          );

          storeTranslation(
            targetLanguage,
            original,
            translated
          );
        }
      );

      saveCache();
    }

    return result;
  }

  function preserveWhitespace(
    original,
    translated
  ) {
    const leading =
      (
        original.match(/^\s*/) ||
        [""]
      )[0];

    const trailing =
      (
        original.match(/\s*$/) ||
        [""]
      )[0];

    return (
      leading +
      translated +
      trailing
    );
  }

  function applyTranslationItem(
    item,
    translated
  ) {
    if (
      typeof translated !== "string" ||
      !translated.trim()
    ) {
      return;
    }

    if (item.type === "text") {
      item.node.nodeValue =
        preserveWhitespace(
          item.original,
          translated
        );

      return;
    }

    if (
      item.type === "attribute"
    ) {
      item.element.setAttribute(
        item.attributeName,
        translated
      );

      return;
    }

    if (item.type === "title") {
      document.title = translated;
    }
  }

  function applyDocumentDirection() {
    const language =
      getLanguage(selectedLanguage);

    document.documentElement.lang =
      language.code;

    document.documentElement.dir =
      language.dir;

    if (document.body) {
      document.body.classList.toggle(
        "pd-rtl",
        language.dir === "rtl"
      );
    }
  }

  function getStatusText() {
    return (
      STATUS_TEXT[selectedLanguage] ||
      STATUS_TEXT.en
    );
  }

  function createStatusElement() {
    if (
      document.getElementById(
        "pd-translation-status"
      )
    ) {
      return;
    }

    const style =
      document.createElement("style");

    style.id =
      "pd-translation-status-style";

    style.textContent = `
      #pd-translation-status {
        position: fixed;
        left: 50%;
        bottom: 22px;
        z-index: 2147483000;
        padding: 12px 18px;
        border-radius: 999px;
        background: #111;
        color: #fff;
        font: 700 13px Arial, sans-serif;
        box-shadow: 0 10px 30px rgba(0,0,0,.28);
        opacity: 0;
        visibility: hidden;
        transform: translate(-50%, 12px);
        transition: .2s ease;
        pointer-events: none;
      }

      #pd-translation-status.pd-visible {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0);
      }

      body.pd-rtl {
        direction: rtl;
      }

      body.pd-rtl .side-menu {
        left: auto;
        right: -100%;
        border-right: 0;
        border-left: 2px solid #111;
      }

      body.pd-rtl .side-menu.open {
        right: 0;
      }
    `;

    document.head.appendChild(style);

    const status =
      document.createElement("div");

    status.id =
      "pd-translation-status";

    status.setAttribute(
      "data-pd-no-translate",
      "true"
    );

    status.setAttribute(
      "translate",
      "no"
    );

    document.body.appendChild(status);
  }

  function showStatus(message) {
    const status =
      document.getElementById(
        "pd-translation-status"
      );

    if (!status) {
      return;
    }

    status.textContent = message;

    status.classList.add(
      "pd-visible"
    );
  }

  function hideStatus() {
    const status =
      document.getElementById(
        "pd-translation-status"
      );

    if (status) {
      status.classList.remove(
        "pd-visible"
      );
    }
  }

  function syncLanguageSelectors() {
    const selectors =
      document.querySelectorAll(
        "#languageSelect, [data-pd-language-select]"
      );

    selectors.forEach(function (selector) {
      selector.value =
        selectedLanguage;
    });
  }

  async function translatePage(root) {
    const translationRoot =
      root || document.body;

    if (
      !translationRoot ||
      translationRunning
    ) {
      return;
    }

    const thisRequest =
      ++requestVersion;

    const language =
      getLanguage(selectedLanguage);

    applyDocumentDirection();
    syncLanguageSelectors();
    protectBrandElements(
      translationRoot
    );
    rememberDocumentTitle();

    if (
      language.code ===
      SOURCE_LANGUAGE
    ) {
      translationRunning = true;

      restoreOriginalContent(
        translationRoot
      );

      translationRunning = false;
      hideStatus();

      return;
    }

    translationRunning = true;

    showStatus(
      getStatusText().translating
    );

    try {
      const items =
        collectTranslationItems(
          translationRoot
        );

      if (items.length === 0) {
        hideStatus();
        return;
      }

      const translationMap =
        await getTranslations(
          items.map(function (item) {
            return item.requestText;
          }),
          language.code
        );

      if (
        thisRequest !==
          requestVersion ||
        language.code !==
          selectedLanguage
      ) {
        return;
      }

      items.forEach(function (item) {
        const translated =
          translationMap.get(
            item.requestText
          );

        if (translated) {
          applyTranslationItem(
            item,
            translated
          );
        }
      });

      hideStatus();
    } catch (error) {
      console.error(
        "PETS & DOGUE translation error:",
        error
      );

      showStatus(
        getStatusText().unavailable
      );

      window.setTimeout(
        hideStatus,
        5000
      );
    } finally {
      translationRunning = false;
    }
  }

  async function changeLanguage(code) {
    const language =
      getLanguage(code);

    requestVersion += 1;
    translationRunning = true;

    restoreOriginalContent(
      document.body
    );

    translationRunning = false;

    selectedLanguage =
      language.code;

    saveLanguage(
      selectedLanguage
    );

    applyDocumentDirection();
    syncLanguageSelectors();

    await translatePage(
      document.body
    );
  }

  function bindLanguageSelectors() {
    const selectors =
      document.querySelectorAll(
        "#languageSelect, [data-pd-language-select]"
      );

    selectors.forEach(function (selector) {
      if (
        selector.dataset
          .pdLanguageBound === "true"
      ) {
        return;
      }

      selector.dataset
        .pdLanguageBound = "true";

      selector.value =
        selectedLanguage;

      selector.addEventListener(
        "change",
        function () {
          changeLanguage(
            selector.value
          );
        }
      );
    });
  }

  function observeDynamicContent() {
    if (
      observer ||
      !document.body
    ) {
      return;
    }

    observer =
      new MutationObserver(
        function (mutations) {
          if (translationRunning) {
            return;
          }

          let hasNewContent = false;

          mutations.forEach(
            function (mutation) {
              mutation.addedNodes.forEach(
                function (node) {
                  if (
                    node.nodeType ===
                    Node.ELEMENT_NODE
                  ) {
                    protectBrandElements(
                      node
                    );

                    hasNewContent = true;
                  }

                  if (
                    node.nodeType ===
                      Node.TEXT_NODE &&
                    shouldTranslate(
                      node.nodeValue
                    )
                  ) {
                    hasNewContent = true;
                  }
                }
              );
            }
          );

          bindLanguageSelectors();

          if (
            hasNewContent &&
            selectedLanguage !==
              SOURCE_LANGUAGE
          ) {
            window.clearTimeout(
              observerTimer
            );

            observerTimer =
              window.setTimeout(
                function () {
                  translatePage(
                    document.body
                  );
                },
                350
              );
          }
        }
      );

    observer.observe(
      document.body,
      {
        childList: true,
        subtree: true
      }
    );
  }

  function restoreSavedLanguage() {
    selectedLanguage =
      readSavedLanguage() ||
      SOURCE_LANGUAGE;

    applyDocumentDirection();
    syncLanguageSelectors();

    if (
      selectedLanguage ===
      SOURCE_LANGUAGE
    ) {
      restoreOriginalContent(
        document.body
      );

      hideStatus();

      return;
    }

    window.setTimeout(
      function () {
        translatePage(
          document.body
        );
      },
      100
    );
  }

  async function initializeTranslations() {
    selectedLanguage =
      readSavedLanguage() ||
      SOURCE_LANGUAGE;

    createStatusElement();
    protectBrandElements(document);
    rememberDocumentTitle();
    applyDocumentDirection();
    bindLanguageSelectors();
    syncLanguageSelectors();
    observeDynamicContent();

    await translatePage(
      document.body
    );
  }

  window.addEventListener(
    "pageshow",
    restoreSavedLanguage
  );

  window.addEventListener(
    "popstate",
    function () {
      window.setTimeout(
        restoreSavedLanguage,
        100
      );
    }
  );

  window.addEventListener(
    "storage",
    function (event) {
      if (
        event.key ===
        LANGUAGE_KEY
      ) {
        restoreSavedLanguage();
      }
    }
  );

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeTranslations
    );
  } else {
    initializeTranslations();
  }

  window.PetsDogueLanguage = {
    languages: LANGUAGES,

    getCurrentLanguage:
      function () {
        return getLanguage(
          selectedLanguage
        );
      },

    getSpeechLanguage:
      function () {
        return getLanguage(
          selectedLanguage
        ).speech;
      },

    changeLanguage:
      changeLanguage,

    setLanguage:
      changeLanguage,

    translatePage:
      translatePage,

    restore:
      restoreSavedLanguage
  };
})();
