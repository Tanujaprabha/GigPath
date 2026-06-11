import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { formatTimeAgo } from '../../utils/formatters'

export default function SuggestionsPage() {
  const { aiInsights, aiRecommendations, aiLoading } = useAppContext()

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="AI"
        title="Recommendations & Insights"
        description="Smart suggestions and detailed insights generated from your real financial data."
      />

      {aiLoading ? (
         <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
           Analyzing your finances...
         </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <div className="section-heading" style={{ marginBottom: '16px' }}>
              <h2>✨ Key Recommendations</h2>
              <p>Actions you can take to optimize your cash flow.</p>
            </div>
            {aiRecommendations && aiRecommendations.length > 0 ? (
              aiRecommendations.map((rec, idx) => (
                <SurfaceCard key={idx} className="surface-card--accent" style={{ marginBottom: '16px' }}>
                  <div className="section-heading" style={{ margin: 0 }}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: 'var(--text-main)' }}>{rec.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{rec.body}</p>
                  </div>
                </SurfaceCard>
              ))
            ) : (
              <div style={{ padding: '16px', color: 'var(--text-muted)' }}>No recommendations available right now.</div>
            )}
          </div>

          <div>
            <div className="section-heading" style={{ marginBottom: '16px' }}>
              <h2>📊 Dynamic Insights</h2>
              <p>Risk and status analysis of your financial profile.</p>
            </div>
            <div className="simple-list">
              {aiInsights && aiInsights.length > 0 ? (
                aiInsights.map((insight, idx) => {
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
                      className="simple-list__item" 
                      style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        borderLeft: `4px solid ${borderLeftColor}`,
                        background: bgLight,
                        padding: '12px 16px',
                        borderRadius: '4px',
                        borderTop: '1px solid rgba(0,0,0,0.03)',
                        borderRight: '1px solid rgba(0,0,0,0.03)',
                        borderBottom: '1px solid rgba(0,0,0,0.03)',
                        marginBottom: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{insight.title}</strong>
                        {insight.createdAt && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {formatTimeAgo(insight.createdAt)}
                          </span>
                        )}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{insight.description}</p>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: '16px', color: 'var(--text-muted)' }}>No insights available right now.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
