import { useEffect, useRef, useState } from 'react';
import { C, T, Shadow } from './brand';

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; overflow: hidden; background: #080808; }

@keyframes ledPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@keyframes ledPricePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
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
  0%   { top: -2px; opacity: 0.6; }
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
`;

let cssInjected = false;
function injectGlobalCSS() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.textContent = GLOBAL_CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

// ─── SCREW HEAD ───────────────────────────────────────────────────────────────
function ScrewHead({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      width: 12, height: 12,
      borderRadius: '50%',
      background: `radial-gradient(circle at 35% 35%, ${C.metalHighlight}, ${C.screw})`,
      boxShadow: Shadow.outsetScrew,
      border: `1px solid ${C.border}`,
      position: 'relative',
      flexShrink: 0,
      ...style,
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '12%', right: '12%',
        height: 1.5, background: 'rgba(0,0,0,0.65)', transform: 'translateY(-50%)',
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: '12%', bottom: '12%',
        width: 1.5, background: 'rgba(0,0,0,0.65)', transform: 'translateX(-50%)',
      }} />
    </div>
  );
}

// ─── RACK EAR ─────────────────────────────────────────────────────────────────
function RackEar({ side }: { side: 'left' | 'right' }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0, bottom: 0,
      [side]: 0,
      width: 32,
      backgroundImage: C.metalBg,
      borderLeft:  side === 'right' ? `1px solid ${C.borderBright}` : undefined,
      borderRight: side === 'left'  ? `1px solid ${C.borderBright}` : undefined,
      boxShadow: side === 'left'
        ? 'inset -2px 0 6px rgba(0,0,0,0.6), 2px 0 4px rgba(0,0,0,0.4)'
        : 'inset 2px 0 6px rgba(0,0,0,0.6), -2px 0 4px rgba(0,0,0,0.4)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '16px 0',
    }}>
      {[0,1,2,3,4].map(i => <ScrewHead key={i} />)}
      {/* Rack unit tick marks */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        [side === 'left' ? 'right' : 'left']: 3,
        width: 1,
        background: `repeating-linear-gradient(
          180deg,
          ${C.border} 0px, ${C.border} 1px,
          transparent 1px, transparent 8px
        )`,
        opacity: 0.35,
      }} />
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

// ─── ENGRAVED AMBER PLATE ─────────────────────────────────────────────────────
function AmberPlate({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      backgroundImage: C.amberAcrylic,
      boxShadow: `${Shadow.outsetPlate}, inset 0 0 16px rgba(0,0,0,0.5)`,
      border: `1px solid rgba(194,168,90,0.3)`,
      borderRadius: 2,
      padding: '4px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── CRS BADGE ────────────────────────────────────────────────────────────────
export function CRSBadge() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '3rem', left: '2.5rem',
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      opacity: 0.3, zIndex: 5, pointerEvents: 'none',
    }}>
      <div style={{
        width: 30, height: 30,
        borderRadius: '50%',
        border: `1.5px solid ${C.brass}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.display,
        fontSize: '0.7rem', fontWeight: 700,
        color: C.brass, letterSpacing: '0.05em',
      }}>CRS</div>
      <div style={{
        fontFamily: T.mono,
        fontSize: '0.58rem', letterSpacing: '0.12em',
        color: C.brass, lineHeight: 1.4,
      }}>COWLEY ROAD<br />STUDIOS</div>
    </div>
  );
}

// ─── FRAME DOTS ───────────────────────────────────────────────────────────────
export function FrameDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={{
      display: 'flex', gap: 6, alignItems: 'center',
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 16 : 6,
          height: 5, borderRadius: 3,
          background: i === current ? C.brass : C.border,
          boxShadow: i === current ? Shadow.ledBrass : undefined,
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
      opacity: 0.12, pointerEvents: 'none', zIndex: 1,
    }} />
  );
}

// ─── DEPTH LAYER ──────────────────────────────────────────────────────────────
export function DepthLayer() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 3,
      opacity: 0.05, pointerEvents: 'none',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(79,121,66,0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(194,168,90,0.1) 0%, transparent 50%)
      `,
      animation: 'ambientDrift 120s linear infinite',
    }} />
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

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: C.bg,
      overflow: 'hidden',
      fontFamily: T.mono,
    }}>
      {/* Brushed metal base layer */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: C.metalBg,
        opacity: 0.35,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Rack ears */}
      <RackEar side="left" />
      <RackEar side="right" />

      {/* Main content inset between rack ears */}
      <div style={{
        position: 'absolute',
        top: 32, bottom: 32,
        left: 32, right: 32,
        overflow: 'hidden',
        zIndex: 10,
      }}>
        {children}
      </div>

      {/* TOP STRIP — engraved model plate */}
      <div style={{
        position: 'absolute',
        top: 0, left: 32, right: 32,
        height: 32,
        backgroundImage: C.metalBg,
        borderBottom: `1px solid ${C.border}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        zIndex: 60,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ScrewHead />
          <AmberPlate>
            <span style={{
              fontFamily: T.label, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', color: C.brass,
              textTransform: 'uppercase', textShadow: Shadow.ledBrass,
            }}>CRS</span>
          </AmberPlate>
          <span style={{
            fontFamily: T.mono, fontSize: 9,
            letterSpacing: '0.2em', color: C.textMute,
            textTransform: 'uppercase',
          }}>{reelLabel}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {showVU && <VUMeter bars={10} style={{ height: 18 }} />}
          <LEDIndicator color={C.ledGreen} size={7} />
          <span style={{
            fontFamily: T.mono, fontSize: 9,
            letterSpacing: '0.12em', color: C.textMute,
          }}>{time}</span>
          <ScrewHead />
        </div>
      </div>

      {/* BOTTOM STRIP — engraved contact plate */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 32, right: 32,
        height: 32,
        backgroundImage: C.metalBg,
        borderTop: `1px solid rgba(194,168,90,0.18)`,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        zIndex: 60,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ScrewHead />
          <span style={{
            fontFamily: T.mono, fontSize: 8,
            letterSpacing: '0.2em', color: C.textMute,
            textTransform: 'uppercase',
          }}>COWLEY ROAD STUDIOS · 118 COWLEY ROAD · OXFORD · OX4 1JE · CRSOXFORD.COM</span>
        </div>
        {totalFrames !== undefined && currentFrame !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FrameDots total={totalFrames} current={currentFrame} />
            <ScrewHead />
          </div>
        )}
      </div>
    </div>
  );
}
