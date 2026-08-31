import { Chart as ChartJS, CategoryScale, Filler, LinearScale, LineElement, PointElement, Tooltip, type ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Account } from '../../../types';
import { performanceByAccount, performanceStatsByAccount } from '../../../data/activity';
import { formatSignedPct } from '../../../utils/format';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

interface Props {
  account: Account;
}

export default function PerformanceTab({ account }: Props) {
  const series = performanceByAccount[account.id] ?? [];
  const stats = performanceStatsByAccount[account.id];

  const chartData = {
    labels: series.map((p) => p.label),
    datasets: [
      {
        label: 'Indexed Value',
        data: series.map((p) => p.value),
        borderColor: '#004a98',
        backgroundColor: 'rgba(0,74,152,0.08)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: '#004a98',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` Indexed value: ${Number(ctx.parsed.y).toFixed(1)}`,
        },
      },
    },
    scales: {
      y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
    },
  };

  const statRows = stats
    ? [
        { label: 'YTD', value: stats.ytd },
        { label: '1 Year', value: stats.oneYear },
        { label: '3 Year', value: stats.threeYear },
        { label: '5 Year', value: stats.fiveYear },
        { label: 'Since Inception', value: stats.sinceInception },
      ]
    : [];

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Performance</h2>
        <div className="card-actions">
          <span className="as-of">Trailing 12 months, indexed to 100</span>
        </div>
      </div>

      <div className="card-pad">
        <div style={{ height: 260 }}>
          <Line data={chartData} options={chartOptions} aria-label="Account performance over the trailing 12 months" role="img" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${statRows.length}, 1fr)`, gap: 12, marginTop: 24 }}>
          {statRows.map((s) => (
            <div key={s.label} className="summary-row" style={{ flexDirection: 'column', alignItems: 'flex-start', background: '#f8fafc', border: '1px solid var(--border-lt)', padding: 14 }}>
              <span className="summary-row-label">{s.label}</span>
              <span className="summary-row-value" style={{ fontSize: 17, color: s.value >= 0 ? 'var(--green)' : 'var(--orange)' }}>
                {formatSignedPct(s.value)}
              </span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11.5, color: 'var(--text-4)', marginTop: 18, lineHeight: 1.6 }}>
          Performance shown is time-weighted and net of fees. Past performance is not a guarantee of future results.
        </p>
      </div>
    </div>
  );
}
