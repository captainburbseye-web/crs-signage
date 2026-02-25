import React, { useEffect, useState, useRef } from 'react'

const C = {
  bg: '#0E0E0E',
  text: '#E8E8E8',
  green: '#3A5C3A',
  amber: '#D4A017',
  teal: '#00BCD4',
  orange: '#FF6B35',
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

const headline: React.CSSProperties = {
  fontFamily: "'Oswald', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(2.6rem, 5.2vw, 5rem)',
  lineHeight: 1.08,
  letterSpacing: '0.02em',
  color: C.text,
  margin: 0,
}

const label: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 400,
  fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
  letterSpacing: '0.2em',
  color: C.teal,
  textTransform: 'uppercase',
  marginBottom: '1.4rem',
}

const body: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 300,
  fontSize: 'clamp(0.88rem, 1.35vw, 1.1rem)',
  lineHeight: 1.75,
  color: C.dim,
  marginTop: '1.5rem',
  maxWidth: '62%',
}

// Thin teal vertical line at left edge (Frame 1)
function TealEdgeLine() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '2px',
      height: visible ? '100vh' : '0',
      background: C.teal,
      opacity: 0.7,
      transition: 'height 0.8s ease',
      zIndex: 10,
    }} />
  )
}

// Global light scan bar: 2px teal, 35% opacity, drifts left to right every 15s
function ScanBar() {
  const [pos, setPos] = useState(-2)
  useEffect(() => {
    const run = () => {
      setPos(-2)
      setTimeout(() => setPos(102), 100)
    }
    run()
    const id = setInterval(run, 15000)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: `${pos}%`,
      width: '2px',
      height: '100vh',
      background: C.teal,
      opacity: 0.35,
      transition: pos > 0 ? 'left 8s linear' : 'none',
      zIndex: 5,
      pointerEvents: 'none',
    }} />
  )
}

// Staggered line entrance
function StaggerLines({ lines, delay = 0.4 }: { lines: string[], delay?: number }) {
  const [visible, setVisible] = useState<boolean[]>(lines.map(() => false))
  useEffect(() => {
    lines.forEach((_, i) => {
      setTimeout(() => {
        setVisible(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, i * delay * 1000)
    })
  }, [])
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} style={{
          opacity: visible[i] ? 1 : 0,
          transform: visible[i] ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          {line}
        </div>
      ))}
    </>
  )
}

// Breathing text (Frame 5)
function BreathingText({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    let up = true
    const id = setInterval(() => {
      setScale(up ? 1.015 : 1)
      up = !up
    }, 2000)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{ transform: `scale(${scale})`, transition: 'transform 2s ease-in-out', transformOrigin: 'left center' }}>
      {children}
    </div>
  )
}

// Horizontal teal sweep (Frame 7)
function TealSweep() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const id = setTimeout(() => setWidth(100), 100)
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{
      height: '2px',
      background: C.teal,
      width: `${width}%`,
      transition: 'width 1.2s ease',
      marginBottom: '2rem',
      opacity: 0.6,
    }} />
  )
}

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
      width: '130px',
      height: '130px',
      border: `2px solid ${pulse ? C.teal : C.green}`,
      boxShadow: pulse ? `0 0 20px ${C.teal}44` : 'none',
      transition: 'all 0.4s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '2rem',
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
      transition: 'opacity 0.35s ease',
      zIndex: 100,
      pointerEvents: 'none',
    }} />
  )
}

const FRAMES: React.FC[] = [
  // Frame 1 — Teal edge, identity
  () => (
    <div style={base}>
      <TealEdgeLine />
      <div style={label}>CRS OXFORD — STUDENT EVENINGS</div>
      <h1 style={headline}>
        Cowley Road<br />Studios
      </h1>
      <p style={body}>
        Affordable rehearsal.{' '}
        <span style={{ color: C.orange, textDecoration: 'underline', textDecorationColor: C.orange }}>Oxford-based.</span>
      </p>
    </div>
  ),

  // Frame 2 — Addresses the assumption
  () => (
    <div style={base}>
      <div style={label}>FOR STUDENTS</div>
      <h1 style={headline}>
        Studios don't<br />have to cost<br />a fortune.
      </h1>
    </div>
  ),

  // Frame 3 — Rehearsal pricing
  () => (
    <div style={base}>
      <div style={label}>REHEARSAL ROOMS</div>
      <h1 style={headline}>
        Rehearse here.
      </h1>
      <p style={body}>
        Fully equipped rooms<br />
        <span style={{ color: C.amber }}>From £45 / 2 hrs</span><br />
        Backline · PA · Monitoring
      </p>
    </div>
  ),

  // Frame 4 — Recording
  () => (
    <div style={base}>
      <div style={label}>RECORDING STUDIO</div>
      <h1 style={headline}>
        Record here.
      </h1>
      <p style={body}>
        Tracking · Mixing · Mastering<br />
        Podcast · Analogue path
      </p>
    </div>
  ),

  // Frame 5 — Hook: breathing, high contrast
  () => (
    <div style={base}>
      <BreathingText>
        <h1 style={{ ...headline, fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', lineHeight: 1.0 }}>
          Got a band?<br />
          <span style={{ color: C.teal }}>We're ready.</span>
        </h1>
      </BreathingText>
    </div>
  ),

  // Frame 6 — Community
  () => (
    <div style={base}>
      <div style={label}>WORKSHOP CAFÉ</div>
      <h1 style={headline}>
        Coffee.<br />Co-work.<br />Open mic.
      </h1>
    </div>
  ),

  // Frame 7 — Teal sweep + closing line + QR
  () => (
    <div style={base}>
      <TealSweep />
      <h1 style={{ ...headline, fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)' }}>
        Built for serious music.
      </h1>
      <QRCode />
    </div>
  ),
]

const DURATIONS = [9000, 9000, 10000, 9500, 10000, 9000, 9000]

export default function StudentMode() {
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
      <ScanBar />
      <Frame />
      <Transition visible={transitioning} />
    </>
  )
}
