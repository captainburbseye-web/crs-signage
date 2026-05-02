import { slides, tickerItems } from './content.js';

const stage = document.querySelector('#stage');
const dots = document.querySelector('#dots');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const slideQueue = document.querySelector('#slide-queue');
const slideCounter = document.querySelector('#slide-counter');
const focusTitle = document.querySelector('#focus-title');
const focusCopy = document.querySelector('#focus-copy');
const reelName = document.querySelector('#reel-name');
const systemStatus = document.querySelector('#system-status');
const tickerTrack = document.querySelector('#ticker-track');

const ROTATE_MS = 9000;
let activeIndex = 0;
let autoAdvance;

function createMetaItems(items = []) {
  return items
    .map((item) => `<span class="meta-chip">${item}</span>`)
    .join('');
}

function createBulletItems(items = []) {
  return items
    .map((item) => `<li class="bullet-item"><span class="bullet-mark"></span><span>${item}</span></li>`)
    .join('');
}

function slideTemplate(slide) {
  const isCTA = slide.id === 'cta';

  return `
    <article class="slide slide--${slide.accent} ${isCTA ? 'slide--cta' : ''}">
      <div class="slide-backdrop"></div>
      <div class="slide-grid">
        <section class="slide-main">
          <div class="eyebrow-row">
            <span class="eyebrow">${slide.kicker}</span>
            <span class="status-pill">${slide.status}</span>
          </div>

          <h1 class="slide-title">${slide.title}</h1>
          <p class="slide-subtitle">${slide.subtitle}</p>

          <div class="meta-row">${createMetaItems(slide.meta)}</div>

          <p class="slide-body">${slide.body}</p>

          <ul class="bullet-list">
            ${createBulletItems(slide.bullets)}
          </ul>
        </section>

        <section class="slide-side ${isCTA ? 'slide-side--qr' : ''}">
          ${
            isCTA
              ? `
              <div class="qr-card">
                <img src="./assets/qr-cowleyroadstudios.svg" alt="QR code to cowleyroadstudios.com" class="qr-image" />
                <div class="qr-copy">
                  <span class="qr-overline">Scan here</span>
                  <strong>cowleyroadstudios.com</strong>
                  <span>Recording · rehearsal · venue hire · Workshop Café</span>
                </div>
              </div>
            `
              : `
              <div class="quote-card">
                <span class="quote-label">Signal line</span>
                <p>${slide.footer}</p>
              </div>
            `
          }
        </section>
      </div>
    </article>
  `;
}

function renderSlide(index) {
  const slide = slides[index];
  stage.innerHTML = slideTemplate(slide);

  focusTitle.textContent = slide.title;
  focusCopy.textContent = `${slide.subtitle} — ${slide.status}`;
  slideCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  reelName.textContent = slide.id === 'cafe' ? 'Workshop Signal' : 'CRS Core';
  systemStatus.textContent = `${slide.status} · reel online`;

  [...dots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === index);
    dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
  });

  [...slideQueue.children].forEach((item, itemIndex) => {
    item.classList.toggle('is-active', itemIndex === index);
  });
}

function buildDots() {
  dots.innerHTML = slides
    .map(
      (slide, index) =>
        `<button class="dot ${index === 0 ? 'is-active' : ''}" type="button" aria-label="Go to ${slide.title}" data-index="${index}"></button>`
    )
    .join('');
}

function buildQueue() {
  slideQueue.innerHTML = slides
    .map(
      (slide, index) => `
      <button class="queue-item ${index === 0 ? 'is-active' : ''}" type="button" data-index="${index}">
        <span class="queue-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="queue-title">${slide.title}</span>
      </button>
    `
    )
    .join('');
}

function buildTicker() {
  const markup = [...tickerItems, ...tickerItems]
    .map((item) => `<span class="ticker-item">${item}</span>`)
    .join('');
  tickerTrack.innerHTML = `<div class="ticker-marquee">${markup}</div>`;
}

function goToSlide(index) {
  activeIndex = (index + slides.length) % slides.length;
  renderSlide(activeIndex);
  resetAutoAdvance();
}

function nextSlide() {
  goToSlide(activeIndex + 1);
}

function prevSlide() {
  goToSlide(activeIndex - 1);
}

function resetAutoAdvance() {
  window.clearInterval(autoAdvance);
  autoAdvance = window.setInterval(nextSlide, ROTATE_MS);
}

function wireEvents() {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  dots.addEventListener('click', (event) => {
    const button = event.target.closest('[data-index]');
    if (!button) return;
    goToSlide(Number(button.dataset.index));
  });

  slideQueue.addEventListener('click', (event) => {
    const button = event.target.closest('[data-index]');
    if (!button) return;
    goToSlide(Number(button.dataset.index));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') nextSlide();
    if (event.key === 'ArrowLeft') prevSlide();
    if (event.key === ' ') {
      event.preventDefault();
      resetAutoAdvance();
    }
  });
}

function init() {
  buildDots();
  buildQueue();
  buildTicker();
  renderSlide(activeIndex);
  wireEvents();
  resetAutoAdvance();
}

init();
