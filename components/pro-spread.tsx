'use client';

import type { CaseFile } from '@/lib/data';
import { Reveal } from './reveal';
import { Counter } from './counter';
import { ProDash } from './pro-dash';

export function ProSpread({ c, idx }: { c: CaseFile; idx: number }) {
  return (
    <article className="max-w-[1380px] mx-auto px-5 md:px-10">
      {/* Establishing strip — full width */}
      <Reveal>
        <header className="grid md:grid-cols-12 gap-6 md:gap-10 items-end pb-8 border-b border-paper-edge">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] text-paper"
                style={{ background: '#5C7544' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-paper" />
                Industry · Owned · Paid
              </span>
              <span className="font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep">
                Case · {c.caseNumber}
              </span>
              <span className="font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep">
                {c.duration}
              </span>
            </div>

            <h3 className="font-display text-h2 font-light leading-[1.04] tracking-[-0.03em] text-ink">
              {c.patient}
            </h3>
            <div className="font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep mt-3">
              {c.patientMeta}
            </div>
          </div>

          {/* Headline metric */}
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-deep mb-2">
              {c.vitals[0].label}
            </div>
            <div className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-none text-terra tabular tracking-[-0.04em] num-shine">
              <Counter value={c.vitals[0].value} duration={1600} />
            </div>
            {c.vitals[0].delta && (
              <div className="font-sans text-tiny uppercase tracking-[0.14em] text-ink-dim mt-3">
                {c.vitals[0].delta}
              </div>
            )}
          </div>
        </header>
      </Reveal>

      {/* The narrative + timeline */}
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 mt-12 md:mt-16">
        {/* Story */}
        <Reveal delay={100} className="md:col-span-5">
          <p className="font-display text-lead text-ink leading-[1.45] tracking-[-0.005em]">
            <em className="text-terra not-italic">›</em>{' '}{c.symptom}
          </p>
          <p className="font-sans text-body text-ink-dim mt-6 leading-[1.65]">
            {c.intervention}
          </p>
          <p className="font-sans text-body text-ink-dim mt-5 leading-[1.65]">
            {c.outcome}
          </p>

          {/* Secondary metrics */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {c.vitals.slice(1).map((v) => (
              <div key={v.label} className="border-l-2 border-paper-edge pl-4">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-deep mb-1">
                  {v.label}
                </div>
                <div className="font-display text-[1.5rem] text-ink leading-none tabular tracking-[-0.02em]">
                  <Counter value={v.value} duration={1400} />
                </div>
                {v.delta && (
                  <div className="font-sans text-[11px] text-ink-dim mt-1.5">{v.delta}</div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Timeline ribbon */}
        <Reveal delay={200} className="md:col-span-7">
          <Timeline timeline={c.timeline ?? []} />
        </Reveal>
      </div>

      {/* The interactive dashboard — full width below */}
      <Reveal delay={150} className="mt-14 md:mt-20">
        <ProDash slug={c.slug} />
        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-deep">
          <span>{c.patientMeta}</span>
          <span>EXHIBIT {String(idx + 1).padStart(2, '0')} · INTERACTIVE</span>
        </div>
      </Reveal>

      {/* BMAD strip */}
      <Reveal className="mt-16 md:mt-20 pt-10 border-t border-paper-edge">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: 'BUILD', text: c.build },
            { label: 'MEASURE', text: c.measure },
            { label: 'ANALYZE', text: c.analyze },
            { label: 'DEPLOY', text: c.deploy },
          ].map((s, i) => (
            <div key={s.label} className="border-t-2 border-terra pt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-terra mb-3">
                {String(i + 1).padStart(2, '0')} / {s.label}
              </div>
              <p className="font-sans text-[13.5px] text-ink leading-[1.6]">{s.text}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Stack + deep link */}
      <Reveal className="mt-12 flex flex-wrap items-baseline gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {c.stack.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-dim border border-paper-edge px-2.5 py-1.5"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={`/case/${c.slug}`}
          className="font-mono text-tiny uppercase tracking-[0.16em] text-ink hover:text-terra editorial-link"
        >
          Open the full case file →
        </a>
      </Reveal>
    </article>
  );
}

// ============================================================
// Timeline ribbon — month-by-month milestones
// ============================================================
function Timeline({
  timeline,
}: {
  timeline: { month: string; label: string; detail: string }[];
}) {
  if (timeline.length === 0) return null;

  return (
    <div className="bg-paper-warm/40 border border-paper-edge p-5 md:p-7 rounded-sm">
      <div className="font-mono text-eyebrow uppercase text-terra mb-5 flex items-center gap-3">
        <span className="w-5 h-px bg-terra" />
        <span>Engagement timeline</span>
      </div>

      <ol className="relative">
        {/* Vertical line */}
        <div className="absolute left-[10px] top-3 bottom-3 w-px bg-paper-edge" aria-hidden />

        {timeline.map((t, i) => (
          <li key={t.month} className="relative pl-8 pb-5 last:pb-0">
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-[21px] h-[21px] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-terra ring-4 ring-paper-warm" />
            </div>
            {/* Content */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-mono tabular text-[11px] text-terra font-semibold tracking-[0.05em]">
                {t.month}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-deep">
                {t.label}
              </span>
            </div>
            <p className="font-sans text-[13px] text-ink-dim leading-[1.55] mt-1">
              {t.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
