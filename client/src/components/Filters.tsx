import '../css/Filters.css'

interface FilterOption {
  id: string
  label: string
  checked: boolean
}

interface FiltersProps {
  search: string
  onSearchChange: (value: string) => void
  filterOptions: FilterOption[]
  onFilterChange: (id: string) => void
}

function Filters({ search, onSearchChange, filterOptions, onFilterChange }: FiltersProps) {
  return (
    <aside className="filters">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="filters__search"
      />
      <div>
        <p className="filters__heading">Filters</p>
        <div className="filters__list">
          {filterOptions.map(filter => (
            <label key={filter.id} className="filters__option">
              <input
                type="checkbox"
                checked={filter.checked}
                onChange={() => onFilterChange(filter.id)}
              />
              {filter.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Filters
