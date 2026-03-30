import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const RatingStars = ({ rating, reviewCount }) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-[#FFA41C]" size={14} />)
  }
  if (hasHalf) {
    stars.push(<FaStarHalfAlt key="half" className="text-[#FFA41C]" size={14} />)
  }
  const remaining = 5 - stars.length
  for (let i = 0; i < remaining; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-[#FFA41C]" size={14} />)
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {reviewCount !== undefined && (
        <span className="text-[#007185] text-xs hover:text-[#C7511F] cursor-pointer">
          {reviewCount.toLocaleString('en-IN')}
        </span>
      )}
    </div>
  )
}

export default RatingStars
