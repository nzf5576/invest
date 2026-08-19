import { goals } from '../../data/mockData';
import { formatCompactCurrency } from '../../utils/format';

export default function FinancialPlanning() {
  return (
    <div className="fp-tile" role="region" aria-labelledby="fp-heading">
      <div className="fp-header">
        <div>
          <div className="fp-eyebrow">Financial Planning</div>
          <h2 className="fp-title" id="fp-heading">Your Goals &amp; Progress</h2>
          <div className="fp-subtitle">Track your financial goals and get a personalized portfolio recommendation.</div>
        </div>
        <button className="fp-start-btn" aria-label="Add a new financial goal">+ Add Goal</button>
      </div>

      <div className="fp-planner-callout">
        <div className="fp-planner-left">
          <div className="fp-planner-icon" aria-hidden="true">📐</div>
          <div>
            <div className="fp-planner-title">Portfolio Planner</div>
            <div className="fp-planner-desc">
              Get a personalized recommendation for a professionally built portfolio solution designed to meet your
              goals, budget, time horizon, and risk tolerance.
            </div>
          </div>
        </div>
        <button className="fp-planner-btn" aria-label="Get a portfolio recommendation from Portfolio Planner">
          Portfolio Recommendation →
        </button>
      </div>

      <div className="fp-goals" role="list" aria-label="Financial goals">
        {goals.map((goal) => (
          <div className="fp-goal" role="listitem" key={goal.id}>
            <div className="fp-goal-icon" aria-hidden="true">{goal.icon}</div>
            <div className="fp-goal-name">{goal.name}</div>
            <div className="fp-goal-target">Target: {formatCompactCurrency(goal.targetAmount)} by {goal.targetYear}</div>
            <div
              className="fp-goal-bar-wrap"
              role="progressbar"
              aria-valuenow={goal.pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${goal.pct}% toward ${goal.name.toLowerCase()} goal`}
            >
              <div className="fp-goal-bar-fill" style={{ width: `${Math.max(goal.pct, 1)}%`, background: goal.color }} />
            </div>
            <div className="fp-goal-progress" style={{ color: goal.color }}>
              {formatCompactCurrency(goal.currentAmount)} of {formatCompactCurrency(goal.targetAmount)} · {goal.pct < 1 ? '<1' : goal.pct}%
            </div>
          </div>
        ))}
        <button className="fp-add-goal" aria-label="Add another financial goal">
          <span className="fp-add-goal-icon" aria-hidden="true">＋</span>
          <span className="fp-add-goal-label">Add Another Goal</span>
        </button>
      </div>
    </div>
  );
}
