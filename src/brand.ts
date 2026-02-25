// ─── CRS SIGNAGE — RACK UI BRAND TOKENS v2.0 ─────────────────────────────────
// Dark System only. Single source of truth.
// DO NOT hardcode values in reel files.

import type { CSSProperties } from 'react';

// ── COLOUR PALETTE ────────────────────────────────────────────────────────────
export const C = {
  // Core backgrounds
  bg:          '#080808',
  bg2:         '#0E0E0E',
  bgDeep:      '#040404',
  bgPanel:     '#111111',

  // Metal surfaces
  metalDark:   '#111111',
  metalMid:    '#1A1A1A',
  metalLight:  '#242424',
  metalHighlight: '#2E2E2E',

  // Brushed steel texture — CSS-only, no external asset
  metalBg: `repeating-linear-gradient(
    92deg,
    rgba(255,255,255,0.012) 0px,
    rgba(255,255,255,0.006) 1px,
    transparent 1px,
    transparent 3px
  ), repeating-linear-gradient(
    180deg,
    rgba(255,255,255,0.008) 0px,
    transparent 1px,
    transparent 4px
  ), linear-gradient(180deg, #1A1A1A 0%, #111111 50%, #161616 100%)`,

  // Powder-coat panel texture
  powderBg: `repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.015) 0px,
    rgba(255,255,255,0.015) 1px,
    transparent 1px,
    transparent 6px
  ), linear-gradient(180deg, #0E0E0E 0%, #0A0A0A 100%)`,

  // Amber acrylic plate
  amberAcrylic: `linear-gradient(135deg, #3A2800 0%, #2A1C00 40%, #3A2800 100%)`,

  // Structural greens
  green:       '#2E473B',
  greenMid:    '#4F7942',
  greenBright: '#5A8A4A',
  greenGlow:   '#6AAA58',

  // Brand brass
  brass:       '#C2A85A',
  brassDim:    '#8A7540',
  brassGlow:   '#D4B86A',

  // LED states
  ledGreen:    '#00FF41',   // active / signal present
  ledAmber:    '#FFB800',   // standby / processing
  ledRed:      '#FF2020',   // recording / live / alert
  ledBlue:     '#00AAFF',   // monitoring / info
  ledOff:      '#1A1A1A',   // unlit

  // LCD / CRT display colours
  lcdBg:       '#050D05',
  lcdText:     '#33FF33',
  lcdAmber:    '#FFB000',
  lcdGlow:     'rgba(51,255,51,0.15)',
  crtBg:       '#020808',
  crtText:     '#A0FFA0',

  // Text
  text:        '#E8E0D0',
  textDim:     'rgba(232,224,208,0.65)',
  textFaint:   'rgba(232,224,208,0.35)',
  textMute:    '#4A4540',
  textEngraved:'#C2A85A',

  // Structural
  border:      '#2A2A2A',
  borderBright:'#3A3A3A',
  screw:       '#1E1E1E',
  screwHead:   '#2A2A2A',

  // Legacy overlays (kept for compatibility)
  coolOverlay: 'linear-gradient(135deg, rgba(8,8,8,0.85) 0%, rgba(46,71,59,0.3) 50%, rgba(8,8,8,0.9) 100%)',
  warmOverlay: 'linear-gradient(135deg, rgba(8,8,8,0.75) 0%, rgba(194,168,90,0.25) 50%, rgba(8,8,8,0.85) 100%)',
} as const;

// ── TYPOGRAPHY ────────────────────────────────────────────────────────────────
export const T = {
  display: '"Oswald", "Impact", sans-serif',
  body:    '"JetBrains Mono", "Courier New", monospace',
  mono:    '"JetBrains Mono", "Courier New", monospace',
  label:   '"Oswald", sans-serif',
} as const;

// ── DEPTH / SHADOW TOKENS ─────────────────────────────────────────────────────
export const Shadow = {
  // Inset — screens and meters cut INTO the metal
  insetDeep:   'inset 0 4px 16px rgba(0,0,0,0.9), inset 0 1px 3px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.03)',
  insetScreen: 'inset 0 2px 12px rgba(0,0,0,0.95), inset 0 0 40px rgba(0,0,0,0.6)',
  insetMeter:  'inset 0 3px 8px rgba(0,0,0,0.85), inset 0 1px 2px rgba(0,0,0,0.7)',
  insetSwitch: 'inset 0 2px 6px rgba(0,0,0,0.9), inset 0 1px 2px rgba(0,0,0,0.8)',

  // Outset — raised knobs, plates, buttons
  outsetPlate:  '0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06), 0 -1px 0 rgba(0,0,0,0.5)',
  outsetKnob:   '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.08)',
  outsetRack:   '0 6px 24px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.8)',
  outsetScrew:  '0 1px 2px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.05)',

  // LED glows
  ledGreen:  '0 0 6px #00FF41, 0 0 12px rgba(0,255,65,0.5), 0 0 24px rgba(0,255,65,0.2)',
  ledAmber:  '0 0 6px #FFB800, 0 0 12px rgba(255,184,0,0.5), 0 0 24px rgba(255,184,0,0.2)',
  ledRed:    '0 0 6px #FF2020, 0 0 12px rgba(255,32,32,0.5), 0 0 24px rgba(255,32,32,0.2)',
  ledBrass:  '0 0 4px #C2A85A, 0 0 10px rgba(194,168,90,0.4)',

  // Screen glows
  screenGlow: '0 0 20px rgba(51,255,51,0.08), inset 0 0 60px rgba(0,0,0,0.7)',
  amberGlow:  '0 0 20px rgba(255,176,0,0.1), inset 0 0 60px rgba(0,0,0,0.7)',
} as const;

// ── BASE CONTAINER ────────────────────────────────────────────────────────────
export const baseContainer: CSSProperties = {
  position:  'relative',
  width:     '100vw',
  height:    '100vh',
  overflow:  'hidden',
  background: C.bg,
  fontFamily: T.mono,
  color:     C.text,
  WebkitFontSmoothing: 'antialiased',
};

// ── MANDATORY PERSISTENT ELEMENTS ────────────────────────────────────────────

export const crsBadgeStyle: CSSProperties = {
  position:   'absolute',
  bottom:     '2rem',
  left:       '2rem',
  width:      120,
  height:     40,
  opacity:    0.3,
  zIndex:     5,
  display:    'flex',
  alignItems: 'center',
  gap:        '0.5rem',
};

export const contactStripStyle: CSSProperties = {
  position:        'fixed',
  bottom:          0,
  left:            0,
  right:           0,
  height:          '2.4rem',
  background:      C.metalBg,
  backgroundImage: C.metalBg,
  borderTop:       `1px solid rgba(194,168,90,0.25)`,
  boxShadow:       Shadow.outsetPlate,
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'space-between',
  padding:         '0 1.5rem',
  zIndex:          100,
  fontFamily:      T.mono,
  fontSize:        '0.7rem',
  letterSpacing:   '0.15em',
  color:           C.textDim,
};

export const ledStyle: CSSProperties = {
  position:     'fixed',
  top:          '0.75rem',
  right:        '0.75rem',
  width:        8,
  height:       8,
  borderRadius: '50%',
  background:   C.ledGreen,
  boxShadow:    Shadow.ledGreen,
  zIndex:       200,
};

export const dotBarStyle: CSSProperties = {
  position:  'fixed',
  bottom:    '3rem',
  left:      '50%',
  transform: 'translateX(-50%)',
  display:   'flex',
  gap:       8,
  zIndex:    100,
};

// ── LCD SCREEN CONTAINER ──────────────────────────────────────────────────────
// Wraps headline text in an inset display cut into the metal
export const lcdScreenStyle: CSSProperties = {
  background:   C.lcdBg,
  boxShadow:    Shadow.insetScreen,
  border:       `1px solid ${C.border}`,
  borderRadius: '3px',
  padding:      'clamp(20px, 3vw, 40px) clamp(24px, 4vw, 56px)',
  position:     'relative',
  overflow:     'hidden',
};

// Amber acrylic label plate
export const amberPlateStyle: CSSProperties = {
  background:   C.amberAcrylic,
  boxShadow:    `${Shadow.outsetPlate}, inset 0 0 20px rgba(0,0,0,0.4)`,
  border:       `1px solid rgba(194,168,90,0.3)`,
  borderRadius: '2px',
  padding:      '8px 20px',
};

// ── PRICING ───────────────────────────────────────────────────────────────────
export const priceBlockStyle: CSSProperties = {
  display:    'flex',
  gap:        'clamp(12px, 2vw, 24px)',
  flexWrap:   'wrap',
  alignItems: 'flex-start',
  marginTop:  '1.5rem',
};

export const priceItemStyle: CSSProperties = {
  background:      C.metalMid,
  backgroundImage: C.powderBg,
  border:          `1px solid ${C.border}`,
  boxShadow:       Shadow.insetMeter,
  borderRadius:    '3px',
  padding:         'clamp(10px, 1.5vw, 16px) clamp(14px, 2vw, 22px)',
  minWidth:        '100px',
  position:        'relative',
  display:         'flex',
  flexDirection:   'column',
  alignItems:      'center',
  gap:             '0.2rem',
};

export const priceAmountStyle: CSSProperties = {
  fontFamily:    T.display,
  fontSize:      'clamp(22px, 3.5vw, 38px)',
  fontWeight:    700,
  color:         C.brass,
  letterSpacing: '0.02em',
  lineHeight:    1,
  textShadow:    Shadow.ledBrass,
};

export const priceLabelStyle: CSSProperties = {
  fontFamily:    T.mono,
  fontSize:      '10px',
  fontWeight:    400,
  color:         C.textMute,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  marginTop:     '4px',
};

// ── FRAME TYPOGRAPHY ──────────────────────────────────────────────────────────
export const frameTitleStyle: CSSProperties = {
  fontFamily:    T.display,
  fontSize:      'clamp(2.8rem, 5.5vw, 5.5rem)',
  fontWeight:    700,
  lineHeight:    1.05,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  marginBottom:  '1rem',
  textShadow:    `0 0 40px rgba(194,168,90,0.3), 0 2px 4px rgba(0,0,0,0.8)`,
};

export const frameSubtitleStyle: CSSProperties = {
  fontFamily:    T.mono,
  fontSize:      'clamp(0.9rem, 1.5vw, 1.4rem)',
  fontWeight:    300,
  letterSpacing: '0.08em',
  color:         C.textDim,
  marginBottom:  '1rem',
};

export const frameBodyStyle: CSSProperties = {
  fontFamily:  T.mono,
  fontSize:    'clamp(0.85rem, 1.2vw, 1.1rem)',
  fontWeight:  300,
  lineHeight:  1.7,
  color:       C.textDim,
  whiteSpace:  'pre-line' as const,
};

// ── TEXTURE / DEPTH OVERLAYS ──────────────────────────────────────────────────
export const gridTextureStyle: CSSProperties = {
  position:        'absolute',
  inset:           0,
  backgroundImage: 'repeating-linear-gradient(90deg, rgba(35,39,43,0.3) 0px, transparent 1px, transparent 2px, rgba(35,39,43,0.3) 3px)',
  opacity:         0.15,
  pointerEvents:   'none',
  zIndex:          1,
};

export const depthLayerStyle: CSSProperties = {
  position:        'absolute',
  inset:           0,
  zIndex:          3,
  opacity:         0.05,
  pointerEvents:   'none',
  backgroundImage: `
    radial-gradient(circle at 20% 30%, rgba(79,121,66,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(194,168,90,0.1) 0%, transparent 50%)
  `,
  animation: 'ambientDrift 120s linear infinite',
};

export const vuMeterStyle: CSSProperties = {
  position:  'absolute',
  bottom:    '6rem',
  left:      '50%',
  transform: 'translateX(-50%)',
  display:   'flex',
  gap:       8,
  opacity:   0.6,
  zIndex:    25,
};

export const vuBarStyle: CSSProperties = {
  width:           4,
  borderRadius:    2,
  background:      'linear-gradient(to top, rgba(0,255,65,0.8) 0%, rgba(255,184,0,0.6) 60%, rgba(255,32,32,0.4) 100%)',
  transformOrigin: 'center bottom',
  transition:      'height 0.3s ease-out',
};

export const qrContainerStyle: CSSProperties = {
  display:       'flex',
  flexDirection: 'column',
  alignItems:    'center',
  gap:           '0.5rem',
  marginTop:     '2rem',
};

export const qrBoxStyle: CSSProperties = {
  width:       140,
  height:      140,
  padding:     '0.5rem',
  background:  'rgba(255,255,255,0.95)',
  borderRadius: 4,
  boxShadow:   '0 2px 8px rgba(0,0,0,0.5)',
  display:     'flex',
  alignItems:  'center',
  justifyContent: 'center',
  fontSize:    '0.6rem',
  color:       '#000',
  fontFamily:  T.mono,
  textAlign:   'center' as const,
};
