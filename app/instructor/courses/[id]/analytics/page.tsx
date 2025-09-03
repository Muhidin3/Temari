"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Eye, Users, Play, Clock, TrendingUp, TrendingDown, Star, MessageCircle, Download, Share2, BarChart3, PieChart, Calendar, Target, Award, DollarSign } from 'lucide-react'
import { useLang } from "@/contexts/LanguageContext"
export default function CourseAnalytics() {
  const {language} = useLang()
  const [timeRange, setTimeRange] = useState("30d")

  const courseData = {
    title: "Complete Web Development Bootcamp",
    titleAm: "ሙሉ ዌብ ዲቨሎፕመንት ኮርስ",
    totalStudents: 1234,
    totalRevenue: "30,850 ETB",
    avgRating: 4.8,
    totalReviews: 456,
    completionRate: 78,
    totalWatchTime: "15,420 hours",
  }

  const analyticsData = {
    views: {
      total: 15420,
      change: "+12.5%",
      trend: "up",
      chartData: [
        { date: "Jan 1", views: 120 },
        { date: "Jan 2", views: 145 },
        { date: "Jan 3", views: 180 },
        { date: "Jan 4", views: 165 },
        { date: "Jan 5", views: 200 },
        { date: "Jan 6", views: 190 },
        { date: "Jan 7", views: 220 },
      ],
    },
    enrollments: {
      total: 89,
      change: "+8.2%",
      trend: "up",
      chartData: [
        { date: "Week 1", enrollments: 12 },
        { date: "Week 2", enrollments: 18 },
        { date: "Week 3", enrollments: 25 },
        { date: "Week 4", enrollments: 34 },
      ],
    },
    watchTime: {
      total: "2,340 hours",
      avgPerStudent: "26.8 hours",
      retentionRate: 85,
      dropOffPoints: [
        { lesson: "Introduction", retention: 100 },
        { lesson: "HTML Basics", retention: 95 },
        { lesson: "CSS Fundamentals", retention: 88 },
        { lesson: "JavaScript Intro", retention: 82 },
        { lesson: "React Basics", retention: 75 },
        { lesson: "Node.js", retention: 68 },
      ],
    },
    demographics: {
      ageGroups: [
        { range: "18-24", percentage: 35 },
        { range: "25-34", percentage: 45 },
        { range: "35-44", percentage: 15 },
        { range: "45+", percentage: 5 },
      ],
      locations: [
        { country: "Ethiopia", percentage: 78 },
        { country: "Kenya", percentage: 12 },
        { country: "Uganda", percentage: 6 },
        { country: "Others", percentage: 4 },
      ],
      devices: [
        { type: "Mobile", percentage: 65 },
        { type: "Desktop", percentage: 30 },
        { type: "Tablet", percentage: 5 },
      ],
    },
    revenue: {
      monthly: [
        { month: "Jan", revenue: 4500, enrollments: 18 },
        { month: "Feb", revenue: 6200, enrollments: 25 },
        { month: "Mar", revenue: 7800, enrollments: 31 },
        { month: "Apr", revenue: 8900, enrollments: 36 },
        { month: "May", revenue: 9200, enrollments: 37 },
        { month: "Jun", revenue: 10100, enrollments: 40 },
      ],
    },
  }

  const topPerformingLessons = [
    { title: "Introduction to Web Development", views: 1234, avgRating: 4.9, completion: 95 },
    { title: "HTML Structure and Syntax", views: 1156, avgRating: 4.8, completion: 92 },
    { title: "CSS Styling Basics", views: 1089, avgRating: 4.7, completion: 88 },
    { title: "JavaScript Fundamentals", views: 1023, avgRating: 4.8, completion: 85 },
    { title: "React Components", views: 945, avgRating: 4.6, completion: 78 },
  ]

  const recentReviews = [
    {
      student: "Meron Tadesse",
      rating: 5,
      comment: "Excellent course! Very detailed and practical.",
      commentAm: "በጣም ጥሩ ኮርስ! በጣም ዝርዝር እና ተግባራዊ።",
      date: "2024-01-15",
      lesson: "JavaScript Functions",
    },
    {
      student: "Dawit Alemayehu",
      rating: 4,
      comment: "Great content, would recommend to others.",
      commentAm: "ጥሩ ይዘት፣ ለሌሎች እመክራለሁ።",
      date: "2024-01-14",
      lesson: "React Hooks",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {language === "am" ? "የኮርስ ትንተና" : "Course Analytics"}
            </h1>
            <p className="text-muted-foreground">
              {language === "am" ? courseData.titleAm : courseData.title}
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">{language === "am" ? "7 ቀናት" : "7 days"}</SelectItem>
                <SelectItem value="30d">{language === "am" ? "30 ቀናት" : "30 days"}</SelectItem>
                <SelectItem value="90d">{language === "am" ? "90 ቀናት" : "90 days"}</SelectItem>
                <SelectItem value="1y">{language === "am" ? "1 አመት" : "1 year"}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              {language === "am" ? "ሪፖርት አውርድ" : "Export Report"}
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{language === "am" ? "ጠቅላላ እይታዎች" : "Total Views"}</p>
                  <p className="text-2xl font-bold">{analyticsData.views.total.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">{analyticsData.views.change}</span>
                  </div>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{language === "am" ? "ጠቅላላ ተማሪዎች" : "Total Students"}</p>
                  <p className="text-2xl font-bold">{courseData.totalStudents.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">{analyticsData.enrollments.change}</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{language === "am" ? "ጠቅላላ ገቢ" : "Total Revenue"}</p>
                  <p className="text-2xl font-bold">{courseData.totalRevenue}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">+15.3%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{language === "am" ? "አማካይ ደረጃ" : "Average Rating"}</p>
                  <p className="text-2xl font-bold">{courseData.avgRating}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">({courseData.totalReviews} reviews)</span>
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">{language === "am" ? "አጠቃላይ" : "Overview"}</TabsTrigger>
                <TabsTrigger value="engagement">{language === "am" ? "ተሳትፎ" : "Engagement"}</TabsTrigger>
                <TabsTrigger value="revenue">{language === "am" ? "ገቢ" : "Revenue"}</TabsTrigger>
                <TabsTrigger value="demographics">{language === "am" ? "ስታቲስቲክስ" : "Demographics"}</TabsTrigger>
                <TabsTrigger value="performance">{language === "am" ? "አፈጻጸም" : "Performance"}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* Views Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        {language === "am" ? "ቀናዊ እይታዎች" : "Daily Views"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between gap-2">
                        {analyticsData.views.chartData.map((data, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full bg-muted rounded-t relative" style={{ height: "200px" }}>
                              <div
                                className="bg-abuki-primary rounded-t absolute bottom-0 w-full"
                                style={{ height: `${(data.views / 250) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">{data.date.split(' ')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Performance Indicators */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "ማጠናቀቂያ መጠን" : "Completion Rate"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-abuki-primary mb-2">{courseData.completionRate}%</div>
                            <p className="text-sm text-muted-foreground">
                              {language === "am" ? "ተማሪዎች ኮርሱን ያጠናቀቁ" : "of students completed the course"}
                            </p>
                          </div>
                          <Progress value={courseData.completionRate} className="h-3" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "አማካይ የመመልከቻ ጊዜ" : "Average Watch Time"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-abuki-primary mb-2">26.8h</div>
                            <p className="text-sm text-muted-foreground">
                              {language === "am" ? "በተማሪ አማካይ" : "per student average"}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground text-center">
                            {language === "am" ? "ጠቅላላ የመመልከቻ ጊዜ" : "Total watch time"}: {courseData.totalWatchTime}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="engagement">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "am" ? "ተማሪ ማቆያ ትንተና" : "Student Retention Analysis"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analyticsData.watchTime.dropOffPoints.map((point, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{point.lesson}</span>
                              <span className="font-medium">{point.retention}%</span>
                            </div>
                            <Progress value={point.retention} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "am" ? "ምርጥ አፈጻጸም ትምህርቶች" : "Top Performing Lessons"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topPerformingLessons.map((lesson, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{lesson.title}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {lesson.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {lesson.avgRating}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Target className="h-3 w-3" />
                                  {lesson.completion}%
                                </span>
                              </div>
                            </div>
                            <Badge variant="outline">#{index + 1}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="revenue">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "am" ? "ወርሃዊ ገቢ ዝንባሌ" : "Monthly Revenue Trend"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between gap-2">
                        {analyticsData.revenue.monthly.map((data, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full bg-muted rounded-t relative" style={{ height: "200px" }}>
                              <div
                                className="bg-green-500 rounded-t absolute bottom-0 w-full"
                                style={{ height: `${(data.revenue / 12000) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-medium">{data.month}</div>
                              <div className="text-xs text-muted-foreground">{data.revenue.toLocaleString()} ETB</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "የገቢ ማጠቃለያ" : "Revenue Summary"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{language === "am" ? "ዚህ ወር" : "This Month"}</span>
                            <span className="font-medium">10,100 ETB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{language === "am" ? "ያለፈው ወር" : "Last Month"}</span>
                            <span className="font-medium">9,200 ETB</span>
                          </div>
                          <div className="flex justify-between border-t pt-3">
                            <span className="font-medium">{language === "am" ? "ጠቅላላ ገቢ" : "Total Revenue"}</span>
                            <span className="font-bold text-abuki-primary">{courseData.totalRevenue}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "አማካይ ገቢ በተማሪ" : "Average Revenue Per Student"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-abuki-primary mb-2">2,500 ETB</div>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "በተማሪ አማካይ ገቢ" : "average revenue per student"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="demographics">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "የእድሜ ክፍፍል" : "Age Distribution"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {analyticsData.demographics.ageGroups.map((group, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{group.range}</span>
                                <span className="font-medium">{group.percentage}%</span>
                              </div>
                              <Progress value={group.percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "የአካባቢ ክፍፍል" : "Geographic Distribution"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {analyticsData.demographics.locations.map((location, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{location.country}</span>
                                <span className="font-medium">{location.percentage}%</span>
                              </div>
                              <Progress value={location.percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{language === "am" ? "የመሳሪያ አጠቃቀም" : "Device Usage"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        {analyticsData.demographics.devices.map((device, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold text-abuki-primary mb-1">{device.percentage}%</div>
                            <p className="text-sm text-muted-foreground">{device.type}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "የመመልከቻ ጊዜ" : "Watch Time"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-abuki-primary mb-2">15,420h</div>
                          <p className="text-sm text-muted-foreground">{language === "am" ? "ጠቅላላ ሰዓቶች" : "total hours"}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "ተሳትፎ መጠን" : "Engagement Rate"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-abuki-primary mb-2">85%</div>
                          <p className="text-sm text-muted-foreground">{language === "am" ? "ንቁ ተሳትፎ" : "active engagement"}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{language === "am" ? "ሰርተፊኬት መጠን" : "Certificate Rate"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-abuki-primary mb-2">78%</div>
                          <p className="text-sm text-muted-foreground">{language === "am" ? "ሰርተፊኬት ያገኙ" : "earned certificates"}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "am" ? "የአፈጻጸም ምክሮች" : "Performance Recommendations"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">
                              {language === "am" ? "የመመልከቻ ጊዜ ያሻሽሉ" : "Improve Watch Time"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {language === "am" 
                                ? "በትምህርት 4 እና 5 ላይ ተማሪዎች እየወጡ ናቸው። ይዘቱን ይገምግሙ።"
                                : "Students are dropping off at lessons 4 and 5. Consider reviewing the content."}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <Star className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">
                              {language === "am" ? "ጥሩ ደረጃ አሰጣጥ" : "Great Rating Performance"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {language === "am" 
                                ? "4.8 ደረጃ በጣም ጥሩ ነው! ይህንን ደረጃ ለመጠበቅ ይሞክሩ።"
                                : "4.8 rating is excellent! Keep up the great work to maintain this level."}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                          <MessageCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">
                              {language === "am" ? "ተማሪ ተሳትፎ ያሻሽሉ" : "Increase Student Engagement"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {language === "am" 
                                ? "ተጨማሪ ተግባራዊ ልምምዶች እና ፕሮጀክቶች ይጨምሩ።"
                                : "Consider adding more interactive exercises and projects."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                  {recentReviews.map((review, index) => (
                    <div key={index} className="space-y-2">
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
                      <p className="text-xs text-muted-foreground">{review.lesson}</p>
                      <p className="text-sm">{language === "am" ? review.commentAm : review.comment}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "ፈጣን ስታቲስቲክስ" : "Quick Stats"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{language === "am" ? "ዛሬ እይታዎች" : "Views Today"}</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{language === "am" ? "ዚህ ሳምንት ምዝገባዎች" : "Enrollments This Week"}</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{language === "am" ? "አዲስ ግምገማዎች" : "New Reviews"}</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-medium">{language === "am" ? "ዚህ ወር ገቢ" : "Revenue This Month"}</span>
                  <span className="font-bold text-abuki-primary">10,100 ETB</span>
                </div>
              </CardContent>
            </Card>

            {/* Course Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "የኮርስ ድርጊቶች" : "Course Actions"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-abuki-primary hover:bg-abuki-accent">
                  <Share2 className="mr-2 h-4 w-4" />
                  {language === "am" ? "ኮርስ አጋራ" : "Share Course"}
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  {language === "am" ? "ዝርዝር ሪፖርት" : "Detailed Report"}
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  {language === "am" ? "ቀጠሮ ይያዙ" : "Schedule Update"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
