import type { CostBasisLot, DividendPayment, PerformancePoint, PerformanceStats, Transaction } from '../types';

export const transactionsByAccount: Record<string, Transaction[]> = {
  '0268': [
    { id: 't1', date: '07/23/2026', type: 'Distribution', fundName: 'Victory Aggressive Growth Fund', ticker: 'USAUX', amount: -1200.0, shares: -15.66, price: 76.62 },
    { id: 't2', date: '07/10/2026', type: 'Dividend', fundName: 'Victory Market Neutral Income Fund', ticker: 'CBHMX', amount: 42.18, shares: 4.52, price: 9.33 },
    { id: 't3', date: '06/28/2026', type: 'Buy', fundName: 'Victory Capital Growth Fund', ticker: 'USCGX', amount: -500.0, shares: 32.92, price: 15.19 },
    { id: 't4', date: '06/15/2026', type: 'Contribution', fundName: 'Victory Cornerstone Aggressive Fund', ticker: 'UCAGX', amount: 250.0, shares: 15.06, price: 16.6 },
    { id: 't5', date: '05/30/2026', type: 'Fee', fundName: 'Account Maintenance', ticker: '—', amount: -15.0, shares: null, price: null },
    { id: 't6', date: '05/12/2026', type: 'Sell', fundName: 'Victory Core Plus Intermediate Bond Fund', ticker: 'USBEX', amount: 904.0, shares: -100.0, price: 9.04 },
    { id: 't7', date: '04/22/2026', type: 'Dividend', fundName: 'Victory Cornerstone Conservative Fund', ticker: 'USCCX', amount: 18.4, shares: 1.61, price: 11.41 },
    { id: 't8', date: '03/03/2026', type: 'Buy', fundName: 'Victory Aggressive Growth Fund', ticker: 'USAUX', amount: -1000.0, shares: 13.05, price: 76.62 },
  ],
  '0667': [
    { id: 'it1', date: '06/02/2026', type: 'Dividend', fundName: 'Victory Aggressive Growth Fund', ticker: 'USAUX', amount: 61.2, shares: 0.8, price: 76.62 },
    { id: 'it2', date: '02/14/2026', type: 'Contribution', fundName: 'Victory Aggressive Growth Fund', ticker: 'USAUX', amount: 4100.0, shares: 53.5, price: 76.62 },
  ],
};

export const dividendsByAccount: Record<string, DividendPayment[]> = {
  '0268': [
    { id: 'd1', date: '07/10/2026', fundName: 'Victory Market Neutral Income Fund', ticker: 'CBHMX', amount: 42.18, reinvested: true, sharesPurchased: 4.52 },
    { id: 'd2', date: '04/22/2026', fundName: 'Victory Cornerstone Conservative Fund', ticker: 'USCCX', amount: 18.4, reinvested: true, sharesPurchased: 1.61 },
    { id: 'd3', date: '01/09/2026', fundName: 'Victory Market Neutral Income Fund', ticker: 'CBHMX', amount: 39.02, reinvested: true, sharesPurchased: 4.31 },
    { id: 'd4', date: '10/08/2025', fundName: 'Victory Cornerstone Equity Fund', ticker: 'UCEQX', amount: 22.75, reinvested: false, sharesPurchased: null },
  ],
  '0667': [
    { id: 'id1', date: '06/02/2026', fundName: 'Victory Aggressive Growth Fund', ticker: 'USAUX', amount: 61.2, reinvested: true, sharesPurchased: 0.8 },
  ],
};

export const costBasisByAccount: Record<string, CostBasisLot[]> = {
  '0268': [
    { id: 'l1', fundName: 'Victory Aggressive Growth Fund', ticker: 'USAUX', acquireDate: '03/03/2026', shares: 13.05, costBasis: 1000.0, currentValue: 1000.19, gainLoss: 0.19, term: 'Short-Term' },
    { id: 'l2', fundName: 'Victory Aggressive Growth Fund', ticker: 'USAUX', acquireDate: '08/14/2021', shares: 174.29, costBasis: 7423.02, currentValue: 13354.11, gainLoss: 5931.09, term: 'Long-Term' },
    { id: 'l3', fundName: 'Victory Capital Growth Fund', ticker: 'USCGX', acquireDate: '06/28/2026', shares: 32.92, costBasis: 500.0, currentValue: 500.13, gainLoss: 0.13, term: 'Short-Term' },
    { id: 'l4', fundName: 'Victory Capital Growth Fund', ticker: 'USCGX', acquireDate: '11/02/2019', shares: 265.05, costBasis: 2575.0, currentValue: 4025.96, gainLoss: 1450.96, term: 'Long-Term' },
    { id: 'l5', fundName: 'Victory Core Plus Intermediate Bond Fund', ticker: 'USBEX', acquireDate: '02/19/2020', shares: 312872, costBasis: 3457.24, currentValue: 2828.36, gainLoss: -628.87, term: 'Long-Term' },
  ],
  '0667': [
    { id: 'il1', fundName: 'Victory Aggressive Growth Fund', ticker: 'USAUX', acquireDate: '02/14/2026', shares: 53.5, costBasis: 4100.0, currentValue: 4099.17, gainLoss: -0.83, term: 'Short-Term' },
    { id: 'il2', fundName: 'Victory Aggressive Growth Fund', ticker: 'USAUX', acquireDate: '06/02/2015', shares: 19.5, costBasis: 0.0, currentValue: 1494.09, gainLoss: 1494.09, term: 'Long-Term' },
  ],
};

const oneYearSeries: PerformancePoint[] = [
  { label: 'Aug', value: 100 },
  { label: 'Sep', value: 102.3 },
  { label: 'Oct', value: 99.8 },
  { label: 'Nov', value: 104.5 },
  { label: 'Dec', value: 106.1 },
  { label: 'Jan', value: 103.9 },
  { label: 'Feb', value: 107.4 },
  { label: 'Mar', value: 105.2 },
  { label: 'Apr', value: 109.8 },
  { label: 'May', value: 111.6 },
  { label: 'Jun', value: 108.9 },
  { label: 'Jul', value: 113.2 },
];

export const performanceByAccount: Record<string, PerformancePoint[]> = {
  '0268': oneYearSeries,
  '0667': oneYearSeries.map((p) => ({ label: p.label, value: p.value * 0.97 + Math.sin(p.value) })),
};

export const performanceStatsByAccount: Record<string, PerformanceStats> = {
  '0268': { ytd: 8.4, oneYear: 13.2, threeYear: 9.6, fiveYear: 11.1, sinceInception: 7.8 },
  '0667': { ytd: 6.9, oneYear: 10.5, threeYear: 8.9, fiveYear: 10.2, sinceInception: 9.4 },
};
