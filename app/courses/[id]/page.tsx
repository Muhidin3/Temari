"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import {
  Play,
  Star,
  Users,
  Clock,
  BookOpen,
  Award,
  Globe,
  Download,
  Share2,
  Heart,
  ShoppingCart,
  Check,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  Calendar,
  Target,
  Zap,
  Shield,
} from "lucide-react"
import Afetch from "@/lib/Afetch"

export default function CourseDetailPage({params}:{params:{id:string}}) {
  const [language] = useState("en")
  const [expandedSections, setExpandedSections] = useState<number[]>([0])
  const [activeTab, setActiveTab] = useState("overview")
  
  const [course,setCourse] = useState({
    id: 1,
    title: "Complete Web Development Bootcamp",
    titleAm: "ሙሉ ዌብ ዲቨሎፕመንት ኮርስ",
    subtitle: "Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer",
    subtitleAm: "HTML, CSS, JavaScript, React, Node.js ይማሩ እና ሙሉ-ስታክ ዲቨሎፐር ይሁኑ",
    instructor: {
      name: "Dr. Abebe Kebede",
      title: "Senior Full Stack Developer",
      titleAm: "ከፍተኛ ሙሉ ስታክ ዲቨሎፐር",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      students: 25000,
      courses: 12,
      bio: "Dr. Abebe has 10+ years of experience in web development and has taught thousands of students.",
      bioAm: "ዶክተር አበበ በዌብ ዲቨሎፕመንት ላይ ከ10+ አመት ልምድ አለው እና በሺዎች የሚቆጠሩ ተማሪዎችን አስተምሯል።",
    },
    rating: 4.8,
    totalRatings: 12543,
    students: 45230,
    duration: "40 hours",
    lectures: 156,
    articles: 12,
    resources: 25,
    price: 2500,
    originalPrice: 4000,
    discount: 38,
    image: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Development",
    level: "Beginner",
    language: "English/Amharic",
    lastUpdated: "2024-01-15",
    whatYouWillLearn:[],
    requirements:[],
    targetAudience:[],
    certificate: true,
    lifetime: true,
    mobile: true,
    isNew: true,
    isBestseller: true,
  })

  const [curriculum,setCuriculum] = useState([
    {
      title: "Introduction to Web Development",
      titleAm: "የዌብ ዲቨሎፕመንት መግቢያ",
      duration: "2 hours",
      lectures: 8,
      lessons: [
        {
          title: "What is Web Development?",
          titleAm: "ዌብ ዲቨሎፕመንት ምንድን ነው?",
          duration: "15 min",
          type: "video",
          free: true,
        },
        {
          title: "Setting up Development Environment",
          titleAm: "የዲቨሎፕመንት አካባቢ ማዘጋጀት",
          duration: "20 min",
          type: "video",
          free: true,
        },
        { title: "Your First Website", titleAm: "የመጀመሪያ ዌብሳይትዎ", duration: "25 min", type: "video", free: false },
        {
          title: "Quiz: Web Development Basics",
          titleAm: "ጥያቄ: የዌብ ዲቨሎፕመንት መሰረቶች",
          duration: "10 min",
          type: "quiz",
          free: false,
        },
      ],
    },
    {
      title: "HTML Fundamentals",
      titleAm: "የHTML መሰረቶች",
      duration: "6 hours",
      lectures: 24,
      lessons: [
        {
          title: "HTML Structure and Syntax",
          titleAm: "የHTML አወቃቀር እና ሰዋሰው",
          duration: "30 min",
          type: "video",
          free: false,
        },
        {
          title: "Working with Text and Links",
          titleAm: "ከጽሁፍ እና ሊንኮች ጋር መስራት",
          duration: "25 min",
          type: "video",
          free: false,
        },
        { title: "Images and Media", titleAm: "ምስሎች እና ሚዲያ", duration: "20 min", type: "video", free: false },
        {
          title: "Forms and Input Elements",
          titleAm: "ቅጾች እና የግቤት አካላት",
          duration: "35 min",
          type: "video",
          free: false,
        },
      ],
    },
    {
      title: "CSS Styling",
      titleAm: "CSS ስታይሊንግ",
      duration: "8 hours",
      lectures: 32,
      lessons: [
        {
          title: "CSS Basics and Selectors",
          titleAm: "የCSS መሰረቶች እና ሴሌክተሮች",
          duration: "30 min",
          type: "video",
          free: false,
        },
        { title: "Layout with Flexbox", titleAm: "በFlexbox አቀማመጥ", duration: "45 min", type: "video", free: false },
        { title: "CSS Grid System", titleAm: "የCSS ግሪድ ሲስተም", duration: "40 min", type: "video", free: false },
        { title: "Responsive Design", titleAm: "ተላላፊ ዲዛይን", duration: "50 min", type: "video", free: false },
      ],
    },
  ])

  const reviews = [
    {
      id: 1,
      user: "Meron Tadesse",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-10",
      comment: "Excellent course! Dr. Abebe explains everything clearly and the projects are very practical.",
      commentAm: "በጣም ጥሩ ኮርስ! ዶክተር አበበ ሁሉንም ነገር በግልጽ ያብራራል እና ፕሮጀክቶቹ በጣም ተግባራዊ ናቸው።",
      helpful: 24,
    },
    {
      id: 2,
      user: "Dawit Alemayehu",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2024-01-08",
      comment: "Great content and well structured. The Amharic explanations really helped me understand better.",
      commentAm: "ጥሩ ይዘት እና በደንብ የተዋቀረ። የአማርኛ ማብራሪያዎች በተሻለ ሁኔታ እንድረዳ ረድተውኛል።",
      helpful: 18,
    },
  ]

  useEffect(()=>{
    (async()=>{
      const {id} = await params
      const res = await Afetch(`/api/courses/${id}`).then(async(data)=> await data.json())
      const course = res.data
      const lessons = res.lessons
      // console.log(course)
      setCourse({
        id: 1,
        title: course.title,
        titleAm: course.titleAm,
        subtitle: "*Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer*",
        subtitleAm: "*HTML, CSS, JavaScript, React, Node.js ይማሩ እና ሙሉ-ስታክ ዲቨሎፐር ይሁኑ*",
        instructor: {
          name: course.instructor.firstName + ' ' + course.instructor.lastName,
          title: "*Senior Full Stack Developer*",
          titleAm: "ከፍተኛ ሙሉ ስታክ ዲቨሎፐር",
          avatar: "/placeholder.svg?height=100&width=100",
          rating: 4.9,
          students: 25000,
          courses: 12,
          bio: "Dr. Abebe has 10+ years of experience in web development and has taught thousands of students.",
          bioAm: "ዶክተር አበበ በዌብ ዲቨሎፕመንት ላይ ከ10+ አመት ልምድ አለው እና በሺዎች የሚቆጠሩ ተማሪዎችን አስተምሯል።",
        },
        rating: course.rating,
        totalRatings: course.totalRatings,
        students: course.totalStudents,
        duration: course.duration,
        lectures: 156,
        articles: 12,
        resources: 25,
        price: course.price,
        originalPrice: 4000,
        discount: 38,
        image: "/placeholder.svg?height=400&width=600",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: course.category.name,
        level: course.level,
        language: course.language,
        lastUpdated: "2024-01-15",
        whatYouWillLearn:course.whatYouWillLearn,
        requirements:course.requirements,
        targetAudience:course.targetAudience,
        certificate: true,
        lifetime: true,
        mobile: true,
        isNew: true,
        isBestseller: true,
      })

      // console.log(res.lessons)
      const curr:any[] = []
      course.sections.map((section:any)=>{
        const lessons_ = (res.lessons.filter((lesson:any)=>lesson.section==section._id)).map((lesson:any,index:number)=>({
          title: lesson.title,
          titleAm: "ዌብ ዲቨሎፕመንት ምንድን ነው?",
          duration: "15 min",
          type: "video",
          free: lesson.isFree,
        }))
        curr.push({
          title: section.title,
          titleAm: "የዌብ ዲቨሎፕመንት መግቢያ",
          duration: "2 hours", 
          lectures: lessons_.length,
          lessons: lessons_
        })
      })

      // console.log(curr)
      setCuriculum(curr)
    })()
  },[])


  const toggleSection = (index: number) => {
    setExpandedSections((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-abuki-primary/10 text-abuki-primary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                {course.isNew && <Badge className="bg-green-500 text-white">{language === "am" ? "አዲስ" : "New"}</Badge>}
                {course.isBestseller && (
                  <Badge className="bg-orange-500 text-white">{language === "am" ? "ምርጥ ሽያጭ" : "Bestseller"}</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "am" ? course.titleAm : course.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {language === "am" ? course.subtitleAm : course.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({course.totalRatings.toLocaleString()} {language === "am" ? "ደረጃዎች" : "ratings"})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {course.students.toLocaleString()} {language === "am" ? "ተማሪዎች" : "students"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {course.lectures} {language === "am" ? "ትምህርቶች" : "lectures"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>{course.language}</span>
                </div>
              </div>
            </div>

            {/* Course Video Preview */}
            <div className="mb-8">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt="Course preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-abuki-primary hover:bg-abuki-accent">
                    <Play className="mr-2 h-6 w-6" />
                    {language === "am" ? "ቅድመ እይታ ይመልከቱ" : "Preview Course"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-4 dark:bg-slate-800">
                <TabsTrigger value="overview">{language === "am" ? "አጠቃላይ እይታ" : "Overview"}</TabsTrigger>
                <TabsTrigger value="curriculum">{language === "am" ? "ስርዓተ ትምህርት" : "Curriculum"}</TabsTrigger>
                <TabsTrigger value="instructor">{language === "am" ? "አስተማሪ" : "Instructor"}</TabsTrigger>
                <TabsTrigger value="reviews">{language === "am" ? "ግምገማዎች" : "Reviews"}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "ስለ ኮርሱ" : "About This Course"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">{language === "am" ? "ምን ይማራሉ" : "What You'll Learn"}</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-abuki-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">{language === "am" ? "መስፈርቶች" : "Requirements"}</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {course.requirements.map((req,i)=>(<li key={i}>• {req}</li>))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">
                        {language === "am" ? "ይህ ኮርስ ለማን ነው" : "Who This Course Is For"}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {course.targetAudience.map((req,i)=>(<li key={i}>• {req}</li>))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "ስርዓተ ትምህርት" : "Course Curriculum"}</CardTitle>
                    <CardDescription>
                      {course.lectures} {language === "am" ? "ትምህርቶች" : "lectures"} • {course.duration}{" "}
                      {language === "am" ? "ጠቅላላ ይዘት" : "total content"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {curriculum.map((section, index) => (
                        <div key={index} className="border rounded-lg">
                          <button
                            onClick={() => toggleSection(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors dark:hover:bg-slate-800"
                          >
                            <div className="flex items-center gap-3">
                              {expandedSections.includes(index) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                              <div>
                                <h3 className="font-medium">{language === "am" ? section.titleAm : section.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {section.lectures} {language === "am" ? "ትምህርቶች" : "lectures"} • {section.duration}
                                </p>
                              </div>
                            </div>
                          </button>

                          {expandedSections.includes(index) && (
                            <div className="border-t">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lessonIndex}
                                  className="flex items-center justify-between p-4 hover:bg-muted/30"
                                >
                                  <div className="flex items-center gap-3">
                                    {lesson.type === "video" ? (
                                      <Play className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <div>
                                      <p className="text-sm font-medium">
                                        {language === "am" ? lesson.titleAm : lesson.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                    </div>
                                  </div>
                                  {lesson.free && (
                                    <Badge variant="outline" className="text-xs">
                                      {language === "am" ? "ነፃ" : "Free"}
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "አስተማሪ" : "Instructor"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{course.instructor.name}</h3>
                        <p className="text-muted-foreground mb-3">
                          {language === "am" ? course.instructor.titleAm : course.instructor.title}
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>
                              {course.instructor.rating} {language === "am" ? "ደረጃ" : "rating"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {course.instructor.students.toLocaleString()} {language === "am" ? "ተማሪዎች" : "students"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>
                              {course.instructor.courses} {language === "am" ? "ኮርሶች" : "courses"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {language === "am" ? course.instructor.bioAm : course.instructor.bio}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "ተማሪ ግምገማዎች" : "Student Reviews"}</CardTitle>
                    <CardDescription>
                      {course.totalRatings.toLocaleString()} {language === "am" ? "ግምገማዎች" : "reviews"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium">{review.user}</h4>
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <p className="text-muted-foreground mb-3">
                                {language === "am" ? review.commentAm : review.comment}
                              </p>
                              <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  {language === "am" ? "ጠቃሚ" : "Helpful"} ({review.helpful})
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  {language === "am" ? "መልስ" : "Reply"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Purchase Card */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-abuki-primary">{course.price} ETB</span>
                      <span className="text-lg text-muted-foreground line-through">{course.originalPrice} ETB</span>
                    </div>
                    <Badge className="bg-red-100 text-red-700">
                      {course.discount}% {language === "am" ? "ቅናش" : "OFF"}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button className="w-full bg-abuki-primary hover:bg-abuki-accent text-lg py-6">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {language === "am" ? "አሁን ይግዙ" : "Buy Now"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Heart className="mr-2 h-4 w-4" />
                      {language === "am" ? "ወደ ዊሽሊስት ጨምር" : "Add to Wishlist"}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground mb-4">
                    {language === "am" ? "30-ቀን የገንዘብ መመለሻ ዋስትና" : "30-Day Money-Back Guarantee"}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-abuki-primary" />
                      <span>
                        {course.duration} {language === "am" ? "የቪዲዮ ይዘት" : "on-demand video"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-abuki-primary" />
                      <span>
                        {course.articles} {language === "am" ? "ጽሁፎች" : "articles"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-abuki-primary" />
                      <span>
                        {course.resources} {language === "am" ? "ሊወርዱ የሚችሉ ሀብቶች" : "downloadable resources"}
                      </span>
                    </div>
                    {course.lifetime && (
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-abuki-primary" />
                        <span>{language === "am" ? "የህይወት ዘመን መዳረሻ" : "Full lifetime access"}</span>
                      </div>
                    )}
                    {course.mobile && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-abuki-primary" />
                        <span>{language === "am" ? "በሞባይል እና ቲቪ መዳረሻ" : "Access on mobile and TV"}</span>
                      </div>
                    )}
                    {course.certificate && (
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-abuki-primary" />
                        <span>{language === "am" ? "የማጠናቀቂያ ሰርተፊኬት" : "Certificate of completion"}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Course Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{language === "am" ? "ኮርስ ባህሪያት" : "Course Features"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-abuki-primary" />
                    <div>
                      <p className="font-medium text-sm">{language === "am" ? "ተግባራዊ ፕሮጀክቶች" : "Hands-on Projects"}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "am" ? "እውነተኛ ዓለም ፕሮጀክቶችን ይገንቡ" : "Build real-world projects"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-abuki-primary" />
                    <div>
                      <p className="font-medium text-sm">{language === "am" ? "የባለሙያ ድጋፍ" : "Expert Support"}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "am" ? "ከአስተማሪ ቀጥተኛ ድጋፍ" : "Direct support from instructor"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-abuki-primary" />
                    <div>
                      <p className="font-medium text-sm">{language === "am" ? "መደበኛ ዝማኔዎች" : "Regular Updates"}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "am" ? "አዲስ ይዘት በመደበኛነት ይጨመራል" : "New content added regularly"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share Course */}
              <Card>
                <CardContent className="p-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Share2 className="mr-2 h-4 w-4" />
                    {language === "am" ? "ኮርሱን አጋራ" : "Share Course"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
