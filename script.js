// English lives in the HTML. Russian and Kazakh replace it by data-i18n key.
const T = {
  ru: {
    skip: "К проектам",
    navWork: "Проекты", navAbout: "Обо мне", navContact: "Связаться",
    status: "Открыт к работе над бэкендом и автоматизацией",
    heroTitle: "Бэкенд на Python и автоматизация для бизнеса на записях, заявках и данных",
    heroLead: "Я делаю ту часть, которую не видно, пока она не сломалась: повтор, replay, проверку, которая не даст записать двоих на одну минуту. Один проект принимает настоящие записи в продакшене, остальные работают с тестами и скриншотами, весь код открыт на GitHub.",
    ctaWork: "Смотреть проекты",
    logCaption: "Сценарии из демо-данных проектов ниже",
    workTitle: "Проекты",
    workNote: "Число тестов из последнего прогона каждого проекта",
    sbLive: "Работает в продакшене",
    sbText: "Онлайн-запись для салонов, клиник и студий. Клиент выбирает услугу, мастера и реальное свободное время, записывается на визит из нескольких услуг одной фразой AI-ассистенту и оставляет отзыв после.",
    fStack: "Стек", fRelease: "Релиз", fTests: "Тесты",
    sbCi: "CI на настоящей PostgreSQL",
    sbApk: "Android-приложение", code: "Код",
    dayTitle: "Пятница · Аида, стрижки",
    slot10: "Дана П. · стрижка", slot12: "Лев М. · окрашивание", slot14: "Майя Т. · стрижка", slot16: "Нора Ф. · маникюр",
    free: "свободно",
    refused: "9 отклонено",
    dayCaption: "Двойную запись отклоняет сама PostgreSQL: десять запросов на одно окно дают ровно одну запись",
    aiveraText: "Помощник учителя: планы уроков, тесты, отзывы на работы и письма родителям с экспортом в Word и PDF.",
    relayText: "Заявка из вебхука проходит AI-оценку, CRM, таблицу, письмо и уведомление команде. Упавший шаг повторяется, а потом ждёт, чтобы продолжить с того места, где остановился.",
    leadText: "Оценивает входящие заявки, отдаёт каждую нужному человеку и показывает, кому ответить следующим, пока не сгорел срок ответа.",
    logText: "Читает лог-файлы приложения и сворачивает шум в инциденты: 114 строк ошибок в демо-день превращаются в 6. Оповещения уходят в Telegram.",
    dropText: "Следит за папкой с выгрузками CSV и JSON, проверяет каждую строку и задерживает битые, пустые и повторные файлы с точной причиной.",
    invoiceTitle: "Обработка счетов",
    invoiceText: "Достаёт из PDF-счетов поставщика, номер, даты и суммы, сам оценивает уверенность и отправляет сомнительные человеку.",
    hookTitle: "Монитор вебхуков",
    hookText: "Принимает вебхуки, пересылает их с повторами и показывает каждую попытку доставки, чтобы потерянное событие можно было найти и отправить снова.",
    moreText: "Парсеры, чистка CSV и Excel, синхронизация API и старые эксперименты",
    aboutTitle: "Обо мне",
    about1: "Я бэкенд-разработчик на Python. Большая часть моей работы находится между системами: форма и CRM, папка с выгрузками и база данных, мобильное приложение и сервер, который держит правила.",
    about2: "Мне важно, что происходит, когда что-то ломается. Провайдер не ответил, файл пришёл недокопированным, два клиента нажали «записаться» в одну секунду. Именно от этого зависит, можно ли бизнесу положиться на систему, поэтому туда и уходит основное время.",
    contactTitle: "Связаться",
    contactText: "Нужен бэкенд, интеграция или автоматизация, которая продолжает работать, когда что-то ломается? Напишите мне.",
    top: "Наверх"
  },
  kk: {
    skip: "Жобаларға",
    navWork: "Жобалар", navAbout: "Мен туралы", navContact: "Байланыс",
    status: "Бэкенд және автоматтандыру жұмысына ашықпын",
    heroTitle: "Жазылу, өтінім және деректерге сүйенетін бизнеске Python бэкенд пен автоматтандыру",
    heroLead: "Мен бұзылғанша ешкім көрмейтін бөлікті жасаймын: қайталау, replay, бір минутқа екі адамды жазуға жол бермейтін тексеру. Бір жоба өндірісте нақты жазылуларды қабылдайды, қалғандары тесттермен және скриншоттармен жұмыс істейді, бүкіл код GitHub-та ашық.",
    ctaWork: "Жобаларды көру",
    logCaption: "Төмендегі жобалардың демо деректеріндегі сценарийлер",
    workTitle: "Жобалар",
    workNote: "Тест саны әр жобаның соңғы іске қосылуынан алынған",
    sbLive: "Өндірісте жұмыс істейді",
    sbText: "Салондар, клиникалар мен студияларға арналған онлайн жазылу. Клиент қызметті, шеберді және нақты бос уақытты таңдайды, бірнеше қызметтен тұратын сапарға AI көмекшіге бір сөйлеммен жазылады және кейін пікір қалдырады.",
    fStack: "Стек", fRelease: "Релиз", fTests: "Тесттер",
    sbCi: "CI нақты PostgreSQL-да",
    sbApk: "Android қосымшасы", code: "Код",
    dayTitle: "Жұма · Аида, шаш қию",
    slot10: "Дана П. · шаш қию", slot12: "Лев М. · бояу", slot14: "Майя Т. · шаш қию", slot16: "Нора Ф. · маникюр",
    free: "бос",
    refused: "9 бас тартылды",
    dayCaption: "Қос жазылуды PostgreSQL өзі қабылдамайды: бір уақытқа он сұраныс дәл бір жазылу береді",
    aiveraText: "Мұғалімге көмекші: сабақ жоспарлары, тесттер, жұмысқа пікір және ата-аналарға хат, Word пен PDF-ке экспорт.",
    relayText: "Вебхуктан келген өтінім AI бағалау, CRM, кесте, хат және командаға хабарлама арқылы өтеді. Құлаған қадам қайталанады, содан кейін тоқтаған жерінен жалғасуды күтеді.",
    leadText: "Кіріс өтінімдерді бағалап, әрқайсысын тиісті адамға береді және жауап мерзімі өтпей тұрып, кімге келесі жауап беру керегін көрсетеді.",
    logText: "Қосымшаның лог файлдарын оқып, шуды инциденттерге жинайды: демо күнгі 114 қате жолы 6 инцидентке айналады. Ескертулер Telegram-ға кетеді.",
    dropText: "CSV және JSON экспорттары бар қалтаны бақылап, әр жолды тексереді және бұзылған, бос немесе қайталанған файлдарды нақты себебімен ұстап қалады.",
    invoiceTitle: "Шот-фактураларды өңдеу",
    invoiceText: "PDF шоттардан жеткізушіні, нөмірді, күндерді және сомаларды алады, өз сенімділігін бағалайды және күмәндыларын адамға жібереді.",
    hookTitle: "Вебхук мониторы",
    hookText: "Вебхуктарды қабылдап, қайталаумен жібереді және әр жеткізу әрекетін көрсетеді, сондықтан жоғалған оқиғаны тауып, қайта жіберуге болады.",
    moreText: "Парсерлер, CSV және Excel тазалау, API синхрондау құралдары және ескі тәжірибелер",
    aboutTitle: "Мен туралы",
    about1: "Мен Python бэкенд әзірлеушісімін. Жұмысымның көбі жүйелер арасында: форма мен CRM, экспорттар қалтасы мен дерекқор, мобильді қосымша мен ережелерді ұстайтын сервер.",
    about2: "Бірдеңе бұзылғанда не болатыны маған маңызды. Провайдер жауап бермеді, файл толық көшірілмей келді, екі клиент бір секундта «жазылу» батырмасын басты. Бизнес жүйеге сене ала ма, жоқ па, дәл осыған байланысты, сондықтан негізгі уақыт осыған кетеді.",
    contactTitle: "Байланыс",
    contactText: "Бірдеңе бұзылғанда да жұмыс істей беретін бэкенд, интеграция немесе автоматтандыру керек пе? Маған жазыңыз.",
    top: "Жоғары"
  }
};

const nodes = [...document.querySelectorAll("[data-i18n]")];
const english = new Map(nodes.map(node => [node, node.textContent]));
const buttons = [...document.querySelectorAll("[data-lang]")];

function setLanguage(lang) {
  const dict = T[lang];
  nodes.forEach(node => {
    node.textContent = (dict && dict[node.dataset.i18n]) || english.get(node);
  });
  document.documentElement.lang = lang;
  buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === lang)));
  try { localStorage.setItem("lang", lang); } catch (_) { /* private mode */ }
}

function initialLanguage() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved in T) return saved;
  } catch (_) { /* private mode */ }
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  return browser in T ? browser : "en";
}

buttons.forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
setLanguage(initialLanguage());

// The log keeps moving through the same real scenarios, one line every few seconds.
const POOL = [
  ["ok", "slotbridge", "journey: haircut → manicure · booked in one transaction", "ok"],
  ["warn", "webhook", "POST /hooks/crm-leads 503 · retry scheduled", "retry"],
  ["ok", "webhook", "POST /hooks/crm-leads 200 · attempt 2", "ok"],
  ["warn", "leadsignal", "new lead · score 82 · reply due in 15 min", "hot"],
  ["ok", "aivera", "lesson plan · 45 min · saved on the server", "ok"],
  ["ok", "relaydesk", "Idempotency-Key evt_001 seen · first run returned", "ok"],
  ["ok", "slotbridge", "10 requests for one slot · 1 booked, 9 refused", "ok"],
  ["bad", "relaydesk", "welcome_email timeout · attempt 3/3 → dead letter", "fail"],
  ["ok", "relaydesk", "replay from step 5 · CRM and sheet not touched", "ok"],
  ["ok", "logpulse", "114 error lines folded into 6 incidents", "ok"],
  ["warn", "datadrop", "orders_export.csv · header, no rows → quarantine", "hold"],
  ["warn", "invoice", "subtotal + tax ≠ total · sent to a person", "review"]
];

const log = document.getElementById("log");
const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (log && !still) {
  let index = 0;
  let clock = 14 * 3600 + 3 * 60 + 20;
  let visible = true;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(log);

  const pad = n => String(n).padStart(2, "0");
  const stamp = s => `${pad(Math.floor(s / 3600) % 24)}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;

  setInterval(() => {
    if (!visible || document.hidden) return;
    const [kind, src, msg, tag] = POOL[index++ % POOL.length];
    clock += 7 + Math.floor(Math.random() * 40);
    const li = document.createElement("li");
    li.className = kind;
    for (const [cls, text] of [["", stamp(clock)], ["src", src], ["msg", msg], ["tag", tag]]) {
      const el = document.createElement(cls ? "span" : "time");
      if (cls) el.className = cls;
      el.textContent = text;
      li.append(el);
    }
    log.append(li);
    while (log.children.length > 7) log.firstElementChild.remove();
  }, 2600);
}
