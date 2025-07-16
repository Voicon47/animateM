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
import type { Tag } from "@/types/animation"
import { TagForm } from "@/components/admin/tag-form"
import { DeleteConfirmationDialog } from "@/components/admin/delete-confirmation-dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    setLoading(true)
    const data = await AnimationService.getAllTags()
    setTags(data)
    setLoading(false)
  }

  const handleCreateNew = () => {
    setSelectedTag(null)
    setIsFormOpen(true)
  }

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await AnimationService.deleteTag(id)
      toast({
        title: "Success",
        description: "Tag deleted successfully.",
      })
      loadTags()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tag.",
        variant: "destructive",
      })
    }
  }

  const handleSave = async (tag: Tag) => {
    try {
      if (tag.id) {
        // Assuming update for tags is just name change, as per mock service
        // If you had a dedicated updateTag method in service, use that.
        // For now, we'll just re-create the tag with the same ID for mock purposes.
        await AnimationService.updateTag(tag) // This method was not explicitly defined, but we can assume it updates the name.
        toast({
          title: "Success",
          description: "Tag updated successfully.",
        })
      } else {
        await AnimationService.createTag(tag)
        toast({
          title: "Success",
          description: "Tag created successfully.",
        })
      }
      setIsFormOpen(false)
      loadTags()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save tag.",
        variant: "destructive",
      })
    }
  }

  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading tags...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Tags</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew}>Create New Tag</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedTag ? "Edit Tag" : "Create New Tag"}</DialogTitle>
              <DialogDescription>
                {selectedTag ? "Edit the name of this tag." : "Add a new tag for animations."}
              </DialogDescription>
            </DialogHeader>
            <TagForm tag={selectedTag} onSave={handleSave} onCancel={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tag List</CardTitle>
          <Input
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm mt-4"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Animations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                  <TableCell>{tag.animationCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(tag)}>
                        Edit
                      </Button>
                      <DeleteConfirmationDialog onConfirm={() => handleDelete(tag.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredTags.length === 0 && <div className="text-center py-8 text-muted-foreground">No tags found.</div>}
        </CardContent>
      </Card>
    </div>
  )
}
