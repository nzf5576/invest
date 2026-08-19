import { Fragment, useState } from 'react';
import type { Account, Holding } from '../../types';
import { formatCurrency, formatSignedCurrency, formatSignedPct } from '../../utils/format';

interface Props {
  account: Account;
}

type FilterKey = 'all' | 'gains' | 'losses' | 'cornerstone';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Funds' },
  { key: 'gains', label: 'Gains' },
  { key: 'losses', label: 'Losses' },
  { key: 'cornerstone', label: 'Cornerstone' },
];

function matchesFilter(h: Holding, filter: FilterKey): boolean {
  switch (filter) {
    case 'gains':
      return (h.gainLoss ?? 0) > 0;
    case 'losses':
      return (h.gainLoss ?? 0) < 0;
    case 'cornerstone':
      return h.name.toLowerCase().includes('cornerstone');
    default:
      return true;
  }
}

export default function HoldingsTable({ account }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [search, setSearch] = useState('');

  const netGain = account.holdings.reduce((sum, h) => sum + (h.gainLoss ?? 0), 0);

  const visibleHoldings = account.holdings.filter((h) => {
    if (!matchesFilter(h, filter)) return false;
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.ticker.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Fund Holdings</h2>
        <div className="card-actions">
          <span className="as-of">Market close · July 23, 2026</span>
          <button className="card-action-btn" aria-label="Export holdings data">⬇️ Export</button>
          <button className="card-action-btn" aria-label="Compare funds">⚖️ Compare Funds</button>
        </div>
      </div>

      <div className="filter-row" role="group" aria-label="Filter holdings">
        <span className="filter-label" id="filter-label">Show:</span>
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-chip${filter === f.key ? ' active' : ''}`}
            aria-pressed={filter === f.key}
            aria-describedby="filter-label"
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
        <label htmlFor="fund-search" className="sr-only">Search funds</label>
        <input
          id="fund-search"
          className="search-input"
          type="search"
          placeholder="🔍  Search funds..."
          aria-label="Search funds"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ overflowX: 'auto' }} role="region" aria-label="Fund holdings table">
        <table className="holdings-table" aria-label="Fund holdings">
          <thead>
            <tr>
              <th scope="col" style={{ width: 36 }}><span className="sr-only">Expand</span></th>
              <th scope="col">Fund</th>
              <th scope="col" className="right">NAV</th>
              <th scope="col" className="right">1-Day Change</th>
              <th scope="col" className="right">Shares</th>
              <th scope="col" className="right">Current Value</th>
              <th scope="col" className="right">Cost Basis</th>
              <th scope="col" className="right">Est. Gain / Loss</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((h) => {
              const isExpanded = expandedId === h.id;
              const hasShares = h.shares > 0;
              return (
                <Fragment key={h.id}>
                  <tr
                    className="holding-row"
                    onClick={() => setExpandedId(isExpanded ? null : h.id)}
                    aria-expanded={isExpanded}
                  >
                    <td>
                      <button
                        className="expand-btn"
                        aria-label={`Expand ${h.name} details`}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? '▼' : '▶'}
                      </button>
                    </td>
                    <td>
                      <div className="fund-name-cell">
                        <div className="fund-dot" style={{ background: h.color }} aria-hidden="true" />
                        <div>
                          <div className="fund-name">{h.name}</div>
                          <div className="fund-ticker">{h.ticker} · {h.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="right"><div className="val-main">{formatCurrency(h.nav)}</div></td>
                    <td className="right">
                      <div className="change-down" aria-label={`Down ${formatCurrency(Math.abs(h.changeAmt))}, ${formatSignedPct(h.changePct)}`}>
                        {formatSignedCurrency(h.changeAmt)} ({formatSignedPct(h.changePct)})
                      </div>
                    </td>
                    <td className="right"><div className={`val-main${hasShares ? '' : ' val-muted'}`}>{h.shares.toLocaleString('en-US', { minimumFractionDigits: hasShares ? 0 : 3 })}</div></td>
                    <td className="right"><div className={`val-main${hasShares ? '' : ' val-muted'}`}>{formatCurrency(h.value)}</div></td>
                    <td className="right"><div className={`val-main${hasShares ? '' : ' val-muted'}`}>{formatCurrency(h.costBasis)}</div></td>
                    <td className="right">
                      {h.gainLoss === null ? (
                        <span style={{ color: 'var(--text-4)', fontSize: 13 }} aria-label="No gain or loss">—</span>
                      ) : (
                        <span
                          className={`gain-badge ${h.gainLoss >= 0 ? 'pos' : 'neg'}`}
                          aria-label={`${h.gainLoss >= 0 ? 'Gain' : 'Loss'} of ${formatCurrency(Math.abs(h.gainLoss))}`}
                        >
                          {h.gainLoss >= 0 ? '▲' : '▼'} {formatSignedCurrency(h.gainLoss)}
                        </span>
                      )}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="expanded-row" aria-hidden="false">
                      <td colSpan={8}>
                        <div className="expanded-content">
                          <div>
                            <div className="expanded-item-label">Account #</div>
                            <div className="expanded-item-value" style={{ fontSize: 13 }}>{h.accountNumber}</div>
                          </div>
                          <div>
                            <div className="expanded-item-label">1-Day Acct Change</div>
                            <div className="expanded-item-value change-down">
                              {hasShares ? `${formatSignedCurrency(h.value * (h.changePct / 100))} (${formatSignedPct(h.changePct)})` : '$0.00'}
                            </div>
                          </div>
                          <div>
                            <div className="expanded-item-label">Unrealized G/L</div>
                            <div className="expanded-item-value" style={{ color: h.gainLoss === null ? 'var(--text-4)' : h.gainLoss >= 0 ? 'var(--green)' : 'var(--orange)' }}>
                              {h.gainLoss === null ? '—' : formatSignedCurrency(h.gainLoss)}
                            </div>
                          </div>
                          <div>
                            <div className="expanded-item-label">Total Return</div>
                            <div className="expanded-item-value" style={{ color: h.gainLoss === null ? 'var(--text-4)' : h.gainLoss >= 0 ? 'var(--green)' : 'var(--orange)' }}>
                              {h.gainLoss === null || h.costBasis === 0 ? '—' : formatSignedPct((h.gainLoss / h.costBasis) * 100)}
                            </div>
                          </div>
                          <div className="expanded-actions">
                            <button className="mini-btn mini-btn-buy">{hasShares ? '+ Buy More' : '+ Start Investing'}</button>
                            {hasShares && <button className="mini-btn mini-btn-sell">− Sell / Redeem</button>}
                            <button className="mini-btn mini-btn-detail">📈 Fund Detail</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="table-footer-total">
          Total: {formatCurrency(account.value)} &nbsp;·&nbsp;{' '}
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>
            Net Gain: {formatSignedCurrency(netGain)} ({formatSignedPct(account.estGainPct)})
          </span>
        </div>
        <div className="table-footer-note">*Value as of market close on July 23, 2026</div>
      </div>
    </div>
  );
}
