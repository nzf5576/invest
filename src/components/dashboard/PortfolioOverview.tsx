import { Link } from 'react-router-dom';
import { accountTypeSummaries, portfolioAsOf, portfolioTotalValue, portfolioYtdPct } from '../../data/mockData';
import { defaultAccountId } from '../../data/mockData';
import { formatCurrency, formatSignedPct } from '../../utils/format';

const backgroundByColor: Record<string, string> = {
  'var(--navy)': '#eef4ff',
  'var(--amber)': '#fffbeb',
  'var(--accent)': '#f4fbea',
  'var(--orange)': '#fff7ed',
};

const shadowByColor: Record<string, string> = {
  'var(--navy)': 'rgba(0,74,152,0.12)',
  'var(--amber)': 'rgba(217,119,6,0.12)',
  'var(--accent)': 'rgba(139,193,63,0.12)',
  'var(--orange)': 'rgba(232,119,34,0.12)',
};

export default function PortfolioOverview() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Portfolio Overview</h2>
        <Link className="card-link" to={`/account/${defaultAccountId}`}>View All Accounts →</Link>
      </div>
      <div className="card-pad" style={{ paddingTop: 16 }}>
        <div className="po-grid">
          {accountTypeSummaries.map((acc) => {
            const cardStyle = {
              '--po-color': acc.color,
              '--po-bg': backgroundByColor[acc.color] ?? '#f8fafc',
              '--po-shadow': shadowByColor[acc.color] ?? 'rgba(0,0,0,0.1)',
            } as React.CSSProperties;

            const pctLabel = !acc.hasHoldings ? '—' : acc.pctOfPortfolio < 0.1 ? '<0.1%' : `${acc.pctOfPortfolio}%`;

            const content = (
              <>
                <div className="po-card-accent" style={!acc.hasHoldings ? { opacity: 0.3 } : undefined} aria-hidden="true" />
                <div className="po-card-header">
                  <div className="po-card-label">
                    <div className="po-card-dot" style={!acc.hasHoldings ? { opacity: 0.4 } : undefined} aria-hidden="true" />
                    {acc.label}
                  </div>
                  <span className="po-card-arrow" aria-hidden="true">→</span>
                </div>
                <div className="po-card-value" style={!acc.hasHoldings ? { color: 'var(--text-4)' } : undefined}>
                  {formatCurrency(acc.value)}
                </div>
                <div className="po-card-sub">{acc.sub}</div>
                <div
                  className="po-bar-wrap"
                  role="progressbar"
                  aria-valuenow={Math.round(acc.pctOfPortfolio)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${acc.pctOfPortfolio}% of portfolio`}
                >
                  <div className="po-bar-fill" style={{ width: `${Math.max(acc.pctOfPortfolio, 0)}%` }} />
                </div>
                <div className="po-card-footer">
                  <span className="po-card-pct" style={!acc.hasHoldings ? { color: 'var(--text-4)' } : undefined}>{pctLabel}</span>
                  {acc.hasHoldings ? (
                    <span className="po-card-accounts">{acc.accountsCount} account{acc.accountsCount === 1 ? '' : 's'}</span>
                  ) : (
                    <span className="po-card-accounts" style={{ color: 'var(--orange)', fontWeight: 600 }}>+ Start investing</span>
                  )}
                </div>
              </>
            );

            return acc.key === 'victory-funds' ? (
              <Link key={acc.key} className="po-card" style={cardStyle} to={`/account/${defaultAccountId}`} aria-label={`${acc.label}: ${formatCurrency(acc.value)}, ${acc.pctOfPortfolio}% of portfolio`}>
                {content}
              </Link>
            ) : (
              <div key={acc.key} className="po-card" style={cardStyle} tabIndex={0} role="button" aria-label={`${acc.label}: ${formatCurrency(acc.value)}`}>
                {content}
              </div>
            );
          })}
        </div>

        <div className="po-total-row" aria-label={`Total portfolio value ${formatCurrency(portfolioTotalValue)}, up ${portfolioYtdPct}% year to date`}>
          <div>
            <div className="po-total-left">Total Portfolio Value</div>
            <div style={{ fontSize: 12, opacity: 0.5, marginTop: 2 }}>4 account types · As of {portfolioAsOf}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="po-total-value">{formatCurrency(portfolioTotalValue)}</div>
            <div className="po-total-pct">↑ {formatSignedPct(portfolioYtdPct)} YTD</div>
          </div>
        </div>
      </div>
    </div>
  );
}
