'use client';

import { Reveal, SplitReveal } from './reveal';

const RANGE = [
  {
    label: 'STRATEGY & ANALYSIS',
    items: [
      'Market analysis & research',
      'Financial modelling & valuation',
      'ROI analysis & scenario planning',
      'Competitive intelligence',
      'PESTEL · Porter · SWOT',
    ],
  },
  {
    label: 'CONSUMER & BRAND',
    items: [
      'Consumer insights & panel analysis',
      'Customer segmentation & archetypes',
      'Brand positioning & narrative',
      'Premium & luxury launch',
      'CRM segmentation at scale',
    ],
  },
  {
    label: 'TRADE & RETAIL',
    items: [
      '360° trade marketing',
      'SKU rationalisation',
      'Retail operations roadmap',
      'B2B corporate gifting',
      'Channel strategy',
    ],
  },
  {
    label: 'B2B & PIPELINE',
    items: [
      'Sales-cycle optimisation',
      'Lead scoring & qualification',
      'Pipeline KPI dashboards',
      'Cross-functional briefing',
      'Account management',
    ],
  },
  {
    label: 'M&A & VALUATION',
    items: [
      'Multi-criteria target evaluation',
      'Synergy framework design',
      'Three-scenario P&L',
      'Vertical integration strategy',
      'Valuation triangulation',
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      'Vendor cost negotiation',
      'KPI governance design',
      'Implementation phasing',
      'Risk register & mitigation',
      'Billing & process automation',
    ],
  },
];

export function Range() {
  return (
    <section id="range" className="relative py-24 md:py-36 bg-paper-warm/50 border-y border-paper-edge">
      <div
        className="absolute right-5 md:right-10 top-8 md:top-12 font-display font-light section-num pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
        aria-hidden
      >
        03
      </div>

      <div className="max-w-[1380px] mx-auto px-5 md:px-10 relative">
        <Reveal>
          <div className="font-mono text-eyebrow uppercase text-terra mb-10 flex items-center gap-3">
            <span className="w-8 h-px bg-terra" />
            <span>Range</span>
          </div>
        </Reveal>

        <h2 className="font-display font-light text-h2 leading-[1.04] tracking-[-0.03em] text-ink max-w-[20ch]">
          <SplitReveal text="Across the whole" staggerMs={50} />{' '}
          <SplitReveal text="marketing surface." delay={300} staggerMs={50} emphasizeWords={['surface.']} />
        </h2>

        <Reveal delay={400} className="mt-8 max-w-2xl">
          <p className="font-display text-lead text-ink-dim leading-[1.55]">
            Strategy, brand, B2B, retail, M&amp;A. Numbers and narratives both.
            Built bottom-up over three engagements at ESSEC and two in industry.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {RANGE.map((r, i) => (
            <Reveal key={r.label} delay={i * 80}>
              <div className="border-t border-ink/15 pt-5 group">
                <div className="font-mono text-eyebrow uppercase text-terra mb-4 flex items-center gap-2">
                  <span className="font-display tabular text-[10px]">0{i + 1}</span>
                  <span>·</span>
                  <span>{r.label}</span>
                </div>
                <ul className="space-y-2 font-sans text-[14.5px] text-ink leading-[1.6]">
                  {r.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="text-terra mt-0.5">›</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
