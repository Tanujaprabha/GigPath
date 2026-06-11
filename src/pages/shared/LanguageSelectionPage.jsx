import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../../components/ui/Icon'
import SurfaceCard from '../../components/ui/SurfaceCard'

const languages = [
  { code: 'en', label: 'English', native: 'English', icon: 'spark' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', icon: 'spark' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', icon: 'spark' }
]

export default function LanguageSelectionPage() {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const handleSelect = async (code) => {
    setSelected(code)
    // Change language and wait for it to complete to ensure UI consistency
    await i18n.changeLanguage(code)
    
    // Save to localStorage as requested
    localStorage.setItem('language', code)
    localStorage.setItem('i18nextLng', code) // Standard key for i18next
    localStorage.setItem('gigpath_language_selected', 'true')
    
    // Navigate immediately to welcome screen
    navigate('/welcome')
  }

  return (
    <div className="language-selection-page">
      <div className="language-container">
        <div className="language-header">
          <div className="brand-lockup">
            <div className="brand-mark">
              <Icon name="spark" size={16} />
            </div>
            <strong>GigPath</strong>
          </div>
          <h1>{t('onboarding.selectLanguage')}</h1>
          <p>{t('onboarding.chooseLanguageText')}</p>
        </div>

        <div className="language-grid">
          {languages.map((lang) => (
            <SurfaceCard
              key={lang.code}
              className={`language-card ${selected === lang.code ? 'is-selected' : ''}`}
              onClick={() => handleSelect(lang.code)}
            >
              <div className="language-card__content">
                <div className="language-icon">
                  <Icon name={lang.icon} size={20} />
                </div>
                <div className="language-info">
                  <strong>{lang.native}</strong>
                  <span>{lang.label}</span>
                </div>
                {selected === lang.code && (
                  <div className="selection-indicator">
                    <Icon name="check" size={16} />
                  </div>
                )}
              </div>
            </SurfaceCard>
          ))}
        </div>
      </div>

      <style>{`
        .language-selection-page {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .language-container {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .language-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .language-header h1 {
          font-size: 1.75rem;
          color: #0f172a;
          margin-top: 8px;
        }

        .language-header p {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.5;
        }

        .language-grid {
          display: grid;
          gap: 16px;
        }

        .language-card {
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }

        .language-card.is-selected {
          border-color: var(--accent-blue);
          background: rgba(37, 99, 235, 0.04);
        }

        .language-card__content {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }

        .language-icon {
          width: 44px;
          height: 44px;
          background: #f1f5f9;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #64748b;
        }

        .is-selected .language-icon {
          background: rgba(37, 99, 235, 0.1);
          color: var(--accent-blue);
        }

        .language-info {
          display: flex;
          flex-direction: column;
        }

        .language-info strong {
          font-size: 1.1rem;
          color: #0f172a;
        }

        .language-info span {
          font-size: 0.9rem;
          color: #64748b;
        }

        .selection-indicator {
          position: absolute;
          right: 0;
          color: var(--accent-blue);
        }

        .language-footer {
          margin-top: 8px;
        }
      `}</style>
    </div>
  )
}
