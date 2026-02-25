import React, { useEffect, useState, useRef } from 'react'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: '#0E0E0E',
  text: '#E8E8E8',
  green: '#3A5C3A',
  amber: '#D4A017',
  dim: 'rgba(232,232,232,0.45)',
}

const base: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  background: C.bg,
  color: C.text,
  fontFamily: "'JetBrains Mono', monospace",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '6vw',
  boxSizing: 'border-box',
  overflow: 'hidden',
  position: 'relative',
}

const headline: React.CSSProperties = {
  fontFamily: "'Oswald', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
  lineHeight: 1.05,
  letterSpacing: '0.02em',
  color: C.text,
  textShadow: `0 0 18px rgba(212,160,23,0.35)`,
  margin: 0,
}

const label: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 400,
  fontSize: 'clamp(0.65rem, 1.1vw, 0.9rem)',
  letterSpacing: '0.18em',
  color: C.amber,
  textTransform: 'uppercase',
  marginBottom: '1.2rem',
}

const body: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 300,
  fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)',
  lineHeight: 1.7,
  color: C.dim,
  marginTop: '1.4rem',
  maxWidth: '68%',
}

const amberAccent: React.CSSProperties = {
  color: C.amber,
  fontWeight: 500,
}

// ─── VU Meter component ───────────────────────────────────────────────────────
function VUMeter({ count = 12 }: { count?: number }) {
  const [levels, setLevels] = useState<number[]>(Array(count).fill(0))
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let frame = 0
    const tick = () => {
      frame++
      if (frame % 4 === 0) {
        setLevels(prev =>
          prev.map((v, i) => {
            const target = Math.random() * 0.85 + 0.1
            return v + (target - v) * 0.35
          })
        )
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '60px', marginTop: '1.8rem' }}>
      {levels.map((level, i) => (
        <div
          key={i}
          style={{
            width: '10px',
            height: `${level * 60}px`,
            background: level > 0.75 ? C.amber : level > 0.5 ? '#7AB87A' : C.green,
            transition: 'height 0.08s ease',
            borderRadius: '1px 1px 0 0',
          }}
        />
      ))}
    </div>
  )
}

// ─── LED Pulse dot ────────────────────────────────────────────────────────────
function LEDDot({ active }: { active: boolean }) {
  return (
    <span style={{
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: active ? C.amber : C.green,
      boxShadow: active ? `0 0 8px ${C.amber}` : 'none',
      marginRight: '8px',
      transition: 'all 0.3s ease',
    }} />
  )
}

// ─── Transition overlay ───────────────────────────────────────────────────────
function Transition({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: C.bg,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.35s ease',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      {visible && (
        <span style={{ ...label, color: C.green, fontSize: '0.75rem', letterSpacing: '0.3em' }}>
          ROUTING…
        </span>
      )}
    </div>
  )
}

// ─── QR placeholder ──────────────────────────────────────────────────────────
function QRCode() {
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 600)
    }, 7000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      width: '140px',
      height: '140px',
      border: `2px solid ${pulse ? C.amber : C.green}`,
      boxShadow: pulse ? `0 0 20px ${C.amber}55` : 'none',
      transition: 'all 0.4s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '2rem',
    }}>
      <span style={{ ...label, color: C.green, fontSize: '0.6rem', textAlign: 'center', lineHeight: 1.4 }}>
        QR<br />crsoxford.com
      </span>
    </div>
  )
}

// ─── Frame definitions ────────────────────────────────────────────────────────
const FRAMES: React.FC[] = [
  // Frame 1 — System Boot / Identity
  () => (
    <div style={base}>
      <div style={label}>SYSTEM BOOT — CRS OXFORD</div>
      <h1 style={{ ...headline, fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
        Cowley Road<br />Studios
      </h1>
      <p style={{ ...body, marginTop: '1rem' }}>
        Creative Infrastructure OX4<br />
        <span style={amberAccent}>Est. 1999</span> — 118 Cowley Rd, Oxford
      </p>
      <div style={{ position: 'absolute', bottom: '5vh', left: '6vw', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <LEDDot active={true} />
        <span style={{ ...label, marginBottom: 0, color: C.green }}>SIGNAL ACTIVE</span>
      </div>
    </div>
  ),

  // Frame 2 — Positioning
  () => (
    <div style={base}>
      <div style={label}>POSITIONING</div>
      <h1 style={headline}>
        Serious sound.<br />
        <span style={amberAccent}>Open doors.</span>
      </h1>
      <p style={body}>
        Recording · Rehearsal · Live Capture<br />
        Workshop · Café · Co-work
      </p>
    </div>
  ),

  // Frame 3 — Rehearsal System
  () => (
    <div style={base}>
      <div style={label}>REHEARSAL SYSTEM</div>
      <h1 style={headline}>Rehearsal<br />Rooms</h1>
      <p style={body}>
        Fully equipped rooms — backline, PA, monitoring<br />
        <span style={amberAccent}>From £45 / 2 hrs</span><br />
        Daytime · Evening · Weekend slots available
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {['Backline', 'PA System', 'Drum Kit', 'Monitoring', 'Lockup Storage'].map(item => (
          <span key={item} style={{ ...label, marginBottom: 0, color: C.green, border: `1px solid ${C.green}33`, padding: '4px 10px' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  ),

  // Frame 4 — Recording Engine (with VU meters)
  () => (
    <div style={base}>
      <div style={label}>RECORDING ENGINE</div>
      <h1 style={headline}>Recording<br />Studio</h1>
      <p style={body}>
        Tracking · Mixing · Mastering<br />
        Podcast production · <span style={amberAccent}>Analogue signal path</span>
      </p>
      <VUMeter count={16} />
    </div>
  ),

  // Frame 5 — Control Room
  () => (
    <div style={base}>
      <div style={label}>CONTROL ROOM</div>
      <h1 style={headline}>Mix.<br />Master.<br />Overdub.</h1>
      <p style={body}>
        Scheduled sessions · Hourly or block booking<br />
        Engineer available or self-op
      </p>
    </div>
  ),

  // Frame 6 — Live Capture
  () => (
    <div style={base}>
      <div style={label}>LIVE CAPTURE</div>
      <h1 style={headline}>AV Hire &<br />Live Sound</h1>
      <p style={body}>
        PA · Projection · Live recording<br />
        Dry hire or <span style={amberAccent}>fully operated</span>
      </p>
    </div>
  ),

  // Frame 7 — Workshop Café
  () => (
    <div style={base}>
      <div style={label}>WORKSHOP CAFÉ</div>
      <h1 style={headline}>Coffee.<br />Co-work.<br />Community.</h1>
      <p style={body}>
        Open mic nights · Workshops · Events<br />
        Drop in or book a space
      </p>
    </div>
  ),

  // Frame 8 — The Ecosystem
  () => (
    <div style={base}>
      <div style={label}>THE CRS ECOSYSTEM</div>
      <h1 style={{ ...headline, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
        We are building:
      </h1>
      <p style={{ ...body, maxWidth: '80%', marginTop: '1rem' }}>
        A complete creative infrastructure for Oxford musicians.<br />
        <span style={amberAccent}>Record · Rehearse · Perform · Learn · Connect</span>
      </p>
      <p style={{ ...body, marginTop: '1rem', fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)' }}>
        Recording Studio · Rehearsal Rooms · Live Capture<br />
        Workshop Café · Co-work · Open Mic · Events
      </p>
    </div>
  ),

  // Frame 9 — Book a Session
  () => (
    <div style={base}>
      <div style={label}>BOOK A SESSION</div>
      <h1 style={headline}>
        Ready when<br />
        <span style={amberAccent}>you are.</span>
      </h1>
      <p style={body}>crsoxford.com</p>
      <QRCode />
    </div>
  ),
]

const DURATIONS = [9000, 9000, 10000, 11000, 9000, 9000, 9000, 10000, 10000]

// ─── Main component ───────────────────────────────────────────────────────────
export default function SignageApp() {
  const [frame, setFrame] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const advance = () => {
      setTransitioning(true)
      setTimeout(() => {
        setFrame(f => (f + 1) % FRAMES.length)
        setTransitioning(false)
      }, 400)
    }
    const id = setTimeout(advance, DURATIONS[frame])
    return () => clearTimeout(id)
  }, [frame])

  const Frame = FRAMES[frame]

  return (
    <>
      <Frame />
      <Transition visible={transitioning} />
    </>
  )
}
