'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Nav() {
  const [time, setTime] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Paris',
        hour12: false,
      };
      setTime(now.toLocaleTimeString('en-GB', opts) + ' CET');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-signal/10 bg-ink-950/70 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-4 md:px-10 md:py-5">
        {/* Identifier */}
        <Link
          href="/"
          className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="text-bone-dim transition-colors group-hover:text-bone">
            MS — ATHREYA
          </span>
          <span className="hidden text-bone-deep md:inline">/ PORTFOLIO 2026</span>
        </Link>

        {/* Links */}
        <nav className="hidden items-center gap-10 font-mono text-[10px] uppercase tracking-[0.22em] md:flex">
          <Link href="/#thesis" className="text-bone-dim transition-colors hover:text-signal">
            <span className="text-signal/60">001 /</span> Thesis
          </Link>
          <Link href="/#timeline" className="text-bone-dim transition-colors hover:text-signal">
            <span className="text-signal/60">002 /</span> Trajectory
          </Link>
          <Link href="/#projects" className="text-bone-dim transition-colors hover:text-signal">
            <span className="text-signal/60">003 /</span> Cases
          </Link>
          <Link href="/#contact" className="text-bone-dim transition-colors hover:text-signal">
            <span className="text-signal/60">004 /</span> Contact
          </Link>
        </nav>

        {/* Status readout */}
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em]">
          <span className="hidden text-bone-deep md:inline">PARIS</span>
          <span className="hidden tabular text-bone-dim md:inline">{time}</span>
          <a
            href="mailto:contact.shaikmusharraf@gmail.com"
            className="group relative inline-flex items-center gap-2 border border-signal/30 px-3 py-2 text-signal transition-all hover:border-signal hover:bg-signal/5"
          >
            <span className="h-1 w-1 rounded-full bg-signal" />
            Hire — Sept 26
          </a>
        </div>
      </div>
    </header>
  );
}
