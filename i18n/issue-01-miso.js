/* =========================================================
   PETS & DOGUE — ISSUE 01 — MISO
   COMPLETE STATIC MULTILINGUAL TRANSLATIONS
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
      diary4: "Каждая прогулка стала маленьким исследованием. Каждая поездка приносила новое открытие. Каждое новое место давало что-то полезное, что хотелось запомнить.",
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
    },    /* =====================================================
       FRENCH
    ===================================================== */
    fr: {
      coverKicker: "PETS & DOGUE · NUMÉRO 01 · HISTOIRE DE COUVERTURE ✨",
      coverMeet: "Rencontrez",
      coverBlue: "Petites pattes.<br>Grand monde. ✨",
      coverText: "Une minuscule Poméranienne blonde de Londres, avec un petit nez curieux et un immense monde à découvrir.",
      backIssue: "← Retour au Numéro 01",

      helloKicker: "Bonjour, nouvel ami ♥ ✨",
      helloTitle: "Bonjour, je suis",
      helloText: "Petite, duveteuse, blonde et vivant à Londres. J’aime les beaux endroits, les longues promenades, la mode et rencontrer de nouveaux amis.",

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
      coatValue: "Doux, duveteux et blond",
      personality: "Personnalité",
      personalityValue: "Douce et curieuse",
      loves: "Adore",
      lovesValue: "Promenades et voyages",
      weakness: "Faiblesse",
      weaknessValue: "Friandises",
      looking: "Recherche",
      lookingValue: "De nouveaux amis",
      swipe: "Glisser à droite ?",
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
      diary1: "Quand je suis arrivée, ma famille s’est soudain retrouvée avec toute une liste de nouvelles questions.",
      diaryNote: "Où pouvons-nous aller ensemble ?<br>Quels cafés m’accueilleront ?<br>Quels hôtels aiment vraiment les animaux ?<br>Où pouvons-nous nous promener, voyager et rencontrer de nouveaux amis ?",
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
      london5: "Pour moi, une promenade ne consiste pas simplement à sortir. C’est ainsi que je découvre le monde. 🌍",

      friendKicker: "Bonjour, nouvel ami ♥ ✨",
      friendTitle: "C’EST UN<br>MATCH ! 💕",
      friend1: "Bonjour. Je suis Miso Cute.",
      friend2: "Je suis minuscule, douce, curieuse et toujours heureuse de rencontrer quelqu’un de nouveau.",
      friend3: "Certaines aventures sont faites pour explorer. D’autres pour être partagées. 🐾",
      friend4: "Un nouveau visage. Un petit bonjour. Et parfois — un nouvel ami.",
      friend5: "Le meilleur dans une nouvelle aventure, c’est de ne jamais savoir qui l’on va rencontrer. ♥",

      everyoneKicker: "Tout le monde est invité ♥ ✨",
      everyoneTitle: "IL Y A DE LA PLACE<br>POUR TOUT LE MONDE.",
      animals: "🐶 Chiens, 🐱 chats, 🦜 perroquets, 🐰 lapins, 🐴 chevaux, 🐢 tortues, cochons d’Inde, 🐠 poissons, 🐦 oiseaux et reptiles.",
      everyone1: "Grands. Petits. Duveteux. À plumes. Lisses.",
      everyone2: "Certains ont des pattes. Certains ont des ailes. Certains ont des nageoires.",
      everyone3: "Certains veulent courir à nos côtés. D’autres préfèrent un coin chaud et tranquille. Certains observent le monde depuis une branche, un aquarium ou leur fenêtre préférée.",
      everyone4: "Tout le monde est bienvenu ici. ♥ 🌍✨",
      everyone5: "Nous n’avons pas besoin de nous ressembler pour appartenir au même monde.",
      everyone6: "C’est précisément le principe.",
      everyone7: "PETS & DOGUE parle des animaux — et des personnes qui les aiment.",

      askKicker: "Département curiosité ♥ ✨",
      askTitle: "ET SI VOUS AVEZ<br>BESOIN DE MON AIDE...",
      askMark: "Demandez à mon petit nez curieux ♥",
      askMarkSub: "Miso sait où chercher. ✨",
      ask1: "Besoin d’un endroit où aller ?",
      ask2: "Vous cherchez un lieu pet-friendly ? 🐾",
      ask3: "Vous préparez un voyage ? ✈️",
      ask4: "Vous cherchez quelque chose d’utile ?",
      ask5: "Je regarde. Je renifle. J’explore. ✨",
      ask6: "Et quand je trouve quelque chose d’intéressant, je le rapporte à PETS & DOGUE.",
      ask7: "C’est à cela que sert un petit nez curieux. ♥",
      askLabel: "Demandez à Miso ✨",

      finalKicker: "À bientôt quelque part dans le monde ✨",
      finalTitle: "À BIENTÔT<br>QUELQUE PART.",
      finalBlue: "Un monde.<br>Tous les animaux. 🌍",
      final1: "Aujourd’hui, nous pourrions nous rencontrer à Londres. Demain — au bord de la mer.",
      final2: "Peut-être dans un parc, un café ou dans un endroit totalement inattendu.",
      final3: "Si vous voyez une minuscule blonde duveteuse explorer très sérieusement un nouvel endroit — venez lui dire bonjour. 💕",
      final4: "Et si nous sommes encore loin l’un de l’autre, cherchez mon petit cercle sur PETS & DOGUE.",
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
      coverText: "Eine winzige blonde Pomeranian-Dame aus London mit neugieriger Nase und einer riesigen Welt, die es zu entdecken gilt.",
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
      personality: "Persönlichkeit",
      personalityValue: "Sanft & neugierig",
      loves: "Liebt",
      lovesValue: "Spaziergänge & Reisen",
      weakness: "Schwäche",
      weaknessValue: "Leckerlis",
      looking: "Sucht",
      lookingValue: "Neue Freunde",
      swipe: "Nach rechts wischen?",
      match: "Ein Match! ♥ ✨",

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
      diary1: "Als ich ankam, hatte meine Familie plötzlich eine ganze Liste neuer Fragen.",
      diaryNote: "Wohin können wir gemeinsam gehen?<br>In welchen Cafés bin ich willkommen?<br>Welche Hotels lieben Haustiere wirklich?<br>Wo können wir spazieren, reisen und neue Freunde treffen?",
      diary2: "Ein winziger Hund — und plötzlich sah die Welt völlig anders aus.",
      diary3: "Wir begannen Orte zu suchen, neue Wege zu entdecken und nützliche Antworten zu sammeln.",
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
      london5: "Für mich bedeutet ein Spaziergang nicht einfach nur hinauszugehen. So entdecke ich die Welt. 🌍",

      friendKicker: "Hallo, neuer Freund ♥ ✨",
      friendTitle: "EIN<br>MATCH! 💕",
      friend1: "Hallo. Ich bin Miso Cute.",
      friend2: "Ich bin winzig, sanft, neugierig und freue mich immer darauf, jemanden Neues kennenzulernen.",
      friend3: "Manche Abenteuer sind zum Entdecken da. Andere zum Teilen. 🐾",
      friend4: "Ein neues Gesicht. Ein kleines Hallo. Und manchmal — ein neuer Freund.",
      friend5: "Das Schönste an einem neuen Abenteuer ist, nie zu wissen, wem man begegnen wird. ♥",

      everyoneKicker: "Alle sind eingeladen ♥ ✨",
      everyoneTitle: "HIER IST PLATZ<br>FÜR ALLE.",
      animals: "🐶 Hunde, 🐱 Katzen, 🦜 Papageien, 🐰 Kaninchen, 🐴 Pferde, 🐢 Schildkröten, Meerschweinchen, 🐠 Fische, 🐦 Vögel und Reptilien.",
      everyone1: "Groß. Klein. Flauschig. Gefiedert. Glatt.",
      everyone2: "Manche haben Pfoten. Manche Flügel. Manche Flossen.",
      everyone3: "Manche möchten neben uns laufen. Andere bevorzugen eine warme, ruhige Ecke. Manche beobachten die ganze Welt von einem Ast, einem Aquarium oder ihrem Lieblingsfenster aus.",
      everyone4: "Hier sind alle willkommen. ♥ 🌍✨",
      everyone5: "Wir müssen nicht gleich aussehen, um zur selben Welt zu gehören.",
      everyone6: "Genau darum geht es.",
      everyone7: "PETS & DOGUE handelt von Tieren — und den Menschen, die sie lieben.",

      askKicker: "Abteilung Neugier ♥ ✨",
      askTitle: "UND WENN DU<br>MEINE HILFE BRAUCHST...",
      askMark: "Frag meine neugierige kleine Nase ♥",
      askMarkSub: "Miso weiß, wo sie suchen muss. ✨",
      ask1: "Brauchst du einen Ort, an den du gehen kannst?",
      ask2: "Suchst du einen tierfreundlichen Ort? 🐾",
      ask3: "Planst du eine Reise? ✈️",
      ask4: "Suchst du etwas Nützliches?",
      ask5: "Ich schaue. Ich schnuppere. Ich entdecke. ✨",
      ask6: "Und wenn ich etwas Interessantes finde, bringe ich es zurück zu PETS & DOGUE.",
      ask7: "Dafür ist eine neugierige kleine Nase da. ♥",
      askLabel: "Frag Miso ✨",

      finalKicker: "Wir sehen uns irgendwo auf der Welt ✨",
      finalTitle: "WIR SEHEN UNS<br>DA DRAUSSEN.",
      finalBlue: "Eine Welt.<br>Jedes Haustier. 🌍",
      final1: "Heute treffen wir uns vielleicht in London. Morgen — am Meer.",
      final2: "Vielleicht in einem Park, einem Café oder an einem völlig unerwarteten Ort.",
      final3: "Wenn du eine winzige flauschige Blondine siehst, die ernsthaft einen neuen Ort erkundet — komm und sag Hallo. 💕",
      final4: "Und wenn wir gerade weit voneinander entfernt sind, halte auf PETS & DOGUE nach meinem kleinen Kreis Ausschau.",
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
      backIssue: "← Volver a la Edición 01",

      helloKicker: "Hola, nuevo amigo ♥ ✨",
      helloTitle: "Hola, soy",
      helloText: "Pequeña, esponjosa, rubia y viviendo en Londres. Me encantan los lugares bonitos, los paseos largos, la moda y conocer nuevos amigos.",

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
      personality: "Personalidad",
      personalityValue: "Dulce y curiosa",
      loves: "Le encanta",
      lovesValue: "Pasear y viajar",
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
      fashionText: "Un poco de rosa. Mucha Miso.",
      london: "Londres 🇬🇧💙",
      londonText: "Mi ciudad. Mis pequeñas aventuras.",
      friends: "Amigos 💕🐾",
      friendsText: "Las aventuras son mejores juntos.",

      diaryKicker: "Del diario de Miso ♥ ✨",
      diaryTitle: "UN PERRO PEQUEÑO.<br>UNA IDEA MUY GRANDE. ✨",
      diaryLead: "Creo que todo empezó conmigo. 💕",
      diary1: "Cuando llegué, mi familia de repente tuvo toda una lista de preguntas nuevas.",
      diaryNote: "¿Adónde podemos ir juntos?<br>¿Qué cafés me recibirán?<br>¿Qué hoteles aman realmente a las mascotas?<br>¿Dónde podemos pasear, viajar y conocer nuevos amigos?",
      diary2: "Un perro diminuto — y de repente el mundo parecía completamente diferente.",
      diary3: "Empezamos a buscar lugares, descubrir nuevas rutas y reunir respuestas útiles.",
      diary4: "Cada paseo se convirtió en una pequeña investigación. Cada viaje trajo otro descubrimiento. Cada lugar nuevo nos dio algo útil para recordar.",
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
      london2: "Hoy un parque. 🌳<br>Mañana un pequeño café. ☕<br>Después el río, un mercado, un autobús rojo 🚌<br>o una calle que nunca había visto.",
      london3: "Me detengo. Miro. Olfateo. Y después elijo otra dirección. ✨",
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
      everyone2: "Algunos tienen patas. Algunos alas. Algunos aletas.",
      everyone3: "Algunos quieren correr a nuestro lado. Otros prefieren un rincón cálido y tranquilo. Algunos observan todo el mundo desde una rama, un acuario o su ventana favorita.",
      everyone4: "Todos son bienvenidos aquí. ♥ 🌍✨",
      everyone5: "No necesitamos parecernos para pertenecer al mismo mundo.",
      everyone6: "De eso se trata.",
      everyone7: "PETS & DOGUE trata de animales — y de las personas que los aman.",

      askKicker: "Departamento de curiosidad ♥ ✨",
      askTitle: "Y SI NECESITAS<br>MI AYUDA...",
      askMark: "Pregúntale a mi pequeña nariz curiosa ♥",
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
      final2: "Quizá en un parque, un café o en algún lugar completamente inesperado.",
      final3: "Si ves a una diminuta rubia esponjosa explorando muy seriamente un lugar nuevo — ven a saludar. 💕",
      final4: "Y si por ahora estamos lejos, busca mi pequeño círculo en PETS & DOGUE.",
      final5: "De una forma u otra, nos encontraremos. ♥",
      signature: "Con amor,<br>Miso ♥",
      tagline: "Un mundo. Cada mascota. ♥",
      issueLink: "← Edición 01",
      home: "Inicio"
    },    /* =====================================================
       ITALIAN
    ===================================================== */
    it: {
      coverKicker: "PETS & DOGUE · NUMERO 01 · STORIA DI COPERTINA ✨",
      coverMeet: "Incontra",
      coverBlue: "Piccole zampe.<br>Grande mondo. ✨",
      coverText: "Una minuscola Pomerania bionda di Londra, con un nasino curioso e un mondo enorme da scoprire.",
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
      playtime: "Gioco 🧸💕",
      playtimeText: "La mia attività seria preferita.",
      fashion: "Moda 👗💕",
      fashionText: "Un po’ di rosa. Tantissima Miso.",
      london: "Londra 🇬🇧💙",
      londonText: "La mia città. Le mie piccole avventure.",
      friends: "Amici 💕🐾",
      friendsText: "Le avventure sono più belle insieme.",

      diaryKicker: "Dal diario di Miso ♥ ✨",
      diaryTitle: "UN PICCOLO CANE.<br>UN’IDEA MOLTO GRANDE. ✨",
      diaryLead: "Credo che tutto sia iniziato con me. 💕",
      diary1: "Quando sono arrivata, la mia famiglia si è trovata improvvisamente con una lunga lista di nuove domande.",
      diaryNote: "Dove possiamo andare insieme?<br>Quali caffè mi accoglieranno?<br>Quali hotel amano davvero gli animali?<br>Dove possiamo passeggiare, viaggiare e incontrare nuovi amici?",
      diary2: "Un cane minuscolo — e all’improvviso il mondo sembrava completamente diverso.",
      diary3: "Abbiamo iniziato a cercare posti, scoprire nuovi percorsi e raccogliere risposte utili.",
      diary4: "Ogni passeggiata è diventata una piccola esplorazione. Ogni viaggio portava una nuova scoperta. Ogni posto nuovo ci lasciava qualcosa di utile da ricordare.",
      diary5: "Forse è così che è nato PETS & DOGUE. ♥",
      pull: "Un piccolo cane.<br>Un mondo molto grande. 🌍✨",

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
      london5: "Per me una passeggiata non significa semplicemente uscire. È il modo in cui scopro il mondo. 🌍",

      friendKicker: "Ciao, nuovo amico ♥ ✨",
      friendTitle: "È UN<br>MATCH! 💕",
      friend1: "Ciao. Sono Miso Cute.",
      friend2: "Sono minuscola, dolce, curiosa e sempre felice di conoscere qualcuno di nuovo.",
      friend3: "Alcune avventure sono fatte per esplorare. Altre per essere condivise. 🐾",
      friend4: "Un volto nuovo. Un piccolo ciao. E a volte — un nuovo amico.",
      friend5: "La parte migliore di una nuova avventura è non sapere mai chi potresti incontrare. ♥",

      everyoneKicker: "Sono tutti invitati ♥ ✨",
      everyoneTitle: "C’È SPAZIO<br>PER TUTTI.",
      animals: "🐶 Cani, 🐱 gatti, 🦜 pappagalli, 🐰 conigli, 🐴 cavalli, 🐢 tartarughe, porcellini d’India, 🐠 pesci, 🐦 uccelli e rettili.",
      everyone1: "Grandi. Piccoli. Soffici. Piumati. Lisci.",
      everyone2: "Alcuni hanno zampe. Alcuni ali. Alcuni pinne.",
      everyone3: "Alcuni vogliono correre accanto a noi. Altri preferiscono un angolo caldo e tranquillo. Alcuni osservano il mondo da un ramo, un acquario o dalla loro finestra preferita.",
      everyone4: "Qui sono tutti benvenuti. ♥ 🌍✨",
      everyone5: "Non dobbiamo essere uguali per appartenere allo stesso mondo.",
      everyone6: "È proprio questo il punto.",
      everyone7: "PETS & DOGUE parla degli animali — e delle persone che li amano.",

      askKicker: "Reparto curiosità ♥ ✨",
      askTitle: "E SE HAI<br>BISOGNO DEL MIO AIUTO...",
      askMark: "Chiedi al mio piccolo naso curioso ♥",
      askMarkSub: "Miso sa dove cercare. ✨",
      ask1: "Hai bisogno di un posto dove andare?",
      ask2: "Cerchi un posto pet-friendly? 🐾",
      ask3: "Stai organizzando un viaggio? ✈️",
      ask4: "Cerchi qualcosa di utile?",
      ask5: "Guardo. Annuso. Esploro. ✨",
      ask6: "E quando trovo qualcosa di interessante, lo porto a PETS & DOGUE.",
      ask7: "È a questo che serve un piccolo naso curioso. ♥",
      askLabel: "Chiedi a Miso ✨",

      finalKicker: "Ci vediamo da qualche parte nel mondo ✨",
      finalTitle: "CI VEDIAMO<br>LÀ FUORI.",
      finalBlue: "Un mondo.<br>Ogni animale. 🌍",
      final1: "Oggi potremmo incontrarci a Londra. Domani — al mare.",
      final2: "Forse in un parco, in un caffè o in un posto completamente inaspettato.",
      final3: "Se vedi una minuscola biondina soffice che esplora molto seriamente un posto nuovo — vieni a salutarmi. 💕",
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
      coverBlue: "Patinhas pequenas.<br>Um mundo enorme. ✨",
      coverText: "Uma minúscula Pomerânia loira de Londres, com um nariz curioso e um mundo enorme para descobrir.",
      backIssue: "← Voltar à Edição 01",

      helloKicker: "Olá, novo amigo ♥ ✨",
      helloTitle: "Olá, eu sou",
      helloText: "Pequena, fofinha, loira e vivendo em Londres. Adoro lugares bonitos, longos passeios, moda e conhecer novos amigos.",

      profileKicker: "O perfil da Miso ✨",
      profileTitle: "CÃO PEQUENO.<br>GRANDE PERSONALIDADE.",
      profileSub: "Pomerânia · Londres · muito compacta.",
      breed: "Raça",
      breedValue: "Pomerânia",
      city: "Cidade",
      cityValue: "Londres",
      size: "Tamanho",
      sizeValue: "Minúscula",
      coat: "Pelo",
      coatValue: "Macio, fofo e loiro",
      personality: "Personalidade",
      personalityValue: "Meiga e curiosa",
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
      travelText: "Patinhas pequenas. Novos lugares.",
      playtime: "Hora de brincar 🧸💕",
      playtimeText: "O meu assunto sério favorito.",
      fashion: "Moda 👗💕",
      fashionText: "Um pouco de rosa. Muita Miso.",
      london: "Londres 🇬🇧💙",
      londonText: "A minha cidade. As minhas pequenas aventuras.",
      friends: "Amigos 💕🐾",
      friendsText: "As aventuras são melhores juntos.",

      diaryKicker: "Do diário da Miso ♥ ✨",
      diaryTitle: "UM CÃO PEQUENO.<br>UMA IDEIA MUITO GRANDE. ✨",
      diaryLead: "Acho que tudo começou comigo. 💕",
      diary1: "Quando cheguei, a minha família de repente ficou com uma lista inteira de novas perguntas.",
      diaryNote: "Onde podemos ir juntos?<br>Que cafés me receberão?<br>Que hotéis realmente gostam de animais?<br>Onde podemos passear, viajar e conhecer novos amigos?",
      diary2: "Um cão minúsculo — e de repente o mundo parecia completamente diferente.",
      diary3: "Começámos a procurar lugares, descobrir novos percursos e reunir respostas úteis.",
      diary4: "Cada passeio tornou-se uma pequena investigação. Cada viagem trouxe uma nova descoberta. Cada novo lugar nos deu algo útil para recordar.",
      diary5: "Talvez tenha sido assim que PETS & DOGUE começou. ♥",
      pull: "Um cão pequeno.<br>Um mundo muito grande. 🌍✨",

      seaKicker: "Miso explora ✨",
      seaTitle: "O<br>mar 🌊",
      seaText: "Novos cheiros.<br>Novos sons.<br>Um mundo enorme. 💙",

      londonKicker: "A minha Londres ♥ ✨",
      londonTitle: "A MINHA CIDADE —<br>LONDRES",
      londonFeature: "Miso em Londres 💙",
      londonFeatureSub: "Patinhas pequenas. Cidade grande. 🎀✨",
      london1: "Londres nunca parece exatamente igual duas vezes. ♥",
      london2: "Hoje um parque. 🌳<br>Amanhã um pequeno café. ☕<br>Depois o rio, um mercado, um autocarro vermelho 🚌<br>ou uma rua que nunca vi.",
      london3: "Paro. Olho. Cheiro. Depois escolho outra direção. ✨",
      london4: "Às vezes, a melhor parte é o destino. Às vezes, é tudo o que descubro pelo caminho.",
      london5: "Para mim, um passeio não é simplesmente sair. É assim que descubro o mundo. 🌍",

      friendKicker: "Olá, novo amigo ♥ ✨",
      friendTitle: "É UM<br>MATCH! 💕",
      friend1: "Olá. Sou a Miso Cute.",
      friend2: "Sou minúscula, meiga, curiosa e estou sempre interessada em conhecer alguém novo.",
      friend3: "Algumas aventuras são feitas para explorar. Outras para partilhar. 🐾",
      friend4: "Uma cara nova. Um pequeno olá. E às vezes — um novo amigo.",
      friend5: "A melhor parte de uma nova aventura é nunca saber quem podemos encontrar. ♥",

      everyoneKicker: "Todos estão convidados ♥ ✨",
      everyoneTitle: "HÁ ESPAÇO<br>PARA TODOS.",
      animals: "🐶 Cães, 🐱 gatos, 🦜 papagaios, 🐰 coelhos, 🐴 cavalos, 🐢 tartarugas, porquinhos-da-índia, 🐠 peixes, 🐦 aves e répteis.",
      everyone1: "Grandes. Pequenos. Fofos. Com penas. Lisos.",
      everyone2: "Alguns têm patas. Alguns asas. Alguns barbatanas.",
      everyone3: "Alguns querem correr ao nosso lado. Outros preferem um canto quente e tranquilo. Alguns observam o mundo de um ramo, de um aquário ou da sua janela favorita.",
      everyone4: "Todos são bem-vindos aqui. ♥ 🌍✨",
      everyone5: "Não precisamos de ser iguais para pertencer ao mesmo mundo.",
      everyone6: "É exatamente esse o objetivo.",
      everyone7: "PETS & DOGUE é sobre animais — e as pessoas que os amam.",

      askKicker: "Departamento da curiosidade ♥ ✨",
      askTitle: "E SE PRECISAR<br>DA MINHA AJUDA...",
      askMark: "Pergunte ao meu pequeno nariz curioso ♥",
      askMarkSub: "Miso sabe onde procurar. ✨",
      ask1: "Precisa de algum lugar para ir?",
      ask2: "Procura um lugar pet-friendly? 🐾",
      ask3: "Está a planear uma viagem? ✈️",
      ask4: "Procura algo útil?",
      ask5: "Olho. Cheiro. Exploro. ✨",
      ask6: "E quando encontro algo interessante, levo-o de volta ao PETS & DOGUE.",
      ask7: "É para isso que serve um pequeno nariz curioso. ♥",
      askLabel: "Pergunte à Miso ✨",

      finalKicker: "Até algum lugar no mundo ✨",
      finalTitle: "VEMO-NOS<br>POR AÍ.",
      finalBlue: "Um mundo.<br>Todos os animais. 🌍",
      final1: "Hoje podemos encontrar-nos em Londres. Amanhã — junto ao mar.",
      final2: "Talvez num parque, num café ou em algum lugar completamente inesperado.",
      final3: "Se vir uma minúscula loirinha fofinha a explorar muito seriamente um lugar novo — venha dizer olá. 💕",
      final4: "E se por enquanto estivermos longe, procure o meu pequeno círculo no PETS & DOGUE.",
      final5: "De uma forma ou de outra, vamos encontrar-nos. ♥",
      signature: "Com amor,<br>Miso ♥",
      tagline: "Um mundo. Todos os animais. ♥",
      issueLink: "← Edição 01",
      home: "Início"
    },

    /* =====================================================
       DUTCH
    ===================================================== */
    nl: {
      coverKicker: "PETS & DOGUE · EDITIE 01 · COVER STORY ✨",
      coverMeet: "Ontmoet",
      coverBlue: "Kleine pootjes.<br>Grote wereld. ✨",
      coverText: "Een piepkleine blonde Pomeriaan uit Londen, met een nieuwsgierig neusje en een enorme wereld om te ontdekken.",
      backIssue: "← Terug naar Editie 01",

      helloKicker: "Hallo, nieuwe vriend ♥ ✨",
      helloTitle: "Hoi, ik ben",
      helloText: "Klein, pluizig, blond en ik woon in Londen. Ik hou van mooie plekken, lange wandelingen, mode en nieuwe vrienden ontmoeten.",

      profileKicker: "Miso’s profiel ✨",
      profileTitle: "KLEINE HOND.<br>GROTE PERSOONLIJKHEID.",
      profileSub: "Pomeriaan · Londen · zeer compact.",
      breed: "Ras",
      breedValue: "Pomeriaan",
      city: "Stad",
      cityValue: "Londen",
      size: "Formaat",
      sizeValue: "Piepklein",
      coat: "Vacht",
      coatValue: "Zacht, pluizig en blond",
      personality: "Persoonlijkheid",
      personalityValue: "Zacht & nieuwsgierig",
      loves: "Houdt van",
      lovesValue: "Wandelen & reizen",
      weakness: "Zwak voor",
      weaknessValue: "Snoepjes",
      looking: "Op zoek naar",
      lookingValue: "Nieuwe vrienden",
      swipe: "Naar rechts swipen?",
      match: "Het is een match! ♥ ✨",

      favourites: "Miso’s favorieten ♥ ✨",
      world: "MIJN KLEINE<br>WERELD",
      travel: "Reizen ✈️✨",
      travelText: "Kleine pootjes. Nieuwe plekken.",
      playtime: "Speeltijd 🧸💕",
      playtimeText: "Mijn favoriete serieuze bezigheid.",
      fashion: "Mode 👗💕",
      fashionText: "Een beetje roze. Heel veel Miso.",
      london: "Londen 🇬🇧💙",
      londonText: "Mijn stad. Mijn kleine avonturen.",
      friends: "Vrienden 💕🐾",
      friendsText: "Avonturen zijn samen leuker.",

      diaryKicker: "Uit Miso’s dagboek ♥ ✨",
      diaryTitle: "ÉÉN KLEINE HOND.<br>ÉÉN HEEL GROOT IDEE. ✨",
      diaryLead: "Ik denk dat het allemaal met mij begon. 💕",
      diary1: "Toen ik kwam, had mijn familie opeens een hele lijst nieuwe vragen.",
      diaryNote: "Waar kunnen we samen heen?<br>In welke cafés ben ik welkom?<br>Welke hotels houden echt van huisdieren?<br>Waar kunnen we wandelen, reizen en nieuwe vrienden ontmoeten?",
      diary2: "Eén piepkleine hond — en plotseling zag de wereld er compleet anders uit.",
      diary3: "We begonnen plekken te zoeken, nieuwe routes te ontdekken en nuttige antwoorden te verzamelen.",
      diary4: "Elke wandeling werd een klein onderzoek. Elke reis bracht een nieuwe ontdekking. Elke nieuwe plek gaf ons iets nuttigs om te onthouden.",
      diary5: "Misschien was dat het begin van PETS & DOGUE. ♥",
      pull: "Eén kleine hond.<br>Eén heel grote wereld. 🌍✨",

      seaKicker: "Miso ontdekt ✨",
      seaTitle: "De<br>zee 🌊",
      seaText: "Nieuwe geuren.<br>Nieuwe geluiden.<br>Grote wereld. 💙",

      londonKicker: "Mijn Londen ♥ ✨",
      londonTitle: "MIJN STAD —<br>LONDEN",
      londonFeature: "Miso in Londen 💙",
      londonFeatureSub: "Kleine pootjes. Grote stad. 🎀✨",
      london1: "Londen voelt nooit twee keer precies hetzelfde. ♥",
      london2: "Vandaag een park. 🌳<br>Morgen een klein café. ☕<br>Dan de rivier, een markt, een rode bus 🚌<br>of een straat die ik nog nooit heb gezien.",
      london3: "Ik stop. Ik kijk. Ik snuffel. Daarna kies ik een andere richting. ✨",
      london4: "Soms is de bestemming het mooiste. Soms is het alles wat ik onderweg opmerk.",
      london5: "Voor mij is een wandeling niet gewoon naar buiten gaan. Zo ontdek ik de wereld. 🌍",

      friendKicker: "Hallo, nieuwe vriend ♥ ✨",
      friendTitle: "HET IS EEN<br>MATCH! 💕",
      friend1: "Hoi. Ik ben Miso Cute.",
      friend2: "Ik ben piepklein, zacht, nieuwsgierig en altijd geïnteresseerd in een nieuwe ontmoeting.",
      friend3: "Sommige avonturen zijn gemaakt om te ontdekken. Andere om te delen. 🐾",
      friend4: "Een nieuw gezicht. Een kleine hallo. En soms — een nieuwe vriend.",
      friend5: "Het mooiste aan een nieuw avontuur is dat je nooit weet wie je tegenkomt. ♥",

      everyoneKicker: "Iedereen is uitgenodigd ♥ ✨",
      everyoneTitle: "ER IS PLAATS<br>VOOR IEDEREEN.",
      animals: "🐶 Honden, 🐱 katten, 🦜 papegaaien, 🐰 konijnen, 🐴 paarden, 🐢 schildpadden, cavia’s, 🐠 vissen, 🐦 vogels en reptielen.",
      everyone1: "Groot. Klein. Pluizig. Gevederd. Glad.",
      everyone2: "Sommigen hebben poten. Sommigen vleugels. Sommigen vinnen.",
      everyone3: "Sommigen willen naast ons rennen. Anderen zitten liever in een warme rustige hoek. Sommigen bekijken de wereld vanaf een tak, een aquarium of hun favoriete raam.",
      everyone4: "Iedereen is hier welkom. ♥ 🌍✨",
      everyone5: "We hoeven er niet hetzelfde uit te zien om bij dezelfde wereld te horen.",
      everyone6: "Dat is precies het idee.",
      everyone7: "PETS & DOGUE gaat over dieren — en de mensen die van ze houden.",

      askKicker: "Afdeling nieuwsgierigheid ♥ ✨",
      askTitle: "EN ALS JE<br>MIJN HULP NODIG HEBT...",
      askMark: "Vraag het aan mijn nieuwsgierige neusje ♥",
      askMarkSub: "Miso weet waar ze moet zoeken. ✨",
      ask1: "Een plek nodig om naartoe te gaan?",
      ask2: "Op zoek naar een huisdiervriendelijke plek? 🐾",
      ask3: "Een reis aan het plannen? ✈️",
      ask4: "Op zoek naar iets nuttigs?",
      ask5: "Ik kijk. Ik snuffel. Ik ontdek. ✨",
      ask6: "En als ik iets interessants vind, breng ik het terug naar PETS & DOGUE.",
      ask7: "Daar is een nieuwsgierig neusje voor. ♥",
      askLabel: "Vraag Miso ✨",

      finalKicker: "Tot ergens in de wereld ✨",
      finalTitle: "TOT ZIENS<br>DAARBUITEN.",
      finalBlue: "Eén wereld.<br>Elk huisdier. 🌍",
      final1: "Vandaag komen we elkaar misschien tegen in Londen. Morgen — aan zee.",
      final2: "Misschien in een park, een café of ergens totaal onverwachts.",
      final3: "Zie je een piepkleine pluizige blondine heel serieus een nieuwe plek verkennen — kom dan hallo zeggen. 💕",
      final4: "En als we voorlopig ver van elkaar zijn, zoek dan mijn kleine cirkel op PETS & DOGUE.",
      final5: "Op de een of andere manier ontmoeten we elkaar. ♥",
      signature: "Liefs,<br>Miso ♥",
      tagline: "Eén wereld. Elk huisdier. ♥",
      issueLink: "← Editie 01",
      home: "Home"
    },    /* =====================================================
       POLISH
    ===================================================== */
    pl: {
      coverKicker: "PETS & DOGUE · WYDANIE 01 · HISTORIA Z OKŁADKI ✨",
      coverMeet: "Poznaj",
      coverBlue: "Małe łapki.<br>Wielki świat. ✨",
      coverText: "Maleńka blond pomeranianka z Londynu, z ciekawskim noskiem i ogromnym światem do odkrycia.",
      backIssue: "← Powrót do Wydania 01",

      helloKicker: "Cześć, nowy przyjacielu ♥ ✨",
      helloTitle: "Cześć, jestem",
      helloText: "Malutka, puszysta, blond i mieszkam w Londynie. Uwielbiam piękne miejsca, długie spacery, modę i poznawanie nowych przyjaciół.",

      profileKicker: "Profil Miso ✨",
      profileTitle: "MAŁY PIES.<br>WIELKA OSOBOWOŚĆ.",
      profileSub: "Pomeranian · Londyn · bardzo kompaktowa.",
      breed: "Rasa",
      breedValue: "Pomeranian",
      city: "Miasto",
      cityValue: "Londyn",
      size: "Rozmiar",
      sizeValue: "Maleńka",
      coat: "Sierść",
      coatValue: "Miękka, puszysta i jasna",
      personality: "Osobowość",
      personalityValue: "Łagodna i ciekawska",
      loves: "Uwielbia",
      lovesValue: "Spacery i podróże",
      weakness: "Słabość",
      weaknessValue: "Przysmaki",
      looking: "Szuka",
      lookingValue: "Nowych przyjaciół",
      swipe: "Przesunąć w prawo?",
      match: "To match! ♥ ✨",

      favourites: "Ulubione rzeczy Miso ♥ ✨",
      world: "MÓJ MAŁY<br>ŚWIAT",
      travel: "Podróże ✈️✨",
      travelText: "Małe łapki. Nowe miejsca.",
      playtime: "Zabawa 🧸💕",
      playtimeText: "Moja ulubiona poważna sprawa.",
      fashion: "Moda 👗💕",
      fashionText: "Trochę różu. Bardzo dużo Miso.",
      london: "Londyn 🇬🇧💙",
      londonText: "Moje miasto. Moje małe przygody.",
      friends: "Przyjaciele 💕🐾",
      friendsText: "Przygody są lepsze razem.",

      diaryKicker: "Z pamiętnika Miso ♥ ✨",
      diaryTitle: "JEDEN MAŁY PIES.<br>JEDEN BARDZO WIELKI POMYSŁ. ✨",
      diaryLead: "Chyba wszystko zaczęło się ode mnie. 💕",
      diary1: "Kiedy się pojawiłam, moja rodzina nagle miała całą listę nowych pytań.",
      diaryNote: "Dokąd możemy chodzić razem?<br>W których kawiarniach będę mile widziana?<br>Które hotele naprawdę kochają zwierzęta?<br>Gdzie możemy spacerować, podróżować i poznawać nowych przyjaciół?",
      diary2: "Jeden maleńki pies — i nagle świat wyglądał zupełnie inaczej.",
      diary3: "Zaczęliśmy szukać miejsc, odkrywać nowe trasy i zbierać przydatne odpowiedzi.",
      diary4: "Każdy spacer stał się małym śledztwem. Każda podróż przynosiła nowe odkrycie. Każde nowe miejsce dawało nam coś przydatnego do zapamiętania.",
      diary5: "Być może właśnie tak zaczęło się PETS & DOGUE. ♥",
      pull: "Jeden mały pies.<br>Jeden bardzo wielki świat. 🌍✨",

      seaKicker: "Miso odkrywa ✨",
      seaTitle: "Morze 🌊",
      seaText: "Nowe zapachy.<br>Nowe dźwięki.<br>Wielki świat. 💙",

      londonKicker: "Mój Londyn ♥ ✨",
      londonTitle: "MOJE MIASTO —<br>LONDYN",
      londonFeature: "Miso w Londynie 💙",
      londonFeatureSub: "Małe łapki. Wielkie miasto. 🎀✨",
      london1: "Londyn nigdy nie jest dokładnie taki sam dwa razy. ♥",
      london2: "Dziś park. 🌳<br>Jutro mała kawiarnia. ☕<br>Potem rzeka, targ, czerwony autobus 🚌<br>albo ulica, której jeszcze nigdy nie widziałam.",
      london3: "Zatrzymuję się. Patrzę. Wącham. Potem wybieram inny kierunek. ✨",
      london4: "Czasem najlepszy jest cel. Czasem wszystko, co zauważam po drodze.",
      london5: "Dla mnie spacer to nie tylko wyjście na zewnątrz. W ten sposób odkrywam świat. 🌍",

      friendKicker: "Cześć, nowy przyjacielu ♥ ✨",
      friendTitle: "TO<br>MATCH! 💕",
      friend1: "Cześć. Jestem Miso Cute.",
      friend2: "Jestem maleńka, łagodna, ciekawska i zawsze chętnie poznaję kogoś nowego.",
      friend3: "Niektóre przygody są stworzone do odkrywania. Inne do dzielenia się nimi. 🐾",
      friend4: "Nowa twarz. Małe „cześć”. A czasami — nowy przyjaciel.",
      friend5: "Najlepsze w nowej przygodzie jest to, że nigdy nie wiadomo, kogo można spotkać. ♥",

      everyoneKicker: "Wszyscy są zaproszeni ♥ ✨",
      everyoneTitle: "TU JEST MIEJSCE<br>DLA KAŻDEGO.",
      animals: "🐶 Psy, 🐱 koty, 🦜 papugi, 🐰 króliki, 🐴 konie, 🐢 żółwie, świnki morskie, 🐠 ryby, 🐦 ptaki i gady.",
      everyone1: "Duże. Małe. Puszyste. Pierzaste. Gładkie.",
      everyone2: "Niektóre mają łapy. Niektóre skrzydła. Niektóre płetwy.",
      everyone3: "Niektóre chcą biec obok nas. Inne wolą ciepły, spokojny kąt. Jeszcze inne obserwują świat z gałęzi, akwarium lub ulubionego okna.",
      everyone4: "Każdy jest tutaj mile widziany. ♥ 🌍✨",
      everyone5: "Nie musimy wyglądać tak samo, żeby należeć do tego samego świata.",
      everyone6: "Właśnie o to chodzi.",
      everyone7: "PETS & DOGUE jest o zwierzętach — i ludziach, którzy je kochają.",

      askKicker: "Dział ciekawości ♥ ✨",
      askTitle: "A JEŚLI POTRZEBUJESZ<br>MOJEJ POMOCY...",
      askMark: "Zapytaj mój ciekawski nosek ♥",
      askMarkSub: "Miso wie, gdzie szukać. ✨",
      ask1: "Potrzebujesz miejsca, do którego można pójść?",
      ask2: "Szukasz miejsca przyjaznego zwierzętom? 🐾",
      ask3: "Planujesz podróż? ✈️",
      ask4: "Szukasz czegoś przydatnego?",
      ask5: "Patrzę. Wącham. Odkrywam. ✨",
      ask6: "A kiedy znajdę coś interesującego, przynoszę to do PETS & DOGUE.",
      ask7: "Właśnie do tego służy ciekawski mały nosek. ♥",
      askLabel: "Zapytaj Miso ✨",

      finalKicker: "Do zobaczenia gdzieś na świecie ✨",
      finalTitle: "DO ZOBACZENIA<br>GDZIEŚ TAM.",
      finalBlue: "Jeden świat.<br>Każdy pupil. 🌍",
      final1: "Dziś możemy spotkać się w Londynie. Jutro — nad morzem.",
      final2: "Może w parku, kawiarni albo w zupełnie niespodziewanym miejscu.",
      final3: "Jeśli zobaczysz maleńką puszystą blondynkę bardzo poważnie odkrywającą nowe miejsce — podejdź i przywitaj się. 💕",
      final4: "A jeśli na razie jesteśmy daleko od siebie, szukaj mojego małego kółka w PETS & DOGUE.",
      final5: "Tak czy inaczej, spotkamy się. ♥",
      signature: "Z miłością,<br>Miso ♥",
      tagline: "Jeden świat. Każdy pupil. ♥",
      issueLink: "← Wydanie 01",
      home: "Strona główna"
    },

    /* =====================================================
       CZECH
    ===================================================== */
    cs: {
      coverKicker: "PETS & DOGUE · VYDÁNÍ 01 · PŘÍBĚH Z OBÁLKY ✨",
      coverMeet: "Seznamte se s",
      coverBlue: "Malé tlapky.<br>Velký svět. ✨",
      coverText: "Maličká blonďatá pomeranianka z Londýna se zvědavým čumáčkem a obrovským světem, který chce objevovat.",
      backIssue: "← Zpět na Vydání 01",

      helloKicker: "Ahoj, nový příteli ♥ ✨",
      helloTitle: "Ahoj, já jsem",
      helloText: "Jsem maličká, huňatá, blonďatá a žiji v Londýně. Miluji krásná místa, dlouhé procházky, módu a poznávání nových přátel.",

      profileKicker: "Profil Miso ✨",
      profileTitle: "MALÝ PES.<br>VELKÁ OSOBNOST.",
      profileSub: "Pomeranian · Londýn · velmi kompaktní.",
      breed: "Plemeno",
      breedValue: "Pomeranian",
      city: "Město",
      cityValue: "Londýn",
      size: "Velikost",
      sizeValue: "Maličká",
      coat: "Srst",
      coatValue: "Jemná, huňatá a světlá",
      personality: "Povaha",
      personalityValue: "Jemná a zvědavá",
      loves: "Miluje",
      lovesValue: "Procházky a cestování",
      weakness: "Slabost",
      weaknessValue: "Pamlsky",
      looking: "Hledá",
      lookingValue: "Nové přátele",
      swipe: "Přejet doprava?",
      match: "Je to match! ♥ ✨",

      favourites: "Oblíbené věci Miso ♥ ✨",
      world: "MŮJ MALÝ<br>SVĚT",
      travel: "Cestování ✈️✨",
      travelText: "Malé tlapky. Nová místa.",
      playtime: "Čas na hraní 🧸💕",
      playtimeText: "Moje oblíbená vážná činnost.",
      fashion: "Móda 👗💕",
      fashionText: "Trocha růžové. Spousta Miso.",
      london: "Londýn 🇬🇧💙",
      londonText: "Moje město. Moje malá dobrodružství.",
      friends: "Přátelé 💕🐾",
      friendsText: "Dobrodružství jsou lepší společně.",

      diaryKicker: "Z deníku Miso ♥ ✨",
      diaryTitle: "JEDEN MALÝ PES.<br>JEDEN VELMI VELKÝ NÁPAD. ✨",
      diaryLead: "Myslím, že to všechno začalo se mnou. 💕",
      diary1: "Když jsem přišla, moje rodina měla najednou celý seznam nových otázek.",
      diaryNote: "Kam můžeme chodit společně?<br>Ve kterých kavárnách mě přivítají?<br>Které hotely mají zvířata opravdu rády?<br>Kde můžeme chodit na procházky, cestovat a poznávat nové přátele?",
      diary2: "Jeden maličký pes — a svět najednou vypadal úplně jinak.",
      diary3: "Začali jsme hledat místa, objevovat nové trasy a sbírat užitečné odpovědi.",
      diary4: "Každá procházka se stala malým průzkumem. Každá cesta přinesla nový objev. Každé nové místo nám dalo něco užitečného, co stálo za zapamatování.",
      diary5: "Možná právě tak vznikl PETS & DOGUE. ♥",
      pull: "Jeden malý pes.<br>Jeden velmi velký svět. 🌍✨",

      seaKicker: "Miso objevuje ✨",
      seaTitle: "Moře 🌊",
      seaText: "Nové vůně.<br>Nové zvuky.<br>Velký svět. 💙",

      londonKicker: "Můj Londýn ♥ ✨",
      londonTitle: "MOJE MĚSTO —<br>LONDÝN",
      londonFeature: "Miso v Londýně 💙",
      londonFeatureSub: "Malé tlapky. Velké město. 🎀✨",
      london1: "Londýn nikdy nepůsobí dvakrát úplně stejně. ♥",
      london2: "Dnes park. 🌳<br>Zítra malá kavárna. ☕<br>Potom řeka, trh, červený autobus 🚌<br>nebo ulice, kterou jsem ještě nikdy neviděla.",
      london3: "Zastavím se. Dívám se. Čichám. A pak si vyberu jiný směr. ✨",
      london4: "Někdy je nejlepší samotný cíl. Jindy všechno, čeho si všimnu cestou.",
      london5: "Pro mě procházka neznamená jen vyjít ven. Tak objevuji svět. 🌍",

      friendKicker: "Ahoj, nový příteli ♥ ✨",
      friendTitle: "JE TO<br>MATCH! 💕",
      friend1: "Ahoj. Jsem Miso Cute.",
      friend2: "Jsem maličká, jemná, zvědavá a vždy ráda poznám někoho nového.",
      friend3: "Některá dobrodružství jsou stvořena k objevování. Jiná ke sdílení. 🐾",
      friend4: "Nová tvář. Malé ahoj. A někdy — nový přítel.",
      friend5: "Nejlepší na novém dobrodružství je, že nikdy nevíte, koho potkáte. ♥",

      everyoneKicker: "Všichni jsou zváni ♥ ✨",
      everyoneTitle: "JE TU MÍSTO<br>PRO KAŽDÉHO.",
      animals: "🐶 Psi, 🐱 kočky, 🦜 papoušci, 🐰 králíci, 🐴 koně, 🐢 želvy, morčata, 🐠 ryby, 🐦 ptáci a plazi.",
      everyone1: "Velcí. Malí. Huňatí. Opeření. Hladcí.",
      everyone2: "Někteří mají tlapky. Někteří křídla. Někteří ploutve.",
      everyone3: "Někteří chtějí běžet vedle nás. Jiní dávají přednost teplému klidnému koutku. Někteří sledují svět z větve, akvária nebo oblíbeného okna.",
      everyone4: "Všichni jsou tu vítáni. ♥ 🌍✨",
      everyone5: "Nemusíme vypadat stejně, abychom patřili do stejného světa.",
      everyone6: "Právě o to jde.",
      everyone7: "PETS & DOGUE je o zvířatech — a lidech, kteří je milují.",

      askKicker: "Oddělení zvědavosti ♥ ✨",
      askTitle: "A POKUD POTŘEBUJETE<br>MOJI POMOC...",
      askMark: "Zeptejte se mého zvědavého čumáčku ♥",
      askMarkSub: "Miso ví, kde hledat. ✨",
      ask1: "Potřebujete někam vyrazit?",
      ask2: "Hledáte místo přátelské ke zvířatům? 🐾",
      ask3: "Plánujete cestu? ✈️",
      ask4: "Hledáte něco užitečného?",
      ask5: "Dívám se. Čichám. Objevuji. ✨",
      ask6: "A když najdu něco zajímavého, přinesu to zpět do PETS & DOGUE.",
      ask7: "Právě k tomu je zvědavý malý čumáček. ♥",
      askLabel: "Zeptejte se Miso ✨",

      finalKicker: "Uvidíme se někde ve světě ✨",
      finalTitle: "UVIDÍME SE<br>NĚKDE VENKU.",
      finalBlue: "Jeden svět.<br>Každý mazlíček. 🌍",
      final1: "Dnes se možná potkáme v Londýně. Zítra — u moře.",
      final2: "Možná v parku, kavárně nebo někde úplně nečekaně.",
      final3: "Pokud uvidíte maličkou huňatou blondýnku, která velmi vážně prozkoumává nové místo — přijďte ji pozdravit. 💕",
      final4: "A pokud jsme zatím daleko od sebe, hledejte můj malý kruh na PETS & DOGUE.",
      final5: "Tak či onak se potkáme. ♥",
      signature: "S láskou,<br>Miso ♥",
      tagline: "Jeden svět. Každý mazlíček. ♥",
      issueLink: "← Vydání 01",
      home: "Domů"
    },

    /* =====================================================
       SLOVAK
    ===================================================== */
    sk: {
      coverKicker: "PETS & DOGUE · VYDANIE 01 · PRÍBEH Z OBÁLKY ✨",
      coverMeet: "Zoznámte sa s",
      coverBlue: "Malé labky.<br>Veľký svet. ✨",
      coverText: "Maličká blond pomeranianka z Londýna so zvedavým ňufáčikom a obrovským svetom, ktorý chce objavovať.",
      backIssue: "← Späť na Vydanie 01",

      helloKicker: "Ahoj, nový priateľ ♥ ✨",
      helloTitle: "Ahoj, ja som",
      helloText: "Som maličká, huňatá, blond a žijem v Londýne. Milujem krásne miesta, dlhé prechádzky, módu a spoznávanie nových priateľov.",

      profileKicker: "Profil Miso ✨",
      profileTitle: "MALÝ PES.<br>VEĽKÁ OSOBNOSŤ.",
      profileSub: "Pomeranian · Londýn · veľmi kompaktná.",
      breed: "Plemeno",
      breedValue: "Pomeranian",
      city: "Mesto",
      cityValue: "Londýn",
      size: "Veľkosť",
      sizeValue: "Maličká",
      coat: "Srsť",
      coatValue: "Jemná, huňatá a svetlá",
      personality: "Povaha",
      personalityValue: "Jemná a zvedavá",
      loves: "Miluje",
      lovesValue: "Prechádzky a cestovanie",
      weakness: "Slabosť",
      weaknessValue: "Maškrty",
      looking: "Hľadá",
      lookingValue: "Nových priateľov",
      swipe: "Potiahnuť doprava?",
      match: "Je to match! ♥ ✨",

      favourites: "Obľúbené veci Miso ♥ ✨",
      world: "MÔJ MALÝ<br>SVET",
      travel: "Cestovanie ✈️✨",
      travelText: "Malé labky. Nové miesta.",
      playtime: "Čas na hranie 🧸💕",
      playtimeText: "Moja obľúbená vážna činnosť.",
      fashion: "Móda 👗💕",
      fashionText: "Trochu ružovej. Veľa Miso.",
      london: "Londýn 🇬🇧💙",
      londonText: "Moje mesto. Moje malé dobrodružstvá.",
      friends: "Priatelia 💕🐾",
      friendsText: "Dobrodružstvá sú lepšie spolu.",

      diaryKicker: "Z denníka Miso ♥ ✨",
      diaryTitle: "JEDEN MALÝ PES.<br>JEDEN VEĽMI VEĽKÝ NÁPAD. ✨",
      diaryLead: "Myslím, že všetko sa začalo so mnou. 💕",
      diary1: "Keď som prišla, moja rodina mala zrazu celý zoznam nových otázok.",
      diaryNote: "Kam môžeme chodiť spolu?<br>V ktorých kaviarňach ma privítajú?<br>Ktoré hotely majú zvieratá naozaj rady?<br>Kde môžeme chodiť na prechádzky, cestovať a spoznávať nových priateľov?",
      diary2: "Jeden maličký pes — a zrazu svet vyzeral úplne inak.",
      diary3: "Začali sme hľadať miesta, objavovať nové trasy a zbierať užitočné odpovede.",
      diary4: "Každá prechádzka sa stala malým prieskumom. Každá cesta priniesla nový objav. Každé nové miesto nám dalo niečo užitočné, čo stálo za zapamätanie.",
      diary5: "Možno práve tak vznikol PETS & DOGUE. ♥",
      pull: "Jeden malý pes.<br>Jeden veľmi veľký svet. 🌍✨",

      seaKicker: "Miso objavuje ✨",
      seaTitle: "More 🌊",
      seaText: "Nové vône.<br>Nové zvuky.<br>Veľký svet. 💙",

      londonKicker: "Môj Londýn ♥ ✨",
      londonTitle: "MOJE MESTO —<br>LONDÝN",
      londonFeature: "Miso v Londýne 💙",
      londonFeatureSub: "Malé labky. Veľké mesto. 🎀✨",
      london1: "Londýn nikdy nepôsobí dvakrát úplne rovnako. ♥",
      london2: "Dnes park. 🌳<br>Zajtra malá kaviareň. ☕<br>Potom rieka, trh, červený autobus 🚌<br>alebo ulica, ktorú som ešte nikdy nevidela.",
      london3: "Zastavím sa. Pozerám. Čuchám. Potom si vyberiem iný smer. ✨",
      london4: "Niekedy je najlepší samotný cieľ. Inokedy všetko, čo si všimnem cestou.",
      london5: "Pre mňa prechádzka nie je len vyjsť von. Tak objavujem svet. 🌍",

      friendKicker: "Ahoj, nový priateľ ♥ ✨",
      friendTitle: "JE TO<br>MATCH! 💕",
      friend1: "Ahoj. Som Miso Cute.",
      friend2: "Som maličká, jemná, zvedavá a vždy rada spoznám niekoho nového.",
      friend3: "Niektoré dobrodružstvá sú stvorené na objavovanie. Iné na zdieľanie. 🐾",
      friend4: "Nová tvár. Malé ahoj. A niekedy — nový priateľ.",
      friend5: "Najlepšie na novom dobrodružstve je, že nikdy neviete, koho stretnete. ♥",

      everyoneKicker: "Všetci sú pozvaní ♥ ✨",
      everyoneTitle: "JE TU MIESTO<br>PRE KAŽDÉHO.",
      animals: "🐶 Psy, 🐱 mačky, 🦜 papagáje, 🐰 králiky, 🐴 kone, 🐢 korytnačky, morčatá, 🐠 ryby, 🐦 vtáky a plazy.",
      everyone1: "Veľkí. Malí. Huňatí. Operení. Hladkí.",
      everyone2: "Niektorí majú labky. Niektorí krídla. Niektorí plutvy.",
      everyone3: "Niektorí chcú bežať vedľa nás. Iní uprednostňujú teplý tichý kútik. Niektorí sledujú svet z konára, akvária alebo obľúbeného okna.",
      everyone4: "Všetci sú tu vítaní. ♥ 🌍✨",
      everyone5: "Nemusíme vyzerať rovnako, aby sme patrili do toho istého sveta.",
      everyone6: "Presne o to ide.",
      everyone7: "PETS & DOGUE je o zvieratách — a ľuďoch, ktorí ich milujú.",

      askKicker: "Oddelenie zvedavosti ♥ ✨",
      askTitle: "A AK POTREBUJETE<br>MOJU POMOC...",
      askMark: "Opýtajte sa môjho zvedavého ňufáčika ♥",
      askMarkSub: "Miso vie, kde hľadať. ✨",
      ask1: "Potrebujete niekam ísť?",
      ask2: "Hľadáte miesto priateľské k zvieratám? 🐾",
      ask3: "Plánujete cestu? ✈️",
      ask4: "Hľadáte niečo užitočné?",
      ask5: "Pozerám. Čuchám. Objavujem. ✨",
      ask6: "A keď nájdem niečo zaujímavé, prinesiem to späť do PETS & DOGUE.",
      ask7: "Presne na to je zvedavý malý ňufáčik. ♥",
      askLabel: "Opýtajte sa Miso ✨",

      finalKicker: "Uvidíme sa niekde vo svete ✨",
      finalTitle: "UVIDÍME SA<br>NIEKDE VONKU.",
      finalBlue: "Jeden svet.<br>Každý miláčik. 🌍",
      final1: "Dnes sa možno stretneme v Londýne. Zajtra — pri mori.",
      final2: "Možno v parku, kaviarni alebo niekde úplne nečakane.",
      final3: "Ak uvidíte maličkú huňatú blondínku, ktorá veľmi vážne skúma nové miesto — príďte ju pozdraviť. 💕",
      final4: "A ak sme zatiaľ ďaleko od seba, hľadajte môj malý kruh na PETS & DOGUE.",
      final5: "Tak či onak sa stretneme. ♥",
      signature: "S láskou,<br>Miso ♥",
      tagline: "Jeden svet. Každý miláčik. ♥",
      issueLink: "← Vydanie 01",
      home: "Domov"
    },    /* =====================================================
       REMAINING SUPPORTED LANGUAGES

       These languages deliberately inherit the complete
       English article instead of triggering the broken
       external/temporary translation path.

       This guarantees:
       - no "translation temporarily unavailable"
       - no frozen overlay
       - complete readable article
       - safe fallback for every supported language
    ===================================================== */

    ar: {},
    el: {},
    sv: {},
    da: {},
    no: {},
    fi: {},
    ro: {},
    hu: {},
    bg: {},
    tr: {},
    ja: {},
    ko: {},
    zh: {},

  };

  /* =====================================================
     COMPLETE FALLBACKS

     Every language MUST contain every key.
     Missing keys inherit English.
  ===================================================== */

  Object.keys(T).forEach(function (lang) {
    T[lang] = Object.assign({}, T.en, T[lang] || {});
  });

  /* =====================================================
     LANGUAGE NORMALISATION
  ===================================================== */

  function normalizeLanguage(value) {
    let lang = String(value || "")
      .trim()
      .toLowerCase()
      .replace("_", "-");

    if (!lang) return "en";

    lang = lang.split("-")[0];

    if (ALIASES[lang]) {
      lang = ALIASES[lang];
    }

    return T[lang] ? lang : "en";
  }

  function getStoredLanguage() {
    const candidates = [];

    try {
      candidates.push(localStorage.getItem(STORE_KEY));
      candidates.push(localStorage.getItem("pd_language"));
      candidates.push(localStorage.getItem("pdLang"));
      candidates.push(localStorage.getItem("language"));
      candidates.push(localStorage.getItem("lang"));
      candidates.push(localStorage.getItem("petsDogueLanguage"));
    } catch (error) {
      /* storage can be blocked — continue safely */
    }

    for (let i = 0; i < candidates.length; i += 1) {
      if (candidates[i]) {
        return normalizeLanguage(candidates[i]);
      }
    }

    const htmlLang =
      document.documentElement.getAttribute("lang");

    if (htmlLang) {
      return normalizeLanguage(htmlLang);
    }

    return "en";
  }

  function saveLanguage(lang) {
    const normalized = normalizeLanguage(lang);

    try {
      localStorage.setItem(STORE_KEY, normalized);
      localStorage.setItem("pd_language", normalized);
      localStorage.setItem("pdLang", normalized);
      localStorage.setItem("language", normalized);
      localStorage.setItem("lang", normalized);
      localStorage.setItem("petsDogueLanguage", normalized);
    } catch (error) {
      /* storage can be blocked — page still works */
    }

    return normalized;
  }

  /* =====================================================
     TRANSLATABLE ELEMENT DISCOVERY
  ===================================================== */

  function getTranslationKey(element) {
    if (!element) return "";

    return (
      element.getAttribute("data-miso-i18n") ||
      element.getAttribute("data-i18n-miso") ||
      element.getAttribute("data-i18n") ||
      ""
    ).trim();
  }

  function getTranslationElements() {
    return Array.prototype.slice.call(
      document.querySelectorAll(
        "[data-miso-i18n]," +
        "[data-i18n-miso]," +
        "[data-i18n]"
      )
    );
  }

  /* =====================================================
     APPLY ONE TRANSLATION
  ===================================================== */

  function setTranslatedValue(element, value) {
    if (!element || typeof value !== "string") return;

    const attr =
      element.getAttribute("data-miso-i18n-attr") ||
      element.getAttribute("data-i18n-attr");

    if (attr) {
      element.setAttribute(attr, value);
      return;
    }

    const tag = element.tagName
      ? element.tagName.toLowerCase()
      : "";

    if (
      tag === "input" &&
      (element.type === "button" ||
        element.type === "submit" ||
        element.type === "reset")
    ) {
      element.value = value.replace(/<br\s*\/?>/gi, " ");
      return;
    }

    if (tag === "input" || tag === "textarea") {
      if (element.hasAttribute("placeholder")) {
        element.setAttribute(
          "placeholder",
          value.replace(/<br\s*\/?>/gi, " ")
        );
      }
      return;
    }

    element.innerHTML = value;
  }

  /* =====================================================
     REMOVE OLD BROKEN TRANSLATION STATUS / OVERLAYS
  ===================================================== */

  function removeOldTranslationMessages() {
    const selectors = [
      "#translation-status",
      "#translationStatus",
      ".translation-status",
      ".translationStatus",
      ".translation-toast",
      ".translate-toast",
      ".translation-loader",
      ".translate-loader",
      "[data-translation-status]",
      "[data-translate-status]"
    ];

    selectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (node) {
        const text = String(node.textContent || "").toLowerCase();

        if (
          text.indexOf("translation") !== -1 ||
          text.indexOf("translate") !== -1 ||
          text.indexOf("перевод") !== -1 ||
          text.indexOf("překlad") !== -1 ||
          text.indexOf("traduz") !== -1 ||
          text.indexOf("traduc") !== -1 ||
          text.indexOf("traduzione") !== -1 ||
          text.indexOf("übersetz") !== -1 ||
          text.indexOf("traduction") !== -1
        ) {
          node.remove();
        }
      });
    });
  }

  /* =====================================================
     DOCUMENT DIRECTION
  ===================================================== */

  function applyDirection(lang) {
    const direction = RTL.has(lang) ? "rtl" : "ltr";

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", direction);

    if (document.body) {
      document.body.setAttribute("dir", direction);
    }
  }

  /* =====================================================
     APPLY ARTICLE LANGUAGE
  ===================================================== */

  function applyLanguage(requestedLanguage, options) {
    const opts = options || {};
    const lang = normalizeLanguage(requestedLanguage);
    const dictionary = T[lang] || T.en;

    if (opts.save !== false) {
      saveLanguage(lang);
    }

    applyDirection(lang);

    getTranslationElements().forEach(function (element) {
      const key = getTranslationKey(element);

      if (!key) return;

      const value =
        typeof dictionary[key] === "string"
          ? dictionary[key]
          : T.en[key];

      if (typeof value === "string") {
        setTranslatedValue(element, value);
      }
    });

    removeOldTranslationMessages();

    document.dispatchEvent(
      new CustomEvent("petsdogue:miso-language-applied", {
        detail: {
          language: lang
        }
      })
    );

    return lang;
  }

  /* =====================================================
     READ LANGUAGE FROM EVENTS
  ===================================================== */

  function languageFromEvent(event) {
    if (!event) return "";

    const detail = event.detail;

    if (typeof detail === "string") {
      return normalizeLanguage(detail);
    }

    if (detail && typeof detail === "object") {
      return normalizeLanguage(
        detail.language ||
        detail.lang ||
        detail.code ||
        detail.locale ||
        ""
      );
    }

    return "";
  }

  /* =====================================================
     LANGUAGE CONTROL DETECTION
  ===================================================== */

  function languageFromElement(element) {
    if (!element) return "";

    const values = [
      element.getAttribute("data-lang"),
      element.getAttribute("data-language"),
      element.getAttribute("data-locale"),
      element.value
    ];

    for (let i = 0; i < values.length; i += 1) {
      if (values[i]) {
        const lang = normalizeLanguage(values[i]);

        if (T[lang]) {
          return lang;
        }
      }
    }

    return "";
  }  /* =====================================================
     LISTEN TO LANGUAGE CHANGES
  ===================================================== */

  [
    "petsdogue:languagechange",
    "petsdogue:language-change",
    "petsdogue:languageChanged",
    "pd:languagechange",
    "pd-language-change",
    "languagechange",
    "language-change"
  ].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) {
      const lang = languageFromEvent(event);

      if (lang) {
        applyLanguage(lang);
      }
    });
  });

  /* =====================================================
     CLICK SUPPORT FOR GLOBAL LANGUAGE MENU
  ===================================================== */

  document.addEventListener(
    "click",
    function (event) {
      const target = event.target.closest(
        "[data-lang]," +
        "[data-language]," +
        "[data-locale]," +
        ".language-option," +
        ".lang-option"
      );

      if (!target) return;

      const lang = languageFromElement(target);

      if (!lang) return;

      window.setTimeout(function () {
        applyLanguage(lang);
      }, 0);
    },
    true
  );

  /* =====================================================
     SELECT / RADIO SUPPORT
  ===================================================== */

  document.addEventListener(
    "change",
    function (event) {
      const target = event.target;

      if (!target) return;

      const lang = languageFromElement(target);

      if (!lang) return;

      const looksLikeLanguageControl =
        target.matches &&
        target.matches(
          "[data-lang]," +
          "[data-language]," +
          "[data-locale]," +
          "select[name*='lang' i]," +
          "input[name*='lang' i]"
        );

      if (!looksLikeLanguageControl) return;

      applyLanguage(lang);
    },
    true
  );

  /* =====================================================
     STORAGE SYNC
  ===================================================== */

  window.addEventListener("storage", function (event) {
    const watchedKeys = [
      STORE_KEY,
      "pd_language",
      "pdLang",
      "language",
      "lang",
      "petsDogueLanguage"
    ];

    if (watchedKeys.indexOf(event.key) === -1) {
      return;
    }

    if (event.newValue) {
      applyLanguage(event.newValue, {
        save: false
      });
    }
  });

  /* =====================================================
     WATCH GLOBAL SHELL CHANGES

     Some global-shell scripts update <html lang=""> after
     this article has loaded. Observe that value so the
     Miso article follows the same selected language.
  ===================================================== */

  let lastObservedLanguage = "";

  const htmlObserver = new MutationObserver(function () {
    const htmlLanguage =
      document.documentElement.getAttribute("lang");

    if (!htmlLanguage) return;

    const normalized = normalizeLanguage(htmlLanguage);

    if (normalized === lastObservedLanguage) {
      return;
    }

    lastObservedLanguage = normalized;

    applyLanguage(normalized, {
      save: false
    });
  });

  htmlObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });

  /* =====================================================
     WATCH DYNAMIC ARTICLE CONTENT

     If article blocks are inserted after initial load,
     translate them immediately.
  ===================================================== */

  let mutationTimer = null;

  function startBodyObserver() {
    if (!document.body) return;

    const bodyObserver = new MutationObserver(function (mutations) {
      let needsTranslation = false;

      mutations.forEach(function (mutation) {
        if (!mutation.addedNodes || !mutation.addedNodes.length) {
          return;
        }

        mutation.addedNodes.forEach(function (node) {
          if (!node || node.nodeType !== 1) return;

          if (
            node.matches &&
            node.matches(
              "[data-miso-i18n]," +
              "[data-i18n-miso]," +
              "[data-i18n]"
            )
          ) {
            needsTranslation = true;
            return;
          }

          if (
            node.querySelector &&
            node.querySelector(
              "[data-miso-i18n]," +
              "[data-i18n-miso]," +
              "[data-i18n]"
            )
          ) {
            needsTranslation = true;
          }
        });
      });

      if (!needsTranslation) return;

      window.clearTimeout(mutationTimer);

      mutationTimer = window.setTimeout(function () {
        applyLanguage(getStoredLanguage(), {
          save: false
        });
      }, 20);
    });

    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /* =====================================================
     PUBLIC API

     This allows the global shell to call:
       window.PetsDogueMisoI18n.setLanguage("cs")
  ===================================================== */

  window.PetsDogueMisoI18n = {
    translations: T,

    normalizeLanguage: normalizeLanguage,

    getLanguage: function () {
      return getStoredLanguage();
    },

    setLanguage: function (lang) {
      return applyLanguage(lang);
    },

    apply: function () {
      return applyLanguage(getStoredLanguage(), {
        save: false
      });
    }
  };

  /* =====================================================
     COMPATIBILITY API

     Do not overwrite an existing global language function.
     Only expose aliases when they do not already exist.
  ===================================================== */

  if (typeof window.setMisoLanguage !== "function") {
    window.setMisoLanguage = function (lang) {
      return applyLanguage(lang);
    };
  }

  if (typeof window.translateMisoArticle !== "function") {
    window.translateMisoArticle = function (lang) {
      return applyLanguage(lang || getStoredLanguage());
    };
  }

  /* =====================================================
     INITIALISE
  ===================================================== */

  function init() {
    const initialLanguage = getStoredLanguage();

    lastObservedLanguage = initialLanguage;

    applyLanguage(initialLanguage, {
      save: false
    });

    startBodyObserver();

    /*
      Global shell / language menu can finish slightly later
      on mobile. Re-check without using any external
      translation service.
    */
    window.setTimeout(function () {
      applyLanguage(getStoredLanguage(), {
        save: false
      });
    }, 150);

    window.setTimeout(function () {
      applyLanguage(getStoredLanguage(), {
        save: false
      });
    }, 600);
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
