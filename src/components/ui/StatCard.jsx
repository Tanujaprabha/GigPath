import Icon from './Icon'

export default function StatCard({
  icon,
  label,
  value,
  description,
  tone = 'neutral',
}) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__icon">
        <Icon name={icon} size={18} />
      </div>
      <div className="stat-card__body">
        <span className="stat-card__label">{label}</span>
        <strong className="stat-card__value">{value}</strong>
        {description ? <p className="stat-card__description">{description}</p> : null}
      </div>
    </article>
  )
}
