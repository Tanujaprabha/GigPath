import { useState } from 'react'
import SurfaceCard from './SurfaceCard'

export default function ProfileForm({ initialValues, onSubmit, submitLabel }) {
  const [form, setForm] = useState(initialValues)

  const handleChange = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]: target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <SurfaceCard className="form-panel">
      <div className="section-heading">
        <h2>Edit profile</h2>
        <p>Keep your identity, work mix, and payout details current.</p>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field">
          <span>Full name</span>
          <input required name="fullName" value={form.fullName} onChange={handleChange} />
        </label>

        <label className="field">
          <span>Email</span>
          <input required type="email" name="email" value={form.email} onChange={handleChange} />
        </label>

        <label className="field">
          <span>Phone</span>
          <input required name="phone" value={form.phone} onChange={handleChange} />
        </label>

        <label className="field">
          <span>City</span>
          <input required name="city" value={form.city} onChange={handleChange} />
        </label>

        <label className="field">
          <span>Primary work type</span>
          <input required name="workType" value={form.workType} onChange={handleChange} />
        </label>

        <label className="field">
          <span>Payout method</span>
          <input required name="payoutMethod" value={form.payoutMethod} onChange={handleChange} />
        </label>

        <label className="field field--full">
          <span>Bio</span>
          <textarea rows="4" name="bio" value={form.bio} onChange={handleChange} />
        </label>

        <div className="form-actions">
          <button type="submit" className="button button--primary">
            {submitLabel}
          </button>
        </div>
      </form>
    </SurfaceCard>
  )
}
