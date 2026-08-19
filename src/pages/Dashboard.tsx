import PortfolioOverview from '../components/dashboard/PortfolioOverview';
import FinancialPlanning from '../components/dashboard/FinancialPlanning';
import PortfolioSolutions from '../components/dashboard/PortfolioSolutions';
import YtdTracker from '../components/dashboard/YtdTracker';
import SavedApplications from '../components/dashboard/SavedApplications';
import MessageCenter from '../components/dashboard/MessageCenter';
import GetGuidance from '../components/dashboard/GetGuidance';

export default function Dashboard() {
  return (
    <div className="main" role="main">
      <div className="main-grid">
        <div>
          <PortfolioOverview />
          <FinancialPlanning />
          <PortfolioSolutions />
        </div>

        <div className="sidebar" role="complementary" aria-label="Account tools and messages">
          <YtdTracker />
          <SavedApplications />
          <MessageCenter />
          <GetGuidance />
        </div>
      </div>
    </div>
  );
}
