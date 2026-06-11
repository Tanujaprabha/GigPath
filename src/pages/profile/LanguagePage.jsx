import Icon from '../../components/ui/Icon'

export default function LanguagePage() {
  const languages = [
    { code: 'en', name: 'English', native: 'English', active: true },
    { code: 'es', name: 'Spanish', native: 'Español', active: false },
    { code: 'fr', name: 'French', native: 'Français', active: false },
    { code: 'de', name: 'German', native: 'Deutsch', active: false },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', active: false },
    { code: 'pt', name: 'Portuguese', native: 'Português', active: false },
  ]

  return (
    <div className="page-stack">
      <div className="page-header">
        <div className="page-header__copy">
          <div className="eyebrow">Preferences</div>
          <h1>Language</h1>
          <p>Choose your preferred language for the GigPath interface.</p>
        </div>
      </div>

      <div className="surface-card">
        <div className="language-grid">
          {languages.map((lang) => (
            <div key={lang.code} className={`language-card ${lang.active ? 'is-active' : ''}`}>
              <div className="language-info">
                <strong>{lang.name}</strong>
                <span>{lang.native}</span>
              </div>
              {lang.active && (
                <div className="check-icon">
                  <Icon name="spark" size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .language-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }

        .language-card {
          padding: 20px;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255, 255, 255, 0.5);
        }

        .language-card:hover {
          border-color: var(--accent-blue);
          background: white;
        }

        .language-card.is-active {
          border-color: var(--accent-blue);
          background: rgba(37, 99, 235, 0.05);
          box-shadow: 0 0 0 1px var(--accent-blue);
        }

        .language-info strong {
          display: block;
          font-size: 1.1rem;
        }

        .language-info span {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .check-icon {
          color: var(--accent-blue);
        }
      `}</style>
    </div>
  )
}
