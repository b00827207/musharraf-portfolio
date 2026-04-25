'use client';

import type { CaseFile } from '@/lib/data';
import Link from 'next/link';
import { Counter } from './counter';
import { DashCard } from './dash-card';
import { ProDash } from './pro-dash';
import { Reveal, SplitReveal } from './reveal';
import { Nav } from './nav';
import { Footer } from './footer';

export function CaseDetail({ c }: { c: CaseFile }) {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-16">
        {/* Top breadcrumb */}
        <div className="max-w-[1380px] mx-auto px-5 md:px-10">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <Link
                href="/#work"
                className="font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep hover:text-terra editorial-link"
              >
                ← All cases
              </Link>
              <span className="text-ink-fade">/</span>
              <span className="font-mono text-tiny uppercase tracking-[0.16em] text-ink-dim">
                Case {c.caseNumber}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Hero */}
        <header className="max-w-[1380px] mx-auto px-5 md:px-10 pb-16 md:pb-24">
          <Reveal>
            <span className="stamp stamp-terra mb-6">
              <span>{c.domain} · {c.category}</span>
            </span>
          </Reveal>

          <h1 className="font-display font-light text-h1 leading-[0.92] tracking-[-0.045em] text-ink mt-4">
            <SplitReveal text={c.patient.split('·')[0].trim()} staggerMs={50} />
          </h1>
          {c.patient.includes('·') && (
            <Reveal delay={400}>
              <div className="font-display italic text-[clamp(1.4rem,2.6vw,2.4rem)] text-ink-dim mt-2">
                {c.patient.split('·').slice(1).join('·').trim()}
              </div>
            </Reveal>
          )}

          <Reveal delay={500} className="mt-6 font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep">
            {c.patientMeta} · {c.duration}
          </Reveal>

          <Reveal delay={650} className="mt-12 max-w-3xl">
            <p className="font-display text-h3 text-ink leading-[1.2] tracking-[-0.02em]">
              <em className="text-terra not-italic">›</em>{' '}{c.symptom}
            </p>
          </Reveal>
        </header>

        {/* Vitals strip */}
        <Reveal>
          <section className="bg-paper-warm/60 border-y border-paper-edge py-10 md:py-12">
            <div className="max-w-[1380px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {c.vitals.map((v, i) => (
                <div key={v.label} className={i > 0 ? 'md:border-l md:border-paper-edge md:pl-8' : ''}>
                  <div className="font-mono text-eyebrow uppercase text-ink-deep mb-3">{v.label}</div>
                  <div className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none text-terra tabular tracking-[-0.04em] num-shine">
                    <Counter value={v.value} duration={1600} delay={i * 150} />
                  </div>
                  {v.delta && (
                    <div className="font-sans text-tiny uppercase tracking-[0.14em] text-ink-dim mt-4">
                      {v.delta}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Clinical notes */}
        <section className="max-w-[1380px] mx-auto px-5 md:px-10 py-20 md:py-28">
          <Reveal>
            <div className="font-mono text-eyebrow uppercase text-terra mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-terra" />
              <span>The case file</span>
            </div>
          </Reveal>

          <div className="space-y-14 md:space-y-20">
            {[
              { num: '01', label: 'PRESENTING', text: c.presenting },
              { num: '02', label: 'INTERVENTION', text: c.intervention },
              { num: '03', label: 'OUTCOME', text: c.outcome },
            ].map((s, i) => (
              <Reveal key={s.num} delay={i * 150}>
                <article className="grid md:grid-cols-12 gap-6 md:gap-10">
                  <div className="md:col-span-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-terra tabular mb-2">
                      {s.num}
                    </div>
                    <div className="font-display text-h3 text-ink leading-tight tracking-[-0.02em]">
                      {s.label.charAt(0) + s.label.slice(1).toLowerCase()}
                    </div>
                  </div>
                  <p className="md:col-span-9 font-display text-lead text-ink-dim leading-[1.55]">
                    {s.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Dashboard */}
        <Reveal>
          <section className="max-w-[1380px] mx-auto px-5 md:px-10 pb-20 md:pb-28">
            <div className="font-mono text-eyebrow uppercase text-terra mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-terra" />
              <span>Intelligence brief</span>
            </div>
            {c.experienceType === 'professional' ? (
              <ProDash slug={c.slug} />
            ) : (
              <DashCard slug={c.slug} />
            )}
          </section>
        </Reveal>

        {/* BMAD strip */}
        <section className="bg-paper-warm/60 border-y border-paper-edge py-20 md:py-24">
          <div className="max-w-[1380px] mx-auto px-5 md:px-10">
            <Reveal>
              <div className="font-mono text-eyebrow uppercase text-terra mb-10 flex items-center gap-3">
                <span className="w-8 h-px bg-terra" />
                <span>How it ran</span>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: 'BUILD', text: c.build },
                { label: 'MEASURE', text: c.measure },
                { label: 'ANALYZE', text: c.analyze },
                { label: 'DEPLOY', text: c.deploy },
              ].map((s, i) => (
                <Reveal key={s.label} delay={i * 100}>
                  <div className="border-t-2 border-terra pt-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-terra mb-3">
                      {s.label}
                    </div>
                    <p className="font-sans text-[14px] text-ink leading-[1.6]">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Summary + artifacts + stack */}
        <section className="max-w-[1380px] mx-auto px-5 md:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10">
            <Reveal className="md:col-span-7">
              <div className="font-mono text-eyebrow uppercase text-terra mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-terra" />
                <span>In summary</span>
              </div>
              <p className="font-display text-h3 text-ink leading-[1.3] tracking-[-0.015em]">
                {c.fullSummary}
              </p>
            </Reveal>

            <Reveal delay={150} className="md:col-span-3">
              <div className="font-mono text-eyebrow uppercase text-ink-deep mb-4">Artifacts</div>
              <ul className="space-y-2">
                {c.artifacts.map((a) => (
                  <li key={a} className="font-sans text-[13px] text-ink-dim leading-[1.55] flex gap-2">
                    <span className="text-terra mt-1">·</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={250} className="md:col-span-2">
              <div className="font-mono text-eyebrow uppercase text-ink-deep mb-4">Stack</div>
              <ul className="space-y-2">
                {c.stack.map((s) => (
                  <li key={s} className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Footer actions */}
        <section className="max-w-[1380px] mx-auto px-5 md:px-10 py-16 border-t border-paper-edge">
          <div className="flex flex-wrap gap-6 items-baseline justify-between">
            <Link
              href="/#work"
              className="font-mono text-tiny uppercase tracking-[0.16em] text-ink hover:text-terra editorial-link"
            >
              ← All cases
            </Link>
            {c.externalUrl && (
              <a
                href={c.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-tiny uppercase tracking-[0.16em] text-terra editorial-link"
              >
                Open the live strategy platform ↗
              </a>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
