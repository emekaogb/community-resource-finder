import defaultAvatar from '../assets/default_avatar.avif'
import '../css/ReviewCard.css'

interface ReviewCardProps {
  userName: string
  userImage: string | null
  rating: number
  comment: string
  createdAt: string
}

function ReviewCard({ userName, userImage, rating, comment, createdAt }: ReviewCardProps) {
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="review-card">
      <div className="review-card__header">
        <img
          src={userImage ?? defaultAvatar}
          alt={userName}
          className="review-card__avatar"
        />
        <div className="review-card__meta">
          <span className="review-card__name">{userName}</span>
          <span className="review-card__date">{date}</span>
        </div>
      </div>
      <div className="review-card__stars">
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </div>
      <p className="review-card__comment">{comment}</p>
    </div>
  )
}

export default ReviewCard
