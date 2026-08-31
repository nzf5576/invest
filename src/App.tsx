import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import FocusedLayout from './components/layout/FocusedLayout';
import Dashboard from './pages/Dashboard';
import AccountDetail from './pages/AccountDetail';
import RmdFlow from './pages/RmdFlow';
import MarketingSite from './pages/MarketingSite';
import Login from './pages/Login';
import Trade from './pages/Trade';
import Contribution from './pages/Contribution';
import Transfer from './pages/Transfer';
import DocumentCenter from './pages/DocumentCenter';
import Forms from './pages/Forms';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

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
        <Route path="/login" element={<Login />} />
        <Route path="/site" element={<MarketingSite />} />
        <Route element={<ProtectedLayout><AppLayout /></ProtectedLayout>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account/:accountId" element={<AccountDetail />} />
          <Route path="/documents" element={<DocumentCenter />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedLayout><FocusedLayout /></ProtectedLayout>}>
          <Route path="/rmd/:accountId" element={<RmdFlow />} />
          <Route path="/trade/:accountId" element={<Trade />} />
          <Route path="/contribution/:accountId" element={<Contribution />} />
          <Route path="/transfer" element={<Transfer />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
