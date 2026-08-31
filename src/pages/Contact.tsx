import { useState } from 'react';
import type { FranchiseKey } from '../types/marketing';
import { franchises } from '../data/franchises';
import PreviewBar from '../components/marketing/PreviewBar';
import MasterBar from '../components/marketing/MasterBar';
import MarketingNav from '../components/marketing/MarketingNav';
import ContactSection from '../components/marketing/ContactSection';
import TrustBand from '../components/marketing/TrustBand';
import MarketingFooter from '../components/marketing/MarketingFooter';
import '../styles/marketing.css';

export default function Contact() {
  const [activeKey, setActiveKey] = useState<FranchiseKey>('corporate');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const property = franchises[activeKey];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mkt-site" style={{ '--mkt-accent': property.accent, '--mkt-accent-bg': property.accentBg } as React.CSSProperties}>
      <PreviewBar active={activeKey} onChange={setActiveKey} />
      <MasterBar active={activeKey} onSelectProperty={setActiveKey} />
      <MarketingNav property={property} active="contact" />

      <ContactSection />

      <div className="mkt-section" style={{ paddingTop: 0 }}>
        <div className="mkt-form-card">
          {submitted ? (
            <div className="mkt-form-success">
              <div className="mkt-form-success-icon" aria-hidden="true">✓</div>
              <h3>Thanks{name ? `, ${name}` : ''} — your message is on its way</h3>
              <p>This is a prototype, so nothing was actually sent. In a real product, our team would follow up within one business day.</p>
            </div>
          ) : (
            <>
              <h2 className="mkt-section-title" style={{ fontSize: 20, marginBottom: 4 }}>Send Us a Message</h2>
              <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 22 }}>
                Fill out the form and we'll route it to the right team. (Prototype — no message is actually sent.)
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mkt-form-row">
                  <div className="mkt-form-field">
                    <label htmlFor="ct-name">Full Name</label>
                    <input id="ct-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                  </div>
                  <div className="mkt-form-field">
                    <label htmlFor="ct-email">Email</label>
                    <input id="ct-email" type="email" required placeholder="jane@example.com" />
                  </div>
                </div>
                <div className="mkt-form-row">
                  <div className="mkt-form-field full">
                    <label htmlFor="ct-subject">Subject</label>
                    <select id="ct-subject" defaultValue="general">
                      <option value="general">General Inquiry</option>
                      <option value="account">Account Support</option>
                      <option value="advisor">I'm a Financial Professional</option>
                      <option value="media">Media Inquiry</option>
                      <option value="careers">Careers</option>
                    </select>
                  </div>
                </div>
                <div className="mkt-form-row">
                  <div className="mkt-form-field full">
                    <label htmlFor="ct-message">Message</label>
                    <textarea id="ct-message" required rows={5} placeholder="How can we help?" />
                  </div>
                </div>
                <button type="submit" className="mkt-form-submit">Send Message</button>
              </form>
            </>
          )}
        </div>
      </div>

      <TrustBand property={property} />
      <MarketingFooter property={property} />
    </div>
  );
}
