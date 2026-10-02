/* =========================================================
   PETS & DOGUE — ISSUE 01 — MISO
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

  const RTL = new Set(["ar", "he"]);

  const SUPPORTED = [
    "en", "uk", "ru", "fr", "de", "es",
    "it", "pt", "nl", "pl", "cs", "sk",
    "ro", "bg", "el", "tr", "sv", "da",
    "no", "fi", "hu", "ar", "he"
  ];

  const T = {

    /* =====================================================
       ENGLISH
    ===================================================== */

    en: {
      coverKicker: "PETS & DOGUE · ISSUE 01 · COVER STORY ✨",
      coverMeet: "Meet",
      coverBlue: "Little paws.<br>Big world. ✨",
      coverText: "A tiny blonde Pomeranian from London, with a curious nose and a very big world to discover.",
      backIssue: "← Back to Issue 01",

      helloKicker: "Hello, new friend ♥ ✨",
      helloTitle: "Hi, I’m",
      helloText: "Tiny, fluffy, blonde and living in London. I love beautiful places, long walks, fashion and meeting new friends.",

      profileKicker: "The Miso profile ✨",
      profileTitle: "LITTLE DOG.<br>BIG PERSONALITY.",
      profileSub: "Pomeranian · London · very compact.",

      breed: "Breed",
      breedValue: "Pomeranian",
      city: "City",
      cityValue: "London",
      size: "Size",
      sizeValue: "Tiny",
      coat: "Coat",
      coatValue: "Soft fluffy blonde",
      personality: "Personality",
      personalityValue: "Gentle & curious",
      loves: "Loves",
      lovesValue: "Walks & travel",
      weakness: "Weakness",
      weaknessValue: "Treats",
      looking: "Looking for",
      lookingValue: "New friends",
      swipe: "Swipe right?",
      match: "It’s a match! ♥ ✨",

      favourites: "Miso’s favourites ♥ ✨",
      world: "MY LITTLE<br>WORLD",

      travel: "Travel ✈️✨",
      travelText: "Little paws. New places.",
      playtime: "Playtime 🧸💕",
      playtimeText: "My favourite kind of serious business.",
      fashion: "Fashion 👗💕",
      fashionText: "A little pink. A lot of Miso.",
      london: "London 🇬🇧💙",
      londonText: "My city. My little adventures.",
      friends: "Friends 💕🐾",
      friendsText: "Adventures are better together.",

      diaryKicker: "From Miso’s diary ♥ ✨",
      diaryTitle: "ONE LITTLE DOG.<br>A VERY BIG IDEA. ✨",
      diaryLead: "I think it all started with me. 💕",
      diary1: "When I arrived, my family suddenly had a whole new list of questions.",
      diaryNote: "Where can we go together?<br>Which cafés will welcome me?<br>Which hotels really love pets?<br>Where can we walk, travel and meet new friends?",
      diary2: "One tiny dog — and suddenly the world looked completely different.",
      diary3: "We began looking for places, discovering new routes and collecting useful answers.",
      diary4: "Every walk became a little investigation. Every trip brought another discovery. Every new place gave us something useful to remember.",
      diary5: "Maybe that was the beginning of PETS & DOGUE. ♥",
      pull: "One little dog.<br>One very big world. 🌍✨",

      seaKicker: "Miso explores ✨",
      seaTitle: "The<br>sea 🌊",
      seaText: "New smells.<br>New sounds.<br>Big world. 💙",

      londonKicker: "My London ♥ ✨",
      londonTitle: "MY CITY —<br>LONDON",
      londonFeature: "Miso in London 💙",
      londonFeatureSub: "Tiny paws. Big city. 🎀✨",
      london1: "London never feels exactly the same twice. ♥",
      london2: "A park today. 🌳<br>A little café tomorrow. ☕<br>Then the river, a market, a red bus 🚌<br>or a street I have never seen before.",
      london3: "I stop. I look. I sniff. Then I choose another direction. ✨",
      london4: "Sometimes the best part is the destination. Sometimes it is everything I notice on the way there.",
      london5: "For me, a walk is not simply going outside. It is how I discover the world. 🌍",

      friendKicker: "Hello, new friend ♥ ✨",
      friendTitle: "IT’S A<br>MATCH! 💕",
      friend1: "Hi. I’m Miso Cute.",
      friend2: "I’m tiny, gentle, curious and always interested in meeting someone new.",
      friend3: "Some adventures are made for exploring. Others are made for sharing. 🐾",
      friend4: "A new face. A little hello. And sometimes — a new friend.",
      friend5: "The best part of a new adventure is never knowing who you might meet. ♥",

      everyoneKicker: "Everyone is invited ♥ ✨",
      everyoneTitle: "THERE IS ROOM<br>FOR EVERYONE.",
      animals: "🐶 Dogs, 🐱 cats, 🦜 parrots, 🐰 rabbits, 🐴 horses, 🐢 turtles, guinea pigs, 🐠 fish, 🐦 birds and reptiles.",
      everyone1: "Big. Small. Fluffy. Feathered. Smooth.",
      everyone2: "Some have paws. Some have wings. Some have fins.",
      everyone3: "Some want to run beside us. Some prefer a warm quiet corner. Some watch the whole world from a branch, a tank or a favourite window.",
      everyone4: "Everyone is welcome here. ♥ 🌍✨",
      everyone5: "We do not need to look the same to belong to the same world.",
      everyone6: "That is exactly the point.",
      everyone7: "PETS & DOGUE is about animals — and the people who love them.",

      askKicker: "Curiosity department ♥ ✨",
      askTitle: "AND IF YOU<br>NEED MY HELP...",
      askMark: "Ask my curious little nose ♥",
      askMarkSub: "Miso knows where to look. ✨",
      ask1: "Need somewhere to go?",
      ask2: "Looking for a pet-friendly place? 🐾",
      ask3: "Planning a trip? ✈️",
      ask4: "Looking for something useful?",
      ask5: "I look. I sniff. I explore. ✨",
      ask6: "And when I find something interesting, I bring it back to PETS & DOGUE.",
      ask7: "That is what a curious little nose is for. ♥",
      askLabel: "Ask Miso ✨",

      finalKicker: "See you somewhere in the world ✨",
      finalTitle: "SEE YOU<br>OUT THERE.",
      finalBlue: "One world.<br>Every pet. 🌍",
      final1: "Today we might meet in London. Tomorrow — by the sea.",
      final2: "Maybe in a park, a café or somewhere completely unexpected.",
      final3: "If you see a tiny fluffy blonde seriously exploring somewhere new — come and say hello. 💕",
      final4: "And if we are far away from each other for now, look for my little circle on PETS & DOGUE.",
      final5: "One way or another, we will meet. ♥",
      signature: "With love,<br>Miso ♥",
      tagline: "One world. Every pet. ♥",
      issueLink: "← Issue 01",
      home: "Home"
    },

    /* =====================================================
       UKRAINIAN
    ===================================================== */

    uk: {
      coverKicker: "PETS & DOGUE · ВИПУСК 01 · ІСТОРІЯ ОБКЛАДИНКИ ✨",
      coverMeet: "Знайомтеся:",
      coverBlue: "Маленькі лапки.<br>Великий світ. ✨",
      coverText: "Крихітна білява померанка з Лондона, з допитливим носиком і величезним світом, який хочеться дослідити.",
      backIssue: "← Назад до Випуску 01",

      helloKicker: "Привіт, новий друже ♥ ✨",
      helloTitle: "Привіт, я",
      helloText: "Маленька, пухнаста, білява і живу в Лондоні. Я люблю красиві місця, довгі прогулянки, моду та нові знайомства.",

      profileKicker: "Профіль Miso ✨",
      profileTitle: "МАЛЕНЬКА СОБАКА.<br>ВЕЛИКИЙ ХАРАКТЕР.",
      profileSub: "Померанський шпіц · Лондон · дуже компактна.",

      breed: "Порода",
      breedValue: "Померанський шпіц",
      city: "Місто",
      cityValue: "Лондон",
      size: "Розмір",
      sizeValue: "Крихітна",
      coat: "Шерсть",
      coatValue: "М’яка, пухнаста, білява",
      personality: "Характер",
      personalityValue: "Ніжна й допитлива",
      loves: "Любить",
      lovesValue: "Прогулянки й подорожі",
      weakness: "Слабкість",
      weaknessValue: "Смаколики",
      looking: "Шукає",
      lookingValue: "Нових друзів",
      swipe: "Свайпнути вправо?",
      match: "Це метч! ♥ ✨",

      favourites: "Улюблене Miso ♥ ✨",
      world: "МІЙ МАЛЕНЬКИЙ<br>СВІТ",

      travel: "Подорожі ✈️✨",
      travelText: "Маленькі лапки. Нові місця.",
      playtime: "Час гри 🧸💕",
      playtimeText: "Моя улюблена серйозна справа.",
      fashion: "Мода 👗💕",
      fashionText: "Трохи рожевого. Дуже багато Miso.",
      london: "Лондон 🇬🇧💙",
      londonText: "Моє місто. Мої маленькі пригоди.",
      friends: "Друзі 💕🐾",
      friendsText: "Разом пригоди кращі.",

      diaryKicker: "Із щоденника Miso ♥ ✨",
      diaryTitle: "ОДНА МАЛЕНЬКА СОБАКА.<br>ОДНА ДУЖЕ ВЕЛИКА ІДЕЯ. ✨",
      diaryLead: "Здається, усе почалося з мене. 💕",
      diary1: "Коли я з’явилася, у моєї родини раптом виник цілий список нових запитань.",
      diaryNote: "Куди ми можемо ходити разом?<br>У яких кафе мені будуть раді?<br>Які готелі справді люблять тварин?<br>Де ми можемо гуляти, подорожувати й знаходити нових друзів?",
      diary2: "Одна крихітна собака — і раптом світ став виглядати зовсім інакше.",
      diary3: "Ми почали шукати місця, відкривати нові маршрути й збирати корисні відповіді.",
      diary4: "Кожна прогулянка ставала маленьким дослідженням. Кожна подорож приносила нове відкриття. Кожне нове місце давало щось корисне, що хотілося запам’ятати.",
      diary5: "Можливо, саме так і почався PETS & DOGUE. ♥",
      pull: "Одна маленька собака.<br>Один дуже великий світ. 🌍✨",

      seaKicker: "Miso досліджує ✨",
      seaTitle: "Море 🌊",
      seaText: "Нові запахи.<br>Нові звуки.<br>Великий світ. 💙",

      londonKicker: "Мій Лондон ♥ ✨",
      londonTitle: "МОЄ МІСТО —<br>ЛОНДОН",
      londonFeature: "Miso у Лондоні 💙",
      londonFeatureSub: "Маленькі лапки. Велике місто. 🎀✨",
      london1: "Лондон ніколи не буває абсолютно однаковим двічі. ♥",
      london2: "Сьогодні парк. 🌳<br>Завтра маленьке кафе. ☕<br>Потім річка, ринок, червоний автобус 🚌<br>або вулиця, якої я ще ніколи не бачила.",
      london3: "Я зупиняюся. Дивлюся. Нюхаю. А потім обираю інший напрямок. ✨",
      london4: "Іноді найкраще — це місце призначення. А іноді — усе, що я помічаю дорогою.",
      london5: "Для мене прогулянка — це не просто вийти надвір. Так я відкриваю світ. 🌍",

      friendKicker: "Привіт, новий друже ♥ ✨",
      friendTitle: "ЦЕ<br>МЕТЧ! 💕",
      friend1: "Привіт. Я Miso Cute.",
      friend2: "Я маленька, ніжна, допитлива й завжди рада познайомитися з кимось новим.",
      friend3: "Деякі пригоди створені для досліджень. Інші — щоб ділитися ними. 🐾",
      friend4: "Нове обличчя. Маленьке «привіт». А іноді — новий друг.",
      friend5: "Найкраще в новій пригоді — ніколи не знаєш, кого зустрінеш. ♥",

      everyoneKicker: "Запрошені всі ♥ ✨",
      everyoneTitle: "ТУТ Є МІСЦЕ<br>ДЛЯ КОЖНОГО.",
      animals: "🐶 Собаки, 🐱 коти, 🦜 папуги, 🐰 кролики, 🐴 коні, 🐢 черепахи, морські свинки, 🐠 риби, 🐦 птахи та рептилії.",
      everyone1: "Великі. Маленькі. Пухнасті. Пернаті. Гладенькі.",
      everyone2: "У когось лапи. У когось крила. У когось плавці.",
      everyone3: "Хтось хоче бігти поруч із нами. Хтось любить теплий тихий куточок. А хтось спостерігає за світом із гілки, акваріума чи улюбленого вікна.",
      everyone4: "Тут раді кожному. ♥ 🌍✨",
      everyone5: "Нам не потрібно бути однаковими, щоб належати до одного світу.",
      everyone6: "Саме в цьому й сенс.",
      everyone7: "PETS & DOGUE — про тварин і людей, які їх люблять.",

      askKicker: "Відділ допитливості ♥ ✨",
      askTitle: "А ЯКЩО ТОБІ<br>ПОТРІБНА МОЯ ДОПОМОГА...",
      askMark: "Запитай мій допитливий носик ♥",
      askMarkSub: "Miso знає, де шукати. ✨",
      ask1: "Потрібно кудись піти?",
      ask2: "Шукаєш pet-friendly місце? 🐾",
      ask3: "Плануєш подорож? ✈️",
      ask4: "Шукаєш щось корисне?",
      ask5: "Я дивлюся. Нюхаю. Досліджую. ✨",
      ask6: "А коли знаходжу щось цікаве, приношу це назад у PETS & DOGUE.",
      ask7: "Саме для цього й потрібен допитливий маленький носик. ♥",
      askLabel: "Запитай Miso ✨",

      finalKicker: "Побачимося десь у світі ✨",
      finalTitle: "ПОБАЧИМОСЯ<br>ДЕСЬ ТАМ.",
      finalBlue: "Один світ.<br>Кожен улюбленець. 🌍",
      final1: "Сьогодні ми можемо зустрітися в Лондоні. Завтра — біля моря.",
      final2: "Можливо, у парку, кафе або десь зовсім несподівано.",
      final3: "Якщо побачиш маленьку пухнасту білявку, яка дуже серйозно досліджує нове місце, — підійди й привітайся. 💕",
      final4: "А якщо поки що ми далеко одне від одного, шукай моє маленьке коло в PETS & DOGUE.",
      final5: "Так чи інакше, ми зустрінемося. ♥",
      signature: "З любов’ю,<br>Miso ♥",
      tagline: "Один світ. Кожен улюбленець. ♥",
      issueLink: "← Випуск 01",
      home: "Головна"
    },

    /* =====================================================
       RUSSIAN
    ===================================================== */

    ru: {
      coverKicker: "PETS & DOGUE · ВЫПУСК 01 · ИСТОРИЯ ОБЛОЖКИ ✨",
      coverMeet: "Знакомьтесь:",
      coverBlue: "Маленькие лапки.<br>Большой мир. ✨",
      coverText: "Крошечная белокурая померанская собачка из Лондона с любопытным носиком и огромным миром, который хочется исследовать.",
      backIssue: "← Назад к Выпуску 01",

      helloKicker: "Привет, новый друг ♥ ✨",
      helloTitle: "Привет, я",
      helloText: "Маленькая, пушистая, белокурая и живу в Лондоне. Я люблю красивые места, долгие прогулки, моду и знакомиться с новыми друзьями.",

      profileKicker: "Профиль Miso ✨",
      profileTitle: "МАЛЕНЬКАЯ СОБАКА.<br>БОЛЬШОЙ ХАРАКТЕР.",
      profileSub: "Померанский шпиц · Лондон · очень компактная.",

      breed: "Порода",
      breedValue: "Померанский шпиц",
      city: "Город",
      cityValue: "Лондон",
      size: "Размер",
      sizeValue: "Крошечная",
      coat: "Шерсть",
      coatValue: "Мягкая, пушистая, светлая",
      personality: "Характер",
      personalityValue: "Нежная и любопытная",
      loves: "Любит",
      lovesValue: "Прогулки и путешествия",
      weakness: "Слабость",
      weaknessValue: "Вкусняшки",
      looking: "Ищет",
      lookingValue: "Новых друзей",
      swipe: "Свайпнуть вправо?",
      match: "Это мэтч! ♥ ✨",

      favourites: "Любимое Miso ♥ ✨",
      world: "МОЙ МАЛЕНЬКИЙ<br>МИР",

      travel: "Путешествия ✈️✨",
      travelText: "Маленькие лапки. Новые места.",
      playtime: "Время играть 🧸💕",
      playtimeText: "Моё любимое серьёзное дело.",
      fashion: "Мода 👗💕",
      fashionText: "Немного розового. Очень много Miso.",
      london: "Лондон 🇬🇧💙",
      londonText: "Мой город. Мои маленькие приключения.",
      friends: "Друзья 💕🐾",
      friendsText: "Вместе приключения лучше.",

      diaryKicker: "Из дневника Miso ♥ ✨",
      diaryTitle: "ОДНА МАЛЕНЬКАЯ СОБАКА.<br>ОДНА ОЧЕНЬ БОЛЬШАЯ ИДЕЯ. ✨",
      diaryLead: "Кажется, всё началось с меня. 💕",
      diary1: "Когда я появилась, у моей семьи внезапно возник целый список новых вопросов.",
      diaryNote: "Куда мы можем ходить вместе?<br>В каких кафе мне будут рады?<br>Какие отели действительно любят животных?<br>Где мы можем гулять, путешествовать и встречать новых друзей?",
      diary2: "Одна крошечная собака — и вдруг мир стал выглядеть совершенно иначе.",
      diary3: "Мы начали искать места, открывать новые маршруты и собирать полезные ответы.",
      diary4: "Каждая прогулка стала маленьким исследованием. Каждая поездка приносила новое открытие. Каждое новое место давало нам что-то полезное, что хотелось запомнить.",
      diary5: "Возможно, именно так и начался PETS & DOGUE. ♥",
      pull: "Одна маленькая собака.<br>Один очень большой мир. 🌍✨",

      seaKicker: "Miso исследует ✨",
      seaTitle: "Море 🌊",
      seaText: "Новые запахи.<br>Новые звуки.<br>Большой мир. 💙",

      londonKicker: "Мой Лондон ♥ ✨",
      londonTitle: "МОЙ ГОРОД —<br>ЛОНДОН",
      londonFeature: "Miso в Лондоне 💙",
      londonFeatureSub: "Маленькие лапки. Большой город. 🎀✨",
      london1: "Лондон никогда не бывает совершенно одинаковым дважды. ♥",
      london2: "Сегодня парк. 🌳<br>Завтра маленькое кафе. ☕<br>Потом река, рынок, красный автобус 🚌<br>или улица, которую я ещё никогда не видела.",
      london3: "Я останавливаюсь. Смотрю. Нюхаю. А потом выбираю другое направление. ✨",
      london4: "Иногда самое лучшее — это место назначения. А иногда — всё, что я замечаю по дороге.",
      london5: "Для меня прогулка — это не просто выйти на улицу. Так я открываю мир. 🌍",

      friendKicker: "Привет, новый друг ♥ ✨",
      friendTitle: "ЭТО<br>МЭТЧ! 💕",
      friend1: "Привет. Я Miso Cute.",
      friend2: "Я крошечная, нежная, любопытная и всегда рада познакомиться с кем-нибудь новым.",
      friend3: "Некоторые приключения созданы для исследований. Другие — чтобы делиться ими. 🐾",
      friend4: "Новое лицо. Маленькое «привет». А иногда — новый друг.",
      friend5: "Лучшее в новом приключении — никогда не знаешь, кого можешь встретить. ♥",

      everyoneKicker: "Приглашены все ♥ ✨",
      everyoneTitle: "ЗДЕСЬ ЕСТЬ МЕСТО<br>ДЛЯ КАЖДОГО.",
      animals: "🐶 Собаки, 🐱 кошки, 🦜 попугаи, 🐰 кролики, 🐴 лошади, 🐢 черепахи, морские свинки, 🐠 рыбы, 🐦 птицы и рептилии.",
      everyone1: "Большие. Маленькие. Пушистые. Пернатые. Гладкие.",
      everyone2: "У кого-то лапы. У кого-то крылья. У кого-то плавники.",
      everyone3: "Кто-то хочет бежать рядом с нами. Кто-то предпочитает тёплый тихий уголок. А кто-то наблюдает за всем миром с ветки, из аквариума или из любимого окна.",
      everyone4: "Здесь рады каждому. ♥ 🌍✨",
      everyone5: "Нам не нужно выглядеть одинаково, чтобы принадлежать одному миру.",
      everyone6: "Именно в этом весь смысл.",
      everyone7: "PETS & DOGUE — о животных и людях, которые их любят.",

      askKicker: "Отдел любопытства ♥ ✨",
      askTitle: "А ЕСЛИ ТЕБЕ<br>НУЖНА МОЯ ПОМОЩЬ...",
      askMark: "Спроси мой любопытный маленький носик ♥",
      askMarkSub: "Miso знает, где искать. ✨",
      ask1: "Нужно куда-нибудь пойти?",
      ask2: "Ищешь pet-friendly место? 🐾",
      ask3: "Планируешь путешествие? ✈️",
      ask4: "Ищешь что-нибудь полезное?",
      ask5: "Я смотрю. Нюхаю. Исследую. ✨",
      ask6: "А когда нахожу что-нибудь интересное, приношу это обратно в PETS & DOGUE.",
      ask7: "Вот для чего нужен любопытный маленький носик. ♥",
      askLabel: "Спроси Miso ✨",

      finalKicker: "Увидимся где-нибудь в мире ✨",
      finalTitle: "УВИДИМСЯ<br>ГДЕ-НИБУДЬ ТАМ.",
      finalBlue: "Один мир.<br>Каждый питомец. 🌍",
      final1: "Сегодня мы можем встретиться в Лондоне. Завтра — у моря.",
      final2: "Может быть, в парке, кафе или где-нибудь совсем неожиданно.",
      final3: "Если увидишь крошечную пушистую блондинку, которая очень серьёзно исследует новое место, — подойди и поздоровайся. 💕",
      final4: "А если пока мы далеко друг от друга, ищи мой маленький кружок в PETS & DOGUE.",
      final5: "Так или иначе, мы встретимся. ♥",
      signature: "С любовью,<br>Miso ♥",
      tagline: "Один мир. Каждый питомец. ♥",
      issueLink: "← Выпуск 01",
      home: "Главная"
    },

    /* =====================================================
       FRENCH
    ===================================================== */

    fr: {
      coverKicker: "PETS & DOGUE · NUMÉRO 01 · HISTOIRE DE COUVERTURE ✨",
      coverMeet: "Voici",
      coverBlue: "Petites pattes.<br>Grand monde. ✨",
      coverText: "Une minuscule Poméranienne blonde de Londres, avec un petit nez curieux et un très grand monde à découvrir.",
      backIssue: "← Retour au Numéro 01",

      helloKicker: "Bonjour, nouvel ami ♥ ✨",
      helloTitle: "Bonjour, je suis",
      helloText: "Petite, douce, blonde et londonienne. J’aime les beaux endroits, les longues promenades, la mode et rencontrer de nouveaux amis.",

      profileKicker: "Le profil de Miso ✨",
      profileTitle: "PETIT CHIEN.<br>GRANDE PERSONNALITÉ.",
      profileSub: "Poméranienne · Londres · très compacte.",

      breed: "Race",
      breedValue: "Poméranien",
      city: "Ville",
      cityValue: "Londres",
      size: "Taille",
      sizeValue: "Minuscule",
      coat: "Pelage",
      coatValue: "Doux, fluffy et blond",
      personality: "Personnalité",
      personalityValue: "Douce & curieuse",
      loves: "Adore",
      lovesValue: "Promenades & voyages",
      weakness: "Faiblesse",
      weaknessValue: "Friandises",
      looking: "Recherche",
      lookingValue: "De nouveaux amis",
      swipe: "Swipe à droite ?",
      match: "C’est un match ! ♥ ✨",

      favourites: "Les favoris de Miso ♥ ✨",
      world: "MON PETIT<br>MONDE",

      travel: "Voyages ✈️✨",
      travelText: "Petites pattes. Nouveaux endroits.",
      playtime: "Jeux 🧸💕",
      playtimeText: "Mon activité sérieuse préférée.",
      fashion: "Mode 👗💕",
      fashionText: "Un peu de rose. Beaucoup de Miso.",
      london: "Londres 🇬🇧💙",
      londonText: "Ma ville. Mes petites aventures.",
      friends: "Amis 💕🐾",
      friendsText: "Les aventures sont meilleures ensemble.",

      diaryKicker: "Du journal de Miso ♥ ✨",
      diaryTitle: "UN PETIT CHIEN.<br>UNE TRÈS GRANDE IDÉE. ✨",
      diaryLead: "Je crois que tout a commencé avec moi. 💕",
      diary1: "Quand je suis arrivée, ma famille a soudain eu toute une nouvelle liste de questions.",
      diaryNote: "Où pouvons-nous aller ensemble ?<br>Quels cafés vont m’accueillir ?<br>Quels hôtels aiment vraiment les animaux ?<br>Où pouvons-nous nous promener, voyager et rencontrer de nouveaux amis ?",
      diary2: "Un tout petit chien — et soudain le monde semblait complètement différent.",
      diary3: "Nous avons commencé à chercher des endroits, découvrir de nouveaux itinéraires et rassembler des réponses utiles.",
      diary4: "Chaque promenade est devenue une petite enquête. Chaque voyage apportait une nouvelle découverte. Chaque nouvel endroit nous donnait quelque chose d’utile à retenir.",
      diary5: "C’est peut-être ainsi que PETS & DOGUE a commencé. ♥",
      pull: "Un petit chien.<br>Un très grand monde. 🌍✨",

      seaKicker: "Miso explore ✨",
      seaTitle: "La<br>mer 🌊",
      seaText: "Nouvelles odeurs.<br>Nouveaux sons.<br>Grand monde. 💙",

      londonKicker: "Mon Londres ♥ ✨",
      londonTitle: "MA VILLE —<br>LONDRES",
      londonFeature: "Miso à Londres 💙",
      londonFeatureSub: "Petites pattes. Grande ville. 🎀✨",
      london1: "Londres n’est jamais exactement la même deux fois. ♥",
      london2: "Un parc aujourd’hui. 🌳<br>Un petit café demain. ☕<br>Puis la rivière, un marché, un bus rouge 🚌<br>ou une rue que je n’ai encore jamais vue.",
      london3: "Je m’arrête. Je regarde. Je renifle. Puis je choisis une autre direction. ✨",
      london4: "Parfois, le meilleur est la destination. Parfois, c’est tout ce que je remarque en chemin.",
      london5: "Pour moi, une promenade n’est pas simplement sortir. C’est ainsi que je découvre le monde. 🌍",

      friendKicker: "Bonjour, nouvel ami ♥ ✨",
      friendTitle: "C’EST UN<br>MATCH ! 💕",
      friend1: "Bonjour. Je suis Miso Cute.",
      friend2: "Je suis minuscule, douce, curieuse et toujours ravie de rencontrer quelqu’un de nouveau.",
      friend3: "Certaines aventures sont faites pour explorer. D’autres pour être partagées. 🐾",
      friend4: "Un nouveau visage. Un petit bonjour. Et parfois — un nouvel ami.",
      friend5: "Le meilleur d’une nouvelle aventure, c’est de ne jamais savoir qui l’on va rencontrer. ♥",

      everyoneKicker: "Tout le monde est invité ♥ ✨",
      everyoneTitle: "IL Y A DE LA PLACE<br>POUR TOUT LE MONDE.",
      animals: "🐶 Chiens, 🐱 chats, 🦜 perroquets, 🐰 lapins, 🐴 chevaux, 🐢 tortues, cochons d’Inde, 🐠 poissons, 🐦 oiseaux et reptiles.",
      everyone1: "Grands. Petits. Fluffy. À plumes. Lisses.",
      everyone2: "Certains ont des pattes. Certains ont des ailes. Certains ont des nageoires.",
      everyone3: "Certains veulent courir à nos côtés. D’autres préfèrent un coin chaud et tranquille. Certains observent le monde depuis une branche, un aquarium ou leur fenêtre préférée.",
      everyone4: "Tout le monde est le bienvenu ici. ♥ 🌍✨",
      everyone5: "Nous n’avons pas besoin de nous ressembler pour appartenir au même monde.",
      everyone6: "C’est justement tout l’intérêt.",
      everyone7: "PETS & DOGUE parle des animaux — et des personnes qui les aiment.",

      askKicker: "Département curiosité ♥ ✨",
      askTitle: "ET SI TU AS<br>BESOIN DE MON AIDE...",
      askMark: "Demande à mon petit nez curieux ♥",
      askMarkSub: "Miso sait où chercher. ✨",
      ask1: "Besoin d’un endroit où aller ?",
      ask2: "Tu cherches un lieu pet-friendly ? 🐾",
      ask3: "Tu prépares un voyage ? ✈️",
      ask4: "Tu cherches quelque chose d’utile ?",
      ask5: "Je regarde. Je renifle. J’explore. ✨",
      ask6: "Et quand je trouve quelque chose d’intéressant, je le rapporte à PETS & DOGUE.",
      ask7: "C’est à cela que sert un petit nez curieux. ♥",
      askLabel: "Demander à Miso ✨",

      finalKicker: "À bientôt quelque part dans le monde ✨",
      finalTitle: "À BIENTÔT<br>QUELQUE PART.",
      finalBlue: "Un monde.<br>Tous les animaux. 🌍",
      final1: "Aujourd’hui, nous pourrions nous rencontrer à Londres. Demain — au bord de la mer.",
      final2: "Peut-être dans un parc, un café ou dans un endroit totalement inattendu.",
      final3: "Si tu vois une minuscule blonde fluffy explorer très sérieusement un nouvel endroit — viens dire bonjour. 💕",
      final4: "Et si nous sommes encore loin l’un de l’autre, cherche mon petit cercle sur PETS & DOGUE.",
      final5: "D’une manière ou d’une autre, nous nous rencontrerons. ♥",
      signature: "Avec amour,<br>Miso ♥",
      tagline: "Un monde. Tous les animaux. ♥",
      issueLink: "← Numéro 01",
      home: "Accueil"
    },

    /* =====================================================
       GERMAN
    ===================================================== */

    de: {
      coverKicker: "PETS & DOGUE · AUSGABE 01 · COVER STORY ✨",
      coverMeet: "Das ist",
      coverBlue: "Kleine Pfoten.<br>Große Welt. ✨",
      coverText: "Eine winzige blonde Pomeranian-Dame aus London, mit einer neugierigen Nase und einer riesigen Welt zum Entdecken.",
      backIssue: "← Zurück zu Ausgabe 01",

      helloKicker: "Hallo, neuer Freund ♥ ✨",
      helloTitle: "Hallo, ich bin",
      helloText: "Winzig, flauschig, blond und in London zu Hause. Ich liebe schöne Orte, lange Spaziergänge, Mode und neue Freunde.",

      profileKicker: "Misos Profil ✨",
      profileTitle: "KLEINER HUND.<br>GROSSE PERSÖNLICHKEIT.",
      profileSub: "Pomeranian · London · sehr kompakt.",

      breed: "Rasse",
      breedValue: "Pomeranian",
      city: "Stadt",
      cityValue: "London",
      size: "Größe",
      sizeValue: "Winzig",
      coat: "Fell",
      coatValue: "Weich, flauschig und blond",
      personality: "Charakter",
      personalityValue: "Sanft & neugierig",
      loves: "Liebt",
      lovesValue: "Spaziergänge & Reisen",
      weakness: "Schwäche",
      weaknessValue: "Leckerlis",
      looking: "Sucht",
      lookingValue: "Neue Freunde",
      swipe: "Nach rechts swipen?",
      match: "It’s a Match! ♥ ✨",

      favourites: "Misos Favoriten ♥ ✨",
      world: "MEINE KLEINE<br>WELT",

      travel: "Reisen ✈️✨",
      travelText: "Kleine Pfoten. Neue Orte.",
      playtime: "Spielzeit 🧸💕",
      playtimeText: "Meine liebste ernste Angelegenheit.",
      fashion: "Mode 👗💕",
      fashionText: "Ein bisschen Pink. Ganz viel Miso.",
      london: "London 🇬🇧💙",
      londonText: "Meine Stadt. Meine kleinen Abenteuer.",
      friends: "Freunde 💕🐾",
      friendsText: "Gemeinsam sind Abenteuer schöner.",

      diaryKicker: "Aus Misos Tagebuch ♥ ✨",
      diaryTitle: "EIN KLEINER HUND.<br>EINE SEHR GROSSE IDEE. ✨",
      diaryLead: "Ich glaube, alles begann mit mir. 💕",
      diary1: "Als ich ankam, hatte meine Familie plötzlich eine ganz neue Liste von Fragen.",
      diaryNote: "Wohin können wir gemeinsam gehen?<br>In welchen Cafés bin ich willkommen?<br>Welche Hotels lieben Haustiere wirklich?<br>Wo können wir spazieren, reisen und neue Freunde treffen?",
      diary2: "Ein winziger Hund — und plötzlich sah die Welt völlig anders aus.",
      diary3: "Wir begannen, Orte zu suchen, neue Wege zu entdecken und nützliche Antworten zu sammeln.",
      diary4: "Jeder Spaziergang wurde zu einer kleinen Entdeckungsreise. Jede Reise brachte etwas Neues. Jeder neue Ort gab uns etwas Nützliches, das wir uns merken wollten.",
      diary5: "Vielleicht war das der Anfang von PETS & DOGUE. ♥",
      pull: "Ein kleiner Hund.<br>Eine sehr große Welt. 🌍✨",

      seaKicker: "Miso entdeckt ✨",
      seaTitle: "Das<br>Meer 🌊",
      seaText: "Neue Gerüche.<br>Neue Geräusche.<br>Große Welt. 💙",

      londonKicker: "Mein London ♥ ✨",
      londonTitle: "MEINE STADT —<br>LONDON",
      londonFeature: "Miso in London 💙",
      londonFeatureSub: "Kleine Pfoten. Große Stadt. 🎀✨",
      london1: "London fühlt sich nie zweimal genau gleich an. ♥",
      london2: "Heute ein Park. 🌳<br>Morgen ein kleines Café. ☕<br>Dann der Fluss, ein Markt, ein roter Bus 🚌<br>oder eine Straße, die ich noch nie gesehen habe.",
      london3: "Ich bleibe stehen. Ich schaue. Ich schnuppere. Dann wähle ich eine andere Richtung. ✨",
      london4: "Manchmal ist das Ziel das Beste. Manchmal ist es alles, was ich unterwegs entdecke.",
      london5: "Für mich bedeutet Spazierengehen nicht einfach nur rauszugehen. So entdecke ich die Welt. 🌍",

      friendKicker: "Hallo, neuer Freund ♥ ✨",
      friendTitle: "IT’S A<br>MATCH! 💕",
      friend1: "Hallo. Ich bin Miso Cute.",
      friend2: "Ich bin winzig, sanft, neugierig und freue mich immer darauf, jemanden Neues kennenzulernen.",
      friend3: "Manche Abenteuer sind zum Entdecken da. Andere zum Teilen. 🐾",
      friend4: "Ein neues Gesicht. Ein kleines Hallo. Und manchmal — ein neuer Freund.",
      friend5: "Das Schönste an einem neuen Abenteuer ist, nie zu wissen, wen man treffen könnte. ♥",

      everyoneKicker: "Alle sind eingeladen ♥ ✨",
      everyoneTitle: "HIER IST PLATZ<br>FÜR ALLE.",
      animals: "🐶 Hunde, 🐱 Katzen, 🦜 Papageien, 🐰 Kaninchen, 🐴 Pferde, 🐢 Schildkröten, Meerschweinchen, 🐠 Fische, 🐦 Vögel und Reptilien.",
      everyone1: "Groß. Klein. Flauschig. Gefiedert. Glatt.",
      everyone2: "Manche haben Pfoten. Manche Flügel. Manche Flossen.",
      everyone3: "Manche wollen neben uns laufen. Andere bevorzugen eine warme, ruhige Ecke. Manche beobachten die Welt von einem Ast, einem Aquarium oder ihrem Lieblingsfenster aus.",
      everyone4: "Hier sind alle willkommen. ♥ 🌍✨",
      everyone5: "Wir müssen nicht gleich aussehen, um zur selben Welt zu gehören.",
      everyone6: "Genau darum geht es.",
      everyone7: "PETS & DOGUE handelt von Tieren — und den Menschen, die sie lieben.",

      askKicker: "Abteilung Neugier ♥ ✨",
      askTitle: "UND WENN DU<br>MEINE HILFE BRAUCHST...",
      askMark: "Frag meine neugierige kleine Nase ♥",
      askMarkSub: "Miso weiß, wo sie suchen muss. ✨",
      ask1: "Du brauchst einen Ort zum Hingehen?",
      ask2: "Du suchst einen pet-friendly Ort? 🐾",
      ask3: "Du planst eine Reise? ✈️",
      ask4: "Du suchst etwas Nützliches?",
      ask5: "Ich schaue. Ich schnuppere. Ich entdecke. ✨",
      ask6: "Und wenn ich etwas Interessantes finde, bringe ich es zurück zu PETS & DOGUE.",
      ask7: "Dafür ist eine neugierige kleine Nase da. ♥",
      askLabel: "Frag Miso ✨",

      finalKicker: "Wir sehen uns irgendwo auf der Welt ✨",
      finalTitle: "WIR SEHEN UNS<br>DA DRAUSSEN.",
      finalBlue: "Eine Welt.<br>Jedes Haustier. 🌍",
      final1: "Heute treffen wir uns vielleicht in London. Morgen — am Meer.",
      final2: "Vielleicht in einem Park, einem Café oder irgendwo völlig unerwartet.",
      final3: "Wenn du eine winzige flauschige Blondine siehst, die ernsthaft einen neuen Ort erkundet — sag Hallo. 💕",
      final4: "Und wenn wir vorerst weit voneinander entfernt sind, suche meinen kleinen Kreis bei PETS & DOGUE.",
      final5: "So oder so werden wir uns treffen. ♥",
      signature: "Mit Liebe,<br>Miso ♥",
      tagline: "Eine Welt. Jedes Haustier. ♥",
      issueLink: "← Ausgabe 01",
      home: "Startseite"
    },

    /* =====================================================
       SPANISH
    ===================================================== */

    es: {
      coverKicker: "PETS & DOGUE · EDICIÓN 01 · HISTORIA DE PORTADA ✨",
      coverMeet: "Conoce a",
      coverBlue: "Patitas pequeñas.<br>Un mundo enorme. ✨",
      coverText: "Una diminuta Pomerania rubia de Londres, con una nariz curiosa y un mundo enorme por descubrir.",
      backIssue: "← Volver a Edición 01",

      helloKicker: "Hola, nuevo amigo ♥ ✨",
      helloTitle: "Hola, soy",
      helloText: "Pequeña, esponjosa, rubia y viviendo en Londres. Me encantan los lugares bonitos, los largos paseos, la moda y conocer nuevos amigos.",

      profileKicker: "El perfil de Miso ✨",
      profileTitle: "PERRO PEQUEÑO.<br>GRAN PERSONALIDAD.",
      profileSub: "Pomerania · Londres · muy compacta.",

      breed: "Raza",
      breedValue: "Pomerania",
      city: "Ciudad",
      cityValue: "Londres",
      size: "Tamaño",
      sizeValue: "Diminuta",
      coat: "Pelaje",
      coatValue: "Suave, esponjoso y rubio",
      personality: "Personalidad",      personalityValue: "Dulce y curiosa",
      loves: "Le encanta",
      lovesValue: "Paseos y viajes",
      weakness: "Debilidad",
      weaknessValue: "Premios",
      looking: "Busca",
      lookingValue: "Nuevos amigos",
      swipe: "¿Deslizar a la derecha?",
      match: "¡Es un match! ♥ ✨",

      favourites: "Los favoritos de Miso ♥ ✨",
      world: "MI PEQUEÑO<br>MUNDO",

      travel: "Viajes ✈️✨",
      travelText: "Patitas pequeñas. Lugares nuevos.",
      playtime: "Hora de jugar 🧸💕",
      playtimeText: "Mi asunto serio favorito.",
      fashion: "Moda 👗💕",
      fashionText: "Un poco de rosa. Mucho Miso.",
      london: "Londres 🇬🇧💙",
      londonText: "Mi ciudad. Mis pequeñas aventuras.",
      friends: "Amigos 💕🐾",
      friendsText: "Las aventuras son mejores juntos.",

      diaryKicker: "Del diario de Miso ♥ ✨",
      diaryTitle: "UN PERRO PEQUEÑO.<br>UNA IDEA MUY GRANDE. ✨",
      diaryLead: "Creo que todo empezó conmigo. 💕",
      diary1: "Cuando llegué, mi familia de repente tuvo toda una nueva lista de preguntas.",
      diaryNote: "¿Adónde podemos ir juntos?<br>¿Qué cafés me recibirán?<br>¿Qué hoteles realmente aman a las mascotas?<br>¿Dónde podemos pasear, viajar y conocer nuevos amigos?",
      diary2: "Un perro diminuto — y de repente el mundo parecía completamente diferente.",
      diary3: "Empezamos a buscar lugares, descubrir nuevas rutas y reunir respuestas útiles.",
      diary4: "Cada paseo se convirtió en una pequeña investigación. Cada viaje trajo un nuevo descubrimiento. Cada lugar nuevo nos dio algo útil que recordar.",
      diary5: "Quizá así comenzó PETS & DOGUE. ♥",
      pull: "Un perro pequeño.<br>Un mundo muy grande. 🌍✨",

      seaKicker: "Miso explora ✨",
      seaTitle: "El<br>mar 🌊",
      seaText: "Nuevos olores.<br>Nuevos sonidos.<br>Un mundo enorme. 💙",

      londonKicker: "Mi Londres ♥ ✨",
      londonTitle: "MI CIUDAD —<br>LONDRES",
      londonFeature: "Miso en Londres 💙",
      londonFeatureSub: "Patitas pequeñas. Gran ciudad. 🎀✨",
      london1: "Londres nunca se siente exactamente igual dos veces. ♥",
      london2: "Un parque hoy. 🌳<br>Un pequeño café mañana. ☕<br>Después el río, un mercado, un autobús rojo 🚌<br>o una calle que nunca había visto.",
      london3: "Me detengo. Miro. Olfateo. Y luego elijo otra dirección. ✨",
      london4: "A veces lo mejor es el destino. A veces es todo lo que descubro por el camino.",
      london5: "Para mí, un paseo no es simplemente salir. Es mi forma de descubrir el mundo. 🌍",

      friendKicker: "Hola, nuevo amigo ♥ ✨",
      friendTitle: "¡ES UN<br>MATCH! 💕",
      friend1: "Hola. Soy Miso Cute.",
      friend2: "Soy diminuta, dulce, curiosa y siempre me interesa conocer a alguien nuevo.",
      friend3: "Algunas aventuras están hechas para explorar. Otras para compartir. 🐾",
      friend4: "Una cara nueva. Un pequeño hola. Y a veces — un nuevo amigo.",
      friend5: "Lo mejor de una nueva aventura es no saber nunca a quién puedes conocer. ♥",

      everyoneKicker: "Todos están invitados ♥ ✨",
      everyoneTitle: "HAY SITIO<br>PARA TODOS.",
      animals: "🐶 Perros, 🐱 gatos, 🦜 loros, 🐰 conejos, 🐴 caballos, 🐢 tortugas, cobayas, 🐠 peces, 🐦 aves y reptiles.",
      everyone1: "Grandes. Pequeños. Esponjosos. Con plumas. Lisos.",
      everyone2: "Algunos tienen patas. Otros alas. Otros aletas.",
      everyone3: "Algunos quieren correr a nuestro lado. Otros prefieren un rincón cálido y tranquilo. Algunos observan el mundo desde una rama, un acuario o su ventana favorita.",
      everyone4: "Todos son bienvenidos aquí. ♥ 🌍✨",
      everyone5: "No tenemos que parecernos para pertenecer al mismo mundo.",
      everyone6: "De eso se trata exactamente.",
      everyone7: "PETS & DOGUE trata de animales — y de las personas que los aman.",

      askKicker: "Departamento de curiosidad ♥ ✨",
      askTitle: "Y SI NECESITAS<br>MI AYUDA...",
      askMark: "Pregunta a mi pequeña nariz curiosa ♥",
      askMarkSub: "Miso sabe dónde buscar. ✨",
      ask1: "¿Necesitas un lugar adonde ir?",
      ask2: "¿Buscas un lugar pet-friendly? 🐾",
      ask3: "¿Planeas un viaje? ✈️",
      ask4: "¿Buscas algo útil?",
      ask5: "Miro. Olfateo. Exploro. ✨",
      ask6: "Y cuando encuentro algo interesante, lo llevo de vuelta a PETS & DOGUE.",
      ask7: "Para eso sirve una pequeña nariz curiosa. ♥",
      askLabel: "Pregunta a Miso ✨",

      finalKicker: "Nos vemos en algún lugar del mundo ✨",
      finalTitle: "NOS VEMOS<br>AHÍ FUERA.",
      finalBlue: "Un mundo.<br>Cada mascota. 🌍",
      final1: "Hoy podríamos encontrarnos en Londres. Mañana — junto al mar.",
      final2: "Quizá en un parque, un café o en un lugar completamente inesperado.",
      final3: "Si ves a una diminuta rubia esponjosa explorando muy seriamente un lugar nuevo — ven a saludar. 💕",
      final4: "Y si por ahora estamos lejos, busca mi pequeño círculo en PETS & DOGUE.",
      final5: "De una forma u otra, nos encontraremos. ♥",
      signature: "Con amor,<br>Miso ♥",
      tagline: "Un mundo. Cada mascota. ♥",
      issueLink: "← Edición 01",
      home: "Inicio"
    },

    /* =====================================================
       ITALIAN
    ===================================================== */

    it: {
      coverKicker: "PETS & DOGUE · NUMERO 01 · STORIA DI COPERTINA ✨",
      coverMeet: "Ti presentiamo",
      coverBlue: "Piccole zampe.<br>Grande mondo. ✨",
      coverText: "Una minuscola Pomerania bionda di Londra, con un nasino curioso e un mondo enorme tutto da scoprire.",
      backIssue: "← Torna al Numero 01",

      helloKicker: "Ciao, nuovo amico ♥ ✨",
      helloTitle: "Ciao, sono",
      helloText: "Piccola, soffice, bionda e vivo a Londra. Amo i posti belli, le lunghe passeggiate, la moda e conoscere nuovi amici.",

      profileKicker: "Il profilo di Miso ✨",
      profileTitle: "PICCOLO CANE.<br>GRANDE PERSONALITÀ.",
      profileSub: "Pomerania · Londra · molto compatta.",

      breed: "Razza",
      breedValue: "Pomerania",
      city: "Città",
      cityValue: "Londra",
      size: "Taglia",
      sizeValue: "Minuscola",
      coat: "Pelo",
      coatValue: "Morbido, soffice e biondo",
      personality: "Personalità",
      personalityValue: "Dolce e curiosa",
      loves: "Ama",
      lovesValue: "Passeggiate e viaggi",
      weakness: "Debolezza",
      weaknessValue: "Premietti",
      looking: "Cerca",
      lookingValue: "Nuovi amici",
      swipe: "Scorri a destra?",
      match: "È un match! ♥ ✨",

      favourites: "I preferiti di Miso ♥ ✨",
      world: "IL MIO PICCOLO<br>MONDO",

      travel: "Viaggi ✈️✨",
      travelText: "Piccole zampe. Nuovi posti.",
      playtime: "Giochi 🧸💕",
      playtimeText: "La mia attività seria preferita.",
      fashion: "Moda 👗💕",
      fashionText: "Un po’ di rosa. Tantissima Miso.",
      london: "Londra 🇬🇧💙",
      londonText: "La mia città. Le mie piccole avventure.",
      friends: "Amici 💕🐾",
      friendsText: "Le avventure sono più belle insieme.",

      diaryKicker: "Dal diario di Miso ♥ ✨",
      diaryTitle: "UN PICCOLO CANE.<br>UNA GRANDISSIMA IDEA. ✨",
      diaryLead: "Credo che tutto sia iniziato con me. 💕",
      diary1: "Quando sono arrivata, la mia famiglia si è ritrovata improvvisamente con una lunga lista di nuove domande.",
      diaryNote: "Dove possiamo andare insieme?<br>Quali caffè mi accoglieranno?<br>Quali hotel amano davvero gli animali?<br>Dove possiamo passeggiare, viaggiare e incontrare nuovi amici?",
      diary2: "Un cane minuscolo — e improvvisamente il mondo sembrava completamente diverso.",
      diary3: "Abbiamo iniziato a cercare luoghi, scoprire nuovi percorsi e raccogliere risposte utili.",
      diary4: "Ogni passeggiata è diventata una piccola esplorazione. Ogni viaggio portava una nuova scoperta. Ogni nuovo posto ci lasciava qualcosa di utile da ricordare.",
      diary5: "Forse è così che è iniziato PETS & DOGUE. ♥",
      pull: "Un piccolo cane.<br>Un mondo grandissimo. 🌍✨",

      seaKicker: "Miso esplora ✨",
      seaTitle: "Il<br>mare 🌊",
      seaText: "Nuovi profumi.<br>Nuovi suoni.<br>Grande mondo. 💙",

      londonKicker: "La mia Londra ♥ ✨",
      londonTitle: "LA MIA CITTÀ —<br>LONDRA",
      londonFeature: "Miso a Londra 💙",
      londonFeatureSub: "Piccole zampe. Grande città. 🎀✨",
      london1: "Londra non sembra mai esattamente la stessa due volte. ♥",
      london2: "Oggi un parco. 🌳<br>Domani un piccolo caffè. ☕<br>Poi il fiume, un mercato, un autobus rosso 🚌<br>o una strada che non ho mai visto.",
      london3: "Mi fermo. Guardo. Annuso. Poi scelgo un’altra direzione. ✨",
      london4: "A volte la parte migliore è la destinazione. A volte è tutto ciò che noto lungo il percorso.",
      london5: "Per me una passeggiata non significa semplicemente uscire. È così che scopro il mondo. 🌍",

      friendKicker: "Ciao, nuovo amico ♥ ✨",
      friendTitle: "È UN<br>MATCH! 💕",
      friend1: "Ciao. Sono Miso Cute.",
      friend2: "Sono minuscola, dolce, curiosa e sempre felice di conoscere qualcuno di nuovo.",
      friend3: "Alcune avventure sono fatte per esplorare. Altre per essere condivise. 🐾",
      friend4: "Un volto nuovo. Un piccolo ciao. E a volte — un nuovo amico.",
      friend5: "La parte più bella di una nuova avventura è non sapere mai chi potresti incontrare. ♥",

      everyoneKicker: "Tutti sono invitati ♥ ✨",
      everyoneTitle: "C’È POSTO<br>PER TUTTI.",
      animals: "🐶 Cani, 🐱 gatti, 🦜 pappagalli, 🐰 conigli, 🐴 cavalli, 🐢 tartarughe, porcellini d’India, 🐠 pesci, 🐦 uccelli e rettili.",
      everyone1: "Grandi. Piccoli. Soffici. Piumati. Lisci.",
      everyone2: "Alcuni hanno zampe. Alcuni ali. Alcuni pinne.",
      everyone3: "Alcuni vogliono correre accanto a noi. Altri preferiscono un angolo caldo e tranquillo. Alcuni osservano il mondo da un ramo, un acquario o dalla loro finestra preferita.",
      everyone4: "Qui tutti sono i benvenuti. ♥ 🌍✨",
      everyone5: "Non dobbiamo assomigliarci per appartenere allo stesso mondo.",
      everyone6: "È proprio questo il punto.",
      everyone7: "PETS & DOGUE parla degli animali — e delle persone che li amano.",

      askKicker: "Dipartimento curiosità ♥ ✨",
      askTitle: "E SE HAI<br>BISOGNO DEL MIO AIUTO...",
      askMark: "Chiedi al mio piccolo naso curioso ♥",
      askMarkSub: "Miso sa dove cercare. ✨",
      ask1: "Cerchi un posto dove andare?",
      ask2: "Cerchi un luogo pet-friendly? 🐾",
      ask3: "Stai organizzando un viaggio? ✈️",
      ask4: "Cerchi qualcosa di utile?",
      ask5: "Guardo. Annuso. Esploro. ✨",
      ask6: "E quando trovo qualcosa di interessante, lo porto a PETS & DOGUE.",
      ask7: "È proprio a questo che serve un piccolo naso curioso. ♥",
      askLabel: "Chiedi a Miso ✨",

      finalKicker: "Ci vediamo da qualche parte nel mondo ✨",
      finalTitle: "CI VEDIAMO<br>LÀ FUORI.",
      finalBlue: "Un mondo.<br>Ogni animale. 🌍",
      final1: "Oggi potremmo incontrarci a Londra. Domani — al mare.",
      final2: "Forse in un parco, in un caffè o in un posto completamente inaspettato.",
      final3: "Se vedi una minuscola bionda soffice che esplora molto seriamente un posto nuovo — vieni a salutarmi. 💕",
      final4: "E se per ora siamo lontani, cerca il mio piccolo cerchio su PETS & DOGUE.",
      final5: "In un modo o nell’altro, ci incontreremo. ♥",
      signature: "Con amore,<br>Miso ♥",
      tagline: "Un mondo. Ogni animale. ♥",
      issueLink: "← Numero 01",
      home: "Home"
    },

    /* =====================================================
       PORTUGUESE
    ===================================================== */

    pt: {
      coverKicker: "PETS & DOGUE · EDIÇÃO 01 · HISTÓRIA DE CAPA ✨",
      coverMeet: "Conheça",
      coverBlue: "Patas pequenas.<br>Um mundo enorme. ✨",
      coverText: "Uma minúscula Lulu da Pomerânia loira de Londres, com um nariz curioso e um mundo enorme para descobrir.",
      backIssue: "← Voltar à Edição 01",

      helloKicker: "Olá, novo amigo ♥ ✨",
      helloTitle: "Olá, eu sou",
      helloText: "Pequena, fofinha, loira e vivendo em Londres. Adoro lugares bonitos, longos passeios, moda e conhecer novos amigos.",

      profileKicker: "O perfil da Miso ✨",
      profileTitle: "CÃO PEQUENO.<br>GRANDE PERSONALIDADE.",
      profileSub: "Lulu da Pomerânia · Londres · muito compacta.",

      breed: "Raça",
      breedValue: "Lulu da Pomerânia",
      city: "Cidade",
      cityValue: "Londres",
      size: "Tamanho",
      sizeValue: "Minúscula",
      coat: "Pelagem",
      coatValue: "Macia, fofa e loira",
      personality: "Personalidade",
      personalityValue: "Gentil e curiosa",
      loves: "Adora",
      lovesValue: "Passeios e viagens",
      weakness: "Fraqueza",
      weaknessValue: "Petiscos",
      looking: "Procura",
      lookingValue: "Novos amigos",
      swipe: "Deslizar para a direita?",
      match: "É um match! ♥ ✨",

      favourites: "Os favoritos da Miso ♥ ✨",
      world: "O MEU PEQUENO<br>MUNDO",

      travel: "Viagens ✈️✨",
      travelText: "Patas pequenas. Novos lugares.",
      playtime: "Hora de brincar 🧸💕",
      playtimeText: "O meu tipo favorito de assunto sério.",
      fashion: "Moda 👗💕",
      fashionText: "Um pouco de rosa. Muita Miso.",
      london: "Londres 🇬🇧💙",
      londonText: "A minha cidade. As minhas pequenas aventuras.",
      friends: "Amigos 💕🐾",
      friendsText: "As aventuras são melhores juntos.",

      diaryKicker: "Do diário da Miso ♥ ✨",
      diaryTitle: "UM CÃO PEQUENO.<br>UMA IDEIA MUITO GRANDE. ✨",
      diaryLead: "Acho que tudo começou comigo. 💕",
      diary1: "Quando cheguei, a minha família de repente passou a ter uma lista inteira de novas perguntas.",
      diaryNote: "Onde podemos ir juntos?<br>Que cafés vão me receber?<br>Que hotéis realmente adoram animais?<br>Onde podemos passear, viajar e conhecer novos amigos?",
      diary2: "Um cão minúsculo — e de repente o mundo parecia completamente diferente.",
      diary3: "Começámos a procurar lugares, descobrir novas rotas e reunir respostas úteis.",
      diary4: "Cada passeio tornou-se uma pequena investigação. Cada viagem trouxe uma nova descoberta. Cada novo lugar nos deu algo útil para lembrar.",
      diary5: "Talvez tenha sido assim que PETS & DOGUE começou. ♥",
      pull: "Um cão pequeno.<br>Um mundo muito grande. 🌍✨",

      seaKicker: "Miso explora ✨",
      seaTitle: "O<br>mar 🌊",
      seaText: "Novos cheiros.<br>Novos sons.<br>Um mundo enorme. 💙",

      londonKicker: "A minha Londres ♥ ✨",
      londonTitle: "A MINHA CIDADE —<br>LONDRES",
      londonFeature: "Miso em Londres 💙",
      londonFeatureSub: "Patas pequenas. Grande cidade. 🎀✨",
      london1: "Londres nunca parece exatamente igual duas vezes. ♥",
      london2: "Um parque hoje. 🌳<br>Um pequeno café amanhã. ☕<br>Depois o rio, um mercado, um autocarro vermelho 🚌<br>ou uma rua que nunca vi.",
      london3: "Eu paro. Olho. Cheiro. Depois escolho outra direção. ✨",
      london4: "Às vezes, a melhor parte é o destino. Às vezes, é tudo o que noto pelo caminho.",
      london5: "Para mim, passear não é simplesmente sair. É assim que descubro o mundo. 🌍",

      friendKicker: "Olá, novo amigo ♥ ✨",
      friendTitle: "É UM<br>MATCH! 💕",
      friend1: "Olá. Eu sou Miso Cute.",
      friend2: "Sou minúscula, gentil, curiosa e sempre interessada em conhecer alguém novo.",
      friend3: "Algumas aventuras são feitas para explorar. Outras para compartilhar. 🐾",
      friend4: "Um rosto novo. Um pequeno olá. E às vezes — um novo amigo.",
      friend5: "A melhor parte de uma nova aventura é nunca saber quem podemos encontrar. ♥",

      everyoneKicker: "Todos estão convidados ♥ ✨",
      everyoneTitle: "HÁ ESPAÇO<br>PARA TODOS.",
      animals: "🐶 Cães, 🐱 gatos, 🦜 papagaios, 🐰 coelhos, 🐴 cavalos, 🐢 tartarugas, porquinhos-da-índia, 🐠 peixes, 🐦 aves e répteis.",
      everyone1: "Grandes. Pequenos. Fofos. Com penas. Lisos.",
      everyone2: "Alguns têm patas. Alguns têm asas. Alguns têm barbatanas.",
      everyone3: "Alguns querem correr ao nosso lado. Outros preferem um canto quente e tranquilo. Alguns observam o mundo de um galho, de um aquário ou da sua janela favorita.",
      everyone4: "Todos são bem-vindos aqui. ♥ 🌍✨",
      everyone5: "Não precisamos ser iguais para pertencer ao mesmo mundo.",
      everyone6: "É exatamente essa a ideia.",
      everyone7: "PETS & DOGUE é sobre animais — e as pessoas que os amam.",

      askKicker: "Departamento da curiosidade ♥ ✨",
      askTitle: "E SE PRECISAR<br>DA MINHA AJUDA...",
      askMark: "Pergunte ao meu pequeno nariz curioso ♥",
      askMarkSub: "Miso sabe onde procurar. ✨",
      ask1: "Precisa de algum lugar para ir?",
      ask2: "Procura um lugar pet-friendly? 🐾",
      ask3: "Está a planear uma viagem? ✈️",
      ask4: "Procura algo útil?",
      ask5: "Eu olho. Cheiro. Exploro. ✨",
      ask6: "E quando encontro algo interessante, levo de volta para PETS & DOGUE.",
      ask7: "É para isso que serve um pequeno nariz curioso. ♥",
      askLabel: "Pergunte à Miso ✨",

      finalKicker: "Vejo você em algum lugar do mundo ✨",
      finalTitle: "VEJO VOCÊ<br>POR AÍ.",
      finalBlue: "Um mundo.<br>Todos os animais. 🌍",
      final1: "Hoje podemos nos encontrar em Londres. Amanhã — junto ao mar.",
      final2: "Talvez num parque, num café ou em algum lugar completamente inesperado.",
      final3: "Se vir uma pequena loira fofinha explorando seriamente um lugar novo — venha dizer olá. 💕",
      final4: "E se por enquanto estivermos longe, procure o meu pequeno círculo em PETS & DOGUE.",
      final5: "De uma forma ou de outra, vamos nos encontrar. ♥",
      signature: "Com amor,<br>Miso ♥",
      tagline: "Um mundo. Todos os animais. ♥",
      issueLink: "← Edição 01",
      home: "Início"
    },    /* =====================================================
       DUTCH / POLISH / CZECH / SLOVAK / ROMANIAN /
       BULGARIAN / GREEK / SWEDISH / DANISH / NORWEGIAN /
       FINNISH / HUNGARIAN / TURKISH / ARABIC / HEBREW

       ВАЖНО:
       здесь должны идти остальные словари из текущего файла
       БЕЗ сокращений и БЕЗ удаления языков.
       ===================================================== */  };

  function normalizeLanguage(lang) {
    lang = String(lang || "")
      .trim()
      .toLowerCase()
      .replace("_", "-");

    if (!lang) return "en";

    lang = lang.split("-")[0];

    if (ALIASES[lang]) {
      lang = ALIASES[lang];
    }

    return SUPPORTED.includes(lang) ? lang : "en";
  }

  function getStoredLanguage() {
    try {
      return normalizeLanguage(
        localStorage.getItem(STORE_KEY) || "en"
      );
    } catch (error) {
      return "en";
    }
  }

  function setDocumentDirection(lang) {
    const rtl = RTL.has(lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";

    if (document.body) {
      document.body.dir = rtl ? "rtl" : "ltr";
    }
  }

  function applyLanguage(language) {
    const lang = normalizeLanguage(language);
    const dictionary = T[lang] || T.en;

    setDocumentDirection(lang);

    document
      .querySelectorAll("[data-i18n]")
      .forEach(function (element) {
        const key = element.getAttribute("data-i18n");

        if (!key) return;

        const value =
          dictionary[key] !== undefined
            ? dictionary[key]
            : T.en[key];

        if (value === undefined) return;

        element.innerHTML = value;
      });

    try {
      localStorage.setItem(STORE_KEY, lang);
    } catch (error) {}

    window.dispatchEvent(
      new CustomEvent("petsdogue:miso-language-applied", {
        detail: { language: lang }
      })
    );
  }

  function readLanguageFromEvent(event) {
    if (!event || !event.detail) return null;

    return (
      event.detail.language ||
      event.detail.lang ||
      event.detail.code ||
      null
    );
  }

  window.addEventListener(
    "petsdogue:setlanguage",
    function (event) {
      const lang = readLanguageFromEvent(event);

      if (lang) {
        applyLanguage(lang);
      }
    }
  );

  window.addEventListener(
    "petsdogue:languagechange",
    function (event) {
      const lang = readLanguageFromEvent(event);

      if (lang) {
        applyLanguage(lang);
      }
    }
  );

  window.addEventListener(
    "languagechange",
    function (event) {
      const lang = readLanguageFromEvent(event);

      if (lang) {
        applyLanguage(lang);
      }
    }
  );

  window.addEventListener(
    "storage",
    function (event) {
      if (
        event.key === STORE_KEY &&
        event.newValue
      ) {
        applyLanguage(event.newValue);
      }
    }
  );

  document.addEventListener(
    "DOMContentLoaded",
    function () {
      applyLanguage(getStoredLanguage());
    }
  );

  window.PetsDogueMisoI18n = {
    translations: T,
    supportedLanguages: SUPPORTED.slice(),
    getLanguage: getStoredLanguage,
    setLanguage: applyLanguage,
    applyLanguage: applyLanguage
  };
})();
