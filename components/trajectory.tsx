'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { timeline } from '@/lib/data';

// ============================================================================
// THE TRAJECTORY — rendered as a vertical circuit-board pipeline.
// SVG path draws itself as the user scrolls. Each node is an experience.
// ============================================================================

export function Trajectory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 40%'],
  });

  // Path drawing
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative border-t border-signal/10 bg-ink-900 py-32 md:py-48"
    >
      {/* Schematic background */}
      <div className="bg-schematic absolute inset-0 opacity-50" aria-hidden />
      <div className="pointer-events-none absolute inset-x-6 inset-y-12 border border-signal/5 md:inset-x-10" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-20 flex flex-col gap-8 md:mb-32 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
              <span className="h-px w-8 bg-signal/40" />
              <span>003 / TRAJECTORY</span>
              <span className="text-bone-deep">FIG. 002 — PIPELINE.SVG</span>
            </div>
            <h2 className="font-display text-huge font-light leading-[0.95] text-bone">
              The <span className="italic text-signal">circuit</span>
              <br />
              that built the operator.
            </h2>
          </div>

          <div className="max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-bone-dim">
            Five nodes. Two continents. From hardware engineering in Chennai to ESSEC's strategy
            consulting projects in Paris — each transition routed through measurable output.
          </div>
        </div>

        {/* The circuit timeline */}
        <div className="relative">
          {/* Vertical SVG spine — drawn on scroll. Hidden on mobile, replaced by simple line. */}
          <div className="hidden md:block">
            <CircuitSpine pathLength={pathLength} nodeCount={timeline.length} />
          </div>

          {/* Mobile spine */}
          <div className="absolute left-[19px] top-0 block h-full w-px bg-signal/10 md:hidden">
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-signal to-signal/30"
              style={{ height: useTransform(pathLength, [0, 1], ['0%', '100%']) }}
            />
          </div>

          {/* Nodes */}
          <div className="space-y-12 md:space-y-24">
            {timeline.map((item, i) => (
              <TimelineNode
                key={item.id}
                item={item}
                index={i}
                total={timeline.length}
                pathLength={pathLength}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// CIRCUIT SPINE — animated SVG path running down the page, with branching
// connectors at each timeline node.
// ----------------------------------------------------------------------------
function CircuitSpine({
  pathLength,
  nodeCount,
}: {
  pathLength: any;
  nodeCount: number;
}) {
  // Total height covers all nodes; we render an SVG that's stretched.
  // Each node sits at evenly-spaced y. Connector lines branch off.
  const totalHeight = nodeCount * 240;
  const cx = 40; // x of central spine inside SVG

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 h-full w-full"
      viewBox={`0 0 200 ${totalHeight}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BE9E9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5BE9E9" stopOpacity="0.1" />
        </linearGradient>
        <filter id="spine-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Static dotted background spine */}
      <line
        x1={cx}
        y1={0}
        x2={cx}
        y2={totalHeight}
        stroke="rgba(91, 233, 233, 0.15)"
        strokeWidth="1"
        strokeDasharray="2 4"
      />

      {/* Animated drawing spine */}
      <motion.line
        x1={cx}
        y1={0}
        x2={cx}
        y2={totalHeight}
        stroke="url(#spine-grad)"
        strokeWidth="1.5"
        filter="url(#spine-glow)"
        style={{ pathLength }}
      />

      {/* Branching connectors at each node y position */}
      {Array.from({ length: nodeCount }).map((_, i) => {
        const t = (i + 0.5) / nodeCount;
        const y = t * totalHeight;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Horizontal branch */}
            <line
              x1={cx}
              y1={y}
              x2={200}
              y2={y}
              stroke="rgba(91, 233, 233, 0.2)"
              strokeWidth="0.8"
            />
            {/* Node ring */}
            <circle cx={cx} cy={y} r="6" fill="#0B0D0F" stroke="#5BE9E9" strokeWidth="1.2" />
            <circle cx={cx} cy={y} r="2" fill="#5BE9E9" />
          </motion.g>
        );
      })}
    </svg>
  );
}

// ----------------------------------------------------------------------------
// NODE
// ----------------------------------------------------------------------------
function TimelineNode({
  item,
  index,
  total,
  pathLength,
}: {
  item: typeof timeline[number];
  index: number;
  total: number;
  pathLength: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'start 40%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  const accent =
    item.type === 'milestone'
      ? 'text-signal border-signal/40'
      : item.type === 'education'
        ? 'text-ember border-ember/40'
        : 'text-bone border-bone-dim/40';

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative">
      {/* Node marker (mobile) */}
      <div className="absolute left-3 top-2 h-3 w-3 rounded-full border border-signal bg-ink-900 md:hidden">
        <div className="absolute inset-1 rounded-full bg-signal" />
      </div>

      <div className="grid grid-cols-1 gap-6 pl-12 md:grid-cols-[180px_1fr_2fr] md:gap-10 md:pl-24">
        {/* Period */}
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-deep md:pt-2">
          <div className={`text-lg font-light ${accent.split(' ')[0]}`}>{item.period}</div>
          <div className="mt-1">{item.place}</div>
          <div className="mt-2 inline-block border border-current px-2 py-0.5 text-[8px] tracking-[0.3em]">
            {item.type.toUpperCase()}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-display text-2xl font-light leading-tight text-bone md:text-4xl">
            {item.title}
          </h3>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-signal/70">
            ↳ {item.role}
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-bone-dim md:text-xs">
          {item.bullets.map((b, j) => (
            <li key={j} className="flex gap-3">
              <span className="text-signal/40">{String(j + 1).padStart(2, '0')}</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
