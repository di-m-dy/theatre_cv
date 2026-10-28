/*
  Весь контент сайта — здесь.

  Спектакль (WORKS) — все поля, кроме slug/title, необязательны;
  пустые разделы на странице просто не показываются:

  {
    slug: 'primer',                  // адрес страницы: #/works/primer
    title: 'Название',
    subtitle: 'Подзаголовок',
    year: 2024, month: 'март',       // премьера
    theatre: DRAMA,                  // по нему группируется список в биографии
    author: 'Автор / по мотивам',
    note: 'Короткая пометка: эскиз, курс, проект',
    awards: ['Премия — номинация'],

    videos: [{ id: 'YouTubeID', label: 'Акт I' }],   // запись спектакля (свой плеер)
    cover: 'assets/perf/primer/cover.jpg',          // если нет — первое фото галереи или кадр видео
    gallery: ['assets/perf/primer/01.jpg', ...],    // если нет — кадры из видео
    gallerySource: 'Фото: Имя Фамилия',

    about: `Подробнее: любой текст.
            Пустая строка — новый абзац. Можно писать HTML: <b>, <i>, <a href="...">.`,
    team: [['Художник', 'Имя Фамилия'], ...],      // постановочная группа
    cast: [['Персонаж', 'Артист'], ...],           // актёры
    extras: [{ id: 'YouTubeID', title: 'Тизер' }], // доп. видео: тизеры, пробы, репетиции
    files: [{ title: 'Текст пьесы', url: 'assets/files/primer.pdf' }], // PDF/DOC или ссылка
    press: ['id публикации из PRESS'],
  }
*/

const PERSON = {
  name: 'Дмитрий Зимин',
  role: 'Театральный режиссёр, педагог',
  city: 'Екатеринбург',
  photo: 'assets/img/zimin-photo.jpg',
  portrait: 'assets/img/zimin-portrait.jpg',
  contacts: [
    { label: 'Telegram', value: '@izumizumoff', url: 'https://t.me/izumizumoff' },
    { label: 'E-mail', value: 'dimdy11.11@gmail.com', url: 'mailto:dimdy11.11@gmail.com' },
    { label: 'YouTube', value: '@Dmitry-y1p9f', url: 'https://www.youtube.com/@Dmitry-y1p9f' },
  ],
};

const BIO = {
  lead:
    'Режиссёр-постановщик с более чем восемнадцатилетним опытом в профессиональном театре. ' +
    'Работает с широким жанровым диапазоном — от классики и инсценировок прозы до современной ' +
    'и экспериментальной драматургии. Выпустил более 40 спектаклей в десяти с лишним театрах ' +
    'России, Беларуси и Черногории.',
  text: [
    'Родился в 1986 году в Верхней Салде. Окончил Нижнесалдинскую музыкальную школу (класс скрипки), Свердловское областное училище искусств и культуры (2007, мастерская М.С. Ершовой) и Екатеринбургский государственный театральный институт по специальности «Режиссура драмы» (2012, мастерская А.В. Неустроева).',
    'В 2006–2013 годах — педагог актёрского мастерства и режиссёр молодёжного театра-студии «Галерка». Автор сценического проекта ZANOZA, соучредитель арт-площадки «Выход».',
    'С 2011 года — артист Свердловского академического театра драмы, с 2017-го — режиссёр-постановщик. За 2014–2023 годы поставил здесь более пятнадцати спектаклей. «Отцы и дети» и «Кроткая» входили в конкурсную программу фестиваля «Уроки режиссуры. Жизнь в искусстве» в рамках Биеннале театрального искусства (2017, 2019, Москва).',
    'В 2016–2024 годах — режиссёр инклюзивного театрального проекта #ЗАживое.',
  ],
  education: [
    ['2012', 'Екатеринбургский государственный театральный институт — «Режиссура драмы», мастерская А.В. Неустроева'],
    ['2007', 'Свердловское областное училище искусств и культуры — «Руководитель творческого коллектива, режиссёр театральных представлений», мастерская М.С. Ершовой'],
    ['—', 'Нижнесалдинская музыкальная школа, класс скрипки'],
  ],
  positions: [
    ['2011–2023', 'Свердловский академический театр драмы — артист, с 2017 года режиссёр-постановщик'],
    ['2016–2024', 'Инклюзивный театральный проект #ЗАживое — режиссёр'],
    ['2006–2013', 'Молодёжный театр-студия «Галерка» — педагог актёрского мастерства, режиссёр'],
  ],
  practice: [
    ['2017', 'Творческая лаборатория Э. Някрошюса — Любимовка'],
    ['2010', 'Международный форум «Пространство режиссуры» — Пермский Театр-Театр'],
    ['2009', 'Международный фестиваль-школа «Территория» — ЦСИ PERMM, Пермь'],
    ['2009', 'Всероссийская конференция «Режиссёр и проза» — ГИТИС, Москва'],
    ['2008', 'Международная режиссёрская конференция — Театральный институт им. Щукина, Москва'],
  ],
  awards: [
    ['2022', '«Браво!» — лучшая работа режиссёра в драматическом театре, «Над пропастью во ржи»'],
    ['2021', '«Браво!» — лучшая работа режиссёра в драматическом театре, «Джан»'],
    ['2020', '«Браво!» — специальный приз жюри «За полифоничность режиссёрской партитуры», «Марьино поле»'],
    ['2020', 'Long-list Национальной театральной премии «Золотая Маска» — «Головлёвы»'],
    ['2019', 'Гран-при фестиваля «Коляда-плейс» — «Вий»'],
    ['2018', '«Браво!» — лучшая работа режиссёра, лучший спектакль, лучшая работа художника — «Вий»'],
    ['2016', '«Браво!» — специальный приз жюри за спектакль «Пассажиры»'],
    ['2014', '«Браво!» — специальный приз жюри «За сценическое прочтение прозы Андрея Платонова»'],
    ['2014', 'Премия «ТОП 50. Лучшие люди Екатеринбурга», номинация «Театр»'],
    ['2012', 'Победитель конкурса-гранта Минкультуры РФ «Проекты молодых режиссёров»'],
    ['2010', 'Победитель Всероссийского конкурса «Молодое дарование России»'],
    ['2010', 'Золотой диплом III Международного фестиваля студенческих театров UniFest — «Оркестр Титаник»'],
  ],
};

const PTJ = 'Петербургский театральный журнал';
const KE = 'Культура Екатеринбурга';
const KE_URL = (n) =>
  `https://xn--80atdujec4e.xn--80acgfbsl1azdqr.xn--p1ai/common_content/item/theater_post/${n}`;

// date — ISO (для сортировки); dateLabel — как показывать
const PRESS = [
  { id: 'ptj-razum', title: '«Разум наш, как безумие, страшен…»', source: PTJ, author: 'Галина Брандт', date: '2015-03-01', dateLabel: '2015, № 79', url: 'https://ptj.spb.ru/archive/79/process-79/razum-nash-kak-bezumie-strashen-79/', about: '«Платонов. Две истории»' },
  { id: 'ptj-1987', title: 'В плену у времени', source: PTJ, author: 'Илья Губин', date: '2016-12-13', url: 'https://ptj.spb.ru/blog/vplenu-uvremeni/', about: '«1987»' },
  { id: 'ke-zachers', title: 'Дмитрий Зимин: «Важно ведь не зачерстветь»', kind: 'Интервью', source: KE, date: '2017-04-03', url: KE_URL(473) },
  { id: 'ptj-kaskando', title: '«Почему я должна смотреть это как театральный зритель?»', source: PTJ, author: 'Галина Брандт', date: '2017-12-01', dateLabel: '2017, № 90', url: 'https://ptj.spb.ru/archive/90/sociality-or-death/pochemu-yadolzhna-smotret-eto-kak-teatralnyj-zritel/', about: '«Каскандо», #ЗАживое' },
  { id: 'ke-ufo', title: 'Контакты и потрясения', source: KE, date: '2018-10-25', url: KE_URL(298), about: '«UFO»' },
  { id: 'ke-krotkaya', title: '«Кроткая» как картина', source: KE, date: '2018-12-24', url: KE_URL(270), about: '«Кроткая»' },
  { id: 'ke-magazin', title: 'Острые границы человечности', source: KE, date: '2019-02-25', url: KE_URL(261), about: '«Магазин»' },
  { id: 'ke-chestnost', title: 'Дмитрий Зимин: «У меня сейчас этап режиссёрской честности»', kind: 'Интервью', source: KE, date: '2019-03-25', url: KE_URL(251) },
  { id: 'ke-viy', title: 'А был ли Вий?', source: KE, date: '2019-05-23', url: KE_URL(235), about: '«Вий»' },
  { id: 'ke-golovlevy', title: 'Мертворождённые', source: KE, date: '2019-06-10', url: KE_URL(224), about: '«Головлёвы»' },
  { id: 'ke-1000', title: 'Больше, чем жизнь', source: KE, date: '2019-10-14', url: KE_URL(174), about: '«1000 лет вместе»' },
  { id: 'ptj-portrait', title: '«И тогда что было, сердце позабудет и любить вас будет»', kind: 'Портрет', source: PTJ, author: 'Галина Брандт', date: '2019-12-01', dateLabel: '2019, № 98', url: 'https://ptj.spb.ru/archive/98/director-table-new-young/itogda-chto-bylo-serdce-pozabudet-ilyubit-vas-budet/' },
  { id: 'ke-vzlomanny', title: 'Блог как самоликвидация', source: KE, date: '2020-10-22', url: KE_URL(74), about: '«Взломанный»' },
  { id: 'ke-kinoproba', title: '«Любовь» Ханеке, «Река» Балабанова и «500 дней лета» Марка Уэбба', source: KE, date: '2020-12-09', url: KE_URL(63), about: 'эскизы на «Кинопробе»' },
  { id: 'ke-kukushka', title: 'Лоботомия как способ существования', source: KE, date: '2021-03-31', url: KE_URL(32), about: '«Пролетая над гнездом кукушки»' },
  { id: 'ptj-kukushka', title: 'Не пролетит', source: PTJ, author: 'Галина Брандт', date: '2021-04-09', url: 'https://ptj.spb.ru/blog/ne-proletit/', about: '«Пролетая над гнездом кукушки»' },
  { id: 'ke-dyhanie', title: 'ЗАмолчали. ЗАдышали. ЗАжили', source: KE, author: 'Дарья Санникова', date: '2021-06-24', url: KE_URL(4), about: '«Дыхание», #ЗАживое' },
  { id: 'smotrim-kamen', title: 'В Минске состоялась премьера спектакля «Камень глупости»', source: 'Смотрим', date: '2022-03-29', url: 'https://smotrim.ru/journal/2696025', about: '«Камень глупости»' },
  { id: 'ke-propast', title: 'Вопросы над пропастью', source: KE, date: '2022-09-27', url: KE_URL(784), about: '«Над пропастью во ржи»' },
  { id: 'ptj-romeo', title: 'Любовь так страшно разрослась', source: PTJ, author: 'Галина Брандт', date: '2022-12-24', url: 'https://ptj.spb.ru/blog/lyubov-tak-strashno-razroslas/', about: '«Ромео. Джульетта. Шекспир»' },
  { id: 'ke-moroz', title: 'Папа, проснись!', source: KE, date: '2023-02-02', url: KE_URL(820), about: '«Мороз»' },
  { id: 'ptj-zhuravli', title: 'Никогда не угаснет', source: PTJ, author: 'Галина Брандт', date: '2023-05-09', url: 'https://ptj.spb.ru/blog/nikogda-ne-ugasnet/', about: '«Летят журавли»' },
  { id: 'ke-kamen', title: '«Мне хочется держаться за свою семью, за ребёнка»', kind: 'Интервью', source: KE, date: '2023-06-29', url: KE_URL(878), about: '«Камень глупости»' },
  { id: 'ke-posledovatelnost', title: 'Шёпоты и жесты', source: KE, date: '2023-10-10', url: KE_URL(923), about: '«Последовательность простых действий», #ЗАживое' },

  // ---- Добавлено при поиске по прессе
  { id: 'og-sinyaya', title: 'Театр драмы пустился на поиски Синей птицы', source: 'Областная газета', author: 'Дарья Мичурина', date: '2013-12-24', url: 'https://www.oblgazeta.ru/culture/15080/' },
  { id: 'rg-platonov', title: 'Дмитрий Зимин: «Платонов — автор „на вырост“»', kind: 'Интервью', source: 'Реальная газета', date: '2015-09-08', dateLabel: '2015, № 5', url: 'https://uraltuz.ru/files/12238fd63cb86a9fdd5ff1ec1e8409f4.pdf' },
  { id: 'ke-passazhirka', title: 'История одной «Пассажирки»', source: KE, date: '2016-04-14', url: KE_URL(544) },
  { id: 'ke-passazhiry', title: 'Набоковские «Пассажиры»: в ожидании конечной станции', source: KE, author: 'Алла Карфидова', date: '2016-08-24', url: KE_URL(567) },
  { id: 'e1-otcy', title: 'История о человеке, который всё потерял', source: 'E1.RU', author: 'Яна Краева', date: '2016-09-29', url: 'https://www.e1.ru/text/culture/2016/09/29/53173121/' },
  { id: 'teatral-otcy', title: '«Я над всем, что сделано, ставлю „nihil“»', source: 'Театрал', author: 'Ольга Егошина', date: '2017-03-21', url: 'https://uraldrama.ru/press/ya-nad-vsem-chto-sdelano-stavlyu-nihil-otczy-i-deti-v-sverdlovskom-teatre-dramy' },
  { id: 'ng-otcy', title: 'Отцы и дети перед лицом любви', source: 'Новая газета', author: 'Марина Токарева', date: '2017-03-28', url: 'https://novayagazeta.ru/articles/2017/03/28/71952-ottsy-i-deti-pered-litsom-lyubvi' },
  { id: 'ke-dzhejson', title: 'Эпоха потерянных Джейсонов', source: KE, author: 'Александра Петкау', date: '2017-04-17', url: KE_URL(468) },
  { id: 'ke-sposobny', title: 'Забыть нельзя помнить', source: KE, author: 'Дарья Санникова', date: '2017-11-14', url: KE_URL(401) },
  { id: 'ptj-kaskando-dm', title: '«Почему я должна это смотреть? Даже не как театральный зритель, а вообще?»', source: PTJ, author: 'Марина Дмитревская', date: '2017-12-02', dateLabel: '2017, № 90', url: 'https://ptj.spb.ru/archive/90/sociality-or-death/pochemu-yadolzhna-eto-smotret-dazhe-nekak-teatralnyj-zritel-avoobshhe/' },
  { id: 'ke-sadko', title: 'Недомультик «Садко»', source: KE, author: 'Анастасия Мошкина', date: '2017-12-26', url: KE_URL(378) },
  { id: 'es-viy', title: 'Где Вий', source: 'Экран и сцена', author: 'Николай Предеин', date: '2018-05-22', dateLabel: '2018, № 15', url: 'https://uraldrama.ru/press/gde-vij' },
  { id: 'ke-stancionny', title: 'Станционный зритель', source: KE, date: '2019-03-06', url: KE_URL(258) },
  { id: 'ke-kruto', title: 'Дмитрий Зимин: «Круто, когда человек копается в себе. Это значит, что он живой»', kind: 'Интервью', source: KE, date: '2019-06-18', url: KE_URL(217) },
  { id: 'og-golovlevy', title: 'Благими намерениями… История семейства Головлёвых в постановке Свердловского драмтеатра', source: 'Областная газета', author: 'Евгений Ячменёв', date: '2019-11-12', url: 'https://www.oblgazeta.ru/culture/theatre/101641/' },
  { id: 'ptj-interview', title: 'На вопросы «ПТЖ» отвечает Дмитрий Зимин', kind: 'Интервью', source: PTJ, date: '2019-12-02', dateLabel: '2019, № 98', url: 'https://ptj.spb.ru/archive/98/director-table-new-young/na-voprosy-ptzh-otvechaet-dmitrij-zimin/' },
  { id: 'ke-mir', title: 'Мир без короны: Дмитрий Зимин', kind: 'Интервью', source: KE, author: 'Евгений Исхаков', date: '2020-05-19', url: 'https://xn--80atdujec4e.xn--80acgfbsl1azdqr.xn--p1ai/common_content/item/city_post/264' },
  { id: 'ke-maryino', title: 'Побег к счастью', source: KE, date: '2020-10-12', url: KE_URL(78) },
  { id: 'ke-bukvar', title: 'Здесь и сейчас: как создать спектакль в режиме реального времени', source: KE, author: 'Дарья Санникова', date: '2021-01-18', url: KE_URL(50) },
  { id: 'ke-zachem', title: '«Я помню, что меня не было»', source: KE, author: 'Дарья Санникова', date: '2021-02-03', url: KE_URL(46) },
  { id: 'og-kukushka', title: 'Возможно ли выпасть из «Гнезда»?', source: 'Областная газета', author: 'Пётр Кабанов', date: '2021-04-02', url: 'https://www.oblgazeta.ru/culture/theatre/121993/' },
  { id: 'ke-sluzhebny', title: 'Шопену здесь не место', source: KE, author: 'Елена Азанова', date: '2021-12-07', url: KE_URL(697) },
  { id: 'kultura-kamen', title: '«Камень глупости»: мировая премьера в Минске', source: 'Культура', author: 'Елена Федоренко', date: '2022-03-29', url: 'https://portal-kultura.ru/articles/theater/340040-kamen-gluposti-mirovaya-premera-v-minske/' },
  { id: 'ptj-kamen', title: 'Тень пилигрима', source: PTJ, author: 'Алёна Ходыкова', date: '2022-10-17', url: 'https://ptj.spb.ru/blog/padarozhzha-z-minska/' },
  { id: 'da-sluzhebny', title: 'Служебный роман в новейшем времени', source: 'Дом актёра', author: 'Матвей Михайлов', date: '2022-12-30', dateLabel: '2022, № 175–176', url: 'https://uraldrama.ru/press/sluzhebnyj-roman-v-novejshem-vremeni' },
  { id: 'da-maryino', title: 'Сказка о Марьином поле', source: 'Дом актёра', author: 'Екатерина Килина', date: '2022-12-30', dateLabel: '2022, № 175–176', url: 'https://uraldrama.ru/press/skazka-o-marinom-pole' },
  { id: 'vsetyah-interview', title: 'Дмитрий Зимин: оставаться человеком', kind: 'Интервью', source: 'VSetyah', author: 'Артём Аксенов', date: '2023-04-06', url: 'https://uraldrama.ru/press/dmitrij-zimin-ostavatsya-chelovekom' },
  { id: 'teatral-zhuravli', title: 'Журавлики-кораблики летят под небесами', source: 'Театрал', author: 'Юлия Табачкова', date: '2023-05-08', url: 'https://teatral-online.ru/news/33402/' },
  { id: 'ke-zhuravli', title: 'Просто не умела ждать', source: KE, author: 'Елена Азанова', date: '2023-05-18', url: KE_URL(857) },
  { id: 'ptj-sungul', title: 'Они хотели делать атомную бомбу', source: PTJ, author: 'Галина Брандт', date: '2023-09-01', dateLabel: '2023, № 113', url: 'https://ptj.spb.ru/archive/113/process-113/oni-xoteli-delat-atomnuyu-bombu/' },
  { id: 'teatr-sungul', title: 'Здесь делали бомбу', source: 'Театр.', date: '2023-10-20', url: 'https://oteatre.info/zdes-delali-bombu/' },
  { id: 'ke-cvety', title: '«Если мир, конечно, будет»', source: KE, author: 'Дарья Санникова', date: '2023-10-23', url: KE_URL(925) },
];

// Хронологический порядок (новые публикации дописаны в конец)
PRESS.sort((a, b) => a.date.localeCompare(b.date));

const frames = (slug, parts = 1) =>
  Array.from({ length: parts }, (_, p) =>
    [1, 2, 3].map((k) => `assets/perf/${slug}/frame-${p + 1}-${k}.jpg`)
  ).flat();
const pressPhotos = (slug, n) =>
  Array.from({ length: n }, (_, i) => `assets/perf/${slug}/press-${String(i + 1).padStart(2, '0')}.jpg`);

// Театры — в этом порядке идут группы в биографии
const DRAMA = 'Свердловский академический театр драмы';
const KAMERNY = 'Камерный театр, Екатеринбург';
const CSD = 'Центр современной драматургии, Екатеринбург';
const YC = 'Театральная платформа «В Центре», Ельцин Центр';
const EGTI = 'Екатеринбургский государственный театральный институт';
const RTBD = 'Республиканский театр белорусской драматургии, Минск';
const DREAM = 'Театр Dream Dram, Будва';
const SEROV = 'Серовский театр драмы им. А.П. Чехова';
const DRAMA3 = 'Театр «Драма №3», Каменск-Уральский';
const YELLOW = 'Театр «Жёлтый квадрат»';
const NTAGIL = 'Нижнетагильский театр драмы им. Мамина-Сибиряка';
const NMT = 'Новый молодёжный театр, Нижний Тагил';
const OPERA = 'Екатеринбургский театр оперы и балета';
const ZAZHIVOE = 'Инклюзивный проект #ЗАживое';
const GALERKA = 'Молодёжный театр-студия «Галерка», Екатеринбург';
const ZANOZA = 'Сценический проект ZANOZA';
const BIENNALE = 'Уральская индустриальная биеннале';

const THEATRES = [DRAMA, KAMERNY, CSD, YC, EGTI, RTBD, DREAM, SEROV, DRAMA3, YELLOW, NTAGIL, NMT, OPERA, ZAZHIVOE, GALERKA, ZANOZA, BIENNALE];

const KRAVTSEV = ['Художник-постановщик', 'Владимир Кравцев'];

const WORKS = [
  // ---- Dream Dram, Будва
  { slug: 'bul-buee', title: 'Буль-Буээ. История Кайи', year: 2026, theatre: DREAM,
    videos: [{ id: '5n6vueHDiAc' }] },
  { slug: 'zhil-byl-pes', title: 'Жил-был пёс', year: 2025, theatre: DREAM,
    author: 'по мотивам мультфильма', videos: [{ id: '8_z_Y_7bZ3w' }] },
  { slug: 'kak-ya-lyubil-letat', title: 'Как я любил летать, пока внезапно не упал с неба', year: 2025, theatre: DREAM,
    author: 'Екатерина Тимофеева' },

  // ---- Свердловский театр драмы
  { slug: 'letyat-zhuravli', title: 'Летят журавли', year: 2023, theatre: DRAMA,
    author: 'по пьесе и киносценарию В. Розова', team: [KRAVTSEV],
    gallery: pressPhotos('letyat-zhuravli', 5), gallerySource: 'Фото из публикации «Петербургского театрального журнала»',
    press: ['ptj-zhuravli', 'teatral-zhuravli', 'ke-zhuravli'] },
  { slug: 'moroz', title: 'Мороз', year: 2022, month: 'декабрь', theatre: DRAMA, author: 'Константин Стешик',
    videos: [{ id: 'FLKlnypIRBU' }], press: ['ke-moroz'] },
  { slug: 'sluzhebny-roman', title: 'Служебный роман', year: 2021, month: 'ноябрь', theatre: DRAMA,
    author: 'Эльдар Рязанов, Эмиль Брагинский',
    press: ['ke-sluzhebny', 'da-sluzhebny'] },
  { slug: 'kukushka', title: 'Пролетая над гнездом кукушки', year: 2021, month: 'март', theatre: DRAMA,
    author: 'И. Васьковская по мотивам романа К. Кизи', team: [KRAVTSEV],
    videos: [{ id: 'AVVOEqICH2A', label: 'Акт I' }, { id: 'MtYP9czvWzg', label: 'Акт II' }],
    press: ['ke-kukushka', 'ptj-kukushka', 'og-kukushka'], parts: 2 },
  { slug: 'maryino-pole', title: 'Марьино поле', year: 2020, month: 'октябрь', theatre: DRAMA, author: 'Олег Богаев',
    awards: ['«Браво!» 2020 — специальный приз жюри «За полифоничность режиссёрской партитуры»'],
    press: ['ke-maryino', 'da-maryino'] },
  { slug: 'rape-me', title: 'Рэйп ми', year: 2020, month: 'март', theatre: DRAMA, author: 'Ирина Васьковская',
    videos: [
      { id: 'tqLGBthGL8Q', label: 'Часть 1' },
      { id: 'pSRKmPtjews', label: 'Часть 2' },
      { id: '2BftBELiSVI', label: 'Часть 3' },
    ], parts: 3 },
  { slug: 'madam-rubinshtejn', title: 'Мадам Рубинштейн', year: 2019, month: 'декабрь', theatre: DRAMA,
    author: 'Джон Мисто', videos: [{ id: 'IAUMwlQBr6U' }] },
  { slug: 'golovlevy', title: 'Головлёвы', year: 2019, month: 'июнь', theatre: DRAMA,
    author: 'И. Васьковская по мотивам романа М. Салтыкова-Щедрина', team: [KRAVTSEV],
    awards: ['Long-list «Золотой Маски» 2020'],
    videos: [{ id: 'j0TAVaBzh4I' }], press: ['ke-golovlevy', 'og-golovlevy'] },
  { slug: 'krotkaya', title: 'Кроткая', year: 2018, month: 'ноябрь', theatre: DRAMA, author: 'Ф.М. Достоевский',
    awards: ['Конкурс «Уроки режиссуры. Жизнь в искусстве», 2019'],
    gallery: pressPhotos('krotkaya', 10), gallerySource: 'Фото из публикации «Культуры Екатеринбурга»',
    press: ['ke-krotkaya'] },
  { slug: 'viy', title: 'Вий', year: 2018, month: 'май', theatre: DRAMA,
    author: 'В. Сигарев по мотивам повести Н.В. Гоголя', team: [KRAVTSEV],
    awards: [
      'Гран-при «Коляда-плейс» 2019',
      '«Браво!» 2018 — лучший спектакль, лучшая работа режиссёра, лучшая работа художника',
    ],
    videos: [{ id: '8TOEBISQX30' }], press: ['ke-viy', 'es-viy'] },
  { slug: 'sadko', title: 'Садко', year: 2017, month: 'декабрь', theatre: DRAMA, author: 'А. Архипов',
    press: ['ke-sadko'] },
  { slug: 'sposobny-uchenik', title: 'Способный ученик', year: 2017, month: 'ноябрь', theatre: DRAMA,
    author: 'И. Васьковская по повести Стивена Кинга',
    awards: ['«Браво!» 2017 — лучший актёрский ансамбль'],
    press: ['ke-sposobny'] },
  { slug: 'spasti-dzhejsona', title: 'Спасти Джейсона', year: 2017, month: 'апрель', theatre: DRAMA, author: 'Питер Куилтер',
    press: ['ke-dzhejson'] },
  { slug: 'otcy-i-deti', title: 'Отцы и дети', year: 2016, month: 'октябрь', theatre: DRAMA, author: 'И.С. Тургенев',
    awards: ['Конкурс «Уроки режиссуры. Жизнь в искусстве», 2017'],
    videos: [{ id: 'zE2uIGo_bs8' }],
    press: ['e1-otcy', 'teatral-otcy', 'ng-otcy'] },
  { slug: 'passazhiry', title: 'Пассажиры', year: 2016, month: 'июнь', theatre: DRAMA,
    author: 'И. Васьковская по рассказам В. Набокова',
    awards: ['«Браво!» 2016 — специальный приз жюри'],
    videos: [{ id: 'AKFFxHAfmWo' }],
    press: ['ke-passazhiry'] },
  { slug: 'piter-pen', title: 'Питер Пэн', year: 2015, month: 'декабрь', theatre: DRAMA, author: 'Д. Войдак' },
  { slug: 'lift', title: 'Лифт', year: 2015, month: 'май', theatre: DRAMA, note: 'Проект',
    author: 'И. Васьковская, А. Головнин, Е. Гузема, Пухов', videos: [{ id: 'KTN8uM4Lvq4' }],
    gallery: ['assets/perf/lift/cover.jpg'] },
  { slug: 'platonov', title: 'Платонов. Две истории', year: 2014, month: 'ноябрь', theatre: DRAMA,
    author: 'Ирина Васьковская', note: 'Студия «Молодой театр», при поддержке Фонда Михаила Прохорова',
    team: [['Художник', 'Владимир Кравцев']],
    awards: ['«Коляда-плейс» 2015 — лучшая сценография'],
    cover: 'assets/perf/platonov/press-02.jpg',
    gallery: pressPhotos('platonov', 6), gallerySource: 'Фото из публикации «Петербургского театрального журнала»',
    press: ['ptj-razum', 'rg-platonov'] },
  { slug: 'sinyaya-ptica', title: 'Синяя птица', year: 2013, month: 'декабрь', theatre: DRAMA,
    author: 'Морис Метерлинк', note: 'При поддержке Фонда Михаила Прохорова',
    press: ['og-sinyaya'] },
  { slug: 'tam-za-ladozhskim', title: 'Там за Ладожским озером', year: 2013, month: 'март', theatre: DRAMA,
    author: 'Екатерина Васильева', note: 'Эскиз, проект «ОПЫТЫ»' },

  // ---- Камерный театр
  { slug: 'nad-propastyu-vo-rzhi', title: 'Над пропастью во ржи', year: 2022, month: 'сентябрь', theatre: KAMERNY,
    author: 'Дж. Сэлинджер, инсценировка И. Васьковской',
    awards: ['«Браво!» 2022 — лучшая работа режиссёра в драматическом театре'],
    videos: [{ id: 'gM4ukAYRA5Q' }], press: ['ke-propast'] },
  { slug: 'stancionny-smotritel', title: 'Станционный смотритель', year: 2019, month: 'март', theatre: KAMERNY,
    author: 'А.С. Пушкин, инсценировка И. Васьковской',
    videos: [{ id: 'UUwFKSRYd8U' }], press: ['ke-chestnost', 'ke-stancionny'] },

  // ---- Центр современной драматургии
  { slug: 'oresteya', title: 'Орестея', year: 2023, theatre: CSD, author: 'по мотивам трагедии Эсхила' },
  { slug: 'magazin', title: 'Магазин', year: 2019, month: 'февраль', theatre: CSD, author: 'Олжас Жанайдаров',
    awards: ['«Ирбитские подмостки» 2019 — лучший актёрский дуэт', 'Участник фестиваля социального театра «Особый взгляд»'],
    gallery: pressPhotos('magazin', 7), gallerySource: 'Фото из публикации «Культуры Екатеринбурга»',
    press: ['ke-magazin'] },

  // ---- Ельцин Центр
  { slug: 'cvety-vremeni', title: 'Цветы времени', year: 2023, month: 'октябрь', theatre: YC, author: 'Маша Конторович',
    note: 'Документальный спектакль об истории людей, переживших Холокост; совместно с еврейским культурным центром «Менора»',
    press: ['ke-cvety'] },
  { slug: 'zachem-ya-eto-pomnyu', title: 'Зачем я это помню', year: 2021, month: 'февраль', theatre: YC,
    note: 'Телеграм-спектакль в пространстве музея Ельцин Центра',
    press: ['ke-zachem'] },
  { slug: 'plug-and-play', title: 'PLUG&PLAY', year: 2020, month: 'ноябрь', theatre: YC,
    author: 'А. Синяев, М. Конторович, Р. Козырчиков, А. Еньшин',
    press: ['ke-bukvar'] },
  { slug: 'vzlomanny', title: 'Взломанный', year: 2020, month: 'октябрь', theatre: YC, author: 'Алексей Синяев',
    gallery: pressPhotos('vzlomanny', 6), gallerySource: 'Фото из публикации «Культуры Екатеринбурга»',
    press: ['ke-vzlomanny'] },
  { slug: '1987', title: '1987', year: 2016, theatre: YC, author: 'Ирина Васьковская', team: [['Художник', 'Владимир Кравцев']],
    gallery: pressPhotos('1987', 2), gallerySource: 'Фото из публикации «Петербургского театрального журнала»',
    press: ['ptj-1987'] },

  // ---- ЕГТИ
  { slug: 'svobodnaya-tema', title: 'Спектакль на свободную тему', year: 2023, theatre: EGTI,
    subtitle: 'или Как у нас не получилось поставить спектакль по пьесе',
    note: 'Учебный театр ЕГТИ, проект «Театр горожан»',
    videos: [{ id: 'N46Hm5f-bzk' }] },
  { slug: 'romeo-dzhuletta', title: 'Ромео. Джульетта. Шекспир', year: 2022, month: 'ноябрь', theatre: EGTI,
    author: 'по мотивам пьесы У. Шекспира', note: 'IV курс, мастерская Н.В. Гараниной',
    videos: [{ id: '2ZgJW9dtt2I' }], press: ['ptj-romeo'] },
  { slug: 'dobryj-chelovek', title: 'Добрый человек', year: 2019, month: 'январь', theatre: EGTI,
    author: 'по мотивам пьесы Б. Брехта «Добрый человек из Сычуани»', note: 'IV курс, мастерская Н.В. Гараниной',
    videos: [{ id: 'yPtENb_EDD8' }] },
  { slug: 'ufo', title: 'UFO', subtitle: 'или The time of God is not the time of Man', year: 2018, month: 'октябрь',
    theatre: EGTI, author: 'по мотивам текста И. Вырыпаева и вербатим', note: 'IV курс, мастерская А.В. Неустроева',
    team: [['Художник', 'Ксения Карабанова'], ['Драматург', 'Ирина Васьковская']],
    gallery: pressPhotos('ufo', 8), gallerySource: 'Фото из публикации «Культуры Екатеринбурга»',
    press: ['ke-ufo'] },

  // ---- Другие театры
  { slug: 'kamen-gluposti', title: 'Камень глупости', year: 2022, month: 'март', theatre: RTBD, author: 'Константин Стешик',
    videos: [{ id: 'q1Xonk9umzU' }], press: ['smotrim-kamen', 'ke-kamen', 'kultura-kamen', 'ptj-kamen'] },
  { slug: 'dzhan', title: 'Джан', year: 2021, month: 'июль', theatre: SEROV, author: 'Андрей Платонов',
    awards: ['«Браво!» 2021 — лучшая работа режиссёра в драматическом театре'],
    videos: [{ id: 'UveWDYb7Luk', label: 'Акт I' }, { id: 'nakZY_slab8', label: 'Акт II' }], parts: 2 },
  { slug: 'utinaya-ohota', title: 'Утиная охота', year: 2021, month: 'октябрь', theatre: DRAMA3, author: 'Александр Вампилов' },
  { slug: 'gorod-oblaka', title: 'Город, создающий облака', year: 2021, theatre: NMT,
    note: 'По пьесам подростков лаборатории class-act «Культурная стрелка»' },
  { slug: 'makbet', title: 'Макбет. Видения', year: 2020, month: 'август', theatre: YELLOW,
    author: 'по мотивам пьесы У. Шекспира', videos: [{ id: 'yyh2TGDm68g' }] },
  { slug: 'zemlya-elzy', title: 'Земля Эльзы', year: 2018, month: 'февраль', theatre: NTAGIL, author: 'Ярослава Пулинович' },
  { slug: 'hrista-raspinayut', title: 'Христа распинают вновь', year: 2018, theatre: OPERA,
    author: 'И. Васьковская по мотивам романа Н. Казандзакиса', note: 'Эскиз' },
  { slug: 'passazhirka', title: 'Пассажирка', year: 2016, theatre: OPERA,
    author: 'по повести З. Посмыш', note: 'Эскиз, драматическая версия',
    press: ['ke-passazhirka'] },
  { slug: '1000-let-vmeste', title: '1000 лет вместе', year: 2019, theatre: BIENNALE,
    note: 'Документальный спектакль-лаборатория, «театр инструкций»',
    team: [KRAVTSEV, ['Драматург', 'Полина Бородина']],
    gallery: pressPhotos('1000-let-vmeste', 5), gallerySource: 'Фото из публикации «Культуры Екатеринбурга»',
    press: ['ke-1000'] },
  { slug: 'sungul', title: 'Сунгуль. Повесть о прошлом', year: 2023, theatre: BIENNALE, author: 'Ирина Васьковская',
    note: 'Проект Уральской индустриальной биеннале, арт-резиденция в посёлке Сокол (Челябинская область)',
    team: [['Звукорежиссёр', 'Евгений Робенко']], press: ['ptj-sungul', 'teatr-sungul'] },
  { slug: 'okolo-teatra', title: 'Околотеатра', year: 2014, theatre: ZANOZA, videos: [{ id: '2fRjj0znl0M' }] },

  // ---- #ЗАживое
  { slug: 'posledovatelnost', title: 'Последовательность простых действий', year: 2023, theatre: ZAZHIVOE,
    gallery: pressPhotos('posledovatelnost', 1), gallerySource: 'Фото из публикации «Культуры Екатеринбурга»',
    press: ['ke-posledovatelnost'] },
  { slug: 'dyhanie', title: 'Дыхание', year: 2021, theatre: ZAZHIVOE, note: 'Итоговый показ лаборатории',
    gallery: pressPhotos('dyhanie', 1), gallerySource: 'Фото из публикации «Культуры Екатеринбурга»',
    press: ['ke-dyhanie'] },
  { slug: 'kaskando', title: 'Каскандо', year: 2017, theatre: ZAZHIVOE, author: 'Сэмюэл Беккет',
    cover: 'assets/perf/kaskando/press-02.jpg',
    gallery: pressPhotos('kaskando', 9), gallerySource: 'Фото из публикации «Петербургского театрального журнала»',
    press: ['ptj-kaskando', 'ptj-kaskando-dm'] },
  { slug: 'snezhnaya-koroleva', title: 'Снежная королева', theatre: ZAZHIVOE, note: 'Читка с оркестром' },
  { slug: 'po-vole-voobrazheniya', title: 'По воле воображения', theatre: ZAZHIVOE },
  { slug: 'kratkie-istorii', title: 'Краткие истории о времени', theatre: ZAZHIVOE },
  { slug: 'chelovek-igrayushchij', title: 'Человек играющий', theatre: ZAZHIVOE },
  { slug: 'malenkij-princ', title: 'Маленький принц', theatre: ZAZHIVOE, note: 'Эскиз' },
  { slug: 'son', title: 'С.О.Н.', theatre: ZAZHIVOE },

  // ---- «Галерка»
  { slug: 'odnazhdy-vse-my', title: 'Однажды все мы будем счастливы', year: 2014, month: 'июнь', theatre: GALERKA, author: 'Екатерина Васильева' },
  { slug: 'strashnaya-noch', title: 'Страшная ночь', year: 2013, theatre: GALERKA, author: 'Михаил Зощенко' },
  { slug: 'istoriya-medvedej-panda', title: 'История медведей панда',
    subtitle: 'рассказанная одним саксофонистом, у которого есть подружка во Франкфурте',
    year: 2012, month: 'март', theatre: GALERKA, author: 'Матей Вишняк' },
  { slug: 'din', title: 'Динь', year: 2008, month: 'январь', theatre: GALERKA, author: 'Дмитрий Зимин' },
  { slug: 'dyadya-izya', title: 'Дядя Изя', year: 2007, month: 'ноябрь', theatre: GALERKA, author: 'В. Бурнин' },
  { slug: 'my-nemy', title: 'Мы=Немы, версия Ж', year: 2007, month: 'июнь', theatre: GALERKA, author: 'Дмитрий Зимин' },
  { slug: 'orkestr-titanik', title: 'Оркестр Титаник', year: 2007, month: 'февраль', theatre: GALERKA, author: 'Христо Бойчев',
    awards: ['Золотой диплом III Международного фестиваля студенческих театров UniFest, 2010'] },
  { slug: 'strah-staruha', title: 'Страх/Старуха', year: 2006, month: 'декабрь', theatre: GALERKA, author: 'Даниил Хармс' },
];

for (const w of WORKS) {
  for (const k of ['videos', 'press', 'awards', 'team', 'cast', 'extras', 'files']) w[k] ||= [];
  if (w.videos.length) {
    w.cover ||= `assets/perf/${w.slug}/cover.jpg`;
    w.gallery ||= frames(w.slug, w.parts || 1);
  }
  w.gallery ||= [];
  w.cover ||= w.gallery[0];
}
// Новые сверху; работы без года — в конце
WORKS.sort((a, b) => (b.year || 0) - (a.year || 0));
