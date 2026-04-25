'use client';

import { useEffect, useState } from 'react';

export function Typewriter({
  text,
  speed = 22,
  delay = 0,
  className = '',
  cursor = true,
  onDone,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
}) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut('');
    setDone(false);
    let i = 0;
    let raf = 0;
    let last = 0;
    let started = false;
    let startTime = 0;

    const tick = (ts: number) => {
      if (!started) {
        startTime = ts;
        started = true;
      }
      if (ts - startTime < delay) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!last) last = ts;
      const gap = ts - last;
      if (gap >= speed) {
        const advance = Math.max(1, Math.floor(gap / speed));
        i = Math.min(text.length, i + advance);
        setOut(text.slice(0, i));
        last = ts;
        if (i >= text.length) {
          setDone(true);
          onDone?.();
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, speed, delay, onDone]);

  return (
    <span className={`${className} ${cursor && !done ? 'cursor-blink' : ''}`}>
      {out}
    </span>
  );
}
