'use client';

import { useAether } from './aether-core';
import { useEffect, useState } from 'react';

export function TelemetryRail() {
  const { events, sessionId, bootedAt, soundOn, toggleSound } = useAether();
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState('00:00');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(d);
    };
    setTime(fmt());
    const id = setInterval(() => {
      setTime(fmt());
      const ms = Date.now() - bootedAt;
      const totalSec = Math.floor(ms / 1000);
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      setUptime(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(id);
  }, [bootedAt]);

  return (
    <aside className="hidden lg:block w-[260px] shrink-0 border-r border-bone-fade/30 bg-ink-900/40 sticky top-0 self-start max-h-screen overflow-hidden">
      <div className="h-screen flex flex-col text-[10px] font-mono">
        {/* HEADER */}
        <div className="px-4 py-3 border-b border-bone-fade/30">
          <div className="flex items-center gap-2 text-bone-deep uppercase tracking-[0.18em]">
            <span className="status-dot" />
            <span>AETHER</span>
            <span className="text-bone-fade">·</span>
            <span>v3.0.1</span>
          </div>
          <div className="mt-1.5 text-bone-dim text-[9px] uppercase tracking-[0.18em]">
            CONSOLE · OPERATIONAL
          </div>
        </div>

        {/* SESSION */}
        <div className="px-4 py-3.5 border-b border-bone-fade/30 space-y-2">
          <Field label="SESSION" value={sessionId} />
          <Field label="UPTIME" value={uptime} />
          <Field label="LOCAL · CET" value={time} />
        </div>

        {/* SYSTEM STATUS */}
        <div className="px-4 py-3.5 border-b border-bone-fade/30 space-y-2">
          <div className="text-bone-deep uppercase tracking-[0.18em] text-[9px] mb-2">
            SYSTEM STATUS
          </div>
          <StatusRow label="MODULE REGISTRY" value="5 / 5" status="ok" />
          <StatusRow label="DIAG CHANNEL" value="OPEN" status="ok" />
          <StatusRow label="TELEMETRY" value="STREAMING" status="ok" />
          <StatusRow label="THREAT LEVEL" value="MIN" status="warn" />
        </div>

        {/* MINI EKG */}
        <div className="px-4 py-3 border-b border-bone-fade/30">
          <div className="text-bone-deep uppercase tracking-[0.18em] text-[9px] mb-2 flex items-center justify-between">
            <span>VITALS</span>
            <span className="text-vital tabular">SYS</span>
          </div>
          <svg viewBox="0 0 200 30" className="w-full h-7" aria-hidden>
            <path
              d="M 0 15 L 50 15 Q 56 15 60 11 Q 64 7 68 15 L 90 15 L 96 15 L 100 15 L 103 4 L 106 26 L 109 9 L 112 15 L 130 15 L 150 15 Q 158 15 162 11 Q 166 7 170 15 L 200 15"
              fill="none"
              stroke="#7CFFB7"
              strokeWidth="1"
              strokeLinecap="round"
              className="ekg-line"
            />
          </svg>
        </div>

        {/* EVENT LOG */}
        <div className="flex-1 px-4 py-3 overflow-hidden flex flex-col">
          <div className="text-bone-deep uppercase tracking-[0.18em] text-[9px] mb-2 flex items-center justify-between">
            <span>EVENT LOG</span>
            <span className="text-bone-dim tabular">{events.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto pr-1 -mr-1 space-y-1.5">
            {events.length === 0 && (
              <div className="text-bone-deep text-[9.5px] italic">
                No events yet. Run a command.
              </div>
            )}
            {events.map((e) => (
              <div
                key={e.id}
                className="event-log-entry leading-relaxed"
              >
                <span className="text-bone-fade tabular text-[9px]">
                  {e.ts}
                </span>{' '}
                <span
                  className={
                    e.level === 'system'
                      ? 'text-vital'
                      : e.level === 'warn'
                        ? 'text-[var(--amber)]'
                        : e.level === 'query'
                          ? 'text-bone'
                          : 'text-bone-dim'
                  }
                >
                  {e.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SOUND TOGGLE */}
        <div className="px-4 py-3 border-t border-bone-fade/30">
          <button
            onClick={toggleSound}
            className="w-full flex items-center justify-between text-[9.5px] uppercase tracking-[0.18em] text-bone-dim hover:text-bone transition-colors"
            aria-pressed={soundOn}
          >
            <span>SND.{soundOn ? 'ON' : 'OFF'}</span>
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                soundOn ? 'bg-vital shadow-[0_0_6px_var(--vital)]' : 'bg-bone-deep'
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-bone-fade uppercase tracking-[0.18em] text-[9px]">
        {label}
      </div>
      <div className="text-bone tabular text-[11px] mt-0.5">{value}</div>
    </div>
  );
}

function StatusRow({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: 'ok' | 'warn' | 'err';
}) {
  const dotClass =
    status === 'ok'
      ? 'bg-vital shadow-[0_0_4px_var(--vital)]'
      : status === 'warn'
        ? 'bg-[var(--amber)] shadow-[0_0_4px_var(--amber)]'
        : 'bg-[var(--critical)] shadow-[0_0_4px_var(--critical)]';
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-bone-dim uppercase tracking-[0.16em] text-[9.5px]">
        {label}
      </span>
      <span className="flex items-center gap-1.5">
        <span className="text-bone tabular text-[10px]">{value}</span>
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotClass}`} />
      </span>
    </div>
  );
}
