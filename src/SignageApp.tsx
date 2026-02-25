import { useEffect, useState, useRef } from 'react'
import CRSShell, { CRSBadge, DepthLayer, VUMeter, LEDIndicator, VideoBg } from './CRSShell'
import { C, T, Shadow, frameTitleStyle, frameSubtitleStyle, frameBodyStyle, priceBlockStyle, qrContainerStyle, qrBoxStyle } from './brand'

// ─── Signal Path — Main Reel ──────────────────────────────────────────────────
// 8 frames · Rack UI · inset LCD screens · pulsing LED pricing

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
    bg: 'linear-gradient(160deg, #080808 0%, #1a2a1f 50%, #080808 100%)',
    overlay: 'cool',
    titleColor: C.brass,
    title: 'COWLEY ROAD\nSTUDIOS',
    subtitle: 'OXFORD · EST. 1999',
    body: 'Serious sound. Open doors.\n◆ Continuing the Soundworks Oxford legacy',
  },
  {
    id: 'recording',
    duration: 11000,
    bg: 'linear-gradient(160deg, #080808 0%, #1c2a1a 60%, #080808 100%)',
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
    bg: 'linear-gradient(160deg, #080808 0%, #1a2a1a 60%, #080808 100%)',
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
    bg: 'linear-gradient(160deg, #080808 0%, #2a2010 60%, #080808 100%)',
    overlay: 'warm',
    titleColor: C.brass,
    title: 'WORKSHOP\nCAFÉ',
    subtitle: 'Specialty coffee · Instrument repairs',
    body: 'Coworking · Events · Community\n118 Cowley Road, Oxford',
  },
  {
    id: 'control-room',
    duration: 10000,
    bg: 'linear-gradient(160deg, #080808 0%, #1a1f2a 60%, #080808 100%)',
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
    bg: 'linear-gradient(160deg, #080808 0%, #1c2a1a 60%, #080808 100%)',
    overlay: 'cool',
    titleColor: C.greenMid,
    title: 'SERIOUS SOUND.\nOPEN DOORS.',
    subtitle: 'Student bands · Session players · Engineers',
    body: 'Local artists · Community groups\nSubsidised rates available',
  },
  {
    id: 'book',
    duration: 10000,
    bg: 'linear-gradient(160deg, #080808 0%, #1a2a1f 60%, #080808 100%)',
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
    bg: 'linear-gradient(160deg, #080808 0%, #111a12 50%, #080808 100%)',
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

// ─── LCD Screen Wrapper ───────────────────────────────────────────────────────
// Wraps content in an inset display cut into the metal chassis
function LCDScreen({ children, amber = false }: { children: React.ReactNode; amber?: boolean }) {
  return (
    <div style={{
      background: amber ? C.lcdBg : '#040A04',
      boxShadow: Shadow.insetScreen,
      border: `1px solid ${C.border}`,
      borderRadius: 4,
      padding: 'clamp(24px, 3.5vw, 48px) clamp(28px, 4.5vw, 64px)',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: 860,
      width: '100%',
    }}>
      {/* CRT scan line */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        height: 2,
        background: amber
          ? 'rgba(255,176,0,0.08)'
          : 'rgba(51,255,51,0.06)',
        animation: 'scanLine 8s linear infinite',
        pointerEvents: 'none',
        zIndex: 10,
      }} />
      {/* Screen glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: amber
          ? 'radial-gradient(ellipse at 50% 40%, rgba(255,176,0,0.04) 0%, transparent 70%)'
          : 'radial-gradient(ellipse at 50% 40%, rgba(0,255,65,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  )
}

// ─── Pricing Block with LED ───────────────────────────────────────────────────
function PriceCard({ amount, label }: { amount: string; label: string }) {
  return (
    <div style={{
      background: C.metalMid,
      backgroundImage: C.powderBg,
      border: `1px solid ${C.border}`,
      boxShadow: Shadow.insetMeter,
      borderRadius: 3,
      padding: 'clamp(10px, 1.5vw, 18px) clamp(14px, 2vw, 24px)',
      minWidth: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      position: 'relative',
    }}>
      {/* Pulsing LED top-right of each price card */}
      <LEDIndicator
        color={C.ledAmber}
        size={6}
        style={{
          position: 'absolute',
          top: 6, right: 6,
          animation: 'ledPricePulse 1.8s ease-in-out infinite',
        }}
      />
      <span style={{
        fontFamily: T.display,
        fontSize: 'clamp(22px, 3.5vw, 38px)',
        fontWeight: 700,
        color: C.brass,
        letterSpacing: '0.02em',
        lineHeight: 1,
        textShadow: Shadow.ledBrass,
      }}>{amount}</span>
      <span style={{
        fontFamily: T.mono,
        fontSize: 10,
        color: C.textMute,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginTop: 2,
      }}>{label}</span>
    </div>
  )
}

// ─── QR Code ─────────────────────────────────────────────────────────────────
function QRCode() {
  return (
    <div style={qrContainerStyle}>
      <div style={{
        ...qrBoxStyle,
        boxShadow: Shadow.insetDeep,
        border: `1px solid ${C.border}`,
      }}>
        <div style={{ textAlign: 'center', color: '#000', fontSize: '0.55rem', fontFamily: T.mono, padding: '0.5rem' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem', letterSpacing: '-0.05em' }}>
            ▪▫▪▫▪<br />▫▪▫▪▫<br />▪▫▪▫▪
          </div>
          cowleyroadstudios.com/book
        </div>
      </div>
      <p style={{ fontFamily: T.mono, fontSize: '0.75rem', color: C.textDim, letterSpacing: '0.15em' }}>
        ↑ Scan to book
      </p>
    </div>
  )
}

// ─── Infrastructure Frame ─────────────────────────────────────────────────────
function InfraFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20,
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
  const isWarm = frame.overlay === 'warm'

  return (
    <CRSShell
      totalFrames={FRAMES.length}
      currentFrame={current}
      reelLabel="SIGNAL PATH"
      showVU={frame.showVU}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: frame.bg,
        transition: 'background 2s ease-in-out',
        zIndex: 0,
      }} />

      {/* Frame overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isWarm
          ? 'linear-gradient(135deg, rgba(8,8,8,0.75) 0%, rgba(194,168,90,0.25) 50%, rgba(8,8,8,0.85) 100%)'
          : 'linear-gradient(135deg, rgba(8,8,8,0.85) 0%, rgba(46,71,59,0.3) 50%, rgba(8,8,8,0.9) 100%)',
        transition: 'background 2s ease-in-out',
        zIndex: 2,
      }} />

      <DepthLayer />
      {/* Studio ambient video background */}
      <VideoBg src="/brand/cricket-studio.mp4" opacity={0.13} />

      {/* Frame content */}
      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 64px)',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 2s ease-in-out',
      }}>
        {frame.showInfra ? (
          <InfraFrame />
        ) : (
          <LCDScreen amber={isWarm}>
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
              <div style={{ ...priceBlockStyle, justifyContent: 'center' }}>
                {pricing.map((p, i) => (
                  <PriceCard key={i} amount={p.amount} label={p.label} />
                ))}
              </div>
            )}
            {frame.showQR && <QRCode />}
            {frame.showVU && (
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                <VUMeter bars={20} style={{ height: 52, width: 'min(400px, 80vw)' }} />
              </div>
            )}
          </LCDScreen>
        )}
        <CRSBadge />
      </div>
    </CRSShell>
  )
}
