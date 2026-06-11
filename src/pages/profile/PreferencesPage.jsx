import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'

export default function PreferencesPage() {
  const { t } = useTranslation()
  const { preferences, updatePreferences } = useAppContext()
  const [form, setForm] = useState(preferences)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(preferences)
  }, [preferences])

  const handleChange = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]:
        target.type === 'checkbox' ? target.checked : target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await updatePreferences(form)
      setSuccess('Preferences updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error(err)
      setError('Failed to update preferences. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={t('sidebar.profile')}
        title={t('sidebar.profile_preferences')}
        description="Tune how the dashboard feels and what it emphasizes for you."
      />

      <SurfaceCard className="form-panel">
        {error && (
          <div className="alert alert--error" style={{ color: '#e74c3c', backgroundColor: '#fdedec', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert--success" style={{ color: '#27ae60', backgroundColor: '#ebf9f1', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {success}
          </div>
        )}

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>Language</span>
            <select name="language" value={form.language || 'en'} onChange={handleChange}>
              <option value="en">English</option>
              <option value="ta">Tamil (தமிழ்)</option>
              <option value="hi">Hindi (हिन्दी)</option>
            </select>
          </label>

          <label className="field">
            <span>Currency</span>
            <select name="currency" value={form.currency || 'INR'} onChange={handleChange}>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </label>

          <label className="field">
            <span>Weekly summary day</span>
            <select name="summaryDay" value={form.summaryDay} onChange={handleChange}>
              <option value="Monday">Monday</option>
              <option value="Friday">Friday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>

          <label className="field">
            <span>App Theme</span>
            <select name="theme" value={form.theme || 'Light'} onChange={handleChange}>
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </label>

          <label className="field">
            <span>Default Expense Category</span>
            <select name="defaultExpenseCategory" value={form.defaultExpenseCategory || 'General'} onChange={handleChange}>
              <option value="General">General</option>
              <option value="Food">Food</option>
              <option value="Fuel">Fuel</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
            </select>
          </label>

          <label className="field">
            <span>Dashboard density</span>
            <select
              name="dashboardDensity"
              value={form.dashboardDensity}
              onChange={handleChange}
            >
              <option value="Comfortable">Comfortable</option>
              <option value="Compact">Compact</option>
            </select>
          </label>

          <label className="checkbox-row field--full">
            <input
              type="checkbox"
              name="notificationEnabled"
              checked={form.notificationEnabled || false}
              onChange={handleChange}
            />
            <span>Enable Push Notifications</span>
          </label>

          <label className="checkbox-row field--full">
            <input
              type="checkbox"
              name="voiceAssistantEnabled"
              checked={form.voiceAssistantEnabled || false}
              onChange={handleChange}
            />
            <span>Enable Voice Assistant Features</span>
          </label>

          <label className="checkbox-row field--full">
            <input
              type="checkbox"
              name="compactTables"
              checked={form.compactTables}
              onChange={handleChange}
            />
            <span>Use compact tables for denser transaction views.</span>
          </label>

          <div className="form-actions">
            <button type="submit" className="button button--primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save preferences'}
            </button>
          </div>
        </form>
      </SurfaceCard>
    </div>
  )
}
