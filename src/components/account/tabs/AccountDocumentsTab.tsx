import { Link } from 'react-router-dom';
import type { Account } from '../../../types';
import { documents } from '../../../data/documents';

interface Props {
  account: Account;
}

const typeIcon: Record<string, string> = {
  Statement: '📄',
  'Tax Form': '🧾',
  Confirmation: '✅',
  Prospectus: '📘',
};

export default function AccountDocumentsTab({ account }: Props) {
  const accountDocs = documents.filter((d) => d.accountId === account.id).slice(0, 6);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Documents for this Account</h2>
        <Link className="card-link" to={`/documents?account=${account.id}`}>Open Document Center →</Link>
      </div>

      <div role="list">
        {accountDocs.length === 0 && (
          <div className="card-pad" style={{ textAlign: 'center', color: 'var(--text-4)' }}>
            No documents on file for this account yet.
          </div>
        )}
        {accountDocs.map((doc) => (
          <div key={doc.id} role="listitem" className="manage-link" style={{ cursor: 'default' }}>
            <div className="manage-link-icon" style={{ background: '#f0f7ff' }} aria-hidden="true">{typeIcon[doc.type]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{doc.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-4)' }}>{doc.type} · {doc.date} · {doc.size}</div>
            </div>
            <button className="mini-btn mini-btn-detail" style={{ marginLeft: 'auto' }} aria-label={`Download ${doc.name}`}>⬇️ Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
