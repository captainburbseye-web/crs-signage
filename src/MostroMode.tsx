import React, { useEffect, useState, useRef } from 'react'

const C = {
  bg: '#0E0E0E',
  text: '#E8E8E8',
  green: '#3A5C3A',
  amber: '#D4A017',
  dim: 'rgba(232,232,232,0.4)',
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
  // Left-aligned, 10% margin, max 60% width
  paddingLeft: '10vw',
  paddingRight: '10vw',
  paddingTop: '6vh',
  paddingBottom: '6vh',
  boxSizing: 'border-box',
  overflow: 'hidden',
  position: 'relative',
}

const headline: React.CSSProperties = {
  fontFamily: "'Oswald', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(2.6rem, 5vw, 4.8rem)',
  lineHeight: 1.1,
  letterSpacing: '0.02em',
  color: C.text,
  textShadow: `0 0 20px rgba(212,160,23,0.2)`,
  margin: 0,
  maxWidth: '60%',
}

const label: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 400,
  fontSize: 'clamp(0.6rem, 0.95vw, 0.82rem)',
  letterSpacing: '0.2em',
  color: C.amber,
  textTransform: 'uppercase',
  marginBottom: '1.4rem',
  opacity: 0.7,
}

const body: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 300,
  fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
  lineHeight: 1.75,
  color: C.dim,
  marginTop: '1.5rem',
  maxWidth: '55%',
}

// Metal texture overlay at 3% opacity
function MetalTexture() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(232,232,232,0.008) 2px,
        rgba(232,232,232,0.008) 4px
      )`,
      opacity: 0.03,
      pointerEvents: 'none',
      zIndex: 1,
    }} />
  )
}

// Slow mustard underline sweep (Frame 3 — under "vinyl")
function VinylUnderline() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const id = setTimeout(() => setWidth(78), 200) // stops before full width
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{
      height: '2px',
      background: C.amber,
      width: `${width}%`,
      transition: 'width 4s ease',
      marginTop: '0.3rem',
      opacity: 0.75,
    }} />
  )
}

// Frame 4: 3% warmth lift
function WarmthLift() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(212,160,23,0.03)',
      pointerEvents: 'none',
      zIndex: 2,
    }} />
  )
}

// QR — pulses every 8s, no bloom
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
      width: '120px',
      height: '120px',
      border: `1px solid ${pulse ? C.amber : 'rgba(58,92,58,0.5)'}`,
      transition: 'border-color 0.4s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '2.5rem',
    }}>
      <span style={{ ...label, marginBottom: 0, color: 'rgba(58,92,58,0.8)', fontSize: '0.55rem', textAlign: 'center', lineHeight: 1.5 }}>
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

// Truck Records interstitial frame
const TruckFrame: React.FC = () => (
  <div style={base}>
    <div style={label}>ACROSS THE ROAD</div>
    <h1 style={{ ...headline, fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}>
      Truck Records<br />across the road.
    </h1>
    <p style={body}>
      We're building the other half.
    </p>
  </div>
)

// Base 6 frames
const BASE_FRAMES: React.FC[] = [
  // Frame 1 — Identity
  () => (
    <div style={base}>
      <div style={label}>CRS OXFORD</div>
      <h1 style={{ ...headline, fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
        Cowley Road<br />Studios
      </h1>
      <p style={body}>118 Cowley Rd · OX4 · Est. 1999</p>
    </div>
  ),

  // Frame 2 — Positioning
  () => (
    <div style={base}>
      <div style={label}>WHAT WE DO</div>
      <h1 style={headline}>
        Serious sound.<br />Open doors.
      </h1>
    </div>
  ),

  // Frame 3 — Vinyl / Recording (mustard underline sweep)
  () => (
    <div style={base}>
      <div style={label}>RECORDING</div>
      <h1 style={headline}>
        Recording Studio
      </h1>
      <VinylUnderline />
      <p style={body}>
        Tracking · Mixing · Mastering<br />
        Analogue signal path
      </p>
    </div>
  ),

  // Frame 4 — Rehearsal (warmth lift)
  () => (
    <>
      <WarmthLift />
      <div style={base}>
        <div style={label}>REHEARSAL</div>
        <h1 style={headline}>
          Rehearsal<br />Rooms
        </h1>
        <p style={body}>
          From £45 / 2 hrs<br />
          Backline · PA · Monitoring
        </p>
      </div>
    </>
  ),

  // Frame 5 — Ecosystem
  () => (
    <div style={base}>
      <div style={label}>THE CRS ECOSYSTEM</div>
      <h1 style={{ ...headline, fontSize: 'clamp(1.8rem, 3.4vw, 3rem)' }}>
        Creative infrastructure<br />for Oxford musicians.
      </h1>
    </div>
  ),

  // Frame 6 — QR
  () => (
    <div style={base}>
      <div style={label}>BOOK</div>
      <h1 style={headline}>
        crsoxford.com
      </h1>
      <QRCode />
    </div>
  ),
]

const BASE_DURATIONS = [13000, 13000, 15000, 14000, 14000, 14000]

// Build frame sequence: every 3rd loop inserts Truck Records between Frame 2 and 3
function buildSequence(loopCount: number): { frames: React.FC[], durations: number[] } {
  if (loopCount % 3 === 2) {
    // Insert Truck frame between index 1 and 2
    const frames = [
      BASE_FRAMES[0],
      BASE_FRAMES[1],
      TruckFrame,
      BASE_FRAMES[2],
      BASE_FRAMES[3],
      BASE_FRAMES[4],
      BASE_FRAMES[5],
    ]
    const durations = [
      BASE_DURATIONS[0],
      BASE_DURATIONS[1],
      10000,
      BASE_DURATIONS[2],
      BASE_DURATIONS[3],
      BASE_DURATIONS[4],
      BASE_DURATIONS[5],
    ]
    return { frames, durations }
  }
  return { frames: BASE_FRAMES, durations: BASE_DURATIONS }
}

export default function MostroMode() {
  const [frame, setFrame] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const loopCountRef = useRef(0)
  const [sequence, setSequence] = useState(() => buildSequence(0))

  useEffect(() => {
    const advance = () => {
      setTransitioning(true)
      setTimeout(() => {
        setFrame(f => {
          const nextFrame = f + 1
          if (nextFrame >= sequence.frames.length) {
            loopCountRef.current++
            setSequence(buildSequence(loopCountRef.current))
            return 0
          }
          return nextFrame
        })
        setTransitioning(false)
      }, 450)
    }
    const id = setTimeout(advance, sequence.durations[frame] ?? 13000)
    return () => clearTimeout(id)
  }, [frame, sequence])

  const Frame = sequence.frames[frame] ?? BASE_FRAMES[0]

  return (
    <>
      <MetalTexture />
      <Frame />
      <Transition visible={transitioning} />
    </>
  )
}
