import { useEffect, useState } from 'react'
import { C, T } from './brand'
import CRSShell, { CRSBadge, VideoBg } from './CRSShell'

// ─── Micro Loop — 3.2s Kinetic Interrupt ─────────────────────────────────────
// Hard snap cuts · no easing · no glow · CRS palette only
// Designed to interrupt the main playlist every 45–60s

const CUTS: Array<{
  bg: string
  titleColor: string
  title: string
  sub?: string
}> = [
  {
    bg: C.bg,
    titleColor: C.brass,
    title: 'CRS',
    sub: 'COWLEY ROAD STUDIOS',
  },
  {
    bg: C.green,
    titleColor: C.bg,
    title: 'RECORD',
    sub: '£35 / HR',
  },
  {
    bg: C.bg,
    titleColor: C.greenMid,
    title: 'REHEARSE',
    sub: '£45 / 2HRS',
  },
  {
    bg: C.greenMid,
    titleColor: C.bg,
    title: 'BOOK',
    sub: 'CRSOXFORD.COM',
  },
]

const CUT_DURATION = 800 // ms per cut — 4 cuts × 800ms = 3.2s

export default function MicroLoop() {
  const [cut, setCut] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCut(c => (c + 1) % CUTS.length)
    }, CUT_DURATION)
    return () => clearInterval(id)
  }, [])

  const frame = CUTS[cut]

  return (
    <CRSShell>
      <VideoBg src="/brand/live-services.mp4" opacity={0.12} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: frame.bg,
        zIndex: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, min(2vw, 3vh), 32px)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: T.display,
          fontSize: 'clamp(5rem, 14vw, 12rem)',
          fontWeight: 800,
          letterSpacing: '0.08em',
          lineHeight: 1,
          color: frame.titleColor,
          textTransform: 'uppercase',
          margin: 0,
        }}>
          {frame.title}
        </h1>
        {frame.sub && (
          <p style={{
            fontFamily: T.mono,
            fontSize: 'clamp(0.8rem, 2vw, 1.4rem)',
            letterSpacing: '0.2em',
            color: frame.titleColor === C.bg ? 'rgba(14,14,14,0.7)' : C.textDim,
            marginTop: '0.8rem',
            textTransform: 'uppercase',
          }}>
            {frame.sub}
          </p>
        )}
        <CRSBadge />
      </div>
    </CRSShell>
  )
}
