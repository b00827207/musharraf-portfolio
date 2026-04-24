'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const phases = [
  {
    glyph: 'B',
    label: 'BUILD',
    title: 'Construct the system',
    body: 'Every revenue engine begins with infrastructure. Pipelines, dashboards, sequences, schemas — the scaffolding that makes intent legible.',
    output: '↳ CRM architecture, KPI surfaces, activation playbooks',
  },
  {
    glyph: 'M',
    label: 'MEASURE',
    title: 'Instrument every joint',
    body: 'A signal you cannot measure is a signal you cannot trust. Velocity, conversion, stage drop-off, cycle days — all baselined before any opinion is offered.',
    output: '↳ Pipeline velocity, cycle days, cluster-level conversion',
  },
  {
    glyph: 'A',
    label: 'ANALYZE',
    title: 'Decode the leakage',
    body: 'Where the system bleeds is where the strategy lives. Statistical analysis, root-cause diagnosis, competitive intelligence — separating signal from noise.',
    output: '↳ Root-cause maps, scenario models, segment heatmaps',
  },
  {
    glyph: 'D',
    label: 'DEPLOY',
    title: 'Ship, brief, govern',
    body: 'Strategy that does not ship is theory. Briefing senior stakeholders, governing rollouts with KPI gates, onboarding teams to sustain the system.',
    output: '↳ Rollout sequences, governance gates, team frameworks',
  },
];

export function Thesis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative border-t border-signal/10 bg-ink-950 py-32 md:py-48"
      id="thesis-detail"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Section header */}
        <div className="mb-20 flex flex-col gap-12 md:mb-32 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
              <span className="h-px w-8 bg-signal/40" />
              <span>002 / OPERATING PHILOSOPHY</span>
            </div>
            <h2 className="font-display text-huge font-light leading-[0.95] text-bone">
              <span className="italic">Marketing</span> is engineering
              <br />
              <span className="text-bone-deep">that learned</span>{' '}
              <span className="italic text-ember">to feel</span>.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-display text-lg italic leading-relaxed text-bone-dim md:text-xl">
              Eight years of Electronics & Communications Engineering taught me to model systems
              under load. ESSEC taught me where the margins live. The framework — BMAD — is what
              happens when those two trainings collapse into one.
            </p>
          </div>
        </div>

        {/* BMAD vertical timeline */}
        <div className="relative">
          {/* Vertical guide line */}
          <div className="absolute left-[28px] top-0 h-full w-px bg-signal/10 md:left-[60px]">
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-signal via-signal/50 to-transparent"
              style={{ height: useTransform(lineProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>

          <div className="space-y-20 md:space-y-32">
            {phases.map((p, i) => (
              <PhaseRow key={p.label} phase={p} index={i} />
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          className="mt-24 border-t border-signal/10 pt-12 md:mt-40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-20%' }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-deep">
              CLOSING THESIS
            </div>
            <p className="md:col-span-2 font-display text-2xl font-light leading-tight text-bone md:text-3xl">
              The companies I want to work with don't need more campaigns. They need a{' '}
              <span className="italic text-signal">measurable nervous system</span> for the
              decisions they're already making.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhaseRow({ phase, index }: { phase: typeof phases[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'start 30%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative grid grid-cols-[60px_1fr] gap-6 md:grid-cols-[120px_1fr_1fr] md:gap-12"
    >
      {/* Glyph node */}
      <div className="relative">
        <div className="sticky top-32">
          <div className="relative flex h-14 w-14 items-center justify-center border border-signal/30 bg-ink-950 md:h-16 md:w-16">
            <span className="font-display text-2xl italic text-signal md:text-3xl">
              {phase.glyph}
            </span>
            <div className="absolute -inset-2 border border-signal/10" />
          </div>
          <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep">
            0{index + 1}
          </div>
        </div>
      </div>

      {/* Label + title */}
      <motion.div style={{ x }} className="md:pt-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
          PHASE — {phase.label}
        </div>
        <h3 className="mt-2 font-display text-3xl font-light leading-tight text-bone md:text-5xl">
          {phase.title}.
        </h3>
      </motion.div>

      {/* Body */}
      <motion.div style={{ x }} className="md:pt-3">
        <p className="text-base leading-relaxed text-bone-dim md:text-lg">{phase.body}</p>
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
          {phase.output}
        </div>
      </motion.div>
    </motion.div>
  );
}
