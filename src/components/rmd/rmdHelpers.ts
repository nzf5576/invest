import type { RmdFormState } from '../../types/rmd';
import { bankOptions } from '../../types/rmd';
import { formatCurrency } from '../../utils/format';

export function beneficiaryText(form: RmdFormState): string {
  if (form.spouseSole === 'yes') {
    const age = form.spouseOlderThan10;
    return 'Spouse sole beneficiary' + (age ? (age === 'yes' ? ' · >10 yrs younger' : ' · not >10 yrs younger') : '');
  }
  if (form.spouseSole === 'no') {
    const trust = form.trustBeneficiary;
    return 'Spouse not sole beneficiary' + (trust ? (trust === 'yes' ? ' · Trust beneficiary' : ' · Not a trust') : '');
  }
  return 'Not spouse-sole / not trust';
}

export function calcMethodLabel(method: RmdFormState['calcMethod']): string {
  switch (method) {
    case 'victory':
      return 'Victory calculates';
    case 'own':
      return "I'll enter my own amount";
    case 'unsure':
      return "I'd like to talk to someone";
  }
}

export function fundSourceLabel(source: RmdFormState['fundSource'], ticker: string): string {
  return source === 'proportionate' ? `All funds, proportionately (${ticker} 100%)` : `${ticker} (100%)`;
}

export function bankLabel(bank: RmdFormState['bank']): string {
  return bankOptions[bank].shortLabel;
}

export function rolloverLabel(form: RmdFormState): string {
  return form.rolloverThisYear ? `Yes — ${formatCurrency(form.rolloverAmount)}` : 'No';
}

export function frequencyLabel(form: RmdFormState): string | null {
  if (!form.frequency) return null;
  return `${form.frequency} — starting ${form.startDate}`;
}

export function taxLabel(form: RmdFormState): string {
  return `Federal ${form.fedTaxPct}% / State 0%`;
}
