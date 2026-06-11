import PageHeader from '../../components/ui/PageHeader'
import ProgressBar from '../../components/ui/ProgressBar'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useAppContext } from '../../context/AppContext'
import { formatCurrency } from '../../utils/formatters'

export default function BudgetRecommendationPage() {
  const { totals } = useAppContext()
  const operating = totals.earningsTotal * 0.4
  const savings = totals.earningsTotal * 0.35
  const personal = totals.earningsTotal * 0.25

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="AI"
        title="Budget recommendation"
        description="A simple allocation framework tailored to uneven gig income."
      />

      <SurfaceCard>
        <div className="section-heading">
          <h2>Suggested allocation</h2>
          <p>Split inflow between operating needs, savings growth, and personal spending.</p>
        </div>
        <div className="stack-list">
          <ProgressBar
            value={40}
            label={`Operating costs • ${formatCurrency(operating)}`}
            helper="Fuel, maintenance, subscriptions, insurance, and tools."
          />
          <ProgressBar
            value={35}
            label={`Savings and reserves • ${formatCurrency(savings)}`}
            helper="Emergency fund, taxes, and bigger goals."
            color="linear-gradient(90deg, var(--accent-green), var(--accent-blue))"
          />
          <ProgressBar
            value={25}
            label={`Personal spending • ${formatCurrency(personal)}`}
            helper="Lifestyle spending after the essentials are protected."
          />
        </div>
      </SurfaceCard>
    </div>
  )
}
