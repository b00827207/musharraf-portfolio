'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { projects, type Project } from '@/lib/data';

export function ProjectsGrid() {
  return (
    <section
      id="projects"
      className="relative border-t border-signal/10 bg-ink-950 py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
              <span className="h-px w-8 bg-signal/40" />
              <span>004 / SELECTED CASES</span>
              <span className="text-bone-deep">{String(projects.length).padStart(2, '0')} ENTRIES</span>
            </div>
            <h2 className="font-display text-huge font-light leading-[0.95] text-bone">
              Five systems.
              <br />
              <span className="italic text-bone-dim">One operating</span>{' '}
              <span className="italic text-signal">discipline</span>.
            </h2>
          </div>
          <div className="max-w-sm font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-bone-dim">
            From a Series A pipeline rebuild to a Bvlgari launch, each case study below was
            stress-tested against the BMAD framework. Click through for the full architecture.
          </div>
        </div>

        {/* Grid — alternating large/medium cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {projects.map((p, i) => {
            // Layout: 0 → wide (8 cols), 1 → narrow (4 cols), 2 → narrow (4 cols), 3 → wide (8 cols), 4 → wide (12 cols)
            const layouts = [
              'md:col-span-8',
              'md:col-span-4',
              'md:col-span-4',
              'md:col-span-8',
              'md:col-span-12',
            ];
            return (
              <div key={p.slug} className={layouts[i] || 'md:col-span-6'}>
                <ProjectCard project={p} variant={i === 4 ? 'wide' : i % 3 === 1 ? 'tall' : 'standard'} />
              </div>
            );
          })}
        </div>

        {/* Footer line */}
        <div className="mt-16 flex items-center justify-between border-t border-signal/10 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-deep">
          <span>END OF DIRECTORY</span>
          <span>LAST UPDATED — APR 2026</span>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// PROJECT CARD with magnetic hover + parallax artwork
// ----------------------------------------------------------------------------
function ProjectCard({
  project,
  variant,
}: {
  project: Project;
  variant: 'standard' | 'wide' | 'tall';
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 25, stiffness: 200 });
  const sy = useSpring(my, { damping: 25, stiffness: 200 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px * 16);
    my.set(py * 16);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const heightClass =
    variant === 'wide'
      ? 'aspect-[16/8] md:aspect-[16/7]'
      : variant === 'tall'
        ? 'aspect-[4/5] md:aspect-[3/4]'
        : 'aspect-[16/10]';

  const accentColor = project.hero.accent === 'signal' ? '#5BE9E9' : '#E8A14B';
  const accentClass = project.hero.accent === 'signal' ? 'text-signal' : 'text-ember';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Link
        ref={cardRef}
        href={`/projects/${project.slug}`}
        data-cursor="view"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative block overflow-hidden border border-signal/15 bg-ink-900 transition-colors hover:border-signal/40"
      >
        {/* Visual canvas */}
        <div className={`relative ${heightClass} overflow-hidden`}>
          {/* Background art */}
          <ProjectArtwork project={project} />

          {/* Parallax overlay following cursor */}
          <motion.div
            className="absolute inset-0 mix-blend-overlay"
            style={{ x: sx, y: sy }}
          >
            <div
              className="absolute inset-[-10%]"
              style={{
                background: `radial-gradient(circle at center, ${accentColor}22, transparent 70%)`,
              }}
            />
          </motion.div>

          {/* Schematic frame */}
          <div className="absolute inset-4 border border-bone/5" />

          {/* Top-left meta */}
          <div className="absolute left-6 top-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">
            <span className={`${accentClass} font-medium`}>CASE {project.index}</span>
            <span className="text-bone-deep">·</span>
            <span>{project.category}</span>
          </div>

          {/* Top-right corner brackets */}
          <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-deep">
            {project.year}
          </div>

          {/* Title block — bottom */}
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-deep">
                {project.client}
              </div>
              <h3 className="mt-1 font-display text-2xl font-light leading-tight text-bone md:text-4xl">
                {project.title}
              </h3>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim">
                {project.subtitle}
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center border border-bone/30 transition-all group-hover:border-signal group-hover:bg-signal/5 md:flex">
              <svg width="14" height="14" viewBox="0 0 14 14" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>

          {/* Hover overlay metric strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent p-6 transition-transform duration-500 group-hover:translate-y-0 md:block"
          >
            <div className="flex items-end justify-between border-t border-signal/20 pt-4">
              <div className="grid grid-cols-3 gap-6">
                {project.metrics.slice(0, 3).map((m) => (
                  <div key={m.label}>
                    <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-bone-deep">
                      {m.label}
                    </div>
                    <div className={`tabular font-display text-2xl font-light ${accentClass}`}>
                      {m.value}
                      <span className="ml-0.5 font-mono text-xs not-italic text-bone-dim">{m.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

// ----------------------------------------------------------------------------
// PROJECT ARTWORK — generated SVG that varies by category. No external images.
// Each project gets a distinctive abstract schematic that visually represents
// its discipline (growth = ascending bars, M&A = node graph, brand = orbit, etc.)
// ----------------------------------------------------------------------------
function ProjectArtwork({ project }: { project: Project }) {
  const accent = project.hero.accent === 'signal' ? '#5BE9E9' : '#E8A14B';
  const accentDim = project.hero.accent === 'signal' ? '#3FB8B8' : '#B87020';

  // Choose artwork by category
  switch (project.category) {
    case 'GROWTH':
      return <GrowthArt accent={accent} accentDim={accentDim} />;
    case 'STRATEGY':
      return <StrategyArt accent={accent} accentDim={accentDim} />;
    case 'BRAND':
      return <BrandArt accent={accent} accentDim={accentDim} />;
    case 'OPERATIONS':
      return <OperationsArt accent={accent} accentDim={accentDim} />;
    default:
      return null;
  }
}

function GrowthArt({ accent, accentDim }: { accent: string; accentDim: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-800">
      <div className="bg-schematic-fine absolute inset-0 opacity-40" />
      <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="growth-line" x1="0" x2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0.1" />
            <stop offset="1" stopColor={accent} stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {/* Ascending bars */}
        {[0.45, 0.55, 0.5, 0.65, 0.6, 0.78, 0.72, 0.85, 0.92, 0.88].map((h, i) => (
          <motion.rect
            key={i}
            x={120 + i * 55}
            y={400 - h * 280}
            width="32"
            height={h * 280}
            fill={accent}
            fillOpacity="0.12"
            stroke={accent}
            strokeOpacity="0.5"
            strokeWidth="0.5"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ delay: i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ transformOrigin: 'bottom' }}
          />
        ))}
        {/* Trend line */}
        <motion.polyline
          points="136,260 191,232 246,246 301,210 356,224 411,182 466,196 521,154 576,132 631,140 686,118"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
        />
        {/* Funnel overlay */}
        <g opacity="0.35">
          <line x1="80" y1="80" x2="720" y2="80" stroke={accentDim} strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="180" y1="200" x2="620" y2="200" stroke={accentDim} strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="280" y1="320" x2="520" y2="320" stroke={accentDim} strokeWidth="0.5" strokeDasharray="2 4" />
        </g>
      </svg>
    </div>
  );
}

function StrategyArt({ accent, accentDim }: { accent: string; accentDim: string }) {
  // Node graph — M&A target evaluation
  const nodes = [
    { x: 200, y: 200, r: 20, primary: false },
    { x: 350, y: 120, r: 14, primary: false },
    { x: 350, y: 280, r: 16, primary: false },
    { x: 500, y: 200, r: 28, primary: true }, // selected target
    { x: 600, y: 100, r: 12, primary: false },
    { x: 600, y: 300, r: 10, primary: false },
    { x: 130, y: 100, r: 10, primary: false },
    { x: 130, y: 300, r: 12, primary: false },
  ];
  const edges = [
    [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [0, 6], [0, 7],
  ];

  return (
    <div className="absolute inset-0 bg-gradient-to-tr from-ink-900 via-ink-950 to-ink-800">
      <div className="bg-schematic-fine absolute inset-0 opacity-30" />
      <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={accent}
            strokeOpacity={nodes[a].primary || nodes[b].primary ? 0.7 : 0.2}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="none"
              stroke={accent}
              strokeOpacity={n.primary ? 0.9 : 0.4}
              strokeWidth={n.primary ? 1.5 : 1}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r * 0.4}
              fill={accent}
              fillOpacity={n.primary ? 0.8 : 0.25}
            />
            {n.primary && (
              <>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r + 12}
                  fill="none"
                  stroke={accent}
                  strokeOpacity="0.2"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                />
                <text
                  x={n.x + 50}
                  y={n.y + 4}
                  fill={accent}
                  fontSize="9"
                  fontFamily="monospace"
                  letterSpacing="0.1em"
                >
                  TARGET · 89/100
                </text>
              </>
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function BrandArt({ accent, accentDim }: { accent: string; accentDim: string }) {
  // Concentric orbits — luxury brand archetypes
  return (
    <div className="absolute inset-0 bg-gradient-to-bl from-ink-900 via-ink-950 to-ink-800">
      <div className="bg-schematic-fine absolute inset-0 opacity-25" />
      <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(400, 200)">
          {[60, 100, 140, 180, 220].map((r, i) => (
            <motion.circle
              key={i}
              r={r}
              fill="none"
              stroke={accent}
              strokeOpacity={0.4 - i * 0.05}
              strokeWidth="0.8"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            />
          ))}
          {/* Archetypal markers */}
          {[60, 100, 140, 180, 220].map((r, i) => {
            const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <motion.g
                key={`m-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <circle cx={x} cy={y} r="4" fill={accent} fillOpacity="0.8" />
                <circle cx={x} cy={y} r="9" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="0.6" />
              </motion.g>
            );
          })}
          {/* Center */}
          <circle r="6" fill={accent} />
          <text y="3" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#0B0D0F" fontWeight="bold">
            B
          </text>
        </g>
        {/* Annotations */}
        <text x="40" y="40" fill={accent} fillOpacity="0.6" fontSize="9" fontFamily="monospace" letterSpacing="0.15em">
          5 ARCHETYPES · 2.4M CRM · LTV:CAC 23.2× — 42.9×
        </text>
      </svg>
    </div>
  );
}

function OperationsArt({ accent, accentDim }: { accent: string; accentDim: string }) {
  // Grid of cells — operational matrix
  return (
    <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-950 to-ink-800">
      <div className="bg-schematic-fine absolute inset-0 opacity-30" />
      <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {/* Grid of operations */}
        {Array.from({ length: 14 }).map((_, col) =>
          Array.from({ length: 6 }).map((_, row) => {
            const isActive = Math.random() > 0.35;
            const intensity = Math.random();
            return (
              <motion.rect
                key={`${col}-${row}`}
                x={80 + col * 46}
                y={70 + row * 46}
                width="38"
                height="38"
                fill={isActive ? accent : 'transparent'}
                fillOpacity={isActive ? 0.05 + intensity * 0.4 : 0}
                stroke={accent}
                strokeOpacity={isActive ? 0.3 + intensity * 0.4 : 0.1}
                strokeWidth="0.6"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: (col + row) * 0.03, duration: 0.4 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'center' }}
              />
            );
          })
        )}
        <text x="80" y="50" fill={accent} fillOpacity="0.6" fontSize="9" fontFamily="monospace" letterSpacing="0.15em">
          70+ EVENTS · 18 MONTHS · 92% SUCCESS RATE
        </text>
      </svg>
    </div>
  );
}
