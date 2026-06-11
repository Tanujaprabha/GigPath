import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TransactionForm from '../../components/ui/TransactionForm'
import PageHeader from '../../components/ui/PageHeader'
import { useAppContext } from '../../context/AppContext'

export default function AddTransactionPage() {
  const navigate = useNavigate()
  const { addTransaction } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (payload) => {
    console.log("AddTransactionPage: Submitting payload:", payload)
    setLoading(true)
    setError('')
    try {
      await addTransaction(payload)
      console.log("AddTransactionPage: Transaction saved successfully")
      navigate('/app/finance/transactions')
    } catch (err) {
      console.error("AddTransactionPage: Error saving transaction:", err)
      setError(err.message || 'Failed to save transaction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance"
        title="Add transaction"
        description="Capture a new income or expense item, then return right back to the list."
        actions={
          <Link className="button button--ghost" to="/app/finance/transactions">
            Back to list
          </Link>
        }
      />

      {error && (
        <div className="alert alert--error" style={{ color: '#e74c3c', backgroundColor: '#fdedec', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <TransactionForm
        title="New transaction"
        description="Use clear categories so your breakdowns and reports stay sharp."
        submitLabel={loading ? 'Saving...' : 'Save transaction'}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
