'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { useInView } from './use-in-view';

type Parsed = { num: number; prefix: string; suffix: string };

function parseValue(value: string): Parsed | null {
  const match = value.match(/^([^\d.-]*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[2].replace(/,/g, ''));
  if (isNaN(num)) return null;
  return { num, prefix: match[1], suffix: match[3] };
}

export function Counter({
  value,
  duration = 1500,
  delay = 0,
  className = '',
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState<string>(() =>
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value
  );
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || !parsed || startedRef.current) return;
    startedRef.current = true;

    let raf = 0;
    let startTs = 0;
    const target = parsed.num;
    const decimals = (parsed.num.toString().split('.')[1] || '').length;

    const tick = (ts: number) => {
      if (startTs === 0) startTs = ts;
      const elapsed = ts - startTs;
      if (elapsed < delay) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (elapsed - delay) / duration);
      // easeOutExpo for satisfying landing
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const cur = target * eased;
      const formatted = decimals > 0 ? cur.toFixed(decimals) : Math.round(cur).toString();
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        const final = decimals > 0 ? target.toFixed(decimals) : target.toString();
        setDisplay(`${parsed.prefix}${final}${parsed.suffix}`);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, duration, delay]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {display}
    </span>
  );
}
