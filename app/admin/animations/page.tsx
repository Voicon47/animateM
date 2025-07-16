"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AnimationService } from "@/services/animation-service"
import type { Animation, AnimationCategory } from "@/types/animation"
import { AnimationForm } from "@/components/admin/animation-form"
import { DeleteConfirmationDialog } from "@/components/admin/delete-confirmation-dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AdminAnimationsPage() {
  const [animations, setAnimations] = useState<Animation[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<AnimationCategory | "All">("All")
  const [filterDifficulty, setFilterDifficulty] = useState<Animation["difficulty"] | "All">("All")
  const [filterPrice, setFilterPrice] = useState<"all" | "free" | "premium">("all")
  const [categories, setCategories] = useState<AnimationCategory[]>([])
  const { toast } = useToast()

  useEffect(() => {
    loadAnimations()
    loadCategories()
  }, [])

  const loadAnimations = async () => {
    setLoading(true)
    const data = await AnimationService.getAllAnimations()
    setAnimations(data)
    setLoading(false)
  }

  const loadCategories = () => {
    setCategories(AnimationService.getCategories())
  }

  const handleCreateNew = () => {
    setSelectedAnimation(null)
    setIsFormOpen(true)
  }

  const handleEdit = (animation: Animation) => {
    setSelectedAnimation(animation)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await AnimationService.deleteAnimation(id)
      toast({
        title: "Success",
        description: "Animation deleted successfully.",
      })
      loadAnimations()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete animation.",
        variant: "destructive",
      })
    }
  }

  const handleSave = async (animation: Animation) => {
    try {
      if (animation.id) {
        await AnimationService.updateAnimation(animation)
        toast({
          title: "Success",
          description: "Animation updated successfully.",
        })
      } else {
        await AnimationService.createAnimation(animation)
        toast({
          title: "Success",
          description: "Animation created successfully.",
        })
      }
      setIsFormOpen(false)
      loadAnimations()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save animation.",
        variant: "destructive",
      })
    }
  }

  const filteredAnimations = animations.filter((anim) => {
    const matchesSearch = anim.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || anim.category === filterCategory
    const matchesDifficulty = filterDifficulty === "All" || anim.difficulty === filterDifficulty
    const matchesPrice =
      filterPrice === "all" ||
      (filterPrice === "free" && !anim.isPremium) ||
      (filterPrice === "premium" && anim.isPremium)
    return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading animations...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Animations</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew}>Create New Animation</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedAnimation ? "Edit Animation" : "Create New Animation"}</DialogTitle>
              <DialogDescription>
                {selectedAnimation ? "Edit the details of this animation." : "Add a new animation to the collection."}
              </DialogDescription>
            </DialogHeader>
            <AnimationForm animation={selectedAnimation} onSave={handleSave} onCancel={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Animation List</CardTitle>
          <div className="flex flex-wrap gap-4 mt-4">
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={filterCategory}
              onValueChange={(value) => setFilterCategory(value as AnimationCategory | "All")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filterDifficulty}
              onValueChange={(value) => setFilterDifficulty(value as Animation["difficulty"] | "All")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Difficulties</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPrice} onValueChange={(value) => setFilterPrice(value as "all" | "free" | "premium")}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnimations.map((animation) => (
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
                  <TableCell>
                    <Badge variant={animation.isPremium ? "default" : "outline"}>{animation.price}</Badge>
                  </TableCell>
                  <TableCell>{animation.difficulty}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {animation.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(animation)}>
                        Edit
                      </Button>
                      <DeleteConfirmationDialog onConfirm={() => handleDelete(animation.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAnimations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No animations found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
