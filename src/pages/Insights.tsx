import { useState } from 'react';
import { insightArticles, insightCategories } from '../data/insights';

const categoryColor: Record<string, string> = {
  'Market Commentary': 'var(--navy)',
  'Retirement Planning': 'var(--orange)',
  'Tax Planning': 'var(--purple)',
  'Fund Updates': 'var(--teal)',
  'Education Savings': 'var(--accent)',
};

export default function Insights() {
  const [category, setCategory] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = category === 'all' ? insightArticles : insightArticles.filter((a) => a.category === category);

  return (
    <div className="main" role="main">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Insights &amp; Market Commentary</h2>
          <span className="as-of">{insightArticles.length} articles</span>
        </div>

        <div className="filter-row" role="group" aria-label="Filter insights by category">
          <span className="filter-label">Category:</span>
          <button className={`filter-chip${category === 'all' ? ' active' : ''}`} onClick={() => setCategory('all')}>
            All Insights
          </button>
          {insightCategories.map((c) => (
            <button key={c} className={`filter-chip${category === c ? ' active' : ''}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {visible.map((a) => {
            const isOpen = openId === a.id;
            return (
              <article
                key={a.id}
                style={{ border: '1.5px solid var(--border)', borderRadius: 12, padding: 18, cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                onClick={() => setOpenId(isOpen ? null : a.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span
                    className="gain-badge"
                    style={{ background: '#f1f5f9', color: categoryColor[a.category] ?? 'var(--navy)' }}
                  >
                    {a.category}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{a.date} · {a.readTime}</span>
                </div>
                <h3 style={{ fontSize: 16, color: 'var(--text-1)', marginBottom: 6 }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-3)', lineHeight: 1.6, margin: 0 }}>
                  {isOpen ? a.body : a.summary}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-4)' }}>By {a.author}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>
                    {isOpen ? 'Show less ▲' : 'Read more ▼'}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
