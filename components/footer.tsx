'use client';

export function Footer() {
  return (
    <footer className="bg-paper-warm/60 border-t border-paper-edge py-10">
      <div className="max-w-[1380px] mx-auto px-5 md:px-10 flex flex-wrap items-baseline justify-between gap-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-deep">
        <div className="flex items-center gap-3">
          <span className="font-display tabular text-[12px]">© {new Date().getFullYear()}</span>
          <span>Musharraf Shaik</span>
          <span className="text-ink-fade">·</span>
          <span>Paris</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-ink-fade">Set in Fraunces &amp; Inter</span>
          <span className="text-ink-fade">·</span>
          <a
            href="mailto:contact.shaikmusharraf@gmail.com"
            className="hover:text-terra transition-colors editorial-link"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
