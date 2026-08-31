import { Link } from 'react-router-dom';
import type { FranchiseProperty } from '../../types/marketing';

interface Props {
  property: FranchiseProperty;
  active?: 'home' | 'franchises' | 'insights' | 'about' | 'contact';
}

export default function MarketingNav({ property, active = 'home' }: Props) {
  const activeStyle = { color: 'var(--mkt-accent)', fontWeight: 700 };

  return (
    <nav className="mkt-nav">
      <div className="mkt-nav-left">
        <Link to="/" className="mkt-brand-lockup">
          <span className="mkt-vc-logo"><span>Victory</span>Capital</span>
          {property.showFranchise && (
            <>
              <span className="mkt-franchise-divider" />
              <span className="mkt-franchise-name">{property.franchiseName}</span>
            </>
          )}
        </Link>
        {property.showFranchise && (
          <span className="mkt-franchise-badge">🏛️ A Victory Capital Investment Franchise</span>
        )}
        <div className="mkt-nav-links">
          <Link to="/" style={active === 'home' ? activeStyle : undefined}>Home</Link>
          <Link to="/investment-franchises" style={active === 'franchises' ? activeStyle : undefined}>Investment Franchises</Link>
          <Link to="/market-insights" style={active === 'insights' ? activeStyle : undefined}>Insights</Link>
          <Link to="/about" style={active === 'about' ? activeStyle : undefined}>About Us</Link>
          <Link to="/contact" style={active === 'contact' ? activeStyle : undefined}>Contact</Link>
        </div>
      </div>
      <div className="mkt-nav-right">
        <button className="mkt-btn-primary">{property.navCta}</button>
      </div>
    </nav>
  );
}
