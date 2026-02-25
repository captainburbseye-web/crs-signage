import React, { useEffect, useState } from 'react'

const C = {
  bg: '#000000',
  text: '#E8E8E8',
  amber: '#D4A017',
  teal: '#00BCD4',
  green: '#3A5C3A',
}

const fullscreen: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: C.bg,
  overflow: 'hidden',
  position: 'relative',
}

const bigText: React.CSSProperties = {
  fontFamily: "'Oswald', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(4rem, 10vw, 9rem)',
  lineHeight: 1.0,
  letterSpacing: '0.04em',
  color: C.text,
  textAlign: 'center',
  margin: 0,
}

const label: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 400,
  fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  textAlign: 'center',
}

// Ghost VU bars (Frame 3)
function GhostVU() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '15%',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '4px',
      alignItems: 'flex-end',
      height: '40px',
      opacity: 0.05,
    }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          width: '8px',
          height: `${Math.random() * 40 + 5}px`,
          background: C.amber,
          borderRadius: '1px 1px 0 0',
        }} />
      ))}
    </div>
  )
}

// Teal left edge ignite
function TealEdge({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '3px',
      height: '100vh',
      background: C.teal,
      opacity: visible ? 0.9 : 0,
      transition: visible ? 'opacity 0.15s ease' : 'none',
      zIndex: 10,
    }} />
  )
}

// Teal scan inward 20%
function TealScan({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: visible ? '20%' : '0',
      height: '100vh',
      background: `linear-gradient(to right, ${C.teal}22, transparent)`,
      transition: visible ? 'width 0.6s ease' : 'none',
      zIndex: 5,
      pointerEvents: 'none',
    }} />
  )
}

// Amber underline sweep
function AmberUnderline({ visible }: { visible: boolean }) {
  return (
    <div style={{
      height: '3px',
      background: C.amber,
      width: visible ? '100%' : '0',
      transition: visible ? 'width 0.4s ease' : 'none',
      marginTop: '0.5rem',
    }} />
  )
}

// QR with teal glow pulse
function QRPulse() {
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setPulse(true), 100)
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{
      width: '120px',
      height: '120px',
      border: `2px solid ${C.teal}`,
      boxShadow: pulse ? `0 0 30px ${C.teal}66, 0 0 60px ${C.teal}33` : 'none',
      transition: 'box-shadow 0.4s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1.5rem',
    }}>
      <span style={{ ...label, color: C.teal, fontSize: '0.6rem', lineHeight: 1.5 }}>
        QR<br />crsoxford.com
      </span>
    </div>
  )
}

// ─── Snap-cut frame sequence ──────────────────────────────────────────────────
// Timing: 0.0s black → 0.2s frame1 → 1.0s frame2 → 1.6s frame3 → 2.4s frame4 → 3.0s black → loop
const SNAP_TIMES = [0, 200, 1000, 1600, 2400, 3000] // ms
const LOOP_DURATION = 3200 // ms

export default function MicroLoop() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = []
    const schedule = () => {
      // step 0 = black, 1 = frame1, 2 = frame2, 3 = frame3, 4 = frame4, 5 = black
      for (let i = 1; i < SNAP_TIMES.length; i++) {
        timeouts.push(setTimeout(() => setStep(i), SNAP_TIMES[i]))
      }
      // restart loop
      timeouts.push(setTimeout(() => {
        setStep(0)
        timeouts = []
        schedule()
      }, LOOP_DURATION))
    }
    schedule()
    return () => timeouts.forEach(clearTimeout)
  }, [])

  // step 0 or 5: pure black
  if (step === 0 || step === 5) {
    return <div style={{ ...fullscreen, background: '#000000' }} />
  }

  // step 1: GOT A BAND? — teal edge + scan
  if (step === 1) {
    return (
      <div style={fullscreen}>
        <TealEdge visible={true} />
        <TealScan visible={true} />
        <p style={{ ...bigText, color: C.teal, opacity: 0.9 }}>GOT A BAND?</p>
      </div>
    )
  }

  // step 2: REHEARSE HERE. — mustard underline
  if (step === 2) {
    return (
      <div style={fullscreen}>
        <div style={{ textAlign: 'center' }}>
          <p style={bigText}>REHEARSE HERE.</p>
          <AmberUnderline visible={true} />
        </div>
      </div>
    )
  }

  // step 3: RECORD HERE. — ghost VU bars
  if (step === 3) {
    return (
      <div style={fullscreen}>
        <GhostVU />
        <p style={bigText}>RECORD HERE.</p>
      </div>
    )
  }

  // step 4: SCAN → — QR with teal glow
  if (step === 4) {
    return (
      <div style={fullscreen}>
        <p style={{ ...bigText, fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>SCAN →</p>
        <QRPulse />
      </div>
    )
  }

  return <div style={{ ...fullscreen, background: '#000000' }} />
}
