"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShoppingCart, Heart } from "lucide-react" // Import Heart icon
import type { Animation } from "@/types/animation"
import AnimationPreview from "./animation-preview"
import { useCartStore } from "@/stores/cart-store"
import { useAuthStore } from "@/stores/auth-store"
import { AnimationService } from "@/services/animation-service" // Import AnimationService
import { useToast } from "@/hooks/use-toast" // Import useToast
import { useState, useEffect } from "react" // Import useState, useEffect

interface AnimationDetailModalProps {
  animation: Animation | null
  isOpen: boolean
  onClose: () => void
}

export default function AnimationDetailModal({ animation, isOpen, onClose }: AnimationDetailModalProps) {
  const addItemToCart = useCartStore((state) => state.addItem)
  const { user, login } = useAuthStore() // Get user and login from Auth Zustand store
  const userRole = user?.role || "guest"
  const { toast } = useToast()

  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    if (user?.favoriteAnimations?.includes(animation?.id || "")) {
      setIsFavorited(true)
    } else {
      setIsFavorited(false)
    }
  }, [user, animation?.id])

  if (!animation) return null

  const handleAddToCart = () => {
    if (animation && userRole !== "guest") {
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

  const handleToggleFavorite = async () => {
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
          login(updatedUser)
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {animation.title}
            <Badge variant={animation.isPremium ? "default" : "outline"}>
              {animation.isPremium ? "Premium" : "Free"}
            </Badge>
          </DialogTitle>
          <DialogDescription>{animation.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="bg-muted/30 rounded-lg p-6 flex items-center justify-center">
                <AnimationPreview type={animation.animationType} className="h-60 w-full" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Details</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-muted-foreground">Category:</dt>
                  <dd>{animation.category}</dd>
                  <dt className="text-muted-foreground">Difficulty:</dt>
                  <dd>{animation.difficulty}</dd>
                  <dt className="text-muted-foreground">Price:</dt>
                  <dd>{animation.price}</dd>
                </dl>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {animation.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {userRole !== "guest" && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center"
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                    {isFavorited ? "Favorited" : "Add to Favorites"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {userRole !== "guest" && (
            <div>
              <h3 className="text-sm font-medium mb-2">Source Code</h3>
              <CodeBlock code={animation.codeExample || "/* Code example not available */"} language="css" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
