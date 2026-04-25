'use client';

import { useEffect, useState, useMemo } from 'react';

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
  duration = 1100,
  delay = 0,
  className = '',
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState<string>(() =>
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }
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
      const eased = 1 - Math.pow(1 - t, 3);
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
  }, [parsed, value, duration, delay]);

  return <span className={`tabular ${className}`}>{display}</span>;
}
