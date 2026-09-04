import PerformanceSection from '../components/performance/PerformanceSection';
import GoalsSection from '../components/performance/GoalsSection';
import PlanningSection from '../components/performance/PlanningSection';
import '../styles/performance.css';

export default function MyPerformance() {
  return (
    <div className="main perf-page" role="main">
      <PerformanceSection />
      <GoalsSection />
      <PlanningSection />
      <div className="perf-disclosure">
        This is historical/illustrative data for research purposes only — not investment advice. All investing involves risk, including loss of principal. Account Selection breakouts, Monte Carlo simulations, and retirement goal projections are hypothetical, do not reflect actual investment results, and do not guarantee future outcomes.
        <br /><strong>NOT FDIC INSURED &bull; MAY LOSE VALUE &bull; NO BANK GUARANTEE</strong>
      </div>
    </div>
  );
}
