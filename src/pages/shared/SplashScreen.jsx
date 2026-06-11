import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../components/ui/Icon'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome')
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="brand-mark brand-mark--large pulse">
          <Icon name="spark" size={48} />
        </div>
        <h1 className="splash-title">GigPath</h1>
        <p className="splash-tagline">Your path to financial freedom</p>
      </div>
      <div className="splash-footer">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <style>{`
        .splash-screen {
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          position: fixed;
          inset: 0;
          z-index: 9999;
        }

        .splash-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .brand-mark--large {
          width: 100px;
          height: 100px;
          border-radius: 32px;
          margin-bottom: 10px;
        }

        .splash-title {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin: 0;
          background: linear-gradient(to right, #60a5fa, #c084fc, #4ade80);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .splash-tagline {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .splash-footer {
          position: absolute;
          bottom: 60px;
        }

        .pulse {
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(37, 99, 235, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }

        .loading-dots {
          display: flex;
          gap: 8px;
        }

        .loading-dots span {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          opacity: 0.3;
          animation: dots 1.4s infinite ease-in-out both;
        }

        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes dots {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
