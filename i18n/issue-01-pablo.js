/* =========================================================
   PETS & DOGUE — ISSUE 01 — PABLO
   STATIC MULTILINGUAL STORY
   23 LANGUAGES · NO API
   Arabic RTL · Hindi · persistent language
   Issue 01 → Pablo language sync
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

  /*
   * IMPORTANT
   *
   * Pablo's approved HTML already exists and must not be rebuilt.
   * This file translates only Pablo's editorial content.
   *
   * Global PETS & DOGUE shell remains responsible for:
   * header, menu, language selector, profile and TTS.
   */

  const T = {

    /* =====================================================
       ENGLISH
       ===================================================== */

    en: {
      heroKicker: "PETS & DOGUE · ISSUE 01 · COVER STORY",
      meet: "Meet",
      heroTitle: "Small legs.<br>Huge personality.",
      heroText: "Blue eyes. Giant ears. Short little legs. And absolutely no chance of going unnoticed. Pablo is a Sphynx Bambino with enough personality for a cat many times his size.",
      backIssue: "← Back to Issue 01",

      helloKicker: "Hello, handsome ♡",
      helloTitle: "Stylish<br>Sphynx",
      helloText: "Pablo is curious, expressive and impossible to ignore. He loves warmth, attention and being exactly where something interesting is happening.",

      profileKicker: "The Pablo profile",
      profileTitle: "LITTLE BODY.<br>BIG CHARACTER.",
      profileSub: "Sphynx Bambino · tiny legs, enormous presence",

      name: "<strong>Name:</strong> Pablo",
      breed: "<strong>Breed:</strong> Sphynx Bambino",
      eyes: "<strong>Eyes:</strong> unmistakable blue",
      look: "<strong>Signature look:</strong> giant ears and short little legs",
      loves: "<strong>I love:</strong> warmth, sun and comfortable places",
      personality: "<strong>Personality:</strong> curious, expressive and full of character",
      position: "<strong>Favourite position:</strong> wherever something interesting is happening",
      feature: "<strong>Special feature:</strong> impossible to forget",

      smallCat: "Small cat?",
      bigPersonality: "BIG PERSONALITY.",

      eyesKicker: "One look is enough",
      eyesTitle: "THOSE<br>BLUE EYES",
      eyes1: "Some animals do not need to make any noise to make their presence known.",
      eyes2: "Pablo only has to look at you.",
      eyes3: "His extraordinary blue eyes, expressive face and enormous ears seem to notice everything.",

      warmthKicker: "☀️ Professional warmth seeker",
      warmthTitle: "FIND THE<br>WARMEST SPOT",
      warmth1: "There are things Pablo takes very seriously.",
      warmth2: "Warmth is one of them.",
      warmth3: "A sunny place.",
      warmth4: "A soft blanket.",
      warmth5: "A warm lap.",
      warmth6: "Another cat to curl up beside.",
      warmth7: "If somewhere looks comfortable, there is a very good chance Pablo has already noticed it.",
      warmth8: "Sphynx cats may be famous for their unusual appearance, but anyone who knows one understands that behind that unforgettable look there is also a very affectionate, comfort-loving companion.",
      warmthQuote: "Warm place found.<br>Pablo approved.",

      momentsKicker: "Pablo moments",
      momentsTitle: "A FACE FOR<br>EVERY MOOD",
      lookMoment: "<strong>The look 👀</strong>",
      lookMomentText: "When Pablo has already understood everything.",
      watching: "<strong>Watching</strong>",
      watchingText: "Nothing interesting escapes those blue eyes.",
      recharge: "<strong>Recharge mode ♡</strong>",
      rechargeText: "Even enormous personalities need a nap.",

      characterKicker: "Personality department",
      characterTitle: "NEVER<br>BORING",
      tag1: "👀 CURIOUS",
      tag2: "♥ AFFECTIONATE",
      tag3: "☀️ WARMTH LOVER",
      tag4: "✨ EXPRESSIVE",
      tag5: "🐾 SMALL LEGS",
      tag6: "⭐ BIG CHARACTER",
      character1: "Some pets quietly enter a room.",
      character2: "Pablo enters a room and somehow becomes part of everything.",
      character3: "He wants to know what is happening.",
      character4: "Who is there?",
      character5: "What are they doing?",
      character6: "Is there somewhere warmer to sit?",
      character7: "And is there perhaps a little attention available?",
      character8: "His short legs may keep him close to the ground, but his personality fills the entire space.",

      friendshipKicker: "Better together ♡",
      friendshipTitle: "EVEN ICONS<br>NEED FRIENDS",
      friendship1: "For all his confidence, there is another side to Pablo.",
      friendship2: "He also understands the pleasure of simply being close.",
      friendship3: "Sharing warmth.",
      friendship4: "Sharing a blanket.",
      friendship5: "Sharing a quiet moment.",
      friendship6: "Sometimes friendship does not need anything complicated.",
      friendship7: "Sometimes it is simply choosing to stay beside someone.",

      quietKicker: "The quiet side",
      quietTitle: "PAUSE.<br>NAP.<br>REPEAT.",
      quiet1: "Curiosity takes energy.",
      quiet2: "After investigating everything worth investigating, there is nothing better than finding the perfect warm place, closing those famous blue eyes and forgetting the world for a while.",

      finalKicker: "Cover star 02",
      finalTitle: "SMALL LEGS.<br>HUGE PERSONALITY.",
      final1: "So this is Pablo.",
      final2: "A Sphynx Bambino.",
      final3: "Small legs.",
      final4: "Giant ears.",
      final5: "Extraordinary blue eyes.",
      final6: "A lover of warmth, comfort and attention.",
      final7: "Curious enough to want to know what is happening everywhere.",
      final8: "Expressive enough that you usually know exactly what he thinks about it.",
      final9: "And unforgettable enough to earn his place on the very first PETS & DOGUE cover.",
      final10: "Different from Miso.",
      final11: "Completely himself.",
      final12: "Exactly as every cover star should be.",

      signature: "Meet Pablo ♡",
      tagline: "One world. Every pet.",
      issueLink: "← Issue 01",
      misoLink: "Miso",
      homeLink: "Home"
    },

    /* =====================================================
       UKRAINIAN
       ===================================================== */

    uk: {
      heroKicker: "PETS & DOGUE · ВИПУСК 01 · ІСТОРІЯ ОБКЛАДИНКИ",
      meet: "Знайомтеся:",
      heroTitle: "Маленькі лапки.<br>Величезний характер.",
      heroText: "Блакитні очі. Величезні вуха. Коротенькі лапки. І абсолютно жодного шансу залишитися непоміченим. Pablo — Sphynx Bambino з характером, якого вистачило б на кота в кілька разів більшого.",
      backIssue: "← Назад до Випуску 01",

      helloKicker: "Привіт, красунчику ♡",
      helloTitle: "Стильний<br>сфінкс",
      helloText: "Pablo допитливий, виразний і його неможливо не помітити. Він любить тепло, увагу й бути саме там, де відбувається щось цікаве.",

      profileKicker: "Профіль Pablo",
      profileTitle: "МАЛЕНЬКЕ ТІЛО.<br>ВЕЛИКИЙ ХАРАКТЕР.",
      profileSub: "Sphynx Bambino · крихітні лапки, величезна присутність",

      name: "<strong>Ім’я:</strong> Pablo",
      breed: "<strong>Порода:</strong> Sphynx Bambino",
      eyes: "<strong>Очі:</strong> незабутньо блакитні",
      look: "<strong>Фірмовий образ:</strong> величезні вуха й коротенькі лапки",
      loves: "<strong>Любить:</strong> тепло, сонце та затишні місця",
      personality: "<strong>Характер:</strong> допитливий, виразний і сповнений індивідуальності",
      position: "<strong>Улюблене місце:</strong> там, де відбувається щось цікаве",
      feature: "<strong>Особливість:</strong> його неможливо забути",

      smallCat: "Маленький кіт?",
      bigPersonality: "ВЕЛИЧЕЗНИЙ ХАРАКТЕР.",

      eyesKicker: "Достатньо одного погляду",
      eyesTitle: "ЦІ<br>БЛАКИТНІ ОЧІ",
      eyes1: "Деяким тваринам зовсім не потрібно шуміти, щоб усі помітили їхню присутність.",
      eyes2: "Pablo достатньо просто подивитися на вас.",
      eyes3: "Його надзвичайні блакитні очі, виразна мордочка й величезні вуха, здається, помічають усе.",

      warmthKicker: "☀️ Професійний шукач тепла",
      warmthTitle: "ЗНАЙТИ<br>НАЙТЕПЛІШЕ МІСЦЕ",
      warmth1: "Є речі, до яких Pablo ставиться дуже серйозно.",
      warmth2: "Тепло — одна з них.",
      warmth3: "Сонячне місце.",
      warmth4: "М’яка ковдра.",
      warmth5: "Теплі коліна.",
      warmth6: "Інший кіт, біля якого можна згорнутися клубочком.",
      warmth7: "Якщо якесь місце виглядає затишним, дуже ймовірно, що Pablo вже його помітив.",
      warmth8: "Сфінкси відомі своєю незвичайною зовнішністю, але кожен, хто добре їх знає, розуміє: за цим незабутнім виглядом ховається дуже ніжний компаньйон, який обожнює комфорт.",
      warmthQuote: "Тепле місце знайдено.<br>Pablo схвалює.",

      momentsKicker: "Моменти Pablo",
      momentsTitle: "ОБЛИЧЧЯ<br>ДЛЯ КОЖНОГО НАСТРОЮ",
      lookMoment: "<strong>Цей погляд 👀</strong>",
      lookMomentText: "Коли Pablo вже все зрозумів.",
      watching: "<strong>Спостерігає</strong>",
      watchingText: "Від цих блакитних очей не вислизне нічого цікавого.",
      recharge: "<strong>Режим перезарядки ♡</strong>",
      rechargeText: "Навіть величезним характерам іноді потрібно поспати.",

      characterKicker: "Відділ характеру",
      characterTitle: "НІКОЛИ<br>НЕ НУДНО",
      tag1: "👀 ДОПИТЛИВИЙ",
      tag2: "♥ ЛАГІДНИЙ",
      tag3: "☀️ ЛЮБИТЬ ТЕПЛО",
      tag4: "✨ ВИРАЗНИЙ",
      tag5: "🐾 МАЛЕНЬКІ ЛАПКИ",
      tag6: "⭐ ВЕЛИКИЙ ХАРАКТЕР",
      character1: "Деякі улюбленці тихенько заходять до кімнати.",
      character2: "Pablo заходить — і якимось чином одразу стає частиною всього, що відбувається.",
      character3: "Він хоче знати, що відбувається.",
      character4: "Хто тут?",
      character5: "Що вони роблять?",
      character6: "Чи є десь тепліше місце?",
      character7: "І, можливо, трохи уваги для нього?",
      character8: "Його коротенькі лапки тримають його близько до землі, але його характер заповнює весь простір.",

      friendshipKicker: "Разом краще ♡",
      friendshipTitle: "НАВІТЬ ІКОНАМ<br>ПОТРІБНІ ДРУЗІ",
      friendship1: "Попри всю свою впевненість, Pablo має й інший бік.",
      friendship2: "Він також чудово розуміє задоволення просто бути поруч.",
      friendship3: "Ділитися теплом.",
      friendship4: "Ділитися ковдрою.",
      friendship5: "Ділитися тихою миттю.",
      friendship6: "Іноді дружбі не потрібно нічого складного.",
      friendship7: "Іноді це просто вибір залишитися поруч із кимось.",

      quietKicker: "Тиха сторона",
      quietTitle: "ПАУЗА.<br>СОН.<br>ПОВТОРИТИ.",
      quiet1: "Допитливість потребує енергії.",
      quiet2: "Після того як усе цікаве вже досліджено, немає нічого кращого, ніж знайти ідеальне тепле місце, заплющити знамениті блакитні очі й на деякий час забути про весь світ.",

      finalKicker: "Зірка обкладинки 02",
      finalTitle: "МАЛЕНЬКІ ЛАПКИ.<br>ВЕЛИЧЕЗНИЙ ХАРАКТЕР.",
      final1: "Отже, це Pablo.",
      final2: "Sphynx Bambino.",
      final3: "Маленькі лапки.",
      final4: "Величезні вуха.",
      final5: "Надзвичайні блакитні очі.",
      final6: "Любитель тепла, комфорту й уваги.",
      final7: "Достатньо допитливий, щоб хотіти знати, що відбувається всюди.",
      final8: "Настільки виразний, що зазвичай одразу зрозуміло, що він про все це думає.",
      final9: "І настільки незабутній, щоб заслужити місце на найпершій обкладинці PETS & DOGUE.",
      final10: "Не схожий на Miso.",
      final11: "Абсолютно собою.",
      final12: "Саме таким і має бути кожна зірка обкладинки.",

      signature: "Знайомтеся: Pablo ♡",
      tagline: "Один світ. Кожен улюбленець.",
      issueLink: "← Випуск 01",
      misoLink: "Miso",
      homeLink: "Головна"
    },

    /* =====================================================
       RUSSIAN
       ===================================================== */

    ru: {
      heroKicker: "PETS & DOGUE · ВЫПУСК 01 · ИСТОРИЯ ОБЛОЖКИ",
      meet: "Знакомьтесь:",
      heroTitle: "Маленькие лапки.<br>Огромный характер.",
      heroText: "Голубые глаза. Огромные уши. Коротенькие лапки. И совершенно никаких шансов остаться незамеченным. Pablo — Sphynx Bambino с характером, которого хватило бы на кота в несколько раз больше.",
      backIssue: "← Назад к Выпуску 01",

      helloKicker: "Привет, красавчик ♡",
      helloTitle: "Стильный<br>сфинкс",
      helloText: "Pablo любопытный, выразительный и его невозможно не заметить. Он любит тепло, внимание и находиться именно там, где происходит что-нибудь интересное.",

      profileKicker: "Профиль Pablo",
      profileTitle: "МАЛЕНЬКОЕ ТЕЛО.<br>БОЛЬШОЙ ХАРАКТЕР.",
      profileSub: "Sphynx Bambino · крошечные лапки, огромное присутствие",

      name: "<strong>Имя:</strong> Pablo",
      breed: "<strong>Порода:</strong> Sphynx Bambino",
      eyes: "<strong>Глаза:</strong> незабываемо голубые",
      look: "<strong>Фирменный образ:</strong> огромные уши и коротенькие лапки",
      loves: "<strong>Любит:</strong> тепло, солнце и уютные места",
      personality: "<strong>Характер:</strong> любопытный, выразительный и яркий",
      position: "<strong>Любимое место:</strong> там, где происходит что-нибудь интересное",
      feature: "<strong>Особенность:</strong> его невозможно забыть",

      smallCat: "Маленький кот?",
      bigPersonality: "ОГРОМНЫЙ ХАРАКТЕР.",

      eyesKicker: "Достаточно одного взгляда",
      eyesTitle: "ЭТИ<br>ГОЛУБЫЕ ГЛАЗА",
      eyes1: "Некоторым животным совсем не нужно шуметь, чтобы все заметили их присутствие.",
      eyes2: "Pablo достаточно просто посмотреть на вас.",
      eyes3: "Его необыкновенные голубые глаза, выразительная мордочка и огромные уши, кажется, замечают всё.",

      warmthKicker: "☀️ Профессиональный искатель тепла",
      warmthTitle: "НАЙТИ<br>САМОЕ ТЁПЛОЕ МЕСТО",
      warmth1: "Есть вещи, к которым Pablo относится очень серьёзно.",
      warmth2: "Тепло — одна из них.",
      warmth3: "Солнечное место.",
      warmth4: "Мягкий плед.",
      warmth5: "Тёплые колени.",
      warmth6: "Другой кот, рядом с которым можно свернуться клубочком.",
      warmth7: "Если какое-то место выглядит уютным, очень вероятно, что Pablo уже его заметил.",
      warmth8: "Сфинксы известны своей необычной внешностью, но каждый, кто хорошо их знает, понимает: за этим незабываемым обликом скрывается очень ласковый компаньон, обожающий комфорт.",
      warmthQuote: "Тёплое место найдено.<br>Pablo одобряет.",

      momentsKicker: "Моменты Pablo",
      momentsTitle: "ЛИЦО<br>ДЛЯ ЛЮБОГО НАСТРОЕНИЯ",
      lookMoment: "<strong>Этот взгляд 👀</strong>",
      lookMomentText: "Когда Pablo уже всё понял.",
      watching: "<strong>Наблюдает</strong>",
      watchingText: "От этих голубых глаз не ускользнёт ничего интересного.",
      recharge: "<strong>Режим перезарядки ♡</strong>",
      rechargeText: "Даже огромному характеру иногда нужно поспать.",

      characterKicker: "Отдел характера",
      characterTitle: "НИКОГДА<br>НЕ СКУЧНО",
      tag1: "👀 ЛЮБОПЫТНЫЙ",
      tag2: "♥ ЛАСКОВЫЙ",
      tag3: "☀️ ЛЮБИТ ТЕПЛО",
      tag4: "✨ ВЫРАЗИТЕЛЬНЫЙ",
      tag5: "🐾 МАЛЕНЬКИЕ ЛАПКИ",
      tag6: "⭐ БОЛЬШОЙ ХАРАКТЕР",
      character1: "Некоторые питомцы тихо входят в комнату.",
      character2: "Pablo входит — и каким-то образом сразу становится частью всего происходящего.",
      character3: "Он хочет знать, что происходит.",
      character4: "Кто здесь?",
      character5: "Что они делают?",
      character6: "Есть ли где-нибудь место потеплее?",
      character7: "И, возможно, немного внимания для него?",
      character8: "Короткие лапки держат его близко к земле, но его характер заполняет всё пространство.",

      friendshipKicker: "Вместе лучше ♡",
      friendshipTitle: "ДАЖЕ ИКОНАМ<br>НУЖНЫ ДРУЗЬЯ",
      friendship1: "При всей своей уверенности у Pablo есть и другая сторона.",
      friendship2: "Он прекрасно понимает удовольствие просто быть рядом.",
      friendship3: "Делиться теплом.",
      friendship4: "Делиться пледом.",
      friendship5: "Делиться тихим моментом.",
      friendship6: "Иногда дружбе не нужно ничего сложного.",
      friendship7: "Иногда это просто решение остаться рядом с кем-то.",

      quietKicker: "Тихая сторона",
      quietTitle: "ПАУЗА.<br>СОН.<br>ПОВТОРИТЬ.",
      quiet1: "Любопытство требует энергии.",
      quiet2: "После того как всё достойное исследования уже изучено, нет ничего лучше, чем найти идеальное тёплое место, закрыть знаменитые голубые глаза и ненадолго забыть обо всём мире.",

      finalKicker: "Звезда обложки 02",
      finalTitle: "МАЛЕНЬКИЕ ЛАПКИ.<br>ОГРОМНЫЙ ХАРАКТЕР.",
      final1: "Итак, это Pablo.",
      final2: "Sphynx Bambino.",
      final3: "Маленькие лапки.",
      final4: "Огромные уши.",
      final5: "Необыкновенные голубые глаза.",
      final6: "Любитель тепла, комфорта и внимания.",
      final7: "Достаточно любопытный, чтобы хотеть знать, что происходит повсюду.",
      final8: "Настолько выразительный, что обычно сразу понятно, что он обо всём этом думает.",
      final9: "И настолько незабываемый, чтобы заслужить своё место на самой первой обложке PETS & DOGUE.",
      final10: "Не похож на Miso.",
      final11: "Полностью собой.",
      final12: "Именно таким и должна быть каждая звезда обложки.",

      signature: "Знакомьтесь: Pablo ♡",
      tagline: "Один мир. Каждый питомец.",
      issueLink: "← Выпуск 01",
      misoLink: "Miso",
      homeLink: "Главная"
    },    /* =====================================================
       FRENCH
       ===================================================== */

    fr: {
      heroKicker: "PETS & DOGUE · ÉDITION 01 · HISTOIRE DE COUVERTURE",
      meet: "Découvrez",
      heroTitle: "Petites pattes.<br>Énorme personnalité.",
      heroText: "Des yeux bleus. Des oreilles immenses. De toutes petites pattes. Et absolument aucune chance de passer inaperçu. Pablo est un Sphynx Bambino avec assez de personnalité pour un chat plusieurs fois plus grand.",
      backIssue: "← Retour à l’Édition 01",

      helloKicker: "Bonjour, beau garçon ♡",
      helloTitle: "Sphynx<br>élégant",
      helloText: "Pablo est curieux, expressif et impossible à ignorer. Il aime la chaleur, l’attention et être exactement là où quelque chose d’intéressant se passe.",

      profileKicker: "Le profil de Pablo",
      profileTitle: "PETIT CORPS.<br>GRAND CARACTÈRE.",
      profileSub: "Sphynx Bambino · petites pattes, présence immense",

      name: "<strong>Nom :</strong> Pablo",
      breed: "<strong>Race :</strong> Sphynx Bambino",
      eyes: "<strong>Yeux :</strong> d’un bleu inoubliable",
      look: "<strong>Look signature :</strong> oreilles immenses et toutes petites pattes",
      loves: "<strong>Il aime :</strong> la chaleur, le soleil et les endroits confortables",
      personality: "<strong>Personnalité :</strong> curieux, expressif et plein de caractère",
      position: "<strong>Endroit préféré :</strong> là où quelque chose d’intéressant se passe",
      feature: "<strong>Particularité :</strong> impossible à oublier",

      smallCat: "Petit chat ?",
      bigPersonality: "ÉNORME PERSONNALITÉ.",

      eyesKicker: "Un seul regard suffit",
      eyesTitle: "CES<br>YEUX BLEUS",
      eyes1: "Certains animaux n’ont pas besoin de faire de bruit pour signaler leur présence.",
      eyes2: "Pablo n’a qu’à vous regarder.",
      eyes3: "Ses extraordinaires yeux bleus, son visage expressif et ses immenses oreilles semblent tout remarquer.",

      warmthKicker: "☀️ Chercheur professionnel de chaleur",
      warmthTitle: "TROUVER L’ENDROIT<br>LE PLUS CHAUD",
      warmth1: "Il y a des choses que Pablo prend très au sérieux.",
      warmth2: "La chaleur en fait partie.",
      warmth3: "Un endroit ensoleillé.",
      warmth4: "Une couverture douce.",
      warmth5: "Des genoux bien chauds.",
      warmth6: "Un autre chat contre lequel se blottir.",
      warmth7: "Si un endroit semble confortable, il y a de fortes chances que Pablo l’ait déjà remarqué.",
      warmth8: "Les chats Sphynx sont peut-être célèbres pour leur apparence inhabituelle, mais ceux qui les connaissent savent que derrière ce look inoubliable se cache aussi un compagnon très affectueux qui adore le confort.",
      warmthQuote: "Endroit chaud trouvé.<br>Approuvé par Pablo.",

      momentsKicker: "Les moments de Pablo",
      momentsTitle: "UN VISAGE<br>POUR CHAQUE HUMEUR",
      lookMoment: "<strong>Le regard 👀</strong>",
      lookMomentText: "Quand Pablo a déjà tout compris.",
      watching: "<strong>Observation</strong>",
      watchingText: "Rien d’intéressant n’échappe à ces yeux bleus.",
      recharge: "<strong>Mode recharge ♡</strong>",
      rechargeText: "Même les énormes personnalités ont besoin d’une sieste.",

      characterKicker: "Département personnalité",
      characterTitle: "JAMAIS<br>ENNUYEUX",
      tag1: "👀 CURIEUX",
      tag2: "♥ AFFECTUEUX",
      tag3: "☀️ AIME LA CHALEUR",
      tag4: "✨ EXPRESSIF",
      tag5: "🐾 PETITES PATTES",
      tag6: "⭐ GRAND CARACTÈRE",
      character1: "Certains animaux entrent discrètement dans une pièce.",
      character2: "Pablo entre dans une pièce et, d’une manière ou d’une autre, devient immédiatement partie intégrante de tout ce qui s’y passe.",
      character3: "Il veut savoir ce qui se passe.",
      character4: "Qui est là ?",
      character5: "Que font-ils ?",
      character6: "Y a-t-il un endroit plus chaud où s’installer ?",
      character7: "Et peut-être un peu d’attention disponible ?",
      character8: "Ses petites pattes le gardent près du sol, mais sa personnalité remplit tout l’espace.",

      friendshipKicker: "Mieux ensemble ♡",
      friendshipTitle: "MÊME LES ICÔNES<br>ONT BESOIN D’AMIS",
      friendship1: "Malgré toute son assurance, Pablo a aussi un autre côté.",
      friendship2: "Il connaît également le plaisir d’être simplement près de quelqu’un.",
      friendship3: "Partager la chaleur.",
      friendship4: "Partager une couverture.",
      friendship5: "Partager un moment tranquille.",
      friendship6: "Parfois, l’amitié n’a besoin de rien de compliqué.",
      friendship7: "Parfois, il suffit simplement de choisir de rester auprès de quelqu’un.",

      quietKicker: "Le côté tranquille",
      quietTitle: "PAUSE.<br>SIESTE.<br>RECOMMENCER.",
      quiet1: "La curiosité demande de l’énergie.",
      quiet2: "Après avoir exploré tout ce qui méritait de l’être, rien ne vaut la découverte de l’endroit chaud parfait, fermer ces célèbres yeux bleus et oublier le monde pendant un moment.",

      finalKicker: "Star de couverture 02",
      finalTitle: "PETITES PATTES.<br>ÉNORME PERSONNALITÉ.",
      final1: "Voici donc Pablo.",
      final2: "Un Sphynx Bambino.",
      final3: "De petites pattes.",
      final4: "Des oreilles immenses.",
      final5: "D’extraordinaires yeux bleus.",
      final6: "Un amoureux de la chaleur, du confort et de l’attention.",
      final7: "Assez curieux pour vouloir savoir ce qui se passe partout.",
      final8: "Assez expressif pour que l’on comprenne généralement exactement ce qu’il en pense.",
      final9: "Et assez inoubliable pour mériter sa place sur la toute première couverture de PETS & DOGUE.",
      final10: "Différent de Miso.",
      final11: "Complètement lui-même.",
      final12: "Exactement comme toute star de couverture devrait l’être.",

      signature: "Découvrez Pablo ♡",
      tagline: "Un monde. Chaque animal.",
      issueLink: "← Édition 01",
      misoLink: "Miso",
      homeLink: "Accueil"
    },

    /* =====================================================
       GERMAN
       ===================================================== */

    de: {
      heroKicker: "PETS & DOGUE · AUSGABE 01 · COVER-STORY",
      meet: "Das ist",
      heroTitle: "Kleine Beine.<br>Riesige Persönlichkeit.",
      heroText: "Blaue Augen. Riesige Ohren. Kurze kleine Beine. Und absolut keine Chance, unbemerkt zu bleiben. Pablo ist ein Sphynx Bambino mit genug Persönlichkeit für eine Katze, die um ein Vielfaches größer wäre.",
      backIssue: "← Zurück zu Ausgabe 01",

      helloKicker: "Hallo, Hübscher ♡",
      helloTitle: "Stilvoller<br>Sphynx",
      helloText: "Pablo ist neugierig, ausdrucksstark und unmöglich zu übersehen. Er liebt Wärme, Aufmerksamkeit und genau dort zu sein, wo gerade etwas Interessantes passiert.",

      profileKicker: "Das Pablo-Profil",
      profileTitle: "KLEINER KÖRPER.<br>GROSSER CHARAKTER.",
      profileSub: "Sphynx Bambino · winzige Beine, enorme Präsenz",

      name: "<strong>Name:</strong> Pablo",
      breed: "<strong>Rasse:</strong> Sphynx Bambino",
      eyes: "<strong>Augen:</strong> unverwechselbar blau",
      look: "<strong>Markenzeichen:</strong> riesige Ohren und kurze kleine Beine",
      loves: "<strong>Er liebt:</strong> Wärme, Sonne und gemütliche Plätze",
      personality: "<strong>Persönlichkeit:</strong> neugierig, ausdrucksstark und voller Charakter",
      position: "<strong>Lieblingsplatz:</strong> dort, wo gerade etwas Interessantes passiert",
      feature: "<strong>Besonderheit:</strong> unmöglich zu vergessen",

      smallCat: "Kleine Katze?",
      bigPersonality: "RIESIGE PERSÖNLICHKEIT.",

      eyesKicker: "Ein Blick genügt",
      eyesTitle: "DIESE<br>BLAUEN AUGEN",
      eyes1: "Manche Tiere müssen keinen Laut von sich geben, damit man ihre Anwesenheit bemerkt.",
      eyes2: "Pablo muss dich nur ansehen.",
      eyes3: "Seine außergewöhnlichen blauen Augen, sein ausdrucksstarkes Gesicht und seine riesigen Ohren scheinen alles zu bemerken.",

      warmthKicker: "☀️ Professioneller Wärmesucher",
      warmthTitle: "DEN WÄRMSTEN<br>PLATZ FINDEN",
      warmth1: "Es gibt Dinge, die Pablo sehr ernst nimmt.",
      warmth2: "Wärme gehört dazu.",
      warmth3: "Ein sonniger Platz.",
      warmth4: "Eine weiche Decke.",
      warmth5: "Ein warmer Schoß.",
      warmth6: "Eine andere Katze, an die man sich kuscheln kann.",
      warmth7: "Wenn irgendwo ein gemütlicher Platz ist, hat Pablo ihn höchstwahrscheinlich bereits entdeckt.",
      warmth8: "Sphynx-Katzen sind für ihr ungewöhnliches Aussehen bekannt. Doch wer eine kennt, weiß, dass sich hinter diesem unvergesslichen Äußeren auch ein sehr liebevoller und komfortliebender Begleiter verbirgt.",
      warmthQuote: "Warmer Platz gefunden.<br>Von Pablo genehmigt.",

      momentsKicker: "Pablo-Momente",
      momentsTitle: "EIN GESICHT<br>FÜR JEDE STIMMUNG",
      lookMoment: "<strong>Der Blick 👀</strong>",
      lookMomentText: "Wenn Pablo längst alles verstanden hat.",
      watching: "<strong>Beobachten</strong>",
      watchingText: "Diesen blauen Augen entgeht nichts Interessantes.",
      recharge: "<strong>Auflademodus ♡</strong>",
      rechargeText: "Auch riesige Persönlichkeiten brauchen ein Nickerchen.",

      characterKicker: "Persönlichkeitsabteilung",
      characterTitle: "NIEMALS<br>LANGWEILIG",
      tag1: "👀 NEUGIERIG",
      tag2: "♥ LIEBEVOLL",
      tag3: "☀️ WÄRMELIEBHABER",
      tag4: "✨ AUSDRUCKSSTARK",
      tag5: "🐾 KLEINE BEINE",
      tag6: "⭐ GROSSER CHARAKTER",
      character1: "Manche Haustiere betreten leise einen Raum.",
      character2: "Pablo betritt einen Raum und wird irgendwie sofort Teil von allem.",
      character3: "Er will wissen, was passiert.",
      character4: "Wer ist da?",
      character5: "Was machen sie?",
      character6: "Gibt es irgendwo einen wärmeren Platz?",
      character7: "Und ist vielleicht ein wenig Aufmerksamkeit verfügbar?",
      character8: "Seine kurzen Beine halten ihn nah am Boden, aber seine Persönlichkeit füllt den ganzen Raum.",

      friendshipKicker: "Zusammen ist es besser ♡",
      friendshipTitle: "AUCH IKONEN<br>BRAUCHEN FREUNDE",
      friendship1: "Bei all seinem Selbstbewusstsein hat Pablo auch eine andere Seite.",
      friendship2: "Er kennt auch die Freude daran, einfach jemandem nahe zu sein.",
      friendship3: "Wärme teilen.",
      friendship4: "Eine Decke teilen.",
      friendship5: "Einen ruhigen Moment teilen.",
      friendship6: "Manchmal braucht Freundschaft nichts Kompliziertes.",
      friendship7: "Manchmal bedeutet sie einfach, sich dafür zu entscheiden, bei jemandem zu bleiben.",

      quietKicker: "Die ruhige Seite",
      quietTitle: "PAUSE.<br>SCHLAFEN.<br>WIEDERHOLEN.",
      quiet1: "Neugier braucht Energie.",
      quiet2: "Nachdem alles untersucht wurde, was eine Untersuchung verdient, gibt es nichts Besseres, als den perfekten warmen Platz zu finden, die berühmten blauen Augen zu schließen und die Welt für eine Weile zu vergessen.",

      finalKicker: "Cover-Star 02",
      finalTitle: "KLEINE BEINE.<br>RIESIGE PERSÖNLICHKEIT.",
      final1: "Das ist also Pablo.",
      final2: "Ein Sphynx Bambino.",
      final3: "Kleine Beine.",
      final4: "Riesige Ohren.",
      final5: "Außergewöhnliche blaue Augen.",
      final6: "Ein Liebhaber von Wärme, Komfort und Aufmerksamkeit.",
      final7: "Neugierig genug, um wissen zu wollen, was überall passiert.",
      final8: "Ausdrucksstark genug, dass man normalerweise genau weiß, was er davon hält.",
      final9: "Und unvergesslich genug, um seinen Platz auf dem allerersten PETS & DOGUE Cover zu verdienen.",
      final10: "Anders als Miso.",
      final11: "Ganz er selbst.",
      final12: "Genau so, wie jeder Cover-Star sein sollte.",

      signature: "Das ist Pablo ♡",
      tagline: "Eine Welt. Jedes Tier.",
      issueLink: "← Ausgabe 01",
      misoLink: "Miso",
      homeLink: "Startseite"
    },

    /* =====================================================
       SPANISH
       ===================================================== */

    es: {
      heroKicker: "PETS & DOGUE · EDICIÓN 01 · HISTORIA DE PORTADA",
      meet: "Conoce a",
      heroTitle: "Patas pequeñas.<br>Enorme personalidad.",
      heroText: "Ojos azules. Orejas enormes. Patitas cortas. Y absolutamente ninguna posibilidad de pasar desapercibido. Pablo es un Sphynx Bambino con personalidad suficiente para un gato varias veces más grande.",
      backIssue: "← Volver a la Edición 01",

      helloKicker: "Hola, guapo ♡",
      helloTitle: "Sphynx<br>con estilo",
      helloText: "Pablo es curioso, expresivo e imposible de ignorar. Le encanta el calor, la atención y estar exactamente donde ocurre algo interesante.",

      profileKicker: "El perfil de Pablo",
      profileTitle: "CUERPO PEQUEÑO.<br>GRAN CARÁCTER.",
      profileSub: "Sphynx Bambino · patas diminutas, enorme presencia",

      name: "<strong>Nombre:</strong> Pablo",
      breed: "<strong>Raza:</strong> Sphynx Bambino",
      eyes: "<strong>Ojos:</strong> de un azul inconfundible",
      look: "<strong>Look característico:</strong> orejas enormes y patitas cortas",
      loves: "<strong>Le encanta:</strong> el calor, el sol y los lugares cómodos",
      personality: "<strong>Personalidad:</strong> curioso, expresivo y lleno de carácter",
      position: "<strong>Lugar favorito:</strong> donde esté ocurriendo algo interesante",
      feature: "<strong>Rasgo especial:</strong> imposible de olvidar",

      smallCat: "¿Gato pequeño?",
      bigPersonality: "ENORME PERSONALIDAD.",

      eyesKicker: "Una mirada es suficiente",
      eyesTitle: "ESOS<br>OJOS AZULES",
      eyes1: "Algunos animales no necesitan hacer ruido para hacer notar su presencia.",
      eyes2: "Pablo solo tiene que mirarte.",
      eyes3: "Sus extraordinarios ojos azules, su rostro expresivo y sus enormes orejas parecen notarlo todo.",

      warmthKicker: "☀️ Buscador profesional de calor",
      warmthTitle: "ENCONTRAR EL LUGAR<br>MÁS CÁLIDO",
      warmth1: "Hay cosas que Pablo se toma muy en serio.",
      warmth2: "El calor es una de ellas.",
      warmth3: "Un lugar soleado.",
      warmth4: "Una manta suave.",
      warmth5: "Un regazo cálido.",
      warmth6: "Otro gato junto al que acurrucarse.",
      warmth7: "Si algún lugar parece cómodo, es muy probable que Pablo ya se haya fijado en él.",
      warmth8: "Los gatos Sphynx pueden ser famosos por su aspecto inusual, pero cualquiera que conozca a uno sabe que detrás de esa apariencia inolvidable también hay un compañero muy cariñoso que adora la comodidad.",
      warmthQuote: "Lugar cálido encontrado.<br>Aprobado por Pablo.",

      momentsKicker: "Momentos de Pablo",
      momentsTitle: "UNA CARA<br>PARA CADA HUMOR",
      lookMoment: "<strong>La mirada 👀</strong>",
      lookMomentText: "Cuando Pablo ya lo ha entendido todo.",
      watching: "<strong>Observando</strong>",
      watchingText: "Nada interesante escapa a esos ojos azules.",
      recharge: "<strong>Modo recarga ♡</strong>",
      rechargeText: "Incluso las personalidades enormes necesitan una siesta.",

      characterKicker: "Departamento de personalidad",
      characterTitle: "NUNCA<br>ABURRIDO",
      tag1: "👀 CURIOSO",
      tag2: "♥ CARIÑOSO",
      tag3: "☀️ AMANTE DEL CALOR",
      tag4: "✨ EXPRESIVO",
      tag5: "🐾 PATAS PEQUEÑAS",
      tag6: "⭐ GRAN CARÁCTER",
      character1: "Algunas mascotas entran silenciosamente en una habitación.",
      character2: "Pablo entra en una habitación y, de alguna manera, se convierte inmediatamente en parte de todo.",
      character3: "Quiere saber qué está pasando.",
      character4: "¿Quién está ahí?",
      character5: "¿Qué están haciendo?",
      character6: "¿Hay algún lugar más cálido donde sentarse?",
      character7: "¿Y quizá un poco de atención disponible?",
      character8: "Sus patas cortas lo mantienen cerca del suelo, pero su personalidad llena todo el espacio.",

      friendshipKicker: "Mejor juntos ♡",
      friendshipTitle: "INCLUSO LOS ICONOS<br>NECESITAN AMIGOS",
      friendship1: "A pesar de toda su seguridad, Pablo también tiene otro lado.",
      friendship2: "También entiende el placer de simplemente estar cerca.",
      friendship3: "Compartir calor.",
      friendship4: "Compartir una manta.",
      friendship5: "Compartir un momento tranquilo.",
      friendship6: "A veces la amistad no necesita nada complicado.",
      friendship7: "A veces consiste simplemente en elegir quedarse junto a alguien.",

      quietKicker: "El lado tranquilo",
      quietTitle: "PAUSA.<br>SIESTA.<br>REPETIR.",
      quiet1: "La curiosidad requiere energía.",
      quiet2: "Después de investigar todo lo que merecía ser investigado, no hay nada mejor que encontrar el lugar cálido perfecto, cerrar esos famosos ojos azules y olvidarse del mundo durante un rato.",

      finalKicker: "Estrella de portada 02",
      finalTitle: "PATAS PEQUEÑAS.<br>ENORME PERSONALIDAD.",
      final1: "Así es Pablo.",
      final2: "Un Sphynx Bambino.",
      final3: "Patas pequeñas.",
      final4: "Orejas enormes.",
      final5: "Extraordinarios ojos azules.",
      final6: "Amante del calor, la comodidad y la atención.",
      final7: "Lo bastante curioso como para querer saber qué ocurre en todas partes.",
      final8: "Lo bastante expresivo como para que normalmente sepas exactamente qué piensa al respecto.",
      final9: "Y lo bastante inolvidable como para ganarse un lugar en la primera portada de PETS & DOGUE.",
      final10: "Diferente de Miso.",
      final11: "Completamente él mismo.",
      final12: "Exactamente como debe ser toda estrella de portada.",

      signature: "Conoce a Pablo ♡",
      tagline: "Un mundo. Cada mascota.",
      issueLink: "← Edición 01",
      misoLink: "Miso",
      homeLink: "Inicio"
    },

    /* =====================================================
       ITALIAN
       ===================================================== */

    it: {
      heroKicker: "PETS & DOGUE · NUMERO 01 · STORIA DI COPERTINA",
      meet: "Ti presentiamo",
      heroTitle: "Zampe piccole.<br>Personalità enorme.",
      heroText: "Occhi azzurri. Orecchie enormi. Zampette corte. E assolutamente nessuna possibilità di passare inosservato. Pablo è uno Sphynx Bambino con abbastanza personalità per un gatto molte volte più grande.",
      backIssue: "← Torna al Numero 01",

      helloKicker: "Ciao, bello ♡",
      helloTitle: "Sphynx<br>di stile",
      helloText: "Pablo è curioso, espressivo e impossibile da ignorare. Ama il calore, le attenzioni ed essere esattamente dove sta succedendo qualcosa di interessante.",

      profileKicker: "Il profilo di Pablo",
      profileTitle: "PICCOLO CORPO.<br>GRANDE CARATTERE.",
      profileSub: "Sphynx Bambino · zampette minuscole, presenza enorme",

      name: "<strong>Nome:</strong> Pablo",
      breed: "<strong>Razza:</strong> Sphynx Bambino",
      eyes: "<strong>Occhi:</strong> di un azzurro inconfondibile",
      look: "<strong>Look distintivo:</strong> orecchie enormi e zampette corte",
      loves: "<strong>Ama:</strong> il calore, il sole e i posti comodi",
      personality: "<strong>Personalità:</strong> curioso, espressivo e pieno di carattere",
      position: "<strong>Posto preferito:</strong> dove sta succedendo qualcosa di interessante",
      feature: "<strong>Caratteristica speciale:</strong> impossibile da dimenticare",

      smallCat: "Gatto piccolo?",
      bigPersonality: "PERSONALITÀ ENORME.",

      eyesKicker: "Basta uno sguardo",
      eyesTitle: "QUEGLI<br>OCCHI AZZURRI",
      eyes1: "Alcuni animali non hanno bisogno di fare rumore per far sentire la propria presenza.",
      eyes2: "A Pablo basta guardarti.",
      eyes3: "I suoi straordinari occhi azzurri, il viso espressivo e le enormi orecchie sembrano notare ogni cosa.",

      warmthKicker: "☀️ Cercatore professionista di calore",
      warmthTitle: "TROVARE IL POSTO<br>PIÙ CALDO",
      warmth1: "Ci sono cose che Pablo prende molto sul serio.",
      warmth2: "Il calore è una di queste.",
      warmth3: "Un posto al sole.",
      warmth4: "Una coperta morbida.",
      warmth5: "Un grembo caldo.",
      warmth6: "Un altro gatto accanto al quale accoccolarsi.",
      warmth7: "Se un posto sembra comodo, è molto probabile che Pablo lo abbia già notato.",
      warmth8: "I gatti Sphynx possono essere famosi per il loro aspetto insolito, ma chiunque ne conosca uno sa che dietro quell’aspetto indimenticabile c’è anche un compagno molto affettuoso che ama il comfort.",
      warmthQuote: "Posto caldo trovato.<br>Approvato da Pablo.",

      momentsKicker: "Momenti di Pablo",
      momentsTitle: "UN VISO<br>PER OGNI UMORE",
      lookMoment: "<strong>Lo sguardo 👀</strong>",
      lookMomentText: "Quando Pablo ha già capito tutto.",
      watching: "<strong>Osservando</strong>",
      watchingText: "Nulla di interessante sfugge a quegli occhi azzurri.",
      recharge: "<strong>Modalità ricarica ♡</strong>",
      rechargeText: "Anche le personalità enormi hanno bisogno di un pisolino.",

      characterKicker: "Reparto personalità",
      characterTitle: "MAI<br>NOIOSO",
      tag1: "👀 CURIOSO",
      tag2: "♥ AFFETTUOSO",
      tag3: "☀️ AMA IL CALORE",
      tag4: "✨ ESPRESSIVO",
      tag5: "🐾 ZAMPE PICCOLE",
      tag6: "⭐ GRANDE CARATTERE",
      character1: "Alcuni animali entrano silenziosamente in una stanza.",
      character2: "Pablo entra in una stanza e in qualche modo diventa immediatamente parte di tutto.",
      character3: "Vuole sapere cosa sta succedendo.",
      character4: "Chi c’è?",
      character5: "Cosa stanno facendo?",
      character6: "C’è un posto più caldo dove sedersi?",
      character7: "E magari c’è anche un po’ di attenzione disponibile?",
      character8: "Le sue zampette corte lo tengono vicino al pavimento, ma la sua personalità riempie tutto lo spazio.",

      friendshipKicker: "Meglio insieme ♡",
      friendshipTitle: "ANCHE LE ICONE<br>HANNO BISOGNO DI AMICI",
      friendship1: "Nonostante tutta la sua sicurezza, Pablo ha anche un altro lato.",
      friendship2: "Conosce anche il piacere di stare semplicemente vicino a qualcuno.",
      friendship3: "Condividere il calore.",
      friendship4: "Condividere una coperta.",
      friendship5: "Condividere un momento tranquillo.",
      friendship6: "A volte l’amicizia non ha bisogno di nulla di complicato.",
      friendship7: "A volte significa semplicemente scegliere di restare accanto a qualcuno.",

      quietKicker: "Il lato tranquillo",
      quietTitle: "PAUSA.<br>PISOLINO.<br>RIPETI.",
      quiet1: "La curiosità richiede energia.",
      quiet2: "Dopo aver esplorato tutto ciò che valeva la pena esplorare, non c’è niente di meglio che trovare il posto caldo perfetto, chiudere quei famosi occhi azzurri e dimenticare il mondo per un po’.",

      finalKicker: "Star di copertina 02",
      finalTitle: "ZAMPE PICCOLE.<br>PERSONALITÀ ENORME.",
      final1: "Ecco Pablo.",
      final2: "Uno Sphynx Bambino.",
      final3: "Zampe piccole.",
      final4: "Orecchie enormi.",
      final5: "Straordinari occhi azzurri.",
      final6: "Amante del calore, del comfort e delle attenzioni.",
      final7: "Abbastanza curioso da voler sapere cosa succede ovunque.",
      final8: "Abbastanza espressivo da farti capire quasi sempre esattamente cosa ne pensa.",
      final9: "E abbastanza indimenticabile da meritarsi un posto sulla primissima copertina di PETS & DOGUE.",
      final10: "Diverso da Miso.",
      final11: "Completamente se stesso.",
      final12: "Esattamente come dovrebbe essere ogni star di copertina.",

      signature: "Ti presentiamo Pablo ♡",
      tagline: "Un mondo. Ogni animale.",
      issueLink: "← Numero 01",
      misoLink: "Miso",
      homeLink: "Home"
    },

    /* =====================================================
       PORTUGUESE
       ===================================================== */

    pt: {
      heroKicker: "PETS & DOGUE · EDIÇÃO 01 · HISTÓRIA DE CAPA",
      meet: "Conheça",
      heroTitle: "Patas pequenas.<br>Personalidade enorme.",
      heroText: "Olhos azuis. Orelhas enormes. Patinhas curtas. E absolutamente nenhuma hipótese de passar despercebido. Pablo é um Sphynx Bambino com personalidade suficiente para um gato várias vezes maior.",
      backIssue: "← Voltar à Edição 01",

      helloKicker: "Olá, lindo ♡",
      helloTitle: "Sphynx<br>com estilo",
      helloText: "Pablo é curioso, expressivo e impossível de ignorar. Adora calor, atenção e estar exatamente onde algo interessante está a acontecer.",

      profileKicker: "O perfil de Pablo",
      profileTitle: "CORPO PEQUENO.<br>GRANDE PERSONALIDADE.",
      profileSub: "Sphynx Bambino · patas minúsculas, presença enorme",

      name: "<strong>Nome:</strong> Pablo",
      breed: "<strong>Raça:</strong> Sphynx Bambino",
      eyes: "<strong>Olhos:</strong> azuis inconfundíveis",
      look: "<strong>Visual característico:</strong> orelhas enormes e patinhas curtas",
      loves: "<strong>Adora:</strong> calor, sol e lugares confortáveis",
      personality: "<strong>Personalidade:</strong> curioso, expressivo e cheio de carácter",
      position: "<strong>Lugar favorito:</strong> onde algo interessante estiver a acontecer",
      feature: "<strong>Característica especial:</strong> impossível de esquecer",

      smallCat: "Gato pequeno?",
      bigPersonality: "PERSONALIDADE ENORME.",

      eyesKicker: "Um olhar basta",
      eyesTitle: "AQUELES<br>OLHOS AZUIS",
      eyes1: "Alguns animais não precisam de fazer barulho para que a sua presença seja notada.",
      eyes2: "Pablo só precisa de olhar para si.",
      eyes3: "Os seus extraordinários olhos azuis, o rosto expressivo e as enormes orelhas parecem reparar em tudo.",

      warmthKicker: "☀️ Especialista em procurar calor",
      warmthTitle: "ENCONTRAR O LUGAR<br>MAIS QUENTE",
      warmth1: "Há coisas que Pablo leva muito a sério.",
      warmth2: "O calor é uma delas.",
      warmth3: "Um lugar ao sol.",
      warmth4: "Uma manta macia.",
      warmth5: "Um colo quente.",
      warmth6: "Outro gato ao lado do qual se possa aconchegar.",
      warmth7: "Se algum lugar parece confortável, é muito provável que Pablo já tenha reparado nele.",
      warmth8: "Os gatos Sphynx podem ser famosos pela aparência incomum, mas quem conhece um sabe que por trás desse visual inesquecível existe também um companheiro muito carinhoso que adora conforto.",
      warmthQuote: "Lugar quente encontrado.<br>Aprovado por Pablo.",

      momentsKicker: "Momentos de Pablo",
      momentsTitle: "UM ROSTO<br>PARA CADA HUMOR",
      lookMoment: "<strong>O olhar 👀</strong>",
      lookMomentText: "Quando Pablo já percebeu tudo.",
      watching: "<strong>A observar</strong>",
      watchingText: "Nada de interessante escapa àqueles olhos azuis.",
      recharge: "<strong>Modo recarga ♡</strong>",
      rechargeText: "Até personalidades enormes precisam de uma sesta.",

      characterKicker: "Departamento da personalidade",
      characterTitle: "NUNCA<br>ABORRECIDO",
      tag1: "👀 CURIOSO",
      tag2: "♥ CARINHOSO",
      tag3: "☀️ ADORA CALOR",
      tag4: "✨ EXPRESSIVO",
      tag5: "🐾 PATAS PEQUENAS",
      tag6: "⭐ GRANDE PERSONALIDADE",
      character1: "Alguns animais entram silenciosamente numa divisão.",
      character2: "Pablo entra numa divisão e, de alguma forma, torna-se imediatamente parte de tudo.",
      character3: "Quer saber o que está a acontecer.",
      character4: "Quem está ali?",
      character5: "O que estão a fazer?",
      character6: "Existe algum lugar mais quente para se sentar?",
      character7: "E talvez haja um pouco de atenção disponível?",
      character8: "As suas patas curtas mantêm-no perto do chão, mas a sua personalidade ocupa todo o espaço.",

      friendshipKicker: "Melhor juntos ♡",
      friendshipTitle: "ATÉ OS ÍCONES<br>PRECISAM DE AMIGOS",
      friendship1: "Apesar de toda a sua confiança, Pablo também tem outro lado.",
      friendship2: "Ele também conhece o prazer de simplesmente estar perto.",
      friendship3: "Partilhar calor.",
      friendship4: "Partilhar uma manta.",
      friendship5: "Partilhar um momento tranquilo.",
      friendship6: "Às vezes, a amizade não precisa de nada complicado.",
      friendship7: "Às vezes, é simplesmente escolher ficar ao lado de alguém.",

      quietKicker: "O lado tranquilo",
      quietTitle: "PAUSA.<br>SESTA.<br>REPETIR.",
      quiet1: "A curiosidade exige energia.",
      quiet2: "Depois de investigar tudo o que merecia ser investigado, não há nada melhor do que encontrar o lugar quente perfeito, fechar aqueles famosos olhos azuis e esquecer o mundo durante algum tempo.",

      finalKicker: "Estrela de capa 02",
      finalTitle: "PATAS PEQUENAS.<br>PERSONALIDADE ENORME.",
      final1: "Este é Pablo.",
      final2: "Um Sphynx Bambino.",
      final3: "Patas pequenas.",
      final4: "Orelhas enormes.",
      final5: "Extraordinários olhos azuis.",
      final6: "Amante de calor, conforto e atenção.",
      final7: "Curioso o suficiente para querer saber o que está a acontecer em todo o lado.",
      final8: "Expressivo o suficiente para normalmente sabermos exatamente o que pensa sobre isso.",
      final9: "E inesquecível o suficiente para conquistar o seu lugar na primeira capa de PETS & DOGUE.",
      final10: "Diferente de Miso.",
      final11: "Completamente ele próprio.",
      final12: "Exatamente como qualquer estrela de capa deve ser.",

      signature: "Conheça Pablo ♡",
      tagline: "Um mundo. Cada animal.",
      issueLink: "← Edição 01",
      misoLink: "Miso",
      homeLink: "Início"
    },    /* =====================================================
       DUTCH
       ===================================================== */

    nl: {
      heroKicker: "PETS & DOGUE · EDITIE 01 · COVER STORY",
      meet: "Maak kennis met",
      heroTitle: "Kleine pootjes.<br>Enorme persoonlijkheid.",
      heroText: "Blauwe ogen. Enorme oren. Korte pootjes. En absoluut geen kans om onopgemerkt te blijven. Pablo is een Sphynx Bambino met genoeg persoonlijkheid voor een kat die vele malen groter is.",
      backIssue: "← Terug naar Editie 01",

      helloKicker: "Hallo, knapperd ♡",
      helloTitle: "Stijlvolle<br>Sphynx",
      helloText: "Pablo is nieuwsgierig, expressief en onmogelijk te negeren. Hij houdt van warmte, aandacht en precies daar zijn waar iets interessants gebeurt.",

      profileKicker: "Het Pablo-profiel",
      profileTitle: "KLEIN LICHAAM.<br>GROOT KARAKTER.",
      profileSub: "Sphynx Bambino · kleine pootjes, enorme aanwezigheid",

      name: "<strong>Naam:</strong> Pablo",
      breed: "<strong>Ras:</strong> Sphynx Bambino",
      eyes: "<strong>Ogen:</strong> onmiskenbaar blauw",
      look: "<strong>Kenmerkende look:</strong> enorme oren en korte pootjes",
      loves: "<strong>Houdt van:</strong> warmte, zon en comfortabele plekjes",
      personality: "<strong>Persoonlijkheid:</strong> nieuwsgierig, expressief en vol karakter",
      position: "<strong>Favoriete plek:</strong> waar iets interessants gebeurt",
      feature: "<strong>Bijzonder kenmerk:</strong> onmogelijk te vergeten",

      smallCat: "Kleine kat?",
      bigPersonality: "ENORME PERSOONLIJKHEID.",

      eyesKicker: "Eén blik is genoeg",
      eyesTitle: "DIE<br>BLAUWE OGEN",
      eyes1: "Sommige dieren hoeven geen geluid te maken om hun aanwezigheid duidelijk te maken.",
      eyes2: "Pablo hoeft je alleen maar aan te kijken.",
      eyes3: "Zijn buitengewone blauwe ogen, expressieve gezicht en enorme oren lijken alles op te merken.",

      warmthKicker: "☀️ Professionele warmtezoeker",
      warmthTitle: "VIND DE<br>WARMSTE PLEK",
      warmth1: "Er zijn dingen die Pablo heel serieus neemt.",
      warmth2: "Warmte is daar één van.",
      warmth3: "Een zonnig plekje.",
      warmth4: "Een zachte deken.",
      warmth5: "Een warme schoot.",
      warmth6: "Een andere kat om tegenaan te kruipen.",
      warmth7: "Als een plek er comfortabel uitziet, is de kans groot dat Pablo hem al heeft opgemerkt.",
      warmth8: "Sphynx-katten staan misschien bekend om hun bijzondere uiterlijk, maar iedereen die er één kent, weet dat achter die onvergetelijke verschijning ook een zeer aanhankelijke metgezel schuilt die dol is op comfort.",
      warmthQuote: "Warme plek gevonden.<br>Goedgekeurd door Pablo.",

      momentsKicker: "Pablo-momenten",
      momentsTitle: "EEN GEZICHT<br>VOOR ELKE STEMMING",
      lookMoment: "<strong>De blik 👀</strong>",
      lookMomentText: "Wanneer Pablo alles al heeft begrepen.",
      watching: "<strong>Observeren</strong>",
      watchingText: "Niets interessants ontsnapt aan die blauwe ogen.",
      recharge: "<strong>Oplaadmodus ♡</strong>",
      rechargeText: "Zelfs enorme persoonlijkheden hebben een dutje nodig.",

      characterKicker: "Afdeling persoonlijkheid",
      characterTitle: "NOOIT<br>SAAI",
      tag1: "👀 NIEUWSGIERIG",
      tag2: "♥ AANHANKELIJK",
      tag3: "☀️ HOUDT VAN WARMTE",
      tag4: "✨ EXPRESSIEF",
      tag5: "🐾 KLEINE POOTJES",
      tag6: "⭐ GROOT KARAKTER",
      character1: "Sommige huisdieren komen stilletjes een kamer binnen.",
      character2: "Pablo komt een kamer binnen en wordt op de een of andere manier meteen onderdeel van alles.",
      character3: "Hij wil weten wat er gebeurt.",
      character4: "Wie is daar?",
      character5: "Wat doen ze?",
      character6: "Is er ergens een warmere plek om te zitten?",
      character7: "En is er misschien een beetje aandacht beschikbaar?",
      character8: "Zijn korte pootjes houden hem dicht bij de grond, maar zijn persoonlijkheid vult de hele ruimte.",

      friendshipKicker: "Samen is beter ♡",
      friendshipTitle: "ZELFS ICONEN<br>HEBBEN VRIENDEN NODIG",
      friendship1: "Ondanks al zijn zelfvertrouwen heeft Pablo ook een andere kant.",
      friendship2: "Hij kent ook het plezier van gewoon dichtbij zijn.",
      friendship3: "Warmte delen.",
      friendship4: "Een deken delen.",
      friendship5: "Een rustig moment delen.",
      friendship6: "Soms hoeft vriendschap helemaal niet ingewikkeld te zijn.",
      friendship7: "Soms betekent het gewoon dat je ervoor kiest om naast iemand te blijven.",

      quietKicker: "De rustige kant",
      quietTitle: "PAUZE.<br>DUTJE.<br>HERHALEN.",
      quiet1: "Nieuwsgierigheid kost energie.",
      quiet2: "Nadat alles wat het onderzoeken waard was is onderzocht, is er niets beter dan de perfecte warme plek vinden, die beroemde blauwe ogen sluiten en de wereld even vergeten.",

      finalKicker: "Coverster 02",
      finalTitle: "KLEINE POOTJES.<br>ENORME PERSOONLIJKHEID.",
      final1: "Dit is dus Pablo.",
      final2: "Een Sphynx Bambino.",
      final3: "Kleine pootjes.",
      final4: "Enorme oren.",
      final5: "Buitengewone blauwe ogen.",
      final6: "Een liefhebber van warmte, comfort en aandacht.",
      final7: "Nieuwsgierig genoeg om te willen weten wat er overal gebeurt.",
      final8: "Expressief genoeg dat je meestal precies weet wat hij ervan vindt.",
      final9: "En onvergetelijk genoeg om zijn plek op de allereerste cover van PETS & DOGUE te verdienen.",
      final10: "Anders dan Miso.",
      final11: "Helemaal zichzelf.",
      final12: "Precies zoals iedere coverster hoort te zijn.",

      signature: "Maak kennis met Pablo ♡",
      tagline: "Eén wereld. Elk huisdier.",
      issueLink: "← Editie 01",
      misoLink: "Miso",
      homeLink: "Home"
    },

    /* =====================================================
       POLISH
       ===================================================== */

    pl: {
      heroKicker: "PETS & DOGUE · WYDANIE 01 · HISTORIA Z OKŁADKI",
      meet: "Poznaj",
      heroTitle: "Małe łapki.<br>Ogromna osobowość.",
      heroText: "Niebieskie oczy. Ogromne uszy. Krótkie łapki. I absolutnie żadnych szans, by pozostać niezauważonym. Pablo to Sphynx Bambino z osobowością wystarczającą dla kota kilka razy większego.",
      backIssue: "← Powrót do Wydania 01",

      helloKicker: "Cześć, przystojniaku ♡",
      helloTitle: "Stylowy<br>Sphynx",
      helloText: "Pablo jest ciekawski, ekspresyjny i nie sposób go zignorować. Uwielbia ciepło, uwagę i być dokładnie tam, gdzie dzieje się coś interesującego.",

      profileKicker: "Profil Pablo",
      profileTitle: "MAŁE CIAŁO.<br>WIELKI CHARAKTER.",
      profileSub: "Sphynx Bambino · maleńkie łapki, ogromna obecność",

      name: "<strong>Imię:</strong> Pablo",
      breed: "<strong>Rasa:</strong> Sphynx Bambino",
      eyes: "<strong>Oczy:</strong> niezapomnianie niebieskie",
      look: "<strong>Charakterystyczny wygląd:</strong> ogromne uszy i krótkie łapki",
      loves: "<strong>Uwielbia:</strong> ciepło, słońce i wygodne miejsca",
      personality: "<strong>Osobowość:</strong> ciekawski, ekspresyjny i pełen charakteru",
      position: "<strong>Ulubione miejsce:</strong> tam, gdzie dzieje się coś interesującego",
      feature: "<strong>Cecha szczególna:</strong> nie sposób go zapomnieć",

      smallCat: "Mały kot?",
      bigPersonality: "OGROMNA OSOBOWOŚĆ.",

      eyesKicker: "Wystarczy jedno spojrzenie",
      eyesTitle: "TE<br>NIEBIESKIE OCZY",
      eyes1: "Niektóre zwierzęta nie muszą wydawać żadnego dźwięku, aby zaznaczyć swoją obecność.",
      eyes2: "Pablo wystarczy, że na ciebie spojrzy.",
      eyes3: "Jego niezwykłe niebieskie oczy, ekspresyjny pyszczek i ogromne uszy zdają się zauważać wszystko.",

      warmthKicker: "☀️ Profesjonalny poszukiwacz ciepła",
      warmthTitle: "ZNALEŹĆ<br>NAJCIEPLEJSZE MIEJSCE",
      warmth1: "Są rzeczy, które Pablo traktuje bardzo poważnie.",
      warmth2: "Ciepło jest jedną z nich.",
      warmth3: "Słoneczne miejsce.",
      warmth4: "Miękki koc.",
      warmth5: "Ciepłe kolana.",
      warmth6: "Inny kot, przy którym można się zwinąć.",
      warmth7: "Jeśli jakieś miejsce wygląda na wygodne, istnieje duża szansa, że Pablo już je zauważył.",
      warmth8: "Koty Sphynx mogą słynąć ze swojego niezwykłego wyglądu, ale każdy, kto zna takiego kota, wie, że za tym niezapomnianym wyglądem kryje się również bardzo czuły towarzysz, który uwielbia wygodę.",
      warmthQuote: "Ciepłe miejsce znalezione.<br>Pablo zatwierdza.",

      momentsKicker: "Chwile Pablo",
      momentsTitle: "MINA<br>NA KAŻDY NASTRÓJ",
      lookMoment: "<strong>To spojrzenie 👀</strong>",
      lookMomentText: "Kiedy Pablo już wszystko zrozumiał.",
      watching: "<strong>Obserwowanie</strong>",
      watchingText: "Nic interesującego nie umknie tym niebieskim oczom.",
      recharge: "<strong>Tryb ładowania ♡</strong>",
      rechargeText: "Nawet ogromne osobowości potrzebują drzemki.",

      characterKicker: "Dział osobowości",
      characterTitle: "NIGDY<br>NUDNO",
      tag1: "👀 CIEKAWSKI",
      tag2: "♥ CZUŁY",
      tag3: "☀️ UWIELBIA CIEPŁO",
      tag4: "✨ EKSPRESYJNY",
      tag5: "🐾 MAŁE ŁAPKI",
      tag6: "⭐ WIELKI CHARAKTER",
      character1: "Niektóre zwierzęta cicho wchodzą do pokoju.",
      character2: "Pablo wchodzi do pokoju i w jakiś sposób natychmiast staje się częścią wszystkiego.",
      character3: "Chce wiedzieć, co się dzieje.",
      character4: "Kto tam jest?",
      character5: "Co oni robią?",
      character6: "Czy jest gdzieś cieplejsze miejsce do siedzenia?",
      character7: "I czy może znajdzie się trochę uwagi dla niego?",
      character8: "Jego krótkie łapki trzymają go blisko ziemi, ale jego osobowość wypełnia całą przestrzeń.",

      friendshipKicker: "Razem lepiej ♡",
      friendshipTitle: "NAWET IKONY<br>POTRZEBUJĄ PRZYJACIÓŁ",
      friendship1: "Mimo całej swojej pewności siebie Pablo ma również inną stronę.",
      friendship2: "Rozumie też przyjemność płynącą ze zwykłego bycia blisko.",
      friendship3: "Dzielenie się ciepłem.",
      friendship4: "Dzielenie się kocem.",
      friendship5: "Dzielenie się spokojną chwilą.",
      friendship6: "Czasami przyjaźń nie potrzebuje niczego skomplikowanego.",
      friendship7: "Czasami to po prostu wybór, by zostać obok kogoś.",

      quietKicker: "Spokojna strona",
      quietTitle: "PAUZA.<br>DRZEMKA.<br>POWTÓRKA.",
      quiet1: "Ciekawość wymaga energii.",
      quiet2: "Po zbadaniu wszystkiego, co było warte zbadania, nie ma nic lepszego niż znalezienie idealnego ciepłego miejsca, zamknięcie tych słynnych niebieskich oczu i zapomnienie na chwilę o świecie.",

      finalKicker: "Gwiazda okładki 02",
      finalTitle: "MAŁE ŁAPKI.<br>OGROMNA OSOBOWOŚĆ.",
      final1: "Oto Pablo.",
      final2: "Sphynx Bambino.",
      final3: "Małe łapki.",
      final4: "Ogromne uszy.",
      final5: "Niezwykłe niebieskie oczy.",
      final6: "Miłośnik ciepła, wygody i uwagi.",
      final7: "Wystarczająco ciekawski, by chcieć wiedzieć, co dzieje się wszędzie.",
      final8: "Wystarczająco ekspresyjny, że zazwyczaj dokładnie wiadomo, co o tym wszystkim myśli.",
      final9: "I wystarczająco niezapomniany, by zasłużyć na miejsce na pierwszej okładce PETS & DOGUE.",
      final10: "Inny niż Miso.",
      final11: "Całkowicie sobą.",
      final12: "Dokładnie taki, jaki powinien być każdy bohater okładki.",

      signature: "Poznaj Pablo ♡",
      tagline: "Jeden świat. Każdy pupil.",
      issueLink: "← Wydanie 01",
      misoLink: "Miso",
      homeLink: "Strona główna"
    },

    /* =====================================================
       CZECH
       ===================================================== */

    cs: {
      heroKicker: "PETS & DOGUE · VYDÁNÍ 01 · PŘÍBĚH Z OBÁLKY",
      meet: "Seznamte se s",
      heroTitle: "Malé nožky.<br>Obrovská osobnost.",
      heroText: "Modré oči. Obrovské uši. Krátké nožky. A naprosto žádná šance zůstat bez povšimnutí. Pablo je Sphynx Bambino s osobností, která by vystačila na několikanásobně větší kočku.",
      backIssue: "← Zpět na Vydání 01",

      helloKicker: "Ahoj, fešáku ♡",
      helloTitle: "Stylový<br>Sphynx",
      helloText: "Pablo je zvědavý, výrazný a nelze ho přehlédnout. Miluje teplo, pozornost a být přesně tam, kde se děje něco zajímavého.",

      profileKicker: "Profil Pabla",
      profileTitle: "MALÉ TĚLO.<br>VELKÝ CHARAKTER.",
      profileSub: "Sphynx Bambino · drobné nožky, obrovská přítomnost",

      name: "<strong>Jméno:</strong> Pablo",
      breed: "<strong>Plemeno:</strong> Sphynx Bambino",
      eyes: "<strong>Oči:</strong> nezaměnitelně modré",
      look: "<strong>Typický vzhled:</strong> obrovské uši a krátké nožky",
      loves: "<strong>Miluje:</strong> teplo, slunce a pohodlná místa",
      personality: "<strong>Osobnost:</strong> zvědavý, výrazný a plný charakteru",
      position: "<strong>Oblíbené místo:</strong> tam, kde se děje něco zajímavého",
      feature: "<strong>Zvláštní rys:</strong> nelze na něj zapomenout",

      smallCat: "Malá kočka?",
      bigPersonality: "OBROVSKÁ OSOBNOST.",

      eyesKicker: "Stačí jediný pohled",
      eyesTitle: "TY<br>MODRÉ OČI",
      eyes1: "Některá zvířata nemusí vydat ani hlásku, aby dala najevo svou přítomnost.",
      eyes2: "Pablovi stačí, když se na vás podívá.",
      eyes3: "Jeho mimořádné modré oči, výrazný obličej a obrovské uši jako by si všímaly úplně všeho.",

      warmthKicker: "☀️ Profesionální hledač tepla",
      warmthTitle: "NAJÍT<br>NEJTEPLEJŠÍ MÍSTO",
      warmth1: "Jsou věci, které Pablo bere velmi vážně.",
      warmth2: "Teplo je jednou z nich.",
      warmth3: "Slunné místo.",
      warmth4: "Měkká deka.",
      warmth5: "Teplý klín.",
      warmth6: "Další kočka, ke které se může přitulit.",
      warmth7: "Pokud nějaké místo vypadá pohodlně, je velmi pravděpodobné, že si ho Pablo už všiml.",
      warmth8: "Kočky Sphynx jsou známé svým neobvyklým vzhledem, ale každý, kdo některou zná, ví, že za tímto nezapomenutelným vzhledem se skrývá také velmi přítulný společník milující pohodlí.",
      warmthQuote: "Teplé místo nalezeno.<br>Pablo schvaluje.",

      momentsKicker: "Pablovy momenty",
      momentsTitle: "TVÁŘ<br>PRO KAŽDOU NÁLADU",
      lookMoment: "<strong>Ten pohled 👀</strong>",
      lookMomentText: "Když už Pablo všechno pochopil.",
      watching: "<strong>Pozorování</strong>",
      watchingText: "Těm modrým očím neunikne nic zajímavého.",
      recharge: "<strong>Režim dobíjení ♡</strong>",
      rechargeText: "I obrovské osobnosti potřebují zdřímnout.",

      characterKicker: "Oddělení osobnosti",
      characterTitle: "NIKDY<br>NUDA",
      tag1: "👀 ZVĚDAVÝ",
      tag2: "♥ PŘÍTULNÝ",
      tag3: "☀️ MILUJE TEPLO",
      tag4: "✨ VÝRAZNÝ",
      tag5: "🐾 MALÉ NOŽKY",
      tag6: "⭐ VELKÝ CHARAKTER",
      character1: "Někteří mazlíčci vstoupí do místnosti tiše.",
      character2: "Pablo vstoupí do místnosti a nějakým způsobem se okamžitě stane součástí všeho.",
      character3: "Chce vědět, co se děje.",
      character4: "Kdo je tam?",
      character5: "Co dělají?",
      character6: "Je někde teplejší místo k sezení?",
      character7: "A možná je k dispozici i trochu pozornosti?",
      character8: "Jeho krátké nožky ho drží blízko země, ale jeho osobnost zaplní celý prostor.",

      friendshipKicker: "Společně je lépe ♡",
      friendshipTitle: "I IKONY<br>POTŘEBUJÍ PŘÁTELE",
      friendship1: "Přes všechno své sebevědomí má Pablo také jinou stránku.",
      friendship2: "Také dobře zná radost z toho být jednoduše někomu nablízku.",
      friendship3: "Sdílet teplo.",
      friendship4: "Sdílet deku.",
      friendship5: "Sdílet klidný okamžik.",
      friendship6: "Někdy přátelství nepotřebuje nic složitého.",
      friendship7: "Někdy je to prostě rozhodnutí zůstat vedle někoho.",

      quietKicker: "Klidná stránka",
      quietTitle: "PAUZA.<br>SPÁNEK.<br>OPAKOVAT.",
      quiet1: "Zvědavost vyžaduje energii.",
      quiet2: "Po prozkoumání všeho, co stálo za prozkoumání, není nic lepšího než najít dokonalé teplé místo, zavřít ty slavné modré oči a na chvíli zapomenout na svět.",

      finalKicker: "Hvězda obálky 02",
      finalTitle: "MALÉ NOŽKY.<br>OBROVSKÁ OSOBNOST.",
      final1: "Tak tohle je Pablo.",
      final2: "Sphynx Bambino.",
      final3: "Malé nožky.",
      final4: "Obrovské uši.",
      final5: "Mimořádné modré oči.",
      final6: "Milovník tepla, pohodlí a pozornosti.",
      final7: "Dost zvědavý na to, aby chtěl vědět, co se děje všude kolem.",
      final8: "Dost výrazný na to, abyste obvykle přesně věděli, co si o tom myslí.",
      final9: "A dost nezapomenutelný na to, aby si zasloužil místo na úplně první obálce PETS & DOGUE.",
      final10: "Jiný než Miso.",
      final11: "Naprosto sám sebou.",
      final12: "Přesně takový, jaký má každý hrdina obálky být.",

      signature: "Seznamte se s Pablem ♡",
      tagline: "Jeden svět. Každý mazlíček.",
      issueLink: "← Vydání 01",
      misoLink: "Miso",
      homeLink: "Domů"
    },

    /* =====================================================
       SLOVAK
       ===================================================== */

    sk: {
      heroKicker: "PETS & DOGUE · VYDANIE 01 · PRÍBEH Z OBÁLKY",
      meet: "Zoznámte sa s",
      heroTitle: "Malé nôžky.<br>Obrovská osobnosť.",
      heroText: "Modré oči. Obrovské uši. Krátke nôžky. A absolútne žiadna šanca zostať nepovšimnutý. Pablo je Sphynx Bambino s osobnosťou, ktorá by vystačila pre niekoľkonásobne väčšiu mačku.",
      backIssue: "← Späť na Vydanie 01",

      helloKicker: "Ahoj, fešák ♡",
      helloTitle: "Štýlový<br>Sphynx",
      helloText: "Pablo je zvedavý, výrazný a nemožno ho prehliadnuť. Miluje teplo, pozornosť a byť presne tam, kde sa deje niečo zaujímavé.",

      profileKicker: "Profil Pabla",
      profileTitle: "MALÉ TELO.<br>VEĽKÝ CHARAKTER.",
      profileSub: "Sphynx Bambino · drobné nôžky, obrovská prítomnosť",

      name: "<strong>Meno:</strong> Pablo",
      breed: "<strong>Plemeno:</strong> Sphynx Bambino",
      eyes: "<strong>Oči:</strong> nezameniteľne modré",
      look: "<strong>Typický vzhľad:</strong> obrovské uši a krátke nôžky",
      loves: "<strong>Miluje:</strong> teplo, slnko a pohodlné miesta",
      personality: "<strong>Osobnosť:</strong> zvedavý, výrazný a plný charakteru",
      position: "<strong>Obľúbené miesto:</strong> tam, kde sa deje niečo zaujímavé",
      feature: "<strong>Zvláštnosť:</strong> nemožno naňho zabudnúť",

      smallCat: "Malá mačka?",
      bigPersonality: "OBROVSKÁ OSOBNOSŤ.",

      eyesKicker: "Stačí jediný pohľad",
      eyesTitle: "TIE<br>MODRÉ OČI",
      eyes1: "Niektoré zvieratá nemusia vydať ani hlások, aby bolo cítiť ich prítomnosť.",
      eyes2: "Pablovi stačí, keď sa na vás pozrie.",
      eyes3: "Jeho mimoriadne modré oči, výrazná tvár a obrovské uši akoby si všímali úplne všetko.",

      warmthKicker: "☀️ Profesionálny hľadač tepla",
      warmthTitle: "NÁJSŤ<br>NAJTEPLEJŠIE MIESTO",
      warmth1: "Sú veci, ktoré Pablo berie veľmi vážne.",
      warmth2: "Teplo je jednou z nich.",
      warmth3: "Slnečné miesto.",
      warmth4: "Mäkká deka.",
      warmth5: "Teplé kolená.",
      warmth6: "Iná mačka, ku ktorej sa môže pritúliť.",
      warmth7: "Ak nejaké miesto vyzerá pohodlne, je veľmi pravdepodobné, že si ho Pablo už všimol.",
      warmth8: "Mačky Sphynx sú známe svojím nezvyčajným vzhľadom, ale každý, kto nejakú pozná, vie, že za týmto nezabudnuteľným vzhľadom sa skrýva aj veľmi nežný spoločník milujúci pohodlie.",
      warmthQuote: "Teplé miesto nájdené.<br>Pablo schvaľuje.",

      momentsKicker: "Pablove momenty",
      momentsTitle: "TVÁR<br>PRE KAŽDÚ NÁLADU",
      lookMoment: "<strong>Ten pohľad 👀</strong>",
      lookMomentText: "Keď už Pablo všetko pochopil.",
      watching: "<strong>Pozorovanie</strong>",
      watchingText: "Tým modrým očiam neunikne nič zaujímavé.",
      recharge: "<strong>Režim dobíjania ♡</strong>",
      rechargeText: "Aj obrovské osobnosti si potrebujú zdriemnuť.",

      characterKicker: "Oddelenie osobnosti",
      characterTitle: "NIKDY<br>NUDA",
      tag1: "👀 ZVEDAVÝ",
      tag2: "♥ NEŽNÝ",
      tag3: "☀️ MILUJE TEPLO",
      tag4: "✨ VÝRAZNÝ",
      tag5: "🐾 MALÉ NÔŽKY",
      tag6: "⭐ VEĽKÝ CHARAKTER",
      character1: "Niektoré domáce zvieratá vstúpia do miestnosti potichu.",
      character2: "Pablo vstúpi do miestnosti a akosi sa okamžite stane súčasťou všetkého.",
      character3: "Chce vedieť, čo sa deje.",
      character4: "Kto je tam?",
      character5: "Čo robia?",
      character6: "Je niekde teplejšie miesto na sedenie?",
      character7: "A možno je k dispozícii aj trochu pozornosti?",
      character8: "Jeho krátke nôžky ho držia blízko pri zemi, ale jeho osobnosť zapĺňa celý priestor.",

      friendshipKicker: "Spolu je lepšie ♡",
      friendshipTitle: "AJ IKONY<br>POTREBUJÚ PRIATEĽOV",
      friendship1: "Napriek všetkému svojmu sebavedomiu má Pablo aj inú stránku.",
      friendship2: "Pozná aj radosť z toho jednoducho byť niekomu nablízku.",
      friendship3: "Deliť sa o teplo.",
      friendship4: "Deliť sa o deku.",
      friendship5: "Deliť sa o pokojný okamih.",
      friendship6: "Niekedy priateľstvo nepotrebuje nič komplikované.",
      friendship7: "Niekedy je to jednoducho rozhodnutie zostať vedľa niekoho.",

      quietKicker: "Pokojná stránka",
      quietTitle: "PAUZA.<br>SPÁNOK.<br>OPAKOVAŤ.",
      quiet1: "Zvedavosť potrebuje energiu.",
      quiet2: "Po preskúmaní všetkého, čo stálo za preskúmanie, nie je nič lepšie ako nájsť dokonalé teplé miesto, zavrieť tie slávne modré oči a na chvíľu zabudnúť na svet.",

      finalKicker: "Hviezda obálky 02",
      finalTitle: "MALÉ NÔŽKY.<br>OBROVSKÁ OSOBNOSŤ.",
      final1: "Tak toto je Pablo.",
      final2: "Sphynx Bambino.",
      final3: "Malé nôžky.",
      final4: "Obrovské uši.",
      final5: "Mimoriadne modré oči.",
      final6: "Milovník tepla, pohodlia a pozornosti.",
      final7: "Dosť zvedavý na to, aby chcel vedieť, čo sa deje všade.",
      final8: "Dosť výrazný na to, aby ste zvyčajne presne vedeli, čo si o tom myslí.",
      final9: "A dosť nezabudnuteľný na to, aby si zaslúžil miesto na úplne prvej obálke PETS & DOGUE.",
      final10: "Iný ako Miso.",
      final11: "Úplne sám sebou.",
      final12: "Presne taký, aký má byť každý hrdina obálky.",

      signature: "Zoznámte sa s Pablom ♡",
      tagline: "Jeden svet. Každý miláčik.",
      issueLink: "← Vydanie 01",
      misoLink: "Miso",
      homeLink: "Domov"
    },

    /* =====================================================
       ROMANIAN
       ===================================================== */

    ro: {
      heroKicker: "PETS & DOGUE · EDIȚIA 01 · POVESTEA DE PE COPERTĂ",
      meet: "Faceți cunoștință cu",
      heroTitle: "Lăbuțe mici.<br>Personalitate uriașă.",
      heroText: "Ochi albaștri. Urechi uriașe. Lăbuțe scurte. Și absolut nicio șansă să treacă neobservat. Pablo este un Sphynx Bambino cu suficientă personalitate pentru o pisică de câteva ori mai mare.",
      backIssue: "← Înapoi la Ediția 01",

      helloKicker: "Salut, frumosule ♡",
      helloTitle: "Sphynx<br>cu stil",
      helloText: "Pablo este curios, expresiv și imposibil de ignorat. Iubește căldura, atenția și să fie exact acolo unde se întâmplă ceva interesant.",

      profileKicker: "Profilul lui Pablo",
      profileTitle: "CORP MIC.<br>CARACTER MARE.",
      profileSub: "Sphynx Bambino · lăbuțe minuscule, prezență uriașă",

      name: "<strong>Nume:</strong> Pablo",
      breed: "<strong>Rasă:</strong> Sphynx Bambino",
      eyes: "<strong>Ochi:</strong> albaștri inconfundabili",
      look: "<strong>Aspect distinctiv:</strong> urechi uriașe și lăbuțe scurte",
      loves: "<strong>Iubește:</strong> căldura, soarele și locurile confortabile",
      personality: "<strong>Personalitate:</strong> curios, expresiv și plin de caracter",
      position: "<strong>Loc preferat:</strong> acolo unde se întâmplă ceva interesant",
      feature: "<strong>Trăsătură specială:</strong> imposibil de uitat",

      smallCat: "Pisică mică?",
      bigPersonality: "PERSONALITATE URIAȘĂ.",

      eyesKicker: "O singură privire este suficientă",
      eyesTitle: "ACEI<br>OCHI ALBAȘTRI",
      eyes1: "Unele animale nu trebuie să facă niciun zgomot pentru a-și face simțită prezența.",
      eyes2: "Pablo trebuie doar să te privească.",
      eyes3: "Ochii lui albaștri extraordinari, chipul expresiv și urechile uriașe par să observe totul.",

      warmthKicker: "☀️ Căutător profesionist de căldură",
      warmthTitle: "GĂSEȘTE CEL MAI<br>CALD LOC",
      warmth1: "Există lucruri pe care Pablo le ia foarte în serios.",
      warmth2: "Căldura este unul dintre ele.",
      warmth3: "Un loc însorit.",
      warmth4: "O pătură moale.",
      warmth5: "Un poală caldă.",
      warmth6: "O altă pisică lângă care să se cuibărească.",
      warmth7: "Dacă un loc pare confortabil, există șanse foarte mari ca Pablo să-l fi observat deja.",
      warmth8: "Pisicile Sphynx sunt renumite pentru aspectul lor neobișnuit, dar oricine cunoaște una știe că în spatele acelui aspect de neuitat se află și un companion foarte afectuos, care adoră confortul.",
      warmthQuote: "Loc cald găsit.<br>Aprobat de Pablo.",

      momentsKicker: "Momentele lui Pablo",
      momentsTitle: "O EXPRESIE<br>PENTRU FIECARE STARE",
      lookMoment: "<strong>Privirea 👀</strong>",
      lookMomentText: "Când Pablo a înțeles deja totul.",
      watching: "<strong>Observă</strong>",
      watchingText: "Nimic interesant nu scapă acelor ochi albaștri.",
      recharge: "<strong>Mod reîncărcare ♡</strong>",
      rechargeText: "Chiar și personalitățile uriașe au nevoie de un pui de somn.",

      characterKicker: "Departamentul de personalitate",
      characterTitle: "NICIODATĂ<br>PLICtisitor",
      tag1: "👀 CURIOS",
      tag2: "♥ AFECTUOS",
      tag3: "☀️ IUBEȘTE CĂLDURA",
      tag4: "✨ EXPRESIV",
      tag5: "🐾 LĂBUȚE MICI",
      tag6: "⭐ CARACTER MARE",
      character1: "Unele animale de companie intră discret într-o cameră.",
      character2: "Pablo intră într-o cameră și, cumva, devine imediat parte din tot ce se întâmplă.",
      character3: "Vrea să știe ce se întâmplă.",
      character4: "Cine este acolo?",
      character5: "Ce fac?",
      character6: "Există undeva un loc mai cald unde să stea?",
      character7: "Și poate este disponibilă și puțină atenție?",
      character8: "Lăbuțele lui scurte îl țin aproape de podea, dar personalitatea lui umple întregul spațiu.",

      friendshipKicker: "Mai bine împreună ♡",
      friendshipTitle: "CHIAR ȘI ICONURILE<br>AU NEVOIE DE PRIETENI",
      friendship1: "Cu toată încrederea lui, Pablo are și o altă latură.",
      friendship2: "Înțelege și plăcerea de a fi pur și simplu aproape.",
      friendship3: "Să împartă căldura.",
      friendship4: "Să împartă o pătură.",
      friendship5: "Să împartă un moment liniștit.",
      friendship6: "Uneori prietenia nu are nevoie de nimic complicat.",
      friendship7: "Uneori înseamnă pur și simplu să alegi să rămâi lângă cineva.",

      quietKicker: "Latura liniștită",
      quietTitle: "PAUZĂ.<br>SOMN.<br>REPETĂ.",
      quiet1: "Curiozitatea consumă energie.",
      quiet2: "După ce a investigat tot ce merita investigat, nimic nu este mai plăcut decât să găsească locul cald perfect, să închidă acei faimoși ochi albaștri și să uite de lume pentru o vreme.",

      finalKicker: "Vedeta copertei 02",
      finalTitle: "LĂBUȚE MICI.<br>PERSONALITATE URIAȘĂ.",
      final1: "Acesta este Pablo.",
      final2: "Un Sphynx Bambino.",
      final3: "Lăbuțe mici.",
      final4: "Urechi uriașe.",
      final5: "Ochi albaștri extraordinari.",
      final6: "Iubitor de căldură, confort și atenție.",
      final7: "Suficient de curios încât să vrea să știe ce se întâmplă peste tot.",
      final8: "Suficient de expresiv încât, de obicei, să știi exact ce părere are despre asta.",
      final9: "Și suficient de memorabil încât să-și merite locul pe prima copertă PETS & DOGUE.",
      final10: "Diferit de Miso.",
      final11: "Complet el însuși.",
      final12: "Exact așa cum ar trebui să fie orice vedetă de copertă.",

      signature: "Faceți cunoștință cu Pablo ♡",
      tagline: "O lume. Fiecare animal.",
      issueLink: "← Ediția 01",
      misoLink: "Miso",
      homeLink: "Acasă"
    },    /* =====================================================
       BULGARIAN
       ===================================================== */

    bg: {
      heroKicker: "PETS & DOGUE · БРОЙ 01 · ИСТОРИЯ ОТ КОРИЦАТА",
      meet: "Запознайте се с",
      heroTitle: "Малки лапички.<br>Огромна личност.",
      heroText: "Сини очи. Огромни уши. Къси малки лапички. И абсолютно никакъв шанс да остане незабелязан. Pablo е Sphynx Bambino с характер, достатъчен за котка няколко пъти по-голяма от него.",
      backIssue: "← Назад към Брой 01",

      helloKicker: "Здравей, красавецо ♡",
      helloTitle: "Стилен<br>Sphynx",
      helloText: "Pablo е любопитен, изразителен и невъзможен за пренебрегване. Той обича топлината, вниманието и да бъде точно там, където се случва нещо интересно.",

      profileKicker: "Профилът на Pablo",
      profileTitle: "МАЛКО ТЯЛО.<br>ГОЛЯМ ХАРАКТЕР.",
      profileSub: "Sphynx Bambino · миниатюрни лапички, огромно присъствие",

      name: "<strong>Име:</strong> Pablo",
      breed: "<strong>Порода:</strong> Sphynx Bambino",
      eyes: "<strong>Очи:</strong> незабравимо сини",
      look: "<strong>Характерен вид:</strong> огромни уши и къси лапички",
      loves: "<strong>Обича:</strong> топлина, слънце и удобни места",
      personality: "<strong>Характер:</strong> любопитен, изразителен и изпълнен с индивидуалност",
      position: "<strong>Любимо място:</strong> там, където се случва нещо интересно",
      feature: "<strong>Специална черта:</strong> невъзможен за забравяне",

      smallCat: "Малка котка?",
      bigPersonality: "ОГРОМНА ЛИЧНОСТ.",

      eyesKicker: "Един поглед е достатъчен",
      eyesTitle: "ТЕЗИ<br>СИНИ ОЧИ",
      eyes1: "Някои животни не трябва да издават никакъв звук, за да заявят присъствието си.",
      eyes2: "Pablo трябва само да ви погледне.",
      eyes3: "Неговите необикновени сини очи, изразително лице и огромни уши сякаш забелязват всичко.",

      warmthKicker: "☀️ Професионален търсач на топлина",
      warmthTitle: "ДА НАМЕРИ<br>НАЙ-ТОПЛОТО МЯСТО",
      warmth1: "Има неща, които Pablo приема много сериозно.",
      warmth2: "Топлината е едно от тях.",
      warmth3: "Слънчево място.",
      warmth4: "Меко одеяло.",
      warmth5: "Топъл скут.",
      warmth6: "Друга котка, до която да се сгуши.",
      warmth7: "Ако някое място изглежда удобно, има голяма вероятност Pablo вече да го е забелязал.",
      warmth8: "Котките Sphynx може да са известни с необичайния си външен вид, но всеки, който познава такава котка, знае, че зад този незабравим образ се крие и много привързан спътник, който обожава комфорта.",
      warmthQuote: "Топлото място е намерено.<br>Pablo одобрява.",

      momentsKicker: "Моменти с Pablo",
      momentsTitle: "ЛИЦЕ<br>ЗА ВСЯКО НАСТРОЕНИЕ",
      lookMoment: "<strong>Погледът 👀</strong>",
      lookMomentText: "Когато Pablo вече е разбрал всичко.",
      watching: "<strong>Наблюдава</strong>",
      watchingText: "Нищо интересно не убягва на тези сини очи.",
      recharge: "<strong>Режим на презареждане ♡</strong>",
      rechargeText: "Дори огромните личности имат нужда от дрямка.",

      characterKicker: "Отдел „Характер“",
      characterTitle: "НИКОГА<br>НЕ Е СКУЧНО",
      tag1: "👀 ЛЮБОПИТЕН",
      tag2: "♥ ГАЛЬОВЕН",
      tag3: "☀️ ОБИЧА ТОПЛИНАТА",
      tag4: "✨ ИЗРАЗИТЕЛЕН",
      tag5: "🐾 МАЛКИ ЛАПИЧКИ",
      tag6: "⭐ ГОЛЯМ ХАРАКТЕР",
      character1: "Някои домашни любимци тихо влизат в стаята.",
      character2: "Pablo влиза в стаята и някак веднага става част от всичко, което се случва.",
      character3: "Той иска да знае какво става.",
      character4: "Кой е там?",
      character5: "Какво правят?",
      character6: "Има ли някъде по-топло място за сядане?",
      character7: "И може би има малко внимание и за него?",
      character8: "Късите му лапички го държат близо до земята, но личността му изпълва цялото пространство.",

      friendshipKicker: "Заедно е по-хубаво ♡",
      friendshipTitle: "ДОРИ ИКОНИТЕ<br>ИМАТ НУЖДА ОТ ПРИЯТЕЛИ",
      friendship1: "Въпреки цялата си увереност Pablo има и друга страна.",
      friendship2: "Той разбира и удоволствието просто да бъде близо до някого.",
      friendship3: "Да споделя топлина.",
      friendship4: "Да споделя одеяло.",
      friendship5: "Да споделя тих момент.",
      friendship6: "Понякога приятелството не се нуждае от нищо сложно.",
      friendship7: "Понякога то е просто изборът да останеш до някого.",

      quietKicker: "Спокойната страна",
      quietTitle: "ПАУЗА.<br>ДРЯМКА.<br>ПОВТОРЕНИЕ.",
      quiet1: "Любопитството изисква енергия.",
      quiet2: "След като е проучил всичко, което си струва да бъде проучено, няма нищо по-хубаво от това да намери идеалното топло място, да затвори прочутите си сини очи и за малко да забрави света.",

      finalKicker: "Звезда на корицата 02",
      finalTitle: "МАЛКИ ЛАПИЧКИ.<br>ОГРОМНА ЛИЧНОСТ.",
      final1: "И така, това е Pablo.",
      final2: "Sphynx Bambino.",
      final3: "Малки лапички.",
      final4: "Огромни уши.",
      final5: "Необикновени сини очи.",
      final6: "Любител на топлината, комфорта и вниманието.",
      final7: "Достатъчно любопитен, за да иска да знае какво се случва навсякъде.",
      final8: "Достатъчно изразителен, за да разбирате почти винаги точно какво мисли за това.",
      final9: "И достатъчно незабравим, за да заслужи мястото си на първата корица на PETS & DOGUE.",
      final10: "Различен от Miso.",
      final11: "Напълно себе си.",
      final12: "Точно такъв, какъвто трябва да бъде всеки герой на корицата.",

      signature: "Запознайте се с Pablo ♡",
      tagline: "Един свят. Всеки домашен любимец.",
      issueLink: "← Брой 01",
      misoLink: "Miso",
      homeLink: "Начало"
    },

    /* =====================================================
       GREEK
       ===================================================== */

    el: {
      heroKicker: "PETS & DOGUE · ΤΕΥΧΟΣ 01 · ΙΣΤΟΡΙΑ ΕΞΩΦΥΛΛΟΥ",
      meet: "Γνωρίστε τον",
      heroTitle: "Μικρά ποδαράκια.<br>Τεράστια προσωπικότητα.",
      heroText: "Μπλε μάτια. Τεράστια αυτιά. Κοντά μικρά ποδαράκια. Και απολύτως καμία πιθανότητα να περάσει απαρατήρητος. Ο Pablo είναι ένας Sphynx Bambino με αρκετή προσωπικότητα για μια γάτα πολλές φορές μεγαλύτερη.",
      backIssue: "← Πίσω στο Τεύχος 01",

      helloKicker: "Γεια σου, όμορφε ♡",
      helloTitle: "Κομψός<br>Sphynx",
      helloText: "Ο Pablo είναι περίεργος, εκφραστικός και αδύνατο να αγνοηθεί. Λατρεύει τη ζεστασιά, την προσοχή και να βρίσκεται ακριβώς εκεί όπου συμβαίνει κάτι ενδιαφέρον.",

      profileKicker: "Το προφίλ του Pablo",
      profileTitle: "ΜΙΚΡΟ ΣΩΜΑ.<br>ΜΕΓΑΛΟΣ ΧΑΡΑΚΤΗΡΑΣ.",
      profileSub: "Sphynx Bambino · μικροσκοπικά πόδια, τεράστια παρουσία",

      name: "<strong>Όνομα:</strong> Pablo",
      breed: "<strong>Ράτσα:</strong> Sphynx Bambino",
      eyes: "<strong>Μάτια:</strong> αξέχαστα μπλε",
      look: "<strong>Χαρακτηριστική εμφάνιση:</strong> τεράστια αυτιά και κοντά ποδαράκια",
      loves: "<strong>Λατρεύει:</strong> τη ζεστασιά, τον ήλιο και τα άνετα μέρη",
      personality: "<strong>Προσωπικότητα:</strong> περίεργος, εκφραστικός και γεμάτος χαρακτήρα",
      position: "<strong>Αγαπημένο μέρος:</strong> όπου συμβαίνει κάτι ενδιαφέρον",
      feature: "<strong>Ιδιαίτερο χαρακτηριστικό:</strong> αδύνατο να τον ξεχάσεις",

      smallCat: "Μικρή γάτα;",
      bigPersonality: "ΤΕΡΑΣΤΙΑ ΠΡΟΣΩΠΙΚΟΤΗΤΑ.",

      eyesKicker: "Μία ματιά αρκεί",
      eyesTitle: "ΑΥΤΑ ΤΑ<br>ΜΠΛΕ ΜΑΤΙΑ",
      eyes1: "Μερικά ζώα δεν χρειάζεται να κάνουν κανέναν θόρυβο για να κάνουν αισθητή την παρουσία τους.",
      eyes2: "Ο Pablo χρειάζεται μόνο να σας κοιτάξει.",
      eyes3: "Τα εκπληκτικά μπλε μάτια του, το εκφραστικό του πρόσωπο και τα τεράστια αυτιά του μοιάζουν να παρατηρούν τα πάντα.",

      warmthKicker: "☀️ Επαγγελματίας κυνηγός ζεστασιάς",
      warmthTitle: "ΒΡΕΣ ΤΟ<br>ΠΙΟ ΖΕΣΤΟ ΜΕΡΟΣ",
      warmth1: "Υπάρχουν πράγματα που ο Pablo παίρνει πολύ σοβαρά.",
      warmth2: "Η ζεστασιά είναι ένα από αυτά.",
      warmth3: "Ένα ηλιόλουστο σημείο.",
      warmth4: "Μια απαλή κουβέρτα.",
      warmth5: "Μια ζεστή αγκαλιά.",
      warmth6: "Μια άλλη γάτα δίπλα στην οποία μπορεί να κουλουριαστεί.",
      warmth7: "Αν ένα μέρος φαίνεται άνετο, υπάρχει μεγάλη πιθανότητα ο Pablo να το έχει ήδη προσέξει.",
      warmth8: "Οι γάτες Sphynx μπορεί να είναι διάσημες για την ασυνήθιστη εμφάνισή τους, αλλά όποιος γνωρίζει μία ξέρει ότι πίσω από αυτή την αξέχαστη εμφάνιση υπάρχει και ένας πολύ τρυφερός σύντροφος που λατρεύει την άνεση.",
      warmthQuote: "Το ζεστό μέρος βρέθηκε.<br>Ο Pablo εγκρίνει.",

      momentsKicker: "Στιγμές του Pablo",
      momentsTitle: "ΕΝΑ ΠΡΟΣΩΠΟ<br>ΓΙΑ ΚΑΘΕ ΔΙΑΘΕΣΗ",
      lookMoment: "<strong>Το βλέμμα 👀</strong>",
      lookMomentText: "Όταν ο Pablo έχει ήδη καταλάβει τα πάντα.",
      watching: "<strong>Παρατηρεί</strong>",
      watchingText: "Τίποτα ενδιαφέρον δεν ξεφεύγει από αυτά τα μπλε μάτια.",
      recharge: "<strong>Λειτουργία επαναφόρτισης ♡</strong>",
      rechargeText: "Ακόμη και οι τεράστιες προσωπικότητες χρειάζονται έναν υπνάκο.",

      characterKicker: "Τμήμα προσωπικότητας",
      characterTitle: "ΠΟΤΕ<br>ΒΑΡΕΤΟΣ",
      tag1: "👀 ΠΕΡΙΕΡΓΟΣ",
      tag2: "♥ ΤΡΥΦΕΡΟΣ",
      tag3: "☀️ ΛΑΤΡΕΥΕΙ ΤΗ ΖΕΣΤΑΣΙΑ",
      tag4: "✨ ΕΚΦΡΑΣΤΙΚΟΣ",
      tag5: "🐾 ΜΙΚΡΑ ΠΟΔΑΡΑΚΙΑ",
      tag6: "⭐ ΜΕΓΑΛΟΣ ΧΑΡΑΚΤΗΡΑΣ",
      character1: "Μερικά κατοικίδια μπαίνουν ήσυχα σε ένα δωμάτιο.",
      character2: "Ο Pablo μπαίνει σε ένα δωμάτιο και με κάποιον τρόπο γίνεται αμέσως μέρος όλων όσων συμβαίνουν.",
      character3: "Θέλει να ξέρει τι συμβαίνει.",
      character4: "Ποιος είναι εκεί;",
      character5: "Τι κάνουν;",
      character6: "Υπάρχει κάπου πιο ζεστό μέρος για να καθίσει;",
      character7: "Και μήπως υπάρχει λίγη προσοχή διαθέσιμη;",
      character8: "Τα κοντά ποδαράκια του τον κρατούν κοντά στο έδαφος, αλλά η προσωπικότητά του γεμίζει ολόκληρο τον χώρο.",

      friendshipKicker: "Καλύτερα μαζί ♡",
      friendshipTitle: "ΑΚΟΜΗ ΚΑΙ ΤΑ ΕΙΔΩΛΑ<br>ΧΡΕΙΑΖΟΝΤΑΙ ΦΙΛΟΥΣ",
      friendship1: "Παρά την αυτοπεποίθησή του, ο Pablo έχει και μια άλλη πλευρά.",
      friendship2: "Καταλαβαίνει επίσης την απόλαυση του να βρίσκεται απλώς κοντά σε κάποιον.",
      friendship3: "Να μοιράζεται τη ζεστασιά.",
      friendship4: "Να μοιράζεται μια κουβέρτα.",
      friendship5: "Να μοιράζεται μια ήσυχη στιγμή.",
      friendship6: "Μερικές φορές η φιλία δεν χρειάζεται τίποτα περίπλοκο.",
      friendship7: "Μερικές φορές είναι απλώς η επιλογή να μείνεις δίπλα σε κάποιον.",

      quietKicker: "Η ήρεμη πλευρά",
      quietTitle: "ΠΑΥΣΗ.<br>ΥΠΝΟΣ.<br>ΕΠΑΝΑΛΗΨΗ.",
      quiet1: "Η περιέργεια απαιτεί ενέργεια.",
      quiet2: "Αφού εξερευνήσει όλα όσα αξίζει να εξερευνηθούν, δεν υπάρχει τίποτα καλύτερο από το να βρει το τέλειο ζεστό μέρος, να κλείσει εκείνα τα διάσημα μπλε μάτια και να ξεχάσει τον κόσμο για λίγο.",

      finalKicker: "Αστέρι εξωφύλλου 02",
      finalTitle: "ΜΙΚΡΑ ΠΟΔΑΡΑΚΙΑ.<br>ΤΕΡΑΣΤΙΑ ΠΡΟΣΩΠΙΚΟΤΗΤΑ.",
      final1: "Αυτός λοιπόν είναι ο Pablo.",
      final2: "Ένας Sphynx Bambino.",
      final3: "Μικρά ποδαράκια.",
      final4: "Τεράστια αυτιά.",
      final5: "Εκπληκτικά μπλε μάτια.",
      final6: "Λάτρης της ζεστασιάς, της άνεσης και της προσοχής.",
      final7: "Αρκετά περίεργος ώστε να θέλει να ξέρει τι συμβαίνει παντού.",
      final8: "Αρκετά εκφραστικός ώστε συνήθως να ξέρεις ακριβώς τι πιστεύει γι’ αυτό.",
      final9: "Και αρκετά αξέχαστος ώστε να κερδίσει τη θέση του στο πρώτο εξώφυλλο του PETS & DOGUE.",
      final10: "Διαφορετικός από τη Miso.",
      final11: "Απόλυτα ο εαυτός του.",
      final12: "Ακριβώς όπως πρέπει να είναι κάθε αστέρι εξωφύλλου.",

      signature: "Γνωρίστε τον Pablo ♡",
      tagline: "Ένας κόσμος. Κάθε κατοικίδιο.",
      issueLink: "← Τεύχος 01",
      misoLink: "Miso",
      homeLink: "Αρχική"
    },

    /* =====================================================
       TURKISH
       ===================================================== */

    tr: {
      heroKicker: "PETS & DOGUE · SAYI 01 · KAPAK HİKÂYESİ",
      meet: "Tanışın:",
      heroTitle: "Küçük patiler.<br>Dev bir kişilik.",
      heroText: "Mavi gözler. Kocaman kulaklar. Kısacık patiler. Ve fark edilmeden kalma ihtimali kesinlikle yok. Pablo, kendisinden birkaç kat büyük bir kediye yetecek kadar kişiliğe sahip bir Sphynx Bambino.",
      backIssue: "← Sayı 01’e dön",

      helloKicker: "Merhaba, yakışıklı ♡",
      helloTitle: "Stil sahibi<br>Sphynx",
      helloText: "Pablo meraklı, ifadeli ve görmezden gelinmesi imkânsız. Sıcağı, ilgiyi ve ilginç bir şeyin olduğu yerde bulunmayı seviyor.",

      profileKicker: "Pablo profili",
      profileTitle: "KÜÇÜK BEDEN.<br>BÜYÜK KARAKTER.",
      profileSub: "Sphynx Bambino · minicik patiler, dev bir varlık",

      name: "<strong>Adı:</strong> Pablo",
      breed: "<strong>Irkı:</strong> Sphynx Bambino",
      eyes: "<strong>Gözleri:</strong> unutulmaz mavi",
      look: "<strong>İmza görünümü:</strong> kocaman kulaklar ve kısa patiler",
      loves: "<strong>Sevdikleri:</strong> sıcaklık, güneş ve rahat yerler",
      personality: "<strong>Kişiliği:</strong> meraklı, ifadeli ve karakter dolu",
      position: "<strong>Favori yeri:</strong> ilginç bir şeyin olduğu her yer",
      feature: "<strong>Özel özelliği:</strong> unutulması imkânsız",

      smallCat: "Küçük kedi mi?",
      bigPersonality: "DEV BİR KİŞİLİK.",

      eyesKicker: "Tek bir bakış yeter",
      eyesTitle: "O<br>MAVİ GÖZLER",
      eyes1: "Bazı hayvanların varlıklarını hissettirmek için hiç ses çıkarmalarına gerek yoktur.",
      eyes2: "Pablo’nun size bakması yeter.",
      eyes3: "Olağanüstü mavi gözleri, ifadeli yüzü ve kocaman kulakları sanki her şeyi fark ediyor.",

      warmthKicker: "☀️ Profesyonel sıcaklık avcısı",
      warmthTitle: "EN SICAK<br>YERİ BUL",
      warmth1: "Pablo’nun çok ciddiye aldığı bazı şeyler var.",
      warmth2: "Sıcaklık bunlardan biri.",
      warmth3: "Güneşli bir yer.",
      warmth4: "Yumuşak bir battaniye.",
      warmth5: "Sıcak bir kucak.",
      warmth6: "Yanına kıvrılabileceği başka bir kedi.",
      warmth7: "Bir yer rahat görünüyorsa Pablo’nun onu çoktan fark etmiş olma ihtimali oldukça yüksek.",
      warmth8: "Sphynx kedileri sıra dışı görünümleriyle ünlü olabilir, ancak onları tanıyan herkes bu unutulmaz görünümün arkasında konforu seven son derece sevecen bir dost olduğunu bilir.",
      warmthQuote: "Sıcak yer bulundu.<br>Pablo onayladı.",

      momentsKicker: "Pablo anları",
      momentsTitle: "HER RUH HALİNE<br>BİR YÜZ",
      lookMoment: "<strong>O bakış 👀</strong>",
      lookMomentText: "Pablo her şeyi çoktan anladığında.",
      watching: "<strong>İzliyor</strong>",
      watchingText: "O mavi gözlerden ilginç hiçbir şey kaçmaz.",
      recharge: "<strong>Şarj modu ♡</strong>",
      rechargeText: "Dev kişiliklerin bile biraz uykuya ihtiyacı vardır.",

      characterKicker: "Kişilik departmanı",
      characterTitle: "ASLA<br>SIKICI DEĞİL",
      tag1: "👀 MERAKLI",
      tag2: "♥ SEVECEN",
      tag3: "☀️ SICAKLIK SEVER",
      tag4: "✨ İFADELİ",
      tag5: "🐾 KÜÇÜK PATİLER",
      tag6: "⭐ BÜYÜK KARAKTER",
      character1: "Bazı evcil hayvanlar bir odaya sessizce girer.",
      character2: "Pablo bir odaya girer ve bir şekilde hemen olup biten her şeyin parçası olur.",
      character3: "Neler olduğunu bilmek ister.",
      character4: "Orada kim var?",
      character5: "Ne yapıyorlar?",
      character6: "Oturmak için daha sıcak bir yer var mı?",
      character7: "Ve belki biraz ilgi de var mı?",
      character8: "Kısa patileri onu yere yakın tutabilir ama kişiliği bütün alanı doldurur.",

      friendshipKicker: "Birlikte daha güzel ♡",
      friendshipTitle: "İKONLARIN BİLE<br>ARKADAŞLARA İHTİYACI VAR",
      friendship1: "Tüm özgüvenine rağmen Pablo’nun başka bir yanı da var.",
      friendship2: "O, sadece birinin yanında olmanın keyfini de çok iyi bilir.",
      friendship3: "Sıcaklığı paylaşmak.",
      friendship4: "Bir battaniyeyi paylaşmak.",
      friendship5: "Sessiz bir anı paylaşmak.",
      friendship6: "Bazen arkadaşlığın karmaşık hiçbir şeye ihtiyacı yoktur.",
      friendship7: "Bazen sadece birinin yanında kalmayı seçmektir.",

      quietKicker: "Sessiz tarafı",
      quietTitle: "DUR.<br>UYU.<br>TEKRARLA.",
      quiet1: "Merak enerji ister.",
      quiet2: "Araştırılmaya değer her şeyi araştırdıktan sonra mükemmel sıcak yeri bulmak, o meşhur mavi gözleri kapatmak ve bir süreliğine dünyayı unutmak gibisi yoktur.",

      finalKicker: "Kapak yıldızı 02",
      finalTitle: "KÜÇÜK PATİLER.<br>DEV BİR KİŞİLİK.",
      final1: "İşte Pablo.",
      final2: "Bir Sphynx Bambino.",
      final3: "Küçük patiler.",
      final4: "Kocaman kulaklar.",
      final5: "Olağanüstü mavi gözler.",
      final6: "Sıcaklığın, rahatlığın ve ilginin tutkunu.",
      final7: "Her yerde neler olduğunu bilmek isteyecek kadar meraklı.",
      final8: "Ne düşündüğünü çoğu zaman tam olarak anlayabileceğiniz kadar ifadeli.",
      final9: "Ve PETS & DOGUE’un ilk kapağındaki yerini hak edecek kadar unutulmaz.",
      final10: "Miso’dan farklı.",
      final11: "Tamamen kendisi.",
      final12: "Her kapak yıldızının olması gerektiği gibi.",

      signature: "Pablo ile tanışın ♡",
      tagline: "Tek dünya. Her evcil hayvan.",
      issueLink: "← Sayı 01",
      misoLink: "Miso",
      homeLink: "Ana Sayfa"
    },

    /* =====================================================
       SWEDISH
       ===================================================== */

    sv: {
      heroKicker: "PETS & DOGUE · UTGÅVA 01 · OMSLAGSBERÄTTELSE",
      meet: "Möt",
      heroTitle: "Små ben.<br>Enorm personlighet.",
      heroText: "Blå ögon. Enorma öron. Korta små ben. Och absolut ingen chans att gå obemärkt förbi. Pablo är en Sphynx Bambino med tillräckligt mycket personlighet för en katt flera gånger större.",
      backIssue: "← Tillbaka till Utgåva 01",

      helloKicker: "Hej, snygging ♡",
      helloTitle: "Stilfull<br>Sphynx",
      helloText: "Pablo är nyfiken, uttrycksfull och omöjlig att ignorera. Han älskar värme, uppmärksamhet och att vara precis där något intressant händer.",

      profileKicker: "Pablos profil",
      profileTitle: "LITEN KROPP.<br>STOR KARAKTÄR.",
      profileSub: "Sphynx Bambino · små ben, enorm närvaro",

      name: "<strong>Namn:</strong> Pablo",
      breed: "<strong>Ras:</strong> Sphynx Bambino",
      eyes: "<strong>Ögon:</strong> omisskännligt blå",
      look: "<strong>Signaturlook:</strong> enorma öron och korta små ben",
      loves: "<strong>Älskar:</strong> värme, sol och bekväma platser",
      personality: "<strong>Personlighet:</strong> nyfiken, uttrycksfull och full av karaktär",
      position: "<strong>Favoritplats:</strong> där något intressant händer",
      feature: "<strong>Speciellt kännetecken:</strong> omöjlig att glömma",

      smallCat: "Liten katt?",
      bigPersonality: "ENORM PERSONLIGHET.",

      eyesKicker: "En blick räcker",
      eyesTitle: "DE DÄR<br>BLÅ ÖGONEN",
      eyes1: "Vissa djur behöver inte göra något ljud för att deras närvaro ska märkas.",
      eyes2: "Pablo behöver bara titta på dig.",
      eyes3: "Hans extraordinära blå ögon, uttrycksfulla ansikte och enorma öron verkar lägga märke till allt.",

      warmthKicker: "☀️ Professionell värmesökare",
      warmthTitle: "HITTA DEN<br>VARMASTE PLATSEN",
      warmth1: "Det finns saker som Pablo tar på stort allvar.",
      warmth2: "Värme är en av dem.",
      warmth3: "En solig plats.",
      warmth4: "En mjuk filt.",
      warmth5: "Ett varmt knä.",
      warmth6: "En annan katt att krypa ihop bredvid.",
      warmth7: "Om en plats ser bekväm ut är chansen stor att Pablo redan har upptäckt den.",
      warmth8: "Sphynx-katter är kanske kända för sitt ovanliga utseende, men alla som känner en vet att bakom det oförglömliga utseendet finns en mycket kärleksfull följeslagare som älskar komfort.",
      warmthQuote: "Varm plats hittad.<br>Godkänd av Pablo.",

      momentsKicker: "Pablo-stunder",
      momentsTitle: "ETT ANSIKTE<br>FÖR VARJE HUMÖR",
      lookMoment: "<strong>Blicken 👀</strong>",
      lookMomentText: "När Pablo redan har förstått allt.",
      watching: "<strong>Observerar</strong>",
      watchingText: "Inget intressant undgår de där blå ögonen.",
      recharge: "<strong>Laddningsläge ♡</strong>",
      rechargeText: "Även enorma personligheter behöver en tupplur.",

      characterKicker: "Personlighetsavdelningen",
      characterTitle: "ALDRIG<br>TRÅKIG",
      tag1: "👀 NYFIKEN",
      tag2: "♥ KÄRLEKSFULL",
      tag3: "☀️ ÄLSKAR VÄRME",
      tag4: "✨ UTTRYCKSFULL",
      tag5: "🐾 SMÅ BEN",
      tag6: "⭐ STOR KARAKTÄR",
      character1: "Vissa husdjur går tyst in i ett rum.",
      character2: "Pablo går in i ett rum och blir på något sätt omedelbart en del av allt.",
      character3: "Han vill veta vad som händer.",
      character4: "Vem är där?",
      character5: "Vad gör de?",
      character6: "Finns det någon varmare plats att sitta på?",
      character7: "Och finns det kanske lite uppmärksamhet över?",
      character8: "Hans korta ben håller honom nära marken, men hans personlighet fyller hela rummet.",

      friendshipKicker: "Bättre tillsammans ♡",
      friendshipTitle: "ÄVEN IKONER<br>BEHÖVER VÄNNER",
      friendship1: "Trots allt sitt självförtroende har Pablo också en annan sida.",
      friendship2: "Han förstår också glädjen i att bara vara nära.",
      friendship3: "Dela värme.",
      friendship4: "Dela en filt.",
      friendship5: "Dela en lugn stund.",
      friendship6: "Ibland behöver vänskap inte vara komplicerad.",
      friendship7: "Ibland handlar det helt enkelt om att välja att stanna bredvid någon.",

      quietKicker: "Den lugna sidan",
      quietTitle: "PAUS.<br>SOV.<br>UPPREPA.",
      quiet1: "Nyfikenhet kräver energi.",
      quiet2: "Efter att ha undersökt allt som är värt att undersöka finns det inget bättre än att hitta den perfekta varma platsen, stänga de berömda blå ögonen och glömma världen en stund.",

      finalKicker: "Omslagsstjärna 02",
      finalTitle: "SMÅ BEN.<br>ENORM PERSONLIGHET.",
      final1: "Så det här är Pablo.",
      final2: "En Sphynx Bambino.",
      final3: "Små ben.",
      final4: "Enorma öron.",
      final5: "Extraordinära blå ögon.",
      final6: "En älskare av värme, komfort och uppmärksamhet.",
      final7: "Tillräckligt nyfiken för att vilja veta vad som händer överallt.",
      final8: "Tillräckligt uttrycksfull för att du oftast ska veta exakt vad han tycker om det.",
      final9: "Och tillräckligt oförglömlig för att förtjäna sin plats på PETS & DOGUE:s allra första omslag.",
      final10: "Annorlunda än Miso.",
      final11: "Helt och hållet sig själv.",
      final12: "Precis som varje omslagsstjärna ska vara.",

      signature: "Möt Pablo ♡",
      tagline: "En värld. Varje husdjur.",
      issueLink: "← Utgåva 01",
      misoLink: "Miso",
      homeLink: "Hem"
    },

    /* =====================================================
       DANISH
       ===================================================== */

    da: {
      heroKicker: "PETS & DOGUE · UDGAVE 01 · FORSIDEHISTORIE",
      meet: "Mød",
      heroTitle: "Små ben.<br>Enorm personlighed.",
      heroText: "Blå øjne. Enorme ører. Korte små ben. Og absolut ingen chance for at gå ubemærket hen. Pablo er en Sphynx Bambino med nok personlighed til en kat mange gange større.",
      backIssue: "← Tilbage til Udgave 01",

      helloKicker: "Hej, flotte fyr ♡",
      helloTitle: "Stilfuld<br>Sphynx",
      helloText: "Pablo er nysgerrig, udtryksfuld og umulig at ignorere. Han elsker varme, opmærksomhed og at være præcis dér, hvor noget interessant sker.",

      profileKicker: "Pablos profil",
      profileTitle: "LILLE KROP.<br>STOR KARAKTER.",
      profileSub: "Sphynx Bambino · små ben, enorm tilstedeværelse",

      name: "<strong>Navn:</strong> Pablo",
      breed: "<strong>Race:</strong> Sphynx Bambino",
      eyes: "<strong>Øjne:</strong> umiskendeligt blå",
      look: "<strong>Signaturlook:</strong> enorme ører og korte små ben",
      loves: "<strong>Elsker:</strong> varme, sol og behagelige steder",
      personality: "<strong>Personlighed:</strong> nysgerrig, udtryksfuld og fuld af karakter",
      position: "<strong>Favoritsted:</strong> hvor der sker noget interessant",
      feature: "<strong>Særligt kendetegn:</strong> umulig at glemme",

      smallCat: "Lille kat?",
      bigPersonality: "ENORM PERSONLIGHED.",

      eyesKicker: "Ét blik er nok",
      eyesTitle: "DE<br>BLÅ ØJNE",
      eyes1: "Nogle dyr behøver ikke lave en lyd for at gøre deres tilstedeværelse bemærket.",
      eyes2: "Pablo behøver bare at se på dig.",
      eyes3: "Hans ekstraordinære blå øjne, udtryksfulde ansigt og enorme ører synes at lægge mærke til alt.",

      warmthKicker: "☀️ Professionel varmesøger",
      warmthTitle: "FIND DET<br>VARMESTE STED",
      warmth1: "Der er ting, Pablo tager meget alvorligt.",
      warmth2: "Varme er en af dem.",
      warmth3: "Et solrigt sted.",
      warmth4: "Et blødt tæppe.",
      warmth5: "Et varmt skød.",
      warmth6: "En anden kat at krølle sig sammen ved siden af.",
      warmth7: "Hvis et sted ser behageligt ud, er der stor sandsynlighed for, at Pablo allerede har bemærket det.",
      warmth8: "Sphynx-katte er måske berømte for deres usædvanlige udseende, men enhver, der kender en, ved, at der bag det uforglemmelige udseende også gemmer sig en meget kærlig ledsager, som elsker komfort.",
      warmthQuote: "Varmt sted fundet.<br>Godkendt af Pablo.",

      momentsKicker: "Pablo-øjeblikke",
      momentsTitle: "ET ANSIGT<br>TIL ETHVERT HUMØR",
      lookMoment: "<strong>Blikket 👀</strong>",
      lookMomentText: "Når Pablo allerede har forstået det hele.",
      watching: "<strong>Observerer</strong>",
      watchingText: "Intet interessant undslipper de blå øjne.",
      recharge: "<strong>Opladningstilstand ♡</strong>",
      rechargeText: "Selv enorme personligheder har brug for en lur.",

      characterKicker: "Personlighedsafdelingen",
      characterTitle: "ALDRIG<br>KEDELIG",
      tag1: "👀 NYSGERRIG",
      tag2: "♥ KÆRLIG",
      tag3: "☀️ ELSKER VARME",
      tag4: "✨ UDTRYKSFULD",
      tag5: "🐾 SMÅ BEN",
      tag6: "⭐ STOR KARAKTER",
      character1: "Nogle kæledyr går stille ind i et rum.",
      character2: "Pablo går ind i et rum og bliver på en eller anden måde straks en del af alt.",
      character3: "Han vil vide, hvad der sker.",
      character4: "Hvem er der?",
      character5: "Hvad laver de?",
      character6: "Er der et varmere sted at sidde?",
      character7: "Og er der måske lidt opmærksomhed til rådighed?",
      character8: "Hans korte ben holder ham tæt på jorden, men hans personlighed fylder hele rummet.",

      friendshipKicker: "Bedre sammen ♡",
      friendshipTitle: "SELV IKONER<br>HAR BRUG FOR VENNER",
      friendship1: "Trods al sin selvsikkerhed har Pablo også en anden side.",
      friendship2: "Han forstår også glæden ved bare at være tæt på.",
      friendship3: "At dele varme.",
      friendship4: "At dele et tæppe.",
      friendship5: "At dele et roligt øjeblik.",
      friendship6: "Nogle gange behøver venskab ikke være kompliceret.",
      friendship7: "Nogle gange handler det blot om at vælge at blive ved siden af nogen.",

      quietKicker: "Den stille side",
      quietTitle: "PAUSE.<br>LUR.<br>GENTAG.",
      quiet1: "Nysgerrighed kræver energi.",
      quiet2: "Efter at have undersøgt alt, der var værd at undersøge, er der intet bedre end at finde det perfekte varme sted, lukke de berømte blå øjne og glemme verden et øjeblik.",

      finalKicker: "Forsidestjerne 02",
      finalTitle: "SMÅ BEN.<br>ENORM PERSONLIGHED.",
      final1: "Så dette er Pablo.",
      final2: "En Sphynx Bambino.",
      final3: "Små ben.",
      final4: "Enorme ører.",
      final5: "Ekstraordinære blå øjne.",
      final6: "En elsker af varme, komfort og opmærksomhed.",
      final7: "Nysgerrig nok til at ville vide, hvad der sker overalt.",
      final8: "Udtryksfuld nok til, at man som regel ved præcis, hvad han mener om det.",
      final9: "Og uforglemmelig nok til at fortjene sin plads på det allerførste PETS & DOGUE-cover.",
      final10: "Anderledes end Miso.",
      final11: "Fuldstændig sig selv.",
      final12: "Præcis som enhver forsidestjerne bør være.",

      signature: "Mød Pablo ♡",
      tagline: "Én verden. Hvert kæledyr.",
      issueLink: "← Udgave 01",
      misoLink: "Miso",
      homeLink: "Hjem"
    },    /* =====================================================
       NORWEGIAN
       ===================================================== */

    no: {
      heroKicker: "PETS & DOGUE · UTGAVE 01 · FORSIDEHISTORIE",
      meet: "Møt",
      heroTitle: "Små bein.<br>Enorm personlighet.",
      heroText: "Blå øyne. Enorme ører. Korte små bein. Og absolutt ingen sjanse for å gå ubemerket hen. Pablo er en Sphynx Bambino med nok personlighet for en katt mange ganger større.",
      backIssue: "← Tilbake til Utgave 01",

      helloKicker: "Hei, kjekken ♡",
      helloTitle: "Stilfull<br>Sphynx",
      helloText: "Pablo er nysgjerrig, uttrykksfull og umulig å overse. Han elsker varme, oppmerksomhet og å være akkurat der noe interessant skjer.",

      profileKicker: "Pablos profil",
      profileTitle: "LITEN KROPP.<br>STOR KARAKTER.",
      profileSub: "Sphynx Bambino · små bein, enorm tilstedeværelse",

      name: "<strong>Navn:</strong> Pablo",
      breed: "<strong>Rase:</strong> Sphynx Bambino",
      eyes: "<strong>Øyne:</strong> uforglemmelig blå",
      look: "<strong>Signaturutseende:</strong> enorme ører og korte små bein",
      loves: "<strong>Elsker:</strong> varme, sol og komfortable steder",
      personality: "<strong>Personlighet:</strong> nysgjerrig, uttrykksfull og full av karakter",
      position: "<strong>Favorittsted:</strong> der noe interessant skjer",
      feature: "<strong>Spesielt kjennetegn:</strong> umulig å glemme",

      smallCat: "Liten katt?",
      bigPersonality: "ENORM PERSONLIGHET.",

      eyesKicker: "Ett blikk er nok",
      eyesTitle: "DE<br>BLÅ ØYNENE",
      eyes1: "Noen dyr trenger ikke lage en lyd for å gjøre sin tilstedeværelse kjent.",
      eyes2: "Pablo trenger bare å se på deg.",
      eyes3: "De ekstraordinære blå øynene, det uttrykksfulle ansiktet og de enorme ørene ser ut til å legge merke til alt.",

      warmthKicker: "☀️ Profesjonell varmesøker",
      warmthTitle: "FINN DET<br>VARMESTE STEDET",
      warmth1: "Det finnes ting Pablo tar svært alvorlig.",
      warmth2: "Varme er en av dem.",
      warmth3: "Et solrikt sted.",
      warmth4: "Et mykt teppe.",
      warmth5: "Et varmt fang.",
      warmth6: "En annen katt å krølle seg sammen ved siden av.",
      warmth7: "Hvis et sted ser komfortabelt ut, er sjansen stor for at Pablo allerede har lagt merke til det.",
      warmth8: "Sphynx-katter er kanskje berømte for sitt uvanlige utseende, men alle som kjenner en, vet at bak det uforglemmelige utseendet finnes en svært kjærlig følgesvenn som elsker komfort.",
      warmthQuote: "Varmt sted funnet.<br>Godkjent av Pablo.",

      momentsKicker: "Pablo-øyeblikk",
      momentsTitle: "ETT ANSIKT<br>FOR HVER STEMNING",
      lookMoment: "<strong>Blikket 👀</strong>",
      lookMomentText: "Når Pablo allerede har forstått alt.",
      watching: "<strong>Observerer</strong>",
      watchingText: "Ingenting interessant slipper unna de blå øynene.",
      recharge: "<strong>Lademodus ♡</strong>",
      rechargeText: "Selv enorme personligheter trenger en lur.",

      characterKicker: "Personlighetsavdelingen",
      characterTitle: "ALDRI<br>KJEDELIG",
      tag1: "👀 NYSGJERRIG",
      tag2: "♥ KJÆRLIG",
      tag3: "☀️ ELSKER VARME",
      tag4: "✨ UTTRYKKSFULL",
      tag5: "🐾 SMÅ BEIN",
      tag6: "⭐ STOR KARAKTER",
      character1: "Noen kjæledyr går stille inn i et rom.",
      character2: "Pablo går inn i et rom og blir på en eller annen måte umiddelbart en del av alt.",
      character3: "Han vil vite hva som skjer.",
      character4: "Hvem er der?",
      character5: "Hva gjør de?",
      character6: "Finnes det et varmere sted å sitte?",
      character7: "Og kanskje finnes det litt oppmerksomhet til overs?",
      character8: "De korte beina holder ham nær bakken, men personligheten hans fyller hele rommet.",

      friendshipKicker: "Bedre sammen ♡",
      friendshipTitle: "SELV IKONER<br>TRENGER VENNER",
      friendship1: "Til tross for all selvtilliten har Pablo også en annen side.",
      friendship2: "Han kjenner også gleden ved bare å være nær noen.",
      friendship3: "Dele varme.",
      friendship4: "Dele et teppe.",
      friendship5: "Dele et rolig øyeblikk.",
      friendship6: "Noen ganger trenger ikke vennskap å være komplisert.",
      friendship7: "Noen ganger handler det ganske enkelt om å velge å bli ved siden av noen.",

      quietKicker: "Den rolige siden",
      quietTitle: "PAUSE.<br>LUR.<br>GJENTA.",
      quiet1: "Nysgjerrighet krever energi.",
      quiet2: "Etter å ha undersøkt alt som var verdt å undersøke, finnes det ingenting bedre enn å finne det perfekte varme stedet, lukke de berømte blå øynene og glemme verden en liten stund.",

      finalKicker: "Forsidestjerne 02",
      finalTitle: "SMÅ BEIN.<br>ENORM PERSONLIGHET.",
      final1: "Så dette er Pablo.",
      final2: "En Sphynx Bambino.",
      final3: "Små bein.",
      final4: "Enorme ører.",
      final5: "Ekstraordinære blå øyne.",
      final6: "En elsker av varme, komfort og oppmerksomhet.",
      final7: "Nysgjerrig nok til å ville vite hva som skjer overalt.",
      final8: "Uttrykksfull nok til at du vanligvis vet nøyaktig hva han mener om det.",
      final9: "Og uforglemmelig nok til å fortjene sin plass på det aller første PETS & DOGUE-coveret.",
      final10: "Annerledes enn Miso.",
      final11: "Fullstendig seg selv.",
      final12: "Akkurat slik enhver forsidestjerne bør være.",

      signature: "Møt Pablo ♡",
      tagline: "Én verden. Hvert kjæledyr.",
      issueLink: "← Utgave 01",
      misoLink: "Miso",
      homeLink: "Hjem"
    },

    /* =====================================================
       FINNISH
       ===================================================== */

    fi: {
      heroKicker: "PETS & DOGUE · NUMERO 01 · KANSITARINA",
      meet: "Tapaa",
      heroTitle: "Pienet jalat.<br>Valtava persoona.",
      heroText: "Siniset silmät. Valtavat korvat. Lyhyet pienet jalat. Eikä minkäänlaista mahdollisuutta jäädä huomaamatta. Pablo on Sphynx Bambino, jonka persoonallisuus riittäisi monta kertaa suuremmalle kissalle.",
      backIssue: "← Takaisin numeroon 01",

      helloKicker: "Hei, komea ♡",
      helloTitle: "Tyylikäs<br>Sphynx",
      helloText: "Pablo on utelias, ilmeikäs ja mahdoton sivuuttaa. Hän rakastaa lämpöä, huomiota ja sitä, että saa olla juuri siellä, missä tapahtuu jotain kiinnostavaa.",

      profileKicker: "Pablon profiili",
      profileTitle: "PIENI KEHO.<br>SUURI LUONNE.",
      profileSub: "Sphynx Bambino · pienet jalat, valtava läsnäolo",

      name: "<strong>Nimi:</strong> Pablo",
      breed: "<strong>Rotu:</strong> Sphynx Bambino",
      eyes: "<strong>Silmät:</strong> unohtumattoman siniset",
      look: "<strong>Tunnusomainen ulkonäkö:</strong> valtavat korvat ja lyhyet jalat",
      loves: "<strong>Rakastaa:</strong> lämpöä, aurinkoa ja mukavia paikkoja",
      personality: "<strong>Persoonallisuus:</strong> utelias, ilmeikäs ja täynnä luonnetta",
      position: "<strong>Lempipaikka:</strong> siellä, missä tapahtuu jotain kiinnostavaa",
      feature: "<strong>Erityispiirre:</strong> mahdoton unohtaa",

      smallCat: "Pieni kissa?",
      bigPersonality: "VALTAVA PERSOONA.",

      eyesKicker: "Yksi katse riittää",
      eyesTitle: "NUO<br>SINISET SILMÄT",
      eyes1: "Joidenkin eläinten ei tarvitse pitää ääntä tehdäkseen läsnäolonsa tunnetuksi.",
      eyes2: "Pablon tarvitsee vain katsoa sinua.",
      eyes3: "Hänen poikkeukselliset siniset silmänsä, ilmeikkäät kasvonsa ja valtavat korvansa tuntuvat huomaavan kaiken.",

      warmthKicker: "☀️ Ammattimainen lämmönetsijä",
      warmthTitle: "LÖYDÄ<br>LÄMPIMIN PAIKKA",
      warmth1: "On asioita, jotka Pablo ottaa hyvin vakavasti.",
      warmth2: "Lämpö on yksi niistä.",
      warmth3: "Aurinkoinen paikka.",
      warmth4: "Pehmeä peitto.",
      warmth5: "Lämmin syli.",
      warmth6: "Toinen kissa, jonka viereen käpertyä.",
      warmth7: "Jos paikka näyttää mukavalta, Pablo on hyvin todennäköisesti jo huomannut sen.",
      warmth8: "Sphynx-kissat tunnetaan ehkä epätavallisesta ulkonäöstään, mutta jokainen sellaisen tunteva tietää, että unohtumattoman ulkokuoren takana on myös erittäin hellä kumppani, joka rakastaa mukavuutta.",
      warmthQuote: "Lämmin paikka löytyi.<br>Pablo hyväksyy.",

      momentsKicker: "Pablon hetket",
      momentsTitle: "ILME<br>JOKAISEEN TUNNELMAAN",
      lookMoment: "<strong>Katse 👀</strong>",
      lookMomentText: "Kun Pablo on jo ymmärtänyt kaiken.",
      watching: "<strong>Tarkkailee</strong>",
      watchingText: "Mikään kiinnostava ei jää noilta sinisiltä silmiltä huomaamatta.",
      recharge: "<strong>Lataustila ♡</strong>",
      rechargeText: "Valtavatkin persoonat tarvitsevat päiväunet.",

      characterKicker: "Persoonallisuusosasto",
      characterTitle: "EI KOSKAAN<br>TYLSÄ",
      tag1: "👀 UTELIAS",
      tag2: "♥ HELLÄ",
      tag3: "☀️ RAKASTAA LÄMPÖÄ",
      tag4: "✨ ILMEIKÄS",
      tag5: "🐾 PIENET JALAT",
      tag6: "⭐ SUURI LUONNE",
      character1: "Jotkut lemmikit tulevat huoneeseen hiljaa.",
      character2: "Pablo tulee huoneeseen ja muuttuu jotenkin välittömästi osaksi kaikkea, mitä siellä tapahtuu.",
      character3: "Hän haluaa tietää, mitä tapahtuu.",
      character4: "Kuka siellä on?",
      character5: "Mitä he tekevät?",
      character6: "Onko jossain lämpimämpi paikka istua?",
      character7: "Ja ehkä hieman huomiota tarjolla?",
      character8: "Lyhyet jalat pitävät hänet lähellä lattiaa, mutta hänen persoonallisuutensa täyttää koko tilan.",

      friendshipKicker: "Parempi yhdessä ♡",
      friendshipTitle: "JOPA IKONIT<br>TARVITSEVAT YSTÄVIÄ",
      friendship1: "Kaikesta itsevarmuudestaan huolimatta Pablolla on myös toinen puoli.",
      friendship2: "Hän tuntee myös ilon siitä, että saa vain olla jonkun lähellä.",
      friendship3: "Jakaa lämpöä.",
      friendship4: "Jakaa peitto.",
      friendship5: "Jakaa rauhallinen hetki.",
      friendship6: "Joskus ystävyys ei tarvitse mitään monimutkaista.",
      friendship7: "Joskus se tarkoittaa vain sitä, että päättää jäädä jonkun viereen.",

      quietKicker: "Rauhallinen puoli",
      quietTitle: "TAUKO.<br>PÄIVÄUNET.<br>UUDESTAAN.",
      quiet1: "Uteliaisuus vaatii energiaa.",
      quiet2: "Kun kaikki tutkimisen arvoinen on tutkittu, mikään ei voita täydellisen lämpimän paikan löytämistä, kuuluisien sinisten silmien sulkemista ja maailman unohtamista hetkeksi.",

      finalKicker: "Kansitähti 02",
      finalTitle: "PIENET JALAT.<br>VALTAVA PERSOONA.",
      final1: "Tässä siis Pablo.",
      final2: "Sphynx Bambino.",
      final3: "Pienet jalat.",
      final4: "Valtavat korvat.",
      final5: "Poikkeukselliset siniset silmät.",
      final6: "Lämmön, mukavuuden ja huomion ystävä.",
      final7: "Tarpeeksi utelias halutakseen tietää, mitä kaikkialla tapahtuu.",
      final8: "Tarpeeksi ilmeikäs, jotta yleensä tiedät tarkalleen, mitä mieltä hän siitä on.",
      final9: "Ja tarpeeksi unohtumaton ansaitakseen paikkansa PETS & DOGUE:n aivan ensimmäisessä kannessa.",
      final10: "Erilainen kuin Miso.",
      final11: "Täysin oma itsensä.",
      final12: "Juuri sellainen kuin jokaisen kansitähden kuuluukin olla.",

      signature: "Tapaa Pablo ♡",
      tagline: "Yksi maailma. Jokainen lemmikki.",
      issueLink: "← Numero 01",
      misoLink: "Miso",
      homeLink: "Etusivu"
    },

    /* =====================================================
       HUNGARIAN
       ===================================================== */

    hu: {
      heroKicker: "PETS & DOGUE · 01. SZÁM · CÍMLAPTÖRTÉNET",
      meet: "Ismerd meg",
      heroTitle: "Apró lábak.<br>Hatalmas személyiség.",
      heroText: "Kék szemek. Hatalmas fülek. Rövid kis lábak. És semmi esély arra, hogy észrevétlen maradjon. Pablo egy Sphynx Bambino, akiben egy nála sokszor nagyobb macskának is elegendő személyiség lakozik.",
      backIssue: "← Vissza a 01. számhoz",

      helloKicker: "Szia, szépség ♡",
      helloTitle: "Stílusos<br>Sphynx",
      helloText: "Pablo kíváncsi, kifejező és lehetetlen figyelmen kívül hagyni. Imádja a meleget, a figyelmet, és pontosan ott lenni, ahol valami érdekes történik.",

      profileKicker: "Pablo profilja",
      profileTitle: "KIS TEST.<br>NAGY KARAKTER.",
      profileSub: "Sphynx Bambino · apró lábak, hatalmas jelenlét",

      name: "<strong>Név:</strong> Pablo",
      breed: "<strong>Fajta:</strong> Sphynx Bambino",
      eyes: "<strong>Szemek:</strong> felejthetetlenül kékek",
      look: "<strong>Jellegzetes megjelenés:</strong> hatalmas fülek és rövid lábak",
      loves: "<strong>Imádja:</strong> a meleget, a napsütést és a kényelmes helyeket",
      personality: "<strong>Személyiség:</strong> kíváncsi, kifejező és tele van karakterrel",
      position: "<strong>Kedvenc hely:</strong> ahol éppen valami érdekes történik",
      feature: "<strong>Különleges ismertetőjel:</strong> lehetetlen elfelejteni",

      smallCat: "Kis macska?",
      bigPersonality: "HATALMAS SZEMÉLYISÉG.",

      eyesKicker: "Egyetlen pillantás elég",
      eyesTitle: "AZOK A<br>KÉK SZEMEK",
      eyes1: "Vannak állatok, amelyeknek egyetlen hangot sem kell kiadniuk ahhoz, hogy éreztessek a jelenlétüket.",
      eyes2: "Pablónak elég rád néznie.",
      eyes3: "Rendkívüli kék szemei, kifejező arca és hatalmas fülei mintha mindent észrevennének.",

      warmthKicker: "☀️ Professzionális meleghely-kereső",
      warmthTitle: "MEGTALÁLNI<br>A LEGMELEGEBB HELYET",
      warmth1: "Vannak dolgok, amelyeket Pablo nagyon komolyan vesz.",
      warmth2: "A meleg az egyik ilyen.",
      warmth3: "Egy napos hely.",
      warmth4: "Egy puha takaró.",
      warmth5: "Egy meleg öl.",
      warmth6: "Egy másik macska, aki mellé odabújhat.",
      warmth7: "Ha egy hely kényelmesnek tűnik, jó eséllyel Pablo már észrevette.",
      warmth8: "A Sphynx macskák talán szokatlan megjelenésükről híresek, de aki ismer egyet, tudja, hogy a felejthetetlen külső mögött egy rendkívül szeretetteljes, kényelmet imádó társ is rejtőzik.",
      warmthQuote: "Meleg hely megtalálva.<br>Pablo jóváhagyta.",

      momentsKicker: "Pablo-pillanatok",
      momentsTitle: "EGY ARC<br>MINDEN HANGULATHOZ",
      lookMoment: "<strong>A pillantás 👀</strong>",
      lookMomentText: "Amikor Pablo már mindent megértett.",
      watching: "<strong>Megfigyelés</strong>",
      watchingText: "Semmi érdekes nem kerüli el azokat a kék szemeket.",
      recharge: "<strong>Feltöltési mód ♡</strong>",
      rechargeText: "Még a hatalmas személyiségeknek is szükségük van egy kis szunyókálásra.",

      characterKicker: "Személyiségosztály",
      characterTitle: "SOHA<br>NEM UNALMAS",
      tag1: "👀 KÍVÁNCSI",
      tag2: "♥ SZERETETTELJES",
      tag3: "☀️ IMÁDJA A MELEGET",
      tag4: "✨ KIFEJEZŐ",
      tag5: "🐾 APRÓ LÁBAK",
      tag6: "⭐ NAGY KARAKTER",
      character1: "Néhány háziállat csendben lép be egy szobába.",
      character2: "Pablo belép egy szobába, és valahogy azonnal minden történés részévé válik.",
      character3: "Tudni akarja, mi történik.",
      character4: "Ki van ott?",
      character5: "Mit csinálnak?",
      character6: "Van valahol melegebb hely, ahová leülhet?",
      character7: "És talán jut neki egy kis figyelem is?",
      character8: "Rövid lábai közel tartják a földhöz, de a személyisége betölti az egész teret.",

      friendshipKicker: "Együtt jobb ♡",
      friendshipTitle: "MÉG AZ IKONOKNAK IS<br>SZÜKSÉGÜK VAN BARÁTOKRA",
      friendship1: "Minden magabiztossága ellenére Pablónak van egy másik oldala is.",
      friendship2: "Ő is ismeri annak örömét, amikor egyszerűen csak közel lehet valakihez.",
      friendship3: "Megosztani a meleget.",
      friendship4: "Megosztani egy takarót.",
      friendship5: "Megosztani egy nyugodt pillanatot.",
      friendship6: "Néha a barátságnak nincs szüksége semmi bonyolultra.",
      friendship7: "Néha egyszerűen csak azt jelenti, hogy úgy döntünk, valaki mellett maradunk.",

      quietKicker: "A nyugodt oldal",
      quietTitle: "SZÜNET.<br>SZUNDI.<br>ISMÉTLÉS.",
      quiet1: "A kíváncsiság energiát igényel.",
      quiet2: "Miután mindent megvizsgált, amit érdemes volt, nincs jobb annál, mint megtalálni a tökéletes meleg helyet, becsukni azokat a híres kék szemeket, és egy kis időre megfeledkezni a világról.",

      finalKicker: "Címlapsztár 02",
      finalTitle: "APRÓ LÁBAK.<br>HATALMAS SZEMÉLYISÉG.",
      final1: "Ő tehát Pablo.",
      final2: "Egy Sphynx Bambino.",
      final3: "Apró lábak.",
      final4: "Hatalmas fülek.",
      final5: "Rendkívüli kék szemek.",
      final6: "A meleg, a kényelem és a figyelem szerelmese.",
      final7: "Elég kíváncsi ahhoz, hogy mindenhol tudni akarja, mi történik.",
      final8: "Elég kifejező ahhoz, hogy általában pontosan tudd, mit gondol róla.",
      final9: "És elég felejthetetlen ahhoz, hogy kiérdemelje helyét a PETS & DOGUE legelső címlapján.",
      final10: "Más, mint Miso.",
      final11: "Teljesen önmaga.",
      final12: "Pontosan olyan, amilyennek minden címlapsztárnak lennie kell.",

      signature: "Ismerd meg Pablót ♡",
      tagline: "Egy világ. Minden kisállat.",
      issueLink: "← 01. szám",
      misoLink: "Miso",
      homeLink: "Főoldal"
    },

    /* =====================================================
       ARABIC — RTL
       ===================================================== */

    ar: {
      heroKicker: "PETS & DOGUE · العدد 01 · قصة الغلاف",
      meet: "تعرّفوا على",
      heroTitle: "أقدام صغيرة.<br>شخصية هائلة.",
      heroText: "عينان زرقاوان. أذنان ضخمتان. أرجل قصيرة وصغيرة. ولا توجد أي فرصة لأن يمر دون أن يلاحظه أحد. Pablo هو قط Sphynx Bambino بشخصية تكفي لقط أكبر منه عدة مرات.",
      backIssue: "العودة إلى العدد 01 →",

      helloKicker: "مرحباً أيها الوسيم ♡",
      helloTitle: "Sphynx<br>أنيق",
      helloText: "Pablo فضولي، معبّر، ومن المستحيل تجاهله. يحب الدفء والاهتمام وأن يكون بالضبط حيث يحدث شيء مثير للاهتمام.",

      profileKicker: "ملف Pablo",
      profileTitle: "جسم صغير.<br>شخصية كبيرة.",
      profileSub: "Sphynx Bambino · أرجل صغيرة وحضور هائل",

      name: "<strong>الاسم:</strong> Pablo",
      breed: "<strong>السلالة:</strong> Sphynx Bambino",
      eyes: "<strong>العينان:</strong> زرقاوان لا تُنسيان",
      look: "<strong>مظهره المميز:</strong> أذنان ضخمتان وأرجل قصيرة",
      loves: "<strong>يحب:</strong> الدفء والشمس والأماكن المريحة",
      personality: "<strong>الشخصية:</strong> فضولي، معبّر ومليء بالطابع الخاص",
      position: "<strong>المكان المفضل:</strong> حيث يحدث شيء مثير للاهتمام",
      feature: "<strong>الميزة الخاصة:</strong> من المستحيل نسيانه",

      smallCat: "قط صغير؟",
      bigPersonality: "شخصية هائلة.",

      eyesKicker: "نظرة واحدة تكفي",
      eyesTitle: "تلك<br>العيون الزرقاء",
      eyes1: "بعض الحيوانات لا تحتاج إلى إصدار أي صوت لكي تجعل حضورها محسوساً.",
      eyes2: "يكفي أن ينظر إليك Pablo.",
      eyes3: "عيناه الزرقاوان المذهلتان ووجهه المعبّر وأذناه الضخمتان تبدو وكأنها تلاحظ كل شيء.",

      warmthKicker: "☀️ خبير في البحث عن الدفء",
      warmthTitle: "العثور على<br>أدفأ مكان",
      warmth1: "هناك أشياء يأخذها Pablo على محمل الجد.",
      warmth2: "الدفء واحد منها.",
      warmth3: "مكان مشمس.",
      warmth4: "بطانية ناعمة.",
      warmth5: "حضن دافئ.",
      warmth6: "قط آخر يمكنه الالتفاف بجانبه.",
      warmth7: "إذا بدا مكان ما مريحاً، فمن المرجح جداً أن Pablo قد لاحظه بالفعل.",
      warmth8: "قد تشتهر قطط Sphynx بمظهرها غير المعتاد، لكن كل من يعرف واحداً منها يدرك أن وراء ذلك المظهر الذي لا يُنسى رفيقاً حنوناً جداً يعشق الراحة.",
      warmthQuote: "تم العثور على مكان دافئ.<br>Pablo يوافق.",

      momentsKicker: "لحظات Pablo",
      momentsTitle: "وجه<br>لكل مزاج",
      lookMoment: "<strong>تلك النظرة 👀</strong>",
      lookMomentText: "عندما يكون Pablo قد فهم كل شيء بالفعل.",
      watching: "<strong>يراقب</strong>",
      watchingText: "لا يفوت تلك العينين الزرقاوين أي شيء مثير للاهتمام.",
      recharge: "<strong>وضع إعادة الشحن ♡</strong>",
      rechargeText: "حتى الشخصيات الهائلة تحتاج إلى قيلولة.",

      characterKicker: "قسم الشخصية",
      characterTitle: "لا يكون<br>مملاً أبداً",
      tag1: "👀 فضولي",
      tag2: "♥ حنون",
      tag3: "☀️ يحب الدفء",
      tag4: "✨ معبّر",
      tag5: "🐾 أرجل صغيرة",
      tag6: "⭐ شخصية كبيرة",
      character1: "بعض الحيوانات الأليفة تدخل الغرفة بهدوء.",
      character2: "يدخل Pablo الغرفة، وبطريقة ما يصبح فوراً جزءاً من كل ما يحدث فيها.",
      character3: "يريد أن يعرف ما الذي يحدث.",
      character4: "من هناك؟",
      character5: "ماذا يفعلون؟",
      character6: "هل يوجد مكان أكثر دفئاً للجلوس؟",
      character7: "وربما بعض الاهتمام المتاح أيضاً؟",
      character8: "تبقيه أرجله القصيرة قريباً من الأرض، لكن شخصيته تملأ المكان كله.",

      friendshipKicker: "معاً أفضل ♡",
      friendshipTitle: "حتى النجوم<br>تحتاج إلى أصدقاء",
      friendship1: "على الرغم من كل ثقته بنفسه، لدى Pablo جانب آخر أيضاً.",
      friendship2: "فهو يعرف كذلك متعة أن يكون قريباً من شخص آخر ببساطة.",
      friendship3: "مشاركة الدفء.",
      friendship4: "مشاركة البطانية.",
      friendship5: "مشاركة لحظة هادئة.",
      friendship6: "أحياناً لا تحتاج الصداقة إلى أي شيء معقد.",
      friendship7: "وأحياناً تعني ببساطة أن تختار البقاء بجوار شخص ما.",

      quietKicker: "الجانب الهادئ",
      quietTitle: "توقف.<br>قيلولة.<br>كرر.",
      quiet1: "الفضول يحتاج إلى طاقة.",
      quiet2: "بعد استكشاف كل ما يستحق الاستكشاف، لا يوجد أفضل من العثور على المكان الدافئ المثالي، وإغلاق تلك العينين الزرقاوين الشهيرتين، ونسيان العالم لبعض الوقت.",

      finalKicker: "نجم الغلاف 02",
      finalTitle: "أقدام صغيرة.<br>شخصية هائلة.",
      final1: "إذاً، هذا هو Pablo.",
      final2: "قط Sphynx Bambino.",
      final3: "أرجل صغيرة.",
      final4: "أذنان ضخمتان.",
      final5: "عينان زرقاوان مذهلتان.",
      final6: "محب للدفء والراحة والاهتمام.",
      final7: "فضولي بما يكفي ليرغب في معرفة ما يحدث في كل مكان.",
      final8: "ومعبّر بما يكفي لكي تعرف عادةً بالضبط ما الذي يفكر فيه.",
      final9: "ولا يُنسى بما يكفي ليستحق مكانه على أول غلاف لـ PETS & DOGUE.",
      final10: "مختلف عن Miso.",
      final11: "هو نفسه تماماً.",
      final12: "تماماً كما ينبغي أن يكون كل نجم غلاف.",

      signature: "تعرّفوا على Pablo ♡",
      tagline: "عالم واحد. كل حيوان أليف.",
      issueLink: "العدد 01 →",
      misoLink: "Miso",
      homeLink: "الرئيسية"
    },

    /* =====================================================
       HINDI
       ===================================================== */

    hi: {
      heroKicker: "PETS & DOGUE · अंक 01 · कवर स्टोरी",
      meet: "मिलिए",
      heroTitle: "छोटे पैर.<br>विशाल व्यक्तित्व.",
      heroText: "नीली आँखें। विशाल कान। छोटे-छोटे पैर। और बिना ध्यान खींचे निकल जाने की बिल्कुल कोई संभावना नहीं। Pablo एक Sphynx Bambino है, जिसकी शख्सियत उससे कई गुना बड़ी बिल्ली जितनी है।",
      backIssue: "← अंक 01 पर वापस जाएँ",

      helloKicker: "हैलो, हैंडसम ♡",
      helloTitle: "स्टाइलिश<br>Sphynx",
      helloText: "Pablo जिज्ञासु, भावपूर्ण और ऐसा है जिसे नज़रअंदाज़ करना असंभव है। उसे गर्माहट, ध्यान और ठीक वहीं रहना पसंद है जहाँ कुछ दिलचस्प हो रहा हो।",

      profileKicker: "Pablo की प्रोफ़ाइल",
      profileTitle: "छोटा शरीर.<br>बड़ा किरदार.",
      profileSub: "Sphynx Bambino · छोटे पैर, विशाल मौजूदगी",

      name: "<strong>नाम:</strong> Pablo",
      breed: "<strong>नस्ल:</strong> Sphynx Bambino",
      eyes: "<strong>आँखें:</strong> अविस्मरणीय नीली",
      look: "<strong>खास पहचान:</strong> विशाल कान और छोटे पैर",
      loves: "<strong>पसंद:</strong> गर्माहट, धूप और आरामदायक जगहें",
      personality: "<strong>व्यक्तित्व:</strong> जिज्ञासु, भावपूर्ण और चरित्र से भरपूर",
      position: "<strong>पसंदीदा जगह:</strong> जहाँ कुछ दिलचस्प हो रहा हो",
      feature: "<strong>खास विशेषता:</strong> जिसे भूलना असंभव है",

      smallCat: "छोटी बिल्ली?",
      bigPersonality: "विशाल व्यक्तित्व.",

      eyesKicker: "एक नज़र ही काफी है",
      eyesTitle: "वे<br>नीली आँखें",
      eyes1: "कुछ जानवरों को अपनी मौजूदगी महसूस कराने के लिए कोई आवाज़ करने की ज़रूरत नहीं होती।",
      eyes2: "Pablo को बस आपकी ओर देखना होता है।",
      eyes3: "उसकी असाधारण नीली आँखें, भावपूर्ण चेहरा और विशाल कान मानो हर चीज़ पर ध्यान देते हैं।",

      warmthKicker: "☀️ गर्म जगह खोजने का विशेषज्ञ",
      warmthTitle: "सबसे गर्म<br>जगह ढूँढना",
      warmth1: "कुछ चीज़ें हैं जिन्हें Pablo बहुत गंभीरता से लेता है।",
      warmth2: "गर्माहट उनमें से एक है।",
      warmth3: "धूप वाली जगह।",
      warmth4: "मुलायम कंबल।",
      warmth5: "गर्म गोद।",
      warmth6: "कोई दूसरी बिल्ली जिसके पास वह सिमट सके।",
      warmth7: "अगर कोई जगह आरामदायक दिखती है, तो बहुत संभव है कि Pablo उसे पहले ही देख चुका हो।",
      warmth8: "Sphynx बिल्लियाँ अपने असामान्य रूप के लिए प्रसिद्ध हो सकती हैं, लेकिन जो भी उन्हें जानता है वह समझता है कि उस अविस्मरणीय रूप के पीछे एक बेहद स्नेही साथी भी है जिसे आराम बहुत पसंद है।",
      warmthQuote: "गर्म जगह मिल गई।<br>Pablo की मंज़ूरी.",

      momentsKicker: "Pablo के पल",
      momentsTitle: "हर मूड के लिए<br>एक चेहरा",
      lookMoment: "<strong>वह नज़र 👀</strong>",
      lookMomentText: "जब Pablo पहले ही सब कुछ समझ चुका हो।",
      watching: "<strong>निगरानी</strong>",
      watchingText: "उन नीली आँखों से कोई दिलचस्प चीज़ नहीं बचती।",
      recharge: "<strong>रीचार्ज मोड ♡</strong>",
      rechargeText: "विशाल व्यक्तित्वों को भी झपकी की ज़रूरत होती है।",

      characterKicker: "व्यक्तित्व विभाग",
      characterTitle: "कभी भी<br>बोरिंग नहीं",
      tag1: "👀 जिज्ञासु",
      tag2: "♥ स्नेही",
      tag3: "☀️ गर्माहट पसंद",
      tag4: "✨ भावपूर्ण",
      tag5: "🐾 छोटे पैर",
      tag6: "⭐ बड़ा किरदार",
      character1: "कुछ पालतू जानवर चुपचाप कमरे में आते हैं।",
      character2: "Pablo कमरे में आता है और किसी तरह तुरंत हर चीज़ का हिस्सा बन जाता है।",
      character3: "वह जानना चाहता है कि क्या हो रहा है।",
      character4: "वहाँ कौन है?",
      character5: "वे क्या कर रहे हैं?",
      character6: "क्या बैठने के लिए कोई और गर्म जगह है?",
      character7: "और शायद थोड़ा ध्यान भी मिल सकता है?",
      character8: "उसके छोटे पैर उसे ज़मीन के करीब रखते हैं, लेकिन उसकी शख्सियत पूरे कमरे को भर देती है।",

      friendshipKicker: "साथ में बेहतर ♡",
      friendshipTitle: "आइकॉन को भी<br>दोस्तों की ज़रूरत होती है",
      friendship1: "अपने पूरे आत्मविश्वास के बावजूद Pablo का एक दूसरा पहलू भी है।",
      friendship2: "वह सिर्फ किसी के पास रहने की खुशी को भी समझता है।",
      friendship3: "गर्माहट बाँटना।",
      friendship4: "कंबल बाँटना।",
      friendship5: "एक शांत पल बाँटना।",
      friendship6: "कभी-कभी दोस्ती को किसी जटिल चीज़ की ज़रूरत नहीं होती।",
      friendship7: "कभी-कभी इसका मतलब बस किसी के पास रहने का चुनाव करना होता है।",

      quietKicker: "शांत पहलू",
      quietTitle: "रुको.<br>झपकी लो.<br>फिर दोहराओ.",
      quiet1: "जिज्ञासा के लिए ऊर्जा चाहिए।",
      quiet2: "हर उस चीज़ को जाँच लेने के बाद जो जाँचने लायक थी, सही गर्म जगह ढूँढने, उन मशहूर नीली आँखों को बंद करने और थोड़ी देर के लिए दुनिया को भूल जाने से बेहतर कुछ नहीं।",

      finalKicker: "कवर स्टार 02",
      finalTitle: "छोटे पैर.<br>विशाल व्यक्तित्व.",
      final1: "तो यह है Pablo.",
      final2: "एक Sphynx Bambino.",
      final3: "छोटे पैर.",
      final4: "विशाल कान.",
      final5: "असाधारण नीली आँखें.",
      final6: "गर्माहट, आराम और ध्यान का प्रेमी.",
      final7: "इतना जिज्ञासु कि हर जगह क्या हो रहा है, यह जानना चाहता है.",
      final8: "इतना भावपूर्ण कि आम तौर पर आप ठीक-ठीक समझ जाते हैं कि वह इसके बारे में क्या सोचता है.",
      final9: "और इतना अविस्मरणीय कि PETS & DOGUE के पहले कवर पर अपनी जगह का हकदार है.",
      final10: "Miso से अलग.",
      final11: "पूरी तरह से खुद.",
      final12: "बिल्कुल वैसा, जैसा हर कवर स्टार को होना चाहिए.",

      signature: "मिलिए Pablo से ♡",
      tagline: "एक दुनिया. हर पालतू जानवर.",
      issueLink: "← अंक 01",
      misoLink: "Miso",
      homeLink: "होम"
    }

  };  /* =========================================================
     LANGUAGE HELPERS
     ========================================================= */

  function normalizeLang(value) {
    if (!value) return "en";

    let lang = String(value)
      .trim()
      .toLowerCase()
      .replace("_", "-");

    if (ALIASES[lang]) {
      lang = ALIASES[lang];
    }

    if (lang.includes("-")) {
      const base = lang.split("-")[0];
      lang = ALIASES[base] || base;
    }

    return SUPPORTED.includes(lang) ? lang : "en";
  }

  function readStoredLanguage() {
    const keys = [
      STORE_KEY,
      "pets_dogue_lang",
      "pets-dogue-language",
      "pd_language",
      "language",
      "lang"
    ];

    for (const key of keys) {
      try {
        const value = localStorage.getItem(key);

        if (value) {
          const normalized = normalizeLang(value);

          if (SUPPORTED.includes(normalized)) {
            return normalized;
          }
        }
      } catch (error) {
        /* localStorage may be unavailable */
      }
    }

    return null;
  }

  function writeStoredLanguage(lang) {
    const normalized = normalizeLang(lang);

    try {
      localStorage.setItem(STORE_KEY, normalized);
    } catch (error) {
      /* localStorage may be unavailable */
    }

    return normalized;
  }

  function languageFromDocument() {
    const htmlLang = document.documentElement.getAttribute("lang");

    if (!htmlLang) return null;

    const normalized = normalizeLang(htmlLang);

    return SUPPORTED.includes(normalized) ? normalized : null;
  }

  function languageFromControls() {
    const selectors = [
      "[data-language-select]",
      "[data-lang-select]",
      "#languageSelect",
      "#language-select",
      "#langSelect",
      "#lang-select",
      "select[name='language']",
      "select[name='lang']"
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);

      if (
        element &&
        typeof element.value === "string" &&
        element.value.trim()
      ) {
        const normalized = normalizeLang(element.value);

        if (SUPPORTED.includes(normalized)) {
          return normalized;
        }
      }
    }

    return null;
  }

  function getCurrentLanguage() {
    /*
      IMPORTANT:
      localStorage is the shared source of truth between
      Issue 01, Miso, Jessica and Pablo.

      This fixes the case:
      Pablo = Turkish
      → Back to Issue 01
      → change language to Hungarian
      → open Pablo again
      → Pablo must now be Hungarian.
    */

    return (
      readStoredLanguage() ||
      languageFromControls() ||
      languageFromDocument() ||
      "en"
    );
  }


  /* =========================================================
     RTL / DOCUMENT LANGUAGE
     ========================================================= */

  function applyDocumentDirection(lang) {
    const normalized = normalizeLang(lang);
    const isRTL = RTL.has(normalized);

    document.documentElement.lang = normalized;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";

    if (document.body) {
      document.body.dir = isRTL ? "rtl" : "ltr";
      document.body.classList.toggle("is-rtl", isRTL);
    }
  }


  /* =========================================================
     TRANSLATABLE ELEMENTS
     ========================================================= */

  function setHTML(selector, value) {
    if (value === undefined || value === null) return;

    document.querySelectorAll(selector).forEach((element) => {
      element.innerHTML = value;
    });
  }

  function setText(selector, value) {
    if (value === undefined || value === null) return;

    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  }

  function applyDataI18n(dictionary) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      if (!key) return;
      if (!Object.prototype.hasOwnProperty.call(dictionary, key)) return;

      element.innerHTML = dictionary[key];
    });
  }

  function applyDataI18nText(dictionary) {
    document.querySelectorAll("[data-i18n-text]").forEach((element) => {
      const key = element.getAttribute("data-i18n-text");

      if (!key) return;
      if (!Object.prototype.hasOwnProperty.call(dictionary, key)) return;

      element.textContent = dictionary[key];
    });
  }

  function applyDataI18nAttribute(dictionary) {
    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      const definition = element.getAttribute("data-i18n-attr");

      if (!definition) return;

      definition.split(",").forEach((item) => {
        const pair = item.trim().split(":");

        if (pair.length !== 2) return;

        const attribute = pair[0].trim();
        const key = pair[1].trim();

        if (!attribute || !key) return;
        if (!Object.prototype.hasOwnProperty.call(dictionary, key)) return;

        element.setAttribute(attribute, dictionary[key]);
      });
    });
  }


  /* =========================================================
     FALLBACK SELECTORS
     Keeps compatibility with Pablo HTML if some elements
     use IDs/classes instead of data-i18n.
     ========================================================= */

  const SELECTORS = {
    heroKicker: [
      "#heroKicker",
      ".hero-kicker",
      "[data-pablo='heroKicker']"
    ],

    meet: [
      "#meet",
      ".hero-meet",
      "[data-pablo='meet']"
    ],

    heroTitle: [
      "#heroTitle",
      ".hero-title",
      "[data-pablo='heroTitle']"
    ],

    heroText: [
      "#heroText",
      ".hero-text",
      "[data-pablo='heroText']"
    ],

    backIssue: [
      "#backIssue",
      ".back-issue",
      "[data-pablo='backIssue']"
    ],

    helloKicker: [
      "#helloKicker",
      "[data-pablo='helloKicker']"
    ],

    helloTitle: [
      "#helloTitle",
      "[data-pablo='helloTitle']"
    ],

    helloText: [
      "#helloText",
      "[data-pablo='helloText']"
    ],

    profileKicker: [
      "#profileKicker",
      "[data-pablo='profileKicker']"
    ],

    profileTitle: [
      "#profileTitle",
      "[data-pablo='profileTitle']"
    ],

    profileSub: [
      "#profileSub",
      "[data-pablo='profileSub']"
    ],

    name: [
      "#pabloName",
      "[data-pablo='name']"
    ],

    breed: [
      "#pabloBreed",
      "[data-pablo='breed']"
    ],

    eyes: [
      "#pabloEyes",
      "[data-pablo='eyes']"
    ],

    look: [
      "#pabloLook",
      "[data-pablo='look']"
    ],

    loves: [
      "#pabloLoves",
      "[data-pablo='loves']"
    ],

    personality: [
      "#pabloPersonality",
      "[data-pablo='personality']"
    ],

    position: [
      "#pabloPosition",
      "[data-pablo='position']"
    ],

    feature: [
      "#pabloFeature",
      "[data-pablo='feature']"
    ],

    smallCat: [
      "#smallCat",
      "[data-pablo='smallCat']"
    ],

    bigPersonality: [
      "#bigPersonality",
      "[data-pablo='bigPersonality']"
    ],

    eyesKicker: [
      "#eyesKicker",
      "[data-pablo='eyesKicker']"
    ],

    eyesTitle: [
      "#eyesTitle",
      "[data-pablo='eyesTitle']"
    ],

    eyes1: [
      "#eyes1",
      "[data-pablo='eyes1']"
    ],

    eyes2: [
      "#eyes2",
      "[data-pablo='eyes2']"
    ],

    eyes3: [
      "#eyes3",
      "[data-pablo='eyes3']"
    ],

    warmthKicker: [
      "#warmthKicker",
      "[data-pablo='warmthKicker']"
    ],

    warmthTitle: [
      "#warmthTitle",
      "[data-pablo='warmthTitle']"
    ],

    warmth1: [
      "#warmth1",
      "[data-pablo='warmth1']"
    ],

    warmth2: [
      "#warmth2",
      "[data-pablo='warmth2']"
    ],

    warmth3: [
      "#warmth3",
      "[data-pablo='warmth3']"
    ],

    warmth4: [
      "#warmth4",
      "[data-pablo='warmth4']"
    ],

    warmth5: [
      "#warmth5",
      "[data-pablo='warmth5']"
    ],

    warmth6: [
      "#warmth6",
      "[data-pablo='warmth6']"
    ],

    warmth7: [
      "#warmth7",
      "[data-pablo='warmth7']"
    ],

    warmth8: [
      "#warmth8",
      "[data-pablo='warmth8']"
    ],

    warmthQuote: [
      "#warmthQuote",
      "[data-pablo='warmthQuote']"
    ],

    momentsKicker: [
      "#momentsKicker",
      "[data-pablo='momentsKicker']"
    ],

    momentsTitle: [
      "#momentsTitle",
      "[data-pablo='momentsTitle']"
    ],

    lookMoment: [
      "#lookMoment",
      "[data-pablo='lookMoment']"
    ],

    lookMomentText: [
      "#lookMomentText",
      "[data-pablo='lookMomentText']"
    ],

    watching: [
      "#watching",
      "[data-pablo='watching']"
    ],

    watchingText: [
      "#watchingText",
      "[data-pablo='watchingText']"
    ],

    recharge: [
      "#recharge",
      "[data-pablo='recharge']"
    ],

    rechargeText: [
      "#rechargeText",
      "[data-pablo='rechargeText']"
    ],

    characterKicker: [
      "#characterKicker",
      "[data-pablo='characterKicker']"
    ],

    characterTitle: [
      "#characterTitle",
      "[data-pablo='characterTitle']"
    ],

    tag1: [
      "#tag1",
      "[data-pablo='tag1']"
    ],

    tag2: [
      "#tag2",
      "[data-pablo='tag2']"
    ],

    tag3: [
      "#tag3",
      "[data-pablo='tag3']"
    ],

    tag4: [
      "#tag4",
      "[data-pablo='tag4']"
    ],

    tag5: [
      "#tag5",
      "[data-pablo='tag5']"
    ],

    tag6: [
      "#tag6",
      "[data-pablo='tag6']"
    ],

    character1: [
      "#character1",
      "[data-pablo='character1']"
    ],

    character2: [
      "#character2",
      "[data-pablo='character2']"
    ],

    character3: [
      "#character3",
      "[data-pablo='character3']"
    ],

    character4: [
      "#character4",
      "[data-pablo='character4']"
    ],

    character5: [
      "#character5",
      "[data-pablo='character5']"
    ],

    character6: [
      "#character6",
      "[data-pablo='character6']"
    ],

    character7: [
      "#character7",
      "[data-pablo='character7']"
    ],

    character8: [
      "#character8",
      "[data-pablo='character8']"
    ],

    friendshipKicker: [
      "#friendshipKicker",
      "[data-pablo='friendshipKicker']"
    ],

    friendshipTitle: [
      "#friendshipTitle",
      "[data-pablo='friendshipTitle']"
    ],

    friendship1: [
      "#friendship1",
      "[data-pablo='friendship1']"
    ],

    friendship2: [
      "#friendship2",
      "[data-pablo='friendship2']"
    ],

    friendship3: [
      "#friendship3",
      "[data-pablo='friendship3']"
    ],

    friendship4: [
      "#friendship4",
      "[data-pablo='friendship4']"
    ],

    friendship5: [
      "#friendship5",
      "[data-pablo='friendship5']"
    ],

    friendship6: [
      "#friendship6",
      "[data-pablo='friendship6']"
    ],

    friendship7: [
      "#friendship7",
      "[data-pablo='friendship7']"
    ],

    quietKicker: [
      "#quietKicker",
      "[data-pablo='quietKicker']"
    ],

    quietTitle: [
      "#quietTitle",
      "[data-pablo='quietTitle']"
    ],

    quiet1: [
      "#quiet1",
      "[data-pablo='quiet1']"
    ],

    quiet2: [
      "#quiet2",
      "[data-pablo='quiet2']"
    ],

    finalKicker: [
      "#finalKicker",
      "[data-pablo='finalKicker']"
    ],

    finalTitle: [
      "#finalTitle",
      "[data-pablo='finalTitle']"
    ],

    final1: [
      "#final1",
      "[data-pablo='final1']"
    ],

    final2: [
      "#final2",
      "[data-pablo='final2']"
    ],

    final3: [
      "#final3",
      "[data-pablo='final3']"
    ],

    final4: [
      "#final4",
      "[data-pablo='final4']"
    ],

    final5: [
      "#final5",
      "[data-pablo='final5']"
    ],

    final6: [
      "#final6",
      "[data-pablo='final6']"
    ],

    final7: [
      "#final7",
      "[data-pablo='final7']"
    ],

    final8: [
      "#final8",
      "[data-pablo='final8']"
    ],

    final9: [
      "#final9",
      "[data-pablo='final9']"
    ],

    final10: [
      "#final10",
      "[data-pablo='final10']"
    ],

    final11: [
      "#final11",
      "[data-pablo='final11']"
    ],

    final12: [
      "#final12",
      "[data-pablo='final12']"
    ],

    signature: [
      "#signature",
      "[data-pablo='signature']"
    ],

    tagline: [
      "#tagline",
      "[data-pablo='tagline']"
    ],

    issueLink: [
      "#issueLink",
      "[data-pablo='issueLink']"
    ],

    misoLink: [
      "#misoLink",
      "[data-pablo='misoLink']"
    ],

    homeLink: [
      "#homeLink",
      "[data-pablo='homeLink']"
    ]
  };


  /* =========================================================
     APPLY FALLBACK SELECTORS
     ========================================================= */

  function applyFallbackSelectors(dictionary) {
    Object.keys(SELECTORS).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(dictionary, key)) return;

      const value = dictionary[key];

      SELECTORS[key].forEach((selector) => {
        setHTML(selector, value);
      });
    });
  }


  /* =========================================================
     LANGUAGE CONTROL SYNC
     ========================================================= */

  function syncLanguageControls(lang) {
    const normalized = normalizeLang(lang);

    const selectors = [
      "[data-language-select]",
      "[data-lang-select]",
      "#languageSelect",
      "#language-select",
      "#langSelect",
      "#lang-select",
      "select[name='language']",
      "select[name='lang']"
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (!("value" in element)) return;

        const options = Array.from(element.options || []);

        const matchingOption = options.find((option) => {
          return normalizeLang(option.value) === normalized;
        });

        if (matchingOption) {
          element.value = matchingOption.value;
        }
      });
    });
  }


  /* =========================================================
     APPLY LANGUAGE
     ========================================================= */

  let activeLanguage = null;
  let applyingLanguage = false;

  function applyLanguage(lang, options = {}) {
    if (applyingLanguage) return;

    const normalized = normalizeLang(lang);
    const dictionary = T[normalized] || T.en;

    applyingLanguage = true;

    try {
      if (options.save !== false) {
        writeStoredLanguage(normalized);
      }

      applyDocumentDirection(normalized);

      /*
        Preferred translation method.
        Elements in Pablo HTML can use:
        data-i18n="heroTitle"
      */
      applyDataI18n(dictionary);
      applyDataI18nText(dictionary);
      applyDataI18nAttribute(dictionary);

      /*
        Compatibility layer for the current Pablo page.
      */
      applyFallbackSelectors(dictionary);

      syncLanguageControls(normalized);

      activeLanguage = normalized;

      document.dispatchEvent(
        new CustomEvent("petsdogue:language-applied", {
          detail: {
            language: normalized,
            page: "pablo"
          }
        })
      );
    } finally {
      applyingLanguage = false;
    }
  }


  /* =========================================================
     SYNC FROM SHARED SITE LANGUAGE
     ========================================================= */

  function syncFromSharedLanguage(force = false) {
    const lang = getCurrentLanguage();

    if (force || lang !== activeLanguage) {
      /*
        Do NOT overwrite shared storage here.
        We are reading the language selected elsewhere
        and applying it to Pablo.
      */
      applyLanguage(lang, {
        save: false
      });
    }
  }


  /* =========================================================
     LANGUAGE CHANGE INSIDE PABLO
     ========================================================= */

  function handleLanguageChange(event) {
    const target = event.target;

    if (!target) return;

    const isLanguageControl =
      target.matches("[data-language-select]") ||
      target.matches("[data-lang-select]") ||
      target.matches("#languageSelect") ||
      target.matches("#language-select") ||
      target.matches("#langSelect") ||
      target.matches("#lang-select") ||
      target.matches("select[name='language']") ||
      target.matches("select[name='lang']");

    if (!isLanguageControl) return;

    const lang = normalizeLang(target.value);

    /*
      A language selected inside Pablo becomes
      the shared language for the whole site.
    */
    writeStoredLanguage(lang);

    applyLanguage(lang, {
      save: false
    });
  }


  /* =========================================================
     CUSTOM LANGUAGE EVENTS
     Compatibility with the global PETS & DOGUE shell.
     ========================================================= */

  function languageFromEvent(event) {
    if (!event || !event.detail) return null;

    const value =
      event.detail.language ||
      event.detail.lang ||
      event.detail.code ||
      event.detail.locale;

    if (!value) return null;

    return normalizeLang(value);
  }

  function handleCustomLanguageEvent(event) {
    const lang = languageFromEvent(event);

    if (!lang) {
      syncFromSharedLanguage(true);
      return;
    }

    writeStoredLanguage(lang);

    applyLanguage(lang, {
      save: false
    });
  }


  /* =========================================================
     STORAGE EVENT
     Handles language changes from another tab/window.
     ========================================================= */

  function handleStorage(event) {
    const acceptedKeys = new Set([
      STORE_KEY,
      "pets_dogue_lang",
      "pets-dogue-language",
      "pd_language",
      "language",
      "lang"
    ]);

    if (!event || !acceptedKeys.has(event.key)) return;

    const lang = event.newValue
      ? normalizeLang(event.newValue)
      : getCurrentLanguage();

    applyLanguage(lang, {
      save: false
    });
  }


  /* =========================================================
     BFCache / BACK-FORWARD NAVIGATION FIX

     This is important on mobile browsers.
     When Pablo is restored from browser memory, the old
     Turkish/Hungarian/etc. DOM may still be visible even
     though Issue 01 has already changed the shared language.

     pageshow forces Pablo to read the shared language again.
     ========================================================= */

  function handlePageShow() {
    syncFromSharedLanguage(true);
  }


  /* =========================================================
     TAB / APP RETURN FIX
     ========================================================= */

  function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
      syncFromSharedLanguage(true);
    }
  }

  function handleWindowFocus() {
    syncFromSharedLanguage(true);
  }


  /* =========================================================
     LANGUAGE ATTRIBUTE OBSERVER

     If the global shell changes <html lang=""> directly,
     Pablo follows it immediately.
     ========================================================= */

  let lastObservedDocumentLanguage = null;

  const htmlLanguageObserver = new MutationObserver(() => {
    if (applyingLanguage) return;

    const rawLang = document.documentElement.getAttribute("lang");

    if (!rawLang) return;

    const lang = normalizeLang(rawLang);

    if (lang === lastObservedDocumentLanguage) return;

    lastObservedDocumentLanguage = lang;

    const stored = readStoredLanguage();

    /*
      If the shell changed the HTML language intentionally,
      keep shared storage synchronized with it.
    */
    if (lang !== stored) {
      writeStoredLanguage(lang);
    }

    if (lang !== activeLanguage) {
      applyLanguage(lang, {
        save: false
      });
    }
  });


  /* =========================================================
     PUBLIC API

     This allows the global shell to call:
     window.PetsDoguePablo.setLanguage("hu")
     ========================================================= */

  window.PetsDoguePablo = {
    setLanguage(lang) {
      const normalized = normalizeLang(lang);

      writeStoredLanguage(normalized);

      applyLanguage(normalized, {
        save: false
      });
    },

    getLanguage() {
      return activeLanguage || getCurrentLanguage();
    },

    refresh() {
      syncFromSharedLanguage(true);
    },

    supportedLanguages: SUPPORTED.slice()
  };


  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function init() {
    /*
      FIRST:
      read the shared stored language.

      This prevents the HTML default language from overriding
      a language selected on Issue 01 before entering Pablo.
    */
    const initialLanguage = getCurrentLanguage();

    applyLanguage(initialLanguage, {
      save: false
    });

    lastObservedDocumentLanguage = initialLanguage;

    document.addEventListener("change", handleLanguageChange, true);

    /*
      Support the language events used by different versions
      of the PETS & DOGUE global shell.
    */
    document.addEventListener(
      "petsdogue:language-change",
      handleCustomLanguageEvent
    );

    document.addEventListener(
      "petsdogue:language-changed",
      handleCustomLanguageEvent
    );

    document.addEventListener(
      "pets-dogue:language-change",
      handleCustomLanguageEvent
    );

    document.addEventListener(
      "pd:language-change",
      handleCustomLanguageEvent
    );

    window.addEventListener("storage", handleStorage);

    window.addEventListener("pageshow", handlePageShow);

    window.addEventListener("focus", handleWindowFocus);

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    htmlLanguageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });

    /*
      Final synchronization after all normal page scripts
      have had an opportunity to initialize.
    */
    window.setTimeout(() => {
      syncFromSharedLanguage(true);
    }, 0);

    window.setTimeout(() => {
      syncFromSharedLanguage(true);
    }, 250);
  }


  /* =========================================================
     START
     ========================================================= */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }

})();
