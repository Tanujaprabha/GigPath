import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { sortTransactions } from '../../utils/analytics'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function TransactionListPage() {
  const { t } = useTranslation()
  const { transactions, totals, authLoading, dataLoading } = useAppContext()
  const [filter, setFilter] = useState('all')

  if (authLoading || dataLoading) {
    return (
      <div className="page-stack page-stack--centered" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <div className="loading-state">
          <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid rgba(37, 99, 235, 0.1)', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s infinite linear' }}></div>
          <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: '500' }}>{t('finance.loadingTransactions', 'Loading transactions...')}</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  const filteredTransactions = sortTransactions(transactions).filter((transaction) =>
    filter === 'all' ? true : transaction.type === filter,
  )

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={t('finance.finance', 'Finance')}
        title={t('finance.transactionList', 'Transaction list')}
        description={t('finance.transactionListDesc', 'Every income and expense entry lives here, with clean detail and edit flows.')}
        actions={
          <Link className="button button--primary" to="/app/finance/transactions/new">
            {t('dashboard.addTransaction', 'Add Transaction')}
          </Link>
        }
      />

      <div className="stat-grid">
        <StatCard
          icon="money"
          label={t('dashboard.earnings', 'Total earnings')}
          value={formatCurrency(totals.earningsTotal)}
          description={t('finance.earningsDesc', 'Income captured across all current entries.')}
          tone="positive"
        />
        <StatCard
          icon="expense"
          label={t('dashboard.expenses', 'Total expenses')}
          value={formatCurrency(totals.expensesTotal)}
          description={t('finance.expensesDesc', 'Business and personal operating outflow.')}
          tone="negative"
        />
        <StatCard
          icon="savings"
          label={t('finance.netSavings', 'Net savings')}
          value={formatCurrency(totals.savingsTotal)}
          description={t('finance.savingsDesc', 'What remains after spending.')}
          tone="neutral"
        />
      </div>

      <SurfaceCard>
        <div className="section-heading section-heading--row">
          <div>
            <h2>{t('finance.allTransactions', 'All transactions')}</h2>
            <p>{t('finance.allTransactionsDesc', 'Switch between all activity, income only, or expenses only.')}</p>
          </div>
          <div className="chip-group">
            {['all', 'income', 'expense'].map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${filter === item ? 'is-active' : ''}`}
                onClick={() => setFilter(item)}
              >
                {t(`finance.filter_${item}`, item === 'all' ? 'All' : item[0].toUpperCase() + item.slice(1))}
              </button>
            ))}
          </div>
        </div>

        <div className="table-shell desktop-only">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('finance.transaction', 'Transaction')}</th>
                <th>{t('finance.category', 'Category')}</th>
                <th>{t('finance.date', 'Date')}</th>
                <th>{t('finance.status', 'Status')}</th>
                <th>{t('finance.amount', 'Amount')}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="table-cell-title">
                    <strong>{transaction.title}</strong>
                    <span>{t(transaction.method)}</span>
                  </td>
                  <td>{t(transaction.category)}</td>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{t(transaction.status)}</td>
                  <td className={transaction.type === 'income' ? 'text-positive' : 'text-negative'}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="table-actions">
                    <Link to={`/app/finance/transactions/${transaction.id}`}>{t('finance.detail', 'Detail')}</Link>
                    <Link to={`/app/finance/transactions/${transaction.id}/edit`}>{t('common.edit', 'Edit')}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mobile-only mobile-transaction-list">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="mobile-transaction-card">
              <div className="mobile-transaction-header">
                <div className="mobile-transaction-title">
                  <strong>{transaction.title}</strong>
                  <span>{t(transaction.category)} • {formatDate(transaction.date)}</span>
                </div>
                <div className={`mobile-transaction-amount ${transaction.type === 'income' ? 'text-positive' : 'text-negative'}`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
              <div className="mobile-transaction-footer">
                <span className="mobile-transaction-status">{t(transaction.status)}</span>
                <div className="mobile-transaction-actions">
                  <Link className="button button--ghost" style={{ minHeight: '32px', height: '32px', fontSize: '0.8rem', padding: '0 12px' }} to={`/app/finance/transactions/${transaction.id}`}>{t('finance.detail', 'Detail')}</Link>
                  <Link className="button button--ghost" style={{ minHeight: '32px', height: '32px', fontSize: '0.8rem', padding: '0 12px' }} to={`/app/finance/transactions/${transaction.id}/edit`}>{t('common.edit', 'Edit')}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  )
}
