'use client';

import { cases } from '@/lib/data';
import { Reveal, SplitReveal } from './reveal';
import { Counter } from './counter';
import { DashCard } from './dash-card';

export function Work() {
  return (
    <section id="work" className="relative py-24 md:py-36">
      {/* Section header */}
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
            <span>Selected work · {cases.length} engagements</span>
          </div>
        </Reveal>

        <h2 className="font-display font-light text-h2 leading-[1.04] tracking-[-0.03em] text-ink max-w-[18ch]">
          <SplitReveal
            text="Five cases."
            staggerMs={60}
          />{' '}
          <SplitReveal
            text="Five outcomes."
            delay={300}
            staggerMs={60}
          />{' '}
          <SplitReveal
            text="One operator."
            delay={650}
            staggerMs={60}
            emphasizeWords={['operator.']}
          />
        </h2>

        <Reveal delay={500} className="mt-8 max-w-2xl">
          <p className="font-display text-lead text-ink-dim leading-[1.55]">
            Three at ESSEC, two in industry. Across EdTech, luxury jewelry, French gourmet, regional events,
            and air cargo M&amp;A. Each case has a number that moved. Click through for the full file —
            or skim the briefs below.
          </p>
        </Reveal>
      </div>

      {/* Cases */}
      <div className="mt-16 md:mt-24 space-y-24 md:space-y-36">
        {cases.map((c, i) => (
          <CaseSpread key={c.slug} c={c} idx={i} />
        ))}
      </div>
    </section>
  );
}

function CaseSpread({ c, idx }: { c: any; idx: number }) {
  // Alternating layout: even idx = text-left/dash-right; odd = swap
  const reverse = idx % 2 === 1;

  return (
    <article className="max-w-[1380px] mx-auto px-5 md:px-10">
      <div className="grid md:grid-cols-12 gap-6 md:gap-10">
        {/* Story column */}
        <Reveal className={`md:col-span-5 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
          {/* Stamp */}
          <div className="flex items-center gap-3 mb-6">
            <span className="stamp stamp-terra">
              <span>Case · {c.caseNumber}</span>
            </span>
            <span className="font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep">
              {c.duration}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-h2 font-light leading-[1.04] tracking-[-0.03em] text-ink">
            {c.patient.split('·')[0].trim()}
          </h3>
          {c.patient.includes('·') && (
            <div className="font-display italic text-[1.2rem] text-ink-dim mt-1">
              {c.patient.split('·').slice(1).join('·').trim()}
            </div>
          )}

          {/* Domain pill */}
          <div className="mt-3 font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep">
            {c.domain} · {c.category}
          </div>

          {/* Symptom — the headline insight */}
          <p className="font-display text-lead text-ink mt-7 leading-[1.45] tracking-[-0.005em]">
            <em className="text-terra not-italic">›</em>{' '}{c.symptom}
          </p>

          {/* Outcome paragraph */}
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
            {c.vitals.slice(1).map((v: any) => (
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

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`/case/${c.slug}`}
              className="font-mono text-tiny uppercase tracking-[0.16em] text-ink hover:text-terra editorial-link"
            >
              Open full case →
            </a>
            {c.externalUrl && (
              <a
                href={c.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-tiny uppercase tracking-[0.16em] text-terra editorial-link"
              >
                Live strategy platform ↗
              </a>
            )}
          </div>
        </Reveal>

        {/* Dashboard column */}
        <Reveal delay={150} className={`md:col-span-7 ${reverse ? 'md:order-1' : 'md:order-2'}`}>
          <DashCard slug={c.slug} />

          {/* Provenance line */}
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-deep">
            <span>{c.patientMeta}</span>
            <span>FIG. {String(idx + 1).padStart(2, '0')}</span>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
