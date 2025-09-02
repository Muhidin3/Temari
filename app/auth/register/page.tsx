"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Navigation } from "@/components/navigation"
import { BookOpen, Mail, Lock, Eye, EyeOff, Chrome, Facebook, Apple, User, Github } from "lucide-react"
import { redirect } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [language] = useState("en")
  const [isLoading, setIsLoading] = useState(false)

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    const data = JSON.stringify({name,email,password})
    const res = await fetch('/api/auth/register',{
        method:'POST',
        body:data
    })
    if (res.ok) {
        redirect('/')
    }
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-abuki-light via-white to-abuki-light/50 dark:from-slate-900 dark:to-abuki-dark">

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 ">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-abuki-primary">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-abuki-primary">Abuki</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{language === "am" ? "እንኳን ደህና መጡ" : "Welcome"}</h1>
            <p className="text-muted-foreground">
              {language === "am" ? "ይመዝገቡ እና ትምህርትዎን ይቀጥሉ" : "Register and continue learning"}
            </p>
          </div>

          <Card className="shadow-lg border-0 dark:bg-slate-950 dark:text-green-50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">{language === "am" ? "ይመዝገቡ" : "Register"}</CardTitle>
              <CardDescription className="text-center">
                {language === "am" ? "ኢሜልዎን እና የይለፍ ቃልዎን ያስገቡ" : "Enter your email and password to sign up"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{language === "am" ? "ስም" : "Name"}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={language === "am" ? "ስምዎን ያስገቡ" : "Enter your name"}
                      className="pl-10"
                      required
                      onChange={(e)=>setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{language === "am" ? "ኢሜል" : "Email"}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === "am" ? "ኢሜልዎን ያስገቡ" : "Enter your email"}
                      className="pl-10"
                      required
                      onChange={(e)=>setEmail(e.target.value)}
                      value={email}

                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{language === "am" ? "የይለፍ ቃል" : "Password"}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={language === "am" ? "የይለፍ ቃልዎን ያስገቡ" : "Enter your password"}
                      className="pl-10 pr-10"
                      required
                      onChange={(e)=>setPassword(e.target.value)}
                      value={password}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">
                      {language === "am" ? "አስታውሰኝ" : "Remember me"}
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-abuki-primary hover:underline">
                    {language === "am" ? "የይለፍ ቃል ረሳሁ" : "Forgot password?"}
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-abuki-primary hover:bg-abuki-accent" disabled={isLoading}>
                  {isLoading ? (language === "am" ? "እየገባ..." : "Signing in...") : language === "am" ? "መዝግብ" : "Create Account"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {language === "am" ? "ወይም" : "Or continue with"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="w-full bg-transparent">
                  {/* <Chrome className="h-4 w-4" /> */}G
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>

            <CardFooter>
              <p className="text-center text-sm text-muted-foreground w-full">
                {language === "am" ? "መለያ አለዎት?" : "Already have an account?"}{" "}
                <Link href="/auth/login" className="text-abuki-primary hover:underline font-medium">
                  {language === "am" ? "ይግቡ" : "Sign in"}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
