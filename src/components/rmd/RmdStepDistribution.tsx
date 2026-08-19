import type { Account } from '../../types';
import type { CalcMethod, FundSource, RmdFormState } from '../../types/rmd';
import { formatCurrency } from '../../utils/format';

interface Props {
  account: Account;
  form: RmdFormState;
  onChange: (patch: Partial<RmdFormState>) => void;
  onBack: () => void;
  onNext: () => void;
}

const calcOptions: { value: CalcMethod; title: string; desc: string }[] = [
  { value: 'victory', title: 'Let Victory Capital calculate it for me', desc: "Uses your prior year-end balance and IRS life expectancy tables." },
  { value: 'own', title: "I'll enter my own amount", desc: 'Set up a one-time or recurring distribution for a specific dollar amount.' },
  { value: 'unsure', title: "I'm not sure — I'd like to talk to someone", desc: "We'll connect you with a specialist." },
];

const fundOptions: { value: FundSource; title: string; desc: string }[] = [
  { value: 'proportionate', title: 'All funds, proportionately', desc: "Withdraw evenly based on each fund's share of the account." },
  { value: 'specific', title: 'Let me choose the fund', desc: 'Select a specific holding to withdraw from.' },
];

export default function RmdStepDistribution({ account, form, onChange, onBack, onNext }: Props) {
  const holding = account.holdings[0];

  return (
    <div className="rmd-step-panel">
      <div className="rmd-card">
        <h2><span className="rmd-card-num">2</span>How should we calculate your distribution?</h2>
        <p className="rmd-card-desc">Choose one option below — follow-up questions appear inline, only if relevant.</p>

        <div className="rmd-radio-group">
          {calcOptions.map((opt) => (
            <label key={opt.value} className={`rmd-radio-opt${form.calcMethod === opt.value ? ' selected' : ''}`}>
              <input
                type="radio"
                name="calc"
                checked={form.calcMethod === opt.value}
                onChange={() => onChange({ calcMethod: opt.value })}
              />
              <div className="rmd-rtext">
                <strong>{opt.title}</strong>
                <span>{opt.desc}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="rmd-inline-reveal">
          <div className="rmd-section-divider">Beneficiary Details</div>

          <div className="rmd-fund-card" style={{ marginBottom: 10, background: '#fafbfc' }}>
            <div className="rmd-fund-badge" style={{ background: 'var(--green)' }}>ON FILE</div>
            <div className="rmd-fund-meta">
              <b>TEST TEST</b>
              Relationship: Spouse &nbsp;·&nbsp; Distribution: 100%
            </div>
            <div className="rmd-fund-value">
              <a href="#">Manage beneficiaries</a>
            </div>
          </div>
          <span className="rmd-helper" style={{ display: 'block', marginBottom: 14 }}>
            The questions below are pre-filled using this beneficiary information on file. If something has changed,
            you can update the answers directly — just be sure to also update your{' '}
            <a href="#" style={{ color: 'var(--primary)' }}>beneficiary designation</a>.
          </span>

          <div className="rmd-field-row rmd-field-row-single">
            <div className="rmd-field">
              <label>
                Is your spouse your sole primary beneficiary?
                <span className="rmd-prefill-tag">Auto-filled from beneficiary on file</span>
              </label>
              <select
                value={form.spouseSole}
                onChange={(e) => onChange({ spouseSole: e.target.value as RmdFormState['spouseSole'] })}
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {form.spouseSole === 'yes' && (
            <div className="rmd-field-row rmd-field-row-single">
              <div className="rmd-field">
                <label>
                  Is your spouse more than 10 years younger than you?
                  <span className="rmd-prefill-tag">Calculated from birth dates on file</span>
                  <span className="rmd-tooltip-wrap">
                    <span className="rmd-tip-icon" tabIndex={0}>?</span>
                    <span className="rmd-tip-box">
                      This determines whether we use the IRS Joint Life and Last Survivor Table instead of the
                      Uniform Lifetime Table.
                    </span>
                  </span>
                </label>
                <select
                  value={form.spouseOlderThan10}
                  onChange={(e) => onChange({ spouseOlderThan10: e.target.value as RmdFormState['spouseOlderThan10'] })}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          )}

          {form.spouseSole === 'no' && (
            <div className="rmd-field-row rmd-field-row-single">
              <div className="rmd-field">
                <label>Is your primary beneficiary a trust?</label>
                <select
                  value={form.trustBeneficiary}
                  onChange={(e) => onChange({ trustBeneficiary: e.target.value as RmdFormState['trustBeneficiary'] })}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          )}

          <div className="rmd-section-divider">Rollovers &amp; Transfers</div>
          <div className="rmd-field-row">
            <div className="rmd-field">
              <label>Any rollovers or transfers into this account this year?</label>
              <select
                value={form.rolloverThisYear ? 'Yes' : 'No'}
                onChange={(e) => onChange({ rolloverThisYear: e.target.value === 'Yes' })}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div className="rmd-field" style={{ opacity: form.rolloverThisYear ? 1 : 0.35 }}>
              <label>
                Transfer / rollover amount
                <span className="rmd-tooltip-wrap">
                  <span className="rmd-tip-icon" tabIndex={0}>?</span>
                  <span className="rmd-tip-box">
                    Fair market value (FMV) of the transfer as of December 31 of the previous year.
                  </span>
                </span>
              </label>
              <input
                type="text"
                disabled={!form.rolloverThisYear}
                value={formatCurrency(form.rolloverAmount)}
                onChange={(e) => onChange({ rolloverAmount: Number(e.target.value.replace(/[^0-9.]/g, '')) || 0 })}
              />
            </div>
          </div>

          <div className="rmd-section-divider">Prior Year-End Balance</div>
          <div className="rmd-field-row rmd-field-row-single">
            <div className="rmd-field">
              <label>2025 year-end balance <span className="rmd-prefill-tag">Pre-filled from your account</span></label>
              <input
                type="text"
                value={formatCurrency(form.priorYearBalance)}
                onChange={(e) => onChange({ priorYearBalance: Number(e.target.value.replace(/[^0-9.]/g, '')) || 0 })}
              />
              <span className="rmd-helper">Doesn't look right? You can edit this value directly.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rmd-card">
        <h2><span className="rmd-card-num">3</span>Which fund should we withdraw from?</h2>
        <div className="rmd-radio-group">
          {fundOptions.map((opt) => (
            <label key={opt.value} className={`rmd-radio-opt${form.fundSource === opt.value ? ' selected' : ''}`}>
              <input
                type="radio"
                name="fund"
                checked={form.fundSource === opt.value}
                onChange={() => onChange({ fundSource: opt.value })}
              />
              <div className="rmd-rtext">
                <strong>{opt.title}</strong>
                <span>{opt.desc}</span>
              </div>
            </label>
          ))}
        </div>
        {holding && (
          <div className="rmd-fund-card" style={{ marginTop: 14 }}>
            <div className="rmd-fund-badge">{holding.ticker}</div>
            <div className="rmd-fund-meta">
              <b>{holding.name}</b>
              Sole holding in this account
            </div>
            <div className="rmd-fund-value">
              <div className="rmd-lbl">Current Value</div>
              <div className="rmd-val">{formatCurrency(holding.value)}</div>
            </div>
          </div>
        )}
      </div>

      <div className="rmd-btn-row">
        <div className="rmd-left-actions">
          <button className="rmd-btn rmd-btn-ghost" onClick={onBack}>← Back</button>
          <button className="rmd-btn rmd-btn-cancel">Cancel</button>
        </div>
        <button className="rmd-btn rmd-btn-primary" onClick={onNext}>Continue to Delivery &amp; Taxes →</button>
      </div>
    </div>
  );
}
