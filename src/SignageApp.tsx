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
 */

import React, { useState, useEffect, useRef } from 'react';
import CRSShell, { CRSLogoBlock } from './CRSShell';
import { C, T } from './brand';

// ─── OCM EVENT EXPIRY ─────────────────────────────────────────────────────────
// The OCM Listening Party is on Friday 6 March 2026.
// After that date, the event frame is automatically excluded from the loop.
function isOCMEventActive(): boolean {
  const now = new Date();
  // Expire after 6 March 2026 23:59 (UTC)
  const expiry = new Date('2026-03-07T00:00:00Z');
  return now < expiry;
}

// ─── CONTACT TICKER ──────────────────────────────────────────────────────────
function ContactTicker() {
  const items = [
    'www.crsoxford.com',
    '◆',
    'info@crs.com',
    '◆',
    '@cowleyroadstudios',
    '◆',
    'www.crsoxford.com',
    '◆',
    'info@crs.com',
    '◆',
    '@cowleyroadstudios',
    '◆',
  ];
  return (
    <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: 28,
      background: 'rgba(0,0,0,0.6)',
      borderTop: `1px solid ${C.border}`,
      overflow: 'hidden',
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        gap: '3rem',
        whiteSpace: 'nowrap',
        animation: 'tickerScroll 28s linear infinite',
        fontFamily: T.mono,
        fontSize: 11,
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
// Pure identity frame — slow waveform, no text.
// Runs for 18 seconds. Does the identity work that text frames cannot.
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

      // Three slow sinusoidal ribbons — CRS green, mustard, dim white
      const ribbons = [
        { color: C.stripeLime,  alpha: 0.18, freq: 0.0018, amp: H * 0.12, phase: 0,           yBase: H * 0.38 },
        { color: C.logoMustard, alpha: 0.12, freq: 0.0014, amp: H * 0.09, phase: Math.PI,      yBase: H * 0.52 },
        { color: '#ffffff',     alpha: 0.06, freq: 0.0022, amp: H * 0.07, phase: Math.PI / 2,  yBase: H * 0.45 },
      ];

      ribbons.forEach(({ color, alpha, freq, amp, phase, yBase }) => {
        // Parse hex to rgb for rgba usage
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
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Subtle dot grid — very faint, breathing with time
      for (let x = 0; x < W; x += 40) {
        for (let y = 0; y < H; y += 40) {
          const jitter = Math.sin(x * 0.01 + y * 0.008 + t * 0.3) * 0.5 + 0.5;
          ctx.globalAlpha = jitter * 0.04;
          ctx.fillStyle = 'rgba(255,255,255,1)';
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      t += 0.004; // very slow drift
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
// 3×5 rule: location name large, one-line service summary, booking URL.
// Address removed — it lives in the Contact frame.
function ServicesFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1.5rem, 4vmin, 3rem) clamp(2rem, 6vw, 5rem) 2.5rem',
      gap: 'clamp(1.2rem, 3.5vmin, 3rem)',
    }}>
      <div style={{
        fontFamily: T.display,
        fontSize: 'clamp(0.85rem, min(1.8vw, 3vh), 1.6rem)',
        fontWeight: 700,
        letterSpacing: '0.32em',
        color: C.textDim,
        textTransform: 'uppercase',
        textAlign: 'center',
        opacity: 0.6,
      }}>
        Recording &amp; Rehearsal
      </div>

      <div style={{
        display: 'flex',
        gap: 'clamp(1.5rem, 4vw, 3.5rem)',
        width: '100%',
        maxWidth: 760,
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
            borderTop: `2px solid ${loc.accentColor}`,
            borderRadius: 3,
            padding: 'clamp(1.2rem, 3vmin, 2.5rem) clamp(1.2rem, 2.5vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.6rem, 2vmin, 1.2rem)',
          }}>
            {/* Location name — large, dominant */}
            <div style={{
              fontFamily: T.display,
              fontSize: 'clamp(1rem, min(2.4vw, 3.8vh), 2.2rem)',
              fontWeight: 800,
              color: loc.accentColor,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>{loc.name}</div>

            {/* One-line service summary */}
            <div style={{
              fontFamily: T.mono,
              fontSize: 'clamp(0.7rem, min(1.2vw, 2vh), 1.05rem)',
              color: C.textDim,
              letterSpacing: '0.1em',
              opacity: 0.75,
            }}>{loc.summary}</div>

            {/* Booking URL */}
            <div style={{
              fontFamily: T.mono,
              fontSize: 'clamp(0.6rem, min(1vw, 1.6vh), 0.85rem)',
              color: C.logoMustard,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginTop: 'auto',
              paddingTop: 'clamp(0.5rem, 1.5vmin, 1rem)',
            }}>Book → {loc.bookUrl}</div>
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
      padding: 'clamp(1rem, 3vmin, 2.5rem) clamp(1.5rem, 4vw, 4rem) 2.5rem',
      gap: 'clamp(0.75rem, 2vmin, 1.5rem)',
    }}>
      <div style={{
        fontFamily: T.mono,
        fontSize: 'clamp(0.6rem, min(1vw, 1.6vh), 0.85rem)',
        letterSpacing: '0.3em',
        color: C.textDim,
        textTransform: 'uppercase',
        opacity: 0.5,
      }}>Happening Here</div>

      <div style={{
        display: 'flex',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        alignItems: 'center',
        maxWidth: 900,
        width: '100%',
      }}>
        <img
          src={OCM_FLYER_URL}
          alt="OCM Presents Listening Parties — Edition 17: Celebrating Women"
          style={{
            width: 'clamp(140px, 28vw, 280px)',
            height: 'auto',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            flexShrink: 0,
          }}
        />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.5rem, 1.5vmin, 1rem)',
        }}>
          <div style={{
            fontFamily: T.mono,
            fontSize: 'clamp(0.6rem, min(1vw, 1.6vh), 0.8rem)',
            letterSpacing: '0.2em',
            color: '#9B7FD4',
            textTransform: 'uppercase',
          }}>OCM Presents</div>

          <div style={{
            fontFamily: T.display,
            fontSize: 'clamp(1.2rem, min(3.2vw, 5vh), 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            color: C.textDim,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            Listening<br />Parties
          </div>

          <div style={{
            fontFamily: T.display,
            fontSize: 'clamp(0.75rem, min(1.6vw, 2.5vh), 1.5rem)',
            fontWeight: 600,
            color: C.stripeLime,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>Edition 17: Celebrating Women</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { label: 'Date',  value: 'Friday 6 March' },
              { label: 'Time',  value: '7:30 – 9:30 pm' },
              { label: 'Venue', value: 'Workshop Café, 118 Cowley Road' },
              { label: 'Info',  value: 'www.ocmevents.org' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: T.mono,
                  fontSize: 'clamp(0.6rem, min(0.9vw, 1.5vh), 0.75rem)',
                  color: C.textDim,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  minWidth: 44,
                  opacity: 0.5,
                }}>{row.label}</span>
                <span style={{
                  fontFamily: T.mono,
                  fontSize: 'clamp(0.65rem, min(1.1vw, 1.8vh), 0.95rem)',
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
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1.5rem, 4vmin, 3rem) clamp(2rem, 6vw, 5rem) 2.5rem',
      gap: 'clamp(1rem, 3vmin, 2rem)',
    }}>
      <div style={{
        fontFamily: T.display,
        fontSize: 'clamp(1.1rem, min(2.8vw, 4.5vh), 3rem)',
        fontWeight: 800,
        letterSpacing: '0.28em',
        color: C.logoMustard,
        textTransform: 'uppercase',
        textAlign: 'center',
        textShadow: `0 0 24px ${C.logoMustard}55`,
      }}>Space for Hire</div>

      <div style={{
        maxWidth: 680,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.75rem, 2vmin, 1.5rem)',
      }}>
        <div style={{
          fontFamily: T.mono,
          fontSize: 'clamp(0.75rem, min(1.4vw, 2.2vh), 1.15rem)',
          color: C.textDim,
          lineHeight: 1.6,
          letterSpacing: '0.06em',
          opacity: 0.75,
        }}>
          Available for workshops, performances,<br />
          community events, and private hire.
        </div>

        <div style={{
          fontFamily: T.mono,
          fontSize: 'clamp(0.65rem, min(1.1vw, 1.8vh), 0.95rem)',
          color: C.logoMustard,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginTop: 'clamp(0.5rem, 1.5vmin, 1rem)',
        }}>Enquire → info@crs.com</div>
      </div>

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
      padding: 'clamp(1.5rem, 4vmin, 3rem) clamp(2rem, 6vw, 5rem) 2.5rem',
      gap: 'clamp(1.2rem, 3vmin, 2.5rem)',
    }}>
      <CRSLogoBlock size="lg" />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.6rem, 1.8vmin, 1.2rem)',
        alignItems: 'center',
      }}>
        {[
          { label: 'Web',     value: 'www.crsoxford.com' },
          { label: 'Email',   value: 'info@crs.com' },
          { label: 'Social',  value: '@cowleyroadstudios' },
          { label: 'Address', value: '118 Cowley Road, Oxford' },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex',
            gap: 'clamp(0.75rem, 2vw, 1.5rem)',
            alignItems: 'baseline',
          }}>
            <span style={{
              fontFamily: T.mono,
              fontSize: 'clamp(0.6rem, min(0.9vw, 1.5vh), 0.75rem)',
              color: C.textDim,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              minWidth: 56,
              textAlign: 'right',
              opacity: 0.5,
            }}>{row.label}</span>
            <span style={{
              fontFamily: T.mono,
              fontSize: 'clamp(0.8rem, min(1.6vw, 2.6vh), 1.4rem)',
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
// Build the frame list dynamically — OCM event frame only included before 7 March.
function buildFrames(): SignageFrame[] {
  const frames: SignageFrame[] = [
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
  // Build frame list once at mount — date check runs at page load
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
      {/* Subtle dark background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #080808 0%, #111a12 50%, #080808 100%)',
        zIndex: 0,
      }} />

      {/* Frame content */}
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
