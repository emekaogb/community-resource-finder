import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import '../css/CreateReview.css'

function CreateReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resourceName, setResourceName] = useState('')
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/resources/${id}`)
      .then(res => res.json())
      .then(data => setResourceName(data.name ?? ''))
  }, [id])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!rating || !comment.trim()) return
    setSubmitting(true)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment: comment.trim() }),
    })
    setSubmitting(false)
    if (res.ok) navigate(`/resources/${id}`)
  }

  return (
    <div className="create-review">
      <Link to={`/resources/${id}`} className="create-review__back">← Back</Link>
      <h1 className="create-review__heading">Leave a Review</h1>
      {resourceName && (
        <p className="create-review__subheading">{resourceName}</p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="create-review__label">Rating</label>
        <div className="create-review__stars">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              className={`create-review__star ${star <= (hovered || rating) ? 'create-review__star--filled' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            >
              ★
            </button>
          ))}
        </div>

        <label className="create-review__label">Comment</label>
        <textarea
          className="create-review__textarea"
          placeholder="Share your experience..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <button
          className="create-review__submit"
          type="submit"
          disabled={!rating || !comment.trim() || submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}

export default CreateReview
