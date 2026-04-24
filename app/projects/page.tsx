import { ProjectsGrid } from "@/components/projects-grid";
import Link from "next/link";

export const metadata = {
  title: "Selected Cases — Musharraf Shaik",
  description:
    "B2B revenue engineering, M&A vertical integration, luxury brand architecture, retail trade marketing, and operational systems design.",
};

export default function ProjectsIndex() {
  return (
    <main className="bg-ink-950 text-bone-100 min-h-screen">
      {/* Subheader / breadcrumb */}
      <section className="pt-32 pb-12 px-6 md:px-12 border-b border-bone-100/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-bone-100/40 mb-8">
            <Link
              href="/"
              data-cursor="view"
              className="hover:text-signal-500 transition-colors"
            >
              HOME
            </Link>
            <span className="text-bone-100/20">/</span>
            <span className="text-bone-100/70">SELECTED.CASES</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <h1 className="font-display text-mega md:text-huge leading-[0.9] tracking-[-0.04em]">
                Selected
                <br />
                <span className="italic font-light text-signal-500">cases.</span>
              </h1>
            </div>
            <div className="md:col-span-4">
              <p className="text-sm text-bone-100/55 leading-relaxed font-light">
                Five engagements spanning revenue engineering, M&amp;A strategy,
                luxury brand launch, retail trade marketing, and operational
                systems design — each a study in turning signal into outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reuse the grid */}
      <ProjectsGrid />

      {/* Footer return */}
      <section className="py-24 px-6 md:px-12 border-t border-bone-100/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-sm text-bone-100/40 font-light">
            Looking for something specific?
          </div>
          <Link
            href="/#contact"
            data-cursor="view"
            className="group inline-flex items-center gap-3 text-sm font-mono tracking-[0.15em] text-signal-500 hover:text-signal-300 transition-colors"
          >
            <span className="w-8 h-px bg-signal-500 group-hover:w-12 transition-all" />
            <span>OPEN.CONVERSATION</span>
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
