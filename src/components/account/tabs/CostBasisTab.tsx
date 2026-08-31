import { useState } from 'react';
import type { Account } from '../../../types';
import { costBasisByAccount } from '../../../data/activity';
import { formatCurrency, formatSignedCurrency } from '../../../utils/format';

interface Props {
  account: Account;
}

type FilterKey = 'all' | 'Short-Term' | 'Long-Term';

export default function CostBasisTab({ account }: Props) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const lots = costBasisByAccount[account.id] ?? [];
  const visible = filter === 'all' ? lots : lots.filter((l) => l.term === filter);

  const totalCost = visible.reduce((sum, l) => sum + l.costBasis, 0);
  const totalValue = visible.reduce((sum, l) => sum + l.currentValue, 0);
  const totalGain = visible.reduce((sum, l) => sum + l.gainLoss, 0);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Cost Basis by Lot</h2>
        <div className="card-actions">
          <span className="as-of">Method: {account.lotReliefMethod}</span>
          <button className="card-action-btn" aria-label="Export cost basis as CSV">⬇️ Export</button>
        </div>
      </div>

      <div className="filter-row" role="group" aria-label="Filter lots">
        <span className="filter-label">Show:</span>
        {(['all', 'Short-Term', 'Long-Term'] as FilterKey[]).map((f) => (
          <button
            key={f}
            className={`filter-chip${filter === f ? ' active' : ''}`}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Lots' : f}
          </button>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="holdings-table" aria-label="Cost basis lots">
          <thead>
            <tr>
              <th scope="col">Fund</th>
              <th scope="col">Acquired</th>
              <th scope="col">Term</th>
              <th scope="col" className="right">Shares</th>
              <th scope="col" className="right">Cost Basis</th>
              <th scope="col" className="right">Current Value</th>
              <th scope="col" className="right">Gain / Loss</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '32px 22px', textAlign: 'center', color: 'var(--text-4)' }}>
                  No lots match this filter.
                </td>
              </tr>
            )}
            {visible.map((l) => (
              <tr key={l.id} className="holding-row" style={{ cursor: 'default' }}>
                <td>
                  <div className="fund-name">{l.fundName}</div>
                  <div className="fund-ticker">{l.ticker}</div>
                </td>
                <td><div className="val-main">{l.acquireDate}</div></td>
                <td>
                  <span className="gain-badge" style={{ background: l.term === 'Long-Term' ? '#eef4fa' : '#fff7ed', color: l.term === 'Long-Term' ? 'var(--navy)' : 'var(--orange)' }}>
                    {l.term}
                  </span>
                </td>
                <td className="right"><div className="val-main">{l.shares.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div></td>
                <td className="right"><div className="val-main">{formatCurrency(l.costBasis)}</div></td>
                <td className="right"><div className="val-main">{formatCurrency(l.currentValue)}</div></td>
                <td className="right">
                  <span className={`gain-badge ${l.gainLoss >= 0 ? 'pos' : 'neg'}`}>
                    {l.gainLoss >= 0 ? '▲' : '▼'} {formatSignedCurrency(l.gainLoss)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="table-footer-total">
          Total Cost Basis: {formatCurrency(totalCost)} &nbsp;·&nbsp; Current Value: {formatCurrency(totalValue)}
        </div>
        <div className="table-footer-note" style={{ color: totalGain >= 0 ? 'var(--green)' : 'var(--orange)', fontWeight: 700 }}>
          Net {totalGain >= 0 ? 'Gain' : 'Loss'}: {formatSignedCurrency(totalGain)}
        </div>
      </div>
    </div>
  );
}
