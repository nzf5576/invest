import type { FranchiseProperty } from '../../types/marketing';

interface Props {
  property: FranchiseProperty;
}

export default function MarketingNav({ property }: Props) {
  return (
    <nav className="mkt-nav">
      <div className="mkt-nav-left">
        <a href="#" className="mkt-brand-lockup">
          <span className="mkt-vc-logo"><span>Victory</span>Capital</span>
          {property.showFranchise && (
            <>
              <span className="mkt-franchise-divider" />
              <span className="mkt-franchise-name">{property.franchiseName}</span>
            </>
          )}
        </a>
        {property.showFranchise && (
          <span className="mkt-franchise-badge">🏛️ A Victory Capital Investment Franchise</span>
        )}
        <div className="mkt-nav-links">
          <a href="#" style={{ color: 'var(--mkt-accent)', fontWeight: 700 }}>Home</a>
          <a href="#">Investment Franchises</a>
          <a href="#">Insights</a>
          <a href="#">About Us</a>
          <button>Contact</button>
        </div>
      </div>
      <div className="mkt-nav-right">
        <button className="mkt-btn-primary">{property.navCta}</button>
      </div>
    </nav>
  );
}
