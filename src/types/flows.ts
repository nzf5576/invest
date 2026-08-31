import type { BankChoice } from './rmd';

export type TradeAction = 'buy' | 'sell';
export type AmountBasis = 'dollars' | 'shares';

export interface TradeFormState {
  action: TradeAction;
  holdingId: string;
  basis: AmountBasis;
  amount: string;
  consent: boolean;
}

export const initialTradeFormState: TradeFormState = {
  action: 'buy',
  holdingId: '',
  basis: 'dollars',
  amount: '',
  consent: false,
};

export interface ContributionFormState {
  amount: string;
  holdingId: string;
  bank: BankChoice;
  recurring: boolean;
  frequency: 'One-time' | 'Monthly' | 'Quarterly';
  consent: boolean;
}

export const initialContributionFormState: ContributionFormState = {
  amount: '',
  holdingId: '',
  bank: 'bank1',
  recurring: false,
  frequency: 'One-time',
  consent: false,
};

export type TransferType = 'full' | 'partial';

export interface TransferFormState {
  fromInstitution: string;
  fromAccountNumber: string;
  toAccountId: string;
  transferType: TransferType;
  estimatedValue: string;
  consent: boolean;
}

export const initialTransferFormState: TransferFormState = {
  fromInstitution: '',
  fromAccountNumber: '',
  toAccountId: '',
  transferType: 'full',
  estimatedValue: '',
  consent: false,
};

export type NewAccountType = 'individual' | 'joint' | 'traditional-ira' | 'roth-ira' | 'coverdell-esa' | 'ugma-utma';

export interface NewAccountTypeOption {
  key: NewAccountType;
  icon: string;
  label: string;
  description: string;
  needsCoOwner: boolean;
  needsBeneficiary: boolean;
}

export const newAccountTypeOptions: NewAccountTypeOption[] = [
  { key: 'individual', icon: '👤', label: 'Individual Brokerage', description: 'A taxable account in your name for general investing.', needsCoOwner: false, needsBeneficiary: false },
  { key: 'joint', icon: '👥', label: 'Joint Account', description: 'Shared ownership with a spouse or partner.', needsCoOwner: true, needsBeneficiary: false },
  { key: 'traditional-ira', icon: '🏦', label: 'Traditional IRA', description: 'Tax-deferred growth for retirement savings.', needsCoOwner: false, needsBeneficiary: false },
  { key: 'roth-ira', icon: '🌱', label: 'Roth IRA', description: 'Tax-free qualified withdrawals in retirement.', needsCoOwner: false, needsBeneficiary: false },
  { key: 'coverdell-esa', icon: '🎓', label: 'Coverdell ESA', description: 'Education savings for a designated beneficiary.', needsCoOwner: false, needsBeneficiary: true },
  { key: 'ugma-utma', icon: '🧒', label: 'UGMA/UTMA Custodial', description: 'Assets held in trust for a minor until adulthood.', needsCoOwner: false, needsBeneficiary: true },
];

export interface OpenAccountFormState {
  accountType: NewAccountType;
  coOwnerName: string;
  beneficiaryName: string;
  beneficiaryDob: string;
  fundLater: boolean;
  initialFunding: string;
  bank: BankChoice;
  consent: boolean;
}

export const initialOpenAccountFormState: OpenAccountFormState = {
  accountType: 'individual',
  coOwnerName: '',
  beneficiaryName: '',
  beneficiaryDob: '',
  fundLater: false,
  initialFunding: '',
  bank: 'bank1',
  consent: false,
};
