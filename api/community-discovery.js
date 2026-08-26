"use strict";

/* =========================================================
PETS & DOGUE
LOCAL COMMUNITY LIVE DISCOVERY API

Vercel Serverless Function

Purpose:
- Search fresh public internet information around selected location
- Lost / missing pets
- Sightings
- Found pets
- Animal help requests
- Volunteers
- Pet meetups / breed walks / events
- Foster requests
- Adoption / pets looking for family
- Local animal news

Works without extra npm packages.

FREE FALLBACK:
- GDELT public news search

OPTIONAL PROVIDERS:
- Brave Search API
- Serper / Google Search API
- Bing Web Search API

OPTIONAL TRANSLATION:
- DeepL API

Recommended Vercel environment variables:

BRAVE_SEARCH_API_KEY=
SERPER_API_KEY=
BING_SEARCH_API_KEY=
DEEPL_API_KEY=

No API key is written into this file.
========================================================= */

/* =========================================================
CORS
========================================================= */

const ALLOWED_METHODS = "GET,OPTIONS";

const DEFAULT_LIMIT = 24;

const MAX_LIMIT = 50;

const MAX_PROVIDER_RESULTS = 10;

const REQUEST_TIMEOUT = 8500;

const DEFAULT_RADIUS_KM = 15;

/* =========================================================
SUPPORTED LANGUAGES
========================================================= */

const SUPPORTED_LANGUAGES = new Set([
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
"hu",
"ro",
"bg",
"el",
"sv",
"da",
"no",
"fi",
"tr",
"ar",
"hi"
]);

/* =========================================================
LANGUAGE NORMALISATION
========================================================= */

function normalizeLanguage(
value
){

if(
!value
){

return "en";

}

let language =
String(value)
.trim()
.toLowerCase();

if(
language.includes("-")
){

language =
language.split("-")[0];

}

if(
language.includes("_")
){

language =
language.split("_")[0];

}

const aliases = {
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};

language =
aliases[language] ||
language;

return SUPPORTED_LANGUAGES.has(
language
)
? language
: "en";

}

/* =========================================================
LANGUAGE SEARCH VOCABULARY
========================================================= */

const SEARCH_TERMS = {

en:{
lost:[
"lost dog",
"lost cat",
"missing pet",
"missing dog",
"missing cat"
],
seen:[
"dog found roaming",
"cat found roaming",
"stray dog seen",
"stray cat seen",
"pet sighting"
],
found:[
"lost dog found",
"lost cat found",
"missing pet found",
"pet reunited"
],
event:[
"dog meetup",
"pet meetup",
"dog walk event",
"breed meetup",
"pet event",
"dog show"
],
help:[
"animal rescue needs help",
"animal shelter needs help",
"pet emergency fundraiser",
"animal rescue appeal"
],
volunteers:[
"animal shelter volunteers",
"animal rescue volunteers",
"dog rescue volunteers"
],
foster:[
"animal foster home needed",
"dog foster needed",
"cat foster needed"
],
adoption:[
"dog adoption",
"cat adoption",
"pet adoption",
"animal needs home",
"dog looking for home",
"cat looking for home"
],
news:[
"animal news",
"pet news",
"dog news",
"cat news",
"animal welfare"
]
},

ru:{
lost:[
"пропала собака",
"пропал кот",
"пропала кошка",
"потерялся питомец"
],
seen:[
"видели потерявшуюся собаку",
"видели потерявшегося кота",
"найдена собака без хозяина"
],
found:[
"пропавшая собака найдена",
"пропавшая кошка найдена",
"питомец найден"
],
event:[
"встреча владельцев собак",
"прогулка с собаками",
"встреча собак",
"мероприятие для животных",
"выставка собак"
],
help:[
"нужна помощь животным",
"приюту нужна помощь",
"сбор помощи животным"
],
volunteers:[
"нужны волонтеры животным",
"приют ищет волонтеров"
],
foster:[
"нужна передержка собаке",
"нужна передержка кошке",
"нужна передержка животному"
],
adoption:[
"собака ищет дом",
"кошка ищет дом",
"животное ищет семью",
"взять собаку из приюта"
],
news:[
"новости животных",
"новости собак",
"новости кошек",
"защита животных"
]
},

uk:{
lost:[
"загубився собака",
"загубився кіт",
"загубилася кішка",
"загубився улюбленець"
],
seen:[
"бачили загубленого собаку",
"бачили загубленого кота",
"знайдений собака без господаря"
],
found:[
"загубленого собаку знайдено",
"загублену кішку знайдено",
"улюбленця знайдено"
],
event:[
"зустріч власників собак",
"прогулянка з собаками",
"зустріч собак",
"подія для тварин",
"виставка собак"
],
help:[
"потрібна допомога тваринам",
"притулку потрібна допомога",
"збір допомоги тваринам"
],
volunteers:[
"потрібні волонтери тваринам",
"притулок шукає волонтерів"
],
foster:[
"потрібна перетримка собаці",
"потрібна перетримка коту"
],
adoption:[
"собака шукає дім",
"кішка шукає дім",
"тварина шукає родину"
],
news:[
"новини про тварин",
"новини собак",
"новини котів",
"захист тварин"
]
},

fr:{
lost:[
"chien perdu",
"chat perdu",
"animal disparu"
],
seen:[
"chien errant aperçu",
"chat errant aperçu",
"animal aperçu"
],
found:[
"chien perdu retrouvé",
"chat perdu retrouvé",
"animal retrouvé"
],
event:[
"rencontre chiens",
"promenade chiens",
"événement animaux",
"exposition canine"
],
help:[
"refuge animaux besoin aide",
"association animaux appel aide"
],
volunteers:[
"bénévoles refuge animaux",
"bénévoles association animaux"
],
foster:[
"famille accueil chien recherchée",
"famille accueil chat recherchée"
],
adoption:[
"chien à adopter",
"chat à adopter",
"animal cherche famille"
],
news:[
"actualités animaux",
"protection animale"
]
},

de:{
lost:[
"Hund vermisst",
"Katze vermisst",
"Haustier vermisst"
],
seen:[
"vermisster Hund gesichtet",
"vermisste Katze gesichtet",
"streunender Hund gesehen"
],
found:[
"vermisster Hund gefunden",
"vermisste Katze gefunden"
],
event:[
"Hundetreffen",
"Hundespaziergang Treffen",
"Tierveranstaltung",
"Hundeausstellung"
],
help:[
"Tierheim braucht Hilfe",
"Tierrettung braucht Hilfe"
],
volunteers:[
"Tierheim Freiwillige gesucht",
"Tierrettung freiwillige Helfer"
],
foster:[
"Pflegestelle Hund gesucht",
"Pflegestelle Katze gesucht"
],
adoption:[
"Hund sucht Zuhause",
"Katze sucht Zuhause",
"Tier sucht Familie"
],
news:[
"Tiernachrichten",
"Tierschutz Nachrichten"
]
},

es:{
lost:[
"perro perdido",
"gato perdido",
"mascota desaparecida"
],
seen:[
"perro perdido visto",
"gato perdido visto",
"animal callejero visto"
],
found:[
"perro perdido encontrado",
"gato perdido encontrado",
"mascota encontrada"
],
event:[
"encuentro de perros",
"paseo de perros",
"evento de mascotas",
"exposición canina"
],
help:[
"refugio animales necesita ayuda",
"rescate animales necesita ayuda"
],
volunteers:[
"voluntarios refugio animales",
"voluntarios rescate animales"
],
foster:[
"acogida temporal perro",
"acogida temporal gato"
],
adoption:[
"perro en adopción",
"gato en adopción",
"animal busca familia"
],
news:[
"noticias animales",
"bienestar animal"
]
},

it:{
lost:[
"cane smarrito",
"gatto smarrito",
"animale scomparso"
],
seen:[
"cane smarrito avvistato",
"gatto smarrito avvistato"
],
found:[
"cane smarrito ritrovato",
"gatto smarrito ritrovato"
],
event:[
"raduno cani",
"passeggiata cani evento",
"evento animali",
"mostra canina"
],
help:[
"rifugio animali cerca aiuto",
"salvataggio animali aiuto"
],
volunteers:[
"volontari rifugio animali",
"volontari soccorso animali"
],
foster:[
"stallo cane cercasi",
"stallo gatto cercasi"
],
adoption:[
"cane in adozione",
"gatto in adozione",
"animale cerca famiglia"
],
news:[
"notizie animali",
"benessere animale"
]
},

pt:{
lost:[
"cão perdido",
"gato perdido",
"animal desaparecido"
],
seen:[
"cão perdido visto",
"gato perdido visto"
],
found:[
"cão perdido encontrado",
"gato perdido encontrado"
],
event:[
"encontro de cães",
"passeio de cães",
"evento animal",
"exposição canina"
],
help:[
"abrigo animais precisa ajuda",
"resgate animais precisa ajuda"
],
volunteers:[
"voluntários abrigo animais",
"voluntários resgate animais"
],
foster:[
"acolhimento temporário cão",
"acolhimento temporário gato"
],
adoption:[
"cão para adoção",
"gato para adoção",
"animal procura família"
],
news:[
"notícias animais",
"bem-estar animal"
]
},

nl:{
lost:[
"hond vermist",
"kat vermist",
"huisdier vermist"
],
seen:[
"vermiste hond gezien",
"vermiste kat gezien"
],
found:[
"vermiste hond gevonden",
"vermiste kat gevonden"
],
event:[
"honden meetup",
"hondenwandeling evenement",
"dierenevenement"
],
help:[
"dierenasiel hulp nodig",
"dierenopvang hulp nodig"
],
volunteers:[
"vrijwilligers dierenasiel",
"vrijwilligers dierenopvang"
],
foster:[
"opvanggezin hond gezocht",
"opvanggezin kat gezocht"
],
adoption:[
"hond ter adoptie",
"kat ter adoptie",
"dier zoekt thuis"
],
news:[
"dierennieuws",
"dierenwelzijn"
]
},

pl:{
lost:[
"zaginął pies",
"zaginął kot",
"zaginione zwierzę"
],
seen:[
"widziano zaginionego psa",
"widziano zaginionego kota"
],
found:[
"zaginiony pies odnaleziony",
"zaginiony kot odnaleziony"
],
event:[
"spotkanie psów",
"spacer z psami",
"wydarzenie dla zwierząt",
"wystawa psów"
],
help:[
"schronisko potrzebuje pomocy",
"pomoc dla zwierząt"
],
volunteers:[
"wolontariusze schronisko",
"wolontariat dla zwierząt"
],
foster:[
"dom tymczasowy dla psa",
"dom tymczasowy dla kota"
],
adoption:[
"pies do adopcji",
"kot do adopcji",
"zwierzę szuka domu"
],
news:[
"wiadomości o zwierzętach",
"ochrona zwierząt"
]
},

cs:{
lost:[
"ztracený pes",
"ztracená kočka",
"ztracené zvíře"
],
seen:[
"viděn ztracený pes",
"viděna ztracená kočka"
],
found:[
"ztracený pes nalezen",
"ztracená kočka nalezena"
],
event:[
"setkání psů",
"procházka se psy",
"zvířecí akce",
"výstava psů"
],
help:[
"útulek potřebuje pomoc",
"pomoc zvířatům"
],
volunteers:[
"dobrovolníci útulek",
"dobrovolníci zvířata"
],
foster:[
"dočasná péče pes",
"dočasná péče kočka"
],
adoption:[
"pes k adopci",
"kočka k adopci",
"zvíře hledá domov"
],
news:[
"zprávy o zvířatech",
"ochrana zvířat"
]
},

sk:{
lost:[
"stratený pes",
"stratená mačka",
"stratené zviera"
],
seen:[
"videný stratený pes",
"videná stratená mačka"
],
found:[
"stratený pes nájdený",
"stratená mačka nájdená"
],
event:[
"stretnutie psov",
"prechádzka so psami",
"zvieracie podujatie"
],
help:[
"útulok potrebuje pomoc",
"pomoc zvieratám"
],
volunteers:[
"dobrovoľníci útulok",
"dobrovoľníci zvieratá"
],
foster:[
"dočasná starostlivosť pes",
"dočasná starostlivosť mačka"
],
adoption:[
"pes na adopciu",
"mačka na adopciu",
"zviera hľadá domov"
],
news:[
"správy o zvieratách",
"ochrana zvierat"
]
},

hu:{
lost:[
"elveszett kutya",
"elveszett macska",
"eltűnt háziállat"
],
seen:[
"elveszett kutyát láttak",
"elveszett macskát láttak"
],
found:[
"elveszett kutya megtalálták",
"elveszett macska megtalálták"
],
event:[
"kutyás találkozó",
"kutyaséta esemény",
"állatos esemény"
],
help:[
"állatmenhely segítség",
"állatmentés segítség"
],
volunteers:[
"állatmenhely önkéntesek",
"állatmentő önkéntesek"
],
foster:[
"ideiglenes befogadó kutya",
"ideiglenes befogadó macska"
],
adoption:[
"kutya örökbefogadás",
"macska örökbefogadás",
"állat családot keres"
],
news:[
"állathírek",
"állatvédelem"
]
},

ro:{
lost:[
"câine pierdut",
"pisică pierdută",
"animal dispărut"
],
seen:[
"câine pierdut văzut",
"pisică pierdută văzută"
],
found:[
"câine pierdut găsit",
"pisică pierdută găsită"
],
event:[
"întâlnire câini",
"plimbare câini eveniment",
"eveniment animale"
],
help:[
"adăpost animale nevoie ajutor",
"salvare animale ajutor"
],
volunteers:[
"voluntari adăpost animale",
"voluntari salvare animale"
],
foster:[
"găzduire temporară câine",
"găzduire temporară pisică"
],
adoption:[
"câine adopție",
"pisică adopție",
"animal caută familie"
],
news:[
"știri animale",
"bunăstarea animalelor"
]
},

bg:{
lost:[
"изгубено куче",
"изгубена котка",
"изгубен домашен любимец"
],
seen:[
"видяно изгубено куче",
"видяна изгубена котка"
],
found:[
"изгубено куче намерено",
"изгубена котка намерена"
],
event:[
"среща на кучета",
"разходка с кучета",
"събитие за животни"
],
help:[
"приют нужда помощ",
"помощ за животни"
],
volunteers:[
"доброволци приют",
"доброволци животни"
],
foster:[
"временен дом куче",
"временен дом котка"
],
adoption:[
"куче за осиновяване",
"котка за осиновяване",
"животно търси дом"
],
news:[
"новини за животни",
"защита на животните"
]
},

el:{
lost:[
"χαμένος σκύλος",
"χαμένη γάτα",
"χαμένο κατοικίδιο"
],
seen:[
"εθεάθη χαμένος σκύλος",
"εθεάθη χαμένη γάτα"
],
found:[
"χαμένος σκύλος βρέθηκε",
"χαμένη γάτα βρέθηκε"
],
event:[
"συνάντηση σκύλων",
"βόλτα σκύλων",
"εκδήλωση ζώων"
],
help:[
"καταφύγιο ζώων χρειάζεται βοήθεια"
],
volunteers:[
"εθελοντές καταφύγιο ζώων"
],
foster:[
"προσωρινή φιλοξενία σκύλου",
"προσωρινή φιλοξενία γάτας"
],
adoption:[
"σκύλος για υιοθεσία",
"γάτα για υιοθεσία",
"ζώο ψάχνει οικογένεια"
],
news:[
"νέα για ζώα",
"προστασία ζώων"
]
},

sv:{
lost:[
"försvunnen hund",
"försvunnen katt",
"försvunnet husdjur"
],
seen:[
"försvunnen hund sedd",
"försvunnen katt sedd"
],
found:[
"försvunnen hund hittad",
"försvunnen katt hittad"
],
event:[
"hundträff",
"hundpromenad event",
"djurevent"
],
help:[
"djurhem behöver hjälp",
"djurräddning hjälp"
],
volunteers:[
"volontärer djurhem",
"volontärer djurräddning"
],
foster:[
"jourhem hund behövs",
"jourhem katt behövs"
],
adoption:[
"hund för adoption",
"katt för adoption",
"djur söker hem"
],
news:[
"djurnyheter",
"djurskydd"
]
},

da:{
lost:[
"forsvundet hund",
"forsvundet kat",
"forsvundet kæledyr"
],
seen:[
"forsvundet hund set",
"forsvundet kat set"
],
found:[
"forsvundet hund fundet",
"forsvundet kat fundet"
],
event:[
"hundetræf",
"hundetur arrangement",
"dyrearrangement"
],
help:[
"dyreinternat hjælp",
"dyreredning hjælp"
],
volunteers:[
"frivillige dyreinternat",
"frivillige dyreredning"
],
foster:[
"plejehjem hund",
"plejehjem kat"
],
adoption:[
"hund til adoption",
"kat til adoption",
"dyr søger hjem"
],
news:[
"dyrenyheder",
"dyrevelfærd"
]
},

no:{
lost:[
"savnet hund",
"savnet katt",
"savnet kjæledyr"
],
seen:[
"savnet hund sett",
"savnet katt sett"
],
found:[
"savnet hund funnet",
"savnet katt funnet"
],
event:[
"hundetreff",
"hundetur arrangement",
"dyrearrangement"
],
help:[
"dyrehjem trenger hjelp",
"dyreredning hjelp"
],
volunteers:[
"frivillige dyrehjem",
"frivillige dyreredning"
],
foster:[
"fosterhjem hund",
"fosterhjem katt"
],
adoption:[
"hund til adopsjon",
"katt til adopsjon",
"dyr søker hjem"
],
news:[
"dyrenyheter",
"dyrevelferd"
]
},

fi:{
lost:[
"kadonnut koira",
"kadonnut kissa",
"kadonnut lemmikki"
],
seen:[
"kadonnut koira nähty",
"kadonnut kissa nähty"
],
found:[
"kadonnut koira löytynyt",
"kadonnut kissa löytynyt"
],
event:[
"koiratapaaminen",
"koirakävely tapahtuma",
"eläintapahtuma"
],
help:[
"eläinsuoja tarvitsee apua",
"eläinpelastus apua"
],
volunteers:[
"vapaaehtoiset eläinsuoja",
"vapaaehtoiset eläinpelastus"
],
foster:[
"sijaiskoti koiralle",
"sijaiskoti kissalle"
],
adoption:[
"koira adoptoitavaksi",
"kissa adoptoitavaksi",
"eläin etsii kotia"
],
news:[
"eläinuutiset",
"eläinsuojelu"
]
},

tr:{
lost:[
"kayıp köpek",
"kayıp kedi",
"kayıp evcil hayvan"
],
seen:[
"kayıp köpek görüldü",
"kayıp kedi görüldü"
],
found:[
"kayıp köpek bulundu",
"kayıp kedi bulundu"
],
event:[
"köpek buluşması",
"köpek yürüyüşü etkinliği",
"evcil hayvan etkinliği"
],
help:[
"hayvan barınağı yardım",
"hayvan kurtarma yardım"
],
volunteers:[
"hayvan barınağı gönüllü",
"hayvan kurtarma gönüllü"
],
foster:[
"geçici yuva köpek",
"geçici yuva kedi"
],
adoption:[
"köpek sahiplendirme",
"kedi sahiplendirme",
"hayvan aile arıyor"
],
news:[
"hayvan haberleri",
"hayvan refahı"
]
},

ar:{
lost:[
"كلب مفقود",
"قطة مفقودة",
"حيوان أليف مفقود"
],
seen:[
"شوهد كلب مفقود",
"شوهدت قطة مفقودة"
],
found:[
"تم العثور على كلب مفقود",
"تم العثور على قطة مفقودة"
],
event:[
"لقاء كلاب",
"نزهة كلاب",
"فعالية حيوانات"
],
help:[
"ملجأ حيوانات يحتاج مساعدة"
],
volunteers:[
"متطوعون ملجأ حيوانات"
],
foster:[
"استضافة مؤقتة كلب",
"استضافة مؤقتة قطة"
],
adoption:[
"كلب للتبني",
"قطة للتبني",
"حيوان يبحث عن عائلة"
],
news:[
"أخبار الحيوانات",
"رعاية الحيوان"
]
},

hi:{
lost:[
"खोया कुत्ता",
"खोई बिल्ली",
"खोया पालतू"
],
seen:[
"खोया कुत्ता देखा गया",
"खोई बिल्ली देखी गई"
],
found:[
"खोया कुत्ता मिला",
"खोई बिल्ली मिली"
],
event:[
"डॉग मीटअप",
"डॉग वॉक कार्यक्रम",
"पालतू कार्यक्रम"
],
help:[
"पशु आश्रय मदद चाहिए"
],
volunteers:[
"पशु आश्रय स्वयंसेवक"
],
foster:[
"कुत्ते के लिए अस्थायी घर",
"बिल्ली के लिए अस्थायी घर"
],
adoption:[
"कुत्ता गोद लेना",
"बिल्ली गोद लेना",
"जानवर को परिवार चाहिए"
],
news:[
"पशु समाचार",
"पशु कल्याण"
]
}

};

/* =========================================================
SEARCH CATEGORIES
========================================================= */

const CATEGORY_ORDER = [
"lost",
"seen",
"found",
"event",
"help",
"volunteers",
"foster",
"adoption",
"news"
];

/* =========================================================
CATEGORY KEYWORDS
========================================================= */

const CATEGORY_KEYWORDS = {

found:[
"found",
"reunited",
"returned home",
"safe home",
"owner found",
"retrieved",
"найден",
"нашёлся",
"нашлась",
"нашли",
"знайден",
"знайшовся",
"retrouvé",
"gefunden",
"encontrado",
"ritrovato",
"gevonden",
"odnalezion",
"nalezen",
"nájden",
"megtalált",
"găsit",
"намерен",
"βρέθηκε",
"hittad",
"fundet",
"funnet",
"löytynyt",
"bulundu",
"تم العثور",
"मिल गया"
],

lost:[
"lost dog",
"lost cat",
"missing dog",
"missing cat",
"missing pet",
"pet missing",
"dog missing",
"cat missing",
"пропала собака",
"пропал кот",
"пропала кошка",
"потерялся",
"загубився",
"загубилася",
"chien perdu",
"chat perdu",
"hund vermisst",
"katze vermisst",
"perro perdido",
"gato perdido",
"cane smarrito",
"gatto smarrito",
"cão perdido",
"hond vermist",
"kat vermist",
"zaginął pies",
"zaginął kot",
"ztracený pes",
"stratený pes",
"elveszett kutya",
"câine pierdut",
"изгубено куче",
"χαμένος σκύλος",
"försvunnen hund",
"savnet hund",
"kadonnut koira",
"kayıp köpek",
"كلب مفقود",
"खोया कुत्ता"
],

seen:[
"sighted",
"sighting",
"seen roaming",
"spotted",
"stray seen",
"видели",
"заметили",
"бачили",
"avistado",
"avvistato",
"gesichtet",
"aperçu",
"widziano",
"viděn",
"videný",
"látták",
"văzut",
"видяно",
"εθεάθη",
"sedd",
"set",
"nähty",
"görüldü",
"شوهد",
"देखा गया"
],

event:[
"meetup",
"meet up",
"dog walk",
"breed walk",
"pet event",
"dog event",
"dog show",
"pet show",
"animal event",
"festival",
"встреча",
"прогулка с собаками",
"выставка",
"зустріч",
"прогулянка",
"événement",
"rencontre",
"hundetreffen",
"evento",
"raduno",
"encontro",
"spotkanie",
"setkání",
"stretnutie",
"találkozó",
"eveniment",
"събитие",
"εκδήλωση",
"träff",
"arrangement",
"tapahtuma",
"etkinlik",
"فعالية",
"कार्यक्रम"
],

volunteers:[
"volunteer",
"volunteers",
"volunteering",
"волонтер",
"волонтёр",
"добровол",
"bénévole",
"freiwillige",
"voluntario",
"volontari",
"wolontariusz",
"dobrovolník",
"önkéntes",
"voluntar",
"εθελον",
"frivillig",
"vapaaehtois",
"gönüllü",
"متطوع",
"स्वयंसेव"
],

foster:[
"foster",
"foster home",
"temporary home",
"передерж",
"перетрим",
"famille d'accueil",
"pflegestelle",
"acogida",
"stallo",
"acolhimento",
"opvanggezin",
"dom tymczasowy",
"dočasná péče",
"dočasná starostlivosť",
"ideiglenes befogadó",
"găzduire temporară",
"временен дом",
"φιλοξενία",
"jourhem",
"plejehjem",
"fosterhjem",
"sijaiskoti",
"geçici yuva",
"استضافة مؤقتة",
"अस्थायी घर"
],

adoption:[
"adopt",
"adoption",
"needs a home",
"looking for home",
"looking for family",
"forever home",
"ищет дом",
"ищет семью",
"адопц",
"шукає дім",
"шукає родину",
"adopter",
"adoption",
"zuhause gesucht",
"adopción",
"adozione",
"adoção",
"adoptie",
"adopcji",
"k adopci",
"adopciu",
"örökbefogadás",
"adopție",
"осиновяване",
"υιοθεσία",
"adoption",
"adopsjon",
"adoptoitavaksi",
"sahiplendirme",
"للتبني",
"गोद"
],

help:[
"help needed",
"needs help",
"urgent help",
"appeal",
"fundraiser",
"donation",
"rescue appeal",
"нужна помощь",
"нужна допомога",
"потрібна допомога",
"besoin d'aide",
"braucht hilfe",
"necesita ayuda",
"serve aiuto",
"precisa ajuda",
"hulp nodig",
"potrzebuje pomocy",
"potřebuje pomoc",
"potrebuje pomoc",
"segítség",
"nevoie ajutor",
"нужда помощ",
"χρειάζεται βοήθεια",
"behöver hjälp",
"har brug for hjælp",
"trenger hjelp",
"tarvitsee apua",
"yardım gerekiyor",
"يحتاج مساعدة",
"मदद चाहिए"
]

};

/* =========================================================
BAD / LOW QUALITY DOMAINS
========================================================= */

const BLOCKED_DOMAINS = new Set([
"pinterest.com",
"pinterest.co.uk",
"quora.com",
"tiktok.com"
]);

/* =========================================================
UTILITY
========================================================= */

function cleanText(
value
){

return String(
value ||
""
)
.replace(
/<[^>]+>/g,
" "
)
.replace(
/&amp;/g,
"&"
)
.replace(
/&quot;/g,
'"'
)
.replace(
/&#39;/g,
"'"
)
.replace(
/&lt;/g,
"<"
)
.replace(
/&gt;/g,
">"
)
.replace(
/\s+/g,
" "
)
.trim();

}

function safeUrl(
value
){

try{

const url =
new URL(
String(value)
);

if(
![
"http:",
"https:"
]
.includes(
url.protocol
)
){

return "";

}

return url.toString();

}catch(
error
){

return "";

}

}

function hostnameFromUrl(
value
){

try{

return new URL(
value
)
.hostname
.replace(
/^www\./,
""
);

}catch(
error
){

return "";

}

}

function clamp(
value,
min,
max
){

return Math.min(
Math.max(
Number(value) ||
0,
min
),
max
);

}

function unique(
values
){

return [
...new Set(
values.filter(
Boolean
)
)
];

}

function nowIso(){

return new Date()
.toISOString();

}

function normalizeDate(
value
){

if(
!value
){

return null;

}

const date =
new Date(
value
);

if(
Number.isNaN(
date.getTime()
)
){

return null;

}

return date.toISOString();

}

function ageInDays(
value
){

if(
!value
){

return 999;

}

const timestamp =
new Date(
value
)
.getTime();

if(
Number.isNaN(
timestamp
)
){

return 999;

}

return (
Date.now() -
timestamp
) /
86400000;

}

function includesAny(
text,
keywords
){

const normalized =
String(
text ||
""
)
.toLowerCase();

return keywords.some(
keyword =>
normalized.includes(
String(keyword)
.toLowerCase()
)
);

}

function stripTrackingParams(
value
){

try{

const url =
new URL(
value
);

[
"utm_source",
"utm_medium",
"utm_campaign",
"utm_term",
"utm_content",
"fbclid",
"gclid"
]
.forEach(
key =>
url.searchParams.delete(
key
)
);

return url.toString();

}catch(
error
){

return value;

}

}

function createId(
value
){

let hash =
2166136261;

const text =
String(
value ||
""
);

for(
let index = 0;
index < text.length;
index++
){

hash ^=
text.charCodeAt(
index
);

hash =
Math.imul(
hash,
16777619
);

}

return (
"live-" +
(
hash >>> 0
)
.toString(
36
)
);

}

function sleep(
milliseconds
){

return new Promise(
resolve =>
setTimeout(
resolve,
milliseconds
)
);

}

/* =========================================================
TIMEOUT FETCH
========================================================= */

async function fetchWithTimeout(
url,
options = {},
timeout = REQUEST_TIMEOUT
){

const controller =
new AbortController();

const timer =
setTimeout(
() =>
controller.abort(),
timeout
);

try{

return await fetch(
url,
{
...options,
signal:
controller.signal
}
);

}finally{

clearTimeout(
timer
);

}

}

/* =========================================================
REQUEST QUERY
========================================================= */

function readQuery(
req
){

const query =
req.query ||
{};

const language =
normalizeLanguage(
query.lang
);

const latitude =
Number(
query.lat
);

const longitude =
Number(
query.lng
);

const radius =
clamp(
query.radius ||
DEFAULT_RADIUS_KM,
1,
100
);

const limit =
Math.round(
clamp(
query.limit ||
DEFAULT_LIMIT,
1,
MAX_LIMIT
)
);

const location =
cleanText(
query.location ||
""
)
.slice(
0,
180
);

return {
language,
latitude,
longitude,
radius,
limit,
location
};

}

/* =========================================================
VALIDATION
========================================================= */

function validateRequest(
params
){

if(
!params.location &&
(
!Number.isFinite(
params.latitude
) ||
!Number.isFinite(
params.longitude
)
)
){

return "location or coordinates are required";

}

if(
Number.isFinite(
params.latitude
) &&
(
params.latitude < -90 ||
params.latitude > 90
)
){

return "invalid latitude";

}

if(
Number.isFinite(
params.longitude
) &&
(
params.longitude < -180 ||
params.longitude > 180
)
){

return "invalid longitude";

}

return null;

}

/* =========================================================
LOCATION RESOLUTION
========================================================= */

async function reverseLocation(
latitude,
longitude,
language
){

if(
!Number.isFinite(
latitude
) ||
!Number.isFinite(
longitude
)
){

return null;

}

try{

const url =
"https://nominatim.openstreetmap.org/reverse" +
"?format=jsonv2" +
"&zoom=12" +
"&lat=" +
encodeURIComponent(
latitude
) +
"&lon=" +
encodeURIComponent(
longitude
);

const response =
await fetchWithTimeout(
url,
{
headers:{
"Accept-Language":
language,
"User-Agent":
"PETS-DOGUE-Community/1.0"
}
},
5000
);

if(
!response.ok
){

return null;

}

const data =
await response.json();

const address =
data.address ||
{};

const city =
address.city ||
address.town ||
address.village ||
address.municipality ||
address.suburb ||
"";

const county =
address.county ||
address.state_district ||
"";

const state =
address.state ||
"";

const country =
address.country ||
"";

const short =
unique([
city,
county,
state,
country
])
.slice(
0,
3
)
.join(
", "
);

return {
name:
short ||
cleanText(
data.display_name
),
city,
county,
state,
country
};

}catch(
error
){

return null;

}

}

/* =========================================================
SEARCH QUERY GENERATION
========================================================= */

function buildQueries(
category,
location,
language
){

const localTerms =
SEARCH_TERMS[
language
]?.[
category
] ||
[];

const englishTerms =
SEARCH_TERMS.en[
category
] ||
[];

const terms =
unique([
...localTerms.slice(
0,
3
),
...englishTerms.slice(
0,
2
)
]);

return terms
.map(
term =>
`${term} ${location}`
)
.slice(
0,
4
);

}

/* =========================================================
CATEGORY DETECTION
========================================================= */

function classifyItem(
item,
suggestedCategory
){

const text =
(
item.title +
" " +
item.description
)
.toLowerCase();

if(
includesAny(
text,
CATEGORY_KEYWORDS.found
)
){

return {
type:"found",
status:"found"
};

}

if(
includesAny(
text,
CATEGORY_KEYWORDS.lost
)
){

return {
type:"lost",
status:"active"
};

}

if(
includesAny(
text,
CATEGORY_KEYWORDS.seen
)
){

return {
type:"seen",
status:"active"
};

}

if(
includesAny(
text,
CATEGORY_KEYWORDS.volunteers
)
){

return {
type:"volunteers",
status:"active"
};

}

if(
includesAny(
text,
CATEGORY_KEYWORDS.foster
)
){

return {
type:"foster",
status:"active"
};

}

if(
includesAny(
text,
CATEGORY_KEYWORDS.adoption
)
){

return {
type:"adoption",
status:"active"
};

}

if(
includesAny(
text,
CATEGORY_KEYWORDS.event
)
){

return {
type:"event",
status:"active"
};

}

if(
includesAny(
text,
CATEGORY_KEYWORDS.help
)
){

return {
type:"help",
status:"active"
};

}

return {
type:
suggestedCategory ||
"news",
status:"active"
};

}

/* =========================================================
FRESHNESS
========================================================= */

function maxAgeDaysForType(
type
){

const map = {
lost:30,
seen:14,
found:60,
event:120,
help:60,
volunteers:90,
foster:90,
adoption:120,
news:30
};

return map[type] ||
60;

}

function passesFreshness(
item
){

if(
!item.publishedAt
){

return true;

}

const days =
ageInDays(
item.publishedAt
);

return days <=
maxAgeDaysForType(
item.type
);

}

/* =========================================================
LOCATION RELEVANCE
========================================================= */

function locationTokens(
location
){

return String(
location ||
""
)
.toLowerCase()
.split(
/[,|/()\-]+|\s+/
)
.map(
token =>
token.trim()
)
.filter(
token =>
token.length >= 3
)
.slice(
0,
12
);

}

function locationScore(
item,
location
){

const tokens =
locationTokens(
location
);

if(
!tokens.length
){

return 1;

}

const text =
(
item.title +
" " +
item.description +
" " +
item.url
)
.toLowerCase();

let matches =
0;

tokens.forEach(
token =>{

if(
text.includes(
token
)
){

matches++;

}

}
);

return matches /
tokens.length;

}

/* =========================================================
BRAVE SEARCH
========================================================= */

async function braveSearch(
query,
category,
language
){

const apiKey =
process.env.BRAVE_SEARCH_API_KEY;

if(
!apiKey
){

return [];

}

try{

const url =
"https://api.search.brave.com/res/v1/web/search" +
"?q=" +
encodeURIComponent(
query
) +
"&count=" +
MAX_PROVIDER_RESULTS +
"&safesearch=moderate" +
"&text_decorations=false";

const response =
await fetchWithTimeout(
url,
{
headers:{
Accept:"application/json",
"Accept-Encoding":"gzip",
"X-Subscription-Token":
apiKey
}
}
);

if(
!response.ok
){

return [];

}

const data =
await response.json();

const results =
data.web?.results ||
[];

return results.map(
result =>({

provider:"brave",
category,
title:
cleanText(
result.title
),
description:
cleanText(
result.description
),
url:
safeUrl(
result.url
),
image:
safeUrl(
result.thumbnail?.src ||
result.profile?.img ||
""
),
publishedAt:
normalizeDate(
result.age ||
result.page_age
),
source:
hostnameFromUrl(
result.url
),
language

})
);

}catch(
error
){

console.error(
"Brave search error:",
error.message
);

return [];

}

}

/* =========================================================
SERPER / GOOGLE SEARCH
========================================================= */

async function serperSearch(
query,
category,
language
){

const apiKey =
process.env.SERPER_API_KEY;

if(
!apiKey
){

return [];

}

try{

const response =
await fetchWithTimeout(
"https://google.serper.dev/search",
{
method:"POST",
headers:{
"Content-Type":
"application/json",
"X-API-KEY":
apiKey
},
body:
JSON.stringify({
q:query,
num:
MAX_PROVIDER_RESULTS,
hl:
language ===
"uk"
? "uk"
: language
})
}
);

if(
!response.ok
){

return [];

}

const data =
await response.json();

const results =
data.organic ||
[];

return results.map(
result =>({

provider:"serper",
category,
title:
cleanText(
result.title
),
description:
cleanText(
result.snippet
),
url:
safeUrl(
result.link
),
image:"",
publishedAt:
normalizeDate(
result.date
),
source:
hostnameFromUrl(
result.link
),
language

})
);

}catch(
error
){

console.error(
"Serper search error:",
error.message
);

return [];

}

}

/* =========================================================
BING SEARCH
========================================================= */

async function bingSearch(
query,
category,
language
){

const apiKey =
process.env.BING_SEARCH_API_KEY;

if(
!apiKey
){

return [];

}

try{

const market =
language ===
"en"
? "en-GB"
: language + "-" +
language.toUpperCase();

const url =
"https://api.bing.microsoft.com/v7.0/search" +
"?q=" +
encodeURIComponent(
query
) +
"&count=" +
MAX_PROVIDER_RESULTS +
"&responseFilter=Webpages" +
"&safeSearch=Moderate" +
"&mkt=" +
encodeURIComponent(
market
);

const response =
await fetchWithTimeout(
url,
{
headers:{
"Ocp-Apim-Subscription-Key":
apiKey
}
}
);

if(
!response.ok
){

return [];

}

const data =
await response.json();

const results =
data.webPages?.value ||
[];

return results.map(
result =>({

provider:"bing",
category,
title:
cleanText(
result.name
),
description:
cleanText(
result.snippet
),
url:
safeUrl(
result.url
),
image:"",
publishedAt:
normalizeDate(
result.dateLastCrawled
),
source:
hostnameFromUrl(
result.url
),
language

})
);

}catch(
error
){

console.error(
"Bing search error:",
error.message
);

return [];

}

}

/* =========================================================
GDELT PUBLIC NEWS
NO API KEY REQUIRED
========================================================= */

async function gdeltSearch(
query,
category,
language
){

try{

const search =
`(${query})`;

const url =
"https://api.gdeltproject.org/api/v2/doc/doc" +
"?query=" +
encodeURIComponent(
search
) +
"&mode=ArtList" +
"&maxrecords=20" +
"&format=json" +
"&sort=HybridRel";

const response =
await fetchWithTimeout(
url,
{
headers:{
"User-Agent":
"PETS-DOGUE-Community/1.0"
}
},
7000
);

if(
!response.ok
){

return [];

}

const data =
await response.json();

const articles =
Array.isArray(
data.articles
)
? data.articles
: [];

return articles.map(
article =>({

provider:"gdelt",
category,
title:
cleanText(
article.title
),
description:
cleanText(
article.seendate
? ""
: article.description
),
url:
safeUrl(
article.url
),
image:
safeUrl(
article.socialimage
),
publishedAt:
parseGdeltDate(
article.seendate
),
source:
cleanText(
article.domain ||
hostnameFromUrl(
article.url
)
),
language:
article.language ||
language

})
);

}catch(
error
){

return [];

}

}

function parseGdeltDate(
value
){

if(
!value
){

return null;

}

const text =
String(value);

const match =
text.match(
/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/
);

if(
!match
){

return normalizeDate(
value
);

}

return new Date(
Date.UTC(
Number(
match[1]
),
Number(
match[2]
) - 1,
Number(
match[3]
),
Number(
match[4]
),
Number(
match[5]
),
Number(
match[6]
)
)
)
.toISOString();

}

/* =========================================================
PROVIDER SEARCH
========================================================= */

async function searchProviders(
query,
category,
language
){

const tasks = [

braveSearch(
query,
category,
language
),

serperSearch(
query,
category,
language
),

bingSearch(
query,
category,
language
),

gdeltSearch(
query,
category,
language
)

];

const settled =
await Promise.allSettled(
tasks
);

const results = [];

settled.forEach(
entry =>{

if(
entry.status ===
"fulfilled" &&
Array.isArray(
entry.value
)
){

results.push(
...entry.value
);

}

}
);

return results;

}

/* =========================================================
SEARCH ALL CATEGORIES
========================================================= */

async function searchCategory(
category,
location,
language
){

const queries =
buildQueries(
category,
location,
language
);

const results = [];

for(
const query of queries
){

const found =
await searchProviders(
query,
category,
language
);

results.push(
...found
);

if(
results.length >=
20
){

break;

}

await sleep(
25
);

}

return results;

}

async function searchEverything(
location,
language
){

const categoryGroups = [

[
"lost",
"seen",
"found"
],

[
"event",
"help",
"volunteers"
],

[
"foster",
"adoption",
"news"
]

];

const results = [];

for(
const group of categoryGroups
){

const settled =
await Promise.allSettled(
group.map(
category =>
searchCategory(
category,
location,
language
)
)
);

settled.forEach(
entry =>{

if(
entry.status ===
"fulfilled"
){

results.push(
...entry.value
);

}

}
);

}

return results;

}

/* =========================================================
NORMALISE RESULTS
========================================================= */

function normalizeItems(
items,
location
){

const output = [];

items.forEach(
raw =>{

const url =
stripTrackingParams(
safeUrl(
raw.url
)
);

if(
!url
){

return;

}

const hostname =
hostnameFromUrl(
url
);

if(
BLOCKED_DOMAINS.has(
hostname
)
){

return;

}

const title =
cleanText(
raw.title
);

const description =
cleanText(
raw.description
);

if(
!title ||
title.length < 8
){

return;

}

const classification =
classifyItem(
{
title,
description
},
raw.category
);

const item = {

id:
createId(
url +
title
),

type:
classification.type,

status:
classification.status,

title,

description:
description ||
title,

url,

image:
safeUrl(
raw.image
),

source:
cleanText(
raw.source ||
hostname
),

provider:
raw.provider,

publishedAt:
normalizeDate(
raw.publishedAt
),

language:
normalizeLanguage(
raw.language
),

location,

relevance:
locationScore(
{
title,
description,
url
},
location
)

};

if(
!passesFreshness(
item
)
){

return;

}

output.push(
item
);

}
);

return output;

}

/* =========================================================
DEDUPLICATION
========================================================= */

function normalizeForDuplicate(
value
){

return String(
value ||
""
)
.toLowerCase()
.replace(
/[^a-zа-яёіїєґ0-9]+/gi,
" "
)
.replace(
/\s+/g,
" "
)
.trim();

}

function similarity(
first,
second
){

const firstWords =
new Set(
normalizeForDuplicate(
first
)
.split(" ")
.filter(
word =>
word.length >= 4
)
);

const secondWords =
new Set(
normalizeForDuplicate(
second
)
.split(" ")
.filter(
word =>
word.length >= 4
)
);

if(
!firstWords.size ||
!secondWords.size
){

return 0;

}

let common =
0;

firstWords.forEach(
word =>{

if(
secondWords.has(
word
)
){

common++;

}

}
);

return common /
Math.min(
firstWords.size,
secondWords.size
);

}

function deduplicate(
items
){

const byUrl =
new Map();

items.forEach(
item =>{

const key =
stripTrackingParams(
item.url
);

const existing =
byUrl.get(
key
);

if(
!existing ||
scoreItem(
item
) >
scoreItem(
existing
)
){

byUrl.set(
key,
item
);

}

}
);

const firstPass =
[
...byUrl.values()
];

const output = [];

firstPass
.sort(
(
a,
b
) =>
scoreItem(
b
) -
scoreItem(
a
)
)
.forEach(
item =>{

const duplicate =
output.some(
existing =>
similarity(
existing.title,
item.title
) >= .78
);

if(
!duplicate
){

output.push(
item
);

}

}
);

return output;

}

/* =========================================================
RESULT SCORING
========================================================= */

function scoreItem(
item
){

let score =
0;

score +=
Math.min(
item.relevance *
30,
30
);

if(
item.publishedAt
){

const age =
ageInDays(
item.publishedAt
);

score +=
Math.max(
0,
30 -
age
);

}

if(
item.image
){

score +=
6;

}

if(
item.description &&
item.description.length >
45
){

score +=
5;

}

if(
item.type !==
"news"
){

score +=
8;

}

if(
item.provider ===
"brave" ||
item.provider ===
"serper" ||
item.provider ===
"bing"
){

score +=
5;

}

if(
item.status ===
"found"
){

score +=
3;

}

return score;

}

/* =========================================================
CATEGORY BALANCING
========================================================= */

function balanceItems(
items,
limit
){

const buckets =
{};

CATEGORY_ORDER.forEach(
category =>{

buckets[
category
] =
[];

}
);

items.forEach(
item =>{

const type =
CATEGORY_ORDER.includes(
item.type
)
? item.type
: "news";

buckets[
type
].push(
item
);

}
);

Object.values(
buckets
)
.forEach(
bucket =>
bucket.sort(
(
a,
b
) =>
scoreItem(
b
) -
scoreItem(
a
)
)
);

const output = [];

let progress =
true;

while(
output.length <
limit &&
progress
){

progress =
false;

for(
const category of CATEGORY_ORDER
){

if(
output.length >=
limit
){

break;

}

const next =
buckets[
category
].shift();

if(
next
){

output.push(
next
);

progress =
true;

}

}

}

return output;

}

/* =========================================================
DEEPL TRANSLATION
========================================================= */

const DEEPL_LANGUAGE_CODES = {
en:"EN",
uk:"UK",
ru:"RU",
fr:"FR",
de:"DE",
es:"ES",
it:"IT",
pt:"PT-PT",
nl:"NL",
pl:"PL",
cs:"CS",
sk:"SK",
hu:"HU",
ro:"RO",
bg:"BG",
el:"EL",
sv:"SV",
da:"DA",
no:"NB",
fi:"FI",
tr:"TR"
};

async function translateWithDeepL(
texts,
targetLanguage
){

const apiKey =
process.env.DEEPL_API_KEY;

const target =
DEEPL_LANGUAGE_CODES[
targetLanguage
];

if(
!apiKey ||
!target ||
!texts.length
){

return null;

}

const endpoint =
apiKey.endsWith(
":fx"
)
? "https://api-free.deepl.com/v2/translate"
: "https://api.deepl.com/v2/translate";

try{

const body =
new URLSearchParams();

texts.forEach(
text =>
body.append(
"text",
text
)
);

body.append(
"target_lang",
target
);

const response =
await fetchWithTimeout(
endpoint,
{
method:"POST",
headers:{
Authorization:
"DeepL-Auth-Key " +
apiKey,
"Content-Type":
"application/x-www-form-urlencoded"
},
body:
body.toString()
},
8000
);

if(
!response.ok
){

return null;

}

const data =
await response.json();

if(
!Array.isArray(
data.translations
)
){

return null;

}

return data.translations.map(
item =>
cleanText(
item.text
)
);

}catch(
error
){

return null;

}

}

/* =========================================================
TRANSLATE RESULT ITEMS
========================================================= */

async function translateItems(
items,
targetLanguage
){

if(
targetLanguage ===
"en"
){

return items;

}

const texts = [];

items.forEach(
item =>{

texts.push(
item.title
);

texts.push(
item.description
);

}
);

const translations =
await translateWithDeepL(
texts,
targetLanguage
);

if(
!translations ||
translations.length !==
texts.length
){

return items;

}

let pointer =
0;

return items.map(
item =>{

const translatedTitle =
translations[
pointer++
];

const translatedDescription =
translations[
pointer++
];

return {
...item,

originalTitle:
item.title,

originalDescription:
item.description,

title:
translatedTitle ||
item.title,

description:
translatedDescription ||
item.description,

translated:
true

};

}
);

}

/* =========================================================
PROVIDER STATUS
========================================================= */

function providerStatus(){

return {

brave:
Boolean(
process.env.BRAVE_SEARCH_API_KEY
),

serper:
Boolean(
process.env.SERPER_API_KEY
),

bing:
Boolean(
process.env.BING_SEARCH_API_KEY
),

gdelt:
true,

deepl:
Boolean(
process.env.DEEPL_API_KEY
)

};

}

/* =========================================================
PUBLIC ITEM SHAPE
========================================================= */

function publicItem(
item,
coords
){

return {

id:
item.id,

type:
item.type,

status:
item.status,

title:
item.title,

description:
item.description,

originalTitle:
item.originalTitle ||
null,

originalDescription:
item.originalDescription ||
null,

translated:
Boolean(
item.translated
),

url:
item.url,

image:
item.image ||
"",

source:
item.source ||
hostnameFromUrl(
item.url
),

publishedAt:
item.publishedAt,

provider:
item.provider,

language:
item.language,

location:
item.location,

lat:
Number.isFinite(
coords.latitude
)
? coords.latitude
: null,

lng:
Number.isFinite(
coords.longitude
)
? coords.longitude
: null,

isLive:
true

};

}

/* =========================================================
RESPONSE
========================================================= */

function sendJson(
res,
status,
payload
){

res.statusCode =
status;

res.setHeader(
"Content-Type",
"application/json; charset=utf-8"
);

res.setHeader(
"Cache-Control",
"public, s-maxage=300, stale-while-revalidate=900"
);

res.setHeader(
"Access-Control-Allow-Origin",
"*"
);

res.setHeader(
"Access-Control-Allow-Methods",
ALLOWED_METHODS
);

res.setHeader(
"Access-Control-Allow-Headers",
"Content-Type"
);

res.end(
JSON.stringify(
payload
)
);

}

/* =========================================================
HANDLER
========================================================= */

module.exports =
async function handler(
req,
res
){

if(
req.method ===
"OPTIONS"
){

res.statusCode =
204;

res.setHeader(
"Access-Control-Allow-Origin",
"*"
);

res.setHeader(
"Access-Control-Allow-Methods",
ALLOWED_METHODS
);

res.setHeader(
"Access-Control-Allow-Headers",
"Content-Type"
);

res.end();

return;

}

if(
req.method !==
"GET"
){

sendJson(
res,
405,
{
ok:false,
error:"Method not allowed"
}
);

return;

}

const startedAt =
Date.now();

const params =
readQuery(
req
);

const error =
validateRequest(
params
);

if(
error
){

sendJson(
res,
400,
{
ok:false,
error
}
);

return;

}

try{

let location =
params.location;

let resolvedLocation =
null;

if(
!location &&
Number.isFinite(
params.latitude
) &&
Number.isFinite(
params.longitude
)
){

resolvedLocation =
await reverseLocation(
params.latitude,
params.longitude,
params.language
);

location =
resolvedLocation?.name ||
"";

}

if(
!location
){

sendJson(
res,
400,
{
ok:false,
error:"Could not resolve location"
}
);

return;

}

/* =========================================================
SEARCH INTERNET
========================================================= */

const rawResults =
await searchEverything(
location,
params.language
);

/* =========================================================
NORMALISE
========================================================= */

let items =
normalizeItems(
rawResults,
location
);

/* =========================================================
DEDUPLICATE
========================================================= */

items =
deduplicate(
items
);

/* =========================================================
LOCAL RELEVANCE

If enough strongly local results exist, prefer them.
Otherwise keep broader location matches so the page
does not become empty for smaller areas.
========================================================= */

const localItems =
items.filter(
item =>
item.relevance >
0
);

if(
localItems.length >=
5
){

items =
localItems;

}

/* =========================================================
BALANCE
========================================================= */

items =
balanceItems(
items,
params.limit
);

/* =========================================================
TRANSLATE
========================================================= */

items =
await translateItems(
items,
params.language
);

/* =========================================================
COUNTS
========================================================= */

const counts = {
all:
items.length,
lost:0,
seen:0,
found:0,
event:0,
help:0,
volunteers:0,
foster:0,
adoption:0,
news:0
};

items.forEach(
item =>{

if(
Object.prototype.hasOwnProperty.call(
counts,
item.type
)
){

counts[
item.type
]++;

}

}
);

/* =========================================================
FINAL
========================================================= */

sendJson(
res,
200,
{

ok:true,

live:true,

generatedAt:
nowIso(),

tookMs:
Date.now() -
startedAt,

query:{

location,

lat:
Number.isFinite(
params.latitude
)
? params.latitude
: null,

lng:
Number.isFinite(
params.longitude
)
? params.longitude
: null,

radiusKm:
params.radius,

language:
params.language,

limit:
params.limit

},

resolvedLocation,

providers:
providerStatus(),

counts,

items:
items.map(
item =>
publicItem(
item,
params
)
)

}
);

}catch(
error
){

console.error(
"PETS & DOGUE Community Discovery error:",
error
);

sendJson(
res,
500,
{

ok:false,

live:false,

generatedAt:
nowIso(),

error:
"Community discovery temporarily unavailable",

items:[]

}
);

}

};
