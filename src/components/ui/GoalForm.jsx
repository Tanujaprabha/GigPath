import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SurfaceCard from './SurfaceCard'

const defaultValues = {
  title: '',
  purpose: '',
  targetAmount: '',
  savedAmount: '',
  deadline: '2026-12-01',
  monthlyContribution: '',
  priority: 'priority.medium',
}

export default function GoalForm({
  title,
  description,
  initialValues = defaultValues,
  submitLabel,
  onSubmit,
}) {
  const { t } = useTranslation()
  const [form, setForm] = useState({ ...defaultValues, ...initialValues })

  const handleChange = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]: target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      ...form,
      targetAmount: Number(form.targetAmount),
      savedAmount: Number(form.savedAmount),
      monthlyContribution: Number(form.monthlyContribution),
    })
  }

  return (
    <SurfaceCard className="form-panel">
      <div className="section-heading">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field field--full">
          <span>{t('goals.goalTitle', 'Goal title')}</span>
          <input
            required
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder={t('goals.titlePlaceholder', 'Emergency cushion')}
          />
        </label>

        <label className="field field--full">
          <span>{t('goals.purpose', 'Purpose')}</span>
          <textarea
            rows="4"
            required
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            placeholder={t('goals.purposePlaceholder', 'What this goal protects or unlocks.')}
          />
        </label>

        <label className="field">
          <span>{t('goals.targetAmount', 'Target amount')}</span>
          <input
            required
            type="number"
            min="0"
            name="targetAmount"
            value={form.targetAmount}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>{t('goals.alreadySaved', 'Already saved')}</span>
          <input
            required
            type="number"
            min="0"
            name="savedAmount"
            value={form.savedAmount}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>{t('goals.deadline', 'Deadline')}</span>
          <input required type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        </label>

        <label className="field">
          <span>{t('goals.monthlyContribution', 'Monthly contribution')}</span>
          <input
            required
            type="number"
            min="0"
            name="monthlyContribution"
            value={form.monthlyContribution}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>{t('goals.priority', 'Priority')}</span>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="priority.high">{t('priority.high', 'High')}</option>
            <option value="priority.medium">{t('priority.medium', 'Medium')}</option>
            <option value="priority.low">{t('priority.low', 'Low')}</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" className="button button--primary">
            {submitLabel}
          </button>
        </div>
      </form>
    </SurfaceCard>
  )
}
