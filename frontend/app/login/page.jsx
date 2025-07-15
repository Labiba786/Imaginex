"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    NProgress.start(); // 🌟 Show loader early

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data);
      if (response.ok) {
        // Save token/user as needed
        login(data); // or login(data) if your context expects the whole response
        router.push("/");
      } else {
        // Handle error (show message to user)
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      NProgress.done(); // 🌟 Hide loader after response
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="page-background min-h-screen pt-20 pb-12">
      <div className="container flex items-center justify-center py-12">
        <div className="w-full max-w-md animate-slide-up">
          <Card className="glass-card border-purple-500/20">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full glass-card flex items-center justify-center mb-4">
                <span className="font-orbitron font-bold text-xl gradient-text-cyber">I</span>
              </div>
              <CardTitle className="text-2xl font-bold font-orbitron text-white">Welcome Back</CardTitle>
              <CardDescription className="text-gray-400">
                Sign in to your Imaginex account to continue creating amazing AI art
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="glass border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-semibold flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="glass border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
