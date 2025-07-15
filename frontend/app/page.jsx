"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Palette, Zap, Cpu, Wand2, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin-slow">
            <Sparkles className="w-12 h-12 text-purple-500" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div
          className="absolute inset-0 opacity-30 transition-all duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full py-20 md:py-32 lg:py-40 xl:py-52">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center animate-slide-up">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-orbitron">
                  <span className="gradient-text-cyber">Transform Your Ideas</span>
                  <br />
                  <span className="text-white animate-float">Into Art With</span>
                  <br />
                  <span className="neon-text text-6xl md:text-8xl">AI</span>
                </h1>
              </div>
              <p className="mx-auto max-w-[800px] text-gray-300 text-lg md:text-xl font-space leading-relaxed animate-fade-scale">
                Create stunning visuals from text descriptions using advanced AI. Choose from multiple styles and
                customize to your heart's content with our futuristic image generation platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-scale">
              <Button
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => {
                  if (typeof window !== "undefined" && localStorage.getItem("imaginex_user")) {
                    window.location.href = "/generate"
                  } else {
                    window.location.href = "/login"
                  }
                }}
              >
                <span className="relative z-10 flex items-center">
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <Link href="/explore">
                <Button
                  variant="outline"
                  className="glass-button border-purple-400/50 text-white hover:text-purple-300 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Explore Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron gradient-text-purple mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the future of creative expression with our cutting-edge features
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Generation",
                description: "Transform text into stunning visuals in seconds using state-of-the-art AI technology",
                gradient: "from-yellow-400 to-orange-500",
              },
              {
                icon: Palette,
                title: "Infinite Artistic Styles",
                description: "Choose from various artistic styles including realistic, abstract, cartoon, and more",
                gradient: "from-purple-400 to-pink-500",
              },
              {
                icon: Cpu,
                title: "Advanced AI Engine",
                description: "Powered by the latest machine learning models for unprecedented image quality",
                gradient: "from-blue-400 to-cyan-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group glass-card rounded-2xl p-8 hover-3d transition-all duration-500 hover:shadow-2xl animate-fade-scale"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold font-orbitron text-white mb-4 group-hover:gradient-text-cyber transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="relative z-10 w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron gradient-text-purple mb-4">
              Latest AI Creations
            </h2>
            <p className="text-gray-400 text-lg">Discover what's possible with our AI image generation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl glass-card hover-3d transition-all duration-500 animate-fade-scale"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`/ai-art-${i}.png`}
                    alt={`AI Generated Art ${i}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold mb-2">AI Generated Masterpiece</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-button border-white/30 text-white hover:bg-white/20"
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
