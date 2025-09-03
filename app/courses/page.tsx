"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Navigation } from "@/components/navigation"
import { Search, Filter, Star, Users, Clock, Play, Heart, ShoppingCart, Grid3X3, List, FilterIcon } from "lucide-react"
import { Close } from "@radix-ui/react-toast"
import CourseCard from "@/components/CourseCard"
import { useLang } from "@/contexts/LanguageContext"
export default function CoursesPage() {
  const {language} = useLang()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("popularity")
  const [filtersStatus,setFilterStatus] = useState(false)

  const courses = [
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
    // Add more courses...
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{language === "am" ? "ኮርሶች" : "All Courses"}</h1>
          <p className="text-muted-foreground">
            {language === "am" ? "ከ3,000+ ኮርሶች ውስጥ የሚፈልጉትን ይምረጡ" : "Choose from 3,000+ courses to advance your skills"}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 relative ${filtersStatus?'':'hidden'}`}>
            <Card className="sticky top-24">
            <Button onClick={()=>setFilterStatus(false)} variant={'ghost'} className="absolute right-5 top-5">
              X
            </Button>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  {language === "am" ? "ማጣሪያዎች" : "Filters"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div className="">
                  <Label className="text-sm font-medium mb-3 block">
                    {language === "am" ? "ዋጋ (ETB)" : "Price (ETB)"}
                  </Label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0]} ETB</span>
                    <span>{priceRange[1]} ETB</span>
                  </div>
                </div>
                <div className="flex flex-row justify-between flex-wrap gap-y-5">
                {/* Categories */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">{language === "am" ? "ምድቦች" : "Categories"}</Label>
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
                  <Label className="text-sm font-medium mb-3 block">{language === "am" ? "ደረጃ አሰጣጥ" : "Rating"}</Label>
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder={language === "am" ? "ኮርሶችን ፈልግ..." : "Search courses..."} className="pl-10" />
              </div>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">{language === "am" ? "ተወዳጅነት" : "Most Popular"}</SelectItem>
                    <SelectItem value="rating">{language === "am" ? "ከፍተኛ ደረጃ" : "Highest Rated"}</SelectItem>
                    <SelectItem value="newest">{language === "am" ? "አዲስ" : "Newest"}</SelectItem>
                    <SelectItem value="price-low">{language === "am" ? "ዝቅተኛ ዋጋ" : "Price: Low to High"}</SelectItem>
                    <SelectItem value="price-high">{language === "am" ? "ከፍተኛ ዋጋ" : "Price: High to Low"}</SelectItem>
                  </SelectContent>
                </Select>

              <Button onClick={()=>setFilterStatus(true)}>
                <FilterIcon/>
              </Button>

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

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {language === "am" ? `${courses.length} ኮርሶች ተገኝተዋል` : `${courses.length} courses found`}
              </p>
            </div>

            {/* Course Grid/List */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
              {courses.map((course,i) => (
                <CourseCard key={i} course={course} viewMode={viewMode} language={language}/>
              ))}
            </div>

            {/* Pagination */}
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
          </div>
        </div>
      </div>
    </div>
  )
}
