(function () {
  "use strict";

  const LANGUAGE_KEY = "pets_dogue_language";

  const LANGUAGE_ALIASES = {
    ua: "uk",
    cz: "cs",
    gr: "el",
    se: "sv",
    dk: "da"
  };

  let language = "en";
  let bundle = null;
  let speaking = false;
  let speechToken = 0;
  let utterance = null;

  function getElement(id) {
    return document.getElementById(id);
  }

  function normaliseLanguage(value) {
    const code = String(value || "en")
      .trim()
      .toLowerCase()
      .split(/[-_]/)[0];

    return LANGUAGE_ALIASES[code] || code;
  }

  function getSelectedLanguage() {
    try {
      return normaliseLanguage(
        localStorage.getItem(LANGUAGE_KEY) || "en"
      );
    } catch (error) {
      return normaliseLanguage(
        document.documentElement.lang || "en"
      );
    }
  }

  function stopSpeech() {
    speechToken++;
    speaking = false;
    utterance = null;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    const button = getElement("egyptListen");
    const label = getElement("egyptListenLabel");

    if (button) {
      button.setAttribute("aria-pressed", "false");
    }

    if (label && bundle) {
      label.textContent = bundle.ui.listen;
    }
  }

  function setupGalleries() {
    document
      .querySelectorAll(".egypt-gallery")
      .forEach(function (gallery) {
        const track = gallery.querySelector(".egypt-track");

        if (!track) {
          return;
        }

        const slides = Array.from(track.children);
        const previousButton = gallery.querySelector(
          'button[data-step="-1"]'
        );
        const nextButton = gallery.querySelector(
          'button[data-step="1"]'
        );
        const counter = gallery.querySelector(".egypt-count");

        if (!slides.length) {
          return;
        }

        let currentIndex = 0;

        function updateStatus() {
          const firstOffset = slides[0].offsetLeft;
          let nearestIndex = 0;
          let nearestDistance = Infinity;

          slides.forEach(function (slide, index) {
            const distance = Math.abs(
              slide.offsetLeft -
              firstOffset -
              track.scrollLeft
            );

            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestIndex = index;
            }
          });

          currentIndex = nearestIndex;

          if (counter) {
            counter.textContent =
              (currentIndex + 1) + " / " + slides.length;
          }

          if (previousButton) {
            previousButton.disabled = currentIndex === 0;
          }

          if (nextButton) {
            nextButton.disabled =
              currentIndex === slides.length - 1;
          }
        }

        function moveSlide(step) {
          const targetIndex = Math.max(
            0,
            Math.min(
              slides.length - 1,
              currentIndex + step
            )
          );

          const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;

          track.scrollTo({
            left:
              slides[targetIndex].offsetLeft -
              slides[0].offsetLeft,
            behavior: reduceMotion ? "auto" : "smooth"
          });
        }

        if (previousButton) {
          previousButton.addEventListener(
            "click",
            function () {
              moveSlide(-1);
            }
          );
        }

        if (nextButton) {
          nextButton.addEventListener(
            "click",
            function () {
              moveSlide(1);
            }
          );
        }

        track.addEventListener(
          "keydown",
          function (event) {
            if (
              event.key !== "ArrowRight" &&
              event.key !== "ArrowLeft"
            ) {
              return;
            }

            event.preventDefault();

            moveSlide(
              event.key === "ArrowRight" ? 1 : -1
            );
          }
        );

        track.addEventListener(
          "scroll",
          updateStatus,
          { passive: true }
        );

        updateStatus();
      });
  }

  function setMeta(selector, value) {
    const element = document.querySelector(selector);

    if (element) {
      element.setAttribute("content", value);
    }
  }

  function renderArticle() {
        const translations = window.PetsDogueTranslations?.article;
    const article = getElement("egyptArticle");
    const body = getElement("egyptBody");

    if (!translations || !article || !body) {
      return;
    }

    const selectedLanguage = getSelectedLanguage();
    const selectedStory =
      translations[selectedLanguage]?.stories?.egypt;

    const nextLanguage = selectedStory
      ? selectedLanguage
      : "en";

    const nextStory =
      translations[nextLanguage]?.stories?.egypt;

    if (!nextStory || typeof nextStory.body !== "string") {
      return;
    }

    stopSpeech();
    language = nextLanguage;

    const sharedUI = translations[language].ui || {};

    bundle = {
      ...nextStory,
      ui: {
        listen: sharedUI.listen || "Listen",
        stop: sharedUI.stop || "Stop",
        back: sharedUI.backToArticles || "Articles",
        unavailable: "Speech is unavailable in this browser.",
        fallback: "This translation is not available yet. The English article is displayed.",
        ...(nextStory.editorialUI || {})
      }
    };

    article.lang = language;
    article.dir = language === "ar" ? "rtl" : "ltr";

    getElement("egyptTitle").textContent = bundle.title;
    getElement("egyptIntro").textContent = bundle.intro;

    body.innerHTML = bundle.body;

    const listenButton = getElement("egyptListen");
    const listenLabel = getElement("egyptListenLabel");
    const backLink = getElement("egyptBack");
    const status = getElement("egyptSpeechStatus");
    const notice = getElement("egyptTranslationNotice");

    if (listenLabel) {
      listenLabel.textContent = bundle.ui.listen;
    }

    if (listenButton) {
      listenButton.setAttribute(
        "aria-label",
        bundle.ui.listen
      );
    }

    if (backLink) {
      backLink.textContent = bundle.ui.back;
    }

    if (status) {
      status.textContent = "";
    }

    if (notice) {
      notice.hidden = selectedLanguage === language;
      notice.textContent = bundle.ui.fallback || "";
    }

    document.title =
      bundle.title.replace(/^🇪🇬\s*/, "") +
      " | PETS & DOGUE";

    setMeta(
      'meta[name="description"]',
      bundle.intro
    );

    setMeta(
      'meta[property="og:title"]',
      document.title
    );

    setMeta(
      'meta[property="og:description"]',
      bundle.intro
    );

    setMeta(
      'meta[property="og:image"]',
      location.origin + "/69922.jpg"
    );

    setMeta(
      'meta[name="twitter:title"]',
      document.title
    );

    setMeta(
      'meta[name="twitter:description"]',
      bundle.intro
    );

    setMeta(
      'meta[name="twitter:image"]',
      location.origin + "/69922.jpg"
    );

    setupGalleries();
  }

  function getSpeechLocale() {
    const locales = {
      en: "en-GB",
      uk: "uk-UA",
      ru: "ru-RU",
      fr: "fr-FR",
      de: "de-DE",
      es: "es-ES",
      it: "it-IT",
      pt: "pt-PT",
      nl: "nl-NL",
      pl: "pl-PL",
      cs: "cs-CZ",
      sk: "sk-SK",
      hu: "hu-HU",
      ro: "ro-RO",
      bg: "bg-BG",
      el: "el-GR",
      sv: "sv-SE",
      da: "da-DK",
      no: "nb-NO",
      fi: "fi-FI",
      tr: "tr-TR",
      ar: "ar-SA",
      hi: "hi-IN"
    };

    return locales[language] || "en-GB";
  }

  function toggleSpeech() {
    if (!bundle) {
      return;
    }

    if (speaking) {
      stopSpeech();
      return;
    }

    if (!("speechSynthesis" in window)) {
      const status = getElement("egyptSpeechStatus");

      if (status) {
        status.textContent = bundle.ui.unavailable;
      }

      return;
    }

    const nodes = [
      getElement("egyptTitle"),
      getElement("egyptIntro"),
      ...getElement("egyptBody").querySelectorAll(
        ".egypt-paragraph, h2"
      )
    ];

    const chunks = nodes
      .filter(Boolean)
      .map(function (node) {
        return node.innerText.trim();
      })
      .filter(Boolean);

    if (!chunks.length) {
      return;
    }

    window.speechSynthesis.cancel();

    speaking = true;

    const activeToken = ++speechToken;
    const locale = getSpeechLocale();

    let chunkIndex = 0;

    getElement("egyptListen").setAttribute(
      "aria-pressed",
      "true"
    );

    getElement("egyptListenLabel").textContent =
      bundle.ui.stop;

    function speakNextChunk() {
      if (
        activeToken !== speechToken ||
        !speaking
      ) {
        return;
      }

      if (chunkIndex >= chunks.length) {
        stopSpeech();
        return;
      }

      utterance = new SpeechSynthesisUtterance(
        chunks[chunkIndex++]
      );

      utterance.lang = locale;
      utterance.rate = .94;

      const voices =
        window.speechSynthesis.getVoices();

      const voice =
        voices.find(function (candidate) {
          return candidate.lang.toLowerCase() ===
            locale.toLowerCase();
        }) ||
        voices.find(function (candidate) {
          return candidate.lang
            .toLowerCase()
            .startsWith(language);
        });

      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = speakNextChunk;

      utterance.onerror = function () {
        if (activeToken === speechToken) {
          stopSpeech();
        }
      };

      window.speechSynthesis.speak(utterance);
    }

    speakNextChunk();
  }

  if (typeof window.openMenu !== "function") {
    window.openMenu = function () {
      getElement("sideMenu")?.classList.add("open");
      getElement("menuOverlay")?.classList.add("show");
      document.body.classList.add("menu-open");
    };
  }

  if (typeof window.closeMenu !== "function") {
    window.closeMenu = function () {
      getElement("sideMenu")?.classList.remove("open");
      getElement("menuOverlay")?.classList.remove("show");
      document.body.classList.remove("menu-open");
    };
  }

  function initialise() {
    const listenButton = getElement("egyptListen");

    if (!listenButton) {
      return;
    }

    listenButton.addEventListener(
      "click",
      toggleSpeech
    );

    getElement("languageSelect")?.addEventListener(
      "change",
      function () {
        setTimeout(renderArticle, 0);
      }
    );

    renderArticle();
  }

  window.addEventListener(
    "petsdogue:languagechange",
    renderArticle
  );

  window.addEventListener(
    "languagechange",
    renderArticle
  );

  window.addEventListener(
    "storage",
    function (event) {
      if (event.key === LANGUAGE_KEY) {
        renderArticle();
      }
    }
  );

  window.addEventListener(
    "pagehide",
    stopSpeech
  );

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialise,
      { once: true }
    );
  } else {
    initialise();
  }
})();
