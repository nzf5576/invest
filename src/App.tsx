import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import FocusedLayout from './components/layout/FocusedLayout';
import Dashboard from './pages/Dashboard';
import AccountDetail from './pages/AccountDetail';
import RmdFlow from './pages/RmdFlow';
import MarketingSite from './pages/MarketingSite';
import InvestmentFranchises from './pages/InvestmentFranchises';
import MarketingInsights from './pages/MarketingInsights';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Trade from './pages/Trade';
import Contribution from './pages/Contribution';
import Transfer from './pages/Transfer';
import OpenAccount from './pages/OpenAccount';
import DocumentCenter from './pages/DocumentCenter';
import Forms from './pages/Forms';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import InvestWithUs from './pages/InvestWithUs';
import MyPerformance from './pages/MyPerformance';
import Insights from './pages/Insights';
import ToolsResources from './pages/ToolsResources';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MarketingSite />} />
        <Route path="/marketing" element={<Navigate to="/" replace />} />
        <Route path="/investment-franchises" element={<InvestmentFranchises />} />
        <Route path="/market-insights" element={<MarketingInsights />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/site" element={<Login />} />
        <Route element={<ProtectedLayout><AppLayout /></ProtectedLayout>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account/:accountId" element={<AccountDetail />} />
          <Route path="/documents" element={<DocumentCenter />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/invest-with-us" element={<InvestWithUs />} />
          <Route path="/my-performance" element={<MyPerformance />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/tools-resources" element={<ToolsResources />} />
        </Route>
        <Route element={<ProtectedLayout><FocusedLayout /></ProtectedLayout>}>
          <Route path="/rmd/:accountId" element={<RmdFlow />} />
          <Route path="/trade/:accountId" element={<Trade />} />
          <Route path="/contribution/:accountId" element={<Contribution />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/open-account" element={<OpenAccount />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
