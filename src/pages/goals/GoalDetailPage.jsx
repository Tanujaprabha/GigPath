import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/ui/PageHeader'
import ProgressBar from '../../components/ui/ProgressBar'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { getDaysUntil, getGoalProgress } from '../../utils/analytics'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function GoalDetailPage() {
  const { t } = useTranslation()
  const { goalId } = useParams()
  const { goals } = useAppContext()
  const goal = goals.find((entry) => entry.id === goalId)

  if (!goal) {
    return (
      <SurfaceCard>
        <div className="empty-state">
          <h2>Goal not found</h2>
          <p>The goal route is valid, but there is no matching goal in this session.</p>
          <Link className="button button--primary" to="/app/goals">
            Back to goals
          </Link>
        </div>
      </SurfaceCard>
    )
  }

  const progress = getGoalProgress(goal)
  const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0)

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={t('sidebar.goals')}
        title={goal.title}
        description={goal.purpose}
        actions={
          <div className="button-row">
            <Link className="button button--ghost" to="/app/goals">
              {t('common.back')}
            </Link>
            <Link className="button button--ghost" to={`/app/goals/${goal.id}/edit`}>
              {t('dashboard.editGoal')}
            </Link>
            <Link className="button button--primary" to={`/app/goals/${goal.id}/progress`}>
              {t('sidebar.goals_goal_progress')}
            </Link>
          </div>
        }
      />

      <div className="content-grid">
        <SurfaceCard className="surface-card--accent">
          <span className="eyebrow">Current progress</span>
          <h2>{Math.round(progress)}%</h2>
          <p>
            {formatCurrency(goal.savedAmount)} saved of {formatCurrency(goal.targetAmount)}.
          </p>
          <ProgressBar
            value={progress}
            label={`${formatCurrency(remaining)} remaining`}
            helper={`Deadline in ${getDaysUntil(goal.deadline)} days`}
          />
        </SurfaceCard>

        <SurfaceCard>
          <div className="section-heading">
            <h2>Goal details</h2>
            <p>The guardrails that keep this target actionable.</p>
          </div>
          <div className="detail-grid">
            <div>
              <span>Deadline</span>
              <strong>{formatDate(goal.deadline)}</strong>
            </div>
            <div>
              <span>Monthly contribution</span>
              <strong>{formatCurrency(goal.monthlyContribution)}</strong>
            </div>
            <div>
              <span>Priority</span>
              <strong>{t(goal.priority)}</strong>
            </div>
            <div>
              <span>Remaining</span>
              <strong>{formatCurrency(remaining)}</strong>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}
