import { useEffect, useState, useRef } from 'react'
import CRSShell, { CRSBadge, DepthLayer } from './CRSShell'
import { C, frameTitleStyle, frameSubtitleStyle, frameBodyStyle, priceBlockStyle, priceItemStyle, priceAmountStyle, priceLabelStyle } from './brand'

// ─── Mostro Mode — Weekend / Afternoon Reel ───────────────────────────────────
// 6 frames · ultra-restrained · left-aligned · vinyl underline sweep
// Truck Records frame every 3rd loop · CRS palette only

const FRAMES: Array<{
  id: string
  duration: number
  titleColor: string
  title: string
  subtitle: string
  body: string
  showPricing?: boolean
  pricingKey?: string
  showVinyl?: boolean
  isTruck?: boolean
}> = [
  {
    id: 'mostro-identity',
    duration: 11000,
    titleColor: C.brass,
    title: 'COWLEY ROAD\nSTUDIOS',
    subtitle: 'OXFORD · EST. 1999',
    body: 'Serious sound. Open doors.',
    showVinyl: true,
  },
  {
    id: 'mostro-recording',
    duration: 10000,
    titleColor: C.brass,
    title: 'RECORDING\nSTUDIO',
    subtitle: 'Analogue signal path · Precision monitoring',
    body: 'Tracking · Mixing · Mastering',
    showPricing: true,
    pricingKey: 'recording',
  },
  {
    id: 'mostro-rehearsal',
    duration: 10000,
    titleColor: C.greenMid,
    title: 'REHEARSAL\nROOMS',
    subtitle: 'Full backline · Clear signal paths',
    body: 'Book by the hour · Walk-in welcome',
    showPricing: true,
    pricingKey: 'rehearsal',
  },
  {
    id: 'mostro-community',
    duration: 10000,
    titleColor: C.greenMid,
    title: 'GRASSROOTS\nOXFORD',
    subtitle: 'Independent music infrastructure',
    body: 'Local circuits · Independent projects\nStructured. Independent. Sustainable.',
  },
  {
    id: 'mostro-cafe',
    duration: 10000,
    titleColor: C.brass,
    title: 'WORKSHOP\nCAFÉ',
    subtitle: 'A front-of-house creative space',
    body: 'Coffee · Events · Coworking\n118 Cowley Road, Oxford',
  },
  {
    id: 'mostro-book',
    duration: 10000,
    titleColor: C.brass,
    title: 'BOOK\nNOW',
    subtitle: 'crsoxford.com',
    body: '118 Cowley Road · Oxford · OX4 1JE',
  },
]

const TRUCK_FRAME: typeof FRAMES[0] = {
  id: 'truck',
  duration: 10000,
  titleColor: C.greenMid,
  title: 'TRUCK\nRECORDS',
  subtitle: 'Oxford independent music · Since 1998',
  body: 'Supporting grassroots music\nalongside Cowley Road Studios.',
  isTruck: true,
}

const PRICING: Record<string, Array<{ amount: string; label: string }>> = {
  recording: [
    { amount: '£35', label: 'per hour' },
    { amount: '£120', label: 'half day' },
    { amount: '£220', label: 'full day' },
  ],
  rehearsal: [
    { amount: '£45', label: '2 hours' },
    { amount: '£60', label: '3 hours' },
    { amount: '£65', label: '4 hours' },
  ],
}

// ─── Vinyl underline sweep ────────────────────────────────────────────────────
function VinylUnderline() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const id = setTimeout(() => setWidth(60), 300)
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(90deg, ${C.brass} 0%, rgba(194,168,90,0.3) 100%)`,
      width: `${width}%`,
      transition: 'width 3.5s ease',
      marginTop: '2rem',
      opacity: 0.8,
    }} />
  )
}

export default function MostroMode() {
  const [loopCount, setLoopCount] = useState(0)
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Inject Truck Records every 3rd loop
  const frameSequence = loopCount > 0 && loopCount % 3 === 0
    ? [...FRAMES, TRUCK_FRAME]
    : FRAMES

  useEffect(() => {
    const advance = () => {
      setVisible(false)
      timerRef.current = setTimeout(() => {
        setCurrent(c => {
          const next = c + 1
          if (next >= frameSequence.length) {
            setLoopCount(l => l + 1)
            return 0
          }
          return next
        })
        setVisible(true)
      }, 2000)
    }
    timerRef.current = setTimeout(advance, frameSequence[current]?.duration ?? 10000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, frameSequence])

  const frame = frameSequence[current] ?? FRAMES[0]
  const pricing = frame.pricingKey ? PRICING[frame.pricingKey] : undefined

  return (
    <CRSShell totalFrames={frameSequence.length} currentFrame={current}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: frame.isTruck
          ? 'linear-gradient(160deg, #0E0E0E 0%, #1a2a1a 50%, #0E0E0E 100%)'
          : 'linear-gradient(160deg, #0E0E0E 0%, #1c1a10 50%, #0E0E0E 100%)',
        transition: 'background 2s ease-in-out',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: frame.isTruck
          ? 'linear-gradient(135deg, rgba(14,14,14,0.85) 0%, rgba(46,71,59,0.3) 50%, rgba(14,14,14,0.9) 100%)'
          : 'linear-gradient(135deg, rgba(14,14,14,0.85) 0%, rgba(194,168,90,0.12) 50%, rgba(14,14,14,0.9) 100%)',
        zIndex: 2,
      }} />
      <DepthLayer />

      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '4rem 4rem 5rem 6rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 2s ease-in-out',
      }}>
        <div style={{ maxWidth: 800 }}>
          <h1 style={{ ...frameTitleStyle, color: frame.titleColor, whiteSpace: 'pre-line', textAlign: 'left' }}>
            {frame.title}
          </h1>
          {frame.subtitle && (
            <h2 style={{ ...frameSubtitleStyle, textAlign: 'left' }}>{frame.subtitle}</h2>
          )}
          {frame.body && (
            <p style={{ ...frameBodyStyle, textAlign: 'left' }}>{frame.body}</p>
          )}
          {frame.showVinyl && <VinylUnderline />}
          {frame.showPricing && pricing && (
            <div style={{ ...priceBlockStyle, justifyContent: 'flex-start' }}>
              {pricing.map((p, i) => (
                <div key={i} style={priceItemStyle}>
                  <span style={priceAmountStyle}>{p.amount}</span>
                  <span style={priceLabelStyle}>{p.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <CRSBadge />
      </div>
    </CRSShell>
  )
}
