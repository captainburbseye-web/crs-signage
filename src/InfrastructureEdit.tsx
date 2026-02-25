import React, { useEffect, useState } from 'react'

const C = {
  bg: '#0E0E0E',
  text: '#E8E8E8',
  green: '#3A5C3A',
  amber: '#D4A017',
  dim: 'rgba(232,232,232,0.42)',
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

// Warm amber halo on all headlines (2700K backlight effect)
const headline: React.CSSProperties = {
  fontFamily: "'Oswald', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(2.6rem, 5vw, 4.8rem)',
  lineHeight: 1.1,
  letterSpacing: '0.02em',
  color: C.text,
  textShadow: `0 0 24px rgba(212,160,23,0.28), 0 0 48px rgba(212,160,23,0.12)`,
  margin: 0,
}

const label: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 400,
  fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
  letterSpacing: '0.2em',
  color: C.amber,
  textTransform: 'uppercase',
  marginBottom: '1.4rem',
}

const body: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 300,
  fontSize: 'clamp(0.9rem, 1.35vw, 1.1rem)',
  lineHeight: 1.8,
  color: C.dim,
  marginTop: '1.6rem',
  maxWidth: '58%',
}

function QRCode() {
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 600)
    }, 8000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      width: '130px',
      height: '130px',
      border: `2px solid ${pulse ? C.amber : C.green}`,
      boxShadow: pulse ? `0 0 18px ${C.amber}44` : 'none',
      transition: 'all 0.5s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '2.5rem',
    }}>
      <span style={{ ...label, marginBottom: 0, color: C.green, fontSize: '0.58rem', textAlign: 'center', lineHeight: 1.5 }}>
        QR<br />crsoxford.com
      </span>
    </div>
  )
}

function Transition({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: C.bg,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.4s ease',
      zIndex: 100,
      pointerEvents: 'none',
    }} />
  )
}

const FRAMES: React.FC[] = [
  // Frame 1 — Establishment
  () => (
    <div style={base}>
      <div style={label}>COWLEY ROAD STUDIOS — OX4</div>
      <h1 style={{ ...headline, fontSize: 'clamp(3rem, 6.5vw, 6rem)' }}>
        Cowley Road<br />Studios
      </h1>
      <p style={body}>118 Cowley Rd, Oxford · Est. 1999</p>
    </div>
  ),

  // Frame 2 — Services overview
  () => (
    <div style={base}>
      <div style={label}>WHAT WE DO</div>
      <h1 style={headline}>
        Sound.<br />Space.<br />Community.
      </h1>
    </div>
  ),

  // Frame 3 — Recording
  () => (
    <div style={base}>
      <div style={label}>RECORDING</div>
      <h1 style={headline}>
        Recording<br />Studio
      </h1>
      <p style={body}>
        Tracking · Mixing · Mastering<br />
        Podcast · Analogue path
      </p>
    </div>
  ),

  // Frame 4 — Rehearsal
  () => (
    <div style={base}>
      <div style={label}>REHEARSAL</div>
      <h1 style={headline}>
        Rehearsal<br />Rooms
      </h1>
      <p style={body}>
        Fully equipped · Backline included<br />
        <span style={{ color: C.amber }}>From £45 / 2 hrs</span>
      </p>
    </div>
  ),

  // Frame 5 — Live Connection
  () => (
    <div style={base}>
      <div style={label}>LIVE CAPTURE</div>
      <h1 style={headline}>
        PA · Projection<br />Live Sound
      </h1>
      <p style={body}>Dry hire or fully operated</p>
    </div>
  ),

  // Frame 6 — Workshop Café
  () => (
    <div style={base}>
      <div style={label}>WORKSHOP CAFÉ</div>
      <h1 style={headline}>
        Coffee.<br />Co-work.<br />Create.
      </h1>
    </div>
  ),

  // Frame 7 — Ecosystem
  () => (
    <div style={base}>
      <div style={label}>THE CRS ECOSYSTEM</div>
      <h1 style={{ ...headline, fontSize: 'clamp(2rem, 3.8vw, 3.5rem)' }}>
        Creative infrastructure<br />for Oxford musicians.
      </h1>
    </div>
  ),

  // Frame 8 — Invitation / QR
  () => (
    <div style={base}>
      <div style={label}>BOOK A SESSION</div>
      <h1 style={headline}>
        Come in.<br />Make something.
      </h1>
      <QRCode />
    </div>
  ),
]

const DURATIONS = [9000, 9500, 10000, 10000, 9500, 9500, 10000, 10000]

export default function InfrastructureEdit() {
  const [frame, setFrame] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const advance = () => {
      setTransitioning(true)
      setTimeout(() => {
        setFrame(f => (f + 1) % FRAMES.length)
        setTransitioning(false)
      }, 450)
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
