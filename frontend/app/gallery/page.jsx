"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Share2, Download, Heart, Search, Filter, Grid, List } from "lucide-react"

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStyle, setFilterStyle] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [likedImages, setLikedImages] = useState(new Set())

  // Sample data
  useEffect(() => {
    const sampleImages = [
      {
        id: 1,
         url: "/ai-art-10.png",
        prompt: "Digital art of a space station",
        style: "digital-art",
        likes: 19,
        timestamp: "2024-01-10",         
      },
      {
        id: 2,
        url: "/ai-art-11.png",
        prompt: "A futuristic cyberpunk city with neon lights",
        style: "cyberpunk",
        likes: 42,
        timestamp: "2024-01-15",      
      },
      {
        id: 3,
        url: "/ai-art-12.png",
        prompt: "Steampunk airship floating above Victorian city",
        style: "SteamPunk",
        likes: 35,
        timestamp: "2024-01-13",
      },
      {
        id: 4,
        url: "/ai-art-13.png",
        prompt: "Realistic portrait of a person in renaissance style",
        style: "realistic",
        likes: 56,
        timestamp: "2024-01-12",
      },
      {
        id: 5,
        url: "/ai-art-14.png",
        prompt: "Anime character with colorful hair and eyes",
        style: "anime",
        likes: 73,
        timestamp: "2024-01-11",       
      },
      {
        id: 6,
        url: "/ai-art-15.png",
        prompt: "Abstract representation of human consciousness",
        style: "abstract",
        likes: 28,
        timestamp: "2024-01-14",
      },
    ]
    setImages(sampleImages)
    setFilteredImages(sampleImages)
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = images

    if (searchTerm) {
      filtered = filtered.filter((image) => image.prompt.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (filterStyle !== "all") {
      filtered = filtered.filter((image) => image.style === filterStyle)
    }

    setFilteredImages(filtered)
  }, [searchTerm, filterStyle, images])

  const toggleLike = (imageId) => {
    setLikedImages((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId)
      } else {
        newLiked.add(imageId)
      }
      return newLiked
    })
  }

  const handleDownload = (image) => {
    const link = document.createElement("a")
    link.href = image.url
    link.download = `imaginex-${image.id}.png`
    link.click()
  }

  const handleShare = async (image) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Amazing AI Art from Imaginex",
          text: `Check out this AI generated image: "${image.prompt}"`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-slide-up">
            <h1 className="text-4xl font-bold font-orbitron gradient-text-cyber">AI Art Gallery</h1>
            <p className="text-gray-400 text-lg font-space max-w-2xl mx-auto">
              Explore a curated collection of stunning AI-generated artwork from our community
            </p>
          </div>

          {/* Filters and Search */}
          <Card className="glass-card border-purple-500/20 animate-fade-scale">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search artworks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass border-purple-400/30 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <Select value={filterStyle} onValueChange={setFilterStyle}>
                    <SelectTrigger className="w-full sm:w-48 glass border-purple-400/30 text-white">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by style" />
                    </SelectTrigger>
                    <SelectContent className="dropdown-content">
                      <SelectItem value="all" className="dropdown-item">
                        All Styles
                      </SelectItem>
                      <SelectItem value="realistic" className="dropdown-item">
                        Realistic
                      </SelectItem>
                      <SelectItem value="abstract" className="dropdown-item">
                        Abstract
                      </SelectItem>
                      <SelectItem value="anime" className="dropdown-item">
                        Anime
                      </SelectItem>
                      <SelectItem value="cyberpunk" className="dropdown-item">
                        Cyberpunk
                      </SelectItem>
                      <SelectItem value="fantasy" className="dropdown-item">
                        Fantasy
                      </SelectItem>
                      <SelectItem value="digital-art" className="dropdown-item">
                        Digital Art
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="glass border-purple-400/30"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="glass border-purple-400/30"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredImages.map((image, index) => (
              <Card
                key={image.id}
                className="glass-card border-purple-500/20 overflow-hidden hover-3d group transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.prompt}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      viewMode === "grid" ? "h-64" : "h-48"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-end">
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm mb-1 line-clamp-2">{image.prompt}</p>
                          <p className="text-gray-300 text-xs">
                            {image.style} • {image.likes} likes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white line-clamp-2 text-sm">{image.prompt}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="capitalize">{image.style}</span>
                      <span>{image.timestamp}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(image.id)}
                    className={`text-gray-400 hover:text-red-400 transition-colors ${
                      likedImages.has(image.id) ? "text-red-400" : ""
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${likedImages.has(image.id) ? "fill-current" : ""}`} />
                    {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                  </Button>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(image)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(image)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <Card className="glass-card border-purple-500/20 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-4">
                  <Search className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 font-orbitron">No Results Found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
