import { Link } from 'react-router-dom';
import type { FranchiseProperty } from '../../types/marketing';

interface Props {
  property: FranchiseProperty;
}

export default function TrustBand({ property }: Props) {
  return (
    <div className="mkt-trust-band">
      <div className="mkt-trust-inner">
        <div className="mkt-trust-logo"><span>Victory</span>Capital</div>
        <div className="mkt-trust-text">
          <strong>{property.trustStrong}</strong> {property.trustBody}
        </div>
        <div className="mkt-trust-cta">
          <Link className="mkt-trust-btn" to="/investment-franchises" style={{ textDecoration: 'none' }}>View All Franchises</Link>
          <Link className="mkt-trust-btn primary" to="/" style={{ textDecoration: 'none' }}>Victory Capital Home</Link>
        </div>
      </div>
    </div>
  );
}
