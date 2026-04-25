# DIAGNOSTIC

A clinical-interface portfolio for **Musharraf Shaik** — Data-Driven B2B Marketing Strategist.

It does not look like a portfolio. It looks like a diagnostic tool.

> _Where is your revenue bleeding?_

## How it works

The visitor lands on a single screen and is asked to identify their presenting symptom — Acquisition · Conversion · Retention · Pricing. Click one. The screen rebuilds itself as a medical chart for the matching engagement: a diagnostic phrase, a patient (the client), clinical notes (presenting / intervention / outcome), and vitals that count up from zero like a heart-rate finding rhythm.

Every diagnosis ends with the same line: _This kind of thinking, available September 2026._

## The single rule

One signature move beats five mediocre ones. So:

- One accent color: **vital green** `#7CFFB7`. Used on the EKG line, active state, and the headline underline. Nowhere else.
- One continuous animation: a CSS-keyframe EKG line that draws across each idle card.
- One reveal motion: typewriter for the diagnostic question, count-up for the vitals.
- One sound: a soft 880Hz monitor beep on diagnosis load — **off by default**, toggle in the header.

No canvas. No Lenis. No custom JS cursor. No magnetic effects. No infinite marquees.

## Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3.4
- Web Audio API for the optional beep
- TypeScript

That's it. No Framer Motion, no Lenis. The only animation library is CSS.

## Files

```
diagnostic/
├── app/
│   ├── layout.tsx                    # Fonts (Fraunces + JetBrains Mono), sound provider, monitor bar
│   ├── page.tsx                      # Hosts <Diagnostic />
│   ├── globals.css                   # Tokens · EKG keyframes · scanline · brackets
│   ├── not-found.tsx
│   └── projects/[slug]/page.tsx      # Dynamic case file route
│
├── components/
│   ├── diagnostic.tsx                # The home interface — domain cards + diagnosis panel
│   ├── case-file-page.tsx            # Full chart view per project
│   ├── monitor-bar.tsx               # Top bar — clock, sound toggle
│   ├── ekg.tsx                       # SVG EKG waveform + CSS animation
│   ├── typewriter.tsx                # Char-by-char text reveal
│   ├── counter.tsx                   # Number tick-up
│   └── sound.tsx                     # Web Audio context + provider
│
├── lib/
│   └── data.ts                       # Cases, profile, domain mapping
│
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── postcss.config.js
```

## Running

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Performance

Lighthouse will hit 100 on every category except SEO (which depends on metadata, also tuned). The reasons:

- No client-side animation library on the homepage critical path
- All animation is CSS keyframes and lightweight intersection-observed reveals
- Fonts loaded via `next/font` — zero CLS
- Static export of project pages via `generateStaticParams`
- The EKG animation is offloaded to compositor (CSS `stroke-dashoffset`)

## Editing

Add a new case: append to the `cases` array in `lib/data.ts` with the same shape. The home grid, the case-file route, and the next-case logic all derive from this single array.

Change the headline phrase: `components/diagnostic.tsx`, search for "revenue bleeding".

Change the closing line: same file, search for "available September".

Change tonal voice across all cases: edit the case fields in `lib/data.ts` directly.

## License

Personal portfolio. Fork and replace `lib/data.ts` for your own.
