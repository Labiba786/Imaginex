"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("imaginex_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    // userData should contain { user, token }
    const { user, token } = userData
    const firstLetter = user.fullName.charAt(0).toUpperCase()
    const color = stringToColor(user.fullName)
    const newUser = {
      id: user.id,
      name: user.fullName,
      email: user.email,
      avatar: {
        letter: firstLetter,
        color: color,
      },
      credits: 100,
      joinDate: new Date().toISOString(),
      token,
    }
    setUser(newUser)
    localStorage.setItem("imaginex_user", JSON.stringify(newUser))
    return newUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("imaginex_user")
  }

  // Utility to generate a color based on a string (user's name)
  function stringToColor(str) {
    // Generate a unique, consistent color for each string
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    // Create HSL color from hash
    const h = Math.abs(hash) % 360
    const s = 65
    const l = 55
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  const register = (userData) => {
    // userData should contain { user, token }
    const { user, token } = userData
    const firstLetter = user.fullName.charAt(0).toUpperCase()
    const color = stringToColor(user.fullName)
    const newUser = {
      id: user.id,
      name: user.fullName,
      email: user.email,
      avatar: {
        letter: firstLetter,
        color: color,
      },
      credits: 100,
      joinDate: new Date().toISOString(),
      token,
    }
    setUser(newUser)
    localStorage.setItem("imaginex_user", JSON.stringify(newUser))
    return newUser
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
