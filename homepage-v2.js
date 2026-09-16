"use strict";

/*
PETS & DOGUE — HOMEPAGE VISUAL EXPERIENCE V3

IMPORTANT
- global header is NOT changed
- Contents side menu is NOT changed
- Miso help bubble is NOT changed
- global scroll behaviour is NOT changed
- existing homepage intro is preserved
- this file rebuilds ONLY the content BELOW the intro
*/

(function () {

const ROOT_SELECTOR = ".pd-visual-home";

const ALIASES = {
  ua: "uk",
  cz: "cs",
  gr: "el",
  se: "sv",
  dk: "da"
};

function currentLanguage() {
  let lang = "en";

  try {
    if (
      window.PetsDogueLanguage &&
      typeof window.PetsDogueLanguage.getCurrentLanguage === "function"
    ) {
      const value = window.PetsDogueLanguage.getCurrentLanguage();

      lang =
        typeof value === "string"
          ? value
          : value?.code || "en";
    } else {
      lang =
        localStorage.getItem("pets_dogue_language") ||
        document.documentElement.lang ||
        "en";
    }
  } catch (error) {
    lang = "en";
  }

  lang = String(lang)
    .toLowerCase()
    .split("-")[0];

  return ALIASES[lang] || lang || "en";
}


/* =========================================================
   FALLBACK TEXT
========================================================= */

const FALLBACK = {

en: {
  membershipTitle: "More for your pet. All year.",
  membershipText:
    "Member discounts, special offers, competitions, Marketplace benefits and more across the PETS & DOGUE world.",

  petFriendlyTitle: "Go together.",
  petFriendlyText:
    "Find cafés, hotels, restaurants, parks, beaches and services that welcome pets — with maps, routes, pet rules and community confirmation.",

  discountsTitle: "More benefits. Less everyday spend.",
  discountsText:
    "Discover useful member discounts and special offers for stays, services, grooming, products and real pet life.",

  communityTitle: "People nearby can help.",
  communityText:
    "Connect with local pet lovers, share trusted recommendations and help lost and found animals get home faster.",

  healthTitle: "Care with confidence.",
  healthText:
    "Discover useful health, grooming, wellbeing and responsible-care content made easier to understand and find.",

  marketplaceTitle: "Buy. Sell. Discover.",
  marketplaceText:
    "Products, services, accessories and community listings in one place. Club members can publish up to 50 free ads.",

  greenTitle: "Meet animals beyond the city.",
  greenText:
    "Discover farms, sanctuaries, zoos, aquariums, wildlife parks and responsible animal experiences.",

  coverTitle: "Your pet could be next.",
  coverText:
    "Join Cover Star opportunities, competitions and editorial features celebrating personality, character and every kind of pet.",

  helpTitle: "Seen. Shared. Helped.",
  helpText:
    "Animals needing rescue, treatment or a new home need visibility. One share can connect the right animal with the right person.",

  businessTitle: "Grow with a pet-loving audience.",
  businessText:
    "Hotels, cafés, groomers, vets, shops and brands can gain visibility, feature offers and become easier for pet owners to discover.",

  memberLabel: "MEMBERSHIP & CLUB",
  petFriendlyLabel: "PET-FRIENDLY PLACES",
  discountLabel: "MEMBER BENEFITS",
  communityLabel: "LOCAL COMMUNITY",
  healthLabel: "HEALTH & CARE",
  marketLabel: "MARKETPLACE",
  greenLabel: "GREEN TOURISM",
  coverLabel: "COVER STAR · COMPETITIONS",
  helpLabel: "HELP ANIMALS IN NEED",
  businessLabel: "WORK WITH PETS & DOGUE",

  offers: "Special offers",
  hotel: "Pet-friendly stays",
  grooming: "Grooming",
  services: "Services",
  nearby: "Near you",
  map: "Map",
  routes: "Routes",
  petRules: "Pet rules",
  verified: "Community",
  lostFound: "Lost & Found",
  zoo: "Zoos",
  aquarium: "Aquariums",
  wildlife: "Wildlife",
  farms: "Farms & sanctuaries"
},

ru: {
  membershipTitle: "Больше для питомца. Весь год.",
  membershipText:
    "Скидки клуба, специальные предложения, конкурсы, преимущества Marketplace и другие возможности PETS & DOGUE.",

  petFriendlyTitle: "Вместе — куда угодно.",
  petFriendlyText:
    "Находите кафе, отели, рестораны, парки, пляжи и сервисы, куда можно с животными — с картой, маршрутами, правилами и подтверждениями сообщества.",

  discountsTitle: "Больше преимуществ. Меньше расходов.",
  discountsText:
    "Полезные скидки и специальные предложения на отели, услуги, груминг, товары и всё, чем владельцы животных пользуются каждый день.",

  communityTitle: "Рядом есть люди, которые помогут.",
  communityText:
    "Общайтесь с местными владельцами животных, делитесь рекомендациями и помогайте пропавшим и найденным питомцам быстрее вернуться домой.",

  healthTitle: "Забота — понятнее.",
  healthText:
    "Здоровье, уход, груминг и благополучие животных — полезная информация и сервисы в понятном формате.",

  marketplaceTitle: "Покупаем. Продаём. Находим.",
  marketplaceText:
    "Товары, услуги, аксессуары и объявления в одном месте. Участники клуба могут разместить до 50 бесплатных объявлений.",

  greenTitle: "Познакомьтесь с животными ближе.",
  greenText:
    "Фермы, приюты, зоопарки, океанариумы, wildlife-парки и ответственные места для общения с животными и природой.",

  coverTitle: "Ваш питомец может быть следующим.",
  coverText:
    "Cover Star, конкурсы и редакционные проекты PETS & DOGUE для ярких, необычных и любимых животных.",

  helpTitle: "Увидели. Поделились. Помогли.",
  helpText:
    "Животным, которым нужен дом, лечение или спасение, прежде всего нужна видимость. Иногда одно распространение меняет всё.",

  businessTitle: "Растите вместе с аудиторией, которая любит животных.",
  businessText:
    "Отели, кафе, грумеры, клиники, магазины и бренды получают видимость, размещают предложения и становятся ближе к владельцам животных.",

  memberLabel: "КЛУБ И ПОДПИСКА",
  petFriendlyLabel: "PET-FRIENDLY МЕСТА",
  discountLabel: "ВЫГОДЫ КЛУБА",
  communityLabel: "ЛОКАЛЬНОЕ СООБЩЕСТВО",
  healthLabel: "ЗДОРОВЬЕ И УХОД",
  marketLabel: "MARKETPLACE",
  greenLabel: "ЗЕЛЁНЫЙ ТУРИЗМ",
  coverLabel: "COVER STAR · КОНКУРСЫ",
  helpLabel: "ПОМОЩЬ ЖИВОТНЫМ В НУЖДЕ",
  businessLabel: "СОТРУДНИЧЕСТВО С PETS & DOGUE",

  offers: "Спецпредложения",
  hotel: "Отели с животными",
  grooming: "Груминг",
  services: "Услуги",
  nearby: "Рядом",
  map: "Карта",
  routes: "Маршруты",
  petRules: "Правила",
  verified: "Сообщество",
  lostFound: "Пропали / найдены",
  zoo: "Зоопарки",
  aquarium: "Океанариумы",
  wildlife: "Wildlife",
  farms: "Фермы и приюты"
},

uk: {
  membershipTitle: "Більше для улюбленця. Увесь рік.",
  membershipText:
    "Знижки клубу, спеціальні пропозиції, конкурси, переваги Marketplace та інші можливості PETS & DOGUE.",

  petFriendlyTitle: "Разом — куди завгодно.",
  petFriendlyText:
    "Знаходьте кафе, готелі, ресторани, парки, пляжі та сервіси, куди можна з тваринами — з картою, маршрутами, правилами та підтвердженнями спільноти.",

  discountsTitle: "Більше переваг. Менше витрат.",
  discountsText:
    "Корисні знижки та спеціальні пропозиції на проживання, послуги, грумінг, товари та повсякденне життя з тваринами.",

  communityTitle: "Поруч є люди, які допоможуть.",
  communityText:
    "Спілкуйтеся з місцевими власниками тварин, діліться рекомендаціями та допомагайте загубленим і знайденим тваринам повернутися додому.",

  healthTitle: "Турбота — зрозуміліше.",
  healthText:
    "Здоров’я, догляд, грумінг і добробут тварин — корисна інформація та сервіси у зрозумілому форматі.",

  marketplaceTitle: "Купуємо. Продаємо. Знаходимо.",
  marketplaceText:
    "Товари, послуги, аксесуари та оголошення в одному місці. Учасники клубу можуть розмістити до 50 безкоштовних оголошень.",

  greenTitle: "Познайомтеся з тваринами ближче.",
  greenText:
    "Ферми, притулки, зоопарки, океанаріуми, wildlife-парки та відповідальні місця для знайомства з тваринами й природою.",

  coverTitle: "Ваш улюбленець може бути наступним.",
  coverText:
    "Cover Star, конкурси та редакційні проєкти PETS & DOGUE для яскравих, незвичайних і улюблених тварин.",

  helpTitle: "Побачили. Поділилися. Допомогли.",
  helpText:
    "Тваринам, яким потрібен дім, лікування або порятунок, насамперед потрібна видимість. Іноді один поширений допис змінює все.",

  businessTitle: "Зростайте разом з аудиторією, яка любить тварин.",
  businessText:
    "Готелі, кафе, грумери, клініки, магазини й бренди отримують видимість, розміщують пропозиції та стають ближчими до власників тварин.",

  memberLabel: "КЛУБ І ПІДПИСКА",
  petFriendlyLabel: "PET-FRIENDLY МІСЦЯ",
  discountLabel: "ПЕРЕВАГИ КЛУБУ",
  communityLabel: "ЛОКАЛЬНА СПІЛЬНОТА",
  healthLabel: "ЗДОРОВ’Я І ДОГЛЯД",
  marketLabel: "MARKETPLACE",
  greenLabel: "ЗЕЛЕНИЙ ТУРИЗМ",
  coverLabel: "COVER STAR · КОНКУРСИ",
  helpLabel: "ДОПОМОГА ТВАРИНАМ",
  businessLabel: "СПІВПРАЦЯ З PETS & DOGUE",

  offers: "Спецпропозиції",
  hotel: "Готелі з тваринами",
  grooming: "Грумінг",
  services: "Послуги",
  nearby: "Поруч",
  map: "Карта",
  routes: "Маршрути",
  petRules: "Правила",
  verified: "Спільнота",
  lostFound: "Загублені / знайдені",
  zoo: "Зоопарки",
  aquarium: "Океанаріуми",
  wildlife: "Wildlife",
  farms: "Ферми й притулки"
}

};


function text(key) {
  const lang = currentLanguage();

  const external =
    window.PetsDogueHomepageV2Text &&
    window.PetsDogueHomepageV2Text[lang];

  if (
    external &&
    Object.prototype.hasOwnProperty.call(external, key)
  ) {
    return external[key];
  }

  if (
    FALLBACK[lang] &&
    Object.prototype.hasOwnProperty.call(FALLBACK[lang], key)
  ) {
    return FALLBACK[lang][key];
  }

  return FALLBACK.en[key] || "";
}


/* =========================================================
   HELPERS
========================================================= */

function esc(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


function chips(items) {
  return `
    <div class="pdv3-chips">
      ${items
        .filter(Boolean)
        .map(item => `<span>${esc(item)}</span>`)
        .join("")}
    </div>
  `;
}


function arrow(title) {
  return `
    <span
      class="pdv3-arrow"
      role="img"
      aria-label="${esc(title)}"
    >
      →
    </span>
  `;
}


function listenButton() {
  return `
    <button
      class="pdv3-listen home-listen"
      type="button"
      aria-label="Listen to this section"
      onclick="listenToSection(this)"
    >
      🔊
    </button>
  `;
}


/* =========================================================
   SECTION TEMPLATE
========================================================= */

function visualCard({
  className = "",
  image,
  href,
  label,
  title,
  body,
  chipsList = [],
  dark = true,
  position = "center"
}) {

  return `
    <a
      class="pdv3-card ${className} ${dark ? "pdv3-dark" : "pdv3-light"}"
      href="${href}"
      data-speech-section
    >

      <img
        class="pdv3-image"
        src="${image}"
        alt="${esc(title)}"
        style="object-position:${position}"
        loading="lazy"
      >

      <div class="pdv3-shade"></div>

      ${listenButton()}

      <div class="pdv3-content">

        <div class="pdv3-label">
          ${label}
        </div>

        <h2>
          ${title}
        </h2>

        <p>
          ${body}
        </p>

        ${
          chipsList.length
            ? chips(chipsList)
            : ""
        }

        ${arrow(title)}

      </div>

    </a>
  `;
}


/* =========================================================
   STYLES
========================================================= */

function styles() {
  return `

<style id="pdHomepageV3Styles">

.pdv3{
width:100%;
background:#f4efe5;
color:#111;
overflow:hidden;
}

.pdv3 *{
box-sizing:border-box;
}

.pdv3-feed{
width:min(100%,1440px);
margin:0 auto;
padding:12px;
display:grid;
gap:12px;
}

.pdv3-card{
position:relative;
display:block;
min-height:650px;
border-radius:24px;
overflow:hidden;
text-decoration:none;
color:#fff;
isolation:isolate;
background:#111;
}

.pdv3-image{
position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:cover;
display:block;
transform:scale(1.002);
transition:transform .7s ease;
z-index:-3;
}

.pdv3-card:hover .pdv3-image{
transform:scale(1.025);
}

.pdv3-shade{
position:absolute;
inset:0;
z-index:-2;
background:
linear-gradient(
180deg,
rgba(0,0,0,.05) 0%,
rgba(0,0,0,.10) 35%,
rgba(0,0,0,.78) 100%
);
}

.pdv3-light .pdv3-shade{
background:
linear-gradient(
180deg,
rgba(255,255,255,.04) 0%,
rgba(255,255,255,.02) 35%,
rgba(245,238,225,.92) 100%
);
}

.pdv3-light{
color:#111;
}

.pdv3-content{
position:absolute;
left:0;
right:0;
bottom:0;
padding:34px 34px 32px;
max-width:680px;
}

.pdv3-label{
font-size:12px;
font-weight:900;
letter-spacing:.18em;
text-transform:uppercase;
margin-bottom:10px;
}

.pdv3-card h2{
margin:0 0 12px;
font-family:Georgia,"Times New Roman",serif;
font-weight:400;
font-size:clamp(44px,5vw,76px);
line-height:.9;
letter-spacing:-.04em;
max-width:610px;
}

.pdv3-card p{
margin:0;
max-width:520px;
font-size:17px;
line-height:1.42;
font-weight:600;
}

.pdv3-chips{
display:flex;
flex-wrap:wrap;
gap:7px;
margin-top:18px;
max-width:520px;
}

.pdv3-chips span{
display:inline-flex;
align-items:center;
min-height:32px;
padding:7px 11px;
border-radius:999px;
font-size:10px;
font-weight:900;
background:rgba(255,255,255,.88);
color:#111;
backdrop-filter:blur(6px);
-webkit-backdrop-filter:blur(6px);
}

.pdv3-arrow{
position:absolute;
right:28px;
bottom:28px;
width:50px;
height:50px;
border-radius:50%;
display:grid;
place-items:center;
border:1px solid rgba(255,255,255,.8);
background:rgba(0,0,0,.22);
color:#fff;
font-size:28px;
font-weight:300;
backdrop-filter:blur(6px);
-webkit-backdrop-filter:blur(6px);
}

.pdv3-light .pdv3-arrow{
border-color:#111;
color:#111;
background:rgba(255,255,255,.65);
}

.pdv3-listen{
position:absolute;
top:18px;
right:18px;
z-index:5;
width:46px;
height:46px;
border-radius:50%;
border:1px solid rgba(255,255,255,.65);
background:rgba(0,0,0,.28);
color:#fff;
display:grid;
place-items:center;
font-size:19px;
cursor:pointer;
backdrop-filter:blur(8px);
-webkit-backdrop-filter:blur(8px);
}

.pdv3-membership{
min-height:700px;
}

.pdv3-petfriendly{
min-height:760px;
}

.pdv3-stays{
min-height:700px;
}

.pdv3-green{
min-height:720px;
}

.pdv3-help{
min-height:580px;
}

.pdv3-help .pdv3-shade{
background:
linear-gradient(
180deg,
rgba(115,0,15,.10) 0%,
rgba(145,8,25,.34) 38%,
rgba(128,0,15,.90) 100%
);
}

.pdv3-help .pdv3-label,
.pdv3-help h2{
color:#fff;
}

.pdv3-help h2::before{
content:"♥ ";
}

.pdv3-help h2::after{
content:" ♥";
}

.pdv3-business .pdv3-shade{
background:
linear-gradient(
180deg,
rgba(0,0,0,.06),
rgba(0,0,0,.70)
);
}

.pdv3-two{
display:grid;
grid-template-columns:1fr 1fr;
gap:12px;
}

.pdv3-two .pdv3-card{
min-height:600px;
}

.pdv3-footer-message{
background:#080808;
color:#fff;
padding:40px 24px;
text-align:center;
}

.pdv3-footer-message strong{
display:block;
font-family:Georgia,"Times New Roman",serif;
font-size:clamp(32px,5vw,58px);
font-weight:400;
}

.pdv3-footer-message span{
display:block;
margin-top:8px;
font-size:11px;
letter-spacing:.18em;
color:#d3b36a;
font-weight:900;
}


/* ================= MOBILE ================= */

@media(max-width:760px){

.pdv3-feed{
padding:8px;
gap:8px;
}

.pdv3-two{
grid-template-columns:1fr;
gap:8px;
}

.pdv3-card,
.pdv3-two .pdv3-card,
.pdv3-membership,
.pdv3-petfriendly,
.pdv3-stays,
.pdv3-green{
min-height:64svh;
max-height:710px;
border-radius:18px;
}

.pdv3-help{
min-height:58svh;
}

.pdv3-content{
padding:24px 20px 24px;
max-width:92%;
}

.pdv3-label{
font-size:9px;
margin-bottom:8px;
}

.pdv3-card h2{
font-size:38px;
line-height:.92;
max-width:90%;
margin-bottom:9px;
}

.pdv3-card p{
font-size:13px;
line-height:1.35;
max-width:88%;
}

.pdv3-chips{
gap:5px;
margin-top:12px;
max-width:88%;
}

.pdv3-chips span{
font-size:8px;
padding:6px 9px;
min-height:27px;
}

.pdv3-arrow{
width:42px;
height:42px;
right:17px;
bottom:17px;
font-size:23px;
}

.pdv3-listen{
width:40px;
height:40px;
top:13px;
right:13px;
font-size:16px;
}

.pdv3-footer-message{
padding:34px 18px;
}

}


@media(max-width:390px){

.pdv3-card,
.pdv3-two .pdv3-card,
.pdv3-membership,
.pdv3-petfriendly,
.pdv3-stays,
.pdv3-green{
min-height:61svh;
}

.pdv3-card h2{
font-size:34px;
}

.pdv3-card p{
font-size:12.5px;
}

}

</style>

`;
}


/* =========================================================
   RENDER
========================================================= */

function renderHomepageV3() {

  const root =
    document.querySelector(ROOT_SELECTOR);

  if (!root) {
    return;
  }

  /*
  Preserve the ORIGINAL homepage intro.
  We do not redesign or replace it.
  */

  let introHTML = "";

  const intro =
    root.querySelector(".pd-home-hero");

  if (intro) {
    introHTML = intro.outerHTML;
  } else if (root.dataset.pdIntroHtml) {
    introHTML = root.dataset.pdIntroHtml;
  }

  if (introHTML) {
    root.dataset.pdIntroHtml = introHTML;
  }


  const content = `

    ${styles()}

    ${introHTML}

    <div class="pdv3">

      <div class="pdv3-feed">


        <!-- MEMBERSHIP -->

        ${visualCard({
          className: "pdv3-membership",
          image: "assets/home/club.jpg",
          href: "club.html",
          label: text("memberLabel"),
          title: text("membershipTitle"),
          body: text("membershipText"),
          position: "center 42%",
          chipsList: [
            "£10 / YEAR",
            text("offers"),
            "Marketplace",
            "Cover Star",
            "Competitions"
          ]
        })}


        <!-- PET FRIENDLY -->

        ${visualCard({
          className: "pdv3-petfriendly",
          image: "assets/home/pet-friendly.jpg",
          href: "pet-friendly-places.html",
          label: text("petFriendlyLabel"),
          title: text("petFriendlyTitle"),
          body: text("petFriendlyText"),
          position: "center center",
          chipsList: [
            text("nearby"),
            text("map"),
            text("petRules"),
            text("routes"),
            text("verified")
          ]
        })}


        <!-- DISCOUNTS + STAYS -->

        <div class="pdv3-two">

          ${visualCard({
            className: "pdv3-discounts",
            image: "assets/home/partners.jpg",
            href: "special-offers.html",
            label: text("discountLabel"),
            title: text("discountsTitle"),
            body: text("discountsText"),
            position: "center center",
            chipsList: [
              text("offers"),
              text("grooming"),
              text("services")
            ]
          })}

          ${visualCard({
            className: "pdv3-stays",
            image: "assets/home/pet-friendly-stays.jpg",
            href: "pet-friendly-places.html",
            label: text("hotel"),
            title: "Stay beautifully together.",
            body: text("petFriendlyText"),
            position: "center center",
            chipsList: [
              text("hotel"),
              text("offers"),
              text("services")
            ]
          })}

        </div>


        <!-- COMMUNITY -->

        ${visualCard({
          className: "pdv3-community",
          image: "assets/home/community.jpg",
          href: "local-community.html",
          label: text("communityLabel"),
          title: text("communityTitle"),
          body: text("communityText"),
          position: "center center",
          chipsList: [
            text("nearby"),
            text("lostFound"),
            text("verified")
          ]
        })}


        <!-- GREEN TOURISM -->

        ${visualCard({
          className: "pdv3-green",
          image: "assets/home/green-tourism.jpg",
          href: "pet-friendly-places.html",
          label: text("greenLabel"),
          title: text("greenTitle"),
          body: text("greenText"),
          position: "center center",
          chipsList: [
            text("farms"),
            text("wildlife"),
            text("zoo"),
            text("aquarium")
          ]
        })}


        <!-- HEALTH + MARKETPLACE -->

        <div class="pdv3-two">

          ${visualCard({
            className: "pdv3-health",
            image: "assets/home/health.jpg",
            href: "wellness.html",
            label: text("healthLabel"),
            title: text("healthTitle"),
            body: text("healthText"),
            position: "center center",
            chipsList: [
              text("grooming"),
              text("services")
            ]
          })}

          ${visualCard({
            className: "pdv3-marketplace",
            image: "assets/home/marketplace.jpg",
            href: "pet-marketplace.html",
            label: text("marketLabel"),
            title: text("marketplaceTitle"),
            body: text("marketplaceText"),
            position: "center center",
            chipsList: [
              "Buy",
              "Sell",
              "Services",
              "50 free ads"
            ]
          })}

        </div>


        <!-- COVER STAR / COMPETITIONS -->

        ${visualCard({
          className: "pdv3-cover",
          image: "assets/home/cover-star.jpg",
          href: "members-gallery.html",
          label: text("coverLabel"),
          title: text("coverTitle"),
          body: text("coverText"),
          position: "center center",
          chipsList: [
            "Cover Star",
            "Competitions",
            "Editorial"
          ]
        })}


        <!-- HELP ANIMALS -->

        ${visualCard({
          className: "pdv3-help",
          image: "assets/home/help-animals.jpg",
          href: "pets-in-need.html",
          label: "♥ " + text("helpLabel") + " ♥",
          title: text("helpTitle"),
          body: text("helpText"),
          position: "center center",
          chipsList: [
            "♥ Rescue",
            "♥ Shelter",
            "♥ Urgent help",
            "♥ Share"
          ]
        })}


        <!-- PARTNERSHIPS -->

        ${visualCard({
          className: "pdv3-business",
          image: "assets/home/partners.jpg",
          href: "partners.html",
          label: text("businessLabel"),
          title: text("businessTitle"),
          body: text("businessText"),
          position: "center center",
          chipsList: [
            "Hotels",
            "Cafés",
            "Groomers",
            "Vets",
            "Brands",
            "Pet services"
          ]
        })}


      </div>


      <div class="pdv3-footer-message">

        <strong>
          Good pets. Brighter tomorrows.
        </strong>

        <span>
          PETS &amp; DOGUE · ONE WORLD. EVERY PET.
        </span>

      </div>

    </div>

  `;

  root.innerHTML = content;

}


/* =========================================================
   INIT
========================================================= */

function init() {
  renderHomepageV3();
}


if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    init,
    { once: true }
  );

} else {

  init();

}


window.addEventListener(
  "petsdogue:languagechange",
  () => {
    window.requestAnimationFrame(() => {
      renderHomepageV3();
    });
  }
);


})();
