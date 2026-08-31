import { useState } from 'react';
import { userProfile, notificationPrefs as initialPrefs } from '../data/profile';
import { bankOptions } from '../types/rmd';
import type { BankChoice } from '../types/rmd';
import '../styles/profile.css';

export default function Profile() {
  const [profile, setProfile] = useState(userProfile);
  const [prefs, setPrefs] = useState(initialPrefs);
  const [toast, setToast] = useState(false);

  function updateProfile<K extends keyof typeof userProfile>(key: K, value: (typeof userProfile)[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function togglePref(id: string, channel: 'email' | 'sms') {
    setPrefs((prev) => prev.map((p) => (p.id === id ? { ...p, [channel]: !p[channel] } : p)));
  }

  function handleSave() {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  const linkedBanks = (Object.keys(bankOptions) as BankChoice[]).filter((k) => k !== 'bank3');

  return (
    <div className="main" role="main">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Profile &amp; Settings</h2>
        </div>
        <div className="card-pad">
          <div className="profile-avatar-row">
            <div className="profile-avatar" aria-hidden="true">{profile.fullName.split(' ').map((p) => p[0]).slice(0, 2).join('')}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>{profile.fullName}</div>
              <div className="profile-member-since">Client since {profile.memberSince}</div>
            </div>
          </div>

          <div className="profile-field-row">
            <div className="profile-field">
              <label htmlFor="pf-name">Full Name</label>
              <input id="pf-name" type="text" value={profile.fullName} disabled />
            </div>
            <div className="profile-field">
              <label htmlFor="pf-email">Email</label>
              <input id="pf-email" type="text" value={profile.email} onChange={(e) => updateProfile('email', e.target.value)} />
            </div>
          </div>
          <div className="profile-field-row">
            <div className="profile-field">
              <label htmlFor="pf-phone">Phone</label>
              <input id="pf-phone" type="text" value={profile.phone} onChange={(e) => updateProfile('phone', e.target.value)} />
            </div>
            <div className="profile-field">
              <label htmlFor="pf-address">Mailing Address</label>
              <input id="pf-address" type="text" value={profile.address.join(', ')} disabled />
            </div>
          </div>

          <button className="profile-save-btn" style={{ marginTop: 4 }} onClick={handleSave}>Save Changes</button>
        </div>
      </div>

      <div className="profile-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Linked Bank Accounts</h2>
          </div>
          <div className="card-pad">
            {linkedBanks.map((key) => {
              const b = bankOptions[key];
              return (
                <div key={key} className="manage-link" style={{ cursor: 'default' }}>
                  <div className="manage-link-icon" style={{ background: '#eef1f4' }} aria-hidden="true">{b.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{b.label}{b.tag && <span className="profile-tag">{b.tag}</span>}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-4)' }}>{b.sub}</div>
                  </div>
                </div>
              );
            })}
            <button className="manage-link">
              <div className="manage-link-icon" style={{ background: '#f0f7ff' }} aria-hidden="true">➕</div>
              Link a New Bank Account
              <span className="manage-link-arrow" aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Notification Preferences</h2>
          </div>
          <div className="card-pad">
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 18, marginBottom: 4 }}>
              <span className="toggle-cell-label">Email</span>
              <span className="toggle-cell-label" style={{ marginRight: 2 }}>SMS</span>
            </div>
            {prefs.map((p) => (
              <div key={p.id} className="toggle-row">
                <div className="ttext">
                  <strong>{p.label}</strong>
                  <span>{p.description}</span>
                </div>
                <div className="toggle-cells">
                  <label className="mini-switch" aria-label={`${p.label} email notifications`}>
                    <input type="checkbox" checked={p.email} onChange={() => togglePref(p.id, 'email')} />
                    <span className="mini-slider" />
                  </label>
                  <label className="mini-switch" aria-label={`${p.label} SMS notifications`}>
                    <input type="checkbox" checked={p.sms} onChange={() => togglePref(p.id, 'sms')} />
                    <span className="mini-slider" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <div className="save-toast" role="status">✓ Your changes have been saved</div>}
    </div>
  );
}
