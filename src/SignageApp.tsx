/**
 * CRS Signage — Reality-Based Loop
 * ─────────────────────────────────
 * Only content that is 100% true and deliverable today.
 *
 * Frame 0 — Ambient: slow waveform, identity-only, no text (18s)
 * Frame 1 — Services: Recording + Rehearsal — 3×5 rule applied (12s)
 * Frame 2 — Event: OCM Listening Party, Fri 6 Mar — auto-expires 7 Mar (14s)
 * Frame 3 — Venue: Space available for hire (10s)
 * Frame 4 — Contact: website / email / socials (10s)
 *
 * Contact ticker rolls on every frame.
 * No invented services. No fictional modes. No speculative claims.
 * No QR codes until that infrastructure is ready.
 *
 * SIZING NOTE: All font sizes are tuned for a 55" 1080p screen viewed from
 * ~3 metres. Minimum body text ~40px, headlines 100–160px.
 * clamp(min, preferred-vw/vh, max) — the max is the 55" target.
 */

import React, { useState, useEffect, useRef } from 'react';
import CRSShell, { CRSLogoBlock } from './CRSShell';
import { C, T } from './brand';

// ─── CAFÉ WELCOME FRAME ─────────────────────────────────────────────────────
// First frame in the loop — street-facing, tells passers-by what the building is.
// Uses Workshop Café brand colours so it reads as a distinct space from CRS.
function CafeWelcomeFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 'clamp(2rem, 4vmin, 5rem)',
      padding: 'clamp(2rem, 5vmin, 5rem)',
      background: 'linear-gradient(160deg, #1A1E21 0%, #2E473B22 50%, #1A1E21 100%)',
    }}>
      {/* Mustard fascia wordmark — echoes the real sign above the door */}
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
      {/* Opening badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(46,71,59,0.35)', border: '2px solid #4F7942', borderRadius: 6, padding: 'clamp(12px, 2vmin, 24px) clamp(24px, 4vw, 48px)' }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#C2A85A', boxShadow: '0 0 14px #C2A85A', animation: 'ledPulse 2.4s ease-in-out infinite' }} />
        <span style={{ fontFamily: T.mono, fontSize: 'clamp(1.4rem, 2.4vw, 3.2rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C2A85A', fontWeight: 700 }}>Opening April 2026</span>
      </div>
      {/* Studios connective tissue */}
      <div style={{ fontFamily: T.mono, fontSize: 'clamp(1.2rem, 2vw, 2.8rem)', color: '#7F8F55', letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'center', opacity: 0.85 }}>
        Recording Studios · Rehearsal Rooms · Open Now
      </div>
    </div>
  );
}

// ─── OCM EVENT EXPIRY ─────────────────────────────────────────────────────────
function isOCMEventActive(): boolean {
  const now = new Date();
  const expiry = new Date('2026-03-07T00:00:00Z');
  return now < expiry;
}

// ─── CONTACT TICKER ──────────────────────────────────────────────────────────
function ContactTicker() {
  const items = [
    '◆',
    'www.crsoxford.com',
    '◆',
    'Recording & Rehearsal Studios · Oxford',
    '◆',
    'info@crs.com',
    '◆',
    '@cowleyroadstudios',
    '◆',
    'Workshop Café · 118 Cowley Road',
    '◆',
    'www.crsoxford.com',
    '◆',
  ];
  return (
    <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: 52,
      background: 'rgba(0,0,0,0.7)',
      borderTop: `1px solid ${C.border}`,
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
        color: C.logoMustard,
        textTransform: 'uppercase',
      }}>
        {items.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </div>
  );
}

// ─── FRAME 0: AMBIENT ─────────────────────────────────────────────────────────
function AmbientFrame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      const ribbons = [
        { color: C.stripeLime,  alpha: 0.45, freq: 0.0018, amp: H * 0.14, phase: 0,           yBase: H * 0.38 },
        { color: C.logoMustard, alpha: 0.32, freq: 0.0014, amp: H * 0.10, phase: Math.PI,      yBase: H * 0.52 },
        { color: '#ffffff',     alpha: 0.18, freq: 0.0022, amp: H * 0.08, phase: Math.PI / 2,  yBase: H * 0.45 },
      ];

      ribbons.forEach(({ color, alpha, freq, amp, phase, yBase }) => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const y = yBase
            + Math.sin(x * freq + t + phase) * amp
            + Math.sin(x * freq * 1.7 + t * 0.6 + phase) * amp * 0.4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      for (let x = 0; x < W; x += 40) {
        for (let y = 0; y < H; y += 40) {
          const jitter = Math.sin(x * 0.01 + y * 0.008 + t * 0.3) * 0.5 + 0.5;
          ctx.globalAlpha = jitter * 0.10;
          ctx.fillStyle = 'rgba(255,255,255,1)';
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      t += 0.004;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      <ContactTicker />
    </div>
  );
}

// ─── FRAME 1: SERVICES ────────────────────────────────────────────────────────
function ServicesFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(2rem, 5vmin, 5rem) clamp(3rem, 6vw, 6rem) 4rem',
      gap: 'clamp(2rem, 4vmin, 4.5rem)',
    }}>
      {/* Superheader */}
      <div style={{
        fontFamily: T.display,
        fontSize: 'clamp(1.6rem, 3vw, 3.5rem)',
        fontWeight: 700,
        letterSpacing: '0.32em',
        color: C.textDim,
        textTransform: 'uppercase',
        textAlign: 'center',
        opacity: 0.85,
      }}>
        Studios
      </div>

      {/* Connective tissue — places studios in context of the building */}
      <div style={{ fontFamily: T.mono, fontSize: 'clamp(1rem, 1.6vw, 2.2rem)', color: '#7F8F55', letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'center', opacity: 0.80, marginTop: '-1rem' }}>Workshop Café · Opening April 2026 · 118 Cowley Road</div>

      {/* Location cards */}
      <div style={{
        display: 'flex',
        gap: 'clamp(2rem, 4vw, 5rem)',
        width: '100%',
        maxWidth: 1400,
        justifyContent: 'center',
      }}>
        {[
          {
            name: 'Cowley Road',
            summary: 'Recording · Rehearsal',
            accentColor: C.stripeLime,
            bookUrl: 'crsoxford.com',
          },
          {
            name: 'Cricket Road',
            summary: 'Rehearsal · Live Room',
            accentColor: '#9B7FD4',
            bookUrl: 'crsoxford.com',
          },
        ].map((loc) => (
          <div key={loc.name} style={{
            flex: 1,
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${loc.accentColor}33`,
            borderTop: `3px solid ${loc.accentColor}`,
            borderRadius: 4,
            padding: 'clamp(2rem, 4vmin, 4rem) clamp(2rem, 3.5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1rem, 2.5vmin, 2.5rem)',
          }}>
            {/* Location name — large, dominant */}
            <div style={{
              fontFamily: T.display,
              fontSize: 'clamp(2.5rem, 5.5vw, 7rem)',
              fontWeight: 800,
              color: loc.accentColor,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>{loc.name}</div>

            {/* One-line service summary */}
            <div style={{
              fontFamily: T.mono,
              fontSize: 'clamp(1.4rem, 2.4vw, 3rem)',
              color: C.textDim,
              letterSpacing: '0.1em',
              opacity: 0.80,
            }}>{loc.summary}</div>

            {/* Booking URL */}
            <div style={{
              fontFamily: T.mono,
              fontSize: 'clamp(1rem, 1.8vw, 2.2rem)',
              color: C.logoMustard,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginTop: 'auto',
              paddingTop: 'clamp(1rem, 2vmin, 2rem)',
            }}>Book at {loc.bookUrl}</div>
          </div>
        ))}
      </div>

      <ContactTicker />
    </div>
  );
}

// ─── FRAME 2: OCM EVENT ───────────────────────────────────────────────────────
const OCM_FLYER_URL = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030467842/lAQRmNHfNIBtoptW.png';

function EventFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(2rem, 4vmin, 4rem) clamp(2.5rem, 5vw, 6rem) 4rem',
      gap: 'clamp(1.5rem, 3vmin, 3.5rem)',
    }}>
      {/* "Happening Here" label */}
      <div style={{
        fontFamily: T.mono,
        fontSize: 'clamp(1.2rem, 2vw, 2.8rem)',
        letterSpacing: '0.3em',
        color: C.textDim,
        textTransform: 'uppercase',
        opacity: 0.75,
      }}>Happening Here</div>

      <div style={{
        display: 'flex',
        gap: 'clamp(2rem, 4vw, 5rem)',
        alignItems: 'center',
        maxWidth: 1300,
        width: '100%',
      }}>
        {/* Flyer image — larger for 55" */}
        <img
          src={OCM_FLYER_URL}
          alt="OCM Presents Listening Parties — Edition 17: Celebrating Women"
          style={{
            width: 'clamp(220px, 32vw, 420px)',
            height: 'auto',
            borderRadius: 6,
            boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
            flexShrink: 0,
          }}
        />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1rem, 2.5vmin, 2.5rem)',
        }}>
          {/* Presenter label */}
          <div style={{
            fontFamily: T.mono,
            fontSize: 'clamp(1rem, 1.8vw, 2.4rem)',
            letterSpacing: '0.2em',
            color: '#9B7FD4',
            textTransform: 'uppercase',
          }}>OCM Presents</div>

          {/* Event title */}
          <div style={{
            fontFamily: T.display,
            fontSize: 'clamp(2.5rem, 5.5vw, 7rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            color: C.textDim,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            Listening<br />Parties
          </div>

          {/* Edition */}
          <div style={{
            fontFamily: T.display,
            fontSize: 'clamp(1.4rem, 2.6vw, 3.5rem)',
            fontWeight: 600,
            color: C.stripeLime,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>Edition 17: Celebrating Women</div>

          {/* Detail rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 1.5vmin, 1.5rem)', marginTop: '0.5rem' }}>
            {[
              { label: 'Date',  value: 'Friday 6 March' },
              { label: 'Time',  value: '7:30 – 9:30 pm' },
              { label: 'Venue', value: 'Workshop Café, 118 Cowley Road' },
              { label: 'Info',  value: 'www.ocmevents.org' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 2.5rem)', alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: T.mono,
                  fontSize: 'clamp(1rem, 1.6vw, 2.2rem)',
                  color: C.textDim,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  minWidth: 80,
                  opacity: 0.75,
                }}>{row.label}</span>
                <span style={{
                  fontFamily: T.mono,
                  fontSize: 'clamp(1.2rem, 2vw, 2.8rem)',
                  color: C.textDim,
                  letterSpacing: '0.06em',
                }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactTicker />
    </div>
  );
}

// ─── FRAME 3: VENUE HIRE ──────────────────────────────────────────────────────
function VenueFrame() {
  const useCases = ['Workshops', 'Performances', 'Community Events', 'Private Hire', 'Screenings', 'Rehearsals'];
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(2rem, 5vmin, 5rem) clamp(3rem, 7vw, 7rem) 4rem',
      gap: 'clamp(2rem, 3.5vmin, 4rem)',
    }}>
      {/* Panel rule above */}
      <div style={{
        width: 'clamp(300px, 55vw, 900px)',
        height: 2,
        background: `linear-gradient(90deg, transparent, ${C.logoMustard}88, transparent)`,
      }} />

      {/* Superheader label */}
      <div style={{
        fontFamily: T.mono,
        fontSize: 'clamp(1.2rem, 2vw, 2.8rem)',
        letterSpacing: '0.3em',
        color: C.textDim,
        textTransform: 'uppercase',
        opacity: 0.75,
      }}>Workshop Café · 118 Cowley Road</div>

      {/* Main headline */}
      <div style={{
        fontFamily: T.display,
        fontSize: 'clamp(3rem, 7vw, 9rem)',
        fontWeight: 800,
        letterSpacing: '0.22em',
        color: C.logoMustard,
        textTransform: 'uppercase',
        textAlign: 'center',
        textShadow: `0 0 48px ${C.logoMustard}44`,
        lineHeight: 1,
      }}>Space for Hire</div>

      {/* Use-case tag strips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(0.8rem, 1.5vw, 1.8rem)',
        justifyContent: 'center',
        maxWidth: '85vw',
      }}>
        {useCases.map(tag => (
          <div key={tag} style={{
            fontFamily: T.mono,
            fontSize: 'clamp(1rem, 1.8vw, 2.4rem)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: C.textDim,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${C.border}`,
            borderTop: `2px solid ${C.logoMustard}55`,
            borderRadius: 3,
            padding: 'clamp(8px, 1.2vmin, 18px) clamp(14px, 2.2vw, 30px)',
            opacity: 0.85,
          }}>{tag}</div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        fontFamily: T.mono,
        fontSize: 'clamp(1.4rem, 2.2vw, 3rem)',
        color: C.logoMustard,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>Enquire → info@crs.com</div>

      {/* Panel rule below */}
      <div style={{
        width: 'clamp(300px, 55vw, 900px)',
        height: 2,
        background: `linear-gradient(90deg, transparent, ${C.logoMustard}88, transparent)`,
      }} />

      <ContactTicker />
    </div>
  );
}

// ─── FRAME 4: CONTACT ─────────────────────────────────────────────────────────
function ContactFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(2rem, 5vmin, 5rem) clamp(3rem, 7vw, 7rem) 4rem',
      gap: 'clamp(2rem, 3.5vmin, 4rem)',
    }}>
      <CRSLogoBlock size="lg" />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1.2rem, 2.5vmin, 2.8rem)',
        alignItems: 'center',
      }}>
        {[
          { label: 'Web',     value: 'www.crsoxford.com' },
          { label: 'Book',    value: 'crsoxford.com/book' },
          { label: 'Email',   value: 'info@crs.com' },
          { label: 'Social',  value: '@cowleyroadstudios' },
          { label: 'Address', value: '118 Cowley Road · Oxford · OX4 1JE' },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 3vw, 3.5rem)',
            alignItems: 'baseline',
          }}>
            <span style={{
              fontFamily: T.mono,
              fontSize: 'clamp(1rem, 1.6vw, 2.2rem)',
              color: C.textDim,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              minWidth: 110,
              textAlign: 'right',
              opacity: 0.75,
            }}>{row.label}</span>
            <span style={{
              fontFamily: T.mono,
              fontSize: 'clamp(1.4rem, 2.6vw, 3.5rem)',
              color: C.textDim,
              letterSpacing: '0.06em',
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

// ─── MAIN SIGNAGE APP ─────────────────────────────────────────────────────────
function buildFrames(): SignageFrame[] {
  const frames: SignageFrame[] = [
    { id: 'cafe',     label: 'WORKSHOP CAFÉ', component: CafeWelcomeFrame, duration: 12000 },
    { id: 'ambient',  label: 'AMBIENT',  component: AmbientFrame,  duration: 18000 },
    { id: 'services', label: 'SERVICES', component: ServicesFrame, duration: 12000 },
  ];

  if (isOCMEventActive()) {
    frames.push({ id: 'event', label: 'EVENT', component: EventFrame, duration: 14000 });
  }

  frames.push(
    { id: 'venue',   label: 'VENUE',   component: VenueFrame,   duration: 10000 },
    { id: 'contact', label: 'CONTACT', component: ContactFrame, duration: 10000 },
  );

  return frames;
}

export default function SignageApp() {
  const FRAMES = useRef<SignageFrame[]>(buildFrames()).current;

  const [frameIdx, setFrameIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const frame = FRAMES[frameIdx];
    timerRef.current = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setFrameIdx(i => (i + 1) % FRAMES.length);
        setFading(false);
      }, 500);
    }, frame.duration);
    return () => clearTimeout(timerRef.current);
  }, [frameIdx, FRAMES]);

  const CurrentFrame = FRAMES[frameIdx].component;

  return (
    <CRSShell
      totalFrames={FRAMES.length}
      currentFrame={frameIdx}
      reelLabel={FRAMES[frameIdx].label}
      showVU
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #080808 0%, #111a12 50%, #080808 100%)',
        zIndex: 0,
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 10,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}>
        <CurrentFrame />
      </div>
    </CRSShell>
  );
}
