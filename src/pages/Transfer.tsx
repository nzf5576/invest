import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { accounts, defaultAccountId } from '../data/mockData';
import { initialTransferFormState } from '../types/flows';
import type { TransferFormState } from '../types/flows';
import FlowProgressTrack from '../components/flow/FlowProgressTrack';
import FlowSummarySidebar from '../components/flow/FlowSummarySidebar';
import FlowConfirmation from '../components/flow/FlowConfirmation';
import { formatCurrency } from '../utils/format';
import '../styles/flow.css';

const steps = ['Transfer Details', 'Review & Confirm'];

export default function Transfer() {
  const navigate = useNavigate();
  const accountList = Object.values(accounts);

  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [form, setForm] = useState<TransferFormState>({ ...initialTransferFormState, toAccountId: defaultAccountId });
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const toAccount = accounts[form.toAccountId];
  const estimatedNum = Number(form.estimatedValue) || 0;

  function updateForm(patch: Partial<TransferFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function goTo(next: number) {
    setStep(next);
    setMaxStepReached((prev) => Math.max(prev, next));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSubmit() {
    const num = Math.floor(100000 + Math.random() * 900000);
    setConfirmationNumber(`ACT-2026-${num}`);
    goTo(3);
  }

  const canContinueStep1 = form.fromInstitution.trim() !== '' && form.fromAccountNumber.trim() !== '' && form.toAccountId !== '';

  return (
    <div className="flow-wrap">
      <div className="flow-crumb">
        <Link to="/dashboard">Home</Link> &nbsp;›&nbsp; Transfer an Account
      </div>

      <h1 className="flow-page-title">Transfer an Account to Victory Capital</h1>
      <p className="flow-subhead">
        Move an account from another financial institution into Victory Capital. Most in-kind (ACATS) transfers
        complete within 5-7 business days once your current firm approves the request.
      </p>

      {step <= 2 && <FlowProgressTrack steps={steps} currentStep={step} onStepClick={(n) => (n <= maxStepReached ? goTo(n) : undefined)} />}

      <div className="flow-layout">
        <div className="flow-main-col">
          {step === 1 && (
            <div className="flow-step-panel">
              <div className="flow-card">
                <h2><span className="flow-card-num">1</span>Where are you transferring from?</h2>
                <p className="flow-card-desc">Enter the details of the account you're transferring, exactly as they appear on a recent statement.</p>

                <div className="flow-field-row">
                  <div className="flow-field">
                    <label htmlFor="tr-inst">Current institution</label>
                    <input id="tr-inst" type="text" value={form.fromInstitution} onChange={(e) => updateForm({ fromInstitution: e.target.value })} placeholder="e.g. Fidelity Investments" />
                  </div>
                  <div className="flow-field">
                    <label htmlFor="tr-acct">Account number</label>
                    <input id="tr-acct" type="text" value={form.fromAccountNumber} onChange={(e) => updateForm({ fromAccountNumber: e.target.value })} placeholder="e.g. 123-456789" />
                  </div>
                </div>

                <div className="flow-radio-group" style={{ flexDirection: 'row', gap: 16 }}>
                  <label className={`flow-radio-opt${form.transferType === 'full' ? ' selected' : ''}`} style={{ flex: 1 }}>
                    <input type="radio" checked={form.transferType === 'full'} onChange={() => updateForm({ transferType: 'full' })} />
                    <div className="flow-rtext"><strong>Full Transfer</strong><span>Move the entire account</span></div>
                  </label>
                  <label className={`flow-radio-opt${form.transferType === 'partial' ? ' selected' : ''}`} style={{ flex: 1 }}>
                    <input type="radio" checked={form.transferType === 'partial'} onChange={() => updateForm({ transferType: 'partial' })} />
                    <div className="flow-rtext"><strong>Partial Transfer</strong><span>Move specific holdings</span></div>
                  </label>
                </div>

                <div className="flow-field-row flow-field-row-single">
                  <div className="flow-field">
                    <label htmlFor="tr-value">Estimated account value</label>
                    <input id="tr-value" type="number" min={0} value={form.estimatedValue} onChange={(e) => updateForm({ estimatedValue: e.target.value })} placeholder="e.g. 25000" />
                    <span className="flow-helper">This is just an estimate — the actual amount transferred will be confirmed by both firms.</span>
                  </div>
                </div>

                <div className="flow-section-divider">Deposit Into</div>
                <div className="flow-field-row flow-field-row-single">
                  <div className="flow-field">
                    <label htmlFor="tr-to">Victory Capital account</label>
                    <select id="tr-to" value={form.toAccountId} onChange={(e) => updateForm({ toAccountId: e.target.value })}>
                      {accountList.map((a) => (
                        <option key={a.id} value={a.id}>{a.registration} — {a.typeLabel}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flow-btn-row">
                <div className="flow-left-actions">
                  <button className="flow-btn flow-btn-cancel" onClick={() => navigate('/dashboard')}>Cancel</button>
                </div>
                <button className="flow-btn flow-btn-primary" disabled={!canContinueStep1} onClick={() => goTo(2)}>
                  Continue to Review →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flow-step-panel">
              <div className="flow-card">
                <h2><span className="flow-card-num">2</span>Review your transfer request</h2>
                <div className="flow-review-group">
                  <div className="flow-rghead"><h3>Transfer Summary</h3><button onClick={() => goTo(1)}>Edit</button></div>
                  <div className="flow-rrow"><span className="flow-k">From</span><span className="flow-v">{form.fromInstitution} · {form.fromAccountNumber}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Transfer type</span><span className="flow-v">{form.transferType === 'full' ? 'Full Transfer' : 'Partial Transfer'}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Estimated value</span><span className="flow-v">{estimatedNum > 0 ? formatCurrency(estimatedNum) : 'Not provided'}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Deposit into</span><span className="flow-v">{toAccount?.registration}</span></div>
                </div>

                <div className="flow-consent-box">
                  <input type="checkbox" checked={form.consent} onChange={(e) => updateForm({ consent: e.target.checked })} />
                  <span>
                    I authorize Victory Capital to initiate an ACATS transfer request with my current institution on
                    my behalf, and confirm the information above is accurate.
                  </span>
                </div>
              </div>

              <div className="flow-btn-row">
                <div className="flow-left-actions">
                  <button className="flow-btn flow-btn-ghost" onClick={() => goTo(1)}>← Back</button>
                </div>
                <button className="flow-btn flow-btn-primary" disabled={!form.consent} onClick={handleSubmit}>
                  Submit Transfer Request
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <FlowConfirmation
              heading="Your transfer request has been submitted"
              description="We'll reach out to your current institution to begin the transfer. You can track its status from your dashboard."
              confirmationNumber={confirmationNumber}
              backTo="/dashboard"
              backLabel="← Back to My Portfolio"
              rows={[
                { label: 'From', value: `${form.fromInstitution} · ${form.fromAccountNumber}` },
                { label: 'Deposit into', value: toAccount?.registration ?? '' },
                { label: 'Transfer type', value: form.transferType === 'full' ? 'Full Transfer' : 'Partial Transfer' },
              ]}
            />
          )}
        </div>

        {step <= 2 && (
          <FlowSummarySidebar
            title="Transfer Summary"
            rows={[
              { label: 'From institution', value: form.fromInstitution || null },
              { label: 'Account number', value: form.fromAccountNumber || null },
              { label: 'Transfer type', value: form.transferType === 'full' ? 'Full Transfer' : 'Partial Transfer', done: true },
              { label: 'Deposit into', value: toAccount?.registration.replace('*', 'XXXX') ?? null, done: true },
            ]}
            estimate={estimatedNum > 0 ? { amount: formatCurrency(estimatedNum), label: 'Estimated transfer value' } : undefined}
          />
        )}
      </div>

      <div className="flow-risk-footer">
        Transfer timing and eligibility vary by institution and account type. Some assets may need to be liquidated
        before transfer.
      </div>
    </div>
  );
}
