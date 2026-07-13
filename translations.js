(function () {
"use strict";

const LANGUAGE_KEY = "pets_dogue_language";
const CACHE_KEY = "pets_dogue_translation_cache_v8";
const SOURCE_LANGUAGE = "en";
const API_ENDPOINT = "/api/translate";

const LANGUAGES = [
  { code: "en", label: "English", short: "EN", dir: "ltr", speech: "en-GB" },
  { code: "ru", label: "Русский", short: "RU", dir: "ltr", speech: "ru-RU" },
  { code: "uk", label: "Українська", short: "UA", dir: "ltr", speech: "uk-UA" },
  { code: "cs", label: "Čeština", short: "CZ", dir: "ltr", speech: "cs-CZ" },
  { code: "pl", label: "Polski", short: "PL", dir: "ltr", speech: "pl-PL" },
  { code: "es", label: "Español", short: "ES", dir: "ltr", speech: "es-ES" },
  { code: "it", label: "Italiano", short: "IT", dir: "ltr", speech: "it-IT" },
  { code: "de", label: "Deutsch", short: "DE", dir: "ltr", speech: "de-DE" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl", speech: "ar-SA" },
  { code: "hi", label: "हिन्दी", short: "HI", dir: "ltr", speech: "hi-IN" }
];

const UI = {
  en: ["Choose Your Language", "Your choice will remain active across every page.", "Translating...", "Translation is temporarily unavailable."],
  ru: ["Выберите язык", "Ваш выбор сохранится на всех страницах.", "Переводим...", "Перевод временно недоступен."],
  uk: ["Оберіть мову", "Ваш вибір збережеться на всіх сторінках.", "Перекладаємо...", "Переклад тимчасово недоступний."],
  cs: ["Vyberte jazyk", "Vaše volba zůstane aktivní na všech stránkách.", "Překládáme...", "Překlad je dočasně nedostupný."],
  pl: ["Wybierz język", "Twój wybór pozostanie aktywny na wszystkich stronach.", "Tłumaczenie...", "Tłumaczenie jest chwilowo niedostępne."],
  es: ["Elige tu idioma", "Tu elección permanecerá activa en todas las páginas.", "Traduciendo...", "La traducción no está disponible temporalmente."],
  it: ["Scegli la lingua", "La scelta resterà attiva in tutte le pagine.", "Traduzione...", "La traduzione non è momentaneamente disponibile."],
  de: ["Sprache auswählen", "Ihre Auswahl bleibt auf allen Seiten aktiv.", "Übersetzung...", "Die Übersetzung ist vorübergehend nicht verfügbar."],
  ar: ["اختر لغتك", "سيظل اختيارك مفعلاً في جميع الصفحات.", "جارٍ الترجمة...", "الترجمة غير متاحة مؤقتًا."],
  hi: ["अपनी भाषा चुनें", "आपकी पसंद सभी पृष्ठों पर सक्रिय रहेगी।", "अनुवाद हो रहा है...", "अनुवाद अस्थायी रूप से उपलब्ध नहीं है।"]
};

const EXCLUDED = "script,style,noscript,code,pre,svg,iframe,canvas,video,audio";
const ATTRIBUTES = ["placeholder", "title", "aria-label", "alt"];
const PROTECTED = new Set([
  "PETS & DOGUE",
  "DOGUE",
  "Miso",
  "DOGUE Trust",
  "DOGUE Verified"
]);

let selectedLanguage = readSavedLanguage() || SOURCE_LANGUAGE;
let translationRunning = false;
let requestVersion = 0;
let observer = null;
let mutationTimer = null;
let cache = readCache();

const originalText = new WeakMap();
const originalAttrs = new WeakMap();

function languageByCode(code) {
  return LANGUAGES.find(function (item) {
    return item.code === code;
  }) || LANGUAGES[0];
}

function uiText() {
  return UI[selectedLanguage] || UI.en;
}

function readSavedLanguage() {
  try {
    const value = localStorage.getItem(LANGUAGE_KEY);
    return LANGUAGES.some(function (item) {
      return item.code === value;
    }) ? value : "";
  } catch (error) {
    return "";
  }
}

function saveLanguage(code) {
  try {
    localStorage.setItem(LANGUAGE_KEY, code);
  } catch (error) {
    console.warn("Unable to save language.", error);
  }
}

function readCache() {
  try {
    const value = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
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
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return String((hash >>> 0).toString(36)) + "_" + String(text.length);
}

function cachedTranslation(languageCode, text) {
  const item = cache[languageCode] && cache[languageCode][hashText(text)];
  return item && item.original === text ? item.translation : "";
}

function rememberTranslation(languageCode, original, translation) {
  if (!cache[languageCode]) {
    cache[languageCode] = {};
  }

  cache[languageCode][hashText(original)] = {
    original: original,
    translation: translation
  };
}

function normalize(value) {
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
  const text = normalize(value);

  if (!text || text.length < 2 || !containsLetters(text)) {
    return false;
  }

  if (PROTECTED.has(text)) {
    return false;
  }

  if (/^(https?:\/\/|mailto:|tel:|javascript:)/i.test(text)) {
    return false;
  }

  return true;
}

function protect(element) {
  if (!element) {
    return;
  }

  element.classList.add("notranslate");
  element.setAttribute("translate", "no");
  element.setAttribute("data-pd-no-translate", "true");
}

function protectBrands(root) {
  if (!root || !root.querySelectorAll) {
    return;
  }

  root.querySelectorAll(
    ".brand,.brand-small,.brand-big,.logo-small,.logo-big,.footer-brand,[data-pd-brand],[translate='no'],.notranslate,[data-pd-no-translate]"
  ).forEach(protect);

  root.querySelectorAll("*").forEach(function (element) {
    if (element.children.length === 0 && PROTECTED.has(normalize(element.textContent))) {
      protect(element);
    }
  });
}

function isProtected(element) {
  if (!element) {
    return true;
  }

  if (element.matches(EXCLUDED)) {
    return true;
  }

  return Boolean(element.closest(
    EXCLUDED + ",#pd-language-button,#pd-language-overlay,#pd-translation-status,[translate='no'],.notranslate,[data-pd-no-translate],[data-pd-brand]"
  ));
}

function rememberTextNode(node) {
  if (!originalText.has(node)) {
    originalText.set(node, node.nodeValue);
  }
}

function rememberAttribute(element, name) {
  let values = originalAttrs.get(element);

  if (!values) {
    values = {};
    originalAttrs.set(element, values);
  }

  if (values[name] === undefined) {
    values[name] = element.getAttribute(name) || "";
  }
}

function rememberMetadata() {
  if (document.documentElement.dataset.pdOriginalTitle === undefined) {
    document.documentElement.dataset.pdOriginalTitle = document.title || "";
  }
}

function restoreEnglish(root) {
  if (!root) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const node = walker.currentNode;

    if (originalText.has(node)) {
      node.nodeValue = originalText.get(node);
    }
  }

  const elements = [];

  if (root.nodeType === Node.ELEMENT_NODE) {
    elements.push(root);
  }

  if (root.querySelectorAll) {
    elements.push.apply(elements, root.querySelectorAll("*"));
  }

  elements.forEach(function (element) {
    const values = originalAttrs.get(element);

    if (!values) {
      return;
    }

    Object.keys(values).forEach(function (name) {
      element.setAttribute(name, values[name]);
    });
  });

  if (document.documentElement.dataset.pdOriginalTitle !== undefined) {
    document.title = document.documentElement.dataset.pdOriginalTitle;
  }
}

function collectItems(root) {
  const items = [];

  if (!root) {
    return items;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      const parent = node.parentElement;

      if (!parent || isProtected(parent)) {
        return NodeFilter.FILTER_REJECT;
      }

      rememberTextNode(node);

      return shouldTranslate(originalText.get(node))
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    }
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const original = originalText.get(node) || "";

    items.push({
      type: "text",
      node: node,
      original: original,
      requestText: normalize(original)
    });
  }

  const elements = [];

  if (root.nodeType === Node.ELEMENT_NODE) {
    elements.push(root);
  }

  if (root.querySelectorAll) {
    elements.push.apply(elements, root.querySelectorAll("*"));
  }

  elements.forEach(function (element) {
    if (isProtected(element)) {
      return;
    }

    ATTRIBUTES.forEach(function (name) {
      if (!element.hasAttribute(name)) {
        return;
      }

      rememberAttribute(element, name);

      const original = (originalAttrs.get(element) || {})[name] || "";

      if (shouldTranslate(original)) {
        items.push({
          type: "attribute",
          element: element,
          name: name,
          original: original,
          requestText: normalize(original)
        });
      }
    });
  });

  rememberMetadata();

  const title = document.documentElement.dataset.pdOriginalTitle || "";

  if (shouldTranslate(title)) {
    items.push({
      type: "title",
      original: title,
      requestText: normalize(title)
    });
  }

  return items;
}

function makeBatches(texts) {
  const batches = [];
  let current = [];
  let characters = 0;

  texts.forEach(function (text) {
    if (current.length >= 40 || (current.length > 0 && characters + text.length > 18000)) {
      batches.push(current);
      current = [];
      characters = 0;
    }

    current.push(text);
    characters += text.length;
  });

  if (current.length) {
    batches.push(current);
  }

  return batches;
}

async function requestBatch(texts, targetLanguage) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sourceLanguage: SOURCE_LANGUAGE,
      targetLanguage: targetLanguage,
      texts: texts
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data && data.error ? data.error : "Translation request failed.");
  }

  if (!Array.isArray(data.translations) || data.translations.length !== texts.length) {
    throw new Error("Invalid translation response.");
  }

  return data.translations;
}

async function translationsFor(texts, targetLanguage) {
  const unique = Array.from(new Set(texts));
  const result = new Map();
  const missing = [];

  unique.forEach(function (text) {
    const cached = cachedTranslation(targetLanguage, text);

    if (cached) {
      result.set(text, cached);
    } else {
      missing.push(text);
    }
  });

  for (const batch of makeBatches(missing)) {
    const translated = await requestBatch(batch, targetLanguage);

    batch.forEach(function (original, index) {
      const translation = String(translated[index] || original);

      result.set(original, translation);
      rememberTranslation(targetLanguage, original, translation);
    });

    saveCache();
  }

  return result;
}

function preserveWhitespace(original, translated) {
  const leading = (original.match(/^\s*/) || [""])[0];
  const trailing = (original.match(/\s*$/) || [""])[0];

  return leading + translated + trailing;
}

function applyItem(item, translated) {
  if (typeof translated !== "string" || !translated.trim()) {
    return;
  }

  if (item.type === "text") {
    item.node.nodeValue = preserveWhitespace(item.original, translated);
  } else if (item.type === "attribute") {
    item.element.setAttribute(item.name, translated);
  } else if (item.type === "title") {
    document.title = translated;
  }
}

function applyDirection() {
  const language = languageByCode(selectedLanguage);

  document.documentElement.lang = language.code;
  document.documentElement.dir = language.dir;

  if (document.body) {
    document.body.classList.toggle("pd-rtl", language.dir === "rtl");
  }
}

function createStyles() {
  if (document.getElementById("pd-language-styles")) {
    return;
  }

  const style = document.createElement("style");

  style.id = "pd-language-styles";
  style.textContent = [
    "#pd-language-button{position:fixed;right:16px;bottom:16px;z-index:2147483000;display:flex;align-items:center;gap:8px;height:52px;padding:0 17px;border:3px solid #111;border-radius:999px;background:#fff;color:#111;font:900 15px Arial,sans-serif;box-shadow:0 14px 38px rgba(0,0,0,.28);cursor:pointer}",
    "#pd-language-overlay{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(0,0,0,.78)}",
    "#pd-language-overlay.pd-open{display:flex}",
    "#pd-language-modal{width:min(680px,100%);max-height:88vh;overflow:auto;background:#f8f7f3;border:3px solid #111;border-radius:30px}",
    ".pd-language-header{display:flex;align-items:center;justify-content:space-between;padding:22px;background:#111;color:#fff}",
    ".pd-language-header h2{margin:0;font:normal 30px Georgia,serif}",
    ".pd-language-close{width:42px;height:42px;border:0;border-radius:50%;background:#fff;font-size:24px}",
    ".pd-language-intro{padding:20px 22px 5px;color:#555;line-height:1.6}",
    "#pd-language-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:16px 22px 24px}",
    ".pd-language-option{display:flex;align-items:center;justify-content:space-between;min-height:62px;padding:13px 15px;border:2px solid #111;border-radius:18px;background:#fff;font-weight:800;cursor:pointer}",
    ".pd-language-option.pd-active{background:#65e51f}",
    ".pd-language-code{font-size:11px;color:#666;letter-spacing:1px}",
    "#pd-translation-status{position:fixed;left:50%;bottom:22px;z-index:2147482999;padding:11px 16px;border-radius:999px;background:#111;color:#fff;font:700 13px Arial,sans-serif;opacity:0;visibility:hidden;transform:translate(-50%,12px);transition:.2s}",
    "#pd-translation-status.pd-visible{opacity:1;visibility:visible;transform:translate(-50%,0)}",
    "body.pd-rtl #pd-language-button{right:auto;left:16px}",
    "@media(max-width:600px){#pd-language-grid{grid-template-columns:1fr;padding:14px}#pd-language-button{right:12px;bottom:12px}body.pd-rtl #pd-language-button{right:auto;left:12px}#pd-translation-status{bottom:74px}}"
  ].join("");

  document.head.appendChild(style);
}

function makeElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function createInterface() {
  if (document.getElementById("pd-language-button")) {
    return;
  }

  const button = makeElement("button", "", "");
  button.id = "pd-language-button";
  button.type = "button";
  protect(button);

  const globe = makeElement("span", "pd-language-globe", "\uD83C\uDF10");
  const current = makeElement("span", "", "");
  current.id = "pd-language-current";

  button.appendChild(globe);
  button.appendChild(current);

  const overlay = makeElement("div", "", "");
  overlay.id = "pd-language-overlay";
  protect(overlay);

  const modal = makeElement("div", "", "");
  modal.id = "pd-language-modal";

  const header = makeElement("div", "pd-language-header", "");
  const title = makeElement("h2", "", "");
  title.id = "pd-language-title";

  const close = makeElement("button", "pd-language-close", "\u00D7");
  close.type = "button";

  header.appendChild(title);
  header.appendChild(close);

  const intro = makeElement("p", "pd-language-intro", "");
  const grid = makeElement("div", "", "");
  grid.id = "pd-language-grid";

  modal.appendChild(header);
  modal.appendChild(intro);
  modal.appendChild(grid);
  overlay.appendChild(modal);

  const status = makeElement("div", "", "");
  status.id = "pd-translation-status";
  protect(status);

  LANGUAGES.forEach(function (language) {
    const option = makeElement("button", "pd-language-option", "");
    option.type = "button";
    option.dataset.language = language.code;

    const name = makeElement("span", "pd-language-name", language.label);
    const code = makeElement("span", "pd-language-code", language.short);

    option.appendChild(name);
    option.appendChild(code);

    option.addEventListener("click", function () {
      changeLanguage(language.code);
    });

    grid.appendChild(option);
  });

  button.addEventListener("click", openLanguageMenu);
  close.addEventListener("click", closeLanguageMenu);

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeLanguageMenu();
    }
  });

  document.body.appendChild(button);
  document.body.appendChild(overlay);
  document.body.appendChild(status);

  updateInterface();
}

function updateInterface() {
  const language = languageByCode(selectedLanguage);
  const text = uiText();

  const current = document.getElementById("pd-language-current");
  const title = document.getElementById("pd-language-title");
  const intro = document.querySelector("#pd-language-overlay .pd-language-intro");
  const close = document.querySelector("#pd-language-overlay .pd-language-close");

  if (current) {
    current.textContent = language.short;
  }

  if (title) {
    title.textContent = text[0];
  }

  if (intro) {
    intro.textContent = text[1];
  }

  if (close) {
    close.setAttribute("aria-label", text[0]);
  }

  document.querySelectorAll(".pd-language-option").forEach(function (option) {
    option.classList.toggle("pd-active", option.dataset.language === selectedLanguage);
  });
}

function openLanguageMenu() {
  const overlay = document.getElementById("pd-language-overlay");

  if (overlay) {
    overlay.classList.add("pd-open");
  }

  document.body.style.overflow = "hidden";
}

function closeLanguageMenu() {
  const overlay = document.getElementById("pd-language-overlay");

  if (overlay) {
    overlay.classList.remove("pd-open");
  }

  document.body.style.overflow = "";
}

function showStatus(message) {
  const status = document.getElementById("pd-translation-status");

  if (!status) {
    return;
  }

  status.textContent = message;
  status.classList.add("pd-visible");
}

function hideStatus() {
  const status = document.getElementById("pd-translation-status");

  if (status) {
    status.classList.remove("pd-visible");
  }
}

async function translatePage(root) {
  const translationRoot = root || document.body;

  if (!translationRoot || translationRunning) {
    return;
  }

  const version = ++requestVersion;
  const language = languageByCode(selectedLanguage);

  applyDirection();
  updateInterface();
  protectBrands(translationRoot);
  rememberMetadata();

  if (language.code === SOURCE_LANGUAGE) {
    translationRunning = true;
    restoreEnglish(translationRoot);
    translationRunning = false;
    hideStatus();
    return;
  }

  translationRunning = true;
  showStatus(uiText()[2]);

  try {
    const items = collectItems(translationRoot);

    if (!items.length) {
      return;
    }

    const translated = await translationsFor(
      items.map(function (item) {
        return item.requestText;
      }),
      language.code
    );

    if (version !== requestVersion || language.code !== selectedLanguage) {
      return;
    }

    items.forEach(function (item) {
      const value = translated.get(item.requestText);

      if (value) {
        applyItem(item, value);
      }
    });
  } catch (error) {
    console.error("PETS & DOGUE translation error:", error);
    showStatus(uiText()[3]);
    setTimeout(hideStatus, 4000);
    return;
  } finally {
    translationRunning = false;
  }

  setTimeout(hideStatus, 200);
}

async function changeLanguage(code) {
  const language = languageByCode(code);

  requestVersion += 1;
  translationRunning = true;
  restoreEnglish(document.body);
  translationRunning = false;

  selectedLanguage = language.code;
  saveLanguage(selectedLanguage);

  applyDirection();
  updateInterface();
  closeLanguageMenu();

  await translatePage(document.body);
}

function observeContent() {
  if (observer || !document.body) {
    return;
  }

  observer = new MutationObserver(function (mutations) {
    if (translationRunning) {
      return;
    }

    let addedContent = false;

    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          protectBrands(node);
          addedContent = true;
        } else if (node.nodeType === Node.TEXT_NODE && shouldTranslate(node.nodeValue)) {
          addedContent = true;
        }
      });
    });

    if (addedContent && selectedLanguage !== SOURCE_LANGUAGE) {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(function () {
        translatePage(document.body);
      }, 300);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function restoreAfterNavigation() {
  selectedLanguage = readSavedLanguage() || SOURCE_LANGUAGE;

  applyDirection();
  updateInterface();

  if (selectedLanguage === SOURCE_LANGUAGE) {
    restoreEnglish(document.body);
  } else {
    setTimeout(function () {
      translatePage(document.body);
    }, 80);
  }
}

async function initialize() {
  selectedLanguage = readSavedLanguage() || SOURCE_LANGUAGE;

  createStyles();
  createInterface();
  protectBrands(document);
  rememberMetadata();
  applyDirection();
  updateInterface();
  observeContent();

  await translatePage(document.body);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLanguageMenu();
  }
});

window.addEventListener("pageshow", restoreAfterNavigation);
window.addEventListener("popstate", function () {
  setTimeout(restoreAfterNavigation, 80);
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}

window.PetsDogueLanguage = {
  languages: LANGUAGES,
  getCurrentLanguage: function () {
    return languageByCode(selectedLanguage);
  },
  getSpeechLanguage: function () {
    return languageByCode(selectedLanguage).speech;
  },
  changeLanguage: changeLanguage,
  setLanguage: changeLanguage,
  translatePage: translatePage,
  restore: restoreAfterNavigation,
  open: openLanguageMenu,
  close: closeLanguageMenu
};

})();
