/* =========================================================
   PETS & DOGUE — ISSUE 01 STORIES
   MISO + PABLO + RICHIE & PI + JESSICA
   STATIC MULTILINGUAL SYSTEM — NO API
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

  const STORIES = {
    miso: {
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

        diaryNote:
          "Where can we go together?<br>" +
          "Which cafés will welcome me?<br>" +
          "Which hotels really love pets?<br>" +
          "Where can we walk, travel and meet new friends?",

        diary2: "One tiny dog — and suddenly the world looked completely different.",

        diary3:
          "We began looking for places, discovering new routes and collecting useful answers.",

        diary4:
          "Every walk became a little investigation. Every trip brought another discovery. Every new place gave us something useful to remember.",

        diary5:
          "Maybe that was the beginning of PETS & DOGUE. ♥",

        pull:
          "One little dog.<br>One very big world. 🌍✨",

        seaKicker: "Miso explores ✨",
        seaTitle: "The<br>sea 🌊",
        seaText:
          "New smells.<br>New sounds.<br>Big world. 💙",

        londonKicker: "My London ♥ ✨",
        londonTitle: "MY CITY —<br>LONDON",

        londonFeature: "Miso in London 💙",
        londonFeatureSub: "Tiny paws. Big city. 🎀✨",

        london1:
          "London never feels exactly the same twice. ♥",

        london2:
          "A park today. 🌳<br>" +
          "A little café tomorrow. ☕<br>" +
          "Then the river, a market, a red bus 🚌<br>" +
          "or a street I have never seen before.",

        london3:
          "I stop. I look. I sniff. Then I choose another direction. ✨",

        london4:
          "Sometimes the best part is the destination. Sometimes it is everything I notice on the way there.",

        london5:
          "For me, a walk is not simply going outside. It is how I discover the world. 🌍",

        friendKicker: "Hello, new friend ♥ ✨",
        friendTitle: "IT’S A<br>MATCH! 💕",

        friend1: "Hi. I’m Miso Cute.",

        friend2:
          "I’m tiny, gentle, curious and always interested in meeting someone new.",

        friend3:
          "Some adventures are made for exploring. Others are made for sharing. 🐾",

        friend4:
          "A new face. A little hello. And sometimes — a new friend.",

        friend5:
          "The best part of a new adventure is never knowing who you might meet. ♥",

        everyoneKicker: "Everyone is invited ♥ ✨",
        everyoneTitle: "THERE IS ROOM<br>FOR EVERYONE.",

        animals:
          "🐶 Dogs, 🐱 cats, 🦜 parrots, 🐰 rabbits, 🐴 horses, 🐢 turtles, guinea pigs, 🐠 fish, 🐦 birds and reptiles.",

        everyone1:
          "Big. Small. Fluffy. Feathered. Smooth.",

        everyone2:
          "Some have paws. Some have wings. Some have fins.",

        everyone3:
          "Some want to run beside us. Some prefer a warm quiet corner. Some watch the whole world from a branch, a tank or a favourite window.",

        everyone4:
          "Everyone is welcome here. ♥ 🌍✨",

        everyone5:
          "We do not need to look the same to belong to the same world.",

        everyone6:
          "That is exactly the point.",

        everyone7:
          "PETS & DOGUE is about animals — and the people who love them.",

        askKicker: "Curiosity department ♥ ✨",
        askTitle: "AND IF YOU<br>NEED MY HELP...",

        askMark:
          "Ask my curious little nose ♥",

        askMarkSub:
          "Miso knows where to look. ✨",

        ask1:
          "Need somewhere to go?",

        ask2:
          "Looking for a pet-friendly place? 🐾",

        ask3:
          "Planning a trip? ✈️",

        ask4:
          "Looking for something useful?",

        ask5:
          "I look. I sniff. I explore. ✨",

        ask6:
          "And when I find something interesting, I bring it back to PETS & DOGUE.",

        ask7:
          "That is what a curious little nose is for. ♥",

        askLabel:
          "Ask Miso ✨",

        finalKicker:
          "See you somewhere in the world ✨",

        finalTitle:
          "SEE YOU<br>OUT THERE.",

        finalBlue:
          "One world.<br>Every pet. 🌍",

        final1:
          "Today we might meet in London. Tomorrow — by the sea.",

        final2:
          "Maybe in a park, a café or somewhere completely unexpected.",

        final3:
          "If you see a tiny fluffy blonde seriously exploring somewhere new — come and say hello. 💕",

        final4:
          "And if we are far away from each other for now, look for my little circle on PETS & DOGUE.",

        final5:
          "One way or another, we will meet. ♥",

        signature:
          "With love,<br>Miso ♥",

        tagline:
          "One world. Every pet. ♥",

        issueLink:
          "← Issue 01",

        home:
          "Home"
      },

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

        diary1:
          "Коли я з’явилася, у моєї родини раптом виник цілий список нових запитань.",

        diaryNote:
          "Куди ми можемо ходити разом?<br>" +
          "У яких кафе мені будуть раді?<br>" +
          "Які готелі справді люблять тварин?<br>" +
          "Де ми можемо гуляти, подорожувати й знаходити нових друзів?",

        diary2:
          "Одна крихітна собака — і раптом світ став виглядати зовсім інакше.",

        diary3:
          "Ми почали шукати місця, відкривати нові маршрути й збирати корисні відповіді.",

        diary4:
          "Кожна прогулянка ставала маленьким дослідженням. Кожна подорож приносила нове відкриття. Кожне нове місце давало щось корисне, що хотілося запам’ятати.",

        diary5:
          "Можливо, саме так і почався PETS & DOGUE. ♥",

        pull:
          "Одна маленька собака.<br>Один дуже великий світ. 🌍✨",

        seaKicker:
          "Miso досліджує ✨",

        seaTitle:
          "Море 🌊",

        seaText:
          "Нові запахи.<br>Нові звуки.<br>Великий світ. 💙",

        londonKicker:
          "Мій Лондон ♥ ✨",

        londonTitle:
          "МОЄ МІСТО —<br>ЛОНДОН",

        londonFeature:
          "Miso у Лондоні 💙",

        londonFeatureSub:        "Крихітні лапки. Велике місто. 🎀✨",

        london1:
          "Лондон ніколи не буває абсолютно однаковим двічі. ♥",

        london2:
          "Сьогодні — парк. 🌳<br>" +
          "Завтра — маленьке кафе. ☕<br>" +
          "Потім річка, ринок, червоний автобус 🚌<br>" +
          "або вулиця, якої я ще ніколи не бачила.",

        london3:
          "Я зупиняюся. Дивлюся. Нюхаю. А потім обираю інший напрямок. ✨",

        london4:
          "Іноді найкраще — це місце призначення. А іноді — усе, що я помічаю дорогою.",

        london5:
          "Для мене прогулянка — це не просто вийти надвір. Так я відкриваю світ. 🌍",

        friendKicker:
          "Привіт, новий друже ♥ ✨",

        friendTitle:
          "ЦЕ<br>МЕТЧ! 💕",

        friend1:
          "Привіт. Я Miso Cute.",

        friend2:
          "Я маленька, ніжна, допитлива й завжди рада новим знайомствам.",

        friend3:
          "Одні пригоди створені для досліджень. Інші — щоб ділитися ними. 🐾",

        friend4:
          "Нове обличчя. Маленьке «привіт». А іноді — новий друг.",

        friend5:
          "Найкраще в новій пригоді — ніколи не знаєш, кого можеш зустріти. ♥",

        everyoneKicker:
          "Запрошені всі ♥ ✨",

        everyoneTitle:
          "ТУТ Є МІСЦЕ<br>ДЛЯ ВСІХ.",

        animals:
          "🐶 Собаки, 🐱 коти, 🦜 папуги, 🐰 кролики, 🐴 коні, 🐢 черепахи, морські свинки, 🐠 риби, 🐦 птахи та рептилії.",

        everyone1:
          "Великі. Маленькі. Пухнасті. Пернаті. Гладенькі.",

        everyone2:
          "У когось лапи. У когось крила. У когось плавці.",

        everyone3:
          "Хтось хоче бігти поруч із нами. Хтось віддає перевагу теплому тихому куточку. А хтось спостерігає за світом із гілки, акваріума чи улюбленого вікна.",

        everyone4:
          "Тут раді всім. ♥ 🌍✨",

        everyone5:
          "Нам не потрібно бути схожими, щоб належати до одного світу.",

        everyone6:
          "Саме в цьому й суть.",

        everyone7:
          "PETS & DOGUE — про тварин і людей, які їх люблять.",

        askKicker:
          "Відділ допитливості ♥ ✨",

        askTitle:
          "А ЯКЩО ВАМ<br>ПОТРІБНА МОЯ ДОПОМОГА...",

        askMark:
          "Запитайте мій допитливий носик ♥",

        askMarkSub:
          "Miso знає, де шукати. ✨",

        ask1:
          "Потрібне місце, куди можна піти?",

        ask2:
          "Шукаєте pet-friendly місце? 🐾",

        ask3:
          "Плануєте подорож? ✈️",

        ask4:
          "Шукаєте щось корисне?",

        ask5:
          "Я дивлюся. Нюхаю. Досліджую. ✨",

        ask6:
          "А коли знаходжу щось цікаве, приношу це в PETS & DOGUE.",

        ask7:
          "Ось для чого потрібен допитливий маленький носик. ♥",

        askLabel:
          "Запитати Miso ✨",

        finalKicker:
          "До зустрічі десь у світі ✨",

        finalTitle:
          "ПОБАЧИМОСЯ<br>ТАМ.",

        finalBlue:
          "Один світ.<br>Кожна тварина. 🌍",

        final1:
          "Сьогодні ми можемо зустрітися в Лондоні. Завтра — біля моря.",

        final2:
          "Можливо, у парку, кафе або десь зовсім несподівано.",

        final3:
          "Якщо побачите маленьку пухнасту білявку, яка дуже серйозно досліджує нове місце — підійдіть і привітайтеся. 💕",

        final4:
          "А якщо поки що ми далеко одне від одного, шукайте моє маленьке коло на PETS & DOGUE.",

        final5:
          "Так чи інакше, ми зустрінемося. ♥",

        signature:
          "З любов’ю,<br>Miso ♥",

        tagline:
          "Один світ. Кожна тварина. ♥",

        issueLink:
          "← Випуск 01",

        home:
          "Головна"
      },

      ru: {
        coverKicker: "PETS & DOGUE · ВЫПУСК 01 · ИСТОРИЯ ОБЛОЖКИ ✨",
        coverMeet: "Знакомьтесь:",
        coverBlue: "Маленькие лапки.<br>Большой мир. ✨",
        coverText: "Крошечная белокурая померанская собачка из Лондона с любопытным носиком и огромным миром, который хочется исследовать.",
        backIssue: "← Назад к Выпуску 01",

        helloKicker: "Привет, новый друг ♥ ✨",
        helloTitle: "Привет, я",
        helloText: "Маленькая, пушистая, белокурая и живу в Лондоне. Я люблю красивые места, долгие прогулки, моду и новые знакомства.",

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
        coatValue: "Мягкая, пушистая, белокурая",
        personality: "Характер",
        personalityValue: "Нежная и любопытная",
        loves: "Любит",
        lovesValue: "Прогулки и путешествия",
        weakness: "Слабость",
        weaknessValue: "Лакомства",
        looking: "Ищет",
        lookingValue: "Новых друзей",
        swipe: "Свайпнуть вправо?",
        match: "Это мэтч! ♥ ✨",

        favourites: "Любимое Miso ♥ ✨",
        world: "МОЙ МАЛЕНЬКИЙ<br>МИР",

        travel: "Путешествия ✈️✨",
        travelText: "Маленькие лапки. Новые места.",

        playtime: "Время игры 🧸💕",
        playtimeText: "Моё любимое серьёзное занятие.",

        fashion: "Мода 👗💕",
        fashionText: "Немного розового. Очень много Miso.",

        london: "Лондон 🇬🇧💙",
        londonText: "Мой город. Мои маленькие приключения.",

        friends: "Друзья 💕🐾",
        friendsText: "Вместе приключения лучше.",

        diaryKicker: "Из дневника Miso ♥ ✨",
        diaryTitle: "ОДНА МАЛЕНЬКАЯ СОБАКА.<br>ОДНА ОЧЕНЬ БОЛЬШАЯ ИДЕЯ. ✨",
        diaryLead: "Кажется, всё началось с меня. 💕",

        diary1:
          "Когда я появилась, у моей семьи внезапно возник целый список новых вопросов.",

        diaryNote:
          "Куда мы можем ходить вместе?<br>" +
          "В каких кафе мне будут рады?<br>" +
          "Какие отели действительно любят животных?<br>" +
          "Где мы можем гулять, путешествовать и встречать новых друзей?",

        diary2:
          "Одна крошечная собака — и вдруг мир стал выглядеть совершенно иначе.",

        diary3:
          "Мы начали искать места, открывать новые маршруты и собирать полезные ответы.",

        diary4:
          "Каждая прогулка превращалась в маленькое исследование. Каждая поездка приносила новое открытие. Каждое новое место давало что-то полезное, что хотелось запомнить.",

        diary5:
          "Возможно, именно так и начался PETS & DOGUE. ♥",

        pull:
          "Одна маленькая собака.<br>Один очень большой мир. 🌍✨",

        seaKicker: "Miso исследует ✨",
        seaTitle: "Море 🌊",
        seaText:
          "Новые запахи.<br>Новые звуки.<br>Большой мир. 💙",

        londonKicker: "Мой Лондон ♥ ✨",
        londonTitle: "МОЙ ГОРОД —<br>ЛОНДОН",

        londonFeature: "Miso в Лондоне 💙",
        londonFeatureSub: "Крошечные лапки. Большой город. 🎀✨",

        london1:
          "Лондон никогда не бывает совершенно одинаковым дважды. ♥",

        london2:
          "Сегодня — парк. 🌳<br>" +
          "Завтра — маленькое кафе. ☕<br>" +
          "Потом река, рынок, красный автобус 🚌<br>" +
          "или улица, которую я ещё никогда не видела.",

        london3:
          "Я останавливаюсь. Смотрю. Нюхаю. А потом выбираю другое направление. ✨",

        london4:
          "Иногда самое лучшее — это место назначения. А иногда — всё, что я замечаю по дороге.",

        london5:
          "Для меня прогулка — это не просто выйти на улицу. Так я открываю мир. 🌍",

        friendKicker: "Привет, новый друг ♥ ✨",
        friendTitle: "ЭТО<br>МЭТЧ! 💕",

        friend1:
          "Привет. Я Miso Cute.",

        friend2:
          "Я маленькая, нежная, любопытная и всегда рада новым знакомствам.",

        friend3:
          "Одни приключения созданы для исследований. Другие — чтобы делиться ими. 🐾",

        friend4:
          "Новое лицо. Маленькое «привет». А иногда — новый друг.",

        friend5:
          "Самое прекрасное в новом приключении — никогда не знаешь, кого можешь встретить. ♥",

        everyoneKicker: "Приглашены все ♥ ✨",
        everyoneTitle: "ЗДЕСЬ ЕСТЬ МЕСТО<br>ДЛЯ ВСЕХ.",

        animals:
          "🐶 Собаки, 🐱 кошки, 🦜 попугаи, 🐰 кролики, 🐴 лошади, 🐢 черепахи, морские свинки, 🐠 рыбы, 🐦 птицы и рептилии.",

        everyone1:
          "Большие. Маленькие. Пушистые. Пернатые. Гладкие.",

        everyone2:
          "У кого-то лапы. У кого-то крылья. У кого-то плавники.",

        everyone3:
          "Кто-то хочет бежать рядом с нами. Кто-то предпочитает тёплый тихий уголок. А кто-то наблюдает за миром с ветки, из аквариума или любимого окна.",

        everyone4:
          "Здесь рады всем. ♥ 🌍✨",

        everyone5:
          "Нам не нужно выглядеть одинаково, чтобы принадлежать одному миру.",

        everyone6:
          "Именно в этом и смысл.",

        everyone7:
          "PETS & DOGUE — о животных и людях, которые их любят.",

        askKicker: "Отдел любопытства ♥ ✨",
        askTitle: "А ЕСЛИ ВАМ<br>НУЖНА МОЯ ПОМОЩЬ...",

        askMark:
          "Спросите мой любопытный носик ♥",

        askMarkSub:
          "Miso знает, где искать. ✨",

        ask1:
          "Нужно место, куда можно пойти?",

        ask2:
          "Ищете pet-friendly место? 🐾",

        ask3:
          "Планируете путешествие? ✈️",

        ask4:
          "Ищете что-нибудь полезное?",

        ask5:
          "Я смотрю. Нюхаю. Исследую. ✨",

        ask6:
          "А когда нахожу что-то интересное, приношу это в PETS & DOGUE.",

        ask7:
          "Вот для чего нужен любопытный маленький носик. ♥",

        askLabel:
          "Спросить Miso ✨",

        finalKicker:
          "До встречи где-нибудь в мире ✨",

        finalTitle:
          "УВИДИМСЯ<br>ТАМ.",

        finalBlue:
          "Один мир.<br>Каждый питомец. 🌍",

        final1:
          "Сегодня мы можем встретиться в Лондоне. Завтра — у моря.",

        final2:
          "Может быть, в парке, кафе или где-нибудь совершенно неожиданно.",

        final3:
          "Если увидите маленькую пушистую блондинку, которая очень серьёзно исследует новое место — подойдите и поздоровайтесь. 💕",

        final4:
          "А если пока мы далеко друг от друга, ищите мой маленький кружок на PETS & DOGUE.",

        final5:
          "Так или иначе, мы встретимся. ♥",

        signature:
          "С любовью,<br>Miso ♥",

        tagline:
          "Один мир. Каждый питомец. ♥",

        issueLink:
          "← Выпуск 01",

        home:
          "Главная"
      },      fr: {
        coverKicker: "PETS & DOGUE · NUMÉRO 01 · HISTOIRE DE COUVERTURE ✨",
        coverMeet: "Voici",
        coverBlue: "Petites pattes.<br>Grand monde. ✨",
        coverText: "Une minuscule Poméranienne blonde de Londres, avec un petit nez curieux et un immense monde à découvrir.",
        backIssue: "← Retour au Numéro 01",
        helloKicker: "Bonjour, nouvel ami ♥ ✨",
        helloTitle: "Salut, je suis",
        helloText: "Petite, duveteuse, blonde et londonienne. J’aime les beaux endroits, les longues promenades, la mode et rencontrer de nouveaux amis.",
        profileKicker: "Le profil de Miso ✨",
        profileTitle: "PETIT CHIEN.<br>GRANDE PERSONNALITÉ.",
        profileSub: "Poméranien · Londres · très compacte.",
        breed: "Race", breedValue: "Poméranien",
        city: "Ville", cityValue: "Londres",
        size: "Taille", sizeValue: "Minuscule",
        coat: "Pelage", coatValue: "Blond, doux et duveteux",
        personality: "Personnalité", personalityValue: "Douce et curieuse",
        loves: "Adore", lovesValue: "Promenades et voyages",
        weakness: "Faiblesse", weaknessValue: "Friandises",
        looking: "Recherche", lookingValue: "De nouveaux amis",
        swipe: "Glisser à droite ?",
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
        diary3: "Nous avons commencé à chercher des lieux, découvrir de nouveaux itinéraires et recueillir des réponses utiles.",
        diary4: "Chaque promenade est devenue une petite enquête. Chaque voyage apportait une nouvelle découverte. Chaque nouvel endroit nous donnait quelque chose d’utile à retenir.",
        diary5: "C’est peut-être ainsi que PETS & DOGUE a commencé. ♥",
        pull: "Un petit chien.<br>Un très grand monde. 🌍✨",
        seaKicker: "Miso explore ✨", seaTitle: "La mer 🌊", seaText: "Nouvelles odeurs.<br>Nouveaux sons.<br>Grand monde. 💙",
        londonKicker: "Mon Londres ♥ ✨", londonTitle: "MA VILLE —<br>LONDRES",
        londonFeature: "Miso à Londres 💙", londonFeatureSub: "Petites pattes. Grande ville. 🎀✨",
        london1: "Londres ne semble jamais exactement identique deux fois. ♥",
        london2: "Un parc aujourd’hui. 🌳<br>Un petit café demain. ☕<br>Puis la rivière, un marché, un bus rouge 🚌<br>ou une rue que je n’ai encore jamais vue.",
        london3: "Je m’arrête. Je regarde. Je renifle. Puis je choisis une autre direction. ✨",
        london4: "Parfois, le meilleur est la destination. Parfois, c’est tout ce que je remarque en chemin.",
        london5: "Pour moi, une promenade n’est pas simplement sortir. C’est ainsi que je découvre le monde. 🌍",
        friendKicker: "Bonjour, nouvel ami ♥ ✨", friendTitle: "C’EST UN<br>MATCH ! 💕",
        friend1: "Salut. Je suis Miso Cute.",
        friend2: "Je suis petite, douce, curieuse et toujours heureuse de rencontrer quelqu’un de nouveau.",
        friend3: "Certaines aventures sont faites pour explorer. D’autres pour être partagées. 🐾",
        friend4: "Un nouveau visage. Un petit bonjour. Et parfois — un nouvel ami.",
        friend5: "Le meilleur d’une nouvelle aventure, c’est de ne jamais savoir qui l’on va rencontrer. ♥",
        everyoneKicker: "Tout le monde est invité ♥ ✨",
        everyoneTitle: "IL Y A DE LA PLACE<br>POUR TOUT LE MONDE.",
        animals: "🐶 Chiens, 🐱 chats, 🦜 perroquets, 🐰 lapins, 🐴 chevaux, 🐢 tortues, cochons d’Inde, 🐠 poissons, 🐦 oiseaux et reptiles.",
        everyone1: "Grands. Petits. Duveteux. À plumes. Lisses.",
        everyone2: "Certains ont des pattes. Certains des ailes. Certains des nageoires.",
        everyone3: "Certains veulent courir à nos côtés. D’autres préfèrent un coin chaud et tranquille. Certains observent le monde depuis une branche, un aquarium ou leur fenêtre préférée.",
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
        askLabel: "Demander à Miso ✨",
        finalKicker: "À bientôt quelque part dans le monde ✨",
        finalTitle: "À BIENTÔT<br>LÀ-BAS.",
        finalBlue: "Un monde.<br>Chaque animal. 🌍",
        final1: "Aujourd’hui, nous pourrions nous rencontrer à Londres. Demain — au bord de la mer.",
        final2: "Peut-être dans un parc, un café ou quelque part de totalement inattendu.",
        final3: "Si vous voyez une petite blonde duveteuse explorer très sérieusement un nouvel endroit — venez dire bonjour. 💕",
        final4: "Et si nous sommes loin l’un de l’autre pour le moment, cherchez mon petit cercle sur PETS & DOGUE.",
        final5: "D’une façon ou d’une autre, nous nous rencontrerons. ♥",
        signature: "Avec amour,<br>Miso ♥",
        tagline: "Un monde. Chaque animal. ♥",
        issueLink: "← Numéro 01",
        home: "Accueil"
      },

      de: {
        coverKicker: "PETS & DOGUE · AUSGABE 01 · COVER STORY ✨",
        coverMeet: "Das ist",
        coverBlue: "Kleine Pfoten.<br>Große Welt. ✨",
        coverText: "Eine winzige blonde Pomeranian-Hündin aus London mit neugieriger Nase und einer riesigen Welt zum Entdecken.",
        backIssue: "← Zurück zu Ausgabe 01",
        helloKicker: "Hallo, neuer Freund ♥ ✨",
        helloTitle: "Hi, ich bin",
        helloText: "Winzig, flauschig, blond und in London zu Hause. Ich liebe schöne Orte, lange Spaziergänge, Mode und neue Freunde.",
        profileKicker: "Das Miso-Profil ✨",
        profileTitle: "KLEINER HUND.<br>GROSSE PERSÖNLICHKEIT.",
        profileSub: "Pomeranian · London · sehr kompakt.",
        breed: "Rasse", breedValue: "Pomeranian",
        city: "Stadt", cityValue: "London",
        size: "Größe", sizeValue: "Winzig",
        coat: "Fell", coatValue: "Weich, flauschig und blond",
        personality: "Charakter", personalityValue: "Sanft & neugierig",
        loves: "Liebt", lovesValue: "Spaziergänge & Reisen",
        weakness: "Schwäche", weaknessValue: "Leckerlis",
        looking: "Sucht", lookingValue: "Neue Freunde",
        swipe: "Nach rechts wischen?",
        match: "Es ist ein Match! ♥ ✨",
        favourites: "Misos Favoriten ♥ ✨",
        world: "MEINE KLEINE<br>WELT",
        travel: "Reisen ✈️✨", travelText: "Kleine Pfoten. Neue Orte.",
        playtime: "Spielzeit 🧸💕", playtimeText: "Meine liebste ernste Beschäftigung.",
        fashion: "Mode 👗💕", fashionText: "Ein bisschen Rosa. Sehr viel Miso.",
        london: "London 🇬🇧💙", londonText: "Meine Stadt. Meine kleinen Abenteuer.",
        friends: "Freunde 💕🐾", friendsText: "Abenteuer sind gemeinsam schöner.",
        diaryKicker: "Aus Misos Tagebuch ♥ ✨",
        diaryTitle: "EIN KLEINER HUND.<br>EINE SEHR GROSSE IDEE. ✨",
        diaryLead: "Ich glaube, alles begann mit mir. 💕",
        diary1: "Als ich ankam, hatte meine Familie plötzlich eine ganz neue Liste von Fragen.",
        diaryNote: "Wohin können wir zusammen gehen?<br>Welche Cafés heißen mich willkommen?<br>Welche Hotels lieben Haustiere wirklich?<br>Wo können wir spazieren, reisen und neue Freunde treffen?",
        diary2: "Ein winziger Hund — und plötzlich sah die Welt völlig anders aus.",
        diary3: "Wir begannen Orte zu suchen, neue Wege zu entdecken und hilfreiche Antworten zu sammeln.",
        diary4: "Jeder Spaziergang wurde zu einer kleinen Untersuchung. Jede Reise brachte eine neue Entdeckung. Jeder neue Ort gab uns etwas Nützliches zum Merken.",
        diary5: "Vielleicht war das der Anfang von PETS & DOGUE. ♥",
        pull: "Ein kleiner Hund.<br>Eine sehr große Welt. 🌍✨",
        seaKicker: "Miso entdeckt ✨", seaTitle: "Das Meer 🌊", seaText: "Neue Gerüche.<br>Neue Geräusche.<br>Große Welt. 💙",
        londonKicker: "Mein London ♥ ✨", londonTitle: "MEINE STADT —<br>LONDON",
        londonFeature: "Miso in London 💙", londonFeatureSub: "Kleine Pfoten. Große Stadt. 🎀✨",
        london1: "London fühlt sich nie zweimal genau gleich an. ♥",
        london2: "Heute ein Park. 🌳<br>Morgen ein kleines Café. ☕<br>Dann der Fluss, ein Markt, ein roter Bus 🚌<br>oder eine Straße, die ich noch nie gesehen habe.",
        london3: "Ich halte an. Ich schaue. Ich schnuppere. Dann wähle ich eine andere Richtung. ✨",
        london4: "Manchmal ist das Ziel das Beste. Manchmal ist es alles, was ich unterwegs entdecke.",
        london5: "Für mich bedeutet ein Spaziergang nicht einfach nur hinauszugehen. So entdecke ich die Welt. 🌍",
        friendKicker: "Hallo, neuer Freund ♥ ✨", friendTitle: "ES IST EIN<br>MATCH! 💕",
        friend1: "Hi. Ich bin Miso Cute.",
        friend2: "Ich bin winzig, sanft, neugierig und freue mich immer darauf, jemanden Neues kennenzulernen.",
        friend3: "Manche Abenteuer sind zum Entdecken da. Andere zum Teilen. 🐾",
        friend4: "Ein neues Gesicht. Ein kleines Hallo. Und manchmal — ein neuer Freund.",
        friend5: "Das Beste an einem neuen Abenteuer ist, nie zu wissen, wen man treffen könnte. ♥",
        everyoneKicker: "Alle sind eingeladen ♥ ✨",
        everyoneTitle: "HIER IST PLATZ<br>FÜR ALLE.",
        animals: "🐶 Hunde, 🐱 Katzen, 🦜 Papageien, 🐰 Kaninchen, 🐴 Pferde, 🐢 Schildkröten, Meerschweinchen, 🐠 Fische, 🐦 Vögel und Reptilien.",
        everyone1: "Groß. Klein. Flauschig. Gefiedert. Glatt.",
        everyone2: "Manche haben Pfoten. Manche Flügel. Manche Flossen.",
        everyone3: "Manche wollen neben uns laufen. Andere bevorzugen eine warme ruhige Ecke. Manche beobachten die ganze Welt von einem Ast, einem Aquarium oder ihrem Lieblingsfenster aus.",
        everyone4: "Hier sind alle willkommen. ♥ 🌍✨",
        everyone5: "Wir müssen nicht gleich aussehen, um zur selben Welt zu gehören.",
        everyone6: "Genau darum geht es.",
        everyone7: "PETS & DOGUE handelt von Tieren — und den Menschen, die sie lieben.",
        askKicker: "Abteilung Neugier ♥ ✨",
        askTitle: "UND WENN DU<br>MEINE HILFE BRAUCHST...",
        askMark: "Frag meine neugierige kleine Nase ♥",
        askMarkSub: "Miso weiß, wo sie suchen muss. ✨",
        ask1: "Brauchst du einen Ort zum Hingehen?",
        ask2: "Suchst du einen tierfreundlichen Ort? 🐾",
        ask3: "Planst du eine Reise? ✈️",
        ask4: "Suchst du etwas Nützliches?",
        ask5: "Ich schaue. Ich schnuppere. Ich entdecke. ✨",
        ask6: "Und wenn ich etwas Interessantes finde, bringe ich es zurück zu PETS & DOGUE.",
        ask7: "Dafür ist eine neugierige kleine Nase da. ♥",
        askLabel: "Miso fragen ✨",
        finalKicker: "Bis irgendwo auf der Welt ✨",
        finalTitle: "WIR SEHEN UNS<br>DA DRAUSSEN.",
        finalBlue: "Eine Welt.<br>Jedes Haustier. 🌍",
        final1: "Heute treffen wir uns vielleicht in London. Morgen — am Meer.",
        final2: "Vielleicht in einem Park, einem Café oder irgendwo völlig unerwartet.",
        final3: "Wenn du eine winzige flauschige Blondine siehst, die ernsthaft einen neuen Ort erkundet — komm und sag Hallo. 💕",
        final4: "Und wenn wir gerade weit voneinander entfernt sind, such nach meinem kleinen Kreis bei PETS & DOGUE.",
        final5: "So oder so werden wir uns treffen. ♥",
        signature: "Mit Liebe,<br>Miso ♥",
        tagline: "Eine Welt. Jedes Haustier. ♥",
        issueLink: "← Ausgabe 01",
        home: "Startseite"
      },

      es: {
        coverKicker: "PETS & DOGUE · EDICIÓN 01 · HISTORIA DE PORTADA ✨",
        coverMeet: "Conoce a",
        coverBlue: "Patitas pequeñas.<br>Un gran mundo. ✨",
        coverText: "Una diminuta Pomerania rubia de Londres, con una nariz curiosa y un mundo enorme por descubrir.",
        backIssue: "← Volver a Edición 01",
        helloKicker: "Hola, nuevo amigo ♥ ✨",
        helloTitle: "Hola, soy",
        helloText: "Pequeña, esponjosa, rubia y viviendo en Londres. Me encantan los lugares bonitos, los largos paseos, la moda y conocer nuevos amigos.",
        profileKicker: "El perfil de Miso ✨",
        profileTitle: "PERRO PEQUEÑO.<br>GRAN PERSONALIDAD.",
        profileSub: "Pomerania · Londres · muy compacta.",
        breed: "Raza", breedValue: "Pomerania",
        city: "Ciudad", cityValue: "Londres",
        size: "Tamaño", sizeValue: "Diminuta",
        coat: "Pelaje", coatValue: "Rubio, suave y esponjoso",
        personality: "Personalidad", personalityValue: "Dulce y curiosa",
        loves: "Le encanta", lovesValue: "Pasear y viajar",
        weakness: "Debilidad", weaknessValue: "Premios",
        looking: "Busca", lookingValue: "Nuevos amigos",
        swipe: "¿Deslizar a la derecha?",
        match: "¡Es un match! ♥ ✨",
        favourites: "Los favoritos de Miso ♥ ✨",
        world: "MI PEQUEÑO<br>MUNDO",
        travel: "Viajes ✈️✨", travelText: "Patitas pequeñas. Nuevos lugares.",
        playtime: "Hora de jugar 🧸💕", playtimeText: "Mi actividad seria favorita.",
        fashion: "Moda 👗💕", fashionText: "Un poco de rosa. Mucho Miso.",
        london: "Londres 🇬🇧💙", londonText: "Mi ciudad. Mis pequeñas aventuras.",
        friends: "Amigos 💕🐾", friendsText: "Las aventuras son mejores juntos.",
        diaryKicker: "Del diario de Miso ♥ ✨",
        diaryTitle: "UN PERRO PEQUEÑO.<br>UNA IDEA MUY GRANDE. ✨",
        diaryLead: "Creo que todo empezó conmigo. 💕",
        diary1: "Cuando llegué, mi familia de repente tuvo toda una nueva lista de preguntas.",
        diaryNote: "¿Adónde podemos ir juntos?<br>¿Qué cafés me recibirán?<br>¿Qué hoteles realmente aman a las mascotas?<br>¿Dónde podemos pasear, viajar y conocer nuevos amigos?",
        diary2: "Un perro diminuto — y de repente el mundo parecía completamente diferente.",
        diary3: "Empezamos a buscar lugares, descubrir nuevas rutas y recopilar respuestas útiles.",
        diary4: "Cada paseo se convirtió en una pequeña investigación. Cada viaje trajo otro descubrimiento. Cada nuevo lugar nos dio algo útil para recordar.",
        diary5: "Quizá así comenzó PETS & DOGUE. ♥",
        pull: "Un perro pequeño.<br>Un mundo muy grande. 🌍✨",
        seaKicker: "Miso explora ✨", seaTitle: "El mar 🌊", seaText: "Nuevos olores.<br>Nuevos sonidos.<br>Un gran mundo. 💙",
        londonKicker: "Mi Londres ♥ ✨", londonTitle: "MI CIUDAD —<br>LONDRES",
        londonFeature: "Miso en Londres 💙", londonFeatureSub: "Patitas pequeñas. Gran ciudad. 🎀✨",
        london1: "Londres nunca se siente exactamente igual dos veces. ♥",
        london2: "Un parque hoy. 🌳<br>Un pequeño café mañana. ☕<br>Después el río, un mercado, un autobús rojo 🚌<br>o una calle que nunca había visto.",
        london3: "Me detengo. Miro. Olfateo. Y luego elijo otra dirección. ✨",
        london4: "A veces lo mejor es el destino. A veces es todo lo que descubro por el camino.",
        london5: "Para mí, pasear no es simplemente salir. Es mi forma de descubrir el mundo. 🌍",
        friendKicker: "Hola, nuevo amigo ♥ ✨", friendTitle: "¡ES UN<br>MATCH! 💕",
        friend1: "Hola. Soy Miso Cute.",
        friend2: "Soy diminuta, dulce, curiosa y siempre estoy interesada en conocer a alguien nuevo.",
        friend3: "Algunas aventuras están hechas para explorar. Otras para compartir. 🐾",
        friend4: "Una cara nueva. Un pequeño hola. Y a veces — un nuevo amigo.",
        friend5: "Lo mejor de una nueva aventura es no saber nunca a quién puedes conocer. ♥",
        everyoneKicker: "Todos están invitados ♥ ✨",
        everyoneTitle: "HAY SITIO<br>PARA TODOS.",
        animals: "🐶 Perros, 🐱 gatos, 🦜 loros, 🐰 conejos, 🐴 caballos, 🐢 tortugas, cobayas, 🐠 peces, 🐦 aves y reptiles.",
        everyone1: "Grandes. Pequeños. Esponjosos. Con plumas. Lisos.",
        everyone2: "Algunos tienen patas. Otros alas. Otros aletas.",
        everyone3: "Algunos quieren correr a nuestro lado. Otros prefieren un rincón cálido y tranquilo. Algunos observan todo el mundo desde una rama, un acuario o su ventana favorita.",
        everyone4: "Todos son bienvenidos aquí. ♥ 🌍✨",
        everyone5: "No tenemos que parecernos para pertenecer al mismo mundo.",
        everyone6: "Ese es precisamente el punto.",
        everyone7: "PETS & DOGUE trata de los animales — y de las personas que los aman.",
        askKicker: "Departamento de curiosidad ♥ ✨",
        askTitle: "Y SI NECESITAS<br>MI AYUDA...",
        askMark: "Pregunta a mi pequeña nariz curiosa ♥",
        askMarkSub: "Miso sabe dónde buscar. ✨",
        ask1: "¿Necesitas un lugar adonde ir?",
        ask2: "¿Buscas un lugar pet-friendly? 🐾",
        ask3: "¿Planeas un viaje? ✈️",
        ask4: "¿Buscas algo útil?",
        ask5: "Miro. Olfateo. Exploro. ✨",
        ask6: "Y cuando encuentro algo interesante, lo llevo a PETS & DOGUE.",
        ask7: "Para eso sirve una pequeña nariz curiosa. ♥",
        askLabel: "Preguntar a Miso ✨",
        finalKicker: "Nos vemos en algún lugar del mundo ✨",
        finalTitle: "NOS VEMOS<br>AHÍ FUERA.",
        finalBlue: "Un mundo.<br>Cada mascota. 🌍",
        final1: "Hoy quizá nos encontremos en Londres. Mañana — junto al mar.",
        final2: "Tal vez en un parque, una cafetería o en algún lugar completamente inesperado.",
        final3: "Si ves a una diminuta rubia esponjosa explorando muy seriamente un lugar nuevo — ven a saludar. 💕",
        final4: "Y si por ahora estamos lejos, busca mi pequeño círculo en PETS & DOGUE.",
        final5: "De una forma u otra, nos encontraremos. ♥",
        signature: "Con amor,<br>Miso ♥",
        tagline: "Un mundo. Cada mascota. ♥",
        issueLink: "← Edición 01",
        home: "Inicio"
      },      it: {
        coverKicker: "PETS & DOGUE · NUMERO 01 · STORIA DI COPERTINA ✨",
        coverMeet: "Incontra",
        coverBlue: "Piccole zampe.<br>Grande mondo. ✨",
        coverText: "Una minuscola Pomerania bionda di Londra, con un nasino curioso e un mondo enorme da scoprire.",
        backIssue: "← Torna al Numero 01",
        helloKicker: "Ciao, nuovo amico ♥ ✨",
        helloTitle: "Ciao, sono",
        helloText: "Piccola, soffice, bionda e vivo a Londra. Amo i bei posti, le lunghe passeggiate, la moda e conoscere nuovi amici.",
        profileKicker: "Il profilo di Miso ✨",
        profileTitle: "PICCOLO CANE.<br>GRANDE PERSONALITÀ.",
        profileSub: "Pomerania · Londra · molto compatta.",
        breed: "Razza", breedValue: "Pomerania",
        city: "Città", cityValue: "Londra",
        size: "Taglia", sizeValue: "Minuscola",
        coat: "Pelo", coatValue: "Biondo, morbido e soffice",
        personality: "Personalità", personalityValue: "Dolce e curiosa",
        loves: "Ama", lovesValue: "Passeggiate e viaggi",
        weakness: "Debolezza", weaknessValue: "Premietti",
        looking: "Cerca", lookingValue: "Nuovi amici",
        swipe: "Scorrere a destra?",
        match: "È un match! ♥ ✨",
        favourites: "I preferiti di Miso ♥ ✨",
        world: "IL MIO PICCOLO<br>MONDO",
        travel: "Viaggi ✈️✨", travelText: "Piccole zampe. Nuovi posti.",
        playtime: "Gioco 🧸💕", playtimeText: "La mia attività seria preferita.",
        fashion: "Moda 👗💕", fashionText: "Un po’ di rosa. Tantissima Miso.",
        london: "Londra 🇬🇧💙", londonText: "La mia città. Le mie piccole avventure.",
        friends: "Amici 💕🐾", friendsText: "Le avventure sono più belle insieme.",
        diaryKicker: "Dal diario di Miso ♥ ✨",
        diaryTitle: "UN PICCOLO CANE.<br>UN’IDEA MOLTO GRANDE. ✨",
        diaryLead: "Credo che tutto sia iniziato con me. 💕",
        diary1: "Quando sono arrivata, la mia famiglia si è ritrovata improvvisamente con una lista completamente nuova di domande.",
        diaryNote: "Dove possiamo andare insieme?<br>Quali caffè mi accoglieranno?<br>Quali hotel amano davvero gli animali?<br>Dove possiamo passeggiare, viaggiare e incontrare nuovi amici?",
        diary2: "Un cane minuscolo — e improvvisamente il mondo sembrava completamente diverso.",
        diary3: "Abbiamo iniziato a cercare luoghi, scoprire nuovi percorsi e raccogliere risposte utili.",
        diary4: "Ogni passeggiata è diventata una piccola indagine. Ogni viaggio portava una nuova scoperta. Ogni nuovo posto ci dava qualcosa di utile da ricordare.",
        diary5: "Forse è così che è iniziato PETS & DOGUE. ♥",
        pull: "Un piccolo cane.<br>Un mondo molto grande. 🌍✨",
        seaKicker: "Miso esplora ✨", seaTitle: "Il mare 🌊", seaText: "Nuovi profumi.<br>Nuovi suoni.<br>Grande mondo. 💙",
        londonKicker: "La mia Londra ♥ ✨", londonTitle: "LA MIA CITTÀ —<br>LONDRA",
        londonFeature: "Miso a Londra 💙", londonFeatureSub: "Piccole zampe. Grande città. 🎀✨",
        london1: "Londra non sembra mai esattamente la stessa due volte. ♥",
        london2: "Un parco oggi. 🌳<br>Un piccolo caffè domani. ☕<br>Poi il fiume, un mercato, un autobus rosso 🚌<br>o una strada che non ho mai visto.",
        london3: "Mi fermo. Guardo. Annuso. Poi scelgo un’altra direzione. ✨",
        london4: "A volte la parte migliore è la destinazione. A volte è tutto ciò che noto lungo il percorso.",
        london5: "Per me una passeggiata non significa semplicemente uscire. È così che scopro il mondo. 🌍",
        friendKicker: "Ciao, nuovo amico ♥ ✨", friendTitle: "È UN<br>MATCH! 💕",
        friend1: "Ciao. Sono Miso Cute.",
        friend2: "Sono minuscola, dolce, curiosa e sempre felice di conoscere qualcuno di nuovo.",
        friend3: "Alcune avventure sono fatte per esplorare. Altre per essere condivise. 🐾",
        friend4: "Un nuovo volto. Un piccolo ciao. E a volte — un nuovo amico.",
        friend5: "La parte migliore di una nuova avventura è non sapere mai chi potresti incontrare. ♥",
        everyoneKicker: "Tutti sono invitati ♥ ✨",
        everyoneTitle: "C’È POSTO<br>PER TUTTI.",
        animals: "🐶 Cani, 🐱 gatti, 🦜 pappagalli, 🐰 conigli, 🐴 cavalli, 🐢 tartarughe, porcellini d’India, 🐠 pesci, 🐦 uccelli e rettili.",
        everyone1: "Grandi. Piccoli. Soffici. Piumati. Lisci.",
        everyone2: "Alcuni hanno zampe. Alcuni ali. Alcuni pinne.",
        everyone3: "Alcuni vogliono correre accanto a noi. Altri preferiscono un angolo caldo e tranquillo. Alcuni osservano il mondo da un ramo, un acquario o dalla loro finestra preferita.",
        everyone4: "Qui sono tutti benvenuti. ♥ 🌍✨",
        everyone5: "Non dobbiamo essere uguali per appartenere allo stesso mondo.",
        everyone6: "È proprio questo il punto.",
        everyone7: "PETS & DOGUE parla degli animali — e delle persone che li amano.",
        askKicker: "Dipartimento curiosità ♥ ✨",
        askTitle: "E SE HAI<br>BISOGNO DEL MIO AIUTO...",
        askMark: "Chiedi al mio piccolo naso curioso ♥",
        askMarkSub: "Miso sa dove cercare. ✨",
        ask1: "Hai bisogno di un posto dove andare?",
        ask2: "Cerchi un luogo pet-friendly? 🐾",
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
        final2: "Forse in un parco, un caffè o in un posto completamente inaspettato.",
        final3: "Se vedi una minuscola bionda soffice che esplora molto seriamente un posto nuovo — vieni a salutarmi. 💕",
        final4: "E se per ora siamo lontani, cerca il mio piccolo cerchio su PETS & DOGUE.",
        final5: "In un modo o nell’altro, ci incontreremo. ♥",
        signature: "Con amore,<br>Miso ♥",
        tagline: "Un mondo. Ogni animale. ♥",
        issueLink: "← Numero 01",
        home: "Home"
      }
    }
  };

  function normalizeLanguage(value) {
    let lang = String(value || "")
      .trim()
      .toLowerCase()
      .replace("_", "-")
      .split("-")[0];

    lang = ALIASES[lang] || lang;

    return SUPPORTED.includes(lang) ? lang : "en";
  }

  function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("lang");

    if (fromUrl) {
      const lang = normalizeLanguage(fromUrl);

      try {
        localStorage.setItem(STORE_KEY, lang);
        localStorage.setItem("language", lang);
        localStorage.setItem("lang", lang);
      } catch (_) {}

      return lang;
    }

    try {
      const stored =
        localStorage.getItem(STORE_KEY) ||
        localStorage.getItem("language") ||
        localStorage.getItem("lang");

      if (stored) return normalizeLanguage(stored);
    } catch (_) {}

    return "en";
  }

  function saveLanguage(lang) {
    lang = normalizeLanguage(lang);

    try {
      localStorage.setItem(STORE_KEY, lang);
      localStorage.setItem("language", lang);
      localStorage.setItem("lang", lang);
    } catch (_) {}

    return lang;
  }

  function getStoryName() {
    const bodyStory =
      document.body &&
      (
        document.body.dataset.story ||
        document.body.getAttribute("data-story")
      );

    if (bodyStory && STORIES[bodyStory]) {
      return bodyStory;
    }

    const path = window.location.pathname.toLowerCase();

    if (path.includes("miso")) return "miso";
    if (path.includes("pablo")) return "pablo";
    if (path.includes("richie") || path.includes("pi")) return "richie-pi";
    if (path.includes("jessica")) return "jessica";

    return null;
  }

  function getDictionary(storyName, lang) {
    const story = STORIES[storyName];

    if (!story) return null;

    return story[lang] || story.en || null;
  }

  function setDocumentLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL.has(lang) ? "rtl" : "ltr";

    if (document.body) {
      document.body.classList.toggle("is-rtl", RTL.has(lang));
    }
  }

  function applyText(dictionary) {
    if (!dictionary) return;

    document.querySelectorAll("[data-story-i18n]").forEach(function (node) {
      const key = node.getAttribute("data-story-i18n");

      if (
        key &&
        Object.prototype.hasOwnProperty.call(dictionary, key)
      ) {
        node.innerHTML = dictionary[key];
      }
    });

    document
      .querySelectorAll("[data-story-i18n-placeholder]")
      .forEach(function (node) {
        const key = node.getAttribute("data-story-i18n-placeholder");

        if (
          key &&
          Object.prototype.hasOwnProperty.call(dictionary, key)
        ) {
          node.setAttribute("placeholder", dictionary[key]);
        }
      });

    document
      .querySelectorAll("[data-story-i18n-aria]")
      .forEach(function (node) {
        const key = node.getAttribute("data-story-i18n-aria");

        if (
          key &&
          Object.prototype.hasOwnProperty.call(dictionary, key)
        ) {
          node.setAttribute("aria-label", dictionary[key]);
        }
      });
  }

  function decorateInternalLink(link, lang) {
    const rawHref = link.getAttribute("href");

    if (
      !rawHref ||
      rawHref.startsWith("#") ||
      rawHref.startsWith("mailto:") ||
      rawHref.startsWith("tel:") ||
      rawHref.startsWith("javascript:")
    ) {
      return;
    }

    let url;

    try {
      url = new URL(rawHref, window.location.href);
    } catch (_) {
      return;
    }

    if (url.origin !== window.location.origin) return;

    url.searchParams.set("lang", lang);

    link.setAttribute(
      "href",
      url.pathname + url.search + url.hash
    );
  }

  function updateLinks(lang) {
    document.querySelectorAll("a[href]").forEach(function (link) {
      decorateInternalLink(link, lang);
    });
  }

  function updateLanguageControls(lang) {
    document
      .querySelectorAll(
        "[data-lang], [data-language], select[name='language'], #languageSelect"
      )
      .forEach(function (control) {
        if (control.tagName === "SELECT") {
          const wanted = normalizeLanguage(lang);

          Array.from(control.options).some(function (option) {
            if (normalizeLanguage(option.value) === wanted) {
              control.value = option.value;
              return true;
            }

            return false;
          });

          return;
        }

        const controlLang =
          control.getAttribute("data-lang") ||
          control.getAttribute("data-language");

        if (controlLang) {
          control.classList.toggle(
            "is-active",
            normalizeLanguage(controlLang) === lang
          );
        }
      });
  }

  function applyLanguage(requestedLanguage) {
    const lang = saveLanguage(requestedLanguage);
    const storyName = getStoryName();

    setDocumentLanguage(lang);

    if (storyName) {
      const dictionary = getDictionary(storyName, lang);
      applyText(dictionary);
    }

    updateLinks(lang);
    updateLanguageControls(lang);

    window.PETSDOGUE_LANGUAGE = lang;

    document.dispatchEvent(
      new CustomEvent("petsdogue:languagechange", {
        detail: { language: lang }
      })
    );

    return lang;
  }

  function languageFromElement(element) {
    if (!element) return null;

    if (element.matches("select")) {
      return normalizeLanguage(element.value);
    }

    const value =
      element.getAttribute("data-lang") ||
      element.getAttribute("data-language") ||
      element.value;

    return value ? normalizeLanguage(value) : null;
  }

  document.addEventListener("click", function (event) {
    const languageControl = event.target.closest(
      "[data-lang], [data-language]"
    );

    if (languageControl) {
      const lang = languageFromElement(languageControl);

      if (lang) {
        applyLanguage(lang);
      }
    }

    const link = event.target.closest("a[href]");

    if (link) {
      const lang = getLanguage();
      decorateInternalLink(link, lang);
    }
  });

  document.addEventListener("change", function (event) {
    const control = event.target;

    if (
      control &&
      control.matches(
        "select[data-lang], select[data-language], select[name='language'], #languageSelect"
      )
    ) {
      const lang = languageFromElement(control);

      if (lang) {
        applyLanguage(lang);
      }
    }
  });

  window.addEventListener("storage", function (event) {
    if (
      event.key === STORE_KEY ||
      event.key === "language" ||
      event.key === "lang"
    ) {
      applyLanguage(event.newValue || "en");
    }
  });

  window.PETSDOGUE_STORIES_I18N = {
    applyLanguage: applyLanguage,
    getLanguage: getLanguage,
    normalizeLanguage: normalizeLanguage,
    stories: STORIES
  };

  function init() {
    applyLanguage(getLanguage());

    const observer = new MutationObserver(function () {
      const lang = getLanguage();
      const storyName = getStoryName();

      if (storyName) {
        applyText(getDictionary(storyName, lang));
      }

      updateLinks(lang);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }
})();
