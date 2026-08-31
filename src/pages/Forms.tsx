import { useMemo, useState } from 'react';
import { forms } from '../data/documents';

export default function Forms() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const categories = useMemo(() => ['all', ...Array.from(new Set(forms.map((f) => f.category)))], []);

  const visible = forms
    .filter((f) => category === 'all' || f.category === category)
    .filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="main" role="main">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Forms Library</h2>
          <span className="as-of">{forms.length} forms available</span>
        </div>

        <div className="filter-row" role="group" aria-label="Filter forms by category">
          <span className="filter-label">Category:</span>
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-chip${category === c ? ' active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c === 'all' ? 'All Forms' : c}
            </button>
          ))}
          <label htmlFor="form-search" className="sr-only">Search forms</label>
          <input
            id="form-search"
            className="search-input"
            type="search"
            placeholder="🔍  Search forms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card-pad" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {visible.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-4)', padding: '24px 0' }}>
              No forms match your search.
            </div>
          )}
          {visible.map((f) => (
            <div key={f.id} className="solution-card" style={{ cursor: 'default' }}>
              <div className="sol-icon">📋</div>
              <div className="sol-title">{f.name}</div>
              <div className="sol-desc">{f.description}</div>
              <button className="mini-btn mini-btn-detail">⬇️ Download PDF</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
