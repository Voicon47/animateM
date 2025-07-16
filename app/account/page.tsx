"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimationService } from "@/services/animation-service"
import { useAuthStore } from "@/stores/auth-store"
import { useToast } from "@/hooks/use-toast"

export default function AccountProfilePage() {
  const { user, login } = useAuthStore()
  const { toast } = useToast()

  const [firstName, setFirstName] = useState(user?.firstName || "")
  const [lastName, setLastName] = useState(user?.lastName || "")
  const [avatar, setAvatar] = useState(user?.avatar || "/placeholder.svg?height=100&width=100")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "")
      setLastName(user.lastName || "")
      setAvatar(user.avatar || "/placeholder.svg?height=100&width=100")
    }
  }, [user])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const updatedUser = await AnimationService.updateUserProfile(user.id, {
        firstName,
        lastName,
        avatar,
      })
      if (updatedUser) {
        login(updatedUser) // Update user in store
        toast({
          title: "Success",
          description: "Profile updated successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update profile.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "An error occurred while updating profile.",
        variant: "destructive",
      })
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you'd verify currentPassword with the backend
    // For mock, we'll just check if it matches the stored mock password
    if (user.password && user.password !== currentPassword) {
      toast({
        title: "Error",
        description: "Current password is incorrect.",
        variant: "destructive",
      })
      return
    }

    try {
      const success = await AnimationService.updateUserPassword(user.id, newPassword) // In real app, hash newPassword
      if (success) {
        toast({
          title: "Success",
          description: "Password changed successfully.",
        })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
      } else {
        toast({
          title: "Error",
          description: "Failed to change password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error changing password:", error)
      toast({
        title: "Error",
        description: "An error occurred while changing password.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading user data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={`${firstName} ${lastName}`} />
              <AvatarFallback>{(firstName?.[0] || "") + (lastName?.[0] || "")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{`${firstName} ${lastName}`.trim() || "N/A"}</p>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                Registered: {new Date(user.registeredAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input id="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            </div>
            <Button type="submit" className="w-fit">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-fit">
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
