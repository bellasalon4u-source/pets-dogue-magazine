"use strict";

(function () {
  const LANGUAGE_KEY = "pets_dogue_language";

  const STORY_ROUTES = {
    miso: "issue-01-miso.html",
    pablo: "issue-01-pablo.html",
    jessica: "issue-01-jessica.html",
    richie: "issue-01-richie-pi.html",
    pi: "issue-01-richie-pi.html"
  };

  const STORY_GROUP = {
    miso: "miso",
    pablo: "pablo",
    jessica: "jessica",
    richie: "richie-pi",
    pi: "richie-pi"
  };

  const STORY_NAMES = {
    miso: "Miso",
    pablo: "Pablo",
    jessica: "Jessica",
    richie: "Richie & Pi",
    pi: "Richie & Pi"
  };

  const LANGUAGE_ALIASES = {
    ua: "uk",
    cz: "cs",
    gr: "el",
    se: "sv",
    dk: "da"
  };

  const LABELS = {
    en: {
      open: "READ THE FULL STORY",
      close: "CLOSE STORY",
      loading: "Opening story…",
      story: "THE FULL STORY",
      continue: "Continue reading",
      end: "END OF STORY",
      error: "The story could not be opened.",
      retry: "OPEN ORIGINAL STORY"
    },
    uk: {
      open: "ЧИТАТИ ПОВНУ ІСТОРІЮ",
      close: "ЗГОРНУТИ ІСТОРІЮ",
      loading: "Відкриваємо історію…",
      story: "ПОВНА ІСТОРІЯ",
      continue: "Продовжуйте читати",
      end: "КІНЕЦЬ ІСТОРІЇ",
      error: "Не вдалося відкрити історію.",
      retry: "ВІДКРИТИ ОРИГІНАЛ"
    },
    ru: {
      open: "ЧИТАТЬ ПОЛНУЮ ИСТОРИЮ",
      close: "СВЕРНУТЬ ИСТОРИЮ",
      loading: "Открываем историю…",
      story: "ПОЛНАЯ ИСТОРИЯ",
      continue: "Продолжайте читать",
      end: "КОНЕЦ ИСТОРИИ",
      error: "Не удалось открыть историю.",
      retry: "ОТКРЫТЬ ОРИГИНАЛ"
    },
    fr: {
      open: "LIRE L’HISTOIRE COMPLÈTE",
      close: "FERMER L’HISTOIRE",
      loading: "Ouverture de l’histoire…",
      story: "L’HISTOIRE COMPLÈTE",
      continue: "Continuer la lecture",
      end: "FIN DE L’HISTOIRE",
      error: "Impossible d’ouvrir l’histoire.",
      retry: "OUVRIR L’ARTICLE ORIGINAL"
    },
    de: {
      open: "DIE GANZE GESCHICHTE LESEN",
      close: "GESCHICHTE SCHLIESSEN",
      loading: "Geschichte wird geöffnet…",
      story: "DIE GANZE GESCHICHTE",
      continue: "Weiterlesen",
      end: "ENDE DER GESCHICHTE",
      error: "Die Geschichte konnte nicht geöffnet werden.",
      retry: "ORIGINALARTIKEL ÖFFNEN"
    },
    es: {
      open: "LEER LA HISTORIA COMPLETA",
      close: "CERRAR HISTORIA",
      loading: "Abriendo la historia…",
      story: "LA HISTORIA COMPLETA",
      continue: "Seguir leyendo",
      end: "FIN DE LA HISTORIA",
      error: "No se pudo abrir la historia.",
      retry: "ABRIR ARTÍCULO ORIGINAL"
    },
    it: {
      open: "LEGGI LA STORIA COMPLETA",
      close: "CHIUDI LA STORIA",
      loading: "Apertura della storia…",
      story: "LA STORIA COMPLETA",
      continue: "Continua a leggere",
      end: "FINE DELLA STORIA",
      error: "Impossibile aprire la storia.",
      retry: "APRI L’ARTICOLO ORIGINALE"
    },
    pt: {
      open: "LER A HISTÓRIA COMPLETA",
      close: "FECHAR HISTÓRIA",
      loading: "A abrir a história…",
      story: "A HISTÓRIA COMPLETA",
      continue: "Continuar a ler",
      end: "FIM DA HISTÓRIA",
      error: "Não foi possível abrir a história.",
      retry: "ABRIR ARTIGO ORIGINAL"
    },
    nl: {
      open: "LEES HET VOLLEDIGE VERHAAL",
      close: "VERHAAL SLUITEN",
      loading: "Verhaal openen…",
      story: "HET VOLLEDIGE VERHAAL",
      continue: "Lees verder",
      end: "EINDE VAN HET VERHAAL",
      error: "Het verhaal kon niet worden geopend.",
      retry: "ORIGINEEL ARTIKEL OPENEN"
    },
    pl: {
      open: "PRZECZYTAJ CAŁĄ HISTORIĘ",
      close: "ZAMKNIJ HISTORIĘ",
      loading: "Otwieranie historii…",
      story: "PEŁNA HISTORIA",
      continue: "Czytaj dalej",
      end: "KONIEC HISTORII",
      error: "Nie udało się otworzyć historii.",
      retry: "OTWÓRZ ORYGINALNY ARTYKUŁ"
    },
    cs: {
      open: "PŘEČÍST CELÝ PŘÍBĚH",
      close: "ZAVŘÍT PŘÍBĚH",
      loading: "Otevírání příběhu…",
      story: "CELÝ PŘÍBĚH",
      continue: "Pokračovat ve čtení",
      end: "KONEC PŘÍBĚHU",
      error: "Příběh se nepodařilo otevřít.",
      retry: "OTEVŘÍT PŮVODNÍ ČLÁNEK"
    },
    sk: {
      open: "PREČÍTAŤ CELÝ PRÍBEH",
      close: "ZAVRIEŤ PRÍBEH",
      loading: "Otváranie príbehu…",
      story: "CELÝ PRÍBEH",
      continue: "Pokračovať v čítaní",
      end: "KONIEC PRÍBEHU",
      error: "Príbeh sa nepodarilo otvoriť.",
      retry: "OTVORIŤ PÔVODNÝ ČLÁNOK"
    },
    hu: {
      open: "A TELJES TÖRTÉNET",
      close: "TÖRTÉNET BEZÁRÁSA",
      loading: "A történet megnyitása…",
      story: "A TELJES TÖRTÉNET",
      continue: "Olvass tovább",
      end: "A TÖRTÉNET VÉGE",
      error: "A történetet nem sikerült megnyitni.",
      retry: "EREDETI CIKK MEGNYITÁSA"
    },
    ro: {
      open: "CITEȘTE POVESTEA COMPLETĂ",
      close: "ÎNCHIDE POVESTEA",
      loading: "Se deschide povestea…",
      story: "POVESTEA COMPLETĂ",
      continue: "Continuă lectura",
      end: "SFÂRȘITUL POVEȘTII",
      error: "Povestea nu a putut fi deschisă.",
      retry: "DESCHIDE ARTICOLUL ORIGINAL"
    },
    bg: {
      open: "ПРОЧЕТЕТЕ ЦЯЛАТА ИСТОРИЯ",
      close: "ЗАТВОРИ ИСТОРИЯТА",
      loading: "Отваряне на историята…",
      story: "ЦЯЛАТА ИСТОРИЯ",
      continue: "Продължете да четете",
      end: "КРАЙ НА ИСТОРИЯТА",
      error: "Историята не можа да бъде отворена.",
      retry: "ОТВОРИ ОРИГИНАЛНАТА СТАТИЯ"
    },
    el: {
      open: "ΔΙΑΒΑΣΤΕ ΟΛΗ ΤΗΝ ΙΣΤΟΡΙΑ",
      close: "ΚΛΕΙΣΙΜΟ ΙΣΤΟΡΙΑΣ",
      loading: "Άνοιγμα ιστορίας…",
      story: "ΟΛΗ Η ΙΣΤΟΡΙΑ",
      continue: "Συνεχίστε την ανάγνωση",
      end: "ΤΕΛΟΣ ΙΣΤΟΡΙΑΣ",
      error: "Δεν ήταν δυνατό το άνοιγμα της ιστορίας.",
      retry: "ΑΝΟΙΓΜΑ ΑΡΧΙΚΟΥ ΑΡΘΡΟΥ"
    },
    sv: {
      open: "LÄS HELA BERÄTTELSEN",
      close: "STÄNG BERÄTTELSEN",
      loading: "Öppnar berättelsen…",
      story: "HELA BERÄTTELSEN",
      continue: "Fortsätt läsa",
      end: "SLUT PÅ BERÄTTELSEN",
      error: "Berättelsen kunde inte öppnas.",
      retry: "ÖPPNA ORIGINALARTIKELN"
    },
    da: {
      open: "LÆS HELE HISTORIEN",
      close: "LUK HISTORIEN",
      loading: "Åbner historien…",
      story: "HELE HISTORIEN",
      continue: "Fortsæt med at læse",
      end: "SLUT PÅ HISTORIEN",
      error: "Historien kunne ikke åbnes.",
      retry: "ÅBN DEN ORIGINALE ARTIKEL"
    },
    no: {
      open: "LES HELE HISTORIEN",
      close: "LUKK HISTORIEN",
      loading: "Åpner historien…",
      story: "HELE HISTORIEN",
      continue: "Fortsett å lese",
      end: "SLUTT PÅ HISTORIEN",
      error: "Historien kunne ikke åpnes.",
      retry: "ÅPNE ORIGINALARTIKKELEN"
    },
    fi: {
      open: "LUE KOKO TARINA",
      close: "SULJE TARINA",
      loading: "Avataan tarinaa…",
      story: "KOKO TARINA",
      continue: "Jatka lukemista",
      end: "TARINAN LOPPU",
      error: "Tarinaa ei voitu avata.",
      retry: "AVAA ALKUPERÄINEN ARTIKKELI"
    },
    tr: {
      open: "TÜM HİKÂYEYİ OKU",
      close: "HİKÂYEYİ KAPAT",
      loading: "Hikâye açılıyor…",
      story: "TÜM HİKÂYE",
      continue: "Okumaya devam et",
      end: "HİKÂYENİN SONU",
      error: "Hikâye açılamadı.",
      retry: "ORİJİNAL MAKALEYİ AÇ"
    },
    ar: {
      open: "اقرأ القصة كاملة",
      close: "إغلاق القصة",
      loading: "جارٍ فتح القصة…",
      story: "القصة كاملة",
      continue: "تابع القراءة",
      end: "نهاية القصة",
      error: "تعذر فتح القصة.",
      retry: "فتح المقال الأصلي"
    },
    hi: {
      open: "पूरी कहानी पढ़ें",
      close: "कहानी बंद करें",
      loading: "कहानी खुल रही है…",
      story: "पूरी कहानी",
      continue: "पढ़ना जारी रखें",
      end: "कहानी समाप्त",
      error: "कहानी नहीं खुल सकी।",
      retry: "मूल लेख खोलें"
    }
  };

  let currentPanel = null;
  let currentButton = null;
  let currentStory = "";
  let requestController = null;

  function normalizeLanguage(value) {
    const raw = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/_/g, "-");
    const base = raw.split("-")[0] || "en";
    const normalized = LANGUAGE_ALIASES[base] || base;
    return LABELS[normalized] ? normalized : "en";
  }

  function language() {
    let saved = "";
    try {
      saved = localStorage.getItem(LANGUAGE_KEY) || "";
    } catch (error) {}
    return normalizeLanguage(
      saved || document.documentElement.lang || "en"
    );
  }

  function words() {
    return LABELS[language()] || LABELS.en;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function pathOnly(value) {
    try {
      return new URL(value, window.location.href)
        .pathname.split("/")
        .filter(Boolean)
        .pop()?.toLowerCase() || "";
    } catch (error) {
      return String(value || "")
        .split("?")[0]
        .split("#")[0]
        .split("/")
        .pop()
        .toLowerCase();
    }
  }

  function storyFromHref(href) {
    const file = pathOnly(href);
    if (file === "issue-01-miso.html") return "miso";
    if (file === "issue-01-pablo.html") return "pablo";
    if (file === "issue-01-jessica.html") return "jessica";
    if (file === "issue-01-richie-pi.html") return "richie";
    return "";
  }

  function storyFromElement(element) {
    if (!element) return "";
    const explicit = String(element.dataset?.pdStory || "")
      .trim()
      .toLowerCase();
    if (STORY_ROUTES[explicit]) return explicit;
    const href = element.getAttribute?.("href") || "";
    return storyFromHref(href) || "";
  }

  function installStyles() {
    if (document.getElementById("pdIssue01ExpandedStyles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "pdIssue01ExpandedStyles";

    style.textContent = `
.pd-inline-story-button{
  position:relative;
  width:100%;
  min-height:58px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  margin:0;
  padding:14px 18px;
  border:0;
  border-top:1px solid rgba(0,0,0,.16);
  border-bottom:1px solid rgba(0,0,0,.16);
  background:#fffaf0;
  color:#111;
  font-family:Arial,Helvetica,sans-serif;
  font-size:10px;
  font-weight:900;
  line-height:1.2;
  letter-spacing:.11em;
  text-align:left;
  text-transform:uppercase;
  cursor:pointer;
  -webkit-tap-highlight-color:transparent;
}
.pd-inline-story-button::after{
  content:"↓";
  flex:0 0 auto;
  width:36px;
  height:36px;
  display:grid;
  place-items:center;
  border:1px solid #d4a334;
  border-radius:50%;
  background:#070707;
  color:#fff;
  font-size:18px;
  font-weight:400;
  line-height:1;
  transition:transform .22s ease,background .22s ease;
}
.pd-inline-story-button[aria-expanded="true"]{
  background:#070707;
  color:#fff;
  border-color:#070707;
}
.pd-inline-story-button[aria-expanded="true"]::after{
  transform:rotate(180deg);
  background:#d4a334;
  color:#070707;
}
.pd-inline-story-button:hover{
  background:#fff3d7;
}
.pd-inline-story-button[aria-expanded="true"]:hover{
  background:#111;
}
.pd-inline-story-button:focus-visible{
  outline:3px solid #65e51f;
  outline-offset:-3px;
}
.pd-inline-story-panel{
  position:relative;
  width:100%;
  max-width:1180px;
  margin:0 auto;
  overflow:hidden;
  background:#fffaf0;
  color:#111;
  border-top:1px solid #d4a334;
  border-bottom:7px solid #070707;
}
.pd-inline-story-panel[hidden]{
  display:none!important;
}
.pd-inline-story-intro{
  position:relative;
  display:grid;
  grid-template-columns:minmax(0,1fr) auto;
  align-items:center;
  gap:18px;
  min-height:96px;
  padding:20px 24px;
  overflow:hidden;
  background:#070707;
  color:#fff;
}
.pd-inline-story-intro::before{
  content:"";
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:3px;
  background:linear-gradient(90deg,#d4a334,#fff2a5,#d4a334);
}
.pd-inline-story-intro-copy{
  position:relative;
  z-index:2;
  min-width:0;
}
.pd-inline-story-eyebrow{
  margin:0 0 6px;
  color:#d4a334;
  font:900 9px/1.2 Arial,Helvetica,sans-serif;
  letter-spacing:.18em;
  text-transform:uppercase;
}
.pd-inline-story-name{
  margin:0;
  color:#fff;
  font:500 clamp(29px,5vw,48px)/.92 Georgia,"Times New Roman",serif;
  letter-spacing:-.035em;
}
.pd-inline-story-continue{
  margin:7px 0 0;
  color:#ddd;
  font:italic 14px/1.3 Georgia,"Times New Roman",serif;
}
.pd-inline-story-mark{
  position:relative;
  z-index:2;
  width:52px;
  height:52px;
  display:grid;
  place-items:center;
  border:1px solid #d4a334;
  border-radius:50%;
  color:#d4a334;
  font:400 23px/1 Georgia,"Times New Roman",serif;
}
.pd-inline-story-loading{
  min-height:180px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:16px;
  padding:36px 20px;
  background:#fffaf0;
  color:#111;
  font:700 16px/1.4 Georgia,"Times New Roman",serif;
  text-align:center;
}
.pd-inline-story-loading::before{
  content:"";
  width:34px;
  height:34px;
  border:2px solid rgba(0,0,0,.16);
  border-top-color:#d4a334;
  border-radius:50%;
  animation:pdStorySpin .8s linear infinite;
}
@keyframes pdStorySpin{
  to{transform:rotate(360deg);}
}
.pd-inline-story-error{
  padding:42px 22px;
  background:#fffaf0;
  color:#111;
  text-align:center;
}
.pd-inline-story-error p{
  margin:0 0 19px;
  font:18px/1.45 Georgia,"Times New Roman",serif;
}
.pd-inline-story-error a{
  min-height:48px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:11px 21px;
  border:1px solid #d4a334;
  border-radius:999px;
  background:#070707;
  color:#fff;
  font:900 9px/1 Arial,Helvetica,sans-serif;
  letter-spacing:.09em;
  text-decoration:none;
}
.pd-inline-story-content{
  position:relative;
  width:100%;
  overflow:hidden;
  background:#fffaf0;
  color:#111;
  isolation:isolate;
  contain:layout paint;
}
.pd-inline-story-content > *{
  max-width:1180px;
  margin-left:auto;
  margin-right:auto;
}
.pd-inline-story-content #pdLuxuryHeader,
.pd-inline-story-content #pdContentsTicker,
.pd-inline-story-content #pdHomeHeaderImage,
.pd-inline-story-content #pdShellMenu,
.pd-inline-story-content #pdShellOverlay,
.pd-inline-story-content #pdInstallLauncher,
.pd-inline-story-content #pdInstallSheet,
.pd-inline-story-content #pdLuxuryProfileMenu,
.pd-inline-story-content .pd-help-launcher,
.pd-inline-story-content .pd-help-panel,
.pd-inline-story-content .pd-help-overlay,
.pd-inline-story-content [data-pets-dogue-help],
.pd-inline-story-content .issue-back,
.pd-inline-story-content script,
.pd-inline-story-content style,
.pd-inline-story-content link,
.pd-inline-story-content meta,
.pd-inline-story-content title{
  display:none!important;
}
.pd-inline-story-finish{
  position:relative;
  padding:25px 20px 23px;
  background:#070707;
  color:#fff;
  text-align:center;
}
.pd-inline-story-finish-label{
  margin:0 0 13px;
  color:#d4a334;
  font:900 9px/1.2 Arial,Helvetica,sans-serif;
  letter-spacing:.18em;
  text-transform:uppercase;
}
.pd-inline-story-bottom-close{
  min-width:min(100%,300px);
  min-height:48px;
  padding:10px 24px;
  border:1px solid #d4a334;
  border-radius:999px;
  background:#070707;
  color:#fff;
  cursor:pointer;
  font:900 9px/1 Arial,Helvetica,sans-serif;
  letter-spacing:.1em;
  text-transform:uppercase;
}
.pd-inline-story-bottom-close::before{
  content:"↑";
  display:inline-block;
  margin-right:10px;
  color:#d4a334;
  font-size:17px;
  vertical-align:-2px;
}
.pd-inline-story-bottom-close:hover{
  background:#151515;
}
.pd-inline-story-bottom-close:focus-visible{
  outline:3px solid #65e51f;
  outline-offset:3px;
}
html[dir="rtl"] .pd-inline-story-button{
  text-align:right;
}
html[dir="rtl"] .pd-inline-story-intro{
  direction:rtl;
  text-align:right;
}
html[dir="rtl"] .pd-inline-story-bottom-close::before{
  margin-right:0;
  margin-left:10px;
}
@media(max-width:720px){
  .pd-inline-story-button{
    min-height:54px;
    padding:11px 14px;
    font-size:8.8px;
    letter-spacing:.08em;
  }
  .pd-inline-story-button::after{
    width:32px;
    height:32px;
    font-size:16px;
  }
  .pd-inline-story-intro{
    min-height:82px;
    padding:16px 15px;
    gap:10px;
  }
  .pd-inline-story-eyebrow{
    font-size:7.5px;
  }
  .pd-inline-story-name{
    font-size:29px;
  }
  .pd-inline-story-continue{
    margin-top:5px;
    font-size:12px;
  }
  .pd-inline-story-mark{
    width:43px;
    height:43px;
    font-size:19px;
  }
  .pd-inline-story-finish{
    padding:21px 15px;
  }
}
@media(prefers-reduced-motion:reduce){
  .pd-inline-story-button::after{
    transition:none;
  }
  .pd-inline-story-loading::before{
    animation:none;
  }
}
`;
    document.head.appendChild(style);
  }

  function candidateLinks() {
    return Array.from(
      document.querySelectorAll(
        'a[href*="issue-01-miso.html"],' +
        'a[href*="issue-01-pablo.html"],' +
        'a[href*="issue-01-jessica.html"],' +
        'a[href*="issue-01-richie-pi.html"],' +
        '[data-pd-story]'
      )
    ).filter(function (element) {
      if (
        element.closest(
          "#pdLuxuryHeader," +
          "#pdContentsTicker," +
          "#pdShellMenu," +
          "#pdShellOverlay," +
          "#pdLuxuryProfileMenu," +
          "#pdInstallSheet," +
          "#pdInstallLauncher," +
          ".pd-inline-story-panel"
        )
      ) {
        return false;
      }
      return Boolean(storyFromElement(element));
    });
  }

  function closestStorySection(element) {
    if (!element) return null;
    const selectors = [
      "article",
      "section",
      ".cover-star",
      ".coverstar",
      ".animal",
      ".animal-card",
      ".story-card",
      ".feature",
      ".profile",
      ".character",
      ".pet-card"
    ];

    for (const selector of selectors) {
      const section = element.closest(selector);
      if (section) return section;
    }
    return element.parentElement;
  }

  function createPanel(button, story) {
    const panel = document.createElement("section");
    const group = STORY_GROUP[story] || story;

    panel.className = "pd-inline-story-panel";
    panel.hidden = true;
    panel.setAttribute("data-pd-no-translate", "");
    panel.dataset.pdInlineStory = group;
    panel.setAttribute("aria-live", "polite");

    const panelId =
      "pdInlineStory-" + group + "-" +
      Math.random().toString(36).slice(2, 8);

    panel.id = panelId;
    button.setAttribute("aria-controls", panelId);

    const section = closestStorySection(button);
    if (section && section.parentNode) {
      section.insertAdjacentElement("afterend", panel);
    } else {
      button.insertAdjacentElement("afterend", panel);
    }
    return panel;
  }

  function convertLink(link) {
    if (!link || link.dataset.pdInlineReady === "1") return;

    const story = storyFromElement(link);
    if (!story) return;

    const originalHref =
      link.getAttribute("href") || STORY_ROUTES[story];

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-pd-no-translate", "");

    button.className = (
      String(link.className || "") + " pd-inline-story-button"
    ).trim();

    button.dataset.pdStory = story;
    button.dataset.pdOriginalHref = originalHref;
    button.dataset.pdInlineReady = "1";
    button.dataset.pdOriginalLabel = String(
      link.textContent || words().open
    ).trim();

    button.innerHTML =
      link.innerHTML || button.dataset.pdOriginalLabel;

    button.setAttribute("aria-expanded", "false");
    link.replaceWith(button);

    button.addEventListener("click", function () {
      toggleStory(button);
    });
  }

  function prepareButtons() {
    candidateLinks().forEach(convertLink);
  }

  function translatedOriginalLabel(story) {
    const api = window.PetsDogueIssue01;
    const lang = language();

    const key =
      story === "miso" ? "miso.more" :
      story === "pablo" ? "pablo.more" :
      story === "jessica" ? "jessica.more" :
      story === "pi" ? "pi.more" :
      "richie.more";

    try {
      const table =
        api &&
        api.translations &&
        (api.translations[lang] || api.translations.en);

      if (table && typeof table[key] === "string") {
        return table[key];
      }
    } catch (error) {}
    return "";
  }

  function restoreButtonLabel(button) {
    if (!button) return;
    const story = button.dataset.pdStory;
    const translated = translatedOriginalLabel(story);
    const original = button.dataset.pdOriginalLabel;
    button.textContent = translated || original || words().open;
  }

  function setCloseLabel(button) {
    if (!button) return;
    button.textContent = words().close;
  }

  function closeCurrent(options) {
    const settings = options || {};

    if (requestController) {
      try {
        requestController.abort();
      } catch (error) {}
      requestController = null;
    }

    if (currentPanel) {
      currentPanel.hidden = true;
      currentPanel.innerHTML = "";
      currentPanel.remove();
    }

    const oldButton = currentButton;
    if (oldButton) {
      oldButton.setAttribute("aria-expanded", "false");
      oldButton.removeAttribute("aria-controls");
      restoreButtonLabel(oldButton);
    }

    currentPanel = null;
    currentButton = null;
    currentStory = "";

    if (settings.scrollToButton && oldButton) {
      window.requestAnimationFrame(function () {
        oldButton.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "auto" : "smooth",
          block: "center"
        });
      });
    }
  }

  function loadingMarkup(story) {
    const text = words();
    const name = STORY_NAMES[story] || "";

    return `
<div class="pd-inline-story-intro">
  <div class="pd-inline-story-intro-copy">
    <div class="pd-inline-story-eyebrow">
      ${escapeHtml(text.story)}
    </div>
    <h2 class="pd-inline-story-name notranslate" translate="no">
      ${escapeHtml(name)}
    </h2>
    <p class="pd-inline-story-continue">
      ${escapeHtml(text.continue)}
    </p>
  </div>
  <div class="pd-inline-story-mark" aria-hidden="true">✦</div>
</div>
<div class="pd-inline-story-loading">
  ${escapeHtml(text.loading)}
</div>
`;
  }

  function errorMarkup(story) {
    const href = STORY_ROUTES[story] || "#";

    return `
<div class="pd-inline-story-error">
  <p>${escapeHtml(words().error)}</p>
  <a href="${escapeHtml(href)}">
    ${escapeHtml(words().retry)}
  </a>
</div>
`;
  }

  function removeStandaloneElements(root) {
    if (!root) return;

    const selectors = [
      "#pdLuxuryHeader",
      "#pdContentsTicker",
      "#pdHomeHeaderImage",
      "#pdShellMenu",
      "#pdShellOverlay",
      "#pdInstallLauncher",
      "#pdInstallSheet",
      "#pdLuxuryProfileMenu",
      ".pd-help-launcher",
      ".pd-help-panel",
      ".pd-help-overlay",
      ".issue-back",
      "script",
      "style",
      "link",
      "meta",
      "title"
    ];

    selectors.forEach(function (selector) {
      root.querySelectorAll(selector).forEach(function (element) {
        element.remove();
      });
    });
  }

  function fixRelativeUrls(root, url) {
    if (!root) return;

    const attributes = [
      ["img", "src"],
      ["img", "srcset"],
      ["source", "src"],
      ["source", "srcset"],
      ["video", "poster"],
      ["video", "src"],
      ["audio", "src"],
      ["a", "href"]
    ];

    attributes.forEach(function (pair) {
      const selector = pair[0];
      const attribute = pair[1];

      root.querySelectorAll(
        selector + "[" + attribute + "]"
      ).forEach(function (element) {
        const value = element.getAttribute(attribute);

        if (
          !value ||
          value.startsWith("#") ||
          value.startsWith("data:") ||
          value.startsWith("blob:") ||
          value.startsWith("mailto:") ||
          value.startsWith("tel:") ||
          value.startsWith("javascript:")
        ) {
          return;
        }

        if (attribute === "srcset") {
          const fixed = value.split(",").map(function (item) {
            const parts = item.trim().split(/\s+/);
            try {
              parts[0] = new URL(parts[0], url).href;
            } catch (error) {}
            return parts.join(" ");
          }).join(", ");

          element.setAttribute(attribute, fixed);
          return;
        }

        try {
          element.setAttribute(
            attribute,
            new URL(value, url).href
          );
        } catch (error) {}
      });
    });
  }

  function chooseArticleRoot(documentCopy, story) {
    const requestedRoots = {
      miso: ["#misoIssue", "main#misoIssue"],
      pablo: ["#pdPabloStory", "main#pabloIssue"],
      jessica: ["#pdJessicaStory", "main#jessicaIssue"],
      richie: ["#pdRichiePiStory", "main#richiePiIssue"],
      pi: ["#pdRichiePiStory", "main#richiePiIssue"]
    };

    const selectors = requestedRoots[story] || [];
    for (const selector of selectors) {
      const root = documentCopy.querySelector(selector);
      if (root) return root;
    }

    return documentCopy.querySelector("main") || documentCopy.body;
  }

  function scopeImportedCss(css, scopeSelector) {
    const parserStyle = document.createElement("style");
    parserStyle.media = "not all";
    parserStyle.textContent = css;
    document.head.appendChild(parserStyle);

    function selector(value) {
      const item = value.trim();
      const rtl = item.match(/^html(\[dir=[^\]]+\])\s*(.*)$/);

      if (rtl) {
        return "html" + rtl[1] + " " + scopeSelector +
          (rtl[2] ? " " + rtl[2] : "");
      }

      if (item === ":root" || item === "html" || item === "body") {
        return scopeSelector;
      }

      return scopeSelector + " " +
        item.replace(/^(html|body)\s+/, "");
    }

    function serialize(rules) {
      return Array.from(rules).map(function (rule) {
        if (rule.type === 1) {
          return rule.selectorText
            .split(/,(?![^()]*\))/)
            .map(selector)
            .join(",") +
            " {" + rule.style.cssText + "}";
        }

        if (rule.cssRules && rule.type !== 7) {
          return rule.cssText.slice(
            0,
            rule.cssText.indexOf("{")
          ) + "{" + serialize(rule.cssRules) + "}";
        }

        return rule.cssText;
      }).join("\n");
    }

    try {
      return serialize(parserStyle.sheet.cssRules);
    } finally {
      parserStyle.remove();
    }
  }

  function importStoryStyles(articleDocument, story, panel) {
    const group = STORY_GROUP[story] || story;
    const scopeSelector =
      '.pd-inline-story-panel[data-pd-inline-story="' +
      group + '"]';

    articleDocument.querySelectorAll("style").forEach(
      function (sourceStyle, index) {
        const style = document.createElement("style");
        style.dataset.pdInlineLocalStyle = group;
        style.textContent = scopeImportedCss(
          sourceStyle.textContent || "",
          scopeSelector
        );
        panel.prepend(style);
      }
    );
  }

  const articleScripts = new Map();

  const STORY_SCRIPTS = {
    miso: "/i18n/issue-01-miso.js?v=20261005-story-sync",
    pablo: "/i18n/issue-01-pablo.js?v=20261005-story-sync",
    jessica: "/i18n/issue-01-jessica.js?v=20261005-story-sync",
    richie: "/i18n/issue-01-richie-pi.js?v=20261005-story-sync",
    pi: "/i18n/issue-01-richie-pi.js?v=20261005-story-sync"
  };

  async function executeArticleScripts(documentCopy, story) {
    const src = STORY_SCRIPTS[story];

    if (!articleScripts.has(src)) {
      articleScripts.set(
        src,
        new Promise(function (resolve, reject) {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = function () {
            articleScripts.delete(src);
            reject(new Error("Could not load story translations."));
          };
          document.head.appendChild(script);
        })
      );
    }

    await articleScripts.get(src);

    window.dispatchEvent(
      new CustomEvent("petsdogue:languagechange", {
        detail: {
          language: language(),
          source: "issue-01-story-ready"
        }
      })
    );
  }

  function bindMisoCarousel(panel){
const root=panel.querySelector("#misoIssue");
if(!root)return;
root.classList.add("pd-editorial");
const scope='.pd-inline-story-panel[data-pd-inline-story="miso"] #misoIssue.pd-editorial ';
function rule(selectors,declarations){return selectors.split(",").map(s=>scope+s.trim()).join(",")+"{"+declarations.replace(/;/g,"!important;")+"}"}
let css="";
function add(s,d){css+=rule(s,d)}
add("*","box-sizing:border-box;");
add(".chapter","max-width:980px;min-height:0;margin:0 auto;border:0;");
add("h1,h2,h3","overflow-wrap:normal;word-break:normal;hyphens:none;text-wrap:balance;");
add("h1","font:400 clamp(38px,6vw,58px)/1.04 Georgia,'Times New Roman',serif;letter-spacing:-.025em;margin:0 0 14px;");
add("h2","font:400 clamp(28px,4vw,36px)/1.12 Georgia,'Times New Roman',serif;letter-spacing:-.02em;margin:0 0 16px;");
add("p","font:400 17px/1.55 Georgia,'Times New Roman',serif;margin:0 0 12px;color:inherit;");
add(".kicker","font:700 10px/1.5 Arial,Helvetica,sans-serif;letter-spacing:.16em;margin-bottom:12px;color:#8d7040;");
add("img","filter:saturate(1.06) contrast(1.025);");
add(".cover","display:grid;grid-template-columns:1.15fr 1fr;background:#080808;color:#fff;");
add(".cover-photo","min-height:0;aspect-ratio:4/5;overflow:hidden;");
add(".cover-photo img","display:block;width:100%;height:100%;object-fit:cover;object-position:center 52%;");
add(".cover-copy","padding:28px;justify-content:center;");
add(".cover-copy p","max-width:38ch;");
add(".cover-blue","font:italic 24px/1.2 Georgia,'Times New Roman',serif;color:#b7d4d0;margin:0 0 16px;text-shadow:none;");
add(".intro","display:grid;grid-template-columns:1.25fr .75fr;align-items:center;padding:30px 24px;gap:24px;background:#f5f0e6;");
add(".intro-copy","padding:0;");
add(".intro-copy p","max-width:42ch;margin:0;");
add(".intro-photo","width:100%;max-width:250px;min-height:0;margin:0 auto;padding:0;background:transparent;overflow:hidden;");
add(".pd-cut-drink","position:relative;width:100%;aspect-ratio:709/1030;overflow:hidden;");
add(".pd-cut-drink img","position:absolute;left:0;top:-19.4175%;width:100%;height:149.1262%;max-height:none;object-fit:fill;transform:none;");
add(".profile","padding:28px 24px;background:#eee7df;");
add(".profile-head","max-width:820px;margin:0 auto 18px;");
add(".profile-layout","display:grid;grid-template-columns:.75fr 1.25fr;gap:22px;align-items:center;max-width:820px;margin:auto;");
add(".profile-photo","display:block;width:100%;max-width:290px;min-height:0;margin:auto;padding:0;border:0;background:transparent;box-shadow:none;");
add(".profile-photo img","display:block;width:100%;height:auto;max-height:none;object-fit:contain;transform:none;");
add(".profile-card","padding:22px;border:0;background:#fffaf3;box-shadow:none;");
add(".profile-name","font:400 32px/1.1 Georgia,'Times New Roman',serif;margin:0 0 8px;");
add(".profile-name .heart","color:#ac5876;");
add(".profile-sub","font:400 15px/1.45 Arial,Helvetica,sans-serif;color:#625c54;margin:0 0 16px;");
add(".profile-grid","display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:7px;border:0;");
add(".profile-fact","padding:11px 10px;border:0;background:#e5eeeb;font:400 16px/1.35 Georgia,'Times New Roman',serif;");
add(".profile-fact:nth-child(4n+1),.profile-fact:nth-child(4n+2)","background:#f4e5e9;");
add(".profile-fact b","font:700 9px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.08em;color:#796447;margin-bottom:6px;");
add(".match","margin-top:16px;font:italic 20px/1.3 Georgia,'Times New Roman',serif;color:#8b4a65;");
add(".moments","padding:28px 0 22px;background:#f5f0e6;");
add(".moments .section-head","max-width:620px;padding:0 20px;margin:0 auto 16px;text-align:center;");
add(".moment-track","position:relative;display:flex;width:100%;gap:12px;padding:8px calc((100% - var(--pd-card,68%))/2) 12px;margin:0;align-items:stretch;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scrollbar-width:none;");
add(".moment-track::-webkit-scrollbar","display:none;");
add(".moment","display:flex;flex-direction:column;flex:0 0 var(--pd-card,68%);width:var(--pd-card,68%);min-width:0;min-height:0;height:auto;margin:0;border:0;background:transparent;box-shadow:none;scroll-snap-align:center;opacity:.35;transform:scale(.92);transition:transform .25s ease,opacity .25s ease;");
add(".moment.pd-active","opacity:1;transform:scale(1);");
add(".moment::after","display:none;");
add(".pd-media","display:grid;place-items:center;width:100%;aspect-ratio:4/5;overflow:hidden;background:#e9e2d6;");
add(".pd-media>img","display:block;width:100%;height:100%;max-height:none;object-fit:contain;transform:none;");
add(".moment figcaption","position:static;inset:auto;flex:1;min-height:86px;margin:0;padding:12px 2px 6px;background:transparent;color:#171717;font:400 14px/1.4 Arial,Helvetica,sans-serif;overflow-wrap:normal;word-break:normal;");
add(".moment figcaption strong","display:block;margin:0 0 6px;color:#171717;font:400 22px/1.15 Georgia,'Times New Roman',serif;overflow-wrap:normal;word-break:normal;");
add(".carousel-controls","margin-top:4px;gap:12px;");
add(".carousel-arrow","width:38px;height:38px;border:1px solid #171717;border-radius:50%;background:transparent;font-size:20px;");
add(".pd-cut-friend","position:relative;width:100%;aspect-ratio:445/579;overflow:hidden;");
add(".pd-cut-friend img","position:absolute;left:0;top:-21.7617%;width:100%;height:121.7617%;max-height:none;object-fit:fill;transform:none;");
add(".pd-media>.pd-cut-friend","width:96.0708%;height:100%;");
add(".story","display:grid;grid-template-columns:1fr .55fr;gap:0 28px;padding:28px 24px;background:#fffaf3;");
add(".story-title","grid-column:1/3;padding:0 0 18px;background:transparent;");
add(".diary","grid-column:1;max-width:none;margin:0;padding:0;");
add(".diary-lead","font-size:19px;");
add(".diary-note","margin:16px 0;padding:14px 16px;border-left:2px solid #b58d46;background:#eee7db;");
add(".pd-diary-photo","grid-column:2;grid-row:2;margin:0;align-self:start;");
add(".pd-diary-photo img","display:block;width:100%;height:auto;");
add(".pull","grid-column:1/3;max-width:none;margin:20px 0 0;padding:18px 0 0;border-top:1px solid #d9cbb6;font:italic 26px/1.25 Georgia,'Times New Roman',serif;color:#8b4a65;letter-spacing:-.01em;");
add(".sea","display:grid;grid-template-columns:1.4fr .6fr;background:#080808;color:#fff;");
add(".sea-photo","height:auto;min-height:0;aspect-ratio:4/3;");
add(".sea-photo img","display:block;width:100%;height:100%;object-fit:cover;object-position:center;");
add(".sea-copy","padding:24px;");
add(".sea-copy p","font:italic 20px/1.35 Georgia,'Times New Roman',serif;color:#b7d4d0;");
add(".london","display:grid;grid-template-columns:1fr 1fr;gap:0 24px;padding:28px 24px;background:#f5f0e6;");
add(".london-head","grid-column:1/3;padding:0 0 18px;background:transparent;");
add(".london-feature","height:auto;min-height:0;width:100%;max-width:none;margin:0;border:0;background:transparent;align-self:start;");
add(".london-feature img","display:block;width:100%;height:auto;object-fit:contain;transform:none;");
add(".london-feature::after","display:none;");
add(".london-feature-copy","position:static;inset:auto;padding:14px 0;color:#171717;background:transparent;text-shadow:none;border-bottom:1px solid #a8bcb6;");
add(".london-feature-copy strong","display:block;color:#315e5b;font:400 24px/1.2 Georgia,'Times New Roman',serif;");
add(".london-feature-copy em","display:block;margin-top:6px;color:#625c54;font:400 14px/1.45 Arial,Helvetica,sans-serif;");
add(".london-note","padding:0;max-width:none;margin:0;background:transparent;");
add(".london-note .scribble","font:italic 21px/1.45 Georgia,'Times New Roman',serif;color:#315e5b;margin:16px 0;");
add(".friends","display:grid;grid-template-columns:1.25fr .75fr;gap:24px;align-items:center;padding:28px 24px;min-height:0;background:#f0e6e8;color:#171717;");
add(".friends-bg","position:relative;inset:auto;grid-column:2;grid-row:1;width:100%;height:auto;max-width:280px;margin:auto;");
add(".friends-shade","display:none;");
add(".friends-overlay","position:static;grid-column:1;grid-row:1;display:block;width:100%;max-width:none;min-height:0;padding:0;color:#171717;");
add(".friends-overlay .kicker","color:#8b4a65;");
add(".friends-overlay h2","color:#171717;");
add(".friends-overlay p","max-width:none;color:#171717;");
add(".everyone-head,.ask-head","padding:24px 24px 14px;background:#eee7db;");
add(".everyone-body","max-width:720px;padding:20px 24px;margin:auto;background:#fffaf3;");
add(".everyone-big","font:italic 24px/1.3 Georgia,'Times New Roman',serif;color:#315e5b;margin:16px 0;");
add(".ask-section","background:#fffaf3;");
add(".ask-body","display:grid;grid-template-columns:1fr 1.4fr;gap:20px;min-height:0;padding:22px 24px;max-width:820px;background:transparent;");
add(".ask-mark","padding:0 16px 0 0;border-right:1px solid #d9cbb6;");
add(".ask-mark strong","font:400 24px/1.2 Georgia,'Times New Roman',serif;");
add(".ask-copy","padding:0;");
add(".ask-marker","display:none;");
add(".ask-miso-bubble","position:static;width:70px;height:70px;padding:0;border:0;box-shadow:none;margin-top:10px;");
add(".ask-label","position:static;transform:none;font:italic 18px/1.3 Georgia,'Times New Roman',serif;color:#8b4a65;");
add(".final","display:grid;grid-template-columns:1fr 1fr;background:#080808;color:#fff;");
add(".final-photo","width:100%;height:auto;min-height:0;align-self:start;");
add(".final-photo img","width:100%;height:auto;object-fit:contain;");
add(".final-copy","max-width:none;margin:0;padding:26px;background:#080808;color:#fff;");
add(".final-copy p","color:#fff;");
add(".final-blue","font:italic 23px/1.3 Georgia,'Times New Roman',serif;color:#b7d4d0;margin:12px 0 18px;");
add(".signature","font:italic 24px/1.3 Georgia,'Times New Roman',serif;margin-top:18px;padding-top:14px;");
add(".issue-footer","padding:24px 20px;");
css+="@media(max-width:720px){";
add(".cover,.intro,.profile-layout,.story,.sea,.london,.friends,.final,.ask-body","grid-template-columns:minmax(0,1fr);");
add(".cover-photo","max-height:430px;aspect-ratio:4/5;");
add(".cover-copy","padding:24px;");
add(".intro","padding:26px 22px;gap:18px;");
add(".intro-photo","width:58%;max-width:215px;margin:0 0 0 auto;");
add(".profile","padding:26px 22px;");
add(".profile-photo","width:60%;max-width:235px;margin:0 auto;");
add(".profile-layout","gap:18px;");
add(".profile-card","padding:18px;");
add(".story-title,.diary,.pd-diary-photo,.pull,.london-head","grid-column:1;grid-row:auto;");
add(".pd-diary-photo","width:64%;max-width:260px;justify-self:end;margin:16px 0 0;");
add(".sea-photo","aspect-ratio:4/3;");
add(".sea-copy","padding:22px;");
add(".london","padding:26px 22px;");
add(".london-note","margin-top:18px;");
add(".friends-bg","grid-column:1;grid-row:1;width:66%;max-width:260px;justify-self:end;margin:0 0 0 auto;");
add(".friends-overlay","grid-column:1;grid-row:2;");
add(".ask-mark","padding:0 0 16px;border-right:0;border-bottom:1px solid #d9cbb6;");
add(".final-photo","width:100%;");
add(".final-copy","padding:24px;");
css+="}";
css+="@media(prefers-reduced-motion:reduce){"+rule(".moment","transition:none;")+"}";
const style=document.createElement("style");style.textContent=css;panel.appendChild(style);
function photo(selector,src){
const img=root.querySelector(selector);
if(img){img.src=src;img.removeAttribute("srcset");img.decoding="async"}
}
photo(".profile-photo img","/miso-18.jpg");
photo(".moment-travel img","/miso-07.jpg");
photo(".moment-toys img","/miso-19.jpg");
photo(".moment-fashion img","/miso-10.jpg");
photo(".moment-london img","/miso-02.jpg");
photo(".london-feature img","/miso-02.jpg");
photo(".final-photo img","/miso-16.jpg");
photo(".ask-miso-bubble img","/miso-17.jpg");
const diary=root.querySelector(".diary");
if(diary&&!root.querySelector(".pd-diary-photo")){
const figure=document.createElement("figure");figure.className="pd-diary-photo";
const img=document.createElement("img");img.src="/miso-14.jpg";img.alt="Miso";img.loading="lazy";img.decoding="async";figure.appendChild(img);diary.after(figure);
}
root.querySelectorAll("img").forEach(function(img){
const src=img.getAttribute("src")||"";
const type=/(?:^|\/)miso-06\.jpg(?:\?|$)/.test(src)?"drink":/(?:^|\/)miso-with-friend\.jpg(?:\?|$)/.test(src)?"friend":"";
if(!type)return;
const box=document.createElement("div");box.className="pd-cut-"+type;img.before(box);box.appendChild(img);
});
   /* Miso: photo story and extended carousel */
add(".cover","grid-template-columns:minmax(0,1fr);");
add(".cover-photo","aspect-ratio:4/5;max-height:680px;");
add(".cover-copy","padding:26px 24px;");
add(".intro","grid-template-columns:minmax(0,1fr);padding:26px 24px;gap:20px;");
add(".intro-copy p","max-width:58ch;");
add(".intro-photo","width:100%;max-width:540px;margin:0 auto;");
add(".pd-cafe-clean","display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover;filter:none;");
add(".story","grid-template-columns:minmax(0,1fr);");
add(".story-title,.diary,.pull","grid-column:1;grid-row:auto;");
add(".diary","max-width:720px;margin:0 auto;");
add(".diary p","font-size:17px;line-height:1.5;");
add(".pd-diary-photo","display:none;");
add(".pd-story-photo","width:100%;margin:22px 0;overflow:hidden;");
add(".pd-story-photo img","display:block;width:100%;height:auto;");
add(".pd-story-photo.pd-small","width:65%;max-width:340px;margin-inline-start:auto;");
add(".pd-photo-pair","display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:22px 0;");
add(".pd-photo-pair figure","margin:0;overflow:hidden;");
add(".pd-photo-pair img","display:block;width:100%;height:100%;aspect-ratio:3/4;object-fit:cover;");
add(".sea","position:relative;display:block;");
add(".sea-photo","aspect-ratio:4/3;width:100%;");
add(".sea-copy","display:contents;");
add(".sea-copy .kicker","position:absolute;inset:18px 18px auto auto;max-width:42%;font-size:9px;color:#fff;text-shadow:0 1px 4px #000;");
add(".sea-copy h2","position:absolute;inset:42px 18px auto auto;width:40%;font-size:32px;color:#fff;text-shadow:0 2px 5px #0008;");
add(".sea-copy p","padding:20px 24px;margin:0;color:#b7d4d0;");
add(".pd-media>img","object-fit:cover;");
add(".moment-travel .pd-media>img","object-position:62% center;");
add(".moment-london .pd-media>img","object-fit:contain;");
add(".moment figcaption","min-height:80px;");
add(".carousel-controls","flex-wrap:wrap;");
add(".carousel-dot","width:6px;height:6px;");
add(".carousel-dot.active","width:22px;");
add(".london-note .pd-story-photo","width:70%;max-width:300px;margin-inline-start:auto;");
add(".everyone-body .pd-photo-pair","margin-top:22px;");
css+="@media(max-width:720px){";
add(".cover-photo","max-height:560px;aspect-ratio:4/5;");
add(".intro-photo","width:100%;max-width:540px;margin:0;");
add(".intro,.story","padding:24px 20px;");
add(".sea-copy h2","font-size:28px;");
add(".pd-photo-pair","gap:8px;");
css+="}";
add(".friends-overlay","display:none;");
add(".friends","display:block;");
add(".friends-bg","width:100%;max-width:400px;margin:0 auto;");
style.textContent=css;

function editorialImage(src,fallback){
  const image=document.createElement("img");
  image.src=src;
  image.alt="Miso";
  image.loading="lazy";
  image.decoding="async";
  if(fallback){
    image.addEventListener("error",function(){
      image.src=fallback;
    },{once:true});
  }
  return image;
}
function storyPhoto(src,small,fallback){
  const figure=document.createElement("figure");
  figure.className="pd-story-photo"+(small?" pd-small":"");
  figure.appendChild(editorialImage(src,fallback));
  return figure;
}
function photoPair(sources){
  const pair=document.createElement("div");
  pair.className="pd-photo-pair";
  sources.forEach(function(src){
    const figure=document.createElement("figure");
    figure.appendChild(editorialImage(src));
    pair.appendChild(figure);
  });
  return pair;
}

const cafe=root.querySelector(".intro-photo");
if(cafe){
  const original=cafe.querySelector("img");
  if(original){
    const box=original.closest(".pd-cut-drink")||original;
    const replacement=editorialImage("/miso-cafe-editorial.png");
    replacement.alt=original.alt;
    replacement.className="pd-cafe-clean";
    replacement.addEventListener("error",function(){
      replacement.replaceWith(box);
    },{once:true});
    box.replaceWith(replacement);
  }
}

const walking=root.querySelector(".moment-travel img");
if(walking){
  walking.src="/miso-walk-editorial.png";
  walking.addEventListener("error",function(){
    walking.src="/miso-07.jpg";
  },{once:true});
}

if(diary){
  const note=diary.querySelector(".diary-note");
  if(note){
    note.after(storyPhoto("/miso-11.jpg",false));
  }
  const paragraphs=Array.from(diary.children).filter(function(element){
    return element.tagName==="P";
  });
  if(paragraphs.length>3){
    paragraphs[3].after(
      storyPhoto("/miso-fashion-editorial.png",true,"/miso-08.jpg")
    );
  }
  diary.appendChild(photoPair(["/miso-13.jpg","/miso-15.jpg"]));
}

const londonText=root.querySelector(".london-note");
if(londonText){
  londonText.appendChild(storyPhoto("/miso-12.jpg",true));
}
const everyone=root.querySelector(".everyone-body");
if(everyone){
  everyone.appendChild(photoPair(["/miso-09.jpg","/miso-14.jpg"]));
}

const extraTrack=root.querySelector("#misoTrack");
if(extraTrack){
  [
    [".moment-fashion","/miso-fashion-editorial.png","/miso-08.jpg"],
    [".moment-travel","/miso-11.jpg",null],
    [".moment-toys","/miso-13.jpg",null]
  ].forEach(function(entry){
    const template=extraTrack.querySelector(entry[0]);
    if(!template)return;
    const slide=template.cloneNode(true);
    slide.className="moment pd-extra";
    slide.removeAttribute("id");
    const old=slide.querySelector("img");
    if(old){
      const image=editorialImage(entry[1],entry[2]);
      image.alt=old.alt;
      old.replaceWith(image);
    }
    extraTrack.appendChild(slide);
  });
} 
    /* Connect uploaded Miso photographs */
const misoPhotoMap={
  "/miso-11.jpg":"/miso-florist-editorial.png",
  "/miso-12.jpg":"/miso-blue-smile.png",
  "/miso-13.jpg":"/miso-blue-back.png",
  "/miso-fashion-editorial.png":"/miso-pink-portrait.png"
};

root.querySelectorAll("img").forEach(function(image){
  const source=image.getAttribute("src");
  if(misoPhotoMap[source]){
    image.src=misoPhotoMap[source];
  }
});

photo(".moment-travel img","/miso-beach-portrait.png");
photo(".moment-fashion img","/miso-blue-smile.png");

if(diary){
  const paragraphs=Array.from(diary.children).filter(function(element){
    return element.tagName==="P";
  });

  if(paragraphs[1]){
    paragraphs[1].after(
      storyPhoto("/miso-pink-travel.png",false)
    );
  }

  diary.appendChild(
    storyPhoto("/miso-garden-closeup.png",false)
  );
}

if(extraTrack){
  [
    [".moment-travel","/miso-pink-travel.png"],
    [".moment-travel","/miso-garden-closeup.png"],
    [".moment-fashion","/miso-blue-back.png"]
  ].forEach(function(entry){
    const template=extraTrack.querySelector(entry[0]);
    if(!template)return;

    const slide=template.cloneNode(true);
    slide.className="moment pd-extra";
    slide.removeAttribute("id");

    const image=slide.querySelector("img");
    if(image){
      image.replaceWith(editorialImage(entry[1]));
    }

    extraTrack.appendChild(slide);
  });
}
    /* Miso: staggered photos with text between */
const everyonePair=root.querySelector(
  ".everyone-body .pd-photo-pair"
);
const everyoneCopy=root.querySelector(".everyone-copy");

if(everyonePair&&everyoneCopy){
  const figures=Array.from(everyonePair.children);
  const start=everyoneCopy.querySelector(
    '[data-i18n="everyone5"]'
  );

  if(figures.length===2&&start){
    figures[0].classList.add("pd-miso-photo-left");
    figures[1].classList.add("pd-miso-photo-right");

    start.before(figures[0]);
    everyoneCopy.appendChild(figures[1]);
    everyonePair.remove();
  }
}

add(".everyone-copy .pd-miso-photo-left",
  "display:block;"+
  "width:74%;"+
  "max-width:420px;"+
  "margin:24px auto 24px 0;"+
  "overflow:hidden;"
);

add(".everyone-copy .pd-miso-photo-right",
  "display:block;"+
  "width:67%;"+
  "max-width:400px;"+
  "margin:24px 0 4px auto;"+
  "overflow:hidden;"
);

add(
  ".everyone-copy .pd-miso-photo-left img,"+
  ".everyone-copy .pd-miso-photo-right img",
  "display:block;"+
  "width:100%;"+
  "height:auto;"+
  "object-fit:contain;"
);

style.textContent=css;
    /* Miso: large portrait with caption */
const pinkPortrait=root.querySelector(
  '.diary img[src="/miso-pink-portrait.png"]'
);

if(pinkPortrait){
  const figure=pinkPortrait.closest("figure");
  const caption=figure&&figure.previousElementSibling;

  if(figure&&caption&&caption.tagName==="P"){
    figure.classList.remove("pd-small");
    figure.classList.add("pd-miso-pink-feature");
    caption.classList.add("pd-miso-photo-caption");
    figure.appendChild(caption);
  }
}

add(".pd-miso-pink-feature",
  "position:relative;"+
  "width:calc(100% + 40px);"+
  "max-width:none;"+
  "margin:28px -20px;"+
  "isolation:isolate;"+
  "height:min(78svh,760px);"+
  "min-height:480px;"+
  "overflow:hidden;"+
  "background:#e9d8d8;"
);

add(".pd-miso-pink-feature img",
  "position:absolute;"+
  "inset:0;"+
  "width:100%;"+
  "height:100%;"+
  "object-fit:cover;"+
  "object-position:18% 40%;"+
  "transform:scale(1.28);"+
  "transform-origin:28% 40%;"
);

add(".pd-miso-pink-feature::after",
  "content:'';"+
  "position:absolute;"+
  "inset:45% 0 0;"+
  "background:linear-gradient(transparent,rgba(30,15,20,.78));"+
  "z-index:1;"+
  "pointer-events:none;"
);

add(".diary .pd-miso-photo-caption",
  "position:absolute;"+
  "inset:auto 24px 28px;"+
  "margin:0;"+
  "padding:0;"+
  "max-width:520px;"+
  "color:#fff;"+
  "font-family:Georgia,'Times New Roman',serif;"+
  "font-style:italic;"+
  "font-weight:400;"+
  "font-size:clamp(25px,5.8vw,38px);"+
  "line-height:1.16;"+
  "letter-spacing:-.025em;"+
  "text-wrap:balance;"+
  "text-shadow:0 2px 8px #0005;"+
  "z-index:2;"
);

style.textContent=css;
const track=root.querySelector("#misoTrack"),prev=root.querySelector("#misoPrev"),next=root.querySelector("#misoNext"),dots=root.querySelector("#misoDots");
if(!track||!prev||!next||!dots)return;
const cards=Array.from(track.querySelectorAll(".moment"));let active=0,frame=0;
cards.forEach(function(card){
const photo=card.querySelector(".pd-cut-friend")||card.querySelector("img");
if(!photo)return;
const media=document.createElement("div");media.className="pd-media";photo.before(media);media.appendChild(photo);
});
dots.replaceChildren();
const buttons=cards.map(function(card,index){
const dot=document.createElement("button");dot.type="button";dot.className="carousel-dot";dot.setAttribute("aria-label","Miso · "+(index+1));dot.addEventListener("click",function(){show(index)});dots.appendChild(dot);return dot;
});
function update(){
const bounds=track.getBoundingClientRect(),center=bounds.left+bounds.width/2;let distance=Infinity;
cards.forEach(function(card,index){const r=card.getBoundingClientRect(),d=Math.abs(r.left+r.width/2-center);if(d<distance){distance=d;active=index}});
cards.forEach(function(card,index){card.classList.toggle("pd-active",index===active)});
buttons.forEach(function(dot,index){dot.classList.toggle("active",index===active);dot.setAttribute("aria-current",index===active?"true":"false")});
}
function show(index){
if(!cards.length)return;
active=Math.max(0,Math.min(index,cards.length-1));
const c=cards[active].getBoundingClientRect(),t=track.getBoundingClientRect();
track.scrollBy({left:c.left+c.width/2-t.left-t.width/2,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"});
}
function size(){track.style.setProperty("--pd-card",Math.min(300,track.clientWidth*.68)+"px");update()}
prev.addEventListener("click",function(){show(active-1)});
next.addEventListener("click",function(){show(active+1)});
track.addEventListener("scroll",function(){if(frame)return;frame=requestAnimationFrame(function(){frame=0;update()})},{passive:true});
size();
if(window.ResizeObserver){const observer=new ResizeObserver(function(){if(!track.isConnected){observer.disconnect();return}size()});observer.observe(track)}
}
  function createIntro(story) {
    const text = words();
    const name = STORY_NAMES[story] || "";
    const intro = document.createElement("div");
    intro.className = "pd-inline-story-intro";

    intro.innerHTML = `
<div class="pd-inline-story-intro-copy">
  <div class="pd-inline-story-eyebrow">
    ${escapeHtml(text.story)}
  </div>
  <h2 class="pd-inline-story-name notranslate" translate="no">
    ${escapeHtml(name)}
  </h2>
  <p class="pd-inline-story-continue">
    ${escapeHtml(text.continue)}
  </p>
</div>
<div class="pd-inline-story-mark" aria-hidden="true">✦</div>
`;
    return intro;
  }

  function createFinish() {
    const text = words();
    const finish = document.createElement("div");
    finish.className = "pd-inline-story-finish";

    const label = document.createElement("div");
    label.className = "pd-inline-story-finish-label";
    label.textContent = text.end;

    const close = document.createElement("button");
    close.type = "button";
    close.className = "pd-inline-story-bottom-close";
    close.textContent = text.close;

    close.addEventListener("click", function () {
      closeCurrent({ scrollToButton: true });
    });

    finish.appendChild(label);
    finish.appendChild(close);
    return finish;
  }

  async function fetchStory(story, panel) {
    const url = STORY_ROUTES[story];
    if (!url) {
      throw new Error("Unknown Issue 01 story.");
    }

    requestController = new AbortController();

    const response = await fetch(url, {
      credentials: "same-origin",
      cache: "no-cache",
      signal: requestController.signal
    });

    if (!response.ok) {
      throw new Error("Story request failed: " + response.status);
    }

    const html = await response.text();
    if (currentPanel !== panel) return;

    const parser = new DOMParser();
    const articleDocument = parser.parseFromString(
      html,
      "text/html"
    );

    const base = articleDocument.createElement("base");
    base.href = new URL(url, window.location.href).href;
    articleDocument.head.prepend(base);

    const root = chooseArticleRoot(articleDocument, story);
    if (!root) {
      throw new Error("Story content not found.");
    }

    const content = document.createElement("div");
    content.className = "pd-inline-story-content";
    content.dataset.pdStoryContent = STORY_GROUP[story] || story;

    const article = document.importNode(root, true);
    article.setAttribute("data-pd-no-translate", "");
    content.appendChild(article);

    removeStandaloneElements(content);
    fixRelativeUrls(content, base.href);

    panel.innerHTML = "";
    importStoryStyles(articleDocument, story, panel);
    panel.appendChild(createIntro(story));
    panel.appendChild(content);
    panel.appendChild(createFinish());

    if (story === "miso") bindMisoCarousel(panel);

    await executeArticleScripts(articleDocument, story);
    requestController = null;

    window.requestAnimationFrame(function () {
      window.dispatchEvent(
        new CustomEvent("petsdogue:languagechange", {
          detail: {
            language: language(),
            source: "issue-01-story-ready"
          }
        })
      );
    });
  }

  async function openStory(button) {
    const story = button.dataset.pdStory;
    if (!STORY_ROUTES[story]) return;

    if (currentButton) closeCurrent();

    const panel = createPanel(button, story);
    currentButton = button;
    currentPanel = panel;
    currentStory = STORY_GROUP[story] || story;

    button.setAttribute("aria-expanded", "true");
    setCloseLabel(button);

    panel.hidden = false;
    panel.innerHTML = loadingMarkup(story);

    window.requestAnimationFrame(function () {
      panel.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });
    });

    try {
      await fetchStory(story, panel);
    } catch (error) {
      if (error && error.name === "AbortError") return;

      if (currentPanel === panel) {
        panel.innerHTML = errorMarkup(story);
      }

      console.warn(
        "PETS & DOGUE: inline Issue 01 story could not be loaded.",
        error
      );
    }
  }

  function toggleStory(button) {
    const story = button.dataset.pdStory;
    const group = STORY_GROUP[story] || story;

    if (
      currentButton === button &&
      currentPanel &&
      !currentPanel.hidden
    ) {
      closeCurrent({ scrollToButton: true });
      return;
    }

    if (currentStory === group && currentButton !== button) {
      closeCurrent();
    }

    openStory(button);
  }

  function refreshLanguage() {
    const text = words();

    document.querySelectorAll(
      ".pd-inline-story-button"
    ).forEach(function (button) {
      if (button.getAttribute("aria-expanded") === "true") {
        button.textContent = text.close;
      } else {
        restoreButtonLabel(button);
      }
    });

    document.querySelectorAll(
      ".pd-inline-story-eyebrow"
    ).forEach(function (element) {
      element.textContent = text.story;
    });

    document.querySelectorAll(
      ".pd-inline-story-continue"
    ).forEach(function (element) {
      element.textContent = text.continue;
    });

    document.querySelectorAll(
      ".pd-inline-story-finish-label"
    ).forEach(function (element) {
      element.textContent = text.end;
    });

    document.querySelectorAll(
      ".pd-inline-story-bottom-close"
    ).forEach(function (button) {
      button.textContent = text.close;
    });

    document.querySelectorAll(
      ".pd-inline-story-loading"
    ).forEach(function (element) {
      element.textContent = text.loading;
    });
  }

  function watchIssue() {
    const observer = new MutationObserver(function () {
      prepareButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function init() {
    const file = pathOnly(window.location.pathname);
    if (file && file !== "issue-01.html") return;

    installStyles();
    prepareButtons();
    watchIssue();

    window.addEventListener(
      "petsdogue:languagechange",
      function () {
        window.requestAnimationFrame(refreshLanguage);
      }
    );

    window.addEventListener("pageshow", function () {
      prepareButtons();
      refreshLanguage();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && currentPanel) {
        closeCurrent({ scrollToButton: true });
      }
    });

    window.PetsDogueIssue01Expanded = {
      close: function () {
        closeCurrent({ scrollToButton: true });
      },
      refresh: prepareButtons
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }
})();
