"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Play, BookOpen, Clock, Award, Star, ChevronRight, Download, Calendar } from "lucide-react"
import { useLang } from "@/contexts/LanguageContext"
export default function MyCoursesPage() {
  const {language} = useLang()
  const [activeTab, setActiveTab] = useState("all")

  const enrolledCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      titleAm: "ሙሉ ዌብ ዲቨሎፕመንት ኮርስ",
      instructor: "Dr. Abebe Kebede",
      progress: 65,
      totalLessons: 156,
      completedLessons: 101,
      timeSpent: "28 hours",
      lastWatched: "2024-01-15",
      nextLesson: "JavaScript Functions",
      nextLessonAm: "የJavaScript ተግባራት",
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      rating: 4.8,
      certificate: false,
      status: "in-progress",
      enrolledDate: "2024-01-01",
      estimatedCompletion: "2024-02-15",
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      titleAm: "ዲጂታል ማርኬቲንግ ሙሉ ኮርስ",
      instructor: "Hanan Mohammed",
      progress: 100,
      totalLessons: 89,
      completedLessons: 89,
      timeSpent: "25 hours",
      lastWatched: "2024-01-10",
      nextLesson: "Course Completed",
      nextLessonAm: "ኮርሱ ተጠናቋል",
      image: "/placeholder.svg?height=200&width=300",
      category: "Marketing",
      rating: 4.9,
      certificate: true,
      status: "completed",
      enrolledDate: "2023-12-01",
      completedDate: "2024-01-10",
    },
    {
      id: 3,
      title: "Ethiopian Business Law",
      titleAm: "የኢትዮጵያ የንግድ ህግ",
      instructor: "Ato Girma Wolde",
      progress: 30,
      totalLessons: 45,
      completedLessons: 14,
      timeSpent: "8 hours",
      lastWatched: "2024-01-12",
      nextLesson: "Contract Law Basics",
      nextLessonAm: "የውል ህግ መሰረቶች",
      image: "/placeholder.svg?height=200&width=300",
      category: "Business",
      rating: 4.7,
      certificate: false,
      status: "in-progress",
      enrolledDate: "2024-01-05",
      estimatedCompletion: "2024-03-01",
    },
    {
      id: 4,
      title: "Python Programming Fundamentals",
      titleAm: "የPython ፕሮግራሚንግ መሰረቶች",
      instructor: "Sara Mohammed",
      progress: 0,
      totalLessons: 78,
      completedLessons: 0,
      timeSpent: "0 hours",
      lastWatched: null,
      nextLesson: "Introduction to Python",
      nextLessonAm: "የPython መግቢያ",
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      rating: 4.6,
      certificate: false,
      status: "not-started",
      enrolledDate: "2024-01-14",
      estimatedCompletion: "2024-04-01",
    },
  ]

  const getFilteredCourses = () => {
    switch (activeTab) {
      case "in-progress":
        return enrolledCourses.filter((course) => course.status === "in-progress")
      case "completed":
        return enrolledCourses.filter((course) => course.status === "completed")
      case "not-started":
        return enrolledCourses.filter((course) => course.status === "not-started")
      default:
        return enrolledCourses
    }
  }

  const stats = [
    {
      label: "Total Courses",
      labelAm: "ጠቅላላ ኮርሶች",
      value: enrolledCourses.length.toString(),
      icon: BookOpen,
    },
    {
      label: "Completed",
      labelAm: "የተጠናቀቁ",
      value: enrolledCourses.filter((c) => c.status === "completed").length.toString(),
      icon: Award,
    },
    {
      label: "In Progress",
      labelAm: "በሂደት ላይ",
      value: enrolledCourses.filter((c) => c.status === "in-progress").length.toString(),
      icon: Play,
    },
    {
      label: "Total Hours",
      labelAm: "ጠቅላላ ሰዓቶች",
      value: enrolledCourses.reduce((total, course) => total + Number.parseInt(course.timeSpent), 0).toString() + "h",
      icon: Clock,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{language === "am" ? "የእኔ ኮርሶች" : "My Courses"}</h1>
          <p className="text-muted-foreground">
            {language === "am"
              ? "የተመዘገቡባቸውን ኮርሶች ይቀጥሉ እና እድገትዎን ይከታተሉ"
              : "Continue your enrolled courses and track your progress"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{language === "am" ? stat.labelAm : stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-abuki-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {language === "am" ? "ሁሉም" : "All"} ({enrolledCourses.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              {language === "am" ? "በሂደት ላይ" : "In Progress"} (
              {enrolledCourses.filter((c) => c.status === "in-progress").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              {language === "am" ? "የተጠናቀቁ" : "Completed"} (
              {enrolledCourses.filter((c) => c.status === "completed").length})
            </TabsTrigger>
            <TabsTrigger value="not-started">
              {language === "am" ? "ያልተጀመሩ" : "Not Started"} (
              {enrolledCourses.filter((c) => c.status === "not-started").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-6">
              {getFilteredCourses().map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg line-clamp-1">
                                {language === "am" ? course.titleAm : course.title}
                              </h3>
                              <Badge variant="outline">{course.category}</Badge>
                              {course.certificate && (
                                <Badge className="bg-green-500 hover:bg-green-600">
                                  <Award className="h-3 w-3 mr-1" />
                                  {language === "am" ? "ሰርተፊኬት" : "Certificate"}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{course.timeSpent}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {language === "am" ? "ተመዝግቧል" : "Enrolled"}: {course.enrolledDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>
                                {language === "am" ? "እድገት" : "Progress"}: {course.completedLessons}/
                                {course.totalLessons} {language === "am" ? "ትምህርቶች" : "lessons"}
                              </span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {course.status === "completed" ? (
                                <span className="text-green-600 font-medium">
                                  {language === "am" ? "ተጠናቋል" : "Completed"} {course.completedDate}
                                </span>
                              ) : course.status === "not-started" ? (
                                <span>
                                  {language === "am" ? "ቀጣይ:" : "Next:"}{" "}
                                  {language === "am" ? course.nextLessonAm : course.nextLesson}
                                </span>
                              ) : (
                                <span>
                                  {language === "am" ? "ቀጣይ:" : "Next:"}{" "}
                                  {language === "am" ? course.nextLessonAm : course.nextLesson}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              {course.certificate && course.status === "completed" && (
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-1" />
                                  {language === "am" ? "ሰርተፊኬት" : "Certificate"}
                                </Button>
                              )}
                              <Button size="sm" className="bg-abuki-primary hover:bg-abuki-accent" asChild>
                                <Link href={`/student/learn/${course.id}`}>
                                  <Play className="h-4 w-4 mr-1" />
                                  {course.status === "completed"
                                    ? language === "am"
                                      ? "እንደገና ይመልከቱ"
                                      : "Review"
                                    : course.status === "not-started"
                                      ? language === "am"
                                        ? "ጀምር"
                                        : "Start"
                                      : language === "am"
                                        ? "ይቀጥሉ"
                                        : "Continue"}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {getFilteredCourses().length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {language === "am" ? "ኮርስ አልተገኘም" : "No courses found"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === "all"
                      ? language === "am"
                        ? "ገና በምንም ኮርስ አልተመዘገቡም"
                        : "You haven't enrolled in any courses yet"
                      : language === "am"
                        ? `በዚህ ምድብ ውስጥ ኮርስ የለም`
                        : `No courses in this category`}
                  </p>
                  <Button asChild>
                    <Link href="/courses">
                      {language === "am" ? "ኮርሶችን ይመልከቱ" : "Browse Courses"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
