'use client';

import { profile } from '@/lib/data';
import { Reveal, SplitReveal } from './reveal';

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div
        className="absolute right-5 md:right-10 top-8 md:top-12 font-display font-light section-num pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(8rem, 18vw, 18rem)' }}
        aria-hidden
      >
        04
      </div>

      <div className="max-w-[1380px] mx-auto px-5 md:px-10 relative">
        <Reveal>
          <div className="font-mono text-eyebrow uppercase text-terra mb-10 flex items-center gap-3">
            <span className="w-8 h-px bg-terra" />
            <span>About</span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h2 className="font-display font-light text-h2 leading-[1.04] tracking-[-0.03em] text-ink">
              <SplitReveal text="Engineer first." staggerMs={60} />
              <br />
              <SplitReveal text="Strategist now." delay={400} staggerMs={60} emphasizeWords={['now.']} />
            </h2>

            <Reveal delay={500} className="mt-8 max-w-2xl">
              <p className="font-display text-lead text-ink-dim leading-[1.55]">
                Bachelor in Electronics &amp; Communications — Panimalar Institute, Chennai (8.6/10, First Class with Distinction).
                Then four years in commercial roles at the front line of EdTech and regional events. The instinct for systems came first; the marketing came after.
              </p>
            </Reveal>

            <Reveal delay={650} className="mt-6 max-w-2xl">
              <p className="font-display text-lead text-ink-dim leading-[1.55]">
                Now in my second year of the ESSEC Masters in Management — top 10 globally per FT, GMAT 735, top 5% globally.
                Specialising in Marketing &amp; Digital Strategy. Available September 2026 in Paris for alternance or full-time.
              </p>
            </Reveal>

            <Reveal delay={800} className="mt-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <Stat label="GMAT" value="735" sub="top 5% global" />
                <Stat label="LANGUAGES" value="6" sub="EN fluent · FR A2" />
                <Stat label="CGPA · B.TECH" value="8.6" sub="first class · distinction" />
              </div>
            </Reveal>
          </div>

          {/* Independent work + leadership */}
          <Reveal delay={500} className="md:col-span-5">
            <div className="bg-paper-warm/60 border border-paper-edge p-7 md:p-8 rounded-sm">
              <div className="font-mono text-eyebrow uppercase text-terra mb-6">
                Beyond the case files
              </div>

              <Block
                year="2022–23"
                title="Founder & President"
                org="EDGI · Educating Deserving Generation of India"
                detail="150+ girls served. ₹400K community funding raised. 92% school enrollment rate."
              />
              <Block
                year="2021–23"
                title="Founder & President"
                org="TITA · Telugu Cultural Club"
                detail="Scaled 40 → 298 active members across 12+ institutions. 14+ flagship events annually."
              />
              <Block
                year="2024"
                title="Volunteer Educator"
                org="Bhumi · Digital Literacy Program"
                detail="12-week curriculum for 350+ girls from underserved communities. 89% measured skills improvement."
              />

              <div className="mt-6 pt-5 border-t border-paper-edge font-mono text-tiny uppercase tracking-[0.16em] text-ink-deep">
                Independent case studies: Blink It · Zerodha · Boeing · derivatives pricing
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Contact band */}
      <div id="contact" className="mt-24 md:mt-36 bg-ink text-paper py-20 md:py-32">
        <div className="max-w-[1380px] mx-auto px-5 md:px-10 relative">
          <Reveal>
            <div className="font-mono text-eyebrow uppercase text-terra mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-terra" />
              <span>Contact</span>
            </div>
          </Reveal>

          <h2 className="font-display font-light text-h1 leading-[0.92] tracking-[-0.045em] max-w-[12ch]">
            <SplitReveal text="Let's talk." staggerMs={70} emphasizeWords={[]} />
          </h2>

          <Reveal delay={400} className="mt-8 max-w-2xl">
            <p className="font-display text-lead text-paper/70 leading-[1.55]">
              For consult, alternance, or full-time conversations from September 2026.
              No forms. Direct lines below.
            </p>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-2 gap-4 max-w-3xl">
            <a
              href={`mailto:${profile.email}?subject=Hello%20Musharraf`}
              className="border border-paper/30 hover:border-terra hover:bg-terra/5 px-6 py-7 transition-all group"
            >
              <div className="font-mono text-tiny uppercase tracking-[0.18em] text-paper/60 group-hover:text-terra transition-colors mb-2">
                Email ↗
              </div>
              <div className="font-display text-[1.3rem] md:text-[1.55rem] text-paper leading-tight tabular break-all">
                {profile.email}
              </div>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="border border-paper/30 hover:border-terra hover:bg-terra/5 px-6 py-7 transition-all group"
            >
              <div className="font-mono text-tiny uppercase tracking-[0.18em] text-paper/60 group-hover:text-terra transition-colors mb-2">
                Phone ↗
              </div>
              <div className="font-display text-[1.3rem] md:text-[1.55rem] text-paper leading-tight tabular">
                {profile.phone}
              </div>
            </a>
          </div>

          <div className="mt-14 pt-10 border-t border-paper/20 font-mono text-tiny uppercase tracking-[0.18em] text-paper/50 flex flex-wrap items-baseline justify-between gap-3">
            <span>{profile.location} · {profile.role}</span>
            <span>Available · {profile.available}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="border-l-2 border-terra pl-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-deep mb-1">
        {label}
      </div>
      <div className="font-display text-[1.8rem] text-ink leading-none tabular tracking-[-0.02em]">
        {value}
      </div>
      <div className="font-sans text-[12px] text-ink-dim mt-1.5">{sub}</div>
    </div>
  );
}

function Block({
  year,
  title,
  org,
  detail,
}: {
  year: string;
  title: string;
  org: string;
  detail: string;
}) {
  return (
    <div className="py-4 first:pt-0 border-b border-paper-edge last:border-b-0">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <div className="font-mono text-tiny uppercase tracking-[0.14em] text-ink-deep tabular">{year}</div>
      </div>
      <div className="font-display text-[1.1rem] text-ink leading-tight">{title}</div>
      <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-terra mt-0.5">{org}</div>
      <div className="font-sans text-[13px] text-ink-dim mt-2 leading-[1.55]">{detail}</div>
    </div>
  );
}
