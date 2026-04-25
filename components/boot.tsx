'use client';

import { useEffect, useState } from 'react';

const BOOT_LINES = [
  { delay: 0, text: 'AETHER v3.0.1 — initializing console', tone: 'dim' },
  { delay: 60, text: 'cpu.handshake .................. OK', tone: 'dim' },
  { delay: 120, text: 'memory.allocate ................ OK', tone: 'dim' },
  { delay: 180, text: 'kernel.load .................... OK', tone: 'dim' },
  { delay: 260, text: 'mounting telemetry rail ........ OK', tone: 'vital' },
  { delay: 340, text: 'loading module registry ........ OK', tone: 'vital' },
  { delay: 400, text: '  > module: CRIO.REVENUE-ENGINE', tone: 'dim' },
  { delay: 440, text: '  > module: MARSELIA.VERTICAL-INT', tone: 'dim' },
  { delay: 480, text: '  > module: BVLGARI.CORPO-ARCH', tone: 'dim' },
  { delay: 520, text: '  > module: KNR.OPS-GRID', tone: 'dim' },
  { delay: 560, text: '  > module: COMTESSE.TRADE-MKT', tone: 'dim' },
  { delay: 620, text: 'establishing diagnostic channel  OK', tone: 'vital' },
  { delay: 700, text: 'identity verified: ATTENDING', tone: 'vital' },
  { delay: 780, text: 'authorization: PUBLIC ACCESS', tone: 'amber' },
  { delay: 860, text: 'ALL SYSTEMS NOMINAL', tone: 'vital' },
  { delay: 980, text: '> READY.', tone: 'bright' },
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setShown(i + 1);
        }, line.delay)
      );
    });
    timers.push(
      setTimeout(() => {
        onDone();
      }, BOOT_LINES[BOOT_LINES.length - 1].delay + 600)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 bg-ink-950 flex items-center justify-center px-6"
      role="status"
      aria-label="System booting"
    >
      {/* Vertical progress shimmer at edges */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-vital/30 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-vital/30 to-transparent" />

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="font-mono text-eyebrow uppercase text-bone-deep mb-6 flex items-center gap-3">
          <span className="status-dot" />
          <span className="tracking-[0.25em]">SYSTEM BOOT</span>
          <span className="text-bone-fade">/</span>
          <span className="text-bone-dim">AETHER OS</span>
        </div>

        {/* Boot lines */}
        <div className="font-mono text-[12px] md:text-[13px] leading-[1.7] tabular space-y-0.5">
          {BOOT_LINES.slice(0, shown).map((line, i) => (
            <div
              key={i}
              className={`boot-line ${
                line.tone === 'vital'
                  ? 'text-vital'
                  : line.tone === 'amber'
                    ? 'text-[var(--amber)]'
                    : line.tone === 'bright'
                      ? 'text-bone'
                      : 'text-bone-dim'
              }`}
            >
              <span className="text-bone-fade mr-3 select-none">
                [{String(line.delay).padStart(4, '0')}]
              </span>
              {line.text}
            </div>
          ))}
          {shown < BOOT_LINES.length && (
            <div className="text-vital cursor-mono font-bold">&nbsp;</div>
          )}
        </div>
      </div>
    </div>
  );
}
