"use client"

import { useState } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Code } from "lucide-react"

interface AnimationCardProps {
  title: string
  description: string
  category: string
  animationType: string
  price: string
}

export default function AnimationCard({ title, description, category, animationType, price }: AnimationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Animation preview component based on type
  const AnimationPreview = () => {
    switch (animationType) {
      case "fade-in":
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
            <div className="w-20 h-20 bg-primary/80 rounded-md animate-fade-in"></div>
          </div>
        )
      case "slide-up":
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
            <div className="w-20 h-20 bg-primary/80 rounded-md animate-slide-up"></div>
          </div>
        )
      case "pulse":
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
            <div className="w-20 h-20 bg-primary/80 rounded-md animate-pulse"></div>
          </div>
        )
      case "bounce":
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
            <div className="w-20 h-20 bg-primary/80 rounded-md animate-bounce"></div>
          </div>
        )
      case "flip":
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
            <div className="relative w-20 h-20 [perspective:800px] group">
              <div className="absolute inset-0 w-full h-full [transform-style:preserve-3d] transition-all duration-500 ease-in-out group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 w-full h-full bg-primary/80 rounded-md flex items-center justify-center text-white font-bold">
                  Front
                </div>
                <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-primary/40 rounded-md flex items-center justify-center text-white font-bold">
                  Back
                </div>
              </div>
            </div>
          </div>
        )
      case "text-wave":
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
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
          </div>
        )
      case "scale":
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
            <div className="w-20 h-20 bg-primary/80 rounded-md animate-scale"></div>
          </div>
        )
      case "shimmer":
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
            <div className="w-32 h-32 relative overflow-hidden bg-muted rounded-md">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>
        )
      case "rotate":
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
            <div className="w-20 h-20 bg-primary/80 rounded-md animate-spin-slow"></div>
          </div>
        )
      default:
        return (
          <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="w-20 h-20 bg-primary/80 rounded-md"></div>
          </div>
        )
    }
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <AnimationPreview />
        <Badge className="absolute top-2 right-2" variant="secondary">
          {category}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="font-medium">{price}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Code className="h-4 w-4 mr-1" />
            Code
          </Button>
          <Button size="sm">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
