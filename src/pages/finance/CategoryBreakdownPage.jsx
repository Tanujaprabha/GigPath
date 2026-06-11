import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { getCategoryBreakdown } from '../../utils/analytics'
import { formatCurrency, formatPercent } from '../../utils/formatters'

export default function CategoryBreakdownPage() {
  const { transactions } = useAppContext()
  const expenseBreakdown = getCategoryBreakdown(transactions, 'expense')
  const incomeBreakdown = getCategoryBreakdown(transactions, 'income')

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance"
        title="Category breakdown"
        description="See where money is coming from and where it is leaving, separated into useful buckets."
      />

      <div className="content-grid">
        <SurfaceCard>
          <div className="section-heading">
            <h2>Expense categories</h2>
            <p>Which costs are eating into your margin most often.</p>
          </div>
          <div className="bar-list">
            {expenseBreakdown.map((item) => (
              <div key={item.category} className="bar-list__item">
                <div className="bar-list__meta">
                  <strong>{item.category}</strong>
                  <span>
                    {formatCurrency(item.amount)} • {formatPercent(item.share)}
                  </span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${item.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="section-heading">
            <h2>Income categories</h2>
            <p>Understand the mix behind your strongest earnings streams.</p>
          </div>
          <div className="bar-list">
            {incomeBreakdown.map((item) => (
              <div key={item.category} className="bar-list__item">
                <div className="bar-list__meta">
                  <strong>{item.category}</strong>
                  <span>
                    {formatCurrency(item.amount)} • {formatPercent(item.share)}
                  </span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-fill--income"
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}
