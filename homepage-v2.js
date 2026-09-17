"use strict";

/*
PETS & DOGUE — HOMEPAGE EDITORIAL V9

V9:
- replaces X close button in How It Works modal with Back
- Back button returns to the homepage without reloading
- Android/browser Back closes How It Works first
- preserves the exact homepage scroll position
- backdrop no longer closes the modal accidentally
- Escape still closes the modal on desktop
- preserves current homepage design
- preserves V8 images and content
- preserves Beauty & Grooming image
- preserves Sport & Active Life image
- preserves multilingual content
- preserves TTS / listen buttons

Меняет ТОЛЬКО поведение окна "How it works / Как это работает".

НЕ ИЗМЕНЯЕТ:
- global header
- navigation
- side menu
- ticker
- language menu
- Miso bubble
- global shell
- homepage card structure
- homepage images

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

let howModalHistoryActive = false;
let howModalScrollY = 0;
let closingFromPopstate = false;

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
    "One membership connects you to community, special offers and competitions across the PETS & DOGUE world.",

  discounts: "Club discounts",
  contests: "Contests & voting",
  community: "Global community",

  contestWinner: "WINNER",
  contestVotes: "Community favourite",

  petFriendlyLabel: "PET-FRIENDLY PLACES",
  petFriendlyTitle: "Go together.",
  petFriendlyText:
    "Discover pet-friendly cafés, hotels, restaurants, parks and green escapes — plus farms, sanctuaries and places where you can spend time with animals even if you do not have a pet.",

  healthLabel: "HEALTH & CARE",
  healthTitle: "Care with confidence.",
  healthText:
    "Practical guidance on health, wellbeing, grooming, prevention and responsible everyday care.",

  coverLabel: "COVER STAR",
  coverTitle: "Your pet could be next.",
  coverText:
    "A competition exclusively for Club members. The community votes for the winner to appear on the PETS & DOGUE cover, while five other finalists receive their own story and photos inside the magazine.",
  vote: "VOTE",

  communityLabel: "LOCAL COMMUNITY",
  communityTitle: "Be part of what is happening nearby.",
  communityText:
    "Meet local pet people, discover events and recommendations, talk, arrange meet-ups and help reunite lost and found animals. Everything happening in your area — stay connected.",

  marketplaceLabel: "MARKETPLACE",
  marketplaceTitle: "Buy. Sell. Give. Find.",
  marketplaceText:
    "A community marketplace for pet products, services and useful listings. Buy, sell, give away, search for something you need or publish your own advert.",

  helpLabel: "HELP ANIMALS",
  helpTitle: "Help animals around the world.",
  helpText:
    "Give visibility to animals anywhere in the world that need rescue, treatment, adoption, foster care or urgent support.",

  fashionLabel: "FASHION & STYLE",
  fashionTitle: "Fashion. Style. New season.",
  fashionText:
    "New pet fashion, accessories, grooming inspiration and editorial looks with personality.",

  wellnessLabel: "WELLNESS & SPA",
  wellnessTitle: "Wellness & SPA",
  wellnessText:
    "Calm, care, grooming, spa experiences and wellbeing ideas created for modern pet life.",

  beautyLabel: "BEAUTY & STYLE",
  beautyTitle: "Beauty & grooming",
  beautyText:
    "Grooming trends, beautiful interiors, professional care and expressive pet style.",

  activeLabel: "ACTIVE LIFE",
  activeTitle: "Sport & active life",
  activeText:
    "Movement, fitness, outdoor activity and inspiration for a healthier, more active life together.",

  ad: "ADVERTISE WITH US",
  adTitle: "Your brand could be here.",
  adText:
    "Put your brand in front of the PETS & DOGUE audience through premium advertising, mobile placements and special campaigns.",
  advertise: "Advertise with us",

  join: "Join the Club",

  howItWorks: "How it works",
  close: "Close",
  back: "Back"
};

/* =========================================================
   RUSSIAN
========================================================= */

const RU = {
  latest: "Последние истории",

  membershipLabel: "КЛУБ PETS & DOGUE",
  membershipTitle: "Больше для питомца. Весь год.",
  membershipText:
    "Одна подписка объединяет сообщество, специальные предложения и конкурсы во всём мире PETS & DOGUE.",

  discounts: "Скидки клуба",
  contests: "Конкурсы и голосования",
  community: "Мировое сообщество",

  contestWinner: "ПОБЕДИТЕЛЬ",
  contestVotes: "Выбор сообщества",

  petFriendlyLabel: "PET-FRIENDLY МЕСТА",
  petFriendlyTitle: "Вместе — куда угодно.",
  petFriendlyText:
    "Открывайте pet-friendly кафе, отели, рестораны, парки и зелёные маршруты, а также фермы, заповедники и места, где можно провести время с животными, даже если своего питомца у вас нет.",

  healthLabel: "ЗДОРОВЬЕ И УХОД",
  healthTitle: "Забота с уверенностью.",
  healthText:
    "Практичные материалы о здоровье, благополучии, груминге, профилактике и ответственном ежедневном уходе.",

  coverLabel: "COVER STAR",
  coverTitle: "Ваш питомец может быть следующим.",
  coverText:
    "Конкурс только для участников клуба. По результатам голосования сообщества победитель появится на обложке PETS & DOGUE, а ещё пять финалистов получат собственную историю и фотографии в журнале.",
  vote: "ГОЛОСОВАТЬ",

  communityLabel: "ЛОКАЛЬНОЕ СООБЩЕСТВО",
  communityTitle: "Будьте частью того, что происходит рядом.",
  communityText:
    "Знакомьтесь, общайтесь, узнавайте о событиях и встречах, делитесь рекомендациями и помогайте находить потерянных животных. Всё интересное вашего района — будьте на связи.",

  marketplaceLabel: "MARKETPLACE",
  marketplaceTitle: "Купить. Продать. Отдать. Найти.",
  marketplaceText:
    "Объявления о товарах и услугах для животных. Покупайте, продавайте, отдавайте бесплатно, ищите нужное или размещайте собственное объявление.",

  helpLabel: "ПОМОЩЬ ЖИВОТНЫМ",
  helpTitle: "Помощь животным по всему миру.",
  helpText:
    "Помогайте животным в любой точке мира, которым нужны спасение, лечение, новый дом, передержка или срочная поддержка.",

  fashionLabel: "МОДА И СТИЛЬ",
  fashionTitle: "Мода. Стиль. Новинки.",
  fashionText:
    "Новая мода для питомцев, аксессуары, идеи груминга и редакционные образы с характером.",

  wellnessLabel: "WELLNESS & SPA",
  wellnessTitle: "Wellness & SPA",
  wellnessText:
    "Отдых, уход, груминг, SPA и идеи для физического и эмоционального благополучия питомцев.",

  beautyLabel: "КРАСОТА И СТИЛЬ",
  beautyTitle: "Красота и груминг",
  beautyText:
    "Тренды груминга, красивые пространства, профессиональный уход и выразительный стиль питомцев.",

  activeLabel: "АКТИВНАЯ ЖИЗНЬ",
  activeTitle: "Спорт и активная жизнь",
  activeText:
    "Движение, фитнес, прогулки и идеи для более здоровой и активной жизни вместе.",

  ad: "РЕКЛАМА В PETS & DOGUE",
  adTitle: "Здесь может быть ваш бренд.",
  adText:
    "Покажите свой бренд аудитории PETS & DOGUE через премиальную рекламу, мобильные размещения и специальные кампании.",
  advertise: "Дать рекламу",

  join: "Вступить в клуб",

  howItWorks: "Как это работает",
  close: "Закрыть",
  back: "Назад"
};

/* =========================================================
   UKRAINIAN
========================================================= */

const UK = {
  latest: "Останні історії",

  membershipLabel: "КЛУБ PETS & DOGUE",
  membershipTitle: "Більше для улюбленця. Увесь рік.",
  membershipText:
    "Одна підписка об’єднує спільноту, спеціальні пропозиції та конкурси у світі PETS & DOGUE.",

  discounts: "Знижки клубу",
  contests: "Конкурси й голосування",
  community: "Світова спільнота",

  contestWinner: "ПЕРЕМОЖЕЦЬ",
  contestVotes: "Вибір спільноти",

  petFriendlyLabel: "PET-FRIENDLY МІСЦЯ",
  petFriendlyTitle: "Разом — куди завгодно.",
  petFriendlyText:
    "Відкривайте pet-friendly кафе, готелі, ресторани, парки й зелені маршрути, а також ферми, заповідники та місця, де можна провести час із тваринами, навіть якщо власного улюбленця у вас немає.",

  healthLabel: "ЗДОРОВ’Я І ДОГЛЯД",
  healthTitle: "Турбота з упевненістю.",
  healthText:
    "Практичні матеріали про здоров’я, добробут, грумінг, профілактику та відповідальний щоденний догляд.",

  coverLabel: "COVER STAR",
  coverTitle: "Ваш улюбленець може бути наступним.",
  coverText:
    "Конкурс лише для учасників клубу. За результатами голосування спільноти переможець з’явиться на обкладинці PETS & DOGUE, а ще п’ять фіналістів отримають власну історію та фотографії в журналі.",
  vote: "ГОЛОСУВАТИ",

  communityLabel: "ЛОКАЛЬНА СПІЛЬНОТА",
  communityTitle: "Будьте частиною того, що відбувається поруч.",
  communityText:
    "Знайомтеся, спілкуйтеся, дізнавайтеся про події та зустрічі, діліться рекомендаціями й допомагайте знаходити загублених тварин. Усе цікаве вашого району — залишайтеся на зв’язку.",

  marketplaceLabel: "MARKETPLACE",
  marketplaceTitle: "Купити. Продати. Віддати. Знайти.",
  marketplaceText:
    "Оголошення про товари й послуги для тварин. Купуйте, продавайте, віддавайте безкоштовно, шукайте потрібне або публікуйте власне оголошення.",

  helpLabel: "ДОПОМОГА ТВАРИНАМ",
  helpTitle: "Допомога тваринам у всьому світі.",
  helpText:
    "Допомагайте тваринам у будь-якій точці світу, яким потрібні порятунок, лікування, новий дім, перетримка або термінова підтримка.",

  fashionLabel: "МОДА І СТИЛЬ",
  fashionTitle: "Мода. Стиль. Новинки.",
  fashionText:
    "Нова мода для улюбленців, аксесуари, ідеї грумінгу та редакційні образи з характером.",

  wellnessLabel: "WELLNESS & SPA",
  wellnessTitle: "Wellness & SPA",
  wellnessText:
    "Відпочинок, догляд, грумінг, SPA та ідеї для фізичного й емоційного добробуту улюбленців.",

  beautyLabel: "КРАСА І СТИЛЬ",
  beautyTitle: "Краса і грумінг",
  beautyText:
    "Тренди грумінгу, красиві простори, професійний догляд та виразний стиль улюбленців.",

  activeLabel: "АКТИВНЕ ЖИТТЯ",
  activeTitle: "Спорт і активне життя",
  activeText:
    "Рух, фітнес, прогулянки та ідеї для здоровішого й активнішого життя разом.",

  ad: "РЕКЛАМА В PETS & DOGUE",
  adTitle: "Тут може бути ваш бренд.",
  adText:
    "Покажіть свій бренд аудиторії PETS & DOGUE через преміальну рекламу, мобільні розміщення та спеціальні кампанії.",
  advertise: "Дати рекламу",

  join: "Приєднатися до клубу",

  howItWorks: "Як це працює",
  close: "Закрити",
  back: "Назад"
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
   HOW IT WORKS CONTENT
========================================================= */

const HOW_EN = {

  petFriendly: {
    title: "Find places you can enjoy together",
    intro:
      "Pet-Friendly Places helps you discover places around you and understand what visiting with an animal is really like.",
    steps: [
      "Explore cafés, restaurants, hotels, parks, green spaces and other useful places.",
      "Check the pet-friendly information available for each place.",
      "See community feedback about whether pets are welcome inside, outside or both.",
      "Discover places where you can spend time around animals even if you do not have a pet.",
      "Choose a place and continue your day together."
    ]
  },

  coverStar: {
    title: "Your pet could become a PETS & DOGUE Cover Star",
    intro:
      "Cover Star turns the PETS & DOGUE community into part of the magazine.",
    steps: [
      "Club members can enter their pet in the Cover Star competition.",
      "The community discovers the finalists and votes for its favourites.",
      "The winning pet becomes a PETS & DOGUE cover star.",
      "Five additional finalists receive their own story and photographs inside the magazine.",
      "New competitions give more pets the opportunity to be discovered."
    ]
  },

  health: {
    title: "Practical care, made easier",
    intro:
      "Health & Care brings useful pet wellbeing information into one easy place.",
    steps: [
      "Discover practical guides about everyday pet health and wellbeing.",
      "Learn about prevention, responsible care and common concerns.",
      "Explore grooming and care information for different stages of pet life.",
      "Save useful ideas and return whenever you need them.",
      "Health content supports informed pet care and does not replace professional veterinary advice."
    ]
  },

  community: {
    title: "Your local pet world in one place",
    intro:
      "Local Community helps people with animals connect with what is happening around them.",
    steps: [
      "Discover pet people and useful local conversations near you.",
      "Find events, meet-ups and recommendations from the community.",
      "Share local information and experiences.",
      "Help spread information about lost and found animals.",
      "Stay connected to the pet community in your area."
    ]
  },

  marketplace: {
    title: "Buy. Sell. Give. Find.",
    intro:
      "Marketplace brings useful pet listings together in one community space.",
    steps: [
      "Browse products, services and pet-related listings.",
      "Search for something specific that you need.",
      "Sell pet items you no longer need.",
      "Give useful items away to another pet household.",
      "Publish your own advert and connect with interested people."
    ]
  },

  help: {
    title: "Make an animal visible when help matters",
    intro:
      "Help Animals is designed to give more visibility to animals that need support.",
    steps: [
      "Discover animals that need rescue, treatment, adoption, foster care or urgent support.",
      "Read their story and understand what kind of help is needed.",
      "Share cases so they can reach more people.",
      "Connect people, rescuers and communities around animals in need.",
      "Help useful information travel further, wherever the animal is in the world."
    ]
  },

  fashion: {
    title: "Discover pet fashion and style",
    intro:
      "Fashion & Style brings together editorial inspiration, new looks and pet-focused design.",
    steps: [
      "Discover new pet fashion and accessories.",
      "Explore seasonal looks and editorial inspiration.",
      "See creative styling ideas for different pets.",
      "Discover brands, designers and new ideas.",
      "Enjoy fashion as part of the PETS & DOGUE lifestyle world."
    ]
  },

  wellness: {
    title: "Wellbeing for modern pet life",
    intro:
      "Wellness & SPA explores comfort, care and experiences designed around pet wellbeing.",
    steps: [
      "Discover grooming, spa and wellbeing ideas.",
      "Explore ways to make everyday care calmer and more enjoyable.",
      "Find inspiration for relaxation and comfort.",
      "Learn about experiences created for pets and their people.",
      "Build wellbeing into everyday life together."
    ]
  },

  beauty: {
    title: "Grooming with style and care",
    intro:
      "Beauty & Grooming explores professional care, grooming trends and expressive pet style.",
    steps: [
      "Discover grooming ideas and current trends.",
      "Explore professional care and beautiful grooming spaces.",
      "Find inspiration for coats, styling and presentation.",
      "Discover creative approaches for different pets.",
      "Combine good care with individual style."
    ]
  },

  active: {
    title: "Move more. Explore more. Together.",
    intro:
      "Sport & Active Life is about movement, outdoor experiences and an active life shared with pets.",
    steps: [
      "Discover activities you can enjoy together.",
      "Explore walking, outdoor and fitness inspiration.",
      "Find ideas for making everyday life more active.",
      "Discover different forms of pet-friendly recreation.",
      "Turn movement and adventure into part of life together."
    ]
  }
};

const HOW_RU = {

  petFriendly: {
    title: "Находите места, куда можно вместе",
    intro:
      "Pet-Friendly Places помогает находить интересные места рядом и понимать, насколько удобно прийти туда с животным.",
    steps: [
      "Открывайте кафе, рестораны, отели, парки, зелёные зоны и другие интересные места.",
      "Смотрите доступную информацию об условиях посещения с питомцем.",
      "Узнавайте мнение сообщества: можно ли с животным внутрь, только на улицу или в обе зоны.",
      "Находите места, где можно провести время рядом с животными, даже если своего питомца у вас нет.",
      "Выбирайте место и отправляйтесь туда вместе."
    ]
  },

  coverStar: {
    title: "Ваш питомец может стать звездой PETS & DOGUE",
    intro:
      "Cover Star даёт питомцам нашего сообщества возможность стать частью PETS & DOGUE.",
    steps: [
      "Участники клуба могут заявить своего питомца на конкурс Cover Star.",
      "Сообщество знакомится с финалистами и голосует за любимцев.",
      "Победитель становится звездой обложки PETS & DOGUE.",
      "Ещё пять финалистов получают собственную историю и фотографии внутри журнала.",
      "Новые конкурсы дают шанс быть замеченными новым питомцам."
    ]
  },

  health: {
    title: "Полезная забота — проще и понятнее",
    intro:
      "Health & Care собирает полезную информацию о здоровье и благополучии питомцев в одном месте.",
    steps: [
      "Читайте практические материалы о здоровье и ежедневном уходе.",
      "Узнавайте больше о профилактике и ответственном содержании животных.",
      "Изучайте материалы об уходе и груминге на разных этапах жизни питомца.",
      "Возвращайтесь к полезным рекомендациям, когда они понадобятся.",
      "Материалы помогают лучше ориентироваться в уходе, но не заменяют консультацию ветеринара."
    ]
  },

  community: {
    title: "Всё локальное pet-сообщество рядом",
    intro:
      "Local Community помогает людям с животными узнавать, что происходит рядом, и общаться друг с другом.",
    steps: [
      "Находите людей и полезные обсуждения рядом с вами.",
      "Узнавайте о событиях, встречах и рекомендациях сообщества.",
      "Делитесь местной информацией и собственным опытом.",
      "Помогайте распространять информацию о потерянных и найденных животных.",
      "Оставайтесь частью pet-сообщества своего района."
    ]
  },

  marketplace: {
    title: "Купить. Продать. Отдать. Найти.",
    intro:
      "Marketplace объединяет товары, услуги и полезные объявления для животных в одном пространстве.",
    steps: [
      "Просматривайте товары, услуги и объявления для питомцев.",
      "Ищите именно то, что вам необходимо.",
      "Продавайте вещи для животных, которые вам больше не нужны.",
      "Отдавайте полезные вещи другим владельцам питомцев.",
      "Размещайте собственные объявления и связывайтесь с заинтересованными людьми."
    ]
  },

  help: {
    title: "Поможем животному стать замеченным",
    intro:
      "Help Animals создан для того, чтобы животные, которым нужна помощь, получили больше внимания.",
    steps: [
      "Находите животных, которым нужны спасение, лечение, новый дом, передержка или срочная поддержка.",
      "Читайте их историю и узнавайте, какая именно помощь необходима.",
      "Делитесь публикациями, чтобы о животном узнало больше людей.",
      "Помогайте связывать людей, волонтёров и сообщества.",
      "Распространяйте важную информацию независимо от того, в какой стране находится животное."
    ]
  },

  fashion: {
    title: "Мода и стиль для мира питомцев",
    intro:
      "Fashion & Style объединяет редакционные образы, новые идеи и дизайн для животных.",
    steps: [
      "Открывайте новую моду и аксессуары для питомцев.",
      "Смотрите сезонные образы и редакционные съёмки.",
      "Находите идеи стиля для разных животных.",
      "Знакомьтесь с брендами, дизайнерами и новинками.",
      "Открывайте pet-fashion как часть мира PETS & DOGUE."
    ]
  },

  wellness: {
    title: "Благополучие современного питомца",
    intro:
      "Wellness & SPA — это комфорт, забота и приятные процедуры для питомцев.",
    steps: [
      "Открывайте идеи груминга, SPA и wellness.",
      "Узнавайте, как сделать ежедневный уход спокойнее и приятнее.",
      "Находите идеи для отдыха и комфорта питомца.",
      "Открывайте новые pet-friendly wellness-впечатления.",
      "Делайте заботу о благополучии частью совместной жизни."
    ]
  },

  beauty: {
    title: "Красота, груминг и забота",
    intro:
      "Beauty & Grooming показывает профессиональный уход, современные тренды и индивидуальный стиль питомцев.",
    steps: [
      "Открывайте новые идеи и тренды груминга.",
      "Знакомьтесь с профессиональным уходом и красивыми grooming-пространствами.",
      "Находите вдохновение для шерсти, стрижек и образов.",
      "Смотрите творческие решения для разных питомцев.",
      "Соединяйте качественный уход с индивидуальным стилем."
    ]
  },

  active: {
    title: "Больше движения. Больше впечатлений. Вместе.",
    intro:
      "Sport & Active Life посвящён движению, прогулкам, спорту и активной жизни вместе с питомцами.",
    steps: [
      "Открывайте активности, которыми можно заниматься вместе.",
      "Находите идеи для прогулок, природы и движения.",
      "Делайте повседневную жизнь более активной.",
      "Открывайте новые виды отдыха вместе с питомцем.",
      "Превращайте движение и приключения в часть вашей совместной жизни."
    ]
  }
};

const HOW_UK = {

  petFriendly: {
    title: "Знаходьте місця, куди можна разом",
    intro:
      "Pet-Friendly Places допомагає знаходити цікаві місця поруч і розуміти умови відвідування з твариною.",
    steps: [
      "Відкривайте кафе, ресторани, готелі, парки, зелені зони та інші цікаві місця.",
      "Переглядайте доступну інформацію про відвідування із улюбленцем.",
      "Дізнавайтеся думку спільноти: чи можна з твариною всередину, назовні або в обидві зони.",
      "Знаходьте місця, де можна провести час поруч із тваринами, навіть якщо власного улюбленця у вас немає.",
      "Обирайте місце та вирушайте туди разом."
    ]
  },

  coverStar: {
    title: "Ваш улюбленець може стати зіркою PETS & DOGUE",
    intro:
      "Cover Star дає улюбленцям нашої спільноти можливість стати частиною PETS & DOGUE.",
    steps: [
      "Учасники клубу можуть подати свого улюбленця на конкурс Cover Star.",
      "Спільнота знайомиться з фіналістами та голосує за фаворитів.",
      "Переможець стає зіркою обкладинки PETS & DOGUE.",
      "Ще п’ять фіналістів отримують власну історію та фотографії в журналі.",
      "Нові конкурси дають можливість бути поміченими новим улюбленцям."
    ]
  },

  health: {
    title: "Корисна турбота — простіше й зрозуміліше",
    intro:
      "Health & Care збирає корисну інформацію про здоров’я та добробут улюбленців в одному місці.",
    steps: [
      "Читайте практичні матеріали про здоров’я та щоденний догляд.",
      "Дізнавайтеся більше про профілактику та відповідальне утримання тварин.",
      "Вивчайте матеріали про догляд і грумінг на різних етапах життя.",
      "Повертайтеся до корисної інформації, коли вона знадобиться.",
      "Матеріали допомагають краще орієнтуватися в догляді, але не замінюють консультацію ветеринара."
    ]
  },

  community: {
    title: "Ваше локальне pet-співтовариство поруч",
    intro:
      "Local Community допомагає людям із тваринами дізнаватися, що відбувається поруч, і спілкуватися.",
    steps: [
      "Знаходьте людей і корисні обговорення поруч.",
      "Дізнавайтеся про події, зустрічі та рекомендації спільноти.",
      "Діліться місцевою інформацією та власним досвідом.",
      "Допомагайте поширювати інформацію про загублених і знайдених тварин.",
      "Залишайтеся частиною pet-спільноти свого району."
    ]
  },

  marketplace: {
    title: "Купити. Продати. Віддати. Знайти.",
    intro:
      "Marketplace об’єднує товари, послуги та корисні оголошення для тварин в одному просторі.",
    steps: [
      "Переглядайте товари, послуги та оголошення для улюбленців.",
      "Шукайте саме те, що вам потрібно.",
      "Продавайте речі для тварин, які вам більше не потрібні.",
      "Віддавайте корисні речі іншим власникам тварин.",
      "Публікуйте власні оголошення та спілкуйтеся із зацікавленими людьми."
    ]
  },

  help: {
    title: "Допоможемо тварині бути поміченою",
    intro:
      "Help Animals створено для того, щоб тварини, яким потрібна допомога, отримували більше уваги.",
    steps: [
      "Знаходьте тварин, яким потрібні порятунок, лікування, новий дім, перетримка або термінова підтримка.",
      "Читайте їхню історію та дізнавайтеся, яка саме допомога потрібна.",
      "Діліться публікаціями, щоб тварину побачило більше людей.",
      "Допомагайте об’єднувати людей, волонтерів і спільноти.",
      "Поширюйте важливу інформацію незалежно від країни, де перебуває тварина."
    ]
  },

  fashion: {
    title: "Мода і стиль для світу улюбленців",
    intro:
      "Fashion & Style об’єднує редакційні образи, нові ідеї та дизайн для тварин.",
    steps: [
      "Відкривайте нову моду та аксесуари для улюбленців.",
      "Переглядайте сезонні образи й редакційні зйомки.",
      "Знаходьте ідеї стилю для різних тварин.",
      "Знайомтеся з брендами, дизайнерами та новинками.",
      "Відкривайте pet-fashion як частину світу PETS & DOGUE."
    ]
  },

  wellness: {
    title: "Добробут сучасного улюбленця",
    intro:
      "Wellness & SPA — це комфорт, турбота та приємні процедури для улюбленців.",
    steps: [
      "Відкривайте ідеї грумінгу, SPA та wellness.",
      "Дізнавайтеся, як зробити щоденний догляд спокійнішим і приємнішим.",
      "Знаходьте ідеї для відпочинку та комфорту.",
      "Відкривайте нові pet-friendly wellness-враження.",
      "Робіть турботу про добробут частиною спільного життя."
    ]
  },

  beauty: {
    title: "Краса, грумінг і турбота",
    intro:
      "Beauty & Grooming показує професійний догляд, сучасні тренди та індивідуальний стиль улюбленців.",
    steps: [
      "Відкривайте нові ідеї та тренди грумінгу.",
      "Знайомтеся з професійним доглядом і красивими grooming-просторами.",
      "Знаходьте натхнення для шерсті, стрижок та образів.",
      "Переглядайте творчі рішення для різних улюбленців.",
      "Поєднуйте якісний догляд з індивідуальним стилем."
    ]
  },

  active: {
    title: "Більше руху. Більше вражень. Разом.",
    intro:
      "Sport & Active Life присвячено руху, прогулянкам, спорту та активному життю разом з улюбленцями.",
    steps: [
      "Відкривайте активності, якими можна займатися разом.",
      "Знаходьте ідеї для прогулянок, природи та руху.",
      "Робіть повсякденне життя активнішим.",
      "Відкривайте нові види відпочинку разом з улюбленцем.",
      "Перетворюйте рух і пригоди на частину вашого спільного життя."
    ]
  }
};

function howContent(key) {
  const lang = currentLanguage();

  if (lang === "ru") {
    return HOW_RU[key] || HOW_EN[key];
  }

  if (lang === "uk") {
    return HOW_UK[key] || HOW_EN[key];
  }

  return HOW_EN[key];
}

/* =========================================================
   CARD
========================================================= */

function card({
  image,
  label,
  title,
  text,
  className = "",
  vote = false,
  accent = false,
  howKey = ""
}) {
  return `
    <article
      class="pdv4-card ${className} ${accent ? "pdv4-accent" : ""}"
      data-speech-section
    >
      <button
        type="button"
        class="pdv4-card-link pdv4-card-button"
        data-how-key="${esc(howKey)}"
        data-how-label="${esc(label)}"
        data-how-title="${esc(title)}"
        data-how-text="${esc(text)}"
        aria-label="${esc(t("howItWorks"))}: ${esc(title)}"
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
            ${esc(t("howItWorks"))} →
          </span>

        </div>

      </button>

      ${listenButton()}

    </article>
  `;
}

/* =========================================================
   HOW IT WORKS MODAL
========================================================= */

function removeHowModal() {
  const modal =
    document.querySelector(
      ".pdv4-how-modal"
    );

  if (!modal) {
    return;
  }

  modal.classList.remove(
    "is-open"
  );

  document.body.classList.remove(
    "pdv4-modal-open"
  );

  window.setTimeout(
    function () {
      if (modal && modal.parentNode) {
        modal.remove();
      }

      window.scrollTo(
        0,
        howModalScrollY
      );
    },
    260
  );
}

function closeHowModal(options = {}) {

  const modal =
    document.querySelector(
      ".pdv4-how-modal"
    );

  if (!modal) {
    return;
  }

  const fromHistory =
    options.fromHistory === true;

  if (
    howModalHistoryActive &&
    !fromHistory
  ) {
    howModalHistoryActive = false;

    try {
      window.history.back();
      return;
    } catch (error) {
      removeHowModal();
      return;
    }
  }

  howModalHistoryActive = false;
  removeHowModal();
}

function openHowModal(button) {

  if (!button) {
    return;
  }

  const key =
    button.getAttribute(
      "data-how-key"
    );

  const info =
    howContent(key);

  if (!info) {
    return;
  }

  const label =
    button.getAttribute(
      "data-how-label"
    ) || "";

  const originalText =
    button.getAttribute(
      "data-how-text"
    ) || "";

  const oldModal =
    document.querySelector(
      ".pdv4-how-modal"
    );

  if (oldModal) {
    oldModal.remove();
  }

  howModalScrollY =
    window.scrollY ||
    window.pageYOffset ||
    0;

  const steps =
    Array.isArray(info.steps)
      ? info.steps
      : [];

  try {
    window.history.pushState(
      {
        petsDogueHowModal: true,
        howKey: key
      },
      "",
      window.location.href
    );

    howModalHistoryActive = true;
  } catch (error) {
    howModalHistoryActive = false;
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div
        class="pdv4-how-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdv4HowTitle"
      >

        <div
          class="pdv4-how-backdrop"
          aria-hidden="true"
        ></div>

        <div
          class="pdv4-how-panel"
          data-speech-section
        >

          <div class="pdv4-how-header">

            <button
              type="button"
              class="pdv4-how-back"
              aria-label="${esc(t("back"))}"
            >
              <span
                class="pdv4-how-back-arrow"
                aria-hidden="true"
              >
                ←
              </span>

              <span class="pdv4-how-back-text">
                ${esc(t("back"))}
              </span>
            </button>

            <div class="pdv4-how-tools">
              ${listenButton()}
            </div>

          </div>

          <div class="pdv4-how-scroll">

            <div class="pdv4-how-kicker">
              ${esc(label)}
            </div>

            <h2 id="pdv4HowTitle">
              ${esc(info.title)}
            </h2>

            <p class="pdv4-how-intro">
              ${esc(info.intro)}
            </p>

            <div class="pdv4-how-divider"></div>

            <div class="pdv4-how-steps">

              ${steps.map(
                function (step, index) {
                  return `
                    <div class="pdv4-how-step">

                      <div class="pdv4-how-number">
                        ${String(index + 1).padStart(2, "0")}
                      </div>

                      <p>
                        ${esc(step)}
                      </p>

                    </div>
                  `;
                }
              ).join("")}

            </div>

            <div class="pdv4-how-summary">
              ${esc(originalText)}
            </div>

            <button
              type="button"
              class="pdv4-how-bottom-back"
              aria-label="${esc(t("back"))}"
            >
              <span aria-hidden="true">←</span>
              ${esc(t("back"))}
            </button>

          </div>

        </div>

      </div>
    `
  );

  document.body.classList.add(
    "pdv4-modal-open"
  );

  const modal =
    document.querySelector(
      ".pdv4-how-modal"
    );

  requestAnimationFrame(
    function () {
      if (modal) {
        modal.classList.add(
          "is-open"
        );
      }
    }
  );

  const backButton =
    modal &&
    modal.querySelector(
      ".pdv4-how-back"
    );

  if (backButton) {
    backButton.focus({
      preventScroll: true
    });
  }
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
  --pd-green:#65e51f;
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
  text-shadow:0 3px 30px rgba(0,0,0,.3);
}

.pdv4-hero h1 em{
  font-weight:400;
  font-style:italic;
}

/* LISTEN */

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
  border:1px solid rgba(255,255,255,.62);
  background:rgba(0,0,0,.44);
  color:#fff;
  cursor:pointer;
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}

/* SECTION */

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

.pdv4-card-button{
  width:100%;
  margin:0;
  padding:0;
  border:0;
  background:transparent;
  color:inherit;
  text-align:left;
  font:inherit;
  cursor:pointer;
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
  grid-column:span 3;
}

.pdv4-media{
  position:relative;
  overflow:hidden;
  min-height:390px;
}

.pdv4-card.large .pdv4-media,
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

.pdv4-accent .pdv4-label{
  color:#fff;
  padding-left:10px;
  border-left:3px solid var(--pd-red);
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

.pdv4-card.small .pdv4-overlay-copy h2{
  font-size:clamp(24px,3vw,37px);
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
  display:inline-block;
  font-size:10px;
  font-weight:900;
  letter-spacing:1.1px;
  text-transform:uppercase;
  color:#fff;
}

.pdv4-accent .pdv4-arrow{
  border-bottom:2px solid var(--pd-red);
  padding-bottom:3px;
}

.pdv4-vote{
  position:absolute;
  z-index:5;
  top:16px;
  left:16px;
  padding:10px 13px;
  border-radius:999px;
  background:var(--pd-red);
  color:#fff;
  font-size:11px;
  font-weight:950;
  letter-spacing:.8px;
  box-shadow:0 8px 25px rgba(0,0,0,.25);
}

/* =========================================================
   CLUB
========================================================= */

.pdv4-membership{
  max-width:1280px;
  margin:14px auto 0;
  padding:46px 0 12px;
  position:relative;
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
  font:
    400
    clamp(40px,6vw,78px)/.9
    Georgia,
    "Times New Roman",
    serif;
  letter-spacing:-2px;
}

.pdv4-membership-intro{
  color:var(--pd-red-soft);
  font-size:20px;
  line-height:1.48;
  font-weight:700;
  max-width:620px;
  margin:0;
}

.pdv4-benefits{
  display:grid;
  grid-template-columns:1.15fr 1fr 1fr;
  gap:8px;
}

.pdv4-benefit{
  position:relative;
  min-height:300px;
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
  background:
    linear-gradient(
      to top,
      rgba(0,0,0,.84),
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
    20px/1.05
    Georgia,
    "Times New Roman",
    serif;
}

.pdv4-benefit-contest{
  border-bottom:3px solid var(--pd-red);
}

.pdv4-benefit-contest span{
  padding-left:9px;
  border-left:3px solid var(--pd-red);
}

.pdv4-contest-rating{
  position:absolute;
  z-index:4;
  top:14px;
  left:14px;
  right:55px;
  display:flex;
  align-items:center;
  gap:7px;
  flex-wrap:wrap;
}

.pdv4-hearts{
  color:var(--pd-red);
  font-size:18px;
  letter-spacing:2px;
  text-shadow:0 1px 10px rgba(0,0,0,.65);
}

.pdv4-winner{
  display:inline-flex;
  align-items:center;
  min-height:28px;
  padding:0 10px;
  border-radius:999px;
  background:var(--pd-red);
  color:#fff;
  font-size:9px;
  font-weight:950;
  letter-spacing:1px;
}

.pdv4-join{
  display:inline-flex;
  margin:18px 0 0;
  min-height:44px;
  align-items:center;
  padding:0 20px;
  border-radius:999px;
  background:var(--pd-green);
  color:#090909 !important;
  font-size:11px;
  font-weight:950;
  letter-spacing:.8px;
  text-transform:uppercase;
}

.pdv4-join:hover{
  background:#fff;
}

/* =========================================================
   ADVERTISING
========================================================= */

.pdv4-ad{
  max-width:1280px;
  margin:46px auto;
  min-height:330px;
  position:relative;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.23);
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
  background:var(--pd-red);
}

.pdv4-ad img{
  position:absolute;
  inset:0;
  height:100%;
  object-fit:cover;
  filter:brightness(.58) saturate(.82);
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
      rgba(0,0,0,.88),
      rgba(0,0,0,.15)
    );
}

.pdv4-ad-copy{
  position:relative;
  z-index:3;
  min-height:330px;
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
  color:var(--pd-red-soft);
}

.pdv4-ad h2{
  margin:0;
  font:
    400
    clamp(34px,5vw,60px)/.92
    Georgia,
    "Times New Roman",
    serif;
}

.pdv4-ad p{
  max-width:560px;
  margin:12px 0 17px;
  color:#d1ccc4;
  line-height:1.5;
  font-size:13px;
}

.pdv4-ad a{
  display:inline-flex;
  align-self:flex-start;
  border-bottom:2px solid var(--pd-red);
  padding-bottom:5px;
  font-size:10px;
  font-weight:900;
  letter-spacing:1px;
  text-transform:uppercase;
}

/* PHONE ADVERTISING VISUAL */

.pdv4-phone{
  position:absolute;
  z-index:3;
  right:7%;
  top:50%;
  transform:translateY(-50%) rotate(4deg);
  width:132px;
  height:250px;
  border:7px solid #090909;
  border-radius:24px;
  background:#fff;
  overflow:hidden;
  box-shadow:0 25px 60px rgba(0,0,0,.45);
}

.pdv4-phone-screen{
  width:100%;
  height:100%;
  position:relative;
  background:#f4f0e8;
  color:#111;
  padding:18px 8px 8px;
}

.pdv4-phone-brand{
  font:
    400
    15px/1
    Georgia,
    "Times New Roman",
    serif;
  text-align:center;
  margin-bottom:10px;
}

.pdv4-phone-screen img{
  position:relative;
  inset:auto;
  width:100%;
  height:120px;
  object-fit:cover;
  filter:none;
}

.pdv4-phone-adtext{
  margin-top:8px;
  font-size:8px;
  line-height:1.25;
  font-weight:800;
  text-align:center;
}

/* =========================================================
   HOW IT WORKS MODAL
========================================================= */

body.pdv4-modal-open{
  overflow:hidden;
}

.pdv4-how-modal{
  position:fixed;
  z-index:2147483000;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:18px;
  opacity:0;
  visibility:hidden;
  transition:
    opacity .25s ease,
    visibility .25s ease;
}

.pdv4-how-modal.is-open{
  opacity:1;
  visibility:visible;
}

.pdv4-how-backdrop{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.82);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}

.pdv4-how-panel{
  position:relative;
  z-index:2;
  width:min(760px,100%);
  max-height:min(850px,92vh);
  overflow:hidden;
  background:#0b0b0b;
  color:#fff;
  border:1px solid rgba(255,255,255,.24);
  box-shadow:0 30px 100px rgba(0,0,0,.7);
  transform:translateY(18px) scale(.985);
  transition:transform .28s ease;
}

.pdv4-how-modal.is-open .pdv4-how-panel{
  transform:translateY(0) scale(1);
}

/* NEW HEADER: BACK LEFT + LISTEN RIGHT */

.pdv4-how-header{
  position:absolute;
  z-index:30;
  top:0;
  left:0;
  right:0;
  min-height:68px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
  padding:12px 15px;
  background:
    linear-gradient(
      to bottom,
      rgba(11,11,11,.98) 0%,
      rgba(11,11,11,.90) 72%,
      rgba(11,11,11,0) 100%
    );
  pointer-events:none;
}

.pdv4-how-back,
.pdv4-how-tools{
  pointer-events:auto;
}

.pdv4-how-back{
  min-height:44px;
  display:inline-flex;
  align-items:center;
  gap:9px;
  margin:0;
  padding:0 14px 0 10px;
  border:1px solid rgba(255,255,255,.38);
  border-radius:999px;
  background:rgba(0,0,0,.56);
  color:#fff;
  font:inherit;
  cursor:pointer;
  backdrop-filter:blur(10px);
  -webkit-backdrop-filter:blur(10px);
}

.pdv4-how-back-arrow{
  display:block;
  font-size:25px;
  line-height:1;
  font-weight:300;
  transform:translateY(-1px);
}

.pdv4-how-back-text{
  font-size:11px;
  line-height:1;
  font-weight:900;
  letter-spacing:.8px;
  text-transform:uppercase;
}

.pdv4-how-tools{
  display:flex;
  align-items:center;
  justify-content:flex-end;
}

.pdv4-how-tools .pdv4-listen{
  position:relative;
  top:auto;
  right:auto;
  width:44px;
  height:44px;
}

.pdv4-how-scroll{
  max-height:min(850px,92vh);
  overflow-y:auto;
  overscroll-behavior:contain;
  padding:
    clamp(82px,10vw,102px)
    clamp(22px,6vw,62px)
    clamp(30px,6vw,58px);
}

.pdv4-how-kicker{
  margin-bottom:12px;
  padding-left:11px;
  border-left:3px solid #d71920;
  color:#e4c98f;
  font-size:10px;
  line-height:1.3;
  font-weight:950;
  letter-spacing:1.8px;
  text-transform:uppercase;
}

.pdv4-how-panel h2{
  max-width:610px;
  margin:0;
  font:
    400
    clamp(40px,7vw,72px)/.92
    Georgia,
    "Times New Roman",
    serif;
  letter-spacing:-2px;
}

.pdv4-how-intro{
  max-width:600px;
  margin:22px 0 0;
  color:#ddd7ce;
  font-size:17px;
  line-height:1.55;
}

.pdv4-how-divider{
  width:100%;
  height:1px;
  margin:30px 0 7px;
  background:
    linear-gradient(
      90deg,
      #d71920 0 70px,
      rgba(255,255,255,.18) 70px
    );
}

.pdv4-how-steps{
  width:100%;
}

.pdv4-how-step{
  display:grid;
  grid-template-columns:54px 1fr;
  gap:16px;
  align-items:start;
  padding:20px 0;
  border-bottom:1px solid rgba(255,255,255,.12);
}

.pdv4-how-number{
  color:#d71920;
  font:
    italic
    400
    25px/1
    Georgia,
    "Times New Roman",
    serif;
}

.pdv4-how-step p{
  margin:0;
  color:#f2eee7;
  font-size:15px;
  line-height:1.55;
}

.pdv4-how-summary{
  margin-top:27px;
  padding:20px;
  border-left:3px solid #c7a05b;
  background:#151515;
  color:#c8c2b9;
  font-size:13px;
  line-height:1.55;
}

/* BOTTOM BACK BUTTON */

.pdv4-how-bottom-back{
  width:100%;
  min-height:54px;
  margin:24px 0 0;
  padding:0 18px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  border:1px solid rgba(255,255,255,.34);
  border-radius:999px;
  background:#111;
  color:#fff;
  font:inherit;
  font-size:11px;
  font-weight:950;
  letter-spacing:1px;
  text-transform:uppercase;
  cursor:pointer;
}

.pdv4-how-bottom-back span{
  font-size:22px;
  line-height:1;
  font-weight:300;
}

.pdv4-how-bottom-back:hover,
.pdv4-how-back:hover{
  border-color:#fff;
  background:#1a1a1a;
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

  .pdv4-card.medium,
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
    font-size:12px;
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

  .pdv4-membership-intro{
    font-size:17px;
  }

  .pdv4-benefits{
    grid-template-columns:1.15fr 1fr 1fr;
  }

  .pdv4-benefit,
  .pdv4-benefit:first-child{
    min-height:230px;
  }

  .pdv4-ad{
    margin:34px 8px;
    min-height:280px;
  }

  .pdv4-ad-copy{
    min-height:280px;
    padding:22px;
    max-width:60%;
  }

  .pdv4-phone{
    right:5%;
    width:110px;
    height:215px;
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
    padding:22px 6px 34px;
  }

  .pdv4-section-head{
    margin:0 2px 10px;
    padding:0 5px 10px;
    align-items:flex-end;
    gap:8px;
  }

  .pdv4-section-head h2{
    font-size:31px;
    line-height:.98;
  }

  .pdv4-section-head span{
    font-size:9px;
    line-height:1.25;
    letter-spacing:1px;
    text-align:right;
  }

  .pdv4-grid{
    grid-template-columns:repeat(12,minmax(0,1fr));
    grid-auto-flow:dense;
    gap:5px;
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
    grid-column:span 6;
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
    min-height:270px;
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
  .pdv4-card.small .pdv4-overlay-copy h2{
    font-size:22px;
    line-height:.98;
    letter-spacing:-.55px;
  }

  .pdv4-card.large .pdv4-overlay-copy h2{
    font-size:28px;
  }

  .pdv4-card.wide .pdv4-overlay-copy h2{
    font-size:25px;
  }

  .pdv4-label{
    margin-bottom:6px;
    font-size:9px;
    line-height:1.2;
    letter-spacing:1.1px;
  }

  .pdv4-card-copy{
    min-height:105px;
    padding:11px 11px 12px;
  }

  .pdv4-card-copy p{
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:4;
    overflow:hidden;
    margin:0 0 9px;
    color:#bbb6ae;
    font-size:11px;
    line-height:1.42;
  }

  .pdv4-card.small .pdv4-card-copy p{
    font-size:10.5px;
    line-height:1.4;
  }

  .pdv4-arrow{
    font-size:9px;
    line-height:1.2;
    letter-spacing:.8px;
  }

  .pdv4-listen{
    top:9px;
    right:9px;
    width:34px;
    height:34px;
    font-size:13px;
    background:rgba(0,0,0,.38);
  }

  .pdv4-vote{
    top:9px;
    left:9px;
    padding:7px 9px;
    font-size:9px;
  }

  .pdv4-membership{
    padding:30px 2px 4px;
  }

  .pdv4-membership-top{
    padding:0 6px;
    margin-bottom:15px;
  }

  .pdv4-membership-kicker{
    font-size:9px;
    letter-spacing:1.5px;
  }

  .pdv4-membership h2{
    margin-top:6px;
    font-size:38px;
    line-height:.94;
  }

  .pdv4-membership-intro{
    font-size:15px;
    line-height:1.48;
  }

  .pdv4-benefits{
    grid-template-columns:repeat(12,minmax(0,1fr));
    gap:5px;
  }

  .pdv4-benefit:first-child{
    grid-column:span 7;
    min-height:245px;
  }

  .pdv4-benefit:nth-child(2){
    grid-column:span 5;
    min-height:245px;
  }

  .pdv4-benefit:nth-child(3){
    grid-column:span 12;
    min-height:195px;
  }

  .pdv4-benefit span{
    left:10px;
    right:10px;
    bottom:10px;
    font-size:17px;
  }

  .pdv4-benefit:first-child span{
    font-size:19px;
  }

  .pdv4-hearts{
    font-size:15px;
  }

  .pdv4-winner{
    font-size:8px;
    min-height:24px;
  }

  .pdv4-join{
    margin:14px 6px 0;
    min-height:42px;
    padding:0 18px;
    font-size:10px;
  }

  .pdv4-ad{
    margin:29px 2px;
    min-height:285px;
  }

  .pdv4-ad-copy{
    min-height:285px;
    padding:18px;
    max-width:67%;
  }

  .pdv4-ad-label{
    font-size:9px;
    line-height:1.2;
    letter-spacing:1.4px;
  }

  .pdv4-ad h2{
    font-size:32px;
  }

  .pdv4-ad p{
    margin:10px 0 14px;
    max-width:220px;
    font-size:11px;
    line-height:1.45;
  }

  .pdv4-ad a{
    font-size:9px;
  }

  .pdv4-phone{
    right:3%;
    width:82px;
    height:160px;
    border-width:5px;
    border-radius:17px;
  }

  .pdv4-phone-screen{
    padding:12px 5px 5px;
  }

  .pdv4-phone-brand{
    font-size:9px;
    margin-bottom:6px;
  }

  .pdv4-phone-screen img{
    height:78px;
  }

  .pdv4-phone-adtext{
    font-size:5.5px;
  }

  /* HOW IT WORKS — MOBILE */

  .pdv4-how-modal{
    align-items:flex-end;
    padding:0;
  }

  .pdv4-how-panel{
    width:100%;
    max-height:92vh;
    border-left:0;
    border-right:0;
    border-bottom:0;
    border-radius:20px 20px 0 0;
  }

  .pdv4-how-scroll{
    max-height:92vh;
    padding:
      76px
      20px
      36px;
  }

  .pdv4-how-header{
    min-height:64px;
    padding:10px 12px;
  }

  .pdv4-how-back{
    min-height:40px;
    padding:0 12px 0 8px;
    gap:7px;
  }

  .pdv4-how-back-arrow{
    font-size:23px;
  }

  .pdv4-how-back-text{
    font-size:10px;
  }

  .pdv4-how-tools .pdv4-listen{
    width:40px;
    height:40px;
  }

  .pdv4-how-panel h2{
    max-width:310px;
    font-size:42px;
    line-height:.94;
    letter-spacing:-1.5px;
  }

  .pdv4-how-intro{
    margin-top:17px;
    font-size:15px;
    line-height:1.5;
  }

  .pdv4-how-divider{
    margin-top:24px;
  }

  .pdv4-how-step{
    grid-template-columns:40px 1fr;
    gap:10px;
    padding:17px 0;
  }

  .pdv4-how-number{
    font-size:21px;
  }

  .pdv4-how-step p{
    font-size:14px;
    line-height:1.5;
  }

  .pdv4-how-summary{
    margin-top:22px;
    padding:16px;
    font-size:12px;
  }

  .pdv4-how-bottom-back{
    min-height:52px;
    margin-top:22px;
    font-size:10px;
  }
}

</style>
  `;
}

/* =========================================================
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

  const oldContent =
    root.querySelector(
      ".pdv4-home"
    );

  if (oldContent) {
    oldContent.remove();
  }

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

        <!-- =================================================
             MAIN STORIES
        ================================================== -->

        <div class="pdv4-grid">

          ${card({
            image: "pet-friendly.jpg",
            label: t("petFriendlyLabel"),
            title: t("petFriendlyTitle"),
            text: t("petFriendlyText"),
            className: "large",
            howKey: "petFriendly"
          })}

          ${card({
            image: "cover-star/cover-miso-luxury.png",
            label: t("coverLabel"),
            title: t("coverTitle"),
            text: t("coverText"),
            className: "tall",
            vote: true,
            accent: true,
            howKey: "coverStar"
          })}

          ${card({
            image: "club-pet-health.png",
            label: t("healthLabel"),
            title: t("healthTitle"),
            text: t("healthText"),
            className: "medium",
            howKey: "health"
          })}

          ${card({
            image: "community.jpg",
            label: t("communityLabel"),
            title: t("communityTitle"),
            text: t("communityText"),
            className: "wide",
            accent: true,
            howKey: "community"
          })}

        </div>

        <!-- =================================================
             CLUB
        ================================================== -->

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
              class="pdv4-benefit pdv4-benefit-contest"
              href="contests.html"
            >

              <img
                src="cover-star/cover-surf-parrot.png"
                alt="${esc(t("contests"))}"
                loading="lazy"
              />

              <div class="pdv4-contest-rating">

                <div class="pdv4-hearts">
                  ♥ ♥ ♥ ♥ ♥
                </div>

                <div class="pdv4-winner">
                  ${esc(t("contestWinner"))}
                </div>

              </div>

              <span>
                ${esc(t("contests"))}
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

        <!-- =================================================
             BRAND ADVERTISING
        ================================================== -->

        <section
          class="pdv4-ad"
          data-speech-section
        >

          <img
            src="cover-star/cover-golf-bulldog.png"
            alt="PETS & DOGUE advertising"
            loading="lazy"
          />

          ${listenButton()}

          <div class="pdv4-phone">

            <div class="pdv4-phone-screen">

              <div class="pdv4-phone-brand">
                PETS & DOGUE
              </div>

              <img
                src="cover-star/cover-golf-bulldog.png"
                alt=""
              />

              <div class="pdv4-phone-adtext">
                YOUR BRAND<br/>
                PREMIUM PLACEMENT
              </div>

            </div>

          </div>

          <div class="pdv4-ad-copy">

            <div class="pdv4-ad-label">
              ${esc(t("ad"))}
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

        <!-- =================================================
             MARKETPLACE + HELP
        ================================================== -->

        <div class="pdv4-grid">

          ${card({
            image: "marketplace.jpg",
            label: t("marketplaceLabel"),
            title: t("marketplaceTitle"),
            text: t("marketplaceText"),
            className: "large",
            accent: true,
            howKey: "marketplace"
          })}

          ${card({
            image: "help-animals.jpg",
            label: t("helpLabel"),
            title: t("helpTitle"),
            text: t("helpText"),
            className: "tall",
            accent: true,
            howKey: "help"
          })}

        </div>

        <!-- =================================================
             STYLE / WELLNESS / BEAUTY / ACTIVE LIFE
        ================================================== -->

        <div class="pdv4-grid">

          ${card({
            image: "cover-star/cover-horse-salon.png",
            label: t("fashionLabel"),
            title: t("fashionTitle"),
            text: t("fashionText"),
            className: "small",
            howKey: "fashion"
          })}

          ${card({
            image: "cover-star/cover-turtle-spa.png",
            label: t("wellnessLabel"),
            title: t("wellnessTitle"),
            text: t("wellnessText"),
            className: "small",
            howKey: "wellness"
          })}

          ${card({
            image: "beauty-grooming.jpg",
            label: t("beautyLabel"),
            title: t("beautyTitle"),
            text: t("beautyText"),
            className: "small",
            howKey: "beauty"
          })}

          ${card({
            image: "active-life.jpg",
            label: t("activeLabel"),
            title: t("activeTitle"),
            text: t("activeText"),
            className: "small",
            howKey: "active"
          })}

        </div>

      </section>

    </div>
    `
  );

  const oldSections =
    Array.from(
      root.children
    );

  oldSections.forEach(
    function (element) {

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

  if (
    document.querySelector(
      ".pdv4-how-modal"
    )
  ) {
    closeHowModal();
  }

  render();
}

/* =========================================================
   EVENTS
========================================================= */

function handleDocumentClick(event) {

  const howButton =
    event.target.closest(
      ".pdv4-card-button"
    );

  if (howButton) {

    event.preventDefault();

    openHowModal(
      howButton
    );

    return;
  }

  const backButton =
    event.target.closest(
      ".pdv4-how-back, .pdv4-how-bottom-back"
    );

  if (backButton) {

    event.preventDefault();

    closeHowModal();

    return;
  }
}

function handleDocumentKeydown(event) {

  if (
    event.key === "Escape" &&
    document.querySelector(
      ".pdv4-how-modal"
    )
  ) {
    event.preventDefault();
    closeHowModal();
  }
}

function handlePopState() {

  const modal =
    document.querySelector(
      ".pdv4-how-modal"
    );

  if (!modal) {
    howModalHistoryActive = false;
    return;
  }

  if (closingFromPopstate) {
    return;
  }

  closingFromPopstate = true;
  howModalHistoryActive = false;

  closeHowModal({
    fromHistory: true
  });

  window.setTimeout(
    function () {
      closingFromPopstate = false;
    },
    300
  );
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

  document.addEventListener(
    "click",
    handleDocumentClick
  );

  document.addEventListener(
    "keydown",
    handleDocumentKeydown
  );

  window.addEventListener(
    "popstate",
    handlePopState
  );

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
