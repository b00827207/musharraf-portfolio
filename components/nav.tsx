'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'thesis', label: 'Thesis' },
  { id: 'work', label: 'Work' },
  { id: 'range', label: 'Range' },
  { id: 'about', label: 'About' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
        scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-paper-edge/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-5 md:px-10 flex items-center justify-between h-14 md:h-16">
        {/* Mark */}
        <a href="#top" className="font-display text-[1.2rem] md:text-[1.35rem] text-ink leading-none tracking-tight">
          M.<span className="text-terra">S.</span>
        </a>

        {/* Section links */}
        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-dim hover:text-terra transition-colors editorial-link"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden sm:inline-flex font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper bg-ink hover:bg-terra px-3.5 py-2 transition-colors"
        >
          Contact ↗
        </a>
      </div>
    </nav>
  );
}
