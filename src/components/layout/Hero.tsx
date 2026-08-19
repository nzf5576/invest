import { useState } from 'react';
import {
  accountTypeSummaries,
  portfolioAsOf,
  portfolioTotalValue,
  portfolioYtdPct,
  specialist,
  currentUser,
} from '../../data/mockData';
import { formatCurrency, formatSignedPct } from '../../utils/format';

export default function Hero() {
  const [selectedType, setSelectedType] = useState(accountTypeSummaries[0].key);

  return (
    <div className="hero" role="banner">
      <div className="hero-inner">
        <div className="hero-top">
          <div>
            <div className="hero-greeting" aria-hidden="true">Good morning</div>
            <h1 className="hero-name">Welcome back, {currentUser.firstName} 👋</h1>
            <div className="hero-date">Portfolio summary as of <strong>{portfolioAsOf}</strong></div>
          </div>
          <div className="specialist-card" role="complementary" aria-label="Your Wealth Specialist">
            <div className="specialist-avatar" aria-hidden="true">{specialist.initials}</div>
            <div>
              <div className="specialist-label">Your Wealth Specialist</div>
              <div className="specialist-name">{specialist.name}</div>
              <div className="specialist-contact">{specialist.email} · Ext. {specialist.ext}</div>
            </div>
            <button className="btn-contact" aria-label={`Contact ${specialist.name}, your Wealth Specialist`}>
              Contact
            </button>
          </div>
        </div>

        <div className="hero-bottom">
          <div>
            <div className="portfolio-total-label" id="total-label">Total Portfolio Value</div>
            <div className="portfolio-total-value" aria-labelledby="total-label">{formatCurrency(portfolioTotalValue)}</div>
            <div className="portfolio-ytd">
              <span className="ytd-badge" aria-label={`Year to date performance up ${portfolioYtdPct} percent`}>
                ↑ {formatSignedPct(portfolioYtdPct)}
              </span>
              <span className="ytd-label">YTD Performance</span>
            </div>
            <button className="how-calculated-btn" aria-label="Learn how your total portfolio value is calculated">
              ℹ️ How is this value calculated?
            </button>
          </div>

          <div className="account-cards-grid" role="list" aria-label="Account type breakdown">
            {accountTypeSummaries.map((acc) => {
              const isSelected = selectedType === acc.key;
              return (
                <button
                  key={acc.key}
                  className={`account-card${isSelected ? ' current-page' : ''}`}
                  role="listitem"
                  onClick={() => setSelectedType(acc.key)}
                  aria-pressed={isSelected}
                >
                  <div
                    className="account-card-bar"
                    style={{ background: acc.color, width: `${Math.max(acc.pctOfPortfolio, 0.5)}%` }}
                    aria-hidden="true"
                  />
                  <div className="ac-label">
                    <div className="ac-dot" style={{ background: acc.color }} aria-hidden="true" />
                    {acc.label}
                  </div>
                  <div className="ac-value">{formatCurrency(acc.value)}</div>
                  <div className="ac-pct">
                    {acc.hasHoldings
                      ? `${acc.pctOfPortfolio < 0.1 ? '<0.1' : acc.pctOfPortfolio}% ${isSelected ? '· Viewing ↓' : 'of portfolio'}`
                      : acc.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
