export function EKG({
  className = '',
  delay = 0,
  active = false,
}: {
  className?: string;
  delay?: number;
  active?: boolean;
}) {
  const path =
    'M 0 30 L 60 30 Q 70 30 75 26 Q 80 22 85 30 L 110 30 L 120 30 L 128 30 L 132 8 L 136 52 L 140 18 L 144 30 L 170 30 L 200 30 Q 215 30 222 22 Q 230 14 238 30 L 280 30 L 400 30';
  return (
    <svg className={className} viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden>
      <path
        d={path}
        fill="none"
        stroke={active ? 'var(--vital)' : 'rgba(234, 230, 221, 0.3)'}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ekg-line"
        style={{ animationDelay: `${delay}s` }}
      />
    </svg>
  );
}
