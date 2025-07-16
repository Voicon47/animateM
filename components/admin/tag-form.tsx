"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Tag } from "@/types/animation"
import { DialogFooter } from "../ui/dialog"

interface TagFormProps {
  tag?: Tag | null
  onSave: (tag: Tag) => void
  onCancel: () => void
}

export function TagForm({ tag, onSave, onCancel }: TagFormProps) {
  const [formData, setFormData] = useState<Omit<Tag, "id" | "animationCount">>(
    tag || {
      name: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: tag?.id || "", animationCount: tag?.animationCount || 0 } as Tag)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Tag Name
        </Label>
        <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
      </div>

      <DialogFooter className="mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{tag ? "Save Changes" : "Create Tag"}</Button>
      </DialogFooter>
    </form>
  )
}
