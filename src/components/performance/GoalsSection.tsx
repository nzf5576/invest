import { useState } from 'react';
import { goals as initialGoals } from '../../data/mockData';
import type { Goal } from '../../types';
import { findAccountLabel } from '../../data/performance';
import { formatCompactCurrency } from '../../utils/format';
import AccountMultiSelect from './AccountMultiSelect';

const GOAL_TYPES: { icon: string; label: string }[] = [
  { icon: '🏖️', label: 'Retirement' },
  { icon: '🏠', label: 'House' },
  { icon: '✈️', label: 'Vacation' },
  { icon: '🎓', label: 'Education' },
  { icon: '🚗', label: 'Vehicle' },
  { icon: '🧯', label: 'Emergency Fund' },
  { icon: '💍', label: 'Wedding' },
  { icon: '⭐', label: 'Other' },
];

const PALETTE = ['var(--navy)', 'var(--accent)', 'var(--teal)', 'var(--purple)', 'var(--orange)', 'var(--primary)'];

interface GoalFormState {
  typeIndex: number;
  name: string;
  target: string;
  current: string;
  date: string;
  accountIds: string[];
}

const emptyForm: GoalFormState = { typeIndex: 0, name: '', target: '', current: '', date: '', accountIds: [] };

function targetDateLabel(goal: Goal & { targetDateLabel?: string }): string {
  if (goal.targetDateLabel) return goal.targetDateLabel;
  return `${goal.targetYear}`;
}

export default function GoalsSection() {
  const [goals, setGoals] = useState<(Goal & { targetDateLabel?: string })[]>(initialGoals);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<GoalFormState>(emptyForm);
  const [error, setError] = useState('');

  function openModal() {
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  }

  function submitGoal() {
    if (form.accountIds.length === 0) {
      setError('Account Selection is required. Please select at least one account for this goal.');
      return;
    }
    const target = parseFloat(form.target) || 0;
    const current = parseFloat(form.current) || 0;
    const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
    let dateLabel = 'No target date set';
    let targetYear = new Date().getFullYear();
    if (form.date) {
      const [y, m] = form.date.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      dateLabel = `${months[parseInt(m, 10) - 1]} ${y}`;
      targetYear = parseInt(y, 10);
    }
    const type = GOAL_TYPES[form.typeIndex];
    const newGoal: Goal & { targetDateLabel: string } = {
      id: `goal-${Date.now()}`,
      icon: type.icon,
      name: form.name || type.label,
      targetAmount: target,
      targetYear,
      targetDateLabel: dateLabel,
      currentAmount: current,
      pct,
      color: PALETTE[goals.length % PALETTE.length],
      accountIds: form.accountIds,
    };
    setGoals((prev) => [...prev, newGoal]);
    setModalOpen(false);
  }

  return (
    <div className="section-block section-goals">
      <div className="section-eyebrow">
        <span className="dot" style={{ background: 'var(--accent)' }} />
        <span className="label" style={{ color: '#5a7d2e' }}>Section 2 · My Goals</span>
      </div>
      <div className="goals-header">
        <div>
          <h2 className="section-title">🎯 My Goals</h2>
          <div className="section-sub">Track savings progress toward what matters to you</div>
        </div>
        <button className="add-goal-btn" onClick={openModal}><span>+</span> Add Goal</button>
      </div>

      <div className="goals-grid">
        {goals.map((goal) => (
          <div className="goal-card" key={goal.id}>
            <div className="goal-pct-badge">{goal.pct < 1 ? '<1' : goal.pct}%</div>
            <div className="goal-icon" aria-hidden="true">{goal.icon}</div>
            <div className="goal-name">{goal.name}</div>
            <div className="goal-target-date">Target: {targetDateLabel(goal)} · {formatCompactCurrency(goal.targetAmount)}</div>
            <div className="goal-accts">Accounts: {(goal.accountIds ?? []).map(findAccountLabel).join(', ') || 'None selected'}</div>
            <div className="goal-progress-wrap"><div className="goal-progress-fill" style={{ width: `${Math.max(goal.pct, 1)}%`, background: goal.color }} /></div>
            <div className="goal-amounts"><span className="current">{formatCompactCurrency(goal.currentAmount)}</span><span>of {formatCompactCurrency(goal.targetAmount)}</span></div>
          </div>
        ))}
        <div className="goal-card empty-add" onClick={openModal}>
          <span style={{ fontSize: 22 }}>+</span>Add a Goal
        </div>
      </div>
      <div className="footnote">Illustrative goal data for internal UX review only — not linked to real account balances.</div>

      {modalOpen && (
        <div className="modal-overlay open" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Add a New Goal</h3>
            <div className="form-row">
              <label>Goal Type</label>
              <div className="goal-type-grid">
                {GOAL_TYPES.map((t, i) => (
                  <div
                    key={t.label}
                    className={`goal-type-opt${form.typeIndex === i ? ' selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, typeIndex: i }))}
                  >
                    <span className="gicon">{t.icon}</span>{t.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-row">
              <label>Goal Name</label>
              <input type="text" placeholder="e.g., Dream Retirement" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-row">
              <label>Target Amount ($)</label>
              <input type="number" placeholder="e.g., 100000" value={form.target} onChange={(e) => setForm((f) => ({ ...f, target: e.target.value }))} />
            </div>
            <div className="form-row">
              <label>Account Selection <span className="req">*</span></label>
              <AccountMultiSelect selected={form.accountIds} onChange={(keys) => setForm((f) => ({ ...f, accountIds: keys }))} />
              <div className="modal-acct-hint">Select one or more accounts this goal should track. Required.</div>
              {error && <div className="modal-acct-hint" style={{ color: 'var(--red)' }}>{error}</div>}
            </div>
            <div className="form-row">
              <label>Additional Assets ($)</label>
              <input type="number" placeholder="e.g., 10000" value={form.current} onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))} />
            </div>
            <div className="form-row">
              <label>Target Date</label>
              <input type="month" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={submitGoal}>Save Goal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
