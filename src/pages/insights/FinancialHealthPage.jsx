import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { formatCurrency } from '../../utils/formatters'

export default function FinancialHealthPage() {
  const { financialHealthScore, totals, goals } = useAppContext()
  const scoreStyle = {
    background: `conic-gradient(var(--accent-blue) ${financialHealthScore * 3.6}deg, rgba(15, 23, 42, 0.08) 0deg)`,
  }
  const fundedGoals = goals.filter((goal) => goal.savedAmount >= goal.targetAmount).length

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Insights"
        title="Financial health"
        description="A single score backed by savings behavior, cash pressure, and goal progress."
      />

      <div className="content-grid">
        <SurfaceCard className="surface-card--accent">
          <div className="score-ring" style={scoreStyle}>
            <div className="score-ring__inner">
              <strong>{financialHealthScore}</strong>
              <span>out of 100</span>
            </div>
          </div>
          <p className="score-copy">
            {financialHealthScore >= 75
              ? 'You are operating from a healthy base with good room for decisions.'
              : 'There is momentum here, but a little more buffer would make the system sturdier.'}
          </p>
        </SurfaceCard>

        <SurfaceCard>
          <div className="detail-grid detail-grid--compact">
            <div>
              <span>Net savings</span>
              <strong>{formatCurrency(totals.savingsTotal)}</strong>
            </div>
            <div>
              <span>Goals fully funded</span>
              <strong>{fundedGoals}</strong>
            </div>
            <div>
              <span>Open goals</span>
              <strong>{goals.length}</strong>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}
