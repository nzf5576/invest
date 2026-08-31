import { Link } from 'react-router-dom';
import type { FranchiseProperty } from '../../types/marketing';

interface Props {
  property: FranchiseProperty;
}

export default function MarketingFooter({ property }: Props) {
  return (
    <footer className="mkt-footer">
      <div className="mkt-footer-inner">
        <div className="mkt-footer-grid">
          <div>
            <div className="mkt-footer-brand"><span>Victory</span>Capital</div>
            <p className="mkt-footer-desc">{property.footerDesc}</p>
          </div>
          <div>
            <div className="mkt-footer-col-title">Company</div>
            <Link className="mkt-footer-link" to="/about">About Victory Capital</Link>
            <Link className="mkt-footer-link" to="/investment-franchises">Investment Franchises</Link>
            <Link className="mkt-footer-link" to="/market-insights">Insights</Link>
            <button className="mkt-footer-link">Leadership</button>
            <button className="mkt-footer-link">Careers</button>
          </div>
          <div>
            <div className="mkt-footer-col-title">Portals</div>
            <button className="mkt-footer-link">Individual Investor Login</button>
            <button className="mkt-footer-link">Financial Professional Login</button>
            <button className="mkt-footer-link">Institutional Login</button>
            <button className="mkt-footer-link">Register for Access</button>
          </div>
          <div>
            <div className="mkt-footer-col-title">Legal</div>
            <button className="mkt-footer-link">Privacy Policy</button>
            <button className="mkt-footer-link">Terms of Use</button>
            <button className="mkt-footer-link">Accessibility</button>
            <button className="mkt-footer-link">Disclosures</button>
          </div>
        </div>
        <div className="mkt-footer-bottom">
          © 2026 Victory Capital Management Inc. All rights reserved. {property.footerFranchiseNote} This is a
          design concept for internal discussion purposes only.
        </div>
      </div>
    </footer>
  );
}
