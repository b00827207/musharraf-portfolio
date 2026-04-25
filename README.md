# Musharraf Shaik · Portfolio

A classic editorial portfolio built around five strategic engagements.

## Concept

> A marketing strategist who finds where revenue is bleeding — and builds the system that fixes it.

Five cases. Five outcomes. One scrolling page. Each case is presented as a magazine-style editorial spread with story, metrics, and an inline interactive intelligence brief.

## Stack

Next.js 14 App Router · React 18 · TypeScript strict · Tailwind 3 · Fraunces (display) + Inter (body) + JetBrains Mono (technical) via `next/font/google`. No backend.

## Design

- **Palette**: warm paper (`#F5F1E8`) background, deep ink (`#1A1815`) text, terracotta (`#B8543B`) single accent
- **Type**: Fraunces for display headlines and numbers (italics for emphasis). Inter for body. JetBrains Mono for labels and metadata
- **Animation**: scroll-triggered fade-up on every section. Numbers count up when in view. Charts draw in. Marquee ribbon in hero. All CSS keyframes for continuous animation
- **Layout**: alternating editorial spreads (text/dashboard switch sides per case) with large faded section numerals in the background

## Performance

Same constraints as before:
- Continuous JS animations: only the 30-second clock tick in hero
- Continuous CSS: marquee, paper grain, status dot pulse — all GPU-friendly
- Charts and counters animate **only when in viewport** (IntersectionObserver), and **only once**
- No particle fields. No custom cursors. No smooth-scroll libraries beyond CSS `scroll-behavior: smooth`

## Run

```bash
npm install
npm run dev
# http://localhost:3000
```

## Map

```
app/
  layout.tsx              fonts + meta
  page.tsx                Hero → Thesis → Work → Range → About
  globals.css             paper, grain, marquee, num-shine
  not-found.tsx
  case/[slug]/page.tsx    deep link to one case

components/
  nav.tsx                 fixed top bar
  hero.tsx                headline + marquee + signature
  thesis.tsx              "what I do" section
  work.tsx                5 case spreads with dashboards
  range.tsx               6-cell skill matrix
  about.tsx               education + leadership + contact
  footer.tsx              colophon

  dash-card.tsx           5 case-specific intelligence dashboards
  counter.tsx             animated number, in-view triggered
  reveal.tsx              fade-up wrapper + word-split headline
  use-in-view.ts          IntersectionObserver hook

  case-detail.tsx         standalone deep-link page

lib/
  data.ts                 5 cases + profile
```

## Deploy

Auto-deploys on Netlify with default Next.js build. No env vars. No secrets.
