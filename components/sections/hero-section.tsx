import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="animate-fade-in" variant="outline">
                New Animation Library
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-slide-up">
                Amazing React Animations
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl animate-slide-up animation-delay-200">
                Discover and implement stunning animations for your React projects. Boost user experience with smooth,
                eye-catching transitions and effects.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row animate-slide-up animation-delay-300">
              <Button size="lg" asChild>
                <Link href="#animations">
                  Browse Animations
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-full h-[350px] rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center overflow-hidden">
              <div className="animate-float">
                <div className="w-32 h-32 bg-primary/80 rounded-2xl animate-spin-slow"></div>
              </div>
              <div className="absolute top-1/4 left-1/4 animate-float animation-delay-500">
                <div className="w-16 h-16 bg-primary/60 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-1/3 right-1/4 animate-float animation-delay-700">
                <div className="w-24 h-24 bg-primary/40 rounded-lg animate-bounce-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
