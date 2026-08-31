import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FranchiseKey } from '../types/marketing';
import { demoProperties, franchises } from '../data/franchises';
import PreviewBar from '../components/marketing/PreviewBar';
import MasterBar from '../components/marketing/MasterBar';
import MarketingNav from '../components/marketing/MarketingNav';
import MarketingHero from '../components/marketing/MarketingHero';
import SiteMap from '../components/marketing/SiteMap';
import StrategyCards from '../components/marketing/StrategyCards';
import ContactSection from '../components/marketing/ContactSection';
import TrustBand from '../components/marketing/TrustBand';
import MarketingFooter from '../components/marketing/MarketingFooter';
import '../styles/marketing.css';

function isFranchiseKey(value: string | null): value is FranchiseKey {
  return demoProperties.includes(value as FranchiseKey);
}

export default function MarketingSite() {
  const [searchParams] = useSearchParams();
  const franchiseParam = searchParams.get('franchise');
  const [activeKey, setActiveKey] = useState<FranchiseKey>(isFranchiseKey(franchiseParam) ? franchiseParam : 'corporate');
  const contactRef = useRef<HTMLDivElement>(null);

  const property = franchises[activeKey];

  function scrollToContact() {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div
      className="mkt-site"
      style={{ '--mkt-accent': property.accent, '--mkt-accent-bg': property.accentBg } as React.CSSProperties}
    >
      <PreviewBar active={activeKey} onChange={setActiveKey} />
      <MasterBar active={activeKey} onSelectProperty={setActiveKey} onScrollToContact={scrollToContact} />
      <MarketingNav property={property} />
      <MarketingHero property={property} />
      <SiteMap onSelectProperty={setActiveKey} />
      <StrategyCards property={property} />
      <ContactSection ref={contactRef} />
      <TrustBand property={property} />
      <MarketingFooter property={property} />
    </div>
  );
}
