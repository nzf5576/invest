export type CalcMethod = 'victory' | 'own' | 'unsure';
export type FundSource = 'proportionate' | 'specific';
export type YesNo = '' | 'yes' | 'no';
export type Frequency = '' | 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually';
export type BankChoice = 'bank1' | 'bank2' | 'bank3';

export interface RmdFormState {
  calcMethod: CalcMethod;
  spouseSole: YesNo;
  spouseOlderThan10: YesNo;
  trustBeneficiary: YesNo;
  rolloverThisYear: boolean;
  rolloverAmount: number;
  priorYearBalance: number;
  fundSource: FundSource;
  frequency: Frequency;
  startDate: string;
  autoRenew: boolean;
  fedTaxPct: number;
  bank: BankChoice;
  consent: boolean;
}

export const initialRmdFormState: RmdFormState = {
  calcMethod: 'victory',
  spouseSole: 'yes',
  spouseOlderThan10: 'no',
  trustBeneficiary: 'no',
  rolloverThisYear: true,
  rolloverAmount: 5000,
  priorYearBalance: 5000,
  fundSource: 'proportionate',
  frequency: '',
  startDate: '10/01/2026',
  autoRenew: true,
  fedTaxPct: 10,
  bank: 'bank1',
  consent: false,
};

export const bankOptions: Record<BankChoice, { icon: string; label: string; tag?: string; sub: string; shortLabel: string }> = {
  bank1: { icon: '🏦', label: 'Wells Fargo Bank, NA', tag: 'Default', sub: 'Checking ····4498', shortLabel: 'Wells Fargo ····4498' },
  bank2: { icon: '🏦', label: 'Wells Fargo Bank NA (Arizona)', sub: 'Savings ····0018', shortLabel: 'Wells Fargo (AZ) ····0018' },
  bank3: { icon: '✉️', label: 'Mail a paper check', sub: 'Sent to address on file', shortLabel: 'Paper check by mail' },
};

export const stepTimeEstimates: Record<number, string> = {
  1: '~4 min',
  2: '~3 min',
  3: '~2 min',
  4: '~1 min',
};
