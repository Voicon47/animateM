import { create } from "zustand"
import type { User } from "@/types/animation"

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void
  setGuest: () => void // New action to set guest user
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "guest",
    email: "guest@example.com",
    role: "guest",
    registeredAt: new Date().toISOString().split("T")[0],
    status: "active",
  }, // Initialize as guest
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () =>
    set({
      user: {
        id: "guest",
        email: "guest@example.com",
        role: "guest",
        registeredAt: new Date().toISOString().split("T")[0],
        status: "active",
      },
      isLoggedIn: false,
    }),
  setGuest: () =>
    set({
      user: {
        id: "guest",
        email: "guest@example.com",
        role: "guest",
        registeredAt: new Date().toISOString().split("T")[0],
        status: "active",
      },
      isLoggedIn: false,
    }),
}))
