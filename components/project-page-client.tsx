'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import type { Project } from '@/lib/data';

// ============================================================================
// PROJECT DETAIL — full-bleed hero, 2-col layout (BMAD strategy + embed),
// metric grid, artifacts list, next-project transition.
// ============================================================================

export function ProjectPageClient({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const accentColor = project.hero.accent === 'signal' ? '#5BE9E9' : '#E8A14B';
  const accentClass = project.hero.accent === 'signal' ? 'text-signal' : 'text-ember';
  const accentBgClass =
    project.hero.accent === 'signal' ? 'bg-signal' : 'bg-ember';

  return (
    <main className="relative min-h-screen bg-ink-950">
      <ProjectHero project={project} accentColor={accentColor} accentClass={accentClass} />

      {/* Two-column body */}
      <section className="relative border-t border-signal/10 bg-ink-950 py-20 md:py-32">
        <div className="bg-schematic absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
          {/* Section label */}
          <div className="mb-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70 md:mb-16">
            <span className="h-px w-8 bg-signal/40" />
            <span>SECTION 02 / SYSTEM ARCHITECTURE</span>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            {/* LEFT: BMAD Strategy */}
            <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
              <BMADColumn project={project} accentClass={accentClass} />
            </div>

            {/* RIGHT: Embed + Metrics */}
            <div className="md:col-span-7">
              <EmbedColumn project={project} accentColor={accentColor} accentClass={accentClass} />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <MetricsStrip project={project} accentClass={accentClass} />

      {/* Artifacts + Stack */}
      <ArtifactsSection project={project} accentClass={accentClass} />

      {/* Next Project transition */}
      <NextProject current={project} next={nextProject} />
    </main>
  );
}

// ============================================================================
// HERO
// ============================================================================
function ProjectHero({
  project,
  accentColor,
  accentClass,
}: {
  project: Project;
  accentColor: string;
  accentClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Animated background — large generative scene */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <ProjectHeroArt project={project} accentColor={accentColor} />
      </motion.div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950" />

      {/* Top schematic readouts */}
      <div className="absolute inset-x-6 top-24 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep md:inset-x-10 md:top-28">
        <Link href="/#projects" data-cursor="hover" className="group flex items-center gap-2 text-bone-dim hover:text-signal">
          <svg width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M10 6H2M2 6L6 2M2 6L6 10" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <span>RETURN — INDEX</span>
        </Link>
        <span>{project.year} / {project.location}</span>
      </div>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-10 md:pb-32"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          {/* Eyebrow */}
          <div className={`mb-8 font-mono text-[10px] uppercase tracking-[0.3em] ${accentClass}`}>
            {project.hero.eyebrow}
          </div>

          {/* Index + Client */}
          <div className="mb-6 flex items-end gap-6">
            <span className={`font-display text-7xl font-light italic md:text-9xl ${accentClass}`}>
              {project.index}
            </span>
            <div className="pb-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-deep">
                {project.client}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim">
                {project.subtitle}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-huge font-light leading-[0.95] text-bone">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {project.title}
            </motion.span>
          </h1>

          {/* Headline statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-8 max-w-3xl font-display text-xl font-light italic leading-snug text-bone-dim md:text-3xl"
          >
            {project.hero.headline}
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <div className="absolute inset-x-6 bottom-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep md:inset-x-10 md:bottom-8">
        <span>SCROLL — DECONSTRUCT</span>
        <motion.div
          className="h-8 w-px bg-signal/40"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// HERO ART — large generative composition per category (matching home cards)
// ----------------------------------------------------------------------------
function ProjectHeroArt({ project, accentColor }: { project: Project; accentColor: string }) {
  // Use a giant version of the project's category artwork.
  return (
    <div className="absolute inset-0 bg-ink-900">
      <div className="bg-schematic absolute inset-0 opacity-30" />

      {/* Category-specific large composition */}
      {project.category === 'GROWTH' && <HeroGrowth accentColor={accentColor} />}
      {project.category === 'STRATEGY' && <HeroStrategy accentColor={accentColor} />}
      {project.category === 'BRAND' && <HeroBrand accentColor={accentColor} />}
      {project.category === 'OPERATIONS' && <HeroOperations accentColor={accentColor} />}

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 70%, ${accentColor}22, transparent 60%)`,
        }}
      />
    </div>
  );
}

function HeroGrowth({ accentColor }: { accentColor: string }) {
  return (
    <svg viewBox="0 0 1600 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hg-line" x1="0" x2="1">
          <stop offset="0" stopColor={accentColor} stopOpacity="0.05" />
          <stop offset="1" stopColor={accentColor} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {/* Funnel guide */}
      <g opacity="0.2">
        <line x1="200" y1="200" x2="1400" y2="200" stroke={accentColor} strokeDasharray="2 6" />
        <line x1="350" y1="425" x2="1250" y2="425" stroke={accentColor} strokeDasharray="2 6" />
        <line x1="500" y1="650" x2="1100" y2="650" stroke={accentColor} strokeDasharray="2 6" />
      </g>
      {/* Bars */}
      {Array.from({ length: 24 }).map((_, i) => {
        const h = 0.3 + 0.65 * (i / 23) + Math.sin(i * 0.7) * 0.08;
        return (
          <motion.rect
            key={i}
            x={150 + i * 56}
            y={900 - h * 600}
            width="42"
            height={h * 600}
            fill={accentColor}
            fillOpacity="0.08"
            stroke={accentColor}
            strokeOpacity="0.3"
            strokeWidth="0.5"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.04, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'bottom' }}
          />
        );
      })}
    </svg>
  );
}

function HeroStrategy({ accentColor }: { accentColor: string }) {
  const nodes = [
    { x: 400, y: 450, r: 35, primary: false },
    { x: 700, y: 280, r: 25, primary: false },
    { x: 700, y: 620, r: 28, primary: false },
    { x: 1000, y: 450, r: 60, primary: true },
    { x: 1300, y: 250, r: 22, primary: false },
    { x: 1300, y: 650, r: 18, primary: false },
    { x: 250, y: 250, r: 20, primary: false },
    { x: 250, y: 650, r: 24, primary: false },
    { x: 1450, y: 450, r: 16, primary: false },
  ];
  const edges = [[0,1],[0,2],[0,3],[1,3],[2,3],[3,4],[3,5],[3,8],[0,6],[0,7]];
  return (
    <svg viewBox="0 0 1600 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={accentColor}
          strokeOpacity={nodes[a].primary || nodes[b].primary ? 0.6 : 0.15}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: i * 0.1 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r={n.r} fill="none" stroke={accentColor} strokeOpacity={n.primary ? 0.8 : 0.3} strokeWidth={n.primary ? 1.5 : 1} />
          <circle cx={n.x} cy={n.y} r={n.r * 0.35} fill={accentColor} fillOpacity={n.primary ? 0.7 : 0.15} />
          {n.primary && (
            <circle cx={n.x} cy={n.y} r={n.r + 25} fill="none" stroke={accentColor} strokeOpacity="0.2" strokeDasharray="4 4" />
          )}
        </motion.g>
      ))}
    </svg>
  );
}

function HeroBrand({ accentColor }: { accentColor: string }) {
  return (
    <svg viewBox="0 0 1600 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g transform="translate(800, 450)">
        {[100, 180, 260, 340, 420].map((r, i) => (
          <motion.circle
            key={i}
            r={r}
            fill="none"
            stroke={accentColor}
            strokeOpacity={0.45 - i * 0.06}
            strokeWidth="0.8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {[100, 180, 260, 340, 420].map((r, i) => {
          const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <circle cx={x} cy={y} r="8" fill={accentColor} />
              <circle cx={x} cy={y} r="20" fill="none" stroke={accentColor} strokeOpacity="0.4" />
            </motion.g>
          );
        })}
        <circle r="14" fill={accentColor} />
      </g>
    </svg>
  );
}

function HeroOperations({ accentColor }: { accentColor: string }) {
  return (
    <svg viewBox="0 0 1600 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 24 }).map((_, col) =>
        Array.from({ length: 12 }).map((_, row) => {
          const isActive = (col * 7 + row * 3) % 5 !== 0;
          const intensity = ((col + row * 3) % 7) / 7;
          return (
            <motion.rect
              key={`${col}-${row}`}
              x={70 + col * 60}
              y={50 + row * 65}
              width="50"
              height="50"
              fill={isActive ? accentColor : 'transparent'}
              fillOpacity={isActive ? 0.05 + intensity * 0.4 : 0}
              stroke={accentColor}
              strokeOpacity={isActive ? 0.25 + intensity * 0.4 : 0.08}
              strokeWidth="0.6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (col + row) * 0.02, duration: 0.5 }}
              style={{ transformOrigin: 'center' }}
            />
          );
        })
      )}
    </svg>
  );
}

// ============================================================================
// BMAD Column
// ============================================================================
function BMADColumn({ project, accentClass }: { project: Project; accentClass: string }) {
  const phases = [
    { glyph: 'B', label: 'BUILD', text: project.bmad.build },
    { glyph: 'M', label: 'MEASURE', text: project.bmad.measure },
    { glyph: 'A', label: 'ANALYZE', text: project.bmad.analyze },
    { glyph: 'D', label: 'DEPLOY', text: project.bmad.deploy },
  ];

  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-deep">
        BMAD STRATEGY
      </div>
      <h2 className="mt-2 font-display text-3xl font-light leading-tight text-bone md:text-4xl">
        How the system was <span className={`italic ${accentClass}`}>architected</span>.
      </h2>

      <p className="mt-6 text-base leading-relaxed text-bone-dim">{project.summary}</p>

      <div className="mt-10 space-y-6">
        {phases.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-[40px_1fr] gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-signal/30 bg-ink-950">
              <span className={`font-display text-lg italic ${accentClass}`}>{p.glyph}</span>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-signal/70">
                {p.label}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-bone-dim">{p.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Embed Column — interactive surface (charts / dashboards / iframe placeholders)
// ============================================================================
function EmbedColumn({
  project,
  accentColor,
  accentClass,
}: {
  project: Project;
  accentColor: string;
  accentClass: string;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-deep">
        INTERACTIVE SURFACE
      </div>
      <h2 className="mt-2 font-display text-3xl font-light leading-tight text-bone md:text-4xl">
        Where <span className={`italic ${accentClass}`}>the data</span> lives.
      </h2>

      {/* Embed container — designed to host iframes / Figma / dashboards */}
      <div className="relative mt-8 border border-signal/15 bg-ink-900">
        <div className="bracket-tl bracket-tr bracket-bl bracket-br absolute inset-0" />
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-signal/10 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.22em]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-signal" />
            <span className="text-bone-dim">{project.embed?.type.toUpperCase()} · LIVE</span>
          </div>
          <span className="text-bone-deep">{project.slug}.embed</span>
        </div>

        {/* Embed body — renders the appropriate live preview */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <EmbedRenderer project={project} accentColor={accentColor} />
        </div>

        {/* Note */}
        <div className="border-t border-signal/10 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-bone-deep">
          ↳ {project.embed?.note}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// EMBED RENDERER — switches between dashboard, figma, iframe, video
// All rendered as styled, animated SVG simulations until real assets are wired.
// Real iframes can be dropped in by replacing the content here.
// ----------------------------------------------------------------------------
function EmbedRenderer({ project, accentColor }: { project: Project; accentColor: string }) {
  // Switch by category for variety; all are interactive simulations.
  if (project.category === 'GROWTH') return <DashboardEmbed accentColor={accentColor} project={project} />;
  if (project.category === 'STRATEGY' && project.slug === 'marselia-vertical-integration')
    return <ScenarioEmbed accentColor={accentColor} />;
  if (project.category === 'STRATEGY' && project.slug === 'comtesse-trade-marketing')
    return <RoadmapEmbed accentColor={accentColor} />;
  if (project.category === 'BRAND') return <ArchetypeEmbed accentColor={accentColor} />;
  if (project.category === 'OPERATIONS') return <GanttEmbed accentColor={accentColor} />;
  return <DashboardEmbed accentColor={accentColor} project={project} />;
}

// Dashboard simulation — for Crio.Do
function DashboardEmbed({ project, accentColor }: { project: Project; accentColor: string }) {
  return (
    <div className="absolute inset-0 bg-ink-950 p-5">
      <div className="grid h-full grid-cols-3 gap-3">
        {/* Big chart */}
        <div className="col-span-2 border border-signal/10 bg-ink-900 p-4">
          <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-bone-deep">
            PIPELINE VELOCITY · L4M
          </div>
          <div className="mt-1 font-display text-2xl font-light text-bone">28.6%</div>
          <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-signal">
            ↑ +12pp vs team avg.
          </div>
          <svg viewBox="0 0 400 160" className="mt-3 h-[calc(100%-64px)] w-full">
            <defs>
              <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Gridlines */}
            {[40, 80, 120].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={accentColor} strokeOpacity="0.05" />
            ))}
            {/* Area + line */}
            <motion.path
              d="M0,120 L40,108 L80,98 L120,82 L160,72 L200,60 L240,52 L280,40 L320,32 L360,22 L400,18 L400,160 L0,160 Z"
              fill="url(#dash-fill)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M0,120 L40,108 L80,98 L120,82 L160,72 L200,60 L240,52 L280,40 L320,32 L360,22 L400,18"
              fill="none"
              stroke={accentColor}
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            />
          </svg>
        </div>
        {/* Side stack */}
        <div className="flex flex-col gap-3">
          <div className="flex-1 border border-signal/10 bg-ink-900 p-3">
            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone-deep">CYCLE</div>
            <div className="font-display text-xl font-light text-bone">9.2<span className="font-mono text-[10px] text-bone-dim">d</span></div>
            <div className="mt-1 font-mono text-[8px] text-signal">↓ from 11.6d</div>
          </div>
          <div className="flex-1 border border-signal/10 bg-ink-900 p-3">
            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone-deep">REV.</div>
            <div className="font-display text-xl font-light text-bone">₹4.2<span className="font-mono text-[10px] text-bone-dim">M</span></div>
            <div className="mt-1 font-mono text-[8px] text-signal">20.3% topline</div>
          </div>
          <div className="flex-1 border border-signal/10 bg-ink-900 p-3">
            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone-deep">ACCOUNTS</div>
            <div className="font-display text-xl font-light text-bone">124<span className="font-mono text-[10px] text-bone-dim">+</span></div>
            <div className="mt-1 font-mono text-[8px] text-bone-dim">3 clusters</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scenario embed — Marselia 3-scenario chart
function ScenarioEmbed({ accentColor }: { accentColor: string }) {
  const scenarios = [
    { name: 'BEAR', y3: 4.8, color: 'rgba(232, 161, 75, 0.5)' },
    { name: 'BASE', y3: 8.4, color: accentColor },
    { name: 'BULL', y3: 11.2, color: 'rgba(91, 233, 233, 0.5)' },
  ];
  return (
    <div className="absolute inset-0 bg-ink-950 p-5">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-deep">
        Y3 EBITDA CONVERGENCE · €M
      </div>
      <svg viewBox="0 0 600 280" className="mt-3 h-[calc(100%-32px)] w-full">
        {/* Y-axis labels */}
        {[0, 4, 8, 12].map((v, i) => (
          <g key={i}>
            <text x="20" y={250 - (v / 12) * 220 + 4} fontSize="8" fontFamily="monospace" fill="rgba(168, 164, 154, 0.6)">
              {v}M
            </text>
            <line x1="48" y1={250 - (v / 12) * 220} x2="580" y2={250 - (v / 12) * 220} stroke={accentColor} strokeOpacity="0.07" />
          </g>
        ))}
        {/* Scenario lines */}
        {scenarios.map((s, i) => {
          const points = Array.from({ length: 13 }).map((_, m) => {
            const t = m / 12;
            const eased = t * t * (3 - 2 * t);
            const v = s.y3 * eased;
            return `${48 + (m / 12) * 532},${250 - (v / 12) * 220}`;
          });
          return (
            <g key={s.name}>
              <motion.polyline
                points={points.join(' ')}
                fill="none"
                stroke={s.color}
                strokeWidth={s.name === 'BASE' ? 2 : 1}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2.5, delay: i * 0.3 }}
                viewport={{ once: true }}
              />
              <motion.text
                x={585}
                y={250 - (s.y3 / 12) * 220 + 3}
                fontSize="9"
                fontFamily="monospace"
                fill={s.color}
                textAnchor="end"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2 }}
                viewport={{ once: true }}
              >
                {s.name} {s.y3}M
              </motion.text>
            </g>
          );
        })}
        {/* Payback marker */}
        <line x1={48 + (33.7 / 36) * 532} y1="30" x2={48 + (33.7 / 36) * 532} y2="250" stroke={accentColor} strokeOpacity="0.3" strokeDasharray="2 4" />
        <text x={48 + (33.7 / 36) * 532 - 3} y="25" fontSize="8" fontFamily="monospace" fill={accentColor} textAnchor="end">
          PAYBACK · 33.7mo
        </text>
      </svg>
    </div>
  );
}

// Roadmap embed — Comtesse 24-month
function RoadmapEmbed({ accentColor }: { accentColor: string }) {
  const phases = [
    { label: 'P1 — DIAGNOSTIC', start: 0, end: 4, color: 'rgba(232, 161, 75, 0.6)' },
    { label: 'P2 — ACTIVATE', start: 4, end: 12, color: accentColor },
    { label: 'P3 — SCALE', start: 12, end: 18, color: 'rgba(91, 233, 233, 0.7)' },
    { label: 'P4 — GOVERN', start: 18, end: 24, color: 'rgba(91, 233, 233, 0.4)' },
  ];
  return (
    <div className="absolute inset-0 bg-ink-950 p-5">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-deep">
        24-MONTH ROADMAP · 4 PHASES · KPI GATES
      </div>
      <div className="mt-4 space-y-2">
        {phases.map((p, i) => (
          <div key={p.label}>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-dim">{p.label}</div>
            <div className="mt-1 h-6 rounded-sm bg-ink-900">
              <motion.div
                className="relative h-full"
                style={{ width: `${((p.end - p.start) / 24) * 100}%`, marginLeft: `${(p.start / 24) * 100}%`, background: p.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${((p.end - p.start) / 24) * 100}%` }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <div className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.15em] text-ink-950">
                  M{p.end}
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 border-t border-signal/10 pt-4 font-mono text-[9px] uppercase tracking-[0.22em]">
        <div>
          <div className="text-bone-deep">REV TARGET</div>
          <div className="text-signal">€23M</div>
        </div>
        <div>
          <div className="text-bone-deep">EBITDA</div>
          <div className="text-signal">€3M</div>
        </div>
        <div>
          <div className="text-bone-deep">CAPEX ROI</div>
          <div className="text-signal">4×</div>
        </div>
      </div>
    </div>
  );
}

// Archetype embed — Bvlgari customer canvas
function ArchetypeEmbed({ accentColor }: { accentColor: string }) {
  const segments = [
    { name: 'INHERITOR', aov: 145, freq: 0.3, ltv: 42.9 },
    { name: 'CULTURAL COLLECTOR', aov: 22, freq: 0.7, ltv: 38.4 },
    { name: 'NEW WEALTH', aov: 35, freq: 0.5, ltv: 28.1 },
    { name: 'LOYALIST', aov: 18, freq: 0.85, ltv: 31.2 },
    { name: 'OCCASIONAL', aov: 8, freq: 0.4, ltv: 23.2 },
  ];
  return (
    <div className="absolute inset-0 bg-ink-950 p-5">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-deep">
        CRM SEGMENTATION · 2.4M GLOBAL · AOV × FREQUENCY
      </div>
      <svg viewBox="0 0 600 280" className="mt-3 h-[calc(100%-32px)] w-full">
        {/* Axes */}
        <line x1="60" y1="240" x2="580" y2="240" stroke={accentColor} strokeOpacity="0.2" />
        <line x1="60" y1="20" x2="60" y2="240" stroke={accentColor} strokeOpacity="0.2" />
        <text x="60" y="262" fontSize="8" fontFamily="monospace" fill="rgba(168, 164, 154, 0.6)">FREQUENCY →</text>
        <text x="20" y="20" fontSize="8" fontFamily="monospace" fill="rgba(168, 164, 154, 0.6)">↑ AOV ($K)</text>
        {/* Bubbles */}
        {segments.map((s, i) => {
          const x = 60 + s.freq * 500;
          const y = 240 - (s.aov / 150) * 200;
          const r = 8 + s.ltv * 0.4;
          const isPrimary = s.name === 'INHERITOR' || s.name === 'CULTURAL COLLECTOR';
          return (
            <motion.g
              key={s.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <circle cx={x} cy={y} r={r} fill={accentColor} fillOpacity={isPrimary ? 0.4 : 0.12} stroke={accentColor} strokeOpacity={isPrimary ? 0.9 : 0.4} />
              <text x={x + r + 4} y={y + 3} fontSize="8" fontFamily="monospace" fill={isPrimary ? accentColor : 'rgba(232, 228, 220, 0.7)'}>
                {s.name} · ${s.aov}K · {s.ltv}× LTV
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

// Gantt embed — KNR 70+ events
function GanttEmbed({ accentColor }: { accentColor: string }) {
  const tracks = Array.from({ length: 8 }).map((_, i) => ({
    label: `ZONE ${String.fromCharCode(65 + i)}`,
    blocks: Array.from({ length: 4 }).map((_, j) => ({
      start: Math.random() * 0.5 + j * 0.2,
      width: 0.08 + Math.random() * 0.12,
      success: Math.random() > 0.1,
    })),
  }));
  return (
    <div className="absolute inset-0 bg-ink-950 p-5">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-deep">
        ROTATIONAL STAFFING — 70+ EVENTS · 8 ZONES · 18 MONTHS
      </div>
      <div className="mt-4 space-y-2">
        {tracks.map((t, i) => (
          <div key={i} className="grid grid-cols-[60px_1fr] items-center gap-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-dim">{t.label}</div>
            <div className="relative h-4 bg-ink-900">
              {t.blocks.map((b, j) => (
                <motion.div
                  key={j}
                  className="absolute h-full"
                  style={{
                    left: `${b.start * 100}%`,
                    width: `${b.width * 100}%`,
                    background: b.success ? accentColor : 'rgba(232, 161, 75, 0.7)',
                    opacity: 0.6,
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: i * 0.05 + j * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between border-t border-signal/10 pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-bone-dim">
        <span>JAN '23</span>
        <span>JUN '23</span>
        <span>JAN '24</span>
        <span>JUN '24</span>
      </div>
    </div>
  );
}

// ============================================================================
// METRICS STRIP
// ============================================================================
function MetricsStrip({ project, accentClass }: { project: Project; accentClass: string }) {
  return (
    <section className="relative border-y border-signal/10 bg-ink-900 py-16 md:py-20">
      <div className="bg-schematic absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
          <span className="h-px w-8 bg-signal/40" />
          <span>SECTION 03 / OUTPUTS QUANTIFIED</span>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-6">
          {project.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              viewport={{ once: true }}
              className="border-l border-signal/20 pl-4"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep">
                {m.label}
              </div>
              <div className="mt-2 font-display text-3xl font-light leading-none md:text-5xl">
                <span className={`tabular ${accentClass}`}>{m.value}</span>
                {m.unit && (
                  <span className="ml-1 font-mono text-base not-italic text-bone-dim">{m.unit}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ARTIFACTS + STACK
// ============================================================================
function ArtifactsSection({ project, accentClass }: { project: Project; accentClass: string }) {
  return (
    <section className="relative bg-ink-950 py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Artifacts */}
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
              <span className="h-px w-8 bg-signal/40" />
              <span>SECTION 04 / DELIVERABLES</span>
            </div>
            <h3 className="font-display text-3xl font-light text-bone md:text-4xl">
              <span className="italic">Artifacts</span> shipped.
            </h3>
            <ul className="mt-8 divide-y divide-signal/10 border-y border-signal/10">
              {project.artifacts.map((a) => (
                <li key={a.label} className="flex items-center justify-between py-4">
                  <span className="font-display text-lg italic text-bone">{a.label}</span>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${accentClass}`}>
                    .{a.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Stack used */}
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
              <span className="h-px w-8 bg-signal/40" />
              <span>SECTION 05 / STACK</span>
            </div>
            <h3 className="font-display text-3xl font-light text-bone md:text-4xl">
              <span className="italic">Tooling</span> deployed.
            </h3>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="border border-signal/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// NEXT PROJECT TRANSITION
// ============================================================================
function NextProject({ current, next }: { current: Project; next: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 25, stiffness: 180 });
  const sy = useSpring(my, { damping: 25, stiffness: 180 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.05);
    my.set((e.clientY - r.top - r.height / 2) * 0.05);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const accentColor = next.hero.accent === 'signal' ? '#5BE9E9' : '#E8A14B';
  const accentClass = next.hero.accent === 'signal' ? 'text-signal' : 'text-ember';

  return (
    <Link
      ref={ref}
      href={`/projects/${next.slug}`}
      data-cursor="view"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative block h-[80vh] min-h-[500px] w-full overflow-hidden border-t border-signal/10 bg-ink-900"
    >
      {/* BG art */}
      <motion.div className="absolute inset-0 opacity-50 transition-opacity group-hover:opacity-100" style={{ x: sx, y: sy }}>
        <ProjectHeroArt project={next} accentColor={accentColor} />
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between px-6 py-12 md:px-10 md:py-16">
        {/* Top label */}
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
          <span>NEXT TRANSMISSION</span>
          <span className="text-bone-deep">CASE {next.index} / {String(5).padStart(2, '0')}</span>
        </div>

        {/* Center */}
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-deep">
            {next.client}
          </div>
          <motion.h2
            className="mt-3 font-display text-mega font-light leading-[0.85] text-bone transition-all"
            initial={false}
          >
            <span className={`italic ${accentClass}`}>{next.title}</span>
          </motion.h2>
          <div className="mt-6 max-w-2xl font-display text-lg italic text-bone-dim md:text-2xl">
            {next.hero.headline}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex items-end justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-deep">
            {next.subtitle}
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-signal">
            <span>ENTER CASE</span>
            <motion.div
              className="flex h-12 w-12 items-center justify-center border border-signal"
              whileHover={{ scale: 1.1 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  );
}
