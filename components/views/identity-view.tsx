'use client';

import { Typewriter } from '../typewriter';
import { useAether } from '../aether-core';
import { profile, cases } from '@/lib/data';
import { useState, useEffect } from 'react';

export function IdentityView() {
  const { runCommand } = useAether();

  // Sequenced typewriter lines
  const lines = [
    { delay: 100, label: 'INITIALIZING SCAN', value: '...' },
    { delay: 700, label: 'TARGET ACQUIRED', value: 'POSITIVE MATCH' },
    { delay: 1400, label: 'SUBJECT', value: profile.name.toUpperCase() },
    { delay: 1900, label: 'ROLE', value: profile.role.toUpperCase() },
    { delay: 2400, label: 'CALLSIGN', value: 'B2B STRATEGIST · DATA-DRIVEN' },
    { delay: 2900, label: 'LOCATION', value: profile.location.toUpperCase() },
    { delay: 3400, label: 'EDUCATION', value: 'ESSEC MIM · GMAT 735 · TOP 5% GLOBAL' },
    { delay: 3900, label: 'PRIOR', value: 'PANIMALAR INST · B.TECH ECE · 8.6 CGPA' },
    { delay: 4400, label: 'ENGAGEMENTS ON FILE', value: `${cases.length} CONFIRMED · ALL DELIVERED` },
    { delay: 4900, label: 'LANGUAGES', value: 'EN · FR (A2) · 6 ON RECORD' },
    { delay: 5400, label: 'AVAILABILITY', value: profile.available.toUpperCase() },
    { delay: 5900, label: 'THREAT LEVEL', value: 'NEGLIGIBLE' },
    { delay: 6400, label: 'RECOMMENDATION', value: 'HIRE' },
  ];

  return (
    <div className="space-y-10 pt-4 md:pt-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-baseline gap-3">
        <div className="font-mono text-eyebrow uppercase text-vital flex items-center gap-3">
          <span className="status-dot" />
          <span>IDENTITY SCAN · ACTIVE</span>
        </div>
        <div className="font-mono text-tiny uppercase text-bone-deep">
          / {new Date().toISOString().slice(0, 10).replace(/-/g, '.')}
        </div>
      </div>

      {/* SUBJECT BIG */}
      <div className="border border-bone-fade/30 bg-ink-900/30 p-6 md:p-8 bracket relative">
        <span className="bl" />
        <span className="br" />

        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-deep mb-3">
          PROFILE LOAD · LIVE
        </div>
        <h1 className="font-display text-mega font-light text-bone leading-[0.95] tracking-[-0.04em] glitch-once">
          {profile.name}
        </h1>
        <div className="mt-4 font-mono text-tiny uppercase tracking-[0.16em] text-bone-dim">
          <Typewriter text={profile.role} speed={20} delay={400} />
        </div>
      </div>

      {/* SCAN LINES */}
      <div className="space-y-1.5 font-mono text-[12px] md:text-[13px] tabular leading-[1.7]">
        {lines.map((l, i) => (
          <div key={i} className="flex items-baseline gap-3 md:gap-6 group">
            <SequencedLine delay={l.delay} label={l.label} value={l.value} index={i} />
          </div>
        ))}
        <div className="pt-3">
          <SequencedLine delay={6800} label="STATUS" value="STANDING BY · AWAITING RECRUIT.OPEN" index={lines.length} bright />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-bone-fade/30">
        <ActionButton onClick={() => runCommand('RECRUIT')} primary>
          OPEN RECRUIT.CHANNEL
        </ActionButton>
        <ActionButton onClick={() => runCommand('LIST.MODULES')}>
          LIST.MODULES
        </ActionButton>
        <ActionButton onClick={() => runCommand('REBOOT')}>
          REBOOT
        </ActionButton>
      </div>
    </div>
  );
}

function SequencedLine({
  delay,
  label,
  value,
  index,
  bright = false,
}: {
  delay: number;
  label: string;
  value: string;
  index: number;
  bright?: boolean;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6 transition-opacity"
      style={{ opacity: shown ? 1 : 0 }}
    >
      <span className="text-bone-fade w-5 inline-block tabular text-[10px]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-bone-deep uppercase tracking-[0.18em] text-[10px] w-full md:w-[200px]">
        {label}
      </span>
      <span className="text-bone-fade hidden md:inline">·</span>
      <span className={`uppercase tracking-[0.06em] ${bright ? 'text-vital' : 'text-bone'}`}>
        {shown && <Typewriter text={value} speed={14} cursor={false} />}
      </span>
    </div>
  );
}

function ActionButton({
  onClick,
  children,
  primary = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[10.5px] uppercase tracking-[0.16em] px-3 py-2 transition-colors flex items-center gap-2 border ${
        primary
          ? 'text-vital border-vital/60 hover:bg-vital hover:text-ink-950'
          : 'text-bone-dim border-bone-fade/40 hover:text-vital hover:border-vital/60'
      }`}
    >
      <span>›</span>
      <span>{children}</span>
    </button>
  );
}
