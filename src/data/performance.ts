import { accounts } from './mockData';

export type Timeframe = 'ytd' | '1yr' | '3yr' | '5yr' | 'si';
export type MetricKey = 'abs' | 'rel' | 'twr' | 'mwr' | 'risk';

export const TF_ORDER: Timeframe[] = ['ytd', '1yr', '3yr', '5yr', 'si'];
export const TF_LABELS: Record<Timeframe, string> = {
  ytd: 'YTD',
  '1yr': '1 Yr.',
  '3yr': '3 Yr.',
  '5yr': '5 Yr.',
  si: 'Since Inception',
};

/* ===================== ACCOUNT CATALOG (built from real account records) ===================== */
export interface CatalogAccount {
  key: string;
  label: string;
}

export const accountCatalog: Record<string, CatalogAccount[]> = Object.values(accounts).reduce(
  (groups, acct) => {
    const group = acct.typeLabel.split(':')[0].trim();
    const label = acct.typeLabel.split(':')[1]?.trim() ?? acct.registration;
    (groups[group] ??= []).push({ key: acct.id, label: `${label} ${acct.registration.match(/\*\d+/)?.[0] ?? ''}`.trim() });
    return groups;
  },
  {} as Record<string, CatalogAccount[]>,
);

export function findAccountLabel(key: string): string {
  for (const group of Object.values(accountCatalog)) {
    const found = group.find((a) => a.key === key);
    if (found) return found.label;
  }
  return key;
}

export function scopeLabel(keys: string[]): string {
  if (!keys.length) return 'All Accounts';
  if (keys.length === 1) return findAccountLabel(keys[0]);
  return `${keys.length} Accounts Selected`;
}

export function narrativeScope(keys: string[]): string {
  if (!keys.length) return 'All Accounts';
  return keys.map(findAccountLabel).join(', ');
}

/* Illustrative per-account offsets (percentage points) applied to baseline "All Accounts" figures */
const acctPctOffset: Record<string, number> = { '0268': 0.4, '0667': -0.6 };
const acctRiskOffset: Record<string, number> = { '0268': 0.03, '0667': -0.04 };

function avg(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / (values.length || 1);
}
export function getBlendedPctOffset(keys: string[]): number {
  if (!keys.length) return 0;
  return avg(keys.map((k) => acctPctOffset[k] ?? 0));
}
export function getBlendedRiskOffset(keys: string[]): number {
  if (!keys.length) return 0;
  return avg(keys.map((k) => acctRiskOffset[k] ?? 0));
}
export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/* ===================== FORMATTERS ===================== */
export function fmtPct(v: number): string {
  return `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;
}
export function fmtMoney0(v: number): string {
  return `$${Math.round(v).toLocaleString()}`;
}
export function formatMoney(v: number): string {
  if (Math.abs(v) >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (Math.abs(v) >= 1_000) return `$${Math.round(v / 1_000)}K`;
  return `$${Math.round(v)}`;
}

/* ===================== BASELINE ("All Accounts") METRIC DATA ===================== */
interface AbsTwrEntry {
  val: number;
  barPct: number;
  from?: number;
  chart: number[];
  labels: string[];
}
interface RelEntry {
  val: number;
  barPct: number;
  you: number;
  sp: number;
  blend: number;
}
interface MwrEntry {
  val: number;
  barPct: number;
  cashflows: string[];
}
interface RiskEntry {
  sharpe: number;
  sortino: number;
  sharpePct: number;
  sortinoPct: number;
}

export const metricData: {
  abs: { badgeSuffix: string } & Record<Timeframe, AbsTwrEntry>;
  rel: { badgeSuffix: string } & Record<Timeframe, RelEntry>;
  twr: { badgeSuffix: string } & Record<Timeframe, AbsTwrEntry>;
  mwr: { badgeSuffix: string } & Record<Timeframe, MwrEntry>;
  risk: { badgeSuffix: string } & Record<Timeframe, RiskEntry>;
} = {
  abs: {
    badgeSuffix: 'Raw % Gain/Loss',
    ytd: { val: 8.4, barPct: 70, from: 54746, chart: [35, 48, 30, 58, 70, 64, 85, 100], labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] },
    '1yr': { val: 12.9, barPct: 82, from: 52540, chart: [30, 42, 38, 55, 48, 62, 58, 72, 68, 80, 90, 100], labels: ['S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'] },
    '3yr': { val: 31.2, barPct: 92, from: 45220, chart: [20, 32, 28, 45, 58, 52, 68, 74, 70, 85, 92, 100], labels: ['Y1Q1', 'Q2', 'Q3', 'Q4', 'Y2Q1', 'Q2', 'Q3', 'Q4', 'Y3Q1', 'Q2', 'Q3', 'Q4'] },
    '5yr': { val: 52.6, barPct: 100, from: 38870, chart: [15, 22, 30, 28, 40, 48, 55, 62, 58, 70, 82, 100], labels: ["'22", '', '', "'23", '', '', "'24", '', '', "'25", '', "'26"] },
    si: { val: 74.3, barPct: 100, from: 34040, chart: [10, 16, 14, 24, 30, 28, 38, 46, 52, 60, 72, 88, 94, 100], labels: ['Incept.', '', '', '', '', '', '', '', '', '', '', '', '', 'Now'] },
  },
  rel: {
    badgeSuffix: 'vs. Benchmark',
    ytd: { val: -2.8, barPct: 30, you: 8.4, sp: 11.2, blend: 7.9 },
    '1yr': { val: -1.6, barPct: 40, you: 12.9, sp: 14.5, blend: 12.1 },
    '3yr': { val: 2.1, barPct: 78, you: 31.2, sp: 29.1, blend: 27.6 },
    '5yr': { val: -3.4, barPct: 55, you: 52.6, sp: 56.0, blend: 50.8 },
    si: { val: 4.8, barPct: 85, you: 74.3, sp: 69.5, blend: 65.2 },
  },
  twr: {
    badgeSuffix: 'Fund/Manager Performance',
    ytd: { val: 11.6, barPct: 85, chart: [50, 40, 62, 55, 78, 70, 88, 100], labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] },
    '1yr': { val: 16.2, barPct: 92, chart: [45, 52, 48, 62, 58, 70, 66, 78, 82, 90, 95, 100], labels: ['S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'] },
    '3yr': { val: 34.5, barPct: 96, chart: [30, 38, 34, 50, 60, 56, 72, 78, 74, 88, 94, 100], labels: ['Y1Q1', 'Q2', 'Q3', 'Q4', 'Y2Q1', 'Q2', 'Q3', 'Q4', 'Y3Q1', 'Q2', 'Q3', 'Q4'] },
    '5yr': { val: 58.9, barPct: 100, chart: [18, 25, 32, 30, 42, 50, 58, 64, 60, 74, 86, 100], labels: ["'22", '', '', "'23", '', '', "'24", '', '', "'25", '', "'26"] },
    si: { val: 79.1, barPct: 100, chart: [12, 18, 16, 26, 32, 30, 40, 48, 54, 62, 74, 90, 96, 100], labels: ['Incept.', '', '', '', '', '', '', '', '', '', '', '', '', 'Now'] },
  },
  mwr: {
    badgeSuffix: 'Your Personal Rate of Return',
    ytd: { val: 8.4, barPct: 70, cashflows: ['🟢 Jan 15 — Deposited $1,000', '🔴 Apr 22 — Withdrew $500', '🟢 Jun 30 — Deposited $2,700'] },
    '1yr': { val: 13.5, barPct: 86, cashflows: ['🟢 Oct 3 — Deposited $1,500', '🔴 Jan 10 — Withdrew $800', '🟢 Apr 22 — Deposited $1,000', '🟢 Jun 30 — Deposited $2,700'] },
    '3yr': { val: 28.7, barPct: 88, cashflows: ['🟢 Multiple recurring deposits ($400/mo avg)', '🔴 Two withdrawals totaling $2,200', '🟢 One lump-sum deposit of $5,000 (Yr2)'] },
    '5yr': { val: 47.3, barPct: 94, cashflows: ['🟢 Recurring monthly contributions since inception', '🔴 Three withdrawals totaling $6,100', '🟢 Lump-sum deposits totaling $9,500'] },
    si: { val: 68.9, barPct: 98, cashflows: ['🟢 Consistent monthly contributions since account opening', '🔴 Periodic withdrawals for goal funding', '🟢 Occasional lump-sum deposits following bonuses'] },
  },
  risk: {
    badgeSuffix: 'Sharpe Ratio',
    ytd: { sharpe: 0.92, sortino: 1.18, sharpePct: 60, sortinoPct: 78 },
    '1yr': { sharpe: 1.05, sortino: 1.32, sharpePct: 68, sortinoPct: 84 },
    '3yr': { sharpe: 0.88, sortino: 1.1, sharpePct: 56, sortinoPct: 72 },
    '5yr': { sharpe: 0.79, sortino: 0.99, sharpePct: 48, sortinoPct: 64 },
    si: { sharpe: 0.85, sortino: 1.06, sharpePct: 52, sortinoPct: 68 },
  },
};

export const metricLabels: Record<MetricKey, { icon: string; name: string }> = {
  abs: { icon: '💰', name: 'Absolute Return' },
  rel: { icon: '🎯', name: 'Relative Return' },
  twr: { icon: '⏱️', name: 'Time-Weighted Return' },
  mwr: { icon: '💵', name: 'Money-Weighted Return' },
  risk: { icon: '⚖️', name: 'Risk-Adjusted (Sharpe)' },
};
