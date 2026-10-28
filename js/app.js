const app = document.getElementById('app');
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/* ---------- Язык ---------- */

let LANG = 'ru';
const U = () => UI[LANG];
// Адрес страницы с учётом языка: L('works') → #/works или #/en/works
const L = (path = '') => `#/${LANG === 'en' ? 'en/' : ''}${path}`;
// Повторяющиеся фразы и названия театров
const tr = (s) => (LANG === 'en' && s ? EN.phrases[s] || EN.theatres[s] || s : s);
// Поле спектакля: английский вариант из data-en.js, иначе русский
function wf(w, f) {
  const en = LANG === 'en' && EN.works[w.slug] && EN.works[w.slug][f];
  if (en) return en;
  if (f === 'theatre' || f === 'gallerySource') return tr(w[f]);
  if (f === 'team') return w.team.map(([k, v]) => [tr(k), tr(v)]);
  return w[f];
}
const pf = (p, f) => (LANG === 'en' && EN.press[p.id] && EN.press[p.id][f]) || tr(p[f]);
const month = (m) => (LANG === 'en' && m ? EN.months[m] : m);

const PRESS_BY_ID = Object.fromEntries(PRESS.map((p) => [p.id, p]));
for (const w of WORKS) for (const id of w.press) PRESS_BY_ID[id].work = w;
// Публикации на странице спектакля — по дате
for (const w of WORKS) w.press.sort((x, y) => PRESS_BY_ID[x].date.localeCompare(PRESS_BY_ID[y].date));

function pressDate(p) {
  const label = pf(p, 'dateLabel');
  if (label) return label;
  const [y, m, d] = p.date.split('-').map(Number);
  return U().dateFmt(d, U().months[m - 1], y);
}

// «Подробнее»: HTML как есть, обычный текст — абзацы по пустой строке
function richText(s) {
  if (/<[a-z][\s\S]*>/i.test(s)) return s;
  return s.trim().split(/\n\s*\n/).map((p) => `<p>${esc(p.trim()).replace(/\n/g, '<br>')}</p>`).join('');
}

function fileType(url) {
  const ext = (url.split('?')[0].match(/\.([a-z0-9]+)$/i) || [])[1];
  return ext && ext.length <= 4 ? ext.toUpperCase() : U().link;
}

const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const extLink = (url) => (url.startsWith('http') ? 'target="_blank" rel="noopener"' : '');

let activePlayer = null;

/* ---------- Шапка, меню, подвал ---------- */

const menu = document.getElementById('mobile-menu');
const menuBtn = document.querySelector('.menu-toggle');

function setMenu(open) {
  menu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? U().close : U().menu;
  document.body.classList.toggle('no-scroll', open);
}
menuBtn.addEventListener('click', () => setMenu(menu.hidden));
document.addEventListener('keydown', (e) => e.key === 'Escape' && !menu.hidden && setMenu(false));

function renderChrome(section, path) {
  const u = U();
  document.documentElement.lang = LANG;
  const logo = document.querySelector('.logo');
  logo.href = L();
  logo.setAttribute('aria-label', u.logoAria);
  logo.innerHTML = `<span class="logo-role">${u.logoRole}</span><span class="logo-name">${u.logoName}</span>`;

  const navHtml = Object.entries(u.nav)
    .map(([k, label]) => `<a href="${L(k)}" class="${k === section ? 'is-active' : ''}">${label}</a>`)
    .join('');
  // Та же страница на другом языке
  const other = LANG === 'en' ? 'ru' : 'en';
  const otherHref = `#/${other === 'en' ? 'en/' : ''}${path}`;
  const langHtml = `<a class="lang-switch" href="${otherHref}" hreflang="${other}" lang="${other}">${other.toUpperCase()}</a>`;
  document.querySelector('.site-header .nav').innerHTML = navHtml + langHtml;
  menu.querySelector('nav').innerHTML = navHtml;

  const contacts = PERSON.contacts.map((c) => `<a href="${c.url}" ${extLink(c.url)}>${c.label} ↗</a>`).join('');
  document.querySelectorAll('[data-contacts]').forEach((el) => (el.innerHTML = contacts));
  menu.querySelector('.mobile-menu-contacts').insertAdjacentHTML('beforeend', langHtml);
  document.querySelector('.footer-copy').textContent = `© ${LANG === 'en' ? EN.person.name : PERSON.name}`;
  menuBtn.textContent = menu.hidden ? u.menu : u.close;
}

/* ---------- Карточки ---------- */

/* ---------- Поиск ---------- */

// Нормализация для поиска: регистр, ё/е, кавычки и знаки не важны
const norm = (s = '') => String(s).toLowerCase().replace(/ё/g, 'е').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const workKeys = (w) => [w.title, w.subtitle, EN.works[w.slug] && EN.works[w.slug].title, EN.works[w.slug] && EN.works[w.slug].subtitle];
const searchText = {
  work: (w) => norm(workKeys(w).filter(Boolean).join(' ')),
  press: (p) => norm([p.title, p.about, EN.press[p.id] && EN.press[p.id].title, EN.press[p.id] && EN.press[p.id].about,
    ...(p.work ? workKeys(p.work) : [])].filter(Boolean).join(' ')),
};
// Запрос живёт, пока открыт сайт: вернулись из спектакля — фильтр на месте
const searchQuery = { works: '', press: '' };

function searchBox(kind, placeholder) {
  return `
    <label class="search mono">
      <span class="search-mark" aria-hidden="true">[</span>
      <input type="search" data-search="${kind}" value="${esc(searchQuery[kind])}" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}" autocomplete="off" spellcheck="false">
      <span class="search-mark" aria-hidden="true">]</span>
    </label>`;
}

// Скрывает несовпавшие элементы [data-q], пустые группы [data-q-group] и показывает «ничего не найдено»
function applySearch(kind) {
  const q = norm(searchQuery[kind]);
  let shown = 0;
  app.querySelectorAll('[data-q]').forEach((el) => {
    const hit = !q || q.split(' ').every((t) => el.dataset.q.includes(t));
    el.hidden = !hit;
    shown += hit;
  });
  app.querySelectorAll('[data-q-group]').forEach((g) => (g.hidden = !g.querySelector('[data-q]:not([hidden])')));
  const empty = app.querySelector('.search-empty');
  if (empty) empty.hidden = shown > 0;
}

function bindSearch() {
  const input = app.querySelector('[data-search]');
  if (!input) return;
  const kind = input.dataset.search;
  input.addEventListener('input', () => {
    searchQuery[kind] = input.value;
    applySearch(kind);
  });
  input.addEventListener('keydown', (e) => e.key === 'Escape' && input.value && ((input.value = ''), input.dispatchEvent(new Event('input'))));
  applySearch(kind);
}

function workCard(w) {
  const m = U().marks;
  const marks = [
    w.videos.length && m.video,
    !w.videos.length && w.gallery.length && m.photo,
    w.press.length && `${m.press} ${w.press.length}`,
  ].filter(Boolean);
  const title = wf(w, 'title');
  const media = w.cover
    ? `<img src="${w.cover}" alt="" loading="lazy">${w.videos.length ? '<span class="card-play" aria-hidden="true"></span>' : ''}`
    : `<span class="card-type">${esc(title)}</span>`;
  return `
    <a class="card" href="${L(`works/${w.slug}`)}" data-q="${esc(searchText.work(w))}">
      <div class="card-media${w.cover ? '' : ' is-text'}">${media}</div>
      <div class="card-body">
        <span class="mono muted">${w.year || '—'}</span>
        <h3 class="card-title">${esc(title)}</h3>
        <span class="card-sub">${esc(wf(w, 'theatre') || wf(w, 'author') || '')}</span>
        <span class="mono card-marks">${marks.join(' · ')}</span>
      </div>
    </a>`;
}

// Пересказ статьи на сайте есть — заголовок ведёт на её страницу, иначе сразу на источник
const pressText = (p) => (typeof PRESS_TEXT !== 'undefined' && PRESS_TEXT[p.id]) || null;
const pressMeta = (p) => [pf(p, 'source'), pf(p, 'author'), pf(p, 'kind')].filter(Boolean).map(esc).join(' · ');

function pressRow(p, { showWork = true } = {}) {
  const meta = pressMeta(p);
  const about = pf(p, 'about');
  const work = showWork && p.work
    ? `<a class="press-work" href="${L(`works/${p.work.slug}`)}">→ ${esc(wf(p.work, 'title'))}</a>`
    : about && showWork ? `<span class="press-work muted">${esc(about)}</span>` : '';
  return `
    <li class="press-row${work ? '' : ' no-work'}" data-q="${esc(searchText.press(p))}">
      <span class="mono muted press-date">${pressDate(p)}</span>
      <div class="press-main">
        ${pressText(p)
          ? `<span><a class="press-title" href="${L(`press/${p.id}`)}">${esc(pf(p, 'title'))}</a> <a class="ext" href="${p.url}" target="_blank" rel="noopener" aria-label="${U().article.original}">↗</a></span>`
          : `<a class="press-title" href="${p.url}" target="_blank" rel="noopener">${esc(pf(p, 'title'))} <span class="ext">↗</span></a>`}
        <span class="mono muted press-meta">${meta}</span>
      </div>
      ${work}
    </li>`;
}

/* ---------- Страницы ---------- */

const bioData = () => (LANG === 'en' ? EN.bio : BIO);
const person = () => (LANG === 'en' ? EN.person : PERSON);

function viewHome() {
  const u = U();
  const featured = WORKS.filter((w) => w.videos.length).slice(0, 6);
  return `
    <section class="hero">
      <div class="hero-text">
        <p class="mono muted">${esc(person().role)} · ${esc(person().city)}</p>
        <h1 class="hero-name">${u.heroName}</h1>
        <p class="hero-lead">${esc(bioData().lead)}</p>
        <a class="link-arrow mono" href="${L('bio')}">${u.bioLink}</a>
      </div>
      <figure class="hero-photo">
        <img src="${PERSON.photo}" alt="${esc(person().name)}">
      </figure>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="label">${u.withVideo}</h2>
        <a class="link-arrow mono" href="${L('works')}">${u.allWorks} (${WORKS.length}) →</a>
      </div>
      <div class="grid">${featured.map(workCard).join('')}</div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="label">${u.pressHead}</h2>
        <a class="link-arrow mono" href="${L('press')}">${u.allPress} (${PRESS.length}) →</a>
      </div>
      <ul class="press-list">${[...PRESS].reverse().slice(0, 5).map((p) => pressRow(p)).join('')}</ul>
    </section>`;
}

const FILTERS = [
  ['all', () => true],
  ['video', (w) => w.videos.length],
  ['photo', (w) => w.gallery.length],
  ['press', (w) => w.press.length],
];

function viewWorks(filter = 'all') {
  const u = U();
  if (!FILTERS.some((f) => f[0] === filter)) filter = 'all';
  const fn = FILTERS.find((f) => f[0] === filter)[1];
  const list = WORKS.filter(fn);
  return `
    <section class="page-head">
      <h1 class="page-title">${u.nav.works}</h1>
      <div class="filters mono" role="tablist">
        ${FILTERS.map(([k, f]) => `
          <a href="${L(`works${k === 'all' ? '' : `?${k}`}`)}" class="${k === filter ? 'is-active' : ''}" role="tab" aria-selected="${k === filter}">
            ${u.filters[k]} <sup>${WORKS.filter(f).length}</sup>
          </a>`).join('')}
      </div>
      ${searchBox('works', u.searchWorks)}
    </section>
    <div class="grid">${list.map(workCard).join('')}</div>
    <p class="search-empty mono muted" hidden>${u.nothingFound}</p>
    <p class="note mono muted">${u.byTheatreNote.replace('{bio}', L('bio'))}</p>`;
}

function chapter(id, title, count, body) {
  return `
    <section class="section chapter" id="ch-${id}">
      <div class="section-head">
        <h2 class="label">${title}</h2>
        ${count ? `<span class="mono muted">${count}</span>` : ''}
      </div>
      ${body}
    </section>`;
}

function pairs(rows, cls = '') {
  return `<dl class="pairs ${cls}">${rows.map(([k, v]) => `<dt class="muted">${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`;
}

function viewWork(slug) {
  const u = U();
  const i = WORKS.findIndex((w) => w.slug === slug);
  if (i < 0) return viewNotFound();
  const w = WORKS[i];
  const prev = WORKS[i - 1];
  const next = WORKS[i + 1];
  const theatre = wf(w, 'theatre');
  const about = wf(w, 'about');
  const cast = wf(w, 'cast');
  const extras = wf(w, 'extras');
  const files = wf(w, 'files');
  const awards = wf(w, 'awards');
  const subtitle = wf(w, 'subtitle');
  const source = wf(w, 'gallerySource');

  const info = [
    [u.premiere, [month(w.month), w.year].filter(Boolean).join(' ')],
    [u.theatre, theatre],
    [u.text, wf(w, 'author')],
    ['', wf(w, 'note')],
  ].filter(([, v]) => v);

  // Главы — показываем только заполненные
  const chapters = [
    about && ['about', u.ch.about, '', `<div class="rich">${richText(about)}</div>`],
    cast.length && ['cast', u.ch.cast, cast.length, pairs(cast, 'is-cast')],
    w.gallery.length && ['gallery', u.ch.gallery, w.gallery.length, `
      <div class="gallery">
        ${w.gallery.map((src, k) => `
          <button class="gallery-item" type="button" data-index="${k}" aria-label="${u.openPhoto} ${k + 1}">
            <img src="${src}" alt="" loading="lazy">
          </button>`).join('')}
      </div>
      ${source ? `<p class="mono muted source">${esc(source)}</p>` : ''}`],
    extras.length && ['video', u.ch.video, extras.length, `
      <div class="gallery">
        ${extras.map((v, k) => `
          <button class="video-item" type="button" data-index="${k}">
            <span class="video-thumb"><img src="${v.poster || ytThumb(v.id)}" alt="" loading="lazy"><span class="card-play" aria-hidden="true"></span></span>
            <span class="video-title">${esc(v.title || `${u.videoN} ${k + 1}`)}</span>
          </button>`).join('')}
      </div>`],
    w.press.length && ['press', u.ch.press, w.press.length,
      `<ul class="press-list">${w.press.map((id) => pressRow(PRESS_BY_ID[id], { showWork: false })).join('')}</ul>`],
    files.length && ['files', u.ch.files, files.length, `
      <ul class="files">
        ${files.map((f) => `
          <li><a href="${f.url}" target="_blank" rel="noopener">
            <span class="mono muted file-type">${fileType(f.url)}</span>
            <span class="file-title">${esc(f.title)}</span>
            <span class="mono muted">${/\.[a-z0-9]{2,4}$/i.test(f.url) ? u.open : '↗'}</span>
          </a></li>`).join('')}
      </ul>`],
  ].filter(Boolean);

  return `
    <a class="back mono" href="${L('works')}">${u.back}</a>
    <section class="work-head">
      <p class="mono muted">${w.year || ''}${w.year && theatre ? ' · ' : ''}${esc(theatre || '')}</p>
      <h1 class="work-title">${esc(wf(w, 'title'))}</h1>
      ${subtitle ? `<p class="work-subtitle">${esc(subtitle)}</p>` : ''}
      ${chapters.length > 1 ? `
        <nav class="chapters mono" aria-label="${u.ch.about}">
          ${chapters.map(([id, t]) => `<a href="#ch-${id}" data-chapter="${id}">${t}</a>`).join('')}
        </nav>` : ''}
    </section>

    ${w.videos.length ? '<div id="player"></div>' : w.cover ? `<img class="work-cover" src="${w.cover}" alt="">` : ''}

    <section class="credits">
      <h2 class="label">${u.aboutWork}</h2>
      <div>
        ${pairs([...info, [u.director, u.directorName], ...wf(w, 'team')])}
        ${awards.length ? `<dl class="pairs"><dt class="muted">${u.awards}</dt><dd>${awards.map(esc).join('<br>')}</dd></dl>` : ''}
      </div>
    </section>

    ${chapters.map(([id, t, n, body]) => chapter(id, t, n, body)).join('')}

    <nav class="pager mono" aria-label="${u.otherWorks}">
      ${prev ? `<a href="${L(`works/${prev.slug}`)}">← ${esc(wf(prev, 'title'))}</a>` : '<span></span>'}
      ${next ? `<a href="${L(`works/${next.slug}`)}">${esc(wf(next, 'title'))} →</a>` : '<span></span>'}
    </nav>`;
}

function timeline(title, rows) {
  return `
    <section class="bio-block">
      <h2 class="label">${title}</h2>
      <dl class="timeline">
        ${rows.map(([y, t]) => `<dt class="mono muted">${esc(y)}</dt><dd>${esc(t)}</dd>`).join('')}
      </dl>
    </section>`;
}

function worksByTheatre() {
  return THEATRES.map((t) => [t, WORKS.filter((w) => w.theatre === t)]).filter(([, list]) => list.length);
}

function viewBio() {
  const u = U();
  const b = bioData();
  const q = LANG === 'en' ? ['“', '”'] : ['«', '»'];
  return `
    <section class="page-head"><h1 class="page-title">${u.nav.bio}</h1></section>
    <div class="bio">
      <figure class="bio-photo"><img src="${PERSON.portrait}" alt="${u.portraitAlt}"></figure>
      <div class="bio-body">
        <p class="bio-lead">${esc(b.lead)}</p>
        ${b.text.map((t) => `<p>${esc(t)}</p>`).join('')}
        ${timeline(u.bioBlocks.education, b.education)}
        ${timeline(u.bioBlocks.positions, b.positions)}
        ${timeline(u.bioBlocks.awards, b.awards)}
        ${timeline(u.bioBlocks.practice, b.practice)}
        <section class="bio-block">
          <h2 class="label">${u.bioBlocks.works}</h2>
          ${worksByTheatre().map(([theatre, list], k) => `
            <details class="works-group"${k === 0 ? ' open' : ''}>
              <summary><span>${esc(tr(theatre))}</span><span class="mono muted">${list.length}</span></summary>
              <ul>${list.map((w) => `
                <li><a href="${L(`works/${w.slug}`)}">
                  <span class="wg-title">${q[0]}${esc(wf(w, 'title'))}${q[1]}</span>
                  <span class="muted">${esc([wf(w, 'author'), wf(w, 'note')].filter(Boolean).join(' · '))}</span>
                  <span class="mono muted wg-year">${w.year || ''}${w.videos.length ? ' ▶' : ''}</span>
                </a></li>`).join('')}
              </ul>
            </details>`).join('')}
        </section>
      </div>
    </div>`;
}

function viewPress() {
  const u = U();
  const byYear = {};
  for (const p of [...PRESS].reverse()) (byYear[p.date.slice(0, 4)] ||= []).push(p);
  return `
    <section class="page-head">
      <h1 class="page-title">${u.nav.press}</h1>
      <p class="mono muted">${u.pressCount(PRESS.length)}${u.pressNote ? `<br>${u.pressNote}` : ''}</p>
      ${searchBox('press', u.searchPress)}
    </section>
    <p class="search-empty mono muted" hidden>${u.nothingFound}</p>
    ${Object.keys(byYear).sort().reverse().map((y) => `
      <section class="press-year" data-q-group>
        <h2 class="label">${y}</h2>
        <ul class="press-list">${byYear[y].map((p) => pressRow(p)).join('')}</ul>
      </section>`).join('')}`;
}

function viewArticle(id) {
  const u = U();
  const p = PRESS_BY_ID[id];
  const t = p && pressText(p);
  if (!t) return viewNotFound();
  const a = u.article;
  const summary = LANG === 'en' ? t.en : t.ru;
  const links = `
    <p class="article-links mono">
      <a href="${p.url}" target="_blank" rel="noopener">${a.original}: ${esc(pf(p, 'source'))} ↗</a>
      ${t.archive ? `<a href="${t.archive}" target="_blank" rel="noopener">${a.archive} ↗</a>` : ''}
    </p>`;
  return `
    <a class="back mono" href="${L('press')}">${a.back}</a>
    <article class="article">
      <header class="article-head">
        <p class="mono muted">${pressDate(p)} · ${pressMeta(p)}</p>
        <h1 class="article-title">${esc(pf(p, 'title'))}</h1>
        ${p.work ? `<a class="press-work" href="${L(`works/${p.work.slug}`)}">→ ${esc(wf(p.work, 'title'))}</a>` : ''}
        ${links}
      </header>
      <section class="article-block">
        <h2 class="label">${a.summary}</h2>
        <div class="rich">${summary.map((x) => `<p>${esc(x)}</p>`).join('')}</div>
      </section>
      ${t.quotes && t.quotes.length ? `
        <section class="article-block">
          <h2 class="label">${a.quotes}</h2>
          ${t.quotes.map((q) => `
            <blockquote class="quote">
              <p>${esc(LANG === 'en' ? q.en : q.ru)}</p>
              ${LANG === 'en' ? `<p class="quote-orig muted" lang="ru">${esc(q.ru)}</p>` : ''}
            </blockquote>`).join('')}
        </section>` : ''}
      <footer class="article-foot">
        <p class="mono muted">${a.note}</p>
        ${links}
      </footer>
    </article>`;
}

function viewContacts() {
  return `
    <section class="page-head"><h1 class="page-title">${U().nav.contacts}</h1></section>
    <ul class="contacts">
      ${PERSON.contacts.map((c) => `
        <li>
          <span class="mono muted">${c.label}</span>
          <a href="${c.url}" ${extLink(c.url)}>${esc(c.value)}</a>
        </li>`).join('')}
    </ul>`;
}

function viewNotFound() {
  return `<section class="page-head"><h1 class="page-title">${U().notFound}</h1><a class="link-arrow mono" href="${L()}">${U().toHome}</a></section>`;
}

/* ---------- Лайтбокс (фото) ---------- */

const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
const lbCap = lb.querySelector('figcaption');
let lbList = [];
let lbIndex = 0;
let returnFocus = null;

function lbShow(i) {
  lbIndex = (i + lbList.length) % lbList.length;
  lbImg.src = lbList[lbIndex];
  lbCap.textContent = `${lbIndex + 1} / ${lbList.length}`;
}
function lbOpen(list, i) {
  lbList = list;
  returnFocus = document.activeElement;
  lb.querySelector('.lb-close').textContent = U().close;
  lb.hidden = false;
  document.body.classList.add('no-scroll');
  lbShow(i);
  lb.querySelector('.lb-close').focus();
}
function lbClose() {
  lb.hidden = true;
  document.body.classList.remove('no-scroll');
  returnFocus && returnFocus.focus();
}
lb.querySelector('.lb-close').addEventListener('click', lbClose);
lb.querySelector('.lb-prev').addEventListener('click', () => lbShow(lbIndex - 1));
lb.querySelector('.lb-next').addEventListener('click', () => lbShow(lbIndex + 1));
lb.addEventListener('click', (e) => e.target === lb && lbClose());
document.addEventListener('keydown', (e) => {
  if (lb.hidden) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbShow(lbIndex - 1);
  if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
});
let touchX = null;
lb.addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), { passive: true });
lb.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) lbShow(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
});

/* ---------- Окно с дополнительным видео ---------- */

const vm = document.getElementById('vmodal');
const vmMount = vm.querySelector('.vmodal-player');
let vmPlayer = null;

function vmOpen(v) {
  returnFocus = document.activeElement;
  if (activePlayer) activePlayer.pause();
  vm.querySelector('.vmodal-title').textContent = v.title || '';
  vm.querySelector('.lb-close').textContent = U().close;
  vm.hidden = false;
  document.body.classList.add('no-scroll');
  vmMount.innerHTML = '<div></div>';
  vmPlayer = createPlayer(vmMount.firstChild, { videos: [{ id: v.id }], poster: v.poster || ytThumb(v.id), title: v.title || '' });
  vmPlayer.start();
  vm.querySelector('.lb-close').focus();
}
function vmClose() {
  if (vmPlayer) vmPlayer.destroy();
  vmPlayer = null;
  vmMount.innerHTML = '';
  vm.hidden = true;
  document.body.classList.remove('no-scroll');
  returnFocus && returnFocus.focus();
}
vm.querySelector('.lb-close').addEventListener('click', vmClose);
vm.addEventListener('click', (e) => e.target === vm && vmClose());
document.addEventListener('keydown', (e) => e.key === 'Escape' && !vm.hidden && vmClose());

/* ---------- Роутер ---------- */

const scrollMemory = new Map();
let currentKey = null;

function route() {
  const hash = location.hash.replace(/^#/, '') || '/';
  // Якоря глав (#ch-...) обрабатываем сами, не как страницы
  if (hash.startsWith('ch-')) return;
  let [path, query] = hash.split('?');
  let parts = path.split('/').filter(Boolean);
  LANG = parts[0] === 'en' ? 'en' : 'ru';
  if (LANG === 'en') parts = parts.slice(1);
  const pagePath = parts.join('/') + (query ? `?${query}` : '');

  if (currentKey) scrollMemory.set(currentKey, window.scrollY);
  if (activePlayer) { activePlayer.destroy(); activePlayer = null; }
  if (!menu.hidden) setMenu(false);

  const u = U();
  const section = u.nav[parts[0]] ? parts[0] : '';
  const work = parts[0] === 'works' && parts[1] && WORKS.find((x) => x.slug === parts[1]);
  const article = parts[0] === 'press' && parts[1] && PRESS_BY_ID[parts[1]];

  let html;
  if (!parts.length) html = viewHome();
  else if (parts[0] === 'works' && parts[1]) html = viewWork(parts[1]);
  else if (parts[0] === 'works') html = viewWorks(query);
  else if (parts[0] === 'bio') html = viewBio();
  else if (parts[0] === 'press' && parts[1]) html = viewArticle(parts[1]);
  else if (parts[0] === 'press') html = viewPress();
  else if (parts[0] === 'contacts') html = viewContacts();
  else html = viewNotFound();

  const name = person().name;
  if (work) document.title = `${wf(work, 'title')}${work.year ? ` (${work.year})` : ''} — ${name}`;
  else if (article) document.title = `${pf(article, 'title')} — ${name}`;
  else if (section) document.title = `${u.nav[section]} — ${name}`;
  else document.title = u.siteTitle;

  renderChrome(section, pagePath);
  app.innerHTML = html;
  app.classList.remove('fade-in');
  void app.offsetWidth;
  app.classList.add('fade-in');

  bindSearch();

  if (work) {
    const el = document.getElementById('player');
    if (el) activePlayer = createPlayer(el, { videos: work.videos, poster: work.cover, title: wf(work, 'title') });
    const extras = wf(work, 'extras');
    app.querySelectorAll('.gallery-item').forEach((b) =>
      b.addEventListener('click', () => lbOpen(work.gallery, Number(b.dataset.index)))
    );
    app.querySelectorAll('.video-item').forEach((b) =>
      b.addEventListener('click', () => vmOpen(extras[Number(b.dataset.index)]))
    );
    app.querySelectorAll('[data-chapter]').forEach((a) =>
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(`ch-${a.dataset.chapter}`).scrollIntoView({ behavior: 'smooth' });
      })
    );
  }

  // Списки помнят прокрутку (вернулись из спектакля — оказались там же), страницы спектаклей — сверху
  currentKey = hash;
  window.scrollTo(0, parts[1] ? 0 : scrollMemory.get(hash) || 0);
}

window.addEventListener('hashchange', route);
route();
