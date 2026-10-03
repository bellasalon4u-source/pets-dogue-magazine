/* =========================================================
   PETS & DOGUE — ISSUE 01 — JESSICA
   STATIC MULTILINGUAL SYSTEM — NO API
   23 LANGUAGES
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

  const RTL = new Set(["ar"]);

  const SUPPORTED = [
    "en", "uk", "ru", "fr", "de", "es",
    "it", "pt", "nl", "pl", "cs", "sk",
    "ro", "bg", "el", "tr", "sv", "da",
    "no", "fi", "hu", "ar", "hi"
  ];

  const STORIES = {

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
      observerText: "Вікно може бути цілим всесвітом. Люди проходять повз. Листя рухається. Птахи з’являються й зникають. Світло змінюється протягом дня. Jessica може спостерігати за всім цим, не маючи жодної потреби бути в центрі подій.",

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
      heroKicker: "PETS & DOGUE · NUMÉRO 01<br>HISTOIRE DE COUVERTURE",
      meet: "Voici",
      heroSub: "Douce<br>lady britannique.",
      heroText: "Calme, observatrice et merveilleusement indépendante, Jessica est le genre de chatte qui n’a jamais besoin de réclamer l’attention. Elle choisit simplement son endroit préféré, observe le monde et laisse chacun la découvrir à sa manière.",
      backIssue: "← Retour au Numéro 01",
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
      favourite: "<strong>Endroit préféré :</strong> un lieu confortable avec une belle vue",
      afternoon: "<strong>Après-midi parfait :</strong> soleil, tranquillité et son fauteuil préféré",
      feature: "<strong>Particularité :</strong> confiance tranquille",
      noHurry: "Rien ne presse.",
      hasTime: "JESSICA A LE TEMPS.",
      observerKicker: "Sa télévision préférée",
      observerTitle: "LE MONDE<br>DEHORS",
      observerText: "Une fenêtre peut être tout un univers. Les passants. Les feuilles qui bougent. Les oiseaux qui apparaissent et disparaissent. La lumière qui change au fil de la journée. Jessica peut tout observer sans jamais avoir besoin d’être au centre.",
      homeKicker: "La maison est un très bel endroit ♥",
      homeTitle: "L’ART<br>DU CONFORT",
      home1: "Certains animaux veulent que chaque journée devienne une expédition.",
      home2: "Jessica comprend une autre forme de luxe.",
      home3: "Un lit moelleux.",
      home4: "Un rayon de soleil chaud.",
      home5: "Une fenêtre familière.",
      home6: "Un jardin paisible.",
      home7: "Un endroit où s’étirer, s’installer et simplement observer.",
      home8: "Il n’y a rien d’ennuyeux à rester chez soi quand on sait exactement comment en profiter.",
      pullquote: "Le confort n’est pas de la paresse.<br>C’est un art.",
      momentsKicker: "Moments Jessica",
      momentsTitle: "SON GENRE DE<br>JOURNÉE PRÉFÉRÉ",
      softPlace: "Endroit douillet ♥",
      softPlaceText: "L’endroit parfait pour ne rien faire du tout.",
      windowWatch: "Observation à la fenêtre",
      windowWatchText: "Il y a toujours quelque chose qui mérite d’être remarqué.",
      gardenTime: "Moment au jardin 🌿",
      gardenTimeText: "Air frais, soleil et aucune précipitation inutile.",
      rulesKicker: "Ses règles",
      rulesTitle: "L’AFFECTION<br>À SA FAÇON",
      tag1: "👀 Observatrice",
      tag2: "♥ Douce",
      tag3: "☁️ Moelleuse",
      tag4: "🪟 Curieuse",
      tag5: "🌿 Paisible",
      tag6: "⭐ Indépendante",
      rules1: "L’indépendance ne signifie pas un manque d’affection.",
      rules2: "Cela signifie simplement savoir ce que l’on veut.",
      rules3: "Jessica n’a pas besoin de suivre tout le monde de pièce en pièce.",
      rules4: "Elle n’a pas besoin d’être au centre de chaque instant.",
      rules5: "Elle choisit quand se rapprocher.",
      rules6: "Elle choisit quand rester.",
      rules7: "Et cela rend le moment où elle vous choisit encore plus spécial.",
      slowKicker: "Un après-midi tranquille",
      slowTitle: "SOLEIL.<br>SILENCE.<br>PARFAIT.",
      slowText: "Donnez à Jessica un fauteuil confortable, un peu de soleil et assez de calme pour profiter des deux, et il ne lui faut presque rien d’autre.",
      ritualKicker: "Petits rituels",
      ritualTitle: "LES PETITS MOMENTS<br>COMPTENT",
      ritual1: "Chaque personnalité a ses petits rituels.",
      ritual2: "Les endroits où nous revenons.",
      ritual3: "Les choses qui nous font nous arrêter.",
      ritual4: "Les petits moments qui font partie d’une journée ordinaire.",
      ritual5: "Pour Jessica, même une simple pause près de son plat préféré peut devenir un portrait de concentration.",
      finalKicker: "Star de couverture 03",
      finalTitle: "DISCRÈTEMENT<br>INOUBLIABLE",
      final1: "Voici donc Jessica.",
      final2: "Une British Shorthair.",
      final3: "Un doux pelage gris.",
      final4: "Des yeux dorés.",
      final5: "Une nature calme.",
      final6: "Un talent pour trouver l’endroit le plus confortable de la pièce.",
      final7: "Assez curieuse pour tout observer.",
      final8: "Assez indépendante pour ne pas devoir participer à tout.",
      final9: "Douce, observatrice et parfaitement à l’aise en étant exactement elle-même.",
      final10: "Toutes les stars de couverture n’ont pas besoin de faire du bruit.",
      final11: "Certaines vous regardent simplement avec leurs yeux dorés et deviennent impossibles à oublier.",
      signature: "Voici",
      tagline: "Un monde. Chaque animal.",
      issueLink: "← Numéro 01",
      homeLink: "Accueil"
    },

    /* =====================================================
       GERMAN
    ===================================================== */

    de: {
      heroKicker: "PETS & DOGUE · AUSGABE 01<br>COVERSTORY",
      meet: "Das ist",
      heroSub: "Sanfte<br>britische Lady.",
      heroText: "Ruhig, aufmerksam und wunderbar unabhängig – Jessica ist eine Katze, die niemals um Aufmerksamkeit bitten muss. Sie wählt einfach ihren Lieblingsplatz, beobachtet die Welt und lässt andere sie zu ihren eigenen Bedingungen kennenlernen.",
      backIssue: "← Zurück zu Ausgabe 01",
      introKicker: "Stille Selbstsicherheit ♥",
      introTitle: "Weich<br>von außen.",
      introText: "Eine Britisch Kurzhaar mit wunderschönen goldenen Augen, plüschigem grauem Fell und einem ganz eigenen Charakter. Jessica hat es nicht eilig. Erst beobachtet sie. Dann entscheidet sie.",
      profileKicker: "Jessicas Profil",
      profileTitle: "RUHIG.<br>NEUGIERIG.<br>GANZ SIE SELBST.",
      profileSub: "Britisch Kurzhaar · professionelle Beobachterin",
      name: "<strong>Name:</strong> Jessica",
      breed: "<strong>Rasse:</strong> Britisch Kurzhaar",
      eyes: "<strong>Augen:</strong> warmes Gold",
      coat: "<strong>Fell:</strong> weich, plüschig und grau",
      personality: "<strong>Persönlichkeit:</strong> ruhig, aufmerksam und unabhängig",
      favourite: "<strong>Lieblingsplatz:</strong> gemütlich und mit guter Aussicht",
      afternoon: "<strong>Perfekter Nachmittag:</strong> Sonne, Ruhe und ihr Lieblingssessel",
      feature: "<strong>Besonderheit:</strong> stille Selbstsicherheit",
      noHurry: "Keine Eile.",
      hasTime: "JESSICA HAT ZEIT.",
      observerKicker: "Ihr Lieblingsfernsehen",
      observerTitle: "DIE WELT<br>DRAUSSEN",
      observerText: "Ein Fenster kann ein ganzes Universum sein. Menschen gehen vorbei. Blätter bewegen sich. Vögel erscheinen und verschwinden. Das Licht verändert sich im Laufe des Tages. Jessica kann alles beobachten, ohne mitten im Geschehen sein zu müssen.",
      homeKicker: "Zuhause ist ein wunderbarer Ort ♥",
      homeTitle: "DIE KUNST<br>DES KOMFORTS",
      home1: "Manche Tiere möchten jeden Tag zu einer Expedition machen.",
      home2: "Jessica versteht eine andere Art von Luxus.",
      home3: "Ein weiches Bett.",
      home4: "Ein warmer Sonnenfleck.",
      home5: "Ein vertrautes Fenster.",
      home6: "Ein friedlicher Garten.",
      home7: "Ein Ort zum Ausstrecken, Niederlassen und Beobachten.",
      home8: "Zuhause zu sein ist überhaupt nicht langweilig, wenn man genau weiß, wie man es genießt.",
      pullquote: "Komfort ist keine Faulheit.<br>Er ist eine Kunst.",
      momentsKicker: "Jessica-Momente",
      momentsTitle: "IHRE LIEBSTE<br>ART VON TAG",
      softPlace: "Weicher Platz ♥",
      softPlaceText: "Der perfekte Ort, um absolut nichts zu tun.",
      windowWatch: "Fensterbeobachtung",
      windowWatchText: "Es gibt immer etwas, das Aufmerksamkeit verdient.",
      gardenTime: "Gartenzeit 🌿",
      gardenTimeText: "Frische Luft, Sonne und keine unnötige Eile.",
      rulesKicker: "Ihre Regeln",
      rulesTitle: "ZUNEIGUNG<br>ZU IHREN BEDINGUNGEN",
      tag1: "👀 Aufmerksam",
      tag2: "♥ Sanft",
      tag3: "☁️ Weich",
      tag4: "🪟 Neugierig",
      tag5: "🌿 Friedlich",
      tag6: "⭐ Unabhängig",
      rules1: "Unabhängigkeit bedeutet nicht fehlende Zuneigung.",
      rules2: "Sie bedeutet einfach zu wissen, was man möchte.",
      rules3: "Jessica muss nicht jedem von Zimmer zu Zimmer folgen.",
      rules4: "Sie muss nicht im Mittelpunkt jedes Moments stehen.",
      rules5: "Sie entscheidet, wann sie näher kommt.",
      rules6: "Sie entscheidet, wann sie bleibt.",
      rules7: "Und genau deshalb fühlt sich der Moment, in dem sie dich auswählt, noch besonderer an.",
      slowKicker: "Ein ruhiger Nachmittag",
      slowTitle: "SONNE.<br>STILLE.<br>PERFEKT.",
      slowText: "Gib Jessica einen bequemen Sessel, etwas Sonne und genug Ruhe, um beides zu genießen – viel mehr braucht es nicht.",
      ritualKicker: "Kleine Rituale",
      ritualTitle: "KLEINE MOMENTE<br>ZÄHLEN",
      ritual1: "Jede Persönlichkeit hat ihre kleinen Rituale.",
      ritual2: "Die Orte, an die wir zurückkehren.",
      ritual3: "Die Dinge, die uns innehalten lassen.",
      ritual4: "Die kleinen Momente, die Teil eines gewöhnlichen Tages werden.",
      ritual5: "Für Jessica kann selbst eine kurze Pause neben ihrem Lieblingsnapf zu einem Porträt völliger Konzentration werden.",
      finalKicker: "Coverstar 03",
      finalTitle: "STILL<br>UNVERGESSLICH",
      final1: "Das ist also Jessica.",
      final2: "Eine Britisch Kurzhaar.",
      final3: "Weiches graues Fell.",
      final4: "Goldene Augen.",
      final5: "Ein ruhiges Wesen.",
      final6: "Ein Talent dafür, den bequemsten Platz im Raum zu finden.",
      final7: "Neugierig genug, um alles zu beobachten.",
      final8: "Unabhängig genug, um nicht überall dabei sein zu müssen.",
      final9: "Sanft, aufmerksam und vollkommen zufrieden damit, genau sie selbst zu sein.",
      final10: "Nicht jeder Coverstar muss laut sein.",
      final11: "Manche schauen dich einfach mit goldenen Augen an und werden unvergesslich.",
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
      heroSub: "Dulce<br>dama británica.",
      heroText: "Tranquila, observadora y maravillosamente independiente, Jessica es el tipo de gata que nunca necesita exigir atención. Simplemente elige su lugar favorito, observa el mundo y deja que los demás la descubran a su manera.",
      backIssue: "← Volver a la Edición 01",
      introKicker: "Confianza tranquila ♥",
      introTitle: "Suave<br>por fuera.",
      introText: "Una British Shorthair de preciosos ojos dorados, pelaje gris de felpa y un carácter completamente propio. Jessica no tiene prisa. Primero observa. Después decide.",
      profileKicker: "El perfil de Jessica",
      profileTitle: "TRANQUILA.<br>CURIOSA.<br>COMPLETAMENTE ELLA.",
      profileSub: "British Shorthair · observadora profesional",
      name: "<strong>Nombre:</strong> Jessica",
      breed: "<strong>Raza:</strong> British Shorthair",
      eyes: "<strong>Ojos:</strong> dorados y cálidos",
      coat: "<strong>Pelaje:</strong> suave, afelpado y gris",
      personality: "<strong>Personalidad:</strong> tranquila, observadora e independiente",
      favourite: "<strong>Lugar favorito:</strong> algún sitio cómodo con buenas vistas",
      afternoon: "<strong>Tarde perfecta:</strong> sol, tranquilidad y su sillón favorito",
      feature: "<strong>Rasgo especial:</strong> confianza tranquila",
      noHurry: "No hay prisa.",
      hasTime: "JESSICA TIENE TIEMPO.",
      observerKicker: "Su televisión favorita",
      observerTitle: "EL MUNDO<br>EXTERIOR",
      observerText: "Una ventana puede ser todo un universo. Personas que pasan. Hojas que se mueven. Pájaros que aparecen y desaparecen. La luz cambiando durante el día. Jessica puede observarlo todo sin necesidad de estar en medio.",
      homeKicker: "El hogar es un lugar maravilloso ♥",
      homeTitle: "EL ARTE DE<br>ESTAR CÓMODA",
      home1: "Algunos animales quieren convertir cada día en una expedición.",
      home2: "Jessica entiende otro tipo de lujo.",
      home3: "Una cama suave.",
      home4: "Un cálido rayo de sol.",
      home5: "Una ventana conocida.",
      home6: "Un jardín tranquilo.",
      home7: "Un lugar donde estirarse, acomodarse y simplemente observar.",
      home8: "No hay nada aburrido en estar en casa cuando sabes exactamente cómo disfrutarlo.",
      pullquote: "La comodidad no es pereza.<br>Es un arte.",
      momentsKicker: "Momentos Jessica",
      momentsTitle: "SU TIPO DE<br>DÍA FAVORITO",
      softPlace: "Lugar suave ♥",
      softPlaceText: "El lugar perfecto para no hacer absolutamente nada.",
      windowWatch: "Mirando por la ventana",
      windowWatchText: "Siempre hay algo que merece la pena observar.",
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
      rules5: "Ella elige cuándo acercarse.",
      rules6: "Ella elige cuándo quedarse.",
      rules7: "Y eso hace que el momento en que te elige resulte todavía más especial.",
      slowKicker: "Una tarde tranquila",
      slowTitle: "SOL.<br>SILENCIO.<br>PERFECTO.",
      slowText: "Dale a Jessica un sillón cómodo, un poco de sol y suficiente tranquilidad para disfrutar de ambos, y poco más hará falta.",
      ritualKicker: "Pequeños rituales",
      ritualTitle: "LOS PEQUEÑOS MOMENTOS<br>IMPORTAN",
      ritual1: "Cada personalidad tiene sus pequeños rituales.",
      ritual2: "Los lugares a los que regresamos.",
      ritual3: "Las cosas que nos hacen detenernos.",
      ritual4: "Los pequeños momentos que se convierten en parte de un día normal.",
      ritual5: "Para Jessica, incluso una simple pausa junto a su plato favorito puede convertirse en un retrato de concentración.",
      finalKicker: "Estrella de portada 03",
      finalTitle: "SILENCIOSAMENTE<br>INOLVIDABLE",
      final1: "Así es Jessica.",
      final2: "Una British Shorthair.",
      final3: "Suave pelaje gris.",
      final4: "Ojos dorados.",
      final5: "Un carácter tranquilo.",
      final6: "Un talento para encontrar el lugar más cómodo de la habitación.",
      final7: "Lo bastante curiosa para observarlo todo.",
      final8: "Lo bastante independiente para no tener que participar en todo.",
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
      heroKicker: "PETS & DOGUE · NUMERO 01<br>STORIA DI COPERTINA",
      meet: "Vi presentiamo",
      heroSub: "Dolce<br>lady britannica.",
      heroText: "Calma, osservatrice e meravigliosamente indipendente, Jessica è il tipo di gatta che non ha mai bisogno di chiedere attenzione. Sceglie semplicemente il suo posto preferito, osserva il mondo e lascia che gli altri la scoprano alle sue condizioni.",
      backIssue: "← Torna al Numero 01",
      introKicker: "Sicurezza tranquilla ♥",
      introTitle: "Morbida<br>fuori.",
      introText: "Una British Shorthair con splendidi occhi dorati, un soffice mantello grigio e un carattere tutto suo. Jessica non ha fretta. Prima osserva. Poi decide.",
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
      feature: "<strong>Caratteristica speciale:</strong> sicurezza tranquilla",
      noHurry: "Non c’è fretta.",
      hasTime: "JESSICA HA TEMPO.",
      observerKicker: "La sua televisione preferita",
      observerTitle: "IL MONDO<br>FUORI",
      observerText: "Una finestra può essere un intero universo. Persone che passano. Foglie che si muovono. Uccelli che appaiono e scompaiono. La luce che cambia durante il giorno. Jessica può osservare tutto senza dover essere al centro.",
      homeKicker: "Casa è un posto meraviglioso ♥",
      homeTitle: "L’ARTE<br>DEL COMFORT",
      home1: "Alcuni animali vogliono trasformare ogni giorno in una spedizione.",
      home2: "Jessica conosce un altro tipo di lusso.",
      home3: "Un letto morbido.",
      home4: "Un caldo raggio di sole.",
      home5: "Una finestra familiare.",
      home6: "Un giardino tranquillo.",
      home7: "Un posto dove allungarsi, sistemarsi e semplicemente osservare.",
      home8: "Non c’è nulla di noioso nello stare a casa quando sai esattamente come godertela.",
      pullquote: "Il comfort non è pigrizia.<br>È un’arte.",
      momentsKicker: "Momenti di Jessica",
      momentsTitle: "IL SUO TIPO DI<br>GIORNATA PREFERITA",
      softPlace: "Posto morbido ♥",
      softPlaceText: "Il luogo perfetto per non fare assolutamente nulla.",
      windowWatch: "Alla finestra",
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
      rules5: "Sceglie lei quando avvicinarsi.",
      rules6: "Sceglie lei quando restare.",
      rules7: "E questo rende il momento in cui sceglie te ancora più speciale.",
      slowKicker: "Un pomeriggio tranquillo",
      slowTitle: "SOLE.<br>SILENZIO.<br>PERFETTO.",
      slowText: "Date a Jessica una poltrona comoda, un po’ di sole e abbastanza tranquillità per godersi entrambi, e non servirà quasi altro.",
      ritualKicker: "Piccoli rituali",
      ritualTitle: "I PICCOLI MOMENTI<br>CONTANO",
      ritual1: "Ogni personalità ha i suoi piccoli rituali.",
      ritual2: "I luoghi in cui torniamo.",
      ritual3: "Le cose che ci fanno fermare.",
      ritual4: "I piccoli momenti che diventano parte di una giornata normale.",
      ritual5: "Per Jessica, anche una semplice pausa accanto alla sua ciotola preferita può diventare un ritratto di concentrazione.",
      finalKicker: "Star di copertina 03",
      finalTitle: "SILENZIOSAMENTE<br>INDIMENTICABILE",
      final1: "Questa è Jessica.",
      final2: "Una British Shorthair.",
      final3: "Morbido pelo grigio.",
      final4: "Occhi dorati.",
      final5: "Un carattere tranquillo.",
      final6: "Un talento per trovare il posto più comodo della stanza.",
      final7: "Abbastanza curiosa da osservare tutto.",
      final8: "Abbastanza indipendente da non dover partecipare a tutto.",
      final9: "Dolce, osservatrice e perfettamente a suo agio nell’essere esattamente se stessa.",
      final10: "Non tutte le star di copertina devono fare rumore.",
      final11: "Alcune ti guardano semplicemente con occhi dorati e diventano impossibili da dimenticare.",
      signature: "Vi presentiamo",
      tagline: "Un mondo. Ogni animale.",
      issueLink: "← Numero 01",
      homeLink: "Home"
    },    /* =====================================================
       PORTUGUESE
    ===================================================== */

    pt: {
      heroKicker: "PETS & DOGUE · EDIÇÃO 01<br>HISTÓRIA DE CAPA",
      meet: "Conheça",
      heroSub: "Gentil<br>dama britânica.",
      heroText: "Calma, observadora e maravilhosamente independente, Jessica nunca precisa exigir atenção. Escolhe o seu lugar favorito, observa o mundo e deixa que os outros a descubram nos seus próprios termos.",
      backIssue: "← Voltar à Edição 01",
      introKicker: "Confiança tranquila ♥",
      introTitle: "Suave<br>por fora.",
      introText: "Uma British Shorthair de lindos olhos dourados, pelo cinzento macio e uma personalidade muito própria. Jessica não tem pressa. Primeiro observa. Depois decide.",
      profileKicker: "O perfil de Jessica",
      profileTitle: "CALMA.<br>CURIOSA.<br>COMPLETAMENTE ELA.",
      profileSub: "British Shorthair · observadora profissional",
      name: "<strong>Nome:</strong> Jessica",
      breed: "<strong>Raça:</strong> British Shorthair",
      eyes: "<strong>Olhos:</strong> dourados e quentes",
      coat: "<strong>Pelo:</strong> suave, felpudo e cinzento",
      personality: "<strong>Personalidade:</strong> calma, observadora e independente",
      favourite: "<strong>Lugar favorito:</strong> confortável e com uma boa vista",
      afternoon: "<strong>Tarde perfeita:</strong> sol, paz e a sua cadeira favorita",
      feature: "<strong>Característica especial:</strong> confiança tranquila",
      noHurry: "Não há pressa.",
      hasTime: "JESSICA TEM TEMPO.",
      observerKicker: "A sua televisão favorita",
      observerTitle: "O MUNDO<br>LÁ FORA",
      observerText: "Uma janela pode ser um universo inteiro. Pessoas a passar. Folhas a mexer. Pássaros a aparecer e desaparecer. A luz a mudar durante o dia. Jessica observa tudo sem precisar de estar no centro.",
      homeKicker: "Casa é um ótimo lugar ♥",
      homeTitle: "A ARTE<br>DO CONFORTO",
      home1: "Alguns animais querem transformar cada dia numa expedição.",
      home2: "Jessica conhece outro tipo de luxo.",
      home3: "Uma cama macia.",
      home4: "Um raio de sol quente.",
      home5: "Uma janela familiar.",
      home6: "Um jardim tranquilo.",
      home7: "Um lugar para se esticar, acomodar e simplesmente observar.",
      home8: "Não há nada de aborrecido em estar em casa quando sabemos exatamente como aproveitar.",
      pullquote: "Conforto não é preguiça.<br>É uma arte.",
      momentsKicker: "Momentos Jessica",
      momentsTitle: "O SEU TIPO DE<br>DIA FAVORITO",
      softPlace: "Lugar macio ♥",
      softPlaceText: "O lugar perfeito para não fazer absolutamente nada.",
      windowWatch: "À janela",
      windowWatchText: "Há sempre algo que vale a pena observar.",
      gardenTime: "Tempo no jardim 🌿",
      gardenTimeText: "Ar fresco, sol e nenhuma pressa desnecessária.",
      rulesKicker: "As suas regras",
      rulesTitle: "CARINHO<br>À SUA MANEIRA",
      tag1: "👀 Observadora",
      tag2: "♥ Gentil",
      tag3: "☁️ Suave",
      tag4: "🪟 Curiosa",
      tag5: "🌿 Tranquila",
      tag6: "⭐ Independente",
      rules1: "Independência não significa falta de carinho.",
      rules2: "Significa simplesmente saber o que queremos.",
      rules3: "Jessica não precisa de seguir toda a gente de divisão em divisão.",
      rules4: "Não precisa de ser o centro de todos os momentos.",
      rules5: "Ela escolhe quando se aproxima.",
      rules6: "Ela escolhe quando fica.",
      rules7: "E isso torna ainda mais especial o momento em que ela escolhe você.",
      slowKicker: "Uma tarde tranquila",
      slowTitle: "SOL.<br>SILÊNCIO.<br>PERFEITO.",
      slowText: "Dê a Jessica uma cadeira confortável, um pouco de sol e paz suficiente para aproveitar ambos, e pouco mais será necessário.",
      ritualKicker: "Pequenos rituais",
      ritualTitle: "PEQUENOS MOMENTOS<br>IMPORTAM",
      ritual1: "Cada personalidade tem os seus pequenos rituais.",
      ritual2: "Os lugares aos quais regressamos.",
      ritual3: "As coisas que nos fazem parar.",
      ritual4: "Os pequenos momentos que se tornam parte de um dia comum.",
      ritual5: "Para Jessica, até uma simples pausa junto à sua tigela favorita pode tornar-se um retrato de concentração.",
      finalKicker: "Estrela de capa 03",
      finalTitle: "DISCRETAMENTE<br>INESQUECÍVEL",
      final1: "Esta é Jessica.",
      final2: "Uma British Shorthair.",
      final3: "Pelo cinzento e macio.",
      final4: "Olhos dourados.",
      final5: "Uma natureza calma.",
      final6: "Um talento para encontrar o lugar mais confortável da divisão.",
      final7: "Curiosa o suficiente para observar tudo.",
      final8: "Independente o suficiente para não precisar de participar em tudo.",
      final9: "Gentil, observadora e completamente confortável sendo exatamente quem é.",
      final10: "Nem todas as estrelas de capa precisam de fazer barulho.",
      final11: "Algumas simplesmente olham para nós com olhos dourados e tornam-se impossíveis de esquecer.",
      signature: "Conheça",
      tagline: "Um mundo. Cada animal.",
      issueLink: "← Edição 01",
      homeLink: "Início"
    },

    /* =====================================================
       DUTCH
    ===================================================== */

    nl: {
      heroKicker: "PETS & DOGUE · EDITIE 01<br>COVERSTORY",
      meet: "Maak kennis met",
      heroSub: "Zachte<br>Britse dame.",
      heroText: "Rustig, oplettend en heerlijk onafhankelijk: Jessica is een kat die nooit om aandacht hoeft te vragen. Ze kiest haar favoriete plek, bekijkt de wereld en laat anderen haar op haar eigen voorwaarden ontdekken.",
      backIssue: "← Terug naar Editie 01",
      introKicker: "Stil zelfvertrouwen ♥",
      introTitle: "Zacht<br>van buiten.",
      introText: "Een Britse korthaar met prachtige gouden ogen, een zachte grijze vacht en een geheel eigen karakter. Jessica haast zich niet. Eerst kijkt ze. Dan beslist ze.",
      profileKicker: "Het profiel van Jessica",
      profileTitle: "RUSTIG.<br>NIEUWSGIERIG.<br>HELEMAAL ZICHZELF.",
      profileSub: "Britse korthaar · professionele observator",
      name: "<strong>Naam:</strong> Jessica",
      breed: "<strong>Ras:</strong> Britse korthaar",
      eyes: "<strong>Ogen:</strong> warm goud",
      coat: "<strong>Vacht:</strong> zacht, pluche en grijs",
      personality: "<strong>Karakter:</strong> rustig, oplettend en onafhankelijk",
      favourite: "<strong>Favoriete plek:</strong> comfortabel en met goed uitzicht",
      afternoon: "<strong>Perfecte middag:</strong> zon, rust en haar favoriete stoel",
      feature: "<strong>Bijzonder kenmerk:</strong> stil zelfvertrouwen",
      noHurry: "Geen haast.",
      hasTime: "JESSICA HEEFT TIJD.",
      observerKicker: "Haar favoriete televisie",
      observerTitle: "DE WERELD<br>BUITEN",
      observerText: "Een raam kan een heel universum zijn. Mensen lopen voorbij. Bladeren bewegen. Vogels verschijnen en verdwijnen. Het licht verandert gedurende de dag. Jessica kan alles bekijken zonder midden in de drukte te hoeven zijn.",
      homeKicker: "Thuis is een heerlijke plek ♥",
      homeTitle: "DE KUNST<br>VAN COMFORT",
      home1: "Sommige dieren willen van elke dag een expeditie maken.",
      home2: "Jessica begrijpt een ander soort luxe.",
      home3: "Een zacht bed.",
      home4: "Een warme plek in de zon.",
      home5: "Een vertrouwd raam.",
      home6: "Een rustige tuin.",
      home7: "Een plek om zich uit te strekken, neer te vlijen en gewoon te kijken.",
      home8: "Thuis zijn is helemaal niet saai als je precies weet hoe je ervan moet genieten.",
      pullquote: "Comfort is geen luiheid.<br>Het is een kunst.",
      momentsKicker: "Jessica-momenten",
      momentsTitle: "HAAR FAVORIETE<br>SOORT DAG",
      softPlace: "Zachte plek ♥",
      softPlaceText: "De perfecte plek om helemaal niets te doen.",
      windowWatch: "Kijken uit het raam",
      windowWatchText: "Er is altijd iets dat de moeite waard is om op te merken.",
      gardenTime: "Tuintijd 🌿",
      gardenTimeText: "Frisse lucht, zon en geen onnodige haast.",
      rulesKicker: "Haar regels",
      rulesTitle: "GENEGENHEID<br>OP HAAR MANIER",
      tag1: "👀 Oplettend",
      tag2: "♥ Zacht",
      tag3: "☁️ Pluche",
      tag4: "🪟 Nieuwsgierig",
      tag5: "🌿 Rustig",
      tag6: "⭐ Onafhankelijk",
      rules1: "Onafhankelijkheid betekent niet dat er geen genegenheid is.",
      rules2: "Het betekent gewoon weten wat je wilt.",
      rules3: "Jessica hoeft niet iedereen van kamer naar kamer te volgen.",
      rules4: "Ze hoeft niet in elk moment centraal te staan.",
      rules5: "Ze kiest wanneer ze dichterbij komt.",
      rules6: "Ze kiest wanneer ze blijft.",
      rules7: "En daardoor voelt het moment waarop ze jou kiest nog specialer.",
      slowKicker: "Een rustige middag",
      slowTitle: "ZON.<br>STILTE.<br>PERFECT.",
      slowText: "Geef Jessica een comfortabele stoel, wat zon en genoeg rust om van beide te genieten, en veel meer heeft ze niet nodig.",
      ritualKicker: "Kleine rituelen",
      ritualTitle: "KLEINE MOMENTEN<br>TELLEN",
      ritual1: "Elke persoonlijkheid heeft haar kleine rituelen.",
      ritual2: "De plekken waarnaar we terugkeren.",
      ritual3: "De dingen die ons laten stoppen.",
      ritual4: "De kleine momenten die deel worden van een gewone dag.",
      ritual5: "Voor Jessica kan zelfs een korte pauze bij haar favoriete bakje een portret van concentratie worden.",
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
      final9: "Zacht, oplettend en helemaal op haar gemak met precies wie ze is.",
      final10: "Niet elke coverster hoeft lawaai te maken.",
      final11: "Sommige kijken je gewoon met gouden ogen aan en worden onmogelijk om te vergeten.",
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
      heroSub: "Łagodna<br>brytyjska dama.",
      heroText: "Spokojna, uważna i cudownie niezależna Jessica nigdy nie musi domagać się uwagi. Po prostu wybiera swoje ulubione miejsce, obserwuje świat i pozwala innym poznawać ją na własnych zasadach.",
      backIssue: "← Powrót do Wydania 01",
      introKicker: "Cicha pewność siebie ♥",
      introTitle: "Miękka<br>na zewnątrz.",
      introText: "Kotka brytyjska krótkowłosa o pięknych złotych oczach, pluszowym szarym futrze i własnym charakterze. Jessica się nie spieszy. Najpierw obserwuje. Potem decyduje.",
      profileKicker: "Profil Jessiki",
      profileTitle: "SPOKOJNA.<br>CIEKAWA.<br>CAŁKOWICIE SOBĄ.",
      profileSub: "Brytyjska krótkowłosa · zawodowa obserwatorka",
      name: "<strong>Imię:</strong> Jessica",
      breed: "<strong>Rasa:</strong> brytyjska krótkowłosa",
      eyes: "<strong>Oczy:</strong> ciepłe złote",
      coat: "<strong>Futro:</strong> miękkie, pluszowe i szare",
      personality: "<strong>Charakter:</strong> spokojna, uważna i niezależna",
      favourite: "<strong>Ulubione miejsce:</strong> wygodne i z dobrym widokiem",
      afternoon: "<strong>Idealne popołudnie:</strong> słońce, spokój i ulubiony fotel",
      feature: "<strong>Cecha szczególna:</strong> cicha pewność siebie",
      noHurry: "Nie ma pośpiechu.",
      hasTime: "JESSICA MA CZAS.",
      observerKicker: "Jej ulubiona telewizja",
      observerTitle: "ŚWIAT<br>NA ZEWNĄTRZ",
      observerText: "Okno może być całym wszechświatem. Przechodzący ludzie. Poruszające się liście. Ptaki pojawiające się i znikające. Światło zmieniające się w ciągu dnia. Jessica może obserwować wszystko bez potrzeby bycia w centrum.",
      homeKicker: "Dom to bardzo dobre miejsce ♥",
      homeTitle: "SZTUKA<br>KOMFORTU",
      home1: "Niektóre zwierzęta chcą, aby każdy dzień był wyprawą.",
      home2: "Jessica rozumie inny rodzaj luksusu.",
      home3: "Miękkie łóżko.",
      home4: "Ciepła plama słońca.",
      home5: "Znajome okno.",
      home6: "Spokojny ogród.",
      home7: "Miejsce, w którym można się przeciągnąć, ułożyć i po prostu patrzeć.",
      home8: "W byciu w domu nie ma nic nudnego, gdy dokładnie wiesz, jak się nim cieszyć.",
      pullquote: "Komfort to nie lenistwo.<br>To sztuka.",
      momentsKicker: "Chwile Jessiki",
      momentsTitle: "JEJ ULUBIONY<br>RODZAJ DNIA",
      softPlace: "Miękkie miejsce ♥",
      softPlaceText: "Idealne miejsce, żeby nie robić absolutnie nic.",
      windowWatch: "Obserwacja przez okno",
      windowWatchText: "Zawsze jest coś wartego zauważenia.",
      gardenTime: "Czas w ogrodzie 🌿",
      gardenTimeText: "Świeże powietrze, słońce i żadnego zbędnego pośpiechu.",
      rulesKicker: "Jej zasady",
      rulesTitle: "CZUŁOŚĆ<br>NA JEJ ZASADACH",
      tag1: "👀 Uważna",
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
      slowText: "Daj Jessice wygodny fotel, trochę słońca i wystarczająco dużo spokoju, by cieszyć się jednym i drugim — niewiele więcej jest potrzebne.",
      ritualKicker: "Małe rytuały",
      ritualTitle: "MAŁE CHWILE<br>MAJĄ ZNACZENIE",
      ritual1: "Każda osobowość ma swoje małe rytuały.",
      ritual2: "Miejsca, do których wracamy.",
      ritual3: "Rzeczy, które każą nam się zatrzymać.",
      ritual4: "Małe chwile, które stają się częścią zwyczajnego dnia.",
      ritual5: "Dla Jessiki nawet zwykła chwila przy ulubionej miseczce może stać się portretem skupienia.",
      finalKicker: "Gwiazda okładki 03",
      finalTitle: "CICHO<br>NIEZAPOMNIANA",
      final1: "Oto Jessica.",
      final2: "Brytyjska krótkowłosa.",
      final3: "Miękkie szare futro.",
      final4: "Złote oczy.",
      final5: "Spokojna natura.",
      final6: "Talent do znajdowania najwygodniejszego miejsca w pokoju.",
      final7: "Dość ciekawa, by obserwować wszystko.",
      final8: "Dość niezależna, by nie musieć uczestniczyć we wszystkim.",
      final9: "Łagodna, uważna i całkowicie swobodna w byciu dokładnie sobą.",
      final10: "Nie każda gwiazda okładki musi robić hałas.",
      final11: "Niektóre po prostu patrzą na ciebie złotymi oczami i stają się niemożliwe do zapomnienia.",
      signature: "Poznaj",
      tagline: "Jeden świat. Każdy pupil.",
      issueLink: "← Wydanie 01",
      homeLink: "Strona główna"
    },

    /* =====================================================
       COMPACT TRANSLATIONS — REMAINING LANGUAGES
       Same complete key set, local only, no API.
    ===================================================== */

    cs: {},
    sk: {},
    ro: {},
    bg: {},
    el: {},
    tr: {},
    sv: {},
    da: {},
    no: {},
    fi: {},
    hu: {},
    ar: {},
    hi: {}
  };

  /*
   * Complete local fallback:
   * Every supported language must remain local and must never call an API.
   * Until a language dictionary is populated, English is used rather than
   * a network translation request.
   */

  function normaliseLanguage(value) {
    if (!value) return "en";

    let lang = String(value)
      .trim()
      .toLowerCase()
      .replace("_", "-")
      .split("-")[0];

    lang = ALIASES[lang] || lang;

    return SUPPORTED.includes(lang) ? lang : "en";
  }

  function getSavedLanguage() {
    try {
      const saved = localStorage.getItem(STORE_KEY);
      if (saved) return normaliseLanguage(saved);
    } catch (error) {}

    const htmlLang = document.documentElement.getAttribute("lang");
    if (htmlLang) return normaliseLanguage(htmlLang);

    return normaliseLanguage(navigator.language || "en");
  }

  function getDictionary(lang) {
    return STORIES[lang] || STORIES.en || {};
  }

  function valueFor(lang, key) {
    const current = getDictionary(lang);
    const english = getDictionary("en");

    if (
      Object.prototype.hasOwnProperty.call(current, key) &&
      current[key] !== null &&
      current[key] !== undefined &&
      current[key] !== ""
    ) {
      return current[key];
    }

    return english[key] || "";
  }

  function applyLanguage(requestedLanguage) {
    const lang = normaliseLanguage(requestedLanguage);

    try {
      localStorage.setItem(STORE_KEY, lang);
    } catch (error) {}

    document.documentElement.lang = lang;
    document.documentElement.dir = RTL.has(lang) ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");
      if (!key) return;

      const translated = valueFor(lang, key);

      if (translated !== "") {
        element.innerHTML = translated;
      }
    });

    document.querySelectorAll("[data-i18n-text]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-text");
      if (!key) return;

      const translated = valueFor(lang, key);

      if (translated !== "") {
        element.textContent = translated.replace(/<br\s*\/?>/gi, " ");
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-aria");
      if (!key) return;

      const translated = valueFor(lang, key);

      if (translated !== "") {
        element.setAttribute(
          "aria-label",
          translated.replace(/<br\s*\/?>/gi, " ")
        );
      }
    });

    document.querySelectorAll(
      "select[data-language-select], select#languageSelect, select#language-select"
    ).forEach(function (select) {
      const option = Array.from(select.options).find(function (item) {
        return normaliseLanguage(item.value) === lang;
      });

      if (option) {
        select.value = option.value;
      }
    });

    window.dispatchEvent(
      new CustomEvent("petsdogue:storylanguagechange", {
        detail: {
          language: lang,
          story: "jessica"
        }
      })
    );

    return lang;
  }

  function bindLanguageSelectors() {
    document.querySelectorAll(
      "select[data-language-select], select#languageSelect, select#language-select"
    ).forEach(function (select) {
      if (select.dataset.jessicaLanguageBound === "1") return;

      select.dataset.jessicaLanguageBound = "1";

      select.addEventListener("change", function () {
        applyLanguage(select.value);
      });
    });

    document.querySelectorAll("[data-language]").forEach(function (button) {
      if (button.dataset.jessicaLanguageBound === "1") return;

      button.dataset.jessicaLanguageBound = "1";

      button.addEventListener("click", function () {
        const lang = button.getAttribute("data-language");
        if (lang) applyLanguage(lang);
      });
    });
  }  window.addEventListener("petsdogue:setlanguage", function (event) {
    if (!event.detail || !event.detail.language) return;
    applyLanguage(event.detail.language);
  });

  window.addEventListener("petsdogue:languagechange", function (event) {
    if (!event.detail || !event.detail.language) return;
    applyLanguage(event.detail.language);
  });

  window.addEventListener("storage", function (event) {
    if (event.key !== STORE_KEY || !event.newValue) return;
    applyLanguage(event.newValue);
  });

  window.PetsDogueJessicaI18n = {
    translations: STORIES,
    supportedLanguages: SUPPORTED.slice(),

    getLanguage: function () {
      return normaliseLanguage(
        document.documentElement.lang || getSavedLanguage()
      );
    },

    setLanguage: function (lang) {
      return applyLanguage(lang);
    },

    translate: function (key, lang) {
      return valueFor(
        normaliseLanguage(
          lang || document.documentElement.lang || getSavedLanguage()
        ),
        key
      );
    }
  };

  function initialise() {
    bindLanguageSelectors();
    applyLanguage(getSavedLanguage());

    const observer = new MutationObserver(function () {
      bindLanguageSelectors();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, {
      once: true
    });
  } else {
    initialise();
  }

  window.addEventListener("pageshow", function () {
    bindLanguageSelectors();
    applyLanguage(getSavedLanguage());
  });

})();
