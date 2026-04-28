import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../css/ResourceDetails.css'

interface Resource {
  id: number
  name: string
  street: string
  city: string
  state: string
  zip_code: number
  description: string
  image: string
}

function ResourceDetails() {
  const { id } = useParams()
  const [resource, setResource] = useState<Resource | null>(null)

  useEffect(() => {
    fetch(`http://localhost:3000/api/resources/${id}`)
      .then(res => res.json())
      .then(data => setResource(data))
  }, [id])

  if (!resource) return <p style={{ padding: '40px' }}>Loading...</p>

  const address = [resource.street, resource.city, resource.state, resource.zip_code]
    .filter(Boolean)
    .join(', ')

  return (
    <div className="resource-details">
      <h1 className="resource-details__name">{resource.name}</h1>
      <p className="resource-details__address">{address}</p>

      <p className="resource-details__description">
        <span className="resource-details__description-label">Resource description... </span>
        {resource.description}
      </p>

      <div className="resource-details__media">
        {resource.image && (
          <div className="resource-details__image">
            <img src={resource.image} alt={resource.name} />
          </div>
        )}
        <div className="resource-details__map">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '12px' }}
            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(address)}`}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default ResourceDetails
