/*
=========================================================
PETS & DOGUE — ISSUE 01 LOCAL TRANSLATIONS
FREE / STATIC / NO API

Works with:
- issue-01.html
- pets-dogue-shell.js
- translations.js

Language source:
- pets_dogue_language
- petsdogue:languagechange

Brand names and animal names are never translated.
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

const T = {

en:{
"cover.alt":"PETS & DOGUE Issue 01 cover with Miso, Pablo, Jessica, Richie and Pi",
"intro.kicker":"PETS & DOGUE · ISSUE 01 · SUMMER 2026",
"intro.title":"Our very first cover",
"intro.p1":"This is where our first issue begins. Meet Miso, Pablo, Jessica, Richie and Pi — five very different personalities brought together on the very first PETS & DOGUE cover.",
"intro.p2":"Scroll down and get to know each of them a little better. ♡",
"origin.alt":"Miso wearing her pink dress and bow",
"origin.kicker":"PETS & DOGUE · ISSUE 01",
"origin.title1":"It all began",
"origin.title2":"with",
"origin.subtitle":"And her friends.",
"origin.text":"Every story has a beginning. Ours began with one tiny blonde Pomeranian named Miso — and the extraordinary animals around her. Their personalities, friendships, adventures and the joy they bring into our lives became the inspiration for PETS & DOGUE.",
"miso.label":"COVER STAR",
"miso.subtitle":"The little explorer",
"miso.text":"Miso is a tiny blonde Pomeranian from London. She loves fashion, travelling, long walks and discovering beautiful new places. Her curiosity and unmistakable personality became the inspiration behind PETS & DOGUE and the beginning of this first issue.",
"miso.more":"MORE ABOUT MISO",
"miso.alt1":"Miso wearing her pink dress",
"miso.alt2":"Miso on a walk",
"miso.alt3":"Miso resting",
"pablo.label":"COVER STAR",
"pablo.subtitle":"Stylish Sphynx",
"pablo.text":"Pablo is a Sphynx Bambino with enormous personality. He loves warmth, attention and being exactly where something interesting is happening. His expressive blue eyes, short legs and unmistakable character make him impossible to forget.",
"pablo.more":"MORE ABOUT PABLO",
"pablo.altMain":"Pablo the Sphynx Bambino",
"pablo.alt3":"Pablo resting",
"jessica.label":"COVER STAR",
"jessica.subtitle":"Gentle British lady",
"jessica.text":"Jessica is a charming British Shorthair from London. Calm, observant and wonderfully independent, she loves relaxing at home and watching the world from her favourite comfortable places. Soft on the outside, unmistakably Jessica on the inside.",
"jessica.more":"MORE ABOUT JESSICA",
"jessica.alt1":"Jessica relaxing on her white bed",
"jessica.alt2":"Jessica relaxing in the garden",
"jessica.alt3":"Jessica by the window",
"richie.label":"A SPECIAL FRIENDSHIP",
"richie.subtitle":"A gentle little friend",
"richie.text":"Richie is a sweet rabbit with a huge heart. He loves exploring and peaceful days by the sea. His unexpected friendship with Pi became one of the warmest stories in our first issue — two completely different animals who simply chose each other.",
"richie.more":"MORE ABOUT RICHIE",
"richie.alt1":"Richie and Pi cuddling",
"richie.alt2":"Richie and Pi watching the sunset",
"pi.label":"A SPECIAL FRIENDSHIP",
"pi.subtitle":"Bright pink personality",
"pi.text":"Pi is a beautiful pink parrot with a huge personality. Curious, expressive and fiercely loyal, he became Richie's unexpected protector and closest friend. Their adventures together are full of colour, humour and one friendship nobody could have planned.",
"pi.more":"MORE ABOUT PI",
"pi.alt1":"Pi and Richie overlooking the sea",
"pi.alt2":"Pi cuddling Richie",
"ending.kicker":"PETS & DOGUE · ISSUE 01",
"ending.title":"More stories<br>inside this issue",
"ending.text":"Fashion, pet-friendly places, wellness, beautiful photography and stories about the animals who make our world extraordinary — this is only the beginning.",
"ending.caption":"A small dog.<br>A very big idea. ♡"
},

uk:{
"intro.kicker":"PETS & DOGUE · ВИПУСК 01 · ЛІТО 2026",
"intro.title":"Наша найперша обкладинка",
"intro.p1":"Саме тут починається наш перший випуск. Знайомтеся: Miso, Pablo, Jessica, Richie та Pi — п’ять зовсім різних характерів, яких об’єднала перша обкладинка PETS & DOGUE.",
"intro.p2":"Гортайте далі та познайомтеся з кожним із них трохи ближче. ♡",
"origin.title1":"Усе почалося",
"origin.title2":"з",
"origin.subtitle":"І її друзів.",
"origin.text":"Кожна історія має початок. Наша почалася з крихітної білявої померанської собачки на ім’я Miso — та незвичайних тварин навколо неї. Їхні характери, дружба, пригоди й радість, яку вони приносять у наше життя, стали натхненням для PETS & DOGUE.",
"miso.label":"ЗІРКА ОБКЛАДИНКИ",
"miso.subtitle":"Маленька дослідниця",
"miso.text":"Miso — крихітна білява померанська собачка з Лондона. Вона любить моду, подорожі, довгі прогулянки та відкривати красиві нові місця. Її цікавість і неповторний характер стали натхненням для PETS & DOGUE та початком нашого першого випуску.",
"miso.more":"БІЛЬШЕ ПРО MISO",
"pablo.label":"ЗІРКА ОБКЛАДИНКИ",
"pablo.subtitle":"Стильний сфінкс",
"pablo.text":"Pablo — сфінкс-бамбіно з величезним характером. Він любить тепло, увагу й завжди бути там, де відбувається щось цікаве. Його виразні блакитні очі, короткі лапки та неповторний характер неможливо забути.",
"pablo.more":"БІЛЬШЕ ПРО PABLO",
"jessica.label":"ЗІРКА ОБКЛАДИНКИ",
"jessica.subtitle":"Ніжна британська леді",
"jessica.text":"Jessica — чарівна британська короткошерста кішка з Лондона. Спокійна, спостережлива й напрочуд незалежна, вона любить відпочивати вдома та дивитися на світ зі своїх улюблених затишних місць.",
"jessica.more":"БІЛЬШЕ ПРО JESSICA",
"richie.label":"ОСОБЛИВА ДРУЖБА",
"richie.subtitle":"Ніжний маленький друг",
"richie.text":"Richie — милий кролик із величезним серцем. Він любить досліджувати світ і проводити спокійні дні біля моря. Його несподівана дружба з Pi стала однією з найтепліших історій нашого першого випуску.",
"richie.more":"БІЛЬШЕ ПРО RICHIE",
"pi.label":"ОСОБЛИВА ДРУЖБА",
"pi.subtitle":"Яскрава рожева особистість",
"pi.text":"Pi — прекрасний рожевий папуга з величезним характером. Допитливий, виразний і надзвичайно відданий, він став несподіваним захисником і найближчим другом Richie.",
"pi.more":"БІЛЬШЕ ПРО PI",
"ending.kicker":"PETS & DOGUE · ВИПУСК 01",
"ending.title":"Ще більше історій<br>у цьому випуску",
"ending.text":"Мода, pet-friendly місця, добробут, прекрасна фотографія та історії про тварин, які роблять наш світ особливим, — це лише початок.",
"ending.caption":"Маленька собака.<br>Дуже велика ідея. ♡"
},

ru:{
"intro.kicker":"PETS & DOGUE · ВЫПУСК 01 · ЛЕТО 2026",
"intro.title":"Наша самая первая обложка",
"intro.p1":"Именно здесь начинается наш первый выпуск. Знакомьтесь: Miso, Pablo, Jessica, Richie и Pi — пять совершенно разных характеров, которых объединила первая обложка PETS & DOGUE.",
"intro.p2":"Листайте дальше и познакомьтесь с каждым из них немного ближе. ♡",
"origin.title1":"Всё началось",
"origin.title2":"с",
"origin.subtitle":"И её друзей.",
"origin.text":"У каждой истории есть начало. Наша началась с крошечной белокурой померанской собачки по имени Miso — и удивительных животных вокруг неё. Их характеры, дружба, приключения и радость, которую они приносят в нашу жизнь, стали вдохновением для PETS & DOGUE.",
"miso.label":"ЗВЕЗДА ОБЛОЖКИ",
"miso.subtitle":"Маленькая исследовательница",
"miso.text":"Miso — крошечная белокурая померанская собачка из Лондона. Она любит моду, путешествия, долгие прогулки и открывать красивые новые места. Её любопытство и неповторимый характер стали вдохновением для PETS & DOGUE и началом нашего первого выпуска.",
"miso.more":"БОЛЬШЕ О MISO",
"pablo.label":"ЗВЕЗДА ОБЛОЖКИ",
"pablo.subtitle":"Стильный сфинкс",
"pablo.text":"Pablo — сфинкс-бамбино с огромным характером. Он любит тепло, внимание и всегда быть там, где происходит что-то интересное. Его выразительные голубые глаза, короткие лапки и неповторимый характер невозможно забыть.",
"pablo.more":"БОЛЬШЕ О PABLO",
"jessica.label":"ЗВЕЗДА ОБЛОЖКИ",
"jessica.subtitle":"Нежная британская леди",
"jessica.text":"Jessica — очаровательная британская короткошёрстная кошка из Лондона. Спокойная, наблюдательная и удивительно независимая, она любит отдыхать дома и наблюдать за миром из своих любимых уютных мест.",
"jessica.more":"БОЛЬШЕ О JESSICA",
"richie.label":"ОСОБЕННАЯ ДРУЖБА",
"richie.subtitle":"Нежный маленький друг",
"richie.text":"Richie — милый кролик с огромным сердцем. Он любит исследовать мир и проводить спокойные дни у моря. Его неожиданная дружба с Pi стала одной из самых тёплых историй нашего первого выпуска.",
"richie.more":"БОЛЬШЕ О RICHIE",
"pi.label":"ОСОБЕННАЯ ДРУЖБА",
"pi.subtitle":"Яркая розовая личность",
"pi.text":"Pi — прекрасный розовый попугай с огромным характером. Любопытный, выразительный и невероятно преданный, он стал неожиданным защитником и самым близким другом Richie.",
"pi.more":"БОЛЬШЕ О PI",
"ending.kicker":"PETS & DOGUE · ВЫПУСК 01",
"ending.title":"Ещё больше историй<br>в этом выпуске",
"ending.text":"Мода, pet-friendly места, здоровье и благополучие, прекрасная фотография и истории о животных, которые делают наш мир удивительным, — это только начало.",
"ending.caption":"Маленькая собака.<br>Очень большая идея. ♡"
},

fr:{
"intro.kicker":"PETS & DOGUE · NUMÉRO 01 · ÉTÉ 2026",
"intro.title":"Notre toute première couverture",
"intro.p1":"C’est ici que commence notre premier numéro. Découvrez Miso, Pablo, Jessica, Richie et Pi — cinq personnalités très différentes réunies sur la toute première couverture de PETS & DOGUE.",
"intro.p2":"Faites défiler la page et découvrez-les un peu mieux. ♡",
"origin.title1":"Tout a commencé",
"origin.title2":"avec",
"origin.subtitle":"Et ses amis.",
"origin.text":"Chaque histoire a un début. La nôtre a commencé avec une minuscule Poméranienne blonde appelée Miso — et les animaux extraordinaires qui l’entourent. Leurs personnalités, leurs amitiés, leurs aventures et la joie qu’ils apportent ont inspiré PETS & DOGUE.",
"miso.label":"STAR DE COUVERTURE",
"miso.subtitle":"La petite exploratrice",
"miso.text":"Miso est une minuscule Poméranienne blonde de Londres. Elle aime la mode, voyager, les longues promenades et découvrir de nouveaux endroits magnifiques. Sa curiosité et sa personnalité unique ont inspiré PETS & DOGUE.",
"miso.more":"EN SAVOIR PLUS SUR MISO",
"pablo.label":"STAR DE COUVERTURE",
"pablo.subtitle":"Sphynx élégant",
"pablo.text":"Pablo est un Sphynx Bambino doté d’une immense personnalité. Il aime la chaleur, l’attention et être exactement là où quelque chose d’intéressant se passe.",
"pablo.more":"EN SAVOIR PLUS SUR PABLO",
"jessica.label":"STAR DE COUVERTURE",
"jessica.subtitle":"Douce lady britannique",
"jessica.text":"Jessica est une charmante British Shorthair de Londres. Calme, observatrice et merveilleusement indépendante, elle aime se détendre chez elle et regarder le monde depuis ses endroits préférés.",
"jessica.more":"EN SAVOIR PLUS SUR JESSICA",
"richie.label":"UNE AMITIÉ SPÉCIALE",
"richie.subtitle":"Un doux petit ami",
"richie.text":"Richie est un adorable lapin au cœur immense. Il aime explorer et passer des journées paisibles au bord de la mer. Son amitié inattendue avec Pi est devenue l’une des histoires les plus chaleureuses de notre premier numéro.",
"richie.more":"EN SAVOIR PLUS SUR RICHIE",
"pi.label":"UNE AMITIÉ SPÉCIALE",
"pi.subtitle":"Une personnalité rose éclatante",
"pi.text":"Pi est un magnifique perroquet rose doté d’une immense personnalité. Curieux, expressif et extrêmement fidèle, il est devenu le protecteur inattendu et le meilleur ami de Richie.",
"pi.more":"EN SAVOIR PLUS SUR PI",
"ending.kicker":"PETS & DOGUE · NUMÉRO 01",
"ending.title":"Encore plus d’histoires<br>dans ce numéro",
"ending.text":"Mode, lieux pet-friendly, bien-être, belles photographies et histoires sur les animaux qui rendent notre monde extraordinaire — ce n’est que le début.",
"ending.caption":"Un petit chien.<br>Une très grande idée. ♡"
},

de:{
"intro.kicker":"PETS & DOGUE · AUSGABE 01 · SOMMER 2026",
"intro.title":"Unser allererstes Cover",
"intro.p1":"Hier beginnt unsere erste Ausgabe. Lernen Sie Miso, Pablo, Jessica, Richie und Pi kennen — fünf ganz unterschiedliche Persönlichkeiten auf dem allerersten Cover von PETS & DOGUE.",
"intro.p2":"Scrollen Sie weiter und lernen Sie jeden von ihnen ein wenig besser kennen. ♡",
"origin.title1":"Alles begann",
"origin.title2":"mit",
"origin.subtitle":"Und ihren Freunden.",
"origin.text":"Jede Geschichte hat einen Anfang. Unsere begann mit einer winzigen blonden Pomeranian-Hündin namens Miso — und den außergewöhnlichen Tieren um sie herum. Ihre Persönlichkeiten, Freundschaften und Abenteuer wurden zur Inspiration für PETS & DOGUE.",
"miso.label":"COVERSTAR",
"miso.subtitle":"Die kleine Entdeckerin",
"miso.text":"Miso ist eine winzige blonde Pomeranian-Hündin aus London. Sie liebt Mode, Reisen, lange Spaziergänge und wunderschöne neue Orte. Ihre Neugier und unverwechselbare Persönlichkeit inspirierten PETS & DOGUE.",
"miso.more":"MEHR ÜBER MISO",
"pablo.label":"COVERSTAR",
"pablo.subtitle":"Stilvoller Sphynx",
"pablo.text":"Pablo ist ein Sphynx Bambino mit riesiger Persönlichkeit. Er liebt Wärme, Aufmerksamkeit und möchte immer dort sein, wo etwas Interessantes passiert.",
"pablo.more":"MEHR ÜBER PABLO",
"jessica.label":"COVERSTAR",
"jessica.subtitle":"Sanfte britische Lady",
"jessica.text":"Jessica ist eine bezaubernde Britisch-Kurzhaar-Katze aus London. Ruhig, aufmerksam und wunderbar unabhängig liebt sie es, zu Hause zu entspannen und die Welt zu beobachten.",
"jessica.more":"MEHR ÜBER JESSICA",
"richie.label":"EINE BESONDERE FREUNDSCHAFT",
"richie.subtitle":"Ein sanfter kleiner Freund",
"richie.text":"Richie ist ein süßes Kaninchen mit einem riesigen Herzen. Er liebt Entdeckungen und ruhige Tage am Meer. Seine unerwartete Freundschaft mit Pi wurde zu einer der herzlichsten Geschichten unserer ersten Ausgabe.",
"richie.more":"MEHR ÜBER RICHIE",
"pi.label":"EINE BESONDERE FREUNDSCHAFT",
"pi.subtitle":"Leuchtend rosa Persönlichkeit",
"pi.text":"Pi ist ein wunderschöner rosa Papagei mit riesiger Persönlichkeit. Neugierig, ausdrucksstark und unglaublich loyal wurde er Richies unerwarteter Beschützer und engster Freund.",
"pi.more":"MEHR ÜBER PI",
"ending.kicker":"PETS & DOGUE · AUSGABE 01",
"ending.title":"Mehr Geschichten<br>in dieser Ausgabe",
"ending.text":"Mode, tierfreundliche Orte, Wellness, wunderschöne Fotografie und Geschichten über Tiere, die unsere Welt außergewöhnlich machen — das ist erst der Anfang.",
"ending.caption":"Ein kleiner Hund.<br>Eine sehr große Idee. ♡"
},

es:{
"intro.kicker":"PETS & DOGUE · NÚMERO 01 · VERANO 2026",
"intro.title":"Nuestra primera portada",
"intro.p1":"Aquí comienza nuestro primer número. Conoce a Miso, Pablo, Jessica, Richie y Pi: cinco personalidades muy diferentes reunidas en la primera portada de PETS & DOGUE.",
"intro.p2":"Desliza hacia abajo y conócelos un poco mejor. ♡",
"origin.title1":"Todo comenzó",
"origin.title2":"con",
"origin.subtitle":"Y sus amigos.",
"origin.text":"Cada historia tiene un comienzo. La nuestra empezó con una diminuta Pomerania rubia llamada Miso y los extraordinarios animales que la rodean. Sus personalidades, amistades y aventuras inspiraron PETS & DOGUE.",
"miso.label":"ESTRELLA DE PORTADA",
"miso.subtitle":"La pequeña exploradora",
"miso.text":"Miso es una diminuta Pomerania rubia de Londres. Le encanta la moda, viajar, los largos paseos y descubrir lugares nuevos y hermosos. Su curiosidad y personalidad inspiraron PETS & DOGUE.",
"miso.more":"MÁS SOBRE MISO",
"pablo.label":"ESTRELLA DE PORTADA",
"pablo.subtitle":"Sphynx con estilo",
"pablo.text":"Pablo es un Sphynx Bambino con una enorme personalidad. Le encanta el calor, la atención y estar exactamente donde ocurre algo interesante.",
"pablo.more":"MÁS SOBRE PABLO",
"jessica.label":"ESTRELLA DE PORTADA",
"jessica.subtitle":"Dulce dama británica",
"jessica.text":"Jessica es una encantadora British Shorthair de Londres. Tranquila, observadora y maravillosamente independiente, disfruta relajándose en casa y contemplando el mundo.",
"jessica.more":"MÁS SOBRE JESSICA",
"richie.label":"UNA AMISTAD ESPECIAL",
"richie.subtitle":"Un pequeño amigo gentil",
"richie.text":"Richie es un dulce conejo con un corazón enorme. Le encanta explorar y disfrutar de días tranquilos junto al mar. Su inesperada amistad con Pi se convirtió en una de las historias más cálidas de nuestro primer número.",
"richie.more":"MÁS SOBRE RICHIE",
"pi.label":"UNA AMISTAD ESPECIAL",
"pi.subtitle":"Una brillante personalidad rosa",
"pi.text":"Pi es un precioso loro rosa con una enorme personalidad. Curioso, expresivo y ferozmente leal, se convirtió en el inesperado protector y mejor amigo de Richie.",
"pi.more":"MÁS SOBRE PI",
"ending.kicker":"PETS & DOGUE · NÚMERO 01",
"ending.title":"Más historias<br>en este número",
"ending.text":"Moda, lugares pet-friendly, bienestar, hermosa fotografía e historias sobre los animales que hacen extraordinario nuestro mundo: esto es solo el comienzo.",
"ending.caption":"Un perro pequeño.<br>Una idea muy grande. ♡"
},

it:{
"intro.kicker":"PETS & DOGUE · NUMERO 01 · ESTATE 2026",
"intro.title":"La nostra primissima copertina",
"intro.p1":"È qui che inizia il nostro primo numero. Conosci Miso, Pablo, Jessica, Richie e Pi — cinque personalità molto diverse riunite sulla prima copertina di PETS & DOGUE.",
"intro.p2":"Scorri e conoscili un po’ meglio. ♡",
"origin.title1":"Tutto è iniziato",
"origin.title2":"con",
"origin.subtitle":"E i suoi amici.",
"origin.text":"Ogni storia ha un inizio. La nostra è iniziata con una minuscola Pomerania bionda di nome Miso e gli straordinari animali intorno a lei. Le loro personalità, amicizie e avventure hanno ispirato PETS & DOGUE.",
"miso.label":"STAR DI COPERTINA",
"miso.subtitle":"La piccola esploratrice",
"miso.text":"Miso è una minuscola Pomerania bionda di Londra. Ama la moda, viaggiare, le lunghe passeggiate e scoprire nuovi luoghi meravigliosi. La sua curiosità e personalità hanno ispirato PETS & DOGUE.",
"miso.more":"SCOPRI DI PIÙ SU MISO",
"pablo.label":"STAR DI COPERTINA",
"pablo.subtitle":"Sphynx di stile",
"pablo.text":"Pablo è uno Sphynx Bambino con una personalità enorme. Ama il calore, le attenzioni ed essere esattamente dove sta succedendo qualcosa di interessante.",
"pablo.more":"SCOPRI DI PIÙ SU PABLO",
"jessica.label":"STAR DI COPERTINA",
"jessica.subtitle":"Dolce lady britannica",
"jessica.text":"Jessica è un’affascinante British Shorthair di Londra. Calma, attenta e meravigliosamente indipendente, ama rilassarsi a casa e osservare il mondo.",
"jessica.more":"SCOPRI DI PIÙ SU JESSICA",
"richie.label":"UN’AMICIZIA SPECIALE",
"richie.subtitle":"Un dolce piccolo amico",
"richie.text":"Richie è un dolce coniglio dal cuore enorme. Ama esplorare e trascorrere giornate tranquille vicino al mare. La sua inaspettata amicizia con Pi è diventata una delle storie più tenere del nostro primo numero.",
"richie.more":"SCOPRI DI PIÙ SU RICHIE",
"pi.label":"UN’AMICIZIA SPECIALE",
"pi.subtitle":"Una brillante personalità rosa",
"pi.text":"Pi è un bellissimo pappagallo rosa con una personalità enorme. Curioso, espressivo e incredibilmente leale, è diventato l’inaspettato protettore e migliore amico di Richie.",
"pi.more":"SCOPRI DI PIÙ SU PI",
"ending.kicker":"PETS & DOGUE · NUMERO 01",
"ending.title":"Altre storie<br>in questo numero",
"ending.text":"Moda, luoghi pet-friendly, benessere, splendide fotografie e storie sugli animali che rendono straordinario il nostro mondo — questo è solo l’inizio.",
"ending.caption":"Un piccolo cane.<br>Un’idea molto grande. ♡"
},

pt:{
"intro.kicker":"PETS & DOGUE · EDIÇÃO 01 · VERÃO 2026",
"intro.title":"A nossa primeira capa",
"intro.p1":"É aqui que começa a nossa primeira edição. Conheça Miso, Pablo, Jessica, Richie e Pi — cinco personalidades muito diferentes reunidas na primeira capa da PETS & DOGUE.",
"intro.p2":"Continue e conheça cada um deles um pouco melhor. ♡",
"origin.title1":"Tudo começou",
"origin.title2":"com",
"origin.subtitle":"E os seus amigos.",
"origin.text":"Toda história tem um começo. A nossa começou com uma pequena Pomerânia loira chamada Miso e os extraordinários animais à sua volta. As suas personalidades, amizades e aventuras inspiraram PETS & DOGUE.",
"miso.label":"ESTRELA DE CAPA",
"miso.subtitle":"A pequena exploradora",
"miso.text":"Miso é uma pequena Pomerânia loira de Londres. Adora moda, viajar, longos passeios e descobrir novos lugares bonitos. A sua curiosidade e personalidade inspiraram PETS & DOGUE.",
"miso.more":"MAIS SOBRE MISO",
"pablo.label":"ESTRELA DE CAPA",
"pablo.subtitle":"Sphynx elegante",
"pablo.text":"Pablo é um Sphynx Bambino com uma enorme personalidade. Adora calor, atenção e estar exatamente onde algo interessante está a acontecer.",
"pablo.more":"MAIS SOBRE PABLO",
"jessica.label":"ESTRELA DE CAPA",
"jessica.subtitle":"Gentil dama britânica",
"jessica.text":"Jessica é uma encantadora British Shorthair de Londres. Calma, observadora e maravilhosamente independente, adora relaxar em casa e observar o mundo.",
"jessica.more":"MAIS SOBRE JESSICA",
"richie.label":"UMA AMIZADE ESPECIAL",
"richie.subtitle":"Um pequeno amigo gentil",
"richie.text":"Richie é um doce coelho com um enorme coração. Adora explorar e passar dias tranquilos junto ao mar. A sua amizade inesperada com Pi tornou-se uma das histórias mais calorosas da nossa primeira edição.",
"richie.more":"MAIS SOBRE RICHIE",
"pi.label":"UMA AMIZADE ESPECIAL",
"pi.subtitle":"Uma personalidade rosa brilhante",
"pi.text":"Pi é um lindo papagaio rosa com uma enorme personalidade. Curioso, expressivo e extremamente leal, tornou-se o inesperado protetor e melhor amigo de Richie.",
"pi.more":"MAIS SOBRE PI",
"ending.kicker":"PETS & DOGUE · EDIÇÃO 01",
"ending.title":"Mais histórias<br>nesta edição",
"ending.text":"Moda, lugares pet-friendly, bem-estar, belas fotografias e histórias sobre os animais que tornam o nosso mundo extraordinário — isto é apenas o começo.",
"ending.caption":"Um cão pequeno.<br>Uma ideia muito grande. ♡"
},

nl:{
"intro.kicker":"PETS & DOGUE · EDITIE 01 · ZOMER 2026",
"intro.title":"Onze allereerste cover",
"intro.p1":"Hier begint onze eerste editie. Maak kennis met Miso, Pablo, Jessica, Richie en Pi — vijf heel verschillende persoonlijkheden samen op de allereerste PETS & DOGUE-cover.",
"intro.p2":"Scroll verder en leer ze allemaal wat beter kennen. ♡",
"origin.title1":"Het begon allemaal",
"origin.title2":"met",
"origin.subtitle":"En haar vrienden.",
"origin.text":"Elk verhaal heeft een begin. Het onze begon met een piepkleine blonde Pomeranian genaamd Miso en de bijzondere dieren om haar heen. Hun persoonlijkheden, vriendschappen en avonturen inspireerden PETS & DOGUE.",
"miso.label":"COVERSTER",
"miso.subtitle":"De kleine ontdekkingsreiziger",
"miso.text":"Miso is een piepkleine blonde Pomeranian uit Londen. Ze houdt van mode, reizen, lange wandelingen en mooie nieuwe plekken ontdekken. Haar nieuwsgierigheid en persoonlijkheid inspireerden PETS & DOGUE.",
"miso.more":"MEER OVER MISO",
"pablo.label":"COVERSTER",
"pablo.subtitle":"Stijlvolle Sphynx",
"pablo.text":"Pablo is een Sphynx Bambino met een enorme persoonlijkheid. Hij houdt van warmte, aandacht en precies daar zijn waar iets interessants gebeurt.",
"pablo.more":"MEER OVER PABLO",
"jessica.label":"COVERSTER",
"jessica.subtitle":"Zachte Britse dame",
"jessica.text":"Jessica is een charmante British Shorthair uit Londen. Rustig, oplettend en heerlijk onafhankelijk ontspant ze graag thuis en kijkt ze naar de wereld vanuit haar favoriete plekjes.",
"jessica.more":"MEER OVER JESSICA",
"richie.label":"EEN BIJZONDERE VRIENDSCHAP",
"richie.subtitle":"Een zacht klein vriendje",
"richie.text":"Richie is een lief konijn met een enorm hart. Hij houdt van ontdekken en rustige dagen aan zee. Zijn onverwachte vriendschap met Pi werd een van de warmste verhalen van onze eerste editie.",
"richie.more":"MEER OVER RICHIE",
"pi.label":"EEN BIJZONDERE VRIENDSCHAP",
"pi.subtitle":"Een felroze persoonlijkheid",
"pi.text":"Pi is een prachtige roze papegaai met een enorme persoonlijkheid. Nieuwsgierig, expressief en bijzonder loyaal werd hij Richies onverwachte beschermer en beste vriend.",
"pi.more":"MEER OVER PI",
"ending.kicker":"PETS & DOGUE · EDITIE 01",
"ending.title":"Meer verhalen<br>in deze editie",
"ending.text":"Mode, diervriendelijke plekken, welzijn, prachtige fotografie en verhalen over dieren die onze wereld bijzonder maken — dit is nog maar het begin.",
"ending.caption":"Een kleine hond.<br>Een heel groot idee. ♡"
},

pl:{
"intro.kicker":"PETS & DOGUE · WYDANIE 01 · LATO 2026",
"intro.title":"Nasza pierwsza okładka",
"intro.p1":"Tutaj zaczyna się nasze pierwsze wydanie. Poznaj Miso, Pablo, Jessica, Richie i Pi — pięć zupełnie różnych osobowości razem na pierwszej okładce PETS & DOGUE.",
"intro.p2":"Przewiń dalej i poznaj każdego z nich trochę lepiej. ♡",
"origin.title1":"Wszystko zaczęło się",
"origin.title2":"od",
"origin.subtitle":"I jej przyjaciół.",
"origin.text":"Każda historia ma swój początek. Nasza zaczęła się od maleńkiej blond pomeranian o imieniu Miso i niezwykłych zwierząt wokół niej. Ich osobowości, przyjaźnie i przygody stały się inspiracją dla PETS & DOGUE.",
"miso.label":"GWIAZDA OKŁADKI",
"miso.subtitle":"Mała odkrywczyni",
"miso.text":"Miso to maleńka blond pomeranian z Londynu. Kocha modę, podróże, długie spacery i odkrywanie pięknych nowych miejsc. Jej ciekawość i wyjątkowa osobowość zainspirowały PETS & DOGUE.",
"miso.more":"WIĘCEJ O MISO",
"pablo.label":"GWIAZDA OKŁADKI",
"pablo.subtitle":"Stylowy sfinks",
"pablo.text":"Pablo to Sphynx Bambino o ogromnej osobowości. Uwielbia ciepło, uwagę i być dokładnie tam, gdzie dzieje się coś ciekawego.",
"pablo.more":"WIĘCEJ O PABLO",
"jessica.label":"GWIAZDA OKŁADKI",
"jessica.subtitle":"Łagodna brytyjska dama",
"jessica.text":"Jessica to urocza kotka brytyjska krótkowłosa z Londynu. Spokojna, uważna i cudownie niezależna, uwielbia odpoczywać w domu i obserwować świat.",
"jessica.more":"WIĘCEJ O JESSICA",
"richie.label":"WYJĄTKOWA PRZYJAŹŃ",
"richie.subtitle":"Łagodny mały przyjaciel",
"richie.text":"Richie to słodki królik o wielkim sercu. Uwielbia odkrywać świat i spokojne dni nad morzem. Jego niespodziewana przyjaźń z Pi stała się jedną z najcieplejszych historii naszego pierwszego wydania.",
"richie.more":"WIĘCEJ O RICHIE",
"pi.label":"WYJĄTKOWA PRZYJAŹŃ",
"pi.subtitle":"Jaskraworóżowa osobowość",
"pi.text":"Pi to piękna różowa papuga o ogromnej osobowości. Ciekawski, ekspresyjny i niezwykle lojalny stał się niespodziewanym obrońcą i najlepszym przyjacielem Richie.",
"pi.more":"WIĘCEJ O PI",
"ending.kicker":"PETS & DOGUE · WYDANIE 01",
"ending.title":"Więcej historii<br>w tym wydaniu",
"ending.text":"Moda, miejsca przyjazne zwierzętom, dobrostan, piękna fotografia i historie zwierząt, które czynią nasz świat niezwykłym — to dopiero początek.",
"ending.caption":"Mały pies.<br>Bardzo wielki pomysł. ♡"
},

cs:{
"intro.kicker":"PETS & DOGUE · VYDÁNÍ 01 · LÉTO 2026",
"intro.title":"Naše úplně první obálka",
"intro.p1":"Tady začíná naše první vydání. Seznamte se s Miso, Pablo, Jessica, Richie a Pi — pěti velmi odlišnými osobnostmi na první obálce PETS & DOGUE.",
"intro.p2":"Posuňte se dál a poznejte každého z nich o něco lépe. ♡",
"origin.title1":"Všechno začalo",
"origin.title2":"s",
"origin.subtitle":"A jejími přáteli.",
"origin.text":"Každý příběh má začátek. Ten náš začal s maličkou blonďatou pomeraniankou jménem Miso a výjimečnými zvířaty kolem ní. Jejich osobnosti, přátelství a dobrodružství inspirovaly PETS & DOGUE.",
"miso.label":"HVĚZDA OBÁLKY",
"miso.subtitle":"Malá průzkumnice",
"miso.text":"Miso je maličká blonďatá pomeranianka z Londýna. Miluje módu, cestování, dlouhé procházky a objevování krásných nových míst. Její zvědavost a osobnost inspirovaly PETS & DOGUE.",
"miso.more":"VÍCE O MISO",
"pablo.label":"HVĚZDA OBÁLKY",
"pablo.subtitle":"Stylový sphynx",
"pablo.text":"Pablo je Sphynx Bambino s obrovskou osobností. Miluje teplo, pozornost a být přesně tam, kde se děje něco zajímavého.",
"pablo.more":"VÍCE O PABLO",
"jessica.label":"HVĚZDA OBÁLKY",
"jessica.subtitle":"Jemná britská dáma",
"jessica.text":"Jessica je okouzlující britská krátkosrstá kočka z Londýna. Klidná, pozorná a úžasně nezávislá ráda odpočívá doma a sleduje svět.",
"jessica.more":"VÍCE O JESSICA",
"richie.label":"VÝJIMEČNÉ PŘÁTELSTVÍ",
"richie.subtitle":"Jemný malý přítel",
"richie.text":"Richie je milý králík s obrovským srdcem. Miluje objevování a klidné dny u moře. Jeho nečekané přátelství s Pi se stalo jedním z nejvřelejších příběhů našeho prvního vydání.",
"richie.more":"VÍCE O RICHIE",
"pi.label":"VÝJIMEČNÉ PŘÁTELSTVÍ",
"pi.subtitle":"Výrazná růžová osobnost",
"pi.text":"Pi je nádherný růžový papoušek s obrovskou osobností. Zvědavý, výrazný a mimořádně věrný se stal Richieho nečekaným ochráncem a nejbližším přítelem.",
"pi.more":"VÍCE O PI",
"ending.kicker":"PETS & DOGUE · VYDÁNÍ 01",
"ending.title":"Další příběhy<br>v tomto vydání",
"ending.text":"Móda, místa přátelská ke zvířatům, wellness, krásná fotografie a příběhy zvířat, která dělají náš svět výjimečným — to je teprve začátek.",
"ending.caption":"Malý pes.<br>Velmi velký nápad. ♡"
},

sk:{
"intro.kicker":"PETS & DOGUE · VYDANIE 01 · LETO 2026",
"intro.title":"Naša úplne prvá obálka",
"intro.p1":"Tu sa začína naše prvé vydanie. Zoznámte sa s Miso, Pablo, Jessica, Richie a Pi — piatimi veľmi odlišnými osobnosťami na prvej obálke PETS & DOGUE.",
"intro.p2":"Posuňte sa ďalej a spoznajte každého z nich trochu lepšie. ♡",
"origin.title1":"Všetko sa začalo",
"origin.title2":"s",
"origin.subtitle":"A jej priateľmi.",
"origin.text":"Každý príbeh má začiatok. Ten náš sa začal s maličkou blond pomeraniankou Miso a výnimočnými zvieratami okolo nej. Ich osobnosti, priateľstvá a dobrodružstvá inšpirovali PETS & DOGUE.",
"miso.label":"HVIEZDA OBÁLKY",
"miso.subtitle":"Malá objaviteľka",
"miso.text":"Miso je maličká blond pomeranianka z Londýna. Miluje módu, cestovanie, dlhé prechádzky a objavovanie krásnych nových miest. Jej zvedavosť a osobnosť inšpirovali PETS & DOGUE.",
"miso.more":"VIAC O MISO",
"pablo.label":"HVIEZDA OBÁLKY",
"pablo.subtitle":"Štýlový sphynx",
"pablo.text":"Pablo je Sphynx Bambino s obrovskou osobnosťou. Miluje teplo, pozornosť a byť presne tam, kde sa deje niečo zaujímavé.",
"pablo.more":"VIAC O PABLO",
"jessica.label":"HVIEZDA OBÁLKY",
"jessica.subtitle":"Jemná britská dáma",
"jessica.text":"Jessica je očarujúca britská krátkosrstá mačka z Londýna. Pokojná, pozorná a úžasne nezávislá rada odpočíva doma a pozoruje svet.",
"jessica.more":"VIAC O JESSICA",
"richie.label":"VÝNIMOČNÉ PRIATEĽSTVO",
"richie.subtitle":"Jemný malý priateľ",
"richie.text":"Richie je milý králik s obrovským srdcom. Miluje objavovanie a pokojné dni pri mori. Jeho nečakané priateľstvo s Pi sa stalo jedným z najkrajších príbehov nášho prvého vydania.",
"richie.more":"VIAC O RICHIE",
"pi.label":"VÝNIMOČNÉ PRIATEĽSTVO",
"pi.subtitle":"Výrazná ružová osobnosť",
"pi.text":"Pi je krásny ružový papagáj s obrovskou osobnosťou. Zvedavý, výrazný a mimoriadne verný sa stal Richieho nečakaným ochrancom a najbližším priateľom.",
"pi.more":"VIAC O PI",
"ending.kicker":"PETS & DOGUE · VYDANIE 01",
"ending.title":"Ďalšie príbehy<br>v tomto vydaní",
"ending.text":"Móda, pet-friendly miesta, wellness, krásna fotografia a príbehy zvierat, ktoré robia náš svet výnimočným — to je len začiatok.",
"ending.caption":"Malý pes.<br>Veľmi veľký nápad. ♡"
},hu:{
"intro.kicker":"PETS & DOGUE · 01. KIADÁS · 2026 NYÁR",
"intro.title":"A legelső címlapunk",
"intro.p1":"Itt kezdődik az első kiadásunk. Ismerd meg Miso, Pablo, Jessica, Richie és Pi történetét — öt teljesen különböző személyiség a PETS & DOGUE legelső címlapján.",
"intro.p2":"Görgess tovább, és ismerd meg őket egy kicsit közelebbről. ♡",
"origin.title1":"Minden",
"origin.title2":"vele kezdődött:",
"origin.subtitle":"És a barátaival.",
"origin.text":"Minden történetnek van kezdete. A miénk egy apró, szőke Miso nevű pomerániaival és a körülötte élő különleges állatokkal kezdődött. Személyiségük, barátságaik és kalandjaik inspirálták a PETS & DOGUE világát.",
"miso.label":"CÍMLAPSZTÁR",
"miso.subtitle":"A kis felfedező",
"miso.text":"Miso egy apró, szőke pomerániai Londonból. Imádja a divatot, az utazást, a hosszú sétákat és a gyönyörű új helyek felfedezését. Kíváncsisága és különleges személyisége inspirálta a PETS & DOGUE létrejöttét.",
"miso.more":"TÖBB MISO TÖRTÉNETÉRŐL",
"pablo.label":"CÍMLAPSZTÁR",
"pablo.subtitle":"Stílusos szfinx",
"pablo.text":"Pablo egy hatalmas személyiségű Sphynx Bambino. Imádja a meleget, a figyelmet és azt, hogy pontosan ott legyen, ahol valami érdekes történik.",
"pablo.more":"TÖBB PABLO TÖRTÉNETÉRŐL",
"jessica.label":"CÍMLAPSZTÁR",
"jessica.subtitle":"Szelíd brit hölgy",
"jessica.text":"Jessica egy bájos brit rövidszőrű macska Londonból. Nyugodt, figyelmes és csodálatosan független; szeret otthon pihenni és kedvenc helyeiről figyelni a világot.",
"jessica.more":"TÖBB JESSICA TÖRTÉNETÉRŐL",
"richie.label":"EGY KÜLÖNLEGES BARÁTSÁG",
"richie.subtitle":"Egy szelíd kis barát",
"richie.text":"Richie egy kedves nyuszi hatalmas szívvel. Imád felfedezni és békés napokat tölteni a tenger mellett. Pi-vel kötött váratlan barátsága első kiadásunk egyik legmelegebb története lett.",
"richie.more":"TÖBB RICHIE TÖRTÉNETÉRŐL",
"pi.label":"EGY KÜLÖNLEGES BARÁTSÁG",
"pi.subtitle":"Élénk rózsaszín személyiség",
"pi.text":"Pi egy gyönyörű rózsaszín papagáj hatalmas személyiséggel. Kíváncsi, kifejező és rendkívül hűséges; Richie váratlan védelmezője és legjobb barátja lett.",
"pi.more":"TÖBB PI TÖRTÉNETÉRŐL",
"ending.kicker":"PETS & DOGUE · 01. KIADÁS",
"ending.title":"Még több történet<br>ebben a kiadásban",
"ending.text":"Divat, állatbarát helyek, jóllét, gyönyörű fotók és történetek azokról az állatokról, akik különlegessé teszik világunkat — ez még csak a kezdet.",
"ending.caption":"Egy kis kutya.<br>Egy nagyon nagy ötlet. ♡"
},

ro:{
"intro.kicker":"PETS & DOGUE · EDIȚIA 01 · VARĂ 2026",
"intro.title":"Prima noastră copertă",
"intro.p1":"Aici începe prima noastră ediție. Faceți cunoștință cu Miso, Pablo, Jessica, Richie și Pi — cinci personalități foarte diferite reunite pe prima copertă PETS & DOGUE.",
"intro.p2":"Continuați și cunoașteți-i puțin mai bine. ♡",
"origin.title1":"Totul a început",
"origin.title2":"cu",
"origin.subtitle":"Și prietenii ei.",
"origin.text":"Fiecare poveste are un început. A noastră a început cu o mică Pomeranian blondă numită Miso și animalele extraordinare din jurul ei. Personalitățile, prieteniile și aventurile lor au inspirat PETS & DOGUE.",
"miso.label":"VEDETĂ DE COPERTĂ",
"miso.subtitle":"Mica exploratoare",
"miso.text":"Miso este o mică Pomeranian blondă din Londra. Iubește moda, călătoriile, plimbările lungi și descoperirea unor locuri noi și frumoase. Curiozitatea și personalitatea ei au inspirat PETS & DOGUE.",
"miso.more":"MAI MULTE DESPRE MISO",
"pablo.label":"VEDETĂ DE COPERTĂ",
"pablo.subtitle":"Sphynx elegant",
"pablo.text":"Pablo este un Sphynx Bambino cu o personalitate uriașă. Iubește căldura, atenția și să fie exact acolo unde se întâmplă ceva interesant.",
"pablo.more":"MAI MULTE DESPRE PABLO",
"jessica.label":"VEDETĂ DE COPERTĂ",
"jessica.subtitle":"Gentila doamnă britanică",
"jessica.text":"Jessica este o fermecătoare British Shorthair din Londra. Calmă, atentă și minunat de independentă, îi place să se relaxeze acasă și să privească lumea.",
"jessica.more":"MAI MULTE DESPRE JESSICA",
"richie.label":"O PRIETENIE SPECIALĂ",
"richie.subtitle":"Un mic prieten blând",
"richie.text":"Richie este un iepuraș dulce cu o inimă uriașă. Iubește explorarea și zilele liniștite lângă mare. Prietenia lui neașteptată cu Pi a devenit una dintre cele mai calde povești ale primei noastre ediții.",
"richie.more":"MAI MULTE DESPRE RICHIE",
"pi.label":"O PRIETENIE SPECIALĂ",
"pi.subtitle":"O personalitate roz strălucitoare",
"pi.text":"Pi este un papagal roz superb cu o personalitate uriașă. Curios, expresiv și extrem de loial, a devenit protectorul neașteptat și cel mai bun prieten al lui Richie.",
"pi.more":"MAI MULTE DESPRE PI",
"ending.kicker":"PETS & DOGUE · EDIȚIA 01",
"ending.title":"Mai multe povești<br>în această ediție",
"ending.text":"Modă, locuri pet-friendly, wellness, fotografie frumoasă și povești despre animalele care fac lumea noastră extraordinară — acesta este doar începutul.",
"ending.caption":"Un câine mic.<br>O idee foarte mare. ♡"
},

bg:{
"intro.kicker":"PETS & DOGUE · БРОЙ 01 · ЛЯТО 2026",
"intro.title":"Първата ни корица",
"intro.p1":"Тук започва първият ни брой. Запознайте се с Miso, Pablo, Jessica, Richie и Pi — пет напълно различни характера, събрани на първата корица на PETS & DOGUE.",
"intro.p2":"Продължете надолу и ги опознайте малко по-добре. ♡",
"origin.title1":"Всичко започна",
"origin.title2":"с",
"origin.subtitle":"И нейните приятели.",
"origin.text":"Всяка история има начало. Нашата започна с едно мъничко русо померанче на име Miso и необикновените животни около нея. Техните характери, приятелства и приключения вдъхновиха PETS & DOGUE.",
"miso.label":"ЗВЕЗДА НА КОРИЦАТА",
"miso.subtitle":"Малката изследователка",
"miso.text":"Miso е мъничко русо померанче от Лондон. Тя обича модата, пътуванията, дългите разходки и красивите нови места. Любопитството и неповторимият ѝ характер вдъхновиха PETS & DOGUE.",
"miso.more":"ПОВЕЧЕ ЗА MISO",
"pablo.label":"ЗВЕЗДА НА КОРИЦАТА",
"pablo.subtitle":"Стилен сфинкс",
"pablo.text":"Pablo е Sphynx Bambino с огромен характер. Той обича топлината, вниманието и да бъде точно там, където се случва нещо интересно.",
"pablo.more":"ПОВЕЧЕ ЗА PABLO",
"jessica.label":"ЗВЕЗДА НА КОРИЦАТА",
"jessica.subtitle":"Нежна британска дама",
"jessica.text":"Jessica е очарователна британска късокосместа котка от Лондон. Спокойна, наблюдателна и прекрасно независима, тя обича да си почива у дома и да наблюдава света.",
"jessica.more":"ПОВЕЧЕ ЗА JESSICA",
"richie.label":"СПЕЦИАЛНО ПРИЯТЕЛСТВО",
"richie.subtitle":"Нежен малък приятел",
"richie.text":"Richie е мило зайче с огромно сърце. Обича приключенията и спокойните дни край морето. Неочакваното му приятелство с Pi се превърна в една от най-топлите истории в първия ни брой.",
"richie.more":"ПОВЕЧЕ ЗА RICHIE",
"pi.label":"СПЕЦИАЛНО ПРИЯТЕЛСТВО",
"pi.subtitle":"Ярка розова личност",
"pi.text":"Pi е красив розов папагал с огромен характер. Любопитен, изразителен и изключително лоялен, той се превърна в неочаквания защитник и най-близък приятел на Richie.",
"pi.more":"ПОВЕЧЕ ЗА PI",
"ending.kicker":"PETS & DOGUE · БРОЙ 01",
"ending.title":"Още истории<br>в този брой",
"ending.text":"Мода, pet-friendly места, благополучие, красива фотография и истории за животните, които правят света ни необикновен — това е само началото.",
"ending.caption":"Малко куче.<br>Много голяма идея. ♡"
},

el:{
"intro.kicker":"PETS & DOGUE · ΤΕΥΧΟΣ 01 · ΚΑΛΟΚΑΙΡΙ 2026",
"intro.title":"Το πρώτο μας εξώφυλλο",
"intro.p1":"Εδώ ξεκινά το πρώτο μας τεύχος. Γνωρίστε τη Miso, τον Pablo, τη Jessica, τον Richie και τον Pi — πέντε εντελώς διαφορετικές προσωπικότητες στο πρώτο εξώφυλλο του PETS & DOGUE.",
"intro.p2":"Συνεχίστε προς τα κάτω και γνωρίστε τους λίγο καλύτερα. ♡",
"origin.title1":"Όλα ξεκίνησαν",
"origin.title2":"με",
"origin.subtitle":"Και τους φίλους της.",
"origin.text":"Κάθε ιστορία έχει μια αρχή. Η δική μας ξεκίνησε με μια μικροσκοπική ξανθιά Pomeranian που ονομάζεται Miso και τα εξαιρετικά ζώα γύρω της. Οι προσωπικότητες, οι φιλίες και οι περιπέτειές τους ενέπνευσαν το PETS & DOGUE.",
"miso.label":"ΑΣΤΕΡΙ ΕΞΩΦΥΛΛΟΥ",
"miso.subtitle":"Η μικρή εξερευνήτρια",
"miso.text":"Η Miso είναι μια μικροσκοπική ξανθιά Pomeranian από το Λονδίνο. Αγαπά τη μόδα, τα ταξίδια, τους μεγάλους περιπάτους και την ανακάλυψη όμορφων νέων τόπων.",
"miso.more":"ΠΕΡΙΣΣΟΤΕΡΑ ΓΙΑ ΤΗ MISO",
"pablo.label":"ΑΣΤΕΡΙ ΕΞΩΦΥΛΛΟΥ",
"pablo.subtitle":"Κομψός Sphynx",
"pablo.text":"Ο Pablo είναι ένας Sphynx Bambino με τεράστια προσωπικότητα. Αγαπά τη ζεστασιά, την προσοχή και να βρίσκεται ακριβώς εκεί όπου συμβαίνει κάτι ενδιαφέρον.",
"pablo.more":"ΠΕΡΙΣΣΟΤΕΡΑ ΓΙΑ ΤΟΝ PABLO",
"jessica.label":"ΑΣΤΕΡΙ ΕΞΩΦΥΛΛΟΥ",
"jessica.subtitle":"Ευγενική Βρετανίδα κυρία",
"jessica.text":"Η Jessica είναι μια γοητευτική British Shorthair από το Λονδίνο. Ήρεμη, παρατηρητική και υπέροχα ανεξάρτητη, αγαπά να χαλαρώνει στο σπίτι και να παρακολουθεί τον κόσμο.",
"jessica.more":"ΠΕΡΙΣΣΟΤΕΡΑ ΓΙΑ ΤΗ JESSICA",
"richie.label":"ΜΙΑ ΞΕΧΩΡΙΣΤΗ ΦΙΛΙΑ",
"richie.subtitle":"Ένας γλυκός μικρός φίλος",
"richie.text":"Ο Richie είναι ένα γλυκό κουνέλι με τεράστια καρδιά. Αγαπά την εξερεύνηση και τις ήρεμες μέρες δίπλα στη θάλασσα. Η απρόσμενη φιλία του με τον Pi έγινε μία από τις πιο ζεστές ιστορίες του πρώτου μας τεύχους.",
"richie.more":"ΠΕΡΙΣΣΟΤΕΡΑ ΓΙΑ ΤΟΝ RICHIE",
"pi.label":"ΜΙΑ ΞΕΧΩΡΙΣΤΗ ΦΙΛΙΑ",
"pi.subtitle":"Μια φωτεινή ροζ προσωπικότητα",
"pi.text":"Ο Pi είναι ένας πανέμορφος ροζ παπαγάλος με τεράστια προσωπικότητα. Περίεργος, εκφραστικός και εξαιρετικά πιστός, έγινε ο απρόσμενος προστάτης και καλύτερος φίλος του Richie.",
"pi.more":"ΠΕΡΙΣΣΟΤΕΡΑ ΓΙΑ ΤΟΝ PI",
"ending.kicker":"PETS & DOGUE · ΤΕΥΧΟΣ 01",
"ending.title":"Περισσότερες ιστορίες<br>σε αυτό το τεύχος",
"ending.text":"Μόδα, pet-friendly μέρη, ευεξία, όμορφη φωτογραφία και ιστορίες για τα ζώα που κάνουν τον κόσμο μας ξεχωριστό — αυτή είναι μόνο η αρχή.",
"ending.caption":"Ένας μικρός σκύλος.<br>Μια πολύ μεγάλη ιδέα. ♡"
},

sv:{
"intro.kicker":"PETS & DOGUE · UTGÅVA 01 · SOMMAR 2026",
"intro.title":"Vårt allra första omslag",
"intro.p1":"Här börjar vår första utgåva. Möt Miso, Pablo, Jessica, Richie och Pi — fem helt olika personligheter samlade på PETS & DOGUEs allra första omslag.",
"intro.p2":"Scrolla vidare och lär känna var och en lite bättre. ♡",
"origin.title1":"Allt började",
"origin.title2":"med",
"origin.subtitle":"Och hennes vänner.",
"origin.text":"Varje historia har en början. Vår började med en liten blond Pomeranian som heter Miso och de extraordinära djuren runt henne. Deras personligheter, vänskap och äventyr inspirerade PETS & DOGUE.",
"miso.label":"OMSLAGSSTJÄRNA",
"miso.subtitle":"Den lilla upptäckaren",
"miso.text":"Miso är en liten blond Pomeranian från London. Hon älskar mode, resor, långa promenader och att upptäcka vackra nya platser. Hennes nyfikenhet och personlighet inspirerade PETS & DOGUE.",
"miso.more":"MER OM MISO",
"pablo.label":"OMSLAGSSTJÄRNA",
"pablo.subtitle":"Stilfull Sphynx",
"pablo.text":"Pablo är en Sphynx Bambino med en enorm personlighet. Han älskar värme, uppmärksamhet och att vara precis där något intressant händer.",
"pablo.more":"MER OM PABLO",
"jessica.label":"OMSLAGSSTJÄRNA",
"jessica.subtitle":"Mild brittisk dam",
"jessica.text":"Jessica är en charmig British Shorthair från London. Lugn, observant och underbart självständig älskar hon att koppla av hemma och betrakta världen.",
"jessica.more":"MER OM JESSICA",
"richie.label":"EN SPECIELL VÄNSKAP",
"richie.subtitle":"En mild liten vän",
"richie.text":"Richie är en söt kanin med ett enormt hjärta. Han älskar att utforska och lugna dagar vid havet. Hans oväntade vänskap med Pi blev en av de varmaste berättelserna i vår första utgåva.",
"richie.more":"MER OM RICHIE",
"pi.label":"EN SPECIELL VÄNSKAP",
"pi.subtitle":"En lysande rosa personlighet",
"pi.text":"Pi är en vacker rosa papegoja med en enorm personlighet. Nyfiken, uttrycksfull och otroligt lojal blev han Richies oväntade beskyddare och närmaste vän.",
"pi.more":"MER OM PI",
"ending.kicker":"PETS & DOGUE · UTGÅVA 01",
"ending.title":"Fler berättelser<br>i den här utgåvan",
"ending.text":"Mode, djurvänliga platser, välmående, vacker fotografi och berättelser om djuren som gör vår värld extraordinär — detta är bara början.",
"ending.caption":"En liten hund.<br>En väldigt stor idé. ♡"
},

da:{
"intro.kicker":"PETS & DOGUE · UDGAVE 01 · SOMMER 2026",
"intro.title":"Vores allerførste forside",
"intro.p1":"Her begynder vores første udgave. Mød Miso, Pablo, Jessica, Richie og Pi — fem meget forskellige personligheder samlet på PETS & DOGUEs allerførste forside.",
"intro.p2":"Rul videre og lær dem lidt bedre at kende. ♡",
"origin.title1":"Det hele begyndte",
"origin.title2":"med",
"origin.subtitle":"Og hendes venner.",
"origin.text":"Enhver historie har en begyndelse. Vores begyndte med en lille blond Pomeranian ved navn Miso og de ekstraordinære dyr omkring hende. Deres personligheder, venskaber og eventyr inspirerede PETS & DOGUE.",
"miso.label":"FORSIDESTJERNE",
"miso.subtitle":"Den lille opdagelsesrejsende",
"miso.text":"Miso er en lille blond Pomeranian fra London. Hun elsker mode, rejser, lange gåture og at opdage smukke nye steder. Hendes nysgerrighed og personlighed inspirerede PETS & DOGUE.",
"miso.more":"MERE OM MISO",
"pablo.label":"FORSIDESTJERNE",
"pablo.subtitle":"Stilfuld Sphynx",
"pablo.text":"Pablo er en Sphynx Bambino med en enorm personlighed. Han elsker varme, opmærksomhed og at være præcis dér, hvor noget interessant sker.",
"pablo.more":"MERE OM PABLO",
"jessica.label":"FORSIDESTJERNE",
"jessica.subtitle":"Blid britisk dame",
"jessica.text":"Jessica er en charmerende British Shorthair fra London. Rolig, opmærksom og vidunderligt selvstændig elsker hun at slappe af hjemme og betragte verden.",
"jessica.more":"MERE OM JESSICA",
"richie.label":"ET SÆRLIGT VENSKAB",
"richie.subtitle":"En blid lille ven",
"richie.text":"Richie er en sød kanin med et stort hjerte. Han elsker at udforske og rolige dage ved havet. Hans uventede venskab med Pi blev en af de varmeste historier i vores første udgave.",
"richie.more":"MERE OM RICHIE",
"pi.label":"ET SÆRLIGT VENSKAB",
"pi.subtitle":"En lysende pink personlighed",
"pi.text":"Pi er en smuk pink papegøje med en enorm personlighed. Nysgerrig, udtryksfuld og utrolig loyal blev han Richies uventede beskytter og nærmeste ven.",
"pi.more":"MERE OM PI",
"ending.kicker":"PETS & DOGUE · UDGAVE 01",
"ending.title":"Flere historier<br>i denne udgave",
"ending.text":"Mode, kæledyrsvenlige steder, velvære, smuk fotografi og historier om dyrene, der gør vores verden ekstraordinær — dette er kun begyndelsen.",
"ending.caption":"En lille hund.<br>En meget stor idé. ♡"
},

no:{
"intro.kicker":"PETS & DOGUE · UTGAVE 01 · SOMMER 2026",
"intro.title":"Vårt aller første omslag",
"intro.p1":"Her begynner vår første utgave. Møt Miso, Pablo, Jessica, Richie og Pi — fem svært forskjellige personligheter samlet på PETS & DOGUEs aller første omslag.",
"intro.p2":"Bla videre og bli litt bedre kjent med dem. ♡",
"origin.title1":"Det hele begynte",
"origin.title2":"med",
"origin.subtitle":"Og vennene hennes.",
"origin.text":"Hver historie har en begynnelse. Vår begynte med en liten blond Pomeranian ved navn Miso og de ekstraordinære dyrene rundt henne. Personlighetene, vennskapene og eventyrene deres inspirerte PETS & DOGUE.",
"miso.label":"FORSIDESTJERNE",
"miso.subtitle":"Den lille oppdageren",
"miso.text":"Miso er en liten blond Pomeranian fra London. Hun elsker mote, reiser, lange turer og å oppdage vakre nye steder. Nysgjerrigheten og personligheten hennes inspirerte PETS & DOGUE.",
"miso.more":"MER OM MISO",
"pablo.label":"FORSIDESTJERNE",
"pablo.subtitle":"Stilfull Sphynx",
"pablo.text":"Pablo er en Sphynx Bambino med en enorm personlighet. Han elsker varme, oppmerksomhet og å være akkurat der noe interessant skjer.",
"pablo.more":"MER OM PABLO",
"jessica.label":"FORSIDESTJERNE",
"jessica.subtitle":"Mild britisk dame",
"jessica.text":"Jessica er en sjarmerende British Shorthair fra London. Rolig, observant og herlig selvstendig elsker hun å slappe av hjemme og betrakte verden.",
"jessica.more":"MER OM JESSICA",
"richie.label":"ET SPESIELT VENNSKAP",
"richie.subtitle":"En mild liten venn",
"richie.text":"Richie er en søt kanin med et stort hjerte. Han elsker å utforske og rolige dager ved sjøen. Hans uventede vennskap med Pi ble en av de varmeste historiene i vår første utgave.",
"richie.more":"MER OM RICHIE",
"pi.label":"ET SPESIELT VENNSKAP",
"pi.subtitle":"En lys rosa personlighet",
"pi.text":"Pi er en vakker rosa papegøye med en enorm personlighet. Nysgjerrig, uttrykksfull og utrolig lojal ble han Richies uventede beskytter og nærmeste venn.",
"pi.more":"MER OM PI",
"ending.kicker":"PETS & DOGUE · UTGAVE 01",
"ending.title":"Flere historier<br>i denne utgaven",
"ending.text":"Mote, kjæledyrvennlige steder, velvære, vakker fotografi og historier om dyrene som gjør verden vår ekstraordinær — dette er bare begynnelsen.",
"ending.caption":"En liten hund.<br>En veldig stor idé. ♡"
},

fi:{
"intro.kicker":"PETS & DOGUE · NUMERO 01 · KESÄ 2026",
"intro.title":"Ensimmäinen kansikuvamme",
"intro.p1":"Tästä alkaa ensimmäinen numeromme. Tutustu Misoon, Pabloon, Jessicaan, Richieen ja Pihin — viiteen hyvin erilaiseen persoonaan PETS & DOGUE -lehden ensimmäisessä kannessa.",
"intro.p2":"Vieritä eteenpäin ja tutustu heihin hieman paremmin. ♡",
"origin.title1":"Kaikki alkoi",
"origin.title2":"Misosta",
"origin.subtitle":"Ja hänen ystävistään.",
"origin.text":"Jokaisella tarinalla on alku. Meidän tarinamme alkoi pienestä vaaleasta Miso-nimisestä pomeranianista ja hänen ympärillään olevista upeista eläimistä. Heidän persoonallisuutensa, ystävyytensä ja seikkailunsa inspiroivat PETS & DOGUE -lehteä.",
"miso.label":"KANSITÄHTI",
"miso.subtitle":"Pieni tutkimusmatkailija",
"miso.text":"Miso on pieni vaalea pomeranian Lontoosta. Hän rakastaa muotia, matkustamista, pitkiä kävelyitä ja kauniiden uusien paikkojen löytämistä. Hänen uteliaisuutensa ja persoonallisuutensa inspiroivat PETS & DOGUE -lehteä.",
"miso.more":"LISÄÄ MISOSTA",
"pablo.label":"KANSITÄHTI",
"pablo.subtitle":"Tyylikäs Sphynx",
"pablo.text":"Pablo on Sphynx Bambino, jolla on valtava persoona. Hän rakastaa lämpöä, huomiota ja olla juuri siellä, missä tapahtuu jotain kiinnostavaa.",
"pablo.more":"LISÄÄ PABLOSTA",
"jessica.label":"KANSITÄHTI",
"jessica.subtitle":"Lempeä brittiläinen lady",
"jessica.text":"Jessica on hurmaava British Shorthair Lontoosta. Rauhallinen, tarkkaavainen ja ihanan itsenäinen Jessica rakastaa rentoutumista kotona ja maailman seuraamista.",
"jessica.more":"LISÄÄ JESSICASTA",
"richie.label":"ERITYINEN YSTÄVYYS",
"richie.subtitle":"Lempeä pieni ystävä",
"richie.text":"Richie on suloinen kani, jolla on suuri sydän. Hän rakastaa tutkimista ja rauhallisia päiviä meren äärellä. Hänen odottamattomasta ystävyydestään Pin kanssa tuli yksi ensimmäisen numeromme lämpimimmistä tarinoista.",
"richie.more":"LISÄÄ RICHIESTÄ",
"pi.label":"ERITYINEN YSTÄVYYS",
"pi.subtitle":"Kirkkaan vaaleanpunainen persoona",
"pi.text":"Pi on kaunis vaaleanpunainen papukaija, jolla on valtava persoona. Utelias, ilmeikäs ja erittäin uskollinen Pi nousi Richien odottamattomaksi suojelijaksi ja parhaaksi ystäväksi.",
"pi.more":"LISÄÄ PISTÄ",
"ending.kicker":"PETS & DOGUE · NUMERO 01",
"ending.title":"Lisää tarinoita<br>tässä numerossa",
"ending.text":"Muotia, lemmikkiystävällisiä paikkoja, hyvinvointia, kaunista valokuvausta ja tarinoita eläimistä, jotka tekevät maailmastamme ainutlaatuisen — tämä on vasta alkua.",
"ending.caption":"Pieni koira.<br>Erittäin suuri idea. ♡"
},

tr:{
"intro.kicker":"PETS & DOGUE · SAYI 01 · YAZ 2026",
"intro.title":"İlk kapağımız",
"intro.p1":"İlk sayımız burada başlıyor. Miso, Pablo, Jessica, Richie ve Pi ile tanışın — PETS & DOGUE'un ilk kapağında bir araya gelen beş çok farklı kişilik.",
"intro.p2":"Aşağı kaydırın ve her birini biraz daha yakından tanıyın. ♡",
"origin.title1":"Her şey",
"origin.title2":"ile başladı",
"origin.subtitle":"Ve arkadaşlarıyla.",
"origin.text":"Her hikâyenin bir başlangıcı vardır. Bizimki Miso adlı minicik sarışın bir Pomeranian ve çevresindeki olağanüstü hayvanlarla başladı. Kişilikleri, dostlukları ve maceraları PETS & DOGUE'a ilham verdi.",
"miso.label":"KAPAK YILDIZI",
"miso.subtitle":"Küçük kâşif",
"miso.text":"Miso, Londra'dan minicik sarışın bir Pomeranian. Modayı, seyahat etmeyi, uzun yürüyüşleri ve güzel yeni yerler keşfetmeyi seviyor. Merakı ve benzersiz kişiliği PETS & DOGUE'a ilham verdi.",
"miso.more":"MISO HAKKINDA DAHA FAZLA",
"pablo.label":"KAPAK YILDIZI",
"pablo.subtitle":"Şık Sphynx",
"pablo.text":"Pablo, büyük bir kişiliğe sahip bir Sphynx Bambino. Sıcağı, ilgiyi ve ilginç bir şeyin olduğu yerde bulunmayı seviyor.",
"pablo.more":"PABLO HAKKINDA DAHA FAZLA",
"jessica.label":"KAPAK YILDIZI",
"jessica.subtitle":"Nazik İngiliz hanımefendi",
"jessica.text":"Jessica, Londra'dan büyüleyici bir British Shorthair. Sakin, gözlemci ve son derece bağımsız; evde dinlenmeyi ve dünyayı izlemeyi seviyor.",
"jessica.more":"JESSICA HAKKINDA DAHA FAZLA",
"richie.label":"ÖZEL BİR DOSTLUK",
"richie.subtitle":"Nazik küçük bir dost",
"richie.text":"Richie, kocaman kalpli tatlı bir tavşan. Keşfetmeyi ve deniz kenarındaki sakin günleri seviyor. Pi ile beklenmedik dostluğu ilk sayımızın en sıcak hikâyelerinden biri oldu.",
"richie.more":"RICHIE HAKKINDA DAHA FAZLA",
"pi.label":"ÖZEL BİR DOSTLUK",
"pi.subtitle":"Parlak pembe bir kişilik",
"pi.text":"Pi, büyük bir kişiliğe sahip güzel pembe bir papağan. Meraklı, etkileyici ve son derece sadık olan Pi, Richie'nin beklenmedik koruyucusu ve en yakın dostu oldu.",
"pi.more":"PI HAKKINDA DAHA FAZLA",
"ending.kicker":"PETS & DOGUE · SAYI 01",
"ending.title":"Bu sayıda<br>daha fazla hikâye",
"ending.text":"Moda, evcil hayvan dostu yerler, wellness, güzel fotoğraflar ve dünyamızı olağanüstü kılan hayvanların hikâyeleri — bu daha başlangıç.",
"ending.caption":"Küçük bir köpek.<br>Çok büyük bir fikir. ♡"
},

ar:{
"intro.kicker":"PETS & DOGUE · العدد 01 · صيف 2026",
"intro.title":"غلافنا الأول على الإطلاق",
"intro.p1":"من هنا يبدأ عددنا الأول. تعرّفوا إلى Miso وPablo وJessica وRichie وPi — خمس شخصيات مختلفة تمامًا اجتمعت على أول غلاف لـ PETS & DOGUE.",
"intro.p2":"تابعوا التمرير وتعرّفوا إلى كل واحد منهم أكثر قليلًا. ♡",
"origin.title1":"بدأ كل شيء",
"origin.title2":"مع",
"origin.subtitle":"وأصدقائها.",
"origin.text":"لكل قصة بداية. بدأت قصتنا مع كلبة Pomeranian شقراء صغيرة جدًا تدعى Miso والحيوانات الاستثنائية من حولها. شخصياتهم وصداقاتهم ومغامراتهم والفرح الذي يجلبونه إلى حياتنا أصبح مصدر إلهام PETS & DOGUE.",
"miso.label":"نجمة الغلاف",
"miso.subtitle":"المستكشفة الصغيرة",
"miso.text":"Miso كلبة Pomeranian شقراء صغيرة من لندن. تحب الموضة والسفر والمشي الطويل واكتشاف الأماكن الجديدة الجميلة. فضولها وشخصيتها المميزة كانا مصدر إلهام PETS & DOGUE.",
"miso.more":"المزيد عن MISO",
"pablo.label":"نجم الغلاف",
"pablo.subtitle":"Sphynx أنيق",
"pablo.text":"Pablo قط Sphynx Bambino يتمتع بشخصية كبيرة. يحب الدفء والاهتمام وأن يكون دائمًا حيث يحدث شيء مثير للاهتمام.",
"pablo.more":"المزيد عن PABLO",
"jessica.label":"نجمة الغلاف",
"jessica.subtitle":"سيدة بريطانية لطيفة",
"jessica.text":"Jessica قطة British Shorthair ساحرة من لندن. هادئة وملاحظة ومستقلة بشكل رائع، تحب الاسترخاء في المنزل ومشاهدة العالم من أماكنها المفضلة.",
"jessica.more":"المزيد عن JESSICA",
"richie.label":"صداقة مميزة",
"richie.subtitle":"صديق صغير لطيف",
"richie.text":"Richie أرنب لطيف بقلب كبير. يحب الاستكشاف والأيام الهادئة بجوار البحر. أصبحت صداقته غير المتوقعة مع Pi واحدة من أدفأ قصص عددنا الأول.",
"richie.more":"المزيد عن RICHIE",
"pi.label":"صداقة مميزة",
"pi.subtitle":"شخصية وردية مشرقة",
"pi.text":"Pi ببغاء وردي جميل يتمتع بشخصية كبيرة. فضولي ومعبّر ومخلص للغاية، وأصبح الحامي غير المتوقع وأقرب صديق لـ Richie.",
"pi.more":"المزيد عن PI",
"ending.kicker":"PETS & DOGUE · العدد 01",
"ending.title":"المزيد من القصص<br>داخل هذا العدد",
"ending.text":"الموضة والأماكن الصديقة للحيوانات والعافية والتصوير الجميل وقصص الحيوانات التي تجعل عالمنا استثنائيًا — هذه مجرد البداية.",
"ending.caption":"كلب صغير.<br>فكرة كبيرة جدًا. ♡"
},

hi:{
"intro.kicker":"PETS & DOGUE · अंक 01 · गर्मी 2026",
"intro.title":"हमारा सबसे पहला कवर",
"intro.p1":"यहीं से हमारा पहला अंक शुरू होता है। Miso, Pablo, Jessica, Richie और Pi से मिलिए — पाँच बिल्कुल अलग व्यक्तित्व, जो PETS & DOGUE के पहले कवर पर एक साथ आए हैं।",
"intro.p2":"नीचे स्क्रॉल करें और इनमें से हर एक को थोड़ा और करीब से जानें। ♡",
"origin.title1":"सब कुछ शुरू हुआ",
"origin.title2":"से",
"origin.subtitle":"और उसके दोस्तों से।",
"origin.text":"हर कहानी की एक शुरुआत होती है। हमारी शुरुआत Miso नाम की एक छोटी सुनहरी Pomeranian और उसके आसपास के असाधारण जानवरों से हुई। उनके व्यक्तित्व, दोस्ती और रोमांच PETS & DOGUE की प्रेरणा बने।",
"miso.label":"कवर स्टार",
"miso.subtitle":"छोटी खोजकर्ता",
"miso.text":"Miso लंदन की एक छोटी सुनहरी Pomeranian है। उसे फैशन, यात्रा, लंबी सैर और खूबसूरत नई जगहें खोजना पसंद है। उसकी जिज्ञासा और अनोखी शख्सियत PETS & DOGUE की प्रेरणा बनी।",
"miso.more":"MISO के बारे में और जानें",
"pablo.label":"कवर स्टार",
"pablo.subtitle":"स्टाइलिश Sphynx",
"pablo.text":"Pablo एक Sphynx Bambino है जिसकी शख्सियत बहुत बड़ी है। उसे गर्माहट, ध्यान और वहीं रहना पसंद है जहाँ कुछ दिलचस्प हो रहा हो।",
"pablo.more":"PABLO के बारे में और जानें",
"jessica.label":"कवर स्टार",
"jessica.subtitle":"नर्मदिल ब्रिटिश लेडी",
"jessica.text":"Jessica लंदन की एक आकर्षक British Shorthair है। शांत, ध्यान देने वाली और बेहद स्वतंत्र, उसे घर पर आराम करना और दुनिया को देखना पसंद है।",
"jessica.more":"JESSICA के बारे में और जानें",
"richie.label":"एक खास दोस्ती",
"richie.subtitle":"एक प्यारा छोटा दोस्त",
"richie.text":"Richie एक प्यारा खरगोश है जिसका दिल बहुत बड़ा है। उसे नई जगहें खोजना और समुद्र के पास शांत दिन बिताना पसंद है। Pi के साथ उसकी अनोखी दोस्ती हमारे पहले अंक की सबसे प्यारी कहानियों में से एक बनी।",
"richie.more":"RICHIE के बारे में और जानें",
"pi.label":"एक खास दोस्ती",
"pi.subtitle":"चमकीला गुलाबी व्यक्तित्व",
"pi.text":"Pi एक खूबसूरत गुलाबी तोता है जिसकी शख्सियत बहुत बड़ी है। जिज्ञासु, अभिव्यक्तिपूर्ण और बेहद वफादार Pi, Richie का अप्रत्याशित रक्षक और सबसे करीबी दोस्त बन गया।",
"pi.more":"PI के बारे में और जानें",
"ending.kicker":"PETS & DOGUE · अंक 01",
"ending.title":"इस अंक में<br>और भी कहानियाँ",
"ending.text":"फैशन, pet-friendly जगहें, वेलनेस, खूबसूरत फोटोग्राफी और उन जानवरों की कहानियाँ जो हमारी दुनिया को असाधारण बनाते हैं — यह तो बस शुरुआत है।",
"ending.caption":"एक छोटा कुत्ता।<br>एक बहुत बड़ा विचार। ♡"
}

};

/*
=========================================================
COMMON ALT TEXT

For languages where a dedicated translated alt is not
present, English is intentionally used as accessible
fallback instead of leaving alt empty.
=========================================================
*/

const COMMON_ALT = {
"cover.alt":"PETS & DOGUE Issue 01 cover with Miso, Pablo, Jessica, Richie and Pi",
"origin.alt":"Miso wearing her pink dress and bow",
"miso.alt1":"Miso wearing her pink dress",
"miso.alt2":"Miso on a walk",
"miso.alt3":"Miso resting",
"pablo.altMain":"Pablo the Sphynx Bambino",
"pablo.alt3":"Pablo resting",
"jessica.alt1":"Jessica relaxing on her white bed",
"jessica.alt2":"Jessica relaxing in the garden",
"jessica.alt3":"Jessica by the window",
"richie.alt1":"Richie and Pi cuddling",
"richie.alt2":"Richie and Pi watching the sunset",
"pi.alt1":"Pi and Richie overlooking the sea",
"pi.alt2":"Pi cuddling Richie"
};

function normaliseLanguage(value){

  let code =
    String(value || "")
      .trim()
      .toLowerCase()
      .replace("_","-")
      .split("-")[0];

  code =
    ALIASES[code] || code;

  return T[code]
    ? code
    : "en";
}

function storedLanguage(){

  let value = "";

  try{
    value =
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem("petsDogueLanguage") ||
      localStorage.getItem("pd_language") ||
      "";
  }catch(error){
    value = "";
  }

  if(!value){

    const htmlLang =
      document.documentElement.lang;

    if(htmlLang){
      value = htmlLang;
    }
  }

  return normaliseLanguage(value || "en");
}

function getValue(language,key){

  const local =
    T[language] || T.en;

  if(
    Object.prototype.hasOwnProperty.call(
      local,
      key
    )
  ){
    return local[key];
  }

  if(
    Object.prototype.hasOwnProperty.call(
      COMMON_ALT,
      key
    )
  ){
    return COMMON_ALT[key];
  }

  return T.en[key];
}

function applyLanguage(language){

  const code =
    normaliseLanguage(
      language || storedLanguage()
    );

  const root =
    document.documentElement;

  root.lang = code;
  root.dir =
    RTL_LANGUAGES.has(code)
      ? "rtl"
      : "ltr";

  document
    .querySelectorAll("[data-i18n]")
    .forEach(function(element){

      const key =
        element.getAttribute(
          "data-i18n"
        );

      const value =
        getValue(code,key);

      if(
        typeof value !== "string"
      ){
        return;
      }

      /*
      ending.title and ending.caption contain intentional
      <br> elements. All translation strings are static,
      trusted local content from this file.
      */

      if(
        key === "ending.title" ||
        key === "ending.caption"
      ){
        element.innerHTML = value;
      }else{
        element.textContent = value;
      }

    });

  document
    .querySelectorAll("[data-i18n-alt]")
    .forEach(function(element){

      const key =
        element.getAttribute(
          "data-i18n-alt"
        );

      const value =
        getValue(code,key);

      if(
        typeof value === "string"
      ){
        element.setAttribute(
          "alt",
          value
        );
      }

    });

  /*
  Preserve PETS & DOGUE and animal names.
  They are intentionally marked notranslate in HTML.
  */

  window.PetsDogueIssue01Language =
    code;

  window.dispatchEvent(
    new CustomEvent(
      "petsdogue:issue01translated",
      {
        detail:{
          language:code
        }
      }
    )
  );
}

function eventLanguage(event){

  if(
    event &&
    event.detail
  ){

    if(event.detail.language){
      return event.detail.language;
    }

    if(event.detail.lang){
      return event.detail.lang;
    }

    if(event.detail.code){
      return event.detail.code;
    }

  }

  return storedLanguage();
}

/*
=========================================================
INITIAL LOAD
=========================================================
*/

function init(){

  applyLanguage(
    storedLanguage()
  );

}

if(
  document.readyState === "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    init,
    {
      once:true
    }
  );

}else{

  init();

}

/*
=========================================================
GLOBAL SHELL LANGUAGE EVENT

pets-dogue-shell.js already broadcasts:
petsdogue:languagechange

No API.
No reload.
No duplicate language selector.
=========================================================
*/

window.addEventListener(
  "petsdogue:languagechange",
  function(event){

    /*
    Allow the global shell to finish persisting its
    selected language before reading it back.
    */

    window.requestAnimationFrame(
      function(){

        applyLanguage(
          eventLanguage(event)
        );

      }
    );

  }
);

/*
=========================================================
PUBLIC ISSUE 01 HOOK

Useful if another PETS & DOGUE component needs to force
a refresh after restoring the stored language.
=========================================================
*/

window.PetsDogueIssue01 = {
  applyLanguage:applyLanguage,
  getLanguage:storedLanguage,
  translations:T
};

})();
