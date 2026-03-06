import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const PopularityProduct = ({ rating }) => { // score = number between 0 and 100
 // 1. Ensure rating is a valid number between 0 and 100
  const safeRating = typeof rating === 'number' && !isNaN(rating)
    ? Math.max(0, Math.min(100, rating))   // clamp between 0 and 100
    : 0;

  // 2. Convert to scale 0-5
  const stars = safeRating / 20;  // 0 → 0, 100 → 5

  // 3. Calc parts with security
  const fullStars   = Math.floor(stars);                    // 0 to 5
  const remainder   = stars - fullStars;                    // remaining fraction (0 to <1)
  const hasHalf     = remainder >= 0.5;                     // half star
  const emptyStars  = 5 - fullStars - (hasHalf ? 1 : 0);    // always ≥ 0 now

  return (
    <div className="flex items-center gap-1 text-yellow-400 text-base mt-1 mb-2">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}

      {/* Half star */}
      {hasHalf && <FaStarHalfAlt />}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
 );
}

export default PopularityProduct