"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { AuthResponse } from "@/types/database"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "student" | "instructor" | "admin"
  avatar?: string
  language: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role?: "student" | "instructor"
    language?: "en" | "am"
  }) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register", "/courses", "/about", "/contact", "/search", "/categories"]

// Check if route is public or course detail page
const isPublicRoute = (pathname: string): boolean => {
  if (PUBLIC_ROUTES.includes(pathname)) return true
  if (pathname.startsWith("/courses/") && !pathname.includes("/learn")) return true
  if (pathname.startsWith("/categories/")) return true
  return false
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token")

        if (!storedToken) {
          setLoading(false)
          if (!isPublicRoute(pathname)) {
            router.push("/auth/login")
          }
          return
        }

        // Verify token with backend
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: storedToken }),
        })

        const data: AuthResponse = await response.json()

        if (data.success && data.user) {
          setUser({
            id: data.user._id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            role: data.user.role as "student" | "instructor" | "admin",
            avatar: data.user.avatar,
            language: data.user.language,
          })
          setToken(storedToken)
        } else {
          // Invalid token, clear storage
          localStorage.removeItem("token")
          if (!isPublicRoute(pathname)) {
            router.push("/auth/login")
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        localStorage.removeItem("token")
        if (!isPublicRoute(pathname)) {
          router.push("/auth/login")
        }
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [pathname, router])

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (!loading && user && (pathname === "/auth/login" || pathname === "/auth/register")) {
      const redirectPath = user.role === "instructor" ? "/instructor/dashboard" : "/dashboard"
      router.push(redirectPath)
    }
  }, [user, pathname, router, loading])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log(data)
      if (data.success && data.user && data.token) {
        const userData = {
          id: data.user._id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          role: data.user.role as "student" | "instructor" | "admin",
          avatar: data.user.avatar,
          language: data.user.language,
        }

        setUser(userData)
        setToken(data.token)
        localStorage.setItem("token", data.token)
        // Redirect based on role
        const redirectPath = data.user.role === "instructor" ? "/instructor/dashboard" : "/dashboard"
        router.push(redirectPath)

        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message || "Login failed" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Network error. Please try again." }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role?: "student" | "instructor"
    language?: "en" | "am"
  }) => {
    try {
      setLoading(true)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data: AuthResponse = await response.json()

      if (data.success && data.user && data.token) {
        const userInfo = {
          id: data.user._id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          role: data.user.role as "student" | "instructor" | "admin",
          avatar: data.user.avatar,
          language: data.user.language,
        }

        setUser(userInfo)
        setToken(data.token)
        localStorage.setItem("token", data.token)

        // Redirect based on role
        const redirectPath = data.user.role === "instructor" ? "/instructor/dashboard" : "/dashboard"
        router.push(redirectPath)

        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message || "Registration failed" }
      }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "Network error. Please try again." }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    router.push("/auth/login")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  // Show loading spinner for protected routes
  if (loading && !isPublicRoute(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
