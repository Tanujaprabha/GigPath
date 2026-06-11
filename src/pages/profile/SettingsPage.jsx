import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import ToggleRow from '../../components/ui/ToggleRow'
import { useAppContext } from '../../context/AppContext'

export default function SettingsPage() {
  const { settings, updateSettings } = useAppContext()

  const toggleSetting = (key) => {
    updateSettings({ [key]: !settings[key] })
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Profile"
        title="Settings"
        description="Operational dashboard settings for alerts, summaries, and automation."
      />

      <SurfaceCard>
        <div className="stack-list">
          <ToggleRow
            label="Weekly digest"
            description="Receive a weekly financial summary panel in your dashboard rhythm."
            checked={settings.weeklyDigest}
            onChange={() => toggleSetting('weeklyDigest')}
          />
          <ToggleRow
            label="Auto-categorization"
            description="Keep new transactions aligned to the most likely category automatically."
            checked={settings.autoCategorization}
            onChange={() => toggleSetting('autoCategorization')}
          />
          <ToggleRow
            label="Low balance alerts"
            description="Surface warnings when your available margin is tightening."
            checked={settings.lowBalanceAlerts}
            onChange={() => toggleSetting('lowBalanceAlerts')}
          />
          <ToggleRow
            label="Recurring review reminders"
            description="Prompt yourself to review fixed costs on a regular cadence."
            checked={settings.recurringReview}
            onChange={() => toggleSetting('recurringReview')}
          />
        </div>
      </SurfaceCard>
    </div>
  )
}
