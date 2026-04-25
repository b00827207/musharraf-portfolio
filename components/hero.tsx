'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { profile } from '@/lib/data';

// ============================================================================
// PARTICLE FIELD — raw data (chaotic) → structured funnel (ordered)
// Single canvas; particles tween between two target positions based on scroll
// progress passed in via the `organize` prop (0 = chaos, 1 = funnel).
// ============================================================================

type Particle = {
  // Chaos position
  cx: number;
  cy: number;
  // Order position (funnel target)
  ox: number;
  oy: number;
  // Render
  size: number;
  speed: number;
  phase: number;
  intensity: number;
};

function ParticleField({ organize }: { organize: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      // Re-seed particles relative to new size
      seed(w, h);
    };

    const seed = (w: number, h: number) => {
      const count = Math.min(110, Math.floor((w * h) / 11000));
      const arr: Particle[] = [];

      // Funnel target shape: a top-down narrowing trapezoid (the marketing funnel)
      // 4 stages, each with a rank
      const stages = 4;
      const stageHeight = h / (stages + 1);

      for (let i = 0; i < count; i++) {
        // Chaos = random scatter
        const cx = Math.random() * w;
        const cy = Math.random() * h;

        // Funnel = lay out particles into stage rows that narrow
        const stage = Math.floor(Math.random() * stages);
        const stageWidthAtTop = w * 0.55;
        const stageWidthAtBottom = w * 0.12;
        const t = stage / (stages - 1);
        const rowWidth = stageWidthAtTop * (1 - t) + stageWidthAtBottom * t;
        const ox = w / 2 + (Math.random() - 0.5) * rowWidth;
        const oy = stageHeight * (stage + 0.7) + (Math.random() - 0.5) * stageHeight * 0.5;

        arr.push({
          cx,
          cy,
          ox,
          oy,
          size: 0.6 + Math.random() * 1.6,
          speed: 0.3 + Math.random() * 0.7,
          phase: Math.random() * Math.PI * 2,
          intensity: 0.35 + Math.random() * 0.65,
        });
      }
      particlesRef.current = arr;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t0 = performance.now();
    const draw = (now: number) => {
      const dt = (now - t0) / 1000;
      t0 = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const o = organize; // 0..1
      const easeO = o * o * (3 - 2 * o); // smoothstep

      // Subtle scan line — only visible as we organize
      if (easeO > 0.05) {
        const scanY = (now / 18) % h;
        const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
        grad.addColorStop(0, 'rgba(91, 233, 233, 0)');
        grad.addColorStop(0.5, `rgba(91, 233, 233, ${0.04 * easeO})`);
        grad.addColorStop(1, 'rgba(91, 233, 233, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanY - 60, w, 120);
      }

      // Funnel guide rails (drawn underneath particles, fade in with organize)
      if (easeO > 0.1) {
        ctx.strokeStyle = `rgba(91, 233, 233, ${0.08 * easeO})`;
        ctx.lineWidth = 1;
        const stages = 4;
        const stageHeight = h / (stages + 1);
        const topW = w * 0.62;
        const botW = w * 0.16;
        for (let i = 0; i < stages; i++) {
          const t = i / (stages - 1);
          const rowW = topW * (1 - t) + botW * t;
          const y = stageHeight * (i + 0.7);
          ctx.beginPath();
          ctx.moveTo(w / 2 - rowW / 2, y);
          ctx.lineTo(w / 2 + rowW / 2, y);
          ctx.stroke();
        }
        // Side trapezoid edges
        ctx.beginPath();
        ctx.moveTo(w / 2 - topW / 2, stageHeight * 0.7);
        ctx.lineTo(w / 2 - botW / 2, stageHeight * (stages - 1 + 0.7));
        ctx.moveTo(w / 2 + topW / 2, stageHeight * 0.7);
        ctx.lineTo(w / 2 + botW / 2, stageHeight * (stages - 1 + 0.7));
        ctx.stroke();
      }

      // Particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift the chaos position so it feels alive
        const drift = Math.sin(now / 1000 * p.speed + p.phase);
        const cxNow = p.cx + drift * 8;
        const cyNow = p.cy + Math.cos(now / 1100 * p.speed + p.phase) * 6;

        const x = cxNow * (1 - easeO) + p.ox * easeO;
        const y = cyNow * (1 - easeO) + p.oy * easeO;

        // Color: bone (chaos) → signal cyan (organized)
        const r = Math.round(232 * (1 - easeO) + 91 * easeO);
        const g = Math.round(228 * (1 - easeO) + 233 * easeO);
        const b = Math.round(220 * (1 - easeO) + 233 * easeO);
        const alpha = p.intensity * (0.4 + 0.6 * (1 - Math.abs(0.5 - easeO) * 0.6));

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size * (1 + easeO * 0.3), 0, Math.PI * 2);
        ctx.fill();

        // Connector lines once organized (between adjacent particles in same row)
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []); // organize is read fresh each frame via closure update below

  // Bridge prop changes into the closure — simplest: use a ref
  const organizeRef = useRef(organize);
  useEffect(() => {
    organizeRef.current = organize;
  }, [organize]);

  // Replace the draw loop's read with the ref. We do this by re-assigning a getter:
  // Cleanest approach — since useEffect above captures `organize` once, we re-run draw
  // with a separate effect that reads the live ref. Refactor:
  // (Implementation note: the closure above captures `organize` at mount; since this
  // component is mounted once, the ref pattern below is what's actually used — see
  // the useEffect that reassigns organizeRef each render. The drawing closure reads
  // organizeRef.current via the closure on each frame.)

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

// Cleaner: inline the ref read. Rewrite ParticleField to read live organize.
// We export a corrected version below.

// ============================================================================
// HERO
// ============================================================================

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 0 = chaos, 1 = organized. The funnel-organize animation completes by the time
  // the user scrolls 80% of the hero out.
  const organize = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const [organizeValue, setOrganizeValue] = useState(0);

  useEffect(() => {
    const unsub = organize.on('change', setOrganizeValue);
    return () => unsub();
  }, [organize]);

  // Hero text fade out
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // Magnetic name effect
  const nameRef = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 18, stiffness: 200 });
  const sy = useSpring(my, { damping: 18, stiffness: 200 });

  const onNameMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = nameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const strength = 0.2;
    mx.set((e.clientX - cx) * strength);
    my.set((e.clientY - cy) * strength);
  };
  const onNameLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] w-full"
      id="thesis"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink-950">
        {/* Particle field */}
        <ParticleFieldFixed organize={organizeValue} />

        {/* Background grid — strengthens as we organize */}
        <div
          className="bg-schematic absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: 0.3 + organizeValue * 0.4 }}
          aria-hidden
        />

        {/* Schematic frame */}
        <div className="pointer-events-none absolute inset-x-6 inset-y-20 border border-signal/10 md:inset-x-10 md:inset-y-24" />
        <div className="pointer-events-none absolute inset-x-6 inset-y-20 md:inset-x-10 md:inset-y-24">
          <div className="bracket-tl bracket-tr bracket-bl bracket-br absolute inset-0" />
        </div>

        {/* Top schematic readouts */}
        <div className="absolute inset-x-6 top-24 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep md:inset-x-10 md:top-28">
          <span>FIG. 001 — RAW SIGNAL FIELD</span>
          <span className="hidden md:inline">N = 110 / FRAME ∂T = 16.6MS</span>
          <span className="tabular text-signal/60">
            ORGANIZE: {(organizeValue * 100).toFixed(1)}%
          </span>
        </div>

        {/* Hero copy */}
        <motion.div
          className="relative z-10 flex h-full flex-col justify-center px-6 md:px-10"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <div className="mx-auto w-full max-w-[1600px]">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-deep md:mb-12"
            >
              <span className="h-px w-8 bg-signal/40" />
              <span>{profile.thesis}</span>
              <span className="text-signal/50">·</span>
              <span>VOL. I</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-mega font-light text-bone">
              <motion.span
                className="block italic"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                I don't just
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-bone-deep line-through decoration-1">market</span>
                <span className="text-bone">.</span>
                <span className="text-bone"> I </span>
                <span className="italic text-signal">engineer</span>
              </motion.span>
              <motion.span
                className="block font-normal"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="italic">revenue</span>.
              </motion.span>
            </h1>

            {/* Name with magnetic effect */}
            <motion.div
              className="mt-12 flex flex-col items-start justify-between gap-6 md:mt-20 md:flex-row md:items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
                  ↳ Authored by
                </div>
                <motion.span
                  ref={nameRef}
                  onMouseMove={onNameMove}
                  onMouseLeave={onNameLeave}
                  data-cursor="hover"
                  className="mt-2 inline-block cursor-none font-display text-3xl font-light italic text-bone md:text-5xl"
                  style={{ x: sx, y: sy }}
                >
                  <span className="text-shimmer">{profile.name}</span>
                </motion.span>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim">
                  {profile.role}
                </div>
              </div>

              {/* Right-side data card */}
              <div className="relative w-full max-w-sm border border-signal/15 p-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-bone-dim md:w-auto">
                <div className="bracket-tl bracket-tr bracket-bl bracket-br absolute inset-0" />
                <div className="flex justify-between">
                  <span>STATUS</span>
                  <span className="text-signal">AVAILABLE — SEPT 26</span>
                </div>
                <div className="mt-1.5 flex justify-between">
                  <span>BASE</span>
                  <span className="text-bone">PARIS, FR</span>
                </div>
                <div className="mt-1.5 flex justify-between">
                  <span>EDU</span>
                  <span className="text-bone">ESSEC MIM · GMAT 735</span>
                </div>
                <div className="mt-1.5 flex justify-between">
                  <span>PHILOSOPHY</span>
                  <span className="text-ember">BMAD</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom: scroll indicator + funnel labels */}
        <div className="absolute inset-x-6 bottom-8 flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep md:inset-x-10 md:bottom-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="h-8 w-px bg-signal/40"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
            <div>
              <div className="text-bone-dim">SCROLL — observe</div>
              <div>chaos → architecture</div>
            </div>
          </div>

          {/* Funnel-stage labels appear when organized */}
          <motion.div
            className="hidden flex-col items-end gap-1 text-right text-signal/70 md:flex"
            style={{ opacity: organizeValue }}
          >
            <div>STAGE 01 — TOP / DISCOVERY</div>
            <div>STAGE 02 — CONSIDERATION</div>
            <div>STAGE 03 — INTENT</div>
            <div>STAGE 04 — CONVERSION</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CORRECTED PARTICLE FIELD — reads `organize` live each frame via ref
// ============================================================================
function ParticleFieldFixed({ organize }: { organize: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const organizeRef = useRef(organize);

  useEffect(() => {
    organizeRef.current = organize;
  }, [organize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    const seed = (w: number, h: number) => {
      const count = Math.min(110, Math.floor((w * h) / 11000));
      const arr: Particle[] = [];
      const stages = 4;
      const stageHeight = h / (stages + 1);
      for (let i = 0; i < count; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const stage = Math.floor(Math.random() * stages);
        const stageWidthAtTop = w * 0.55;
        const stageWidthAtBottom = w * 0.12;
        const t = stage / (stages - 1);
        const rowWidth = stageWidthAtTop * (1 - t) + stageWidthAtBottom * t;
        const ox = w / 2 + (Math.random() - 0.5) * rowWidth;
        const oy = stageHeight * (stage + 0.7) + (Math.random() - 0.5) * stageHeight * 0.5;
        arr.push({
          cx, cy, ox, oy,
          size: 0.6 + Math.random() * 1.6,
          speed: 0.3 + Math.random() * 0.7,
          phase: Math.random() * Math.PI * 2,
          intensity: 0.35 + Math.random() * 0.65,
        });
      }
      particlesRef.current = arr;
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      seed(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const draw = (now: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const o = Math.max(0, Math.min(1, organizeRef.current));
      const easeO = o * o * (3 - 2 * o);

      // Funnel guide rails
      if (easeO > 0.1) {
        ctx.strokeStyle = `rgba(91, 233, 233, ${0.08 * easeO})`;
        ctx.lineWidth = 1;
        const stages = 4;
        const stageHeight = h / (stages + 1);
        const topW = w * 0.62;
        const botW = w * 0.16;
        for (let i = 0; i < stages; i++) {
          const t = i / (stages - 1);
          const rowW = topW * (1 - t) + botW * t;
          const y = stageHeight * (i + 0.7);
          ctx.beginPath();
          ctx.moveTo(w / 2 - rowW / 2, y);
          ctx.lineTo(w / 2 + rowW / 2, y);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(w / 2 - topW / 2, stageHeight * 0.7);
        ctx.lineTo(w / 2 - botW / 2, stageHeight * (stages - 1 + 0.7));
        ctx.moveTo(w / 2 + topW / 2, stageHeight * 0.7);
        ctx.lineTo(w / 2 + botW / 2, stageHeight * (stages - 1 + 0.7));
        ctx.stroke();
      }

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const drift = Math.sin(now / 1000 * p.speed + p.phase);
        const cxNow = p.cx + drift * 8;
        const cyNow = p.cy + Math.cos(now / 1100 * p.speed + p.phase) * 6;
        const x = cxNow * (1 - easeO) + p.ox * easeO;
        const y = cyNow * (1 - easeO) + p.oy * easeO;
        const r = Math.round(232 * (1 - easeO) + 91 * easeO);
        const g = Math.round(228 * (1 - easeO) + 233 * easeO);
        const b = Math.round(220 * (1 - easeO) + 233 * easeO);
        const alpha = p.intensity * (0.4 + 0.6 * (1 - Math.abs(0.5 - easeO) * 0.6));
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size * (1 + easeO * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
