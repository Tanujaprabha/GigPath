import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import { useAppContext } from '../../context/AppContext'
import { login as firebaseLogin, signInWithGoogle, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider, auth } from '../../services/authService'
import { createUserProfile } from '../../services/firestoreService'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAppContext()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const successMessage = location.state?.message || ''

  const destination = location.state?.from || '/app/dashboard'

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password.'
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.'
      default:
        return 'Failed to login. Please try again.'
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
    if (!form.email || !form.password) {
      setError('Please enter both email and password.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const userCredential = await firebaseLogin(form.email, form.password)
      const user = userCredential.user
      login({ email: user.email, name: user.displayName, uid: user.uid })
      navigate(destination, { replace: true })
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          const methods = await fetchSignInMethodsForEmail(auth, form.email)
          if (methods.includes('google.com')) {
            setError('This email uses Google Sign-In. Redirecting to verify and link your password...')
            const result = await signInWithGoogle()
            const credential = EmailAuthProvider.credential(form.email, form.password)
            try {
              await linkWithCredential(result.user, credential)
            } catch (linkErr) {
              console.warn('Linking error or already linked', linkErr)
            }
            login({ email: result.user.email, name: result.user.displayName, uid: result.user.uid })
            navigate(destination, { replace: true })
            return
          }
        } catch (e) {
          // ignore fetch error and fallback
        }
      }
      console.error("Login Error:", err);
      console.error("Login Error Code:", err.code);
      console.error("Login Error Message:", err.message);
      setError(`[${err.code || 'NO_CODE'}] ${err.message || 'Login failed.'}`)
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
      
      // Ensure Google user profile exists in Firestore
      await createUserProfile(user.uid, {
        name: user.displayName || 'Google User',
        email: user.email
      })

      login({ email: user.email, name: user.displayName, uid: user.uid })
      navigate('/app/dashboard', { replace: true })
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      console.error("Google Sign-In Error Code:", error.code);
      console.error("Google Sign-In Error Message:", error.message);
      setError(`[${error.code || 'NO_CODE'}] ${error.message || 'Google Sign-In failed.'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your dashboard and pick up exactly where your financial plan left off."
      footer={
        <p>
          New to GigPath? <Link to="/signup">Create an account</Link>
        </p>
      }
    >
      <form className="stack-form" onSubmit={handleSubmit}>
        {successMessage && <div className="alert alert--success" style={{ color: '#2ecc71', backgroundColor: '#eafaf1', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{successMessage}</div>}
        {error && <div className="alert alert--error" style={{ color: '#e74c3c', backgroundColor: '#fdedec', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        
        <label className="field">
          <span>Email</span>
          <input
            id="email"
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            id="password"
            required
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </label>

        <button 
          id="login-button"
          type="submit" 
          className="button button--primary button--block"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        <button 
          type="button" 
          className="button button--secondary button--block"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </button>

        <div className="auth-links" style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </form>
    </AuthLayout>
  )
}
