export type AccountTypeKey = 'victory-funds' | 'education-savings' | 'marketplace' | 'wealth-advisory';

export interface AccountTypeSummary {
  key: AccountTypeKey;
  label: string;
  value: number;
  pctOfPortfolio: number;
  color: string;
  sub: string;
  accountsCount: number;
  hasHoldings: boolean;
}

export interface Holding {
  id: string;
  name: string;
  ticker: string;
  category: string;
  color: string;
  nav: number;
  changeAmt: number;
  changePct: number;
  shares: number;
  value: number;
  costBasis: number;
  gainLoss: number | null;
  accountNumber: string;
}

export interface Account {
  id: string;
  registration: string;
  regNumber: string;
  typeLabel: string;
  owner: string;
  address: string[];
  openDate: string;
  status: 'Active' | 'Pending' | 'Closed';
  lotReliefMethod: string;
  value: number;
  costBasis: number;
  estGain: number;
  estGainPct: number;
  oneDayChange: number;
  oneDayChangePct: number;
  holdings: Holding[];
}

export interface Goal {
  id: string;
  icon: string;
  name: string;
  targetAmount: number;
  targetYear: number;
  currentAmount: number;
  pct: number;
  color: string;
}

export interface SavedApplication {
  id: string;
  text: string;
  date: string;
}

export interface Message {
  id: string;
  text: string;
  date: string;
  unread: boolean;
  body?: string;
}

export type TransactionType = 'Buy' | 'Sell' | 'Dividend' | 'Contribution' | 'Distribution' | 'Fee' | 'Transfer';

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  fundName: string;
  ticker: string;
  amount: number;
  shares: number | null;
  price: number | null;
}

export interface DividendPayment {
  id: string;
  date: string;
  fundName: string;
  ticker: string;
  amount: number;
  reinvested: boolean;
  sharesPurchased: number | null;
}

export interface CostBasisLot {
  id: string;
  fundName: string;
  ticker: string;
  acquireDate: string;
  shares: number;
  costBasis: number;
  currentValue: number;
  gainLoss: number;
  term: 'Short-Term' | 'Long-Term';
}

export interface PerformancePoint {
  label: string;
  value: number;
}

export interface PerformanceStats {
  ytd: number;
  oneYear: number;
  threeYear: number;
  fiveYear: number;
  sinceInception: number;
}

export type DocumentType = 'Statement' | 'Tax Form' | 'Confirmation' | 'Prospectus';

export interface PortalDocument {
  id: string;
  name: string;
  type: DocumentType;
  date: string;
  accountId: string;
  size: string;
}

export interface FormItem {
  id: string;
  name: string;
  category: string;
  description: string;
}
