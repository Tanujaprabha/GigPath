import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { formatCurrency } from '../../utils/formatters'

export default function WeeklyReportPage() {
  const { weeklyTrend } = useAppContext()
  const maxValue = Math.max(
    ...weeklyTrend.flatMap((day) => [day.income, day.expense, Math.abs(day.net)]),
    1,
  )
  const incomeTotal = weeklyTrend.reduce((sum, day) => sum + day.income, 0)
  const expenseTotal = weeklyTrend.reduce((sum, day) => sum + day.expense, 0)

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Insights"
        title="Weekly report"
        description="A compact 7-day view of inflow, outflow, and net momentum."
      />

      <div className="content-grid">
        <SurfaceCard>
          <div className="section-heading">
            <h2>7-day totals</h2>
            <p>Income and spending that shaped the current week.</p>
          </div>
          <div className="detail-grid detail-grid--compact">
            <div>
              <span>Income</span>
              <strong className="text-positive">{formatCurrency(incomeTotal)}</strong>
            </div>
            <div>
              <span>Expenses</span>
              <strong className="text-negative">{formatCurrency(expenseTotal)}</strong>
            </div>
            <div>
              <span>Net</span>
              <strong>{formatCurrency(incomeTotal - expenseTotal)}</strong>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="section-heading">
            <h2>Daily trend</h2>
            <p>Compare what came in versus what went out each day.</p>
          </div>
          <div className="mini-chart">
            {weeklyTrend.map((day) => (
              <div key={day.date} className="mini-chart__column">
                <div className="mini-chart__bars">
                  <span
                    className="mini-chart__bar mini-chart__bar--income"
                    style={{ height: `${(day.income / maxValue) * 100}%` }}
                  />
                  <span
                    className="mini-chart__bar mini-chart__bar--expense"
                    style={{ height: `${(day.expense / maxValue) * 100}%` }}
                  />
                </div>
                <strong>{day.label}</strong>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}
