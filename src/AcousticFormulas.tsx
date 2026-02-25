import { useEffect, useRef } from 'react';

// ─── ACOUSTIC FORMULAE ────────────────────────────────────────────────────────
// A curated set of real acoustic / audio engineering equations rendered as
// ambient floating text. They drift slowly across the panel at low opacity,
// giving the signage a technical depth without competing with content.

const FORMULAE = [
  // Room acoustics
  { tex: 'RT₆₀ = 0.161 · V / A',           label: 'Sabine reverberation time' },
  { tex: 'A = Σ αᵢSᵢ',                      label: 'Total absorption' },
  { tex: 'RT₆₀ = 0.161 · V / (−S · ln(1−ᾱ))', label: 'Eyring reverberation' },
  { tex: 'Lp = 20 log₁₀(p / p₀)',           label: 'Sound pressure level' },
  { tex: 'Lw = 10 log₁₀(W / W₀)',           label: 'Sound power level' },
  { tex: 'λ = c / f',                        label: 'Wavelength' },
  { tex: 'c = 331.3 + 0.606T',              label: 'Speed of sound (°C)' },
  { tex: 'f₀ = 1 / (2π√LC)',                label: 'Resonant frequency' },
  { tex: 'Q = f₀ / Δf',                     label: 'Q factor' },
  { tex: 'NRC = (α₂₅₀ + α₅₀₀ + α₁₀₀₀ + α₂₀₀₀) / 4', label: 'Noise reduction coeff.' },
  { tex: 'IL = Lp₁ − Lp₂',                 label: 'Insertion loss' },
  { tex: 'STC = Rw + C',                    label: 'Sound transmission class' },
  { tex: 'Δf = f / Q',                      label: 'Bandwidth' },
  { tex: 'Z = ρc',                           label: 'Acoustic impedance' },
  { tex: 'p = ρ · c · v',                   label: 'Acoustic pressure' },
  { tex: 'I = p² / (2ρc)',                  label: 'Acoustic intensity' },
  { tex: 'D/R = 10 log₁₀(Q / 4πr²) + 10 log₁₀(4 / R)', label: 'Direct-to-reverb ratio' },
  { tex: 'fc = 0.55 / (m · c)',             label: 'Critical frequency' },
  { tex: 'IACC = max|φ_{LR}(τ)|',          label: 'Interaural cross-correlation' },
  { tex: 'Δt < 35ms',                       label: 'Haas effect threshold' },
  { tex: 'G = 10 log₁₀(p² / p²_free)',     label: 'Strength factor' },
  { tex: 'EDT = 6 · T₁₀',                  label: 'Early decay time approx.' },
  { tex: 'C₈₀ = 10 log₁₀(∫₀⁸⁰ p²dt / ∫₈₀^∞ p²dt)', label: 'Clarity (music)' },
  { tex: 'D₅₀ = ∫₀⁵⁰ p²dt / ∫₀^∞ p²dt',  label: 'Definition (speech)' },
];

interface FloatingFormula {
  id: number;
  formula: typeof FORMULAE[0];
  x: number;      // % from left
  y: number;      // % from top
  vx: number;     // px/frame
  vy: number;     // px/frame
  opacity: number;
  phase: number;  // breathing cycle offset
  size: number;   // font size rem
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function pickFormula(used: Set<number>): typeof FORMULAE[0] {
  const available = FORMULAE.filter((_, i) => !used.has(i));
  if (!available.length) { used.clear(); return FORMULAE[Math.floor(Math.random() * FORMULAE.length)]; }
  const idx = Math.floor(Math.random() * available.length);
  const globalIdx = FORMULAE.indexOf(available[idx]);
  used.add(globalIdx);
  return available[idx];
}

const FORMULA_COUNT = 5;   // simultaneous visible formulae
const SPEED = 0.12;        // px/frame base speed

export default function AcousticFormulas({ opacity = 0.08 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef<FloatingFormula[]>([]);
  const rafRef    = useRef<number>(0);
  const usedRef   = useRef<Set<number>>(new Set());

  function spawn(id: number): FloatingFormula {
    return {
      id,
      formula: pickFormula(usedRef.current),
      x: randomBetween(5, 85),
      y: randomBetween(10, 85),
      vx: randomBetween(-SPEED, SPEED) || SPEED * 0.5,
      vy: randomBetween(-SPEED * 0.4, SPEED * 0.4),
      opacity: randomBetween(0.4, 1.0),
      phase: randomBetween(0, Math.PI * 2),
      size: randomBetween(0.55, 0.85),
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Initialise formulae
    stateRef.current = Array.from({ length: FORMULA_COUNT }, (_, i) => spawn(i));

    let frame = 0;
    const tick = () => {
      frame++;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      stateRef.current = stateRef.current.map(f => {
        // Move
        let nx = f.x + f.vx;
        let ny = f.y + f.vy;
        let nvx = f.vx;
        let nvy = f.vy;

        // Bounce off edges (with margin)
        if (nx < 2 || nx > 92) nvx = -nvx;
        if (ny < 5 || ny > 90) nvy = -nvy;
        nx = Math.max(2, Math.min(92, nx));
        ny = Math.max(5, Math.min(90, ny));

        // Breathing opacity
        const breathe = 0.5 + 0.5 * Math.sin(frame * 0.008 + f.phase);
        const drawOpacity = f.opacity * breathe * opacity;

        // Draw
        const px = (nx / 100) * W;
        const py = (ny / 100) * H;
        const fontSize = Math.round(f.size * 13);

        ctx.save();
        ctx.globalAlpha = drawOpacity;
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = '#C2A85A';  // brass
        ctx.fillText(f.formula.tex, px, py);

        // Sub-label
        ctx.globalAlpha = drawOpacity * 0.55;
        ctx.font = `${Math.round(fontSize * 0.72)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = '#4F7942';  // structural green
        ctx.fillText(f.formula.label, px, py + fontSize * 1.2);
        ctx.restore();

        return { ...f, x: nx, y: ny, vx: nvx, vy: nvy };
      });

      // Occasionally respawn one formula with a new one
      if (frame % 420 === 0) {
        const idx = Math.floor(Math.random() * stateRef.current.length);
        stateRef.current[idx] = spawn(stateRef.current[idx].id);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 4,
      }}
    />
  );
}
