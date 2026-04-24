# The Architecture of Intent

A cinematic portfolio for **Musharraf Shaik** — Data-Driven B2B Marketing Strategist.
Built on Next.js 14 (App Router) · React 18 · Tailwind CSS · Framer Motion · Lenis.

> _"I don't just market. I engineer revenue."_

---

## Concept

The site bridges Musharraf's engineering origin (B.Tech ECE) with his commercial discipline (Crio.Do, KNR Traders, ESSEC). The visual language is **engineering-blueprint meets cinematic noir** — schematic grids, terminal readouts, signal-cyan and ember-amber accents on deep obsidian, Fraunces display serif against JetBrains Mono.

The narrative spine is **BMAD** — Build · Measure · Analyze · Deploy — a four-beat philosophy that recurs in the thesis section, the project pages, and the marquee.

---

## Signature Interactions

| # | Interaction | Where |
|---|---|---|
| 1 | **Particle field organizes on scroll** — ~280 particles tween from chaos into a four-stage marketing funnel as the hero scrolls past, color shifting bone → cyan, with connector lines threading the structure once organization passes 50%. | `components/hero.tsx` |
| 2 | **Magnetic name effect** — "Musharraf Shaik" pulls toward the cursor on hover via Framer motion values + spring. | `components/hero.tsx` |
| 3 | **Self-drawing SVG circuit timeline** — the trajectory section uses `pathLength` driven by `useScroll` so the spine literally draws itself as you descend. | `components/trajectory.tsx` |
| 4 | **Asymmetric project grid** with category-specific generative SVG artwork — every card has its own visual algorithm (funnel for Growth, node graph for Strategy, concentric orbits for Brand, activation grid for Operations). | `components/projects-grid.tsx` |
| 5 | **Custom cursor** with four variants (default · hover · text · view) using `mix-blend-difference` and `data-cursor` attribute targeting. | `components/cursor.tsx` |
| 6 | **Lenis smooth scroll** — hardware-accelerated inertia tuned to `1.15s` smoothstep. | `components/smooth-scroll.tsx` |
| 7 | **Live Paris CET clock** in the nav — ticks every second to remind you he's available Sept 26 in Paris. | `components/nav.tsx` |
| 8 | **Dynamic project pages** with full-bleed hero, sticky BMAD column on the left, embed simulation on the right (dashboards, scenario charts, Gantt roadmaps), metrics strip, and a magnetic "Next Project" transition that routes you to the next case in the array. | `app/projects/[slug]/page.tsx` + `components/project-page-client.tsx` |

---

## Quick start

```bash
# 1. Install
npm install

# 2. Dev server
npm run dev

# 3. Production build
npm run build && npm run start
```

Open <http://localhost:3000> in your browser.

> Requires Node 18.17+ (Next.js 14 requirement).

---

## File map

```
musharraf-portfolio/
├── app/
│   ├── layout.tsx                    # Root layout · fonts · cursor · smooth-scroll
│   ├── page.tsx                      # Homepage composition
│   ├── globals.css                   # Tokens · cursor · grids · grain · animations
│   ├── not-found.tsx                 # 404 schematic page
│   └── projects/
│       ├── page.tsx                  # /projects index
│       └── [slug]/page.tsx           # Dynamic project route
│
├── components/
│   ├── nav.tsx                       # Top nav · live clock · scroll-blur
│   ├── cursor.tsx                    # Custom cursor (4 variants)
│   ├── smooth-scroll.tsx             # Lenis wrapper
│   ├── hero.tsx                      # Hero · particle field · magnetic name
│   ├── thesis.tsx                    # BMAD philosophy section
│   ├── trajectory.tsx                # Self-drawing SVG circuit timeline
│   ├── projects-grid.tsx             # Asymmetric grid + generative artwork
│   ├── sections.tsx                  # Stack · Marquee · Contact
│   └── project-page-client.tsx       # Project page (hero · BMAD · embed · next)
│
├── lib/
│   └── data.ts                       # Single source of truth (projects, profile, timeline)
│
├── tailwind.config.ts                # Design tokens · fonts · keyframes
├── next.config.js
├── tsconfig.json
├── package.json
└── postcss.config.js
```

---

## Design tokens

Defined in `tailwind.config.ts`:

| Token | Hex | Use |
|---|---|---|
| `ink-950` | `#070809` | Page background (deepest) |
| `ink-900` | `#0B0D0F` | Surface lift (sections, cards) |
| `ink-800` | `#13161A` | Card hover, dividers |
| `signal-500` | `#5BE9E9` | Primary accent · cyan signal |
| `ember-500` | `#E8A14B` | Secondary accent · warm amber |
| `bone-100` | `#E8E4DC` | Body text |

**Type stack**

- `font-display` → Fraunces (serif, optical sizing 9–144, soft 0–100)
- `font-mono` → JetBrains Mono (terminal readouts, labels, metrics)
- `font-sans` → Geist (UI text, navigation)

**Motion**

- All transitions use `cubic-bezier(0.22, 1, 0.36, 1)` (smoothstep) for a cinematic ease-out.
- Lenis duration `1.15s` keeps inertia present without feeling laggy.

---

## Customizing

### Swap real embeds into project pages

`components/project-page-client.tsx` has an `EmbedRenderer` switch that returns SVG simulations for each project (dashboard, scenarios, Gantt, archetypes). Replace any `case "your-slug"` block with:

```tsx
case "b2b-revenue-engine":
  return (
    <iframe
      src="https://app.powerbi.com/view?r=YOUR_REPORT_ID"
      className="w-full h-full border-0"
      allow="fullscreen"
      title="Pipeline dashboard"
    />
  );
```

The aspect ratio (`16/10`) and surrounding chrome (header bar, note footer) stay intact — only the body changes.

### Add a new project

1. Append a new entry to the `projects` array in `lib/data.ts` (mirror the existing schema: `slug`, `index`, `title`, `subtitle`, `client`, `year`, `category`, `hero`, `summary`, `bmad`, `metrics`, `stack`, `embed`, `artifacts`).
2. The grid (`components/projects-grid.tsx`), the dynamic route (`app/projects/[slug]/page.tsx`), and the next-project transition all read from the same array — they pick up new entries automatically.
3. Optionally, extend the `ProjectHeroArt` switch in `project-page-client.tsx` to add a unique hero composition for the new category.

### Update the trajectory

Edit the `timeline` array in `lib/data.ts`. Each node has `id`, `year`, `label`, `title`, `body`, `type` (`milestone | education | experience`), and `tags`. The SVG spine in `components/trajectory.tsx` reads positions based on array index — any length works.

### Change the headline

The hero headline lives in `components/hero.tsx`. Search for `I don't just market` to find the line. The strikethrough animation on "market" is a `<motion.span>` with an underline scaling on viewport entry — adjust `transition.duration` for pacing.

### Fonts

Defined in `app/layout.tsx` via `next/font/google`. Swap any of:

```tsx
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz", "SOFT"] });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
```

The CSS variables `--font-fraunces`, `--font-mono`, `--font-sans` are wired into `tailwind.config.ts` under `fontFamily`.

### Cursor

The custom cursor in `components/cursor.tsx` switches variant based on `data-cursor` attributes on hovered elements:

- `data-cursor="view"` → enlarged "View" label cursor (used on project cards)
- `data-cursor="hover"` → small ring
- `data-cursor="text"` → I-beam mode

Add the attribute to any element to opt in.

---

## Performance notes

- The particle canvas in the hero uses `requestAnimationFrame` and a single 2D context — render cost stays under 1.5ms/frame on a mid-tier laptop.
- All Framer Motion sections gate animations on `useInView` with `once: true` so they don't re-fire on backscroll.
- Fonts are self-hosted via `next/font` — zero CLS, no external requests at runtime.
- The site is fully static-generatable; `generateStaticParams` in the project route produces all paths at build time.

---

## Accessibility

- Custom cursor falls back to native pointer on touch devices (`pointer: coarse` detection in `cursor.tsx`).
- All interactive elements have keyboard focus styles (Tailwind `ring-` defaults preserved).
- Semantic HTML throughout — `main`, `section`, `nav`, `article` used appropriately.
- The decorative grain and grid layers are flagged `aria-hidden` and `pointer-events-none`.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Styling | Tailwind CSS 3.4 + CSS variables |
| Animation | Framer Motion 11 |
| Smooth scroll | Lenis 1.1 |
| Fonts | Fraunces · JetBrains Mono · Geist (via `next/font`) |
| Language | TypeScript 5.5 (strict) |

---

## License

Personal portfolio. Code is yours to fork for your own portfolio — replace the data in `lib/data.ts` and the headline in `components/hero.tsx` first.

---

**Musharraf Shaik** · Available Sept 2026 · Paris
[contact.shaikmusharraf@gmail.com](mailto:contact.shaikmusharraf@gmail.com)
