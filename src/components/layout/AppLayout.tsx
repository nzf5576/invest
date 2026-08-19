import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Hero from './Hero';
import QuickActions from './QuickActions';
import Footer from './Footer';
import HelpFab from './HelpFab';

export default function AppLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <NavBar />
      <Hero />
      <QuickActions />
      <div id="main-content">
        <Outlet />
      </div>
      <Footer />
      <HelpFab />
    </>
  );
}
