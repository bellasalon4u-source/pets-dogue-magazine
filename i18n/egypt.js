/* PETS & DOGUE — shared Egypt dictionary.
   Part 1 of 2. Static translations, no API. */

(function () {
"use strict";

const T=window.PetsDogueTranslations;

if(!T || typeof T.registerEgypt!=="function"){
  throw new Error("Load article.js before egypt.js");
}

const links=[
  "https://pmc.ncbi.nlm.nih.gov/articles/PMC9236899/",
  "https://turtlewatchegypt.net/",
  "https://www.dolphinwatchalliance.org/en/our-mission/dolphin-watch-research/photo-identification",
  "https://www.hepca.org/projects/conservation/red-sea-dugongs",
  "https://www.hepca.org/projects/conservation/turtlewatch",
  "https://sparelives.org/index.pl/adopt_or_sponsor",
  "https://cfa.org/breed/egyptian-mau/"
];

function add(entries){
  Object.entries(entries).forEach(function([lang,entry]){
    const ui=entry.editorialUI;

    ui.facts=ui.facts.map(function(fact,index){
      return [fact[0],fact[1],links[index]];
    });

    if(entry.text){
      T.registerEgypt({[lang]:entry});
    }

    const story=T.article[lang]?.stories?.egypt;

    if(!story){
      throw new Error("Missing Egypt story: "+lang);
    }

    story.editorialUI={
      ...story.editorialUI,
      ...ui
    };
  });
}

window.PetsDogueEgypt={add};

add({

en:{
editorialUI:{
  generated:"Cleomoray",
  shortTitle:"Another Egypt",
  bestWorker:"Best employee",
  source:"Source",
  factsTitle:"Seven facts about living Egypt",
  mauTitle:"Egyptian Mau",
  mauText:"Maus can “chirp”, greeting their people with soft, melodious trills.",
  mauAlt:"Full body Egyptian Mau",
  catAlt:"A cat resting on a shop counter in Hurghada",
  tamaraAlt:"Tamara looking straight at the camera",
  dolphinsLabel:"Dolphins",
  crabHeading:"🦀 The crab has joined the editorial meeting",
  crabOpening:[
    "He is here already.",
    "We met him on Hula Hula Beach.",
    "And now he has his own place in our story."
  ],
  facts:[
    [
      "Dolphins have their own “skin-care routine”.",
      "Near Hurghada, dolphins rub against selected corals and sponges. Researchers suggest their compounds may help care for the dolphins’ skin."
    ],
    [
      "Turtles have “photo passports”.",
      "In the Egyptian Red Sea, individual turtles are recognised by their facial scale patterns, allowing researchers to record repeated encounters."
    ],
    [
      "Dolphins are recognised by their fins.",
      "Scars and notches on dorsal fins help Hurghada researchers distinguish individual dolphins without attaching tags."
    ],
    [
      "The sea has pastures for sea cows.",
      "Dugongs feed on seagrass. Abu Dabbab Bay has extensive underwater meadows that provide suitable habitat for these animals."
    ],
    [
      "Divers can help study turtles.",
      "TurtleWatch collects observations from divers and snorkelers to better understand where sea turtles occur."
    ],
    [
      "You can sponsor an animal from afar.",
      "Egypt’s S.P.A.R.E. shelter offers sponsorship for cats, dogs and donkeys, even if you cannot take an animal home."
    ],
    [
      "Egyptian Maus can “chirp”.",
      "These spotted domestic cats may greet their people with soft, melodious trills and chirping sounds."
    ]
  ]
}
},

ru:{
editorialUI:{
  generated:"Клеомурена",
  shortTitle:"Другой Египет",
  bestWorker:"Лучший работник",
  source:"Источник",
  factsTitle:"Семь фактов о живом Египте",
  mauTitle:"Египетская мау",
  mauText:"Мау умеет «щебетать»: приветствовать своих людей тихими мелодичными трелями.",
  mauAlt:"Египетская мау в полный рост",
  catAlt:"Кот отдыхает на прилавке в Хургаде",
  tamaraAlt:"Тамара смотрит прямо в камеру",
  dolphinsLabel:"Дельфины",
  crabHeading:"🦀 Краб явился на редакционную планёрку",
  crabOpening:[
    "Он уже здесь.",
    "Мы встретили его на пляже Хула-Хула.",
    "И теперь у него есть собственное место в нашей истории."
  ],
  facts:[
    [
      "У дельфинов есть свой «уход за кожей».",
      "У Хургады дельфины трутся о определённые кораллы и губки. Исследователи предполагают, что их вещества могут помогать ухаживать за кожей."
    ],
    [
      "У черепах есть «фотопаспорта».",
      "В египетском Красном море отдельных черепах узнают по рисунку чешуек на голове — и собирают историю встреч с ними."
    ],
    [
      "Дельфинов узнают по плавнику.",
      "Шрамы и выемки на спинном плавнике помогают исследователям Хургады отличать одну особь от другой без установки меток."
    ],
    [
      "В море есть пастбища для морских коров.",
      "Дюгони кормятся морской травой. Бухта Абу-Даббаб славится обширными подводными лугами, подходящими для этих животных."
    ],
    [
      "Дайвер может помочь изучать черепах.",
      "Проект TurtleWatch собирает наблюдения дайверов и любителей снорклинга, чтобы лучше знать, где встречаются морские черепахи."
    ],
    [
      "Можно стать опекуном животного на расстоянии.",
      "Египетский приют S.P.A.R.E. предлагает поддерживать кошек, собак и ослов, даже если вы не можете забрать их домой."
    ],
    [
      "Египетская мау умеет «щебетать».",
      "Эти пятнистые домашние кошки могут приветствовать своих людей тихими мелодичными трелями и щебечущими звуками."
    ]
  ]
}
},

uk:{
editorialUI:{
  listen:"Слухати статтю",
  stop:"Зупинити",
  back:"Усі статті",
  previous:"Попереднє фото",
  next:"Наступне фото",
  location:"King Tut Bazar · Хургада, Єгипет",
  locationNote:"В одному з магазинчиків живе Тамара, а навпроти — черепашки й коти.",
  crab:"Пляж Хула-Хула · Єгипет",
  generated:"Клеомурена",
  unavailable:"Озвучування недоступне в цьому браузері.",
  fallback:"Повний переклад обраною мовою ще готується. Показано англійську версію.",
  shortTitle:"Інший Єгипет",
  bestWorker:"Найкращий працівник",
  source:"Джерело",
  factsTitle:"Сім фактів про живий Єгипет",
  mauTitle:"Єгипетська мау",
  mauText:"Мау вміє «щебетати»: вітати своїх людей тихими мелодійними трелями.",
  mauAlt:"Єгипетська мау на повний зріст",
  catAlt:"Кіт відпочиває на прилавку в Хургаді",
  tamaraAlt:"Тамара дивиться просто в камеру",
  dolphinsLabel:"Дельфіни",
  crabHeading:"🦀 Краб з’явився на редакційній нараді",
  crabOpening:[
    "Він уже тут.",
    "Ми зустріли його на пляжі Хула-Хула.",
    "І тепер у нього є власне місце в нашій історії."
  ],
  facts:[
    [
      "У дельфінів є власний «догляд за шкірою».",
      "Біля Хургади дельфіни труться об певні корали й губки. Дослідники припускають, що їхні речовини можуть допомагати доглядати за шкірою."
    ],
    [
      "У черепах є «фотопаспорти».",
      "У єгипетському Червоному морі окремих черепах упізнають за малюнком лусочок на голові та збирають історію зустрічей із ними."
    ],
    [
      "Дельфінів упізнають за плавцем.",
      "Шрами й виїмки на спинному плавці допомагають дослідникам Хургади розрізняти особин без установлення міток."
    ],
    [
      "У морі є пасовища для морських корів.",
      "Дюгоні живляться морською травою. Бухта Абу-Даббаб відома великими підводними луками, придатними для цих тварин."
    ],
    [
      "Дайвер може допомогти вивчати черепах.",
      "Проєкт TurtleWatch збирає спостереження дайверів і любителів снорклінгу, щоб краще знати, де зустрічаються морські черепахи."
    ],
    [
      "Можна стати опікуном тварини на відстані.",
      "Єгипетський притулок S.P.A.R.E. пропонує підтримувати кішок, собак і віслюків, навіть якщо ви не можете забрати їх додому."
    ],
    [
      "Єгипетська мау вміє «щебетати».",
      "Ці плямисті домашні кішки можуть вітати своїх людей тихими мелодійними трелями та щебетливими звуками."
    ]
  ]
},
text:`🇪🇬 ІНШИЙ ЄГИПЕТ: ТОЙ, ЩО ДИВИТЬСЯ НА ТЕБЕ У ВІДПОВІДЬ

Кішки з обличчями зі стародавніх зображень, Тамара з Хургади, черепахи, дельфіни після «нічної зміни», неонові риби та Клеомурена — підводна знайома єгипетського дайвера.

Є Єгипет пірамід.

Є Єгипет готелів і пляжів.

А є ще один.

Він ховається під лежаком, сидить на гілці біля магазину, повільно жує зелень, проноситься між коралами й іноді визирає зі щілини рифу з таким виразом обличчя, ніби чудово знає, що ви прийшли саме до нього.

Це живий Єгипет.

Саме його досліджує P&D.

Не колекцію тварин в енциклопедії, а дивовижний світ істот, які живуть поруч із людьми — на вулицях, пляжах і під поверхнею Червоного моря.

І що довше на них дивишся, то сильніше виникає відчуття:

тут людина — далеко не єдиний головний герой.

СПОЧАТКУ З’ЯВЛЯЮТЬСЯ КІШКИ

Спекотного полудня Єгипет ніби сповільнюється.

Повітря тремтить над нагрітою землею.

Пісок гарячий.

Білі стіни майже сліплять.

Море вдалині переливається неймовірними відтінками блакитного.

І десь у прохолодній смужці тіні обов’язково лежить кішка.

Єгипетські кішки вміють обирати найкращі місця.

Під столом.

Під лежаком.

Біля магазину.

На пляжі.

А іноді — просто там, де збиралася пройти людина.

Деякі зберігають царствену дистанцію.

Інші підходять так близько, що замість портрета виходить фотографія одного величезного котячого носа.

І саме розглядаючи наші фотографії, P&D помітила дивовижну річ.

Вони здаються знайомими.

Струнке тіло.

Високі ноги.

Великі вуха.

Вузька мордочка.

Мигдалеподібні очі.

У деяких — виразні темні лінії біля очей, ніби нанесені давньоєгипетським кохлем.

Де ми вже бачили ці силуети?

Звісно.

На зображеннях Стародавнього Єгипту.

На статуетках.

У музеях.

У мистецтві, якому тисячі років.

3000 РОКІВ. ТОЙ САМИЙ ХАРАКТЕР.

Ні, ми не розповідатимемо красиву інтернет-легенду про те, що конкретний кіт під нашим пляжним лежаком — прямий нащадок улюбленця фараона.

Наука працює не так.

Але правда виявляється не менш цікавою.

Дослідження стародавньої ДНК показують, що єгипетська популяція кішок справді відіграла значну роль в історії поширення домашніх кішок стародавнім світом. Єгипетська лінія особливо широко поширювалася в античну добу.

А кішки посідали особливе місце в давньоєгипетській культурі.

І тому сучасна зустріч іноді здається майже неймовірною.

2026 рік.

Пляж.

Червоне море.

З-під лежака виходить струнка кішка.

Зупиняється.

Піднімає голову.

Дивиться просто в об’єктив.

І на секунду між сьогоднішнім Єгиптом і Єгиптом кількох тисячоліть тому ніби зникає відстань.

Той самий профіль.

Той самий погляд.

І, можливо, те саме абсолютне переконання, що людина тут — обслуговуючий персонал.

🐈 МАЛЕНЬКИЙ СЕКРЕТ P&D

Якщо хочете сфотографувати єгипетську кішку — спробуйте не йти за нею.

Присядьте.

Опустіть телефон нижче.

І зачекайте.

Котяча цікавість іноді робить усю роботу за фотографа.

А судячи з наших кадрів, деякі місцеві моделі вважають об’єктив надзвичайно цікавим предметом.

💛 А В ХУРГАДІ ЖИВЕ ТАМАРА

Серед усіх героїв цієї історії є одна, яку неможливо переплутати ні з ким.

Яскраво-жовта.

Крихітна.

Товариська.

І цілком упевнена в собі.

Тамара.

Вона живе разом з іншими хвилястими папужками в одному з магазинів Хургади.

Увечері місто змінюється.

Спадає денна спека.

Засвічуються різнокольорові вивіски.

З відкритих крамниць линуть аромати олій і східних парфумів.

Десь пахне спеціями та кавою.

Десь — фруктами.

У повітрі змішуються легкий солодкуватий дим кальяну, тепло нагрітого каменю та солонуватий подих моря.

А посеред усієї цієї єгипетської вечірньої симфонії сидить Тамара.

Їй усе підходить.

Людська рука — підходить.

Плече — чудово.

Голова — взагалі VIP-ложа.

Судячи з фотографій, питання, хто кого прийшов подивитися, залишається відкритим.

Ми прийшли подивитися на Тамару.

Тамара явно прийшла подивитися на нас.

ВЕРДИКТ P&D:

Посада: невідома.

Місце роботи: магазин у Хургаді.

Спеціалізація: зв’язки з громадськістю.

Рівень упевненості: генеральний директор.

🐢 ПОТІМ ЧАС ЗУПИНЯЄТЬСЯ

Від папуги, який за кілька секунд опиняється в тебе на голові, — до істоти, якій узагалі нікуди поспішати.

Черепахи.

Велика.

Маленька.

І зовсім крихітна.

Одна спокійно вміщується на долоні й продовжує жувати зелень так, ніби навколо взагалі нічого не відбувається.

І тут розумієш, наскільки по-різному тварини відчувають світ.

Людина вже зробила десять фотографій.

Перевірила повідомлення.

Подумала, куди йти далі.

А черепаха все ще закінчує перший листочок.

Можливо, саме тому поруч із ними так спокійно.

ПОРАДА ВІД P&D:

Іноді найкращий єгипетський тренер із добробуту важить менш ніж кілограм і носить власний дім на спині.

🌊 А ТЕПЕР — ПІД ВОДУ

І ось тут починається зовсім інша фауна.

Кілька кроків теплою водою.

Маска.

Вдих.

Голова опускається під поверхню.

І звичний Єгипет зникає.

Немає запаху спецій.

Немає голосів.

Немає кальяну.

Немає гарячого повітря.

Залишаються світло, вода й колір.

ЛАСКАВО ПРОСИМО ДО ІНШОГО ЄГИПТУ.

Червоне море дивовижно прозоре.

Сонячні промені проходять крізь воду й біжать по дну.

А далі починається справжній вибух кольору.

Бірюзовий.

Електричний синій.

Лимонно-жовтий.

Фіолетовий.

Помаранчевий.

Рожевий.

Сріблястий.

Риби проходять між коралами цілими хмарами.

Одні схожі на коштовності.

Інші — на персонажів мультфільму.

Треті виглядають так, ніби дизайнеру дозволили використати всі кольори одразу.

І раптом розумієш:

Єгипту зовсім не потрібен фільтр.

🐠 ПІДВОДНИЙ МЕГАПОЛІС

Червоне море — не просто красиве місце для снорклінгу.

Це величезний живий світ.

У його єгипетській частині мешкає понад тисячу видів риб і сотні видів коралів.

Деякі види трапляються саме в цьому регіоні.

Тому дві сусідні ділянки рифу можуть виглядати як два зовсім різні райони одного міста.

Тільки замість автомобілів тут зграї риб.

Замість будинків — корали.

А затори виглядають значно красивіше.

🪸 І ОСЬ ФАКТ, ЯКИЙ ДОСІ ДИВУЄ БАГАТЬОХ

Корал — тварина.

Не рослина.

Не незвичайний підводний камінь.

Тварина.

Крихітні коралові поліпи живуть колоніями й протягом величезного часу створюють структури, які перетворюються на цілі рифи.

Тобто фантастичний «сад», над яким ви пропливаєте з маскою, насправді — величезне живе місто.

У районі Рас-Мохаммеда зареєстровані сотні різновидів твердих і м’яких коралів.

Але є ще дивовижніший факт.

Частина самого півострова Рас-Мохаммед сформована стародавнім викопним кораловим рифом, який піднявся десятки тисяч років тому.

Виходить майже неймовірна картина:

під вами — живий риф.

а неподалік над водою — слід стародавнього рифу.

Єгипет уміє поєднувати минуле й сьогодення навіть під водою.

👑 А ТЕПЕР ПОЗНАЙОМТЕСЯ З КОРОЛЕВОЮ

У кожного хорошого району є місцева знаменитість.

У нашого рифу вона теж є.

P&D почула історію єгипетського інструктора з дайвінгу, який багато часу проводить під водою.

Коли турист дивиться на риф, він бачить безліч риб.

Коли туди регулярно занурюється одна й та сама людина, усе стає трохи інакшим.

Вона починає впізнавати місця.

Щілини.

Маршрути.

І іноді — окремих мешканців.

Наш дайвер розповів про мурену, яку зустрічає знову й знову.

Він упізнає її.

Вона з’являється в знайомому місці.

І з часом ці зустрічі стали для нього чимось на зразок підводного знайомства.

Чи можна назвати це дружбою з погляду самої мурени?

Цього ми в неї не запитали.

Але P&D цілком точно вирішила одне:

такий персонаж не може залишатися без імені.

КЛЕОМУРЕНА 👑

Клеомурена — королева рифу.

Місце проживання: Червоне море.

Резиденція: коралова щілина.

Вид із вікна: 10/10.

Дрескод: природна висока мода.

Характер: царствений.

Кількість зубів: питання визнане надто особистим.

Прийом відвідувачів: виключно за настроєм Її Величності.

Ми знаємо, як єгипетський дайвер називає її.

Але значно цікавіше інше:

як Клеомурена називає його?

«Та людина з балоном»?

«Знову прийшов»?

Чи в неї справді є для нього власне муреняче ім’я?

Мабуть, деякі єгипетські таємниці краще залишити Червоному морю.

🐬 ДЕЛЬФІНИ, ЯКІ ПРАЦЮЮТЬ УНОЧІ

Ще глибше в цій історії з’являється один із найулюбленіших морських героїв людини.

Дельфін.

Але й тут є невеликий єгипетський секрет.

Біля Марса-Алама розташований риф Самадай — знаменитий «Дім дельфінів».

Там зустрічаються дельфіни-вертуни.

І в них дуже цікавий розпорядок дня.

Вони активні й годуються переважно вночі, а захищену лагуну використовують удень для відпочинку.

Тобто ситуація виглядає приблизно так.

Турист прокидається.

Снідає.

Одягає купальник.

Радісно оголошує:

«Сьогодні їдемо до дельфінів!»

А десь у лагуні:

🐬

«Можна тихіше? Ми після нічної зміни».

💙 НАЙКРАЩА ЗУСТРІЧ — КОЛИ ВИБІР РОБИТЬ ВІН

Саме тому P&D особливо подобається простий принцип спостереження за морськими тваринами.

Не намагайтеся створити ідеальний момент.

Дайте йому статися.

Якщо дельфін наблизився сам — чарівно.

Якщо риба пропливла біля камери — знімайте.

Якщо Клеомурена сьогодні вирішила залишитися вдома — отже, у королеви вихідний.

Дика природа прекрасна саме тим, що не працює за розкладом туриста.

🌴 А ЗНАЄТЕ, ЩО ЩЕ РОСТЕ БІЛЯ ЧЕРВОНОГО МОРЯ?

Мангри.

І це один із тих контрастів, якими Єгипет постійно дивує.

Пустельні гори.

Пісок.

Синє море.

Коралові рифи.

І раптом — зелені мангрові зарості.

Наприклад, природна територія Набк біля Шарм-ель-Шейха відома поєднанням пустельного ландшафту, моря, рифів і мангрів.

І знову виявляється, що єгипетська фауна існує не окремими картинками.

Усе пов’язане.

Берег.

Рослини.

Риф.

Риби.

Птахи.

Наземні тварини.

Море.

Один величезний живий світ.

🦀 КРАБ З’ЯВИВСЯ НА РЕДАКЦІЙНІЙ НАРАДІ

Він уже тут.

Ми зустріли його на пляжі Хула-Хула.

І вже залишили йому місце.

Бо після Тамари, пляжних кішок, черепах, тисяч риб, дельфінів і Клеомурени нас уже важко здивувати.

Хоча...

Це Єгипет.

Йому напевно вдасться.

✨ СІМ ФАКТІВ ПРО ЖИВИЙ ЄГИПЕТ

01 — Корали — тварини.

Ваш «підводний сад» справді живий.

02 — Червоне море неймовірно багате на рибу.

Тут налічується понад тисячу видів.

03 — У дельфінів теж є час відпочинку.

На рифі Самадай дельфіни-вертуни використовують лагуну як денний прихисток після нічної активності.

04 — Єгипет відіграв важливу роль в історії домашніх кішок.

Стародавня ДНК показує поширення єгипетської лінії кішок далеко за межі країни.

05 — Пустеля й мангри можуть бути сусідами.

Червоне море вміє поєднувати ландшафти, які зовсім не очікуєш побачити поруч.

06 — Найкраща людина для незвичайної історії про риф — місцевий досвідчений дайвер.

Замість «Що тут водиться?» спробуйте запитати:

«Кого ти тут знаєш?»

07 — Найцікавішу тварину подорожі неможливо замовити заздалегідь.

Можливо, це буде дельфін.

Можливо — мурена.

А можливо — нахабна пляжна кішка, яка вирішить, що ваш телефон належить їй.

☀️ ЖИВИЙ ЄГИПЕТ

Мабуть, саме тварини дозволяють відчути Єгипет особливо близько.

Бо вони поєднують усе.

Давнину — із сучасністю.

Пустелю — з морем.

Місто — з природою.

Спекотний день — із теплим вечором.

Над водою повітря пахне спеціями, оліями, кавою, кальяном і морською сіллю.

Під водою запахи зникають — і замість них залишаються надзвичайно яскраві кольори коралів і риб.

На пляжі в тіні лежить кішка з профілем, який здається знайомим із давньоєгипетського мистецтва.

У Хургаді Тамара вмощується на чиїйсь голові.

Черепаха закінчує свій безмежно важливий листочок.

Дельфіни відпочивають після нічної активності.

А десь у кораловій щілині сидить Клеомурена.

І все це відбувається одночасно.

Не в зоопарку.

Не в книжці.

Не на екрані.

Тут.

Під одним гарячим єгипетським сонцем.

І, можливо, саме тому фауна Єгипту запам’ятовується так сильно.

Вона не виглядає окремою пам’яткою.

Вона вплетена в сам Єгипет.

У його море.

У його вулиці.

У його історію.

У його колір.

У його тепло.

І в ті маленькі випадкові зустрічі, які потім чомусь згадуються найдовше.

🇪🇬 ХТО ТУТ ЖИВЕ? — ЄГИПЕТ

Не просто побачити Єгипет.
Побачити, хто дивиться на тебе у відповідь.

PETS & DOGUE
Один світ. Кожен улюбленець.`
}

});

})();/* PETS & DOGUE — shared Egypt dictionary.
   Part 2 of 2. */

(function () {
"use strict";

const add=window.PetsDogueEgypt?.add;

if(!add){
  throw new Error("Paste part 1 before part 2");
}

function paragraphs(value){
  return value.trim().split("\n").map(function(line){
    return line.replace(/\\n/g,"\n");
  }).join("\n\n");
}

add({

fr:{
editorialUI:{
  listen:"Écouter l’article",
  stop:"Arrêter",
  back:"Tous les articles",
  previous:"Photo précédente",
  next:"Photo suivante",
  location:"King Tut Bazar · Hurghada, Égypte",
  locationNote:"Tamara vit dans l’un des petits magasins ; en face, on trouve des tortues et des chats.",
  crab:"Plage de Hula Hula · Égypte",
  generated:"Cléomurène",
  unavailable:"La lecture audio n’est pas disponible dans ce navigateur.",
  fallback:"La traduction intégrale dans la langue choisie est en préparation. L’article est affiché en anglais.",
  shortTitle:"Une autre Égypte",
  bestWorker:"Meilleur employé",
  source:"Source",
  factsTitle:"Sept faits sur l’Égypte vivante",
  mauTitle:"Mau égyptien",
  mauText:"Le mau peut « gazouiller », saluant ses humains par de doux trilles mélodieux.",
  mauAlt:"Un mau égyptien photographié en entier",
  catAlt:"Un chat se repose sur le comptoir d’un magasin à Hurghada",
  tamaraAlt:"Tamara regarde droit dans l’objectif",
  dolphinsLabel:"Dauphins",
  crabHeading:"🦀 Le crabe est arrivé à la réunion de rédaction",
  crabOpening:[
    "Il est déjà là.",
    "Nous l’avons rencontré sur la plage de Hula Hula.",
    "Et il a désormais sa propre place dans notre histoire."
  ],
  facts:[
    ["Les dauphins ont leur propre « routine de soin de la peau ».","Près d’Hurghada, les dauphins se frottent à certains coraux et certaines éponges. Les chercheurs suggèrent que leurs composés pourraient contribuer au soin de leur peau."],
    ["Les tortues ont des « passeports photographiques ».","Dans la mer Rouge égyptienne, les tortues sont identifiées individuellement grâce au dessin des écailles de leur tête, ce qui permet de conserver l’historique des rencontres."],
    ["Les dauphins se reconnaissent à leur nageoire.","Les cicatrices et les encoches de la nageoire dorsale permettent aux chercheurs d’Hurghada de distinguer les individus sans leur poser de marques."],
    ["La mer possède des pâturages pour les vaches marines.","Les dugongs se nourrissent d’herbes marines. La baie d’Abu Dabbab est connue pour ses vastes prairies sous-marines, qui constituent un habitat adapté à ces animaux."],
    ["Les plongeurs peuvent aider à étudier les tortues.","TurtleWatch recueille les observations des plongeurs et des pratiquants de snorkeling pour mieux connaître les lieux fréquentés par les tortues marines."],
    ["On peut parrainer un animal à distance.","Le refuge égyptien S.P.A.R.E. propose de soutenir des chats, des chiens et des ânes, même si l’on ne peut pas les accueillir chez soi."],
    ["Le mau égyptien sait « gazouiller ».","Ces chats domestiques tachetés peuvent saluer leurs humains par de doux trilles mélodieux et des gazouillis."]
  ]
},
text:paragraphs(String.raw`🇪🇬 UNE AUTRE ÉGYPTE : CELLE QUI VOUS REGARDE EN RETOUR
Des chats aux visages évoquant les représentations antiques, Tamara à Hurghada, des tortues, des dauphins après leur « service de nuit », des poissons aux couleurs éclatantes et Cléomurène — la connaissance sous-marine d’un plongeur égyptien.
Il y a l’Égypte des pyramides.
Il y a l’Égypte des hôtels et des plages.
Et puis il y en a une autre.
Elle se cache sous un transat, se pose sur une branche près d’un magasin, mâche tranquillement des feuilles, file entre les coraux et surgit parfois d’une fissure du récif avec un air qui semble dire qu’elle sait parfaitement que vous êtes venu pour elle.
C’est l’Égypte vivante.
C’est cette Égypte que P&D explore.
Pas une collection d’animaux dans une encyclopédie, mais un monde extraordinaire de créatures qui vivent aux côtés des humains — dans les rues, sur les plages et sous la surface de la mer Rouge.
Et plus on les observe, plus une impression s’impose :
ici, les humains sont loin d’être les seuls personnages principaux.
D’ABORD, LES CHATS APPARAISSENT
À l’heure brûlante de midi, l’Égypte semble ralentir.
L’air tremble au-dessus du sol chauffé.
Le sable est chaud.
Les murs blancs sont presque éblouissants.
Au loin, la mer scintille dans des nuances de bleu invraisemblables.
Et quelque part, dans une bande d’ombre fraîche, il y a toujours un chat.
Les chats égyptiens savent choisir les meilleurs endroits.
Sous une table.
Sous un transat.
À côté d’un magasin.
Sur la plage.
Et parfois — précisément là où quelqu’un comptait passer.
Certains gardent une distance royale.
D’autres s’approchent tellement qu’au lieu d’un portrait, on photographie un immense nez de chat.
C’est en regardant nos photographies que P&D a remarqué quelque chose d’étonnant.
Ils nous semblent familiers.
Un corps élancé.
De longues pattes.
De grandes oreilles.
Un visage fin.
Des yeux en amande.
Certains ont autour des yeux des lignes sombres expressives, comme dessinées au khôl de l’Égypte antique.
Où avons-nous déjà vu ces silhouettes ?
Bien sûr.
Dans les représentations de l’Égypte antique.
Dans les statuettes.
Dans les musées.
Dans des œuvres vieilles de plusieurs millénaires.
3 000 ANS. TOUJOURS LA MÊME ATTITUDE.
Non, nous ne vous raconterons pas cette jolie légende d’Internet selon laquelle le chat installé sous notre transat descend directement du favori d’un pharaon.
La science ne fonctionne pas ainsi.
Mais la réalité est tout aussi intéressante.
Les études d’ADN ancien montrent que les populations de chats d’Égypte ont réellement joué un rôle important dans la diffusion des chats domestiques à travers le monde antique. La lignée égyptienne s’est particulièrement répandue durant l’Antiquité classique.
Et les chats occupaient une place véritablement particulière dans la culture de l’Égypte antique.
Voilà pourquoi une rencontre actuelle peut parfois sembler presque incroyable.
Nous sommes en 2026.
Une plage.
La mer Rouge.
Un chat élancé sort de sous un transat.
S’arrête.
Lève la tête.
Regarde droit dans l’objectif.
Et pendant une seconde, la distance entre l’Égypte d’aujourd’hui et celle d’il y a plusieurs milliers d’années semble disparaître.
Le même profil.
Le même regard.
Et peut-être la même certitude absolue qu’ici, les humains sont le personnel de service.
🐈 LE PETIT SECRET DE P&D
Pour photographier un chat égyptien — essayez de ne pas le suivre.
Accroupissez-vous.
Baissez votre téléphone.
Et attendez.
La curiosité féline fait parfois tout le travail du photographe.
Et à en juger par nos photos, certains modèles locaux trouvent l’objectif particulièrement intéressant.
💛 ET TAMARA VIT À HURGHADA
Parmi tous les personnages de cette histoire, il en est un que vous ne pourriez confondre avec aucun autre.
Jaune vif.
Minuscule.
Sociable.
Et parfaitement sûre d’elle.
Tamara.
Elle vit avec d’autres perruches ondulées dans un magasin d’Hurghada.
Le soir, la ville se transforme.
La chaleur du jour retombe.
Les enseignes colorées s’allument.
Des boutiques ouvertes s’échappent des parfums d’huiles et de fragrances orientales.
Ici, une odeur d’épices et de café.
Ailleurs — de fruits.
L’air mêle la fumée légère et un peu sucrée de la chicha, la chaleur de la pierre chauffée au soleil et le souffle salé de la mer.
Et au milieu de cette symphonie du soir égyptien, Tamara est installée.
Tout lui convient.
Une main humaine — convenable.
Une épaule — excellente.
Une tête — pratiquement une loge VIP.
À en juger par les photographies, on ne sait toujours pas vraiment qui est venu voir qui.
Nous sommes venus voir Tamara.
Tamara est manifestement venue nous voir.
LE VERDICT DE P&D :
Poste : inconnu.
Lieu de travail : un magasin à Hurghada.
Spécialité : relations publiques.
Niveau de confiance : directrice générale.
🐢 PUIS LE TEMPS S’ARRÊTE
D’un perroquet qui se pose sur votre tête en quelques secondes — à une créature qui n’a absolument aucune raison de se presser.
Les tortues terrestres.
Une grande.
Une petite.
Et une vraiment minuscule.
L’une tient confortablement dans la paume d’une main et continue de mâcher des feuilles comme si rien ne se passait autour d’elle.
Et l’on comprend à quel point les animaux vivent le monde différemment.
Une personne a déjà pris dix photos.
Consulté ses messages.
Réfléchi à sa prochaine destination.
Et la tortue termine toujours sa première feuille.
C’est peut-être pour cela que leur présence apaise tant.
LE CONSEIL DE P&D :
Parfois, le meilleur coach de bien-être égyptien pèse moins d’un kilogramme et porte sa maison sur le dos.
🌊 ET MAINTENANT — SOUS L’EAU
Ici commence une faune complètement différente.
Quelques pas dans l’eau chaude.
Un masque.
Une inspiration.
Votre tête passe sous la surface.
Et l’Égypte familière disparaît.
Plus d’odeur d’épices.
Plus de voix.
Plus de chicha.
Plus d’air brûlant.
Il ne reste que la lumière, l’eau et la couleur.
BIENVENUE DANS UNE AUTRE ÉGYPTE.
La mer Rouge est étonnamment limpide.
Les rayons du soleil traversent l’eau et courent sur le fond.
Puis vient une véritable explosion de couleurs.
Turquoise.
Bleu électrique.
Jaune citron.
Violet.
Orange.
Rose.
Argent.
Les poissons se déplacent entre les coraux par nuages entiers.
Certains ressemblent à des bijoux.
D’autres — à des personnages de dessin animé.
D’autres encore semblent conçus par un designer autorisé à utiliser toutes les couleurs à la fois.
Et soudain, on comprend :
l’Égypte n’a absolument pas besoin de filtre.
🐠 UNE MÉTROPOLE SOUS-MARINE
La mer Rouge n’est pas seulement un bel endroit pour faire du snorkeling.
C’est un immense monde vivant.
Ses eaux égyptiennes abritent plus d’un millier d’espèces de poissons et des centaines d’espèces de coraux.
Certaines espèces sont propres à cette région.
Voilà pourquoi deux portions voisines de récif peuvent ressembler à deux quartiers entièrement différents d’une même ville.
Ici, les bancs de poissons remplacent les voitures.
Les coraux remplacent les maisons.
Et les embouteillages sont beaucoup plus beaux.
🪸 VOICI UN FAIT QUI SURPREND ENCORE BEAUCOUP DE GENS
Un corail est un animal.
Pas une plante.
Pas une étrange pierre sous-marine.
Un animal.
De minuscules polypes coralliens vivent en colonies et créent, sur des périodes immenses, des structures qui deviennent des récifs entiers.
Ainsi, le merveilleux « jardin » que vous admirez avec votre masque est en réalité une immense ville vivante.
Des centaines de variétés de coraux durs et mous ont été recensées autour de Ras Mohammed.
Mais il existe un fait encore plus étonnant.
Une partie de la péninsule de Ras Mohammed elle-même est constituée d’un ancien récif corallien fossile, soulevé il y a des dizaines de milliers d’années.
Cela donne une image presque incroyable :
sous vous — un récif vivant.
et tout près, au-dessus de l’eau — la trace d’un récif ancien.
L’Égypte sait relier le passé au présent, même sous l’eau.
👑 RENCONTREZ MAINTENANT LA REINE
Tout bon quartier a sa célébrité locale.
Notre récif en a une aussi.
P&D a entendu le récit d’un moniteur de plongée égyptien qui passe beaucoup de temps sous l’eau.
Quand un touriste regarde un récif, il voit beaucoup de poissons.
Quand une même personne y plonge régulièrement, les choses changent un peu.
Elle commence à reconnaître les lieux.
Les fissures.
Les itinéraires.
Et parfois — certains habitants.
Notre plongeur nous a parlé d’une murène qu’il rencontre régulièrement.
Il la reconnaît.
Elle apparaît dans un endroit familier.
Et avec le temps, ces rencontres sont devenues une sorte de connaissance sous-marine.
Peut-on appeler cela une amitié du point de vue de la murène ?
Nous ne lui avons pas demandé.
Mais P&D a décidé une chose avec certitude :
un tel personnage ne peut pas rester sans nom.
CLÉOMURÈNE 👑
Cléomurène — reine du récif.
Habitat : la mer Rouge.
Résidence : une fissure corallienne.
Vue depuis la fenêtre : 10/10.
Code vestimentaire : couture naturelle.
Caractère : royal.
Nombre de dents : la question a été jugée trop personnelle.
Réception des visiteurs : entièrement selon l’humeur de Sa Majesté.
Nous savons comment le plongeur égyptien l’appelle.
Mais une autre question est bien plus intéressante :
comment Cléomurène l’appelle-t-elle ?
« Cet humain avec la bouteille » ?
« Encore lui » ?
Ou a-t-elle vraiment un nom de murène bien à elle pour le désigner ?
Certains mystères égyptiens sont peut-être mieux confiés à la mer Rouge.
🐬 LES DAUPHINS QUI TRAVAILLENT LA NUIT
Plus loin dans cette histoire apparaît l’un des personnages marins préférés des humains.
Le dauphin.
Mais là aussi, il y a un petit secret égyptien.
Près de Marsa Alam se trouve le récif de Samadai — la célèbre Maison des dauphins.
On y rencontre des dauphins à long bec.
Et leur emploi du temps est très intéressant.
Ils sont actifs et se nourrissent surtout la nuit, puis utilisent le lagon abrité pour se reposer le jour.
La situation ressemble donc à ceci.
Un touriste se réveille.
Prend son petit-déjeuner.
Enfile son maillot.
Annonce joyeusement :
« Aujourd’hui, nous allons voir les dauphins ! »
Et quelque part dans le lagon :
🐬
« Pourriez-vous faire moins de bruit ? Nous venons de terminer le service de nuit. »
💙 LA PLUS BELLE RENCONTRE, C’EST QUAND L’ANIMAL CHOISIT
Voilà pourquoi P&D aime particulièrement ce principe simple pour observer les animaux marins.
N’essayez pas de fabriquer le moment parfait.
Laissez-le arriver.
Si un dauphin s’approche de lui-même — c’est magique.
Si un poisson passe devant l’objectif — prenez la photo.
Si Cléomurène décide de rester chez elle aujourd’hui — la reine prend un jour de repos.
La beauté de la faune sauvage tient précisément au fait qu’elle ne suit pas l’emploi du temps des touristes.
🌴 SAVEZ-VOUS CE QUI POUSSE AUSSI AU BORD DE LA MER ROUGE ?
Des mangroves.
C’est l’un de ces contrastes avec lesquels l’Égypte nous surprend sans cesse.
Des montagnes désertiques.
Du sable.
Une mer bleue.
Des récifs coralliens.
Et soudain — une végétation verte de mangrove.
La zone naturelle de Nabq, près de Charm el-Cheikh, est par exemple connue pour son association de désert, de mer, de récifs et de mangroves.
Et une fois encore, la faune d’Égypte ne se présente pas comme une série d’images isolées.
Tout est lié.
Le rivage.
Les plantes.
Le récif.
Les poissons.
Les oiseaux.
Les animaux terrestres.
La mer.
Un immense monde vivant.
🦀 LE CRABE EST ARRIVÉ À LA RÉUNION DE RÉDACTION
Il est déjà là.
Nous l’avons rencontré sur la plage de Hula Hula.
Et il a désormais sa propre place dans notre histoire.
Après Tamara, les chats des plages, les tortues, les milliers de poissons, les dauphins et Cléomurène, il devient difficile de nous surprendre.
Quoique…
Nous sommes en Égypte.
Elle y parviendra probablement.
✨ P&D WILD EGYPT — 7 FAITS À RETENIR
01 — Les coraux sont des animaux.
Votre « jardin sous-marin » est bel et bien vivant.
02 — La mer Rouge est exceptionnellement riche en poissons.
On y trouve plus d’un millier d’espèces.
03 — Les dauphins ont eux aussi besoin de repos.
À Samadai, les dauphins à long bec utilisent le lagon comme refuge diurne après leur activité nocturne.
04 — L’Égypte a joué un rôle important dans l’histoire des chats domestiques.
L’ADN ancien révèle la diffusion de la lignée féline égyptienne bien au-delà du pays.
05 — Le désert et les mangroves peuvent être voisins.
La mer Rouge réunit des paysages que l’on n’imaginerait jamais côte à côte.
06 — Pour une histoire inhabituelle sur le récif, le meilleur interlocuteur est un plongeur local expérimenté.
Au lieu de demander « Qu’est-ce qui vit ici ? », essayez :
« Qui connaissez-vous ici ? »
07 — L’animal le plus intéressant de votre voyage ne se réserve pas à l’avance.
Ce sera peut-être un dauphin.
Peut-être — une murène.
Ou peut-être — un chat de plage effronté qui décidera que votre téléphone lui appartient.
☀️ L’ÉGYPTE VIVANTE
Ce sont peut-être les animaux qui rendent l’Égypte si proche.
Parce qu’ils relient tout.
L’Antiquité — au présent.
Le désert — à la mer.
La ville — à la nature.
Une journée brûlante — à une soirée douce.
Au-dessus de l’eau, l’air sent les épices, les huiles, le café, la chicha et le sel marin.
Sous l’eau, les odeurs disparaissent — remplacées par les couleurs éclatantes des coraux et des poissons.
Sur la plage, un chat repose à l’ombre avec un profil qui semble familier depuis l’art de l’Égypte antique.
À Hurghada, Tamara se pose sur la tête de quelqu’un.
Une tortue termine sa feuille infiniment importante.
Les dauphins se reposent après leur activité nocturne.
Et quelque part dans une fissure corallienne, Cléomurène est installée.
Tout cela se passe en même temps.
Pas dans un zoo.
Pas dans un livre.
Pas sur un écran.
Ici.
Sous le même soleil brûlant d’Égypte.
Voilà peut-être pourquoi la faune égyptienne reste aussi profondément gravée dans la mémoire.
Elle ne ressemble pas à une attraction séparée.
Elle est tissée dans l’Égypte elle-même.
Dans sa mer.
Ses rues.
Son histoire.
Ses couleurs.
Sa chaleur.
Et ces petites rencontres fortuites qui restent, sans que l’on sache pourquoi, plus longtemps que les autres.
🇪🇬 QUI VIT ICI ? — ÉGYPTE
Ne vous contentez pas de voir l’Égypte.\nDécouvrez qui vous regarde en retour.
PETS & DOGUE\nUn monde. Chaque animal.`)
},

de:{
editorialUI:{
  listen:"Artikel anhören",
  stop:"Stoppen",
  back:"Alle Artikel",
  previous:"Vorheriges Foto",
  next:"Nächstes Foto",
  location:"King Tut Bazar · Hurghada, Ägypten",
  locationNote:"In einem der kleinen Geschäfte lebt Tamara; gegenüber sind Landschildkröten und Katzen.",
  crab:"Hula-Hula-Strand · Ägypten",
  generated:"Kleomuräne",
  unavailable:"Die Sprachausgabe ist in diesem Browser nicht verfügbar.",
  fallback:"Die vollständige Übersetzung in die gewählte Sprache wird vorbereitet. Der Artikel wird auf Englisch angezeigt.",
  shortTitle:"Ein anderes Ägypten",
  bestWorker:"Bester Mitarbeiter",
  source:"Quelle",
  factsTitle:"Sieben Fakten über das lebendige Ägypten",
  mauTitle:"Ägyptische Mau",
  mauText:"Die Mau kann „zwitschern“ und ihre Menschen mit leisen, melodischen Trillern begrüßen.",
  mauAlt:"Eine Ägyptische Mau in voller Körperansicht",
  catAlt:"Eine Katze ruht auf dem Ladentresen in Hurghada",
  tamaraAlt:"Tamara schaut direkt in die Kamera",
  dolphinsLabel:"Delfine",
  crabHeading:"🦀 Die Krabbe ist zur Redaktionssitzung erschienen",
  crabOpening:[
    "Sie ist schon da.",
    "Wir haben sie am Hula-Hula-Strand getroffen.",
    "Und jetzt hat sie ihren eigenen Platz in unserer Geschichte."
  ],
  facts:[
    ["Delfine haben ihre eigene „Hautpflegeroutine“.","Bei Hurghada reiben sich Delfine an bestimmten Korallen und Schwämmen. Forschende vermuten, dass deren Inhaltsstoffe zur Pflege der Delfinhaut beitragen könnten."],
    ["Schildkröten haben „Fotopässe“.","Im ägyptischen Roten Meer erkennt man einzelne Schildkröten an den Schuppenmustern ihres Kopfes und dokumentiert wiederholte Begegnungen."],
    ["Delfine werden an ihrer Flosse erkannt.","Narben und Kerben in der Rückenflosse helfen Forschenden in Hurghada, einzelne Delfine ohne angebrachte Markierungen zu unterscheiden."],
    ["Im Meer gibt es Weiden für Seekühe.","Dugongs fressen Seegras. Die Bucht Abu Dabbab ist für ausgedehnte Unterwasserwiesen bekannt, die diesen Tieren einen geeigneten Lebensraum bieten."],
    ["Taucher können helfen, Schildkröten zu erforschen.","TurtleWatch sammelt Beobachtungen von Tauchern und Schnorchlern, um besser zu verstehen, wo Meeresschildkröten vorkommen."],
    ["Man kann aus der Ferne eine Tierpatenschaft übernehmen.","Das ägyptische Tierheim S.P.A.R.E. bietet Patenschaften für Katzen, Hunde und Esel an, auch wenn man kein Tier zu Hause aufnehmen kann."],
    ["Die Ägyptische Mau kann „zwitschern“.","Diese gefleckten Hauskatzen können ihre Menschen mit leisen, melodischen Trillern und zwitschernden Lauten begrüßen."]
  ]
},
text:paragraphs(String.raw`🇪🇬 EIN ANDERES ÄGYPTEN: DAS DEINEN BLICK ERWIDERT
Katzen mit Gesichtern wie auf antiken Darstellungen, Tamara aus Hurghada, Landschildkröten, Delfine nach ihrer „Nachtschicht“, leuchtend bunte Fische und Kleomuräne — die Unterwasserbekanntschaft eines ägyptischen Tauchers.
Es gibt das Ägypten der Pyramiden.
Es gibt das Ägypten der Hotels und Strände.
Und es gibt noch ein anderes.
Es versteckt sich unter einer Sonnenliege, sitzt auf einem Ast neben einem Geschäft, kaut langsam Grünzeug, flitzt zwischen Korallen hindurch und schaut manchmal aus einer Riffspalte, als wüsste es ganz genau, dass Sie nur seinetwegen gekommen sind.
Das ist das lebendige Ägypten.
Dieses Ägypten erkundet P&D.
Keine Sammlung von Tieren in einer Enzyklopädie, sondern eine außergewöhnliche Welt von Lebewesen, die neben den Menschen leben — auf den Straßen, an den Stränden und unter der Oberfläche des Roten Meeres.
Und je länger man sie beobachtet, desto stärker wird das Gefühl:
Menschen sind hier längst nicht die einzigen Hauptfiguren.
ZUERST TAUCHEN DIE KATZEN AUF
In der heißen Mittagszeit scheint Ägypten langsamer zu werden.
Die Luft flimmert über dem erhitzten Boden.
Der Sand ist heiß.
Die weißen Wände blenden beinahe.
In der Ferne schimmert das Meer in unwirklichen Blautönen.
Und irgendwo in einem kühlen Schattenstreifen liegt immer eine Katze.
Ägyptische Katzen wissen, wie man die besten Plätze auswählt.
Unter einem Tisch.
Unter einer Sonnenliege.
Neben einem Geschäft.
Am Strand.
Und manchmal — genau dort, wo gerade jemand entlanggehen wollte.
Manche halten königlichen Abstand.
Andere kommen so nahe, dass statt eines Porträts ein Foto von einer riesigen Katzennase entsteht.
Beim Betrachten unserer Fotos fiel P&D etwas Bemerkenswertes auf.
Sie wirken vertraut.
Ein schlanker Körper.
Lange Beine.
Große Ohren.
Ein schmales Gesicht.
Mandelförmige Augen.
Manche haben ausdrucksstarke dunkle Linien um die Augen, als wären sie mit altägyptischem Kajal gezogen.
Wo haben wir diese Silhouetten schon einmal gesehen?
Natürlich.
Auf Darstellungen aus dem Alten Ägypten.
Als Figuren.
In Museen.
In Kunstwerken, die Jahrtausende alt sind.
3.000 JAHRE. DIESELBE HALTUNG.
Nein, wir erzählen Ihnen nicht die hübsche Internetlegende, nach der ausgerechnet die Katze unter unserer Strandliege direkt vom Liebling eines Pharaos abstammt.
So funktioniert Wissenschaft nicht.
Doch die Wahrheit ist ebenso interessant.
Untersuchungen alter DNA zeigen, dass Ägyptens Katzenpopulation tatsächlich eine bedeutende Rolle bei der Verbreitung von Hauskatzen in der antiken Welt spielte. Die ägyptische Abstammungslinie verbreitete sich besonders stark während der klassischen Antike.
Und Katzen hatten in der altägyptischen Kultur einen wirklich besonderen Platz.
Deshalb kann eine heutige Begegnung manchmal beinahe unglaublich wirken.
Wir schreiben das Jahr 2026.
Ein Strand.
Das Rote Meer.
Eine schlanke Katze kommt unter einer Liege hervor.
Bleibt stehen.
Hebt den Kopf.
Blickt direkt in die Kamera.
Und für eine Sekunde scheint der Abstand zwischen dem heutigen Ägypten und dem Ägypten vor mehreren Tausend Jahren zu verschwinden.
Dasselbe Profil.
Derselbe Blick.
Und vielleicht dieselbe feste Überzeugung, dass Menschen hier das Servicepersonal sind.
🐈 DAS KLEINE GEHEIMNIS VON P&D
Wenn Sie eine ägyptische Katze fotografieren möchten — versuchen Sie, ihr nicht hinterherzugehen.
Gehen Sie in die Hocke.
Halten Sie das Handy tiefer.
Und warten Sie.
Manchmal erledigt die Neugier der Katze die gesamte Arbeit des Fotografen.
Und unseren Bildern nach finden manche örtlichen Modelle das Objektiv ausgesprochen interessant.
💛 UND TAMARA LEBT IN HURGHADA
Unter allen Figuren dieser Geschichte gibt es eine, die man mit niemandem verwechseln könnte.
Leuchtend gelb.
Winzig.
Gesellig.
Und völlig von sich überzeugt.
Tamara.
Sie lebt mit anderen Wellensittichen in einem Geschäft in Hurghada.
Am Abend verändert sich die Stadt.
Die Tageshitze lässt nach.
Bunte Schilder leuchten auf.
Aus offenen Geschäften strömen Düfte von Ölen und orientalischen Parfums.
Irgendwo riecht es nach Gewürzen und Kaffee.
Anderswo — nach Obst.
In der Luft vermischen sich der leichte, süßliche Rauch der Shisha, die Wärme sonnenbeschienener Steine und der salzige Atem des Meeres.
Und mitten in dieser ägyptischen Abendsymphonie sitzt Tamara.
Alles passt ihr.
Eine menschliche Hand — geeignet.
Eine Schulter — ausgezeichnet.
Ein Kopf — praktisch eine VIP-Loge.
Den Fotos nach bleibt die Frage offen, wer eigentlich wen besuchen wollte.
Wir kamen, um Tamara zu sehen.
Tamara kam ganz offensichtlich, um uns zu sehen.
DAS URTEIL VON P&D:
Position: unbekannt.
Arbeitsplatz: ein Geschäft in Hurghada.
Spezialgebiet: Öffentlichkeitsarbeit.
Selbstbewusstsein: Geschäftsführerin.
🐢 DANN BLEIBT DIE ZEIT STEHEN
Von einem Papagei, der in Sekunden auf Ihrem Kopf landet — zu einem Lebewesen, das absolut keinen Grund zur Eile hat.
Landschildkröten.
Eine große.
Eine kleine.
Und eine wirklich winzige.
Eine passt bequem in eine Handfläche und kaut weiter Grünzeug, als würde um sie herum überhaupt nichts geschehen.
Und hier erkennt man, wie unterschiedlich Tiere die Welt erleben.
Ein Mensch hat schon zehn Fotos gemacht.
Nachrichten gelesen.
Überlegt, wohin es als Nächstes geht.
Und die Schildkröte ist immer noch bei ihrem ersten Blatt.
Vielleicht ist ihre Nähe deshalb so beruhigend.
DER RAT VON P&D:
Manchmal wiegt der beste ägyptische Wellnesscoach weniger als ein Kilogramm und trägt sein eigenes Zuhause auf dem Rücken.
🌊 UND JETZT — UNTER WASSER
Hier beginnt eine völlig andere Tierwelt.
Ein paar Schritte durch warmes Wasser.
Eine Maske.
Ein Atemzug.
Der Kopf gleitet unter die Oberfläche.
Und das vertraute Ägypten verschwindet.
Kein Gewürzduft.
Keine Stimmen.
Keine Shisha.
Keine heiße Luft.
Nur Licht, Wasser und Farbe bleiben.
WILLKOMMEN IN EINEM ANDEREN ÄGYPTEN.
Das Rote Meer ist erstaunlich klar.
Sonnenstrahlen dringen durch das Wasser und wandern über den Meeresboden.
Und dann beginnt eine wahre Farbexplosion.
Türkis.
Elektrisches Blau.
Zitronengelb.
Violett.
Orange.
Rosa.
Silber.
Fische ziehen in ganzen Wolken zwischen den Korallen hindurch.
Manche sehen aus wie Schmuckstücke.
Andere — wie Zeichentrickfiguren.
Wieder andere wirken, als hätte ein Designer sämtliche Farben gleichzeitig verwenden dürfen.
Und plötzlich wird klar:
Ägypten braucht wirklich keinen Filter.
🐠 EINE METROPOLE UNTER WASSER
Das Rote Meer ist mehr als ein schöner Ort zum Schnorcheln.
Es ist eine riesige lebendige Welt.
In seinen ägyptischen Gewässern leben mehr als tausend Fischarten und Hunderte Korallenarten.
Einige Arten kommen speziell in dieser Region vor.
Deshalb können zwei benachbarte Riffabschnitte wie zwei völlig unterschiedliche Viertel derselben Stadt aussehen.
Nur ersetzen hier Fischschwärme die Autos.
Korallen ersetzen die Häuser.
Und die Staus sind viel schöner.
🪸 EIN FAKT, DER NOCH IMMER VIELE MENSCHEN ÜBERRASCHT
Eine Koralle ist ein Tier.
Keine Pflanze.
Kein ungewöhnlicher Stein unter Wasser.
Ein Tier.
Winzige Korallenpolypen leben in Kolonien und bilden über gewaltige Zeiträume Strukturen, aus denen ganze Riffe entstehen.
Der fantastische „Garten“ unter Ihrer Schnorchelmaske ist also tatsächlich eine riesige lebendige Stadt.
Rund um Ras Mohammed wurden Hunderte Varianten von Hart- und Weichkorallen erfasst.
Doch es gibt einen noch erstaunlicheren Fakt.
Ein Teil der Halbinsel Ras Mohammed selbst besteht aus einem alten fossilen Korallenriff, das sich vor Zehntausenden von Jahren hob.
So entsteht ein beinahe unglaubliches Bild:
unter Ihnen — ein lebendiges Riff.
und ganz in der Nähe über dem Wasser — die Spur eines uralten Riffs.
Ägypten verbindet Vergangenheit und Gegenwart selbst unter Wasser.
👑 LERNEN SIE JETZT DIE KÖNIGIN KENNEN
Jedes gute Viertel hat eine örtliche Berühmtheit.
Unser Riff hat auch eine.
P&D hörte eine Geschichte von einem ägyptischen Tauchlehrer, der viel Zeit unter Wasser verbringt.
Wenn ein Tourist ein Riff betrachtet, sieht er viele Fische.
Wenn derselbe Mensch dort regelmäßig taucht, verändert sich etwas.
Er beginnt, Orte wiederzuerkennen.
Spalten.
Wege.
Und manchmal — einzelne Bewohner.
Unser Taucher erzählte uns von einer Muräne, der er immer wieder begegnet.
Er erkennt sie.
Sie erscheint an einem vertrauten Ort.
Und mit der Zeit sind diese Begegnungen zu einer Art Unterwasserbekanntschaft geworden.
Könnte man das aus Sicht der Muräne Freundschaft nennen?
Wir haben sie nicht gefragt.
Aber P&D entschied eines ganz sicher:
Eine solche Figur darf nicht namenlos bleiben.
KLEOMURÄNE 👑
Kleomuräne — Königin des Riffs.
Heimat: das Rote Meer.
Wohnsitz: eine Korallenspalte.
Blick aus dem Fenster: 10/10.
Kleiderordnung: natürliche Couture.
Charakter: königlich.
Anzahl der Zähne: Die Frage wurde als zu persönlich eingestuft.
Besucherempfang: ausschließlich nach dem Ermessen Ihrer Majestät.
Wir wissen, wie der ägyptische Taucher sie nennt.
Aber etwas anderes ist viel interessenter:
Wie nennt Kleomuräne ihn?
„Dieser Mensch mit der Flasche“?
„Schon wieder da“?
Oder hat sie wirklich einen eigenen Muränennamen für ihn?
Vielleicht überlässt man manche ägyptischen Geheimnisse besser dem Roten Meer.
🐬 DELFINE, DIE NACHTS ARBEITEN
Weiter in dieser Geschichte erscheint eine der beliebtesten Meeresfiguren der Menschheit.
Der Delfin.
Doch auch hier gibt es ein kleines ägyptisches Geheimnis.
Bei Marsa Alam liegt das Samadai-Riff — das berühmte Delfinhaus.
Dort kann man Spinnerdelfinen begegnen.
Und sie haben einen sehr interessanten Tagesablauf.
Sie sind vor allem nachts aktiv und auf Nahrungssuche; tagsüber nutzen sie die geschützte Lagune zum Ausruhen.
Die Situation sieht also ungefähr so aus.
Ein Tourist wacht auf.
Frühstückt.
Zieht Badesachen an.
Verkündet fröhlich:
„Heute schauen wir uns Delfine an!“
Und irgendwo in der Lagune:
🐬
„Könnten Sie etwas leiser sein? Wir kommen gerade von der Nachtschicht.“
💙 DIE SCHÖNSTE BEGEGNUNG IST DIE, DIE DAS TIER WÄHLT
Deshalb mag P&D einen einfachen Grundsatz für das Beobachten von Meerestieren besonders.
Versuchen Sie nicht, den perfekten Moment herzustellen.
Lassen Sie ihn geschehen.
Kommt ein Delfin von selbst näher — wunderbar.
Schwimmt ein Fisch an der Kamera vorbei — machen Sie das Bild.
Bleibt Kleomuräne heute lieber zu Hause — hat die Königin einen freien Tag.
Wildtiere sind gerade deshalb so schön, weil sie sich nicht nach dem Zeitplan der Touristen richten.
🌴 WISSEN SIE, WAS NOCH AM ROTEN MEER WÄCHST?
Mangroven.
Das ist einer jener Gegensätze, mit denen Ägypten immer wieder überrascht.
Wüstenberge.
Sand.
Blaues Meer.
Korallenriffe.
Und plötzlich — grüne Mangrovendickichte.
Das Naturgebiet Nabq bei Scharm El-Scheich ist beispielsweise für seine Verbindung von Wüstenlandschaft, Meer, Riffen und Mangroven bekannt.
Und wieder zeigt sich, dass Ägyptens Tierwelt nicht aus einzelnen, voneinander getrennten Bildern besteht.
Alles ist verbunden.
Die Küste.
Pflanzen.
Das Riff.
Fische.
Vögel.
Landtiere.
Das Meer.
Eine riesige lebendige Welt.
🦀 DIE KRABBE IST ZUR REDAKTIONSSITZUNG ERSCHIENEN
Sie ist schon da.
Wir haben sie am Hula-Hula-Strand getroffen.
Und jetzt hat sie ihren eigenen Platz in unserer Geschichte.
Nach Tamara, Strandkatzen, Landschildkröten, Tausenden von Fischen, Delfinen und Kleomuräne sind wir nur noch schwer zu überraschen.
Obwohl …
Das ist Ägypten.
Es wird ihm wohl gelingen.
✨ P&D WILD EGYPT — 7 FAKTEN ZUM MERKEN
01 — Korallen sind Tiere.
Ihr „Unterwassergarten“ ist tatsächlich lebendig.
02 — Das Rote Meer ist außergewöhnlich reich an Fischen.
Hier kommen mehr als tausend Arten vor.
03 — Auch Delfine brauchen Ruhezeiten.
Bei Samadai nutzen Spinnerdelfine die Lagune nach ihrer nächtlichen Aktivität als Rückzugsort am Tag.
04 — Ägypten spielte eine wichtige Rolle in der Geschichte der Hauskatzen.
Alte DNA belegt die Ausbreitung der ägyptischen Katzenlinie weit über die Landesgrenzen hinaus.
05 — Wüste und Mangroven können Nachbarn sein.
Das Rote Meer verbindet Landschaften, die man niemals direkt nebeneinander erwarten würde.
06 — Für eine ungewöhnliche Riffgeschichte ist ein erfahrener örtlicher Taucher der beste Ansprechpartner.
Fragen Sie statt „Was lebt hier?“ einmal:
„Wen kennen Sie hier?“
07 — Das interessanteste Tier Ihrer Reise lässt sich nicht im Voraus buchen.
Vielleicht wird es ein Delfin.
Vielleicht — eine Muräne.
Oder vielleicht — eine freche Strandkatze, die Ihr Handy zu ihrem Eigentum erklärt.
☀️ DAS LEBENDIGE ÄGYPTEN
Vielleicht sind es die Tiere, durch die uns Ägypten besonders nahekommt.
Denn sie verbinden alles.
Die Antike — mit der Gegenwart.
Die Wüste — mit dem Meer.
Die Stadt — mit der Natur.
Einen heißen Tag — mit einem warmen Abend.
Über dem Wasser duftet die Luft nach Gewürzen, Ölen, Kaffee, Shisha und Meersalz.
Unter Wasser verschwinden die Gerüche — ersetzt durch die leuchtenden Farben der Korallen und Fische.
Am Strand liegt eine Katze im Schatten, deren Profil aus altägyptischer Kunst vertraut erscheint.
In Hurghada setzt sich Tamara auf den Kopf eines Menschen.
Eine Landschildkröte beendet ihr unendlich wichtiges Blatt.
Delfine ruhen sich nach ihrer nächtlichen Aktivität aus.
Und irgendwo in einer Korallenspalte sitzt Kleomuräne.
All das geschieht gleichzeitig.
Nicht in einem Zoo.
Nicht in einem Buch.
Nicht auf einem Bildschirm.
Hier.
Unter derselben heißen ägyptischen Sonne.
Vielleicht bleibt Ägyptens Tierwelt deshalb so fest im Gedächtnis.
Sie wirkt nicht wie eine eigenständige Sehenswürdigkeit.
Sie ist mit Ägypten selbst verwoben.
Mit seinem Meer.
Seinen Straßen.
Seiner Geschichte.
Seinen Farben.
Seiner Wärme.
Und jenen kleinen zufälligen Begegnungen, die uns irgendwie am längsten begleiten.
🇪🇬 WER LEBT HIER? — ÄGYPTEN
Sehen Sie nicht nur Ägypten.\nEntdecken Sie, wer Ihren Blick erwidert.
PETS & DOGUE\nEine Welt. Jedes Haustier.`)
},

es:{
editorialUI:{
  listen:"Escuchar el artículo",
  stop:"Detener",
  back:"Todos los artículos",
  previous:"Foto anterior",
  next:"Foto siguiente",
  location:"King Tut Bazar · Hurghada, Egipto",
  locationNote:"Tamara vive en una de las pequeñas tiendas; enfrente hay tortugas terrestres y gatos.",
  crab:"Playa de Hula Hula · Egipto",
  generated:"Cleomorena",
  unavailable:"La lectura en voz alta no está disponible en este navegador.",
  fallback:"Se está preparando la traducción completa al idioma seleccionado. Se muestra el artículo en inglés.",
  shortTitle:"Otro Egipto",
  bestWorker:"Mejor empleado",
  source:"Fuente",
  factsTitle:"Siete datos sobre el Egipto vivo",
  mauTitle:"Mau egipcio",
  mauText:"El mau puede «gorjear», saludando a sus humanos con suaves trinos melodiosos.",
  mauAlt:"Un mau egipcio de cuerpo entero",
  catAlt:"Un gato descansa sobre el mostrador de una tienda de Hurghada",
  tamaraAlt:"Tamara mira directamente a la cámara",
  dolphinsLabel:"Delfines",
  crabHeading:"🦀 El cangrejo ha llegado a la reunión de redacción",
  crabOpening:[
    "Ya está aquí.",
    "Lo conocimos en la playa de Hula Hula.",
    "Y ahora tiene su propio lugar en nuestra historia."
  ],
  facts:[
    ["Los delfines tienen su propia «rutina de cuidado de la piel».","Cerca de Hurghada, los delfines se frotan contra determinados corales y esponjas. Los investigadores sugieren que sus compuestos podrían ayudar a cuidar la piel de los delfines."],
    ["Las tortugas tienen «pasaportes fotográficos».","En el mar Rojo egipcio, se identifica a cada tortuga por el dibujo de las escamas de su cabeza y se registra el historial de los encuentros."],
    ["A los delfines se los reconoce por la aleta.","Las cicatrices y las muescas de la aleta dorsal ayudan a los investigadores de Hurghada a distinguir individuos sin colocarles marcas."],
    ["El mar tiene pastos para las vacas marinas.","Los dugongos se alimentan de hierbas marinas. La bahía de Abu Dabbab es conocida por sus extensas praderas submarinas, que ofrecen un hábitat adecuado para estos animales."],
    ["Los buceadores pueden ayudar a estudiar las tortugas.","TurtleWatch recopila observaciones de buceadores y personas que practican esnórquel para conocer mejor dónde se encuentran las tortugas marinas."],
    ["Puedes apadrinar a un animal a distancia.","El refugio egipcio S.P.A.R.E. ofrece la posibilidad de apoyar a gatos, perros y burros aunque no puedas llevarte un animal a casa."],
    ["El mau egipcio sabe «gorjear».","Estos gatos domésticos moteados pueden saludar a sus humanos con suaves trinos melodiosos y gorjeos."]
  ]
},
text:paragraphs(String.raw`🇪🇬 OTRO EGIPTO: EL QUE TE DEVUELVE LA MIRADA
Gatos con rostros que recuerdan las imágenes antiguas, Tamara de Hurghada, tortugas terrestres, delfines después de su «turno de noche», peces de colores luminosos y Cleomorena — la conocida submarina de un buceador egipcio.
Existe el Egipto de las pirámides.
Existe el Egipto de los hoteles y las playas.
Y existe otro más.
Se esconde debajo de una tumbona, se posa en una rama junto a una tienda, mastica hojas despacio, cruza entre los corales y a veces asoma por una grieta del arrecife con una expresión que parece decir que sabe perfectamente que has venido a verlo.
Este es el Egipto vivo.
Este es el Egipto que explora P&D.
No una colección de animales en una enciclopedia, sino un mundo extraordinario de criaturas que viven junto a las personas — en las calles, en las playas y bajo la superficie del mar Rojo.
Y cuanto más las observas, más fuerte se vuelve la sensación:
aquí, los humanos están lejos de ser los únicos protagonistas.
PRIMERO APARECEN LOS GATOS
Durante el calor del mediodía, Egipto parece ir más despacio.
El aire tiembla sobre el suelo caliente.
La arena quema.
Las paredes blancas casi deslumbran.
A lo lejos, el mar brilla en tonos de azul imposibles.
Y en algún lugar, en una franja de sombra fresca, siempre hay un gato.
Los gatos egipcios saben elegir los mejores sitios.
Debajo de una mesa.
Debajo de una tumbona.
Junto a una tienda.
En la playa.
Y a veces — justo donde una persona pensaba pasar.
Algunos mantienen una distancia regia.
Otros se acercan tanto que, en lugar de un retrato, acabas fotografiando una enorme nariz felina.
Fue al mirar nuestras fotografías cuando P&D observó algo extraordinario.
Nos resultan familiares.
Un cuerpo esbelto.
Patas largas.
Orejas grandes.
Un rostro estrecho.
Ojos almendrados.
Algunos tienen líneas oscuras y expresivas alrededor de los ojos, como si estuvieran dibujadas con el kohl del antiguo Egipto.
¿Dónde hemos visto antes estas siluetas?
Claro.
En las imágenes del antiguo Egipto.
En las figurillas.
En los museos.
En obras de arte de hace miles de años.
3.000 AÑOS. LA MISMA ACTITUD.
No, no vamos a contarte esa bonita leyenda de Internet según la cual el gato que está bajo nuestra tumbona desciende directamente del favorito de un faraón.
La ciencia no funciona así.
Pero la realidad resulta igual de interesante.
Los estudios de ADN antiguo muestran que la población felina de Egipto sí desempeñó un papel importante en la expansión de los gatos domésticos por el mundo antiguo. El linaje egipcio se extendió especialmente durante la Antigüedad clásica.
Y los gatos ocupaban un lugar verdaderamente especial en la cultura del antiguo Egipto.
Por eso, un encuentro actual a veces puede parecer casi increíble.
Estamos en 2026.
Una playa.
El mar Rojo.
Un gato esbelto sale de debajo de una tumbona.
Se detiene.
Levanta la cabeza.
Mira directamente al objetivo.
Y durante un segundo, parece desaparecer la distancia entre el Egipto de hoy y el de hace varios miles de años.
El mismo perfil.
La misma mirada.
Y quizá la misma certeza absoluta de que aquí los humanos son el personal de servicio.
🐈 EL PEQUEÑO SECRETO DE P&D
Si quieres fotografiar a un gato egipcio — prueba a no seguirlo.
Agáchate.
Baja el teléfono.
Y espera.
La curiosidad felina a veces hace todo el trabajo del fotógrafo.
Y, a juzgar por nuestras fotos, algunos modelos locales consideran el objetivo un objeto especialmente interesante.
💛 Y TAMARA VIVE EN HURGHADA
Entre todos los personajes de esta historia hay uno que nunca podrías confundir con otro.
Amarillo intenso.
Diminuto.
Sociable.
Y completamente seguro de sí mismo.
Tamara.
Vive con otros periquitos en una tienda de Hurghada.
Por la noche, la ciudad cambia.
El calor del día disminuye.
Se encienden los letreros de colores.
De las tiendas abiertas salen aromas de aceites y perfumes orientales.
En algún lugar huele a especias y café.
En otro — a fruta.
El aire mezcla el humo ligero y algo dulce de la shisha, el calor de las piedras calentadas por el sol y el aliento salado del mar.
Y en medio de esta sinfonía del atardecer egipcio está Tamara.
Todo le parece bien.
Una mano humana — sirve.
Un hombro — excelente.
Una cabeza — prácticamente un palco VIP.
A juzgar por las fotografías, sigue sin estar claro quién vino a ver a quién.
Nosotros vinimos a ver a Tamara.
Tamara, claramente, vino a vernos a nosotros.
EL VEREDICTO DE P&D:
Cargo: desconocido.
Lugar de trabajo: una tienda de Hurghada.
Especialidad: relaciones públicas.
Nivel de confianza: directora general.
🐢 DESPUÉS, EL TIEMPO SE DETIENE
De un loro que aterriza en tu cabeza en cuestión de segundos — a una criatura que no tiene absolutamente ningún motivo para darse prisa.
Tortugas terrestres.
Una grande.
Una pequeña.
Y una realmente diminuta.
Una cabe cómodamente en la palma de una mano y sigue masticando hojas como si no ocurriera nada a su alrededor.
Y entonces comprendes lo diferente que es la experiencia del mundo para los animales.
Una persona ya ha hecho diez fotografías.
Ha consultado sus mensajes.
Ha pensado adónde ir después.
Y la tortuga todavía está terminando su primera hoja.
Quizá por eso estar cerca de ellas resulta tan tranquilo.
EL CONSEJO DE P&D:
A veces, el mejor asesor de bienestar egipcio pesa menos de un kilogramo y lleva su propia casa a cuestas.
🌊 Y AHORA — BAJO EL AGUA
Aquí comienza una fauna completamente distinta.
Unos pasos por el agua cálida.
Una máscara.
Una respiración.
La cabeza se sumerge bajo la superficie.
Y el Egipto conocido desaparece.
No hay olor a especias.
No hay voces.
No hay shisha.
No hay aire caliente.
Solo quedan luz, agua y color.
BIENVENIDO A OTRO EGIPTO.
El mar Rojo es sorprendentemente transparente.
Los rayos de sol atraviesan el agua y recorren el fondo.
Y entonces comienza una auténtica explosión de color.
Turquesa.
Azul eléctrico.
Amarillo limón.
Violeta.
Naranja.
Rosa.
Plata.
Los peces se desplazan entre los corales en nubes enteras.
Algunos parecen joyas.
Otros — personajes de dibujos animados.
Otros parecen creados por un diseñador al que le hubieran permitido utilizar todos los colores a la vez.
Y de repente lo comprendes:
Egipto no necesita ningún filtro.
🐠 UNA METRÓPOLIS SUBMARINA
El mar Rojo es mucho más que un lugar bonito para practicar esnórquel.
Es un inmenso mundo vivo.
Sus aguas egipcias albergan más de mil especies de peces y cientos de especies de coral.
Algunas especies son propias de esta región.
Por eso, dos tramos vecinos de arrecife pueden parecer dos barrios completamente distintos de la misma ciudad.
Solo que aquí los bancos de peces sustituyen a los coches.
Los corales sustituyen a las casas.
Y los atascos son mucho más bonitos.
🪸 UN DATO QUE TODAVÍA SORPRENDE A MUCHAS PERSONAS
Un coral es un animal.
No una planta.
No una roca submarina extraña.
Un animal.
Los diminutos pólipos de coral viven en colonias y, a lo largo de períodos inmensos, crean estructuras que se convierten en arrecifes enteros.
Así que el fantástico «jardín» que contemplas con la máscara de esnórquel es en realidad una enorme ciudad viva.
En los alrededores de Ras Mohammed se han registrado cientos de variedades de corales duros y blandos.
Pero hay un dato todavía más asombroso.
Una parte de la propia península de Ras Mohammed está formada por un antiguo arrecife de coral fósil que se elevó hace decenas de miles de años.
El resultado es una imagen casi increíble:
debajo de ti — un arrecife vivo.
y cerca, sobre el agua — la huella de un arrecife antiguo.
Egipto sabe unir el pasado y el presente incluso bajo el agua.
👑 AHORA, CONOCE A LA REINA
Todo buen barrio tiene una celebridad local.
Nuestro arrecife también.
P&D escuchó la historia de un instructor de buceo egipcio que pasa mucho tiempo bajo el agua.
Cuando un turista mira un arrecife, ve muchos peces.
Cuando una misma persona bucea allí habitualmente, las cosas cambian un poco.
Empieza a reconocer lugares.
Grietas.
Rutas.
Y a veces — habitantes concretos.
Nuestro buceador nos habló de una morena que encuentra una y otra vez.
La reconoce.
Aparece en un lugar conocido.
Y con el tiempo, estos encuentros se han convertido en una especie de relación submarina.
¿Podría llamarse amistad desde el punto de vista de la morena?
No se lo hemos preguntado.
Pero P&D decidió una cosa con total seguridad:
un personaje así no puede quedarse sin nombre.
CLEOMORENA 👑
Cleomorena — reina del arrecife.
Hogar: el mar Rojo.
Residencia: una grieta de coral.
Vistas desde la ventana: 10/10.
Código de vestimenta: alta costura natural.
Carácter: regio.
Número de dientes: la pregunta se ha considerado demasiado personal.
Recepción de visitas: exclusivamente según el criterio de Su Majestad.
Sabemos cómo la llama el buceador egipcio.
Pero hay algo mucho más interesante:
¿cómo lo llama Cleomorena a él?
¿«Ese humano con la botella»?
¿«Otra vez aquí»?
¿O tiene de verdad su propio nombre de morena para él?
Quizá algunos misterios egipcios sea mejor dejárselos al mar Rojo.
🐬 DELFINES QUE TRABAJAN DE NOCHE
Más adelante en esta historia aparece uno de los personajes marinos favoritos de la humanidad.
El delfín.
Pero aquí también hay un pequeño secreto egipcio.
Cerca de Marsa Alam está el arrecife de Samadai — la famosa Casa de los Delfines.
Allí se pueden encontrar delfines giradores.
Y tienen una rutina diaria muy interesante.
Están activos y se alimentan principalmente por la noche, mientras que durante el día utilizan la laguna protegida para descansar.
Así que la situación viene a ser esta.
Un turista se despierta.
Desayuna.
Se pone el bañador.
Anuncia alegremente:
«¡Hoy vamos a ver delfines!»
Y en algún lugar de la laguna:
🐬
«¿Podrían bajar el volumen? Acabamos de terminar el turno de noche».
💙 EL MEJOR ENCUENTRO ES EL QUE ELIGE EL ANIMAL
Por eso, a P&D le gusta especialmente un principio sencillo para observar animales marinos.
No intentes fabricar el momento perfecto.
Deja que ocurra.
Si un delfín se acerca por voluntad propia — es mágico.
Si un pez pasa delante de la cámara — haz la foto.
Si Cleomorena decide quedarse hoy en casa — la reina tiene un día libre.
La fauna salvaje es hermosa precisamente porque no sigue el horario de los turistas.
🌴 ¿SABES QUÉ MÁS CRECE JUNTO AL MAR ROJO?
Manglares.
Y este es uno de los contrastes con los que Egipto nos sorprende constantemente.
Montañas desérticas.
Arena.
Mar azul.
Arrecifes de coral.
Y de pronto — espesuras verdes de manglar.
Por ejemplo, el espacio natural de Nabq, cerca de Sharm el-Sheij, es conocido por combinar paisaje desértico, mar, arrecifes y manglares.
Y una vez más, resulta que la fauna de Egipto no existe como una serie de imágenes aisladas.
Todo está conectado.
La costa.
Las plantas.
El arrecife.
Los peces.
Las aves.
Los animales terrestres.
El mar.
Un inmenso mundo vivo.
🦀 EL CANGREJO HA LLEGADO A LA REUNIÓN DE REDACCIÓN
Ya está aquí.
Lo conocimos en la playa de Hula Hula.
Y ahora tiene su propio lugar en nuestra historia.
Después de Tamara, los gatos de playa, las tortugas terrestres, los miles de peces, los delfines y Cleomorena, ya es difícil sorprendernos.
Aunque…
Esto es Egipto.
Seguramente lo conseguirá.
✨ P&D WILD EGYPT — 7 DATOS PARA RECORDAR
01 — Los corales son animales.
Tu «jardín submarino» está realmente vivo.
02 — El mar Rojo es extraordinariamente rico en peces.
Aquí hay más de mil especies.
03 — Los delfines también necesitan descansar.
En Samadai, los delfines giradores utilizan la laguna como refugio diurno después de su actividad nocturna.
04 — Egipto desempeñó un papel importante en la historia de los gatos domésticos.
El ADN antiguo revela la expansión del linaje felino egipcio mucho más allá del país.
05 — El desierto y los manglares pueden ser vecinos.
El mar Rojo reúne paisajes que nunca esperarías encontrar uno al lado del otro.
06 — Para una historia inusual del arrecife, la mejor persona es un buceador local experimentado.
En lugar de preguntar «¿Qué vive aquí?», prueba con:
«¿A quién conoces aquí?»
07 — No puedes reservar de antemano el animal más interesante de tu viaje.
Quizá sea un delfín.
Quizá — una morena.
O quizá — un gato de playa descarado que decida que tu teléfono le pertenece.
☀️ EL EGIPTO VIVO
Quizá sean los animales los que hacen que Egipto resulte especialmente cercano.
Porque lo conectan todo.
La Antigüedad — con el presente.
El desierto — con el mar.
La ciudad — con la naturaleza.
Un día caluroso — con una tarde cálida.
Sobre el agua, el aire huele a especias, aceites, café, shisha y sal marina.
Bajo el agua, los olores desaparecen — sustituidos por los intensos colores de los corales y los peces.
En la playa, un gato descansa a la sombra con un perfil que parece conocido por el arte del antiguo Egipto.
En Hurghada, Tamara se posa en la cabeza de alguien.
Una tortuga terrestre termina su hoja de infinita importancia.
Los delfines descansan después de su actividad nocturna.
Y en algún lugar de una grieta de coral está Cleomorena.
Todo esto ocurre al mismo tiempo.
No en un zoo.
No en un libro.
No en una pantalla.
Aquí.
Bajo el mismo sol ardiente de Egipto.
Quizá por eso la fauna de Egipto permanece tan firmemente en la memoria.
No parece una atracción independiente.
Está entretejida en el propio Egipto.
En su mar.
Sus calles.
Su historia.
Sus colores.
Su calidez.
Y esos pequeños encuentros casuales que, de alguna manera, son los que más tiempo nos acompañan.
🇪🇬 ¿QUIÉN VIVE AQUÍ? — EGIPTO
No te limites a ver Egipto.\nDescubre quién te devuelve la mirada.
PETS & DOGUE\nUn mundo. Cada mascota.`)
}

});

})();
/* PETS & DOGUE — additional Egypt languages: Italian and Portuguese. */
(function(){
"use strict";

const add=window.PetsDogueEgypt?.add;
if(!add)throw new Error("Load the shared Egypt dictionary first");

function paragraphs(value){
  return value.trim().split("\n").map(function(line){
    return line.replace(/\\n/g,"\n");
  }).join("\n\n");
}

add({
it:{
editorialUI:{
  listen:"Ascolta l’articolo",
  stop:"Interrompi",
  back:"Tutti gli articoli",
  previous:"Foto precedente",
  next:"Foto successiva",
  location:"King Tut Bazar · Hurghada, Egitto",
  locationNote:"Tamara vive in uno dei piccoli negozi; di fronte si trovano tartarughe e gatti.",
  crab:"Spiaggia di Hula Hula · Egitto",
  generated:"Cleomoray",
  unavailable:"La lettura vocale non è disponibile in questo browser.",
  fallback:"La traduzione completa nella lingua selezionata è in preparazione. Viene mostrato l’articolo in inglese.",
  shortTitle:"Un altro Egitto",
  bestWorker:"Miglior dipendente",
  source:"Fonte",
  factsTitle:"Sette fatti sull’Egitto vivente",
  mauTitle:"Mau egiziano",
  mauText:"Il mau può «cinguettare», salutando i suoi umani con dolci trilli melodiosi.",
  mauAlt:"Un mau egiziano a figura intera",
  catAlt:"Un gatto riposa sul bancone di un negozio a Hurghada",
  tamaraAlt:"Tamara guarda dritto nell’obiettivo",
  dolphinsLabel:"Delfini",
  crabHeading:"🦀 Il granchio è arrivato alla riunione di redazione",
  crabOpening:[
    "È già qui.",
    "Lo abbiamo incontrato sulla spiaggia di Hula Hula.",
    "E ora ha un posto tutto suo nella nostra storia."
  ],
  facts:[
    [
      "I delfini hanno una loro «routine per la pelle».",
      "Vicino a Hurghada, i delfini si strofinano contro alcuni coralli e spugne. I ricercatori ipotizzano che le loro sostanze possano aiutare la cura della pelle."
    ],
    [
      "Le tartarughe hanno «passaporti fotografici».",
      "Nel Mar Rosso egiziano le singole tartarughe vengono riconosciute dal disegno delle squame sulla testa, permettendo di registrare gli incontri ripetuti."
    ],
    [
      "I delfini si riconoscono dalla pinna.",
      "Cicatrici e intaccature sulla pinna dorsale aiutano i ricercatori di Hurghada a distinguere i singoli delfini senza applicare marcatori."
    ],
    [
      "Nel mare ci sono pascoli per le mucche marine.",
      "I dugonghi si nutrono di fanerogame marine. La baia di Abu Dabbab ha vaste praterie sottomarine che offrono un habitat adatto a questi animali."
    ],
    [
      "Chi si immerge può aiutare a studiare le tartarughe.",
      "TurtleWatch raccoglie osservazioni di subacquei e appassionati di snorkeling per conoscere meglio i luoghi frequentati dalle tartarughe marine."
    ],
    [
      "Si può sostenere un animale a distanza.",
      "Il rifugio egiziano S.P.A.R.E. offre la possibilità di sostenere gatti, cani e asini anche se non potete portarli a casa."
    ],
    [
      "Il mau egiziano sa «cinguettare».",
      "Questi gatti domestici maculati possono salutare i loro umani con dolci trilli melodiosi e suoni simili a cinguettii."
    ]
  ]
},
text:paragraphs(String.raw`🇪🇬 UN ALTRO EGITTO: QUELLO CHE TI GUARDA A SUA VOLTA
Gatti dai volti delle immagini antiche, Tamara di Hurghada, tartarughe, delfini dopo il «turno di notte», pesci dai colori al neon e Cleomoray — una conoscenza subacquea di un sommozzatore egiziano.
Esiste l’Egitto delle piramidi.
Esiste l’Egitto degli hotel e delle spiagge.
E poi ce n’è un altro.
Si nasconde sotto un lettino, si posa su un ramo accanto a un negozio, mastica lentamente verdure, guizza tra i coralli e a volte sbircia da una fessura del reef con un’espressione che sembra dire: sa benissimo che sei venuto proprio per lui.
Questo è l’Egitto vivente.
È l’Egitto che esplora P&D.
Non una raccolta di animali in un’enciclopedia, ma uno straordinario mondo di creature che vivono accanto alle persone — nelle strade, sulle spiagge e sotto la superficie del Mar Rosso.
E più le osservi, più cresce la sensazione:
qui gli esseri umani non sono certo gli unici protagonisti.
PER PRIMI COMPAIONO I GATTI
A mezzogiorno, con il caldo, l’Egitto sembra rallentare.
L’aria trema sopra il terreno rovente.
La sabbia è calda.
Le pareti bianche sono quasi abbaglianti.
In lontananza il mare brilla di sfumature di blu impossibili.
E da qualche parte, in una fresca striscia d’ombra, c’è sempre un gatto.
I gatti egiziani sanno scegliere i posti migliori.
Sotto un tavolo.
Sotto un lettino.
Accanto a un negozio.
Sulla spiaggia.
E a volte — proprio dove una persona stava per passare.
Alcuni mantengono una distanza regale.
Altri si avvicinano tanto che, invece di un ritratto, ottieni la fotografia di un enorme naso felino.
È stato guardando le nostre fotografie che P&D ha notato qualcosa di sorprendente.
Sembrano familiari.
Un corpo snello.
Zampe lunghe.
Orecchie grandi.
Un muso affusolato.
Occhi a mandorla.
Alcuni hanno marcate linee scure intorno agli occhi, come tracciate con l’antico kohl egiziano.
Dove abbiamo già visto queste sagome?
Ma certo.
Nelle immagini dell’Antico Egitto.
Nelle statuette.
Nei musei.
Nell’arte di migliaia di anni fa.
3.000 ANNI. LO STESSO CARATTERE.
No, non vi racconteremo una bella leggenda di internet secondo cui quel preciso gatto sotto il nostro lettino discende direttamente dal preferito di un faraone.
La scienza non funziona così.
Ma la realtà si rivela altrettanto interessante.
Gli studi sul DNA antico mostrano che la popolazione felina egiziana ebbe davvero un ruolo importante nella diffusione dei gatti domestici nel mondo antico. La linea egiziana si diffuse particolarmente durante l’antichità classica.
E nella cultura dell’Antico Egitto i gatti occupavano un posto davvero speciale.
Ecco perché un incontro di oggi può sembrare quasi incredibile.
È il 2026.
Una spiaggia.
Il Mar Rosso.
Un gatto snello esce da sotto un lettino.
Si ferma.
Alza la testa.
Guarda dritto nell’obiettivo.
E per un secondo la distanza tra l’Egitto di oggi e quello di migliaia di anni fa sembra scomparire.
Lo stesso profilo.
Lo stesso sguardo.
E forse la stessa assoluta convinzione che qui gli umani siano il personale di servizio.
🐈 IL PICCOLO SEGRETO DI P&D
Se volete fotografare un gatto egiziano, provate a non seguirlo.
Accovacciatevi.
Abbassate il telefono.
E aspettate.
A volte la curiosità felina fa tutto il lavoro del fotografo.
E a giudicare dalle nostre immagini, alcune modelle locali trovano l’obiettivo un oggetto eccezionalmente interessante.
💛 E A HURGHADA VIVE TAMARA
Tra tutti i personaggi di questa storia, ce n’è uno che non potreste mai confondere con nessun altro.
Giallo acceso.
Minuscolo.
Socievole.
E completamente sicuro di sé.
Tamara.
Vive con altri pappagallini ondulati in uno dei negozi di Hurghada.
La sera la città cambia.
Il caldo del giorno si attenua.
Si accendono insegne colorate.
Dai negozi aperti arrivano profumi di oli ed essenze orientali.
Da qualche parte si sente odore di spezie e caffè.
Altrove — di frutta.
Nell’aria si mescolano il fumo leggero e dolciastro del narghilè, il calore della pietra scaldata dal sole e il respiro salato del mare.
E nel mezzo di questa sinfonia serale egiziana c’è Tamara.
Le va bene tutto.
Una mano umana — va bene.
Una spalla — ottima.
Una testa — praticamente un palco VIP.
A giudicare dalle fotografie, resta aperta la questione di chi sia venuto a vedere chi.
Noi siamo venuti a vedere Tamara.
Tamara è chiaramente venuta a vedere noi.
IL VERDETTO DI P&D:
Ruolo: sconosciuto.
Luogo di lavoro: un negozio a Hurghada.
Specializzazione: pubbliche relazioni.
Livello di sicurezza: CEO.
🐢 POI IL TEMPO SI FERMA
Da un pappagallino che ti si posa sulla testa in pochi secondi a una creatura che non ha proprio alcun motivo di correre.
Le tartarughe terrestri.
Una grande.
Una piccola.
E una davvero minuscola.
Una sta comodamente nel palmo di una mano e continua a masticare verdure come se intorno non succedesse assolutamente nulla.
Ed è qui che capisci quanto diversamente gli animali vivano il mondo.
Una persona ha già scattato dieci foto.
Controllato i messaggi.
Pensato a dove andare dopo.
E la tartaruga sta ancora finendo la sua prima foglia.
Forse è per questo che accanto a loro ci si sente così tranquilli.
IL CONSIGLIO DI P&D:
A volte il miglior wellness coach egiziano pesa meno di un chilo e porta la propria casa sulla schiena.
🌊 E ORA — SOTT’ACQUA
Qui comincia una fauna completamente diversa.
Qualche passo nell’acqua calda.
Una maschera.
Un respiro.
La testa scende sotto la superficie.
E l’Egitto familiare scompare.
Niente profumo di spezie.
Niente voci.
Niente narghilè.
Niente aria rovente.
Restano solo luce, acqua e colore.
BENVENUTI IN UN ALTRO EGITTO.
Il Mar Rosso è sorprendentemente trasparente.
I raggi del sole attraversano l’acqua e corrono sul fondale.
E poi arriva una vera esplosione di colori.
Turchese.
Blu elettrico.
Giallo limone.
Viola.
Arancione.
Rosa.
Argento.
I pesci passano tra i coralli in intere nuvole.
Alcuni sembrano gioielli.
Altri — personaggi dei cartoni animati.
Altri ancora sembrano il risultato di un designer autorizzato a usare tutti i colori insieme.
E all’improvviso capisci:
l’Egitto non ha bisogno di alcun filtro.
🐠 UNA METROPOLI SOTTOMARINA
Il Mar Rosso è molto più di un bel posto per fare snorkeling.
È un immenso mondo vivente.
Nelle sue acque egiziane vivono più di mille specie di pesci e centinaia di specie di coralli.
Alcune specie si trovano proprio in questa regione.
Ecco perché due tratti vicini del reef possono sembrare due quartieri completamente diversi della stessa città.
Solo che qui al posto delle auto ci sono banchi di pesci.
Al posto delle case — coralli.
E gli ingorghi sono molto più belli.
🪸 UN FATTO CHE SORPRENDE ANCORA MOLTE PERSONE
Il corallo è un animale.
Non una pianta.
Non una strana roccia sottomarina.
Un animale.
I minuscoli polipi corallini vivono in colonie e, in periodi di tempo immensi, creano strutture che diventano interi reef.
Quel fantastico «giardino» sotto la vostra maschera è quindi, in realtà, un’enorme città vivente.
Intorno a Ras Mohammed sono state registrate centinaia di varietà di coralli duri e molli.
Ma c’è un fatto ancora più sorprendente.
Una parte della stessa penisola di Ras Mohammed è formata da un antico reef corallino fossile emerso decine di migliaia di anni fa.
Ne risulta un’immagine quasi incredibile:
sotto di voi — un reef vivente.
e vicino, sopra l’acqua — la traccia di un reef antico.
L’Egitto sa unire passato e presente anche sott’acqua.
👑 ORA CONOSCETE LA REGINA
Ogni buon quartiere ha una celebrità locale.
Anche il nostro reef ne ha una.
P&D ha ascoltato il racconto di un istruttore di immersioni egiziano che trascorre molto tempo sott’acqua.
Quando un turista guarda un reef, vede tanti pesci.
Quando la stessa persona si immerge lì regolarmente, le cose cambiano un po’.
Comincia a riconoscere i luoghi.
Le fessure.
I percorsi.
E a volte — i singoli abitanti.
Il nostro sommozzatore ci ha raccontato di una murena che incontra più e più volte.
La riconosce.
Lei compare in un posto familiare.
E col tempo questi incontri sono diventati una specie di conoscenza subacquea.
Si può chiamarla amicizia dal punto di vista della murena?
Non glielo abbiamo chiesto.
Ma P&D ha deciso una cosa con certezza:
un personaggio così non può restare senza nome.
CLEOMORAY 👑
Cleomoray — regina del reef.
Casa: il Mar Rosso.
Residenza: una fessura corallina.
Vista dalla finestra: 10/10.
Dress code: natural couture.
Carattere: regale.
Numero di denti: domanda ritenuta troppo personale.
Ricevimento dei visitatori: esclusivamente a discrezione di Sua Maestà.
Sappiamo come la chiama il sommozzatore egiziano.
Ma un’altra cosa è molto più interessante:
come chiama lui Cleomoray?
«Quell’umano con la bombola»?
«Di nuovo qui»?
Oppure ha davvero un suo nome da murena per lui?
Forse alcuni misteri egiziani è meglio lasciarli al Mar Rosso.
🐬 DELFINI CHE LAVORANO DI NOTTE
Più avanti in questa storia compare uno dei personaggi marini preferiti dagli esseri umani.
Il delfino.
Ma anche qui c’è un piccolo segreto egiziano.
Vicino a Marsa Alam si trova il reef di Samadai — la famosa Dolphin House.
Lì si possono incontrare le stenelle dal lungo rostro.
E hanno un ritmo quotidiano molto interessante.
Sono attive e si nutrono soprattutto di notte, mentre di giorno usano la laguna riparata per riposare.
La situazione assomiglia quindi a questa.
Un turista si sveglia.
Fa colazione.
Indossa il costume.
Annuncia felice:
«Oggi andiamo a vedere i delfini!»
E da qualche parte nella laguna:
🐬
«Potreste abbassare la voce? Abbiamo appena finito il turno di notte.»
💙 L’INCONTRO MIGLIORE È QUELLO SCELTO DALL’ANIMALE
Ecco perché a P&D piace particolarmente un principio semplice per osservare gli animali marini.
Non cercate di costruire il momento perfetto.
Lasciate che accada.
Se un delfino si avvicina spontaneamente — è magico.
Se un pesce passa davanti alla fotocamera — scattate.
Se Cleomoray decide di restare a casa oggi — la regina ha un giorno libero.
La natura selvaggia è bella proprio perché non segue l’orario del turista.
🌴 SAPETE COS’ALTRO CRESCE ACCANTO AL MAR ROSSO?
Le mangrovie.
Ed è uno dei contrasti con cui l’Egitto continua a sorprenderci.
Montagne desertiche.
Sabbia.
Mare blu.
Reef corallini.
E all’improvviso — verdi boschetti di mangrovie.
Per esempio, l’area naturale di Nabq, vicino a Sharm El Sheikh, è conosciuta per la combinazione di paesaggio desertico, mare, reef e mangrovie.
E ancora una volta scopriamo che la fauna egiziana non esiste come una serie di immagini separate.
Tutto è collegato.
La costa.
Le piante.
Il reef.
I pesci.
Gli uccelli.
Gli animali terrestri.
Il mare.
Un enorme mondo vivente.
🦀 IL GRANCHIO È ARRIVATO ALLA RIUNIONE DI REDAZIONE
È già qui.
Lo abbiamo incontrato sulla spiaggia di Hula Hula.
E ora ha un posto tutto suo nella nostra storia.
Perché dopo Tamara, i gatti delle spiagge, le tartarughe, migliaia di pesci, i delfini e Cleomoray, ormai è difficile sorprenderci.
Anche se...
Questo è l’Egitto.
Probabilmente ci riuscirà.
✨ P&D WILD EGYPT — 7 FATTI DA RICORDARE
01 — I coralli sono animali.
Il vostro «giardino subacqueo» è davvero vivo.
02 — Il Mar Rosso è straordinariamente ricco di pesci.
Qui si trovano più di mille specie.
03 — Anche i delfini hanno bisogno di riposo.
A Samadai le stenelle dal lungo rostro usano la laguna come rifugio diurno dopo l’attività notturna.
04 — L’Egitto ebbe un ruolo importante nella storia dei gatti domestici.
Il DNA antico rivela la diffusione della linea felina egiziana ben oltre i confini del paese.
05 — Deserto e mangrovie possono essere vicini.
Il Mar Rosso unisce paesaggi che non vi aspettereste mai di vedere uno accanto all’altro.
06 — La persona migliore per una storia insolita sul reef è un sommozzatore locale esperto.
Invece di «Che cosa vive qui?», provate a chiedere:
«Chi conosci qui?»
07 — Non potete prenotare in anticipo l’animale più interessante del vostro viaggio.
Forse sarà un delfino.
Forse — una murena.
O forse — uno sfacciato gatto di spiaggia che decide che il vostro telefono gli appartiene.
☀️ L’EGITTO VIVENTE
Forse sono gli animali a farci sentire l’Egitto particolarmente vicino.
Perché collegano tutto.
L’antichità — al presente.
Il deserto — al mare.
La città — alla natura.
Una giornata calda — a una serata tiepida.
Sopra l’acqua l’aria profuma di spezie, oli, caffè, narghilè e sale marino.
Sott’acqua i profumi scompaiono, sostituiti dai colori luminosissimi di coralli e pesci.
Sulla spiaggia un gatto riposa all’ombra con un profilo che sembra familiare dall’arte dell’Antico Egitto.
A Hurghada Tamara si sistema sulla testa di qualcuno.
Una tartaruga finisce la sua foglia infinitamente importante.
I delfini riposano dopo l’attività notturna.
E da qualche parte, in una fessura corallina, c’è Cleomoray.
Tutto questo accade contemporaneamente.
Non in uno zoo.
Non in un libro.
Non su uno schermo.
Qui.
Sotto un unico, caldo sole egiziano.
E forse è per questo che la fauna egiziana resta così impressa nella memoria.
Non sembra un’attrazione a parte.
È intrecciata all’Egitto stesso.
Al suo mare.
Alle sue strade.
Alla sua storia.
Ai suoi colori.
Al suo calore.
E a quei piccoli incontri casuali che, chissà perché, restano con noi più a lungo.
🇪🇬 CHI VIVE QUI? — EGITTO
Non limitarti a vedere l’Egitto.\nScopri chi ti guarda a sua volta.
PETS & DOGUE\nOne world. Every pet.`)
},

pt:{
editorialUI:{
  listen:"Ouvir o artigo",
  stop:"Parar",
  back:"Todos os artigos",
  previous:"Fotografia anterior",
  next:"Fotografia seguinte",
  location:"King Tut Bazar · Hurghada, Egito",
  locationNote:"Tamara vive numa das pequenas lojas; em frente encontram-se tartarugas e gatos.",
  crab:"Praia de Hula Hula · Egito",
  generated:"Cleomoray",
  unavailable:"A leitura em voz alta não está disponível neste navegador.",
  fallback:"A tradução completa para a língua selecionada está em preparação. É apresentado o artigo em inglês.",
  shortTitle:"Outro Egito",
  bestWorker:"Melhor funcionário",
  source:"Fonte",
  factsTitle:"Sete factos sobre o Egito vivo",
  mauTitle:"Mau egípcio",
  mauText:"O mau pode «chilrear», saudando os seus humanos com suaves trinados melodiosos.",
  mauAlt:"Um mau egípcio de corpo inteiro",
  catAlt:"Um gato descansa no balcão de uma loja em Hurghada",
  tamaraAlt:"Tamara olha diretamente para a objetiva",
  dolphinsLabel:"Golfinhos",
  crabHeading:"🦀 O caranguejo chegou à reunião de redação",
  crabOpening:[
    "Já cá está.",
    "Encontrámo-lo na praia de Hula Hula.",
    "E agora tem o seu próprio lugar na nossa história."
  ],
  facts:[
    [
      "Os golfinhos têm a sua própria «rotina para a pele».",
      "Perto de Hurghada, os golfinhos esfregam-se em determinados corais e esponjas. Os investigadores sugerem que as suas substâncias podem ajudar a cuidar da pele."
    ],
    [
      "As tartarugas têm «passaportes fotográficos».",
      "No Mar Vermelho egípcio, cada tartaruga é reconhecida pelo padrão das escamas na cabeça, permitindo registar encontros repetidos."
    ],
    [
      "Os golfinhos são reconhecidos pela barbatana.",
      "As cicatrizes e os entalhes na barbatana dorsal ajudam os investigadores de Hurghada a distinguir os golfinhos sem colocar marcas nos animais."
    ],
    [
      "O mar tem pastagens para vacas marinhas.",
      "Os dugongos alimentam-se de ervas marinhas. A baía de Abu Dabbab possui extensas pradarias subaquáticas que proporcionam um habitat adequado a estes animais."
    ],
    [
      "Os mergulhadores podem ajudar a estudar tartarugas.",
      "O TurtleWatch recolhe observações de mergulhadores e praticantes de snorkeling para conhecer melhor os locais onde ocorrem tartarugas marinhas."
    ],
    [
      "Pode apoiar um animal à distância.",
      "O abrigo egípcio S.P.A.R.E. permite apoiar gatos, cães e burros mesmo que não possa levar um animal para casa."
    ],
    [
      "Os maus egípcios conseguem «chilrear».",
      "Estes gatos domésticos malhados podem saudar os seus humanos com suaves trinados melodiosos e sons semelhantes a chilreios."
    ]
  ]
},
text:paragraphs(String.raw`🇪🇬 OUTRO EGITO: AQUELE QUE OLHA DE VOLTA PARA SI
Gatos com rostos das imagens antigas, Tamara de Hurghada, tartarugas, golfinhos depois do «turno da noite», peixes de cores néon e Cleomoray — uma conhecida subaquática de um mergulhador egípcio.
Há o Egito das pirâmides.
Há o Egito dos hotéis e das praias.
E há outro.
Esconde-se debaixo de uma espreguiçadeira, pousa num ramo ao lado de uma loja, mastiga verduras devagar, passa velozmente entre os corais e às vezes espreita de uma fenda do recife com uma expressão que sugere saber perfeitamente que veio só para o ver.
Este é o Egito vivo.
É o Egito que a P&D explora.
Não uma coleção de animais numa enciclopédia, mas um mundo extraordinário de criaturas que vivem ao lado das pessoas — nas ruas, nas praias e debaixo da superfície do Mar Vermelho.
E quanto mais as observamos, mais forte se torna a sensação:
os seres humanos estão longe de ser os únicos protagonistas aqui.
PRIMEIRO APARECEM OS GATOS
Ao meio-dia, com o calor, o Egito parece abrandar.
O ar tremula sobre o chão aquecido.
A areia está quente.
As paredes brancas são quase deslumbrantes.
Ao longe, o mar brilha em tons de azul impossíveis.
E algures, numa faixa fresca de sombra, há sempre um gato.
Os gatos egípcios sabem escolher os melhores lugares.
Debaixo de uma mesa.
Debaixo de uma espreguiçadeira.
Ao lado de uma loja.
Na praia.
E às vezes — exatamente onde uma pessoa ia passar.
Alguns mantêm uma distância majestosa.
Outros aproximam-se tanto que, em vez de um retrato, conseguimos a fotografia de um enorme nariz felino.
Foi ao olhar para as nossas fotografias que a P&D notou algo surpreendente.
Parecem familiares.
Um corpo esguio.
Patas compridas.
Orelhas grandes.
Um focinho estreito.
Olhos amendoados.
Alguns têm linhas escuras expressivas em redor dos olhos, como se fossem desenhadas com o antigo kohl egípcio.
Onde já vimos estas silhuetas?
Claro.
Nas imagens do Antigo Egito.
Nas estatuetas.
Nos museus.
Na arte com milhares de anos.
3.000 ANOS. A MESMA ATITUDE.
Não, não vamos contar uma bonita lenda da internet segundo a qual aquele gato específico debaixo da nossa espreguiçadeira descende diretamente do favorito de um faraó.
A ciência não funciona assim.
Mas a verdade revela-se igualmente interessante.
Os estudos de ADN antigo mostram que a população felina do Egito teve realmente um papel importante na expansão dos gatos domésticos pelo mundo antigo. A linhagem egípcia espalhou-se especialmente durante a Antiguidade clássica.
E os gatos ocupavam um lugar verdadeiramente especial na cultura do Antigo Egito.
É por isso que um encontro atual pode por vezes parecer quase inacreditável.
Estamos em 2026.
Uma praia.
O Mar Vermelho.
Um gato esguio sai de debaixo de uma espreguiçadeira.
Para.
Levanta a cabeça.
Olha diretamente para a objetiva.
E por um segundo a distância entre o Egito de hoje e o Egito de há milhares de anos parece desaparecer.
O mesmo perfil.
O mesmo olhar.
E talvez a mesma convicção absoluta de que aqui os humanos são o pessoal de serviço.
🐈 O PEQUENO SEGREDO DA P&D
Se quiser fotografar um gato egípcio, experimente não o seguir.
Agache-se.
Baixe o telemóvel.
E espere.
A curiosidade felina por vezes faz todo o trabalho do fotógrafo.
E, a julgar pelas nossas imagens, alguns modelos locais acham a objetiva um objeto excecionalmente interessante.
💛 E TAMARA VIVE EM HURGHADA
Entre todas as personagens desta história, há uma que nunca confundiria com outra.
Amarela viva.
Minúscula.
Sociável.
E completamente segura de si.
Tamara.
Vive com outros periquitos numa das lojas de Hurghada.
À noite, a cidade muda.
O calor do dia abranda.
Acendem-se letreiros coloridos.
Das lojas abertas chegam aromas de óleos e perfumes orientais.
Algures sente-se o cheiro de especiarias e café.
Noutro lugar — de fruta.
No ar misturam-se o fumo leve e adocicado do narguilé, o calor da pedra aquecida pelo sol e o sopro salgado do mar.
E no meio desta sinfonia noturna egípcia está Tamara.
Tudo lhe serve.
Uma mão humana — serve.
Um ombro — excelente.
Uma cabeça — praticamente um camarote VIP.
A julgar pelas fotografias, a questão de quem veio ver quem continua em aberto.
Nós viemos ver Tamara.
Tamara veio claramente ver-nos.
VEREDITO DA P&D:
Cargo: desconhecido.
Local de trabalho: uma loja em Hurghada.
Especialidade: relações públicas.
Nível de confiança: CEO.
🐢 DEPOIS O TEMPO PARA
De um periquito que pousa na sua cabeça em segundos passamos a uma criatura sem qualquer motivo para ter pressa.
As tartarugas terrestres.
Uma grande.
Uma pequena.
E uma verdadeiramente minúscula.
Uma cabe confortavelmente na palma da mão e continua a mastigar verduras como se não estivesse a acontecer absolutamente nada à sua volta.
E aqui percebemos como os animais vivem o mundo de formas diferentes.
Uma pessoa já tirou dez fotografias.
Viu as mensagens.
Pensou para onde ir a seguir.
E a tartaruga ainda está a acabar a primeira folha.
Talvez seja por isso que estar perto delas nos traz tanta tranquilidade.
CONSELHO DA P&D:
Por vezes, o melhor orientador de bem-estar egípcio pesa menos de um quilo e leva a sua própria casa às costas.
🌊 E AGORA — DEBAIXO DE ÁGUA
É aqui que começa uma fauna completamente diferente.
Alguns passos pela água morna.
Uma máscara.
Uma respiração.
A cabeça mergulha sob a superfície.
E o Egito familiar desaparece.
Sem aroma de especiarias.
Sem vozes.
Sem narguilé.
Sem ar quente.
Restam apenas luz, água e cor.
BEM-VINDOS A OUTRO EGITO.
O Mar Vermelho é surpreendentemente límpido.
Os raios de sol atravessam a água e correm pelo fundo.
E depois chega uma verdadeira explosão de cores.
Turquesa.
Azul elétrico.
Amarelo-limão.
Roxo.
Laranja.
Rosa.
Prateado.
Os peixes passam entre os corais em nuvens inteiras.
Alguns parecem joias.
Outros — personagens de desenhos animados.
Outros parecem o resultado de um designer autorizado a usar todas as cores ao mesmo tempo.
E de repente percebe:
o Egito não precisa de qualquer filtro.
🐠 UMA METRÓPOLE SUBAQUÁTICA
O Mar Vermelho é mais do que um belo lugar para fazer snorkeling.
É um imenso mundo vivo.
As suas águas egípcias abrigam mais de mil espécies de peixes e centenas de espécies de corais.
Algumas espécies encontram-se especificamente nesta região.
É por isso que dois troços vizinhos do recife podem parecer dois bairros completamente diferentes da mesma cidade.
Só que aqui os cardumes substituem os carros.
Os corais substituem as casas.
E os engarrafamentos são muito mais bonitos.
🪸 UM FACTO QUE AINDA SURPREENDE MUITA GENTE
Um coral é um animal.
Não é uma planta.
Não é uma rocha subaquática invulgar.
É um animal.
Os minúsculos pólipos de coral vivem em colónias e, ao longo de períodos imensos, criam estruturas que se tornam recifes inteiros.
Assim, o fantástico «jardim» que vê através da máscara é, na verdade, uma enorme cidade viva.
Na região de Ras Mohammed foram registadas centenas de variedades de corais duros e moles.
Mas há um facto ainda mais surpreendente.
Uma parte da própria península de Ras Mohammed consiste num antigo recife de coral fóssil que emergiu há dezenas de milhares de anos.
Forma-se uma imagem quase inacreditável:
debaixo de si — um recife vivo.
e perto, acima da água — o vestígio de um recife antigo.
O Egito sabe ligar o passado e o presente até debaixo de água.
👑 AGORA CONHEÇA A RAINHA
Todos os bons bairros têm uma celebridade local.
O nosso recife também tem.
A P&D ouviu uma história de um instrutor de mergulho egípcio que passa muito tempo debaixo de água.
Quando um turista olha para um recife, vê muitos peixes.
Quando a mesma pessoa mergulha lá regularmente, as coisas tornam-se um pouco diferentes.
Começa a reconhecer os lugares.
As fendas.
Os percursos.
E por vezes — os habitantes individuais.
O nosso mergulhador contou-nos sobre uma moreia que encontra repetidamente.
Reconhece-a.
Ela aparece num lugar familiar.
E com o tempo estes encontros tornaram-se uma espécie de conhecimento subaquático.
Podemos chamar-lhe amizade do ponto de vista da própria moreia?
Não lhe perguntámos.
Mas a P&D decidiu uma coisa com toda a certeza:
uma personagem assim não pode ficar sem nome.
CLEOMORAY 👑
Cleomoray — rainha do recife.
Casa: o Mar Vermelho.
Residência: uma fenda de coral.
Vista da janela: 10/10.
Dress code: natural couture.
Temperamento: majestoso.
Número de dentes: a pergunta foi considerada demasiado pessoal.
Receção de visitantes: exclusivamente ao critério de Sua Majestade.
Sabemos como lhe chama o mergulhador egípcio.
Mas outra coisa é muito mais interessante:
como chama Cleomoray ao mergulhador?
«Aquele humano com a garrafa de mergulho»?
«Outra vez por cá»?
Ou terá realmente um nome próprio de moreia para ele?
Talvez seja melhor deixar alguns mistérios egípcios ao Mar Vermelho.
🐬 GOLFINHOS QUE TRABALHAM À NOITE
Mais adiante nesta história aparece uma das personagens marinhas preferidas da humanidade.
O golfinho.
Mas também aqui há um pequeno segredo egípcio.
Perto de Marsa Alam fica o recife de Samadai — a famosa Dolphin House.
Ali encontram-se golfinhos-rotadores.
E têm uma rotina diária muito interessante.
São ativos e alimentam-se principalmente à noite, usando a lagoa abrigada para descansar durante o dia.
Por isso a situação é mais ou menos esta.
Um turista acorda.
Toma o pequeno-almoço.
Veste o fato de banho.
Anuncia alegremente:
«Hoje vamos ver golfinhos!»
E algures na lagoa:
🐬
«Podiam fazer menos barulho? Acabámos de sair do turno da noite.»
💙 O MELHOR ENCONTRO É AQUELE QUE O ANIMAL ESCOLHE
É por isso que a P&D gosta particularmente de um princípio simples para observar animais marinhos.
Não tente fabricar o momento perfeito.
Deixe-o acontecer.
Se um golfinho se aproxima por vontade própria — é mágico.
Se um peixe passa à frente da câmara — tire a fotografia.
Se Cleomoray decide ficar em casa hoje — a rainha tem um dia de folga.
A vida selvagem é bela precisamente porque não segue o horário do turista.
🌴 SABE O QUE MAIS CRESCE AO LADO DO MAR VERMELHO?
Mangais.
E este é um dos contrastes com que o Egito nos surpreende constantemente.
Montanhas desérticas.
Areia.
Mar azul.
Recifes de coral.
E de repente — vegetação verde de mangal.
Por exemplo, a área natural de Nabq, perto de Sharm El Sheikh, é conhecida pela combinação de paisagem desértica, mar, recifes e mangais.
E mais uma vez percebemos que a fauna do Egito não existe como imagens separadas.
Tudo está ligado.
A costa.
As plantas.
O recife.
Os peixes.
As aves.
Os animais terrestres.
O mar.
Um enorme mundo vivo.
🦀 O CARANGUEJO CHEGOU À REUNIÃO DE REDAÇÃO
Já cá está.
Encontrámo-lo na praia de Hula Hula.
E agora tem o seu próprio lugar na nossa história.
Porque depois de Tamara, dos gatos de praia, das tartarugas, de milhares de peixes, dos golfinhos e de Cleomoray, já é difícil surpreender-nos.
Embora...
Este é o Egito.
Provavelmente vai conseguir.
✨ P&D WILD EGYPT — 7 FACTOS A RECORDAR
01 — Os corais são animais.
O seu «jardim subaquático» está realmente vivo.
02 — O Mar Vermelho é extraordinariamente rico em peixes.
Aqui encontram-se mais de mil espécies.
03 — Os golfinhos também precisam de tempo para descansar.
Em Samadai, os golfinhos-rotadores usam a lagoa como refúgio diurno depois da atividade noturna.
04 — O Egito teve um papel importante na história dos gatos domésticos.
O ADN antigo revela a expansão da linhagem felina egípcia muito para além do país.
05 — O deserto e os mangais podem ser vizinhos.
O Mar Vermelho reúne paisagens que nunca esperaria ver lado a lado.
06 — A melhor pessoa para uma história invulgar sobre o recife é um mergulhador local experiente.
Em vez de «O que vive aqui?», experimente perguntar:
«Quem conhece aqui?»
07 — Não pode reservar antecipadamente o animal mais interessante da viagem.
Talvez seja um golfinho.
Talvez — uma moreia.
Ou talvez — um gato atrevido da praia que decide que o seu telemóvel lhe pertence.
☀️ O EGITO VIVO
Talvez sejam os animais que nos fazem sentir o Egito especialmente próximo.
Porque ligam tudo.
A Antiguidade — ao presente.
O deserto — ao mar.
A cidade — à natureza.
Um dia quente — a uma noite amena.
Acima da água, o ar cheira a especiarias, óleos, café, narguilé e sal marinho.
Debaixo de água, os aromas desaparecem, substituídos pelas cores intensamente luminosas dos corais e dos peixes.
Na praia, um gato descansa à sombra com um perfil que parece familiar da arte do Antigo Egito.
Em Hurghada, Tamara instala-se na cabeça de alguém.
Uma tartaruga termina a sua folha infinitamente importante.
Os golfinhos descansam depois da atividade noturna.
E algures numa fenda de coral está Cleomoray.
Tudo isto acontece ao mesmo tempo.
Não num jardim zoológico.
Não num livro.
Não num ecrã.
Aqui.
Sob um único e quente sol egípcio.
E talvez seja por isso que a fauna egípcia fica tão gravada na memória.
Não parece uma atração separada.
Está entrelaçada no próprio Egito.
No seu mar.
Nas suas ruas.
Na sua história.
Nas suas cores.
No seu calor.
E naqueles pequenos encontros casuais que, por alguma razão, ficam connosco durante mais tempo.
🇪🇬 QUEM VIVE AQUI? — EGITO
Não se limite a ver o Egito.\nDescubra quem olha de volta para si.
PETS & DOGUE\nOne world. Every pet.`)
}
});

})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({nl:{editorialUI:{
listen:"Luister naar het artikel",stop:"Stoppen",back:"Alle artikelen",previous:"Vorige foto",next:"Volgende foto",location:"King Tut Bazar · Hurghada, Egypte",locationNote:"Tamara woont in een van de kleine winkels; tegenover haar zijn landschildpadden en katten.",crab:"Hula Hula-strand · Egypte",generated:"Cleomoray",unavailable:"Voorlezen is niet beschikbaar in deze browser.",fallback:"De volledige vertaling in de gekozen taal wordt voorbereid. Het Engelse artikel wordt weergegeven.",shortTitle:"Een ander Egypte",bestWorker:"Beste medewerker",source:"Bron",factsTitle:"Zeven feiten over het levende Egypte",mauTitle:"Egyptische mau",mauText:"Een mau kan ‘tjilpen’ en zijn mensen begroeten met zachte, melodieuze trillers.",mauAlt:"Een Egyptische mau van kop tot staart",catAlt:"Een kat rust op de toonbank van een winkel in Hurghada",tamaraAlt:"Tamara kijkt recht in de camera",dolphinsLabel:"Dolfijnen",crabHeading:"🦀 De krab is aangekomen bij de redactievergadering",crabOpening:["Hij is er al.","We ontmoetten hem op het Hula Hula-strand.","En nu heeft hij zijn eigen plek in ons verhaal."],
facts:[["Dolfijnen hebben hun eigen ‘huidverzorgingsroutine’.","Bij Hurghada wrijven dolfijnen langs bepaalde koralen en sponzen. Onderzoekers vermoeden dat de stoffen daarin mogelijk helpen hun huid te verzorgen."],["Schildpadden hebben ‘fotopaspoorten’.","In het Egyptische deel van de Rode Zee worden afzonderlijke zeeschildpadden herkend aan het patroon van de schubben op hun kop. Zo kunnen herhaalde ontmoetingen worden vastgelegd."],["Dolfijnen worden aan hun vin herkend.","Littekens en inkepingen in de rugvin helpen onderzoekers in Hurghada individuele dolfijnen te onderscheiden zonder merktekens aan te brengen."],["De zee heeft weilanden voor zeekoeien.","Doejongs eten zeegras. Abu Dabbab Bay heeft uitgestrekte onderwaterweiden die een geschikt leefgebied voor deze dieren vormen."],["Duikers kunnen helpen schildpadden te onderzoeken.","TurtleWatch verzamelt waarnemingen van duikers en snorkelaars om beter te begrijpen waar zeeschildpadden voorkomen."],["Je kunt een dier op afstand steunen.","Het Egyptische opvangcentrum S.P.A.R.E. biedt de mogelijkheid katten, honden en ezels te sponsoren, ook als je geen dier mee naar huis kunt nemen."],["Egyptische maukatten kunnen ‘tjilpen’.","Deze gevlekte huiskatten kunnen hun mensen begroeten met zachte, melodieuze trillers en tjilpende geluiden."]]},
text:[
"🇪🇬 EEN ANDER EGYPTE: DAT NAAR JOU TERUGKIJKT","Katten met gezichten uit oude afbeeldingen, Tamara uit Hurghada, landschildpadden, dolfijnen na hun ‘nachtdienst’, felgekleurde vissen en Cleomoray — een onderwaterkennis van een Egyptische duiker.",
"Er is het Egypte van de piramides.","Er is het Egypte van hotels en stranden.","En er is nog een ander Egypte.","Het verschuilt zich onder een ligbed, zit op een tak naast een winkel, kauwt langzaam op groenvoer, schiet tussen koralen door en kijkt soms uit een spleet in het rif met een uitdrukking die doet vermoeden dat het heel goed weet dat je speciaal voor hem bent gekomen.","Dit is het levende Egypte.","Dit is het Egypte dat P&D verkent.","Geen verzameling dieren in een encyclopedie, maar een bijzondere wereld van wezens die naast mensen leven — op straat, op stranden en onder het oppervlak van de Rode Zee.","En hoe langer je naar ze kijkt, hoe sterker het gevoel wordt:","mensen zijn hier lang niet de enige hoofdpersonen.",
"EERST VERSCHIJNEN DE KATTEN","Op het hete middaguur lijkt Egypte te vertragen.","De lucht trilt boven de verwarmde grond.","Het zand is heet.","De witte muren zijn bijna verblindend.","In de verte glinstert de zee in onwaarschijnlijke tinten blauw.","En ergens, in een koele strook schaduw, ligt altijd een kat.","Egyptische katten weten de beste plekjes te kiezen.","Onder een tafel.","Onder een ligbed.","Naast een winkel.","Op het strand.","En soms — precies waar iemand net wilde lopen.","Sommige bewaren een koninklijke afstand.","Andere komen zo dichtbij dat je geen portret krijgt, maar een foto van één enorme kattenneus.","Bij het bekijken van onze foto's merkte P&D iets bijzonders op.","Ze komen ons bekend voor.","Een slank lichaam.","Lange poten.","Grote oren.","Een smalle snuit.","Amandelvormige ogen.","Sommige hebben opvallende donkere lijnen rond hun ogen, alsof ze met oude Egyptische kohl zijn getekend.","Waar hebben we deze silhouetten eerder gezien?","Natuurlijk.","Op afbeeldingen uit het oude Egypte.","In beeldjes.","In musea.","In kunst die duizenden jaren oud is.",
"3.000 JAAR. DEZELFDE HOUDING.","Nee, we gaan geen mooie internetlegende vertellen waarin precies die kat onder ons strandbed rechtstreeks afstamt van de lievelingskat van een farao.","Zo werkt wetenschap niet.","Maar de werkelijkheid blijkt net zo interessant.","Onderzoek naar oud DNA laat zien dat de Egyptische kattenpopulatie werkelijk een belangrijke rol speelde bij de verspreiding van huiskatten in de oude wereld. De Egyptische afstammingslijn verspreidde zich vooral tijdens de klassieke oudheid.","En katten namen in de oude Egyptische cultuur een heel bijzondere plaats in.","Daarom kan een ontmoeting van nu soms bijna ongelooflijk aanvoelen.","Het is 2026.","Een strand.","De Rode Zee.","Een slanke kat komt onder een ligbed vandaan.","Blijft staan.","Tilt zijn kop op.","Kijkt recht in de lens.","En even lijkt de afstand tussen het Egypte van vandaag en het Egypte van duizenden jaren geleden te verdwijnen.","Hetzelfde profiel.","Dezelfde blik.","En misschien dezelfde absolute overtuiging dat mensen hier het bedienend personeel zijn.",
"🐈 HET KLEINE GEHEIM VAN P&D","Wil je een Egyptische kat fotograferen? Probeer hem dan niet te volgen.","Ga op je hurken zitten.","Houd je telefoon lager.","En wacht.","Soms doet de nieuwsgierigheid van een kat al het werk voor de fotograaf.","En op onze foto's te zien vinden sommige plaatselijke modellen de lens een uitzonderlijk interessant voorwerp.",
"💛 EN IN HURGHADA WOONT TAMARA","Van alle personages in dit verhaal is er één die je nooit met iemand anders zou verwarren.","Felgeel.","Piepklein.","Sociaal.","En volledig zeker van zichzelf.","Tamara.","Ze woont met andere grasparkieten in een van de winkels van Hurghada.","'s Avonds verandert de stad.","De hitte van overdag neemt af.","Kleurrijke lichtreclames gaan aan.","Uit open winkels waaien geuren van oliën en oosterse parfums.","Ergens ruikt het naar specerijen en koffie.","Elders — naar fruit.","In de lucht mengen de lichte, zoetige rook van waterpijpen, de warmte van door de zon verhitte stenen en de zoute adem van de zee zich.","En midden in deze Egyptische avondsymfonie zit Tamara.","Alles bevalt haar.","Een mensenhand — geschikt.","Een schouder — uitstekend.","Een hoofd — bijna een VIP-loge.","Afgaande op de foto's blijft de vraag wie naar wie kwam kijken onbeantwoord.","Wij kwamen naar Tamara kijken.","Tamara kwam duidelijk naar ons kijken.",
"HET OORDEEL VAN P&D:","Functie: onbekend.","Werkplek: een winkel in Hurghada.","Specialisatie: public relations.","Zelfvertrouwen: CEO.",
"🐢 DAN STAAT DE TIJD STIL","Van een parkiet die binnen enkele seconden op je hoofd landt naar een dier dat absoluut geen reden heeft om zich te haasten.","Landschildpadden.","Een grote.","Een kleine.","En een echt piepkleine.","Eentje past gemakkelijk in een handpalm en blijft op groenvoer kauwen alsof er om hem heen helemaal niets gebeurt.","Hier besef je hoe verschillend dieren de wereld beleven.","Een mens heeft al tien foto's gemaakt.","Berichten bekeken.","Bedacht waar hij hierna naartoe wil.","En de schildpad is nog steeds met zijn eerste blaadje bezig.","Misschien voelt het daarom zo rustig om bij hen te zijn.",
"LEVENSADVIES VAN P&D:","Soms weegt de beste Egyptische wellnesscoach minder dan een kilo en draagt hij zijn eigen huis op zijn rug.",
"🌊 EN NU — ONDER WATER","Hier begint een heel andere dierenwereld.","Een paar stappen door warm water.","Een duikmasker.","Een ademteug.","Je hoofd glijdt onder het oppervlak.","En het vertrouwde Egypte verdwijnt.","Geen geur van specerijen.","Geen stemmen.","Geen waterpijp.","Geen hete lucht.","Alleen licht, water en kleur blijven over.",
"WELKOM IN EEN ANDER EGYPTE.","De Rode Zee is verbazingwekkend helder.","Zonnestralen gaan door het water en bewegen over de zeebodem.","En daarna volgt een echte explosie van kleuren.","Turkoois.","Elektrisch blauw.","Citroengeel.","Paars.","Oranje.","Roze.","Zilver.","Vissen bewegen in hele wolken tussen de koralen.","Sommige lijken op juwelen.","Andere — op tekenfilmfiguren.","Weer andere zien eruit alsof een ontwerper alle kleuren tegelijk mocht gebruiken.","En ineens besef je:","Egypte heeft helemaal geen filter nodig.",
"🐠 EEN ONDERWATERMETROPOOL","De Rode Zee is meer dan een mooie plek om te snorkelen.","Het is een immense levende wereld.","In de Egyptische wateren leven meer dan duizend vissoorten en honderden koraalsoorten.","Sommige soorten komen specifiek in deze regio voor.","Daarom kunnen twee aangrenzende stukken rif eruitzien als twee totaal verschillende wijken van dezelfde stad.","Alleen vervangen scholen vissen hier de auto's.","Koralen vervangen de huizen.","En de files zijn veel mooier.",
"🪸 EEN FEIT DAT VEEL MENSEN NOG STEEDS VERRAST","Een koraal is een dier.","Geen plant.","Geen bijzondere onderwatersteen.","Een dier.","Piepkleine koraalpoliepen leven in kolonies en bouwen over enorme tijdspannes structuren die hele riffen worden.","De fantastische ‘tuin’ onder je snorkelmasker is dus eigenlijk een enorme levende stad.","Rond Ras Mohammed zijn honderden variëteiten harde en zachte koralen geregistreerd.","Maar er is een nog verbazingwekkender feit.","Een deel van het schiereiland Ras Mohammed zelf bestaat uit een oud fossiel koraalrif dat tienduizenden jaren geleden omhoogkwam.","Zo ontstaat een bijna ongelooflijk beeld:","onder je — een levend rif.","en vlakbij, boven het water — het spoor van een oud rif.","Egypte weet verleden en heden zelfs onder water met elkaar te verbinden.",
"👑 MAAK NU KENNIS MET DE KONINGIN","Elke goede buurt heeft een plaatselijke beroemdheid.","Ons rif ook.","P&D hoorde een verhaal van een Egyptische duikinstructeur die veel tijd onder water doorbrengt.","Als een toerist naar een rif kijkt, ziet hij veel vissen.","Als dezelfde persoon er regelmatig duikt, verandert er iets.","Hij begint plekken te herkennen.","Spleten.","Routes.","En soms — afzonderlijke bewoners.","Onze duiker vertelde over een murene die hij steeds opnieuw tegenkomt.","Hij herkent haar.","Ze verschijnt op een vertrouwde plek.","En in de loop van de tijd zijn die ontmoetingen een soort onderwaterkennismaking geworden.","Kun je dat vanuit het perspectief van de murene zelf vriendschap noemen?","We hebben het haar niet gevraagd.","Maar P&D besloot één ding met zekerheid:","zo'n personage mag niet zonder naam blijven.",
"CLEOMORAY 👑","Cleomoray — koningin van het rif.","Thuis: de Rode Zee.","Residentie: een spleet in het koraal.","Uitzicht uit het raam: 10/10.","Dresscode: natural couture.","Karakter: koninklijk.","Aantal tanden: de vraag is te persoonlijk bevonden.","Ontvangst van bezoekers: uitsluitend naar het humeur van Hare Majesteit.","We weten hoe de Egyptische duiker haar noemt.","Maar iets anders is veel interessanter:","hoe noemt Cleomoray hem?","‘Die mens met de duikfles’?","‘Daar is hij weer’?","Of heeft ze echt haar eigen murenenaam voor hem?","Misschien kun je sommige Egyptische mysteries beter aan de Rode Zee overlaten.",
"🐬 DOLFIJNEN DIE 'S NACHTS WERKEN","Verderop in dit verhaal verschijnt een van de favoriete zeedieren van de mens.","De dolfijn.","Maar ook hier is een klein Egyptisch geheim.","Bij Marsa Alam ligt het Samadai-rif — het beroemde Dolphin House.","Daar kun je spinnerdolfijnen tegenkomen.","En ze hebben een heel interessant dagritme.","Ze zijn vooral 's nachts actief en zoeken dan voedsel. Overdag gebruiken ze de beschutte lagune om te rusten.","De situatie ziet er dus ongeveer zo uit.","Een toerist wordt wakker.","Ontbijt.","Trekt zwemkleding aan.","Kondigt vrolijk aan:","‘Vandaag gaan we dolfijnen bekijken!’","En ergens in de lagune:","🐬","‘Kan het wat zachter? We hebben net onze nachtdienst achter de rug.’",
"💙 DE MOOISTE ONTMOETING IS DIE WAAR HET DIER VOOR KIEST","Daarom waardeert P&D een eenvoudig principe bij het observeren van zeedieren.","Probeer het perfecte moment niet te regisseren.","Laat het gebeuren.","Als een dolfijn uit zichzelf nadert — magisch.","Als een vis voor de camera langs zwemt — maak de foto.","Als Cleomoray vandaag thuis wil blijven — heeft de koningin een vrije dag.","De natuur is juist mooi omdat ze zich niet aan de planning van een toerist houdt.",
"🌴 WEET JE WAT ER NOG MEER LANGS DE RODE ZEE GROEIT?","Mangroven.","En dit is een van de contrasten waarmee Egypte ons telkens verrast.","Woestijnbergen.","Zand.","Een blauwe zee.","Koraalriffen.","En ineens — groene mangrovebossen.","Het natuurgebied Nabq bij Sharm El Sheikh staat bijvoorbeeld bekend om de combinatie van woestijnlandschap, zee, riffen en mangroven.","Opnieuw blijkt dat de Egyptische dierenwereld niet uit losstaande beelden bestaat.","Alles is met elkaar verbonden.","De kust.","Planten.","Het rif.","Vissen.","Vogels.","Landdieren.","De zee.","Eén enorme levende wereld.",
"🦀 DE KRAB IS AANGEKOMEN BIJ DE REDACTIEVERGADERING","Hij is er al.","We ontmoetten hem op het Hula Hula-strand.","En nu heeft hij zijn eigen plek in ons verhaal.","Want na Tamara, strandkatten, landschildpadden, duizenden vissen, dolfijnen en Cleomoray zijn we niet gemakkelijk meer te verrassen.","Hoewel...","Dit is Egypte.","Het zal waarschijnlijk toch lukken.",
"✨ P&D WILD EGYPT — 7 FEITEN OM TE ONTHOUDEN","01 — Koralen zijn dieren.","Je ‘onderwatertuin’ leeft echt.","02 — De Rode Zee is uitzonderlijk rijk aan vissen.","Hier komen meer dan duizend soorten voor.","03 — Ook dolfijnen hebben rust nodig.","Bij Samadai gebruiken spinnerdolfijnen de lagune als toevluchtsoord overdag na hun nachtelijke activiteit.","04 — Egypte speelde een belangrijke rol in de geschiedenis van huiskatten.","Oud DNA toont de verspreiding van de Egyptische kattenlijn tot ver buiten het land.","05 — Woestijn en mangroven kunnen buren zijn.","De Rode Zee brengt landschappen samen die je nooit naast elkaar zou verwachten.","06 — Voor een bijzonder verhaal over het rif kun je het best bij een ervaren plaatselijke duiker terecht.","Vraag in plaats van ‘Wat leeft hier?’ eens:","‘Wie ken je hier?’","07 — Het interessantste dier van je reis kun je niet vooraf boeken.","Misschien wordt het een dolfijn.","Misschien — een murene.","Of misschien — een brutale strandkat die besluit dat je telefoon van hem is.",
"☀️ HET LEVENDE EGYPTE","Misschien zijn het de dieren die Egypte zo dichtbij laten voelen.","Omdat ze alles met elkaar verbinden.","De oudheid — met het heden.","De woestijn — met de zee.","De stad — met de natuur.","Een hete dag — met een warme avond.","Boven water ruikt de lucht naar specerijen, oliën, koffie, waterpijpen en zeezout.","Onder water verdwijnen de geuren en maken ze plaats voor de felste kleuren van koralen en vissen.","Op het strand ligt een kat in de schaduw met een profiel dat vertrouwd lijkt uit de kunst van het oude Egypte.","In Hurghada gaat Tamara op iemands hoofd zitten.","Een landschildpad eet zijn eindeloos belangrijke blaadje op.","Dolfijnen rusten na hun nachtelijke activiteit.","En ergens in een spleet in het koraal zit Cleomoray.","Dit alles gebeurt tegelijkertijd.","Niet in een dierentuin.","Niet in een boek.","Niet op een scherm.","Hier.","Onder één hete Egyptische zon.","En misschien blijft de Egyptische dierenwereld daarom zo sterk in je geheugen hangen.","Ze voelt niet als een afzonderlijke attractie.","Ze is verweven met Egypte zelf.","Met zijn zee.","Zijn straten.","Zijn geschiedenis.","Zijn kleuren.","Zijn warmte.","En die kleine toevallige ontmoetingen die op de een of andere manier het langst bij ons blijven.",
"🇪🇬 WIE WOONT HIER? — EGYPTE","Bekijk niet alleen Egypte.\nOntdek wie naar jou terugkijkt.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({pl:{editorialUI:{
listen:"Posłuchaj artykułu",stop:"Zatrzymaj",back:"Wszystkie artykuły",previous:"Poprzednie zdjęcie",next:"Następne zdjęcie",location:"King Tut Bazar · Hurghada, Egipt",locationNote:"Tamara mieszka w jednym z małych sklepów; naprzeciwko są żółwie lądowe i koty.",crab:"Plaża Hula Hula · Egipt",generated:"Cleomoray",unavailable:"Odczytywanie tekstu nie jest dostępne w tej przeglądarce.",fallback:"Pełne tłumaczenie na wybrany język jest w przygotowaniu. Wyświetlany jest artykuł angielski.",shortTitle:"Inny Egipt",bestWorker:"Najlepszy pracownik",source:"Źródło",factsTitle:"Siedem faktów o żywym Egipcie",mauTitle:"Egipski mau",mauText:"Mau potrafi „ćwierkać”, witając swoich ludzi cichymi, melodyjnymi trelami.",mauAlt:"Egipski mau w całej okazałości",catAlt:"Kot odpoczywa na ladzie sklepu w Hurghadzie",tamaraAlt:"Tamara patrzy prosto w obiektyw",dolphinsLabel:"Delfiny",crabHeading:"🦀 Krab przyszedł na zebranie redakcji",crabOpening:["Już tu jest.","Spotkaliśmy go na plaży Hula Hula.","Teraz ma własne miejsce w naszej historii."],
facts:[["Delfiny mają własną „pielęgnację skóry”.","W pobliżu Hurghady delfiny ocierają się o wybrane koralowce i gąbki. Badacze przypuszczają, że zawarte w nich substancje mogą pomagać w pielęgnacji skóry."],["Żółwie mają „fotopaszporty”.","W egipskim Morzu Czerwonym poszczególne żółwie morskie rozpoznaje się po układzie łusek na głowie, co pozwala dokumentować kolejne spotkania."],["Delfiny rozpoznaje się po płetwie.","Blizny i ubytki na płetwie grzbietowej pomagają badaczom z Hurghady odróżniać osobniki bez mocowania znaczników."],["W morzu są pastwiska dla krów morskich.","Diugonie żywią się trawą morską. Zatoka Abu Dabbab ma rozległe podwodne łąki, które stanowią odpowiednie siedlisko dla tych zwierząt."],["Nurkowie mogą pomagać w badaniu żółwi.","TurtleWatch zbiera obserwacje nurków i osób pływających z maską, aby lepiej poznać miejsca występowania żółwi morskich."],["Można wspierać zwierzę na odległość.","Egipskie schronisko S.P.A.R.E. oferuje możliwość wspierania kotów, psów i osłów, nawet jeśli nie możecie zabrać zwierzęcia do domu."],["Egipski mau potrafi „ćwierkać”.","Te cętkowane koty domowe mogą witać swoich ludzi cichymi, melodyjnymi trelami i ćwierkającymi dźwiękami."]]},
text:[
"🇪🇬 INNY EGIPT: TEN, KTÓRY PATRZY NA CIEBIE","Koty o pyszczkach jak ze starożytnych wizerunków, Tamara z Hurghady, żółwie lądowe, delfiny po „nocnej zmianie”, neonowe ryby i Cleomoray — podwodna znajoma egipskiego nurka.",
"Jest Egipt piramid.","Jest Egipt hoteli i plaż.","I jest jeszcze inny.","Chowa się pod leżakiem, siada na gałęzi obok sklepu, powoli przeżuwa zieleninę, przemyka między koralowcami i czasem wygląda ze szczeliny rafy z miną, która sugeruje, że doskonale wie, iż przyjechaliście właśnie dla niego.","To żywy Egipt.","To Egipt, który odkrywa P&D.","Nie zbiór zwierząt w encyklopedii, lecz niezwykły świat stworzeń żyjących obok ludzi — na ulicach, na plażach i pod powierzchnią Morza Czerwonego.","Im dłużej je obserwujecie, tym silniejsze staje się wrażenie:","ludzie zdecydowanie nie są tu jedynymi głównymi bohaterami.",
"NAJPIERW POJAWIAJĄ SIĘ KOTY","W upalne południe Egipt zdaje się zwalniać.","Powietrze drży nad rozgrzaną ziemią.","Piasek jest gorący.","Białe ściany niemal oślepiają.","W oddali morze lśni w niewiarygodnych odcieniach błękitu.","A gdzieś, w chłodnym pasie cienia, zawsze jest kot.","Egipskie koty umieją wybierać najlepsze miejsca.","Pod stołem.","Pod leżakiem.","Obok sklepu.","Na plaży.","A czasem — dokładnie tam, gdzie człowiek właśnie chciał przejść.","Niektóre zachowują królewski dystans.","Inne podchodzą tak blisko, że zamiast portretu wychodzi zdjęcie jednego ogromnego kociego nosa.","Właśnie podczas oglądania naszych fotografii P&D zauważyło coś niezwykłego.","Wydają się znajome.","Smukłe ciało.","Długie łapy.","Duże uszy.","Wąski pyszczek.","Oczy w kształcie migdałów.","Niektóre mają wyraziste ciemne linie wokół oczu, jakby narysowane starożytnym egipskim kohlem.","Gdzie już widzieliśmy takie sylwetki?","Oczywiście.","Na wizerunkach ze starożytnego Egiptu.","W figurkach.","W muzeach.","W sztuce sprzed tysięcy lat.",
"3 000 LAT. TEN SAM CHARAKTER.","Nie, nie opowiemy wam pięknej internetowej legendy, według której akurat ten kot pod naszym plażowym leżakiem jest bezpośrednim potomkiem ulubieńca faraona.","Nauka tak nie działa.","Ale prawda okazuje się równie ciekawa.","Badania starożytnego DNA pokazują, że egipska populacja kotów rzeczywiście odegrała ważną rolę w rozprzestrzenianiu się kotów domowych w starożytnym świecie. Egipska linia rozprzestrzeniła się szczególnie szeroko w antyku klasycznym.","A koty zajmowały naprawdę wyjątkowe miejsce w kulturze starożytnego Egiptu.","Dlatego dzisiejsze spotkanie potrafi wydawać się niemal niewiarygodne.","Jest rok 2026.","Plaża.","Morze Czerwone.","Smukły kot wychodzi spod leżaka.","Zatrzymuje się.","Podnosi głowę.","Patrzy prosto w obiektyw.","I na sekundę dystans między dzisiejszym Egiptem a Egiptem sprzed kilku tysięcy lat jakby znika.","Ten sam profil.","To samo spojrzenie.","I być może to samo absolutne przekonanie, że człowiek jest tu personelem obsługi.",
"🐈 MAŁY SEKRET P&D","Jeśli chcecie sfotografować egipskiego kota, spróbujcie go nie śledzić.","Przykucnijcie.","Opuśćcie telefon.","I poczekajcie.","Kocia ciekawość czasem wykonuje całą pracę fotografa.","A sądząc po naszych zdjęciach, niektórzy miejscowi modele uważają obiektyw za wyjątkowo interesujący przedmiot.",
"💛 A W HURGHADZIE MIESZKA TAMARA","Wśród wszystkich bohaterów tej historii jest jedna postać, której nie da się pomylić z nikim innym.","Jaskrawożółta.","Malutka.","Towarzyska.","I całkowicie pewna siebie.","Tamara.","Mieszka z innymi papużkami falistymi w jednym ze sklepów w Hurghadzie.","Wieczorem miasto się zmienia.","Dzienny upał słabnie.","Zapalają się kolorowe szyldy.","Z otwartych sklepów unoszą się zapachy olejków i orientalnych perfum.","Gdzieś pachnie przyprawami i kawą.","Gdzie indziej — owocami.","W powietrzu mieszają się lekki, słodkawy dym sziszy, ciepło nagrzanego słońcem kamienia i słony oddech morza.","A pośrodku tej egipskiej wieczornej symfonii siedzi Tamara.","Wszystko jej odpowiada.","Ludzka dłoń — nadaje się.","Ramię — doskonałe.","Głowa — praktycznie loża VIP.","Sądząc po zdjęciach, pytanie, kto przyszedł oglądać kogo, pozostaje otwarte.","My przyszliśmy zobaczyć Tamarę.","Tamara najwyraźniej przyszła zobaczyć nas.",
"WERDYKT P&D:","Stanowisko: nieznane.","Miejsce pracy: sklep w Hurghadzie.","Specjalizacja: public relations.","Poziom pewności siebie: CEO.",
"🐢 POTEM CZAS SIĘ ZATRZYMUJE","Od papużki, która w kilka sekund ląduje na głowie, przechodzimy do stworzenia, które absolutnie nie ma powodu się spieszyć.","Żółwie lądowe.","Duży.","Mały.","I naprawdę malutki.","Jeden wygodnie mieści się na dłoni i dalej przeżuwa zieleninę, jakby wokół zupełnie nic się nie działo.","Wtedy uświadamiacie sobie, jak różnie zwierzęta doświadczają świata.","Człowiek zdążył już zrobić dziesięć zdjęć.","Sprawdzić wiadomości.","Pomyśleć, dokąd pójść dalej.","A żółw wciąż kończy swój pierwszy listek.","Być może dlatego tak spokojnie czujemy się w ich pobliżu.",
"RADA P&D:","Czasem najlepszy egipski trener dobrostanu waży mniej niż kilogram i nosi własny dom na plecach.",
"🌊 A TERAZ — POD WODĘ","Tutaj zaczyna się zupełnie inna fauna.","Kilka kroków przez ciepłą wodę.","Maska.","Wdech.","Głowa zanurza się pod powierzchnię.","I znajomy Egipt znika.","Nie ma zapachu przypraw.","Nie ma głosów.","Nie ma sziszy.","Nie ma gorącego powietrza.","Zostają tylko światło, woda i kolor.",
"WITAJCIE W INNYM EGIPCIE.","Morze Czerwone jest zadziwiająco przejrzyste.","Promienie słońca przechodzą przez wodę i biegną po dnie.","A dalej zaczyna się prawdziwa eksplozja barw.","Turkus.","Elektryczny błękit.","Cytrynowa żółć.","Fiolet.","Pomarańcz.","Róż.","Srebro.","Ryby przepływają między koralowcami całymi chmurami.","Niektóre przypominają klejnoty.","Inne — postacie z kreskówek.","Jeszcze inne wyglądają tak, jakby projektantowi pozwolono użyć wszystkich kolorów naraz.","I nagle rozumiecie:","Egipt nie potrzebuje żadnego filtra.",
"🐠 PODWODNA METROPOLIA","Morze Czerwone to nie tylko piękne miejsce do snorkelingu.","To ogromny żywy świat.","W jego egipskich wodach żyje ponad tysiąc gatunków ryb i setki gatunków koralowców.","Niektóre gatunki występują właśnie w tym regionie.","Dlatego dwa sąsiednie odcinki rafy mogą wyglądać jak dwie całkowicie różne dzielnice tego samego miasta.","Tylko że zamiast samochodów są tutaj ławice ryb.","Zamiast domów — koralowce.","A korki są znacznie piękniejsze.",
"🪸 FAKT, KTÓRY WCIĄŻ ZASKAKUJE WIELE OSÓB","Koralowiec jest zwierzęciem.","Nie rośliną.","Nie niezwykłym podwodnym kamieniem.","Zwierzęciem.","Maleńkie polipy koralowe żyją w koloniach i przez niezwykle długi czas tworzą struktury, które stają się całymi rafami.","Fantastyczny „ogród” pod waszą maską to więc w rzeczywistości ogromne żywe miasto.","W okolicach Ras Mohammed odnotowano setki odmian koralowców twardych i miękkich.","Ale jest jeszcze bardziej niezwykły fakt.","Część samego półwyspu Ras Mohammed tworzy starożytna kopalna rafa koralowa, która wynurzyła się dziesiątki tysięcy lat temu.","Powstaje niemal niewiarygodny obraz:","pod wami — żywa rafa.","a nieopodal, nad wodą — ślad dawnej rafy.","Egipt potrafi łączyć przeszłość i teraźniejszość nawet pod wodą.",
"👑 TERAZ POZNAJCIE KRÓLOWĄ","Każda dobra dzielnica ma miejscową celebrytkę.","Nasza rafa też.","P&D usłyszało historię od egipskiego instruktora nurkowania, który spędza dużo czasu pod wodą.","Kiedy turysta patrzy na rafę, widzi mnóstwo ryb.","Kiedy ta sama osoba regularnie tam nurkuje, wszystko trochę się zmienia.","Zaczyna rozpoznawać miejsca.","Szczeliny.","Trasy.","A czasem — poszczególnych mieszkańców.","Nasz nurek opowiedział o murenie, którą spotyka wielokrotnie.","Rozpoznaje ją.","Pojawia się w znajomym miejscu.","Z czasem te spotkania stały się czymś w rodzaju podwodnej znajomości.","Czy z perspektywy samej mureny można nazwać to przyjaźnią?","Nie zapytaliśmy jej.","Ale P&D z całą pewnością postanowiło jedno:","taka postać nie może pozostać bez imienia.",
"CLEOMORAY 👑","Cleomoray — królowa rafy.","Dom: Morze Czerwone.","Rezydencja: szczelina w koralowcach.","Widok z okna: 10/10.","Dress code: natural couture.","Charakter: królewski.","Liczba zębów: pytanie uznano za zbyt osobiste.","Przyjmowanie gości: wyłącznie według uznania Jej Królewskiej Mości.","Wiemy, jak nazywa ją egipski nurek.","Ale coś innego jest znacznie ciekawsze:","jak Cleomoray nazywa jego?","„Ten człowiek z butlą”?","„Znowu przyszedł”?","A może naprawdę ma dla niego własne murenowe imię?","Być może niektóre egipskie tajemnice lepiej pozostawić Morzu Czerwonemu.",
"🐬 DELFINY, KTÓRE PRACUJĄ NOCĄ","Dalej w tej historii pojawia się jeden z ulubionych morskich bohaterów ludzkości.","Delfin.","Ale i tutaj jest mały egipski sekret.","Niedaleko Marsa Alam leży rafa Samadai — słynny Dolphin House.","Można tam spotkać delfiny długoszczękie.","Mają bardzo ciekawy rytm dnia.","Są aktywne i żerują głównie nocą, a osłoniętą lagunę wykorzystują do odpoczynku za dnia.","Sytuacja wygląda więc mniej więcej tak.","Turysta się budzi.","Je śniadanie.","Zakłada strój kąpielowy.","Radośnie oznajmia:","„Dzisiaj jedziemy oglądać delfiny!”","A gdzieś w lagunie:","🐬","„Można ciszej? Właśnie skończyliśmy nocną zmianę.”",
"💙 NAJLEPSZE SPOTKANIE TO TAKIE, KTÓRE WYBIERA ZWIERZĘ","Dlatego P&D szczególnie lubi prostą zasadę obserwowania zwierząt morskich.","Nie próbujcie reżyserować idealnego momentu.","Pozwólcie mu się wydarzyć.","Jeśli delfin sam podpływa — magia.","Jeśli ryba przepływa przed aparatem — zróbcie zdjęcie.","Jeśli Cleomoray postanawia dziś zostać w domu — królowa ma dzień wolny.","Dzika przyroda jest piękna właśnie dlatego, że nie działa według planu turysty.",
"🌴 WIECIE, CO JESZCZE ROŚNIE NAD MORZEM CZERWONYM?","Namorzyny.","To jeden z kontrastów, którymi Egipt wciąż nas zaskakuje.","Pustynne góry.","Piasek.","Błękitne morze.","Rafy koralowe.","I nagle — zielone zarośla namorzynowe.","Na przykład obszar przyrodniczy Nabq niedaleko Sharm El Sheikh jest znany z połączenia pustynnego krajobrazu, morza, raf i namorzynów.","Znów okazuje się, że egipska fauna nie istnieje jako zbiór oddzielnych obrazków.","Wszystko jest połączone.","Wybrzeże.","Rośliny.","Rafa.","Ryby.","Ptaki.","Zwierzęta lądowe.","Morze.","Jeden ogromny żywy świat.",
"🦀 KRAB PRZYSZEDŁ NA ZEBRANIE REDAKCJI","Już tu jest.","Spotkaliśmy go na plaży Hula Hula.","Teraz ma własne miejsce w naszej historii.","Bo po Tamarze, plażowych kotach, żółwiach, tysiącach ryb, delfinach i Cleomoray trudno już nas zaskoczyć.","Chociaż...","To Egipt.","Pewnie mu się uda.",
"✨ P&D WILD EGYPT — 7 FAKTÓW DO ZAPAMIĘTANIA","01 — Koralowce są zwierzętami.","Wasz „podwodny ogród” naprawdę żyje.","02 — Morze Czerwone jest niezwykle bogate w ryby.","Występuje tu ponad tysiąc gatunków.","03 — Delfiny też potrzebują odpoczynku.","W Samadai delfiny długoszczękie wykorzystują lagunę jako dzienne schronienie po nocnej aktywności.","04 — Egipt odegrał ważną rolę w historii kotów domowych.","Starożytne DNA ujawnia rozprzestrzenienie się egipskiej linii kotów daleko poza granice kraju.","05 — Pustynia i namorzyny mogą sąsiadować.","Morze Czerwone łączy krajobrazy, których nigdy nie spodziewalibyście się zobaczyć obok siebie.","06 — Najlepszym rozmówcą do niezwykłej historii o rafie jest doświadczony miejscowy nurek.","Zamiast „Co tu żyje?”, spróbujcie zapytać:","„Kogo tu znasz?”","07 — Najciekawszego zwierzęcia podróży nie można zarezerwować z wyprzedzeniem.","Może będzie to delfin.","Może — murena.","A może — bezczelny plażowy kot, który uzna, że wasz telefon należy do niego.",
"☀️ ŻYWY EGIPT","Być może to zwierzęta sprawiają, że Egipt wydaje się szczególnie bliski.","Bo łączą wszystko.","Starożytność — z teraźniejszością.","Pustynię — z morzem.","Miasto — z przyrodą.","Upalny dzień — z ciepłym wieczorem.","Nad wodą powietrze pachnie przyprawami, olejkami, kawą, sziszą i morską solą.","Pod wodą zapachy znikają, zastąpione niezwykle intensywnymi kolorami koralowców i ryb.","Na plaży w cieniu leży kot o profilu znajomym ze sztuki starożytnego Egiptu.","W Hurghadzie Tamara siada komuś na głowie.","Żółw kończy swój nieskończenie ważny listek.","Delfiny odpoczywają po nocnej aktywności.","A gdzieś w koralowej szczelinie siedzi Cleomoray.","To wszystko dzieje się jednocześnie.","Nie w zoo.","Nie w książce.","Nie na ekranie.","Tutaj.","Pod jednym gorącym egipskim słońcem.","Być może dlatego egipska fauna tak mocno zostaje w pamięci.","Nie wydaje się osobną atrakcją.","Jest wpleciona w sam Egipt.","W jego morze.","Jego ulice.","Jego historię.","Jego kolory.","Jego ciepło.","I w te małe przypadkowe spotkania, które z jakiegoś powodu zostają z nami najdłużej.",
"🇪🇬 KTO TU MIESZKA? — EGIPT","Nie tylko oglądaj Egipt.\nZobacz, kto patrzy na ciebie.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({sk:{editorialUI:{
listen:"Vypočuť článok",stop:"Zastaviť",back:"Všetky články",previous:"Predchádzajúca fotografia",next:"Ďalšia fotografia",location:"King Tut Bazar · Hurghada, Egypt",locationNote:"Tamara žije v jednom z malých obchodov; oproti sú suchozemské korytnačky a mačky.",crab:"Pláž Hula Hula · Egypt",generated:"Cleomoray",unavailable:"Predčítanie nie je v tomto prehliadači dostupné.",fallback:"Úplný preklad do vybraného jazyka sa pripravuje. Zobrazuje sa anglický článok.",shortTitle:"Iný Egypt",bestWorker:"Najlepší zamestnanec",source:"Zdroj",factsTitle:"Sedem faktov o živom Egypte",mauTitle:"Egyptská mau",mauText:"Mau vie „čvirikať“ a zdraviť svojich ľudí jemnými melodickými trilkami.",mauAlt:"Egyptská mau v celej svojej kráse",catAlt:"Mačka odpočíva na pulte obchodu v Hurghade",tamaraAlt:"Tamara sa pozerá priamo do objektívu",dolphinsLabel:"Delfíny",crabHeading:"🦀 Krab dorazil na redakčnú poradu",crabOpening:["Už je tu.","Stretli sme ho na pláži Hula Hula.","A teraz má v našom príbehu vlastné miesto."],
facts:[["Delfíny majú vlastnú „starostlivosť o pokožku“.","Pri Hurghade sa delfíny otierajú o určité koraly a hubky. Výskumníci predpokladajú, že ich látky môžu pomáhať pri starostlivosti o pokožku."],["Korytnačky majú „fotopasy“.","V egyptskom Červenom mori sa jednotlivé morské korytnačky rozpoznávajú podľa vzoru šupín na hlave. Tak možno zaznamenávať opakované stretnutia."],["Delfíny sa rozpoznávajú podľa plutvy.","Jazvy a zárezy na chrbtovej plutve pomáhajú výskumníkom z Hurghady rozlišovať jednotlivé delfíny bez pripevňovania značiek."],["V mori sú pastviny pre morské kravy.","Dugongy sa živia morskou trávou. Zátoka Abu Dabbab má rozsiahle podvodné lúky, ktoré týmto zvieratám poskytujú vhodné prostredie."],["Potápači môžu pomáhať pri výskume korytnačiek.","TurtleWatch zhromažďuje pozorovania potápačov a ľudí so šnorchlom, aby lepšie zmapoval výskyt morských korytnačiek."],["Zviera môžete podporovať na diaľku.","Egyptský útulok S.P.A.R.E. ponúka podporu mačiek, psov a somárov, aj keď si zviera nemôžete vziať domov."],["Egyptská mau vie „čvirikať“.","Tieto škvrnité domáce mačky môžu svojich ľudí zdraviť jemnými melodickými trilkami a čvirikavými zvukmi."]]},
text:[
"🇪🇬 INÝ EGYPT: TEN, KTORÝ SA POZERÁ SPÄŤ NA VÁS","Mačky s tvárami zo starovekých vyobrazení, Tamara z Hurghady, suchozemské korytnačky, delfíny po „nočnej zmene“, neónovo sfarbené ryby a Cleomoray — podvodná známa egyptského potápača.",
"Existuje Egypt pyramíd.","Existuje Egypt hotelov a pláží.","A existuje ešte iný.","Schováva sa pod ležadlom, sedí na konári vedľa obchodu, pomaly prežúva zelené listy, prepláva medzi koralmi a niekedy vykúka zo štrbiny útesu s výrazom, ktorý naznačuje, že veľmi dobre vie, že ste prišli práve kvôli nemu.","To je živý Egypt.","To je Egypt, ktorý objavuje P&D.","Nie zbierka zvierat v encyklopédii, ale neobyčajný svet tvorov žijúcich vedľa ľudí — v uliciach, na plážach a pod hladinou Červeného mora.","A čím dlhšie ich pozorujete, tým silnejší je pocit:","ľudia tu ani zďaleka nie sú jedinými hlavnými hrdinami.",
"NAJPRV SA OBJAVIA MAČKY","V horúcom poludní akoby Egypt spomalil.","Vzduch sa chveje nad rozpálenou zemou.","Piesok je horúci.","Biele steny takmer oslňujú.","V diaľke sa more trbliece v neuveriteľných odtieňoch modrej.","A niekde v chladnom páse tieňa je vždy mačka.","Egyptské mačky si vedia vybrať najlepšie miesta.","Pod stolom.","Pod ležadlom.","Vedľa obchodu.","Na pláži.","A niekedy — presne tam, kadiaľ sa človek práve chystal prejsť.","Niektoré si udržiavajú kráľovský odstup.","Iné prídu tak blízko, že namiesto portrétu získate fotografiu jedného obrovského mačacieho nosa.","Práve pri prezeraní našich fotografií si P&D všimlo niečo pozoruhodné.","Zdajú sa nám povedomé.","Štíhle telo.","Dlhé nohy.","Veľké uši.","Úzka tvár.","Mandľové oči.","Niektoré majú okolo očí výrazné tmavé linky, akoby boli namaľované staroegyptským kohlom.","Kde sme tieto siluety už videli?","Samozrejme.","Na vyobrazeniach starovekého Egypta.","V soškách.","V múzeách.","V umení starom tisíce rokov.",
"3 000 ROKOV. ROVNAKÁ POVAHA.","Nie, nebudeme vám rozprávať krásnu internetovú legendu, že práve tá mačka pod naším plážovým ležadlom je priamym potomkom faraónovho obľúbenca.","Tak veda nefunguje.","Pravda je však rovnako zaujímavá.","Výskum starovekej DNA ukazuje, že egyptská populácia mačiek skutočne zohrala významnú úlohu pri šírení domácich mačiek po starovekom svete. Egyptská línia sa rozšírila obzvlášť výrazne v období klasickej antiky.","A mačky mali v staroegyptskej kultúre naozaj výnimočné postavenie.","Preto môže dnešné stretnutie niekedy pôsobiť takmer neuveriteľne.","Píše sa rok 2026.","Pláž.","Červené more.","Spod ležadla vyjde štíhla mačka.","Zastaví sa.","Zdvihne hlavu.","Pozrie sa priamo do objektívu.","A na okamih akoby zmizla vzdialenosť medzi dnešným Egyptom a Egyptom spred niekoľkých tisíc rokov.","Rovnaký profil.","Rovnaký pohľad.","A možno aj rovnaké absolútne presvedčenie, že ľudia sú tu obsluhujúci personál.",
"🐈 MALÉ TAJOMSTVO P&D","Ak chcete odfotografovať egyptskú mačku, skúste ju neprenasledovať.","Čupnite si.","Dajte telefón nižšie.","A počkajte.","Mačacia zvedavosť niekedy urobí celú prácu fotografa.","A podľa našich snímok považujú niektorí miestni modeli objektív za mimoriadne zaujímavý predmet.",
"💛 A V HURGHADE ŽIJE TAMARA","Medzi všetkými postavami tohto príbehu je jedna, ktorú si s nikým nepomýlite.","Žiarivo žltá.","Drobná.","Spoločenská.","A úplne sebavedomá.","Tamara.","Žije s ďalšími andulkami v jednom z obchodov v Hurghade.","Večer sa mesto premení.","Denná horúčava ustupuje.","Rozsvecujú sa farebné vývesné štíty.","Z otvorených obchodov prichádzajú vône olejov a orientálnych parfumov.","Niekde vonia korenie a káva.","Inde — ovocie.","Vo vzduchu sa mieša ľahký sladkastý dym vodných fajok, teplo slnkom vyhriateho kameňa a slaný dych mora.","A uprostred tejto egyptskej večernej symfónie sedí Tamara.","Vyhovuje jej všetko.","Ľudská ruka — vhodná.","Rameno — výborné.","Hlava — prakticky VIP lóža.","Podľa fotografií zostáva otázka, kto prišiel pozorovať koho, otvorená.","My sme prišli za Tamarou.","Tamara zjavne prišla za nami.",
"VERDIKT P&D:","Funkcia: neznáma.","Pracovisko: obchod v Hurghade.","Špecializácia: public relations.","Úroveň sebavedomia: CEO.",
"🐢 POTOM SA ČAS ZASTAVÍ","Od papagája, ktorý vám za pár sekúnd pristane na hlave, k tvorovi, ktorý nemá vôbec žiadny dôvod ponáhľať sa.","Suchozemské korytnačky.","Veľká.","Malá.","A naozaj maličká.","Jedna sa pohodlne zmestí do dlane a ďalej prežúva zelené listy, akoby sa okolo vôbec nič nedialo.","A tu si uvedomíte, ako rozdielne zvieratá prežívajú svet.","Človek už urobil desať fotografií.","Skontroloval správy.","Premýšľal, kam pôjde ďalej.","A korytnačka stále dojedá svoj prvý lístok.","Možno práve preto sa vedľa nich cítime tak pokojne.",
"RADA P&D:","Niekedy najlepší egyptský kouč pohody váži menej ako kilogram a nosí vlastný dom na chrbte.",
"🌊 A TERAZ — POD VODU","Tu sa začína úplne iná fauna.","Niekoľko krokov teplou vodou.","Maska.","Nádych.","Hlava sa ponorí pod hladinu.","A známy Egypt zmizne.","Žiadna vôňa korenia.","Žiadne hlasy.","Žiadna vodná fajka.","Žiadny horúci vzduch.","Zostávajú len svetlo, voda a farby.",
"VITAJTE V INOM EGYPTE.","Červené more je prekvapivo priezračné.","Slnečné lúče prechádzajú vodou a bežia po dne.","A potom prichádza skutočná explózia farieb.","Tyrkysová.","Elektrická modrá.","Citrónovo žltá.","Fialová.","Oranžová.","Ružová.","Strieborná.","Ryby preplávajú medzi koralmi v celých oblakoch.","Niektoré vyzerajú ako šperky.","Iné — ako postavičky z kreslených filmov.","Ďalšie akoby navrhol dizajnér, ktorý smel použiť všetky farby naraz.","A zrazu si uvedomíte:","Egypt nepotrebuje žiadny filter.",
"🐠 PODVODNÁ METROPOLA","Červené more nie je len krásne miesto na šnorchlovanie.","Je to obrovský živý svet.","V jeho egyptských vodách žije viac ako tisíc druhov rýb a stovky druhov koralov.","Niektoré druhy sa vyskytujú práve v tomto regióne.","Preto môžu dva susedné úseky útesu vyzerať ako dve úplne odlišné štvrte toho istého mesta.","Len namiesto automobilov sú tu húfy rýb.","Namiesto domov — koraly.","A dopravné zápchy sú oveľa krajšie.",
"🪸 FAKT, KTORÝ STÁLE PREKVAPUJE MNOHO ĽUDÍ","Koral je živočích.","Nie rastlina.","Nie nezvyčajný podvodný kameň.","Živočích.","Drobné koralové polypy žijú v kolóniách a počas nesmierne dlhých období vytvárajú štruktúry, ktoré sa menia na celé útesy.","Fantastická „záhrada“ pod vašou šnorchlovacou maskou je teda v skutočnosti obrovské živé mesto.","V okolí Ras Mohammed boli zaznamenané stovky odrôd tvrdých a mäkkých koralov.","Existuje však ešte prekvapivejší fakt.","Časť samotného polostrova Ras Mohammed tvorí starý fosílny koralový útes, ktorý sa zdvihol pred desiatkami tisíc rokov.","Vzniká takmer neuveriteľný obraz:","pod vami — živý útes.","a neďaleko nad vodou — stopa dávneho útesu.","Egypt vie spájať minulosť a súčasnosť aj pod vodou.",
"👑 TERAZ SPOZNAJTE KRÁĽOVNÚ","Každá dobrá štvrť má miestnu celebritu.","Náš útes tiež.","P&D počulo príbeh od egyptského inštruktora potápania, ktorý trávi veľa času pod vodou.","Keď sa turista pozerá na útes, vidí množstvo rýb.","Keď sa tam ten istý človek pravidelne potápa, veci sa trochu zmenia.","Začne spoznávať miesta.","Štrbiny.","Trasy.","A niekedy — jednotlivých obyvateľov.","Náš potápač nám rozprával o muréne, s ktorou sa opakovane stretáva.","Spoznáva ju.","Objavuje sa na známom mieste.","A postupne sa tieto stretnutia stali niečím ako podvodnou známosťou.","Dá sa to z pohľadu samotnej murény nazvať priateľstvom?","Na to sme sa jej neopýtali.","P&D sa však s istotou rozhodlo pre jedno:","takáto postava nemôže zostať bez mena.",
"CLEOMORAY 👑","Cleomoray — kráľovná útesu.","Domov: Červené more.","Rezidencia: koralová štrbina.","Výhľad z okna: 10/10.","Dress code: natural couture.","Povaha: kráľovská.","Počet zubov: otázka bola vyhodnotená ako príliš osobná.","Prijímanie návštev: výhradne podľa uváženia Jej Veličenstva.","Vieme, ako ju egyptský potápač nazýva.","Ale niečo iné je oveľa zaujímavejšie:","ako Cleomoray nazýva jeho?","„Ten človek s fľašou“?","„Zase prišiel“?","Alebo preňho naozaj má svoje vlastné murénie meno?","Možno je lepšie niektoré egyptské tajomstvá ponechať Červenému moru.",
"🐬 DELFÍNY, KTORÉ PRACUJÚ V NOCI","Ďalej v príbehu sa objavuje jeden z najobľúbenejších morských hrdinov ľudstva.","Delfín.","Ale aj tu je malé egyptské tajomstvo.","Neďaleko Marsa Alam leží útes Samadai — slávny Dolphin House.","Žijú tam delfíny dlhonosé.","A majú veľmi zaujímavý denný režim.","Sú aktívne a lovia najmä v noci, zatiaľ čo cez deň odpočívajú v chránenej lagúne.","Situácia teda vyzerá približne takto.","Turista sa zobudí.","Naraňajkuje sa.","Oblečie si plavky.","Radostne oznámi:","„Dnes ideme za delfínmi!“","A niekde v lagúne:","🐬","„Mohli by ste byť tichšie? Práve sa nám skončila nočná zmena.“",
"💙 NAJLEPŠIE STRETNUTIE JE TO, KTORÉ SI ZVIERA VYBERIE","Preto má P&D obzvlášť rado jednoduchú zásadu pozorovania morských zvierat.","Nesnažte sa dokonalý okamih zinscenovať.","Nechajte ho nastať.","Ak delfín pripláva sám — kúzlo.","Ak ryba prepláva pred fotoaparátom — odfoťte ju.","Ak sa Cleomoray dnes rozhodne zostať doma — kráľovná má voľno.","Divoká príroda je krásna práve tým, že sa neriadi rozvrhom turistov.",
"🌴 VIETE, ČO EŠTE RASTIE PRI ČERVENOM MORI?","Mangrovy.","A to je jeden z kontrastov, ktorými nás Egypt neustále prekvapuje.","Púštne hory.","Piesok.","Modré more.","Koralové útesy.","A zrazu — zelené mangrovové porasty.","Napríklad prírodná oblasť Nabq neďaleko Sharm El Sheikh je známa kombináciou púštnej krajiny, mora, útesov a mangrovov.","A znovu sa ukazuje, že egyptská fauna neexistuje ako súbor oddelených obrázkov.","Všetko je prepojené.","Pobrežie.","Rastliny.","Útes.","Ryby.","Vtáky.","Suchozemské zvieratá.","More.","Jeden obrovský živý svet.",
"🦀 KRAB DORAZIL NA REDAKČNÚ PORADU","Už je tu.","Stretli sme ho na pláži Hula Hula.","A teraz má v našom príbehu vlastné miesto.","Pretože po Tamare, plážových mačkách, korytnačkách, tisícoch rýb, delfínoch a Cleomoray už nie je ľahké nás prekvapiť.","Aj keď...","Toto je Egypt.","Najskôr sa mu to podarí.",
"✨ P&D WILD EGYPT — 7 FAKTOV NA ZAPAMÄTANIE","01 — Koraly sú živočíchy.","Vaša „podvodná záhrada“ je naozaj živá.","02 — Červené more je mimoriadne bohaté na ryby.","Vyskytuje sa tu viac ako tisíc druhov.","03 — Aj delfíny potrebujú odpočinok.","V Samadai využívajú delfíny dlhonosé lagúnu ako denné útočisko po nočnej aktivite.","04 — Egypt zohral významnú úlohu v dejinách domácich mačiek.","Staroveká DNA odhaľuje šírenie egyptskej mačacej línie ďaleko za hranice krajiny.","05 — Púšť a mangrovy môžu susediť.","Červené more spája krajiny, ktoré by ste vedľa seba nikdy nečakali.","06 — Na nezvyčajný príbeh o útese je najlepším človekom skúsený miestny potápač.","Namiesto „Čo tu žije?“ sa skúste opýtať:","„Koho tu poznáš?“","07 — Najzaujímavejšie zviera vašej cesty si nemôžete rezervovať vopred.","Možno to bude delfín.","Možno — muréna.","Alebo možno — drzá plážová mačka, ktorá rozhodne, že váš telefón patrí jej.",
"☀️ ŽIVÝ EGYPT","Možno práve zvieratá nám Egypt obzvlášť približujú.","Pretože všetko prepájajú.","Starovek — so súčasnosťou.","Púšť — s morom.","Mesto — s prírodou.","Horúci deň — s teplým večerom.","Nad vodou vzduch vonia korením, olejmi, kávou, vodnými fajkami a morskou soľou.","Pod vodou vône miznú a nahrádzajú ich žiarivé farby koralov a rýb.","Na pláži leží v tieni mačka s profilom, ktorý poznáme zo staroegyptského umenia.","V Hurghade si Tamara sadá niekomu na hlavu.","Korytnačka dojedá svoj nekonečne dôležitý lístok.","Delfíny odpočívajú po nočnej aktivite.","A niekde v koralovej štrbine sedí Cleomoray.","To všetko sa deje súčasne.","Nie v zoo.","Nie v knihe.","Nie na obrazovke.","Tu.","Pod jediným horúcim egyptským slnkom.","A možno práve preto egyptská fauna tak pevne zostáva v pamäti.","Nepôsobí ako samostatná atrakcia.","Je vpletená do samotného Egypta.","Do jeho mora.","Jeho ulíc.","Jeho histórie.","Jeho farieb.","Jeho tepla.","A tých malých náhodných stretnutí, ktoré s nami z nejakého dôvodu zostávajú najdlhšie.",
"🇪🇬 KTO TU ŽIJE? — EGYPT","Nepozerajte sa len na Egypt.\nObjavte, kto sa pozerá späť na vás.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({hu:{editorialUI:{
listen:"Cikk meghallgatása",stop:"Leállítás",back:"Összes cikk",previous:"Előző fénykép",next:"Következő fénykép",location:"King Tut Bazar · Hurghada, Egyiptom",locationNote:"Tamara az egyik kis üzletben él; szemben szárazföldi teknősök és macskák vannak.",crab:"Hula Hula strand · Egyiptom",generated:"Cleomoray",unavailable:"Ebben a böngészőben nem érhető el a felolvasás.",fallback:"A kiválasztott nyelv teljes fordítása készül. Az angol cikk látható.",shortTitle:"Egy másik Egyiptom",bestWorker:"A legjobb munkatárs",source:"Forrás",factsTitle:"Hét tény az élő Egyiptomról",mauTitle:"Egyiptomi mau",mauText:"A mau „csiripelni” is tud, és halk, dallamos trillákkal üdvözölheti az embereit.",mauAlt:"Egyiptomi mau teljes alakban",catAlt:"Macska pihen egy hurghadai üzlet pultján",tamaraAlt:"Tamara egyenesen az objektívbe néz",dolphinsLabel:"Delfinek",crabHeading:"🦀 A rák megérkezett a szerkesztőségi értekezletre",crabOpening:["Már itt van.","A Hula Hula strandon találkoztunk vele.","És most már neki is saját helye van a történetünkben."],
facts:[["A delfineknek saját „bőrápolásuk” van.","Hurghada közelében a delfinek bizonyos korallokhoz és szivacsokhoz dörgölőznek. A kutatók feltételezik, hogy ezek anyagai segíthetnek a bőr ápolásában."],["A teknősöknek „fényképes igazolványuk” van.","Az egyiptomi Vörös-tengerben az egyes tengeri teknősöket a fejük pikkelymintázata alapján azonosítják. Így az ismételt találkozások is nyomon követhetők."],["A delfinek az uszonyukról felismerhetők.","A hátúszó hegei és bevágásai segítik a hurghadai kutatókat az egyes delfinek megkülönböztetésében, jeladók felhelyezése nélkül."],["A tengerben legelők is vannak a tengeri teheneknek.","A dugongok tengeri füvet esznek. Az Abu Dabbab-öböl kiterjedt víz alatti rétjei megfelelő élőhelyet nyújtanak ezeknek az állatoknak."],["A búvárok segíthetnek a teknősök kutatásában.","A TurtleWatch búvárok és sznorkelezők megfigyeléseit gyűjti, hogy jobban feltérképezze a tengeri teknősök előfordulását."],["Távolról is támogathatsz egy állatot.","Az egyiptomi S.P.A.R.E. menhely macskák, kutyák és szamarak támogatását is lehetővé teszi, akkor is, ha nem viheted őket haza."],["Az egyiptomi mau „csiripelni” is tud.","Ezek a foltos házimacskák halk, dallamos trillákkal és csiripelő hangokkal üdvözölhetik az embereiket."]]
},text:[
"🇪🇬 EGY MÁSIK EGYIPTOM: AMELY VISSZANÉZ RÁD","Ókori ábrázolásokra emlékeztető macskák, Tamara Hurghadából, teknősök, az „éjszakai műszak” után pihenő delfinek, neonfényű halak és Cleomoray — egy egyiptomi búvároktató víz alatti ismerőse.",
"Van a piramisok Egyiptoma.","Van a szállodák és strandok Egyiptoma.","És van egy másik is.","A napágy alatt bújik meg, egy üzlet mellett ül egy ágon, komótosan rágcsálja a zöld leveleket, korallok között cikázik, és néha úgy kukkant ki egy zátony hasadékából, mintha pontosan tudná, hogy csak miatta jöttél.","Ez az élő Egyiptom.","Ezt az Egyiptomot fedezi fel a P&D.","Nem egy enciklopédia állatgyűjteményét, hanem az emberek mellett élő lények különleges világát — az utcákon, a strandokon és a Vörös-tenger felszíne alatt.","És minél tovább figyeled őket, annál erősebb az érzés:","itt korántsem az ember az egyetlen főszereplő.",
"ELŐSZÖR A MACSKÁK JELENNEK MEG","A forró déli órákban Egyiptom mintha lelassulna.","A felhevült föld felett vibrál a levegő.","A homok forró.","A fehér falak szinte vakítanak.","A távolban a tenger a kék hihetetlen árnyalataiban ragyog.","És valahol, egy hűvös árnyéksávban, mindig ott van egy macska.","Az egyiptomi macskák tudják, hogyan válasszák ki a legjobb helyeket.","Az asztal alatt.","A napágy alatt.","Egy üzlet mellett.","A strandon.","És néha — éppen ott, ahol valaki el akart haladni.","Némelyik királyi távolságot tart.","Mások annyira közel jönnek, hogy portré helyett egy hatalmas macskaorr fényképét kapod.","A fényképeinket nézegetve a P&D valami figyelemre méltót vett észre.","Mintha ismernénk őket.","Karcsú test.","Hosszú lábak.","Nagy fülek.","Keskeny arc.","Mandulavágású szemek.","Némelyik szemét sötét, kifejező vonalak keretezik, mintha ókori egyiptomi szemfestékkel rajzolták volna őket.","Hol láttuk már ezeket a sziluetteket?","Persze.","Az ókori Egyiptom ábrázolásain.","Szobrocskákon.","Múzeumokban.","Több ezer éves műalkotásokon.",
"3000 ÉV. UGYANAZ A HOZZÁÁLLÁS.","Nem fogunk egy szép internetes legendát mesélni arról, hogy a strandnapágyunk alatt ülő macska egy fáraó kedvencének közvetlen leszármazottja.","A tudomány nem így működik.","Az igazság azonban legalább ilyen érdekes.","Az ősi DNS vizsgálata szerint Egyiptom macskapopulációja valóban fontos szerepet játszott a házimacskák elterjedésében az ókori világban. Az egyiptomi leszármazási vonal különösen a klasszikus ókorban terjedt el széles körben.","A macskáknak pedig valóban különleges helyük volt az ókori egyiptomi kultúrában.","Ezért egy mai találkozás néha szinte hihetetlennek tűnik.","2026-ot írunk.","Egy strand.","A Vörös-tenger.","Egy karcsú macska előbújik a napágy alól.","Megáll.","Felemeli a fejét.","Egyenesen az objektívbe néz.","És egy pillanatra mintha eltűnne a mai Egyiptom és a több ezer évvel ezelőtti Egyiptom közötti távolság.","Ugyanaz a profil.","Ugyanaz a tekintet.","És talán ugyanaz a teljes bizonyosság, hogy itt az ember a kiszolgáló személyzet.",
"🐈 A P&D APRÓ TITKA","Ha egy egyiptomi macskát szeretnél lefényképezni — próbáld meg nem követni.","Guggolj le.","Engedd le a telefonodat.","És várj.","A macskák kíváncsisága néha elvégzi a fotós minden munkáját.","A képeink alapján pedig néhány helyi modell rendkívül érdekes tárgynak tartja az objektívet.",
"💛 HURGHADÁBAN PEDIG TAMARA ÉL","Történetünk szereplői között van valaki, akit senkivel sem lehet összetéveszteni.","Élénksárga.","Apró.","Társaságkedvelő.","És teljesen biztos önmagában.","Tamara.","Más hullámos papagájokkal él Hurghada egyik üzletében.","Estére megváltozik a város.","Enyhül a nappali hőség.","Kigyulladnak a színes feliratok.","A nyitott üzletekből olajok és keleti parfümök illata árad.","Valahol fűszerek és kávé illata érződik.","Máshol — gyümölcsöké.","A levegőben keveredik a vízipipa könnyű, édeskés füstje, a napsütötte kövek melege és a tenger sós lehelete.","És ennek az egyiptomi esti szimfóniának a közepén ott ül Tamara.","Minden megfelel neki.","Egy emberi kéz — megfelelő.","Egy váll — kiváló.","Egy fej — szinte VIP-páholy.","A fényképek alapján továbbra is kérdés, hogy ki jött kit megnézni.","Mi Tamarát jöttünk megnézni.","Tamara egyértelműen minket jött megnézni.",
"A P&D ÍTÉLETE:","Beosztás: ismeretlen.","Munkahely: egy üzlet Hurghadában.","Szakterület: közönségkapcsolatok.","Önbizalom: vezérigazgatói szint.",
"🐢 AZTÁN MEGÁLL AZ IDŐ","A papagájtól, amely másodpercek alatt a fejedre száll — egy olyan lényig, amelynek semmi oka sietni.","Teknősök.","Egy nagy.","Egy kicsi.","És egy egészen apró.","Az egyik kényelmesen elfér a tenyérben, és tovább rágcsálja a zöld leveleket, mintha körülötte semmi sem történne.","Itt érted meg, mennyire másként érzékelik a világot az állatok.","Az ember már tíz fényképet készített.","Megnézte az üzeneteit.","Átgondolta, hová menjen tovább.","A teknős pedig még mindig az első levelét eszi.","Talán ezért olyan megnyugtató a közelükben lenni.",
"A P&D ÉLETTANÁCSA:","Néha a legjobb egyiptomi wellness-tanácsadó egy kilogrammnál is kevesebbet nyom, és a hátán hordja a saját otthonát.",
"🌊 MOST PEDIG — A VÍZ ALÁ","Itt egy egészen más állatvilág kezdődik.","Néhány lépés a meleg vízben.","Egy búvármaszk.","Egy lélegzet.","A fejed a felszín alá merül.","És az ismerős Egyiptom eltűnik.","Nincs fűszerillat.","Nincsenek hangok.","Nincs vízipipa.","Nincs forró levegő.","Csak fény, víz és szín marad.",
"ÜDVÖZLÜNK EGY MÁSIK EGYIPTOMBAN.","A Vörös-tenger elképesztően tiszta.","A napsugarak áthatolnak a vízen, és végigfutnak a tengerfenéken.","Aztán valóságos színrobbanás következik.","Türkiz.","Elektromos kék.","Citromsárga.","Lila.","Narancssárga.","Rózsaszín.","Ezüst.","A halak egész felhőkben vonulnak a korallok között.","Némelyik ékszerre hasonlít.","Mások — rajzfilmfigurákra.","Megint mások úgy festenek, mintha egy tervezőnek megengedték volna, hogy egyszerre minden színt használjon.","És hirtelen rájössz:","Egyiptomnak egyáltalán nincs szüksége szűrőre.",
"🐠 VÍZ ALATTI NAGYVÁROS","A Vörös-tenger több egy gyönyörű sznorkelezőhelynél.","Hatalmas élő világ.","Egyiptomi vizeiben több mint ezer halfaj és több száz korallfaj él.","Egyes fajok kifejezetten ehhez a térséghez kötődnek.","Ezért két szomszédos zátonyszakasz ugyanannak a városnak két egészen különböző negyedére emlékeztethet.","Csakhogy itt autók helyett halrajok járnak.","Házak helyett korallok állnak.","És a forgalmi dugók sokkal szebbek.",
"🪸 EGY TÉNY, AMELY MÉG MINDIG SOKAKAT MEGLEP","A korall állat.","Nem növény.","Nem különleges víz alatti kő.","Állat.","Az apró korallpolipok telepekben élnek, és hatalmas időszakok alatt olyan képződményeket hoznak létre, amelyekből egész zátonyok lesznek.","A fantasztikus „kert”, amely felett búvármaszkkal úszol, valójában egy óriási élő város.","Ras Mohammed környékén kemény- és lágykorallok több száz változatát jegyezték fel.","De van egy még meglepőbb tény.","A Ras Mohammed-félsziget egy része is egy ősi, megkövesedett korallzátonyból áll, amely több tízezer évvel ezelőtt emelkedett ki.","Szinte hihetetlen látvány:","alattad — egy élő zátony.","a közelben, a víz felett — egy ősi zátony nyoma.","Egyiptom még a víz alatt is összekapcsolja a múltat és a jelent.",
"👑 MOST ISMERD MEG A KIRÁLYNŐT","Minden jó környéknek van helyi híressége.","A mi zátonyunknak is.","A P&D egy egyiptomi búvároktatótól hallott egy történetet, aki sok időt tölt a víz alatt.","Amikor egy turista a zátonyt nézi, sok halat lát.","Amikor ugyanaz az ember rendszeresen merül ott, a dolgok kissé megváltoznak.","Elkezdi felismerni a helyeket.","A hasadékokat.","Az útvonalakat.","És néha — az egyes lakókat is.","A búvárunk egy murénáról mesélt, amellyel újra és újra találkozik.","Felismeri őt.","A muréna az ismerős helyen bukkan fel.","Idővel ezekből a találkozásokból valamiféle víz alatti ismeretség lett.","Nevezhetjük ezt barátságnak a muréna szemszögéből?","Tőle nem kérdeztük meg.","A P&D azonban egy dolgot biztosan eldöntött:","egy ilyen szereplő nem maradhat névtelen.",
"CLEOMORAY 👑","Cleomoray — a zátony királynője.","Otthona: a Vörös-tenger.","Rezidenciája: egy korallhasadék.","Kilátás az ablakból: 10/10.","Öltözködés: natural couture.","Jelleme: királyi.","Fogainak száma: a kérdést túl személyesnek minősítették.","Látogatók fogadása: kizárólag Őfelsége hangulatától függően.","Tudjuk, hogyan nevezi őt az egyiptomi búvár.","De valami más sokkal érdekesebb:","hogyan nevezi Cleomoray a búvárt?","„Az az ember a palackkal”?","„Már megint itt van”?","Vagy valóban van számára egy saját murénaneve?","Talán néhány egyiptomi rejtélyt jobb a Vörös-tengerre hagyni.",
"🐬 DELFINEK, AMELYEK ÉJSZAKA DOLGOZNAK","Történetünkben ezután az emberiség egyik kedvenc tengeri szereplője jelenik meg.","A delfin.","De itt is van egy apró egyiptomi titok.","Marsa Alam közelében található a Samadai-zátony — a híres Delfinház.","Itt a Stenella longirostris fajhoz tartozó delfinekkel találkozhatunk.","És nagyon érdekes a napi rutinjuk.","Főként éjszaka aktívak és táplálkoznak, nappal pedig a védett lagúnában pihennek.","A helyzet tehát nagyjából így fest.","A turista felébred.","Megreggelizik.","Felveszi a fürdőruháját.","Vidáman bejelenti:","„Ma delfineket nézünk!”","Valahol a lagúnában pedig:","🐬","„Lehetnétek halkabban? Most végeztünk az éjszakai műszakkal.”",
"💙 A LEGJOBB TALÁLKOZÁS AZ, AMELYET AZ ÁLLAT VÁLASZT","Ezért kedvel a P&D egy egyszerű elvet a tengeri állatok megfigyelésében.","Ne próbáld megrendezni a tökéletes pillanatot.","Hagyd, hogy megtörténjen.","Ha a delfin magától közelít — varázslatos.","Ha egy hal elúszik a kamera előtt — készíts képet.","Ha Cleomoray ma otthon marad — a királynő szabadnapot tart.","A vadvilág éppen azért gyönyörű, mert nem követi a turisták napirendjét.",
"🌴 TUDOD, MI NŐ MÉG A VÖRÖS-TENGER MELLETT?","Mangrove.","Ez is egyike azoknak az ellentéteknek, amelyekkel Egyiptom újra és újra meglep minket.","Sivatagi hegyek.","Homok.","Kék tenger.","Korallzátonyok.","És egyszer csak — zöld mangrovésűrűség.","A Sharm El Sheikh közelében fekvő Nabq természeti területe például a sivatagi táj, a tenger, a zátonyok és a mangrovék találkozásáról ismert.","Ismét kiderül, hogy Egyiptom állatvilága nem különálló képekből áll.","Minden összefügg.","A part.","A növények.","A zátony.","A halak.","A madarak.","A szárazföldi állatok.","A tenger.","Egyetlen hatalmas élő világ.",
"🦀 A RÁK MEGÉRKEZETT A SZERKESZTŐSÉGI ÉRTEKEZLETRE","Már itt van.","A Hula Hula strandon találkoztunk vele.","És most már neki is saját helye van a történetünkben.","Mert Tamara, a strandmacskák, a teknősök, a halak ezrei, a delfinek és Cleomoray után már nehéz meglepni minket.","Bár…","Ez Egyiptom.","Valószínűleg sikerülni fog neki.",
"✨ P&D WILD EGYPT — 7 MEGJEGYZENDŐ TÉNY","01 — A korallok állatok.","A „víz alatti kerted” valóban él.","02 — A Vörös-tenger rendkívül gazdag halakban.","Több mint ezer faj található itt.","03 — A delfineknek is szükségük van pihenésre.","Samadai lagúnája nappali menedéket nyújt a Stenella longirostris delfineknek az éjszakai aktivitás után.","04 — Egyiptom fontos szerepet játszott a házimacskák történetében.","Az ősi DNS az egyiptomi macskavonal országhatárokon túli elterjedését mutatja.","05 — A sivatag és a mangrove szomszédok lehetnek.","A Vörös-tenger olyan tájakat kapcsol össze, amelyeket nem várnál egymás mellett.","06 — Egy különleges zátonytörténethez egy tapasztalt helyi búvár a legjobb beszélgetőtárs.","A „Mi él itt?” helyett kérdezd meg:","„Kit ismersz itt?”","07 — Az utazás legérdekesebb állatát nem foglalhatod le előre.","Talán egy delfin lesz az.","Talán — egy muréna.","Vagy talán — egy szemtelen strandmacska, amely úgy dönt, hogy a telefonod az övé.",
"☀️ AZ ÉLŐ EGYIPTOM","Talán az állatok miatt érezzük Egyiptomot különösen közelinek.","Mert mindent összekapcsolnak.","Az ókort — a jelennel.","A sivatagot — a tengerrel.","A várost — a természettel.","A forró nappalt — a meleg estével.","A víz felett a levegő fűszerek, olajok, kávé, vízipipa és tengeri só illatát hordozza.","A víz alatt eltűnnek az illatok — helyükre a korallok és halak rendkívül élénk színei lépnek.","A strandon egy macska fekszik az árnyékban, profilja az ókori egyiptomi művészetből ismerős.","Hurghadában Tamara valakinek a fejére telepszik.","Egy teknős a végtelenül fontos levelét eszi.","A delfinek az éjszakai aktivitás után pihennek.","És valahol egy korallhasadékban ott ül Cleomoray.","Mindez egyszerre történik.","Nem állatkertben.","Nem könyvben.","Nem képernyőn.","Itt.","Egyetlen forró egyiptomi nap alatt.","Talán ezért marad olyan élénken az emlékezetünkben Egyiptom állatvilága.","Nem különálló látványosságnak tűnik.","Beleszövődik Egyiptomba.","A tengerébe.","Az utcáiba.","A történelmébe.","A színeibe.","A melegébe.","És azokba az apró, véletlen találkozásokba, amelyek valahogy a legtovább maradnak velünk.",
"🇪🇬 KI ÉL ITT? — EGYIPTOM","Ne csak Egyiptomot nézd.\nLásd meg azt is, ki néz vissza rád.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({ro:{editorialUI:{
listen:"Ascultă articolul",stop:"Oprește",back:"Toate articolele",previous:"Fotografia precedentă",next:"Fotografia următoare",location:"King Tut Bazar · Hurghada, Egipt",locationNote:"Tamara trăiește într-unul dintre micile magazine; vizavi sunt țestoase terestre și pisici.",crab:"Plaja Hula Hula · Egipt",generated:"Cleomoray",unavailable:"Citirea cu voce tare nu este disponibilă în acest browser.",fallback:"Traducerea completă în limba selectată este în pregătire. Este afișat articolul în engleză.",shortTitle:"Un alt Egipt",bestWorker:"Cel mai bun angajat",source:"Sursă",factsTitle:"Șapte fapte despre Egiptul viu",mauTitle:"Mau egipteană",mauText:"Mau poate „ciripi” și își poate saluta oamenii cu triluri discrete și melodioase.",mauAlt:"Pisică Mau egipteană, fotografiată în întregime",catAlt:"O pisică se odihnește pe tejgheaua unui magazin din Hurghada",tamaraAlt:"Tamara privește direct în obiectiv",dolphinsLabel:"Delfini",crabHeading:"🦀 Crabul a venit la ședința redacției",crabOpening:["Este deja aici.","L-am întâlnit pe plaja Hula Hula.","Și acum are propriul loc în povestea noastră."],
facts:[["Delfinii au propria „îngrijire a pielii”.","Lângă Hurghada, delfinii se freacă de anumiți corali și bureți. Cercetătorii presupun că substanțele acestora ar putea ajuta la îngrijirea pielii."],["Țestoasele au „pașapoarte fotografice”.","În Marea Roșie egipteană, țestoasele marine sunt identificate individual după modelul solzilor de pe cap. Astfel pot fi urmărite întâlnirile repetate."],["Delfinii sunt recunoscuți după înotătoare.","Cicatricile și crestăturile înotătoarei dorsale îi ajută pe cercetătorii din Hurghada să deosebească delfinii fără să le atașeze marcaje."],["În mare există pășuni pentru vacile de mare.","Dugongii se hrănesc cu iarbă de mare. Golful Abu Dabbab are întinse pajiști subacvatice care oferă un habitat potrivit acestor animale."],["Scafandrii pot ajuta la studierea țestoaselor.","TurtleWatch adună observații de la scafandri și pasionații de snorkeling pentru a înțelege mai bine unde se întâlnesc țestoasele marine."],["Poți sprijini un animal de la distanță.","Adăpostul egiptean S.P.A.R.E. oferă posibilitatea de a sprijini pisici, câini și măgari, chiar dacă nu îi poți lua acasă."],["Mau egipteană poate „ciripi”.","Aceste pisici domestice pătate își pot saluta oamenii cu triluri discrete și melodioase și cu sunete asemănătoare ciripitului."]]
},text:[
"🇪🇬 UN ALT EGIPT: CEL CARE TE PRIVEȘTE ÎNAPOI","Pisici cu chipuri desprinse din imagini antice, Tamara din Hurghada, țestoase, delfini după „tura de noapte”, pești în culori neon și Cleomoray — cunoștința subacvatică a unui instructor de scufundări egiptean.",
"Există Egiptul piramidelor.","Există Egiptul hotelurilor și al plajelor.","Și mai există unul.","Se ascunde sub un șezlong, stă pe o creangă lângă un magazin, mestecă încet frunze verzi, se strecoară printre corali și uneori scoate capul dintr-o crăpătură a recifului cu o expresie care spune că știe perfect că ai venit doar să-l vezi.","Acesta este Egiptul viu.","Acesta este Egiptul pe care îl explorează P&D.","Nu o colecție de animale dintr-o enciclopedie, ci o lume extraordinară de viețuitoare care trăiesc alături de oameni — pe străzi, pe plaje și sub suprafața Mării Roșii.","Și cu cât le privești mai mult, cu atât senzația devine mai puternică:","aici oamenii sunt departe de a fi singurii protagoniști.",
"MAI ÎNTÂI APAR PISICILE","La amiaza fierbinte, Egiptul pare să încetinească.","Aerul tremură deasupra pământului încins.","Nisipul este fierbinte.","Pereții albi aproape că te orbesc.","În depărtare, marea strălucește în nuanțe incredibile de albastru.","Iar undeva, într-o fâșie răcoroasă de umbră, se află întotdeauna o pisică.","Pisicile egiptene știu să aleagă cele mai bune locuri.","Sub o masă.","Sub un șezlong.","Lângă un magazin.","Pe plajă.","Și uneori — exact pe unde voia să treacă cineva.","Unele păstrează o distanță regală.","Altele se apropie atât de mult, încât în loc de portret obții fotografia unui nas enorm de pisică.","Privind fotografiile noastre, P&D a observat ceva remarcabil.","Par cunoscute.","Un corp suplu.","Picioare lungi.","Urechi mari.","Un chip îngust.","Ochi migdalați.","Unele au linii întunecate, expresive, în jurul ochilor, de parcă ar fi fost desenate cu fardul kohl din Egiptul antic.","Unde am mai văzut aceste siluete?","Desigur.","În imaginile Egiptului antic.","În figurine.","În muzee.","În opere de artă vechi de mii de ani.",
"3.000 DE ANI. ACEEAȘI ATITUDINE.","Nu vă vom spune o frumoasă legendă de pe internet potrivit căreia pisica de sub șezlongul nostru ar fi descendenta directă a favoritei unui faraon.","Știința nu funcționează așa.","Dar adevărul se dovedește la fel de interesant.","Studiile ADN-ului antic arată că populația de pisici din Egipt a avut într-adevăr un rol important în răspândirea pisicilor domestice în lumea antică. Linia egipteană s-a răspândit deosebit de mult în Antichitatea clasică.","Iar pisicile aveau un loc cu adevărat special în cultura Egiptului antic.","De aceea, o întâlnire de astăzi poate părea uneori aproape incredibilă.","Suntem în 2026.","O plajă.","Marea Roșie.","O pisică suplă iese de sub un șezlong.","Se oprește.","Ridică capul.","Privește direct în obiectiv.","Și, pentru o secundă, distanța dintre Egiptul de astăzi și cel de acum câteva mii de ani pare să dispară.","Același profil.","Aceeași privire.","Și poate aceeași convingere absolută că oamenii sunt aici personalul de serviciu.",
"🐈 MICUL SECRET P&D","Dacă vrei să fotografiezi o pisică egipteană — încearcă să nu o urmărești.","Ghemuiește-te.","Coboară telefonul.","Și așteaptă.","Curiozitatea felină face uneori toată munca fotografului.","Iar după fotografiile noastre, unele modele locale consideră obiectivul un obiect deosebit de interesant.",
"💛 IAR ÎN HURGHADA TRĂIEȘTE TAMARA","Printre personajele acestei povești există unul pe care nu l-ai putea confunda cu nimeni.","Galben strălucitor.","Minuscul.","Sociabil.","Și complet sigur pe sine.","Tamara.","Trăiește alături de alți peruși într-un magazin din Hurghada.","Seara, orașul se schimbă.","Căldura zilei se domolește.","Se aprind firmele colorate.","Din magazinele deschise vin mirosuri de uleiuri și parfumuri orientale.","Undeva miroase a mirodenii și cafea.","În altă parte — a fructe.","În aer se amestecă fumul ușor și dulceag de narghilea, căldura pietrei încălzite de soare și răsuflarea sărată a mării.","Iar în mijlocul acestei simfonii de seară egiptene stă Tamara.","Totul i se potrivește.","O mână de om — potrivită.","Un umăr — excelent.","Un cap — practic o lojă VIP.","Judecând după fotografii, întrebarea cine a venit să vadă pe cine rămâne deschisă.","Noi am venit să o vedem pe Tamara.","Tamara a venit, evident, să ne vadă pe noi.",
"VERDICTUL P&D:","Funcție: necunoscută.","Loc de muncă: un magazin din Hurghada.","Specializare: relații publice.","Nivel de încredere în sine: director general.",
"🐢 APOI TIMPUL SE OPREȘTE","De la un papagal care îți aterizează pe cap în câteva secunde — la o viețuitoare care nu are niciun motiv să se grăbească.","Țestoase.","Una mare.","Una mică.","Și una cu adevărat minusculă.","Una încape comod în palmă și continuă să mestece frunze verzi de parcă în jur nu s-ar întâmpla absolut nimic.","Aici îți dai seama cât de diferit percep animalele lumea.","Omul a făcut deja zece fotografii.","Și-a verificat mesajele.","S-a gândit unde să meargă mai departe.","Iar țestoasa încă își termină prima frunză.","Poate de aceea este atât de liniștitor să fii lângă ele.",
"SFATUL DE VIAȚĂ P&D:","Uneori, cel mai bun antrenor egiptean de stare de bine cântărește mai puțin de un kilogram și își poartă propria casă în spate.",
"🌊 IAR ACUM — SUB APĂ","Aici începe o faună cu totul diferită.","Câțiva pași prin apa caldă.","O mască.","O respirație.","Capul coboară sub suprafață.","Și Egiptul familiar dispare.","Fără miros de mirodenii.","Fără voci.","Fără narghilea.","Fără aer fierbinte.","Rămân doar lumina, apa și culoarea.",
"BUN VENIT ÎNTR-UN ALT EGIPT.","Marea Roșie este uimitor de limpede.","Razele soarelui trec prin apă și aleargă pe fundul mării.","Apoi începe o adevărată explozie de culoare.","Turcoaz.","Albastru electric.","Galben-lămâie.","Violet.","Portocaliu.","Roz.","Argintiu.","Peștii trec printre corali în nori întregi.","Unii seamănă cu bijuteriile.","Alții — cu personaje de desene animate.","Alții par creați de un designer căruia i s-a permis să folosească toate culorile deodată.","Și deodată îți dai seama:","Egiptul nu are deloc nevoie de filtru.",
"🐠 O METROPOLĂ SUBACVATICĂ","Marea Roșie este mai mult decât un loc frumos pentru snorkeling.","Este o lume vie imensă.","Apele sale egiptene adăpostesc peste o mie de specii de pești și sute de specii de corali.","Unele specii sunt caracteristice acestei regiuni.","De aceea, două porțiuni vecine de recif pot semăna cu două cartiere complet diferite ale aceluiași oraș.","Doar că aici bancurile de pești înlocuiesc mașinile.","Coralii înlocuiesc casele.","Iar ambuteiajele sunt mult mai frumoase.",
"🪸 IATĂ UN FAPT CARE ÎNCĂ ÎI SURPRINDE PE MULȚI","Coralul este un animal.","Nu o plantă.","Nu o piatră subacvatică neobișnuită.","Un animal.","Micii polipi de coral trăiesc în colonii și, de-a lungul unor perioade uriașe, creează structuri care devin recife întregi.","Așadar, „grădina” fantastică de sub masca ta de snorkeling este, de fapt, un oraș viu enorm.","În jurul Ras Mohammed au fost înregistrate sute de varietăți de corali tari și moi.","Dar există un fapt și mai uimitor.","O parte a peninsulei Ras Mohammed este alcătuită chiar dintr-un recif de coral fosilizat, ridicat cu zeci de mii de ani în urmă.","Se formează un tablou aproape incredibil:","sub tine — un recif viu.","iar în apropiere, deasupra apei — urma unui recif străvechi.","Egiptul știe să unească trecutul și prezentul chiar și sub apă.",
"👑 ACUM FACEȚI CUNOȘTINȚĂ CU REGINA","Fiecare cartier bun are o celebritate locală.","Și reciful nostru are una.","P&D a auzit o poveste de la un instructor de scufundări egiptean care petrece mult timp sub apă.","Când un turist privește reciful, vede mulți pești.","Când aceeași persoană se scufundă acolo regulat, lucrurile se schimbă puțin.","Începe să recunoască locurile.","Crăpăturile.","Traseele.","Și uneori — anumiți locuitori.","Scafandrul nostru ne-a povestit despre o murenă pe care o întâlnește iar și iar.","O recunoaște.","Ea apare într-un loc familiar.","Iar în timp, aceste întâlniri au devenit un fel de cunoștință subacvatică.","Putem numi asta prietenie din perspectiva murenei?","Pe ea nu am întrebat-o.","Dar P&D a hotărât un lucru cu certitudine:","un asemenea personaj nu poate rămâne fără nume.",
"CLEOMORAY 👑","Cleomoray — regina recifului.","Domiciliu: Marea Roșie.","Reședință: o crăpătură între corali.","Priveliște de la fereastră: 10/10.","Ținută: natural couture.","Temperament: regal.","Număr de dinți: întrebarea a fost considerată prea personală.","Primirea vizitatorilor: exclusiv după dispoziția Majestății Sale.","Știm cum o numește scafandrul egiptean.","Dar altceva este mult mai interesant:","cum îl numește Cleomoray pe el?","„Omul acela cu butelia”?","„Iar a venit”?","Sau chiar are pentru el un nume propriu, în limba murenelor?","Poate că unele mistere egiptene ar trebui lăsate Mării Roșii.",
"🐬 DELFINII CARE LUCREAZĂ NOAPTEA","Mai departe în poveste apare unul dintre personajele marine preferate ale oamenilor.","Delfinul.","Dar și aici există un mic secret egiptean.","Lângă Marsa Alam se află reciful Samadai — celebra Casă a Delfinilor.","Acolo pot fi întâlniți delfini din specia Stenella longirostris.","Și au un program zilnic foarte interesant.","Sunt activi și se hrănesc mai ales noaptea, folosind laguna adăpostită pentru odihnă în timpul zilei.","Așadar, situația arată cam așa.","Turistul se trezește.","Ia micul dejun.","Își pune costumul de baie.","Anunță bucuros:","„Astăzi mergem să vedem delfinii!”","Iar undeva în lagună:","🐬","„Puteți vorbi mai încet? Tocmai am terminat tura de noapte.”",
"💙 CEA MAI BUNĂ ÎNTÂLNIRE ESTE CEA ALEASĂ DE ANIMAL","De aceea, P&D apreciază în mod special un principiu simplu pentru observarea animalelor marine.","Nu încerca să regizezi momentul perfect.","Lasă-l să se întâmple.","Dacă un delfin se apropie din proprie inițiativă — este magic.","Dacă un pește trece prin fața camerei — fă fotografia.","Dacă Cleomoray decide să rămână acasă astăzi — regina are zi liberă.","Natura sălbatică este frumoasă tocmai pentru că nu urmează programul turistului.",
"🌴 ȘTIȚI CE MAI CREȘTE LÂNGĂ MAREA ROȘIE?","Mangrove.","Acesta este unul dintre contrastele cu care Egiptul ne surprinde mereu.","Munți deșertici.","Nisip.","Mare albastră.","Recife de corali.","Și deodată — desișuri verzi de mangrove.","De exemplu, zona naturală Nabq, lângă Sharm El Sheikh, este cunoscută pentru combinația dintre peisajul deșertic, mare, recife și mangrove.","Și din nou se dovedește că fauna Egiptului nu există în imagini separate.","Totul este legat.","Țărmul.","Plantele.","Reciful.","Peștii.","Păsările.","Animalele terestre.","Marea.","O singură lume vie enormă.",
"🦀 CRABUL A VENIT LA ȘEDINȚA REDACȚIEI","Este deja aici.","L-am întâlnit pe plaja Hula Hula.","Și acum are propriul loc în povestea noastră.","Pentru că după Tamara, pisicile de pe plajă, țestoase, mii de pești, delfini și Cleomoray, este deja greu să ne surprinzi.","Deși…","Acesta este Egiptul.","Probabil va reuși.",
"✨ P&D WILD EGYPT — 7 FAPTE DE REȚINUT","01 — Coralii sunt animale.","„Grădina” ta subacvatică este cu adevărat vie.","02 — Marea Roșie este extraordinar de bogată în pești.","Aici se găsesc peste o mie de specii.","03 — Și delfinii au nevoie de odihnă.","La Samadai, delfinii Stenella longirostris folosesc laguna ca refugiu diurn după activitatea nocturnă.","04 — Egiptul a avut un rol important în istoria pisicilor domestice.","ADN-ul antic arată răspândirea liniei feline egiptene mult dincolo de granițele țării.","05 — Deșertul și mangrovele pot fi vecine.","Marea Roșie unește peisaje pe care nu te-ai aștepta să le vezi alături.","06 — Pentru o poveste neobișnuită despre recif, cel mai bun interlocutor este un scafandru local experimentat.","În loc de „Ce trăiește aici?”, încearcă să întrebi:","„Pe cine cunoști aici?”","07 — Nu poți rezerva dinainte cel mai interesant animal al călătoriei.","Poate va fi un delfin.","Poate — o murenă.","Sau poate — o pisică obraznică de pe plajă care decide că telefonul tău îi aparține.",
"☀️ EGIPTUL VIU","Poate că animalele sunt cele care ne fac să simțim Egiptul atât de aproape.","Pentru că ele unesc totul.","Antichitatea — cu prezentul.","Deșertul — cu marea.","Orașul — cu natura.","Ziua fierbinte — cu seara caldă.","Deasupra apei, aerul miroase a mirodenii, uleiuri, cafea, narghilea și sare de mare.","Sub apă, mirosurile dispar — înlocuite de culorile foarte vii ale coralilor și peștilor.","Pe plajă, o pisică stă la umbră, cu un profil familiar din arta Egiptului antic.","În Hurghada, Tamara se așază pe capul cuiva.","O țestoasă își termină frunza de o importanță nesfârșită.","Delfinii se odihnesc după activitatea nocturnă.","Iar undeva, într-o crăpătură a coralilor, stă Cleomoray.","Toate acestea se întâmplă în același timp.","Nu într-o grădină zoologică.","Nu într-o carte.","Nu pe un ecran.","Aici.","Sub același soare fierbinte al Egiptului.","Și poate de aceea fauna Egiptului rămâne atât de puternic în memorie.","Nu pare o atracție separată.","Este împletită cu Egiptul însuși.","Cu marea lui.","Cu străzile lui.","Cu istoria lui.","Cu culorile lui.","Cu căldura lui.","Și cu acele mici întâlniri întâmplătoare care, cumva, rămân cu noi cel mai mult.",
"🇪🇬 CINE TRĂIEȘTE AICI? — EGIPT","Nu te limita să vezi Egiptul.\nDescoperă cine te privește înapoi.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({bg:{editorialUI:{
listen:"Слушай статията",stop:"Спри",back:"Всички статии",previous:"Предишна снимка",next:"Следваща снимка",location:"King Tut Bazar · Хургада, Египет",locationNote:"Тамара живее в един от малките магазини; отсреща има сухоземни костенурки и котки.",crab:"Плаж Хула Хула · Египет",generated:"Cleomoray",unavailable:"Четенето на глас не е достъпно в този браузър.",fallback:"Пълният превод на избрания език се подготвя. Показва се английската статия.",shortTitle:"Друг Египет",bestWorker:"Най-добрият служител",source:"Източник",factsTitle:"Седем факта за живия Египет",mauTitle:"Египетска мау",mauText:"Мау умее да „чурулика“ и може да поздравява своите хора с тихи мелодични трели.",mauAlt:"Египетска мау в цял ръст",catAlt:"Котка почива върху щанда на магазин в Хургада",tamaraAlt:"Тамара гледа право в обектива",dolphinsLabel:"Делфини",crabHeading:"🦀 Ракът пристигна на редакционната среща",crabOpening:["Той вече е тук.","Срещнахме го на плажа Хула Хула.","И сега има собствено място в нашата история."],
facts:[["Делфините имат собствена „грижа за кожата“.","Край Хургада делфините се търкат в определени корали и гъби. Изследователите предполагат, че техните вещества могат да подпомагат грижата за кожата."],["Костенурките имат „фотографски паспорти“.","В египетското Червено море отделните морски костенурки се разпознават по рисунъка на люспите върху главата. Така могат да се проследяват повторните срещи."],["Делфините се разпознават по перката.","Белезите и вдлъбнатините по гръбната перка помагат на изследователите от Хургада да различават отделните делфини без поставяне на маркировки."],["В морето има пасища за морските крави.","Дюгоните се хранят с морска трева. Заливът Абу Дабаб има обширни подводни ливади, които осигуряват подходяща среда за тези животни."],["Водолазите могат да помагат в изследването на костенурките.","TurtleWatch събира наблюдения от водолази и любители на шнорхела, за да се разбере по-добре къде се срещат морските костенурки."],["Можете да подкрепяте животно от разстояние.","Египетският приют S.P.A.R.E. предлага подкрепа за котки, кучета и магарета, дори ако не можете да ги вземете у дома."],["Египетската мау умее да „чурулика“.","Тези петнисти домашни котки могат да поздравяват своите хора с тихи мелодични трели и чуруликащи звуци."]]
},text:[
"🇪🇬 ДРУГ ЕГИПЕТ: ОНЗИ, КОЙТО ТЕ ГЛЕДА В ОТГОВОР","Котки с лица от древни изображения, Тамара от Хургада, костенурки, делфини след „нощната смяна“, неонови риби и Cleomoray — подводната позната на един египетски инструктор по гмуркане.",
"Има Египет на пирамидите.","Има Египет на хотелите и плажовете.","А има и друг.","Той се крие под шезлонг, седи на клон до магазин, бавно дъвче зелени листа, стрелка се между коралите и понякога наднича от цепнатина в рифа с изражение, което подсказва, че прекрасно знае: дошъл си точно заради него.","Това е живият Египет.","Този Египет изследва P&D.","Не колекция от животни в енциклопедия, а необикновен свят от създания, които живеят редом с хората — по улиците, на плажовете и под повърхността на Червено море.","И колкото по-дълго ги наблюдаваш, толкова по-силно е усещането:","тук хората далеч не са единствените главни герои.",
"ПЪРВО СЕ ПОЯВЯВАТ КОТКИТЕ","В горещия обед Египет сякаш забавя ход.","Въздухът трепти над нагрятата земя.","Пясъкът е горещ.","Белите стени почти заслепяват.","В далечината морето блести в невероятни нюанси на синьото.","А някъде, в прохладна ивица сянка, винаги има котка.","Египетските котки умеят да избират най-добрите места.","Под масата.","Под шезлонга.","До магазина.","На плажа.","А понякога — точно там, откъдето човек е решил да мине.","Някои запазват царствена дистанция.","Други се приближават толкова, че вместо портрет получаваш снимка на един огромен котешки нос.","Докато разглеждаше нашите снимки, P&D забеляза нещо удивително.","Изглеждат познати.","Стройно тяло.","Дълги крака.","Големи уши.","Тясно лице.","Бадемовидни очи.","Някои имат изразителни тъмни линии около очите, сякаш са очертани с древноегипетски кол.","Къде сме виждали тези силуети?","Разбира се.","В изображенията на Древен Египет.","В статуетките.","В музеите.","В изкуство на хиляди години.",
"3000 ГОДИНИ. СЪЩОТО ОТНОШЕНИЕ.","Няма да ви разказваме красива интернет легенда, че конкретната котка под нашия плажен шезлонг е пряк потомък на любимката на фараон.","Науката не работи така.","Но истината се оказва не по-малко интересна.","Изследванията на древна ДНК показват, че египетската популация от котки действително е изиграла важна роля за разпространението на домашните котки в древния свят. Египетската генетична линия се разпространява особено широко през класическата античност.","А котките наистина са заемали особено място в древноегипетската култура.","Затова една днешна среща понякога изглежда почти невероятна.","Годината е 2026.","Плаж.","Червено море.","Стройна котка излиза изпод шезлонга.","Спира.","Вдига глава.","Гледа право в обектива.","И за секунда разстоянието между днешния Египет и Египет отпреди няколко хиляди години сякаш изчезва.","Същият профил.","Същият поглед.","И може би същата абсолютна убеденост, че човекът тук е обслужващият персонал.",
"🐈 МАЛКАТА ТАЙНА НА P&D","Ако искате да снимате египетска котка — опитайте да не я следвате.","Клекнете.","Свалете телефона по-ниско.","И изчакайте.","Котешкото любопитство понякога върши цялата работа на фотографа.","А съдейки по снимките ни, някои местни модели намират обектива за изключително интересен предмет.",
"💛 А В ХУРГАДА ЖИВЕЕ ТАМАРА","Сред всички герои на тази история има един, когото не можеш да объркаш с никого.","Яркожълт.","Мъничък.","Общителен.","И напълно уверен в себе си.","Тамара.","Тя живее с други вълнисти папагалчета в един от магазините на Хургада.","Вечер градът се променя.","Дневната жега отслабва.","Светват цветните табели.","От отворените магазини се носят аромати на масла и ориенталски парфюми.","Някъде мирише на подправки и кафе.","Другаде — на плодове.","Във въздуха се смесват лекият сладникав дим на наргилето, топлината на нагретия от слънцето камък и соленият дъх на морето.","А в средата на тази египетска вечерна симфония седи Тамара.","Всичко ѝ е удобно.","Човешка ръка — става.","Рамо — отлично.","Глава — направо VIP ложа.","Съдейки по снимките, въпросът кой кого е дошъл да види остава отворен.","Ние дойдохме да видим Тамара.","Тамара явно дойде да види нас.",
"ПРИСЪДАТА НА P&D:","Длъжност: неизвестна.","Месторабота: магазин в Хургада.","Специалност: връзки с обществеността.","Ниво на самоувереност: изпълнителен директор.",
"🐢 ПОСЛЕ ВРЕМЕТО СПИРА","От папагал, който за секунди каца на главата ти — към създание, което няма никаква причина да бърза.","Костенурки.","Голяма.","Малка.","И съвсем мъничка.","Една се побира удобно в дланта и продължава да дъвче зелени листа, сякаш около нея нищо не се случва.","И тук разбираш колко различно животните възприемат света.","Човекът вече е направил десет снимки.","Проверил е съобщенията си.","Помислил е накъде да отиде после.","А костенурката още довършва първото си листо.","Може би затова край тях е толкова спокойно.",
"ЖИТЕЙСКИ СЪВЕТ ОТ P&D:","Понякога най-добрият египетски уелнес треньор тежи по-малко от килограм и носи собствения си дом на гърба.",
"🌊 А СЕГА — ПОД ВОДАТА","Тук започва съвсем друга фауна.","Няколко крачки през топлата вода.","Маска.","Вдишване.","Главата се потапя под повърхността.","И познатият Египет изчезва.","Няма аромат на подправки.","Няма гласове.","Няма наргиле.","Няма горещ въздух.","Остават само светлина, вода и цвят.",
"ДОБРЕ ДОШЛИ В ДРУГ ЕГИПЕТ.","Червено море е удивително прозрачно.","Слънчевите лъчи преминават през водата и пробягват по дъното.","А после започва истински взрив от цветове.","Тюркоазено.","Електриковосиньо.","Лимоненожълто.","Виолетово.","Оранжево.","Розово.","Сребристо.","Рибите преминават между коралите на цели облаци.","Някои приличат на бижута.","Други — на анимационни герои.","Трети изглеждат така, сякаш на дизайнер е било позволено да използва всички цветове наведнъж.","И изведнъж разбираш:","Египет изобщо няма нужда от филтър.",
"🐠 ПОДВОДЕН МЕГАПОЛИС","Червено море е повече от красиво място за гмуркане с шнорхел.","То е огромен жив свят.","В египетските му води живеят над хиляда вида риби и стотици видове корали.","Някои видове са характерни именно за този регион.","Затова два съседни участъка от рифа могат да изглеждат като два съвсем различни квартала на един град.","Само че тук вместо автомобили има пасажи риби.","Вместо къщи — корали.","А задръстванията са много по-красиви.",
"🪸 ЕТО ФАКТ, КОЙТО ОЩЕ ИЗНЕНАДВА МНОЗИНА","Коралът е животно.","Не растение.","Не необичаен подводен камък.","Животно.","Миниатюрните коралови полипи живеят в колонии и за огромни периоди създават структури, които се превръщат в цели рифове.","Така че фантастичната „градина“ под маската ви всъщност е огромен жив град.","В района на Рас Мохамед са регистрирани стотици разновидности на твърди и меки корали.","Но има и още по-удивителен факт.","Част от самия полуостров Рас Мохамед е изградена от древен вкаменен коралов риф, издигнал се преди десетки хиляди години.","Получава се почти невероятна картина:","под вас — жив риф.","а наблизо, над водата — следата на древен риф.","Египет умее да свързва миналото и настоящето дори под вода.",
"👑 А СЕГА СЕ ЗАПОЗНАЙТЕ С КРАЛИЦАТА","Всеки хубав квартал има местна знаменитост.","Нашият риф също.","P&D чу история от египетски инструктор по гмуркане, който прекарва много време под водата.","Когато турист гледа рифа, вижда много риби.","Когато един и същ човек се гмурка там редовно, нещата малко се променят.","Започва да разпознава местата.","Цепнатините.","Маршрутите.","А понякога — и отделни обитатели.","Нашият водолаз ни разказа за една мурена, която среща отново и отново.","Той я разпознава.","Тя се появява на познато място.","И с времето тези срещи са се превърнали в нещо като подводно познанство.","Може ли това да се нарече приятелство от гледна точка на самата мурена?","Не сме я питали.","Но P&D реши едно със сигурност:","такъв герой не може да остане без име.",
"CLEOMORAY 👑","Cleomoray — кралицата на рифа.","Дом: Червено море.","Резиденция: коралова цепнатина.","Гледка от прозореца: 10/10.","Дрескод: natural couture.","Характер: царствен.","Брой зъби: въпросът е признат за твърде личен.","Прием на посетители: изцяло според настроението на Нейно Величество.","Знаем как я нарича египетският водолаз.","Но нещо друго е много по-интересно:","как Cleomoray нарича него?","„Онзи човек с бутилката“?","„Пак е дошъл“?","Или наистина има собствено муренско име за него?","Може би някои египетски загадки е по-добре да оставим на Червено море.",
"🐬 ДЕЛФИНИ, КОИТО РАБОТЯТ НОЩЕМ","По-нататък в историята се появява един от любимите морски герои на човечеството.","Делфинът.","Но и тук има малка египетска тайна.","Близо до Марса Алам се намира рифът Самадай — прочутият Дом на делфините.","Там могат да се срещнат делфини от вида Stenella longirostris.","И те имат много интересен дневен режим.","Активни са и се хранят предимно нощем, а през деня използват защитената лагуна за почивка.","Тоест ситуацията изглежда приблизително така.","Туристът се събужда.","Закусва.","Облича банския.","Радостно обявява:","„Днес отиваме да видим делфини!“","А някъде в лагуната:","🐬","„Може ли по-тихо? Току-що приключихме нощната смяна.“",
"💙 НАЙ-ДОБРАТА СРЕЩА Е ТАЗИ, КОЯТО ЖИВОТНОТО ИЗБИРА","Затова P&D особено харесва един прост принцип при наблюдението на морски животни.","Не се опитвайте да режисирате идеалния момент.","Оставете го да се случи.","Ако делфин сам се приближи — вълшебно.","Ако риба мине пред камерата — снимайте.","Ако Cleomoray реши днес да остане у дома — кралицата има почивен ден.","Дивата природа е красива именно защото не следва графика на туриста.",
"🌴 А ЗНАЕТЕ ЛИ КАКВО ОЩЕ РАСТЕ КРАЙ ЧЕРВЕНО МОРЕ?","Мангрови дървета.","И това е един от контрастите, с които Египет непрекъснато ни изненадва.","Пустинни планини.","Пясък.","Синьо море.","Коралови рифове.","И изведнъж — зелени мангрови гъсталаци.","Например природната зона Набк край Шарм ел Шейх е известна със съчетанието от пустинен пейзаж, море, рифове и мангрови дървета.","И отново се оказва, че египетската фауна не съществува като отделни картини.","Всичко е свързано.","Брегът.","Растенията.","Рифът.","Рибите.","Птиците.","Сухоземните животни.","Морето.","Един огромен жив свят.",
"🦀 РАКЪТ ПРИСТИГНА НА РЕДАКЦИОННАТА СРЕЩА","Той вече е тук.","Срещнахме го на плажа Хула Хула.","И сега има собствено място в нашата история.","Защото след Тамара, плажните котки, костенурките, хилядите риби, делфините и Cleomoray вече е трудно да ни изненадат.","Макар че…","Това е Египет.","Сигурно ще успее.",
"✨ P&D WILD EGYPT — 7 ФАКТА, КОИТО СИ СТРУВА ДА ЗАПОМНИМ","01 — Коралите са животни.","Вашата „подводна градина“ наистина е жива.","02 — Червено море е невероятно богато на риби.","Тук се срещат над хиляда вида.","03 — Делфините също имат нужда от почивка.","В Самадай делфините Stenella longirostris използват лагуната като дневно убежище след нощната си активност.","04 — Египет е изиграл важна роля в историята на домашните котки.","Древната ДНК показва разпространението на египетската котешка линия далеч извън страната.","05 — Пустинята и мангровите гори могат да бъдат съседи.","Червено море събира пейзажи, които не бихте очаквали да видите един до друг.","06 — Най-добрият събеседник за необичайна история от рифа е опитен местен водолаз.","Вместо „Какво живее тук?“ опитайте да попитате:","„Кого познавате тук?“","07 — Най-интересното животно от пътуването не може да се резервира предварително.","Може би ще е делфин.","Може би — мурена.","Или пък — нахална плажна котка, решила, че телефонът ви е неин.",
"☀️ ЖИВИЯТ ЕГИПЕТ","Може би именно животните правят Египет толкова близък.","Защото свързват всичко.","Древността — с настоящето.","Пустинята — с морето.","Града — с природата.","Горещия ден — с топлата вечер.","Над водата въздухът мирише на подправки, масла, кафе, наргиле и морска сол.","Под водата ароматите изчезват — заменени от свръхярките цветове на коралите и рибите.","На плажа котка лежи в сянката с профил, познат от древноегипетското изкуство.","В Хургада Тамара се настанява върху нечия глава.","Костенурка довършва безкрайно важното си листо.","Делфините почиват след нощната си активност.","А някъде в коралова цепнатина седи Cleomoray.","Всичко това се случва едновременно.","Не в зоопарк.","Не в книга.","Не на екран.","Тук.","Под едно горещо египетско слънце.","И може би затова египетската фауна остава толкова ярко в паметта.","Не изглежда като отделна атракция.","Тя е вплетена в самия Египет.","В морето му.","В улиците му.","В историята му.","В цветовете му.","В топлината му.","И в онези малки случайни срещи, които някак остават с нас най-дълго.",
"🇪🇬 КОЙ ЖИВЕЕ ТУК? — ЕГИПЕТ","Не просто разглеждайте Египет.\nВижте кой ви гледа в отговор.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({el:{editorialUI:{
listen:"Ακούστε το άρθρο",stop:"Διακοπή",back:"Όλα τα άρθρα",previous:"Προηγούμενη φωτογραφία",next:"Επόμενη φωτογραφία",location:"King Tut Bazar · Χουργκάντα, Αίγυπτος",locationNote:"Η Tamara ζει σε ένα από τα μικρά μαγαζιά· απέναντι υπάρχουν χερσαίες χελώνες και γάτες.",crab:"Παραλία Hula Hula · Αίγυπτος",generated:"Cleomoray",unavailable:"Η εκφώνηση δεν είναι διαθέσιμη σε αυτό το πρόγραμμα περιήγησης.",fallback:"Η πλήρης μετάφραση στην επιλεγμένη γλώσσα ετοιμάζεται. Εμφανίζεται το αγγλικό άρθρο.",shortTitle:"Μια άλλη Αίγυπτος",bestWorker:"Ο καλύτερος υπάλληλος",source:"Πηγή",factsTitle:"Επτά γεγονότα για τη ζωντανή Αίγυπτο",mauTitle:"Αιγυπτιακή Μάου",mauText:"Η Μάου μπορεί να «τιτιβίζει» και να χαιρετά τους ανθρώπους της με απαλές, μελωδικές τρίλιες.",mauAlt:"Αιγυπτιακή Μάου σε ολόσωμη φωτογραφία",catAlt:"Γάτα ξεκουράζεται στον πάγκο ενός μαγαζιού στη Χουργκάντα",tamaraAlt:"Η Tamara κοιτάζει κατευθείαν στον φακό",dolphinsLabel:"Δελφίνια",crabHeading:"🦀 Ο κάβουρας ήρθε στη σύσκεψη της σύνταξης",crabOpening:["Είναι ήδη εδώ.","Τον συναντήσαμε στην παραλία Hula Hula.","Και τώρα έχει τη δική του θέση στην ιστορία μας."],
facts:[["Τα δελφίνια έχουν τη δική τους «περιποίηση δέρματος».","Κοντά στη Χουργκάντα τα δελφίνια τρίβονται πάνω σε ορισμένα κοράλλια και σπόγγους. Οι ερευνητές υποθέτουν ότι οι ουσίες τους μπορεί να βοηθούν στην περιποίηση του δέρματος."],["Οι χελώνες έχουν «φωτογραφικά διαβατήρια».","Στην αιγυπτιακή Ερυθρά Θάλασσα κάθε θαλάσσια χελώνα αναγνωρίζεται από το σχέδιο των φολίδων στο κεφάλι της. Έτσι καταγράφονται οι επαναλαμβανόμενες συναντήσεις."],["Τα δελφίνια αναγνωρίζονται από το πτερύγιό τους.","Ουλές και εγκοπές στο ραχιαίο πτερύγιο βοηθούν τους ερευνητές της Χουργκάντα να ξεχωρίζουν τα δελφίνια χωρίς να τους τοποθετούν ετικέτες."],["Στη θάλασσα υπάρχουν λιβάδια για τις θαλάσσιες αγελάδες.","Τα ντουγκόνγκ τρέφονται με θαλάσσια αγγειόσπερμα. Ο κόλπος Abu Dabbab έχει εκτεταμένα υποβρύχια λιβάδια που προσφέρουν κατάλληλο περιβάλλον σε αυτά τα ζώα."],["Οι δύτες μπορούν να βοηθούν στη μελέτη των χελωνών.","Το TurtleWatch συλλέγει παρατηρήσεις από δύτες και κολυμβητές με αναπνευστήρα, ώστε να χαρτογραφηθεί καλύτερα η παρουσία θαλάσσιων χελωνών."],["Μπορείτε να υποστηρίξετε ένα ζώο από απόσταση.","Το αιγυπτιακό καταφύγιο S.P.A.R.E. προσφέρει τη δυνατότητα υποστήριξης γατών, σκύλων και γαϊδουριών, ακόμη κι αν δεν μπορείτε να τα πάρετε σπίτι."],["Η Αιγυπτιακή Μάου μπορεί να «τιτιβίζει».","Αυτές οι στικτές οικόσιτες γάτες μπορούν να χαιρετούν τους ανθρώπους τους με απαλές, μελωδικές τρίλιες και ήχους που μοιάζουν με τιτίβισμα."]]
},text:[
"🇪🇬 ΜΙΑ ΑΛΛΗ ΑΙΓΥΠΤΟΣ: ΕΚΕΙΝΗ ΠΟΥ ΣΕ ΚΟΙΤΑΖΕΙ ΚΙ ΑΥΤΗ","Γάτες με πρόσωπα από αρχαίες απεικονίσεις, η Tamara από τη Χουργκάντα, χελώνες, δελφίνια μετά τη «νυχτερινή βάρδια», ψάρια σε χρώματα νέον και η Cleomoray — η υποβρύχια γνωστή ενός Αιγύπτιου εκπαιδευτή καταδύσεων.",
"Υπάρχει η Αίγυπτος των πυραμίδων.","Υπάρχει η Αίγυπτος των ξενοδοχείων και των παραλιών.","Και υπάρχει και μια άλλη.","Κρύβεται κάτω από μια ξαπλώστρα, κάθεται σε ένα κλαδί δίπλα σε ένα μαγαζί, μασά αργά πράσινα φύλλα, γλιστρά ανάμεσα στα κοράλλια και μερικές φορές ξεπροβάλλει από μια σχισμή του υφάλου με μια έκφραση που δείχνει ότι ξέρει πολύ καλά πως ήρθες μόνο για να τη δεις.","Αυτή είναι η ζωντανή Αίγυπτος.","Αυτή την Αίγυπτο εξερευνά το P&D.","Όχι μια συλλογή ζώων σε εγκυκλοπαίδεια, αλλά έναν ξεχωριστό κόσμο πλασμάτων που ζουν δίπλα στους ανθρώπους — στους δρόμους, στις παραλίες και κάτω από την επιφάνεια της Ερυθράς Θάλασσας.","Και όσο περισσότερο τα παρατηρείς, τόσο πιο έντονη γίνεται η αίσθηση:","εδώ οι άνθρωποι κάθε άλλο παρά οι μοναδικοί πρωταγωνιστές είναι.",
"ΠΡΩΤΑ ΕΜΦΑΝΙΖΟΝΤΑΙ ΟΙ ΓΑΤΕΣ","Το καυτό μεσημέρι η Αίγυπτος μοιάζει να επιβραδύνει.","Ο αέρας τρεμοπαίζει πάνω από το ζεστό έδαφος.","Η άμμος καίει.","Οι λευκοί τοίχοι σχεδόν σε τυφλώνουν.","Στο βάθος η θάλασσα λάμπει σε απίστευτες αποχρώσεις του μπλε.","Και κάπου, σε μια δροσερή λωρίδα σκιάς, υπάρχει πάντα μια γάτα.","Οι αιγυπτιακές γάτες ξέρουν να διαλέγουν τα καλύτερα σημεία.","Κάτω από το τραπέζι.","Κάτω από την ξαπλώστρα.","Δίπλα στο μαγαζί.","Στην παραλία.","Και μερικές φορές — ακριβώς εκεί όπου κάποιος ετοιμαζόταν να περάσει.","Κάποιες κρατούν βασιλική απόσταση.","Άλλες πλησιάζουν τόσο πολύ, που αντί για πορτρέτο βγάζεις μια φωτογραφία μιας τεράστιας γατίσιας μύτης.","Κοιτάζοντας τις φωτογραφίες μας, το P&D παρατήρησε κάτι εντυπωσιακό.","Μοιάζουν γνώριμες.","Λεπτό σώμα.","Μακριά πόδια.","Μεγάλα αυτιά.","Στενό πρόσωπο.","Αμυγδαλωτά μάτια.","Κάποιες έχουν εκφραστικές σκούρες γραμμές γύρω από τα μάτια, σαν να έχουν σχεδιαστεί με αρχαίο αιγυπτιακό κολ.","Πού έχουμε ξαναδεί αυτές τις μορφές;","Μα φυσικά.","Στις απεικονίσεις της Αρχαίας Αιγύπτου.","Σε αγαλματίδια.","Σε μουσεία.","Σε έργα τέχνης χιλιάδων ετών.",
"3.000 ΧΡΟΝΙΑ. Η ΙΔΙΑ ΣΤΑΣΗ.","Δεν θα σας πούμε έναν όμορφο διαδικτυακό μύθο ότι η συγκεκριμένη γάτα κάτω από την ξαπλώστρα μας είναι άμεση απόγονος της αγαπημένης γάτας ενός φαραώ.","Η επιστήμη δεν λειτουργεί έτσι.","Όμως η αλήθεια αποδεικνύεται εξίσου ενδιαφέρουσα.","Μελέτες αρχαίου DNA δείχνουν ότι ο πληθυσμός γατών της Αιγύπτου έπαιξε πράγματι σημαντικό ρόλο στην εξάπλωση των οικόσιτων γατών στον αρχαίο κόσμο. Η αιγυπτιακή γενετική γραμμή εξαπλώθηκε ιδιαίτερα κατά την κλασική αρχαιότητα.","Και οι γάτες είχαν πραγματικά ξεχωριστή θέση στον αρχαίο αιγυπτιακό πολιτισμό.","Γι’ αυτό μια σημερινή συνάντηση μπορεί μερικές φορές να μοιάζει σχεδόν απίστευτη.","Είναι το 2026.","Μια παραλία.","Η Ερυθρά Θάλασσα.","Μια λεπτή γάτα βγαίνει κάτω από μια ξαπλώστρα.","Σταματά.","Σηκώνει το κεφάλι.","Κοιτάζει κατευθείαν στον φακό.","Και για ένα δευτερόλεπτο η απόσταση ανάμεσα στη σημερινή Αίγυπτο και στην Αίγυπτο πριν από χιλιάδες χρόνια μοιάζει να χάνεται.","Το ίδιο προφίλ.","Το ίδιο βλέμμα.","Και ίσως η ίδια απόλυτη βεβαιότητα ότι εδώ οι άνθρωποι είναι το προσωπικό εξυπηρέτησης.",
"🐈 ΤΟ ΜΙΚΡΟ ΜΥΣΤΙΚΟ ΤΟΥ P&D","Αν θέλετε να φωτογραφίσετε μια αιγυπτιακή γάτα — δοκιμάστε να μην την ακολουθείτε.","Καθίστε χαμηλά.","Χαμηλώστε το κινητό.","Και περιμένετε.","Η γατίσια περιέργεια κάνει μερικές φορές όλη τη δουλειά του φωτογράφου.","Και από τις φωτογραφίες μας φαίνεται πως κάποια τοπικά μοντέλα βρίσκουν τον φακό εξαιρετικά ενδιαφέρον αντικείμενο.",
"💛 ΚΑΙ ΣΤΗ ΧΟΥΡΓΚΑΝΤΑ ΖΕΙ Η TAMARA","Ανάμεσα σε όλους τους ήρωες αυτής της ιστορίας υπάρχει ένας που δεν μπορείς να μπερδέψεις με κανέναν.","Κατακίτρινος.","Μικροσκοπικός.","Κοινωνικός.","Και απολύτως σίγουρος για τον εαυτό του.","Η Tamara.","Ζει μαζί με άλλα μπάτζι σε ένα από τα μαγαζιά της Χουργκάντα.","Το βράδυ η πόλη αλλάζει.","Η ζέστη της ημέρας υποχωρεί.","Ανάβουν οι πολύχρωμες επιγραφές.","Από τα ανοιχτά μαγαζιά έρχονται αρώματα ελαίων και ανατολίτικων αρωμάτων.","Κάπου μυρίζει μπαχαρικά και καφέ.","Αλλού — φρούτα.","Στον αέρα αναμειγνύονται ο ελαφρύς, γλυκός καπνός του ναργιλέ, η ζεστασιά της ηλιοθερμασμένης πέτρας και η αλμυρή ανάσα της θάλασσας.","Και στο κέντρο αυτής της αιγυπτιακής βραδινής συμφωνίας κάθεται η Tamara.","Όλα της ταιριάζουν.","Ένα ανθρώπινο χέρι — κατάλληλο.","Ένας ώμος — εξαιρετικός.","Ένα κεφάλι — σχεδόν θεωρείο VIP.","Κρίνοντας από τις φωτογραφίες, το ερώτημα ποιος ήρθε να δει ποιον παραμένει ανοιχτό.","Εμείς ήρθαμε να δούμε την Tamara.","Η Tamara ήρθε ξεκάθαρα να δει εμάς.",
"Η ΕΤΥΜΗΓΟΡΙΑ ΤΟΥ P&D:","Θέση: άγνωστη.","Χώρος εργασίας: ένα μαγαζί στη Χουργκάντα.","Ειδικότητα: δημόσιες σχέσεις.","Επίπεδο αυτοπεποίθησης: διευθύνουσα σύμβουλος.",
"🐢 ΥΣΤΕΡΑ Ο ΧΡΟΝΟΣ ΣΤΑΜΑΤΑ","Από έναν παπαγάλο που προσγειώνεται στο κεφάλι σου σε δευτερόλεπτα — σε ένα πλάσμα που δεν έχει κανέναν λόγο να βιάζεται.","Χελώνες.","Μια μεγάλη.","Μια μικρή.","Και μια πραγματικά μικροσκοπική.","Μία χωρά άνετα στην παλάμη και συνεχίζει να μασά πράσινα φύλλα σαν να μη συμβαίνει τίποτα γύρω της.","Και τότε καταλαβαίνεις πόσο διαφορετικά βιώνουν τα ζώα τον κόσμο.","Ο άνθρωπος έχει ήδη βγάλει δέκα φωτογραφίες.","Έχει ελέγξει τα μηνύματά του.","Έχει σκεφτεί πού θα πάει μετά.","Και η χελώνα ακόμη τελειώνει το πρώτο της φύλλο.","Ίσως γι’ αυτό νιώθεις τόση ηρεμία κοντά τους.",
"ΣΥΜΒΟΥΛΗ ΖΩΗΣ ΑΠΟ ΤΟ P&D:","Μερικές φορές ο καλύτερος Αιγύπτιος σύμβουλος ευεξίας ζυγίζει λιγότερο από ένα κιλό και κουβαλά το σπίτι του στην πλάτη.",
"🌊 ΚΑΙ ΤΩΡΑ — ΚΑΤΩ ΑΠΟ ΤΟ ΝΕΡΟ","Εδώ ξεκινά μια εντελώς διαφορετική πανίδα.","Λίγα βήματα μέσα στο ζεστό νερό.","Μια μάσκα.","Μια ανάσα.","Το κεφάλι περνά κάτω από την επιφάνεια.","Και η γνώριμη Αίγυπτος εξαφανίζεται.","Χωρίς μυρωδιά μπαχαρικών.","Χωρίς φωνές.","Χωρίς ναργιλέ.","Χωρίς καυτό αέρα.","Μένουν μόνο φως, νερό και χρώμα.",
"ΚΑΛΩΣ ΗΡΘΑΤΕ ΣΕ ΜΙΑ ΑΛΛΗ ΑΙΓΥΠΤΟ.","Η Ερυθρά Θάλασσα είναι εκπληκτικά διαυγής.","Οι ακτίνες του ήλιου περνούν μέσα από το νερό και τρέχουν πάνω στον βυθό.","Και έπειτα αρχίζει μια πραγματική έκρηξη χρωμάτων.","Τιρκουάζ.","Μπλε ελεκτρίκ.","Κίτρινο λεμονιού.","Μοβ.","Πορτοκαλί.","Ροζ.","Ασημί.","Τα ψάρια κινούνται ανάμεσα στα κοράλλια σαν ολόκληρα σύννεφα.","Κάποια μοιάζουν με κοσμήματα.","Άλλα — με ήρωες κινουμένων σχεδίων.","Άλλα μοιάζουν σαν να επιτράπηκε σε έναν σχεδιαστή να χρησιμοποιήσει όλα τα χρώματα μαζί.","Και ξαφνικά συνειδητοποιείς:","η Αίγυπτος δεν χρειάζεται κανένα φίλτρο.",
"🐠 ΜΙΑ ΥΠΟΒΡΥΧΙΑ ΜΗΤΡΟΠΟΛΗ","Η Ερυθρά Θάλασσα δεν είναι μόνο ένα όμορφο μέρος για κολύμβηση με αναπνευστήρα.","Είναι ένας τεράστιος ζωντανός κόσμος.","Στα αιγυπτιακά νερά της ζουν πάνω από χίλια είδη ψαριών και εκατοντάδες είδη κοραλλιών.","Κάποια είδη είναι χαρακτηριστικά αυτής της περιοχής.","Γι’ αυτό δύο γειτονικά τμήματα υφάλου μπορεί να μοιάζουν με δύο εντελώς διαφορετικές συνοικίες της ίδιας πόλης.","Μόνο που εδώ τα κοπάδια ψαριών αντικαθιστούν τα αυτοκίνητα.","Τα κοράλλια αντικαθιστούν τα σπίτια.","Και το μποτιλιάρισμα είναι πολύ πιο όμορφο.",
"🪸 ΕΝΑ ΓΕΓΟΝΟΣ ΠΟΥ ΑΚΟΜΗ ΕΚΠΛΗΣΣΕΙ ΠΟΛΛΟΥΣ","Το κοράλλι είναι ζώο.","Όχι φυτό.","Όχι μια παράξενη υποβρύχια πέτρα.","Ζώο.","Οι μικροσκοπικοί πολύποδες των κοραλλιών ζουν σε αποικίες και, σε τεράστια χρονικά διαστήματα, δημιουργούν δομές που γίνονται ολόκληροι ύφαλοι.","Έτσι ο φανταστικός «κήπος» κάτω από τη μάσκα σου είναι στην πραγματικότητα μια τεράστια ζωντανή πόλη.","Γύρω από το Ρας Μοχάμεντ έχουν καταγραφεί εκατοντάδες ποικιλίες σκληρών και μαλακών κοραλλιών.","Αλλά υπάρχει ένα ακόμη πιο εκπληκτικό γεγονός.","Μέρος της ίδιας της χερσονήσου Ρας Μοχάμεντ αποτελείται από έναν αρχαίο απολιθωμένο κοραλλιογενή ύφαλο που ανυψώθηκε πριν από δεκάδες χιλιάδες χρόνια.","Δημιουργείται μια σχεδόν απίστευτη εικόνα:","κάτω σου — ένας ζωντανός ύφαλος.","και κοντά, πάνω από το νερό — το ίχνος ενός αρχαίου υφάλου.","Η Αίγυπτος ξέρει να συνδέει το παρελθόν με το παρόν ακόμη και κάτω από το νερό.",
"👑 ΤΩΡΑ ΓΝΩΡΙΣΤΕ ΤΗ ΒΑΣΙΛΙΣΣΑ","Κάθε καλή γειτονιά έχει μια τοπική διασημότητα.","Ο ύφαλός μας έχει κι αυτός.","Το P&D άκουσε μια ιστορία από έναν Αιγύπτιο εκπαιδευτή καταδύσεων που περνά πολύ χρόνο κάτω από το νερό.","Όταν ένας τουρίστας κοιτάζει έναν ύφαλο, βλέπει πολλά ψάρια.","Όταν ο ίδιος άνθρωπος καταδύεται εκεί συχνά, τα πράγματα αλλάζουν λίγο.","Αρχίζει να αναγνωρίζει τα μέρη.","Τις σχισμές.","Τις διαδρομές.","Και μερικές φορές — συγκεκριμένους κατοίκους.","Ο δύτης μας μίλησε για μια σμέρνα που συναντά ξανά και ξανά.","Την αναγνωρίζει.","Εκείνη εμφανίζεται σε ένα γνώριμο σημείο.","Και με τον καιρό αυτές οι συναντήσεις έγιναν κάτι σαν υποβρύχια γνωριμία.","Μπορούμε να το ονομάσουμε φιλία από την οπτική της ίδιας της σμέρνας;","Δεν τη ρωτήσαμε.","Αλλά το P&D αποφάσισε κάτι με βεβαιότητα:","ένας τέτοιος χαρακτήρας δεν μπορεί να μείνει χωρίς όνομα.",
"CLEOMORAY 👑","Η Cleomoray — βασίλισσα του υφάλου.","Σπίτι: η Ερυθρά Θάλασσα.","Κατοικία: μια σχισμή στα κοράλλια.","Θέα από το παράθυρο: 10/10.","Ενδυματολογικός κώδικας: natural couture.","Χαρακτήρας: βασιλικός.","Αριθμός δοντιών: η ερώτηση κρίθηκε υπερβολικά προσωπική.","Υποδοχή επισκεπτών: αποκλειστικά ανάλογα με τη διάθεση της Αυτού Μεγαλειότητας.","Ξέρουμε πώς την αποκαλεί ο Αιγύπτιος δύτης.","Αλλά κάτι άλλο είναι πολύ πιο ενδιαφέρον:","πώς αποκαλεί η Cleomoray εκείνον;","«Εκείνος ο άνθρωπος με τη φιάλη»;","«Πάλι ήρθε»;","Ή μήπως έχει πραγματικά το δικό της όνομα γι’ αυτόν, στη γλώσσα των σμερνών;","Ίσως κάποια αιγυπτιακά μυστήρια είναι καλύτερο να τα αφήσουμε στην Ερυθρά Θάλασσα.",
"🐬 ΔΕΛΦΙΝΙΑ ΠΟΥ ΔΟΥΛΕΥΟΥΝ ΤΗ ΝΥΧΤΑ","Πιο βαθιά στην ιστορία εμφανίζεται ένας από τους αγαπημένους θαλάσσιους ήρωες της ανθρωπότητας.","Το δελφίνι.","Αλλά κι εδώ υπάρχει ένα μικρό αιγυπτιακό μυστικό.","Κοντά στη Μάρσα Άλαμ βρίσκεται ο ύφαλος Σαμαντάι — το διάσημο Σπίτι των Δελφινιών.","Εκεί συναντά κανείς δελφίνια του είδους Stenella longirostris.","Και έχουν ένα πολύ ενδιαφέρον ημερήσιο πρόγραμμα.","Είναι δραστήρια και τρέφονται κυρίως τη νύχτα, ενώ χρησιμοποιούν την προστατευμένη λιμνοθάλασσα για να ξεκουράζονται την ημέρα.","Οπότε η κατάσταση είναι περίπου έτσι.","Ο τουρίστας ξυπνά.","Τρώει πρωινό.","Φορά το μαγιό του.","Ανακοινώνει χαρούμενος:","«Σήμερα θα πάμε να δούμε δελφίνια!»","Και κάπου στη λιμνοθάλασσα:","🐬","«Μπορείτε λίγο πιο σιγά; Μόλις τελειώσαμε τη νυχτερινή βάρδια.»",
"💙 Η ΚΑΛΥΤΕΡΗ ΣΥΝΑΝΤΗΣΗ ΕΙΝΑΙ ΕΚΕΙΝΗ ΠΟΥ ΕΠΙΛΕΓΕΙ ΤΟ ΖΩΟ","Γι’ αυτό το P&D αγαπά ιδιαίτερα μια απλή αρχή για την παρατήρηση θαλάσσιων ζώων.","Μην προσπαθείτε να σκηνοθετήσετε την τέλεια στιγμή.","Αφήστε τη να συμβεί.","Αν ένα δελφίνι πλησιάσει μόνο του — είναι μαγικό.","Αν ένα ψάρι περάσει μπροστά από την κάμερα — φωτογραφίστε το.","Αν η Cleomoray αποφασίσει σήμερα να μείνει σπίτι — η βασίλισσα έχει ρεπό.","Η άγρια φύση είναι όμορφη ακριβώς επειδή δεν ακολουθεί το πρόγραμμα του τουρίστα.",
"🌴 ΞΕΡΕΤΕ ΤΙ ΑΛΛΟ ΦΥΤΡΩΝΕΙ ΔΙΠΛΑ ΣΤΗΝ ΕΡΥΘΡΑ ΘΑΛΑΣΣΑ;","Μαγκρόβια.","Και αυτή είναι μία από τις αντιθέσεις με τις οποίες η Αίγυπτος μάς εκπλήσσει συνεχώς.","Βουνά της ερήμου.","Άμμος.","Γαλάζια θάλασσα.","Κοραλλιογενείς ύφαλοι.","Και ξαφνικά — πράσινες συστάδες μαγκρόβιων.","Για παράδειγμα, η φυσική περιοχή Ναμπκ κοντά στο Σαρμ ελ Σέιχ είναι γνωστή για τον συνδυασμό ερήμου, θάλασσας, υφάλων και μαγκρόβιων.","Και για άλλη μια φορά αποδεικνύεται ότι η πανίδα της Αιγύπτου δεν υπάρχει σε χωριστές εικόνες.","Όλα συνδέονται.","Η ακτή.","Τα φυτά.","Ο ύφαλος.","Τα ψάρια.","Τα πουλιά.","Τα ζώα της στεριάς.","Η θάλασσα.","Ένας τεράστιος ζωντανός κόσμος.",
"🦀 Ο ΚΑΒΟΥΡΑΣ ΗΡΘΕ ΣΤΗ ΣΥΣΚΕΨΗ ΤΗΣ ΣΥΝΤΑΞΗΣ","Είναι ήδη εδώ.","Τον συναντήσαμε στην παραλία Hula Hula.","Και τώρα έχει τη δική του θέση στην ιστορία μας.","Γιατί μετά την Tamara, τις γάτες της παραλίας, τις χελώνες, τα χιλιάδες ψάρια, τα δελφίνια και την Cleomoray, είναι πια δύσκολο να μας εκπλήξει κανείς.","Αν και…","Αυτή είναι η Αίγυπτος.","Μάλλον θα τα καταφέρει.",
"✨ P&D WILD EGYPT — 7 ΓΕΓΟΝΟΤΑ ΠΟΥ ΑΞΙΖΕΙ ΝΑ ΘΥΜΑΣΤΕ","01 — Τα κοράλλια είναι ζώα.","Ο «υποβρύχιος κήπος» σας είναι πραγματικά ζωντανός.","02 — Η Ερυθρά Θάλασσα είναι εξαιρετικά πλούσια σε ψάρια.","Εδώ συναντώνται πάνω από χίλια είδη.","03 — Και τα δελφίνια χρειάζονται ξεκούραση.","Στο Σαμαντάι τα δελφίνια Stenella longirostris χρησιμοποιούν τη λιμνοθάλασσα ως ημερήσιο καταφύγιο μετά τη νυχτερινή δραστηριότητά τους.","04 — Η Αίγυπτος έπαιξε σημαντικό ρόλο στην ιστορία των οικόσιτων γατών.","Το αρχαίο DNA δείχνει την εξάπλωση της αιγυπτιακής γενετικής γραμμής γατών πολύ πέρα από τα σύνορα της χώρας.","05 — Η έρημος και τα μαγκρόβια μπορούν να είναι γείτονες.","Η Ερυθρά Θάλασσα συνδέει τοπία που δεν θα περιμένατε να δείτε δίπλα δίπλα.","06 — Για μια ασυνήθιστη ιστορία του υφάλου, ο καλύτερος συνομιλητής είναι ένας έμπειρος ντόπιος δύτης.","Αντί για «Τι ζει εδώ;», δοκιμάστε να ρωτήσετε:","«Ποιον γνωρίζετε εδώ;»","07 — Δεν μπορείς να κλείσεις εκ των προτέρων το πιο ενδιαφέρον ζώο του ταξιδιού σου.","Ίσως να είναι ένα δελφίνι.","Ίσως — μια σμέρνα.","Ή ίσως — μια θρασύτατη γάτα της παραλίας που αποφασίζει ότι το κινητό σου της ανήκει.",
"☀️ Η ΖΩΝΤΑΝΗ ΑΙΓΥΠΤΟΣ","Ίσως τα ζώα είναι αυτά που μας κάνουν να νιώθουμε την Αίγυπτο ιδιαίτερα κοντά μας.","Επειδή συνδέουν τα πάντα.","Την αρχαιότητα — με το παρόν.","Την έρημο — με τη θάλασσα.","Την πόλη — με τη φύση.","Την καυτή ημέρα — με το ζεστό βράδυ.","Πάνω από το νερό ο αέρας μυρίζει μπαχαρικά, έλαια, καφέ, ναργιλέ και θαλασσινό αλάτι.","Κάτω από το νερό οι μυρωδιές χάνονται — και αντικαθίστανται από τα έντονα χρώματα των κοραλλιών και των ψαριών.","Στην παραλία μια γάτα ξαπλώνει στη σκιά με προφίλ γνώριμο από την αρχαία αιγυπτιακή τέχνη.","Στη Χουργκάντα η Tamara κάθεται στο κεφάλι κάποιου.","Μια χελώνα τελειώνει το ατελείωτα σημαντικό φύλλο της.","Τα δελφίνια ξεκουράζονται μετά τη νυχτερινή δραστηριότητά τους.","Και κάπου σε μια σχισμή των κοραλλιών κάθεται η Cleomoray.","Όλα αυτά συμβαίνουν ταυτόχρονα.","Όχι σε ζωολογικό κήπο.","Όχι σε βιβλίο.","Όχι σε οθόνη.","Εδώ.","Κάτω από τον ίδιο καυτό αιγυπτιακό ήλιο.","Και ίσως γι’ αυτό η πανίδα της Αιγύπτου μένει τόσο έντονα στη μνήμη.","Δεν μοιάζει με ξεχωριστό αξιοθέατο.","Είναι συνυφασμένη με την ίδια την Αίγυπτο.","Με τη θάλασσά της.","Με τους δρόμους της.","Με την ιστορία της.","Με τα χρώματά της.","Με τη ζεστασιά της.","Και με εκείνες τις μικρές τυχαίες συναντήσεις που, με κάποιον τρόπο, μένουν μαζί μας περισσότερο.",
"🇪🇬 ΠΟΙΟΣ ΖΕΙ ΕΔΩ; — ΑΙΓΥΠΤΟΣ","Μην κοιτάξετε μόνο την Αίγυπτο.\nΔείτε ποιος σας κοιτάζει κι αυτός.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({sv:{editorialUI:{
listen:"Lyssna på artikeln",stop:"Stoppa",back:"Alla artiklar",previous:"Föregående bild",next:"Nästa bild",location:"King Tut Bazar · Hurghada, Egypten",locationNote:"Tamara bor i en av de små butikerna; mittemot finns landsköldpaddor och katter.",crab:"Hula Hula-stranden · Egypten",generated:"Cleomoray",unavailable:"Uppläsning är inte tillgänglig i den här webbläsaren.",fallback:"Den fullständiga översättningen till ditt valda språk förbereds. Den engelska artikeln visas.",shortTitle:"Ett annat Egypten",bestWorker:"Bästa medarbetaren",source:"Källa",factsTitle:"Sju fakta om det levande Egypten",mauTitle:"Egyptisk mau",mauText:"Mau kan ”kvittra” och hälsa på sina människor med mjuka, melodiska drillar.",mauAlt:"Egyptisk mau i helfigur",catAlt:"En katt vilar på disken i en butik i Hurghada",tamaraAlt:"Tamara tittar rakt in i objektivet",dolphinsLabel:"Delfiner",crabHeading:"🦀 Krabban har kommit till redaktionsmötet",crabOpening:["Han är redan här.","Vi mötte honom på Hula Hula-stranden.","Och nu har han en egen plats i vår berättelse."],
facts:[["Delfiner har sin egen ”hudvård”.","Nära Hurghada gnider sig delfiner mot vissa koraller och svampdjur. Forskarna föreslår att ämnen från dem kan bidra till hudvård."],["Sköldpaddor har ”fotopass”.","I det egyptiska Röda havet identifieras enskilda havssköldpaddor med hjälp av fjällmönstret på huvudet. På så sätt kan återkommande möten dokumenteras."],["Delfiner känns igen på fenan.","Ärr och hack i ryggfenan hjälper forskare i Hurghada att skilja enskilda delfiner åt utan att fästa märken på dem."],["Havet har betesmarker för sjökor.","Dugonger äter sjögräs. Abu Dabbab-viken har stora undervattensängar som erbjuder en lämplig livsmiljö för dessa djur."],["Dykare kan hjälpa till att studera sköldpaddor.","TurtleWatch samlar observationer från dykare och snorklare för att bättre kartlägga var havssköldpaddor förekommer."],["Du kan stödja ett djur på avstånd.","Det egyptiska djurhemmet S.P.A.R.E. erbjuder möjligheten att stödja katter, hundar och åsnor även om du inte kan ta hem dem."],["Egyptisk mau kan ”kvittra”.","Dessa fläckiga tamkatter kan hälsa på sina människor med mjuka, melodiska drillar och kvittrande ljud."]]
},text:[
"🇪🇬 ETT ANNAT EGYPTEN: DET SOM TITTAR TILLBAKA PÅ DIG","Katter med ansikten från antika avbildningar, Tamara från Hurghada, landsköldpaddor, delfiner efter ”nattskiftet”, neonfärgade fiskar och Cleomoray — en egyptisk dykinstruktörs bekantskap under vattnet.",
"Det finns pyramidernas Egypten.","Det finns hotellens och strändernas Egypten.","Och så finns det ett annat.","Det gömmer sig under en solstol, sitter på en gren bredvid en butik, tuggar långsamt på gröna blad, far mellan koraller och tittar ibland fram ur en revspricka med ett uttryck som säger att det vet precis att du kom bara för att se det.","Det här är det levande Egypten.","Det är detta Egypten som P&D utforskar.","Inte en samling djur i ett uppslagsverk, utan en märkvärdig värld av varelser som lever sida vid sida med människor — på gatorna, på stränderna och under Röda havets yta.","Och ju längre du betraktar dem, desto starkare blir känslan:","här är människorna långt ifrån de enda huvudpersonerna.",
"FÖRST DYKER KATTERNA UPP","Vid den heta middagstimmen verkar Egypten sakta ner.","Luften dallrar över den uppvärmda marken.","Sanden är het.","De vita väggarna är nästan bländande.","I fjärran glittrar havet i osannolika nyanser av blått.","Och någonstans, i en sval strimma skugga, finns alltid en katt.","Egyptiska katter vet hur man väljer de bästa platserna.","Under ett bord.","Under en solstol.","Bredvid en butik.","På stranden.","Och ibland — precis där en människa tänkte gå.","Vissa håller ett kungligt avstånd.","Andra kommer så nära att du får en bild av en enda enorm kattnos i stället för ett porträtt.","När P&D tittade på våra fotografier upptäckte vi något märkligt.","De känns bekanta.","En slank kropp.","Långa ben.","Stora öron.","Ett smalt ansikte.","Mandelformade ögon.","Vissa har uttrycksfulla mörka linjer runt ögonen, som om de tecknats med det forntida Egyptens kohl.","Var har vi sett dessa silhuetter förut?","Naturligtvis.","I avbildningar från det forntida Egypten.","I statyetter.","På museer.","I konst som är tusentals år gammal.",
"3 000 ÅR. SAMMA ATTITYD.","Nej, vi tänker inte berätta en vacker internetlegend om att just katten under vår solstol är en direkt ättling till en faraos favorit.","Vetenskap fungerar inte så.","Men sanningen visar sig vara minst lika intressant.","Studier av forntida DNA visar att Egyptens kattpopulation faktiskt spelade en viktig roll i tamkatternas spridning genom den antika världen. Den egyptiska genetiska linjen fick särskilt stor spridning under den klassiska antiken.","Och katter hade verkligen en särskild plats i den forntida egyptiska kulturen.","Därför kan ett möte i dag ibland kännas nästan osannolikt.","Året är 2026.","En strand.","Röda havet.","En slank katt kommer fram under en solstol.","Stannar.","Lyfter huvudet.","Tittar rakt in i objektivet.","Och för en sekund verkar avståndet mellan dagens Egypten och Egypten för flera tusen år sedan försvinna.","Samma profil.","Samma blick.","Och kanske samma absoluta övertygelse om att människorna här är servicepersonalen.",
"🐈 P&D:S LILLA HEMLIGHET","Om du vill fotografera en egyptisk katt — prova att inte följa efter den.","Sätt dig på huk.","Sänk telefonen.","Och vänta.","Kattens nyfikenhet gör ibland hela fotografens arbete.","Och av våra bilder att döma tycker vissa lokala modeller att objektivet är ett ovanligt intressant föremål.",
"💛 OCH I HURGHADA BOR TAMARA","Bland alla gestalter i den här berättelsen finns en som aldrig kan förväxlas med någon annan.","Klart gul.","Pytteliten.","Social.","Och fullständigt säker på sig själv.","Tamara.","Hon bor tillsammans med andra undulater i en av Hurghadas butiker.","På kvällen förändras staden.","Dagens hetta avtar.","Färgglada skyltar tänds.","Från öppna butiker kommer dofter av oljor och orientaliska parfymer.","Någonstans doftar det kryddor och kaffe.","Någon annanstans — frukt.","I luften blandas vattenpipans lätta, söta rök med värmen från soluppvärmd sten och havets salta andetag.","Och mitt i denna egyptiska kvällssymfoni sitter Tamara.","Allt passar henne.","En människohand — fungerar.","En axel — utmärkt.","Ett huvud — praktiskt taget en VIP-loge.","Av fotografierna att döma är frågan om vem som kom för att se vem fortfarande öppen.","Vi kom för att se Tamara.","Tamara kom uppenbarligen för att se oss.",
"P&D:S OMDÖME:","Befattning: okänd.","Arbetsplats: en butik i Hurghada.","Specialitet: PR.","Självförtroendenivå: vd.",
"🐢 SEDAN STANNAR TIDEN","Från en papegoja som landar på ditt huvud på några sekunder — till en varelse som inte har någon som helst anledning att skynda sig.","Landsköldpaddor.","En stor.","En liten.","Och en riktigt pytteliten.","En får bekvämt plats i handflatan och fortsätter tugga på gröna blad som om ingenting alls hände runt omkring.","Och här inser man hur olika djur upplever världen.","Människan har redan tagit tio fotografier.","Kollat sina meddelanden.","Funderat på vart hon ska gå härnäst.","Och sköldpaddan håller fortfarande på med sitt första blad.","Kanske är det därför det känns så fridfullt att vara nära dem.",
"P&D:S LIVSRÅD:","Ibland väger den bästa egyptiska wellnesscoachen mindre än ett kilo och bär sitt eget hem på ryggen.",
"🌊 OCH NU — UNDER VATTNET","Här börjar en helt annan djurvärld.","Några steg genom varmt vatten.","En mask.","Ett andetag.","Huvudet glider ner under ytan.","Och det välbekanta Egypten försvinner.","Ingen kryddoft.","Inga röster.","Ingen vattenpipa.","Ingen het luft.","Bara ljus, vatten och färg finns kvar.",
"VÄLKOMMEN TILL ETT ANNAT EGYPTEN.","Röda havet är häpnadsväckande klart.","Solstrålarna passerar genom vattnet och far över havsbottnen.","Och sedan börjar en verklig explosion av färg.","Turkos.","Elektriskt blått.","Citrongult.","Lila.","Orange.","Rosa.","Silver.","Fiskar rör sig mellan korallerna i hela moln.","Vissa ser ut som smycken.","Andra — som tecknade figurer.","Andra ser ut som om en designer fått använda alla färger på en gång.","Och plötsligt inser du:","Egypten behöver verkligen inget filter.",
"🐠 EN METROPOL UNDER VATTNET","Röda havet är mer än en vacker plats att snorkla på.","Det är en enorm levande värld.","I dess egyptiska vatten lever över tusen fiskarter och hundratals korallarter.","Vissa arter är karakteristiska för just den här regionen.","Därför kan två intilliggande delar av revet se ut som två helt olika stadsdelar i samma stad.","Fast här ersätts bilarna av fiskstim.","Husen av koraller.","Och trafikstockningarna är mycket vackrare.",
"🪸 HÄR ÄR ETT FAKTUM SOM FORTFARANDE ÖVERRASKAR MÅNGA","En korall är ett djur.","Inte en växt.","Inte en ovanlig undervattenssten.","Ett djur.","Små korallpolyper lever i kolonier och skapar under mycket långa tidsperioder strukturer som blir hela rev.","Den fantastiska ”trädgården” under din snorkelmask är alltså egentligen en enorm levande stad.","Hundratals varianter av hårda och mjuka koraller har registrerats runt Ras Mohammed.","Men det finns ett ännu mer häpnadsväckande faktum.","En del av själva Ras Mohammed-halvön består av ett forntida fossilt korallrev som höjdes upp för tiotusentals år sedan.","Det ger en nästan otrolig bild:","under dig — ett levande rev.","och alldeles intill, ovanför vattnet — spåret av ett forntida rev.","Egypten kan förena det förflutna med nutiden även under vattnet.",
"👑 MÖT NU DROTTNINGEN","Varje bra kvarter har en lokal kändis.","Vårt rev har också en.","P&D hörde en historia från en egyptisk dykinstruktör som tillbringar mycket tid under vattnet.","När en turist tittar på ett rev ser hen massor av fiskar.","När samma person dyker där regelbundet blir det lite annorlunda.","Man börjar känna igen platserna.","Sprickorna.","Rutterna.","Och ibland — enskilda invånare.","Vår dykare berättade om en muräna som han möter om och om igen.","Han känner igen henne.","Hon dyker upp på en välbekant plats.","Och med tiden har mötena blivit något av en bekantskap under vattnet.","Kan man kalla det vänskap ur muränans eget perspektiv?","Vi frågade inte henne.","Men P&D bestämde en sak med säkerhet:","en sådan karaktär kan inte förbli namnlös.",
"CLEOMORAY 👑","Cleomoray — revets drottning.","Hem: Röda havet.","Residens: en korallspricka.","Utsikt från fönstret: 10/10.","Klädkod: natural couture.","Temperament: kungligt.","Antal tänder: frågan har bedömts som alltför personlig.","Besökare tas emot: helt efter Hennes Majestäts humör.","Vi vet vad den egyptiska dykaren kallar henne.","Men något annat är mycket mer intressant:","vad kallar Cleomoray honom?","”Den där människan med flaskan”?","”Nu är han här igen”?","Eller har hon verkligen ett eget murännamn för honom?","Kanske är vissa egyptiska mysterier bäst att lämna åt Röda havet.",
"🐬 DELFINER SOM JOBBAR PÅ NATTEN","Längre in i berättelsen dyker en av mänsklighetens mest älskade havsgestalter upp.","Delfinen.","Men här finns också en liten egyptisk hemlighet.","Nära Marsa Alam ligger Samadai-revet — det berömda Dolphin House.","Där kan man möta delfiner av arten Stenella longirostris.","Och de har en mycket intressant dygnsrytm.","De är aktiva och söker föda främst på natten och använder den skyddade lagunen för att vila på dagen.","Så situationen ser ungefär ut så här.","En turist vaknar.","Äter frukost.","Tar på sig badkläderna.","Meddelar glatt:","”I dag ska vi titta på delfiner!”","Och någonstans i lagunen:","🐬","”Kan ni vara lite tystare? Vi har precis gått av nattskiftet.”",
"💙 DET BÄSTA MÖTET ÄR NÄR DJURET SJÄLVT VÄLJER","Därför tycker P&D särskilt mycket om en enkel princip för att observera havsdjur.","Försök inte skapa det perfekta ögonblicket.","Låt det hända.","Om en delfin närmar sig på eget initiativ — magiskt.","Om en fisk simmar förbi kameran — ta bilden.","Om Cleomoray väljer att stanna hemma i dag — då har drottningen en ledig dag.","Det vilda djurlivet är vackert just för att det inte följer turistens tidtabell.",
"🌴 VET DU VAD MER SOM VÄXER VID RÖDA HAVET?","Mangrove.","Och det här är en av kontrasterna som Egypten ständigt överraskar oss med.","Ökenberg.","Sand.","Blått hav.","Korallrev.","Och plötsligt — gröna mangrovesnår.","Naturområdet Nabq nära Sharm El Sheikh är till exempel känt för sin kombination av ökenlandskap, hav, rev och mangrove.","Och återigen visar det sig att Egyptens djurvärld inte består av separata bilder.","Allt hänger ihop.","Stranden.","Växterna.","Revet.","Fiskarna.","Fåglarna.","Landdjuren.","Havet.","En enda enorm levande värld.",
"🦀 KRABBAN HAR KOMMIT TILL REDAKTIONSMÖTET","Han är redan här.","Vi mötte honom på Hula Hula-stranden.","Och nu har han en egen plats i vår berättelse.","För efter Tamara, strandkatterna, landsköldpaddorna, tusentals fiskar, delfinerna och Cleomoray är vi redan svåra att överraska.","Fast…","Det här är Egypten.","Det kommer nog att lyckas.",
"✨ P&D WILD EGYPT — 7 FAKTA ATT MINNAS","01 — Koraller är djur.","Din ”undervattensträdgård” lever verkligen.","02 — Röda havet är oerhört rikt på fisk.","Här finns över tusen arter.","03 — Delfiner behöver också vila.","Vid Samadai använder Stenella longirostris-delfiner lagunen som en tillflyktsort på dagen efter nattens aktivitet.","04 — Egypten spelade en viktig roll i tamkatternas historia.","Forntida DNA visar hur den egyptiska kattlinjen spreds långt utanför landet.","05 — Öken och mangrove kan vara grannar.","Röda havet förenar landskap som du aldrig skulle vänta dig att se sida vid sida.","06 — Den bästa personen för en ovanlig revhistoria är en erfaren lokal dykare.","I stället för ”Vad lever här?”, prova att fråga:","”Vem känner du här?”","07 — Du kan inte boka resans mest intressanta djur i förväg.","Kanske blir det en delfin.","Kanske — en muräna.","Eller kanske — en fräck strandkatt som bestämmer sig för att din telefon tillhör den.",
"☀️ DET LEVANDE EGYPTEN","Kanske är det djuren som får Egypten att kännas särskilt nära.","För de förenar allt.","Antiken — med nutiden.","Öknen — med havet.","Staden — med naturen.","Den heta dagen — med den varma kvällen.","Ovanför vattnet doftar luften av kryddor, oljor, kaffe, vattenpipa och havssalt.","Under vattnet försvinner dofterna — och ersätts av korallernas och fiskarnas starka färger.","På stranden ligger en katt i skuggan med en profil som känns bekant från forntida egyptisk konst.","I Hurghada slår sig Tamara ner på någons huvud.","En landsköldpadda avslutar sitt oändligt viktiga blad.","Delfiner vilar efter nattens aktivitet.","Och någonstans i en korallspricka sitter Cleomoray.","Allt detta händer samtidigt.","Inte på ett zoo.","Inte i en bok.","Inte på en skärm.","Här.","Under samma heta egyptiska sol.","Och kanske är det därför Egyptens djurvärld stannar så tydligt i minnet.","Den känns inte som en separat sevärdhet.","Den är invävd i Egypten självt.","I dess hav.","Dess gator.","Dess historia.","Dess färger.","Dess värme.","Och i de små tillfälliga möten som på något sätt stannar hos oss längst.",
"🇪🇬 VEM BOR HÄR? — EGYPTEN","Se inte bara Egypten.\nSe vem som tittar tillbaka på dig.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({da:{editorialUI:{
listen:"Lyt til artiklen",stop:"Stop",back:"Alle artikler",previous:"Forrige billede",next:"Næste billede",location:"King Tut Bazar · Hurghada, Egypten",locationNote:"Tamara bor i en af de små butikker; overfor er der landskildpadder og katte.",crab:"Hula Hula-stranden · Egypten",generated:"Cleomoray",unavailable:"Oplæsning er ikke tilgængelig i denne browser.",fallback:"Den fulde oversættelse til dit valgte sprog er under forberedelse. Den engelske artikel vises.",shortTitle:"Et andet Egypten",bestWorker:"Den bedste medarbejder",source:"Kilde",factsTitle:"Syv fakta om det levende Egypten",mauTitle:"Egyptisk mau",mauText:"Mau kan ”kvidre” og hilse på sine mennesker med bløde, melodiske triller.",mauAlt:"Egyptisk mau i fuld figur",catAlt:"En kat hviler på disken i en butik i Hurghada",tamaraAlt:"Tamara kigger direkte ind i objektivet",dolphinsLabel:"Delfiner",crabHeading:"🦀 Krabben er kommet til redaktionsmødet",crabOpening:["Han er her allerede.","Vi mødte ham på Hula Hula-stranden.","Og nu har han sin egen plads i vores historie."],
facts:[["Delfiner har deres egen ”hudpleje”.","Nær Hurghada gnider delfiner sig mod bestemte koraller og havsvampe. Forskerne foreslår, at stoffer fra dem kan bidrage til hudpleje."],["Skildpadder har ”fotopas”.","I det egyptiske Røde Hav genkendes enkelte havskildpadder på mønstret af skæl på hovedet. På den måde kan gentagne møder registreres."],["Delfiner genkendes på finnen.","Ar og hak i rygfinnen hjælper forskere fra Hurghada med at skelne de enkelte delfiner uden at sætte mærker på dem."],["Havet har græsgange til søkøer.","Dugonger lever af havgræs. Abu Dabbab-bugten har store undervandsenge, som giver disse dyr et velegnet levested."],["Dykkere kan hjælpe med at studere skildpadder.","TurtleWatch indsamler observationer fra dykkere og snorklere for bedre at kortlægge, hvor havskildpadder findes."],["Du kan støtte et dyr på afstand.","Det egyptiske internat S.P.A.R.E. giver mulighed for at støtte katte, hunde og æsler, selv hvis du ikke kan tage dem med hjem."],["Egyptisk mau kan ”kvidre”.","Disse plettede tamkatte kan hilse på deres mennesker med bløde, melodiske triller og kvidrende lyde."]]
},text:[
"🇪🇬 ET ANDET EGYPTEN: DET, DER KIGGER TILBAGE PÅ DIG","Katte med ansigter fra oldtidens billeder, Tamara fra Hurghada, landskildpadder, delfiner efter ”nattevagten”, neonfarvede fisk og Cleomoray — en egyptisk dykkerinstruktørs bekendtskab under vandet.",
"Der findes pyramidernes Egypten.","Der findes hotellernes og strandenes Egypten.","Og så findes der et andet.","Det gemmer sig under en liggestol, sidder på en gren ved en butik, tygger langsomt grønne blade, smutter mellem koraller og kigger nogle gange frem fra en sprække i revet med et udtryk, der siger, at det udmærket ved, at du kom bare for at se det.","Dette er det levende Egypten.","Det er dette Egypten, P&D udforsker.","Ikke en samling dyr i et leksikon, men en enestående verden af væsener, der lever side om side med mennesker — på gaderne, på strandene og under Det Røde Havs overflade.","Og jo længere du betragter dem, desto stærkere bliver følelsen:","her er mennesker langt fra de eneste hovedpersoner.",
"FØRST DUKKER KATTENE OP","I den hede middagsstund ser Egypten ud til at sætte tempoet ned.","Luften flimrer over den opvarmede jord.","Sandet er varmt.","De hvide vægge er næsten blændende.","I det fjerne glimter havet i utrolige blå nuancer.","Og et sted, i en kølig stribe skygge, er der altid en kat.","Egyptiske katte ved, hvordan man vælger de bedste steder.","Under et bord.","Under en liggestol.","Ved en butik.","På stranden.","Og nogle gange — lige dér, hvor et menneske ville gå.","Nogle holder en kongelig afstand.","Andre kommer så tæt på, at du får et billede af én enorm kattenæse i stedet for et portræt.","Da P&D kiggede på vores billeder, lagde vi mærke til noget bemærkelsesværdigt.","De virker bekendte.","En slank krop.","Lange ben.","Store ører.","Et smalt ansigt.","Mandelformede øjne.","Nogle har udtryksfulde mørke streger omkring øjnene, som om de var tegnet med oldtidens egyptiske kohl.","Hvor har vi set disse silhuetter før?","Selvfølgelig.","På billeder fra oldtidens Egypten.","I små figurer.","På museer.","I kunst, der er tusinder af år gammel.",
"3.000 ÅR. SAMME ATTITUDE.","Nej, vi vil ikke fortælle en smuk internetlegende om, at netop katten under vores liggestol er en direkte efterkommer af en faraos yndlingskat.","Sådan fungerer videnskab ikke.","Men sandheden viser sig at være mindst lige så interessant.","Studier af gammelt DNA viser, at Egyptens kattebestand faktisk spillede en vigtig rolle i tamkattenes udbredelse i oldtidens verden. Den egyptiske genetiske linje blev især udbredt i den klassiske oldtid.","Og katte havde virkelig en særlig plads i oldtidens egyptiske kultur.","Derfor kan et møde i dag nogle gange føles næsten utroligt.","Året er 2026.","En strand.","Det Røde Hav.","En slank kat kommer frem under en liggestol.","Stopper.","Løfter hovedet.","Kigger direkte ind i objektivet.","Og i et sekund ser afstanden mellem nutidens Egypten og Egypten for flere tusinde år siden ud til at forsvinde.","Den samme profil.","Det samme blik.","Og måske den samme absolutte overbevisning om, at menneskerne her er servicepersonalet.",
"🐈 P&D'S LILLE HEMMELIGHED","Hvis du vil fotografere en egyptisk kat — prøv ikke at følge efter den.","Sæt dig på hug.","Sænk telefonen.","Og vent.","Kattens nysgerrighed gør nogle gange hele fotografens arbejde.","Og at dømme efter vores billeder synes nogle lokale modeller, at objektivet er en usædvanligt interessant genstand.",
"💛 OG I HURGHADA BOR TAMARA","Blandt alle denne histories figurer er der én, man aldrig kan forveksle med nogen anden.","Klargul.","Bittelille.","Selskabelig.","Og helt sikker på sig selv.","Tamara.","Hun bor sammen med andre undulater i en af Hurghadas butikker.","Om aftenen forandrer byen sig.","Dagens varme aftager.","Farverige skilte lyser op.","Fra åbne butikker kommer dufte af olier og orientalske parfumer.","Et sted dufter der af krydderier og kaffe.","Et andet sted — af frugt.","I luften blandes vandpibens lette, sødlige røg med varmen fra solopvarmede sten og havets salte åndedrag.","Og midt i denne egyptiske aftensymfoni sidder Tamara.","Alt passer hende.","En menneskehånd — egnet.","En skulder — fremragende.","Et hoved — praktisk talt en VIP-loge.","At dømme efter billederne er spørgsmålet om, hvem der kom for at se hvem, stadig åbent.","Vi kom for at se Tamara.","Tamara kom tydeligvis for at se os.",
"P&D'S DOM:","Stilling: ukendt.","Arbejdssted: en butik i Hurghada.","Speciale: PR.","Selvtillid: administrerende direktør.",
"🐢 SÅ STÅR TIDEN STILLE","Fra en papegøje, der lander på dit hoved på få sekunder — til et væsen, der slet ikke har nogen grund til at skynde sig.","Landskildpadder.","En stor.","En lille.","Og en virkelig bittelille.","Én ligger behageligt i håndfladen og fortsætter med at tygge grønne blade, som om der ikke skete noget omkring den.","Og her indser man, hvor forskelligt dyr oplever verden.","Mennesket har allerede taget ti billeder.","Tjekket sine beskeder.","Tænkt over, hvor turen går hen bagefter.","Og skildpadden er stadig ved sit første blad.","Måske er det derfor, det føles så fredeligt at være tæt på dem.",
"P&D'S LIVSRÅD:","Nogle gange vejer den bedste egyptiske wellnesscoach mindre end et kilo og bærer sit eget hjem på ryggen.",
"🌊 OG NU — UNDER VANDET","Her begynder en helt anden dyreverden.","Et par skridt gennem varmt vand.","En maske.","Et åndedrag.","Hovedet glider ned under overfladen.","Og det velkendte Egypten forsvinder.","Ingen duft af krydderier.","Ingen stemmer.","Ingen vandpibe.","Ingen varm luft.","Kun lys, vand og farver er tilbage.",
"VELKOMMEN TIL ET ANDET EGYPTEN.","Det Røde Hav er forbløffende klart.","Solstrålerne passerer gennem vandet og løber hen over havbunden.","Og så begynder en sand eksplosion af farver.","Turkis.","Elektrisk blå.","Citrongul.","Lilla.","Orange.","Lyserød.","Sølv.","Fiskene bevæger sig mellem korallerne i hele skyer.","Nogle ligner smykker.","Andre — tegnefilmsfigurer.","Andre ser ud, som om en designer fik lov til at bruge alle farver på én gang.","Og pludselig indser du:","Egypten har slet ikke brug for et filter.",
"🐠 EN METROPOL UNDER VANDET","Det Røde Hav er mere end et smukt sted at snorkle.","Det er en enorm levende verden.","I dets egyptiske farvande lever over tusind fiskearter og hundredvis af koralarter.","Nogle arter er særligt karakteristiske for denne region.","Derfor kan to naboområder på revet ligne to helt forskellige kvarterer i samme by.","Bare med fiskestimer i stedet for biler.","Koraller i stedet for huse.","Og langt smukkere trafikpropper.",
"🪸 HER ER EN KENDSGERNING, DER STADIG OVERRASKER MANGE","En koral er et dyr.","Ikke en plante.","Ikke en usædvanlig sten under vandet.","Et dyr.","Små koralpolypper lever i kolonier og skaber over enorme tidsrum strukturer, der bliver til hele rev.","Den fantastiske ”have” under din snorkelmaske er altså i virkeligheden en enorm levende by.","Der er registreret hundredvis af varianter af hårde og bløde koraller omkring Ras Mohammed.","Men der findes en endnu mere forbløffende kendsgerning.","En del af selve Ras Mohammed-halvøen består af et gammelt fossilt koralrev, der blev hævet for titusinder af år siden.","Det skaber et næsten utroligt billede:","under dig — et levende rev.","og i nærheden, over vandet — sporene af et gammelt rev.","Egypten kan forbinde fortid og nutid selv under vandet.",
"👑 MØD NU DRONNINGEN","Ethvert godt kvarter har en lokal berømthed.","Det har vores rev også.","P&D hørte en historie fra en egyptisk dykkerinstruktør, der tilbringer meget tid under vandet.","Når en turist ser på et rev, ser vedkommende en masse fisk.","Når den samme person dykker der regelmæssigt, ændrer tingene sig lidt.","Man begynder at genkende stederne.","Sprækkerne.","Ruterne.","Og nogle gange — enkelte beboere.","Vores dykker fortalte om en muræne, som han møder igen og igen.","Han genkender hende.","Hun dukker op på et velkendt sted.","Og med tiden er møderne blevet til noget i retning af et bekendtskab under vandet.","Kan det kaldes venskab fra murænens eget perspektiv?","Vi spurgte hende ikke.","Men P&D besluttede én ting med sikkerhed:","en figur som denne kan ikke forblive navnløs.",
"CLEOMORAY 👑","Cleomoray — revets dronning.","Hjem: Det Røde Hav.","Residens: en sprække i korallerne.","Udsigt fra vinduet: 10/10.","Dresscode: natural couture.","Temperament: kongeligt.","Antal tænder: spørgsmålet er blevet vurderet som for personligt.","Modtagelse af gæster: helt efter Hendes Majestæts humør.","Vi ved, hvad den egyptiske dykker kalder hende.","Men noget andet er meget mere interessant:","hvad kalder Cleomoray ham?","”Det menneske med flasken”?","”Nu er han her igen”?","Eller har hun virkelig sit eget murænenavn til ham?","Måske er visse egyptiske mysterier bedst overladt til Det Røde Hav.",
"🐬 DELFINER, DER ARBEJDER OM NATTEN","Længere inde i historien dukker en af menneskehedens yndlingsfigurer fra havet op.","Delfinen.","Men her findes der også en lille egyptisk hemmelighed.","Nær Marsa Alam ligger Samadai-revet — det berømte Dolphin House.","Her kan man møde delfiner af arten Stenella longirostris.","Og de har en meget interessant døgnrytme.","De er aktive og søger føde hovedsageligt om natten og bruger den beskyttede lagune til at hvile om dagen.","Så situationen ser nogenlunde sådan ud.","En turist vågner.","Spiser morgenmad.","Tager badetøj på.","Meddeler glad:","”I dag skal vi se delfiner!”","Og et sted i lagunen:","🐬","”Kan I være lidt mere stille? Vi er lige blevet færdige med nattevagten.”",
"💙 DET BEDSTE MØDE ER DET, SOM DYRET SELV VÆLGER","Derfor holder P&D særligt meget af et enkelt princip for at observere havdyr.","Prøv ikke at iscenesætte det perfekte øjeblik.","Lad det ske.","Hvis en delfin nærmer sig af sig selv — magisk.","Hvis en fisk svømmer forbi kameraet — tag billedet.","Hvis Cleomoray vælger at blive hjemme i dag — så har dronningen fri.","Vild natur er smuk netop, fordi den ikke følger turistens tidsplan.",
"🌴 VED DU, HVAD DER OGSÅ VOKSER VED DET RØDE HAV?","Mangrove.","Og det er en af de kontraster, som Egypten hele tiden overrasker os med.","Ørkenbjerge.","Sand.","Blåt hav.","Koralrev.","Og pludselig — grønne mangrovekrat.","Naturområdet Nabq nær Sharm El Sheikh er for eksempel kendt for sin kombination af ørkenlandskab, hav, rev og mangrove.","Og igen viser det sig, at Egyptens dyreverden ikke består af adskilte billeder.","Alt hænger sammen.","Kysten.","Planterne.","Revet.","Fiskene.","Fuglene.","Landdyrene.","Havet.","Én enorm levende verden.",
"🦀 KRABBEN ER KOMMET TIL REDAKTIONSMØDET","Han er her allerede.","Vi mødte ham på Hula Hula-stranden.","Og nu har han sin egen plads i vores historie.","For efter Tamara, strandkattene, landskildpadderne, tusindvis af fisk, delfinerne og Cleomoray er det allerede svært at overraske os.","Selvom…","Dette er Egypten.","Det skal nok lykkes.",
"✨ P&D WILD EGYPT — 7 FAKTA AT HUSKE","01 — Koraller er dyr.","Din ”undervandshave” er virkelig levende.","02 — Det Røde Hav er usædvanligt rigt på fisk.","Her findes over tusind arter.","03 — Delfiner har også brug for hvile.","Ved Samadai bruger Stenella longirostris-delfiner lagunen som et tilflugtssted om dagen efter nattens aktivitet.","04 — Egypten spillede en vigtig rolle i tamkattenes historie.","Gammelt DNA viser den egyptiske kattelinjes udbredelse langt uden for landet.","05 — Ørken og mangrove kan være naboer.","Det Røde Hav forbinder landskaber, som man aldrig ville forvente at se side om side.","06 — Den bedste person til en usædvanlig historie om revet er en erfaren lokal dykker.","I stedet for ”Hvad lever her?”, prøv at spørge:","”Hvem kender du her?”","07 — Du kan ikke bestille rejsens mest interessante dyr på forhånd.","Måske bliver det en delfin.","Måske — en muræne.","Eller måske — en fræk strandkat, der beslutter, at din telefon tilhører den.",
"☀️ DET LEVENDE EGYPTEN","Måske er det dyrene, der får Egypten til at føles særligt nært.","Fordi de forbinder alt.","Oldtiden — med nutiden.","Ørkenen — med havet.","Byen — med naturen.","Den hede dag — med den varme aften.","Over vandet dufter luften af krydderier, olier, kaffe, vandpibe og havsalt.","Under vandet forsvinder duftene — og erstattes af korallernes og fiskenes stærke farver.","På stranden ligger en kat i skyggen med en profil, der virker velkendt fra oldtidens egyptiske kunst.","I Hurghada slår Tamara sig ned på nogens hoved.","En landskildpadde afslutter sit uendeligt vigtige blad.","Delfinerne hviler efter nattens aktivitet.","Og et sted i en koralsprække sidder Cleomoray.","Alt dette sker samtidig.","Ikke i en zoologisk have.","Ikke i en bog.","Ikke på en skærm.","Her.","Under den samme hede egyptiske sol.","Og måske er det derfor, Egyptens dyreverden står så tydeligt i erindringen.","Den føles ikke som en særskilt attraktion.","Den er vævet ind i Egypten selv.","I dets hav.","Dets gader.","Dets historie.","Dets farver.","Dets varme.","Og i de små tilfældige møder, der på en eller anden måde bliver hos os længst.",
"🇪🇬 HVEM BOR HER? — EGYPTEN","Se ikke kun Egypten.\nSe, hvem der kigger tilbage på dig.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({no:{editorialUI:{
listen:"Lytt til artikkelen",stop:"Stopp",back:"Alle artikler",previous:"Forrige bilde",next:"Neste bilde",location:"King Tut Bazar · Hurghada, Egypt",locationNote:"Tamara bor i en av de små butikkene; på den andre siden finnes landskilpadder og katter.",crab:"Hula Hula-stranden · Egypt",generated:"Cleomoray",unavailable:"Opplesning er ikke tilgjengelig i denne nettleseren.",fallback:"Den fullstendige oversettelsen til språket du har valgt, er under arbeid. Den engelske artikkelen vises.",shortTitle:"Et annet Egypt",bestWorker:"Den beste medarbeideren",source:"Kilde",factsTitle:"Sju fakta om det levende Egypt",mauTitle:"Egyptisk mau",mauText:"Mau kan «kvitre» og hilse på menneskene sine med myke, melodiske triller.",mauAlt:"Egyptisk mau i helfigur",catAlt:"En katt hviler på disken i en butikk i Hurghada",tamaraAlt:"Tamara ser rett inn i objektivet",dolphinsLabel:"Delfiner",crabHeading:"🦀 Krabben har kommet til redaksjonsmøtet",crabOpening:["Han er her allerede.","Vi møtte ham på Hula Hula-stranden.","Og nå har han sin egen plass i historien vår."],
facts:[["Delfiner har sin egen «hudpleie».","Nær Hurghada gnir delfiner seg mot bestemte koraller og svampdyr. Forskerne foreslår at stoffer fra dem kan bidra til hudpleie."],["Skilpadder har «fotopass».","I det egyptiske Rødehavet identifiseres enkelte havskilpadder ved hjelp av skjellmønsteret på hodet. Slik kan gjentatte møter dokumenteres."],["Delfiner kjennes igjen på finnen.","Arr og hakk i ryggfinnen hjelper forskere i Hurghada med å skille de enkelte delfinene fra hverandre uten å feste merker på dem."],["Havet har beitemarker for sjøkyr.","Dugonger spiser sjøgress. Abu Dabbab-bukten har store undervannsenger som gir disse dyrene et egnet leveområde."],["Dykkere kan hjelpe til med å studere skilpadder.","TurtleWatch samler observasjoner fra dykkere og snorklere for å kartlegge bedre hvor havskilpadder finnes."],["Du kan støtte et dyr på avstand.","Det egyptiske dyreherberget S.P.A.R.E. gir mulighet til å støtte katter, hunder og esler selv om du ikke kan ta dem med hjem."],["Egyptisk mau kan «kvitre».","Disse flekkete tamkattene kan hilse på menneskene sine med myke, melodiske triller og kvitrende lyder."]]
},text:[
"🇪🇬 ET ANNET EGYPT: DET SOM SER TILBAKE PÅ DEG","Katter med ansikter fra oldtidens bilder, Tamara fra Hurghada, landskilpadder, delfiner etter «nattskiftet», neonfargede fisker og Cleomoray — en egyptisk dykkeinstruktørs bekjentskap under vann.",
"Det finnes pyramidenes Egypt.","Det finnes hotellenes og strendenes Egypt.","Og så finnes det et annet.","Det gjemmer seg under en solseng, sitter på en gren ved en butikk, tygger langsomt på grønne blader, smetter mellom koraller og kikker noen ganger frem fra en sprekk i revet med et uttrykk som sier at det vet godt at du kom bare for å se det.","Dette er det levende Egypt.","Det er dette Egypt P&D utforsker.","Ikke en samling dyr i et leksikon, men en enestående verden av skapninger som lever side om side med mennesker — i gatene, på strendene og under Rødehavets overflate.","Og jo lenger du betrakter dem, desto sterkere blir følelsen:","her er menneskene langt fra de eneste hovedpersonene.",
"FØRST DUKKER KATTENE OPP","I den varme middagstimen virker det som Egypt senker tempoet.","Luften dirrer over den oppvarmede bakken.","Sanden er varm.","De hvite veggene er nesten blendende.","I det fjerne glitrer havet i utrolige blånyanser.","Og et sted, i en kjølig stripe skygge, finnes det alltid en katt.","Egyptiske katter vet hvordan de velger de beste stedene.","Under et bord.","Under en solseng.","Ved en butikk.","På stranden.","Og noen ganger — akkurat der et menneske hadde tenkt å gå.","Noen holder en kongelig avstand.","Andre kommer så nær at du får et bilde av én enorm kattenese i stedet for et portrett.","Da P&D så på bildene våre, la vi merke til noe bemerkelsesverdig.","De virker kjente.","En slank kropp.","Lange bein.","Store ører.","Et smalt ansikt.","Mandelformede øyne.","Noen har uttrykksfulle mørke linjer rundt øynene, som om de var tegnet med oldtidens egyptiske kohl.","Hvor har vi sett disse silhuettene før?","Selvfølgelig.","I bilder fra oldtidens Egypt.","I små figurer.","På museer.","I kunst som er tusenvis av år gammel.",
"3 000 ÅR. SAMME HOLDNING.","Nei, vi skal ikke fortelle en vakker internettlegende om at akkurat katten under solsengen vår er en direkte etterkommer av en faraos favorittkatt.","Vitenskap fungerer ikke slik.","Men sannheten viser seg å være minst like interessant.","Studier av gammelt DNA viser at Egypts kattebestand faktisk spilte en viktig rolle i spredningen av tamkatter i oldtidens verden. Den egyptiske genetiske linjen fikk særlig stor utbredelse i den klassiske antikken.","Og katter hadde virkelig en spesiell plass i oldtidens egyptiske kultur.","Derfor kan et møte i dag noen ganger føles nesten utrolig.","Året er 2026.","En strand.","Rødehavet.","En slank katt kommer frem under en solseng.","Stopper.","Løfter hodet.","Ser rett inn i objektivet.","Og i et sekund virker det som avstanden mellom dagens Egypt og Egypt for flere tusen år siden forsvinner.","Den samme profilen.","Det samme blikket.","Og kanskje den samme absolutte overbevisningen om at menneskene her er servicepersonalet.",
"🐈 P&D SIN LILLE HEMMELIGHET","Hvis du vil fotografere en egyptisk katt — prøv å ikke følge etter den.","Sett deg på huk.","Senk telefonen.","Og vent.","Kattens nysgjerrighet gjør noen ganger hele fotografens jobb.","Og etter bildene våre å dømme synes noen lokale modeller at objektivet er en usedvanlig interessant gjenstand.",
"💛 OG I HURGHADA BOR TAMARA","Blant alle figurene i denne historien er det én som aldri kan forveksles med noen andre.","Knallgul.","Bitteliten.","Sosial.","Og fullstendig sikker på seg selv.","Tamara.","Hun bor sammen med andre undulater i en av butikkene i Hurghada.","Om kvelden forandrer byen seg.","Dagens varme avtar.","Fargerike skilt lyser opp.","Fra åpne butikker kommer dufter av oljer og orientalske parfymer.","Et sted lukter det krydder og kaffe.","Et annet sted — frukt.","I luften blandes vannpipens lette, søtlige røyk med varmen fra soloppvarmet stein og havets salte pust.","Og midt i denne egyptiske kveldssymfonien sitter Tamara.","Alt passer henne.","En menneskehånd — egnet.","En skulder — utmerket.","Et hode — praktisk talt en VIP-losje.","Etter bildene å dømme er spørsmålet om hvem som kom for å se hvem, fortsatt åpent.","Vi kom for å se Tamara.","Tamara kom tydeligvis for å se oss.",
"P&D SIN DOM:","Stilling: ukjent.","Arbeidssted: en butikk i Hurghada.","Spesialitet: PR.","Selvtillit: administrerende direktør.",
"🐢 SÅ STÅR TIDEN STILLE","Fra en papegøye som lander på hodet ditt på sekunder — til en skapning som ikke har noen som helst grunn til å skynde seg.","Landskilpadder.","En stor.","En liten.","Og en virkelig bitteliten.","Én får god plass i håndflaten og fortsetter å tygge grønne blader som om ingenting skjer rundt den.","Og her innser man hvor forskjellig dyr opplever verden.","Mennesket har allerede tatt ti bilder.","Sjekket meldingene sine.","Tenkt på hvor turen går videre.","Og skilpadden holder fortsatt på med sitt første blad.","Kanskje er det derfor det føles så fredelig å være nær dem.",
"P&D SITT LIVSRÅD:","Noen ganger veier den beste egyptiske velværecoachen mindre enn et kilo og bærer sitt eget hjem på ryggen.",
"🌊 OG NÅ — UNDER VANN","Her begynner en helt annen dyreverden.","Noen skritt gjennom varmt vann.","En maske.","Et åndedrag.","Hodet glir ned under overflaten.","Og det velkjente Egypt forsvinner.","Ingen krydderduft.","Ingen stemmer.","Ingen vannpipe.","Ingen varm luft.","Bare lys, vann og farger er igjen.",
"VELKOMMEN TIL ET ANNET EGYPT.","Rødehavet er forbløffende klart.","Solstrålene passerer gjennom vannet og løper over havbunnen.","Og så begynner en ekte eksplosjon av farger.","Turkis.","Elektrisk blått.","Sitrongult.","Lilla.","Oransje.","Rosa.","Sølv.","Fiskene beveger seg mellom korallene i hele skyer.","Noen ser ut som smykker.","Andre — som tegnefilmfigurer.","Andre ser ut som om en designer fikk bruke alle fargene samtidig.","Og plutselig innser du:","Egypt trenger ikke noe filter.",
"🐠 EN METROPOL UNDER VANN","Rødehavet er mer enn et vakkert sted å snorkle.","Det er en enorm levende verden.","I de egyptiske farvannene lever over tusen fiskearter og hundrevis av korallarter.","Noen arter er karakteristiske for akkurat denne regionen.","Derfor kan to naboområder på revet se ut som to helt forskjellige bydeler i samme by.","Bare med fiskestimer i stedet for biler.","Koraller i stedet for hus.","Og langt vakrere trafikkorker.",
"🪸 HER ER ET FAKTUM SOM FORTSATT OVERRASKER MANGE","En korall er et dyr.","Ikke en plante.","Ikke en uvanlig stein under vann.","Et dyr.","Små korallpolypper lever i kolonier og skaper over enorme tidsrom strukturer som blir til hele rev.","Den fantastiske «hagen» under snorkelmasken din er altså egentlig en enorm levende by.","Hundrevis av varianter av harde og myke koraller er registrert rundt Ras Mohammed.","Men det finnes et enda mer forbløffende faktum.","En del av selve Ras Mohammed-halvøya består av et gammelt fossilt korallrev som ble hevet for titusener av år siden.","Det skaper et nesten utrolig bilde:","under deg — et levende rev.","og like ved, over vannet — sporene av et gammelt rev.","Egypt kan forbinde fortid og nåtid selv under vann.",
"👑 MØT NÅ DRONNINGEN","Ethvert godt nabolag har en lokal kjendis.","Det har revet vårt også.","P&D hørte en historie fra en egyptisk dykkeinstruktør som tilbringer mye tid under vann.","Når en turist ser på et rev, ser vedkommende mange fisker.","Når den samme personen dykker der regelmessig, blir ting litt annerledes.","Man begynner å kjenne igjen stedene.","Sprekkene.","Rutene.","Og noen ganger — enkelte beboere.","Dykkeren vår fortalte om en murene han møter igjen og igjen.","Han kjenner henne igjen.","Hun dukker opp på et velkjent sted.","Og med tiden har møtene blitt til noe som ligner et bekjentskap under vann.","Kan dette kalles vennskap fra murenens eget perspektiv?","Vi spurte henne ikke.","Men P&D bestemte én ting helt sikkert:","en slik karakter kan ikke forbli navnløs.",
"CLEOMORAY 👑","Cleomoray — revets dronning.","Hjem: Rødehavet.","Residens: en sprekk i korallene.","Utsikt fra vinduet: 10/10.","Kleskode: natural couture.","Temperament: kongelig.","Antall tenner: spørsmålet er vurdert som for personlig.","Mottak av gjester: helt etter Hennes Majestets humør.","Vi vet hva den egyptiske dykkeren kaller henne.","Men noe annet er mye mer interessant:","hva kaller Cleomoray ham?","«Det mennesket med flasken»?","«Nå er han her igjen»?","Eller har hun faktisk sitt eget murenavn for ham?","Kanskje er noen egyptiske mysterier best overlatt til Rødehavet.",
"🐬 DELFINER SOM JOBBER OM NATTEN","Lenger inn i historien dukker en av menneskehetens mest populære havfigurer opp.","Delfinen.","Men her finnes også en liten egyptisk hemmelighet.","Nær Marsa Alam ligger Samadai-revet — det berømte Dolphin House.","Her kan man møte delfiner av arten Stenella longirostris.","Og de har en svært interessant døgnrytme.","De er aktive og søker mat hovedsakelig om natten og bruker den beskyttede lagunen til å hvile om dagen.","Så situasjonen ser omtrent slik ut.","En turist våkner.","Spiser frokost.","Tar på seg badetøy.","Sier glad:","«I dag skal vi se delfiner!»","Og et sted i lagunen:","🐬","«Kan dere være litt stillere? Vi har akkurat avsluttet nattskiftet.»",
"💙 DET BESTE MØTET ER DET DYRET SELV VELGER","Derfor liker P&D spesielt godt et enkelt prinsipp for å observere havdyr.","Ikke prøv å iscenesette det perfekte øyeblikket.","La det skje.","Hvis en delfin nærmer seg av seg selv — magisk.","Hvis en fisk svømmer forbi kameraet — ta bildet.","Hvis Cleomoray velger å bli hjemme i dag — har dronningen fri.","Vill natur er vakker nettopp fordi den ikke følger turistens timeplan.",
"🌴 VET DU HVA ANNET SOM VOKSER VED RØDEHAVET?","Mangrove.","Og dette er en av kontrastene Egypt stadig overrasker oss med.","Ørkenfjell.","Sand.","Blått hav.","Korallrev.","Og plutselig — grønne mangrovekratt.","Naturområdet Nabq nær Sharm El Sheikh er for eksempel kjent for kombinasjonen av ørkenlandskap, hav, rev og mangrove.","Og igjen viser det seg at Egypts dyreverden ikke består av separate bilder.","Alt henger sammen.","Kysten.","Plantene.","Revet.","Fiskene.","Fuglene.","Landdyrene.","Havet.","Én enorm levende verden.",
"🦀 KRABBEN HAR KOMMET TIL REDAKSJONSMØTET","Han er her allerede.","Vi møtte ham på Hula Hula-stranden.","Og nå har han sin egen plass i historien vår.","For etter Tamara, strandkattene, landskilpaddene, tusenvis av fisker, delfinene og Cleomoray er det allerede vanskelig å overraske oss.","Selv om…","Dette er Egypt.","Det vil nok klare det.",
"✨ P&D WILD EGYPT — 7 FAKTA Å HUSKE","01 — Koraller er dyr.","«Undervannshagen» din er virkelig levende.","02 — Rødehavet er usedvanlig rikt på fisk.","Her finnes over tusen arter.","03 — Delfiner trenger også hvile.","Ved Samadai bruker Stenella longirostris-delfiner lagunen som et tilfluktssted om dagen etter nattens aktivitet.","04 — Egypt spilte en viktig rolle i tamkattenes historie.","Gammelt DNA viser hvordan den egyptiske kattelinjen spredte seg langt utenfor landet.","05 — Ørken og mangrove kan være naboer.","Rødehavet forbinder landskap man aldri ville forvente å se side om side.","06 — Den beste personen for en uvanlig historie fra revet er en erfaren lokal dykker.","I stedet for «Hva lever her?», prøv å spørre:","«Hvem kjenner du her?»","07 — Du kan ikke bestille reisens mest interessante dyr på forhånd.","Kanskje blir det en delfin.","Kanskje — en murene.","Eller kanskje — en frekk strandkatt som bestemmer at telefonen din tilhører den.",
"☀️ DET LEVENDE EGYPT","Kanskje er det dyrene som får Egypt til å føles spesielt nært.","Fordi de forbinder alt.","Oldtiden — med nåtiden.","Ørkenen — med havet.","Byen — med naturen.","Den hete dagen — med den varme kvelden.","Over vannet lukter luften av krydder, oljer, kaffe, vannpipe og havsalt.","Under vann forsvinner duftene — og erstattes av korallenes og fiskenes sterke farger.","På stranden ligger en katt i skyggen med en profil som virker kjent fra oldtidens egyptiske kunst.","I Hurghada setter Tamara seg på hodet til noen.","En landskilpadde avslutter sitt uendelig viktige blad.","Delfinene hviler etter nattens aktivitet.","Og et sted i en korallsprekk sitter Cleomoray.","Alt dette skjer samtidig.","Ikke i en dyrehage.","Ikke i en bok.","Ikke på en skjerm.","Her.","Under den samme hete egyptiske solen.","Og kanskje er det derfor Egypts dyreverden sitter så tydelig i minnet.","Den føles ikke som en egen attraksjon.","Den er vevd inn i Egypt selv.","I havet.","I gatene.","I historien.","I fargene.","I varmen.","Og i de små tilfeldige møtene som på en eller annen måte blir hos oss lengst.",
"🇪🇬 HVEM BOR HER? — EGYPT","Ikke bare se Egypt.\nSe hvem som ser tilbake på deg.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({fi:{editorialUI:{
listen:"Kuuntele artikkeli",stop:"Pysäytä",back:"Kaikki artikkelit",previous:"Edellinen kuva",next:"Seuraava kuva",location:"King Tut Bazar · Hurghada, Egypti",locationNote:"Tamara asuu yhdessä pienistä kaupoista; vastapäätä on maakilpikonnia ja kissoja.",crab:"Hula Hulan ranta · Egypti",generated:"Cleomoray",unavailable:"Ääneen lukeminen ei ole käytettävissä tässä selaimessa.",fallback:"Valitun kielen täydellistä käännöstä valmistellaan. Näytetään englanninkielinen artikkeli.",shortTitle:"Toinen Egypti",bestWorker:"Paras työntekijä",source:"Lähde",factsTitle:"Seitsemän tietoa elävästä Egyptistä",mauTitle:"Egyptinmau",mauText:"Mau osaa ”sirkuttaa” ja voi tervehtiä ihmisiään pehmeillä, melodisilla trilleillä.",mauAlt:"Egyptinmau kokonaan kuvassa",catAlt:"Kissa lepää Hurghadan kaupan tiskillä",tamaraAlt:"Tamara katsoo suoraan objektiiviin",dolphinsLabel:"Delfiinit",crabHeading:"🦀 Rapu saapui toimituksen kokoukseen",crabOpening:["Se on jo täällä.","Kohtasimme sen Hula Hulan rannalla.","Ja nyt sillä on oma paikkansa tarinassamme."],
facts:[["Delfiineillä on omaa ”ihonhoitoa”.","Hurghadan lähellä delfiinit hierovat itseään tiettyihin koralleihin ja sienieläimiin. Tutkijat arvelevat, että niiden aineet voivat auttaa ihonhoidossa."],["Kilpikonnilla on ”kuvapassit”.","Egyptin Punaisessameressä yksittäiset merikilpikonnat tunnistetaan pään suomukuvion perusteella. Näin voidaan kirjata toistuvia kohtaamisia."],["Delfiinit tunnistetaan evästään.","Selkäevän arvet ja lovet auttavat Hurghadan tutkijoita erottamaan yksittäiset delfiinit ilman niihin kiinnitettäviä merkkejä."],["Meressä on laitumia merilehmille.","Dugongit syövät meriheinää. Abu Dabbabin lahdella on laajoja vedenalaisia niittyjä, jotka tarjoavat näille eläimille sopivan elinympäristön."],["Sukeltajat voivat auttaa kilpikonnien tutkimuksessa.","TurtleWatch kerää sukeltajien ja snorklaajien havaintoja, jotta merikilpikonnien esiintymispaikat voidaan kartoittaa paremmin."],["Eläintä voi tukea etäältä.","Egyptiläinen S.P.A.R.E.-eläinsuoja tarjoaa mahdollisuuden tukea kissoja, koiria ja aaseja, vaikka et voisi ottaa niitä kotiisi."],["Egyptinmau osaa ”sirkuttaa”.","Nämä täplikkäät kotikissat voivat tervehtiä ihmisiään pehmeillä, melodisilla trilleillä ja sirkuttavilla äänillä."]]
},text:[
"🇪🇬 TOINEN EGYPTI: SE, JOKA KATSOO SINUA TAKAISIN","Muinaisten kuvien kasvoja muistuttavia kissoja, Hurghadan Tamara, maakilpikonnia, delfiinejä ”yövuoron” jälkeen, neonvärisiä kaloja ja Cleomoray — egyptiläisen sukellusohjaajan vedenalainen tuttava.",
"On pyramidien Egypti.","On hotellien ja rantojen Egypti.","Ja sitten on toinen.","Se piiloutuu aurinkotuolin alle, istuu oksalla kaupan vieressä, pureskelee hitaasti vihreitä lehtiä, sujahtaa korallien väliin ja kurkistaa joskus riutan raosta ilmeellä, joka kertoo sen tietävän aivan hyvin, että tulit vain sitä katsomaan.","Tämä on elävä Egypti.","Tätä Egyptiä P&D tutkii.","Ei tietosanakirjan eläinkokoelmaa, vaan ihmeellistä maailmaa, jonka olennot elävät ihmisten rinnalla — kaduilla, rannoilla ja Punaisenmeren pinnan alla.","Ja mitä kauemmin niitä katselet, sitä vahvemmaksi tunne käy:","ihmiset eivät täällä suinkaan ole ainoita päähenkilöitä.",
"ENSIN ILMESTYVÄT KISSAT","Kuumana keskipäivänä Egypti tuntuu hidastavan tahtiaan.","Ilma väreilee kuumentuneen maan yllä.","Hiekka on kuumaa.","Valkoiset seinät lähes häikäisevät.","Kaukana meri kimaltelee uskomattomissa sinisen sävyissä.","Ja jossakin, viileässä varjokaistaleessa, on aina kissa.","Egyptiläiset kissat osaavat valita parhaat paikat.","Pöydän alta.","Aurinkotuolin alta.","Kaupan vierestä.","Rannalta.","Ja joskus — juuri siitä, mistä ihminen aikoi kulkea.","Jotkut pitävät kuninkaallisen etäisyyden.","Toiset tulevat niin lähelle, että muotokuvan sijasta saat kuvan yhdestä valtavasta kissan nenästä.","Valokuviamme katsellessaan P&D huomasi jotakin ihmeellistä.","Ne näyttävät tutuilta.","Hoikka vartalo.","Pitkät jalat.","Suuret korvat.","Kapeat kasvot.","Mantelinmuotoiset silmät.","Joillakin silmiä kehystävät ilmeikkäät tummat viivat, aivan kuin ne olisi piirretty muinaisegyptiläisellä kohlilla.","Missä olemme nähneet nämä hahmot aiemmin?","Tietenkin.","Muinaisen Egyptin kuvissa.","Pienoisveistoksissa.","Museoissa.","Tuhansia vuosia vanhassa taiteessa.",
"3 000 VUOTTA. SAMA ASENNE.","Emme kerro kaunista internetlegendaa siitä, että juuri aurinkotuolimme alla oleva kissa olisi faaraon suosikin suora jälkeläinen.","Tiede ei toimi niin.","Mutta totuus osoittautuu aivan yhtä kiinnostavaksi.","Muinaisen DNA:n tutkimukset osoittavat, että Egyptin kissapopulaatiolla oli todella tärkeä rooli kotikissojen leviämisessä muinaiseen maailmaan. Egyptiläinen geneettinen linja levisi erityisen laajalle klassisen antiikin aikana.","Kissoilla oli myös aidosti erityinen asema muinaisegyptiläisessä kulttuurissa.","Siksi nykyinen kohtaaminen voi joskus tuntua lähes uskomattomalta.","Vuosi on 2026.","Ranta.","Punainenmeri.","Hoikka kissa tulee esiin aurinkotuolin alta.","Pysähtyy.","Nostaa päänsä.","Katsoo suoraan objektiiviin.","Ja sekunniksi nykyisen Egyptin ja tuhansien vuosien takaisen Egyptin välinen etäisyys tuntuu katoavan.","Sama profiili.","Sama katse.","Ja kenties sama täydellinen varmuus siitä, että ihmiset ovat täällä palveluskuntaa.",
"🐈 P&D:N PIENI SALAISUUS","Jos haluat kuvata egyptiläistä kissaa — kokeile olla seuraamatta sitä.","Kyykisty.","Laske puhelinta.","Ja odota.","Kissan uteliaisuus tekee joskus kaiken kuvaajan työn.","Ja kuvistamme päätellen jotkut paikalliset mallit pitävät objektiivia poikkeuksellisen kiinnostavana esineenä.",
"💛 JA HURGHADASSA ASUU TAMARA","Tämän tarinan kaikkien hahmojen joukossa on yksi, jota ei voi sekoittaa kehenkään muuhun.","Kirkkaankeltainen.","Pikkuruinen.","Seurallinen.","Ja täysin varma itsestään.","Tamara.","Se elää muiden undulaattien kanssa yhdessä Hurghadan kaupoista.","Illalla kaupunki muuttuu.","Päivän helle hellittää.","Värikkäät kyltit syttyvät.","Avoimista kaupoista kantautuu öljyjen ja itämaisten hajuvesien tuoksuja.","Jossakin tuoksuu mausteilta ja kahvilta.","Toisaalla — hedelmiltä.","Ilmassa sekoittuvat vesipiipun kevyt, makeahko savu, auringon lämmittämän kiven lämpö ja meren suolainen hengitys.","Ja keskellä tätä egyptiläisen illan sinfoniaa istuu Tamara.","Kaikki sopii sille.","Ihmisen käsi — sopiva.","Olkapää — erinomainen.","Pää — melkein VIP-aitio.","Valokuvista päätellen kysymys siitä, kuka tuli katsomaan ketä, on yhä avoin.","Me tulimme katsomaan Tamaraa.","Tamara tuli selvästi katsomaan meitä.",
"P&D:N ARVIO:","Tehtävä: tuntematon.","Työpaikka: kauppa Hurghadassa.","Erikoisala: suhdetoiminta.","Itseluottamus: toimitusjohtajan tasoa.",
"🐢 SITTEN AIKA PYSÄHTYY","Papukaijasta, joka laskeutuu päähäsi sekunneissa — olentoon, jolla ei ole mitään syytä kiirehtiä.","Maakilpikonnia.","Suuri.","Pieni.","Ja todella pikkuruinen.","Yksi mahtuu mukavasti kämmenelle ja jatkaa vihreiden lehtien pureskelua kuin ympärillä ei tapahtuisi mitään.","Ja tässä ymmärtää, kuinka eri tavoin eläimet kokevat maailman.","Ihminen on jo ottanut kymmenen kuvaa.","Tarkistanut viestinsä.","Miettinyt, minne mennä seuraavaksi.","Ja kilpikonna syö edelleen ensimmäistä lehteään.","Ehkä siksi niiden lähellä on niin rauhallista.",
"P&D:N ELÄMÄNOHJE:","Joskus paras egyptiläinen hyvinvointivalmentaja painaa alle kilon ja kantaa omaa kotiaan selässään.",
"🌊 JA NYT — VEDEN ALLE","Tästä alkaa aivan toisenlainen eläinmaailma.","Muutama askel lämpimässä vedessä.","Maski.","Hengenveto.","Pää painuu pinnan alle.","Ja tuttu Egypti katoaa.","Ei mausteiden tuoksua.","Ei ääniä.","Ei vesipiippua.","Ei kuumaa ilmaa.","Jäljelle jäävät vain valo, vesi ja väri.",
"TERVETULOA TOISEEN EGYPTIIN.","Punainenmeri on hämmästyttävän kirkas.","Auringonsäteet kulkevat veden läpi ja kiitävät merenpohjalla.","Ja sitten alkaa todellinen värien räjähdys.","Turkoosia.","Sähkönsinistä.","Sitruunankeltaista.","Violettia.","Oranssia.","Vaaleanpunaista.","Hopeaa.","Kalat liikkuvat korallien välissä kokonaisina pilvinä.","Jotkut näyttävät koruilta.","Toiset — piirroshahmoilta.","Toiset näyttävät siltä kuin suunnittelija olisi saanut käyttää kaikkia värejä kerralla.","Ja yhtäkkiä ymmärrät:","Egypti ei tarvitse mitään suodatinta.",
"🐠 VEDENALAINEN SUURKAUPUNKI","Punainenmeri on enemmän kuin kaunis snorklauspaikka.","Se on valtava elävä maailma.","Sen egyptiläisissä vesissä elää yli tuhat kalalajia ja satoja korallilajeja.","Jotkut lajit ovat ominaisia juuri tälle alueelle.","Siksi kaksi vierekkäistä riutan osaa voivat näyttää saman kaupungin kahdelta täysin erilaiselta kaupunginosalta.","Paitsi että täällä autojen tilalla on kalaparvia.","Talojen tilalla koralleja.","Ja liikenneruuhkat ovat paljon kauniimpia.",
"🪸 TÄSSÄ ON TIETO, JOKA YHÄ YLLÄTTÄÄ MONIA","Koralli on eläin.","Ei kasvi.","Ei erikoinen vedenalainen kivi.","Eläin.","Pienet korallipolyypit elävät yhdyskunnissa ja luovat valtavien ajanjaksojen kuluessa rakenteita, joista muodostuu kokonaisia riuttoja.","Snorklausmaskisi alla näkyvä upea ”puutarha” on siis todellisuudessa valtava elävä kaupunki.","Ras Mohammedin ympäristössä on kirjattu satoja kovien ja pehmeiden korallien muotoja.","Mutta on olemassa vielä hämmästyttävämpi tieto.","Osa itse Ras Mohammedin niemimaasta koostuu muinaisesta fossiilisesta koralliriutasta, joka kohosi kymmeniätuhansia vuosia sitten.","Syntyy lähes uskomaton näkymä:","alapuolellasi — elävä riutta.","ja lähellä, veden yläpuolella — muinaisen riutan jälki.","Egypti osaa yhdistää menneisyyden ja nykyhetken myös veden alla.",
"👑 TAPAA NYT KUNINGATAR","Jokaisella hyvällä asuinalueella on paikallinen kuuluisuus.","Niin myös meidän riutallamme.","P&D kuuli tarinan egyptiläiseltä sukellusohjaajalta, joka viettää paljon aikaa veden alla.","Kun turisti katsoo riuttaa, hän näkee paljon kaloja.","Kun sama ihminen sukeltaa siellä säännöllisesti, asiat muuttuvat hieman.","Hän alkaa tunnistaa paikkoja.","Rakoja.","Reittejä.","Ja joskus — yksittäisiä asukkaita.","Sukeltajamme kertoi mureenasta, jonka hän kohtaa yhä uudelleen.","Hän tunnistaa sen.","Se ilmestyy tuttuun paikkaan.","Ja ajan myötä kohtaamisista on tullut eräänlainen vedenalainen tuttavuus.","Voiko sitä kutsua ystävyydeksi mureenan omasta näkökulmasta?","Siltä emme kysyneet.","Mutta P&D päätti yhden asian varmasti:","tällainen hahmo ei voi jäädä nimettömäksi.",
"CLEOMORAY 👑","Cleomoray — riutan kuningatar.","Koti: Punainenmeri.","Asuinpaikka: korallirako.","Näkymä ikkunasta: 10/10.","Pukukoodi: natural couture.","Luonne: kuninkaallinen.","Hampaiden määrä: kysymys on todettu liian henkilökohtaiseksi.","Vieraiden vastaanotto: täysin Hänen Majesteettinsa mielialan mukaan.","Tiedämme, millä nimellä egyptiläinen sukeltaja sitä kutsuu.","Mutta jokin muu on paljon kiinnostavampaa:","millä nimellä Cleomoray kutsuu häntä?","”Se ihminen, jolla on pullo”?","”Taas hän tuli”?","Vai onko sillä todella oma mureenankielinen nimi hänelle?","Ehkä jotkut Egyptin mysteerit on parasta jättää Punaisellemerelle.",
"🐬 DELFIINIT, JOTKA TYÖSKENTELEVÄT ÖISIN","Tarinassa tulee seuraavaksi vastaan yksi ihmiskunnan rakastetuimmista merellisistä hahmoista.","Delfiini.","Mutta tässäkin on pieni egyptiläinen salaisuus.","Marsa Alamin lähellä sijaitsee Samadai-riutta — kuuluisa Dolphin House.","Siellä voi kohdata Stenella longirostris -lajin delfiinejä.","Ja niillä on hyvin kiinnostava vuorokausirytmi.","Ne ovat aktiivisia ja etsivät ravintoa pääasiassa öisin, ja päivisin ne lepäävät suojaisassa laguunissa.","Tilanne näyttää siis suunnilleen tältä.","Turisti herää.","Syö aamiaisen.","Pukee uima-asun.","Ilmoittaa iloisesti:","”Tänään menemme katsomaan delfiinejä!”","Ja jossakin laguunissa:","🐬","”Voisitteko olla vähän hiljempaa? Saimme juuri yövuoron päätökseen.”",
"💙 PARAS KOHTAAMINEN ON ELÄIMEN ITSE VALITSEMA","Siksi P&D pitää erityisesti yhdestä yksinkertaisesta merieläinten tarkkailun periaatteesta.","Älä yritä lavastaa täydellistä hetkeä.","Anna sen tapahtua.","Jos delfiini lähestyy oma-aloitteisesti — taianomaista.","Jos kala ui kameran ohi — ota kuva.","Jos Cleomoray päättää tänään jäädä kotiin — kuningattarella on vapaapäivä.","Villieläimet ovat kauniita juuri siksi, etteivät ne noudata turistin aikataulua.",
"🌴 TIEDÄTKÖ, MITÄ MUUTA PUNAISENMEREN RANNALLA KASVAA?","Mangrovea.","Ja tämä on yksi niistä vastakohdista, joilla Egypti jatkuvasti yllättää meidät.","Aavikkovuoria.","Hiekkaa.","Sininen meri.","Koralliriuttoja.","Ja yhtäkkiä — vihreitä mangrovemetsiköitä.","Esimerkiksi Sharm El Sheikhin lähellä sijaitseva Nabqin luontoalue tunnetaan aavikkomaiseman, meren, riuttojen ja mangrovejen yhdistelmästä.","Jälleen käy ilmi, ettei Egyptin eläinmaailma koostu erillisistä kuvista.","Kaikki liittyy yhteen.","Ranta.","Kasvit.","Riutta.","Kalat.","Linnut.","Maaeläimet.","Meri.","Yksi valtava elävä maailma.",
"🦀 RAPU SAAPUI TOIMITUKSEN KOKOUKSEEN","Se on jo täällä.","Kohtasimme sen Hula Hulan rannalla.","Ja nyt sillä on oma paikkansa tarinassamme.","Sillä Tamaran, rantakissojen, maakilpikonnien, tuhansien kalojen, delfiinien ja Cleomorayn jälkeen meitä on jo vaikea yllättää.","Tosin…","Tämä on Egypti.","Se luultavasti onnistuu.",
"✨ P&D WILD EGYPT — 7 MUISTAMISEN ARVOISTA TIETOA","01 — Korallit ovat eläimiä.","”Vedenalainen puutarhasi” todella elää.","02 — Punaisessameressä on valtavasti kalalajeja.","Täällä tavataan yli tuhat lajia.","03 — Delfiinitkin tarvitsevat lepoa.","Samadaissa Stenella longirostris -delfiinit käyttävät laguunia päiväaikaisena suojapaikkana yön aktiivisuuden jälkeen.","04 — Egyptillä oli tärkeä rooli kotikissojen historiassa.","Muinainen DNA kertoo egyptiläisen kissalinjan leviämisestä kauas maan rajojen ulkopuolelle.","05 — Aavikko ja mangrove voivat olla naapureita.","Punainenmeri yhdistää maisemia, joita et odottaisi näkeväsi rinnakkain.","06 — Paras keskustelukumppani erikoiselle riuttatarinalle on kokenut paikallinen sukeltaja.","Kysymyksen ”Mitä täällä elää?” sijasta kokeile kysyä:","”Kenet tunnet täällä?”","07 — Matkasi kiinnostavinta eläintä ei voi varata etukäteen.","Ehkä se on delfiini.","Ehkä — mureena.","Tai ehkä — röyhkeä rantakissa, joka päättää puhelimesi kuuluvan sille.",
"☀️ ELÄVÄ EGYPTI","Ehkä juuri eläimet tekevät Egyptistä erityisen läheisen.","Koska ne yhdistävät kaiken.","Antiikin — nykyhetkeen.","Aavikon — mereen.","Kaupungin — luontoon.","Kuuman päivän — lämpimään iltaan.","Veden yläpuolella ilma tuoksuu mausteilta, öljyiltä, kahvilta, vesipiipulta ja merisuolalta.","Veden alla tuoksut katoavat — tilalle tulevat korallien ja kalojen kirkkaat värit.","Rannalla kissa makaa varjossa, profiilissaan jotakin muinaisegyptiläisestä taiteesta tuttua.","Hurghadassa Tamara asettuu jonkun päähän.","Maakilpikonna syö loppuun loputtoman tärkeää lehteään.","Delfiinit lepäävät yön aktiivisuuden jälkeen.","Ja jossakin koralliraossa istuu Cleomoray.","Kaikki tämä tapahtuu samaan aikaan.","Ei eläintarhassa.","Ei kirjassa.","Ei näytöllä.","Täällä.","Saman kuuman egyptiläisen auringon alla.","Ja ehkä siksi Egyptin eläinmaailma jää niin vahvasti mieleen.","Se ei tunnu erilliseltä nähtävyydeltä.","Se on kietoutunut itse Egyptiin.","Sen mereen.","Sen katuihin.","Sen historiaan.","Sen väreihin.","Sen lämpöön.","Ja niihin pieniin sattumanvaraisiin kohtaamisiin, jotka jotenkin pysyvät mielessämme pisimpään.",
"🇪🇬 KUKA TÄÄLLÄ ASUU? — EGYPTI","Älä vain katso Egyptiä.\nKatso, kuka katsoo sinua takaisin.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({tr:{editorialUI:{
listen:"Makaleyi dinle",stop:"Durdur",back:"Tüm makaleler",previous:"Önceki fotoğraf",next:"Sonraki fotoğraf",location:"King Tut Bazar · Hurgada, Mısır",locationNote:"Tamara küçük dükkânlardan birinde yaşıyor; karşı tarafta kara kaplumbağaları ve kediler var.",crab:"Hula Hula Plajı · Mısır",generated:"Cleomoray",unavailable:"Bu tarayıcıda sesli okuma kullanılamıyor.",fallback:"Seçtiğiniz dildeki tam çeviri hazırlanıyor. İngilizce makale gösteriliyor.",shortTitle:"Başka Bir Mısır",bestWorker:"En iyi çalışan",source:"Kaynak",factsTitle:"Yaşayan Mısır hakkında yedi gerçek",mauTitle:"Mısır Mau kedisi",mauText:"Mau, hafif ve melodik seslerle adeta “cıvıldayarak” insanlarını selamlayabilir.",mauAlt:"Mısır Mau kedisinin tam boy fotoğrafı",catAlt:"Hurgada'daki bir dükkânın tezgâhında dinlenen kedi",tamaraAlt:"Tamara doğrudan objektife bakıyor",dolphinsLabel:"Yunuslar",crabHeading:"🦀 Yengeç yayın kurulu toplantısına geldi",crabOpening:["O zaten burada.","Onunla Hula Hula Plajı'nda karşılaştık.","Ve şimdi hikâyemizde kendine ait bir yeri var."],
facts:[["Yunusların kendilerine özgü bir “cilt bakımı” var.","Hurgada yakınında yunuslar belirli mercanlara ve süngerlere sürtünüyor. Araştırmacılar, bunların içerdiği maddelerin cilt bakımına yardımcı olabileceğini düşünüyor."],["Kaplumbağaların “fotoğraflı pasaportları” var.","Mısır'ın Kızıldeniz sularında deniz kaplumbağaları başlarındaki pul desenlerinden tek tek tanınıyor. Böylece tekrar karşılaşmalar kaydedilebiliyor."],["Yunuslar yüzgeçlerinden tanınıyor.","Sırt yüzgecindeki yara izleri ve çentikler, Hurgada'daki araştırmacıların yunusları üzerlerine işaret takmadan birbirinden ayırmasına yardımcı oluyor."],["Denizde deniz inekleri için otlaklar var.","Dugonglar deniz çayırlarıyla besleniyor. Abu Dabbab Koyu'ndaki geniş su altı çayırları bu hayvanlar için uygun bir yaşam alanı sağlıyor."],["Dalgıçlar kaplumbağaların araştırılmasına yardımcı olabilir.","TurtleWatch, deniz kaplumbağalarının nerelerde görüldüğünü daha iyi belirlemek için dalgıçların ve şnorkelle yüzenlerin gözlemlerini topluyor."],["Bir hayvanı uzaktan destekleyebilirsiniz.","Mısır'daki S.P.A.R.E. barınağı, eve götüremeseniz bile kedileri, köpekleri ve eşekleri destekleme imkânı sunuyor."],["Mısır Mau kedisi “cıvıldayabilir”.","Bu benekli evcil kediler, insanlarını hafif ve melodik titreşimli seslerle ve cıvıltıyı andıran seslerle selamlayabilir."]]
},text:[
"🇪🇬 BAŞKA BİR MISIR: SANA KARŞILIK VEREN BAKIŞLAR","Antik tasvirlerden çıkmış yüzleriyle kediler, Hurgada'dan Tamara, kara kaplumbağaları, “gece vardiyasından” çıkan yunuslar, neon renkli balıklar ve Cleomoray — Mısırlı bir dalış eğitmeninin su altındaki tanıdığı.",
"Piramitlerin Mısır'ı var.","Otellerin ve plajların Mısır'ı var.","Bir de başka bir Mısır var.","Bir şezlongun altında saklanıyor, bir dükkânın yanındaki dalda oturuyor, yeşil yaprakları yavaşça çiğniyor, mercanların arasında süzülüyor ve bazen sırf onu görmek için geldiğini çok iyi biliyormuş gibi bir ifadeyle resifin yarığından başını uzatıyor.","İşte yaşayan Mısır bu.","P&D'nin keşfettiği Mısır bu.","Bir ansiklopedideki hayvan koleksiyonu değil; insanlarla yan yana yaşayan canlıların olağanüstü dünyası — sokaklarda, plajlarda ve Kızıldeniz'in yüzeyinin altında.","Onları izledikçe şu his güçleniyor:","burada tek başrol kesinlikle insanlar değil.",
"ÖNCE KEDİLER ORTAYA ÇIKIYOR","Sıcak öğle saatlerinde Mısır yavaşlıyor gibi görünüyor.","Isınmış toprağın üzerinde hava titreşiyor.","Kum sıcak.","Beyaz duvarlar neredeyse göz kamaştırıyor.","Uzakta deniz, mavinin inanılmaz tonlarında parlıyor.","Ve serin bir gölge şeridinde mutlaka bir kedi bulunuyor.","Mısır'ın kedileri en iyi yerleri seçmeyi biliyor.","Masanın altı.","Şezlongun altı.","Dükkânın yanı.","Plaj.","Bazen de — tam bir insanın geçmek istediği yer.","Bazıları asil bir mesafe koruyor.","Diğerleri öyle yaklaşıyor ki portre yerine kocaman bir kedi burnunun fotoğrafını çekiyorsun.","P&D, fotoğraflarımıza bakarken dikkat çekici bir şey fark etti.","Tanıdık görünüyorlar.","İnce bir beden.","Uzun bacaklar.","Büyük kulaklar.","Dar bir yüz.","Badem biçimli gözler.","Bazılarının gözlerinin çevresinde, sanki antik Mısır sürmesiyle çizilmiş gibi etkileyici koyu çizgiler var.","Bu siluetleri nerede görmüştük?","Elbette.","Antik Mısır tasvirlerinde.","Küçük heykellerde.","Müzelerde.","Binlerce yıllık sanat eserlerinde.",
"3.000 YIL. AYNI TAVIR.","Hayır, şezlongumuzun altındaki kedinin bir firavunun gözdesinin doğrudan torunu olduğunu söyleyen güzel bir internet efsanesi anlatmayacağız.","Bilim böyle işlemiyor.","Ama gerçek en az bunun kadar ilginç.","Antik DNA araştırmaları, Mısır'daki kedi popülasyonunun evcil kedilerin antik dünyaya yayılmasında gerçekten önemli bir rol oynadığını gösteriyor. Mısır genetik soyu özellikle klasik antik çağda geniş bir alana yayıldı.","Kediler de antik Mısır kültüründe gerçekten özel bir yere sahipti.","Bu yüzden bugünkü bir karşılaşma bazen neredeyse inanılmaz gelebiliyor.","Yıl 2026.","Bir plaj.","Kızıldeniz.","İnce bir kedi şezlongun altından çıkıyor.","Duruyor.","Başını kaldırıyor.","Doğrudan objektife bakıyor.","Ve bir anlığına bugünün Mısır'ı ile binlerce yıl önceki Mısır arasındaki mesafe kayboluyor gibi oluyor.","Aynı profil.","Aynı bakış.","Ve belki de insanların burada hizmet personeli olduğuna dair aynı sarsılmaz inanç.",
"🐈 P&D'NİN KÜÇÜK SIRRI","Bir Mısır kedisini fotoğraflamak istiyorsanız — peşinden gitmemeyi deneyin.","Çömelin.","Telefonunuzu aşağı indirin.","Ve bekleyin.","Kedilerin merakı bazen fotoğrafçının bütün işini yapıyor.","Fotoğraflarımıza bakılırsa bazı yerel modeller objektifi son derece ilginç bir nesne olarak görüyor.",
"💛 HURGADA'DA İSE TAMARA YAŞIYOR","Bu hikâyenin bütün karakterleri arasında kimseyle karıştırılamayacak biri var.","Parlak sarı.","Minicik.","Sosyal.","Ve kendinden tamamen emin.","Tamara.","Hurgada'daki bir dükkânda diğer muhabbet kuşlarıyla birlikte yaşıyor.","Akşam olunca şehir değişiyor.","Gündüzün sıcağı hafifliyor.","Rengârenk tabelalar yanıyor.","Açık dükkânlardan yağların ve Doğu parfümlerinin kokuları yayılıyor.","Bir yerde baharat ve kahve kokuyor.","Başka bir yerde — meyve.","Havada nargilenin hafif, tatlımsı dumanı, güneşte ısınmış taşın sıcaklığı ve denizin tuzlu nefesi birbirine karışıyor.","Bu Mısır akşamı senfonisinin tam ortasında da Tamara oturuyor.","Her yer ona uygun.","Bir insan eli — uygun.","Bir omuz — harika.","Bir baş — neredeyse VIP loca.","Fotoğraflara bakılırsa kimin kimi görmeye geldiği hâlâ tartışmaya açık.","Biz Tamara'yı görmeye geldik.","Tamara ise belli ki bizi görmeye geldi.",
"P&D'NİN KARARI:","Görevi: bilinmiyor.","İş yeri: Hurgada'da bir dükkân.","Uzmanlığı: halkla ilişkiler.","Özgüven seviyesi: genel müdür.",
"🐢 SONRA ZAMAN DURUYOR","Birkaç saniyede başına konan bir papağandan — acele etmek için hiçbir nedeni olmayan bir canlıya.","Kara kaplumbağaları.","Büyük bir tane.","Küçük bir tane.","Ve gerçekten minicik bir tane.","Biri avuca rahatça sığıyor ve çevresinde hiçbir şey olmuyormuş gibi yeşil yaprakları çiğnemeye devam ediyor.","İşte o zaman hayvanların dünyayı ne kadar farklı deneyimlediğini anlıyorsun.","İnsan çoktan on fotoğraf çekti.","Mesajlarını kontrol etti.","Sonra nereye gideceğini düşündü.","Kaplumbağa ise hâlâ ilk yaprağını bitiriyor.","Belki de yanlarında bu kadar huzurlu hissetmemizin nedeni bu.",
"P&D'DEN HAYAT TAVSİYESİ:","Bazen Mısır'ın en iyi yaşam koçu bir kilodan hafiftir ve kendi evini sırtında taşır.",
"🌊 ŞİMDİ İSE — SUYUN ALTINA","Burada tamamen farklı bir hayvan dünyası başlıyor.","Sıcak suda birkaç adım.","Bir maske.","Bir nefes.","Başın suyun yüzeyinin altına iniyor.","Ve tanıdık Mısır kayboluyor.","Baharat kokusu yok.","Sesler yok.","Nargile yok.","Sıcak hava yok.","Geriye yalnızca ışık, su ve renk kalıyor.",
"BAŞKA BİR MISIR'A HOŞ GELDİNİZ.","Kızıldeniz şaşırtıcı derecede berrak.","Güneş ışınları suyun içinden geçiyor ve deniz tabanında koşuyor.","Sonra gerçek bir renk patlaması başlıyor.","Turkuaz.","Elektrik mavisi.","Limon sarısı.","Mor.","Turuncu.","Pembe.","Gümüş.","Balıklar mercanların arasında koca bulutlar hâlinde hareket ediyor.","Bazıları mücevhere benziyor.","Diğerleri — çizgi film karakterlerine.","Bazıları ise bir tasarımcıya bütün renkleri aynı anda kullanma izni verilmiş gibi görünüyor.","Ve birden anlıyorsun:","Mısır'ın hiçbir filtreye ihtiyacı yok.",
"🐠 SU ALTI METROPOLÜ","Kızıldeniz, şnorkelle yüzmek için güzel bir yerden çok daha fazlası.","Devasa bir canlı dünya.","Mısır sularında binden fazla balık türü ve yüzlerce mercan türü yaşıyor.","Bazı türler özellikle bu bölgeye özgü.","Bu yüzden resifin komşu iki bölümü aynı şehrin birbirinden tamamen farklı iki semti gibi görünebiliyor.","Ama burada arabaların yerini balık sürüleri alıyor.","Evlerin yerini mercanlar.","Ve trafik sıkışıklıkları çok daha güzel.",
"🪸 İŞTE HÂLÂ PEK ÇOK KİŞİYİ ŞAŞIRTAN BİR GERÇEK","Mercan bir hayvandır.","Bitki değil.","Sıra dışı bir su altı taşı değil.","Hayvan.","Minik mercan polipleri koloniler hâlinde yaşar ve çok uzun zaman dilimlerinde bütün resiflere dönüşen yapılar oluşturur.","Yani şnorkel maskenizin altındaki o muhteşem “bahçe”, aslında devasa bir canlı şehirdir.","Ras Muhammed çevresinde sert ve yumuşak mercanların yüzlerce çeşidi kaydedilmiştir.","Ama daha da şaşırtıcı bir gerçek var.","Ras Muhammed Yarımadası'nın bir bölümü de on binlerce yıl önce yükselmiş antik bir fosil mercan resifinden oluşuyor.","Neredeyse inanılmaz bir manzara ortaya çıkıyor:","altınızda — yaşayan bir resif.","yakınınızda, suyun üzerinde — antik bir resifin izi.","Mısır, suyun altında bile geçmişi ve bugünü birleştirmeyi biliyor.",
"👑 ŞİMDİ KRALİÇEYLE TANIŞIN","Her güzel mahallenin yerel bir ünlüsü vardır.","Bizim resifimizin de var.","P&D, su altında çok zaman geçiren Mısırlı bir dalış eğitmeninden bir hikâye dinledi.","Bir turist resife baktığında pek çok balık görür.","Aynı insan oraya düzenli dalış yaptığında işler biraz değişir.","Yerleri tanımaya başlar.","Yarıkları.","Rotaları.","Bazen de — belirli sakinleri.","Dalgıcımız bize tekrar tekrar karşılaştığı bir müren balığını anlattı.","Onu tanıyor.","Müren tanıdık bir yerde ortaya çıkıyor.","Ve zamanla bu karşılaşmalar bir tür su altı tanışıklığına dönüşmüş.","Mürenin kendi açısından buna dostluk denebilir mi?","Ona sormadık.","Ama P&D bir şeye kesin karar verdi:","böyle bir karakter isimsiz kalamaz.",
"CLEOMORAY 👑","Cleomoray — resifin kraliçesi.","Evi: Kızıldeniz.","Rezidansı: bir mercan yarığı.","Pencereden manzara: 10/10.","Kıyafet kuralı: natural couture.","Karakteri: asil.","Diş sayısı: soru fazla kişisel bulundu.","Ziyaretçi kabulü: tamamen Majestelerinin ruh hâline bağlı.","Mısırlı dalgıcın ona ne dediğini biliyoruz.","Ama başka bir şey çok daha ilginç:","Cleomoray ona ne diyor?","“Tüplü insan” mı?","“Yine geldi” mi?","Yoksa onun için gerçekten kendine özgü bir müren ismi mi var?","Belki de Mısır'ın bazı sırlarını Kızıldeniz'e bırakmak en iyisidir.",
"🐬 GECELERİ ÇALIŞAN YUNUSLAR","Hikâyenin ilerleyen bölümünde insanlığın en sevdiği deniz karakterlerinden biri ortaya çıkıyor.","Yunus.","Ama burada da küçük bir Mısır sırrı var.","Marsa Alam yakınında Samadai Resifi bulunuyor — ünlü Yunus Evi.","Burada Stenella longirostris türünden yunuslarla karşılaşılabiliyor.","Ve çok ilginç bir günlük düzenleri var.","Çoğunlukla geceleri aktif olup besleniyorlar; gündüzleri ise dinlenmek için korunaklı lagünü kullanıyorlar.","Yani durum aşağı yukarı şöyle.","Turist uyanıyor.","Kahvaltı yapıyor.","Mayosunu giyiyor.","Neşeyle duyuruyor:","“Bugün yunusları görmeye gidiyoruz!”","Lagünün bir yerinde ise:","🐬","“Biraz sessiz olabilir misiniz? Gece vardiyasını yeni bitirdik.”",
"💙 EN GÜZEL KARŞILAŞMA, HAYVANIN KENDİ SEÇTİĞİDİR","Bu yüzden P&D, deniz hayvanlarını gözlemlemek için basit bir ilkeyi özellikle seviyor.","Mükemmel anı sahnelemeye çalışmayın.","Kendiliğinden gerçekleşmesine izin verin.","Bir yunus kendi isteğiyle yaklaşırsa — büyüleyici.","Bir balık kameranın önünden geçerse — fotoğrafı çekin.","Cleomoray bugün evde kalmaya karar verirse — kraliçe izinli.","Yaban hayatı tam da turistin programına uymadığı için güzel.",
"🌴 KIZILDENİZ'İN YANINDA BAŞKA NE YETİŞTİĞİNİ BİLİYOR MUSUNUZ?","Mangrovlar.","Bu da Mısır'ın bizi sürekli şaşırttığı karşıtlıklardan biri.","Çöl dağları.","Kum.","Mavi deniz.","Mercan resifleri.","Ve birden — yeşil mangrov çalılıkları.","Örneğin Şarm El-Şeyh yakınındaki Nabq doğal alanı, çöl manzarası, deniz, resifler ve mangrovların birleşimiyle bilinir.","Yine anlaşılıyor ki Mısır'ın hayvan dünyası ayrı ayrı resimlerden oluşmuyor.","Her şey birbirine bağlı.","Kıyı.","Bitkiler.","Resif.","Balıklar.","Kuşlar.","Kara hayvanları.","Deniz.","Tek bir devasa canlı dünya.",
"🦀 YENGEÇ YAYIN KURULU TOPLANTISINA GELDİ","O zaten burada.","Onunla Hula Hula Plajı'nda karşılaştık.","Ve şimdi hikâyemizde kendine ait bir yeri var.","Çünkü Tamara, plaj kedileri, kara kaplumbağaları, binlerce balık, yunuslar ve Cleomoray'den sonra bizi şaşırtmak artık zor.","Gerçi…","Burası Mısır.","Muhtemelen başaracaktır.",
"✨ P&D WILD EGYPT — AKILDA TUTULACAK 7 GERÇEK","01 — Mercanlar hayvandır.","“Su altı bahçeniz” gerçekten canlıdır.","02 — Kızıldeniz balık bakımından olağanüstü zengindir.","Burada binden fazla tür bulunur.","03 — Yunusların da dinlenmeye ihtiyacı vardır.","Samadai'de Stenella longirostris yunusları gece faaliyetlerinden sonra lagünü gündüz sığınağı olarak kullanır.","04 — Mısır, evcil kedilerin tarihinde önemli bir rol oynadı.","Antik DNA, Mısır kedi soyunun ülke sınırlarının çok ötesine yayıldığını gösterir.","05 — Çöl ve mangrovlar komşu olabilir.","Kızıldeniz, yan yana görmeyi hiç beklemeyeceğiniz manzaraları bir araya getirir.","06 — Sıra dışı bir resif hikâyesi için en iyi sohbet arkadaşı deneyimli bir yerel dalgıçtır.","“Burada ne yaşıyor?” yerine şunu sormayı deneyin:","“Burada kimi tanıyorsunuz?”","07 — Yolculuğunuzun en ilginç hayvanını önceden rezerve edemezsiniz.","Belki bir yunus olacaktır.","Belki — bir müren.","Ya da belki — telefonunuzun kendisine ait olduğuna karar veren küstah bir plaj kedisi.",
"☀️ YAŞAYAN MISIR","Belki de Mısır'ı bize özellikle yakın hissettiren hayvanlardır.","Çünkü her şeyi birbirine bağlarlar.","Antik çağı — bugüne.","Çölü — denize.","Şehri — doğaya.","Sıcak günü — ılık akşama.","Suyun üzerinde hava baharat, yağ, kahve, nargile ve deniz tuzu kokar.","Su altında kokular kaybolur — yerlerini mercanların ve balıkların çok parlak renkleri alır.","Plajda bir kedi gölgede uzanır; profili antik Mısır sanatından tanıdık gelir.","Hurgada'da Tamara birinin başına yerleşir.","Bir kara kaplumbağası sonsuz derecede önemli yaprağını bitirir.","Yunuslar gece faaliyetlerinden sonra dinlenir.","Bir mercan yarığında da Cleomoray oturur.","Bütün bunlar aynı anda olur.","Bir hayvanat bahçesinde değil.","Bir kitapta değil.","Bir ekranda değil.","Burada.","Aynı sıcak Mısır güneşinin altında.","Belki de Mısır'ın hayvan dünyasının hafızada bu kadar güçlü kalmasının nedeni budur.","Ayrı bir turistik atraksiyon gibi hissettirmez.","Mısır'ın kendisine işlenmiştir.","Denizine.","Sokaklarına.","Tarihine.","Renklerine.","Sıcaklığına.","Ve bir şekilde bizimle en uzun süre kalan o küçük tesadüfi karşılaşmalara.",
"🇪🇬 BURADA KİM YAŞIYOR? — MISIR","Mısır'ı sadece görmeyin.\nSize kimin baktığını da görün.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({ar:{editorialUI:{
listen:"استمع إلى المقال",stop:"إيقاف",back:"كل المقالات",previous:"الصورة السابقة",next:"الصورة التالية",location:"King Tut Bazar · الغردقة، مصر",locationNote:"تعيش تامارا في أحد المتاجر الصغيرة؛ وفي الجهة المقابلة توجد سلاحف برية وقطط.",crab:"شاطئ هولا هولا · مصر",generated:"Cleomoray",unavailable:"القراءة الصوتية غير متاحة في هذا المتصفح.",fallback:"يجري إعداد الترجمة الكاملة إلى اللغة المختارة. يُعرض المقال باللغة الإنجليزية.",shortTitle:"مصر أخرى",bestWorker:"أفضل موظف",source:"المصدر",factsTitle:"سبع حقائق عن مصر الحية",mauTitle:"قط الماو المصري",mauText:"يمكن للماو أن يصدر أصواتًا تشبه الزقزقة، وأن يحيّي أصحابه بترنيمات هادئة وعذبة.",mauAlt:"قط ماو مصري يظهر بكامل جسمه",catAlt:"قط يستريح فوق منضدة متجر في الغردقة",tamaraAlt:"تامارا تنظر مباشرة إلى العدسة",dolphinsLabel:"الدلافين",crabHeading:"🦀 وصل السلطعون إلى اجتماع التحرير",crabOpening:["إنه هنا بالفعل.","قابلناه على شاطئ هولا هولا.","والآن أصبح له مكانه الخاص في قصتنا."],
facts:[["للدلافين طريقتها الخاصة في «العناية بالبشرة».","قرب الغردقة تحتك الدلافين بأنواع معينة من المرجان والإسفنج. ويرجّح الباحثون أن موادها قد تساعد في العناية بالبشرة."],["للسلاحف «جوازات سفر مصوّرة».","في مياه البحر الأحمر المصرية، تُعرَف السلاحف البحرية فرديًا من نمط الحراشف على الرأس. وهكذا يمكن تسجيل اللقاءات المتكررة."],["تُعرَف الدلافين من زعانفها.","تساعد الندوب والشقوق في الزعنفة الظهرية باحثي الغردقة على تمييز الدلافين فرديًا دون تثبيت علامات عليها."],["في البحر مراعٍ لأبقار البحر.","تتغذى الأطوم على الأعشاب البحرية. ويضم خليج أبو دباب مروجًا واسعة تحت الماء توفر بيئة مناسبة لهذه الحيوانات."],["يمكن للغواصين المساعدة في دراسة السلاحف.","يجمع TurtleWatch مشاهدات الغواصين ومحبي السنوركل لفهم أماكن وجود السلاحف البحرية بصورة أفضل."],["يمكنكم دعم حيوان من بعيد.","يتيح ملجأ S.P.A.R.E. المصري دعم القطط والكلاب والحمير، حتى إن لم تتمكنوا من أخذها إلى المنزل."],["يمكن لقط الماو المصري أن «يزقزق».","قد تحيّي هذه القطط المنزلية المرقطة أصحابها بترنيمات هادئة وعذبة وأصوات تشبه الزقزقة."]]
},text:[
"🇪🇬 مصر أخرى: تلك التي تبادلك النظرات","قطط بوجوه تذكّرنا بالصور القديمة، وتامارا من الغردقة، وسلاحف برية، ودلافين بعد «المناوبة الليلية»، وأسماك بألوان النيون، وCleomoray — معارِفة تحت الماء لمدرّب غوص مصري.",
"هناك مصر الأهرامات.","وهناك مصر الفنادق والشواطئ.","وهناك مصر أخرى.","تختبئ تحت كرسي استلقاء، وتجلس على غصن بجوار متجر، وتمضغ الأوراق الخضراء ببطء، وتنطلق بين الشعاب المرجانية، وأحيانًا تطل من شق في الشعاب بتعبير يوحي بأنها تعرف جيدًا أنك جئت فقط لرؤيتها.","هذه هي مصر الحية.","وهذه هي مصر التي تستكشفها P&D.","ليست مجموعة حيوانات في موسوعة، بل عالمًا استثنائيًا من الكائنات التي تعيش إلى جانب البشر — في الشوارع، وعلى الشواطئ، وتحت سطح البحر الأحمر.","وكلما أطلت مراقبتها، ازداد هذا الشعور:","البشر هنا ليسوا الأبطال الوحيدين على الإطلاق.",
"أولًا تظهر القطط","عند الظهيرة الحارة، تبدو مصر وكأنها تبطئ إيقاعها.","يرتعش الهواء فوق الأرض الساخنة.","الرمل حار.","والجدران البيضاء تكاد تبهر العين.","وفي البعيد، يلمع البحر بدرجات زرقاء لا تُصدق.","وفي مكان ما، داخل شريط بارد من الظل، توجد دائمًا قطة.","تعرف القطط المصرية كيف تختار أفضل الأماكن.","تحت الطاولة.","تحت كرسي الاستلقاء.","بجوار المتجر.","على الشاطئ.","وأحيانًا — في المكان نفسه الذي كان شخص على وشك المرور منه.","تحافظ بعض القطط على مسافة ملكية.","وتقترب أخرى إلى حد يجعلك تحصل على صورة لأنف قط ضخم بدلًا من صورة شخصية.","أثناء تأمل صورنا، لاحظت P&D شيئًا لافتًا.","تبدو هذه القطط مألوفة.","جسم رشيق.","أرجل طويلة.","أذنان كبيرتان.","وجه ضيق.","عينان لوزيتان.","ولدى بعضها خطوط داكنة معبّرة حول العينين، كأنها مرسومة بالكحل المصري القديم.","أين رأينا هذه الهيئات من قبل؟","بالطبع.","في صور مصر القديمة.","في التماثيل الصغيرة.","في المتاحف.","في أعمال فنية عمرها آلاف السنين.",
"٣٠٠٠ عام. والموقف نفسه.","لن نروي لكم أسطورة جميلة من الإنترنت تزعم أن القطة تحديدًا تحت كرسي الاستلقاء لدينا هي سليلة مباشرة لقطة أحد الفراعنة المفضلة.","العلم لا يعمل بهذه الطريقة.","لكن الحقيقة لا تقل إثارة للاهتمام.","تُظهر دراسات الحمض النووي القديم أن جماعة القطط في مصر أدت بالفعل دورًا مهمًا في انتشار القطط المنزلية في العالم القديم. وانتشرت السلالة الوراثية المصرية على نطاق واسع خصوصًا خلال العصور الكلاسيكية القديمة.","وكان للقطط حقًا مكان خاص في الثقافة المصرية القديمة.","لذلك قد يبدو لقاء مع قطة اليوم أمرًا يكاد لا يُصدق.","نحن في عام ٢٠٢٦.","شاطئ.","البحر الأحمر.","تخرج قطة رشيقة من تحت كرسي استلقاء.","تتوقف.","ترفع رأسها.","تنظر مباشرة إلى العدسة.","ولثانية واحدة، يبدو أن المسافة بين مصر اليوم ومصر قبل آلاف السنين تختفي.","الملامح الجانبية نفسها.","النظرة نفسها.","وربما القناعة المطلقة نفسها بأن البشر هنا هم طاقم الخدمة.",
"🐈 سر P&D الصغير","إذا أردتم تصوير قطة مصرية — جرّبوا ألا تتبعوها.","اجلسوا في وضع القرفصاء.","اخفضوا الهاتف.","وانتظروا.","فضول القطط يؤدي أحيانًا كل عمل المصوّر.","وبحسب صورنا، تجد بعض العارضات المحليات أن العدسة شيء مثير جدًا للاهتمام.",
"💛 وفي الغردقة تعيش تامارا","بين جميع شخصيات هذه القصة، توجد شخصية لا يمكن الخلط بينها وبين أي أحد.","صفراء زاهية.","صغيرة جدًا.","اجتماعية.","وواثقة تمامًا من نفسها.","تامارا.","تعيش مع طيور بادجي أخرى في أحد متاجر الغردقة.","في المساء، تتغير المدينة.","تخف حرارة النهار.","تضيء اللافتات الملونة.","وتنساب من المتاجر المفتوحة روائح الزيوت والعطور الشرقية.","في مكان ما تفوح رائحة التوابل والقهوة.","وفي مكان آخر — الفاكهة.","يمتزج في الهواء دخان الشيشة الخفيف والحلو قليلًا مع دفء الحجر الذي سخّنته الشمس ونَفَس البحر المالح.","وفي قلب هذه السمفونية المسائية المصرية تجلس تامارا.","كل شيء يناسبها.","يد إنسان — مناسبة.","كتف — ممتاز.","رأس — يكاد يكون مقصورة لكبار الشخصيات.","وبحسب الصور، يبقى سؤال من جاء ليرى من مفتوحًا.","جئنا لنرى تامارا.","ومن الواضح أن تامارا جاءت لترانا.",
"حكم P&D:","الوظيفة: غير معروفة.","مكان العمل: متجر في الغردقة.","التخصص: العلاقات العامة.","مستوى الثقة بالنفس: مدير تنفيذي.",
"🐢 ثم يتوقف الزمن","من ببغاء يهبط على رأسك في ثوانٍ — إلى كائن ليس لديه أي سبب للعجلة.","سلاحف برية.","واحدة كبيرة.","وأخرى صغيرة.","وثالثة صغيرة جدًا.","تستقر إحداها براحة في راحة اليد، وتواصل مضغ الأوراق الخضراء وكأن شيئًا لا يحدث حولها.","وهنا تدرك مدى اختلاف تجربة الحيوانات للعالم.","لقد التقط الإنسان عشر صور بالفعل.","وتفقّد رسائله.","وفكّر في وجهته التالية.","أما السلحفاة فما زالت تنهي ورقتها الأولى.","ربما لهذا نشعر بكل هذا الهدوء بالقرب منها.",
"نصيحة P&D للحياة:","أحيانًا يزن أفضل مدرّب مصري للعافية أقل من كيلوغرام، ويحمل بيته على ظهره.",
"🌊 والآن — تحت الماء","هنا يبدأ عالم حيواني مختلف تمامًا.","بضع خطوات في الماء الدافئ.","قناع.","نَفَس.","ينزل الرأس تحت السطح.","وتختفي مصر المألوفة.","لا رائحة توابل.","لا أصوات.","لا شيشة.","لا هواء حار.","لا يبقى إلا الضوء والماء واللون.",
"مرحبًا بكم في مصر أخرى.","البحر الأحمر صافٍ على نحو مذهل.","تمر أشعة الشمس عبر الماء وتجري فوق قاع البحر.","ثم يبدأ انفجار حقيقي للألوان.","فيروزي.","أزرق كهربائي.","أصفر ليموني.","بنفسجي.","برتقالي.","وردي.","فضي.","تتحرك الأسماك بين الشعاب كأنها سحب كاملة.","بعضها يشبه المجوهرات.","وبعضها — شخصيات الرسوم المتحركة.","وبعضها يبدو كأن مصمّمًا سُمح له باستخدام جميع الألوان دفعة واحدة.","وفجأة تدرك:","مصر لا تحتاج إلى أي فلتر.",
"🐠 مدينة كبرى تحت الماء","البحر الأحمر أكثر من مجرد مكان جميل للسباحة بالسنوركل.","إنه عالم حي هائل.","تعيش في مياهه المصرية أكثر من ألف نوع من الأسماك ومئات الأنواع من المرجان.","وبعض الأنواع مميزة لهذه المنطقة تحديدًا.","لذلك قد يبدو جزآن متجاوران من الشعاب كحيّين مختلفين تمامًا في المدينة نفسها.","لكن أسراب الأسماك هنا تحل محل السيارات.","والمرجان يحل محل البيوت.","والازدحام أجمل بكثير.",
"🪸 حقيقة ما زالت تدهش كثيرين","المرجان حيوان.","ليس نباتًا.","وليس حجرًا غريبًا تحت الماء.","حيوان.","تعيش بوليبات المرجان الصغيرة في مستعمرات، وتبني على مدى فترات زمنية هائلة تراكيب تتحول إلى شعاب كاملة.","إذن «الحديقة» الرائعة تحت قناع السنوركل هي في الحقيقة مدينة حية هائلة.","سُجّلت مئات الأشكال من المرجان الصلب واللين حول رأس محمد.","لكن هناك حقيقة أكثر إدهاشًا.","جزء من شبه جزيرة رأس محمد نفسها يتكون من شعاب مرجانية قديمة متحجرة ارتفعت قبل عشرات آلاف السنين.","فتنشأ صورة تكاد لا تُصدق:","تحتك — شعاب حية.","وبالقرب منك، فوق الماء — أثر شعاب قديمة.","تعرف مصر كيف تصل الماضي بالحاضر حتى تحت الماء.",
"👑 والآن تعرّفوا إلى الملكة","لكل حي جميل شخصية محلية مشهورة.","ولشعابنا أيضًا.","سمعت P&D قصة من مدرّب غوص مصري يقضي وقتًا طويلًا تحت الماء.","عندما ينظر السائح إلى الشعاب، يرى أسماكًا كثيرة.","وعندما يغوص الشخص نفسه هناك بانتظام، تتغير الأمور قليلًا.","يبدأ في التعرف على الأماكن.","والشقوق.","والمسارات.","وأحيانًا — بعض السكان أنفسهم.","أخبرنا غواصنا عن سمكة موراي يلتقيها مرارًا.","إنه يتعرف عليها.","وتظهر في مكان مألوف.","ومع الوقت، تحولت هذه اللقاءات إلى ما يشبه معرفة تحت الماء.","هل يمكن أن نسمي ذلك صداقة من وجهة نظر الموراي نفسها؟","لم نسألها.","لكن P&D قررت أمرًا واحدًا بكل تأكيد:","شخصية كهذه لا يمكن أن تبقى بلا اسم.",
"CLEOMORAY 👑","Cleomoray — ملكة الشعاب.","الموطن: البحر الأحمر.","الإقامة: شق بين المرجان.","الإطلالة من النافذة: ١٠/١٠.","قواعد اللباس: natural couture.","الطبع: ملكي.","عدد الأسنان: اعتُبر السؤال شخصيًا أكثر من اللازم.","استقبال الزوار: بحسب مزاج جلالتها وحده.","نعرف ماذا يسميها الغواص المصري.","لكن شيئًا آخر أكثر إثارة للاهتمام:","ماذا تسميه Cleomoray؟","«ذلك الإنسان صاحب الأسطوانة»؟","«عاد مرة أخرى»؟","أم لديها فعلًا اسم خاص له بلغة الموراي؟","ربما من الأفضل أن نترك بعض أسرار مصر للبحر الأحمر.",
"🐬 دلافين تعمل ليلًا","في جزء لاحق من القصة تظهر إحدى الشخصيات البحرية المفضلة لدى البشر.","الدلفين.","لكن هنا أيضًا سر مصري صغير.","قرب مرسى علم تقع شعاب صمداي — بيت الدلافين الشهير.","يمكن هناك مشاهدة دلافين من نوع Stenella longirostris.","ولديها روتين يومي مثير للاهتمام.","تنشط وتتغذى أساسًا ليلًا، وتستخدم البحيرة المحمية للراحة نهارًا.","إذن تبدو الصورة تقريبًا هكذا.","يستيقظ السائح.","يتناول الإفطار.","يرتدي ملابس السباحة.","ويعلن بسعادة:","«اليوم سنذهب لرؤية الدلافين!»","وفي مكان ما داخل البحيرة:","🐬","«هل يمكنكم خفض أصواتكم؟ لقد انتهينا للتو من المناوبة الليلية.»",
"💙 أفضل لقاء هو الذي يختاره الحيوان","لهذا تحب P&D خصوصًا مبدأ بسيطًا لمراقبة الحيوانات البحرية.","لا تحاولوا إخراج اللحظة المثالية.","اتركوها تحدث.","إذا اقترب دلفين من تلقاء نفسه — فهذا سحر.","إذا مرت سمكة أمام الكاميرا — التقطوا الصورة.","إذا قررت Cleomoray البقاء في المنزل اليوم — فالملكة في إجازة.","الحياة البرية جميلة تحديدًا لأنها لا تتبع جدول السائح.",
"🌴 هل تعرفون ماذا ينمو أيضًا بجوار البحر الأحمر؟","أشجار المانغروف.","وهذا أحد التناقضات التي لا تتوقف مصر عن مفاجأتنا بها.","جبال صحراوية.","رمل.","بحر أزرق.","شعاب مرجانية.","وفجأة — غابات مانغروف خضراء.","مثلًا، تُعرف منطقة نبق الطبيعية قرب شرم الشيخ بجمعها بين المشهد الصحراوي والبحر والشعاب والمانغروف.","ومرة أخرى، يتضح أن حيوانات مصر لا تعيش في صور منفصلة.","كل شيء مترابط.","الشاطئ.","النباتات.","الشعاب.","الأسماك.","الطيور.","الحيوانات البرية.","البحر.","عالم حي واحد هائل.",
"🦀 وصل السلطعون إلى اجتماع التحرير","إنه هنا بالفعل.","قابلناه على شاطئ هولا هولا.","والآن أصبح له مكانه الخاص في قصتنا.","لأنه بعد تامارا وقطط الشاطئ والسلاحف البرية وآلاف الأسماك والدلافين وCleomoray، صار من الصعب مفاجأتنا.","مع ذلك…","هذه مصر.","ومن المرجح أنها ستنجح.",
"✨ P&D WILD EGYPT — ٧ حقائق تستحق التذكّر","٠١ — المرجان حيوان.","«حديقتكم تحت الماء» حية بالفعل.","٠٢ — البحر الأحمر غني بالأسماك على نحو استثنائي.","يوجد هنا أكثر من ألف نوع.","٠٣ — الدلافين تحتاج أيضًا إلى الراحة.","في صمداي تستخدم دلافين Stenella longirostris البحيرة ملاذًا نهاريًا بعد نشاطها الليلي.","٠٤ — لعبت مصر دورًا مهمًا في تاريخ القطط المنزلية.","يكشف الحمض النووي القديم انتشار السلالة الوراثية المصرية للقطط بعيدًا خارج البلاد.","٠٥ — قد تكون الصحراء والمانغروف جارتين.","يجمع البحر الأحمر مشاهد لا تتوقعون رؤيتها جنبًا إلى جنب.","٠٦ — أفضل شخص لقصة غير مألوفة عن الشعاب هو غواص محلي خبير.","بدلًا من «ماذا يعيش هنا؟»، جرّبوا السؤال:","«مَن تعرف هنا؟»","٠٧ — لا يمكنك حجز الحيوان الأكثر إثارة للاهتمام في رحلتك مسبقًا.","ربما يكون دلفينًا.","وربما — موراي.","أو ربما — قطة شاطئ مشاكسة تقرر أن هاتفك ملك لها.",
"☀️ مصر الحية","ربما الحيوانات هي ما يجعل مصر قريبة منا على نحو خاص.","لأنها تصل كل شيء ببعضه.","القدم — بالحاضر.","الصحراء — بالبحر.","المدينة — بالطبيعة.","النهار الحار — بالمساء الدافئ.","فوق الماء، يحمل الهواء روائح التوابل والزيوت والقهوة والشيشة وملح البحر.","تحت الماء تختفي الروائح — وتحل محلها الألوان الزاهية جدًا للمرجان والأسماك.","على الشاطئ تستلقي قطة في الظل بملامح جانبية مألوفة من الفن المصري القديم.","وفي الغردقة تستقر تامارا على رأس أحدهم.","وتنهي سلحفاة برية ورقتها ذات الأهمية التي لا تنتهي.","وتستريح الدلافين بعد نشاطها الليلي.","وفي شق بين المرجان تجلس Cleomoray.","كل هذا يحدث في الوقت نفسه.","ليس في حديقة حيوان.","ولا في كتاب.","ولا على شاشة.","هنا.","تحت شمس مصر الحارة نفسها.","وربما لهذا تبقى حيوانات مصر راسخة في الذاكرة.","لا تبدو وكأنها معلم منفصل.","بل هي منسوجة في مصر نفسها.","في بحرها.","وشوارعها.","وتاريخها.","وألوانها.","ودفئها.","وفي تلك اللقاءات الصغيرة العفوية التي تبقى معنا، بطريقة ما، أطول من غيرها.",
"🇪🇬 مَن يعيش هنا؟ — مصر","لا تكتفوا برؤية مصر.\nاكتشفوا مَن يبادلكم النظرات.","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();(function(){"use strict";const add=window.PetsDogueEgypt?.add;if(!add)throw new Error("Load the shared Egypt dictionary first");add({hi:{editorialUI:{
listen:"लेख सुनें",stop:"रोकें",back:"सभी लेख",previous:"पिछली तस्वीर",next:"अगली तस्वीर",location:"King Tut Bazar · हर्गहाडा, मिस्र",locationNote:"तमारा एक छोटी दुकान में रहती है; सामने की ओर स्थलीय कछुए और बिल्लियाँ हैं।",crab:"हुला हुला समुद्रतट · मिस्र",generated:"Cleomoray",unavailable:"इस ब्राउज़र में पाठ का वाचन उपलब्ध नहीं है।",fallback:"चुनी गई भाषा का पूरा अनुवाद तैयार किया जा रहा है। अंग्रेज़ी लेख दिखाया जा रहा है।",shortTitle:"एक और मिस्र",bestWorker:"सबसे अच्छा कर्मचारी",source:"स्रोत",factsTitle:"जीवंत मिस्र के बारे में सात तथ्य",mauTitle:"मिस्र की माउ बिल्ली",mauText:"माउ चहचहाहट जैसी आवाज़ें निकाल सकती है और अपने लोगों का स्वागत हल्की, सुरीली ध्वनियों से कर सकती है।",mauAlt:"मिस्र की माउ बिल्ली की पूरे शरीर की तस्वीर",catAlt:"हर्गहाडा की दुकान के काउंटर पर आराम करती बिल्ली",tamaraAlt:"तमारा सीधे कैमरे के लेंस में देख रही है",dolphinsLabel:"डॉल्फ़िन",crabHeading:"🦀 केकड़ा संपादकीय बैठक में आ गया",crabOpening:["वह पहले से यहाँ है।","हम उससे हुला हुला समुद्रतट पर मिले।","और अब हमारी कहानी में उसकी अपनी जगह है।"],
facts:[["डॉल्फ़िन की अपनी “त्वचा की देखभाल” है।","हर्गहाडा के पास डॉल्फ़िन कुछ ख़ास मूंगों और स्पंज जीवों से शरीर रगड़ते हैं। शोधकर्ताओं का अनुमान है कि उनके पदार्थ त्वचा की देखभाल में मदद कर सकते हैं।"],["कछुओं के “फ़ोटो पासपोर्ट” होते हैं।","मिस्र के लाल सागर में समुद्री कछुओं की व्यक्तिगत पहचान सिर के शल्कों के पैटर्न से की जाती है। इस तरह बार-बार होने वाली मुलाक़ातें दर्ज की जा सकती हैं।"],["डॉल्फ़िन अपने पंख से पहचाने जाते हैं।","पीठ के पंख पर निशान और कटाव हर्गहाडा के शोधकर्ताओं को बिना टैग लगाए अलग-अलग डॉल्फ़िन पहचानने में मदद करते हैं।"],["समुद्र में समुद्री गायों के लिए चरागाह हैं।","डुगोंग समुद्री घास खाते हैं। अबू दब्बाब खाड़ी के बड़े पानी के नीचे के घास के मैदान इन जानवरों के लिए उपयुक्त आवास देते हैं।"],["गोताखोर कछुओं के अध्ययन में मदद कर सकते हैं।","TurtleWatch गोताखोरों और स्नॉर्कलिंग करने वालों के अवलोकन जुटाता है, ताकि समुद्री कछुओं की मौजूदगी वाले स्थान बेहतर समझे जा सकें।"],["आप दूर से भी किसी जानवर की मदद कर सकते हैं।","मिस्र का S.P.A.R.E. आश्रय बिल्लियों, कुत्तों और गधों की सहायता का अवसर देता है, भले ही आप उन्हें घर न ले जा सकें।"],["मिस्र की माउ बिल्ली “चहचहा” सकती है।","ये धब्बेदार घरेलू बिल्लियाँ अपने लोगों का स्वागत हल्की, सुरीली ध्वनियों और चहचहाहट जैसी आवाज़ों से कर सकती हैं।"]]
},text:[
"🇪🇬 एक और मिस्र: जो आपको भी देखता है","प्राचीन चित्रों जैसे चेहरे वाली बिल्लियाँ, हर्गहाडा की तमारा, कछुए, “रात की पाली” के बाद आराम करते डॉल्फ़िन, निऑन रंग की मछलियाँ और Cleomoray — मिस्र के एक गोताखोरी प्रशिक्षक की पानी के नीचे की परिचित।",
"एक मिस्र पिरामिडों का है।","एक मिस्र होटलों और समुद्रतटों का है।","और एक मिस्र कुछ और भी है।","वह आरामकुर्सी के नीचे छिपता है, दुकान के पास एक डाल पर बैठता है, हरी पत्तियाँ धीरे-धीरे चबाता है, मूंगों के बीच तैरता है और कभी चट्टान की दरार से ऐसे झाँकता है, जैसे उसे अच्छी तरह पता हो कि आप केवल उसे देखने आए हैं।","यह जीवंत मिस्र है।","P&D इसी मिस्र की खोज करता है।","किसी विश्वकोश में जानवरों का संग्रह नहीं, बल्कि इंसानों के साथ रहने वाले जीवों की असाधारण दुनिया — सड़कों पर, समुद्रतटों पर और लाल सागर की सतह के नीचे।","और जितना अधिक आप उन्हें देखते हैं, उतना ही यह एहसास गहरा होता है:","यहाँ केवल इंसान ही मुख्य पात्र नहीं हैं।",
"सबसे पहले बिल्लियाँ दिखाई देती हैं","गर्म दोपहर में मिस्र जैसे अपनी रफ़्तार धीमी कर देता है।","तपी हुई धरती के ऊपर हवा काँपती है।","रेत गर्म है।","सफ़ेद दीवारें आँखें चौंधिया देती हैं।","दूर समुद्र नीले रंग के अविश्वसनीय रूपों में चमकता है।","और कहीं न कहीं, छाया की ठंडी पट्टी में, हमेशा एक बिल्ली होती है।","मिस्र की बिल्लियाँ सबसे अच्छी जगह चुनना जानती हैं।","मेज़ के नीचे।","आरामकुर्सी के नीचे।","दुकान के पास।","समुद्रतट पर।","और कभी — ठीक वहीं, जहाँ से कोई इंसान गुज़रना चाहता है।","कुछ शाही दूरी बनाए रखती हैं।","दूसरी इतनी पास आ जाती हैं कि चेहरे की तस्वीर के बजाय आपको एक विशाल बिल्ली की नाक की तस्वीर मिलती है।","अपनी तस्वीरों को देखते हुए P&D ने एक दिलचस्प बात देखी।","वे जानी-पहचानी लगती हैं।","पतला शरीर।","लंबे पैर।","बड़े कान।","संकरा चेहरा।","बादाम जैसी आँखें।","कुछ की आँखों के आसपास गहरी, स्पष्ट रेखाएँ हैं, मानो प्राचीन मिस्र के काजल से बनाई गई हों।","हमने ये आकृतियाँ पहले कहाँ देखी हैं?","बिल्कुल।","प्राचीन मिस्र के चित्रों में।","छोटी मूर्तियों में।","संग्रहालयों में।","हज़ारों साल पुरानी कला में।",
"3,000 साल। वही अंदाज़।","नहीं, हम इंटरनेट की कोई सुंदर कहानी नहीं सुनाएँगे कि हमारी आरामकुर्सी के नीचे बैठी यही बिल्ली किसी फ़राओ की पसंदीदा बिल्ली की सीधी वंशज है।","विज्ञान ऐसे काम नहीं करता।","लेकिन सच भी उतना ही दिलचस्प है।","प्राचीन डीएनए के अध्ययन बताते हैं कि मिस्र की बिल्ली आबादी ने प्राचीन दुनिया में घरेलू बिल्लियों के प्रसार में वास्तव में महत्वपूर्ण भूमिका निभाई थी। मिस्र की आनुवंशिक वंशरेखा विशेष रूप से शास्त्रीय प्राचीन काल में दूर तक फैली।","और प्राचीन मिस्र की संस्कृति में बिल्लियों का सचमुच एक विशेष स्थान था।","इसलिए आज की कोई मुलाक़ात कभी-कभी लगभग अविश्वसनीय लग सकती है।","साल 2026 है।","एक समुद्रतट।","लाल सागर।","एक पतली बिल्ली आरामकुर्सी के नीचे से निकलती है।","रुकती है।","सिर उठाती है।","सीधे कैमरे के लेंस में देखती है।","और एक पल के लिए आज के मिस्र और हज़ारों साल पहले के मिस्र के बीच की दूरी जैसे मिट जाती है।","वही पार्श्व आकृति।","वही नज़र।","और शायद वही अटूट विश्वास कि यहाँ इंसान सेवा करने वाले कर्मचारी हैं।",
"🐈 P&D का छोटा-सा रहस्य","यदि आप मिस्र की किसी बिल्ली की तस्वीर लेना चाहते हैं — उसका पीछा न करने की कोशिश करें।","नीचे बैठें।","फ़ोन नीचे करें।","और इंतज़ार करें।","बिल्ली की जिज्ञासा कभी-कभी फ़ोटोग्राफ़र का पूरा काम कर देती है।","और हमारी तस्वीरों से लगता है कि कुछ स्थानीय मॉडल कैमरे के लेंस को बेहद दिलचस्प वस्तु समझती हैं।",
"💛 और हर्गहाडा में तमारा रहती है","इस कहानी के सभी पात्रों में एक ऐसी है, जिसे किसी और से नहीं मिलाया जा सकता।","चमकीली पीली।","बहुत छोटी।","मिलनसार।","और अपने आप पर पूरी तरह विश्वास रखने वाली।","तमारा।","वह हर्गहाडा की एक दुकान में दूसरे बजरीगर पक्षियों के साथ रहती है।","शाम को शहर बदल जाता है।","दिन की गर्मी कम होती है।","रंगीन बोर्ड रोशन होते हैं।","खुली दुकानों से तेलों और पूर्वी इत्र की ख़ुशबू आती है।","कहीं मसालों और कॉफ़ी की महक है।","कहीं और — फलों की।","हवा में हुक्के का हल्का, मीठा धुआँ, धूप में गर्म हुए पत्थर की तपिश और समुद्र की नमकीन साँस मिल जाती है।","और मिस्र की इस शाम के संगीत के बीच तमारा बैठी है।","हर जगह उसके लिए ठीक है।","इंसान का हाथ — उपयुक्त।","कंधा — बढ़िया।","सिर — लगभग वीआईपी बॉक्स।","तस्वीरों से लगता है कि कौन किसे देखने आया था, यह सवाल अभी खुला है।","हम तमारा को देखने आए थे।","तमारा साफ़ तौर पर हमें देखने आई थी।",
"P&D का फ़ैसला:","पद: अज्ञात।","कार्यस्थल: हर्गहाडा की एक दुकान।","विशेषज्ञता: जनसंपर्क।","आत्मविश्वास का स्तर: मुख्य कार्यकारी अधिकारी।",
"🐢 फिर समय ठहर जाता है","उस तोते से, जो कुछ सेकंड में आपके सिर पर बैठ जाता है — ऐसे जीव तक, जिसे जल्दी करने की कोई वजह नहीं।","स्थलीय कछुए।","एक बड़ा।","एक छोटा।","और एक सचमुच बहुत छोटा।","एक हथेली में आराम से समा जाता है और हरी पत्तियाँ चबाता रहता है, जैसे आसपास कुछ हो ही न रहा हो।","और यहाँ समझ आता है कि जानवर दुनिया को कितनी अलग तरह से महसूस करते हैं।","इंसान पहले ही दस तस्वीरें ले चुका है।","अपने संदेश देख चुका है।","सोच चुका है कि आगे कहाँ जाना है।","और कछुआ अभी भी अपनी पहली पत्ती ख़त्म कर रहा है।","शायद इसलिए उनके पास इतना सुकून मिलता है।",
"P&D की जीवन सलाह:","कभी-कभी मिस्र का सबसे अच्छा स्वास्थ्य प्रशिक्षक एक किलो से भी कम वज़न का होता है और अपना घर पीठ पर लिए चलता है।",
"🌊 और अब — पानी के नीचे","यहाँ एक बिल्कुल अलग जीव-जगत शुरू होता है।","गर्म पानी में कुछ क़दम।","एक मास्क।","एक साँस।","सिर सतह के नीचे जाता है।","और जाना-पहचाना मिस्र ग़ायब हो जाता है।","मसालों की ख़ुशबू नहीं।","आवाज़ें नहीं।","हुक्का नहीं।","गर्म हवा नहीं।","बस रोशनी, पानी और रंग रह जाते हैं।",
"एक और मिस्र में आपका स्वागत है।","लाल सागर आश्चर्यजनक रूप से साफ़ है।","सूरज की किरणें पानी के पार जाती हैं और समुद्र की तह पर दौड़ती हैं।","फिर रंगों का असली विस्फोट शुरू होता है।","फ़िरोज़ी।","चमकीला नीला।","नींबू पीला।","बैंगनी।","नारंगी।","गुलाबी।","चाँदी जैसा।","मछलियाँ मूंगों के बीच पूरे बादलों की तरह चलती हैं।","कुछ गहनों जैसी दिखती हैं।","दूसरी — कार्टून पात्रों जैसी।","कुछ ऐसी लगती हैं जैसे किसी डिज़ाइनर को सारे रंग एक साथ इस्तेमाल करने की अनुमति मिल गई हो।","और अचानक समझ आता है:","मिस्र को किसी फ़िल्टर की ज़रूरत नहीं।",
"🐠 पानी के नीचे का महानगर","लाल सागर स्नॉर्कलिंग की किसी सुंदर जगह से कहीं अधिक है।","यह एक विशाल जीवंत दुनिया है।","इसके मिस्र वाले जलक्षेत्र में एक हज़ार से अधिक मछली प्रजातियाँ और सैकड़ों मूंगा प्रजातियाँ रहती हैं।","कुछ प्रजातियाँ विशेष रूप से इसी क्षेत्र की हैं।","इसलिए रीफ़ के दो पड़ोसी हिस्से एक ही शहर के दो बिल्कुल अलग इलाक़ों जैसे दिख सकते हैं।","लेकिन यहाँ कारों की जगह मछलियों के झुंड हैं।","घरों की जगह मूंगे।","और ट्रैफ़िक जाम कहीं अधिक सुंदर हैं।",
"🪸 यह तथ्य आज भी बहुतों को चौंकाता है","मूंगा एक जानवर है।","पौधा नहीं।","पानी के नीचे का कोई अनोखा पत्थर नहीं।","जानवर।","छोटे मूंगा पॉलीप समूहों में रहते हैं और बहुत लंबे समय में ऐसी संरचनाएँ बनाते हैं, जो पूरी रीफ़ बन जाती हैं।","इसलिए आपके स्नॉर्कल मास्क के नीचे दिखने वाला शानदार “बगीचा” वास्तव में एक विशाल जीवंत शहर है।","रास मोहम्मद के आसपास कठोर और नरम मूंगों के सैकड़ों रूप दर्ज किए गए हैं।","लेकिन एक और अधिक आश्चर्यजनक तथ्य है।","रास मोहम्मद प्रायद्वीप का एक हिस्सा स्वयं एक प्राचीन जीवाश्म मूंगा रीफ़ से बना है, जो दसियों हज़ार साल पहले ऊपर उठा था।","इससे लगभग अविश्वसनीय दृश्य बनता है:","आपके नीचे — जीवित रीफ़।","और पास ही, पानी के ऊपर — प्राचीन रीफ़ का निशान।","मिस्र पानी के नीचे भी अतीत और वर्तमान को जोड़ना जानता है।",
"👑 अब रानी से मिलिए","हर अच्छे इलाक़े में एक स्थानीय मशहूर हस्ती होती है।","हमारी रीफ़ में भी है।","P&D ने पानी के नीचे बहुत समय बिताने वाले मिस्र के एक गोताखोरी प्रशिक्षक से एक कहानी सुनी।","जब कोई पर्यटक रीफ़ को देखता है, तो उसे बहुत सारी मछलियाँ दिखाई देती हैं।","जब वही व्यक्ति वहाँ नियमित गोता लगाता है, तो चीज़ें कुछ बदल जाती हैं।","वह जगहें पहचानने लगता है।","दरारें।","रास्ते।","और कभी-कभी — कुछ ख़ास निवासी।","हमारे गोताखोर ने एक मोरे ईल के बारे में बताया, जिससे वह बार-बार मिलता है।","वह उसे पहचानता है।","वह मछली एक जानी-पहचानी जगह पर दिखाई देती है।","और समय के साथ ये मुलाक़ातें पानी के नीचे की एक तरह की जान-पहचान बन गई हैं।","क्या मोरे ईल के अपने नज़रिए से इसे दोस्ती कहा जा सकता है?","हमने उससे नहीं पूछा।","लेकिन P&D ने एक बात निश्चित तय की:","ऐसा पात्र बिना नाम के नहीं रह सकता।",
"CLEOMORAY 👑","Cleomoray — रीफ़ की रानी।","घर: लाल सागर।","निवास: मूंगों की एक दरार।","खिड़की से नज़ारा: 10/10।","पहनावे का नियम: natural couture।","स्वभाव: शाही।","दाँतों की संख्या: सवाल बहुत निजी माना गया।","मेहमानों का स्वागत: पूरी तरह महामहिम के मूड पर निर्भर।","हम जानते हैं कि मिस्र का गोताखोर उसे क्या कहता है।","लेकिन एक और बात अधिक दिलचस्प है:","Cleomoray उसे क्या कहती है?","“सिलिंडर वाला इंसान”?","“फिर आ गया”?","या क्या उसके लिए उसका अपना कोई मोरे नाम है?","शायद मिस्र के कुछ रहस्यों को लाल सागर पर ही छोड़ना बेहतर है।",
"🐬 रात में काम करने वाले डॉल्फ़िन","कहानी में आगे इंसानों के पसंदीदा समुद्री पात्रों में से एक आता है।","डॉल्फ़िन।","लेकिन यहाँ भी मिस्र का एक छोटा-सा रहस्य है।","मार्सा आलम के पास समदाई रीफ़ है — मशहूर डॉल्फ़िन हाउस।","वहाँ Stenella longirostris प्रजाति के डॉल्फ़िन मिलते हैं।","और उनकी दिनचर्या बहुत दिलचस्प है।","वे मुख्य रूप से रात में सक्रिय होकर भोजन करते हैं और दिन में आराम के लिए सुरक्षित लैगून का इस्तेमाल करते हैं।","इसलिए स्थिति कुछ ऐसी दिखती है।","पर्यटक जागता है।","नाश्ता करता है।","तैराकी के कपड़े पहनता है।","ख़ुशी से घोषणा करता है:","“आज हम डॉल्फ़िन देखने जा रहे हैं!”","और लैगून में कहीं:","🐬","“क्या आप थोड़ा धीरे बोल सकते हैं? हमारी रात की पाली अभी ख़त्म हुई है।”",
"💙 सबसे अच्छी मुलाक़ात वह है जिसे जानवर चुनता है","इसलिए P&D समुद्री जानवरों को देखने का एक सरल सिद्धांत विशेष रूप से पसंद करता है।","सही पल को ज़बरदस्ती बनाने की कोशिश न करें।","उसे अपने आप होने दें।","अगर डॉल्फ़िन ख़ुद पास आए — तो वह जादुई है।","अगर मछली कैमरे के सामने से तैरे — तस्वीर लें।","अगर Cleomoray आज घर में रहने का फ़ैसला करे — तो रानी की छुट्टी है।","वन्यजीवन सुंदर इसलिए है क्योंकि वह पर्यटक की समय-सारणी नहीं मानता।",
"🌴 क्या आप जानते हैं कि लाल सागर के पास और क्या उगता है?","मैंग्रोव।","और यह उन विरोधाभासों में से एक है, जिनसे मिस्र हमें लगातार हैरान करता है।","रेगिस्तानी पहाड़।","रेत।","नीला समुद्र।","मूंगा रीफ़।","और अचानक — हरे मैंग्रोव के झुरमुट।","उदाहरण के लिए, शर्म अल-शेख के पास नबक प्राकृतिक क्षेत्र रेगिस्तानी दृश्य, समुद्र, रीफ़ और मैंग्रोव के मेल के लिए जाना जाता है।","फिर समझ आता है कि मिस्र का जीव-जगत अलग-अलग तस्वीरों में नहीं बँटा है।","सब कुछ जुड़ा है।","किनारा।","पौधे।","रीफ़।","मछलियाँ।","पक्षी।","ज़मीन के जानवर।","समुद्र।","एक विशाल जीवंत दुनिया।",
"🦀 केकड़ा संपादकीय बैठक में आ गया","वह पहले से यहाँ है।","हम उससे हुला हुला समुद्रतट पर मिले।","और अब हमारी कहानी में उसकी अपनी जगह है।","क्योंकि तमारा, समुद्रतट की बिल्लियों, कछुओं, हज़ारों मछलियों, डॉल्फ़िन और Cleomoray के बाद हमें चौंकाना मुश्किल है।","हालाँकि…","यह मिस्र है।","शायद वह कर ही लेगा।",
"✨ P&D WILD EGYPT — याद रखने लायक 7 तथ्य","01 — मूंगे जानवर हैं।","आपका “पानी के नीचे का बगीचा” सचमुच जीवित है।","02 — लाल सागर मछलियों से असाधारण रूप से समृद्ध है।","यहाँ एक हज़ार से अधिक प्रजातियाँ मिलती हैं।","03 — डॉल्फ़िन को भी आराम चाहिए।","समदाई में Stenella longirostris डॉल्फ़िन रात की गतिविधियों के बाद लैगून को दिन के आश्रय के रूप में इस्तेमाल करते हैं।","04 — घरेलू बिल्लियों के इतिहास में मिस्र की महत्वपूर्ण भूमिका रही है।","प्राचीन डीएनए मिस्र की बिल्ली वंशरेखा का देश से बहुत दूर तक फैलना दिखाता है।","05 — रेगिस्तान और मैंग्रोव पड़ोसी हो सकते हैं।","लाल सागर ऐसे दृश्यों को जोड़ता है, जिन्हें आप साथ देखने की उम्मीद नहीं करेंगे।","06 — रीफ़ की कोई अनोखी कहानी सुनने के लिए सबसे अच्छा साथी अनुभवी स्थानीय गोताखोर है।","“यहाँ क्या रहता है?” के बजाय पूछकर देखें:","“आप यहाँ किसे जानते हैं?”","07 — यात्रा के सबसे दिलचस्प जानवर को पहले से बुक नहीं किया जा सकता।","शायद वह डॉल्फ़िन होगा।","शायद — मोरे ईल।","या शायद — समुद्रतट की एक शरारती बिल्ली, जो तय कर ले कि आपका फ़ोन उसका है।",
"☀️ जीवंत मिस्र","शायद जानवर ही मिस्र को हमें विशेष रूप से अपना महसूस कराते हैं।","क्योंकि वे सब कुछ जोड़ते हैं।","प्राचीनता को — वर्तमान से।","रेगिस्तान को — समुद्र से।","शहर को — प्रकृति से।","गर्म दिन को — सुहानी शाम से।","पानी के ऊपर हवा में मसालों, तेलों, कॉफ़ी, हुक्के और समुद्री नमक की महक है।","पानी के नीचे महक ग़ायब हो जाती है — उसकी जगह मूंगों और मछलियों के बेहद चमकीले रंग आ जाते हैं।","समुद्रतट पर एक बिल्ली छाया में लेटी है, जिसका चेहरा प्राचीन मिस्र की कला से जाना-पहचाना लगता है।","हर्गहाडा में तमारा किसी के सिर पर बैठ जाती है।","एक कछुआ अपनी अंतहीन महत्वपूर्ण पत्ती ख़त्म करता है।","डॉल्फ़िन रात की गतिविधियों के बाद आराम करते हैं।","और मूंगों की किसी दरार में Cleomoray बैठी है।","यह सब एक ही समय पर होता है।","किसी चिड़ियाघर में नहीं।","किसी किताब में नहीं।","किसी स्क्रीन पर नहीं।","यहाँ।","मिस्र के उसी गर्म सूरज के नीचे।","और शायद इसी वजह से मिस्र का जीव-जगत यादों में इतना गहरा रह जाता है।","वह अलग आकर्षण जैसा नहीं लगता।","वह ख़ुद मिस्र में बुना हुआ है।","उसके समुद्र में।","उसकी सड़कों में।","उसके इतिहास में।","उसके रंगों में।","उसकी गर्माहट में।","और उन छोटी संयोगवश मुलाक़ातों में, जो किसी तरह सबसे लंबे समय तक हमारे साथ रहती हैं।",
"🇪🇬 यहाँ कौन रहता है? — मिस्र","केवल मिस्र को मत देखिए।\nदेखिए कि आपको कौन देख रहा है।","PETS & DOGUE\nOne world. Every pet."
].join("\n\n")}});})();
