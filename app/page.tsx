"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import {
  Search,
  Play,
  Star,
  Users,
  Clock,
  BookOpen,
  Award,
  TrendingUp,
  Globe,
  Zap,
  Target,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import CourseCard from "@/components/CourseCard"

export default function HomePage() {
  const [language] = useState("en")

  const featuredCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      titleAm: "ሙሉ ዌብ ዲቨሎፕመንት ኮርስ",
      instructor: "Dr. Abebe Kebede",
      rating: 4.8,
      students: 12543,
      duration: "40 hours",
      price: 2500,
      originalPrice: 4000,
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      level: "Beginner",
      isNew: true,
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      titleAm: "ዲጂታል ማርኬቲንግ ሙሉ ኮርስ",
      instructor: "Hanan Mohammed",
      rating: 4.9,
      students: 8932,
      duration: "25 hours",
      price: 1800,
      originalPrice: 3000,
      image: "/placeholder.svg?height=200&width=300",
      category: "Marketing",
      level: "Intermediate",
      isBestseller: true,
    },
    {
      id: 3,
      title: "Ethiopian Business Law",
      titleAm: "የኢትዮጵያ የንግድ ህግ",
      instructor: "Ato Girma Wolde",
      rating: 4.7,
      students: 5621,
      duration: "30 hours",
      price: 2200,
      originalPrice: 3500,
      image: "/placeholder.svg?height=200&width=300",
      category: "Business",
      level: "Advanced",
      isPopular: true,
    },
    {
      id: 4,
      title: "Mobile App Development with Flutter",
      titleAm: "በFlutter የሞባይል አፕ ዲቨሎፕመንት",
      instructor: "Meron Tadesse",
      rating: 4.6,
      students: 7234,
      duration: "35 hours",
      price: 2800,
      originalPrice: 4200,
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      level: "Intermediate",
      isNew: true,
    },
  ]

  const categories = [
    { name: "Development", nameAm: "ዲቨሎፕመንት", icon: "💻", courses: 1250 },
    { name: "Business", nameAm: "ንግድ", icon: "💼", courses: 890 },
    { name: "Design", nameAm: "ዲዛይን", icon: "🎨", courses: 650 },
    { name: "Marketing", nameAm: "ማርኬቲንግ", icon: "📈", courses: 420 },
    { name: "Photography", nameAm: "ፎቶግራፊ", icon: "📸", courses: 380 },
    { name: "Music", nameAm: "ሙዚቃ", icon: "🎵", courses: 290 },
    { name: "Health", nameAm: "ጤና", icon: "🏥", courses: 340 },
    { name: "Language", nameAm: "ቋንቋ", icon: "🗣️", courses: 520 },
  ]

  const stats = [
    { number: "50,000+", label: "Students", labelAm: "ተማሪዎች", icon: Users },
    { number: "3,000+", label: "Courses", labelAm: "ኮርሶች", icon: BookOpen },
    { number: "500+", label: "Instructors", labelAm: "አስተማሪዎች", icon: Award },
    { number: "95%", label: "Success Rate", labelAm: "የስኬት መጠን", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-abuki-light via-white to-abuki-light/50 dark:from-slate-950 dark:to-abuki-dark">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-abuki-primary/10 text-abuki-primary border-abuki-primary/20">
                  {language === "am" ? "🇪🇹 ለኢትዮጵያውያን የተዘጋጀ" : "Made for Ethiopians by Ethiopians"}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {language === "am" ? (
                    <span className="amharic">
                      ክህሎትዎን <span className="text-abuki-primary">ያሳድጉ</span>
                      <br />
                      ወደፊትዎን ይገንቡ
                    </span>
                  ) : (
                    <>
                      Learn Skills,
                      <br />
                      <span className="text-abuki-primary">Build Your Future</span>
                    </>
                  )}
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  {language === "am"
                    ? "በአቡኪ ከኢትዮጵያ ምርጥ አስተማሪዎች ጋር ተማሩ። ከቤትዎ ሆነው የሚፈልጉትን ክህሎት ያግኙ።"
                    : "Join thousands of Ethiopians learning new skills with expert instructors. Start your journey today."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-abuki-primary hover:bg-abuki-accent text-white">
                  {language === "am" ? "ኮርሶችን ይመልከቱ" : "Explore Courses"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-abuki-primary text-abuki-primary hover:bg-abuki-light bg-transparent"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {language === "am" ? "እንዴት እንደሚሰራ ይመልከቱ" : "Watch Demo"}
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={language === "am" ? "የሚፈልጉትን ኮርስ ይፈልጉ..." : "What do you want to learn?"}
                  className="pl-10 pr-4 h-12 dark:bg-slate-900"
                />
              </div>
            </div>

            {/* <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Ethiopian students learning"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-abuki-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-abuki-secondary/10 rounded-full blur-3xl"></div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16  text-black dark:text-white bg-gradient-to-tr from-abuki-light via-white to-abuki-light/50 dark:from-slate-950 dark:to-abuki-dark ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-4 opacity-80" />
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm opacity-90">{language === "am" ? stat.labelAm : stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "am" ? "ተወዳጅ ኮርሶች" : "Featured Courses"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "am"
                ? "በተማሪዎች እና በአስተማሪዎች ዘንድ በጣም ተወዳጅ የሆኑ ኮርሶች"
                : "Most popular courses chosen by thousands of students"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course,i) => (
              <CourseCard course={course} language={language} key={i}/>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={'/courses'}>
            <Button
              variant="outline"
              size="lg"
              className="border-abuki-primary text-abuki-primary hover:bg-abuki-light bg-transparent"
            >
              {language === "am" ? "ሁሉንም ኮርሶች ይመልከቱ" : "View All Courses"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/30 dark:bg-abuki-dark bg-abuki-primary dark:bg-gradient-to-t dark:from-slate-950 dark:to-slate-950 dark:via-abuki-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{language === "am" ? "ምድቦች" : "Popular Categories"}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto dark:text-green-100">
              {language === "am"
                ? "የተለያዩ ዘርፎችን ያስሱ እና የሚፈልጉትን ክህሎት ያግኙ"
                : "Explore different fields and find the skills you need"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md hover:scale-105 dark:bg-slate-900 dark:text-green-50"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold mb-2">{language === "am" ? category.nameAm : category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.courses} {language === "am" ? "ኮርሶች" : "courses"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Abuki */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "am" ? "ለምን አቡኪን ይምረጡ?" : "Why Choose Abuki?"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-abuki-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-abuki-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{language === "am" ? "የአካባቢ ይዘት" : "Local Content"}</h3>
              <p className="text-muted-foreground">
                {language === "am"
                  ? "በኢትዮጵያ አውድ የተዘጋጁ ኮርሶች እና በአማርኛ የተተረጎሙ ይዘቶች"
                  : "Courses designed for Ethiopian context with Amharic translations"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-abuki-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-abuki-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{language === "am" ? "ፈጣን ትምህርት" : "Fast Learning"}</h3>
              <p className="text-muted-foreground">
                {language === "am"
                  ? "በአጭር ጊዜ ውስጥ ተግባራዊ ክህሎቶችን ይማሩ"
                  : "Learn practical skills quickly with our structured approach"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-abuki-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-abuki-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{language === "am" ? "ግብ ተኮር" : "Goal Oriented"}</h3>
              <p className="text-muted-foreground">
                {language === "am"
                  ? "የግል ግቦችዎን ለማሳካት የተዘጋጁ የትምህርት መንገዶች"
                  : "Personalized learning paths designed to achieve your goals"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white via-abuki-accent to-gray-900 text-white dark:bg-gradient-to-b dark:from-slate-950 dark:to-gray-900 dark:via-abuki-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "am" ? "ዛሬ ጀምሩ!" : "Start Learning Today!"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {language === "am"
              ? "በሺዎች የሚቆጠሩ ተማሪዎች ጋር ይቀላቀሉ እና የወደፊት ስራዎን ይገንቡ"
              : "Join thousands of students and build your future career"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-abuki-primary hover:bg-gray-100">
              {language === "am" ? "ነፃ መለያ ይፍጠሩ" : "Create Free Account"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-abuki-primary bg-transparent"
            >
              {language === "am" ? "ኮርሶችን ይመልከቱ" : "Browse Courses"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
