import type { Account } from '../../types';
import type { RmdFormState } from '../../types/rmd';
import { beneficiaryText, bankLabel, calcMethodLabel, fundSourceLabel, rolloverLabel } from './rmdHelpers';

interface Props {
  account: Account;
  form: RmdFormState;
  onChange: (patch: Partial<RmdFormState>) => void;
  onEditStep: (step: number) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function RmdStepReview({ account, form, onChange, onEditStep, onBack, onSubmit }: Props) {
  const ticker = account.holdings[0]?.ticker ?? '';

  return (
    <div className="rmd-step-panel">
      <div className="rmd-card">
        <h2><span className="rmd-card-num">✓</span>Review your RMD setup</h2>
        <p className="rmd-card-desc">Please confirm everything below is correct before submitting.</p>

        <div className="rmd-review-group">
          <div className="rmd-rghead">
            <h3>Account</h3>
            <button onClick={() => onEditStep(1)}>Edit</button>
          </div>
          <div className="rmd-rrow">
            <span className="rmd-k">Account</span>
            <span className="rmd-v">{account.registration.replace('*', 'XXXX')}</span>
          </div>
        </div>

        <div className="rmd-review-group">
          <div className="rmd-rghead">
            <h3>Distribution Details</h3>
            <button onClick={() => onEditStep(2)}>Edit</button>
          </div>
          <div className="rmd-rrow"><span className="rmd-k">Calculation method</span><span className="rmd-v">{calcMethodLabel(form.calcMethod)}</span></div>
          <div className="rmd-rrow"><span className="rmd-k">Beneficiary</span><span className="rmd-v">{beneficiaryText(form)}</span></div>
          <div className="rmd-rrow"><span className="rmd-k">Rollover this year</span><span className="rmd-v">{rolloverLabel(form)}</span></div>
          <div className="rmd-rrow"><span className="rmd-k">Fund source</span><span className="rmd-v">{fundSourceLabel(form.fundSource, ticker)}</span></div>
        </div>

        <div className="rmd-review-group">
          <div className="rmd-rghead">
            <h3>Schedule &amp; Taxes</h3>
            <button onClick={() => onEditStep(3)}>Edit</button>
          </div>
          <div className="rmd-rrow">
            <span className="rmd-k">Frequency</span>
            <span className="rmd-v">{form.frequency ? `${form.frequency} — starting ${form.startDate}` : 'Not set'}</span>
          </div>
          <div className="rmd-rrow"><span className="rmd-k">Auto-renew</span><span className="rmd-v">{form.autoRenew ? 'Yes' : 'No'}</span></div>
          <div className="rmd-rrow"><span className="rmd-k">Federal withholding</span><span className="rmd-v">{form.fedTaxPct}%</span></div>
          <div className="rmd-rrow"><span className="rmd-k">Delivery</span><span className="rmd-v">{bankLabel(form.bank)}</span></div>
        </div>

        <div className="rmd-consent-box">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => onChange({ consent: e.target.checked })}
          />
          <span>
            I authorize Victory Capital to calculate and distribute this Required Minimum Distribution according to
            the selections above until I modify or cancel this instruction. I understand Victory Capital does not
            provide tax advice.
          </span>
        </div>
      </div>

      <div className="rmd-btn-row">
        <div className="rmd-left-actions">
          <button className="rmd-btn rmd-btn-ghost" onClick={onBack}>← Back</button>
          <button className="rmd-btn rmd-btn-cancel">Cancel</button>
        </div>
        <button className="rmd-btn rmd-btn-primary" disabled={!form.consent} onClick={onSubmit}>
          Submit RMD Setup
        </button>
      </div>
    </div>
  );
}
