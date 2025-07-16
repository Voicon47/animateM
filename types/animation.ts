export interface Animation {
  id: string
  title: string
  description: string
  category: AnimationCategory
  animationType: AnimationType
  price: string
  isPremium: boolean
  tags: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  codeExample?: string
  thumbnail?: string // Added for admin panel
}

export type AnimationCategory = "Transitions" | "Loaders" | "Hover Effects" | "Text Effects" | "Layout" | "3D Effects"

export type AnimationType =
  | "fade-in"
  | "slide-up"
  | "pulse"
  | "bounce"
  | "flip"
  | "text-wave"
  | "scale"
  | "shimmer"
  | "rotate"
  | "float"

export interface FilterOptions {
  category?: AnimationCategory
  searchQuery?: string
  priceFilter?: "all" | "free" | "premium"
  difficulty?: Animation["difficulty"]
}

// New types for Admin Panel
export interface Category {
  id: string
  name: AnimationCategory
  description: string
  animationCount: number // Readonly, derived
}

export interface Tag {
  id: string
  name: string
  animationCount: number // Readonly, derived
}

export interface User {
  id: string
  email: string
  password?: string // Only for mock, never store in real app
  role: "user" | "admin" | "guest" // Added 'guest' role
  registeredAt: string
  status: "active" | "blocked"
  firstName?: string // New
  lastName?: string // New
  avatar?: string // New
  purchasedAnimations?: string[] // New: array of animation IDs
  favoriteAnimations?: string[] // New: array of animation IDs
}
