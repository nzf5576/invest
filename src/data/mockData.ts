import type { Account, AccountTypeSummary, Goal, Message, SavedApplication } from '../types';

export const currentUser = {
  firstName: 'Linda',
  initials: 'L',
};

export const specialist = {
  name: 'John Rankin',
  initials: 'JR',
  email: 'jrankin@vcm.com',
  ext: '16025',
};

export const portfolioAsOf = 'July 23, 2026';
export const portfolioTotalValue = 398057.33;
export const portfolioYtdPct = 2.4;

export const accountTypeSummaries: AccountTypeSummary[] = [
  {
    key: 'victory-funds',
    label: 'Victory Funds',
    value: 275825.82,
    pctOfPortfolio: 69.3,
    color: 'var(--navy)',
    sub: 'Mutual Funds & ETFs',
    accountsCount: 3,
    hasHoldings: true,
  },
  {
    key: 'wealth-advisory',
    label: 'Wealth Advisory',
    value: 122171.51,
    pctOfPortfolio: 30.7,
    color: 'var(--amber)',
    sub: 'Managed Portfolios',
    accountsCount: 1,
    hasHoldings: true,
  },
  {
    key: 'education-savings',
    label: 'Education Savings',
    value: 60.0,
    pctOfPortfolio: 0.1,
    color: 'var(--accent)',
    sub: '529 Plan',
    accountsCount: 1,
    hasHoldings: true,
  },
  {
    key: 'marketplace',
    label: 'Marketplace',
    value: 0,
    pctOfPortfolio: 0,
    color: 'var(--orange)',
    sub: 'No holdings yet',
    accountsCount: 0,
    hasHoldings: false,
  },
];

export const goals: Goal[] = [
  { id: 'retirement', icon: '🏖️', name: 'Retirement', targetAmount: 1200000, targetYear: 2042, currentAmount: 398000, pct: 33, color: 'var(--navy)', accountIds: ['0268', '0667'] },
  { id: 'college', icon: '🎓', name: 'College Fund', targetAmount: 120000, targetYear: 2035, currentAmount: 60, pct: 1, color: 'var(--accent)', accountIds: ['0268'] },
  { id: 'home', icon: '🏠', name: 'Home Purchase', targetAmount: 80000, targetYear: 2028, currentAmount: 49600, pct: 62, color: 'var(--teal)', accountIds: ['0268'] },
];

export const savedApplications: SavedApplication[] = [
  { id: 'app0', text: 'Complete your request to Open a Coverdell Education Savings Account', date: 'Saved July 23, 2026' },
  { id: 'app1', text: 'Complete your request to Open an Account', date: 'Saved July 13, 2026' },
  { id: 'app2', text: 'Complete your Victory Funds UGMA/UTMA Account Application', date: 'Saved July 09, 2026' },
];

export const messages: Message[] = [
  {
    id: 'm0',
    text: 'Confirmation: Your Request to Process a Distribution Has Been Received',
    date: '07/23/2026',
    unread: true,
    body: 'We\'ve received your request to process a distribution from account *0667. Please allow 3-5 business days for delivery. You can review the details of this request under your account\'s Activity tab.',
  },
  {
    id: 'm1',
    text: 'Your Beneficiary Information May Be Out of Date',
    date: '07/20/2026',
    unread: true,
    body: 'We periodically ask account holders to confirm their beneficiary designations are current. Please review your beneficiaries on file under Account Details to make sure they reflect your wishes.',
  },
  {
    id: 'm2',
    text: 'Your Q2 Statement is now available',
    date: '07/10/2026',
    unread: true,
    body: 'Your Q2 2026 account statement has been generated and is available in the Document Center. Statements are retained online for 7 years.',
  },
  {
    id: 'm3',
    text: 'Trade Confirmation: Buy Order Executed',
    date: '06/28/2026',
    unread: false,
    body: 'Your buy order for Victory Capital Growth Fund (USCGX) has executed. A confirmation has been posted to your Document Center.',
  },
  {
    id: 'm4',
    text: 'Welcome to the redesigned inVest portal',
    date: '06/01/2026',
    unread: false,
    body: 'We\'ve refreshed the client portal with a new dashboard, expanded account activity views, and faster money movement tools. Let us know what you think using the help button in the corner of any page.',
  },
];

export const accounts: Record<string, Account> = {
  '0268': {
    id: '0268',
    registration: 'Individual *0268',
    regNumber: 'IND 02040907',
    typeLabel: 'Victory Funds: Individual',
    owner: 'Linda S. Kline',
    address: ['15935 La Cantera Pkwy', 'San Antonio, TX 78256'],
    openDate: 'March 14, 2018',
    status: 'Active',
    lotReliefMethod: 'Average Cost',
    value: 30463.77,
    costBasis: 21108.88,
    estGain: 7599.36,
    estGainPct: 36.0,
    oneDayChange: -316.54,
    oneDayChangePct: -1.03,
    holdings: [
      { id: 'r1', name: 'Victory Core Plus Intermediate Bond Fund', ticker: 'USBEX', category: 'Fixed Income', color: 'var(--navy)', nav: 9.04, changeAmt: -0.03, changePct: -0.33, shares: 312872, value: 2828.36, costBasis: 3457.24, gainLoss: -628.87, accountNumber: '30000088390' },
      { id: 'r2', name: 'Victory Aggressive Growth Fund', ticker: 'USAUX', category: 'Large Growth', color: 'var(--accent)', nav: 76.62, changeAmt: -1.31, changePct: -1.68, shares: 187344, value: 14354.30, costBasis: 8423.02, gainLoss: 5931.27, accountNumber: '38000133405' },
      { id: 'r3', name: 'Victory Cornerstone Moderate Fund', ticker: 'USBSX', category: 'Moderate Allocation', color: 'var(--purple)', nav: 16.65, changeAmt: -0.11, changePct: -0.66, shares: 0, value: 0, costBasis: 0, gainLoss: null, accountNumber: '47000083270' },
      { id: 'r4', name: 'Victory Cornerstone Aggressive Fund', ticker: 'UCAGX', category: 'Aggressive Allocation', color: 'var(--orange)', nav: 16.60, changeAmt: -0.14, changePct: -0.84, shares: 40750, value: 676.45, costBasis: 500.00, gainLoss: 176.45, accountNumber: '49000121439' },
      { id: 'r5', name: 'Victory Capital Growth Fund', ticker: 'USCGX', category: 'Large Growth', color: 'var(--teal)', nav: 15.19, changeAmt: -0.14, changePct: -0.91, shares: 297965, value: 4526.09, costBasis: 3075.00, gainLoss: 1451.09, accountNumber: '72000061011' },
      { id: 'r6', name: 'Victory Cornerstone Conservative Fund', ticker: 'USCCX', category: 'Conservative Allocation', color: 'var(--amber)', nav: 11.41, changeAmt: -0.05, changePct: -0.44, shares: 53712, value: 612.85, costBasis: 600.00, gainLoss: 12.85, accountNumber: '78000096547' },
      { id: 'r7', name: 'Victory Cornerstone Equity Fund', ticker: 'UCEQX', category: 'Large Blend', color: 'var(--primary)', nav: 23.16, changeAmt: -0.24, changePct: -1.03, shares: 43073, value: 997.57, costBasis: 600.00, gainLoss: 397.57, accountNumber: '79000096539' },
      { id: 'r8', name: 'Victory Market Neutral Income Fund', ticker: 'CBHMX', category: 'Market Neutral', color: 'var(--green)', nav: 9.33, changeAmt: -0.01, changePct: -0.11, shares: 693264, value: 6468.15, costBasis: 6932.64, gainLoss: -464.49, accountNumber: '20700034705' },
    ],
  },
  '0667': {
    id: '0667',
    registration: 'Traditional IRA *0667',
    regNumber: 'IRA 00840667',
    typeLabel: 'Victory Funds: Traditional IRA',
    owner: 'Linda S. Kline',
    address: ['15935 La Cantera Pkwy', 'San Antonio, TX 78256'],
    openDate: 'June 02, 2015',
    status: 'Active',
    lotReliefMethod: 'Average Cost',
    value: 5570.93,
    costBasis: 4100.00,
    estGain: 1470.93,
    estGainPct: 35.9,
    oneDayChange: -47.12,
    oneDayChangePct: -0.84,
    holdings: [
      { id: 'ira1', name: 'Victory Aggressive Growth Fund', ticker: 'USAUX', category: 'Large Growth', color: 'var(--accent)', nav: 76.62, changeAmt: -1.31, changePct: -1.68, shares: 73, value: 5570.93, costBasis: 4100.00, gainLoss: 1470.93, accountNumber: '38000199217' },
    ],
  },
};

export const defaultAccountId = '0268';
export const iraAccountId = '0667';
