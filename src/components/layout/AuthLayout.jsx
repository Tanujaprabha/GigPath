import Icon from '../ui/Icon'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Icon name="spark" size={18} />
          </div>
          <div>
            <strong>GigPath</strong>
            <span>Financial Growth App for Gig Workers</span>
          </div>
        </div>

        <div className="auth-aside__content">
          <span className="eyebrow">Plan smarter</span>
          <h1>Track earnings, protect savings, and grow with confidence.</h1>
          <p>
            A focused SaaS dashboard for gig workers who need better daily visibility
            without getting buried in clutter.
          </p>
        </div>

        <div className="auth-highlight">
          <div>
            <strong>Safe to spend</strong>
            <span>Daily spending guidance anchored to your real cash flow.</span>
          </div>
          <div>
            <strong>Goal momentum</strong>
            <span>See how each gig pushes emergency, tax, and upgrade funds forward.</span>
          </div>
        </div>
      </aside>

      <main className="auth-panel">
        <div className="auth-card">
          <div className="section-heading">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          {children}
          {footer ? <div className="auth-footer">{footer}</div> : null}
        </div>
      </main>
    </div>
  )
}
