import { formatCurrency } from '../../utils/format';

export default function YtdTracker() {
  return (
    <div className="sidebar-card">
      <div className="sidebar-card-title">📊 YTD Activity Tracker</div>

      <div className="ytd-row">
        <span className="ytd-item-label">YTD Contributions</span>
        <span className="ytd-item-value" style={{ color: 'var(--green)' }}>{formatCurrency(12500)}</span>
      </div>
      <div className="progress-bar-wrap" role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} aria-label="YTD contributions 67% of limit">
        <div className="progress-bar-fill" style={{ width: '67%', background: 'var(--green)' }} />
      </div>

      <div className="ytd-row">
        <span className="ytd-item-label">YTD Withdrawals</span>
        <span className="ytd-item-value" style={{ color: 'var(--orange)' }}>{formatCurrency(3200)}</span>
      </div>
      <div className="progress-bar-wrap" role="progressbar" aria-valuenow={22} aria-valuemin={0} aria-valuemax={100} aria-label="YTD withdrawals 22% of limit">
        <div className="progress-bar-fill" style={{ width: '22%', background: 'var(--orange)' }} />
      </div>

      <div className="ytd-row">
        <span className="ytd-item-label" style={{ fontSize: 11, color: 'var(--text-4)' }}>IRA Limit Remaining</span>
        <span className="ytd-item-value" style={{ color: 'var(--navy)', fontSize: 12 }}>$4,500 of $7,000</span>
      </div>
      <div className="progress-bar-wrap" role="progressbar" aria-valuenow={36} aria-valuemin={0} aria-valuemax={100} aria-label="36% of IRA contribution limit used">
        <div className="progress-bar-fill" style={{ width: '36%', background: 'var(--navy)' }} />
      </div>
    </div>
  );
}
