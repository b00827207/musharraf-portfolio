'use client';

import { useEffect, useState } from 'react';

// ============================================================
// CASE-SPECIFIC INTELLIGENCE DASHBOARDS
// Each dashboard is a 4-tab brief: a compact strategy platform.
// All visuals are SVG. Animation is CSS-only.
// ============================================================

const VITAL = '#7CFFB7';
const VITAL_DIM = 'rgba(124, 255, 183, 0.5)';
const VITAL_GLOW = 'rgba(124, 255, 183, 0.18)';
const BONE = '#EAE6DD';
const BONE_DIM = 'rgba(234, 230, 221, 0.55)';
const BONE_DEEP = 'rgba(234, 230, 221, 0.28)';
const BONE_FADE = 'rgba(234, 230, 221, 0.08)';
const CRITICAL = '#FF6B6B';

// === Reveal hook
function useReveal(delay = 0, deps: any[] = []) {
  const [r, setR] = useState(false);
  useEffect(() => {
    setR(false);
    const t = setTimeout(() => setR(true), delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
  return r;
}

// ============================================================
// TOP-LEVEL — one Dashboard per case
// ============================================================
export function Dashboard({ slug }: { slug: string }) {
  switch (slug) {
    case 'crio-revenue-engine':
      return <CrioDashboard />;
    case 'marselia-vertical-integration':
      return <MarseliaDashboard />;
    case 'bvlgari-corpo-architettura':
      return <BvlgariDashboard />;
    case 'knr-operational-grid':
      return <KnrDashboard />;
    case 'comtesse-trade-marketing':
      return <ComtesseDashboard />;
    default:
      return null;
  }
}

// ============================================================
// SHARED CHROME — frame, tabs, KPI strip, panel
// ============================================================
function DashFrame({
  title,
  subtitle,
  badges,
  tabs,
  kpis,
  externalUrl,
}: {
  title: string;
  subtitle: string;
  badges: string[];
  tabs: { id: string; label: string; render: () => React.ReactNode }[];
  kpis: { label: string; value: string; delta?: string }[];
  externalUrl?: string;
}) {
  const [active, setActive] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className="bracket relative border border-bone-fade/40 bg-ink-900/30">
      <span className="bl" />
      <span className="br" />

      {/* HEADER BAR */}
      <header className="flex flex-wrap items-start justify-between gap-3 px-5 md:px-7 pt-5 pb-4 border-b border-bone-fade/30">
        <div className="flex-1 min-w-[260px]">
          <div className="flex items-center gap-2.5 font-mono text-micro uppercase text-bone-deep mb-2 flex-wrap">
            <span className="status-dot" />
            <span className="tracking-[0.18em]">INTELLIGENCE BRIEF</span>
            <span className="text-bone-fade">/</span>
            <span className="text-bone-dim tracking-[0.16em]">v3.0 · LIVE</span>
            {badges.map((b) => (
              <span
                key={b}
                className="border border-bone-fade/50 px-1.5 py-0.5 text-[8.5px] tracking-[0.2em] text-bone-dim"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="font-display text-[1.4rem] md:text-[1.7rem] leading-tight text-bone tracking-[-0.02em]">
            {title}
          </div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-bone-dim mt-1">
            {subtitle}
          </div>
        </div>

        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-vital border border-vital/40 px-3 py-2 hover:bg-vital hover:text-ink-950 transition-colors"
          >
            OPEN FULL PLATFORM ↗
          </a>
        )}
      </header>

      {/* KPI STRIP */}
      <div className="grid grid-cols-3 border-b border-bone-fade/30">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className={`px-5 md:px-7 py-4 ${
              i < kpis.length - 1 ? 'border-r border-bone-fade/30' : ''
            }`}
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-deep mb-1">
              {k.label}
            </div>
            <div className="font-display text-[1.3rem] md:text-[1.8rem] leading-none text-vital tabular tracking-[-0.02em]">
              {k.value}
            </div>
            {k.delta && (
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-bone-dim mt-1.5">
                {k.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* TABS */}
      <nav
        className="flex flex-wrap items-stretch border-b border-bone-fade/30 bg-ink-950/30"
        aria-label="Dashboard sections"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            aria-pressed={active === t.id}
            className={`relative px-4 md:px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
              active === t.id
                ? 'text-vital'
                : 'text-bone-dim hover:text-bone'
            }`}
          >
            {t.label}
            {active === t.id && (
              <span
                aria-hidden
                className="absolute left-3 right-3 -bottom-px h-px bg-vital"
                style={{ boxShadow: `0 0 6px ${VITAL_GLOW}` }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* PANEL BODY */}
      <div className="px-5 md:px-7 py-6 min-h-[320px]">
        <div key={active} className="animate-fade-up" style={{ animationFillMode: 'both' }}>
          {activeTab.render()}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="flex items-center justify-between px-5 md:px-7 py-3 border-t border-bone-fade/30 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-deep">
        <span>SOURCE · STRATEGY ENGAGEMENT</span>
        <span>CONFIDENTIAL · DEMO INSTANCE</span>
      </footer>
    </div>
  );
}

// === Reusable section header
function PanelHeader({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-deep flex items-center gap-3">
        <span className="w-5 h-px bg-bone-fade" />
        <span>{children}</span>
      </div>
      {sub && (
        <div className="font-display text-[1.05rem] md:text-[1.2rem] text-bone leading-snug mt-2 tracking-[-0.01em]">
          {sub}
        </div>
      )}
    </div>
  );
}

// === Reusable bordered cell
function Cell({
  label,
  value,
  delta,
  highlight = false,
}: {
  label: string;
  value: string;
  delta?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="border border-bone-fade/40 px-3.5 py-3 bg-ink-950/30"
      style={highlight ? { borderColor: VITAL, background: 'rgba(124, 255, 183, 0.04)' } : {}}
    >
      <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-bone-deep mb-1">
        {label}
      </div>
      <div
        className={`font-display text-[1.3rem] leading-none tabular tracking-[-0.015em] ${
          highlight ? 'text-vital' : 'text-bone'
        }`}
      >
        {value}
      </div>
      {delta && (
        <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-bone-dim mt-1.5">
          {delta}
        </div>
      )}
    </div>
  );
}

// ============================================================
// 001 · CRIO.DO — Revenue engineering
// ============================================================
function CrioDashboard() {
  return (
    <DashFrame
      title="Crio.Do · B2B Revenue Engineering"
      subtitle="EdTech · Series A · 124+ active accounts · 6-month engagement"
      badges={['ENGAGEMENT', 'CLOSED', 'IN-HOUSE']}
      kpis={[
        { label: 'CONVERSION LIFT', value: '+12pp', delta: 'team avg → 28.6%' },
        { label: 'REVENUE GENERATED', value: '₹4.2M', delta: '20.3% of regional topline' },
        { label: 'SALES CYCLE', value: '9.2d', delta: 'from 11.6d (−20.7%)' },
      ]}
      tabs={[
        { id: 'pipeline', label: 'PIPELINE', render: () => <CrioPipelinePanel /> },
        { id: 'cycle', label: 'CYCLE TIME', render: () => <CrioCyclePanel /> },
        { id: 'cohort', label: 'COHORT', render: () => <CrioCohortPanel /> },
        { id: 'team', label: 'TEAM OPS', render: () => <CrioTeamPanel /> },
      ]}
    />
  );
}

function CrioPipelinePanel() {
  const r = useReveal(50);
  // Funnel stages — relative %
  const stages = [
    { label: 'LEADS', before: 100, after: 100 },
    { label: 'CONTACTED', before: 72, after: 88 },
    { label: 'QUALIFIED', before: 41, after: 58 },
    { label: 'DEMO', before: 22, after: 36 },
    { label: 'OFFER', before: 11, after: 22 },
    { label: 'CLOSED', before: 4.6, after: 11.4 },
  ];

  return (
    <div>
      <PanelHeader sub="Funnel rebuilt with revised pitch sequencing across 124+ active accounts.">
        SECTION 01 · PIPELINE GEOMETRY
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="ACCOUNTS WORKED" value="124+" delta="active commercial pipeline" />
        <Cell label="CYCLE EFFICIENCY" value="20.7%" delta="recovered" highlight />
        <Cell label="SLA COMPLIANCE" value="100%" delta="3-month interim window" />
      </div>

      <svg viewBox="0 0 600 220" className="w-full">
        {/* Y axis */}
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line
              x1={48}
              x2={580}
              y1={200 - (tick / 100) * 160}
              y2={200 - (tick / 100) * 160}
              stroke={BONE_FADE}
              strokeWidth="0.5"
            />
            <text
              x={42}
              y={203 - (tick / 100) * 160}
              fontSize="8"
              fill={BONE_DIM}
              textAnchor="end"
              fontFamily="ui-monospace, monospace"
            >
              {tick}%
            </text>
          </g>
        ))}

        {stages.map((s, i) => {
          const x = 65 + i * 88;
          const beforeH = (s.before / 100) * 160;
          const afterH = (s.after / 100) * 160;
          return (
            <g key={s.label}>
              <rect
                x={x}
                y={r ? 200 - beforeH : 200}
                width={32}
                height={r ? beforeH : 0}
                fill={BONE_DIM}
                style={{
                  transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${i * 60}ms`,
                }}
              />
              <rect
                x={x + 36}
                y={r ? 200 - afterH : 200}
                width={32}
                height={r ? afterH : 0}
                fill={VITAL}
                opacity={0.85}
                style={{
                  transition: 'all 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${250 + i * 70}ms`,
                  filter: `drop-shadow(0 0 3px ${VITAL_GLOW})`,
                }}
              />
              <text
                x={x + 34}
                y={215}
                fontSize="8"
                fill={BONE_DIM}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.5"
              >
                {s.label}
              </text>
              <text
                x={x + 16}
                y={r ? 195 - beforeH : 195}
                fontSize="7"
                fill={BONE_DEEP}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                opacity={r ? 1 : 0}
                style={{ transition: 'opacity 0.5s', transitionDelay: `${500 + i * 60}ms` }}
              >
                {s.before}%
              </text>
              <text
                x={x + 52}
                y={r ? 195 - afterH : 195}
                fontSize="8"
                fill={VITAL}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
                opacity={r ? 1 : 0}
                style={{ transition: 'opacity 0.5s', transitionDelay: `${800 + i * 70}ms` }}
              >
                {s.after}%
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(48, 14)">
          <rect width="8" height="8" fill={BONE_DIM} />
          <text x="13" y="7" fontSize="8" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
            BEFORE INTERVENTION
          </text>
          <rect x="160" width="8" height="8" fill={VITAL} />
          <text x="173" y="7" fontSize="8" fill={VITAL} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
            AFTER · 6 MONTHS
          </text>
        </g>
      </svg>
    </div>
  );
}

function CrioCyclePanel() {
  const r = useReveal(50);
  const points = [
    { day: 0, before: 11.6, after: 11.6 },
    { day: 30, before: 11.4, after: 10.6 },
    { day: 60, before: 11.6, after: 10.0 },
    { day: 90, before: 11.5, after: 9.6 },
    { day: 120, before: 11.7, after: 9.4 },
    { day: 150, before: 11.5, after: 9.3 },
    { day: 180, before: 11.6, after: 9.2 },
  ];
  const w = 540, h = 180;
  const xPos = (d: number) => 50 + (d / 180) * (w - 70);
  const yPos = (v: number) => h - 20 - ((v - 8) / 4) * (h - 40);

  const buildPath = (key: 'before' | 'after') =>
    points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xPos(p.day)} ${yPos(p[key])}`)
      .join(' ');

  return (
    <div>
      <PanelHeader sub="Sales cycle compressed by 2.4 days — 35.4% pitch-to-conversion improvement.">
        SECTION 02 · SALES CYCLE COMPRESSION
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="BASELINE" value="11.6d" delta="pre-intervention avg" />
        <Cell label="OUTCOME" value="9.2d" delta="−20.7% cycle time" highlight />
        <Cell label="P2C IMPROVEMENT" value="+35.4%" delta="pitch-to-conversion" />
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Y ticks */}
        {[8, 9, 10, 11, 12].map((tick) => (
          <g key={tick}>
            <line x1={50} x2={w - 20} y1={yPos(tick)} y2={yPos(tick)} stroke={BONE_FADE} strokeWidth="0.4" strokeDasharray="2 3" />
            <text x={42} y={yPos(tick) + 3} fontSize="8" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              {tick}d
            </text>
          </g>
        ))}
        {/* X ticks */}
        {points.map((p) => (
          <g key={p.day}>
            <line x1={xPos(p.day)} x2={xPos(p.day)} y1={h - 20} y2={h - 17} stroke={BONE_DEEP} strokeWidth="0.5" />
            <text x={xPos(p.day)} y={h - 7} fontSize="8" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">
              D{p.day}
            </text>
          </g>
        ))}
        {/* Before line */}
        <path
          d={buildPath('before')}
          fill="none"
          stroke={BONE_DIM}
          strokeWidth="1.2"
          strokeDasharray={r ? '0' : '600'}
          strokeDashoffset={r ? 0 : 600}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        {/* After line */}
        <path
          d={buildPath('after')}
          fill="none"
          stroke={VITAL}
          strokeWidth="2"
          strokeDasharray={r ? '0' : '600'}
          strokeDashoffset={r ? 0 : 600}
          style={{
            transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '350ms',
            filter: `drop-shadow(0 0 4px ${VITAL_GLOW})`,
          }}
        />
        {/* End markers */}
        <circle cx={xPos(180)} cy={yPos(11.6)} r={r ? 3 : 0} fill={BONE_DIM}
          style={{ transition: 'r 0.4s', transitionDelay: '1500ms' }} />
        <circle cx={xPos(180)} cy={yPos(9.2)} r={r ? 4 : 0} fill={VITAL}
          style={{ transition: 'r 0.4s', transitionDelay: '1800ms', filter: `drop-shadow(0 0 4px ${VITAL_GLOW})` }} />
        {/* Legend */}
        <g transform="translate(50, 14)">
          <line x1="0" y1="4" x2="14" y2="4" stroke={BONE_DIM} strokeWidth="1.2" />
          <text x="18" y="7" fontSize="8" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">BASELINE</text>
          <line x1="100" y1="4" x2="114" y2="4" stroke={VITAL} strokeWidth="2" />
          <text x="118" y="7" fontSize="8" fill={VITAL} fontFamily="ui-monospace, monospace" letterSpacing="0.5">POST-INTERVENTION</text>
        </g>
      </svg>
    </div>
  );
}

function CrioCohortPanel() {
  const r = useReveal(50);
  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
  const monthly = [0.42, 0.58, 0.71, 0.78, 0.85, 0.86];

  return (
    <div>
      <PanelHeader sub="₹4.2M direct revenue across 6-month engagement window — 20.3% of regional topline.">
        SECTION 03 · COHORT REVENUE BUILD
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="TOTAL REVENUE" value="₹4.2M" delta="6-month direct contribution" highlight />
        <Cell label="REGIONAL SHARE" value="20.3%" delta="of regional topline" />
        <Cell label="PEAK MONTH" value="M5" delta="₹0.85M month" />
      </div>

      <svg viewBox="0 0 540 200" className="w-full">
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
          <g key={tick}>
            <line x1={48} x2={520} y1={180 - tick * 140} y2={180 - tick * 140} stroke={BONE_FADE} strokeWidth="0.4" />
            <text x={42} y={183 - tick * 140} fontSize="8" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              {(tick).toFixed(2)}M
            </text>
          </g>
        ))}

        {monthly.map((v, i) => {
          const x = 70 + i * 75;
          const barH = v * 140;
          return (
            <g key={i}>
              <rect
                x={x}
                y={r ? 180 - barH : 180}
                width={45}
                height={r ? barH : 0}
                fill={VITAL}
                opacity={0.85}
                style={{
                  transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${i * 90}ms`,
                  filter: `drop-shadow(0 0 3px ${VITAL_GLOW})`,
                }}
              />
              <text x={x + 22.5} y={195} fontSize="8" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">
                {months[i]}
              </text>
              <text
                x={x + 22.5}
                y={r ? 175 - barH : 175}
                fontSize="9"
                fill={VITAL}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
                opacity={r ? 1 : 0}
                style={{ transition: 'opacity 0.5s', transitionDelay: `${600 + i * 90}ms` }}
              >
                ₹{v.toFixed(2)}M
              </text>
            </g>
          );
        })}
        <text x={48} y={14} fontSize="8" fill={BONE_DEEP} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
          MONTHLY DIRECT REVENUE · INR MILLIONS
        </text>
      </svg>
    </div>
  );
}

function CrioTeamPanel() {
  return (
    <div>
      <PanelHeader sub="3-month interim lead tenure managing 6-person cross-functional B2B team.">
        SECTION 04 · TEAM OPERATIONS
      </PanelHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Cell label="TEAM SIZE" value="6" delta="cross-functional B2B" />
        <Cell label="ASSOCIATES ONBOARDED" value="5+" delta="structured curriculum" />
        <Cell label="RAMP-UP TIME" value="−18%" delta="vs prior cohort" highlight />
        <Cell label="OUTPUT CONSISTENCY" value="+22%" delta="standardised process" highlight />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-3">
        <div className="border border-bone-fade/40 px-4 py-3.5 bg-ink-950/30">
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-2">DASHBOARDS DELIVERED</div>
          <ul className="space-y-1.5 font-mono text-[10.5px] text-bone-dim leading-relaxed">
            <li>· Weekly KPI roll-up · regional leadership</li>
            <li>· Account-level pipeline tracker</li>
            <li>· Pitch-to-conversion attribution</li>
            <li>· New-associate ramp-up monitor</li>
          </ul>
        </div>
        <div className="border border-bone-fade/40 px-4 py-3.5 bg-ink-950/30">
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-2">FRAMEWORKS BUILT</div>
          <ul className="space-y-1.5 font-mono text-[10.5px] text-bone-dim leading-relaxed">
            <li>· Pitch sequencing playbook · revised</li>
            <li>· Onboarding curriculum · 5+ associates</li>
            <li>· Performance trends · 3 regional clusters</li>
            <li>· Competitive analysis · root-cause diagnostics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 002 · MARSELIA — Air cargo vertical integration
// ============================================================
function MarseliaDashboard() {
  return (
    <DashFrame
      title="Marselia · Air Cargo Vertical Integration"
      subtitle="ESSEC · April 2026 · NordAir M&A · 4C Synergy Framework"
      badges={['STRATEGY', 'M&A', 'CONFIDENTIAL']}
      kpis={[
        { label: 'ANNUAL SYNERGY', value: '€14.05M', delta: '4C Framework run-rate' },
        { label: 'PAYBACK', value: '33.7mo', delta: 'IC threshold: 36mo' },
        { label: 'Y3 EBITDA', value: '€8.4M', delta: 'Base case · 29% margin' },
      ]}
      externalUrl="https://marselia-strategy.netlify.app/"
      tabs={[
        { id: 'options', label: 'STRATEGIC OPTIONS', render: () => <MarseliaOptionsPanel /> },
        { id: 'synergy', label: '4C SYNERGY', render: () => <MarseliaSynergyPanel /> },
        { id: 'scenarios', label: 'P&L SCENARIOS', render: () => <MarseliaScenariosPanel /> },
        { id: 'risk', label: 'RISK MATRIX', render: () => <MarseliaRiskPanel /> },
      ]}
    />
  );
}

function MarseliaOptionsPanel() {
  const r = useReveal(50);
  const options = [
    { name: 'STATUS QUO', score: 278, capex: '€0.5M', ebitda: '−€0.8M', recommended: false },
    { name: 'PARTIAL INTEGRATION', score: 307, capex: '€4.2M', ebitda: '€3.2M', recommended: false },
    { name: 'HYBRID OWNERSHIP', score: 409, capex: '€42–48M', ebitda: '€8.4M', recommended: true },
    { name: 'FULL FLEET', score: 280, capex: '€85–110M', ebitda: '€5.1M', recommended: false },
  ];

  return (
    <div>
      <PanelHeader sub="Hybrid Ownership scores 409/500 — superior across EBITDA, capital efficiency, and ESG.">
        SECTION 01 · MULTI-CRITERIA OPTIONS MATRIX
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="CANDIDATES SCREENED" value="14" delta="strategic fit matrix" />
        <Cell label="WINNING SCORE" value="409" delta="of 500 weighted" highlight />
        <Cell label="NORDAIR FIT" value="89/100" delta="copenhagen · 4× B737-800F" />
      </div>

      <svg viewBox="0 0 600 200" className="w-full">
        {[200, 300, 400, 500].map((tick) => (
          <g key={tick}>
            <line x1={170} x2={570} y1={180 - ((tick - 200) / 300) * 140} y2={180 - ((tick - 200) / 300) * 140} stroke={BONE_FADE} strokeWidth="0.4" />
            <text x={165} y={183 - ((tick - 200) / 300) * 140} fontSize="8" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              {tick}
            </text>
          </g>
        ))}
        {options.map((o, i) => {
          const y = 25 + i * 38;
          const barW = ((o.score - 200) / 300) * 400;
          const recommended = o.recommended;
          return (
            <g key={o.name}>
              <text x={165} y={y + 4} fontSize="9" fill={recommended ? VITAL : BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace" letterSpacing="0.5" fontWeight={recommended ? '600' : '400'}>
                {o.name}
              </text>
              <rect
                x={170}
                y={y - 8}
                width={r ? barW : 0}
                height={20}
                fill={recommended ? VITAL : BONE_DIM}
                opacity={recommended ? 0.9 : 0.45}
                style={{
                  transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${i * 100}ms`,
                  filter: recommended ? `drop-shadow(0 0 4px ${VITAL_GLOW})` : 'none',
                }}
              />
              <text
                x={170 + (r ? barW : 0) + 6}
                y={y + 4}
                fontSize="9"
                fill={recommended ? VITAL : BONE}
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
                opacity={r ? 1 : 0}
                style={{ transition: 'opacity 0.4s', transitionDelay: `${500 + i * 100}ms` }}
              >
                {o.score}
              </text>
              {recommended && (
                <text x={170} y={y + 25} fontSize="8" fill={VITAL} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                  ★ RECOMMENDED · {o.capex} CAPEX · {o.ebitda} Y3 EBITDA
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MarseliaSynergyPanel() {
  const r = useReveal(50);
  const items = [
    { label: 'FUEL ARBITRAGE', val: 2.8, dim: 'COMBINATION' },
    { label: 'CREW INTERNALISATION', val: 3.6, dim: 'COMBINATION' },
    { label: 'MAINTENANCE CONTROL', val: 2.4, dim: 'COMBINATION' },
    { label: 'ROUTE OPTIMISATION', val: 1.9, dim: 'CONNECTION' },
    { label: 'VOLUME PREMIUM', val: 3.35, dim: 'CONSOLIDATION' },
  ];
  const total = items.reduce((s, i) => s + i.val, 0);

  return (
    <div>
      <PanelHeader sub="€14.05M annual run-rate value across 5 mechanisms · 4C Framework.">
        SECTION 02 · 4C SYNERGY WATERFALL
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="ACMI LEAKAGE" value="€8.86M" delta="annual · status quo" />
        <Cell label="LARGEST DRIVER" value="€3.6M" delta="crew internalisation" />
        <Cell label="TOTAL UPLIFT" value="€14.05M" delta="full run-rate Y2" highlight />
      </div>

      <div className="space-y-3">
        {items.map((it, i) => {
          const pct = (it.val / 4) * 100;
          return (
            <div key={it.label} className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-3 font-mono text-[10px] uppercase tracking-[0.15em] text-bone">
                {it.label}
              </div>
              <div className="col-span-7 relative h-6 bg-ink-950/40 border border-bone-fade/30">
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: r ? `${pct}%` : '0%',
                    background: VITAL,
                    opacity: 0.85,
                    transition: 'width 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: `${i * 80}ms`,
                    filter: `drop-shadow(0 0 3px ${VITAL_GLOW})`,
                  }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase text-bone-deep">
                  {it.dim}
                </div>
              </div>
              <div
                className="col-span-2 font-mono text-[11px] tabular text-vital text-right"
                style={{
                  opacity: r ? 1 : 0,
                  transition: 'opacity 0.4s',
                  transitionDelay: `${600 + i * 80}ms`,
                }}
              >
                €{it.val.toFixed(2)}M
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-12 gap-3 items-center pt-3 border-t border-vital/30">
          <div className="col-span-10 font-mono text-[11px] uppercase tracking-[0.18em] text-vital font-semibold">
            TOTAL ANNUAL VALUE CREATION
          </div>
          <div className="col-span-2 font-mono text-[14px] tabular text-vital text-right font-semibold">
            €{total.toFixed(2)}M
          </div>
        </div>
      </div>
    </div>
  );
}

function MarseliaScenariosPanel() {
  const r = useReveal(50);
  // Three scenarios: revenue and EBITDA across Y1, Y2, Y3
  const scenarios = [
    { name: 'BEAR', color: BONE_DIM, ebitda: [-1.2, 1.8, 4.8] },
    { name: 'BASE', color: VITAL, ebitda: [-0.4, 4.2, 8.4], recommended: true },
    { name: 'BULL', color: BONE, ebitda: [1.2, 7.5, 11.2] },
  ];
  const w = 540, h = 200;
  const max = 12, min = -2;
  const xPos = (i: number) => 60 + i * 150;
  const yPos = (v: number) => h - 30 - ((v - min) / (max - min)) * (h - 60);

  return (
    <div>
      <PanelHeader sub="Hybrid model returns positive across Bear/Base/Bull scenarios — confirmed by sensitivity analysis.">
        SECTION 03 · 3-SCENARIO P&L · Y1–Y3 EBITDA
      </PanelHeader>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Cell label="BEAR · Y3 EBITDA" value="€4.8M" delta="yield compression" />
        <Cell label="BASE · Y3 EBITDA" value="€8.4M" delta="29% margin · on plan" highlight />
        <Cell label="BULL · Y3 EBITDA" value="€11.2M" delta="recovery + e-com lift" />
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Y axis */}
        {[-2, 0, 4, 8, 12].map((tick) => (
          <g key={tick}>
            <line x1={50} x2={w - 30} y1={yPos(tick)} y2={yPos(tick)} stroke={tick === 0 ? BONE_DIM : BONE_FADE} strokeWidth={tick === 0 ? 0.8 : 0.4} />
            <text x={42} y={yPos(tick) + 3} fontSize="8" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              €{tick}M
            </text>
          </g>
        ))}
        {/* X labels */}
        {['Y1', 'Y2', 'Y3'].map((y, i) => (
          <text key={y} x={xPos(i)} y={h - 12} fontSize="9" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
            {y}
          </text>
        ))}
        {/* Lines per scenario */}
        {scenarios.map((s, idx) => {
          const path = s.ebitda.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i)} ${yPos(v)}`).join(' ');
          return (
            <g key={s.name}>
              <path
                d={path}
                fill="none"
                stroke={s.color}
                strokeWidth={s.recommended ? 2.2 : 1.3}
                strokeDasharray={r ? '0' : '600'}
                strokeDashoffset={r ? 0 : 600}
                style={{
                  transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${idx * 200}ms`,
                  filter: s.recommended ? `drop-shadow(0 0 4px ${VITAL_GLOW})` : 'none',
                }}
              />
              {s.ebitda.map((v, i) => (
                <circle
                  key={i}
                  cx={xPos(i)}
                  cy={yPos(v)}
                  r={r ? (s.recommended ? 4 : 3) : 0}
                  fill={s.color}
                  style={{ transition: 'r 0.4s', transitionDelay: `${1100 + idx * 100 + i * 60}ms` }}
                />
              ))}
              {/* End label */}
              <text
                x={xPos(2) + 8}
                y={yPos(s.ebitda[2]) + 3}
                fontSize="9"
                fill={s.color}
                fontFamily="ui-monospace, monospace"
                fontWeight={s.recommended ? '600' : '400'}
                opacity={r ? 1 : 0}
                style={{ transition: 'opacity 0.5s', transitionDelay: `${1500 + idx * 100}ms` }}
              >
                {s.name} · €{s.ebitda[2]}M
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MarseliaRiskPanel() {
  const r = useReveal(50);
  const risks = [
    { id: 'R1', label: 'FUEL SPIKE', prob: 0.45, impact: 0.70, post: 0.195 },
    { id: 'R2', label: 'INTEGRATION FAIL', prob: 0.25, impact: 0.85, post: 0.128 },
    { id: 'R3', label: 'CREW ATTRITION', prob: 0.55, impact: 0.35, post: 0.110 },
    { id: 'R4', label: 'AOC DELAY', prob: 0.30, impact: 0.50, post: 0.090 },
    { id: 'R5', label: 'PHARMA NON-RENEW', prob: 0.20, impact: 0.45, post: 0.054 },
  ];
  const w = 540, h = 280;
  const xPos = (v: number) => 50 + v * (w - 80);
  const yPos = (v: number) => h - 40 - v * (h - 60);

  return (
    <div>
      <PanelHeader sub="5 material risks · all reduced to MEDIUM/LOW post-mitigation.">
        SECTION 04 · RISK MATRIX · PROBABILITY × IMPACT
      </PanelHeader>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Quadrant lines */}
        <line x1={xPos(0.5)} x2={xPos(0.5)} y1={20} y2={h - 35} stroke={BONE_FADE} strokeWidth="0.4" strokeDasharray="2 3" />
        <line x1={50} x2={w - 30} y1={yPos(0.5)} y2={yPos(0.5)} stroke={BONE_FADE} strokeWidth="0.4" strokeDasharray="2 3" />
        {/* Axes */}
        <line x1={50} x2={w - 30} y1={h - 35} y2={h - 35} stroke={BONE_DIM} strokeWidth="0.5" />
        <line x1={50} x2={50} y1={20} y2={h - 35} stroke={BONE_DIM} strokeWidth="0.5" />

        {/* Axis labels */}
        <text x={(w - 30 + 50) / 2} y={h - 8} fontSize="9" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.6">
          PROBABILITY →
        </text>
        <text x={20} y={h / 2} fontSize="9" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.6" transform={`rotate(-90, 20, ${h / 2})`}>
          ↑ IMPACT
        </text>

        {/* Quadrant labels */}
        <text x={xPos(0.75)} y={yPos(0.85)} fontSize="8" fill={CRITICAL} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.4" opacity="0.5">
          CRITICAL
        </text>
        <text x={xPos(0.25)} y={yPos(0.85)} fontSize="8" fill={BONE_DEEP} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.4">
          MONITOR
        </text>
        <text x={xPos(0.75)} y={yPos(0.15)} fontSize="8" fill={BONE_DEEP} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.4">
          FREQUENT · LOW
        </text>
        <text x={xPos(0.25)} y={yPos(0.15)} fontSize="8" fill={BONE_DEEP} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.4">
          MANAGEABLE
        </text>

        {/* Pre-mitigation risks */}
        {risks.map((rk, i) => (
          <g key={rk.id}>
            {/* Pre */}
            <circle
              cx={xPos(rk.prob)}
              cy={yPos(rk.impact)}
              r={r ? 7 : 0}
              fill={CRITICAL}
              opacity={0.6}
              style={{ transition: 'r 0.5s cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: `${i * 80}ms` }}
            />
            {/* Arrow to post */}
            <line
              x1={xPos(rk.prob)}
              y1={yPos(rk.impact)}
              x2={xPos(rk.prob * 0.6)}
              y2={yPos(rk.impact * 0.55)}
              stroke={VITAL_DIM}
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity={r ? 1 : 0}
              style={{ transition: 'opacity 0.4s', transitionDelay: `${500 + i * 80}ms` }}
            />
            {/* Post-mitigation */}
            <circle
              cx={xPos(rk.prob * 0.6)}
              cy={yPos(rk.impact * 0.55)}
              r={r ? 5 : 0}
              fill={VITAL}
              opacity={0.85}
              style={{
                transition: 'r 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${800 + i * 80}ms`,
                filter: `drop-shadow(0 0 3px ${VITAL_GLOW})`,
              }}
            />
            <text
              x={xPos(rk.prob) + 10}
              y={yPos(rk.impact) + 3}
              fontSize="8"
              fill={BONE_DIM}
              fontFamily="ui-monospace, monospace"
              opacity={r ? 1 : 0}
              style={{ transition: 'opacity 0.4s', transitionDelay: `${1000 + i * 80}ms` }}
            >
              {rk.id} · {rk.label}
            </text>
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(50, 14)">
          <circle cx="4" cy="4" r="4" fill={CRITICAL} opacity="0.6" />
          <text x="14" y="7" fontSize="8" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.4">PRE-MITIGATION</text>
          <circle cx="124" cy="4" r="4" fill={VITAL} opacity="0.85" />
          <text x="134" y="7" fontSize="8" fill={VITAL} fontFamily="ui-monospace, monospace" letterSpacing="0.4">POST-MITIGATION</text>
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// 003 · BVLGARI · CORPO ARCHITETTURA
// ============================================================
function BvlgariDashboard() {
  return (
    <DashFrame
      title="Bvlgari · Corpo Architettura"
      subtitle="LVMH · March 2026 · Luxury Brand Launch · €25M investment"
      badges={['BRAND', 'CONFIDENTIAL', 'LVMH']}
      kpis={[
        { label: '5Y BASE REVENUE', value: '$1.17B', delta: 'Bear $785M / Bull $1.58B' },
        { label: 'ROI ON €25M', value: '19.5×', delta: 'Base case · 5Y' },
        { label: 'BLENDED GM', value: '72.3%', delta: '8 hero SKUs' },
      ]}
      externalUrl="https://bulgari-corpoarchitettura.netlify.app/"
      tabs={[
        { id: 'archetypes', label: 'ARCHETYPES', render: () => <BvlgariArchetypesPanel /> },
        { id: 'scenarios', label: '5Y SCENARIOS', render: () => <BvlgariScenariosPanel /> },
        { id: 'sku', label: 'SKU PYRAMID', render: () => <BvlgariSKUPanel /> },
        { id: 'moat', label: 'COMPETITIVE MOAT', render: () => <BvlgariMoatPanel /> },
      ]}
    />
  );
}

function BvlgariArchetypesPanel() {
  const r = useReveal(50);
  const archetypes = [
    { name: 'THE INHERITOR', share: 38, ltvCac: 42.9, aov: '$22K' },
    { name: 'THE SELF-PURCHASER', share: 28, ltvCac: 24.3, aov: '$9.5K' },
    { name: 'THE NEW MASCULINE', share: 18, ltvCac: 23.2, aov: '$11.2K' },
    { name: 'THE CULTURAL COLLECTOR', share: 12, ltvCac: 74.2, aov: '$145K' },
    { name: 'THE ASPIRATIONAL', share: 4, ltvCac: 23.3, aov: '$5.2K' },
  ];

  return (
    <div>
      <PanelHeader sub="2.4M Bvlgari CRM segmented into 5 archetypes — LTV:CAC range 23.2× to 74.2×.">
        SECTION 01 · CUSTOMER ARCHETYPE ARCHITECTURE
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="CRM SEGMENTED" value="2.4M" delta="global Bvlgari clients" />
        <Cell label="HIGHEST LTV:CAC" value="74.2×" delta="cultural collector" highlight />
        <Cell label="Y1 REV CONCENTRATION" value="50%" delta="from top 2 archetypes" />
      </div>

      <div className="space-y-2.5">
        {archetypes.map((a, i) => (
          <div key={a.name} className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-4 font-mono text-[10px] uppercase tracking-[0.14em] text-bone">
              {a.name}
            </div>
            <div className="col-span-5 relative h-6 bg-ink-950/40 border border-bone-fade/30">
              <div
                className="absolute inset-y-0 left-0"
                style={{
                  width: r ? `${(a.share / 40) * 100}%` : '0%',
                  background: VITAL,
                  opacity: 0.85,
                  transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${i * 80}ms`,
                  filter: `drop-shadow(0 0 3px ${VITAL_GLOW})`,
                }}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-bone-deep">
                {a.share}% Y1 REV
              </div>
            </div>
            <div className="col-span-2 font-mono text-[10px] tabular text-vital text-right">
              {a.ltvCac}×
            </div>
            <div className="col-span-1 font-mono text-[10px] tabular text-bone-dim text-right">
              {a.aov}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-12 gap-3 items-center pt-2 border-t border-bone-fade/30 mt-3">
          <div className="col-span-4 font-mono text-[8.5px] uppercase tracking-[0.18em] text-bone-deep">
            ARCHETYPE
          </div>
          <div className="col-span-5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-bone-deep">
            Y1 REVENUE SHARE
          </div>
          <div className="col-span-2 font-mono text-[8.5px] uppercase tracking-[0.18em] text-bone-deep text-right">
            LTV:CAC
          </div>
          <div className="col-span-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-bone-deep text-right">
            AOV
          </div>
        </div>
      </div>
    </div>
  );
}

function BvlgariScenariosPanel() {
  const r = useReveal(50);
  const scenarios = [
    { name: 'BEAR', revs: [50, 90, 155, 215, 275], cum: 785, roi: '13.7×', color: BONE_DIM },
    { name: 'BASE', revs: [75, 140, 230, 320, 405], cum: 1170, roi: '19.5×', color: VITAL, recommended: true },
    { name: 'BULL', revs: [100, 200, 320, 420, 540], cum: 1580, roi: '26.4×', color: BONE },
  ];
  const w = 540, h = 200;
  const max = 600;
  const xPos = (i: number) => 60 + i * 105;
  const yPos = (v: number) => h - 30 - (v / max) * (h - 60);

  return (
    <div>
      <PanelHeader sub="Annual revenue $M across Year 1–5 · all three scenarios deliver 13×+ on €25M.">
        SECTION 02 · 5-YEAR REVENUE TRAJECTORY · 3 SCENARIOS
      </PanelHeader>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Cell label="BEAR · 5Y CUM" value="$785M" delta="ROI 13.7×" />
        <Cell label="BASE · 5Y CUM" value="$1.17B" delta="ROI 19.5× · solid execution" highlight />
        <Cell label="BULL · 5Y CUM" value="$1.58B" delta="ROI 26.4× · all accelerators" />
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {[0, 150, 300, 450, 600].map((tick) => (
          <g key={tick}>
            <line x1={50} x2={w - 30} y1={yPos(tick)} y2={yPos(tick)} stroke={BONE_FADE} strokeWidth="0.4" />
            <text x={42} y={yPos(tick) + 3} fontSize="8" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              ${tick}M
            </text>
          </g>
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <text key={i} x={xPos(i)} y={h - 12} fontSize="9" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
            Y{i + 1}
          </text>
        ))}
        {scenarios.map((s, idx) => {
          const path = s.revs.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i)} ${yPos(v)}`).join(' ');
          return (
            <g key={s.name}>
              <path
                d={path}
                fill="none"
                stroke={s.color}
                strokeWidth={s.recommended ? 2.2 : 1.3}
                strokeDasharray={r ? '0' : '700'}
                strokeDashoffset={r ? 0 : 700}
                style={{
                  transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${idx * 200}ms`,
                  filter: s.recommended ? `drop-shadow(0 0 4px ${VITAL_GLOW})` : 'none',
                }}
              />
              {s.revs.map((v, i) => (
                <circle key={i} cx={xPos(i)} cy={yPos(v)} r={r ? (s.recommended ? 3.5 : 2.5) : 0} fill={s.color}
                  style={{ transition: 'r 0.4s', transitionDelay: `${1200 + idx * 100 + i * 50}ms` }} />
              ))}
              <text x={xPos(4) + 8} y={yPos(s.revs[4]) + 3} fontSize="9" fill={s.color} fontFamily="ui-monospace, monospace" fontWeight={s.recommended ? '600' : '400'} opacity={r ? 1 : 0}
                style={{ transition: 'opacity 0.4s', transitionDelay: `${1600 + idx * 100}ms` }}>
                {s.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function BvlgariSKUPanel() {
  const r = useReveal(50);
  // Pyramid: 4 tiers, bottom widest. Show units (volume) on left and price on right.
  const tiers = [
    { name: 'HIGH JEWELRY', range: '$100K+', units: 8, gm: 78 },
    { name: 'FINE', range: '$20K–80K', units: 150, gm: 75 },
    { name: 'BRIDGE', range: '$8K–18K', units: 600, gm: 72 },
    { name: 'DIFFUSION', range: '$3K–8K', units: 1500, gm: 66 },
  ];
  const w = 540, h = 250;

  return (
    <div>
      <PanelHeader sub="Inverse volume/margin pyramid · Peretti precedent (52× price multiplier).">
        SECTION 03 · 4-TIER PRICE PYRAMID · 8 HERO SKUS
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="SKUS · YEAR 1" value="8" delta="anatomical hero pieces" />
        <Cell label="PRICE RANGE" value="50×" delta="$3K → $145K AOV span" highlight />
        <Cell label="HJ UNITS · GLOBAL" value="8" delta="scarcity by SKU" />
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {tiers.map((t, i) => {
          const tierH = 50;
          const y = 10 + i * (tierH + 6);
          const widthPct = 0.35 + i * 0.18;
          const tierW = widthPct * (w - 80);
          const x = (w - tierW) / 2;
          return (
            <g key={t.name}>
              <rect
                x={x}
                y={y}
                width={r ? tierW : 0}
                height={tierH}
                fill={i === 0 ? VITAL : BONE_DIM}
                opacity={i === 0 ? 0.85 : 0.5 - i * 0.05}
                style={{
                  transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${i * 100}ms`,
                  filter: i === 0 ? `drop-shadow(0 0 4px ${VITAL_GLOW})` : 'none',
                }}
              />
              <rect x={x} y={y} width={r ? tierW : 0} height={tierH} fill="none" stroke={i === 0 ? VITAL : BONE_DIM} strokeWidth="0.6"
                style={{ transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: `${i * 100}ms` }} />
              <text x={w / 2} y={y + 18} fontSize="10" fill={i === 0 ? VITAL : BONE} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.6" fontWeight="600"
                opacity={r ? 1 : 0} style={{ transition: 'opacity 0.4s', transitionDelay: `${500 + i * 100}ms` }}>
                {t.name}
              </text>
              <text x={w / 2} y={y + 32} fontSize="9" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.4"
                opacity={r ? 1 : 0} style={{ transition: 'opacity 0.4s', transitionDelay: `${600 + i * 100}ms` }}>
                {t.range} · GM {t.gm}%
              </text>
              <text x={w / 2} y={y + 44} fontSize="8" fill={BONE_DEEP} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.4"
                opacity={r ? 1 : 0} style={{ transition: 'opacity 0.4s', transitionDelay: `${700 + i * 100}ms` }}>
                {t.units} units / year
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function BvlgariMoatPanel() {
  const r = useReveal(50);
  return (
    <div>
      <PanelHeader sub="4 structural defenses against Cartier / Van Cleef / Tiffany competitive entry.">
        SECTION 04 · COMPETITIVE MOAT ARCHITECTURE
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="CARTIER THREAT · M6" value="70%" delta="competitive response peak" />
        <Cell label="MOAT STRENGTH · M6" value="80%" delta="patents + exclusivity" highlight />
        <Cell label="PATENT JURISDICTIONS" value="3" delta="EU + US + CN · 85% of market" />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {[
          { roman: 'I', label: 'ENGINEERING', desc: 'Tubogas + Viper Link mastery. 75 + 15 years of refinement. Competitor lead time: 18–24 months.' },
          { roman: 'II', label: 'IP / PATENTS', desc: 'Anatomical hinge-angle patent (8–28°). Filed EU + US + CN. Defendable 20-year term.' },
          { roman: 'III', label: 'HERITAGE', desc: 'Roman architectural origin (1884) is unreplicable. Cartier is Parisian, Van Cleef nature-inspired.' },
          { roman: 'IV', label: 'EXPERIENCE', desc: 'Corpo Studio: €120–180K retrofit + €800K scanner software + 12-week training. 18-month replication horizon.' },
        ].map((m, i) => (
          <div
            key={m.roman}
            className="border border-bone-fade/40 px-4 py-3.5 bg-ink-950/30 animate-fade-up"
            style={{
              animationDelay: `${100 + i * 80}ms`,
              animationFillMode: 'both',
              opacity: 0,
            }}
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display text-[1.4rem] text-vital tabular leading-none">{m.roman}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone">{m.label}</span>
            </div>
            <p className="font-mono text-[10.5px] text-bone-dim leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 004 · KNR — Operations grid
// ============================================================
function KnrDashboard() {
  return (
    <DashFrame
      title="KNR Traders · Operational Grid Redesign"
      subtitle="India · 2023–2024 · 70+ events · 18-month operating period"
      badges={['OPERATIONS', 'CLOSED', 'OWNERSHIP']}
      kpis={[
        { label: 'BUSINESS GROWTH', value: '11×', delta: '18-month operating period' },
        { label: 'EVENT SUCCESS', value: '92%', delta: '70+ activations' },
        { label: 'COST SAVINGS', value: '25%', delta: 'vendor renegotiation' },
      ]}
      tabs={[
        { id: 'gauge', label: 'CLIENT RETENTION', render: () => <KnrGaugePanel /> },
        { id: 'grid', label: '8-ZONE GRID', render: () => <KnrGridPanel /> },
        { id: 'growth', label: 'GROWTH CURVE', render: () => <KnrGrowthPanel /> },
        { id: 'kpis', label: 'KPI TRACK', render: () => <KnrKpiPanel /> },
      ]}
    />
  );
}

function KnrGaugePanel() {
  const r = useReveal(50);
  const cx = 270, cy = 170, radius = 110;
  const angleAt = (pct: number) => Math.PI - (pct / 100) * Math.PI;
  const pointAt = (pct: number, rad = radius) => {
    const a = angleAt(pct);
    return { x: cx + Math.cos(a) * rad, y: cy - Math.sin(a) * rad };
  };
  const arcPath = (start: number, end: number, rad: number) => {
    const s = pointAt(start, rad);
    const e = pointAt(end, rad);
    const large = Math.abs(end - start) > 50 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${rad} ${rad} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  return (
    <div>
      <PanelHeader sub="Repeat-client share lifted from 22% to 68% over 18 months — +46pp absolute.">
        SECTION 01 · REPEAT-CLIENT GAUGE
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="BEFORE" value="22%" delta="repeat clients · baseline" />
        <Cell label="AFTER" value="68%" delta="post 8-zone rotation" highlight />
        <Cell label="ABSOLUTE LIFT" value="+46pp" delta="12-month inflection" />
      </div>

      <svg viewBox="0 0 540 200" className="w-full">
        <path d={arcPath(0, 100, radius)} fill="none" stroke={BONE_DEEP} strokeWidth="8" strokeLinecap="round" />
        <path
          d={arcPath(0, r ? 68 : 0, radius)}
          fill="none"
          stroke={VITAL}
          strokeWidth="8"
          strokeLinecap="round"
          style={{ transition: 'd 1.4s cubic-bezier(0.22, 1, 0.36, 1)', filter: `drop-shadow(0 0 6px ${VITAL_GLOW})` }}
        />
        {/* Tick marks */}
        {Array.from({ length: 11 }, (_, i) => {
          const inner = pointAt(i * 10, radius - 14);
          const outer = pointAt(i * 10, radius - 4);
          return (
            <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke={i % 5 === 0 ? BONE_DIM : BONE_DEEP} strokeWidth={i % 5 === 0 ? 1 : 0.5} />
          );
        })}
        {/* Before marker */}
        {(() => {
          const inner = pointAt(22, radius - 22);
          const outer = pointAt(22, radius + 8);
          const lbl = pointAt(22, radius + 18);
          return (
            <g opacity={r ? 0.7 : 0} style={{ transition: 'opacity 0.6s', transitionDelay: '300ms' }}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={BONE_DIM} strokeWidth="1.4" strokeDasharray="3 2" />
              <text x={lbl.x} y={lbl.y} fontSize="9" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">BEFORE 22%</text>
            </g>
          );
        })()}
        {/* After marker */}
        {(() => {
          const inner = pointAt(68, radius - 22);
          const outer = pointAt(68, radius + 8);
          const lbl = pointAt(68, radius + 18);
          return (
            <g opacity={r ? 1 : 0} style={{ transition: 'opacity 0.6s', transitionDelay: '1500ms' }}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={VITAL} strokeWidth="2" />
              <text x={lbl.x} y={lbl.y} fontSize="10" fill={VITAL} textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="600">AFTER 68%</text>
            </g>
          );
        })()}
        <text x={cx} y={cy + 5} fontSize="32" fill={VITAL} textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic"
          opacity={r ? 1 : 0} style={{ transition: 'opacity 0.6s', transitionDelay: '1700ms' }}>+46pp</text>
        <text x={cx} y={cy + 22} fontSize="9" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.2"
          opacity={r ? 1 : 0} style={{ transition: 'opacity 0.6s', transitionDelay: '1850ms' }}>ABSOLUTE LIFT · 18 MO</text>
      </svg>
    </div>
  );
}

function KnrGridPanel() {
  const zones = [
    'LOGISTICS', 'TALENT', 'AV TECH', 'F&B',
    'HOSPITALITY', 'BRAND', 'COMMS', 'CONTINGENCY',
  ];
  return (
    <div>
      <PanelHeader sub="8 functional zones · primary owner + hot-handoff protocol · single source-of-truth brief.">
        SECTION 02 · 8-ZONE ACTIVATION GRID
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="ZONES" value="8" delta="rotational ownership" />
        <Cell label="EVENTS / YEAR" value="70+" delta="concurrent execution" />
        <Cell label="EFFICIENCY GAIN" value="+50%" delta="retail operations" highlight />
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {zones.map((z, i) => (
          <div
            key={z}
            className="border border-bone-fade/40 px-3 py-3.5 bg-ink-950/30 text-center animate-fade-up"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both', opacity: 0 }}
          >
            <div className="font-display text-[1.5rem] leading-none text-vital tabular tracking-tight mb-2">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-dim">{z}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-bone-deep">
        <div>· PRIMARY OWNER PER ZONE</div>
        <div>· HOT-HANDOFF PROTOCOL</div>
        <div>· CLIENT BRIEF TRAVELS WITH PROJECT</div>
      </div>
    </div>
  );
}

function KnrGrowthPanel() {
  const r = useReveal(50);
  const months = [0, 3, 6, 9, 12, 15, 18];
  const growth = [1, 1.6, 2.8, 4.5, 7.2, 9.5, 11];
  const w = 540, h = 200;
  const xPos = (m: number) => 60 + (m / 18) * (w - 90);
  const yPos = (v: number) => h - 30 - (v / 12) * (h - 60);
  const path = months.map((m, i) => `${i === 0 ? 'M' : 'L'} ${xPos(m)} ${yPos(growth[i])}`).join(' ');
  // Area
  const area = `M ${xPos(0)} ${yPos(growth[0])} ${months.slice(1).map((m, i) => `L ${xPos(m)} ${yPos(growth[i + 1])}`).join(' ')} L ${xPos(18)} ${yPos(0)} L ${xPos(0)} ${yPos(0)} Z`;

  return (
    <div>
      <PanelHeader sub="Compounding business growth — 11× over 18-month operating window.">
        SECTION 03 · BUSINESS GROWTH MULTIPLIER
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="BASELINE M0" value="1×" delta="entry baseline" />
        <Cell label="OUTCOME M18" value="11×" delta="11× growth" highlight />
        <Cell label="REPEAT GROWTH" value="+30%" delta="repeat-client growth" />
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {[0, 3, 6, 9, 12].map((tick) => (
          <g key={tick}>
            <line x1={50} x2={w - 30} y1={yPos(tick)} y2={yPos(tick)} stroke={BONE_FADE} strokeWidth="0.4" />
            <text x={42} y={yPos(tick) + 3} fontSize="8" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              {tick}×
            </text>
          </g>
        ))}
        {months.map((m) => (
          <text key={m} x={xPos(m)} y={h - 12} fontSize="9" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">
            M{m}
          </text>
        ))}
        <path d={area} fill={VITAL_GLOW} opacity={r ? 1 : 0}
          style={{ transition: 'opacity 1.5s', transitionDelay: '600ms' }} />
        <path d={path} fill="none" stroke={VITAL} strokeWidth="2.2"
          strokeDasharray={r ? '0' : '700'} strokeDashoffset={r ? 0 : 700}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)', filter: `drop-shadow(0 0 4px ${VITAL_GLOW})` }} />
        {months.map((m, i) => (
          <circle key={m} cx={xPos(m)} cy={yPos(growth[i])} r={r ? 3 : 0} fill={VITAL}
            style={{ transition: 'r 0.4s', transitionDelay: `${1200 + i * 80}ms` }} />
        ))}
        <text x={xPos(18) - 5} y={yPos(11) - 8} fontSize="11" fill={VITAL} fontFamily="ui-monospace, monospace" fontWeight="600" textAnchor="end"
          opacity={r ? 1 : 0} style={{ transition: 'opacity 0.4s', transitionDelay: '1900ms' }}>11×</text>
      </svg>
    </div>
  );
}

function KnrKpiPanel() {
  const kpis = [
    { label: 'EVENT SUCCESS', val: '92%', target: '85%' },
    { label: 'REPEAT CLIENTS', val: '+30%', target: '+15%' },
    { label: 'NEW CLIENTS', val: '+40%', target: '+20%' },
    { label: 'COST SAVINGS', val: '25%', target: '15%' },
    { label: 'CLIENT EXP SCORE', val: '+45%', target: '+25%' },
    { label: 'BILLING AUTOMATED', val: '100%', target: '100%' },
  ];
  return (
    <div>
      <PanelHeader sub="6-pillar KPI pack — every metric exceeded internal target.">
        SECTION 04 · KPI PACK · ACTUAL vs TARGET
      </PanelHeader>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className="border border-bone-fade/40 px-4 py-4 bg-ink-950/30 animate-fade-up"
            style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both', opacity: 0 }}
          >
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep mb-2">{k.label}</div>
            <div className="flex items-baseline gap-3">
              <div className="font-display text-[1.7rem] leading-none text-vital tabular tracking-[-0.02em]">{k.val}</div>
              <div className="font-mono text-[9px] uppercase text-bone-dim tabular">vs {k.target}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 005 · COMTESSE — Trade marketing
// ============================================================
function ComtesseDashboard() {
  return (
    <DashFrame
      title="Comtesse du Barry · 360 Trade Marketing"
      subtitle="ESSEC · 2026 · 117-yr maison · Maïsadour-owned · €16.2M revenue base"
      badges={['BRAND', 'TRADE', 'ESSEC']}
      kpis={[
        { label: 'Y3 REVENUE TARGET', value: '€23M', delta: 'from €16.2M · +42%' },
        { label: 'Y3 EBITDA', value: '€3M', delta: 'from negative today' },
        { label: 'CAPEX ROI · M24', value: '4×', delta: '€1.63M deployed' },
      ]}
      externalUrl="https://comtesse-du-barry-stratergy.netlify.app/"
      tabs={[
        { id: 'seasonality', label: 'SEASONALITY', render: () => <ComtesseSeasonalityPanel /> },
        { id: 'sku', label: 'SKU RATIONAL', render: () => <ComtesseSkuPanel /> },
        { id: 'roadmap', label: '24-MO ROADMAP', render: () => <ComtesseRoadmapPanel /> },
        { id: 'kpi', label: 'KPI RADAR', render: () => <ComtesseKpiPanel /> },
      ]}
    />
  );
}

function ComtesseSeasonalityPanel() {
  const r = useReveal(50);
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  // Today: 45% in December, ~5% other months on average
  const today = [3, 3, 4, 5, 4, 4, 3, 3, 4, 5, 8, 45];
  // Year 3 target: 30% in December, smoothed elsewhere
  const target = [5, 7, 6, 7, 6, 7, 5, 5, 6, 7, 9, 30];

  const w = 540, h = 200;
  const max = 50;
  const barW = 36;
  const gap = 6;
  const groupW = barW * 2 + gap;
  const startX = 60;

  return (
    <div>
      <PanelHeader sub="Christmas dependency reduced 45% → 30% by Year 2 · 11 month-occasion anchors built.">
        SECTION 01 · MONTHLY REVENUE DISTRIBUTION · TODAY vs Y3
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="DEC TODAY" value="45%" delta="of annual revenue" />
        <Cell label="DEC TARGET Y2" value="30%" delta="−15pp dependency" highlight />
        <Cell label="OFF-PEAK GROWTH" value="+30%" delta="non-Dec months" />
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {[0, 10, 20, 30, 40, 50].map((tick) => (
          <g key={tick}>
            <line x1={50} x2={w - 20} y1={170 - (tick / max) * 140} y2={170 - (tick / max) * 140} stroke={BONE_FADE} strokeWidth="0.4" />
            <text x={42} y={173 - (tick / max) * 140} fontSize="7.5" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              {tick}%
            </text>
          </g>
        ))}
        {months.map((m, i) => {
          const xBase = startX + i * (groupW + 0.5);
          const todayH = (today[i] / max) * 140;
          const targetH = (target[i] / max) * 140;
          return (
            <g key={i}>
              <rect x={xBase} y={r ? 170 - todayH : 170} width={barW / 2} height={r ? todayH : 0}
                fill={BONE_DIM} opacity={0.6}
                style={{ transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: `${i * 30}ms` }} />
              <rect x={xBase + barW / 2 + 1} y={r ? 170 - targetH : 170} width={barW / 2} height={r ? targetH : 0}
                fill={VITAL} opacity={0.85}
                style={{ transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: `${250 + i * 30}ms`, filter: `drop-shadow(0 0 2px ${VITAL_GLOW})` }} />
              <text x={xBase + barW / 2} y={185} fontSize="8.5" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">{m}</text>
            </g>
          );
        })}
        <g transform="translate(50, 14)">
          <rect width="8" height="8" fill={BONE_DIM} opacity="0.6" />
          <text x="13" y="7" fontSize="8" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.4">TODAY</text>
          <rect x="80" width="8" height="8" fill={VITAL} />
          <text x="93" y="7" fontSize="8" fill={VITAL} fontFamily="ui-monospace, monospace" letterSpacing="0.4">YEAR 3 TARGET</text>
        </g>
      </svg>
    </div>
  );
}

function ComtesseSkuPanel() {
  const r = useReveal(50);
  return (
    <div>
      <PanelHeader sub="450 → 250 SKUs · €1.2M operational complexity recovered.">
        SECTION 02 · PORTFOLIO RATIONALISATION
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="SKUS TODAY" value="450" delta="bloated portfolio" />
        <Cell label="SKUS TARGET" value="250" delta="−44% rationalised" highlight />
        <Cell label="COMPLEXITY SAVED" value="€1.2M" delta="ops overhead" />
      </div>

      <div className="grid grid-cols-12 gap-2 items-end h-[180px] border-b border-bone-fade/30 pb-2">
        <div className="col-span-5 flex flex-col items-center justify-end h-full">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-deep mb-1">TODAY</div>
          <div
            className="w-full bg-bone-deep border border-bone-fade/40 flex items-end justify-center"
            style={{
              height: r ? '100%' : '0%',
              transition: 'height 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="font-display text-[2.4rem] tabular text-bone leading-tight pb-3">450</div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center h-full">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-vital">−200</div>
          <div className="font-display text-[1.5rem] text-vital">→</div>
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-dim">SKUS</div>
        </div>
        <div className="col-span-5 flex flex-col items-center justify-end h-full">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-vital mb-1">TARGET Y1</div>
          <div
            className="w-full border-2 flex items-end justify-center"
            style={{
              height: r ? '55.5%' : '0%',
              background: 'rgba(124, 255, 183, 0.06)',
              borderColor: VITAL,
              transition: 'height 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: '300ms',
              filter: `drop-shadow(0 0 4px ${VITAL_GLOW})`,
            }}
          >
            <div className="font-display text-[2.4rem] tabular text-vital leading-tight pb-3">250</div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone-deep">
        <div>· STRENGTHEN · FOIE GRAS + PÂTÉS</div>
        <div>· DEVELOP · PREPARED MEALS · GIFTS</div>
        <div>· RATIONALISE · SWEET · WINES</div>
      </div>
    </div>
  );
}

function ComtesseRoadmapPanel() {
  const phases = [
    { idx: '01', label: 'FOUNDATION', months: 'M0–6', capex: '€350K' },
    { idx: '02', label: 'LAUNCH', months: 'M6–12', capex: '€680K' },
    { idx: '03', label: 'SCALE', months: 'M12–18', capex: '€420K' },
    { idx: '04', label: 'OPTIMISE', months: 'M18–24', capex: '€180K' },
  ];
  return (
    <div>
      <PanelHeader sub="4-phase 24-month roadmap with embedded go/no-go KPI gates · €1.63M total CapEx.">
        SECTION 03 · IMPLEMENTATION ROADMAP
      </PanelHeader>

      <div className="grid grid-cols-12 gap-3 mb-6">
        <Cell label="TOTAL CAPEX" value="€1.63M" delta="phased deployment" />
        <Cell label="DURATION" value="24mo" delta="4 phases · 4 gates" />
        <Cell label="ROI · M24" value="4×" delta="incremental revenue" highlight />
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {phases.map((p, i) => (
          <div
            key={p.idx}
            className="relative border border-bone-fade/40 px-4 py-4 bg-ink-950/30 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both', opacity: 0 }}
          >
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-display text-[1.6rem] tabular text-vital leading-none">{p.idx}</span>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-bone-deep">{p.months}</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone mb-2">{p.label}</div>
            <div className="font-mono text-[9.5px] tabular text-bone-dim">CAPEX {p.capex}</div>
            {/* Connector */}
            {i < phases.length - 1 && (
              <div className="absolute top-1/2 -right-1.5 w-2.5 h-px bg-vital/40 hidden md:block" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 border-t border-bone-fade/30 pt-4">
        <div className="grid grid-cols-12 gap-3 font-mono text-[10px] text-bone-dim">
          <div className="col-span-3 text-bone uppercase tracking-[0.18em] text-[9.5px]">M0–6 · FOUNDATION</div>
          <div className="col-span-9">SKU audit · visual identity refresh · retail staff training · CRM segmentation</div>
        </div>
        <div className="grid grid-cols-12 gap-3 font-mono text-[10px] text-bone-dim">
          <div className="col-span-3 text-bone uppercase tracking-[0.18em] text-[9.5px]">M6–12 · LAUNCH</div>
          <div className="col-span-9">3 moment ranges live · 15 influencers · DTC rebuild · subscription go-live</div>
        </div>
        <div className="grid grid-cols-12 gap-3 font-mono text-[10px] text-bone-dim">
          <div className="col-span-3 text-bone uppercase tracking-[0.18em] text-[9.5px]">M12–18 · SCALE</div>
          <div className="col-span-9">Seasonal collections · B2B corporate gifting · Valentine&apos;s + Mother&apos;s Day</div>
        </div>
        <div className="grid grid-cols-12 gap-3 font-mono text-[10px] text-bone-dim">
          <div className="col-span-3 text-bone uppercase tracking-[0.18em] text-[9.5px]">M18–24 · OPTIMISE</div>
          <div className="col-span-9">Hero SKU analytics · partnership expansion · subscription scale</div>
        </div>
      </div>
    </div>
  );
}

function ComtesseKpiPanel() {
  const r = useReveal(50);
  const kpis = [
    { axis: 'BRAND DESIRABILITY', baseline: 18, target: 43 }, // 25-40 cohort
    { axis: 'SKU PRODUCTIVITY', baseline: 36, target: 43 },   // €/active SKU thousands
    { axis: 'DEC DEPENDENCY', baseline: 45, target: 30 },
    { axis: 'DTC SHARE', baseline: 12, target: 25 },
    { axis: 'BASKET SIZE', baseline: 34, target: 39 },        // EUR
    { axis: 'EBITDA · €M', baseline: 0, target: 3 },
  ];
  // Normalize each axis to 0-100 for radar
  const norm = (v: number, max: number) => (v / max) * 100;
  const maxes = [50, 50, 50, 30, 50, 5];
  const cx = 270, cy = 175, rad = 130;
  const angleAt = (i: number) => -Math.PI / 2 + (i / kpis.length) * Math.PI * 2;
  const point = (i: number, val: number) => {
    const v = norm(val, maxes[i]);
    const a = angleAt(i);
    const r = (v / 100) * rad;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  };

  const baselinePath = kpis.map((k, i) => {
    const p = point(i, k.baseline);
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }).join(' ') + ' Z';

  const targetPath = kpis.map((k, i) => {
    const p = point(i, k.target);
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }).join(' ') + ' Z';

  return (
    <div>
      <PanelHeader sub="6-axis KPI radar · baseline (today) vs Year 3 target.">
        SECTION 04 · KPI RADAR · BASELINE vs Y3
      </PanelHeader>

      <svg viewBox="0 0 540 320" className="w-full">
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map((r2) => (
          <circle key={r2} cx={cx} cy={cy} r={rad * r2} fill="none" stroke={BONE_FADE} strokeWidth="0.4" />
        ))}
        {/* Axes */}
        {kpis.map((k, i) => {
          const a = angleAt(i);
          return (
            <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * rad} y2={cy + Math.sin(a) * rad}
              stroke={BONE_FADE} strokeWidth="0.4" />
          );
        })}
        {/* Axis labels */}
        {kpis.map((k, i) => {
          const a = angleAt(i);
          const lblR = rad + 22;
          const x = cx + Math.cos(a) * lblR;
          const y = cy + Math.sin(a) * lblR;
          return (
            <text key={i} x={x} y={y + 3} fontSize="8" fill={BONE_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
              {k.axis}
            </text>
          );
        })}
        {/* Baseline polygon */}
        <path d={baselinePath} fill={BONE_DIM} fillOpacity={0.15} stroke={BONE_DIM} strokeWidth="1"
          opacity={r ? 1 : 0} style={{ transition: 'opacity 1s', transitionDelay: '200ms' }} />
        {/* Target polygon */}
        <path d={targetPath} fill={VITAL} fillOpacity={0.18} stroke={VITAL} strokeWidth="1.6"
          opacity={r ? 1 : 0}
          style={{ transition: 'opacity 1s', transitionDelay: '700ms', filter: `drop-shadow(0 0 4px ${VITAL_GLOW})` }} />
        {/* Target points */}
        {kpis.map((k, i) => {
          const p = point(i, k.target);
          return (
            <circle key={i} cx={p.x} cy={p.y} r={r ? 3 : 0} fill={VITAL}
              style={{ transition: 'r 0.3s', transitionDelay: `${1100 + i * 60}ms` }} />
          );
        })}
        {/* Legend */}
        <g transform="translate(40, 14)">
          <rect width="10" height="10" fill={BONE_DIM} fillOpacity={0.4} stroke={BONE_DIM} />
          <text x="16" y="9" fontSize="8" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.4">BASELINE TODAY</text>
          <rect x="120" width="10" height="10" fill={VITAL} fillOpacity={0.4} stroke={VITAL} />
          <text x="136" y="9" fontSize="8" fill={VITAL} fontFamily="ui-monospace, monospace" letterSpacing="0.4">Y3 TARGET</text>
        </g>
      </svg>
    </div>
  );
}
