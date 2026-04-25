'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Triggers `inView=true` once when element enters viewport.
 * Stays true after first intersection — no flicker on scroll back up.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.18,
  rootMargin = '0px 0px -10% 0px',
}: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
