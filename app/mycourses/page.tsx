"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid3X3, List } from "lucide-react"
import CourseCard from "@/components/CourseCard"
import { useLang } from "@/contexts/LanguageContext"
export default function MycoursesPage() {
  const {language} = useLang()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{language === "am" ? "ኮርሶች" : "Your Courses"}</h1>
          <p className="text-muted-foreground">
            {/* {language === "am" ? "ከ3,000+ ኮርሶች ውስጥ የሚፈልጉትን ይምረጡ" : "Choose from 3,000+ courses to advance your skills"} */}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder={language === "am" ? "ኮርሶችን ፈልግ..." : "Search from your courses..."} className="pl-10" />
              </div>
              <div className="flex items-center gap-2">
                <Button>
                    New Course
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
                {language === "am" ? `${courses.length} ኮርሶች ተገኝተዋል` : `${courses.length} courses found published by you`}
              </p>
            </div>

            {/* Course Grid/List */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
              {courses.map((course) => (
                <CourseCard course={course} viewMode={viewMode} language={language}/>
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
