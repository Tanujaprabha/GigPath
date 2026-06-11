import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { formatCurrency } from '../../utils/formatters'

export default function MonthlyReportPage() {
  const { monthlyReport } = useAppContext()

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance"
        title="Monthly report"
        description="A clean month-over-month view of income, expenses, and net performance."
      />

      <SurfaceCard>
        <div className="section-heading">
          <h2>Monthly performance</h2>
          <p>Simple trend reporting without overcomplicating the essentials.</p>
        </div>

        <div className="table-shell desktop-only">
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.map((month) => (
                <tr key={month.month}>
                  <td>{month.label}</td>
                  <td className="text-positive">{formatCurrency(month.income)}</td>
                  <td className="text-negative">{formatCurrency(month.expense)}</td>
                  <td>{formatCurrency(month.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mobile-only mobile-transaction-list">
          {monthlyReport.map((month) => (
            <div key={month.month} className="mobile-transaction-card">
              <div className="mobile-transaction-header">
                <div className="mobile-transaction-title">
                  <strong>{month.label}</strong>
                  <span>Monthly Summary</span>
                </div>
                <div className={`mobile-transaction-amount ${month.net >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {formatCurrency(month.net)}
                </div>
              </div>
              <div className="mobile-transaction-footer">
                <span className="text-positive">In: {formatCurrency(month.income)}</span>
                <span className="text-negative">Out: {formatCurrency(month.expense)}</span>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  )
}
