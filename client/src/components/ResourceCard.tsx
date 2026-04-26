import { Link } from 'react-router-dom'
import '../css/ResourceCard.css'

interface ResourceCardProps {
  id: number
  name: string
  description: string
  favorited: boolean
  onToggleFavorite: () => void
}

function ResourceCard({ id, name, description, favorited, onToggleFavorite }: ResourceCardProps) {
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
        <p className="resource-card__description">{description}</p>
      </div>
    </Link>
  )
}

export default ResourceCard
