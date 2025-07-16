"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimationPreview from "@/components/animations/animation-preview"
import AnimationGrid from "@/components/animations/animation-grid"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { AnimationService } from "@/services/animation-service"
import type { Animation } from "@/types/animation"
import { useCartStore } from "@/stores/cart-store"
import { useAuthStore } from "@/stores/auth-store" // Import Auth Zustand store

export default function AnimationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const addItemToCart = useCartStore((state) => state.addItem)
  const { user } = useAuthStore() // Get user from Auth Zustand store
  const userRole = user?.role || "guest"

  const [animation, setAnimation] = useState<Animation | null>(null)
  const [relatedAnimations, setRelatedAnimations] = useState<Animation[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("preview")

  useEffect(() => {
    if (params.id) {
      loadAnimation(params.id as string)
    }
  }, [params.id])

  const loadAnimation = async (id: string) => {
    try {
      setLoading(true)
      const data = await AnimationService.getAnimationById(id)

      if (data) {
        setAnimation(data)
        const related = await AnimationService.getRelatedAnimations(data)
        setRelatedAnimations(related)
      } else {
        // Animation not found
        router.push("/")
      }
    } catch (error) {
      console.error("Failed to load animation:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (animation && userRole !== "guest") {
      addItemToCart(animation)
      console.log("Added to cart:", animation.title)
    }
  }

  const handleViewDetails = (animation: Animation) => {
    router.push(`/animations/${animation.id}`)
  }

  if (loading || !animation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="text-center py-24">Loading animation details...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{animation.title}</h1>
              <p className="text-muted-foreground mb-4">{animation.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant={animation.isPremium ? "default" : "outline"}>
                  {animation.isPremium ? "Premium" : "Free"}
                </Badge>
                <Badge variant="secondary">{animation.category}</Badge>
                <Badge
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
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                {userRole !== "guest" && <TabsTrigger value="code">Source Code</TabsTrigger>}
              </TabsList>
              <TabsContent value="preview" className="p-4 border rounded-md mt-2">
                <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                  <AnimationPreview type={animation.animationType} className="h-60 w-60" />
                </div>
              </TabsContent>
              {userRole !== "guest" && (
                <TabsContent value="code" className="mt-2">
                  <CodeBlock
                    code={animation.codeExample || "/* Code example not available */"}
                    language="css"
                    className="min-h-[300px]"
                  />
                </TabsContent>
              )}
            </Tabs>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {animation.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {relatedAnimations.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Related Animations</h2>
                <AnimationGrid
                  animations={relatedAnimations}
                  onViewDetails={handleViewDetails}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                />
              </div>
            )}
          </div>

          <div className="bg-muted/20 p-6 rounded-lg h-fit sticky top-24">
            <div className="text-2xl font-bold mb-2">{animation.price}</div>
            <p className="text-muted-foreground mb-6">
              {animation.isPremium ? "One-time purchase, lifetime access" : "Free to use in any project"}
            </p>

            {userRole !== "guest" && (
              <div className="space-y-4">
                <Button className="w-full" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {animation.isPremium ? "Add to Cart" : "Download"}
                </Button>

                <Button variant="outline" className="w-full" size="lg">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-2">What's included:</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Full source code</li>
                <li>✓ CSS and React implementations</li>
                <li>✓ Documentation</li>
                <li>✓ License for unlimited projects</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
