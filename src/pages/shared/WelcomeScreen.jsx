import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../../components/ui/Icon'
import { useAppContext } from '../../context/AppContext'

export default function WelcomeScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { logout } = useAppContext()

  return (
    <div className="welcome-screen">
      <div className="welcome-visual">
        <div className="visual-circle primary"></div>
        <div className="visual-circle secondary"></div>
        <div className="visual-card">
          <div className="card-header">
            <div className="card-icon">
              <Icon name="finance" size={20} />
            </div>
            <div className="card-lines">
              <div className="line long"></div>
              <div className="line short"></div>
            </div>
          </div>
          <div className="card-amount">₹2,45,000</div>
          <div className="card-progress">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      <div className="welcome-content">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Icon name="spark" size={16} />
          </div>
          <strong>GigPath</strong>
        </div>

        <h1 className="welcome-title">
          {t('welcome.title')}
        </h1>
        <p className="welcome-text">
          {t('welcome.subtitle')}
        </p>

        <div className="welcome-actions">
          <button 
            className="button button--primary button--block"
            onClick={() => {
              logout()
              navigate('/login')
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      <style>{`
        .welcome-screen {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #f8fafc;
        }

        @media (max-width: 900px) {
          .welcome-screen {
            grid-template-columns: 1fr;
          }
          .welcome-visual {
            height: 40vh;
          }
        }

        .welcome-visual {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .visual-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .visual-circle.primary {
          width: 400px;
          height: 400px;
          background: rgba(255, 255, 255, 0.2);
          top: -100px;
          right: -100px;
        }

        .visual-circle.secondary {
          width: 300px;
          height: 300px;
          background: rgba(34, 197, 94, 0.2);
          bottom: -50px;
          left: -50px;
        }

        .visual-card {
          width: 280px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 24px;
          color: white;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2);
          transform: rotate(-5deg);
          animation: float 6s infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(-3deg) translateY(-20px); }
        }

        .card-header {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: grid;
          place-items: center;
        }

        .line {
          height: 6px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          margin-bottom: 6px;
        }

        .line.long { width: 100px; }
        .line.short { width: 60px; }

        .card-amount {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .card-progress {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #4ade80;
        }

        .welcome-content {
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .welcome-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
          margin: 30px 0 20px;
          color: #0f172a;
        }

        .welcome-title span {
          background: linear-gradient(to right, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .welcome-text {
          font-size: 1.125rem;
          color: #64748b;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .welcome-actions {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
      `}</style>
    </div>
  )
}
