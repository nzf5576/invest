import type { FranchiseKey } from '../../types/marketing';
import { siteMapFranchises } from '../../data/franchises';

interface Props {
  onSelectProperty: (key: FranchiseKey) => void;
}

export default function SiteMap({ onSelectProperty }: Props) {
  return (
    <div className="mkt-sitemap-section">
      <div className="mkt-sitemap-inner">
        <div className="mkt-sitemap-label">One Victory Capital</div>
        <h2 className="mkt-sitemap-title">A Single Website, Organized Around You</h2>
        <p className="mkt-sitemap-desc">
          Every investor type and every investment franchise — including WestEnd Advisors — lives on the same
          unified platform, sharing the same navigation, login system, and trust signals. Each franchise keeps its
          own name and accent color; everything else is one consistent experience.
        </p>

        <div className="mkt-sitemap-tree">
          <div className="mkt-sm-node mkt-sm-root">
            <div className="mkt-sm-node-icon">🏛️</div>
            <div className="mkt-sm-node-title">vcm.com</div>
            <div className="mkt-sm-node-sub">Victory Capital — Corporate Hub</div>
          </div>

          <div className="mkt-sm-connector-row"><div className="mkt-sm-line-vertical" /></div>

          <div className="mkt-sm-row mkt-sm-row-lenses">
            <div className="mkt-sm-node" style={{ '--n': '#5e8ab4' } as React.CSSProperties}>
              <div className="mkt-sm-node-icon">👤</div><div className="mkt-sm-node-title">Individual Investors</div>
            </div>
            <div className="mkt-sm-node" style={{ '--n': '#5e8ab4' } as React.CSSProperties}>
              <div className="mkt-sm-node-icon">🤝</div><div className="mkt-sm-node-title">Financial Professionals &amp; RIAs</div>
            </div>
            <div className="mkt-sm-node" style={{ '--n': '#5e8ab4' } as React.CSSProperties}>
              <div className="mkt-sm-node-icon">🏛️</div><div className="mkt-sm-node-title">Institutional Investors</div>
            </div>
          </div>

          <div className="mkt-sm-connector-row"><div className="mkt-sm-line-vertical" /></div>

          <div className="mkt-sm-row">
            <div className="mkt-sm-node mkt-sm-directory">
              <div className="mkt-sm-node-icon">📂</div>
              <div className="mkt-sm-node-title">Investment Franchises Directory</div>
              <div className="mkt-sm-node-sub">vcm.com/investment-franchises</div>
            </div>
          </div>

          <div className="mkt-sm-connector-row"><div className="mkt-sm-line-vertical" /></div>

          <div className="mkt-sm-row mkt-sm-row-franchises">
            {siteMapFranchises.map((f) => (
              <button
                key={f.key}
                className={`mkt-sm-node${f.interactive ? ' interactive' : ''}`}
                style={{ '--n': f.color } as React.CSSProperties}
                onClick={() => f.interactive && f.propertyKey && onSelectProperty(f.propertyKey)}
              >
                <div className="mkt-sm-node-icon">{f.icon}</div>
                <div className="mkt-sm-node-title">{f.name}</div>
                <div className="mkt-sm-badge-unified">✓ Unified</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mkt-sm-legend">
          <div className="mkt-sm-legend-item"><span className="mkt-sm-legend-dot" style={{ background: '#004a98' }} /> Corporate Hub</div>
          <div className="mkt-sm-legend-item"><span className="mkt-sm-legend-dot" style={{ background: '#5e8ab4' }} /> Investor-Type Lens</div>
          <div className="mkt-sm-legend-item"><span className="mkt-sm-legend-dot" style={{ background: '#0f766e' }} /> Investment Franchise (own accent color, one shared platform)</div>
        </div>
      </div>
    </div>
  );
}
