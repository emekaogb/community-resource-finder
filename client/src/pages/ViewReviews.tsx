import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'
import '../css/ViewReviews.css'

interface Review {
  id: number
  resource_id: number
  resource_name: string
  user_name: string
  user_image: string | null
  rating: number
  comment: string
  created_at: string
}

function ViewReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const deleteReview = async (reviewId: number) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${reviewId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (res.ok) setReviews(prev => prev.filter(r => r.id !== reviewId))
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/reviews/mine`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setReviews(data) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="view-reviews">
      <h1 className="view-reviews__heading">My Reviews</h1>
      {loading ? (
        <p className="view-reviews__status">Loading...</p>
      ) : reviews.length === 0 ? (
        <p className="view-reviews__status">You haven't written any reviews yet.</p>
      ) : (
        <div className="view-reviews__list">
          {reviews.map(review => (
            <div key={review.id} className="view-reviews__item">
              <div className="view-reviews__item-header">
                <Link to={`/resources/${review.resource_id}`} className="view-reviews__resource-link">
                  {review.resource_name}
                </Link>
                <div className="view-reviews__actions">
                  <Link
                    to={`/review/${review.resource_id}?edit=${review.id}`}
                    className="view-reviews__edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    className="view-reviews__delete-btn"
                    onClick={() => deleteReview(review.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <ReviewCard
                userName={review.user_name}
                userImage={review.user_image}
                rating={review.rating}
                comment={review.comment}
                createdAt={review.created_at}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewReviews
