'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSound } from './sound';

export function MonitorBar() {
  const [time, setTime] = useState('');
  const { enabled, toggle } = useSound();

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      return new Intl.DateTimeFormat('en-GB', opts).format(d);
    };
    setTime(fmt());
    // Update every minute (not every second — too jittery for the clinical feel)
    const id = setInterval(() => setTime(fmt()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-ink-950/85 backdrop-blur-sm border-b border-bone-fade/40">
      <div className="max-w-[1500px] mx-auto px-5 md:px-8 py-3 flex items-center justify-between font-mono text-tiny text-bone-dim">
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:text-bone transition-colors"
        >
          <span className="status-dot" />
          <span className="uppercase tracking-[0.18em]">DIAGNOSTIC</span>
          <span className="text-bone-deep">/</span>
          <span className="text-bone-dim">MUSHARRAF SHAIK</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <span className="text-bone-deep">PARIS · CET</span>
          <span className="tabular text-bone">{time || '--:--'}</span>
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 group transition-colors hover:text-bone"
            aria-label={enabled ? 'Disable monitor sound' : 'Enable monitor sound'}
            title={enabled ? 'Sound on — click to mute' : 'Sound off — click to enable'}
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                enabled ? 'bg-vital shadow-[0_0_6px_var(--vital)]' : 'bg-bone-deep'
              }`}
            />
            <span className="uppercase tracking-[0.18em]">
              SND {enabled ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <span className="tabular">{time || '--:--'}</span>
          <button
            onClick={toggle}
            className="flex items-center gap-1"
            aria-label={enabled ? 'Mute' : 'Unmute'}
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                enabled ? 'bg-vital' : 'bg-bone-deep'
              }`}
            />
            <span className="uppercase tracking-[0.15em] text-[9px]">SND</span>
          </button>
        </div>
      </div>
    </header>
  );
}
