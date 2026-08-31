import { Link } from 'react-router-dom';
import { defaultAccountId, iraAccountId } from '../../data/mockData';

interface QuickAction {
  label: string;
  icon: string;
  color: string;
  bg: string;
  shadow: string;
  to?: string;
}

const actions: QuickAction[] = [
  { label: 'Open New Account', icon: '➕', color: 'var(--navy)', bg: '#eef4ff', shadow: 'rgba(0,74,152,0.15)', to: '/open-account' },
  { label: 'Transfer Account', icon: '↔️', color: 'var(--primary)', bg: '#f0f7ff', shadow: 'rgba(94,138,180,0.15)', to: '/transfer' },
  { label: 'Make a Contribution', icon: '💰', color: 'var(--green)', bg: '#f0fdf4', shadow: 'rgba(8,163,103,0.15)', to: `/contribution/${defaultAccountId}` },
  { label: 'Request Distribution', icon: '📤', color: 'var(--orange)', bg: '#fff7ed', shadow: 'rgba(232,119,34,0.15)', to: `/rmd/${iraAccountId}` },
  { label: 'Forms', icon: '📋', color: 'var(--purple)', bg: '#faf5ff', shadow: 'rgba(123,94,167,0.15)', to: '/forms' },
  { label: 'Upload Documents', icon: '📎', color: 'var(--teal)', bg: '#f0fdfe', shadow: 'rgba(0,163,173,0.15)', to: '/documents' },
  { label: 'Live Chat', icon: '💬', color: 'var(--neutral)', bg: '#f8fafc', shadow: 'rgba(83,86,90,0.15)' },
];

export default function QuickActions() {
  return (
    <div className="quick-actions-section" role="navigation" aria-label="Quick actions">
      <div className="qa-section-label">Quick Actions</div>
      <div className="quick-actions-grid">
        {actions.map((action) => {
          const style = {
            '--tile-color': action.color,
            '--tile-bg': action.bg,
            '--tile-shadow': action.shadow,
          } as React.CSSProperties;

          return action.to ? (
            <Link key={action.label} className="qa-tile" style={style} to={action.to} aria-label={action.label}>
              <div className="qa-tile-icon" aria-hidden="true">{action.icon}</div>
              <span className="qa-tile-label">{action.label}</span>
            </Link>
          ) : (
            <button key={action.label} className="qa-tile" style={style} aria-label={action.label}>
              <div className="qa-tile-icon" aria-hidden="true">{action.icon}</div>
              <span className="qa-tile-label">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
