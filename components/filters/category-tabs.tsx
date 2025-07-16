"use client"

import type React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AnimationCategory } from "@/types/animation"
import { useAppSelector } from "@/hooks/use-app-selector" // Corrected import
import { useAppDispatch } from "@/hooks/use-app-dispatch" // Corrected import
import { setActiveCategory } from "@/store/features/filter/filterSlice"

interface CategoryTabsProps {
  categories: (AnimationCategory | "All")[]
  children: React.ReactNode
}

export default function CategoryTabs({ categories, children }: CategoryTabsProps) {
  const dispatch = useAppDispatch()
  const activeCategory = useAppSelector((state) => state.filters.activeCategory)

  const handleCategoryChange = (value: string) => {
    dispatch(setActiveCategory(value as AnimationCategory | "All"))
  }

  return (
    <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="text-xs">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={activeCategory} className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  )
}
