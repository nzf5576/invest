import type { FranchiseKey } from '../types/marketing';

export interface MarketingInsight {
  id: string;
  franchise: FranchiseKey;
  title: string;
  date: string;
  summary: string;
  body: string;
}

export const marketingInsights: MarketingInsight[] = [
  {
    id: 'mi1',
    franchise: 'corporate',
    title: 'The Case for Diversified Multi-Manager Investing',
    date: '07/22/2026',
    summary: 'Why bringing together independent investment franchises under one roof can smooth returns across market cycles.',
    body: 'No single investment philosophy performs best in every environment. By bringing together independent franchises with distinct approaches — macro-driven, research-intensive, value-oriented — Victory Capital gives investors access to a range of return drivers that don\'t all move in lockstep. This diversification of process, not just of holdings, is a core part of how we think about building resilient portfolios across market cycles.',
  },
  {
    id: 'mi2',
    franchise: 'westend',
    title: 'Q3 Macro Outlook: Navigating a Shifting Rate Environment',
    date: '07/10/2026',
    summary: 'Our macro research points to a gradual easing cycle ahead — here\'s how we\'re positioning our ETF portfolios.',
    body: 'Our ongoing analysis of over 200 macroeconomic data series suggests the tightening cycle has run its course, with policymakers likely to shift toward gradual easing in the coming quarters. We\'ve modestly extended duration in our balanced strategies while maintaining a tilt toward sectors we expect to benefit from lower financing costs. As always, our sector and asset allocations will continue to adjust as the data evolves.',
  },
  {
    id: 'mi3',
    franchise: 'pioneer',
    title: 'Finding Value in an Expensive Market',
    date: '06/25/2026',
    summary: 'Broad index valuations look stretched, but our bottom-up research is still surfacing attractive opportunities.',
    body: 'While headline index valuations look elevated, dispersion beneath the surface remains wide. Our research process is finding attractively priced, high-quality businesses in segments of the market that have lagged the broader rally — particularly in industrials and select healthcare names. Careful security selection matters more, not less, in markets like this one.',
  },
  {
    id: 'mi4',
    franchise: 'sycamore',
    title: 'Why Small Cap Value Looks Attractive Today',
    date: '06/08/2026',
    summary: 'Valuations for small and mid cap value stocks remain near multi-year lows relative to large cap growth.',
    body: 'Small and mid cap value stocks continue to trade at a meaningful valuation discount to large cap growth, a gap that has historically preceded periods of outperformance for the asset class. Our disciplined, sustainable approach to value investing focuses on companies with strong balance sheets and improving fundamentals — the kind of businesses we believe are best positioned to close that gap.',
  },
  {
    id: 'mi5',
    franchise: 'corporate',
    title: 'ESG Integration Across Our Franchise Family',
    date: '05/19/2026',
    summary: 'How our investment franchises incorporate material environmental, social, and governance factors into research.',
    body: 'Each of our investment franchises integrates environmental, social, and governance considerations in a way that fits its own investment process — there\'s no one-size-fits-all approach. What\'s consistent across the family is a belief that material ESG factors, like any other fundamental input, can affect long-term business quality and should be part of a rigorous research process.',
  },
  {
    id: 'mi6',
    franchise: 'westend',
    title: 'Sector Rotation Signals to Watch This Quarter',
    date: '05/02/2026',
    summary: 'Our macro dashboard is flashing a handful of early rotation signals worth watching heading into the next quarter.',
    body: 'A handful of our macro indicators — credit spreads, manufacturing PMIs, and yield curve dynamics among them — are beginning to shift in ways that have historically preceded sector rotations. We\'re watching closely for confirmation before making meaningful changes, consistent with our disciplined, data-driven process.',
  },
];

export const marketingInsightFranchises: FranchiseKey[] = ['corporate', 'westend', 'pioneer', 'sycamore'];
