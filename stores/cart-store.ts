import { create } from "zustand"
import type { Animation } from "@/types/animation"

interface CartItem extends Animation {
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (animation: Animation) => void
  removeItem: (animationId: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: (animation) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === animation.id)
      let newItems
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === animation.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        newItems = [...state.items, { ...animation, quantity: 1 }]
      }
      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const newTotalPrice = newItems.reduce((sum, item) => {
        const priceValue = Number.parseFloat(item.price.replace("$", "")) || 0
        return sum + priceValue * item.quantity
      }, 0)
      return { items: newItems, totalItems: newTotalItems, totalPrice: newTotalPrice }
    })
  },
  removeItem: (animationId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== animationId)
      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const newTotalPrice = newItems.reduce((sum, item) => {
        const priceValue = Number.parseFloat(item.price.replace("$", "")) || 0
        return sum + priceValue * item.quantity
      }, 0)
      return { items: newItems, totalItems: newTotalItems, totalPrice: newTotalPrice }
    })
  },
  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}))
