'use client';

import { ReactNode } from 'react';
import { useInView } from './use-in-view';

const TERRA = '#B8543B';
const TERRA_DEEP = '#8E3F2C';
const INK = '#1A1815';
const INK_DIM = '#5A554C';
const INK_FADE = '#B8B0A0';
const PAPER_EDGE = '#E5DFCE';
const MOSS = '#5C7544';
const GOLD = '#A8842F';

// ============================================================
// DASH ROUTER
// One compact, beautiful chart per case. ~480px tall. Not bigger.
// ============================================================
export function DashCard({ slug }: { slug: string }) {
  switch (slug) {
    case 'crio-revenue-engine':
      return <CrioDash />;
    case 'marselia-vertical-integration':
      return <MarseliaDash />;
    case 'bvlgari-corpo-architettura':
      return <BvlgariDash />;
    case 'knr-operational-grid':
      return <KnrDash />;
    case 'comtesse-trade-marketing':
      return <ComtesseDash />;
    default:
      return null;
  }
}

// ============================================================
// SHARED FRAME — editorial card with title, primary visual, three micro-stats
// ============================================================
function Frame({
  title,
  subtitle,
  primary,
  microStats,
}: {
  title: string;
  subtitle: string;
  primary: ReactNode;
  microStats: { label: string; value: string; trend?: 'up' | 'down' }[];
}) {
  return (
    <div className="bg-paper-card border border-paper-edge rounded-sm overflow-hidden shadow-[0_2px_24px_-12px_rgba(60,50,30,0.18)]">
      {/* Header */}
      <header className="px-6 md:px-8 pt-6 pb-4 border-b border-paper-edge/60 flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <div className="font-mono text-eyebrow uppercase text-ink-deep flex items-center gap-2.5">
            <span className="dot" />
            <span>INTELLIGENCE BRIEF</span>
          </div>
          <h3 className="font-display text-h3 text-ink mt-1.5 leading-tight">{title}</h3>
          <p className="font-sans text-tiny text-ink-dim uppercase tracking-[0.14em] mt-1">{subtitle}</p>
        </div>
      </header>

      {/* Primary visual — fixed height */}
      <div className="px-6 md:px-8 py-6 min-h-[300px]">{primary}</div>

      {/* Micro stats strip */}
      <div className="grid grid-cols-3 border-t border-paper-edge/60">
        {microStats.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 md:px-6 py-4 ${
              i < microStats.length - 1 ? 'border-r border-paper-edge/60' : ''
            }`}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-deep mb-1.5">
              {s.label}
            </div>
            <div className="font-display text-[1.4rem] md:text-[1.7rem] text-ink leading-none tabular tracking-[-0.02em]">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 001 — CRIO · Funnel comparison
// ============================================================
function CrioDash() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const stages = [
    { label: 'LEADS', before: 100, after: 100 },
    { label: 'CONTACT', before: 72, after: 88 },
    { label: 'QUALIFIED', before: 41, after: 58 },
    { label: 'DEMO', before: 22, after: 36 },
    { label: 'CLOSED', before: 4.6, after: 11.4 },
  ];

  return (
    <Frame
      title="Pipeline rebuilt. 12 percentage points recovered."
      subtitle="Crio.Do · 124+ accounts · 6-month engagement"
      primary={
        <div ref={ref}>
          <svg viewBox="0 0 720 260" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {/* Y-axis ticks */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <g key={tick}>
                <line
                  x1={50}
                  x2={700}
                  y1={210 - (tick / 100) * 180}
                  y2={210 - (tick / 100) * 180}
                  stroke={INK_FADE}
                  strokeWidth="0.5"
                  opacity="0.5"
                  strokeDasharray={tick === 0 ? '0' : '2 4'}
                />
                <text
                  x={42}
                  y={213 - (tick / 100) * 180}
                  fontSize="10"
                  fill={INK_DIM}
                  textAnchor="end"
                  fontFamily="ui-monospace, monospace"
                >
                  {tick}%
                </text>
              </g>
            ))}

            {stages.map((s, i) => {
              const groupW = 130;
              const x = 70 + i * groupW;
              const beforeH = (s.before / 100) * 180;
              const afterH = (s.after / 100) * 180;
              return (
                <g key={s.label}>
                  {/* Before bar */}
                  <rect
                    x={x}
                    y={inView ? 210 - beforeH : 210}
                    width={42}
                    height={inView ? beforeH : 0}
                    fill={INK}
                    opacity={0.18}
                    style={{
                      transition: 'all 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${100 + i * 80}ms`,
                    }}
                  />
                  {/* After bar */}
                  <rect
                    x={x + 48}
                    y={inView ? 210 - afterH : 210}
                    width={42}
                    height={inView ? afterH : 0}
                    fill={TERRA}
                    style={{
                      transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${300 + i * 80}ms`,
                    }}
                  />

                  {/* Stage label */}
                  <text
                    x={x + 45}
                    y={228}
                    fontSize="10"
                    fill={INK_DIM}
                    textAnchor="middle"
                    fontFamily="ui-monospace, monospace"
                    letterSpacing="0.5"
                  >
                    {s.label}
                  </text>

                  {/* Before % */}
                  <text
                    x={x + 21}
                    y={inView ? 205 - beforeH : 205}
                    fontSize="10"
                    fill={INK_DIM}
                    textAnchor="middle"
                    fontFamily="ui-monospace, monospace"
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: 'opacity 0.5s',
                      transitionDelay: `${800 + i * 80}ms`,
                    }}
                  >
                    {s.before}
                  </text>
                  {/* After % */}
                  <text
                    x={x + 69}
                    y={inView ? 205 - afterH : 205}
                    fontSize="11"
                    fill={TERRA_DEEP}
                    textAnchor="middle"
                    fontFamily="ui-monospace, monospace"
                    fontWeight="600"
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: 'opacity 0.5s',
                      transitionDelay: `${1000 + i * 80}ms`,
                    }}
                  >
                    {s.after}%
                  </text>
                </g>
              );
            })}

            {/* Legend */}
            <g transform="translate(50, 14)">
              <rect width="10" height="10" fill={INK} opacity="0.18" />
              <text x="16" y="9" fontSize="10" fill={INK_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                BEFORE
              </text>
              <rect x="100" width="10" height="10" fill={TERRA} />
              <text x="116" y="9" fontSize="10" fill={TERRA} fontFamily="ui-monospace, monospace" letterSpacing="0.5" fontWeight="600">
                AFTER
              </text>
            </g>
          </svg>
        </div>
      }
      microStats={[
        { label: 'CONVERSION LIFT', value: '+12pp' },
        { label: 'REVENUE', value: '₹4.2M' },
        { label: 'CYCLE TIME', value: '−2.4d' },
      ]}
    />
  );
}

// ============================================================
// 002 — MARSELIA · 3-scenario EBITDA trajectory
// ============================================================
function MarseliaDash() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const scenarios = [
    { name: 'BEAR', vals: [-1.2, 1.8, 4.8], color: INK_DIM, weight: 1.3 },
    { name: 'BASE', vals: [-0.4, 4.2, 8.4], color: TERRA, weight: 2.4, recommended: true },
    { name: 'BULL', vals: [1.2, 7.5, 11.2], color: GOLD, weight: 1.3 },
  ];
  const w = 720, h = 260;
  const padL = 50, padR = 70, padT = 30, padB = 40;
  const max = 12, min = -2;
  const xPos = (i: number) => padL + (i / 2) * (w - padL - padR);
  const yPos = (v: number) => h - padB - ((v - min) / (max - min)) * (h - padT - padB);

  return (
    <Frame
      title="Three scenarios. Positive across all of them."
      subtitle="Marselia × NordAir · €14.05M synergy at run-rate"
      primary={
        <div ref={ref}>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {/* Y axis */}
            {[-2, 0, 4, 8, 12].map((tick) => (
              <g key={tick}>
                <line
                  x1={padL}
                  x2={w - padR}
                  y1={yPos(tick)}
                  y2={yPos(tick)}
                  stroke={tick === 0 ? INK_DIM : INK_FADE}
                  strokeWidth={tick === 0 ? '0.8' : '0.5'}
                  opacity={tick === 0 ? 0.6 : 0.4}
                  strokeDasharray={tick === 0 ? '0' : '2 4'}
                />
                <text
                  x={padL - 8}
                  y={yPos(tick) + 4}
                  fontSize="10"
                  fill={INK_DIM}
                  textAnchor="end"
                  fontFamily="ui-monospace, monospace"
                >
                  €{tick}M
                </text>
              </g>
            ))}

            {/* X labels */}
            {['Y1', 'Y2', 'Y3'].map((y, i) => (
              <text
                key={y}
                x={xPos(i)}
                y={h - 16}
                fontSize="11"
                fill={INK_DIM}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.6"
              >
                {y}
              </text>
            ))}

            {/* Lines */}
            {scenarios.map((s, idx) => {
              const path = s.vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i)} ${yPos(v)}`).join(' ');
              return (
                <g key={s.name}>
                  {/* Filled area for base case */}
                  {s.recommended && (
                    <path
                      d={`${path} L ${xPos(2)} ${yPos(0)} L ${xPos(0)} ${yPos(0)} Z`}
                      fill={TERRA}
                      opacity={inView ? 0.06 : 0}
                      style={{ transition: 'opacity 1.4s', transitionDelay: '600ms' }}
                    />
                  )}
                  <path
                    d={path}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={s.weight}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={inView ? '1000' : '1000'}
                    strokeDashoffset={inView ? 0 : 1000}
                    style={{
                      transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${idx * 200}ms`,
                    }}
                  />
                  {/* Endpoints */}
                  {s.vals.map((v, i) => (
                    <circle
                      key={i}
                      cx={xPos(i)}
                      cy={yPos(v)}
                      r={inView ? (s.recommended ? 5 : 3.5) : 0}
                      fill={s.color}
                      style={{
                        transition: 'r 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        transitionDelay: `${1400 + idx * 100 + i * 60}ms`,
                      }}
                    />
                  ))}
                  {/* End label */}
                  <text
                    x={xPos(2) + 12}
                    y={yPos(s.vals[2]) + 4}
                    fontSize="11"
                    fill={s.color}
                    fontFamily="ui-monospace, monospace"
                    fontWeight={s.recommended ? '700' : '500'}
                    letterSpacing="0.5"
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: 'opacity 0.5s',
                      transitionDelay: `${1700 + idx * 100}ms`,
                    }}
                  >
                    {s.name}
                  </text>
                </g>
              );
            })}

            {/* Legend */}
            <g transform="translate(50, 14)">
              <text fontSize="10" fill={INK_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                EBITDA · €M · 3-YEAR PROJECTION
              </text>
            </g>
          </svg>
        </div>
      }
      microStats={[
        { label: 'PAYBACK', value: '33.7mo' },
        { label: 'Y3 EBITDA · BASE', value: '€8.4M' },
        { label: 'ACMI LEAKAGE', value: '€8.86M' },
      ]}
    />
  );
}

// ============================================================
// 003 — BVLGARI · 5Y revenue trajectory
// ============================================================
function BvlgariDash() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const scenarios = [
    { name: 'BEAR', cum: [50, 140, 295, 510, 785], color: INK_DIM, weight: 1.3 },
    { name: 'BASE', cum: [75, 215, 445, 765, 1170], color: TERRA, weight: 2.4, recommended: true },
    { name: 'BULL', cum: [100, 300, 620, 1040, 1580], color: GOLD, weight: 1.3 },
  ];
  const w = 720, h = 260;
  const padL = 60, padR = 70, padT = 30, padB = 40;
  const max = 1700, min = 0;
  const xPos = (i: number) => padL + (i / 4) * (w - padL - padR);
  const yPos = (v: number) => h - padB - ((v - min) / (max - min)) * (h - padT - padB);

  return (
    <Frame
      title="Five years. $1.17B base case."
      subtitle="Bvlgari · Corpo Architettura · €25M investment · 19.5× ROI"
      primary={
        <div ref={ref}>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {/* Grid */}
            {[0, 400, 800, 1200, 1600].map((tick) => (
              <g key={tick}>
                <line
                  x1={padL}
                  x2={w - padR}
                  y1={yPos(tick)}
                  y2={yPos(tick)}
                  stroke={INK_FADE}
                  strokeWidth="0.5"
                  opacity="0.4"
                  strokeDasharray={tick === 0 ? '0' : '2 4'}
                />
                <text
                  x={padL - 8}
                  y={yPos(tick) + 4}
                  fontSize="10"
                  fill={INK_DIM}
                  textAnchor="end"
                  fontFamily="ui-monospace, monospace"
                >
                  ${tick}M
                </text>
              </g>
            ))}

            {/* X */}
            {[0, 1, 2, 3, 4].map((i) => (
              <text
                key={i}
                x={xPos(i)}
                y={h - 16}
                fontSize="11"
                fill={INK_DIM}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.6"
              >
                Y{i + 1}
              </text>
            ))}

            {scenarios.map((s, idx) => {
              const path = s.cum.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i)} ${yPos(v)}`).join(' ');
              return (
                <g key={s.name}>
                  {s.recommended && (
                    <path
                      d={`${path} L ${xPos(4)} ${yPos(0)} L ${xPos(0)} ${yPos(0)} Z`}
                      fill={TERRA}
                      opacity={inView ? 0.06 : 0}
                      style={{ transition: 'opacity 1.4s', transitionDelay: '600ms' }}
                    />
                  )}
                  <path
                    d={path}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={s.weight}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={inView ? '1400' : '1400'}
                    strokeDashoffset={inView ? 0 : 1400}
                    style={{
                      transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${idx * 200}ms`,
                    }}
                  />
                  {s.cum.map((v, i) => (
                    <circle
                      key={i}
                      cx={xPos(i)}
                      cy={yPos(v)}
                      r={inView ? (s.recommended ? 4 : 2.8) : 0}
                      fill={s.color}
                      style={{
                        transition: 'r 0.4s',
                        transitionDelay: `${1500 + idx * 100 + i * 60}ms`,
                      }}
                    />
                  ))}
                  <text
                    x={xPos(4) + 12}
                    y={yPos(s.cum[4]) + 4}
                    fontSize="11"
                    fill={s.color}
                    fontFamily="ui-monospace, monospace"
                    fontWeight={s.recommended ? '700' : '500'}
                    letterSpacing="0.5"
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: 'opacity 0.5s',
                      transitionDelay: `${1900 + idx * 100}ms`,
                    }}
                  >
                    {s.name}
                  </text>
                </g>
              );
            })}

            <g transform="translate(60, 14)">
              <text fontSize="10" fill={INK_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                CUMULATIVE REVENUE · $M · 5-YEAR HORIZON
              </text>
            </g>
          </svg>
        </div>
      }
      microStats={[
        { label: 'BLENDED GM', value: '72.3%' },
        { label: 'HERO SKUS', value: '8' },
        { label: 'BREAKEVEN', value: 'M16' },
      ]}
    />
  );
}

// ============================================================
// 004 — KNR · Multiplier curve
// ============================================================
function KnrDash() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const months = [0, 3, 6, 9, 12, 15, 18];
  const growth = [1, 1.6, 2.8, 4.5, 7.2, 9.5, 11];
  const w = 720, h = 260;
  const padL = 50, padR = 30, padT = 30, padB = 40;
  const xPos = (m: number) => padL + (m / 18) * (w - padL - padR);
  const yPos = (v: number) => h - padB - (v / 12) * (h - padT - padB);
  const path = months.map((m, i) => `${i === 0 ? 'M' : 'L'} ${xPos(m)} ${yPos(growth[i])}`).join(' ');
  const area =
    `M ${xPos(0)} ${yPos(growth[0])} ` +
    months.slice(1).map((m, i) => `L ${xPos(m)} ${yPos(growth[i + 1])}`).join(' ') +
    ` L ${xPos(18)} ${yPos(0)} L ${xPos(0)} ${yPos(0)} Z`;

  return (
    <Frame
      title="From baseline to eleven-times. Eighteen months."
      subtitle="KNR Traders · 70+ events · 92% success rate"
      primary={
        <div ref={ref}>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {[0, 3, 6, 9, 12].map((tick) => (
              <g key={tick}>
                <line x1={padL} x2={w - padR} y1={yPos(tick)} y2={yPos(tick)} stroke={INK_FADE} strokeWidth="0.5" opacity="0.4" strokeDasharray={tick === 0 ? '0' : '2 4'} />
                <text x={padL - 8} y={yPos(tick) + 4} fontSize="10" fill={INK_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
                  {tick}×
                </text>
              </g>
            ))}
            {months.map((m) => (
              <text key={m} x={xPos(m)} y={h - 16} fontSize="10" fill={INK_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">
                M{m}
              </text>
            ))}

            {/* Filled area */}
            <path
              d={area}
              fill={TERRA}
              opacity={inView ? 0.1 : 0}
              style={{ transition: 'opacity 1.4s', transitionDelay: '500ms' }}
            />
            {/* Line */}
            <path
              d={path}
              fill="none"
              stroke={TERRA}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={inView ? '1500' : '1500'}
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
            {/* Endpoint label */}
            <g style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s', transitionDelay: '2200ms' }}>
              <line x1={xPos(18)} x2={xPos(18)} y1={yPos(11)} y2={yPos(11) - 18} stroke={TERRA} strokeWidth="0.8" />
              <text x={xPos(18)} y={yPos(11) - 24} fontSize="22" fill={TERRA} fontFamily="Georgia, serif" fontStyle="italic" textAnchor="end">
                11×
              </text>
            </g>
            <g transform="translate(50, 14)">
              <text fontSize="10" fill={INK_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                BUSINESS GROWTH MULTIPLIER · MONTH-BY-MONTH
              </text>
            </g>
          </svg>
        </div>
      }
      microStats={[
        { label: 'EVENT SUCCESS', value: '92%' },
        { label: 'COST SAVINGS', value: '25%' },
        { label: 'REPEAT GROWTH', value: '+30%' },
      ]}
    />
  );
}

// ============================================================
// 005 — COMTESSE · Seasonality flatten
// ============================================================
function ComtesseDash() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const today = [3, 3, 4, 5, 4, 4, 3, 3, 4, 5, 8, 45];
  const target = [5, 7, 6, 7, 6, 7, 5, 5, 6, 7, 9, 30];
  const w = 720, h = 260;
  const padL = 50, padR = 30, padT = 30, padB = 40;
  const max = 50;
  const groupW = (w - padL - padR) / months.length;
  const yPos = (v: number) => h - padB - (v / max) * (h - padT - padB);

  return (
    <Frame
      title="Christmas dependency cut from 45% to 30%."
      subtitle="Comtesse du Barry · 11 month-occasions built · €23M Y3 target"
      primary={
        <div ref={ref}>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {[0, 10, 20, 30, 40, 50].map((tick) => (
              <g key={tick}>
                <line x1={padL} x2={w - padR} y1={yPos(tick)} y2={yPos(tick)} stroke={INK_FADE} strokeWidth="0.5" opacity="0.4" strokeDasharray={tick === 0 ? '0' : '2 4'} />
                <text x={padL - 8} y={yPos(tick) + 4} fontSize="10" fill={INK_DIM} textAnchor="end" fontFamily="ui-monospace, monospace">
                  {tick}%
                </text>
              </g>
            ))}

            {months.map((m, i) => {
              const xc = padL + (i + 0.5) * groupW;
              const barW = groupW * 0.32;
              const todayH = (today[i] / max) * (h - padT - padB);
              const targetH = (target[i] / max) * (h - padT - padB);
              return (
                <g key={i}>
                  {/* Today */}
                  <rect
                    x={xc - barW - 1}
                    y={inView ? yPos(today[i]) : h - padB}
                    width={barW}
                    height={inView ? todayH : 0}
                    fill={INK}
                    opacity={0.22}
                    style={{
                      transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${i * 35}ms`,
                    }}
                  />
                  {/* Target */}
                  <rect
                    x={xc + 1}
                    y={inView ? yPos(target[i]) : h - padB}
                    width={barW}
                    height={inView ? targetH : 0}
                    fill={TERRA}
                    style={{
                      transition: 'all 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${300 + i * 35}ms`,
                    }}
                  />
                  <text x={xc} y={h - 16} fontSize="10" fill={INK_DIM} textAnchor="middle" fontFamily="ui-monospace, monospace">
                    {m}
                  </text>
                </g>
              );
            })}

            <g transform="translate(50, 14)">
              <rect width="10" height="10" fill={INK} opacity="0.22" />
              <text x="16" y="9" fontSize="10" fill={INK_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">TODAY</text>
              <rect x="80" width="10" height="10" fill={TERRA} />
              <text x="96" y="9" fontSize="10" fill={TERRA} fontFamily="ui-monospace, monospace" letterSpacing="0.5" fontWeight="600">YEAR 3 TARGET</text>
            </g>
          </svg>
        </div>
      }
      microStats={[
        { label: 'DEC TODAY → Y2', value: '45 → 30%' },
        { label: 'SKU CUT', value: '450 → 250' },
        { label: 'CAPEX ROI', value: '4×' },
      ]}
    />
  );
}
