interface Row {
  label: string;
  value: string | null;
  done?: boolean;
}

interface Props {
  title: string;
  rows: Row[];
  estimate?: { amount: string; label: string };
}

export default function FlowSummarySidebar({ title, rows, estimate }: Props) {
  return (
    <div className="flow-summary">
      <h3>{title}</h3>
      {rows.map((r) => (
        <div className="flow-row" key={r.label}>
          <span className="flow-k">{r.done && <span className="flow-check">✓</span>}{r.label}</span>
          <span className={`flow-v${r.value ? '' : ' pending'}`}>{r.value ?? 'Not set yet'}</span>
        </div>
      ))}
      {estimate && (
        <div className="flow-est-box">
          <div className="flow-amt">{estimate.amount}</div>
          <div className="flow-lbl">{estimate.label}</div>
        </div>
      )}
    </div>
  );
}
