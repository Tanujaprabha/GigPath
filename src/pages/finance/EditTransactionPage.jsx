import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import TransactionForm from '../../components/ui/TransactionForm'
import { useAppContext } from '../../context/AppContext'

export default function EditTransactionPage() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const { transactions, updateTransaction } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const transaction = transactions.find((entry) => entry.id === transactionId)

  if (!transaction) {
    return (
      <SurfaceCard>
        <div className="empty-state">
          <h2>Transaction not found</h2>
          <p>There is nothing to edit for this route.</p>
          <Link className="button button--primary" to="/app/finance/transactions">
            Back to transactions
          </Link>
        </div>
      </SurfaceCard>
    )
  }

  const handleSubmit = async (payload) => {
    setLoading(true)
    setError('')
    try {
      await updateTransaction(transactionId, payload)
      navigate(`/app/finance/transactions/${transactionId}`)
    } catch (err) {
      setError(err.message || 'Failed to update transaction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance"
        title="Edit transaction"
        description="Update the entry, then return to the detail view."
        actions={
          <Link
            className="button button--ghost"
            to={`/app/finance/transactions/${transactionId}`}
          >
            Back to detail
          </Link>
        }
      />

      {error && (
        <div className="alert alert--error" style={{ color: '#e74c3c', backgroundColor: '#fdedec', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <TransactionForm
        title="Update transaction"
        description="Adjust the amount, type, or context without losing the audit trail feel."
        initialValues={transaction}
        submitLabel={loading ? 'Saving...' : 'Save changes'}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
