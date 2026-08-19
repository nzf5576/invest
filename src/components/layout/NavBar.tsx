import { Link, NavLink } from 'react-router-dom';
import { currentUser } from '../../data/mockData';

export default function NavBar() {
  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-left">
        <NavLink className="nav-logo" to="/" aria-label="Victory Capital inVest - Home">
          <span>Victory</span>Capital <em>inVest</em>
        </NavLink>
        <div className="nav-links" role="menubar">
          <NavLink to="/" role="menuitem" className={({ isActive }) => (isActive ? 'active' : '')} end>
            Home
          </NavLink>
          <a href="#" role="menuitem">Invest with Us</a>
          <a href="#" role="menuitem">Insights</a>
          <a href="#" role="menuitem">Tools &amp; Resources</a>
          <a href="#" role="menuitem">Document Center</a>
        </div>
      </div>
      <div className="nav-right">
        <Link className="nav-icon-btn" to="/site" aria-label="Visit the public Victory Capital website" title="Public website">🌐</Link>
        <button className="nav-icon-btn" aria-label="Search">🔍</button>
        <button className="nav-user" aria-label={`User menu for ${currentUser.firstName}`} aria-haspopup="true">
          <div className="nav-avatar" aria-hidden="true">{currentUser.initials}</div>
          <span className="nav-user-name">{currentUser.firstName}</span>
          <span className="nav-user-caret" aria-hidden="true">▾</span>
        </button>
        <button
          className="nav-icon-btn"
          aria-label="Notifications - 99 or more unread"
          style={{ position: 'relative' }}
          title="You have many unread notifications"
        >
          🔔
          <span className="nav-badge" aria-hidden="true" style={{ fontSize: 8, width: 22, borderRadius: 10, padding: '0 3px' }}>
            99+
          </span>
        </button>
      </div>
    </nav>
  );
}
