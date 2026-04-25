'use client';

import { Typewriter } from '../typewriter';
import { useAether } from '../aether-core';
import { profile } from '@/lib/data';

export function RecruitView() {
  const { runCommand } = useAether();

  return (
    <div className="space-y-10 pt-2 md:pt-8">
      <header>
        <div className="font-mono text-eyebrow uppercase text-vital mb-3 flex items-center gap-3">
          <span className="status-dot" />
          <span>RECRUIT.CHANNEL · OPEN</span>
        </div>
        <h1 className="font-display text-mega font-light text-bone leading-[0.95] tracking-[-0.04em]">
          Open the <span className="italic vital-underline">channel.</span>
        </h1>
        <p className="mt-5 font-mono text-tiny uppercase tracking-[0.16em] text-bone-dim max-w-xl">
          <Typewriter
            text="Email or call directly. AETHER does not gate the attending behind a form."
            speed={14}
          />
        </p>
      </header>

      <section className="border border-bone-fade/40 bg-ink-900/30 bracket relative p-6 md:p-8">
        <span className="bl" />
        <span className="br" />

        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-deep mb-4">
          CONTACT CARD · LIVE
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Contact label="ATTENDING" value={profile.name} bright />
          <Contact label="ROLE" value={profile.role} />
          <Contact label="LOCATION" value={profile.location} />
          <Contact label="AVAILABLE" value={profile.available} bright />
        </div>

        <div className="grid md:grid-cols-2 gap-3 pt-6 border-t border-bone-fade/30">
          <a
            href={`mailto:${profile.email}?subject=AETHER%20%E2%80%94%20Consult%20Inquiry`}
            className="border border-vital/60 bg-vital/[0.04] hover:bg-vital hover:text-ink-950 transition-colors px-5 py-4 group"
          >
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-vital group-hover:text-ink-950 mb-1">
              EMAIL ›
            </div>
            <div className="font-mono text-[13px] tabular text-bone group-hover:text-ink-950 break-all">
              {profile.email}
            </div>
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, '')}`}
            className="border border-bone-fade/60 hover:border-vital/60 hover:bg-vital/[0.03] transition-colors px-5 py-4 group"
          >
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep group-hover:text-vital mb-1">
              PHONE ›
            </div>
            <div className="font-mono text-[13px] tabular text-bone group-hover:text-vital">
              {profile.phone}
            </div>
          </a>
        </div>
      </section>

      <section className="border-t border-bone-fade/30 pt-6 flex flex-wrap items-baseline gap-4 justify-between">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-bone-dim">
          AETHER WILL LOG THE OUTBOUND. NO FORMS. NO MIDDLEWARE.
        </div>
        <button
          onClick={() => runCommand('REBOOT')}
          className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-bone-dim border border-bone-fade/40 hover:text-bone hover:border-bone-fade px-3 py-2 transition-colors"
        >
          REBOOT
        </button>
      </section>
    </div>
  );
}

function Contact({ label, value, bright = false }: { label: string; value: string; bright?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-1">
        {label}
      </div>
      <div className={`font-display text-[1.3rem] tracking-[-0.01em] leading-tight ${bright ? 'text-vital' : 'text-bone'}`}>
        {value}
      </div>
    </div>
  );
}
