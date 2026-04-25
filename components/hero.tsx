'use client';

import { useEffect, useState } from 'react';
import { SplitReveal, Reveal } from './reveal';
import { profile } from '@/lib/data';

const MARQUEE_ITEMS = [
  '€14.05M ANNUAL SYNERGY',
  '$1.17B BASE-CASE 5Y REVENUE',
  '₹4.2M DIRECT B2B REVENUE',
  '11× BUSINESS GROWTH',
  '€23M Y3 REVENUE TARGET',
  '+12pp CONVERSION LIFT',
  '33.7-MO ACQUISITION PAYBACK',
  '92% EVENT SUCCESS RATE',
];

export function Hero() {
  const [parisTime, setParisTime] = useState('');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(d);
    };
    setParisTime(fmt());
    const id = setInterval(() => setParisTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-5 md:px-10">
        {/* Top meta strip */}
        <Reveal as="div" className="flex flex-wrap items-center justify-between gap-4 mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="dot" />
            <span className="font-mono text-eyebrow uppercase text-ink-dim">
              Available · Sept 2026
            </span>
          </div>
          <div className="font-mono text-tiny uppercase text-ink-deep tracking-[0.16em]">
            <span className="hidden md:inline">Paris · </span>
            <span className="tabular text-ink-dim">{parisTime || '—'}</span>
            <span className="hidden md:inline ml-3 pl-3 border-l border-paper-edge text-ink-deep">CET</span>
          </div>
        </Reveal>

        {/* Big headline */}
        <h1 className="font-display font-light text-h1 leading-[0.92] tracking-[-0.045em] text-ink display">
          <SplitReveal
            text="A marketing strategist"
            staggerMs={45}
          />
          <br />
          <SplitReveal
            text="who finds where revenue is bleeding —"
            delay={250}
            staggerMs={45}
            emphasizeWords={['bleeding', 'bleeding —']}
          />
          <br />
          <SplitReveal
            text="and builds the system that fixes it."
            delay={650}
            staggerMs={42}
            emphasizeWords={['fixes', 'fixes it.']}
          />
        </h1>

        {/* Subline */}
        <Reveal delay={1100} className="mt-10 md:mt-12 max-w-2xl">
          <p className="font-sans text-lead text-ink-dim leading-[1.55]">
            I run diagnostics on B2B funnels, M&amp;A targets, and global brand launches.
            Five engagements on file. Five outcomes shipped. Currently at ESSEC, working in Paris from September 2026.
          </p>
        </Reveal>

        {/* Quick credential row */}
        <Reveal delay={1300} className="mt-10 md:mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 max-w-3xl">
            <Cred label="Education" value="ESSEC MiM 2025–27" sub="GMAT 735 · top 5% global" />
            <Cred label="Languages" value="EN · FR (A2) +4" sub="six on record" />
            <Cred label="Engagements" value="5 on file" sub="all delivered" />
            <Cred label="Available" value="Sept 2026" sub="alternance & full-time" />
          </div>
        </Reveal>
      </div>

      {/* GIANT signature — way at the bottom of hero, almost decorative */}
      <Reveal delay={1500} className="mt-16 md:mt-24 overflow-hidden">
        <div className="font-display font-light text-mega leading-[0.85] tracking-[-0.06em] text-ink whitespace-nowrap relative">
          <span className="block ml-[-0.04em] pl-5 md:pl-10">
            {profile.name}<span className="text-terra">.</span>
          </span>
          {/* faint role echo */}
          <span className="absolute left-5 md:left-10 top-0 font-display italic text-ink-fade opacity-30 text-mega leading-[0.85] tracking-[-0.06em] translate-y-[8%] translate-x-[2%] hidden md:inline">
            {profile.name}.
          </span>
        </div>
      </Reveal>

      {/* Marquee ribbon — the metrics that prove it */}
      <Reveal delay={1700} className="mt-16 md:mt-20 border-y border-paper-edge bg-paper-warm/60 marquee-pause">
        <div className="overflow-hidden">
          <div className="marquee-track py-4">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="flex items-center gap-4 font-mono text-tiny uppercase tracking-[0.18em] text-ink-dim shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-terra inline-block" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Cred({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-deep mb-1">
        {label}
      </div>
      <div className="font-display text-[1.1rem] md:text-[1.25rem] text-ink leading-tight tabular">
        {value}
      </div>
      <div className="font-sans text-[12.5px] text-ink-dim mt-1">{sub}</div>
    </div>
  );
}
