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
import type { Category } from "@/types/animation"
import { CategoryForm } from "@/components/admin/category-form"
import { DeleteConfirmationDialog } from "@/components/admin/delete-confirmation-dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    const data = await AnimationService.getAllCategories()
    setCategories(data)
    setLoading(false)
  }

  const handleCreateNew = () => {
    setSelectedCategory(null)
    setIsFormOpen(true)
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await AnimationService.deleteCategory(id)
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      })
      loadCategories()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category.",
        variant: "destructive",
      })
    }
  }

  const handleSave = async (category: Category) => {
    try {
      if (category.id) {
        await AnimationService.updateCategory(category)
        toast({
          title: "Success",
          description: "Category updated successfully.",
        })
      } else {
        await AnimationService.createCategory(category)
        toast({
          title: "Success",
          description: "Category created successfully.",
        })
      }
      setIsFormOpen(false)
      loadCategories()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save category.",
        variant: "destructive",
      })
    }
  }

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading categories...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew}>Create New Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
              <DialogDescription>
                {selectedCategory ? "Edit the details of this category." : "Add a new category for animations."}
              </DialogDescription>
            </DialogHeader>
            <CategoryForm category={selectedCategory} onSave={handleSave} onCancel={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
          <Input
            placeholder="Search categories..."
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
                <TableHead>Description</TableHead>
                <TableHead>Animations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.animationCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                        Edit
                      </Button>
                      <DeleteConfirmationDialog onConfirm={() => handleDelete(category.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCategories.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No categories found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
