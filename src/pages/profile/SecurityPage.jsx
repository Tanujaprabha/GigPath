import { useState } from 'react'
import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import ToggleRow from '../../components/ui/ToggleRow'
import { useAppContext } from '../../context/AppContext'
import { formatDate } from '../../utils/formatters'
import { auth } from '../../firebase/firebaseConfig'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'

export default function SecurityPage() {
  const { security, updateSecurity } = useAppContext()
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const toggleSecurity = (key) => {
    updateSecurity({ [key]: !security[key] })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      if (passwordFields.newPassword.length < 6) {
         throw new Error('Weak password. Must be at least 6 characters.')
      }
      const user = auth.currentUser
      if (!user) throw new Error('Not logged in or session expired.')
      
      const credential = EmailAuthProvider.credential(user.email, passwordFields.currentPassword)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, passwordFields.newPassword)

      await updateSecurity({
        lastPasswordChange: new Date().toISOString(),
      })
      setPasswordFields({ currentPassword: '', newPassword: '' })
      setSuccess('Password updated successfully!')
      setTimeout(() => setSuccess(''), 4000)
    } catch (err) {
       console.error(err)
       setError(err.message || 'Failed to update password. Please check your current password and try again.')
    } finally {
       setLoading(false)
    }
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Profile"
        title="Security"
        description="Password controls and account safety settings."
      />

      <div className="content-grid">
        <SurfaceCard>
          <div className="section-heading">
            <h2>Account Details</h2>
            <p style={{ marginTop: '0.5rem' }}><strong>Email:</strong> {security.email}</p>
            <p style={{ marginTop: '0.25rem' }}><strong>Last Login:</strong> {security.lastLoginAt ? formatDate(security.lastLoginAt, { hour: '2-digit', minute: '2-digit' }) : 'Unknown'}</p>
          </div>
          <div className="stack-list" style={{ marginTop: '1.5rem' }}>
            <ToggleRow
              label="Multi-factor authentication"
              description="Add another layer of security before account access is granted."
              checked={security.twoFactorEnabled || false}
              onChange={() => toggleSecurity('twoFactorEnabled')}
            />
            <ToggleRow
              label="Session alerts"
              description="Receive a notification when a new session is detected."
              checked={security.sessionAlertsEnabled || false}
              onChange={() => toggleSecurity('sessionAlertsEnabled')}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="section-heading">
            <h2>Password update</h2>
            <p>Last changed on {security.lastPasswordChange ? formatDate(security.lastPasswordChange) : 'Never'}</p>
          </div>
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
          <form className="stack-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Current password</span>
              <input
                type="password"
                required
                value={passwordFields.currentPassword}
                onChange={(event) =>
                  setPasswordFields((current) => ({
                    ...current,
                    currentPassword: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>New password</span>
              <input
                type="password"
                required
                value={passwordFields.newPassword}
                onChange={(event) =>
                  setPasswordFields((current) => ({
                    ...current,
                    newPassword: event.target.value,
                  }))
                }
              />
            </label>
            <button type="submit" className="button button--primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save security changes'}
            </button>
          </form>
        </SurfaceCard>
      </div>
    </div>
  )
}
