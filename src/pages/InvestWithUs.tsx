import { Link } from 'react-router-dom';
import { specialist } from '../data/mockData';

interface Solution {
  icon: string;
  title: string;
  desc: string;
  color: string;
  ctaLabel: string;
  to: string;
}

const solutions: Solution[] = [
  {
    icon: '📈',
    title: 'Individual & Joint Brokerage',
    desc: 'A taxable account for general investing in Victory Funds mutual funds and ETFs, on your own or with a co-owner.',
    color: 'var(--navy)',
    ctaLabel: 'Open an Account',
    to: '/open-account',
  },
  {
    icon: '🏦',
    title: 'Traditional & Roth IRAs',
    desc: 'Tax-advantaged retirement accounts — defer taxes until withdrawal, or invest after-tax for tax-free qualified withdrawals.',
    color: 'var(--primary)',
    ctaLabel: 'Open an IRA',
    to: '/open-account',
  },
  {
    icon: '🎓',
    title: 'Education Savings',
    desc: 'Coverdell ESAs let you save for a beneficiary\'s K-12 and college expenses with tax-free qualified growth.',
    color: 'var(--accent)',
    ctaLabel: 'Start Saving',
    to: '/open-account',
  },
  {
    icon: '🧒',
    title: 'Custodial Accounts (UGMA/UTMA)',
    desc: 'Invest on behalf of a minor — assets transfer to their control once they reach the age of majority.',
    color: 'var(--teal)',
    ctaLabel: 'Open for a Minor',
    to: '/open-account',
  },
  {
    icon: '🎯',
    title: 'Victory Cornerstone & Target Retirement Funds',
    desc: 'Professionally managed, diversified portfolios that adjust risk automatically as you approach your goal.',
    color: 'var(--purple)',
    ctaLabel: 'View Holdings',
    to: '/account/0268',
  },
  {
    icon: '🤝',
    title: 'Wealth Advisory Managed Portfolios',
    desc: 'A dedicated advisor builds and manages a personalized portfolio around your full financial picture.',
    color: 'var(--orange)',
    ctaLabel: 'Talk to an Advisor',
    to: '#specialist',
  },
];

export default function InvestWithUs() {
  return (
    <div className="main" role="main">
      <div className="card">
        <div className="card-pad" style={{ textAlign: 'center', padding: '32px 24px' }}>
          <h1 style={{ fontSize: 24, color: 'var(--navy)', marginBottom: 8 }}>Ways to Invest with Victory Capital</h1>
          <p style={{ fontSize: 14, color: 'var(--text-3)', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
            Whether you're just getting started or adding to an existing plan, here's an overview of the account
            types and solutions available to you.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-pad" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {solutions.map((s) => (
            <div key={s.title} className="solution-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="sol-icon" aria-hidden="true">{s.icon}</div>
              <div className="sol-title" style={{ color: s.color }}>{s.title}</div>
              <div className="sol-desc" style={{ flex: 1 }}>{s.desc}</div>
              <Link className="mini-btn mini-btn-detail" style={{ alignSelf: 'flex-start', textDecoration: 'none' }} to={s.to}>
                {s.ctaLabel} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="card" id="specialist">
        <div className="card-pad" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div className="specialist-avatar" style={{ width: 56, height: 56, fontSize: 20 }} aria-hidden="true">{specialist.initials}</div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Ready to talk it through?</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>{specialist.name}, Your Wealth Specialist</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{specialist.email} · ext. {specialist.ext}</div>
          </div>
          <a className="btn-trade" style={{ textDecoration: 'none' }} href={`mailto:${specialist.email}`}>
            ✉️ Email {specialist.name.split(' ')[0]}
          </a>
        </div>
      </div>
    </div>
  );
}
