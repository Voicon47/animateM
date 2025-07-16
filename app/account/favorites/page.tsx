"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimationService } from "@/services/animation-service"
import type { Animation } from "@/types/animation"
import AnimationGrid from "@/components/animations/animation-grid"
import { useAuthStore } from "@/stores/auth-store"
import { useToast } from "@/hooks/use-toast"
import { HeartCrack } from "lucide-react"

export default function AccountFavoritesPage() {
  const { user } = useAuthStore()
  const { toast } = useToast()
  const [favoriteAnimations, setFavoriteAnimations] = useState<Animation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      loadFavoriteAnimations(user.id)
    }
  }, [user])

  const loadFavoriteAnimations = async (userId: string) => {
    setLoading(true)
    try {
      const data = await AnimationService.getFavoriteAnimations(userId)
      setFavoriteAnimations(data)
    } catch (error) {
      console.error("Failed to load favorite animations:", error)
      toast({
        title: "Error",
        description: "Failed to load your favorites.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // This function will be passed to AnimationCard to handle unfavoriting
  const handleUnfavorite = async (animationId: string) => {
    if (!user?.id) return
    try {
      const success = await AnimationService.removeFavoriteAnimation(user.id, animationId)
      if (success) {
        toast({
          title: "Removed from Favorites",
          description: "Animation removed from your favorites.",
        })
        loadFavoriteAnimations(user.id) // Reload favorites
      } else {
        toast({
          title: "Error",
          description: "Failed to remove from favorites.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error unfavoriting animation:", error)
      toast({
        title: "Error",
        description: "An error occurred while unfavoriting.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading favorites...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Favorites</h2>

      <Card>
        <CardHeader>
          <CardTitle>Your Liked Animations</CardTitle>
        </CardHeader>
        <CardContent>
          {favoriteAnimations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              You haven't favorited any animations yet.
            </div>
          ) : (
            <AnimationGrid animations={favoriteAnimations} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
