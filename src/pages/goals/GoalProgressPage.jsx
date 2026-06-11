import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/ui/PageHeader'
import ProgressBar from '../../components/ui/ProgressBar'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { getDaysUntil, getGoalProgress } from '../../utils/analytics'
import { formatCurrency } from '../../utils/formatters'

export default function GoalProgressPage() {
  const { t } = useTranslation()
  const { goalId } = useParams()
  const { goals } = useAppContext()
  const goal = goals.find((entry) => entry.id === goalId)

  if (!goal) {
    return (
      <SurfaceCard>
        <div className="empty-state">
          <h2>Goal not found</h2>
          <p>There is no progress view available for this goal id.</p>
          <Link className="button button--primary" to="/app/goals">
            Back to goals
          </Link>
        </div>
      </SurfaceCard>
    )
  }

  const progress = getGoalProgress(goal)
  const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0)
  const monthsToGo = Math.max(Math.ceil(getDaysUntil(goal.deadline) / 30), 1)
  const recommendedMonthly = remaining / monthsToGo

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={t('sidebar.goals')}
        title={`${goal.title} ${t('sidebar.goals_goal_progress').toLowerCase()}`}
        description="A clearer pace check for reaching this milestone on time."
        actions={
          <div className="button-row">
            <Link className="button button--ghost" to={`/app/goals/${goal.id}`}>
              {t('common.back')}
            </Link>
            <Link className="button button--primary" to={`/app/goals/${goal.id}/edit`}>
              {t('dashboard.editGoal')}
            </Link>
          </div>
        }
      />

      <SurfaceCard>
        <div className="section-heading">
          <h2>Progress breakdown</h2>
          <p>Use this to judge whether your current contribution pace is enough.</p>
        </div>

        <div className="stack-list">
          <ProgressBar
            value={progress}
            label={`${Math.round(progress)}% complete`}
            helper={`${formatCurrency(goal.savedAmount)} already saved`}
            color="linear-gradient(90deg, var(--accent-blue), var(--accent-green))"
          />
          <ProgressBar
            value={Math.min((goal.monthlyContribution / recommendedMonthly) * 100, 100)}
            label="Monthly pace"
            helper={`${formatCurrency(goal.monthlyContribution)} planned vs ${formatCurrency(recommendedMonthly)} recommended`}
          />
        </div>
      </SurfaceCard>

      <div className="content-grid">
        <SurfaceCard>
          <div className="detail-grid detail-grid--compact">
            <div>
              <span>Remaining</span>
              <strong>{formatCurrency(remaining)}</strong>
            </div>
            <div>
              <span>Months left</span>
              <strong>{monthsToGo}</strong>
            </div>
            <div>
              <span>Recommended pace</span>
              <strong>{formatCurrency(recommendedMonthly)}</strong>
            </div>
            <div>
              <span>Current pace</span>
              <strong>{formatCurrency(goal.monthlyContribution)}</strong>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="section-heading">
            <h2>Momentum check</h2>
            <p>
              {goal.monthlyContribution >= recommendedMonthly
                ? 'You are on track at the current contribution rate.'
                : 'A modest increase in monthly contributions would keep this deadline comfortable.'}
            </p>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}
