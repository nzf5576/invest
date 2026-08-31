import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { accounts } from '../data/mockData';
import AccountActionBar from '../components/account/AccountActionBar';
import AccountTabBar from '../components/account/AccountTabBar';
import HoldingsTable from '../components/account/HoldingsTable';
import PortfolioAllocation from '../components/account/PortfolioAllocation';
import AccountSidebar from '../components/account/AccountSidebar';
import ActivityTab from '../components/account/tabs/ActivityTab';
import DividendsTab from '../components/account/tabs/DividendsTab';
import CostBasisTab from '../components/account/tabs/CostBasisTab';
import PerformanceTab from '../components/account/tabs/PerformanceTab';
import AccountDocumentsTab from '../components/account/tabs/AccountDocumentsTab';

export default function AccountDetail() {
  const { accountId } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const account = accountId ? accounts[accountId] : undefined;
  if (!account) return <Navigate to="/" replace />;

  return (
    <div>
      <AccountActionBar account={account} onActivityClick={() => setActiveTab(1)} />
      <AccountTabBar active={activeTab} onChange={setActiveTab} />

      <div className="main" role="main">
        {activeTab === 0 && (
          <div className="main-grid">
            <div>
              <HoldingsTable account={account} />
              <PortfolioAllocation account={account} />
            </div>
            <AccountSidebar account={account} />
          </div>
        )}
        {activeTab === 1 && <ActivityTab account={account} />}
        {activeTab === 2 && <DividendsTab account={account} />}
        {activeTab === 3 && <CostBasisTab account={account} />}
        {activeTab === 4 && <PerformanceTab account={account} />}
        {activeTab === 5 && <AccountDocumentsTab account={account} />}
      </div>

      <div className="back-bar">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Link className="back-link" to="/">← Back to My Portfolio</Link>
        </div>
      </div>
    </div>
  );
}
