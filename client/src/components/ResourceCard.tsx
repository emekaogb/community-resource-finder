import { Link } from 'react-router-dom'
import '../css/ResourceCard.css'

const CATEGORY_COLORS: Record<string, { borderColor: string; color: string }> = {
  'Food Bank':              { borderColor: '#fde68a', color: '#78350f' },
  'Homeless Shelter':       { borderColor: '#bfdbfe', color: '#1e3a5f' },
  'Free Low-Cost Clinic':   { borderColor: '#bbf7d0', color: '#14532d' },
  'Mental Health Support':  { borderColor: '#e9d5ff', color: '#4c1d95' },
  'Job Training Center':    { borderColor: '#fed7aa', color: '#7c2d12' },
  'Community Event':        { borderColor: '#fecdd3', color: '#881337' },
  'After-School Programs':  { borderColor: '#a5f3fc', color: '#164e63' },
  'Immigration Legal Aid':  { borderColor: '#d1fae5', color: '#065f46' },
}

interface ResourceCardProps {
  id: number
  name: string
  description: string
  categories: string[]
  favorited: boolean
  onToggleFavorite: () => void
}

function ResourceCard({ id, name, description, categories, favorited, onToggleFavorite }: ResourceCardProps) {
  return (
    <Link to={`/resources/${id}`} className="resource-card__link">
      <div className="resource-card">
        <button
          onClick={e => { e.preventDefault(); onToggleFavorite() }}
          className={`resource-card__favorite ${favorited ? 'resource-card__favorite--active' : 'resource-card__favorite--inactive'}`}
        >
          {favorited ? '★' : '☆'}
        </button>
        <h3 className="resource-card__name">{name}</h3>
        <div className="resource-card__categories">
          {categories.map(cat => (
            <span
              key={cat}
              className="resource-card__category-tag"
              style={CATEGORY_COLORS[cat] ?? { backgroundColor: '#e5e7eb', color: '#374151' }}
            >{cat}</span>
          ))}
        </div>
        <p className="resource-card__description">{description}</p>
      </div>
    </Link>
  )
}

export default ResourceCard
