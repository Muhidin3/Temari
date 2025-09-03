"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Play, BookOpen, Clock, Award, TrendingUp, Calendar, Target, Star, Users, ChevronRight, Download, BarChart3 } from 'lucide-react'
import { useAuth } from "@/contexts/AuthContext"
import { useLang } from "@/contexts/LanguageContext"

export default function StudentDashboard() {
  const {user} = useAuth()
  const {language} = useLang()

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
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "First Course Completed",
      titleAm: "የመጀመሪያ ኮርስ ተጠናቋል",
      description: "Completed your first course",
      descriptionAm: "የመጀመሪያ ኮርስዎን አጠናቀዋል",
      icon: "🎉",
      date: "2024-01-10",
      earned: true,
    },
    {
      id: 2,
      title: "Learning Streak",
      titleAm: "የትምህርት ተከታታይነት",
      description: "7 days learning streak",
      descriptionAm: "7 ቀናት ተከታታይ ትምህርት",
      icon: "🔥",
      date: "2024-01-15",
      earned: true,
    },
    {
      id: 3,
      title: "Quick Learner",
      titleAm: "ፈጣን ተማሪ",
      description: "Complete 5 lessons in one day",
      descriptionAm: "በአንድ ቀን 5 ትምህርቶችን ይጨርሱ",
      icon: "⚡",
      date: null,
      earned: false,
    },
  ]

  const stats = [
    {
      title: "Courses Enrolled",
      titleAm: "የተመዘገቡ ኮርሶች",
      value: "3",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Hours Learned",
      titleAm: "የተማሩ ሰዓቶች",
      value: "61",
      icon: Clock,
      color: "text-green-600",
    },
    {
      title: "Certificates",
      titleAm: "ሰርተፊኬቶች",
      value: "1",
      icon: Award,
      color: "text-purple-600",
    },
    {
      title: "Average Progress",
      titleAm: "አማካይ እድገት",
      value: "65%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Completed lesson",
      actionAm: "ትምህርት ተጠናቋል",
      course: "Web Development Bootcamp",
      lesson: "JavaScript Arrays",
      date: "2024-01-15",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Started new course",
      actionAm: "አዲስ ኮርስ ተጀመረ",
      course: "Ethiopian Business Law",
      lesson: "Introduction to Business Law",
      date: "2024-01-12",
      time: "3 days ago",
    },
    {
      id: 3,
      action: "Earned certificate",
      actionAm: "ሰርተፊኬት ተገኘ",
      course: "Digital Marketing Mastery",
      lesson: "Course Completion",
      date: "2024-01-10",
      time: "5 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{language === "am" ? "የእኔ ዳሽቦርድ" : 'Welcome Back, '+user?.name?.split(' ')[0]}</h1>
          {/* <h1 className="text-3xl font-bold mb-2">{language === "am" ? "የእኔ ዳሽቦርድ" : "My Dashboard"}</h1> */}
          <p className="text-muted-foreground">
            {language === "am" ? "የትምህርት እድገትዎን ይከታተሉ እና ኮርሶችዎን ይቀጥሉ" : "Track your learning progress and continue your courses"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="dark:bg-slate-800 dark:text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{language === "am" ? stat.titleAm : stat.title}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 ">
            <Tabs defaultValue="courses" className="space-y-6 ">
              <TabsList className="grid w-full grid-cols-3 dark:bg-slate-800 dark:text-white">
                <TabsTrigger value="courses">{language === "am" ? "ኮርሶች" : "My Courses"}</TabsTrigger>
                <TabsTrigger value="progress">{language === "am" ? "እድገት" : "Progress"}</TabsTrigger>
                <TabsTrigger value="certificates">{language === "am" ? "ሰርተፊኬቶች" : "Certificates"}</TabsTrigger>
              </TabsList>

              <TabsContent value="courses">
                <div className="space-y-6">
                  <div className="flex items-center justify-between ">
                    <h2 className="text-2xl font-semibold">{language === "am" ? "የእኔ ኮርሶች" : "My Courses"}</h2>
                    <Button variant="outline" asChild>
                      <Link href="/courses">
                        {language === "am" ? "ተጨማሪ ኮርሶች" : "Browse More"}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="space-y-4 ">
                    {enrolledCourses.map((course) => (
                      <Card key={course.id} className="hover:shadow-md transition-shadow dark:bg-slate-900 dark:text-white">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg line-clamp-1">
                                    {language === "am" ? course.titleAm : course.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                                </div>
                                <Badge variant="outline">{course.category}</Badge>
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
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{course.timeSpent}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span>{course.rating}</span>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {course.certificate && (
                                      <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4 mr-1" />
                                        {language === "am" ? "ሰርተፊኬት" : "Certificate"}
                                      </Button>
                                    )}
                                    <Button size="sm" className="bg-abuki-primary hover:bg-abuki-accent">
                                      <Play className="h-4 w-4 mr-1" />
                                      {course.progress === 100
                                        ? language === "am"
                                          ? "እንደገና ይመልከቱ"
                                          : "Review"
                                        : language === "am"
                                          ? "ይቀጥሉ"
                                          : "Continue"}
                                    </Button>
                                  </div>
                                </div>

                                {course.progress < 100 && (
                                  <div className="text-sm text-muted-foreground">
                                    {language === "am" ? "ቀጣይ:" : "Next:"}{" "}
                                    {language === "am" ? course.nextLessonAm : course.nextLesson}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="progress">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">{language === "am" ? "የትምህርት እድገት" : "Learning Progress"}</h2>

                  <div className="grid md:grid-cols-2 gap-6 ">
                    <Card className="dark:bg-slate-900 dark:text-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          {language === "am" ? "ሳምንታዊ እንቅስቃሴ" : "Weekly Activity"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                            <div key={day} className="flex items-center gap-3">
                              <span className="w-8 text-sm">{day}</span>
                              <Progress value={Math.random() * 100} className="flex-1 h-2" />
                              <span className="text-sm text-muted-foreground w-12">
                                {Math.floor(Math.random() * 3)}h
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="dark:bg-slate-900 dark:text-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          {language === "am" ? "የዚህ ወር ግቦች" : "This Month's Goals"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{language === "am" ? "ኮርሶች ይጨርሱ" : "Complete Courses"}</span>
                              <span>1/2</span>
                            </div>
                            <Progress value={50} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{language === "am" ? "የትምህርት ሰዓቶች" : "Learning Hours"}</span>
                              <span>15/20</span>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{language === "am" ? "ተከታታይ ቀናት" : "Streak Days"}</span>
                              <span>7/10</span>
                            </div>
                            <Progress value={70} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="certificates">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">{language === "am" ? "የእኔ ሰርተፊኬቶች" : "My Certificates"}</h2>

                  <div className="grid md:grid-cols-2 gap-6 ">
                    {enrolledCourses
                      .filter((course) => course.certificate)
                      .map((course) => (
                        <Card key={course.id} className="hover:shadow-md transition-shadow dark:bg-slate-900 dark:text-white">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-abuki-primary/10 rounded-full flex items-center justify-center">
                                <Award className="h-6 w-6 text-abuki-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{language === "am" ? course.titleAm : course.title}</h3>
                                <p className="text-sm text-muted-foreground">{course.instructor}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-muted-foreground">
                                {language === "am" ? "ተጠናቋል" : "Completed"}: {course.lastWatched}
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                {language === "am" ? "አውርድ" : "Download"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="dark:bg-slate-900 dark:text-white">
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "የቅርብ ጊዜ እንቅስቃሴ" : "Recent Activity"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="w-2 h-2 bg-abuki-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">
                          {language === "am" ? activity.actionAm : activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{activity.course}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="dark:bg-slate-900 dark:text-white">
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "ስኬቶች" : "Achievements"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.earned ? "bg-abuki-light/50" : "bg-muted/50 opacity-60"
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">
                          {language === "am" ? achievement.titleAm : achievement.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === "am" ? achievement.descriptionAm : achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-abuki-primary">{achievement.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card className="dark:bg-slate-900 dark:text-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  🔥 {language === "am" ? "የትምህርት ተከታታይነት" : "Learning Streak"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-abuki-primary mb-2">7</div>
                  <p className="text-sm text-muted-foreground">
                    {language === "am" ? "ተከታታይ ቀናት" : "days in a row"}
                  </p>
                  <Button className="w-full mt-4 bg-abuki-primary hover:bg-abuki-accent">
                    {language === "am" ? "ዛሬ ይማሩ" : "Learn Today"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
