'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import { cases, profile } from '@/lib/data';

// ============================================================
// AETHER OPERATING STATE
// One source of truth for: events, view, sessionId, sound
// ============================================================

export type ViewState =
  | { type: 'idle' }
  | { type: 'diagnostic'; domain: string; caseIdx: number }
  | { type: 'module'; slug: string }
  | { type: 'identity' }
  | { type: 'modules-list' }
  | { type: 'recruit' }
  | { type: 'help' };

export type EventLogEntry = {
  id: number;
  ts: string;
  text: string;
  level: 'info' | 'warn' | 'system' | 'query';
};

type Ctx = {
  // View
  view: ViewState;
  setView: (v: ViewState) => void;

  // Event log
  events: EventLogEntry[];
  log: (text: string, level?: EventLogEntry['level']) => void;

  // Command dispatch
  runCommand: (cmd: string) => CommandResult;

  // Session
  sessionId: string;
  bootedAt: number;

  // Sound
  soundOn: boolean;
  toggleSound: () => void;
  beep: (kind?: 'soft' | 'success' | 'error') => void;
};

type CommandResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

const AetherCtx = createContext<Ctx | null>(null);

// === Time helper
function fmtTime() {
  const d = new Date();
  const opts: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return new Intl.DateTimeFormat('en-GB', opts).format(d);
}

// === Random session ID (cosmetic)
function makeSessionId() {
  const chars = '0123456789ABCDEF';
  let s = '';
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// === Command grammar
//
// Recognized:
//   HELP | ?
//   LIST.MODULES
//   DIAG.<DOMAIN>           ACQUISITION | CONVERSION | RETENTION | PRICING
//   OPEN.<SLUG>             marselia | bvlgari | comtesse | crio | knr
//   SHOW.<METRIC>           tries to fuzzy-match
//   WHO.IS                  identity
//   RECRUIT                 contact
//   REBOOT                  reset to idle
//   CLEAR                   clears the event log
//
const VALID_DOMAINS = ['ACQUISITION', 'CONVERSION', 'RETENTION', 'PRICING'];

const SLUG_ALIASES: Record<string, string> = {
  MARSELIA: 'marselia-vertical-integration',
  BVLGARI: 'bvlgari-corpo-architettura',
  BULGARI: 'bvlgari-corpo-architettura',
  COMTESSE: 'comtesse-trade-marketing',
  CRIO: 'crio-revenue-engine',
  CRIODO: 'crio-revenue-engine',
  KNR: 'knr-operational-grid',
};

export function AetherProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<ViewState>({ type: 'idle' });
  const [events, setEvents] = useState<EventLogEntry[]>([]);
  const eventIdRef = useRef(0);
  const [sessionId] = useState(() => makeSessionId());
  const [bootedAt] = useState(() => Date.now());
  const [soundOn, setSoundOn] = useState(false);

  // === Audio context
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ensureCtx = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      try {
        const Ctor = window.AudioContext || (window as any).webkitAudioContext;
        if (Ctor) audioCtxRef.current = new Ctor();
      } catch {
        return null;
      }
    }
    return audioCtxRef.current;
  }, []);

  const beep = useCallback(
    (kind: 'soft' | 'success' | 'error' = 'soft') => {
      if (!soundOn) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freqs = { soft: 880, success: 1100, error: 320 };
      const durations = { soft: 0.18, success: 0.22, error: 0.3 };

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqs[kind], now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durations[kind]);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + durations[kind] + 0.05);
    },
    [soundOn, ensureCtx]
  );

  const toggleSound = useCallback(() => {
    setSoundOn((p) => {
      const next = !p;
      if (next) ensureCtx();
      return next;
    });
  }, [ensureCtx]);

  // === Logging
  const log = useCallback(
    (text: string, level: EventLogEntry['level'] = 'info') => {
      eventIdRef.current += 1;
      const entry: EventLogEntry = {
        id: eventIdRef.current,
        ts: fmtTime(),
        text,
        level,
      };
      setEvents((prev) => [entry, ...prev].slice(0, 30));
    },
    []
  );

  // === View dispatch
  const setView = useCallback(
    (v: ViewState) => {
      setViewState(v);
      // Log nothing here — caller logs context-appropriately
    },
    []
  );

  // === Command dispatcher
  const runCommand = useCallback(
    (raw: string): CommandResult => {
      const cmd = raw.trim().toUpperCase();
      if (!cmd) return { ok: false, message: 'EMPTY COMMAND' };

      log(`> ${cmd}`, 'query');

      // HELP / ?
      if (cmd === 'HELP' || cmd === '?') {
        setViewState({ type: 'help' });
        beep('success');
        log('HELP MANIFEST DISPLAYED', 'system');
        return { ok: true, message: 'HELP DISPLAYED' };
      }

      // LIST.MODULES
      if (cmd === 'LIST.MODULES' || cmd === 'LIST' || cmd === 'MODULES') {
        setViewState({ type: 'modules-list' });
        beep('success');
        log(`${cases.length} MODULES ENUMERATED`, 'system');
        return { ok: true, message: 'MODULES LISTED' };
      }

      // WHO.IS
      if (cmd === 'WHO.IS' || cmd === 'WHO' || cmd === 'IDENTIFY') {
        setViewState({ type: 'identity' });
        beep('success');
        log(`IDENTITY SCAN INITIATED`, 'system');
        return { ok: true, message: 'IDENTITY SCAN' };
      }

      // RECRUIT
      if (cmd === 'RECRUIT' || cmd === 'CONSULT' || cmd === 'CONTACT' || cmd === 'HIRE') {
        setViewState({ type: 'recruit' });
        beep('success');
        log(`CONSULT REQUEST CHANNEL OPENED`, 'system');
        return { ok: true, message: 'CONSULT CHANNEL' };
      }

      // REBOOT
      if (cmd === 'REBOOT' || cmd === 'RESET' || cmd === 'EXIT' || cmd === 'HOME') {
        setViewState({ type: 'idle' });
        beep('soft');
        log(`SESSION REBOOTED · CONTEXT CLEARED`, 'system');
        return { ok: true, message: 'REBOOTED' };
      }

      // CLEAR
      if (cmd === 'CLEAR' || cmd === 'CLEAR.LOG') {
        setEvents([]);
        eventIdRef.current = 0;
        return { ok: true, message: 'LOG CLEARED' };
      }

      // DIAG.<DOMAIN>
      if (cmd.startsWith('DIAG.') || cmd.startsWith('DIAG ')) {
        const arg = cmd.replace(/^DIAG[.\s]/, '').trim();
        const matched = VALID_DOMAINS.find((d) => d === arg || d.startsWith(arg));
        if (matched) {
          setViewState({ type: 'diagnostic', domain: matched, caseIdx: 0 });
          beep('success');
          log(`DIAGNOSTIC ${matched} LOADED`, 'system');
          return { ok: true, message: `DIAGNOSTIC ${matched}` };
        }
        beep('error');
        log(`UNKNOWN DOMAIN: ${arg}`, 'warn');
        return {
          ok: false,
          message: `UNKNOWN DOMAIN: ${arg}. TRY DIAG.ACQUISITION | DIAG.CONVERSION | DIAG.RETENTION | DIAG.PRICING`,
        };
      }

      // OPEN.<MODULE>
      if (cmd.startsWith('OPEN.') || cmd.startsWith('OPEN ')) {
        const arg = cmd.replace(/^OPEN[.\s]/, '').trim();
        const slug = SLUG_ALIASES[arg] ?? null;
        if (slug) {
          setViewState({ type: 'module', slug });
          beep('success');
          log(`MODULE ${arg} LOADED`, 'system');
          return { ok: true, message: `MODULE ${arg}` };
        }
        beep('error');
        log(`UNKNOWN MODULE: ${arg}`, 'warn');
        return {
          ok: false,
          message: `UNKNOWN MODULE: ${arg}. TRY OPEN.MARSELIA | OPEN.BVLGARI | OPEN.COMTESSE | OPEN.CRIO | OPEN.KNR`,
        };
      }

      // SHOW.<X> — try to match a metric or topic in any case
      if (cmd.startsWith('SHOW.') || cmd.startsWith('SHOW ')) {
        const arg = cmd.replace(/^SHOW[.\s]/, '').trim();
        // Match by case file metric label or value
        for (const c of cases) {
          for (const v of c.vitals) {
            if (
              v.label.replace(/\s+/g, '').includes(arg) ||
              v.value.replace(/\s+/g, '').toUpperCase().includes(arg)
            ) {
              setViewState({ type: 'module', slug: c.slug });
              beep('success');
              log(`METRIC ${arg} → MODULE ${c.slug.toUpperCase()}`, 'system');
              return { ok: true, message: `MATCH: ${c.patient}` };
            }
          }
        }
        // SHOW.SYNERGY shortcut
        if (arg === 'SYNERGY' || arg === 'NORDAIR') {
          setViewState({ type: 'module', slug: 'marselia-vertical-integration' });
          beep('success');
          log(`MARSELIA / NORDAIR LOADED`, 'system');
          return { ok: true, message: 'NORDAIR SYNERGY' };
        }
        beep('error');
        log(`NO MATCH FOR ${arg}`, 'warn');
        return { ok: false, message: `NO METRIC MATCH FOR ${arg}` };
      }

      // Unknown command
      beep('error');
      log(`UNKNOWN COMMAND: ${cmd}`, 'warn');
      return {
        ok: false,
        message: `COMMAND NOT RECOGNIZED. TYPE HELP.`,
      };
    },
    [log, beep]
  );

  return (
    <AetherCtx.Provider
      value={{
        view,
        setView,
        events,
        log,
        runCommand,
        sessionId,
        bootedAt,
        soundOn,
        toggleSound,
        beep,
      }}
    >
      {children}
    </AetherCtx.Provider>
  );
}

export function useAether() {
  const ctx = useContext(AetherCtx);
  if (!ctx) throw new Error('useAether must be used within AetherProvider');
  return ctx;
}

// === Suggestions for autocomplete
export const ALL_COMMANDS = [
  'HELP',
  'LIST.MODULES',
  'DIAG.ACQUISITION',
  'DIAG.CONVERSION',
  'DIAG.RETENTION',
  'DIAG.PRICING',
  'OPEN.MARSELIA',
  'OPEN.BVLGARI',
  'OPEN.COMTESSE',
  'OPEN.CRIO',
  'OPEN.KNR',
  'SHOW.SYNERGY',
  'WHO.IS',
  'RECRUIT',
  'REBOOT',
  'CLEAR',
];

export function suggestCommands(input: string, limit = 5): string[] {
  const up = input.trim().toUpperCase();
  if (!up) return ALL_COMMANDS.slice(0, limit);
  const starts = ALL_COMMANDS.filter((c) => c.startsWith(up));
  if (starts.length >= limit) return starts.slice(0, limit);
  const includes = ALL_COMMANDS.filter((c) => c.includes(up) && !c.startsWith(up));
  return [...starts, ...includes].slice(0, limit);
}
