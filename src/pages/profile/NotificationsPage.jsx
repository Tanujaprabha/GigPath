import Icon from '../../components/ui/Icon'
import { useAppContext } from '../../context/AppContext'
import { formatTimeAgo } from '../../utils/formatters'

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, deleteNotification, clearAllNotifications, aiInsights } = useAppContext()

  const markAsRead = async (id) => {
    const notification = notifications.find(n => n.id === id)
    if (notification && !notification.read) {
      await markNotificationAsRead(id)
    }
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    await deleteNotification(id)
  }

  const markAllAsRead = async () => {
    for (const n of notifications) {
      if (!n.read) {
        await markNotificationAsRead(n.id)
      }
    }
  }

  const clearAll = async () => {
    await clearAllNotifications()
  }

  const getIcon = (type) => {
    switch (type) {
      case 'transaction': return { name: 'finance', color: 'var(--positive)' }
      case 'recurringExpense': return { name: 'refresh', color: 'var(--warning)' }
      case 'goal': return { name: 'goals', color: 'var(--accent-blue)' }
      case 'security': return { name: 'security', color: 'var(--negative)' }
      case 'system': return { name: 'settings', color: 'var(--text-muted)' }
      case 'aiInsight': return { name: 'spark', color: 'var(--accent-violet)' }
      default: return { name: 'notifications', color: 'var(--text-muted)' }
    }
  }

  return (
    <div className="page-stack">
      <div className="page-header">
        <div className="page-header__copy">
          <div className="eyebrow">Updates</div>
          <h1>Notifications</h1>
          <p>Stay updated with your latest financial alerts and AI insights.</p>
        </div>
        <div className="page-header__actions">
          {notifications.length > 0 && (
            <>
              <button className="button button--secondary" onClick={markAllAsRead}>
                Mark all as read
              </button>
              <button className="button button--ghost" onClick={clearAll}>
                Clear all
              </button>
            </>
          )}
        </div>
      </div>

      <div className="notifications-container">
        {aiInsights && aiInsights.length > 0 && (
          <div className="ai-insights-banner" style={{ marginBottom: '24px' }}>
            <div className="section-heading" style={{ marginBottom: '12px' }}>
              <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <span style={{ color: 'var(--accent-violet)' }}>✨</span> Latest AI Financial Insights
              </h2>
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {aiInsights.map((insight, idx) => {
                let borderLeftColor;
                let bgLight;
                if (insight.severity === 'high') {
                  borderLeftColor = '#ef4444'; // Red
                  bgLight = 'rgba(239, 68, 68, 0.03)';
                } else if (insight.severity === 'medium') {
                  borderLeftColor = '#f97316'; // Orange
                  bgLight = 'rgba(249, 115, 22, 0.03)';
                } else {
                  borderLeftColor = 'var(--accent-violet)';
                  bgLight = 'rgba(124, 58, 237, 0.03)';
                }

                return (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      borderLeft: `4px solid ${borderLeftColor}`,
                      background: bgLight,
                      padding: '12px 16px',
                      borderRadius: '8px',
                      borderTop: '1px solid rgba(0,0,0,0.03)',
                      borderRight: '1px solid rgba(0,0,0,0.03)',
                      borderBottom: '1px solid rgba(0,0,0,0.03)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{insight.title}</strong>
                      {insight.createdAt && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {formatTimeAgo(insight.createdAt)}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{insight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="section-heading" style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Alerts & Activity Logs</h2>
        </div>

        {notifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Icon name="notifications" size={48} />
            </div>
            <h3>All caught up!</h3>
            <p>You have no new notifications at the moment.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map((n) => {
              const icon = getIcon(n.type)
              return (
                <div 
                  key={n.id} 
                  className={`notification-card ${n.read ? 'is-read' : ''}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <div className="notification-icon" style={{ color: icon.color, background: `${icon.color}15` }}>
                    <Icon name={icon.name} size={20} />
                  </div>
                  <div className="notification-content">
                    <div className="notification-top">
                      <strong>{n.title}</strong>
                      <span className="notification-time">{n.createdAt ? formatTimeAgo(n.createdAt) : ''}</span>
                    </div>
                    <p>{n.message}</p>
                  </div>
                  <button className="delete-notification-btn" onClick={(e) => handleDelete(e, n.id)} title="Delete notification">
                    <Icon name="close" size={16} />
                  </button>
                  {!n.read && <div className="unread-dot"></div>}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style>{`
        .notifications-container {
          max-width: 800px;
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .notification-card {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .notification-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent-blue);
          box-shadow: var(--shadow);
        }

        .notification-card.is-read {
          opacity: 0.7;
          background: rgba(255, 255, 255, 0.4);
        }

        .notification-icon {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 14px;
          display: grid;
          place-items: center;
        }

        .notification-content {
          flex: 1;
        }

        .notification-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .notification-time {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .notification-content p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .unread-dot {
          width: 10px;
          height: 10px;
          background: var(--accent-blue);
          border-radius: 50%;
          position: absolute;
          top: 20px;
          right: 40px;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.4);
        }

        .delete-notification-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          position: absolute;
          top: 16px;
          right: 16px;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s ease, color 0.2s ease;
          display: grid;
          place-items: center;
          padding: 4px;
          border-radius: 4px;
        }

        .notification-card:hover .delete-notification-btn {
          opacity: 1;
        }

        .delete-notification-btn:hover {
          color: var(--negative);
          background: rgba(231, 76, 60, 0.1);
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: var(--radius-xl);
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          background: var(--bg);
          border-radius: 50%;
          display: grid;
          place-items: center;
          margin: 0 auto 20px;
          color: var(--text-muted);
        }

        .empty-state h3 {
          margin-bottom: 8px;
          color: var(--text);
        }

        .empty-state p {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  )
}
