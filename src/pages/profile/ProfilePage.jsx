import { Link } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'

export default function ProfilePage() {
  const { profile, preferences, security, profileLoading } = useAppContext()

  if (profileLoading) {
    return (
      <div className="page-stack">
        <PageHeader eyebrow="Profile" title="Loading..." description="Fetching your profile data..." />
        <SurfaceCard>
          <div className="empty-state">
            <p>Please wait while we sync your data.</p>
          </div>
        </SurfaceCard>
      </div>
    )
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Profile"
        title={profile.name || profile.fullName}
        description="Your account identity, work mix, and financial workflow preferences."
        actions={
          <Link className="button button--primary" to="/app/profile/edit">
            Edit Profile
          </Link>
        }
      />

      <div className="surface-card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <strong>Profile Completion</strong>
          <span>{profile.profileCompletion}%</span>
        </div>
        <div style={{ width: '100%', backgroundColor: 'var(--bg-strong)', borderRadius: '4px', height: '8px' }}>
          <div style={{ width: `${profile.profileCompletion}%`, backgroundColor: 'var(--accent-blue)', height: '100%', borderRadius: '4px' }}></div>
        </div>
      </div>

      <div className="content-grid">
        <SurfaceCard>
          <div className="detail-grid">
            <div>
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>{profile.phone}</strong>
            </div>
            <div>
              <span>City</span>
              <strong>{profile.city}</strong>
            </div>
            <div>
              <span>Work type</span>
              <strong>{profile.workType}</strong>
            </div>
            <div>
              <span>Payout method</span>
              <strong>{profile.payoutMethod}</strong>
            </div>
            <div>
              <span>Accent theme</span>
              <strong>{profile.accentTheme || preferences.accentTheme}</strong>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="section-heading">
            <h2>Security snapshot</h2>
            <p>{profile.bio}</p>
          </div>
          <div className="detail-grid detail-grid--compact">
            <div>
              <span>MFA</span>
              <strong>{security.twoFactorEnabled ? 'Enabled' : 'Disabled'}</strong>
            </div>
            <div>
              <span>Session alerts</span>
              <strong>{security.sessionAlertsEnabled ? 'Enabled' : 'Disabled'}</strong>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}
