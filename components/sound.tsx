'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';

type SoundCtx = {
  enabled: boolean;
  toggle: () => void;
  beep: () => void;
};

const Ctx = createContext<SoundCtx | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Lazy init AudioContext on first toggle (browsers require user gesture)
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

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) ensureCtx();
      return next;
    });
  }, [ensureCtx]);

  const beep = useCallback(() => {
    if (!enabled) return;
    const ctx = ensureCtx();
    if (!ctx) return;

    // Resume if suspended (Safari)
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Soft hospital monitor beep — sine wave, ~880Hz, fast attack, slow decay
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.01); // quiet
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }, [enabled, ensureCtx]);

  // Cleanup
  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <Ctx.Provider value={{ enabled, toggle, beep }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSound() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSound must be inside SoundProvider');
  return ctx;
}
