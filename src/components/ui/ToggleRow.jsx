export default function ToggleRow({ label, description, checked, onChange }) {
  return (
    <label className="toggle-row">
      <div>
        <span className="toggle-row__label">{label}</span>
        <p>{description}</p>
      </div>
      <span className={`toggle-row__switch ${checked ? 'is-active' : ''}`}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="toggle-row__knob" />
      </span>
    </label>
  )
}
