import { Star } from "lucide-react";
import { useState } from "react";

export default function ProductRating({ rating = 0, onRatingChange, readOnly = false }) {
  const safeRating = Number(rating) || 0;
  
  // Fare ile üzerine gelindiğinde (hover) geçici olarak yıldızları parlatmak için state
  const [hoverRating, setHoverRating] = useState(null);

  // Eğer readOnly prop'u true ise veya onRatingChange fonksiyonu verilmemişse sadece gösterim yapar (tıklanamaz)
  const isInteractive = !readOnly && typeof onRatingChange === "function";

  // O an görüntülenecek puan (fare üzerindeyse hover değeri, değilse orijinal puan)
  const currentRating = hoverRating !== null ? hoverRating : safeRating;

  return (
    <div className="flex gap-0 m-0 p-0 items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const fillNumber = Math.floor(currentRating) > index;
        const partialFillNumber = (currentRating - index) * 100;

        return (
          <button
            key={`star-${index}`}
            type="button"
            disabled={!isInteractive}
            onClick={() => isInteractive && onRatingChange(starValue)}
            onMouseEnter={() => isInteractive && setHoverRating(starValue)}
            onMouseLeave={() => isInteractive && setHoverRating(null)}
            className={`relative p-0 bg-transparent border-none m-0 line-height-0 focus:outline-none 
              ${isInteractive ? "cursor-pointer transition-transform active:scale-90 hover:scale-110" : "cursor-default"}`}
            aria-label={`${starValue} yıldız ver`}
          >
            {/* Küsüratlı (Partial) Yıldız Doldurma Mantığı - Yalnızca hover yoksa aktiftir */}
            {hoverRating === null && index === Math.floor(safeRating) && partialFillNumber > 0 && (
              <div
                style={{
                  width: `${partialFillNumber}%`,
                  whiteSpace: "nowrap",
                }}
                className="absolute top-0 left-0 overflow-hidden z-10 pointer-events-none"
              >
                <Star className="text-amber-400" fill="gold" />
              </div>
            )}
            
            <Star
              className="text-amber-400 block"
              fill={fillNumber || (hoverRating !== null && starValue <= hoverRating) ? "gold" : "white"}
            />
          </button>
        );
      })}
    </div>
  );
}
