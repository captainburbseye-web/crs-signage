import React, { useEffect, useState, useRef } from 'react'

const C = {
  bg: '#0E0E0E',
  text: '#E8E8E8',
  green: '#3A5C3A',
  amber: '#D4A017',
  dim: 'rgba(232,232,232,0.38)',
}

// Time-based mode detection
function getNightMode(): 'dusk' | 'night' {
  const h = new Date().getHours()
  const m = new Date().getMinutes()
  const t = h * 60 + m
  if (t >= 18 * 60 && t < 22 * 60 + 30) return 'dusk'
  return 'night'
}

function getBase(mode: 'dusk' | 'night'): React.CSSProperties {
  return {
    width: '100vw',
    height: '100vh',
    background: mode === 'dusk' ? '#0F0E0C' : C.bg,
    color: C.text,
    fontFamily: "'JetBrains Mono', monospace",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '6vw',
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    // Dusk mode: faint mustard warmth layer via box-shadow inset
    boxShadow: mode === 'dusk' ? `inset 0 0 120px rgba(212,160,23,0.04)` : 'none',
  }
}

const headline: React.CSSProperties = {
  fontFamily: "'Oswald', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
  lineHeight: 1.08,
  letterSpacing: '0.02em',
  color: C.text,
  textShadow: `0 0 22px rgba(212,160,23,0.22), 0 0 44px rgba(212,160,23,0.08)`,
  margin: 0,
}

const label: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 400,
  fontSize: 'clamp(0.6rem, 0.95vw, 0.82rem)',
  letterSpacing: '0.22em',
  color: 'rgba(212,160,23,0.55)',
  textTransform: 'uppercase',
  marginBottom: '1.4rem',
}

const body: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 300,
  fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
  lineHeight: 1.75,
  color: C.dim,
  marginTop: '1.5rem',
  maxWidth: '60%',
}

// Single animated mustard line (Frame 5 only)
function MustardLine() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const id = setTimeout(() => setWidth(72), 200) // stops before full width
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{
      height: '1px',
      background: C.amber,
      width: `${width}%`,
      transition: 'width 4s ease',
      marginTop: '2.5rem',
      opacity: 0.7,
    }} />
  )
}

// QR with soft radial glow, pulses every 8s
function QRCode() {
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 700)
    }, 8000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      width: '130px',
      height: '130px',
      border: `1px solid ${pulse ? C.amber : 'rgba(58,92,58,0.6)'}`,
      boxShadow: pulse ? `0 0 24px rgba(212,160,23,0.3), 0 0 48px rgba(212,160,23,0.12)` : 'none',
      transition: 'all 0.5s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '2.5rem',
    }}>
      <span style={{ ...label, marginBottom: 0, color: 'rgba(58,92,58,0.8)', fontSize: '0.58rem', textAlign: 'center', lineHeight: 1.5 }}>
        QR<br />crsoxford.com
      </span>
    </div>
  )
}

// Background drift: 0.3% movement — barely perceptible
function DriftBg({ mode }: { mode: 'dusk' | 'night' }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dirRef = useRef({ x: 1, y: 1 })
  useEffect(() => {
    const id = setInterval(() => {
      setOffset(prev => {
        const nx = prev.x + dirRef.current.x * 0.003
        const ny = prev.y + dirRef.current.y * 0.003
        if (Math.abs(nx) > 0.3) dirRef.current.x *= -1
        if (Math.abs(ny) > 0.3) dirRef.current.y *= -1
        return { x: nx, y: ny }
      })
    }, 100)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: mode === 'dusk' ? 'rgba(212,160,23,0.015)' : 'transparent',
      transform: `translate(${offset.x}%, ${offset.y}%)`,
      pointerEvents: 'none',
      zIndex: 0,
    }} />
  )
}

function Transition({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: C.bg,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease',
      zIndex: 100,
      pointerEvents: 'none',
    }} />
  )
}

function ModeLabel({ mode }: { mode: 'dusk' | 'night' }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '3vh',
      left: '6vw',
      ...label,
      marginBottom: 0,
      opacity: 0.25,
      fontSize: '0.55rem',
      zIndex: 10,
    }}>
      {mode === 'dusk' ? 'DUSK MODE' : 'NIGHT MODE'}
    </div>
  )
}

function makeFrames(mode: 'dusk' | 'night'): React.FC[] {
  const b = getBase(mode)
  return [
    // Frame 1 — Identity
    () => (
      <div style={b}>
        <div style={label}>CRS OXFORD</div>
        <h1 style={{ ...headline, fontSize: 'clamp(3.5rem, 7.5vw, 7rem)' }}>
          Cowley Road<br />Studios
        </h1>
        <p style={body}>118 Cowley Rd · OX4</p>
      </div>
    ),

    // Frame 2 — Positioning
    () => (
      <div style={b}>
        <div style={label}>TONIGHT</div>
        <h1 style={headline}>
          Serious sound.<br />Open doors.
        </h1>
      </div>
    ),

    // Frame 3 — Rehearsal
    () => (
      <div style={b}>
        <div style={label}>REHEARSAL</div>
        <h1 style={headline}>
          Rehearsal<br />Rooms
        </h1>
        <p style={body}>From £45 / 2 hrs</p>
      </div>
    ),

    // Frame 4 — Recording
    () => (
      <div style={b}>
        <div style={label}>RECORDING</div>
        <h1 style={headline}>
          Recording<br />Studio
        </h1>
        <p style={body}>Tracking · Mixing · Mastering</p>
      </div>
    ),

    // Frame 5 — The line (one animated accent for the whole reel)
    () => (
      <div style={b}>
        <div style={label}>LIVE SOUND</div>
        <h1 style={headline}>
          PA · Projection<br />Live Capture
        </h1>
        <MustardLine />
      </div>
    ),

    // Frame 6 — Café
    () => (
      <div style={b}>
        <div style={label}>WORKSHOP CAFÉ</div>
        <h1 style={headline}>
          Coffee.<br />Co-work.
        </h1>
      </div>
    ),

    // Frame 7 — Ecosystem
    () => (
      <div style={b}>
        <div style={label}>CRS OXFORD</div>
        <h1 style={{ ...headline, fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}>
          Creative infrastructure<br />for Oxford musicians.
        </h1>
      </div>
    ),

    // Frame 8 — QR
    () => (
      <div style={b}>
        <div style={label}>BOOK</div>
        <h1 style={headline}>
          crsoxford.com
        </h1>
        <QRCode />
      </div>
    ),
  ]
}

const DURATIONS = [9000, 9500, 9500, 9500, 11000, 9000, 10000, 10000]

export default function NightEdition() {
  const [frame, setFrame] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [mode, setMode] = useState<'dusk' | 'night'>(getNightMode())

  // Re-check mode every minute
  useEffect(() => {
    const id = setInterval(() => setMode(getNightMode()), 60000)
    return () => clearInterval(id)
  }, [])

  const FRAMES = makeFrames(mode)

  useEffect(() => {
    const advance = () => {
      setTransitioning(true)
      setTimeout(() => {
        setFrame(f => (f + 1) % FRAMES.length)
        setTransitioning(false)
      }, 350)
    }
    const id = setTimeout(advance, DURATIONS[frame])
    return () => clearTimeout(id)
  }, [frame, mode])

  const Frame = FRAMES[frame]

  return (
    <>
      <DriftBg mode={mode} />
      <Frame />
      <ModeLabel mode={mode} />
      <Transition visible={transitioning} />
    </>
  )
}
