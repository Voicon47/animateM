"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimationService } from "@/services/animation-service"
import { useEffect, useState } from "react"
import type { Animation, Category, User } from "@/types/animation"
import { Palette, DollarSign, Users, FolderKanban } from "lucide-react"

export default function AdminDashboardPage() {
  const [animations, setAnimations] = useState<Animation[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const [fetchedAnimations, fetchedCategories, fetchedUsers] = await Promise.all([
        AnimationService.getAllAnimations(),
        AnimationService.getAllCategories(),
        AnimationService.getAllUsers(),
      ])
      setAnimations(fetchedAnimations)
      setCategories(fetchedCategories)
      setUsers(fetchedUsers)
      setLoading(false)
    }
    fetchData()
  }, [])

  const totalAnimations = animations.length
  const freeAnimations = animations.filter((anim) => !anim.isPremium).length
  const premiumAnimations = animations.filter((anim) => anim.isPremium).length
  const totalUsers = users.length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading dashboard data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Animations</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAnimations}</div>
            <p className="text-xs text-muted-foreground">
              {freeAnimations} Free, {premiumAnimations} Premium
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month (mock)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">All active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Mock)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+10.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Animations by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id} className="flex justify-between items-center">
                  <span>{cat.name}</span>
                  <span className="font-medium">{cat.animationCount}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity (Mock)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- New animation "Smooth Scroll" added.</li>
              <li>- User "john.doe@example.com" registered.</li>
              <li>- Category "Layout" updated.</li>
              <li>- Animation "Text Wave" downloaded.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
