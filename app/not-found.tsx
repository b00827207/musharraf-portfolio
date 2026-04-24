import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink-950 text-bone-100 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Schematic grid */}
      <div className="absolute inset-0 bg-schematic opacity-[0.18] pointer-events-none" />

      {/* Crosshair lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-bone-100/[0.04]" />
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-bone-100/[0.04]" />

      <div className="relative z-10 max-w-3xl w-full">
        {/* Bracket frame */}
        <div className="relative px-8 py-12 md:px-16 md:py-20">
          <div className="bracket-tl absolute top-0 left-0" />
          <div className="bracket-tr absolute top-0 right-0" />
          <div className="bracket-bl absolute bottom-0 left-0" />
          <div className="bracket-br absolute bottom-0 right-0" />

          {/* Status header */}
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-bone-100/40 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-pulse" />
            <span>SIGNAL.LOST</span>
            <span className="text-bone-100/20">·</span>
            <span>NODE.404</span>
            <span className="text-bone-100/20">·</span>
            <span>PATH.UNRESOLVED</span>
          </div>

          {/* Glitched 404 */}
          <div className="relative mb-8">
            <h1 className="font-display text-[clamp(6rem,18vw,12rem)] leading-[0.85] tracking-[-0.04em] text-bone-100">
              4<span className="text-signal-500 italic font-light">0</span>4
            </h1>
            <div
              aria-hidden
              className="absolute inset-0 font-display text-[clamp(6rem,18vw,12rem)] leading-[0.85] tracking-[-0.04em] text-ember-500/20 translate-x-[3px] translate-y-[2px] -z-10 select-none"
            >
              404
            </div>
          </div>

          {/* Body */}
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <p className="font-display text-2xl md:text-3xl text-bone-100 leading-[1.2] tracking-tight mb-4">
                This route was never built into the architecture.
              </p>
              <p className="text-sm text-bone-100/55 leading-relaxed font-light max-w-md">
                Either the path was deprecated, the link was a typo, or the request
                landed off-grid. Either way — let&rsquo;s reroute.
              </p>
            </div>

            <div className="md:col-span-5 md:text-right">
              <Link
                href="/"
                data-cursor="view"
                className="group inline-flex items-center gap-3 text-sm font-mono tracking-[0.15em] text-signal-500 hover:text-signal-300 transition-colors"
              >
                <span className="w-8 h-px bg-signal-500 group-hover:w-12 transition-all" />
                <span>RETURN.HOME</span>
                <span className="text-signal-500 transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Coordinate readout */}
          <div className="mt-16 pt-6 border-t border-bone-100/5 grid grid-cols-3 gap-4 text-[10px] font-mono tracking-[0.2em] text-bone-100/30">
            <div>
              <div className="text-bone-100/20 mb-1">CODE</div>
              <div className="text-bone-100/60">HTTP_404</div>
            </div>
            <div>
              <div className="text-bone-100/20 mb-1">ORIGIN</div>
              <div className="text-bone-100/60">CLIENT.REQ</div>
            </div>
            <div className="text-right">
              <div className="text-bone-100/20 mb-1">RESOLUTION</div>
              <div className="text-bone-100/60">REROUTE.HOME</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
