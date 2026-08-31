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
