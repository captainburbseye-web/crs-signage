import { slides, tickerItems } from './content.js';

const stage       = document.getElementById('stage');
const dotsWrap    = document.getElementById('dots');
const prevBtn     = document.getElementById('prev-btn');
const nextBtn     = document.getElementById('next-btn');
const counterEl   = document.getElementById('slide-counter');
const statusEl    = document.getElementById('system-status');
const tickerTrack = document.getElementById('ticker-track');

const ROTATE_MS = 9000;
let activeIndex = 0;
let timer;

/* ── Per-slide logo map ─────────────────────────────────── */
const SLIDE_LOGOS = {
  hero:       { src: './assets/brand-crs-lightbox.png',    alt: 'Cowley Road Studios' },
  stronghold: { src: './assets/crs-logo.png',              alt: 'Cowley Road Studios' },
  recording:  { src: './assets/brand-crs-rack-sign.png',   alt: 'CRS Recording' },
  rehearsal:  { src: './assets/brand-cricket-sign.png',    alt: 'Cricket Road Studios' },
  hammond:    { src: './assets/crs-badge-square.png',      alt: 'CRS' },
  facilities: { src: './assets/brand-cricket-sign.png',    alt: 'Cricket Road Studios' },
  odro:       { src: './assets/brand-crs-console.png',     alt: 'ODRO Engineering' },
  cafe:       { src: './assets/brand-cafe-badge.png',      alt: 'The Workshop Café' },
  legacy:     { src: './assets/brand-crs-rack-sign.png',   alt: 'Cowley Road Studios' },
  cta:        { src: './assets/brand-crs-lightbox.png',    alt: 'Cowley Road Studios' },
};

/* ── VU meter HTML — 6 columns, L+R pairs ──────────────── */
function buildVU() {
  // Each column: 3 green, 2 yellow, 1 orange, 1 red segs (bottom→top)
  const cols = [
    ['green','green','green','yellow','yellow','orange','red'],
    ['green','green','green','green','yellow','yellow','orange'],
    ['green','green','green','yellow','yellow','orange','red'],
    ['green','green','green','green','yellow','orange','red'],
    ['green','green','yellow','yellow','orange','red','red'],
    ['green','green','green','yellow','yellow','orange','orange'],
  ];
  const labels = ['L','','','','','R'];
  return `
    <div class="panel-vu">
      ${cols.map((segs, ci) => `
        <div>
          <div class="vu-meter">
            ${segs.map(c => `<div class="vu-seg vu-seg--${c}"></div>`).join('')}
          </div>
          <div class="vu-label">${labels[ci]}</div>
        </div>`).join('')}
    </div>`;
}

/* ── Build panel header ─────────────────────────────────── */
function buildPanelHeader(slide) {
  const labels = {
    hero:       'CRS · OXFORD',
    stronghold: 'THE STRONGHOLD',
    recording:  'STUDIO A · SSL BiG SiX',
    rehearsal:  'CRICKET ROAD · REHEARSAL',
    hammond:    'HAMMOND · IN RESIDENCE',
    facilities: 'FULLY EQUIPPED',
    odro:       'ODRO ENGINEERING',
    cafe:       'THE WORKSHOP CAFÉ',
    legacy:     'EST. 1999',
    cta:        'BOOK ONLINE',
  };
  return `
    <div class="panel-header">
      <span class="panel-header-label">${labels[slide.id] || 'CRS · OXFORD'}</span>
      <span class="panel-header-bar"></span>
    </div>`;
}

/* ── Build rack panel (right column) ───────────────────── */
function buildPanel(slide) {

  const header = buildPanelHeader(slide);
  const vu     = buildVU();

  // QR block (CTA slide only)
  if (slide.qr) {
    return `
      ${header}
      ${vu}
      <div class="panel-qr">
        <img src="./assets/qr-cowleyroadstudios.svg"
             alt="QR — cowleyroadstudios.com" class="qr-image" />
        <span class="qr-label">SCAN TO BOOK</span>
        <span class="qr-url">cowleyroadstudios.com</span>
      </div>
      <span class="panel-bolt panel-bolt--bl" aria-hidden="true"></span>
      <span class="panel-bolt panel-bolt--br" aria-hidden="true"></span>
      ${buildRackNum(slide)}`;
  }

  // Brand image panel — full-width graphic that IS the brand
  const logo = SLIDE_LOGOS[slide.id] || SLIDE_LOGOS.hero;

  // For café slide: use the café exterior photo as background image
  const brandImgSrc = slide.id === 'cafe'
    ? './assets/brand-cafe-exterior.png'
    : logo.src;

  const brandImg = `
    <img src="${brandImgSrc}"
         alt="${logo.alt}"
         class="panel-brand-img"
         style="max-height:${slide.id === 'cafe' ? '14rem' : '10rem'}; object-fit:${slide.id === 'cafe' ? 'cover' : 'contain'}; padding:${slide.id === 'cafe' ? '0' : '0.75rem 1.5rem'}; background:${slide.id === 'cafe' ? 'transparent' : 'rgba(0,0,0,0.3)'};" />`;

  // Bullets
  const bullets = `
    <ul class="panel-bullets">
      ${slide.bullets.map(b => `
        <li class="bullet-item">
          <span class="bullet-mark" aria-hidden="true"></span>
          <span>${b}</span>
        </li>`).join('')}
    </ul>`;

  return `
    <span class="panel-bolt panel-bolt--tl" aria-hidden="true"></span>
    <span class="panel-bolt panel-bolt--tr" aria-hidden="true"></span>
    ${header}
    ${vu}
    ${brandImg}
    ${bullets}
    <span class="panel-bolt panel-bolt--bl" aria-hidden="true"></span>
    <span class="panel-bolt panel-bolt--br" aria-hidden="true"></span>
    ${buildRackNum(slide)}`;
}

function buildRackNum(slide) {
  return `
    <div class="panel-rack-num">
      <span class="rack-num-label">UNIT</span>
      <span class="rack-num-val">${slide.slide} / ${String(slides.length).padStart(2,'0')}</span>
    </div>`;
}

/* ── Build one slide element ────────────────────────────── */
function buildSlide(slide, index) {
  const el = document.createElement('article');
  el.className = `slide slide--${slide.accent}${index === 0 ? ' is-active' : ''}`;
  el.dataset.id    = slide.id;
  el.dataset.index = index;

  const bgHtml = slide.bg
    ? `<div class="slide-bg" style="background-image:url('${slide.bg}')"></div>`
    : '';

  el.innerHTML = `
    ${bgHtml}
    <div class="slide-main">
      <span class="status-pill">${slide.status}</span>
      <h1 class="slide-title">${slide.title}</h1>
      <div class="slide-divider" aria-hidden="true"></div>
      <p class="slide-sub">${slide.sub}</p>
      <p class="slide-detail">${slide.detail}</p>
    </div>
    <div class="slide-panel">
      ${buildPanel(slide)}
    </div>`;

  return el;
}

/* ── Dots ───────────────────────────────────────────────── */
function buildDots() {
  dotsWrap.innerHTML = slides.map((s, i) =>
    `<button class="dot${i === 0 ? ' is-active' : ''}"
       type="button" aria-label="Slide ${i+1}" data-index="${i}"></button>`
  ).join('');
}

/* ── Ticker ─────────────────────────────────────────────── */
function buildTicker() {
  const items = [...tickerItems, ...tickerItems]
    .map(t => `<span class="ticker-item">${t}</span>`)
    .join('');
  tickerTrack.innerHTML = `<div class="ticker-marquee">${items}</div>`;
}

/* ── Render active ──────────────────────────────────────── */
function renderSlide(index) {
  document.querySelectorAll('.slide').forEach((el, i) =>
    el.classList.toggle('is-active', i === index)
  );
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index);
    dot.setAttribute('aria-current', i === index ? 'true' : 'false');
  });
  const s = slides[index];
  counterEl.textContent = `${s.slide} / ${String(slides.length).padStart(2,'0')}`;
  statusEl.textContent  = s.status;
}

/* ── Navigation ─────────────────────────────────────────── */
function goTo(index) {
  activeIndex = (index + slides.length) % slides.length;
  renderSlide(activeIndex);
  resetTimer();
}
const next = () => goTo(activeIndex + 1);
const prev = () => goTo(activeIndex - 1);
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(next, ROTATE_MS);
}

/* ── Events ─────────────────────────────────────────────── */
function wireEvents() {
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  dotsWrap.addEventListener('click', e => {
    const btn = e.target.closest('[data-index]');
    if (btn) goTo(Number(btn.dataset.index));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === ' ') { e.preventDefault(); resetTimer(); }
  });
}

/* ── Init ───────────────────────────────────────────────── */
function init() {
  slides.forEach((s, i) => stage.appendChild(buildSlide(s, i)));
  buildDots();
  buildTicker();
  renderSlide(0);
  wireEvents();
  resetTimer();
}

init();
