/* =========================================================
   PETS & DOGUE — ISSUE 01 — JESSICA
   STATIC MULTILINGUAL STORY
   23 LANGUAGES · NO API
   Arabic RTL · persistent language
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
    "en", "uk", "ru", "fr", "de", "es",
    "it", "pt", "nl", "pl", "cs", "sk",
    "ro", "bg", "el", "tr", "sv", "da",
    "no", "fi", "hu", "ar", "hi"
  ];

  const RTL = new Set(["ar"]);

  const T = {

    /* ==================== ENGLISH ==================== */

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

    /* ==================== UKRAINIAN ==================== */

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

    /* ==================== RUSSIAN ==================== */

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
    },    /* ==================== FRENCH ==================== */

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

    /* ==================== GERMAN ==================== */

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

    /* ==================== SPANISH ==================== */

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

    /* ==================== ITALIAN ==================== */

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
    },

    /* ==================== PORTUGUESE ==================== */

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
    },    /* ==================== DUTCH ==================== */

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

    /* ==================== POLISH ==================== */

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

    /* ==================== CZECH ==================== */

    cs: {
      heroKicker: "PETS & DOGUE · VYDÁNÍ 01<br>PŘÍBĚH Z OBÁLKY",
      meet: "Seznamte se s",
      heroSub: "Jemná<br>britská dáma.",
      heroText: "Klidná, pozorná a nádherně nezávislá Jessica je kočka, která nikdy nemusí vyžadovat pozornost. Jednoduše si vybere své oblíbené místo, sleduje svět a nechává ostatní, aby ji poznali podle jejích vlastních pravidel.",
      backIssue: "← Zpět na Vydání 01",
      introKicker: "Tiché sebevědomí ♥",
      introTitle: "Hebká<br>navenek.",
      introText: "Britská krátkosrstá kočka s nádhernýma zlatýma očima, plyšovou šedou srstí a zcela vlastní povahou. Jessica nespěchá. Nejprve pozoruje. Potom se rozhodne.",
      profileKicker: "Profil Jessicy",
      profileTitle: "KLIDNÁ.<br>ZVĚDAVÁ.<br>ZCELA SAMA SEBOU.",
      profileSub: "Britská krátkosrstá · profesionální pozorovatelka",
      name: "<strong>Jméno:</strong> Jessica",
      breed: "<strong>Plemeno:</strong> britská krátkosrstá",
      eyes: "<strong>Oči:</strong> teplé zlaté",
      coat: "<strong>Srst:</strong> měkká, plyšová a šedá",
      personality: "<strong>Povaha:</strong> klidná, pozorná a nezávislá",
      favourite: "<strong>Oblíbené místo:</strong> pohodlné místo s dobrým výhledem",
      afternoon: "<strong>Dokonalé odpoledne:</strong> slunce, klid a její oblíbené křeslo",
      feature: "<strong>Zvláštní rys:</strong> tiché sebevědomí",
      noHurry: "Není kam spěchat.",
      hasTime: "JESSICA MÁ ČAS.",
      observerKicker: "Její oblíbená televize",
      observerTitle: "SVĚT<br>VENKU",
      observerText: "Okno může být celým vesmírem. Kolemjdoucí lidé. Pohybující se listy. Ptáci, kteří se objevují a mizí. Světlo měnící se během dne. Jessica může všechno sledovat, aniž by musela být uprostřed dění.",
      homeKicker: "Domov je skvělé místo ♥",
      homeTitle: "UMĚNÍ<br>POHODLÍ",
      home1: "Některá zvířata chtějí, aby se každý den stal výpravou.",
      home2: "Jessica rozumí jinému druhu luxusu.",
      home3: "Měkká postel.",
      home4: "Teplý paprsek slunce.",
      home5: "Známé okno.",
      home6: "Klidná zahrada.",
      home7: "Místo, kde se může protáhnout, pohodlně se usadit a jednoduše pozorovat.",
      home8: "Na pobytu doma není nic nudného, když přesně víte, jak si ho užít.",
      pullquote: "Pohodlí není lenost.<br>Je to umění.",
      momentsKicker: "Chvíle s Jessicou",
      momentsTitle: "JEJÍ OBLÍBENÝ<br>DRUH DNE",
      softPlace: "Měkké místo ♥",
      softPlaceText: "Dokonalé místo, kde nemusíte dělat vůbec nic.",
      windowWatch: "Pozorování z okna",
      windowWatchText: "Vždy je tu něco, čeho stojí za to si všimnout.",
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
      rules3: "Jessica nemusí všechny následovat z místnosti do místnosti.",
      rules4: "Nemusí být středem každého okamžiku.",
      rules5: "Sama si vybírá, kdy přijde blíž.",
      rules6: "Sama si vybírá, kdy zůstane.",
      rules7: "A právě proto je okamžik, kdy si vybere vás, ještě výjimečnější.",
      slowKicker: "Pomalé odpoledne",
      slowTitle: "SLUNCE.<br>TICHO.<br>DOKONALÉ.",
      slowText: "Dejte Jessice pohodlné křeslo, trochu slunce a dostatek klidu, aby si obojí užila, a téměř nic dalšího nepotřebuje.",
      ritualKicker: "Malé rituály",
      ritualTitle: "MALÉ OKAMŽIKY<br>JSOU DŮLEŽITÉ",
      ritual1: "Každá osobnost má své malé rituály.",
      ritual2: "Místa, kam se vracíme.",
      ritual3: "Věci, které nás přimějí zastavit.",
      ritual4: "Drobné okamžiky, které se stanou součástí obyčejného dne.",
      ritual5: "Pro Jessicu se i obyčejná chvíle u oblíbené misky může stát portrétem naprostého soustředění.",
      finalKicker: "Hvězda obálky 03",
      finalTitle: "TIŠE<br>NEZAPOMENUTELNÁ",
      final1: "Taková je Jessica.",
      final2: "Britská krátkosrstá.",
      final3: "Měkká šedá srst.",
      final4: "Zlaté oči.",
      final5: "Klidná povaha.",
      final6: "Talent najít nejpohodlnější místo v místnosti.",
      final7: "Dost zvědavá, aby sledovala všechno.",
      final8: "Dost nezávislá, aby nemusela být u všeho.",
      final9: "Jemná, pozorná a dokonale spokojená s tím, že je přesně taková, jaká je.",
      final10: "Ne každá hvězda obálky musí dělat hluk.",
      final11: "Některé se na vás jednoduše podívají zlatýma očima a už na ně nelze zapomenout.",
      signature: "Seznamte se s",
      tagline: "Jeden svět. Každý mazlíček.",
      issueLink: "← Vydání 01",
      homeLink: "Domů"
    },

    /* ==================== SLOVAK ==================== */

    sk: {
      heroKicker: "PETS & DOGUE · VYDANIE 01<br>PRÍBEH Z OBÁLKY",
      meet: "Zoznámte sa s",
      heroSub: "Jemná<br>britská dáma.",
      heroText: "Pokojná, pozorná a úžasne nezávislá Jessica je mačka, ktorá si nikdy nemusí vynucovať pozornosť. Jednoducho si vyberie svoje obľúbené miesto, sleduje svet a nechá ostatných, aby ju spoznali podľa jej vlastných pravidiel.",
      backIssue: "← Späť na Vydanie 01",
      introKicker: "Tiché sebavedomie ♥",
      introTitle: "Hebká<br>navonok.",
      introText: "Britská krátkosrstá mačka s krásnymi zlatými očami, plyšovou sivou srsťou a úplne vlastnou povahou. Jessica sa neponáhľa. Najprv pozoruje. Potom sa rozhodne.",
      profileKicker: "Profil Jessicy",
      profileTitle: "POKOJNÁ.<br>ZVEDAVÁ.<br>ÚPLNE SAMA SEBOU.",
      profileSub: "Britská krátkosrstá · profesionálna pozorovateľka",
      name: "<strong>Meno:</strong> Jessica",
      breed: "<strong>Plemeno:</strong> britská krátkosrstá",
      eyes: "<strong>Oči:</strong> teplé zlaté",
      coat: "<strong>Srsť:</strong> mäkká, plyšová a sivá",
      personality: "<strong>Povaha:</strong> pokojná, pozorná a nezávislá",
      favourite: "<strong>Obľúbené miesto:</strong> pohodlné miesto s dobrým výhľadom",
      afternoon: "<strong>Dokonalé popoludnie:</strong> slnko, pokoj a jej obľúbené kreslo",
      feature: "<strong>Špeciálna črta:</strong> tiché sebavedomie",
      noHurry: "Netreba sa ponáhľať.",
      hasTime: "JESSICA MÁ ČAS.",
      observerKicker: "Jej obľúbená televízia",
      observerTitle: "SVET<br>VONKU",
      observerText: "Okno môže byť celým vesmírom. Ľudia prechádzajú. Listy sa hýbu. Vtáky sa objavujú a miznú. Svetlo sa počas dňa mení. Jessica môže všetko sledovať bez toho, aby musela byť uprostred diania.",
      homeKicker: "Domov je skvelé miesto ♥",
      homeTitle: "UMENIE<br>POHODLIA",
      home1: "Niektoré zvieratá chcú, aby sa každý deň stal výpravou.",
      home2: "Jessica rozumie inému druhu luxusu.",
      home3: "Mäkká posteľ.",
      home4: "Teplý lúč slnka.",
      home5: "Známe okno.",
      home6: "Pokojná záhrada.",
      home7: "Miesto, kde sa môže natiahnuť, pohodlne usadiť a jednoducho pozorovať.",
      home8: "Na pobyte doma nie je nič nudné, keď presne viete, ako si ho užiť.",
      pullquote: "Pohodlie nie je lenivosť.<br>Je to umenie.",
      momentsKicker: "Chvíle s Jessicou",
      momentsTitle: "JEJ OBĽÚBENÝ<br>DRUH DŇA",
      softPlace: "Mäkké miesto ♥",
      softPlaceText: "Dokonalé miesto, kde nemusíte robiť vôbec nič.",
      windowWatch: "Pozorovanie z okna",
      windowWatchText: "Vždy je tu niečo, čo stojí za pozornosť.",
      gardenTime: "Čas v záhrade 🌿",
      gardenTimeText: "Čerstvý vzduch, slnko a žiadny zbytočný zhon.",
      rulesKicker: "Jej pravidlá",
      rulesTitle: "NÁKLONNOSŤ<br>PODĽA JEJ PRAVIDIEL",
      tag1: "👀 Pozorná",
      tag2: "♥ Jemná",
      tag3: "☁️ Hebká",
      tag4: "🪟 Zvedavá",
      tag5: "🌿 Pokojná",
      tag6: "⭐ Nezávislá",
      rules1: "Nezávislosť neznamená nedostatok náklonnosti.",
      rules2: "Znamená jednoducho vedieť, čo chcete.",
      rules3: "Jessica nemusí všetkých nasledovať z izby do izby.",
      rules4: "Nemusí byť stredobodom každého okamihu.",
      rules5: "Sama si vyberá, kedy príde bližšie.",
      rules6: "Sama si vyberá, kedy zostane.",
      rules7: "A práve preto je okamih, keď si vyberie vás, ešte výnimočnejší.",
      slowKicker: "Pomalé popoludnie",
      slowTitle: "SLNKO.<br>TICHO.<br>DOKONALÉ.",
      slowText: "Dajte Jessice pohodlné kreslo, trochu slnka a dostatok pokoja, aby si oboje užila, a takmer nič viac nepotrebuje.",
      ritualKicker: "Malé rituály",
      ritualTitle: "MALÉ OKAMIHY<br>SÚ DÔLEŽITÉ",
      ritual1: "Každá osobnosť má svoje malé rituály.",
      ritual2: "Miesta, kam sa vraciame.",
      ritual3: "Veci, ktoré nás prinútia zastaviť.",
      ritual4: "Drobné okamihy, ktoré sa stanú súčasťou obyčajného dňa.",
      ritual5: "Pre Jessicu sa aj obyčajná chvíľa pri obľúbenej miske môže stať portrétom úplného sústredenia.",
      finalKicker: "Hviezda obálky 03",
      finalTitle: "TICHO<br>NEZABUDNUTEĽNÁ",
      final1: "Taká je Jessica.",
      final2: "Britská krátkosrstá.",
      final3: "Mäkká sivá srsť.",
      final4: "Zlaté oči.",
      final5: "Pokojná povaha.",
      final6: "Talent nájsť najpohodlnejšie miesto v miestnosti.",
      final7: "Dosť zvedavá na to, aby sledovala všetko.",
      final8: "Dosť nezávislá na to, aby nemusela byť pri všetkom.",
      final9: "Jemná, pozorná a úplne spokojná s tým, že je presne taká, aká je.",
      final10: "Nie každá hviezda obálky musí robiť hluk.",
      final11: "Niektoré sa na vás jednoducho pozrú zlatými očami a už na ne nemožno zabudnúť.",
      signature: "Zoznámte sa s",
      tagline: "Jeden svet. Každý miláčik.",
      issueLink: "← Vydanie 01",
      homeLink: "Domov"
    },

    /* ==================== ROMANIAN ==================== */

    ro: {
      heroKicker: "PETS & DOGUE · EDIȚIA 01<br>POVESTEA DE COPERTĂ",
      meet: "Faceți cunoștință cu",
      heroSub: "Blânda<br>doamnă britanică.",
      heroText: "Calmă, atentă și minunat de independentă, Jessica este genul de pisică ce nu trebuie niciodată să ceară atenție. Își alege pur și simplu locul preferat, privește lumea și îi lasă pe ceilalți să o descopere în propriul ei ritm.",
      backIssue: "← Înapoi la Ediția 01",
      introKicker: "Încredere liniștită ♥",
      introTitle: "Moale<br>la exterior.",
      introText: "O British Shorthair cu ochi aurii frumoși, blană gri și pufoasă și un caracter numai al ei. Jessica nu se grăbește. Mai întâi observă. Apoi decide.",
      profileKicker: "Profilul Jessicăi",
      profileTitle: "CALMĂ.<br>CURIOASĂ.<br>COMPLET EA ÎNSĂȘI.",
      profileSub: "British Shorthair · observatoare profesionistă",
      name: "<strong>Nume:</strong> Jessica",
      breed: "<strong>Rasă:</strong> British Shorthair",
      eyes: "<strong>Ochi:</strong> aurii și calzi",
      coat: "<strong>Blană:</strong> moale, pufoasă și gri",
      personality: "<strong>Personalitate:</strong> calmă, atentă și independentă",
      favourite: "<strong>Loc preferat:</strong> undeva confortabil, cu o priveliște bună",
      afternoon: "<strong>După-amiază perfectă:</strong> soare, liniște și fotoliul ei preferat",
      feature: "<strong>Trăsătură specială:</strong> încredere liniștită",
      noHurry: "Nu este nicio grabă.",
      hasTime: "JESSICA ARE TIMP.",
      observerKicker: "Televizorul ei preferat",
      observerTitle: "LUMEA<br>DE AFARĂ",
      observerText: "O fereastră poate fi un univers întreg. Oameni care trec. Frunze care se mișcă. Păsări care apar și dispar. Lumina care se schimbă pe parcursul zilei. Jessica poate privi totul fără să fie nevoie să se afle în mijlocul acțiunii.",
      homeKicker: "Acasă este un loc minunat ♥",
      homeTitle: "ARTA<br>CONFORTULUI",
      home1: "Unele animale vor ca fiecare zi să devină o expediție.",
      home2: "Jessica înțelege un alt fel de lux.",
      home3: "Un pat moale.",
      home4: "O rază caldă de soare.",
      home5: "O fereastră familiară.",
      home6: "O grădină liniștită.",
      home7: "Un loc unde se poate întinde, așeza confortabil și pur și simplu privi.",
      home8: "Nu este nimic plictisitor în a sta acasă atunci când știi exact cum să te bucuri de asta.",
      pullquote: "Confortul nu este lene.<br>Este o artă.",
      momentsKicker: "Momente cu Jessica",
      momentsTitle: "ZIUA EI<br>PREFERATĂ",
      softPlace: "Loc moale ♥",
      softPlaceText: "Locul perfect pentru a nu face absolut nimic.",
      windowWatch: "Privind pe fereastră",
      windowWatchText: "Există întotdeauna ceva care merită observat.",
      gardenTime: "Timp în grădină 🌿",
      gardenTimeText: "Aer proaspăt, soare și nicio grabă inutilă.",
      rulesKicker: "Regulile ei",
      rulesTitle: "AFECȚIUNE<br>ÎN TERMENII EI",
      tag1: "👀 Atentă",
      tag2: "♥ Blândă",
      tag3: "☁️ Pufoasă",
      tag4: "🪟 Curioasă",
      tag5: "🌿 Liniștită",
      tag6: "⭐ Independentă",
      rules1: "Independența nu înseamnă lipsă de afecțiune.",
      rules2: "Înseamnă pur și simplu să știi ce vrei.",
      rules3: "Jessica nu trebuie să-i urmeze pe toți dintr-o cameră în alta.",
      rules4: "Nu trebuie să fie în centrul fiecărui moment.",
      rules5: "Ea alege când să se apropie.",
      rules6: "Ea alege când să rămână.",
      rules7: "Și tocmai asta face ca momentul în care te alege pe tine să fie și mai special.",
      slowKicker: "O după-amiază liniștită",
      slowTitle: "SOARE.<br>LINIȘTE.<br>PERFECT.",
      slowText: "Oferă-i Jessicăi un fotoliu confortabil, puțin soare și suficientă liniște pentru a se bucura de amândouă, iar altceva aproape că nu mai este necesar.",
      ritualKicker: "Mici ritualuri",
      ritualTitle: "MOMENTELE MICI<br>CONTEAZĂ",
      ritual1: "Fiecare personalitate are micile ei ritualuri.",
      ritual2: "Locurile în care revenim.",
      ritual3: "Lucrurile care ne fac să ne oprim.",
      ritual4: "Micile momente care devin parte dintr-o zi obișnuită.",
      ritual5: "Pentru Jessica, chiar și o simplă pauză lângă bolul preferat poate deveni un portret al concentrării.",
      finalKicker: "Vedeta copertei 03",
      finalTitle: "DISCRET<br>DE NEUITAT",
      final1: "Aceasta este Jessica.",
      final2: "O British Shorthair.",
      final3: "Blană gri și moale.",
      final4: "Ochi aurii.",
      final5: "O fire calmă.",
      final6: "Talentul de a găsi cel mai confortabil loc din cameră.",
      final7: "Suficient de curioasă pentru a privi totul.",
      final8: "Suficient de independentă pentru a nu trebui să participe la tot.",
      final9: "Blândă, atentă și complet confortabilă fiind exact cine este.",
      final10: "Nu fiecare vedetă de copertă trebuie să facă zgomot.",
      final11: "Unele pur și simplu te privesc cu ochi aurii și devin imposibil de uitat.",
      signature: "Faceți cunoștință cu",
      tagline: "O lume. Fiecare animal.",
      issueLink: "← Ediția 01",
      homeLink: "Acasă"
    },    /* ==================== BULGARIAN ==================== */

    bg: {
      heroKicker: "PETS & DOGUE · БРОЙ 01<br>ИСТОРИЯ ОТ КОРИЦАТА",
      meet: "Запознайте се с",
      heroSub: "Нежна<br>британска дама.",
      heroText: "Спокойна, наблюдателна и прекрасно независима, Jessica е котка, която никога не трябва да настоява за внимание. Тя просто избира любимото си място, наблюдава света и позволява на останалите да я опознаят според нейните собствени правила.",
      backIssue: "← Назад към Брой 01",
      introKicker: "Тиха увереност ♥",
      introTitle: "Мека<br>отвън.",
      introText: "Британска късокосместа с красиви златисти очи, плюшена сива козина и напълно собствен характер. Jessica не бърза. Първо наблюдава. После решава.",
      profileKicker: "Профилът на Jessica",
      profileTitle: "СПОКОЙНА.<br>ЛЮБОПИТНА.<br>НАПЪЛНО СЕБЕ СИ.",
      profileSub: "Британска късокосместа · професионален наблюдател",
      name: "<strong>Име:</strong> Jessica",
      breed: "<strong>Порода:</strong> британска късокосместа",
      eyes: "<strong>Очи:</strong> топло златисти",
      coat: "<strong>Козина:</strong> мека, плюшена и сива",
      personality: "<strong>Характер:</strong> спокойна, наблюдателна и независима",
      favourite: "<strong>Любимо място:</strong> удобно място с хубава гледка",
      afternoon: "<strong>Перфектен следобед:</strong> слънце, спокойствие и любимото ѝ кресло",
      feature: "<strong>Специална черта:</strong> тиха увереност",
      noHurry: "Няма нужда да се бърза.",
      hasTime: "JESSICA ИМА ВРЕМЕ.",
      observerKicker: "Любимата ѝ телевизия",
      observerTitle: "СВЕТЪТ<br>НАВЪН",
      observerText: "Един прозорец може да бъде цяла вселена. Минаващи хора. Движещи се листа. Птици, които се появяват и изчезват. Светлината, която се променя през деня. Jessica може да наблюдава всичко, без да има нужда да бъде в центъра на събитията.",
      homeKicker: "Домът е прекрасно място ♥",
      homeTitle: "ИЗКУСТВОТО<br>НА УЮТА",
      home1: "Някои животни искат всеки ден да се превръща в приключение.",
      home2: "Jessica разбира друг вид лукс.",
      home3: "Меко легло.",
      home4: "Топло слънчево петно.",
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
      rules4: "Не е нужно да бъде центърът на всеки момент.",
      rules5: "Тя избира кога да се приближи.",
      rules6: "Тя избира кога да остане.",
      rules7: "И някак точно това прави момента, в който избере теб, още по-специален.",
      slowKicker: "Спокоен следобед",
      slowTitle: "СЛЪНЦЕ.<br>ТИШИНА.<br>ПЕРФЕКТНО.",
      slowText: "Дайте на Jessica удобно кресло, малко слънце и достатъчно спокойствие, за да се наслаждава и на двете, и почти нищо друго няма да ѝ е необходимо.",
      ritualKicker: "Малки ритуали",
      ritualTitle: "МАЛКИТЕ МОМЕНТИ<br>ИМАТ ЗНАЧЕНИЕ",
      ritual1: "Всяка личност има своите малки ритуали.",
      ritual2: "Местата, към които се връщаме.",
      ritual3: "Нещата, които ни карат да спрем.",
      ritual4: "Малките моменти, които стават част от обикновения ден.",
      ritual5: "За Jessica дори една кратка пауза до любимата купичка може да се превърне в портрет на пълна концентрация.",
      finalKicker: "Звезда от корицата 03",
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
      final10: "Не всяка звезда от корицата трябва да вдига шум.",
      final11: "Някои просто ви поглеждат със златисти очи и стават невъзможни за забравяне.",
      signature: "Запознайте се с",
      tagline: "Един свят. Всеки домашен любимец.",
      issueLink: "← Брой 01",
      homeLink: "Начало"
    },

    /* ==================== GREEK ==================== */

    el: {
      heroKicker: "PETS & DOGUE · ΤΕΥΧΟΣ 01<br>ΙΣΤΟΡΙΑ ΕΞΩΦΥΛΛΟΥ",
      meet: "Γνωρίστε τη",
      heroSub: "Τρυφερή<br>Βρετανίδα κυρία.",
      heroText: "Ήρεμη, παρατηρητική και υπέροχα ανεξάρτητη, η Jessica είναι μια γάτα που δεν χρειάζεται ποτέ να απαιτεί προσοχή. Απλώς επιλέγει το αγαπημένο της μέρος, παρατηρεί τον κόσμο και αφήνει τους άλλους να τη γνωρίσουν με τους δικούς της όρους.",
      backIssue: "← Πίσω στο Τεύχος 01",
      introKicker: "Ήρεμη αυτοπεποίθηση ♥",
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
      afternoon: "<strong>Τέλειο απόγευμα:</strong> ήλιος, ηρεμία και η αγαπημένη της πολυθρόνα",
      feature: "<strong>Ιδιαίτερο χαρακτηριστικό:</strong> ήρεμη αυτοπεποίθηση",
      noHurry: "Δεν υπάρχει λόγος για βιασύνη.",
      hasTime: "Η JESSICA ΕΧΕΙ ΧΡΟΝΟ.",
      observerKicker: "Η αγαπημένη της τηλεόραση",
      observerTitle: "Ο ΚΟΣΜΟΣ<br>ΕΞΩ",
      observerText: "Ένα παράθυρο μπορεί να είναι ένα ολόκληρο σύμπαν. Άνθρωποι που περνούν. Φύλλα που κινούνται. Πουλιά που εμφανίζονται και εξαφανίζονται. Το φως που αλλάζει μέσα στη μέρα. Η Jessica μπορεί να τα παρακολουθεί όλα χωρίς να χρειάζεται να βρίσκεται στο κέντρο τους.",
      homeKicker: "Το σπίτι είναι ένα υπέροχο μέρος ♥",
      homeTitle: "Η ΤΕΧΝΗ<br>ΤΗΣ ΑΝΕΣΗΣ",
      home1: "Μερικά ζώα θέλουν κάθε μέρα να γίνεται μια περιπέτεια.",
      home2: "Η Jessica καταλαβαίνει ένα διαφορετικό είδος πολυτέλειας.",
      home3: "Ένα μαλακό κρεβάτι.",
      home4: "Ένα ζεστό σημείο με ήλιο.",
      home5: "Ένα γνώριμο παράθυρο.",
      home6: "Ένας ήσυχος κήπος.",
      home7: "Ένα μέρος όπου μπορεί να τεντωθεί, να βολευτεί και απλώς να παρατηρεί.",
      home8: "Δεν υπάρχει τίποτα βαρετό στο να βρίσκεσαι στο σπίτι όταν ξέρεις ακριβώς πώς να το απολαμβάνεις.",
      pullquote: "Η άνεση δεν είναι τεμπελιά.<br>Είναι τέχνη.",
      momentsKicker: "Στιγμές της Jessica",
      momentsTitle: "Η ΑΓΑΠΗΜΕΝΗ ΤΗΣ<br>ΜΟΡΦΗ ΗΜΕΡΑΣ",
      softPlace: "Απαλό μέρος ♥",
      softPlaceText: "Το τέλειο μέρος για να μην κάνεις απολύτως τίποτα.",
      windowWatch: "Παρατήρηση από το παράθυρο",
      windowWatchText: "Υπάρχει πάντα κάτι που αξίζει να προσέξεις.",
      gardenTime: "Ώρα στον κήπο 🌿",
      gardenTimeText: "Καθαρός αέρας, ήλιος και καμία περιττή βιασύνη.",
      rulesKicker: "Οι κανόνες της",
      rulesTitle: "ΤΡΥΦΕΡΟΤΗΤΑ<br>ΜΕ ΤΟΥΣ ΔΙΚΟΥΣ ΤΗΣ ΟΡΟΥΣ",
      tag1: "👀 Παρατηρητική",
      tag2: "♥ Τρυφερή",
      tag3: "☁️ Απαλή",
      tag4: "🪟 Περίεργη",
      tag5: "🌿 Ήρεμη",
      tag6: "⭐ Ανεξάρτητη",
      rules1: "Η ανεξαρτησία δεν σημαίνει έλλειψη τρυφερότητας.",
      rules2: "Σημαίνει απλώς ότι ξέρεις τι θέλεις.",
      rules3: "Η Jessica δεν χρειάζεται να ακολουθεί τους πάντες από δωμάτιο σε δωμάτιο.",
      rules4: "Δεν χρειάζεται να είναι το κέντρο κάθε στιγμής.",
      rules5: "Εκείνη επιλέγει πότε θα πλησιάσει.",
      rules6: "Εκείνη επιλέγει πότε θα μείνει.",
      rules7: "Και κάπως έτσι, η στιγμή που επιλέγει εσένα γίνεται ακόμη πιο ξεχωριστή.",
      slowKicker: "Ένα ήρεμο απόγευμα",
      slowTitle: "ΗΛΙΟΣ.<br>ΣΙΩΠΗ.<br>ΤΕΛΕΙΑ.",
      slowText: "Δώστε στη Jessica μια άνετη πολυθρόνα, λίγο ήλιο και αρκετή ηρεμία για να απολαύσει και τα δύο, και σχεδόν τίποτα άλλο δεν χρειάζεται.",
      ritualKicker: "Μικρές τελετουργίες",
      ritualTitle: "ΟΙ ΜΙΚΡΕΣ ΣΤΙΓΜΕΣ<br>ΜΕΤΡΟΥΝ",
      ritual1: "Κάθε προσωπικότητα έχει τις μικρές της τελετουργίες.",
      ritual2: "Τα μέρη στα οποία επιστρέφουμε.",
      ritual3: "Τα πράγματα που μας κάνουν να σταματάμε.",
      ritual4: "Οι μικρές στιγμές που γίνονται μέρος μιας συνηθισμένης ημέρας.",
      ritual5: "Για τη Jessica, ακόμη και μια απλή παύση δίπλα στο αγαπημένο της μπολ μπορεί να γίνει ένα πορτρέτο απόλυτης συγκέντρωσης.",
      finalKicker: "Αστέρι εξωφύλλου 03",
      finalTitle: "ΗΡΕΜΑ<br>ΑΞΕΧΑΣΤΗ",
      final1: "Αυτή είναι η Jessica.",
      final2: "Μια British Shorthair.",
      final3: "Απαλό γκρι τρίχωμα.",
      final4: "Χρυσαφένια μάτια.",
      final5: "Ήρεμη φύση.",
      final6: "Ένα ταλέντο να βρίσκει το πιο άνετο σημείο στο δωμάτιο.",
      final7: "Αρκετά περίεργη για να παρατηρεί τα πάντα.",
      final8: "Αρκετά ανεξάρτητη ώστε να μη χρειάζεται να συμμετέχει σε όλα.",
      final9: "Τρυφερή, παρατηρητική και απόλυτα άνετη με το να είναι ακριβώς αυτή που είναι.",
      final10: "Δεν χρειάζεται κάθε αστέρι εξωφύλλου να κάνει θόρυβο.",
      final11: "Μερικά απλώς σε κοιτούν με χρυσαφένια μάτια και γίνονται αδύνατο να τα ξεχάσεις.",
      signature: "Γνωρίστε τη",
      tagline: "Ένας κόσμος. Κάθε κατοικίδιο.",
      issueLink: "← Τεύχος 01",
      homeLink: "Αρχική"
    },

    /* ==================== TURKISH ==================== */

    tr: {
      heroKicker: "PETS & DOGUE · SAYI 01<br>KAPAK HİKÂYESİ",
      meet: "Tanışın:",
      heroSub: "Nazik<br>İngiliz hanımefendi.",
      heroText: "Sakin, gözlemci ve harika bir şekilde bağımsız olan Jessica, ilgi istemek zorunda olmayan bir kedidir. Sadece en sevdiği yeri seçer, dünyayı izler ve herkesin onu kendi şartlarıyla tanımasına izin verir.",
      backIssue: "← Sayı 01'e dön",
      introKicker: "Sessiz özgüven ♥",
      introTitle: "Dışı<br>yumuşacık.",
      introText: "Güzel altın gözlere, pelüş gibi gri tüylere ve tamamen kendine özgü bir karaktere sahip bir British Shorthair. Jessica acele etmez. Önce gözlemler. Sonra karar verir.",
      profileKicker: "Jessica'nın profili",
      profileTitle: "SAKİN.<br>MERAKLI.<br>TAMAMEN KENDİSİ.",
      profileSub: "British Shorthair · profesyonel gözlemci",
      name: "<strong>Adı:</strong> Jessica",
      breed: "<strong>Irkı:</strong> British Shorthair",
      eyes: "<strong>Gözleri:</strong> sıcak altın rengi",
      coat: "<strong>Tüyleri:</strong> yumuşak, pelüş gibi ve gri",
      personality: "<strong>Karakteri:</strong> sakin, gözlemci ve bağımsız",
      favourite: "<strong>En sevdiği yer:</strong> rahat ve güzel manzaralı bir köşe",
      afternoon: "<strong>Mükemmel öğleden sonra:</strong> güneş, huzur ve en sevdiği koltuk",
      feature: "<strong>Özel özelliği:</strong> sessiz özgüven",
      noHurry: "Acele etmeye gerek yok.",
      hasTime: "JESSICA'NIN ZAMANI VAR.",
      observerKicker: "En sevdiği televizyon",
      observerTitle: "DIŞARIDAKİ<br>DÜNYA",
      observerText: "Bir pencere koca bir evren olabilir. Geçip giden insanlar. Hareket eden yapraklar. Görünüp kaybolan kuşlar. Gün boyunca değişen ışık. Jessica tüm bunları, olayların tam ortasında olmaya ihtiyaç duymadan izleyebilir.",
      homeKicker: "Ev çok güzel bir yer ♥",
      homeTitle: "RAHATLIĞIN<br>SANATI",
      home1: "Bazı hayvanlar her günün bir maceraya dönüşmesini ister.",
      home2: "Jessica başka bir lüks türünü anlıyor.",
      home3: "Yumuşak bir yatak.",
      home4: "Sıcak bir güneş lekesi.",
      home5: "Tanıdık bir pencere.",
      home6: "Huzurlu bir bahçe.",
      home7: "Uzanabileceği, rahatça yerleşebileceği ve sadece izleyebileceği bir yer.",
      home8: "Nasıl keyif alınacağını tam olarak biliyorsanız evde olmanın hiçbir sıkıcı yanı yoktur.",
      pullquote: "Rahatlık tembellik değildir.<br>Bir sanattır.",
      momentsKicker: "Jessica anları",
      momentsTitle: "EN SEVDİĞİ<br>GÜN TÜRÜ",
      softPlace: "Yumuşak yer ♥",
      softPlaceText: "Kesinlikle hiçbir şey yapmamak için mükemmel bir yer.",
      windowWatch: "Pencere gözlemi",
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
      rules4: "Her anın merkezinde olmasına gerek yok.",
      rules5: "Ne zaman yaklaşacağını kendisi seçer.",
      rules6: "Ne zaman kalacağını kendisi seçer.",
      rules7: "Ve bir şekilde bu, sizi seçtiği anı daha da özel kılar.",
      slowKicker: "Sakin bir öğleden sonra",
      slowTitle: "GÜNEŞ.<br>SESSİZLİK.<br>MÜKEMMEL.",
      slowText: "Jessica'ya rahat bir koltuk, biraz güneş ve her ikisinin de tadını çıkarabileceği kadar huzur verin; başka pek bir şeye ihtiyacı kalmaz.",
      ritualKicker: "Küçük ritüeller",
      ritualTitle: "KÜÇÜK ANLAR<br>ÖNEMLİDİR",
      ritual1: "Her kişiliğin küçük ritüelleri vardır.",
      ritual2: "Geri döndüğümüz yerler.",
      ritual3: "Durup bakmamızı sağlayan şeyler.",
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
      final9: "Nazik, gözlemci ve tam olarak kendisi olmaktan tamamen memnun.",
      final10: "Her kapak yıldızının ses çıkarması gerekmez.",
      final11: "Bazıları sadece altın gözleriyle size bakar ve unutulması imkânsız hâle gelir.",
      signature: "Tanışın:",
      tagline: "Tek dünya. Her evcil hayvan.",
      issueLink: "← Sayı 01",
      homeLink: "Ana Sayfa"
    },

    /* ==================== SWEDISH ==================== */

    sv: {
      heroKicker: "PETS & DOGUE · UTGÅVA 01<br>OMSLAGSBERÄTTELSE",
      meet: "Möt",
      heroSub: "Mild<br>brittisk dam.",
      heroText: "Lugn, observant och underbart självständig är Jessica den sortens katt som aldrig behöver kräva uppmärksamhet. Hon väljer helt enkelt sin favoritplats, betraktar världen och låter alla andra upptäcka henne på hennes egna villkor.",
      backIssue: "← Tillbaka till Utgåva 01",
      introKicker: "Stilla självförtroende ♥",
      introTitle: "Mjuk<br>på utsidan.",
      introText: "En brittisk korthår med vackra gyllene ögon, plyschig grå päls och en alldeles egen personlighet. Jessica har ingen brådska. Först observerar hon. Sedan bestämmer hon.",
      profileKicker: "Jessicas profil",
      profileTitle: "LUGN.<br>NYFIKEN.<br>HELT SIG SJÄLV.",
      profileSub: "Brittisk korthår · professionell observatör",
      name: "<strong>Namn:</strong> Jessica",
      breed: "<strong>Ras:</strong> brittisk korthår",
      eyes: "<strong>Ögon:</strong> varmt gyllene",
      coat: "<strong>Päls:</strong> mjuk, plyschig och grå",
      personality: "<strong>Personlighet:</strong> lugn, observant och självständig",
      favourite: "<strong>Favoritplats:</strong> någonstans bekvämt med bra utsikt",
      afternoon: "<strong>Perfekt eftermiddag:</strong> solsken, lugn och hennes favoritfåtölj",
      feature: "<strong>Särskilt kännetecken:</strong> stilla självförtroende",
      noHurry: "Ingen anledning att skynda.",
      hasTime: "JESSICA HAR TID.",
      observerKicker: "Hennes favorit-tv",
      observerTitle: "VÄRLDEN<br>DÄR UTE",
      observerText: "Ett fönster kan vara ett helt universum. Människor som passerar. Löv som rör sig. Fåglar som dyker upp och försvinner. Ljuset som förändras under dagen. Jessica kan betrakta allt utan att behöva befinna sig mitt i det.",
      homeKicker: "Hemma är en mycket bra plats ♥",
      homeTitle: "KONSTEN<br>ATT HA DET BEKVÄMT",
      home1: "Vissa djur vill att varje dag ska bli ett äventyr.",
      home2: "Jessica förstår en annan sorts lyx.",
      home3: "En mjuk säng.",
      home4: "En varm fläck av solsken.",
      home5: "Ett välbekant fönster.",
      home6: "En fridfull trädgård.",
      home7: "En plats där hon kan sträcka ut sig, slå sig ner och bara titta.",
      home8: "Det finns inget tråkigt med att vara hemma när man vet exakt hur man ska njuta av det.",
      pullquote: "Bekvämlighet är inte lathet.<br>Det är en konst.",
      momentsKicker: "Jessica-stunder",
      momentsTitle: "HENNES FAVORIT<br>BLAND DAGAR",
      softPlace: "Mjuk plats ♥",
      softPlaceText: "Den perfekta platsen för att göra absolut ingenting.",
      windowWatch: "Fönsterspaning",
      windowWatchText: "Det finns alltid något som är värt att lägga märke till.",
      gardenTime: "Tid i trädgården 🌿",
      gardenTimeText: "Frisk luft, solsken och ingen onödig brådska.",
      rulesKicker: "Hennes regler",
      rulesTitle: "ÖMHET<br>PÅ HENNES VILLKOR",
      tag1: "👀 Observant",
      tag2: "♥ Mild",
      tag3: "☁️ Mjuk",
      tag4: "🪟 Nyfiken",
      tag5: "🌿 Fridfull",
      tag6: "⭐ Självständig",
      rules1: "Självständighet betyder inte brist på tillgivenhet.",
      rules2: "Det betyder helt enkelt att veta vad man vill.",
      rules3: "Jessica behöver inte följa alla från rum till rum.",
      rules4: "Hon behöver inte vara centrum i varje ögonblick.",
      rules5: "Hon väljer när hon vill komma närmare.",
      rules6: "Hon väljer när hon vill stanna.",
      rules7: "Och på något sätt gör det ögonblicket när hon väljer dig ännu mer speciellt.",
      slowKicker: "En långsam eftermiddag",
      slowTitle: "SOLSKEN.<br>TYSTNAD.<br>PERFEKT.",
      slowText: "Ge Jessica en bekväm fåtölj, lite solsken och tillräckligt med lugn för att njuta av båda, så behövs nästan ingenting mer.",
      ritualKicker: "Små ritualer",
      ritualTitle: "SMÅ STUNDER<br>SPELAR ROLL",
      ritual1: "Varje personlighet har sina små ritualer.",
      ritual2: "Platserna vi återvänder till.",
      ritual3: "Sakerna som får oss att stanna upp.",
      ritual4: "De små stunderna som blir en del av en vanlig dag.",
      ritual5: "För Jessica kan till och med en enkel paus vid favoritskålen bli ett porträtt av koncentration.",
      finalKicker: "Omslagsstjärna 03",
      finalTitle: "STILLA<br>OFÖRGLÖMLIG",
      final1: "Det här är Jessica.",
      final2: "En brittisk korthår.",
      final3: "Mjuk grå päls.",
      final4: "Gyllene ögon.",
      final5: "Ett lugnt temperament.",
      final6: "En talang för att hitta rummets bekvämaste plats.",
      final7: "Tillräckligt nyfiken för att betrakta allt.",
      final8: "Tillräckligt självständig för att inte behöva delta i allt.",
      final9: "Mild, observant och helt bekväm med att vara precis den hon är.",
      final10: "Alla omslagsstjärnor behöver inte höras.",
      final11: "Vissa tittar bara på dig med gyllene ögon och blir omöjliga att glömma.",
      signature: "Möt",
      tagline: "En värld. Varje husdjur.",
      issueLink: "← Utgåva 01",
      homeLink: "Hem"
    },    /* ==================== DANISH ==================== */

    da: {
      heroKicker: "PETS & DOGUE · UDGAVE 01<br>FORSIDEHISTORIE",
      meet: "Mød",
      heroSub: "Blid<br>britisk dame.",
      heroText: "Rolig, observerende og vidunderligt selvstændig er Jessica den slags kat, der aldrig behøver at kræve opmærksomhed. Hun vælger ganske enkelt sit yndlingssted, betragter verden og lader alle andre opdage hende på hendes egne præmisser.",
      backIssue: "← Tilbage til Udgave 01",
      introKicker: "Stille selvsikkerhed ♥",
      introTitle: "Blød<br>udenpå.",
      introText: "En britisk korthår med smukke gyldne øjne, plysset grå pels og en helt egen personlighed. Jessica skynder sig ikke. Først observerer hun. Så beslutter hun.",
      profileKicker: "Jessicas profil",
      profileTitle: "ROLIG.<br>NYSGERRIG.<br>HELT SIG SELV.",
      profileSub: "Britisk korthår · professionel observatør",
      name: "<strong>Navn:</strong> Jessica",
      breed: "<strong>Race:</strong> britisk korthår",
      eyes: "<strong>Øjne:</strong> varme gyldne",
      coat: "<strong>Pels:</strong> blød, plysset og grå",
      personality: "<strong>Personlighed:</strong> rolig, observerende og selvstændig",
      favourite: "<strong>Favoritsted:</strong> et behageligt sted med god udsigt",
      afternoon: "<strong>Perfekt eftermiddag:</strong> solskin, ro og hendes yndlingsstol",
      feature: "<strong>Særligt kendetegn:</strong> stille selvsikkerhed",
      noHurry: "Ingen grund til at skynde sig.",
      hasTime: "JESSICA HAR TID.",
      observerKicker: "Hendes yndlings-tv",
      observerTitle: "VERDEN<br>UDENFOR",
      observerText: "Et vindue kan være et helt univers. Mennesker går forbi. Blade bevæger sig. Fugle dukker op og forsvinder. Lyset ændrer sig gennem dagen. Jessica kan betragte det hele uden nogensinde at behøve at være midt i det.",
      homeKicker: "Hjemmet er et rigtig godt sted ♥",
      homeTitle: "KUNSTEN<br>AT VÆRE TILPAS",
      home1: "Nogle dyr ønsker, at hver dag skal blive en ekspedition.",
      home2: "Jessica forstår en anden slags luksus.",
      home3: "En blød seng.",
      home4: "En varm plet af solskin.",
      home5: "Et velkendt vindue.",
      home6: "En fredelig have.",
      home7: "Et sted, hvor hun kan strække sig, lægge sig til rette og bare kigge.",
      home8: "Der er intet kedeligt ved at være hjemme, når man ved præcis, hvordan man nyder det.",
      pullquote: "Komfort er ikke dovenskab.<br>Det er en kunst.",
      momentsKicker: "Jessica-øjeblikke",
      momentsTitle: "HENDES FAVORIT<br>SLAGS DAG",
      softPlace: "Blødt sted ♥",
      softPlaceText: "Det perfekte sted til at lave absolut ingenting.",
      windowWatch: "Udkig fra vinduet",
      windowWatchText: "Der er altid noget, der er værd at lægge mærke til.",
      gardenTime: "Tid i haven 🌿",
      gardenTimeText: "Frisk luft, solskin og ingen unødvendig hast.",
      rulesKicker: "Hendes regler",
      rulesTitle: "KÆRLIGHED<br>PÅ HENDES PRÆMISSER",
      tag1: "👀 Observerende",
      tag2: "♥ Blid",
      tag3: "☁️ Blød",
      tag4: "🪟 Nysgerrig",
      tag5: "🌿 Fredelig",
      tag6: "⭐ Selvstændig",
      rules1: "Selvstændighed betyder ikke mangel på kærlighed.",
      rules2: "Det betyder ganske enkelt at vide, hvad man vil.",
      rules3: "Jessica behøver ikke følge alle fra rum til rum.",
      rules4: "Hun behøver ikke være centrum for hvert øjeblik.",
      rules5: "Hun vælger, hvornår hun kommer tættere på.",
      rules6: "Hun vælger, hvornår hun bliver.",
      rules7: "Og på en eller anden måde gør det øjeblikket, hvor hun vælger dig, endnu mere særligt.",
      slowKicker: "En rolig eftermiddag",
      slowTitle: "SOLSKIN.<br>STILHED.<br>PERFEKT.",
      slowText: "Giv Jessica en behagelig stol, lidt solskin og nok ro til at nyde begge dele, og der kræves næsten intet andet.",
      ritualKicker: "Små ritualer",
      ritualTitle: "SMÅ ØJEBLIKKE<br>BETYDER NOGET",
      ritual1: "Enhver personlighed har sine små ritualer.",
      ritual2: "Stederne vi vender tilbage til.",
      ritual3: "Tingene der får os til at standse.",
      ritual4: "De små øjeblikke der bliver en del af en almindelig dag.",
      ritual5: "For Jessica kan selv en enkel pause ved yndlingsskålen blive et portræt af koncentration.",
      finalKicker: "Forsidestjerne 03",
      finalTitle: "STILLE<br>UFORGLEMMELIG",
      final1: "Det er Jessica.",
      final2: "En britisk korthår.",
      final3: "Blød grå pels.",
      final4: "Gyldne øjne.",
      final5: "Et roligt væsen.",
      final6: "Et talent for at finde det mest behagelige sted i rummet.",
      final7: "Nysgerrig nok til at betragte alt.",
      final8: "Selvstændig nok til ikke at behøve at deltage i alt.",
      final9: "Blid, observerende og helt tilpas med at være præcis den, hun er.",
      final10: "Ikke enhver forsidestjerne behøver at larme.",
      final11: "Nogle ser bare på dig med gyldne øjne og bliver umulige at glemme.",
      signature: "Mød",
      tagline: "Én verden. Hvert kæledyr.",
      issueLink: "← Udgave 01",
      homeLink: "Hjem"
    },

    /* ==================== NORWEGIAN ==================== */

    no: {
      heroKicker: "PETS & DOGUE · UTGAVE 01<br>FORSIDEHISTORIE",
      meet: "Møt",
      heroSub: "Mild<br>britisk dame.",
      heroText: "Rolig, observant og herlig selvstendig er Jessica den typen katt som aldri trenger å kreve oppmerksomhet. Hun velger ganske enkelt favorittplassen sin, betrakter verden og lar andre oppdage henne på hennes egne premisser.",
      backIssue: "← Tilbake til Utgave 01",
      introKicker: "Stille selvtillit ♥",
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
      favourite: "<strong>Favorittsted:</strong> et komfortabelt sted med god utsikt",
      afternoon: "<strong>Perfekt ettermiddag:</strong> solskinn, ro og favorittstolen hennes",
      feature: "<strong>Spesielt kjennetegn:</strong> stille selvtillit",
      noHurry: "Ingen grunn til å skynde seg.",
      hasTime: "JESSICA HAR TID.",
      observerKicker: "Favoritt-TV-en hennes",
      observerTitle: "VERDEN<br>UTENFOR",
      observerText: "Et vindu kan være et helt univers. Mennesker går forbi. Blader beveger seg. Fugler dukker opp og forsvinner. Lyset endrer seg gjennom dagen. Jessica kan betrakte alt uten å måtte være midt i det.",
      homeKicker: "Hjemme er et veldig godt sted ♥",
      homeTitle: "KUNSTEN<br>Å HA DET GODT",
      home1: "Noen dyr ønsker at hver dag skal bli en ekspedisjon.",
      home2: "Jessica forstår en annen type luksus.",
      home3: "En myk seng.",
      home4: "En varm flekk med solskinn.",
      home5: "Et kjent vindu.",
      home6: "En fredelig hage.",
      home7: "Et sted hvor hun kan strekke seg, slå seg ned og bare se.",
      home8: "Det er ingenting kjedelig ved å være hjemme når man vet nøyaktig hvordan man skal nyte det.",
      pullquote: "Komfort er ikke latskap.<br>Det er en kunst.",
      momentsKicker: "Jessica-øyeblikk",
      momentsTitle: "HENNES FAVORITT<br>TYPE DAG",
      softPlace: "Mykt sted ♥",
      softPlaceText: "Det perfekte stedet for å gjøre absolutt ingenting.",
      windowWatch: "Utsikt fra vinduet",
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
      rules3: "Jessica trenger ikke følge alle fra rom til rom.",
      rules4: "Hun trenger ikke være sentrum i hvert øyeblikk.",
      rules5: "Hun velger når hun vil komme nærmere.",
      rules6: "Hun velger når hun vil bli.",
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
      ritual5: "For Jessica kan selv en enkel pause ved favorittskålen bli et portrett av konsentrasjon.",
      finalKicker: "Forsidestjerne 03",
      finalTitle: "STILLE<br>UFORGLEMMELIG",
      final1: "Dette er Jessica.",
      final2: "En britisk korthår.",
      final3: "Myk grå pels.",
      final4: "Gylne øyne.",
      final5: "Et rolig vesen.",
      final6: "Et talent for å finne det mest komfortable stedet i rommet.",
      final7: "Nysgjerrig nok til å betrakte alt.",
      final8: "Selvstendig nok til ikke å måtte delta i alt.",
      final9: "Mild, observant og helt komfortabel med å være akkurat den hun er.",
      final10: "Ikke alle forsidestjerner trenger å lage lyd.",
      final11: "Noen ser ganske enkelt på deg med gylne øyne og blir umulige å glemme.",
      signature: "Møt",
      tagline: "Én verden. Hvert kjæledyr.",
      issueLink: "← Utgave 01",
      homeLink: "Hjem"
    },

    /* ==================== FINNISH ==================== */

    fi: {
      heroKicker: "PETS & DOGUE · NUMERO 01<br>KANSITARINA",
      meet: "Tutustu",
      heroSub: "Lempeä<br>brittiläinen lady.",
      heroText: "Rauhallinen, tarkkaileva ja ihanan itsenäinen Jessica on kissa, jonka ei koskaan tarvitse vaatia huomiota. Hän valitsee lempipaikkansa, tarkkailee maailmaa ja antaa muiden tutustua häneen hänen omilla ehdoillaan.",
      backIssue: "← Takaisin numeroon 01",
      introKicker: "Hiljainen itsevarmuus ♥",
      introTitle: "Pehmeä<br>ulkoa.",
      introText: "Brittiläinen lyhytkarva, jolla on kauniit kultaiset silmät, pehmeä harmaa turkki ja täysin oma luonne. Jessicalla ei ole kiire. Ensin hän tarkkailee. Sitten hän päättää.",
      profileKicker: "Jessican profiili",
      profileTitle: "RAUHALLINEN.<br>UTELIAS.<br>TÄYSIN OMA ITSENSÄ.",
      profileSub: "Brittiläinen lyhytkarva · ammattimainen tarkkailija",
      name: "<strong>Nimi:</strong> Jessica",
      breed: "<strong>Rotu:</strong> brittiläinen lyhytkarva",
      eyes: "<strong>Silmät:</strong> lämpimän kultaiset",
      coat: "<strong>Turkki:</strong> pehmeä, tuuhea ja harmaa",
      personality: "<strong>Luonne:</strong> rauhallinen, tarkkaileva ja itsenäinen",
      favourite: "<strong>Lempipaikka:</strong> mukava paikka hyvällä näkymällä",
      afternoon: "<strong>Täydellinen iltapäivä:</strong> aurinko, rauha ja hänen lempituolinsa",
      feature: "<strong>Erityispiirre:</strong> hiljainen itsevarmuus",
      noHurry: "Ei ole kiirettä.",
      hasTime: "JESSICALLA ON AIKAA.",
      observerKicker: "Hänen suosikkitelevisionsa",
      observerTitle: "MAAILMA<br>ULKONA",
      observerText: "Ikkuna voi olla kokonainen maailmankaikkeus. Ohikulkevia ihmisiä. Liikkuvia lehtiä. Lintuja, jotka ilmestyvät ja katoavat. Päivän aikana muuttuva valo. Jessica voi tarkkailla kaikkea olematta itse tapahtumien keskellä.",
      homeKicker: "Koti on erittäin hyvä paikka ♥",
      homeTitle: "MUKAVUUDEN<br>TAITO",
      home1: "Jotkut eläimet haluavat jokaisen päivän olevan seikkailu.",
      home2: "Jessica ymmärtää toisenlaisen ylellisyyden.",
      home3: "Pehmeä sänky.",
      home4: "Lämmin auringonläikkä.",
      home5: "Tuttu ikkuna.",
      home6: "Rauhallinen puutarha.",
      home7: "Paikka, jossa voi venytellä, asettua mukavasti ja vain katsella.",
      home8: "Kotona olemisessa ei ole mitään tylsää, kun tietää tarkalleen, kuinka siitä nautitaan.",
      pullquote: "Mukavuus ei ole laiskuutta.<br>Se on taidetta.",
      momentsKicker: "Jessica-hetkiä",
      momentsTitle: "HÄNEN LEMPIPÄIVÄNSÄ",
      softPlace: "Pehmeä paikka ♥",
      softPlaceText: "Täydellinen paikka olla tekemättä yhtään mitään.",
      windowWatch: "Ikkunasta tarkkailu",
      windowWatchText: "Aina löytyy jotain huomion arvoista.",
      gardenTime: "Aikaa puutarhassa 🌿",
      gardenTimeText: "Raikasta ilmaa, aurinkoa eikä turhaa kiirettä.",
      rulesKicker: "Hänen sääntönsä",
      rulesTitle: "HELLEYS<br>HÄNEN EHDOILLAAN",
      tag1: "👀 Tarkkaileva",
      tag2: "♥ Lempeä",
      tag3: "☁️ Pehmeä",
      tag4: "🪟 Utelias",
      tag5: "🌿 Rauhallinen",
      tag6: "⭐ Itsenäinen",
      rules1: "Itsenäisyys ei tarkoita hellyyden puutetta.",
      rules2: "Se tarkoittaa yksinkertaisesti sitä, että tietää mitä haluaa.",
      rules3: "Jessican ei tarvitse seurata kaikkia huoneesta toiseen.",
      rules4: "Hänen ei tarvitse olla jokaisen hetken keskipiste.",
      rules5: "Hän valitsee, milloin tulee lähemmäs.",
      rules6: "Hän valitsee, milloin jää.",
      rules7: "Ja siksi hetki, jolloin hän valitsee sinut, tuntuu vielä erityisemmältä.",
      slowKicker: "Rauhallinen iltapäivä",
      slowTitle: "AURINKO.<br>HILJAISUUS.<br>TÄYDELLISTÄ.",
      slowText: "Anna Jessicalle mukava tuoli, hieman aurinkoa ja tarpeeksi rauhaa nauttia molemmista, eikä juuri muuta tarvita.",
      ritualKicker: "Pienet rituaalit",
      ritualTitle: "PIENILLÄ HETKILLÄ<br>ON MERKITYSTÄ",
      ritual1: "Jokaisella persoonalla on pienet rituaalinsa.",
      ritual2: "Paikat, joihin palaamme.",
      ritual3: "Asiat, jotka saavat meidät pysähtymään.",
      ritual4: "Pienet hetket, joista tulee osa tavallista päivää.",
      ritual5: "Jessicalle jopa pieni pysähdys lempikulhon vieressä voi muuttua keskittymisen muotokuvaksi.",
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
      final9: "Lempeä, tarkkaileva ja täysin tyytyväinen olemaan juuri sellainen kuin on.",
      final10: "Jokaisen kansitähden ei tarvitse pitää ääntä.",
      final11: "Jotkut vain katsovat sinua kultaisilla silmillään ja muuttuvat mahdottomiksi unohtaa.",
      signature: "Tutustu",
      tagline: "Yksi maailma. Jokainen lemmikki.",
      issueLink: "← Numero 01",
      homeLink: "Etusivu"
    },

    /* ==================== HUNGARIAN ==================== */

    hu: {
      heroKicker: "PETS & DOGUE · 01. SZÁM<br>CÍMLAPTÖRTÉNET",
      meet: "Ismerd meg",
      heroSub: "Szelíd<br>brit hölgy.",
      heroText: "Nyugodt, figyelmes és csodálatosan független Jessica olyan macska, akinek soha nem kell követelnie a figyelmet. Egyszerűen kiválasztja kedvenc helyét, figyeli a világot, és hagyja, hogy mások az ő feltételei szerint ismerjék meg.",
      backIssue: "← Vissza az 01. számhoz",
      introKicker: "Csendes magabiztosság ♥",
      introTitle: "Puha<br>kívül.",
      introText: "Egy brit rövidszőrű gyönyörű aranyszínű szemekkel, plüssös szürke bundával és teljesen saját személyiséggel. Jessica nem siet. Először megfigyel. Aztán dönt.",
      profileKicker: "Jessica profilja",
      profileTitle: "NYUGODT.<br>KÍVÁNCSI.<br>TELJESEN ÖNMAGA.",
      profileSub: "Brit rövidszőrű · profi megfigyelő",
      name: "<strong>Név:</strong> Jessica",
      breed: "<strong>Fajta:</strong> brit rövidszőrű",
      eyes: "<strong>Szemek:</strong> meleg aranyszínűek",
      coat: "<strong>Bunda:</strong> puha, plüssös és szürke",
      personality: "<strong>Személyiség:</strong> nyugodt, figyelmes és független",
      favourite: "<strong>Kedvenc hely:</strong> valahol kényelmesen, jó kilátással",
      afternoon: "<strong>Tökéletes délután:</strong> napsütés, nyugalom és a kedvenc fotelje",
      feature: "<strong>Különleges tulajdonság:</strong> csendes magabiztosság",
      noHurry: "Semmi szükség sietségre.",
      hasTime: "JESSICÁNAK VAN IDEJE.",
      observerKicker: "A kedvenc televíziója",
      observerTitle: "A VILÁG<br>ODAKINT",
      observerText: "Egy ablak egy egész univerzum lehet. Elhaladó emberek. Mozgó levelek. Felbukkanó és eltűnő madarak. A nap folyamán változó fény. Jessica mindezt megfigyelheti anélkül, hogy a középpontban kellene lennie.",
      homeKicker: "Az otthon nagyon jó hely ♥",
      homeTitle: "A KÉNYELEM<br>MŰVÉSZETE",
      home1: "Néhány állat azt szeretné, hogy minden nap expedíció legyen.",
      home2: "Jessica a luxus egy másik formáját érti.",
      home3: "Egy puha ágy.",
      home4: "Egy meleg napsütötte folt.",
      home5: "Egy ismerős ablak.",
      home6: "Egy békés kert.",
      home7: "Egy hely, ahol kinyújtózhat, elhelyezkedhet és egyszerűen figyelhet.",
      home8: "Az otthonlét egyáltalán nem unalmas, ha pontosan tudod, hogyan élvezd.",
      pullquote: "A kényelem nem lustaság.<br>Művészet.",
      momentsKicker: "Jessica pillanatai",
      momentsTitle: "A KEDVENC<br>NAPFAJTÁJA",
      softPlace: "Puha hely ♥",
      softPlaceText: "A tökéletes hely arra, hogy egyáltalán semmit se csináljon.",
      windowWatch: "Ablakból figyelés",
      windowWatchText: "Mindig akad valami, amit érdemes észrevenni.",
      gardenTime: "Kerti idő 🌿",
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
      rules5: "Ő dönti el, mikor jön közelebb.",
      rules6: "Ő dönti el, mikor marad.",
      rules7: "És ettől a pillanat, amikor téged választ, még különlegesebbnek érződik.",
      slowKicker: "Egy lassú délután",
      slowTitle: "NAPFÉNY.<br>CSEND.<br>TÖKÉLETES.",
      slowText: "Adj Jessicának egy kényelmes fotelt, egy kis napsütést és elég nyugalmat ahhoz, hogy mindkettőt élvezhesse, és szinte semmi másra nincs szüksége.",
      ritualKicker: "Kis rituálék",
      ritualTitle: "A KIS PILLANATOK<br>SZÁMÍTANAK",
      ritual1: "Minden személyiségnek megvannak a kis rituáléi.",
      ritual2: "A helyek, ahová visszatérünk.",
      ritual3: "A dolgok, amelyek megállásra késztetnek.",
      ritual4: "Az apró pillanatok, amelyek egy hétköznapi nap részévé válnak.",
      ritual5: "Jessica számára még egy egyszerű megállás is a kedvenc tálkája mellett a koncentráció portréjává válhat.",
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
      tagline: "Egy világ. Minden kedvenc.",
      issueLink: "← 01. szám",
      homeLink: "Főoldal"
    },    /* ==================== ARABIC ==================== */

    ar: {
      heroKicker: "PETS & DOGUE · العدد 01<br>قصة الغلاف",
      meet: "تعرّفوا على",
      heroSub: "سيدة بريطانية<br>رقيقة.",
      heroText: "هادئة، شديدة الملاحظة ومستقلة بشكل رائع، Jessica هي القطة التي لا تحتاج أبداً إلى المطالبة بالاهتمام. فهي تختار ببساطة مكانها المفضل، تراقب العالم وتدع الآخرين يكتشفونها وفق شروطها الخاصة.",
      backIssue: "← العودة إلى العدد 01",
      introKicker: "ثقة هادئة ♥",
      introTitle: "ناعمة<br>من الخارج.",
      introText: "قطة بريطانية قصيرة الشعر ذات عيون ذهبية جميلة، وفراء رمادي ناعم وشخصية خاصة بها تماماً. Jessica لا تتعجل. تراقب أولاً. ثم تقرر.",
      profileKicker: "ملف Jessica",
      profileTitle: "هادئة.<br>فضولية.<br>نفسها تماماً.",
      profileSub: "بريطانية قصيرة الشعر · مراقِبة محترفة",
      name: "<strong>الاسم:</strong> Jessica",
      breed: "<strong>السلالة:</strong> بريطانية قصيرة الشعر",
      eyes: "<strong>العيون:</strong> ذهبية دافئة",
      coat: "<strong>الفراء:</strong> ناعم وكثيف ورمادي",
      personality: "<strong>الشخصية:</strong> هادئة، ملاحِظة ومستقلة",
      favourite: "<strong>المكان المفضل:</strong> مكان مريح يتمتع بإطلالة جميلة",
      afternoon: "<strong>بعد الظهر المثالي:</strong> أشعة الشمس والهدوء وكرسيها المفضل",
      feature: "<strong>الميزة الخاصة:</strong> الثقة الهادئة",
      noHurry: "لا حاجة إلى العجلة.",
      hasTime: "JESSICA لديها الوقت.",
      observerKicker: "تلفازها المفضل",
      observerTitle: "العالم<br>في الخارج",
      observerText: "يمكن للنافذة أن تكون عالماً كاملاً. أشخاص يمرون. أوراق تتحرك. طيور تظهر وتختفي. ضوء يتغير طوال اليوم. تستطيع Jessica مشاهدة كل ذلك دون أن تحتاج إلى أن تكون في وسط الأحداث.",
      homeKicker: "المنزل مكان رائع ♥",
      homeTitle: "فن<br>الراحة",
      home1: "بعض الحيوانات تريد أن يتحول كل يوم إلى مغامرة.",
      home2: "أما Jessica فتفهم نوعاً آخر من الرفاهية.",
      home3: "سرير ناعم.",
      home4: "بقعة دافئة من أشعة الشمس.",
      home5: "نافذة مألوفة.",
      home6: "حديقة هادئة.",
      home7: "مكان تستطيع فيه أن تتمدد، تستريح وتكتفي بالمشاهدة.",
      home8: "لا يوجد شيء ممل في البقاء في المنزل عندما تعرف تماماً كيف تستمتع به.",
      pullquote: "الراحة ليست كسلاً.<br>إنها فن.",
      momentsKicker: "لحظات Jessica",
      momentsTitle: "نوع يومها<br>المفضل",
      softPlace: "مكان ناعم ♥",
      softPlaceText: "المكان المثالي لعدم فعل أي شيء على الإطلاق.",
      windowWatch: "المراقبة من النافذة",
      windowWatchText: "هناك دائماً شيء يستحق الملاحظة.",
      gardenTime: "وقت الحديقة 🌿",
      gardenTimeText: "هواء نقي، أشعة شمس، ولا داعي لأي عجلة.",
      rulesKicker: "قواعدها",
      rulesTitle: "المودة<br>وفق شروطها",
      tag1: "👀 ملاحِظة",
      tag2: "♥ رقيقة",
      tag3: "☁️ ناعمة",
      tag4: "🪟 فضولية",
      tag5: "🌿 هادئة",
      tag6: "⭐ مستقلة",
      rules1: "الاستقلال لا يعني غياب المودة.",
      rules2: "إنه يعني ببساطة أن تعرف ما تريد.",
      rules3: "لا تحتاج Jessica إلى متابعة الجميع من غرفة إلى أخرى.",
      rules4: "ولا تحتاج إلى أن تكون محور كل لحظة.",
      rules5: "هي التي تختار متى تقترب.",
      rules6: "وهي التي تختار متى تبقى.",
      rules7: "وبطريقة ما، يجعل ذلك اللحظة التي تختارك فيها أكثر تميزاً.",
      slowKicker: "بعد ظهر هادئ",
      slowTitle: "شمس.<br>هدوء.<br>مثالي.",
      slowText: "امنح Jessica كرسياً مريحاً، قليلاً من أشعة الشمس وما يكفي من الهدوء للاستمتاع بكليهما، ولن تحتاج إلى الكثير بعد ذلك.",
      ritualKicker: "طقوس صغيرة",
      ritualTitle: "اللحظات الصغيرة<br>مهمة",
      ritual1: "لكل شخصية طقوسها الصغيرة.",
      ritual2: "الأماكن التي نعود إليها.",
      ritual3: "الأشياء التي تجعلنا نتوقف.",
      ritual4: "اللحظات الصغيرة التي تصبح جزءاً من يوم عادي.",
      ritual5: "بالنسبة إلى Jessica، حتى التوقف البسيط بجانب وعائها المفضل يمكن أن يتحول إلى صورة كاملة للتركيز.",
      finalKicker: "نجمة الغلاف 03",
      finalTitle: "هادئة<br>ولا تُنسى",
      final1: "هذه هي Jessica.",
      final2: "قطة بريطانية قصيرة الشعر.",
      final3: "فراء رمادي ناعم.",
      final4: "عيون ذهبية.",
      final5: "طبيعة هادئة.",
      final6: "موهبة في العثور على أكثر مكان مريح في الغرفة.",
      final7: "فضولية بما يكفي لمراقبة كل شيء.",
      final8: "ومستقلة بما يكفي كي لا تحتاج إلى المشاركة في كل شيء.",
      final9: "رقيقة، ملاحِظة ومرتاحة تماماً لأن تكون كما هي.",
      final10: "ليس على كل نجمة غلاف أن تصنع ضجيجاً.",
      final11: "بعضها يكتفي بالنظر إليك بعيون ذهبية ويصبح من المستحيل نسيانه.",
      signature: "تعرّفوا على",
      tagline: "عالم واحد. كل حيوان أليف.",
      issueLink: "← العدد 01",
      homeLink: "الرئيسية"
    },

    /* ==================== HINDI ==================== */

    hi: {
      heroKicker: "PETS & DOGUE · अंक 01<br>कवर स्टोरी",
      meet: "मिलिए",
      heroSub: "एक सौम्य<br>ब्रिटिश लेडी से।",
      heroText: "शांत, सजग और खूबसूरती से स्वतंत्र Jessica ऐसी बिल्ली है जिसे ध्यान पाने के लिए कभी मांग नहीं करनी पड़ती। वह बस अपनी पसंदीदा जगह चुनती है, दुनिया को देखती है और बाकी सभी को अपनी शर्तों पर उसे जानने देती है।",
      backIssue: "← अंक 01 पर वापस जाएँ",
      introKicker: "शांत आत्मविश्वास ♥",
      introTitle: "बाहर से<br>नरम।",
      introText: "खूबसूरत सुनहरी आँखों, मुलायम धूसर फर और पूरी तरह अपनी अलग शख्सियत वाली एक British Shorthair। Jessica जल्दी नहीं करती। पहले वह देखती है। फिर फैसला करती है।",
      profileKicker: "Jessica की प्रोफ़ाइल",
      profileTitle: "शांत।<br>जिज्ञासु।<br>पूरी तरह खुद।",
      profileSub: "British Shorthair · पेशेवर पर्यवेक्षक",
      name: "<strong>नाम:</strong> Jessica",
      breed: "<strong>नस्ल:</strong> British Shorthair",
      eyes: "<strong>आँखें:</strong> गर्म सुनहरी",
      coat: "<strong>फर:</strong> मुलायम, घना और धूसर",
      personality: "<strong>स्वभाव:</strong> शांत, सजग और स्वतंत्र",
      favourite: "<strong>पसंदीदा जगह:</strong> कोई आरामदायक जगह जहाँ से अच्छा दृश्य दिखाई दे",
      afternoon: "<strong>आदर्श दोपहर:</strong> धूप, शांति और उसकी पसंदीदा कुर्सी",
      feature: "<strong>खासियत:</strong> शांत आत्मविश्वास",
      noHurry: "जल्दी करने की कोई जरूरत नहीं।",
      hasTime: "JESSICA के पास समय है।",
      observerKicker: "उसका पसंदीदा टेलीविज़न",
      observerTitle: "बाहर की<br>दुनिया",
      observerText: "एक खिड़की अपने आप में पूरी दुनिया हो सकती है। गुजरते लोग। हिलते पत्ते। आते-जाते पक्षी। दिन भर बदलती रोशनी। Jessica यह सब देख सकती है, बिना खुद हर घटना के बीच में आए।",
      homeKicker: "घर एक बहुत अच्छी जगह है ♥",
      homeTitle: "आराम से रहने<br>की कला",
      home1: "कुछ जानवर चाहते हैं कि हर दिन एक नई यात्रा बन जाए।",
      home2: "Jessica एक अलग तरह की विलासिता समझती है।",
      home3: "एक मुलायम बिस्तर।",
      home4: "धूप की गर्म जगह।",
      home5: "एक जानी-पहचानी खिड़की।",
      home6: "एक शांत बगीचा।",
      home7: "एक ऐसी जगह जहाँ वह फैलकर बैठ सके, आराम कर सके और बस दुनिया को देख सके।",
      home8: "घर पर रहने में कुछ भी उबाऊ नहीं है, अगर आप जानते हैं कि उसका आनंद कैसे लेना है।",
      pullquote: "आराम आलस नहीं है।<br>यह एक कला है।",
      momentsKicker: "Jessica के पल",
      momentsTitle: "उसका पसंदीदा<br>दिन",
      softPlace: "मुलायम जगह ♥",
      softPlaceText: "बिल्कुल कुछ न करने के लिए एकदम सही जगह।",
      windowWatch: "खिड़की से देखना",
      windowWatchText: "हमेशा कुछ न कुछ ऐसा होता है जिसे देखना सार्थक होता है।",
      gardenTime: "बगीचे का समय 🌿",
      gardenTimeText: "ताज़ी हवा, धूप और बिना किसी बेवजह की जल्दी के।",
      rulesKicker: "उसके नियम",
      rulesTitle: "प्यार<br>उसकी शर्तों पर",
      tag1: "👀 सजग",
      tag2: "♥ सौम्य",
      tag3: "☁️ मुलायम",
      tag4: "🪟 जिज्ञासु",
      tag5: "🌿 शांत",
      tag6: "⭐ स्वतंत्र",
      rules1: "स्वतंत्रता का अर्थ प्यार की कमी नहीं है।",
      rules2: "इसका अर्थ बस यह जानना है कि आप क्या चाहते हैं।",
      rules3: "Jessica को हर किसी के पीछे एक कमरे से दूसरे कमरे तक जाने की जरूरत नहीं है।",
      rules4: "उसे हर पल का केंद्र बनने की जरूरत नहीं है।",
      rules5: "वह खुद चुनती है कि कब पास आना है।",
      rules6: "वह खुद चुनती है कि कब रुकना है।",
      rules7: "और शायद इसी वजह से जब वह आपको चुनती है, तो वह पल और भी खास लगता है।",
      slowKicker: "एक धीमी दोपहर",
      slowTitle: "धूप।<br>शांति।<br>परफेक्ट।",
      slowText: "Jessica को एक आरामदायक कुर्सी, थोड़ी धूप और दोनों का आनंद लेने के लिए पर्याप्त शांति दे दीजिए — फिर उसे बहुत कम चीजों की जरूरत होती है।",
      ritualKicker: "छोटी रस्में",
      ritualTitle: "छोटे पल<br>महत्वपूर्ण हैं",
      ritual1: "हर व्यक्तित्व की अपनी छोटी-छोटी आदतें होती हैं।",
      ritual2: "वे जगहें जहाँ हम बार-बार लौटते हैं।",
      ritual3: "वे चीजें जो हमें रुकने पर मजबूर करती हैं।",
      ritual4: "वे छोटे पल जो एक साधारण दिन का हिस्सा बन जाते हैं।",
      ritual5: "Jessica के लिए उसकी पसंदीदा कटोरी के पास एक छोटा सा विराम भी पूरी एकाग्रता की तस्वीर बन सकता है।",
      finalKicker: "कवर स्टार 03",
      finalTitle: "शांत लेकिन<br>अविस्मरणीय",
      final1: "तो यह है Jessica।",
      final2: "एक British Shorthair।",
      final3: "मुलायम धूसर फर।",
      final4: "सुनहरी आँखें।",
      final5: "शांत स्वभाव।",
      final6: "कमरे में सबसे आरामदायक जगह खोज लेने की प्रतिभा।",
      final7: "हर चीज़ को देखने के लिए पर्याप्त जिज्ञासु।",
      final8: "और हर चीज़ में शामिल न होने के लिए पर्याप्त स्वतंत्र।",
      final9: "सौम्य, सजग और जैसी वह है, वैसी ही रहने में पूरी तरह सहज।",
      final10: "हर कवर स्टार को शोर मचाने की जरूरत नहीं होती।",
      final11: "कुछ बस अपनी सुनहरी आँखों से आपको देखते हैं और उन्हें भूलना असंभव हो जाता है।",
      signature: "मिलिए",
      tagline: "एक दुनिया। हर पालतू।",
      issueLink: "← अंक 01",
      homeLink: "होम"
    }

  };

  /* =========================================================
     LANGUAGE HELPERS
     ========================================================= */

  function normalizeLanguage(value) {
    if (!value) return null;

    const raw = String(value)
      .trim()
      .toLowerCase()
      .replace("_", "-");

    const short = raw.split("-")[0];
    const normalized = ALIASES[short] || short;

    return SUPPORTED.includes(normalized) ? normalized : null;
  }

  function getLanguageFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      return normalizeLanguage(params.get("lang"));
    } catch (error) {
      return null;
    }
  }

  function getStoredLanguage() {
    try {
      return normalizeLanguage(localStorage.getItem(STORE_KEY));
    } catch (error) {
      return null;
    }
  }

  function getDocumentLanguage() {
    return normalizeLanguage(
      document.documentElement.getAttribute("lang")
    );
  }

  function getInitialLanguage() {
    return (
      getLanguageFromUrl() ||
      getStoredLanguage() ||
      getDocumentLanguage() ||
      "en"
    );
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(STORE_KEY, lang);
    } catch (error) {
      /* localStorage may be unavailable */
    }
  }

  function updateDocumentDirection(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL.has(lang) ? "rtl" : "ltr";
  }

  function updateUrlLanguage(lang) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);

      window.history.replaceState(
        window.history.state,
        "",
        url.pathname + url.search + url.hash
      );
    } catch (error) {
      /* Keep page working even if URL API is unavailable */
    }
  }

  /* =========================================================
     TEXT BINDING
     Supports:
       data-i18n="key"
       data-i18n-html="key"
       data-i18n-aria="key"
       data-i18n-title="key"
       data-i18n-placeholder="key"
     ========================================================= */

  function translateElements(dictionary) {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");

      if (
        key &&
        Object.prototype.hasOwnProperty.call(dictionary, key)
      ) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-html");

      if (
        key &&
        Object.prototype.hasOwnProperty.call(dictionary, key)
      ) {
        element.innerHTML = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-aria");

      if (
        key &&
        Object.prototype.hasOwnProperty.call(dictionary, key)
      ) {
        element.setAttribute("aria-label", dictionary[key]);
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-title");

      if (
        key &&
        Object.prototype.hasOwnProperty.call(dictionary, key)
      ) {
        element.setAttribute("title", dictionary[key]);
      }
    });

    document
      .querySelectorAll("[data-i18n-placeholder]")
      .forEach(function (element) {
        const key = element.getAttribute("data-i18n-placeholder");

        if (
          key &&
          Object.prototype.hasOwnProperty.call(dictionary, key)
        ) {
          element.setAttribute("placeholder", dictionary[key]);
        }
      });
  }

  /* =========================================================
     LINKS
     Keep selected language when moving between
     Jessica / Issue 01 / Home and other internal pages.
     ========================================================= */

  function isInternalLink(anchor) {
    const href = anchor.getAttribute("href");

    if (!href) return false;
    if (href.startsWith("#")) return false;
    if (href.startsWith("mailto:")) return false;
    if (href.startsWith("tel:")) return false;
    if (href.startsWith("javascript:")) return false;

    try {
      const url = new URL(href, window.location.href);
      return url.origin === window.location.origin;
    } catch (error) {
      return false;
    }
  }

  function preserveLanguageInLinks(lang) {
    document.querySelectorAll("a[href]").forEach(function (anchor) {
      if (!isInternalLink(anchor)) return;

      try {
        const url = new URL(
          anchor.getAttribute("href"),
          window.location.href
        );

        url.searchParams.set("lang", lang);

        anchor.setAttribute(
          "href",
          url.pathname + url.search + url.hash
        );
      } catch (error) {
        /* Ignore malformed links */
      }
    });
  }

  /* =========================================================
     LANGUAGE CONTROLS
     Works with:
       [data-language]
       [data-lang]
       select[data-language-select]
       select[data-lang-select]
       #languageSelect
       #language-select
     ========================================================= */

  function syncLanguageControls(lang) {
    document
      .querySelectorAll("[data-language], [data-lang]")
      .forEach(function (control) {
        const controlLang = normalizeLanguage(
          control.getAttribute("data-language") ||
          control.getAttribute("data-lang")
        );

        const active = controlLang === lang;

        control.classList.toggle("is-active", active);
        control.setAttribute(
          "aria-pressed",
          active ? "true" : "false"
        );
      });

    document
      .querySelectorAll(
        "select[data-language-select], " +
        "select[data-lang-select], " +
        "#languageSelect, " +
        "#language-select"
      )
      .forEach(function (select) {
        const hasOption = Array.from(select.options || []).some(
          function (option) {
            return normalizeLanguage(option.value) === lang;
          }
        );

        if (hasOption) {
          const matchingOption = Array.from(select.options).find(
            function (option) {
              return normalizeLanguage(option.value) === lang;
            }
          );

          if (matchingOption) {
            select.value = matchingOption.value;
          }
        }
      });
  }

  /* =========================================================
     APPLY LANGUAGE
     ========================================================= */

  function applyLanguage(requestedLanguage, options) {
    const settings = options || {};

    const lang =
      normalizeLanguage(requestedLanguage) ||
      getStoredLanguage() ||
      "en";

    const dictionary = T[lang] || T.en;

    updateDocumentDirection(lang);
    translateElements(dictionary);
    saveLanguage(lang);

    if (settings.updateUrl !== false) {
      updateUrlLanguage(lang);
    }

    preserveLanguageInLinks(lang);
    syncLanguageControls(lang);

    document.dispatchEvent(
      new CustomEvent("petsdogue:languagechange", {
        detail: {
          language: lang
        }
      })
    );

    return lang;
  }

  /* =========================================================
     CLICK / CHANGE EVENTS
     ========================================================= */

  function bindLanguageControls() {
    document.addEventListener("click", function (event) {
      const control = event.target.closest(
        "[data-language], [data-lang]"
      );

      if (!control) return;

      const lang = normalizeLanguage(
        control.getAttribute("data-language") ||
        control.getAttribute("data-lang")
      );

      if (!lang) return;

      event.preventDefault();

      applyLanguage(lang, {
        updateUrl: true
      });
    });

    document.addEventListener("change", function (event) {
      const select = event.target.closest(
        "select[data-language-select], " +
        "select[data-lang-select], " +
        "#languageSelect, " +
        "#language-select"
      );

      if (!select) return;

      const lang = normalizeLanguage(select.value);

      if (!lang) return;

      applyLanguage(lang, {
        updateUrl: true
      });
    });
  }

  /* =========================================================
     BROWSER BACK / FORWARD

     Important:
     If the visitor goes back to Issue 01, the selected
     language remains active instead of returning to English.
     ========================================================= */

  function bindHistory() {
    window.addEventListener("popstate", function () {
      const lang =
        getLanguageFromUrl() ||
        getStoredLanguage() ||
        "en";

      applyLanguage(lang, {
        updateUrl: false
      });
    });

    window.addEventListener("pageshow", function () {
      const lang =
        getLanguageFromUrl() ||
        getStoredLanguage() ||
        "en";

      applyLanguage(lang, {
        updateUrl: false
      });
    });
  }

  /* =========================================================
     STORAGE SYNC
     If language changes in another PETS & DOGUE tab,
     keep this page synchronized.
     ========================================================= */

  function bindStorageSync() {
    window.addEventListener("storage", function (event) {
      if (event.key !== STORE_KEY) return;

      const lang = normalizeLanguage(event.newValue);

      if (!lang) return;

      applyLanguage(lang, {
        updateUrl: true
      });
    });
  }

  /* =========================================================
     PUBLIC LANGUAGE BRIDGE

     Other PETS & DOGUE scripts can use:
       window.PetsDogueLanguage.set("uk")
       window.PetsDogueLanguage.get()
     ========================================================= */

  window.PetsDogueLanguage = {
    supported: SUPPORTED.slice(),

    normalize: normalizeLanguage,

    get: function () {
      return (
        getLanguageFromUrl() ||
        getStoredLanguage() ||
        "en"
      );
    },

    set: function (lang) {
      return applyLanguage(lang, {
        updateUrl: true
      });
    },

    translations: T
  };

  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function init() {
    bindLanguageControls();
    bindHistory();
    bindStorageSync();

    applyLanguage(getInitialLanguage(), {
      updateUrl: true
    });

    document.documentElement.classList.add(
      "pets-dogue-i18n-ready"
    );
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

})();
