import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, max = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex w-full max-w-xs gap-1 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="flex-1 w-full h-auto" />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt key="half" className="flex-1 w-full h-auto" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="flex-1 w-full h-auto" />
      ))}
    </div>
  );
};

export default StarRating;
