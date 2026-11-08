"use strict";

/* PETS & DOGUE — event location fallback and event detail view */
(() => {
  const copy = {
    ru: { done: "Готово", cancel: "Очистить", read: "Читать всё", back: "Назад", home: "События", close: "Закрыть" },
    uk: { done: "Готово", cancel: "Очистити", read: "Читати повністю", back: "Назад", home: "Події", close: "Закрити" },
    en: { done: "Done", cancel: "Clear", read: "Read all", back: "Back", home: "Events", close: "Close" }
  };
  const lang = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
  const text = copy[lang] || copy.en;
  const q = (selector, root = document) => root.querySelector(selector);
  const esc = value => String(value || "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  const style = document.createElement("style");
  style.textContent = `
    .event-location-results .pde-manual-actions,
    .event-city-results .pde-manual-actions{
      display:flex;justify-content:flex-end;gap:9px;margin:10px 8px 8px;padding-top:10px;
      border-top:1px solid #e4dccb
    }
    .pde-manual-actions button{min-height:42px;padding:0 16px;border:0;border-radius:999px;font-weight:900}
    .pde-manual-actions .pde-done{background:#54ef0b;color:#111}
    .pde-manual-actions .pde-clear{background:#111;color:#fff;min-width:44px;font-size:22px}
    .event-card .event-description{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}
    .event-card .event-date-label{display:inline-flex;width:max-content;max-width:100%;padding:7px 11px;border-radius:999px;background:#54ef0b;color:#111;font-weight:900}
    .event-card h2{font-size:clamp(27px,5vw,38px);line-height:1.03}
    .event-card .event-more{min-height:38px;padding:0 14px;border:1px solid #54ef0b;border-radius:999px;background:#54ef0b;color:#111;font-weight:900}
    #pde-event-detail{position:fixed;inset:0;z-index:20500;display:none;overflow:auto;padding:16px;background:rgba(0,0,0,.78)}
    #pde-event-detail.open{display:flex;align-items:center;justify-content:center}
    #pde-event-detail .pde-panel{position:relative;width:min(900px,100%);max-height:92dvh;overflow:auto;padding:74px 22px 24px;border:1px solid #c99729;border-radius:26px;background:#f4efe4;color:#111;box-shadow:0 24px 70px #0009}
    #pde-event-detail .pde-controls{position:absolute;top:14px;left:16px;right:16px;display:flex;align-items:center;justify-content:space-between}
    #pde-event-detail .pde-controls div{display:flex;gap:9px}
    #pde-event-detail .pde-controls button{width:46px;height:46px;border:1px solid #c99729;border-radius:50%;background:#111;color:#fff;font-size:23px;font-weight:900}
    #pde-event-detail .pde-controls .pde-home{width:auto;padding:0 15px;font-size:14px}
    #pde-event-detail .pde-top{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:18px;align-items:stretch}
    #pde-event-detail .pde-image{width:100%;height:300px;object-fit:cover;border-radius:18px;background:#111}
    #pde-event-detail .pde-image[hidden]{display:none}
    #pde-event-detail .pde-info{align-self:center}
    #pde-event-detail .pde-title{margin:0 0 12px;font:400 clamp(30px,5vw,48px)/.98 Georgia,serif}
    #pde-event-detail .pde-address,#pde-event-detail .pde-date{margin:8px 0;color:#4f493e;font-size:16px;line-height:1.4}
    #pde-event-detail .pde-date{display:inline-block;padding:8px 12px;border-radius:999px;background:#54ef0b;color:#111;font-weight:900}
    #pde-event-detail .pde-description{margin:22px 0 0;padding-top:18px;border-top:1px solid #cfc7b8;font-size:17px;line-height:1.65;white-space:pre-wrap;overflow-wrap:anywhere}
    #pde-event-detail .pde-route{display:inline-flex;align-items:center;min-height:44px;margin-top:16px;padding:0 17px;border:1px solid #111;border-radius:999px;background:#111;color:#fff;font-weight:900}
    @media(max-width:600px){
      #pde-event-detail{padding:10px}
      #pde-event-detail .pde-panel{max-height:calc(100dvh - 20px);padding:70px 15px 20px;border-radius:22px}
      #pde-event-detail .pde-top{grid-template-columns:42% minmax(0,1fr);gap:12px}
      #pde-event-detail .pde-image{height:230px}
      #pde-event-detail .pde-title{font-size:clamp(23px,7vw,34px)}
      #pde-event-detail .pde-address,#pde-event-detail .pde-date{font-size:13px}
      #pde-event-detail .pde-description{font-size:16px}
      #pde-event-detail .pde-controls .pde-home{width:46px;padding:0;font-size:20px}
      #pde-event-detail .pde-home-label{display:none}
    }
  `;
  document.head.append(style);

  function installManualFallback(boxId, inputId) {
    const box = document.getElementById(boxId);
    const input = document.getElementById(inputId);
    if (!box || !input || box.hidden || box.querySelector(".pde-manual-actions")) return;
    const existingCityChoice = box.querySelector("[data-manual-city]");
    const bodyText = (box.textContent || "").trim();
    const isNoResults = Boolean(existingCityChoice) || /no matches|no results|no city|вариант|город|результат|не знайден|немає/i.test(bodyText);
    if (!isNoResults || /searching|ищем|шукаємо|…|\.\.\./i.test(bodyText)) return;
    if (existingCityChoice) { existingCityChoice.hidden = true; existingCityChoice.style.setProperty("display", "none", "important"); }

    const actions = document.createElement("div");
    actions.className = "pde-manual-actions";
    actions.innerHTML = `<button class="pde-clear" type="button" aria-label="${esc(text.cancel)}">×</button><button class="pde-done" type="button">✓ ${esc(text.done)}</button>`;
    box.append(actions);

    q(".pde-done", actions).addEventListener("click", () => {
      if (existingCityChoice) {
        existingCityChoice.click();
      } else {
        input.dataset.manualAccepted = "true";
        box.hidden = true;
      }
    });
    q(".pde-clear", actions).addEventListener("click", () => {
      input.value = "";
      delete input.dataset.manualAccepted;
      if (inputId === "eventCity") {
        const venue = document.getElementById("eventLocation");
        if (venue) { venue.value = ""; venue.disabled = true; }
      }
      box.hidden = true;
      input.focus();
    });
  }

  const locationObserver = new MutationObserver(() => {
    clearTimeout(locationObserver.timer);
    locationObserver.timer = setTimeout(() => {
      installManualFallback("eventCityResults", "eventCity");
      installManualFallback("eventLocationResults", "eventLocation");
    }, 120);
  });
  locationObserver.observe(document.body, { childList: true, subtree: true });

  let detailOverlay;
  let detailHistoryPushed = false;
  let previousScrollY = 0;
  function ensureDetailOverlay() {
    if (detailOverlay) return detailOverlay;
    detailOverlay = document.createElement("div");
    detailOverlay.id = "pde-event-detail";
    detailOverlay.innerHTML = `
      <section class="pde-panel" role="dialog" aria-modal="true" aria-labelledby="pde-event-title">
        <nav class="pde-controls" aria-label="${esc(text.home)}">
          <div><button class="pde-back" type="button" aria-label="${esc(text.back)}">←</button><button class="pde-home" type="button" aria-label="${esc(text.home)}">⌂ <span class="pde-home-label">${esc(text.home)}</span></button></div>
          <button class="pde-close" type="button" aria-label="${esc(text.close)}">×</button>
        </nav>
        <div class="pde-top"><img class="pde-image" alt=""><div class="pde-info"><h2 class="pde-title" id="pde-event-title"></h2><p class="pde-address"></p><p class="pde-date"></p><a class="pde-route" target="_blank" rel="noopener">${esc(document.querySelector("[data-t='route']")?.textContent || "Route")}</a></div></div>
        <p class="pde-description"></p>
      </section>`;
    document.body.append(detailOverlay);
    q(".pde-back", detailOverlay).onclick = () => closeDetail(true);
    q(".pde-close", detailOverlay).onclick = () => closeDetail(true);
    q(".pde-home", detailOverlay).onclick = () => {
      closeDetail(true);
      const eventsButton = document.querySelector('.cat[data-cat="events"]');
      if (eventsButton && !eventsButton.classList.contains("active")) eventsButton.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    detailOverlay.addEventListener("click", event => {
      if (event.target === detailOverlay) closeDetail(true);
    });
    return detailOverlay;
  }

  function openDetail(card) {
    const overlay = ensureDetailOverlay();
    const image = q(".card-photo", card);
    const title = q("h2", card)?.textContent?.trim() || "";
    const paragraphs = [...card.querySelectorAll(".address")];
    const location = paragraphs.find(p => !p.classList.contains("event-date-label") && !p.classList.contains("event-description"))?.textContent?.trim() || "";
    const date = q(".event-date-label", card)?.textContent?.trim() || "";
    const description = q(".event-description", card)?.textContent?.trim() || "";
    const route = q(".event-route", card);
    const detailImage = q(".pde-image", overlay);
    if (image?.src) { detailImage.src = image.src; detailImage.hidden = false; }
    else { detailImage.removeAttribute("src"); detailImage.hidden = true; }
    q(".pde-title", overlay).textContent = title;
    q(".pde-address", overlay).textContent = location;
    q(".pde-date", overlay).textContent = date;
    q(".pde-date", overlay).hidden = !date;
    q(".pde-description", overlay).textContent = description;
    const routeButton = q(".pde-route", overlay);
    if (route?.href) { routeButton.href = route.href; routeButton.hidden = false; }
    else routeButton.hidden = true;
    previousScrollY = window.scrollY;
    overlay.classList.add("open");
    document.body.classList.add("lock");
    try {
      history.pushState({ ...(history.state || {}), pdeEventDetail: true }, "", `${locationWithoutHash()}#event-details`);
      detailHistoryPushed = true;
    } catch { detailHistoryPushed = false; }
  }

  function locationWithoutHash() { return window.location.href.split("#")[0]; }

  function closeDetail(goBack) {
    if (!detailOverlay?.classList.contains("open")) return;
    detailOverlay.classList.remove("open");
    if (!document.querySelector(".overlay.open")) document.body.classList.remove("lock");
    if (goBack && detailHistoryPushed && history.state?.pdeEventDetail) {
      detailHistoryPushed = false;
      history.back();
    } else {
      detailHistoryPushed = false;
      window.scrollTo({ top: previousScrollY, behavior: "instant" });
    }
  }

  window.addEventListener("popstate", () => {
    if (detailOverlay?.classList.contains("open")) {
      detailHistoryPushed = false;
      closeDetail(false);
    }
  });

  const cardObserver = new MutationObserver(() => {
    document.querySelectorAll("#cards .event-card").forEach(card => {
      const description = q(".event-description", card);
      if (description && !q(".event-more", card)) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "event-more";
        button.textContent = text.read;
        button.onclick = event => { event.stopPropagation(); openDetail(card); };
        const actions = q(".actions", card);
        if (actions) actions.append(button);
        else description.after(button);
      }
    });
  });
  const cards = document.getElementById("cards");
  if (cards) cardObserver.observe(cards, { childList: true, subtree: true });
})();
