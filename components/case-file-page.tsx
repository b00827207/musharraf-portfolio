'use client';

import Link from 'next/link';
import { type CaseFile } from '@/lib/data';
import { Counter } from './counter';
import { Typewriter } from './typewriter';
import { EKG } from './ekg';

export function CaseFilePage({
  caseFile: c,
  next,
}: {
  caseFile: CaseFile;
  next: CaseFile;
}) {
  return (
    <main className="min-h-screen pt-20 pb-32 px-5 md:px-8 relative z-10">
      <div className="max-w-[1500px] mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="pt-12 pb-10 font-mono text-tiny uppercase tracking-[0.18em] text-bone-deep flex items-center gap-3"
        >
          <Link
            href="/"
            className="hover:text-bone transition-colors"
          >
            ← DIAGNOSTIC
          </Link>
          <span>/</span>
          <span className="text-bone-dim">CASE FILE {c.caseNumber}</span>
          <span>/</span>
          <span className="text-vital">{c.patient.toUpperCase()}</span>
        </nav>

        {/* HERO */}
        <header className="border-y border-bone-fade/40 py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-6 md:gap-10">
            <div className="md:col-span-2">
              <div className="font-display text-mega text-vital leading-none tabular tracking-[-0.04em]">
                {c.caseNumber}
              </div>
              <div className="mt-3 font-mono text-micro uppercase text-bone-deep">
                {c.category}
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="font-mono text-eyebrow uppercase text-bone-deep mb-5 flex items-center gap-3">
                <span className="status-dot" />
                <span>CHART · {c.domain}</span>
              </div>
              <h1 className="font-display text-mega font-light text-bone leading-[0.95] tracking-[-0.04em]">
                {c.patient}
              </h1>
              <div className="mt-4 font-mono text-tiny uppercase tracking-[0.16em] text-bone-dim">
                {c.patientMeta}
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="font-mono text-micro uppercase text-bone-deep mb-2">
                PRESENTING
              </div>
              <p className="font-display italic text-[1.15rem] md:text-[1.3rem] leading-[1.35] text-bone">
                <Typewriter text={c.symptom} speed={18} cursor={false} />
              </p>
              <div className="mt-6 font-mono text-tiny uppercase text-bone-deep">
                DURATION · {c.duration}
              </div>
            </div>
          </div>
        </header>

        {/* VITALS STRIP */}
        <section className="border-b border-bone-fade/40 py-12">
          <div className="font-mono text-eyebrow uppercase text-bone-deep mb-8">
            VITALS · OUTCOME
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {c.vitals.map((v, i) => (
              <div
                key={v.label}
                className="bracket relative border border-bone-fade/40 bg-ink-900/30 px-6 py-7"
              >
                <span className="bl" />
                <span className="br" />
                <div className="font-mono text-micro uppercase text-bone-deep mb-3">
                  {v.label}
                </div>
                <div className="font-display text-[3rem] md:text-[3.6rem] leading-none text-vital tracking-[-0.025em]">
                  <Counter value={v.value} delay={i * 200} duration={1100} />
                </div>
                {v.delta && (
                  <div className="mt-3 font-mono text-micro uppercase text-bone-dim">
                    {v.delta}
                  </div>
                )}
                <div className="mt-4 h-5 -mx-1">
                  <EKG className="w-full h-full" delay={i * 0.6} active />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLINICAL NOTES */}
        <section className="grid md:grid-cols-12 gap-6 md:gap-12 py-16 md:py-24">
          <div className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <div className="font-mono text-eyebrow uppercase text-bone-deep mb-2">
                FILE
              </div>
              <h2 className="font-display text-diagnosis text-bone leading-[1.05]">
                Clinical
                <br />
                <span className="italic">notes.</span>
              </h2>
            </div>
          </div>

          <div className="md:col-span-9 space-y-12">
            <Note label="PRESENTING SYMPTOM" body={c.presenting} />
            <Note label="INTERVENTION" body={c.intervention} />
            <Note label="OUTCOME" body={c.outcome} accent />
            <Note label="EXECUTIVE SUMMARY" body={c.fullSummary} />
          </div>
        </section>

        {/* BMAD CHART */}
        <section className="py-16 border-t border-bone-fade/40">
          <div className="font-mono text-eyebrow uppercase text-bone-deep mb-8">
            CHART · BMAD METHOD
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <ChartBlock label="BUILD" body={c.build} index="01" />
            <ChartBlock label="MEASURE" body={c.measure} index="02" />
            <ChartBlock label="ANALYZE" body={c.analyze} index="03" />
            <ChartBlock label="DEPLOY" body={c.deploy} index="04" />
          </div>
        </section>

        {/* ARTIFACTS & STACK */}
        <section className="grid md:grid-cols-2 gap-12 py-16 border-t border-bone-fade/40">
          <div>
            <div className="font-mono text-eyebrow uppercase text-bone-deep mb-6">
              ARTIFACTS · DELIVERED
            </div>
            <ul className="space-y-3">
              {c.artifacts.map((a, i) => (
                <li
                  key={a}
                  className="flex items-baseline gap-4 py-3 border-b border-bone-fade/30"
                >
                  <span className="font-mono text-micro text-bone-deep tabular shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[1.15rem] text-bone leading-snug">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-eyebrow uppercase text-bone-deep mb-6">
              INSTRUMENTS
            </div>
            <div className="flex flex-wrap gap-2">
              {c.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-tiny px-3 py-2 border border-bone-fade/40 text-bone-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* NEXT CASE */}
        <section className="mt-16 border-t border-bone-fade/40 pt-12">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-6 hover:text-vital transition-colors"
          >
            <div>
              <div className="font-mono text-micro uppercase text-bone-deep mb-2">
                NEXT CASE FILE — {next.caseNumber}
              </div>
              <div className="font-display text-diagnosis text-bone group-hover:text-vital transition-colors leading-[1.05]">
                {next.patient}
              </div>
              <div className="mt-2 font-mono text-tiny uppercase text-bone-dim">
                {next.symptom}
              </div>
            </div>
            <span className="font-mono text-eyebrow uppercase text-bone-deep group-hover:text-vital group-hover:translate-x-2 transition-all shrink-0">
              →
            </span>
          </Link>
        </section>

        {/* RETURN */}
        <div className="mt-16 flex items-center justify-between font-mono text-micro uppercase text-bone-deep">
          <Link href="/" className="hover:text-bone transition-colors">
            ← RETURN TO DIAGNOSTIC
          </Link>
          <div className="flex items-center gap-3">
            <span className="status-dot" />
            <span>END OF FILE</span>
          </div>
        </div>
      </div>
    </main>
  );
}

function Note({
  label,
  body,
  accent = false,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="font-mono text-eyebrow uppercase text-bone-deep mb-4 flex items-center gap-3">
        <span className="w-6 h-px bg-bone-fade" />
        <span>{label}</span>
      </div>
      <p
        className={`text-[1.1rem] md:text-[1.35rem] leading-[1.55] font-light ${
          accent ? 'text-bone' : 'text-bone-dim'
        }`}
      >
        {body}
      </p>
    </div>
  );
}

function ChartBlock({
  label,
  body,
  index,
}: {
  label: string;
  body: string;
  index: string;
}) {
  return (
    <div className="bracket relative border border-bone-fade/40 bg-ink-900/30 px-5 py-7">
      <span className="bl" />
      <span className="br" />
      <div className="flex items-baseline justify-between mb-5">
        <span className="font-display text-vital text-[2rem] leading-none tabular tracking-[-0.02em]">
          {index}
        </span>
        <span className="font-mono text-micro uppercase text-bone-deep">
          PHASE
        </span>
      </div>
      <div className="font-mono text-tiny uppercase text-vital mb-3 tracking-[0.16em]">
        {label}
      </div>
      <p className="text-tiny font-mono text-bone-dim leading-relaxed">
        {body}
      </p>
    </div>
  );
}
