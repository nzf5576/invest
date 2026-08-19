import type { Account } from '../../types';
import type { RmdFormState } from '../../types/rmd';
import { bankLabel } from './rmdHelpers';
import { formatCurrency } from '../../utils/format';

interface Props {
  account: Account;
  form: RmdFormState;
  confirmationNumber: string;
  estimatedAmount: number;
}

export default function RmdConfirmation({ account, form, confirmationNumber, estimatedAmount }: Props) {
  return (
    <div className="rmd-step-panel">
      <div className="rmd-card rmd-confirm-wrap">
        <div className="rmd-confirm-check">✓</div>
        <h2>Your RMD has been set up</h2>
        <p>
          You'll receive a confirmation email, and this account will now appear under "My Distributions" going
          forward.
        </p>
        <div className="rmd-confirm-details">
          <div className="rmd-crow"><span className="rmd-k">Confirmation #</span><span className="rmd-v">{confirmationNumber}</span></div>
          <div className="rmd-crow"><span className="rmd-k">Account</span><span className="rmd-v">XXXX{account.id}</span></div>
          <div className="rmd-crow"><span className="rmd-k">Next distribution</span><span className="rmd-v">{form.startDate}</span></div>
          <div className="rmd-crow"><span className="rmd-k">Estimated amount</span><span className="rmd-v">{formatCurrency(estimatedAmount)}</span></div>
          <div className="rmd-crow"><span className="rmd-k">Delivery to</span><span className="rmd-v">{bankLabel(form.bank)}</span></div>
        </div>
      </div>
    </div>
  );
}
