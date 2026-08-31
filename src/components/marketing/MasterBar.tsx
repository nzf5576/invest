import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { FranchiseKey, LoginTab } from '../../types/marketing';
import { demoProperties, franchises } from '../../data/franchises';

interface Props {
  active: FranchiseKey;
  onSelectProperty: (key: FranchiseKey) => void;
  onScrollToContact: () => void;
}

const propertyDotColors: Record<FranchiseKey, string> = {
  corporate: '#004a98',
  westend: '#0f766e',
  pioneer: '#7c3aed',
  sycamore: '#dc2626',
};

const loginTabs: { key: LoginTab; icon: string; label: string }[] = [
  { key: 'investor', icon: '👤', label: 'Individual Investor' },
  { key: 'advisor', icon: '🤝', label: 'Financial Professional' },
  { key: 'institutional', icon: '🏛️', label: 'Institutional' },
];

const loginPanels: Record<LoginTab, { desc: string; idLabel: string; submitLabel: string; forgotLabel: string; secondaryLabel: string; newUserText: string; newUserBtn: string }> = {
  investor: {
    desc: 'Access your Victory inVest account to view holdings, manage preferences, and complete transactions online.',
    idLabel: 'Username',
    submitLabel: 'Log In to inVest →',
    forgotLabel: 'Forgot username/password?',
    secondaryLabel: 'Enable Touch/Face ID',
    newUserText: 'New to Victory Capital?',
    newUserBtn: 'Register for Online Access',
  },
  advisor: {
    desc: 'Financial professionals can access model portfolios, client account tools, and practice management resources.',
    idLabel: 'Advisor ID',
    submitLabel: 'Log In to Advisor Portal →',
    forgotLabel: 'Forgot credentials?',
    secondaryLabel: 'Contact your wholesaler',
    newUserText: 'Not yet registered as an advisor?',
    newUserBtn: 'Request Advisor Access',
  },
  institutional: {
    desc: 'Institutional clients and consultants can access performance reporting, composite data, and RFP resources.',
    idLabel: 'Institutional ID',
    submitLabel: 'Log In to Institutional Portal →',
    forgotLabel: 'Forgot credentials?',
    secondaryLabel: 'Contact Institutional Services',
    newUserText: 'Represent an institution or consultant firm?',
    newUserBtn: 'Request Institutional Access',
  },
};

export default function MasterBar({ active, onSelectProperty, onScrollToContact }: Props) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginTab, setLoginTab] = useState<LoginTab>('investor');
  const [propertyOpen, setPropertyOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setLoginOpen(false);
        setPropertyOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const panel = loginPanels[loginTab];

  return (
    <div className="mkt-master-bar" ref={rootRef}>
      <div className="mkt-master-bar-left">
        <button className="mkt-link-btn" onClick={onScrollToContact}>Contact Us</button>
        <span>Careers</span>
        <span>Newsroom</span>
      </div>
      <div className="mkt-master-bar-right">
        <div className="mkt-login-switcher">
          <button
            className="mkt-login-btn-master"
            onClick={() => { setLoginOpen((o) => !o); setPropertyOpen(false); }}
          >
            🔐 Log In <span>▾</span>
          </button>
          {loginOpen && (
            <div className="mkt-login-menu">
              <div className="mkt-login-menu-header">
                <div className="mkt-login-menu-header-title">Access Your Account</div>
                <div className="mkt-login-menu-header-sub">One Victory Capital — three secure portals, tailored to you</div>
              </div>
              <div className="mkt-login-tabs">
                {loginTabs.map((t) => (
                  <button
                    key={t.key}
                    className={`mkt-login-tab${loginTab === t.key ? ' active' : ''}`}
                    onClick={() => setLoginTab(t.key)}
                  >
                    <span className="mkt-login-tab-icon">{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="mkt-login-panel">
                <p className="mkt-login-panel-desc">{panel.desc}</p>
                <div className="mkt-login-field">
                  <label>{panel.idLabel}</label>
                  <input type="text" placeholder={`Enter your ${panel.idLabel.toLowerCase()}`} />
                </div>
                <div className="mkt-login-field">
                  <label>Password</label>
                  <input type="password" placeholder="Enter your password" />
                </div>
                <div className="mkt-login-submit-row">
                  {loginTab === 'investor' ? (
                    <Link className="mkt-login-submit" to="/dashboard" onClick={() => setLoginOpen(false)}>
                      {panel.submitLabel}
                    </Link>
                  ) : (
                    <button className="mkt-login-submit">{panel.submitLabel}</button>
                  )}
                </div>
                <div className="mkt-login-links">
                  <button>{panel.forgotLabel}</button>
                  <button>{panel.secondaryLabel}</button>
                </div>
                <div className="mkt-login-new-user">
                  <div className="mkt-login-new-user-text">{panel.newUserText}</div>
                  <button className="mkt-login-new-user-btn">{panel.newUserBtn}</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mkt-property-switcher">
          <button
            className="mkt-property-switcher-btn"
            onClick={() => { setPropertyOpen((o) => !o); setLoginOpen(false); }}
          >
            🏛️ Investment Franchises <span>▾</span>
          </button>
          {propertyOpen && (
            <div className="mkt-property-menu">
              <div className="mkt-property-menu-header">All Victory Capital Properties</div>
              {demoProperties.map((key) => (
                <button
                  key={key}
                  className={`mkt-property-menu-item${active === key ? ' current' : ''}`}
                  onClick={() => { onSelectProperty(key); setPropertyOpen(false); }}
                >
                  <span className="mkt-property-menu-dot" style={{ background: propertyDotColors[key] }} />
                  {key === 'corporate' ? 'Victory Capital — Corporate' : franchises[key].franchiseName}
                </button>
              ))}
              <Link className="mkt-property-menu-item" to="/investment-franchises" style={{ textDecoration: 'none' }} onClick={() => setPropertyOpen(false)}>
                <span className="mkt-property-menu-dot" style={{ background: '#94a3b8' }} />
                View All 9 Franchises →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
