import type { Account } from '../../types';
import type { RmdFormState } from '../../types/rmd';
import { formatCurrency } from '../../utils/format';
import { beneficiaryText, bankLabel, calcMethodLabel, fundSourceLabel, rolloverLabel } from './rmdHelpers';

interface Props {
  account: Account;
  form: RmdFormState;
  estimatedAmount: number;
}

export default function RmdSummarySidebar({ account, form, estimatedAmount }: Props) {
  const ticker = account.holdings[0]?.ticker ?? '';
  const freqText = form.frequency ? `${form.frequency} — starting ${form.startDate}` : null;

  return (
    <div className="rmd-summary">
      <h3>Your RMD Summary</h3>
      <div className="rmd-row">
        <span className="rmd-k"><span className="rmd-check">✓</span>Account</span>
        <span className="rmd-v">{account.registration.replace('*', 'XXXX')}</span>
      </div>
      <div className="rmd-row">
        <span className="rmd-k"><span className="rmd-check">✓</span>Calculation</span>
        <span className="rmd-v">{calcMethodLabel(form.calcMethod)}</span>
      </div>
      <div className="rmd-row">
        <span className="rmd-k"><span className="rmd-check">✓</span>Beneficiary</span>
        <span className="rmd-v">{beneficiaryText(form)}</span>
      </div>
      <div className="rmd-row">
        <span className="rmd-k"><span className="rmd-check">✓</span>Rollover this year</span>
        <span className="rmd-v">{rolloverLabel(form)}</span>
      </div>
      <div className="rmd-row">
        <span className="rmd-k"><span className="rmd-check">✓</span>Fund source</span>
        <span className="rmd-v">{fundSourceLabel(form.fundSource, ticker)}</span>
      </div>
      <div className="rmd-row">
        <span className="rmd-k">Frequency</span>
        <span className={`rmd-v${freqText ? '' : ' pending'}`}>{freqText ?? 'Not set yet'}</span>
      </div>
      <div className="rmd-row">
        <span className="rmd-k">Tax withholding</span>
        <span className="rmd-v">Federal {form.fedTaxPct}% / State 0%</span>
      </div>
      <div className="rmd-row">
        <span className="rmd-k">Delivery method</span>
        <span className="rmd-v">{bankLabel(form.bank)}</span>
      </div>

      <div className="rmd-est-box">
        <div className="rmd-amt">≈ {formatCurrency(estimatedAmount)}</div>
        <div className="rmd-lbl">Estimated 2026 RMD (updates live as you answer)</div>
      </div>
    </div>
  );
}
