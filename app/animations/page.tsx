"use client"

import { useState, useEffect } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import SearchInput from "@/components/common/search-input"
import CategoryTabs from "@/components/filters/category-tabs"
import AnimationGrid from "@/components/animations/animation-grid"
import AnimationDetailModal from "@/components/animations/animation-detail-modal"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Animation, AnimationCategory, FilterOptions } from "@/types/animation"
import { AnimationService } from "@/services/animation-service"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/hooks/use-app-selector" // Corrected import
import { useAppDispatch } from "@/hooks/use-app-dispatch" // Corrected import
import { setSearchQuery, setPriceFilter, setDifficulty } from "@/store/features/filter/filterSlice"

export default function AnimationsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { searchQuery, activeCategory, priceFilter, difficulty } = useAppSelector((state) => state.filters)

  const [animations, setAnimations] = useState<Animation[]>([])
  const [filteredAnimations, setFilteredAnimations] = useState<Animation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories: (AnimationCategory | "All")[] = ["All", ...AnimationService.getCategories()]

  useEffect(() => {
    loadAnimations()
  }, [])

  useEffect(() => {
    filterAnimations()
  }, [animations, searchQuery, activeCategory, priceFilter, difficulty]) // Depend on Redux state

  const loadAnimations = async () => {
    try {
      setLoading(true)
      const data = await AnimationService.getAllAnimations()
      setAnimations(data)
    } catch (error) {
      console.error("Failed to load animations:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAnimations = async () => {
    const filters: FilterOptions = {
      searchQuery: searchQuery || undefined,
      category: activeCategory === "All" ? undefined : activeCategory,
      priceFilter: priceFilter,
      difficulty: difficulty === "All" ? undefined : difficulty,
    }

    try {
      const filtered = await AnimationService.searchAnimations(filters)
      setFilteredAnimations(filtered)
    } catch (error) {
      console.error("Failed to filter animations:", error)
      setFilteredAnimations([])
    }
  }

  const handleViewDetails = (animation: Animation) => {
    setSelectedAnimation(animation)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="text-center py-24">Loading animations...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">All Animations</h1>
            <p className="text-muted-foreground">Browse our complete collection of React animations</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <SearchInput
              value={searchQuery}
              onChange={(value) => dispatch(setSearchQuery(value))}
              placeholder="Search animations..."
            />
            <Select
              value={priceFilter}
              onValueChange={(value: "all" | "free" | "premium") => dispatch(setPriceFilter(value))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={difficulty}
              onValueChange={(value: Animation["difficulty"] | "All") => dispatch(setDifficulty(value))}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Difficulties</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <CategoryTabs categories={categories}>
          <AnimationGrid animations={filteredAnimations} onViewDetails={handleViewDetails} />
        </CategoryTabs>

        <AnimationDetailModal
          animation={selectedAnimation}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
      <Footer />
    </div>
  )
}
