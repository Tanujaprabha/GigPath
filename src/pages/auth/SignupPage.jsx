import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import { useAppContext } from '../../context/AppContext'
import { signup as firebaseSignup, signInWithGoogle, logout as firebaseLogout, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider, auth } from '../../services/authService'
import { createUserProfile } from '../../services/firestoreService'

export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAppContext()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please log in.'
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.'
      default:
        return 'Failed to create account. Please try again.'
    }
  }

  const handleChange = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]: target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const userCredential = await firebaseSignup(form.email, form.password)
      const user = userCredential.user
      
      // Save user data to Firestore
      await createUserProfile(user.uid, {
        name: form.name,
        email: form.email
      })

      // Sign out immediately to prevent auto-login as per requirements
      await firebaseLogout()
      
      navigate('/login', { 
        state: { message: 'Account created successfully. Please log in.' } 
      })
    } catch (err) {
      console.error(err);
      console.error(err.stack);
      alert(err.message);
      setError(`[${err.code || 'NO_CODE'}] ${err.message || 'Signup failed.'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const userCredential = await signInWithGoogle()
      const user = userCredential.user
      
      // For Google users, ensure profile exists
      await createUserProfile(user.uid, {
        name: user.displayName || 'Google User',
        email: user.email
      })

      login({ email: user.email, name: user.displayName, uid: user.uid })
      navigate('/app/dashboard', { replace: true })
    } catch (error) {
      console.error(error);
      console.error(error.stack);
      alert(error.message);
      setError(`[${error.code || 'NO_CODE'}] ${error.message || 'Google Sign-In failed.'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start with a clean dashboard built for income that changes week to week."
      footer={
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      }
    >
      <form className="stack-form" onSubmit={handleSubmit}>
        {error && <div className="alert alert--error" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        
        <label className="field">
          <span>Full name</span>
          <input 
            required 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="Jordan Miles"
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jordan@example.com"
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            required
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
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
            placeholder="Confirm your password"
          />
        </label>

        <button 
          type="submit" 
          className="button button--primary button--block"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <button 
          type="button" 
          className="button button--secondary button--block"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </button>
      </form>
    </AuthLayout>
  )
}
