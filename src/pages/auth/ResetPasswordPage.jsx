import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  })

  const handleChange = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]: target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/login')
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Set a fresh password, then head back to login."
      footer={
        <p>
          Return to <Link to="/login">login</Link>
        </p>
      }
    >
      <form className="stack-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>New password</span>
          <input
            required
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a strong password"
          />
        </label>

        <label className="field">
          <span>Confirm password</span>
          <input
            required
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
          />
        </label>

        <button type="submit" className="button button--primary button--block">
          Reset password
        </button>
      </form>
    </AuthLayout>
  )
}
