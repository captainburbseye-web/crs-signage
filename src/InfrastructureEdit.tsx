import { useEffect, useState, useRef } from 'react'
import CRSShell, { CRSBadge, DepthLayer, LEDIndicator, VUMeter } from './CRSShell'
import { C, frameTitleStyle, frameSubtitleStyle, frameBodyStyle, priceBlockStyle, priceAmountStyle, priceLabelStyle, Shadow } from './brand'

// ─── Infrastructure Edit — Daytime Reel ───────────────────────────────────────
// 8 frames · warm amber treatment · 40% empty space rule · 2s slow fades

const FRAMES: Array<{
  id: string
  duration: number
  overlay: 'cool' | 'warm'
  titleColor: string
  title: string
  subtitle: string
  body: string
  showVU?: boolean
  showPricing?: boolean
  pricingKey?: string
}> = [
  {
    id: 'open',
    duration: 10000,
    overlay: 'warm',
    titleColor: C.brass,
    title: 'OPEN NOW',
    subtitle: 'COWLEY ROAD & CRICKET ROAD',
    body: 'Recording · Rehearsal · Café\n118 Cowley Road, Oxford',
  },
  {
    id: 'recording-infra',
    duration: 11000,
    overlay: 'cool',
    titleColor: C.brass,
    title: 'PROFESSIONAL\nRECORDING',
    subtitle: 'Acoustically treated · Precision monitoring',
    body: 'Full-band tracking · Solo sessions\nMixing & production',
    showVU: true,
    showPricing: true,
    pricingKey: 'recording',
  },
  {
    id: 'rehearsal-infra',
    duration: 10000,
    overlay: 'cool',
    titleColor: C.greenMid,
    title: 'REHEARSAL\nROOMS',
    subtitle: 'Clear signal paths · Proper backline',
    body: 'Build your set. Then capture it properly.',
    showPricing: true,
    pricingKey: 'rehearsal',
  },
  {
    id: 'cafe-infra',
    duration: 10000,
    overlay: 'warm',
    titleColor: C.brass,
    title: 'WORKSHOP\nCAFÉ',
    subtitle: 'A front-of-house creative space',
    body: 'For talks, events, collaboration\nand coffee between sessions.',
  },
  {
    id: 'live-capture',
    duration: 10000,
    overlay: 'cool',
    titleColor: C.brass,
    title: 'FILMED\nSESSIONS',
    subtitle: 'Live capture · Grassroots showcases',
    body: 'From rehearsal room\nto live audience.',
  },
  {
    id: 'control-infra',
    duration: 10000,
    overlay: 'cool',
    titleColor: C.brass,
    title: 'CONTROL ROOM\nHIRE',
    subtitle: 'Professional monitoring environment',
    body: 'Dry hire · No engineer required\nIdeal for mixing & mastering',
    showPricing: true,
    pricingKey: 'control-room',
  },
  {
    id: 'connected',
    duration: 10000,
    overlay: 'cool',
    titleColor: C.greenMid,
    title: 'CONNECTED\nCREATIVE SYSTEM',
    subtitle: 'Session musicians · Engineers · Student talent',
    body: 'Local circuits · Independent projects\nStructured. Independent. Sustainable.',
  },
  {
    id: 'book-infra',
    duration: 10000,
    overlay: 'warm',
    titleColor: C.brass,
    title: 'BOOK\nREHEARSAL\nOR RECORDING',
    subtitle: 'Explore the space',
    body: 'crsoxford.com',
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

// VUMeter is imported from CRSShell

export default function InfrastructureEdit() {
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

  const overlayBg = frame.overlay === 'warm'
    ? 'linear-gradient(135deg, rgba(14,14,14,0.75) 0%, rgba(194,168,90,0.25) 50%, rgba(14,14,14,0.85) 100%)'
    : 'linear-gradient(135deg, rgba(14,14,14,0.85) 0%, rgba(46,71,59,0.3) 50%, rgba(14,14,14,0.9) 100%)'

  const bgGradient = frame.overlay === 'warm'
    ? 'linear-gradient(160deg, #0E0E0E 0%, #2a2010 60%, #0E0E0E 100%)'
    : 'linear-gradient(160deg, #0E0E0E 0%, #1a2a1a 60%, #0E0E0E 100%)'

  return (
    <CRSShell totalFrames={FRAMES.length} currentFrame={current}>
      <div style={{ position: 'absolute', inset: 0, background: bgGradient, transition: 'background 2s ease-in-out', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: overlayBg, transition: 'background 2s ease-in-out', zIndex: 2 }} />
      <DepthLayer />

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
            <h2 style={{
              ...frameSubtitleStyle,
              color: frame.overlay === 'warm' ? `rgba(194,168,90,0.8)` : undefined,
            }}>
              {frame.subtitle}
            </h2>
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
        {frame.showVU && <VUMeter bars={12} style={{ height: 44, marginTop: 20 }} />}
        <CRSBadge />
      </div>
    </CRSShell>
  )
}
