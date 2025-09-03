"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Navigation } from "@/components/navigation"
import { Search, Filter, Star, Users, Clock, Play, Heart, ShoppingCart, Grid3X3, List, X } from "lucide-react"
import { useLang } from "@/contexts/LanguageContext"
export default function SearchPage() {
  const searchParams = useSearchParams()
  const {language} = useLang()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)

  // Mock search results
  const searchResults = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      titleAm: "ሙሉ ዌብ ዲቨሎፕመንት ኮርስ",
      instructor: "Dr. Abebe Kebede",
      rating: 4.8,
      students: 12543,
      duration: "40 hours",
      lectures: 156,
      price: 2500,
      originalPrice: 4000,
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      level: "Beginner",
      isNew: true,
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
      descriptionAm: "HTML, CSS, JavaScript, React, Node.js እና ሌሎችንም ይማሩ",
      lastUpdated: "2024-01-15",
      language: "English/Amharic",
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      titleAm: "ዲጂታል ማርኬቲንግ ሙሉ ኮርስ",
      instructor: "Hanan Mohammed",
      rating: 4.9,
      students: 8932,
      duration: "25 hours",
      lectures: 89,
      price: 1800,
      originalPrice: 3000,
      image: "/placeholder.svg?height=200&width=300",
      category: "Marketing",
      level: "Intermediate",
      isBestseller: true,
      description: "Master social media, SEO, PPC, and content marketing",
      descriptionAm: "ሶሻል ሚዲያ፣ SEO፣ PPC እና ይዘት ማርኬቲንግን ይቆጣጠሩ",
      lastUpdated: "2024-01-10",
      language: "English/Amharic",
    },
    {
      id: 3,
      title: "Ethiopian Business Law",
      titleAm: "የኢትዮጵያ የንግድ ህግ",
      instructor: "Ato Girma Wolde",
      rating: 4.7,
      students: 5621,
      duration: "30 hours",
      lectures: 45,
      price: 2200,
      originalPrice: 3500,
      image: "/placeholder.svg?height=200&width=300",
      category: "Business",
      level: "Advanced",
      isPopular: true,
      description: "Comprehensive guide to Ethiopian business law and regulations",
      descriptionAm: "የኢትዮጵያ የንግድ ህግ እና ደንቦች ሙሉ መመሪያ",
      lastUpdated: "2024-01-12",
      language: "Amharic",
    },
    {
      id: 4,
      title: "Mobile App Development with Flutter",
      titleAm: "በFlutter የሞባይል አፕ ዲቨሎፕመንት",
      instructor: "Meron Tadesse",
      rating: 4.6,
      students: 7234,
      duration: "35 hours",
      lectures: 120,
      price: 2800,
      originalPrice: 4200,
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      level: "Intermediate",
      isNew: true,
      description: "Build cross-platform mobile apps with Flutter and Dart",
      descriptionAm: "በFlutter እና Dart ክሮስ-ፕላትፎርም ሞባይል አፕሊኬሽኖች ይገንቡ",
      lastUpdated: "2024-01-08",
      language: "English/Amharic",
    },
  ]

  const categories = [
    { id: "development", name: "Development", nameAm: "ዲቨሎፕመንት", count: 1250 },
    { id: "business", name: "Business", nameAm: "ንግድ", count: 890 },
    { id: "design", name: "Design", nameAm: "ዲዛይን", count: 650 },
    { id: "marketing", name: "Marketing", nameAm: "ማርኬቲንግ", count: 420 },
    { id: "photography", name: "Photography", nameAm: "ፎቶግራፊ", count: 380 },
    { id: "music", name: "Music", nameAm: "ሙዚቃ", count: 290 },
  ]

  const levels = [
    { id: "beginner", name: "Beginner", nameAm: "ጀማሪ" },
    { id: "intermediate", name: "Intermediate", nameAm: "መካከለኛ" },
    { id: "advanced", name: "Advanced", nameAm: "ከፍተኛ" },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleLevelChange = (levelId: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, levelId])
    } else {
      setSelectedLevels(selectedLevels.filter((id) => id !== levelId))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedLevels([])
    setPriceRange([0, 5000])
  }

  const activeFiltersCount =
    selectedCategories.length + selectedLevels.length + (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{language === "am" ? "የፍለጋ ውጤቶች" : "Search Results"}</h1>
          {searchQuery && (
            <p className="text-muted-foreground">
              {language === "am" ? `"${searchQuery}" ለሚለው ፍለጋ` : `Results for "${searchQuery}"`} -{" "}
              {searchResults.length} {language === "am" ? "ኮርሶች ተገኝተዋል" : "courses found"}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  {language === "am" ? "ማጣሪያዎች" : "Filters"}
                  {activeFiltersCount > 0 && <Badge className="ml-2 bg-abuki-primary">{activeFiltersCount}</Badge>}
                </Button>
              </div>

              <Card className={`${showFilters ? "block" : "hidden"} lg:block`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      {language === "am" ? "ማጣሪያዎች" : "Filters"}
                    </CardTitle>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="h-4 w-4 mr-1" />
                        {language === "am" ? "አጽዳ" : "Clear"}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {language === "am" ? "ዋጋ (ETB)" : "Price (ETB)"}
                    </Label>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="mb-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0]} ETB</span>
                      <span>{priceRange[1]} ETB</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {language === "am" ? "ምድቦች" : "Categories"}
                    </Label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                          />
                          <Label htmlFor={category.id} className="text-sm flex-1 cursor-pointer">
                            {language === "am" ? category.nameAm : category.name}
                          </Label>
                          <span className="text-xs text-muted-foreground">({category.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Levels */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">{language === "am" ? "ደረጃ" : "Level"}</Label>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <div key={level.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={level.id}
                            checked={selectedLevels.includes(level.id)}
                            onCheckedChange={(checked) => handleLevelChange(level.id, checked as boolean)}
                          />
                          <Label htmlFor={level.id} className="text-sm cursor-pointer">
                            {language === "am" ? level.nameAm : level.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {language === "am" ? "የኮርሱ ርዝመት" : "Duration"}
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="short" />
                        <Label htmlFor="short" className="text-sm cursor-pointer">
                          {language === "am" ? "0-2 ሰዓት" : "0-2 hours"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="medium" />
                        <Label htmlFor="medium" className="text-sm cursor-pointer">
                          {language === "am" ? "3-6 ሰዓት" : "3-6 hours"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="long" />
                        <Label htmlFor="long" className="text-sm cursor-pointer">
                          {language === "am" ? "7+ ሰዓት" : "7+ hours"}
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {language === "am" ? "ደረጃ አሰጣጥ" : "Rating"}
                    </Label>
                    <div className="space-y-2">
                      {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`rating-${rating}`} />
                          <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                            <div className="flex items-center mr-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : i < rating
                                        ? "fill-yellow-400/50 text-yellow-400"
                                        : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            {rating}+ {language === "am" ? "እና ከዚያ በላይ" : "& up"}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={language === "am" ? "ኮርሶችን ፈልግ..." : "Search courses..."}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">{language === "am" ? "ተዛማጅነት" : "Most Relevant"}</SelectItem>
                    <SelectItem value="popularity">{language === "am" ? "ተወዳጅነት" : "Most Popular"}</SelectItem>
                    <SelectItem value="rating">{language === "am" ? "ከፍተኛ ደረጃ" : "Highest Rated"}</SelectItem>
                    <SelectItem value="newest">{language === "am" ? "አዲስ" : "Newest"}</SelectItem>
                    <SelectItem value="price-low">{language === "am" ? "ዝቅተኛ ዋጋ" : "Price: Low to High"}</SelectItem>
                    <SelectItem value="price-high">{language === "am" ? "ከፍተኛ ዋጋ" : "Price: High to Low"}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((categoryId) => {
                  const category = categories.find((c) => c.id === categoryId)
                  return (
                    <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                      {language === "am" ? category?.nameAm : category?.name}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(categoryId, false)} />
                    </Badge>
                  )
                })}
                {selectedLevels.map((levelId) => {
                  const level = levels.find((l) => l.id === levelId)
                  return (
                    <Badge key={levelId} variant="secondary" className="flex items-center gap-1">
                      {language === "am" ? level?.nameAm : level?.name}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleLevelChange(levelId, false)} />
                    </Badge>
                  )
                })}
                {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {priceRange[0]} - {priceRange[1]} ETB
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 5000])} />
                  </Badge>
                )}
              </div>
            )}

            {/* Course Grid/List */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
              {searchResults.map((course) => (
                <Card
                  key={course.id}
                  className={`group hover:shadow-lg transition-all duration-300 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className={`object-cover ${
                        viewMode === "list" ? "w-full h-full rounded-l-lg" : "w-full h-48 rounded-t-lg"
                      }`}
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {course.isNew && (
                        <Badge className="bg-green-500 text-white">{language === "am" ? "አዲስ" : "New"}</Badge>
                      )}
                      {course.isBestseller && (
                        <Badge className="bg-orange-500 text-white">
                          {language === "am" ? "ምርጥ ሽያጭ" : "Bestseller"}
                        </Badge>
                      )}
                      {course.isPopular && (
                        <Badge className="bg-purple-500 text-white">{language === "am" ? "ተወዳጅ" : "Popular"}</Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1">
                    <CardHeader className={viewMode === "list" ? "pb-2" : "pb-3"}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>
                      <CardTitle
                        className={`leading-tight line-clamp-2 ${viewMode === "list" ? "text-lg" : "text-lg"}`}
                      >
                        {language === "am" ? course.titleAm : course.title}
                      </CardTitle>
                      <CardDescription className="text-sm">{course.instructor}</CardDescription>
                      {viewMode === "list" && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                          {language === "am" ? course.descriptionAm : course.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className={viewMode === "list" ? "pt-0 pb-2" : "pt-0"}>
                      <div
                        className={`flex items-center gap-4 text-sm text-muted-foreground mb-3 ${
                          viewMode === "list" ? "flex-wrap" : ""
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        {viewMode === "list" && (
                          <div className="text-xs">
                            {course.lectures} {language === "am" ? "ትምህርቶች" : "lectures"}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-abuki-primary">{course.price} ETB</span>
                          <span className="text-sm text-muted-foreground line-through">{course.originalPrice} ETB</span>
                        </div>
                        {viewMode === "list" && (
                          <div className="text-xs text-muted-foreground">
                            {language === "am" ? "ተዘምኗል" : "Updated"} {course.lastUpdated}
                          </div>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className={`gap-2 ${viewMode === "list" ? "pt-0" : ""}`}>
                      <Button className="flex-1 bg-abuki-primary hover:bg-abuki-accent">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {language === "am" ? "ወደ ጋሪ ጨምር" : "Add to Cart"}
                      </Button>
                      {viewMode === "list" && (
                        <Button variant="outline" className="flex-1 bg-transparent">
                          {language === "am" ? "ዝርዝር ይመልከቱ" : "View Details"}
                        </Button>
                      )}
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {language === "am" ? "ምንም ኮርስ አልተገኘም" : "No courses found"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === "am"
                    ? "የፍለጋ ቃልዎን ይቀይሩ ወይም ማጣሪያዎችን ያስተካክሉ"
                    : "Try adjusting your search terms or filters"}
                </p>
                <Button onClick={clearFilters} variant="outline">
                  {language === "am" ? "ማጣሪያዎችን አጽዳ" : "Clear Filters"}
                </Button>
              </div>
            )}

            {/* Pagination */}
            {searchResults.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button variant="outline" disabled>
                    {language === "am" ? "ቀዳሚ" : "Previous"}
                  </Button>
                  <Button variant="default" className="bg-abuki-primary">
                    1
                  </Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <span className="px-2">...</span>
                  <Button variant="outline">10</Button>
                  <Button variant="outline">{language === "am" ? "ቀጣይ" : "Next"}</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
