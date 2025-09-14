"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
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
    nameAm: string
  }
  level: string
  price: number
  discountPrice?: number
  thumbnail: string
  rating: number
  totalStudents: number
  duration: number
  totalLessons: number
  language: string
  createdAt: string
}

interface Category {
  _id: string
  name: string
  nameAm: string
  description?: string
  descriptionAm?: string
  icon: string
  courseCount: number
}

export default function HomePage() {
  const { language, t } = useLanguage()
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const AfetchData = async () => {
      try {
        // Afetch featured courses
        const coursesResponse = await Afetch("/api/courses?limit=4&sort=totalStudents&order=desc")
        const coursesData = await coursesResponse.json()

        if (coursesData.success) {
          setFeaturedCourses(coursesData.data)
        }

        // Afetch categories
        const categoriesResponse = await Afetch("/api/categories?limit=8")
        const categoriesData = await categoriesResponse.json()

        if (categoriesData.success) {
          setCategories(categoriesData.data)
        }
      } catch (error) {
        console.error("Error Afetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    AfetchData()
  }, [])

  const stats = [
    { number: "50,000+", label: "Students", labelAm: "ተማሪዎች", icon: Users },
    { number: "3,000+", label: "Courses", labelAm: "ኮርሶች", icon: BookOpen },
    { number: "500+", label: "Instructors", labelAm: "አስተማሪዎች", icon: Award },
    { number: "95%", label: "Success Rate", labelAm: "የስኬት መጠን", icon: TrendingUp },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-abuki-light via-white to-abuki-light/50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-abuki-primary/10 text-abuki-primary border-abuki-primary/20 dark:bg-abuki-primary/20 dark:text-abuki-primary">
                  {t("hero-badge", "🇪🇹 Made for Ethiopians", "🇪🇹 ለኢትዮጵያውያን የተዘጋጀ")}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight dark:text-white">
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
                <p className="text-xl text-muted-foreground max-w-lg dark:text-gray-300">
                  {t(
                    "hero-description",
                    "Join thousands of Ethiopians learning new skills with expert instructors. Start your journey today.",
                    "በአቡኪ ከኢትዮጵያ ምርጥ አስተማሪዎች ጋር ተማሩ። ከቤትዎ ሆነው የሚፈልጉትን ክህሎት ያግኙ።",
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-abuki-primary hover:bg-abuki-accent text-white" asChild>
                  <Link href="/courses">
                    {t("explore-courses", "Explore Courses", "ኮርሶችን ይመልከቱ")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-abuki-primary text-abuki-primary hover:bg-abuki-light bg-transparent dark:border-abuki-primary dark:text-abuki-primary dark:hover:bg-abuki-primary/10"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {t("watch-demo", "Watch Demo", "እንዴት እንደሚሰራ ይመልከቱ")}
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t("search-placeholder", "What do you want to learn?", "የሚፈልጉትን ኮርስ ይፈልጉ...")}
                  className="pl-10 pr-4 h-12 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Ethiopian students learning"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-abuki-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-abuki-secondary/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-abuki-primary text-white dark:bg-gray-800">
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
      <section className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              {t("featured-courses", "Featured Courses", "ተወዳጅ ኮርሶች")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto dark:text-gray-300">
              {t(
                "featured-courses-desc",
                "Most popular courses chosen by thousands of students",
                "በተማሪዎች እና በአስተማሪዎች ዘንድ በጣም ተወዳጅ የሆኑ ኮርሶች",
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <Card
                key={course._id}
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md dark:bg-slate-900 dark:text-white dark:border-gray-700"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg?height=200&width=300"}
                    alt={language === "am" ? course.titleAm || course.title : course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-green-500 text-white">{t("new", "New", "አዲስ")}</Badge>
                  </div>
                  <Button
                    size="sm"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    variant="secondary"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                      {language === "am" ? course.category.nameAm : course.category.name}
                    </Badge>
                    <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2 dark:text-white">
                    {language === "am" ? course.titleAm || course.title : course.title}
                  </CardTitle>
                  <CardDescription className="text-sm dark:text-gray-400">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.totalStudents.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{Math.floor(course.duration / 60)}h</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-abuki-primary">{course.price} ETB</span>
                      {course.discountPrice && (
                        <span className="text-sm text-muted-foreground line-through dark:text-gray-500">
                          {course.discountPrice} ETB
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button className="w-full bg-abuki-primary hover:bg-abuki-accent" asChild>
                    <Link href={`/courses/${course._id}`}>{t("view-course", "View Course", "ኮርሱን ይመልከቱ")}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-abuki-primary text-abuki-primary hover:bg-abuki-light bg-transparent dark:border-abuki-primary dark:text-abuki-primary dark:hover:bg-abuki-primary/10"
              asChild
            >
              <Link href="/courses">
                {t("view-all-courses", "View All Courses", "ሁሉንም ኮርሶች ይመልከቱ")}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/30 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              {t("popular-categories", "Popular Categories", "ምድቦች")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto dark:text-gray-300">
              {t(
                "categories-desc",
                "Explore different fields and find the skills you need",
                "የተለያዩ ዘርፎችን ያስሱ እና የሚፈልጉትን ክህሎት ያግኙ",
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card
                key={category._id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md hover:scale-105 dark:bg-slate-900 dark:text-white dark:border-gray-700"
                asChild
              >
                <Link href={`/courses?category=${category._id}`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold mb-2 dark:text-white">
                      {language === "am" ? category.nameAm : category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      {category.courseCount} {t("courses", "courses", "ኮርሶች")}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Abuki */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              {t("why-choose-abuki", "Why Choose Abuki?", "ለምን አቡኪን ይምረጡ?")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-abuki-light rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-abuki-primary/20">
                <Globe className="h-8 w-8 text-abuki-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                {t("local-content", "Local Content", "የአካባቢ ይዘት")}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300">
                {t(
                  "local-content-desc",
                  "Courses designed for Ethiopian context with Amharic translations",
                  "በኢትዮጵያ አውድ የተዘጋጁ ኮርሶች እና በአማርኛ የተተረጎሙ ይዘቶች",
                )}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-abuki-light rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-abuki-primary/20">
                <Zap className="h-8 w-8 text-abuki-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                {t("fast-learning", "Fast Learning", "ፈጣን ትምህርት")}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300">
                {t(
                  "fast-learning-desc",
                  "Learn practical skills quickly with our structured approach",
                  "በአጭር ጊዜ ውስጥ ተግባራዊ ክህሎቶችን ይማሩ",
                )}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-abuki-light rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-abuki-primary/20">
                <Target className="h-8 w-8 text-abuki-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                {t("goal-oriented", "Goal Oriented", "ግብ ተኮር")}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300">
                {t(
                  "goal-oriented-desc",
                  "Personalized learning paths designed to achieve your goals",
                  "የግል ግቦችዎን ለማሳካት የተዘጋጁ የትምህርት መንገዶች",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-abuki-primary to-abuki-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("start-learning-today", "Start Learning Today!", "ዛሬ ጀምሩ!")}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t(
              "cta-description",
              "Join thousands of students and build your future career",
              "በሺዎች የሚቆጠሩ ተማሪዎች ጋር ይቀላቀሉ እና የወደፊት ስራዎን ይገንቡ",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-abuki-primary hover:bg-gray-100" asChild>
              <Link href="/auth/register">{t("create-free-account", "Create Free Account", "ነፃ መለያ ይፍጠሩ")}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-abuki-primary bg-transparent"
              asChild
            >
              <Link href="/courses">{t("browse-courses", "Browse Courses", "ኮርሶችን ይመልከቱ")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-abuki-primary">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Abuki</span>
              </div>
              <p className="text-gray-400 mb-4">
                {t(
                  "footer-description",
                  "Online learning platform designed for Ethiopians",
                  "ለኢትዮጵያውያን የተዘጋጀ የመስመር ላይ ትምህርት መድረክ",
                )}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("courses", "Courses", "ኮርሶች")}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/courses?category=development" className="hover:text-white">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="/courses?category=business" className="hover:text-white">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="/courses?category=design" className="hover:text-white">
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="/courses?category=marketing" className="hover:text-white">
                    Marketing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("support", "Support", "ድጋፍ")}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("company", "Company", "ኩባንያ")}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Abuki. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
