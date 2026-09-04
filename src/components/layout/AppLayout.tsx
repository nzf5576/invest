import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Hero from './Hero';
import QuickActions from './QuickActions';
import Footer from './Footer';
import HelpFab from './HelpFab';

export default function AppLayout() {
  const location = useLocation();
  const hideQuickActions = location.pathname === '/my-performance';

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <NavBar />
      <Hero />
      {!hideQuickActions && <QuickActions />}
      <div id="main-content">
        <Outlet />
      </div>
      <Footer />
      <HelpFab />
    </>
  );
}
