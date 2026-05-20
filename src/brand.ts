// ─── CRS SIGNAGE — RACK UI BRAND TOKENS v3.0 ─────────────────────────────────
// Dark System only. Single source of truth.
// Brand colours extracted from official CRS assets (logo-icon, rack-header, rack-bottom, crs-badge).
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

  // Backlit amber acrylic plate — matches rack-header and rack-bottom images
  amberAcrylic: `linear-gradient(135deg, #3A2E00 0%, #F5C842 30%, #FDE8A6 50%, #F5C842 70%, #3A2E00 100%)`,

  // Dark olive panel — matches CRS badge (17.png) face
  olivePanelBg: `repeating-linear-gradient(
    92deg,
    rgba(255,255,255,0.008) 0px,
    rgba(255,255,255,0.004) 1px,
    transparent 1px,
    transparent 3px
  ), linear-gradient(180deg, #3A4A2A 0%, #2E3A20 50%, #3A4A2A 100%)`,

  // ── CRS BRAND COLOURS (from official assets) ────────────────────────────
  // Logo block colours (from logo-icon.png)
  logoWhite:   '#F4F5F5',   // left block background — off-white
  logoMustard: '#F2C914',   // right block background — vivid mustard yellow
  logoBlack:   '#1A1A1A',   // letter colour — near-black
  logoGreen:   '#2F7036',   // green underline stripe in logo

  // Panel / rack colours (from 17.png CRS badge)
  panelOlive:  '#3A4A2A',   // dark olive green panel — the main rack face colour
  panelOliveMid: '#4A5A35', // lighter olive for highlights

  // Backlit panel (from rack-header, rack-bottom)
  backlitAmber: '#F5C842',  // warm amber backlight glow — the illuminated panel
  backlitWarm:  '#FDE8A6',  // warm cream/amber at centre of backlit panel

  // Stripe colours (from rack-header, rack-bottom, CRS badge)
  stripeGreen: '#4A7A2A',   // green horizontal stripe (top of rack strips)
  stripeRed:   '#A30F11',   // red horizontal stripe (bottom of rack strips)
  stripeLime:  '#7AB82A',   // lime green underline in CRS logo

  // Button colours (from 17.png)
  btnRed:      '#890E0F',   // red illuminated button
  btnAmber:    '#C89B1A',   // amber/mustard illuminated button
  btnGreen:    '#7AB82A',   // green illuminated button

  // Structural greens (kept for reel content)
  green:       '#3A4A2A',   // updated to match panel olive
  greenMid:    '#4A7A2A',   // updated to match stripe green
  greenBright: '#7AB82A',   // lime green
  greenGlow:   '#9ACA4A',

  // Brand brass — now secondary to mustard
  brass:       '#F2C914',   // mustard yellow (primary brand colour)
  brassDim:    '#C2A020',   // dimmed mustard
  brassGlow:   '#F5D040',   // bright mustard glow

  // LED states — matched to CRS button colours
  ledGreen:    '#7AB82A',   // active / signal present — CRS lime green
  ledAmber:    '#F2C914',   // standby / processing — CRS mustard
  ledRed:      '#CC1214',   // recording / live / alert — CRS red
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
  text:        '#F4F5F5',   // matches logo off-white
  textDim:     'rgba(244,245,245,0.65)',
  textFaint:   'rgba(244,245,245,0.35)',
  textMute:    '#5A5A4A',
  textEngraved:'#F2C914',   // mustard for engraved labels

  // Structural
  border:      '#2A2A2A',
  borderBright:'#3A3A3A',
  screw:       '#1E1E1E',
  screwHead:   '#2A2A2A',

  // Legacy overlays (kept for compatibility) — updated to CRS olive/mustard
  coolOverlay: 'linear-gradient(135deg, rgba(8,8,8,0.85) 0%, rgba(58,74,42,0.3) 50%, rgba(8,8,8,0.9) 100%)',
  warmOverlay: 'linear-gradient(135deg, rgba(8,8,8,0.75) 0%, rgba(242,201,20,0.2) 50%, rgba(8,8,8,0.85) 100%)',
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
  fontSize:      'clamp(1.8rem, min(5.5vw, 7vh), 5rem)',
  fontWeight:    700,
  lineHeight:    1.05,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  marginBottom:  'clamp(0.4rem, 1.5vh, 1rem)',
  textShadow:    `0 0 40px rgba(194,168,90,0.3), 0 2px 4px rgba(0,0,0,0.8)`,
};

export const frameSubtitleStyle: CSSProperties = {
  fontFamily:    T.mono,
  fontSize:      'clamp(0.75rem, min(1.5vw, 2vh), 1.3rem)',
  fontWeight:    300,
  letterSpacing: '0.08em',
  color:         C.textDim,
  marginBottom:  'clamp(0.4rem, 1.2vh, 1rem)',
};

export const frameBodyStyle: CSSProperties = {
  fontFamily:  T.mono,
  fontSize:    'clamp(0.7rem, min(1.2vw, 1.8vh), 1rem)',
  fontWeight:  300,
  lineHeight:  1.6,
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

// ── DAY/NIGHT UTILITIES ───────────────────────────────────────────────────────
/** Returns true between 09:00 and 18:00 local time */
export function isDaytime(): boolean {
  const h = new Date().getHours();
  return h >= 9 && h < 18;
}

/** Light-mode colour overrides for daytime display */
export const DayThemeCRS = {
  bg:            '#E8EAE8',
  text:          '#1A1A1A',
  textDim:       'rgba(26,26,26,0.75)',
  textFaint:     'rgba(26,26,26,0.45)',
  border:        'rgba(46,71,59,0.25)',
  cardBg:        'rgba(0,0,0,0.04)',
  cardBorder:    'rgba(0,0,0,0.10)',
  tickerBg:      'rgba(240,237,228,0.9)',
  tickerText:    '#2E473B',
  accentGreen:   '#2E473B',
  accentMustard: '#C2A85A',
  flashColor:    '#C2A85A',
};
