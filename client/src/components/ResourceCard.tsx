import '../css/ResourceCard.css'

interface ResourceCardProps {
  name: string
  category: string
  description: string
  favorited: boolean
  onToggleFavorite: () => void
}

function ResourceCard({ name, category, description, favorited, onToggleFavorite }: ResourceCardProps) {
  return (
    <div className="resource-card">
      <button
        onClick={onToggleFavorite}
        className={`resource-card__favorite ${favorited ? 'resource-card__favorite--active' : 'resource-card__favorite--inactive'}`}
      >
        {favorited ? '★' : '☆'}
      </button>
      <h3 className="resource-card__name">{name}</h3>
      <p className="resource-card__category">{category}</p>
      <p className="resource-card__description">{description}</p>
    </div>
  )
}

export default ResourceCard
