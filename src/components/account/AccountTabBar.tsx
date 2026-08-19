export const accountTabs = ['📊 Holdings', '📋 Activity', '💰 Dividends', '🧾 Cost Basis', '📈 Performance', '📄 Documents'];

interface Props {
  active: number;
  onChange: (index: number) => void;
}

export default function AccountTabBar({ active, onChange }: Props) {
  return (
    <div className="tab-bar" role="tablist" aria-label="Account sections">
      <div className="tab-bar-inner">
        {accountTabs.map((tab, i) => (
          <button
            key={tab}
            className={`tab-btn${active === i ? ' active' : ''}`}
            role="tab"
            aria-selected={active === i}
            onClick={() => onChange(i)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
