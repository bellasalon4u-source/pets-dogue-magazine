"use strict";

/*
PETS & DOGUE — HOMEPAGE EDITORIAL V5

Меняет ТОЛЬКО наполнение главной страницы.

НЕ ИЗМЕНЯЕТ:
- global header
- navigation
- side menu
- ticker
- language menu
- Miso bubble
- global shell

Сохраняет:
- TTS / listen buttons
- current language
- external multilingual translations
- RTL handled by global shell
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
      const value =
        window.PetsDogueLanguage.getCurrentLanguage();

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
   ENGLISH
========================================================= */

const EN = {
  latest: "Latest Stories",

  membershipLabel: "PETS & DOGUE CLUB",
  membershipTitle: "More for your pet. All year.",
  membershipText:
    "Join a worldwide pet-loving community and unlock useful benefits throughout the PETS & DOGUE world.",

  discounts: "Member discounts",
  offers: "Pet health & care",
  contests: "Contests & voting",
  community: "Global community",
  marketplaceBenefit: "Marketplace benefits",

  petFriendlyLabel: "PET-FRIENDLY PLACES",
  petFriendlyTitle: "Go together.",
  petFriendlyText:
    "Find cafés, hotels, restaurants, parks, beaches and services where you and your pet are welcome.",

  healthLabel: "HEALTH & CARE",
  healthTitle: "Care with confidence.",
  healthText:
    "Practical guidance on pet health, wellbeing, grooming and responsible everyday care.",

  coverLabel: "COVER STAR",
  coverTitle: "Your pet could be next.",
  coverText:
    "Discover PETS & DOGUE Cover Stars, enter your pet and take part in community voting.",
  vote: "VOTE",

  communityLabel: "LOCAL COMMUNITY",
  communityTitle: "People nearby can help.",
  communityText:
    "Connect with pet people nearby, exchange local recommendations, share information and help each other.",

  marketplaceLabel: "MARKETPLACE",
  marketplaceTitle: "Everything useful for pet life.",
  marketplaceText:
    "Discover pet products, services and community listings, or publish your own Marketplace advert.",

  greenLabel: "GREEN TOURISM",
  greenTitle: "Meet animals beyond the city.",
  greenText:
    "Explore farms, sanctuaries, wildlife parks and responsible animal experiences beyond everyday city life.",

  helpLabel: "HELP ANIMALS",
  helpTitle: "Seen. Shared. Helped.",
  helpText:
    "Give visibility to animals that need rescue, treatment, support, foster care or a new home.",

  photosLabel: "PHOTOS",
  photosTitle: "Pets through the lens.",
  photosText:
    "Discover expressive pet photography, visual stories and memorable moments from the PETS & DOGUE world.",

  fashionLabel: "FASHION",
  fashionTitle: "Style with personality.",
  fashionText:
    "Explore pet fashion, grooming inspiration, accessories and editorial looks created with personality.",

  articlesLabel: "ARTICLES",
  articlesTitle: "Stories worth reading.",
  articlesText:
    "Read original stories, interviews, useful guides, travel ideas and editorial features about life with pets.",

  ad: "ADVERTISEMENT",
  adTitle: "Your brand belongs here.",
  adText:
    "Premium brand and video placement inside the PETS & DOGUE editorial experience.",
  advertise: "Advertise with us",

  join: "Join the Club",
  readMore: "Read more"
};

/* =========================================================
   RUSSIAN
========================================================= */

const RU = {
  latest: "Последние истории",

  membershipLabel: "КЛУБ PETS & DOGUE",
  membershipTitle: "Больше для вашего питомца. Весь год.",
  membershipText:
    "Присоединяйтесь к международному сообществу любителей животных и получайте полезные преимущества PETS & DOGUE.",

  discounts: "Скидки участникам",
  offers: "Здоровье и уход",
  contests: "Конкурсы и голосования",
  community: "Мировое сообщество",
  marketplaceBenefit: "Преимущества Marketplace",

  petFriendlyLabel: "PET-FRIENDLY МЕСТА",
  petFriendlyTitle: "Вместе — куда угодно.",
  petFriendlyText:
    "Находите кафе, отели, рестораны, парки, пляжи и сервисы, где рады вам и вашему питомцу.",

  healthLabel: "ЗДОРОВЬЕ И УХОД",
  healthTitle: "Забота с уверенностью.",
  healthText:
    "Практичные материалы о здоровье, благополучии, груминге и ответственном ежедневном уходе.",

  coverLabel: "COVER STAR",
  coverTitle: "Ваш питомец может быть следующим.",
  coverText:
    "Знакомьтесь со звёздами обложки PETS & DOGUE, добавляйте своего питомца и участвуйте в голосовании.",
  vote: "ГОЛОСОВАТЬ",

  communityLabel: "ЛОКАЛЬНОЕ СООБЩЕСТВО",
  communityTitle: "Рядом есть люди, которые помогут.",
  communityText:
    "Находите владельцев животных рядом, обменивайтесь местными рекомендациями, информацией и помогайте друг другу.",

  marketplaceLabel: "MARKETPLACE",
  marketplaceTitle: "Всё полезное для жизни с питомцем.",
  marketplaceText:
    "Находите товары, услуги и объявления для животных или размещайте собственные объявления в Marketplace.",

  greenLabel: "ЗЕЛЁНЫЙ ТУРИЗМ",
  greenTitle: "Познакомьтесь с животными ближе.",
  greenText:
    "Открывайте фермы, заповедники, wildlife-парки и ответственные места для знакомства с животными.",

  helpLabel: "ПОМОЩЬ ЖИВОТНЫМ",
  helpTitle: "Увидели. Поделились. Помогли.",
  helpText:
    "Помогайте животным, которым нужны спасение, лечение, поддержка, временный или новый дом.",

  photosLabel: "ФОТО",
  photosTitle: "Питомцы в объективе.",
  photosText:
    "Открывайте выразительную фотографию животных, визуальные истории и яркие моменты мира PETS & DOGUE.",

  fashionLabel: "МОДА",
  fashionTitle: "Стиль с характером.",
  fashionText:
    "Мода для питомцев, идеи груминга, аксессуары и редакционные образы с индивидуальностью.",

  articlesLabel: "СТАТЬИ",
  articlesTitle: "Истории, которые стоит читать.",
  articlesText:
    "Оригинальные истории, интервью, полезные гиды, путешествия и редакционные материалы о жизни с питомцами.",

  ad: "РЕКЛАМА",
  adTitle: "Здесь может быть ваш бренд.",
  adText:
    "Премиальное бренд- и видео-размещение внутри редакционной среды PETS & DOGUE.",
  advertise: "Реклама в PETS & DOGUE",

  join: "Вступить в клуб",
  readMore: "Подробнее"
};

/* =========================================================
   UKRAINIAN
========================================================= */

const UK = {
  latest: "Останні історії",

  membershipLabel: "КЛУБ PETS & DOGUE",
  membershipTitle: "Більше для вашого улюбленця. Увесь рік.",
  membershipText:
    "Приєднуйтеся до міжнародної спільноти любителів тварин та отримуйте корисні переваги PETS & DOGUE.",

  discounts: "Знижки учасникам",
  offers: "Здоров’я і догляд",
  contests: "Конкурси й голосування",
  community: "Світова спільнота",
  marketplaceBenefit: "Переваги Marketplace",

  petFriendlyLabel: "PET-FRIENDLY МІСЦЯ",
  petFriendlyTitle: "Разом — куди завгодно.",
  petFriendlyText:
    "Знаходьте кафе, готелі, ресторани, парки, пляжі та сервіси, де раді вам і вашому улюбленцю.",

  healthLabel: "ЗДОРОВ’Я І ДОГЛЯД",
  healthTitle: "Турбота з упевненістю.",
  healthText:
    "Практичні матеріали про здоров’я, добробут, грумінг і відповідальний щоденний догляд.",

  coverLabel: "COVER STAR",
  coverTitle: "Ваш улюбленець може бути наступним.",
  coverText:
    "Знайомтеся із зірками обкладинки PETS & DOGUE, додавайте свого улюбленця та беріть участь у голосуванні.",
  vote: "ГОЛОСУВАТИ",

  communityLabel: "ЛОКАЛЬНА СПІЛЬНОТА",
  communityTitle: "Поруч є люди, які допоможуть.",
  communityText:
    "Знаходьте власників тварин поруч, обмінюйтеся місцевими рекомендаціями, інформацією та допомагайте одне одному.",

  marketplaceLabel: "MARKETPLACE",
  marketplaceTitle: "Усе корисне для життя з улюбленцем.",
  marketplaceText:
    "Знаходьте товари, послуги й оголошення для тварин або публікуйте власні оголошення у Marketplace.",

  greenLabel: "ЗЕЛЕНИЙ ТУРИЗМ",
  greenTitle: "Познайомтеся з тваринами ближче.",
  greenText:
    "Відкривайте ферми, заповідники, wildlife-парки та відповідальні місця для знайомства з тваринами.",

  helpLabel: "ДОПОМОГА ТВАРИНАМ",
  helpTitle: "Побачили. Поділилися. Допомогли.",
  helpText:
    "Допомагайте тваринам, яким потрібні порятунок, лікування, підтримка, тимчасовий або новий дім.",

  photosLabel: "ФОТО",
  photosTitle: "Улюбленці в об’єктиві.",
  photosText:
    "Відкривайте виразну фотографію тварин, візуальні історії та яскраві моменти світу PETS & DOGUE.",

  fashionLabel: "МОДА",
  fashionTitle: "Стиль із характером.",
  fashionText:
    "Мода для улюбленців, ідеї грумінгу, аксесуари та редакційні образи з індивідуальністю.",

  articlesLabel: "СТАТТІ",
  articlesTitle: "Історії, які варто читати.",
  articlesText:
    "Оригінальні історії, інтерв’ю, корисні гіди, подорожі та редакційні матеріали про життя з тваринами.",

  ad: "РЕКЛАМА",
  adTitle: "Тут може бути ваш бренд.",
  adText:
    "Преміальне бренд- і відеорозміщення в редакційному середовищі PETS & DOGUE.",
  advertise: "Реклама в PETS & DOGUE",

  join: "Приєднатися до клубу",
  readMore: "Докладніше"
};

/* =========================================================
   TRANSLATION
========================================================= */

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

  if (lang === "ru" && RU[key]) {
    return RU[key];
  }

  if (lang === "uk" && UK[key]) {
    return UK[key];
  }

  return EN[key] || "";
}

function esc(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* =========================================================
   ACCESSIBILITY / TTS
========================================================= */

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

/* =========================================================
   CARD
========================================================= */

function card({
  href,
  image,
  label,
  title,
  text,
  className = "",
  vote = false,
  accent = false
}) {
  return `
    <article
      class="pdv4-card ${className} ${accent ? "pdv4-accent" : ""}"
      data-speech-section
    >
      <a
        href="${href}"
        class="pdv4-card-link"
      >
        <div class="pdv4-media">
          <img
            src="${image}"
            alt="${esc(title)}"
            loading="lazy"
          />

          <div class="pdv4-shade"></div>

          ${
            vote
              ? `
                <span class="pdv4-vote">
                  ♥ ${esc(t("vote"))}
                </span>
              `
              : ""
          }

          <div class="pdv4-overlay-copy">
            <span class="pdv4-label">
              ${esc(label)}
            </span>

            <h2>
              ${esc(title)}
            </h2>
          </div>
        </div>

        <div class="pdv4-card-copy">
          <p>
            ${esc(text)}
          </p>

          <span class="pdv4-arrow">
            ${esc(t("readMore"))} →
          </span>
        </div>
      </a>

      ${listenButton()}
    </article>
  `;
}

/* =========================================================
   STYLES
========================================================= */

function styles() {
  return `
<style id="pets-dogue-home-v4-styles">

.pdv4-home{
  --pd-black:#080808;
  --pd-card:#111111;
  --pd-ivory:#f4f0e8;
  --pd-gold:#c7a05b;
  --pd-red:#d71920;
  --pd-red-soft:#ef3e46;
  --pd-line:rgba(255,255,255,.24);

  background:var(--pd-black);
  color:#fff;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}

.pdv4-home *{
  box-sizing:border-box;
}

.pdv4-home a{
  color:inherit;
  text-decoration:none;
}

.pdv4-home img{
  display:block;
  width:100%;
}

/* HERO */

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

  font:
    400
    clamp(49px,8vw,104px)/.88
    Georgia,
    "Times New Roman",
    serif;

  letter-spacing:-3px;

  text-shadow:
    0 3px 30px rgba(0,0,0,.3);
}

.pdv4-hero h1 em{
  font-weight:400;
  font-style:italic;
}

/* LISTEN BUTTON */

.pdv4-listen{
  position:absolute;
  z-index:10;

  top:14px;
  right:14px;

  width:42px;
  height:42px;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:0;

  border-radius:50%;

  border:
    1px solid
    rgba(255,255,255,.62);

  background:
    rgba(0,0,0,.44);

  color:#fff;

  cursor:pointer;

  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}

/* MAIN SECTION */

.pdv4-section{
  padding:
    38px
    16px
    48px;
}

.pdv4-section-head{
  max-width:1280px;

  margin:
    0 auto 22px;

  display:flex;
  align-items:end;
  justify-content:space-between;

  gap:20px;

  border-bottom:
    1px solid
    rgba(255,255,255,.28);

  padding-bottom:12px;
}

.pdv4-section-head h2{
  margin:0;

  font:
    400
    clamp(30px,4vw,52px)/1
    Georgia,
    "Times New Roman",
    serif;
}

.pdv4-section-head span{
  font-size:10px;
  font-weight:900;
  letter-spacing:1.6px;

  color:#bdb6aa;
}

/* GRID */

.pdv4-grid{
  max-width:1280px;

  margin:auto;

  display:grid;

  grid-template-columns:
    repeat(
      12,
      minmax(0,1fr)
    );

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

  transition:
    transform
    .7s
    cubic-bezier(.2,.7,.2,1);

  filter:
    saturate(.88)
    contrast(.97);
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
      rgba(0,0,0,.84) 0%,
      rgba(0,0,0,.29) 46%,
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
  width:max-content;
  max-width:100%;

  margin-bottom:7px;

  color:#e4c98f;
}

/* subtle editorial red accent */

.pdv4-accent .pdv4-label{
  color:#fff;

  padding-left:10px;

  border-left:
    3px solid
    var(--pd-red);
}

.pdv4-overlay-copy h2{
  margin:0;

  max-width:650px;

  font:
    400
    clamp(28px,4vw,58px)/.94
    Georgia,
    "Times New Roman",
    serif;

  letter-spacing:-1.4px;

  color:#fff;
}

.pdv4-card.small
.pdv4-overlay-copy h2{
  font-size:
    clamp(25px,3vw,39px);
}

.pdv4-card-copy{
  padding:
    15px
    18px
    19px;

  background:#111;

  border-top:
    1px solid
    rgba(255,255,255,.08);
}

.pdv4-card-copy p{
  margin:
    0 0 12px;

  max-width:680px;

  color:#c9c5be;

  font-size:13px;
  line-height:1.48;
}

.pdv4-arrow{
  display:inline-block;

  font-size:10px;
  font-weight:900;

  letter-spacing:1.1px;

  text-transform:uppercase;

  color:#fff;
}

.pdv4-accent .pdv4-arrow{
  color:#fff;

  border-bottom:
    2px solid
    var(--pd-red);

  padding-bottom:3px;
}

.pdv4-vote{
  position:absolute;
  z-index:5;

  top:16px;
  left:16px;

  padding:
    10px
    13px;

  border-radius:999px;

  background:
    var(--pd-red);

  color:#fff;

  font-size:11px;
  font-weight:950;

  letter-spacing:.8px;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.25);
}/* =========================================================
   CLUB
========================================================= */

.pdv4-membership{
  max-width:1280px;

  margin:
    14px auto 0;

  padding:
    46px 0 12px;

  position:relative;
}

.pdv4-membership-top{
  display:grid;

  grid-template-columns:
    .85fr 1.15fr;

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
  margin:
    8px 0 0;

  font:
    400
    clamp(40px,6vw,78px)/.9
    Georgia,
    "Times New Roman",
    serif;

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

  grid-template-columns:
    1.25fr
    repeat(4,.75fr);

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

  filter:
    saturate(.86);
}

.pdv4-benefit:after{
  content:"";

  position:absolute;
  inset:0;

  background:
    linear-gradient(
      to top,
      rgba(0,0,0,.82),
      rgba(0,0,0,.02) 65%
    );
}

.pdv4-benefit span{
  position:absolute;
  z-index:2;

  left:14px;
  right:14px;
  bottom:14px;

  font:
    400
    18px/1.05
    Georgia,
    "Times New Roman",
    serif;
}

.pdv4-benefit:nth-child(2) span,
.pdv4-benefit:nth-child(4) span{
  padding-left:9px;

  border-left:
    3px solid
    var(--pd-red);
}

.pdv4-join{
  display:inline-flex;

  margin:
    18px 0 0;

  min-height:44px;

  align-items:center;

  padding:
    0 20px;

  border-radius:999px;

  background:#fff;

  color:#090909 !important;

  font-size:11px;
  font-weight:950;

  letter-spacing:.8px;

  text-transform:uppercase;

  transition:
    background .2s ease,
    color .2s ease;
}

.pdv4-join:hover{
  background:var(--pd-red);
  color:#fff !important;
}

/* =========================================================
   ADVERTISEMENT
========================================================= */

.pdv4-ad{
  max-width:1280px;

  margin:
    46px auto;

  min-height:300px;

  position:relative;

  overflow:hidden;

  border:
    1px solid
    rgba(255,255,255,.23);

  background:#111;
}

.pdv4-ad:before{
  content:"";

  position:absolute;
  z-index:4;

  top:0;
  left:0;

  width:72px;
  height:3px;

  background:
    var(--pd-red);
}

.pdv4-ad img{
  position:absolute;
  inset:0;

  height:100%;

  object-fit:cover;

  filter:
    brightness(.54)
    saturate(.72);
}

.pdv4-ad:after{
  content:"";

  position:absolute;
  inset:0;

  background:
    radial-gradient(
      circle at 70% 30%,
      rgba(255,255,255,.10),
      transparent 40%
    ),
    linear-gradient(
      90deg,
      rgba(0,0,0,.83),
      rgba(0,0,0,.18)
    );
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

  color:
    var(--pd-red-soft);
}

.pdv4-ad h2{
  margin:0;

  font:
    400
    clamp(34px,5vw,62px)/.92
    Georgia,
    "Times New Roman",
    serif;
}

.pdv4-ad p{
  max-width:530px;

  margin:
    12px 0 17px;

  color:#d1ccc4;

  line-height:1.5;

  font-size:13px;
}

.pdv4-ad a{
  display:inline-flex;

  align-self:flex-start;

  border-bottom:
    2px solid
    var(--pd-red);

  padding-bottom:5px;

  font-size:10px;
  font-weight:900;

  letter-spacing:1px;

  text-transform:uppercase;
}

/* =========================================================
   TABLET
========================================================= */

@media(max-width:800px){

  .pdv4-hero{
    min-height:500px;
  }

  .pdv4-hero h1{
    font-size:52px;
    letter-spacing:-2px;
  }

  .pdv4-section{
    padding:
      25px
      8px
      36px;
  }

  .pdv4-section-head{
    margin-bottom:8px;

    padding:
      0 7px 10px;
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
  .pdv4-card.small
  .pdv4-overlay-copy h2{
    font-size:27px;
  }

  .pdv4-card-copy{
    padding:
      12px
      13px
      15px;
  }

  .pdv4-card-copy p{
    font-size:11px;
  }

  .pdv4-membership{
    padding:
      32px
      8px
      5px;
  }

  .pdv4-membership-top{
    grid-template-columns:1fr;

    gap:12px;

    padding:
      0 8px;
  }

  .pdv4-membership h2{
    font-size:45px;
  }

  .pdv4-benefits{
    grid-template-columns:
      1.3fr 1fr;
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
    margin:
      34px 8px;

    min-height:250px;
  }

  .pdv4-ad-copy{
    min-height:250px;
    padding:22px;
  }
}

/* =========================================================
   MOBILE
========================================================= */

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

  .pdv4-section{
    padding:
      22px
      6px
      34px;
  }

  .pdv4-section-head{
    margin:
      0 2px 8px;

    padding:
      0 5px 9px;

    align-items:flex-end;

    gap:8px;
  }

  .pdv4-section-head h2{
    font-size:29px;
    line-height:.95;
  }

  .pdv4-section-head span{
    font-size:7px;

    letter-spacing:1px;

    text-align:right;
  }

  .pdv4-grid{
    grid-template-columns:
      repeat(
        12,
        minmax(0,1fr)
      );

    grid-auto-flow:dense;

    gap:5px;
  }

  .pdv4-card{
    min-width:0;
    border-radius:0;
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

  .pdv4-card.large .pdv4-media{
    min-height:355px;
  }

  .pdv4-card.tall .pdv4-media{
    min-height:285px;
  }

  .pdv4-card.medium .pdv4-media{
    min-height:245px;
  }

  .pdv4-card.wide .pdv4-media{
    min-height:300px;
  }

  .pdv4-card.small .pdv4-media{
    min-height:205px;
  }

  .pdv4-card:nth-child(2)
  .pdv4-media img{
    object-position:
      center 36%;
  }

  .pdv4-media img{
    filter:
      saturate(.84)
      contrast(.97)
      brightness(.97);
  }

  .pdv4-shade{
    background:
      linear-gradient(
        to top,
        rgba(0,0,0,.80) 0%,
        rgba(0,0,0,.30) 42%,
        rgba(0,0,0,.04) 72%
      );
  }

  .pdv4-overlay-copy{
    left:11px;
    right:10px;
    bottom:10px;
  }

  .pdv4-overlay-copy h2,
  .pdv4-card.small
  .pdv4-overlay-copy h2{
    font-size:21px;

    line-height:.94;

    letter-spacing:-.7px;
  }

  .pdv4-card.large
  .pdv4-overlay-copy h2{
    font-size:29px;
  }

  .pdv4-card.wide
  .pdv4-overlay-copy h2{
    font-size:25px;
  }

  .pdv4-card.small
  .pdv4-overlay-copy h2{
    font-size:18px;
  }

  .pdv4-label{
    margin-bottom:5px;

    font-size:7px;

    letter-spacing:1.15px;
  }

  /*
  IMPORTANT:
  Earlier mobile version hid the descriptions completely.
  They are now visible, but compact.
  */

  .pdv4-card-copy{
    min-height:74px;

    padding:
      9px
      10px
      10px;
  }

  .pdv4-card-copy p{
    display:-webkit-box;

    -webkit-box-orient:vertical;
    -webkit-line-clamp:3;

    overflow:hidden;

    margin:
      0 0 7px;

    color:#aaa59d;

    font-size:8.5px;

    line-height:1.35;
  }

  .pdv4-card.small
  .pdv4-card-copy{
    min-height:78px;

    padding:
      8px
      8px
      9px;
  }

  .pdv4-card.small
  .pdv4-card-copy p{
    font-size:7.5px;
    line-height:1.3;
  }

  .pdv4-arrow{
    font-size:7px;
    letter-spacing:.8px;
  }

  .pdv4-listen{
    top:9px;
    right:9px;

    width:31px;
    height:31px;

    font-size:12px;

    background:
      rgba(0,0,0,.38);

    backdrop-filter:blur(9px);
    -webkit-backdrop-filter:blur(9px);
  }

  .pdv4-vote{
    top:9px;
    left:9px;

    padding:
      7px
      9px;

    font-size:8px;

    letter-spacing:.65px;

    background:
      var(--pd-red);

    box-shadow:
      0 5px 18px
      rgba(0,0,0,.28);
  }

  .pdv4-accent .pdv4-label{
    padding-left:6px;

    border-left-width:2px;
  }

  .pdv4-membership{
    padding:
      30px
      2px
      4px;
  }

  .pdv4-membership-top{
    padding:
      0 6px;

    margin-bottom:15px;
  }

  .pdv4-membership-kicker{
    font-size:8px;

    letter-spacing:1.5px;
  }

  .pdv4-membership h2{
    margin-top:6px;

    font-size:39px;

    line-height:.91;
  }

  .pdv4-membership-intro{
    font-size:12px;

    line-height:1.5;
  }

  .pdv4-benefits{
    grid-template-columns:
      repeat(
        12,
        minmax(0,1fr)
      );

    grid-auto-flow:dense;

    gap:5px;
  }

  .pdv4-benefit,
  .pdv4-benefit:first-child{
    grid-column:span 6;

    grid-row:auto;

    min-height:145px;
  }

  .pdv4-benefit:first-child{
    grid-column:span 7;

    min-height:245px;
  }

  .pdv4-benefit:nth-child(2){
    grid-column:span 5;
    min-height:170px;
  }

  .pdv4-benefit:nth-child(3){
    grid-column:span 5;
    min-height:150px;
  }

  .pdv4-benefit:nth-child(4){
    grid-column:span 7;
    min-height:195px;
  }

  .pdv4-benefit:nth-child(5){
    grid-column:span 12;
    min-height:170px;
  }

  .pdv4-benefit img{
    filter:
      saturate(.84)
      contrast(.96);
  }

  .pdv4-benefit span{
    left:10px;
    right:10px;
    bottom:10px;

    font-size:14px;

    line-height:1.05;
  }

  .pdv4-benefit:first-child span{
    font-size:18px;
  }

  .pdv4-join{
    margin:
      14px 6px 0;

    min-height:40px;

    padding:
      0 17px;

    font-size:9px;
  }

  .pdv4-ad{
    margin:
      29px 2px;

    min-height:220px;
  }

  .pdv4-ad-copy{
    min-height:220px;

    padding:18px;
  }

  .pdv4-ad-label{
    font-size:7px;

    letter-spacing:1.5px;
  }

  .pdv4-ad h2{
    font-size:34px;
  }

  .pdv4-ad p{
    margin:
      9px 0 13px;

    max-width:270px;

    font-size:10px;

    line-height:1.45;
  }

  .pdv4-ad a{
    font-size:8px;
  }
}

</style>
  `;
}/* =========================================================
   RENDER
========================================================= */

function render() {

  const root =
    document.querySelector(
      ROOT_SELECTOR
    );

  if (!root) {
    return;
  }

  /* -------------------------------------------------------
     HERO
  ------------------------------------------------------- */

  const hero =
    root.querySelector(
      ".pd-home-hero"
    );

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

        <h1
          class="notranslate"
          translate="no"
        >
          One world.<br/>
          <em>Every pet.</em>
        </h1>
      </div>
    `;
  }

  /* remove previous rendered homepage only */

  const oldContent =
    root.querySelector(
      ".pdv4-home"
    );

  if (oldContent) {
    oldContent.remove();
  }

  /* -------------------------------------------------------
     NEW EDITORIAL HOMEPAGE
  ------------------------------------------------------- */

  root.insertAdjacentHTML(
    "beforeend",
    `
    <div class="pdv4-home">

      <section class="pdv4-section">

        <div class="pdv4-section-head">
          <h2>
            ${esc(t("latest"))}
          </h2>

          <span>
            PETS & DOGUE · EDITORIAL
          </span>
        </div>

        <!-- ===============================================
             MAIN STORIES
        ================================================ -->

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
            vote: true,
            accent: true
          })}

          ${card({
            href: "wellness.html",
            image: "club-pet-health.png",
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

        <!-- ===============================================
             PETS & DOGUE CLUB
        ================================================ -->

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

            <a
              class="pdv4-benefit"
              href="club.html"
            >
              <img
                src="club.jpg"
                alt="${esc(t("community"))}"
                loading="lazy"
              />

              <span>
                ${esc(t("community"))}
              </span>
            </a>

            <a
              class="pdv4-benefit"
              href="special-offers.html"
            >
              <img
                src="club-partner-discounts.png"
                alt="${esc(t("discounts"))}"
                loading="lazy"
              />

              <span>
                ${esc(t("discounts"))}
              </span>
            </a>

            <a
              class="pdv4-benefit"
              href="wellness.html"
            >
              <img
                src="club-pet-health.png"
                alt="${esc(t("offers"))}"
                loading="lazy"
              />

              <span>
                ${esc(t("offers"))}
              </span>
            </a>

            <a
              class="pdv4-benefit"
              href="contests.html"
            >
              <img
                src="cover-star/cover-surf-parrot.png"
                alt="${esc(t("contests"))}"
                loading="lazy"
              />

              <span>
                ${esc(t("contests"))}
              </span>
            </a>

            <a
              class="pdv4-benefit"
              href="pet-marketplace.html"
            >
              <img
                src="marketplace.jpg"
                alt="${esc(t("marketplaceBenefit"))}"
                loading="lazy"
              />

              <span>
                ${esc(t("marketplaceBenefit"))}
              </span>
            </a>

          </div>

          <a
            class="pdv4-join"
            href="club.html"
          >
            ${esc(t("join"))} →
          </a>

        </section>

        <!-- ===============================================
             ADVERTISEMENT 1
        ================================================ -->

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

        <!-- ===============================================
             DISCOVERY / SERVICES / EDITORIAL
        ================================================ -->

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
            className: "wide",
            accent: true
          })}

          ${card({
            href: "pet-friendly-places.html",
            image: "pet-friendly-stays.jpg",
            label: t("petFriendlyLabel"),
            title: t("petFriendlyTitle"),
            text: t("petFriendlyText"),
            className: "medium"
          })}

          <!-- PHOTOS:
               visual editorial / photography card -->

          ${card({
            href: "photos.html",
            image: "cover-star/cover-turtle-spa.png",
            label: t("photosLabel"),
            title: t("photosTitle"),
            text: t("photosText"),
            className: "small"
          })}

          <!-- FASHION:
               fashion / grooming editorial visual -->

          ${card({
            href: "pet-fashion.html",
            image: "cover-star/cover-horse-salon.png",
            label: t("fashionLabel"),
            title: t("fashionTitle"),
            text: t("fashionText"),
            className: "small"
          })}

          <!-- ARTICLES:
               magazine-style editorial cover -->

          ${card({
            href: "articles.html",
            image: "cover-star/cover-capri-sphynx.png",
            label: t("articlesLabel"),
            title: t("articlesTitle"),
            text: t("articlesText"),
            className: "small"
          })}

        </div>

        <!-- ===============================================
             ADVERTISEMENT 2
        ================================================ -->

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

  /* -------------------------------------------------------
     Hide previous homepage content only.
     Do NOT touch global header / menu / ticker / Miso.
  ------------------------------------------------------- */

  const oldSections =
    Array.from(
      root.children
    );

  oldSections.forEach(
    (element) => {

      if (
        element.classList.contains("pd-home-hero") ||
        element.classList.contains("pdv4-home")
      ) {
        return;
      }

      element.style.display = "none";
    }
  );
}

/* =========================================================
   LANGUAGE REFRESH
========================================================= */

function refreshLanguage() {
  render();
}

/* =========================================================
   INIT
========================================================= */

function init() {

  if (
    !document.getElementById(
      "pets-dogue-home-v4-styles"
    )
  ) {
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

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    init
  );
} else {
  init();
}

})();
