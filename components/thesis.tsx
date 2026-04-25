'use client';

import { Reveal, SplitReveal } from './reveal';

export function Thesis() {
  return (
    <section id="thesis" className="relative py-24 md:py-36 bg-paper-warm/50 border-y border-paper-edge">
      {/* Massive faded section number */}
      <div
        className="absolute right-5 md:right-10 top-8 md:top-12 font-display font-light section-num pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
        aria-hidden
      >
        01
      </div>

      <div className="max-w-[1380px] mx-auto px-5 md:px-10 relative">
        <Reveal>
          <div className="font-mono text-eyebrow uppercase text-terra mb-10 flex items-center gap-3">
            <span className="w-8 h-px bg-terra" />
            <span>The thesis</span>
          </div>
        </Reveal>

        <h2 className="font-display font-light text-h2 leading-[1.04] tracking-[-0.03em] text-ink max-w-[20ch]">
          <SplitReveal
            text="Marketing is operations,"
            staggerMs={50}
          />{' '}
          <SplitReveal
            text="written in money."
            delay={350}
            staggerMs={50}
            emphasizeWords={['money.']}
          />
        </h2>

        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 md:gap-12">
          <Reveal delay={200} className="md:col-span-7 md:col-start-1">
            <p className="font-display text-lead text-ink-dim leading-[1.55]">
              Every brand, no matter how loved, is a sequence of conversion ratios stitched together: <em className="text-ink not-italic font-medium">awareness × consideration × purchase × repeat</em>.
              When the numbers stop landing, the brand isn&apos;t broken — the system underneath it is.
            </p>
          </Reveal>

          <Reveal delay={350} className="md:col-span-7 md:col-start-3">
            <p className="font-display text-lead text-ink-dim leading-[1.55]">
              I find the leak — usually somewhere quiet, like a 38% margin surrendered to a cargo lessor, or a 45% Christmas dependency that
              suffocates the other eleven months — and rebuild the operating model around it. Sometimes that means a 4C Synergy framework
              for an M&amp;A. Sometimes it means cutting the SKU list from 450 to 250.
            </p>
          </Reveal>

          <Reveal delay={500} className="md:col-span-7 md:col-start-5">
            <p className="font-display text-lead text-ink-dim leading-[1.55]">
              The deliverable is always the same shape: <em className="text-terra not-italic font-medium">a number that moves, on a date you can name</em>.
              €14.05M annual synergy by Year 2. €23M revenue by Year 3. 11× growth in eighteen months. The strategy is what gets the number to move.
            </p>
          </Reveal>
        </div>

        {/* Practitioner shorthand */}
        <Reveal delay={700} className="mt-14 md:mt-20 border-t border-paper-edge pt-8 md:pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            {[
              { num: '01', verb: 'DIAGNOSE', detail: 'Where is the system bleeding? Quantify it. Source the leak.' },
              { num: '02', verb: 'MODEL', detail: 'Three scenarios. Bear, base, bull. Numbers that survive scrutiny.' },
              { num: '03', verb: 'DESIGN', detail: 'The intervention is a sequence of decisions, not a deck.' },
              { num: '04', verb: 'SHIP', detail: 'KPI dashboards, governance gates, weekly reads. Until the number moves.' },
            ].map((p) => (
              <div key={p.num}>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-terra tabular mb-2">{p.num}</div>
                <div className="font-display text-[1.15rem] md:text-[1.3rem] text-ink leading-tight tracking-[-0.01em]">
                  {p.verb}
                </div>
                <div className="font-sans text-[13px] text-ink-dim mt-2 leading-[1.5]">
                  {p.detail}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
