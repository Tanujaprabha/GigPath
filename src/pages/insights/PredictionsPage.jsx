import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { formatCurrency } from '../../utils/formatters'

export default function PredictionsPage() {
  const { totals, recurringExpenses, goals } = useAppContext()
  const recurringTotal = recurringExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
  const projectedMonthNet = totals.savingsTotal - recurringTotal
  const remainingGoalNeed = goals.reduce(
    (sum, goal) => sum + Math.max((Number(goal.targetAmount) || 0) - (Number(goal.savedAmount) || 0), 0),
    0,
  )
  const monthsToFundGoals = projectedMonthNet > 0 ? remainingGoalNeed / projectedMonthNet : 0

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Insights"
        title="Predictions"
        description="Lightweight forecasts to help you pressure-test upcoming weeks."
      />

      <div className="card-grid">
        <SurfaceCard>
          <span className="eyebrow">Projected net after recurring</span>
          <h2>{formatCurrency(projectedMonthNet)}</h2>
          <p>Estimated leftover room if the current trend and fixed costs continue.</p>
        </SurfaceCard>

        <SurfaceCard>
          <span className="eyebrow">Goal funding runway</span>
          <h2>{monthsToFundGoals ? `${monthsToFundGoals.toFixed(1)} months` : 'Needs attention'}</h2>
          <p>How long full funding could take at the current pace.</p>
        </SurfaceCard>

        <SurfaceCard>
          <span className="eyebrow">Recurring load</span>
          <h2>{formatCurrency(recurringTotal)}</h2>
          <p>The fixed monthly base your earnings need to clear comfortably.</p>
        </SurfaceCard>
      </div>
    </div>
  )
}
