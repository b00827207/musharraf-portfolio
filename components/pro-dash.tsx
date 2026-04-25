'use client';

import { useState, ReactNode } from 'react';
import { useInView } from './use-in-view';
import { Counter } from './counter';

const TERRA = '#B8543B';
const TERRA_DEEP = '#8E3F2C';
const INK = '#1A1815';
const INK_DIM = '#5A554C';
const INK_FADE = '#B8B0A0';
const PAPER_EDGE = '#E5DFCE';
const MOSS = '#5C7544';
const MOSS_DEEP = '#3F5230';
const GOLD = '#A8842F';

// ============================================================
// PROFESSIONAL DASHBOARD — one component per industry case.
// Editorial. Interactive. ~520px tall, properly sized.
// ============================================================
export function ProDash({ slug }: { slug: string }) {
  switch (slug) {
    case 'crio-revenue-engine':
      return <CrioProDash />;
    case 'knr-operational-grid':
      return <KnrProDash />;
    default:
      return null;
  }
}

// ============================================================
// SHARED FRAME — multi-tab dashboard with header, KPI strip, tabs, panel
// ============================================================
function ProFrame({
  eyebrow,
  title,
  subtitle,
  kpis,
  tabs,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  kpis: { label: string; value: string; delta?: string }[];
  tabs: { id: string; label: string; render: () => ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className="bg-paper-card border border-paper-edge rounded-sm overflow-hidden shadow-[0_2px_30px_-12px_rgba(60,50,30,0.22)]">
      {/* HEADER */}
      <header className="px-6 md:px-8 pt-6 pb-5 border-b border-paper-edge/70">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="dot" style={{ background: MOSS }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-deep">
            {eyebrow}
          </span>
        </div>
        <h3 className="font-display text-[1.4rem] md:text-[1.6rem] text-ink leading-tight tracking-[-0.015em]">
          {title}
        </h3>
        <p className="font-sans text-tiny text-ink-dim mt-1">{subtitle}</p>
      </header>

      {/* KPI STRIP */}
      <div className="grid grid-cols-3 border-b border-paper-edge/70 bg-paper-warm/30">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className={`px-5 md:px-7 py-4 ${
              i < kpis.length - 1 ? 'border-r border-paper-edge/70' : ''
            }`}
          >
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-deep mb-1.5">
              {k.label}
            </div>
            <div className="font-display text-[1.4rem] md:text-[1.7rem] text-terra leading-none tabular tracking-[-0.02em]">
              <Counter value={k.value} duration={1400} />
            </div>
            {k.delta && (
              <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-dim mt-1.5">
                {k.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* TABS */}
      <nav
        className="flex flex-wrap items-stretch border-b border-paper-edge/70 bg-paper/60"
        aria-label="Dashboard sections"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            aria-pressed={active === t.id}
            className={`relative px-4 md:px-5 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors ${
              active === t.id
                ? 'text-ink'
                : 'text-ink-dim hover:text-ink'
            }`}
          >
            {t.label}
            {active === t.id && (
              <span
                aria-hidden
                className="absolute left-3 right-3 -bottom-px h-0.5 bg-terra"
              />
            )}
          </button>
        ))}
      </nav>

      {/* PANEL BODY */}
      <div className="px-6 md:px-8 py-7 md:py-8 min-h-[300px]">
        <div key={active} className="animate-fade-in">
          {activeTab.render()}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION HEADER inside a tab
// ============================================================
function SectionHead({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-terra tabular mb-2">
        {num}
      </div>
      <h4 className="font-display text-[1.2rem] md:text-[1.35rem] text-ink leading-tight tracking-[-0.01em]">
        {title}
      </h4>
      {sub && <p className="font-sans text-[12.5px] text-ink-dim mt-1.5">{sub}</p>}
    </div>
  );
}

// === Reusable cell
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
      className={`border ${highlight ? 'border-terra bg-terra/5' : 'border-paper-edge'} px-4 py-3.5`}
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-deep mb-1">
        {label}
      </div>
      <div className={`font-display text-[1.3rem] leading-none tabular tracking-[-0.015em] ${
        highlight ? 'text-terra' : 'text-ink'
      }`}>
        {value}
      </div>
      {delta && (
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-dim mt-1.5">
          {delta}
        </div>
      )}
    </div>
  );
}

// ============================================================
// CRIO · 4-PANEL PROFESSIONAL DASHBOARD
// ============================================================
function CrioProDash() {
  return (
    <ProFrame
      eyebrow="LIVE INTELLIGENCE · CRIO.DO"
      title="A pipeline that wasn't bleeding leads — it was bleeding signal."
      subtitle="EdTech · Series A · 124+ active accounts · 6 months · Karnataka, India"
      kpis={[
        { label: 'CONVERSION', value: '+12pp', delta: 'team avg → 28.6%' },
        { label: 'REVENUE', value: '₹4.2M', delta: '20.3% of regional topline' },
        { label: 'CYCLE TIME', value: '−2.4d', delta: 'from 11.6d to 9.2d' },
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
  const { ref, inView } = useInView<HTMLDivElement>();
  const stages = [
    { label: 'LEADS', before: 100, after: 100 },
    { label: 'CONTACT', before: 72, after: 88 },
    { label: 'QUALIFIED', before: 41, after: 58 },
    { label: 'DEMO', before: 22, after: 36 },
    { label: 'OFFER', before: 11, after: 22 },
    { label: 'CLOSED', before: 4.6, after: 11.4 },
  ];
  return (
    <div ref={ref}>
      <SectionHead
        num="01"
        title="Funnel rebuilt across 124 accounts."
        sub="Revised pitch sequencing + scoring on intent signals. Qualified-to-Closed yield: +148%."
      />

      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <Cell label="ACCOUNTS WORKED" value="124+" delta="active commercial pipeline" />
        <Cell label="EFFICIENCY GAIN" value="20.7%" delta="cycle inefficiency recovered" highlight />
        <Cell label="SLA COMPLIANCE" value="100%" delta="3-month interim window" />
      </div>

      <svg viewBox="0 0 700 220" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line
              x1={50}
              x2={680}
              y1={190 - (tick / 100) * 160}
              y2={190 - (tick / 100) * 160}
              stroke={INK_FADE}
              strokeWidth="0.5"
              opacity="0.4"
              strokeDasharray={tick === 0 ? '0' : '2 4'}
            />
            <text
              x={42}
              y={193 - (tick / 100) * 160}
              fontSize="9"
              fill={INK_DIM}
              textAnchor="end"
              fontFamily="ui-monospace, monospace"
            >
              {tick}%
            </text>
          </g>
        ))}

        {stages.map((s, i) => {
          const groupW = 100;
          const x = 70 + i * groupW;
          const beforeH = (s.before / 100) * 160;
          const afterH = (s.after / 100) * 160;
          return (
            <g key={s.label}>
              <rect
                x={x}
                y={inView ? 190 - beforeH : 190}
                width={32}
                height={inView ? beforeH : 0}
                fill={INK}
                opacity={0.18}
                style={{
                  transition: 'all 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${100 + i * 70}ms`,
                }}
              />
              <rect
                x={x + 36}
                y={inView ? 190 - afterH : 190}
                width={32}
                height={inView ? afterH : 0}
                fill={TERRA}
                style={{
                  transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${300 + i * 70}ms`,
                }}
              />
              <text
                x={x + 34}
                y={206}
                fontSize="9"
                fill={INK_DIM}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.5"
              >
                {s.label}
              </text>
              <text
                x={x + 16}
                y={inView ? 185 - beforeH : 185}
                fontSize="9"
                fill={INK_DIM}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: 'opacity 0.5s',
                  transitionDelay: `${800 + i * 70}ms`,
                }}
              >
                {s.before}
              </text>
              <text
                x={x + 52}
                y={inView ? 185 - afterH : 185}
                fontSize="10"
                fill={TERRA_DEEP}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: 'opacity 0.5s',
                  transitionDelay: `${1000 + i * 70}ms`,
                }}
              >
                {s.after}
              </text>
            </g>
          );
        })}

        <g transform="translate(50, 14)">
          <rect width="9" height="9" fill={INK} opacity="0.18" />
          <text x="14" y="8" fontSize="9" fill={INK_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
            BEFORE
          </text>
          <rect x="100" width="9" height="9" fill={TERRA} />
          <text x="114" y="8" fontSize="9" fill={TERRA} fontFamily="ui-monospace, monospace" letterSpacing="0.5" fontWeight="600">
            AFTER · 6 MONTHS
          </text>
        </g>
      </svg>
    </div>
  );
}

function CrioCyclePanel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const points = [
    { day: 0, before: 11.6, after: 11.6 },
    { day: 30, before: 11.4, after: 10.6 },
    { day: 60, before: 11.6, after: 10.0 },
    { day: 90, before: 11.5, after: 9.6 },
    { day: 120, before: 11.7, after: 9.4 },
    { day: 150, before: 11.5, after: 9.3 },
    { day: 180, before: 11.6, after: 9.2 },
  ];
  const w = 700, h = 200;
  const padL = 50, padR = 30, padT = 30, padB = 30;
  const xPos = (d: number) => padL + (d / 180) * (w - padL - padR);
  const yPos = (v: number) => h - padB - ((v - 8) / 4) * (h - padT - padB);
  const buildPath = (key: 'before' | 'after') =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xPos(p.day)} ${yPos(p[key])}`).join(' ');

  return (
    <div ref={ref}>
      <SectionHead
        num="02"
        title="Sales cycle compressed by 2.4 days."
        sub="35.4% pitch-to-conversion improvement. 20.7% cycle inefficiency recovered through KPI instrumentation."
      />

      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <Cell label="BASELINE" value="11.6d" delta="pre-intervention avg" />
        <Cell label="OUTCOME" value="9.2d" delta="−20.7% cycle time" highlight />
        <Cell label="P2C IMPROVEMENT" value="+35.4%" delta="pitch-to-conversion" />
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {[8, 9, 10, 11, 12].map((tick) => (
          <g key={tick}>
            <line x1={padL} x2={w - padR} y1={yPos(tick)} y2={yPos(tick)} stroke={INK_FADE} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 4" />
            <text x={padL - 6} y={yPos(tick) + 3} fontSize="9" fill={INK_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              {tick}d
            </text>
          </g>
        ))}
        {points.map((p) => (
          <text key={p.day} x={xPos(p.day)} y={h - 12} fontSize="9" fill={INK_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">
            D{p.day}
          </text>
        ))}
        {/* Before */}
        <path
          d={buildPath('before')}
          fill="none"
          stroke={INK}
          strokeOpacity="0.35"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          style={{
            strokeDashoffset: inView ? 0 : 800,
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        {/* After */}
        <path
          d={buildPath('after')}
          fill="none"
          stroke={TERRA}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={inView ? '0' : '800'}
          strokeDashoffset={inView ? 0 : 800}
          style={{
            transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '350ms',
          }}
        />
        <circle cx={xPos(180)} cy={yPos(11.6)} r={inView ? 3.5 : 0} fill={INK} opacity="0.4" style={{ transition: 'r 0.4s', transitionDelay: '1500ms' }} />
        <circle cx={xPos(180)} cy={yPos(9.2)} r={inView ? 5 : 0} fill={TERRA} style={{ transition: 'r 0.4s', transitionDelay: '1800ms' }} />

        <g transform="translate(50, 14)">
          <line x1="0" y1="4" x2="14" y2="4" stroke={INK} strokeOpacity="0.35" strokeWidth="1.4" strokeDasharray="4 3" />
          <text x="20" y="7" fontSize="9" fill={INK_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">BASELINE</text>
          <line x1="100" y1="4" x2="114" y2="4" stroke={TERRA} strokeWidth="2.4" />
          <text x="120" y="7" fontSize="9" fill={TERRA} fontFamily="ui-monospace, monospace" letterSpacing="0.5" fontWeight="600">POST-INTERVENTION</text>
        </g>
      </svg>
    </div>
  );
}

function CrioCohortPanel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
  const monthly = [0.42, 0.58, 0.71, 0.78, 0.85, 0.86];
  const cumulative = monthly.reduce<number[]>((acc, v, i) => {
    acc.push((acc[i - 1] || 0) + v);
    return acc;
  }, []);

  return (
    <div ref={ref}>
      <SectionHead
        num="03"
        title="₹4.2M direct revenue across 6 months."
        sub="20.3% of regional topline. Compounded month-over-month."
      />

      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <Cell label="TOTAL · 6 MO" value="₹4.2M" delta="direct contribution" highlight />
        <Cell label="REGIONAL SHARE" value="20.3%" delta="of regional topline" />
        <Cell label="PEAK MONTH" value="M5–M6" delta="₹0.85M+ each" />
      </div>

      <svg viewBox="0 0 700 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {[0, 1, 2, 3, 4, 5].map((tick) => (
          <g key={tick}>
            <line x1={50} x2={680} y1={170 - (tick / 5) * 140} y2={170 - (tick / 5) * 140} stroke={INK_FADE} strokeWidth="0.5" opacity="0.4" strokeDasharray={tick === 0 ? '0' : '2 4'} />
            <text x={44} y={173 - (tick / 5) * 140} fontSize="9" fill={INK_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              ₹{tick}M
            </text>
          </g>
        ))}

        {monthly.map((v, i) => {
          const x = 80 + i * 100;
          const monthlyH = (v / 5) * 140;
          const cumH = (cumulative[i] / 5) * 140;
          return (
            <g key={i}>
              {/* Cumulative ghost */}
              <rect
                x={x}
                y={inView ? 170 - cumH : 170}
                width={50}
                height={inView ? cumH : 0}
                fill={TERRA}
                opacity="0.12"
                style={{
                  transition: 'all 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${i * 90}ms`,
                }}
              />
              {/* Monthly bar */}
              <rect
                x={x}
                y={inView ? 170 - monthlyH : 170}
                width={50}
                height={inView ? monthlyH : 0}
                fill={TERRA}
                style={{
                  transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${300 + i * 90}ms`,
                }}
              />
              <text x={x + 25} y={186} fontSize="9.5" fill={INK_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                {months[i]}
              </text>
              <text
                x={x + 25}
                y={inView ? 165 - monthlyH : 165}
                fontSize="9"
                fill={TERRA}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
                style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s', transitionDelay: `${800 + i * 90}ms` }}
              >
                ₹{v.toFixed(2)}M
              </text>
            </g>
          );
        })}

        <g transform="translate(50, 14)">
          <rect width="9" height="9" fill={TERRA} />
          <text x="14" y="8" fontSize="9" fill={TERRA} fontFamily="ui-monospace, monospace" letterSpacing="0.5" fontWeight="600">MONTHLY</text>
          <rect x="80" width="9" height="9" fill={TERRA} opacity="0.12" />
          <text x="94" y="8" fontSize="9" fill={INK_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">CUMULATIVE</text>
        </g>
      </svg>
    </div>
  );
}

function CrioTeamPanel() {
  const stats = [
    { label: 'TEAM SIZE', value: '6', delta: 'cross-functional B2B' },
    { label: 'ASSOCIATES ONBOARDED', value: '5+', delta: 'structured curriculum' },
    { label: 'RAMP-UP TIME', value: '−18%', delta: 'vs prior cohort', highlight: true },
    { label: 'OUTPUT CONSISTENCY', value: '+22%', delta: 'standardised process', highlight: true },
    { label: 'INTERIM TENURE', value: '3 mo', delta: 'lead role' },
    { label: 'SLA COMPLIANCE', value: '100%', delta: 'no breaches' },
  ];

  return (
    <div>
      <SectionHead
        num="04"
        title="Three-month interim lead. Six-person team."
        sub="Inherited a regional unit. Built dashboards, trained associates, briefed leadership weekly."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {stats.map((s) => (
          <Cell key={s.label} label={s.label} value={s.value} delta={s.delta} highlight={s.highlight} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="border-l-2 border-terra pl-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-terra mb-2">DASHBOARDS DELIVERED</div>
          <ul className="space-y-1.5 font-sans text-[12.5px] text-ink-dim leading-relaxed">
            <li>· Weekly KPI roll-up · regional leadership</li>
            <li>· Account-level pipeline tracker</li>
            <li>· Pitch-to-conversion attribution</li>
            <li>· New-associate ramp-up monitor</li>
          </ul>
        </div>
        <div className="border-l-2 border-paper-edge pl-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-deep mb-2">FRAMEWORKS BUILT</div>
          <ul className="space-y-1.5 font-sans text-[12.5px] text-ink-dim leading-relaxed">
            <li>· Pitch sequencing playbook (revised)</li>
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
// KNR · 4-PANEL PROFESSIONAL DASHBOARD
// ============================================================
function KnrProDash() {
  return (
    <ProFrame
      eyebrow="LIVE INTELLIGENCE · KNR TRADERS"
      title="An operating system for 70+ flagship activations."
      subtitle="Events & Brand Activation · 18 months · Andhra Pradesh, India"
      kpis={[
        { label: 'BUSINESS GROWTH', value: '11×', delta: '18-month operating period' },
        { label: 'EVENT SUCCESS', value: '92%', delta: 'across 70+ activations' },
        { label: 'COST SAVINGS', value: '25%', delta: 'vendor renegotiation' },
      ]}
      tabs={[
        { id: 'growth', label: 'GROWTH CURVE', render: () => <KnrGrowthPanel /> },
        { id: 'grid', label: '8-ZONE GRID', render: () => <KnrGridPanel /> },
        { id: 'retention', label: 'RETENTION', render: () => <KnrRetentionPanel /> },
        { id: 'kpi', label: 'KPI PACK', render: () => <KnrKpiPanel /> },
      ]}
    />
  );
}

function KnrGrowthPanel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const months = [0, 3, 6, 9, 12, 15, 18];
  const growth = [1, 1.6, 2.8, 4.5, 7.2, 9.5, 11];
  const w = 700, h = 220;
  const padL = 50, padR = 30, padT = 30, padB = 30;
  const xPos = (m: number) => padL + (m / 18) * (w - padL - padR);
  const yPos = (v: number) => h - padB - (v / 12) * (h - padT - padB);
  const path = months.map((m, i) => `${i === 0 ? 'M' : 'L'} ${xPos(m)} ${yPos(growth[i])}`).join(' ');
  const area =
    `M ${xPos(0)} ${yPos(growth[0])} ` +
    months.slice(1).map((m, i) => `L ${xPos(m)} ${yPos(growth[i + 1])}`).join(' ') +
    ` L ${xPos(18)} ${yPos(0)} L ${xPos(0)} ${yPos(0)} Z`;

  return (
    <div ref={ref}>
      <SectionHead
        num="01"
        title="From baseline to 11× in 18 months."
        sub="Compounding growth driven by 8-zone routing, vendor cost controls, and 100% billing automation."
      />

      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <Cell label="BASELINE M0" value="1×" delta="entry baseline" />
        <Cell label="OUTCOME M18" value="11×" delta="multiplier achieved" highlight />
        <Cell label="REPEAT GROWTH" value="+30%" delta="repeat-client share" />
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {[0, 3, 6, 9, 12].map((tick) => (
          <g key={tick}>
            <line x1={padL} x2={w - padR} y1={yPos(tick)} y2={yPos(tick)} stroke={INK_FADE} strokeWidth="0.5" opacity="0.4" strokeDasharray={tick === 0 ? '0' : '2 4'} />
            <text x={padL - 6} y={yPos(tick) + 3} fontSize="9" fill={INK_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
              {tick}×
            </text>
          </g>
        ))}
        {months.map((m) => (
          <text key={m} x={xPos(m)} y={h - 12} fontSize="9" fill={INK_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">
            M{m}
          </text>
        ))}

        <path
          d={area}
          fill={TERRA}
          opacity={inView ? 0.12 : 0}
          style={{ transition: 'opacity 1.4s', transitionDelay: '500ms' }}
        />
        <path
          d={path}
          fill="none"
          stroke={TERRA}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={inView ? '0' : '1500'}
          strokeDashoffset={inView ? 0 : 1500}
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        {months.map((m, i) => (
          <circle
            key={m}
            cx={xPos(m)}
            cy={yPos(growth[i])}
            r={inView ? 4 : 0}
            fill={TERRA}
            style={{ transition: 'r 0.4s', transitionDelay: `${1500 + i * 80}ms` }}
          />
        ))}

        <g style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s', transitionDelay: '2200ms' }}>
          <line x1={xPos(18)} x2={xPos(18)} y1={yPos(11)} y2={yPos(11) - 22} stroke={TERRA} strokeWidth="0.8" />
          <text x={xPos(18) - 4} y={yPos(11) - 28} fontSize="22" fill={TERRA} fontFamily="Georgia, serif" fontStyle="italic" textAnchor="end">
            11×
          </text>
        </g>
      </svg>
    </div>
  );
}

function KnrGridPanel() {
  const zones = [
    { id: '01', label: 'LOGISTICS', detail: 'transport · setup · breakdown' },
    { id: '02', label: 'TALENT', detail: 'staffing · scheduling · briefing' },
    { id: '03', label: 'AV TECH', detail: 'sound · lighting · screens' },
    { id: '04', label: 'F&B', detail: 'catering · beverages · dietary' },
    { id: '05', label: 'HOSPITALITY', detail: 'guest experience · concierge' },
    { id: '06', label: 'BRAND', detail: 'visual ID · merchandising' },
    { id: '07', label: 'COMMS', detail: 'client liaison · live updates' },
    { id: '08', label: 'CONTINGENCY', detail: 'risk response · weather · vendor failure' },
  ];

  return (
    <div>
      <SectionHead
        num="02"
        title="Eight zones. One rotational owner per event."
        sub="Hot-handoff protocol. Single source-of-truth brief travels with the project. +50% retail ops efficiency."
      />

      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <Cell label="ZONES" value="8" delta="rotational ownership" />
        <Cell label="EVENTS / YEAR" value="70+" delta="concurrent execution" />
        <Cell label="EFFICIENCY" value="+50%" delta="retail operations" highlight />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {zones.map((z, i) => (
          <div
            key={z.id}
            className="border border-paper-edge px-3 py-3.5 bg-paper-warm/30 group hover:border-terra hover:bg-terra/[0.04] transition-colors animate-fade-up"
            style={{
              animationDelay: `${i * 60}ms`,
              animationFillMode: 'both',
              opacity: 0,
            }}
          >
            <div className="font-display tabular text-[1.5rem] leading-none text-terra mb-2 tracking-tight">
              {z.id}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink mb-1.5">
              {z.label}
            </div>
            <div className="font-sans text-[11px] text-ink-dim leading-snug">{z.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KnrRetentionPanel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const cx = 350, cy = 170, radius = 110;
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
    <div ref={ref}>
      <SectionHead
        num="03"
        title="Repeat-client share lifted from 22% to 68%."
        sub="46pp absolute lift. Driven by zone consistency, billing automation, and post-event NPS."
      />

      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <Cell label="BEFORE" value="22%" delta="repeat-client share" />
        <Cell label="AFTER" value="68%" delta="post 8-zone rotation" highlight />
        <Cell label="ABSOLUTE LIFT" value="+46pp" delta="12-month inflection" />
      </div>

      <svg viewBox="0 0 700 220" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <path d={arcPath(0, 100, radius)} fill="none" stroke={PAPER_EDGE} strokeWidth="10" strokeLinecap="round" />
        <path
          d={inView ? arcPath(0, 68, radius) : arcPath(0, 0, radius)}
          fill="none"
          stroke={TERRA}
          strokeWidth="10"
          strokeLinecap="round"
          style={{ transition: 'd 1.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />

        {Array.from({ length: 11 }, (_, i) => {
          const inner = pointAt(i * 10, radius - 16);
          const outer = pointAt(i * 10, radius - 4);
          return (
            <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke={i % 5 === 0 ? INK_DIM : INK_FADE} strokeWidth={i % 5 === 0 ? 1 : 0.5} />
          );
        })}

        {/* Before marker */}
        {(() => {
          const inner = pointAt(22, radius - 24);
          const outer = pointAt(22, radius + 8);
          const lbl = pointAt(22, radius + 22);
          return (
            <g style={{ opacity: inView ? 0.6 : 0, transition: 'opacity 0.6s', transitionDelay: '300ms' }}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={INK_DIM} strokeWidth="1.4" strokeDasharray="3 2" />
              <text x={lbl.x} y={lbl.y} fontSize="10" fill={INK_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">BEFORE 22%</text>
            </g>
          );
        })()}

        {/* After marker */}
        {(() => {
          const inner = pointAt(68, radius - 24);
          const outer = pointAt(68, radius + 8);
          const lbl = pointAt(68, radius + 22);
          return (
            <g style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s', transitionDelay: '1500ms' }}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={TERRA} strokeWidth="2" />
              <text x={lbl.x} y={lbl.y} fontSize="11" fill={TERRA} textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="600">AFTER 68%</text>
            </g>
          );
        })()}

        <text x={cx} y={cy + 5} fontSize="32" fill={TERRA} textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s', transitionDelay: '1700ms' }}>
          +46pp
        </text>
        <text x={cx} y={cy + 22} fontSize="9" fill={INK_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.2"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s', transitionDelay: '1850ms' }}>
          ABSOLUTE LIFT · 18 MO
        </text>
      </svg>
    </div>
  );
}

function KnrKpiPanel() {
  const kpis = [
    { label: 'EVENT SUCCESS', val: 92, target: 85, suffix: '%', highlight: true },
    { label: 'REPEAT CLIENTS', val: 30, target: 15, suffix: '%', highlight: true, sign: '+' },
    { label: 'NEW CLIENTS', val: 40, target: 20, suffix: '%', sign: '+' },
    { label: 'COST SAVINGS', val: 25, target: 15, suffix: '%' },
    { label: 'CLIENT EXP SCORE', val: 45, target: 25, suffix: '%', sign: '+' },
    { label: 'BILLING AUTOMATED', val: 100, target: 100, suffix: '%' },
  ];

  return (
    <div>
      <SectionHead
        num="04"
        title="Six measured KPIs. All exceeded internal target."
        sub="Vendor cost controls and incentive coordination did the structural work; the dashboard surfaced the wins."
      />

      <div className="space-y-4">
        {kpis.map((k, i) => {
          const pct = Math.min(100, (k.val / Math.max(k.target, k.val)) * 100);
          const targetPct = Math.min(100, (k.target / Math.max(k.target, k.val)) * 100);
          return (
            <KpiBar
              key={k.label}
              label={k.label}
              value={k.val}
              target={k.target}
              suffix={k.suffix}
              sign={k.sign}
              pct={pct}
              targetPct={targetPct}
              highlight={k.highlight}
              delay={i * 90}
            />
          );
        })}
      </div>
    </div>
  );
}

function KpiBar({
  label,
  value,
  target,
  suffix,
  sign = '',
  pct,
  targetPct,
  highlight,
  delay,
}: {
  label: string;
  value: number;
  target: number;
  suffix: string;
  sign?: string;
  pct: number;
  targetPct: number;
  highlight?: boolean;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="grid grid-cols-12 gap-3 items-center">
      <div className="col-span-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink">
        {label}
      </div>
      <div className="col-span-7 relative h-7 bg-paper-warm border border-paper-edge">
        {/* Target marker */}
        <div
          className="absolute top-0 bottom-0 w-px bg-ink-dim z-10"
          style={{ left: `${targetPct}%` }}
        >
          <div className="absolute -top-1 -left-[5px] w-2.5 h-2.5 border border-ink-dim bg-paper rotate-45" />
        </div>
        {/* Actual bar */}
        <div
          className={`absolute inset-y-0 left-0 ${highlight ? 'bg-terra' : 'bg-ink/70'}`}
          style={{
            width: inView ? `${pct}%` : '0%',
            transition: 'width 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <div className="col-span-2 text-right font-display tabular text-[1.1rem] leading-none">
        <span className={highlight ? 'text-terra' : 'text-ink'} style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.4s', transitionDelay: `${delay + 600}ms` }}>
          {sign}{value}{suffix}
        </span>
        <span className="block font-mono text-[9px] text-ink-deep mt-1">vs {target}{suffix}</span>
      </div>
    </div>
  );
}
