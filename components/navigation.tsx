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

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState("en")
  const [cartItems] = useState(3)
  const [wishlistItems] = useState(5)
  const [notifications] = useState(2)

  const navItems = [
    { href: "/", label: "Home", labelAm: "ቤት" },
    { href: "/courses", label: "Courses", labelAm: "ኮርሶች" },
    { href: "/categories", label: "Categories", labelAm: "ምድቦች" },
    { href: "/instructors", label: "Instructors", labelAm: "አስተማሪዎች" },
    { href: "/about", label: "About", labelAm: "ስለ እኛ" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-abuki-primary to-abuki-accent">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-abuki-primary">Temari</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-abuki-primary ${
                  isActive(item.href) ? "text-abuki-primary" : "text-muted-foreground"
                }`}
              >
                {language === "am" ? item.labelAm : item.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className=" hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={language === "am" ? "ኮርሶችን ፈልግ..." : "Search courses..."} className="pl-10 pr-4" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "am" : "en")}
              className="hidden sm:flex"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === "en" ? "አማ" : "EN"}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hidden sm:flex"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="h-4 w-4" />
              {wishlistItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full pl-1 text-xs bg-abuki-primary">
                  {wishlistItems}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 pl-1 rounded-full  text-xs bg-abuki-primary">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full pl-1 text-xs bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{language === "am" ? "መገለጫ" : "Profile"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>{language === "am" ? "የእኔ ኮርሶች" : "My Courses"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Award className="mr-2 h-4 w-4" />
                  <span>{language === "am" ? "የምስክር ወረቀቶች" : "Certificates"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>{language === "am" ? "ክፍያ" : "Billing"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{language === "am" ? "ቅንብሮች" : "Settings"}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{language === "am" ? "ውጣ" : "Log out"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigate through Abuki learning platform</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-2 py-1 text-lg ${
                        isActive(item.href) ? "text-abuki-primary font-medium" : "text-muted-foreground"
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
