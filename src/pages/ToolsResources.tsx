import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/format';
import { specialist } from '../data/mockData';
import '../styles/tools.css';

const faqs = [
  {
    q: 'How do I change my cost basis method?',
    a: 'Open the account under My Portfolio, and look for Cost Basis under Manage Preferences on the account detail page. You can update the method for future sales at any time.',
  },
  {
    q: 'When will my statement be available?',
    a: 'Quarterly statements are typically posted to the Document Center within the first two weeks after quarter-end. You\'ll also get a notification in your Message Center.',
  },
  {
    q: 'Can I set up automatic contributions?',
    a: 'Yes — choose Make a Contribution from Quick Actions and select "Recurring" to set up monthly or quarterly automatic investing from a linked bank account.',
  },
  {
    q: 'How long does an account transfer take?',
    a: 'Most in-kind (ACATS) transfers from another firm complete within 5-7 business days once your current firm approves the request.',
  },
];

const resources = [
  { icon: '📋', title: 'Forms Library', desc: 'Download account applications, distribution requests, and tax forms.', to: '/forms' },
  { icon: '🗂️', title: 'Document Center', desc: 'Access statements, trade confirmations, and tax documents.', to: '/documents' },
  { icon: '📰', title: 'Insights & Commentary', desc: 'Market outlooks, retirement and tax planning articles from our team.', to: '/insights' },
];

export default function ToolsResources() {
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(250);
  const [years, setYears] = useState(20);
  const [returnPct, setReturnPct] = useState(6);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const result = useMemo(() => {
    const r = returnPct / 100 / 12;
    const n = years * 12;
    const growthFactor = (1 + r) ** n;
    const futureValueOfInitial = initial * growthFactor;
    const futureValueOfContributions = r === 0 ? monthly * n : monthly * ((growthFactor - 1) / r);
    const totalContributed = initial + monthly * n;
    const total = futureValueOfInitial + futureValueOfContributions;
    return { total, totalContributed, totalGrowth: total - totalContributed };
  }, [initial, monthly, years, returnPct]);

  return (
    <div className="main" role="main">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Investment Growth Calculator</h2>
          <span className="as-of">Estimate only — not a guarantee of future results</span>
        </div>
        <div className="card-pad">
          <div className="calc-grid">
            <div>
              <div className="calc-field">
                <label htmlFor="calc-initial">Initial investment <span>{formatCurrency(initial)}</span></label>
                <input id="calc-initial" type="range" min={0} max={100000} step={500} value={initial} onChange={(e) => setInitial(Number(e.target.value))} />
              </div>
              <div className="calc-field">
                <label htmlFor="calc-monthly">Monthly contribution <span>{formatCurrency(monthly)}</span></label>
                <input id="calc-monthly" type="range" min={0} max={3000} step={25} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} />
              </div>
              <div className="calc-field">
                <label htmlFor="calc-years">Time horizon <span>{years} years</span></label>
                <input id="calc-years" type="range" min={1} max={40} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} />
              </div>
              <div className="calc-field">
                <label htmlFor="calc-return">Estimated annual return <span>{returnPct}%</span></label>
                <input id="calc-return" type="range" min={0} max={12} step={0.5} value={returnPct} onChange={(e) => setReturnPct(Number(e.target.value))} />
              </div>
            </div>

            <div className="calc-result">
              <div className="calc-result-label">Projected Value</div>
              <div className="calc-result-value">{formatCurrency(result.total)}</div>
              <div className="calc-result-rows">
                <div className="calc-result-row"><span>Total contributed</span><span>{formatCurrency(result.totalContributed)}</span></div>
                <div className="calc-result-row"><span>Estimated growth</span><span>{formatCurrency(result.totalGrowth)}</span></div>
                <div className="calc-result-row"><span>Time horizon</span><span>{years} years</span></div>
              </div>
            </div>
          </div>
          <p className="calc-disclaimer">
            This calculator assumes a constant rate of return and monthly compounding for illustration purposes only.
            Actual investment returns will vary. Victory Capital does not guarantee any particular outcome.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Resources</h2>
        </div>
        <div className="card-pad resource-grid">
          {resources.map((r) => (
            <Link key={r.title} to={r.to} className="solution-card" style={{ textDecoration: 'none' }}>
              <div className="sol-icon" aria-hidden="true">{r.icon}</div>
              <div className="sol-title">{r.title}</div>
              <div className="sol-desc">{r.desc}</div>
              <div className="sol-link" style={{ color: 'var(--primary)' }}>Open →</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Frequently Asked Questions</h2>
        </div>
        <div className="card-pad">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={f.q} className="faq-item" onClick={() => setOpenFaq(isOpen ? null : i)}>
                <div className="faq-q">
                  {f.q}
                  <span aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && <div className="faq-a">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="card-pad" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)' }}>Still have questions?</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{specialist.name} is your dedicated Wealth Specialist — {specialist.email}</div>
          </div>
          <a className="btn-trade" style={{ textDecoration: 'none' }} href={`mailto:${specialist.email}`}>✉️ Contact {specialist.name.split(' ')[0]}</a>
        </div>
      </div>
    </div>
  );
}
