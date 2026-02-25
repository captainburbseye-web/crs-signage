import { useEffect, useState, useRef } from 'react'
import CRSShell, { CRSBadge, DepthLayer } from './CRSShell'
import { C, T, frameTitleStyle, frameSubtitleStyle, frameBodyStyle, priceBlockStyle, priceItemStyle, priceAmountStyle, priceLabelStyle, vuMeterStyle, vuBarStyle, qrContainerStyle, qrBoxStyle } from './brand'

// ─── Signal Path — Main Reel ──────────────────────────────────────────────────
// 8 frames · 83s loop · CRS brand palette only · no tech gimmicks

const FRAMES: Array<{
  id: string
  duration: number
  bg: string
  overlay: 'cool' | 'warm'
  titleColor: string
  title: string
  subtitle: string
  body: string
  showVU?: boolean
  showPricing?: boolean
  showQR?: boolean
  showInfra?: boolean
}> = [
  {
    id: 'establishment',
    duration: 12000,
    bg: 'linear-gradient(160deg, #0E0E0E 0%, #1a2a1f 50%, #0E0E0E 100%)',
    overlay: 'cool',
    titleColor: C.brass,
    title: 'COWLEY ROAD\nSTUDIOS',
    subtitle: 'OXFORD · EST. 1999',
    body: 'Serious sound. Open doors.\n◆ Continuing the Soundworks Oxford legacy',
  },
  {
    id: 'recording',
    duration: 11000,
    bg: 'linear-gradient(160deg, #0E0E0E 0%, #1c2a1a 60%, #0E0E0E 100%)',
    overlay: 'cool',
    titleColor: C.brass,
    title: 'PROFESSIONAL\nRECORDING',
    subtitle: 'Engineer-led sessions · Full-band tracking',
    body: 'Mixing & production · Mastering',
    showVU: true,
    showPricing: true,
  },
  {
    id: 'rehearsal',
    duration: 10000,
    bg: 'linear-gradient(160deg, #0E0E0E 0%, #1a2a1a 60%, #0E0E0E 100%)',
    overlay: 'cool',
    titleColor: C.greenMid,
    title: 'REHEARSAL\nROOMS',
    subtitle: 'Full backline · Clear signal paths',
    body: 'Book by the hour · Walk-in welcome',
    showPricing: true,
  },
  {
    id: 'workshop-cafe',
    duration: 12000,
    bg: 'linear-gradient(160deg, #0E0E0E 0%, #2a2010 60%, #0E0E0E 100%)',
    overlay: 'warm',
    titleColor: C.brass,
    title: 'WORKSHOP\nCAFÉ',
    subtitle: 'Specialty coffee · Instrument repairs',
    body: 'Coworking · Events · Community\n118 Cowley Road, Oxford',
  },
  {
    id: 'control-room',
    duration: 10000,
    bg: 'linear-gradient(160deg, #0E0E0E 0%, #1a1f2a 60%, #0E0E0E 100%)',
    overlay: 'cool',
    titleColor: C.brass,
    title: 'CONTROL ROOM\nHIRE',
    subtitle: 'Professional monitoring environment',
    body: 'Dry hire · No engineer required\nIdeal for mixing & mastering',
    showPricing: true,
  },
  {
    id: 'community',
    duration: 10000,
    bg: 'linear-gradient(160deg, #0E0E0E 0%, #1c2a1a 60%, #0E0E0E 100%)',
    overlay: 'cool',
    titleColor: C.greenMid,
    title: 'SERIOUS SOUND.\nOPEN DOORS.',
    subtitle: 'Student bands · Session players · Engineers',
    body: 'Local artists · Community groups\nSubsidised rates available',
  },
  {
    id: 'book',
    duration: 10000,
    bg: 'linear-gradient(160deg, #0E0E0E 0%, #1a2a1f 60%, #0E0E0E 100%)',
    overlay: 'cool',
    titleColor: C.brass,
    title: 'BOOK\nNOW',
    subtitle: 'Scan to view rates & availability',
    body: '',
    showQR: true,
  },
  {
    id: 'infrastructure',
    duration: 8000,
    bg: 'linear-gradient(160deg, #0E0E0E 0%, #111a12 50%, #0E0E0E 100%)',
    overlay: 'cool',
    titleColor: C.greenMid,
    title: '',
    subtitle: '',
    body: '',
    showInfra: true,
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

// ─── VU Meter ─────────────────────────────────────────────────────────────────
function VUMeter() {
  const [heights, setHeights] = useState([32, 28, 40, 24, 36])
  const rafRef = useRef<number>(0)
  const lastRef = useRef<number>(0)

  useEffect(() => {
    const tick = (t: number) => {
      if (t - lastRef.current > 120) {
        lastRef.current = t
        setHeights(prev => prev.map(h => {
          const delta = (Math.random() - 0.5) * 18
          return Math.max(8, Math.min(60, h + delta))
        }))
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div style={vuMeterStyle} role="img" aria-label="Audio level meter">
      {heights.map((h, i) => (
        <div key={i} style={{ ...vuBarStyle, height: h }} />
      ))}
    </div>
  )
}

// ─── QR Code (static) ─────────────────────────────────────────────────────────
function QRCode() {
  return (
    <div style={qrContainerStyle}>
      <div style={qrBoxStyle}>
        <div style={{ textAlign: 'center', color: '#000', fontSize: '0.55rem', fontFamily: T.mono, padding: '0.5rem' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem', letterSpacing: '-0.05em' }}>
            ▪▫▪▫▪<br/>▫▪▫▪▫<br/>▪▫▪▫▪
          </div>
          cowleyroadstudios.com/book
        </div>
      </div>
      <p style={{ fontFamily: T.mono, fontSize: '0.75rem', color: C.textDim, letterSpacing: '0.15em' }}>
        ↑ Scan to book
      </p>
      <p style={{ fontFamily: T.mono, fontSize: '0.7rem', color: C.textFaint, letterSpacing: '0.1em' }}>
        crsoxford.com
      </p>
    </div>
  )
}

// ─── Infrastructure Frame ─────────────────────────────────────────────────────
function InfraFrame() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20,
    }}>
      <div style={{
        fontFamily: T.display,
        fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
        fontWeight: 400,
        letterSpacing: '0.2em',
        color: 'rgba(79,121,66,0.5)',
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: 1.4,
        animation: 'ambientDrift 120s linear infinite',
      }}>
        OXFORD GRASSROOTS<br />CREATIVE INFRASTRUCTURE
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SignageApp() {
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

    const frame = FRAMES[current]
    timerRef.current = setTimeout(advance, frame.duration)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current])

  const frame = FRAMES[current]
  const pricing = PRICING[frame.id]

  const overlayBg = frame.overlay === 'warm'
    ? 'linear-gradient(135deg, rgba(14,14,14,0.75) 0%, rgba(194,168,90,0.25) 50%, rgba(14,14,14,0.85) 100%)'
    : 'linear-gradient(135deg, rgba(14,14,14,0.85) 0%, rgba(46,71,59,0.3) 50%, rgba(14,14,14,0.9) 100%)'

  return (
    <CRSShell totalFrames={FRAMES.length} currentFrame={current}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: frame.bg,
        transition: 'background 2s ease-in-out',
        zIndex: 0,
      }} />

      {/* Frame overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: overlayBg,
        transition: 'background 2s ease-in-out',
        zIndex: 2,
      }} />

      <DepthLayer />

      {/* Frame content */}
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
        {frame.showInfra ? (
          <InfraFrame />
        ) : (
          <div style={{ maxWidth: 900 }}>
            {frame.title && (
              <h1 style={{ ...frameTitleStyle, color: frame.titleColor, whiteSpace: 'pre-line' }}>
                {frame.title}
              </h1>
            )}
            {frame.subtitle && (
              <h2 style={frameSubtitleStyle}>{frame.subtitle}</h2>
            )}
            {frame.body && (
              <p style={frameBodyStyle}>{frame.body}</p>
            )}
            {frame.showPricing && pricing && (
              <div style={priceBlockStyle}>
                {pricing.map((p, i) => (
                  <div key={i} style={priceItemStyle}>
                    <span style={priceAmountStyle}>{p.amount}</span>
                    <span style={priceLabelStyle}>{p.label}</span>
                  </div>
                ))}
              </div>
            )}
            {frame.showQR && <QRCode />}
          </div>
        )}

        {frame.showVU && <VUMeter />}
        <CRSBadge />
      </div>
    </CRSShell>
  )
}
