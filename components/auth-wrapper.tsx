"use client"

import type React from "react"

import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth-store"

interface AuthWrapperProps {
  children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { login, setGuest, isLoggedIn } = useAuthStore()

  useEffect(() => {
    // This effect runs only once on mount to set initial auth state
    // In a real application, you would check for a session cookie or token here.
    // For this mock, we'll assume if no user is explicitly logged in, they are a guest.
    const checkAuthStatus = async () => {
      // Simulate checking for a logged-in user (e.g., from a session or local storage)
      // For now, if isLoggedIn is false, we explicitly set to guest.
      if (!isLoggedIn) {
        setGuest()
      }
    }
    checkAuthStatus()
  }, [isLoggedIn, setGuest])

  return <>{children}</>
}
