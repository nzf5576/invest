interface Props {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function FlowProgressTrack({ steps, currentStep, onStepClick }: Props) {
  const fillPct = ((currentStep - 1) / steps.length) * 100 + 100 / steps.length / 2;

  return (
    <div className="flow-progress-track">
      <div className="flow-progress-fill" style={{ width: `${fillPct}%` }} />
      {steps.map((label, i) => {
        const n = i + 1;
        return (
          <button
            key={label}
            className={`flow-pstep${currentStep === n ? ' active' : currentStep > n ? ' done' : ''}`}
            onClick={() => (n < currentStep ? onStepClick(n) : undefined)}
          >
            <div className="flow-circ">{currentStep > n ? '✓' : n}</div>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
