import { useState } from 'react';
import { formatMoney } from '../../data/performance';

type PlanningTab = 'mc' | 'retgoals';

const RISK_ASSUMPTIONS: Record<string, { mean: number; vol: number }> = {
  conservative: { mean: 0.045, vol: 0.06 },
  moderate: { mean: 0.065, vol: 0.11 },
  aggressive: { mean: 0.085, vol: 0.17 },
};

interface McInputs {
  current: number;
  monthly: number;
  years: number;
  risk: string;
  target: number;
  sims: string;
}
interface McResults {
  p10: number;
  p50: number;
  p90: number;
  successPct: number;
  histogram: number[];
}
interface McLogEntry {
  id: string;
  timestamp: string;
  inputs: McInputs;
  results: McResults;
}

function runSimulation(inputs: McInputs): McResults {
  const a = RISK_ASSUMPTIONS[inputs.risk];
  const months = inputs.years * 12;
  const monthlyMean = a.mean / 12;
  const monthlyVol = a.vol / Math.sqrt(12);

  function simulateOnce() {
    let bal = inputs.current;
    for (let i = 0; i < months; i++) {
      const rand = (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
      const r = monthlyMean + monthlyVol * rand;
      bal = bal * (1 + r) + inputs.monthly;
    }
    return Math.max(bal, 0);
  }

  const runs = 400;
  const results: number[] = [];
  for (let i = 0; i < runs; i++) results.push(simulateOnce());
  results.sort((x, y) => x - y);

  const p10 = results[Math.floor(runs * 0.1)];
  const p50 = results[Math.floor(runs * 0.5)];
  const p90 = results[Math.floor(runs * 0.9)];
  const successCount = results.filter((v) => v >= inputs.target).length;
  const successPct = Math.round((successCount / runs) * 100);

  const bucketCount = 10;
  const maxVal = Math.max(...results, inputs.target);
  const bucketSize = maxVal / bucketCount;
  const counts = new Array(bucketCount).fill(0);
  results.forEach((v) => {
    const idx = Math.min(bucketCount - 1, Math.floor(v / bucketSize));
    counts[idx]++;
  });
  const maxCount = Math.max(...counts, 1);
  const histogram = counts.map((c) => Math.max(6, Math.round((c / maxCount) * 100)));

  return { p10, p50, p90, successPct, histogram };
}

function gaugeColor(pct: number) {
  return pct >= 70 ? 'var(--green)' : pct >= 40 ? 'var(--primary)' : 'var(--red)';
}

function timestamp() {
  return new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

interface RgInputs {
  currentAge: number;
  retireAge: number;
  savings: number;
  monthly: number;
  annualReturnPct: number;
  taxRatePct: number;
  inflationPct: number;
  goal: number;
}
interface RgResults {
  beforeTax: number;
  afterTax: number;
  afterInflation: number;
  meetsGoal: boolean;
  suggestion: string;
}
interface RgLogEntry {
  id: string;
  timestamp: string;
  inputs: RgInputs;
  results: RgResults;
}

function runRetirementCalc(inputs: RgInputs): RgResults {
  const years = Math.max(inputs.retireAge - inputs.currentAge, 1);
  const months = years * 12;
  const annualReturn = inputs.annualReturnPct / 100;
  const taxRate = inputs.taxRatePct / 100;
  const inflation = inputs.inflationPct / 100;
  const monthlyReturn = annualReturn / 12;

  let beforeTax = inputs.savings * Math.pow(1 + monthlyReturn, months);
  if (monthlyReturn > 0) {
    beforeTax += inputs.monthly * ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
  } else {
    beforeTax += inputs.monthly * months;
  }

  const totalContributions = inputs.savings + inputs.monthly * months;
  const totalGrowth = Math.max(beforeTax - totalContributions, 0);
  const afterTax = totalContributions + totalGrowth * (1 - taxRate);
  const afterInflation = afterTax / Math.pow(1 + inflation, years);

  const gap = inputs.goal - afterInflation;
  let suggestion: string;
  if (gap > 0) {
    const extraMonthly = monthlyReturn > 0
      ? (gap / ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn)) * Math.pow(1 + inflation, years) / (1 - taxRate)
      : gap / months;
    suggestion = `Your current plan is projected to fall short of your goal by roughly $${Math.round(gap).toLocaleString()} in today's dollars. Increasing your monthly contribution by approximately $${Math.max(0, Math.round(extraMonthly)).toLocaleString()}, or extending your time horizon by a few years, could help close this gap.`;
  } else {
    suggestion = `Your current plan is projected to meet or exceed your goal by roughly $${Math.round(-gap).toLocaleString()} in today's dollars. You may have flexibility to reduce contributions, retire earlier, or set a more ambitious goal.`;
  }

  return { beforeTax, afterTax, afterInflation, meetsGoal: afterInflation >= inputs.goal, suggestion };
}

export default function PlanningSection() {
  const [activeTab, setActiveTab] = useState<PlanningTab>('mc');

  return (
    <div className="section-block section-planning">
      <div className="section-eyebrow">
        <span className="dot" style={{ background: 'var(--neutral)' }} />
        <span className="label" style={{ color: 'var(--text-2)' }}>Section 3 · Planning</span>
      </div>
      <h2 className="section-title">🧮 Planning</h2>
      <div className="section-sub">Model out possible futures for your portfolio and track progress toward your retirement goal</div>

      <div className="planning-grid">
        <div className={`planning-tile${activeTab === 'mc' ? ' active' : ''}`} onClick={() => setActiveTab('mc')}>
          <div className="icon" aria-hidden="true">🎲</div>
          <div className="name">Monte Carlo Simulation</div>
          <div className="desc">Run thousands of simulated market paths to see a range of possible outcomes for your portfolio, not just a single projection.</div>
          <div className="caret" aria-hidden="true">▾</div>
        </div>
        <div className={`planning-tile${activeTab === 'retgoals' ? ' active' : ''}`} onClick={() => setActiveTab('retgoals')}>
          <div className="icon" aria-hidden="true">🏖️</div>
          <div className="name">Retirement Goals Calculator</div>
          <div className="desc">Estimate what your investment could grow to before taxes, after taxes, and after taxes &amp; inflation — with suggestions if you're off track.</div>
          <div className="caret" aria-hidden="true">▾</div>
        </div>

        <div className={`planning-panel${activeTab === 'mc' ? ' open' : ''}`}>
          <div className="expand-inner"><MonteCarloPanel /></div>
        </div>
        <div className={`planning-panel${activeTab === 'retgoals' ? ' open' : ''}`}>
          <div className="expand-inner"><RetirementGoalsPanel /></div>
        </div>
      </div>
    </div>
  );
}

function MonteCarloPanel() {
  const [inputs, setInputs] = useState<McInputs>({ current: 504000, monthly: 1200, years: 19, risk: 'moderate', target: 1200000, sims: '5000' });
  const [results, setResults] = useState<McResults | null>(null);
  const [log, setLog] = useState<McLogEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleRun() {
    const r = runSimulation(inputs);
    setResults(r);
    const entry: McLogEntry = { id: `mc${Date.now()}`, timestamp: timestamp(), inputs, results: r };
    setLog((prev) => [entry, ...prev]);
    setSelectedId(entry.id);
  }

  function viewEntry(entry: McLogEntry) {
    setInputs(entry.inputs);
    setResults(entry.results);
    setSelectedId(entry.id);
  }

  return (
    <>
      <div className="expand-head"><div><h2>Monte Carlo Simulation</h2><span className="badge-formal">Probability-Based Projection</span></div></div>
      <div className="definition-box">
        <div className="term">What is it?</div>
        <p>Rather than assuming one fixed rate of return, a Monte Carlo simulation runs your portfolio through thousands of randomized market scenarios — varying returns, sequencing, and volatility — to show a <em>range</em> of possible outcomes and the probability of reaching your goal.</p>
        <div className="example">Example: Instead of "your portfolio grows to $1.2M," Monte Carlo tells you "in 82% of simulated market conditions, your portfolio reached or exceeded $1.2M by your target date."</div>
      </div>

      <div className="calc-form-grid">
        <div className="calc-field"><label>Current Portfolio Value ($)</label><input type="number" value={inputs.current} onChange={(e) => setInputs((f) => ({ ...f, current: parseFloat(e.target.value) || 0 }))} /></div>
        <div className="calc-field"><label>Monthly Contribution ($)</label><input type="number" value={inputs.monthly} onChange={(e) => setInputs((f) => ({ ...f, monthly: parseFloat(e.target.value) || 0 }))} /></div>
        <div className="calc-field"><label>Years to Goal</label><input type="number" value={inputs.years} onChange={(e) => setInputs((f) => ({ ...f, years: parseFloat(e.target.value) || 1 }))} /></div>
        <div className="calc-field">
          <label>Risk Profile</label>
          <select value={inputs.risk} onChange={(e) => setInputs((f) => ({ ...f, risk: e.target.value }))}>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
        <div className="calc-field"><label>Target Goal Amount ($)</label><input type="number" value={inputs.target} onChange={(e) => setInputs((f) => ({ ...f, target: parseFloat(e.target.value) || 0 }))} /></div>
        <div className="calc-field">
          <label>Number of Simulations</label>
          <select value={inputs.sims} onChange={(e) => setInputs((f) => ({ ...f, sims: e.target.value }))}>
            <option value="1000">1,000</option>
            <option value="5000">5,000</option>
            <option value="10000">10,000</option>
          </select>
        </div>
        <div className="calc-field" style={{ alignSelf: 'end' }}><button className="calc-run-btn" onClick={handleRun}>Run Simulation</button></div>
      </div>

      <div className="viz-row">
        <div className="viz-box" style={{ flex: '1 1 260px' }}>
          <h5>Probability of Success</h5>
          <div className="success-gauge-wrap">
            <div className="gauge" style={{ background: `conic-gradient(${gaugeColor(results?.successPct ?? 0)} 0% ${results?.successPct ?? 0}%, var(--border) ${results?.successPct ?? 0}% 100%)` }}>
              <div className="gauge-inner">{results ? `${results.successPct}%` : '—'}</div>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-2)' }}>Share of simulated market paths that met or exceeded your target goal by the end of the time horizon.</div>
          </div>
        </div>
        <div className="viz-box" style={{ flex: '2 1 320px' }}>
          <h5>Distribution of Simulated Ending Balances</h5>
          <div className="mc-histogram">
            {(results?.histogram ?? new Array(10).fill(6)).map((h, i) => <div key={i} className="hbar" style={{ height: `${h}%` }} />)}
          </div>
          <div className="chart-labels"><span>Low</span><span></span><span></span><span></span><span>Median</span><span></span><span></span><span></span><span></span><span>High</span></div>
        </div>
      </div>

      <div className="viz-row">
        <div className="viz-box" style={{ flex: '1 1 100%' }}>
          <h5>Outcome Range by Percentile</h5>
          <div className="percentile-row"><span className="plbl">10th Percentile (Pessimistic)</span><div className="bar-track"><div className="bar-fill" style={{ width: '45%', background: 'var(--red)' }} /></div><span className="num2">{results ? formatMoney(results.p10) : '—'}</span></div>
          <div className="percentile-row"><span className="plbl">50th Percentile (Median)</span><div className="bar-track"><div className="bar-fill" style={{ width: '75%', background: 'var(--primary)' }} /></div><span className="num2">{results ? formatMoney(results.p50) : '—'}</span></div>
          <div className="percentile-row"><span className="plbl">90th Percentile (Optimistic)</span><div className="bar-track"><div className="bar-fill" style={{ width: '100%', background: 'var(--green)' }} /></div><span className="num2">{results ? formatMoney(results.p90) : '—'}</span></div>
        </div>
      </div>

      <div className="why-matters"><strong>Why it matters:</strong> Markets don't move in a straight line. Monte Carlo simulation helps illustrate a range of plausible futures — including unfavorable sequences of returns — so a plan isn't built on a single optimistic assumption.</div>

      <div className="sublog-wrap">
        <div className="sublog-header">
          <h5>Submission Log</h5>
          {log.length > 0 && <span className="sublog-clear" onClick={() => { setLog([]); setSelectedId(null); }}>Clear log</span>}
        </div>
        {log.length === 0 ? (
          <div className="sublog-empty">No simulations run yet this session. Run a simulation above to log it here.</div>
        ) : (
          <table className="sublog-table">
            <thead><tr><th>Date/Time</th><th>Risk Profile</th><th>Years</th><th>Target</th><th>Success %</th><th></th></tr></thead>
            <tbody>
              {log.map((e) => (
                <tr key={e.id} className={`sublog-row${e.id === selectedId ? ' selected' : ''}`} onClick={() => viewEntry(e)}>
                  <td>{e.timestamp}</td>
                  <td>{e.inputs.risk.charAt(0).toUpperCase() + e.inputs.risk.slice(1)}</td>
                  <td>{e.inputs.years} yrs</td>
                  <td>{formatMoney(e.inputs.target)}</td>
                  <td>{e.results.successPct}%</td>
                  <td className="sublog-view-btn">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="footnote">Illustrative simulation for educational purposes only. Actual results will vary. Not a guarantee of future performance and not investment advice. All investing involves risk, including loss of principal. Submission log is session-based and not persisted.</div>
    </>
  );
}

function RetirementGoalsPanel() {
  const [inputs, setInputs] = useState<RgInputs>({ currentAge: 46, retireAge: 65, savings: 504000, monthly: 1200, annualReturnPct: 6.5, taxRatePct: 22, inflationPct: 2.8, goal: 1200000 });
  const [results, setResults] = useState<RgResults | null>(null);
  const [log, setLog] = useState<RgLogEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleCalculate() {
    const r = runRetirementCalc(inputs);
    setResults(r);
    const entry: RgLogEntry = { id: `rg${Date.now()}`, timestamp: timestamp(), inputs, results: r };
    setLog((prev) => [entry, ...prev]);
    setSelectedId(entry.id);
  }

  function viewEntry(entry: RgLogEntry) {
    setInputs(entry.inputs);
    setResults(entry.results);
    setSelectedId(entry.id);
  }

  const pctOfGoal = results ? Math.min(100, Math.max(0, Math.round((results.afterInflation / inputs.goal) * 100))) : 0;

  return (
    <>
      <div className="expand-head"><div><h2>Retirement Goals Calculator</h2><span className="badge-formal">Investment Goal Projection</span></div></div>
      <div className="definition-box">
        <div className="term">What is it?</div>
        <p>Estimates how much your investment might grow before taxes, after taxes, and after taxes &amp; inflation — and offers suggestions on what to adjust if your current plan isn't projected to meet your goal.</p>
        <div className="example">Example: A $1,200,000 retirement goal in 19 years may require a higher monthly contribution once inflation is factored in — this calculator shows that gap explicitly.</div>
      </div>

      <div className="calc-form-grid">
        <div className="calc-field"><label>Current Age</label><input type="number" value={inputs.currentAge} onChange={(e) => setInputs((f) => ({ ...f, currentAge: parseFloat(e.target.value) || 0 }))} /></div>
        <div className="calc-field"><label>Retirement Age</label><input type="number" value={inputs.retireAge} onChange={(e) => setInputs((f) => ({ ...f, retireAge: parseFloat(e.target.value) || 1 }))} /></div>
        <div className="calc-field"><label>Current Savings ($)</label><input type="number" value={inputs.savings} onChange={(e) => setInputs((f) => ({ ...f, savings: parseFloat(e.target.value) || 0 }))} /></div>
        <div className="calc-field"><label>Monthly Contribution ($)</label><input type="number" value={inputs.monthly} onChange={(e) => setInputs((f) => ({ ...f, monthly: parseFloat(e.target.value) || 0 }))} /></div>
        <div className="calc-field"><label>Expected Annual Return (%)</label><input type="number" step="0.1" value={inputs.annualReturnPct} onChange={(e) => setInputs((f) => ({ ...f, annualReturnPct: parseFloat(e.target.value) || 0 }))} /></div>
        <div className="calc-field"><label>Estimated Tax Rate (%)</label><input type="number" step="0.1" value={inputs.taxRatePct} onChange={(e) => setInputs((f) => ({ ...f, taxRatePct: parseFloat(e.target.value) || 0 }))} /></div>
        <div className="calc-field"><label>Expected Inflation Rate (%)</label><input type="number" step="0.1" value={inputs.inflationPct} onChange={(e) => setInputs((f) => ({ ...f, inflationPct: parseFloat(e.target.value) || 0 }))} /></div>
        <div className="calc-field"><label>Retirement Goal ($)</label><input type="number" value={inputs.goal} onChange={(e) => setInputs((f) => ({ ...f, goal: parseFloat(e.target.value) || 1 }))} /></div>
      </div>
      <button className="calc-run-btn" style={{ marginBottom: 16 }} onClick={handleCalculate}>Calculate</button>

      <div className="result-grid">
        <div className="result-card"><h5>Growth Before Taxes</h5><div className="rval">{results ? `$${Math.round(results.beforeTax).toLocaleString()}` : '—'}</div></div>
        <div className="result-card"><h5>Growth After Taxes</h5><div className="rval">{results ? `$${Math.round(results.afterTax).toLocaleString()}` : '—'}</div></div>
        <div className={`result-card${results && !results.meetsGoal ? ' warn' : ''}`}><h5>After Taxes &amp; Inflation</h5><div className="rval">{results ? `$${Math.round(results.afterInflation).toLocaleString()}` : '—'}</div></div>
      </div>

      <div className="viz-row">
        <div className="viz-box" style={{ flex: '1 1 100%' }}>
          <h5>Projected vs. Goal (Today's Dollars)</h5>
          <div className="compare-line"><span className="lbl">Retirement Goal</span><div className="bar-track"><div className="bar-fill" style={{ width: '100%', background: 'var(--accent)' }} /></div><span className="num2">{formatMoney(inputs.goal)}</span></div>
          <div className="compare-line"><span className="lbl">Projected (After Tax &amp; Inflation)</span><div className="bar-track"><div className="bar-fill" style={{ width: `${pctOfGoal}%`, background: results?.meetsGoal ? 'var(--green)' : 'var(--red)' }} /></div><span className="num2">{results ? formatMoney(results.afterInflation) : '—'}</span></div>
        </div>
      </div>

      {results && (
        <div className="suggestion-box"><strong>Suggestion:</strong> {results.suggestion}</div>
      )}

      <div className="why-matters" style={{ marginTop: 14 }}><strong>Why it matters:</strong> A goal expressed in future dollars can be misleading. Layering in taxes and inflation shows what your projected balance is actually worth in <em>today's</em> purchasing power — the number that matters most for planning.</div>

      <div className="sublog-wrap">
        <div className="sublog-header">
          <h5>Submission Log</h5>
          {log.length > 0 && <span className="sublog-clear" onClick={() => { setLog([]); setSelectedId(null); }}>Clear log</span>}
        </div>
        {log.length === 0 ? (
          <div className="sublog-empty">No calculations run yet this session. Click Calculate above to log it here.</div>
        ) : (
          <table className="sublog-table">
            <thead><tr><th>Date/Time</th><th>Ages</th><th>Goal</th><th>Projected (After Tax &amp; Inflation)</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {log.map((e) => (
                <tr key={e.id} className={`sublog-row${e.id === selectedId ? ' selected' : ''}`} onClick={() => viewEntry(e)}>
                  <td>{e.timestamp}</td>
                  <td>{e.inputs.currentAge} → {e.inputs.retireAge}</td>
                  <td>{formatMoney(e.inputs.goal)}</td>
                  <td>{formatMoney(e.results.afterInflation)}</td>
                  <td>{e.results.meetsGoal ? <span style={{ color: 'var(--green)', fontWeight: 700 }}>On Track</span> : <span style={{ color: 'var(--red)', fontWeight: 700 }}>Short</span>}</td>
                  <td className="sublog-view-btn">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="footnote">This tool is for educational purposes only and does not constitute investment, legal, or tax advice. All examples are hypothetical and for illustrative purposes only. Obtain relevant and specific professional advice before making any investment or other decision. Submission log is session-based and not persisted.</div>
    </>
  );
}
