import { Link } from 'react-router-dom';
import type { Account } from '../../types';
import { formatCurrency, formatSignedCurrency } from '../../utils/format';

interface Props {
  account: Account;
}

const manageServices = [
  { icon: '🔄', label: 'Automatic Investing', bg: '#eef4ff' },
  { icon: '📤', label: 'Automatic Withdrawal', bg: '#fff7ed' },
  { icon: '💰', label: 'Dividends & Capital Gains', bg: '#f0fdf4' },
  { icon: '🏦', label: 'Bank Accounts', bg: '#f4fbea' },
];

const managePreferences = [
  { icon: '📄', label: 'Document Preferences', bg: '#faf5ff' },
  { icon: '📞', label: 'Phone & Email', bg: '#f0f7ff' },
  { icon: '📬', label: 'Mailing Address', bg: '#fffbeb' },
];

export default function AccountSidebar({ account }: Props) {
  const isIra = account.regNumber.startsWith('IRA');

  return (
    <div className="sidebar" role="complementary" aria-label="Account management">
      {isIra && (
        <div className="sidebar-card">
          <div className="sidebar-card-title">📤 Required Minimum Distribution</div>
          <Link className="manage-link" to={`/rmd/${account.id}`} style={{ marginBottom: 0 }}>
            <div className="manage-link-icon" style={{ background: '#fff7ed' }} aria-hidden="true">📤</div>
            Set Up Required Minimum Distribution
            <span className="manage-link-arrow" aria-hidden="true">›</span>
          </Link>
        </div>
      )}

      <div className="sidebar-card">
        <div className="sidebar-card-title">📊 Account Summary</div>
        <div className="summary-row" style={{ background: '#f8fafc', border: '1px solid var(--border-lt)' }}>
          <span className="summary-row-label">Current Value</span>
          <span className="summary-row-value">{formatCurrency(account.value)}</span>
        </div>
        <div className="summary-row" style={{ background: '#f8fafc', border: '1px solid var(--border-lt)' }}>
          <span className="summary-row-label">Total Cost Basis</span>
          <span className="summary-row-value">{formatCurrency(account.costBasis)}</span>
        </div>
        <div className="summary-row" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <span className="summary-row-label">Est. Total Gain</span>
          <span className="summary-row-value" style={{ color: 'var(--green)' }}>{formatSignedCurrency(account.estGain)}</span>
        </div>
        <div className="summary-row" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
          <span className="summary-row-label">1-Day Change</span>
          <span className="summary-row-value" style={{ color: 'var(--orange)' }}>{formatSignedCurrency(account.oneDayChange)}</span>
        </div>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-card-title">⚙️ Manage Services</div>
        {manageServices.map((s) => (
          <button className="manage-link" key={s.label}>
            <div className="manage-link-icon" style={{ background: s.bg }} aria-hidden="true">{s.icon}</div>
            {s.label}
            <span className="manage-link-arrow" aria-hidden="true">›</span>
          </button>
        ))}
      </div>

      <div className="sidebar-card">
        <div className="sidebar-card-title">🎛️ Manage Preferences</div>
        {managePreferences.map((s) => (
          <button className="manage-link" key={s.label}>
            <div className="manage-link-icon" style={{ background: s.bg }} aria-hidden="true">{s.icon}</div>
            {s.label}
            <span className="manage-link-arrow" aria-hidden="true">›</span>
          </button>
        ))}
      </div>

      <div className="sidebar-card">
        <div className="sidebar-card-title">ℹ️ Account Details</div>
        <div className="detail-row">
          <div className="detail-key">Registration</div>
          <div className="detail-val">{account.registration}</div>
        </div>
        <div className="detail-row">
          <div className="detail-key">Reg. Number</div>
          <div className="detail-val">{account.regNumber}</div>
        </div>
        <div className="detail-row">
          <div className="detail-key">Account Type</div>
          <div className="detail-val">{account.typeLabel}</div>
        </div>
        <div className="detail-row">
          <div className="detail-key">Account Owner</div>
          <div className="detail-val">{account.owner}</div>
        </div>
        <div className="detail-row">
          <div className="detail-key">Address</div>
          <div className="detail-val">
            {account.address.map((line, i) => (
              <span key={line}>
                {line}
                {i < account.address.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-key">Open Date</div>
          <div className="detail-val">{account.openDate}</div>
        </div>
        <div className="detail-row">
          <div className="detail-key">Status</div>
          <div className="detail-val" style={{ color: 'var(--green)' }}>● {account.status}</div>
        </div>
        <div className="detail-row">
          <div className="detail-key">Lot Relief Method</div>
          <div className="detail-val">{account.lotReliefMethod}</div>
        </div>
      </div>
    </div>
  );
}
