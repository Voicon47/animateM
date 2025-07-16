export default function AnimatedLogo() {
  return (
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20"></div>
      <div className="absolute inset-1 animate-pulse rounded-full bg-primary/40 animation-delay-200"></div>
      <div className="absolute inset-2 animate-pulse rounded-full bg-primary/60 animation-delay-500"></div>
      <div className="absolute inset-3 animate-pulse rounded-full bg-primary/80 animation-delay-700"></div>
      <div className="absolute inset-4 animate-pulse rounded-full bg-primary animation-delay-1000"></div>
    </div>
  )
}
