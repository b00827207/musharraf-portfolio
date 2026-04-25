'use client';

import { Typewriter } from '../typewriter';
import { Counter } from '../counter';
import { Dashboard } from '../dashboard';
import { useAether } from '../aether-core';
import { cases } from '@/lib/data';
import { useEffect, useState } from 'react';

export function DiagnosticView({ domain, caseIdx }: { domain: string; caseIdx: number }) {
  const { runCommand, setView } = useAether();
  const matched = cases.filter((c) => c.domain === domain);
  const [idx, setIdx] = useState(Math.min(caseIdx, Math.max(0, matched.length - 1)));

  useEffect(() => {
    setIdx(Math.min(caseIdx, Math.max(0, matched.length - 1)));
  }, [caseIdx, matched.length]);

  if (matched.length === 0) {
    return (
      <div className="space-y-4 pt-6">
        <div className="font-mono text-eyebrow uppercase text-[var(--amber)]">⚠ NO CASES</div>
        <p className="font-mono text-tiny text-bone-dim">
          No engagements logged under {domain}. Try DIAG.CONVERSION, DIAG.RETENTION, or DIAG.PRICING.
        </p>
      </div>
    );
  }

  const c = matched[idx];

  return (
    <div className="space-y-10 pt-2 md:pt-6">
      {/* HEADER */}
      <header>
        <div className="flex items-center flex-wrap gap-3 mb-4">
          <div className="font-mono text-eyebrow uppercase text-vital flex items-center gap-3">
            <span className="status-dot" />
            <span>DIAGNOSTIC LOADED · {domain}</span>
          </div>
          {matched.length > 1 && (
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-deep">
              CASE {idx + 1} OF {matched.length}
            </div>
          )}
        </div>

        <h1 className="font-display text-diagnosis font-light text-bone leading-[1.05] tracking-[-0.03em] max-w-4xl">
          <Typewriter text={c.symptom} speed={14} cursor={false} />
        </h1>

        {/* Case selector when multiple cases match */}
        {matched.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {matched.map((m, i) => (
              <button
                key={m.slug}
                onClick={() => setIdx(i)}
                className={`font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${
                  i === idx
                    ? 'text-vital border-vital/60 bg-vital/[0.05]'
                    : 'text-bone-dim border-bone-fade/40 hover:border-vital/40 hover:text-bone'
                }`}
              >
                CASE {m.caseNumber} · {m.patient.split('·')[0].trim()}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* PATIENT META */}
      <section className="grid md:grid-cols-3 gap-3 border-y border-bone-fade/30 py-5">
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1">
            CASE FILE
          </div>
          <div className="font-display text-[1.3rem] text-bone leading-tight">{c.patient}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim mt-1">
            {c.patientMeta}
          </div>
        </div>
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1">
            CATEGORY
          </div>
          <div className="font-mono text-bone tabular text-[12px]">{c.category}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim mt-1">
            ENGAGEMENT
          </div>
        </div>
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1">
            DURATION
          </div>
          <div className="font-mono text-vital tabular text-[12px]">{c.duration}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim mt-1">
            ON FILE
          </div>
        </div>
      </section>

      {/* VITALS */}
      <section>
        <div className="font-mono text-eyebrow uppercase text-bone-deep mb-3 flex items-center gap-3">
          <span className="w-5 h-px bg-bone-fade" />
          <span>VITALS · MEASURED OUTCOMES</span>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {c.vitals.map((v, i) => (
            <div
              key={v.label}
              className="border border-bone-fade/40 bg-ink-900/30 px-5 py-5 animate-fade-up"
              style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: 'both', opacity: 0 }}
            >
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
      <section className="space-y-6">
        <div className="font-mono text-eyebrow uppercase text-bone-deep flex items-center gap-3">
          <span className="w-5 h-px bg-bone-fade" />
          <span>CLINICAL NOTES</span>
        </div>

        {[
          { label: 'PRESENTING', text: c.presenting },
          { label: 'INTERVENTION', text: c.intervention },
          { label: 'OUTCOME', text: c.outcome },
        ].map((s, i) => (
          <div
            key={s.label}
            className="grid md:grid-cols-12 gap-4 animate-fade-up"
            style={{ animationDelay: `${600 + i * 120}ms`, animationFillMode: 'both', opacity: 0 }}
          >
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
      </section>

      {/* INTELLIGENCE BRIEF */}
      <section
        className="animate-fade-up"
        style={{ animationDelay: '1100ms', animationFillMode: 'both', opacity: 0 }}
      >
        <div className="font-mono text-eyebrow uppercase text-bone-deep mb-4 flex items-center gap-3">
          <span className="w-5 h-px bg-bone-fade" />
          <span>INTELLIGENCE BRIEF · INTERACTIVE</span>
        </div>
        <Dashboard slug={c.slug} />
      </section>

      {/* DEEP LINK */}
      <section
        className="border-t border-bone-fade/30 pt-6 flex flex-wrap items-baseline gap-4 justify-between animate-fade-up"
        style={{ animationDelay: '1300ms', animationFillMode: 'both', opacity: 0 }}
      >
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1">
            ACTIONS
          </div>
          <div className="font-display text-[1.05rem] text-bone leading-tight">
            Open the full module file or return to console.
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setView({ type: 'module', slug: c.slug })}
            className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-vital border border-vital/60 hover:bg-vital hover:text-ink-950 px-3 py-2 transition-colors"
          >
            › OPEN.MODULE
          </button>
          <button
            onClick={() => runCommand('REBOOT')}
            className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-bone-dim border border-bone-fade/40 hover:text-bone hover:border-bone-fade px-3 py-2 transition-colors"
          >
            REBOOT
          </button>
        </div>
      </section>
    </div>
  );
}
