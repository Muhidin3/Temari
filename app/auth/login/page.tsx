"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { BookOpen, Eye, EyeOff, Loader2, AlertCircle, Globe } from "lucide-react"

export default function LoginPage() {
  const { login } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("") // Clear error when user starts typing
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      if (!result.success) {
        setError(result.message)
      }
    } catch (error) {
      setError(t("login-error", "An unexpected error occurred", "ያልተጠበቀ ስህተት ተከስቷል"))
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.email && formData.password

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-abuki-light via-white to-abuki-light/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
            className="dark:text-gray-300 dark:hover:text-white"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language === "en" ? "አማ" : "EN"}
          </Button>
        </div>

        <Card className="shadow-2xl border-0 dark:bg-slate-900 dark:text-white">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-abuki-primary to-abuki-accent">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold dark:text-white">
              {t("welcome-back", "Welcome Back", "እንኳን ደህና መጡ")}
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              {t("login-description", "Sign in to your Abuki account", "ወደ አቡኪ መለያዎ ይግቡ")}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="dark:border-red-800 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">
                  {t("email", "Email", "ኢሜል")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("email-placeholder", "Enter your email", "ኢሜልዎን ያስገቡ")}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-200">
                  {t("password", "Password", "የይለፍ ቃል")}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("password-placeholder", "Enter your password", "የይለፍ ቃልዎን ያስገቡ")}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent dark:text-gray-400 dark:hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/auth/forgot-password"
                    className="text-abuki-primary hover:text-abuki-accent dark:text-abuki-primary dark:hover:text-abuki-accent"
                  >
                    {t("forgot-password", "Forgot password?", "የይለፍ ቃል ረሱ?")}
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-abuki-primary hover:bg-abuki-accent text-white"
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("signing-in", "Signing in...", "በመግባት ላይ...")}
                  </>
                ) : (
                  t("sign-in", "Sign In", "ግባ")
                )}
              </Button>
            </form>

            <Separator className="dark:bg-gray-700" />

            <div className="text-center text-sm">
              <span className="text-muted-foreground dark:text-gray-400">
                {t("no-account", "Don't have an account?", "መለያ የለዎትም?")}
              </span>{" "}
              <Link
                href="/auth/register"
                className="text-abuki-primary hover:text-abuki-accent font-medium dark:text-abuki-primary dark:hover:text-abuki-accent"
              >
                {t("sign-up", "Sign up", "ተመዝገቡ")}
              </Link>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white"
              >
                ← {t("back-to-home", "Back to home", "ወደ ቤት ይመለሱ")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
