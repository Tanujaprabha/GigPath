import { Link } from 'react-router-dom'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'

export default function NotFoundPage() {
  const { isAuthenticated } = useAppContext()
  const fallbackRoute = isAuthenticated ? '/app/dashboard' : '/login'
  const fallbackLabel = isAuthenticated ? 'Go to dashboard' : 'Go to login'

  return (
    <div className="not-found-shell">
      <SurfaceCard className="surface-card--accent">
        <div className="empty-state">
          <h1>Page not found</h1>
          <p>The route exists in this app space, but there is no screen mapped to it.</p>
          <Link className="button button--primary" to={fallbackRoute}>
            {fallbackLabel}
          </Link>
        </div>
      </SurfaceCard>
    </div>
  )
}
