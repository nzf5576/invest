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
          <button className="mkt-trust-btn">View All Franchises</button>
          <button className="mkt-trust-btn primary">Victory Capital Home</button>
        </div>
      </div>
    </div>
  );
}
