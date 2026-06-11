import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'

export default function AddRecurringExpensePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { addRecurringExpense } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    category: 'categories.subscriptions',
    amount: '',
    nextCharge: '2026-05-20',
    frequency: 'frequency.monthly',
  })

  const handleChange = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]: target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await addRecurringExpense({
        ...form,
        amount: Number(form.amount),
      })
      navigate('/app/finance/recurring-expenses')
    } catch (err) {
      setError(err.message || 'Failed to save recurring expense. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={t('finance.finance', 'Finance')}
        title={t('finance.addRecurring', 'Add recurring expense')}
        description={t('finance.addRecurringDesc', 'Create a predictable expense entry and return to your recurring list.')}
        actions={
          <Link className="button button--ghost" to="/app/finance/recurring-expenses">
            {t('finance.backToRecurring', 'Back to recurring')}
          </Link>
        }
      />

      {error && (
        <div className="alert alert--error" style={{ color: '#e74c3c', backgroundColor: '#fdedec', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <SurfaceCard className="form-panel">
        <div className="section-heading">
          <h2>{t('finance.newRecurring', 'New recurring expense')}</h2>
          <p>{t('finance.newRecurringDesc', 'Track fixed costs so daily decisions stay anchored in reality.')}</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>{t('finance.title', 'Title')}</span>
            <input required name="title" value={form.title} onChange={handleChange} />
          </label>

          <label className="field">
            <span>{t('finance.category', 'Category')}</span>
            <select name="category" value={form.category} onChange={handleChange}>
              {['categories.fuel', 'categories.food', 'categories.maintenance', 'categories.subscriptions', 'categories.phone', 'categories.workspace', 'categories.taxes', 'categories.supplies', 'categories.insurance', 'categories.admin'].map(c => (
                <option key={c} value={c}>{t(c)}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>{t('finance.amount', 'Amount')}</span>
            <input
              required
              min="0"
              step="0.01"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>{t('finance.nextCharge', 'Next charge')}</span>
            <input
              required
              type="date"
              name="nextCharge"
              value={form.nextCharge}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>{t('finance.frequency', 'Frequency')}</span>
            <select name="frequency" value={form.frequency} onChange={handleChange}>
              <option value="frequency.monthly">{t('frequency.monthly', 'Monthly')}</option>
              <option value="frequency.quarterly">{t('frequency.quarterly', 'Quarterly')}</option>
              <option value="frequency.yearly">{t('frequency.yearly', 'Yearly')}</option>
            </select>
          </label>

          <div className="form-actions">
            <button type="submit" className="button button--primary" disabled={loading}>
              {loading ? t('common.saving', 'Saving...') : t('finance.saveRecurring', 'Save recurring expense')}
            </button>
          </div>
        </form>
      </SurfaceCard>
    </div>
  )
}
