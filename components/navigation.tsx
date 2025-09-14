"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  ShoppingCart,
  Heart,
  Bell,
  User,
  Menu,
  BookOpen,
  GraduationCap,
  Globe,
  Moon,
  Sun,
  LogOut,
  Settings,
  CreditCard,
  Award,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const [cartItems] = useState(3)
  const [wishlistItems] = useState(5)
  const [notifications] = useState(2)

  const navItems = [
    { href: "/", label: "Home", labelAm: "ቤት" },
    { href: "/courses", label: "Courses", labelAm: "ኮርሶች" },
    { href: "/categories", label: "Categories", labelAm: "ምድቦች" },
    { href: "/instructor", label: "Instructor", labelAm: "አስተማሪዎች" },
    { href: "/about", label: "About", labelAm: "ስለ እኛ" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-abuki-primary to-abuki-accent">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-abuki-primary dark:text-abuki-primary">Abuki</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-abuki-primary ${
                  isActive(item.href)
                    ? "text-abuki-primary"
                    : "text-muted-foreground dark:text-gray-300 dark:hover:text-abuki-primary"
                }`}
              >
                {language === "am" ? item.labelAm : item.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("search-courses", "Search courses...", "ኮርሶችን ፈልግ...")}
                className="pl-10 pr-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "am" : "en")}
              className="hidden sm:flex dark:text-gray-300 dark:hover:text-white"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === "en" ? "አማ" : "EN"}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hidden sm:flex dark:text-gray-300 dark:hover:text-white"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {user ? (
              <>
                {/* Wishlist */}
                <Button variant="ghost" size="sm" className="relative dark:text-gray-300 dark:hover:text-white">
                  <Heart className="h-4 w-4" />
                  {wishlistItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-abuki-primary flex items-center justify-center">
                      {wishlistItems}
                    </Badge>
                  )}
                </Button>

                {/* Cart */}
                <Button variant="ghost" size="sm" className="relative dark:text-gray-300 dark:hover:text-white">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-abuki-primary flex items-center justify-center">
                      {cartItems}
                    </Badge>
                  )}
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative dark:text-gray-300 dark:hover:text-white">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-red-500 flex items-center justify-center">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                      {user.avatar ? (
                        <img src={user.avatar || "/placeholder.svg"} alt="Avatar" className="h-8 w-8 rounded-full" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 dark:bg-gray-800 dark:border-gray-700" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground dark:text-gray-400">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="dark:bg-gray-700" />
                    <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700" asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t("profile", "Profile", "መገለጫ")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700" asChild>
                      <Link href={user.role === "instructor" ? "/instructor/dashboard" : "/dashboard"}>
                        <GraduationCap className="mr-2 h-4 w-4" />
                        <span>{t("dashboard", "Dashboard", "ዳሽቦርድ")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700" asChild>
                      <Link href="/my-courses">
                        <Award className="mr-2 h-4 w-4" />
                        <span>{t("my-courses", "My Courses", "የእኔ ኮርሶች")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700" asChild>
                      <Link href="/billing">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>{t("billing", "Billing", "ክፍያ")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700" asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t("settings", "Settings", "ቅንብሮች")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="dark:bg-gray-700" />
                    <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("logout", "Log out", "ውጣ")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="dark:text-gray-300 dark:hover:text-white">
                  <Link href="/auth/login">{t("login", "Login", "ግባ")}</Link>
                </Button>
                <Button size="sm" className="bg-abuki-primary hover:bg-abuki-accent" asChild>
                  <Link href="/auth/register">{t("sign-up", "Sign Up", "ተመዝገብ")}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden dark:text-gray-300 dark:hover:text-white">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] dark:bg-gray-900 dark:border-gray-800">
                <SheetHeader>
                  <SheetTitle className="dark:text-white">Menu</SheetTitle>
                  <SheetDescription className="dark:text-gray-400">
                    Navigate through Abuki learning platform
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-2 py-1 text-lg ${
                        isActive(item.href)
                          ? "text-abuki-primary font-medium"
                          : "text-muted-foreground dark:text-gray-300"
                      }`}
                    >
                      {language === "am" ? item.labelAm : item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
