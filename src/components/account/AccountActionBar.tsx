import { Link } from 'react-router-dom';
import type { Account } from '../../types';
import { formatCurrency, formatSignedCurrency, formatSignedPct } from '../../utils/format';
import { portfolioAsOf } from '../../data/mockData';

interface Props {
  account: Account;
  onActivityClick: () => void;
}

export default function AccountActionBar({ account, onActivityClick }: Props) {
  return (
    <div className="account-action-bar" role="region" aria-label="Account navigation and actions">
      <div className="account-action-inner">
        <div className="account-action-top">
          <div className="account-identity">
            <div className="account-icon-box" aria-hidden="true">🗂️</div>
            <div>
              <h2 className="account-id-name">{account.registration}</h2>
              <div className="account-id-sub">{account.typeLabel} · Reg. {account.regNumber}</div>
            </div>
            <button className="account-nickname-btn" aria-label="Add nickname to this account">✏️ Add Nickname</button>
          </div>
          <div className="account-btns">
            <button className="btn-outline" aria-label="Download account data">📥 Download</button>
            <button className="btn-outline" aria-label="View account activity" onClick={onActivityClick}>📋 Activity</button>
            <Link className="btn-trade" to={`/trade/${account.id}`} aria-label="Place a trade" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              💱 Place a Trade
            </Link>
          </div>
        </div>

        <div className="account-action-bottom" role="navigation" aria-label="Breadcrumb and account stats">
          <div className="acct-breadcrumb" aria-label="Breadcrumb">
            <Link to="/dashboard">Home</Link>
            <span className="acct-breadcrumb-sep" aria-hidden="true">›</span>
            <Link to="/dashboard">My Portfolio</Link>
            <span className="acct-breadcrumb-sep" aria-hidden="true">›</span>
            <span className="acct-breadcrumb-current" aria-current="page">{account.registration}</span>
          </div>

          <div className="acct-stats" role="list" aria-label="Account statistics">
            <div className="acct-stat" role="listitem">
              <div className="acct-stat-label">Account Value</div>
              <div className="acct-stat-value">{formatCurrency(account.value)}</div>
              <div className="acct-stat-sub" style={{ color: 'var(--text-4)' }}>{portfolioAsOf}</div>
            </div>
            <div className="acct-stat" role="listitem">
              <div className="acct-stat-label">Cost Basis</div>
              <div className="acct-stat-value">{formatCurrency(account.costBasis)}</div>
              <div className="acct-stat-sub" style={{ color: 'var(--text-4)' }}>{account.holdings.length} funds</div>
            </div>
            <div className="acct-stat" role="listitem">
              <div className="acct-stat-label">Est. Gain / Loss</div>
              <div className="acct-stat-value cs-up">{formatSignedCurrency(account.estGain)}</div>
              <div className="acct-stat-sub cs-up">{formatSignedPct(account.estGainPct)} total return</div>
            </div>
            <div className="acct-stat" role="listitem">
              <div className="acct-stat-label">1-Day Change</div>
              <div className="acct-stat-value cs-down">{formatSignedCurrency(account.oneDayChange)}</div>
              <div className="acct-stat-sub cs-down">{formatSignedPct(account.oneDayChangePct)} today</div>
            </div>
            <div className="acct-stat" role="listitem">
              <div className="acct-stat-label">Holdings</div>
              <div className="acct-stat-value">{account.holdings.length} Funds</div>
              <div className="acct-stat-sub" style={{ color: 'var(--text-4)' }}>Individual account</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
