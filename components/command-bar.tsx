'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useAether, suggestCommands } from './aether-core';

export function CommandBar() {
  const { runCommand, view } = useAether();
  const [input, setInput] = useState('');
  const [hint, setHint] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [pulse, setPulse] = useState<'idle' | 'success' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount and when view changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [view]);

  const suggestions = input ? suggestCommands(input, 4) : [];

  const submit = (rawCmd?: string) => {
    const cmd = (rawCmd ?? input).trim();
    if (!cmd) return;
    const result = runCommand(cmd);
    if (result.ok) {
      setPulse('success');
      setHint(null);
    } else {
      setPulse('error');
      setHint(result.message);
    }
    setHistory((prev) => [cmd, ...prev].slice(0, 30));
    setHistIdx(-1);
    setInput('');
    setTimeout(() => setPulse('idle'), 600);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
      }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(history.length - 1, histIdx + 1);
      setHistIdx(next);
      if (history[next]) setInput(history[next]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(-1, histIdx - 1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
      return;
    }
    if (e.key === 'Escape') {
      setInput('');
      setHistIdx(-1);
      setHint(null);
    }
  };

  return (
    <div className="border-t border-bone-fade/30 bg-ink-900/80 backdrop-blur-sm">
      {/* Suggestion strip */}
      {suggestions.length > 0 && (
        <div className="px-5 py-2 border-b border-bone-fade/20 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-deep">
            SUGGESTED
          </span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setInput(s);
                inputRef.current?.focus();
              }}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim hover:text-vital border border-bone-fade/40 hover:border-vital/60 px-2 py-1 transition-colors"
            >
              {s}
            </button>
          ))}
          <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-bone-fade">
            TAB to autocomplete · ↑↓ history · ESC clear
          </span>
        </div>
      )}

      {/* Hint when no match */}
      {hint && (
        <div className="px-5 py-2 border-b border-bone-fade/20 font-mono text-[10px] tracking-[0.15em] text-[var(--amber)] uppercase">
          ⚠ {hint}
        </div>
      )}

      {/* The actual input */}
      <div
        className={`px-5 py-4 flex items-center gap-3 transition-colors ${
          pulse === 'success'
            ? 'bg-vital/5'
            : pulse === 'error'
              ? 'bg-[rgba(255,107,107,0.05)]'
              : ''
        }`}
      >
        <span
          className={`font-mono text-[16px] font-bold tabular leading-none ${
            pulse === 'error' ? 'text-[var(--critical)]' : 'text-vital'
          }`}
          aria-hidden
        >
          ›
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          placeholder='try HELP · DIAG.CONVERSION · OPEN.MARSELIA · WHO.IS'
          className="flex-1 bg-transparent border-0 outline-none font-mono text-[13px] tracking-[0.05em] text-bone placeholder:text-bone-fade caret-vital"
          aria-label="Command input"
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-deep hidden md:inline">
          ENTER ↵
        </span>
      </div>
    </div>
  );
}
