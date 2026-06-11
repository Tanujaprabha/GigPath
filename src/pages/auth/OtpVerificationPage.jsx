import { Link } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'

export default function OtpVerificationPage() {
  return (
    <AuthLayout
      title="Reset Link Sent"
      subtitle="Check your email to reset your password. We've sent a secure link to your inbox."
      footer={
        <p>
          Didn't get the email? <Link to="/forgot-password">Try again</Link>
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
