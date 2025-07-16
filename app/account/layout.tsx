"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, User, Download, Heart } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AnimatedLogo from "@/components/common/animated-logo"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth-store"
import { ThemeToggle } from "@/components/theme-toggle"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoggedIn, logout } = useAuthStore()
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    // Redirect guests from account pages
    if (!isLoggedIn || user?.role === "guest") {
      router.push("/login?redirect=/account")
    } else {
      setHasAccess(true)
    }
  }, [isLoggedIn, user, router])

  if (!hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <p className="text-lg text-muted-foreground">Access Denied. Redirecting to login...</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <Toaster />
      <SidebarProvider defaultOpen={true}>
        <Sidebar collapsible="offcanvas">
          <SidebarHeader>
            <Link href="/account" className="flex items-center gap-2 p-2">
              <AnimatedLogo />
              <span className="text-xl font-bold">My Account</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/account"}>
                      <Link href="/account">
                        <User />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith("/account/downloads")}>
                      <Link href="/account/downloads">
                        <Download />
                        <span>Downloads</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith("/account/favorites")}>
                      <Link href="/account/favorites">
                        <Heart />
                        <span>Favorites</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home />
                    <span>Back to Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <h1 className="text-xl font-semibold">Account Settings</h1>
            <div className="ml-auto flex items-center gap-2">
              {user && (
                <span className="text-sm text-muted-foreground">
                  Logged in as: <span className="font-medium">{user.email}</span>
                </span>
              )}
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout()
                  router.push("/login")
                }}
              >
                Logout
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
        </div>
      </SidebarProvider>
      <Footer />
    </>
  )
}
