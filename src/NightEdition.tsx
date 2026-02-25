import { useEffect, useState, useRef } from 'react'
import CRSShell, { CRSBadge, DepthLayer, LEDIndicator, VideoBg } from './CRSShell'
import { C, T, frameTitleStyle, frameSubtitleStyle, frameBodyStyle, priceBlockStyle, priceAmountStyle, priceLabelStyle, Shadow } from './brand'

// ─── Night Edition — Street-facing Evening Reel ───────────────────────────────
// 8 frames · maximum restraint · single brass accent line · 2s slow fades
// No dusk/night mode switching — one clean palette always

const FRAMES: Array<{
  id: string
  duration: number
  titleColor: string
  title: string
  subtitle: string
  body: string
  showPricing?: boolean
  pricingKey?: string
  accentLine?: string
}> = [
  {
    id: 'night-open',
    duration: 11000,
    titleColor: C.brass,
    title: 'OPEN\nTONIGHT',
    subtitle: 'COWLEY ROAD STUDIOS',
    body: 'Recording · Rehearsal · Café\n118 Cowley Road, Oxford',
  },
  {
    id: 'night-recording',
    duration: 10000,
    titleColor: C.brass,
    title: 'EVENING\nSESSIONS',
    subtitle: 'Studio available now',
    body: 'Engineer-led or self-op\nBook same day',
    showPricing: true,
    pricingKey: 'recording',
  },
  {
    id: 'night-rehearsal',
    duration: 10000,
    titleColor: C.greenMid,
    title: 'REHEARSAL\nROOMS',
    subtitle: 'Available tonight',
    body: 'Walk-in welcome · Full backline',
    showPricing: true,
    pricingKey: 'rehearsal',
  },
  {
    id: 'night-cafe',
    duration: 10000,
    titleColor: C.brass,
    title: 'WORKSHOP\nCAFÉ',
    subtitle: 'Open now',
    body: 'Coffee · Events · Community\nDrop in or stay a while.',
    accentLine: 'COWLEY ROAD · OX4',
  },
  {
    id: 'night-identity',
    duration: 10000,
    titleColor: C.greenMid,
    title: 'SERIOUS SOUND.\nOPEN DOORS.',
    subtitle: 'Oxford grassroots creative infrastructure',
    body: 'Est. 1999 · Continuing the Soundworks Oxford legacy',
  },
  {
    id: 'night-community',
    duration: 10000,
    titleColor: C.greenMid,
    title: 'STUDENT\nRATES',
    subtitle: 'Subsidised sessions available',
    body: 'Student bands · Session players\nLocal artists · Community groups',
  },
  {
    id: 'night-control',
    duration: 10000,
    titleColor: C.brass,
    title: 'CONTROL ROOM\nHIRE',
    subtitle: 'Professional monitoring · Dry hire',
    body: 'No engineer required\nIdeal for late-night mixing',
    showPricing: true,
    pricingKey: 'control-room',
  },
  {
    id: 'night-book',
    duration: 10000,
    titleColor: C.brass,
    title: 'BOOK\nNOW',
    subtitle: 'crsoxford.com',
    body: '118 Cowley Road · Oxford · OX4 1JE',
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

export default function NightEdition() {
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
      {/* Deeper night background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #080808 0%, #0f1a10 50%, #080808 100%)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(8,8,8,0.9) 0%, rgba(46,71,59,0.2) 50%, rgba(8,8,8,0.95) 100%)',
        zIndex: 2,
      }} />
      <DepthLayer />
      <VideoBg src="/brand/exclusive-hire.mp4" opacity={0.10} />

      {/* Single brass accent line — top, maximum restraint */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent 0%, ${C.brass} 30%, ${C.brass} 70%, transparent 100%)`,
        opacity: 0.6,
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
        padding: '4rem 4rem 5rem',
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
          {frame.accentLine && (
            <p style={{
              fontFamily: T.mono,
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              color: `rgba(194,168,90,0.5)`,
              marginTop: '2rem',
              textTransform: 'uppercase',
            }}>
              {frame.accentLine}
            </p>
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
