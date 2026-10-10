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
