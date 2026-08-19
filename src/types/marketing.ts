export type FranchiseKey = 'corporate' | 'westend' | 'pioneer' | 'sycamore';

export interface StrategyCard {
  icon: string;
  title: string;
  desc: string;
  link: string;
}

export interface FranchiseProperty {
  key: FranchiseKey;
  accent: string;
  accentBg: string;
  showFranchise: boolean;
  franchiseName?: string;
  eyebrow: string;
  title: string;
  desc: string;
  heroPrimaryBtn: string;
  navCta: string;
  sectionLabel: string;
  sectionTitle: string;
  sectionDesc: string;
  cards: StrategyCard[];
  trustStrong: string;
  trustBody: string;
  footerDesc: string;
  footerFranchiseNote: string;
}

export interface SiteMapFranchise {
  key: string;
  icon: string;
  name: string;
  color: string;
  interactive: boolean;
  propertyKey?: FranchiseKey;
}

export type LoginTab = 'investor' | 'advisor' | 'institutional';
