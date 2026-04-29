import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ResourceCard from '../components/ResourceCard'
import Filters from '../components/Filters'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const submittedQuery = searchParams.get('q') ?? ''

  const [resources, setResources] = useState<Resource[]>([])
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<{ id: string; label: string; checked: boolean }[]>([])
  const [favorited, setFavorited] = useState<Set<number>>(new Set())
  const [locationQuery, setLocationQuery] = useState(submittedQuery)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/favorites`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFavorited(new Set(data.map((r: Resource) => r.id)))
      })
  }, [])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setFilters(data.map((c: { id: number; name: string }) => ({
        id: String(c.id),
        label: c.name,
        checked: false,
      }))))
  }, [])

  useEffect(() => {
    if (!submittedQuery) return
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resources/search?q=${encodeURIComponent(submittedQuery)}`)
        const data = await res.json()
        if (!cancelled) {
          if (Array.isArray(data)) setResources(data)
          else console.error('Failed to load resources:', data)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [submittedQuery])

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (locationQuery.trim()) setSearchParams({ q: locationQuery.trim() })
  }

  const toggleFilter = (id: string) => {
    setFilters(prev => prev.map(f => f.id === id ? { ...f, checked: !f.checked } : f))
  }

  const toggleFavorite = async (id: number) => {
    const isFavorited = favorited.has(id)
    const method = isFavorited ? 'DELETE' : 'POST'
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/favorites/${id}`, {
      method,
      credentials: 'include',
    })
    if (!res.ok) {
      const err = await res.json()
      console.error('Favorite toggle failed:', res.status, err)
      return
    }
    setFavorited(prev => {
      const next = new Set(prev)
      if (isFavorited) next.delete(id)
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

  if (!submittedQuery) {
    return (
      <div className="view-resources view-resources--empty">
        <form className="view-resources__location-form" onSubmit={handleSearch}>
          <h2 className="view-resources__location-heading">Find resources near you:</h2>
          <div className="view-resources__location-input-row">
            <input
              className="view-resources__location-input"
              type="text"
              placeholder="Enter a zip code or city"
              value={locationQuery}
              onChange={e => setLocationQuery(e.target.value)}
            />
            <button className="view-resources__location-btn" type="submit">Search</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="view-resources">
      <Filters
        search={search}
        onSearchChange={setSearch}
        filterOptions={filters}
        onFilterChange={toggleFilter}
      />
      <main className="view-resources__grid">
        {loading ? (
          <p className="view-resources__status">Loading resources...</p>
        ) : visibleResources.length === 0 ? (
          <p className="view-resources__status">No resources found for "{submittedQuery}".</p>
        ) : (
          visibleResources.map(resource => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              name={resource.name}
              description={resource.description}
              categories={resource.categories ?? []}
              favorited={favorited.has(resource.id)}
              onToggleFavorite={() => toggleFavorite(resource.id)}
            />
          ))
        )}
      </main>
    </div>
  )
}

export default ViewResources
