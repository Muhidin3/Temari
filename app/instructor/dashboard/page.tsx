"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { DollarSign, Users, BookOpen, Star, TrendingUp, TrendingDown, Eye, Play, MessageCircle, Calendar, BarChart3, PieChart, Plus, Edit, Settings } from 'lucide-react'
import Afetch from "@/lib/Afetch"

export default function InstructorDashboard() {
  const [language] = useState("en")
  const [timeRange, setTimeRange] = useState("month")

  const stats = [
    {
      title: "Total Revenue",
      titleAm: "ጠቅላላ ገቢ",
      value: "45,230 ETB",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Enrollments",
      titleAm: "ጠቅላላ ምዝገባዎች",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      titleAm: "ንቁ ኮርሶች",
      value: "12",
      change: "+2",
      trend: "up",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Average Rating",
      titleAm: "አማካይ ደረጃ",
      value: "4.8",
      change: "+0.1",
      trend: "up",
      icon: Star,
      color: "text-yellow-600",
    },
  ]

  const [courses,setCourses] = useState([
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      titleAm: "ሙሉ ዌብ ዲቨሎፕመንት ኮርስ",
      students: 1234,
      revenue: "30,850 ETB",
      rating: 4.8,
      reviews: 456,
      status: "published",
      lastUpdated: "2024-01-15",
      views: 15420,
      completionRate: 78,
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      titleAm: "የላቀ JavaScript ጽንሰ-ሀሳቦች",
      students: 892,
      revenue: "22,300 ETB",
      rating: 4.9,
      reviews: 234,
      status: "published",
      lastUpdated: "2024-01-12",
      views: 12340,
      completionRate: 85,
    },
    {
      id: 3,
      title: "React for Beginners",
      titleAm: "React ለጀማሪዎች",
      students: 567,
      revenue: "14,175 ETB",
      rating: 4.7,
      reviews: 123,
      status: "draft",
      lastUpdated: "2024-01-10",
      views: 8900,
      completionRate: 72,
    },
  ])

  const recentReviews = [
    {
      id: 1,
      student: "Meron Tadesse",
      course: "Web Development Bootcamp",
      rating: 5,
      comment: "Excellent course! Very detailed and practical.",
      commentAm: "በጣም ጥሩ ኮርስ! በጣም ዝርዝር እና ተግባራዊ።",
      date: "2024-01-15",
    },
    {
      id: 2,
      student: "Dawit Alemayehu",
      course: "Advanced JavaScript",
      rating: 4,
      comment: "Great content, would recommend to others.",
      commentAm: "ጥሩ ይዘት፣ ለሌሎች እመክራለሁ።",
      date: "2024-01-14",
    },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 12000, enrollments: 45, margin: 8500 },
    { month: "Feb", revenue: 15000, enrollments: 62, margin: 11200 },
    { month: "Mar", revenue: 18000, enrollments: 78, margin: 13800 },
    { month: "Apr", revenue: 22000, enrollments: 89, margin: 16500 },
    { month: "May", revenue: 25000, enrollments: 95, margin: 19200 },
    { month: "Jun", revenue: 28000, enrollments: 102, margin: 21800 },
  ]

  useEffect(()=>{
     (async()=>{
        const ress = await Afetch('/api/instructor/courses').then(async(d)=>(await d.json()))
        const res = ress.data
        setCourses(
          res.map(({title,titleAm,status,rating,...course}:any)=>({
            id: course._id,
            title,
            titleAm,
            students: course.totalStudents,
            revenue: "30,850 ETB",
            rating,
            reviews: 456,
            status,
            lastUpdated: "2024-01-15",
            views: 15420,
            completionRate: 78,
          }))
        )
     })()
  },[])
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {language === "am" ? "የአስተማሪ ዳሽቦርድ" : "Instructor Dashboard"}
            </h1>
            <p className="text-muted-foreground">
              {language === "am" ? "የኮርስ አፈጻጸም እና ገቢዎን ይከታተሉ" : "Track your course performance and earnings"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/instructor/courses/new">
                <Plus className="mr-2 h-4 w-4" />
                {language === "am" ? "አዲስ ኮርስ" : "New Course"}
              </Link>
            </Button>
            <Button className="bg-abuki-primary hover:bg-abuki-accent" asChild>
              <Link href="/instructor/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                {language === "am" ? "ዝርዝር ትንተና" : "View Analytics"}
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{language === "am" ? stat.titleAm : stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">{language === "am" ? "አጠቃላይ እይታ" : "Overview"}</TabsTrigger>
                <TabsTrigger value="courses">{language === "am" ? "ኮርሶች" : "Courses"}</TabsTrigger>
                <TabsTrigger value="revenue">{language === "am" ? "ገቢ" : "Revenue"}</TabsTrigger>
                <TabsTrigger value="students">{language === "am" ? "ተማሪዎች" : "Students"}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* Revenue Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        {language === "am" ? "ወርሃዊ ገቢ እና ምዝገባዎች" : "Monthly Revenue & Enrollments"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between gap-2">
                        {monthlyData.map((data, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full bg-muted rounded-t relative" style={{ height: "200px" }}>
                              <div
                                className="bg-abuki-primary rounded-t absolute bottom-0 w-full"
                                style={{ height: `${(data.revenue / 30000) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">{data.month}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {language === "am" ? "ምርጥ አፈጻጸም ኮርሶች" : "Top Performing Courses"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {courses.slice(0, 3).map((course) => (
                            <div key={course.id} className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium line-clamp-1">
                                  {language === "am" ? course.titleAm : course.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {course.students} {language === "am" ? "ተማሪዎች" : "students"}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{course.revenue}</p>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{course.rating}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {language === "am" ? "ወርሃዊ ትርፍ ህዳግ" : "Monthly Profit Margin"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {monthlyData.slice(-3).map((data, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{data.month} 2024</span>
                                <span className="font-medium">{data.margin.toLocaleString()} ETB</span>
                              </div>
                              <Progress value={(data.margin / data.revenue) * 100} className="h-2" />
                              <p className="text-xs text-muted-foreground">
                                {Math.round((data.margin / data.revenue) * 100)}% {language === "am" ? "ትርፍ ህዳግ" : "profit margin"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="courses">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">{language === "am" ? "የእኔ ኮርሶች" : "My Courses"}</h2>
                    <Button className="bg-abuki-primary hover:bg-abuki-accent" asChild>
                      <Link href="/instructor/courses/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {language === "am" ? "አዲስ ኮርስ ፍጠር" : "Create New Course"}
                      </Link>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {courses.map((course) => (
                      <Card key={course.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">
                                  {language === "am" ? course.titleAm : course.title}
                                </h3>
                                <Badge variant={course.status === "published" ? "default" : "secondary"}>
                                  {course.status === "published"
                                    ? language === "am"
                                      ? "ታትሟል"
                                      : "Published"
                                    : language === "am"
                                      ? "ረቂቅ"
                                      : "Draft"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {language === "am" ? "ተዘምኗል" : "Last updated"}: {course.lastUpdated}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/instructor/courses/${course.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-1" />
                                  {language === "am" ? "አርትዕ" : "Edit"}
                                </Link>
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/instructor/courses/${course.id}/analytics`}>
                                  <BarChart3 className="h-4 w-4 mr-1" />
                                  {language === "am" ? "ትንተና" : "Analytics"}
                                </Link>
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-abuki-primary" />
                              <div>
                                <p className="font-medium">{course.students}</p>
                                <p className="text-muted-foreground">{language === "am" ? "ተማሪዎች" : "Students"}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="font-medium">{course.revenue}</p>
                                <p className="text-muted-foreground">{language === "am" ? "ገቢ" : "Revenue"}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-600" />
                              <div>
                                <p className="font-medium">{course.rating}</p>
                                <p className="text-muted-foreground">
                                  ({course.reviews} {language === "am" ? "ግምገማዎች" : "reviews"})
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-blue-600" />
                              <div>
                                <p className="font-medium">{course.views.toLocaleString()}</p>
                                <p className="text-muted-foreground">{language === "am" ? "እይታዎች" : "Views"}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Play className="h-4 w-4 text-purple-600" />
                              <div>
                                <p className="font-medium">{course.completionRate}%</p>
                                <p className="text-muted-foreground">{language === "am" ? "ማጠናቀቂያ" : "Completion"}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="revenue">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">{language === "am" ? "የገቢ ትንተና" : "Revenue Analytics"}</h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "የዚህ ወር ሽያጭ" : "This Month Sales"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-abuki-primary mb-2">28,000 ETB</div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">+15.3% from last month</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "የዓመት ሽያጭ" : "Yearly Sales"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-abuki-primary mb-2">320,000 ETB</div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">+22.8% from last year</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "አማካይ ትርፍ ህዳግ" : "Avg Profit Margin"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-abuki-primary mb-2">72%</div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">+2.1% from last month</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "am" ? "ወርሃዊ ገቢ ዝርዝር" : "Monthly Revenue Breakdown"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {monthlyData.map((data, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{data.month} 2024</p>
                              <p className="text-sm text-muted-foreground">
                                {data.enrollments} {language === "am" ? "አዲስ ምዝገባዎች" : "new enrollments"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{data.revenue.toLocaleString()} ETB</p>
                              <p className="text-sm text-muted-foreground">
                                {language === "am" ? "ትርፍ ህዳግ" : "Profit margin"}: {Math.round((data.margin / data.revenue) * 100)}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="students">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">{language === "am" ? "ተማሪ ትንተና" : "Student Analytics"}</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "ተማሪ እድገት" : "Student Growth"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>{language === "am" ? "ጠቅላላ ተማሪዎች" : "Total Students"}</span>
                            <span className="font-bold">1,234</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>{language === "am" ? "ንቁ ተማሪዎች" : "Active Students"}</span>
                            <span className="font-bold">892</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>{language === "am" ? "ኮርስ ያጠናቀቁ" : "Course Completers"}</span>
                            <span className="font-bold">456</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "ተማሪ ተሳትፎ" : "Student Engagement"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{language === "am" ? "አማካይ ማጠናቀቂያ መጠን" : "Avg Completion Rate"}</span>
                              <span>78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{language === "am" ? "ተማሪ እርካታ" : "Student Satisfaction"}</span>
                              <span>4.8/5</span>
                            </div>
                            <Progress value={96} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {language === "am" ? "የቅርብ ጊዜ ግምገማዎች" : "Recent Reviews"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{review.student}</p>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{review.course}</p>
                      <p className="text-sm">{language === "am" ? review.commentAm : review.comment}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "ፈጣን ድርጊቶች" : "Quick Actions"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-abuki-primary hover:bg-abuki-accent" asChild>
                  <Link href="/instructor/courses/new">
                    <Plus className="mr-2 h-4 w-4" />
                    {language === "am" ? "አዲስ ኮርስ ፍጠር" : "Create New Course"}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/instructor/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    {language === "am" ? "ዝርዝር ትንተና" : "View Analytics"}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/instructor/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    {language === "am" ? "ቅንብሮች" : "Settings"}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "የገቢ ማጠቃለያ" : "Earnings Summary"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{language === "am" ? "ዛሬ" : "Today"}</span>
                    <span className="font-medium">1,250 ETB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{language === "am" ? "ዚህ ሳምንት" : "This Week"}</span>
                    <span className="font-medium">8,750 ETB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{language === "am" ? "ዚህ ወር" : "This Month"}</span>
                    <span className="font-medium">28,000 ETB</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="font-medium">{language === "am" ? "ጠቅላላ ገቢ" : "Total Earnings"}</span>
                    <span className="font-bold text-abuki-primary">320,000 ETB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
