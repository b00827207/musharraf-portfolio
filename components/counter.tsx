'use client';

import { useEffect, useState } from 'react';

// Parse "+12pp", "₹4.2M", "5 mo", "+210bps", "70%", "11×", "+18%", "8/10", "Q3"
function parseValue(value: string): { num: number; prefix: string; suffix: string } | null {
  const match = value.match(/^([^\d.-]*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[2].replace(/,/g, ''));
  if (isNaN(num)) return null;
  return { num, prefix: match[1], suffix: match[3] };
}

export function Counter({
  value,
  duration = 900,
  delay = 0,
  className = '',
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let start = 0;
    let started = false;
    const target = parsed.num;
    // Decimals — preserve precision
    const decimals = (parsed.num.toString().split('.')[1] || '').length;

    const tick = (ts: number) => {
      if (!started) {
        start = ts;
        started = true;
      }
      const elapsed = ts - start;
      if (elapsed < delay) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (elapsed - delay) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = target * eased;
      const formatted = decimals > 0 ? cur.toFixed(decimals) : Math.round(cur).toString();
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, delay, parsed]);

  return <span className={`tabular ${className}`}>{display}</span>;
}
