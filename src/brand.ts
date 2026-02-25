// ─── CRS Brand Constants ─────────────────────────────────────────────────────
// Extracted from approved reference: crs-web-1.pages.dev/signage-v4
// DO NOT deviate from these values.

export const C = {
  // Base
  bg:       '#0E0E0E',
  bg2:      '#23272B',
  // Structural greens
  green:    '#2E473B',
  greenMid: '#4F7942',
  // Highlight
  brass:    '#C2A85A',
  // Text
  text:     '#E5E5E5',
  textDim:  'rgba(229,229,229,0.7)',
  textFaint:'rgba(229,229,229,0.4)',
  // Overlays
  coolOverlay: 'linear-gradient(135deg, rgba(14,14,14,0.85) 0%, rgba(46,71,59,0.3) 50%, rgba(14,14,14,0.9) 100%)',
  warmOverlay: 'linear-gradient(135deg, rgba(14,14,14,0.75) 0%, rgba(194,168,90,0.25) 50%, rgba(14,14,14,0.85) 100%)',
} as const

export const T = {
  display:  '"Oswald", sans-serif',
  mono:     '"JetBrains Mono", "Courier New", monospace',
} as const

// ─── Shared base styles ───────────────────────────────────────────────────────

export const baseContainer: React.CSSProperties = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  background: C.bg,
  fontFamily: T.mono,
  color: C.text,
  WebkitFontSmoothing: 'antialiased',
}

// ─── Mandatory persistent elements ───────────────────────────────────────────

// CRS Badge — bottom-left of each frame, 120×40px, opacity 0.3
export const crsBadgeStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '2rem',
  left: '2rem',
  width: 120,
  height: 40,
  opacity: 0.3,
  zIndex: 5,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}

// Contact strip — fixed bottom bar
export const contactStripStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '2.2rem',
  background: 'rgba(14,14,14,0.92)',
  borderTop: `1px solid rgba(194,168,90,0.3)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1.5rem',
  zIndex: 100,
  fontFamily: T.mono,
  fontSize: '0.72rem',
  letterSpacing: '0.15em',
  color: C.textDim,
}

// LED indicator — top-right
export const ledStyle: React.CSSProperties = {
  position: 'fixed',
  top: '0.75rem',
  right: '0.75rem',
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: '#39FF14',
  boxShadow: '0 0 6px rgba(57,255,20,0.8)',
  zIndex: 200,
}

// Frame dot indicators — bottom centre above contact strip
export const dotBarStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '2.8rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: 8,
  zIndex: 100,
}

// VU meter container — bottom centre of recording frames
export const vuMeterStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '6rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: 8,
  opacity: 0.6,
  zIndex: 25,
}

export const vuBarStyle: React.CSSProperties = {
  width: 4,
  borderRadius: 2,
  background: 'linear-gradient(to top, rgba(57,255,20,0.8) 0%, rgba(255,165,0,0.6) 50%, rgba(194,168,90,0.4) 100%)',
  transformOrigin: 'center bottom',
  transition: 'height 0.3s ease-out',
}

// QR code container
export const qrContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '2rem',
}

export const qrBoxStyle: React.CSSProperties = {
  width: 140,
  height: 140,
  padding: '0.5rem',
  background: 'rgba(255,255,255,0.95)',
  borderRadius: 4,
  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.6rem',
  color: '#000',
  fontFamily: T.mono,
  textAlign: 'center' as const,
}

// Pricing block
export const priceBlockStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2rem',
  marginTop: '1.5rem',
  justifyContent: 'center',
}

export const priceItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.2rem',
}

export const priceAmountStyle: React.CSSProperties = {
  fontFamily: T.display,
  fontSize: '2.2rem',
  fontWeight: 700,
  color: C.brass,
  letterSpacing: '0.05em',
}

export const priceLabelStyle: React.CSSProperties = {
  fontFamily: T.mono,
  fontSize: '0.7rem',
  color: C.textDim,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
}

// Frame title
export const frameTitleStyle: React.CSSProperties = {
  fontFamily: T.display,
  fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
  fontWeight: 700,
  lineHeight: 1.05,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  marginBottom: '1rem',
  textShadow: 'rgba(0,0,0,0.9) 0px 1px 0px',
}

export const frameSubtitleStyle: React.CSSProperties = {
  fontFamily: T.mono,
  fontSize: 'clamp(0.9rem, 1.5vw, 1.4rem)',
  fontWeight: 300,
  letterSpacing: '0.08em',
  color: C.textDim,
  marginBottom: '1rem',
}

export const frameBodyStyle: React.CSSProperties = {
  fontFamily: T.mono,
  fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
  fontWeight: 300,
  lineHeight: 1.7,
  color: C.textDim,
  whiteSpace: 'pre-line' as const,
}

// Ambient grid texture overlay (::before equivalent as inline div)
export const gridTextureStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage: 'repeating-linear-gradient(90deg, rgba(35,39,43,0.3) 0px, transparent 1px, transparent 2px, rgba(35,39,43,0.3) 3px)',
  opacity: 0.15,
  pointerEvents: 'none',
  zIndex: 1,
}

// Depth layer (ambient radial gradients)
export const depthLayerStyle: React.CSSProperties = {
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
}
