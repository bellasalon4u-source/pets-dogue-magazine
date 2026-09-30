/* =========================================================
   PETS & DOGUE — ISSUE 01 — MISO
   STATIC / FREE MULTILINGUAL TRANSLATIONS
   Part 1 of 2
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
      breed: "Порода", breedValue: "Померанський шпіц",
      city: "Місто", cityValue: "Лондон",
      size: "Розмір", sizeValue: "Крихітна",
      coat: "Шерсть", coatValue: "М’яка, пухнаста, білява",
      personality: "Характер", personalityValue: "Ніжна й допитлива",
      loves: "Любить", lovesValue: "Прогулянки й подорожі",
      weakness: "Слабкість", weaknessValue: "Смаколики",
      looking: "Шукає", lookingValue: "Нових друзів",
      swipe: "Свайпнути вправо?",
      match: "Це метч! ♥ ✨",

      favourites: "Улюблене Miso ♥ ✨",
      world: "МІЙ МАЛЕНЬКИЙ<br>СВІТ",
      travel: "Подорожі ✈️✨", travelText: "Маленькі лапки. Нові місця.",
      playtime: "Час гри 🧸💕", playtimeText: "Моя улюблена серйозна справа.",
      fashion: "Мода 👗💕", fashionText: "Трохи рожевого. Дуже багато Miso.",
      london: "Лондон 🇬🇧💙", londonText: "Моє місто. Мої маленькі пригоди.",
      friends: "Друзі 💕🐾", friendsText: "Разом пригоди кращі.",

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
      breed: "Порода", breedValue: "Померанский шпиц",
      city: "Город", cityValue: "Лондон",
      size: "Размер", sizeValue: "Крошечная",
      coat: "Шерсть", coatValue: "Мягкая, пушистая, светлая",
      personality: "Характер", personalityValue: "Нежная и любопытная",
      loves: "Любит", lovesValue: "Прогулки и путешествия",
      weakness: "Слабость", weaknessValue: "Вкусняшки",
      looking: "Ищет", lookingValue: "Новых друзей",
      swipe: "Свайпнуть вправо?",
      match: "Это мэтч! ♥ ✨",

      favourites: "Любимое Miso ♥ ✨",
      world: "МОЙ МАЛЕНЬКИЙ<br>МИР",
      travel: "Путешествия ✈️✨", travelText: "Маленькие лапки. Новые места.",
      playtime: "Время играть 🧸💕", playtimeText: "Моё любимое серьёзное дело.",
      fashion: "Мода 👗💕", fashionText: "Немного розового. Очень много Miso.",
      london: "Лондон 🇬🇧💙", londonText: "Мой город. Мои маленькие приключения.",
      friends: "Друзья 💕🐾", friendsText: "Вместе приключения лучше.",

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
      london4: "Иногда самое лучшее — место назначения. А иногда — всё, что я замечаю по дороге.",
      london5: "Для меня прогулка — это не просто выйти на улицу. Так я открываю мир. 🌍",

      friendKicker: "Привет, новый друг ♥ ✨",
      friendTitle: "ЭТО<br>МЭТЧ! 💕",
      friend1: "Привет. Я Miso Cute.",
      friend2: "Я маленькая, нежная, любопытная и всегда рада познакомиться с кем-то новым.",
      friend3: "Одни приключения созданы для исследований. Другие — чтобы разделить их с кем-то. 🐾",
      friend4: "Новое лицо. Маленькое «привет». А иногда — новый друг.",
      friend5: "Самое лучшее в новом приключении — никогда не знаешь, кого встретишь. ♥",

      everyoneKicker: "Приглашены все ♥ ✨",
      everyoneTitle: "ЗДЕСЬ ЕСТЬ МЕСТО<br>ДЛЯ КАЖДОГО.",
      animals: "🐶 Собаки, 🐱 кошки, 🦜 попугаи, 🐰 кролики, 🐴 лошади, 🐢 черепахи, морские свинки, 🐠 рыбы, 🐦 птицы и рептилии.",
      everyone1: "Большие. Маленькие. Пушистые. Пернатые. Гладкие.",
      everyone2: "У кого-то лапы. У кого-то крылья. У кого-то плавники.",
      everyone3: "Кто-то хочет бежать рядом с нами. Кто-то предпочитает тёплый тихий уголок. А кто-то наблюдает за всем миром с ветки, из аквариума или любимого окна.",
      everyone4: "Здесь рады каждому. ♥ 🌍✨",
      everyone5: "Нам не нужно выглядеть одинаково, чтобы принадлежать одному миру.",
      everyone6: "Именно в этом весь смысл.",
      everyone7: "PETS & DOGUE — о животных и людях, которые их любят.",

      askKicker: "Отдел любопытства ♥ ✨",
      askTitle: "А ЕСЛИ ТЕБЕ<br>НУЖНА МОЯ ПОМОЩЬ...",
      askMark: "Спроси мой любопытный носик ♥",
      askMarkSub: "Miso знает, где искать. ✨",
      ask1: "Нужно куда-нибудь пойти?",
      ask2: "Ищешь pet-friendly место? 🐾",
      ask3: "Планируешь поездку? ✈️",
      ask4: "Ищешь что-нибудь полезное?",
      ask5: "Я смотрю. Нюхаю. Исследую. ✨",
      ask6: "А когда нахожу что-нибудь интересное, приношу это обратно в PETS & DOGUE.",
      ask7: "Именно для этого и нужен любопытный маленький носик. ♥",
      askLabel: "Спроси Miso ✨",

      finalKicker: "Увидимся где-нибудь в мире ✨",
      finalTitle: "УВИДИМСЯ<br>ГДЕ-НИБУДЬ ТАМ.",
      finalBlue: "Один мир.<br>Каждый питомец. 🌍",
      final1: "Сегодня мы можем встретиться в Лондоне. Завтра — у моря.",
      final2: "Может быть, в парке, кафе или где-нибудь совсем неожиданно.",
      final3: "Если увидишь маленькую пушистую блондинку, которая очень серьёзно исследует новое место, — подойди и поздоровайся. 💕",
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
      coverText: "Une minuscule Poméranienne blonde de Londres, avec un petit nez curieux et un immense monde à découvrir.",
      backIssue: "← Retour au Numéro 01",

      helloKicker: "Bonjour, nouvel ami ♥ ✨",
      helloTitle: "Bonjour, je suis",
      helloText: "Petite, duveteuse, blonde et londonienne. J’aime les beaux endroits, les longues promenades, la mode et rencontrer de nouveaux amis.",

      profileKicker: "Le profil de Miso ✨",
      profileTitle: "PETIT CHIEN.<br>GRANDE PERSONNALITÉ.",
      profileSub: "Poméranienne · Londres · très compacte.",
      breed: "Race", breedValue: "Poméranien",
      city: "Ville", cityValue: "Londres",
      size: "Taille", sizeValue: "Minuscule",
      coat: "Pelage", coatValue: "Doux, duveteux et blond",
      personality: "Personnalité", personalityValue: "Douce et curieuse",
      loves: "Adore", lovesValue: "Promenades et voyages",
      weakness: "Faiblesse", weaknessValue: "Les friandises",
      looking: "Recherche", lookingValue: "De nouveaux amis",
      swipe: "Swipe à droite ?",
      match: "C’est un match ! ♥ ✨",

      favourites: "Les favoris de Miso ♥ ✨",
      world: "MON PETIT<br>MONDE",
      travel: "Voyages ✈️✨", travelText: "Petites pattes. Nouveaux endroits.",
      playtime: "Jeux 🧸💕", playtimeText: "Mon activité sérieuse préférée.",
      fashion: "Mode 👗💕", fashionText: "Un peu de rose. Beaucoup de Miso.",
      london: "Londres 🇬🇧💙", londonText: "Ma ville. Mes petites aventures.",
      friends: "Amis 💕🐾", friendsText: "Les aventures sont meilleures ensemble.",

      diaryKicker: "Le journal de Miso ♥ ✨",
      diaryTitle: "UN PETIT CHIEN.<br>UNE TRÈS GRANDE IDÉE. ✨",
      diaryLead: "Je crois que tout a commencé avec moi. 💕",
      diary1: "Quand je suis arrivée, ma famille a soudain eu toute une nouvelle liste de questions.",
      diaryNote: "Où pouvons-nous aller ensemble ?<br>Quels cafés m’accueilleront ?<br>Quels hôtels aiment vraiment les animaux ?<br>Où pouvons-nous nous promener, voyager et rencontrer de nouveaux amis ?",
      diary2: "Un tout petit chien — et soudain le monde semblait complètement différent.",
      diary3: "Nous avons commencé à chercher des endroits, découvrir de nouveaux itinéraires et recueillir des réponses utiles.",
      diary4: "Chaque promenade est devenue une petite enquête. Chaque voyage apportait une nouvelle découverte. Chaque nouvel endroit nous donnait quelque chose d’utile à retenir.",
      diary5: "C’était peut-être le début de PETS & DOGUE. ♥",
      pull: "Un petit chien.<br>Un très grand monde. 🌍✨",

      seaKicker: "Miso explore ✨",
      seaTitle: "La<br>mer 🌊",
      seaText: "Nouvelles odeurs.<br>Nouveaux sons.<br>Grand monde. 💙",

      londonKicker: "Mon Londres ♥ ✨",
      londonTitle: "MA VILLE —<br>LONDRES",
      londonFeature: "Miso à Londres 💙",
      londonFeatureSub: "Petites pattes. Grande ville. 🎀✨",
      london1: "Londres ne semble jamais exactement identique deux fois. ♥",
      london2: "Un parc aujourd’hui. 🌳<br>Un petit café demain. ☕<br>Puis la rivière, un marché, un bus rouge 🚌<br>ou une rue que je n’ai encore jamais vue.",
      london3: "Je m’arrête. Je regarde. Je renifle. Puis je choisis une autre direction. ✨",
      london4: "Parfois, le meilleur est la destination. Parfois, c’est tout ce que je remarque en chemin.",
      london5: "Pour moi, une promenade n’est pas simplement sortir. C’est ainsi que je découvre le monde. 🌍",

      friendKicker: "Bonjour, nouvel ami ♥ ✨",
      friendTitle: "C’EST UN<br>MATCH ! 💕",
      friend1: "Bonjour. Je suis Miso Cute.",
      friend2: "Je suis petite, douce, curieuse et toujours intéressée par de nouvelles rencontres.",
      friend3: "Certaines aventures sont faites pour explorer. D’autres pour être partagées. 🐾",
      friend4: "Un nouveau visage. Un petit bonjour. Et parfois — un nouvel ami.",
      friend5: "Le meilleur d’une nouvelle aventure, c’est de ne jamais savoir qui l’on va rencontrer. ♥",

      everyoneKicker: "Tout le monde est invité ♥ ✨",
      everyoneTitle: "IL Y A DE LA PLACE<br>POUR TOUT LE MONDE.",
      animals: "🐶 Chiens, 🐱 chats, 🦜 perroquets, 🐰 lapins, 🐴 chevaux, 🐢 tortues, cochons d’Inde, 🐠 poissons, 🐦 oiseaux et reptiles.",
      everyone1: "Grands. Petits. Duveteux. À plumes. Lisses.",
      everyone2: "Certains ont des pattes. Certains ont des ailes. Certains ont des nageoires.",
      everyone3: "Certains veulent courir à nos côtés. D’autres préfèrent un coin chaud et tranquille. Certains observent le monde entier depuis une branche, un aquarium ou leur fenêtre préférée.",
      everyone4: "Tout le monde est bienvenu ici. ♥ 🌍✨",
      everyone5: "Nous n’avons pas besoin de nous ressembler pour appartenir au même monde.",
      everyone6: "C’est exactement l’idée.",
      everyone7: "PETS & DOGUE parle des animaux — et des personnes qui les aiment.",

      askKicker: "Département curiosité ♥ ✨",
      askTitle: "ET SI VOUS<br>AVEZ BESOIN DE MOI...",
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
      finalBlue: "Un monde.<br>Chaque animal. 🌍",
      final1: "Aujourd’hui, nous pourrions nous rencontrer à Londres. Demain — au bord de la mer.",
      final2: "Peut-être dans un parc, un café ou quelque part de totalement inattendu.",
      final3: "Si vous voyez une minuscule blonde duveteuse explorer très sérieusement un nouvel endroit — venez dire bonjour. 💕",
      final4: "Et si nous sommes encore loin l’un de l’autre, cherchez mon petit cercle sur PETS & DOGUE.",
      final5: "D’une manière ou d’une autre, nous nous rencontrerons. ♥",
      signature: "Avec amour,<br>Miso ♥",
      tagline: "Un monde. Chaque animal. ♥",
      issueLink: "← Numéro 01",
      home: "Accueil"
    },

    /* =====================================================
       GERMAN
    ===================================================== */
    de: {
      coverKicker: "PETS & DOGUE · AUSGABE 01 · COVERSTORY ✨",
      coverMeet: "Das ist",
      coverBlue: "Kleine Pfoten.<br>Große Welt. ✨",
      coverText: "Eine winzige blonde Pomeranian-Dame aus London mit neugieriger Nase und einer sehr großen Welt, die es zu entdecken gilt.",
      backIssue: "← Zurück zu Ausgabe 01",

      helloKicker: "Hallo, neuer Freund ♥ ✨",
      helloTitle: "Hallo, ich bin",
      helloText: "Winzig, flauschig, blond und in London zu Hause. Ich liebe schöne Orte, lange Spaziergänge, Mode und neue Freunde.",

      profileKicker: "Das Miso-Profil ✨",
      profileTitle: "KLEINER HUND.<br>GROSSE PERSÖNLICHKEIT.",
      profileSub: "Pomeranian · London · sehr kompakt.",
      breed: "Rasse", breedValue: "Pomeranian",
      city: "Stadt", cityValue: "London",
      size: "Größe", sizeValue: "Winzig",
      coat: "Fell", coatValue: "Weich, flauschig und blond",
      personality: "Persönlichkeit", personalityValue: "Sanft & neugierig",
      loves: "Liebt", lovesValue: "Spaziergänge & Reisen",
      weakness: "Schwäche", weaknessValue: "Leckerlis",
      looking: "Sucht", lookingValue: "Neue Freunde",
      swipe: "Nach rechts wischen?",
      match: "Es ist ein Match! ♥ ✨",

      favourites: "Misos Favoriten ♥ ✨",
      world: "MEINE KLEINE<br>WELT",
      travel: "Reisen ✈️✨", travelText: "Kleine Pfoten. Neue Orte.",
      playtime: "Spielzeit 🧸💕", playtimeText: "Meine liebste ernste Angelegenheit.",
      fashion: "Mode 👗💕", fashionText: "Ein bisschen Pink. Sehr viel Miso.",
      london: "London 🇬🇧💙", londonText: "Meine Stadt. Meine kleinen Abenteuer.",
      friends: "Freunde 💕🐾", friendsText: "Gemeinsam sind Abenteuer schöner.",

      diaryKicker: "Aus Misos Tagebuch ♥ ✨",
      diaryTitle: "EIN KLEINER HUND.<br>EINE SEHR GROSSE IDEE. ✨",
      diaryLead: "Ich glaube, alles begann mit mir. 💕",
      diary1: "Als ich ankam, hatte meine Familie plötzlich eine ganz neue Liste von Fragen.",
      diaryNote: "Wohin können wir gemeinsam gehen?<br>Welche Cafés heißen mich willkommen?<br>Welche Hotels lieben Tiere wirklich?<br>Wo können wir spazieren, reisen und neue Freunde treffen?",
      diary2: "Ein winziger Hund — und plötzlich sah die Welt völlig anders aus.",
      diary3: "Wir begannen Orte zu suchen, neue Wege zu entdecken und hilfreiche Antworten zu sammeln.",
      diary4: "Jeder Spaziergang wurde zu einer kleinen Untersuchung. Jede Reise brachte eine neue Entdeckung. Jeder neue Ort gab uns etwas Nützliches, das wir uns merken konnten.",
      diary5: "Vielleicht war das der Anfang von PETS & DOGUE. ♥",
      pull: "Ein kleiner Hund.<br>Eine sehr große Welt. 🌍✨",

      seaKicker: "Miso erkundet ✨",
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
      friendTitle: "ES IST EIN<br>MATCH! 💕",
      friend1: "Hallo. Ich bin Miso Cute.",
      friend2: "Ich bin winzig, sanft, neugierig und immer daran interessiert, jemanden Neues kennenzulernen.",
      friend3: "Manche Abenteuer sind zum Entdecken da. Andere zum Teilen. 🐾",
      friend4: "Ein neues Gesicht. Ein kleines Hallo. Und manchmal — ein neuer Freund.",
      friend5: "Das Schönste an einem neuen Abenteuer ist, nie zu wissen, wen man treffen könnte. ♥",

      everyoneKicker: "Alle sind eingeladen ♥ ✨",
      everyoneTitle: "HIER IST PLATZ<br>FÜR ALLE.",
      animals: "🐶 Hunde, 🐱 Katzen, 🦜 Papageien, 🐰 Kaninchen, 🐴 Pferde, 🐢 Schildkröten, Meerschweinchen, 🐠 Fische, 🐦 Vögel und Reptilien.",
      everyone1: "Groß. Klein. Flauschig. Gefiedert. Glatt.",
      everyone2: "Manche haben Pfoten. Manche Flügel. Manche Flossen.",
      everyone3: "Manche wollen neben uns laufen. Manche bevorzugen eine warme, ruhige Ecke. Manche beobachten die ganze Welt von einem Ast, einem Aquarium oder ihrem Lieblingsfenster aus.",
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
      ask5: "Ich schaue. Ich schnuppere. Ich erkunde. ✨",
      ask6: "Und wenn ich etwas Interessantes finde, bringe ich es zurück zu PETS & DOGUE.",
      ask7: "Dafür ist eine neugierige kleine Nase da. ♥",
      askLabel: "Frag Miso ✨",

      finalKicker: "Wir sehen uns irgendwo auf der Welt ✨",
      finalTitle: "WIR SEHEN UNS<br>DA DRAUSSEN.",
      finalBlue: "Eine Welt.<br>Jedes Tier. 🌍",
      final1: "Heute treffen wir uns vielleicht in London. Morgen — am Meer.",
      final2: "Vielleicht in einem Park, einem Café oder irgendwo völlig Unerwartetem.",
      final3: "Wenn du eine winzige flauschige Blondine siehst, die sehr ernst einen neuen Ort erkundet — komm und sag Hallo. 💕",
      final4: "Und wenn wir im Moment weit voneinander entfernt sind, such nach meinem kleinen Kreis bei PETS & DOGUE.",
      final5: "So oder so werden wir uns treffen. ♥",
      signature: "Mit Liebe,<br>Miso ♥",
      tagline: "Eine Welt. Jedes Tier. ♥",
      issueLink: "← Ausgabe 01",
      home: "Startseite"
    },

    /* =====================================================
       SPANISH
    ===================================================== */
    es: {
      coverKicker: "PETS & DOGUE · NÚMERO 01 · HISTORIA DE PORTADA ✨",
      coverMeet: "Conoce a",
      coverBlue: "Patitas pequeñas.<br>Un mundo enorme. ✨",
      coverText: "Una diminuta Pomerania rubia de Londres, con una nariz curiosa y un mundo enorme por descubrir.",
      backIssue: "← Volver al Número 01",

      helloKicker: "Hola, nuevo amigo ♥ ✨",
      helloTitle: "Hola, soy",
      helloText: "Pequeña, esponjosa, rubia y viviendo en Londres. Me encantan los lugares bonitos, los largos paseos, la moda y conocer nuevos amigos.",

      profileKicker: "El perfil de Miso ✨",
      profileTitle: "PERRITA PEQUEÑA.<br>GRAN PERSONALIDAD.",
      profileSub: "Pomerania · Londres · muy compacta.",
      breed: "Raza", breedValue: "Pomerania",
      city: "Ciudad", cityValue: "Londres",
      size: "Tamaño", sizeValue: "Diminuta",
      coat: "Pelaje", coatValue: "Suave, esponjoso y rubio",
      personality: "Personalidad", personalityValue: "Dulce y curiosa",
      loves: "Le encanta", lovesValue: "Pasear y viajar",
      weakness: "Debilidad", weaknessValue: "Premios",
      looking: "Busca", lookingValue: "Nuevos amigos",
      swipe: "¿Deslizar a la derecha?",
      match: "¡Es un match! ♥ ✨",

      favourites: "Los favoritos de Miso ♥ ✨",
      world: "MI PEQUEÑO<br>MUNDO",
      travel: "Viajes ✈️✨", travelText: "Patitas pequeñas. Lugares nuevos.",
      playtime: "Hora de jugar 🧸💕", playtimeText: "Mi tipo favorito de asunto serio.",
      fashion: "Moda 👗💕", fashionText: "Un poco de rosa. Mucho Miso.",
      london: "Londres 🇬🇧💙", londonText: "Mi ciudad. Mis pequeñas aventuras.",
      friends: "Amigos 💕🐾", friendsText: "Las aventuras son mejores juntos.",

      diaryKicker: "Del diario de Miso ♥ ✨",
      diaryTitle: "UNA PERRITA PEQUEÑA.<br>UNA IDEA MUY GRANDE. ✨",
      diaryLead: "Creo que todo empezó conmigo. 💕",
      diary1: "Cuando llegué, mi familia de repente tuvo toda una nueva lista de preguntas.",
      diaryNote: "¿Adónde podemos ir juntos?<br>¿Qué cafés me recibirán?<br>¿Qué hoteles realmente aman a los animales?<br>¿Dónde podemos pasear, viajar y conocer nuevos amigos?",
      diary2: "Una perrita diminuta — y de repente el mundo se veía completamente diferente.",
      diary3: "Empezamos a buscar lugares, descubrir nuevas rutas y reunir respuestas útiles.",
      diary4: "Cada paseo se convirtió en una pequeña investigación. Cada viaje trajo otro descubrimiento. Cada lugar nuevo nos dio algo útil que recordar.",
      diary5: "Quizá así comenzó PETS & DOGUE. ♥",
      pull: "Una perrita pequeña.<br>Un mundo muy grande. 🌍✨",

      seaKicker: "Miso explora ✨",
      seaTitle: "El<br>mar 🌊",
      seaText: "Nuevos olores.<br>Nuevos sonidos.<br>Un mundo enorme. 💙",

      londonKicker: "Mi Londres ♥ ✨",
      londonTitle: "MI CIUDAD —<br>LONDRES",
      londonFeature: "Miso en Londres 💙",
      londonFeatureSub: "Patitas pequeñas. Gran ciudad. 🎀✨",
      london1: "Londres nunca se siente exactamente igual dos veces. ♥",
      london2: "Un parque hoy. 🌳<br>Un pequeño café mañana. ☕<br>Después el río, un mercado, un autobús rojo 🚌<br>o una calle que nunca había visto.",
      london3: "Me paro. Miro. Olfateo. Y luego elijo otra dirección. ✨",
      london4: "A veces lo mejor es el destino. A veces es todo lo que descubro por el camino.",
      london5: "Para mí, un paseo no es simplemente salir. Es la forma en que descubro el mundo. 🌍",

      friendKicker: "Hola, nuevo amigo ♥ ✨",
      friendTitle: "¡ES UN<br>MATCH! 💕",
      friend1: "Hola. Soy Miso Cute.",
      friend2: "Soy diminuta, dulce, curiosa y siempre estoy interesada en conocer a alguien nuevo.",
      friend3: "Algunas aventuras están hechas para explorar. Otras, para compartir. 🐾",
      friend4: "Una cara nueva. Un pequeño hola. Y a veces — un nuevo amigo.",
      friend5: "Lo mejor de una nueva aventura es no saber nunca a quién podrías conocer. ♥",

      everyoneKicker: "Todos están invitados ♥ ✨",
      everyoneTitle: "HAY SITIO<br>PARA TODOS.",
      animals: "🐶 Perros, 🐱 gatos, 🦜 loros, 🐰 conejos, 🐴 caballos, 🐢 tortugas, cobayas, 🐠 peces, 🐦 aves y reptiles.",
      everyone1: "Grandes. Pequeños. Esponjosos. Con plumas. Lisos.",
      everyone2: "Algunos tienen patas. Algunos alas. Algunos aletas.",
      everyone3: "Algunos quieren correr a nuestro lado. Otros prefieren un rincón cálido y tranquilo. Algunos observan el mundo entero desde una rama, un acuario o su ventana favorita.",
      everyone4: "Todos son bienvenidos aquí. ♥ 🌍✨",
      everyone5: "No necesitamos parecernos para pertenecer al mismo mundo.",
      everyone6: "Ese es exactamente el punto.",
      everyone7: "PETS & DOGUE trata de animales — y de las personas que los aman.",

      askKicker: "Departamento de curiosidad ♥ ✨",
      askTitle: "Y SI NECESITAS<br>MI AYUDA...",
      askMark: "Pregunta a mi pequeña nariz curiosa ♥",
      askMarkSub: "Miso sabe dónde buscar. ✨",
      ask1: "¿Necesitas algún lugar adonde ir?",
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
      final2: "Quizá en un parque, un café o en algún lugar totalmente inesperado.",
      final3: "Si ves a una diminuta rubia esponjosa explorando muy seriamente un lugar nuevo — ven a saludar. 💕",
      final4: "Y si por ahora estamos lejos, busca mi pequeño círculo en PETS & DOGUE.",
      final5: "De una forma u otra, nos encontraremos. ♥",
      signature: "Con amor,<br>Miso ♥",
      tagline: "Un mundo. Cada mascota. ♥",
      issueLink: "← Número 01",
      home: "Inicio"
    },    /* =====================================================
       OTHER SUPPORTED LANGUAGES
       The complete existing dictionaries remain available
       through window.PetsDogueTranslations.issue01Miso.
       ===================================================== */

    it: {},
    pt: {},
    nl: {},
    pl: {},
    cs: {},
    sk: {},
    hu: {},
    ro: {},
    bg: {},
    el: {},
    sv: {},
    da: {},
    no: {},
    fi: {},
    tr: {},
    ar: {},
    hi: {}
  };

  /* =====================================================
     FALLBACK
     Never send text to /api/translate.
     ===================================================== */

  const existing =
    window.PetsDogueTranslations &&
    (
      window.PetsDogueTranslations.issue01Miso ||
      window.PetsDogueTranslations.miso ||
      window.PetsDogueTranslations.issue01
    );

  if (existing && typeof existing === "object") {
    Object.keys(T).forEach(function (lang) {
      if (
        Object.keys(T[lang] || {}).length === 0 &&
        existing[lang]
      ) {
        T[lang] = existing[lang];
      }
    });
  }

  function normalize(value) {
    const raw = String(value || "en")
      .toLowerCase()
      .trim()
      .replace("_", "-")
      .split("-")[0];

    return ALIASES[raw] || raw || "en";
  }

  function selectedLanguage() {
    try {
      return normalize(
        localStorage.getItem(STORE_KEY) || "en"
      );
    } catch (error) {
      return "en";
    }
  }

  function setHTML(el, value) {
    if (el && value !== undefined) {
      el.innerHTML = value;
    }
  }

  function setText(el, value) {
    if (el && value !== undefined) {
      el.textContent = value;
    }
  }

  function q(selector) {
    return document.querySelector(selector);
  }

  function qa(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function applyLanguage(requestedLanguage) {
    const lang = normalize(requestedLanguage);
    const d =
      T[lang] && Object.keys(T[lang]).length
        ? T[lang]
        : T.en;

    document.documentElement.lang = lang;
    document.documentElement.dir =
      RTL.has(lang) ? "rtl" : "ltr";

    try {
      localStorage.setItem(STORE_KEY, lang);
    } catch (error) {}

    setHTML(q(".cover-copy .kicker"), d.coverKicker);
    setText(q(".cover-copy h1"), d.coverMeet + "\nMiso 💕");
    setHTML(q(".cover-blue"), d.coverBlue);
    setText(q(".cover-copy > p"), d.coverText);
    setText(q(".issue-back"), d.backIssue);

    setHTML(q(".intro-copy .kicker"), d.helloKicker);
    setText(q(".intro-copy h2"), d.helloTitle + "\nMiso Cute 💕");
    setText(q(".intro-copy > p"), d.helloText);

    setHTML(q(".profile-head .kicker"), d.profileKicker);
    setHTML(q(".profile-head .display"), d.profileTitle);
    setText(q(".profile-sub"), d.profileSub);

    const facts = qa(".profile-fact");
    const factData = [
      [d.breed, d.breedValue],
      [d.city, d.cityValue],
      [d.size, d.sizeValue],
      [d.coat, d.coatValue],
      [d.personality, d.personalityValue],
      [d.loves, d.lovesValue],
      [d.weakness, d.weaknessValue],
      [d.looking, d.lookingValue]
    ];

    facts.forEach(function (fact, index) {
      if (!factData[index]) return;
      fact.innerHTML =
        "<b>" + factData[index][0] + "</b>" +
        factData[index][1];
    });

    const match = q(".match");
    if (match) {
      match.innerHTML =
        d.swipe +
        "<strong>" + d.match + "</strong>";
    }

    setHTML(q(".moments .section-head .kicker"), d.favourites);
    setHTML(q(".moments .section-head .display"), d.world);

    const moments = qa(".moment figcaption");
    const momentData = [
      [d.travel, d.travelText],
      [d.playtime, d.playtimeText],
      [d.fashion, d.fashionText],
      [d.london, d.londonText],
      [d.friends, d.friendsText]
    ];

    moments.forEach(function (caption, index) {
      if (!momentData[index]) return;
      caption.innerHTML =
        "<strong>" +
        momentData[index][0] +
        "</strong>" +
        momentData[index][1];
    });

    setHTML(q(".story-title .kicker"), d.diaryKicker);
    setHTML(q(".story-title .display"), d.diaryTitle);

    const diary = qa(".diary p");
    const diaryData = [
      d.diaryLead,
      d.diary1,
      d.diaryNote,
      d.diary2,
      d.diary3,
      d.diary4,
      d.diary5
    ];

    diary.forEach(function (p, index) {
      setHTML(p, diaryData[index]);
    });

    setHTML(q(".pull"), d.pull);

    setHTML(q(".sea-copy .kicker"), d.seaKicker);
    setHTML(q(".sea-copy h2"), d.seaTitle);
    setHTML(q(".sea-copy p"), d.seaText);

    setHTML(q(".london-head .kicker"), d.londonKicker);
    setHTML(q(".london-head .display"), d.londonTitle);
    setText(q(".london-feature-copy strong"), d.londonFeature);
    setText(q(".london-feature-copy em"), d.londonFeatureSub);

    const londonP = qa(".london-note p");
    [
      d.london1,
      d.london2,
      d.london3,
      d.london4,
      d.london5
    ].forEach(function (value, index) {
      setHTML(londonP[index], value);
    });

    setHTML(q(".friends-overlay .kicker"), d.friendKicker);
    setHTML(q(".friends-overlay h2"), d.friendTitle);

    const friendP = qa(".friends-overlay p");
    [
      d.friend1,
      d.friend2,
      d.friend3,
      d.friend4,
      d.friend5
    ].forEach(function (value, index) {
      setText(friendP[index], value);
    });

    setHTML(q(".everyone-head .kicker"), d.everyoneKicker);
    setHTML(q(".everyone-head .display"), d.everyoneTitle);
    setText(q(".animal-line"), d.animals);

    const everyoneP = qa(".everyone-copy p");
    [
      d.everyone1,
      d.everyone2,
      d.everyone3,
      d.everyone4,
      d.everyone5,
      d.everyone6,
      d.everyone7
    ].forEach(function (value, index) {
      setText(everyoneP[index], value);
    });

    setHTML(q(".ask-head .kicker"), d.askKicker);
    setHTML(q(".ask-head .display"), d.askTitle);
    setText(q(".ask-mark strong"), d.askMark);
    setText(q(".ask-mark em"), d.askMarkSub);

    const askP = qa(".ask-copy p");
    [
      d.ask1,
      d.ask2,
      d.ask3,
      d.ask4,
      d.ask5,
      d.ask6,
      d.ask7
    ].forEach(function (value, index) {
      setText(askP[index], value);
    });

    setText(q(".ask-label"), d.askLabel);

    setHTML(q(".final-copy .kicker"), d.finalKicker);
    setHTML(q(".final-copy h2"), d.finalTitle);
    setHTML(q(".final-blue"), d.finalBlue);

    const finalP = qa(".final-copy > p");
    [
      d.final1,
      d.final2,
      d.final3,
      d.final4,
      d.final5
    ].forEach(function (value, index) {
      setText(finalP[index], value);
    });

    setHTML(q(".signature"), d.signature);
    setText(q(".issue-footer-tag"), d.tagline);

    const footerLinks = qa(".footer-links a");
    setText(footerLinks[0], d.issueLink);
    setText(footerLinks[1], d.home);

    window.dispatchEvent(
      new CustomEvent("petsdogue:language-applied", {
        detail: { language: lang }
      })
    );
  }

  function start() {
    applyLanguage(selectedLanguage());

    window.addEventListener(
      "petsdogue:languagechange",
      function (event) {
        const value =
          event &&
          event.detail &&
          (
            event.detail.language ||
            event.detail.lang ||
            event.detail.code
          );

        applyLanguage(value || selectedLanguage());
      }
    );

    window.addEventListener(
      "storage",
      function (event) {
        if (event.key === STORE_KEY) {
          applyLanguage(event.newValue || "en");
        }
      }
    );

    document.addEventListener(
      "change",
      function (event) {
        const target = event.target;

        if (!target) return;

        if (
          target.matches(
            "[data-language-select]," +
            "#languageSelect," +
            "#pd-language-select," +
            "select[name='language']"
          )
        ) {
          applyLanguage(target.value);
        }
      }
    );

    window.PetsDogueMisoI18n = {
      applyLanguage: applyLanguage,
      translations: T
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      start,
      { once: true }
    );
  } else {
    start();
  }
})();
