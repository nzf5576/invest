import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import FocusedLayout from './components/layout/FocusedLayout';
import Dashboard from './pages/Dashboard';
import AccountDetail from './pages/AccountDetail';
import RmdFlow from './pages/RmdFlow';
import MarketingSite from './pages/MarketingSite';

export default function App() {
  return (
    <Routes>
      <Route path="/site" element={<MarketingSite />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/account/:accountId" element={<AccountDetail />} />
      </Route>
      <Route element={<FocusedLayout />}>
        <Route path="/rmd/:accountId" element={<RmdFlow />} />
      </Route>
    </Routes>
  );
}
