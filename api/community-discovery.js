"use strict";

/* =========================================================
PETS & DOGUE
LOCAL COMMUNITY — LIVE DISCOVERY AGGREGATOR
Vercel Serverless Function

GOAL
------------------------------------------------------------
Selected location + radius -> fresh public animal information:

- lost pets
- pet sightings
- found / reunited pets
- pet events
- dog / breed meetups
- group walks
- dog & cat shows
- exhibitions
- adoption days
- pet festivals
- shelter events
- charity events
- help requests
- volunteers
- foster requests
- adoption / looking for family
- local animal news

IMPORTANT
------------------------------------------------------------
This endpoint aggregates publicly available search/API results.
It never claims to contain literally the entire internet.

Every external result keeps:
- original URL
- source domain/provider
- publication/event information when available

NO EXTRA NPM PACKAGES REQUIRED.

FREE PROVIDERS
------------------------------------------------------------
- GDELT
- Google News RSS
- OpenStreetMap Nominatim geocoding

OPTIONAL PROVIDERS
------------------------------------------------------------
BRAVE_SEARCH_API_KEY=
SERPER_API_KEY=
BING_SEARCH_API_KEY=
TICKETMASTER_API_KEY=
NEWSAPI_API_KEY=
DEEPL_API_KEY=

Recommended:
Configure at least Brave OR Serper for broad web discovery.
Ticketmaster strongly improves events.
DeepL improves translated external content.

========================================================= */

/* =========================================================
CONFIG
========================================================= */

const ALLOWED_METHODS = "GET,OPTIONS";

const DEFAULT_LIMIT = 32;
const MAX_LIMIT = 60;

const DEFAULT_RADIUS_KM = 15;
const MAX_RADIUS_KM = 100;

const REQUEST_TIMEOUT = 8500;

const MAX_PROVIDER_RESULTS = 12;

const MAX_QUERIES_PER_CATEGORY = 4;

const MAX_TOTAL_RAW_RESULTS = 500;

const CACHE_SECONDS = 180;

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

const EVENT_KEYWORDS = [
"event",
"events",
"meetup",
"meet up",
"meeting",
"walk",
"group walk",
"dog walk",
"breed walk",
"breed meetup",
"dog meetup",
"puppy meetup",
"pet meetup",
"dog show",
"cat show",
"pet show",
"animal show",
"exhibition",
"expo",
"festival",
"pet festival",
"dog festival",
"animal festival",
"adoption day",
"adoption event",
"open day",
"charity event",
"fundraising event",
"training event",
"competition",
"agility",
"parade",
"community walk",

"событие",
"мероприятие",
"встреча",
"выставка",
"прогулка",
"сбор в парке",
"встреча собак",
"встреча владельцев",
"встреча породы",
"выставка собак",
"выставка кошек",
"фестиваль животных",
"день пристройства",
"день открытых дверей",

"подія",
"зустріч",
"виставка",
"прогулянка",
"фестиваль",
"день адопції"
];

/* =========================================================
LANGUAGES
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

const LANGUAGE_ALIASES = {
ua:"uk",
cz:"cs",
gr:"el",
se:"sv",
dk:"da"
};

function normalizeLanguage(value){

if(!value){
return "en";
}

let language =
String(value)
.trim()
.toLowerCase();

if(language.includes("-")){
language = language.split("-")[0];
}

if(language.includes("_")){
language = language.split("_")[0];
}

language =
LANGUAGE_ALIASES[language] ||
language;

return SUPPORTED_LANGUAGES.has(language)
? language
: "en";

}

/* =========================================================
SEARCH VOCABULARY
========================================================= */

const SEARCH_TERMS = {

en:{
lost:[
"lost dog",
"lost cat",
"missing pet",
"missing dog",
"missing cat",
"lost pet alert"
],
seen:[
"lost dog sighting",
"lost cat sighting",
"dog seen roaming",
"cat seen roaming",
"stray pet sighting"
],
found:[
"lost dog found",
"lost cat found",
"missing pet found",
"pet reunited",
"owner found pet"
],
event:[
"dog meetup",
"breed meetup",
"dog walk event",
"pet meetup",
"dog show",
"cat show",
"pet show",
"pet exhibition",
"pet festival",
"animal festival",
"adoption day",
"animal shelter open day",
"pet charity event",
"dog walking group",
"puppy meetup"
],
help:[
"animal rescue needs help",
"animal shelter needs help",
"pet emergency fundraiser",
"animal rescue appeal",
"urgent animal help"
],
volunteers:[
"animal shelter volunteers",
"animal rescue volunteers",
"dog rescue volunteers",
"cat rescue volunteers"
],
foster:[
"animal foster home needed",
"dog foster needed",
"cat foster needed",
"temporary foster pet"
],
adoption:[
"dog adoption",
"cat adoption",
"pet adoption",
"animal needs home",
"dog looking for home",
"cat looking for home",
"pet looking for family"
],
news:[
"local animal news",
"local pet news",
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
"потерялся питомец",
"розыск питомца"
],
seen:[
"видели пропавшую собаку",
"видели пропавшую кошку",
"заметили потерявшегося питомца",
"собака без хозяина замечена"
],
found:[
"пропавшая собака найдена",
"пропавшая кошка найдена",
"питомец найден",
"животное вернулось домой"
],
event:[
"встреча владельцев собак",
"встреча породы собак",
"прогулка с собаками",
"сбор собак в парке",
"выставка собак",
"выставка кошек",
"выставка животных",
"фестиваль животных",
"мероприятие для животных",
"день пристройства животных",
"благотворительное мероприятие животные"
],
help:[
"нужна помощь животным",
"приюту нужна помощь",
"сбор помощи животным",
"срочно нужна помощь животному"
],
volunteers:[
"нужны волонтеры животным",
"приют ищет волонтеров",
"волонтеры для собак",
"волонтеры для кошек"
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
"взять собаку из приюта",
"взять кошку из приюта"
],
news:[
"местные новости животных",
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
"помітили загублену тварину"
],
found:[
"загубленого собаку знайдено",
"загублену кішку знайдено",
"улюбленця знайдено"
],
event:[
"зустріч власників собак",
"зустріч породи собак",
"прогулянка з собаками",
"зустріч собак у парку",
"виставка собак",
"виставка котів",
"виставка тварин",
"фестиваль тварин",
"подія для тварин",
"день адопції тварин"
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
"місцеві новини про тварин",
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
"chien perdu aperçu",
"chat perdu aperçu",
"animal errant aperçu"
],
found:[
"chien perdu retrouvé",
"chat perdu retrouvé",
"animal retrouvé"
],
event:[
"rencontre chiens",
"promenade chiens",
"rencontre de race chien",
"événement animaux",
"exposition canine",
"exposition féline",
"festival animaux",
"journée adoption animaux"
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
"actualités locales animaux",
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
"vermisste Katze gesichtet"
],
found:[
"vermisster Hund gefunden",
"vermisste Katze gefunden"
],
event:[
"Hundetreffen",
"Rassentreffen Hund",
"Hundespaziergang",
"Tierveranstaltung",
"Hundeausstellung",
"Katzenausstellung",
"Tierfestival",
"Adoptionstag Tiere"
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
"lokale Tiernachrichten",
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
"gato perdido visto"
],
found:[
"perro perdido encontrado",
"gato perdido encontrado",
"mascota encontrada"
],
event:[
"encuentro de perros",
"encuentro de raza perros",
"paseo de perros",
"evento de mascotas",
"exposición canina",
"exposición felina",
"festival de mascotas",
"día de adopción"
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
"noticias locales animales",
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
"raduno razza cani",
"passeggiata cani evento",
"evento animali",
"mostra canina",
"mostra felina",
"festival animali",
"giornata adozioni"
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
"notizie locali animali",
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
"encontro de raça cães",
"passeio de cães",
"evento animal",
"exposição canina",
"exposição felina",
"festival animal",
"dia de adoção"
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
"notícias locais animais",
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
"hondenras meetup",
"hondenwandeling evenement",
"dierenevenement",
"hondenshow",
"kattenshow",
"dierenfestival",
"adoptiedag"
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
"lokaal dierennieuws",
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
"spotkanie rasy psów",
"spacer z psami",
"wydarzenie dla zwierząt",
"wystawa psów",
"wystawa kotów",
"festiwal zwierząt",
"dzień adopcji"
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
"lokalne wiadomości o zwierzętach",
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
"setkání plemene psů",
"procházka se psy",
"zvířecí akce",
"výstava psů",
"výstava koček",
"festival zvířat",
"adopční den"
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
"místní zprávy o zvířatech",
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
"stretnutie plemena psov",
"prechádzka so psami",
"zvieracie podujatie",
"výstava psov",
"výstava mačiek",
"festival zvierat"
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
"miestne správy o zvieratách",
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
"kutyafajta találkozó",
"kutyaséta esemény",
"állatos esemény",
"kutyakiállítás",
"macskakiállítás",
"állatfesztivál"
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
"helyi állathírek",
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
"întâlnire rasă câini",
"plimbare câini eveniment",
"eveniment animale",
"expoziție canină",
"expoziție feline",
"festival animale"
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
"știri locale animale",
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
"среща порода кучета",
"разходка с кучета",
"събитие за животни",
"изложба на кучета",
"изложба на котки",
"фестивал за животни"
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
"местни новини за животни",
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
"συνάντηση φυλής σκύλων",
"βόλτα σκύλων",
"εκδήλωση ζώων",
"έκθεση σκύλων",
"έκθεση γάτας",
"φεστιβάλ ζώων"
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
"τοπικά νέα για ζώα",
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
"rasträff hund",
"hundpromenad event",
"djurevent",
"hundutställning",
"kattutställning",
"djurfestival"
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
"lokala djurnyheter",
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
"racetræf hund",
"hundetur arrangement",
"dyrearrangement",
"hundeudstilling",
"katteudstilling",
"dyrefestival"
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
"lokale dyrenyheder",
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
"rasetreff hund",
"hundetur arrangement",
"dyrearrangement",
"hundeutstilling",
"katteutstilling",
"dyrefestival"
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
"lokale dyrenyheter",
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
"koirarotutapaaminen",
"koirakävely tapahtuma",
"eläintapahtuma",
"koiranäyttely",
"kissanäyttely",
"eläinfestivaali"
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
"paikalliset eläinuutiset",
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
"köpek ırkı buluşması",
"köpek yürüyüşü etkinliği",
"evcil hayvan etkinliği",
"köpek gösterisi",
"kedi gösterisi",
"hayvan festivali"
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
"yerel hayvan haberleri",
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
"لقاء سلالة كلاب",
"نزهة كلاب",
"فعالية حيوانات",
"عرض كلاب",
"عرض قطط",
"مهرجان حيوانات"
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
"أخبار محلية عن الحيوانات",
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
"डॉग ब्रीड मीटअप",
"डॉग वॉक कार्यक्रम",
"पालतू कार्यक्रम",
"डॉग शो",
"कैट शो",
"पशु उत्सव"
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
"स्थानीय पशु समाचार",
"पशु कल्याण"
]
}

};

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
"back home",
"pet reunited",
"найден",
"нашёлся",
"нашлась",
"нашли",
"вернулся домой",
"знайден",
"знайшовся",
"retrouvé",
"gefunden",
"encontrado",
"ritrovato",
"encontrado",
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
"मिला"
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
"lost pet",
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

event:EVENT_KEYWORDS,

volunteers:[
"volunteer",
"volunteers",
"volunteering",
"volunteer needed",
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
"temporary foster",
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
"adoptable",
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
"medical fundraiser",
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
"yardım",
"يحتاج مساعدة",
"मदद चाहिए"
]

};

/* =========================================================
DOMAIN QUALITY
========================================================= */

const BLOCKED_DOMAINS = new Set([
"pinterest.com",
"pinterest.co.uk",
"quora.com",
"tiktok.com"
]);

const TRUSTED_DOMAIN_HINTS = [
"rspca.org.uk",
"bluecross.org.uk",
"dogstrust.org.uk",
"cats.org.uk",
"petfinder.com",
"adoptapet.com",
"eventbrite.com",
"meetup.com",
"ticketmaster.",
"gov.",
".gov",
"facebook.com",
"instagram.com"
];

/* =========================================================
UTILITY
========================================================= */

function cleanText(value){

return String(value || "")
.replace(/<script[\s\S]*?<\/script>/gi," ")
.replace(/<style[\s\S]*?<\/style>/gi," ")
.replace(/<[^>]+>/g," ")
.replace(/&nbsp;/g," ")
.replace(/&amp;/g,"&")
.replace(/&quot;/g,'"')
.replace(/&#39;/g,"'")
.replace(/&#x27;/g,"'")
.replace(/&lt;/g,"<")
.replace(/&gt;/g,">")
.replace(/\s+/g," ")
.trim();

}

function safeUrl(value){

try{

const url = new URL(String(value || ""));

if(!["http:","https:"].includes(url.protocol)){
return "";
}

return url.toString();

}catch(error){

return "";

}

}

function hostnameFromUrl(value){

try{

return new URL(value)
.hostname
.toLowerCase()
.replace(/^www\./,"");

}catch(error){

return "";

}

}

function stripTrackingParams(value){

try{

const url = new URL(value);

[
"utm_source",
"utm_medium",
"utm_campaign",
"utm_term",
"utm_content",
"fbclid",
"gclid",
"mc_cid",
"mc_eid"
].forEach(
key => url.searchParams.delete(key)
);

return url.toString();

}catch(error){

return value;

}

}

function clamp(value,min,max){

return Math.min(
Math.max(
Number(value) || 0,
min
),
max
);

}

function unique(values){

return [
...new Set(
values.filter(Boolean)
)
];

}

function nowIso(){

return new Date().toISOString();

}

function normalizeDate(value){

if(!value){
return null;
}

const date = new Date(value);

if(Number.isNaN(date.getTime())){
return null;
}

return date.toISOString();

}

function ageInDays(value){

if(!value){
return 999;
}

const timestamp =
new Date(value)
.getTime();

if(Number.isNaN(timestamp)){
return 999;
}

return (
Date.now() -
timestamp
) / 86400000;

}

function daysUntil(value){

if(!value){
return null;
}

const timestamp =
new Date(value)
.getTime();

if(Number.isNaN(timestamp)){
return null;
}

return (
timestamp -
Date.now()
) / 86400000;

}

function includesAny(text,keywords){

const normalized =
String(text || "")
.toLowerCase();

return keywords.some(
keyword =>
normalized.includes(
String(keyword)
.toLowerCase()
)
);

}

function createId(value){

let hash = 2166136261;

const text = String(value || "");

for(
let index = 0;
index < text.length;
index++
){

hash ^= text.charCodeAt(index);

hash =
Math.imul(
hash,
16777619
);

}

return (
"community-" +
(hash >>> 0)
.toString(36)
);

}

function numberOrNull(value){

const number = Number(value);

return Number.isFinite(number)
? number
: null;

}

function parseMaybeDateFromText(text){

const value =
String(text || "");

const iso =
value.match(
/\b(20\d{2})-(\d{2})-(\d{2})(?:[T\s](\d{1,2}):(\d{2}))?/
);

if(iso){

const date =
new Date(
Number(iso[1]),
Number(iso[2]) - 1,
Number(iso[3]),
Number(iso[4] || 12),
Number(iso[5] || 0)
);

if(!Number.isNaN(date.getTime())){
return date.toISOString();
}

}

const ukDate =
value.match(
/\b(\d{1,2})[\/.](\d{1,2})[\/.](20\d{2})\b/
);

if(ukDate){

const date =
new Date(
Number(ukDate[3]),
Number(ukDate[2]) - 1,
Number(ukDate[1]),
12,
0
);

if(!Number.isNaN(date.getTime())){
return date.toISOString();
}

}

return null;

}

function htmlDecode(value){

return cleanText(
String(value || "")
.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,"$1")
);

}

function xmlTag(block,tag){

const regex =
new RegExp(
`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,
"i"
);

const match =
String(block || "")
.match(regex);

return match
? htmlDecode(match[1])
: "";

}

function xmlAttribute(block,tag,attribute){

const regex =
new RegExp(
`<${tag}[^>]*${attribute}=["']([^"']+)["'][^>]*>`,
"i"
);

const match =
String(block || "")
.match(regex);

return match
? cleanText(match[1])
: "";

}

function sourceQualityBoost(url){

const hostname =
hostnameFromUrl(url);

if(
TRUSTED_DOMAIN_HINTS.some(
hint =>
hostname.includes(hint) ||
url.includes(hint)
)
){

return 8;

}

return 0;

}

/* =========================================================
DISTANCE
========================================================= */

function haversineKm(
lat1,
lng1,
lat2,
lng2
){

if(
![
lat1,
lng1,
lat2,
lng2
].every(Number.isFinite)
){

return null;

}

const radius = 6371;

const toRad =
degrees =>
degrees * Math.PI / 180;

const dLat =
toRad(lat2 - lat1);

const dLng =
toRad(lng2 - lng1);

const first =
toRad(lat1);

const second =
toRad(lat2);

const a =
Math.sin(dLat / 2) ** 2 +
Math.cos(first) *
Math.cos(second) *
Math.sin(dLng / 2) ** 2;

return (
2 *
radius *
Math.asin(
Math.sqrt(a)
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
() => controller.abort(),
timeout
);

try{

return await fetch(
url,
{
...options,
signal:controller.signal
}
);

}finally{

clearTimeout(timer);

}

}

/* =========================================================
REQUEST QUERY
========================================================= */

function readQuery(req){

const query =
req.query ||
{};

const language =
normalizeLanguage(
query.lang
);

const latitude =
Number(query.lat);

const longitude =
Number(query.lng);

const radius =
clamp(
query.radius ||
DEFAULT_RADIUS_KM,
1,
MAX_RADIUS_KM
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

const category =
CATEGORY_ORDER.includes(
String(query.category || "").toLowerCase()
)
? String(query.category).toLowerCase()
: "";

return {
language,
latitude,
longitude,
radius,
limit,
location,
category
};

}

/* =========================================================
VALIDATION
========================================================= */

function validateRequest(params){

if(
!params.location &&
(
!Number.isFinite(params.latitude) ||
!Number.isFinite(params.longitude)
)
){

return "location or coordinates are required";

}

if(
Number.isFinite(params.latitude) &&
(
params.latitude < -90 ||
params.latitude > 90
)
){

return "invalid latitude";

}

if(
Number.isFinite(params.longitude) &&
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
GEOCODING
========================================================= */

async function reverseLocation(
latitude,
longitude,
language
){

if(
!Number.isFinite(latitude) ||
!Number.isFinite(longitude)
){

return null;

}

try{

const url =
"https://nominatim.openstreetmap.org/reverse" +
"?format=jsonv2" +
"&zoom=12" +
"&addressdetails=1" +
"&lat=" +
encodeURIComponent(latitude) +
"&lon=" +
encodeURIComponent(longitude);

const response =
await fetchWithTimeout(
url,
{
headers:{
"Accept-Language":language,
"User-Agent":"PETS-DOGUE-Community/2.0"
}
},
5000
);

if(!response.ok){
return null;
}

const data =
await response.json();

return normalizeNominatimLocation(
data
);

}catch(error){

return null;

}

}

async function forwardLocation(
location,
language
){

if(!location){
return null;
}

try{

const url =
"https://nominatim.openstreetmap.org/search" +
"?format=jsonv2" +
"&limit=1" +
"&addressdetails=1" +
"&q=" +
encodeURIComponent(location);

const response =
await fetchWithTimeout(
url,
{
headers:{
"Accept-Language":language,
"User-Agent":"PETS-DOGUE-Community/2.0"
}
},
5000
);

if(!response.ok){
return null;
}

const results =
await response.json();

if(
!Array.isArray(results) ||
!results.length
){

return null;

}

return normalizeNominatimLocation(
results[0]
);

}catch(error){

return null;

}

}

function normalizeNominatimLocation(data){

const address =
data?.address ||
{};

const city =
address.city ||
address.town ||
address.village ||
address.municipality ||
address.hamlet ||
address.suburb ||
"";

const district =
address.city_district ||
address.suburb ||
address.borough ||
"";

const county =
address.county ||
address.state_district ||
"";

const state =
address.state ||
address.region ||
"";

const country =
address.country ||
"";

const latitude =
numberOrNull(
data.lat
);

const longitude =
numberOrNull(
data.lon
);

const name =
unique([
city,
county,
state,
country
])
.slice(0,3)
.join(", ") ||
cleanText(
data.display_name
);

return {
name,
displayName:
cleanText(
data.display_name
),
city,
district,
county,
state,
country,
countryCode:
String(
address.country_code ||
""
)
.toLowerCase(),
latitude,
longitude
};

}

/* =========================================================
LOCATION SEARCH CONTEXT
========================================================= */

function buildLocationContext(
requested,
resolved
){

const parts =
unique([
requested,
resolved?.city,
resolved?.district,
resolved?.county,
resolved?.state,
resolved?.country
])
.filter(Boolean);

return parts
.slice(0,5)
.join(" ");

}

function locationTokens(location,resolved){

return unique(
[
location,
resolved?.city,
resolved?.district,
resolved?.county,
resolved?.state,
resolved?.country
]
.filter(Boolean)
.flatMap(
value =>
String(value)
.toLowerCase()
.split(
/[,|/()\-]+|\s+/
)
)
.map(token => token.trim())
.filter(token => token.length >= 3)
)
.slice(0,18);

}

/* =========================================================
SEARCH QUERY GENERATION
========================================================= */

function buildQueries(
category,
location,
resolved,
language
){

const localTerms =
SEARCH_TERMS[language]?.[category] ||
[];

const englishTerms =
SEARCH_TERMS.en[category] ||
[];

const terms =
unique([
...localTerms.slice(0,5),
...englishTerms.slice(0,4)
]);

const context =
buildLocationContext(
location,
resolved
);

const queries =
terms.map(
term =>
`"${term}" ${context}`
);

if(category === "event"){

queries.unshift(
`pet events ${context}`,
`dog events ${context}`,
`dog shows cat shows pet exhibitions ${context}`,
`dog walks breed meetups ${context}`
);

}

return unique(queries)
.slice(
0,
MAX_QUERIES_PER_CATEGORY
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
String(item.title || "") +
" " +
String(item.description || "")
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

function maxAgeDaysForType(type){

const map = {
lost:45,
seen:21,
found:90,
event:180,
help:90,
volunteers:120,
foster:120,
adoption:180,
news:45
};

return map[type] || 60;

}

function passesFreshness(item){

if(
item.type === "event" &&
item.eventStart
){

const until =
daysUntil(
item.eventStart
);

if(
until !== null &&
until < -2
){

return false;

}

if(
until !== null &&
until > 365
){

return false;

}

return true;

}

if(!item.publishedAt){
return true;
}

return (
ageInDays(item.publishedAt) <=
maxAgeDaysForType(item.type)
);

}

/* =========================================================
LOCATION RELEVANCE
========================================================= */

function locationScore(
item,
location,
resolved
){

const tokens =
locationTokens(
location,
resolved
);

if(!tokens.length){
return 1;
}

const text =
(
String(item.title || "") +
" " +
String(item.description || "") +
" " +
String(item.venue || "") +
" " +
String(item.address || "") +
" " +
String(item.location || "") +
" " +
String(item.url || "")
)
.toLowerCase();

let matches = 0;

tokens.forEach(
token =>{

if(text.includes(token)){
matches++;
}

}
);

return matches / tokens.length;

}

/* =========================================================
BRAVE
========================================================= */

async function braveSearch(
query,
category,
language
){

const apiKey =
process.env.BRAVE_SEARCH_API_KEY;

if(!apiKey){
return [];
}

try{

const url =
"https://api.search.brave.com/res/v1/web/search" +
"?q=" +
encodeURIComponent(query) +
"&count=" +
MAX_PROVIDER_RESULTS +
"&safesearch=moderate" +
"&text_decorations=false" +
"&spellcheck=true";

const response =
await fetchWithTimeout(
url,
{
headers:{
Accept:"application/json",
"Accept-Encoding":"gzip",
"X-Subscription-Token":apiKey
}
}
);

if(!response.ok){
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
title:cleanText(result.title),
description:cleanText(result.description),
url:safeUrl(result.url),
image:safeUrl(
result.thumbnail?.src ||
result.profile?.img ||
""
),
publishedAt:
normalizeDate(
result.page_age ||
result.age
),
eventStart:
parseMaybeDateFromText(
result.title +
" " +
result.description
),
source:
hostnameFromUrl(
result.url
),
language

})
);

}catch(error){

console.error(
"Brave search error:",
error.message
);

return [];

}

}

/* =========================================================
SERPER
========================================================= */

async function serperSearch(
query,
category,
language
){

const apiKey =
process.env.SERPER_API_KEY;

if(!apiKey){
return [];
}

try{

const response =
await fetchWithTimeout(
"https://google.serper.dev/search",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"X-API-KEY":apiKey
},
body:
JSON.stringify({
q:query,
num:MAX_PROVIDER_RESULTS,
hl:
language === "uk"
? "uk"
: language
})
}
);

if(!response.ok){
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
title:cleanText(result.title),
description:cleanText(result.snippet),
url:safeUrl(result.link),
image:"",
publishedAt:
normalizeDate(
result.date
),
eventStart:
parseMaybeDateFromText(
result.title +
" " +
result.snippet +
" " +
(result.date || "")
),
source:
hostnameFromUrl(
result.link
),
language

})
);

}catch(error){

console.error(
"Serper search error:",
error.message
);

return [];

}

}

/* =========================================================
BING
========================================================= */

function bingMarket(language){

const map = {
en:"en-GB",
uk:"uk-UA",
ru:"ru-RU",
fr:"fr-FR",
de:"de-DE",
es:"es-ES",
it:"it-IT",
pt:"pt-PT",
nl:"nl-NL",
pl:"pl-PL",
cs:"cs-CZ",
sk:"sk-SK",
hu:"hu-HU",
ro:"ro-RO",
bg:"bg-BG",
el:"el-GR",
sv:"sv-SE",
da:"da-DK",
no:"nb-NO",
fi:"fi-FI",
tr:"tr-TR",
ar:"ar-SA",
hi:"hi-IN"
};

return map[language] || "en-GB";

}

async function bingSearch(
query,
category,
language
){

const apiKey =
process.env.BING_SEARCH_API_KEY;

if(!apiKey){
return [];
}

try{

const url =
"https://api.bing.microsoft.com/v7.0/search" +
"?q=" +
encodeURIComponent(query) +
"&count=" +
MAX_PROVIDER_RESULTS +
"&responseFilter=Webpages" +
"&safeSearch=Moderate" +
"&mkt=" +
encodeURIComponent(
bingMarket(language)
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

if(!response.ok){
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
title:cleanText(result.name),
description:cleanText(result.snippet),
url:safeUrl(result.url),
image:"",
publishedAt:
normalizeDate(
result.dateLastCrawled
),
eventStart:
parseMaybeDateFromText(
result.name +
" " +
result.snippet
),
source:
hostnameFromUrl(
result.url
),
language

})
);

}catch(error){

console.error(
"Bing search error:",
error.message
);

return [];

}

}

/* =========================================================
GDELT
========================================================= */

function parseGdeltDate(value){

if(!value){
return null;
}

const text =
String(value);

const match =
text.match(
/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/
);

if(!match){
return normalizeDate(value);
}

return new Date(
Date.UTC(
Number(match[1]),
Number(match[2]) - 1,
Number(match[3]),
Number(match[4]),
Number(match[5]),
Number(match[6])
)
)
.toISOString();

}

async function gdeltSearch(
query,
category,
language
){

try{

const url =
"https://api.gdeltproject.org/api/v2/doc/doc" +
"?query=" +
encodeURIComponent(
`(${query})`
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
"PETS-DOGUE-Community/2.0"
}
},
7000
);

if(!response.ok){
return [];
}

const data =
await response.json();

const articles =
Array.isArray(data.articles)
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
article.description
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
eventStart:
parseMaybeDateFromText(
article.title +
" " +
article.description
),
source:
cleanText(
article.domain ||
hostnameFromUrl(article.url)
),
language:
article.language ||
language

})
);

}catch(error){

return [];

}

}

/* =========================================================
GOOGLE NEWS RSS
FREE
========================================================= */

function googleNewsLocale(language){

const map = {
en:{hl:"en-GB",gl:"GB",ceid:"GB:en"},
uk:{hl:"uk",gl:"UA",ceid:"UA:uk"},
ru:{hl:"ru",gl:"GB",ceid:"GB:ru"},
fr:{hl:"fr",gl:"FR",ceid:"FR:fr"},
de:{hl:"de",gl:"DE",ceid:"DE:de"},
es:{hl:"es",gl:"ES",ceid:"ES:es"},
it:{hl:"it",gl:"IT",ceid:"IT:it"},
pt:{hl:"pt-PT",gl:"PT",ceid:"PT:pt-150"},
nl:{hl:"nl",gl:"NL",ceid:"NL:nl"},
pl:{hl:"pl",gl:"PL",ceid:"PL:pl"},
cs:{hl:"cs",gl:"CZ",ceid:"CZ:cs"},
sk:{hl:"sk",gl:"SK",ceid:"SK:sk"},
hu:{hl:"hu",gl:"HU",ceid:"HU:hu"},
ro:{hl:"ro",gl:"RO",ceid:"RO:ro"},
bg:{hl:"bg",gl:"BG",ceid:"BG:bg"},
el:{hl:"el",gl:"GR",ceid:"GR:el"},
sv:{hl:"sv",gl:"SE",ceid:"SE:sv"},
da:{hl:"da",gl:"DK",ceid:"DK:da"},
no:{hl:"no",gl:"NO",ceid:"NO:no"},
fi:{hl:"fi",gl:"FI",ceid:"FI:fi"},
tr:{hl:"tr",gl:"TR",ceid:"TR:tr"},
ar:{hl:"ar",gl:"AE",ceid:"AE:ar"},
hi:{hl:"hi",gl:"IN",ceid:"IN:hi"}
};

return map[language] || map.en;

}

async function googleNewsSearch(
query,
category,
language
){

try{

const locale =
googleNewsLocale(language);

const url =
"https://news.google.com/rss/search" +
"?q=" +
encodeURIComponent(query) +
"&hl=" +
encodeURIComponent(locale.hl) +
"&gl=" +
encodeURIComponent(locale.gl) +
"&ceid=" +
encodeURIComponent(locale.ceid);

const response =
await fetchWithTimeout(
url,
{
headers:{
"User-Agent":
"PETS-DOGUE-Community/2.0"
}
},
7000
);

if(!response.ok){
return [];
}

const xml =
await response.text();

const blocks =
xml.match(
/<item>[\s\S]*?<\/item>/gi
) || [];

return blocks
.slice(0,MAX_PROVIDER_RESULTS)
.map(
block =>{

const title =
xmlTag(
block,
"title"
);

const description =
xmlTag(
block,
"description"
);

const link =
xmlTag(
block,
"link"
);

const pubDate =
xmlTag(
block,
"pubDate"
);

const source =
xmlTag(
block,
"source"
);

return {
provider:"google-news",
category,
title,
description,
url:safeUrl(link),
image:"",
publishedAt:
normalizeDate(pubDate),
eventStart:
parseMaybeDateFromText(
title +
" " +
description
),
source:
source ||
hostnameFromUrl(link),
language
};

}
)
.filter(
item =>
item.title &&
item.url
);

}catch(error){

return [];

}

}

/* =========================================================
NEWSAPI
OPTIONAL
========================================================= */

async function newsApiSearch(
query,
category,
language
){

const apiKey =
process.env.NEWSAPI_API_KEY;

if(!apiKey){
return [];
}

try{

const url =
"https://newsapi.org/v2/everything" +
"?q=" +
encodeURIComponent(query) +
"&sortBy=publishedAt" +
"&pageSize=" +
MAX_PROVIDER_RESULTS +
"&apiKey=" +
encodeURIComponent(apiKey);

const response =
await fetchWithTimeout(
url,
{
headers:{
"User-Agent":
"PETS-DOGUE-Community/2.0"
}
}
);

if(!response.ok){
return [];
}

const data =
await response.json();

const articles =
Array.isArray(data.articles)
? data.articles
: [];

return articles.map(
article =>({

provider:"newsapi",
category,
title:
cleanText(
article.title
),
description:
cleanText(
article.description ||
article.content
),
url:
safeUrl(
article.url
),
image:
safeUrl(
article.urlToImage
),
publishedAt:
normalizeDate(
article.publishedAt
),
eventStart:
parseMaybeDateFromText(
article.title +
" " +
article.description
),
source:
cleanText(
article.source?.name ||
hostnameFromUrl(article.url)
),
language

})
);

}catch(error){

return [];

}

}

/* =========================================================
TICKETMASTER EVENTS
OPTIONAL
========================================================= */

async function ticketmasterEvents(
locationInfo,
radiusKm,
language
){

const apiKey =
process.env.TICKETMASTER_API_KEY;

if(!apiKey){
return [];
}

if(
!Number.isFinite(locationInfo?.latitude) ||
!Number.isFinite(locationInfo?.longitude)
){

return [];
}

try{

const params =
new URLSearchParams();

params.set(
"apikey",
apiKey
);

params.set(
"latlong",
`${locationInfo.latitude},${locationInfo.longitude}`
);

params.set(
"radius",
String(
Math.max(
1,
Math.round(radiusKm)
)
)
);

params.set(
"unit",
"km"
);

params.set(
"size",
"40"
);

params.set(
"sort",
"date,asc"
);

params.set(
"keyword",
"dog pet animal cat adoption"
);

const url =
"https://app.ticketmaster.com/discovery/v2/events.json?" +
params.toString();

const response =
await fetchWithTimeout(
url,
{},
7500
);

if(!response.ok){
return [];
}

const data =
await response.json();

const events =
data._embedded?.events ||
[];

return events.map(
event =>{

const venue =
event._embedded?.venues?.[0] ||
{};

const image =
Array.isArray(event.images)
? (
event.images
.sort(
(a,b) =>
(Number(b.width) || 0) -
(Number(a.width) || 0)
)[0]?.url ||
""
)
: "";

const start =
event.dates?.start?.dateTime ||
event.dates?.start?.localDate ||
null;

const address =
[
venue.address?.line1,
venue.city?.name,
venue.state?.name,
venue.country?.name
]
.filter(Boolean)
.join(", ");

return {
provider:"ticketmaster",
category:"event",
title:
cleanText(
event.name
),
description:
cleanText(
event.info ||
event.pleaseNote ||
event.description ||
""
),
url:
safeUrl(
event.url
),
image:
safeUrl(image),
publishedAt:null,
eventStart:
normalizeDate(start),
source:"Ticketmaster",
language,
venue:
cleanText(
venue.name
),
address,
latitude:
numberOrNull(
venue.location?.latitude
),
longitude:
numberOrNull(
venue.location?.longitude
),
official:true
};

}
)
.filter(
event =>
includesAny(
event.title +
" " +
event.description,
EVENT_KEYWORDS
)
);

}catch(error){

console.error(
"Ticketmaster error:",
error.message
);

return [];

}

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
),

googleNewsSearch(
query,
category,
language
),

newsApiSearch(
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
entry.status === "fulfilled" &&
Array.isArray(entry.value)
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
SEARCH CATEGORIES
========================================================= */

async function searchCategory(
category,
location,
resolved,
language
){

const queries =
buildQueries(
category,
location,
resolved,
language
);

const settled =
await Promise.allSettled(
queries.map(
query =>
searchProviders(
query,
category,
language
)
)
);

const results = [];

settled.forEach(
entry =>{

if(
entry.status === "fulfilled" &&
Array.isArray(entry.value)
){

results.push(
...entry.value
);

}

}
);

return results
.slice(
0,
MAX_TOTAL_RAW_RESULTS
);

}

async function searchEverything(
location,
resolved,
language,
radius,
requestedCategory
){

if(requestedCategory){

const direct =
await searchCategory(
requestedCategory,
location,
resolved,
language
);

if(requestedCategory === "event"){

const ticketmaster =
await ticketmasterEvents(
resolved,
radius,
language
);

direct.push(
...ticketmaster
);

}

return direct;

}

const settled =
await Promise.allSettled(
CATEGORY_ORDER.map(
category =>
searchCategory(
category,
location,
resolved,
language
)
)
);

const results = [];

settled.forEach(
entry =>{

if(
entry.status === "fulfilled" &&
Array.isArray(entry.value)
){

results.push(
...entry.value
);

}

}
);

const ticketmaster =
await ticketmasterEvents(
resolved,
radius,
language
);

results.push(
...ticketmaster
);

return results
.slice(
0,
MAX_TOTAL_RAW_RESULTS
);

}

/* =========================================================
NORMALISE ITEMS
========================================================= */

function normalizeItems(
items,
location,
resolved,
requestCoords,
radiusKm
){

const output = [];

items.forEach(
raw =>{

const url =
stripTrackingParams(
safeUrl(raw.url)
);

if(!url){
return;
}

const hostname =
hostnameFromUrl(url);

if(
BLOCKED_DOMAINS.has(hostname)
){

return;

}

const title =
cleanText(raw.title);

const description =
cleanText(raw.description);

if(
!title ||
title.length < 5
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

const latitude =
numberOrNull(
raw.latitude
);

const longitude =
numberOrNull(
raw.longitude
);

const distance =
haversineKm(
requestCoords.latitude,
requestCoords.longitude,
latitude,
longitude
);

if(
distance !== null &&
distance >
radiusKm * 1.35
){

return;

}

let eventStart =
normalizeDate(
raw.eventStart
);

if(
classification.type === "event" &&
!eventStart
){

eventStart =
parseMaybeDateFromText(
title +
" " +
description
);

}

const item = {

id:
createId(
url +
"|" +
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
raw.provider ||
"web",

publishedAt:
normalizeDate(
raw.publishedAt
),

eventStart,

language:
normalizeLanguage(
raw.language
),

location,

venue:
cleanText(
raw.venue
),

address:
cleanText(
raw.address
),

lat:
latitude,

lng:
longitude,

distanceKm:
distance,

official:
Boolean(
raw.official
),

relevance:
locationScore(
{
title,
description,
url,
venue:raw.venue,
address:raw.address,
location
},
location,
resolved
)

};

if(
!passesFreshness(item)
){

return;

}

output.push(item);

}
);

return output;

}

/* =========================================================
DUPLICATION
========================================================= */

function normalizeForDuplicate(value){

return String(value || "")
.toLowerCase()
.normalize("NFKD")
.replace(/[^\p{L}\p{N}]+/gu," ")
.replace(/\s+/g," ")
.trim();

}

function similarity(first,second){

const firstWords =
new Set(
normalizeForDuplicate(first)
.split(" ")
.filter(word => word.length >= 4)
);

const secondWords =
new Set(
normalizeForDuplicate(second)
.split(" ")
.filter(word => word.length >= 4)
);

if(
!firstWords.size ||
!secondWords.size
){

return 0;

}

let common = 0;

firstWords.forEach(
word =>{

if(
secondWords.has(word)
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

function deduplicate(items){

const byUrl =
new Map();

items.forEach(
item =>{

const key =
stripTrackingParams(
item.url
);

const existing =
byUrl.get(key);

if(
!existing ||
scoreItem(item) >
scoreItem(existing)
){

byUrl.set(
key,
item
);

}

}
);

const sorted =
[
...byUrl.values()
]
.sort(
(a,b) =>
scoreItem(b) -
scoreItem(a)
);

const output = [];

sorted.forEach(
item =>{

const duplicate =
output.some(
existing =>{

if(
existing.type !== item.type
){

return false;

}

return (
similarity(
existing.title,
item.title
) >= .76
);

}
);

if(!duplicate){
output.push(item);
}

}
);

return output;

}

/* =========================================================
SCORING
========================================================= */

function scoreItem(item){

let score = 0;

score +=
Math.min(
item.relevance * 35,
35
);

if(item.publishedAt){

const age =
Math.max(
0,
ageInDays(item.publishedAt)
);

score +=
Math.max(
0,
32 -
age
);

}

if(
item.type === "event" &&
item.eventStart
){

const until =
daysUntil(
item.eventStart
);

if(
until !== null &&
until >= 0
){

score +=
Math.max(
3,
24 -
Math.min(until,21)
);

}

}

if(item.image){
score += 8;
}

if(
item.description &&
item.description.length >= 55
){

score += 5;
}

if(
item.type !== "news"
){

score += 7;

}

if(item.official){
score += 10;
}

if(
[
"brave",
"serper",
"bing",
"ticketmaster"
].includes(
item.provider
)
){

score += 5;

}

score +=
sourceQualityBoost(
item.url
);

if(
item.distanceKm !== null &&
item.distanceKm !== undefined
){

score +=
Math.max(
0,
10 -
Math.min(
item.distanceKm,
10
)
);

}

return score;

}

/* =========================================================
LOCAL RELEVANCE
========================================================= */

function preferLocalResults(items){

const strong =
items.filter(
item =>
item.relevance >= .12 ||
item.distanceKm !== null
);

if(
strong.length >= 8
){

return strong;

}

const medium =
items.filter(
item =>
item.relevance > 0 ||
item.distanceKm !== null
);

if(
medium.length >= 5
){

return medium;

}

return items;

}

/* =========================================================
BALANCE
========================================================= */

function balanceItems(
items,
limit,
requestedCategory
){

if(requestedCategory){

return items
.sort(
(a,b) =>
scoreItem(b) -
scoreItem(a)
)
.slice(
0,
limit
);

}

const buckets = {};

CATEGORY_ORDER.forEach(
category =>{

buckets[category] = [];

}
);

items.forEach(
item =>{

const type =
CATEGORY_ORDER.includes(item.type)
? item.type
: "news";

buckets[type].push(item);

}
);

Object.values(buckets)
.forEach(
bucket =>
bucket.sort(
(a,b) =>
scoreItem(b) -
scoreItem(a)
)
);

const output = [];

let progress = true;

while(
output.length < limit &&
progress
){

progress = false;

for(
const category of CATEGORY_ORDER
){

if(output.length >= limit){
break;
}

const next =
buckets[category]
.shift();

if(next){

output.push(next);
progress = true;

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
apiKey.endsWith(":fx")
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

if(!response.ok){
return null;
}

const data =
await response.json();

if(
!Array.isArray(data.translations)
){

return null;

}

return data.translations.map(
item =>
cleanText(item.text)
);

}catch(error){

return null;

}

}

/* =========================================================
TRANSLATE ITEMS
========================================================= */

async function translateItems(
items,
targetLanguage
){

if(targetLanguage === "en"){
return items;
}

const translateable =
items.slice(0,30);

const texts = [];

translateable.forEach(
item =>{

texts.push(
item.title
);

texts.push(
item.description
);

if(item.venue){
texts.push(item.venue);
}else{
texts.push("");
}

if(item.address){
texts.push(item.address);
}else{
texts.push("");
}

}
);

const translations =
await translateWithDeepL(
texts,
targetLanguage
);

if(
!translations ||
translations.length !== texts.length
){

return items;

}

let pointer = 0;

const translatedMap =
new Map();

translateable.forEach(
item =>{

const title =
translations[pointer++];

const description =
translations[pointer++];

const venue =
translations[pointer++];

const address =
translations[pointer++];

translatedMap.set(
item.id,
{
title,
description,
venue,
address
}
);

}
);

return items.map(
item =>{

const translated =
translatedMap.get(item.id);

if(!translated){
return item;
}

return {
...item,

originalTitle:
item.title,

originalDescription:
item.description,

originalVenue:
item.venue ||
null,

originalAddress:
item.address ||
null,

title:
translated.title ||
item.title,

description:
translated.description ||
item.description,

venue:
translated.venue ||
item.venue,

address:
translated.address ||
item.address,

translated:true

};

}
);

}

/* =========================================================
EVENT STATUS
========================================================= */

function eventStatus(
eventStart
){

if(!eventStart){
return null;
}

const diff =
daysUntil(eventStart);

if(diff === null){
return null;
}

if(diff < -1){
return "past";
}

if(diff < 1){
return "today";
}

if(diff < 2){
return "tomorrow";
}

if(diff <= 7){
return "this_week";
}

return "upcoming";

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

gdelt:true,

googleNews:true,

newsApi:
Boolean(
process.env.NEWSAPI_API_KEY
),

ticketmaster:
Boolean(
process.env.TICKETMASTER_API_KEY
),

deepl:
Boolean(
process.env.DEEPL_API_KEY
)

};

}

/* =========================================================
PUBLIC RESULT
========================================================= */

function publicItem(
item,
fallbackCoords
){

const latitude =
Number.isFinite(item.lat)
? item.lat
: null;

const longitude =
Number.isFinite(item.lng)
? item.lng
: null;

return {

id:item.id,

type:item.type,

status:item.status,

eventStatus:
item.type === "event"
? eventStatus(item.eventStart)
: null,

title:item.title,

description:item.description,

originalTitle:
item.originalTitle ||
null,

originalDescription:
item.originalDescription ||
null,

translated:
Boolean(item.translated),

url:item.url,

image:item.image || "",

source:
item.source ||
hostnameFromUrl(item.url),

provider:item.provider,

publishedAt:item.publishedAt,

eventStart:
item.eventStart ||
null,

language:item.language,

location:item.location,

venue:
item.venue ||
"",

address:
item.address ||
"",

lat:latitude,

lng:longitude,

searchLat:
Number.isFinite(
fallbackCoords.latitude
)
? fallbackCoords.latitude
: null,

searchLng:
Number.isFinite(
fallbackCoords.longitude
)
? fallbackCoords.longitude
: null,

distanceKm:
typeof item.distanceKm === "number"
? Number(
item.distanceKm.toFixed(1)
)
: null,

official:
Boolean(item.official),

isLive:true

};

}

/* =========================================================
COUNTS
========================================================= */

function buildCounts(items){

const counts = {
all:items.length,
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

counts[item.type]++;

}

}
);

return counts;

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
`public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600`
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
JSON.stringify(payload)
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

if(req.method === "OPTIONS"){

res.statusCode = 204;

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

if(req.method !== "GET"){

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
readQuery(req);

const validationError =
validateRequest(params);

if(validationError){

sendJson(
res,
400,
{
ok:false,
error:validationError
}
);

return;

}

try{

let resolvedLocation = null;

let searchLatitude =
Number.isFinite(params.latitude)
? params.latitude
: null;

let searchLongitude =
Number.isFinite(params.longitude)
? params.longitude
: null;

let location =
params.location;

/* =========================================================
RESOLVE LOCATION
========================================================= */

if(
Number.isFinite(params.latitude) &&
Number.isFinite(params.longitude)
){

resolvedLocation =
await reverseLocation(
params.latitude,
params.longitude,
params.language
);

if(!location){

location =
resolvedLocation?.name ||
resolvedLocation?.displayName ||
"";

}

}else if(location){

resolvedLocation =
await forwardLocation(
location,
params.language
);

if(resolvedLocation){

searchLatitude =
resolvedLocation.latitude;

searchLongitude =
resolvedLocation.longitude;

}

}

if(!location){

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
CANONICAL SEARCH LOCATION

Keep what user chose but enrich search with resolved locality.
========================================================= */

const canonicalLocation =
cleanText(
resolvedLocation?.name ||
location
);

const searchLocation =
cleanText(
location
);

/* =========================================================
SEARCH PUBLIC INTERNET
========================================================= */

const rawResults =
await searchEverything(
searchLocation,
resolvedLocation,
params.language,
params.radius,
params.category
);

/* =========================================================
NORMALISE
========================================================= */

let items =
normalizeItems(
rawResults,
searchLocation,
resolvedLocation,
{
latitude:searchLatitude,
longitude:searchLongitude
},
params.radius
);

/* =========================================================
DE-DUPLICATE
========================================================= */

items =
deduplicate(items);

/* =========================================================
LOCAL RELEVANCE
========================================================= */

items =
preferLocalResults(items);

/* =========================================================
CATEGORY FILTER SAFETY
========================================================= */

if(params.category){

items =
items.filter(
item =>
item.type === params.category
);

}

/* =========================================================
BALANCE / SORT
========================================================= */

items =
balanceItems(
items,
params.limit,
params.category
);

/* =========================================================
TRANSLATE TO SELECTED PETS & DOGUE LANGUAGE
========================================================= */

items =
await translateItems(
items,
params.language
);

/* =========================================================
COUNTS

Counts reflect returned live cards.
Frontend can request category="" to populate all counters,
or category=<type> for focused results.
========================================================= */

const counts =
buildCounts(items);

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

location:
searchLocation,

canonicalLocation,

lat:
searchLatitude,

lng:
searchLongitude,

radiusKm:
params.radius,

language:
params.language,

category:
params.category ||
"all",

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
{
latitude:searchLatitude,
longitude:searchLongitude
}
)
)

}
);

}catch(error){

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

counts:{
all:0,
lost:0,
seen:0,
found:0,
event:0,
help:0,
volunteers:0,
foster:0,
adoption:0,
news:0
},

items:[]

}
);

}

};
