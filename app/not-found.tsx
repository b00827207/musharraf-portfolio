import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-5 md:px-8 relative z-10 flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="bracket relative border border-bone-fade/40 bg-ink-900/30 px-8 md:px-14 py-14 md:py-20">
          <span className="bl" />
          <span className="br" />

          <div className="font-mono text-eyebrow uppercase text-bone-deep mb-6 flex items-center gap-3">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: '#FF6B6B', boxShadow: '0 0 6px #FF6B6B' }}
            />
            <span>SIGNAL · LOST</span>
            <span className="text-bone-fade">/</span>
            <span>STATUS · 404</span>
          </div>

          <h1 className="font-display text-mega font-light text-bone leading-[0.95] tracking-[-0.04em]">
            No case file <span className="italic text-critical">at this path.</span>
          </h1>

          <p className="mt-6 text-tiny font-mono uppercase text-bone-dim max-w-md">
            The route does not exist in the archive. Either the link is stale or
            the file was never charted.
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-3 font-mono text-tiny uppercase tracking-[0.18em] text-vital border border-vital/40 px-5 py-3 hover:bg-vital hover:text-ink-950 transition-colors group"
          >
            <span>RETURN TO DIAGNOSTIC</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
