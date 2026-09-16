"use strict";

/*
PETS & DOGUE — HOMEPAGE EXPERIENCE V2

IMPORTANT:
- does NOT change the global header
- does NOT change the Contents side menu
- does NOT change the Miso help bubble
- does NOT change global scroll behaviour
- replaces ONLY .pd-visual-home
*/

(function () {

const ROOT_SELECTOR = ".pd-visual-home";

/* =========================================================
   LANGUAGE
========================================================= */

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

/* =========================================================
   NEW HOMEPAGE TEXT
   Existing general labels continue to come from i18n engine.
========================================================= */

const TEXT = {

en: {
  hero:
    "A useful digital world for people who love animals — places to discover, member savings, local help, care, community and real experiences in one place.",

  membershipTitle:
    "More for your pet. All year.",
  membershipText:
    "£10 a year gives members access to special offers, useful discounts, Marketplace benefits, competitions and opportunities across the PETS & DOGUE world.",

  petFriendlyTitle:
    "Go together.",
  petFriendlyText:
    "Find cafés, hotels, restaurants, parks, beaches and services that welcome pets. Use your location, see what is nearby, check pet rules, community confirmations and routes in one quick search.",

  discountsTitle:
    "Spend less on real pet life.",
  discountsText:
    "Discover member offers for pet-friendly stays, grooming, accessories, services and everyday essentials — benefits designed around what pet owners actually use.",

  communityTitle:
    "People nearby can help.",
  communityText:
    "Ask local pet owners, share trusted recommendations and useful updates, and help reunite lost and found animals with the people looking for them.",

  healthTitle:
    "Care with confidence.",
  healthText:
    "Useful information and services for everyday health, grooming, wellbeing and responsible care — presented clearly and made easier to discover.",

  marketplaceTitle:
    "Useful things for real pet life.",
  marketplaceText:
    "Discover products, services, accessories and community listings in one place. Members can also post up to 50 free Marketplace ads.",

  greenTitle:
    "Meet animals. Discover responsibly.",
  greenText:
    "No pet of your own? Find zoos, aquariums, wildlife parks, farms, sanctuaries and responsible animal experiences where you can learn, watch and connect with animals.",

  coverTitle:
    "Your pet could be next.",
  coverText:
    "Take part in Cover Star opportunities, competitions and editorial features that celebrate personality, character and every kind of pet.",

  helpTitle:
    "Seen. Shared. Helped.",
  helpText:
    "Give animals needing homes, rescue or urgent support greater visibility. Sharing the right story can help the right person find them faster.",

  businessTitle:
    "Bring your business into their pet world.",
  businessText:
    "Hotels, cafés, groomers, vets, shops, brands and pet services can become easier to discover, offer member benefits and connect with an audience that makes decisions with animals in mind.",

  nearby: "Near you",
  map: "Map",
  location: "Location",
  routes: "Routes",
  petRules: "Pet rules",
  verified: "Community",
  lostFound: "Lost & Found",

  hotel: "Pet-friendly stays",
  grooming: "Grooming",
  offers: "Member offers",
  services: "Services",

  zoo: "Zoos",
  aquarium: "Aquariums",
  wildlife: "Wildlife",
  farms: "Farms & sanctuaries",

  memberLabel: "MEMBERSHIP",
  petFriendlyLabel: "PET-FRIENDLY DISCOVERY",
  discountLabel: "MEMBER SAVINGS",
  communityLabel: "LOCAL COMMUNITY",
  healthLabel: "HEALTH & CARE",
  marketLabel: "MARKETPLACE",
  greenLabel: "ANIMAL EXPERIENCES · GREEN TOURISM",
  coverLabel: "COVER STAR",
  helpLabel: "HELP ANIMALS",
  businessLabel: "WORK WITH PETS & DOGUE"
},

ru: {
  hero:
    "Полезный цифровой мир для людей, которые любят животных: места, скидки, помощь рядом, забота, сообщество и реальные впечатления — в одном пространстве.",

  membershipTitle:
    "Больше для питомца. Весь год.",
  membershipText:
    "£10 в год открывают участникам специальные предложения, полезные скидки, преимущества Marketplace, конкурсы и новые возможности во всём мире PETS & DOGUE.",

  petFriendlyTitle:
    "Вместе — куда угодно.",
  petFriendlyText:
    "Находите кафе, отели, рестораны, парки, пляжи и сервисы, куда можно с животными. Геолокация, карта, расстояние, правила для питомцев, подтверждения сообщества и маршруты — в одном быстром поиске.",

  discountsTitle:
    "Экономьте на том, чем реально пользуетесь.",
  discountsText:
    "Предложения для проживания с питомцами, груминга, аксессуаров, сервисов и повседневных покупок — реальные преимущества для владельцев животных.",

  communityTitle:
    "Рядом есть люди, которые помогут.",
  communityText:
    "Спрашивайте местных владельцев животных, делитесь проверенными рекомендациями и новостями, публикуйте пропавших и найденных животных и помогайте им быстрее вернуться домой.",

  healthTitle:
    "Забота — понятнее и проще.",
  healthText:
    "Полезная информация и сервисы для здоровья, ухода, груминга и благополучия питомцев — без лишней сложности и с удобным поиском.",

  marketplaceTitle:
    "Всё полезное для жизни с питомцем.",
  marketplaceText:
    "Товары, услуги, аксессуары и объявления сообщества в одном месте. Участники клуба могут размещать до 50 бесплатных объявлений.",

  greenTitle:
    "Познакомьтесь с животными ближе.",
  greenText:
    "Даже если у вас нет питомца, находите зоопарки, океанариумы, wildlife-парки, фермы, приюты и ответственные места, где можно наблюдать животных, узнавать о них и проводить время рядом.",

  coverTitle:
    "Ваш питомец может быть следующим.",
  coverText:
    "Участвуйте в Cover Star, конкурсах и редакционных проектах PETS & DOGUE, где важны характер, индивидуальность и самые разные животные.",

  helpTitle:
    "Увидели. Поделились. Помогли.",
  helpText:
    "Дайте больше видимости животным, которым нужен дом, спасение или срочная помощь. Правильная история может быстрее найти правильного человека.",

  businessTitle:
    "Станьте частью мира владельцев животных.",
  businessText:
    "Отели, кафе, грумеры, ветеринарные клиники, магазины, бренды и pet-сервисы могут стать заметнее, предлагать преимущества участникам и находить аудиторию PETS & DOGUE.",

  nearby: "Рядом",
  map: "Карта",
  location: "Геолокация",
  routes: "Маршруты",
  petRules: "Правила",
  verified: "Сообщество",
  lostFound: "Пропали / найдены",

  hotel: "Отели с питомцами",
  grooming: "Груминг",
  offers: "Скидки клуба",
  services: "Сервисы",

  zoo: "Зоопарки",
  aquarium: "Океанариумы",
  wildlife: "Wildlife",
  farms: "Фермы и приюты",

  memberLabel: "УЧАСТИЕ В КЛУБЕ",
  petFriendlyLabel: "PET-FRIENDLY ПОИСК",
  discountLabel: "ВЫГОДЫ УЧАСТНИКА",
  communityLabel: "ЛОКАЛЬНОЕ СООБЩЕСТВО",
  healthLabel: "ЗДОРОВЬЕ И УХОД",
  marketLabel: "MARKETPLACE",
  greenLabel: "ЖИВОТНЫЕ · ЗЕЛЁНЫЙ ТУРИЗМ",
  coverLabel: "COVER STAR",
  helpLabel: "ПОМОЩЬ ЖИВОТНЫМ",
  businessLabel: "СОТРУДНИЧЕСТВО С PETS & DOGUE"
},

uk: {
  hero:
    "Корисний цифровий світ для людей, які люблять тварин: місця, знижки, допомога поруч, турбота, спільнота та справжні враження — в одному просторі.",

  membershipTitle:
    "Більше для улюбленця. Увесь рік.",
  membershipText:
    "£10 на рік відкривають учасникам спеціальні пропозиції, корисні знижки, переваги Marketplace, конкурси та нові можливості у світі PETS & DOGUE.",

  petFriendlyTitle:
    "Разом — куди завгодно.",
  petFriendlyText:
    "Знаходьте кафе, готелі, ресторани, парки, пляжі та сервіси, куди можна з тваринами. Геолокація, карта, відстань, правила, підтвердження спільноти та маршрути — в одному швидкому пошуку.",

  discountsTitle:
    "Заощаджуйте на тому, чим справді користуєтесь.",
  discountsText:
    "Пропозиції для проживання з улюбленцями, грумінгу, аксесуарів, сервісів і щоденних покупок — реальні переваги для власників тварин.",

  communityTitle:
    "Поруч є люди, які допоможуть.",
  communityText:
    "Запитуйте місцевих власників тварин, діліться перевіреними рекомендаціями й новинами, публікуйте загублених і знайдених тварин та допомагайте їм повернутися додому.",

  healthTitle:
    "Турбота — зрозуміліше й простіше.",
  healthText:
    "Корисна інформація та сервіси для здоров’я, догляду, грумінгу й добробуту тварин — без зайвої складності та зі зручним пошуком.",

  marketplaceTitle:
    "Усе корисне для життя з улюбленцем.",
  marketplaceText:
    "Товари, послуги, аксесуари та оголошення спільноти в одному місці. Учасники клубу можуть розміщувати до 50 безкоштовних оголошень.",

  greenTitle:
    "Познайомтеся з тваринами ближче.",
  greenText:
    "Навіть без власного улюбленця знаходьте зоопарки, океанаріуми, wildlife-парки, ферми, притулки та відповідальні місця, де можна спостерігати за тваринами й дізнаватися про них.",

  coverTitle:
    "Ваш улюбленець може бути наступним.",
  coverText:
    "Беріть участь у Cover Star, конкурсах і редакційних проєктах PETS & DOGUE, де цінують характер, індивідуальність і різних тварин.",

  helpTitle:
    "Побачили. Поділилися. Допомогли.",
  helpText:
    "Дайте більше видимості тваринам, яким потрібен дім, порятунок або термінова допомога. Правильна історія може швидше знайти правильну людину.",

  businessTitle:
    "Станьте частиною світу власників тварин.",
  businessText:
    "Готелі, кафе, грумери, ветеринарні клініки, магазини, бренди та pet-сервіси можуть стати помітнішими, пропонувати переваги учасникам і знаходити аудиторію PETS & DOGUE.",

  nearby: "Поруч",
  map: "Карта",
  location: "Геолокація",
  routes: "Маршрути",
  petRules: "Правила",
  verified: "Спільнота",
  lostFound: "Загублені / знайдені",

  hotel: "Готелі з тваринами",
  grooming: "Грумінг",
  offers: "Знижки клубу",
  services: "Сервіси",

  zoo: "Зоопарки",
  aquarium: "Океанаріуми",
  wildlife: "Wildlife",
  farms: "Ферми й притулки",

  memberLabel: "УЧАСТЬ У КЛУБІ",
  petFriendlyLabel: "PET-FRIENDLY ПОШУК",
  discountLabel: "ПЕРЕВАГИ УЧАСНИКА",
  communityLabel: "ЛОКАЛЬНА СПІЛЬНОТА",
  healthLabel: "ЗДОРОВ’Я ТА ДОГЛЯД",
  marketLabel: "MARKETPLACE",
  greenLabel: "ТВАРИНИ · ЗЕЛЕНИЙ ТУРИЗМ",
  coverLabel: "COVER STAR",
  helpLabel: "ДОПОМОГА ТВАРИНАМ",
  businessLabel: "СПІВПРАЦЯ З PETS & DOGUE"
}

};

/*
For the remaining supported languages we preserve the interface
and fall back to English until their existing PETS & DOGUE i18n
engine supplies translated navigation/common labels.
No global i18n behaviour is changed here.
*/

function text(key) {
  const lang = currentLanguage();
  const pack = TEXT[lang] || TEXT.en;
  return pack[key] || TEXT.en[key] || key;
}

/* =========================================================
   CSS
========================================================= */

const STYLE = `
<style id="pdHomepageV2Style">

.pdv2{
background:#fff;
color:#111;
overflow:hidden;
}

.pdv2 *{
box-sizing:border-box;
}

.pdv2-hero{
position:relative;
height:min(64svh,640px);
min-height:470px;
overflow:hidden;
background:#111;
}

.pdv2-hero img{
width:100%;
height:100%;
object-fit:cover;
display:block;
}

.pdv2-hero::after{
content:"";
position:absolute;
inset:0;
background:
linear-gradient(to top,rgba(0,0,0,.82),rgba(0,0,0,.05) 68%);
}

.pdv2-hero-copy{
position:absolute;
z-index:2;
left:clamp(20px,5vw,72px);
right:clamp(20px,5vw,72px);
bottom:30px;
color:#fff;
max-width:760px;
}

.pdv2-kicker{
font-size:11px;
font-weight:900;
letter-spacing:2.1px;
text-transform:uppercase;
margin-bottom:10px;
}

.pdv2-hero h1{
font-family:Georgia,serif;
font-size:clamp(54px,9vw,106px);
font-weight:400;
line-height:.84;
letter-spacing:-2.5px;
margin:0;
}

.pdv2-hero h1 em{
font-style:italic;
}

.pdv2-hero p{
font-size:16px;
line-height:1.45;
font-weight:600;
max-width:630px;
margin:16px 0 0;
}

.pdv2-card{
display:grid;
grid-template-columns:1.08fr .92fr;
min-height:560px;
}

.pdv2-card.reverse .pdv2-media{
order:2;
}

.pdv2-card.reverse .pdv2-copy{
order:1;
}

.pdv2-media{
position:relative;
overflow:hidden;
min-height:540px;
background:#ddd;
}

.pdv2-media>img{
width:100%;
height:100%;
object-fit:cover;
display:block;
}

.pdv2-copy{
position:relative;
padding:44px clamp(26px,5vw,65px);
display:flex;
flex-direction:column;
justify-content:center;
}

.pdv2-copy h2{
font-family:Georgia,serif;
font-size:clamp(42px,5vw,70px);
font-weight:400;
line-height:.9;
letter-spacing:-1.5px;
margin:0 0 15px;
}

.pdv2-copy p{
font-size:16px;
font-weight:600;
line-height:1.5;
margin:0;
max-width:560px;
}

.pdv2-pills{
display:flex;
flex-wrap:wrap;
gap:7px;
margin-top:19px;
}

.pdv2-pills span{
border:1px solid rgba(0,0,0,.18);
background:rgba(255,255,255,.72);
border-radius:999px;
padding:8px 11px;
font-size:10px;
font-weight:900;
white-space:nowrap;
}

.pdv2-membership .pdv2-copy{
background:#65e51f;
}

.pdv2-petfriendly .pdv2-copy{
background:#35c8ff;
}

.pdv2-discounts .pdv2-copy{
background:#ffe600;
}

.pdv2-community .pdv2-copy{
background:#f5f0e6;
}

.pdv2-health .pdv2-copy{
background:#dff2dc;
}

.pdv2-market .pdv2-copy{
background:#efd9f7;
}

.pdv2-green .pdv2-copy{
background:#dcefc5;
}

.pdv2-cover .pdv2-copy{
background:#f0e4ce;
}

.pdv2-help .pdv2-copy{
background:#111;
color:#fff;
}

.pdv2-help .pdv2-pills span{
color:#fff;
border-color:#555;
background:#222;
}

.pdv2-business .pdv2-copy{
background:#ff555d;
}

.pdv2-phone{
position:absolute;
right:7%;
bottom:6%;
width:190px;
height:390px;
border:8px solid #111;
border-radius:32px;
background:#111;
box-shadow:0 16px 45px rgba(0,0,0,.35);
overflow:hidden;
z-index:3;
}

.pdv2-phone-screen{
height:100%;
border-radius:23px;
overflow:hidden;
background:#f7f3ea;
display:flex;
flex-direction:column;
}

.pdv2-phone-top{
background:#070707;
color:#fff;
padding:17px 11px 12px;
font-family:Georgia,serif;
font-size:16px;
text-align:center;
}

.pdv2-phone-search{
margin:12px 10px 8px;
padding:9px;
border:1px solid #ccc;
border-radius:999px;
font-size:9px;
background:#fff;
}

.pdv2-phone-map{
height:126px;
margin:0 10px 8px;
border-radius:13px;
background:
radial-gradient(circle at 35% 40%,#65e51f 0 5px,transparent 6px),
radial-gradient(circle at 72% 62%,#ff3038 0 5px,transparent 6px),
linear-gradient(135deg,#e5eadf,#b9d8e8);
position:relative;
}

.pdv2-phone-list{
padding:0 10px;
display:grid;
gap:6px;
}

.pdv2-phone-place{
background:#fff;
border-radius:10px;
padding:8px;
box-shadow:0 2px 8px rgba(0,0,0,.08);
}

.pdv2-phone-place strong{
display:block;
font-size:9px;
}

.pdv2-phone-place small{
font-size:7px;
color:#666;
}

.pdv2-small-badge{
position:absolute;
left:16px;
bottom:16px;
background:#fff;
padding:9px 12px;
font-size:10px;
font-weight:900;
letter-spacing:1px;
}

.pdv2-media-split{
display:grid;
grid-template-columns:1.15fr .85fr;
gap:5px;
height:100%;
}

.pdv2-media-split figure{
position:relative;
margin:0;
overflow:hidden;
}

.pdv2-media-split img{
width:100%;
height:100%;
object-fit:cover;
display:block;
}

.pdv2-cover .pdv2-media img{
object-position:center top;
}

.pdv2-bottom{
background:#070707;
color:#fff;
padding:56px 22px;
}

.pdv2-bottom-inner{
max-width:1120px;
margin:auto;
display:grid;
grid-template-columns:1fr 1fr;
gap:28px;
align-items:center;
}

.pdv2-bottom h2{
font-family:Georgia,serif;
font-size:clamp(42px,6vw,72px);
font-weight:400;
line-height:.9;
margin:0;
}

.pdv2-bottom p{
font-size:16px;
line-height:1.55;
margin:0;
color:#ddd;
}

.pdv2-cta{
display:inline-flex;
margin-top:18px;
padding:12px 17px;
border-radius:999px;
background:#fff;
color:#111;
font-size:11px;
font-weight:900;
}

@media(max-width:760px){

.pdv2-hero{
height:55svh;
min-height:470px;
}

.pdv2-card,
.pdv2-card.reverse{
display:flex;
flex-direction:column;
min-height:0;
}

.pdv2-card.reverse .pdv2-media,
.pdv2-card.reverse .pdv2-copy{
order:initial;
}

.pdv2-media{
height:36svh;
min-height:290px;
max-height:390px;
}

.pdv2-copy{
min-height:0;
padding:24px 20px 27px;
}

.pdv2-copy h2{
font-size:40px;
line-height:.92;
margin-bottom:11px;
}

.pdv2-copy p{
font-size:14px;
line-height:1.42;
}

.pdv2-kicker{
font-size:10px;
margin-bottom:8px;
}

.pdv2-pills{
margin-top:14px;
gap:5px;
}

.pdv2-pills span{
font-size:9px;
padding:7px 9px;
}

.pdv2-phone{
width:128px;
height:260px;
border-width:5px;
border-radius:23px;
right:6%;
bottom:5%;
}

.pdv2-phone-screen{
border-radius:17px;
}

.pdv2-phone-top{
padding:10px 5px 7px;
font-size:11px;
}

.pdv2-phone-search{
margin:7px 6px 5px;
padding:5px;
font-size:6px;
}

.pdv2-phone-map{
height:78px;
margin:0 6px 5px;
}

.pdv2-phone-list{
padding:0 6px;
gap:4px;
}

.pdv2-phone-place{
padding:5px;
}

.pdv2-phone-place strong{
font-size:6px;
}

.pdv2-phone-place small{
font-size:5px;
}

.pdv2-bottom{
padding:40px 20px;
}

.pdv2-bottom-inner{
grid-template-columns:1fr;
gap:14px;
}

}

</style>
`;

/* =========================================================
   VISUAL COMPONENTS
========================================================= */

function phoneMockup() {
  return `
  <div class="pdv2-phone" aria-label="PETS & DOGUE Pet-Friendly mobile search">
    <div class="pdv2-phone-screen">
      <div class="pdv2-phone-top">PETS &amp; DOGUE</div>
      <div class="pdv2-phone-search">Pet-Friendly near me 🔎</div>
      <div class="pdv2-phone-map"></div>

      <div class="pdv2-phone-list">
        <div class="pdv2-phone-place">
          <strong>Pet-friendly café</strong>
          <small>✓ pets welcome · 0.4 km</small>
        </div>

        <div class="pdv2-phone-place">
          <strong>Hotel &amp; pets</strong>
          <small>✓ community confirmed · 0.9 km</small>
        </div>

        <div class="pdv2-phone-place">
          <strong>Park</strong>
          <small>route · directions · photos</small>
        </div>
      </div>
    </div>
  </div>
  `;
}

function pills(items) {
  return `
    <div class="pdv2-pills">
      ${items.map(item => `<span>${item}</span>`).join("")}
    </div>
  `;
}

/* =========================================================
   RENDER
========================================================= */

function renderHomepageV2() {

  const root = document.querySelector(ROOT_SELECTOR);

  if (!root) {
    return;
  }

  const html = `

  <div class="pdv2">

    <section class="pdv2-hero" data-speech-section>
      <img
        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1800&q=90"
        alt="Animals sharing life with people"
      >

      <button
        class="home-listen"
        aria-label="Listen to this section"
        onclick="listenToSection(this)"
      >🔊</button>

      <div class="pdv2-hero-copy">
        <div class="pdv2-kicker">PETS &amp; DOGUE</div>
        <h1 class="notranslate" translate="no">
          One world.<br><em>Every pet.</em>
        </h1>
        <p>${text("hero")}</p>
      </div>
    </section>


    <!-- MEMBERSHIP FIRST -->

    <section class="pdv2-card pdv2-membership" data-speech-section>

      <div class="pdv2-media">
        <div class="pdv2-media-split">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=90"
              alt="Pet-friendly hotel"
            >
            <span class="pdv2-small-badge">£10 / YEAR</span>
          </figure>

          <figure>
            <img
              src="file_00000000a9d471fda9b4629589be22a9.png"
              alt="PETS & DOGUE member world"
            >
          </figure>
        </div>
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("memberLabel")}</div>
        <h2>${text("membershipTitle")}</h2>
        <p>${text("membershipText")}</p>

        ${pills([
          text("offers"),
          text("hotel"),
          text("grooming"),
          "Marketplace",
          "Cover Star"
        ])}

        <a class="pdv2-cta" href="club.html">
          £10 / YEAR →
        </a>
      </div>

    </section>


    <!-- PET FRIENDLY -->

    <section class="pdv2-card reverse pdv2-petfriendly" data-speech-section>

      <div class="pdv2-media">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1500&q=90"
          alt="Pet-friendly café and easy mobile search"
        >

        ${phoneMockup()}

        <span class="pdv2-small-badge">
          PETS &amp; DOGUE · NEAR ME
        </span>
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("petFriendlyLabel")}</div>
        <h2>${text("petFriendlyTitle")}</h2>
        <p>${text("petFriendlyText")}</p>

        ${pills([
          text("location"),
          text("map"),
          text("nearby"),
          text("petRules"),
          text("verified"),
          text("routes")
        ])}
      </div>

    </section>


    <!-- DISCOUNTS -->

    <section class="pdv2-card pdv2-discounts" data-speech-section>

      <div class="pdv2-media">
        <div class="pdv2-media-split">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=90"
              alt="Hotel stay and member savings"
            >
            <span class="pdv2-small-badge">${text("hotel")}</span>
          </figure>

          <figure>
            <img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=90"
              alt="Pet services and products"
            >
          </figure>
        </div>
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("discountLabel")}</div>
        <h2>${text("discountsTitle")}</h2>
        <p>${text("discountsText")}</p>

        ${pills([
          text("hotel"),
          text("grooming"),
          text("offers"),
          text("services")
        ])}
      </div>

    </section>


    <!-- COMMUNITY + LOST FOUND -->

    <section class="pdv2-card reverse pdv2-community" data-speech-section>

      <div class="pdv2-media">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1500&q=90"
          alt="Local pet community"
        >
        <span class="pdv2-small-badge">${text("lostFound")}</span>
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("communityLabel")}</div>
        <h2>${text("communityTitle")}</h2>
        <p>${text("communityText")}</p>

        ${pills([
          text("nearby"),
          text("lostFound"),
          text("location"),
          text("verified")
        ])}
      </div>

    </section>


    <!-- GREEN TOURISM -->

    <section class="pdv2-card pdv2-green" data-speech-section>

      <div class="pdv2-media">
        <div class="pdv2-media-split">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1000&q=90"
              alt="Animal experience and responsible tourism"
            >
          </figure>

          <figure>
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=90"
              alt="People discovering animals"
            >
          </figure>
        </div>
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("greenLabel")}</div>
        <h2>${text("greenTitle")}</h2>
        <p>${text("greenText")}</p>

        ${pills([
          text("zoo"),
          text("aquarium"),
          text("wildlife"),
          text("farms")
        ])}
      </div>

    </section>


    <!-- HEALTH -->

    <section class="pdv2-card reverse pdv2-health" data-speech-section>

      <div class="pdv2-media">
        <img
          src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1500&q=90"
          alt="Pet health and care"
        >
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("healthLabel")}</div>
        <h2>${text("healthTitle")}</h2>
        <p>${text("healthText")}</p>

        ${pills([
          "Health",
          "Care",
          "Grooming",
          "Wellbeing"
        ])}
      </div>

    </section>


    <!-- MARKETPLACE -->

    <section class="pdv2-card pdv2-market" data-speech-section>

      <div class="pdv2-media">
        <img
          src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1500&q=90"
          alt="Pet marketplace products and services"
        >
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("marketLabel")}</div>
        <h2>${text("marketplaceTitle")}</h2>
        <p>${text("marketplaceText")}</p>

        ${pills([
          "Products",
          text("services"),
          "Accessories",
          "Listings"
        ])}
      </div>

    </section>


    <!-- COVER STAR IN THE MIDDLE -->

    <section class="pdv2-card reverse pdv2-cover" data-speech-section>

      <div class="pdv2-media">
        <img
          src="file_00000000a9d471fda9b4629589be22a9.png"
          alt="Miso PETS & DOGUE Cover Star"
        >
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("coverLabel")}</div>
        <h2>${text("coverTitle")}</h2>
        <p>${text("coverText")}</p>

        ${pills([
          "Cover Star",
          "Contests",
          "Editorial",
          "Community"
        ])}
      </div>

    </section>


    <!-- HELP -->

    <section class="pdv2-card pdv2-help" data-speech-section>

      <div class="pdv2-media">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1500&q=90"
          alt="Animals needing help and visibility"
        >
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("helpLabel")}</div>
        <h2>${text("helpTitle")}</h2>
        <p>${text("helpText")}</p>

        ${pills([
          "Adoption",
          "Rescue",
          "Urgent help",
          "Share"
        ])}
      </div>

    </section>


    <!-- BUSINESS / COLLABORATION -->

    <section class="pdv2-card reverse pdv2-business" data-speech-section>

      <div class="pdv2-media">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1500&q=90"
          alt="Pet-friendly business and hospitality"
        >
      </div>

      <div class="pdv2-copy">
        <div class="pdv2-kicker">${text("businessLabel")}</div>
        <h2>${text("businessTitle")}</h2>
        <p>${text("businessText")}</p>

        ${pills([
          "Hotels",
          "Cafés",
          "Groomers",
          "Vets",
          "Brands",
          "Pet services"
        ])}

        <a class="pdv2-cta" href="partners.html">
          PETS &amp; DOGUE →
        </a>
      </div>

    </section>


    <section class="pdv2-bottom" data-speech-section>
      <div class="pdv2-bottom-inner">

        <h2 class="notranslate" translate="no">
          One world.<br>
          Every pet.
        </h2>

        <p>
          ${text("hero")}
        </p>

      </div>
    </section>

  </div>
  `;

  if (!document.getElementById("pdHomepageV2Style")) {
    document.head.insertAdjacentHTML("beforeend", STYLE);
  }

  root.innerHTML = html;
}

/* =========================================================
   START
========================================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderHomepageV2);
} else {
  renderHomepageV2();
}

})();
