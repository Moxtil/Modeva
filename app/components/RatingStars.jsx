import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating, max = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-500 -translate-y-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar size={14} key={`full-${i}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt key="half" size={14} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar size={14} key={`empty-${i}`} />
      ))}
    </div>
  );
};

export default RatingStars;
