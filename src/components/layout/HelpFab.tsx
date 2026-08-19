import { useEffect, useRef, useState } from 'react';

export default function HelpFab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={rootRef}>
      <button
        className="help-fab"
        aria-label="Get help"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? '✕' : '?'}
      </button>
      <div className={`help-tooltip${open ? ' visible' : ''}`} role="dialog" aria-label="Help options">
        <div className="help-tooltip-title">How can we help?</div>
        <button className="help-tooltip-link">💬 &nbsp;Start Live Chat</button>
        <button className="help-tooltip-link">📞 &nbsp;Call 1-800-235-8396</button>
        <button className="help-tooltip-link">❓ &nbsp;FAQs &amp; Help Center</button>
        <button className="help-tooltip-link">📋 &nbsp;Submit a Request</button>
      </div>
    </div>
  );
}
