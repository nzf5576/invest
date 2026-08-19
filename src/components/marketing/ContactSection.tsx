import { forwardRef } from 'react';

const contactCards = [
  { icon: '👤', bg: '#eef4ff', title: 'Individual Investors', desc: 'Questions about your account, transactions, or getting started as a new investor.', phone: '1-800-235-8396', hours: 'Mon–Fri · 7:30 AM – 7:00 PM CT', btn: 'Start Live Chat' },
  { icon: '🤝', bg: '#f0fdf4', title: 'Financial Professionals', desc: 'Model portfolios, practice management support, and dedicated wholesaler contacts.', phone: '1-800-235-8397', hours: 'Mon–Fri · 8:00 AM – 6:00 PM CT', btn: 'Find My Wholesaler' },
  { icon: '🏛️', bg: '#faf5ff', title: 'Institutional Investors', desc: 'RFPs, consultant relations, composite data requests, and institutional client service.', phone: '1-800-235-8398', hours: 'Mon–Fri · 8:00 AM – 6:00 PM CT', btn: 'Contact Institutional Team' },
];

const ContactSection = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div className="mkt-contact-section" ref={ref}>
      <div className="mkt-contact-header">
        <div className="mkt-contact-label">We're Here to Help</div>
        <h2 className="mkt-contact-title">Contact Victory Capital</h2>
        <p className="mkt-contact-desc">
          Whichever path brought you here, we'll connect you with the right team — whether you're investing for
          yourself, advising clients, or managing an institutional mandate.
        </p>
      </div>
      <div className="mkt-contact-grid">
        {contactCards.map((c) => (
          <div className="mkt-contact-card" key={c.title}>
            <div className="mkt-contact-card-icon" style={{ background: c.bg }}>{c.icon}</div>
            <div className="mkt-contact-card-title">{c.title}</div>
            <div className="mkt-contact-card-desc">{c.desc}</div>
            <div className="mkt-contact-card-phone">{c.phone}</div>
            <div className="mkt-contact-card-hours">{c.hours}</div>
            <button className="mkt-contact-card-btn">{c.btn}</button>
          </div>
        ))}
      </div>
      <div className="mkt-contact-general">
        <div className="mkt-contact-general-icon">✉️</div>
        <div className="mkt-contact-general-text">
          <div className="mkt-contact-general-title">Not sure who to contact?</div>
          <div className="mkt-contact-general-sub">Send a general inquiry and we'll route it to the right team automatically.</div>
        </div>
        <div className="mkt-contact-general-actions">
          <button className="mkt-contact-chip">📧 Email Us</button>
          <button className="mkt-contact-chip">📍 Office Locations</button>
          <button className="mkt-contact-chip">📰 Media Inquiries</button>
        </div>
      </div>
    </div>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
