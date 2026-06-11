import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GoalForm from '../../components/ui/GoalForm'
import PageHeader from '../../components/ui/PageHeader'
import { useAppContext } from '../../context/AppContext'

export default function AddGoalPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const reason = query.get('reason')
  
  const { addGoal } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (payload) => {
    setLoading(true)
    setError('')
    try {
      await addGoal(payload)
      navigate('/app/goals')
    } catch (err) {
      setError(err.message || 'Failed to save goal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={t('sidebar.goals')}
        title={t('dashboard.addGoal')}
        description="Create a new savings target and return to your goals list after saving."
        actions={
          <Link className="button button--ghost" to="/app/goals">
            {t('common.back')}
          </Link>
        }
      />

      {reason === 'no-goals' && (
        <div className="alert alert--info" style={{ color: '#2563eb', backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid #2563eb' }}>
          <strong>Create a goal first</strong> to view details and progress.
        </div>
      )}

      {error && (
        <div className="alert alert--error" style={{ color: '#e74c3c', backgroundColor: '#fdedec', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <GoalForm
        title={t('dashboard.addGoal')}
        description="Attach meaning and a clear target so progress actually feels motivating."
        submitLabel={loading ? t('common.save') : t('dashboard.addGoal')}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
