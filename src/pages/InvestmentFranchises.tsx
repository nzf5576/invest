import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { FranchiseKey } from '../types/marketing';
import { franchises, nonInteractiveFranchiseBlurbs, siteMapFranchises } from '../data/franchises';
import PreviewBar from '../components/marketing/PreviewBar';
import MasterBar from '../components/marketing/MasterBar';
import MarketingNav from '../components/marketing/MarketingNav';
import TrustBand from '../components/marketing/TrustBand';
import MarketingFooter from '../components/marketing/MarketingFooter';
import '../styles/marketing.css';

export default function InvestmentFranchises() {
  const [activeKey, setActiveKey] = useState<FranchiseKey>('corporate');
  const property = franchises[activeKey];

  return (
    <div className="mkt-site" style={{ '--mkt-accent': property.accent, '--mkt-accent-bg': property.accentBg } as React.CSSProperties}>
      <PreviewBar active={activeKey} onChange={setActiveKey} />
      <MasterBar active={activeKey} onSelectProperty={setActiveKey} onScrollToContact={() => {}} />
      <MarketingNav property={property} active="franchises" />

      <div className="mkt-section">
        <div className="mkt-section-label">🏛️ One Victory Capital</div>
        <h1 className="mkt-section-title">Our Investment Franchises</h1>
        <p className="mkt-section-desc">
          Victory Capital is home to 9 independent investment franchises, each with its own name, philosophy, and
          track record. Every franchise operates with investment autonomy while sharing our operational
          infrastructure, compliance oversight, and distribution strength. Three of our franchises —{' '}
          {siteMapFranchises.filter((f) => f.interactive).map((f) => f.name).join(', ')} — are previewable below.
        </p>

        <div className="mkt-card-grid">
          {siteMapFranchises.map((f) => {
            const franchiseProperty = f.propertyKey ? franchises[f.propertyKey] : undefined;
            const desc = franchiseProperty?.desc ?? nonInteractiveFranchiseBlurbs[f.key];
            return (
              <div className="mkt-strategy-card" key={f.key}>
                <div className="mkt-strategy-card-accent" style={{ background: f.color }} />
                <div className="mkt-strategy-card-body">
                  <div className="mkt-strategy-card-icon" style={{ background: `${f.color}1a`, color: f.color }}>{f.icon}</div>
                  <div className="mkt-strategy-card-title">{f.name}</div>
                  <div className="mkt-strategy-card-desc">{desc}</div>
                  {f.interactive && f.propertyKey ? (
                    <Link className="mkt-strategy-card-link" to={`/?franchise=${f.propertyKey}`} style={{ color: f.color }}>
                      Visit {f.name} →
                    </Link>
                  ) : (
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-4)' }}>
                      A Victory Capital Investment Franchise
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TrustBand property={property} />
      <MarketingFooter property={property} />
    </div>
  );
}
