'use client';

import { useAether } from '../aether-core';

export function HelpView() {
  const { runCommand } = useAether();

  const sections = [
    {
      title: 'CORE COMMANDS',
      items: [
        { cmd: 'HELP', desc: 'show this manifest' },
        { cmd: 'LIST.MODULES', desc: 'enumerate all engagements on file' },
        { cmd: 'WHO.IS', desc: 'identify the attending strategist' },
        { cmd: 'RECRUIT', desc: 'open consult request channel' },
        { cmd: 'REBOOT', desc: 'return to idle state' },
        { cmd: 'CLEAR', desc: 'clear the event log' },
      ],
    },
    {
      title: 'DIAGNOSTICS',
      items: [
        { cmd: 'DIAG.ACQUISITION', desc: 'top-funnel demand engineering' },
        { cmd: 'DIAG.CONVERSION', desc: 'pipeline & demo-to-deal' },
        { cmd: 'DIAG.RETENTION', desc: 'repeat-client architecture' },
        { cmd: 'DIAG.PRICING', desc: 'unit economics & integration' },
      ],
    },
    {
      title: 'MODULES',
      items: [
        { cmd: 'OPEN.CRIO', desc: 'B2B revenue engine · ₹4.2M direct revenue' },
        { cmd: 'OPEN.MARSELIA', desc: 'air cargo vertical integration · €14.05M synergy' },
        { cmd: 'OPEN.BVLGARI', desc: 'Corpo Architettura · $1.17B base case' },
        { cmd: 'OPEN.KNR', desc: 'operational grid · 11× growth' },
        { cmd: 'OPEN.COMTESSE', desc: '360 trade marketing · €23M target' },
      ],
    },
    {
      title: 'METRICS',
      items: [
        { cmd: 'SHOW.SYNERGY', desc: 'jump to NordAir 4C synergy view' },
        { cmd: 'SHOW.NORDAIR', desc: 'same — alias' },
      ],
    },
  ];

  return (
    <div className="space-y-10 pt-4 md:pt-8">
      <header>
        <div className="font-mono text-eyebrow uppercase text-bone-deep mb-3 flex items-center gap-3">
          <span className="status-dot" />
          <span>COMMAND MANIFEST</span>
        </div>
        <h1 className="font-display text-diagnosis font-light text-bone tracking-[-0.03em]">
          Available <span className="italic vital-underline">commands.</span>
        </h1>
        <p className="mt-4 font-mono text-tiny uppercase tracking-[0.16em] text-bone-dim max-w-xl">
          Type any command into the bar below. Use <span className="text-vital">TAB</span> to autocomplete the highlighted suggestion. Use <span className="text-vital">↑↓</span> to recall history.
        </p>
      </header>

      {sections.map((sec) => (
        <section key={sec.title}>
          <div className="font-mono text-eyebrow uppercase text-bone-deep mb-3 flex items-center gap-3">
            <span className="w-5 h-px bg-bone-fade" />
            <span>{sec.title}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {sec.items.map((it) => (
              <button
                key={it.cmd}
                onClick={() => runCommand(it.cmd)}
                className="text-left border border-bone-fade/40 hover:border-vital/60 hover:bg-vital/[0.03] px-4 py-3 transition-colors group"
              >
                <div className="font-mono text-[11.5px] tracking-[0.05em] text-vital group-hover:text-bone transition-colors">
                  {it.cmd}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim mt-1">
                  {it.desc}
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
