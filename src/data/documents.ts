import type { FormItem, PortalDocument } from '../types';

export const documents: PortalDocument[] = [
  { id: 'doc1', name: 'Q2 2026 Account Statement', type: 'Statement', date: '07/10/2026', accountId: '0268', size: '412 KB' },
  { id: 'doc2', name: 'Q2 2026 Account Statement', type: 'Statement', date: '07/10/2026', accountId: '0667', size: '198 KB' },
  { id: 'doc3', name: 'Trade Confirmation - USCGX Buy', type: 'Confirmation', date: '06/28/2026', accountId: '0268', size: '64 KB' },
  { id: 'doc4', name: 'Q1 2026 Account Statement', type: 'Statement', date: '04/10/2026', accountId: '0268', size: '405 KB' },
  { id: 'doc5', name: 'Q1 2026 Account Statement', type: 'Statement', date: '04/10/2026', accountId: '0667', size: '192 KB' },
  { id: 'doc6', name: '2025 Form 1099-DIV', type: 'Tax Form', date: '01/31/2026', accountId: '0268', size: '88 KB' },
  { id: 'doc7', name: '2025 Form 1099-R', type: 'Tax Form', date: '01/31/2026', accountId: '0667', size: '81 KB' },
  { id: 'doc8', name: 'Trade Confirmation - USBEX Sell', type: 'Confirmation', date: '05/12/2026', accountId: '0268', size: '61 KB' },
  { id: 'doc9', name: 'Victory Aggressive Growth Fund Prospectus', type: 'Prospectus', date: '02/01/2026', accountId: '0268', size: '1.2 MB' },
  { id: 'doc10', name: 'Q4 2025 Account Statement', type: 'Statement', date: '01/10/2026', accountId: '0268', size: '398 KB' },
  { id: 'doc11', name: 'Q4 2025 Account Statement', type: 'Statement', date: '01/10/2026', accountId: '0667', size: '187 KB' },
];

export const forms: FormItem[] = [
  { id: 'f1', name: 'Account Application', category: 'Open an Account', description: 'Open a new individual, joint, or retirement account.' },
  { id: 'f2', name: 'Coverdell ESA Application', category: 'Open an Account', description: 'Open a Coverdell Education Savings Account for a beneficiary.' },
  { id: 'f3', name: 'UGMA/UTMA Account Application', category: 'Open an Account', description: 'Open a custodial account on behalf of a minor.' },
  { id: 'f4', name: 'IRA Distribution Request', category: 'Distributions', description: 'Request a one-time or recurring distribution from an IRA.' },
  { id: 'f5', name: 'Required Minimum Distribution Election', category: 'Distributions', description: 'Elect or update your automatic RMD schedule.' },
  { id: 'f6', name: 'Transfer on Death (TOD) Registration', category: 'Beneficiaries', description: 'Add or update transfer-on-death beneficiaries for an account.' },
  { id: 'f7', name: 'Beneficiary Designation Form', category: 'Beneficiaries', description: 'Designate or change primary and contingent beneficiaries.' },
  { id: 'f8', name: 'ACAT Transfer Form', category: 'Transfers', description: 'Transfer assets in-kind from another financial institution.' },
  { id: 'f9', name: 'Automatic Investment Plan Enrollment', category: 'Contributions', description: 'Set up recurring contributions from a linked bank account.' },
  { id: 'f10', name: 'W-9 Request for Taxpayer ID', category: 'Tax', description: 'Certify your taxpayer identification number.' },
  { id: 'f11', name: 'W-4R Withholding for Distributions', category: 'Tax', description: 'Elect federal withholding on nonperiodic distributions.' },
];
