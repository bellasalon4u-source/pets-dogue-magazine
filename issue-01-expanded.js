"use strict";

/* =========================================================
   PETS & DOGUE — ISSUE 01 LUXURY STORY REVEAL
   ---------------------------------------------------------
   FINAL INLINE READING EXPERIENCE

   - Miso opens ONLY Miso
   - Pablo opens ONLY Pablo
   - Jessica opens ONLY Jessica
   - Richie & Pi share their approved story
   - Full article opens directly beneath the selected pet
   - Only one article is open at a time
   - 23-language global PETS & DOGUE language is preserved
   - Arabic RTL is preserved
   - Global header / Contents / Ask Miso are NOT rebuilt
   - Imported article styles are isolated so stories cannot
     visually contaminate one another
   ========================================================= */

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

    return LABELS[normalized]
      ? normalized
      : "en";
  }

  function language() {

    let saved = "";

    try {
      saved = localStorage.getItem(LANGUAGE_KEY) || "";
    } catch (error) {}

    return normalizeLanguage(
      saved ||
      document.documentElement.lang ||
      "en"
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

      return new URL(
        value,
        window.location.href
      )
        .pathname
        .split("/")
        .filter(Boolean)
        .pop()
        ?.toLowerCase() || "";

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

    if (file === "issue-01-miso.html") {
      return "miso";
    }

    if (file === "issue-01-pablo.html") {
      return "pablo";
    }

    if (file === "issue-01-jessica.html") {
      return "jessica";
    }

    if (file === "issue-01-richie-pi.html") {
      return "richie";
    }

    return "";
  }

  function storyFromElement(element) {

    if (!element) {
      return "";
    }

    const explicit = String(
      element.dataset?.pdStory || ""
    )
      .trim()
      .toLowerCase();

    if (STORY_ROUTES[explicit]) {
      return explicit;
    }

    const href =
      element.getAttribute?.("href") || "";

    const fromHref =
      storyFromHref(href);

    if (fromHref) {
      return fromHref;
    }

    return "";
  }

  function installStyles() {

    if (
      document.getElementById(
        "pdIssue01ExpandedStyles"
      )
    ) {
      return;
    }

    const style =
      document.createElement("style");

    style.id =
      "pdIssue01ExpandedStyles";

    style.textContent = `

/* =====================================================
   PETS & DOGUE — LUXURY STORY REVEAL
===================================================== */

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
  transition:
    transform .22s ease,
    background .22s ease;
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

/* =====================================================
   REVEAL WRAPPER
===================================================== */

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

/* =====================================================
   LUXURY INTRO STRIP
===================================================== */

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
  background:
    linear-gradient(
      90deg,
      #d4a334,
      #fff2a5,
      #d4a334
    );
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

/* =====================================================
   LOADING / ERROR
===================================================== */

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
  to{
    transform:rotate(360deg);
  }
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

/* =====================================================
   ARTICLE CONTENT
===================================================== */

.pd-inline-story-content{
  position:relative;
  width:100%;
  overflow:hidden;
  background:#fffaf0;
  color:#111;

  /*
   * Isolation is essential.
   * Each imported cover story becomes its own visual
   * world and cannot paint outside this container.
   */
  isolation:isolate;
  contain:layout paint;
}

.pd-inline-story-content > *{
  max-width:1180px;
  margin-left:auto;
  margin-right:auto;
}

/*
Standalone global interface is never duplicated inside
the Issue 01 reveal.
*/

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

/* =====================================================
   END OF STORY
===================================================== */

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

/* =====================================================
   RTL
===================================================== */

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

/* =====================================================
   MOBILE
===================================================== */

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
    )
      .filter(function (element) {

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

        return Boolean(
          storyFromElement(element)
        );
      });
  }

  function closestStorySection(element) {

    if (!element) {
      return null;
    }

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

      const section =
        element.closest(selector);

      if (section) {
        return section;
      }
    }

    return element.parentElement;
  }

  function createPanel(button, story) {

    const panel =
      document.createElement("section");

    const group =
      STORY_GROUP[story] || story;

    panel.className =
      "pd-inline-story-panel";

    panel.hidden = true;

    panel.dataset.pdInlineStory =
      group;

    panel.setAttribute(
      "aria-live",
      "polite"
    );

    const panelId =
      "pdInlineStory-" +
      group +
      "-" +
      Math.random()
        .toString(36)
        .slice(2, 8);

    panel.id = panelId;

    button.setAttribute(
      "aria-controls",
      panelId
    );

    const section =
      closestStorySection(button);

    if (
      section &&
      section.parentNode
    ) {

      section.insertAdjacentElement(
        "afterend",
        panel
      );

    } else {

      button.insertAdjacentElement(
        "afterend",
        panel
      );
    }

    return panel;
  }

  function convertLink(link) {

    if (
      !link ||
      link.dataset.pdInlineReady === "1"
    ) {
      return;
    }

    const story =
      storyFromElement(link);

    if (!story) {
      return;
    }

    const originalHref =
      link.getAttribute("href") ||
      STORY_ROUTES[story];

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      (
        String(link.className || "") +
        " pd-inline-story-button"
      ).trim();

    button.dataset.pdStory =
      story;

    button.dataset.pdOriginalHref =
      originalHref;

    button.dataset.pdInlineReady =
      "1";

    button.dataset.pdOriginalLabel =
      String(
        link.textContent ||
        words().open
      ).trim();

    button.innerHTML =
      link.innerHTML ||
      button.dataset.pdOriginalLabel;

    button.setAttribute(
      "aria-expanded",
      "false"
    );

    link.replaceWith(button);

    button.addEventListener(
      "click",
      function () {
        toggleStory(button);
      }
    );
  }

  function prepareButtons() {

    candidateLinks()
      .forEach(convertLink);
  }

  function translatedOriginalLabel(story) {

    const api =
      window.PetsDogueIssue01;

    const lang =
      language();

    const key =
      story === "miso"
        ? "miso.more"
        : story === "pablo"
          ? "pablo.more"
          : story === "jessica"
            ? "jessica.more"
            : story === "pi"
              ? "pi.more"
              : "richie.more";

    try {

      const table =
        api &&
        api.translations &&
        (
          api.translations[lang] ||
          api.translations.en
        );

      if (
        table &&
        typeof table[key] === "string"
      ) {
        return table[key];
      }

    } catch (error) {}

    return "";
  }

  function restoreButtonLabel(button) {

    if (!button) {
      return;
    }

    const story =
      button.dataset.pdStory;

    const translated =
      translatedOriginalLabel(story);

    const original =
      button.dataset.pdOriginalLabel;

    button.textContent =
      translated ||
      original ||
      words().open;
  }

  function setCloseLabel(button) {

    if (!button) {
      return;
    }

    button.textContent =
      words().close;
  }

  function closeCurrent(options) {

    const settings =
      options || {};

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

    const oldButton =
      currentButton;

    if (oldButton) {

      oldButton.setAttribute(
        "aria-expanded",
        "false"
      );

      oldButton.removeAttribute(
        "aria-controls"
      );

      restoreButtonLabel(
        oldButton
      );
    }

    currentPanel = null;
    currentButton = null;
    currentStory = "";

    if (
      settings.scrollToButton &&
      oldButton
    ) {

      window.requestAnimationFrame(
        function () {

          oldButton.scrollIntoView({
            behavior:
              window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? "auto"
                : "smooth",
            block: "center"
          });

        }
      );
    }
  }

  function loadingMarkup(story) {

    const text =
      words();

    const name =
      STORY_NAMES[story] ||
      "";

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

  <div
    class="pd-inline-story-mark"
    aria-hidden="true"
  >
    ✦
  </div>

</div>

<div class="pd-inline-story-loading">
  ${escapeHtml(text.loading)}
</div>

`;
  }

  function errorMarkup(story) {

    const href =
      STORY_ROUTES[story] ||
      "#";

    return `

<div class="pd-inline-story-error">

  <p>
    ${escapeHtml(words().error)}
  </p>

  <a href="${escapeHtml(href)}">
    ${escapeHtml(words().retry)}
  </a>

</div>

`;
  }

  function removeStandaloneElements(root) {

    if (!root) {
      return;
    }

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

    selectors.forEach(
      function (selector) {

        root
          .querySelectorAll(selector)
          .forEach(function (element) {
            element.remove();
          });

      }
    );
  }

  function fixRelativeUrls(root, url) {

    if (!root) {
      return;
    }

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

    attributes.forEach(
      function (pair) {

        const selector = pair[0];
        const attribute = pair[1];

        root
          .querySelectorAll(
            selector +
            "[" +
            attribute +
            "]"
          )
          .forEach(function (element) {

            const value =
              element.getAttribute(
                attribute
              );

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

              const fixed =
                value
                  .split(",")
                  .map(function (item) {

                    const parts =
                      item
                        .trim()
                        .split(/\s+/);

                    try {

                      parts[0] =
                        new URL(
                          parts[0],
                          url
                        ).href;

                    } catch (error) {}

                    return parts.join(" ");
                  })
                  .join(", ");

              element.setAttribute(
                attribute,
                fixed
              );

              return;
            }

            try {

              element.setAttribute(
                attribute,
                new URL(
                  value,
                  url
                ).href
              );

            } catch (error) {}

          });
      }
    );
  }

  function chooseArticleRoot(documentCopy, story) {

    /*
     * IMPORTANT:
     * We choose the root belonging to the requested pet.
     * This prevents Miso from ever receiving another
     * animal's article container.
     */

    const requestedRoots = {

      miso: [
        "#misoIssue",
        "main#misoIssue"
      ],

      pablo: [
        "#pabloIssue",
        "main#pabloIssue"
      ],

      jessica: [
        "#jessicaIssue",
        "main#jessicaIssue"
      ],

      richie: [
        "#richiePiIssue",
        "main#richiePiIssue"
      ],

      pi: [
        "#richiePiIssue",
        "main#richiePiIssue"
      ]

    };

    const selectors =
      requestedRoots[story] || [];

    for (const selector of selectors) {

      const root =
        documentCopy.querySelector(
          selector
        );

      if (root) {
        return root;
      }
    }

    return (
      documentCopy.querySelector("main") ||
      documentCopy.body
    );
  }

  function scopeImportedCss(css, scopeSelector) {

    let source =
      String(css || "");

    /*
     * Remove standalone-page html/body rules first.
     */

    source = source
      .replace(
        /(^|})\s*html\s*,\s*body\s*\{/g,
        "$1 " + scopeSelector + "{"
      )
      .replace(
        /(^|})\s*body\s*\{/g,
        "$1 " + scopeSelector + "{"
      )
      .replace(
        /(^|})\s*html\s*\{/g,
        "$1 " + scopeSelector + "{"
      );

    /*
     * Prefix ordinary selectors.
     * @ rules are intentionally left intact.
     */

    source = source.replace(
      /(^|})\s*([^@}{][^{]+)\{/g,
      function (
        match,
        boundary,
        selectorText
      ) {

        const clean =
          selectorText.trim();

        if (
          !clean ||
          clean.includes(
            scopeSelector
          )
        ) {
          return match;
        }

        const scoped =
          clean
            .split(",")
            .map(function (selector) {

              const item =
                selector.trim();

              if (!item) {
                return item;
              }

              if (
                item === ":root" ||
                item === "html" ||
                item === "body"
              ) {
                return scopeSelector;
              }

              if (
                item.startsWith("html ") ||
                item.startsWith("body ")
              ) {

                return (
                  scopeSelector +
                  " " +
                  item.replace(
                    /^(html|body)\s+/,
                    ""
                  )
                );
              }

              return (
                scopeSelector +
                " " +
                item
              );
            })
            .join(",");

        return (
          boundary +
          "\n" +
          scoped +
          "{"
        );
      }
    );

    return source;
  }

  function importStoryStyles(
    articleDocument,
    story,
    panel
  ) {

    const group =
      STORY_GROUP[story] ||
      story;

    const scopeSelector =
      '.pd-inline-story-panel[data-pd-inline-story="' +
      group +
      '"]';

    articleDocument
      .querySelectorAll("style")
      .forEach(function (
        sourceStyle,
        index
      ) {

        const style =
          document.createElement(
            "style"
          );

        style.dataset.pdInlineLocalStyle =
          group;

        style.textContent =
          scopeImportedCss(
            sourceStyle.textContent || "",
            scopeSelector
          );

        panel.prepend(style);
      });
  }

  function executeArticleScripts(
    documentCopy,
    story
  ) {

    const scripts =
      Array.from(
        documentCopy.querySelectorAll(
          "script[src]"
        )
      );

    scripts.forEach(
      function (source) {

        const src =
          source.getAttribute("src") ||
          "";

        if (
          !src ||
          src.includes(
            "pets-dogue-shell.js"
          ) ||
          src.includes(
            "pets-dogue-help.js"
          ) ||
          src.includes(
            "issue-01-expanded.js"
          )
        ) {
          return;
        }

        let absolute = "";

        try {

          absolute =
            new URL(
              src,
              documentCopy.baseURI ||
              window.location.href
            ).href;

        } catch (error) {
          return;
        }

        const already =
          Array.from(
            document.scripts
          )
          .some(function (existing) {
            return existing.src === absolute;
          });

        if (already) {
          return;
        }

        const script =
          document.createElement(
            "script"
          );

        script.src =
          absolute;

        script.defer =
          true;

        script.dataset.pdInlineArticle =
          story;

        document.head.appendChild(
          script
        );
      }
    );

    window.requestAnimationFrame(
      function () {

        window.dispatchEvent(
          new CustomEvent(
            "petsdogue:languagechange",
            {
              detail: {
                language: language(),
                source:
                  "issue-01-inline-story"
              }
            }
          )
        );

      }
    );
  }

  function createIntro(story) {

    const text =
      words();

    const name =
      STORY_NAMES[story] ||
      "";

    const intro =
      document.createElement("div");

    intro.className =
      "pd-inline-story-intro";

    intro.innerHTML = `

<div class="pd-inline-story-intro-copy">

  <div class="pd-inline-story-eyebrow">
    ${escapeHtml(text.story)}
  </div>

  <h2
    class="pd-inline-story-name notranslate"
    translate="no"
  >
    ${escapeHtml(name)}
  </h2>

  <p class="pd-inline-story-continue">
    ${escapeHtml(text.continue)}
  </p>

</div>

<div
  class="pd-inline-story-mark"
  aria-hidden="true"
>
  ✦
</div>

`;

    return intro;
  }

  function createFinish() {

    const text =
      words();

    const finish =
      document.createElement("div");

    finish.className =
      "pd-inline-story-finish";

    const label =
      document.createElement("div");

    label.className =
      "pd-inline-story-finish-label";

    label.textContent =
      text.end;

    const close =
      document.createElement("button");

    close.type =
      "button";

    close.className =
      "pd-inline-story-bottom-close";

    close.textContent =
      text.close;

    close.addEventListener(
      "click",
      function () {

        closeCurrent({
          scrollToButton: true
        });

      }
    );

    finish.appendChild(label);
    finish.appendChild(close);

    return finish;
  }

  async function fetchStory(
    story,
    panel
  ) {

    const url =
      STORY_ROUTES[story];

    if (!url) {
      throw new Error(
        "Unknown Issue 01 story."
      );
    }

    requestController =
      new AbortController();

    const response =
      await fetch(
        url,
        {
          credentials: "same-origin",
          cache: "no-cache",
          signal:
            requestController.signal
        }
      );

    if (!response.ok) {

      throw new Error(
        "Story request failed: " +
        response.status
      );
    }

    const html =
      await response.text();

    const parser =
      new DOMParser();

    const articleDocument =
      parser.parseFromString(
        html,
        "text/html"
      );

    const base =
      articleDocument.createElement(
        "base"
      );

    base.href =
      new URL(
        url,
        window.location.href
      ).href;

    articleDocument.head.prepend(
      base
    );

    const root =
      chooseArticleRoot(
        articleDocument,
        story
      );

    if (!root) {

      throw new Error(
        "Story content not found."
      );
    }

    const content =
      document.createElement("div");

    content.className =
      "pd-inline-story-content";

    content.dataset.pdStoryContent =
      STORY_GROUP[story] || story;

    Array.from(
      root.childNodes
    )
      .forEach(function (node) {

        content.appendChild(
          document.importNode(
            node,
            true
          )
        );

      });

    removeStandaloneElements(
      content
    );

    fixRelativeUrls(
      content,
      base.href
    );

    panel.innerHTML = "";

    importStoryStyles(
      articleDocument,
      story,
      panel
    );

    panel.appendChild(
      createIntro(story)
    );

    panel.appendChild(
      content
    );

    panel.appendChild(
      createFinish()
    );

    executeArticleScripts(
      articleDocument,
      story
    );

    requestController = null;

    window.requestAnimationFrame(
      function () {

        window.dispatchEvent(
          new CustomEvent(
            "petsdogue:languagechange",
            {
              detail: {
                language: language(),
                source:
                  "issue-01-story-ready"
              }
            }
          )
        );

      }
    );
  }

  async function openStory(button) {

    const story =
      button.dataset.pdStory;

    if (!STORY_ROUTES[story]) {
      return;
    }

    if (currentButton) {
      closeCurrent();
    }

    const panel =
      createPanel(
        button,
        story
      );

    currentButton =
      button;

    currentPanel =
      panel;

    currentStory =
      STORY_GROUP[story] ||
      story;

    button.setAttribute(
      "aria-expanded",
      "true"
    );

    setCloseLabel(
      button
    );

    panel.hidden = false;

    panel.innerHTML =
      loadingMarkup(story);

    window.requestAnimationFrame(
      function () {

        panel.scrollIntoView({
          behavior:
            window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches
              ? "auto"
              : "smooth",
          block: "start"
        });

      }
    );

    try {

      await fetchStory(
        story,
        panel
      );

    } catch (error) {

      if (
        error &&
        error.name === "AbortError"
      ) {
        return;
      }

      if (
        currentPanel === panel
      ) {

        panel.innerHTML =
          errorMarkup(story);
      }

      console.warn(
        "PETS & DOGUE: inline Issue 01 story could not be loaded.",
        error
      );
    }
  }

  function toggleStory(button) {

    const story =
      button.dataset.pdStory;

    const group =
      STORY_GROUP[story] ||
      story;

    if (
      currentButton === button &&
      currentPanel &&
      !currentPanel.hidden
    ) {

      closeCurrent({
        scrollToButton: true
      });

      return;
    }

    if (
      currentStory === group &&
      currentButton !== button
    ) {
      closeCurrent();
    }

    openStory(button);
  }

  function refreshLanguage() {

    const text =
      words();

    document
      .querySelectorAll(
        ".pd-inline-story-button"
      )
      .forEach(function (button) {

        if (
          button.getAttribute(
            "aria-expanded"
          ) === "true"
        ) {

          button.textContent =
            text.close;

        } else {

          restoreButtonLabel(
            button
          );
        }

      });

    document
      .querySelectorAll(
        ".pd-inline-story-eyebrow"
      )
      .forEach(function (element) {

        element.textContent =
          text.story;

      });

    document
      .querySelectorAll(
        ".pd-inline-story-continue"
      )
      .forEach(function (element) {

        element.textContent =
          text.continue;

      });

    document
      .querySelectorAll(
        ".pd-inline-story-finish-label"
      )
      .forEach(function (element) {

        element.textContent =
          text.end;

      });

    document
      .querySelectorAll(
        ".pd-inline-story-bottom-close"
      )
      .forEach(function (button) {

        button.textContent =
          text.close;

      });

    document
      .querySelectorAll(
        ".pd-inline-story-loading"
      )
      .forEach(function (element) {

        element.textContent =
          text.loading;

      });
  }

  function watchIssue() {

    const observer =
      new MutationObserver(
        function () {

          prepareButtons();

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

  function init() {

    const file =
      pathOnly(
        window.location.pathname
      );

    if (
      file &&
      file !== "issue-01.html"
    ) {
      return;
    }

    installStyles();
    prepareButtons();
    watchIssue();

    window.addEventListener(
      "petsdogue:languagechange",
      function () {

        window.requestAnimationFrame(
          refreshLanguage
        );

      }
    );

    window.addEventListener(
      "pageshow",
      function () {

        prepareButtons();
        refreshLanguage();

      }
    );

    document.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Escape" &&
          currentPanel
        ) {

          closeCurrent({
            scrollToButton: true
          });
        }

      }
    );

    window.PetsDogueIssue01Expanded = {

      close: function () {

        closeCurrent({
          scrollToButton: true
        });
      },

      refresh: prepareButtons

    };
  }

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();
  }

})();
