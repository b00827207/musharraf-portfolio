'use client';

import { useEffect, useRef, useState } from 'react';

// ============================================================
// CASE-SPECIFIC LIVE READOUTS
// Each case has its own diagnostic dashboard.
// All animations are CSS or one-shot Framer-free transitions.
// ============================================================

const VITAL = '#7CFFB7';
const VITAL_DIM = 'rgba(124, 255, 183, 0.5)';
const VITAL_GLOW = 'rgba(124, 255, 183, 0.18)';
const BONE = '#EAE6DD';
const BONE_DIM = 'rgba(234, 230, 221, 0.45)';
const BONE_DEEP = 'rgba(234, 230, 221, 0.22)';

// === Hook: trigger one-shot reveal on mount
function useReveal(delay = 0) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return revealed;
}

export function Dashboard({ slug }: { slug: string }) {
  switch (slug) {
    case 'crio-revenue-engine':
      return <CrioFunnel />;
    case 'marselia-vertical-integration':
      return <MarseliaScenarios />;
    case 'bvlgari-corpo-architettura':
      return <BvlgariArchetypes />;
    case 'knr-operational-grid':
      return <KnrGauge />;
    case 'comtesse-trade-marketing':
      return <ComtesseRetailers />;
    default:
      return null;
  }
}

// ============================================================
// CRIO — Conversion funnel with before/after bars
// ============================================================
function CrioFunnel() {
  const r = useReveal(150);
  // Stages: leads → demos → deals
  // Before: 1000 → 140 (14%) → 28 (20%)
  // After:  1000 → 260 (26%) → 78 (30%)
  const stages = [
    { label: 'LEAD', before: 100, after: 100 },
    { label: 'DEMO', before: 14, after: 26 },
    { label: 'DEAL', before: 2.8, after: 7.8 },
  ];
  const maxW = 100;

  return (
    <DashFrame title="CONVERSION FUNNEL · BEFORE → AFTER">
      <svg viewBox="0 0 320 180" className="w-full h-full">
        {/* Y-axis ticks */}
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line
              x1={42}
              x2={310}
              y1={170 - (tick / 100) * 140}
              y2={170 - (tick / 100) * 140}
              stroke={BONE_DEEP}
              strokeWidth="0.4"
              strokeDasharray="2 4"
            />
            <text
              x={36}
              y={172 - (tick / 100) * 140}
              fontSize="6"
              fill={BONE_DIM}
              textAnchor="end"
              fontFamily="ui-monospace, monospace"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* Bars per stage */}
        {stages.map((s, i) => {
          const x = 60 + i * 90;
          const beforeH = (s.before / maxW) * 140;
          const afterH = (s.after / maxW) * 140;
          return (
            <g key={s.label}>
              {/* Before bar (bone) */}
              <rect
                x={x}
                y={r ? 170 - beforeH : 170}
                width={28}
                height={r ? beforeH : 0}
                fill={BONE_DIM}
                style={{
                  transition: 'all 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${i * 80}ms`,
                }}
              />
              {/* After bar (vital) */}
              <rect
                x={x + 32}
                y={r ? 170 - afterH : 170}
                width={28}
                height={r ? afterH : 0}
                fill={VITAL}
                opacity={0.85}
                style={{
                  transition: 'all 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${300 + i * 100}ms`,
                  filter: `drop-shadow(0 0 4px ${VITAL_GLOW})`,
                }}
              />
              {/* Stage label */}
              <text
                x={x + 30}
                y={183}
                fontSize="6.5"
                fill={BONE_DIM}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                letterSpacing="1"
              >
                {s.label}
              </text>
              {/* Value labels above bars */}
              <text
                x={x + 14}
                y={r ? 165 - beforeH : 168}
                fontSize="5.5"
                fill={BONE_DEEP}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                opacity={r ? 1 : 0}
                style={{
                  transition: 'opacity 0.6s',
                  transitionDelay: `${500 + i * 80}ms`,
                }}
              >
                {s.before}%
              </text>
              <text
                x={x + 46}
                y={r ? 165 - afterH : 168}
                fontSize="6.5"
                fill={VITAL}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
                opacity={r ? 1 : 0}
                style={{
                  transition: 'opacity 0.6s',
                  transitionDelay: `${800 + i * 100}ms`,
                }}
              >
                {s.after}%
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(60, 12)">
          <rect width="6" height="6" fill={BONE_DIM} />
          <text x="10" y="6" fontSize="5.5" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.8">
            BEFORE
          </text>
          <rect x="50" width="6" height="6" fill={VITAL} />
          <text x="60" y="6" fontSize="5.5" fill={VITAL} fontFamily="ui-monospace, monospace" letterSpacing="0.8">
            AFTER
          </text>
        </g>
      </svg>
    </DashFrame>
  );
}

// ============================================================
// MARSELIA — 3 payback scenarios + recommended highlight
// ============================================================
function MarseliaScenarios() {
  const r = useReveal(150);
  // Three curves: forwards, platform, backwards (recommended)
  // Y: cumulative cash position. X: years.
  // Forwards: deeper J-curve, slow recovery. Platform: highest peak, longest payback.
  // Backwards: moderate J, earliest payback (chosen).

  const buildPath = (points: [number, number][]) => {
    return points
      .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
      .join(' ');
  };

  // Coordinates: x in [40..310], y in [20..160]. Year 0 left, Year 5 right.
  const yYears = [40, 95, 150, 205, 260, 310];
  const baseY = 110; // breakeven line

  const forwards: [number, number][] = [
    [yYears[0], baseY],
    [yYears[1], 145],
    [yYears[2], 138],
    [yYears[3], 122],
    [yYears[4], 100],
    [yYears[5], 80],
  ];
  const platform: [number, number][] = [
    [yYears[0], baseY],
    [yYears[1], 152],
    [yYears[2], 148],
    [yYears[3], 130],
    [yYears[4], 95],
    [yYears[5], 55],
  ];
  const backwards: [number, number][] = [
    [yYears[0], baseY],
    [yYears[1], 130],
    [yYears[2], 115],
    [yYears[3], 95],
    [yYears[4], 70],
    [yYears[5], 50],
  ];

  return (
    <DashFrame title="3-SCENARIO PAYBACK · 5Y MODEL">
      <svg viewBox="0 0 320 180" className="w-full h-full">
        {/* Breakeven line */}
        <line
          x1={40}
          x2={310}
          y1={baseY}
          y2={baseY}
          stroke={BONE_DEEP}
          strokeWidth="0.4"
          strokeDasharray="2 3"
        />
        <text x={42} y={baseY - 2} fontSize="5" fill={BONE_DEEP} fontFamily="ui-monospace, monospace">
          BREAKEVEN
        </text>

        {/* Year ticks */}
        {yYears.map((x, i) => (
          <g key={i}>
            <line x1={x} x2={x} y1={20} y2={165} stroke={BONE_DEEP} strokeWidth="0.3" />
            <text
              x={x}
              y={175}
              fontSize="5.5"
              fill={BONE_DIM}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
            >
              Y{i}
            </text>
          </g>
        ))}

        {/* Non-recommended scenarios */}
        {[forwards, platform].map((path, i) => (
          <path
            key={i}
            d={buildPath(path)}
            fill="none"
            stroke={BONE_DIM}
            strokeWidth="1.1"
            strokeDasharray={r ? '0 0' : '300 300'}
            strokeDashoffset={r ? 0 : 300}
            style={{
              transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: `${i * 200}ms`,
            }}
          />
        ))}

        {/* Recommended scenario — vital green, drawn last and brightest */}
        <path
          d={buildPath(backwards)}
          fill="none"
          stroke={VITAL}
          strokeWidth="1.8"
          strokeDasharray={r ? '0 0' : '320 320'}
          strokeDashoffset={r ? 0 : 320}
          style={{
            transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '500ms',
            filter: `drop-shadow(0 0 4px ${VITAL_GLOW})`,
          }}
        />

        {/* Payback marker on chosen line */}
        <g
          opacity={r ? 1 : 0}
          style={{ transition: 'opacity 0.5s', transitionDelay: '1900ms' }}
        >
          <line
            x1={205 + ((4.2 - 3) / 1) * (260 - 205)}
            x2={205 + ((4.2 - 3) / 1) * (260 - 205)}
            y1={20}
            y2={165}
            stroke={VITAL}
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          <text
            x={205 + ((4.2 - 3) / 1) * (260 - 205) + 4}
            y={32}
            fontSize="6"
            fill={VITAL}
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.5"
          >
            PAYBACK · 4.2Y
          </text>
        </g>

        {/* Legend */}
        <g transform="translate(40, 12)">
          <line x1="0" y1="3" x2="10" y2="3" stroke={BONE_DIM} strokeWidth="1" />
          <text x="14" y="5.5" fontSize="5" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">FORWARDS</text>
          <line x1="60" y1="3" x2="70" y2="3" stroke={BONE_DIM} strokeWidth="1" />
          <text x="74" y="5.5" fontSize="5" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">PLATFORM</text>
          <line x1="115" y1="3" x2="125" y2="3" stroke={VITAL} strokeWidth="1.5" />
          <text x="129" y="5.5" fontSize="5" fill={VITAL} fontFamily="ui-monospace, monospace" letterSpacing="0.5">BACKWARDS · CHOSEN</text>
        </g>
      </svg>
    </DashFrame>
  );
}

// ============================================================
// BVLGARI — Archetype landscape with whitespace quadrant
// ============================================================
function BvlgariArchetypes() {
  const r = useReveal(150);
  // 4 quadrants. X: ethereal -> structural. Y: traditional -> contemporary.
  // Plot competitors as small dots in the populated quadrants.
  // Recommendation: structural + contemporary (top-right).

  const competitors = [
    // Ethereal/traditional — bottom-left, dense
    { x: 70, y: 130, label: '' },
    { x: 90, y: 145, label: '' },
    { x: 60, y: 150, label: '' },
    { x: 100, y: 135, label: '' },
    { x: 80, y: 160, label: '' },
    { x: 110, y: 152, label: '' },
    { x: 75, y: 142, label: '' },
    // Ethereal/contemporary — top-left
    { x: 85, y: 70, label: '' },
    { x: 105, y: 50, label: '' },
    { x: 115, y: 80, label: '' },
    { x: 70, y: 60, label: '' },
    { x: 95, y: 85, label: '' },
    // Structural/traditional — bottom-right (a few)
    { x: 200, y: 145, label: '' },
    { x: 230, y: 155, label: '' },
    { x: 215, y: 135, label: '' },
    // Structural/contemporary — top-right (THE WHITESPACE — empty)
  ];

  return (
    <DashFrame title="ARCHETYPE LANDSCAPE · LUXURY FRAGRANCE">
      <svg viewBox="0 0 320 180" className="w-full h-full">
        {/* Quadrant lines */}
        <line x1={40} x2={300} y1={95} y2={95} stroke={BONE_DEEP} strokeWidth="0.5" />
        <line x1={170} x2={170} y1={20} y2={165} stroke={BONE_DEEP} strokeWidth="0.5" />

        {/* Whitespace quadrant — vital outline + glow */}
        <rect
          x={170}
          y={20}
          width={130}
          height={75}
          fill="rgba(124, 255, 183, 0.04)"
          stroke={VITAL}
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity={r ? 1 : 0}
          style={{
            transition: 'opacity 0.8s',
            transitionDelay: '600ms',
          }}
        />
        <text
          x={235}
          y={50}
          fontSize="7"
          fill={VITAL}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1.5"
          fontWeight="600"
          opacity={r ? 1 : 0}
          style={{
            transition: 'opacity 0.6s',
            transitionDelay: '1200ms',
          }}
        >
          WHITESPACE
        </text>
        <text
          x={235}
          y={62}
          fontSize="5"
          fill={VITAL}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.8"
          opacity={r ? 0.7 : 0}
          style={{
            transition: 'opacity 0.6s',
            transitionDelay: '1400ms',
          }}
        >
          STRUCTURAL · CONTEMPORARY
        </text>

        {/* Competitor dots */}
        {competitors.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={r ? 2.2 : 0}
            fill={BONE_DIM}
            style={{
              transition: 'r 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: `${200 + i * 40}ms`,
            }}
          />
        ))}

        {/* Recommended placement marker — pulsing dot in whitespace */}
        <circle
          cx={235}
          cy={75}
          r={r ? 5 : 0}
          fill="none"
          stroke={VITAL}
          strokeWidth="1.5"
          opacity={r ? 1 : 0}
          style={{
            transition: 'r 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s',
            transitionDelay: '1700ms',
          }}
        />
        <circle
          cx={235}
          cy={75}
          r={r ? 2 : 0}
          fill={VITAL}
          opacity={r ? 1 : 0}
          style={{
            transition: 'r 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '1900ms',
            filter: `drop-shadow(0 0 4px ${VITAL_GLOW})`,
          }}
        />

        {/* Axis labels */}
        <text x={50} y={177} fontSize="5.5" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">ETHEREAL</text>
        <text x={300} y={177} fontSize="5.5" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace" letterSpacing="0.5">STRUCTURAL</text>
        <text x={167} y={28} fontSize="5.5" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace" letterSpacing="0.5">CONTEMPORARY</text>
        <text x={167} y={163} fontSize="5.5" fill={BONE_DIM} textAnchor="end" fontFamily="ui-monospace, monospace" letterSpacing="0.5">TRADITIONAL</text>

        <text x={42} y={14} fontSize="5" fill={BONE_DEEP} fontFamily="ui-monospace, monospace" letterSpacing="0.6">
          N=28 PRESTIGE HOUSES MAPPED
        </text>
      </svg>
    </DashFrame>
  );
}

// ============================================================
// KNR — Repeat-client gauge (22% → 68%)
// ============================================================
function KnrGauge() {
  const r = useReveal(150);
  // Semicircular gauge from 0% to 100%, with two needles: before (22) and after (68)
  // Arc spans 180deg, from 9 o'clock to 3 o'clock

  const cx = 160;
  const cy = 130;
  const radius = 80;

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
    <DashFrame title="REPEAT-CLIENT RATE · 12-MONTH SHIFT">
      <svg viewBox="0 0 320 180" className="w-full h-full">
        {/* Background arc */}
        <path
          d={arcPath(0, 100, radius)}
          fill="none"
          stroke={BONE_DEEP}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Filled arc — animates from 0 to 68% */}
        <path
          d={arcPath(0, r ? 68 : 0, radius)}
          fill="none"
          stroke={VITAL}
          strokeWidth="6"
          strokeLinecap="round"
          style={{
            transition: 'd 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
            filter: `drop-shadow(0 0 6px ${VITAL_GLOW})`,
          }}
        />

        {/* Tick marks every 10% */}
        {Array.from({ length: 11 }, (_, i) => {
          const inner = pointAt(i * 10, radius - 12);
          const outer = pointAt(i * 10, radius - 4);
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke={i % 5 === 0 ? BONE_DIM : BONE_DEEP}
              strokeWidth={i % 5 === 0 ? 1 : 0.6}
            />
          );
        })}

        {/* "Before" marker — ghost line at 22% */}
        {(() => {
          const inner = pointAt(22, radius - 18);
          const outer = pointAt(22, radius + 6);
          return (
            <g
              opacity={r ? 0.7 : 0}
              style={{ transition: 'opacity 0.6s', transitionDelay: '300ms' }}
            >
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke={BONE_DIM}
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <text
                x={pointAt(22, radius + 14).x}
                y={pointAt(22, radius + 14).y}
                fontSize="6"
                fill={BONE_DIM}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
              >
                BEFORE · 22%
              </text>
            </g>
          );
        })()}

        {/* "After" marker — vital line at 68% */}
        {(() => {
          const inner = pointAt(68, radius - 18);
          const outer = pointAt(68, radius + 6);
          return (
            <g
              opacity={r ? 1 : 0}
              style={{ transition: 'opacity 0.6s', transitionDelay: '1500ms' }}
            >
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke={VITAL}
                strokeWidth="1.6"
              />
              <text
                x={pointAt(68, radius + 14).x}
                y={pointAt(68, radius + 14).y}
                fontSize="6.5"
                fill={VITAL}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
              >
                AFTER · 68%
              </text>
            </g>
          );
        })()}

        {/* Center value */}
        <text
          x={cx}
          y={cy + 5}
          fontSize="22"
          fill={VITAL}
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          opacity={r ? 1 : 0}
          style={{
            transition: 'opacity 0.6s',
            transitionDelay: '1700ms',
          }}
        >
          +46pp
        </text>
        <text
          x={cx}
          y={cy + 18}
          fontSize="6"
          fill={BONE_DIM}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1.2"
          opacity={r ? 1 : 0}
          style={{
            transition: 'opacity 0.6s',
            transitionDelay: '1850ms',
          }}
        >
          ABSOLUTE LIFT
        </text>
      </svg>
    </DashFrame>
  );
}

// ============================================================
// COMTESSE — Per-retailer velocity sparklines (12 retailers)
// ============================================================
function ComtesseRetailers() {
  const r = useReveal(150);
  // 12 retailers as 3x4 grid of mini sparklines.
  // Each sparkline shows 4 weekly velocity points trending up after pilot.
  // 8 of 12 show resolution (vital green); 4 show resistance (bone).

  const retailers = Array.from({ length: 12 }, (_, i) => {
    const resolved = i < 8; // 8 of 10 objection resolution → 8 of 12 retailers improving
    const baseline = 30 + (i % 4) * 6;
    const points = resolved
      ? [baseline, baseline + 2, baseline + 6, baseline + 14, baseline + 20]
      : [baseline, baseline - 1, baseline + 2, baseline, baseline + 1];
    return { resolved, points };
  });

  const gridCols = 4;
  const gridRows = 3;
  const cellW = 64;
  const cellH = 44;
  const startX = 36;
  const startY = 30;

  const buildSparkPath = (points: number[], cellWidth: number, cellHeight: number) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    return points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * (cellWidth - 6) + 3;
        const y = cellHeight - 6 - ((p - min) / range) * (cellHeight - 16);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <DashFrame title="PILOT · 12 SPECIALTY RETAILERS · VELOCITY">
      <svg viewBox="0 0 320 180" className="w-full h-full">
        {retailers.map((retailer, idx) => {
          const col = idx % gridCols;
          const row = Math.floor(idx / gridCols);
          const x = startX + col * cellW;
          const y = startY + row * cellH;
          const color = retailer.resolved ? VITAL : BONE_DIM;
          const dashLength = 100;

          return (
            <g key={idx} transform={`translate(${x}, ${y})`}>
              {/* Cell border */}
              <rect
                width={cellW - 6}
                height={cellH - 6}
                fill="none"
                stroke={BONE_DEEP}
                strokeWidth="0.4"
              />
              {/* Retailer ID */}
              <text
                x={3}
                y={9}
                fontSize="5"
                fill={BONE_DEEP}
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.3"
              >
                R{String(idx + 1).padStart(2, '0')}
              </text>
              {/* Status dot */}
              <circle
                cx={cellW - 12}
                cy={6.5}
                r={1.5}
                fill={color}
                opacity={r ? 1 : 0}
                style={{
                  transition: 'opacity 0.4s',
                  transitionDelay: `${300 + idx * 60}ms`,
                }}
              />
              {/* Sparkline */}
              <path
                d={buildSparkPath(retailer.points, cellW - 6, cellH - 6)}
                fill="none"
                stroke={color}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={dashLength}
                strokeDashoffset={r ? 0 : dashLength}
                style={{
                  transition: 'stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${500 + idx * 80}ms`,
                  filter: retailer.resolved
                    ? `drop-shadow(0 0 2px ${VITAL_GLOW})`
                    : 'none',
                }}
              />
              {/* End-point dot */}
              <circle
                cx={(cellW - 9)}
                cy={(() => {
                  const p = retailer.points;
                  const min = Math.min(...p);
                  const max = Math.max(...p);
                  const range = max - min || 1;
                  return cellH - 6 - ((p[p.length - 1] - min) / range) * (cellH - 16);
                })()}
                r={r ? 1.5 : 0}
                fill={color}
                style={{
                  transition: 'r 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${1300 + idx * 80}ms`,
                }}
              />
            </g>
          );
        })}

        {/* Legend bottom */}
        <g transform="translate(36, 170)">
          <rect width="6" height="2" fill={VITAL} y="-1" />
          <text x="10" y="2" fontSize="5" fill={VITAL} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
            8 OBJECTION RESOLVED
          </text>
          <rect x="120" width="6" height="2" fill={BONE_DIM} y="-1" />
          <text x="130" y="2" fontSize="5" fill={BONE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
            4 PENDING
          </text>
        </g>

        {/* Top label */}
        <text x={36} y={20} fontSize="5" fill={BONE_DEEP} fontFamily="ui-monospace, monospace" letterSpacing="0.6">
          WEEKLY VELOCITY · 4-WEEK PILOT WINDOW
        </text>
      </svg>
    </DashFrame>
  );
}

// ============================================================
// FRAME — shared chrome around every dashboard
// ============================================================
function DashFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bracket relative border border-bone-fade/40 bg-ink-900/30 p-5 md:p-6">
      <span className="bl" />
      <span className="br" />

      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-micro uppercase text-bone-deep flex items-center gap-2.5">
          <span className="status-dot" />
          <span className="tracking-[0.15em]">{title}</span>
        </div>
        <div className="font-mono text-micro uppercase text-bone-deep tabular">
          LIVE
        </div>
      </div>

      <div className="aspect-[16/9] w-full">{children}</div>

      <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase text-bone-deep tracking-[0.18em]">
        <span>SOURCE · ENGAGEMENT NOTES</span>
        <span>SCALED FOR ILLUSTRATION</span>
      </div>
    </div>
  );
}
