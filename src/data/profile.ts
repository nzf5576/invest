export const userProfile = {
  fullName: 'Linda S. Kline',
  email: 'linda.kline@email.com',
  phone: '(210) 555-0148',
  address: ['15935 La Cantera Pkwy', 'San Antonio, TX 78256'],
  memberSince: 'March 14, 2018',
};

export interface NotificationPref {
  id: string;
  label: string;
  description: string;
  email: boolean;
  sms: boolean;
}

export const notificationPrefs: NotificationPref[] = [
  { id: 'statements', label: 'Statements & Confirmations', description: 'New statements, trade confirmations, and tax forms.', email: true, sms: false },
  { id: 'distributions', label: 'Distributions & Contributions', description: 'Updates on money movement in or out of your accounts.', email: true, sms: true },
  { id: 'security', label: 'Security Alerts', description: 'Sign-ins from a new device and password changes.', email: true, sms: true },
  { id: 'marketing', label: 'Products & Offers', description: 'News about new funds, tools, and Victory Capital events.', email: false, sms: false },
];
