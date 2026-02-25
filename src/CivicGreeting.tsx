import React, { useEffect, useState, useRef } from 'react'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: '#0E0E0E',
  text: '#E8E8E8',
  green: '#3A5C3A',
  amber: '#D4A017',
  dim: 'rgba(232,232,232,0.38)',
}

const fullscreen: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  background: C.bg,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
}

const headline: React.CSSProperties = {
  fontFamily: "'Oswald', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(2.8rem, 5.8vw, 5.5rem)',
  lineHeight: 1.1,
  letterSpacing: '0.02em',
  color: C.text,
  textAlign: 'center',
  margin: 0,
  // Warm amber halo
  textShadow: `0 0 24px rgba(212,160,23,0.22), 0 0 48px rgba(212,160,23,0.08)`,
}

const subline: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 300,
  fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
  lineHeight: 1.6,
  color: C.dim,
  textAlign: 'center',
  marginTop: '0.6rem',
}

// ─── Underline accent ─────────────────────────────────────────────────────────
function AmberUnderline({ text }: { text: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {text}
      <span style={{
        position: 'absolute',
        bottom: '-4px',
        left: 0,
        width: '100%',
        height: '2px',
        background: C.amber,
        opacity: 0.8,
      }} />
    </span>
  )
}

// ─── Fade wrapper — fade in 0.6s, hold 6s, fade out 0.4s ─────────────────────
function FadeCard({ children, onDone }: { children: React.ReactNode, onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')

  useEffect(() => {
    // fade in: 0.6s
    const t1 = setTimeout(() => setPhase('hold'), 600)
    // hold: 6s
    const t2 = setTimeout(() => setPhase('out'), 600 + 6000)
    // fade out: 0.4s, then signal done
    const t3 = setTimeout(onDone, 600 + 6000 + 400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const opacity = phase === 'in' ? 0 : phase === 'hold' ? 1 : 0
  const transition =
    phase === 'in' ? 'opacity 0.6s ease' :
    phase === 'hold' ? 'none' :
    'opacity 0.4s ease'

  return (
    <div style={{ ...fullscreen, opacity, transition }}>
      {children}
    </div>
  )
}

// ─── Is it dusk? (18:00–22:30) ───────────────────────────────────────────────
function isDusk(): boolean {
  const h = new Date().getHours()
  const m = new Date().getMinutes()
  const t = h * 60 + m
  return t >= 18 * 60 && t < 22 * 60 + 30
}

// ─── The 6 variant cards ──────────────────────────────────────────────────────
type Variant = {
  id: number
  duskOnly?: boolean
  render: () => React.ReactNode
}

const VARIANTS: Variant[] = [
  {
    id: 1,
    render: () => (
      <>
        <h1 style={headline}>Spring in Oxford.</h1>
        <p style={subline}>Good time to <AmberUnderline text="make something." /></p>
      </>
    ),
  },
  {
    id: 2,
    render: () => (
      <>
        <h1 style={headline}>Cowley Road.</h1>
        <p style={subline}>Still making noise.</p>
      </>
    ),
  },
  {
    id: 3,
    render: () => (
      <>
        <h1 style={headline}>Oxford.</h1>
        <p style={subline}>We see you.</p>
      </>
    ),
  },
  {
    id: 4,
    render: () => (
      <>
        <h1 style={{ ...headline, fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}>
          To the musicians walking past —
        </h1>
        <p style={{ ...subline, color: C.amber, opacity: 0.85, marginTop: '0.8rem' }}>
          respect.
        </p>
      </>
    ),
  },
  {
    id: 5,
    render: () => (
      <>
        <h1 style={{ ...headline, fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', maxWidth: '72vw' }}>
          If you're reading this,<br />
          you probably care about music.
        </h1>
        <p style={subline}>We do too.</p>
      </>
    ),
  },
  {
    id: 6,
    duskOnly: true,
    render: () => (
      <>
        <h1 style={{ ...headline, fontSize: 'clamp(2rem, 3.8vw, 3.5rem)' }}>
          Golden hour on Cowley Road.
        </h1>
        <p style={subline}>Feels like a good night.</p>
      </>
    ),
  },
]

// 10/10 timeless version — shown as an occasional bonus
const TIMELESS: Variant = {
  id: 0,
  render: () => (
    <>
      <h1 style={headline}>Oxford.</h1>
      <p style={{ ...subline, color: C.amber, opacity: 0.9, marginTop: '0.8rem' }}>
        Keep making things.
      </p>
    </>
  ),
}

// ─── Main component ───────────────────────────────────────────────────────────
// Props: loop — how many times the parent reel has looped (used for injection cadence)
// When used standalone at /civic, it cycles through all variants continuously.
interface CivicGreetingProps {
  loop?: number
  onDone?: () => void
  standalone?: boolean
}

export default function CivicGreeting({ loop = 0, onDone, standalone = false }: CivicGreetingProps) {
  const dusk = isDusk()

  // Build available variant pool
  const pool = VARIANTS.filter(v => !v.duskOnly || dusk)

  // Standalone mode: cycle through all variants in order, looping
  const indexRef = useRef(0)
  const [variantIndex, setVariantIndex] = useState(0)
  const [key, setKey] = useState(0)

  const handleDone = () => {
    if (standalone) {
      const next = (indexRef.current + 1) % pool.length
      indexRef.current = next
      setVariantIndex(next)
      setKey(k => k + 1)
    } else {
      onDone?.()
    }
  }

  // When used as an interrupt: pick variant based on loop count
  // Every 7th loop use the timeless version
  let variant: Variant
  if (!standalone) {
    variant = loop % 7 === 6 ? TIMELESS : pool[loop % pool.length]
  } else {
    variant = pool[variantIndex] ?? pool[0]
  }

  return (
    <FadeCard key={standalone ? key : loop} onDone={handleDone}>
      {variant.render()}
    </FadeCard>
  )
}
