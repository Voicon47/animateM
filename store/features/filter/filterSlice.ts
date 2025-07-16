import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AnimationCategory, Animation } from "@/types/animation"

interface FilterState {
  searchQuery: string
  activeCategory: AnimationCategory | "All"
  priceFilter: "all" | "free" | "premium"
  difficulty: Animation["difficulty"] | "All"
}

const initialState: FilterState = {
  searchQuery: "",
  activeCategory: "All",
  priceFilter: "all",
  difficulty: "All",
}

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setActiveCategory: (state, action: PayloadAction<AnimationCategory | "All">) => {
      state.activeCategory = action.payload
    },
    setPriceFilter: (state, action: PayloadAction<"all" | "free" | "premium">) => {
      state.priceFilter = action.payload
    },
    setDifficulty: (state, action: PayloadAction<Animation["difficulty"] | "All">) => {
      state.difficulty = action.payload
    },
    resetFilters: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { setSearchQuery, setActiveCategory, setPriceFilter, setDifficulty, resetFilters } = filterSlice.actions
export default filterSlice.reducer
