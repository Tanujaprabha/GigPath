import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { helpTopics } from '../../data/mockData'

export default function HelpPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Profile"
        title="Help"
        description="Answers and orientation for the product experience in this frontend demo."
      />

      <div className="stack-list">
        {helpTopics.map((topic) => (
          <SurfaceCard key={topic.question}>
            <div className="section-heading">
              <h2>{topic.question}</h2>
              <p>{topic.answer}</p>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  )
}
