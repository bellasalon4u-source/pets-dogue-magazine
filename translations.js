(function () {
"use strict";

const LANGUAGE_KEY = "pets_dogue_language";
const CACHE_KEY = "pets_dogue_translation_cache_v7";
const SOURCE_LANGUAGE = "en";
const API_ENDPOINT = "/api/translate";

const LANGUAGES = [
  { code:"en", label:"English", short:"EN", flag:"🇬🇧", direction:"ltr", speech:"en-GB" },
  { code:"ru", label:"Русский", short:"RU", flag:"🇷🇺", direction:"ltr", speech:"ru-RU" },
  { code:"uk", label:"Українська", short:"UA", flag:"🇺🇦", direction:"ltr", speech:"uk-UA" },
  { code:"cs", label:"Čeština", short:"CZ", flag:"🇨🇿", direction:"ltr", speech:"cs-CZ" },
  { code:"pl", label:"Polski", short:"PL", flag:"🇵🇱", direction:"ltr", speech:"pl-PL" },
  { code:"es", label:"Español", short:"ES", flag:"🇪🇸", direction:"ltr", speech:"es-ES" },
  { code:"it", label:"Italiano", short:"IT", flag:"🇮🇹", direction:"ltr", speech:"it-IT" },
  { code:"de", label:"Deutsch", short:"DE", flag:"🇩🇪", direction:"ltr", speech:"de-DE" },
  { code:"ar", label:"العربية", short:"AR", flag:"🇸🇦", direction:"rtl", speech:"ar-SA" },
  { code:"hi", label:"हिन्दी", short:"HI", flag:"🇮🇳", direction:"ltr", speech:"hi-IN" }
];

const UI = {
  en:{ choose:"Choose Your Language", intro:"Choose a language for PETS & DOGUE. It will remain active across every page.", close:"Close language menu", translating:"Translating…", error:"Translation is temporarily unavailable." },
  ru:{ choose:"Выберите язык", intro:"Выберите язык PETS & DOGUE. Он останется активным на всех страницах.", close:"Закрыть выбор языка", translating:"Переводим…", error:"Перевод временно недоступен." },
  uk:{ choose:"Оберіть мову", intro:"Оберіть мову PETS & DOGUE. Вона залишатиметься активною на всіх сторінках.", close:"Закрити вибір мови", translating:"Перекладаємо…", error:"Переклад тимчасово недоступний." },
  cs:{ choose:"Vyberte jazyk", intro:"Vyberte jazyk PETS & DOGUE. Zůstane aktivní na všech stránkách.", close:"Zavřít výběr jazyka", translating:"Překládáme…", error:"Překlad je dočasně nedostupný." },
  pl:{ choose:"Wybierz język", intro:"Wybierz język PETS & DOGUE. Pozostanie aktywny na wszystkich stronach.", close:"Zamknij wybór języka", translating:"Tłumaczenie…", error:"Tłumaczenie jest chwilowo niedostępne." },
  es:{ choose:"Elige tu idioma", intro:"Elige un idioma para PETS & DOGUE. Permanecerá activo en todas las páginas.", close:"Cerrar selector de idioma", translating:"Traduciendo…", error:"La traducción no está disponible temporalmente." },
  it:{ choose:"Scegli la lingua", intro:"Scegli una lingua per PETS & DOGUE. Rimarrà attiva su tutte le pagine.", close:"Chiudi selezione lingua", translating:"Traduzione…", error:"La traduzione non è momentaneamente disponibile." },
  de:{ choose:"Sprache auswählen", intro:"Wählen Sie eine Sprache für PETS & DOGUE. Sie bleibt auf allen Seiten aktiv.", close:"Sprachauswahl schließen", translating:"Übersetzung…", error:"Die Übersetzung ist vorübergehend nicht verfügbar." },
  ar:{ choose:"اختر لغتك", intro:"اختر لغة PETS & DOGUE. ستبقى مفعلة في جميع الصفحات.", close:"إغلاق قائمة اللغات", translating:"جارٍ الترجمة…", error:"الترجمة غير متاحة مؤقتًا." },
  hi:{ choose:"अपनी भाषा चुनें", intro:"PETS & DOGUE के लिए भाषा चुनें। यह सभी पृष्ठों पर सक्रिय रहेगी।", close:"भाषा मेनू बंद करें", translating:"अनुवाद हो रहा है…", error:"अनुवाद अस्थायी रूप से उपलब्ध नहीं है।" }
};

const EXCLUDED_TAGS = new Set([
  "SCRIPT","STYLE","NOSCRIPT","CODE","PRE","SVG","PATH","IFRAME","CANVAS","VIDEO","AUDIO"
]);

const ATTRIBUTES = ["placeholder","title","aria-label","alt"];
const PROTECTED_TEXT = new Set([
  "PETS & DOGUE","PETS &amp; DOGUE","DOGUE","pets &","Miso","DOGUE Trust","DOGUE Verified"
]);

let selectedLanguage = readStoredLanguage() || SOURCE_LANGUAGE;
let cache = readCache();
let observer = null;
let timer = null;
let running = false;
let requestId = 0;

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();

function getLanguage(code) {
  return LANGUAGES.find(item => item.code === code) || LANGUAGES[0];
}

function getUI() {
  return UI[selectedLanguage] || UI.en;
}

function readStoredLanguage() {
  try {
    const value = localStorage.getItem(LANGUAGE_KEY);
    return LANGUAGES.some(item => item.code === value) ? value : "";
  } catch (error) {
    return "";
  }
}

function storeLanguage(code) {
  try {
    localStorage.setItem(LANGUAGE_KEY, code);
  } catch (error) {
    console.warn("Unable to save language.", error);
  }
}

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function hasLetters(value) {
  try {
    return /\p{L}/u.test(String(value || ""));
  } catch (error) {
    return /[A-Za-zА-Яа-яЁёІіЇїЄє]/.test(String(value || ""));
  }
}

function shouldTranslate(value) {
  const text = normalizeText(value);
  if (!text || text.length < 2 || !hasLetters(text)) return false;
  if (PROTECTED_TEXT.has(text)) return false;
  if (/^(https?:\/\/|mailto:|tel:|javascript:)/i.test(text)) return false;
  return true;
}

function readCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
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
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${(hash >>> 0).toString(36)}_${text.length}`;
}

function getCached(languageCode, text) {
  const item = cache[languageCode]?.[hashText(text)];
  return item && item.original === text ? item.translation : "";
}

function setCached(languageCode, original, translation) {
  if (!cache[languageCode]) cache[languageCode] = {};
  cache[languageCode][hashText(original)] = { original, translation };
}

function applyDocumentLanguage() {
  const language = getLanguage(selectedLanguage);
  document.documentElement.lang = language.code;
  document.documentElement.dir = language.direction;
  document.body?.classList.toggle("pd-rtl", language.direction === "rtl");
}

function protectElement(element) {
  if (!element) return;
  element.classList.add("notranslate");
  element.setAttribute("translate", "no");
  element.setAttribute("data-pd-no-translate", "true");
}

function protectBrandElements(root = document) {
  if (!root?.querySelectorAll) return;

  root.querySelectorAll(
    ".brand,.brand-small,.brand-big,.logo-small,.logo-big,.footer-brand,[data-pd-brand],.notranslate,[translate='no'],[data-pd-no-translate]"
  ).forEach(protectElement);

  root.querySelectorAll("*").forEach(element => {
    if (element.children.length === 0 && PROTECTED_TEXT.has(normalizeText(element.textContent))) {
      protectElement(element);
    }
  });
}

function isProtectedElement(element) {
  if (!element || EXCLUDED_TAGS.has(element.tagName)) return true;
  return Boolean(element.closest(
    "script,style,noscript,code,pre,svg,iframe,canvas,#pd-language-button,#pd-language-overlay,#pd-translation-status,.notranslate,[translate='no'],[data-pd-no-translate],[data-pd-brand]"
  ));
}

function rememberText(node) {
  if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
}

function rememberAttribute(element, name) {
  let attributes = originalAttributes.get(element);
  if (!attributes) {
    attributes = {};
    originalAttributes.set(element, attributes);
  }
  if (attributes[name] === undefined) {
    attributes[name] = element.getAttribute(name) || "";
  }
}

function rememberMetadata() {
  if (document.documentElement.dataset.pdOriginalTitle === undefined) {
    document.documentElement.dataset.pdOriginalTitle = document.title || "";
  }

  document.querySelectorAll(
    'meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]'
  ).forEach(meta => {
    if (meta.dataset.pdOriginalContent === undefined) {
      meta.dataset.pdOriginalContent = meta.getAttribute("content") || "";
    }
  });
}

function restoreOriginalContent(root = document.body) {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (originalTextNodes.has(node)) node.nodeValue = originalTextNodes.get(node);
  }

  const elements = [];
  if (root.nodeType === Node.ELEMENT_NODE) elements.push(root);
  if (root.querySelectorAll) elements.push(...root.querySelectorAll("*"));

  elements.forEach(element => {
    const attributes = originalAttributes.get(element);
    if (!attributes) return;
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  });

  if (document.documentElement.dataset.pdOriginalTitle !== undefined) {
    document.title = document.documentElement.dataset.pdOriginalTitle;
  }

  document.querySelectorAll(
    'meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]'
  ).forEach(meta => {
    if (meta.dataset.pdOriginalContent !== undefined) {
      meta.setAttribute("content", meta.dataset.pdOriginalContent);
    }
  });
}

function collectItems(root = document.body) {
  const items = [];
  if (!root) return items;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || isProtectedElement(parent)) return NodeFilter.FILTER_REJECT;
      rememberText(node);
      const original = originalTextNodes.get(node) || "";
      return shouldTranslate(original) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const original = originalTextNodes.get(node) || "";
    items.push({ type:"text", node, original, requestText:normalizeText(original) });
  }

  const elements = [];
  if (root.nodeType === Node.ELEMENT_NODE) elements.push(root);
  if (root.querySelectorAll) elements.push(...root.querySelectorAll("*"));

  elements.forEach(element => {
    if (isProtectedElement(element)) return;

    ATTRIBUTES.forEach(name => {
      if (!element.hasAttribute(name)) return;
      rememberAttribute(element, name);
      const original = originalAttributes.get(element)?.[name] || "";
      if (shouldTranslate(original)) {
        items.push({ type:"attribute", element, name, original, requestText:normalizeText(original) });
      }
    });
  });

  rememberMetadata();

  const originalTitle = document.documentElement.dataset.pdOriginalTitle || "";
  if (shouldTranslate(originalTitle)) {
    items.push({ type:"title", original:originalTitle, requestText:normalizeText(originalTitle) });
  }

  return items;
}

function createBatches(texts) {
  const batches = [];
  let current = [];
  let characters = 0;

  texts.forEach(text => {
    if (current.length >= 40 || (current.length > 0 && characters + text.length > 18000)) {
      batches.push(current);
      current = [];
      characters = 0;
    }

    current.push(text);
    characters += text.length;
  });

  if (current.length) batches.push(current);
  return batches;
}

async function requestBatch(texts, targetLanguage) {
  const response = await fetch(API_ENDPOINT, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      sourceLanguage:SOURCE_LANGUAGE,
      targetLanguage,
      texts
    })
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error("Invalid translation server response.");
  }

  if (!response.ok) {
    throw new Error(data?.error || `Translation failed (${response.status}).`);
  }

  if (!Array.isArray(data.translations) || data.translations.length !== texts.length) {
    throw new Error("Translation response has an invalid format.");
  }

  return data.translations;
}

async function getTranslations(texts, targetLanguage) {
  const unique = [...new Set(texts)];
  const result = new Map();
  const missing = [];

  unique.forEach(text => {
    const cached = getCached(targetLanguage, text);
    if (cached) result.set(text, cached);
    else missing.push(text);
  });

  for (const batch of createBatches(missing)) {
    const translated = await requestBatch(batch, targetLanguage);

    batch.forEach((original, index) => {
      const translation = String(translated[index] || original);
      result.set(original, translation);
      setCached(targetLanguage, original, translation);
    });

    saveCache();
  }

  return result;
}

function preserveWhitespace(original, translated) {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  return leading + translated + trailing;
}

function applyItem(item, translated) {
  if (typeof translated !== "string" || !translated.trim()) return;

  if (item.type === "text") {
    item.node.nodeValue = preserveWhitespace(item.original, translated);
  } else if (item.type === "attribute") {
    item.element.setAttribute(item.name, translated);
  } else if (item.type === "title") {
    document.title = translated;
  }
}

function createStyles() {
  if (document.getElementById("pd-language-styles")) return;

  const style = document.createElement("style");
  style.id = "pd-language-styles";
  style.textContent = `
#pd-language-button{position:fixed;right:16px;bottom:16px;z-index:2147483000;display:flex;align-items:center;justify-content:center;gap:9px;min-width:102px;height:54px;padding:0 17px;border:3px solid #111;border-radius:999px;background:#fff;color:#111;font:900 15px Arial,sans-serif;cursor:pointer;box-shadow:0 14px 38px rgba(0,0,0,.28)}
#pd-language-overlay{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(0,0,0,.78);backdrop-filter:blur(8px)}
#pd-language-overlay.pd-open{display:flex}
#pd-language-modal{width:min(680px,100%);max-height:88vh;overflow-y:auto;background:#f8f7f3;border:3px solid #111;border-radius:34px;box-shadow:0 30px 90px rgba(0,0,0,.44)}
.pd-language-header{position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px;background:#111;color:#fff}
.pd-language-header h2{margin:0;font:normal 32px Georgia,serif}
.pd-language-close{width:44px;height:44px;border:none;border-radius:50%;background:#fff;font-size:25px}
.pd-language-intro{padding:23px 24px 7px;color:#555;font-size:15px;line-height:1.65}
#pd-language-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;padding:18px 24px 26px}
.pd-language-option{display:flex;align-items:center;gap:13px;min-height:72px;padding:14px 16px;border:2px solid #111;border-radius:20px;background:#fff;color:#111;text-align:left;cursor:pointer}
.pd-language-option.pd-active{background:#65e51f}
.pd-language-flag{font-size:28px}.pd-language-name{display:block;font-size:16px;font-weight:900}.pd-language-code{display:block;margin-top:3px;font-size:11px;color:#666;letter-spacing:1px}
#pd-translation-status{position:fixed;left:50%;bottom:24px;z-index:2147482999;display:flex;align-items:center;gap:10px;padding:12px 18px;border:2px solid #111;border-radius:999px;background:#111;color:#fff;font:700 13px Arial,sans-serif;opacity:0;visibility:hidden;transform:translate(-50%,15px);transition:.2s}
#pd-translation-status.pd-visible{opacity:1;visibility:visible;transform:translate(-50%,0)}
.pd-status-spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.35);border-top-color:#65e51f;border-radius:50%;animation:pdSpin .8s linear infinite}
@keyframes pdSpin{to{transform:rotate(360deg)}}
body.pd-rtl #pd-language-button{right:auto;left:16px}
body.pd-rtl .pd-language-option,body.pd-rtl input,body.pd-rtl textarea,body.pd-rtl select{text-align:right;direction:rtl}
@media(max-width:600px){#pd-language-button{right:12px;bottom:12px;height:52px}body.pd-rtl #pd-language-button{right:auto;left:12px}#pd-language-grid{grid-template-columns:1fr;padding:15px}.pd-language-header{padding:19px}.pd-language-header h2{font-size:26px}#pd-translation-status{bottom:76px;max-width:calc(100% - 28px)}}
`;
  document.head.appendChild(style);
}

function createInterface() {
  if (document.getElementById("pd-language-button")) return;

  const button = document.createElement("button");
  button.id = "pd-language-button";
  button.type = "button";
  protectElement(button);
  button.innerHTML = `<span class="pd-language-globe">🌐</span><span id="pd-language-current"></span>`;

  const overlay = document.createElement("div");
  overlay.id = "pd-language-overlay";
  protectElement(overlay);
  overlay.innerHTML = `
<div id="pd-language-modal" role="dialog" aria-modal="true" aria-labelledby="pd-language-title">
  <div class="pd-language-header">
    <h2 id="pd-language-title"></h2>
    <button type="button" class="pd-language-close">×</button>
  </div>
  <p class="pd-language-intro"></p>
  <div id="pd-language-grid"></div>
</div>`;

  const status = document.createElement("div");
  status.id = "pd-translation-status";
  protectElement(status);
  status.innerHTML = `<span class="pd-status-spinner"></span><span class="pd-status-text"></span>`;

  document.body.appendChild(button);
  document.body.appendChild(overlay);
  document.body.appendChild(status);

  const grid = overlay.querySelector("#pd-language-grid");

  LANGUAGES.forEach(language => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "pd-language-option";
    option.dataset.language = language.code;
    option.innerHTML = `
<span class="pd-language-flag">${language.flag}</span>
<span><span class="pd-language-name">${language.label}</span><span class="pd-language-code">${language.short}</span></span>`;
    option.addEventListener("click", () => changeLanguage(language.code));
    grid.appendChild(option);
  });

  button.addEventListener("click", openLanguageMenu);
  overlay.querySelector(".pd-language-close").addEventListener("click", closeLanguageMenu);
  overlay.addEventListener("click", event => {
    if (event.target === overlay) closeLanguageMenu();
  });

  updateInterface();
}

function updateInterface() {
  const language = getLanguage(selectedLanguage);
  const ui = getUI();

  const current = document.getElementById("pd-language-current");
  if (current) current.textContent = language.short;

  const title = document.getElementById("pd-language-title");
  if (title) title.textContent = ui.choose;

  const intro = document.querySelector("#pd-language-overlay .pd-language-intro");
  if (intro) intro.textContent = ui.intro;

  const close = document.querySelector("#pd-language-overlay .pd-language-close");
  if (close) close.setAttribute("aria-label", ui.close);

  document.querySelectorAll(".pd-language-option").forEach(option => {
    option.classList.toggle("pd-active", option.dataset.language === selectedLanguage);
  });
}

function showStatus(message) {
  const status = document.getElementById("pd-translation-status");
  if (!status) return;
  const label = status.querySelector(".pd-status-text");
  if (label) label.textContent = message;
  status.classList.add("pd-visible");
}

function hideStatus() {
  document.getElementById("pd-translation-status")?.classList.remove("pd-visible");
}

function openLanguageMenu() {
  document.getElementById("pd-language-overlay")?.classList.add("pd-open");
  document.body.style.overflow = "hidden";
}

function closeLanguageMenu() {
  document.getElementById("pd-language-overlay")?.classList.remove("pd-open");
  document.body.style.overflow = "";
}

async function translatePage(root = document.body) {
  if (!root || running) return;

  const currentRequest = ++requestId;
  const language = getLanguage(selectedLanguage);

  applyDocumentLanguage();
  updateInterface();
  protectBrandElements(root);
  rememberMetadata();

  if (language.code === SOURCE_LANGUAGE) {
    running = true;
    restoreOriginalContent(root);
    running = false;
    hideStatus();
    return;
  }

  running = true;
  showStatus(getUI().translating);

  try {
    const items = collectItems(root);
    if (!items.length) return;

    const translations = await getTranslations(
      items.map(item => item.requestText),
      language.code
    );

    if (currentRequest !== requestId || language.code !== selectedLanguage) return;

    items.forEach(item => {
      const translated = translations.get(item.requestText);
      if (translated) applyItem(item, translated);
    });
  } catch (error) {
    console.error("PETS & DOGUE translation error:", error);
    showStatus(getUI().error);
    setTimeout(hideStatus, 4500);
    return;
  } finally {
    running = false;
  }

  setTimeout(hideStatus, 250);
}

async function changeLanguage(code) {
  const language = getLanguage(code);

  requestId++;
  running = true;
  restoreOriginalContent(document.body);
  running = false;

  selectedLanguage = language.code;
  storeLanguage(selectedLanguage);
  applyDocumentLanguage();
  updateInterface();
  closeLanguageMenu();

  await translatePage(document.body);
}

function observeContent() {
  if (observer || !document.body) return;

  observer = new MutationObserver(mutations => {
    if (running) return;

    let added = false;

    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          protectBrandElements(node);
          added = true;
        } else if (node.nodeType === Node.TEXT_NODE && shouldTranslate(node.nodeValue)) {
          added = true;
        }
      });
    });

    if (added && selectedLanguage !== SOURCE_LANGUAGE) {
      clearTimeout(timer);
      timer = setTimeout(() => translatePage(document.body), 350);
    }
  });

  observer.observe(document.body, { childList:true, subtree:true });
}

function restoreAfterNavigation() {
  const stored = readStoredLanguage();
  selectedLanguage = stored || SOURCE_LANGUAGE;

  applyDocumentLanguage();
  updateInterface();

  if (selectedLanguage === SOURCE_LANGUAGE) {
    restoreOriginalContent(document.body);
  } else {
    setTimeout(() => translatePage(document.body), 100);
  }
}

async function initialize() {
  selectedLanguage = readStoredLanguage() || SOURCE_LANGUAGE;
  createStyles();
  createInterface();
  protectBrandElements();
  rememberMetadata();
  applyDocumentLanguage();
  updateInterface();
  observeContent();
  await translatePage(document.body);
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLanguageMenu();
});

window.addEventListener("pageshow", restoreAfterNavigation);
window.addEventListener("popstate", () => setTimeout(restoreAfterNavigation, 100));

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}

window.PetsDogueLanguage = {
  languages: LANGUAGES,
  getCurrentLanguage: () => getLanguage(selectedLanguage),
  getSpeechLanguage: () => getLanguage(selectedLanguage).speech,
  changeLanguage,
  setLanguage: changeLanguage,
  translatePage,
  restore: restoreAfterNavigation,
  open: openLanguageMenu,
  close: closeLanguageMenu
};

})();
