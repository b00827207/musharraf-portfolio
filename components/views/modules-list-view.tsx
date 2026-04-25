'use client';

import { useAether } from '../aether-core';
import { cases } from '@/lib/data';
import { Typewriter } from '../typewriter';

export function ModulesListView() {
  const { setView } = useAether();

  return (
    <div className="space-y-10 pt-2 md:pt-6">
      <header>
        <div className="font-mono text-eyebrow uppercase text-vital mb-3 flex items-center gap-3">
          <span className="status-dot" />
          <span>MODULE REGISTRY · {cases.length} ON FILE</span>
        </div>
        <h1 className="font-display text-diagnosis font-light text-bone tracking-[-0.03em]">
          Engagements <span className="italic vital-underline">enumerated.</span>
        </h1>
        <p className="mt-4 font-mono text-tiny uppercase tracking-[0.16em] text-bone-dim max-w-xl">
          <Typewriter
            text="Five live modules. Click to load. Each one has a live intelligence brief inside."
            speed={14}
          />
        </p>
      </header>

      <ul className="border-t border-bone-fade/30">
        {cases.map((c, i) => (
          <li key={c.slug}>
            <button
              onClick={() => setView({ type: 'module', slug: c.slug })}
              className="w-full grid grid-cols-12 gap-4 py-5 border-b border-bone-fade/30 text-left items-start group hover:bg-vital/[0.02] px-2 -mx-2 transition-colors"
            >
              <span className="col-span-12 md:col-span-1 font-mono text-[10px] tabular text-bone-deep">
                {c.caseNumber}
              </span>

              <div className="col-span-12 md:col-span-5">
                <div className="font-display text-[1.4rem] text-bone leading-tight tracking-tight group-hover:text-vital transition-colors">
                  {c.patient}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim mt-1">
                  {c.patientMeta}
                </div>
              </div>

              <div className="col-span-6 md:col-span-2">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1">
                  DOMAIN
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone">
                  {c.domain}
                </div>
              </div>

              <div className="col-span-6 md:col-span-3">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1">
                  HEADLINE
                </div>
                <div className="font-mono text-[11px] tabular text-vital">
                  {c.vitals[0].value}
                </div>
                <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone-dim mt-0.5">
                  {c.vitals[0].label}
                </div>
              </div>

              <span className="col-span-12 md:col-span-1 font-mono text-[14px] text-right text-bone-deep group-hover:text-vital transition-colors mt-1">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
