"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { UserButton } from "@/components/user-button"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context" // <-- Import your auth context

export function MainNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth() // <-- Get user from context

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Define nav items, conditionally include "Generate"
  const navItems = [
    ...(user ? [{ href: "/generate", label: "Generate" }] : []),
    { href: "/gallery", label: "Gallery" },
    { href: "/explore", label: "Explore" },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-dark backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="font-orbitron font-bold text-2xl gradient-text-cyber animate-pulse-glow">Imaginex</span>
        </Link>

        <nav className="flex items-center space-x-8 ml-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-all duration-300 hover:text-purple-400 group glass-button px-4 py-2 rounded-lg ${
                pathname === item.href ? "text-purple-400 bg-purple-500/20" : "text-white/80"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full ${
                  pathname === item.href ? "w-full" : ""
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center ml-auto space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  )
}
