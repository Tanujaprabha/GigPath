import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function TransactionDetailPage() {
  const { t } = useTranslation()
  const { transactionId } = useParams()
  const { transactions } = useAppContext()
  const transaction = transactions.find((entry) => entry.id === transactionId)

  if (!transaction) {
    return (
      <SurfaceCard>
        <div className="empty-state">
          <h2>Transaction not found</h2>
          <p>The item may have been removed from this demo session.</p>
          <Link className="button button--primary" to="/app/finance/transactions">
            Back to transactions
          </Link>
        </div>
      </SurfaceCard>
    )
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance"
        title={transaction.title}
        description="Detailed transaction context for clean review and edits."
        actions={
          <div className="button-row">
            <Link className="button button--ghost" to="/app/finance/transactions">
              Back
            </Link>
            <Link
              className="button button--primary"
              to={`/app/finance/transactions/${transaction.id}/edit`}
            >
              Edit transaction
            </Link>
          </div>
        }
      />

      <div className="content-grid">
        <SurfaceCard className="surface-card--accent">
          <span className="eyebrow">{transaction.type === 'income' ? 'Income' : 'Expense'}</span>
          <h2>{formatCurrency(transaction.amount)}</h2>
          <p>{transaction.note}</p>
        </SurfaceCard>

        <SurfaceCard>
          <div className="section-heading">
            <h2>Transaction details</h2>
            <p>Everything recorded for this entry.</p>
          </div>
          <div className="detail-grid">
            <div>
              <span>Category</span>
              <strong>{t(transaction.category)}</strong>
            </div>
            <div>
              <span>Date</span>
              <strong>{formatDate(transaction.date)}</strong>
            </div>
            <div>
              <span>Method</span>
              <strong>{t(transaction.method)}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{t(transaction.status)}</strong>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}
