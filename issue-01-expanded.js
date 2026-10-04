"use strict";

/* =========================================================
   PETS & DOGUE — ISSUE 01 INLINE STORIES
   ---------------------------------------------------------
   PURPOSE

   Keeps Issue 01 as one reading experience.

   Existing cover-star cards remain exactly where they are.
   Their existing MORE ABOUT links are intercepted and the
   approved story is opened directly underneath the animal.

   IMPORTANT
   - Does NOT rebuild the global header.
   - Does NOT rebuild the Contents side menu.
   - Does NOT touch the global Miso help bubble.
   - Does NOT replace existing article files.
   - Uses the already approved live HTML articles.
   - Keeps the PETS & DOGUE global language as source of truth.
   - Richie and Pi share one story.
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

  const LABELS = {

    en:{
      open:"READ THE FULL STORY",
      close:"CLOSE STORY",
      loading:"Opening story…",
      error:"The story could not be opened.",
      retry:"OPEN ORIGINAL STORY"
    },

    uk:{
      open:"ЧИТАТИ ПОВНУ ІСТОРІЮ",
      close:"ЗГОРНУТИ ІСТОРІЮ",
      loading:"Відкриваємо історію…",
      error:"Не вдалося відкрити історію.",
      retry:"ВІДКРИТИ ОРИГІНАЛ"
    },

    ru:{
      open:"ЧИТАТЬ ПОЛНУЮ ИСТОРИЮ",
      close:"СВЕРНУТЬ ИСТОРИЮ",
      loading:"Открываем историю…",
      error:"Не удалось открыть историю.",
      retry:"ОТКРЫТЬ ОРИГИНАЛ"
    },

    fr:{
      open:"LIRE L’HISTOIRE COMPLÈTE",
      close:"FERMER L’HISTOIRE",
      loading:"Ouverture de l’histoire…",
      error:"Impossible d’ouvrir l’histoire.",
      retry:"OUVRIR L’ARTICLE ORIGINAL"
    },

    de:{
      open:"DIE GANZE GESCHICHTE LESEN",
      close:"GESCHICHTE SCHLIESSEN",
      loading:"Geschichte wird geöffnet…",
      error:"Die Geschichte konnte nicht geöffnet werden.",
      retry:"ORIGINALARTIKEL ÖFFNEN"
    },

    es:{
      open:"LEER LA HISTORIA COMPLETA",
      close:"CERRAR HISTORIA",
      loading:"Abriendo la historia…",
      error:"No se pudo abrir la historia.",
      retry:"ABRIR ARTÍCULO ORIGINAL"
    },

    it:{
      open:"LEGGI LA STORIA COMPLETA",
      close:"CHIUDI LA STORIA",
      loading:"Apertura della storia…",
      error:"Impossibile aprire la storia.",
      retry:"APRI L’ARTICOLO ORIGINALE"
    },

    pt:{
      open:"LER A HISTÓRIA COMPLETA",
      close:"FECHAR HISTÓRIA",
      loading:"A abrir a história…",
      error:"Não foi possível abrir a história.",
      retry:"ABRIR ARTIGO ORIGINAL"
    },

    nl:{
      open:"LEES HET VOLLEDIGE VERHAAL",
      close:"VERHAAL SLUITEN",
      loading:"Verhaal openen…",
      error:"Het verhaal kon niet worden geopend.",
      retry:"ORIGINEEL ARTIKEL OPENEN"
    },

    pl:{
      open:"PRZECZYTAJ CAŁĄ HISTORIĘ",
      close:"ZAMKNIJ HISTORIĘ",
      loading:"Otwieranie historii…",
      error:"Nie udało się otworzyć historii.",
      retry:"OTWÓRZ ORYGINALNY ARTYKUŁ"
    },

    cs:{
      open:"PŘEČÍST CELÝ PŘÍBĚH",
      close:"ZAVŘÍT PŘÍBĚH",
      loading:"Otevírání příběhu…",
      error:"Příběh se nepodařilo otevřít.",
      retry:"OTEVŘÍT PŮVODNÍ ČLÁNEK"
    },

    sk:{
      open:"PREČÍTAŤ CELÝ PRÍBEH",
      close:"ZAVRIEŤ PRÍBEH",
      loading:"Otváranie príbehu…",
      error:"Príbeh sa nepodarilo otvoriť.",
      retry:"OTVORIŤ PÔVODNÝ ČLÁNOK"
    },

    hu:{
      open:"A TELJES TÖRTÉNET",
      close:"TÖRTÉNET BEZÁRÁSA",
      loading:"A történet megnyitása…",
      error:"A történetet nem sikerült megnyitni.",
      retry:"EREDETI CIKK MEGNYITÁSA"
    },

    ro:{
      open:"CITEȘTE POVESTEA COMPLETĂ",
      close:"ÎNCHIDE POVESTEA",
      loading:"Se deschide povestea…",
      error:"Povestea nu a putut fi deschisă.",
      retry:"DESCHIDE ARTICOLUL ORIGINAL"
    },

    bg:{
      open:"ПРОЧЕТЕТЕ ЦЯЛАТА ИСТОРИЯ",
      close:"ЗАТВОРИ ИСТОРИЯТА",
      loading:"Отваряне на историята…",
      error:"Историята не можа да бъде отворена.",
      retry:"ОТВОРИ ОРИГИНАЛНАТА СТАТИЯ"
    },

    el:{
      open:"ΔΙΑΒΑΣΤΕ ΟΛΗ ΤΗΝ ΙΣΤΟΡΙΑ",
      close:"ΚΛΕΙΣΙΜΟ ΙΣΤΟΡΙΑΣ",
      loading:"Άνοιγμα ιστορίας…",
      error:"Δεν ήταν δυνατό το άνοιγμα της ιστορίας.",
      retry:"ΑΝΟΙΓΜΑ ΑΡΧΙΚΟΥ ΑΡΘΡΟΥ"
    },

    sv:{
      open:"LÄS HELA BERÄTTELSEN",
      close:"STÄNG BERÄTTELSEN",
      loading:"Öppnar berättelsen…",
      error:"Berättelsen kunde inte öppnas.",
      retry:"ÖPPNA ORIGINALARTIKELN"
    },

    da:{
      open:"LÆS HELE HISTORIEN",
      close:"LUK HISTORIEN",
      loading:"Åbner historien…",
      error:"Historien kunne ikke åbnes.",
      retry:"ÅBN DEN ORIGINALE ARTIKEL"
    },

    no:{
      open:"LES HELE HISTORIEN",
      close:"LUKK HISTORIEN",
      loading:"Åpner historien…",
      error:"Historien kunne ikke åpnes.",
      retry:"ÅPNE ORIGINALARTIKKELEN"
    },

    fi:{
      open:"LUE KOKO TARINA",
      close:"SULJE TARINA",
      loading:"Avataan tarinaa…",
      error:"Tarinaa ei voitu avata.",
      retry:"AVAA ALKUPERÄINEN ARTIKKELI"
    },

    tr:{
      open:"TÜM HİKÂYEYİ OKU",
      close:"HİKÂYEYİ KAPAT",
      loading:"Hikâye açılıyor…",
      error:"Hikâye açılamadı.",
      retry:"ORİJİNAL MAKALEYİ AÇ"
    },

    ar:{
      open:"اقرأ القصة كاملة",
      close:"إغلاق القصة",
      loading:"جارٍ فتح القصة…",
      error:"تعذر فتح القصة.",
      retry:"فتح المقال الأصلي"
    },

    hi:{
      open:"पूरी कहानी पढ़ें",
      close:"कहानी बंद करें",
      loading:"कहानी खुल रही है…",
      error:"कहानी नहीं खुल सकी।",
      retry:"मूल लेख खोलें"
    }

  };

  const LANGUAGE_ALIASES = {
    ua:"uk",
    cz:"cs",
    gr:"el",
    se:"sv",
    dk:"da"
  };

  let currentPanel = null;
  let currentButton = null;
  let currentStory = "";
  let requestController = null;

  function normalizeLanguage(value){

    const raw =
      String(value || "")
        .trim()
        .toLowerCase()
        .replace(/_/g,"-");

    const base =
      raw.split("-")[0] || "en";

    const normalized =
      LANGUAGE_ALIASES[base] || base;

    return LABELS[normalized]
      ? normalized
      : "en";
  }

  function language(){

    let saved = "";

    try{
      saved =
        localStorage.getItem(LANGUAGE_KEY) ||
        "";
    }catch(error){}

    return normalizeLanguage(
      saved ||
      document.documentElement.lang ||
      "en"
    );
  }

  function words(){

    return (
      LABELS[language()] ||
      LABELS.en
    );
  }

  function pathOnly(value){

    try{

      return new URL(
        value,
        window.location.href
      )
      .pathname
      .split("/")
      .filter(Boolean)
      .pop()
      ?.toLowerCase() || "";

    }catch(error){

      return String(value || "")
        .split("?")[0]
        .split("#")[0]
        .split("/")
        .pop()
        .toLowerCase();
    }
  }

  function storyFromHref(href){

    const file =
      pathOnly(href);

    if(file === "issue-01-miso.html"){
      return "miso";
    }

    if(file === "issue-01-pablo.html"){
      return "pablo";
    }

    if(file === "issue-01-jessica.html"){
      return "jessica";
    }

    if(file === "issue-01-richie-pi.html"){
      return "richie";
    }

    return "";
  }

  function storyFromElement(element){

    if(!element){
      return "";
    }

    const explicit =
      String(
        element.dataset?.pdStory ||
        ""
      )
      .trim()
      .toLowerCase();

    if(STORY_ROUTES[explicit]){
      return explicit;
    }

    const href =
      element.getAttribute?.("href") ||
      "";

    const fromHref =
      storyFromHref(href);

    if(fromHref){
      return fromHref;
    }

    const text =
      String(
        element.textContent ||
        ""
      )
      .trim()
      .toLowerCase();

    if(text.includes("miso")){
      return "miso";
    }

    if(text.includes("pablo")){
      return "pablo";
    }

    if(text.includes("jessica")){
      return "jessica";
    }

    if(text.includes("richie")){
      return "richie";
    }

    if(
      text === "pi" ||
      text.includes(" pi ") ||
      text.includes("about pi")
    ){
      return "pi";
    }

    return "";
  }

  function installStyles(){

    if(
      document.getElementById(
        "pdIssue01ExpandedStyles"
      )
    ){
      return;
    }

    const style =
      document.createElement("style");

    style.id =
      "pdIssue01ExpandedStyles";

    style.textContent = `

/* =====================================================
   ISSUE 01 — INLINE STORY CONTROLS
===================================================== */

.pd-inline-story-button{
  position:relative;
  width:100%;
  min-height:54px;
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
  font-size:11px;
  font-weight:900;
  line-height:1.2;
  letter-spacing:.08em;
  text-align:left;
  text-transform:uppercase;
  cursor:pointer;
  -webkit-tap-highlight-color:transparent;
}

.pd-inline-story-button::after{
  content:"↓";
  flex:0 0 auto;
  width:34px;
  height:34px;
  display:grid;
  place-items:center;
  border:1px solid #111;
  border-radius:50%;
  background:#111;
  color:#fff;
  font-size:18px;
  font-weight:400;
  line-height:1;
  transition:transform .22s ease;
}

.pd-inline-story-button[aria-expanded="true"]::after{
  transform:rotate(180deg);
}

.pd-inline-story-button:hover{
  background:#fff4dd;
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
  border-bottom:6px solid #000;
}

.pd-inline-story-panel[hidden]{
  display:none!important;
}

.pd-inline-story-loading{
  min-height:150px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:32px 20px;
  background:#fffaf0;
  color:#111;
  font:700 16px/1.4 Georgia,"Times New Roman",serif;
  text-align:center;
}

.pd-inline-story-error{
  padding:36px 22px;
  background:#fffaf0;
  color:#111;
  text-align:center;
}

.pd-inline-story-error p{
  margin:0 0 18px;
  font:18px/1.45 Georgia,"Times New Roman",serif;
}

.pd-inline-story-error a{
  min-height:46px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:10px 20px;
  border:2px solid #111;
  border-radius:999px;
  background:#111;
  color:#fff;
  font:900 10px/1 Arial,Helvetica,sans-serif;
  letter-spacing:.07em;
  text-decoration:none;
}

.pd-inline-story-content{
  position:relative;
  width:100%;
  overflow:hidden;
  background:#fffaf0;
}

/*
The imported article is live HTML.
Its original main story wrapper is preserved.
Only elements belonging to the separate standalone page
experience are suppressed inside the inline copy.
*/

.pd-inline-story-content #pdLuxuryHeader,
.pd-inline-story-content #pdContentsTicker,
.pd-inline-story-content #pdHomeHeaderImage,
.pd-inline-story-content #pdShellMenu,
.pd-inline-story-content #pdShellOverlay,
.pd-inline-story-content #pdInstallLauncher,
.pd-inline-story-content #pdInstallSheet,
.pd-inline-story-content .pd-help-launcher,
.pd-inline-story-content .pd-help-panel,
.pd-inline-story-content .pd-help-overlay,
.pd-inline-story-content [data-pets-dogue-help],
.pd-inline-story-content script,
.pd-inline-story-content style,
.pd-inline-story-content link,
.pd-inline-story-content meta,
.pd-inline-story-content title{
  display:none!important;
}

/*
Standalone story pages contain links back to Issue 01.
Inside Issue 01 they are unnecessary.
*/

.pd-inline-story-content .issue-back{
  display:none!important;
}

/*
Keep imported article width aligned with Issue 01.
*/

.pd-inline-story-content > *{
  max-width:1180px;
  margin-left:auto;
  margin-right:auto;
}

html[dir="rtl"] .pd-inline-story-button{
  text-align:right;
}

/* Small closing control at the end of an opened story */

.pd-inline-story-bottom-close{
  width:100%;
  min-height:58px;
  border:0;
  border-top:1px solid rgba(255,255,255,.18);
  background:#070707;
  color:#fff;
  cursor:pointer;
  font:900 10px/1 Arial,Helvetica,sans-serif;
  letter-spacing:.09em;
  text-transform:uppercase;
}

.pd-inline-story-bottom-close::before{
  content:"↑";
  display:inline-block;
  margin-right:9px;
  color:#d4a334;
  font-size:17px;
  vertical-align:-2px;
}

html[dir="rtl"] .pd-inline-story-bottom-close::before{
  margin-right:0;
  margin-left:9px;
}

.pd-inline-story-bottom-close:focus-visible{
  outline:3px solid #65e51f;
  outline-offset:-4px;
}

@media(max-width:720px){

  .pd-inline-story-button{
    min-height:50px;
    padding:11px 14px;
    font-size:9px;
  }

  .pd-inline-story-button::after{
    width:31px;
    height:31px;
    font-size:16px;
  }

}

@media(prefers-reduced-motion:reduce){

  .pd-inline-story-button::after{
    transition:none;
  }

}

`;

    document.head.appendChild(style);
  }

  function candidateLinks(){

    return Array.from(
      document.querySelectorAll(
        'a[href*="issue-01-miso.html"],' +
        'a[href*="issue-01-pablo.html"],' +
        'a[href*="issue-01-jessica.html"],' +
        'a[href*="issue-01-richie-pi.html"],' +
        '[data-pd-story]'
      )
    )
    .filter(function(element){

      /*
       * Never modify links inside the global shell,
       * side menu, ticker, profile or Miso help.
       */

      if(
        element.closest(
          "#pdLuxuryHeader," +
          "#pdContentsTicker," +
          "#pdShellMenu," +
          "#pdShellOverlay," +
          "#pdLuxuryProfileMenu," +
          "#pdInstallSheet," +
          "#pdInstallLauncher"
        )
      ){
        return false;
      }

      return Boolean(
        storyFromElement(element)
      );
    });
  }

  function closestStorySection(element){

    if(!element){
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

    for(const selector of selectors){

      const section =
        element.closest(selector);

      if(section){
        return section;
      }
    }

    return element.parentElement;
  }

  function createPanel(button,story){

    const panel =
      document.createElement("section");

    panel.className =
      "pd-inline-story-panel";

    panel.hidden = true;

    panel.dataset.pdInlineStory =
      STORY_GROUP[story] || story;

    panel.setAttribute(
      "aria-live",
      "polite"
    );

    const panelId =
      "pdInlineStory-" +
      (STORY_GROUP[story] || story) +
      "-" +
      Math.random()
        .toString(36)
        .slice(2,8);

    panel.id = panelId;

    button.setAttribute(
      "aria-controls",
      panelId
    );

    const section =
      closestStorySection(button);

    /*
     * Put the expanded story immediately after the
     * animal's current block whenever possible.
     */

    if(
      section &&
      section.parentNode
    ){

      section.insertAdjacentElement(
        "afterend",
        panel
      );

    }else{

      button.insertAdjacentElement(
        "afterend",
        panel
      );
    }

    return panel;
  }

  function convertLink(link){

    if(
      !link ||
      link.dataset.pdInlineReady === "1"
    ){
      return;
    }

    const story =
      storyFromElement(link);

    if(!story){
      return;
    }

    const originalHref =
      link.getAttribute("href") ||
      STORY_ROUTES[story];

    const button =
      document.createElement("button");

    button.type = "button";

    /*
     * Keep all existing visual classes so the approved
     * Issue 01 styling remains available.
     */

    button.className =
      (
        String(link.className || "") +
        " pd-inline-story-button"
      )
      .trim();

    button.dataset.pdStory =
      story;

    button.dataset.pdOriginalHref =
      originalHref;

    button.dataset.pdInlineReady =
      "1";

    button.setAttribute(
      "aria-expanded",
      "false"
    );

    /*
     * Preserve the existing translated MORE ABOUT label
     * on first render. The label changes to CLOSE only
     * while the story is open.
     */

    button.dataset.pdOriginalLabel =
      String(
        link.textContent ||
        words().open
      ).trim();

    button.innerHTML =
      link.innerHTML ||
      button.dataset.pdOriginalLabel;

    link.replaceWith(button);

    button.addEventListener(
      "click",
      function(){
        toggleStory(button);
      }
    );
  }

  function prepareButtons(){

    candidateLinks()
      .forEach(convertLink);
  }

  function closeCurrent(options){

    const settings =
      options || {};

    if(requestController){

      try{
        requestController.abort();
      }catch(error){}

      requestController = null;
    }

    if(currentPanel){

      currentPanel.hidden = true;
      currentPanel.innerHTML = "";

    }

    if(currentButton){

      currentButton.setAttribute(
        "aria-expanded",
        "false"
      );

      restoreButtonLabel(
        currentButton
      );
    }

    const oldButton =
      currentButton;

    currentPanel = null;
    currentButton = null;
    currentStory = "";

    if(
      settings.scrollToButton &&
      oldButton
    ){

      window.requestAnimationFrame(
        function(){

          oldButton.scrollIntoView({
            behavior:
              window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? "auto"
                : "smooth",
            block:"center"
          });

        }
      );
    }
  }

  function restoreButtonLabel(button){

    if(!button){
      return;
    }

    const original =
      button.dataset.pdOriginalLabel;

    if(original){

      /*
       * If Issue 01's language controller has already
       * updated this button, do not overwrite that newer
       * label with stale text.
       */

      const story =
        button.dataset.pdStory;

      const currentText =
        translatedOriginalLabel(story);

      button.textContent =
        currentText ||
        original ||
        words().open;

    }else{

      button.textContent =
        words().open;
    }
  }

  function translatedOriginalLabel(story){

    /*
     * issue-01.js exposes the approved translations.
     * Reuse them rather than maintaining a second copy.
     */

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

    try{

      const table =
        api &&
        api.translations &&
        (
          api.translations[lang] ||
          api.translations.en
        );

      if(
        table &&
        typeof table[key] === "string"
      ){
        return table[key];
      }

    }catch(error){}

    return "";
  }

  function setCloseLabel(button){

    if(!button){
      return;
    }

    button.textContent =
      words().close;
  }

  function loadingMarkup(){

    return (
      '<div class="pd-inline-story-loading">' +
      escapeHtml(words().loading) +
      "</div>"
    );
  }

  function errorMarkup(story){

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

  function escapeHtml(value){

    return String(value ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function removeStandaloneElements(root){

    if(!root){
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
      function(selector){

        root
          .querySelectorAll(selector)
          .forEach(function(element){
            element.remove();
          });

      }
    );
  }

  function fixRelativeUrls(root,url){

    if(!root){
      return;
    }

    const attributes = [
      ["img","src"],
      ["img","srcset"],
      ["source","src"],
      ["source","srcset"],
      ["video","poster"],
      ["video","src"],
      ["audio","src"],
      ["a","href"]
    ];

    attributes.forEach(
      function(pair){

        const selector =
          pair[0];

        const attribute =
          pair[1];

        root
          .querySelectorAll(
            selector +
            "[" +
            attribute +
            "]"
          )
          .forEach(function(element){

            const value =
              element.getAttribute(
                attribute
              );

            if(
              !value ||
              value.startsWith("#") ||
              value.startsWith("data:") ||
              value.startsWith("blob:") ||
              value.startsWith("mailto:") ||
              value.startsWith("tel:") ||
              value.startsWith("javascript:")
            ){
              return;
            }

            /*
             * srcset contains multiple URLs.
             */

            if(attribute === "srcset"){

              const fixed =
                value
                  .split(",")
                  .map(function(item){

                    const parts =
                      item.trim().split(/\s+/);

                    try{
                      parts[0] =
                        new URL(
                          parts[0],
                          url
                        ).href;
                    }catch(error){}

                    return parts.join(" ");
                  })
                  .join(", ");

              element.setAttribute(
                attribute,
                fixed
              );

              return;
            }

            try{

              element.setAttribute(
                attribute,
                new URL(
                  value,
                  url
                ).href
              );

            }catch(error){}

          });

      }
    );
  }

  function chooseArticleRoot(documentCopy){

    /*
     * Every approved story has its own main content.
     * Prefer <main>, then the known issue wrappers,
     * and finally <body>.
     */

    return (
      documentCopy.querySelector("main") ||
      documentCopy.querySelector("#misoIssue") ||
      documentCopy.querySelector("#pabloIssue") ||
      documentCopy.querySelector("#jessicaIssue") ||
      documentCopy.querySelector("#richiePiIssue") ||
      documentCopy.body
    );
  }

  function importStoryStyles(documentCopy){

    /*
     * The stories already contain their approved CSS.
     * Copy only article-page styles once per source.
     * They are placed in <head>, not inside the panel.
     */

    const file =
      pathOnly(
        documentCopy.baseURI ||
        ""
      );

    documentCopy
      .querySelectorAll("style")
      .forEach(function(sourceStyle,index){

        const key =
          "pd-inline-import-" +
          file +
          "-" +
          index;

        if(
          document.querySelector(
            'style[data-pd-import="' +
            key +
            '"]'
          )
        ){
          return;
        }

        const style =
          document.createElement("style");

        style.dataset.pdImport =
          key;

        style.textContent =
          scopeImportedCss(
            sourceStyle.textContent || ""
          );

        document.head.appendChild(style);
      });
  }

  function scopeImportedCss(css){

    /*
     * Keep the approved article styling but stop generic
     * body/html selectors from changing the Issue 01 page.
     *
     * Most article styling is class/id based already.
     */

    return String(css || "")
      .replace(
        /(^|})\s*html\s*,\s*body\s*\{/g,
        "$1 .pd-inline-story-content{"
      )
      .replace(
        /(^|})\s*body\s*\{/g,
        "$1 .pd-inline-story-content{"
      )
      .replace(
        /(^|})\s*html\s*\{/g,
        "$1 .pd-inline-story-content{"
      );
  }

  function executeArticleScripts(documentCopy,container){

    /*
     * We intentionally DO NOT execute:
     * - pets-dogue-shell.js
     * - pets-dogue-help.js
     *
     * Those already exist globally.
     *
     * Article-specific i18n/interaction scripts may be
     * loaded once when needed.
     */

    const scripts =
      Array.from(
        documentCopy.querySelectorAll(
          "script[src]"
        )
      );

    scripts.forEach(
      function(source){

        const src =
          source.getAttribute("src") ||
          "";

        if(
          !src ||
          src.includes("pets-dogue-shell.js") ||
          src.includes("pets-dogue-help.js")
        ){
          return;
        }

        let absolute = "";

        try{
          absolute =
            new URL(
              src,
              documentCopy.baseURI ||
              window.location.href
            ).href;
        }catch(error){
          return;
        }

        const already =
          Array.from(
            document.scripts
          )
          .some(function(existing){
            return existing.src === absolute;
          });

        if(already){
          return;
        }

        const script =
          document.createElement("script");

        script.src =
          absolute;

        script.defer =
          true;

        script.dataset.pdInlineArticle =
          "true";

        document.head.appendChild(
          script
        );
      }
    );

    /*
     * Let existing page controllers know that the global
     * language should be applied to newly inserted nodes.
     */

    window.requestAnimationFrame(
      function(){

        window.dispatchEvent(
          new CustomEvent(
            "petsdogue:languagechange",
            {
              detail:{
                language:language(),
                source:"issue-01-inline-story"
              }
            }
          )
        );

      }
    );
  }

  async function fetchStory(story,panel){

    const url =
      STORY_ROUTES[story];

    if(!url){
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
          credentials:"same-origin",
          cache:"force-cache",
          signal:
            requestController.signal
        }
      );

    if(!response.ok){
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

    /*
     * Set the correct base for relative photos/links.
     */

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
        articleDocument
      );

    if(!root){
      throw new Error(
        "Story content not found."
      );
    }

    importStoryStyles(
      articleDocument
    );

    const content =
      document.createElement("div");

    content.className =
      "pd-inline-story-content";

    /*
     * Clone actual DOM = live text, real images and
     * accessible markup. This is not an iframe.
     */

    Array.from(
      root.childNodes
    )
    .forEach(function(node){

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
    panel.appendChild(content);

    const close =
      document.createElement(
        "button"
      );

    close.type =
      "button";

    close.className =
      "pd-inline-story-bottom-close";

    close.textContent =
      words().close;

    close.addEventListener(
      "click",
      function(){

        closeCurrent({
          scrollToButton:true
        });

      }
    );

    panel.appendChild(close);

    executeArticleScripts(
      articleDocument,
      content
    );

    requestController = null;
  }

  async function openStory(button){

    const story =
      button.dataset.pdStory;

    if(!STORY_ROUTES[story]){
      return;
    }

    /*
     * Only one story stays expanded at a time.
     * This keeps Issue 01 clean and fast on mobile.
     */

    if(currentButton){
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

    panel.hidden =
      false;

    panel.innerHTML =
      loadingMarkup();

    /*
     * Bring the beginning of the expanded article into
     * view but keep the global header untouched.
     */

    window.requestAnimationFrame(
      function(){

        panel.scrollIntoView({
          behavior:
            window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches
              ? "auto"
              : "smooth",
          block:"start"
        });

      }
    );

    try{

      await fetchStory(
        story,
        panel
      );

    }catch(error){

      if(
        error &&
        error.name === "AbortError"
      ){
        return;
      }

      if(
        currentPanel === panel
      ){
        panel.innerHTML =
          errorMarkup(story);
      }

      console.warn(
        "PETS & DOGUE: inline Issue 01 story could not be loaded.",
        error
      );
    }
  }

  function toggleStory(button){

    const story =
      button.dataset.pdStory;

    const group =
      STORY_GROUP[story] ||
      story;

    if(
      currentButton === button &&
      currentPanel &&
      !currentPanel.hidden
    ){

      closeCurrent({
        scrollToButton:true
      });

      return;
    }

    /*
     * Richie and Pi belong to the same approved article.
     * If one is already open and the other is tapped,
     * close the first and reopen the shared story at the
     * newly selected card.
     */

    if(
      currentStory === group &&
      currentButton !== button
    ){
      closeCurrent();
    }

    openStory(button);
  }

  function refreshLanguage(){

    const text =
      words();

    document
      .querySelectorAll(
        ".pd-inline-story-button"
      )
      .forEach(function(button){

        if(
          button.getAttribute(
            "aria-expanded"
          ) === "true"
        ){

          button.textContent =
            text.close;

        }else{

          restoreButtonLabel(
            button
          );
        }

      });

    document
      .querySelectorAll(
        ".pd-inline-story-bottom-close"
      )
      .forEach(function(button){

        button.textContent =
          text.close;

      });

    const loading =
      document.querySelector(
        ".pd-inline-story-loading"
      );

    if(loading){
      loading.textContent =
        text.loading;
    }

    /*
     * Article-specific translation controllers listen to
     * the same global event. The imported live story
     * therefore follows the approved PETS & DOGUE language.
     */
  }

  function watchIssue(){

    const observer =
      new MutationObserver(
        function(){

          prepareButtons();

        }
      );

    observer.observe(
      document.body,
      {
        childList:true,
        subtree:true
      }
    );
  }

  function init(){

    /*
     * This file is intended only for Issue 01.
     */

    const file =
      pathOnly(
        window.location.pathname
      );

    if(
      file &&
      file !== "issue-01.html"
    ){
      return;
    }

    installStyles();
    prepareButtons();
    watchIssue();

    window.addEventListener(
      "petsdogue:languagechange",
      function(){

        window.requestAnimationFrame(
          refreshLanguage
        );

      }
    );

    window.addEventListener(
      "pageshow",
      function(){

        prepareButtons();
        refreshLanguage();

      }
    );

    document.addEventListener(
      "keydown",
      function(event){

        if(
          event.key === "Escape" &&
          currentPanel
        ){

          closeCurrent({
            scrollToButton:true
          });
        }

      }
    );

    window.PetsDogueIssue01Expanded = {
      close:function(){
        closeCurrent({
          scrollToButton:true
        });
      },
      refresh:prepareButtons
    };
  }

  if(
    document.readyState === "loading"
  ){

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once:true
      }
    );

  }else{

    init();
  }

})();
