import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import { resetPassword } from '../../services/authService'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email) {
      setError('Please enter your email address.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await resetPassword(email)
      setIsSent(true)
    } catch (err) {
      setError(err.message || 'Failed to send reset email.')
    } finally {
      setLoading(false)
    }
  }

  if (isSent) {
    return (
      <AuthLayout
        title="Reset Link Sent"
        subtitle="Check your email to reset your password. We've sent a secure link to your inbox."
        footer={
          <p>
            Didn't get the email? <button onClick={() => setIsSent(false)} className="link-button" style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', cursor: 'pointer', padding: 0, font: 'inherit' }}>Try again</button>
          </p>
        }
      >
        <div className="stack-form">
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
            Reset link has been sent to your email. Please follow the instructions in the email to set a new password.
          </p>
          <Link to="/login" className="button button--primary button--block" style={{ textAlign: 'center', textDecoration: 'none' }}>
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email address and we'll send you a link to reset your password."
      footer={
        <p>
          Remembered it? <Link to="/login">Back to login</Link>
        </p>
      }
    >
      <form className="stack-form" onSubmit={handleSubmit}>
        {error && <div className="alert alert--error" style={{ color: '#e74c3c', backgroundColor: '#fdedec', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        
        <label className="field">
          <span>Email</span>
          <input 
            required 
            type="email" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
            placeholder="jordan@example.com"
          />
        </label>

        <button 
          type="submit" 
          className="button button--primary button--block"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </button>
      </form>
    </AuthLayout>
  )
}
