"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Star, Users, BookOpen, Award, MapPin, Calendar, Globe, Linkedin, Twitter, Mail, Phone, Edit, Share2, Play, Clock, TrendingUp, MessageCircle } from 'lucide-react'
import { useLang } from "@/contexts/LanguageContext"
export default function InstructorProfile() {
  const {language} = useLang()

  const instructorData = {
    name: "Dr. Abebe Kebede",
    title: "Senior Full Stack Developer & Tech Educator",
    titleAm: "ከፍተኛ ሙሉ ስታክ ዲቨሎፐር እና የቴክኖሎጂ አስተማሪ",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Passionate educator with 10+ years of experience in web development and software engineering. I've helped thousands of students transition into successful tech careers through practical, hands-on learning approaches.",
    bioAm: "በዌብ ዲቨሎፕመንት እና ሶፍትዌር ኢንጂነሪንግ ላይ ከ10+ አመት ልምድ ያለው ተሞክሮ ያለው አስተማሪ። በተግባራዊ እና በእጅ የመማር አቀራረቦች በሺዎች የሚቆጠሩ ተማሪዎች ወደ ስኬታማ የቴክኖሎጂ ሙያ እንዲሸጋገሩ ረድቻለሁ።",
    location: "Addis Ababa, Ethiopia",
    joinDate: "2020-03-15",
    website: "https://abebekebed.dev",
    linkedin: "https://linkedin.com/in/abebekebed",
    twitter: "https://twitter.com/abebekebed",
    email: "abebe@example.com",
    phone: "+251911234567",
    rating: 4.9,
    totalStudents: 25000,
    totalCourses: 12,
    totalReviews: 3456,
    totalHours: 180,
    specialties: ["Web Development", "JavaScript", "React", "Node.js", "Python", "Database Design"],
    languages: ["English", "Amharic", "Oromo"],
    education: [
      {
        degree: "PhD in Computer Science",
        degreeAm: "በኮምፒውተር ሳይንስ ዶክትሬት",
        institution: "Addis Ababa University",
        year: "2015",
      },
      {
        degree: "MSc in Software Engineering",
        degreeAm: "በሶፍትዌር ኢንጂነሪንግ ማስተርስ",
        institution: "Addis Ababa University",
        year: "2010",
      },
    ],
    experience: [
      {
        position: "Senior Software Engineer",
        positionAm: "ከፍተኛ ሶፍትዌር ኢንጂነር",
        company: "Tech Solutions Ethiopia",
        period: "2018 - Present",
        description: "Leading development teams and architecting scalable web applications",
        descriptionAm: "የዲቨሎፕመንት ቡድኖችን መምራት እና ሊሰፋ የሚችል ዌብ አፕሊኬሽኖችን መንደፍ",
      },
      {
        position: "Full Stack Developer",
        positionAm: "ሙሉ ስታክ ዲቨሎፐር",
        company: "Digital Innovation Hub",
        period: "2015 - 2018",
        description: "Developed and maintained multiple web applications using modern technologies",
        descriptionAm: "ዘመናዊ ቴክኖሎጂዎችን በመጠቀም በርካታ ዌብ አፕሊኬሽኖችን ማዳበር እና መጠበቅ",
      },
    ],
  }

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      titleAm: "ሙሉ ዌብ ዲቨሎፕመንት ኮርስ",
      students: 12543,
      rating: 4.8,
      reviews: 456,
      duration: "40 hours",
      price: "2,500 ETB",
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      level: "Beginner",
      isPopular: true,
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      titleAm: "የላቀ JavaScript ጽንሰ-ሀሳቦች",
      students: 8932,
      rating: 4.9,
      reviews: 234,
      duration: "25 hours",
      price: "1,800 ETB",
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      level: "Advanced",
      isNew: true,
    },
    {
      id: 3,
      title: "React for Beginners",
      titleAm: "React ለጀማሪዎች",
      students: 5621,
      rating: 4.7,
      reviews: 123,
      duration: "30 hours",
      price: "2,200 ETB",
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      level: "Intermediate",
      isBestseller: true,
    },
  ]

  const achievements = [
    {
      title: "Top Instructor 2023",
      titleAm: "ምርጥ አስተማሪ 2023",
      description: "Awarded for outstanding teaching performance",
      descriptionAm: "ለድንቅ የማስተማር አፈጻጸም የተሸለመ",
      icon: "🏆",
      date: "2023-12-01",
    },
    {
      title: "25K Students Milestone",
      titleAm: "25 ሺህ ተማሪዎች ምዕራፍ",
      description: "Reached 25,000 students across all courses",
      descriptionAm: "በሁሉም ኮርሶች 25,000 ተማሪዎችን ደርሷል",
      icon: "🎯",
      date: "2023-10-15",
    },
    {
      title: "Excellence in Education",
      titleAm: "በትምህርት ላይ ብቃት",
      description: "Recognized for innovative teaching methods",
      descriptionAm: "ለአዳዲስ የማስተማር ዘዴዎች የተመሰከረለት",
      icon: "⭐",
      date: "2023-06-20",
    },
  ]

  const recentReviews = [
    {
      student: "Meron Tadesse",
      course: "Web Development Bootcamp",
      rating: 5,
      comment: "Dr. Abebe is an exceptional instructor. His explanations are clear and the projects are very practical.",
      commentAm: "ዶክተር አበበ ልዩ አስተማሪ ነው። ማብራሪያዎቹ ግልጽ ናቸው እና ፕሮጀክቶቹ በጣም ተግባራዊ ናቸው።",
      date: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      student: "Dawit Alemayehu",
      course: "Advanced JavaScript",
      rating: 5,
      comment: "Amazing course! I learned so much and now I feel confident in my JavaScript skills.",
      commentAm: "አስደናቂ ኮርስ! ብዙ ተምሬያለሁ እና አሁን በJavaScript ክህሎቶቼ በራስ መተማመን ይሰማኛል።",
      date: "2024-01-12",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      student: "Sara Mohammed",
      course: "React for Beginners",
      rating: 4,
      comment: "Great instructor with deep knowledge. The course structure is well organized.",
      commentAm: "ጥልቅ እውቀት ያለው ጥሩ አስተማሪ። የኮርሱ አወቃቀር በደንብ የተደራጀ ነው።",
      date: "2024-01-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const stats = [
    {
      label: "Total Students",
      labelAm: "ጠቅላላ ተማሪዎች",
      value: instructorData.totalStudents.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Courses Created",
      labelAm: "የተፈጠሩ ኮርሶች",
      value: instructorData.totalCourses.toString(),
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      label: "Average Rating",
      labelAm: "አማካይ ደረጃ",
      value: instructorData.rating.toString(),
      icon: Star,
      color: "text-yellow-600",
    },
    {
      label: "Total Reviews",
      labelAm: "ጠቅላላ ግምገማዎች",
      value: instructorData.totalReviews.toLocaleString(),
      icon: MessageCircle,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={instructorData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-4xl">AB</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{instructorData.name}</h1>
                  <p className="text-lg text-muted-foreground mb-3">
                    {language === "am" ? instructorData.titleAm : instructorData.title}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{instructorData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {language === "am" ? "ተቀላቅሏል" : "Joined"} {new Date(instructorData.joinDate).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    {language === "am" ? "አጋራ" : "Share"}
                  </Button>
                  <Button className="bg-abuki-primary hover:bg-abuki-accent">
                    <Edit className="mr-2 h-4 w-4" />
                    {language === "am" ? "መገለጫ አርትዕ" : "Edit Profile"}
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 mb-4">
                <a href={instructorData.website} className="text-muted-foreground hover:text-abuki-primary">
                  <Globe className="h-5 w-5" />
                </a>
                <a href={instructorData.linkedin} className="text-muted-foreground hover:text-abuki-primary">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={instructorData.twitter} className="text-muted-foreground hover:text-abuki-primary">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href={`mailto:${instructorData.email}`} className="text-muted-foreground hover:text-abuki-primary">
                  <Mail className="h-5 w-5" />
                </a>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                {instructorData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="dark:bg-slate-900 dark:text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{language === "am" ? stat.labelAm : stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="space-y-6 ">
              <TabsList className="grid w-full grid-cols-4 dark:bg-slate-900 dark:text-white">
                <TabsTrigger value="about">{language === "am" ? "ስለ እኔ" : "About"}</TabsTrigger>
                <TabsTrigger value="courses">{language === "am" ? "ኮርሶች" : "Courses"}</TabsTrigger>
                <TabsTrigger value="reviews">{language === "am" ? "ግምገማዎች" : "Reviews"}</TabsTrigger>
                <TabsTrigger value="achievements">{language === "am" ? "ስኬቶች" : "Achievements"}</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <div className="space-y-6">
                  {/* Bio */}
                  <Card className="dark:bg-slate-900 dark:text-white">
                    <CardHeader>
                      <CardTitle>{language === "am" ? "ስለ እኔ" : "About Me"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {language === "am" ? instructorData.bioAm : instructorData.bio}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Education */}
                  <Card className="dark:bg-slate-900 dark:text-white">
                    <CardHeader>
                      <CardTitle>{language === "am" ? "ትምህርት" : "Education"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {instructorData.education.map((edu, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-abuki-primary rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{language === "am" ? edu.degreeAm : edu.degree}</h3>
                              <p className="text-sm text-muted-foreground">{edu.institution}</p>
                              <p className="text-sm text-muted-foreground">{edu.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Experience */}
                  <Card className="dark:bg-slate-900 dark:text-white">
                    <CardHeader>
                      <CardTitle>{language === "am" ? "ሙያዊ ልምድ" : "Professional Experience"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {instructorData.experience.map((exp, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-abuki-primary rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{language === "am" ? exp.positionAm : exp.position}</h3>
                              <p className="text-sm text-muted-foreground mb-1">{exp.company}</p>
                              <p className="text-xs text-muted-foreground mb-2">{exp.period}</p>
                              <p className="text-sm">{language === "am" ? exp.descriptionAm : exp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Languages */}
                  <Card className="dark:bg-slate-900 dark:text-white">
                    <CardHeader>
                      <CardTitle>{language === "am" ? "ቋንቋዎች" : "Languages"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {instructorData.languages.map((lang, index) => (
                          <Badge key={index} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="courses">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">{language === "am" ? "የእኔ ኮርሶች" : "My Courses"}</h2>
                    <p className="text-muted-foreground">
                      {instructorData.totalCourses} {language === "am" ? "ኮርሶች" : "courses"}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <Card key={course.id} className="dark:bg-slate-900 dark:text-white hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 left-2 flex gap-2">
                            {course.isPopular && (
                              <Badge className="bg-red-500 hover:bg-red-600">
                                {language === "am" ? "ተወዳጅ" : "Popular"}
                              </Badge>
                            )}
                            {course.isNew && (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                {language === "am" ? "አዲስ" : "New"}
                              </Badge>
                            )}
                            {course.isBestseller && (
                              <Badge className="bg-yellow-500 hover:bg-yellow-600">
                                {language === "am" ? "ምርጥ ሽያጭ" : "Bestseller"}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {language === "am" ? course.titleAm : course.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{course.students.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-abuki-primary">{course.price}</div>
                            <Button size="sm" asChild>
                              <Link href={`/courses/${course.id}`}>
                                {language === "am" ? "ይመልከቱ" : "View Course"}
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">{language === "am" ? "ተማሪ ግምገማዎች" : "Student Reviews"}</h2>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{instructorData.rating}</span>
                      <span className="text-muted-foreground">
                        ({instructorData.totalReviews.toLocaleString()} {language === "am" ? "ግምገማዎች" : "reviews"})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {recentReviews.map((review, index) => (
                      <Card key={index} className="dark:bg-slate-900 dark:text-white">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.student.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-semibold">{review.student}</p>
                                  <p className="text-sm text-muted-foreground">{review.course}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-2">
                                {language === "am" ? review.commentAm : review.comment}
                              </p>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="achievements">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">{language === "am" ? "ስኬቶች እና ሽልማቶች" : "Achievements & Awards"}</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <Card key={index} className="dark:bg-slate-900 dark:text-white hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">
                                {language === "am" ? achievement.titleAm : achievement.title}
                              </h3>
                              <p className="text-muted-foreground mb-3">
                                {language === "am" ? achievement.descriptionAm : achievement.description}
                              </p>
                              <p className="text-sm text-muted-foreground">{achievement.date}</p>
                            </div>
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
            {/* Contact Info */}
            <Card className="dark:bg-slate-900 dark:text-white">
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "የመገናኛ መረጃ" : "Contact Information"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${instructorData.email}`} className="text-sm hover:text-abuki-primary">
                    {instructorData.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${instructorData.phone}`} className="text-sm hover:text-abuki-primary">
                    {instructorData.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={instructorData.website} className="text-sm hover:text-abuki-primary">
                    {instructorData.website}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Stats */}
            <Card className="dark:bg-slate-900 dark:text-white">
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "የማስተማር ስታቲስቲክስ" : "Teaching Statistics"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{language === "am" ? "ጠቅላላ ሰዓቶች" : "Total Hours"}</span>
                  <span className="font-medium">{instructorData.totalHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{language === "am" ? "አማካይ ደረጃ" : "Average Rating"}</span>
                  <span className="font-medium">{instructorData.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{language === "am" ? "ምላሽ መጠን" : "Response Rate"}</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{language === "am" ? "ምላሽ ጊዜ" : "Response Time"}</span>
                  <span className="font-medium">2h</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="dark:bg-slate-900 dark:text-white">
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "ፈጣን ድርጊቶች" : "Quick Actions"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-abuki-primary hover:bg-abuki-accent" asChild>
                  <Link href="/instructor/courses/new">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {language === "am" ? "አዲስ ኮርስ ፍጠር" : "Create New Course"}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/instructor/dashboard">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {language === "am" ? "ዳሽቦርድ ይመልከቱ" : "View Dashboard"}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {language === "am" ? "ተማሪዎችን ያነጋግሩ" : "Message Students"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
