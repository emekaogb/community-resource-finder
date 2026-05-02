import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'
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

interface Review {
  id: number
  user_name: string
  user_image: string | null
  rating: number
  comment: string
  created_at: string
}

function ResourceDetails() {
  const { id } = useParams()
  const [resource, setResource] = useState<Resource | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/resources/${id}`)
      .then(res => res.json())
      .then(data => setResource(data))
  }, [id])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setReviews(data) })
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

      <div className="resource-details__reviews">
        <div className="resource-details__reviews-header">
          <h2 className="resource-details__reviews-heading">Reviews</h2>
          <Link to={`/review/${id}`} className="resource-details__review-btn">Write a Review</Link>
        </div>
        {reviews.length === 0 ? (
          <p className="resource-details__no-reviews">No reviews yet. Be the first!</p>
        ) : (
          <div className="resource-details__reviews-list">
            {reviews.map(review => (
              <ReviewCard
                key={review.id}
                userName={review.user_name}
                userImage={review.user_image}
                rating={review.rating}
                comment={review.comment}
                createdAt={review.created_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResourceDetails
