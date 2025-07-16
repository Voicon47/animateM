import type { Animation } from "@/types/animation"
import AnimationCard from "./animation-card"

interface AnimationGridProps {
  animations: Animation[]
  onViewDetails?: (animation: Animation) => void
  className?: string
}

export default function AnimationGrid({
  animations,
  onViewDetails,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
}: AnimationGridProps) {
  if (animations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No animations found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {animations.map((animation) => (
        <AnimationCard key={animation.id} animation={animation} onViewDetails={onViewDetails} />
      ))}
    </div>
  )
}
