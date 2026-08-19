interface Solution {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

const solutions: Solution[] = [
  { icon: '🏛️', title: 'Victory Cornerstone Funds', desc: 'Professionally managed & diversified portfolio aligned to your risk tolerance.', color: 'var(--navy)' },
  { icon: '🎯', title: 'Victory Target Retirement', desc: 'Adjusts investment mix from aggressive to conservative as you approach retirement.', color: 'var(--primary)' },
  { icon: '🎓', title: 'Victory Capital 529 Plan', desc: 'Save for education expenses with tax-advantaged investing.', color: 'var(--accent)' },
];

export default function PortfolioSolutions() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Portfolio Solutions</h2>
        <button className="card-link">View All →</button>
      </div>
      <div className="solutions-grid" role="list">
        {solutions.map((s) => (
          <div className="solution-card" role="listitem" tabIndex={0} key={s.title}>
            <div className="sol-icon" aria-hidden="true">{s.icon}</div>
            <div className="sol-title" style={{ color: s.color }}>{s.title}</div>
            <div className="sol-desc">{s.desc}</div>
            <div className="sol-link" style={{ color: s.color }}>Learn more →</div>
          </div>
        ))}
      </div>
    </div>
  );
}
