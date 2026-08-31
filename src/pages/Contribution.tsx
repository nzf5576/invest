import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { accounts } from '../data/mockData';
import { bankOptions } from '../types/rmd';
import type { BankChoice } from '../types/rmd';
import { initialContributionFormState } from '../types/flows';
import type { ContributionFormState } from '../types/flows';
import FlowProgressTrack from '../components/flow/FlowProgressTrack';
import FlowSummarySidebar from '../components/flow/FlowSummarySidebar';
import FlowConfirmation from '../components/flow/FlowConfirmation';
import { formatCurrency } from '../utils/format';
import '../styles/flow.css';

const steps = ['Contribution Details', 'Review & Confirm'];

export default function Contribution() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const account = accountId ? accounts[accountId] : undefined;

  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [form, setForm] = useState<ContributionFormState>(initialContributionFormState);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const holding = useMemo(() => account?.holdings.find((h) => h.id === form.holdingId), [account, form.holdingId]);
  const amountNum = Number(form.amount) || 0;

  if (!account) return <Navigate to="/" replace />;

  function updateForm(patch: Partial<ContributionFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function goTo(next: number) {
    setStep(next);
    setMaxStepReached((prev) => Math.max(prev, next));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSubmit() {
    const num = Math.floor(100000 + Math.random() * 900000);
    setConfirmationNumber(`CTB-2026-${num}`);
    goTo(3);
  }

  const canContinueStep1 = amountNum > 0;

  return (
    <div className="flow-wrap">
      <div className="flow-crumb">
        <Link to="/">Home</Link> &nbsp;›&nbsp; <Link to={`/account/${accountId}`}>{account.registration}</Link> &nbsp;›&nbsp; Make a Contribution
      </div>

      <h1 className="flow-page-title">Make a Contribution</h1>
      <p className="flow-subhead">
        Add money to {account.registration} from a linked bank account, as a one-time deposit or on a recurring
        schedule.
      </p>

      {step <= 2 && <FlowProgressTrack steps={steps} currentStep={step} onStepClick={(n) => (n <= maxStepReached ? goTo(n) : undefined)} />}

      <div className="flow-layout">
        <div className="flow-main-col">
          {step === 1 && (
            <div className="flow-step-panel">
              <div className="flow-card">
                <h2><span className="flow-card-num">1</span>Contribution amount</h2>
                <p className="flow-card-desc">This contribution will be applied to {account.registration}.</p>

                <div className="flow-field-row">
                  <div className="flow-field">
                    <label htmlFor="ctb-amount">Amount</label>
                    <input
                      id="ctb-amount"
                      type="number"
                      min={0}
                      value={form.amount}
                      onChange={(e) => updateForm({ amount: e.target.value })}
                      placeholder="e.g. 250"
                    />
                  </div>
                  <div className="flow-field">
                    <label htmlFor="ctb-fund">Invest in</label>
                    <select id="ctb-fund" value={form.holdingId} onChange={(e) => updateForm({ holdingId: e.target.value })}>
                      <option value="">Proportionately across current holdings</option>
                      {account.holdings.map((h) => (
                        <option key={h.id} value={h.id}>{h.name} ({h.ticker})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flow-section-divider">Funding Source</div>
                {(Object.keys(bankOptions) as BankChoice[])
                  .filter((k) => k !== 'bank3')
                  .map((key) => {
                    const b = bankOptions[key];
                    return (
                      <label key={key} className={`flow-bank-opt${form.bank === key ? ' selected' : ''}`}>
                        <div className="flow-bicon">{b.icon}</div>
                        <div className="flow-btext"><strong>{b.label}</strong><span>{b.sub}</span></div>
                        <input type="radio" checked={form.bank === key} onChange={() => updateForm({ bank: key })} />
                      </label>
                    );
                  })}

                <div className="flow-section-divider">Schedule</div>
                <div className="flow-radio-group" style={{ flexDirection: 'row', gap: 16 }}>
                  <label className={`flow-radio-opt${!form.recurring ? ' selected' : ''}`} style={{ flex: 1 }}>
                    <input type="radio" checked={!form.recurring} onChange={() => updateForm({ recurring: false, frequency: 'One-time' })} />
                    <div className="flow-rtext"><strong>One-time</strong></div>
                  </label>
                  <label className={`flow-radio-opt${form.recurring ? ' selected' : ''}`} style={{ flex: 1 }}>
                    <input type="radio" checked={form.recurring} onChange={() => updateForm({ recurring: true, frequency: 'Monthly' })} />
                    <div className="flow-rtext"><strong>Recurring</strong></div>
                  </label>
                </div>

                {form.recurring && (
                  <div className="flow-inline-reveal" style={{ marginTop: 4 }}>
                    <div className="flow-field-row flow-field-row-single">
                      <div className="flow-field">
                        <label htmlFor="ctb-freq">Frequency</label>
                        <select id="ctb-freq" value={form.frequency} onChange={(e) => updateForm({ frequency: e.target.value as ContributionFormState['frequency'] })}>
                          <option value="Monthly">Monthly</option>
                          <option value="Quarterly">Quarterly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flow-btn-row">
                <div className="flow-left-actions">
                  <button className="flow-btn flow-btn-cancel" onClick={() => navigate(`/account/${accountId}`)}>Cancel</button>
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
                <h2><span className="flow-card-num">2</span>Review your contribution</h2>
                <div className="flow-review-group">
                  <div className="flow-rghead"><h3>Contribution Summary</h3><button onClick={() => goTo(1)}>Edit</button></div>
                  <div className="flow-rrow"><span className="flow-k">Account</span><span className="flow-v">{account.registration}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Amount</span><span className="flow-v">{formatCurrency(amountNum)}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Invested in</span><span className="flow-v">{holding ? `${holding.name} (${holding.ticker})` : 'Proportionately across holdings'}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Funding source</span><span className="flow-v">{bankOptions[form.bank].shortLabel}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Schedule</span><span className="flow-v">{form.recurring ? form.frequency : 'One-time'}</span></div>
                </div>

                <div className="flow-consent-box">
                  <input type="checkbox" checked={form.consent} onChange={(e) => updateForm({ consent: e.target.checked })} />
                  <span>
                    I authorize Victory Capital to debit the funding source above for this contribution
                    {form.recurring ? ' on the schedule selected, until I cancel it' : ''}.
                  </span>
                </div>
              </div>

              <div className="flow-btn-row">
                <div className="flow-left-actions">
                  <button className="flow-btn flow-btn-ghost" onClick={() => goTo(1)}>← Back</button>
                </div>
                <button className="flow-btn flow-btn-primary" disabled={!form.consent} onClick={handleSubmit}>
                  Submit Contribution
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <FlowConfirmation
              heading="Your contribution has been submitted"
              description="Funds typically settle within 1-2 business days. You'll receive a confirmation email shortly."
              confirmationNumber={confirmationNumber}
              backTo={`/account/${accountId}`}
              backLabel="← Back to Account"
              rows={[
                { label: 'Account', value: account.registration },
                { label: 'Amount', value: formatCurrency(amountNum) },
                { label: 'Schedule', value: form.recurring ? form.frequency : 'One-time' },
              ]}
            />
          )}
        </div>

        {step <= 2 && (
          <FlowSummarySidebar
            title="Contribution Summary"
            rows={[
              { label: 'Account', value: account.registration.replace('*', 'XXXX'), done: true },
              { label: 'Amount', value: amountNum > 0 ? formatCurrency(amountNum) : null },
              { label: 'Funding source', value: bankOptions[form.bank].shortLabel, done: true },
              { label: 'Schedule', value: form.recurring ? form.frequency : 'One-time', done: true },
            ]}
          />
        )}
      </div>

      <div className="flow-risk-footer">
        All investing involves risk, including the potential loss of principal.
      </div>
    </div>
  );
}
