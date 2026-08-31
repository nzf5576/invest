import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { accounts } from '../data/mockData';
import { initialTradeFormState } from '../types/flows';
import type { TradeFormState } from '../types/flows';
import FlowProgressTrack from '../components/flow/FlowProgressTrack';
import FlowSummarySidebar from '../components/flow/FlowSummarySidebar';
import FlowConfirmation from '../components/flow/FlowConfirmation';
import { formatCurrency } from '../utils/format';
import '../styles/flow.css';

const steps = ['Order Details', 'Review & Confirm'];

export default function Trade() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const account = accountId ? accounts[accountId] : undefined;

  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [form, setForm] = useState<TradeFormState>(initialTradeFormState);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const holding = useMemo(
    () => account?.holdings.find((h) => h.id === form.holdingId),
    [account, form.holdingId],
  );

  const amountNum = Number(form.amount) || 0;
  const estimatedShares = holding && form.basis === 'dollars' && holding.nav > 0 ? amountNum / holding.nav : amountNum;
  const estimatedDollars = holding && form.basis === 'shares' ? amountNum * holding.nav : amountNum;

  if (!account) return <Navigate to="/dashboard" replace />;

  function updateForm(patch: Partial<TradeFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function goTo(next: number) {
    setStep(next);
    setMaxStepReached((prev) => Math.max(prev, next));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSubmit() {
    const num = Math.floor(100000 + Math.random() * 900000);
    setConfirmationNumber(`TRD-2026-${num}`);
    goTo(3);
  }

  const canContinueStep1 = form.holdingId !== '' && amountNum > 0;

  return (
    <div className="flow-wrap">
      <div className="flow-crumb">
        <Link to="/dashboard">Home</Link> &nbsp;›&nbsp; <Link to={`/account/${accountId}`}>{account.registration}</Link> &nbsp;›&nbsp; Place a Trade
      </div>

      <h1 className="flow-page-title">Place a Trade</h1>
      <p className="flow-subhead">
        Buy or sell shares of a fund held in this account. Trades placed before 4:00 PM ET receive that day's closing
        net asset value (NAV).
      </p>

      {step <= 2 && <FlowProgressTrack steps={steps} currentStep={step} onStepClick={(n) => (n <= maxStepReached ? goTo(n) : undefined)} />}

      <div className="flow-layout">
        <div className="flow-main-col">
          {step === 1 && (
            <div className="flow-step-panel">
              <div className="flow-card">
                <h2><span className="flow-card-num">1</span>Choose action &amp; fund</h2>
                <p className="flow-card-desc">This trade will be placed in {account.registration}.</p>

                <div className="flow-radio-group">
                  <label className={`flow-radio-opt${form.action === 'buy' ? ' selected' : ''}`}>
                    <input type="radio" checked={form.action === 'buy'} onChange={() => updateForm({ action: 'buy' })} />
                    <div className="flow-rtext"><strong>Buy</strong><span>Purchase additional shares</span></div>
                  </label>
                  <label className={`flow-radio-opt${form.action === 'sell' ? ' selected' : ''}`}>
                    <input type="radio" checked={form.action === 'sell'} onChange={() => updateForm({ action: 'sell' })} />
                    <div className="flow-rtext"><strong>Sell / Redeem</strong><span>Sell shares you currently hold</span></div>
                  </label>
                </div>

                <div className="flow-field-row flow-field-row-single">
                  <div className="flow-field">
                    <label htmlFor="trade-fund">Fund</label>
                    <select id="trade-fund" value={form.holdingId} onChange={(e) => updateForm({ holdingId: e.target.value })}>
                      <option value="">Select a fund…</option>
                      {account.holdings
                        .filter((h) => form.action === 'buy' || h.shares > 0)
                        .map((h) => (
                          <option key={h.id} value={h.id}>{h.name} ({h.ticker}) — NAV {formatCurrency(h.nav)}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="flow-radio-group" style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
                  <label className={`flow-radio-opt${form.basis === 'dollars' ? ' selected' : ''}`} style={{ flex: 1 }}>
                    <input type="radio" checked={form.basis === 'dollars'} onChange={() => updateForm({ basis: 'dollars' })} />
                    <div className="flow-rtext"><strong>Dollar Amount</strong></div>
                  </label>
                  <label className={`flow-radio-opt${form.basis === 'shares' ? ' selected' : ''}`} style={{ flex: 1 }}>
                    <input type="radio" checked={form.basis === 'shares'} onChange={() => updateForm({ basis: 'shares' })} />
                    <div className="flow-rtext"><strong>Number of Shares</strong></div>
                  </label>
                </div>

                <div className="flow-field-row flow-field-row-single">
                  <div className="flow-field">
                    <label htmlFor="trade-amount">{form.basis === 'dollars' ? 'Dollar amount' : 'Shares'}</label>
                    <input
                      id="trade-amount"
                      type="number"
                      min={0}
                      value={form.amount}
                      onChange={(e) => updateForm({ amount: e.target.value })}
                      placeholder={form.basis === 'dollars' ? 'e.g. 500' : 'e.g. 25.5'}
                    />
                    {holding && amountNum > 0 && (
                      <span className="flow-helper">
                        {form.basis === 'dollars'
                          ? `≈ ${estimatedShares.toFixed(3)} shares at today's NAV of ${formatCurrency(holding.nav)}`
                          : `≈ ${formatCurrency(estimatedDollars)} at today's NAV of ${formatCurrency(holding.nav)}`}
                      </span>
                    )}
                  </div>
                </div>
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
                <h2><span className="flow-card-num">2</span>Review your order</h2>
                <div className="flow-review-group">
                  <div className="flow-rghead"><h3>Order Summary</h3><button onClick={() => goTo(1)}>Edit</button></div>
                  <div className="flow-rrow"><span className="flow-k">Action</span><span className="flow-v">{form.action === 'buy' ? 'Buy' : 'Sell / Redeem'}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Fund</span><span className="flow-v">{holding?.name} ({holding?.ticker})</span></div>
                  <div className="flow-rrow"><span className="flow-k">Amount</span><span className="flow-v">{form.basis === 'dollars' ? formatCurrency(amountNum) : `${amountNum} shares`}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Estimated {form.basis === 'dollars' ? 'shares' : 'dollar value'}</span><span className="flow-v">{form.basis === 'dollars' ? `${estimatedShares.toFixed(3)} sh` : formatCurrency(estimatedDollars)}</span></div>
                  <div className="flow-rrow"><span className="flow-k">Pricing</span><span className="flow-v">Today's closing NAV</span></div>
                </div>

                <div className="flow-consent-box">
                  <input type="checkbox" checked={form.consent} onChange={(e) => updateForm({ consent: e.target.checked })} />
                  <span>
                    I authorize Victory Capital to execute this order at the next calculated NAV. I understand the
                    value of my investment will fluctuate and that shares, when sold, may be worth more or less than
                    their original cost.
                  </span>
                </div>
              </div>

              <div className="flow-btn-row">
                <div className="flow-left-actions">
                  <button className="flow-btn flow-btn-ghost" onClick={() => goTo(1)}>← Back</button>
                </div>
                <button className="flow-btn flow-btn-primary" disabled={!form.consent} onClick={handleSubmit}>
                  Submit Order
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <FlowConfirmation
              heading={`Your ${form.action === 'buy' ? 'buy' : 'sell'} order has been submitted`}
              description="You'll receive a trade confirmation by email once the order executes at today's closing NAV."
              confirmationNumber={confirmationNumber}
              backTo={`/account/${accountId}`}
              backLabel="← Back to Account"
              rows={[
                { label: 'Account', value: account.registration },
                { label: 'Fund', value: `${holding?.name ?? ''} (${holding?.ticker ?? ''})` },
                { label: 'Amount', value: form.basis === 'dollars' ? formatCurrency(amountNum) : `${amountNum} shares` },
              ]}
            />
          )}
        </div>

        {step <= 2 && (
          <FlowSummarySidebar
            title="Order Summary"
            rows={[
              { label: 'Account', value: account.registration.replace('*', 'XXXX'), done: true },
              { label: 'Action', value: form.action === 'buy' ? 'Buy' : 'Sell / Redeem', done: true },
              { label: 'Fund', value: holding ? `${holding.ticker}` : null },
              { label: 'Amount', value: amountNum > 0 ? (form.basis === 'dollars' ? formatCurrency(amountNum) : `${amountNum} sh`) : null },
            ]}
            estimate={
              holding && amountNum > 0
                ? { amount: form.basis === 'dollars' ? `≈ ${estimatedShares.toFixed(3)} sh` : formatCurrency(estimatedDollars), label: 'Estimated at today\'s NAV' }
                : undefined
            }
          />
        )}
      </div>

      <div className="flow-risk-footer">
        All investing involves risk, including the potential loss of principal. Orders are subject to fund minimums
        and market hours.
      </div>
    </div>
  );
}
