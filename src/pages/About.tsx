import { useState } from 'react';
import type { FranchiseKey } from '../types/marketing';
import { franchises } from '../data/franchises';
import PreviewBar from '../components/marketing/PreviewBar';
import MasterBar from '../components/marketing/MasterBar';
import MarketingNav from '../components/marketing/MarketingNav';
import TrustBand from '../components/marketing/TrustBand';
import MarketingFooter from '../components/marketing/MarketingFooter';
import '../styles/marketing.css';

const stats = [
  { value: '9', label: 'Investment Franchises' },
  { value: '$398K', label: 'Illustrative Assets Shown' },
  { value: '2018', label: 'Fictional "Founding" Year' },
  { value: '0', label: 'Real Client Accounts' },
];

const values = [
  { icon: '🎯', title: 'Client-First', desc: 'Every mock feature on this site was designed around a fictional client\'s day-to-day needs.' },
  { icon: '🧭', title: 'Independent Expertise', desc: 'Each imagined franchise keeps its own investment philosophy, unified by shared design patterns.' },
  { icon: '🔍', title: 'Transparency', desc: 'This prototype is upfront about what it is: a demonstration, not a financial institution.' },
  { icon: '🌱', title: 'Long-Term Thinking', desc: 'Built as a reusable pattern library for exploring investment portal UX, not a one-off screen.' },
];

const leaders = [
  { initials: 'AR', color: '#004a98', name: 'Alex Rivera', title: 'Chief Executive Officer (Fictional)', bio: 'A placeholder persona created for this prototype. Not a real person.' },
  { initials: 'JM', color: '#08A367', name: 'Jordan Marsh', title: 'Chief Investment Officer (Fictional)', bio: 'Oversees the imaginary investment process across all nine mock franchises.' },
  { initials: 'PK', color: '#7c3aed', name: 'Priya Kapoor', title: 'Chief Technology Officer (Fictional)', bio: 'Responsible for the design and engineering of this demonstration platform.' },
  { initials: 'TW', color: '#dc2626', name: 'Taylor Wu', title: 'Head of Client Experience (Fictional)', bio: 'Shaped the mock account-opening, trading, and support flows shown here.' },
];

export default function About() {
  const [activeKey, setActiveKey] = useState<FranchiseKey>('corporate');
  const property = franchises[activeKey];

  return (
    <div className="mkt-site" style={{ '--mkt-accent': property.accent, '--mkt-accent-bg': property.accentBg } as React.CSSProperties}>
      <PreviewBar active={activeKey} onChange={setActiveKey} />
      <MasterBar active={activeKey} onSelectProperty={setActiveKey} />
      <MarketingNav property={property} active="about" />

      <div className="mkt-disclaimer-banner">
        <div className="mkt-disclaimer-inner">
          <span className="mkt-disclaimer-icon" aria-hidden="true">⚠️</span>
          <div className="mkt-disclaimer-text">
            <strong>This is not a real website.</strong> Victory Capital, its investment franchises, leadership team,
            and everything else on this site are entirely fictional. This is a design prototype built to demonstrate
            investment portal UX — it is not a real company, does not offer real financial products or advice, and
            should not be used to make any actual financial decisions.
          </div>
        </div>
      </div>

      <div className="mkt-section">
        <div className="mkt-section-label">🏛️ About Victory Capital</div>
        <h1 className="mkt-section-title">A Prototype, Not a Financial Institution</h1>
        <p className="mkt-section-desc">
          "Victory Capital" is an imagined asset management firm created to showcase how a multi-brand investment
          platform might look and feel — from the public marketing site down to account statements. Every name,
          number, and leader you see here was invented for that purpose.
        </p>

        <div className="mkt-stats-row">
          {stats.map((s) => (
            <div className="mkt-stat-tile" key={s.label}>
              <div className="mkt-stat-tile-value">{s.value}</div>
              <div className="mkt-stat-tile-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mkt-section" style={{ paddingTop: 0 }}>
        <div className="mkt-section-label">What This Prototype Values</div>
        <h2 className="mkt-section-title">Design Principles Behind the Mockup</h2>
        <div className="mkt-card-grid">
          {values.map((v) => (
            <div className="mkt-strategy-card" key={v.title}>
              <div className="mkt-strategy-card-accent" />
              <div className="mkt-strategy-card-body">
                <div className="mkt-strategy-card-icon">{v.icon}</div>
                <div className="mkt-strategy-card-title">{v.title}</div>
                <div className="mkt-strategy-card-desc">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mkt-section" style={{ paddingTop: 0 }}>
        <div className="mkt-section-label">Fictional Leadership</div>
        <h2 className="mkt-section-title">Meet the (Invented) Team</h2>
        <p className="mkt-section-desc">
          These profiles are placeholders created for this demo — they don't represent real employees of any
          company.
        </p>
        <div className="mkt-leader-grid">
          {leaders.map((l) => (
            <div className="mkt-leader-card" key={l.name}>
              <div className="mkt-leader-avatar" style={{ background: l.color }}>{l.initials}</div>
              <div className="mkt-leader-name">{l.name}</div>
              <div className="mkt-leader-title">{l.title}</div>
              <div className="mkt-leader-bio">{l.bio}</div>
            </div>
          ))}
        </div>
      </div>

      <TrustBand property={property} />
      <MarketingFooter property={property} />
    </div>
  );
}
