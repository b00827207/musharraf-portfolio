import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink-950 text-bone flex items-center justify-center px-6">
      <div className="max-w-xl">
        <div className="font-mono text-eyebrow uppercase text-[var(--amber)] mb-4 flex items-center gap-3">
          <span className="status-dot status-dot-amber" />
          <span>SIGNAL LOST · 404</span>
        </div>
        <h1 className="font-display text-mega font-light leading-[0.95] tracking-[-0.04em]">
          Module not <span className="italic">on file.</span>
        </h1>
        <p className="mt-5 font-mono text-tiny uppercase tracking-[0.16em] text-bone-dim">
          The path you followed does not match any known engagement. Return to AETHER and run LIST.MODULES.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex font-mono text-[10.5px] uppercase tracking-[0.18em] text-vital border border-vital/60 hover:bg-vital hover:text-ink-950 px-4 py-2 transition-colors"
        >
          ‹ RETURN TO AETHER
        </Link>
      </div>
    </main>
  );
}
