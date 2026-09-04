import { TF_LABELS, TF_ORDER, type Timeframe } from '../../data/performance';

interface AllTimeframesChartProps {
  values: number[];
  currentTf: Timeframe;
  isRisk?: boolean;
}

const WIDTH = 700;
const HEIGHT = 230;
const PAD_LEFT = 54;
const PAD_RIGHT = 18;
const PAD_TOP = 18;
const PAD_BOTTOM = 42;
const CHART_W = WIDTH - PAD_LEFT - PAD_RIGHT;
const CHART_H = HEIGHT - PAD_TOP - PAD_BOTTOM;

export default function AllTimeframesChart({ values, currentTf, isRisk = false }: AllTimeframesChartProps) {
  const currentIndex = TF_ORDER.indexOf(currentTf);
  let minV = Math.min(...values);
  let maxV = Math.max(...values);
  let range = maxV - minV;
  if (range === 0) range = Math.max(0.5, Math.abs(maxV) * 0.2 || 1);
  minV -= range * 0.25;
  maxV += range * 0.25;
  if (!isRisk) {
    if (minV > 0) minV = 0;
    if (maxV < 0) maxV = 0;
  }
  range = maxV - minV || 1;

  const xFor = (i: number) => PAD_LEFT + CHART_W * (TF_ORDER.length === 1 ? 0.5 : i / (TF_ORDER.length - 1));
  const yFor = (v: number) => PAD_TOP + CHART_H - ((v - minV) / range) * CHART_H;

  const ticks = 4;
  const gridlines = Array.from({ length: ticks + 1 }, (_, t) => {
    const v = minV + (range * t) / ticks;
    return { v, y: yFor(v), label: isRisk ? v.toFixed(2) : `${v.toFixed(1)}%` };
  });

  const linePoints = values.map((v, i) => `${xFor(i)},${yFor(v)}`).join(' ');
  const showZeroBaseline = !isRisk && minV < 0 && maxV > 0;

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="alltf-svg" role="img" aria-label="Performance across all timeframes">
      {gridlines.map((g, i) => (
        <g key={i}>
          <line x1={PAD_LEFT} x2={PAD_LEFT + CHART_W} y1={g.y} y2={g.y} stroke="var(--border)" strokeWidth={1} />
          <text x={PAD_LEFT - 8} y={g.y} textAnchor="end" dominantBaseline="middle" fontSize={10} fill="var(--text-4)">
            {g.label}
          </text>
        </g>
      ))}
      {showZeroBaseline && (
        <line x1={PAD_LEFT} x2={PAD_LEFT + CHART_W} y1={yFor(0)} y2={yFor(0)} stroke="var(--border)" strokeWidth={1.4} />
      )}
      <polyline
        points={`${PAD_LEFT},${PAD_TOP} ${PAD_LEFT},${PAD_TOP + CHART_H} ${PAD_LEFT + CHART_W},${PAD_TOP + CHART_H}`}
        fill="none"
        stroke="var(--text-4)"
        strokeWidth={1.2}
      />
      {TF_ORDER.map((tf, i) => (
        <text key={tf} x={xFor(i)} y={PAD_TOP + CHART_H + 18} textAnchor="middle" fontSize={10.5} fill="var(--text-2)">
          {TF_LABELS[tf]}
        </text>
      ))}
      <text x={PAD_LEFT + CHART_W / 2} y={HEIGHT - 4} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--navy)">
        Timeframe
      </text>
      <text
        x={13}
        y={PAD_TOP + CHART_H / 2}
        textAnchor="middle"
        fontSize={10.5}
        fontWeight={700}
        fill="var(--navy)"
        transform={`rotate(-90 13 ${PAD_TOP + CHART_H / 2})`}
      >
        {isRisk ? 'Sharpe Ratio' : 'Return (%)'}
      </text>
      <polyline points={linePoints} fill="none" stroke="var(--primary)" strokeWidth={2.4} />
      {values.map((v, i) => {
        const x = xFor(i);
        const y = yFor(v);
        const isCurrent = i === currentIndex;
        let color: string;
        if (isRisk) color = isCurrent ? 'var(--navy)' : 'var(--primary)';
        else color = v >= 0 ? (isCurrent ? 'var(--green)' : 'var(--accent)') : isCurrent ? 'var(--red)' : '#e79a9a';
        const above = isRisk ? true : v >= 0;
        const dispVal = isRisk ? v.toFixed(2) : `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={isCurrent ? 5.5 : 3.5} fill={color} stroke={isCurrent ? '#fff' : 'none'} strokeWidth={2} />
            <text
              x={x}
              y={above ? y - 9 : y + 13}
              textAnchor="middle"
              fontSize={isCurrent ? 10.5 : 10}
              fontWeight={isCurrent ? 700 : 400}
              fill={color}
            >
              {dispVal}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
