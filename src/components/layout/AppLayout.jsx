import { useState, useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useAppContext } from '../../context/AppContext'
import Icon from '../ui/Icon'

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024)
  const location = useLocation()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  const { notifications } = useAppContext()
  const unreadCount = notifications?.filter((n) => !n.read).length || 0

  // Auto-close sidebar on mobile when route changes, keep open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false)
    }
  }, [location.pathname])

  // Prevent background scrolling when sidebar is open on mobile
  useEffect(() => {
    if (window.innerWidth <= 1024 && isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  return (
    <div className={`app-shell ${isSidebarOpen ? 'is-sidebar-open' : 'is-sidebar-closed'}`}>
      <header className="app-navbar">
        <div className="navbar-left">
          <button 
            className="hamburger-btn" 
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            <Icon name={isSidebarOpen ? 'close' : 'menu'} size={24} />
          </button>
          <div className="navbar-brand">
            <div className="brand-mark brand-mark--small">
              <Icon name="spark" size={14} />
            </div>
            <strong>GigPath</strong>
          </div>
        </div>
        <div className="navbar-center">
        </div>
        <div className="navbar-actions">
          <Link to="/app/notifications" className="navbar-bell" aria-label="Notifications">
            <Icon name="bell" size={20} />
            {unreadCount > 0 && (
              <span className="navbar-bell__badge">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'is-visible' : ''}`} 
        onClick={closeSidebar}
      ></div>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <main className="app-main">
        <div className="app-content">
          <Outlet />
        </div>
      </main>

      <style>{`
        .brand-mark--small {
          width: 28px;
          height: 28px;
          border-radius: 8px;
        }
        .navbar-bell {
          position: relative;
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          color: var(--text);
          background: var(--surface);
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }
        .navbar-bell:hover {
          background: var(--bg-strong);
          color: var(--accent-blue);
          border-color: var(--accent-blue);
        }
        .navbar-bell__badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--negative);
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 99px;
          border: 2px solid white;
          pointer-events: none;
        }
      `}</style>

    </div>
  )
}
