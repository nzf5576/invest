import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { currentUser } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    setMenuOpen(false);
    logout();
    navigate('/login');
  }

  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-left">
        <NavLink className="nav-logo" to="/dashboard" aria-label="Victory Capital inVest - Home">
          <span>Victory</span>Capital <em>inVest</em>
        </NavLink>
        <div className="nav-links" role="menubar">
          <NavLink to="/dashboard" role="menuitem" className={({ isActive }) => (isActive ? 'active' : '')} end>
            Home
          </NavLink>
          <NavLink to="/invest-with-us" role="menuitem" className={({ isActive }) => (isActive ? 'active' : '')}>
            Invest with Us
          </NavLink>
          <NavLink to="/insights" role="menuitem" className={({ isActive }) => (isActive ? 'active' : '')}>
            Insights
          </NavLink>
          <NavLink to="/tools-resources" role="menuitem" className={({ isActive }) => (isActive ? 'active' : '')}>
            Tools &amp; Resources
          </NavLink>
          <NavLink to="/documents" role="menuitem" className={({ isActive }) => (isActive ? 'active' : '')}>
            Document Center
          </NavLink>
        </div>
      </div>
      <div className="nav-right">
        <Link className="nav-icon-btn" to="/" aria-label="Visit the public Victory Capital website" title="Public website">🌐</Link>
        <button className="nav-icon-btn" aria-label="Search">🔍</button>
        <div style={{ position: 'relative' }}>
          <button
            className="nav-user"
            aria-label={`User menu for ${currentUser.firstName}`}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className="nav-avatar" aria-hidden="true">{currentUser.initials}</div>
            <span className="nav-user-name">{currentUser.firstName}</span>
            <span className="nav-user-caret" aria-hidden="true">▾</span>
          </button>
          {menuOpen && (
            <div
              role="menu"
              style={{
                position: 'absolute', top: 48, right: 0, background: '#fff', borderRadius: 10,
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)', border: '1px solid var(--border)', minWidth: 200, overflow: 'hidden', zIndex: 50,
              }}
            >
              <Link role="menuitem" to="/profile" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', fontSize: 13.5, color: 'var(--text-2)', textDecoration: 'none' }}>
                ⚙️ Profile &amp; Settings
              </Link>
              <Link role="menuitem" to="/messages" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', fontSize: 13.5, color: 'var(--text-2)', textDecoration: 'none', borderTop: '1px solid var(--border-lt)' }}>
                ✉️ Messages
              </Link>
              <button role="menuitem" onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', fontSize: 13.5, color: 'var(--red)', background: 'none', border: 'none', borderTop: '1px solid var(--border-lt)', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                ↪️ Sign Out
              </button>
            </div>
          )}
        </div>
        <Link
          className="nav-icon-btn"
          to="/messages"
          aria-label="Notifications and messages"
          style={{ position: 'relative' }}
          title="Messages"
        >
          🔔
          <span className="nav-badge" aria-hidden="true" style={{ fontSize: 8, width: 22, borderRadius: 10, padding: '0 3px' }}>
            3
          </span>
        </Link>
      </div>
    </nav>
  );
}
