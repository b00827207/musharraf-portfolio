'use client';

import { Counter } from './counter';
import { Dashboard } from './dashboard';
import type { CaseFile } from '@/lib/data';
import Link from 'next/link';

export function CaseFilePage({ c }: { c: CaseFile }) {
  return (
    <main className="min-h-screen bg-ink-950 text-bone">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-8 md:py-12 space-y-12">
        {/* TOPNAV */}
        <header className="flex items-center justify-between border-b border-bone-fade/30 pb-4">
          <Link
            href="/"
            className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone-dim hover:text-vital transition-colors flex items-center gap-2"
          >
            <span>‹</span> RETURN TO AETHER
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-deep">
            DEEP LINK · {c.caseNumber}
          </div>
        </header>

        {/* CASE HEADER */}
        <section>
          <div className="flex items-center flex-wrap gap-3 mb-4">
            <div className="font-mono text-eyebrow uppercase text-vital flex items-center gap-3">
              <span className="status-dot" />
              <span>MODULE · {c.caseNumber}</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-deep">
              / {c.domain} / {c.category}
            </div>
          </div>

          <h1 className="font-display text-mega font-light text-bone leading-[0.95] tracking-[-0.04em]">
            {c.patient}
          </h1>
          <div className="mt-3 font-mono text-tiny uppercase tracking-[0.16em] text-bone-dim">
            {c.patientMeta}
          </div>
        </section>

        {/* SYMPTOM */}
        <section className="border-y border-bone-fade/30 py-6">
          <div className="font-mono text-eyebrow uppercase text-bone-deep mb-3 flex items-center gap-3">
            <span className="w-5 h-px bg-bone-fade" />
            <span>PRESENTING SYMPTOM</span>
          </div>
          <p className="font-display text-lead text-bone leading-snug max-w-4xl">{c.symptom}</p>
        </section>

        {/* VITALS */}
        <section>
          <div className="font-mono text-eyebrow uppercase text-bone-deep mb-3 flex items-center gap-3">
            <span className="w-5 h-px bg-bone-fade" />
            <span>VITALS</span>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {c.vitals.map((v, i) => (
              <div key={v.label} className="border border-bone-fade/40 bg-ink-900/30 px-5 py-5">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-2">
                  {v.label}
                </div>
                <div className="font-display text-[2.2rem] tabular text-vital leading-none tracking-[-0.02em]">
                  <Counter value={v.value} duration={1100} delay={500 + i * 120} />
                </div>
                {v.delta && (
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim mt-2">
                    {v.delta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CLINICAL NOTES */}
        <section className="space-y-7">
          <div className="font-mono text-eyebrow uppercase text-bone-deep flex items-center gap-3">
            <span className="w-5 h-px bg-bone-fade" />
            <span>CLINICAL NOTES</span>
          </div>

          {[
            { label: 'PRESENTING', text: c.presenting },
            { label: 'INTERVENTION', text: c.intervention },
            { label: 'OUTCOME', text: c.outcome },
          ].map((s, i) => (
            <div key={s.label} className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-vital">
                  {String(i + 1).padStart(2, '0')} / {s.label}
                </div>
              </div>
              <p className="md:col-span-9 font-display text-[1.05rem] md:text-[1.15rem] text-bone leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}

          <div className="grid md:grid-cols-4 gap-3 pt-4 border-t border-bone-fade/30">
            {[
              { label: 'BUILD', text: c.build },
              { label: 'MEASURE', text: c.measure },
              { label: 'ANALYZE', text: c.analyze },
              { label: 'DEPLOY', text: c.deploy },
            ].map((s) => (
              <div key={s.label} className="border border-bone-fade/40 bg-ink-900/30 px-4 py-4">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-vital mb-2">
                  {s.label}
                </div>
                <p className="font-mono text-[10.5px] text-bone-dim leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DASHBOARD */}
        <section>
          <div className="font-mono text-eyebrow uppercase text-bone-deep mb-4 flex items-center gap-3">
            <span className="w-5 h-px bg-bone-fade" />
            <span>INTELLIGENCE BRIEF · INTERACTIVE</span>
          </div>
          <Dashboard slug={c.slug} />
        </section>

        {/* SUMMARY + ARTIFACTS + STACK */}
        <section className="grid md:grid-cols-12 gap-6 border-t border-bone-fade/30 pt-6">
          <div className="md:col-span-7">
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-2">
              ENGAGEMENT SUMMARY
            </div>
            <p className="font-display text-[1.1rem] text-bone leading-relaxed">{c.fullSummary}</p>
          </div>
          <div className="md:col-span-3">
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-2">
              ARTIFACTS
            </div>
            <ul className="font-mono text-[10.5px] text-bone-dim space-y-1.5">
              {c.artifacts.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="text-vital">·</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-2">
              STACK
            </div>
            <ul className="font-mono text-[10.5px] text-bone-dim space-y-1.5">
              {c.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-bone-fade/30 pt-6 flex flex-wrap gap-4 items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-bone-deep">
          <div>AETHER · ATTENDING SHAIK MUSHARRAF</div>
          <div>AVAILABLE · SEPTEMBER 2026 · PARIS</div>
        </footer>
      </div>
    </main>
  );
}
