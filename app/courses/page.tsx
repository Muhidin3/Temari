"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Search, Star, Users, Clock, ChevronLeft, ChevronRight, Grid, List, SlidersHorizontal, X } from "lucide-react"
import Afetch from "@/lib/Afetch"

interface Course {
  _id: string
  title: string
  titleAm?: string
  shortDescription: string
  shortDescriptionAm?: string
  instructor: {
    firstName: string
    lastName: string
    avatar?: string
  }
  category: {
    name: string
    nameAm?: string
    slug: string
  }
  level: string
  price: number
  discountPrice?: number
  thumbnail: string
  rating: number
  totalRatings: number
  totalStudents: number
  duration: number
  language: string
  isFeatured: boolean
}

interface Category {
  _id: string
  name: string
  nameAm?: string
  slug: string
  courseCount?: number
}

interface ApiResponse {
  success: boolean
  message: string
  data: Course[]
  meta: {
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
    categories: Category[]
    filters: {
      levels: string[]
      languages: string[]
    }
  }
}

export default function CoursesPage() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()

  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get("level") || "all")
  const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get("language") || "all")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "createdAt")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get("page") || "1"))
  const [totalPages, setTotalPages] = useState(1)
  const [totalCourses, setTotalCourses] = useState(0)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
      })

      if (searchQuery) params.append("search", searchQuery)
      if (selectedCategory !== "all") params.append("category", selectedCategory)
      if (selectedLevel !== "all") params.append("level", selectedLevel)
      if (selectedLanguage !== "all") params.append("language", selectedLanguage)
      if (priceRange[0] > 0) params.append("minPrice", priceRange[0].toString())
      if (priceRange[1] < 10000) params.append("maxPrice", priceRange[1].toString())
      if (sortBy) params.append("sort", sortBy)

      console.log(params)
      const response = await Afetch(`/api/courses?${params}`)
      const data: ApiResponse = await response.json()
      console.log(data)

      if (data.success) {
        setCourses(data.data) 
        setCategories(data.meta.categories)
        setTotalPages(data.meta.pagination.pages)
        setTotalCourses(data.meta.pagination.total)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError("Failed to fetch courses")
      console.error("fetch courses error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [currentPage, selectedCategory, selectedLevel, selectedLanguage, sortBy])
 
  const handleSearch = () => {
    setCurrentPage(1)
    fetchCourses()
  }

  const handleFilterChange = () => {
    setCurrentPage(1)
    fetchCourses()
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedLevel("all")
    setSelectedLanguage("all")
    setPriceRange([0, 10000])
    setSortBy("createdAt")
    setCurrentPage(1)
    fetchCourses()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getDiscountPercentage = (price: number, discountPrice?: number) => {
    if (!discountPrice) return 0
    return Math.round(((price - discountPrice) / price) * 100)
  }

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-muted rounded w-16"></div>
                    <div className="h-4 bg-muted rounded w-12"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{language === "am" ? "ስህተት ተከስቷል" : "Something went wrong"}</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchCourses}>{language === "am" ? "እንደገና ሞክር" : "Try Again"}</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">{language === "am" ? "ኮርሶች" : "Courses"}</h1>
          <p className="text-muted-foreground dark:text-slate-400">
            {language === "am" ? `${totalCourses} ኮርሶች ተገኝተዋል` : `${totalCourses} courses found`}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={language === "am" ? "ኮርሶችን ይፈልጉ..." : "Search courses..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <Button onClick={handleSearch} className="bg-abuki-primary hover:bg-abuki-accent">
              {language === "am" ? "ፈልግ" : "Search"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden dark:border-slate-600"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {language === "am" ? "ማጣሪያዎች" : "Filters"}
            </Button>
          </div>

          {/* Filters */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${showFilters ? "block" : "hidden lg:grid"}`}
          >
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="dark:bg-slate-800 dark:text-white">
                <SelectValue placeholder={language === "am" ? "ምድብ" : "Category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "am" ? "ሁሉም ምድቦች" : "All Categories"}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {language === "am" ? category.nameAm || category.name : category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedLevel}
              onValueChange={(value) => {
                setSelectedLevel(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="dark:bg-slate-800 dark:text-white">
                <SelectValue placeholder={language === "am" ? "ደረጃ" : "Level"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "am" ? "ሁሉም ደረጃዎች" : "All Levels"}</SelectItem>
                <SelectItem value="beginner">{language === "am" ? "ጀማሪ" : "Beginner"}</SelectItem>
                <SelectItem value="intermediate">{language === "am" ? "መካከለኛ" : "Intermediate"}</SelectItem>
                <SelectItem value="advanced">{language === "am" ? "ከፍተኛ" : "Advanced"}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedLanguage}
              onValueChange={(value) => {
                setSelectedLanguage(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="dark:bg-slate-800 dark:text-white">
                <SelectValue placeholder={language === "am" ? "ቋንቋ" : "Language"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "am" ? "ሁሉም ቋንቋዎች" : "All Languages"}</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="am">አማርኛ</SelectItem>
                <SelectItem value="both">{language === "am" ? "ሁለቱም" : "Both"}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="dark:bg-slate-800 dark:text-white">
                <SelectValue placeholder={language === "am" ? "ደርድር" : "Sort by"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">{language === "am" ? "አዲስ" : "Newest"}</SelectItem>
                <SelectItem value="rating">{language === "am" ? "ደረጃ" : "Rating"}</SelectItem>
                <SelectItem value="totalStudents">{language === "am" ? "ተወዳጅነት" : "Popularity"}</SelectItem>
                <SelectItem value="price">{language === "am" ? "ዋጋ (ዝቅተኛ)" : "Price (Low)"}</SelectItem>
                <SelectItem value="-price">{language === "am" ? "ዋጋ (ከፍተኛ)" : "Price (High)"}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters} className="dark:border-slate-600 bg-transparent">
              <X className="h-4 w-4 mr-2" />
              {language === "am" ? "አጽዳ" : "Clear"}
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-abuki-primary" : "dark:border-slate-600"}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-abuki-primary" : "dark:border-slate-600"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Courses Grid/List */}
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {language === "am" ? "ኮርስ አልተገኘም" : "No courses found"}
            </h3>
            <p className="text-muted-foreground dark:text-slate-400 mb-4">
              {language === "am" ? "የፍለጋ መስፈርቶችዎን ይቀይሩ እና እንደገና ይሞክሩ" : "Try adjusting your search criteria"}
            </p>
            <Button onClick={clearFilters}>{language === "am" ? "ማጣሪያዎችን አጽዳ" : "Clear Filters"}</Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"
            }
          >
            {courses.map((course) => (
              <Card
                key={course._id}
                className="hover:shadow-lg transition-shadow dark:bg-slate-800 dark:border-slate-700"
              >
                <Link href={`/courses/${course._id}`}>
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={language === "am" ? course.titleAm || course.title : course.title}
                      className="w-full aspect-video object-cover rounded-t-lg"
                    />
                    {course.isFeatured && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                        {language === "am" ? "ተመራጭ" : "Featured"}
                      </Badge>
                    )}
                    {course.discountPrice && (
                      <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                        {getDiscountPercentage(course.price, course.discountPrice)}% OFF
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs dark:border-slate-600">
                        {language === "am" ? course.category.nameAm || course.category.name : course.category.name}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 dark:text-white">
                      {language === "am" ? course.titleAm || course.title : course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 dark:text-slate-400">
                      {language === "am"
                        ? course.shortDescriptionAm || course.shortDescription
                        : course.shortDescription}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 dark:text-slate-400">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating.toFixed(1)}</span>
                        <span>({course.totalRatings})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.totalStudents.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{Math.round(course.duration / 60)}h</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {course.discountPrice ? (
                          <>
                            <span className="text-lg font-bold text-abuki-primary">
                              {formatPrice(course.discountPrice)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through dark:text-slate-400">
                              {formatPrice(course.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-abuki-primary">{formatPrice(course.price)}</span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs dark:border-slate-600">
                        {course.level === "beginner"
                          ? language === "am"
                            ? "ጀማሪ"
                            : "Beginner"
                          : course.level === "intermediate"
                            ? language === "am"
                              ? "መካከለኛ"
                              : "Intermediate"
                            : language === "am"
                              ? "ከፍተኛ"
                              : "Advanced"}
                      </Badge>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="dark:border-slate-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  onClick={() => setCurrentPage(pageNum)}
                  className={pageNum === currentPage ? "bg-abuki-primary" : "dark:border-slate-600"}
                >
                  {pageNum}
                </Button>
              )
            })}

            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="dark:border-slate-600"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
