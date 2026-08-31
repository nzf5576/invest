import { Link } from 'react-router-dom';

interface Row {
  label: string;
  value: string;
}

interface Props {
  heading: string;
  description: string;
  confirmationNumber: string;
  rows: Row[];
  backTo: string;
  backLabel: string;
}

export default function FlowConfirmation({ heading, description, confirmationNumber, rows, backTo, backLabel }: Props) {
  return (
    <div className="flow-step-panel">
      <div className="flow-card flow-confirm-wrap">
        <div className="flow-confirm-check">✓</div>
        <h2>{heading}</h2>
        <p>{description}</p>
        <div className="flow-confirm-details">
          <div className="flow-crow"><span className="flow-k">Confirmation #</span><span className="flow-v">{confirmationNumber}</span></div>
          {rows.map((r) => (
            <div className="flow-crow" key={r.label}><span className="flow-k">{r.label}</span><span className="flow-v">{r.value}</span></div>
          ))}
        </div>
        <div className="flow-confirm-actions">
          <Link className="flow-btn flow-btn-primary" to={backTo} style={{ textDecoration: 'none' }}>{backLabel}</Link>
        </div>
      </div>
    </div>
  );
}
