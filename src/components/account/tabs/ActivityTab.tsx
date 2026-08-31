import { useState } from 'react';
import type { Account, TransactionType } from '../../../types';
import { transactionsByAccount } from '../../../data/activity';
import { formatCurrency, formatSignedCurrency } from '../../../utils/format';

interface Props {
  account: Account;
}

type FilterKey = 'all' | TransactionType;

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Activity' },
  { key: 'Buy', label: 'Buys' },
  { key: 'Sell', label: 'Sells' },
  { key: 'Dividend', label: 'Dividends' },
  { key: 'Contribution', label: 'Contributions' },
  { key: 'Distribution', label: 'Distributions' },
];

const typeTagColor: Record<TransactionType, string> = {
  Buy: 'var(--green)',
  Sell: 'var(--orange)',
  Dividend: 'var(--teal)',
  Contribution: 'var(--navy)',
  Distribution: 'var(--amber)',
  Fee: 'var(--neutral)',
  Transfer: 'var(--purple)',
};

export default function ActivityTab({ account }: Props) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const transactions = transactionsByAccount[account.id] ?? [];
  const visible = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Account Activity</h2>
        <div className="card-actions">
          <span className="as-of">{transactions.length} transactions on file</span>
          <button className="card-action-btn" aria-label="Export activity as CSV">⬇️ Export</button>
        </div>
      </div>

      <div className="filter-row" role="group" aria-label="Filter activity">
        <span className="filter-label">Show:</span>
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-chip${filter === f.key ? ' active' : ''}`}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="holdings-table" aria-label="Account transactions">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Fund</th>
              <th scope="col" className="right">Shares</th>
              <th scope="col" className="right">Price</th>
              <th scope="col" className="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '32px 22px', textAlign: 'center', color: 'var(--text-4)' }}>
                  No transactions match this filter.
                </td>
              </tr>
            )}
            {visible.map((t) => (
              <tr key={t.id} className="holding-row" style={{ cursor: 'default' }}>
                <td><div className="val-main">{t.date}</div></td>
                <td>
                  <span className="gain-badge" style={{ background: '#f1f5f9', color: typeTagColor[t.type] }}>
                    {t.type}
                  </span>
                </td>
                <td>
                  <div className="fund-name">{t.fundName}</div>
                  {t.ticker !== '—' && <div className="fund-ticker">{t.ticker}</div>}
                </td>
                <td className="right"><div className="val-main">{t.shares === null ? '—' : Math.abs(t.shares).toLocaleString('en-US', { maximumFractionDigits: 2 })}</div></td>
                <td className="right"><div className="val-main">{t.price === null ? '—' : formatCurrency(t.price)}</div></td>
                <td className="right">
                  <div className="val-main" style={{ color: t.amount >= 0 ? 'var(--green)' : 'var(--text-1)' }}>
                    {formatSignedCurrency(t.amount)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="table-footer-note">Showing activity for the trailing 12 months.</div>
      </div>
    </div>
  );
}
