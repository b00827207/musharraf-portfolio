import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-5">
      <div className="max-w-xl text-center">
        <div className="font-mono text-eyebrow uppercase text-terra mb-6">
          404 · Case not on file
        </div>
        <h1 className="font-display font-light text-h1 leading-[0.92] tracking-[-0.045em]">
          Page <em className="text-terra">missing.</em>
        </h1>
        <p className="mt-6 font-display text-lead text-ink-dim leading-[1.55]">
          The link you followed doesn&apos;t match any case in the registry.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex font-mono text-tiny uppercase tracking-[0.18em] text-paper bg-ink hover:bg-terra px-4 py-2.5 transition-colors"
        >
          Return home →
        </Link>
      </div>
    </main>
  );
}
