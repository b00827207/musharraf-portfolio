'use client';

import { Typewriter } from '../typewriter';
import { useAether } from '../aether-core';
import { profile, cases } from '@/lib/data';

export function IdleView() {
  const { runCommand } = useAether();

  const tiles = [
    { cmd: 'DIAG.ACQUISITION', label: 'Acquisition', desc: 'top-funnel demand engineering' },
    { cmd: 'DIAG.CONVERSION', label: 'Conversion', desc: 'pipeline & demo-to-deal' },
    { cmd: 'DIAG.RETENTION', label: 'Retention', desc: 'repeat-client architecture' },
    { cmd: 'DIAG.PRICING', label: 'Pricing', desc: 'unit economics & integration' },
  ];

  return (
    <div className="space-y-12 md:space-y-16">
      {/* HEADLINE */}
      <header className="pt-6 md:pt-10">
        <div className="font-mono text-eyebrow uppercase text-bone-deep mb-5 flex items-center gap-3">
          <span className="status-dot" />
          <span>SUBJECT INTAKE · CHANNEL OPEN</span>
        </div>
        <h1 className="font-display text-mega font-light text-bone leading-[0.95] tracking-[-0.04em]">
          Where is your{' '}
          <span className="italic vital-underline">revenue</span>{' '}
          bleeding?
        </h1>
        <p className="mt-6 font-mono text-tiny uppercase tracking-[0.18em] text-bone-dim max-w-md">
          <Typewriter
            text="Type a command below or pick a domain. AETHER will load the relevant case file."
            speed={16}
            delay={300}
          />
        </p>
      </header>

      {/* DOMAIN TILES */}
      <section
        aria-label="Diagnostic domains"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {tiles.map((t, i) => (
          <button
            key={t.cmd}
            onClick={() => runCommand(t.cmd)}
            className="bracket relative border border-bone-fade/50 bg-ink-900/30 px-5 py-7 text-left hover:border-vital/60 hover:bg-vital/[0.03] transition-all group focus:outline-none"
          >
            <span className="bl" />
            <span className="br" />

            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-4 flex items-center justify-between">
              <span>{`0${i + 1}`}</span>
              <span className="text-bone-dim group-hover:text-vital transition-colors">
                {t.cmd}
              </span>
            </div>

            <div className="font-display text-lead text-bone group-hover:text-vital transition-colors leading-tight">
              {t.label}
            </div>

            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim">
              {t.desc}
            </div>
          </button>
        ))}
      </section>

      {/* QUICK COMMANDS */}
      <section>
        <div className="font-mono text-eyebrow uppercase text-bone-deep mb-4 flex items-center gap-3">
          <span className="w-5 h-px bg-bone-fade" />
          <span>QUICK ACCESS</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { cmd: 'WHO.IS', label: 'Identify the attending' },
            { cmd: 'LIST.MODULES', label: 'Enumerate all modules' },
            { cmd: 'OPEN.MARSELIA', label: 'Open NordAir M&A' },
            { cmd: 'SHOW.SYNERGY', label: 'Show €14.05M synergy' },
            { cmd: 'RECRUIT', label: 'Open consult channel' },
          ].map((q) => (
            <button
              key={q.cmd}
              onClick={() => runCommand(q.cmd)}
              className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-bone-dim hover:text-vital border border-bone-fade/40 hover:border-vital/60 px-3 py-2 transition-colors flex items-center gap-2"
            >
              <span className="text-bone-deep">›</span>
              <span className="text-bone">{q.cmd}</span>
              <span className="text-bone-fade hidden md:inline">— {q.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ATTENDING SLATE */}
      <section className="border-t border-bone-fade/30 pt-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1.5">
              ATTENDING
            </div>
            <div className="font-display text-lead text-bone leading-tight">
              {profile.name}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim mt-1">
              {profile.role}
            </div>
          </div>
          <div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1.5">
              LOCATION
            </div>
            <div className="font-mono text-bone tabular text-[13px]">
              {profile.location}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim mt-1">
              ON SITE & REMOTE
            </div>
          </div>
          <div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1.5">
              AVAILABLE
            </div>
            <div className="font-mono text-vital tabular text-[13px]">
              {profile.available}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim mt-1">
              ALTERNANCE & FULL-TIME
            </div>
          </div>
        </div>
      </section>

      {/* CASES TICKER */}
      <section>
        <div className="font-mono text-eyebrow uppercase text-bone-deep mb-3 flex items-center gap-3">
          <span className="w-5 h-px bg-bone-fade" />
          <span>{cases.length} ENGAGEMENTS ON FILE</span>
        </div>
        <ul className="border-t border-bone-fade/20">
          {cases.map((c) => (
            <li key={c.slug}>
              <button
                onClick={() => runCommand(`OPEN.${c.slug.split('-')[0].toUpperCase()}`)}
                className="w-full text-left grid grid-cols-12 gap-3 py-3 border-b border-bone-fade/20 items-baseline transition-colors hover:bg-vital/[0.02] hover:text-bone group px-2 -mx-2"
              >
                <span className="col-span-1 font-mono text-[10px] text-bone-deep tabular">
                  {c.caseNumber}
                </span>
                <span className="col-span-4 font-display text-[1.05rem] text-bone leading-tight tracking-tight group-hover:text-vital transition-colors">
                  {c.patient}
                </span>
                <span className="col-span-3 font-mono text-[10px] uppercase text-bone-dim hidden md:inline">
                  {c.domain}
                </span>
                <span className="col-span-3 font-mono text-[10px] text-bone-dim hidden md:inline">
                  {c.duration}
                </span>
                <span className="col-span-1 font-mono text-[10px] text-right text-bone-deep group-hover:text-vital transition-colors">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
