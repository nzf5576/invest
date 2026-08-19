import type { Account } from '../../types';
import { formatCurrency } from '../../utils/format';

interface Props {
  account: Account;
  onCancel: () => void;
  onNext: () => void;
}

export default function RmdStepAccount({ account, onCancel, onNext }: Props) {
  return (
    <div className="rmd-step-panel">
      <div className="rmd-card">
        <h2><span className="rmd-card-num">1</span>Confirm your account</h2>
        <p className="rmd-card-desc">This RMD will be set up for the account below.</p>
        <div className="rmd-fund-card">
          <div className="rmd-fund-badge">IRA</div>
          <div className="rmd-fund-meta">
            <b>{account.registration.replace('*', 'XXXX')}</b>
            {account.owner}
          </div>
          <div className="rmd-fund-value">
            <div className="rmd-lbl">Current Value</div>
            <div className="rmd-val">{formatCurrency(account.value)}</div>
          </div>
        </div>
      </div>
      <div className="rmd-btn-row">
        <div className="rmd-left-actions">
          <button className="rmd-btn rmd-btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
        <button className="rmd-btn rmd-btn-primary" onClick={onNext}>Continue to Distribution Details →</button>
      </div>
    </div>
  );
}
