"use strict";

/*
PETS & DOGUE — HOMEPAGE EDITORIAL V4
Меняет ТОЛЬКО наполнение главной страницы.
Шапка, боковое меню, Miso bubble и global shell не изменяются.
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
      lang = typeof value === "string" ? value : value?.code || "en";
    } else {
      lang =
        localStorage.getItem("pets_dogue_language") ||
        document.documentElement.lang ||
        "en";
    }
  } catch (error) {
    lang = "en";
  }

  lang = String(lang).toLowerCase().split("-")[0];
  return ALIASES[lang] || lang || "en";
}

const EN = {
  latest: "Latest Stories",
  explore: "Explore",
  membershipLabel: "PETS & DOGUE CLUB",
  membershipTitle: "More for your pet. All year.",
  membershipText:
    "Join a worldwide pet-loving community and unlock useful benefits throughout the PETS & DOGUE world.",
  discounts: "Member discounts",
  offers: "Special offers",
  contests: "Contests & voting",
  community: "Global community",
  marketplaceBenefit: "Marketplace benefits",

  petFriendlyLabel: "PET-FRIENDLY",
  petFriendlyTitle: "Go together.",
  petFriendlyText:
    "Discover cafés, hotels, restaurants, parks, beaches and services where pets are welcome.",

  healthLabel: "HEALTH & CARE",
  healthTitle: "Care with confidence.",
  healthText:
    "Useful health, wellbeing, grooming and responsible-care stories for everyday life.",

  coverLabel: "COVER STAR",
  coverTitle: "Your pet could be next.",
  coverText:
    "Meet our Cover Stars, enter your pet and vote for the personalities you love.",
  vote: "VOTE",

  communityLabel: "COMMUNITY",
  communityTitle: "One community. Every pet.",
  communityText:
    "Meet pet lovers, exchange recommendations and help each other across the world.",

  marketplaceLabel: "MARKETPLACE",
  marketplaceTitle: "Buy. Sell. Discover.",
  marketplaceText:
    "Useful products, services and community listings in one place.",

  greenLabel: "GREEN TOURISM",
  greenTitle: "Meet animals beyond the city.",
  greenText:
    "Discover farms, sanctuaries, wildlife parks and responsible animal experiences.",

  helpLabel: "HELP",
  helpTitle: "Seen. Shared. Helped.",
  helpText:
    "Give visibility to animals needing rescue, treatment, support or a new home.",

  ad: "ADVERTISEMENT",
  adTitle: "Your brand belongs here.",
  adText: "Premium video placement inside the PETS & DOGUE editorial experience.",
  advertise: "Advertise with us",

  discoverMore: "Discover more",
  join: "Join the Club",
  readMore: "Read more"
};

const RU = {
  latest: "Последние истории",
  explore: "Смотреть",
  membershipLabel: "КЛУБ PETS & DOGUE",
  membershipTitle: "Больше для вашего питомца. Весь год.",
  membershipText:
    "Присоединяйтесь к международному сообществу любителей животных и получайте полезные преимущества PETS & DOGUE.",
  discounts: "Скидки участникам",
  offers: "Спецпредложения",
  contests: "Конкурсы и голосования",
  community: "Мировое сообщество",
  marketplaceBenefit: "Преимущества Marketplace",

  petFriendlyLabel: "PET-FRIENDLY",
  petFriendlyTitle: "Вместе — куда угодно.",
  petFriendlyText:
    "Находите кафе, отели, рестораны, парки, пляжи и сервисы, где рады животным.",

  healthLabel: "ЗДОРОВЬЕ И УХОД",
  healthTitle: "Забота с уверенностью.",
  healthText:
    "Полезные материалы о здоровье, благополучии, груминге и ответственном уходе.",

  coverLabel: "COVER STAR",
  coverTitle: "Ваш питомец может быть следующим.",
  coverText:
    "Знакомьтесь с Cover Stars, добавляйте своего питомца и голосуйте за любимцев.",
  vote: "ГОЛОСОВАТЬ",

  communityLabel: "СООБЩЕСТВО",
  communityTitle: "Одно сообщество. Каждый питомец.",
  communityText:
    "Общайтесь с владельцами животных, делитесь рекомендациями и помогайте друг другу.",

  marketplaceLabel: "MARKETPLACE",
  marketplaceTitle: "Покупайте. Продавайте. Находите.",
  marketplaceText:
    "Полезные товары, услуги и объявления сообщества в одном месте.",

  greenLabel: "ЗЕЛЁНЫЙ ТУРИЗМ",
  greenTitle: "Мир животных за пределами города.",
  greenText:
    "Фермы, приюты, wildlife-парки и ответственные места для знакомства с животными.",

  helpLabel: "ПОМОЩЬ",
  helpTitle: "Увидели. Поделились. Помогли.",
  helpText:
    "Помогайте животным, которым нужен дом, лечение, спасение или поддержка.",

  ad: "РЕКЛАМА",
  adTitle: "Здесь может быть ваш бренд.",
  adText: "Премиальное видео-размещение внутри редакционной среды PETS & DOGUE.",
  advertise: "Реклама в PETS & DOGUE",

  discoverMore: "Смотреть больше",
  join: "Вступить в клуб",
  readMore: "Подробнее"
};

const UK = {
  latest: "Останні історії",
  explore: "Дивитися",
  membershipLabel: "КЛУБ PETS & DOGUE",
  membershipTitle: "Більше для вашого улюбленця. Увесь рік.",
  membershipText:
    "Приєднуйтеся до міжнародної спільноти любителів тварин та отримуйте корисні переваги PETS & DOGUE.",
  discounts: "Знижки учасникам",
  offers: "Спецпропозиції",
  contests: "Конкурси й голосування",
  community: "Світова спільнота",
  marketplaceBenefit: "Переваги Marketplace",

  petFriendlyLabel: "PET-FRIENDLY",
  petFriendlyTitle: "Разом — куди завгодно.",
  petFriendlyText:
    "Знаходьте кафе, готелі, ресторани, парки, пляжі та сервіси, де раді тваринам.",

  healthLabel: "ЗДОРОВ’Я І ДОГЛЯД",
  healthTitle: "Турбота з упевненістю.",
  healthText:
    "Корисні матеріали про здоров’я, добробут, грумінг і відповідальний догляд.",

  coverLabel: "COVER STAR",
  coverTitle: "Ваш улюбленець може бути наступним.",
  coverText:
    "Знайомтеся з Cover Stars, додавайте свого улюбленця та голосуйте за фаворитів.",
  vote: "ГОЛОСУВАТИ",

  communityLabel: "СПІЛЬНОТА",
  communityTitle: "Одна спільнота. Кожен улюбленець.",
  communityText:
    "Спілкуйтеся з власниками тварин, діліться рекомендаціями та допомагайте одне одному.",

  marketplaceLabel: "MARKETPLACE",
  marketplaceTitle: "Купуйте. Продавайте. Знаходьте.",
  marketplaceText:
    "Корисні товари, послуги та оголошення спільноти в одному місці.",

  greenLabel: "ЗЕЛЕНИЙ ТУРИЗМ",
  greenTitle: "Світ тварин за межами міста.",
  greenText:
    "Ферми, притулки, wildlife-парки та відповідальні місця для знайомства з тваринами.",

  helpLabel: "ДОПОМОГА",
  helpTitle: "Побачили. Поділилися. Допомогли.",
  helpText:
    "Допомагайте тваринам, яким потрібен дім, лікування, порятунок або підтримка.",

  ad: "РЕКЛАМА",
  adTitle: "Тут може бути ваш бренд.",
  adText: "Преміальне відео-розміщення в редакційному середовищі PETS & DOGUE.",
  advertise: "Реклама в PETS & DOGUE",

  discoverMore: "Дивитися більше",
  join: "Приєднатися до клубу",
  readMore: "Докладніше"
};

function t(key) {
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

  if (lang === "ru" && RU[key]) return RU[key];
  if (lang === "uk" && UK[key]) return UK[key];

  return EN[key] || "";
}

function esc(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function listenButton() {
  return `
    <button
      class="pdv4-listen"
      type="button"
      aria-label="Listen to this section"
      onclick="listenToSection(this)"
    >🔊</button>
  `;
}

function card({
  href,
  image,
  label,
  title,
  text,
  className = "",
  vote = false
}) {
  return `
    <article
      class="pdv4-card ${className}"
      data-speech-section
    >
      <a href="${href}" class="pdv4-card-link">
        <div class="pdv4-media">
          <img
            src="${image}"
            alt="${esc(title)}"
            loading="lazy"
          />
          <div class="pdv4-shade"></div>

          ${
            vote
              ? `<span class="pdv4-vote">♥ ${esc(t("vote"))}</span>`
              : ""
          }

          <div class="pdv4-overlay-copy">
            <span class="pdv4-label">${esc(label)}</span>
            <h2>${esc(title)}</h2>
          </div>
        </div>

        <div class="pdv4-card-copy">
          <p>${esc(text)}</p>
          <span class="pdv4-arrow">${esc(t("readMore"))} →</span>
        </div>
      </a>

      ${listenButton()}
    </article>
  `;
}function styles() {
  return `
<style id="pets-dogue-home-v4-styles">

.pdv4-home{
  --pd-black:#080808;
  --pd-ivory:#f4f0e8;
  --pd-gold:#c7a05b;
  --pd-line:rgba(255,255,255,.24);
  background:var(--pd-black);
  color:#fff;
  font-family:Arial,Helvetica,sans-serif;
}

.pdv4-home *{
  box-sizing:border-box;
}

.pdv4-home img{
  display:block;
  width:100%;
}

.pdv4-hero{
  position:relative;
  min-height:min(72vh,760px);
  overflow:hidden;
  background:#111;
}

.pdv4-hero img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center;
}

.pdv4-hero:after{
  content:"";
  position:absolute;
  inset:0;
  background:
    linear-gradient(
      to top,
      rgba(0,0,0,.68) 0%,
      rgba(0,0,0,.18) 48%,
      rgba(0,0,0,.05) 100%
    );
  pointer-events:none;
}

.pdv4-hero-copy{
  position:absolute;
  z-index:3;
  left:clamp(18px,5vw,70px);
  right:clamp(18px,5vw,70px);
  bottom:clamp(24px,6vw,70px);
  max-width:820px;
}

.pdv4-eyebrow,
.pdv4-label{
  display:block;
  font-size:10px;
  font-weight:900;
  letter-spacing:2px;
  text-transform:uppercase;
}

.pdv4-eyebrow{
  color:#fff;
  margin-bottom:11px;
}

.pdv4-hero h1{
  margin:0;
  font:400 clamp(49px,8vw,104px)/.88 Georgia,"Times New Roman",serif;
  letter-spacing:-3px;
  text-shadow:0 3px 30px rgba(0,0,0,.3);
}

.pdv4-hero h1 em{
  font-weight:400;
  font-style:italic;
}

.pdv4-listen{
  position:absolute;
  z-index:10;
  top:14px;
  right:14px;
  width:42px;
  height:42px;
  border-radius:50%;
  border:1px solid rgba(255,255,255,.62);
  background:rgba(0,0,0,.44);
  color:#fff;
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}

.pdv4-section{
  padding:38px 16px 48px;
}

.pdv4-section-head{
  max-width:1280px;
  margin:0 auto 22px;
  display:flex;
  align-items:end;
  justify-content:space-between;
  gap:20px;
  border-bottom:1px solid rgba(255,255,255,.28);
  padding-bottom:12px;
}

.pdv4-section-head h2{
  margin:0;
  font:400 clamp(30px,4vw,52px)/1 Georgia,"Times New Roman",serif;
}

.pdv4-section-head span{
  font-size:10px;
  font-weight:900;
  letter-spacing:1.6px;
  color:#bdb6aa;
}

.pdv4-grid{
  max-width:1280px;
  margin:auto;
  display:grid;
  grid-template-columns:repeat(12,minmax(0,1fr));
  grid-auto-flow:dense;
  gap:10px;
}

.pdv4-card{
  position:relative;
  background:#121212;
  overflow:hidden;
  min-width:0;
}

.pdv4-card-link{
  display:block;
  height:100%;
}

.pdv4-card.large{
  grid-column:span 7;
}

.pdv4-card.tall{
  grid-column:span 5;
}

.pdv4-card.medium{
  grid-column:span 5;
}

.pdv4-card.wide{
  grid-column:span 7;
}

.pdv4-card.small{
  grid-column:span 4;
}

.pdv4-media{
  position:relative;
  overflow:hidden;
  min-height:390px;
}

.pdv4-card.large .pdv4-media{
  min-height:620px;
}

.pdv4-card.tall .pdv4-media{
  min-height:620px;
}

.pdv4-card.wide .pdv4-media{
  min-height:440px;
}

.pdv4-card.small .pdv4-media{
  min-height:360px;
}

.pdv4-media img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  transition:transform .7s cubic-bezier(.2,.7,.2,1);
  filter:saturate(.88) contrast(.97);
}

.pdv4-card:hover .pdv4-media img{
  transform:scale(1.025);
}

.pdv4-shade{
  position:absolute;
  inset:0;
  background:
    linear-gradient(
      to top,
      rgba(0,0,0,.82) 0%,
      rgba(0,0,0,.26) 46%,
      rgba(0,0,0,.02) 74%
    );
}

.pdv4-overlay-copy{
  position:absolute;
  z-index:3;
  left:20px;
  right:20px;
  bottom:18px;
}

.pdv4-label{
  margin-bottom:7px;
  color:#e4c98f;
}

.pdv4-overlay-copy h2{
  margin:0;
  max-width:650px;
  font:400 clamp(28px,4vw,58px)/.94 Georgia,"Times New Roman",serif;
  letter-spacing:-1.4px;
  color:#fff;
}

.pdv4-card.small .pdv4-overlay-copy h2{
  font-size:clamp(25px,3vw,39px);
}

.pdv4-card-copy{
  padding:15px 18px 19px;
  background:#111;
  border-top:1px solid rgba(255,255,255,.08);
}

.pdv4-card-copy p{
  margin:0 0 12px;
  max-width:680px;
  color:#c9c5be;
  font-size:13px;
  line-height:1.48;
}

.pdv4-arrow{
  font-size:10px;
  font-weight:900;
  letter-spacing:1.1px;
  text-transform:uppercase;
  color:#fff;
}

.pdv4-vote{
  position:absolute;
  z-index:5;
  top:16px;
  left:16px;
  padding:10px 13px;
  border-radius:999px;
  background:#d71920;
  color:#fff;
  font-size:11px;
  font-weight:950;
  letter-spacing:.8px;
  box-shadow:0 8px 25px rgba(0,0,0,.25);
}

.pdv4-membership{
  max-width:1280px;
  margin:14px auto 0;
  padding:46px 0 12px;
}

.pdv4-membership-top{
  display:grid;
  grid-template-columns:.85fr 1.15fr;
  gap:28px;
  align-items:end;
  margin-bottom:24px;
}

.pdv4-membership-kicker{
  font-size:10px;
  font-weight:950;
  letter-spacing:2px;
  color:#d2b36f;
}

.pdv4-membership h2{
  margin:8px 0 0;
  font:400 clamp(40px,6vw,78px)/.9 Georgia,"Times New Roman",serif;
  letter-spacing:-2px;
}

.pdv4-membership-intro{
  color:#c8c3ba;
  font-size:15px;
  line-height:1.6;
  max-width:560px;
  margin:0;
}

.pdv4-benefits{
  display:grid;
  grid-template-columns:1.25fr repeat(4,.75fr);
  gap:8px;
}

.pdv4-benefit{
  position:relative;
  min-height:260px;
  overflow:hidden;
  background:#171717;
}

.pdv4-benefit:first-child{
  min-height:360px;
}

.pdv4-benefit img{
  position:absolute;
  inset:0;
  height:100%;
  object-fit:cover;
  filter:saturate(.86);
}

.pdv4-benefit:after{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(to top,rgba(0,0,0,.82),rgba(0,0,0,.02) 65%);
}

.pdv4-benefit span{
  position:absolute;
  z-index:2;
  left:14px;
  right:14px;
  bottom:14px;
  font:400 18px/1.05 Georgia,"Times New Roman",serif;
}

.pdv4-join{
  display:inline-flex;
  margin-top:18px;
  min-height:44px;
  align-items:center;
  padding:0 20px;
  border-radius:999px;
  background:#fff;
  color:#090909;
  font-size:11px;
  font-weight:950;
  letter-spacing:.8px;
  text-transform:uppercase;
}

.pdv4-ad{
  max-width:1280px;
  margin:46px auto;
  min-height:300px;
  position:relative;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.23);
  background:#111;
}

.pdv4-ad img{
  position:absolute;
  inset:0;
  height:100%;
  object-fit:cover;
  filter:brightness(.54) saturate(.72);
}

.pdv4-ad:after{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at 70% 30%,rgba(255,255,255,.10),transparent 40%),
    linear-gradient(90deg,rgba(0,0,0,.83),rgba(0,0,0,.18));
}

.pdv4-ad-copy{
  position:relative;
  z-index:3;
  min-height:300px;
  padding:34px;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  max-width:650px;
}

.pdv4-ad-label{
  font-size:9px;
  letter-spacing:2px;
  font-weight:900;
  margin-bottom:8px;
  color:#d0cbc3;
}

.pdv4-ad h2{
  margin:0;
  font:400 clamp(34px,5vw,62px)/.92 Georgia,"Times New Roman",serif;
}

.pdv4-ad p{
  max-width:530px;
  margin:12px 0 17px;
  color:#d1ccc4;
  line-height:1.5;
  font-size:13px;
}

.pdv4-ad a{
  display:inline-flex;
  align-self:flex-start;
  border-bottom:1px solid #fff;
  padding-bottom:5px;
  font-size:10px;
  font-weight:900;
  letter-spacing:1px;
  text-transform:uppercase;
}

@media(max-width:800px){

  .pdv4-hero{
    min-height:500px;
  }

  .pdv4-hero h1{
    font-size:52px;
    letter-spacing:-2px;
  }

  .pdv4-section{
    padding:25px 8px 36px;
  }

  .pdv4-section-head{
    margin-bottom:8px;
    padding:0 7px 10px;
  }

  .pdv4-grid{
    gap:7px;
  }

  .pdv4-card.large{
    grid-column:span 7;
  }

  .pdv4-card.tall{
    grid-column:span 5;
  }

  .pdv4-card.medium{
    grid-column:span 6;
  }

  .pdv4-card.wide{
    grid-column:span 6;
  }

  .pdv4-card.small{
    grid-column:span 6;
  }

  .pdv4-card.large .pdv4-media,
  .pdv4-card.tall .pdv4-media{
    min-height:390px;
  }

  .pdv4-card.medium .pdv4-media,
  .pdv4-card.wide .pdv4-media{
    min-height:300px;
  }

  .pdv4-card.small .pdv4-media{
    min-height:270px;
  }

  .pdv4-overlay-copy{
    left:13px;
    right:13px;
    bottom:12px;
  }

  .pdv4-overlay-copy h2,
  .pdv4-card.small .pdv4-overlay-copy h2{
    font-size:27px;
  }

  .pdv4-card-copy{
    padding:12px 13px 15px;
  }

  .pdv4-card-copy p{
    font-size:11px;
  }

  .pdv4-membership{
    padding:32px 8px 5px;
  }

  .pdv4-membership-top{
    grid-template-columns:1fr;
    gap:12px;
    padding:0 8px;
  }

  .pdv4-membership h2{
    font-size:45px;
  }

  .pdv4-benefits{
    grid-template-columns:1.3fr 1fr;
  }

  .pdv4-benefit,
  .pdv4-benefit:first-child{
    min-height:190px;
  }

  .pdv4-benefit:first-child{
    grid-row:span 2;
    min-height:388px;
  }

  .pdv4-ad{
    margin:34px 8px;
    min-height:250px;
  }

  .pdv4-ad-copy{
    min-height:250px;
    padding:22px;
  }

}

@media(max-width:460px){

  .pdv4-hero{
    min-height:410px;
  }

  .pdv4-hero-copy{
    left:16px;
    right:16px;
    bottom:22px;
  }

  .pdv4-hero h1{
    font-size:43px;
  }

  .pdv4-grid{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }

  .pdv4-card.large,
  .pdv4-card.tall,
  .pdv4-card.medium,
  .pdv4-card.wide,
  .pdv4-card.small{
    grid-column:span 1;
  }

  .pdv4-card.large{
    grid-column:span 2;
  }

  .pdv4-card.large .pdv4-media{
    min-height:360px;
  }

  .pdv4-card.tall .pdv4-media,
  .pdv4-card.medium .pdv4-media,
  .pdv4-card.wide .pdv4-media,
  .pdv4-card.small .pdv4-media{
    min-height:235px;
  }

  .pdv4-card-copy p{
    display:none;
  }

  .pdv4-card-copy{
    padding:10px 11px 12px;
  }

  .pdv4-overlay-copy h2,
  .pdv4-card.small .pdv4-overlay-copy h2{
    font-size:23px;
  }

  .pdv4-label{
    font-size:8px;
    letter-spacing:1.3px;
  }

  .pdv4-vote{
    top:10px;
    left:10px;
    padding:8px 10px;
    font-size:9px;
  }

  .pdv4-benefits{
    grid-template-columns:repeat(2,1fr);
  }

  .pdv4-benefit:first-child{
    grid-column:span 2;
    grid-row:auto;
    min-height:260px;
  }

  .pdv4-benefit{
    min-height:150px;
  }

  .pdv4-benefit span{
    font-size:15px;
  }

}

</style>
  `;
}function render() {

  const root = document.querySelector(ROOT_SELECTOR);
  if (!root) return;

  const hero = root.querySelector(".pd-home-hero");

  if (hero) {
    hero.innerHTML = `
      <img
        src="hero-main.jpg"
        alt="PETS & DOGUE — One world. Every pet."
      />

      ${listenButton()}

      <div class="pd-hero-copy">
        <span class="pd-kicker">
          PETS & DOGUE
        </span>

        <h1 class="notranslate" translate="no">
          One world.<br/>
          <em>Every pet.</em>
        </h1>
      </div>
    `;
  }

  let oldContent = root.querySelector(".pdv4-home");

  if (oldContent) {
    oldContent.remove();
  }

  root.insertAdjacentHTML(
    "beforeend",
    `
    <div class="pdv4-home">

      <section class="pdv4-section">

        <div class="pdv4-section-head">
          <h2>${esc(t("latest"))}</h2>
          <span>PETS & DOGUE · EDITORIAL</span>
        </div>

        <div class="pdv4-grid">

          ${card({
            href: "pet-friendly-places.html",
            image: "pet-friendly.jpg",
            label: t("petFriendlyLabel"),
            title: t("petFriendlyTitle"),
            text: t("petFriendlyText"),
            className: "large"
          })}

          ${card({
            href: "members-gallery.html",
            image: "cover-star/cover-miso-luxury.png",
            label: t("coverLabel"),
            title: t("coverTitle"),
            text: t("coverText"),
            className: "tall",
            vote: true
          })}

          ${card({
            href: "wellness.html",
            image: "health.jpg",
            label: t("healthLabel"),
            title: t("healthTitle"),
            text: t("healthText"),
            className: "medium"
          })}

          ${card({
            href: "local-community.html",
            image: "community.jpg",
            label: t("communityLabel"),
            title: t("communityTitle"),
            text: t("communityText"),
            className: "wide"
          })}

        </div>


        <section
          class="pdv4-membership"
          data-speech-section
        >

          ${listenButton()}

          <div class="pdv4-membership-top">

            <div>
              <div class="pdv4-membership-kicker">
                ${esc(t("membershipLabel"))}
              </div>

              <h2>
                ${esc(t("membershipTitle"))}
              </h2>
            </div>

            <p class="pdv4-membership-intro">
              ${esc(t("membershipText"))}
            </p>

          </div>

          <div class="pdv4-benefits">

            <a class="pdv4-benefit" href="club.html">
              <img
                src="club.jpg"
                alt="${esc(t("membershipTitle"))}"
                loading="lazy"
              />
              <span>${esc(t("community"))}</span>
            </a>

            <a class="pdv4-benefit" href="special-offers.html">
              <img
                src="club-partner-discounts.png"
                alt="${esc(t("discounts"))}"
                loading="lazy"
              />
              <span>${esc(t("discounts"))}</span>
            </a>

            <a class="pdv4-benefit" href="wellness.html">
              <img
                src="club-pet-health.png"
                alt="${esc(t("offers"))}"
                loading="lazy"
              />
              <span>${esc(t("offers"))}</span>
            </a>

            <a class="pdv4-benefit" href="contests.html">
              <img
                src="cover-star/cover-surf-parrot.png"
                alt="${esc(t("contests"))}"
                loading="lazy"
              />
              <span>${esc(t("contests"))}</span>
            </a>

            <a class="pdv4-benefit" href="pet-marketplace.html">
              <img
                src="marketplace.jpg"
                alt="${esc(t("marketplaceBenefit"))}"
                loading="lazy"
              />
              <span>${esc(t("marketplaceBenefit"))}</span>
            </a>

          </div>

          <a class="pdv4-join" href="club.html">
            ${esc(t("join"))} →
          </a>

        </section>


        <section
          class="pdv4-ad"
          data-speech-section
        >

          <img
            src="partners.jpg"
            alt="PETS & DOGUE advertising"
            loading="lazy"
          />

          ${listenButton()}

          <div class="pdv4-ad-copy">
            <div class="pdv4-ad-label">
              ${esc(t("ad"))} · VIDEO
            </div>

            <h2>
              ${esc(t("adTitle"))}
            </h2>

            <p>
              ${esc(t("adText"))}
            </p>

            <a href="partners.html">
              ${esc(t("advertise"))} →
            </a>
          </div>

        </section>


        <div class="pdv4-grid">

          ${card({
            href: "green-tourism.html",
            image: "green-tourism.jpg",
            label: t("greenLabel"),
            title: t("greenTitle"),
            text: t("greenText"),
            className: "tall"
          })}

          ${card({
            href: "pet-marketplace.html",
            image: "marketplace.jpg",
            label: t("marketplaceLabel"),
            title: t("marketplaceTitle"),
            text: t("marketplaceText"),
            className: "large"
          })}

          ${card({
            href: "pets-in-need.html",
            image: "help-animals.jpg",
            label: t("helpLabel"),
            title: t("helpTitle"),
            text: t("helpText"),
            className: "wide"
          })}

          ${card({
            href: "pet-friendly-places.html",
            image: "pet-friendly-stays.jpg",
            label: t("petFriendlyLabel"),
            title: t("petFriendlyTitle"),
            text: t("petFriendlyText"),
            className: "medium"
          })}

          ${card({
            href: "photos.html",
            image: "cover-star/cover-turtle-spa.png",
            label: "PETS & DOGUE",
            title: t("discoverMore"),
            text: t("communityText"),
            className: "small"
          })}

          ${card({
            href: "pet-fashion.html",
            image: "cover-star/cover-horse-salon.png",
            label: "FASHION",
            title: t("discoverMore"),
            text: t("coverText"),
            className: "small"
          })}

          ${card({
            href: "articles.html",
            image: "cover-star/cover-capri-sphynx.png",
            label: "EDITORIAL",
            title: t("discoverMore"),
            text: t("healthText"),
            className: "small"
          })}

        </div>


        <section
          class="pdv4-ad"
          data-speech-section
        >

          <img
            src="cover-star/cover-golf-bulldog.png"
            alt="PETS & DOGUE premium video advertising"
            loading="lazy"
          />

          ${listenButton()}

          <div class="pdv4-ad-copy">
            <div class="pdv4-ad-label">
              ${esc(t("ad"))} · VIDEO
            </div>

            <h2>
              ${esc(t("adTitle"))}
            </h2>

            <p>
              ${esc(t("adText"))}
            </p>

            <a href="partners.html">
              ${esc(t("advertise"))} →
            </a>
          </div>

        </section>

      </section>

    </div>
    `
  );

  const oldSections = Array.from(root.children);

  oldSections.forEach((element) => {
    if (
      element.classList.contains("pd-home-hero") ||
      element.classList.contains("pdv4-home")
    ) {
      return;
    }

    element.style.display = "none";
  });

}

function refreshLanguage() {
  render();
}

function init() {

  if (!document.getElementById("pets-dogue-home-v4-styles")) {
    document.head.insertAdjacentHTML(
      "beforeend",
      styles()
    );
  }

  render();

  window.addEventListener(
    "petsdogue:languagechange",
    refreshLanguage
  );

  window.addEventListener(
    "languagechange",
    refreshLanguage
  );

  document.addEventListener(
    "pd:languagechange",
    refreshLanguage
  );

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})();
