/**
 * StreetDeck.tsx — CRS Ambient Broadcast Display (/deck)
 *
 * Philosophy: Full-screen cinematic environmental signage.
 * No UI panels. No framing. No decoration.
 *
 * Formula per scene:
 *   FULL SCREEN BACKGROUND (colour wash + ambient motion)
 *   ONE STATEMENT (large, breathing room, bottom-anchored)
 *   ONE FOOTER LINE (small, functional)
 *   CONTINUOUS TICKER (always running, never stops)
 *
 * Motion layers:
 *   BASE  — slow ambient drift + CRT flicker + scan line (always alive)
 *   MID   — statement changes every 5–8s via fast wipe (0.35s)
 *   IMPACT — interrupt frames: sharp cut, 1.8s hold, sharp cut back
 *
 * Copy philosophy: states usefulness, invites participation, creates intrigue.
 * NOT: branding, identity performance, creative-tech signalling.
 */

import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Tokens ────────────────────────────────────────────────────────────────────
const D = {
  black:       '#080808',
  blackWarm:   '#100D08',
  blackDeep:   '#030303',
  white:       '#F0EDE8',
  brass:       '#B5A642',
  mustard:     '#C2A85A',
  nettle:      '#3D6132',
  signalGreen: '#39FF14',
  red:         '#E8291C',
  textDim:     'rgba(240,237,232,0.65)',
  textFaint:   'rgba(240,237,232,0.35)',
}

// ─── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800;900&display=swap');

@keyframes ambientDrift {
  0%,100% { transform: scale(1.06) translate(0px,0px); }
  33%     { transform: scale(1.065) translate(4px,-3px); }
  66%     { transform: scale(1.06) translate(-3px,4px); }
}
@keyframes crtFlicker {
  0%,100% { opacity:1; }
  92%     { opacity:1; }
  93%     { opacity:0.87; }
  94%     { opacity:1; }
  98%     { opacity:0.93; }
}
@keyframes scanLine {
  0%   { top:-3px; opacity:0.12; }
  100% { top:100%; opacity:0; }
}
@keyframes tickerScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes stmtWipeIn {
  0%   { clip-path: inset(0 100% 0 0); }
  100% { clip-path: inset(0 0% 0 0); }
}
@keyframes stmtFadeUp {
  0%   { opacity:0; transform:translateY(12px); }
  100% { opacity:1; transform:translateY(0); }
}
@keyframes interruptIn {
  0%   { opacity:0; }
  8%   { opacity:1; }
  92%  { opacity:1; }
  100% { opacity:0; }
}
@keyframes ledBlink {
  0%,100% { opacity:1; }
  50%     { opacity:0.4; }
}
@keyframes vignettePulse {
  0%,100% { opacity:1; }
  50%     { opacity:0.75; }
}

.stmt-wipe { animation: stmtWipeIn 0.35s cubic-bezier(0.4,0,0.2,1) both; }
.stmt-fade { animation: stmtFadeUp 0.5s ease both; }
`

let cssInjected = false
function injectCSS() {
  if (cssInjected) return
  const el = document.createElement('style')
  el.textContent = CSS
  document.head.appendChild(el)
  cssInjected = true
}

// ─── Ticker ────────────────────────────────────────────────────────────────────
// One long string, duplicated for seamless loop.
const TICKER_STR = [
  'HOST SOMETHING HERE',
  'PRIVATE HIRE AVAILABLE',
  'ALL AV PROVIDED IN-HOUSE',
  'RECORDING · REHEARSAL · TECHNICAL SERVICES',
  'OPEN DURING EVENTS & SESSIONS',
  'PODCAST & STREAMING SETUPS',
  'COWLEY ROAD STUDIOS · 118 COWLEY ROAD · OXFORD',
  'WORKSHOPS · OPEN SESSIONS · COLLABORATION',
  'BRING YOUR EVENT HERE',
  'cowleyroadstudios.com',
].join('   ·   ')

const TICKER_DURATION = 55 // seconds for one full pass

function Ticker() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 36,
      background: 'rgba(0,0,0,0.82)',
      borderTop: `1px solid rgba(181,166,66,0.25)`,
      overflow: 'hidden',
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Single div, doubled content, translateX(-50%) = one full loop */}
      <div style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.14em',
        color: D.brass,
        textTransform: 'uppercase' as const,
        animation: `tickerScroll ${TICKER_DURATION}s linear infinite`,
        willChange: 'transform',
      }}>
        {/* Two copies so the loop is seamless */}
        {TICKER_STR}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;{TICKER_STR}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
        {TICKER_STR}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;{TICKER_STR}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  )
}

// ─── Scene definitions ─────────────────────────────────────────────────────────
type Statement = {
  headline: string      // large, bold
  footer?: string       // small, below
  headlineSize?: 'hero' | 'large' | 'medium'
}

type Scene = {
  id: string
  type: 'ambient' | 'interrupt'
  bg: string            // CSS background (colour or gradient)
  accentColor: string
  statements: Statement[]
  stmtInterval: number  // ms between statement swaps
  duration: number      // total scene duration ms
}

const SCENES: Scene[] = [
  // ── SCENE 1: Identity ───────────────────────────────────────────────────────
  {
    id: 'identity',
    type: 'ambient',
    bg: D.black,
    accentColor: D.brass,
    stmtInterval: 7000,
    duration: 22000,
    statements: [
      {
        headline: 'COWLEY ROAD STUDIOS',
        footer: 'Recording · Rehearsal · Technical Services · Workshop Café',
        headlineSize: 'hero',
      },
      {
        headline: 'A SPACE FOR THINGS TO HAPPEN.',
        footer: '118 Cowley Road · Oxford',
        headlineSize: 'large',
      },
      {
        headline: 'HOST SOMETHING HERE.',
        footer: 'Events · Workshops · Parties · Podcasts',
        headlineSize: 'large',
      },
    ],
  },

  // ── INTERRUPT 1 ─────────────────────────────────────────────────────────────
  {
    id: 'interrupt-1',
    type: 'interrupt',
    bg: D.white,
    accentColor: D.black,
    stmtInterval: 99999,
    duration: 1800,
    statements: [
      { headline: 'PRIVATE HIRE\nAVAILABLE.', headlineSize: 'hero' },
    ],
  },

  // ── SCENE 2: Recording ──────────────────────────────────────────────────────
  {
    id: 'recording',
    type: 'ambient',
    bg: D.black,
    accentColor: D.brass,
    stmtInterval: 7000,
    duration: 21000,
    statements: [
      {
        headline: 'RECORD HERE.',
        footer: 'Analogue and digital workflows · Bands · Artists · Podcasts · Production',
        headlineSize: 'hero',
      },
      {
        headline: 'PODCAST &\nSTREAMING SETUPS.',
        footer: 'All AV provided in-house',
        headlineSize: 'large',
      },
      {
        headline: 'BY APPOINTMENT.',
        footer: 'cowleyroadstudios.com/book',
        headlineSize: 'large',
      },
    ],
  },

  // ── SCENE 3: Rehearsal ──────────────────────────────────────────────────────
  {
    id: 'rehearsal',
    type: 'ambient',
    bg: D.blackWarm,
    accentColor: D.nettle,
    stmtInterval: 7000,
    duration: 21000,
    statements: [
      {
        headline: 'REHEARSE HERE.',
        footer: 'Cowley Road · Cricket Road · Reliable rooms for working musicians',
        headlineSize: 'hero',
      },
      {
        headline: 'PRIVATE BOOTHS\nAVAILABLE.',
        footer: 'Meetings · Podcasts · Streaming · Remote work',
        headlineSize: 'large',
      },
      {
        headline: 'BRING YOUR BAND.',
        footer: '4-piece rooms · Expandable via booths',
        headlineSize: 'large',
      },
    ],
  },

  // ── INTERRUPT 2 ─────────────────────────────────────────────────────────────
  {
    id: 'interrupt-2',
    type: 'interrupt',
    bg: D.brass,
    accentColor: D.black,
    stmtInterval: 99999,
    duration: 1800,
    statements: [
      { headline: 'LIVE TONIGHT.', headlineSize: 'hero' },
    ],
  },

  // ── SCENE 4: Café ───────────────────────────────────────────────────────────
  {
    id: 'cafe',
    type: 'ambient',
    bg: D.blackWarm,
    accentColor: D.mustard,
    stmtInterval: 7000,
    duration: 22000,
    statements: [
      {
        headline: 'WORKSHOP CAFÉ.',
        footer: 'Coffee · Workspace · Events · Community · Open to all',
        headlineSize: 'hero',
      },
      {
        headline: 'OPEN DURING\nEVENTS & SESSIONS.',
        footer: 'The public-facing social layer of Cowley Road Studios',
        headlineSize: 'large',
      },
      {
        headline: 'BRING YOUR EVENT\nHERE.',
        footer: 'Large booth + smaller booths available',
        headlineSize: 'large',
      },
    ],
  },

  // ── SCENE 5: Technical ──────────────────────────────────────────────────────
  {
    id: 'technical',
    type: 'ambient',
    bg: D.black,
    accentColor: D.brass,
    stmtInterval: 7000,
    duration: 21000,
    statements: [
      {
        headline: 'ALL AV\nIN-HOUSE.',
        footer: 'Audio · AV · Repairs · Installation',
        headlineSize: 'hero',
      },
      {
        headline: 'TECHNICAL SERVICES.',
        footer: 'Professional support for studios, venues and events',
        headlineSize: 'large',
      },
      {
        headline: 'WE HANDLE\nTHE TECHNICAL.',
        footer: 'So you can focus on what matters',
        headlineSize: 'large',
      },
    ],
  },

  // ── INTERRUPT 3 ─────────────────────────────────────────────────────────────
  {
    id: 'interrupt-3',
    type: 'interrupt',
    bg: D.blackDeep,
    accentColor: D.white,
    stmtInterval: 99999,
    duration: 1800,
    statements: [
      { headline: 'SOMETHING IS\nHAPPENING HERE.', headlineSize: 'hero' },
    ],
  },

  // ── SCENE 6: Community ──────────────────────────────────────────────────────
  {
    id: 'community',
    type: 'ambient',
    bg: D.blackWarm,
    accentColor: D.nettle,
    stmtInterval: 7000,
    duration: 21000,
    statements: [
      {
        headline: 'BUILT AROUND\nOXFORD.',
        footer: 'Workshops · Open sessions · Skills development · Collaboration',
        headlineSize: 'hero',
      },
      {
        headline: 'COME IN.',
        footer: 'Community is the point',
        headlineSize: 'hero',
      },
      {
        headline: 'OXFORD MUSIC\nINFRASTRUCTURE.',
        footer: 'Built from the legacy of Soundworks · Oxford Sound & Light',
        headlineSize: 'large',
      },
    ],
  },

  // ── SCENE 7: Bookings ───────────────────────────────────────────────────────
  {
    id: 'bookings',
    type: 'ambient',
    bg: D.black,
    accentColor: D.signalGreen,
    stmtInterval: 7000,
    duration: 22000,
    statements: [
      {
        headline: 'BOOK A ROOM.',
        footer: 'cowleyroadstudios.com',
        headlineSize: 'hero',
      },
      {
        headline: 'GET IN TOUCH.',
        footer: 'cowleyroadstudios@gmail.com · @cowleyroadstudios',
        headlineSize: 'large',
      },
      {
        headline: '118 COWLEY ROAD\nOXFORD.',
        footer: 'OX4 1JE · cowleyroadstudios.com',
        headlineSize: 'large',
      },
      {
        headline: 'COWLEY ROAD STUDIOS.',
        footer: 'Recording · Rehearsal · Technical Services · Workshop Café',
        headlineSize: 'hero',
      },
    ],
  },
]

// ─── Background layer ──────────────────────────────────────────────────────────
function BgLayer({ bg, isInterrupt }: { bg: string; isInterrupt: boolean }) {
  return (
    <>
      {/* Solid colour base */}
      <div style={{
        position: 'absolute', inset: 0,
        background: bg,
        transition: isInterrupt ? 'none' : 'background 1.4s ease',
        zIndex: 1,
      }} />

      {/* Ambient gradient drift — not on interrupts */}
      {!isInterrupt && (
        <div style={{
          position: 'absolute', inset: '-8%',
          background: `
            radial-gradient(ellipse 60% 50% at 25% 35%, rgba(181,166,66,0.07) 0%, transparent 100%),
            radial-gradient(ellipse 50% 60% at 75% 65%, rgba(79,97,50,0.06) 0%, transparent 100%)
          `,
          animation: 'ambientDrift 80s ease-in-out infinite',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
      )}

      {/* CRT flicker */}
      {!isInterrupt && (
        <div style={{
          position: 'absolute', inset: 0,
          animation: 'crtFlicker 9s linear infinite',
          zIndex: 3,
          pointerEvents: 'none',
        }} />
      )}

      {/* Scan line */}
      {!isInterrupt && (
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2,
          background: 'linear-gradient(transparent, rgba(255,255,255,0.035), transparent)',
          animation: 'scanLine 14s linear infinite',
          zIndex: 4,
          pointerEvents: 'none',
        }} />
      )}

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.72) 100%)',
        animation: isInterrupt ? 'none' : 'vignettePulse 25s ease-in-out infinite',
        zIndex: 5,
        pointerEvents: 'none',
      }} />
    </>
  )
}

// ─── Statement block ───────────────────────────────────────────────────────────
function StatementBlock({
  stmt,
  accentColor,
  isInterrupt,
  animKey,
}: {
  stmt: Statement
  accentColor: string
  isInterrupt: boolean
  animKey: number
}) {
  const headlineColor = isInterrupt ? accentColor : D.white
  const footerColor   = isInterrupt ? `${accentColor}bb` : D.textDim

  const headlineFontSize = {
    hero:   'clamp(56px, 9.5vw, 128px)',
    large:  'clamp(40px, 6.5vw, 88px)',
    medium: 'clamp(28px, 4.5vw, 60px)',
  }[stmt.headlineSize ?? 'large']

  const footerFontSize = {
    hero:   'clamp(16px, 2vw, 26px)',
    large:  'clamp(14px, 1.8vw, 22px)',
    medium: 'clamp(13px, 1.6vw, 20px)',
  }[stmt.headlineSize ?? 'large']

  return (
    <div
      key={animKey}
      className={isInterrupt ? '' : 'stmt-wipe'}
      style={{
        position: 'absolute',
        // Bottom-anchored: breathing room at top, content sits low
        bottom: 80,
        left: 0,
        right: 0,
        padding: '0 80px',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        animation: isInterrupt ? 'interruptIn 1.8s ease both' : undefined,
      }}
    >
      {/* Accent rule */}
      {!isInterrupt && (
        <div style={{
          width: 'clamp(32px, 4vw, 56px)',
          height: 3,
          background: accentColor,
          marginBottom: 24,
          borderRadius: 2,
        }} />
      )}

      {/* Headline */}
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: headlineFontSize,
        fontWeight: isInterrupt ? 900 : 800,
        color: headlineColor,
        letterSpacing: isInterrupt ? '0.01em' : '0.03em',
        lineHeight: 1.0,
        whiteSpace: 'pre-line',
        maxWidth: '80%',
      }}>
        {stmt.headline}
      </div>

      {/* Footer */}
      {stmt.footer && (
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: footerFontSize,
          fontWeight: 400,
          color: footerColor,
          letterSpacing: '0.05em',
          lineHeight: 1.5,
          marginTop: 20,
          maxWidth: '70%',
        }}>
          {stmt.footer}
        </div>
      )}
    </div>
  )
}

// ─── Minimal corner badge ──────────────────────────────────────────────────────
function CornerBadge({ accentColor, isInterrupt }: { accentColor: string; isInterrupt: boolean }) {
  return (
    <div style={{
      position: 'absolute', top: 36, right: 44,
      zIndex: 40,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{
        width: 7, height: 7, borderRadius: '50%',
        background: isInterrupt ? accentColor : D.signalGreen,
        boxShadow: `0 0 5px 2px ${isInterrupt ? accentColor : D.signalGreen}`,
        animation: 'ledBlink 2.4s ease-in-out infinite',
      }} />
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 12, fontWeight: 600,
        color: isInterrupt ? accentColor : D.textFaint,
        letterSpacing: '0.18em',
        textTransform: 'uppercase' as const,
      }}>
        CRS
      </span>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
interface StreetDeckProps {
  onLoopComplete?: () => void
}

export default function StreetDeck({ onLoopComplete }: StreetDeckProps) {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [stmtIdx,  setStmtIdx]  = useState(0)
  const [animKey,  setAnimKey]  = useState(0)
  const [fading,   setFading]   = useState(false)

  const sceneRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const stmtRef  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => { injectCSS() }, [])

  const nextScene = useCallback(() => {
    setFading(true)
    setTimeout(() => {
      setSceneIdx(i => {
        const n = (i + 1) % SCENES.length
        if (n === 0 && onLoopComplete) onLoopComplete()
        return n
      })
      setStmtIdx(0)
      setAnimKey(k => k + 1)
      setFading(false)
    }, 500)
  }, [onLoopComplete])

  // Scene timer
  useEffect(() => {
    clearTimeout(sceneRef.current)
    sceneRef.current = setTimeout(nextScene, SCENES[sceneIdx].duration)
    return () => clearTimeout(sceneRef.current)
  }, [sceneIdx, nextScene])

  // Statement cycling
  useEffect(() => {
    const scene = SCENES[sceneIdx]
    if (scene.type === 'interrupt') return
    clearTimeout(stmtRef.current)
    stmtRef.current = setTimeout(() => {
      setStmtIdx(i => (i + 1) % scene.statements.length)
      setAnimKey(k => k + 1)
    }, scene.stmtInterval)
    return () => clearTimeout(stmtRef.current)
  }, [sceneIdx, stmtIdx])

  const scene = SCENES[sceneIdx]
  const stmt  = scene.statements[stmtIdx] ?? scene.statements[0]
  const isInterrupt = scene.type === 'interrupt'

  return (
    <div style={{
      position: 'fixed', inset: 0,
      overflow: 'hidden',
      opacity: fading ? 0 : 1,
      transition: fading ? 'opacity 0.5s ease' : 'none',
    }}>
      {/* Background */}
      <BgLayer bg={scene.bg} isInterrupt={isInterrupt} />

      {/* Statement — bottom anchored */}
      <StatementBlock
        stmt={stmt}
        accentColor={scene.accentColor}
        isInterrupt={isInterrupt}
        animKey={animKey}
      />

      {/* Corner badge */}
      <CornerBadge accentColor={scene.accentColor} isInterrupt={isInterrupt} />

      {/* Ticker — always running */}
      <Ticker />
    </div>
  )
}
