import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import HelpFab from './HelpFab';

export default function FocusedLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <NavBar />
      <div id="main-content">
        <Outlet />
      </div>
      <Footer />
      <HelpFab />
    </>
  );
}
