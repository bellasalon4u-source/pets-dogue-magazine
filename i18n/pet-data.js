"use strict";

/*
PETS & DOGUE
Pet breed / species catalogue

Principles:
- stable internal IDs
- canonical international English names
- Russian/Ukrainian aliases for search
- "Other", "Mixed breed" and "Unknown" stay at the top
- UI can search by any alias
- changing pet type must clear an incompatible breed
*/

(function () {

const SPECIAL = {
dog: [
{
id: "dog.other",
name: "Other",
ru: "Другая",
uk: "Інша",
aliases: ["other", "другая", "інша"]
},
{
id: "dog.mixed",
name: "Mixed breed",
ru: "Метис",
uk: "Метис",
aliases: ["mixed", "mixed breed", "crossbreed", "cross breed", "метис", "дворняга"]
},
{
id: "dog.unknown",
name: "I don't know the breed",
ru: "Не знаю породу",
uk: "Не знаю породу",
aliases: ["unknown", "not sure", "не знаю", "неизвестно", "невідомо"]
}
],

cat: [
{
id: "cat.other",
name: "Other",
ru: "Другая",
uk: "Інша",
aliases: ["other", "другая", "інша"]
},
{
id: "cat.mixed",
name: "Mixed breed",
ru: "Метис",
uk: "Метис",
aliases: ["mixed", "mixed breed", "crossbreed", "метис"]
},
{
id: "cat.domestic",
name: "Domestic cat",
ru: "Домашняя кошка",
uk: "Домашня кішка",
aliases: ["domestic", "domestic cat", "домашняя кошка", "домашня кішка"]
},
{
id: "cat.unknown",
name: "I don't know the breed",
ru: "Не знаю породу",
uk: "Не знаю породу",
aliases: ["unknown", "not sure", "не знаю", "невідомо"]
}
],

horse: [
{
id: "horse.other",
name: "Other",
ru: "Другая",
uk: "Інша",
aliases: ["other", "другая", "інша"]
},
{
id: "horse.mixed",
name: "Mixed breed",
ru: "Метис",
uk: "Метис",
aliases: ["mixed", "crossbreed", "метис"]
},
{
id: "horse.unknown",
name: "I don't know the breed",
ru: "Не знаю породу",
uk: "Не знаю породу",
aliases: ["unknown", "not sure", "не знаю", "невідомо"]
}
],

bird: [
{
id: "bird.other",
name: "Other bird",
ru: "Другая птица",
uk: "Інший птах",
aliases: ["other", "other bird", "другая птица", "інший птах"]
},
{
id: "bird.unknown",
name: "I don't know the species",
ru: "Не знаю вид",
uk: "Не знаю вид",
aliases: ["unknown", "not sure", "не знаю", "невідомо"]
}
],

small: [
{
id: "small.other",
name: "Other small animal",
ru: "Другое маленькое животное",
uk: "Інша маленька тварина",
aliases: ["other", "другое", "інша"]
},
{
id: "small.unknown",
name: "I don't know",
ru: "Не знаю",
uk: "Не знаю",
aliases: ["unknown", "not sure", "не знаю"]
}
]
};

const DOGS = [

["affenpinscher","Affenpinscher","Аффенпинчер","Аффенпінчер",[]],
["afghan-hound","Afghan Hound","Афганская борзая","Афганський хорт",["afghan"]],
["airedale-terrier","Airedale Terrier","Эрдельтерьер","Ердельтер'єр",["airedale"]],
["akita","Akita","Акита","Акіта",["akita inu","japanese akita"]],
["alaskan-malamute","Alaskan Malamute","Аляскинский маламут","Аляскинський маламут",["malamute"]],
["american-akita","American Akita","Американская акита","Американська акіта",[]],
["american-bulldog","American Bulldog","Американский бульдог","Американський бульдог",[]],
["american-bully","American Bully","Американский булли","Американський булі",["bully"]],
["american-cocker-spaniel","American Cocker Spaniel","Американский кокер-спаниель","Американський кокер-спанієль",[]],
["american-eskimo-dog","American Eskimo Dog","Американская эскимосская собака","Американський ескімоський собака",["eskie"]],
["american-foxhound","American Foxhound","Американский фоксхаунд","Американський фоксгаунд",[]],
["american-hairless-terrier","American Hairless Terrier","Американский голый терьер","Американський голий тер'єр",[]],
["american-staffordshire-terrier","American Staffordshire Terrier","Американский стаффордширский терьер","Американський стаффордширський тер'єр",["amstaff","stafford"]],
["american-water-spaniel","American Water Spaniel","Американский водяной спаниель","Американський водяний спанієль",[]],
["anatolian-shepherd","Anatolian Shepherd Dog","Анатолийская овчарка","Анатолійська вівчарка",["kangal type"]],
["appenzeller-sennenhund","Appenzeller Sennenhund","Аппенцеллер зенненхунд","Аппенцеллер зенненхунд",[]],
["australian-cattle-dog","Australian Cattle Dog","Австралийская пастушья собака","Австралійський пастуший собака",["blue heeler","red heeler"]],
["australian-kelpie","Australian Kelpie","Австралийский келпи","Австралійський келпі",["kelpie"]],
["australian-shepherd","Australian Shepherd","Австралийская овчарка","Австралійська вівчарка",["aussie"]],
["australian-silky-terrier","Australian Silky Terrier","Австралийский шелковистый терьер","Австралійський шовковистий тер'єр",["silky terrier"]],
["australian-terrier","Australian Terrier","Австралийский терьер","Австралійський тер'єр",[]],

["basenji","Basenji","Басенджи","Басенджі",[]],
["basset-hound","Basset Hound","Бассет-хаунд","Басет-гаунд",["basset"]],
["beagle","Beagle","Бигль","Бігль",[]],
["bearded-collie","Bearded Collie","Бородатый колли","Бородатий колі",["beardie"]],
["beauceron","Beauceron","Босерон","Босерон",[]],
["bedlington-terrier","Bedlington Terrier","Бедлингтон-терьер","Бедлінгтон-тер'єр",[]],
["belgian-laekenois","Belgian Laekenois","Бельгийская овчарка лакенуа","Бельгійська вівчарка лакенуа",["laekenois"]],
["belgian-malinois","Belgian Malinois","Бельгийская овчарка малинуа","Бельгійська вівчарка малінуа",["malinois","малинуа","малінуа"]],
["belgian-shepherd-groenendael","Belgian Shepherd Groenendael","Бельгийская овчарка грюнендаль","Бельгійська вівчарка грюнендаль",["groenendael"]],
["belgian-tervuren","Belgian Tervuren","Бельгийская овчарка тервюрен","Бельгійська вівчарка тервюрен",["tervuren"]],
["bergamasco-sheepdog","Bergamasco Sheepdog","Бергамская овчарка","Бергамська вівчарка",["bergamasco"]],
["berger-picard","Berger Picard","Пикардийская овчарка","Пікардійська вівчарка",["picardy shepherd"]],
["bernese-mountain-dog","Bernese Mountain Dog","Бернский зенненхунд","Бернський зенненхунд",["berner"]],
["bichon-frise","Bichon Frise","Бишон фризе","Бішон фрізе",["bichon"]],
["biewer-terrier","Biewer Terrier","Бивер-терьер","Бівер-тер'єр",["biewer yorkie"]],
["black-and-tan-coonhound","Black and Tan Coonhound","Черно-подпалый кунхаунд","Чорно-підпалий кунгаунд",[]],
["black-russian-terrier","Black Russian Terrier","Русский черный терьер","Російський чорний тер'єр",["black terrier"]],
["bloodhound","Bloodhound","Бладхаунд","Бладгаунд",[]],
["bluetick-coonhound","Bluetick Coonhound","Голубой крапчатый кунхаунд","Блакитний крапчастий кунгаунд",[]],
["boerboel","Boerboel","Бурбуль","Бурбуль",[]],
["bolognese","Bolognese","Болоньез","Болоньєз",[]],
["border-collie","Border Collie","Бордер-колли","Бордер-колі",["border"]],
["border-terrier","Border Terrier","Бордер-терьер","Бордер-тер'єр",[]],
["borzoi","Borzoi","Русская псовая борзая","Російський псовий хорт",["russian wolfhound"]],
["boston-terrier","Boston Terrier","Бостон-терьер","Бостон-тер'єр",[]],
["bouvier-des-flandres","Bouvier des Flandres","Фландрский бувье","Фландрський був'є",["bouvier"]],
["boxer","Boxer","Боксер","Боксер",[]],
["boykin-spaniel","Boykin Spaniel","Бойкин-спаниель","Бойкін-спанієль",[]],
["bracco-italiano","Bracco Italiano","Итальянский бракк","Італійський брак",[]],
["braque-dauvergne","Braque d'Auvergne","Овернский бракк","Овернський брак",[]],
["briard","Briard","Бриар","Бріар",[]],
["brittany","Brittany","Бретонский эпаньоль","Бретонський епаньоль",["brittany spaniel"]],
["brussels-griffon","Brussels Griffon","Брюссельский гриффон","Брюссельський гриффон",["griffon bruxellois"]],
["bull-terrier","Bull Terrier","Бультерьер","Бультер'єр",[]],
["bulldog","English Bulldog","Английский бульдог","Англійський бульдог",["bulldog"]],
["bullmastiff","Bullmastiff","Бульмастиф","Бульмастиф",[]],

["cairn-terrier","Cairn Terrier","Керн-терьер","Керн-тер'єр",[]],
["canaan-dog","Canaan Dog","Ханаанская собака","Ханаанський собака",[]],
["cane-corso","Cane Corso","Кане-корсо","Кане-корсо",["italian mastiff"]],
["cardigan-welsh-corgi","Cardigan Welsh Corgi","Вельш-корги кардиган","Вельш-коргі кардиган",["corgi cardigan"]],
["cavalier-king-charles-spaniel","Cavalier King Charles Spaniel","Кавалер-кинг-чарльз-спаниель","Кавалер-кінг-чарльз-спанієль",["cavalier"]],
["central-asian-shepherd","Central Asian Shepherd Dog","Среднеазиатская овчарка","Середньоазіатська вівчарка",["alabai","алабай"]],
["cesky-terrier","Cesky Terrier","Чешский терьер","Чеський тер'єр",[]],
["chesapeake-bay-retriever","Chesapeake Bay Retriever","Чесапик-бей-ретривер","Чесапік-бей-ретривер",["chessie"]],
["chihuahua","Chihuahua","Чихуахуа","Чихуахуа",["chi"]],
["chinese-crested","Chinese Crested","Китайская хохлатая собака","Китайський чубатий собака",["chinese crested dog"]],
["chinese-shar-pei","Chinese Shar-Pei","Шарпей","Шарпей",["shar pei","shar-pei"]],
["chinook","Chinook","Чинук","Чинук",[]],
["chow-chow","Chow Chow","Чау-чау","Чау-чау",["chow"]],
["cirneco-dell-etna","Cirneco dell'Etna","Чирнеко дель Этна","Чирнеко дель Етна",["cirneco"]],
["clumber-spaniel","Clumber Spaniel","Кламбер-спаниель","Кламбер-спанієль",[]],
["cocker-spaniel","English Cocker Spaniel","Английский кокер-спаниель","Англійський кокер-спанієль",["cocker"]],
["collie-rough","Rough Collie","Длинношёрстный колли","Довгошерстий колі",["lassie","rough collie"]],
["collie-smooth","Smooth Collie","Короткошёрстный колли","Короткошерстий колі",["smooth collie"]],
["coton-de-tulear","Coton de Tulear","Котон-де-тулеар","Котон-де-тулеар",[]],
["curly-coated-retriever","Curly-Coated Retriever","Курчавошёрстный ретривер","Кучерявошерстий ретривер",[]],

["dachshund","Dachshund","Такса","Такса",["sausage dog","wiener dog"]],
["dalmatian","Dalmatian","Далматин","Далматин",[]],
["dandie-dinmont-terrier","Dandie Dinmont Terrier","Денди-динмонт-терьер","Денді-дінмонт-тер'єр",[]],
["dobermann","Dobermann","Доберман","Доберман",["doberman pinscher","doberman"]],
["dogo-argentino","Dogo Argentino","Аргентинский дог","Аргентинський дог",["argentine mastiff"]],
["dogue-de-bordeaux","Dogue de Bordeaux","Бордоский дог","Бордоський дог",["french mastiff"]],
["dutch-shepherd","Dutch Shepherd","Голландская овчарка","Голландська вівчарка",[]],

["english-foxhound","English Foxhound","Английский фоксхаунд","Англійський фоксгаунд",[]],
["english-mastiff","Mastiff","Английский мастиф","Англійський мастиф",["english mastiff"]],
["english-setter","English Setter","Английский сеттер","Англійський сетер",[]],
["english-springer-spaniel","English Springer Spaniel","Английский спрингер-спаниель","Англійський спрингер-спанієль",["springer"]],
["english-toy-terrier","English Toy Terrier","Английский той-терьер","Англійський той-тер'єр",[]],
["entlebucher-mountain-dog","Entlebucher Mountain Dog","Энтлебухер зенненхунд","Ентлебухер зенненхунд",[]],

["field-spaniel","Field Spaniel","Филд-спаниель","Філд-спанієль",[]],
["finnish-lapphund","Finnish Lapphund","Финский лаппхунд","Фінський лапхунд",[]],
["finnish-spitz","Finnish Spitz","Финский шпиц","Фінський шпіц",[]],
["flat-coated-retriever","Flat-Coated Retriever","Прямошёрстный ретривер","Прямошерстий ретривер",["flatcoat"]],
["french-bulldog","French Bulldog","Французский бульдог","Французький бульдог",["frenchie","француз","френч"]],

["german-pinscher","German Pinscher","Немецкий пинчер","Німецький пінчер",[]],
["german-shepherd","German Shepherd Dog","Немецкая овчарка","Німецька вівчарка",["german shepherd","gsd","alsatian"]],
["german-shorthaired-pointer","German Shorthaired Pointer","Немецкий курцхаар","Німецький курцхаар",["gsp","kurzhaar"]],
["german-spitz","German Spitz","Немецкий шпиц","Німецький шпіц",[]],
["german-wirehaired-pointer","German Wirehaired Pointer","Немецкий дратхаар","Німецький дратхаар",["gwp","drahthaar"]],
["giant-schnauzer","Giant Schnauzer","Ризеншнауцер","Різеншнауцер",[]],
["glen-of-imaal-terrier","Glen of Imaal Terrier","Глен-оф-имаал-терьер","Глен-оф-Імаал-тер'єр",[]],
["golden-retriever","Golden Retriever","Золотистый ретривер","Золотистий ретривер",["golden"]],
["gordon-setter","Gordon Setter","Шотландский сеттер","Шотландський сетер",[]],
["great-dane","Great Dane","Немецкий дог","Німецький дог",["danish dog"]],
["great-pyrenees","Great Pyrenees","Пиренейская горная собака","Піренейський гірський собака",["pyrenean mountain dog"]],
["greater-swiss-mountain-dog","Greater Swiss Mountain Dog","Большой швейцарский зенненхунд","Великий швейцарський зенненхунд",["swissy"]],
["greyhound","Greyhound","Грейхаунд","Грейгаунд",["english greyhound"]],

["havanese","Havanese","Гаванский бишон","Гаванський бішон",["havana silk dog"]],
["hovawart","Hovawart","Ховаварт","Ховаварт",[]],

["ibizan-hound","Ibizan Hound","Ивисская борзая","Івісський хорт",["podenco ibicenco"]],
["icelandic-sheepdog","Icelandic Sheepdog","Исландская овчарка","Ісландська вівчарка",[]],
["irish-red-and-white-setter","Irish Red and White Setter","Ирландский красно-белый сеттер","Ірландський червоно-білий сетер",[]],
["irish-setter","Irish Setter","Ирландский сеттер","Ірландський сетер",["red setter"]],
["irish-terrier","Irish Terrier","Ирландский терьер","Ірландський тер'єр",[]],
["irish-water-spaniel","Irish Water Spaniel","Ирландский водяной спаниель","Ірландський водяний спанієль",[]],
["irish-wolfhound","Irish Wolfhound","Ирландский волкодав","Ірландський вовкодав",[]],
["italian-greyhound","Italian Greyhound","Левретка","Левретка",["iggy","piccolo levriero italiano"]],

["jack-russell-terrier","Jack Russell Terrier","Джек-рассел-терьер","Джек-рассел-тер'єр",["jack russell","jrt"]],
["japanese-chin","Japanese Chin","Японский хин","Японський хін",[]],
["japanese-spitz","Japanese Spitz","Японский шпиц","Японський шпіц",[]],

["keeshond","Keeshond","Кеесхонд","Кеесхонд",["wolfspitz"]],
["kerry-blue-terrier","Kerry Blue Terrier","Керри-блю-терьер","Керрі-блю-тер'єр",[]],
["king-charles-spaniel","King Charles Spaniel","Кинг-чарльз-спаниель","Кінг-чарльз-спанієль",["english toy spaniel"]],
["komondor","Komondor","Комондор","Комондор",[]],
["kooikerhondje","Nederlandse Kooikerhondje","Коикерхондье","Койкерхонд'є",["kooiker"]],
["korean-jindo","Korean Jindo","Корейский чиндо","Корейський джиндо",["jindo"]],
["kuvasz","Kuvasz","Кувас","Кувас",[]],

["labrador-retriever","Labrador Retriever","Лабрадор-ретривер","Лабрадор-ретривер",["labrador","lab"]],
["lagotto-romagnolo","Lagotto Romagnolo","Лаготто-романьоло","Лаготто-романьоло",["lagotto"]],
["lakeland-terrier","Lakeland Terrier","Лейкленд-терьер","Лейкленд-тер'єр",[]],
["leonberger","Leonberger","Леонбергер","Леонбергер",[]],
["lhasa-apso","Lhasa Apso","Лхаса апсо","Лхаса апсо",[]],
["lowchen","Lowchen","Лёвхен","Левхен",["little lion dog"]],

["maltese","Maltese","Мальтийская болонка","Мальтійська болонка",["maltese dog"]],
["manchester-terrier","Manchester Terrier","Манчестер-терьер","Манчестер-тер'єр",[]],
["miniature-american-shepherd","Miniature American Shepherd","Миниатюрная американская овчарка","Мініатюрна американська вівчарка",["mini aussie"]],
["miniature-bull-terrier","Miniature Bull Terrier","Миниатюрный бультерьер","Мініатюрний бультер'єр",[]],
["miniature-pinscher","Miniature Pinscher","Цвергпинчер","Цвергпінчер",["min pin"]],
["miniature-schnauzer","Miniature Schnauzer","Цвергшнауцер","Цвергшнауцер",[]],

["neapolitan-mastiff","Neapolitan Mastiff","Неаполитанский мастиф","Неаполітанський мастиф",["mastino napoletano"]],
["newfoundland","Newfoundland","Ньюфаундленд","Ньюфаундленд",["newfie"]],
["norfolk-terrier","Norfolk Terrier","Норфолк-терьер","Норфолк-тер'єр",[]],
["norwegian-buhund","Norwegian Buhund","Норвежский бухунд","Норвезький бухунд",[]],
["norwegian-elkhound","Norwegian Elkhound","Норвежский элкхунд","Норвезький елкгаунд",[]],
["norwegian-lundehund","Norwegian Lundehund","Норвежский лундехунд","Норвезький лундехунд",[]],
["norwich-terrier","Norwich Terrier","Норвич-терьер","Норвіч-тер'єр",[]],
["nova-scotia-duck-tolling-retriever","Nova Scotia Duck Tolling Retriever","Новошотландский ретривер","Новошотландський ретривер",["toller"]],

["old-english-sheepdog","Old English Sheepdog","Староанглийская овчарка","Староанглійська вівчарка",["bobtail"]],
["otterhound","Otterhound","Оттерхаунд","Оттергаунд",[]],

["papillon","Papillon","Папильон","Папільйон",["continental toy spaniel"]],
["parson-russell-terrier","Parson Russell Terrier","Парсон-рассел-терьер","Парсон-рассел-тер'єр",["parson russell"]],
["pekingese","Pekingese","Пекинес","Пекінес",[]],
["pembroke-welsh-corgi","Pembroke Welsh Corgi","Вельш-корги пемброк","Вельш-коргі пемброк",["corgi","pembroke"]],
["peruvian-hairless-dog","Peruvian Hairless Dog","Перуанская голая собака","Перуанський голий собака",[]],
["petit-basset-griffon-vendeen","Petit Basset Griffon Vendéen","Малый вандейский бассет-гриффон","Малий вандейський басет-грифон",["pbgv"]],
["pharaoh-hound","Pharaoh Hound","Фараонова собака","Фараонів собака",[]],
["pointer","English Pointer","Английский пойнтер","Англійський пойнтер",["pointer"]],
["polish-lowland-sheepdog","Polish Lowland Sheepdog","Польская низинная овчарка","Польська низинна вівчарка",["pon"]],
["pomeranian","Pomeranian","Померанский шпиц","Померанський шпіц",["pomeranian spitz","pom","померанец","померанський"]],
["poodle-standard","Standard Poodle","Большой пудель","Великий пудель",["poodle"]],
["poodle-miniature","Miniature Poodle","Малый пудель","Малий пудель",["mini poodle"]],
["poodle-toy","Toy Poodle","Той-пудель","Той-пудель",["toy poodle"]],
["portuguese-podengo","Portuguese Podengo","Португальский поденгу","Португальський поденгу",[]],
["portuguese-water-dog","Portuguese Water Dog","Португальская водяная собака","Португальський водяний собака",["pwd"]],
["pug","Pug","Мопс","Мопс",[]],
["puli","Puli","Пули","Пулі",[]],
["pumi","Pumi","Пуми","Пумі",[]],
["pyrenean-shepherd","Pyrenean Shepherd","Пиренейская овчарка","Піренейська вівчарка",[]],

["rat-terrier","Rat Terrier","Рэт-терьер","Рет-тер'єр",[]],
["redbone-coonhound","Redbone Coonhound","Красный кунхаунд","Червоний кунгаунд",[]],
["rhodesian-ridgeback","Rhodesian Ridgeback","Родезийский риджбек","Родезійський риджбек",["ridgeback"]],
["rottweiler","Rottweiler","Ротвейлер","Ротвейлер",[]],
["russian-toy","Russian Toy","Русский той","Російський той",["russian toy terrier"]],

["saint-bernard","Saint Bernard","Сенбернар","Сенбернар",["st bernard"]],
["saluki","Saluki","Салюки","Салюкі",["persian greyhound"]],
["samoyed","Samoyed","Самоед","Самоїд",["samoyed dog","sammy"]],
["schipperke","Schipperke","Шипперке","Шипперке",[]],
["scottish-deerhound","Scottish Deerhound","Шотландская оленья борзая","Шотландський оленячий хорт",["deerhound"]],
["scottish-terrier","Scottish Terrier","Скотч-терьер","Скотч-тер'єр",["scottie"]],
["sealyham-terrier","Sealyham Terrier","Силихем-терьер","Сіліхем-тер'єр",[]],
["shetland-sheepdog","Shetland Sheepdog","Шелти","Шелті",["sheltie"]],
["shiba-inu","Shiba Inu","Сиба-ину","Шіба-іну",["shiba"]],
["shih-tzu","Shih Tzu","Ши-тцу","Ши-тцу",["shih tzu"]],
["siberian-husky","Siberian Husky","Сибирский хаски","Сибірський хаскі",["husky"]],
["soft-coated-wheaten-terrier","Soft Coated Wheaten Terrier","Ирландский мягкошёрстный пшеничный терьер","Ірландський м'якошерстий пшеничний тер'єр",["wheaten terrier"]],
["spanish-water-dog","Spanish Water Dog","Испанская водяная собака","Іспанський водяний собака",[]],
["staffordshire-bull-terrier","Staffordshire Bull Terrier","Стаффордширский бультерьер","Стаффордширський бультер'єр",["staffy","staffie"]],
["standard-schnauzer","Standard Schnauzer","Миттельшнауцер","Міттельшнауцер",[]],
["sussex-spaniel","Sussex Spaniel","Суссекс-спаниель","Сассекс-спанієль",[]],
["swedish-vallhund","Swedish Vallhund","Шведский вальхунд","Шведський вальхунд",[]],

["tibetan-mastiff","Tibetan Mastiff","Тибетский мастиф","Тибетський мастиф",[]],
["tibetan-spaniel","Tibetan Spaniel","Тибетский спаниель","Тибетський спанієль",[]],
["tibetan-terrier","Tibetan Terrier","Тибетский терьер","Тибетський тер'єр",[]],
["toy-fox-terrier","Toy Fox Terrier","Той-фокстерьер","Той-фокстер'єр",[]],
["treeing-walker-coonhound","Treeing Walker Coonhound","Кунхаунд Уокера","Кунгаунд Вокера",[]],

["vizsla","Vizsla","Венгерская выжла","Угорська вижла",["hungarian vizsla"]],
["weimaraner","Weimaraner","Веймаранер","Веймаранер",["weim"]],
["welsh-springer-spaniel","Welsh Springer Spaniel","Вельш-спрингер-спаниель","Вельш-спрингер-спанієль",[]],
["welsh-terrier","Welsh Terrier","Вельш-терьер","Вельш-тер'єр",[]],
["west-highland-white-terrier","West Highland White Terrier","Вест-хайленд-уайт-терьер","Вест-хайленд-вайт-тер'єр",["westie"]],
["whippet","Whippet","Уиппет","Віппет",[]],
["white-swiss-shepherd","White Swiss Shepherd Dog","Белая швейцарская овчарка","Біла швейцарська вівчарка",["berger blanc suisse"]],
["wire-fox-terrier","Wire Fox Terrier","Жесткошёрстный фокстерьер","Жорсткошерстий фокстер'єр",[]],

["xoloitzcuintli","Xoloitzcuintli","Ксолоитцкуинтли","Ксолоітцкуінтлі",["xolo","mexican hairless dog"]],

["yorkshire-terrier","Yorkshire Terrier","Йоркширский терьер","Йоркширський тер'єр",["yorkie","йорк","йорки"]]

];

const CATS = [

["abyssinian","Abyssinian","Абиссинская","Абіссінська",["aby"]],
["aegean","Aegean","Эгейская","Егейська",[]],
["american-bobtail","American Bobtail","Американский бобтейл","Американський бобтейл",[]],
["american-curl","American Curl","Американский керл","Американський керл",[]],
["american-shorthair","American Shorthair","Американская короткошёрстная","Американська короткошерста",[]],
["american-wirehair","American Wirehair","Американская жесткошёрстная","Американська жорсткошерста",[]],
["aphrodite","Aphrodite Giant","Афродита","Афродіта",[]],
["arabian-mau","Arabian Mau","Аравийский мау","Аравійський мау",[]],
["asian","Asian Cat","Азиатская","Азійська",[]],
["australian-mist","Australian Mist","Австралийский мист","Австралійський міст",[]],

["balinese","Balinese","Балинезийская","Балінезійська",[]],
["bambino","Bambino","Бамбино","Бамбіно",[]],
["bengal","Bengal","Бенгальская","Бенгальська",["bengal cat"]],
["birman","Birman","Бирманская","Бірманська",["sacred birman"]],
["bombay","Bombay","Бомбейская","Бомбейська",[]],
["brazilian-shorthair","Brazilian Shorthair","Бразильская короткошёрстная","Бразильська короткошерста",[]],
["british-longhair","British Longhair","Британская длинношёрстная","Британська довгошерста",[]],
["british-shorthair","British Shorthair","Британская короткошёрстная","Британська короткошерста",["british blue","британец"]],

["burmese","Burmese","Бурманская","Бурманська",[]],
["burmilla","Burmilla","Бурмилла","Бурміла",[]],

["chartreux","Chartreux","Шартрез","Шартрез",[]],
["chausie","Chausie","Чаузи","Чаузі",[]],
["colorpoint-shorthair","Colorpoint Shorthair","Колорпойнт короткошёрстный","Колорпойнт короткошерстий",[]],
["cornish-rex","Cornish Rex","Корниш-рекс","Корніш-рекс",[]],
["cymric","Cymric","Кимрик","Кімрик",[]],

["devon-rex","Devon Rex","Девон-рекс","Девон-рекс",[]],
["don-sphynx","Donskoy","Донской сфинкс","Донський сфінкс",["don sphynx","donskoy"]],

["egyptian-mau","Egyptian Mau","Египетская мау","Єгипетська мау",[]],
["european-shorthair","European Shorthair","Европейская короткошёрстная","Європейська короткошерста",["celtic shorthair"]],
["exotic-shorthair","Exotic Shorthair","Экзотическая короткошёрстная","Екзотична короткошерста",["exotic"]],

["german-rex","German Rex","Немецкий рекс","Німецький рекс",[]],

["havana-brown","Havana Brown","Гавана браун","Гавана браун",[]],
["highlander","Highlander","Хайлендер","Хайлендер",[]],

["japanese-bobtail","Japanese Bobtail","Японский бобтейл","Японський бобтейл",[]],
["javanese","Javanese","Яванез","Яванез",[]],

["khao-manee","Khao Manee","Као-мани","Као-мані",[]],
["korat","Korat","Корат","Корат",[]],
["kurilian-bobtail","Kurilian Bobtail","Курильский бобтейл","Курильський бобтейл",[]],

["laperm","LaPerm","Лаперм","Лаперм",[]],
["lykoi","Lykoi","Ликой","Лікой",["werewolf cat"]],

["maine-coon","Maine Coon","Мейн-кун","Мейн-кун",["mainecoon"]],
["manx","Manx","Мэнкс","Менкс",[]],
["munchkin","Munchkin","Манчкин","Манчкін",[]],

["nebelung","Nebelung","Нибелунг","Нібелунг",[]],
["norwegian-forest","Norwegian Forest Cat","Норвежская лесная","Норвезька лісова",["wegie"]],

["ocicat","Ocicat","Оцикет","Оцикет",[]],
["oriental-longhair","Oriental Longhair","Ориентальная длинношёрстная","Орієнтальна довгошерста",[]],
["oriental-shorthair","Oriental Shorthair","Ориентальная короткошёрстная","Орієнтальна короткошерста",["oriental"]],

["persian","Persian","Персидская","Перська",["persian cat"]],
["peterbald","Peterbald","Петерболд","Петерболд",["petersburg sphynx"]],
["pixie-bob","Pixie-bob","Пиксибоб","Піксібоб",[]],

["ragamuffin","Ragamuffin","Рагамаффин","Рагамафін",[]],
["ragdoll","Ragdoll","Рэгдолл","Регдол",[]],
["russian-blue","Russian Blue","Русская голубая","Російська блакитна",[]],

["savannah","Savannah","Саванна","Саванна",[]],
["scottish-fold","Scottish Fold","Шотландская вислоухая","Шотландська висловуха",["scottish fold cat"]],
["scottish-straight","Scottish Straight","Шотландская прямоухая","Шотландська прямовуха",[]],
["selkirk-rex","Selkirk Rex","Селкирк-рекс","Селкірк-рекс",[]],
["serengeti","Serengeti","Серенгети","Серенгеті",[]],
["siamese","Siamese","Сиамская","Сіамська",[]],
["siberian","Siberian","Сибирская","Сибірська",["siberian cat"]],
["singapura","Singapura","Сингапура","Сінгапура",[]],
["snowshoe","Snowshoe","Сноу-шу","Сноу-шу",[]],
["somali","Somali","Сомалийская","Сомалійська",[]],
["sphynx","Sphynx","Канадский сфинкс","Канадський сфінкс",["canadian sphynx"]],

["thai","Thai","Тайская","Тайська",[]],
["tonkinese","Tonkinese","Тонкинская","Тонкінська",[]],
["toyger","Toyger","Тойгер","Тойгер",[]],
["turkish-angora","Turkish Angora","Турецкая ангора","Турецька ангора",[]],
["turkish-van","Turkish Van","Турецкий ван","Турецький ван",[]],

["ukrainian-levkoy","Ukrainian Levkoy","Украинский левкой","Український левкой",[]]

];

const HORSES = [

["akhal-teke","Akhal-Teke","Ахалтекинская","Ахалтекінська",["akhal teke"]],
["andalusian","Andalusian","Андалузская","Андалузька",["pura raza espanola","pre"]],
["appaloosa","Appaloosa","Аппалуза","Аппалуза",[]],
["arabian","Arabian Horse","Арабская","Арабська",["arabian"]],

["belgian-draft","Belgian Draft","Бельгийская тяжеловозная","Бельгійська ваговозна",["brabant"]],
["breton","Breton","Бретонская","Бретонська",[]],
["budyonny","Budyonny","Будённовская","Будьоннівська",[]],

["clydesdale","Clydesdale","Клейдесдаль","Клейдесдаль",[]],
["connemara","Connemara Pony","Коннемара","Коннемара",[]],
["criollo","Criollo","Криолло","Кріолло",[]],

["dales-pony","Dales Pony","Дейлс-пони","Дейлс-поні",[]],
["dartmoor-pony","Dartmoor Pony","Дартмурский пони","Дартмурський поні",[]],
["dutch-warmblood","Dutch Warmblood","Голландская теплокровная","Голландська теплокровна",["kwpn"]],

["exmoor-pony","Exmoor Pony","Эксмурский пони","Ексмурський поні",[]],

["falabella","Falabella","Фалабелла","Фалабелла",[]],
["fjord","Norwegian Fjord Horse","Норвежская фьордская","Норвезька фіордська",["fjord horse"]],
["friesian","Friesian","Фризская","Фризька",["friesian horse"]],

["gypsy-vanner","Gypsy Vanner","Ирландский коб","Ірландський коб",["irish cob","tinker"]],

["haflinger","Haflinger","Гафлингер","Гафлінгер",[]],
["hanoverian","Hanoverian","Ганноверская","Ганноверська",[]],
["holsteiner","Holsteiner","Голштинская","Голштинська",[]],

["icelandic-horse","Icelandic Horse","Исландская лошадь","Ісландський кінь",[]],
["irish-draught","Irish Draught","Ирландская упряжная","Ірландська ваговозна",[]],

["knabstrupper","Knabstrupper","Кнабструппер","Кнабструппер",[]],

["lipizzaner","Lipizzaner","Липицианская","Ліпіціанська",["lipizzan"]],
["lusitano","Lusitano","Лузитанская","Лузітанська",[]],

["marwari","Marwari","Марварская","Марварська",[]],
["morgan","Morgan","Морган","Морган",[]],
["mustang","Mustang","Мустанг","Мустанг",[]],

["new-forest-pony","New Forest Pony","Нью-Форест пони","Нью-Форест поні",[]],

["oldenburg","Oldenburg","Ольденбургская","Ольденбурзька",[]],
["orlov-trotter","Orlov Trotter","Орловский рысак","Орловський рисак",["orlov"]],

["paint-horse","American Paint Horse","Американский пейнтхорс","Американський пейнтхорс",["paint"]],
["paso-fino","Paso Fino","Пасо-фино","Пасо-фіно",[]],
["percheron","Percheron","Першерон","Першерон",[]],
["peruvian-paso","Peruvian Paso","Перуанский пасо","Перуанський пасо",[]],

["quarter-horse","American Quarter Horse","Американская четвертьмильная","Американський квотерхорс",["quarter horse","qh"]],

["saddlebred","American Saddlebred","Американская верховая","Американська верхова",["saddlebred"]],
["shire","Shire","Шайр","Шайр",[]],
["shetland-pony","Shetland Pony","Шетлендский пони","Шетландський поні",["shetland"]],
["standardbred","Standardbred","Американская стандартбредная","Американська стандартбредна",[]],
["suffolk-punch","Suffolk Punch","Суффолькская тяжеловозная","Суффолкська ваговозна",[]],

["tennessee-walking-horse","Tennessee Walking Horse","Теннессийская прогулочная","Теннессійський прогулянковий кінь",["tennessee walker"]],
["thoroughbred","Thoroughbred","Чистокровная верховая","Чистокровна верхова",["english thoroughbred"]],
["trakehner","Trakehner","Тракененская","Тракененська",[]],

["welsh-pony","Welsh Pony","Уэльский пони","Уельський поні",["welsh cob"]]

];

const BIRDS = [

["african-grey","African Grey Parrot","Жако","Жако",["african grey","grey parrot"]],
["amazon-parrot","Amazon Parrot","Амазон","Амазон",["amazon"]],
["budgerigar","Budgerigar","Волнистый попугай","Хвилястий папуга",["budgie","parakeet"]],
["caique","Caique","Каик","Каїк",[]],
["canary","Canary","Канарейка","Канарка",[]],
["cockatiel","Cockatiel","Корелла","Корела",["cockatiel parrot"]],
["cockatoo","Cockatoo","Какаду","Какаду",[]],
["conure","Conure","Конур","Конур",[]],
["dove","Dove","Голубь","Голуб",["pigeon"]],
["eclectus","Eclectus Parrot","Эклектус","Еклектус",[]],
["finch","Finch","Амадина / вьюрок","Амадина / в'юрок",["zebra finch"]],
["green-cheek-conure","Green-Cheeked Conure","Зеленощёкий пиррура","Зеленощокий піррура",["green cheek conure"]],
["lorikeet","Lorikeet","Лорикет","Лорікет",[]],
["lovebird","Lovebird","Неразлучник","Нерозлучник",[]],
["macaw","Macaw","Ара","Ара",[]],
["meyers-parrot","Meyer's Parrot","Попугай Мейера","Папуга Мейєра",[]],
["parrotlet","Parrotlet","Воробьиный попугай","Горобиний папуга",[]],
["pionus","Pionus Parrot","Пионус","Піонус",[]],
["poicephalus","Poicephalus Parrot","Длиннокрылый попугай","Довгокрилий папуга",[]],
["quaker-parrot","Quaker Parrot","Попугай-монах","Папуга-монах",["monk parakeet"]],
["rosella","Rosella","Розелла","Розела",[]],
["senegal-parrot","Senegal Parrot","Сенегальский попугай","Сенегальський папуга",[]],
["sun-conure","Sun Conure","Солнечная аратинга","Сонячна аратинга",[]]

];

const SMALL = [

["rabbit","Rabbit","Кролик","Кролик",["bunny"]],
["rabbit.holland-lop","Holland Lop","Голландский вислоухий кролик","Голландський висловухий кролик",[]],
["rabbit.mini-lop","Mini Lop","Мини-лоп","Міні-лоп",[]],
["rabbit.netherland-dwarf","Netherland Dwarf Rabbit","Нидерландский карликовый кролик","Нідерландський карликовий кролик",[]],
["rabbit.lionhead","Lionhead Rabbit","Львиноголовый кролик","Левоголовий кролик",[]],
["rabbit.rex","Rex Rabbit","Кролик рекс","Кролик рекс",[]],
["rabbit.mini-rex","Mini Rex","Мини-рекс","Міні-рекс",[]],
["rabbit.flemish-giant","Flemish Giant","Фландр","Фландр",[]],
["rabbit.english-lop","English Lop","Английский баран","Англійський баран",[]],
["rabbit.french-lop","French Lop","Французский баран","Французький баран",[]],
["rabbit.dutch","Dutch Rabbit","Голландский кролик","Голландський кролик",[]],
["rabbit.angora","Angora Rabbit","Ангорский кролик","Ангорський кролик",[]],

["guinea-pig","Guinea Pig","Морская свинка","Морська свинка",["cavy"]],
["guinea-pig.american","American Guinea Pig","Американская морская свинка","Американська морська свинка",[]],
["guinea-pig.abyssinian","Abyssinian Guinea Pig","Абиссинская морская свинка","Абіссінська морська свинка",[]],
["guinea-pig.peruvian","Peruvian Guinea Pig","Перуанская морская свинка","Перуанська морська свинка",[]],
["guinea-pig.sheltie","Sheltie Guinea Pig","Шелти морская свинка","Шелті морська свинка",[]],
["guinea-pig.skinny","Skinny Pig","Скинни","Скінні",[]],
["guinea-pig.teddy","Teddy Guinea Pig","Тедди морская свинка","Тедді морська свинка",[]],

["hamster","Hamster","Хомяк","Хом'як",[]],
["hamster.syrian","Syrian Hamster","Сирийский хомяк","Сирійський хом'як",["golden hamster"]],
["hamster.dwarf-campbell","Campbell's Dwarf Hamster","Хомяк Кэмпбелла","Хом'як Кемпбелла",[]],
["hamster.winter-white","Winter White Dwarf Hamster","Джунгарский хомяк","Джунгарський хом'як",["djungarian hamster"]],
["hamster.roborovski","Roborovski Hamster","Хомяк Роборовского","Хом'як Роборовського",[]],
["hamster.chinese","Chinese Hamster","Китайский хомяк","Китайський хом'як",[]],

["ferret","Ferret","Хорёк","Тхір",[]],
["chinchilla","Chinchilla","Шиншилла","Шиншила",[]],
["gerbil","Gerbil","Песчанка","Піщанка",[]],
["mouse","Fancy Mouse","Декоративная мышь","Декоративна миша",[]],
["rat","Fancy Rat","Декоративная крыса","Декоративний щур",[]],
["degu","Degu","Дегу","Дегу",[]],
["hedgehog","African Pygmy Hedgehog","Африканский карликовый ёж","Африканський карликовий їжак",["hedgehog"]],
["sugar-glider","Sugar Glider","Сахарный поссум","Цукровий посум",[]]

];

function normalizeRecord(type, row) {

return {
id: type + "." + row[0],
type,
name: row[1],
names: {
en: row[1],
ru: row[2],
uk: row[3]
},
aliases: Array.from(
new Set(
[
row[1],
row[2],
row[3],
...(row[4] || [])
]
.filter(Boolean)
.map(value => String(value).trim())
)
)
};

}

const catalog = {

dog: [
...SPECIAL.dog,
...DOGS.map(row => normalizeRecord("dog", row))
],

cat: [
...SPECIAL.cat,
...CATS.map(row => normalizeRecord("cat", row))
],

horse: [
...SPECIAL.horse,
...HORSES.map(row => normalizeRecord("horse", row))
],

bird: [
...SPECIAL.bird,
...BIRDS.map(row => normalizeRecord("bird", row))
],

small: [
...SPECIAL.small,
...SMALL.map(row => normalizeRecord("small", row))
]

};

function normalizeSearch(value) {

return String(value || "")
.toLocaleLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")
.replace(/[’'`]/g, "")
.replace(/[-_/]/g, " ")
.replace(/\s+/g, " ")
.trim();

}

function getDisplayName(item, language) {

if (!item) {
return "";
}

if (
item.names &&
item.names[language]
) {
return item.names[language];
}

if (
language === "ru" &&
item.ru
) {
return item.ru;
}

if (
language === "uk" &&
item.uk
) {
return item.uk;
}

return item.name || "";

}

function searchableValues(item) {

const values = [];

if (item.name) {
values.push(item.name);
}

if (item.ru) {
values.push(item.ru);
}

if (item.uk) {
values.push(item.uk);
}

if (item.names) {
Object.values(item.names).forEach(value => {
if (value) {
values.push(value);
}
});
}

if (Array.isArray(item.aliases)) {
values.push(...item.aliases);
}

return Array.from(
new Set(
values
.filter(Boolean)
.map(normalizeSearch)
)
);

}

function scoreItem(item, query) {

const q = normalizeSearch(query);

if (!q) {
return 1;
}

const values = searchableValues(item);

let score = 0;

for (const value of values) {

if (value === q) {
score = Math.max(score, 1000);
continue;
}

if (value.startsWith(q)) {
score = Math.max(score, 700);
continue;
}

const words = value.split(" ");

if (
words.some(word => word.startsWith(q))
) {
score = Math.max(score, 500);
continue;
}

if (value.includes(q)) {
score = Math.max(score, 300);
continue;
}

}

return score;

}

function getAll(type) {

if (!catalog[type]) {
return [];
}

return catalog[type].slice();

}

function findById(id) {

if (!id) {
return null;
}

for (const type of Object.keys(catalog)) {

const found = catalog[type].find(
item => item.id === id
);

if (found) {
return found;
}

}

return null;

}

function search(type, query, options) {

const config = {
language: "en",
limit: 40,
...(options || {})
};

if (!catalog[type]) {
return [];
}

const q = normalizeSearch(query);

const specialCount =
type === "dog" ? SPECIAL.dog.length :
type === "cat" ? SPECIAL.cat.length :
type === "horse" ? SPECIAL.horse.length :
type === "bird" ? SPECIAL.bird.length :
type === "small" ? SPECIAL.small.length :
0;

if (!q) {

return catalog[type]
.slice(0, config.limit)
.map(item => ({
...item,
displayName: getDisplayName(item, config.language)
}));

}

return catalog[type]
.map((item, index) => ({
item,
index,
score: scoreItem(item, q)
}))
.filter(result => result.score > 0)
.sort((a, b) => {

const aSpecial = a.index < specialCount;
const bSpecial = b.index < specialCount;

if (aSpecial && !bSpecial) {
return -1;
}

if (!aSpecial && bSpecial) {
return 1;
}

if (b.score !== a.score) {
return b.score - a.score;
}

return getDisplayName(
a.item,
config.language
).localeCompare(
getDisplayName(
b.item,
config.language
),
config.language
);

})
.slice(0, config.limit)
.map(result => ({
...result.item,
displayName: getDisplayName(
result.item,
config.language
)
}));

}

function isCompatible(type, breedId) {

if (!type || !breedId) {
return false;
}

return Boolean(
catalog[type] &&
catalog[type].some(
item => item.id === breedId
)
);

}

function getCounts() {

return Object.fromEntries(
Object.entries(catalog).map(
([type, items]) => [
type,
items.length
]
)
);

}

window.PETSDOGUE_PET_DATA = {

catalog,

getAll,

search,

findById,

getDisplayName,

isCompatible,

normalizeSearch,

getCounts

};

})();
