import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { documents } from '../data/documents';
import { accounts } from '../data/mockData';
import type { DocumentType } from '../types';

const typeIcon: Record<DocumentType, string> = {
  Statement: '📄',
  'Tax Form': '🧾',
  Confirmation: '✅',
  Prospectus: '📘',
};

const typeFilters: { key: 'all' | DocumentType; label: string }[] = [
  { key: 'all', label: 'All Documents' },
  { key: 'Statement', label: 'Statements' },
  { key: 'Tax Form', label: 'Tax Forms' },
  { key: 'Confirmation', label: 'Confirmations' },
  { key: 'Prospectus', label: 'Prospectuses' },
];

export default function DocumentCenter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [typeFilter, setTypeFilter] = useState<'all' | DocumentType>('all');
  const [search, setSearch] = useState('');
  const accountFilter = searchParams.get('account') ?? 'all';

  const visible = useMemo(() => {
    return documents
      .filter((d) => typeFilter === 'all' || d.type === typeFilter)
      .filter((d) => accountFilter === 'all' || d.accountId === accountFilter)
      .filter((d) => !search || d.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [typeFilter, accountFilter, search]);

  return (
    <div className="main" role="main">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Document Center</h2>
          <span className="as-of">{documents.length} documents on file</span>
        </div>

        <div className="filter-row" role="group" aria-label="Filter documents by type">
          <span className="filter-label">Type:</span>
          {typeFilters.map((f) => (
            <button
              key={f.key}
              className={`filter-chip${typeFilter === f.key ? ' active' : ''}`}
              onClick={() => setTypeFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="filter-row" role="group" aria-label="Filter documents by account">
          <span className="filter-label">Account:</span>
          <button
            className={`filter-chip${accountFilter === 'all' ? ' active' : ''}`}
            onClick={() => setSearchParams({})}
          >
            All Accounts
          </button>
          {Object.values(accounts).map((a) => (
            <button
              key={a.id}
              className={`filter-chip${accountFilter === a.id ? ' active' : ''}`}
              onClick={() => setSearchParams({ account: a.id })}
            >
              {a.registration}
            </button>
          ))}
          <label htmlFor="doc-search" className="sr-only">Search documents</label>
          <input
            id="doc-search"
            className="search-input"
            type="search"
            placeholder="🔍  Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div role="list">
          {visible.length === 0 && (
            <div className="card-pad" style={{ textAlign: 'center', color: 'var(--text-4)' }}>
              No documents match your filters.
            </div>
          )}
          {visible.map((doc) => (
            <div key={doc.id} role="listitem" className="manage-link" style={{ cursor: 'default' }}>
              <div className="manage-link-icon" style={{ background: '#f0f7ff' }} aria-hidden="true">{typeIcon[doc.type]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{doc.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-4)' }}>
                  {accounts[doc.accountId]?.registration} · {doc.date} · {doc.size}
                </div>
              </div>
              <button className="mini-btn mini-btn-detail" style={{ marginLeft: 'auto' }} aria-label={`Download ${doc.name}`}>⬇️ Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
