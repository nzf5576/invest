export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  body: string;
}

export const insightArticles: InsightArticle[] = [
  {
    id: 'a1',
    title: 'Mid-Year Market Outlook: Where We See Opportunity',
    category: 'Market Commentary',
    date: '07/28/2026',
    author: 'Victory Capital Investment Team',
    readTime: '5 min read',
    summary: 'Equity markets have shrugged off early-year volatility. Here\'s where our portfolio managers are finding value heading into the back half of the year.',
    body: 'Equity markets have shrugged off early-year volatility, with large-cap growth leading the recovery. Our portfolio managers continue to favor high-quality companies with durable cash flows, while adding selectively to fixed income duration as the rate outlook stabilizes. International developed markets remain a source of diversification, though we\'re watching currency effects closely. As always, we encourage investors to stay focused on long-term goals rather than short-term headlines.',
  },
  {
    id: 'a2',
    title: 'Required Minimum Distributions: What Changed This Year',
    category: 'Retirement Planning',
    date: '07/15/2026',
    author: 'Victory Capital Retirement Solutions',
    readTime: '4 min read',
    summary: 'A quick refresher on RMD rules, deadlines, and how to avoid the most common mistakes retirees make with their distributions.',
    body: 'Required Minimum Distributions (RMDs) remain a common source of confusion for retirees. This year, remember: your first RMD deadline is April 1 of the year after you reach the applicable age, but every RMD after that is due by December 31. Missing a deadline can trigger a significant excise tax, so we recommend setting up automatic distributions well ahead of time. If you\'ve inherited an IRA, different rules may apply — talk to your specialist about your specific situation.',
  },
  {
    id: 'a3',
    title: '5 Tax Moves to Consider Before Year-End',
    category: 'Tax Planning',
    date: '06/30/2026',
    author: 'Victory Capital Tax Insights',
    readTime: '6 min read',
    summary: 'From tax-loss harvesting to maximizing contribution limits, these are the moves our specialists most often recommend before the calendar turns.',
    body: 'As the year winds down, a few proactive moves can meaningfully reduce your tax bill: (1) harvest losses in taxable accounts to offset realized gains, (2) max out IRA and 401(k) contributions if you haven\'t already, (3) consider a Roth conversion in a lower-income year, (4) review your withholding to avoid a surprise bill, and (5) make charitable contributions before December 31 if you plan to itemize. Victory Capital does not provide tax advice — please consult your tax professional about your specific circumstances.',
  },
  {
    id: 'a4',
    title: 'Fund Update: Victory Aggressive Growth Fund Q2 Review',
    category: 'Fund Updates',
    date: '06/12/2026',
    author: 'Victory Capital Fund Management',
    readTime: '3 min read',
    summary: 'A look back at what drove performance in the Victory Aggressive Growth Fund (USAUX) last quarter, and how the portfolio is positioned going forward.',
    body: 'The Victory Aggressive Growth Fund posted solid gains in the second quarter, driven primarily by strong stock selection in technology and industrials. The fund\'s largest overweight positions benefited from continued earnings growth, while the management team trimmed exposure to more rate-sensitive sectors. Turnover remained low, consistent with the fund\'s long-term, low-turnover approach to growth investing.',
  },
  {
    id: 'a5',
    title: 'Saving for College: 529 Plans vs. Coverdell ESAs',
    category: 'Education Savings',
    date: '05/22/2026',
    author: 'Victory Capital Education Planning',
    readTime: '5 min read',
    summary: 'Both accounts offer tax-advantaged growth for education expenses, but the rules differ in important ways. Here\'s how to decide which fits your family.',
    body: 'Coverdell Education Savings Accounts (ESAs) and 529 plans both grow tax-free when used for qualified education expenses, but they differ in contribution limits, income restrictions, and eligible expenses. Coverdell ESAs cap contributions at $2,000 per year per beneficiary and phase out at higher incomes, but can be used for K-12 expenses as well as college. 529 plans generally allow much higher contribution limits with no income restriction. Many families use both to maximize flexibility.',
  },
  {
    id: 'a6',
    title: 'Understanding Cost Basis Methods and Why They Matter',
    category: 'Tax Planning',
    date: '04/18/2026',
    author: 'Victory Capital Tax Insights',
    readTime: '4 min read',
    summary: 'Average cost, FIFO, specific lot identification — the method you choose can meaningfully change your tax bill when you sell. Here\'s the difference.',
    body: 'Your cost basis method determines which shares are considered "sold" first when you redeem part of a position, which in turn affects your realized gain or loss. Average cost is the simplest and most common default for mutual funds, spreading your basis evenly across all shares. Specific lot identification gives you the most control, letting you choose which lots to sell to manage your tax outcome. You can review and change your account\'s method under Cost Basis in each account\'s detail page.',
  },
];

export const insightCategories = Array.from(new Set(insightArticles.map((a) => a.category)));
