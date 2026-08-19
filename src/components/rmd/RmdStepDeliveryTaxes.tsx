import type { RmdFormState, BankChoice } from '../../types/rmd';
import { bankOptions } from '../../types/rmd';

interface Props {
  form: RmdFormState;
  onChange: (patch: Partial<RmdFormState>) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function RmdStepDeliveryTaxes({ form, onChange, onBack, onNext }: Props) {
  return (
    <div className="rmd-step-panel">
      <div className="rmd-card">
        <h2><span className="rmd-card-num">4</span>Schedule your distribution</h2>
        <div className="rmd-field-row">
          <div className="rmd-field">
            <label>Frequency</label>
            <select
              value={form.frequency}
              onChange={(e) => onChange({ frequency: e.target.value as RmdFormState['frequency'] })}
            >
              <option value="">Select...</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Semi-Annually</option>
              <option>Annually</option>
            </select>
          </div>
          <div className="rmd-field">
            <label>Start date</label>
            <input
              type="text"
              value={form.startDate}
              onChange={(e) => onChange({ startDate: e.target.value })}
            />
            <span className="rmd-helper">Dates on a weekend or NYSE holiday shift to the next business day.</span>
          </div>
        </div>

        <div className="rmd-toggle-row">
          <div className="rmd-ttext">
            <strong>Auto-renew each year</strong>
            <span>We'll automatically recalculate and continue your RMD annually — no need to re-enroll.</span>
          </div>
          <label className="rmd-switch">
            <input
              type="checkbox"
              checked={form.autoRenew}
              onChange={(e) => onChange({ autoRenew: e.target.checked })}
            />
            <span className="rmd-slider" />
          </label>
        </div>
      </div>

      <div className="rmd-card">
        <h2><span className="rmd-card-num">5</span>Tax withholding</h2>
        <div className="rmd-field-row">
          <div className="rmd-field">
            <label>
              Federal tax %
              <span className="rmd-tooltip-wrap">
                <span className="rmd-tip-icon" tabIndex={0}>?</span>
                <span className="rmd-tip-box">
                  Default withholding is 10%. You may elect 0–99%. Under-withholding may leave you responsible for
                  estimated tax payments — see IRS Form W-4R.
                </span>
              </span>
            </label>
            <input
              type="text"
              value={form.fedTaxPct}
              onChange={(e) => onChange({ fedTaxPct: Number(e.target.value.replace(/[^0-9.]/g, '')) || 0 })}
            />
          </div>
          <div className="rmd-field">
            <label>State tax %</label>
            <input type="text" value="0" disabled />
            <span className="rmd-helper">Texas does not require state withholding on IRA distributions.</span>
          </div>
        </div>
      </div>

      <div className="rmd-card">
        <h2><span className="rmd-card-num">6</span>How would you like to receive your distribution?</h2>
        {(Object.keys(bankOptions) as BankChoice[]).map((key) => {
          const opt = bankOptions[key];
          return (
            <label key={key} className={`rmd-bank-opt${form.bank === key ? ' selected' : ''}`}>
              <div className="rmd-bicon">{opt.icon}</div>
              <div className="rmd-btext">
                <strong>{opt.label}{opt.tag && <span className="rmd-tag">{opt.tag}</span>}</strong>
                <span>{opt.sub}</span>
              </div>
              <input
                type="radio"
                name="bank"
                checked={form.bank === key}
                onChange={() => onChange({ bank: key })}
              />
            </label>
          );
        })}
      </div>

      <div className="rmd-btn-row">
        <div className="rmd-left-actions">
          <button className="rmd-btn rmd-btn-ghost" onClick={onBack}>← Back</button>
          <button className="rmd-btn rmd-btn-cancel">Cancel</button>
        </div>
        <button className="rmd-btn rmd-btn-primary" onClick={onNext}>Continue to Review →</button>
      </div>
    </div>
  );
}
