import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function CashFlowPage() {
  const { weeklyTrend, recurringExpenses } = useAppContext()
  const averageNet =
    weeklyTrend.reduce((sum, day) => sum + day.net, 0) / (weeklyTrend.length || 1)
  const nextRecurring = [...recurringExpenses].sort(
    (left, right) => new Date(left.nextCharge) - new Date(right.nextCharge),
  )[0]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Insights"
        title="Cash flow"
        description="Understand how near-term money movement stacks up against your commitments."
      />

      <div className="content-grid">
        <SurfaceCard className="surface-card--accent">
          <span className="eyebrow">Average daily net</span>
          <h2>{formatCurrency(averageNet)}</h2>
          <p>Based on the current rolling 7-day view.</p>
        </SurfaceCard>

        <SurfaceCard>
          <div className="section-heading">
            <h2>Next fixed charge</h2>
            <p>What is coming up first on your recurring calendar.</p>
          </div>
          {nextRecurring ? (
            <div className="detail-grid detail-grid--compact">
              <div>
                <span>Expense</span>
                <strong>{nextRecurring.title}</strong>
              </div>
              <div>
                <span>Due date</span>
                <strong>{formatDate(nextRecurring.nextCharge)}</strong>
              </div>
              <div>
                <span>Amount</span>
                <strong>{formatCurrency(nextRecurring.amount)}</strong>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', padding: '12px 0' }}>No upcoming recurring expenses.</p>
          )}
        </SurfaceCard>
      </div>

      <SurfaceCard>
        <div className="section-heading">
          <h2>Recent daily net</h2>
          <p>Positive days create room. Negative days signal where adjustments may help.</p>
        </div>
        <div className="simple-list">
          {weeklyTrend.map((day) => (
            <div key={day.date} className="simple-list__item">
              <div>
                <strong>{day.label}</strong>
                <span>
                  Income {formatCurrency(day.income)} • Expenses {formatCurrency(day.expense)}
                </span>
              </div>
              <strong className={day.net >= 0 ? 'text-positive' : 'text-negative'}>
                {formatCurrency(day.net)}
              </strong>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  )
}
