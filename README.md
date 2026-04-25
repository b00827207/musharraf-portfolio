# AETHER · Operating Console

A JARVIS-style console for Shaik Musharraf's strategic engagements.

## What this is

Not a portfolio. An **operating system** with five live modules. Visitors type commands; the system responds.

- **Boot sequence** — terminal logs scroll for ~1.5 seconds on first load
- **Telemetry rail (left)** — Paris time, session ID, uptime, system status, EKG, scrolling event log
- **Center stage** — view that swaps based on commands (idle / diagnostic / module / identity / list / recruit / help)
- **Command bar (bottom)** — typed input with TAB autocomplete, ↑↓ history, suggestions
- **Optional sound** — soft 880Hz beep on success, off by default

## Stack

Next.js 14 App Router · React 18 · TypeScript strict · Tailwind 3 · Fraunces + JetBrains Mono via `next/font/google`. No backend. No external API calls. No databases.

## Performance budget

Continuous animations at runtime:
- 1Hz clock + uptime tick (telemetry rail)
- CSS keyframe EKG (one path, no JS)
- CSS keyframe status-dot pulse + cursor blink + CRT flicker
- Event log entries animate in once when added

Everything else is **one-shot reveal** triggered by command.

## Running

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Commands

| Command | Effect |
|---|---|
| `HELP` or `?` | Show command manifest |
| `LIST.MODULES` | Enumerate all 5 engagements |
| `WHO.IS` | Identity scan (JARVIS profiling) |
| `DIAG.<DOMAIN>` | Run diagnostic on ACQUISITION / CONVERSION / RETENTION / PRICING |
| `OPEN.<MODULE>` | Load case (CRIO / MARSELIA / BVLGARI / KNR / COMTESSE) |
| `SHOW.<METRIC>` | Fuzzy match a metric (e.g. SHOW.SYNERGY) |
| `RECRUIT` | Open contact channel |
| `REBOOT` | Return to idle |
| `CLEAR` | Clear event log |

Keyboard shortcuts in the command bar:
- `TAB` — autocomplete first suggestion
- `↑` / `↓` — recall previous commands
- `ESC` — clear input
- `ENTER` — execute

## Deployment

Deploys on Netlify with default Next.js settings. Build command: `npm run build`. Publish directory: `.next`.

## File map

```
app/
  layout.tsx              fonts + AetherProvider
  page.tsx                Boot → main shell
  globals.css             tokens, scanlines, EKG, brackets
  not-found.tsx
  projects/[slug]/page.tsx   deep-link route to single module

components/
  aether-core.tsx         state engine (event log, view, commands, sound)
  boot.tsx                terminal-style boot sequence
  command-bar.tsx         typed input with autocomplete
  telemetry-rail.tsx      left rail (clock, status, EKG, log, sound)
  stage.tsx               center area, dispatches view
  case-file-page.tsx      standalone deep-link page
  dashboard.tsx           5 case-specific intelligence dashboards
  counter.tsx             memoized animated number
  typewriter.tsx          char-by-char text reveal
  ekg.tsx                 SVG pulse component
  views/
    idle-view.tsx         landing experience
    diagnostic-view.tsx   DIAG.<domain> result
    module-view.tsx       OPEN.<slug> full case
    identity-view.tsx     WHO.IS profiling
    modules-list-view.tsx LIST.MODULES output
    recruit-view.tsx      RECRUIT contact card
    help-view.tsx         command manifest

lib/
  data.ts                 5 case files + profile
```
