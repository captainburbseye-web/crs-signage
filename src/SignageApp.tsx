/**
 * CRS Signage — Reality-Based Loop
 * ─────────────────────────────────
 * Frame 0 — Café Welcome: Workshop Café street-facing intro (12s)
 * Frame 1 — Ambient: slow waveform, identity-only, no text (18s)
 * Frame 2 — Services: Recording + Rehearsal — 3×5 rule applied (12s)
 * Frame 3 — Event: OCM Listening Party, Fri 6 Mar — auto-expires 7 Mar (14s)
 * Frame 4 — Venue: Space available for hire (14s)
 * Frame 5 — Contact: website / email / socials (10s)
 *
 * DAY/NIGHT MODE: 9am–6pm = light bg (DayThemeCRS), 6pm–9am = dark bg (C).
 * Theme is checked on mount and on each loop restart.
 *
 * SIZING NOTE: All font sizes are tuned for a 55" 1080p screen viewed from
 * ~3 metres. Minimum body text ~40px, headlines 100–160px.
 */

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import CRSShell, { CRSLogoBlock } from './CRSShell';
import { C, T, isDaytime, DayThemeCRS } from './brand';

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────
// Provides day/night colour tokens to all frames without prop-drilling.
type ThemeTokens = {
  bg: string;
  text: string;
  textDim: string;
  textFaint: string;
  border: string;
  cardBg: string;
  cardBorder: string;
  tickerBg: string;
  tickerText: string;
  accentGreen: string;
  accentMustard: string;
  flashColor: string;
  isDay: boolean;
};

const nightTheme: ThemeTokens = {
  bg:            C.bg,
  text:          C.text,
  textDim:       C.textDim,
  textFaint:     C.textFaint,
  border:        C.border,
  cardBg:        'rgba(255,255,255,0.03)',
  cardBorder:    'rgba(255,255,255,0.08)',
  tickerBg:      'rgba(0,0,0,0.7)',
  tickerText:    C.logoMustard,
  accentGreen:   C.stripeLime,
  accentMustard: C.logoMustard,
  flashColor:    '#7EC820',
  isDay:         false,
};

const dayTheme: ThemeTokens = {
  bg:            DayThemeCRS.bg,
  text:          DayThemeCRS.text,
  textDim:       DayThemeCRS.textDim,
  textFaint:     DayThemeCRS.textFaint,
  border:        DayThemeCRS.border,
  cardBg:        DayThemeCRS.cardBg,
  cardBorder:    DayThemeCRS.cardBorder,
  tickerBg:      DayThemeCRS.tickerBg,
  tickerText:    DayThemeCRS.tickerText,
  accentGreen:   DayThemeCRS.accentGreen,
  accentMustard: DayThemeCRS.accentMustard,
  flashColor:    DayThemeCRS.flashColor,
  isDay:         true,
};

const ThemeCtx = createContext<ThemeTokens>(nightTheme);
const useTheme = () => useContext(ThemeCtx);

// ─── OCM EVENT EXPIRY ─────────────────────────────────────────────────────────
function isOCMEventActive(): boolean {
  return new Date() < new Date('2026-03-07T00:00:00Z');
}

// ─── CONTACT TICKER ──────────────────────────────────────────────────────────
function ContactTicker() {
  const th = useTheme();
  const items = [
    '◆', 'www.crsoxford.com',
    '◆', 'Recording & Rehearsal Studios · Oxford',
    '◆', 'info@crs.com',
    '◆', '@cowleyroadstudios',
    '◆', 'Workshop Café · 118 Cowley Road',
    '◆', 'www.crsoxford.com', '◆',
  ];
  return (
    <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: 52,
      background: th.tickerBg,
      borderTop: `1px solid ${th.border}`,
      overflow: 'hidden',
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        gap: '5rem',
        whiteSpace: 'nowrap',
        animation: 'tickerScroll 36s linear infinite',
        fontFamily: T.mono,
        fontSize: 22,
        letterSpacing: '0.18em',
        color: th.tickerText,
        textTransform: 'uppercase',
      }}>
        {items.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </div>
  );
}

// ─── FRAME 0: CAFÉ WELCOME ────────────────────────────────────────────────────
// Always uses Workshop Café brand colours — independent of CRS day/night mode.
function CafeWelcomeFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 'clamp(2rem, 4vmin, 5rem)',
      padding: 'clamp(2rem, 5vmin, 5rem)',
      background: 'linear-gradient(160deg, #1A1E21 0%, #2E473B22 50%, #1A1E21 100%)',
    }}>
      <div style={{
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
        background: '#C2A85A',
        border: '4px solid #2E473B',
        borderRadius: 4,
        padding: 'clamp(12px, 2vmin, 24px) clamp(24px, 4vw, 56px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
      }}>
        <span style={{ fontFamily: T.mono, fontSize: 'clamp(1rem, 1.6vw, 2rem)', fontWeight: 600, color: '#2E473B', letterSpacing: '0.22em', textTransform: 'uppercase', lineHeight: 1, opacity: 0.8 }}>THE BILLET BUILDING · HOME TO</span>
        <span style={{ fontFamily: T.display, fontSize: 'clamp(3rem, 6vw, 8rem)', fontWeight: 800, color: '#2E473B', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>THE WORKSHOP CAFÉ</span>
        <span style={{ fontFamily: T.mono, fontSize: 'clamp(1rem, 1.6vw, 2rem)', fontWeight: 600, color: '#2E473B', letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: 1, marginTop: 6, opacity: 0.75 }}>Coffee · Repairs · Musical Curios · Work Spaces</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(46,71,59,0.35)', border: '2px solid #4F7942', borderRadius: 6, padding: 'clamp(12px, 2vmin, 24px) clamp(24px, 4vw, 48px)' }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#C2A85A', boxShadow: '0 0 14px #C2A85A', animation: 'ledPulse 2.4s ease-in-out infinite' }} />
        <span style={{ fontFamily: T.mono, fontSize: 'clamp(1.4rem, 2.4vw, 3.2rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C2A85A', fontWeight: 700 }}>Opening April 2026</span>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 'clamp(1.2rem, 2vw, 2.8rem)', color: '#7F8F55', letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'center', opacity: 0.85 }}>
        Recording Studios · Rehearsal Rooms · Open Now
      </div>
    </div>
  );
}

// ─── FRAME 1: AMBIENT — Oscilloscope + Spectrogram ───────────────────────────
function AmbientFrame({ surge = false }: { surge?: boolean }) {
  const th = useTheme();
  const oscRef  = useRef<HTMLCanvasElement>(null);
  const specRef = useRef<HTMLCanvasElement>(null);
  const rafRef  = useRef<number>(0);
  const surgeRef = useRef(surge);
  surgeRef.current = surge;

  useEffect(() => {
    const osc  = oscRef.current;
    const spec = specRef.current;
    if (!osc || !spec) return;
    const octx = osc.getContext('2d')!;
    const sctx = spec.getContext('2d')!;

    const GREEN  = th.isDay ? '#1E5C0A' : '#7EC820';
    const AMBER  = th.isDay ? '#8A6000' : '#FFB800';
    const DIM    = th.isDay ? 'rgba(30,92,10,0.15)' : 'rgba(126,200,32,0.10)';
    const BGFILL = th.isDay ? 'rgba(244,245,245,0.94)' : 'rgba(8,12,8,0.90)';
    const GRID   = th.isDay ? 'rgba(0,0,0,0.07)' : 'rgba(126,200,32,0.09)';
    const LABEL  = th.isDay ? '#1A1A1A' : '#7EC820';

    let t = 0;
    let surgeT = 0;
    const SURGE_FRAMES = 180;

    // Pseudo-audio: sum of harmonics with slow drift
    function signal(px: number, tt: number, sm: number): number {
      return (
        Math.sin(px * 0.018 * sm + tt * 1.1) * 0.38
        + Math.sin(px * 0.031 * sm + tt * 0.7 + 1.2) * 0.22
        + Math.sin(px * 0.052 * sm + tt * 1.8 + 2.4) * 0.14
        + Math.sin(px * 0.009 * sm + tt * 0.4 + 0.6) * 0.18
        + (Math.random() - 0.5) * 0.04
      );
    }

    // Spectrogram history
    const BINS = 32;
    const specHistory: number[][] = [];

    function fakeBins(tt: number, sm: number): number[] {
      return Array.from({ length: BINS }, (_, i) => {
        const f = i / BINS;
        const low  = Math.exp(-((f - 0.08) ** 2) / 0.006) * (0.7 + 0.3 * Math.sin(tt * 0.9 + i * 0.4));
        const mid  = Math.exp(-((f - 0.35) ** 2) / 0.018) * (0.4 + 0.3 * Math.sin(tt * 1.3 + i * 0.7));
        const high = Math.exp(-((f - 0.72) ** 2) / 0.04)  * (0.2 + 0.15 * Math.sin(tt * 2.1 + i));
        return Math.min(1, (low + mid + high + Math.random() * 0.08) * sm);
      });
    }

    function resize() {
      if (!osc || !spec) return;
      osc.width  = osc.offsetWidth;   osc.height  = osc.offsetHeight;
      spec.width = spec.offsetWidth;  spec.height = spec.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawOscilloscope(sm: number) {
      if (!osc) return;
      const W = osc.width, H = osc.height;
      octx.fillStyle = BGFILL;
      octx.fillRect(0, 0, W, H);
      // Grid
      octx.strokeStyle = GRID;
      octx.lineWidth = 1;
      for (let gx = 0; gx <= W; gx += W / 8) { octx.beginPath(); octx.moveTo(gx, 0); octx.lineTo(gx, H); octx.stroke(); }
      for (let gy = 0; gy <= H; gy += H / 4) { octx.beginPath(); octx.moveTo(0, gy); octx.lineTo(W, gy); octx.stroke(); }
      // Centre line
      octx.strokeStyle = DIM; octx.lineWidth = 1;
      octx.beginPath(); octx.moveTo(0, H / 2); octx.lineTo(W, H / 2); octx.stroke();
      // Two channels
      [{ phase: 0, color: GREEN, lw: 2.5, yOff: -H * 0.08 },
       { phase: 0.4, color: AMBER, lw: 1.8, yOff: H * 0.08 }].forEach(({ phase, color, lw, yOff }) => {
        octx.beginPath();
        octx.strokeStyle = color;
        octx.lineWidth = lw;
        octx.shadowColor = color;
        octx.shadowBlur = th.isDay ? 0 : 10;
        for (let px = 0; px < W; px++) {
          const y = H / 2 + yOff + signal(px, t + phase, sm) * H * 0.38;
          if (px === 0) octx.moveTo(px, y); else octx.lineTo(px, y);
        }
        octx.stroke();
        octx.shadowBlur = 0;
      });
      // Labels
      octx.font = `bold 14px 'JetBrains Mono', monospace`;
      octx.globalAlpha = 0.65;
      octx.fillStyle = GREEN;  octx.fillText('CH1  L', 14, 22);
      octx.fillStyle = AMBER;  octx.fillText('CH2  R', 14, 40);
      octx.fillStyle = LABEL;  octx.fillText('OSCILLOSCOPE', W - 168, 22);
      octx.globalAlpha = 1;
    }

    function drawSpectrogram(sm: number) {
      if (!spec) return;
      const W = spec.width, H = spec.height;
      sctx.fillStyle = BGFILL;
      sctx.fillRect(0, 0, W, H);
      specHistory.push(fakeBins(t, sm));
      if (specHistory.length > 600) specHistory.shift();
      const colW = Math.max(1, W / Math.min(specHistory.length, 600));
      const binH = H / BINS;
      const startCol = Math.max(0, specHistory.length - Math.floor(W / colW));
      for (let ci = startCol; ci < specHistory.length; ci++) {
        const bins = specHistory[ci];
        const x = (ci - startCol) * colW;
        for (let bi = 0; bi < BINS; bi++) {
          const v = bins[BINS - 1 - bi];
          let r = 0, g = 0, b = 0;
          if (v < 0.33) {
            g = Math.round(v * 3 * (th.isDay ? 90 : 200));
            r = Math.round(v * 3 * (th.isDay ? 20 : 30));
          } else if (v < 0.66) {
            const vv = (v - 0.33) * 3;
            r = Math.round(vv * (th.isDay ? 130 : 255));
            g = Math.round((th.isDay ? 90 : 200) + vv * 55);
          } else {
            const vv = (v - 0.66) * 3;
            r = th.isDay ? 170 : 255;
            g = Math.round((th.isDay ? 145 : 255) - vv * 55);
            b = Math.round(vv * (th.isDay ? 90 : 200));
          }
          sctx.fillStyle = `rgb(${r},${g},${b})`;
          sctx.fillRect(x, bi * binH, Math.ceil(colW) + 1, Math.ceil(binH) + 1);
        }
      }
      // Freq labels
      const freqLabels = ['20k','8k','4k','2k','1k','500','250','125','60','20'];
      sctx.font = `bold 11px 'JetBrains Mono', monospace`;
      sctx.fillStyle = LABEL; sctx.globalAlpha = 0.6;
      freqLabels.forEach((lbl, i) => { sctx.fillText(lbl, 4, (i / (freqLabels.length - 1)) * H + 4); });
      sctx.globalAlpha = 0.65;
      sctx.fillText('SPECTROGRAM', W - 160, 16);
      sctx.globalAlpha = 1;
    }

    function draw() {
      if (surgeRef.current && surgeT < SURGE_FRAMES) surgeT++;
      else if (!surgeRef.current) surgeT = 0;
      const sm = surgeT > 0 ? 1 + 1.8 * Math.sin((surgeT / SURGE_FRAMES) * Math.PI) : 1;
      drawOscilloscope(sm);
      drawSpectrogram(sm);
      t += 0.022;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [th.isDay]);

  const panelBg   = th.isDay ? '#E8EAE4' : '#080C08';
  const borderCol = th.isDay ? 'rgba(30,92,10,0.25)' : 'rgba(126,200,32,0.18)';
  const labelCol  = th.isDay ? '#1A1A1A' : '#7EC820';

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: panelBg, fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Top label bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 20px', borderBottom: `1px solid ${borderCol}`, flexShrink: 0 }}>
        <span style={{ fontSize: 13, letterSpacing: '0.28em', color: labelCol, opacity: 0.65, textTransform: 'uppercase' }}>Cowley Road Studios · Monitor</span>
        <span style={{ fontSize: 13, letterSpacing: '0.18em', color: labelCol, opacity: 0.45, textTransform: 'uppercase' }}>Recording · Rehearsal · Oxford</span>
      </div>
      {/* Oscilloscope — top 55% */}
      <div style={{ flex: '0 0 55%', position: 'relative', borderBottom: `1px solid ${borderCol}` }}>
        <canvas ref={oscRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      {/* Spectrogram — bottom 45% */}
      <div style={{ flex: '1 1 0', position: 'relative' }}>
        <canvas ref={specRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  );
}

// ─── FRAME 2: SERVICES ────────────────────────────────────────────────────────
function ServicesFrame() {
  const th = useTheme();
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(2rem, 5vmin, 5rem) clamp(3rem, 6vw, 6rem) 4rem',
      gap: 'clamp(2rem, 4vmin, 4.5rem)',
    }}>
      <div style={{
        fontFamily: T.display, fontSize: 'clamp(1.6rem, 3vw, 3.5rem)', fontWeight: 700,
        letterSpacing: '0.32em', color: th.textDim, textTransform: 'uppercase',
        textAlign: 'center', opacity: 0.85,
      }}>Studios</div>

      <div style={{
        fontFamily: T.mono, fontSize: 'clamp(1rem, 1.6vw, 2.2rem)', color: '#7F8F55',
        letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'center',
        opacity: 0.80, marginTop: '-1rem',
      }}>Workshop Café · Opening April 2026 · 118 Cowley Road</div>

      <div style={{
        display: 'flex', gap: 'clamp(2rem, 4vw, 5rem)', width: '100%', maxWidth: 1400, justifyContent: 'center',
      }}>
        {[
          { name: 'Cowley Road', summary: 'Recording · Rehearsal', accentColor: th.accentGreen, bookUrl: 'crsoxford.com' },
          { name: 'Cricket Road', summary: 'Rehearsal · Live Room', accentColor: th.isDay ? '#6B4FA0' : '#9B7FD4', bookUrl: 'crsoxford.com' },
        ].map((loc) => (
          <div key={loc.name} style={{
            flex: 1,
            background: th.cardBg,
            border: `1px solid ${loc.accentColor}44`,
            borderTop: `3px solid ${loc.accentColor}`,
            borderRadius: 4,
            padding: 'clamp(2rem, 4vmin, 4rem) clamp(2rem, 3.5vw, 4rem)',
            display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vmin, 2.5rem)',
          }}>
            <div style={{
              fontFamily: T.display, fontSize: 'clamp(2.5rem, 5.5vw, 7rem)', fontWeight: 800,
              color: loc.accentColor, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1,
            }}>{loc.name}</div>
            <div style={{
              fontFamily: T.mono, fontSize: 'clamp(1.4rem, 2.4vw, 3rem)',
              color: th.textDim, letterSpacing: '0.1em', opacity: 0.80,
            }}>{loc.summary}</div>
            <div style={{
              fontFamily: T.mono, fontSize: 'clamp(1rem, 1.8vw, 2.2rem)',
              color: th.accentMustard, letterSpacing: '0.14em', textTransform: 'uppercase',
              marginTop: 'auto', paddingTop: 'clamp(1rem, 2vmin, 2rem)',
            }}>Book at {loc.bookUrl}</div>
          </div>
        ))}
      </div>
      <ContactTicker />
    </div>
  );
}

// ─── FRAME 3: OCM EVENT ───────────────────────────────────────────────────────
const OCM_FLYER_URL = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030467842/lAQRmNHfNIBtoptW.png';

function EventFrame() {
  const th = useTheme();
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(2rem, 4vmin, 4rem) clamp(2.5rem, 5vw, 6rem) 4rem',
      gap: 'clamp(1.5rem, 3vmin, 3.5rem)',
    }}>
      <div style={{
        fontFamily: T.mono, fontSize: 'clamp(1.2rem, 2vw, 2.8rem)',
        letterSpacing: '0.3em', color: th.textDim, textTransform: 'uppercase', opacity: 0.75,
      }}>Happening Here</div>

      <div style={{ display: 'flex', gap: 'clamp(2rem, 4vw, 5rem)', alignItems: 'center', maxWidth: 1300, width: '100%' }}>
        <img
          src={OCM_FLYER_URL}
          alt="OCM Presents Listening Parties — Edition 17: Celebrating Women"
          style={{ width: 'clamp(220px, 32vw, 420px)', height: 'auto', borderRadius: 6, boxShadow: '0 12px 48px rgba(0,0,0,0.4)', flexShrink: 0 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vmin, 2.5rem)' }}>
          <div style={{ fontFamily: T.mono, fontSize: 'clamp(1rem, 1.8vw, 2.4rem)', letterSpacing: '0.2em', color: th.isDay ? '#6B4FA0' : '#9B7FD4', textTransform: 'uppercase' }}>OCM Presents</div>
          <div style={{ fontFamily: T.display, fontSize: 'clamp(2.5rem, 5.5vw, 7rem)', fontWeight: 800, lineHeight: 1.05, color: th.text, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Listening<br />Parties
          </div>
          <div style={{ fontFamily: T.display, fontSize: 'clamp(1.4rem, 2.6vw, 3.5rem)', fontWeight: 600, color: th.accentGreen, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Edition 17: Celebrating Women</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 1.5vmin, 1.5rem)', marginTop: '0.5rem' }}>
            {[
              { label: 'Date',  value: 'Friday 6 March' },
              { label: 'Time',  value: '7:30 – 9:30 pm' },
              { label: 'Venue', value: 'Workshop Café, 118 Cowley Road' },
              { label: 'Info',  value: 'www.ocmevents.org' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 2.5rem)', alignItems: 'baseline' }}>
                <span style={{ fontFamily: T.mono, fontSize: 'clamp(1rem, 1.6vw, 2.2rem)', color: th.textDim, letterSpacing: '0.14em', textTransform: 'uppercase', minWidth: 80, opacity: 0.75 }}>{row.label}</span>
                <span style={{ fontFamily: T.mono, fontSize: 'clamp(1.2rem, 2vw, 2.8rem)', color: th.textDim, letterSpacing: '0.06em' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContactTicker />
    </div>
  );
}

// ─── FRAME 4: VENUE HIRE ──────────────────────────────────────────────────────
function VenueFrame() {
  const th = useTheme();
  const useCases = ['Workshops', 'Performances', 'Community Events', 'Private Hire', 'Screenings', 'Rehearsals'];
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(2rem, 5vmin, 5rem) clamp(3rem, 7vw, 7rem) 4rem',
      gap: 'clamp(2rem, 3.5vmin, 4rem)',
    }}>
      <div style={{ width: 'clamp(300px, 55vw, 900px)', height: 2, background: `linear-gradient(90deg, transparent, ${th.accentMustard}88, transparent)` }} />
      <div style={{ fontFamily: T.mono, fontSize: 'clamp(1.2rem, 2vw, 2.8rem)', letterSpacing: '0.3em', color: th.textDim, textTransform: 'uppercase', opacity: 0.75 }}>Workshop Café · 118 Cowley Road</div>
      <div style={{
        fontFamily: T.display, fontSize: 'clamp(3rem, 7vw, 9rem)', fontWeight: 800,
        letterSpacing: '0.22em', color: th.accentMustard, textTransform: 'uppercase',
        textAlign: 'center', lineHeight: 1,
      }}>Space for Hire</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.8rem, 1.5vw, 1.8rem)', justifyContent: 'center', maxWidth: '85vw' }}>
        {useCases.map(tag => (
          <div key={tag} style={{
            fontFamily: T.mono, fontSize: 'clamp(1rem, 1.8vw, 2.4rem)', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: th.textDim,
            background: th.cardBg,
            border: `1px solid ${th.border}`,
            borderTop: `2px solid ${th.accentMustard}66`,
            borderRadius: 3,
            padding: 'clamp(8px, 1.2vmin, 18px) clamp(14px, 2.2vw, 30px)',
            opacity: 0.85,
          }}>{tag}</div>
        ))}
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 'clamp(1.4rem, 2.2vw, 3rem)', color: th.accentMustard, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Enquire → info@crs.com</div>
      <div style={{ width: 'clamp(300px, 55vw, 900px)', height: 2, background: `linear-gradient(90deg, transparent, ${th.accentMustard}88, transparent)` }} />
      <ContactTicker />
    </div>
  );
}

// ─── FRAME 5: CONTACT ─────────────────────────────────────────────────────────
function ContactFrame() {
  const th = useTheme();
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(2rem, 5vmin, 5rem) clamp(3rem, 7vw, 7rem) 4rem',
      gap: 'clamp(2rem, 3.5vmin, 4rem)',
    }}>
      <CRSLogoBlock size="lg" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2.5vmin, 2.8rem)', alignItems: 'center' }}>
        {[
          { label: 'Web',     value: 'www.crsoxford.com' },
          { label: 'Book',    value: 'crsoxford.com/book' },
          { label: 'Email',   value: 'info@crs.com' },
          { label: 'Social',  value: '@cowleyroadstudios' },
          { label: 'Address', value: '118 Cowley Road · Oxford · OX4 1JE' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', gap: 'clamp(1.5rem, 3vw, 3.5rem)', alignItems: 'baseline' }}>
            <span style={{
              fontFamily: T.mono, fontSize: 'clamp(1rem, 1.6vw, 2.2rem)', color: th.textDim,
              letterSpacing: '0.2em', textTransform: 'uppercase', minWidth: 110, textAlign: 'right', opacity: 0.75,
            }}>{row.label}</span>
            <span style={{
              fontFamily: T.mono, fontSize: 'clamp(1.4rem, 2.6vw, 3.5rem)', color: th.textDim, letterSpacing: '0.06em',
            }}>{row.value}</span>
          </div>
        ))}
      </div>
      <ContactTicker />
    </div>
  );
}

// ─── FRAME TYPE ───────────────────────────────────────────────────────────────
type SignageFrame = {
  id: string;
  label: string;
  component: React.FC;
  duration: number;
};

function buildFrames(): SignageFrame[] {
  const frames: SignageFrame[] = [
    { id: 'cafe',     label: 'WORKSHOP CAFÉ', component: CafeWelcomeFrame, duration: 12000 },
    { id: 'ambient',  label: 'AMBIENT',       component: AmbientFrame,     duration: 18000 },
    { id: 'services', label: 'SERVICES',      component: ServicesFrame,    duration: 12000 },
  ];
  if (isOCMEventActive()) {
    frames.push({ id: 'event', label: 'EVENT', component: EventFrame, duration: 14000 });
  }
  frames.push(
    { id: 'venue',   label: 'VENUE',   component: VenueFrame,   duration: 14000 },
    { id: 'contact', label: 'CONTACT', component: ContactFrame, duration: 10000 },
  );
  return frames;
}

// ─── MAIN SIGNAGE APP ─────────────────────────────────────────────────────────
export default function SignageApp() {
  const FRAMES = useRef<SignageFrame[]>(buildFrames()).current;

  const [frameIdx, setFrameIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const loopCount = useRef(0);
  const [flashOpacity, setFlashOpacity] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Day/night theme — checked on mount and re-evaluated each loop restart
  const [theme, setTheme] = useState<ThemeTokens>(() => isDaytime() ? dayTheme : nightTheme);

  useEffect(() => {
    const frame = FRAMES[frameIdx];
    timerRef.current = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setFrameIdx(i => {
          const next = (i + 1) % FRAMES.length;
          if (next === 0) {
            loopCount.current += 1;
            // Re-evaluate day/night on each loop restart
            setTheme(isDaytime() ? dayTheme : nightTheme);
            // Flash
            setFlashOpacity(0.85);
            setTimeout(() => setFlashOpacity(0), 180);
          }
          return next;
        });
        setFading(false);
      }, 500);
    }, frame.duration);
    return () => clearTimeout(timerRef.current);
  }, [frameIdx, FRAMES]);

  const CurrentFrame = FRAMES[frameIdx].component;
  const isSurgeLoop = loopCount.current > 0 && loopCount.current % 2 === 0;
  const isAmbient = FRAMES[frameIdx].id === 'ambient';

  return (
    <ThemeCtx.Provider value={theme}>
      <CRSShell
        totalFrames={FRAMES.length}
        currentFrame={frameIdx}
        reelLabel={FRAMES[frameIdx].label}
        showVU
        isDay={theme.isDay}
      >
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: theme.isDay
            ? `linear-gradient(160deg, ${theme.bg} 0%, #E8EAE8 50%, ${theme.bg} 100%)`
            : 'linear-gradient(160deg, #080808 0%, #111a12 50%, #080808 100%)',
          zIndex: 0,
          transition: 'background 1s ease',
        }} />

        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}>
          {isAmbient ? <AmbientFrame surge={isSurgeLoop} /> : <CurrentFrame />}
        </div>

        {/* Loop-restart flash overlay */}
        {flashOpacity > 0 && (
          <div style={{
            position: 'absolute', inset: 0,
            background: theme.flashColor,
            opacity: flashOpacity,
            zIndex: 50,
            pointerEvents: 'none',
            transition: 'opacity 0.18s ease-out',
          }} />
        )}
      </CRSShell>
    </ThemeCtx.Provider>
  );
}
