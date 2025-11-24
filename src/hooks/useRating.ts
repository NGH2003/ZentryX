import { useState, useEffect } from 'react';

interface Rating {
  totalRating: number;
  ratingCount: number;
  userRating?: number;
}

interface Ratings {
  [toolId: number]: Rating;
}

export const useRating = () => {
  const [ratings, setRatings] = useState<Ratings>({});

  useEffect(() => {
    const savedRatings = localStorage.getItem('toolRatings');
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings));
    }
  }, []);

  const saveRatings = (newRatings: Ratings) => {
    setRatings(newRatings);
    localStorage.setItem('toolRatings', JSON.stringify(newRatings));
  };

  const rateTool = (toolId: number, rating: number) => {
    const currentRating = ratings[toolId];
    
    if (currentRating?.userRating) {
      // User already rated, update their rating
      const newTotalRating = currentRating.totalRating - currentRating.userRating + rating;
      const newRatings = {
        ...ratings,
        [toolId]: {
          totalRating: newTotalRating,
          ratingCount: currentRating.ratingCount,
          userRating: rating
        }
      };
      saveRatings(newRatings);
    } else {
      // New rating from user
      const newRatings = {
        ...ratings,
        [toolId]: {
          totalRating: (currentRating?.totalRating || 0) + rating,
          ratingCount: (currentRating?.ratingCount || 0) + 1,
          userRating: rating
        }
      };
      saveRatings(newRatings);
    }
  };

  const getToolRating = (toolId: number) => {
    const rating = ratings[toolId];
    if (!rating || rating.ratingCount === 0) {
      return { averageRating: 0, ratingCount: 0, userRating: undefined };
    }
    
    return {
      averageRating: rating.totalRating / rating.ratingCount,
      ratingCount: rating.ratingCount,
      userRating: rating.userRating
    };
  };

  return { rateTool, getToolRating };
};