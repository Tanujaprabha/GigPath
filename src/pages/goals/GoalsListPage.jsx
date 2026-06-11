import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/ui/PageHeader'
import ProgressBar from '../../components/ui/ProgressBar'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { getGoalProgress } from '../../utils/analytics'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function GoalsListPage() {
  const { t } = useTranslation()
  const { goals, authLoading, dataLoading } = useAppContext()

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

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={t('sidebar.goals')}
        title={t('sidebar.goals_goals_list')}
        description={t('goals.goalsListDesc', 'Every savings target in one place, from emergency reserves to larger equipment upgrades.')}
        actions={
          <Link className="button button--primary" to="/app/goals/new">
            {t('dashboard.addGoal')}
          </Link>
        }
      />

      <div className="card-grid">
        {goals.map((goal) => (
          <SurfaceCard key={goal.id}>
            <div className="section-heading">
              <h2>{goal.title}</h2>
              <p>{goal.purpose}</p>
            </div>

            <div className="detail-grid detail-grid--compact">
              <div>
                <span>{t('goals.saved', 'Saved')}</span>
                <strong>{formatCurrency(goal.savedAmount)}</strong>
              </div>
              <div>
                <span>{t('goals.target', 'Target')}</span>
                <strong>{formatCurrency(goal.targetAmount)}</strong>
              </div>
              <div>
                <span>{t('goals.deadline', 'Deadline')}</span>
                <strong>{formatDate(goal.deadline)}</strong>
              </div>
              <div>
                <span>{t('goals.priority', 'Priority')}</span>
                <strong>{t(goal.priority)}</strong>
              </div>
            </div>

            <ProgressBar
              value={getGoalProgress(goal)}
              label={`${Math.round(getGoalProgress(goal))}% ${t('goals.complete', 'complete')}`}
              helper={`${formatCurrency(goal.monthlyContribution)} / ${t('goals.month', 'month')}`}
              color="linear-gradient(90deg, var(--accent-blue), var(--accent-green))"
            />

            <div className="button-row">
              <Link className="button button--secondary" to={`/app/goals/${goal.id}`}>
                {t('sidebar.goals_goal_details')}
              </Link>
              <Link className="button button--ghost" to={`/app/goals/${goal.id}/progress`}>
                {t('sidebar.goals_goal_progress')}
              </Link>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  )
}
