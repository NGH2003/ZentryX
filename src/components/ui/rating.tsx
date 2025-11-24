import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count: number;
  userRating?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Rating({ value, count, userRating, onRate, readonly = false, size = "md" }: RatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const handleStarClick = (rating: number) => {
    if (!readonly && onRate) {
      onRate(rating);
    }
  };

  const displayRating = hoverRating || userRating || value;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            className={cn(
              "transition-colors focus:outline-none",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default"
            )}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors",
                star <= displayRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              )}
            />
          </button>
        ))}
      </div>
      
      <span className={cn("text-muted-foreground", textSizeClasses[size])}>
        {value > 0 ? `${value.toFixed(1)} (${count})` : count > 0 ? `(${count})` : "No ratings"}
      </span>
      
      {userRating && (
        <span className={cn("text-muted-foreground", textSizeClasses[size])}>
          • Your rating: {userRating}
        </span>
      )}
    </div>
  );
}