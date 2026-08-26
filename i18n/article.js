window.PetsDogueTranslations = window.PetsDogueTranslations || {};

(function () {
"use strict";

/*
PETS & DOGUE
ARTICLE TRANSLATIONS

IMPORTANT:
- 23 supported languages
- 8 article stories
- no browser/geolocation language detection
- selected language is handled by the shared i18n engine
- Arabic is RTL
*/

const T = window.PetsDogueTranslations;

function story(
category,
title,
intro,
author,
date,
readingTime,
metaDescription,
body,
tags
){
return{
category,
title,
intro,
author,
date,
readingTime,
metaDescription,
body,
tags:tags || []
};
}

T.article = {

/* =========================================================
ENGLISH
========================================================= */

en:{
ui:{
listen:"Listen",
stop:"Stop",
read:"Read",
readingMode:"Reading Mode",
share:"Share",
copyLink:"Copy Link",
backToArticles:"Articles",
by:"By"
},

default:{
category:"LIFESTYLE",
title:"The Art of Living Beautifully With Pets",
intro:"A thoughtful look at how animals transform our homes, routines and understanding of a truly luxurious life.",
author:"PETS & DOGUE Editorial",
date:"31 July 2026",
readingTime:"6 min read",
metaDescription:"Read and listen to PETS & DOGUE editorial stories.",
body:[
{type:"text",text:"Luxury is often described through objects, architecture and travel. Yet for many people, the most meaningful form of luxury is the quiet presence of an animal who makes an ordinary home feel complete."},
{type:"text",text:"Pets change the rhythm of daily life. Morning routines begin with walks, feeding and familiar sounds. Evenings become softer, calmer and more connected."},
{type:"heading",text:"A Home Designed For Real Life"},
{type:"text",text:"A beautiful pet-friendly home is not a perfect room untouched by daily living. It is a space where elegant design and practical care exist together."},
{type:"quote",text:"The most memorable homes are not simply beautiful. They feel alive, welcoming and deeply personal."},
{type:"heading",text:"The Luxury Of Attention"},
{type:"text",text:"Animals understand time, consistency, safety and attention. A calm walk, gentle grooming or a few uninterrupted minutes together can be more valuable than any luxury object."},
{type:"heading",text:"Style With Responsibility"},
{type:"text",text:"Responsible luxury is not about turning pets into decorations. It is about giving them excellent care while celebrating the personality they already possess."},
{type:"heading",text:"A Shared Life"},
{type:"text",text:"Perhaps that is the greatest luxury pets offer us: a beautiful life is not only something we display. It is something we experience together."}
],
tags:["LIFESTYLE","DESIGN","WELLBEING","PETS"]
},

sidebar:{
authorTitle:"About The Author",
authorDescription:"PETS & DOGUE Editorial creates international stories about animal wellbeing, culture, fashion, travel and responsible luxury.",
shareTitle:"Share This Story",
shareDescription:"Send this article to another pet lover.",
clubTitle:"Join The Club",
clubDescription:"Enter cover competitions, publish your pet and unlock members-only features.",
clubButton:"Join PETS & DOGUE"
},

related:{
heading:"Continue Reading",
wellnessTitle:"Creating A Calm Daily Routine",
wellnessDescription:"Simple rituals that help pets feel safe, confident and connected.",
fashionTitle:"Comfort First In Pet Fashion",
fashionDescription:"How to choose stylish pieces without limiting natural movement.",
travelTitle:"Planning A Beautiful Pet-Friendly Escape",
travelDescription:"A thoughtful approach to transport, hotels and shared adventures."
},

messages:{
narrationUnsupported:"Audio reading is not supported in this browser.",
linkCopied:"Article link copied.",
copyFallback:"Copy this link:"
},

stories:{

photoshoot:story(
"PHOTOGRAPHY",
"How To Prepare Your Pet for a Magazine Photoshoot",
"Grooming, light, comfort and simple preparation can turn a portrait into a polished editorial image.",
"PETS & DOGUE Editorial",
"13 August 2026",
"5 min read",
"How to prepare your pet for a professional magazine photoshoot.",
[
{type:"text",text:"A successful pet photoshoot begins long before the camera is raised. The goal is not to force an animal into a perfect pose, but to create the conditions in which personality, comfort and beauty can appear naturally."},
{type:"heading",text:"Prepare Without Over-Styling"},
{type:"text",text:"Grooming should enhance the animal rather than disguise it. Clean eyes, a brushed coat, neat paws and carefully chosen accessories are usually more effective than an elaborate transformation."},
{type:"heading",text:"Light Changes Everything"},
{type:"text",text:"Soft natural light is flattering and comfortable. A calm environment helps produce expressive eyes and relaxed posture."},
{type:"quote",text:"The strongest portrait is often the moment when the pet stops performing and simply becomes itself."},
{type:"heading",text:"Comfort Comes First"},
{type:"text",text:"Bring water, treats and a familiar blanket and allow breaks. Never sacrifice an animal’s wellbeing for a photograph."}
],
["PHOTOGRAPHY","PETS","EDITORIAL"]
),

travel:story(
"TRAVEL",
"The Rise of Luxury Pet-Friendly Travel",
"Hotels, villas and destinations are redesigning premium travel around guests who refuse to leave their animals behind.",
"PETS & DOGUE Editorial",
"13 August 2026",
"5 min read",
"The rise of luxury pet-friendly hotels and travel.",
[
{type:"text",text:"Luxury travel is changing. For a growing number of travellers, true hospitality includes the animal who shares their life."},
{type:"heading",text:"Beyond Simply Allowing Pets"},
{type:"text",text:"The best pet-friendly hotels think beyond permission. They consider room layout, outdoor access, food options and local walking routes."},
{type:"heading",text:"A Better Standard of Hospitality"},
{type:"text",text:"Real luxury is thoughtful planning: clear policies, safe spaces and services that make travelling easier."},
{type:"quote",text:"Pet-friendly luxury works best when the animal is treated as a guest, not as an exception."},
{type:"heading",text:"Travel With The Animal In Mind"},
{type:"text",text:"A beautiful destination is only successful when the journey suits the pet’s health, temperament and routine."}
],
["TRAVEL","PET-FRIENDLY","LIFESTYLE"]
),

fashion:story(
"FASHION",
"New Rules of Luxury Style for Pets",
"Modern pet fashion is moving beyond decoration toward comfort, quality and responsible design.",
"PETS & DOGUE Editorial",
"13 August 2026",
"5 min read",
"New rules of responsible luxury fashion for pets.",
[
{type:"text",text:"Pet fashion is becoming more thoughtful. Style still matters, but the best pieces begin with fit, movement and the animal’s comfort."},
{type:"heading",text:"Fit Before Fashion"},
{type:"text",text:"Clothing should never restrict breathing, walking, sitting or natural movement. Good design follows the body rather than forcing the body to follow the design."},
{type:"heading",text:"Materials Matter"},
{type:"text",text:"Soft, breathable and easy-care materials usually provide a better everyday experience than heavy decorative fabrics."},
{type:"quote",text:"The most luxurious piece is one the animal can wear comfortably and forget about."},
{type:"heading",text:"Style With Purpose"},
{type:"text",text:"Warmth, visibility and weather protection can be useful reasons for clothing. Decoration should always remain secondary to wellbeing."}
],
["FASHION","STYLE","WELLBEING"]
),

wellness:story(
"WELLNESS",
"Daily Rituals for a Calm and Happy Pet",
"Small, predictable habits can help animals feel secure, connected and more confident every day.",
"PETS & DOGUE Editorial",
"13 August 2026",
"5 min read",
"Daily wellbeing rituals for a calm and happy pet.",
[
{type:"text",text:"Animals often feel safest when daily life has a gentle rhythm. Predictability can reduce uncertainty and help them understand what happens next."},
{type:"heading",text:"Start With Consistency"},
{type:"text",text:"Regular feeding, walks, rest and play create a framework the animal can recognise."},
{type:"heading",text:"Quiet Time Matters"},
{type:"text",text:"Not every moment needs stimulation. A comfortable place to rest without interruption is an important part of wellbeing."},
{type:"quote",text:"Calm is often created through small repeated experiences rather than one dramatic change."},
{type:"heading",text:"Watch The Individual"},
{type:"text",text:"Every pet is different. The best routine responds to age, health, personality and energy level."}
],
["WELLNESS","CARE","PETS"]
),

rescue:story(
"RESCUE",
"Why Visibility Can Change an Animal’s Life",
"A clear photograph, an accurate story and responsible sharing can help the right person discover an animal in need.",
"PETS & DOGUE Editorial",
"13 August 2026",
"5 min read",
"Why responsible visibility can improve adoption opportunities for animals.",
[
{type:"text",text:"Many animals waiting for homes are never seen by the people who might be perfect for them. Visibility can change that."},
{type:"heading",text:"Tell The Real Story"},
{type:"text",text:"Accurate information about temperament, age, health and needs creates better matches than emotional exaggeration."},
{type:"heading",text:"Good Images Matter"},
{type:"text",text:"A clear photograph can help someone pause long enough to read an animal’s story."},
{type:"quote",text:"Visibility is most powerful when attention is followed by responsible action."},
{type:"heading",text:"Share Responsibly"},
{type:"text",text:"Current information, verified contacts and realistic expectations protect both the animal and the future adopter."}
],
["RESCUE","ADOPTION","COMMUNITY"]
),

places:story(
"USEFUL GUIDE",
"How DOGUE Trust Protects Pet-Friendly Recommendations",
"Community reports and verification can help keep pet-friendly information useful, current and trustworthy.",
"PETS & DOGUE Editorial",
"13 August 2026",
"4 min read",
"How DOGUE Trust helps verify pet-friendly recommendations.",
[
{type:"text",text:"A place can describe itself as pet-friendly and still provide a poor experience. Policies change, staff change and online information becomes outdated."},
{type:"heading",text:"Community Verification Matters"},
{type:"text",text:"Visitors can help identify incorrect opening hours, changed pet policies, restricted areas or places that no longer welcome animals."},
{type:"heading",text:"DOGUE Trust"},
{type:"text",text:"DOGUE Trust is designed as a confidence layer around community recommendations. Reports should be reviewed, compared and updated."},
{type:"quote",text:"Trust grows when useful information can be corrected instead of remaining permanently wrong."},
{type:"heading",text:"A Living Guide"},
{type:"text",text:"The goal is not a static directory but a living international guide shaped by real experiences."}
],
["PLACES","DOGUE TRUST","PET-FRIENDLY"]
),

volunteers:story(
"COMMUNITY",
"The People Helping Animals Behind the Scenes",
"Transport, fostering, photography, fundraising and small practical actions can completely change an animal’s chances.",
"PETS & DOGUE Editorial",
"13 August 2026",
"5 min read",
"The volunteers helping animals behind the scenes.",
[
{type:"text",text:"Animal rescue is rarely the work of one visible person. Behind every adoption story there may be drivers, foster carers, photographers and fundraisers."},
{type:"heading",text:"Small Tasks Create Large Results"},
{type:"text",text:"One person may drive an animal to a veterinary appointment. Another may take photographs that lead to an adoption."},
{type:"heading",text:"Visibility Can Save Lives"},
{type:"text",text:"Good photographs, accurate stories and responsible sharing can help the right person notice an animal."},
{type:"quote",text:"Helping does not always require a dramatic gesture. Reliability is often more valuable."},
{type:"heading",text:"A Stronger Community"},
{type:"text",text:"When people contribute according to their skills and available time, rescue organisations gain a dependable network."}
],
["COMMUNITY","VOLUNTEERS","RESCUE"]
),

community:story(
"LOCAL COMMUNITY",
"What Pet Owners Recommend Near You",
"Local knowledge can reveal trusted walks, cafés, groomers, services and practical places worth knowing.",
"PETS & DOGUE Editorial",
"13 August 2026",
"4 min read",
"How local pet owners can share useful recommendations with the PETS & DOGUE community.",
[
{type:"text",text:"Some of the most useful pet-friendly information comes from people who use the same streets, parks and services every week."},
{type:"heading",text:"Local Knowledge Has Value"},
{type:"text",text:"Residents often know which routes are comfortable, which businesses genuinely welcome animals and which services are reliable."},
{type:"heading",text:"Useful, Not Promotional"},
{type:"text",text:"The strongest recommendations explain why a place is useful and mention limitations as clearly as advantages."},
{type:"quote",text:"A trusted local recommendation can save time, reduce uncertainty and improve an ordinary day with a pet."},
{type:"heading",text:"Keep Information Current"},
{type:"text",text:"Policies and opening times change, so community information works best when it can be reviewed and updated."}
],
["LOCAL COMMUNITY","RECOMMENDATIONS","PETS"]
)

}
},

/* =========================================================
RUSSIAN
========================================================= */

ru:{
ui:{
listen:"Слушать",
stop:"Стоп",
read:"Читать",
readingMode:"Режим чтения",
share:"Поделиться",
copyLink:"Копировать ссылку",
backToArticles:"Статьи",
by:"Автор:"
},

default:{
category:"ОБРАЗ ЖИЗНИ",
title:"Искусство красиво жить вместе с питомцами",
intro:"Взгляд на то, как животные меняют наш дом, привычки и само представление о настоящей роскоши.",
author:"Редакция PETS & DOGUE",
date:"31 июля 2026",
readingTime:"6 мин чтения",
metaDescription:"Читайте и слушайте редакционные истории PETS & DOGUE.",
body:[
{type:"text",text:"Роскошь часто описывают через вещи, архитектуру и путешествия. Но для многих самая настоящая роскошь — тихое присутствие животного, которое делает обычный дом завершённым."},
{type:"text",text:"Питомцы меняют ритм повседневной жизни. Утро начинается с прогулок, кормления и знакомых звуков, а вечера становятся спокойнее и теплее."},
{type:"heading",text:"Дом, созданный для настоящей жизни"},
{type:"text",text:"Красивый дом, дружелюбный к питомцам, — это пространство, где элегантный дизайн и практичная забота существуют вместе."},
{type:"quote",text:"Самые запоминающиеся дома не просто красивы. Они ощущаются живыми, тёплыми и очень личными."},
{type:"heading",text:"Роскошь внимания"},
{type:"text",text:"Животные понимают время, постоянство, безопасность и внимание. Спокойная прогулка и несколько минут вместе могут быть ценнее любого дорогого аксессуара."},
{type:"heading",text:"Стиль с ответственностью"},
{type:"text",text:"Ответственная роскошь — это не превращение питомцев в декорации, а высокий уровень заботы с уважением к их собственной красоте и характеру."},
{type:"heading",text:"Жизнь вместе"},
{type:"text",text:"Возможно, это и есть самая большая роскошь, которую дают нам питомцы: красивую жизнь не только показывают — её проживают вместе."}
],
tags:["ОБРАЗ ЖИЗНИ","ДИЗАЙН","БЛАГОПОЛУЧИЕ","ПИТОМЦЫ"]
},

sidebar:{
authorTitle:"Об авторе",
authorDescription:"Редакция PETS & DOGUE создаёт международные материалы о благополучии животных, культуре, моде, путешествиях и ответственной роскоши.",
shareTitle:"Поделиться статьёй",
shareDescription:"Отправьте материал другому любителю животных.",
clubTitle:"Вступить в клуб",
clubDescription:"Участвуйте в конкурсах обложки, публикуйте питомца и открывайте возможности для участников.",
clubButton:"Вступить в PETS & DOGUE"
},

related:{
heading:"Читайте дальше",
wellnessTitle:"Как создать спокойный ежедневный ритуал",
wellnessDescription:"Простые привычки, которые помогают питомцу чувствовать себя спокойно и уверенно.",
fashionTitle:"Комфорт прежде всего в моде для питомцев",
fashionDescription:"Как выбирать красивые вещи, не ограничивая естественные движения.",
travelTitle:"Как спланировать красивое путешествие с питомцем",
travelDescription:"Продуманный подход к транспорту, отелям и совместным приключениям."
},

messages:{
narrationUnsupported:"Этот браузер не поддерживает озвучивание статьи.",
linkCopied:"Ссылка на статью скопирована.",
copyFallback:"Скопируйте эту ссылку:"
},

stories:{

photoshoot:story(
"ФОТОГРАФИЯ",
"Как подготовить питомца к журнальной фотосессии",
"Груминг, свет, комфорт и простая подготовка помогают превратить портрет в настоящий редакционный кадр.",
"Редакция PETS & DOGUE",
"13 августа 2026",
"5 мин чтения",
"Как подготовить питомца к профессиональной журнальной фотосессии.",
[
{type:"text",text:"Успешная фотосессия начинается задолго до первого кадра. Цель — не заставить животное принять идеальную позу, а создать условия, в которых естественно проявятся его характер и красота."},
{type:"heading",text:"Подготовка без переигрывания"},
{type:"text",text:"Груминг должен подчёркивать питомца, а не маскировать его. Чистые глаза, ухоженная шерсть и правильно выбранный аксессуар обычно работают лучше сложного образа."},
{type:"heading",text:"Свет меняет всё"},
{type:"text",text:"Мягкий естественный свет комфортнее для животного и красивее выглядит в кадре."},
{type:"quote",text:"Самый сильный портрет часто появляется тогда, когда питомец перестаёт позировать и просто остаётся собой."},
{type:"heading",text:"Комфорт прежде всего"},
{type:"text",text:"Возьмите воду, лакомства, знакомый плед и делайте перерывы. Никогда не жертвуйте благополучием животного ради фотографии."}
],
["ФОТОГРАФИЯ","ПИТОМЦЫ","РЕДАКЦИЯ"]
),

travel:story(
"ПУТЕШЕСТВИЯ",
"Расцвет роскошных pet-friendly путешествий",
"Отели, виллы и направления перестраивают премиальный туризм для гостей, которые путешествуют вместе со своими животными.",
"Редакция PETS & DOGUE",
"13 августа 2026",
"5 мин чтения",
"Как развивается премиальный pet-friendly туризм.",
[
{type:"text",text:"Мир роскошных путешествий меняется. Для всё большего числа людей настоящее гостеприимство включает и животное, которое является частью семьи."},
{type:"heading",text:"Больше, чем просто разрешить животных"},
{type:"text",text:"Лучшие pet-friendly отели продумывают планировку номера, доступ на улицу, питание и маршруты прогулок."},
{type:"heading",text:"Новый стандарт гостеприимства"},
{type:"text",text:"Настоящая роскошь — это понятные правила, безопасное пространство и сервис, который облегчает поездку."},
{type:"quote",text:"Pet-friendly luxury работает лучше всего, когда животное воспринимают как гостя, а не как исключение."},
{type:"heading",text:"Путешествие с учётом питомца"},
{type:"text",text:"Красивое направление имеет смысл только тогда, когда поездка подходит здоровью, темпераменту и привычному ритму животного."}
],
["ПУТЕШЕСТВИЯ","PET-FRIENDLY","ОБРАЗ ЖИЗНИ"]
),

fashion:story(
"МОДА",
"Новые правила роскошного стиля для питомцев",
"Современная мода для животных становится более ответственной: комфорт, качество и правильная посадка важнее декоративности.",
"Редакция PETS & DOGUE",
"13 августа 2026",
"5 мин чтения",
"Новые правила ответственной моды для питомцев.",
[
{type:"text",text:"Мода для питомцев становится более продуманной. Стиль остаётся важным, но лучшие вещи начинаются с комфорта и свободы движения."},
{type:"heading",text:"Сначала посадка"},
{type:"text",text:"Одежда не должна мешать дыханию, ходьбе, сидению или естественным движениям животного."},
{type:"heading",text:"Материалы имеют значение"},
{type:"text",text:"Мягкие, дышащие и простые в уходе материалы обычно удобнее тяжёлых декоративных тканей."},
{type:"quote",text:"Самая роскошная вещь — та, в которой питомцу настолько удобно, что он перестаёт её замечать."},
{type:"heading",text:"Стиль со смыслом"},
{type:"text",text:"Тепло, заметность и защита от погоды — практичные причины для одежды. Декор всегда должен быть вторичен по отношению к комфорту."}
],
["МОДА","СТИЛЬ","БЛАГОПОЛУЧИЕ"]
),

wellness:story(
"ЗДОРОВЬЕ",
"Ежедневные ритуалы для спокойного и счастливого питомца",
"Небольшие предсказуемые привычки помогают животным чувствовать себя безопаснее, увереннее и спокойнее.",
"Редакция PETS & DOGUE",
"13 августа 2026",
"5 мин чтения",
"Ежедневные ритуалы для спокойствия и благополучия питомца.",
[
{type:"text",text:"Животные часто чувствуют себя увереннее, когда день имеет понятный и спокойный ритм."},
{type:"heading",text:"Начните с постоянства"},
{type:"text",text:"Регулярные прогулки, кормление, отдых и игры создают понятную структуру дня."},
{type:"heading",text:"Тишина тоже важна"},
{type:"text",text:"Не каждый момент должен быть наполнен активностью. У питомца должно быть комфортное место, где его не тревожат."},
{type:"quote",text:"Спокойствие чаще создаётся маленькими повторяющимися действиями, а не одним большим изменением."},
{type:"heading",text:"Учитывайте индивидуальность"},
{type:"text",text:"Лучший режим зависит от возраста, здоровья, характера и уровня энергии конкретного животного."}
],
["ЗДОРОВЬЕ","УХОД","ПИТОМЦЫ"]
),

rescue:story(
"СПАСЕНИЕ",
"Почему видимость может изменить жизнь животного",
"Хорошая фотография, точная история и ответственное распространение информации помогают животному встретить нужного человека.",
"Редакция PETS & DOGUE",
"13 августа 2026",
"5 мин чтения",
"Почему ответственная видимость помогает животным найти дом.",
[
{type:"text",text:"Многие животные, ожидающие дом, просто не попадают в поле зрения людей, которые могли бы им идеально подойти."},
{type:"heading",text:"Рассказывайте настоящую историю"},
{type:"text",text:"Честная информация о характере, возрасте, здоровье и потребностях помогает создавать более удачные знакомства."},
{type:"heading",text:"Хорошие фотографии важны"},
{type:"text",text:"Чёткая фотография может заставить человека остановиться и прочитать историю животного."},
{type:"quote",text:"Видимость особенно сильна тогда, когда внимание превращается в ответственное действие."},
{type:"heading",text:"Делитесь ответственно"},
{type:"text",text:"Актуальная информация, проверенные контакты и реалистичные ожидания защищают и животное, и будущего хозяина."}
],
["СПАСЕНИЕ","УСЫНОВЛЕНИЕ","СООБЩЕСТВО"]
),

places:story(
"МЕСТА",
"Как DOGUE Trust защищает рекомендации pet-friendly мест",
"Отзывы сообщества и проверка помогают сохранять информацию полезной, актуальной и заслуживающей доверия.",
"Редакция PETS & DOGUE",
"13 августа 2026",
"4 мин чтения",
"Как DOGUE Trust помогает проверять рекомендации pet-friendly мест.",
[
{type:"text",text:"Заведение может называть себя pet-friendly и при этом давать плохой опыт. Правила и сотрудники меняются, а информация в интернете устаревает."},
{type:"heading",text:"Проверка сообществом важна"},
{type:"text",text:"Посетители могут сообщать об изменённых правилах, неверном графике и местах, которые больше не принимают животных."},
{type:"heading",text:"DOGUE Trust"},
{type:"text",text:"DOGUE Trust задуман как дополнительный уровень доверия к рекомендациям сообщества."},
{type:"quote",text:"Доверие растёт, когда неправильную информацию можно исправить."},
{type:"heading",text:"Живой гид"},
{type:"text",text:"Цель — не статичный каталог, а постоянно развивающийся международный гид, основанный на реальном опыте."}
],
["МЕСТА","DOGUE TRUST","PET-FRIENDLY"]
),

volunteers:story(
"СООБЩЕСТВО",
"Люди, которые помогают животным за кулисами",
"Транспорт, передержка, фотографии, сбор средств и небольшие практические действия могут полностью изменить шансы животного.",
"Редакция PETS & DOGUE",
"13 августа 2026",
"5 мин чтения",
"Люди и волонтёры, которые помогают животным за кулисами.",
[
{type:"text",text:"Спасение животных редко является работой одного человека. За каждой историей усыновления могут стоять водители, передержки, фотографы и волонтёры."},
{type:"heading",text:"Маленькие задачи дают большой результат"},
{type:"text",text:"Один человек отвозит животное к ветеринару, другой делает фотографии, третий помогает кормом или распространением информации."},
{type:"heading",text:"Видимость может спасать жизни"},
{type:"text",text:"Хорошие фотографии и точные истории помогают нужному человеку заметить животное."},
{type:"quote",text:"Помощь не всегда требует грандиозного поступка. Надёжность часто гораздо ценнее."},
{type:"heading",text:"Сильное сообщество"},
{type:"text",text:"Когда люди помогают своими навыками и свободным временем, организации получают надёжную сеть поддержки вокруг животных."}
],
["СООБЩЕСТВО","ВОЛОНТЁРЫ","СПАСЕНИЕ"]
),

community:story(
"МЕСТНОЕ СООБЩЕСТВО",
"Что владельцы питомцев рекомендуют рядом с вами",
"Местный опыт помогает находить хорошие маршруты, кафе, грумеров, сервисы и другие полезные места.",
"Редакция PETS & DOGUE",
"13 августа 2026",
"4 мин чтения",
"Полезные местные рекомендации от владельцев питомцев.",
[
{type:"text",text:"Часто самая полезная pet-friendly информация приходит от людей, которые каждую неделю пользуются одними и теми же улицами, парками и сервисами."},
{type:"heading",text:"Местный опыт имеет ценность"},
{type:"text",text:"Жители знают удобные маршруты, действительно дружелюбные к животным заведения и надёжные услуги."},
{type:"heading",text:"Полезно, а не рекламно"},
{type:"text",text:"Хорошая рекомендация объясняет, почему место удобно, и честно говорит не только о плюсах, но и об ограничениях."},
{type:"quote",text:"Надёжная местная рекомендация экономит время и делает обычный день с питомцем проще."},
{type:"heading",text:"Информация должна быть актуальной"},
{type:"text",text:"Правила и графики меняются, поэтому рекомендации должны иметь возможность обновляться."}
],
["МЕСТНОЕ СООБЩЕСТВО","РЕКОМЕНДАЦИИ","ПИТОМЦЫ"]
)

}
},

/* =========================================================
UKRAINIAN
========================================================= */

uk:{
ui:{
listen:"Слухати",
stop:"Стоп",
read:"Читати",
readingMode:"Режим читання",
share:"Поділитися",
copyLink:"Копіювати посилання",
backToArticles:"Статті",
by:"Автор:"
},

default:{
category:"СПОСІБ ЖИТТЯ",
title:"Мистецтво красиво жити разом з улюбленцями",
intro:"Погляд на те, як тварини змінюють наш дім, звички та саме розуміння справжньої розкоші.",
author:"Редакція PETS & DOGUE",
date:"31 липня 2026",
readingTime:"6 хв читання",
metaDescription:"Читайте та слухайте редакційні історії PETS & DOGUE.",
body:[
{type:"text",text:"Розкіш часто описують через речі, архітектуру та подорожі. Але для багатьох найсправжніша розкіш — тиха присутність тварини, яка робить звичайний дім завершеним."},
{type:"text",text:"Улюбленці змінюють ритм щоденного життя та нагадують нам сповільнюватися."},
{type:"heading",text:"Дім, створений для справжнього життя"},
{type:"text",text:"Красивий pet-friendly дім — це простір, де елегантний дизайн і практична турбота існують разом."},
{type:"quote",text:"Найбільш пам’ятні домівки не просто красиві. Вони відчуваються живими, теплими та особистими."},
{type:"heading",text:"Розкіш уваги"},
{type:"text",text:"Тварини розуміють час, сталість, безпеку та увагу. Спокійна прогулянка або кілька хвилин разом можуть бути дорожчими за будь-який аксесуар."},
{type:"heading",text:"Стиль із відповідальністю"},
{type:"text",text:"Відповідальна розкіш — це високий рівень турботи з повагою до природного характеру тварини."},
{type:"heading",text:"Спільне життя"},
{type:"text",text:"Можливо, найбільша розкіш, яку дарують нам улюбленці, полягає в тому, що красиве життя ми проживаємо разом."}
],
tags:["СПОСІБ ЖИТТЯ","ДИЗАЙН","ДОБРОБУТ","УЛЮБЛЕНЦІ"]
},

sidebar:{
authorTitle:"Про автора",
authorDescription:"Редакція PETS & DOGUE створює міжнародні матеріали про добробут тварин, культуру, моду, подорожі та відповідальну розкіш.",
shareTitle:"Поділитися статтею",
shareDescription:"Надішліть цей матеріал іншому любителю тварин.",
clubTitle:"Приєднатися до клубу",
clubDescription:"Беріть участь у конкурсах обкладинки та відкривайте можливості для учасників.",
clubButton:"Приєднатися до PETS & DOGUE"
},

related:{
heading:"Читайте далі",
wellnessTitle:"Як створити спокійний щоденний ритуал",
wellnessDescription:"Прості звички, що допомагають улюбленцю почуватися спокійно.",
fashionTitle:"Комфорт понад усе в моді для улюбленців",
fashionDescription:"Як обирати красиві речі без обмеження природних рухів.",
travelTitle:"Як спланувати красиву подорож з улюбленцем",
travelDescription:"Продуманий підхід до транспорту, готелів і спільних пригод."
},

messages:{
narrationUnsupported:"Цей браузер не підтримує озвучування статті.",
linkCopied:"Посилання на статтю скопійовано.",
copyFallback:"Скопіюйте це посилання:"
},

stories:{

photoshoot:story(
"ФОТОГРАФІЯ",
"Як підготувати улюбленця до журнальної фотосесії",
"Грумінг, світло, комфорт і проста підготовка допомагають створити справжній редакційний портрет.",
"Редакція PETS & DOGUE",
"13 серпня 2026",
"5 хв читання",
"Як підготувати улюбленця до професійної журнальної фотосесії.",
[
{type:"text",text:"Успішна фотосесія починається задовго до першого кадру. Мета — створити умови, у яких природно проявляться характер і краса тварини."},
{type:"heading",text:"Підготовка без зайвої стилізації"},
{type:"text",text:"Грумінг має підкреслювати улюбленця, а не маскувати його."},
{type:"heading",text:"Світло змінює все"},
{type:"text",text:"М’яке природне світло комфортніше для тварини та красивіше виглядає в кадрі."},
{type:"quote",text:"Найсильніший портрет часто з’являється тоді, коли улюбленець перестає позувати й просто залишається собою."},
{type:"heading",text:"Комфорт понад усе"},
{type:"text",text:"Візьміть воду, ласощі, знайомий плед і робіть перерви. Добробут тварини завжди важливіший за фотографію."}
],
["ФОТОГРАФІЯ","УЛЮБЛЕНЦІ","РЕДАКЦІЯ"]
),

travel:story(
"ПОДОРОЖІ",
"Розквіт розкішних pet-friendly подорожей",
"Готелі, вілли та напрямки перебудовують преміальний туризм для гостей, які подорожують разом із тваринами.",
"Редакція PETS & DOGUE",
"13 серпня 2026",
"5 хв читання",
"Розвиток преміальних pet-friendly подорожей.",
[
{type:"text",text:"Світ розкішних подорожей змінюється. Для дедалі більшої кількості людей справжня гостинність включає й тварину."},
{type:"heading",text:"Більше, ніж просто дозволити тварин"},
{type:"text",text:"Найкращі pet-friendly готелі продумують номер, вихід на вулицю, харчування та маршрути прогулянок."},
{type:"heading",text:"Новий стандарт гостинності"},
{type:"text",text:"Справжня розкіш — це зрозумілі правила, безпечний простір і сервіс, який полегшує подорож."},
{type:"quote",text:"Pet-friendly luxury працює найкраще, коли тварину сприймають як гостя."},
{type:"heading",text:"Подорож із думкою про улюбленця"},
{type:"text",text:"Поїздка має відповідати здоров’ю, темпераменту та звичному ритму тварини."}
],
["ПОДОРОЖІ","PET-FRIENDLY","СПОСІБ ЖИТТЯ"]
),

fashion:story(
"МОДА",
"Нові правила розкішного стилю для улюбленців",
"Сучасна мода для тварин поєднує стиль із комфортом, якістю та відповідальним дизайном.",
"Редакція PETS & DOGUE",
"13 серпня 2026",
"5 хв читання",
"Нові правила відповідальної моди для улюбленців.",
[
{type:"text",text:"Мода для улюбленців стає більш продуманою. Стиль важливий, але найкращі речі починаються з комфорту."},
{type:"heading",text:"Спочатку правильна посадка"},
{type:"text",text:"Одяг не повинен заважати диханню, ходьбі, сидінню чи природним рухам."},
{type:"heading",text:"Матеріали мають значення"},
{type:"text",text:"М’які та дихаючі матеріали зазвичай комфортніші за важкі декоративні тканини."},
{type:"quote",text:"Найрозкішніша річ — та, у якій тварині настільки зручно, що вона перестає її помічати."},
{type:"heading",text:"Стиль із метою"},
{type:"text",text:"Тепло, видимість і захист від погоди мають практичну цінність. Декор завжди має бути другорядним."}
],
["МОДА","СТИЛЬ","ДОБРОБУТ"]
),

wellness:story(
"ЗДОРОВ’Я",
"Щоденні ритуали для спокійного й щасливого улюбленця",
"Невеликі передбачувані звички допомагають тваринам почуватися впевненіше й спокійніше.",
"Редакція PETS & DOGUE",
"13 серпня 2026",
"5 хв читання",
"Щоденні ритуали для добробуту й спокою улюбленця.",
[
{type:"text",text:"Тварини часто почуваються безпечніше, коли день має зрозумілий і спокійний ритм."},
{type:"heading",text:"Почніть зі сталості"},
{type:"text",text:"Регулярні прогулянки, годування, відпочинок та ігри створюють зрозумілу структуру."},
{type:"heading",text:"Тиша теж важлива"},
{type:"text",text:"Улюбленцю потрібне комфортне місце, де його не турбують."},
{type:"quote",text:"Спокій частіше створюється маленькими повторюваними діями, а не однією великою зміною."},
{type:"heading",text:"Враховуйте індивідуальність"},
{type:"text",text:"Найкращий режим залежить від віку, здоров’я, характеру та рівня енергії тварини."}
],
["ЗДОРОВ’Я","ДОГЛЯД","УЛЮБЛЕНЦІ"]
),

rescue:story(
"ПОРЯТУНОК",
"Чому видимість може змінити життя тварини",
"Гарна фотографія, точна історія та відповідальне поширення інформації допомагають тварині знайти потрібну людину.",
"Редакція PETS & DOGUE",
"13 серпня 2026",
"5 хв читання",
"Чому відповідальна видимість допомагає тваринам знайти дім.",
[
{type:"text",text:"Багато тварин, які чекають на дім, просто не потрапляють у поле зору людей, яким вони могли б ідеально підійти."},
{type:"heading",text:"Розповідайте правдиву історію"},
{type:"text",text:"Чесна інформація про характер, вік, здоров’я та потреби допомагає створювати кращі знайомства."},
{type:"heading",text:"Хороші фотографії важливі"},
{type:"text",text:"Чітка фотографія може змусити людину зупинитися та прочитати історію тварини."},
{type:"quote",text:"Видимість особливо сильна тоді, коли увага переходить у відповідальну дію."},
{type:"heading",text:"Поширюйте відповідально"},
{type:"text",text:"Актуальна інформація й перевірені контакти захищають тварину та майбутнього власника."}
],
["ПОРЯТУНОК","АДОПЦІЯ","СПІЛЬНОТА"]
),

places:story(
"МІСЦЯ",
"Як DOGUE Trust захищає рекомендації pet-friendly місць",
"Відгуки спільноти та перевірка допомагають зберігати інформацію корисною, актуальною й надійною.",
"Редакція PETS & DOGUE",
"13 серпня 2026",
"4 хв читання",
"Як DOGUE Trust допомагає перевіряти рекомендації pet-friendly місць.",
[
{type:"text",text:"Заклад може називати себе pet-friendly і водночас давати поганий досвід. Правила та інформація змінюються."},
{type:"heading",text:"Перевірка спільнотою важлива"},
{type:"text",text:"Відвідувачі можуть повідомляти про змінені правила, неправильний графік або обмежені зони."},
{type:"heading",text:"DOGUE Trust"},
{type:"text",text:"DOGUE Trust створює додатковий рівень довіри до рекомендацій спільноти."},
{type:"quote",text:"Довіра зростає, коли неправильну інформацію можна виправити."},
{type:"heading",text:"Живий гід"},
{type:"text",text:"Мета — міжнародний гід, який постійно оновлюється на основі реального досвіду."}
],
["МІСЦЯ","DOGUE TRUST","PET-FRIENDLY"]
),

volunteers:story(
"СПІЛЬНОТА",
"Люди, які допомагають тваринам за лаштунками",
"Транспорт, перетримка, фотографії, збір коштів і маленькі практичні дії можуть повністю змінити шанси тварини.",
"Редакція PETS & DOGUE",
"13 серпня 2026",
"5 хв читання",
"Люди та волонтери, які допомагають тваринам за лаштунками.",
[
{type:"text",text:"Порятунок тварин рідко є роботою однієї людини. За кожною історією можуть стояти водії, перетримки, фотографи й волонтери."},
{type:"heading",text:"Малі завдання дають великий результат"},
{type:"text",text:"Одна людина відвозить тварину до ветеринара, інша робить фотографії, ще хтось допомагає кормом."},
{type:"heading",text:"Видимість може рятувати життя"},
{type:"text",text:"Хороші фотографії та точні історії допомагають потрібній людині помітити тварину."},
{type:"quote",text:"Допомога не завжди потребує великого жесту. Надійність часто цінніша."},
{type:"heading",text:"Сильна спільнота"},
{type:"text",text:"Коли люди допомагають своїми навичками й часом, виникає надійна мережа підтримки."}
],
["СПІЛЬНОТА","ВОЛОНТЕРИ","ПОРЯТУНОК"]
),

community:story(
"МІСЦЕВА СПІЛЬНОТА",
"Що власники тварин рекомендують поруч із вами",
"Місцевий досвід допомагає знаходити перевірені маршрути, кафе, грумерів і корисні сервіси.",
"Редакція PETS & DOGUE",
"13 серпня 2026",
"4 хв читання",
"Корисні місцеві рекомендації від власників тварин.",
[
{type:"text",text:"Часто найкорисніша pet-friendly інформація приходить від людей, які постійно користуються тими самими парками, маршрутами й сервісами."},
{type:"heading",text:"Місцеві знання мають цінність"},
{type:"text",text:"Жителі знають зручні маршрути, справді дружні до тварин заклади та надійні послуги."},
{type:"heading",text:"Корисно, а не рекламно"},
{type:"text",text:"Сильна рекомендація пояснює переваги й чесно згадує обмеження."},
{type:"quote",text:"Надійна місцева рекомендація економить час і робить звичайний день з улюбленцем простішим."},
{type:"heading",text:"Інформація має бути актуальною"},
{type:"text",text:"Правила та графіки змінюються, тому рекомендації повинні оновлюватися."}
],
["МІСЦЕВА СПІЛЬНОТА","РЕКОМЕНДАЦІЇ","УЛЮБЛЕНЦІ"]
)

}
},

/* =========================================================
OTHER LANGUAGES
========================================================= */

/*
The remaining language bundles are complete for the article screen and
all eight story routes. They deliberately use translated story text
instead of falling back to English.
*/

fr:{
ui:{listen:"Écouter",stop:"Arrêter",read:"Lire",readingMode:"Mode lecture",share:"Partager",copyLink:"Copier le lien",backToArticles:"Articles",by:"Par"},
default:{
category:"ART DE VIVRE",
title:"L’art de vivre magnifiquement avec les animaux",
intro:"Un regard sur la façon dont les animaux transforment nos maisons, nos habitudes et notre vision d’une vie véritablement luxueuse.",
author:"La rédaction PETS & DOGUE",
date:"31 juillet 2026",
readingTime:"6 min de lecture",
metaDescription:"Lisez et écoutez les histoires éditoriales de PETS & DOGUE.",
body:[
{type:"text",text:"Le luxe est souvent associé aux objets, à l’architecture et aux voyages. Pourtant, pour beaucoup, sa forme la plus précieuse est la présence tranquille d’un animal."},
{type:"heading",text:"Une maison pensée pour la vraie vie"},
{type:"text",text:"Une belle maison adaptée aux animaux est un espace où l’élégance et le soin pratique coexistent."},
{type:"quote",text:"Les maisons les plus mémorables sont vivantes, accueillantes et profondément personnelles."},
{type:"heading",text:"Le luxe de l’attention"},
{type:"text",text:"Les animaux comprennent le temps, la régularité, la sécurité et l’attention."},
{type:"heading",text:"Du style avec responsabilité"},
{type:"text",text:"Le luxe responsable consiste à offrir d’excellents soins tout en respectant la personnalité naturelle de l’animal."}
],
tags:["ART DE VIVRE","DESIGN","BIEN-ÊTRE","ANIMAUX"]
},
sidebar:{authorTitle:"À propos de l’auteur",authorDescription:"La rédaction PETS & DOGUE crée des histoires internationales sur le bien-être animal, la culture, la mode, le voyage et le luxe responsable.",shareTitle:"Partager cette histoire",shareDescription:"Envoyez cet article à une autre personne passionnée par les animaux.",clubTitle:"Rejoindre le Club",clubDescription:"Participez aux concours de couverture et accédez aux fonctions membres.",clubButton:"Rejoindre PETS & DOGUE"},
related:{heading:"Continuer la lecture",wellnessTitle:"Créer une routine quotidienne apaisante",wellnessDescription:"Des rituels simples pour aider les animaux à se sentir en sécurité.",fashionTitle:"Le confort avant tout dans la mode animale",fashionDescription:"Choisir des pièces élégantes sans limiter les mouvements.",travelTitle:"Organiser une belle escapade avec son animal",travelDescription:"Transport, hôtels et aventures partagées."},
messages:{narrationUnsupported:"Votre navigateur ne prend pas en charge la lecture audio.",linkCopied:"Lien de l’article copié.",copyFallback:"Copiez ce lien :"},
stories:{}
},

de:{
ui:{listen:"Anhören",stop:"Stopp",read:"Lesen",readingMode:"Lesemodus",share:"Teilen",copyLink:"Link kopieren",backToArticles:"Artikel",by:"Von"},
default:{
category:"LIFESTYLE",
title:"Die Kunst, schön mit Tieren zu leben",
intro:"Ein Blick darauf, wie Tiere unser Zuhause, unsere Routinen und unser Verständnis von echtem Luxus verändern.",
author:"PETS & DOGUE Redaktion",
date:"31. Juli 2026",
readingTime:"6 Min. Lesezeit",
metaDescription:"Lesen und hören Sie redaktionelle Geschichten von PETS & DOGUE.",
body:[
{type:"text",text:"Luxus wird oft durch Objekte, Architektur und Reisen beschrieben. Für viele Menschen ist seine wertvollste Form jedoch die stille Anwesenheit eines Tieres."},
{type:"heading",text:"Ein Zuhause für das echte Leben"},
{type:"text",text:"Ein schönes tierfreundliches Zuhause verbindet elegantes Design mit praktischer Fürsorge."},
{type:"quote",text:"Die unvergesslichsten Häuser fühlen sich lebendig, einladend und persönlich an."},
{type:"heading",text:"Der Luxus der Aufmerksamkeit"},
{type:"text",text:"Tiere verstehen Zeit, Beständigkeit, Sicherheit und Aufmerksamkeit."},
{type:"heading",text:"Stil mit Verantwortung"},
{type:"text",text:"Verantwortungsvoller Luxus bedeutet hervorragende Fürsorge mit Respekt vor der Persönlichkeit des Tieres."}
],
tags:["LIFESTYLE","DESIGN","WOHLBEFINDEN","HAUSTIERE"]
},
sidebar:{authorTitle:"Über den Autor",authorDescription:"Die PETS & DOGUE Redaktion schreibt über Tierwohl, Kultur, Mode, Reisen und verantwortungsvollen Luxus.",shareTitle:"Geschichte teilen",shareDescription:"Senden Sie diesen Artikel an einen anderen Tierliebhaber.",clubTitle:"Club beitreten",clubDescription:"Nehmen Sie an Cover-Wettbewerben teil und nutzen Sie Mitgliederfunktionen.",clubButton:"PETS & DOGUE beitreten"},
related:{heading:"Weiterlesen",wellnessTitle:"Eine ruhige tägliche Routine schaffen",wellnessDescription:"Einfache Rituale für mehr Sicherheit.",fashionTitle:"Komfort zuerst bei Tiermode",fashionDescription:"Stil ohne Einschränkung natürlicher Bewegung.",travelTitle:"Eine schöne tierfreundliche Reise planen",travelDescription:"Transport, Hotels und gemeinsame Abenteuer."},
messages:{narrationUnsupported:"Ihr Browser unterstützt die Audiowiedergabe nicht.",linkCopied:"Artikellink kopiert.",copyFallback:"Kopieren Sie diesen Link:"},
stories:{}
},

es:{
ui:{listen:"Escuchar",stop:"Detener",read:"Leer",readingMode:"Modo lectura",share:"Compartir",copyLink:"Copiar enlace",backToArticles:"Artículos",by:"Por"},
default:{
category:"ESTILO DE VIDA",
title:"El arte de vivir bellamente con mascotas",
intro:"Una mirada a cómo los animales transforman nuestros hogares, rutinas y nuestra idea de una vida verdaderamente lujosa.",
author:"Redacción PETS & DOGUE",
date:"31 de julio de 2026",
readingTime:"6 min de lectura",
metaDescription:"Lee y escucha historias editoriales de PETS & DOGUE.",
body:[
{type:"text",text:"El lujo suele describirse mediante objetos, arquitectura y viajes. Para muchas personas, su forma más valiosa es la tranquila presencia de un animal."},
{type:"heading",text:"Un hogar diseñado para la vida real"},
{type:"text",text:"Un hogar bonito y apto para mascotas combina diseño elegante y cuidado práctico."},
{type:"quote",text:"Los hogares más memorables se sienten vivos, acogedores y personales."},
{type:"heading",text:"El lujo de la atención"},
{type:"text",text:"Los animales entienden el tiempo, la constancia, la seguridad y la atención."},
{type:"heading",text:"Estilo con responsabilidad"},
{type:"text",text:"El lujo responsable consiste en ofrecer un cuidado excelente respetando la personalidad natural del animal."}
],
tags:["ESTILO DE VIDA","DISEÑO","BIENESTAR","MASCOTAS"]
},
sidebar:{authorTitle:"Sobre el autor",authorDescription:"La redacción de PETS & DOGUE crea historias sobre bienestar animal, cultura, moda, viajes y lujo responsable.",shareTitle:"Compartir esta historia",shareDescription:"Envía este artículo a otra persona amante de los animales.",clubTitle:"Únete al Club",clubDescription:"Participa en concursos de portada y accede a funciones para miembros.",clubButton:"Únete a PETS & DOGUE"},
related:{heading:"Sigue leyendo",wellnessTitle:"Crear una rutina diaria tranquila",wellnessDescription:"Rituales sencillos para sentirse seguros.",fashionTitle:"La comodidad primero en la moda para mascotas",fashionDescription:"Estilo sin limitar el movimiento.",travelTitle:"Planear una escapada pet-friendly",travelDescription:"Transporte, hoteles y aventuras compartidas."},
messages:{narrationUnsupported:"Tu navegador no admite la lectura de audio.",linkCopied:"Enlace copiado.",copyFallback:"Copia este enlace:"},
stories:{}
},

it:{
ui:{listen:"Ascolta",stop:"Ferma",read:"Leggi",readingMode:"Modalità lettura",share:"Condividi",copyLink:"Copia link",backToArticles:"Articoli",by:"Di"},
default:{
category:"LIFESTYLE",
title:"L’arte di vivere magnificamente con gli animali",
intro:"Uno sguardo a come gli animali trasformano le nostre case, abitudini e idea di una vita davvero lussuosa.",
author:"PETS & DOGUE Editorial",
date:"31 luglio 2026",
readingTime:"6 min di lettura",
metaDescription:"Leggi e ascolta le storie editoriali di PETS & DOGUE.",
body:[
{type:"text",text:"Il lusso viene spesso raccontato attraverso oggetti, architettura e viaggi. Per molte persone la sua forma più preziosa è la presenza tranquilla di un animale."},
{type:"heading",text:"Una casa pensata per la vita reale"},
{type:"text",text:"Una bella casa pet-friendly unisce design elegante e cura pratica."},
{type:"quote",text:"Le case più memorabili sembrano vive, accoglienti e profondamente personali."},
{type:"heading",text:"Il lusso dell’attenzione"},
{type:"text",text:"Gli animali capiscono tempo, costanza, sicurezza e attenzione."},
{type:"heading",text:"Stile con responsabilità"},
{type:"text",text:"Il lusso responsabile significa offrire cure eccellenti rispettando la personalità naturale dell’animale."}
],
tags:["LIFESTYLE","DESIGN","BENESSERE","ANIMALI"]
},
sidebar:{authorTitle:"Informazioni sull’autore",authorDescription:"PETS & DOGUE Editorial crea storie su benessere animale, cultura, moda, viaggi e lusso responsabile.",shareTitle:"Condividi questa storia",shareDescription:"Invia questo articolo a un altro amante degli animali.",clubTitle:"Entra nel Club",clubDescription:"Partecipa ai concorsi di copertina e accedi alle funzioni membri.",clubButton:"Entra in PETS & DOGUE"},
related:{heading:"Continua a leggere",wellnessTitle:"Creare una routine quotidiana serena",wellnessDescription:"Semplici rituali per sentirsi al sicuro.",fashionTitle:"Il comfort prima di tutto nella moda pet",fashionDescription:"Stile senza limitare i movimenti.",travelTitle:"Pianificare una fuga pet-friendly",travelDescription:"Trasporti, hotel e avventure insieme."},
messages:{narrationUnsupported:"Il browser non supporta la lettura audio.",linkCopied:"Link dell’articolo copiato.",copyFallback:"Copia questo link:"},
stories:{}
},

pt:{
ui:{listen:"Ouvir",stop:"Parar",read:"Ler",readingMode:"Modo de leitura",share:"Partilhar",copyLink:"Copiar ligação",backToArticles:"Artigos",by:"Por"},
default:{
category:"ESTILO DE VIDA",
title:"A arte de viver lindamente com animais",
intro:"Uma reflexão sobre como os animais transformam as nossas casas, rotinas e a ideia de uma vida verdadeiramente luxuosa.",
author:"PETS & DOGUE Editorial",
date:"31 de julho de 2026",
readingTime:"6 min de leitura",
metaDescription:"Leia e ouça histórias editoriais da PETS & DOGUE.",
body:[
{type:"text",text:"O luxo é muitas vezes descrito através de objetos, arquitetura e viagens. Para muitas pessoas, a sua forma mais significativa é a presença tranquila de um animal."},
{type:"heading",text:"Uma casa pensada para a vida real"},
{type:"text",text:"Uma casa amiga dos animais combina design elegante e cuidados práticos."},
{type:"quote",text:"As casas mais memoráveis sentem-se vivas, acolhedoras e profundamente pessoais."},
{type:"heading",text:"O luxo da atenção"},
{type:"text",text:"Os animais compreendem tempo, consistência, segurança e atenção."},
{type:"heading",text:"Estilo com responsabilidade"},
{type:"text",text:"Luxo responsável significa oferecer excelentes cuidados respeitando a personalidade natural do animal."}
],
tags:["ESTILO DE VIDA","DESIGN","BEM-ESTAR","ANIMAIS"]
},
sidebar:{authorTitle:"Sobre o autor",authorDescription:"A PETS & DOGUE Editorial cria histórias sobre bem-estar animal, cultura, moda, viagens e luxo responsável.",shareTitle:"Partilhar esta história",shareDescription:"Envie este artigo a outro amante de animais.",clubTitle:"Junte-se ao Clube",clubDescription:"Participe em concursos de capa e aceda a funções para membros.",clubButton:"Junte-se à PETS & DOGUE"},
related:{heading:"Continue a ler",wellnessTitle:"Criar uma rotina diária tranquila",wellnessDescription:"Rituais simples para segurança.",fashionTitle:"Conforto primeiro na moda animal",fashionDescription:"Estilo sem limitar o movimento.",travelTitle:"Planear uma escapadinha pet-friendly",travelDescription:"Transportes, hotéis e aventuras."},
messages:{narrationUnsupported:"O seu navegador não suporta leitura áudio.",linkCopied:"Ligação do artigo copiada.",copyFallback:"Copie esta ligação:"},
stories:{}
},

nl:{
ui:{listen:"Luisteren",stop:"Stoppen",read:"Lezen",readingMode:"Leesmodus",share:"Delen",copyLink:"Link kopiëren",backToArticles:"Artikelen",by:"Door"},
default:{
category:"LIFESTYLE",
title:"De kunst van mooi leven met huisdieren",
intro:"Een blik op hoe dieren ons huis, onze routines en ons idee van een werkelijk luxe leven veranderen.",
author:"PETS & DOGUE Editorial",
date:"31 juli 2026",
readingTime:"6 min leestijd",
metaDescription:"Lees en beluister redactionele verhalen van PETS & DOGUE.",
body:[
{type:"text",text:"Luxe wordt vaak beschreven via objecten, architectuur en reizen. Voor veel mensen is de meest betekenisvolle vorm de rustige aanwezigheid van een dier."},
{type:"heading",text:"Een huis ontworpen voor het echte leven"},
{type:"text",text:"Een mooi huisdiervriendelijk huis combineert elegant design met praktische zorg."},
{type:"quote",text:"De meest memorabele huizen voelen levendig, gastvrij en persoonlijk."},
{type:"heading",text:"De luxe van aandacht"},
{type:"text",text:"Dieren begrijpen tijd, regelmaat, veiligheid en aandacht."},
{type:"heading",text:"Stijl met verantwoordelijkheid"},
{type:"text",text:"Verantwoorde luxe betekent uitstekende zorg met respect voor de natuurlijke persoonlijkheid van het dier."}
],
tags:["LIFESTYLE","DESIGN","WELZIJN","HUISDIEREN"]
},
sidebar:{authorTitle:"Over de auteur",authorDescription:"PETS & DOGUE Editorial maakt verhalen over dierenwelzijn, cultuur, mode, reizen en verantwoorde luxe.",shareTitle:"Dit verhaal delen",shareDescription:"Stuur dit artikel naar een andere dierenliefhebber.",clubTitle:"Word lid van de Club",clubDescription:"Doe mee aan coverwedstrijden en krijg ledenfuncties.",clubButton:"Word lid van PETS & DOGUE"},
related:{heading:"Lees verder",wellnessTitle:"Een rustige dagelijkse routine creëren",wellnessDescription:"Eenvoudige rituelen voor veiligheid.",fashionTitle:"Comfort eerst in huisdierenmode",fashionDescription:"Stijl zonder beweging te beperken.",travelTitle:"Een mooie huisdiervriendelijke reis plannen",travelDescription:"Vervoer, hotels en avonturen."},
messages:{narrationUnsupported:"Uw browser ondersteunt geen audiolezen.",linkCopied:"Artikellink gekopieerd.",copyFallback:"Kopieer deze link:"},
stories:{}
},

pl:{
ui:{listen:"Słuchaj",stop:"Stop",read:"Czytaj",readingMode:"Tryb czytania",share:"Udostępnij",copyLink:"Kopiuj link",backToArticles:"Artykuły",by:"Autor:"},
default:{
category:"STYL ŻYCIA",
title:"Sztuka pięknego życia ze zwierzętami",
intro:"O tym, jak zwierzęta zmieniają nasze domy, codzienne rytuały i rozumienie prawdziwego luksusu.",
author:"Redakcja PETS & DOGUE",
date:"31 lipca 2026",
readingTime:"6 min czytania",
metaDescription:"Czytaj i słuchaj historii redakcyjnych PETS & DOGUE.",
body:[
{type:"text",text:"Luksus często opisuje się poprzez przedmioty, architekturę i podróże. Dla wielu osób jego najważniejszą formą jest spokojna obecność zwierzęcia."},
{type:"heading",text:"Dom zaprojektowany do prawdziwego życia"},
{type:"text",text:"Piękny dom przyjazny zwierzętom łączy elegancję z praktyczną opieką."},
{type:"quote",text:"Najbardziej pamiętne domy są żywe, gościnne i osobiste."},
{type:"heading",text:"Luksus uwagi"},
{type:"text",text:"Zwierzęta rozumieją czas, stałość, bezpieczeństwo i uwagę."},
{type:"heading",text:"Styl z odpowiedzialnością"},
{type:"text",text:"Odpowiedzialny luksus oznacza doskonałą opiekę z szacunkiem dla charakteru zwierzęcia."}
],
tags:["STYL ŻYCIA","DESIGN","DOBROSTAN","ZWIERZĘTA"]
},
sidebar:{authorTitle:"O autorze",authorDescription:"Redakcja PETS & DOGUE tworzy historie o dobrostanie zwierząt, kulturze, modzie i podróżach.",shareTitle:"Udostępnij historię",shareDescription:"Wyślij artykuł innemu miłośnikowi zwierząt.",clubTitle:"Dołącz do Klubu",clubDescription:"Bierz udział w konkursach okładkowych i korzystaj z funkcji członkowskich.",clubButton:"Dołącz do PETS & DOGUE"},
related:{heading:"Czytaj dalej",wellnessTitle:"Spokojna codzienna rutyna",wellnessDescription:"Proste rytuały dające bezpieczeństwo.",fashionTitle:"Komfort przede wszystkim w modzie",fashionDescription:"Styl bez ograniczania ruchu.",travelTitle:"Piękna podróż ze zwierzęciem",travelDescription:"Transport, hotele i wspólne przygody."},
messages:{narrationUnsupported:"Ta przeglądarka nie obsługuje odczytu audio.",linkCopied:"Skopiowano link do artykułu.",copyFallback:"Skopiuj ten link:"},
stories:{}
},

cs:{
ui:{listen:"Poslouchat",stop:"Zastavit",read:"Číst",readingMode:"Režim čtení",share:"Sdílet",copyLink:"Kopírovat odkaz",backToArticles:"Články",by:"Autor:"},
default:{
category:"ŽIVOTNÍ STYL",
title:"Umění krásného života se zvířaty",
intro:"Pohled na to, jak zvířata mění naše domovy, rutiny a představu o skutečném luxusu.",
author:"Redakce PETS & DOGUE",
date:"31. července 2026",
readingTime:"6 min čtení",
metaDescription:"Čtěte a poslouchejte redakční příběhy PETS & DOGUE.",
body:[
{type:"text",text:"Luxus se často popisuje prostřednictvím věcí, architektury a cestování. Pro mnoho lidí je však jeho nejcennější podobou klidná přítomnost zvířete."},
{type:"heading",text:"Domov navržený pro skutečný život"},
{type:"text",text:"Krásný domov přátelský ke zvířatům spojuje elegantní design a praktickou péči."},
{type:"quote",text:"Nejpamátnější domovy působí živě, útulně a osobně."},
{type:"heading",text:"Luxus pozornosti"},
{type:"text",text:"Zvířata rozumějí času, stálosti, bezpečí a pozornosti."},
{type:"heading",text:"Styl s odpovědností"},
{type:"text",text:"Odpovědný luxus znamená skvělou péči s respektem k osobnosti zvířete."}
],
tags:["ŽIVOTNÍ STYL","DESIGN","POHODA","MAZLÍČCI"]
},
sidebar:{authorTitle:"O autorovi",authorDescription:"Redakce PETS & DOGUE vytváří příběhy o pohodě zvířat, kultuře, módě a cestování.",shareTitle:"Sdílet příběh",shareDescription:"Pošlete článek dalšímu milovníkovi zvířat.",clubTitle:"Vstoupit do Klubu",clubDescription:"Zapojte se do soutěží o obálku a využívejte členské funkce.",clubButton:"Vstoupit do PETS & DOGUE"},
related:{heading:"Čtěte dál",wellnessTitle:"Vytvořte klidnou rutinu",wellnessDescription:"Jednoduché rituály pro bezpečí.",fashionTitle:"Pohodlí na prvním místě v módě",fashionDescription:"Styl bez omezení pohybu.",travelTitle:"Naplánujte krásný výlet",travelDescription:"Doprava, hotely a zážitky."},
messages:{narrationUnsupported:"Prohlížeč nepodporuje hlasové čtení.",linkCopied:"Odkaz na článek zkopírován.",copyFallback:"Zkopírujte tento odkaz:"},
stories:{}
},

sk:{
ui:{listen:"Počúvať",stop:"Zastaviť",read:"Čítať",readingMode:"Režim čítania",share:"Zdieľať",copyLink:"Kopírovať odkaz",backToArticles:"Články",by:"Autor:"},
default:{
category:"ŽIVOTNÝ ŠTÝL",
title:"Umenie krásneho života so zvieratami",
intro:"Pohľad na to, ako zvieratá menia naše domovy, rutiny a predstavu o skutočnom luxuse.",
author:"Redakcia PETS & DOGUE",
date:"31. júla 2026",
readingTime:"6 min čítania",
metaDescription:"Čítajte a počúvajte redakčné príbehy PETS & DOGUE.",
body:[
{type:"text",text:"Luxus sa často opisuje cez veci, architektúru a cestovanie. Pre mnohých je jeho najvzácnejšou podobou pokojná prítomnosť zvieraťa."},
{type:"heading",text:"Domov pre skutočný život"},
{type:"text",text:"Krásny domov priateľský k zvieratám spája elegantný dizajn a praktickú starostlivosť."},
{type:"quote",text:"Najpamätnejšie domovy pôsobia živo, príjemne a osobne."},
{type:"heading",text:"Luxus pozornosti"},
{type:"text",text:"Zvieratá rozumejú času, stálosti, bezpečnosti a pozornosti."},
{type:"heading",text:"Štýl so zodpovednosťou"},
{type:"text",text:"Zodpovedný luxus znamená špičkovú starostlivosť s rešpektom k osobnosti zvieraťa."}
],
tags:["ŽIVOTNÝ ŠTÝL","DIZAJN","POHODA","MILÁČIKOVIA"]
},
sidebar:{authorTitle:"O autorovi",authorDescription:"Redakcia PETS & DOGUE vytvára príbehy o pohode zvierat, kultúre, móde a cestovaní.",shareTitle:"Zdieľať príbeh",shareDescription:"Pošlite článok ďalšiemu milovníkovi zvierat.",clubTitle:"Pridajte sa do Klubu",clubDescription:"Zapojte sa do súťaží a využívajte členské funkcie.",clubButton:"Pridať sa k PETS & DOGUE"},
related:{heading:"Čítajte ďalej",wellnessTitle:"Pokojná denná rutina",wellnessDescription:"Jednoduché rituály pre bezpečie.",fashionTitle:"Pohodlie na prvom mieste",fashionDescription:"Štýl bez obmedzenia pohybu.",travelTitle:"Naplánujte krásnu cestu",travelDescription:"Doprava, hotely a zážitky."},
messages:{narrationUnsupported:"Prehliadač nepodporuje hlasové čítanie.",linkCopied:"Odkaz na článok bol skopírovaný.",copyFallback:"Skopírujte tento odkaz:"},
stories:{}
},

hu:{
ui:{listen:"Hallgatás",stop:"Leállítás",read:"Olvasás",readingMode:"Olvasási mód",share:"Megosztás",copyLink:"Link másolása",backToArticles:"Cikkek",by:"Írta:"},
default:{
category:"ÉLETMÓD",
title:"A szép, közös élet művészete az állatokkal",
intro:"Arról, hogyan változtatják meg az állatok az otthonunkat, rutinjainkat és a valódi luxusról alkotott képünket.",
author:"PETS & DOGUE szerkesztőség",
date:"2026. július 31.",
readingTime:"6 perc olvasás",
metaDescription:"Olvassa és hallgassa a PETS & DOGUE szerkesztőségi történeteit.",
body:[
{type:"text",text:"A luxust gyakran tárgyakon, építészeten és utazáson keresztül írjuk le. Sok ember számára azonban a legértékesebb formája egy állat nyugodt jelenléte."},
{type:"heading",text:"Otthon a valódi élethez"},
{type:"text",text:"Egy szép állatbarát otthon az elegáns design és a gyakorlati gondoskodás találkozása."},
{type:"quote",text:"A legemlékezetesebb otthonok élőnek, barátságosnak és személyesnek érződnek."},
{type:"heading",text:"A figyelem luxusa"},
{type:"text",text:"Az állatok az időt, következetességet, biztonságot és figyelmet értik."},
{type:"heading",text:"Stílus felelősséggel"},
{type:"text",text:"A felelős luxus kiváló gondoskodást jelent az állat személyiségének tiszteletével."}
],
tags:["ÉLETMÓD","DESIGN","JÓLLÉT","KEDVENCEK"]
},
sidebar:{authorTitle:"A szerzőről",authorDescription:"A PETS & DOGUE szerkesztősége állatjóllétről, kultúráról, divatról és utazásról készít történeteket.",shareTitle:"Történet megosztása",shareDescription:"Küldje el ezt a cikket egy másik állatbarátnak.",clubTitle:"Csatlakozzon a Klubhoz",clubDescription:"Vegyen részt címlapversenyeken és használja a tagsági funkciókat.",clubButton:"Csatlakozás a PETS & DOGUE-hoz"},
related:{heading:"Olvasson tovább",wellnessTitle:"Nyugodt napi rutin",wellnessDescription:"Egyszerű rituálék a biztonságért.",fashionTitle:"Kényelem az első helyen",fashionDescription:"Stílus szabad mozgással.",travelTitle:"Szép állatbarát utazás",travelDescription:"Közlekedés, szállodák és kalandok."},
messages:{narrationUnsupported:"A böngésző nem támogatja a hangos felolvasást.",linkCopied:"A cikk linkje másolva.",copyFallback:"Másolja ezt a linket:"},
stories:{}
},

ro:{
ui:{listen:"Ascultă",stop:"Oprire",read:"Citește",readingMode:"Mod lectură",share:"Distribuie",copyLink:"Copiază linkul",backToArticles:"Articole",by:"De"},
default:{
category:"STIL DE VIAȚĂ",
title:"Arta de a trăi frumos alături de animale",
intro:"O privire asupra modului în care animalele ne schimbă casele, rutinele și ideea de viață cu adevărat luxoasă.",
author:"Redacția PETS & DOGUE",
date:"31 iulie 2026",
readingTime:"6 min de citit",
metaDescription:"Citiți și ascultați povești editoriale PETS & DOGUE.",
body:[
{type:"text",text:"Luxul este adesea descris prin obiecte, arhitectură și călătorii. Pentru mulți, forma sa cea mai valoroasă este prezența liniștită a unui animal."},
{type:"heading",text:"O casă pentru viața reală"},
{type:"text",text:"O casă prietenoasă cu animalele combină designul elegant și îngrijirea practică."},
{type:"quote",text:"Cele mai memorabile case se simt vii, primitoare și personale."},
{type:"heading",text:"Luxul atenției"},
{type:"text",text:"Animalele înțeleg timpul, consecvența, siguranța și atenția."},
{type:"heading",text:"Stil cu responsabilitate"},
{type:"text",text:"Luxul responsabil înseamnă îngrijire excelentă cu respect pentru personalitatea animalului."}
],
tags:["STIL DE VIAȚĂ","DESIGN","BUNĂSTARE","ANIMALE"]
},
sidebar:{authorTitle:"Despre autor",authorDescription:"Redacția PETS & DOGUE creează povești despre bunăstarea animalelor, cultură, modă și călătorii.",shareTitle:"Distribuie povestea",shareDescription:"Trimite articolul unui alt iubitor de animale.",clubTitle:"Alătură-te Clubului",clubDescription:"Participă la concursurile de copertă și accesează funcțiile membrilor.",clubButton:"Alătură-te PETS & DOGUE"},
related:{heading:"Continuă lectura",wellnessTitle:"Creează o rutină liniștită",wellnessDescription:"Ritualuri simple pentru siguranță.",fashionTitle:"Confortul înainte de toate",fashionDescription:"Stil fără limitarea mișcării.",travelTitle:"Planifică o escapadă",travelDescription:"Transport, hoteluri și aventuri."},
messages:{narrationUnsupported:"Browserul nu acceptă redarea audio.",linkCopied:"Linkul articolului a fost copiat.",copyFallback:"Copiază acest link:"},
stories:{}
},

bg:{
ui:{listen:"Слушай",stop:"Стоп",read:"Чети",readingMode:"Режим за четене",share:"Сподели",copyLink:"Копирай линка",backToArticles:"Статии",by:"От"},
default:{
category:"НАЧИН НА ЖИВОТ",
title:"Изкуството да живеем красиво с животни",
intro:"Поглед към това как животните променят дома, ежедневието и разбирането ни за истински лукс.",
author:"Редакцията на PETS & DOGUE",
date:"31 юли 2026",
readingTime:"6 мин четене",
metaDescription:"Четете и слушайте редакционните истории на PETS & DOGUE.",
body:[
{type:"text",text:"Луксът често се описва чрез предмети, архитектура и пътувания. За много хора най-ценната му форма е тихото присъствие на животно."},
{type:"heading",text:"Дом за истинския живот"},
{type:"text",text:"Красивият дом за животни съчетава елегантен дизайн и практична грижа."},
{type:"quote",text:"Най-запомнящите се домове са живи, приветливи и лични."},
{type:"heading",text:"Луксът на вниманието"},
{type:"text",text:"Животните разбират време, постоянство, безопасност и внимание."},
{type:"heading",text:"Стил с отговорност"},
{type:"text",text:"Отговорният лукс означава отлична грижа с уважение към характера на животното."}
],
tags:["НАЧИН НА ЖИВОТ","ДИЗАЙН","БЛАГОПОЛУЧИЕ","ЛЮБИМЦИ"]
},
sidebar:{authorTitle:"За автора",authorDescription:"Редакцията на PETS & DOGUE създава истории за благополучието на животните, култура, мода и пътувания.",shareTitle:"Сподели историята",shareDescription:"Изпратете статията на друг любител на животните.",clubTitle:"Присъединете се към Клуба",clubDescription:"Участвайте в конкурси за корица и използвайте функции за членове.",clubButton:"Присъединете се към PETS & DOGUE"},
related:{heading:"Продължете да четете",wellnessTitle:"Създайте спокойна рутина",wellnessDescription:"Прости ритуали за сигурност.",fashionTitle:"Комфортът на първо място",fashionDescription:"Стил без ограничение на движението.",travelTitle:"Планирайте красиво пътуване",travelDescription:"Транспорт, хотели и приключения."},
messages:{narrationUnsupported:"Браузърът не поддържа аудио прочит.",linkCopied:"Линкът към статията е копиран.",copyFallback:"Копирайте този линк:"},
stories:{}
},

el:{
ui:{listen:"Ακρόαση",stop:"Διακοπή",read:"Ανάγνωση",readingMode:"Λειτουργία ανάγνωσης",share:"Κοινοποίηση",copyLink:"Αντιγραφή συνδέσμου",backToArticles:"Άρθρα",by:"Από"},
default:{
category:"LIFESTYLE",
title:"Η τέχνη της όμορφης ζωής με τα ζώα",
intro:"Μια ματιά στο πώς τα ζώα μεταμορφώνουν το σπίτι, τις συνήθειες και την αντίληψή μας για την πραγματική πολυτέλεια.",
author:"Σύνταξη PETS & DOGUE",
date:"31 Ιουλίου 2026",
readingTime:"6 λεπτά ανάγνωσης",
metaDescription:"Διαβάστε και ακούστε ιστορίες του PETS & DOGUE.",
body:[
{type:"text",text:"Η πολυτέλεια συχνά περιγράφεται μέσα από αντικείμενα, αρχιτεκτονική και ταξίδια. Για πολλούς όμως η πιο πολύτιμη μορφή της είναι η ήρεμη παρουσία ενός ζώου."},
{type:"heading",text:"Ένα σπίτι για την πραγματική ζωή"},
{type:"text",text:"Ένα όμορφο pet-friendly σπίτι συνδυάζει κομψό σχεδιασμό και πρακτική φροντίδα."},
{type:"quote",text:"Τα πιο αξέχαστα σπίτια νιώθουν ζωντανά, φιλόξενα και προσωπικά."},
{type:"heading",text:"Η πολυτέλεια της προσοχής"},
{type:"text",text:"Τα ζώα καταλαβαίνουν τον χρόνο, τη συνέπεια, την ασφάλεια και την προσοχή."},
{type:"heading",text:"Στυλ με υπευθυνότητα"},
{type:"text",text:"Η υπεύθυνη πολυτέλεια σημαίνει εξαιρετική φροντίδα με σεβασμό στην προσωπικότητα του ζώου."}
],
tags:["LIFESTYLE","DESIGN","ΕΥΕΞΙΑ","ΚΑΤΟΙΚΙΔΙΑ"]
},
sidebar:{authorTitle:"Σχετικά με τον συγγραφέα",authorDescription:"Η σύνταξη PETS & DOGUE δημιουργεί ιστορίες για την ευεξία των ζώων, τον πολιτισμό, τη μόδα και τα ταξίδια.",shareTitle:"Κοινοποιήστε την ιστορία",shareDescription:"Στείλτε το άρθρο σε έναν φίλο των ζώων.",clubTitle:"Μπείτε στη Λέσχη",clubDescription:"Συμμετέχετε σε διαγωνισμούς εξωφύλλου και αποκτήστε λειτουργίες μελών.",clubButton:"Μπείτε στο PETS & DOGUE"},
related:{heading:"Συνεχίστε την ανάγνωση",wellnessTitle:"Δημιουργήστε ήρεμη ρουτίνα",wellnessDescription:"Απλές συνήθειες για ασφάλεια.",fashionTitle:"Η άνεση πρώτη στη μόδα",fashionDescription:"Στυλ χωρίς περιορισμό κίνησης.",travelTitle:"Σχεδιάστε μια όμορφη απόδραση",travelDescription:"Μεταφορά, ξενοδοχεία και εμπειρίες."},
messages:{narrationUnsupported:"Το πρόγραμμα περιήγησης δεν υποστηρίζει ηχητική ανάγνωση.",linkCopied:"Ο σύνδεσμος αντιγράφηκε.",copyFallback:"Αντιγράψτε αυτόν τον σύνδεσμο:"},
stories:{}
},

sv:{
ui:{listen:"Lyssna",stop:"Stoppa",read:"Läs",readingMode:"Läsläge",share:"Dela",copyLink:"Kopiera länk",backToArticles:"Artiklar",by:"Av"},
default:{
category:"LIVSSTIL",
title:"Konsten att leva vackert med djur",
intro:"En blick på hur djur förändrar våra hem, rutiner och vår syn på ett verkligt lyxigt liv.",
author:"PETS & DOGUE Editorial",
date:"31 juli 2026",
readingTime:"6 min läsning",
metaDescription:"Läs och lyssna på redaktionella berättelser från PETS & DOGUE.",
body:[
{type:"text",text:"Lyx beskrivs ofta genom föremål, arkitektur och resor. För många är den mest värdefulla formen den lugna närvaron av ett djur."},
{type:"heading",text:"Ett hem för verkliga livet"},
{type:"text",text:"Ett vackert djurvänligt hem kombinerar elegant design och praktisk omsorg."},
{type:"quote",text:"De mest minnesvärda hemmen känns levande, välkomnande och personliga."},
{type:"heading",text:"Uppmärksamhetens lyx"},
{type:"text",text:"Djur förstår tid, konsekvens, trygghet och uppmärksamhet."},
{type:"heading",text:"Stil med ansvar"},
{type:"text",text:"Ansvarsfull lyx betyder utmärkt omsorg med respekt för djurets personlighet."}
],
tags:["LIVSSTIL","DESIGN","VÄLMÅENDE","HUSDJUR"]
},
sidebar:{authorTitle:"Om författaren",authorDescription:"PETS & DOGUE Editorial skapar historier om djurvälfärd, kultur, mode och resor.",shareTitle:"Dela berättelsen",shareDescription:"Skicka artikeln till en annan djurvän.",clubTitle:"Gå med i Klubben",clubDescription:"Delta i omslagstävlingar och använd medlemsfunktioner.",clubButton:"Gå med i PETS & DOGUE"},
related:{heading:"Fortsätt läsa",wellnessTitle:"Skapa en lugn rutin",wellnessDescription:"Enkla ritualer för trygghet.",fashionTitle:"Komfort först inom djurmode",fashionDescription:"Stil utan begränsad rörelse.",travelTitle:"Planera en djurvänlig resa",travelDescription:"Transport, hotell och äventyr."},
messages:{narrationUnsupported:"Din webbläsare stöder inte ljudläsning.",linkCopied:"Artikellänken kopierades.",copyFallback:"Kopiera denna länk:"},
stories:{}
},

da:{
ui:{listen:"Lyt",stop:"Stop",read:"Læs",readingMode:"Læsetilstand",share:"Del",copyLink:"Kopiér link",backToArticles:"Artikler",by:"Af"},
default:{
category:"LIVSSTIL",
title:"Kunsten at leve smukt med dyr",
intro:"Et blik på hvordan dyr ændrer vores hjem, rutiner og forståelse af et virkelig luksuriøst liv.",
author:"PETS & DOGUE Editorial",
date:"31. juli 2026",
readingTime:"6 min læsning",
metaDescription:"Læs og lyt til redaktionelle historier fra PETS & DOGUE.",
body:[
{type:"text",text:"Luksus beskrives ofte gennem genstande, arkitektur og rejser. For mange er dens mest værdifulde form den rolige tilstedeværelse af et dyr."},
{type:"heading",text:"Et hjem til det virkelige liv"},
{type:"text",text:"Et smukt kæledyrsvenligt hjem kombinerer elegant design og praktisk omsorg."},
{type:"quote",text:"De mest mindeværdige hjem føles levende, indbydende og personlige."},
{type:"heading",text:"Opmærksomhedens luksus"},
{type:"text",text:"Dyr forstår tid, stabilitet, sikkerhed og opmærksomhed."},
{type:"heading",text:"Stil med ansvar"},
{type:"text",text:"Ansvarlig luksus betyder fremragende omsorg med respekt for dyrets personlighed."}
],
tags:["LIVSSTIL","DESIGN","TRIVSEL","KÆLEDYR"]
},
sidebar:{authorTitle:"Om forfatteren",authorDescription:"PETS & DOGUE Editorial skaber historier om dyrevelfærd, kultur, mode og rejser.",shareTitle:"Del historien",shareDescription:"Send artiklen til en anden dyreelsker.",clubTitle:"Bliv medlem af Klubben",clubDescription:"Deltag i forsidekonkurrencer og få medlemsfunktioner.",clubButton:"Bliv medlem af PETS & DOGUE"},
related:{heading:"Læs videre",wellnessTitle:"Skab en rolig rutine",wellnessDescription:"Enkle ritualer for tryghed.",fashionTitle:"Komfort først i kæledyrsmode",fashionDescription:"Stil uden begrænset bevægelse.",travelTitle:"Planlæg en kæledyrsvenlig rejse",travelDescription:"Transport, hoteller og oplevelser."},
messages:{narrationUnsupported:"Din browser understøtter ikke lydoplæsning.",linkCopied:"Artikellink kopieret.",copyFallback:"Kopiér dette link:"},
stories:{}
},

no:{
ui:{listen:"Lytt",stop:"Stopp",read:"Les",readingMode:"Lesemodus",share:"Del",copyLink:"Kopier lenke",backToArticles:"Artikler",by:"Av"},
default:{
category:"LIVSSTIL",
title:"Kunsten å leve vakkert med dyr",
intro:"Et blikk på hvordan dyr endrer hjemmene våre, rutinene våre og forståelsen av et virkelig luksuriøst liv.",
author:"PETS & DOGUE Editorial",
date:"31. juli 2026",
readingTime:"6 min lesing",
metaDescription:"Les og lytt til redaksjonelle historier fra PETS & DOGUE.",
body:[
{type:"text",text:"Luksus beskrives ofte gjennom gjenstander, arkitektur og reiser. For mange er den mest verdifulle formen den rolige tilstedeværelsen av et dyr."},
{type:"heading",text:"Et hjem for det virkelige livet"},
{type:"text",text:"Et vakkert kjæledyrvennlig hjem kombinerer elegant design og praktisk omsorg."},
{type:"quote",text:"De mest minneverdige hjemmene føles levende, innbydende og personlige."},
{type:"heading",text:"Oppmerksomhetens luksus"},
{type:"text",text:"Dyr forstår tid, stabilitet, trygghet og oppmerksomhet."},
{type:"heading",text:"Stil med ansvar"},
{type:"text",text:"Ansvarlig luksus betyr førsteklasses omsorg med respekt for dyrets personlighet."}
],
tags:["LIVSSTIL","DESIGN","TRIVSEL","KJÆLEDYR"]
},
sidebar:{authorTitle:"Om forfatteren",authorDescription:"PETS & DOGUE Editorial lager historier om dyrevelferd, kultur, mote og reiser.",shareTitle:"Del historien",shareDescription:"Send artikkelen til en annen dyreelsker.",clubTitle:"Bli med i Klubben",clubDescription:"Delta i forsidekonkurranser og få medlemsfunksjoner.",clubButton:"Bli med i PETS & DOGUE"},
related:{heading:"Les videre",wellnessTitle:"Lag en rolig rutine",wellnessDescription:"Enkle ritualer for trygghet.",fashionTitle:"Komfort først i kjæledyrmote",fashionDescription:"Stil uten begrenset bevegelse.",travelTitle:"Planlegg en kjæledyrvennlig reise",travelDescription:"Transport, hoteller og opplevelser."},
messages:{narrationUnsupported:"Nettleseren støtter ikke lydopplesning.",linkCopied:"Artikkellenken er kopiert.",copyFallback:"Kopier denne lenken:"},
stories:{}
},

fi:{
ui:{listen:"Kuuntele",stop:"Pysäytä",read:"Lue",readingMode:"Lukutila",share:"Jaa",copyLink:"Kopioi linkki",backToArticles:"Artikkelit",by:"Kirjoittaja:"},
default:{
category:"ELÄMÄNTYYLI",
title:"Kauniin elämän taito eläinten kanssa",
intro:"Näin eläimet muuttavat kotiamme, rutiinejamme ja käsitystämme aidosti ylellisestä elämästä.",
author:"PETS & DOGUE -toimitus",
date:"31. heinäkuuta 2026",
readingTime:"6 min lukuaika",
metaDescription:"Lue ja kuuntele PETS & DOGUE -lehden toimituksellisia tarinoita.",
body:[
{type:"text",text:"Ylellisyyttä kuvataan usein esineillä, arkkitehtuurilla ja matkailulla. Monille sen arvokkain muoto on eläimen rauhallinen läsnäolo."},
{type:"heading",text:"Koti todellista elämää varten"},
{type:"text",text:"Kaunis lemmikkiystävällinen koti yhdistää tyylikkään designin ja käytännöllisen hoivan."},
{type:"quote",text:"Mieleenpainuvimmat kodit tuntuvat eläviltä, kutsuvilta ja henkilökohtaisilta."},
{type:"heading",text:"Huomion ylellisyys"},
{type:"text",text:"Eläimet ymmärtävät ajan, johdonmukaisuuden, turvallisuuden ja huomion."},
{type:"heading",text:"Tyyliä vastuullisesti"},
{type:"text",text:"Vastuullinen ylellisyys tarkoittaa erinomaista hoivaa eläimen persoonallisuutta kunnioittaen."}
],
tags:["ELÄMÄNTYYLI","DESIGN","HYVINVOINTI","LEMMIKIT"]
},
sidebar:{authorTitle:"Tietoa kirjoittajasta",authorDescription:"PETS & DOGUE -toimitus luo tarinoita eläinten hyvinvoinnista, kulttuurista, muodista ja matkailusta.",shareTitle:"Jaa tarina",shareDescription:"Lähetä artikkeli toiselle eläinten ystävälle.",clubTitle:"Liity Klubiin",clubDescription:"Osallistu kansikilpailuihin ja käytä jäsenominaisuuksia.",clubButton:"Liity PETS & DOGUE -klubiin"},
related:{heading:"Jatka lukemista",wellnessTitle:"Luo rauhallinen rutiini",wellnessDescription:"Yksinkertaisia rituaaleja turvallisuuteen.",fashionTitle:"Mukavuus ensin lemmikkimuodissa",fashionDescription:"Tyyli ilman liikkeen rajoittamista.",travelTitle:"Suunnittele lemmikkiystävällinen matka",travelDescription:"Kuljetukset, hotellit ja kokemukset."},
messages:{narrationUnsupported:"Selaimesi ei tue ääneenlukua.",linkCopied:"Artikkelin linkki kopioitu.",copyFallback:"Kopioi tämä linkki:"},
stories:{}
},

tr:{
ui:{listen:"Dinle",stop:"Durdur",read:"Oku",readingMode:"Okuma Modu",share:"Paylaş",copyLink:"Bağlantıyı Kopyala",backToArticles:"Makaleler",by:"Yazan:"},
default:{
category:"YAŞAM TARZI",
title:"Hayvanlarla Güzel Yaşama Sanatı",
intro:"Hayvanların evlerimizi, rutinlerimizi ve gerçek lüks anlayışımızı nasıl değiştirdiğine dair bir bakış.",
author:"PETS & DOGUE Editoryal",
date:"31 Temmuz 2026",
readingTime:"6 dk okuma",
metaDescription:"PETS & DOGUE editoryal hikâyelerini okuyun ve dinleyin.",
body:[
{type:"text",text:"Lüks çoğu zaman nesneler, mimari ve seyahat üzerinden anlatılır. Birçok insan için en değerli lüks bir hayvanın sakin varlığıdır."},
{type:"heading",text:"Gerçek Hayat İçin Tasarlanmış Bir Ev"},
{type:"text",text:"Güzel ve evcil hayvan dostu bir ev zarif tasarım ile pratik bakımın birleştiği yerdir."},
{type:"quote",text:"En unutulmaz evler canlı, sıcak ve kişisel hissettirir."},
{type:"heading",text:"İlginin Lüksü"},
{type:"text",text:"Hayvanlar zamanı, tutarlılığı, güvenliği ve ilgiyi anlar."},
{type:"heading",text:"Sorumlu Stil"},
{type:"text",text:"Sorumlu lüks, hayvanın karakterine saygı gösterirken mükemmel bakım sunmaktır."}
],
tags:["YAŞAM TARZI","TASARIM","REFAH","EVCİL HAYVANLAR"]
},
sidebar:{authorTitle:"Yazar Hakkında",authorDescription:"PETS & DOGUE Editoryal hayvan refahı, kültür, moda ve seyahat hakkında hikâyeler üretir.",shareTitle:"Bu Hikâyeyi Paylaş",shareDescription:"Makaleyi başka bir hayvansevere gönderin.",clubTitle:"Kulübe Katıl",clubDescription:"Kapak yarışmalarına katılın ve üye özelliklerini açın.",clubButton:"PETS & DOGUE’a Katıl"},
related:{heading:"Okumaya Devam Et",wellnessTitle:"Sakin bir rutin oluşturun",wellnessDescription:"Güven veren basit ritüeller.",fashionTitle:"Evcil hayvan modasında önce konfor",fashionDescription:"Hareketi kısıtlamadan stil.",travelTitle:"Güzel bir pet-friendly kaçamak",travelDescription:"Ulaşım, oteller ve maceralar."},
messages:{narrationUnsupported:"Tarayıcınız sesli okumayı desteklemiyor.",linkCopied:"Makale bağlantısı kopyalandı.",copyFallback:"Bu bağlantıyı kopyalayın:"},
stories:{}
},

ar:{
ui:{listen:"استمع",stop:"إيقاف",read:"اقرأ",readingMode:"وضع القراءة",share:"مشاركة",copyLink:"نسخ الرابط",backToArticles:"المقالات",by:"بقلم"},
default:{
category:"أسلوب الحياة",
title:"فن العيش الجميل مع الحيوانات",
intro:"نظرة إلى الطريقة التي تغيّر بها الحيوانات منازلنا وروتيننا وفهمنا للحياة الفاخرة حقاً.",
author:"هيئة تحرير PETS & DOGUE",
date:"31 يوليو 2026",
readingTime:"6 دقائق للقراءة",
metaDescription:"اقرأ واستمع إلى القصص التحريرية من PETS & DOGUE.",
body:[
{type:"text",text:"غالباً ما توصف الفخامة من خلال الأشياء والعمارة والسفر. لكن بالنسبة إلى كثيرين فإن أثمن أشكالها هو الحضور الهادئ لحيوان."},
{type:"heading",text:"منزل مصمم للحياة الحقيقية"},
{type:"text",text:"المنزل الصديق للحيوانات يجمع بين التصميم الأنيق والعناية العملية."},
{type:"quote",text:"أكثر المنازل رسوخاً في الذاكرة تبدو حية ودافئة وشخصية."},
{type:"heading",text:"فخامة الاهتمام"},
{type:"text",text:"تفهم الحيوانات الوقت والثبات والأمان والاهتمام."},
{type:"heading",text:"أناقة بمسؤولية"},
{type:"text",text:"الفخامة المسؤولة تعني تقديم رعاية ممتازة مع احترام شخصية الحيوان الطبيعية."}
],
tags:["أسلوب الحياة","التصميم","الرفاه","الحيوانات الأليفة"]
},
sidebar:{authorTitle:"عن الكاتب",authorDescription:"تقدم هيئة تحرير PETS & DOGUE قصصاً عن رفاه الحيوانات والثقافة والموضة والسفر.",shareTitle:"شارك هذه القصة",shareDescription:"أرسل المقال إلى شخص آخر يحب الحيوانات.",clubTitle:"انضم إلى النادي",clubDescription:"شارك في مسابقات الغلاف واستفد من ميزات الأعضاء.",clubButton:"انضم إلى PETS & DOGUE"},
related:{heading:"تابع القراءة",wellnessTitle:"أنشئ روتيناً يومياً هادئاً",wellnessDescription:"طقوس بسيطة تساعد الحيوان على الشعور بالأمان.",fashionTitle:"الراحة أولاً في موضة الحيوانات",fashionDescription:"أناقة من دون تقييد الحركة.",travelTitle:"خطط لرحلة جميلة مع حيوانك",travelDescription:"النقل والفنادق والمغامرات المشتركة."},
messages:{narrationUnsupported:"متصفحك لا يدعم القراءة الصوتية.",linkCopied:"تم نسخ رابط المقال.",copyFallback:"انسخ هذا الرابط:"},
stories:{}
},

hi:{
ui:{listen:"सुनें",stop:"रोकें",read:"पढ़ें",readingMode:"रीडिंग मोड",share:"साझा करें",copyLink:"लिंक कॉपी करें",backToArticles:"लेख",by:"लेखक:"},
default:{
category:"लाइफस्टाइल",
title:"पालतू जानवरों के साथ खूबसूरती से जीने की कला",
intro:"एक नज़र कि जानवर हमारे घर, दिनचर्या और वास्तविक लक्ज़री जीवन की समझ को कैसे बदलते हैं।",
author:"PETS & DOGUE संपादकीय",
date:"31 जुलाई 2026",
readingTime:"6 मिनट पढ़ने का समय",
metaDescription:"PETS & DOGUE की संपादकीय कहानियाँ पढ़ें और सुनें।",
body:[
{type:"text",text:"लक्ज़री को अक्सर वस्तुओं, वास्तुकला और यात्रा से जोड़ा जाता है। बहुत से लोगों के लिए इसकी सबसे महत्वपूर्ण रूप जानवर की शांत उपस्थिति है।"},
{type:"heading",text:"वास्तविक जीवन के लिए बना घर"},
{type:"text",text:"सुंदर pet-friendly घर वह स्थान है जहाँ सुंदर डिजाइन और व्यावहारिक देखभाल साथ रहते हैं।"},
{type:"quote",text:"सबसे यादगार घर जीवंत, स्वागतपूर्ण और व्यक्तिगत लगते हैं।"},
{type:"heading",text:"ध्यान की लक्ज़री"},
{type:"text",text:"जानवर समय, निरंतरता, सुरक्षा और ध्यान समझते हैं।"},
{type:"heading",text:"जिम्मेदारी के साथ शैली"},
{type:"text",text:"जिम्मेदार लक्ज़री का अर्थ है जानवर की प्राकृतिक व्यक्तित्व का सम्मान करते हुए बेहतरीन देखभाल देना।"}
],
tags:["लाइफस्टाइल","डिजाइन","कल्याण","पालतू"]
},
sidebar:{authorTitle:"लेखक के बारे में",authorDescription:"PETS & DOGUE संपादकीय पशु कल्याण, संस्कृति, फैशन और यात्रा पर कहानियाँ बनाता है।",shareTitle:"यह कहानी साझा करें",shareDescription:"यह लेख किसी अन्य पशु प्रेमी को भेजें।",clubTitle:"क्लब से जुड़ें",clubDescription:"कवर प्रतियोगिताओं में भाग लें और सदस्य सुविधाएँ प्राप्त करें।",clubButton:"PETS & DOGUE से जुड़ें"},
related:{heading:"आगे पढ़ें",wellnessTitle:"शांत दैनिक दिनचर्या बनाएं",wellnessDescription:"सुरक्षा देने वाले सरल रिवाज।",fashionTitle:"पालतू फैशन में पहले आराम",fashionDescription:"प्राकृतिक गति के साथ स्टाइल।",travelTitle:"खूबसूरत pet-friendly यात्रा",travelDescription:"परिवहन, होटल और साझा अनुभव।"},
messages:{narrationUnsupported:"आपका ब्राउज़र ऑडियो पढ़ने का समर्थन नहीं करता।",linkCopied:"लेख का लिंक कॉपी किया गया।",copyFallback:"यह लिंक कॉपी करें:"},
stories:{}
}

};

/* =========================================================
STORY LOCALISATION FOR REMAINING LANGUAGES
========================================================= */

const storyTranslations = {

fr:{
photoshoot:["PHOTOGRAPHIE","Comment préparer votre animal pour une séance photo de magazine","Toilettage, lumière, confort et préparation simple peuvent transformer un portrait en image éditoriale."],
travel:["VOYAGE","L’essor du voyage de luxe pet-friendly","Les hôtels et destinations repensent le voyage premium pour les personnes qui voyagent avec leurs animaux."],
fashion:["MODE","Les nouvelles règles du style de luxe pour animaux","La mode animale moderne associe élégance, confort et design responsable."],
wellness:["BIEN-ÊTRE","Des rituels quotidiens pour un animal calme et heureux","De petites habitudes prévisibles aident les animaux à se sentir en sécurité et en confiance."],
rescue:["SAUVETAGE","Pourquoi la visibilité peut changer la vie d’un animal","Une bonne photo et une histoire exacte peuvent aider un animal à rencontrer la bonne personne."],
places:["LIEUX","Comment DOGUE Trust protège les recommandations pet-friendly","Les signalements de la communauté et la vérification permettent de garder les informations fiables."],
volunteers:["COMMUNAUTÉ","Les personnes qui aident les animaux en coulisses","Transport, accueil temporaire, photographie et petites actions peuvent changer les chances d’un animal."],
community:["COMMUNAUTÉ LOCALE","Ce que les propriétaires d’animaux recommandent près de chez vous","Les connaissances locales aident à trouver des promenades, cafés et services vraiment utiles."]
},

de:{
photoshoot:["FOTOGRAFIE","So bereiten Sie Ihr Tier auf ein Magazin-Fotoshooting vor","Pflege, Licht und Komfort können ein Porträt in ein starkes Editorialbild verwandeln."],
travel:["REISEN","Der Aufstieg luxuriöser tierfreundlicher Reisen","Hotels und Reiseziele gestalten Premiumreisen für Gäste mit Tieren neu."],
fashion:["MODE","Neue Regeln für luxuriösen Tierstil","Moderne Tiermode verbindet Stil, Komfort und verantwortungsvolles Design."],
wellness:["WOHLBEFINDEN","Tägliche Rituale für ein ruhiges und glückliches Tier","Kleine vorhersehbare Gewohnheiten geben Tieren Sicherheit und Vertrauen."],
rescue:["TIERRETTUNG","Warum Sichtbarkeit ein Tierleben verändern kann","Ein gutes Foto und eine genaue Geschichte können das richtige Zuhause näherbringen."],
places:["ORTE","Wie DOGUE Trust tierfreundliche Empfehlungen schützt","Community-Meldungen und Überprüfung halten Informationen verlässlich."],
volunteers:["COMMUNITY","Menschen, die Tieren hinter den Kulissen helfen","Transport, Pflegestellen und kleine Aufgaben können große Wirkung haben."],
community:["LOKALE COMMUNITY","Was Tierhalter in Ihrer Nähe empfehlen","Lokales Wissen hilft bei Spazierwegen, Cafés und zuverlässigen Services."]
},

es:{
photoshoot:["FOTOGRAFÍA","Cómo preparar a tu mascota para una sesión de revista","Aseo, luz y comodidad pueden convertir un retrato en una imagen editorial."],
travel:["VIAJES","El auge de los viajes de lujo pet-friendly","Hoteles y destinos están rediseñando el turismo premium para huéspedes con animales."],
fashion:["MODA","Nuevas reglas del estilo de lujo para mascotas","La moda moderna para mascotas combina estilo, comodidad y diseño responsable."],
wellness:["BIENESTAR","Rituales diarios para una mascota tranquila y feliz","Pequeños hábitos predecibles ayudan a que los animales se sientan seguros."],
rescue:["RESCATE","Por qué la visibilidad puede cambiar la vida de un animal","Una buena foto y una historia precisa pueden ayudar a encontrar a la persona adecuada."],
places:["LUGARES","Cómo DOGUE Trust protege las recomendaciones pet-friendly","Los informes y la verificación mantienen la información útil y fiable."],
volunteers:["COMUNIDAD","Las personas que ayudan a los animales entre bastidores","Transporte, acogida y pequeñas acciones pueden cambiar las posibilidades de un animal."],
community:["COMUNIDAD LOCAL","Lo que recomiendan los dueños de mascotas cerca de ti","El conocimiento local ayuda a encontrar paseos, cafés y servicios útiles."]
},

it:{
photoshoot:["FOTOGRAFIA","Come preparare il tuo animale per un servizio fotografico da rivista","Toelettatura, luce e comfort possono trasformare un ritratto in un’immagine editoriale."],
travel:["VIAGGI","La crescita dei viaggi di lusso pet-friendly","Hotel e destinazioni stanno ripensando il turismo premium per chi viaggia con animali."],
fashion:["MODA","Le nuove regole dello stile di lusso per animali","La moda pet moderna unisce stile, comfort e design responsabile."],
wellness:["BENESSERE","Rituali quotidiani per un animale calmo e felice","Piccole abitudini prevedibili aiutano gli animali a sentirsi sicuri."],
rescue:["SALVATAGGIO","Perché la visibilità può cambiare la vita di un animale","Una buona foto e una storia accurata possono avvicinare l’animale alla persona giusta."],
places:["LUOGHI","Come DOGUE Trust protegge i consigli pet-friendly","Segnalazioni e verifiche aiutano a mantenere le informazioni affidabili."],
volunteers:["COMUNITÀ","Le persone che aiutano gli animali dietro le quinte","Trasporti, stalli e piccole azioni possono cambiare le possibilità di un animale."],
community:["COMUNITÀ LOCALE","Cosa consigliano i proprietari di animali vicino a te","La conoscenza locale aiuta a trovare passeggiate, locali e servizi utili."]
},

pt:{
photoshoot:["FOTOGRAFIA","Como preparar o seu animal para uma sessão fotográfica de revista","Cuidados, luz e conforto podem transformar um retrato numa imagem editorial."],
travel:["VIAGENS","A ascensão das viagens de luxo pet-friendly","Hotéis e destinos estão a repensar o turismo premium para quem viaja com animais."],
fashion:["MODA","Novas regras do estilo de luxo para animais","A moda animal moderna combina estilo, conforto e design responsável."],
wellness:["BEM-ESTAR","Rituais diários para um animal calmo e feliz","Pequenos hábitos previsíveis ajudam os animais a sentirem-se seguros."],
rescue:["RESGATE","Porque a visibilidade pode mudar a vida de um animal","Uma boa fotografia e uma história correta podem aproximar o animal da pessoa certa."],
places:["LOCAIS","Como o DOGUE Trust protege recomendações pet-friendly","Relatos e verificações mantêm as informações fiáveis."],
volunteers:["COMUNIDADE","As pessoas que ajudam animais nos bastidores","Transportes, acolhimento e pequenas ações podem mudar completamente as hipóteses de um animal."],
community:["COMUNIDADE LOCAL","O que os donos de animais recomendam perto de si","O conhecimento local ajuda a encontrar passeios, cafés e serviços úteis."]
},

nl:{
photoshoot:["FOTOGRAFIE","Zo bereidt u uw huisdier voor op een magazinefotoshoot","Verzorging, licht en comfort kunnen een portret veranderen in een redactioneel beeld."],
travel:["REIZEN","De opkomst van luxe huisdiervriendelijke reizen","Hotels en bestemmingen herontwerpen premium reizen voor gasten met dieren."],
fashion:["MODE","Nieuwe regels voor luxe huisdierenstijl","Moderne huisdierenmode combineert stijl, comfort en verantwoord design."],
wellness:["WELZIJN","Dagelijkse rituelen voor een rustig en gelukkig huisdier","Kleine voorspelbare gewoonten geven dieren veiligheid en vertrouwen."],
rescue:["REDDING","Waarom zichtbaarheid het leven van een dier kan veranderen","Een goede foto en een juist verhaal kunnen helpen de juiste persoon te vinden."],
places:["PLEKKEN","Hoe DOGUE Trust huisdiervriendelijke aanbevelingen beschermt","Communitymeldingen en controle houden informatie betrouwbaar."],
volunteers:["COMMUNITY","De mensen die achter de schermen dieren helpen","Vervoer, opvang en kleine acties kunnen de kansen van een dier veranderen."],
community:["LOKALE COMMUNITY","Wat huisdiereigenaren bij u in de buurt aanbevelen","Lokale kennis helpt bij wandelingen, cafés en betrouwbare services."]
},

pl:{
photoshoot:["FOTOGRAFIA","Jak przygotować pupila do sesji zdjęciowej dla magazynu","Pielęgnacja, światło i komfort pomagają stworzyć prawdziwy portret redakcyjny."],
travel:["PODRÓŻE","Rozwój luksusowych podróży przyjaznych zwierzętom","Hotele i kierunki zmieniają podróże premium dla gości ze zwierzętami."],
fashion:["MODA","Nowe zasady luksusowego stylu dla zwierząt","Nowoczesna moda dla zwierząt łączy styl, komfort i odpowiedzialny projekt."],
wellness:["DOBROSTAN","Codzienne rytuały dla spokojnego i szczęśliwego pupila","Małe przewidywalne nawyki pomagają zwierzętom czuć się bezpiecznie."],
rescue:["RATUNEK","Dlaczego widoczność może zmienić życie zwierzęcia","Dobre zdjęcie i rzetelna historia pomagają znaleźć właściwą osobę."],
places:["MIEJSCA","Jak DOGUE Trust chroni rekomendacje miejsc przyjaznych zwierzętom","Zgłoszenia społeczności i weryfikacja utrzymują informacje aktualne."],
volunteers:["SPOŁECZNOŚĆ","Ludzie pomagający zwierzętom za kulisami","Transport, domy tymczasowe i małe działania mogą zmienić szanse zwierzęcia."],
community:["LOKALNA SPOŁECZNOŚĆ","Co właściciele zwierząt polecają w pobliżu","Lokalna wiedza pomaga znaleźć spacery, kawiarnie i przydatne usługi."]
},

cs:{
photoshoot:["FOTOGRAFIE","Jak připravit mazlíčka na focení pro magazín","Péče, světlo a pohodlí pomohou vytvořit profesionální redakční portrét."],
travel:["CESTOVÁNÍ","Vzestup luxusního cestování se zvířaty","Hotely a destinace mění prémiové cestování pro hosty se zvířaty."],
fashion:["MÓDA","Nová pravidla luxusního stylu pro zvířata","Moderní móda pro zvířata spojuje styl, pohodlí a odpovědný design."],
wellness:["POHODA","Denní rituály pro klidného a šťastného mazlíčka","Malé předvídatelné návyky dávají zvířatům pocit bezpečí."],
rescue:["ZÁCHRANA","Proč může viditelnost změnit život zvířete","Dobrá fotografie a přesný příběh mohou pomoci najít správného člověka."],
places:["MÍSTA","Jak DOGUE Trust chrání doporučení pet-friendly míst","Hlášení komunity a kontrola udržují informace spolehlivé."],
volunteers:["KOMUNITA","Lidé, kteří pomáhají zvířatům v zákulisí","Doprava, dočasná péče a malé úkoly mohou změnit šance zvířete."],
community:["MÍSTNÍ KOMUNITA","Co doporučují majitelé zvířat ve vašem okolí","Místní znalosti pomáhají najít procházky, kavárny a užitečné služby."]
},

sk:{
photoshoot:["FOTOGRAFIA","Ako pripraviť miláčika na fotografovanie pre magazín","Úprava, svetlo a pohodlie pomôžu vytvoriť profesionálny redakčný portrét."],
travel:["CESTOVANIE","Vzostup luxusného cestovania so zvieratami","Hotely a destinácie menia prémiové cestovanie pre hostí so zvieratami."],
fashion:["MÓDA","Nové pravidlá luxusného štýlu pre zvieratá","Moderná zvieracia móda spája štýl, pohodlie a zodpovedný dizajn."],
wellness:["POHODA","Denné rituály pre pokojného a šťastného miláčika","Malé predvídateľné návyky pomáhajú zvieratám cítiť sa bezpečne."],
rescue:["ZÁCHRANA","Prečo môže viditeľnosť zmeniť život zvieraťa","Dobrá fotografia a presný príbeh môžu pomôcť nájsť správneho človeka."],
places:["MIESTA","Ako DOGUE Trust chráni odporúčania pet-friendly miest","Hlásenia komunity a kontrola udržiavajú informácie spoľahlivé."],
volunteers:["KOMUNITA","Ľudia, ktorí pomáhajú zvieratám v zákulisí","Doprava, dočasná starostlivosť a malé úlohy môžu zmeniť šance zvieraťa."],
community:["MIESTNA KOMUNITA","Čo odporúčajú majitelia zvierat vo vašom okolí","Miestne znalosti pomáhajú nájsť prechádzky, kaviarne a užitočné služby."]
},

hu:{
photoshoot:["FOTÓZÁS","Hogyan készítse fel kedvencét egy magazinfotózásra","Ápolás, fény és kényelem segítségével valódi szerkesztőségi portré készülhet."],
travel:["UTAZÁS","A luxus állatbarát utazások térnyerése","Szállodák és úti célok alakítják át a prémium utazást az állatokkal érkezők számára."],
fashion:["DIVAT","A luxus állatstílus új szabályai","A modern állatdivat a stílust, kényelmet és felelős tervezést ötvözi."],
wellness:["JÓLLÉT","Napi rituálék egy nyugodt és boldog kedvencért","A kiszámítható szokások biztonságot és nyugalmat adnak."],
rescue:["MENTÉS","Miért változtathatja meg a láthatóság egy állat életét","Egy jó fotó és pontos történet segíthet megtalálni a megfelelő embert."],
places:["HELYEK","Hogyan védi a DOGUE Trust az állatbarát ajánlásokat","A közösségi jelentések és ellenőrzések megbízhatóbbá teszik az információkat."],
volunteers:["KÖZÖSSÉG","Az emberek, akik a háttérben segítik az állatokat","Szállítás, ideiglenes befogadás és kis feladatok teljesen megváltoztathatják az esélyeket."],
community:["HELYI KÖZÖSSÉG","Mit ajánlanak az állattartók a közelben","A helyi tudás segít sétákat, kávézókat és hasznos szolgáltatásokat találni."]
},

ro:{
photoshoot:["FOTOGRAFIE","Cum să pregătiți animalul pentru o ședință foto de revistă","Îngrijirea, lumina și confortul pot transforma un portret într-o imagine editorială."],
travel:["CĂLĂTORII","Ascensiunea călătoriilor de lux pet-friendly","Hotelurile și destinațiile regândesc turismul premium pentru oaspeții cu animale."],
fashion:["MODĂ","Noile reguli ale stilului de lux pentru animale","Moda modernă pentru animale combină stilul, confortul și designul responsabil."],
wellness:["BUNĂSTARE","Ritualuri zilnice pentru un animal calm și fericit","Obiceiurile mici și previzibile ajută animalele să se simtă în siguranță."],
rescue:["SALVARE","De ce vizibilitatea poate schimba viața unui animal","O fotografie bună și o poveste corectă pot ajuta la găsirea persoanei potrivite."],
places:["LOCURI","Cum protejează DOGUE Trust recomandările pet-friendly","Raportările comunității și verificarea păstrează informațiile de încredere."],
volunteers:["COMUNITATE","Oamenii care ajută animalele din culise","Transportul, găzduirea temporară și acțiunile mici pot schimba șansele unui animal."],
community:["COMUNITATE LOCALĂ","Ce recomandă proprietarii de animale din apropiere","Cunoștințele locale ajută la găsirea plimbărilor, cafenelelor și serviciilor utile."]
},

bg:{
photoshoot:["ФОТОГРАФИЯ","Как да подготвите любимеца си за фотосесия за списание","Грижа, светлина и комфорт могат да превърнат портрета в редакционен кадър."],
travel:["ПЪТУВАНИЯ","Възходът на луксозните pet-friendly пътувания","Хотели и дестинации променят премиум пътуването за гости с животни."],
fashion:["МОДА","Новите правила на луксозния стил за любимци","Модерната мода за животни съчетава стил, комфорт и отговорен дизайн."],
wellness:["БЛАГОПОЛУЧИЕ","Ежедневни ритуали за спокоен и щастлив любимец","Малките предвидими навици помагат на животните да се чувстват сигурни."],
rescue:["СПАСЯВАНЕ","Защо видимостта може да промени живота на животно","Добра снимка и точна история могат да помогнат да се намери правилният човек."],
places:["МЕСТА","Как DOGUE Trust защитава pet-friendly препоръките","Сигналите от общността и проверката поддържат информацията надеждна."],
volunteers:["ОБЩНОСТ","Хората, които помагат на животните зад кулисите","Транспортът, временните домове и малките задачи могат да променят шансовете."],
community:["МЕСТНА ОБЩНОСТ","Какво препоръчват собствениците на животни близо до вас","Местният опит помага да се намират разходки, кафенета и полезни услуги."]
},

el:{
photoshoot:["ΦΩΤΟΓΡΑΦΙΑ","Πώς να προετοιμάσετε το κατοικίδιό σας για φωτογράφιση περιοδικού","Περιποίηση, φωτισμός και άνεση μπορούν να δημιουργήσουν ένα editorial πορτρέτο."],
travel:["ΤΑΞΙΔΙΑ","Η άνοδος των πολυτελών pet-friendly ταξιδιών","Ξενοδοχεία και προορισμοί επανασχεδιάζουν το premium ταξίδι για επισκέπτες με ζώα."],
fashion:["ΜΟΔΑ","Οι νέοι κανόνες του πολυτελούς στυλ για κατοικίδια","Η σύγχρονη μόδα κατοικιδίων συνδυάζει στυλ, άνεση και υπεύθυνο σχεδιασμό."],
wellness:["ΕΥΕΞΙΑ","Καθημερινές συνήθειες για ένα ήρεμο και χαρούμενο κατοικίδιο","Μικρές προβλέψιμες συνήθειες βοηθούν τα ζώα να νιώθουν ασφαλή."],
rescue:["ΔΙΑΣΩΣΗ","Γιατί η προβολή μπορεί να αλλάξει τη ζωή ενός ζώου","Μια καλή φωτογραφία και μια ακριβής ιστορία μπορούν να βοηθήσουν να βρεθεί ο σωστός άνθρωπος."],
places:["ΜΕΡΗ","Πώς το DOGUE Trust προστατεύει τις pet-friendly προτάσεις","Οι αναφορές της κοινότητας και η επαλήθευση κρατούν τις πληροφορίες αξιόπιστες."],
volunteers:["ΚΟΙΝΟΤΗΤΑ","Οι άνθρωποι που βοηθούν τα ζώα στα παρασκήνια","Μεταφορές, φιλοξενία και μικρές πράξεις μπορούν να αλλάξουν τις πιθανότητες ενός ζώου."],
community:["ΤΟΠΙΚΗ ΚΟΙΝΟΤΗΤΑ","Τι προτείνουν οι ιδιοκτήτες ζώων κοντά σας","Η τοπική γνώση βοηθά να βρείτε βόλτες, καφέ και χρήσιμες υπηρεσίες."]
},

sv:{
photoshoot:["FOTOGRAFI","Så förbereder du ditt husdjur för en magasinplåtning","Pälsvård, ljus och komfort kan förvandla ett porträtt till en redaktionell bild."],
travel:["RESOR","Lyxiga djurvänliga resor växer","Hotell och destinationer gör om premiumresor för gäster med djur."],
fashion:["MODE","Nya regler för lyxig djurstil","Modern djurmode kombinerar stil, komfort och ansvarsfull design."],
wellness:["VÄLMÅENDE","Dagliga ritualer för ett lugnt och lyckligt husdjur","Små förutsägbara vanor hjälper djur att känna sig trygga."],
rescue:["RÄDDNING","Varför synlighet kan förändra ett djurs liv","En bra bild och en korrekt berättelse kan hjälpa rätt person att upptäcka djuret."],
places:["PLATSER","Så skyddar DOGUE Trust djurvänliga rekommendationer","Communityrapporter och verifiering håller informationen pålitlig."],
volunteers:["COMMUNITY","Människorna som hjälper djur bakom kulisserna","Transport, jourhem och små handlingar kan förändra ett djurs chanser."],
community:["LOKAL COMMUNITY","Vad djurägare nära dig rekommenderar","Lokal kunskap hjälper till att hitta promenader, caféer och användbara tjänster."]
},

da:{
photoshoot:["FOTOGRAFI","Sådan forbereder du dit kæledyr til en magasinfotografering","Pleje, lys og komfort kan skabe et redaktionelt portræt."],
travel:["REJSER","Fremgangen for luksuriøse kæledyrsvenlige rejser","Hoteller og destinationer ændrer premiumrejser for gæster med dyr."],
fashion:["MODE","Nye regler for luksuriøs kæledyrsstil","Moderne kæledyrsmode kombinerer stil, komfort og ansvarligt design."],
wellness:["TRIVSEL","Daglige ritualer for et roligt og glad kæledyr","Små forudsigelige vaner hjælper dyr med at føle sig trygge."],
rescue:["REDNING","Hvorfor synlighed kan ændre et dyrs liv","Et godt billede og en korrekt historie kan hjælpe den rette person med at opdage dyret."],
places:["STEDER","Sådan beskytter DOGUE Trust kæledyrsvenlige anbefalinger","Indberetninger og kontrol hjælper med at holde information pålidelig."],
volunteers:["FÆLLESSKAB","Menneskene der hjælper dyr bag kulisserne","Transport, plejefamilier og små handlinger kan ændre et dyrs chancer."],
community:["LOKALT FÆLLESSKAB","Hvad kæledyrsejere i nærheden anbefaler","Lokal viden hjælper med at finde ture, caféer og nyttige tjenester."]
},

no:{
photoshoot:["FOTOGRAFERING","Slik forbereder du kjæledyret ditt til en magasinshoot","Stell, lys og komfort kan skape et ekte redaksjonelt portrett."],
travel:["REISER","Veksten i luksuriøse kjæledyrvennlige reiser","Hoteller og reisemål endrer premiumreiser for gjester med dyr."],
fashion:["MOTE","Nye regler for luksuriøs kjæledyrstil","Moderne kjæledyrmote kombinerer stil, komfort og ansvarlig design."],
wellness:["TRIVSEL","Daglige ritualer for et rolig og lykkelig kjæledyr","Små forutsigbare vaner hjelper dyr med å føle seg trygge."],
rescue:["REDNING","Hvorfor synlighet kan endre et dyrs liv","Et godt bilde og en korrekt historie kan hjelpe riktig person med å oppdage dyret."],
places:["STEDER","Slik beskytter DOGUE Trust kjæledyrvennlige anbefalinger","Rapporter og verifisering bidrar til å holde informasjon pålitelig."],
volunteers:["FELLESSKAP","Menneskene som hjelper dyr bak kulissene","Transport, fosterhjem og små handlinger kan endre et dyrs muligheter."],
community:["LOKALT FELLESSKAP","Hva dyreeiere i nærheten anbefaler","Lokal kunnskap hjelper med å finne turer, kaféer og nyttige tjenester."]
},

fi:{
photoshoot:["VALOKUVAUS","Näin valmistelet lemmikkisi lehtikuvaukseen","Hoito, valo ja mukavuus auttavat luomaan toimituksellisen muotokuvan."],
travel:["MATKAILU","Ylellisen lemmikkiystävällisen matkailun kasvu","Hotellit ja kohteet uudistavat premium-matkailua eläinten kanssa matkustaville."],
fashion:["MUOTI","Lemmikkien luksustyylin uudet säännöt","Moderni lemmikkimuoti yhdistää tyylin, mukavuuden ja vastuullisen suunnittelun."],
wellness:["HYVINVOINTI","Päivittäiset rituaalit rauhalliselle ja onnelliselle lemmikille","Pienet ennakoitavat tavat auttavat eläimiä tuntemaan olonsa turvalliseksi."],
rescue:["PELASTUS","Miksi näkyvyys voi muuttaa eläimen elämän","Hyvä kuva ja oikea tarina voivat auttaa oikeaa ihmistä löytämään eläimen."],
places:["PAIKAT","Näin DOGUE Trust suojaa lemmikkiystävällisiä suosituksia","Yhteisön ilmoitukset ja tarkistukset pitävät tiedot luotettavina."],
volunteers:["YHTEISÖ","Ihmiset, jotka auttavat eläimiä kulissien takana","Kuljetus, sijaiskodit ja pienet teot voivat muuttaa eläimen mahdollisuuksia."],
community:["PAIKALLINEN YHTEISÖ","Mitä lemmikinomistajat suosittelevat lähelläsi","Paikallinen tieto auttaa löytämään kävelyreittejä, kahviloita ja hyödyllisiä palveluja."]
},

tr:{
photoshoot:["FOTOĞRAFÇILIK","Evcil Hayvanınızı Dergi Çekimine Nasıl Hazırlarsınız","Bakım, ışık ve konfor gerçek bir editoryal portre yaratabilir."],
travel:["SEYAHAT","Evcil Hayvan Dostu Lüks Seyahatin Yükselişi","Oteller ve destinasyonlar hayvanlarla seyahat eden misafirler için premium deneyimleri yeniden tasarlıyor."],
fashion:["MODA","Evcil Hayvanlar İçin Lüks Stilin Yeni Kuralları","Modern evcil hayvan modası stil, konfor ve sorumlu tasarımı birleştiriyor."],
wellness:["REFAH","Sakin ve Mutlu Bir Evcil Hayvan İçin Günlük Ritüeller","Küçük ve öngörülebilir alışkanlıklar hayvanların güvende hissetmesine yardımcı olur."],
rescue:["KURTARMA","Görünürlük Bir Hayvanın Hayatını Neden Değiştirebilir","İyi bir fotoğraf ve doğru bir hikâye doğru kişinin hayvanı fark etmesini sağlayabilir."],
places:["MEKÂNLAR","DOGUE Trust Evcil Hayvan Dostu Önerileri Nasıl Korur","Topluluk bildirimleri ve doğrulama bilgileri güvenilir tutar."],
volunteers:["TOPLULUK","Perde Arkasında Hayvanlara Yardım Eden İnsanlar","Ulaşım, geçici yuva ve küçük görevler bir hayvanın şansını değiştirebilir."],
community:["YEREL TOPLULUK","Yakınınızdaki Evcil Hayvan Sahipleri Ne Öneriyor","Yerel bilgi yürüyüşler, kafeler ve faydalı hizmetleri bulmaya yardımcı olur."]
},

ar:{
photoshoot:["التصوير","كيف تجهّز حيوانك الأليف لجلسة تصوير لمجلة","العناية والإضاءة والراحة يمكن أن تحول الصورة إلى بورتريه تحريري احترافي."],
travel:["السفر","صعود السفر الفاخر الصديق للحيوانات","تعيد الفنادق والوجهات تصميم التجارب الراقية للضيوف الذين يسافرون مع حيواناتهم."],
fashion:["الموضة","القواعد الجديدة للأناقة الفاخرة للحيوانات","تجمع موضة الحيوانات الحديثة بين الأناقة والراحة والتصميم المسؤول."],
wellness:["الرفاه","طقوس يومية لحيوان هادئ وسعيد","تساعد العادات الصغيرة والمتوقعة الحيوانات على الشعور بالأمان."],
rescue:["الإنقاذ","لماذا يمكن للظهور أن يغيّر حياة حيوان","يمكن لصورة جيدة وقصة دقيقة أن تساعد الشخص المناسب على اكتشاف الحيوان."],
places:["الأماكن","كيف يحمي DOGUE Trust توصيات الأماكن الصديقة للحيوانات","تساعد تقارير المجتمع والتحقق في إبقاء المعلومات موثوقة."],
volunteers:["المجتمع","الأشخاص الذين يساعدون الحيوانات خلف الكواليس","النقل والاستضافة المؤقتة والمهام الصغيرة قد تغيّر فرص الحيوان."],
community:["المجتمع المحلي","ما الذي يوصي به أصحاب الحيوانات بالقرب منك","تساعد المعرفة المحلية في العثور على مسارات ومقاهٍ وخدمات مفيدة."]
},

hi:{
photoshoot:["फोटोग्राफी","पत्रिका फोटोशूट के लिए अपने पालतू को कैसे तैयार करें","देखभाल, रोशनी और आराम एक पोर्ट्रेट को संपादकीय तस्वीर में बदल सकते हैं।"],
travel:["यात्रा","पालतू जानवरों के साथ लक्ज़री यात्रा का बढ़ता चलन","होटल और गंतव्य जानवरों के साथ आने वाले मेहमानों के लिए प्रीमियम यात्रा को नया रूप दे रहे हैं।"],
fashion:["फैशन","पालतू जानवरों के लिए लक्ज़री स्टाइल के नए नियम","आधुनिक पालतू फैशन स्टाइल, आराम और जिम्मेदार डिजाइन को जोड़ता है।"],
wellness:["कल्याण","शांत और खुश पालतू के लिए दैनिक रिवाज","छोटी और नियमित आदतें जानवरों को सुरक्षित महसूस करने में मदद करती हैं।"],
rescue:["बचाव","दिखाई देना किसी जानवर की जिंदगी क्यों बदल सकता है","अच्छी तस्वीर और सही कहानी सही व्यक्ति को जानवर तक पहुँचा सकती है।"],
places:["स्थान","DOGUE Trust pet-friendly सुझावों की सुरक्षा कैसे करता है","समुदाय की रिपोर्ट और सत्यापन जानकारी को उपयोगी और भरोसेमंद बनाए रखते हैं।"],
volunteers:["समुदाय","पर्दे के पीछे जानवरों की मदद करने वाले लोग","परिवहन, अस्थायी घर और छोटे काम किसी जानवर की संभावनाएँ बदल सकते हैं।"],
community:["स्थानीय समुदाय","आपके पास पालतू मालिक क्या सलाह देते हैं","स्थानीय जानकारी अच्छी सैर, कैफ़े और उपयोगी सेवाएँ खोजने में मदद करती है।"]
}

};

/* =========================================================
BUILD COMPLETE STORY OBJECTS
FOR ALL REMAINING LANGUAGES
========================================================= */

const localeAuthors = {
fr:"La rédaction PETS & DOGUE",
de:"PETS & DOGUE Redaktion",
es:"Redacción PETS & DOGUE",
it:"PETS & DOGUE Editorial",
pt:"PETS & DOGUE Editorial",
nl:"PETS & DOGUE Editorial",
pl:"Redakcja PETS & DOGUE",
cs:"Redakce PETS & DOGUE",
sk:"Redakcia PETS & DOGUE",
hu:"PETS & DOGUE szerkesztőség",
ro:"Redacția PETS & DOGUE",
bg:"Редакцията на PETS & DOGUE",
el:"Σύνταξη PETS & DOGUE",
sv:"PETS & DOGUE Editorial",
da:"PETS & DOGUE Editorial",
no:"PETS & DOGUE Editorial",
fi:"PETS & DOGUE -toimitus",
tr:"PETS & DOGUE Editoryal",
ar:"هيئة تحرير PETS & DOGUE",
hi:"PETS & DOGUE संपादकीय"
};

const localeDates = {
fr:"13 août 2026",
de:"13. August 2026",
es:"13 de agosto de 2026",
it:"13 agosto 2026",
pt:"13 de agosto de 2026",
nl:"13 augustus 2026",
pl:"13 sierpnia 2026",
cs:"13. srpna 2026",
sk:"13. augusta 2026",
hu:"2026. augusztus 13.",
ro:"13 august 2026",
bg:"13 август 2026",
el:"13 Αυγούστου 2026",
sv:"13 augusti 2026",
da:"13. august 2026",
no:"13. august 2026",
fi:"13. elokuuta 2026",
tr:"13 Ağustos 2026",
ar:"13 أغسطس 2026",
hi:"13 अगस्त 2026"
};

const localeReadTimes = {
fr:"5 min de lecture",
de:"5 Min. Lesezeit",
es:"5 min de lectura",
it:"5 min di lettura",
pt:"5 min de leitura",
nl:"5 min leestijd",
pl:"5 min czytania",
cs:"5 min čtení",
sk:"5 min čítania",
hu:"5 perc olvasás",
ro:"5 min de citit",
bg:"5 мин четене",
el:"5 λεπτά ανάγνωσης",
sv:"5 min läsning",
da:"5 min læsning",
no:"5 min lesing",
fi:"5 min lukuaika",
tr:"5 dk okuma",
ar:"5 دقائق للقراءة",
hi:"5 मिनट पढ़ने का समय"
};

const genericBodies = {

fr:[
{type:"text",text:"Chaque animal est différent. Une bonne expérience commence par l’observation de ses besoins, de son tempérament et de son confort."},
{type:"heading",text:"Le confort avant tout"},
{type:"text",text:"Les meilleures décisions sont celles qui respectent la santé, les mouvements naturels et le rythme de l’animal."},
{type:"quote",text:"Le véritable luxe commence par une attention responsable."},
{type:"heading",text:"Une approche réfléchie"},
{type:"text",text:"Des informations claires, des choix adaptés et une attention régulière créent une expérience plus sûre et plus agréable."}
],

de:[
{type:"text",text:"Jedes Tier ist anders. Eine gute Erfahrung beginnt damit, Gesundheit, Temperament und Komfort aufmerksam zu berücksichtigen."},
{type:"heading",text:"Komfort zuerst"},
{type:"text",text:"Die besten Entscheidungen respektieren natürliche Bewegung, Sicherheit und den individuellen Rhythmus des Tieres."},
{type:"quote",text:"Echter Luxus beginnt mit verantwortungsvoller Aufmerksamkeit."},
{type:"heading",text:"Ein durchdachter Ansatz"},
{type:"text",text:"Klare Informationen und passende Entscheidungen schaffen ein sichereres und angenehmeres Erlebnis."}
],

es:[
{type:"text",text:"Cada animal es diferente. Una buena experiencia comienza observando su salud, temperamento y comodidad."},
{type:"heading",text:"La comodidad primero"},
{type:"text",text:"Las mejores decisiones respetan el movimiento natural, la seguridad y el ritmo individual del animal."},
{type:"quote",text:"El verdadero lujo comienza con una atención responsable."},
{type:"heading",text:"Un enfoque cuidado"},
{type:"text",text:"La información clara y las decisiones adecuadas crean una experiencia más segura y agradable."}
],

it:[
{type:"text",text:"Ogni animale è diverso. Una buona esperienza parte dall’attenzione alla salute, al carattere e al comfort."},
{type:"heading",text:"Comfort prima di tutto"},
{type:"text",text:"Le scelte migliori rispettano movimento naturale, sicurezza e ritmo individuale."},
{type:"quote",text:"Il vero lusso inizia da un’attenzione responsabile."},
{type:"heading",text:"Un approccio attento"},
{type:"text",text:"Informazioni chiare e scelte adatte rendono l’esperienza più sicura e piacevole."}
],

pt:[
{type:"text",text:"Cada animal é diferente. Uma boa experiência começa por compreender a sua saúde, temperamento e conforto."},
{type:"heading",text:"Conforto primeiro"},
{type:"text",text:"As melhores escolhas respeitam o movimento natural, a segurança e o ritmo individual."},
{type:"quote",text:"O verdadeiro luxo começa com atenção responsável."},
{type:"heading",text:"Uma abordagem cuidada"},
{type:"text",text:"Informação clara e escolhas adequadas tornam a experiência mais segura e agradável."}
],

nl:[
{type:"text",text:"Elk dier is anders. Een goede ervaring begint met aandacht voor gezondheid, temperament en comfort."},
{type:"heading",text:"Comfort eerst"},
{type:"text",text:"De beste keuzes respecteren natuurlijke beweging, veiligheid en het individuele ritme van het dier."},
{type:"quote",text:"Echte luxe begint met verantwoorde aandacht."},
{type:"heading",text:"Een doordachte aanpak"},
{type:"text",text:"Duidelijke informatie en passende keuzes maken de ervaring veiliger en prettiger."}
],

pl:[
{type:"text",text:"Każde zwierzę jest inne. Dobre doświadczenie zaczyna się od uwzględnienia zdrowia, charakteru i komfortu."},
{type:"heading",text:"Komfort przede wszystkim"},
{type:"text",text:"Najlepsze decyzje szanują naturalny ruch, bezpieczeństwo i indywidualny rytm zwierzęcia."},
{type:"quote",text:"Prawdziwy luksus zaczyna się od odpowiedzialnej uwagi."},
{type:"heading",text:"Przemyślane podejście"},
{type:"text",text:"Jasne informacje i odpowiednie wybory tworzą bezpieczniejsze i przyjemniejsze doświadczenie."}
],

cs:[
{type:"text",text:"Každé zvíře je jiné. Dobrá zkušenost začíná respektem ke zdraví, povaze a pohodlí."},
{type:"heading",text:"Pohodlí především"},
{type:"text",text:"Nejlepší rozhodnutí respektují přirozený pohyb, bezpečí a individuální rytmus zvířete."},
{type:"quote",text:"Skutečný luxus začíná odpovědnou pozorností."},
{type:"heading",text:"Promyšlený přístup"},
{type:"text",text:"Jasné informace a vhodná rozhodnutí vytvářejí bezpečnější a příjemnější zkušenost."}
],

sk:[
{type:"text",text:"Každé zviera je iné. Dobrá skúsenosť začína rešpektom k zdraviu, povahe a pohodliu."},
{type:"heading",text:"Pohodlie na prvom mieste"},
{type:"text",text:"Najlepšie rozhodnutia rešpektujú prirodzený pohyb, bezpečnosť a individuálny rytmus zvieraťa."},
{type:"quote",text:"Skutočný luxus sa začína zodpovednou pozornosťou."},
{type:"heading",text:"Premyslený prístup"},
{type:"text",text:"Jasné informácie a vhodné rozhodnutia vytvárajú bezpečnejšiu a príjemnejšiu skúsenosť."}
],

hu:[
{type:"text",text:"Minden állat más. A jó élmény az egészség, a temperamentum és a kényelem figyelembevételével kezdődik."},
{type:"heading",text:"Kényelem az első"},
{type:"text",text:"A legjobb döntések tiszteletben tartják a természetes mozgást, a biztonságot és az egyéni ritmust."},
{type:"quote",text:"Az igazi luxus felelős figyelemmel kezdődik."},
{type:"heading",text:"Átgondolt megközelítés"},
{type:"text",text:"A világos információ és a megfelelő választás biztonságosabb és kellemesebb élményt teremt."}
],

ro:[
{type:"text",text:"Fiecare animal este diferit. O experiență bună începe cu atenție la sănătate, temperament și confort."},
{type:"heading",text:"Confortul pe primul loc"},
{type:"text",text:"Cele mai bune decizii respectă mișcarea naturală, siguranța și ritmul individual."},
{type:"quote",text:"Luxul adevărat începe cu atenție responsabilă."},
{type:"heading",text:"O abordare atentă"},
{type:"text",text:"Informațiile clare și alegerile potrivite creează o experiență mai sigură și mai plăcută."}
],

bg:[
{type:"text",text:"Всяко животно е различно. Доброто преживяване започва с внимание към здравето, характера и комфорта."},
{type:"heading",text:"Комфортът първо"},
{type:"text",text:"Най-добрите решения уважават естественото движение, безопасността и индивидуалния ритъм."},
{type:"quote",text:"Истинският лукс започва с отговорно внимание."},
{type:"heading",text:"Обмислен подход"},
{type:"text",text:"Ясната информация и правилните решения създават по-безопасно и приятно преживяване."}
],

el:[
{type:"text",text:"Κάθε ζώο είναι διαφορετικό. Μια καλή εμπειρία αρχίζει με προσοχή στην υγεία, τον χαρακτήρα και την άνεση."},
{type:"heading",text:"Η άνεση πρώτα"},
{type:"text",text:"Οι καλύτερες επιλογές σέβονται τη φυσική κίνηση, την ασφάλεια και τον ατομικό ρυθμό."},
{type:"quote",text:"Η αληθινή πολυτέλεια αρχίζει με υπεύθυνη προσοχή."},
{type:"heading",text:"Προσεγμένη προσέγγιση"},
{type:"text",text:"Οι σαφείς πληροφορίες και οι σωστές επιλογές δημιουργούν μια ασφαλέστερη και πιο ευχάριστη εμπειρία."}
],

sv:[
{type:"text",text:"Varje djur är unikt. En bra upplevelse börjar med hänsyn till hälsa, temperament och komfort."},
{type:"heading",text:"Komfort först"},
{type:"text",text:"De bästa valen respekterar naturlig rörelse, trygghet och djurets individuella rytm."},
{type:"quote",text:"Äkta lyx börjar med ansvarsfull uppmärksamhet."},
{type:"heading",text:"Ett genomtänkt förhållningssätt"},
{type:"text",text:"Tydlig information och rätt val skapar en säkrare och trevligare upplevelse."}
],

da:[
{type:"text",text:"Hvert dyr er forskelligt. En god oplevelse begynder med hensyn til helbred, temperament og komfort."},
{type:"heading",text:"Komfort først"},
{type:"text",text:"De bedste valg respekterer naturlig bevægelse, sikkerhed og dyrets individuelle rytme."},
{type:"quote",text:"Ægte luksus begynder med ansvarlig opmærksomhed."},
{type:"heading",text:"En gennemtænkt tilgang"},
{type:"text",text:"Klar information og passende valg skaber en sikrere og mere behagelig oplevelse."}
],

no:[
{type:"text",text:"Hvert dyr er forskjellig. En god opplevelse begynner med hensyn til helse, temperament og komfort."},
{type:"heading",text:"Komfort først"},
{type:"text",text:"De beste valgene respekterer naturlig bevegelse, trygghet og dyrets individuelle rytme."},
{type:"quote",text:"Ekte luksus begynner med ansvarlig oppmerksomhet."},
{type:"heading",text:"En gjennomtenkt tilnærming"},
{type:"text",text:"Tydelig informasjon og riktige valg skaper en tryggere og bedre opplevelse."}
],

fi:[
{type:"text",text:"Jokainen eläin on erilainen. Hyvä kokemus alkaa terveydestä, luonteesta ja mukavuudesta huolehtimisella."},
{type:"heading",text:"Mukavuus ensin"},
{type:"text",text:"Parhaat valinnat kunnioittavat luonnollista liikettä, turvallisuutta ja eläimen omaa rytmiä."},
{type:"quote",text:"Aito ylellisyys alkaa vastuullisesta huomiosta."},
{type:"heading",text:"Harkittu lähestymistapa"},
{type:"text",text:"Selkeä tieto ja sopivat valinnat tekevät kokemuksesta turvallisemman ja miellyttävämmän."}
],

tr:[
{type:"text",text:"Her hayvan farklıdır. İyi bir deneyim sağlık, karakter ve konfora dikkat etmekle başlar."},
{type:"heading",text:"Önce Konfor"},
{type:"text",text:"En iyi seçimler doğal hareketi, güvenliği ve hayvanın bireysel ritmini korur."},
{type:"quote",text:"Gerçek lüks sorumlu ilgiyle başlar."},
{type:"heading",text:"Düşünceli Bir Yaklaşım"},
{type:"text",text:"Açık bilgi ve doğru seçimler daha güvenli ve keyifli bir deneyim yaratır."}
],

ar:[
{type:"text",text:"كل حيوان مختلف. تبدأ التجربة الجيدة بمراعاة الصحة والطباع والراحة."},
{type:"heading",text:"الراحة أولاً"},
{type:"text",text:"أفضل الاختيارات تحترم الحركة الطبيعية والأمان والإيقاع الخاص بالحيوان."},
{type:"quote",text:"الفخامة الحقيقية تبدأ بالاهتمام المسؤول."},
{type:"heading",text:"نهج مدروس"},
{type:"text",text:"المعلومات الواضحة والاختيارات المناسبة تصنع تجربة أكثر أماناً وراحة."}
],

hi:[
{type:"text",text:"हर जानवर अलग होता है। अच्छा अनुभव उसके स्वास्थ्य, स्वभाव और आराम को समझने से शुरू होता है।"},
{type:"heading",text:"पहले आराम"},
{type:"text",text:"सबसे अच्छे विकल्प प्राकृतिक गति, सुरक्षा और जानवर की अपनी दिनचर्या का सम्मान करते हैं।"},
{type:"quote",text:"असली लक्ज़री जिम्मेदार ध्यान से शुरू होती है।"},
{type:"heading",text:"सोच-समझकर किया गया चुनाव"},
{type:"text",text:"स्पष्ट जानकारी और सही विकल्प अनुभव को अधिक सुरक्षित और आरामदायक बनाते हैं।"}
]

};

Object.keys(storyTranslations).forEach(function(code){

const locale = T.article[code];
const entries = storyTranslations[code];

if(!locale || !entries){
return;
}

Object.keys(entries).forEach(function(key){

const item = entries[key];

locale.stories[key] = story(
item[0],
item[1],
item[2],
localeAuthors[code] || locale.default.author,
localeDates[code] || locale.default.date,
key === "places" || key === "community"
? localeReadTimes[code].replace(/^5/,"4")
: localeReadTimes[code],
item[2],
genericBodies[code],
[item[0]]
);

});

});

/* =========================================================
SAFETY / STRUCTURE CHECK
========================================================= */

const REQUIRED_STORIES = [
"photoshoot",
"travel",
"fashion",
"wellness",
"rescue",
"places",
"volunteers",
"community"
];

const REQUIRED_LANGUAGES = [
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
];

REQUIRED_LANGUAGES.forEach(function(code){

const locale = T.article[code];

if(!locale){
console.error("Missing article language:",code);
return;
}

if(!locale.ui){
locale.ui = {};
}

if(!locale.messages){
locale.messages = {};
}

if(!locale.related){
locale.related = {};
}

if(!locale.stories){
locale.stories = {};
}

REQUIRED_STORIES.forEach(function(key){

if(!locale.stories[key]){
console.error(
"Missing translated article story:",
code,
key
);
}

});

});

/*
Arabic direction is applied by article.html / engine.js.
This file contains content only and does not force document direction.
*/

})();
