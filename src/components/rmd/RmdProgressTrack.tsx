import { stepTimeEstimates } from '../../types/rmd';

const steps = [
  { n: 1, label: 'Account & Basics' },
  { n: 2, label: 'Distribution Details' },
  { n: 3, label: 'Delivery & Taxes' },
  { n: 4, label: 'Review & Confirm' },
];

interface Props {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function RmdProgressTrack({ currentStep, onStepClick }: Props) {
  const fillPct = ((currentStep - 1) / 4) * 100 + 8;

  return (
    <>
      <div className="rmd-progress-track">
        <div className="rmd-progress-fill" style={{ width: `${fillPct}%` }} />
        {steps.map((s) => (
          <button
            key={s.n}
            className={`rmd-pstep${currentStep === s.n ? ' active' : currentStep > s.n ? ' done' : ''}`}
            onClick={() => (s.n < currentStep ? onStepClick(s.n) : undefined)}
          >
            <div className="rmd-circ">{currentStep > s.n ? '✓' : s.n}</div>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
      <div className="rmd-time-est">
        {stepTimeEstimates[currentStep] ? (
          <>Estimated time remaining: <b>{stepTimeEstimates[currentStep]}</b></>
        ) : null}
      </div>
    </>
  );
}
