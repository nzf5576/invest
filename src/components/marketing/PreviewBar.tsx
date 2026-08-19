import type { FranchiseKey } from '../../types/marketing';
import { demoProperties } from '../../data/franchises';

const labels: Record<FranchiseKey, string> = {
  corporate: '🏛️ Victory Capital (Corporate)',
  westend: '🍁 WestEnd Advisors',
  pioneer: '🧭 Pioneer Investments',
  sycamore: '⚖️ Sycamore Capital',
};

interface Props {
  active: FranchiseKey;
  onChange: (key: FranchiseKey) => void;
}

export default function PreviewBar({ active, onChange }: Props) {
  return (
    <div className="mkt-demo-bar">
      <span className="mkt-demo-label">View as:</span>
      {demoProperties.map((key) => (
        <button
          key={key}
          className={`mkt-demo-btn${active === key ? ' active' : ''}`}
          onClick={() => onChange(key)}
        >
          {labels[key]}
        </button>
      ))}
      <span className="mkt-demo-note">Try "Log In" and the site map below ↓</span>
    </div>
  );
}
