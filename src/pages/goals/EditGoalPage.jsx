import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GoalForm from '../../components/ui/GoalForm'
import PageHeader from '../../components/ui/PageHeader'
import { useAppContext } from '../../context/AppContext'

export default function EditGoalPage() {
  const { t } = useTranslation()
  const { goalId } = useParams()
  const navigate = useNavigate()
  const { goals, updateGoal, dataLoading } = useAppContext()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const goal = goals.find((g) => g.id === goalId)

  const handleSubmit = async (payload) => {
    setLoading(true)
    setError('')
    try {
      await updateGoal(goalId, payload)
      navigate(`/app/goals/${goalId}`)
    } catch (err) {
      setError(err.message || 'Failed to update goal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (dataLoading && !goal) {
    return (
      <div className="page-stack">
        <PageHeader eyebrow={t('sidebar.goals')} title={t('dashboard.editGoal')} description={t('common.loading')} />
        <div className="empty-state">
          <p>{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (!goal && !dataLoading && !error) {
    return (
      <div className="page-stack">
        <PageHeader eyebrow={t('sidebar.goals')} title={t('dashboard.editGoal')} description="Goal not found." />
        <div className="empty-state">
          <p>The goal you are trying to edit does not exist.</p>
          <Link className="button button--primary" to="/app/goals">
            {t('common.back')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={t('sidebar.goals')}
        title={`${t('dashboard.editGoal')}: ${goal?.title || ''}`}
        description="Update your savings target and track your progress more accurately."
        actions={
          <Link className="button button--ghost" to={`/app/goals/${goalId}`}>
            {t('common.cancel')}
          </Link>
        }
      />

      {error && (
        <div className="alert alert--error" style={{ color: '#e74c3c', backgroundColor: '#fdedec', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {goal && (
        <GoalForm
          title="Update details"
          description="Refine your target, deadline, or contribution amount."
          initialValues={{
            title: goal.title,
            purpose: goal.purpose,
            targetAmount: goal.targetAmount,
            savedAmount: goal.savedAmount,
            deadline: goal.deadline,
            monthlyContribution: goal.monthlyContribution,
            priority: goal.priority,
          }}
          submitLabel={loading ? t('common.save') : t('common.save')}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
