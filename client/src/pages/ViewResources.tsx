import { useState, useEffect } from 'react'
import ResourceCard from '../components/ResourceCard'
import Filters from '../components/Filters'
import { useLocation } from '../components/GetLocation'
import '../css/ViewResources.css'

interface Resource {
  id: number
  name: string
  description: string
  categories: string[]
  city: string
  state: string
}

function ViewResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<{ id: string; label: string; checked: boolean }[]>([])
  const [favorited, setFavorited] = useState<Set<number>>(new Set())
  const { coords, error: locationError } = useLocation()

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then(res => res.json())
      .then(data => setFilters(data.map((c: { id: number; name: string }) => ({
        id: String(c.id),
        label: c.name,
        checked: false,
      }))))
  }, [])

  useEffect(() => {
    if (coords === null && locationError === null) return
    const url = coords
      ? `http://localhost:3000/api/resources/nearby?lat=${coords.lat}&lng=${coords.lng}`
      : `http://localhost:3000/api/resources/nearby`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setResources(data)
        else console.error('Failed to load resources:', data)
      })
  }, [coords, locationError])

  const toggleFilter = (id: string) => {
    setFilters(prev => prev.map(f => f.id === id ? { ...f, checked: !f.checked } : f))
  }

  const toggleFavorite = (id: number) => {
    setFavorited(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const activeFilters = filters.filter(f => f.checked).map(f => f.label)

  const visibleResources = resources.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilters.length === 0 ||
      r.categories?.some(cat => activeFilters.includes(cat))
    return matchesSearch && matchesFilter
  })

  return (
    <div className="view-resources">
      <Filters
        search={search}
        onSearchChange={setSearch}
        filterOptions={filters}
        onFilterChange={toggleFilter}
      />
      <main className="view-resources__grid">
        {visibleResources.map(resource => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            name={resource.name}
            description={resource.description}
            categories={resource.categories ?? []}
            favorited={favorited.has(resource.id)}
            onToggleFavorite={() => toggleFavorite(resource.id)}
          />
        ))}
      </main>
    </div>
  )
}

export default ViewResources
