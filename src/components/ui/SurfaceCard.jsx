export default function SurfaceCard({ children, className = '', onClick }) {
  return (
    <section 
      className={`surface-card ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </section>
  )
}
