"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Crown, Clock, Zap, Users, Eye, Heart } from "lucide-react"

export default function ExplorePage() {
  const [trendingImages, setTrendingImages] = useState([])
  const [featuredArtists, setFeaturedArtists] = useState([])
  const [recentImages, setRecentImages] = useState([])

  useEffect(() => {
    // Sample trending images
    setTrendingImages([
      {
        id: 1,
        url: "/CyberpunkSamuraiInNeonLitTokyoStreet.png",
        prompt: "Cyberpunk samurai in neon-lit Tokyo street",
        artist: "AIArtist_01",
        likes: 1247,
        views: 5632,
        style: "cyberpunk",
        trending_score: 98,
      },
      {
        id: 2,
        url: "/AbstractGeometricPatternsInVibrantColors.png",
        prompt: "Abstract geometric patterns in vibrant colors",
        artist: "MindBender",
        likes: 756,
        views: 2890,
        style: "abstract",
        trending_score: 87,
      },
      {
        id: 3,
        url: "/EtherealDragonSoaringThroughAuroraBorealis.png",
        prompt: "Ethereal dragon soaring through aurora borealis",
        artist: "DragonMaster",
        likes: 892,
        views: 3421,
        style: "fantasy",
        trending_score: 95,
      },
    ])

    // Sample featured artists
    setFeaturedArtists([
      {
        id: 1,
        name: "AIArtist_01",
        avatar: "/cyberpunk&scifi -profile.png",
        followers: 15420,
        artworks: 234,
        specialty: "Cyberpunk & Sci-Fi",
        verified: true,
      },
      {
        id: 2,
        name: "DragonMaster",
        avatar: "/fantasy&mythology-profile.png",
        followers: 8930,
        artworks: 156,
        specialty: "Fantasy & Mythology",
        verified: true,
      },
      {
        id: 3,
        name: "MindBender",
        avatar: "/abstract&surreal-profile.png",
        followers: 6780,
        artworks: 89,
        specialty: "Abstract & Surreal",
        verified: false,
      },
    ])

    // Sample recent images
    setRecentImages([
      {
        id: 4,
        url: "/ai-art-7.jpg",
        prompt: "A fantasy landscape with floating islands",
        artist: "FantasyArt",
        timestamp: "2 hours ago",
        likes: 45,
        style: "Fantasy",
      },
      {
        id: 5,
        url: "/ai-art-8.jpg",
        prompt: "A futuristic city skyline at sunset",
        artist: "CityScapeArtist",
        timestamp: "4 hours ago",
        likes: 32,
        style: "Futuristic",
      },
      {
        id: 6,
        url: "/ai-art-9.png",
        prompt: "Bioluminescent underwater coral reef",
        artist: "OceanDreamer",
        timestamp: "6 hours ago",
        likes: 67,
        style: "nature",
      },
    ])
  }, [])

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-slide-up">
            <h1 className="text-4xl font-bold font-orbitron gradient-text-cyber">Explore AI Art</h1>
            <p className="text-gray-400 text-lg font-space max-w-2xl mx-auto">
              Discover trending artworks, featured artists, and the latest creations from our vibrant community
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-scale">
            {[
              { icon: Users, label: "Active Artists", value: "12.5K", color: "from-blue-500 to-cyan-500" },
              { icon: Eye, label: "Total Views", value: "2.8M", color: "from-purple-500 to-pink-500" },
              { icon: Heart, label: "Likes Given", value: "456K", color: "from-red-500 to-orange-500" },
              { icon: Zap, label: "Images Generated", value: "89.2K", color: "from-green-500 to-emerald-500" },
            ].map((stat, index) => (
              <Card key={index} className="glass-card border-purple-500/20 hover-3d">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-white font-orbitron">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="trending" className="space-y-6">
            <TabsList className="glass-card border-purple-500/20 p-1">
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Featured Artists
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent
              </TabsTrigger>
            </TabsList>

            {/* Trending Tab */}
            <TabsContent value="trending" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {trendingImages.map((image, index) => (
                  <Card
                    key={image.id}
                    className="glass-card border-purple-500/20 overflow-hidden hover-3d group"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="relative">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.prompt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                          <TrendingUp className="w-3 h-3 mr-1" />#{index + 1} Trending
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="glass border-white/30 text-white">{image.trending_score}% 🔥</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-white mb-2 line-clamp-2">{image.prompt}</h3>
                          <p className="text-gray-400 text-sm">by @{image.artist}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4 text-gray-400">
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {image.likes.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {image.views.toLocaleString()}
                            </span>
                          </div>
                          <Badge variant="outline" className="border-purple-400/50 text-purple-300">
                            {image.style}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Featured Artists Tab */}
            <TabsContent value="featured" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredArtists.map((artist, index) => (
                  <Card
                    key={artist.id}
                    className="glass-card border-purple-500/20 hover-3d group"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="relative inline-block mb-4">
                        <img
                          src={artist.avatar || "/placeholder.svg"}
                          alt={artist.name}
                          className="w-20 h-20 rounded-full mx-auto border-2 border-purple-400/50"
                        />
                        {artist.verified && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Crown className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white font-orbitron">{artist.name}</h3>
                          <p className="text-gray-400 text-sm">{artist.specialty}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-white">{artist.followers.toLocaleString()}</p>
                            <p className="text-gray-400 text-xs">Followers</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-white">{artist.artworks}</p>
                            <p className="text-gray-400 text-xs">Artworks</p>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          Follow Artist
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recent Tab */}
            <TabsContent value="recent" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentImages.map((image, index) => (
                  <Card
                    key={image.id}
                    className="glass-card border-purple-500/20 overflow-hidden hover-3d group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.prompt}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="glass border-white/30 text-white">
                          <Clock className="w-3 h-3 mr-1" />
                          {image.timestamp}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">{image.prompt}</h3>
                          <p className="text-gray-400 text-xs">by @{image.artist}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Heart className="w-4 h-4" />
                            {image.likes}
                          </div>
                          <Badge variant="outline" className="border-purple-400/50 text-purple-300 text-xs">
                            {image.style}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
