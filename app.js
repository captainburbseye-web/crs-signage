import { slides, tickerItems } from './content.js';

const stage       = document.getElementById('stage');
const dotsWrap    = document.getElementById('dots');
const prevBtn     = document.getElementById('prev-btn');
const nextBtn     = document.getElementById('next-btn');
const counterEl   = document.getElementById('slide-counter');
const statusEl    = document.getElementById('system-status');
const tickerTrack = document.getElementById('ticker-track');

const ROTATE_MS = 8000;
let activeIndex = 0;
let timer;

/* ── Per-slide logo map ─────────────────────────────────── */
const SLIDE_LOGOS = {
  hero:       { src: './assets/crs-rack-badge.png',      alt: 'Cowley Road Studios' },
  stronghold: { src: './assets/crs-logo.png',            alt: 'Cowley Road Studios' },
  recording:  { src: './assets/crs-badge-square.png',    alt: 'CRS Recording' },
  rehearsal:  { src: './assets/cricket-logo.png',        alt: 'Cricket Road Studios' },
  hammond:    { src: './assets/crs-badge-square.png',    alt: 'CRS' },
  facilities: { src: './assets/cricket-logo.png',        alt: 'Cricket Road Studios' },
  odro:       { src: './assets/crs-badge-square.png',    alt: 'ODRO Engineering' },
  cafe:       { src: './assets/workshop-cafe-logo.png',  alt: 'Workshop Café' },
  legacy:     { src: './assets/crs-logo.png',            alt: 'Cowley Road Studios' },
  cta:        { src: './assets/crs-rack-badge.png',      alt: 'Cowley Road Studios' },
};

/* ── Build rack panel (right column) ───────────────────── */
function buildPanel(slide) {

  // QR block (CTA slide)
  const qrHtml = slide.qr ? `
    <div class="panel-qr">
      <img src="./assets/qr-cowleyroadstudios.svg"
           alt="QR — cowleyroadstudios.com" class="qr-image" />
      <span class="qr-label">SCAN TO BOOK</span>
      <span class="qr-url">cowleyroadstudios.com</span>
    </div>` : '';

  // Bullets
  const bulletsHtml = !slide.qr ? `
    <ul class="panel-bullets">
      ${slide.bullets.map(b => `
        <li class="bullet-item">
          <span class="bullet-mark" aria-hidden="true"></span>
          <span>${b}</span>
        </li>`).join('')}
    </ul>` : '';

  // Logo for this slide
  const logo = SLIDE_LOGOS[slide.id] || SLIDE_LOGOS.hero;
  const logoHtml = `
    <div class="panel-logo-unit">
      <img src="${logo.src}" alt="${logo.alt}" class="panel-logo-img" />
    </div>`;

  // Rack unit counter
  const numHtml = `
    <div class="panel-rack-num">
      <span class="rack-num-label">UNIT</span>
      <span class="rack-num-val">${slide.slide} / ${String(slides.length).padStart(2, '0')}</span>
    </div>`;

  return `
    <!-- bolt corners -->
    <span class="panel-bolt panel-bolt--tl" aria-hidden="true"></span>
    <span class="panel-bolt panel-bolt--tr" aria-hidden="true"></span>
    <span class="panel-bolt panel-bolt--bl" aria-hidden="true"></span>
    <span class="panel-bolt panel-bolt--br" aria-hidden="true"></span>

    <!-- rack channel strip label -->
    <div class="panel-channel-strip">
      <span class="panel-channel-text">CRS · OXFORD</span>
    </div>

    ${qrHtml || bulletsHtml}

    ${logoHtml}
    ${numHtml}`;
}

/* ── Build one slide element ────────────────────────────── */
function buildSlide(slide, index) {
  const el = document.createElement('article');
  el.className = `slide slide--${slide.accent}${index === 0 ? ' is-active' : ''}`;
  el.dataset.index = index;

  const bgHtml = slide.bg
    ? `<div class="slide-bg" style="background-image: url('${slide.bg}')"></div>`
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
       type="button"
       aria-label="Slide ${i + 1}"
       data-index="${i}"></button>`
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
  counterEl.textContent = `${s.slide} / ${String(slides.length).padStart(2, '0')}`;
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
