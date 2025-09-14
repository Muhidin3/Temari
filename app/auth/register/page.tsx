"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { BookOpen, Eye, EyeOff, Loader2, AlertCircle, Globe, User, GraduationCap } from "lucide-react"

export default function RegisterPage() {
  const { register } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" as "student" | "instructor",
    language: language,
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (error) setError("") // Clear error when user starts typing
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      return t("first-name-required", "First name is required", "የመጀመሪያ ስም ያስፈልጋል")
    }
    if (!formData.lastName.trim()) {
      return t("last-name-required", "Last name is required", "የአባት ስም ያስፈልጋል")
    }
    if (!formData.email.trim()) {
      return t("email-required", "Email is required", "ኢሜል ያስፈልጋል")
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      return t("invalid-email", "Please enter a valid email", "ትክክለኛ ኢሜል ያስገቡ")
    }
    if (formData.password.length < 6) {
      return t("password-length", "Password must be at least 6 characters", "የይለፍ ቃል ቢያንስ 6 ቁምፊ መሆን አለበት")
    }
    if (formData.password !== formData.confirmPassword) {
      return t("password-mismatch", "Passwords do not match", "የይለፍ ቃሎች አይዛመዱም")
    }
    if (!formData.agreeToTerms) {
      return t("terms-required", "You must agree to the terms and conditions", "ውሎችን እና ሁኔታዎችን መቀበል አለብዎት")
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      const result = await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        language: formData.language as "en" | "am",
      })

      if (!result.success) {
        setError(result.message)
      }
    } catch (error) {
      setError(t("register-error", "An unexpected error occurred", "ያልተጠበቀ ስህተት ተከስቷል"))
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.agreeToTerms

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
              {t("create-account", "Create Account", "መለያ ይፍጠሩ")}
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              {t("register-description", "Join Abuki and start learning", "አቡኪን ይቀላቀሉ እና መማር ይጀምሩ")}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="dark:text-gray-200">
                    {t("first-name", "First Name", "የመጀመሪያ ስም")}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={t("first-name-placeholder", "Enter first name", "የመጀመሪያ ስም ያስገቡ")}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="dark:text-gray-200">
                    {t("last-name", "Last Name", "የአባት ስም")}
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder={t("last-name-placeholder", "Enter last name", "የአባት ስም ያስገቡ")}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    disabled={loading}
                  />
                </div>
              </div>

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
                <Label htmlFor="role" className="dark:text-gray-200">
                  {t("role", "I want to", "እኔ እፈልጋለሁ")}
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="student" className="dark:text-white dark:hover:bg-gray-700">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {t("learn", "Learn", "መማር")}
                      </div>
                    </SelectItem>
                    <SelectItem value="instructor" className="dark:text-white dark:hover:bg-gray-700">
                      <div className="flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        {t("teach", "Teach", "ማስተማር")}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="dark:text-gray-200">
                  {t("preferred-language", "Preferred Language", "የሚመረጥ ቋንቋ")}
                </Label>
                <Select value={formData.language} onValueChange={(value) => handleSelectChange("language", value)}>
                  <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="en" className="dark:text-white dark:hover:bg-gray-700">
                      English
                    </SelectItem>
                    <SelectItem value="am" className="dark:text-white dark:hover:bg-gray-700">
                      አማርኛ
                    </SelectItem>
                  </SelectContent>
                </Select>
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="dark:text-gray-200">
                  {t("confirm-password", "Confirm Password", "የይለፍ ቃል ያረጋግጡ")}
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("confirm-password-placeholder", "Confirm your password", "የይለፍ ቃልዎን ያረጋግጡ")}
                    value={formData.confirmPassword}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleSelectChange("agreeToTerms", checked.toString())}
                  disabled={loading}
                />
                <Label htmlFor="agreeToTerms" className="text-sm dark:text-gray-200">
                  {t("agree-to-terms-start", "I agree to the", "እኔ እስማማለሁ")}{" "}
                  <Link href="/terms" className="text-abuki-primary hover:text-abuki-accent dark:text-abuki-primary">
                    {t("terms-and-conditions", "Terms and Conditions", "ውሎች እና ሁኔታዎች")}
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-abuki-primary hover:bg-abuki-accent text-white"
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("creating-account", "Creating account...", "መለያ በመፍጠር ላይ...")}
                  </>
                ) : (
                  t("create-account", "Create Account", "መለያ ይፍጠሩ")
                )}
              </Button>
            </form>

            <Separator className="dark:bg-gray-700" />

            <div className="text-center text-sm">
              <span className="text-muted-foreground dark:text-gray-400">
                {t("have-account", "Already have an account?", "ቀደም ሲል መለያ አለዎት?")}
              </span>{" "}
              <Link
                href="/auth/login"
                className="text-abuki-primary hover:text-abuki-accent font-medium dark:text-abuki-primary dark:hover:text-abuki-accent"
              >
                {t("sign-in", "Sign in", "ግቡ")}
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
