'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { cases, profile, type CaseFile } from '@/lib/data';
import { EKG } from './ekg';
import { Typewriter } from './typewriter';
import { Counter } from './counter';
import { useSound } from './sound';

// Group cases by domain — sometimes one domain has multiple cases
const casesByDomain = profile.domains.map((d) => ({
  ...d,
  cases: cases.filter((c) => c.domain === d.id),
}));

export function Diagnostic() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const { beep } = useSound();

  const matched = useMemo(() => {
    if (!selectedDomain) return null;
    const domainCases = cases.filter((c) => c.domain === selectedDomain);
    return domainCases[selectedCaseIdx] || domainCases[0];
  }, [selectedDomain, selectedCaseIdx]);

  const matchedCount = selectedDomain
    ? cases.filter((c) => c.domain === selectedDomain).length
    : 0;

  const onSelect = useCallback(
    (id: string) => {
      if (selectedDomain === id) {
        // Toggle to next case in the domain
        const count = cases.filter((c) => c.domain === id).length;
        if (count > 1) {
          setSelectedCaseIdx((prev) => (prev + 1) % count);
          beep();
        }
        return;
      }
      setSelectedDomain(id);
      setSelectedCaseIdx(0);
      beep();
    },
    [selectedDomain, beep]
  );

  const reset = useCallback(() => {
    setSelectedDomain(null);
    setSelectedCaseIdx(0);
  }, []);

  return (
    <main className="min-h-screen pt-20 pb-32 px-5 md:px-8 relative z-10">
      <div className="max-w-[1500px] mx-auto">
        {/* HERO PROMPT === */}
        <section className="pt-12 md:pt-20 pb-10 md:pb-16">
          <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="md:col-span-9">
              <div className="font-mono text-eyebrow uppercase text-bone-deep mb-6 flex items-center gap-3">
                <span className="status-dot" />
                <span>SUBJECT INTAKE · OPEN</span>
                <span className="text-bone-fade">/</span>
                <span>VOL. I</span>
              </div>

              <h1 className="font-display text-mega font-light text-bone leading-[0.95] tracking-[-0.04em]">
                Where is your{' '}
                <span className="italic vital-underline text-bone">
                  revenue
                </span>{' '}
                bleeding?
              </h1>

              <p className="mt-8 font-mono text-tiny uppercase tracking-[0.18em] text-bone-dim max-w-md">
                <Typewriter
                  text="Select a presenting symptom. The relevant case file will load."
                  speed={18}
                  delay={400}
                />
              </p>
            </div>

            <div className="md:col-span-3 md:text-right">
              <div className="font-mono text-micro uppercase text-bone-deep">
                ATTENDING
              </div>
              <div className="font-display text-lead text-bone leading-tight mt-1">
                Musharraf Shaik
              </div>
              <div className="font-mono text-micro uppercase text-bone-dim mt-2">
                B2B Marketing Strategist
              </div>
              <div className="font-mono text-micro uppercase text-bone-deep mt-1">
                Available · {profile.available}
              </div>
            </div>
          </div>
        </section>

        {/* DOMAIN CARDS === */}
        <section
          aria-label="Diagnostic domains"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16 md:mb-20"
        >
          {profile.domains.map((d, i) => {
            const isActive = selectedDomain === d.id;
            const domainCases = cases.filter((c) => c.domain === d.id);
            const count = domainCases.length;
            return (
              <button
                key={d.id}
                onClick={() => onSelect(d.id)}
                data-active={isActive}
                className="diagnostic-card relative group bracket border border-bone-fade/50 bg-ink-900/40 px-5 py-7 md:py-9 text-left focus:outline-none"
                aria-pressed={isActive}
              >
                <span className="bl" />
                <span className="br" />

                <div className="flex items-center justify-between mb-5 md:mb-7">
                  <span className="font-mono text-micro uppercase text-bone-deep tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-micro uppercase text-bone-deep">
                    {count} CASE{count !== 1 ? 'S' : ''}
                  </span>
                </div>

                <div
                  className={`font-display text-lead leading-tight transition-colors ${
                    isActive ? 'text-vital' : 'text-bone group-hover:text-bone'
                  }`}
                >
                  {d.label}
                </div>

                <div className="mt-4 h-6 w-full overflow-hidden">
                  <EKG className="h-full w-full" delay={i * 0.6} active={isActive} />
                </div>

                {isActive && count > 1 && (
                  <div className="mt-3 font-mono text-micro uppercase text-vital flex items-center gap-2">
                    <span>CASE {selectedCaseIdx + 1} OF {count}</span>
                    <span className="text-bone-deep">·</span>
                    <span className="text-bone-dim">CLICK FOR NEXT</span>
                  </div>
                )}
              </button>
            );
          })}
        </section>

        {/* DIAGNOSIS PANEL === */}
        <section aria-live="polite" className="min-h-[400px]">
          {!matched ? (
            <EmptyState />
          ) : (
            <DiagnosisPanel
              key={`${matched.slug}-${selectedCaseIdx}`}
              case={matched}
              onReset={reset}
              matchedCount={matchedCount}
              currentIdx={selectedCaseIdx}
            />
          )}
        </section>

        {/* INDEX ALL CASES === */}
        <section className="mt-32 pt-12 border-t border-bone-fade/40">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-mono text-eyebrow uppercase text-bone-deep mb-3">
                ARCHIVE · ALL CASE FILES
              </div>
              <h2 className="font-display text-diagnosis text-bone leading-[1.05]">
                Or browse the <span className="italic">full archive.</span>
              </h2>
            </div>
          </div>

          <ul className="border-t border-bone-fade/30">
            {cases.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/projects/${c.slug}`}
                  className="group grid grid-cols-12 gap-4 md:gap-6 py-5 md:py-7 border-b border-bone-fade/30 items-baseline transition-colors hover:bg-ink-900/40 px-2 md:px-4 -mx-2 md:-mx-4"
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-tiny text-bone-deep tabular">
                    {c.caseNumber}
                  </span>
                  <span className="col-span-10 md:col-span-5 font-display text-lead text-bone leading-tight tracking-tight">
                    {c.patient}
                  </span>
                  <span className="hidden md:block md:col-span-3 font-mono text-tiny uppercase text-bone-dim">
                    {c.domain}
                  </span>
                  <span className="col-span-9 md:col-span-2 font-mono text-tiny text-bone-dim">
                    {c.duration}
                  </span>
                  <span className="col-span-3 md:col-span-1 font-mono text-tiny text-right text-bone-deep group-hover:text-vital transition-colors">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* CONSULT CTA === */}
        <section className="mt-32 mb-10">
          <div className="bracket relative border border-bone-fade/50 px-8 md:px-14 py-14 md:py-20 bg-ink-900/30">
            <span className="bl" />
            <span className="br" />

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
              <div className="md:col-span-8">
                <div className="font-mono text-eyebrow uppercase text-bone-deep mb-5 flex items-center gap-3">
                  <span className="status-dot" />
                  <span>REQUEST CONSULT</span>
                </div>

                <h2 className="font-display text-diagnosis font-light text-bone leading-[1.02]">
                  This kind of thinking,
                  <br />
                  <span className="italic vital-underline">available {profile.available}.</span>
                </h2>

                <p className="mt-6 font-mono text-tiny uppercase tracking-[0.16em] text-bone-dim max-w-md">
                  Open to alternance and full-time roles in{' '}
                  <span className="text-bone">{profile.location}</span>{' '}
                  and remote.
                </p>
              </div>

              <div className="md:col-span-4 space-y-2 font-mono text-tiny">
                <a
                  href={`mailto:${profile.email}`}
                  className="block py-3 border-b border-bone-fade/40 text-bone hover:text-vital transition-colors group"
                >
                  <div className="text-micro uppercase text-bone-deep">EMAIL</div>
                  <div className="mt-1 break-all group-hover:translate-x-1 transition-transform">
                    {profile.email}
                  </div>
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="block py-3 border-b border-bone-fade/40 text-bone hover:text-vital transition-colors group"
                >
                  <div className="text-micro uppercase text-bone-deep">PHONE</div>
                  <div className="mt-1 group-hover:translate-x-1 transition-transform">
                    {profile.phone}
                  </div>
                </a>
                <div className="block py-3">
                  <div className="text-micro uppercase text-bone-deep">LOCATION</div>
                  <div className="mt-1 text-bone">{profile.location}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER === */}
        <footer className="mt-12 flex items-center justify-between font-mono text-micro uppercase text-bone-deep">
          <div>END OF DOCUMENT · {new Date().getFullYear()}</div>
          <div className="flex items-center gap-3">
            <span className="status-dot" />
            <span>SYSTEM NOMINAL</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

// === EMPTY STATE
function EmptyState() {
  return (
    <div className="bracket relative border border-bone-fade/40 bg-ink-900/30 px-8 md:px-14 py-16 md:py-20 text-center">
      <span className="bl" />
      <span className="br" />
      <div className="font-mono text-eyebrow uppercase text-bone-deep mb-5">
        AWAITING SELECTION
      </div>
      <p className="font-display text-lead text-bone-dim max-w-2xl mx-auto leading-snug">
        Each symptom maps to a real engagement. Click one above to load the
        diagnosis, the intervention, and the outcome.
      </p>
    </div>
  );
}

// === DIAGNOSIS PANEL — the big payoff
function DiagnosisPanel({
  case: c,
  onReset,
  matchedCount,
  currentIdx,
}: {
  case: CaseFile;
  onReset: () => void;
  matchedCount: number;
  currentIdx: number;
}) {
  return (
    <article className="grid md:grid-cols-12 gap-6 md:gap-10">
      {/* LEFT COLUMN — Diagnosis text */}
      <div className="md:col-span-8 space-y-10">
        {/* Header strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-micro uppercase">
          <span className="text-vital flex items-center gap-2">
            <span className="status-dot" />
            DIAGNOSIS · LOADED
          </span>
          <span className="text-bone-deep">/</span>
          <span className="text-bone-dim">CASE FILE {c.caseNumber}</span>
          <span className="text-bone-deep">/</span>
          <span className="text-bone-dim">{c.duration}</span>
          {matchedCount > 1 && (
            <>
              <span className="text-bone-deep">/</span>
              <span className="text-bone-dim">
                {currentIdx + 1} OF {matchedCount} IN DOMAIN
              </span>
            </>
          )}
          <button
            onClick={onReset}
            className="ml-auto text-bone-deep hover:text-bone transition-colors"
            aria-label="Reset diagnostic"
          >
            ← RESET
          </button>
        </div>

        {/* Diagnosis line — typewriter reveal */}
        <h2 className="font-display text-diagnosis font-light text-bone leading-[1.05]">
          <Typewriter text={c.symptom} speed={20} cursor={false} />
        </h2>

        {/* Patient meta */}
        <div className="border-l border-vital pl-6 py-1 animate-fade-up" style={{ animationDelay: '500ms', animationFillMode: 'both', opacity: 0 }}>
          <div className="font-mono text-micro uppercase text-bone-deep mb-1.5">
            PATIENT
          </div>
          <div className="font-display text-lead text-bone leading-tight">
            {c.patient}
          </div>
          <div className="font-mono text-tiny uppercase text-bone-dim mt-1">
            {c.patientMeta}
          </div>
        </div>

        {/* Clinical notes */}
        <div className="space-y-8 animate-fade-up" style={{ animationDelay: '700ms', animationFillMode: 'both', opacity: 0 }}>
          <ClinicalNote label="PRESENTING" body={c.presenting} />
          <ClinicalNote label="INTERVENTION" body={c.intervention} />
          <ClinicalNote label="OUTCOME" body={c.outcome} accent />
        </div>

        {/* Deep link */}
        <div className="pt-4 animate-fade-up" style={{ animationDelay: '900ms', animationFillMode: 'both', opacity: 0 }}>
          <Link
            href={`/projects/${c.slug}`}
            className="inline-flex items-center gap-3 font-mono text-tiny uppercase tracking-[0.18em] text-vital border border-vital/40 px-5 py-3 hover:bg-vital hover:text-ink-950 transition-colors group"
          >
            <span>OPEN FULL CASE FILE</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* RIGHT COLUMN — Vitals */}
      <aside className="md:col-span-4 space-y-4">
        <div className="font-mono text-eyebrow uppercase text-bone-deep">
          VITALS
        </div>

        <div className="space-y-3">
          {c.vitals.map((v, i) => (
            <div
              key={v.label}
              className="bracket relative border border-bone-fade/40 bg-ink-900/30 px-5 py-5 animate-fade-up"
              style={{
                animationDelay: `${800 + i * 200}ms`,
                animationFillMode: 'both',
                opacity: 0,
              }}
            >
              <span className="bl" />
              <span className="br" />
              <div className="font-mono text-micro uppercase text-bone-deep mb-2">
                {v.label}
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-display text-[2.4rem] md:text-[2.8rem] leading-none text-vital tracking-[-0.02em]">
                  <Counter value={v.value} delay={1100 + i * 200} duration={1000} />
                </div>
                <TrendGlyph trend={v.trend} />
              </div>
              {v.delta && (
                <div className="mt-2 font-mono text-micro uppercase text-bone-dim">
                  {v.delta}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BMAD chart */}
        <div
          className="border-t border-bone-fade/40 pt-6 mt-8 space-y-4 animate-fade-up"
          style={{
            animationDelay: '1500ms',
            animationFillMode: 'both',
            opacity: 0,
          }}
        >
          <div className="font-mono text-eyebrow uppercase text-bone-deep">
            CHART · BMAD
          </div>
          <BMADRow label="BUILD" body={c.build} />
          <BMADRow label="MEASURE" body={c.measure} />
          <BMADRow label="ANALYZE" body={c.analyze} />
          <BMADRow label="DEPLOY" body={c.deploy} />
        </div>
      </aside>
    </article>
  );
}

function ClinicalNote({
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
      <div className="font-mono text-eyebrow uppercase text-bone-deep mb-3 flex items-center gap-3">
        <span className="w-6 h-px bg-bone-fade" />
        <span>{label}</span>
      </div>
      <p
        className={`text-[1.05rem] md:text-[1.2rem] leading-[1.55] font-light ${
          accent ? 'text-bone' : 'text-bone-dim'
        }`}
      >
        {body}
      </p>
    </div>
  );
}

function BMADRow({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-3 font-mono text-micro uppercase text-vital pt-0.5">
        {label}
      </div>
      <div className="col-span-9 text-tiny font-mono text-bone-dim leading-relaxed">
        {body}
      </div>
    </div>
  );
}

function TrendGlyph({ trend }: { trend?: 'up' | 'down' | 'flat' }) {
  if (!trend) return null;
  const glyph =
    trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—';
  const color =
    trend === 'up'
      ? 'text-vital'
      : trend === 'down'
        ? 'text-bone-dim'
        : 'text-bone-deep';
  return <span className={`font-mono text-tiny ${color}`}>{glyph}</span>;
}
