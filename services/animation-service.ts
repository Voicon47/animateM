"use client"

import type { Animation, AnimationCategory, FilterOptions, Category, Tag, User } from "@/types/animation"

// Mock data - in real app this would come from API
let mockAnimations: Animation[] = [
  {
    id: "1",
    title: "Fade In",
    description: "Smooth fade in animation with configurable duration and delay",
    category: "Transitions",
    animationType: "fade-in",
    price: "Free",
    isPremium: false,
    tags: ["fade", "transition", "opacity"],
    difficulty: "Beginner",
    codeExample: `
/* Fade In Animation */
.fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* React implementation (using Framer Motion) */
import { motion } from 'framer-motion';

export const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {children}
  </motion.div>
);
    `,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    title: "Slide Up",
    description: "Element slides up from below with customizable easing",
    category: "Transitions",
    animationType: "slide-up",
    price: "Free",
    isPremium: false,
    tags: ["slide", "transform", "transition"],
    difficulty: "Beginner",
    codeExample: `
/* Slide Up Animation */
.slide-up {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* React implementation (using Framer Motion) */
import { motion } from 'framer-motion';

export const SlideUp = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);
    `,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    title: "Pulse",
    description: "Pulsating animation perfect for notifications and highlights",
    category: "Loaders",
    animationType: "pulse",
    price: "$5",
    isPremium: true,
    tags: ["pulse", "scale", "attention"],
    difficulty: "Beginner",
    codeExample: `
/* Pulse Animation */
.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: .5;
    transform: scale(1.05);
  }
}

/* React implementation (using Framer Motion) */
import { motion } from 'framer-motion';

export const Pulse = ({ children }) => (
  <motion.div
    animate={{ 
      scale: [1, 1.05, 1],
      opacity: [1, 0.5, 1]
    }}
    transition={{ 
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  >
    {children}
  </motion.div>
);
    `,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    title: "Bounce",
    description: "Playful bouncing animation with natural physics",
    category: "Hover Effects",
    animationType: "bounce",
    price: "Free",
    isPremium: false,
    tags: ["bounce", "physics", "playful"],
    difficulty: "Intermediate",
    codeExample: `
/* Bounce Animation */
.bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* React implementation (using Framer Motion) */
import { motion } from 'framer-motion';

export const Bounce = ({ children }) => (
  <motion.div
    animate={{ 
      y: ["0%", "-25%", "0%"]
    }}
    transition={{ 
      duration: 1,
      ease: ["cubic-bezier(0.8, 0, 1, 1)", "cubic-bezier(0, 0, 0.2, 1)"],
      repeat: Infinity,
    }}
  >
    {children}
  </motion.div>
);
    `,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    title: "Flip Card",
    description: "3D card flip effect with front and back sides",
    category: "3D Effects",
    animationType: "flip",
    price: "$10",
    isPremium: true,
    tags: ["3d", "flip", "card", "perspective"],
    difficulty: "Advanced",
    codeExample: `
/* Flip Card Animation */
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

/* React implementation (using Framer Motion) */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="flip-card" 
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="flip-card-inner"
        style={{ 
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d'
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div 
          className="flip-card-front"
          style={{ 
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden'
          }}
        >
          {front}
        </div>
        <div 
          className="flip-card-back"
          style={{ 
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};
    `,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    title: "Text Wave",
    description: "Character-by-character wave animation for text",
    category: "Text Effects",
    animationType: "text-wave",
    price: "$8",
    isPremium: true,
    tags: ["text", "wave", "characters"],
    difficulty: "Intermediate",
    codeExample: `
/* Text Wave Animation */
.wave-text span {
  display: inline-block;
  animation: wave 1s infinite;
  animation-delay: calc(0.1s * var(--i));
}

@keyframes wave {
  0%, 40%, 100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-15px);
  }
}

/* React implementation (using Framer Motion) */
import React from 'react';
import { motion } from 'framer-motion';

export const WaveText = ({ text }) => {
  return (
    <div className="wave-text">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          style={{ display: 'inline-block' }}
          animate={{ y: [0, -15, 0] }}
          transition={{ 
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            delay: index * 0.1,
            times: [0, 0.2, 0.4, 1]
          }}
        >
          {char === ' ' ? '\\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};
    `,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "7",
    title: "Scale",
    description: "Smooth scaling animation with configurable origin point",
    category: "Transitions",
    animationType: "scale",
    price: "Free",
    isPremium: false,
    tags: ["scale", "transform", "size"],
    difficulty: "Beginner",
    codeExample: `
/* Scale Animation */
.scale {
  animation: scale 2s ease-in-out infinite;
}

@keyframes scale {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.8);
  }
}

/* React implementation (using Framer Motion) */
import { motion } from 'framer-motion';

export const Scale = ({ children }) => (
  <motion.div
    animate={{ 
      scale: [0.8, 1.2, 0.8]
    }}
    transition={{ 
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  >
    {children}
  </motion.div>
);
    `,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "8",
    title: "Shimmer",
    description: "Content placeholder shimmer effect for loading states",
    category: "Loaders",
    animationType: "shimmer",
    price: "$5",
    isPremium: true,
    tags: ["shimmer", "loading", "skeleton"],
    difficulty: "Intermediate",
    codeExample: `
/* Shimmer Animation */
.shimmer {
  position: relative;
  overflow: hidden;
  background: #f6f7f8;
}

.shimmer::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
  content: '';
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* React implementation (using Framer Motion) */
import React from 'react';
import { motion } from 'framer-motion';

export const Shimmer = ({ width = '100%', height = '20px' }) => {
  return (
    <div 
      style={{ 
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        background: '#f6f7f8',
        borderRadius: '4px'
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0) 100%)',
        }}
        animate={{ x: ['calc(-100%)', 'calc(100%)'] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};
    `,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "9",
    title: "Rotate",
    description: "Rotation animation with customizable degrees and origin",
    category: "Transitions",
    animationType: "rotate",
    price: "Free",
    isPremium: false,
    tags: ["rotate", "transform", "spin"],
    difficulty: "Beginner",
    codeExample: `
/* Rotate Animation */
.rotate {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* React implementation (using Framer Motion) */
import { motion } from 'framer-motion';

export const Rotate = ({ children }) => (
  <motion.div
    animate={{ 
      rotate: 360
    }}
    transition={{ 
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    }}
  >
    {children}
  </motion.div>
);
    `,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
]

let mockCategories: Category[] = [
  { id: "cat1", name: "Transitions", description: "Smooth transitions between states.", animationCount: 0 },
  { id: "cat2", name: "Loaders", description: "Engaging loading indicators.", animationCount: 0 },
  { id: "cat3", name: "Hover Effects", description: "Interactive effects on hover.", animationCount: 0 },
  { id: "cat4", name: "Text Effects", description: "Dynamic text animations.", animationCount: 0 },
  { id: "cat5", name: "Layout", description: "Animations for layout changes.", animationCount: 0 },
  { id: "cat6", name: "3D Effects", description: "Animations with depth and perspective.", animationCount: 0 },
]

let mockTags: Tag[] = [
  { id: "tag1", name: "fade", animationCount: 0 },
  { id: "tag2", name: "transition", animationCount: 0 },
  { id: "tag3", name: "opacity", animationCount: 0 },
  { id: "tag4", name: "slide", animationCount: 0 },
  { id: "tag5", name: "transform", animationCount: 0 },
  { id: "tag6", name: "pulse", animationCount: 0 },
  { id: "tag7", name: "scale", animationCount: 0 },
  { id: "tag8", name: "attention", animationCount: 0 },
  { id: "tag9", name: "bounce", animationCount: 0 },
  { id: "tag10", name: "physics", animationCount: 0 },
  { id: "tag11", name: "playful", animationCount: 0 },
  { id: "tag12", name: "3d", animationCount: 0 },
  { id: "tag13", name: "flip", animationCount: 0 },
  { id: "tag14", name: "card", animationCount: 0 },
  { id: "tag15", name: "perspective", animationCount: 0 },
  { id: "tag16", name: "text", animationCount: 0 },
  { id: "tag17", name: "wave", animationCount: 0 },
  { id: "tag18", name: "characters", animationCount: 0 },
  { id: "tag19", name: "size", animationCount: 0 },
  { id: "tag20", name: "shimmer", animationCount: 0 },
  { id: "tag21", name: "loading", animationCount: 0 },
  { id: "tag22", name: "skeleton", animationCount: 0 },
  { id: "tag23", name: "rotate", animationCount: 0 },
  { id: "tag24", name: "spin", animationCount: 0 },
]

const mockUsers: User[] = [
  {
    id: "user1",
    email: "admin@example.com",
    password: "password",
    role: "admin",
    registeredAt: "2023-01-15",
    status: "active",
    firstName: "Admin",
    lastName: "User",
    avatar: "/placeholder.svg?height=100&width=100",
    purchasedAnimations: ["3", "5", "6", "8"], // Premium animations
    favoriteAnimations: ["1", "4", "7"],
  },
  {
    id: "user2",
    email: "user@example.com",
    password: "password",
    role: "user",
    registeredAt: "2023-02-20",
    status: "active",
    firstName: "Regular",
    lastName: "User",
    avatar: "/placeholder.svg?height=100&width=100",
    purchasedAnimations: ["3"], // One premium animation
    favoriteAnimations: ["2", "9"],
  },
]

// Helper to update counts for categories and tags
const updateCounts = () => {
  mockCategories.forEach((cat) => {
    cat.animationCount = mockAnimations.filter((anim) => anim.category === cat.name).length
  })
  mockTags.forEach((tag) => {
    tag.animationCount = mockAnimations.filter((anim) => anim.tags.includes(tag.name)).length
  })
}
updateCounts() // Initial count update

export class AnimationService {
  // --- Animations CRUD ---
  static async getAllAnimations(): Promise<Animation[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockAnimations]), 100)
    })
  }

  static async getAnimationById(id: string): Promise<Animation | null> {
    const animations = await this.getAllAnimations()
    return animations.find((animation) => animation.id === id) || null
  }

  static async createAnimation(newAnimation: Omit<Animation, "id">): Promise<Animation> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const animation: Animation = {
          id: (mockAnimations.length + 1).toString(), // Simple ID generation
          ...newAnimation,
        }
        mockAnimations.push(animation)
        updateCounts()
        resolve(animation)
      }, 100)
    })
  }

  static async updateAnimation(updatedAnimation: Animation): Promise<Animation | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockAnimations.findIndex((anim) => anim.id === updatedAnimation.id)
        if (index !== -1) {
          mockAnimations[index] = updatedAnimation
          updateCounts()
          resolve(updatedAnimation)
        } else {
          resolve(null)
        }
      }, 100)
    })
  }

  static async deleteAnimation(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockAnimations.length
        mockAnimations = mockAnimations.filter((anim) => anim.id !== id)
        updateCounts()
        resolve(mockAnimations.length < initialLength)
      }, 100)
    })
  }

  // --- Categories CRUD ---
  static async getAllCategories(): Promise<Category[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockCategories]), 100)
    })
  }

  static async createCategory(newCategory: Omit<Category, "id" | "animationCount">): Promise<Category> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category: Category = {
          id: `cat${mockCategories.length + 1}`,
          ...newCategory,
          animationCount: 0, // Will be updated by updateCounts
        }
        mockCategories.push(category)
        updateCounts()
        resolve(category)
      }, 100)
    })
  }

  static async updateCategory(updatedCategory: Category): Promise<Category | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockCategories.findIndex((cat) => cat.id === updatedCategory.id)
        if (index !== -1) {
          mockCategories[index] = { ...updatedCategory, animationCount: mockCategories[index].animationCount } // Preserve count
          resolve(updatedCategory)
        } else {
          resolve(null)
        }
      }, 100)
    })
  }

  static async deleteCategory(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockCategories.length
        mockCategories = mockCategories.filter((cat) => cat.id !== id)
        resolve(mockCategories.length < initialLength)
      }, 100)
    })
  }

  // --- Tags CRUD ---
  static async getAllTags(): Promise<Tag[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockTags]), 100)
    })
  }

  static async createTag(newTag: Omit<Tag, "id" | "animationCount">): Promise<Tag> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tag: Tag = {
          id: `tag${mockTags.length + 1}`,
          ...newTag,
          animationCount: 0, // Will be updated by updateCounts
        }
        mockTags.push(tag)
        updateCounts()
        resolve(tag)
      }, 100)
    })
  }

  static async deleteTag(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockTags.length
        mockTags = mockTags.filter((tag) => tag.id !== id)
        resolve(mockTags.length < initialLength)
      }, 100)
    })
  }

  // --- Users (Mock) ---
  static async getAllUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockUsers]), 100)
    })
  }

  static async getUser(email: string): Promise<User | undefined> {
    const users = await this.getAllUsers()
    return users.find((user) => user.email === email)
  }

  static async getUserById(id: string): Promise<User | undefined> {
    const users = await this.getAllUsers()
    return users.find((user) => user.id === id)
  }

  static async createUser(
    newUser: Omit<User, "id" | "registeredAt" | "status" | "purchasedAnimations" | "favoriteAnimations">,
  ): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: `user${mockUsers.length + 1}`,
          ...newUser,
          role: newUser.role || "user", // Default to 'user' if not specified
          registeredAt: new Date().toISOString().split("T")[0],
          status: "active",
          firstName: newUser.firstName || "",
          lastName: newUser.lastName || "",
          avatar: newUser.avatar || "/placeholder.svg?height=100&width=100",
          purchasedAnimations: [],
          favoriteAnimations: [],
        }
        mockUsers.push(user)
        resolve(user)
      }, 100)
    })
  }

  static async updateUser(updatedUser: User): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((user) => user.id === updatedUser.id)
        if (index !== -1) {
          mockUsers[index] = updatedUser
          resolve(updatedUser)
        } else {
          resolve(null)
        }
      }, 100)
    })
  }

  static async updateUserProfile(
    userId: string,
    updates: { firstName?: string; lastName?: string; avatar?: string },
  ): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((user) => user.id === userId)
        if (index !== -1) {
          mockUsers[index] = { ...mockUsers[index], ...updates }
          resolve(mockUsers[index])
        } else {
          resolve(null)
        }
      }, 100)
    })
  }

  static async updateUserPassword(userId: string, newPasswordHash: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((user) => user.id === userId)
        if (index !== -1) {
          mockUsers[index].password = newPasswordHash // In a real app, this would be a hashed password
          resolve(true)
        } else {
          resolve(false)
        }
      }, 100)
    })
  }

  static async addFavoriteAnimation(userId: string, animationId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === userId)
        if (user && !user.favoriteAnimations?.includes(animationId)) {
          user.favoriteAnimations = [...(user.favoriteAnimations || []), animationId]
          resolve(true)
        } else {
          resolve(false)
        }
      }, 100)
    })
  }

  static async removeFavoriteAnimation(userId: string, animationId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === userId)
        if (user) {
          const initialLength = user.favoriteAnimations?.length || 0
          user.favoriteAnimations = (user.favoriteAnimations || []).filter((id) => id !== animationId)
          resolve((user.favoriteAnimations?.length || 0) < initialLength)
        } else {
          resolve(false)
        }
      }, 100)
    })
  }

  static async getFavoriteAnimations(userId: string): Promise<Animation[]> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const user = await this.getUserById(userId)
        if (user && user.favoriteAnimations) {
          const allAnimations = await this.getAllAnimations()
          const favorites = allAnimations.filter((anim) => user.favoriteAnimations?.includes(anim.id))
          resolve(favorites)
        } else {
          resolve([])
        }
      }, 100)
    })
  }

  static async getPurchasedAnimations(userId: string): Promise<Animation[]> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const user = await this.getUserById(userId)
        if (user && user.purchasedAnimations) {
          const allAnimations = await this.getAllAnimations()
          const purchased = allAnimations.filter((anim) => user.purchasedAnimations?.includes(anim.id))
          resolve(purchased)
        } else {
          resolve([])
        }
      }, 100)
    })
  }

  // --- Existing methods ---
  static async getAnimationsByCategory(category: AnimationCategory): Promise<Animation[]> {
    const animations = await this.getAllAnimations()
    return animations.filter((animation) => animation.category === category)
  }

  static async searchAnimations(filters: FilterOptions): Promise<Animation[]> {
    const animations = await this.getAllAnimations()

    return animations.filter((animation) => {
      // Category filter
      if (filters.category && animation.category !== filters.category) {
        return false
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const searchableText = `${animation.title} ${animation.description} ${animation.tags.join(" ")}`.toLowerCase()
        if (!searchableText.includes(query)) {
          return false
        }
      }

      // Price filter
      if (filters.priceFilter) {
        if (filters.priceFilter === "free" && animation.isPremium) {
          return false
        }
        if (filters.priceFilter === "premium" && !animation.isPremium) {
          return false
        }
      }

      // Difficulty filter
      if (filters.difficulty && animation.difficulty !== filters.difficulty) {
        return false
      }

      return true
    })
  }

  static async getRelatedAnimations(animation: Animation, limit = 3): Promise<Animation[]> {
    const animations = await this.getAllAnimations()

    // Filter out the current animation and get animations with the same category or tags
    const related = animations
      .filter((a) => a.id !== animation.id)
      .filter((a) => a.category === animation.category || a.tags.some((tag) => animation.tags.includes(tag)))
      .slice(0, limit)

    return related
  }

  static getCategories(): AnimationCategory[] {
    return mockCategories.map((cat) => cat.name)
  }
}
