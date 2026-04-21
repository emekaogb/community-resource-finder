import { useState } from 'react'
import ResourceCard from '../components/ResourceCard'
import Filters from '../components/Filters'
import '../css/ViewResources.css'

interface Resource {
  id: number
  name: string
  category: string
  description: string
}

const PLACEHOLDER_RESOURCES: Resource[] = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  name: 'Resource Name',
  category: 'Category',
  description: 'Short description.....\n.....\n.....',
}))

const FILTER_OPTIONS = [
  { id: 'f1', label: 'Filter name' },
  { id: 'f2', label: 'Filter name' },
  { id: 'f3', label: 'Filter name' },
  { id: 'f4', label: 'Filter name' },
  { id: 'f5', label: 'Filter name' },
  { id: 'f6', label: 'Filter name' },
]

function ViewResources() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(FILTER_OPTIONS.map(f => ({ ...f, checked: false })))
  const [favorited, setFavorited] = useState<Set<number>>(new Set())

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

  return (
    <div className="view-resources">
      <Filters
        search={search}
        onSearchChange={setSearch}
        filterOptions={filters}
        onFilterChange={toggleFilter}
      />
      <main className="view-resources__grid">
        {PLACEHOLDER_RESOURCES.map(resource => (
          <ResourceCard
            key={resource.id}
            name={resource.name}
            category={resource.category}
            description={resource.description}
            favorited={favorited.has(resource.id)}
            onToggleFavorite={() => toggleFavorite(resource.id)}
          />
        ))}
      </main>
    </div>
  )
}

export default ViewResources
