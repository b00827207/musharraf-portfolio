'use client';

import { cases } from '@/lib/data';
import type { CaseFile } from '@/lib/data';
import { Reveal, SplitReveal } from './reveal';
import { Counter } from './counter';
import { DashCard } from './dash-card';
import { ProSpread } from './pro-spread';

export function Work() {
  const professional = cases.filter((c) => c.experienceType === 'professional');
  const projects = cases.filter((c) => c.experienceType === 'project');

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 02 · PROFESSIONAL EXPERIENCE                          */}
      {/* ============================================================ */}
      <section id="work" className="relative py-24 md:py-36">
        <div className="max-w-[1380px] mx-auto px-5 md:px-10 relative">
          <div
            className="absolute right-5 md:right-10 top-0 font-display font-light section-num pointer-events-none select-none leading-none"
            style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
            aria-hidden
          >
            02
          </div>

          <Reveal>
            <div className="font-mono text-eyebrow uppercase text-terra mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-terra" />
              <span>Professional experience · {professional.length} engagements</span>
            </div>
          </Reveal>

          <h2 className="font-display font-light text-h2 leading-[1.04] tracking-[-0.03em] text-ink max-w-[18ch]">
            <SplitReveal text="Where I shipped" staggerMs={55} />{' '}
            <SplitReveal
              text="real revenue."
              delay={300}
              staggerMs={55}
              emphasizeWords={['revenue.']}
            />
          </h2>

          <Reveal delay={500} className="mt-8 max-w-2xl">
            <p className="font-display text-lead text-ink-dim leading-[1.55]">
              Two industry roles, eighteen months apart. The first delivered
              <span className="text-ink"> ₹4.2M of B2B revenue</span> through pipeline engineering at a Series A EdTech.
              The second turned <span className="text-ink">a regional events operator into an 11× business</span> through
              vendor systems and rotational ops design.
            </p>
          </Reveal>
        </div>

        {/* The two professional spreads */}
        <div className="mt-16 md:mt-24 space-y-32 md:space-y-44">
          {professional.map((c, i) => (
            <ProSpread key={c.slug} c={c} idx={i} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 03 · PROJECT EXPERIENCE (ESSEC)                       */}
      {/* ============================================================ */}
      <section
        id="projects"
        className="relative py-24 md:py-36 bg-paper-warm/50 border-y border-paper-edge"
      >
        <div className="max-w-[1380px] mx-auto px-5 md:px-10 relative">
          <div
            className="absolute right-5 md:right-10 top-0 font-display font-light section-num pointer-events-none select-none leading-none"
            style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
            aria-hidden
          >
            03
          </div>

          <Reveal>
            <div className="font-mono text-eyebrow uppercase text-terra mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-terra" />
              <span>Project experience · ESSEC · {projects.length} engagements</span>
            </div>
          </Reveal>

          <h2 className="font-display font-light text-h2 leading-[1.04] tracking-[-0.03em] text-ink max-w-[18ch]">
            <SplitReveal text="Three ESSEC engagements." staggerMs={55} />{' '}
            <SplitReveal
              text="Three live platforms."
              delay={300}
              staggerMs={55}
              emphasizeWords={['platforms.']}
            />
          </h2>

          <Reveal delay={500} className="mt-8 max-w-2xl">
            <p className="font-display text-lead text-ink-dim leading-[1.55]">
              Each one shipped as a deployed strategic intelligence platform — multi-section briefs with PESTEL,
              financial models, scenario analysis, KPI governance. Below: the headline number and the chart that anchors it.
              Click through for the full platform.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24 space-y-24 md:space-y-32">
          {projects.map((c, i) => (
            <ProjectSpread key={c.slug} c={c} idx={i} />
          ))}
        </div>
      </section>
    </>
  );
}

// ============================================================
// PROJECT SPREAD — leaner, single-chart, link-out heavy
// ============================================================
function ProjectSpread({ c, idx }: { c: CaseFile; idx: number }) {
  const reverse = idx % 2 === 1;

  return (
    <article className="max-w-[1380px] mx-auto px-5 md:px-10">
      <div className="grid md:grid-cols-12 gap-6 md:gap-10">
        {/* Story */}
        <Reveal className={`md:col-span-5 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="stamp stamp-terra">
              <span>ESSEC · Consulting</span>
            </span>
            <span className="font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep">
              Case · {c.caseNumber}
            </span>
            <span className="font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep">
              {c.duration}
            </span>
          </div>

          <h3 className="font-display text-h2 font-light leading-[1.04] tracking-[-0.03em] text-ink">
            {c.patient.split('·')[0].trim()}
          </h3>
          {c.patient.includes('·') && (
            <div className="font-display italic text-[1.2rem] text-ink-dim mt-1">
              {c.patient.split('·').slice(1).join('·').trim()}
            </div>
          )}

          <div className="mt-3 font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep">
            {c.domain} · {c.category}
          </div>

          <p className="font-display text-lead text-ink mt-7 leading-[1.45] tracking-[-0.005em]">
            <em className="text-terra not-italic">›</em>{' '}{c.symptom}
          </p>

          <p className="font-sans text-body text-ink-dim mt-6 leading-[1.65]">
            {c.outcome}
          </p>

          {/* Big metric */}
          <div className="mt-8 pt-8 border-t border-paper-edge">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-deep mb-2">
              {c.vitals[0].label}
            </div>
            <div className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none text-terra tracking-[-0.04em] tabular num-shine">
              <Counter value={c.vitals[0].value} duration={1600} />
            </div>
            {c.vitals[0].delta && (
              <div className="font-sans text-tiny uppercase tracking-[0.14em] text-ink-dim mt-3">
                {c.vitals[0].delta}
              </div>
            )}
          </div>

          {/* Secondary metrics */}
          <div className="mt-6 grid grid-cols-2 gap-4">
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

          {/* Actions — emphasis on external platform */}
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            {c.externalUrl && (
              <a
                href={c.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-tiny uppercase tracking-[0.16em] text-paper bg-ink hover:bg-terra px-3.5 py-2 transition-colors"
              >
                Open the live platform ↗
              </a>
            )}
            <a
              href={`/case/${c.slug}`}
              className="font-mono text-tiny uppercase tracking-[0.16em] text-ink hover:text-terra editorial-link"
            >
              Brief →
            </a>
          </div>
        </Reveal>

        {/* Single-chart preview */}
        <Reveal delay={150} className={`md:col-span-7 ${reverse ? 'md:order-1' : 'md:order-2'}`}>
          <DashCard slug={c.slug} />
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-deep">
            <span>{c.patientMeta}</span>
            <span>FIG. {String(idx + 1).padStart(2, '0')}</span>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
