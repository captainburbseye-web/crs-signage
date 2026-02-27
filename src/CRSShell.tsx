import { useState, useEffect, useRef } from 'react';
import { C, T, Shadow } from './brand';
import AcousticFormulas from './AcousticFormulas';

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; overflow: hidden; background: #080808; }

@keyframes ledPulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px 2px currentColor; }
  50%       { opacity: 0.5; box-shadow: 0 0 2px 1px currentColor; }
}
@keyframes ledPricePulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.55; }
}
@keyframes frameIn {
  from { opacity: 0; transform: scale(1.008); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes frameOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes ambientDrift {
  0%, 100% { transform: translate(0px, 0px); }
  25%       { transform: translate(1px, -1px); }
  50%       { transform: translate(-1px, 1px); }
  75%       { transform: translate(1px, 1px); }
}
@keyframes scanLine {
  0%   { top: -2px; opacity: 0.5; }
  100% { top: 100%; opacity: 0; }
}
@keyframes crtFlicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.82; }
  94% { opacity: 1; }
  97% { opacity: 1; }
  98% { opacity: 0.88; }
}
@keyframes tickerScroll {
  0%   { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
`;

let cssInjected = false;
function injectGlobalCSS() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.textContent = GLOBAL_CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

// ─── CRS LOGO BLOCK ───────────────────────────────────────────────────────────
// Matches the real brand: off-white left cell "CR", mustard right cell "S",
// lime green underline under CR, black text, thick black border.
export function CRSLogoBlock({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const scale = size === 'lg' ? 1.6 : size === 'md' ? 1.1 : 0.7;
  const cellH = Math.round(44 * scale);
  const cellW = Math.round(38 * scale);
  const fontSize = Math.round(28 * scale);
  const borderW = Math.max(2, Math.round(3 * scale));
  const lineH = Math.max(2, Math.round(3 * scale));

  return (
    <div style={{
      display: 'inline-flex',
      border: `${borderW}px solid #111`,
      borderRadius: 3,
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
    }}>
      {/* Left cell — off-white, "CR" */}
      <div style={{
        width: cellW * 1.6,
        height: cellH,
        background: '#F0EDE4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRight: `${borderW}px solid #111`,
        paddingBottom: lineH + 2,
      }}>
        <span style={{
          fontFamily: T.display,
          fontSize,
          fontWeight: 700,
          color: '#111',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>CR</span>
        {/* Lime green underline */}
        <div style={{
          position: 'absolute',
          bottom: 4,
          left: '15%',
          right: '15%',
          height: lineH,
          background: C.stripeLime,
          borderRadius: 1,
        }} />
      </div>
      {/* Right cell — mustard, "S" */}
      <div style={{
        width: cellW,
        height: cellH,
        background: C.logoMustard,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: T.display,
          fontSize,
          fontWeight: 700,
          color: '#111',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>S</span>
      </div>
    </div>
  );
}

// ─── LED INDICATOR ────────────────────────────────────────────────────────────
export function LEDIndicator({
  color = C.ledGreen,
  glow,
  pulse = true,
  size = 8,
  style,
}: {
  color?: string;
  glow?: string;
  pulse?: boolean;
  size?: number;
  style?: React.CSSProperties;
}) {
  const glowShadow = glow ?? (
    color === C.ledGreen ? Shadow.ledGreen :
    color === C.ledAmber ? Shadow.ledAmber :
    color === C.ledRed   ? Shadow.ledRed   :
    Shadow.ledBrass
  );
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      color: color,
      boxShadow: glowShadow,
      animation: pulse ? 'ledPulse 2.4s ease-in-out infinite' : undefined,
      flexShrink: 0,
      ...style,
    }} />
  );
}

// ─── ANALOG VU METER ──────────────────────────────────────────────────────────
export function VUMeter({
  bars = 16,
  active = true,
  style,
}: {
  bars?: number;
  active?: boolean;
  style?: React.CSSProperties;
}) {
  const [levels, setLevels] = useState<number[]>(Array(bars).fill(20));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    let t = 0;
    const tick = () => {
      t += 0.04;
      setLevels(prev => prev.map((_, i) => {
        const base = 15 + Math.sin(t * 1.3 + i * 0.7) * 12;
        const spike = Math.random() > 0.93 ? Math.random() * 40 : 0;
        return Math.max(8, Math.min(95, base + spike + Math.sin(t * 2.1 + i) * 8));
      }));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, bars]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: 2,
      height: 40,
      padding: '3px 6px',
      background: C.lcdBg,
      boxShadow: Shadow.insetMeter,
      border: `1px solid ${C.border}`,
      borderRadius: 3,
      ...style,
    }}>
      {levels.map((h, i) => {
        const pct = h / 100;
        const isHot = pct > 0.8;
        const isMid = pct > 0.55;
        const barColor = isHot ? C.ledRed : isMid ? C.ledAmber : C.ledGreen;
        const barGlow  = isHot ? Shadow.ledRed : isMid ? Shadow.ledAmber : Shadow.ledGreen;
        return (
          <div key={i} style={{
            width: 3,
            height: `${h}%`,
            borderRadius: '1px 1px 0 0',
            background: barColor,
            boxShadow: barGlow,
            transition: 'height 0.08s ease-out, background 0.1s',
            opacity: 0.9,
          }} />
        );
      })}
    </div>
  );
}

// ─── TOGGLE SWITCH ────────────────────────────────────────────────────────────
export function ToggleSwitch({
  flipping = false,
  onComplete,
}: {
  flipping?: boolean;
  onComplete?: () => void;
}) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (!flipping) { setAngle(0); return; }
    setAngle(-38);
    const t1 = setTimeout(() => setAngle(38), 110);
    const t2 = setTimeout(() => { setAngle(0); onComplete?.(); }, 260);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [flipping, onComplete]);

  return (
    <div style={{
      width: 20, height: 44,
      backgroundImage: C.metalBg,
      borderRadius: 4,
      boxShadow: Shadow.insetSwitch,
      border: `1px solid ${C.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 8, height: 24,
        background: `linear-gradient(180deg, ${C.metalHighlight} 0%, ${C.metalMid} 100%)`,
        borderRadius: 3,
        boxShadow: Shadow.outsetKnob,
        border: `1px solid ${C.borderBright}`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'center bottom',
        transition: 'transform 0.07s cubic-bezier(0.25,0.46,0.45,0.94)',
      }} />
    </div>
  );
}

// ─── CRS BADGE (watermark) ────────────────────────────────────────────────────
export function CRSBadge() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '3rem', left: '2.5rem',
      opacity: 0.22, zIndex: 5, pointerEvents: 'none',
    }}>
      <CRSLogoBlock size="md" />
    </div>
  );
}

// ─── FRAME DOTS ───────────────────────────────────────────────────────────────
export function FrameDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 14 : 5,
          height: 4, borderRadius: 2,
          background: i === current ? C.logoMustard : C.border,
          boxShadow: i === current ? `0 0 4px ${C.logoMustard}` : undefined,
          transition: 'all 0.4s ease',
        }} />
      ))}
    </div>
  );
}

// ─── GRID TEXTURE ─────────────────────────────────────────────────────────────
export function GridTexture() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'repeating-linear-gradient(90deg, rgba(35,39,43,0.3) 0px, transparent 1px, transparent 2px, rgba(35,39,43,0.3) 3px)',
      opacity: 0.1, pointerEvents: 'none', zIndex: 1,
    }} />
  );
}

// ─── DEPTH LAYER ──────────────────────────────────────────────────────────────
export function DepthLayer() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 3,
      opacity: 0.06, pointerEvents: 'none',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(79,121,66,0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(212,166,0,0.12) 0%, transparent 50%)
      `,
      animation: 'ambientDrift 120s linear infinite',
    }} />
  );
}

// ─── VIDEO BACKGROUND ─────────────────────────────────────────────────────────
export function VideoBg({
  src,
  opacity = 0.18,
  objectFit = 'cover',
}: {
  src: string;
  opacity?: number;
  objectFit?: 'cover' | 'contain';
}) {
  return (
    <video
      autoPlay muted loop playsInline
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit,
        opacity,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

// ─── THREE-BUTTON ROW (from brand badge) ──────────────────────────────────────
function ThreeButtons() {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {[C.ledRed, C.ledAmber, C.stripeLime].map((col, i) => (
        <div key={i} style={{
          width: 10, height: 10,
          borderRadius: '50%',
          background: col,
          boxShadow: `0 0 5px 2px ${col}`,
          border: '1.5px solid rgba(0,0,0,0.4)',
        }} />
      ))}
    </div>
  );
}

// ─── CRS SHELL ────────────────────────────────────────────────────────────────
interface CRSShellProps {
  children: React.ReactNode;
  totalFrames?: number;
  currentFrame?: number;
  reelLabel?: string;
  showVU?: boolean;
}

export default function CRSShell({
  children,
  totalFrames,
  currentFrame,
  reelLabel = 'SIGNAL PATH',
  showVU = false,
}: CRSShellProps) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('en-GB', { hour12: false })
  );

  useEffect(() => {
    injectGlobalCSS();
    const id = setInterval(() =>
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false })), 1000
    );
    return () => clearInterval(id);
  }, []);

  // Strip heights — fixed px so the rack image is never squashed.
  // The images are pre-cropped strips; we scale them to fill the height
  // and let them tile/overflow horizontally rather than stretch.
  const HEADER_H = 72;
  const FOOTER_H = 56;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: C.bg,
      overflow: 'hidden',
      fontFamily: T.mono,
    }}>
      {/* Dark base */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: C.metalBg,
        opacity: 0.25,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── TOP STRIP — rack header image with CRS logo block overlay ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: HEADER_H,
        zIndex: 60,
        overflow: 'hidden',
      }}>
        {/* Rack header image — scale to strip height, tile horizontally */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/brand/rack-header-strip.png)',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'repeat-x',
        }} />
        {/* Overlay row: logo block left, reel label centre, LEDs + time right */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CRSLogoBlock size="sm" />
            <span style={{
              fontFamily: T.mono, fontSize: 9,
              letterSpacing: '0.22em', color: '#111',
              textTransform: 'uppercase',
              fontWeight: 600,
              textShadow: 'none',
              opacity: 0.85, // was 0.7 — raised to pass WCAG AA (4.41→5.36 on amber bg)
            }}>{reelLabel}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {showVU && <VUMeter bars={10} style={{ height: 18 }} />}
            <ThreeButtons />
            <span style={{
              fontFamily: T.mono, fontSize: 9,
              letterSpacing: '0.12em', color: '#111',
              opacity: 0.80, // was 0.65 — raised to pass WCAG AA (3.93→4.84 on amber bg)
            }}>{time}</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT between header and footer ── */}
      <div style={{
        position: 'absolute',
        top: HEADER_H,
        bottom: FOOTER_H,
        left: 0, right: 0,
        overflow: 'hidden',
        zIndex: 10,
      }}>
        {children}
        {/* Floating acoustic formulae — ambient layer, always present */}
        <AcousticFormulas opacity={0.09} />
      </div>

      {/* ── BOTTOM STRIP — rack footer image with contact strip overlay ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: FOOTER_H,
        zIndex: 60,
        overflow: 'hidden',
      }}>
        {/* Rack bottom image — scale to strip height, tile horizontally */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/brand/rack-bottom-strip.png)',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'repeat-x',
        }} />
        {/* Overlay row: address left, frame dots right */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CRSLogoBlock size="sm" />
            {/* Address removed — 8px is illegible at any viewing distance; ticker carries it */}
          </div>
          {totalFrames !== undefined && currentFrame !== undefined && (
            <FrameDots total={totalFrames} current={currentFrame} />
          )}
        </div>
      </div>
    </div>
  );
}
