"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AnimationService } from "@/services/animation-service"
import type { Animation, AnimationCategory } from "@/types/animation"
import { DialogFooter } from "../ui/dialog"

interface AnimationFormProps {
  animation?: Animation | null
  onSave: (animation: Animation) => void
  onCancel: () => void
}

export function AnimationForm({ animation, onSave, onCancel }: AnimationFormProps) {
  const [formData, setFormData] = useState<Omit<Animation, "id">>(
    animation || {
      title: "",
      description: "",
      category: "Transitions",
      animationType: "fade-in",
      price: "Free",
      isPremium: false,
      tags: [],
      difficulty: "Beginner",
      codeExample: "",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
  )
  const [categories, setCategories] = useState<AnimationCategory[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [newTagInput, setNewTagInput] = useState("")

  useEffect(() => {
    const loadData = async () => {
      const fetchedCategories = AnimationService.getCategories()
      setCategories(fetchedCategories)
      const fetchedTags = (await AnimationService.getAllTags()).map((tag) => tag.name)
      setAllTags(fetchedTags)
    }
    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (id: keyof Omit<Animation, "id">, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleTagAdd = () => {
    if (newTagInput && !formData.tags.includes(newTagInput)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTagInput],
      }))
      setNewTagInput("")
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: animation?.id || "" } as Animation)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleSelectChange("category", value as AnimationCategory)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="animationType" className="text-right">
          Animation Type
        </Label>
        <Select
          value={formData.animationType}
          onValueChange={(value) => handleSelectChange("animationType", value as Animation["animationType"])}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select animation type" />
          </SelectTrigger>
          <SelectContent>
            {["fade-in", "slide-up", "pulse", "bounce", "flip", "text-wave", "scale", "shimmer", "rotate", "float"].map(
              (type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input id="price" value={formData.price} onChange={handleChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="isPremium" className="text-right">
          Premium
        </Label>
        <Switch
          id="isPremium"
          checked={formData.isPremium}
          onCheckedChange={(checked) => handleSelectChange("isPremium", checked)}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="difficulty" className="text-right">
          Difficulty
        </Label>
        <Select
          value={formData.difficulty}
          onValueChange={(value) => handleSelectChange("difficulty", value as Animation["difficulty"])}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            {["Beginner", "Intermediate", "Advanced"].map((diff) => (
              <SelectItem key={diff} value={diff}>
                {diff}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tags" className="text-right">
          Tags
        </Label>
        <div className="col-span-3 flex flex-wrap items-center gap-2">
          {formData.tags.map((tag) => (
            <Button key={tag} variant="outline" size="sm" onClick={() => handleTagRemove(tag)}>
              {tag} <span className="ml-1 text-xs">x</span>
            </Button>
          ))}
          <Input
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleTagAdd())}
            placeholder="Add new tag or select existing"
            className="flex-1 min-w-[100px]"
          />
          <Button type="button" onClick={handleTagAdd} size="sm">
            Add Tag
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="codeExample" className="text-right">
          Code Example
        </Label>
        <Textarea id="codeExample" value={formData.codeExample} onChange={handleChange} className="col-span-3 h-32" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="thumbnail" className="text-right">
          Thumbnail URL
        </Label>
        <Input id="thumbnail" value={formData.thumbnail} onChange={handleChange} className="col-span-3" />
      </div>

      <DialogFooter className="mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{animation ? "Save Changes" : "Create Animation"}</Button>
      </DialogFooter>
    </form>
  )
}
