"use client"

import type React from "react"

import Link from "next/link"
import { Home, LayoutDashboard, Palette, Tag, Users, FolderKanban } from "lucide-react"
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
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth-store"
import { ThemeToggle } from "@/components/theme-toggle"
import { Inter } from "next/font/google" // Import Inter font
import "@/app/globals.css" // Import global CSS
import { ThemeProvider } from "@/components/theme-provider" // Import ThemeProvider
import { Providers } from "@/app/providers" // Import Providers
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoggedIn, logout } = useAuthStore()
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    // Check if user is logged in and has admin role
    if (!isLoggedIn || user?.role !== "admin") {
      // If not, redirect to login page with a redirect query param
      router.push("/login?redirect=/admin")
    } else {
      // If user is admin, grant access
      setHasAccess(true)
    }
  }, [isLoggedIn, user, router])

  if (!hasAccess) {
    // Optionally show a loading state or a message while redirecting
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <p className="text-lg text-muted-foreground">Access Denied. Redirecting to login...</p>
      </div>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <Toaster /> {/* Add Toaster here */}
            <SidebarProvider defaultOpen={true}>
              <Sidebar collapsible="offcanvas">
                <SidebarHeader>
                  <Link href="/admin" className="flex items-center gap-2 p-2">
                    <AnimatedLogo />
                    <span className="text-xl font-bold">Admin Panel</span>
                  </Link>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                            <Link href="/admin">
                              <LayoutDashboard />
                              <span>Dashboard</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/animations")}>
                            <Link href="/admin/animations">
                              <Palette />
                              <span>Animations</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/categories")}>
                            <Link href="/admin/categories">
                              <FolderKanban />
                              <span>Categories</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/tags")}>
                            <Link href="/admin/tags">
                              <Tag />
                              <span>Tags</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/users")}>
                            <Link href="/admin/users">
                              <Users />
                              <span>Users</span>
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
                  <h1 className="text-xl font-semibold">Admin Panel</h1>
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
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
