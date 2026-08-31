import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userProfile } from '../data/profile';
import { bankOptions } from '../types/rmd';
import type { BankChoice } from '../types/rmd';
import { initialOpenAccountFormState, newAccountTypeOptions } from '../types/flows';
import type { OpenAccountFormState } from '../types/flows';
import FlowProgressTrack from '../components/flow/FlowProgressTrack';
import FlowSummarySidebar from '../components/flow/FlowSummarySidebar';
import FlowConfirmation from '../components/flow/FlowConfirmation';
import { formatCurrency } from '../utils/format';
import '../styles/flow.css';

const steps = ['Account Type', 'Account Details', 'Review & Sign'];

export default function OpenAccount() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [form, setForm] = useState<OpenAccountFormState>(initialOpenAccountFormState);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const selectedType = useMemo(
    () => newAccountTypeOptions.find((t) => t.key === form.accountType)!,
    [form.accountType],
  );
  const fundingNum = Number(form.initialFunding) || 0;

  function updateForm(patch: Partial<OpenAccountFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function goTo(next: number) {
    setStep(next);
    setMaxStepReached((prev) => Math.max(prev, next));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSubmit() {
    const num = Math.floor(100000 + Math.random() * 900000);
    setConfirmationNumber(`NEW-2026-${num}`);
    goTo(4);
  }

  const canContinueStep2 =
    (!selectedType.needsCoOwner || form.coOwnerName.trim() !== '') &&
    (!selectedType.needsBeneficiary || (form.beneficiaryName.trim() !== '' && form.beneficiaryDob.trim() !== '')) &&
    (form.fundLater || fundingNum > 0);

  return (
    <div className="flow-wrap">
      <div className="flow-crumb">
        <Link to="/dashboard">Home</Link> &nbsp;›&nbsp; Open a New Account
      </div>

      <h1 className="flow-page-title">Open a New Account</h1>
      <p className="flow-subhead">
        Set up a new Victory Capital account in a few minutes. You can always add more account types later from your
        dashboard.
      </p>

      {step <= 3 && <FlowProgressTrack steps={steps} currentStep={step} onStepClick={(n) => (n <= maxStepReached ? goTo(n) : undefined)} />}

      <div className="flow-layout">
        <div className="flow-main-col">
          {step === 1 && (
            <div className="flow-step-panel">
              <div className="flow-card">
                <h2><span className="flow-card-num">1</span>Choose an account type</h2>
                <p className="flow-card-desc">Pick the account that best fits your goal. You can open more than one over time.</p>

                <div className="flow-radio-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {newAccountTypeOptions.map((opt) => (
                    <label key={opt.key} className={`flow-radio-opt${form.accountType === opt.key ? ' selected' : ''}`}>
                      <input type="radio" checked={form.accountType === opt.key} onChange={() => updateForm({ accountType: opt.key })} />
                      <div className="flow-rtext">
                        <strong>{opt.icon} {opt.label}</strong>
                        <span>{opt.description}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flow-btn-row">
                <div className="flow-left-actions">
                  <button className="flow-btn flow-btn-cancel" onClick={() => navigate('/dashboard')}>Cancel</button>
                </div>
                <button className="flow-btn flow-btn-primary" onClick={() => goTo(2)}>
                  Continue to Account Details →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flow-step-panel">
              <div className="flow-card">
                <h2><span className="flow-card-num">2</span>Account details</h2>
                <p className="flow-card-desc">This {selectedType.label} account will be opened under your profile.</p>

                <div className="flow-field-row flow-field-row-single">
                  <div className="flow-field">
                    <label htmlFor="oa-owner">Primary owner</label>
                    <input id="oa-owner" type="text" value={userProfile.fullName} disabled />
                  </div>
                </div>

                {selectedType.needsCoOwner && (
                  <div className="flow-field-row flow-field-row-single">
                    <div className="flow-field">
                      <label htmlFor="oa-coowner">Joint owner's full name</label>
                      <input
                        id="oa-coowner"
                        type="text"
                        value={form.coOwnerName}
                        onChange={(e) => updateForm({ coOwnerName: e.target.value })}
                        placeholder="e.g. Robert T. Kline"
                      />
                    </div>
                  </div>
                )}

                {selectedType.needsBeneficiary && (
                  <div className="flow-field-row">
                    <div className="flow-field">
                      <label htmlFor="oa-ben-name">Beneficiary's full name</label>
                      <input
                        id="oa-ben-name"
                        type="text"
                        value={form.beneficiaryName}
                        onChange={(e) => updateForm({ beneficiaryName: e.target.value })}
                        placeholder="e.g. Ava Kline"
                      />
                    </div>
                    <div className="flow-field">
                      <label htmlFor="oa-ben-dob">Beneficiary's date of birth</label>
                      <input
                        id="oa-ben-dob"
                        type="date"
                        value={form.beneficiaryDob}
                        onChange={(e) => updateForm({ beneficiaryDob: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="flow-section-divider">Initial Funding</div>
                <div className="flow-radio-group" style={{ flexDirection: 'row', gap: 16 }}>
                  <label className={`flow-radio-opt${!form.fundLater ? ' selected' : ''}`} style={{ flex: 1 }}>
                    <input type="radio" checked={!form.fundLater} onChange={() => updateForm({ fundLater: false })} />
                    <div className="flow-rtext"><strong>Fund now</strong></div>
                  </label>
                  <label className={`flow-radio-opt${form.fundLater ? ' selected' : ''}`} style={{ flex: 1 }}>
                    <input type="radio" checked={form.fundLater} onChange={() => updateForm({ fundLater: true })} />
                    <div className="flow-rtext"><strong>I'll fund this later</strong></div>
                  </label>
                </div>

                {!form.fundLater && (
                  <div className="flow-inline-reveal">
                    <div className="flow-field-row flow-field-row-single">
                      <div className="flow-field">
                        <label htmlFor="oa-amount">Initial deposit amount</label>
                        <input
                          id="oa-amount"
                          type="number"
                          min={0}
                          value={form.initialFunding}
                          onChange={(e) => updateForm({ initialFunding: e.target.value })}
                          placeholder="e.g. 1000"
                        />
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
                  </div>
                )}
              </div>

              <div className="flow-btn-row">
                <div className="flow-left-actions">
                  <button className="flow-btn flow-btn-ghost" onClick={() => goTo(1)}>← Back</button>
                </div>
                <button className="flow-btn flow-btn-primary" disabled={!canContinueStep2} onClick={() => goTo(3)}>
                  Continue to Review →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flow-step-panel">
              <div className="flow-card">
                <h2><span className="flow-card-num">3</span>Review &amp; sign</h2>
                <div className="flow-review-group">
                  <div className="flow-rghead"><h3>Account Summary</h3><button onClick={() => goTo(1)}>Edit</button></div>
                  <div className="flow-rrow"><span className="flow-k">Account type</span><span className="flow-v">{selectedType.label}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Primary owner</span><span className="flow-v">{userProfile.fullName}</span></div>
                  {selectedType.needsCoOwner && (
                    <div className="flow-rrow"><span className="flow-k">Joint owner</span><span className="flow-v">{form.coOwnerName}</span></div>
                  )}
                  {selectedType.needsBeneficiary && (
                    <>
                      <div className="flow-rrow"><span className="flow-k">Beneficiary</span><span className="flow-v">{form.beneficiaryName}</span></div>
                      <div className="flow-rrow"><span className="flow-k">Date of birth</span><span className="flow-v">{form.beneficiaryDob}</span></div>
                    </>
                  )}
                  <div className="flow-rrow">
                    <span className="flow-k">Initial funding</span>
                    <span className="flow-v">{form.fundLater ? 'Fund later' : `${formatCurrency(fundingNum)} from ${bankOptions[form.bank].shortLabel}`}</span>
                  </div>
                </div>

                <div className="flow-consent-box">
                  <input type="checkbox" checked={form.consent} onChange={(e) => updateForm({ consent: e.target.checked })} />
                  <span>
                    I certify the information above is accurate, have reviewed the account agreement and disclosures,
                    and agree to open this account electronically.
                  </span>
                </div>
              </div>

              <div className="flow-btn-row">
                <div className="flow-left-actions">
                  <button className="flow-btn flow-btn-ghost" onClick={() => goTo(2)}>← Back</button>
                </div>
                <button className="flow-btn flow-btn-primary" disabled={!form.consent} onClick={handleSubmit}>
                  Open Account
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <FlowConfirmation
              heading="Your new account has been opened"
              description="It may take a moment to appear in your portfolio. You'll receive a confirmation email with your account details."
              confirmationNumber={confirmationNumber}
              backTo="/dashboard"
              backLabel="← Back to My Portfolio"
              rows={[
                { label: 'Account type', value: selectedType.label },
                { label: 'Primary owner', value: userProfile.fullName },
                { label: 'Initial funding', value: form.fundLater ? 'Fund later' : formatCurrency(fundingNum) },
              ]}
            />
          )}
        </div>

        {step <= 3 && (
          <FlowSummarySidebar
            title="New Account"
            rows={[
              { label: 'Account type', value: selectedType.label, done: true },
              { label: 'Primary owner', value: userProfile.fullName, done: true },
              ...(selectedType.needsCoOwner ? [{ label: 'Joint owner', value: form.coOwnerName || null }] : []),
              ...(selectedType.needsBeneficiary ? [{ label: 'Beneficiary', value: form.beneficiaryName || null }] : []),
              { label: 'Initial funding', value: form.fundLater ? 'Fund later' : fundingNum > 0 ? formatCurrency(fundingNum) : null },
            ]}
          />
        )}
      </div>

      <div className="flow-risk-footer">
        All investing involves risk, including the potential loss of principal. Opening an account does not guarantee
        approval — some account types require additional verification.
      </div>
    </div>
  );
}
