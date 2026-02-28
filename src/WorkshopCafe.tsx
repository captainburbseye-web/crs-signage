/**
 * WorkshopCafe.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Workshop Café signage loop — /cafe route
 *
 * Design philosophy: Community noticeboard meets soft industrial workshop.
 * Warm, welcoming, playful — NOT a control room. First-time café visitors
 * should feel invited, not intimidated.
 *
 * Colour palette:
 *   Sage green  #4A7C59  — dominant, grounding
 *   Mustard     #D4A017  — accents, highlights, CTAs
 *   Warm cream  #F2ECD8  — text on dark backgrounds
 *   Charcoal    #1A1A14  — background
 *   Warm brown  #6B4C2A  — structural elements
 *
 * Frame loop (6 frames):
 *   0. Identity   — "We're Open" + hours + what we are (18s)
 *   1. Events     — Dano's Galactic Jam + upcoming community events (14s)
 *   2. Venue Hire — "Make It Your Own" flexible space (12s)
 *   3. Repairs    — Instrument repairs + AV tech (12s)
 *   4. Community  — Art wall, workshops, sell your art (12s)
 *   5. Find Us    — Address, hours, contact (10s)
 */

import React, { useState, useEffect, useRef } from 'react'

// ─── Café design tokens ───────────────────────────────────────────────────────
const CC = {
  bg:          '#1A1A14',
  bgWarm:      '#1E1C14',
  sage:        '#4A7C59',
  sageDim:     '#3A5C45',
  mustard:     '#D4A017',
  mustardDim:  '#A87C10',
  cream:       '#F2ECD8',
  creamDim:    'rgba(242,236,216,0.72)',
  creamMute:   'rgba(242,236,216,0.45)',
  brown:       '#6B4C2A',
  border:      'rgba(74,124,89,0.25)',
  borderWarm:  'rgba(212,160,23,0.22)',
}

const CT = {
  display: "'Oswald', sans-serif",
  body:    "'JetBrains Mono', monospace",
  serif:   "'Georgia', serif",
}

// ─── Shared ticker ────────────────────────────────────────────────────────────
function CafeTicker() {
  const items = [
    '☕',
    'Workshop Café · 118 Cowley Road · Oxford',
    '◆',
    'Open Tue–Sun · 9am–6pm',
    '◆',
    'workshopcafe.ox',
    '◆',
    '01865 722027',
    '◆',
    '@workshopcafe.ox',
    '◆',
    'Coffee · Repairs · Events · Art',
    '◆',
    'Workshop Café · 118 Cowley Road · Oxford',
    '◆',
  ]
  return (
    <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: 30,
      background: CC.sage,
      overflow: 'hidden',
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        gap: '2.5rem',
        whiteSpace: 'nowrap',
        animation: 'tickerScroll 32s linear infinite',
        fontFamily: CT.body,
        fontSize: 11,
        letterSpacing: '0.16em',
        color: CC.bg,
        textTransform: 'uppercase',
        fontWeight: 600,
      }}>
        {items.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </div>
  )
}

// ─── Shared shell ─────────────────────────────────────────────────────────────
function CafeShell({ children, frame, total }: {
  children: React.ReactNode
  frame: number
  total: number
}) {
  const [time, setTime] = useState(() => {
    const n = new Date()
    return n.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  })
  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date()
      setTime(n.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
    }, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: CC.bg,
      overflow: 'hidden',
      fontFamily: CT.body,
    }}>
      {/* Header bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 44,
        background: CC.bgWarm,
        borderBottom: `2px solid ${CC.sage}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Gear/cup logo placeholder — text mark */}
          <div style={{
            fontFamily: CT.display,
            fontSize: 18,
            fontWeight: 700,
            color: CC.mustard,
            letterSpacing: '0.06em',
          }}>WORKSHOP CAFÉ</div>
          <div style={{
            fontFamily: CT.body,
            fontSize: 9,
            letterSpacing: '0.2em',
            color: CC.sage,
            textTransform: 'uppercase',
          }}>118 Cowley Road · Oxford</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Frame dots */}
          <div style={{ display: 'flex', gap: 5 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{
                width: i === frame ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i === frame ? CC.mustard : CC.sage,
                opacity: i === frame ? 1 : 0.4,
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>
          <div style={{
            fontFamily: CT.body,
            fontSize: 10,
            color: CC.creamMute,
            letterSpacing: '0.12em',
          }}>{time}</div>
        </div>
      </div>

      {/* Content area */}
      <div style={{
        position: 'absolute',
        top: 44, left: 0, right: 0, bottom: 30,
      }}>
        {children}
      </div>

      <CafeTicker />
    </div>
  )
}

// ─── FRAME 0: IDENTITY / WE'RE OPEN ──────────────────────────────────────────
function CafeIdentityFrame() {
  const isOpen = (() => {
    const now = new Date()
    const day = now.getDay() // 0=Sun
    const t = now.getHours() * 60 + now.getMinutes()
    // Closed Mondays; open Tue–Sun 9am–6pm
    if (day === 1) return false
    return t >= 9 * 60 && t < 18 * 60
  })()

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(1rem, 3vmin, 2.5rem)',
      padding: 'clamp(1.5rem, 4vmin, 3rem)',
    }}>
      {/* Open/closed status badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: isOpen ? 'rgba(74,124,89,0.15)' : 'rgba(180,60,40,0.12)',
        border: `1px solid ${isOpen ? CC.sage : '#B43C28'}`,
        borderRadius: 4,
        padding: '6px 20px',
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: isOpen ? CC.sage : '#B43C28',
          boxShadow: `0 0 8px ${isOpen ? CC.sage : '#B43C28'}`,
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily: CT.body,
          fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: isOpen ? CC.sage : '#B43C28',
          fontWeight: 600,
        }}>{isOpen ? 'Open Now' : 'Closed Today'}</span>
      </div>

      {/* Main headline */}
      <div style={{
        fontFamily: CT.display,
        fontSize: 'clamp(2rem, min(6vw, 9vh), 7rem)',
        fontWeight: 800,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: CC.cream,
        textAlign: 'center',
        lineHeight: 0.95,
        textShadow: `0 0 60px ${CC.sage}33`,
      }}>
        Workshop<br />
        <span style={{ color: CC.mustard }}>Café</span>
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: CT.body,
        fontSize: 'clamp(0.75rem, min(1.4vw, 2.2vh), 1.2rem)',
        color: CC.creamDim,
        letterSpacing: '0.08em',
        textAlign: 'center',
        lineHeight: 1.5,
      }}>
        Coffee · Repairs · Events · Community
      </div>

      {/* Hours grid */}
      <div style={{
        display: 'flex',
        gap: 'clamp(0.5rem, 2vw, 2rem)',
        marginTop: 'clamp(0.5rem, 1.5vmin, 1rem)',
      }}>
        {[
          { day: 'Mon', hours: 'Closed' },
          { day: 'Tue–Fri', hours: '9am – 6pm' },
          { day: 'Sat–Sun', hours: '9am – 6pm' },
        ].map(h => (
          <div key={h.day} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${CC.border}`,
            borderTop: `2px solid ${CC.sage}`,
            borderRadius: 3,
            padding: 'clamp(8px, 1.5vmin, 16px) clamp(12px, 2vw, 24px)',
          }}>
            <div style={{
              fontFamily: CT.body,
              fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: CC.sage,
            }}>{h.day}</div>
            <div style={{
              fontFamily: CT.display,
              fontSize: 'clamp(0.8rem, 1.4vw, 1.1rem)',
              fontWeight: 600,
              color: h.hours === 'Closed' ? CC.creamMute : CC.cream,
              letterSpacing: '0.04em',
            }}>{h.hours}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FRAME 1: EVENTS ─────────────────────────────────────────────────────────
function CafeEventsFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(1rem, 2.5vmin, 2rem)',
      padding: 'clamp(1.5rem, 4vmin, 3rem)',
    }}>
      {/* Section label */}
      <div style={{
        fontFamily: CT.body,
        fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: CC.sage,
        opacity: 0.85,
      }}>What's On</div>

      {/* Featured event — Dano's Galactic Jam */}
      <div style={{
        width: '100%',
        maxWidth: 860,
        background: 'rgba(74,124,89,0.08)',
        border: `1px solid ${CC.sage}44`,
        borderLeft: `4px solid ${CC.sage}`,
        borderRadius: 4,
        padding: 'clamp(1rem, 2.5vmin, 2rem) clamp(1.2rem, 3vw, 2.5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.4rem, 1.2vmin, 0.8rem)',
      }}>
        <div style={{
          fontFamily: CT.body,
          fontSize: 'clamp(0.55rem, 0.9vw, 0.72rem)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: CC.sage,
        }}>Every Wednesday · 7–11pm · Free Entry</div>
        <div style={{
          fontFamily: CT.display,
          fontSize: 'clamp(1.4rem, min(3.5vw, 5.5vh), 3.5rem)',
          fontWeight: 800,
          color: CC.cream,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}>Dano's Galactic Jam</div>
        <div style={{
          fontFamily: CT.body,
          fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
          color: CC.creamDim,
          letterSpacing: '0.06em',
          lineHeight: 1.5,
        }}>
          Live jams · DJ sets · Open mic · Bring your instrument
        </div>
      </div>

      {/* Upcoming events grid */}
      <div style={{
        display: 'flex',
        gap: 'clamp(0.6rem, 2vw, 1.5rem)',
        width: '100%',
        maxWidth: 860,
      }}>
        {[
          {
            title: 'Textile Mending Workshop',
            detail: 'Sashiko · Boro · Darning',
            when: 'Fridays · 2pm',
            color: CC.mustard,
          },
          {
            title: 'Open Mic Night',
            detail: 'All welcome · All styles',
            when: 'Monthly',
            color: CC.sage,
          },
          {
            title: 'Community Workshops',
            detail: 'Skills · Crafts · Ideas',
            when: 'See workshopcafe.ox',
            color: '#9B7FD4',
          },
        ].map(ev => (
          <div key={ev.title} style={{
            flex: 1,
            background: 'rgba(255,255,255,0.025)',
            border: `1px solid ${CC.border}`,
            borderTop: `2px solid ${ev.color}`,
            borderRadius: 3,
            padding: 'clamp(0.8rem, 2vmin, 1.5rem) clamp(0.8rem, 1.5vw, 1.2rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.3rem, 0.8vmin, 0.6rem)',
          }}>
            <div style={{
              fontFamily: CT.display,
              fontSize: 'clamp(0.85rem, 1.6vw, 1.3rem)',
              fontWeight: 700,
              color: ev.color,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}>{ev.title}</div>
            <div style={{
              fontFamily: CT.body,
              fontSize: 'clamp(0.6rem, 1vw, 0.82rem)',
              color: CC.creamDim,
              letterSpacing: '0.06em',
            }}>{ev.detail}</div>
            <div style={{
              fontFamily: CT.body,
              fontSize: 'clamp(0.55rem, 0.85vw, 0.7rem)',
              color: ev.color,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: 'auto',
              paddingTop: 4,
              opacity: 0.85,
            }}>{ev.when}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FRAME 2: VENUE HIRE ─────────────────────────────────────────────────────
function CafeVenueFrame() {
  const features = [
    { icon: '◎', label: 'Full PA & Sound' },
    { icon: '▣', label: 'Projection & Screen' },
    { icon: '✦', label: 'Lighting Rig' },
    { icon: '◈', label: 'Flexible Layout' },
    { icon: '☕', label: 'Catering Available' },
    { icon: '⟐', label: 'Up to 80 Guests' },
  ]
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(1rem, 2.5vmin, 2rem)',
      padding: 'clamp(1.5rem, 4vmin, 3rem)',
    }}>
      <div style={{
        fontFamily: CT.body,
        fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: CC.mustard,
        opacity: 0.85,
      }}>Space for Hire</div>

      <div style={{
        fontFamily: CT.display,
        fontSize: 'clamp(1.8rem, min(5vw, 7.5vh), 5.5rem)',
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: CC.cream,
        textAlign: 'center',
        lineHeight: 1,
        textShadow: `0 0 40px ${CC.mustard}22`,
      }}>
        Make It<br /><span style={{ color: CC.mustard }}>Your Own</span>
      </div>

      <div style={{
        fontFamily: CT.body,
        fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
        color: CC.creamDim,
        textAlign: 'center',
        letterSpacing: '0.06em',
        lineHeight: 1.6,
        maxWidth: 600,
      }}>
        Workshops · Performances · Screenings · Private Hire<br />
        Bring your vision — we'll make it happen
      </div>

      {/* Feature grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(0.4rem, 1.2vw, 0.8rem)',
        justifyContent: 'center',
        maxWidth: 720,
      }}>
        {features.map(f => (
          <div key={f.label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(212,160,23,0.06)',
            border: `1px solid ${CC.borderWarm}`,
            borderRadius: 3,
            padding: 'clamp(5px, 1vmin, 10px) clamp(10px, 1.8vw, 18px)',
          }}>
            <span style={{ color: CC.mustard, fontSize: 12 }}>{f.icon}</span>
            <span style={{
              fontFamily: CT.body,
              fontSize: 'clamp(0.6rem, 1vw, 0.82rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: CC.creamDim,
            }}>{f.label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        fontFamily: CT.body,
        fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
        color: CC.mustard,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
      }}>DM @workshopcafe.ox · 01865 722027</div>
    </div>
  )
}

// ─── FRAME 3: REPAIRS ────────────────────────────────────────────────────────
function CafeRepairsFrame() {
  const services = [
    { name: 'Instrument Repairs',  detail: 'Guitar · Bass · Keys · Brass · Strings', color: CC.sage },
    { name: 'AV & Tech',           detail: 'Cables · Amps · Mixers · Speakers',       color: CC.mustard },
    { name: 'Precision Servicing', detail: 'Setups · Intonation · Electronics',        color: '#9B7FD4' },
  ]
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(1rem, 2.5vmin, 2rem)',
      padding: 'clamp(1.5rem, 4vmin, 3rem)',
    }}>
      <div style={{
        fontFamily: CT.body,
        fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: CC.sage,
        opacity: 0.85,
      }}>We Salute Sustainability · The Art of Repair</div>

      <div style={{
        fontFamily: CT.display,
        fontSize: 'clamp(1.8rem, min(5vw, 7.5vh), 5rem)',
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: CC.cream,
        textAlign: 'center',
        lineHeight: 1,
      }}>
        Instrument<br /><span style={{ color: CC.sage }}>Repairs</span>
      </div>

      <div style={{
        fontFamily: CT.body,
        fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
        color: CC.creamDim,
        textAlign: 'center',
        letterSpacing: '0.06em',
        lineHeight: 1.6,
      }}>
        Restore your beloved gear with expert care
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.5rem, 1.5vmin, 1rem)',
        width: '100%',
        maxWidth: 700,
      }}>
        {services.map(s => (
          <div key={s.name} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.8rem, 2vw, 1.5rem)',
            background: 'rgba(255,255,255,0.025)',
            border: `1px solid ${CC.border}`,
            borderLeft: `3px solid ${s.color}`,
            borderRadius: 3,
            padding: 'clamp(0.7rem, 1.8vmin, 1.2rem) clamp(1rem, 2.5vw, 2rem)',
          }}>
            <div style={{
              fontFamily: CT.display,
              fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)',
              fontWeight: 700,
              color: s.color,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              minWidth: 'clamp(140px, 22vw, 220px)',
            }}>{s.name}</div>
            <div style={{
              fontFamily: CT.body,
              fontSize: 'clamp(0.6rem, 1vw, 0.82rem)',
              color: CC.creamDim,
              letterSpacing: '0.06em',
            }}>{s.detail}</div>
          </div>
        ))}
      </div>

      <div style={{
        fontFamily: CT.body,
        fontSize: 'clamp(0.65rem, 1.1vw, 0.9rem)',
        color: CC.sage,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>workshopcafe.ox · 01865 722027</div>
    </div>
  )
}

// ─── FRAME 4: COMMUNITY ───────────────────────────────────────────────────────
function CafeCommunityFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(1rem, 2.5vmin, 2rem)',
      padding: 'clamp(1.5rem, 4vmin, 3rem)',
    }}>
      <div style={{
        fontFamily: CT.body,
        fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: CC.mustard,
        opacity: 0.85,
      }}>Community · Creativity · Cowley Road</div>

      <div style={{
        fontFamily: CT.display,
        fontSize: 'clamp(1.6rem, min(4.5vw, 7vh), 4.5rem)',
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: CC.cream,
        textAlign: 'center',
        lineHeight: 1,
      }}>
        Fuel Your<br /><span style={{ color: CC.mustard }}>Creativity</span>
      </div>

      <div style={{
        display: 'flex',
        gap: 'clamp(0.8rem, 2.5vw, 2rem)',
        width: '100%',
        maxWidth: 860,
        marginTop: 'clamp(0.5rem, 1.5vmin, 1rem)',
      }}>
        {[
          {
            headline: 'Sell Your Art Here',
            body: 'Local artists welcome. Display and sell your work in our gallery wall.',
            cta: 'DM us to apply',
            color: CC.mustard,
          },
          {
            headline: 'Upcycling Market',
            body: 'Regular Remakery pop-ups. Bring something old, leave with something new.',
            cta: '@workshopcafe.ox',
            color: CC.sage,
          },
          {
            headline: 'Co-working Space',
            body: 'Good coffee, fast wifi, creative people. Come for the coffee, stay for the ideas.',
            cta: 'No booking needed',
            color: '#9B7FD4',
          },
        ].map(card => (
          <div key={card.headline} style={{
            flex: 1,
            background: 'rgba(255,255,255,0.025)',
            border: `1px solid ${CC.border}`,
            borderTop: `2px solid ${card.color}`,
            borderRadius: 3,
            padding: 'clamp(1rem, 2.5vmin, 2rem) clamp(0.8rem, 1.8vw, 1.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.4rem, 1vmin, 0.8rem)',
          }}>
            <div style={{
              fontFamily: CT.display,
              fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)',
              fontWeight: 700,
              color: card.color,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}>{card.headline}</div>
            <div style={{
              fontFamily: CT.body,
              fontSize: 'clamp(0.6rem, 1vw, 0.82rem)',
              color: CC.creamDim,
              letterSpacing: '0.04em',
              lineHeight: 1.55,
              flexGrow: 1,
            }}>{card.body}</div>
            <div style={{
              fontFamily: CT.body,
              fontSize: 'clamp(0.55rem, 0.85vw, 0.7rem)',
              color: card.color,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              opacity: 0.85,
            }}>{card.cta}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FRAME 5: FIND US ────────────────────────────────────────────────────────
function CafeFindUsFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(1.2rem, 3vmin, 2.5rem)',
      padding: 'clamp(1.5rem, 4vmin, 3rem)',
    }}>
      {/* Gradient rule */}
      <div style={{
        width: 'clamp(200px, 40vw, 560px)', height: 1,
        background: `linear-gradient(90deg, transparent, ${CC.sage}88, transparent)`,
      }} />

      <div style={{
        fontFamily: CT.display,
        fontSize: 'clamp(1.8rem, min(5vw, 7.5vh), 5rem)',
        fontWeight: 800,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: CC.cream,
        textAlign: 'center',
        lineHeight: 1,
      }}>
        Find<br /><span style={{ color: CC.sage }}>Us</span>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.5rem, 1.5vmin, 1rem)',
        alignItems: 'center',
      }}>
        {[
          { label: 'Address', value: '118 Cowley Road · Oxford · OX4 1JE' },
          { label: 'Hours',   value: 'Tue–Sun · 9am – 6pm · Closed Monday' },
          { label: 'Phone',   value: '01865 722027' },
          { label: 'Web',     value: 'workshopcafe.ox' },
          { label: 'Social',  value: '@workshopcafe.ox' },
          { label: 'Email',   value: 'workshopcafe.ox@gmail.com' },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex',
            gap: 'clamp(0.75rem, 2vw, 1.5rem)',
            alignItems: 'baseline',
          }}>
            <span style={{
              fontFamily: CT.body,
              fontSize: 'clamp(0.6rem, min(0.9vw, 1.5vh), 0.75rem)',
              color: CC.sage,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              minWidth: 60,
              textAlign: 'right',
              opacity: 0.85,
            }}>{row.label}</span>
            <span style={{
              fontFamily: CT.body,
              fontSize: 'clamp(0.75rem, min(1.4vw, 2.2vh), 1.2rem)',
              color: CC.cream,
              letterSpacing: '0.05em',
            }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Gradient rule */}
      <div style={{
        width: 'clamp(200px, 40vw, 560px)', height: 1,
        background: `linear-gradient(90deg, transparent, ${CC.sage}88, transparent)`,
      }} />
    </div>
  )
}

// ─── Main WorkshopCafe component ──────────────────────────────────────────────
type CafeFrame = {
  id: string
  component: React.FC
  duration: number
}

const CAFE_FRAMES: CafeFrame[] = [
  { id: 'identity', component: CafeIdentityFrame, duration: 18000 },
  { id: 'events',   component: CafeEventsFrame,   duration: 14000 },
  { id: 'venue',    component: CafeVenueFrame,     duration: 12000 },
  { id: 'repairs',  component: CafeRepairsFrame,   duration: 12000 },
  { id: 'community',component: CafeCommunityFrame, duration: 12000 },
  { id: 'findus',   component: CafeFindUsFrame,    duration: 10000 },
]

export default function WorkshopCafe() {
  const [frameIdx, setFrameIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const frame = CAFE_FRAMES[frameIdx]
    timerRef.current = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        setFrameIdx(i => (i + 1) % CAFE_FRAMES.length)
        setFading(false)
      }, 500)
    }, frame.duration)
    return () => clearTimeout(timerRef.current)
  }, [frameIdx])

  const CurrentFrame = CAFE_FRAMES[frameIdx].component

  return (
    <CafeShell frame={frameIdx} total={CAFE_FRAMES.length}>
      {/* Warm background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(160deg, ${CC.bg} 0%, #1E1C14 50%, ${CC.bg} 100%)`,
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
    </CafeShell>
  )
}
