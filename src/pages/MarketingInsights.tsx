import { useState } from 'react';
import type { FranchiseKey } from '../types/marketing';
import { franchises } from '../data/franchises';
import { marketingInsightFranchises, marketingInsights } from '../data/marketingInsights';
import PreviewBar from '../components/marketing/PreviewBar';
import MasterBar from '../components/marketing/MasterBar';
import MarketingNav from '../components/marketing/MarketingNav';
import TrustBand from '../components/marketing/TrustBand';
import MarketingFooter from '../components/marketing/MarketingFooter';
import '../styles/marketing.css';

const franchiseLabel: Record<FranchiseKey, string> = {
  corporate: 'Victory Capital',
  westend: 'WestEnd Advisors',
  pioneer: 'Pioneer Investments',
  sycamore: 'Sycamore Capital',
};

export default function MarketingInsights() {
  const [activeKey, setActiveKey] = useState<FranchiseKey>('corporate');
  const [filter, setFilter] = useState<'all' | FranchiseKey>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const property = franchises[activeKey];

  const visible = filter === 'all' ? marketingInsights : marketingInsights.filter((a) => a.franchise === filter);

  return (
    <div className="mkt-site" style={{ '--mkt-accent': property.accent, '--mkt-accent-bg': property.accentBg } as React.CSSProperties}>
      <PreviewBar active={activeKey} onChange={setActiveKey} />
      <MasterBar active={activeKey} onSelectProperty={setActiveKey} onScrollToContact={() => {}} />
      <MarketingNav property={property} active="insights" />

      <div className="mkt-section">
        <div className="mkt-section-label">📰 Thought Leadership</div>
        <h1 className="mkt-section-title">Insights &amp; Perspectives</h1>
        <p className="mkt-section-desc">
          Research and commentary from across our family of independent investment franchises — each bringing its
          own philosophy and process to the markets they cover.
        </p>

        <div className="filter-row" role="group" aria-label="Filter insights by franchise" style={{ background: 'none', padding: '0 0 28px', border: 'none' }}>
          <span className="filter-label">Franchise:</span>
          <button className={`filter-chip${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>
            All Insights
          </button>
          {marketingInsightFranchises.map((key) => (
            <button
              key={key}
              className={`filter-chip${filter === key ? ' active' : ''}`}
              style={filter === key ? { background: franchises[key].accent, borderColor: franchises[key].accent } : undefined}
              onClick={() => setFilter(key)}
            >
              {franchiseLabel[key]}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {visible.map((a) => {
            const isOpen = openId === a.id;
            const accent = franchises[a.franchise].accent;
            return (
              <article
                key={a.id}
                style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 22, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', cursor: 'pointer' }}
                onClick={() => setOpenId(isOpen ? null : a.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span
                    style={{ fontSize: 11.5, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: `${accent}1a`, color: accent }}
                  >
                    {franchiseLabel[a.franchise]}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{a.date}</span>
                </div>
                <h3 style={{ fontSize: 17, color: 'var(--text-1)', marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.6, margin: 0 }}>
                  {isOpen ? a.body : a.summary}
                </p>
                <div style={{ marginTop: 12, fontSize: 13, fontWeight: 700, color: accent }}>
                  {isOpen ? 'Show less ▲' : 'Read more ▼'}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <TrustBand property={property} />
      <MarketingFooter property={property} />
    </div>
  );
}
