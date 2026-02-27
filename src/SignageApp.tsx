/**
 * CRS Signage — Reality-Based Loop
 * ─────────────────────────────────
 * Only content that is 100% true and deliverable today.
 *
 * Frame 1 — Services: Recording + Rehearsal at both locations
 * Frame 2 — Event: OCM Listening Party, Fri 6 Mar
 * Frame 3 — Venue: Space available for hire
 * Frame 4 — Contact: website / email / socials
 *
 * Contact ticker rolls on every frame.
 * No invented services. No fictional modes. No speculative claims.
 */

import { useState, useEffect, useRef } from 'react';
import CRSShell, { VUMeter, LEDIndicator, CRSLogoBlock } from './CRSShell';
import { C, T, Shadow } from './brand';

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

// ─── FRAME 1: SERVICES ────────────────────────────────────────────────────────
function ServicesFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1.5rem, 4vmin, 3rem) clamp(2rem, 6vw, 5rem) 2.5rem',
      gap: 'clamp(1rem, 3vmin, 2.5rem)',
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
      }}>
        Recording &amp; Rehearsal
      </div>

      <div style={{
        display: 'flex',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        width: '100%',
        maxWidth: 860,
        justifyContent: 'center',
      }}>
        {[
          {
            name: 'Cowley Road',
            address: '118 Cowley Road, Oxford',
            services: ['Rehearsal Space', 'Recording Studio'],
            accentColor: C.stripeLime,
          },
          {
            name: 'Cricket Road',
            address: 'Cricket Road, Oxford',
            services: ['Rehearsal Space', 'Live Room Recording'],
            accentColor: '#9B7FD4',
          },
        ].map((loc) => (
          <div key={loc.name} style={{
            flex: 1,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${loc.accentColor}44`,
            borderTop: `3px solid ${loc.accentColor}`,
            borderRadius: 4,
            padding: 'clamp(1rem, 2.5vmin, 2rem) clamp(1rem, 2vw, 1.8rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.5rem, 1.5vmin, 1rem)',
          }}>
            <div style={{
              fontFamily: T.display,
              fontSize: 'clamp(0.85rem, min(1.8vw, 2.8vh), 1.6rem)',
              fontWeight: 700,
              color: loc.accentColor,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>{loc.name}</div>
            <div style={{
              fontFamily: T.mono,
              fontSize: 'clamp(0.65rem, min(1.1vw, 1.8vh), 0.95rem)',
              color: C.textDim,
              letterSpacing: '0.08em',
            }}>{loc.address}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
              {loc.services.map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LEDIndicator color={loc.accentColor} size={6} pulse={false} />
                  <span style={{
                    fontFamily: T.mono,
                    fontSize: 'clamp(0.65rem, min(1.1vw, 1.8vh), 0.9rem)',
                    color: C.textDim,
                    letterSpacing: '0.06em',
                  }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 'auto',
              paddingTop: 'clamp(0.5rem, 1.5vmin, 1rem)',
              fontFamily: T.mono,
              fontSize: 'clamp(0.6rem, min(1vw, 1.6vh), 0.8rem)',
              color: C.logoMustard,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}>Book → crsoxford.com</div>
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
        }}>
          118 Cowley Road is available for workshops,<br />
          performances, community events, and private hire.
        </div>

        <div style={{
          display: 'flex',
          gap: 'clamp(0.5rem, 2vw, 1.5rem)',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: 'clamp(0.5rem, 1.5vmin, 1rem)',
        }}>
          {['Workshops', 'Performances', 'Community Events', 'Private Hire'].map(tag => (
            <div key={tag} style={{
              fontFamily: T.mono,
              fontSize: 'clamp(0.6rem, min(1vw, 1.6vh), 0.8rem)',
              letterSpacing: '0.16em',
              color: C.stripeLime,
              textTransform: 'uppercase',
              border: `1px solid ${C.stripeLime}55`,
              borderRadius: 2,
              padding: '4px 12px',
            }}>{tag}</div>
          ))}
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

// ─── MAIN SIGNAGE APP ─────────────────────────────────────────────────────────
const FRAMES = [
  { id: 'services', label: 'SERVICES', component: ServicesFrame, duration: 12000 },
  { id: 'event',    label: 'EVENT',    component: EventFrame,    duration: 14000 },
  { id: 'venue',    label: 'VENUE',    component: VenueFrame,    duration: 10000 },
  { id: 'contact',  label: 'CONTACT',  component: ContactFrame,  duration: 10000 },
];

export default function SignageApp() {
  const [frameIdx, setFrameIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

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
  }, [frameIdx]);

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
