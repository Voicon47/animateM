import type { AnimationType } from "@/types/animation"

interface AnimationPreviewProps {
  type: AnimationType
  className?: string
}

export default function AnimationPreview({ type, className = "h-40" }: AnimationPreviewProps) {
  const baseClasses = `${className} flex items-center justify-center bg-muted/50 rounded-md overflow-hidden`

  const renderAnimation = () => {
    switch (type) {
      case "fade-in":
        return <div className="w-20 h-20 bg-primary/80 rounded-md animate-fade-in"></div>

      case "slide-up":
        return <div className="w-20 h-20 bg-primary/80 rounded-md animate-slide-up"></div>

      case "pulse":
        return <div className="w-20 h-20 bg-primary/80 rounded-md animate-pulse"></div>

      case "bounce":
        return <div className="w-20 h-20 bg-primary/80 rounded-md animate-bounce"></div>

      case "flip":
        return (
          <div className="relative w-20 h-20 [perspective:800px] group">
            <div className="absolute inset-0 w-full h-full [transform-style:preserve-3d] transition-all duration-500 ease-in-out group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 w-full h-full bg-primary/80 rounded-md flex items-center justify-center text-white font-bold text-xs">
                Front
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-primary/40 rounded-md flex items-center justify-center text-white font-bold text-xs">
                Back
              </div>
            </div>
          </div>
        )

      case "text-wave":
        return (
          <div className="flex">
            {"Wave".split("").map((char, i) => (
              <span
                key={i}
                className="text-2xl font-bold text-primary animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        )

      case "scale":
        return <div className="w-20 h-20 bg-primary/80 rounded-md animate-scale"></div>

      case "shimmer":
        return (
          <div className="w-32 h-32 relative overflow-hidden bg-muted rounded-md">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        )

      case "rotate":
        return <div className="w-20 h-20 bg-primary/80 rounded-md animate-spin-slow"></div>

      case "float":
        return <div className="w-20 h-20 bg-primary/80 rounded-md animate-float"></div>

      default:
        return <div className="w-20 h-20 bg-primary/80 rounded-md"></div>
    }
  }

  return <div className={baseClasses}>{renderAnimation()}</div>
}
