import type { Account } from '../../../types';
import { dividendsByAccount } from '../../../data/activity';
import { formatCurrency } from '../../../utils/format';

interface Props {
  account: Account;
}

export default function DividendsTab({ account }: Props) {
  const dividends = dividendsByAccount[account.id] ?? [];
  const totalPaid = dividends.reduce((sum, d) => sum + d.amount, 0);
  const totalReinvested = dividends.filter((d) => d.reinvested).reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Dividends &amp; Capital Gains</h2>
        <div className="card-actions">
          <span className="as-of">Trailing 12 months</span>
        </div>
      </div>

      <div className="card-pad" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, paddingBottom: 0 }}>
        <div className="summary-row" style={{ flexDirection: 'column', alignItems: 'flex-start', background: '#f8fafc', border: '1px solid var(--border-lt)', padding: 14 }}>
          <span className="summary-row-label">Total Paid</span>
          <span className="summary-row-value" style={{ fontSize: 18 }}>{formatCurrency(totalPaid)}</span>
        </div>
        <div className="summary-row" style={{ flexDirection: 'column', alignItems: 'flex-start', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: 14 }}>
          <span className="summary-row-label">Reinvested</span>
          <span className="summary-row-value" style={{ fontSize: 18, color: 'var(--green)' }}>{formatCurrency(totalReinvested)}</span>
        </div>
        <div className="summary-row" style={{ flexDirection: 'column', alignItems: 'flex-start', background: '#eef4fa', border: '1px solid var(--border-lt)', padding: 14 }}>
          <span className="summary-row-label">Paid to Cash</span>
          <span className="summary-row-value" style={{ fontSize: 18 }}>{formatCurrency(totalPaid - totalReinvested)}</span>
        </div>
      </div>

      <div style={{ overflowX: 'auto', marginTop: 18 }}>
        <table className="holdings-table" aria-label="Dividend and capital gain payments">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Fund</th>
              <th scope="col" className="right">Amount</th>
              <th scope="col">Election</th>
              <th scope="col" className="right">Shares Purchased</th>
            </tr>
          </thead>
          <tbody>
            {dividends.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '32px 22px', textAlign: 'center', color: 'var(--text-4)' }}>
                  No dividend activity on file for this account.
                </td>
              </tr>
            )}
            {dividends.map((d) => (
              <tr key={d.id} className="holding-row" style={{ cursor: 'default' }}>
                <td><div className="val-main">{d.date}</div></td>
                <td>
                  <div className="fund-name">{d.fundName}</div>
                  <div className="fund-ticker">{d.ticker}</div>
                </td>
                <td className="right"><div className="val-main" style={{ color: 'var(--green)' }}>{formatCurrency(d.amount)}</div></td>
                <td>
                  <span className="gain-badge" style={{ background: d.reinvested ? '#f0fdf4' : '#f1f5f9', color: d.reinvested ? 'var(--green)' : 'var(--text-3)' }}>
                    {d.reinvested ? 'Reinvested' : 'Paid to Cash'}
                  </span>
                </td>
                <td className="right"><div className="val-main">{d.sharesPurchased === null ? '—' : d.sharesPurchased.toFixed(2)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
