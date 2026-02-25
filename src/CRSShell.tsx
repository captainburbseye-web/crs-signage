import React, { useEffect, useState } from 'react'
import { C, T, contactStripStyle, ledStyle, dotBarStyle, gridTextureStyle } from './brand'

// ─── Global ambient keyframes injected once ───────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; overflow: hidden; background: #0E0E0E; }

@keyframes ambientDrift {
  0%, 100% { transform: translate(0px, 0px); }
  25%       { transform: translate(1px, -1px); }
  50%       { transform: translate(-1px, 1px); }
  75%       { transform: translate(1px, 1px); }
}

@keyframes ledPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
}

@keyframes frameIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes frameOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
`

let cssInjected = false
function injectGlobalCSS() {
  if (cssInjected) return
  const style = document.createElement('style')
  style.textContent = GLOBAL_CSS
  document.head.appendChild(style)
  cssInjected = true
}

// ─── CRS Badge ────────────────────────────────────────────────────────────────
export function CRSBadge() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '2.5rem',
      left: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      opacity: 0.35,
      zIndex: 5,
      pointerEvents: 'none',
    }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: `1.5px solid ${C.brass}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: T.display,
        fontSize: '0.75rem',
        fontWeight: 700,
        color: C.brass,
        letterSpacing: '0.05em',
      }}>CRS</div>
      <div style={{
        fontFamily: T.mono,
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        color: C.brass,
        lineHeight: 1.4,
      }}>
        COWLEY ROAD<br />STUDIOS
      </div>
    </div>
  )
}

// ─── LED Indicator ────────────────────────────────────────────────────────────
export function LEDIndicator() {
  return (
    <div style={{
      ...ledStyle,
      animation: 'ledPulse 3s ease-in-out infinite',
    }} aria-label="System Active" />
  )
}

// ─── Contact Strip ────────────────────────────────────────────────────────────
export function ContactStrip() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-GB', { hour12: false }))

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={contactStripStyle}>
      <span>
        <span style={{ color: '#39FF14', marginRight: '0.4rem' }}>●</span>
        LIVE · OPERATIONAL
      </span>
      <span>118 COWLEY ROAD · OXFORD · OX4 1JE</span>
      <span>{time} · CRSOXFORD.COM</span>
    </div>
  )
}

// ─── Frame Dot Indicators ─────────────────────────────────────────────────────
export function FrameDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={dotBarStyle}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 20 : 6,
          height: 4,
          borderRadius: 2,
          background: i === current ? C.brass : 'rgba(229,229,229,0.25)',
          transition: 'width 0.4s ease, background 0.4s ease',
        }} />
      ))}
    </div>
  )
}

// ─── Grid Texture Overlay ─────────────────────────────────────────────────────
export function GridTexture() {
  return <div style={gridTextureStyle} aria-hidden="true" />
}

// ─── Depth Layer ─────────────────────────────────────────────────────────────
export function DepthLayer() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 3,
      opacity: 0.05,
      pointerEvents: 'none',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(79,121,66,0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(194,168,90,0.1) 0%, transparent 50%)
      `,
      animation: 'ambientDrift 120s linear infinite',
    }} aria-hidden="true" />
  )
}

// ─── CRSShell wrapper ─────────────────────────────────────────────────────────
// Wraps any reel with the persistent chrome: LED, contact strip, grid texture.
// Children are the reel frames themselves.
interface CRSShellProps {
  children: React.ReactNode
  totalFrames?: number
  currentFrame?: number
}

export default function CRSShell({ children, totalFrames, currentFrame }: CRSShellProps) {
  useEffect(() => { injectGlobalCSS() }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: C.bg,
      fontFamily: T.mono,
      color: C.text,
      WebkitFontSmoothing: 'antialiased',
    }}>
      <GridTexture />
      <LEDIndicator />
      {children}
      {totalFrames !== undefined && currentFrame !== undefined && (
        <FrameDots total={totalFrames} current={currentFrame} />
      )}
      <ContactStrip />
    </div>
  )
}
