# Musharraf Shaik · Portfolio

Editorial portfolio. Two layers of work: **Professional Experience** (industry, paid) gets the deep treatment; **Project Experience** (ESSEC consulting) gets the lean treatment with link-out to the deployed strategy platforms.

## Concept

> A marketing strategist who finds where revenue is bleeding — and builds the system that fixes it.

Five engagements total. Two industry roles (Crio.Do, KNR Traders) where I shipped real revenue, presented as full editorial spreads with multi-panel interactive intelligence dashboards. Three ESSEC engagements (Marselia, Bvlgari, Comtesse) presented as tighter editorial spreads that link out to the full deployed strategy platforms.

## Sections

1. **Hero** — name, role, available date
2. **Thesis** — three editorial paragraphs + DIAGNOSE → MODEL → DESIGN → SHIP
3. **Professional Experience** — Crio + KNR with rich 4-tab dashboards + timeline ribbons
4. **Project Experience** — Marselia + Bvlgari + Comtesse with single-chart previews + "Open the live platform" CTAs
5. **Range** — six-cell skill matrix
6. **About + Contact** — education, leadership, direct contact

## Stack

Next.js 14 App Router · React 18 · TypeScript strict · Tailwind 3 · Fraunces (display) + Inter (body) + JetBrains Mono (technical) via `next/font/google`. No backend.

## Performance

- Continuous JS animations: 30-second clock tick in hero (only)
- Continuous CSS: marquee, paper grain, status dot pulse — all GPU-friendly
- Charts and counters animate **only when in viewport** (IntersectionObserver), and **only once**
- All ProDash tabs render their charts lazily on tab switch

## File map

```
app/
  layout.tsx              fonts + meta
  page.tsx                Hero → Thesis → Work (Pro + Projects) → Range → About
  globals.css             paper, grain, marquee, num-shine
  not-found.tsx
  case/[slug]/page.tsx    deep-link to one case (Pro → ProDash, Project → DashCard)

components/
  nav.tsx                 fixed top bar
  hero.tsx                headline + marquee + signature
  thesis.tsx              "what I do"
  work.tsx                Professional + Projects sections
  pro-spread.tsx          editorial spread for professional cases (with timeline)
  pro-dash.tsx            4-tab interactive intelligence dashboards (Crio + KNR)
  range.tsx               6-cell skill matrix
  about.tsx               education + leadership + contact
  footer.tsx
  dash-card.tsx           single-chart previews (project cases)
  counter.tsx             animated number, in-view triggered
  reveal.tsx              fade-up wrapper + word-split headline
  use-in-view.ts          IntersectionObserver hook
  case-detail.tsx         standalone deep-link page

lib/
  data.ts                 5 cases (with experienceType) + profile
```

