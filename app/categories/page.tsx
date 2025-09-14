"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Search, TrendingUp, Users, BookOpen, ArrowRight, Filter } from 'lucide-react'

export default function CategoriesPage() {
  const [language] = useState("en")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    {
      id: "development",
      name: "Development",
      nameAm: "ዲቨሎፕመንት",
      description: "Learn programming, web development, mobile apps and more",
      descriptionAm: "ፕሮግራሚንግ፣ ዌብ ዲቨሎፕመንት፣ ሞባይል አፕሊኬሽኖች እና ሌሎችንም ይማሩ",
      icon: "💻",
      courses: 1250,
      students: 45000,
      avgRating: 4.7,
      trending: true,
      color: "bg-blue-500",
      subcategories: ["Web Development", "Mobile Development", "Game Development", "Data Science"],
    },
    {
      id: "business",
      name: "Business",
      nameAm: "ንግድ",
      description: "Master business skills, entrepreneurship and management",
      descriptionAm: "የንግድ ክህሎቶች፣ ስራ ፈጠራ እና አስተዳደርን ይቆጣጠሩ",
      icon: "💼",
      courses: 890,
      students: 32000,
      avgRating: 4.6,
      trending: false,
      color: "bg-green-500",
      subcategories: ["Entrepreneurship", "Management", "Finance", "Marketing"],
    },
    {
      id: "design",
      name: "Design",
      nameAm: "ዲዛይን",
      description: "Create beautiful designs, UI/UX and graphic design",
      descriptionAm: "ውብ ዲዛይኖች፣ UI/UX እና ግራፊክ ዲዛይን ይፍጠሩ",
      icon: "🎨",
      courses: 650,
      students: 28000,
      avgRating: 4.8,
      trending: true,
      color: "bg-purple-500",
      subcategories: ["UI/UX Design", "Graphic Design", "Web Design", "Logo Design"],
    },
    {
      id: "marketing",
      name: "Marketing",
      nameAm: "ማርኬቲንግ",
      description: "Digital marketing, social media and advertising strategies",
      descriptionAm: "ዲጂታል ማርኬቲንግ፣ ሶሻል ሚዲያ እና የማስታወቂያ ስትራቴጂዎች",
      icon: "📈",
      courses: 420,
      students: 18000,
      avgRating: 4.5,
      trending: true,
      color: "bg-orange-500",
      subcategories: ["Digital Marketing", "Social Media", "SEO", "Content Marketing"],
    },
    {
      id: "photography",
      name: "Photography",
      nameAm: "ፎቶግራፊ",
      description: "Learn photography techniques and photo editing",
      descriptionAm: "የፎቶግራፊ ቴክኒኮች እና የፎቶ አርትዖት ይማሩ",
      icon: "📸",
      courses: 380,
      students: 15000,
      avgRating: 4.7,
      trending: false,
      color: "bg-pink-500",
      subcategories: ["Portrait Photography", "Landscape", "Photo Editing", "Commercial Photography"],
    },
    {
      id: "music",
      name: "Music",
      nameAm: "ሙዚቃ",
      description: "Music production, instruments and music theory",
      descriptionAm: "የሙዚቃ ምርት፣ መሳሪያዎች እና የሙዚቃ ንድፈ ሃሳብ",
      icon: "🎵",
      courses: 290,
      students: 12000,
      avgRating: 4.6,
      trending: false,
      color: "bg-indigo-500",
      subcategories: ["Music Production", "Guitar", "Piano", "Music Theory"],
    },
    {
      id: "health",
      name: "Health & Fitness",
      nameAm: "ጤና እና ብቃት",
      description: "Health, fitness, nutrition and wellness courses",
      descriptionAm: "ጤና፣ ብቃት፣ አመጋገብ እና ደህንነት ኮርሶች",
      icon: "🏥",
      courses: 340,
      students: 20000,
      avgRating: 4.4,
      trending: false,
      color: "bg-red-500",
      subcategories: ["Fitness", "Nutrition", "Mental Health", "Yoga"],
    },
    {
      id: "language",
      name: "Language",
      nameAm: "ቋንቋ",
      description: "Learn new languages and improve communication skills",
      descriptionAm: "አዲስ ቋንቋዎችን ይማሩ እና የመግባቢያ ክህሎቶችን ያሻሽሉ",
      icon: "🗣️",
      courses: 520,
      students: 25000,
      avgRating: 4.5,
      trending: true,
      color: "bg-teal-500",
      subcategories: ["English", "Amharic", "French", "Spanish"],
    },
  ]

  const filteredCategories = categories.filter((category) =>
    (language === "am" ? category.nameAm : category.name).toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{language === "am" ? "ምድቦች" : "Course Categories"}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "am"
              ? "የተለያዩ ዘርፎችን ያስሱ እና የሚፈልጉትን ክህሎት ያግኙ"
              : "Explore different fields and find the skills you need to advance your career"}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={language === "am" ? "ምድቦችን ፈልግ..." : "Search categories..."}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-abuki-primary">8</div>
              <div className="text-sm text-muted-foreground">{language === "am" ? "ምድቦች" : "Categories"}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-abuki-primary">4,740</div>
              <div className="text-sm text-muted-foreground">{language === "am" ? "ኮርሶች" : "Courses"}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-abuki-primary">195K</div>
              <div className="text-sm text-muted-foreground">{language === "am" ? "ተማሪዎች" : "Students"}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-abuki-primary">4.6</div>
              <div className="text-sm text-muted-foreground">{language === "am" ? "አማካይ ደረጃ" : "Avg Rating"}</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  {category.trending && (
                    <Badge className="bg-abuki-primary/10 text-abuki-primary">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {language === "am" ? "ተወዳጅ" : "Trending"}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{language === "am" ? category.nameAm : category.name}</CardTitle>
                <CardDescription>{language === "am" ? category.descriptionAm : category.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-abuki-primary" />
                    <span>
                      {category.courses} {language === "am" ? "ኮርሶች" : "courses"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-abuki-primary" />
                    <span>
                      {category.students.toLocaleString()} {language === "am" ? "ተማሪዎች" : "students"}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    {language === "am" ? "ንዑስ ምድቦች:" : "Subcategories:"}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.slice(0, 3).map((sub, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {sub}
                      </Badge>
                    ))}
                    {category.subcategories.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.subcategories.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <Link href={`/courses?category=${category.id}`}>
                  <Button className="w-full bg-abuki-primary hover:bg-abuki-accent group-hover:bg-abuki-accent">
                    {language === "am" ? "ኮርሶችን ይመልከቱ" : "Explore Courses"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
