import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { accounts } from '../data/mockData';
import { initialRmdFormState } from '../types/rmd';
import type { RmdFormState } from '../types/rmd';
import RmdProgressTrack from '../components/rmd/RmdProgressTrack';
import RmdStepAccount from '../components/rmd/RmdStepAccount';
import RmdStepDistribution from '../components/rmd/RmdStepDistribution';
import RmdStepDeliveryTaxes from '../components/rmd/RmdStepDeliveryTaxes';
import RmdStepReview from '../components/rmd/RmdStepReview';
import RmdConfirmation from '../components/rmd/RmdConfirmation';
import RmdSummarySidebar from '../components/rmd/RmdSummarySidebar';
import '../styles/rmd.css';

export default function RmdFlow() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const account = accountId ? accounts[accountId] : undefined;

  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [form, setForm] = useState<RmdFormState>(initialRmdFormState);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const estimatedAmount = useMemo(() => (account ? Math.round(account.value * 0.0356 * 100) / 100 : 0), [account]);

  if (!account) return <Navigate to="/" replace />;

  function updateForm(patch: Partial<RmdFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function goTo(next: number) {
    setStep(next);
    setMaxStepReached((prev) => Math.max(prev, next));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    navigate(`/account/${accountId}`);
  }

  function handleSubmit() {
    const num = Math.floor(100000 + Math.random() * 900000);
    setConfirmationNumber(`RMD-2026-${num}`);
    goTo(5);
  }

  return (
    <div className="rmd-wrap">
      <div className="rmd-crumb">
        <Link to="/">Home</Link> &nbsp;›&nbsp; <Link to={`/account/${accountId}`}>Required Minimum Distribution</Link> &nbsp;›&nbsp; Set Up Automatic RMD
      </div>

      <h1 className="rmd-page-title">Set Up Your Required Minimum Distribution</h1>
      <p className="rmd-subhead">
        IRS rules require you to withdraw at least a minimum amount from this account before{' '}
        <b>December 31, 2026</b> (<a href="#">IRS guidelines</a>). We'll calculate it for you, or you can enter your
        own amount — either way, this takes about 4 minutes.
      </p>

      <div className="rmd-banner">
        <div className="rmd-dot">i</div>
        <div>
          <b>Before you start:</b> Make sure your <a href="#">beneficiary information</a> is current — it affects
          your RMD calculation.
        </div>
      </div>

      {step <= 4 && <RmdProgressTrack currentStep={step} onStepClick={(n) => (n <= maxStepReached ? goTo(n) : undefined)} />}

      <div className="rmd-layout">
        <div className="rmd-main-col">
          {step === 1 && <RmdStepAccount account={account} onCancel={handleCancel} onNext={() => goTo(2)} />}
          {step === 2 && (
            <RmdStepDistribution
              account={account}
              form={form}
              onChange={updateForm}
              onBack={() => goTo(1)}
              onNext={() => goTo(3)}
            />
          )}
          {step === 3 && (
            <RmdStepDeliveryTaxes form={form} onChange={updateForm} onBack={() => goTo(2)} onNext={() => goTo(4)} />
          )}
          {step === 4 && (
            <RmdStepReview
              account={account}
              form={form}
              onChange={updateForm}
              onEditStep={goTo}
              onBack={() => goTo(3)}
              onSubmit={handleSubmit}
            />
          )}
          {step === 5 && (
            <RmdConfirmation account={account} form={form} confirmationNumber={confirmationNumber} estimatedAmount={estimatedAmount} />
          )}
        </div>

        <RmdSummarySidebar account={account} form={form} estimatedAmount={estimatedAmount} />
      </div>

      <div className="rmd-risk-footer">
        All investing involves risk, including the potential loss of principal. Victory Capital does not provide tax
        advice — please consult your tax advisor regarding your situation.
      </div>
    </div>
  );
}
