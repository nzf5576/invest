import { useState } from 'react';
import AccountMultiSelect from './AccountMultiSelect';
import AllTimeframesChart from './AllTimeframesChart';
import {
  TF_LABELS,
  TF_ORDER,
  type MetricKey,
  type Timeframe,
  clamp,
  fmtMoney0,
  fmtPct,
  getBlendedPctOffset,
  getBlendedRiskOffset,
  metricData,
  metricLabels,
  narrativeScope,
  scopeLabel,
} from '../../data/performance';

const metricKeys: MetricKey[] = ['abs', 'rel', 'twr', 'mwr', 'risk'];

export default function PerformanceSection() {
  const [globalTf, setGlobalTf] = useState<Timeframe>('ytd');
  const [activeMetric, setActiveMetric] = useState<MetricKey>('abs');
  const [acctSelection, setAcctSelection] = useState<Record<MetricKey, string[]>>({
    abs: [], rel: [], twr: [], mwr: [], risk: [],
  });

  function setSelectionFor(key: MetricKey, keys: string[]) {
    setAcctSelection((prev) => ({ ...prev, [key]: keys }));
  }

  return (
    <div className="section-block section-performance">
      <div className="section-eyebrow">
        <span className="dot" style={{ background: 'var(--navy)' }} />
        <span className="label" style={{ color: 'var(--navy)' }}>Section 1 · My Performance</span>
      </div>
      <h1 className="page-title">My Performance</h1>
      <div className="page-sub">Expand any metric to break it out by Account Selection · Timeframe applies across all five metrics</div>

      <div className="global-tf-row">
        <span className="tf-label">Timeframe</span>
        <div className="tf-pill-group">
          {TF_ORDER.map((tf) => (
            <button
              key={tf}
              className={`tf-pill${globalTf === tf ? ' active' : ''}`}
              onClick={() => setGlobalTf(tf)}
            >
              {TF_LABELS[tf]}
            </button>
          ))}
        </div>
      </div>

      <div className="matrix">
        {metricKeys.map((key) => {
          const meta = metricLabels[key];
          const entry = metricData[key][globalTf];
          const isRisk = key === 'risk';
          const displayVal = isRisk ? (entry as { sharpe: number }).sharpe.toFixed(2) : fmtPct((entry as { val: number }).val);
          const barPct = isRisk ? (entry as { sharpePct: number }).sharpePct : (entry as { barPct: number }).barPct;
          const isPos = isRisk ? true : (entry as { val: number }).val >= 0;
          const barColor = isRisk ? 'var(--primary)' : isPos ? 'var(--green)' : 'var(--red)';
          const isActive = activeMetric === key;
          return (
            <div
              key={key}
              className={`metric-tile${isActive ? ' active' : ''}`}
              onClick={() => setActiveMetric(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveMetric(key); }}
            >
              <div className="icon" aria-hidden="true">{meta.icon}</div>
              <div className="name">{meta.name}</div>
              <div className={`val${isRisk ? '' : ` num ${isPos ? 'pos' : 'neg'}`}`}>{displayVal}</div>
              <div className="mini-bar-wrap"><div className="mini-bar" style={{ width: `${barPct}%`, background: barColor }} /></div>
              <div className="tile-scope">All Accounts</div>
              <div className="caret" aria-hidden="true">▾</div>
            </div>
          );
        })}
      </div>

      <div className={`expand-panel${activeMetric ? ' open' : ''}`}>
        <div className="expand-inner">
          <MetricPanel
            metricKey={activeMetric}
            tf={globalTf}
            selectedKeys={acctSelection[activeMetric]}
            onSelectionChange={(keys) => setSelectionFor(activeMetric, keys)}
          />
        </div>
      </div>
    </div>
  );
}

interface MetricPanelProps {
  metricKey: MetricKey;
  tf: Timeframe;
  selectedKeys: string[];
  onSelectionChange: (keys: string[]) => void;
}

function MetricPanel({ metricKey, tf, selectedKeys, onSelectionChange }: MetricPanelProps) {
  const meta = metricLabels[metricKey];
  const badgeSuffix = metricData[metricKey].badgeSuffix;
  const badge = `${badgeSuffix} · ${scopeLabel(selectedKeys)} · ${TF_LABELS[tf]}`;

  const allTfValues = TF_ORDER.map((t) => {
    if (metricKey === 'risk') return metricData.risk[t].sharpe + getBlendedRiskOffset(selectedKeys);
    const base = metricData[metricKey as 'abs' | 'rel' | 'twr' | 'mwr'][t] as { val: number };
    return base.val + getBlendedPctOffset(selectedKeys);
  });

  return (
    <>
      <div className="expand-head">
        <div>
          <h2>{meta.name}</h2>
          <span className="badge-formal">{badge}</span>
        </div>
      </div>

      <div className="drill-selectors">
        <div className="drill-row">
          <span className="tf-label">Account Selection</span>
          <AccountMultiSelect selected={selectedKeys} onChange={onSelectionChange} />
        </div>
      </div>

      {metricKey === 'abs' && <AbsPanel tf={tf} selectedKeys={selectedKeys} />}
      {metricKey === 'twr' && <TwrPanel tf={tf} selectedKeys={selectedKeys} />}
      {metricKey === 'rel' && <RelPanel tf={tf} selectedKeys={selectedKeys} />}
      {metricKey === 'mwr' && <MwrPanel tf={tf} selectedKeys={selectedKeys} />}
      {metricKey === 'risk' && <RiskPanel tf={tf} selectedKeys={selectedKeys} />}

      <div className="viz-row alltf-chart-row">
        <div className="viz-box" style={{ flex: '1 1 100%' }}>
          <h5>{metricKey === 'risk' ? 'Sharpe Ratio Across All Timeframes' : 'Performance Across All Timeframes'}</h5>
          <div className="line-chart-wrap">
            <AllTimeframesChart values={allTfValues} currentTf={tf} isRisk={metricKey === 'risk'} />
          </div>
          <div className="alltf-legend">
            {metricKey === 'risk' ? (
              <>
                <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--primary)' }} />Sharpe Ratio by timeframe</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--navy)' }} />Currently selected timeframe ({TF_LABELS[tf]})</span>
              </>
            ) : (
              <>
                <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--accent)' }} />Positive return</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#e79a9a' }} />Negative return</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--navy)' }} />Currently selected timeframe ({TF_LABELS[tf]})</span>
              </>
            )}
          </div>
        </div>
      </div>

      {metricKey === 'abs' && (
        <div className="why-matters"><strong>Why it matters:</strong> Absolute return answers "did I make money," but not whether that's a good outcome relative to the market, or how much risk it took — that's what the other tiles add.</div>
      )}
      {metricKey === 'rel' && (
        <div className="why-matters"><strong>Why it matters:</strong> Relative return puts the account's outcome in context — a positive absolute number can still trail the broader market.</div>
      )}
      {metricKey === 'twr' && (
        <div className="why-matters"><strong>Why it matters:</strong> TWR is the right lens for judging the underlying strategy itself — compare it to the Money-Weighted Return tile to see how personal timing affected results.</div>
      )}
      {metricKey === 'mwr' && (
        <div className="why-matters"><strong>Why it matters:</strong> MWR best reflects an account holder's lived experience. {mwrVsTwrText(tf, selectedKeys)}</div>
      )}
      {metricKey === 'risk' && (
        <div className="why-matters"><strong>Why it matters:</strong> Two portfolios with the same return can differ greatly in efficiency — a higher risk-adjusted return means less risk was taken to get there.</div>
      )}
      <div className="footnote">Historical data for research purposes only — not investment advice.</div>
    </>
  );
}

function AbsPanel({ tf, selectedKeys }: { tf: Timeframe; selectedKeys: string[] }) {
  const base = metricData.abs[tf];
  const offset = getBlendedPctOffset(selectedKeys);
  const val = base.val + offset;
  const scale = 1 + offset / 50;
  const chart = base.chart.map((h) => clamp(Math.round(h * scale), 4, 100));
  const to = (base.from ?? 0) * (1 + val / 100);
  return (
    <>
      <div className="definition-box">
        <div className="term">What is it?</div>
        <p>The straightforward percentage change in the selected account(s)' value over the selected period — no comparison to anything else.</p>
        <div className="example">Example: {narrativeScope(selectedKeys)} grew from {fmtMoney0(base.from ?? 0)} to {fmtMoney0(to)} over {TF_LABELS[tf]} → absolute return of {fmtPct(val)}.</div>
      </div>
      <div className="viz-row">
        <div className="viz-box">
          <h5>Value Growth · {scopeLabel(selectedKeys)} ({TF_LABELS[tf]})</h5>
          <div className="chart-area">{chart.map((h, i) => <div key={i} className="bar" style={{ height: `${h}%` }} />)}</div>
          <div className="chart-labels">{base.labels.map((l, i) => <span key={i}>{l}</span>)}</div>
        </div>
      </div>
    </>
  );
}

function TwrPanel({ tf, selectedKeys }: { tf: Timeframe; selectedKeys: string[] }) {
  const base = metricData.twr[tf];
  const offset = getBlendedPctOffset(selectedKeys);
  const val = base.val + offset;
  const scale = 1 + offset / 50;
  const chart = base.chart.map((h) => clamp(Math.round(h * scale), 4, 100));
  return (
    <>
      <div className="definition-box">
        <div className="term">What is it?</div>
        <p>The compound growth rate of the selected account(s)' holdings with the effect of deposits/withdrawals removed. This is the industry-standard way funds report performance.</p>
        <div className="example">Example: For {narrativeScope(selectedKeys)}, the fund/strategy's own compounded performance (TWR) over {TF_LABELS[tf]} was {fmtPct(val)}, independent of deposit/withdrawal timing.</div>
      </div>
      <div className="viz-row">
        <div className="viz-box">
          <h5>Sub-Period Linking · {scopeLabel(selectedKeys)} ({TF_LABELS[tf]})</h5>
          <div className="chart-area">{chart.map((h, i) => <div key={i} className="bar" style={{ height: `${h}%` }} />)}</div>
          <div className="chart-labels">{base.labels.map((l, i) => <span key={i}>{l}</span>)}</div>
        </div>
      </div>
    </>
  );
}

function RelPanel({ tf, selectedKeys }: { tf: Timeframe; selectedKeys: string[] }) {
  const base = metricData.rel[tf];
  const offset = getBlendedPctOffset(selectedKeys);
  const you = base.you + offset;
  const blend = base.blend + offset * 0.3;
  const sp = base.sp;
  const val = you - sp;
  const maxV = Math.max(you, sp, blend, 1);
  return (
    <>
      <div className="definition-box">
        <div className="term">What is it?</div>
        <p>The selected account(s)' return compared to a benchmark like the S&amp;P 500. Negative means underperformance; positive means outperformance. Also called <em>excess return</em> or <em>alpha</em>.</p>
        <div className="example">Example: Over {TF_LABELS[tf]}, {narrativeScope(selectedKeys)} returned {fmtPct(you)} while the S&amp;P 500 returned {fmtPct(sp)} → relative return of {fmtPct(val)}.</div>
      </div>
      <div className="viz-row">
        <div className="viz-box" style={{ flex: '1 1 100%' }}>
          <h5>{scopeLabel(selectedKeys)} vs. Benchmark ({TF_LABELS[tf]})</h5>
          <div className="compare-line"><span className="lbl">Your Account(s)</span><div className="bar-track"><div className="bar-fill" style={{ width: `${(you / maxV) * 100}%`, background: 'var(--primary)' }} /></div><span className="num2">{you.toFixed(1)}%</span></div>
          <div className="compare-line"><span className="lbl">S&amp;P 500</span><div className="bar-track"><div className="bar-fill" style={{ width: `${(sp / maxV) * 100}%`, background: 'var(--accent)' }} /></div><span className="num2">{sp.toFixed(1)}%</span></div>
          <div className="compare-line"><span className="lbl">Blended Benchmark</span><div className="bar-track"><div className="bar-fill" style={{ width: `${(blend / maxV) * 100}%`, background: 'var(--navy)' }} /></div><span className="num2">{blend.toFixed(1)}%</span></div>
        </div>
      </div>
    </>
  );
}

function MwrPanel({ tf, selectedKeys }: { tf: Timeframe; selectedKeys: string[] }) {
  const base = metricData.mwr[tf];
  const offset = getBlendedPctOffset(selectedKeys);
  const val = base.val + offset;
  return (
    <>
      <div className="definition-box">
        <div className="term">What is it?</div>
        <p>An internal-rate-of-return calculation reflecting the actual size and timing of the selected account(s)' contributions and withdrawals. Two investors in the same fund can have very different MWRs.</p>
        <div className="example">Example: For {narrativeScope(selectedKeys)} over {TF_LABELS[tf]}, the timing and size of contributions/withdrawals produced a money-weighted return of {fmtPct(val)}.</div>
      </div>
      <div className="viz-row">
        <div className="viz-box" style={{ flex: '1 1 100%' }}>
          <h5>Cash Flow Timeline · {scopeLabel(selectedKeys)} ({TF_LABELS[tf]})</h5>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6 }}>
            {base.cashflows.map((c, i) => <div key={i} style={{ margin: '6px 0' }}>{c}</div>)}
          </div>
        </div>
      </div>
    </>
  );
}

function mwrVsTwrText(tf: Timeframe, selectedKeys: string[]) {
  const offset = getBlendedPctOffset(selectedKeys);
  const mwrVal = metricData.mwr[tf].val + offset;
  const twrVal = metricData.twr[tf].val + offset;
  return <span>Currently, MWR ({fmtPct(mwrVal)}) differs from TWR ({fmtPct(twrVal)}) over {TF_LABELS[tf]} for {scopeLabel(selectedKeys)}.</span>;
}

function RiskPanel({ tf, selectedKeys }: { tf: Timeframe; selectedKeys: string[] }) {
  const base = metricData.risk[tf];
  const offset = getBlendedRiskOffset(selectedKeys);
  const sharpe = base.sharpe + offset;
  const sortino = base.sortino + offset * 1.2;
  const sharpePct = clamp(base.sharpePct + offset * 40, 4, 100);
  const sortinoPct = clamp(base.sortinoPct + offset * 40, 4, 100);
  const strength = sharpe >= 1 ? 'strong' : sharpe >= 0.5 ? 'moderately efficient' : 'relatively inefficient';
  return (
    <>
      <div className="definition-box">
        <div className="term">What is it?</div>
        <p>A measure of return earned per unit of volatility taken over the selected period, for the selected account(s). Higher generally means more return for the "bumpiness" experienced.</p>
        <div className="example">Example: Over {TF_LABELS[tf]}, {scopeLabel(selectedKeys)} showed a Sharpe Ratio of {sharpe.toFixed(2)}, reflecting {strength} risk-taking relative to a portfolio with the same return but higher volatility.</div>
      </div>
      <div className="viz-row">
        <div className="viz-box">
          <h5>Sharpe Ratio</h5>
          <div className="gauge-wrap">
            <div className="gauge" style={{ background: `conic-gradient(var(--primary) 0% ${sharpePct}%, var(--border) ${sharpePct}% 100%)` }}>
              <div className="gauge-inner">{sharpe.toFixed(2)}</div>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-2)' }}>&lt;0.5 Low | 0.5–1.0 Moderate | &gt;1.0 Strong</div>
          </div>
        </div>
        <div className="viz-box">
          <h5>Sortino Ratio (downside only)</h5>
          <div className="gauge-wrap">
            <div className="gauge" style={{ background: `conic-gradient(var(--primary) 0% ${sortinoPct}%, var(--border) ${sortinoPct}% 100%)` }}>
              <div className="gauge-inner">{sortino.toFixed(2)}</div>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-2)' }}>Focuses on downside volatility only.</div>
          </div>
        </div>
      </div>
    </>
  );
}
