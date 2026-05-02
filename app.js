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

/* ─── Build slide HTML ──────────────────────────────────── */

function buildSlide(slide, index) {
  const el = document.createElement('article');
  el.className = `slide slide--${slide.accent}${index === 0 ? ' is-active' : ''}`;
  el.dataset.index = index;

  if (slide.qr) {
    el.innerHTML = `
      <div class="slide-body">
        <span class="slide-label">${slide.label}</span>
        <h1 class="slide-title">${slide.title}</h1>
        <div class="slide-divider"></div>
        <p class="slide-sub">${slide.sub}</p>
        <p class="slide-detail">${slide.detail}</p>
      </div>
      <div class="slide-qr">
        <img src="./assets/qr-cowleyroadstudios.svg"
             alt="QR code — cowleyroadstudios.com"
             class="qr-image" />
        <span class="qr-label">Scan to book</span>
        <span class="qr-url">cowleyroadstudios.com</span>
      </div>`;
  } else {
    el.innerHTML = `
      <div class="slide-body">
        <span class="slide-label">${slide.label}</span>
        <h1 class="slide-title">${slide.title}</h1>
        <div class="slide-divider"></div>
        <p class="slide-sub">${slide.sub}</p>
        <p class="slide-detail">${slide.detail}</p>
      </div>`;
  }

  return el;
}

/* ─── Build dots ────────────────────────────────────────── */

function buildDots() {
  dotsWrap.innerHTML = slides
    .map((s, i) => `<button class="dot${i === 0 ? ' is-active' : ''}"
        type="button"
        aria-label="Slide ${i + 1}: ${s.label}"
        data-index="${i}"></button>`)
    .join('');
}

/* ─── Build ticker ──────────────────────────────────────── */

function buildTicker() {
  const doubled = [...tickerItems, ...tickerItems]
    .map(t => `<span class="ticker-item">${t}</span>`)
    .join('');
  tickerTrack.innerHTML = `<div class="ticker-marquee">${doubled}</div>`;
}

/* ─── Render active slide ───────────────────────────────── */

function renderSlide(index) {
  // hide old
  document.querySelectorAll('.slide').forEach((el, i) => {
    el.classList.toggle('is-active', i === index);
  });

  // dots
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index);
    dot.setAttribute('aria-current', i === index ? 'true' : 'false');
  });

  // counter + status
  const s = slides[index];
  counterEl.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  statusEl.textContent  = `${s.label} · live`;
}

/* ─── Navigation ────────────────────────────────────────── */

function goTo(index) {
  activeIndex = (index + slides.length) % slides.length;
  renderSlide(activeIndex);
  resetTimer();
}

function next() { goTo(activeIndex + 1); }
function prev() { goTo(activeIndex - 1); }

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(next, ROTATE_MS);
}

/* ─── Events ────────────────────────────────────────────── */

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

/* ─── Init ──────────────────────────────────────────────── */

function init() {
  // mount all slides (CSS opacity handles visibility)
  slides.forEach((slide, i) => stage.appendChild(buildSlide(slide, i)));
  buildDots();
  buildTicker();
  renderSlide(0);
  wireEvents();
  resetTimer();
}

init();
