import React from 'react';
import { StarIcon } from 'lucide-react';
/**
 * RatingStars component displays a star rating
 * @param {Object} props
 * @param {number} props.rating - The rating value (0-5)
 * @param {number} props.maxRating - Maximum rating value (default: 5)
 * @param {boolean} props.interactive - Whether the rating can be changed by clicking
 * @param {function} props.onChange - Callback function when rating changes (interactive mode)
 * @param {string} props.size - Size of stars (sm, md, lg)
 */
export function RatingStars({
  rating,
  maxRating = 5,
  interactive = false,
  onChange,
  size = "md"
}) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };
  const handleClick = newRating => {
    if (interactive && onChange) {
      onChange(newRating);
    }
  };
  return <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= rating;
      return <button key={index} type="button" className={`${interactive ? 'cursor-pointer' : 'cursor-default'} p-0.5 focus:outline-none`} onClick={() => handleClick(starValue)} aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`} disabled={!interactive}>
            <StarIcon className={`${sizeClasses[size]} ${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          </button>;
    })}
      {rating > 0 && <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)}
        </span>}
    </div>;
}