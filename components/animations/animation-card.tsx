"use client"

import type React from "react"

import { useState, useEffect } from "react" // Import useEffect
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Code, Crown, Heart } from "lucide-react" // Import Heart icon
import type { Animation } from "@/types/animation"
import AnimationPreview from "./animation-preview"
import { useCartStore } from "@/stores/cart-store"
import { useAuthStore } from "@/stores/auth-store"
import { AnimationService } from "@/services/animation-service" // Import AnimationService
import { useToast } from "@/hooks/use-toast" // Import useToast

interface AnimationCardProps {
  animation: Animation
  onViewDetails?: (animation: Animation) => void
}

export default function AnimationCard({ animation, onViewDetails }: AnimationCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const addItemToCart = useCartStore((state) => state.addItem)
  const { user } = useAuthStore()
  const userRole = user?.role || "guest"
  const { toast } = useToast()

  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    if (user?.favoriteAnimations?.includes(animation.id)) {
      setIsFavorited(true)
    } else {
      setIsFavorited(false)
    }
  }, [user, animation.id])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (userRole !== "guest") {
      addItemToCart(animation)
      toast({
        title: "Added to Cart",
        description: `"${animation.title}" has been added to your cart.`,
      })
    } else {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      })
    }
  }

  const handleViewCode = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (userRole !== "guest") {
      onViewDetails?.(animation)
    } else {
      toast({
        title: "Login Required",
        description: "Please log in to view code examples.",
        variant: "destructive",
      })
    }
  }

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user || user.role === "guest") {
      toast({
        title: "Login Required",
        description: "Please log in to manage your favorites.",
        variant: "destructive",
      })
      return
    }

    try {
      let success: boolean
      if (isFavorited) {
        success = await AnimationService.removeFavoriteAnimation(user.id, animation.id)
        if (success) {
          toast({
            title: "Removed from Favorites",
            description: `"${animation.title}" has been removed from your favorites.`,
          })
        }
      } else {
        success = await AnimationService.addFavoriteAnimation(user.id, animation.id)
        if (success) {
          toast({
            title: "Added to Favorites",
            description: `"${animation.title}" has been added to your favorites.`,
          })
        }
      }
      if (success) {
        // Manually update the user's favoriteAnimations in the store
        const updatedUser = await AnimationService.getUserById(user.id)
        if (updatedUser) {
          useAuthStore.getState().login(updatedUser)
        }
        setIsFavorited(!isFavorited)
      } else {
        toast({
          title: "Error",
          description: "Failed to update favorites.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating favorite:", error)
      toast({
        title: "Error",
        description: "An error occurred while updating favorites.",
        variant: "destructive",
      })
    }
  }

  const handleViewDetails = () => {
    onViewDetails?.(animation)
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      <div className="relative">
        <AnimationPreview type={animation.animationType} />
        <Badge className="absolute top-2 right-2" variant="secondary">
          {animation.category}
        </Badge>
        {animation.isPremium && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-50" variant="default">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        )}
        <Badge
          className="absolute bottom-2 left-2"
          variant={
            animation.difficulty === "Beginner"
              ? "default"
              : animation.difficulty === "Intermediate"
                ? "secondary"
                : "destructive"
          }
        >
          {animation.difficulty}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {animation.title}
          <span className="text-sm font-medium">{animation.price}</span>
        </CardTitle>
        <CardDescription>{animation.description}</CardDescription>
        <div className="flex flex-wrap gap-1 mt-2">
          {animation.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        {userRole !== "guest" && (
          <>
            <Button variant="outline" size="sm" onClick={handleViewCode}>
              <Code className="h-4 w-4 mr-1" />
              Code
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleFavorite}
                className={isFavorited ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-primary"}
              >
                <Heart className={isFavorited ? "fill-red-500" : ""} />
                <span className="sr-only">{isFavorited ? "Remove from favorites" : "Add to favorites"}</span>
              </Button>
              <Button size="sm" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
