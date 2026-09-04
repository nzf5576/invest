import { useEffect, useRef, useState } from 'react';
import { accountCatalog, scopeLabel } from '../../data/performance';

interface AccountMultiSelectProps {
  selected: string[];
  onChange: (keys: string[]) => void;
  label?: string;
}

export default function AccountMultiSelect({ selected, onChange, label = 'Account Selection' }: AccountMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function toggleOne(key: string) {
    const next = selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key];
    onChange(next);
  }

  return (
    <div className="acct-select-wrap" ref={wrapRef}>
      <button
        type="button"
        className={`acct-select-btn${open ? ' open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
      >
        <span>{scopeLabel(selected)}</span>
        <span className="chev" aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="acct-dropdown open" role="listbox">
          <div className="acct-opt-all" onClick={() => onChange([])}>
            <input type="checkbox" readOnly checked={selected.length === 0} /> All Accounts
          </div>
          {Object.entries(accountCatalog).map(([group, accts]) => (
            <div key={group}>
              <div className="acct-group-label">{group}</div>
              {accts.map((acct) => (
                <div key={acct.key} className="acct-opt" onClick={() => toggleOne(acct.key)}>
                  <input type="checkbox" readOnly checked={selected.includes(acct.key)} /> {acct.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
