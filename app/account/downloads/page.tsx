"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimationService } from "@/services/animation-service"
import type { Animation } from "@/types/animation"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"
import { useAuthStore } from "@/stores/auth-store"
import { useToast } from "@/hooks/use-toast"

export default function AccountDownloadsPage() {
  const { user } = useAuthStore()
  const { toast } = useToast()
  const [purchasedAnimations, setPurchasedAnimations] = useState<Animation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      loadPurchasedAnimations(user.id)
    }
  }, [user])

  const loadPurchasedAnimations = async (userId: string) => {
    setLoading(true)
    try {
      const data = await AnimationService.getPurchasedAnimations(userId)
      setPurchasedAnimations(data)
    } catch (error) {
      console.error("Failed to load purchased animations:", error)
      toast({
        title: "Error",
        description: "Failed to load your downloads.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (animation: Animation) => {
    // Simulate file download
    toast({
      title: "Download Started",
      description: `Downloading "${animation.title}"... (mock download)`,
    })
    // In a real application, you would initiate a file download here.
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading downloads...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Downloads & Purchases</h2>

      <Card>
        <CardHeader>
          <CardTitle>Your Animations</CardTitle>
        </CardHeader>
        <CardContent>
          {purchasedAnimations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              You haven't downloaded or purchased any animations yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Thumbnail</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchasedAnimations.map((animation) => (
                  <TableRow key={animation.id}>
                    <TableCell>
                      <Image
                        src={animation.thumbnail || "/placeholder.svg"}
                        alt={animation.title}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{animation.title}</TableCell>
                    <TableCell>{animation.category}</TableCell>
                    <TableCell>{animation.price}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => handleDownload(animation)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
