import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = 14,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-gold-500 text-gold-500" : "fill-none text-ink-300"}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-ink-500">({count})</span>
      )}
    </div>
  );
}
