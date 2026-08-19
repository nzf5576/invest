import type { FranchiseProperty } from '../../types/marketing';

interface Props {
  property: FranchiseProperty;
}

export default function MarketingHero({ property }: Props) {
  return (
    <div className="mkt-hero">
      <div className="mkt-hero-inner">
        <div>
          <div className="mkt-hero-eyebrow">{property.eyebrow}</div>
          <h1 className="mkt-hero-title">{property.title}</h1>
          <p className="mkt-hero-desc">{property.desc}</p>
          <div className="mkt-hero-actions">
            <button className="mkt-btn-hero-primary">{property.heroPrimaryBtn}</button>
            <button className="mkt-btn-hero-secondary">Learn About Victory</button>
          </div>
        </div>
        <div className="mkt-hero-stat-card">
          <div className="mkt-hero-stat-row"><span className="mkt-hero-stat-label">Investment Franchises</span><span className="mkt-hero-stat-value">9</span></div>
          <div className="mkt-hero-stat-row"><span className="mkt-hero-stat-label">Products Offered</span><span className="mkt-hero-stat-value">Mutual Funds · ETFs · SMAs</span></div>
          <div className="mkt-hero-stat-row"><span className="mkt-hero-stat-label">Client Types Served</span><span className="mkt-hero-stat-value">Individual · Advisor · Institutional</span></div>
          <div className="mkt-hero-stat-row"><span className="mkt-hero-stat-label">Distribution Platform</span><span className="mkt-hero-stat-value">Centralized</span></div>
        </div>
      </div>
    </div>
  );
}
