import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { accounts } from '../data/mockData';
import AccountActionBar from '../components/account/AccountActionBar';
import AccountTabBar from '../components/account/AccountTabBar';
import HoldingsTable from '../components/account/HoldingsTable';
import PortfolioAllocation from '../components/account/PortfolioAllocation';
import AccountSidebar from '../components/account/AccountSidebar';

export default function AccountDetail() {
  const { accountId } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const account = accountId ? accounts[accountId] : undefined;
  if (!account) return <Navigate to="/" replace />;

  return (
    <div>
      <AccountActionBar account={account} />
      <AccountTabBar active={activeTab} onChange={setActiveTab} />

      <div className="main" role="main">
        {activeTab === 0 ? (
          <div className="main-grid">
            <div>
              <HoldingsTable account={account} />
              <PortfolioAllocation account={account} />
            </div>
            <AccountSidebar account={account} />
          </div>
        ) : (
          <div className="card">
            <div className="card-pad" style={{ textAlign: 'center', color: 'var(--text-4)', padding: '48px 22px' }}>
              This section isn't wired up in the prototype yet.
            </div>
          </div>
        )}
      </div>

      <div className="back-bar">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Link className="back-link" to="/">← Back to My Portfolio</Link>
        </div>
      </div>
    </div>
  );
}
