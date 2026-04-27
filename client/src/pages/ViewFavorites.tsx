import { useState, useEffect } from 'react'
import ResourceCard from '../components/ResourceCard'

interface Resource {
  id: number
  name: string
  description: string
  categories: string[]
}

function ViewFavorites() {
  const [favorites, setFavorites] = useState<Resource[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/favorites', { credentials: 'include' })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setFavorites(data) })
  }, [])

  const removeFavorite = async (id: number) => {
    await fetch(`http://localhost:3000/api/favorites/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    setFavorites(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '20px' }}>My Favourites</h2>
      {favorites.length === 0 ? (
        <p style={{ color: '#777' }}>No favourites saved yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {favorites.map(resource => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              name={resource.name}
              description={resource.description}
              categories={resource.categories ?? []}
              favorited={true}
              onToggleFavorite={() => removeFavorite(resource.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewFavorites
