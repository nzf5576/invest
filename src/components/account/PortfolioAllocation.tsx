import { useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, type ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { Account } from '../../types';
import { formatCompactCurrency, formatCurrency, formatPct } from '../../utils/format';

ChartJS.register(ArcElement, Tooltip);

interface Props {
  account: Account;
}

const ALLOC_COLORS = ['#8BC13F', '#08A367', '#00A3AD', '#004a98', '#7B5EA7', '#94a3b8'];

export default function PortfolioAllocation({ account }: Props) {
  const [view, setView] = useState<'value' | 'category'>('value');

  const allocation = useMemo(() => {
    const held = account.holdings.filter((h) => h.value > 0);
    const sorted = [...held].sort((a, b) => b.value - a.value);
    const top = sorted.slice(0, 4);
    const rest = sorted.slice(4);
    const restTotal = rest.reduce((sum, h) => sum + h.value, 0);

    const groupByCategory = view === 'category';
    const rows: { label: string; value: number }[] = [];

    if (groupByCategory) {
      const byCategory = new Map<string, number>();
      held.forEach((h) => byCategory.set(h.category, (byCategory.get(h.category) ?? 0) + h.value));
      const catSorted = [...byCategory.entries()].sort((a, b) => b[1] - a[1]);
      catSorted.forEach(([label, value]) => rows.push({ label, value }));
    } else {
      top.forEach((h) => rows.push({ label: h.name.replace('Victory ', '').replace(' Fund', ''), value: h.value }));
      if (restTotal > 0) rows.push({ label: 'Other Holdings', value: restTotal });
    }

    return rows;
  }, [account, view]);

  const total = allocation.reduce((sum, r) => sum + r.value, 0);

  const chartData = {
    labels: allocation.map((r) => r.label),
    datasets: [
      {
        data: allocation.map((r) => r.value),
        backgroundColor: allocation.map((_, i) => ALLOC_COLORS[i % ALLOC_COLORS.length]),
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    cutout: '62%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${formatCurrency(ctx.parsed)}  (${((ctx.parsed / total) * 100).toFixed(1)}%)`,
        },
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Portfolio Allocation</h2>
        <div className="card-actions">
          <button
            className={`filter-chip${view === 'value' ? ' active' : ''}`}
            style={{ borderRadius: 20 }}
            onClick={() => setView('value')}
          >
            By Value
          </button>
          <button
            className={`filter-chip${view === 'category' ? ' active' : ''}`}
            style={{ borderRadius: 20 }}
            onClick={() => setView('category')}
          >
            By Category
          </button>
        </div>
      </div>

      <div className="card-pad">
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, alignItems: 'center', marginBottom: 20 }}>
          <div style={{ position: 'relative', height: 200 }}>
            <Doughnut data={chartData} options={chartOptions} aria-label="Portfolio allocation pie chart" role="img" />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-1)' }}>{formatCompactCurrency(total)}</div>
              <div style={{ fontSize: 10, color: 'var(--text-4)', fontWeight: 500 }}>Total</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} role="list" aria-label="Allocation legend">
            {allocation.map((r, i) => (
              <div role="listitem" style={{ display: 'flex', alignItems: 'center', gap: 10 }} key={r.label}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: ALLOC_COLORS[i % ALLOC_COLORS.length], flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{r.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{formatCompactCurrency(r.value)}</div>
                <div style={{ fontSize: 12, color: 'var(--text-4)', minWidth: 36, textAlign: 'right' }}>{formatPct((r.value / total) * 100)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid var(--border-lt)', paddingTop: 16 }}>
          {allocation.map((r, i) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} key={r.label}>
              <div style={{ fontSize: 12, color: 'var(--text-3)', width: 160, flexShrink: 0 }}>{r.label}</div>
              <div style={{ flex: 1, height: 7, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(r.value / total) * 100}%`, height: '100%', background: ALLOC_COLORS[i % ALLOC_COLORS.length], borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-4)', width: 36, textAlign: 'right' }}>{formatPct((r.value / total) * 100)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
