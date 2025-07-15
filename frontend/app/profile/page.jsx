"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, History } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const [generationHistory] = useState([
    { url: "/ai-art-16.jpg", prompt: "Minimalistic portrait with geometric shapes" },
    { url: "/ai-art-17.jpg", prompt: "Futuristic mono train" },
    { url: "/ai-art-18.png", prompt: "A serene landscape" },
  ])

  if (!isAuthenticated) {
    return (
      <div className="page-background min-h-screen pt-20 pb-12">
        <div className="container flex items-center justify-center py-12">
          <Card className="glass-card border-purple-500/20">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <h3 className="text-xl font-semibold text-white mb-2 font-orbitron">Access Denied</h3>
              <p className="text-gray-400 mb-4">Please log in to view your profile</p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <a href="/login">Log In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleSaveChanges = (e) => {
    e.preventDefault()
    console.log("Saving changes:", user)
  }

  return (
    <div className="page-background min-h-screen pt-20 pb-12">
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-8 animate-slide-up">
            <Avatar className="h-24 w-24 border-2 border-purple-400/50">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-purple-600 text-white text-2xl">
                {user.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white font-orbitron">{user.name}</h1>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-sm mt-2 text-purple-300">Credits remaining: {user.credits}</p>
            </div>
          </div>

          <Tabs defaultValue="history" className="w-full animate-fade-scale">
            <TabsList className="glass-card border-purple-500/20 p-1">
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Generation History
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="mt-6">
              <Card className="glass-card border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white font-orbitron">Generation History</CardTitle>
                  <CardDescription className="text-gray-400">Your recent image generation activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generationHistory.map((image, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 glass-card rounded-lg hover-3d">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.prompt}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-white">Prompt: {image.prompt}</p>
                          <p className="text-sm text-gray-400">Generated on {new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <Card className="glass-card border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white font-orbitron">Profile Settings</CardTitle>
                  <CardDescription className="text-gray-400">Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSaveChanges}>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white font-semibold">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue={user.name}
                        className="glass border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-semibold">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        className="glass border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
