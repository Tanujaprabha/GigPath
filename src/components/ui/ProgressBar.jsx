export default function ProgressBar({ value, label, helper, color = 'var(--accent-blue)' }) {
  return (
    <div className="progress-row">
      <div className="progress-row__copy">
        <span>{label}</span>
        {helper ? <small>{helper}</small> : null}
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar__fill"
          style={{ width: `${Math.min(value, 100)}%`, background: color }}
        />
      </div>
    </div>
  )
}
