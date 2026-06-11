import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function RecurringExpensesPage() {
  const { t } = useTranslation()
  const { recurringExpenses, authLoading, dataLoading } = useAppContext()

  if (authLoading || dataLoading) {
    return (
      <div className="page-stack page-stack--centered" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <div className="loading-state">
          <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid rgba(37, 99, 235, 0.1)', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s infinite linear' }}></div>
          <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: '500' }}>{t('common.loading', 'Loading...')}</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }
  const monthlyCommitment = recurringExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={t('finance.finance', 'Finance')}
        title={t('finance.recurringExpenses', 'Recurring expenses')}
        description={t('finance.recurringDesc', 'Predictable costs deserve their own clean workspace so cash planning stays realistic.')}
        actions={
          <Link className="button button--primary" to="/app/finance/recurring-expenses/new">
            {t('finance.addRecurring', 'Add Recurring')}
          </Link>
        }
      />

      <SurfaceCard className="surface-card--accent">
        <span className="eyebrow">{t('finance.monthlyCommitment', 'Monthly commitment')}</span>
        <h2>{formatCurrency(monthlyCommitment)}</h2>
        <p>{t('finance.monthlyCommitmentDesc', 'This is the predictable cost base you should protect before discretionary spend.')}</p>
      </SurfaceCard>

      <SurfaceCard>
        <div className="section-heading">
          <h2>{t('finance.upcomingCharges', 'Upcoming charges')}</h2>
          <p>{t('finance.upcomingChargesDesc', 'Stay ahead of fixed costs that keep your gig work moving.')}</p>
        </div>

        <div className="simple-list">
          {recurringExpenses.map((expense) => (
            <div key={expense.id} className="simple-list__item">
              <div>
                <strong>{expense.title}</strong>
                <span>
                  {t(expense.category)} • {t(expense.frequency)} • {t('finance.due', 'due')} {formatDate(expense.nextCharge)}
                </span>
              </div>
              <strong>{formatCurrency(expense.amount)}</strong>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  )
}
