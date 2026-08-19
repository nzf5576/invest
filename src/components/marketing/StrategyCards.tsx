import type { FranchiseProperty } from '../../types/marketing';

interface Props {
  property: FranchiseProperty;
}

export default function StrategyCards({ property }: Props) {
  return (
    <div className="mkt-section">
      <div className="mkt-section-label">{property.sectionLabel}</div>
      <h2 className="mkt-section-title">{property.sectionTitle}</h2>
      <p className="mkt-section-desc">{property.sectionDesc}</p>
      <div className="mkt-card-grid">
        {property.cards.map((c) => (
          <div className="mkt-strategy-card" key={c.title}>
            <div className="mkt-strategy-card-accent" />
            <div className="mkt-strategy-card-body">
              <div className="mkt-strategy-card-icon">{c.icon}</div>
              <div className="mkt-strategy-card-title">{c.title}</div>
              <div className="mkt-strategy-card-desc">{c.desc}</div>
              <button className="mkt-strategy-card-link">{c.link}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
