/* =========================================================
   PETS & DOGUE — ISSUE 01 — JESSICA
   STATIC MULTILINGUAL STORY
   23 LANGUAGES · NO API

   FINAL LANGUAGE SYSTEM
   ---------------------------------------------------------
   • Same 23 languages as PETS & DOGUE global shell
   • One persistent language
   • Immediate article translation
   • Synchronised with global shell
   • Correct <br> rendering
   • Arabic RTL
   • Hindi supported
   • Language preserved in internal links
   • Back / Forward language preserved
   • No translation API
   ========================================================= */

(function () {
  "use strict";

  const STORE_KEY = "pets_dogue_language";

  const ALIASES = {
    ua: "uk",
    cz: "cs",
    gr: "el",
    se: "sv",
    dk: "da"
  };

  const SUPPORTED = [
    "en",
    "uk",
    "ru",
    "fr",
    "de",
    "es",
    "it",
    "pt",
    "nl",
    "pl",
    "cs",
    "sk",
    "ro",
    "bg",
    "el",
    "tr",
    "sv",
    "da",
    "no",
    "fi",
    "hu",
    "ar",
    "hi"
  ];

  const RTL = new Set(["ar"]);

  /*
   * These translation values intentionally contain HTML.
   *
   * Some Jessica headings use <br>.
   * Some profile lines use <strong>.
   *
   * The final renderer at the bottom of this file therefore
   * safely renders our own static translation dictionary as HTML.
   *
   * This fixes the visible:
   *
   *     SOFT<br>OUTSIDE
   *
   * problem from the previous version.
   */

  const T = {

    /* =====================================================
       ENGLISH
       ===================================================== */

    en: {
      heroKicker: "PETS & DOGUE · ISSUE 01<br>COVER STORY",
      meet: "Meet",
      heroSub: "Gentle<br>British lady.",
      heroText: "Calm, observant and wonderfully independent, Jessica is the kind of cat who never needs to demand attention. She simply chooses her favourite place, watches the world and lets everyone else discover her on her own terms.",

      backIssue: "← Back to Issue 01",

      introKicker: "Quiet confidence ♥",
      introTitle: "Soft<br>outside.",
      introText: "A British Shorthair with beautiful golden eyes, a plush grey coat and a character all her own. Jessica does not rush. She observes first. Then she decides.",

      profileKicker: "The Jessica profile",
      profileTitle: "CALM.<br>CURIOUS.<br>COMPLETELY HERSELF.",
      profileSub: "British Shorthair · professional observer",

      name: "<strong>Name:</strong> Jessica",
      breed: "<strong>Breed:</strong> British Shorthair",
      eyes: "<strong>Eyes:</strong> warm golden",
      coat: "<strong>Coat:</strong> soft, plush and grey",
      personality: "<strong>Personality:</strong> calm, observant and independent",
      favourite: "<strong>Favourite place:</strong> somewhere comfortable with a good view",
      afternoon: "<strong>Perfect afternoon:</strong> sunshine, peace and her own favourite chair",
      feature: "<strong>Special feature:</strong> quiet confidence",

      noHurry: "No need to hurry.",
      hasTime: "JESSICA HAS TIME.",

      observerKicker: "Her favourite television",
      observerTitle: "THE WORLD<br>OUTSIDE",
      observerText: "A window can be an entire universe. People passing. Leaves moving. Birds appearing and disappearing. Light changing across the day. Jessica can watch it all without ever needing to be in the middle of it.",

      homeKicker: "Home is a very good place ♥",
      homeTitle: "THE ART OF<br>BEING COMFORTABLE",
      home1: "Some animals want every day to become an expedition.",
      home2: "Jessica understands another kind of luxury.",
      home3: "A soft bed.",
      home4: "A warm patch of sunlight.",
      home5: "A familiar window.",
      home6: "A peaceful garden.",
      home7: "A place where she can stretch, settle down and simply watch.",
      home8: "There is nothing boring about being at home when you know exactly how to enjoy it.",

      pullquote: "Comfort is not laziness.<br>It is an art.",

      momentsKicker: "Jessica moments",
      momentsTitle: "HER FAVOURITE<br>KIND OF DAY",

      softPlace: "Soft place ♥",
      softPlaceText: "The perfect place to do absolutely nothing.",

      windowWatch: "Window watch",
      windowWatchText: "There is always something worth noticing.",

      gardenTime: "Garden time 🌿",
      gardenTimeText: "Fresh air, sunshine and no unnecessary hurry.",

      rulesKicker: "Her rules",
      rulesTitle: "AFFECTION<br>ON HER TERMS",

      tag1: "👀 Observant",
      tag2: "♥ Gentle",
      tag3: "☁️ Soft",
      tag4: "🪟 Curious",
      tag5: "🌿 Peaceful",
      tag6: "⭐ Independent",

      rules1: "Independence does not mean a lack of affection.",
      rules2: "It simply means knowing what you want.",
      rules3: "Jessica does not need to follow everyone from room to room.",
      rules4: "She does not need to be the centre of every moment.",
      rules5: "She chooses when to come closer.",
      rules6: "She chooses when to stay.",
      rules7: "And somehow that makes the moment she chooses you feel even more special.",

      slowKicker: "A slow afternoon",
      slowTitle: "SUNSHINE.<br>SILENCE.<br>PERFECT.",
      slowText: "Give Jessica a comfortable chair, a little sunshine and enough peace to enjoy both, and there is very little else required.",

      ritualKicker: "Little rituals",
      ritualTitle: "SMALL MOMENTS<br>MATTER",
      ritual1: "Every personality has its little rituals.",
      ritual2: "The places we return to.",
      ritual3: "The things that make us stop.",
      ritual4: "The tiny moments that become part of an ordinary day.",
      ritual5: "For Jessica, even a simple pause beside a favourite dish can become a portrait of concentration.",

      finalKicker: "Cover star 03",
      finalTitle: "QUIETLY<br>UNFORGETTABLE",
      final1: "So this is Jessica.",
      final2: "A British Shorthair.",
      final3: "Soft grey fur.",
      final4: "Golden eyes.",
      final5: "A calm nature.",
      final6: "A talent for finding the most comfortable place in the room.",
      final7: "Curious enough to watch everything.",
      final8: "Independent enough not to need to join everything.",
      final9: "Gentle, observant and completely comfortable being exactly who she is.",
      final10: "Not every cover star needs to make noise.",
      final11: "Some simply look at you with golden eyes and become impossible to forget.",

      signature: "Meet",
      tagline: "One world. Every pet.",
      issueLink: "← Issue 01",
      homeLink: "Home"
    },

    /* =====================================================
       UKRAINIAN
       ===================================================== */

    uk: {
      heroKicker: "PETS & DOGUE · ВИПУСК 01<br>ІСТОРІЯ ОБКЛАДИНКИ",
      meet: "Знайомтеся:",
      heroSub: "Ніжна<br>британська леді.",
      heroText: "Спокійна, спостережлива й дивовижно незалежна, Jessica — саме та кішка, якій ніколи не потрібно вимагати уваги. Вона просто обирає улюблене місце, спостерігає за світом і дозволяє іншим пізнавати її на її власних умовах.",

      backIssue: "← Назад до Випуску 01",

      introKicker: "Тиха впевненість ♥",
      introTitle: "М’яка<br>зовні.",
      introText: "Британська короткошерста з прекрасними золотими очима, плюшевою сірою шерстю та абсолютно власним характером. Jessica не поспішає. Спочатку вона спостерігає. Потім вирішує.",

      profileKicker: "Профіль Jessica",
      profileTitle: "СПОКІЙНА.<br>ДОПИТЛИВА.<br>ЦІЛКОМ СОБОЮ.",
      profileSub: "Британська короткошерста · професійна спостерігачка",

      name: "<strong>Ім’я:</strong> Jessica",
      breed: "<strong>Порода:</strong> британська короткошерста",
      eyes: "<strong>Очі:</strong> теплі золоті",
      coat: "<strong>Шерсть:</strong> м’яка, плюшева та сіра",
      personality: "<strong>Характер:</strong> спокійна, спостережлива й незалежна",
      favourite: "<strong>Улюблене місце:</strong> десь затишно, з гарним краєвидом",
      afternoon: "<strong>Ідеальний день:</strong> сонце, спокій та її улюблене крісло",
      feature: "<strong>Особливість:</strong> тиха впевненість",

      noHurry: "Поспішати нікуди.",
      hasTime: "У JESSICA Є ЧАС.",

      observerKicker: "Її улюблений телевізор",
      observerTitle: "СВІТ<br>ЗОВНІ",
      observerText: "Вікно може бути цілим всесвітом. Люди проходять повз. Листя рухається. Птахи з’являються й зникають. Світло змінюється протягом дня. Jessica може спостерігати за всім цим, не маючи потреби бути в центрі подій.",

      homeKicker: "Дім — дуже гарне місце ♥",
      homeTitle: "МИСТЕЦТВО<br>КОМФОРТУ",
      home1: "Деякі тварини хочуть, щоб кожен день ставав експедицією.",
      home2: "Jessica розуміє інший вид розкоші.",
      home3: "М’яке ліжко.",
      home4: "Тепла пляма сонячного світла.",
      home5: "Знайоме вікно.",
      home6: "Тихий сад.",
      home7: "Місце, де можна витягнутися, влаштуватися зручніше й просто спостерігати.",
      home8: "У перебуванні вдома немає нічого нудного, якщо точно знаєш, як ним насолоджуватися.",

      pullquote: "Комфорт — це не лінь.<br>Це мистецтво.",

      momentsKicker: "Моменти Jessica",
      momentsTitle: "ЇЇ УЛЮБЛЕНИЙ<br>ДЕНЬ",

      softPlace: "М’яке місце ♥",
      softPlaceText: "Ідеальне місце, щоб абсолютно нічого не робити.",

      windowWatch: "Спостереження з вікна",
      windowWatchText: "Завжди знайдеться щось, що варто помітити.",

      gardenTime: "Час у саду 🌿",
      gardenTimeText: "Свіже повітря, сонце й жодного зайвого поспіху.",

      rulesKicker: "Її правила",
      rulesTitle: "НІЖНІСТЬ<br>НА ЇЇ УМОВАХ",

      tag1: "👀 Спостережлива",
      tag2: "♥ Ніжна",
      tag3: "☁️ М’яка",
      tag4: "🪟 Допитлива",
      tag5: "🌿 Спокійна",
      tag6: "⭐ Незалежна",

      rules1: "Незалежність не означає відсутності ніжності.",
      rules2: "Вона просто означає знати, чого ти хочеш.",
      rules3: "Jessica не потрібно ходити за всіма з кімнати в кімнату.",
      rules4: "Їй не потрібно бути в центрі кожної миті.",
      rules5: "Вона сама обирає, коли підійти ближче.",
      rules6: "Вона сама обирає, коли залишитися.",
      rules7: "І чомусь саме тому мить, коли вона обирає тебе, здається ще особливішою.",

      slowKicker: "Повільний день",
      slowTitle: "СОНЦЕ.<br>ТИША.<br>ІДЕАЛЬНО.",
      slowText: "Дайте Jessica зручне крісло, трохи сонця й достатньо спокою, щоб насолодитися і тим, і іншим — і більше майже нічого не потрібно.",

      ritualKicker: "Маленькі ритуали",
      ritualTitle: "МАЛЕНЬКІ МИТІ<br>ВАЖЛИВІ",
      ritual1: "У кожного характеру є свої маленькі ритуали.",
      ritual2: "Місця, куди ми повертаємося.",
      ritual3: "Речі, які змушують нас зупинитися.",
      ritual4: "Крихітні миті, що стають частиною звичайного дня.",
      ritual5: "Для Jessica навіть проста пауза біля улюбленої мисочки може перетворитися на портрет абсолютної зосередженості.",

      finalKicker: "Зірка обкладинки 03",
      finalTitle: "ТИХО<br>НЕЗАБУТНЯ",
      final1: "Отже, це Jessica.",
      final2: "Британська короткошерста.",
      final3: "М’яка сіра шерсть.",
      final4: "Золоті очі.",
      final5: "Спокійний характер.",
      final6: "Талант знаходити найзручніше місце в кімнаті.",
      final7: "Достатньо допитлива, щоб спостерігати за всім.",
      final8: "Достатньо незалежна, щоб не брати участі в усьому.",
      final9: "Ніжна, спостережлива й абсолютно комфортно почувається саме такою, якою вона є.",
      final10: "Не кожній зірці обкладинки потрібно шуміти.",
      final11: "Деякі просто дивляться на вас золотими очима — і їх уже неможливо забути.",

      signature: "Знайомтеся:",
      tagline: "Один світ. Кожен улюбленець.",
      issueLink: "← Випуск 01",
      homeLink: "Головна"
    },

    /* =====================================================
       RUSSIAN
       ===================================================== */

    ru: {
      heroKicker: "PETS & DOGUE · ВЫПУСК 01<br>ИСТОРИЯ ОБЛОЖКИ",
      meet: "Знакомьтесь:",
      heroSub: "Нежная<br>британская леди.",
      heroText: "Спокойная, наблюдательная и удивительно независимая, Jessica — именно та кошка, которой никогда не нужно требовать внимания. Она просто выбирает любимое место, наблюдает за миром и позволяет окружающим узнавать её на её собственных условиях.",

      backIssue: "← Назад к Выпуску 01",

      introKicker: "Тихая уверенность ♥",
      introTitle: "Мягкая<br>снаружи.",
      introText: "Британская короткошёрстная с прекрасными золотыми глазами, плюшевой серой шерстью и совершенно своим характером. Jessica не торопится. Сначала наблюдает. Потом решает.",

      profileKicker: "Профиль Jessica",
      profileTitle: "СПОКОЙНАЯ.<br>ЛЮБОПЫТНАЯ.<br>ПОЛНОСТЬЮ СОБОЙ.",
      profileSub: "Британская короткошёрстная · профессиональная наблюдательница",

      name: "<strong>Имя:</strong> Jessica",
      breed: "<strong>Порода:</strong> британская короткошёрстная",
      eyes: "<strong>Глаза:</strong> тёплые золотые",
      coat: "<strong>Шерсть:</strong> мягкая, плюшевая и серая",
      personality: "<strong>Характер:</strong> спокойная, наблюдательная и независимая",
      favourite: "<strong>Любимое место:</strong> где уютно и хороший вид",
      afternoon: "<strong>Идеальный день:</strong> солнце, покой и её любимое кресло",
      feature: "<strong>Особенность:</strong> тихая уверенность",

      noHurry: "Спешить некуда.",
      hasTime: "У JESSICA ЕСТЬ ВРЕМЯ.",

      observerKicker: "Её любимый телевизор",
      observerTitle: "МИР<br>СНАРУЖИ",
      observerText: "Окно может быть целой вселенной. Люди проходят мимо. Листья движутся. Птицы появляются и исчезают. Свет меняется в течение дня. Jessica может наблюдать за всем этим, совсем не нуждаясь в том, чтобы быть в центре событий.",

      homeKicker: "Дом — прекрасное место ♥",
      homeTitle: "ИСКУССТВО<br>КОМФОРТА",
      home1: "Некоторые животные хотят, чтобы каждый день превращался в экспедицию.",
      home2: "Jessica понимает другой вид роскоши.",
      home3: "Мягкая кровать.",
      home4: "Тёплый солнечный свет.",
      home5: "Знакомое окно.",
      home6: "Тихий сад.",
      home7: "Место, где можно вытянуться, устроиться поудобнее и просто наблюдать.",
      home8: "В том, чтобы быть дома, нет ничего скучного, если точно знаешь, как этим наслаждаться.",

      pullquote: "Комфорт — не лень.<br>Это искусство.",

      momentsKicker: "Моменты Jessica",
      momentsTitle: "ЕЁ ЛЮБИМЫЙ<br>ДЕНЬ",

      softPlace: "Мягкое место ♥",
      softPlaceText: "Идеальное место, чтобы совершенно ничего не делать.",

      windowWatch: "Наблюдение из окна",
      windowWatchText: "Всегда найдётся что-нибудь, достойное внимания.",

      gardenTime: "Время в саду 🌿",
      gardenTimeText: "Свежий воздух, солнце и никакой лишней спешки.",

      rulesKicker: "Её правила",
      rulesTitle: "НЕЖНОСТЬ<br>НА ЕЁ УСЛОВИЯХ",

      tag1: "👀 Наблюдательная",
      tag2: "♥ Нежная",
      tag3: "☁️ Мягкая",
      tag4: "🪟 Любопытная",
      tag5: "🌿 Спокойная",
      tag6: "⭐ Независимая",

      rules1: "Независимость не означает отсутствие нежности.",
      rules2: "Она просто означает знать, чего ты хочешь.",
      rules3: "Jessica не нужно ходить за всеми из комнаты в комнату.",
      rules4: "Ей не нужно быть центром каждого момента.",
      rules5: "Она сама выбирает, когда подойти ближе.",
      rules6: "Она сама выбирает, когда остаться.",
      rules7: "И почему-то именно поэтому момент, когда она выбирает тебя, кажется ещё более особенным.",

      slowKicker: "Неторопливый день",
      slowTitle: "СОЛНЦЕ.<br>ТИШИНА.<br>ИДЕАЛЬНО.",
      slowText: "Дайте Jessica удобное кресло, немного солнца и достаточно покоя, чтобы насладиться и тем, и другим — и больше почти ничего не потребуется.",

      ritualKicker: "Маленькие ритуалы",
      ritualTitle: "МАЛЕНЬКИЕ МОМЕНТЫ<br>ВАЖНЫ",
      ritual1: "У каждого характера есть свои маленькие ритуалы.",
      ritual2: "Места, куда мы возвращаемся.",
      ritual3: "Вещи, которые заставляют нас остановиться.",
      ritual4: "Маленькие моменты, которые становятся частью обычного дня.",
      ritual5: "Для Jessica даже простая пауза возле любимой мисочки может превратиться в портрет полной сосредоточенности.",

      finalKicker: "Звезда обложки 03",
      finalTitle: "ТИХО<br>НЕЗАБЫВАЕМАЯ",
      final1: "Итак, это Jessica.",
      final2: "Британская короткошёрстная.",
      final3: "Мягкая серая шерсть.",
      final4: "Золотые глаза.",
      final5: "Спокойный характер.",
      final6: "Талант находить самое удобное место в комнате.",
      final7: "Достаточно любопытная, чтобы наблюдать за всем.",
      final8: "Достаточно независимая, чтобы не участвовать во всём.",
      final9: "Нежная, наблюдательная и совершенно комфортно чувствующая себя именно такой, какая она есть.",
      final10: "Не каждой звезде обложки нужно шуметь.",
      final11: "Некоторые просто смотрят на вас золотыми глазами — и их уже невозможно забыть.",

      signature: "Знакомьтесь:",
      tagline: "Один мир. Каждый питомец.",
      issueLink: "← Выпуск 01",
      homeLink: "Главная"
    },    /* =====================================================
       FRENCH
       ===================================================== */

    fr: {
      heroKicker: "PETS & DOGUE · ÉDITION 01<br>HISTOIRE DE COUVERTURE",
      meet: "Découvrez",
      heroSub: "Une douce<br>dame britannique.",
      heroText: "Calme, observatrice et merveilleusement indépendante, Jessica est le genre de chatte qui n’a jamais besoin de réclamer l’attention. Elle choisit simplement son endroit préféré, observe le monde et laisse les autres la découvrir selon ses propres règles.",

      backIssue: "← Retour à l’Édition 01",

      introKicker: "Confiance tranquille ♥",
      introTitle: "Douce<br>à l’extérieur.",
      introText: "Une British Shorthair aux magnifiques yeux dorés, au pelage gris et soyeux et au caractère bien à elle. Jessica ne se presse pas. Elle observe d’abord. Puis elle décide.",

      profileKicker: "Le profil de Jessica",
      profileTitle: "CALME.<br>CURIEUSE.<br>PLEINEMENT ELLE-MÊME.",
      profileSub: "British Shorthair · observatrice professionnelle",

      name: "<strong>Nom :</strong> Jessica",
      breed: "<strong>Race :</strong> British Shorthair",
      eyes: "<strong>Yeux :</strong> dorés et chaleureux",
      coat: "<strong>Pelage :</strong> doux, dense et gris",
      personality: "<strong>Personnalité :</strong> calme, observatrice et indépendante",
      favourite: "<strong>Endroit préféré :</strong> un endroit confortable avec une belle vue",
      afternoon: "<strong>Après-midi parfait :</strong> soleil, tranquillité et son fauteuil préféré",
      feature: "<strong>Signe particulier :</strong> confiance tranquille",

      noHurry: "Inutile de se presser.",
      hasTime: "JESSICA A LE TEMPS.",

      observerKicker: "Sa télévision préférée",
      observerTitle: "LE MONDE<br>EXTÉRIEUR",
      observerText: "Une fenêtre peut être tout un univers. Des gens qui passent. Des feuilles qui bougent. Des oiseaux qui apparaissent et disparaissent. La lumière qui change au fil de la journée. Jessica peut tout observer sans jamais avoir besoin d’être au centre de l’action.",

      homeKicker: "La maison est un endroit merveilleux ♥",
      homeTitle: "L’ART<br>DU CONFORT",
      home1: "Certains animaux veulent que chaque journée devienne une expédition.",
      home2: "Jessica comprend une autre forme de luxe.",
      home3: "Un lit moelleux.",
      home4: "Un coin baigné de soleil.",
      home5: "Une fenêtre familière.",
      home6: "Un jardin paisible.",
      home7: "Un endroit où elle peut s’étirer, s’installer confortablement et simplement observer.",
      home8: "Rester chez soi n’a rien d’ennuyeux lorsqu’on sait exactement comment en profiter.",

      pullquote: "Le confort n’est pas de la paresse.<br>C’est un art.",

      momentsKicker: "Les moments de Jessica",
      momentsTitle: "SA JOURNÉE<br>IDÉALE",

      softPlace: "Un endroit douillet ♥",
      softPlaceText: "L’endroit parfait pour ne faire absolument rien.",

      windowWatch: "Observation à la fenêtre",
      windowWatchText: "Il y a toujours quelque chose qui mérite d’être remarqué.",

      gardenTime: "Moment au jardin 🌿",
      gardenTimeText: "De l’air frais, du soleil et aucune précipitation inutile.",

      rulesKicker: "Ses règles",
      rulesTitle: "L’AFFECTION<br>À SA MANIÈRE",

      tag1: "👀 Observatrice",
      tag2: "♥ Douce",
      tag3: "☁️ Moelleuse",
      tag4: "🪟 Curieuse",
      tag5: "🌿 Paisible",
      tag6: "⭐ Indépendante",

      rules1: "L’indépendance ne signifie pas un manque d’affection.",
      rules2: "Cela signifie simplement savoir ce que l’on veut.",
      rules3: "Jessica n’a pas besoin de suivre tout le monde d’une pièce à l’autre.",
      rules4: "Elle n’a pas besoin d’être au centre de chaque instant.",
      rules5: "Elle choisit quand se rapprocher.",
      rules6: "Elle choisit quand rester.",
      rules7: "Et c’est peut-être justement ce qui rend le moment où elle vous choisit encore plus spécial.",

      slowKicker: "Un après-midi tranquille",
      slowTitle: "SOLEIL.<br>SILENCE.<br>PARFAIT.",
      slowText: "Offrez à Jessica un fauteuil confortable, un peu de soleil et suffisamment de calme pour profiter des deux, et elle n’aura besoin de presque rien d’autre.",

      ritualKicker: "Petits rituels",
      ritualTitle: "LES PETITS MOMENTS<br>COMPTENT",
      ritual1: "Chaque personnalité a ses petits rituels.",
      ritual2: "Les endroits où nous revenons.",
      ritual3: "Les choses qui nous font nous arrêter.",
      ritual4: "Les petits instants qui deviennent une partie d’une journée ordinaire.",
      ritual5: "Pour Jessica, même une simple pause près de sa gamelle préférée peut devenir un portrait de concentration.",

      finalKicker: "Star de couverture 03",
      finalTitle: "DISCRÈTEMENT<br>INOUBLIABLE",
      final1: "Voici donc Jessica.",
      final2: "Une British Shorthair.",
      final3: "Un doux pelage gris.",
      final4: "Des yeux dorés.",
      final5: "Une nature calme.",
      final6: "Un talent pour trouver l’endroit le plus confortable de la pièce.",
      final7: "Assez curieuse pour tout observer.",
      final8: "Assez indépendante pour ne pas avoir besoin de participer à tout.",
      final9: "Douce, observatrice et parfaitement à l’aise d’être exactement elle-même.",
      final10: "Toutes les stars de couverture n’ont pas besoin de faire du bruit.",
      final11: "Certaines vous regardent simplement avec leurs yeux dorés et deviennent impossibles à oublier.",

      signature: "Découvrez",
      tagline: "Un monde. Chaque animal.",
      issueLink: "← Édition 01",
      homeLink: "Accueil"
    },

    /* =====================================================
       GERMAN
       ===================================================== */

    de: {
      heroKicker: "PETS & DOGUE · AUSGABE 01<br>COVER-STORY",
      meet: "Das ist",
      heroSub: "Eine sanfte<br>britische Lady.",
      heroText: "Ruhig, aufmerksam und wunderbar unabhängig ist Jessica eine Katze, die niemals um Aufmerksamkeit bitten muss. Sie sucht sich einfach ihren Lieblingsplatz aus, beobachtet die Welt und lässt alle anderen sie zu ihren eigenen Bedingungen kennenlernen.",

      backIssue: "← Zurück zu Ausgabe 01",

      introKicker: "Stilles Selbstbewusstsein ♥",
      introTitle: "Außen<br>ganz weich.",
      introText: "Eine Britisch Kurzhaar mit wunderschönen goldenen Augen, plüschigem grauem Fell und einem ganz eigenen Charakter. Jessica hat es nicht eilig. Zuerst beobachtet sie. Dann entscheidet sie.",

      profileKicker: "Jessicas Profil",
      profileTitle: "RUHIG.<br>NEUGIERIG.<br>GANZ SIE SELBST.",
      profileSub: "Britisch Kurzhaar · professionelle Beobachterin",

      name: "<strong>Name:</strong> Jessica",
      breed: "<strong>Rasse:</strong> Britisch Kurzhaar",
      eyes: "<strong>Augen:</strong> warmes Gold",
      coat: "<strong>Fell:</strong> weich, plüschig und grau",
      personality: "<strong>Persönlichkeit:</strong> ruhig, aufmerksam und unabhängig",
      favourite: "<strong>Lieblingsplatz:</strong> irgendwo gemütlich mit guter Aussicht",
      afternoon: "<strong>Perfekter Nachmittag:</strong> Sonnenschein, Ruhe und ihr Lieblingssessel",
      feature: "<strong>Besonderes Merkmal:</strong> stilles Selbstbewusstsein",

      noHurry: "Kein Grund zur Eile.",
      hasTime: "JESSICA HAT ZEIT.",

      observerKicker: "Ihr Lieblingsfernsehen",
      observerTitle: "DIE WELT<br>DA DRAUSSEN",
      observerText: "Ein Fenster kann ein ganzes Universum sein. Vorbeigehende Menschen. Bewegte Blätter. Vögel, die auftauchen und wieder verschwinden. Licht, das sich im Laufe des Tages verändert. Jessica kann all das beobachten, ohne selbst mitten im Geschehen sein zu müssen.",

      homeKicker: "Zu Hause ist es wunderbar ♥",
      homeTitle: "DIE KUNST<br>DER GEMÜTLICHKEIT",
      home1: "Manche Tiere möchten, dass jeder Tag zu einer Expedition wird.",
      home2: "Jessica versteht eine andere Art von Luxus.",
      home3: "Ein weiches Bett.",
      home4: "Ein warmer Sonnenplatz.",
      home5: "Ein vertrautes Fenster.",
      home6: "Ein ruhiger Garten.",
      home7: "Ein Ort, an dem sie sich ausstrecken, gemütlich niederlassen und einfach beobachten kann.",
      home8: "Zu Hause zu sein ist keineswegs langweilig, wenn man genau weiß, wie man es genießen kann.",

      pullquote: "Komfort ist keine Faulheit.<br>Er ist eine Kunst.",

      momentsKicker: "Jessica-Momente",
      momentsTitle: "IHRE LIEBLINGSART<br>VON TAG",

      softPlace: "Weicher Platz ♥",
      softPlaceText: "Der perfekte Ort, um absolut nichts zu tun.",

      windowWatch: "Blick aus dem Fenster",
      windowWatchText: "Es gibt immer etwas, das es wert ist, bemerkt zu werden.",

      gardenTime: "Zeit im Garten 🌿",
      gardenTimeText: "Frische Luft, Sonnenschein und keine unnötige Eile.",

      rulesKicker: "Ihre Regeln",
      rulesTitle: "ZUNEIGUNG<br>ZU IHREN BEDINGUNGEN",

      tag1: "👀 Aufmerksam",
      tag2: "♥ Sanft",
      tag3: "☁️ Weich",
      tag4: "🪟 Neugierig",
      tag5: "🌿 Friedlich",
      tag6: "⭐ Unabhängig",

      rules1: "Unabhängigkeit bedeutet nicht, dass es an Zuneigung fehlt.",
      rules2: "Sie bedeutet einfach, zu wissen, was man möchte.",
      rules3: "Jessica muss nicht jedem von Zimmer zu Zimmer folgen.",
      rules4: "Sie muss nicht im Mittelpunkt jedes Augenblicks stehen.",
      rules5: "Sie entscheidet selbst, wann sie näherkommt.",
      rules6: "Sie entscheidet selbst, wann sie bleibt.",
      rules7: "Und genau deshalb fühlt sich der Moment, in dem sie dich auswählt, noch besonderer an.",

      slowKicker: "Ein ruhiger Nachmittag",
      slowTitle: "SONNENSCHEIN.<br>STILLE.<br>PERFEKT.",
      slowText: "Gib Jessica einen bequemen Sessel, etwas Sonnenschein und genug Ruhe, um beides zu genießen, und viel mehr braucht sie nicht.",

      ritualKicker: "Kleine Rituale",
      ritualTitle: "KLEINE MOMENTE<br>ZÄHLEN",
      ritual1: "Jede Persönlichkeit hat ihre kleinen Rituale.",
      ritual2: "Die Orte, an die wir zurückkehren.",
      ritual3: "Die Dinge, die uns innehalten lassen.",
      ritual4: "Die kleinen Momente, die Teil eines ganz normalen Tages werden.",
      ritual5: "Für Jessica kann selbst eine kurze Pause neben ihrem Lieblingsnapf zu einem Porträt völliger Konzentration werden.",

      finalKicker: "Coverstar 03",
      finalTitle: "STILL<br>UNVERGESSLICH",
      final1: "Das ist Jessica.",
      final2: "Eine Britisch Kurzhaar.",
      final3: "Weiches graues Fell.",
      final4: "Goldene Augen.",
      final5: "Ein ruhiges Wesen.",
      final6: "Ein Talent dafür, den bequemsten Platz im Raum zu finden.",
      final7: "Neugierig genug, um alles zu beobachten.",
      final8: "Unabhängig genug, um nicht überall dabei sein zu müssen.",
      final9: "Sanft, aufmerksam und vollkommen zufrieden damit, genau die zu sein, die sie ist.",
      final10: "Nicht jeder Coverstar muss laut sein.",
      final11: "Manche schauen dich einfach mit goldenen Augen an und werden unmöglich zu vergessen.",

      signature: "Das ist",
      tagline: "Eine Welt. Jedes Haustier.",
      issueLink: "← Ausgabe 01",
      homeLink: "Startseite"
    },

    /* =====================================================
       SPANISH
       ===================================================== */

    es: {
      heroKicker: "PETS & DOGUE · EDICIÓN 01<br>HISTORIA DE PORTADA",
      meet: "Conoce a",
      heroSub: "Una dulce<br>dama británica.",
      heroText: "Tranquila, observadora y maravillosamente independiente, Jessica es el tipo de gata que nunca necesita exigir atención. Simplemente elige su lugar favorito, observa el mundo y deja que los demás la descubran a su manera.",

      backIssue: "← Volver a la Edición 01",

      introKicker: "Confianza tranquila ♥",
      introTitle: "Suave<br>por fuera.",
      introText: "Una British Shorthair de preciosos ojos dorados, pelaje gris afelpado y una personalidad completamente propia. Jessica no tiene prisa. Primero observa. Después decide.",

      profileKicker: "El perfil de Jessica",
      profileTitle: "TRANQUILA.<br>CURIOSA.<br>COMPLETAMENTE ELLA.",
      profileSub: "British Shorthair · observadora profesional",

      name: "<strong>Nombre:</strong> Jessica",
      breed: "<strong>Raza:</strong> British Shorthair",
      eyes: "<strong>Ojos:</strong> dorados y cálidos",
      coat: "<strong>Pelaje:</strong> suave, afelpado y gris",
      personality: "<strong>Personalidad:</strong> tranquila, observadora e independiente",
      favourite: "<strong>Lugar favorito:</strong> un sitio cómodo con buenas vistas",
      afternoon: "<strong>Tarde perfecta:</strong> sol, tranquilidad y su sillón favorito",
      feature: "<strong>Rasgo especial:</strong> confianza tranquila",

      noHurry: "No hay necesidad de apresurarse.",
      hasTime: "JESSICA TIENE TIEMPO.",

      observerKicker: "Su televisión favorita",
      observerTitle: "EL MUNDO<br>EXTERIOR",
      observerText: "Una ventana puede ser todo un universo. Personas que pasan. Hojas que se mueven. Pájaros que aparecen y desaparecen. La luz que cambia durante el día. Jessica puede observarlo todo sin necesidad de estar en medio de la acción.",

      homeKicker: "El hogar es un lugar maravilloso ♥",
      homeTitle: "EL ARTE<br>DE ESTAR CÓMODA",
      home1: "Algunos animales quieren que cada día se convierta en una expedición.",
      home2: "Jessica entiende otro tipo de lujo.",
      home3: "Una cama suave.",
      home4: "Un rincón cálido al sol.",
      home5: "Una ventana conocida.",
      home6: "Un jardín tranquilo.",
      home7: "Un lugar donde pueda estirarse, acomodarse y simplemente observar.",
      home8: "No hay nada aburrido en estar en casa cuando sabes exactamente cómo disfrutarlo.",

      pullquote: "La comodidad no es pereza.<br>Es un arte.",

      momentsKicker: "Momentos de Jessica",
      momentsTitle: "SU TIPO DE DÍA<br>FAVORITO",

      softPlace: "Lugar suave ♥",
      softPlaceText: "El lugar perfecto para no hacer absolutamente nada.",

      windowWatch: "Mirando por la ventana",
      windowWatchText: "Siempre hay algo que merece ser observado.",

      gardenTime: "Tiempo en el jardín 🌿",
      gardenTimeText: "Aire fresco, sol y ninguna prisa innecesaria.",

      rulesKicker: "Sus reglas",
      rulesTitle: "CARIÑO<br>A SU MANERA",

      tag1: "👀 Observadora",
      tag2: "♥ Dulce",
      tag3: "☁️ Suave",
      tag4: "🪟 Curiosa",
      tag5: "🌿 Tranquila",
      tag6: "⭐ Independiente",

      rules1: "La independencia no significa falta de cariño.",
      rules2: "Simplemente significa saber lo que quieres.",
      rules3: "Jessica no necesita seguir a todos de una habitación a otra.",
      rules4: "No necesita ser el centro de cada momento.",
      rules5: "Ella decide cuándo acercarse.",
      rules6: "Ella decide cuándo quedarse.",
      rules7: "Y, de algún modo, eso hace que el momento en que te elige resulte aún más especial.",

      slowKicker: "Una tarde tranquila",
      slowTitle: "SOL.<br>SILENCIO.<br>PERFECTO.",
      slowText: "Dale a Jessica un sillón cómodo, un poco de sol y suficiente tranquilidad para disfrutar de ambos, y necesitará muy poco más.",

      ritualKicker: "Pequeños rituales",
      ritualTitle: "LOS PEQUEÑOS MOMENTOS<br>IMPORTAN",
      ritual1: "Cada personalidad tiene sus pequeños rituales.",
      ritual2: "Los lugares a los que regresamos.",
      ritual3: "Las cosas que nos hacen detenernos.",
      ritual4: "Los pequeños momentos que pasan a formar parte de un día cualquiera.",
      ritual5: "Para Jessica, incluso una simple pausa junto a su cuenco favorito puede convertirse en un retrato de concentración.",

      finalKicker: "Estrella de portada 03",
      finalTitle: "SILENCIOSAMENTE<br>INOLVIDABLE",
      final1: "Esta es Jessica.",
      final2: "Una British Shorthair.",
      final3: "Pelaje gris y suave.",
      final4: "Ojos dorados.",
      final5: "Un carácter tranquilo.",
      final6: "Un talento para encontrar el lugar más cómodo de la habitación.",
      final7: "Lo bastante curiosa como para observarlo todo.",
      final8: "Lo bastante independiente como para no necesitar participar en todo.",
      final9: "Dulce, observadora y completamente cómoda siendo exactamente quien es.",
      final10: "No todas las estrellas de portada necesitan hacer ruido.",
      final11: "Algunas simplemente te miran con ojos dorados y se vuelven imposibles de olvidar.",

      signature: "Conoce a",
      tagline: "Un mundo. Cada mascota.",
      issueLink: "← Edición 01",
      homeLink: "Inicio"
    },

    /* =====================================================
       ITALIAN
       ===================================================== */

    it: {
      heroKicker: "PETS & DOGUE · EDIZIONE 01<br>STORIA DI COPERTINA",
      meet: "Vi presentiamo",
      heroSub: "Una dolce<br>signora britannica.",
      heroText: "Calma, osservatrice e meravigliosamente indipendente, Jessica è il tipo di gatta che non ha mai bisogno di chiedere attenzione. Sceglie semplicemente il suo posto preferito, osserva il mondo e lascia che gli altri la scoprano alle sue condizioni.",

      backIssue: "← Torna all’Edizione 01",

      introKicker: "Sicurezza silenziosa ♥",
      introTitle: "Morbida<br>fuori.",
      introText: "Una British Shorthair con splendidi occhi dorati, un morbido mantello grigio e un carattere tutto suo. Jessica non ha fretta. Prima osserva. Poi decide.",

      profileKicker: "Il profilo di Jessica",
      profileTitle: "CALMA.<br>CURIOSA.<br>COMPLETAMENTE SE STESSA.",
      profileSub: "British Shorthair · osservatrice professionista",

      name: "<strong>Nome:</strong> Jessica",
      breed: "<strong>Razza:</strong> British Shorthair",
      eyes: "<strong>Occhi:</strong> dorati e caldi",
      coat: "<strong>Mantello:</strong> morbido, folto e grigio",
      personality: "<strong>Personalità:</strong> calma, osservatrice e indipendente",
      favourite: "<strong>Posto preferito:</strong> un luogo comodo con una bella vista",
      afternoon: "<strong>Pomeriggio perfetto:</strong> sole, tranquillità e la sua poltrona preferita",
      feature: "<strong>Caratteristica speciale:</strong> sicurezza silenziosa",

      noHurry: "Non c’è bisogno di avere fretta.",
      hasTime: "JESSICA HA TEMPO.",

      observerKicker: "La sua televisione preferita",
      observerTitle: "IL MONDO<br>FUORI",
      observerText: "Una finestra può essere un intero universo. Persone che passano. Foglie che si muovono. Uccelli che appaiono e scompaiono. La luce che cambia durante il giorno. Jessica può osservare tutto senza avere bisogno di trovarsi al centro dell’azione.",

      homeKicker: "Casa è davvero un bel posto ♥",
      homeTitle: "L’ARTE<br>DELLA COMODITÀ",
      home1: "Alcuni animali vogliono che ogni giorno diventi un’avventura.",
      home2: "Jessica comprende un altro tipo di lusso.",
      home3: "Un letto morbido.",
      home4: "Un angolo caldo di sole.",
      home5: "Una finestra familiare.",
      home6: "Un giardino tranquillo.",
      home7: "Un posto dove può stiracchiarsi, sistemarsi comodamente e semplicemente osservare.",
      home8: "Non c’è nulla di noioso nello stare a casa quando sai esattamente come godertela.",

      pullquote: "La comodità non è pigrizia.<br>È un’arte.",

      momentsKicker: "Momenti di Jessica",
      momentsTitle: "IL SUO TIPO DI GIORNATA<br>PREFERITO",

      softPlace: "Posto morbido ♥",
      softPlaceText: "Il posto perfetto per non fare assolutamente nulla.",

      windowWatch: "Osservare dalla finestra",
      windowWatchText: "C’è sempre qualcosa che vale la pena notare.",

      gardenTime: "Tempo in giardino 🌿",
      gardenTimeText: "Aria fresca, sole e nessuna fretta inutile.",

      rulesKicker: "Le sue regole",
      rulesTitle: "AFFETTO<br>ALLE SUE CONDIZIONI",

      tag1: "👀 Osservatrice",
      tag2: "♥ Dolce",
      tag3: "☁️ Morbida",
      tag4: "🪟 Curiosa",
      tag5: "🌿 Tranquilla",
      tag6: "⭐ Indipendente",

      rules1: "L’indipendenza non significa mancanza di affetto.",
      rules2: "Significa semplicemente sapere ciò che si vuole.",
      rules3: "Jessica non ha bisogno di seguire tutti da una stanza all’altra.",
      rules4: "Non ha bisogno di essere al centro di ogni momento.",
      rules5: "È lei a scegliere quando avvicinarsi.",
      rules6: "È lei a scegliere quando restare.",
      rules7: "E in qualche modo questo rende ancora più speciale il momento in cui sceglie te.",

      slowKicker: "Un pomeriggio tranquillo",
      slowTitle: "SOLE.<br>SILENZIO.<br>PERFETTO.",
      slowText: "Date a Jessica una poltrona comoda, un po’ di sole e abbastanza tranquillità per godersi entrambi, e non avrà bisogno di molto altro.",

      ritualKicker: "Piccoli rituali",
      ritualTitle: "I PICCOLI MOMENTI<br>CONTANO",
      ritual1: "Ogni personalità ha i suoi piccoli rituali.",
      ritual2: "I luoghi in cui torniamo.",
      ritual3: "Le cose che ci fanno fermare.",
      ritual4: "I piccoli momenti che diventano parte di una giornata normale.",
      ritual5: "Per Jessica, persino una semplice pausa accanto alla sua ciotola preferita può diventare un ritratto di concentrazione.",

      finalKicker: "Star di copertina 03",
      finalTitle: "SILENZIOSAMENTE<br>INDIMENTICABILE",
      final1: "Questa è Jessica.",
      final2: "Una British Shorthair.",
      final3: "Morbido pelo grigio.",
      final4: "Occhi dorati.",
      final5: "Un carattere tranquillo.",
      final6: "Un talento nel trovare il posto più comodo della stanza.",
      final7: "Abbastanza curiosa da osservare tutto.",
      final8: "Abbastanza indipendente da non avere bisogno di partecipare a tutto.",
      final9: "Dolce, osservatrice e perfettamente a suo agio nell’essere esattamente se stessa.",
      final10: "Non tutte le star di copertina devono fare rumore.",
      final11: "Alcune ti guardano semplicemente con occhi dorati e diventano impossibili da dimenticare.",

      signature: "Vi presentiamo",
      tagline: "Un mondo. Ogni animale.",
      issueLink: "← Edizione 01",
      homeLink: "Home"
    },    /* =====================================================
       PORTUGUESE
       ===================================================== */

    pt: {
      heroKicker: "PETS & DOGUE · EDIÇÃO 01<br>HISTÓRIA DE CAPA",
      meet: "Conheça",
      heroSub: "Uma gentil<br>dama britânica.",
      heroText: "Calma, observadora e maravilhosamente independente, Jessica é o tipo de gata que nunca precisa exigir atenção. Ela simplesmente escolhe o seu lugar favorito, observa o mundo e deixa que todos a descubram nos seus próprios termos.",

      backIssue: "← Voltar à Edição 01",

      introKicker: "Confiança tranquila ♥",
      introTitle: "Suave<br>por fora.",
      introText: "Uma British Shorthair com lindos olhos dourados, pelagem cinzenta macia e uma personalidade totalmente própria. Jessica não tem pressa. Primeiro observa. Depois decide.",

      profileKicker: "O perfil de Jessica",
      profileTitle: "CALMA.<br>CURIOSA.<br>COMPLETAMENTE ELA MESMA.",
      profileSub: "British Shorthair · observadora profissional",

      name: "<strong>Nome:</strong> Jessica",
      breed: "<strong>Raça:</strong> British Shorthair",
      eyes: "<strong>Olhos:</strong> dourados e quentes",
      coat: "<strong>Pelagem:</strong> macia, densa e cinzenta",
      personality: "<strong>Personalidade:</strong> calma, observadora e independente",
      favourite: "<strong>Lugar favorito:</strong> um lugar confortável com uma boa vista",
      afternoon: "<strong>Tarde perfeita:</strong> sol, tranquilidade e a sua poltrona favorita",
      feature: "<strong>Característica especial:</strong> confiança tranquila",

      noHurry: "Não há necessidade de pressa.",
      hasTime: "JESSICA TEM TEMPO.",

      observerKicker: "A sua televisão favorita",
      observerTitle: "O MUNDO<br>LÁ FORA",
      observerText: "Uma janela pode ser um universo inteiro. Pessoas a passar. Folhas a mover-se. Pássaros que aparecem e desaparecem. A luz a mudar ao longo do dia. Jessica pode observar tudo sem precisar de estar no centro da ação.",

      homeKicker: "Casa é um lugar maravilhoso ♥",
      homeTitle: "A ARTE<br>DO CONFORTO",
      home1: "Alguns animais querem que todos os dias se transformem numa expedição.",
      home2: "Jessica entende outro tipo de luxo.",
      home3: "Uma cama macia.",
      home4: "Um lugar quente ao sol.",
      home5: "Uma janela familiar.",
      home6: "Um jardim tranquilo.",
      home7: "Um lugar onde ela pode esticar-se, acomodar-se e simplesmente observar.",
      home8: "Não há nada de aborrecido em ficar em casa quando se sabe exatamente como aproveitar.",

      pullquote: "Conforto não é preguiça.<br>É uma arte.",

      momentsKicker: "Momentos de Jessica",
      momentsTitle: "O SEU TIPO DE DIA<br>FAVORITO",

      softPlace: "Lugar macio ♥",
      softPlaceText: "O lugar perfeito para não fazer absolutamente nada.",

      windowWatch: "Observar pela janela",
      windowWatchText: "Há sempre alguma coisa que vale a pena notar.",

      gardenTime: "Tempo no jardim 🌿",
      gardenTimeText: "Ar fresco, sol e nenhuma pressa desnecessária.",

      rulesKicker: "As suas regras",
      rulesTitle: "CARINHO<br>NOS SEUS TERMOS",

      tag1: "👀 Observadora",
      tag2: "♥ Gentil",
      tag3: "☁️ Macia",
      tag4: "🪟 Curiosa",
      tag5: "🌿 Tranquila",
      tag6: "⭐ Independente",

      rules1: "Independência não significa falta de carinho.",
      rules2: "Significa simplesmente saber o que se quer.",
      rules3: "Jessica não precisa de seguir todos de uma divisão para outra.",
      rules4: "Ela não precisa de ser o centro de todos os momentos.",
      rules5: "Ela escolhe quando se aproxima.",
      rules6: "Ela escolhe quando fica.",
      rules7: "E, de alguma forma, isso torna ainda mais especial o momento em que ela escolhe você.",

      slowKicker: "Uma tarde tranquila",
      slowTitle: "SOL.<br>SILÊNCIO.<br>PERFEITO.",
      slowText: "Dê a Jessica uma poltrona confortável, um pouco de sol e tranquilidade suficiente para desfrutar de ambos, e quase nada mais será necessário.",

      ritualKicker: "Pequenos rituais",
      ritualTitle: "PEQUENOS MOMENTOS<br>IMPORTAM",
      ritual1: "Cada personalidade tem os seus pequenos rituais.",
      ritual2: "Os lugares aos quais regressamos.",
      ritual3: "As coisas que nos fazem parar.",
      ritual4: "Os pequenos momentos que se tornam parte de um dia comum.",
      ritual5: "Para Jessica, até uma simples pausa junto à sua tigela favorita pode transformar-se num retrato de concentração.",

      finalKicker: "Estrela de capa 03",
      finalTitle: "SILENCIOSAMENTE<br>INESQUECÍVEL",
      final1: "Esta é Jessica.",
      final2: "Uma British Shorthair.",
      final3: "Pelagem cinzenta e macia.",
      final4: "Olhos dourados.",
      final5: "Uma natureza tranquila.",
      final6: "Um talento para encontrar o lugar mais confortável da divisão.",
      final7: "Curiosa o suficiente para observar tudo.",
      final8: "Independente o suficiente para não precisar de participar em tudo.",
      final9: "Gentil, observadora e completamente confortável em ser exatamente quem é.",
      final10: "Nem todas as estrelas de capa precisam de fazer barulho.",
      final11: "Algumas simplesmente olham para você com olhos dourados e tornam-se impossíveis de esquecer.",

      signature: "Conheça",
      tagline: "Um mundo. Todos os animais.",
      issueLink: "← Edição 01",
      homeLink: "Início"
    },

    /* =====================================================
       DUTCH
       ===================================================== */

    nl: {
      heroKicker: "PETS & DOGUE · EDITIE 01<br>COVERSTORY",
      meet: "Maak kennis met",
      heroSub: "Een zachte<br>Britse dame.",
      heroText: "Rustig, opmerkzaam en heerlijk onafhankelijk: Jessica is het soort kat dat nooit om aandacht hoeft te vragen. Ze kiest eenvoudig haar favoriete plek, bekijkt de wereld en laat iedereen haar op haar eigen voorwaarden ontdekken.",

      backIssue: "← Terug naar Editie 01",

      introKicker: "Stil zelfvertrouwen ♥",
      introTitle: "Zacht<br>van buiten.",
      introText: "Een Britse korthaar met prachtige gouden ogen, een zachte grijze vacht en een geheel eigen karakter. Jessica heeft geen haast. Eerst observeert ze. Daarna beslist ze.",

      profileKicker: "Het profiel van Jessica",
      profileTitle: "RUSTIG.<br>NIEUWSGIERIG.<br>HELEMAAL ZICHZELF.",
      profileSub: "Britse korthaar · professionele observator",

      name: "<strong>Naam:</strong> Jessica",
      breed: "<strong>Ras:</strong> Britse korthaar",
      eyes: "<strong>Ogen:</strong> warm goudkleurig",
      coat: "<strong>Vacht:</strong> zacht, pluche en grijs",
      personality: "<strong>Karakter:</strong> rustig, opmerkzaam en onafhankelijk",
      favourite: "<strong>Favoriete plek:</strong> ergens comfortabel met een mooi uitzicht",
      afternoon: "<strong>Perfecte middag:</strong> zonneschijn, rust en haar favoriete stoel",
      feature: "<strong>Bijzonder kenmerk:</strong> stil zelfvertrouwen",

      noHurry: "Geen reden om haast te maken.",
      hasTime: "JESSICA HEEFT TIJD.",

      observerKicker: "Haar favoriete televisie",
      observerTitle: "DE WERELD<br>BUITEN",
      observerText: "Een raam kan een heel universum zijn. Voorbijgaande mensen. Bewegende bladeren. Vogels die verschijnen en verdwijnen. Licht dat gedurende de dag verandert. Jessica kan alles bekijken zonder ooit midden in de drukte te hoeven staan.",

      homeKicker: "Thuis is een heerlijke plek ♥",
      homeTitle: "DE KUNST<br>VAN COMFORT",
      home1: "Sommige dieren willen dat iedere dag een expeditie wordt.",
      home2: "Jessica begrijpt een ander soort luxe.",
      home3: "Een zacht bed.",
      home4: "Een warme plek in de zon.",
      home5: "Een vertrouwd raam.",
      home6: "Een rustige tuin.",
      home7: "Een plek waar ze zich kan uitstrekken, comfortabel kan gaan liggen en gewoon kan kijken.",
      home8: "Er is niets saais aan thuis zijn als je precies weet hoe je ervan moet genieten.",

      pullquote: "Comfort is geen luiheid.<br>Het is een kunst.",

      momentsKicker: "Jessica-momenten",
      momentsTitle: "HAAR FAVORIETE<br>SOORT DAG",

      softPlace: "Zachte plek ♥",
      softPlaceText: "De perfecte plek om helemaal niets te doen.",

      windowWatch: "Kijken uit het raam",
      windowWatchText: "Er is altijd iets dat de moeite waard is om op te merken.",

      gardenTime: "Tijd in de tuin 🌿",
      gardenTimeText: "Frisse lucht, zonneschijn en geen onnodige haast.",

      rulesKicker: "Haar regels",
      rulesTitle: "GENEGENHEID<br>OP HAAR VOORWAARDEN",

      tag1: "👀 Opmerkzaam",
      tag2: "♥ Zachtaardig",
      tag3: "☁️ Zacht",
      tag4: "🪟 Nieuwsgierig",
      tag5: "🌿 Rustig",
      tag6: "⭐ Onafhankelijk",

      rules1: "Onafhankelijkheid betekent niet dat er geen genegenheid is.",
      rules2: "Het betekent simpelweg weten wat je wilt.",
      rules3: "Jessica hoeft niet iedereen van kamer naar kamer te volgen.",
      rules4: "Ze hoeft niet het middelpunt van ieder moment te zijn.",
      rules5: "Ze kiest wanneer ze dichterbij komt.",
      rules6: "Ze kiest wanneer ze blijft.",
      rules7: "En juist daardoor voelt het moment waarop ze jou kiest nog specialer.",

      slowKicker: "Een rustige middag",
      slowTitle: "ZONNESCHIJN.<br>STILTE.<br>PERFECT.",
      slowText: "Geef Jessica een comfortabele stoel, een beetje zon en genoeg rust om van beide te genieten, en veel meer heeft ze niet nodig.",

      ritualKicker: "Kleine rituelen",
      ritualTitle: "KLEINE MOMENTEN<br>TELLEN",
      ritual1: "Iedere persoonlijkheid heeft haar kleine rituelen.",
      ritual2: "De plekken waar we naar terugkeren.",
      ritual3: "De dingen die ons even laten stoppen.",
      ritual4: "De kleine momenten die onderdeel worden van een gewone dag.",
      ritual5: "Voor Jessica kan zelfs een korte pauze naast haar favoriete voerbak een portret van volledige concentratie worden.",

      finalKicker: "Coverster 03",
      finalTitle: "STIL<br>ONVERGETELIJK",
      final1: "Dit is Jessica.",
      final2: "Een Britse korthaar.",
      final3: "Zachte grijze vacht.",
      final4: "Gouden ogen.",
      final5: "Een rustig karakter.",
      final6: "Een talent om de comfortabelste plek in de kamer te vinden.",
      final7: "Nieuwsgierig genoeg om alles te bekijken.",
      final8: "Onafhankelijk genoeg om niet overal aan mee te hoeven doen.",
      final9: "Zachtaardig, opmerkzaam en helemaal op haar gemak met precies wie ze is.",
      final10: "Niet iedere coverster hoeft lawaai te maken.",
      final11: "Sommige kijken je simpelweg met gouden ogen aan en worden onmogelijk om te vergeten.",

      signature: "Maak kennis met",
      tagline: "Eén wereld. Elk huisdier.",
      issueLink: "← Editie 01",
      homeLink: "Home"
    },

    /* =====================================================
       POLISH
       ===================================================== */

    pl: {
      heroKicker: "PETS & DOGUE · WYDANIE 01<br>HISTORIA Z OKŁADKI",
      meet: "Poznaj",
      heroSub: "Łagodną<br>brytyjską damę.",
      heroText: "Spokojna, spostrzegawcza i cudownie niezależna Jessica jest kotką, która nigdy nie musi domagać się uwagi. Po prostu wybiera swoje ulubione miejsce, obserwuje świat i pozwala innym poznawać ją na jej własnych zasadach.",

      backIssue: "← Powrót do Wydania 01",

      introKicker: "Cicha pewność siebie ♥",
      introTitle: "Miękka<br>na zewnątrz.",
      introText: "Kotka brytyjska krótkowłosa o pięknych złotych oczach, pluszowej szarej sierści i całkowicie własnym charakterze. Jessica się nie spieszy. Najpierw obserwuje. Potem decyduje.",

      profileKicker: "Profil Jessiki",
      profileTitle: "SPOKOJNA.<br>CIEKAWA.<br>CAŁKOWICIE SOBĄ.",
      profileSub: "Brytyjska krótkowłosa · profesjonalna obserwatorka",

      name: "<strong>Imię:</strong> Jessica",
      breed: "<strong>Rasa:</strong> brytyjska krótkowłosa",
      eyes: "<strong>Oczy:</strong> ciepłe, złote",
      coat: "<strong>Sierść:</strong> miękka, pluszowa i szara",
      personality: "<strong>Charakter:</strong> spokojna, spostrzegawcza i niezależna",
      favourite: "<strong>Ulubione miejsce:</strong> gdzieś wygodnie, z dobrym widokiem",
      afternoon: "<strong>Idealne popołudnie:</strong> słońce, spokój i jej ulubiony fotel",
      feature: "<strong>Cecha szczególna:</strong> cicha pewność siebie",

      noHurry: "Nie ma potrzeby się spieszyć.",
      hasTime: "JESSICA MA CZAS.",

      observerKicker: "Jej ulubiona telewizja",
      observerTitle: "ŚWIAT<br>NA ZEWNĄTRZ",
      observerText: "Okno może być całym wszechświatem. Przechodzący ludzie. Poruszające się liście. Ptaki pojawiające się i znikające. Światło zmieniające się w ciągu dnia. Jessica może obserwować to wszystko bez potrzeby znajdowania się w centrum wydarzeń.",

      homeKicker: "Dom to naprawdę dobre miejsce ♥",
      homeTitle: "SZTUKA<br>KOMFORTU",
      home1: "Niektóre zwierzęta chcą, aby każdy dzień zamieniał się w wyprawę.",
      home2: "Jessica rozumie inny rodzaj luksusu.",
      home3: "Miękkie łóżko.",
      home4: "Ciepła plama słońca.",
      home5: "Znajome okno.",
      home6: "Spokojny ogród.",
      home7: "Miejsce, w którym może się przeciągnąć, wygodnie ułożyć i po prostu obserwować.",
      home8: "Nie ma nic nudnego w byciu w domu, kiedy dokładnie wiesz, jak się nim cieszyć.",

      pullquote: "Komfort to nie lenistwo.<br>To sztuka.",

      momentsKicker: "Chwile Jessiki",
      momentsTitle: "JEJ ULUBIONY<br>RODZAJ DNIA",

      softPlace: "Miękkie miejsce ♥",
      softPlaceText: "Idealne miejsce, aby nie robić absolutnie nic.",

      windowWatch: "Obserwowanie przez okno",
      windowWatchText: "Zawsze znajdzie się coś wartego zauważenia.",

      gardenTime: "Czas w ogrodzie 🌿",
      gardenTimeText: "Świeże powietrze, słońce i żadnego niepotrzebnego pośpiechu.",

      rulesKicker: "Jej zasady",
      rulesTitle: "CZUŁOŚĆ<br>NA JEJ ZASADACH",

      tag1: "👀 Spostrzegawcza",
      tag2: "♥ Łagodna",
      tag3: "☁️ Miękka",
      tag4: "🪟 Ciekawa",
      tag5: "🌿 Spokojna",
      tag6: "⭐ Niezależna",

      rules1: "Niezależność nie oznacza braku czułości.",
      rules2: "Oznacza po prostu wiedzieć, czego się chce.",
      rules3: "Jessica nie musi chodzić za wszystkimi z pokoju do pokoju.",
      rules4: "Nie musi być w centrum każdej chwili.",
      rules5: "Sama wybiera, kiedy podejść bliżej.",
      rules6: "Sama wybiera, kiedy zostać.",
      rules7: "I właśnie dlatego chwila, w której wybiera ciebie, wydaje się jeszcze bardziej wyjątkowa.",

      slowKicker: "Spokojne popołudnie",
      slowTitle: "SŁOŃCE.<br>CISZA.<br>IDEALNIE.",
      slowText: "Daj Jessice wygodny fotel, trochę słońca i wystarczająco dużo spokoju, by cieszyć się jednym i drugim, a prawie niczego więcej nie będzie potrzebować.",

      ritualKicker: "Małe rytuały",
      ritualTitle: "MAŁE CHWILE<br>MAJĄ ZNACZENIE",
      ritual1: "Każda osobowość ma swoje małe rytuały.",
      ritual2: "Miejsca, do których wracamy.",
      ritual3: "Rzeczy, które każą nam się zatrzymać.",
      ritual4: "Drobne chwile, które stają się częścią zwykłego dnia.",
      ritual5: "Dla Jessiki nawet krótka pauza przy ulubionej misce może stać się portretem pełnego skupienia.",

      finalKicker: "Gwiazda okładki 03",
      finalTitle: "CICHO<br>NIEZAPOMNIANA",
      final1: "Oto Jessica.",
      final2: "Brytyjska krótkowłosa.",
      final3: "Miękka szara sierść.",
      final4: "Złote oczy.",
      final5: "Spokojna natura.",
      final6: "Talent do znajdowania najwygodniejszego miejsca w pokoju.",
      final7: "Wystarczająco ciekawa, by obserwować wszystko.",
      final8: "Wystarczająco niezależna, by nie musieć uczestniczyć we wszystkim.",
      final9: "Łagodna, spostrzegawcza i całkowicie swobodna w byciu dokładnie taką, jaka jest.",
      final10: "Nie każda gwiazda okładki musi robić hałas.",
      final11: "Niektóre po prostu patrzą na ciebie złotymi oczami i stają się niemożliwe do zapomnienia.",

      signature: "Poznaj",
      tagline: "Jeden świat. Każdy pupil.",
      issueLink: "← Wydanie 01",
      homeLink: "Strona główna"
    },

    /* =====================================================
       CZECH
       ===================================================== */

    cs: {
      heroKicker: "PETS & DOGUE · VYDÁNÍ 01<br>PŘÍBĚH Z OBÁLKY",
      meet: "Seznamte se s",
      heroSub: "Jemnou<br>britskou dámou.",
      heroText: "Klidná, pozorná a nádherně nezávislá Jessica je kočka, která nikdy nemusí vyžadovat pozornost. Jednoduše si vybere své oblíbené místo, sleduje svět a nechá ostatní, aby ji poznali podle jejích vlastních pravidel.",

      backIssue: "← Zpět na Vydání 01",

      introKicker: "Tiché sebevědomí ♥",
      introTitle: "Hebká<br>na povrchu.",
      introText: "Britská krátkosrstá kočka s nádhernýma zlatýma očima, hebkou šedou srstí a naprosto osobitým charakterem. Jessica nespěchá. Nejprve pozoruje. Potom se rozhodne.",

      profileKicker: "Profil Jessicy",
      profileTitle: "KLIDNÁ.<br>ZVĚDAVÁ.<br>NAPROSTO SVÁ.",
      profileSub: "Britská krátkosrstá · profesionální pozorovatelka",

      name: "<strong>Jméno:</strong> Jessica",
      breed: "<strong>Plemeno:</strong> britská krátkosrstá",
      eyes: "<strong>Oči:</strong> teple zlaté",
      coat: "<strong>Srst:</strong> hebká, plyšová a šedá",
      personality: "<strong>Povaha:</strong> klidná, pozorná a nezávislá",
      favourite: "<strong>Oblíbené místo:</strong> někde pohodlně s pěkným výhledem",
      afternoon: "<strong>Dokonalé odpoledne:</strong> slunce, klid a její oblíbené křeslo",
      feature: "<strong>Zvláštní rys:</strong> tiché sebevědomí",

      noHurry: "Není kam spěchat.",
      hasTime: "JESSICA MÁ ČAS.",

      observerKicker: "Její oblíbená televize",
      observerTitle: "SVĚT<br>VENKU",
      observerText: "Okno může být celý vesmír. Kolemjdoucí lidé. Pohybující se listí. Ptáci, kteří se objevují a zase mizí. Světlo měnící se během dne. Jessica může všechno sledovat, aniž by potřebovala být uprostřed dění.",

      homeKicker: "Domov je opravdu krásné místo ♥",
      homeTitle: "UMĚNÍ<br>POHODLÍ",
      home1: "Některá zvířata chtějí, aby se každý den proměnil ve výpravu.",
      home2: "Jessica rozumí jinému druhu luxusu.",
      home3: "Měkký pelíšek.",
      home4: "Teplé místo na slunci.",
      home5: "Známé okno.",
      home6: "Klidná zahrada.",
      home7: "Místo, kde se může protáhnout, pohodlně se usadit a jednoduše pozorovat.",
      home8: "Na pobytu doma není nic nudného, když přesně víte, jak si ho užít.",

      pullquote: "Pohodlí není lenost.<br>Je to umění.",

      momentsKicker: "Chvíle Jessicy",
      momentsTitle: "JEJÍ OBLÍBENÝ<br>DRUH DNE",

      softPlace: "Měkké místo ♥",
      softPlaceText: "Dokonalé místo, kde nemusíte dělat vůbec nic.",

      windowWatch: "Pozorování z okna",
      windowWatchText: "Vždycky je něco, čeho stojí za to si všimnout.",

      gardenTime: "Čas na zahradě 🌿",
      gardenTimeText: "Čerstvý vzduch, slunce a žádný zbytečný spěch.",

      rulesKicker: "Její pravidla",
      rulesTitle: "NÁKLONNOST<br>PODLE JEJÍCH PRAVIDEL",

      tag1: "👀 Pozorná",
      tag2: "♥ Jemná",
      tag3: "☁️ Hebká",
      tag4: "🪟 Zvědavá",
      tag5: "🌿 Klidná",
      tag6: "⭐ Nezávislá",

      rules1: "Nezávislost neznamená nedostatek náklonnosti.",
      rules2: "Znamená jednoduše vědět, co chcete.",
      rules3: "Jessica nemusí chodit za každým z místnosti do místnosti.",
      rules4: "Nemusí být středem každého okamžiku.",
      rules5: "Sama si vybírá, kdy přijde blíž.",
      rules6: "Sama si vybírá, kdy zůstane.",
      rules7: "A právě proto je okamžik, kdy si vybere vás, ještě výjimečnější.",

      slowKicker: "Klidné odpoledne",
      slowTitle: "SLUNCE.<br>TICHO.<br>DOKONALÉ.",
      slowText: "Dejte Jessice pohodlné křeslo, trochu slunce a dostatek klidu, aby si mohla užít obojí, a téměř nic dalšího nepotřebuje.",

      ritualKicker: "Malé rituály",
      ritualTitle: "NA MALÝCH CHVÍLÍCH<br>ZÁLEŽÍ",
      ritual1: "Každá osobnost má své malé rituály.",
      ritual2: "Místa, kam se vracíme.",
      ritual3: "Věci, které nás přimějí zastavit se.",
      ritual4: "Drobné okamžiky, které se stanou součástí obyčejného dne.",
      ritual5: "Pro Jessicu se i krátká zastávka u oblíbené misky může proměnit v portrét naprostého soustředění.",

      finalKicker: "Hvězda obálky 03",
      finalTitle: "TIŠE<br>NEZAPOMENUTELNÁ",
      final1: "Tohle je Jessica.",
      final2: "Britská krátkosrstá.",
      final3: "Hebká šedá srst.",
      final4: "Zlaté oči.",
      final5: "Klidná povaha.",
      final6: "Talent najít nejpohodlnější místo v místnosti.",
      final7: "Dost zvědavá na to, aby sledovala všechno.",
      final8: "Dost nezávislá na to, aby nemusela být u všeho.",
      final9: "Jemná, pozorná a naprosto spokojená s tím, že je přesně taková, jaká je.",
      final10: "Ne každá hvězda obálky musí dělat hluk.",
      final11: "Některé se na vás prostě podívají zlatýma očima a už na ně nelze zapomenout.",

      signature: "Seznamte se s",
      tagline: "Jeden svět. Každý mazlíček.",
      issueLink: "← Vydání 01",
      homeLink: "Domů"
    },

    /* =====================================================
       SLOVAK
       ===================================================== */

    sk: {
      heroKicker: "PETS & DOGUE · VYDANIE 01<br>PRÍBEH Z OBÁLKY",
      meet: "Zoznámte sa s",
      heroSub: "Jemnou<br>britskou dámou.",
      heroText: "Pokojná, všímavá a nádherne nezávislá Jessica je mačka, ktorá nikdy nemusí vyžadovať pozornosť. Jednoducho si vyberie svoje obľúbené miesto, sleduje svet a necháva ostatných, aby ju spoznali podľa jej vlastných pravidiel.",

      backIssue: "← Späť na Vydanie 01",

      introKicker: "Tiché sebavedomie ♥",
      introTitle: "Hebká<br>navonok.",
      introText: "Britská krátkosrstá mačka s nádhernými zlatými očami, hebkou sivou srsťou a úplne vlastným charakterom. Jessica sa neponáhľa. Najprv pozoruje. Potom sa rozhodne.",

      profileKicker: "Profil Jessicy",
      profileTitle: "POKOJNÁ.<br>ZVEDAVÁ.<br>ÚPLNE SAMA SEBOU.",
      profileSub: "Britská krátkosrstá · profesionálna pozorovateľka",

      name: "<strong>Meno:</strong> Jessica",
      breed: "<strong>Plemeno:</strong> britská krátkosrstá",
      eyes: "<strong>Oči:</strong> teplé zlaté",
      coat: "<strong>Srsť:</strong> hebká, plyšová a sivá",
      personality: "<strong>Povaha:</strong> pokojná, všímavá a nezávislá",
      favourite: "<strong>Obľúbené miesto:</strong> niekde pohodlne s pekným výhľadom",
      afternoon: "<strong>Dokonalé popoludnie:</strong> slnko, pokoj a jej obľúbené kreslo",
      feature: "<strong>Osobitá črta:</strong> tiché sebavedomie",

      noHurry: "Netreba sa ponáhľať.",
      hasTime: "JESSICA MÁ ČAS.",

      observerKicker: "Jej obľúbená televízia",
      observerTitle: "SVET<br>VONKU",
      observerText: "Okno môže byť celým vesmírom. Ľudia prechádzajúci okolo. Pohybujúce sa listy. Vtáky, ktoré sa objavujú a miznú. Svetlo meniace sa počas dňa. Jessica môže všetko sledovať bez toho, aby musela byť uprostred diania.",

      homeKicker: "Domov je naozaj krásne miesto ♥",
      homeTitle: "UMENIE<br>POHODLIA",
      home1: "Niektoré zvieratá chcú, aby sa každý deň zmenil na výpravu.",
      home2: "Jessica rozumie inému druhu luxusu.",
      home3: "Mäkký pelech.",
      home4: "Teplé miesto na slnku.",
      home5: "Známe okno.",
      home6: "Pokojná záhrada.",
      home7: "Miesto, kde sa môže natiahnuť, pohodlne usadiť a jednoducho pozorovať.",
      home8: "Na pobyte doma nie je nič nudné, keď presne viete, ako si ho užiť.",

      pullquote: "Pohodlie nie je lenivosť.<br>Je to umenie.",

      momentsKicker: "Chvíle Jessicy",
      momentsTitle: "JEJ OBĽÚBENÝ<br>DRUH DŇA",

      softPlace: "Mäkké miesto ♥",
      softPlaceText: "Dokonalé miesto na to, aby nerobila absolútne nič.",

      windowWatch: "Pozorovanie z okna",
      windowWatchText: "Vždy sa nájde niečo, čo stojí za povšimnutie.",

      gardenTime: "Čas v záhrade 🌿",
      gardenTimeText: "Čerstvý vzduch, slnko a žiadny zbytočný zhon.",

      rulesKicker: "Jej pravidlá",
      rulesTitle: "NÁKLONNOSŤ<br>PODĽA JEJ PRAVIDIEL",

      tag1: "👀 Všímavá",
      tag2: "♥ Jemná",
      tag3: "☁️ Hebká",
      tag4: "🪟 Zvedavá",
      tag5: "🌿 Pokojná",
      tag6: "⭐ Nezávislá",

      rules1: "Nezávislosť neznamená nedostatok náklonnosti.",
      rules2: "Znamená jednoducho vedieť, čo chcete.",
      rules3: "Jessica nemusí chodiť za každým z miestnosti do miestnosti.",
      rules4: "Nemusí byť stredobodom každého okamihu.",
      rules5: "Sama si vyberá, kedy príde bližšie.",
      rules6: "Sama si vyberá, kedy zostane.",
      rules7: "A práve preto je okamih, keď si vyberie vás, ešte výnimočnejší.",

      slowKicker: "Pokojné popoludnie",
      slowTitle: "SLNKO.<br>TICHO.<br>DOKONALÉ.",
      slowText: "Dajte Jessice pohodlné kreslo, trochu slnka a dostatok pokoja, aby si mohla vychutnať oboje, a takmer nič viac nepotrebuje.",

      ritualKicker: "Malé rituály",
      ritualTitle: "NA MALÝCH CHVÍĽACH<br>ZÁLEŽÍ",
      ritual1: "Každá osobnosť má svoje malé rituály.",
      ritual2: "Miesta, kam sa vraciame.",
      ritual3: "Veci, ktoré nás prinútia zastaviť sa.",
      ritual4: "Drobné okamihy, ktoré sa stanú súčasťou obyčajného dňa.",
      ritual5: "Pre Jessicu sa aj krátka zastávka pri obľúbenej miske môže zmeniť na portrét úplného sústredenia.",

      finalKicker: "Hviezda obálky 03",
      finalTitle: "TICHO<br>NEZABUDNUTEĽNÁ",
      final1: "Toto je Jessica.",
      final2: "Britská krátkosrstá.",
      final3: "Hebká sivá srsť.",
      final4: "Zlaté oči.",
      final5: "Pokojná povaha.",
      final6: "Talent nájsť najpohodlnejšie miesto v miestnosti.",
      final7: "Dosť zvedavá na to, aby sledovala všetko.",
      final8: "Dosť nezávislá na to, aby nemusela byť pri všetkom.",
      final9: "Jemná, všímavá a úplne spokojná s tým, že je presne taká, aká je.",
      final10: "Nie každá hviezda obálky musí robiť hluk.",
      final11: "Niektoré sa na vás jednoducho pozrú zlatými očami a už na ne nemožno zabudnúť.",

      signature: "Zoznámte sa s",
      tagline: "Jeden svet. Každý miláčik.",
      issueLink: "← Vydanie 01",
      homeLink: "Domov"
    },    /* =====================================================
       ROMANIAN
       ===================================================== */

    ro: {
      heroKicker: "PETS & DOGUE · EDIȚIA 01<br>POVESTEA DE PE COPERTĂ",
      meet: "Faceți cunoștință cu",
      heroSub: "O delicată<br>doamnă britanică.",
      heroText: "Calmă, atentă și minunat de independentă, Jessica este genul de pisică ce nu trebuie niciodată să ceară atenție. Pur și simplu își alege locul preferat, privește lumea și îi lasă pe ceilalți să o descopere în propriile ei condiții.",

      backIssue: "← Înapoi la Ediția 01",

      introKicker: "Încredere liniștită ♥",
      introTitle: "Moale<br>la exterior.",
      introText: "O British Shorthair cu ochi aurii frumoși, blană gri și catifelată și o personalitate numai a ei. Jessica nu se grăbește. Mai întâi observă. Apoi decide.",

      profileKicker: "Profilul Jessicăi",
      profileTitle: "CALMĂ.<br>CURIOASĂ.<br>COMPLET EA ÎNSĂȘI.",
      profileSub: "British Shorthair · observatoare profesionistă",

      name: "<strong>Nume:</strong> Jessica",
      breed: "<strong>Rasă:</strong> British Shorthair",
      eyes: "<strong>Ochi:</strong> aurii și calzi",
      coat: "<strong>Blană:</strong> moale, deasă și gri",
      personality: "<strong>Personalitate:</strong> calmă, atentă și independentă",
      favourite: "<strong>Loc preferat:</strong> undeva confortabil, cu o priveliște frumoasă",
      afternoon: "<strong>După-amiaza perfectă:</strong> soare, liniște și fotoliul ei preferat",
      feature: "<strong>Trăsătură specială:</strong> încredere liniștită",

      noHurry: "Nu este nevoie de grabă.",
      hasTime: "JESSICA ARE TIMP.",

      observerKicker: "Televizorul ei preferat",
      observerTitle: "LUMEA<br>DE AFARĂ",
      observerText: "O fereastră poate fi un univers întreg. Oameni care trec. Frunze care se mișcă. Păsări care apar și dispar. Lumina care se schimbă de-a lungul zilei. Jessica poate privi totul fără să simtă nevoia să fie în mijlocul acțiunii.",

      homeKicker: "Acasă este un loc minunat ♥",
      homeTitle: "ARTA<br>CONFORTULUI",
      home1: "Unele animale vor ca fiecare zi să devină o expediție.",
      home2: "Jessica înțelege un alt fel de lux.",
      home3: "Un pat moale.",
      home4: "Un loc cald în lumina soarelui.",
      home5: "O fereastră familiară.",
      home6: "O grădină liniștită.",
      home7: "Un loc unde se poate întinde, se poate așeza confortabil și pur și simplu poate privi.",
      home8: "Nu este nimic plictisitor în a sta acasă atunci când știi exact cum să te bucuri de asta.",

      pullquote: "Confortul nu este lene.<br>Este o artă.",

      momentsKicker: "Momente cu Jessica",
      momentsTitle: "TIPUL EI PREFERAT<br>DE ZI",

      softPlace: "Un loc moale ♥",
      softPlaceText: "Locul perfect pentru a nu face absolut nimic.",

      windowWatch: "Privitul pe fereastră",
      windowWatchText: "Există întotdeauna ceva care merită observat.",

      gardenTime: "Timp în grădină 🌿",
      gardenTimeText: "Aer proaspăt, soare și nicio grabă inutilă.",

      rulesKicker: "Regulile ei",
      rulesTitle: "AFECȚIUNE<br>ÎN CONDIȚIILE EI",

      tag1: "👀 Atentă",
      tag2: "♥ Blândă",
      tag3: "☁️ Moale",
      tag4: "🪟 Curioasă",
      tag5: "🌿 Liniștită",
      tag6: "⭐ Independentă",

      rules1: "Independența nu înseamnă lipsă de afecțiune.",
      rules2: "Înseamnă pur și simplu să știi ce vrei.",
      rules3: "Jessica nu trebuie să îi urmeze pe toți dintr-o cameră în alta.",
      rules4: "Nu trebuie să fie în centrul fiecărui moment.",
      rules5: "Ea alege când să se apropie.",
      rules6: "Ea alege când să rămână.",
      rules7: "Și, cumva, tocmai asta face ca momentul în care te alege pe tine să pară și mai special.",

      slowKicker: "O după-amiază liniștită",
      slowTitle: "SOARE.<br>LINIȘTE.<br>PERFECT.",
      slowText: "Oferă-i Jessicăi un fotoliu confortabil, puțin soare și suficientă liniște pentru a se bucura de amândouă și aproape nimic altceva nu mai este necesar.",

      ritualKicker: "Mici ritualuri",
      ritualTitle: "MOMENTELE MICI<br>CONTEAZĂ",
      ritual1: "Fiecare personalitate are micile ei ritualuri.",
      ritual2: "Locurile în care revenim.",
      ritual3: "Lucrurile care ne fac să ne oprim.",
      ritual4: "Micile momente care devin parte dintr-o zi obișnuită.",
      ritual5: "Pentru Jessica, chiar și o simplă pauză lângă bolul ei preferat poate deveni un portret al concentrării.",

      finalKicker: "Vedeta copertei 03",
      finalTitle: "TĂCUTĂ<br>DE NEUITAT",
      final1: "Aceasta este Jessica.",
      final2: "O British Shorthair.",
      final3: "Blană gri și moale.",
      final4: "Ochi aurii.",
      final5: "O fire calmă.",
      final6: "Un talent pentru a găsi cel mai confortabil loc din cameră.",
      final7: "Suficient de curioasă pentru a observa totul.",
      final8: "Suficient de independentă pentru a nu trebui să participe la tot.",
      final9: "Blândă, atentă și complet împăcată cu faptul că este exact cine este.",
      final10: "Nu fiecare vedetă de copertă trebuie să facă zgomot.",
      final11: "Unele pur și simplu te privesc cu ochi aurii și devin imposibil de uitat.",

      signature: "Faceți cunoștință cu",
      tagline: "O lume. Fiecare animal.",
      issueLink: "← Ediția 01",
      homeLink: "Acasă"
    },

    /* =====================================================
       BULGARIAN
       ===================================================== */

    bg: {
      heroKicker: "PETS & DOGUE · БРОЙ 01<br>ИСТОРИЯ ОТ КОРИЦАТА",
      meet: "Запознайте се с",
      heroSub: "Нежна<br>британска дама.",
      heroText: "Спокойна, наблюдателна и прекрасно независима, Jessica е от онези котки, които никога не трябва да изискват внимание. Тя просто избира любимото си място, наблюдава света и позволява на всички останали да я опознаят според нейните собствени правила.",

      backIssue: "← Назад към Брой 01",

      introKicker: "Тиха увереност ♥",
      introTitle: "Мека<br>отвън.",
      introText: "Британска късокосместа котка с красиви златисти очи, плюшена сива козина и напълно собствен характер. Jessica не бърза. Първо наблюдава. После решава.",

      profileKicker: "Профилът на Jessica",
      profileTitle: "СПОКОЙНА.<br>ЛЮБОПИТНА.<br>НАПЪЛНО СЕБЕ СИ.",
      profileSub: "Британска късокосместа · професионален наблюдател",

      name: "<strong>Име:</strong> Jessica",
      breed: "<strong>Порода:</strong> британска късокосместа",
      eyes: "<strong>Очи:</strong> топли златисти",
      coat: "<strong>Козина:</strong> мека, плюшена и сива",
      personality: "<strong>Характер:</strong> спокойна, наблюдателна и независима",
      favourite: "<strong>Любимо място:</strong> някъде удобно с хубава гледка",
      afternoon: "<strong>Перфектен следобед:</strong> слънце, спокойствие и любимото ѝ кресло",
      feature: "<strong>Специална черта:</strong> тиха увереност",

      noHurry: "Няма нужда да се бърза.",
      hasTime: "JESSICA ИМА ВРЕМЕ.",

      observerKicker: "Любимата ѝ телевизия",
      observerTitle: "СВЕТЪТ<br>НАВЪН",
      observerText: "Един прозорец може да бъде цяла вселена. Минаващи хора. Движещи се листа. Птици, които се появяват и изчезват. Светлината, която се променя през деня. Jessica може да наблюдава всичко това, без да има нужда да бъде в центъра на събитията.",

      homeKicker: "Домът е прекрасно място ♥",
      homeTitle: "ИЗКУСТВОТО<br>НА УЮТА",
      home1: "Някои животни искат всеки ден да се превръща в експедиция.",
      home2: "Jessica разбира друг вид лукс.",
      home3: "Меко легло.",
      home4: "Топло слънчево място.",
      home5: "Познат прозорец.",
      home6: "Спокойна градина.",
      home7: "Място, където може да се протегне, да се настани удобно и просто да наблюдава.",
      home8: "Няма нищо скучно в това да си у дома, когато знаеш точно как да му се наслаждаваш.",

      pullquote: "Уютът не е мързел.<br>Той е изкуство.",

      momentsKicker: "Моменти с Jessica",
      momentsTitle: "ЛЮБИМИЯТ Ѝ<br>ВИД ДЕН",

      softPlace: "Меко място ♥",
      softPlaceText: "Идеалното място да не правиш абсолютно нищо.",

      windowWatch: "Наблюдение през прозореца",
      windowWatchText: "Винаги има нещо, което си струва да бъде забелязано.",

      gardenTime: "Време в градината 🌿",
      gardenTimeText: "Свеж въздух, слънце и никакво излишно бързане.",

      rulesKicker: "Нейните правила",
      rulesTitle: "ОБИЧ<br>ПО НЕЙНИТЕ ПРАВИЛА",

      tag1: "👀 Наблюдателна",
      tag2: "♥ Нежна",
      tag3: "☁️ Мека",
      tag4: "🪟 Любопитна",
      tag5: "🌿 Спокойна",
      tag6: "⭐ Независима",

      rules1: "Независимостта не означава липса на обич.",
      rules2: "Тя просто означава да знаеш какво искаш.",
      rules3: "Jessica няма нужда да следва всички от стая в стая.",
      rules4: "Няма нужда да бъде центърът на всеки момент.",
      rules5: "Тя избира кога да се приближи.",
      rules6: "Тя избира кога да остане.",
      rules7: "И някак точно това прави момента, в който тя избере теб, още по-специален.",

      slowKicker: "Спокоен следобед",
      slowTitle: "СЛЪНЦЕ.<br>ТИШИНА.<br>ПЕРФЕКТНО.",
      slowText: "Дайте на Jessica удобно кресло, малко слънце и достатъчно спокойствие, за да се наслаждава и на двете, и почти нищо друго няма да ѝ е необходимо.",

      ritualKicker: "Малки ритуали",
      ritualTitle: "МАЛКИТЕ МОМЕНТИ<br>ИМАТ ЗНАЧЕНИЕ",
      ritual1: "Всеки характер има своите малки ритуали.",
      ritual2: "Местата, към които се връщаме.",
      ritual3: "Нещата, които ни карат да спрем.",
      ritual4: "Малките моменти, които стават част от един обикновен ден.",
      ritual5: "За Jessica дори кратка пауза до любимата ѝ купичка може да се превърне в портрет на пълна концентрация.",

      finalKicker: "Звезда на корицата 03",
      finalTitle: "ТИХО<br>НЕЗАБРАВИМА",
      final1: "Това е Jessica.",
      final2: "Британска късокосместа.",
      final3: "Мека сива козина.",
      final4: "Златисти очи.",
      final5: "Спокоен характер.",
      final6: "Талант да намира най-удобното място в стаята.",
      final7: "Достатъчно любопитна, за да наблюдава всичко.",
      final8: "Достатъчно независима, за да не трябва да участва във всичко.",
      final9: "Нежна, наблюдателна и напълно спокойна да бъде точно такава, каквато е.",
      final10: "Не всяка звезда на корицата трябва да вдига шум.",
      final11: "Някои просто ви поглеждат със златисти очи и стават невъзможни за забравяне.",

      signature: "Запознайте се с",
      tagline: "Един свят. Всеки любимец.",
      issueLink: "← Брой 01",
      homeLink: "Начало"
    },

    /* =====================================================
       GREEK
       ===================================================== */

    el: {
      heroKicker: "PETS & DOGUE · ΤΕΥΧΟΣ 01<br>ΙΣΤΟΡΙΑ ΕΞΩΦΥΛΛΟΥ",
      meet: "Γνωρίστε τη",
      heroSub: "Μια γλυκιά<br>Βρετανίδα κυρία.",
      heroText: "Ήρεμη, παρατηρητική και υπέροχα ανεξάρτητη, η Jessica είναι η γάτα που δεν χρειάζεται ποτέ να απαιτεί προσοχή. Απλώς επιλέγει το αγαπημένο της μέρος, παρατηρεί τον κόσμο και αφήνει τους άλλους να τη γνωρίσουν με τους δικούς της όρους.",

      backIssue: "← Πίσω στο Τεύχος 01",

      introKicker: "Ήσυχη αυτοπεποίθηση ♥",
      introTitle: "Απαλή<br>εξωτερικά.",
      introText: "Μια British Shorthair με υπέροχα χρυσαφένια μάτια, βελούδινο γκρι τρίχωμα και έναν χαρακτήρα εντελώς δικό της. Η Jessica δεν βιάζεται. Πρώτα παρατηρεί. Μετά αποφασίζει.",

      profileKicker: "Το προφίλ της Jessica",
      profileTitle: "ΗΡΕΜΗ.<br>ΠΕΡΙΕΡΓΗ.<br>ΑΠΟΛΥΤΑ Ο ΕΑΥΤΟΣ ΤΗΣ.",
      profileSub: "British Shorthair · επαγγελματίας παρατηρήτρια",

      name: "<strong>Όνομα:</strong> Jessica",
      breed: "<strong>Ράτσα:</strong> British Shorthair",
      eyes: "<strong>Μάτια:</strong> ζεστά χρυσαφένια",
      coat: "<strong>Τρίχωμα:</strong> απαλό, βελούδινο και γκρι",
      personality: "<strong>Χαρακτήρας:</strong> ήρεμη, παρατηρητική και ανεξάρτητη",
      favourite: "<strong>Αγαπημένο μέρος:</strong> κάπου άνετα με ωραία θέα",
      afternoon: "<strong>Τέλειο απόγευμα:</strong> ήλιος, ησυχία και η αγαπημένη της πολυθρόνα",
      feature: "<strong>Ιδιαίτερο χαρακτηριστικό:</strong> ήσυχη αυτοπεποίθηση",

      noHurry: "Δεν υπάρχει λόγος βιασύνης.",
      hasTime: "Η JESSICA ΕΧΕΙ ΧΡΟΝΟ.",

      observerKicker: "Η αγαπημένη της τηλεόραση",
      observerTitle: "Ο ΚΟΣΜΟΣ<br>ΕΞΩ",
      observerText: "Ένα παράθυρο μπορεί να είναι ένα ολόκληρο σύμπαν. Άνθρωποι που περνούν. Φύλλα που κινούνται. Πουλιά που εμφανίζονται και εξαφανίζονται. Το φως που αλλάζει μέσα στην ημέρα. Η Jessica μπορεί να τα παρατηρεί όλα χωρίς να χρειάζεται να βρίσκεται στο κέντρο της δράσης.",

      homeKicker: "Το σπίτι είναι υπέροχο μέρος ♥",
      homeTitle: "Η ΤΕΧΝΗ<br>ΤΗΣ ΑΝΕΣΗΣ",
      home1: "Μερικά ζώα θέλουν κάθε ημέρα να γίνεται μια νέα εξερεύνηση.",
      home2: "Η Jessica καταλαβαίνει ένα διαφορετικό είδος πολυτέλειας.",
      home3: "Ένα μαλακό κρεβάτι.",
      home4: "Μια ζεστή ηλιόλουστη γωνιά.",
      home5: "Ένα γνώριμο παράθυρο.",
      home6: "Ένας ήσυχος κήπος.",
      home7: "Ένα μέρος όπου μπορεί να τεντωθεί, να βολευτεί και απλώς να παρατηρεί.",
      home8: "Δεν υπάρχει τίποτα βαρετό στο να είσαι σπίτι όταν ξέρεις ακριβώς πώς να το απολαμβάνεις.",

      pullquote: "Η άνεση δεν είναι τεμπελιά.<br>Είναι τέχνη.",

      momentsKicker: "Στιγμές της Jessica",
      momentsTitle: "Η ΑΓΑΠΗΜΕΝΗ ΤΗΣ<br>ΜΟΡΦΗ ΗΜΕΡΑΣ",

      softPlace: "Μαλακό μέρος ♥",
      softPlaceText: "Το τέλειο μέρος για να μην κάνεις απολύτως τίποτα.",

      windowWatch: "Παρατήρηση από το παράθυρο",
      windowWatchText: "Υπάρχει πάντα κάτι που αξίζει να προσέξεις.",

      gardenTime: "Ώρα στον κήπο 🌿",
      gardenTimeText: "Καθαρός αέρας, ήλιος και καμία περιττή βιασύνη.",

      rulesKicker: "Οι κανόνες της",
      rulesTitle: "ΤΡΥΦΕΡΟΤΗΤΑ<br>ΜΕ ΤΟΥΣ ΔΙΚΟΥΣ ΤΗΣ ΟΡΟΥΣ",

      tag1: "👀 Παρατηρητική",
      tag2: "♥ Γλυκιά",
      tag3: "☁️ Απαλή",
      tag4: "🪟 Περίεργη",
      tag5: "🌿 Ήρεμη",
      tag6: "⭐ Ανεξάρτητη",

      rules1: "Η ανεξαρτησία δεν σημαίνει έλλειψη τρυφερότητας.",
      rules2: "Σημαίνει απλώς ότι ξέρεις τι θέλεις.",
      rules3: "Η Jessica δεν χρειάζεται να ακολουθεί τους πάντες από δωμάτιο σε δωμάτιο.",
      rules4: "Δεν χρειάζεται να βρίσκεται στο κέντρο κάθε στιγμής.",
      rules5: "Εκείνη επιλέγει πότε θα πλησιάσει.",
      rules6: "Εκείνη επιλέγει πότε θα μείνει.",
      rules7: "Και κάπως έτσι, η στιγμή που επιλέγει εσένα γίνεται ακόμη πιο ξεχωριστή.",

      slowKicker: "Ένα ήρεμο απόγευμα",
      slowTitle: "ΗΛΙΟΣ.<br>ΣΙΩΠΗ.<br>ΤΕΛΕΙΑ.",
      slowText: "Δώστε στη Jessica μια άνετη πολυθρόνα, λίγο ήλιο και αρκετή ησυχία για να απολαύσει και τα δύο, και σχεδόν τίποτε άλλο δεν χρειάζεται.",

      ritualKicker: "Μικρές συνήθειες",
      ritualTitle: "ΟΙ ΜΙΚΡΕΣ ΣΤΙΓΜΕΣ<br>ΜΕΤΡΟΥΝ",
      ritual1: "Κάθε προσωπικότητα έχει τις μικρές της συνήθειες.",
      ritual2: "Τα μέρη στα οποία επιστρέφουμε.",
      ritual3: "Τα πράγματα που μας κάνουν να σταματάμε.",
      ritual4: "Οι μικρές στιγμές που γίνονται μέρος μιας συνηθισμένης ημέρας.",
      ritual5: "Για τη Jessica, ακόμη και μια μικρή παύση δίπλα στο αγαπημένο της μπολ μπορεί να γίνει ένα πορτρέτο απόλυτης συγκέντρωσης.",

      finalKicker: "Αστέρι εξωφύλλου 03",
      finalTitle: "ΗΡΕΜΑ<br>ΑΞΕΧΑΣΤΗ",
      final1: "Αυτή είναι η Jessica.",
      final2: "Μια British Shorthair.",
      final3: "Απαλό γκρι τρίχωμα.",
      final4: "Χρυσαφένια μάτια.",
      final5: "Ήρεμος χαρακτήρας.",
      final6: "Ταλέντο στο να βρίσκει το πιο άνετο μέρος του δωματίου.",
      final7: "Αρκετά περίεργη ώστε να παρατηρεί τα πάντα.",
      final8: "Αρκετά ανεξάρτητη ώστε να μη χρειάζεται να συμμετέχει στα πάντα.",
      final9: "Γλυκιά, παρατηρητική και απόλυτα άνετη με το να είναι ακριβώς αυτή που είναι.",
      final10: "Δεν χρειάζεται κάθε αστέρι εξωφύλλου να κάνει θόρυβο.",
      final11: "Μερικά απλώς σε κοιτούν με χρυσαφένια μάτια και γίνονται αδύνατο να τα ξεχάσεις.",

      signature: "Γνωρίστε τη",
      tagline: "Ένας κόσμος. Κάθε κατοικίδιο.",
      issueLink: "← Τεύχος 01",
      homeLink: "Αρχική"
    },

    /* =====================================================
       TURKISH
       ===================================================== */

    tr: {
      heroKicker: "PETS & DOGUE · SAYI 01<br>KAPAK HİKÂYESİ",
      meet: "Tanışın",
      heroSub: "Nazik bir<br>İngiliz hanımefendiyle.",
      heroText: "Sakin, gözlemci ve harika biçimde bağımsız olan Jessica, ilgi görmek için asla talepte bulunması gerekmeyen bir kedi. Sadece en sevdiği yeri seçiyor, dünyayı izliyor ve herkesin onu kendi şartlarıyla tanımasına izin veriyor.",

      backIssue: "← Sayı 01'e dön",

      introKicker: "Sessiz özgüven ♥",
      introTitle: "Dışarıdan<br>yumuşak.",
      introText: "Güzel altın gözleri, pelüş gibi gri tüyleri ve tamamen kendine özgü karakteriyle bir British Shorthair. Jessica acele etmez. Önce gözlemler. Sonra karar verir.",

      profileKicker: "Jessica'nın profili",
      profileTitle: "SAKİN.<br>MERAKLI.<br>TAMAMEN KENDİSİ.",
      profileSub: "British Shorthair · profesyonel gözlemci",

      name: "<strong>Adı:</strong> Jessica",
      breed: "<strong>Irkı:</strong> British Shorthair",
      eyes: "<strong>Gözleri:</strong> sıcak altın tonlarında",
      coat: "<strong>Tüyleri:</strong> yumuşak, pelüş gibi ve gri",
      personality: "<strong>Karakteri:</strong> sakin, gözlemci ve bağımsız",
      favourite: "<strong>En sevdiği yer:</strong> güzel manzaralı, rahat bir köşe",
      afternoon: "<strong>Mükemmel öğleden sonra:</strong> güneş, huzur ve en sevdiği koltuk",
      feature: "<strong>Özel özelliği:</strong> sessiz özgüven",

      noHurry: "Acele etmeye gerek yok.",
      hasTime: "JESSICA'NIN ZAMANI VAR.",

      observerKicker: "En sevdiği televizyon",
      observerTitle: "DIŞARIDAKİ<br>DÜNYA",
      observerText: "Bir pencere başlı başına bir evren olabilir. Geçip giden insanlar. Hareket eden yapraklar. Görünüp kaybolan kuşlar. Gün boyunca değişen ışık. Jessica bütün bunları olayların ortasında olmaya ihtiyaç duymadan izleyebilir.",

      homeKicker: "Ev gerçekten güzel bir yer ♥",
      homeTitle: "RAHATLIĞIN<br>SANATI",
      home1: "Bazı hayvanlar her günün bir keşif gezisine dönüşmesini ister.",
      home2: "Jessica başka bir lüks türünü anlıyor.",
      home3: "Yumuşak bir yatak.",
      home4: "Sıcak bir güneş köşesi.",
      home5: "Tanıdık bir pencere.",
      home6: "Huzurlu bir bahçe.",
      home7: "Uzanabileceği, rahatça yerleşebileceği ve sadece izleyebileceği bir yer.",
      home8: "Nasıl keyif çıkaracağınızı biliyorsanız evde olmanın sıkıcı hiçbir yanı yoktur.",

      pullquote: "Rahatlık tembellik değildir.<br>Bir sanattır.",

      momentsKicker: "Jessica anları",
      momentsTitle: "EN SEVDİĞİ<br>GÜN TÜRÜ",

      softPlace: "Yumuşak yer ♥",
      softPlaceText: "Kesinlikle hiçbir şey yapmamak için mükemmel bir yer.",

      windowWatch: "Pencereden izlemek",
      windowWatchText: "Her zaman fark edilmeye değer bir şey vardır.",

      gardenTime: "Bahçe zamanı 🌿",
      gardenTimeText: "Temiz hava, güneş ve gereksiz hiçbir acele yok.",

      rulesKicker: "Onun kuralları",
      rulesTitle: "SEVGİ<br>ONUN ŞARTLARIYLA",

      tag1: "👀 Gözlemci",
      tag2: "♥ Nazik",
      tag3: "☁️ Yumuşak",
      tag4: "🪟 Meraklı",
      tag5: "🌿 Huzurlu",
      tag6: "⭐ Bağımsız",

      rules1: "Bağımsızlık sevgi eksikliği anlamına gelmez.",
      rules2: "Sadece ne istediğini bilmek demektir.",
      rules3: "Jessica'nın herkesi odadan odaya takip etmesine gerek yok.",
      rules4: "Her anın merkezinde olması gerekmiyor.",
      rules5: "Ne zaman yaklaşacağını kendisi seçiyor.",
      rules6: "Ne zaman kalacağını kendisi seçiyor.",
      rules7: "Ve bir şekilde bu, seni seçtiği anı daha da özel kılıyor.",

      slowKicker: "Yavaş bir öğleden sonra",
      slowTitle: "GÜNEŞ.<br>SESSİZLİK.<br>MÜKEMMEL.",
      slowText: "Jessica'ya rahat bir koltuk, biraz güneş ve ikisinin de keyfini çıkaracak kadar huzur verin; bundan fazlasına pek ihtiyacı kalmaz.",

      ritualKicker: "Küçük ritüeller",
      ritualTitle: "KÜÇÜK ANLAR<br>ÖNEMLİDİR",
      ritual1: "Her karakterin küçük ritüelleri vardır.",
      ritual2: "Geri döndüğümüz yerler.",
      ritual3: "Bizi durduran şeyler.",
      ritual4: "Sıradan bir günün parçası hâline gelen küçük anlar.",
      ritual5: "Jessica için en sevdiği mama kabının yanındaki basit bir duraklama bile tam bir konsantrasyon portresine dönüşebilir.",

      finalKicker: "Kapak yıldızı 03",
      finalTitle: "SESSİZCE<br>UNUTULMAZ",
      final1: "İşte Jessica.",
      final2: "Bir British Shorthair.",
      final3: "Yumuşak gri tüyler.",
      final4: "Altın gözler.",
      final5: "Sakin bir karakter.",
      final6: "Odadaki en rahat yeri bulma yeteneği.",
      final7: "Her şeyi izleyecek kadar meraklı.",
      final8: "Her şeye katılmaya ihtiyaç duymayacak kadar bağımsız.",
      final9: "Nazik, gözlemci ve tam olarak olduğu kişi olmaktan tamamen memnun.",
      final10: "Her kapak yıldızının ses çıkarması gerekmez.",
      final11: "Bazıları sadece altın gözleriyle size bakar ve unutulması imkânsız hâle gelir.",

      signature: "Tanışın",
      tagline: "Tek dünya. Her evcil hayvan.",
      issueLink: "← Sayı 01",
      homeLink: "Ana sayfa"
    },

    /* =====================================================
       SWEDISH
       ===================================================== */

    sv: {
      heroKicker: "PETS & DOGUE · UTGÅVA 01<br>OMSLAGSBERÄTTELSE",
      meet: "Möt",
      heroSub: "En mild<br>brittisk dam.",
      heroText: "Lugn, observant och underbart självständig är Jessica den sortens katt som aldrig behöver kräva uppmärksamhet. Hon väljer helt enkelt sin favoritplats, betraktar världen och låter alla andra lära känna henne på hennes egna villkor.",

      backIssue: "← Tillbaka till Utgåva 01",

      introKicker: "Stilla självförtroende ♥",
      introTitle: "Mjuk<br>på utsidan.",
      introText: "En brittisk korthår med vackra gyllene ögon, mjuk grå päls och en helt egen personlighet. Jessica har ingen brådska. Först observerar hon. Sedan bestämmer hon sig.",

      profileKicker: "Jessicas profil",
      profileTitle: "LUGN.<br>NYFIKEN.<br>HELT SIG SJÄLV.",
      profileSub: "Brittisk korthår · professionell observatör",

      name: "<strong>Namn:</strong> Jessica",
      breed: "<strong>Ras:</strong> brittisk korthår",
      eyes: "<strong>Ögon:</strong> varmt gyllene",
      coat: "<strong>Päls:</strong> mjuk, plyschig och grå",
      personality: "<strong>Personlighet:</strong> lugn, observant och självständig",
      favourite: "<strong>Favoritplats:</strong> någonstans bekvämt med fin utsikt",
      afternoon: "<strong>Perfekt eftermiddag:</strong> solsken, lugn och hennes favoritfåtölj",
      feature: "<strong>Särskilt kännetecken:</strong> stilla självförtroende",

      noHurry: "Ingen anledning att skynda.",
      hasTime: "JESSICA HAR TID.",

      observerKicker: "Hennes favorit-tv",
      observerTitle: "VÄRLDEN<br>UTANFÖR",
      observerText: "Ett fönster kan vara ett helt universum. Människor som passerar. Löv som rör sig. Fåglar som dyker upp och försvinner. Ljuset som förändras under dagen. Jessica kan betrakta allt utan att behöva vara mitt i händelserna.",

      homeKicker: "Hemma är en underbar plats ♥",
      homeTitle: "KONSTEN<br>ATT HA DET BEKVÄMT",
      home1: "Vissa djur vill att varje dag ska bli ett äventyr.",
      home2: "Jessica förstår en annan sorts lyx.",
      home3: "En mjuk säng.",
      home4: "En varm plats i solen.",
      home5: "Ett välbekant fönster.",
      home6: "En lugn trädgård.",
      home7: "En plats där hon kan sträcka ut sig, göra sig bekväm och bara titta.",
      home8: "Det finns inget tråkigt med att vara hemma när man vet exakt hur man ska njuta av det.",

      pullquote: "Bekvämlighet är inte lathet.<br>Det är en konst.",

      momentsKicker: "Jessica-stunder",
      momentsTitle: "HENNES FAVORIT<br>SORTS DAG",

      softPlace: "Mjuk plats ♥",
      softPlaceText: "Den perfekta platsen för att göra absolut ingenting.",

      windowWatch: "Titta genom fönstret",
      windowWatchText: "Det finns alltid något som är värt att lägga märke till.",

      gardenTime: "Tid i trädgården 🌿",
      gardenTimeText: "Frisk luft, solsken och ingen onödig brådska.",

      rulesKicker: "Hennes regler",
      rulesTitle: "ÖMHET<br>PÅ HENNES VILLKOR",

      tag1: "👀 Observant",
      tag2: "♥ Mild",
      tag3: "☁️ Mjuk",
      tag4: "🪟 Nyfiken",
      tag5: "🌿 Lugn",
      tag6: "⭐ Självständig",

      rules1: "Självständighet betyder inte brist på kärlek.",
      rules2: "Det betyder helt enkelt att veta vad man vill.",
      rules3: "Jessica behöver inte följa alla från rum till rum.",
      rules4: "Hon behöver inte vara centrum i varje ögonblick.",
      rules5: "Hon väljer själv när hon vill komma närmare.",
      rules6: "Hon väljer själv när hon vill stanna.",
      rules7: "Och på något sätt gör det ögonblicket när hon väljer dig ännu mer speciellt.",

      slowKicker: "En lugn eftermiddag",
      slowTitle: "SOLSKEN.<br>TYSTNAD.<br>PERFEKT.",
      slowText: "Ge Jessica en bekväm fåtölj, lite solsken och tillräckligt med lugn för att njuta av båda, så behövs nästan ingenting mer.",

      ritualKicker: "Små ritualer",
      ritualTitle: "SMÅ ÖGONBLICK<br>SPELAR ROLL",
      ritual1: "Varje personlighet har sina små ritualer.",
      ritual2: "Platserna vi återvänder till.",
      ritual3: "Sakerna som får oss att stanna upp.",
      ritual4: "De små ögonblicken som blir en del av en vanlig dag.",
      ritual5: "För Jessica kan till och med en enkel paus bredvid favoritskålen bli ett porträtt av fullständig koncentration.",

      finalKicker: "Omslagsstjärna 03",
      finalTitle: "STILLA<br>OFÖRGLÖMLIG",
      final1: "Det här är Jessica.",
      final2: "En brittisk korthår.",
      final3: "Mjuk grå päls.",
      final4: "Gyllene ögon.",
      final5: "Ett lugnt temperament.",
      final6: "En talang för att hitta rummets bekvämaste plats.",
      final7: "Nyfiken nog för att observera allt.",
      final8: "Självständig nog för att inte behöva delta i allt.",
      final9: "Mild, observant och fullständigt bekväm med att vara precis den hon är.",
      final10: "Inte varje omslagsstjärna behöver göra väsen av sig.",
      final11: "Vissa tittar helt enkelt på dig med gyllene ögon och blir omöjliga att glömma.",

      signature: "Möt",
      tagline: "En värld. Varje husdjur.",
      issueLink: "← Utgåva 01",
      homeLink: "Hem"
    },    /* =====================================================
       DANISH
       ===================================================== */

    da: {
      heroKicker: "PETS & DOGUE · UDGAVE 01<br>FORSIDEHISTORIE",
      meet: "Mød",
      heroSub: "En blid<br>britisk dame.",
      heroText: "Rolig, opmærksom og vidunderligt selvstændig er Jessica den slags kat, der aldrig behøver at kræve opmærksomhed. Hun vælger ganske enkelt sit yndlingssted, betragter verden og lader alle andre lære hende at kende på hendes egne betingelser.",

      backIssue: "← Tilbage til Udgave 01",

      introKicker: "Stille selvsikkerhed ♥",
      introTitle: "Blød<br>udenpå.",
      introText: "En britisk korthår med smukke gyldne øjne, blød grå pels og en helt egen personlighed. Jessica har ikke travlt. Først observerer hun. Så beslutter hun sig.",

      profileKicker: "Jessicas profil",
      profileTitle: "ROLIG.<br>NYSGERRIG.<br>HELT SIG SELV.",
      profileSub: "Britisk korthår · professionel observatør",

      name: "<strong>Navn:</strong> Jessica",
      breed: "<strong>Race:</strong> britisk korthår",
      eyes: "<strong>Øjne:</strong> varmt gyldne",
      coat: "<strong>Pels:</strong> blød, plysset og grå",
      personality: "<strong>Personlighed:</strong> rolig, opmærksom og selvstændig",
      favourite: "<strong>Yndlingssted:</strong> et behageligt sted med en god udsigt",
      afternoon: "<strong>Perfekt eftermiddag:</strong> solskin, ro og hendes yndlingsstol",
      feature: "<strong>Særligt kendetegn:</strong> stille selvsikkerhed",

      noHurry: "Ingen grund til at skynde sig.",
      hasTime: "JESSICA HAR TID.",

      observerKicker: "Hendes yndlings-tv",
      observerTitle: "VERDEN<br>UDENFOR",
      observerText: "Et vindue kan være et helt univers. Mennesker, der går forbi. Blade, der bevæger sig. Fugle, der dukker op og forsvinder. Lyset, der ændrer sig gennem dagen. Jessica kan betragte det hele uden nogensinde at behøve at være midt i begivenhederne.",

      homeKicker: "Hjemmet er et vidunderligt sted ♥",
      homeTitle: "KUNSTEN<br>AT HAVE DET GODT",
      home1: "Nogle dyr ønsker, at hver dag skal blive til en ekspedition.",
      home2: "Jessica forstår en anden slags luksus.",
      home3: "En blød seng.",
      home4: "En varm plads i solen.",
      home5: "Et velkendt vindue.",
      home6: "En fredelig have.",
      home7: "Et sted, hvor hun kan strække sig, lægge sig godt til rette og bare kigge.",
      home8: "Der er intet kedeligt ved at være hjemme, når man ved præcis, hvordan man skal nyde det.",

      pullquote: "Komfort er ikke dovenskab.<br>Det er en kunst.",

      momentsKicker: "Jessica-øjeblikke",
      momentsTitle: "HENDES FAVORIT<br>SLAGS DAG",

      softPlace: "Blødt sted ♥",
      softPlaceText: "Det perfekte sted til at lave absolut ingenting.",

      windowWatch: "Udsigt fra vinduet",
      windowWatchText: "Der er altid noget, der er værd at lægge mærke til.",

      gardenTime: "Tid i haven 🌿",
      gardenTimeText: "Frisk luft, solskin og ingen unødvendig hast.",

      rulesKicker: "Hendes regler",
      rulesTitle: "KÆRLIGHED<br>PÅ HENDES BETINGELSER",

      tag1: "👀 Opmærksom",
      tag2: "♥ Blid",
      tag3: "☁️ Blød",
      tag4: "🪟 Nysgerrig",
      tag5: "🌿 Fredelig",
      tag6: "⭐ Selvstændig",

      rules1: "Selvstændighed betyder ikke mangel på kærlighed.",
      rules2: "Det betyder ganske enkelt at vide, hvad man vil.",
      rules3: "Jessica behøver ikke følge alle fra rum til rum.",
      rules4: "Hun behøver ikke være centrum for hvert øjeblik.",
      rules5: "Hun vælger selv, hvornår hun kommer tættere på.",
      rules6: "Hun vælger selv, hvornår hun bliver.",
      rules7: "Og på en eller anden måde gør det øjeblikket, hvor hun vælger dig, endnu mere særligt.",

      slowKicker: "En rolig eftermiddag",
      slowTitle: "SOLSKIN.<br>STILHED.<br>PERFEKT.",
      slowText: "Giv Jessica en behagelig stol, lidt solskin og nok ro til at nyde begge dele, så behøver hun næsten ikke mere.",

      ritualKicker: "Små ritualer",
      ritualTitle: "SMÅ ØJEBLIKKE<br>BETYDER NOGET",
      ritual1: "Enhver personlighed har sine små ritualer.",
      ritual2: "Stederne, vi vender tilbage til.",
      ritual3: "Tingene, der får os til at standse.",
      ritual4: "De små øjeblikke, der bliver en del af en almindelig dag.",
      ritual5: "For Jessica kan selv en kort pause ved hendes yndlingsskål blive et portræt af fuldstændig koncentration.",

      finalKicker: "Forsidestjerne 03",
      finalTitle: "STILLE<br>UFORGLEMMELIG",
      final1: "Dette er Jessica.",
      final2: "En britisk korthår.",
      final3: "Blød grå pels.",
      final4: "Gyldne øjne.",
      final5: "Et roligt temperament.",
      final6: "Et talent for at finde det mest behagelige sted i rummet.",
      final7: "Nysgerrig nok til at betragte alt.",
      final8: "Selvstændig nok til ikke at behøve at deltage i alt.",
      final9: "Blid, opmærksom og helt tilpas med at være præcis den, hun er.",
      final10: "Ikke enhver forsidestjerne behøver at larme.",
      final11: "Nogle ser bare på dig med gyldne øjne og bliver umulige at glemme.",

      signature: "Mød",
      tagline: "Én verden. Hvert kæledyr.",
      issueLink: "← Udgave 01",
      homeLink: "Hjem"
    },

    /* =====================================================
       NORWEGIAN
       ===================================================== */

    no: {
      heroKicker: "PETS & DOGUE · UTGAVE 01<br>FORSIDEHISTORIE",
      meet: "Møt",
      heroSub: "En mild<br>britisk dame.",
      heroText: "Rolig, observant og herlig selvstendig er Jessica den typen katt som aldri trenger å kreve oppmerksomhet. Hun velger ganske enkelt favorittplassen sin, betrakter verden og lar alle andre bli kjent med henne på hennes egne premisser.",

      backIssue: "← Tilbake til Utgave 01",

      introKicker: "Stille selvsikkerhet ♥",
      introTitle: "Myk<br>utenpå.",
      introText: "En britisk korthår med vakre gylne øyne, myk grå pels og en helt egen personlighet. Jessica har ingen hast. Først observerer hun. Så bestemmer hun seg.",

      profileKicker: "Jessicas profil",
      profileTitle: "ROLIG.<br>NYSGJERRIG.<br>HELT SEG SELV.",
      profileSub: "Britisk korthår · profesjonell observatør",

      name: "<strong>Navn:</strong> Jessica",
      breed: "<strong>Rase:</strong> britisk korthår",
      eyes: "<strong>Øyne:</strong> varmt gylne",
      coat: "<strong>Pels:</strong> myk, plysjaktig og grå",
      personality: "<strong>Personlighet:</strong> rolig, observant og selvstendig",
      favourite: "<strong>Favorittsted:</strong> et behagelig sted med god utsikt",
      afternoon: "<strong>Perfekt ettermiddag:</strong> solskinn, ro og favorittstolen hennes",
      feature: "<strong>Spesiell egenskap:</strong> stille selvsikkerhet",

      noHurry: "Ingen grunn til å skynde seg.",
      hasTime: "JESSICA HAR TID.",

      observerKicker: "Favoritt-TV-en hennes",
      observerTitle: "VERDEN<br>UTENFOR",
      observerText: "Et vindu kan være et helt univers. Mennesker som går forbi. Blader som beveger seg. Fugler som dukker opp og forsvinner. Lyset som forandrer seg gjennom dagen. Jessica kan betrakte alt uten noen gang å måtte være midt i begivenhetene.",

      homeKicker: "Hjemmet er et fantastisk sted ♥",
      homeTitle: "KUNSTEN<br>Å HA DET KOMFORTABELT",
      home1: "Noen dyr ønsker at hver dag skal bli en ekspedisjon.",
      home2: "Jessica forstår en annen form for luksus.",
      home3: "En myk seng.",
      home4: "En varm plass i solen.",
      home5: "Et kjent vindu.",
      home6: "En fredelig hage.",
      home7: "Et sted hvor hun kan strekke seg ut, finne seg til rette og bare observere.",
      home8: "Det er ingenting kjedelig ved å være hjemme når du vet nøyaktig hvordan du skal nyte det.",

      pullquote: "Komfort er ikke latskap.<br>Det er en kunst.",

      momentsKicker: "Jessica-øyeblikk",
      momentsTitle: "HENNES FAVORITT<br>SLAGS DAG",

      softPlace: "Mykt sted ♥",
      softPlaceText: "Det perfekte stedet for å gjøre absolutt ingenting.",

      windowWatch: "Se ut av vinduet",
      windowWatchText: "Det finnes alltid noe som er verdt å legge merke til.",

      gardenTime: "Tid i hagen 🌿",
      gardenTimeText: "Frisk luft, solskinn og ingen unødvendig hast.",

      rulesKicker: "Hennes regler",
      rulesTitle: "KJÆRLIGHET<br>PÅ HENNES PREMISSER",

      tag1: "👀 Observant",
      tag2: "♥ Mild",
      tag3: "☁️ Myk",
      tag4: "🪟 Nysgjerrig",
      tag5: "🌿 Fredelig",
      tag6: "⭐ Selvstendig",

      rules1: "Selvstendighet betyr ikke mangel på kjærlighet.",
      rules2: "Det betyr ganske enkelt å vite hva man vil.",
      rules3: "Jessica trenger ikke å følge alle fra rom til rom.",
      rules4: "Hun trenger ikke å være sentrum for hvert øyeblikk.",
      rules5: "Hun velger selv når hun vil komme nærmere.",
      rules6: "Hun velger selv når hun vil bli.",
      rules7: "Og på en eller annen måte gjør det øyeblikket når hun velger deg enda mer spesielt.",

      slowKicker: "En rolig ettermiddag",
      slowTitle: "SOLSKINN.<br>STILLHET.<br>PERFEKT.",
      slowText: "Gi Jessica en komfortabel stol, litt solskinn og nok ro til å nyte begge deler, så trenger hun nesten ingenting mer.",

      ritualKicker: "Små ritualer",
      ritualTitle: "SMÅ ØYEBLIKK<br>BETYR NOE",
      ritual1: "Hver personlighet har sine små ritualer.",
      ritual2: "Stedene vi vender tilbake til.",
      ritual3: "Tingene som får oss til å stoppe opp.",
      ritual4: "De små øyeblikkene som blir en del av en vanlig dag.",
      ritual5: "For Jessica kan selv en enkel pause ved favorittskålen bli et portrett av fullstendig konsentrasjon.",

      finalKicker: "Forsidestjerne 03",
      finalTitle: "STILLE<br>UFORGLEMMELIG",
      final1: "Dette er Jessica.",
      final2: "En britisk korthår.",
      final3: "Myk grå pels.",
      final4: "Gylne øyne.",
      final5: "Et rolig temperament.",
      final6: "Et talent for å finne det mest komfortable stedet i rommet.",
      final7: "Nysgjerrig nok til å observere alt.",
      final8: "Selvstendig nok til ikke å måtte delta i alt.",
      final9: "Mild, observant og helt komfortabel med å være akkurat den hun er.",
      final10: "Ikke alle forsidestjerner trenger å lage lyd.",
      final11: "Noen ser bare på deg med gylne øyne og blir umulige å glemme.",

      signature: "Møt",
      tagline: "Én verden. Hvert kjæledyr.",
      issueLink: "← Utgave 01",
      homeLink: "Hjem"
    },

    /* =====================================================
       FINNISH
       ===================================================== */

    fi: {
      heroKicker: "PETS & DOGUE · NUMERO 01<br>KANSITARINA",
      meet: "Tutustu",
      heroSub: "Hellä<br>brittiläinen lady.",
      heroText: "Rauhallinen, tarkkaavainen ja ihanan itsenäinen Jessica on kissa, jonka ei koskaan tarvitse vaatia huomiota. Hän vain valitsee lempipaikkansa, tarkkailee maailmaa ja antaa muiden tutustua häneen hänen omilla ehdoillaan.",

      backIssue: "← Takaisin numeroon 01",

      introKicker: "Hiljainen itsevarmuus ♥",
      introTitle: "Pehmeä<br>ulkoa.",
      introText: "Brittiläinen lyhytkarva, jolla on kauniit kultaiset silmät, pehmeä harmaa turkki ja täysin omanlaisensa luonne. Jessica ei kiirehdi. Ensin hän tarkkailee. Sitten hän päättää.",

      profileKicker: "Jessican profiili",
      profileTitle: "RAUHALLINEN.<br>UTELIAS.<br>TÄYSIN OMA ITSENSÄ.",
      profileSub: "Brittiläinen lyhytkarva · ammattimainen tarkkailija",

      name: "<strong>Nimi:</strong> Jessica",
      breed: "<strong>Rotu:</strong> brittiläinen lyhytkarva",
      eyes: "<strong>Silmät:</strong> lämpimän kultaiset",
      coat: "<strong>Turkki:</strong> pehmeä, muhkea ja harmaa",
      personality: "<strong>Luonne:</strong> rauhallinen, tarkkaavainen ja itsenäinen",
      favourite: "<strong>Lempipaikka:</strong> mukava paikka, josta on hyvä näkymä",
      afternoon: "<strong>Täydellinen iltapäivä:</strong> auringonpaiste, rauha ja hänen lempituolinsa",
      feature: "<strong>Erityispiirre:</strong> hiljainen itsevarmuus",

      noHurry: "Ei ole mitään kiirettä.",
      hasTime: "JESSICALLA ON AIKAA.",

      observerKicker: "Hänen lempitelevisionsa",
      observerTitle: "MAAILMA<br>ULKONA",
      observerText: "Ikkuna voi olla kokonainen maailmankaikkeus. Ohikulkevia ihmisiä. Liikkuvia lehtiä. Lintuja, jotka ilmestyvät ja katoavat. Päivän mittaan muuttuva valo. Jessica voi tarkkailla kaikkea ilman tarvetta olla tapahtumien keskellä.",

      homeKicker: "Koti on ihana paikka ♥",
      homeTitle: "MUKAVUUDEN<br>TAITO",
      home1: "Jotkut eläimet haluavat jokaisen päivän muuttuvan seikkailuksi.",
      home2: "Jessica ymmärtää toisenlaisen ylellisyyden.",
      home3: "Pehmeä peti.",
      home4: "Lämmin paikka auringossa.",
      home5: "Tuttu ikkuna.",
      home6: "Rauhallinen puutarha.",
      home7: "Paikka, jossa hän voi venytellä, asettua mukavasti ja vain tarkkailla.",
      home8: "Kotona olemisessa ei ole mitään tylsää, kun tietää tarkalleen, kuinka siitä nautitaan.",

      pullquote: "Mukavuus ei ole laiskuutta.<br>Se on taito.",

      momentsKicker: "Jessican hetkiä",
      momentsTitle: "HÄNEN LEMPIPÄIVÄNSÄ<br>TYYLI",

      softPlace: "Pehmeä paikka ♥",
      softPlaceText: "Täydellinen paikka olla tekemättä yhtään mitään.",

      windowWatch: "Ikkunasta katselu",
      windowWatchText: "Aina löytyy jotakin huomaamisen arvoista.",

      gardenTime: "Aikaa puutarhassa 🌿",
      gardenTimeText: "Raikasta ilmaa, auringonpaistetta eikä turhaa kiirettä.",

      rulesKicker: "Hänen sääntönsä",
      rulesTitle: "HELLEYS<br>HÄNEN EHDOILLAAN",

      tag1: "👀 Tarkkaavainen",
      tag2: "♥ Hellä",
      tag3: "☁️ Pehmeä",
      tag4: "🪟 Utelias",
      tag5: "🌿 Rauhallinen",
      tag6: "⭐ Itsenäinen",

      rules1: "Itsenäisyys ei tarkoita hellyyden puutetta.",
      rules2: "Se tarkoittaa yksinkertaisesti sitä, että tietää mitä haluaa.",
      rules3: "Jessican ei tarvitse seurata kaikkia huoneesta toiseen.",
      rules4: "Hänen ei tarvitse olla jokaisen hetken keskipiste.",
      rules5: "Hän valitsee itse, milloin tulee lähemmäksi.",
      rules6: "Hän valitsee itse, milloin jää.",
      rules7: "Ja juuri siksi hetki, jolloin hän valitsee sinut, tuntuu vieläkin erityisemmältä.",

      slowKicker: "Rauhallinen iltapäivä",
      slowTitle: "AURINKO.<br>HILJAISUUS.<br>TÄYDELLISTÄ.",
      slowText: "Anna Jessicalle mukava tuoli, hieman auringonpaistetta ja tarpeeksi rauhaa nauttia molemmista, eikä hän juuri muuta tarvitse.",

      ritualKicker: "Pienet rituaalit",
      ritualTitle: "PIENILLÄ HETKILLÄ<br>ON MERKITYSTÄ",
      ritual1: "Jokaisella persoonalla on omat pienet rituaalinsa.",
      ritual2: "Paikat, joihin palaamme.",
      ritual3: "Asiat, jotka saavat meidät pysähtymään.",
      ritual4: "Pienet hetket, joista tulee osa tavallista päivää.",
      ritual5: "Jessicalle jopa lyhyt pysähdys lempikupin äärellä voi muuttua täydellisen keskittymisen muotokuvaksi.",

      finalKicker: "Kansitähti 03",
      finalTitle: "HILJAISESTI<br>UNOHTUMATON",
      final1: "Tässä on Jessica.",
      final2: "Brittiläinen lyhytkarva.",
      final3: "Pehmeä harmaa turkki.",
      final4: "Kultaiset silmät.",
      final5: "Rauhallinen luonne.",
      final6: "Taito löytää huoneen mukavin paikka.",
      final7: "Tarpeeksi utelias tarkkailemaan kaikkea.",
      final8: "Tarpeeksi itsenäinen ollakseen osallistumatta kaikkeen.",
      final9: "Hellä, tarkkaavainen ja täysin tyytyväinen olemaan juuri sellainen kuin hän on.",
      final10: "Kaikkien kansitähtien ei tarvitse pitää ääntä.",
      final11: "Jotkut vain katsovat sinua kultaisilla silmillään ja muuttuvat mahdottomiksi unohtaa.",

      signature: "Tutustu",
      tagline: "Yksi maailma. Jokainen lemmikki.",
      issueLink: "← Numero 01",
      homeLink: "Etusivu"
    },

    /* =====================================================
       HUNGARIAN
       ===================================================== */

    hu: {
      heroKicker: "PETS & DOGUE · 01. KIADÁS<br>CÍMLAPTÖRTÉNET",
      meet: "Ismerd meg",
      heroSub: "A szelíd<br>brit hölgyet.",
      heroText: "Nyugodt, figyelmes és csodálatosan független Jessica olyan macska, akinek soha nem kell követelnie a figyelmet. Egyszerűen kiválasztja kedvenc helyét, figyeli a világot, és hagyja, hogy mások az ő feltételei szerint ismerjék meg.",

      backIssue: "← Vissza a 01. kiadáshoz",

      introKicker: "Csendes magabiztosság ♥",
      introTitle: "Kívül<br>puha.",
      introText: "Egy brit rövidszőrű gyönyörű aranyszínű szemekkel, puha szürke bundával és teljesen egyedi személyiséggel. Jessica nem siet. Először megfigyel. Aztán dönt.",

      profileKicker: "Jessica profilja",
      profileTitle: "NYUGODT.<br>KÍVÁNCSI.<br>TELJESEN ÖNMAGA.",
      profileSub: "Brit rövidszőrű · hivatásos megfigyelő",

      name: "<strong>Név:</strong> Jessica",
      breed: "<strong>Fajta:</strong> brit rövidszőrű",
      eyes: "<strong>Szemek:</strong> meleg aranyszínűek",
      coat: "<strong>Bunda:</strong> puha, plüssös és szürke",
      personality: "<strong>Személyiség:</strong> nyugodt, figyelmes és független",
      favourite: "<strong>Kedvenc hely:</strong> valahol kényelmesen, jó kilátással",
      afternoon: "<strong>Tökéletes délután:</strong> napsütés, nyugalom és a kedvenc fotelje",
      feature: "<strong>Különleges tulajdonság:</strong> csendes magabiztosság",

      noHurry: "Semmi szükség sietni.",
      hasTime: "JESSICÁNAK VAN IDEJE.",

      observerKicker: "A kedvenc televíziója",
      observerTitle: "A KÜLSŐ<br>VILÁG",
      observerText: "Egy ablak egy egész univerzum lehet. Elhaladó emberek. Mozgó levelek. Felbukkanó és eltűnő madarak. A nap folyamán változó fény. Jessica mindezt úgy figyelheti, hogy soha nem kell az események középpontjában lennie.",

      homeKicker: "Az otthon csodálatos hely ♥",
      homeTitle: "A KÉNYELEM<br>MŰVÉSZETE",
      home1: "Néhány állat azt szeretné, hogy minden nap kalanddá váljon.",
      home2: "Jessica a luxus egy másik formáját érti.",
      home3: "Egy puha ágy.",
      home4: "Egy meleg napsütötte hely.",
      home5: "Egy ismerős ablak.",
      home6: "Egy békés kert.",
      home7: "Egy hely, ahol kinyújtózhat, kényelmesen elhelyezkedhet és egyszerűen figyelhet.",
      home8: "Az otthonlétben nincs semmi unalmas, ha pontosan tudod, hogyan élvezd.",

      pullquote: "A kényelem nem lustaság.<br>Hanem művészet.",

      momentsKicker: "Jessica pillanatai",
      momentsTitle: "A KEDVENC<br>NAPJA",

      softPlace: "Puha hely ♥",
      softPlaceText: "A tökéletes hely arra, hogy egyáltalán semmit se csináljon.",

      windowWatch: "Nézelődés az ablakból",
      windowWatchText: "Mindig van valami, amit érdemes észrevenni.",

      gardenTime: "Idő a kertben 🌿",
      gardenTimeText: "Friss levegő, napsütés és semmi felesleges sietség.",

      rulesKicker: "Az ő szabályai",
      rulesTitle: "SZERETET<br>AZ Ő FELTÉTELEIVEL",

      tag1: "👀 Figyelmes",
      tag2: "♥ Szelíd",
      tag3: "☁️ Puha",
      tag4: "🪟 Kíváncsi",
      tag5: "🌿 Békés",
      tag6: "⭐ Független",

      rules1: "A függetlenség nem jelenti a szeretet hiányát.",
      rules2: "Egyszerűen azt jelenti, hogy tudod, mit akarsz.",
      rules3: "Jessicának nem kell mindenkit szobáról szobára követnie.",
      rules4: "Nem kell minden pillanat középpontjában lennie.",
      rules5: "Ő választja meg, mikor jön közelebb.",
      rules6: "Ő választja meg, mikor marad.",
      rules7: "És valahogy ettől még különlegesebbnek tűnik az a pillanat, amikor téged választ.",

      slowKicker: "Egy nyugodt délután",
      slowTitle: "NAPFÉNY.<br>CSEND.<br>TÖKÉLETES.",
      slowText: "Adj Jessicának egy kényelmes fotelt, egy kis napsütést és elég nyugalmat ahhoz, hogy mindkettőt élvezze, és szinte semmi másra nincs szüksége.",

      ritualKicker: "Apró rituálék",
      ritualTitle: "AZ APRÓ PILLANATOK<br>SZÁMÍTANAK",
      ritual1: "Minden személyiségnek megvannak a maga kis rituáléi.",
      ritual2: "A helyek, ahová visszatérünk.",
      ritual3: "A dolgok, amelyek megállásra késztetnek.",
      ritual4: "Az apró pillanatok, amelyek egy hétköznapi nap részévé válnak.",
      ritual5: "Jessica számára még egy egyszerű megállás a kedvenc tálkája mellett is a teljes koncentráció portréjává válhat.",

      finalKicker: "Címlapsztár 03",
      finalTitle: "CSENDESEN<br>FELEJTHETETLEN",
      final1: "Ő Jessica.",
      final2: "Egy brit rövidszőrű.",
      final3: "Puha szürke bunda.",
      final4: "Aranyszínű szemek.",
      final5: "Nyugodt természet.",
      final6: "Tehetség ahhoz, hogy megtalálja a szoba legkényelmesebb helyét.",
      final7: "Elég kíváncsi ahhoz, hogy mindent megfigyeljen.",
      final8: "Elég független ahhoz, hogy ne kelljen mindenben részt vennie.",
      final9: "Szelíd, figyelmes és teljesen jól érzi magát pontosan olyannak, amilyen.",
      final10: "Nem minden címlapsztárnak kell zajt csapnia.",
      final11: "Néhányan egyszerűen rád néznek aranyszínű szemükkel, és lehetetlenné válik elfelejteni őket.",

      signature: "Ismerd meg",
      tagline: "Egy világ. Minden kisállat.",
      issueLink: "← 01. kiadás",
      homeLink: "Főoldal"
    },

    /* =====================================================
       ARABIC — RTL
       ===================================================== */

    ar: {
      heroKicker: "PETS & DOGUE · العدد 01<br>قصة الغلاف",
      meet: "تعرّفوا على",
      heroSub: "السيدة البريطانية<br>الرقيقة.",
      heroText: "هادئة، شديدة الملاحظة ومستقلة بطريقتها الرائعة، Jessica هي من تلك القطط التي لا تحتاج أبداً إلى المطالبة بالاهتمام. تختار ببساطة مكانها المفضل، تراقب العالم وتدع الآخرين يكتشفونها وفق شروطها الخاصة.",

      backIssue: "العودة إلى العدد 01 ←",

      introKicker: "ثقة هادئة ♥",
      introTitle: "ناعمة<br>من الخارج.",
      introText: "قطة بريطانية قصيرة الشعر ذات عينين ذهبيتين جميلتين وفراء رمادي ناعم وشخصية خاصة بها تماماً. Jessica لا تتعجل. تراقب أولاً. ثم تقرر.",

      profileKicker: "ملف Jessica",
      profileTitle: "هادئة.<br>فضولية.<br>نفسها تماماً.",
      profileSub: "بريطانية قصيرة الشعر · مراقبة محترفة",

      name: "<strong>الاسم:</strong> Jessica",
      breed: "<strong>السلالة:</strong> بريطانية قصيرة الشعر",
      eyes: "<strong>العينان:</strong> ذهبيتان دافئتان",
      coat: "<strong>الفراء:</strong> ناعم وكثيف ورمادي",
      personality: "<strong>الشخصية:</strong> هادئة، ملاحظة ومستقلة",
      favourite: "<strong>المكان المفضل:</strong> مكان مريح بإطلالة جميلة",
      afternoon: "<strong>فترة بعد الظهر المثالية:</strong> أشعة الشمس والهدوء وكرسيها المفضل",
      feature: "<strong>الميزة الخاصة:</strong> الثقة الهادئة",

      noHurry: "لا داعي للعجلة.",
      hasTime: "لدى JESSICA متسع من الوقت.",

      observerKicker: "تلفازها المفضل",
      observerTitle: "العالم<br>في الخارج",
      observerText: "يمكن للنافذة أن تكون عالماً كاملاً. أشخاص يمرون. أوراق تتحرك. طيور تظهر وتختفي. ضوء يتغير طوال اليوم. تستطيع Jessica مراقبة كل ذلك من دون أن تحتاج إلى أن تكون في وسط الأحداث.",

      homeKicker: "المنزل مكان رائع ♥",
      homeTitle: "فن<br>الراحة",
      home1: "بعض الحيوانات تريد أن يتحول كل يوم إلى مغامرة.",
      home2: "أما Jessica فتفهم نوعاً آخر من الرفاهية.",
      home3: "سرير ناعم.",
      home4: "بقعة دافئة من أشعة الشمس.",
      home5: "نافذة مألوفة.",
      home6: "حديقة هادئة.",
      home7: "مكان تستطيع فيه التمدد والاستقرار براحة ومجرد المراقبة.",
      home8: "لا يوجد شيء ممل في البقاء في المنزل عندما تعرف تماماً كيف تستمتع به.",

      pullquote: "الراحة ليست كسلاً.<br>إنها فن.",

      momentsKicker: "لحظات Jessica",
      momentsTitle: "نوع يومها<br>المفضل",

      softPlace: "مكان ناعم ♥",
      softPlaceText: "المكان المثالي لعدم فعل أي شيء على الإطلاق.",

      windowWatch: "مراقبة النافذة",
      windowWatchText: "هناك دائماً شيء يستحق الملاحظة.",

      gardenTime: "وقت الحديقة 🌿",
      gardenTimeText: "هواء نقي وأشعة شمس ومن دون أي عجلة غير ضرورية.",

      rulesKicker: "قواعدها",
      rulesTitle: "المودة<br>بشروطها",

      tag1: "👀 ملاحِظة",
      tag2: "♥ رقيقة",
      tag3: "☁️ ناعمة",
      tag4: "🪟 فضولية",
      tag5: "🌿 هادئة",
      tag6: "⭐ مستقلة",

      rules1: "الاستقلال لا يعني غياب المودة.",
      rules2: "إنه يعني ببساطة أن تعرف ما تريده.",
      rules3: "لا تحتاج Jessica إلى اتباع الجميع من غرفة إلى أخرى.",
      rules4: "ولا تحتاج إلى أن تكون محور كل لحظة.",
      rules5: "هي التي تختار متى تقترب.",
      rules6: "وهي التي تختار متى تبقى.",
      rules7: "ولهذا بطريقة ما تصبح اللحظة التي تختارك فيها أكثر تميزاً.",

      slowKicker: "بعد ظهر هادئ",
      slowTitle: "شمس.<br>صمت.<br>مثالي.",
      slowText: "امنح Jessica كرسياً مريحاً وقليلاً من أشعة الشمس وما يكفي من الهدوء للاستمتاع بهما، ولن تحتاج تقريباً إلى أي شيء آخر.",

      ritualKicker: "طقوس صغيرة",
      ritualTitle: "اللحظات الصغيرة<br>مهمة",
      ritual1: "لكل شخصية طقوسها الصغيرة.",
      ritual2: "الأماكن التي نعود إليها.",
      ritual3: "الأشياء التي تجعلنا نتوقف.",
      ritual4: "اللحظات الصغيرة التي تصبح جزءاً من يوم عادي.",
      ritual5: "بالنسبة إلى Jessica، حتى التوقف البسيط بجوار وعائها المفضل يمكن أن يصبح صورة للتركيز الكامل.",

      finalKicker: "نجمة الغلاف 03",
      finalTitle: "هادئة<br>ولا تُنسى",
      final1: "هذه هي Jessica.",
      final2: "بريطانية قصيرة الشعر.",
      final3: "فراء رمادي ناعم.",
      final4: "عينان ذهبيتان.",
      final5: "طبيعة هادئة.",
      final6: "موهبة في العثور على أكثر مكان مريح في الغرفة.",
      final7: "فضولية بما يكفي لمراقبة كل شيء.",
      final8: "ومستقلة بما يكفي لعدم الحاجة إلى المشاركة في كل شيء.",
      final9: "رقيقة، ملاحِظة ومرتاحة تماماً لأن تكون كما هي بالضبط.",
      final10: "ليس على كل نجمة غلاف أن تُحدث ضجيجاً.",
      final11: "بعضها ينظر إليك ببساطة بعينين ذهبيتين ويصبح من المستحيل نسيانه.",

      signature: "تعرّفوا على",
      tagline: "عالم واحد. كل حيوان أليف.",
      issueLink: "العدد 01 ←",
      homeLink: "الرئيسية"
    },

    /* =====================================================
       HINDI
       ===================================================== */

    hi: {
      heroKicker: "PETS & DOGUE · अंक 01<br>कवर स्टोरी",
      meet: "मिलिए",
      heroSub: "एक सौम्य<br>ब्रिटिश लेडी से।",
      heroText: "शांत, बेहद चौकस और खूबसूरती से स्वतंत्र Jessica ऐसी बिल्ली है जिसे ध्यान पाने के लिए कभी कुछ माँगना नहीं पड़ता। वह बस अपनी पसंदीदा जगह चुनती है, दुनिया को देखती है और बाकी सभी को अपनी शर्तों पर उसे जानने देती है।",

      backIssue: "← अंक 01 पर वापस जाएँ",

      introKicker: "शांत आत्मविश्वास ♥",
      introTitle: "बाहर से<br>नरम।",
      introText: "खूबसूरत सुनहरी आँखों, मुलायम धूसर फर और बिल्कुल अपने अंदाज़ वाली British Shorthair। Jessica जल्दी नहीं करती। पहले वह देखती है। फिर फैसला करती है।",

      profileKicker: "Jessica की प्रोफ़ाइल",
      profileTitle: "शांत।<br>जिज्ञासु।<br>पूरी तरह खुद।",
      profileSub: "British Shorthair · पेशेवर पर्यवेक्षक",

      name: "<strong>नाम:</strong> Jessica",
      breed: "<strong>नस्ल:</strong> British Shorthair",
      eyes: "<strong>आँखें:</strong> गर्म सुनहरी",
      coat: "<strong>फर:</strong> मुलायम, घना और धूसर",
      personality: "<strong>स्वभाव:</strong> शांत, चौकस और स्वतंत्र",
      favourite: "<strong>पसंदीदा जगह:</strong> कोई आरामदायक जगह जहाँ से अच्छा नज़ारा दिखे",
      afternoon: "<strong>परफेक्ट दोपहर:</strong> धूप, शांति और उसकी पसंदीदा कुर्सी",
      feature: "<strong>खासियत:</strong> शांत आत्मविश्वास",

      noHurry: "जल्दी करने की कोई ज़रूरत नहीं।",
      hasTime: "JESSICA के पास समय है।",

      observerKicker: "उसका पसंदीदा टेलीविज़न",
      observerTitle: "बाहर की<br>दुनिया",
      observerText: "एक खिड़की अपने आप में पूरा संसार हो सकती है। गुजरते लोग। हिलते पत्ते। आते-जाते पक्षी। दिन भर बदलती रोशनी। Jessica यह सब देख सकती है, बिना हर घटना के बीच में रहने की ज़रूरत महसूस किए।",

      homeKicker: "घर एक बहुत अच्छी जगह है ♥",
      homeTitle: "आराम की<br>कला",
      home1: "कुछ जानवर चाहते हैं कि हर दिन एक नई यात्रा बन जाए।",
      home2: "Jessica एक अलग तरह की विलासिता समझती है।",
      home3: "एक मुलायम बिस्तर।",
      home4: "धूप की गर्म जगह।",
      home5: "एक जानी-पहचानी खिड़की।",
      home6: "एक शांत बगीचा।",
      home7: "एक ऐसी जगह जहाँ वह शरीर फैला सके, आराम से बैठ सके और बस दुनिया देख सके।",
      home8: "जब आपको पता हो कि घर का आनंद कैसे लेना है, तो घर में रहने में कुछ भी उबाऊ नहीं है।",

      pullquote: "आराम आलस्य नहीं है।<br>यह एक कला है।",

      momentsKicker: "Jessica के पल",
      momentsTitle: "उसका पसंदीदा<br>दिन",

      softPlace: "मुलायम जगह ♥",
      softPlaceText: "बिल्कुल कुछ न करने के लिए एकदम सही जगह।",

      windowWatch: "खिड़की से देखना",
      windowWatchText: "हमेशा कुछ न कुछ ऐसा होता है जिस पर ध्यान दिया जा सके।",

      gardenTime: "बगीचे का समय 🌿",
      gardenTimeText: "ताज़ी हवा, धूप और किसी भी तरह की बेवजह जल्दी नहीं।",

      rulesKicker: "उसके नियम",
      rulesTitle: "प्यार<br>उसकी शर्तों पर",

      tag1: "👀 चौकस",
      tag2: "♥ सौम्य",
      tag3: "☁️ मुलायम",
      tag4: "🪟 जिज्ञासु",
      tag5: "🌿 शांत",
      tag6: "⭐ स्वतंत्र",

      rules1: "स्वतंत्रता का मतलब प्यार की कमी नहीं है।",
      rules2: "इसका मतलब बस यह जानना है कि आप क्या चाहते हैं।",
      rules3: "Jessica को हर किसी के पीछे एक कमरे से दूसरे कमरे तक जाने की ज़रूरत नहीं है।",
      rules4: "उसे हर पल का केंद्र बनने की ज़रूरत नहीं है।",
      rules5: "वह खुद चुनती है कि कब पास आना है।",
      rules6: "वह खुद चुनती है कि कब रुकना है।",
      rules7: "और शायद इसी वजह से वह पल और भी खास लगता है जब वह आपको चुनती है।",

      slowKicker: "एक धीमी दोपहर",
      slowTitle: "धूप।<br>खामोशी।<br>परफेक्ट।",
      slowText: "Jessica को एक आरामदायक कुर्सी, थोड़ी धूप और दोनों का आनंद लेने के लिए पर्याप्त शांति दे दीजिए — उसे लगभग और कुछ नहीं चाहिए।",

      ritualKicker: "छोटी रस्में",
      ritualTitle: "छोटे पल<br>मायने रखते हैं",
      ritual1: "हर व्यक्तित्व की अपनी छोटी-छोटी आदतें होती हैं।",
      ritual2: "वे जगहें जहाँ हम बार-बार लौटते हैं।",
      ritual3: "वे चीज़ें जो हमें रुकने पर मजबूर करती हैं।",
      ritual4: "वे छोटे पल जो एक सामान्य दिन का हिस्सा बन जाते हैं।",
      ritual5: "Jessica के लिए अपनी पसंदीदा कटोरी के पास एक साधारण सा ठहराव भी पूरी एकाग्रता की तस्वीर बन सकता है।",

      finalKicker: "कवर स्टार 03",
      finalTitle: "शांत लेकिन<br>अविस्मरणीय",
      final1: "तो यह है Jessica।",
      final2: "एक British Shorthair।",
      final3: "मुलायम धूसर फर।",
      final4: "सुनहरी आँखें।",
      final5: "शांत स्वभाव।",
      final6: "कमरे की सबसे आरामदायक जगह खोज लेने की प्रतिभा।",
      final7: "इतनी जिज्ञासु कि हर चीज़ को देखे।",
      final8: "इतनी स्वतंत्र कि हर चीज़ में शामिल होने की ज़रूरत न महसूस करे।",
      final9: "सौम्य, चौकस और बिल्कुल वैसी ही रहने में सहज जैसी वह है।",
      final10: "हर कवर स्टार को शोर करने की ज़रूरत नहीं होती।",
      final11: "कुछ बस अपनी सुनहरी आँखों से आपको देखते हैं और फिर उन्हें भूलना असंभव हो जाता है।",

      signature: "मिलिए",
      tagline: "एक दुनिया। हर पालतू।",
      issueLink: "← अंक 01",
      homeLink: "होम"
    }  };

  /* =========================================================
     PETS & DOGUE — JESSICA LANGUAGE ENGINE
     ---------------------------------------------------------
     IMPORTANT:
     - Uses the same persistent language as the global site.
     - Reacts immediately when language changes in the header.
     - No page reload is required.
     - Hindi always resolves to "hi".
     - Turkish always resolves to "tr".
     - Arabic enables RTL.
     - <br> inside translations is rendered as HTML.
     - Brand / pet name "Jessica" is never translated.
     ========================================================= */

    const LANGUAGE_EVENT_NAMES = [
    "petsdogue:languagechange",
    "petsdogue:setlanguage",
    "pets-dogue-language-change",
    "petsDogueLanguageChange",
    "pets_dogue_language_change",
    "languagechange",
    "language-change"
  ];

  let currentLanguage = null;
  let observer = null;
  let applyingLanguage = false;
  let scheduledApply = 0;

  /* =========================================================
     LANGUAGE NORMALISATION
     ========================================================= */

  function normalizeLanguage(value) {
    if (value === null || value === undefined) {
      return "";
    }

    let lang = String(value)
      .trim()
      .toLowerCase();

    if (!lang) {
      return "";
    }

    /*
      Accept values such as:
      en-GB
      pt-BR
      uk_UA
      HI
    */
    lang = lang.replace(/_/g, "-");

    /*
      First check exact alias.
    */
    if (ALIASES[lang]) {
      lang = ALIASES[lang];
    }

    /*
      Then reduce locale to its base language.
    */
    if (lang.indexOf("-") !== -1) {
      lang = lang.split("-")[0];
    }

    /*
      Check aliases again after locale reduction.
    */
    if (ALIASES[lang]) {
      lang = ALIASES[lang];
    }

    return SUPPORTED.includes(lang) ? lang : "";
  }

  /* =========================================================
     SAFE LOCAL STORAGE
     ========================================================= */

  function readStoredLanguage() {
    try {
      return normalizeLanguage(
        window.localStorage.getItem(STORE_KEY)
      );
    } catch (error) {
      return "";
    }
  }

  function saveStoredLanguage(lang) {
    try {
      window.localStorage.setItem(STORE_KEY, lang);
    } catch (error) {
      /*
        Storage can be unavailable in private/restricted
        browser environments. The page must still work.
      */
    }
  }

  /* =========================================================
     LANGUAGE FROM URL
     ========================================================= */

  function getLanguageFromUrl() {
    try {
      const url = new URL(window.location.href);

      const candidates = [
        url.searchParams.get("lang"),
        url.searchParams.get("language"),
        url.searchParams.get("locale")
      ];

      for (const candidate of candidates) {
        const lang = normalizeLanguage(candidate);

        if (lang) {
          return lang;
        }
      }
    } catch (error) {
      /*
        Ignore malformed URL and continue with other sources.
      */
    }

    return "";
  }

  /* =========================================================
     LANGUAGE FROM DOM
     ========================================================= */

  function languageFromElement(element) {
    if (!element) {
      return "";
    }

    const candidates = [
      element.value,
      element.getAttribute &&
        element.getAttribute("data-lang"),
      element.getAttribute &&
        element.getAttribute("data-language"),
      element.getAttribute &&
        element.getAttribute("lang"),
      element.dataset &&
        element.dataset.lang,
      element.dataset &&
        element.dataset.language
    ];

    for (const candidate of candidates) {
      const lang = normalizeLanguage(candidate);

      if (lang) {
        return lang;
      }
    }

    return "";
  }

  function getLanguageFromControls() {
    const selectors = [
      "[data-language-select]",
      "[data-lang-select]",
      "#languageSelect",
      "#language-select",
      "#languageSelector",
      "#language-selector",
      "#langSelect",
      "#lang-select",
      "select[name='language']",
      "select[name='lang']",
      "[data-current-language]",
      "[data-current-lang]"
    ];

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);

      for (const element of elements) {
        const lang = languageFromElement(element);

        if (lang) {
          return lang;
        }
      }
    }

    return "";
  }

  function getLanguageFromDocument() {
    const htmlLang = normalizeLanguage(
      document.documentElement.getAttribute("lang")
    );

    if (htmlLang) {
      return htmlLang;
    }

    const bodyLang = document.body
      ? normalizeLanguage(
          document.body.getAttribute("lang")
        )
      : "";

    return bodyLang;
  }

  /* =========================================================
     RESOLVE CURRENT LANGUAGE
     ========================================================= */

  function resolveLanguage(preferredLanguage) {
    /*
      IMPORTANT:
      An explicitly supplied language always wins.
      This prevents Hindi from accidentally resolving
      to Turkish because of another stale DOM value.
    */
    const explicit = normalizeLanguage(preferredLanguage);

    if (explicit) {
      return explicit;
    }

    /*
      Persistent site language is the primary source.
      This keeps Jessica synchronized with Issue 01.
    */
    const stored = readStoredLanguage();

    if (stored) {
      return stored;
    }

    const fromUrl = getLanguageFromUrl();

    if (fromUrl) {
      return fromUrl;
    }

    const fromControls = getLanguageFromControls();

    if (fromControls) {
      return fromControls;
    }

    const fromDocument = getLanguageFromDocument();

    if (fromDocument) {
      return fromDocument;
    }

    return "en";
  }

  /* =========================================================
     FIND TRANSLATION NODES
     ========================================================= */

  function getTranslationKey(element) {
    if (!element) {
      return "";
    }

    return (
      element.getAttribute("data-jessica-i18n") ||
      element.getAttribute("data-i18n-jessica") ||
      element.getAttribute("data-story-i18n") ||
      element.getAttribute("data-i18n") ||
      ""
    ).trim();
  }

    function getTranslationElements() {
    const root = document.querySelector("#pdJessicaStory");

    if (!root) {
      return [];
    }

    return root.querySelectorAll(
      [
        "[data-jessica-i18n]",
        "[data-i18n-jessica]",
        "[data-story-i18n]",
        "[data-i18n]"
      ].join(",")
    );
  }

  /* =========================================================
     TRANSLATE ONE ELEMENT
     ========================================================= */

  function translateElement(element, dictionary) {
    const key = getTranslationKey(element);

    if (!key) {
      return;
    }

    /*
      Only touch keys belonging to Jessica's dictionary.
      This is important because the global shell can also
      use data-i18n on the same page.
    */
    if (!Object.prototype.hasOwnProperty.call(dictionary, key)) {
      return;
    }

    const value = dictionary[key];

    if (value === null || value === undefined) {
      return;
    }

    /*
      Our approved translations intentionally contain
      <br> and <strong>, therefore innerHTML is required.
    */
        const template = document.createElement("template");
    template.innerHTML = String(value);

    if (element.innerHTML !== template.innerHTML) {
      element.innerHTML = template.innerHTML;
    }
  }

  /* =========================================================
     DOCUMENT LANGUAGE / RTL
     ========================================================= */

  function applyDocumentDirection(lang) {
    const isRTL = RTL.has(lang);

        if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }

    const direction = isRTL ? "rtl" : "ltr";

    if (document.documentElement.dir !== direction) {
      document.documentElement.dir = direction;
    }

    if (document.body) {
      document.body.setAttribute(
        "data-story-language",
        lang
      );

      document.body.setAttribute(
        "data-story-direction",
        isRTL ? "rtl" : "ltr"
      );

      document.body.classList.toggle(
        "jessica-rtl",
        isRTL
      );
    }
  }

  /* =========================================================
     TRANSLATE JESSICA STORY
     ========================================================= */

  function applyLanguage(requestedLanguage, options) {
    const settings = Object.assign(
      {
        save: true,
        dispatch: false,
        force: false
      },
      options || {}
    );

    const lang = resolveLanguage(requestedLanguage);
    const dictionary = T[lang] || T.en;

    if (
      !settings.force &&
      currentLanguage === lang
    ) {
      /*
        Even if language itself did not change, newly
        rendered story elements may need translation.
      */
      const elements = getTranslationElements();

      elements.forEach(function (element) {
        translateElement(element, dictionary);
      });

      applyDocumentDirection(lang);

      return lang;
    }

    applyingLanguage = true;

    try {
      currentLanguage = lang;

      if (settings.save) {
        saveStoredLanguage(lang);
      }

      applyDocumentDirection(lang);

      const elements = getTranslationElements();

      elements.forEach(function (element) {
        translateElement(element, dictionary);
      });

      /*
        Expose current story language for the page,
        debugging and integration with the global shell.
      */
      document.documentElement.setAttribute(
        "data-jessica-language",
        lang
      );

      if (document.body) {
        document.body.setAttribute(
          "data-jessica-language",
          lang
        );
      }
    } finally {
      applyingLanguage = false;
    }

    if (settings.dispatch) {
      dispatchJessicaLanguageEvent(lang);
    }

    return lang;
  }

  /* =========================================================
     CUSTOM EVENT
     ========================================================= */

  function dispatchJessicaLanguageEvent(lang) {
    try {
      window.dispatchEvent(
        new CustomEvent(
          "jessica-language-change",
          {
            detail: {
              language: lang,
              lang: lang
            }
          }
        )
      );
    } catch (error) {
      /*
        Old browser fallback is unnecessary for modern
        browsers, but failure must never break the story.
      */
    }
  }

  /* =========================================================
     LANGUAGE VALUE FROM EVENT
     ========================================================= */

  function languageFromEvent(event) {
    if (!event) {
      return "";
    }

    const detail = event.detail;

    if (typeof detail === "string") {
      return normalizeLanguage(detail);
    }

    if (
      detail &&
      typeof detail === "object"
    ) {
      const candidates = [
        detail.lang,
        detail.language,
        detail.locale,
        detail.code,
        detail.value
      ];

      for (const candidate of candidates) {
        const lang = normalizeLanguage(candidate);

        if (lang) {
          return lang;
        }
      }
    }

    const targetLanguage = languageFromElement(
      event.target
    );

    if (targetLanguage) {
      return targetLanguage;
    }

    return "";
  }

  /* =========================================================
     SCHEDULED APPLY
     ========================================================= */

  function scheduleApply(lang, options) {
    if (scheduledApply) {
      window.cancelAnimationFrame(scheduledApply);
    }

    scheduledApply = window.requestAnimationFrame(
      function () {
        scheduledApply = 0;

        applyLanguage(
          lang || undefined,
          options || {
            save: true,
            force: true
          }
        );
      }
    );
  }

  /* =========================================================
     LISTEN TO GLOBAL LANGUAGE EVENTS
     ========================================================= */

  function installLanguageEventListeners() {
    LANGUAGE_EVENT_NAMES.forEach(function (eventName) {
      window.addEventListener(
        eventName,
        function (event) {
          const lang = languageFromEvent(event);

          /*
            If the event explicitly tells us the language,
            use that exact value immediately.

            If not, wait until the global shell has updated
            localStorage / DOM and resolve it on next frame.
          */
          scheduleApply(
            lang || undefined,
            {
              save: true,
              force: true
            }
          );
        }
      );

      document.addEventListener(
        eventName,
        function (event) {
          const lang = languageFromEvent(event);

          scheduleApply(
            lang || undefined,
            {
              save: true,
              force: true
            }
          );
        }
      );
    });
  }

  /* =========================================================
     LISTEN TO LANGUAGE SELECTS / BUTTONS
     ========================================================= */

  function installControlListeners() {
    document.addEventListener(
      "change",
      function (event) {
        const target = event.target;

        if (!target) {
          return;
        }

        const looksLikeLanguageControl =
          target.matches &&
          target.matches(
            [
              "[data-language-select]",
              "[data-lang-select]",
              "#languageSelect",
              "#language-select",
              "#languageSelector",
              "#language-selector",
              "#langSelect",
              "#lang-select",
              "select[name='language']",
              "select[name='lang']"
            ].join(",")
          );

        if (!looksLikeLanguageControl) {
          return;
        }

        const lang = languageFromElement(target);

        if (!lang) {
          return;
        }

        /*
          Apply immediately. This is the key fix for:
          header changes language but Jessica remains
          in the previous language until navigation.
        */
        applyLanguage(
          lang,
          {
            save: true,
            dispatch: true,
            force: true
          }
        );
      },
      true
    );

    document.addEventListener(
      "click",
      function (event) {
        const target = event.target &&
          event.target.closest
          ? event.target.closest(
              [
                "[data-lang]",
                "[data-language]"
              ].join(",")
            )
          : null;

        if (!target) {
          return;
        }

        const lang = languageFromElement(target);

        if (!lang) {
          return;
        }

        /*
          Some menu implementations update the global
          language only after the click handler completes.
          Apply once now and once on the next frame.
        */
        applyLanguage(
          lang,
          {
            save: true,
            dispatch: true,
            force: true
          }
        );

        scheduleApply(
          lang,
          {
            save: true,
            force: true
          }
        );
      },
      true
    );
  }

  /* =========================================================
     STORAGE SYNCHRONISATION
     ========================================================= */

  function installStorageListener() {
    window.addEventListener(
      "storage",
      function (event) {
        if (event.key !== STORE_KEY) {
          return;
        }

        const lang = normalizeLanguage(
          event.newValue
        );

        if (!lang) {
          return;
        }

        applyLanguage(
          lang,
          {
            save: false,
            force: true
          }
        );
      }
    );
  }

  /* =========================================================
     DOM OBSERVER
     ---------------------------------------------------------
     The global header / side menu can be rebuilt dynamically.
     We watch for:
     - html lang changes
     - language-control changes
     - newly inserted Jessica story elements
     ========================================================= */

  function installObserver() {
    if (
      observer ||
      !document.documentElement ||
      typeof MutationObserver === "undefined"
    ) {
      return;
    }

    observer = new MutationObserver(
      function (mutations) {
        if (applyingLanguage) {
          return;
        }

        let needsApply = false;
        let detectedLanguage = "";

        for (const mutation of mutations) {
          if (
            mutation.type === "attributes"
          ) {
            const target = mutation.target;

            if (
              target === document.documentElement &&
              mutation.attributeName === "lang"
            ) {
              detectedLanguage = normalizeLanguage(
                document.documentElement.lang
              );

              if (detectedLanguage) {
                needsApply = true;
                break;
              }
            }

            if (
              mutation.attributeName === "data-lang" ||
              mutation.attributeName === "data-language" ||
              mutation.attributeName === "value"
            ) {
              const lang = languageFromElement(target);

              if (lang) {
                detectedLanguage = lang;
                needsApply = true;
                break;
              }
            }
          }

          if (
            mutation.type === "childList" &&
            mutation.addedNodes &&
            mutation.addedNodes.length
          ) {
                        needsApply = Array.from(mutation.addedNodes).some(
              function (node) {
                return (
                  node.nodeType === 1 &&
                  !node.closest(
                    "[data-richie-i18n], [data-i18n], [data-story-i18n], [data-jessica-i18n], [data-i18n-jessica]"
                  )
                );
              }
            );
          }
        }

        if (!needsApply) {
          return;
        }

        scheduleApply(
          detectedLanguage || undefined,
          {
            save: Boolean(detectedLanguage),
            force: true
          }
        );
      }
    );

    observer.observe(
      document.documentElement,
      {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: [
          "lang",
          "data-lang",
          "data-language",
          "value"
        ]
      }
    );
  }

  /* =========================================================
     HISTORY / BACK-FORWARD CACHE
     ========================================================= */

  function installNavigationListeners() {
    window.addEventListener(
      "pageshow",
      function () {
        /*
          When returning from Issue 01 with browser Back,
          re-read persistent language and immediately
          translate Jessica.
        */
        applyLanguage(
          readStoredLanguage() || undefined,
          {
            save: false,
            force: true
          }
        );
      }
    );

    window.addEventListener(
      "popstate",
      function () {
        scheduleApply(
          readStoredLanguage() || undefined,
          {
            save: false,
            force: true
          }
        );
      }
    );

    window.addEventListener(
      "focus",
      function () {
        const stored = readStoredLanguage();

        if (
          stored &&
          stored !== currentLanguage
        ) {
          applyLanguage(
            stored,
            {
              save: false,
              force: true
            }
          );
        }
      }
    );
  }

  /* =========================================================
     PUBLIC API
     ---------------------------------------------------------
     Allows the global PETS & DOGUE shell to call:
     
       window.PetsDogueJessicaI18n.setLanguage("hi");

     if needed now or in the future.
     ========================================================= */

  window.PetsDogueJessicaI18n = {
    setLanguage: function (lang) {
      return applyLanguage(
        lang,
        {
          save: true,
          dispatch: true,
          force: true
        }
      );
    },

    getLanguage: function () {
      return (
        currentLanguage ||
        resolveLanguage()
      );
    },

    refresh: function () {
      return applyLanguage(
        resolveLanguage(),
        {
          save: false,
          force: true
        }
      );
    },

    supportedLanguages: SUPPORTED.slice()
  };

  /* =========================================================
     INITIALISE
     ========================================================= */

  function init() {
    installLanguageEventListeners();
    installControlListeners();
    installStorageListener();
    installNavigationListeners();
    installObserver();

    /*
      Initial language priority:
      1. persistent PETS & DOGUE language
      2. URL
      3. current language control
      4. HTML lang
      5. English
    */
    const initialLanguage =
      readStoredLanguage() ||
      getLanguageFromUrl() ||
      getLanguageFromControls() ||
      getLanguageFromDocument() ||
      "en";

    applyLanguage(
      initialLanguage,
      {
        save: true,
        force: true
      }
    );

    /*
      The global shell can finish rendering after this
      script. Run one additional synchronization after
      the current page has fully loaded.
    */
    window.addEventListener(
      "load",
      function () {
        applyLanguage(
          readStoredLanguage() ||
          resolveLanguage(),
          {
            save: false,
            force: true
          }
        );
      },
      {
        once: true
      }
    );
  }

  if (document.readyState === "loading") {
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
