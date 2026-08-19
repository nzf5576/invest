import { useState } from 'react';
import { savedApplications as initialApps } from '../../data/mockData';

export default function SavedApplications() {
  const [apps, setApps] = useState(initialApps);

  if (apps.length === 0) return null;

  return (
    <div className="sidebar-card saved-card">
      <div className="sidebar-card-title">
        ⏳ Saved Applications{' '}
        <span className="pending-badge" aria-live="polite">{apps.length} pending</span>
      </div>
      <div role="list">
        {apps.map((app) => (
          <div className="saved-app" role="listitem" key={app.id}>
            <div>
              <div className="saved-app-text">{app.text}</div>
              <div className="saved-app-date">{app.date}</div>
            </div>
            <div className="saved-app-actions">
              <button className="btn-continue" aria-label={`Continue ${app.text}`}>Continue →</button>
              <button
                className="btn-dismiss"
                aria-label={`Dismiss ${app.text}`}
                onClick={() => setApps((prev) => prev.filter((a) => a.id !== app.id))}
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
