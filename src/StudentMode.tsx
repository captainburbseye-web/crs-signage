import { useEffect, useState, useRef } from 'react'
import CRSShell, { CRSBadge, DepthLayer, LEDIndicator } from './CRSShell'
import { C, frameTitleStyle, frameSubtitleStyle, frameBodyStyle, priceBlockStyle, priceAmountStyle, priceLabelStyle, Shadow } from './brand'

// ─── Student Mode — Wednesday & Friday Evenings ───────────────────────────────
// 7 frames · green structural accents · affordable messaging · 2s slow fades
// NO teal, NO orange, NO scan bars — CRS palette only

const FRAMES: Array<{
  id: string
  duration: number
  titleColor: string
  title: string
  subtitle: string
  body: string
  showPricing?: boolean
  pricingKey?: string
}> = [
  {
    id: 'student-open',
    duration: 10000,
    titleColor: C.brass,
    title: 'STUDENT\nNIGHT',
    subtitle: 'COWLEY ROAD STUDIOS',
    body: 'Subsidised rates · Open doors\n118 Cowley Road, Oxford',
  },
  {
    id: 'student-recording',
    duration: 10000,
    titleColor: C.brass,
    title: 'RECORDING\nSTUDIO',
    subtitle: 'Subsidised student sessions',
    body: 'Engineer-led · Affordable rates\nBook in advance or walk in',
    showPricing: true,
    pricingKey: 'recording',
  },
  {
    id: 'student-rehearsal',
    duration: 10000,
    titleColor: C.greenMid,
    title: 'REHEARSAL\nROOMS',
    subtitle: 'Student rates available',
    body: 'Full backline · Clear signal paths\nWalk-in welcome tonight',
    showPricing: true,
    pricingKey: 'rehearsal',
  },
  {
    id: 'student-identity',
    duration: 10000,
    titleColor: C.greenMid,
    title: 'SERIOUS SOUND.\nOPEN DOORS.',
    subtitle: 'Built for Oxford musicians',
    body: 'Student bands · Session players\nEngineers · Independent artists',
  },
  {
    id: 'student-community',
    duration: 10000,
    titleColor: C.greenMid,
    title: 'GRASSROOTS\nOXFORD',
    subtitle: 'Community creative infrastructure',
    body: 'Structured. Independent. Sustainable.\nBuilt to support serious music.',
  },
  {
    id: 'student-control',
    duration: 10000,
    titleColor: C.brass,
    title: 'CONTROL ROOM\nHIRE',
    subtitle: 'Professional monitoring · Dry hire',
    body: 'No engineer required\nIdeal for mixing & mastering',
    showPricing: true,
    pricingKey: 'control-room',
  },
  {
    id: 'student-book',
    duration: 10000,
    titleColor: C.brass,
    title: 'BOOK\nNOW',
    subtitle: 'crsoxford.com',
    body: '118 Cowley Road · Oxford · OX4 1JE\nStudent rates — ask at the desk',
  },
]

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
  'control-room': [
    { amount: '£20', label: 'per hour' },
  ],
}

export default function StudentMode() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const advance = () => {
      setVisible(false)
      timerRef.current = setTimeout(() => {
        setCurrent(c => (c + 1) % FRAMES.length)
        setVisible(true)
      }, 2000)
    }
    timerRef.current = setTimeout(advance, FRAMES[current].duration)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current])

  const frame = FRAMES[current]
  const pricing = frame.pricingKey ? PRICING[frame.pricingKey] : undefined

  return (
    <CRSShell totalFrames={FRAMES.length} currentFrame={current}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #0E0E0E 0%, #1a2a1a 50%, #0E0E0E 100%)',
        transition: 'background 2s ease-in-out',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(14,14,14,0.85) 0%, rgba(46,71,59,0.35) 50%, rgba(14,14,14,0.9) 100%)',
        zIndex: 2,
      }} />
      <DepthLayer />

      {/* Green structural edge line — left side */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 3,
        background: `linear-gradient(180deg, transparent 0%, ${C.greenMid} 20%, ${C.greenMid} 80%, transparent 100%)`,
        opacity: 0.7,
        zIndex: 30,
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, min(4vw, 5vh), 64px)',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 2s ease-in-out',
      }}>
        <div style={{ maxWidth: 900 }}>
          <h1 style={{ ...frameTitleStyle, color: frame.titleColor, whiteSpace: 'pre-line' }}>
            {frame.title}
          </h1>
          {frame.subtitle && (
            <h2 style={frameSubtitleStyle}>{frame.subtitle}</h2>
          )}
          {frame.body && (
            <p style={frameBodyStyle}>{frame.body}</p>
          )}
          {frame.showPricing && pricing && (
            <div style={priceBlockStyle}>
              {pricing.map((p, i) => (
                <div key={i} style={{
                    background: C.metalMid,
                    backgroundImage: C.powderBg,
                    border: `1px solid ${C.border}`,
                    boxShadow: Shadow.insetMeter,
                    borderRadius: 3,
                    padding: 'clamp(10px,1.5vw,18px) clamp(14px,2vw,24px)',
                    minWidth: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    position: 'relative',
                  }}>
                    <LEDIndicator color={C.ledAmber} size={6} style={{ position:'absolute', top:6, right:6, animation:'ledPricePulse 1.8s ease-in-out infinite' }} />
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
