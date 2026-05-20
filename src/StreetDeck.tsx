/**
 * StreetDeck.tsx — CRS Street Signage Deck (/deck route)
 *
 * 9-slide digital signage loop for street-facing screens.
 * Format: 1920×1080 · 16:9 · Rack Aesthetic · Inter Typography
 *
 * Brief:
 *   - Industrial framing, engraved panel feel, restrained hierarchy
 *   - Architectural spacing, subtle brass panel accents, dark chassis backgrounds
 *   - Calm engineering atmosphere
 *   - Fade-only transitions (0.5s crossfade)
 *   - Each slide holds 8–10 seconds
 *
 * Slides:
 *   01. Identity       — COWLEY ROAD STUDIOS (18s)
 *   02. Recording      — Analogue and digital recording workflows (10s)
 *   03. Rehearsals     — Cowley Road · Cricket Road (10s)
 *   04. Technical      — Audio · AV · Repairs · Installation (10s)
 *   05. Workshop Café  — Coffee · Workspace · Events · Community (10s)
 *   06. Community      — Workshops · Open sessions · Collaboration (10s)
 *   07. Heritage       — Oxford Music Infrastructure (10s)
 *   08. Bookings       — Contact details (10s)
 *   09. Closing        — Hero closing frame (14s)
 */
import { useState, useEffect, useRef } from 'react'

// ─── Colour tokens ────────────────────────────────────────────────────────────
const D = {
  bg:          '#0E0E0E',
  bgWarm:      '#1A1610',
  bgDark:      '#080808',
  grey:        '#404040',
  brass:       '#B5A642',
  mustard:     '#C2A85A',
  nettle:      '#4F7942',
  signalGreen: '#39FF14',
  text:        '#E5E5E5',
  textDim:     'rgba(229,229,229,0.8)',
  border:      'rgba(181,166,66,0.35)',
  divider:     '#404040',
}

// ─── Persistent bottom bar ────────────────────────────────────────────────────
function BottomBar() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 40,
      borderTop: `1px solid ${D.brass}`,
      background: '#0E0E0E',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 30,
    }}>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14, fontWeight: 400,
        color: D.text, letterSpacing: '0.1em', opacity: 0.7,
        textTransform: 'uppercase',
      }}>
        COWLEY ROAD STUDIOS · 118 COWLEY ROAD · OXFORD · OX4 1JE · cowleyroadstudios.com
      </span>
    </div>
  )
}

// ─── Persistent top-left badge ────────────────────────────────────────────────
function TopBadge() {
  return (
    <div style={{
      position: 'absolute', top: 40, left: 40,
      fontFamily: "'Inter', sans-serif",
      fontSize: 16, fontWeight: 700,
      color: D.text, opacity: 0.3,
      letterSpacing: '0.1em',
      zIndex: 30,
    }}>
      CRS
    </div>
  )
}

// ─── Slide 01 — Identity ─────────────────────────────────────────────────────
function Slide01Identity() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: D.bg,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <TopBadge />
      <div style={{ width: '80%', textAlign: 'center' }}>
        <div style={{
          padding: '40px 0',
          borderTop: `1px solid ${D.brass}`,
          borderBottom: `1px solid ${D.brass}`,
          marginBottom: 40,
        }}>
          <h1 style={{
            fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 700,
            color: '#FFFFFF', letterSpacing: '0.05em', lineHeight: 1.1,
          }}>
            COWLEY ROAD STUDIOS
          </h1>
        </div>
        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 500,
          color: D.text, marginBottom: 20, letterSpacing: '0.02em',
        }}>
          Recording · Rehearsal · Technical Services
        </h2>
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 400,
          color: D.text, opacity: 0.8, marginBottom: 10,
        }}>
          118 Cowley Road, Oxford
        </p>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 28px)', fontWeight: 400,
          color: D.brass, letterSpacing: '0.05em',
        }}>
          cowleyroadstudios.com
        </p>
      </div>
      <BottomBar />
    </div>
  )
}

// ─── Slide 02 — Recording ────────────────────────────────────────────────────
function Slide02Recording() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: D.bg,
      display: 'flex', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <TopBadge />
      {/* Right panel — darker background */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '42%',
        background: '#141414',
        borderLeft: `1px solid ${D.divider}`,
      }} />
      {/* Left content */}
      <div style={{
        width: '55%', marginLeft: 120,
        borderLeft: `4px solid ${D.brass}`,
        paddingLeft: 60,
        paddingTop: 20,
      }}>
        <h1 style={{
          fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 700,
          color: '#FFFFFF', letterSpacing: '0.05em',
          marginBottom: 40, lineHeight: 1.1,
        }}>
          RECORDING
        </h1>
        <h2 style={{
          fontSize: 'clamp(20px, 2.8vw, 40px)', fontWeight: 500,
          color: D.text, marginBottom: 40, lineHeight: 1.3,
        }}>
          Analogue and digital<br />recording workflows.
        </h2>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 28px)', fontWeight: 400,
          color: D.textDim, marginBottom: 20, lineHeight: 1.5,
        }}>
          For bands, artists, podcasts,<br />and production.
        </p>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 28px)', fontWeight: 400,
          color: D.textDim, marginBottom: 40, lineHeight: 1.5,
        }}>
          By appointment and booking.
        </p>
        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 24px)', fontWeight: 400,
          color: D.brass, letterSpacing: '0.05em',
        }}>
          cowleyroadstudios.com/book
        </p>
      </div>
      <BottomBar />
    </div>
  )
}

// ─── Slide 03 — Rehearsals ───────────────────────────────────────────────────
function Slide03Rehearsals() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: D.bg,
      display: 'flex', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <TopBadge />
      <div style={{
        width: '60%', marginLeft: 120,
        paddingTop: 20,
      }}>
        <div style={{
          borderTop: `4px solid ${D.brass}`,
          paddingTop: 40,
        }}>
          <h1 style={{
            fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 700,
            color: '#FFFFFF', letterSpacing: '0.05em',
            marginBottom: 40, lineHeight: 1.1,
          }}>
            REHEARSALS
          </h1>
          <div style={{ display: 'flex', gap: 60, marginBottom: 40 }}>
            <span style={{
              fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 500,
              color: D.nettle, letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>Cowley Road</span>
            <span style={{
              fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 500,
              color: D.nettle, letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>Cricket Road</span>
          </div>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 28px)', fontWeight: 400,
            color: D.textDim, marginBottom: 20, lineHeight: 1.5,
          }}>
            Reliable rehearsal rooms<br />for working musicians.
          </p>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 28px)', fontWeight: 400,
            color: D.textDim, lineHeight: 1.5,
          }}>
            4-piece and expandable via booths.
          </p>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}

// ─── Slide 04 — Technical Services ──────────────────────────────────────────
function Slide04Technical() {
  const services = ['Audio', 'AV', 'Repairs', 'Installation']
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: D.bg,
      display: 'flex', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <TopBadge />
      <div style={{ width: '60%', marginLeft: 120 }}>
        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700,
          color: D.brass, letterSpacing: '0.05em',
          marginBottom: 40, lineHeight: 1.1,
        }}>
          TECHNICAL SERVICES
        </h1>
        <div style={{ borderTop: `1px solid ${D.divider}`, marginBottom: 40 }}>
          {services.map(s => (
            <div key={s} style={{
              fontSize: 'clamp(20px, 2.8vw, 36px)', fontWeight: 500,
              color: '#FFFFFF', letterSpacing: '0.05em',
              padding: '16px 0',
              borderBottom: `1px solid ${D.divider}`,
              textTransform: 'uppercase',
            }}>{s}</div>
          ))}
        </div>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 28px)', fontWeight: 400,
          color: D.textDim, lineHeight: 1.5,
        }}>
          Professional technical support<br />for studios, venues, and events.
        </p>
      </div>
      <BottomBar />
    </div>
  )
}

// ─── Slide 05 — Workshop Café ────────────────────────────────────────────────
function Slide05WorkshopCafe() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: D.bgWarm,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <TopBadge />
      <div style={{ width: '80%', textAlign: 'center' }}>
        <div style={{
          paddingBottom: 30,
          borderBottom: `2px solid ${D.mustard}`,
          marginBottom: 40,
        }}>
          <h1 style={{
            fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 700,
            color: D.mustard, letterSpacing: '0.05em', lineHeight: 1.1,
          }}>
            WORKSHOP CAFÉ
          </h1>
        </div>
        <div style={{
          fontSize: 'clamp(20px, 2.8vw, 36px)', fontWeight: 500,
          color: D.text, marginBottom: 40, letterSpacing: '0.05em',
        }}>
          Coffee · Workspace · Events · Community
        </div>
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 400,
          color: D.textDim, marginBottom: 60, lineHeight: 1.5,
        }}>
          The public-facing social layer<br />of Cowley Road Studios.
        </p>
        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 24px)', fontWeight: 400,
          color: D.brass, letterSpacing: '0.05em',
        }}>
          118 Cowley Road · Open to all
        </p>
      </div>
      <BottomBar />
    </div>
  )
}

// ─── Slide 06 — Community ────────────────────────────────────────────────────
function Slide06Community() {
  const activities = ['Workshops', 'Open sessions', 'Collaboration', 'Skills development']
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: D.bg,
      display: 'flex', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <TopBadge />
      <div style={{ width: '55%', marginLeft: 120 }}>
        <h1 style={{
          fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 700,
          color: D.nettle, letterSpacing: '0.05em',
          marginBottom: 40, lineHeight: 1.1,
        }}>
          COMMUNITY
        </h1>
        <div style={{ borderTop: `1px solid ${D.divider}`, marginBottom: 50 }}>
          {activities.map(a => (
            <div key={a} style={{
              fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 500,
              color: D.text, padding: '18px 0',
              borderBottom: `1px solid ${D.divider}`,
              letterSpacing: '0.02em',
            }}>{a}</div>
          ))}
        </div>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 28px)', fontWeight: 400,
          color: D.textDim, lineHeight: 1.5,
        }}>
          Built around Oxford's<br />creative community.
        </p>
      </div>
      <BottomBar />
    </div>
  )
}

// ─── Slide 07 — Heritage ─────────────────────────────────────────────────────
function Slide07Heritage() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: D.bg,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <TopBadge />
      <div style={{ width: '80%', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(28px, 4.5vw, 64px)', fontWeight: 700,
          color: '#FFFFFF', letterSpacing: '0.05em',
          marginBottom: 60, lineHeight: 1.1,
        }}>
          OXFORD MUSIC INFRASTRUCTURE
        </h1>
        <div style={{
          padding: '40px 80px',
          borderTop: `1px solid ${D.divider}`,
          borderBottom: `1px solid ${D.divider}`,
          marginBottom: 60,
          background: '#141414',
        }}>
          <h2 style={{
            fontSize: 'clamp(14px, 2vw, 28px)', fontWeight: 500,
            color: D.brass, marginBottom: 30,
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Built from the legacy of:
          </h2>
          <div style={{
            fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: 700,
            color: D.brass, lineHeight: 1.4, letterSpacing: '0.02em',
          }}>
            Soundworks<br />Oxford Sound &amp; Light
          </div>
        </div>
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 400,
          color: D.textDim, lineHeight: 1.5,
        }}>
          Restoring creative infrastructure<br />to Cowley Road.
        </p>
      </div>
      <BottomBar />
    </div>
  )
}

// ─── Slide 08 — Bookings & Enquiries ────────────────────────────────────────
function Slide08Bookings() {
  const contacts = [
    { value: 'cowleyroadstudios@gmail.com' },
    { value: '@cowleyroadstudios' },
    { value: 'cowleyroadstudios.com' },
    { label: 'Phone:', value: '[TK]' },
  ]
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: D.bg,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <TopBadge />
      <div style={{ width: '60%' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 20, marginBottom: 60, justifyContent: 'center',
        }}>
          <span style={{
            color: D.signalGreen, fontSize: 32,
            textShadow: `0 0 10px rgba(57,255,20,0.5)`,
          }}>●</span>
          <h1 style={{
            fontSize: 'clamp(28px, 4.5vw, 64px)', fontWeight: 700,
            color: D.brass, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            BOOKINGS &amp; ENQUIRIES
          </h1>
        </div>
        <div>
          {contacts.map((c, i) => (
            <div key={i} style={{
              padding: '22px 0',
              borderTop: `1px solid ${D.border}`,
              ...(i === contacts.length - 1 ? { borderBottom: `1px solid ${D.border}` } : {}),
              fontSize: 'clamp(16px, 2.2vw, 32px)', fontWeight: 500,
              color: D.text, letterSpacing: '0.02em', textAlign: 'center',
            }}>
              {c.label && (
                <span style={{ color: '#888', fontWeight: 400, marginRight: 10 }}>{c.label}</span>
              )}
              {c.value}
            </div>
          ))}
        </div>
      </div>
      <BottomBar />
    </div>
  )
}

// ─── Slide 09 — Closing Frame ────────────────────────────────────────────────
function Slide09Closing() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: D.bgDark,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <TopBadge />
      <div style={{ width: '90%', textAlign: 'center' }}>
        <div style={{
          padding: '50px 0',
          borderTop: `1px solid rgba(181,166,66,0.5)`,
          borderBottom: `1px solid rgba(181,166,66,0.5)`,
          marginBottom: 50,
        }}>
          <h1 style={{
            fontSize: 'clamp(44px, 8vw, 110px)', fontWeight: 700,
            color: '#FFFFFF', letterSpacing: '0.05em', lineHeight: 1,
          }}>
            COWLEY ROAD STUDIOS
          </h1>
        </div>
        <div style={{
          fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 500,
          color: D.text, marginBottom: 40, letterSpacing: '0.05em', opacity: 0.9,
        }}>
          Recording · Rehearsal · Technical Services · Workshop Café
        </div>
        <div style={{
          fontSize: 'clamp(20px, 3vw, 40px)', fontWeight: 400,
          color: D.brass, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Oxford
        </div>
      </div>
      <BottomBar />
    </div>
  )
}

// ─── Frame definitions ────────────────────────────────────────────────────────
type DeckFrame = {
  id: string
  component: React.FC
  duration: number
}

const DECK_FRAMES: DeckFrame[] = [
  { id: 'identity',   component: Slide01Identity,   duration: 18000 },
  { id: 'recording',  component: Slide02Recording,  duration: 10000 },
  { id: 'rehearsals', component: Slide03Rehearsals, duration: 10000 },
  { id: 'technical',  component: Slide04Technical,  duration: 10000 },
  { id: 'cafe',       component: Slide05WorkshopCafe, duration: 10000 },
  { id: 'community',  component: Slide06Community,  duration: 10000 },
  { id: 'heritage',   component: Slide07Heritage,   duration: 10000 },
  { id: 'bookings',   component: Slide08Bookings,   duration: 10000 },
  { id: 'closing',    component: Slide09Closing,    duration: 14000 },
]

// ─── Main StreetDeck component ────────────────────────────────────────────────
interface StreetDeckProps {
  onLoopComplete?: () => void
}

export default function StreetDeck({ onLoopComplete }: StreetDeckProps) {
  const [frameIdx, setFrameIdx] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const frame = DECK_FRAMES[frameIdx]
    timerRef.current = setTimeout(() => {
      // Fade out
      setOpacity(0)
      setTimeout(() => {
        setFrameIdx(i => {
          const next = (i + 1) % DECK_FRAMES.length
          if (next === 0 && onLoopComplete) onLoopComplete()
          return next
        })
        // Fade in
        setOpacity(1)
      }, 600)
    }, frame.duration)
    return () => clearTimeout(timerRef.current)
  }, [frameIdx, onLoopComplete])

  const CurrentFrame = DECK_FRAMES[frameIdx].component

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0E0E0E',
      overflow: 'hidden',
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    }}>
      {/* Google Fonts: Inter */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');`}</style>
      <div style={{
        position: 'absolute', inset: 0,
        opacity,
        transition: 'opacity 0.6s ease-in-out',
      }}>
        <CurrentFrame />
      </div>
    </div>
  )
}
