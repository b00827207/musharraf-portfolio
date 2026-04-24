'use client';

import { motion } from 'framer-motion';
import { profile } from '@/lib/data';

export function Stack() {
  return (
    <section
      id="stack"
      className="relative border-t border-signal/10 bg-ink-900 py-32 md:py-40"
    >
      <div className="bg-schematic absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
              <span className="h-px w-8 bg-signal/40" />
              <span>005 / INSTRUMENTATION</span>
            </div>
            <h2 className="font-display text-huge font-light leading-[0.95] text-bone">
              The <span className="italic">tooling</span>
              <br />
              <span className="text-bone-deep">behind the</span>{' '}
              <span className="italic text-signal">surfaces</span>.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {Object.entries(profile.stack).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative border border-signal/15 bg-ink-950/50 p-6 backdrop-blur-sm"
            >
              <div className="bracket-tl bracket-tr bracket-bl bracket-br absolute inset-0" />
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal/70">
                {String(i + 1).padStart(2, '0')} / {category}
              </div>
              <ul className="mt-6 space-y-2 font-mono text-xs uppercase tracking-[0.1em] text-bone">
                {items.map((tool) => (
                  <li key={tool} className="flex items-center gap-3">
                    <span className="h-1 w-1 bg-signal/60" />
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Languages strip */}
        <div className="mt-12 border-t border-signal/10 pt-8">
          <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.22em] md:flex-row md:items-center md:gap-8">
            <span className="text-signal/70">LANGUAGES</span>
            <span className="text-bone-dim">{profile.languages.join('  ·  ')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// MARQUEE
// ----------------------------------------------------------------------------
export function Marquee() {
  const phrases = [
    'BUILD',
    '↳',
    'MEASURE',
    '↳',
    'ANALYZE',
    '↳',
    'DEPLOY',
    '·',
    'SIGNAL FROM NOISE',
    '·',
    'ENGINEER REVENUE',
    '·',
    'PARIS — SEPT 26',
    '·',
  ];
  // Repeated for seamless loop
  const loop = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <section className="relative overflow-hidden border-y border-signal/10 bg-ink-950 py-12">
      <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-5xl font-light italic text-bone md:gap-20 md:text-7xl">
        {loop.map((p, i) => (
          <span key={i} className={p === '↳' || p === '·' ? 'text-signal' : ''}>
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// CONTACT / FOOTER
// ----------------------------------------------------------------------------
export function Contact() {
  return (
    <footer
      id="contact"
      className="relative border-t border-signal/10 bg-ink-950 px-6 py-32 md:px-10 md:py-48"
    >
      <div className="bg-schematic absolute inset-0 opacity-40" aria-hidden />
      <div className="pointer-events-none absolute inset-x-6 inset-y-12 border border-signal/5 md:inset-x-10" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          {/* Massive headline */}
          <div className="md:col-span-8">
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
              <span className="h-px w-8 bg-signal/40" />
              <span>006 / END TRANSMISSION</span>
            </div>
            <h2 className="font-display text-mega font-light leading-[0.85] text-bone">
              <span className="italic">Let's</span> build a
              <br />
              <span className="text-shimmer italic">measurable</span>
              <br />
              <span className="text-bone-deep">nervous system</span>
              <br />
              <span className="italic text-signal">together</span>.
            </h2>
          </div>

          {/* Right column */}
          <div className="md:col-span-4">
            <div className="border border-signal/20 p-6 md:p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal/70">
                CONTACT VECTORS
              </div>

              <div className="mt-6 space-y-5">
                <a
                  href={`mailto:${profile.contact.email}`}
                  data-cursor="hover"
                  className="group block"
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep">
                    EMAIL
                  </div>
                  <div className="mt-1 break-all font-display text-lg italic text-bone transition-colors group-hover:text-signal">
                    {profile.contact.email}
                  </div>
                </a>

                <a
                  href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
                  data-cursor="hover"
                  className="group block"
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep">
                    PHONE
                  </div>
                  <div className="mt-1 font-display text-lg italic text-bone transition-colors group-hover:text-signal">
                    {profile.contact.phone}
                  </div>
                </a>

                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep">
                    BASE
                  </div>
                  <div className="mt-1 font-display text-lg italic text-bone">{profile.location}</div>
                </div>

                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone-deep">
                    AVAILABILITY
                  </div>
                  <div className="mt-1 font-display text-lg italic text-signal">
                    {profile.available}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-signal/10 pt-6">
                <a
                  href={`mailto:${profile.contact.email}?subject=Alternance%20—%20Sept%202026`}
                  data-cursor="hover"
                  className="group flex items-center justify-between border border-signal/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-signal transition-all hover:bg-signal hover:text-ink-950"
                >
                  <span>OPEN A CHANNEL</span>
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer baseline */}
        <div className="mt-24 grid grid-cols-2 gap-6 border-t border-signal/10 pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-deep md:grid-cols-4 md:mt-32">
          <div>
            <div className="text-signal/60">© {new Date().getFullYear()}</div>
            <div className="mt-1 text-bone-dim">M. SHAIK · ATHREYA</div>
          </div>
          <div>
            <div className="text-signal/60">VERSION</div>
            <div className="mt-1 text-bone-dim">PORTFOLIO V1.0 · 2026</div>
          </div>
          <div>
            <div className="text-signal/60">FRAMEWORK</div>
            <div className="mt-1 text-bone-dim">NEXT 14 · MOTION · LENIS</div>
          </div>
          <div>
            <div className="text-signal/60">DESIGN</div>
            <div className="mt-1 text-bone-dim">ARCHITECTURE OF INTENT</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
