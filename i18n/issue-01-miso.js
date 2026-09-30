/*
=========================================================
PETS & DOGUE — ISSUE 01 / MISO
LOCAL TRANSLATIONS
FREE / STATIC / NO API

Works with:
- issue-01-miso.html
- pets-dogue-shell.js
- translations.js

Language source:
- pets_dogue_language
- petsdogue:languagechange

IMPORTANT:
- PETS & DOGUE is never translated
- Miso is never translated
- Miso Cute is never translated
- RTL is preserved for Arabic
=========================================================
*/

(function(){

"use strict";

const STORAGE_KEY = "pets_dogue_language";

const ALIASES = {
  ua:"uk",
  cz:"cs",
  gr:"el",
  se:"sv",
  dk:"da"
};

const RTL_LANGUAGES = new Set(["ar"]);

/*
=========================================================
TRANSLATIONS
=========================================================
*/

const T = {

/* =====================================================
   ENGLISH
===================================================== */

en:{

"page.kicker":"PETS & DOGUE · ISSUE 01 · COVER STAR",

"hero.eyebrow":"THE STORY BEHIND THE COVER",

"hero.title":"Meet Miso",

"hero.subtitle":"The little blonde Pomeranian behind a very big idea.",

"hero.alt":"Miso, the blonde Pomeranian and PETS & DOGUE cover star",

"intro.dropcap":"M",

"intro.p1":"Miso may be tiny, but she has never lived a small life. Curious, expressive and always ready for the next adventure, this little blonde Pomeranian became the inspiration behind PETS & DOGUE.",

"intro.p2":"She loves travelling, discovering beautiful places, meeting people and, of course, fashion. But what makes Miso unforgettable is not simply how she looks. It is the personality behind those bright eyes — confident, affectionate, funny and completely her own.",

"intro.p3":"This is the story of the little dog who helped inspire a whole new world for pets and the people who love them.",

"chapter1.kicker":"CHAPTER ONE",

"chapter1.title":"A very small dog<br>with a very big personality",

"chapter1.p1":"From the beginning, Miso was impossible to overlook. She wanted to know what was happening, where everyone was going and whether she could come too.",

"chapter1.p2":"Her size never seemed particularly important to her. A new street, a hotel lobby, a park, a café or an unfamiliar city could all become part of her world within minutes.",

"chapter1.p3":"That curiosity became one of the qualities that would later define PETS & DOGUE: the belief that life with an animal does not have to become smaller. It can become richer, more interesting and more connected.",

"chapter1.alt1":"Miso exploring outdoors",

"chapter1.alt2":"Miso looking curiously at the world around her",

"quote1.text":"Small enough to carry.<br>Curious enough to go everywhere.",

"quote1.credit":"— MISO'S WORLD",

"chapter2.kicker":"LIFE WITH MISO",

"chapter2.title":"The little explorer",

"chapter2.p1":"Miso loves discovering new places. For her, a walk is rarely just a walk. There are new smells to investigate, people to observe, streets to explore and places worth remembering.",

"chapter2.p2":"Travelling with her also revealed something important: finding genuinely pet-friendly places is not always simple. Some places welcome animals warmly. Others have unclear rules. Sometimes the most useful information comes from another pet owner who has already been there.",

"chapter2.p3":"Those everyday experiences helped shape one of the central ideas behind PETS & DOGUE — creating a world where pet owners can discover places, information and communities that make life together easier.",

"chapter2.alt1":"Miso enjoying a day out",

"chapter2.alt2":"Miso travelling and discovering a new place",

"chapter2.alt3":"Miso on one of her adventures",

"chapter3.kicker":"HER STYLE",

"chapter3.title":"Fashion, but always Miso",

"chapter3.p1":"Miso has a wardrobe that reflects her personality: playful, feminine and impossible to take too seriously.",

"chapter3.p2":"A pink dress, a tiny bow or a carefully chosen accessory can transform an ordinary walk into a little occasion. Yet the clothes never create the character. Miso does that all by herself.",

"chapter3.p3":"For PETS & DOGUE, pet fashion is not about turning animals into objects. It is about celebrating personality, comfort, creativity and the joyful relationship people have with the animals they love.",

"chapter3.alt1":"Miso wearing one of her signature pink outfits",

"chapter3.alt2":"Miso dressed for a day out",

"chapter3.alt3":"Miso showing her playful sense of style",

"quote2.text":"The outfit may be pink.<br>The attitude is entirely her own.",

"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"THE BEGINNING",

"chapter4.title":"How one little dog<br>inspired something bigger",

"chapter4.p1":"PETS & DOGUE did not begin with the idea of creating another traditional pet publication.",

"chapter4.p2":"It began with real life: travelling with a pet, searching for welcoming places, taking photographs, sharing stories, discovering useful services and meeting people whose animals are an essential part of their families.",

"chapter4.p3":"Miso became the thread connecting those experiences. Through her came the idea for a digital lifestyle platform where pets are not a small category hidden somewhere at the edge of human life. They are part of the story.",

"chapter4.p4":"That idea became PETS & DOGUE.",

"chapter4.alt1":"Miso, whose adventures inspired PETS & DOGUE",

"chapter4.alt2":"Miso enjoying life in the city",

"chapter5.kicker":"BEHIND THE NAME",

"chapter5.title":"Miso Cute",

"chapter5.p1":"There is another name closely connected with Miso's story: Miso Cute.",

"chapter5.p2":"It captures something simple about her — the combination of sweetness, humour and unmistakable character that makes people stop, smile and remember her.",

"chapter5.p3":"But behind the cute photographs is a real little personality: independent when she wants to be, affectionate when she chooses, observant, adventurous and very clear about what she likes.",

"chapter5.alt1":"Miso posing for a photograph",

"chapter5.alt2":"Miso Cute — the personality behind the photographs",

"chapter6.kicker":"MORE THAN A COVER STAR",

"chapter6.title":"A small ambassador<br>for a bigger world",

"chapter6.p1":"Miso is the first PETS & DOGUE cover star, but her role in this story goes much further than a photograph on a cover.",

"chapter6.p2":"She represents the reason this platform exists: because animals are companions, family members, travellers, personalities and participants in our everyday lives.",

"chapter6.p3":"Through PETS & DOGUE, that world can grow — from pet-friendly places and wellness to fashion, photography, community, help, stories and opportunities for pet owners everywhere.",

"chapter6.p4":"One world. Every pet.",

"chapter6.alt1":"Miso, PETS & DOGUE Issue 01 cover star",

"chapter6.alt2":"Miso representing the PETS & DOGUE community",

"ending.kicker":"PETS & DOGUE · ISSUE 01",

"ending.title":"And this is only<br>the beginning",

"ending.p1":"Miso's story opened the first chapter. Now PETS & DOGUE belongs to every animal with a story worth sharing and every person whose world became better because an animal became part of it.",

"ending.p2":"There are many more stories waiting.",

"ending.signature":"With love, Miso ♡",

"ending.alt":"Miso at the end of her PETS & DOGUE cover story",

"nav.back":"BACK TO ISSUE 01",

"nav.next":"NEXT STORY",

"share.label":"SHARE THIS STORY",

"share.copy":"COPY LINK",

"share.copied":"LINK COPIED",

"audio.play":"Listen to this story",

"audio.pause":"Pause narration",

"audio.stop":"Stop narration",

"audio.unsupported":"Text-to-speech is not available in this browser."

},

/* =====================================================
   UKRAINIAN
===================================================== */

uk:{

"page.kicker":"PETS & DOGUE · ВИПУСК 01 · ЗІРКА ОБКЛАДИНКИ",

"hero.eyebrow":"ІСТОРІЯ ОБКЛАДИНКИ",

"hero.title":"Знайомтеся — Miso",

"hero.subtitle":"Маленька білява померанська собачка, з якої почалася дуже велика ідея.",

"hero.alt":"Miso — білява померанська собачка та зірка обкладинки PETS & DOGUE",

"intro.dropcap":"M",

"intro.p1":"Miso зовсім крихітна, але її життя ніколи не було маленьким. Допитлива, виразна й завжди готова до нової пригоди, ця маленька білява померанська собачка стала натхненням для PETS & DOGUE.",

"intro.p2":"Вона любить подорожувати, відкривати красиві місця, знайомитися з людьми і, звичайно, моду. Але Miso запам'ятовується не лише своєю зовнішністю. Найголовніше — характер за цими яскравими очима: упевнений, ніжний, веселий і абсолютно неповторний.",

"intro.p3":"Це історія маленької собачки, яка допомогла надихнути на створення цілого нового світу для тварин і людей, які їх люблять.",

"chapter1.kicker":"РОЗДІЛ ПЕРШИЙ",

"chapter1.title":"Дуже маленька собачка<br>з дуже великим характером",

"chapter1.p1":"Від самого початку Miso неможливо було не помітити. Вона хотіла знати, що відбувається, куди всі йдуть і чи може вона піти разом із ними.",

"chapter1.p2":"Її власний розмір, здається, ніколи особливо її не хвилював. Нова вулиця, хол готелю, парк, кафе чи незнайоме місто — за кілька хвилин усе це могло стати частиною її світу.",

"chapter1.p3":"Саме ця допитливість згодом стала однією з ідей PETS & DOGUE: життя з твариною не повинно ставати меншим. Воно може стати багатшим, цікавішим і більш наповненим.",

"chapter1.alt1":"Miso досліджує світ на прогулянці",

"chapter1.alt2":"Miso з цікавістю спостерігає за світом навколо",

"quote1.text":"Досить маленька, щоб носити на руках.<br>Досить допитлива, щоб побувати всюди.",

"quote1.credit":"— СВІТ MISO",

"chapter2.kicker":"ЖИТТЯ З MISO",

"chapter2.title":"Маленька дослідниця",

"chapter2.p1":"Miso обожнює відкривати нові місця. Для неї прогулянка рідко буває просто прогулянкою. Завжди є нові запахи, люди, за якими цікаво спостерігати, нові вулиці та місця, які варто запам'ятати.",

"chapter2.p2":"Подорожі з нею також показали дещо важливе: знайти справді pet-friendly місця не завжди просто. Десь тварин зустрічають із радістю, десь правила незрозумілі, а іноді найкорисніша інформація надходить від іншого власника тварини, який уже там побував.",

"chapter2.p3":"Саме такий повсякденний досвід допоміг сформувати одну з головних ідей PETS & DOGUE — створити світ, де власники тварин можуть знаходити місця, інформацію та спільноти, які роблять спільне життя простішим.",

"chapter2.alt1":"Miso насолоджується прогулянкою",

"chapter2.alt2":"Miso подорожує та відкриває нове місце",

"chapter2.alt3":"Miso під час однієї зі своїх пригод",

"chapter3.kicker":"ЇЇ СТИЛЬ",

"chapter3.title":"Мода, але завжди Miso",

"chapter3.p1":"Гардероб Miso відображає її характер: грайливий, жіночний і з почуттям гумору.",

"chapter3.p2":"Рожева сукня, маленький бантик або вдало підібраний аксесуар можуть перетворити звичайну прогулянку на маленьку подію. Але одяг ніколи не створює її характер. Це Miso чудово робить сама.",

"chapter3.p3":"Для PETS & DOGUE мода для тварин — це не про перетворення їх на предмети. Це про характер, комфорт, творчість і радісні стосунки між людьми та тваринами, яких вони люблять.",

"chapter3.alt1":"Miso в одному зі своїх фірмових рожевих образів",

"chapter3.alt2":"Miso вбрана для прогулянки",

"chapter3.alt3":"Miso демонструє свій грайливий стиль",

"quote2.text":"Сукня може бути рожевою.<br>Характер — виключно її власний.",

"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"ПОЧАТОК",

"chapter4.title":"Як одна маленька собачка<br>надихнула на щось більше",

"chapter4.p1":"PETS & DOGUE починався не з ідеї створити ще одне традиційне видання про тварин.",

"chapter4.p2":"Усе почалося зі справжнього життя: подорожей із твариною, пошуку місць, де їй раді, фотографій, історій, корисних сервісів і знайомств із людьми, для яких тварини є невід'ємною частиною родини.",

"chapter4.p3":"Miso стала ниткою, яка поєднала всі ці враження. Завдяки їй народилася ідея цифрової lifestyle-платформи, де тварини — не маленька категорія десь на краю людського життя. Вони є частиною самої історії.",

"chapter4.p4":"Так з'явився PETS & DOGUE.",

"chapter4.alt1":"Miso, чиї пригоди надихнули PETS & DOGUE",

"chapter4.alt2":"Miso насолоджується життям у місті",

"chapter5.kicker":"ІСТОРІЯ ІМЕНІ",

"chapter5.title":"Miso Cute",

"chapter5.p1":"З історією Miso тісно пов'язане ще одне ім'я — Miso Cute.",

"chapter5.p2":"У ньому є щось дуже просте й дуже схоже на неї: поєднання ніжності, гумору та неповторного характеру, через який люди зупиняються, усміхаються й запам'ятовують її.",

"chapter5.p3":"Але за милими фотографіями стоїть справжня маленька особистість: незалежна, коли їй цього хочеться, ніжна, коли вона сама обирає, уважна, смілива й дуже чітка у своїх уподобаннях.",

"chapter5.alt1":"Miso позує для фотографії",

"chapter5.alt2":"Miso Cute — характер за фотографіями",

"chapter6.kicker":"БІЛЬШЕ, НІЖ ЗІРКА ОБКЛАДИНКИ",

"chapter6.title":"Маленька амбасадорка<br>великого світу",

"chapter6.p1":"Miso — перша зірка обкладинки PETS & DOGUE, але її роль у цій історії значно більша за фотографію на обкладинці.",

"chapter6.p2":"Вона уособлює саму причину існування цієї платформи: тварини — це компаньйони, члени родини, мандрівники, особистості та учасники нашого повсякденного життя.",

"chapter6.p3":"З PETS & DOGUE цей світ може зростати — від pet-friendly місць і wellness до моди, фотографії, спільноти, допомоги, історій та нових можливостей для власників тварин у всьому світі.",

"chapter6.p4":"One world. Every pet.",

"chapter6.alt1":"Miso — зірка обкладинки PETS & DOGUE Issue 01",

"chapter6.alt2":"Miso представляє спільноту PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · ВИПУСК 01",

"ending.title":"І це лише<br>початок",

"ending.p1":"Історія Miso відкрила перший розділ. Тепер PETS & DOGUE належить кожній тварині, чия історія варта того, щоб нею поділитися, і кожній людині, чий світ став кращим завдяки появі в ньому тварини.",

"ending.p2":"Попереду ще багато історій.",

"ending.signature":"З любов'ю, Miso ♡",

"ending.alt":"Miso наприкінці своєї історії для PETS & DOGUE",

"nav.back":"НАЗАД ДО ВИПУСКУ 01",

"nav.next":"НАСТУПНА ІСТОРІЯ",

"share.label":"ПОДІЛИТИСЯ ІСТОРІЄЮ",

"share.copy":"КОПІЮВАТИ ПОСИЛАННЯ",

"share.copied":"ПОСИЛАННЯ СКОПІЙОВАНО",

"audio.play":"Прослухати цю історію",

"audio.pause":"Призупинити озвучення",

"audio.stop":"Зупинити озвучення",

"audio.unsupported":"Озвучення тексту недоступне в цьому браузері."

},

/* =====================================================
   RUSSIAN
===================================================== */

ru:{

"page.kicker":"PETS & DOGUE · ВЫПУСК 01 · ЗВЕЗДА ОБЛОЖКИ",

"hero.eyebrow":"ИСТОРИЯ ОБЛОЖКИ",

"hero.title":"Знакомьтесь — Miso",

"hero.subtitle":"Маленькая белокурая померанская собачка, с которой началась очень большая идея.",

"hero.alt":"Miso — белокурая померанская собачка и звезда обложки PETS & DOGUE",

"intro.dropcap":"M",

"intro.p1":"Miso совсем крошечная, но её жизнь никогда не была маленькой. Любопытная, выразительная и всегда готовая к следующему приключению, эта маленькая белокурая померанская собачка стала вдохновением для PETS & DOGUE.",

"intro.p2":"Она любит путешествовать, открывать красивые места, знакомиться с людьми и, конечно, моду. Но Miso запоминается не только своей внешностью. Главное — характер за этими яркими глазами: уверенный, ласковый, весёлый и совершенно неповторимый.",

"intro.p3":"Это история маленькой собачки, которая помогла вдохновить на создание целого нового мира для животных и людей, которые их любят.",

"chapter1.kicker":"ГЛАВА ПЕРВАЯ",

"chapter1.title":"Очень маленькая собачка<br>с очень большим характером",

"chapter1.p1":"С самого начала Miso невозможно было не заметить. Она хотела знать, что происходит, куда все идут и может ли она отправиться вместе с ними.",

"chapter1.p2":"Её собственный размер, кажется, никогда особенно её не волновал. Новая улица, холл отеля, парк, кафе или незнакомый город — за несколько минут всё это могло стать частью её мира.",

"chapter1.p3":"Именно это любопытство позже стало одной из идей PETS & DOGUE: жизнь с животным не должна становиться меньше. Она может стать богаче, интереснее и наполненнее.",

"chapter1.alt1":"Miso исследует мир во время прогулки",

"chapter1.alt2":"Miso с любопытством наблюдает за окружающим миром",

"quote1.text":"Достаточно маленькая, чтобы носить на руках.<br>Достаточно любопытная, чтобы побывать везде.",

"quote1.credit":"— МИР MISO",

"chapter2.kicker":"ЖИЗНЬ С MISO",

"chapter2.title":"Маленькая исследовательница",

"chapter2.p1":"Miso обожает открывать новые места. Для неё прогулка редко бывает просто прогулкой. Всегда есть новые запахи, люди, за которыми интересно наблюдать, улицы, которые хочется исследовать, и места, которые стоит запомнить.",

"chapter2.p2":"Путешествия с ней также показали кое-что важное: найти действительно pet-friendly места не всегда просто. Где-то животных встречают с радостью, где-то правила неясны, а иногда самая полезная информация приходит от другого владельца животного, который уже там побывал.",

"chapter2.p3":"Именно такой повседневный опыт помог сформировать одну из главных идей PETS & DOGUE — создать мир, где владельцы животных могут находить места, информацию и сообщества, которые делают совместную жизнь проще.",

"chapter2.alt1":"Miso наслаждается прогулкой",

"chapter2.alt2":"Miso путешествует и открывает новое место",

"chapter2.alt3":"Miso во время одного из своих приключений",

"chapter3.kicker":"ЕЁ СТИЛЬ",

"chapter3.title":"Мода, но всегда Miso",

"chapter3.p1":"Гардероб Miso отражает её характер: игривый, женственный и с чувством юмора.",

"chapter3.p2":"Розовое платье, маленький бантик или удачно подобранный аксессуар могут превратить обычную прогулку в маленькое событие. Но одежда никогда не создаёт её характер. Это Miso прекрасно делает сама.",

"chapter3.p3":"Для PETS & DOGUE мода для животных — не о превращении их в предметы. Это способ подчеркнуть индивидуальность, комфорт, творчество и радостную связь людей с животными, которых они любят.",

"chapter3.alt1":"Miso в одном из своих фирменных розовых образов",

"chapter3.alt2":"Miso нарядилась для прогулки",

"chapter3.alt3":"Miso демонстрирует свой игривый стиль",

"quote2.text":"Платье может быть розовым.<br>Характер — исключительно её собственный.",

"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"НАЧАЛО",

"chapter4.title":"Как одна маленькая собачка<br>вдохновила на нечто большее",

"chapter4.p1":"PETS & DOGUE начинался не с идеи создать ещё одно традиционное издание о животных.",

"chapter4.p2":"Всё началось с реальной жизни: путешествий с питомцем, поиска мест, где ему рады, фотографий, историй, полезных сервисов и знакомств с людьми, для которых животные являются неотъемлемой частью семьи.",

"chapter4.p3":"Miso стала нитью, соединившей все эти впечатления. Благодаря ей появилась идея цифровой lifestyle-платформы, где животные — не маленькая категория где-то на краю человеческой жизни. Они являются частью самой истории.",

"chapter4.p4":"Так появился PETS & DOGUE.",

"chapter4.alt1":"Miso, чьи приключения вдохновили PETS & DOGUE",

"chapter4.alt2":"Miso наслаждается жизнью в городе",

"chapter5.kicker":"ИСТОРИЯ ИМЕНИ",

"chapter5.title":"Miso Cute",

"chapter5.p1":"С историей Miso тесно связано ещё одно имя — Miso Cute.",

"chapter5.p2":"В нём есть что-то очень простое и очень похожее на неё: сочетание нежности, юмора и неповторимого характера, из-за которого люди останавливаются, улыбаются и запоминают её.",

"chapter5.p3":"Но за милыми фотографиями стоит настоящая маленькая личность: независимая, когда ей этого хочется, ласковая, когда она сама выбирает, наблюдательная, смелая и очень хорошо знающая, что ей нравится.",

"chapter5.alt1":"Miso позирует для фотографии",

"chapter5.alt2":"Miso Cute — характер за фотографиями",

"chapter6.kicker":"БОЛЬШЕ, ЧЕМ ЗВЕЗДА ОБЛОЖКИ",

"chapter6.title":"Маленький амбассадор<br>большого мира",

"chapter6.p1":"Miso — первая звезда обложки PETS & DOGUE, но её роль в этой истории намного больше фотографии на обложке.",

"chapter6.p2":"Она олицетворяет саму причину существования этой платформы: животные — это компаньоны, члены семьи, путешественники, личности и участники нашей повседневной жизни.",

"chapter6.p3":"С PETS & DOGUE этот мир может расти — от pet-friendly мест и wellness до моды, фотографии, сообщества, помощи, историй и новых возможностей для владельцев животных во всём мире.",

"chapter6.p4":"One world. Every pet.",

"chapter6.alt1":"Miso — звезда обложки PETS & DOGUE Issue 01",

"chapter6.alt2":"Miso представляет сообщество PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · ВЫПУСК 01",

"ending.title":"И это только<br>начало",

"ending.p1":"История Miso открыла первую главу. Теперь PETS & DOGUE принадлежит каждому животному, чьей историей стоит поделиться, и каждому человеку, чей мир стал лучше благодаря появлению в нём животного.",

"ending.p2":"Впереди ещё много историй.",

"ending.signature":"С любовью, Miso ♡",

"ending.alt":"Miso в завершении своей истории для PETS & DOGUE",

"nav.back":"НАЗАД К ВЫПУСКУ 01",

"nav.next":"СЛЕДУЮЩАЯ ИСТОРИЯ",

"share.label":"ПОДЕЛИТЬСЯ ИСТОРИЕЙ",

"share.copy":"КОПИРОВАТЬ ССЫЛКУ",

"share.copied":"ССЫЛКА СКОПИРОВАНА",

"audio.play":"Прослушать эту историю",

"audio.pause":"Приостановить озвучивание",

"audio.stop":"Остановить озвучивание",

"audio.unsupported":"Озвучивание текста недоступно в этом браузере."

},/* =====================================================
   FRENCH
===================================================== */

fr:{

"page.kicker":"PETS & DOGUE · ÉDITION 01 · STAR DE COUVERTURE",

"hero.eyebrow":"L'HISTOIRE DERRIÈRE LA COUVERTURE",

"hero.title":"Voici Miso",

"hero.subtitle":"La petite Poméranienne blonde à l'origine d'une très grande idée.",

"hero.alt":"Miso, la Poméranienne blonde et star de couverture de PETS & DOGUE",

"intro.dropcap":"M",

"intro.p1":"Miso est peut-être minuscule, mais elle n'a jamais vécu une petite vie. Curieuse, expressive et toujours prête pour une nouvelle aventure, cette petite Poméranienne blonde est devenue l'inspiration de PETS & DOGUE.",

"intro.p2":"Elle adore voyager, découvrir de beaux endroits, rencontrer des gens et, bien sûr, la mode. Mais ce qui rend Miso inoubliable n'est pas simplement son apparence. C'est la personnalité derrière ces yeux brillants — confiante, affectueuse, drôle et absolument unique.",

"intro.p3":"Voici l'histoire de la petite chienne qui a contribué à inspirer tout un nouvel univers pour les animaux et les personnes qui les aiment.",

"chapter1.kicker":"CHAPITRE UN",

"chapter1.title":"Une toute petite chienne<br>avec une très grande personnalité",

"chapter1.p1":"Dès le début, il était impossible de ne pas remarquer Miso. Elle voulait savoir ce qui se passait, où tout le monde allait et si elle pouvait venir aussi.",

"chapter1.p2":"Sa taille ne lui a jamais semblé particulièrement importante. Une nouvelle rue, le hall d'un hôtel, un parc, un café ou une ville inconnue pouvaient tous faire partie de son univers en quelques minutes.",

"chapter1.p3":"Cette curiosité est devenue plus tard l'une des idées qui définissent PETS & DOGUE : vivre avec un animal ne signifie pas que la vie doit devenir plus petite. Elle peut devenir plus riche, plus intéressante et plus connectée.",

"chapter1.alt1":"Miso explore le monde en plein air",

"chapter1.alt2":"Miso observe avec curiosité le monde qui l'entoure",

"quote1.text":"Assez petite pour être portée.<br>Assez curieuse pour aller partout.",

"quote1.credit":"— LE MONDE DE MISO",

"chapter2.kicker":"LA VIE AVEC MISO",

"chapter2.title":"La petite exploratrice",

"chapter2.p1":"Miso adore découvrir de nouveaux endroits. Pour elle, une promenade est rarement une simple promenade. Il y a de nouvelles odeurs à découvrir, des personnes à observer, des rues à explorer et des lieux à retenir.",

"chapter2.p2":"Voyager avec elle a également révélé quelque chose d'important : trouver des endroits réellement pet-friendly n'est pas toujours simple. Certains accueillent chaleureusement les animaux, d'autres ont des règles peu claires. Parfois, les informations les plus utiles viennent d'un autre propriétaire d'animal qui y est déjà allé.",

"chapter2.p3":"Ces expériences quotidiennes ont contribué à façonner l'une des idées centrales de PETS & DOGUE — créer un monde où les propriétaires d'animaux peuvent découvrir des lieux, des informations et des communautés qui facilitent leur vie ensemble.",

"chapter2.alt1":"Miso profite d'une journée à l'extérieur",

"chapter2.alt2":"Miso voyage et découvre un nouvel endroit",

"chapter2.alt3":"Miso pendant l'une de ses aventures",

"chapter3.kicker":"SON STYLE",

"chapter3.title":"La mode, mais toujours Miso",

"chapter3.p1":"Miso possède une garde-robe qui reflète sa personnalité : ludique, féminine et impossible à prendre trop au sérieux.",

"chapter3.p2":"Une robe rose, un petit nœud ou un accessoire soigneusement choisi peuvent transformer une promenade ordinaire en une petite occasion spéciale. Pourtant, les vêtements ne créent jamais le personnage. Miso s'en charge parfaitement toute seule.",

"chapter3.p3":"Pour PETS & DOGUE, la mode pour animaux ne consiste pas à transformer les animaux en objets. Il s'agit de célébrer la personnalité, le confort, la créativité et la relation joyeuse entre les personnes et les animaux qu'elles aiment.",

"chapter3.alt1":"Miso dans l'une de ses tenues roses emblématiques",

"chapter3.alt2":"Miso habillée pour une sortie",

"chapter3.alt3":"Miso montre son style ludique",

"quote2.text":"La tenue est peut-être rose.<br>L'attitude, elle, n'appartient qu'à elle.",

"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"LE COMMENCEMENT",

"chapter4.title":"Comment une petite chienne<br>a inspiré quelque chose de plus grand",

"chapter4.p1":"PETS & DOGUE n'est pas né de l'idée de créer une nouvelle publication traditionnelle consacrée aux animaux.",

"chapter4.p2":"Tout a commencé dans la vraie vie : voyager avec un animal, chercher des endroits accueillants, prendre des photos, partager des histoires, découvrir des services utiles et rencontrer des personnes dont les animaux font partie intégrante de leur famille.",

"chapter4.p3":"Miso est devenue le fil conducteur reliant toutes ces expériences. Grâce à elle est née l'idée d'une plateforme lifestyle numérique où les animaux ne sont pas une petite catégorie cachée à la périphérie de la vie humaine. Ils font partie de l'histoire.",

"chapter4.p4":"Cette idée est devenue PETS & DOGUE.",

"chapter4.alt1":"Miso, dont les aventures ont inspiré PETS & DOGUE",

"chapter4.alt2":"Miso profite de la vie en ville",

"chapter5.kicker":"DERRIÈRE LE NOM",

"chapter5.title":"Miso Cute",

"chapter5.p1":"Un autre nom est étroitement lié à l'histoire de Miso : Miso Cute.",

"chapter5.p2":"Il exprime quelque chose de simple à son sujet — cette combinaison de douceur, d'humour et de caractère incomparable qui fait que les gens s'arrêtent, sourient et se souviennent d'elle.",

"chapter5.p3":"Mais derrière les jolies photos se cache une véritable petite personnalité : indépendante quand elle le souhaite, affectueuse quand elle le décide, attentive, aventureuse et très claire sur ce qu'elle aime.",

"chapter5.alt1":"Miso pose pour une photo",

"chapter5.alt2":"Miso Cute — la personnalité derrière les photographies",

"chapter6.kicker":"BIEN PLUS QU'UNE STAR DE COUVERTURE",

"chapter6.title":"Une petite ambassadrice<br>pour un monde plus grand",

"chapter6.p1":"Miso est la première star de couverture de PETS & DOGUE, mais son rôle dans cette histoire va bien au-delà d'une photographie en couverture.",

"chapter6.p2":"Elle représente la raison même pour laquelle cette plateforme existe : les animaux sont des compagnons, des membres de la famille, des voyageurs, des personnalités et des participants à notre vie quotidienne.",

"chapter6.p3":"Grâce à PETS & DOGUE, cet univers peut grandir — des lieux pet-friendly et du bien-être à la mode, la photographie, la communauté, l'aide, les histoires et les opportunités pour les propriétaires d'animaux partout dans le monde.",

"chapter6.p4":"One world. Every pet.",

"chapter6.alt1":"Miso, star de couverture de PETS & DOGUE Issue 01",

"chapter6.alt2":"Miso représente la communauté PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · ÉDITION 01",

"ending.title":"Et ce n'est que<br>le début",

"ending.p1":"L'histoire de Miso a ouvert le premier chapitre. Désormais, PETS & DOGUE appartient à chaque animal dont l'histoire mérite d'être racontée et à chaque personne dont le monde est devenu meilleur parce qu'un animal en fait partie.",

"ending.p2":"De nombreuses autres histoires nous attendent.",

"ending.signature":"Avec amour, Miso ♡",

"ending.alt":"Miso à la fin de son histoire de couverture PETS & DOGUE",

"nav.back":"RETOUR À L'ÉDITION 01",

"nav.next":"HISTOIRE SUIVANTE",

"share.label":"PARTAGER CETTE HISTOIRE",

"share.copy":"COPIER LE LIEN",

"share.copied":"LIEN COPIÉ",

"audio.play":"Écouter cette histoire",

"audio.pause":"Mettre la narration en pause",

"audio.stop":"Arrêter la narration",

"audio.unsupported":"La synthèse vocale n'est pas disponible dans ce navigateur."

},

/* =====================================================
   GERMAN
===================================================== */

de:{

"page.kicker":"PETS & DOGUE · AUSGABE 01 · COVER STAR",

"hero.eyebrow":"DIE GESCHICHTE HINTER DEM COVER",

"hero.title":"Das ist Miso",

"hero.subtitle":"Die kleine blonde Zwergspitz-Hündin hinter einer sehr großen Idee.",

"hero.alt":"Miso, die blonde Zwergspitz-Hündin und Cover Star von PETS & DOGUE",

"intro.dropcap":"M",

"intro.p1":"Miso mag winzig sein, doch sie hat nie ein kleines Leben geführt. Neugierig, ausdrucksstark und immer bereit für das nächste Abenteuer wurde diese kleine blonde Zwergspitz-Hündin zur Inspiration für PETS & DOGUE.",

"intro.p2":"Sie liebt es zu reisen, schöne Orte zu entdecken, Menschen kennenzulernen und natürlich Mode. Doch was Miso unvergesslich macht, ist nicht nur ihr Aussehen. Es ist die Persönlichkeit hinter diesen leuchtenden Augen — selbstbewusst, liebevoll, lustig und vollkommen einzigartig.",

"intro.p3":"Dies ist die Geschichte des kleinen Hundes, der dazu beitrug, eine ganz neue Welt für Tiere und die Menschen, die sie lieben, zu inspirieren.",

"chapter1.kicker":"KAPITEL EINS",

"chapter1.title":"Ein sehr kleiner Hund<br>mit einer sehr großen Persönlichkeit",

"chapter1.p1":"Von Anfang an war Miso unmöglich zu übersehen. Sie wollte wissen, was geschah, wohin alle gingen und ob sie mitkommen durfte.",

"chapter1.p2":"Ihre Größe schien für sie selbst nie besonders wichtig zu sein. Eine neue Straße, eine Hotellobby, ein Park, ein Café oder eine unbekannte Stadt konnten innerhalb weniger Minuten Teil ihrer Welt werden.",

"chapter1.p3":"Diese Neugier wurde später zu einer der Ideen, die PETS & DOGUE prägen: Das Leben mit einem Tier muss nicht kleiner werden. Es kann reicher, interessanter und verbundener werden.",

"chapter1.alt1":"Miso erkundet draußen die Welt",

"chapter1.alt2":"Miso beobachtet neugierig die Welt um sich herum",

"quote1.text":"Klein genug, um getragen zu werden.<br>Neugierig genug, um überallhin zu gehen.",

"quote1.credit":"— MISOS WELT",

"chapter2.kicker":"LEBEN MIT MISO",

"chapter2.title":"Die kleine Entdeckerin",

"chapter2.p1":"Miso liebt es, neue Orte zu entdecken. Für sie ist ein Spaziergang selten nur ein Spaziergang. Es gibt neue Gerüche zu untersuchen, Menschen zu beobachten, Straßen zu erkunden und Orte, die man sich merken sollte.",

"chapter2.p2":"Das Reisen mit ihr zeigte auch etwas Wichtiges: Wirklich tierfreundliche Orte zu finden, ist nicht immer einfach. Manche Orte heißen Tiere herzlich willkommen, andere haben unklare Regeln. Manchmal stammen die hilfreichsten Informationen von einem anderen Tierhalter, der bereits dort gewesen ist.",

"chapter2.p3":"Diese alltäglichen Erfahrungen halfen dabei, eine der zentralen Ideen von PETS & DOGUE zu formen — eine Welt zu schaffen, in der Tierhalter Orte, Informationen und Gemeinschaften entdecken können, die das gemeinsame Leben einfacher machen.",

"chapter2.alt1":"Miso genießt einen Tag unterwegs",

"chapter2.alt2":"Miso reist und entdeckt einen neuen Ort",

"chapter2.alt3":"Miso auf einem ihrer Abenteuer",

"chapter3.kicker":"IHR STIL",

"chapter3.title":"Mode, aber immer Miso",

"chapter3.p1":"Miso hat eine Garderobe, die ihre Persönlichkeit widerspiegelt: verspielt, feminin und mit einem Augenzwinkern.",

"chapter3.p2":"Ein rosa Kleid, eine kleine Schleife oder ein sorgfältig ausgewähltes Accessoire können einen gewöhnlichen Spaziergang in einen kleinen besonderen Anlass verwandeln. Doch die Kleidung erschafft niemals den Charakter. Das erledigt Miso ganz von selbst.",

"chapter3.p3":"Bei PETS & DOGUE geht es bei Tiermode nicht darum, Tiere zu Objekten zu machen. Es geht darum, Persönlichkeit, Komfort, Kreativität und die freudige Beziehung zwischen Menschen und den Tieren, die sie lieben, zu feiern.",

"chapter3.alt1":"Miso in einem ihrer typischen rosa Outfits",

"chapter3.alt2":"Miso für einen Ausflug gekleidet",

"chapter3.alt3":"Miso zeigt ihren verspielten Stil",

"quote2.text":"Das Outfit mag rosa sein.<br>Die Haltung gehört ganz allein ihr.",

"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"DER ANFANG",

"chapter4.title":"Wie ein kleiner Hund<br>etwas Größeres inspirierte",

"chapter4.p1":"PETS & DOGUE begann nicht mit der Idee, eine weitere traditionelle Tierpublikation zu schaffen.",

"chapter4.p2":"Es begann mit dem echten Leben: Reisen mit einem Haustier, die Suche nach einladenden Orten, Fotografieren, Geschichten teilen, nützliche Angebote entdecken und Menschen kennenlernen, deren Tiere ein wesentlicher Teil ihrer Familien sind.",

"chapter4.p3":"Miso wurde zum roten Faden, der all diese Erfahrungen miteinander verband. Durch sie entstand die Idee einer digitalen Lifestyle-Plattform, auf der Tiere keine kleine Kategorie irgendwo am Rand des menschlichen Lebens sind. Sie sind Teil der Geschichte.",

"chapter4.p4":"Aus dieser Idee wurde PETS & DOGUE.",

"chapter4.alt1":"Miso, deren Abenteuer PETS & DOGUE inspirierten",

"chapter4.alt2":"Miso genießt das Leben in der Stadt",

"chapter5.kicker":"HINTER DEM NAMEN",

"chapter5.title":"Miso Cute",

"chapter5.p1":"Ein weiterer Name ist eng mit Misos Geschichte verbunden: Miso Cute.",

"chapter5.p2":"Er beschreibt etwas Einfaches an ihr — die Mischung aus Niedlichkeit, Humor und unverwechselbarem Charakter, die Menschen innehalten, lächeln und sich an sie erinnern lässt.",

"chapter5.p3":"Doch hinter den süßen Fotos steckt eine echte kleine Persönlichkeit: unabhängig, wenn sie es möchte, liebevoll, wenn sie es entscheidet, aufmerksam, abenteuerlustig und sehr eindeutig darin, was ihr gefällt.",

"chapter5.alt1":"Miso posiert für ein Foto",

"chapter5.alt2":"Miso Cute — die Persönlichkeit hinter den Fotografien",

"chapter6.kicker":"MEHR ALS EIN COVER STAR",

"chapter6.title":"Eine kleine Botschafterin<br>für eine größere Welt",

"chapter6.p1":"Miso ist der erste Cover Star von PETS & DOGUE, doch ihre Rolle in dieser Geschichte geht weit über ein Foto auf einem Cover hinaus.",

"chapter6.p2":"Sie steht für den Grund, warum diese Plattform existiert: Tiere sind Begleiter, Familienmitglieder, Reisende, Persönlichkeiten und Teilnehmer unseres täglichen Lebens.",

"chapter6.p3":"Mit PETS & DOGUE kann diese Welt wachsen — von tierfreundlichen Orten und Wellness bis hin zu Mode, Fotografie, Community, Hilfe, Geschichten und Möglichkeiten für Tierhalter überall auf der Welt.",

"chapter6.p4":"One world. Every pet.",

"chapter6.alt1":"Miso, Cover Star der PETS & DOGUE Issue 01",

"chapter6.alt2":"Miso repräsentiert die PETS & DOGUE Community",

"ending.kicker":"PETS & DOGUE · AUSGABE 01",

"ending.title":"Und das ist erst<br>der Anfang",

"ending.p1":"Misos Geschichte eröffnete das erste Kapitel. Jetzt gehört PETS & DOGUE jedem Tier mit einer Geschichte, die es wert ist, erzählt zu werden, und jedem Menschen, dessen Welt besser wurde, weil ein Tier Teil davon geworden ist.",

"ending.p2":"Viele weitere Geschichten warten bereits.",

"ending.signature":"Mit Liebe, Miso ♡",

"ending.alt":"Miso am Ende ihrer PETS & DOGUE Cover Story",

"nav.back":"ZURÜCK ZU AUSGABE 01",

"nav.next":"NÄCHSTE GESCHICHTE",

"share.label":"DIESE GESCHICHTE TEILEN",

"share.copy":"LINK KOPIEREN",

"share.copied":"LINK KOPIERT",

"audio.play":"Diese Geschichte anhören",

"audio.pause":"Sprachausgabe pausieren",

"audio.stop":"Sprachausgabe stoppen",

"audio.unsupported":"Die Sprachausgabe ist in diesem Browser nicht verfügbar."

},

/* =====================================================
   SPANISH
===================================================== */

es:{

"page.kicker":"PETS & DOGUE · EDICIÓN 01 · ESTRELLA DE PORTADA",

"hero.eyebrow":"LA HISTORIA DETRÁS DE LA PORTADA",

"hero.title":"Conoce a Miso",

"hero.subtitle":"La pequeña Pomerania rubia detrás de una idea muy grande.",

"hero.alt":"Miso, la Pomerania rubia y estrella de portada de PETS & DOGUE",

"intro.dropcap":"M",

"intro.p1":"Miso puede ser diminuta, pero nunca ha vivido una vida pequeña. Curiosa, expresiva y siempre preparada para la próxima aventura, esta pequeña Pomerania rubia se convirtió en la inspiración de PETS & DOGUE.",

"intro.p2":"Le encanta viajar, descubrir lugares bonitos, conocer gente y, por supuesto, la moda. Pero lo que hace inolvidable a Miso no es simplemente su aspecto. Es la personalidad detrás de esos ojos brillantes: segura, cariñosa, divertida y completamente única.",

"intro.p3":"Esta es la historia de la pequeña perrita que ayudó a inspirar todo un nuevo mundo para las mascotas y las personas que las aman.",

"chapter1.kicker":"CAPÍTULO UNO",

"chapter1.title":"Una perrita muy pequeña<br>con una personalidad enorme",

"chapter1.p1":"Desde el principio era imposible no fijarse en Miso. Quería saber qué estaba pasando, adónde iba todo el mundo y si ella también podía ir.",

"chapter1.p2":"Su tamaño nunca pareció importarle demasiado. Una calle nueva, el vestíbulo de un hotel, un parque, una cafetería o una ciudad desconocida podían convertirse en parte de su mundo en cuestión de minutos.",

"chapter1.p3":"Esa curiosidad se convirtió más tarde en una de las ideas que definen PETS & DOGUE: vivir con un animal no significa que la vida tenga que hacerse más pequeña. Puede hacerse más rica, más interesante y más conectada.",

"chapter1.alt1":"Miso explorando el mundo al aire libre",

"chapter1.alt2":"Miso observando con curiosidad el mundo que la rodea",

"quote1.text":"Lo bastante pequeña para llevarla en brazos.<br>Lo bastante curiosa para ir a todas partes.",

"quote1.credit":"— EL MUNDO DE MISO",

"chapter2.kicker":"LA VIDA CON MISO",

"chapter2.title":"La pequeña exploradora",

"chapter2.p1":"A Miso le encanta descubrir lugares nuevos. Para ella, un paseo rara vez es simplemente un paseo. Hay nuevos olores que investigar, personas que observar, calles que explorar y lugares que merece la pena recordar.",

"chapter2.p2":"Viajar con ella también reveló algo importante: encontrar lugares realmente pet-friendly no siempre es sencillo. Algunos reciben a los animales con los brazos abiertos. Otros tienen normas poco claras. A veces, la información más útil procede de otro dueño de mascota que ya ha estado allí.",

"chapter2.p3":"Estas experiencias cotidianas ayudaron a dar forma a una de las ideas centrales de PETS & DOGUE: crear un mundo donde los dueños de mascotas puedan descubrir lugares, información y comunidades que hagan más fácil la vida juntos.",

"chapter2.alt1":"Miso disfrutando de un día fuera",

"chapter2.alt2":"Miso viajando y descubriendo un lugar nuevo",

"chapter2.alt3":"Miso en una de sus aventuras",

"chapter3.kicker":"SU ESTILO",

"chapter3.title":"Moda, pero siempre Miso",

"chapter3.p1":"Miso tiene un armario que refleja su personalidad: juguetón, femenino e imposible de tomarse demasiado en serio.",

"chapter3.p2":"Un vestido rosa, un pequeño lazo o un accesorio cuidadosamente elegido pueden convertir un paseo normal en una pequeña ocasión especial. Sin embargo, la ropa nunca crea el carácter. Miso se encarga de eso por sí sola.",

"chapter3.p3":"Para PETS & DOGUE, la moda para mascotas no consiste en convertir a los animales en objetos. Se trata de celebrar la personalidad, la comodidad, la creatividad y la alegre relación que las personas tienen con los animales que aman.",

"chapter3.alt1":"Miso con uno de sus característicos conjuntos rosas",

"chapter3.alt2":"Miso vestida para salir",

"chapter3.alt3":"Miso mostrando su divertido sentido del estilo",

"quote2.text":"El conjunto puede ser rosa.<br>La actitud es completamente suya.",

"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"EL COMIENZO",

"chapter4.title":"Cómo una pequeña perrita<br>inspiró algo mucho más grande",

"chapter4.p1":"PETS & DOGUE no comenzó con la idea de crear otra publicación tradicional sobre mascotas.",

"chapter4.p2":"Comenzó con la vida real: viajar con una mascota, buscar lugares acogedores, hacer fotografías, compartir historias, descubrir servicios útiles y conocer a personas cuyos animales son una parte esencial de sus familias.",

"chapter4.p3":"Miso se convirtió en el hilo que conectaba todas esas experiencias. A través de ella surgió la idea de una plataforma digital de estilo de vida donde las mascotas no fueran una pequeña categoría escondida en algún rincón de la vida humana. Son parte de la historia.",

"chapter4.p4":"Esa idea se convirtió en PETS & DOGUE.",

"chapter4.alt1":"Miso, cuyas aventuras inspiraron PETS & DOGUE",

"chapter4.alt2":"Miso disfrutando de la vida en la ciudad",

"chapter5.kicker":"DETRÁS DEL NOMBRE",

"chapter5.title":"Miso Cute",

"chapter5.p1":"Hay otro nombre estrechamente relacionado con la historia de Miso: Miso Cute.",

"chapter5.p2":"Resume algo sencillo sobre ella: la combinación de dulzura, humor y un carácter inconfundible que hace que la gente se detenga, sonría y la recuerde.",

"chapter5.p3":"Pero detrás de las fotos bonitas hay una auténtica pequeña personalidad: independiente cuando quiere, cariñosa cuando ella decide, observadora, aventurera y muy clara sobre lo que le gusta.",

"chapter5.alt1":"Miso posando para una fotografía",

"chapter5.alt2":"Miso Cute — la personalidad detrás de las fotografías",

"chapter6.kicker":"MÁS QUE UNA ESTRELLA DE PORTADA",

"chapter6.title":"Una pequeña embajadora<br>de un mundo más grande",

"chapter6.p1":"Miso es la primera estrella de portada de PETS & DOGUE, pero su papel en esta historia va mucho más allá de una fotografía en una portada.",

"chapter6.p2":"Representa la razón por la que existe esta plataforma: los animales son compañeros, miembros de la familia, viajeros, personalidades y participantes de nuestra vida cotidiana.",

"chapter6.p3":"A través de PETS & DOGUE, ese mundo puede crecer: desde lugares pet-friendly y bienestar hasta moda, fotografía, comunidad, ayuda, historias y oportunidades para dueños de mascotas de todo el mundo.",

"chapter6.p4":"One world. Every pet.",

"chapter6.alt1":"Miso, estrella de portada de PETS & DOGUE Issue 01",

"chapter6.alt2":"Miso representando a la comunidad PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · EDICIÓN 01",

"ending.title":"Y esto es solo<br>el comienzo",

"ending.p1":"La historia de Miso abrió el primer capítulo. Ahora PETS & DOGUE pertenece a cada animal con una historia que merece ser compartida y a cada persona cuyo mundo se hizo mejor porque un animal pasó a formar parte de él.",

"ending.p2":"Hay muchas más historias esperando.",

"ending.signature":"Con amor, Miso ♡",

"ending.alt":"Miso al final de su historia de portada para PETS & DOGUE",

"nav.back":"VOLVER A LA EDICIÓN 01",

"nav.next":"SIGUIENTE HISTORIA",

"share.label":"COMPARTIR ESTA HISTORIA",

"share.copy":"COPIAR ENLACE",

"share.copied":"ENLACE COPIADO",

"audio.play":"Escuchar esta historia",

"audio.pause":"Pausar narración",

"audio.stop":"Detener narración",

"audio.unsupported":"La función de texto a voz no está disponible en este navegador."

},/* =====================================================
   ITALIAN
===================================================== */

it:{

"page.kicker":"PETS & DOGUE · EDIZIONE 01 · COVER STAR",

"hero.eyebrow":"LA STORIA DIETRO LA COPERTINA",

"hero.title":"Vi presentiamo Miso",

"hero.subtitle":"La piccola Pomerania bionda dietro una grandissima idea.",

"hero.alt":"Miso, la Pomerania bionda e cover star di PETS & DOGUE",

"intro.dropcap":"M",

"intro.p1":"Miso sarà anche minuscola, ma non ha mai vissuto una vita piccola. Curiosa, espressiva e sempre pronta per la prossima avventura, questa piccola Pomerania bionda è diventata l'ispirazione di PETS & DOGUE.",

"intro.p2":"Ama viaggiare, scoprire luoghi bellissimi, incontrare persone e, naturalmente, la moda. Ma ciò che rende Miso indimenticabile non è semplicemente il suo aspetto. È la personalità dietro quegli occhi luminosi — sicura di sé, affettuosa, divertente e assolutamente unica.",

"intro.p3":"Questa è la storia della piccola cagnolina che ha contribuito a ispirare un mondo completamente nuovo per gli animali e per le persone che li amano.",

"chapter1.kicker":"CAPITOLO UNO",

"chapter1.title":"Una cagnolina piccolissima<br>con una grandissima personalità",

"chapter1.p1":"Fin dall'inizio era impossibile non notare Miso. Voleva sapere cosa stesse succedendo, dove stessero andando tutti e se potesse venire anche lei.",

"chapter1.p2":"Le sue dimensioni non sono mai sembrate particolarmente importanti per lei. Una nuova strada, la hall di un hotel, un parco, un caffè o una città sconosciuta potevano diventare parte del suo mondo in pochi minuti.",

"chapter1.p3":"Questa curiosità è diventata in seguito una delle idee che definiscono PETS & DOGUE: vivere con un animale non significa che la vita debba diventare più piccola. Può diventare più ricca, più interessante e più connessa.",

"chapter1.alt1":"Miso esplora il mondo all'aperto",

"chapter1.alt2":"Miso osserva con curiosità il mondo intorno a lei",

"quote1.text":"Abbastanza piccola da essere portata in braccio.<br>Abbastanza curiosa da andare ovunque.",

"quote1.credit":"— IL MONDO DI MISO",

"chapter2.kicker":"LA VITA CON MISO",

"chapter2.title":"La piccola esploratrice",

"chapter2.p1":"Miso ama scoprire posti nuovi. Per lei una passeggiata raramente è soltanto una passeggiata. Ci sono nuovi profumi da scoprire, persone da osservare, strade da esplorare e luoghi da ricordare.",

"chapter2.p2":"Viaggiare con lei ha anche rivelato qualcosa di importante: trovare luoghi veramente pet-friendly non è sempre semplice. Alcuni accolgono gli animali calorosamente, altri hanno regole poco chiare. A volte le informazioni più utili arrivano da un altro proprietario che è già stato lì.",

"chapter2.p3":"Queste esperienze quotidiane hanno contribuito a formare una delle idee centrali di PETS & DOGUE — creare un mondo in cui i proprietari possano scoprire luoghi, informazioni e community che rendano più semplice la vita insieme ai propri animali.",

"chapter2.alt1":"Miso si gode una giornata fuori",

"chapter2.alt2":"Miso viaggia e scopre un nuovo luogo",

"chapter2.alt3":"Miso durante una delle sue avventure",

"chapter3.kicker":"IL SUO STILE",

"chapter3.title":"Moda, ma sempre Miso",

"chapter3.p1":"Miso ha un guardaroba che riflette la sua personalità: giocoso, femminile e impossibile da prendere troppo sul serio.",

"chapter3.p2":"Un vestito rosa, un piccolo fiocco o un accessorio scelto con cura possono trasformare una normale passeggiata in una piccola occasione speciale. Ma i vestiti non creano mai il carattere. A quello pensa perfettamente Miso da sola.",

"chapter3.p3":"Per PETS & DOGUE, la moda per animali non significa trasformare gli animali in oggetti. Significa celebrare personalità, comfort, creatività e il rapporto gioioso tra le persone e gli animali che amano.",

"chapter3.alt1":"Miso in uno dei suoi caratteristici outfit rosa",

"chapter3.alt2":"Miso vestita per uscire",

"chapter3.alt3":"Miso mostra il suo stile giocoso",

"quote2.text":"L'outfit può essere rosa.<br>L'atteggiamento è tutto suo.",

"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"L'INIZIO",

"chapter4.title":"Come una piccola cagnolina<br>ha ispirato qualcosa di più grande",

"chapter4.p1":"PETS & DOGUE non è nato dall'idea di creare un'altra tradizionale pubblicazione dedicata agli animali.",

"chapter4.p2":"È iniziato dalla vita reale: viaggiare con un animale, cercare luoghi accoglienti, scattare fotografie, condividere storie, scoprire servizi utili e incontrare persone per le quali gli animali sono una parte essenziale della famiglia.",

"chapter4.p3":"Miso è diventata il filo che collegava tutte queste esperienze. Attraverso di lei è nata l'idea di una piattaforma lifestyle digitale in cui gli animali non fossero una piccola categoria nascosta ai margini della vita umana. Sono parte della storia.",

"chapter4.p4":"Quell'idea è diventata PETS & DOGUE.",

"chapter4.alt1":"Miso, le cui avventure hanno ispirato PETS & DOGUE",

"chapter4.alt2":"Miso si gode la vita in città",

"chapter5.kicker":"DIETRO IL NOME",

"chapter5.title":"Miso Cute",

"chapter5.p1":"Un altro nome è strettamente legato alla storia di Miso: Miso Cute.",

"chapter5.p2":"Racchiude qualcosa di semplice su di lei — quella combinazione di dolcezza, umorismo e carattere inconfondibile che fa fermare le persone, sorridere e ricordarsi di lei.",

"chapter5.p3":"Ma dietro le fotografie carine c'è una vera piccola personalità: indipendente quando vuole, affettuosa quando decide lei, attenta, avventurosa e molto chiara su ciò che le piace.",

"chapter5.alt1":"Miso posa per una fotografia",

"chapter5.alt2":"Miso Cute — la personalità dietro le fotografie",

"chapter6.kicker":"PIÙ DI UNA COVER STAR",

"chapter6.title":"Una piccola ambasciatrice<br>per un mondo più grande",

"chapter6.p1":"Miso è la prima cover star di PETS & DOGUE, ma il suo ruolo in questa storia va ben oltre una fotografia in copertina.",

"chapter6.p2":"Rappresenta il motivo per cui questa piattaforma esiste: gli animali sono compagni, membri della famiglia, viaggiatori, personalità e partecipanti alla nostra vita quotidiana.",

"chapter6.p3":"Attraverso PETS & DOGUE questo mondo può crescere — dai luoghi pet-friendly e dal benessere alla moda, fotografia, community, aiuto, storie e opportunità per i proprietari di animali in tutto il mondo.",

"chapter6.p4":"One world. Every pet.",

"chapter6.alt1":"Miso, cover star di PETS & DOGUE Issue 01",

"chapter6.alt2":"Miso rappresenta la community PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · EDIZIONE 01",

"ending.title":"E questo è solo<br>l'inizio",

"ending.p1":"La storia di Miso ha aperto il primo capitolo. Ora PETS & DOGUE appartiene a ogni animale con una storia che merita di essere raccontata e a ogni persona il cui mondo è diventato migliore perché un animale ne è entrato a far parte.",

"ending.p2":"Ci sono molte altre storie che ci aspettano.",

"ending.signature":"Con amore, Miso ♡",

"ending.alt":"Miso alla fine della sua cover story PETS & DOGUE",

"nav.back":"TORNA ALL'EDIZIONE 01",

"nav.next":"STORIA SUCCESSIVA",

"share.label":"CONDIVIDI QUESTA STORIA",

"share.copy":"COPIA LINK",

"share.copied":"LINK COPIATO",

"audio.play":"Ascolta questa storia",

"audio.pause":"Metti in pausa la narrazione",

"audio.stop":"Interrompi la narrazione",

"audio.unsupported":"La sintesi vocale non è disponibile in questo browser."

},

/* =====================================================
   PORTUGUESE
===================================================== */

pt:{

"page.kicker":"PETS & DOGUE · EDIÇÃO 01 · ESTRELA DE CAPA",
"hero.eyebrow":"A HISTÓRIA POR TRÁS DA CAPA",
"hero.title":"Conheça Miso",
"hero.subtitle":"A pequena Lulu da Pomerânia loira por trás de uma ideia muito grande.",
"hero.alt":"Miso, a Lulu da Pomerânia loira e estrela de capa da PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso pode ser minúscula, mas nunca viveu uma vida pequena. Curiosa, expressiva e sempre pronta para a próxima aventura, esta pequena Lulu da Pomerânia loira tornou-se a inspiração da PETS & DOGUE.",
"intro.p2":"Ela adora viajar, descobrir lugares bonitos, conhecer pessoas e, claro, moda. Mas o que torna Miso inesquecível não é apenas a sua aparência. É a personalidade por trás daqueles olhos brilhantes — confiante, carinhosa, divertida e absolutamente única.",
"intro.p3":"Esta é a história da pequena cadela que ajudou a inspirar um mundo totalmente novo para os animais e para as pessoas que os amam.",

"chapter1.kicker":"CAPÍTULO UM",
"chapter1.title":"Uma cadela muito pequena<br>com uma personalidade enorme",
"chapter1.p1":"Desde o início, era impossível não reparar em Miso. Ela queria saber o que estava a acontecer, para onde todos iam e se também podia ir.",
"chapter1.p2":"O seu tamanho nunca pareceu particularmente importante para ela. Uma rua nova, o lobby de um hotel, um parque, um café ou uma cidade desconhecida podiam tornar-se parte do seu mundo em poucos minutos.",
"chapter1.p3":"Essa curiosidade tornou-se mais tarde uma das ideias que definem PETS & DOGUE: viver com um animal não significa que a vida tenha de ficar menor. Pode tornar-se mais rica, interessante e conectada.",
"chapter1.alt1":"Miso explora o mundo ao ar livre",
"chapter1.alt2":"Miso observa curiosamente o mundo à sua volta",

"quote1.text":"Pequena o suficiente para ser levada ao colo.<br>Curiosa o suficiente para ir a qualquer lugar.",
"quote1.credit":"— O MUNDO DE MISO",

"chapter2.kicker":"A VIDA COM MISO",
"chapter2.title":"A pequena exploradora",
"chapter2.p1":"Miso adora descobrir novos lugares. Para ela, um passeio raramente é apenas um passeio. Há novos cheiros para investigar, pessoas para observar, ruas para explorar e lugares para recordar.",
"chapter2.p2":"Viajar com ela também revelou algo importante: encontrar lugares verdadeiramente pet-friendly nem sempre é simples. Alguns recebem os animais calorosamente, outros têm regras pouco claras. Às vezes, a informação mais útil vem de outro tutor que já esteve lá.",
"chapter2.p3":"Essas experiências quotidianas ajudaram a formar uma das ideias centrais da PETS & DOGUE — criar um mundo onde os tutores possam descobrir lugares, informações e comunidades que tornem mais fácil a vida em conjunto.",
"chapter2.alt1":"Miso aproveita um dia fora",
"chapter2.alt2":"Miso viaja e descobre um novo lugar",
"chapter2.alt3":"Miso durante uma das suas aventuras",

"chapter3.kicker":"O SEU ESTILO",
"chapter3.title":"Moda, mas sempre Miso",
"chapter3.p1":"Miso tem um guarda-roupa que reflete a sua personalidade: divertido, feminino e impossível de levar demasiado a sério.",
"chapter3.p2":"Um vestido cor-de-rosa, um pequeno laço ou um acessório cuidadosamente escolhido podem transformar um passeio normal numa pequena ocasião especial. Mas a roupa nunca cria o caráter. Miso trata disso sozinha.",
"chapter3.p3":"Para PETS & DOGUE, moda para animais não significa transformar animais em objetos. Significa celebrar personalidade, conforto, criatividade e a relação alegre entre as pessoas e os animais que amam.",
"chapter3.alt1":"Miso num dos seus característicos looks cor-de-rosa",
"chapter3.alt2":"Miso vestida para sair",
"chapter3.alt3":"Miso mostra o seu estilo divertido",

"quote2.text":"O look pode ser cor-de-rosa.<br>A atitude é inteiramente dela.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"O COMEÇO",
"chapter4.title":"Como uma pequena cadela<br>inspirou algo maior",
"chapter4.p1":"PETS & DOGUE não começou com a ideia de criar mais uma publicação tradicional sobre animais.",
"chapter4.p2":"Começou com a vida real: viajar com um animal, procurar lugares acolhedores, tirar fotografias, partilhar histórias, descobrir serviços úteis e conhecer pessoas cujos animais são uma parte essencial das suas famílias.",
"chapter4.p3":"Miso tornou-se o fio que ligava todas essas experiências. Através dela surgiu a ideia de uma plataforma digital de lifestyle onde os animais não fossem uma pequena categoria escondida na periferia da vida humana. Eles fazem parte da história.",
"chapter4.p4":"Essa ideia tornou-se PETS & DOGUE.",
"chapter4.alt1":"Miso, cujas aventuras inspiraram PETS & DOGUE",
"chapter4.alt2":"Miso aproveita a vida na cidade",

"chapter5.kicker":"POR TRÁS DO NOME",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Outro nome está intimamente ligado à história de Miso: Miso Cute.",
"chapter5.p2":"Resume algo simples sobre ela — aquela combinação de doçura, humor e caráter inconfundível que faz as pessoas parar, sorrir e lembrar-se dela.",
"chapter5.p3":"Mas por trás das fotografias bonitas existe uma verdadeira pequena personalidade: independente quando quer, carinhosa quando decide, atenta, aventureira e muito clara sobre aquilo de que gosta.",
"chapter5.alt1":"Miso posa para uma fotografia",
"chapter5.alt2":"Miso Cute — a personalidade por trás das fotografias",

"chapter6.kicker":"MAIS DO QUE UMA ESTRELA DE CAPA",
"chapter6.title":"Uma pequena embaixadora<br>para um mundo maior",
"chapter6.p1":"Miso é a primeira estrela de capa da PETS & DOGUE, mas o seu papel nesta história vai muito além de uma fotografia numa capa.",
"chapter6.p2":"Ela representa a razão pela qual esta plataforma existe: os animais são companheiros, membros da família, viajantes, personalidades e participantes da nossa vida quotidiana.",
"chapter6.p3":"Através da PETS & DOGUE, esse mundo pode crescer — desde lugares pet-friendly e bem-estar até moda, fotografia, comunidade, ajuda, histórias e oportunidades para tutores em todo o mundo.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, estrela de capa da PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso representa a comunidade PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · EDIÇÃO 01",
"ending.title":"E isto é apenas<br>o começo",
"ending.p1":"A história de Miso abriu o primeiro capítulo. Agora PETS & DOGUE pertence a cada animal com uma história que merece ser contada e a cada pessoa cujo mundo ficou melhor porque um animal passou a fazer parte dele.",
"ending.p2":"Há muitas outras histórias à nossa espera.",
"ending.signature":"Com amor, Miso ♡",
"ending.alt":"Miso no final da sua história de capa PETS & DOGUE",

"nav.back":"VOLTAR À EDIÇÃO 01",
"nav.next":"PRÓXIMA HISTÓRIA",
"share.label":"PARTILHAR ESTA HISTÓRIA",
"share.copy":"COPIAR LINK",
"share.copied":"LINK COPIADO",
"audio.play":"Ouvir esta história",
"audio.pause":"Pausar narração",
"audio.stop":"Parar narração",
"audio.unsupported":"A síntese de voz não está disponível neste navegador."

},

/* =====================================================
   DUTCH
===================================================== */

nl:{

"page.kicker":"PETS & DOGUE · EDITIE 01 · COVERSTER",
"hero.eyebrow":"HET VERHAAL ACHTER DE COVER",
"hero.title":"Maak kennis met Miso",
"hero.subtitle":"De kleine blonde Pomeriaan achter een heel groot idee.",
"hero.alt":"Miso, de blonde Pomeriaan en coverster van PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso mag dan piepklein zijn, ze heeft nooit een klein leven geleid. Nieuwsgierig, expressief en altijd klaar voor het volgende avontuur werd deze kleine blonde Pomeriaan de inspiratie voor PETS & DOGUE.",
"intro.p2":"Ze houdt van reizen, mooie plekken ontdekken, mensen ontmoeten en natuurlijk mode. Maar wat Miso onvergetelijk maakt, is niet alleen hoe ze eruitziet. Het is de persoonlijkheid achter die heldere ogen — zelfverzekerd, liefdevol, grappig en volledig uniek.",
"intro.p3":"Dit is het verhaal van het kleine hondje dat hielp een compleet nieuwe wereld te inspireren voor dieren en de mensen die van hen houden.",

"chapter1.kicker":"HOOFDSTUK ÉÉN",
"chapter1.title":"Een heel klein hondje<br>met een heel grote persoonlijkheid",
"chapter1.p1":"Vanaf het begin was Miso onmogelijk over het hoofd te zien. Ze wilde weten wat er gebeurde, waar iedereen naartoe ging en of zij ook mee mocht.",
"chapter1.p2":"Haar formaat leek voor haarzelf nooit bijzonder belangrijk. Een nieuwe straat, een hotellobby, een park, een café of een onbekende stad kon binnen enkele minuten deel van haar wereld worden.",
"chapter1.p3":"Die nieuwsgierigheid werd later een van de ideeën die PETS & DOGUE definiëren: leven met een dier betekent niet dat het leven kleiner hoeft te worden. Het kan rijker, interessanter en meer verbonden worden.",
"chapter1.alt1":"Miso verkent de wereld buiten",
"chapter1.alt2":"Miso kijkt nieuwsgierig naar de wereld om haar heen",

"quote1.text":"Klein genoeg om gedragen te worden.<br>Nieuwsgierig genoeg om overal heen te gaan.",
"quote1.credit":"— MISO'S WERELD",

"chapter2.kicker":"LEVEN MET MISO",
"chapter2.title":"De kleine ontdekkingsreiziger",
"chapter2.p1":"Miso houdt ervan nieuwe plekken te ontdekken. Voor haar is een wandeling zelden zomaar een wandeling. Er zijn nieuwe geuren om te onderzoeken, mensen om te bekijken, straten om te verkennen en plekken om te onthouden.",
"chapter2.p2":"Reizen met haar liet ook iets belangrijks zien: echt huisdiervriendelijke plekken vinden is niet altijd eenvoudig. Sommige verwelkomen dieren hartelijk, andere hebben onduidelijke regels. Soms komt de nuttigste informatie van een andere huisdiereigenaar die er al is geweest.",
"chapter2.p3":"Deze dagelijkse ervaringen hielpen een van de centrale ideeën van PETS & DOGUE vorm te geven — een wereld creëren waarin huisdiereigenaren plekken, informatie en communities kunnen ontdekken die het leven samen gemakkelijker maken.",
"chapter2.alt1":"Miso geniet van een dagje uit",
"chapter2.alt2":"Miso reist en ontdekt een nieuwe plek",
"chapter2.alt3":"Miso tijdens een van haar avonturen",

"chapter3.kicker":"HAAR STIJL",
"chapter3.title":"Mode, maar altijd Miso",
"chapter3.p1":"Miso heeft een garderobe die haar persoonlijkheid weerspiegelt: speels, vrouwelijk en onmogelijk om al te serieus te nemen.",
"chapter3.p2":"Een roze jurkje, een kleine strik of een zorgvuldig gekozen accessoire kan een gewone wandeling veranderen in een kleine speciale gelegenheid. Maar kleding maakt nooit het karakter. Dat doet Miso helemaal zelf.",
"chapter3.p3":"Voor PETS & DOGUE draait dierenmode niet om dieren tot objecten maken. Het gaat om het vieren van persoonlijkheid, comfort, creativiteit en de vrolijke relatie tussen mensen en de dieren van wie ze houden.",
"chapter3.alt1":"Miso in een van haar kenmerkende roze outfits",
"chapter3.alt2":"Miso gekleed voor een uitstapje",
"chapter3.alt3":"Miso laat haar speelse stijl zien",

"quote2.text":"De outfit mag roze zijn.<br>De houding is helemaal van haar.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"HET BEGIN",
"chapter4.title":"Hoe een klein hondje<br>iets groters inspireerde",
"chapter4.p1":"PETS & DOGUE begon niet met het idee om nog een traditionele dierenpublicatie te maken.",
"chapter4.p2":"Het begon met het echte leven: reizen met een huisdier, gastvrije plekken zoeken, foto's maken, verhalen delen, nuttige diensten ontdekken en mensen ontmoeten voor wie dieren een essentieel onderdeel van het gezin zijn.",
"chapter4.p3":"Miso werd de draad die al deze ervaringen met elkaar verbond. Via haar ontstond het idee voor een digitaal lifestyleplatform waar dieren geen kleine categorie aan de rand van het menselijke leven zijn. Ze maken deel uit van het verhaal.",
"chapter4.p4":"Dat idee werd PETS & DOGUE.",
"chapter4.alt1":"Miso, wier avonturen PETS & DOGUE inspireerden",
"chapter4.alt2":"Miso geniet van het stadsleven",

"chapter5.kicker":"ACHTER DE NAAM",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Een andere naam is nauw verbonden met Miso's verhaal: Miso Cute.",
"chapter5.p2":"Het vat iets eenvoudigs over haar samen — die combinatie van schattigheid, humor en onmiskenbaar karakter waardoor mensen stoppen, glimlachen en haar onthouden.",
"chapter5.p3":"Maar achter de schattige foto's zit een echte kleine persoonlijkheid: onafhankelijk wanneer ze dat wil, liefdevol wanneer zij besluit, oplettend, avontuurlijk en heel duidelijk over wat ze leuk vindt.",
"chapter5.alt1":"Miso poseert voor een foto",
"chapter5.alt2":"Miso Cute — de persoonlijkheid achter de foto's",

"chapter6.kicker":"MEER DAN EEN COVERSTER",
"chapter6.title":"Een kleine ambassadeur<br>voor een grotere wereld",
"chapter6.p1":"Miso is de eerste coverster van PETS & DOGUE, maar haar rol in dit verhaal gaat veel verder dan een foto op een cover.",
"chapter6.p2":"Ze vertegenwoordigt de reden waarom dit platform bestaat: dieren zijn metgezellen, familieleden, reizigers, persoonlijkheden en deelnemers aan ons dagelijks leven.",
"chapter6.p3":"Via PETS & DOGUE kan die wereld groeien — van huisdiervriendelijke plekken en welzijn tot mode, fotografie, community, hulp, verhalen en mogelijkheden voor huisdiereigenaren overal ter wereld.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, coverster van PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso vertegenwoordigt de PETS & DOGUE-community",

"ending.kicker":"PETS & DOGUE · EDITIE 01",
"ending.title":"En dit is nog maar<br>het begin",
"ending.p1":"Miso's verhaal opende het eerste hoofdstuk. Nu behoort PETS & DOGUE toe aan elk dier met een verhaal dat het verdient verteld te worden en aan ieder mens wiens wereld beter werd doordat een dier er deel van uitmaakte.",
"ending.p2":"Er wachten nog veel meer verhalen.",
"ending.signature":"Met liefde, Miso ♡",
"ending.alt":"Miso aan het einde van haar PETS & DOGUE-coververhaal",

"nav.back":"TERUG NAAR EDITIE 01",
"nav.next":"VOLGEND VERHAAL",
"share.label":"DEEL DIT VERHAAL",
"share.copy":"LINK KOPIËREN",
"share.copied":"LINK GEKOPIEERD",
"audio.play":"Luister naar dit verhaal",
"audio.pause":"Vertelling pauzeren",
"audio.stop":"Vertelling stoppen",
"audio.unsupported":"Tekst-naar-spraak is niet beschikbaar in deze browser."

},/* =====================================================
   POLISH
===================================================== */

pl:{

"page.kicker":"PETS & DOGUE · WYDANIE 01 · GWIAZDA OKŁADKI",
"hero.eyebrow":"HISTORIA ZA OKŁADKĄ",
"hero.title":"Poznaj Miso",
"hero.subtitle":"Mała blond pomeranianka, od której zaczęła się wielka idea.",
"hero.alt":"Miso, blond pomeranianka i gwiazda okładki PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso może być maleńka, ale nigdy nie prowadziła małego życia. Ciekawska, pełna ekspresji i zawsze gotowa na kolejną przygodę, ta mała blond pomeranianka stała się inspiracją dla PETS & DOGUE.",
"intro.p2":"Uwielbia podróżować, odkrywać piękne miejsca, poznawać ludzi i oczywiście modę. Ale Miso jest niezapomniana nie tylko ze względu na wygląd. To osobowość kryjąca się za tymi jasnymi oczami — pewna siebie, czuła, zabawna i całkowicie wyjątkowa.",
"intro.p3":"To historia małej suczki, która pomogła zainspirować zupełnie nowy świat dla zwierząt i ludzi, którzy je kochają.",

"chapter1.kicker":"ROZDZIAŁ PIERWSZY",
"chapter1.title":"Bardzo mały pies<br>z ogromną osobowością",
"chapter1.p1":"Od samego początku Miso trudno było nie zauważyć. Chciała wiedzieć, co się dzieje, dokąd wszyscy idą i czy ona również może iść.",
"chapter1.p2":"Jej rozmiar nigdy nie wydawał się dla niej szczególnie ważny. Nowa ulica, hotelowe lobby, park, kawiarnia czy nieznane miasto mogły w kilka minut stać się częścią jej świata.",
"chapter1.p3":"Ta ciekawość stała się później jedną z idei definiujących PETS & DOGUE: życie ze zwierzęciem nie oznacza, że życie musi stać się mniejsze. Może stać się bogatsze, ciekawsze i bardziej połączone.",
"chapter1.alt1":"Miso odkrywa świat na zewnątrz",
"chapter1.alt2":"Miso z ciekawością obserwuje otaczający ją świat",

"quote1.text":"Wystarczająco mała, by nosić ją na rękach.<br>Wystarczająco ciekawska, by dotrzeć wszędzie.",
"quote1.credit":"— ŚWIAT MISO",

"chapter2.kicker":"ŻYCIE Z MISO",
"chapter2.title":"Mała odkrywczyni",
"chapter2.p1":"Miso uwielbia odkrywać nowe miejsca. Dla niej spacer rzadko jest tylko spacerem. Są nowe zapachy do zbadania, ludzie do obserwowania, ulice do odkrycia i miejsca, które warto zapamiętać.",
"chapter2.p2":"Podróżowanie z nią pokazało również coś ważnego: znalezienie naprawdę przyjaznych zwierzętom miejsc nie zawsze jest proste. Niektóre witają zwierzęta z otwartymi ramionami, inne mają niejasne zasady. Czasami najbardziej pomocne informacje pochodzą od innego opiekuna, który już tam był.",
"chapter2.p3":"Te codzienne doświadczenia pomogły ukształtować jedną z głównych idei PETS & DOGUE — stworzenie świata, w którym opiekunowie zwierząt mogą odkrywać miejsca, informacje i społeczności ułatwiające wspólne życie.",
"chapter2.alt1":"Miso spędza dzień poza domem",
"chapter2.alt2":"Miso podróżuje i odkrywa nowe miejsce",
"chapter2.alt3":"Miso podczas jednej ze swoich przygód",

"chapter3.kicker":"JEJ STYL",
"chapter3.title":"Moda, ale zawsze Miso",
"chapter3.p1":"Miso ma garderobę odzwierciedlającą jej osobowość: zabawną, kobiecą i taką, której nie sposób traktować zbyt poważnie.",
"chapter3.p2":"Różowa sukienka, mała kokardka czy starannie dobrany dodatek mogą zmienić zwykły spacer w małą wyjątkową okazję. Ale ubrania nigdy nie tworzą charakteru. Miso doskonale radzi sobie z tym sama.",
"chapter3.p3":"Dla PETS & DOGUE moda dla zwierząt nie polega na zamienianiu ich w przedmioty. Chodzi o celebrowanie osobowości, komfortu, kreatywności i radosnej relacji między ludźmi a zwierzętami, które kochają.",
"chapter3.alt1":"Miso w jednym ze swoich charakterystycznych różowych strojów",
"chapter3.alt2":"Miso ubrana na wyjście",
"chapter3.alt3":"Miso pokazuje swój zabawny styl",

"quote2.text":"Strój może być różowy.<br>Charakter należy tylko do niej.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"POCZĄTEK",
"chapter4.title":"Jak mały pies<br>zainspirował coś większego",
"chapter4.p1":"PETS & DOGUE nie zaczęło się od pomysłu stworzenia kolejnej tradycyjnej publikacji o zwierzętach.",
"chapter4.p2":"Zaczęło się od prawdziwego życia: podróżowania ze zwierzęciem, szukania przyjaznych miejsc, robienia zdjęć, dzielenia się historiami, odkrywania przydatnych usług i poznawania ludzi, dla których zwierzęta są istotną częścią rodziny.",
"chapter4.p3":"Miso stała się nicią łączącą wszystkie te doświadczenia. Dzięki niej narodził się pomysł cyfrowej platformy lifestyle, na której zwierzęta nie są małą kategorią ukrytą na marginesie ludzkiego życia. Są częścią historii.",
"chapter4.p4":"Ten pomysł stał się PETS & DOGUE.",
"chapter4.alt1":"Miso, której przygody zainspirowały PETS & DOGUE",
"chapter4.alt2":"Miso cieszy się życiem w mieście",

"chapter5.kicker":"ZA NAZWĄ",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Z historią Miso ściśle związana jest jeszcze jedna nazwa: Miso Cute.",
"chapter5.p2":"Oddaje coś prostego w jej charakterze — połączenie uroku, humoru i niepowtarzalnej osobowości, które sprawia, że ludzie zatrzymują się, uśmiechają i ją zapamiętują.",
"chapter5.p3":"Ale za uroczymi zdjęciami kryje się prawdziwa mała osobowość: niezależna, kiedy chce, czuła, kiedy sama zdecyduje, uważna, żądna przygód i bardzo pewna tego, co lubi.",
"chapter5.alt1":"Miso pozuje do zdjęcia",
"chapter5.alt2":"Miso Cute — osobowość kryjąca się za zdjęciami",

"chapter6.kicker":"WIĘCEJ NIŻ GWIAZDA OKŁADKI",
"chapter6.title":"Mała ambasadorka<br>większego świata",
"chapter6.p1":"Miso jest pierwszą gwiazdą okładki PETS & DOGUE, ale jej rola w tej historii wykracza daleko poza fotografię na okładce.",
"chapter6.p2":"Reprezentuje powód, dla którego ta platforma istnieje: zwierzęta są towarzyszami, członkami rodziny, podróżnikami, osobowościami i uczestnikami naszego codziennego życia.",
"chapter6.p3":"Dzięki PETS & DOGUE ten świat może się rozwijać — od miejsc przyjaznych zwierzętom i wellness po modę, fotografię, społeczność, pomoc, historie i możliwości dla opiekunów zwierząt na całym świecie.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, gwiazda okładki PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso reprezentuje społeczność PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · WYDANIE 01",
"ending.title":"A to dopiero<br>początek",
"ending.p1":"Historia Miso otworzyła pierwszy rozdział. Teraz PETS & DOGUE należy do każdego zwierzęcia, którego historia zasługuje na opowiedzenie, i do każdej osoby, której świat stał się lepszy, ponieważ pojawiło się w nim zwierzę.",
"ending.p2":"Czeka na nas jeszcze wiele historii.",
"ending.signature":"Z miłością, Miso ♡",
"ending.alt":"Miso na zakończenie swojej historii okładkowej PETS & DOGUE",

"nav.back":"WRÓĆ DO WYDANIA 01",
"nav.next":"NASTĘPNA HISTORIA",
"share.label":"UDOSTĘPNIJ TĘ HISTORIĘ",
"share.copy":"KOPIUJ LINK",
"share.copied":"LINK SKOPIOWANY",
"audio.play":"Posłuchaj tej historii",
"audio.pause":"Wstrzymaj narrację",
"audio.stop":"Zatrzymaj narrację",
"audio.unsupported":"Synteza mowy nie jest dostępna w tej przeglądarce."

},

/* =====================================================
   CZECH
===================================================== */

cs:{

"page.kicker":"PETS & DOGUE · VYDÁNÍ 01 · HVĚZDA OBÁLKY",
"hero.eyebrow":"PŘÍBĚH ZA OBÁLKOU",
"hero.title":"Seznamte se s Miso",
"hero.subtitle":"Malá blonďatá pomeranianka, která stojí za velkým nápadem.",
"hero.alt":"Miso, blonďatá pomeranianka a hvězda obálky PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso je možná maličká, ale nikdy nežila malý život. Zvídavá, výrazná a vždy připravená na další dobrodružství se tato malá blonďatá pomeranianka stala inspirací pro PETS & DOGUE.",
"intro.p2":"Miluje cestování, objevování krásných míst, setkávání s lidmi a samozřejmě módu. Ale Miso není nezapomenutelná jen díky svému vzhledu. Je to osobnost za těmi zářivými očima — sebevědomá, milující, zábavná a naprosto jedinečná.",
"intro.p3":"Toto je příběh malé fenky, která pomohla inspirovat zcela nový svět pro zvířata a lidi, kteří je milují.",

"chapter1.kicker":"KAPITOLA PRVNÍ",
"chapter1.title":"Velmi malý pes<br>s velmi velkou osobností",
"chapter1.p1":"Od samého začátku nebylo možné Miso přehlédnout. Chtěla vědět, co se děje, kam všichni jdou a zda může jít také.",
"chapter1.p2":"Její velikost pro ni nikdy nebyla příliš důležitá. Nová ulice, hotelová hala, park, kavárna nebo neznámé město se během několika minut mohly stát součástí jejího světa.",
"chapter1.p3":"Tato zvídavost se později stala jednou z myšlenek, které definují PETS & DOGUE: život se zvířetem nemusí být menší. Může být bohatší, zajímavější a propojenější.",
"chapter1.alt1":"Miso objevuje svět venku",
"chapter1.alt2":"Miso zvědavě pozoruje svět kolem sebe",

"quote1.text":"Dost malá na to, aby se dala nosit.<br>Dost zvědavá na to, aby šla kamkoli.",
"quote1.credit":"— SVĚT MISO",

"chapter2.kicker":"ŽIVOT S MISO",
"chapter2.title":"Malá průzkumnice",
"chapter2.p1":"Miso miluje objevování nových míst. Pro ni je procházka jen málokdy pouhou procházkou. Jsou tu nové vůně k prozkoumání, lidé k pozorování, ulice k objevování a místa, která stojí za zapamatování.",
"chapter2.p2":"Cestování s ní také ukázalo něco důležitého: najít skutečně pet-friendly místa není vždy jednoduché. Někde zvířata srdečně vítají, jinde jsou pravidla nejasná. Někdy nejcennější informace přinese jiný majitel zvířete, který už místo navštívil.",
"chapter2.p3":"Tyto každodenní zkušenosti pomohly vytvořit jednu z hlavních myšlenek PETS & DOGUE — svět, kde majitelé zvířat mohou objevovat místa, informace a komunity, které usnadňují společný život.",
"chapter2.alt1":"Miso si užívá den venku",
"chapter2.alt2":"Miso cestuje a objevuje nové místo",
"chapter2.alt3":"Miso během jednoho ze svých dobrodružství",

"chapter3.kicker":"JEJÍ STYL",
"chapter3.title":"Móda, ale vždy Miso",
"chapter3.p1":"Miso má šatník, který odráží její osobnost: hravý, ženský a nemožný brát příliš vážně.",
"chapter3.p2":"Růžové šaty, malá mašle nebo pečlivě vybraný doplněk mohou proměnit obyčejnou procházku v malou výjimečnou událost. Oblečení ale charakter nevytváří. O ten se Miso postará sama.",
"chapter3.p3":"Pro PETS & DOGUE není zvířecí móda o tom dělat ze zvířat objekty. Jde o oslavu osobnosti, pohodlí, kreativity a radostného vztahu mezi lidmi a zvířaty, která milují.",
"chapter3.alt1":"Miso v jednom ze svých typických růžových outfitů",
"chapter3.alt2":"Miso oblečená na výlet",
"chapter3.alt3":"Miso ukazuje svůj hravý styl",

"quote2.text":"Oblečení může být růžové.<br>Postoj patří jen jí.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"ZAČÁTEK",
"chapter4.title":"Jak malý pes<br>inspiroval něco většího",
"chapter4.p1":"PETS & DOGUE nezačalo myšlenkou vytvořit další tradiční publikaci o zvířatech.",
"chapter4.p2":"Začalo skutečným životem: cestováním se zvířetem, hledáním přívětivých míst, fotografováním, sdílením příběhů, objevováním užitečných služeb a setkáváním s lidmi, pro které jsou zvířata zásadní součástí rodiny.",
"chapter4.p3":"Miso se stala nití, která všechny tyto zkušenosti spojila. Díky ní vznikla myšlenka digitální lifestyle platformy, kde zvířata nejsou malou kategorií ukrytou na okraji lidského života. Jsou součástí příběhu.",
"chapter4.p4":"Z této myšlenky vzniklo PETS & DOGUE.",
"chapter4.alt1":"Miso, jejíž dobrodružství inspirovala PETS & DOGUE",
"chapter4.alt2":"Miso si užívá život ve městě",

"chapter5.kicker":"ZA JMÉNEM",
"chapter5.title":"Miso Cute",
"chapter5.p1":"S příběhem Miso úzce souvisí ještě jedno jméno: Miso Cute.",
"chapter5.p2":"Vyjadřuje na ní něco jednoduchého — spojení roztomilosti, humoru a nezaměnitelného charakteru, kvůli kterému se lidé zastaví, usmějí a zapamatují si ji.",
"chapter5.p3":"Za roztomilými fotografiemi je však skutečná malá osobnost: nezávislá, když chce, milující, když se sama rozhodne, pozorná, dobrodružná a velmi jasná v tom, co se jí líbí.",
"chapter5.alt1":"Miso pózuje na fotografii",
"chapter5.alt2":"Miso Cute — osobnost za fotografiemi",

"chapter6.kicker":"VÍC NEŽ HVĚZDA OBÁLKY",
"chapter6.title":"Malá ambasadorka<br>většího světa",
"chapter6.p1":"Miso je první hvězdou obálky PETS & DOGUE, ale její role v tomto příběhu sahá mnohem dál než k fotografii na obálce.",
"chapter6.p2":"Představuje důvod, proč tato platforma existuje: zvířata jsou společníci, členové rodiny, cestovatelé, osobnosti a účastníci našeho každodenního života.",
"chapter6.p3":"Prostřednictvím PETS & DOGUE může tento svět růst — od pet-friendly míst a wellness přes módu, fotografii, komunitu, pomoc a příběhy až po příležitosti pro majitele zvířat po celém světě.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, hvězda obálky PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso reprezentuje komunitu PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · VYDÁNÍ 01",
"ending.title":"A to je teprve<br>začátek",
"ending.p1":"Příběh Miso otevřel první kapitolu. Nyní PETS & DOGUE patří každému zvířeti s příběhem, který stojí za vyprávění, a každému člověku, jehož svět se stal lepším díky tomu, že se jeho součástí stalo zvíře.",
"ending.p2":"Čeká na nás mnoho dalších příběhů.",
"ending.signature":"S láskou, Miso ♡",
"ending.alt":"Miso na konci svého příběhu pro PETS & DOGUE",

"nav.back":"ZPĚT NA VYDÁNÍ 01",
"nav.next":"DALŠÍ PŘÍBĚH",
"share.label":"SDÍLET TENTO PŘÍBĚH",
"share.copy":"KOPÍROVAT ODKAZ",
"share.copied":"ODKAZ ZKOPÍROVÁN",
"audio.play":"Poslechnout tento příběh",
"audio.pause":"Pozastavit vyprávění",
"audio.stop":"Zastavit vyprávění",
"audio.unsupported":"Převod textu na řeč není v tomto prohlížeči dostupný."

},

/* =====================================================
   SLOVAK
===================================================== */

sk:{

"page.kicker":"PETS & DOGUE · VYDANIE 01 · HVIEZDA OBÁLKY",
"hero.eyebrow":"PRÍBEH ZA OBÁLKOU",
"hero.title":"Zoznámte sa s Miso",
"hero.subtitle":"Malá blond pomeranianka, ktorá stojí za veľkým nápadom.",
"hero.alt":"Miso, blond pomeranianka a hviezda obálky PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso je možno maličká, ale nikdy nežila malý život. Zvedavá, výrazná a vždy pripravená na ďalšie dobrodružstvo sa táto malá blond pomeranianka stala inšpiráciou pre PETS & DOGUE.",
"intro.p2":"Miluje cestovanie, objavovanie krásnych miest, stretávanie ľudí a, samozrejme, módu. To, čo robí Miso nezabudnuteľnou, však nie je iba jej vzhľad. Je to osobnosť za tými žiarivými očami — sebavedomá, láskavá, zábavná a úplne jedinečná.",
"intro.p3":"Toto je príbeh malej fenky, ktorá pomohla inšpirovať úplne nový svet pre zvieratá a ľudí, ktorí ich milujú.",

"chapter1.kicker":"KAPITOLA PRVÁ",
"chapter1.title":"Veľmi malý psík<br>s veľmi veľkou osobnosťou",
"chapter1.p1":"Od samého začiatku nebolo možné Miso prehliadnuť. Chcela vedieť, čo sa deje, kam všetci idú a či môže ísť tiež.",
"chapter1.p2":"Jej veľkosť pre ňu nikdy nebola zvlášť dôležitá. Nová ulica, hotelová hala, park, kaviareň alebo neznáme mesto sa mohli v priebehu niekoľkých minút stať súčasťou jej sveta.",
"chapter1.p3":"Táto zvedavosť sa neskôr stala jednou z myšlienok, ktoré definujú PETS & DOGUE: život so zvieraťom nemusí byť menší. Môže byť bohatší, zaujímavejší a prepojenejší.",
"chapter1.alt1":"Miso objavuje svet vonku",
"chapter1.alt2":"Miso zvedavo pozoruje svet okolo seba",

"quote1.text":"Dosť malá na nosenie.<br>Dosť zvedavá na to, aby išla kamkoľvek.",
"quote1.credit":"— SVET MISO",

"chapter2.kicker":"ŽIVOT S MISO",
"chapter2.title":"Malá prieskumníčka",
"chapter2.p1":"Miso miluje objavovanie nových miest. Pre ňu je prechádzka málokedy iba prechádzkou. Sú tu nové vône, ľudia na pozorovanie, ulice na objavovanie a miesta, ktoré si treba zapamätať.",
"chapter2.p2":"Cestovanie s ňou tiež ukázalo niečo dôležité: nájsť skutočne pet-friendly miesta nie je vždy jednoduché. Niekde zvieratá srdečne vítajú, inde majú nejasné pravidlá. Niekedy najlepšia informácia pochádza od iného majiteľa, ktorý tam už bol.",
"chapter2.p3":"Tieto každodenné skúsenosti pomohli vytvoriť jednu z hlavných myšlienok PETS & DOGUE — svet, v ktorom môžu majitelia zvierat objavovať miesta, informácie a komunity, ktoré uľahčujú spoločný život.",
"chapter2.alt1":"Miso si užíva deň vonku",
"chapter2.alt2":"Miso cestuje a objavuje nové miesto",
"chapter2.alt3":"Miso počas jedného zo svojich dobrodružstiev",

"chapter3.kicker":"JEJ ŠTÝL",
"chapter3.title":"Móda, ale vždy Miso",
"chapter3.p1":"Miso má šatník, ktorý odráža jej osobnosť: hravý, ženský a nemožné ho brať príliš vážne.",
"chapter3.p2":"Ružové šaty, malá mašľa alebo starostlivo vybraný doplnok môžu zmeniť obyčajnú prechádzku na malú výnimočnú udalosť. Oblečenie však charakter nevytvára. O ten sa Miso postará sama.",
"chapter3.p3":"Pre PETS & DOGUE nie je zvieracia móda o premieňaní zvierat na objekty. Ide o oslavu osobnosti, pohodlia, kreativity a radostného vzťahu medzi ľuďmi a zvieratami, ktoré milujú.",
"chapter3.alt1":"Miso v jednom zo svojich typických ružových outfitov",
"chapter3.alt2":"Miso oblečená na výlet",
"chapter3.alt3":"Miso ukazuje svoj hravý štýl",

"quote2.text":"Oblečenie môže byť ružové.<br>Postoj patrí iba jej.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"ZAČIATOK",
"chapter4.title":"Ako malý psík<br>inšpiroval niečo väčšie",
"chapter4.p1":"PETS & DOGUE nezačalo myšlienkou vytvoriť ďalšiu tradičnú publikáciu o zvieratách.",
"chapter4.p2":"Začalo skutočným životom: cestovaním so zvieraťom, hľadaním prívetivých miest, fotografovaním, zdieľaním príbehov, objavovaním užitočných služieb a stretávaním ľudí, pre ktorých sú zvieratá dôležitou súčasťou rodiny.",
"chapter4.p3":"Miso sa stala niťou, ktorá všetky tieto skúsenosti spojila. Vďaka nej vznikla myšlienka digitálnej lifestyle platformy, kde zvieratá nie sú malou kategóriou ukrytou na okraji ľudského života. Sú súčasťou príbehu.",
"chapter4.p4":"Z tejto myšlienky vzniklo PETS & DOGUE.",
"chapter4.alt1":"Miso, ktorej dobrodružstvá inšpirovali PETS & DOGUE",
"chapter4.alt2":"Miso si užíva život v meste",

"chapter5.kicker":"ZA MENOM",
"chapter5.title":"Miso Cute",
"chapter5.p1":"S príbehom Miso úzko súvisí ešte jedno meno: Miso Cute.",
"chapter5.p2":"Vyjadruje na nej niečo jednoduché — spojenie roztomilosti, humoru a nezameniteľného charakteru, ktoré ľudí prinúti zastaviť sa, usmiať a zapamätať si ju.",
"chapter5.p3":"Za milými fotografiami sa však skrýva skutočná malá osobnosť: nezávislá, keď chce, láskavá, keď sa sama rozhodne, pozorná, dobrodružná a veľmi jasná v tom, čo má rada.",
"chapter5.alt1":"Miso pózuje na fotografiu",
"chapter5.alt2":"Miso Cute — osobnosť za fotografiami",

"chapter6.kicker":"VIAC NEŽ HVIEZDA OBÁLKY",
"chapter6.title":"Malá ambasádorka<br>väčšieho sveta",
"chapter6.p1":"Miso je prvou hviezdou obálky PETS & DOGUE, ale jej úloha v tomto príbehu siaha ďaleko za fotografiu na obálke.",
"chapter6.p2":"Predstavuje dôvod, prečo táto platforma existuje: zvieratá sú spoločníci, členovia rodiny, cestovatelia, osobnosti a účastníci nášho každodenného života.",
"chapter6.p3":"Prostredníctvom PETS & DOGUE môže tento svet rásť — od pet-friendly miest a wellness cez módu, fotografiu, komunitu, pomoc a príbehy až po príležitosti pre majiteľov zvierat na celom svete.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, hviezda obálky PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso reprezentuje komunitu PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · VYDANIE 01",
"ending.title":"A toto je iba<br>začiatok",
"ending.p1":"Príbeh Miso otvoril prvú kapitolu. Teraz PETS & DOGUE patrí každému zvieraťu s príbehom, ktorý stojí za rozprávanie, a každému človeku, ktorého svet sa stal lepším preto, že sa jeho súčasťou stalo zviera.",
"ending.p2":"Čaká na nás mnoho ďalších príbehov.",
"ending.signature":"S láskou, Miso ♡",
"ending.alt":"Miso na konci svojho príbehu pre PETS & DOGUE",

"nav.back":"SPÄŤ NA VYDANIE 01",
"nav.next":"ĎALŠÍ PRÍBEH",
"share.label":"ZDIEĽAŤ TENTO PRÍBEH",
"share.copy":"KOPÍROVAŤ ODKAZ",
"share.copied":"ODKAZ SKOPÍROVANÝ",
"audio.play":"Vypočuť si tento príbeh",
"audio.pause":"Pozastaviť rozprávanie",
"audio.stop":"Zastaviť rozprávanie",
"audio.unsupported":"Prevod textu na reč nie je v tomto prehliadači dostupný."

},/* =====================================================
   HUNGARIAN
===================================================== */

hu:{

"page.kicker":"PETS & DOGUE · 01. KIADÁS · CÍMLAPSZTÁR",
"hero.eyebrow":"A TÖRTÉNET A CÍMLAP MÖGÖTT",
"hero.title":"Ismerd meg Misót",
"hero.subtitle":"A pici szőke pomerániai egy nagyon nagy ötlet mögött.",
"hero.alt":"Miso, a szőke pomerániai és a PETS & DOGUE címlapsztárja",

"intro.dropcap":"M",
"intro.p1":"Miso talán apró, de soha nem élt kis életet. Kíváncsi, kifejező és mindig készen áll a következő kalandra — ez a pici szőke pomerániai lett a PETS & DOGUE inspirációja.",
"intro.p2":"Imád utazni, gyönyörű helyeket felfedezni, emberekkel találkozni és természetesen a divatot. Misót azonban nem egyszerűen a külseje teszi felejthetetlenné. Hanem a ragyogó szemek mögötti személyiség — magabiztos, szeretetteljes, vicces és teljesen egyedi.",
"intro.p3":"Ez annak a kis kutyának a története, aki segített inspirálni egy teljesen új világot az állatok és az őket szerető emberek számára.",

"chapter1.kicker":"ELSŐ FEJEZET",
"chapter1.title":"Egy nagyon kicsi kutya<br>nagyon nagy személyiséggel",
"chapter1.p1":"Misót kezdettől fogva lehetetlen volt nem észrevenni. Tudni akarta, mi történik, hová megy mindenki, és hogy ő is mehet-e.",
"chapter1.p2":"A mérete számára sosem tűnt különösebben fontosnak. Egy új utca, egy szállodai lobby, egy park, egy kávézó vagy egy ismeretlen város néhány perc alatt a világának részévé válhatott.",
"chapter1.p3":"Ez a kíváncsiság később a PETS & DOGUE egyik meghatározó gondolatává vált: az állattal való élet nem jelenti azt, hogy az életnek kisebbé kell válnia. Gazdagabbá, érdekesebbé és kapcsolódóbbá válhat.",
"chapter1.alt1":"Miso felfedezi a külvilágot",
"chapter1.alt2":"Miso kíváncsian figyeli a körülötte lévő világot",

"quote1.text":"Elég kicsi ahhoz, hogy ölben vigyék.<br>Elég kíváncsi ahhoz, hogy bárhová eljusson.",
"quote1.credit":"— MISO VILÁGA",

"chapter2.kicker":"ÉLET MISÓVAL",
"chapter2.title":"A kis felfedező",
"chapter2.p1":"Miso imád új helyeket felfedezni. Számára egy séta ritkán csak séta. Új illatok, megfigyelhető emberek, felfedezendő utcák és megjegyzésre érdemes helyek várják.",
"chapter2.p2":"A vele való utazás valami fontosat is megmutatott: valóban állatbarát helyeket találni nem mindig egyszerű. Van, ahol szeretettel fogadják az állatokat, máshol nem egyértelműek a szabályok. Néha a leghasznosabb információ egy másik gazditól érkezik, aki már járt ott.",
"chapter2.p3":"Ezek a mindennapi tapasztalatok segítettek kialakítani a PETS & DOGUE egyik központi gondolatát — egy olyan világot, ahol az állattartók helyeket, információkat és közösségeket fedezhetnek fel, amelyek megkönnyítik a közös életet.",
"chapter2.alt1":"Miso élvezi a kinti napot",
"chapter2.alt2":"Miso utazik és új helyet fedez fel",
"chapter2.alt3":"Miso egyik kalandja közben",

"chapter3.kicker":"A STÍLUSA",
"chapter3.title":"Divat, de mindig Miso",
"chapter3.p1":"Miso ruhatára tükrözi a személyiségét: játékos, nőies és lehetetlen túl komolyan venni.",
"chapter3.p2":"Egy rózsaszín ruha, egy kis masni vagy egy gondosan kiválasztott kiegészítő egy hétköznapi sétát is különleges kis alkalommá változtathat. De a ruhák sosem teremtik meg a karaktert. Arról Miso maga gondoskodik.",
"chapter3.p3":"A PETS & DOGUE számára az állatdivat nem arról szól, hogy tárggyá változtassuk az állatokat. A személyiség, a kényelem, a kreativitás és az emberek és szeretett állataik közötti örömteli kapcsolat ünnepléséről szól.",
"chapter3.alt1":"Miso egyik jellegzetes rózsaszín szettjében",
"chapter3.alt2":"Miso kiöltözve egy programhoz",
"chapter3.alt3":"Miso megmutatja játékos stílusát",

"quote2.text":"A ruha lehet rózsaszín.<br>A hozzáállás teljesen az övé.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"A KEZDET",
"chapter4.title":"Hogyan inspirált egy kis kutya<br>valami sokkal nagyobbat",
"chapter4.p1":"A PETS & DOGUE nem azzal az ötlettel indult, hogy egy újabb hagyományos állatos kiadvány legyen.",
"chapter4.p2":"A valódi élettel kezdődött: utazással egy háziállattal, barátságos helyek keresésével, fotózással, történetek megosztásával, hasznos szolgáltatások felfedezésével és olyan emberekkel való találkozással, akiknek az állatok a családjuk alapvető részei.",
"chapter4.p3":"Miso lett az a szál, amely ezeket az élményeket összekötötte. Rajta keresztül született meg egy digitális lifestyle platform ötlete, ahol az állatok nem az emberi élet szélén elrejtett kis kategóriát jelentenek. A történet részei.",
"chapter4.p4":"Ebből az ötletből lett a PETS & DOGUE.",
"chapter4.alt1":"Miso, akinek kalandjai inspirálták a PETS & DOGUE világát",
"chapter4.alt2":"Miso élvezi a városi életet",

"chapter5.kicker":"A NÉV MÖGÖTT",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Miso történetéhez egy másik név is szorosan kapcsolódik: Miso Cute.",
"chapter5.p2":"Valami egyszerűt fejez ki róla — a cukiság, humor és összetéveszthetetlen karakter kombinációját, amitől az emberek megállnak, elmosolyodnak és emlékeznek rá.",
"chapter5.p3":"A cuki fotók mögött azonban valódi kis személyiség áll: független, amikor akar, szeretetteljes, amikor ő úgy dönt, figyelmes, kalandvágyó és nagyon pontosan tudja, mit szeret.",
"chapter5.alt1":"Miso egy fotóhoz pózol",
"chapter5.alt2":"Miso Cute — a személyiség a fotók mögött",

"chapter6.kicker":"TÖBB MINT CÍMLAPSZTÁR",
"chapter6.title":"Egy kis nagykövet<br>egy nagyobb világért",
"chapter6.p1":"Miso a PETS & DOGUE első címlapsztárja, de ebben a történetben betöltött szerepe messze túlmutat egy címlapfotón.",
"chapter6.p2":"Ő képviseli azt az okot, amiért ez a platform létezik: az állatok társak, családtagok, utazók, személyiségek és mindennapi életünk résztvevői.",
"chapter6.p3":"A PETS & DOGUE segítségével ez a világ növekedhet — az állatbarát helyektől és wellness-től a divaton, fotózáson, közösségen, segítségen és történeteken át az állattartók lehetőségeiig szerte a világon.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, a PETS & DOGUE Issue 01 címlapsztárja",
"chapter6.alt2":"Miso a PETS & DOGUE közösségét képviseli",

"ending.kicker":"PETS & DOGUE · 01. KIADÁS",
"ending.title":"És ez még csak<br>a kezdet",
"ending.p1":"Miso története nyitotta meg az első fejezetet. Mostantól a PETS & DOGUE minden olyan állaté, akinek történetét érdemes elmesélni, és minden olyan emberé, akinek jobb lett a világa attól, hogy egy állat részévé vált.",
"ending.p2":"Még sok történet vár ránk.",
"ending.signature":"Szeretettel, Miso ♡",
"ending.alt":"Miso a PETS & DOGUE címlaptörténetének végén",

"nav.back":"VISSZA A 01. KIADÁSHOZ",
"nav.next":"KÖVETKEZŐ TÖRTÉNET",
"share.label":"TÖRTÉNET MEGOSZTÁSA",
"share.copy":"LINK MÁSOLÁSA",
"share.copied":"LINK MÁSOLVA",
"audio.play":"Történet meghallgatása",
"audio.pause":"Felolvasás szüneteltetése",
"audio.stop":"Felolvasás leállítása",
"audio.unsupported":"A szövegfelolvasás ebben a böngészőben nem érhető el."

},

/* =====================================================
   ROMANIAN
===================================================== */

ro:{

"page.kicker":"PETS & DOGUE · EDIȚIA 01 · VEDETĂ DE COPERTĂ",
"hero.eyebrow":"POVESTEA DIN SPATELE COPERTEI",
"hero.title":"Faceți cunoștință cu Miso",
"hero.subtitle":"Micuța Pomeranian blondă din spatele unei idei foarte mari.",
"hero.alt":"Miso, Pomeranianul blond și vedeta de copertă PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso poate fi minusculă, dar nu a trăit niciodată o viață mică. Curioasă, expresivă și mereu pregătită pentru următoarea aventură, această mică Pomeranian blondă a devenit inspirația PETS & DOGUE.",
"intro.p2":"Îi place să călătorească, să descopere locuri frumoase, să cunoască oameni și, desigur, moda. Dar ceea ce o face pe Miso de neuitat nu este doar felul în care arată. Este personalitatea din spatele acelor ochi strălucitori — încrezătoare, afectuoasă, amuzantă și absolut unică.",
"intro.p3":"Aceasta este povestea micuței cățelușe care a contribuit la inspirarea unei lumi complet noi pentru animale și oamenii care le iubesc.",

"chapter1.kicker":"CAPITOLUL UNU",
"chapter1.title":"Un câine foarte mic<br>cu o personalitate foarte mare",
"chapter1.p1":"De la început, Miso era imposibil de trecut cu vederea. Voia să știe ce se întâmplă, unde merge toată lumea și dacă poate veni și ea.",
"chapter1.p2":"Dimensiunea ei nu a părut niciodată deosebit de importantă pentru ea. O stradă nouă, lobby-ul unui hotel, un parc, o cafenea sau un oraș necunoscut puteau deveni parte din lumea ei în doar câteva minute.",
"chapter1.p3":"Această curiozitate a devenit mai târziu una dintre ideile care definesc PETS & DOGUE: viața alături de un animal nu trebuie să devină mai mică. Poate deveni mai bogată, mai interesantă și mai conectată.",
"chapter1.alt1":"Miso explorează lumea de afară",
"chapter1.alt2":"Miso privește curioasă lumea din jur",

"quote1.text":"Destul de mică pentru a fi purtată.<br>Destul de curioasă pentru a merge oriunde.",
"quote1.credit":"— LUMEA LUI MISO",

"chapter2.kicker":"VIAȚA CU MISO",
"chapter2.title":"Mica exploratoare",
"chapter2.p1":"Miso adoră să descopere locuri noi. Pentru ea, o plimbare rareori este doar o plimbare. Sunt mirosuri noi de investigat, oameni de observat, străzi de explorat și locuri de ținut minte.",
"chapter2.p2":"Călătoriile cu ea au dezvăluit și ceva important: găsirea unor locuri cu adevărat pet-friendly nu este întotdeauna simplă. Unele primesc animalele cu căldură, altele au reguli neclare. Uneori, cea mai utilă informație vine de la un alt proprietar care a fost deja acolo.",
"chapter2.p3":"Aceste experiențe cotidiene au contribuit la formarea uneia dintre ideile centrale PETS & DOGUE — crearea unei lumi în care proprietarii de animale pot descoperi locuri, informații și comunități care fac viața împreună mai ușoară.",
"chapter2.alt1":"Miso se bucură de o zi în oraș",
"chapter2.alt2":"Miso călătorește și descoperă un loc nou",
"chapter2.alt3":"Miso într-una dintre aventurile sale",

"chapter3.kicker":"STILUL EI",
"chapter3.title":"Modă, dar întotdeauna Miso",
"chapter3.p1":"Miso are o garderobă care îi reflectă personalitatea: jucăușă, feminină și imposibil de luat prea în serios.",
"chapter3.p2":"O rochie roz, o fundiță mică sau un accesoriu ales cu grijă pot transforma o plimbare obișnuită într-o mică ocazie specială. Dar hainele nu creează niciodată caracterul. Miso se ocupă singură de asta.",
"chapter3.p3":"Pentru PETS & DOGUE, moda pentru animale nu înseamnă transformarea animalelor în obiecte. Înseamnă celebrarea personalității, confortului, creativității și relației pline de bucurie dintre oameni și animalele pe care le iubesc.",
"chapter3.alt1":"Miso într-una dintre ținutele ei roz caracteristice",
"chapter3.alt2":"Miso îmbrăcată pentru o ieșire",
"chapter3.alt3":"Miso își arată stilul jucăuș",

"quote2.text":"Ținuta poate fi roz.<br>Atitudinea îi aparține în întregime.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"ÎNCEPUTUL",
"chapter4.title":"Cum un câine mic<br>a inspirat ceva mai mare",
"chapter4.p1":"PETS & DOGUE nu a început cu ideea de a crea încă o publicație tradițională despre animale.",
"chapter4.p2":"A început din viața reală: călătorii cu un animal, căutarea locurilor primitoare, fotografii, povești împărtășite, descoperirea serviciilor utile și întâlnirea oamenilor pentru care animalele sunt o parte esențială a familiei.",
"chapter4.p3":"Miso a devenit firul care a legat toate aceste experiențe. Prin ea a apărut ideea unei platforme digitale de lifestyle unde animalele nu sunt o categorie mică ascunsă la marginea vieții umane. Ele fac parte din poveste.",
"chapter4.p4":"Această idee a devenit PETS & DOGUE.",
"chapter4.alt1":"Miso, ale cărei aventuri au inspirat PETS & DOGUE",
"chapter4.alt2":"Miso se bucură de viața în oraș",

"chapter5.kicker":"DINCOLO DE NUME",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Un alt nume este strâns legat de povestea lui Miso: Miso Cute.",
"chapter5.p2":"Surprinde ceva simplu despre ea — acea combinație de drăgălășenie, umor și caracter inconfundabil care îi face pe oameni să se oprească, să zâmbească și să o țină minte.",
"chapter5.p3":"Dar în spatele fotografiilor drăguțe se află o personalitate adevărată: independentă când vrea, afectuoasă când decide ea, atentă, aventuroasă și foarte clară în privința lucrurilor care îi plac.",
"chapter5.alt1":"Miso pozează pentru o fotografie",
"chapter5.alt2":"Miso Cute — personalitatea din spatele fotografiilor",

"chapter6.kicker":"MAI MULT DECÂT O VEDETĂ DE COPERTĂ",
"chapter6.title":"O mică ambasadoare<br>pentru o lume mai mare",
"chapter6.p1":"Miso este prima vedetă de copertă PETS & DOGUE, dar rolul ei în această poveste depășește cu mult o fotografie pe copertă.",
"chapter6.p2":"Ea reprezintă motivul pentru care această platformă există: animalele sunt companioni, membri ai familiei, călători, personalități și participanți la viața noastră de zi cu zi.",
"chapter6.p3":"Prin PETS & DOGUE, această lume poate crește — de la locuri pet-friendly și wellness până la modă, fotografie, comunitate, ajutor, povești și oportunități pentru proprietarii de animale din întreaga lume.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, vedeta de copertă PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso reprezintă comunitatea PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · EDIȚIA 01",
"ending.title":"Și acesta este doar<br>începutul",
"ending.p1":"Povestea lui Miso a deschis primul capitol. Acum PETS & DOGUE aparține fiecărui animal cu o poveste care merită spusă și fiecărei persoane a cărei lume a devenit mai bună pentru că un animal a devenit parte din ea.",
"ending.p2":"Ne așteaptă multe alte povești.",
"ending.signature":"Cu dragoste, Miso ♡",
"ending.alt":"Miso la finalul poveștii sale de copertă PETS & DOGUE",

"nav.back":"ÎNAPOI LA EDIȚIA 01",
"nav.next":"POVESTEA URMĂTOARE",
"share.label":"DISTRIBUIE ACEASTĂ POVESTE",
"share.copy":"COPIAZĂ LINKUL",
"share.copied":"LINK COPIAT",
"audio.play":"Ascultă această poveste",
"audio.pause":"Pauză narațiune",
"audio.stop":"Oprește narațiunea",
"audio.unsupported":"Funcția text-to-speech nu este disponibilă în acest browser."

},

/* =====================================================
   BULGARIAN
===================================================== */

bg:{

"page.kicker":"PETS & DOGUE · БРОЙ 01 · ЗВЕЗДА НА КОРИЦАТА",
"hero.eyebrow":"ИСТОРИЯТА ЗАД КОРИЦАТА",
"hero.title":"Запознайте се с Miso",
"hero.subtitle":"Малкият рус померан зад една много голяма идея.",
"hero.alt":"Miso, русият померан и звезда на корицата на PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso може да е мъничка, но никога не е живяла малък живот. Любопитна, изразителна и винаги готова за следващото приключение, тази малка руса померанка се превърна във вдъхновението за PETS & DOGUE.",
"intro.p2":"Тя обича да пътува, да открива красиви места, да среща хора и, разбира се, модата. Но това, което прави Miso незабравима, не е просто външността ѝ. Това е личността зад тези блестящи очи — уверена, любяща, забавна и напълно уникална.",
"intro.p3":"Това е историята на малкото куче, което помогна да се роди един изцяло нов свят за животните и хората, които ги обичат.",

"chapter1.kicker":"ГЛАВА ПЪРВА",
"chapter1.title":"Едно много малко куче<br>с много голяма личност",
"chapter1.p1":"Още от самото начало Miso беше невъзможно да остане незабелязана. Тя искаше да знае какво се случва, къде отиват всички и дали може да дойде и тя.",
"chapter1.p2":"Размерът ѝ никога не изглеждаше особено важен за нея. Нова улица, хотелско фоайе, парк, кафене или непознат град можеха да станат част от нейния свят само за няколко минути.",
"chapter1.p3":"Това любопитство по-късно се превърна в една от идеите, които определят PETS & DOGUE: животът с животно не означава, че животът трябва да стане по-малък. Той може да стане по-богат, по-интересен и по-свързан.",
"chapter1.alt1":"Miso изследва света навън",
"chapter1.alt2":"Miso любопитно наблюдава света около себе си",

"quote1.text":"Достатъчно малка, за да бъде носена.<br>Достатъчно любопитна, за да отиде навсякъде.",
"quote1.credit":"— СВЕТЪТ НА MISO",

"chapter2.kicker":"ЖИВОТЪТ С MISO",
"chapter2.title":"Малката изследователка",
"chapter2.p1":"Miso обича да открива нови места. За нея разходката рядко е просто разходка. Има нови миризми за изследване, хора за наблюдение, улици за откриване и места, които си заслужава да бъдат запомнени.",
"chapter2.p2":"Пътуването с нея показа и нещо важно: намирането на наистина pet-friendly места невинаги е лесно. Някои посрещат животните топло, други имат неясни правила. Понякога най-полезната информация идва от друг стопанин, който вече е бил там.",
"chapter2.p3":"Тези ежедневни преживявания помогнаха да се оформи една от основните идеи на PETS & DOGUE — свят, в който стопаните могат да откриват места, информация и общности, които правят съвместния живот по-лесен.",
"chapter2.alt1":"Miso се наслаждава на ден навън",
"chapter2.alt2":"Miso пътува и открива ново място",
"chapter2.alt3":"Miso по време на едно от приключенията си",

"chapter3.kicker":"НЕЙНИЯТ СТИЛ",
"chapter3.title":"Мода, но винаги Miso",
"chapter3.p1":"Miso има гардероб, който отразява личността ѝ: игрив, женствен и невъзможен за приемане прекалено сериозно.",
"chapter3.p2":"Розова рокля, малка панделка или внимателно избран аксесоар могат да превърнат обикновената разходка в малък специален повод. Но дрехите никога не създават характера. За това Miso се грижи сама.",
"chapter3.p3":"За PETS & DOGUE модата за животни не е превръщане на животните в предмети. Тя е празник на личността, комфорта, творчеството и радостната връзка между хората и животните, които обичат.",
"chapter3.alt1":"Miso в един от характерните си розови тоалети",
"chapter3.alt2":"Miso облечена за излизане",
"chapter3.alt3":"Miso показва своя игрив стил",

"quote2.text":"Тоалетът може да е розов.<br>Отношението е изцяло нейно.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"НАЧАЛОТО",
"chapter4.title":"Как едно малко куче<br>вдъхнови нещо по-голямо",
"chapter4.p1":"PETS & DOGUE не започна с идеята да създаде още едно традиционно издание за домашни любимци.",
"chapter4.p2":"Всичко започна от реалния живот: пътуване с животно, търсене на гостоприемни места, снимки, споделяне на истории, откриване на полезни услуги и срещи с хора, за които животните са съществена част от семейството.",
"chapter4.p3":"Miso се превърна в нишката, която свърза всички тези преживявания. Чрез нея се роди идеята за дигитална lifestyle платформа, в която животните не са малка категория, скрита в периферията на човешкия живот. Те са част от историята.",
"chapter4.p4":"Тази идея се превърна в PETS & DOGUE.",
"chapter4.alt1":"Miso, чиито приключения вдъхновиха PETS & DOGUE",
"chapter4.alt2":"Miso се наслаждава на градския живот",

"chapter5.kicker":"ЗАД ИМЕТО",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Има още едно име, тясно свързано с историята на Miso: Miso Cute.",
"chapter5.p2":"То улавя нещо просто в нея — комбинацията от сладост, хумор и неповторим характер, която кара хората да спират, да се усмихват и да я запомнят.",
"chapter5.p3":"Но зад сладките снимки стои истинска малка личност: независима, когато иска, любяща, когато сама реши, наблюдателна, приключенски настроена и много ясна за това какво харесва.",
"chapter5.alt1":"Miso позира за снимка",
"chapter5.alt2":"Miso Cute — личността зад снимките",

"chapter6.kicker":"ПОВЕЧЕ ОТ ЗВЕЗДА НА КОРИЦАТА",
"chapter6.title":"Малък посланик<br>на един по-голям свят",
"chapter6.p1":"Miso е първата звезда на корицата на PETS & DOGUE, но ролята ѝ в тази история надхвърля далеч една снимка на корица.",
"chapter6.p2":"Тя представлява причината тази платформа да съществува: животните са спътници, членове на семейството, пътешественици, личности и участници в ежедневието ни.",
"chapter6.p3":"Чрез PETS & DOGUE този свят може да расте — от pet-friendly места и wellness до мода, фотография, общност, помощ, истории и възможности за стопани на животни по целия свят.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, звезда на корицата на PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso представлява общността на PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · БРОЙ 01",
"ending.title":"И това е само<br>началото",
"ending.p1":"Историята на Miso отвори първата глава. Сега PETS & DOGUE принадлежи на всяко животно с история, която заслужава да бъде разказана, и на всеки човек, чийто свят е станал по-добър, защото животно е станало част от него.",
"ending.p2":"Очакват ни още много истории.",
"ending.signature":"С любов, Miso ♡",
"ending.alt":"Miso в края на своята история за корицата на PETS & DOGUE",

"nav.back":"НАЗАД КЪМ БРОЙ 01",
"nav.next":"СЛЕДВАЩА ИСТОРИЯ",
"share.label":"СПОДЕЛИ ТАЗИ ИСТОРИЯ",
"share.copy":"КОПИРАЙ ЛИНКА",
"share.copied":"ЛИНКЪТ Е КОПИРАН",
"audio.play":"Чуй тази история",
"audio.pause":"Пауза на разказа",
"audio.stop":"Спри разказа",
"audio.unsupported":"Синтезът на реч не е наличен в този браузър."

},/* =====================================================
   GREEK
===================================================== */

el:{

"page.kicker":"PETS & DOGUE · ΤΕΥΧΟΣ 01 · ΑΣΤΕΡΙ ΕΞΩΦΥΛΛΟΥ",
"hero.eyebrow":"Η ΙΣΤΟΡΙΑ ΠΙΣΩ ΑΠΟ ΤΟ ΕΞΩΦΥΛΛΟ",
"hero.title":"Γνωρίστε τη Miso",
"hero.subtitle":"Η μικρή ξανθιά Πομεράνιαν πίσω από μια πολύ μεγάλη ιδέα.",
"hero.alt":"Η Miso, η ξανθιά Πομεράνιαν και αστέρι εξωφύλλου του PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Η Miso μπορεί να είναι μικροσκοπική, αλλά ποτέ δεν έζησε μια μικρή ζωή. Περίεργη, εκφραστική και πάντα έτοιμη για την επόμενη περιπέτεια, αυτή η μικρή ξανθιά Πομεράνιαν έγινε η έμπνευση για το PETS & DOGUE.",
"intro.p2":"Λατρεύει τα ταξίδια, την ανακάλυψη όμορφων τόπων, τις γνωριμίες με ανθρώπους και φυσικά τη μόδα. Αυτό όμως που κάνει τη Miso αξέχαστη δεν είναι μόνο η εμφάνισή της. Είναι η προσωπικότητα πίσω από αυτά τα φωτεινά μάτια — γεμάτη αυτοπεποίθηση, τρυφερή, αστεία και απολύτως μοναδική.",
"intro.p3":"Αυτή είναι η ιστορία του μικρού σκύλου που βοήθησε να γεννηθεί ένας εντελώς νέος κόσμος για τα ζώα και τους ανθρώπους που τα αγαπούν.",

"chapter1.kicker":"ΚΕΦΑΛΑΙΟ ΕΝΑ",
"chapter1.title":"Ένας πολύ μικρός σκύλος<br>με πολύ μεγάλη προσωπικότητα",
"chapter1.p1":"Από την αρχή ήταν αδύνατο να μην προσέξεις τη Miso. Ήθελε να ξέρει τι συνέβαινε, πού πήγαιναν όλοι και αν μπορούσε να έρθει κι εκείνη.",
"chapter1.p2":"Το μέγεθός της δεν φάνηκε ποτέ ιδιαίτερα σημαντικό για την ίδια. Ένας νέος δρόμος, το λόμπι ενός ξενοδοχείου, ένα πάρκο, ένα καφέ ή μια άγνωστη πόλη μπορούσαν να γίνουν μέρος του κόσμου της μέσα σε λίγα λεπτά.",
"chapter1.p3":"Αυτή η περιέργεια έγινε αργότερα μία από τις ιδέες που καθορίζουν το PETS & DOGUE: η ζωή με ένα ζώο δεν σημαίνει ότι η ζωή πρέπει να γίνει μικρότερη. Μπορεί να γίνει πλουσιότερη, πιο ενδιαφέρουσα και πιο συνδεδεμένη.",
"chapter1.alt1":"Η Miso εξερευνά τον κόσμο έξω",
"chapter1.alt2":"Η Miso παρατηρεί με περιέργεια τον κόσμο γύρω της",

"quote1.text":"Αρκετά μικρή για να την κρατάς αγκαλιά.<br>Αρκετά περίεργη για να πάει παντού.",
"quote1.credit":"— Ο ΚΟΣΜΟΣ ΤΗΣ MISO",

"chapter2.kicker":"Η ΖΩΗ ΜΕ ΤΗ MISO",
"chapter2.title":"Η μικρή εξερευνήτρια",
"chapter2.p1":"Η Miso λατρεύει να ανακαλύπτει νέα μέρη. Για εκείνη μια βόλτα σπάνια είναι απλώς μια βόλτα. Υπάρχουν νέες μυρωδιές, άνθρωποι για παρατήρηση, δρόμοι για εξερεύνηση και μέρη που αξίζει να θυμάται.",
"chapter2.p2":"Τα ταξίδια μαζί της αποκάλυψαν επίσης κάτι σημαντικό: δεν είναι πάντα εύκολο να βρεις πραγματικά pet-friendly μέρη. Κάποια υποδέχονται θερμά τα ζώα, ενώ άλλα έχουν ασαφείς κανόνες. Μερικές φορές η πιο χρήσιμη πληροφορία έρχεται από έναν άλλο ιδιοκτήτη που έχει ήδη βρεθεί εκεί.",
"chapter2.p3":"Αυτές οι καθημερινές εμπειρίες βοήθησαν να διαμορφωθεί μία από τις βασικές ιδέες του PETS & DOGUE — ένας κόσμος όπου οι ιδιοκτήτες ζώων μπορούν να ανακαλύπτουν μέρη, πληροφορίες και κοινότητες που κάνουν τη ζωή μαζί ευκολότερη.",
"chapter2.alt1":"Η Miso απολαμβάνει μια μέρα έξω",
"chapter2.alt2":"Η Miso ταξιδεύει και ανακαλύπτει ένα νέο μέρος",
"chapter2.alt3":"Η Miso σε μία από τις περιπέτειές της",

"chapter3.kicker":"ΤΟ ΣΤΥΛ ΤΗΣ",
"chapter3.title":"Μόδα, αλλά πάντα Miso",
"chapter3.p1":"Η Miso έχει μια γκαρνταρόμπα που αντικατοπτρίζει την προσωπικότητά της: παιχνιδιάρικη, θηλυκή και αδύνατο να την πάρεις υπερβολικά σοβαρά.",
"chapter3.p2":"Ένα ροζ φόρεμα, ένας μικρός φιόγκος ή ένα προσεκτικά επιλεγμένο αξεσουάρ μπορούν να μετατρέψουν μια συνηθισμένη βόλτα σε μια μικρή ξεχωριστή περίσταση. Τα ρούχα όμως δεν δημιουργούν ποτέ τον χαρακτήρα. Αυτό το κάνει η Miso μόνη της.",
"chapter3.p3":"Για το PETS & DOGUE, η μόδα για ζώα δεν σημαίνει να μετατρέπουμε τα ζώα σε αντικείμενα. Σημαίνει να γιορτάζουμε την προσωπικότητα, την άνεση, τη δημιουργικότητα και τη χαρούμενη σχέση ανάμεσα στους ανθρώπους και τα ζώα που αγαπούν.",
"chapter3.alt1":"Η Miso σε ένα από τα χαρακτηριστικά ροζ σύνολά της",
"chapter3.alt2":"Η Miso ντυμένη για έξοδο",
"chapter3.alt3":"Η Miso δείχνει το παιχνιδιάρικο στυλ της",

"quote2.text":"Το σύνολο μπορεί να είναι ροζ.<br>Η στάση είναι ολόδική της.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"Η ΑΡΧΗ",
"chapter4.title":"Πώς ένας μικρός σκύλος<br>ενέπνευσε κάτι μεγαλύτερο",
"chapter4.p1":"Το PETS & DOGUE δεν ξεκίνησε με την ιδέα να δημιουργήσει ακόμη μία παραδοσιακή έκδοση για κατοικίδια.",
"chapter4.p2":"Ξεκίνησε από την πραγματική ζωή: ταξίδια με ένα ζώο, αναζήτηση φιλόξενων χώρων, φωτογραφίες, μοίρασμα ιστοριών, ανακάλυψη χρήσιμων υπηρεσιών και γνωριμίες με ανθρώπους για τους οποίους τα ζώα αποτελούν ουσιαστικό μέρος της οικογένειας.",
"chapter4.p3":"Η Miso έγινε το νήμα που συνέδεσε όλες αυτές τις εμπειρίες. Μέσα από εκείνη γεννήθηκε η ιδέα μιας ψηφιακής lifestyle πλατφόρμας όπου τα ζώα δεν είναι μια μικρή κατηγορία κρυμμένη στην άκρη της ανθρώπινης ζωής. Είναι μέρος της ιστορίας.",
"chapter4.p4":"Αυτή η ιδέα έγινε το PETS & DOGUE.",
"chapter4.alt1":"Η Miso, της οποίας οι περιπέτειες ενέπνευσαν το PETS & DOGUE",
"chapter4.alt2":"Η Miso απολαμβάνει τη ζωή στην πόλη",

"chapter5.kicker":"ΠΙΣΩ ΑΠΟ ΤΟ ΟΝΟΜΑ",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Ένα ακόμη όνομα συνδέεται στενά με την ιστορία της Miso: Miso Cute.",
"chapter5.p2":"Αποτυπώνει κάτι απλό πάνω της — τον συνδυασμό γλυκύτητας, χιούμορ και αδιαμφισβήτητου χαρακτήρα που κάνει τους ανθρώπους να σταματούν, να χαμογελούν και να τη θυμούνται.",
"chapter5.p3":"Πίσω όμως από τις χαριτωμένες φωτογραφίες υπάρχει μια αληθινή μικρή προσωπικότητα: ανεξάρτητη όταν θέλει, τρυφερή όταν το αποφασίζει, παρατηρητική, περιπετειώδης και πολύ ξεκάθαρη για όσα της αρέσουν.",
"chapter5.alt1":"Η Miso ποζάρει για μια φωτογραφία",
"chapter5.alt2":"Miso Cute — η προσωπικότητα πίσω από τις φωτογραφίες",

"chapter6.kicker":"ΠΕΡΙΣΣΟΤΕΡΟ ΑΠΟ ΕΝΑ ΑΣΤΕΡΙ ΕΞΩΦΥΛΛΟΥ",
"chapter6.title":"Μια μικρή πρέσβειρα<br>για έναν μεγαλύτερο κόσμο",
"chapter6.p1":"Η Miso είναι το πρώτο αστέρι εξωφύλλου του PETS & DOGUE, όμως ο ρόλος της σε αυτή την ιστορία ξεπερνά κατά πολύ μια φωτογραφία στο εξώφυλλο.",
"chapter6.p2":"Αντιπροσωπεύει τον λόγο για τον οποίο υπάρχει αυτή η πλατφόρμα: τα ζώα είναι σύντροφοι, μέλη της οικογένειας, ταξιδιώτες, προσωπικότητες και συμμετέχοντες στην καθημερινή μας ζωή.",
"chapter6.p3":"Μέσα από το PETS & DOGUE, αυτός ο κόσμος μπορεί να μεγαλώσει — από pet-friendly μέρη και ευεξία μέχρι μόδα, φωτογραφία, κοινότητα, βοήθεια, ιστορίες και ευκαιρίες για ιδιοκτήτες ζώων σε όλο τον κόσμο.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Η Miso, αστέρι εξωφύλλου του PETS & DOGUE Issue 01",
"chapter6.alt2":"Η Miso εκπροσωπεί την κοινότητα του PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · ΤΕΥΧΟΣ 01",
"ending.title":"Και αυτή είναι μόνο<br>η αρχή",
"ending.p1":"Η ιστορία της Miso άνοιξε το πρώτο κεφάλαιο. Τώρα το PETS & DOGUE ανήκει σε κάθε ζώο με μια ιστορία που αξίζει να ειπωθεί και σε κάθε άνθρωπο του οποίου ο κόσμος έγινε καλύτερος επειδή ένα ζώο έγινε μέρος του.",
"ending.p2":"Πολλές ακόμη ιστορίες μας περιμένουν.",
"ending.signature":"Με αγάπη, Miso ♡",
"ending.alt":"Η Miso στο τέλος της ιστορίας εξωφύλλου της στο PETS & DOGUE",

"nav.back":"ΠΙΣΩ ΣΤΟ ΤΕΥΧΟΣ 01",
"nav.next":"ΕΠΟΜΕΝΗ ΙΣΤΟΡΙΑ",
"share.label":"ΜΟΙΡΑΣΤΕΙΤΕ ΑΥΤΗ ΤΗΝ ΙΣΤΟΡΙΑ",
"share.copy":"ΑΝΤΙΓΡΑΦΗ ΣΥΝΔΕΣΜΟΥ",
"share.copied":"Ο ΣΥΝΔΕΣΜΟΣ ΑΝΤΙΓΡΑΦΗΚΕ",
"audio.play":"Ακούστε αυτή την ιστορία",
"audio.pause":"Παύση αφήγησης",
"audio.stop":"Διακοπή αφήγησης",
"audio.unsupported":"Η μετατροπή κειμένου σε ομιλία δεν είναι διαθέσιμη σε αυτό το πρόγραμμα περιήγησης."

},

/* =====================================================
   SWEDISH
===================================================== */

sv:{

"page.kicker":"PETS & DOGUE · UTGÅVA 01 · OMSLAGSSTJÄRNA",
"hero.eyebrow":"BERÄTTELSEN BAKOM OMSLAGET",
"hero.title":"Möt Miso",
"hero.subtitle":"Den lilla blonda pomeranianen bakom en mycket stor idé.",
"hero.alt":"Miso, den blonda pomeranianen och omslagsstjärnan för PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso må vara pytteliten, men hon har aldrig levt ett litet liv. Nyfiken, uttrycksfull och alltid redo för nästa äventyr blev denna lilla blonda pomeranian inspirationen till PETS & DOGUE.",
"intro.p2":"Hon älskar att resa, upptäcka vackra platser, träffa människor och förstås mode. Men det som gör Miso oförglömlig är inte bara hur hon ser ut. Det är personligheten bakom de klara ögonen — självsäker, kärleksfull, rolig och helt unik.",
"intro.p3":"Det här är berättelsen om den lilla hunden som hjälpte till att inspirera en helt ny värld för djur och människorna som älskar dem.",

"chapter1.kicker":"KAPITEL ETT",
"chapter1.title":"En mycket liten hund<br>med en mycket stor personlighet",
"chapter1.p1":"Redan från början var Miso omöjlig att missa. Hon ville veta vad som hände, vart alla skulle och om hon också fick följa med.",
"chapter1.p2":"Hennes storlek verkade aldrig särskilt viktig för henne. En ny gata, en hotellobby, en park, ett café eller en okänd stad kunde bli en del av hennes värld på bara några minuter.",
"chapter1.p3":"Den nyfikenheten blev senare en av idéerna som definierar PETS & DOGUE: livet med ett djur behöver inte bli mindre. Det kan bli rikare, mer intressant och mer sammanlänkat.",
"chapter1.alt1":"Miso utforskar världen utomhus",
"chapter1.alt2":"Miso betraktar nyfiket världen omkring sig",

"quote1.text":"Liten nog att bäras.<br>Nyfiken nog att gå överallt.",
"quote1.credit":"— MISOS VÄRLD",

"chapter2.kicker":"LIVET MED MISO",
"chapter2.title":"Den lilla upptäckaren",
"chapter2.p1":"Miso älskar att upptäcka nya platser. För henne är en promenad sällan bara en promenad. Det finns nya dofter att undersöka, människor att titta på, gator att utforska och platser att minnas.",
"chapter2.p2":"Att resa med henne visade också något viktigt: att hitta verkligt djurvänliga platser är inte alltid enkelt. Vissa välkomnar djur varmt, andra har otydliga regler. Ibland kommer den mest användbara informationen från en annan djurägare som redan varit där.",
"chapter2.p3":"Dessa vardagliga erfarenheter hjälpte till att forma en av PETS & DOGUEs centrala idéer — att skapa en värld där djurägare kan upptäcka platser, information och communities som gör livet tillsammans enklare.",
"chapter2.alt1":"Miso njuter av en dag ute",
"chapter2.alt2":"Miso reser och upptäcker en ny plats",
"chapter2.alt3":"Miso på ett av sina äventyr",

"chapter3.kicker":"HENNES STIL",
"chapter3.title":"Mode, men alltid Miso",
"chapter3.p1":"Miso har en garderob som speglar hennes personlighet: lekfull, feminin och omöjlig att ta alltför seriöst.",
"chapter3.p2":"En rosa klänning, en liten rosett eller ett noggrant utvalt tillbehör kan förvandla en vanlig promenad till ett litet speciellt tillfälle. Men kläderna skapar aldrig karaktären. Det sköter Miso helt själv.",
"chapter3.p3":"För PETS & DOGUE handlar djurmode inte om att göra djur till föremål. Det handlar om att hylla personlighet, komfort, kreativitet och den glädjefyllda relationen mellan människor och djuren de älskar.",
"chapter3.alt1":"Miso i en av sina karakteristiska rosa outfits",
"chapter3.alt2":"Miso klädd för en utflykt",
"chapter3.alt3":"Miso visar sin lekfulla stil",

"quote2.text":"Outfiten må vara rosa.<br>Attityden är helt hennes egen.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"BÖRJAN",
"chapter4.title":"Hur en liten hund<br>inspirerade något större",
"chapter4.p1":"PETS & DOGUE började inte med idén att skapa ännu en traditionell djurpublikation.",
"chapter4.p2":"Det började med verkliga livet: att resa med ett djur, leta efter välkomnande platser, fotografera, dela berättelser, upptäcka användbara tjänster och möta människor vars djur är en viktig del av familjen.",
"chapter4.p3":"Miso blev tråden som band samman alla dessa erfarenheter. Genom henne föddes idén om en digital lifestyleplattform där djur inte är en liten kategori gömd i utkanten av människors liv. De är en del av berättelsen.",
"chapter4.p4":"Den idén blev PETS & DOGUE.",
"chapter4.alt1":"Miso, vars äventyr inspirerade PETS & DOGUE",
"chapter4.alt2":"Miso njuter av stadslivet",

"chapter5.kicker":"BAKOM NAMNET",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Ett annat namn är nära kopplat till Misos berättelse: Miso Cute.",
"chapter5.p2":"Det fångar något enkelt hos henne — kombinationen av sötma, humor och omisskännlig karaktär som får människor att stanna, le och minnas henne.",
"chapter5.p3":"Men bakom de söta bilderna finns en verklig liten personlighet: självständig när hon vill, kärleksfull när hon själv bestämmer, observant, äventyrlig och väldigt tydlig med vad hon gillar.",
"chapter5.alt1":"Miso poserar för ett fotografi",
"chapter5.alt2":"Miso Cute — personligheten bakom fotografierna",

"chapter6.kicker":"MER ÄN EN OMSLAGSSTJÄRNA",
"chapter6.title":"En liten ambassadör<br>för en större värld",
"chapter6.p1":"Miso är PETS & DOGUEs första omslagsstjärna, men hennes roll i den här berättelsen sträcker sig långt bortom ett fotografi på ett omslag.",
"chapter6.p2":"Hon representerar anledningen till att denna plattform finns: djur är följeslagare, familjemedlemmar, resenärer, personligheter och deltagare i våra vardagsliv.",
"chapter6.p3":"Genom PETS & DOGUE kan den världen växa — från djurvänliga platser och välmående till mode, fotografi, community, hjälp, berättelser och möjligheter för djurägare över hela världen.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, omslagsstjärna för PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso representerar PETS & DOGUE-communityn",

"ending.kicker":"PETS & DOGUE · UTGÅVA 01",
"ending.title":"Och det här är bara<br>början",
"ending.p1":"Misos berättelse öppnade det första kapitlet. Nu tillhör PETS & DOGUE varje djur med en historia värd att berätta och varje människa vars värld blev bättre för att ett djur blev en del av den.",
"ending.p2":"Många fler berättelser väntar.",
"ending.signature":"Med kärlek, Miso ♡",
"ending.alt":"Miso i slutet av sin PETS & DOGUE-omslagsberättelse",

"nav.back":"TILLBAKA TILL UTGÅVA 01",
"nav.next":"NÄSTA BERÄTTELSE",
"share.label":"DELA DENNA BERÄTTELSE",
"share.copy":"KOPIERA LÄNK",
"share.copied":"LÄNK KOPIERAD",
"audio.play":"Lyssna på denna berättelse",
"audio.pause":"Pausa uppläsningen",
"audio.stop":"Stoppa uppläsningen",
"audio.unsupported":"Text-till-tal är inte tillgängligt i den här webbläsaren."

},

/* =====================================================
   DANISH
===================================================== */

da:{

"page.kicker":"PETS & DOGUE · UDGAVE 01 · FORSIDESTJERNE",
"hero.eyebrow":"HISTORIEN BAG FORSIDEN",
"hero.title":"Mød Miso",
"hero.subtitle":"Den lille blonde pomeranian bag en meget stor idé.",
"hero.alt":"Miso, den blonde pomeranian og forsidestjerne for PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso er måske meget lille, men hun har aldrig levet et lille liv. Nysgerrig, udtryksfuld og altid klar til det næste eventyr blev denne lille blonde pomeranian inspirationen til PETS & DOGUE.",
"intro.p2":"Hun elsker at rejse, opdage smukke steder, møde mennesker og selvfølgelig mode. Men det, der gør Miso uforglemmelig, er ikke kun hendes udseende. Det er personligheden bag de klare øjne — selvsikker, kærlig, sjov og helt unik.",
"intro.p3":"Dette er historien om den lille hund, der var med til at inspirere en helt ny verden for dyr og de mennesker, der elsker dem.",

"chapter1.kicker":"KAPITEL ET",
"chapter1.title":"En meget lille hund<br>med en meget stor personlighed",
"chapter1.p1":"Fra begyndelsen var Miso umulig at overse. Hun ville vide, hvad der skete, hvor alle skulle hen, og om hun også måtte komme med.",
"chapter1.p2":"Hendes størrelse virkede aldrig særlig vigtig for hende. En ny gade, en hotellobby, en park, en café eller en ukendt by kunne blive en del af hendes verden på få minutter.",
"chapter1.p3":"Den nysgerrighed blev senere en af de idéer, der definerer PETS & DOGUE: livet med et dyr behøver ikke blive mindre. Det kan blive rigere, mere interessant og mere forbundet.",
"chapter1.alt1":"Miso udforsker verden udenfor",
"chapter1.alt2":"Miso betragter nysgerrigt verden omkring sig",

"quote1.text":"Lille nok til at blive båret.<br>Nysgerrig nok til at tage med overalt.",
"quote1.credit":"— MISOS VERDEN",

"chapter2.kicker":"LIVET MED MISO",
"chapter2.title":"Den lille opdagelsesrejsende",
"chapter2.p1":"Miso elsker at opdage nye steder. For hende er en gåtur sjældent bare en gåtur. Der er nye dufte at undersøge, mennesker at betragte, gader at udforske og steder at huske.",
"chapter2.p2":"At rejse med hende viste også noget vigtigt: det er ikke altid enkelt at finde steder, der virkelig er pet-friendly. Nogle byder dyr varmt velkommen, mens andre har uklare regler. Nogle gange kommer den mest nyttige information fra en anden dyreejer, der allerede har været der.",
"chapter2.p3":"Disse hverdagserfaringer var med til at forme en af PETS & DOGUEs centrale idéer — at skabe en verden, hvor dyreejere kan opdage steder, information og fællesskaber, der gør livet sammen lettere.",
"chapter2.alt1":"Miso nyder en dag ude",
"chapter2.alt2":"Miso rejser og opdager et nyt sted",
"chapter2.alt3":"Miso på et af sine eventyr",

"chapter3.kicker":"HENDES STIL",
"chapter3.title":"Mode, men altid Miso",
"chapter3.p1":"Miso har en garderobe, der afspejler hendes personlighed: legesyg, feminin og umulig at tage alt for alvorligt.",
"chapter3.p2":"En lyserød kjole, en lille sløjfe eller et nøje udvalgt tilbehør kan gøre en almindelig gåtur til en lille særlig begivenhed. Men tøjet skaber aldrig karakteren. Det klarer Miso helt selv.",
"chapter3.p3":"For PETS & DOGUE handler dyremode ikke om at gøre dyr til objekter. Det handler om at fejre personlighed, komfort, kreativitet og det glædelige forhold mellem mennesker og de dyr, de elsker.",
"chapter3.alt1":"Miso i et af sine karakteristiske lyserøde outfits",
"chapter3.alt2":"Miso klædt på til en udflugt",
"chapter3.alt3":"Miso viser sin legesyge stil",

"quote2.text":"Outfittet kan være lyserødt.<br>Attituden er helt hendes egen.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"BEGYNDELSEN",
"chapter4.title":"Hvordan en lille hund<br>inspirerede noget større",
"chapter4.p1":"PETS & DOGUE begyndte ikke med idéen om at skabe endnu en traditionel publikation om kæledyr.",
"chapter4.p2":"Det begyndte med det virkelige liv: at rejse med et dyr, finde imødekommende steder, tage billeder, dele historier, opdage nyttige tjenester og møde mennesker, hvis dyr er en vigtig del af familien.",
"chapter4.p3":"Miso blev tråden, der forbandt alle disse oplevelser. Gennem hende opstod idéen om en digital lifestyleplatform, hvor dyr ikke er en lille kategori gemt i udkanten af menneskers liv. De er en del af historien.",
"chapter4.p4":"Den idé blev til PETS & DOGUE.",
"chapter4.alt1":"Miso, hvis eventyr inspirerede PETS & DOGUE",
"chapter4.alt2":"Miso nyder livet i byen",

"chapter5.kicker":"BAG NAVNET",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Et andet navn er tæt forbundet med Misos historie: Miso Cute.",
"chapter5.p2":"Det indfanger noget enkelt ved hende — kombinationen af sødme, humor og umiskendelig karakter, som får mennesker til at stoppe op, smile og huske hende.",
"chapter5.p3":"Men bag de søde billeder findes en ægte lille personlighed: selvstændig, når hun vil, kærlig, når hun selv vælger det, opmærksom, eventyrlysten og meget tydelig omkring, hvad hun kan lide.",
"chapter5.alt1":"Miso poserer til et fotografi",
"chapter5.alt2":"Miso Cute — personligheden bag fotografierne",

"chapter6.kicker":"MERE END EN FORSIDESTJERNE",
"chapter6.title":"En lille ambassadør<br>for en større verden",
"chapter6.p1":"Miso er PETS & DOGUEs første forsidestjerne, men hendes rolle i historien går langt ud over et fotografi på en forside.",
"chapter6.p2":"Hun repræsenterer grunden til, at denne platform findes: dyr er ledsagere, familiemedlemmer, rejsende, personligheder og deltagere i vores daglige liv.",
"chapter6.p3":"Gennem PETS & DOGUE kan den verden vokse — fra pet-friendly steder og velvære til mode, fotografi, fællesskab, hjælp, historier og muligheder for dyreejere over hele verden.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, forsidestjerne for PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso repræsenterer PETS & DOGUE-fællesskabet",

"ending.kicker":"PETS & DOGUE · UDGAVE 01",
"ending.title":"Og dette er kun<br>begyndelsen",
"ending.p1":"Misos historie åbnede det første kapitel. Nu tilhører PETS & DOGUE ethvert dyr med en historie, der fortjener at blive fortalt, og ethvert menneske, hvis verden blev bedre, fordi et dyr blev en del af den.",
"ending.p2":"Mange flere historier venter.",
"ending.signature":"Med kærlighed, Miso ♡",
"ending.alt":"Miso ved afslutningen på sin PETS & DOGUE-forsidehistorie",

"nav.back":"TILBAGE TIL UDGAVE 01",
"nav.next":"NÆSTE HISTORIE",
"share.label":"DEL DENNE HISTORIE",
"share.copy":"KOPIÉR LINK",
"share.copied":"LINK KOPIERET",
"audio.play":"Lyt til denne historie",
"audio.pause":"Sæt oplæsningen på pause",
"audio.stop":"Stop oplæsningen",
"audio.unsupported":"Tekst-til-tale er ikke tilgængelig i denne browser."

},/* =====================================================
   NORWEGIAN
===================================================== */

no:{

"page.kicker":"PETS & DOGUE · UTGAVE 01 · FORSIDESTJERNE",
"hero.eyebrow":"HISTORIEN BAK FORSIDEN",
"hero.title":"Møt Miso",
"hero.subtitle":"Den lille blonde pomeranianen bak en veldig stor idé.",
"hero.alt":"Miso, den blonde pomeranianen og forsidestjernen til PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"Miso er kanskje bitteliten, men hun har aldri levd et lite liv. Nysgjerrig, uttrykksfull og alltid klar for det neste eventyret ble denne lille blonde pomeranianen inspirasjonen til PETS & DOGUE.",
"intro.p2":"Hun elsker å reise, oppdage vakre steder, møte mennesker og selvfølgelig mote. Men det som gjør Miso uforglemmelig, er ikke bare hvordan hun ser ut. Det er personligheten bak de lyse øynene — selvsikker, kjærlig, morsom og helt unik.",
"intro.p3":"Dette er historien om den lille hunden som bidro til å inspirere en helt ny verden for dyr og menneskene som elsker dem.",

"chapter1.kicker":"KAPITTEL ÉN",
"chapter1.title":"En veldig liten hund<br>med en veldig stor personlighet",
"chapter1.p1":"Fra begynnelsen var Miso umulig å overse. Hun ville vite hva som skjedde, hvor alle skulle, og om hun også kunne bli med.",
"chapter1.p2":"Størrelsen hennes virket aldri særlig viktig for henne. En ny gate, en hotellobby, en park, en kafé eller en ukjent by kunne bli en del av hennes verden på få minutter.",
"chapter1.p3":"Denne nysgjerrigheten ble senere en av ideene som definerer PETS & DOGUE: livet med et dyr trenger ikke bli mindre. Det kan bli rikere, mer interessant og mer sammenkoblet.",
"chapter1.alt1":"Miso utforsker verden utendørs",
"chapter1.alt2":"Miso ser nysgjerrig på verden rundt seg",

"quote1.text":"Liten nok til å bæres.<br>Nysgjerrig nok til å dra hvor som helst.",
"quote1.credit":"— MISOS VERDEN",

"chapter2.kicker":"LIVET MED MISO",
"chapter2.title":"Den lille oppdageren",
"chapter2.p1":"Miso elsker å oppdage nye steder. For henne er en tur sjelden bare en tur. Det finnes nye lukter å undersøke, mennesker å observere, gater å utforske og steder å huske.",
"chapter2.p2":"Å reise med henne viste også noe viktig: det er ikke alltid enkelt å finne steder som virkelig er pet-friendly. Noen ønsker dyr varmt velkommen, andre har uklare regler. Noen ganger kommer den mest nyttige informasjonen fra en annen dyreeier som allerede har vært der.",
"chapter2.p3":"Disse hverdagserfaringene bidro til å forme en av PETS & DOGUEs sentrale ideer — å skape en verden der dyreeiere kan oppdage steder, informasjon og fellesskap som gjør livet sammen enklere.",
"chapter2.alt1":"Miso nyter en dag ute",
"chapter2.alt2":"Miso reiser og oppdager et nytt sted",
"chapter2.alt3":"Miso på et av eventyrene sine",

"chapter3.kicker":"HENNES STIL",
"chapter3.title":"Mote, men alltid Miso",
"chapter3.p1":"Miso har en garderobe som gjenspeiler personligheten hennes: leken, feminin og umulig å ta altfor seriøst.",
"chapter3.p2":"En rosa kjole, en liten sløyfe eller et nøye valgt tilbehør kan gjøre en vanlig tur til en liten spesiell anledning. Men klærne skaper aldri karakteren. Det klarer Miso helt selv.",
"chapter3.p3":"For PETS & DOGUE handler dyremote ikke om å gjøre dyr til objekter. Det handler om å feire personlighet, komfort, kreativitet og det gledelige forholdet mellom mennesker og dyrene de elsker.",
"chapter3.alt1":"Miso i et av sine karakteristiske rosa antrekk",
"chapter3.alt2":"Miso kledd for en utflukt",
"chapter3.alt3":"Miso viser sin lekne stil",

"quote2.text":"Antrekket kan være rosa.<br>Holdningen er helt hennes egen.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"BEGYNNELSEN",
"chapter4.title":"Hvordan en liten hund<br>inspirerte noe større",
"chapter4.p1":"PETS & DOGUE begynte ikke med ideen om å lage enda en tradisjonell publikasjon om kjæledyr.",
"chapter4.p2":"Det begynte med det virkelige livet: å reise med et dyr, lete etter innbydende steder, ta bilder, dele historier, oppdage nyttige tjenester og møte mennesker der dyrene er en viktig del av familien.",
"chapter4.p3":"Miso ble tråden som knyttet alle disse erfaringene sammen. Gjennom henne oppsto ideen om en digital lifestyleplattform der dyr ikke er en liten kategori gjemt i utkanten av menneskers liv. De er en del av historien.",
"chapter4.p4":"Den ideen ble PETS & DOGUE.",
"chapter4.alt1":"Miso, hvis eventyr inspirerte PETS & DOGUE",
"chapter4.alt2":"Miso nyter bylivet",

"chapter5.kicker":"BAK NAVNET",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Et annet navn er tett knyttet til Misos historie: Miso Cute.",
"chapter5.p2":"Det fanger noe enkelt ved henne — kombinasjonen av søthet, humor og umiskjennelig karakter som får mennesker til å stoppe, smile og huske henne.",
"chapter5.p3":"Men bak de søte bildene finnes en ekte liten personlighet: selvstendig når hun vil, kjærlig når hun selv bestemmer, observant, eventyrlysten og veldig tydelig på hva hun liker.",
"chapter5.alt1":"Miso poserer for et fotografi",
"chapter5.alt2":"Miso Cute — personligheten bak fotografiene",

"chapter6.kicker":"MER ENN EN FORSIDESTJERNE",
"chapter6.title":"En liten ambassadør<br>for en større verden",
"chapter6.p1":"Miso er PETS & DOGUEs første forsidestjerne, men rollen hennes i denne historien går langt utover et fotografi på en forside.",
"chapter6.p2":"Hun representerer grunnen til at denne plattformen finnes: dyr er følgesvenner, familiemedlemmer, reisende, personligheter og deltakere i hverdagen vår.",
"chapter6.p3":"Gjennom PETS & DOGUE kan denne verdenen vokse — fra pet-friendly steder og velvære til mote, fotografi, fellesskap, hjelp, historier og muligheter for dyreeiere over hele verden.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, forsidestjerne for PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso representerer PETS & DOGUE-fellesskapet",

"ending.kicker":"PETS & DOGUE · UTGAVE 01",
"ending.title":"Og dette er bare<br>begynnelsen",
"ending.p1":"Misos historie åpnet det første kapittelet. Nå tilhører PETS & DOGUE hvert dyr med en historie som fortjener å bli fortalt, og hvert menneske hvis verden ble bedre fordi et dyr ble en del av den.",
"ending.p2":"Mange flere historier venter.",
"ending.signature":"Med kjærlighet, Miso ♡",
"ending.alt":"Miso på slutten av sin PETS & DOGUE-forsidehistorie",

"nav.back":"TILBAKE TIL UTGAVE 01",
"nav.next":"NESTE HISTORIE",
"share.label":"DEL DENNE HISTORIEN",
"share.copy":"KOPIER LENKE",
"share.copied":"LENKE KOPIERT",
"audio.play":"Lytt til denne historien",
"audio.pause":"Sett opplesningen på pause",
"audio.stop":"Stopp opplesningen",
"audio.unsupported":"Tekst-til-tale er ikke tilgjengelig i denne nettleseren."

},

/* =====================================================
   FINNISH
===================================================== */

fi:{

"page.kicker":"PETS & DOGUE · NUMERO 01 · KANSITÄHTI",
"hero.eyebrow":"TARINA KANNEN TAKANA",
"hero.title":"Tapaa Miso",
"hero.subtitle":"Pieni vaalea pomeranian suuren idean takana.",
"hero.alt":"Miso, vaalea pomeranian ja PETS & DOGUE -lehden kansitähti",

"intro.dropcap":"M",
"intro.p1":"Miso saattaa olla pikkuruinen, mutta hän ei ole koskaan elänyt pientä elämää. Utelias, ilmeikäs ja aina valmis seuraavaan seikkailuun — tästä pienestä vaaleasta pomeranianista tuli PETS & DOGUE -lehden inspiraatio.",
"intro.p2":"Hän rakastaa matkustamista, kauniiden paikkojen löytämistä, ihmisten tapaamista ja tietenkin muotia. Misoa ei kuitenkaan tee unohtumattomaksi vain hänen ulkonäkönsä. Se on kirkkaiden silmien takana oleva persoonallisuus — itsevarma, rakastava, hauska ja täysin ainutlaatuinen.",
"intro.p3":"Tämä on tarina pienestä koirasta, joka auttoi inspiroimaan kokonaan uuden maailman eläimille ja niitä rakastaville ihmisille.",

"chapter1.kicker":"LUKU YKSI",
"chapter1.title":"Hyvin pieni koira<br>hyvin suurella persoonallisuudella",
"chapter1.p1":"Misoa oli mahdoton olla huomaamatta alusta lähtien. Hän halusi tietää, mitä tapahtui, minne kaikki olivat menossa ja saisiko hänkin tulla mukaan.",
"chapter1.p2":"Hänen kokonsa ei koskaan vaikuttanut olevan hänelle erityisen tärkeä. Uusi katu, hotellin aula, puisto, kahvila tai tuntematon kaupunki saattoi muuttua osaksi hänen maailmaansa muutamassa minuutissa.",
"chapter1.p3":"Tästä uteliaisuudesta tuli myöhemmin yksi PETS & DOGUE -maailmaa määrittelevistä ajatuksista: elämä eläimen kanssa ei tarkoita, että elämän pitäisi pienentyä. Se voi muuttua rikkaammaksi, kiinnostavammaksi ja yhteisöllisemmäksi.",
"chapter1.alt1":"Miso tutkii maailmaa ulkona",
"chapter1.alt2":"Miso tarkkailee uteliaana ympäröivää maailmaa",

"quote1.text":"Tarpeeksi pieni kannettavaksi.<br>Tarpeeksi utelias menemään kaikkialle.",
"quote1.credit":"— MISON MAAILMA",

"chapter2.kicker":"ELÄMÄ MISON KANSSA",
"chapter2.title":"Pieni tutkimusmatkailija",
"chapter2.p1":"Miso rakastaa uusien paikkojen löytämistä. Hänelle kävely on harvoin vain kävely. On uusia tuoksuja tutkittavana, ihmisiä tarkkailtavana, katuja löydettävänä ja paikkoja muistettavana.",
"chapter2.p2":"Hänen kanssaan matkustaminen paljasti myös jotain tärkeää: aidosti lemmikkiystävällisten paikkojen löytäminen ei ole aina helppoa. Joissakin eläimet toivotetaan lämpimästi tervetulleiksi, toisissa säännöt ovat epäselviä. Joskus hyödyllisin tieto tulee toiselta lemmikinomistajalta, joka on jo käynyt paikassa.",
"chapter2.p3":"Nämä arkiset kokemukset auttoivat muotoilemaan yhden PETS & DOGUE -maailman keskeisistä ajatuksista — maailman, jossa lemmikinomistajat voivat löytää paikkoja, tietoa ja yhteisöjä, jotka tekevät yhteisestä elämästä helpompaa.",
"chapter2.alt1":"Miso nauttii päivästä ulkona",
"chapter2.alt2":"Miso matkustaa ja löytää uuden paikan",
"chapter2.alt3":"Miso yhdellä seikkailuistaan",

"chapter3.kicker":"HÄNEN TYYLINSÄ",
"chapter3.title":"Muotia, mutta aina Miso",
"chapter3.p1":"Misolla on vaatekaappi, joka heijastaa hänen persoonallisuuttaan: leikkisä, naisellinen ja mahdoton ottaa liian vakavasti.",
"chapter3.p2":"Vaaleanpunainen mekko, pieni rusetti tai huolella valittu asuste voi muuttaa tavallisen kävelyn pieneksi erityiseksi hetkeksi. Vaatteet eivät kuitenkaan koskaan luo luonnetta. Siitä Miso huolehtii itse.",
"chapter3.p3":"PETS & DOGUElle lemmikkimuoti ei tarkoita eläinten muuttamista esineiksi. Kyse on persoonallisuuden, mukavuuden, luovuuden sekä ihmisten ja heidän rakastamiensa eläinten iloisen suhteen juhlistamisesta.",
"chapter3.alt1":"Miso yhdessä tunnusomaisista vaaleanpunaisista asuistaan",
"chapter3.alt2":"Miso pukeutuneena retkeä varten",
"chapter3.alt3":"Miso näyttää leikkisän tyylinsä",

"quote2.text":"Asu voi olla vaaleanpunainen.<br>Asenne on täysin hänen omansa.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"ALKU",
"chapter4.title":"Kuinka pieni koira<br>inspiroi jotain suurempaa",
"chapter4.p1":"PETS & DOGUE ei alkanut ajatuksesta luoda jälleen yhtä perinteistä lemmikkijulkaisua.",
"chapter4.p2":"Se alkoi todellisesta elämästä: matkustamisesta eläimen kanssa, tervetulleiden paikkojen etsimisestä, valokuvaamisesta, tarinoiden jakamisesta, hyödyllisten palveluiden löytämisestä ja sellaisten ihmisten tapaamisesta, joiden eläimet ovat olennainen osa perhettä.",
"chapter4.p3":"Misosta tuli lanka, joka yhdisti kaikki nämä kokemukset. Hänen kauttaan syntyi ajatus digitaalisesta lifestyle-alustasta, jossa eläimet eivät ole pieni kategoria ihmisten elämän reunalla. Ne ovat osa tarinaa.",
"chapter4.p4":"Tästä ajatuksesta tuli PETS & DOGUE.",
"chapter4.alt1":"Miso, jonka seikkailut inspiroivat PETS & DOGUEa",
"chapter4.alt2":"Miso nauttii kaupunkielämästä",

"chapter5.kicker":"NIMEN TAKANA",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Mison tarinaan liittyy läheisesti toinenkin nimi: Miso Cute.",
"chapter5.p2":"Se kiteyttää jotain yksinkertaista hänessä — suloisuuden, huumorin ja tunnistettavan luonteen yhdistelmän, joka saa ihmiset pysähtymään, hymyilemään ja muistamaan hänet.",
"chapter5.p3":"Suloisten kuvien takana on kuitenkin aito pieni persoonallisuus: itsenäinen silloin kun haluaa, rakastava omilla ehdoillaan, tarkkaavainen, seikkailunhaluinen ja erittäin varma siitä, mistä pitää.",
"chapter5.alt1":"Miso poseeraa valokuvassa",
"chapter5.alt2":"Miso Cute — persoonallisuus valokuvien takana",

"chapter6.kicker":"ENEMMÄN KUIN KANSITÄHTI",
"chapter6.title":"Pieni lähettiläs<br>suuremmalle maailmalle",
"chapter6.p1":"Miso on PETS & DOGUE -lehden ensimmäinen kansitähti, mutta hänen roolinsa tässä tarinassa ulottuu paljon yhtä kansikuvaa pidemmälle.",
"chapter6.p2":"Hän edustaa syytä, jonka vuoksi tämä alusta on olemassa: eläimet ovat kumppaneita, perheenjäseniä, matkustajia, persoonallisuuksia ja osallistujia jokapäiväisessä elämässämme.",
"chapter6.p3":"PETS & DOGUE voi kasvattaa tätä maailmaa — lemmikkiystävällisistä paikoista ja hyvinvoinnista muotiin, valokuvaukseen, yhteisöön, apuun, tarinoihin ja mahdollisuuksiin lemmikinomistajille kaikkialla maailmassa.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, PETS & DOGUE Issue 01 -numeron kansitähti",
"chapter6.alt2":"Miso edustaa PETS & DOGUE -yhteisöä",

"ending.kicker":"PETS & DOGUE · NUMERO 01",
"ending.title":"Ja tämä on vasta<br>alku",
"ending.p1":"Mison tarina avasi ensimmäisen luvun. Nyt PETS & DOGUE kuuluu jokaiselle eläimelle, jonka tarina ansaitsee tulla kerrotuksi, ja jokaiselle ihmiselle, jonka maailma muuttui paremmaksi eläimen tultua osaksi sitä.",
"ending.p2":"Monet muut tarinat odottavat.",
"ending.signature":"Rakkaudella, Miso ♡",
"ending.alt":"Miso PETS & DOGUE -kansitarinansa lopussa",

"nav.back":"TAKAISIN NUMEROON 01",
"nav.next":"SEURAAVA TARINA",
"share.label":"JAA TÄMÄ TARINA",
"share.copy":"KOPIOI LINKKI",
"share.copied":"LINKKI KOPIOITU",
"audio.play":"Kuuntele tämä tarina",
"audio.pause":"Keskeytä kerronta",
"audio.stop":"Lopeta kerronta",
"audio.unsupported":"Tekstistä puheeksi -toiminto ei ole käytettävissä tässä selaimessa."

},

/* =====================================================
   TURKISH
===================================================== */

tr:{

"page.kicker":"PETS & DOGUE · SAYI 01 · KAPAK YILDIZI",
"hero.eyebrow":"KAPAĞIN ARDINDAKİ HİKÂYE",
"hero.title":"Miso ile Tanışın",
"hero.subtitle":"Çok büyük bir fikrin arkasındaki küçük sarışın Pomeranian.",
"hero.alt":"Miso, sarışın Pomeranian ve PETS & DOGUE kapak yıldızı",

"intro.dropcap":"M",
"intro.p1":"Miso minicik olabilir ama hiçbir zaman küçük bir hayat yaşamadı. Meraklı, etkileyici ve her zaman bir sonraki maceraya hazır olan bu küçük sarışın Pomeranian, PETS & DOGUE'un ilham kaynağı oldu.",
"intro.p2":"Seyahat etmeyi, güzel yerler keşfetmeyi, insanlarla tanışmayı ve elbette modayı seviyor. Ancak Miso'yu unutulmaz yapan yalnızca görünüşü değil. O parlak gözlerin arkasındaki kişilik — özgüvenli, sevgi dolu, komik ve tamamen benzersiz.",
"intro.p3":"Bu, hayvanlar ve onları seven insanlar için yepyeni bir dünyanın doğmasına ilham veren küçük köpeğin hikâyesi.",

"chapter1.kicker":"BİRİNCİ BÖLÜM",
"chapter1.title":"Çok küçük bir köpek<br>çok büyük bir kişilik",
"chapter1.p1":"En başından beri Miso'yu fark etmemek imkânsızdı. Ne olduğunu, herkesin nereye gittiğini ve kendisinin de gelip gelemeyeceğini bilmek istiyordu.",
"chapter1.p2":"Boyutu onun için hiçbir zaman özellikle önemli görünmedi. Yeni bir sokak, otel lobisi, park, kafe veya yabancı bir şehir birkaç dakika içinde onun dünyasının parçası olabilirdi.",
"chapter1.p3":"Bu merak daha sonra PETS & DOGUE'u tanımlayan fikirlerden biri oldu: bir hayvanla yaşamak hayatın küçülmesi gerektiği anlamına gelmez. Hayat daha zengin, daha ilginç ve daha bağlantılı olabilir.",
"chapter1.alt1":"Miso dışarıdaki dünyayı keşfediyor",
"chapter1.alt2":"Miso çevresindeki dünyayı merakla izliyor",

"quote1.text":"Kucakta taşınacak kadar küçük.<br>Her yere gidecek kadar meraklı.",
"quote1.credit":"— MISO'NUN DÜNYASI",

"chapter2.kicker":"MISO İLE HAYAT",
"chapter2.title":"Küçük kâşif",
"chapter2.p1":"Miso yeni yerler keşfetmeyi seviyor. Onun için bir yürüyüş nadiren yalnızca bir yürüyüştür. Keşfedilecek yeni kokular, izlenecek insanlar, gezilecek sokaklar ve hatırlanacak yerler vardır.",
"chapter2.p2":"Onunla seyahat etmek önemli bir şeyi de gösterdi: gerçekten pet-friendly yerler bulmak her zaman kolay değil. Bazı yerler hayvanları sıcak karşılıyor, bazılarının kuralları belirsiz. Bazen en yararlı bilgi, oraya daha önce gitmiş başka bir hayvan sahibinden geliyor.",
"chapter2.p3":"Bu günlük deneyimler PETS & DOGUE'un temel fikirlerinden birini şekillendirdi — hayvan sahiplerinin birlikte yaşamı kolaylaştıran yerleri, bilgileri ve toplulukları keşfedebileceği bir dünya yaratmak.",
"chapter2.alt1":"Miso dışarıda bir günün tadını çıkarıyor",
"chapter2.alt2":"Miso seyahat ediyor ve yeni bir yer keşfediyor",
"chapter2.alt3":"Miso maceralarından birinde",

"chapter3.kicker":"ONUN STİLİ",
"chapter3.title":"Moda, ama her zaman Miso",
"chapter3.p1":"Miso'nun kişiliğini yansıtan bir gardırobu var: eğlenceli, feminen ve fazla ciddiye alınması imkânsız.",
"chapter3.p2":"Pembe bir elbise, küçük bir fiyonk veya özenle seçilmiş bir aksesuar sıradan bir yürüyüşü küçük bir özel ana dönüştürebilir. Ama kıyafetler karakteri asla yaratmaz. Miso bunu kendi başına gayet iyi yapar.",
"chapter3.p3":"PETS & DOGUE için hayvan modası, hayvanları nesnelere dönüştürmek değildir. Kişiliği, rahatlığı, yaratıcılığı ve insanlar ile sevdikleri hayvanlar arasındaki neşeli bağı kutlamaktır.",
"chapter3.alt1":"Miso karakteristik pembe kıyafetlerinden birinde",
"chapter3.alt2":"Miso dışarı çıkmak için giyinmiş",
"chapter3.alt3":"Miso eğlenceli stilini gösteriyor",

"quote2.text":"Kıyafet pembe olabilir.<br>Tavır tamamen ona ait.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"BAŞLANGIÇ",
"chapter4.title":"Küçük bir köpek<br>daha büyük bir şeye nasıl ilham verdi",
"chapter4.p1":"PETS & DOGUE, bir başka geleneksel evcil hayvan yayını oluşturma fikriyle başlamadı.",
"chapter4.p2":"Gerçek hayatla başladı: bir hayvanla seyahat etmek, sıcak karşılayan yerler aramak, fotoğraf çekmek, hikâyeler paylaşmak, faydalı hizmetler keşfetmek ve hayvanları ailelerinin vazgeçilmez bir parçası olan insanlarla tanışmak.",
"chapter4.p3":"Miso tüm bu deneyimleri birbirine bağlayan iplik oldu. Onun sayesinde hayvanların insan hayatının kenarında saklı küçük bir kategori olmadığı dijital bir lifestyle platformu fikri doğdu. Onlar hikâyenin bir parçası.",
"chapter4.p4":"Bu fikir PETS & DOGUE oldu.",
"chapter4.alt1":"Maceraları PETS & DOGUE'a ilham veren Miso",
"chapter4.alt2":"Miso şehir hayatının tadını çıkarıyor",

"chapter5.kicker":"İSMİN ARDINDA",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Miso'nun hikâyesiyle yakından bağlantılı bir başka isim daha var: Miso Cute.",
"chapter5.p2":"Onunla ilgili basit bir şeyi özetliyor — insanların durmasına, gülümsemesine ve onu hatırlamasına neden olan sevimlilik, mizah ve benzersiz karakter karışımını.",
"chapter5.p3":"Ama sevimli fotoğrafların arkasında gerçek bir küçük kişilik var: istediğinde bağımsız, kendisi karar verdiğinde sevgi dolu, dikkatli, maceracı ve neleri sevdiği konusunda son derece net.",
"chapter5.alt1":"Miso fotoğraf için poz veriyor",
"chapter5.alt2":"Miso Cute — fotoğrafların arkasındaki kişilik",

"chapter6.kicker":"BİR KAPAK YILDIZINDAN DAHA FAZLASI",
"chapter6.title":"Daha büyük bir dünya için<br>küçük bir elçi",
"chapter6.p1":"Miso PETS & DOGUE'un ilk kapak yıldızı, ancak bu hikâyedeki rolü bir kapak fotoğrafının çok ötesine uzanıyor.",
"chapter6.p2":"Bu platformun var olma nedenini temsil ediyor: hayvanlar yol arkadaşları, aile üyeleri, gezginler, kişilikler ve günlük hayatımızın katılımcılarıdır.",
"chapter6.p3":"PETS & DOGUE aracılığıyla bu dünya büyüyebilir — pet-friendly yerlerden ve wellness'tan modaya, fotoğrafçılığa, topluluğa, yardıma, hikâyelere ve dünyanın her yerindeki hayvan sahipleri için fırsatlara kadar.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, PETS & DOGUE Issue 01 kapak yıldızı",
"chapter6.alt2":"Miso PETS & DOGUE topluluğunu temsil ediyor",

"ending.kicker":"PETS & DOGUE · SAYI 01",
"ending.title":"Ve bu sadece<br>başlangıç",
"ending.p1":"Miso'nun hikâyesi ilk bölümü açtı. Artık PETS & DOGUE, anlatılmayı hak eden bir hikâyesi olan her hayvana ve bir hayvan hayatının parçası olduğu için dünyası güzelleşen her insana ait.",
"ending.p2":"Bizi bekleyen daha birçok hikâye var.",
"ending.signature":"Sevgiyle, Miso ♡",
"ending.alt":"Miso PETS & DOGUE kapak hikâyesinin sonunda",

"nav.back":"SAYI 01'E DÖN",
"nav.next":"SONRAKİ HİKÂYE",
"share.label":"BU HİKÂYEYİ PAYLAŞ",
"share.copy":"BAĞLANTIYI KOPYALA",
"share.copied":"BAĞLANTI KOPYALANDI",
"audio.play":"Bu hikâyeyi dinle",
"audio.pause":"Anlatımı duraklat",
"audio.stop":"Anlatımı durdur",
"audio.unsupported":"Metinden sese özelliği bu tarayıcıda kullanılamıyor."

},/* =====================================================
   ARABIC
===================================================== */

ar:{

"page.kicker":"PETS & DOGUE · العدد 01 · نجمة الغلاف",
"hero.eyebrow":"القصة وراء الغلاف",
"hero.title":"تعرّفوا إلى Miso",
"hero.subtitle":"كلبة البوميرانيان الشقراء الصغيرة وراء فكرة كبيرة جدًا.",
"hero.alt":"Miso، كلبة البوميرانيان الشقراء ونجمة غلاف PETS & DOGUE",

"intro.dropcap":"M",
"intro.p1":"قد تكون Miso صغيرة جدًا، لكنها لم تعش يومًا حياة صغيرة. فضولية ومعبّرة ومستعدة دائمًا للمغامرة التالية، أصبحت هذه البوميرانيان الشقراء الصغيرة مصدر الإلهام لـ PETS & DOGUE.",
"intro.p2":"تحب السفر واكتشاف الأماكن الجميلة والتعرف إلى الناس، وبالطبع الموضة. لكن ما يجعل Miso لا تُنسى ليس مظهرها فقط، بل الشخصية خلف تلك العينين اللامعتين — واثقة، محبة، مرحة وفريدة تمامًا.",
"intro.p3":"هذه قصة الكلبة الصغيرة التي ساعدت في إلهام عالم جديد بالكامل للحيوانات وللأشخاص الذين يحبونها.",

"chapter1.kicker":"الفصل الأول",
"chapter1.title":"كلبة صغيرة جدًا<br>بشخصية كبيرة جدًا",
"chapter1.p1":"منذ البداية كان من المستحيل عدم ملاحظة Miso. كانت تريد أن تعرف ما الذي يحدث، وإلى أين يذهب الجميع، وهل يمكنها الذهاب معهم أيضًا.",
"chapter1.p2":"لم يبدُ حجمها مهمًا لها يومًا. شارع جديد، بهو فندق، حديقة، مقهى أو مدينة غير مألوفة يمكن أن تصبح جزءًا من عالمها خلال دقائق.",
"chapter1.p3":"أصبح هذا الفضول لاحقًا إحدى الأفكار التي تحدد PETS & DOGUE: العيش مع حيوان لا يعني أن تصبح الحياة أصغر. بل يمكن أن تصبح أغنى وأكثر إثارة وترابطًا.",
"chapter1.alt1":"Miso تستكشف العالم في الخارج",
"chapter1.alt2":"Miso تراقب العالم من حولها بفضول",

"quote1.text":"صغيرة بما يكفي لتحملها بين ذراعيك.<br>وفضولية بما يكفي للذهاب إلى كل مكان.",
"quote1.credit":"— عالم MISO",

"chapter2.kicker":"الحياة مع MISO",
"chapter2.title":"المستكشفة الصغيرة",
"chapter2.p1":"تحب Miso اكتشاف الأماكن الجديدة. بالنسبة إليها، نادرًا ما تكون النزهة مجرد نزهة. هناك روائح جديدة لاكتشافها، وأشخاص لمراقبتهم، وشوارع لاستكشافها، وأماكن تستحق التذكر.",
"chapter2.p2":"كما كشف السفر معها شيئًا مهمًا: العثور على أماكن صديقة للحيوانات بالفعل ليس دائمًا أمرًا بسيطًا. بعض الأماكن ترحب بالحيوانات بحرارة، بينما تكون قواعد أماكن أخرى غير واضحة. وأحيانًا تأتي أفضل المعلومات من صاحب حيوان آخر سبق أن زار المكان.",
"chapter2.p3":"ساعدت هذه التجارب اليومية في تشكيل إحدى الأفكار الأساسية لـ PETS & DOGUE — إنشاء عالم يستطيع فيه أصحاب الحيوانات اكتشاف الأماكن والمعلومات والمجتمعات التي تجعل الحياة معًا أسهل.",
"chapter2.alt1":"Miso تستمتع بيوم في الخارج",
"chapter2.alt2":"Miso تسافر وتكتشف مكانًا جديدًا",
"chapter2.alt3":"Miso خلال إحدى مغامراتها",

"chapter3.kicker":"أسلوبها",
"chapter3.title":"الموضة، ولكن دائمًا Miso",
"chapter3.p1":"لدى Miso خزانة ملابس تعكس شخصيتها: مرحة وأنثوية ومن المستحيل التعامل معها بجدية زائدة.",
"chapter3.p2":"يمكن لفستان وردي أو فيونكة صغيرة أو إكسسوار مختار بعناية أن يحول نزهة عادية إلى مناسبة صغيرة مميزة. لكن الملابس لا تصنع الشخصية أبدًا. Miso تتولى ذلك بنفسها.",
"chapter3.p3":"بالنسبة إلى PETS & DOGUE، موضة الحيوانات لا تعني تحويل الحيوانات إلى أشياء. بل تعني الاحتفاء بالشخصية والراحة والإبداع والعلاقة المبهجة بين الناس والحيوانات التي يحبونها.",
"chapter3.alt1":"Miso بأحد أزيائها الوردية المميزة",
"chapter3.alt2":"Miso مرتدية ملابسها للخروج",
"chapter3.alt3":"Miso تستعرض أسلوبها المرح",

"quote2.text":"قد يكون الزي ورديًا.<br>أما الشخصية فهي لها وحدها.",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"البداية",
"chapter4.title":"كيف ألهمت كلبة صغيرة<br>شيئًا أكبر",
"chapter4.p1":"لم تبدأ PETS & DOGUE بفكرة إنشاء إصدار تقليدي آخر عن الحيوانات.",
"chapter4.p2":"بدأت من الحياة الحقيقية: السفر مع حيوان، والبحث عن أماكن مرحبة، والتقاط الصور، ومشاركة القصص، واكتشاف الخدمات المفيدة، والتعرف إلى أشخاص تمثل الحيوانات جزءًا أساسيًا من عائلاتهم.",
"chapter4.p3":"أصبحت Miso الخيط الذي ربط كل هذه التجارب. ومن خلالها ظهرت فكرة منصة رقمية لأسلوب الحياة لا تكون فيها الحيوانات فئة صغيرة مخفية على هامش حياة البشر. بل تكون جزءًا من القصة.",
"chapter4.p4":"وأصبحت هذه الفكرة PETS & DOGUE.",
"chapter4.alt1":"Miso التي ألهمت مغامراتها PETS & DOGUE",
"chapter4.alt2":"Miso تستمتع بالحياة في المدينة",

"chapter5.kicker":"وراء الاسم",
"chapter5.title":"Miso Cute",
"chapter5.p1":"هناك اسم آخر مرتبط ارتباطًا وثيقًا بقصة Miso: Miso Cute.",
"chapter5.p2":"إنه يلخص شيئًا بسيطًا فيها — ذلك المزيج من اللطافة والفكاهة والشخصية التي لا تخطئها العين، والذي يجعل الناس يتوقفون ويبتسمون ويتذكرونها.",
"chapter5.p3":"لكن خلف الصور اللطيفة توجد شخصية صغيرة حقيقية: مستقلة عندما تريد، محبة عندما تختار، منتبهة، مغامرة وواضحة جدًا بشأن الأشياء التي تحبها.",
"chapter5.alt1":"Miso تقف لالتقاط صورة",
"chapter5.alt2":"Miso Cute — الشخصية وراء الصور",

"chapter6.kicker":"أكثر من نجمة غلاف",
"chapter6.title":"سفيرة صغيرة<br>لعالم أكبر",
"chapter6.p1":"Miso هي أول نجمة غلاف لـ PETS & DOGUE، لكن دورها في هذه القصة يتجاوز بكثير مجرد صورة على الغلاف.",
"chapter6.p2":"إنها تمثل سبب وجود هذه المنصة: الحيوانات رفاق وأفراد من العائلة ومسافرون وشخصيات ومشاركون في حياتنا اليومية.",
"chapter6.p3":"ومن خلال PETS & DOGUE يمكن لهذا العالم أن ينمو — من الأماكن الصديقة للحيوانات والعافية إلى الموضة والتصوير والمجتمع والمساعدة والقصص والفرص لأصحاب الحيوانات في جميع أنحاء العالم.",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso، نجمة غلاف PETS & DOGUE Issue 01",
"chapter6.alt2":"Miso تمثل مجتمع PETS & DOGUE",

"ending.kicker":"PETS & DOGUE · العدد 01",
"ending.title":"وهذه ليست سوى<br>البداية",
"ending.p1":"افتتحت قصة Miso الفصل الأول. والآن تنتمي PETS & DOGUE إلى كل حيوان لديه قصة تستحق أن تُروى، وإلى كل شخص أصبح عالمه أفضل لأن حيوانًا أصبح جزءًا منه.",
"ending.p2":"هناك الكثير من القصص الأخرى التي تنتظرنا.",
"ending.signature":"مع الحب، Miso ♡",
"ending.alt":"Miso في نهاية قصة غلافها في PETS & DOGUE",

"nav.back":"العودة إلى العدد 01",
"nav.next":"القصة التالية",
"share.label":"مشاركة هذه القصة",
"share.copy":"نسخ الرابط",
"share.copied":"تم نسخ الرابط",
"audio.play":"استمع إلى هذه القصة",
"audio.pause":"إيقاف السرد مؤقتًا",
"audio.stop":"إيقاف السرد",
"audio.unsupported":"ميزة تحويل النص إلى كلام غير متاحة في هذا المتصفح."

},

/* =====================================================
   HINDI
===================================================== */

hi:{

"page.kicker":"PETS & DOGUE · अंक 01 · कवर स्टार",
"hero.eyebrow":"कवर के पीछे की कहानी",
"hero.title":"मिलिए Miso से",
"hero.subtitle":"एक बहुत बड़े विचार के पीछे छोटी सी सुनहरे रंग की Pomeranian.",
"hero.alt":"Miso, सुनहरे रंग की Pomeranian और PETS & DOGUE की कवर स्टार",

"intro.dropcap":"M",
"intro.p1":"Miso बहुत छोटी हो सकती है, लेकिन उसने कभी छोटी ज़िंदगी नहीं जी। जिज्ञासु, अभिव्यक्तिपूर्ण और हमेशा अगली रोमांचक यात्रा के लिए तैयार, यह छोटी सुनहरे रंग की Pomeranian PETS & DOGUE की प्रेरणा बन गई।",
"intro.p2":"उसे यात्रा करना, खूबसूरत जगहें खोजना, लोगों से मिलना और निश्चित रूप से फैशन पसंद है। लेकिन Miso को यादगार केवल उसका रूप नहीं बनाता। उन चमकती आँखों के पीछे की शख्सियत उसे खास बनाती है — आत्मविश्वासी, प्यार करने वाली, मज़ेदार और बिल्कुल अनोखी।",
"intro.p3":"यह उस छोटी कुतिया की कहानी है जिसने जानवरों और उनसे प्यार करने वाले लोगों के लिए एक पूरी नई दुनिया की प्रेरणा देने में मदद की।",

"chapter1.kicker":"अध्याय एक",
"chapter1.title":"बहुत छोटी सी कुतिया<br>बहुत बड़ी शख्सियत",
"chapter1.p1":"शुरुआत से ही Miso को नज़रअंदाज़ करना असंभव था। वह जानना चाहती थी कि क्या हो रहा है, सब कहाँ जा रहे हैं और क्या वह भी साथ जा सकती है।",
"chapter1.p2":"उसका छोटा आकार उसके लिए कभी खास मायने नहीं रखता था। नई सड़क, होटल की लॉबी, पार्क, कैफ़े या अनजान शहर कुछ ही मिनटों में उसकी दुनिया का हिस्सा बन सकते थे।",
"chapter1.p3":"यही जिज्ञासा बाद में PETS & DOGUE को परिभाषित करने वाले विचारों में से एक बनी: किसी जानवर के साथ रहने का अर्थ यह नहीं कि जीवन छोटा हो जाए। वह अधिक समृद्ध, दिलचस्प और जुड़ा हुआ बन सकता है।",
"chapter1.alt1":"Miso बाहर की दुनिया खोज रही है",
"chapter1.alt2":"Miso अपने आसपास की दुनिया को जिज्ञासा से देख रही है",

"quote1.text":"गोद में उठाने जितनी छोटी।<br>हर जगह जाने जितनी जिज्ञासु।",
"quote1.credit":"— MISO की दुनिया",

"chapter2.kicker":"MISO के साथ जीवन",
"chapter2.title":"छोटी खोजकर्ता",
"chapter2.p1":"Miso को नई जगहें खोजना बहुत पसंद है। उसके लिए सैर शायद ही कभी सिर्फ सैर होती है। नई खुशबुएँ, देखने के लिए लोग, खोजने के लिए सड़कें और याद रखने लायक जगहें हमेशा मौजूद रहती हैं।",
"chapter2.p2":"उसके साथ यात्रा करने से एक महत्वपूर्ण बात भी सामने आई: वास्तव में pet-friendly जगहें खोजना हमेशा आसान नहीं होता। कुछ जगहें जानवरों का गर्मजोशी से स्वागत करती हैं, जबकि कुछ के नियम स्पष्ट नहीं होते। कभी-कभी सबसे उपयोगी जानकारी किसी ऐसे दूसरे pet owner से मिलती है जो पहले वहाँ जा चुका हो।",
"chapter2.p3":"इन रोज़मर्रा के अनुभवों ने PETS & DOGUE के मुख्य विचारों में से एक को आकार दिया — एक ऐसी दुनिया बनाना जहाँ pet owners ऐसी जगहें, जानकारी और communities खोज सकें जो साथ रहने को आसान बनाती हैं।",
"chapter2.alt1":"Miso बाहर एक दिन का आनंद ले रही है",
"chapter2.alt2":"Miso यात्रा कर रही है और नई जगह खोज रही है",
"chapter2.alt3":"Miso अपनी एक रोमांचक यात्रा पर",

"chapter3.kicker":"उसका स्टाइल",
"chapter3.title":"फैशन, लेकिन हमेशा Miso",
"chapter3.p1":"Miso की wardrobe उसकी personality जैसी है: playful, feminine और इतनी मज़ेदार कि उसे बहुत गंभीरता से लेना संभव नहीं।",
"chapter3.p2":"एक गुलाबी dress, छोटा bow या सावधानी से चुना accessory एक सामान्य walk को छोटी सी खास occasion में बदल सकता है। लेकिन कपड़े कभी character नहीं बनाते। वह काम Miso खुद बहुत अच्छी तरह करती है।",
"chapter3.p3":"PETS & DOGUE के लिए pet fashion का मतलब जानवरों को वस्तु बनाना नहीं है। इसका मतलब personality, comfort, creativity और लोगों तथा उनके प्रिय जानवरों के बीच खुशहाल रिश्ते का उत्सव मनाना है।",
"chapter3.alt1":"Miso अपने खास गुलाबी outfits में से एक में",
"chapter3.alt2":"Miso बाहर जाने के लिए तैयार",
"chapter3.alt3":"Miso अपना playful style दिखा रही है",

"quote2.text":"Outfit गुलाबी हो सकता है।<br>Attitude पूरी तरह उसका अपना है।",
"quote2.credit":"— PETS & DOGUE",

"chapter4.kicker":"शुरुआत",
"chapter4.title":"एक छोटी कुतिया ने<br>कैसे कुछ बड़ा प्रेरित किया",
"chapter4.p1":"PETS & DOGUE की शुरुआत एक और पारंपरिक pet publication बनाने के विचार से नहीं हुई।",
"chapter4.p2":"यह वास्तविक जीवन से शुरू हुआ: pet के साथ यात्रा करना, स्वागत करने वाली जगहें ढूँढना, तस्वीरें लेना, कहानियाँ साझा करना, उपयोगी services खोजना और ऐसे लोगों से मिलना जिनके जानवर उनके परिवार का अहम हिस्सा हैं।",
"chapter4.p3":"Miso वह धागा बन गई जिसने इन सभी अनुभवों को जोड़ा। उसी के माध्यम से एक digital lifestyle platform का विचार आया जहाँ pets मानव जीवन के किनारे छिपी छोटी category नहीं हैं। वे कहानी का हिस्सा हैं।",
"chapter4.p4":"वही विचार PETS & DOGUE बन गया।",
"chapter4.alt1":"Miso, जिसकी adventures ने PETS & DOGUE को प्रेरित किया",
"chapter4.alt2":"Miso शहर की ज़िंदगी का आनंद ले रही है",

"chapter5.kicker":"नाम के पीछे",
"chapter5.title":"Miso Cute",
"chapter5.p1":"Miso की कहानी से एक और नाम गहराई से जुड़ा है: Miso Cute.",
"chapter5.p2":"यह उसके बारे में एक सरल बात को समेटता है — cuteness, humour और unmistakable character का वह मेल जो लोगों को रुकने, मुस्कुराने और उसे याद रखने पर मजबूर करता है।",
"chapter5.p3":"लेकिन प्यारी तस्वीरों के पीछे एक असली छोटी personality है: जब चाहे independent, जब खुद तय करे तब affectionate, observant, adventurous और उसे क्या पसंद है इस बारे में बिल्कुल स्पष्ट।",
"chapter5.alt1":"Miso तस्वीर के लिए pose कर रही है",
"chapter5.alt2":"Miso Cute — तस्वीरों के पीछे की personality",

"chapter6.kicker":"सिर्फ एक कवर स्टार से कहीं अधिक",
"chapter6.title":"एक बड़ी दुनिया के लिए<br>छोटी ambassador",
"chapter6.p1":"Miso PETS & DOGUE की पहली cover star है, लेकिन इस कहानी में उसकी भूमिका cover पर एक photograph से कहीं आगे जाती है।",
"chapter6.p2":"वह उस कारण का प्रतिनिधित्व करती है जिसके लिए यह platform मौजूद है: जानवर companions, family members, travellers, personalities और हमारे रोज़मर्रा के जीवन के participants हैं।",
"chapter6.p3":"PETS & DOGUE के माध्यम से यह दुनिया बढ़ सकती है — pet-friendly places और wellness से लेकर fashion, photography, community, help, stories और दुनिया भर के pet owners के लिए opportunities तक।",
"chapter6.p4":"One world. Every pet.",
"chapter6.alt1":"Miso, PETS & DOGUE Issue 01 की cover star",
"chapter6.alt2":"Miso PETS & DOGUE community का प्रतिनिधित्व करती है",

"ending.kicker":"PETS & DOGUE · अंक 01",
"ending.title":"और यह तो बस<br>शुरुआत है",
"ending.p1":"Miso की कहानी ने पहला अध्याय खोला। अब PETS & DOGUE हर उस जानवर का है जिसकी कहानी सुनाए जाने लायक है और हर उस व्यक्ति का जिसकी दुनिया इसलिए बेहतर हुई क्योंकि एक जानवर उसका हिस्सा बना।",
"ending.p2":"अभी बहुत सी और कहानियाँ हमारा इंतज़ार कर रही हैं।",
"ending.signature":"प्यार के साथ, Miso ♡",
"ending.alt":"अपनी PETS & DOGUE cover story के अंत में Miso",

"nav.back":"अंक 01 पर वापस जाएँ",
"nav.next":"अगली कहानी",
"share.label":"यह कहानी शेयर करें",
"share.copy":"लिंक कॉपी करें",
"share.copied":"लिंक कॉपी हो गया",
"audio.play":"यह कहानी सुनें",
"audio.pause":"नैरेशन रोकें",
"audio.stop":"नैरेशन बंद करें",
"audio.unsupported":"इस browser में text-to-speech उपलब्ध नहीं है।"

}};

/* =====================================================
   LANGUAGE ALIASES
   Keep project-wide aliases compatible:
   ua → uk
   cz → cs
   gr → el
   se → sv
   dk → da
===================================================== */

const aliases = {
  ua: "uk",
  cz: "cs",
  gr: "el",
  se: "sv",
  dk: "da"
};

const supported = Object.keys(T);

function normaliseLanguage(value) {
  if (!value) return "en";

  let lang = String(value)
    .trim()
    .toLowerCase()
    .replace("_", "-")
    .split("-")[0];

  lang = aliases[lang] || lang;

  return supported.includes(lang) ? lang : "en";
}

function getSavedLanguage() {
  const candidates = [
    localStorage.getItem("pd_lang"),
    localStorage.getItem("petsDogueLanguage"),
    localStorage.getItem("pets-dogue-language"),
    localStorage.getItem("language"),
    document.documentElement.lang
  ];

  for (const candidate of candidates) {
    const lang = normaliseLanguage(candidate);
    if (candidate && supported.includes(lang)) {
      return lang;
    }
  }

  return "en";
}

function saveLanguage(lang) {
  try {
    localStorage.setItem("pd_lang", lang);
    localStorage.setItem("petsDogueLanguage", lang);
    localStorage.setItem("pets-dogue-language", lang);
  } catch (error) {
    /* localStorage may be unavailable in private/restricted contexts */
  }
}

function getTranslation(lang, key) {
  const selected = T[lang] || T.en || {};
  const english = T.en || {};

  if (
    Object.prototype.hasOwnProperty.call(selected, key) &&
    selected[key] !== null &&
    selected[key] !== undefined
  ) {
    return selected[key];
  }

  if (
    Object.prototype.hasOwnProperty.call(english, key) &&
    english[key] !== null &&
    english[key] !== undefined
  ) {
    return english[key];
  }

  return null;
}

function setTextOrHTML(element, value) {
  if (!element || value === null || value === undefined) return;

  if (String(value).includes("<br>")) {
    element.innerHTML = value;
  } else {
    element.textContent = value;
  }
}

function applyTranslations(lang) {
  lang = normaliseLanguage(lang);

  const rtl = lang === "ar";

  document.documentElement.lang = lang;
  document.documentElement.dir = rtl ? "rtl" : "ltr";

  document.body.classList.toggle("is-rtl", rtl);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const value = getTranslation(lang, key);

    if (value !== null) {
      setTextOrHTML(element, value);
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    const value = getTranslation(lang, key);

    if (value !== null) {
      element.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.getAttribute("data-i18n-alt");
    const value = getTranslation(lang, key);

    if (value !== null) {
      element.setAttribute("alt", value);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.getAttribute("data-i18n-title");
    const value = getTranslation(lang, key);

    if (value !== null) {
      element.setAttribute("title", value);
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.getAttribute("data-i18n-aria-label");
    const value = getTranslation(lang, key);

    if (value !== null) {
      element.setAttribute("aria-label", value);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const value = getTranslation(lang, key);

    if (value !== null) {
      element.setAttribute("placeholder", value);
    }
  });

  document.querySelectorAll(
    'select[data-language-select], select[data-lang-select], #languageSelect, #language-select'
  ).forEach((select) => {
    if ([...select.options].some((option) => normaliseLanguage(option.value) === lang)) {
      const matchingOption = [...select.options].find(
        (option) => normaliseLanguage(option.value) === lang
      );

      if (matchingOption) {
        select.value = matchingOption.value;
      }
    }
  });

  saveLanguage(lang);

  window.PetsDogueCurrentLanguage = lang;

  window.dispatchEvent(
    new CustomEvent("petsdogue:languagechange", {
      detail: { language: lang }
    })
  );
}

function changeLanguage(lang) {
  applyTranslations(lang);
}

function bindLanguageControls() {
  document.querySelectorAll(
    'select[data-language-select], select[data-lang-select], #languageSelect, #language-select'
  ).forEach((select) => {
    if (select.dataset.misoI18nBound === "1") return;

    select.dataset.misoI18nBound = "1";

    select.addEventListener("change", (event) => {
      changeLanguage(event.target.value);
    });
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    if (button.dataset.misoI18nBound === "1") return;

    button.dataset.misoI18nBound = "1";

    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang");
      if (lang) changeLanguage(lang);
    });
  });
}

/* =====================================================
   PUBLIC API
===================================================== */

window.PetsDogueMisoTranslations = T;

window.PetsDogueMisoI18n = {
  translations: T,
  aliases,
  supported,
  normaliseLanguage,
  getTranslation,
  apply: applyTranslations,
  setLanguage: changeLanguage,
  getLanguage: () =>
    normaliseLanguage(
      window.PetsDogueCurrentLanguage || getSavedLanguage()
    )
};

/* Compatibility with the existing PETS & DOGUE
   language system used by the global shell. */

window.PetsDogueTranslations =
  window.PetsDogueTranslations || {};

window.PetsDogueTranslations.issue01Miso = T;

/* =====================================================
   LISTEN FOR LANGUAGE CHANGES FROM GLOBAL SHELL
===================================================== */

[
  "petsdogue:language",
  "petsdogue-language-change",
  "pd:languagechange",
  "languagechange"
].forEach((eventName) => {
  window.addEventListener(eventName, (event) => {
    const detail = event && event.detail;

    const candidate =
      (detail && (
        detail.language ||
        detail.lang ||
        detail.code ||
        detail.locale
      )) ||
      (typeof detail === "string" ? detail : null);

    if (candidate) {
      applyTranslations(candidate);
    }
  });
});

/* Watch storage changes made by another tab/window. */

window.addEventListener("storage", (event) => {
  if (
    event.key === "pd_lang" ||
    event.key === "petsDogueLanguage" ||
    event.key === "pets-dogue-language"
  ) {
    applyTranslations(event.newValue || "en");
  }
});

/* =====================================================
   INITIALISE
===================================================== */

function initialiseMisoI18n() {
  bindLanguageControls();
  applyTranslations(getSavedLanguage());

  /*
    The global side menu can be injected after page load.
    Observe only long enough to bind newly inserted language controls.
  */

  const observer = new MutationObserver(() => {
    bindLanguageControls();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.addEventListener(
    "beforeunload",
    () => observer.disconnect(),
    { once: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initialiseMisoI18n,
    { once: true }
  );
} else {
  initialiseMisoI18n();
}

})();
