import { useEffect, useState, useRef } from 'react'
import CRSShell, { CRSBadge, DepthLayer } from './CRSShell'
import { C, T } from './brand'

// ─── Civic Greeting Edit — 8s Micro-Interjection ─────────────────────────────
// 6 rotating variants · massive negative space · dusk-aware · CRS palette only
// Inject every 2–3 loops daytime, every 4 loops evening
// Every 7th injection: timeless "Oxford. / Keep making things."

interface CivicGreetingProps {
  loop?: number
  onDone?: () => void
  standalone?: boolean
}

const VARIANTS: Array<{
  id: string
  line1: string
  line2: string
  sub?: string
  duskOnly?: boolean
  titleColor: string
}> = [
  {
    id: 'cowley-road',
    line1: 'Cowley Road.',
    line2: 'Still making things.',
    titleColor: C.brass,
  },
  {
    id: 'oxford-music',
    line1: 'Oxford music.',
    line2: 'Alive and well.',
    sub: 'CRS · 118 Cowley Road',
    titleColor: C.greenMid,
  },
  {
    id: 'grassroots',
    line1: 'Grassroots.',
    line2: 'Not a metaphor.',
    titleColor: C.brass,
  },
  {
    id: 'record-rehearse',
    line1: 'Record here.',
    line2: 'Rehearse here.',
    sub: 'crsoxford.com',
    titleColor: C.greenMid,
  },
  {
    id: 'serious-sound',
    line1: 'Serious sound.',
    line2: 'Open doors.',
    sub: 'Est. 1999',
    titleColor: C.brass,
  },
  {
    id: 'golden-hour',
    line1: 'Golden hour',
    line2: 'on Cowley Road.',
    sub: 'Come in.',
    titleColor: C.brass,
    duskOnly: true,
  },
]

const TIMELESS: typeof VARIANTS[0] = {
  id: 'timeless',
  line1: 'Oxford.',
  line2: 'Keep making things.',
  titleColor: C.brass,
}

function isDusk(): boolean {
  const h = new Date().getHours()
  const m = new Date().getMinutes()
  const t = h * 60 + m
  return t >= 18 * 60 && t < 22 * 60 + 30
}

export default function CivicGreeting({ loop = 0, onDone, standalone = false }: CivicGreetingProps) {
  const [visible, setVisible] = useState(false)
  const dusk = isDusk()

  // Build available variant pool
  const pool = VARIANTS.filter(v => !v.duskOnly || dusk)

  // Standalone cycling state
  const indexRef = useRef(0)
  const [variantIndex, setVariantIndex] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    // Fade in
    const inId = setTimeout(() => setVisible(true), 100)
    // Fade out at 7.4s
    const outId = setTimeout(() => setVisible(false), 7400)
    // Signal done at 8s
    const doneId = setTimeout(() => {
      if (standalone) {
        const next = (indexRef.current + 1) % pool.length
        indexRef.current = next
        setVariantIndex(next)
        setCycleKey(k => k + 1)
        setVisible(false)
      } else {
        onDone?.()
      }
    }, 8000)
    return () => { clearTimeout(inId); clearTimeout(outId); clearTimeout(doneId) }
  }, [cycleKey])

  // Pick variant
  let variant: typeof VARIANTS[0]
  if (!standalone) {
    variant = loop % 7 === 6 ? TIMELESS : pool[loop % pool.length]
  } else {
    variant = pool[variantIndex] ?? pool[0]
  }

  return (
    <CRSShell>
      {/* Deep background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #0E0E0E 0%, #111a12 50%, #0E0E0E 100%)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(14,14,14,0.9) 0%, rgba(46,71,59,0.15) 50%, rgba(14,14,14,0.95) 100%)',
        zIndex: 2,
      }} />
      <DepthLayer />

      {/* Content — massive negative space */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out',
      }}>
        <div>
          <h1 style={{
            fontFamily: T.display,
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            lineHeight: 1.1,
            color: variant.titleColor,
            margin: 0,
            textShadow: `0 0 40px rgba(194,168,90,0.15)`,
          }}>
            {variant.line1}
          </h1>
          <h1 style={{
            fontFamily: T.display,
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            lineHeight: 1.1,
            color: variant.titleColor,
            margin: 0,
            textShadow: `0 0 40px rgba(194,168,90,0.15)`,
          }}>
            {variant.line2}
          </h1>
          {variant.sub && (
            <p style={{
              fontFamily: T.mono,
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              color: C.textDim,
              marginTop: '1.5rem',
              textTransform: 'uppercase',
            }}>
              {variant.sub}
            </p>
          )}
        </div>
        <CRSBadge />
      </div>
    </CRSShell>
  )
}
