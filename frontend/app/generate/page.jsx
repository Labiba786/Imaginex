"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PromptSuggestions } from "@/components/prompt-suggestions"
import { Share2, Download, Sparkles, Wand2, Settings, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("realistic")
  const [size, setSize] = useState("1024x1024")
  const [quality, setQuality] = useState([80])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [generationHistory, setGenerationHistory] = useState([])
  const [jwtToken, setJwtToken] = useState("")
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("imaginex_user") || "{}")
      setJwtToken(userData?.token || "")
    }
  }, [])

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!prompt.trim()) return;

  setLoading(true);
  // const jwtToken = JSON.parse(localStorage.getItem("imaginex_user") || "{}")?.token || "";

  try {
    const response = await fetch(`${baseUrl}/api/image/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`, // ✅ Proper token usage
      },
      body: JSON.stringify({ prompt, style, size }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const contentType = response.headers.get("Content-Type");
    let imageUrl;

    if (contentType && contentType.startsWith("image/")) {
      const blob = await response.blob();
      imageUrl = URL.createObjectURL(blob);
    } else {
      const data = await response.json();
      throw new Error(data.error || "Failed to generate image");
    }

    const newImage = {
      id: Date.now(),
      url: imageUrl,
      prompt,
      style,
      size,
      timestamp: new Date().toISOString(),
    };

    setResult(newImage);
    setGenerationHistory((prev) => [newImage, ...prev.slice(0, 4)]);
  } catch (error) {
    console.error("Error generating image:", error);
  } finally {
    setLoading(false);
  }
};

  const handleDownload = () => {
    if (result) {
      const link = document.createElement("a")
      link.href = result.url
      link.download = `imaginex-${Date.now()}.png`
      link.click()
    }
  }

  const handleShare = async () => {
    if (result && navigator.share) {
      try {
        await navigator.share({
          title: "Check out my AI generated image!",
          text: `Created with Imaginex: "${result.prompt}"`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  return (
    <div className="page-background min-h-screen pt-20 pb-12">
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Generation Form */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold font-orbitron gradient-text-cyber">Create Your Vision</h1>
              <p className="text-gray-400 text-lg font-space">
                Transform your ideas into stunning visuals using advanced AI technology.
              </p>
            </div>

            <Card className="glass-card border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white font-orbitron">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  Generation Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="prompt" className="text-white font-semibold">
                      Your Vision
                    </Label>
                    <Input
                      id="prompt"
                      placeholder="Describe what you want to create..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="glass border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400 transition-all duration-300"
                    />
                    <PromptSuggestions onSelect={setPrompt} />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label className="text-white font-semibold flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Style
                      </Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger className="glass border-purple-400/30 text-white">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent className="dropdown-content">
                          <SelectItem value="realistic" className="dropdown-item">
                            🎨 Realistic
                          </SelectItem>
                          <SelectItem value="abstract" className="dropdown-item">
                            🌀 Abstract
                          </SelectItem>
                          <SelectItem value="cartoon" className="dropdown-item">
                            🎭 Cartoon
                          </SelectItem>
                          <SelectItem value="anime" className="dropdown-item">
                            👾 Anime
                          </SelectItem>
                          <SelectItem value="digital-art" className="dropdown-item">
                            💻 Digital Art
                          </SelectItem>
                          <SelectItem value="cyberpunk" className="dropdown-item">
                            🌆 Cyberpunk
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white font-semibold flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Size
                      </Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger className="glass border-purple-400/30 text-white">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent className="dropdown-content">
                          <SelectItem value="1024x1024" className="dropdown-item">
                            ⬜ Square (1024x1024)
                          </SelectItem>
                          <SelectItem value="1024x1792" className="dropdown-item">
                            📱 Portrait (1024x1792)
                          </SelectItem>
                          <SelectItem value="1792x1024" className="dropdown-item">
                            🖥️ Landscape (1792x1024)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-semibold">Quality: {quality[0]}%</Label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={100}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || !prompt.trim()}
                  >
                    {loading ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                        Generating Magic...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Result Display */}
          <div className="space-y-6 animate-fade-scale">
            {result ? (
              <Card className="glass-card border-purple-500/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative group">
                    <img
                      src={result.url || "/placeholder.svg"}
                      alt={result.prompt}
                      className="w-full h-auto object-cover aspect-square transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white font-semibold mb-3 line-clamp-2">{result.prompt}</p>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleDownload}
                            size="sm"
                            className="glass-button border-white/30 text-white hover:bg-white/20"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            onClick={handleShare}
                            size="sm"
                            className="glass-button border-white/30 text-white hover:bg-white/20"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-card border-purple-500/20 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-4 animate-pulse-glow">
                    <Sparkles className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 font-orbitron">Ready to Create</h3>
                  <p className="text-gray-400">Enter your prompt and watch the magic happen</p>
                </CardContent>
              </Card>
            )}

            {/* Generation History */}
            {generationHistory.length > 0 && (
              <Card className="glass-card border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white font-orbitron">Recent Generations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {generationHistory.map((image) => (
                      <div
                        key={image.id}
                        className="group relative overflow-hidden rounded-lg glass-card hover-3d cursor-pointer"
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.prompt}
                          className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white text-xs text-center px-2 line-clamp-2">{image.prompt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
