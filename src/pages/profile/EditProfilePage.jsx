import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Icon from '../../components/ui/Icon'

export default function EditProfilePage() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    fullName: profile.name || profile.fullName || '',
    email: profile.email || '',
    phone: profile.phone || '',
    workType: profile.workType || 'Ride-share and delivery',
    bio: profile.bio || '',
    city: profile.city || '',
    payoutMethod: profile.payoutMethod || '',
    accentTheme: profile.accentTheme || 'Ocean',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await updateProfile(formData)
      setSuccess('Profile updated successfully!')
      setTimeout(() => navigate('/app/profile'), 1500)
    } catch (err) {
      console.error(err);
      setError('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-stack">
      <div className="page-header">
        <div className="page-header__copy">
          <div className="eyebrow">Settings</div>
          <h1>Edit Profile</h1>
          <p>Update your personal information and gig profession.</p>
        </div>
      </div>

      <div className="surface-card form-panel">
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
          <div className="profile-upload">
            <div className="profile-upload__avatar">
              <Icon name="profile" size={32} />
            </div>
            <div className="profile-upload__info">
              <strong>Profile Image</strong>
              <p>JPG, GIF or PNG. Max size of 2MB.</p>
              <button type="button" className="button button--secondary button--sm">
                Change Image
              </button>
            </div>
          </div>

          <div className="form-grid">
            <label className="field">
              <span>Full Name</span>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </label>

            <label className="field">
              <span>Email Address (Auto-filled)</span>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="input--readonly"
                style={{ backgroundColor: '#f8fafc', cursor: 'not-allowed' }}
              />
            </label>

            <label className="field">
              <span>Phone Number</span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 000-0000"
              />
            </label>

            <label className="field">
              <span>Gig Profession</span>
              <select
                value={formData.workType}
                onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
              >
                <option value="Ride-share and delivery">Ride-share and delivery</option>
                <option value="Freelance Creative">Freelance Creative</option>
                <option value="Technical Contractor">Technical Contractor</option>
                <option value="Event Staff">Event Staff</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="field">
              <span>City / Location</span>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City, Country"
              />
            </label>

            <label className="field">
              <span>Payout Method</span>
              <input
                type="text"
                value={formData.payoutMethod}
                onChange={(e) => setFormData({ ...formData, payoutMethod: e.target.value })}
                placeholder="Bank Account, PayPal, etc."
              />
            </label>

            <label className="field">
              <span>Accent Theme</span>
              <select
                value={formData.accentTheme}
                onChange={(e) => setFormData({ ...formData, accentTheme: e.target.value })}
              >
                <option value="Ocean">Ocean</option>
                <option value="Forest">Forest</option>
                <option value="Sunset">Sunset</option>
                <option value="Midnight">Midnight</option>
                <option value="Ruby">Ruby</option>
              </select>
            </label>

            <label className="field field--full">
              <span>Short Bio</span>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us a bit about your gig journey..."
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="button button--primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => navigate('/app/profile')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .profile-upload {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }

        .profile-upload__avatar {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          background: var(--bg-strong);
          display: grid;
          place-items: center;
          color: var(--accent-blue);
        }

        .profile-upload__info strong {
          display: block;
          margin-bottom: 4px;
        }

        .profile-upload__info p {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .button--sm {
          min-height: 36px;
          padding: 0 14px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  )
}
