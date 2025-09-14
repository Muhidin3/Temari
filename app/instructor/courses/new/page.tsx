"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { Plus, Trash2, Play, Link, Save, Eye, DollarSign, Clock, BookOpen, GripVertical, FileText } from "lucide-react"
import Afetch from "@/lib/Afetch"

interface Category {
  _id: string
  name: string
  nameAm?: string
  slug: string
}

interface CourseData {
  title: string
  titleAm: string
  subtitle: string
  subtitleAm: string
  description: string
  descriptionAm: string
  shortDescription: string
  shortDescriptionAm: string
  category: string
  subcategory: string
  level: string
  language: string
  price: string
  discountPrice: string
  thumbnail: string
  previewVideo: string
  tags: string[]
  requirements: string[]
  whatYouWillLearn: string[]
  targetAudience: string[]
}

interface Lesson {
  id: number
  title: string
  titleAm: string
  type: string
  content: string
  duration: string
  free: boolean
}

interface Section {
  id: number
  title: string
  titleAm: string
  lessons: Lesson[]
}

export default function CourseBuilder() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const [files,setFiles] = useState<File[][]>([[]])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    titleAm: "",
    subtitle: "",
    subtitleAm: "",
    description: "",
    descriptionAm: "",
    shortDescription: "",
    shortDescriptionAm: "",
    category: "",
    subcategory: "",
    level: "",
    language: "en",
    price: "",
    discountPrice: "",
    thumbnail: "",
    previewVideo: "",
    tags: [],
    requirements: [""],
    whatYouWillLearn: [""],
    targetAudience: [""],
  })

  const [curriculum, setCurriculum] = useState<Section[]>([
    {
      id: 1,
      title: "",
      titleAm: "",
      lessons: [
        {
          id: 1,
          title: "",
          titleAm: "",
          type: "video",
          content: "",
          duration: "",
          free: false,
        },
      ],
    },
  ])

  const [courseSettings, setCourseSettings] = useState({
    isPublic: true,
    allowDiscussions: true,
    provideCertificate: true,
    allowDownload: false,
  })

  // Afetch categories on component mount
  useEffect(() => {
    AfetchCategories()
  }, [])

  // Redirect if not instructor
  useEffect(() => {
    if (user && user.role !== "instructor") {
      router.push("/dashboard")
    }
  }, [user, router])

  const AfetchCategories = async () => {
    try {
      const response = await Afetch("/api/categories")
      const data = await response.json()

      if (data.success) {
        setCategories(data.data)
      } else {
        toast.error("Failed to Afetch categories")
      }
    } catch (error) {
      console.error("Afetch categories error:", error)
      toast.error("Failed to Afetch categories")
    }
  }

  const updateCourseData = (field: keyof CourseData, value: any) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: keyof CourseData) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }))
  }

  const updateArrayItem = (field: keyof CourseData, index: number, value: string) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeArrayItem = (field: keyof CourseData, index: number) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }))
  }

  const addSection = () => {
    setCurriculum([
      ...curriculum,
      {
        id: Date.now(),
        title: "",
        titleAm: "",
        lessons: [
          {
            id: Date.now(),
            title: "",
            titleAm: "",
            type: "video",
            content: "",
            duration: "",
            free: false,
          },
        ],
      },
    ])
  }

  const addLesson = (sectionId: number) => {
    setCurriculum(
      curriculum.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: Date.now(),
                  title: "",
                  titleAm: "",
                  type: "video",
                  content: "",
                  duration: "",
                  free: false,
                },
              ],
            }
          : section,
      ),
    )
  }

  const validateCourse = (): string | null => {
    if (!courseData.title.trim()) return "Course title is required"
    if (!courseData.description.trim()) return "Course description is required"
    if (!courseData.shortDescription.trim()) return "Short description is required"
    if (!courseData.category) return "Category is required"
    if (!courseData.level) return "Course level is required"
    if (!courseData.price || Number.parseFloat(courseData.price) < 0) return "Valid price is required"
    if (!courseData.thumbnail) return "Course thumbnail is required"
    if (courseData.requirements.filter((req) => req.trim()).length === 0) return "At least one requirement is needed"
    if (courseData.whatYouWillLearn.filter((obj) => obj.trim()).length === 0)
      return "At least one learning objective is needed"
    if (courseData.targetAudience.filter((aud) => aud.trim()).length === 0)
      return "At least one target audience is needed"

    return null
  }

  const saveDraft = async () => {
    try {
      setSaving(true)

      // const validationError = validateCourse()
      // if (validationError) {
      //   toast.error(validationError)
      //   console.log(validationError)
      //   return
      // }

      const coursePayload = {
        ...courseData,
        price: Number.parseFloat(courseData.price),
        discountPrice: courseData.discountPrice ? Number.parseFloat(courseData.discountPrice) : undefined,
        requirements: courseData.requirements.filter((req) => req.trim()),
        whatYouWillLearn: courseData.whatYouWillLearn.filter((obj) => obj.trim()),
        targetAudience: courseData.targetAudience.filter((aud) => aud.trim()),
        tags: courseData.tags.filter((tag) => tag.trim()),
        status: "draft",
        sections:curriculum.map(section=>section.title)
      }

      console.log(coursePayload)
      const response = await Afetch("/api/instructor/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        credentials:'include',
        body: JSON.stringify(coursePayload),
      })
      
      const data = await response.json()
      console.log(data)

      if (data.success) {
        toast.success("Course saved as draft successfully!")
        router.push(`/instructor/courses/${data.data._id}/edit`)
      } else {
        toast.error(data.message || "Failed to save course")
      }
    } catch (error) {
      console.error("Save course error:", error)
      toast.error("Failed to save course")
    } finally {
      setSaving(false)
    }
  }

  const publishCourse = async () => {
    try {
      setSaving(true)

      const validationError = validateCourse()
      if (validationError) {
        toast.error(validationError)
        return
      }

      // Additional validation for publishing
      if (curriculum.length === 0 || !curriculum[0].title.trim()) {
        toast.error("At least one section is required for publishing")
        return
      }

      const coursePayload = {
        ...courseData,
        price: Number.parseFloat(courseData.price),
        discountPrice: courseData.discountPrice ? Number.parseFloat(courseData.discountPrice) : undefined,
        requirements: courseData.requirements.filter((req) => req.trim()),
        whatYouWillLearn: courseData.whatYouWillLearn.filter((obj) => obj.trim()),
        targetAudience: courseData.targetAudience.filter((aud) => aud.trim()),
        tags: courseData.tags.filter((tag) => tag.trim()),
        status: "published",
      }

      const response = await Afetch("/api/instructor/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coursePayload),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Course published successfully! It will be reviewed before going live.")
        router.push("/instructor/dashboard")
      } else {
        toast.error(data.message || "Failed to publish course")
      }
    } catch (error) {
      console.error("Publish course error:", error)
      toast.error("Failed to publish course")
    } finally {
      setSaving(false)
    }
  }

  if (!user || user.role !== "instructor") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground">You need to be an instructor to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">
              {language === "am" ? "አዲስ ኮርስ ፍጠር" : "Create New Course"}
            </h1>
            <p className="text-muted-foreground dark:text-slate-400">
              {language === "am" ? "ተማሪዎችን ለማስተማር አዲስ ኮርስ ይፍጠሩ" : "Create a new course to teach students"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={saving}>
              <Eye className="mr-2 h-4 w-4" />
              {language === "am" ? "ቅድመ እይታ" : "Preview"}
            </Button>
            <Button variant="outline" onClick={saveDraft} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving
                ? language === "am"
                  ? "በማስቀመጥ ላይ..."
                  : "Saving..."
                : language === "am"
                  ? "ረቂቅ አስቀምጥ"
                  : "Save Draft"}
            </Button>
            <Button onClick={publishCourse} disabled={saving} className="bg-abuki-primary hover:bg-abuki-accent">
              {saving
                ? language === "am"
                  ? "በማተም ላይ..."
                  : "Publishing..."
                : language === "am"
                  ? "ኮርስ አትም"
                  : "Publish Course"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="basics" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basics">{language === "am" ? "መሰረታዊ" : "Basics"}</TabsTrigger>
                <TabsTrigger value="curriculum">{language === "am" ? "ስርዓተ ትምህርት" : "Curriculum"}</TabsTrigger>
                <TabsTrigger value="pricing">{language === "am" ? "ዋጋ" : "Pricing"}</TabsTrigger>
                <TabsTrigger value="media">{language === "am" ? "ሚዲያ" : "Media"}</TabsTrigger>
                <TabsTrigger value="settings">{language === "am" ? "ቅንብሮች" : "Settings"}</TabsTrigger>
              </TabsList>

              <TabsContent value="basics">
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      {language === "am" ? "መሰረታዊ መረጃ" : "Basic Information"}
                    </CardTitle>
                    <CardDescription className="dark:text-slate-400">
                      {language === "am" ? "የኮርስዎን መሰረታዊ መረጃ ያስገቡ" : "Enter the basic information about your course"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="dark:text-white">
                          {language === "am" ? "የኮርስ ርዕስ (እንግሊዝኛ)" : "Course Title (English)"}
                        </Label>
                        <Input
                          id="title"
                          placeholder="Enter course title in English"
                          value={courseData.title}
                          onChange={(e) => updateCourseData("title", e.target.value)}
                          className="dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="titleAm" className="dark:text-white">
                          {language === "am" ? "የኮርስ ርዕስ (አማርኛ)" : "Course Title (Amharic)"}
                        </Label>
                        <Input
                          id="titleAm"
                          placeholder="በአማርኛ የኮርስ ርዕስ ያስገቡ"
                          value={courseData.titleAm}
                          onChange={(e) => updateCourseData("titleAm", e.target.value)}
                          className="amharic dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subtitle" className="dark:text-white">
                          {language === "am" ? "ንዑስ ርዕስ (እንግሊዝኛ)" : "Subtitle (English)"}
                        </Label>
                        <Input
                          id="subtitle"
                          placeholder="Brief description of your course"
                          value={courseData.subtitle}
                          onChange={(e) => updateCourseData("subtitle", e.target.value)}
                          className="dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subtitleAm" className="dark:text-white">
                          {language === "am" ? "ንዑስ ርዕስ (አማርኛ)" : "Subtitle (Amharic)"}
                        </Label>
                        <Input
                          id="subtitleAm"
                          placeholder="የኮርስዎ አጭር መግለጫ"
                          value={courseData.subtitleAm}
                          onChange={(e) => updateCourseData("subtitleAm", e.target.value)}
                          className="amharic dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shortDescription" className="dark:text-white">
                          {language === "am" ? "አጭር መግለጫ (እንግሊዝኛ)" : "Short Description (English)"}
                        </Label>
                        <Textarea
                          id="shortDescription"
                          placeholder="Short description for course cards..."
                          rows={3}
                          value={courseData.shortDescription}
                          onChange={(e) => updateCourseData("shortDescription", e.target.value)}
                          className="dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shortDescriptionAm" className="dark:text-white">
                          {language === "am" ? "አጭር መግለጫ (አማርኛ)" : "Short Description (Amharic)"}
                        </Label>
                        <Textarea
                          id="shortDescriptionAm"
                          placeholder="ለኮርስ ካርዶች አጭር መግለጫ..."
                          rows={3}
                          value={courseData.shortDescriptionAm}
                          onChange={(e) => updateCourseData("shortDescriptionAm", e.target.value)}
                          className="amharic dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="description" className="dark:text-white">
                          {language === "am" ? "መግለጫ (እንግሊዝኛ)" : "Description (English)"}
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Detailed description of your course..."
                          rows={6}
                          value={courseData.description}
                          onChange={(e) => updateCourseData("description", e.target.value)}
                          className="dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="descriptionAm" className="dark:text-white">
                          {language === "am" ? "መግለጫ (አማርኛ)" : "Description (Amharic)"}
                        </Label>
                        <Textarea
                          id="descriptionAm"
                          placeholder="የኮርስዎ ዝርዝር መግለጫ..."
                          rows={6}
                          value={courseData.descriptionAm}
                          onChange={(e) => updateCourseData("descriptionAm", e.target.value)}
                          className="amharic dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="dark:text-white">
                          {language === "am" ? "ምድብ" : "Category"}
                        </Label>
                        <Select
                          value={courseData.category}
                          onValueChange={(value) => updateCourseData("category", value)}
                        >
                          <SelectTrigger className="dark:bg-slate-800 dark:text-white">
                            <SelectValue placeholder={language === "am" ? "ምድብ ይምረጡ" : "Select category"} />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category._id} value={category._id}>
                                {language === "am" ? category.nameAm || category.name : category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="level" className="dark:text-white">
                          {language === "am" ? "ደረጃ" : "Level"}
                        </Label>
                        <Select value={courseData.level} onValueChange={(value) => updateCourseData("level", value)}>
                          <SelectTrigger className="dark:bg-slate-800 dark:text-white">
                            <SelectValue placeholder={language === "am" ? "ደረጃ ይምረጡ" : "Select level"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">{language === "am" ? "ጀማሪ" : "Beginner"}</SelectItem>
                            <SelectItem value="intermediate">{language === "am" ? "መካከለኛ" : "Intermediate"}</SelectItem>
                            <SelectItem value="advanced">{language === "am" ? "ከፍተኛ" : "Advanced"}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseLanguage" className="dark:text-white">
                          {language === "am" ? "የኮርስ ቋንቋ" : "Course Language"}
                        </Label>
                        <Select
                          value={courseData.language}
                          onValueChange={(value) => updateCourseData("language", value)}
                        >
                          <SelectTrigger className="dark:bg-slate-800 dark:text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="am">አማርኛ</SelectItem>
                            <SelectItem value="both">Both / ሁለቱም</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Learning Objectives */}
                    <div className="space-y-4">
                      <Label className="dark:text-white">
                        {language === "am" ? "የትምህርት ዓላማዎች" : "Learning Objectives"}
                      </Label>
                      {courseData.whatYouWillLearn.map((objective, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={language === "am" ? `ዓላማ ${index + 1}` : `Learning objective ${index + 1}`}
                            value={objective}
                            onChange={(e) => updateArrayItem("whatYouWillLearn", index, e.target.value)}
                            className="dark:bg-slate-800 dark:text-white"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("whatYouWillLearn", index)}
                            disabled={courseData.whatYouWillLearn.length === 1}
                            className="dark:border-slate-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addArrayItem("whatYouWillLearn")}
                        className="dark:border-slate-600"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {language === "am" ? "ዓላማ ጨምር" : "Add Objective"}
                      </Button>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-4">
                      <Label className="dark:text-white">{language === "am" ? "መስፈርቶች" : "Requirements"}</Label>
                      {courseData.requirements.map((requirement, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={language === "am" ? `መስፈርት ${index + 1}` : `Requirement ${index + 1}`}
                            value={requirement}
                            onChange={(e) => updateArrayItem("requirements", index, e.target.value)}
                            className="dark:bg-slate-800 dark:text-white"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("requirements", index)}
                            disabled={courseData.requirements.length === 1}
                            className="dark:border-slate-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addArrayItem("requirements")}
                        className="dark:border-slate-600"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {language === "am" ? "መስፈርት ጨምር" : "Add Requirement"}
                      </Button>
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-4">
                      <Label className="dark:text-white">{language === "am" ? "ዒላማ ተመልካቾች" : "Target Audience"}</Label>
                      {courseData.targetAudience.map((audience, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={language === "am" ? `ዒላማ ተመልካች ${index + 1}` : `Target audience ${index + 1}`}
                            value={audience}
                            onChange={(e) => updateArrayItem("targetAudience", index, e.target.value)}
                            className="dark:bg-slate-800 dark:text-white"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("targetAudience", index)}
                            disabled={courseData.targetAudience.length === 1}
                            className="dark:border-slate-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addArrayItem("targetAudience")}
                        className="dark:border-slate-600"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {language === "am" ? "ዒላማ ተመልካች ጨምር" : "Add Target Audience"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

                <TabsContent value="curriculum">
                <Card className="dark:bg-slate-900 dark:text-white">
                  <CardHeader>
                    <CardTitle>{language === "am" ? "ስርዓተ ትምህርት" : "Course Curriculum"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "የኮርስዎን ይዘት እና ትምህርቶች ያዘጋጁ" : "Organize your course content and lessons"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {curriculum.map((section, sectionIndex) => (
                      <Card key={section.id} className="border-2 border-dashed dark:bg-slate-900 dark:text-white">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                            <div className="flex-1 grid md:grid-cols-2 gap-4">
                              <Input
                                placeholder={language === "am" ? "የክፍል ርዕስ (እንግሊዝኛ)" : "Section title (English)"}
                                value={section.title}
                                onChange={(e) => {
                                  const newCurriculum = [...curriculum]
                                  newCurriculum[sectionIndex].title = e.target.value
                                  setCurriculum(newCurriculum)
                                }}
                              />
                              <Input
                                placeholder={language === "am" ? "የክፍል ርዕስ (አማርኛ)" : "Section title (Amharic)"}
                                value={section.titleAm}
                                onChange={(e) => {
                                  const newCurriculum = [...curriculum]
                                  newCurriculum[sectionIndex].titleAm = e.target.value
                                  setCurriculum(newCurriculum)
                                }}
                                className="amharic"
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurriculum(curriculum.filter((_, i) => i !== sectionIndex))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="border rounded-lg">
                                <div  className="flex items-center gap-2 p-4 ">
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                <div className="flex-1 grid md:grid-cols-2 gap-2">
                                  <Input
                                    placeholder={language === "am" ? "የትምህርት ርዕስ (እንግሊዝኛ)" : "Lesson title (English)"}
                                    value={lesson.title}
                                    onChange={(e) => {
                                      const newCurriculum = [...curriculum]
                                      newCurriculum[sectionIndex].lessons[lessonIndex].title = e.target.value
                                      setCurriculum(newCurriculum)
                                    }}
                                  />
                                  <Input
                                    placeholder={language === "am" ? "የትምህርት ርዕስ (አማርኛ)" : "Lesson title (Amharic)"}
                                    value={lesson.titleAm}
                                    onChange={(e) => {
                                      const newCurriculum = [...curriculum]
                                      newCurriculum[sectionIndex].lessons[lessonIndex].titleAm = e.target.value
                                      setCurriculum(newCurriculum)
                                    }}
                                    className="amharic"
                                  />
                                </div>
                                <Select
                                  value={lesson.type}
                                  onValueChange={(value) => {
                                    const newCurriculum = [...curriculum]
                                    newCurriculum[sectionIndex].lessons[lessonIndex].type = value
                                    setCurriculum(newCurriculum)
                                  }}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="video">
                                      <div className="flex items-center gap-2">
                                        <Play className="h-4 w-4" />
                                        Video
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="text">
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Text
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="quiz">
                                      <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        Quiz
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  placeholder="Duration"
                                  className="w-24"
                                  value={lesson.duration}
                                  onChange={(e) => {
                                    const newCurriculum = [...curriculum]
                                    newCurriculum[sectionIndex].lessons[lessonIndex].duration = e.target.value
                                    setCurriculum(newCurriculum)
                                  }}
                                />
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={lesson.free}
                                    onCheckedChange={(checked) => {
                                      const newCurriculum = [...curriculum]
                                      newCurriculum[sectionIndex].lessons[lessonIndex].free = checked
                                      setCurriculum(newCurriculum)
                                    }}
                                  />
                                  <Label className="text-xs">{language === "am" ? "ነፃ" : "Free"}</Label>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newCurriculum = [...curriculum]
                                    newCurriculum[sectionIndex].lessons = newCurriculum[sectionIndex].lessons.filter(
                                      (_, i) => i !== lessonIndex
                                    )
                                    setCurriculum(newCurriculum)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                </div>
                                <div className="m-2">
                                  <Input 
                                  type="file"
                                  onChange={(e) => {
                                    // const newCurriculum = [...curriculum]
                                    // newCurriculum[sectionIndex].lessons[lessonIndex].content = e.target.value
                                    // setCurriculum(newCurriculum)
                                    setFiles((p)=>{
                                      p[sectionIndex][lessonIndex]=e.target.files![0]
                                      return p
                                    })
                                  }}
                                  />
                                </div>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => addLesson(section.id)}
                              className="w-full"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              {language === "am" ? "ትምህርት ጨምር" : "Add Lesson"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button type="button" variant="outline" onClick={addSection} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      {language === "am" ? "አዲስ ክፍል ጨምር" : "Add New Section"}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing">
                <Card className="dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      {language === "am" ? "የኮርስ ዋጋ" : "Course Pricing"}
                    </CardTitle>
                    <CardDescription className="dark:text-slate-400">
                      {language === "am" ? "የኮርስዎን ዋጋ ያዘጋጁ" : "Set the pricing for your course"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="dark:text-white">
                          {language === "am" ? "የኮርስ ዋጋ (ETB)" : "Course Price (ETB)"}
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="price"
                            type="number"
                            placeholder="2500"
                            className="pl-10 dark:bg-slate-800 dark:text-white"
                            value={courseData.price}
                            onChange={(e) => updateCourseData("price", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discountPrice" className="dark:text-white">
                          {language === "am" ? "የቅናሽ ዋጋ (ETB)" : "Discount Price (ETB)"}
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="discountPrice"
                            type="number"
                            placeholder="2000"
                            className="pl-10 dark:bg-slate-800 dark:text-white"
                            value={courseData.discountPrice}
                            onChange={(e) => updateCourseData("discountPrice", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg dark:bg-slate-800/50">
                      <h3 className="font-medium mb-2 dark:text-white">
                        {language === "am" ? "የዋጋ ምክር" : "Pricing Tips"}
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1 dark:text-slate-400">
                        <li>
                          • {language === "am" ? "ተመሳሳይ ኮርሶችን ይመርምሩ" : "Research similar courses in your category"}
                        </li>
                        <li>
                          • {language === "am" ? "የኮርስዎን ርዝመት እና ጥራት ያስቡ" : "Consider your course length and quality"}
                        </li>
                        <li>
                          •{" "}
                          {language === "am"
                            ? "ለመጀመሪያ ኮርስዎ ዝቅተኛ ዋጋ ያስቡ"
                            : "Consider lower pricing for your first course"}
                        </li>
                        <li>
                          • {language === "am" ? "የቅናሽ ዋጋ ቅናሽ ይፈጥራል" : "Discount price creates a discount effect"}
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media">
                <Card className="dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      {language === "am" ? "ሚዲያ እና ይዘት" : "Media & Content"}
                    </CardTitle>
                    <CardDescription className="dark:text-slate-400">
                      {language === "am" ? "የኮርስ ምስል እና ቪዲዮ ይጨምሩ" : "Add course thumbnail and preview video"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Course Thumbnail */}
                    <div className="space-y-4">
                      <Label className="dark:text-white">
                        {language === "am" ? "የኮርስ ምስል URL" : "Course Thumbnail URL"}
                      </Label>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={courseData.thumbnail}
                        onChange={(e) => updateCourseData("thumbnail", e.target.value)}
                        className="dark:bg-slate-800 dark:text-white"
                      />
                      {courseData.thumbnail && (
                        <div className="border rounded-lg p-4 dark:border-slate-600">
                          <img
                            src={courseData.thumbnail || "/placeholder.svg"}
                            alt="Course thumbnail preview"
                            className="w-full max-w-md aspect-video object-cover rounded-lg"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).style.display = "none"
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Preview Video */}
                    <div className="space-y-4">
                      <Label htmlFor="previewVideo" className="dark:text-white">
                        {language === "am" ? "የቅድመ እይታ ቪዲዮ (YouTube URL)" : "Preview Video (YouTube URL)"}
                      </Label>
                      <div className="relative">
                        <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="previewVideo"
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="pl-10 dark:bg-slate-800 dark:text-white"
                          value={courseData.previewVideo}
                          onChange={(e) => updateCourseData("previewVideo", e.target.value)}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        {language === "am"
                          ? "የቅድመ እይታ ቪዲዮ ተማሪዎች ኮርስዎን ከመግዛታቸው በፊት እንዲረዱ ይረዳል"
                          : "A preview video helps students understand your course before purchasing"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      {language === "am" ? "የኮርስ ቅንብሮች" : "Course Settings"}
                    </CardTitle>
                    <CardDescription className="dark:text-slate-400">
                      {language === "am" ? "ተጨማሪ የኮርስ ቅንብሮች" : "Additional course settings and preferences"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base dark:text-white">
                            {language === "am" ? "ኮርስ ይፋ ይሁን" : "Make Course Public"}
                          </Label>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            {language === "am" ? "ኮርስዎ በፍለጋ ውጤቶች ውስጥ ይታይ" : "Your course will appear in search results"}
                          </p>
                        </div>
                        <Switch
                          checked={courseSettings.isPublic}
                          onCheckedChange={(checked) => setCourseSettings((prev) => ({ ...prev, isPublic: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base dark:text-white">
                            {language === "am" ? "ተማሪ ውይይት ፍቀድ" : "Allow Student Discussions"}
                          </Label>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            {language === "am"
                              ? "ተማሪዎች ጥያቄዎችን መጠየቅ እና ውይይት ማድረግ ይችላሉ"
                              : "Students can ask questions and discuss"}
                          </p>
                        </div>
                        <Switch
                          checked={courseSettings.allowDiscussions}
                          onCheckedChange={(checked) =>
                            setCourseSettings((prev) => ({ ...prev, allowDiscussions: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base dark:text-white">
                            {language === "am" ? "ሰርተፊኬት ይስጥ" : "Provide Certificate"}
                          </Label>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            {language === "am"
                              ? "ተማሪዎች ኮርስ ሲጨርሱ ሰርተፊኬት ይቀበላሉ"
                              : "Students receive certificate upon completion"}
                          </p>
                        </div>
                        <Switch
                          checked={courseSettings.provideCertificate}
                          onCheckedChange={(checked) =>
                            setCourseSettings((prev) => ({ ...prev, provideCertificate: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base dark:text-white">
                            {language === "am" ? "ኮርስ ማውረድ ፍቀድ" : "Allow Course Download"}
                          </Label>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            {language === "am" ? "ተማሪዎች ኮርስ ይዘቶችን ማውረድ ይችላሉ" : "Students can download course content"}
                          </p>
                        </div>
                        <Switch
                          checked={courseSettings.allowDownload}
                          onCheckedChange={(checked) =>
                            setCourseSettings((prev) => ({ ...prev, allowDownload: checked }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Preview */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">
                  {language === "am" ? "የኮርስ ቅድመ እይታ" : "Course Preview"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center dark:bg-slate-800">
                  {courseData.thumbnail ? (
                    <img
                      src={courseData.thumbnail || "/placeholder.svg"}
                      alt="Course preview"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).style.display = "none"
                      }}
                    />
                  ) : (
                    <Play className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-semibold mb-2 dark:text-white">{courseData.title || "Course Title"}</h3>
                <p className="text-sm text-muted-foreground mb-4 dark:text-slate-400">
                  {courseData.shortDescription || "Course description will appear here"}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-abuki-primary">
                    {courseData.price ? `${courseData.price} ETB` : "Price"}
                  </div>
                  {courseData.discountPrice && (
                    <div className="text-sm text-muted-foreground line-through dark:text-slate-400">
                      {courseData.discountPrice} ETB
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">
                  {language === "am" ? "የኮርስ ስታቲስቲክስ" : "Course Statistics"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-abuki-primary" />
                    <span className="text-sm dark:text-white">{language === "am" ? "ክፍሎች" : "Sections"}</span>
                  </div>
                  <span className="font-medium dark:text-white">{curriculum.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-abuki-primary" />
                    <span className="text-sm dark:text-white">{language === "am" ? "ትምህርቶች" : "Lessons"}</span>
                  </div>
                  <span className="font-medium dark:text-white">
                    {curriculum.reduce((total, section) => total + section.lessons.length, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-abuki-primary" />
                    <span className="text-sm dark:text-white">
                      {language === "am" ? "ጠቅላላ ርዝመት" : "Total Duration"}
                    </span>
                  </div>
                  <span className="font-medium dark:text-white">
                    {curriculum.reduce((total, section) => {
                      return (
                        total +
                        section.lessons.reduce((sectionTotal, lesson) => {
                          const duration = Number.parseInt(lesson.duration) || 0
                          return sectionTotal + duration
                        }, 0)
                      )
                    }, 0)}{" "}
                    min
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Publishing Checklist */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">
                  {language === "am" ? "የማተሚያ ዝርዝር" : "Publishing Checklist"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${courseData.title ? "bg-green-500" : "bg-muted dark:bg-slate-600"}`}
                    ></div>
                    <span className="text-sm dark:text-white">{language === "am" ? "የኮርስ ርዕስ" : "Course title"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${courseData.description ? "bg-green-500" : "bg-muted dark:bg-slate-600"}`}
                    ></div>
                    <span className="text-sm dark:text-white">
                      {language === "am" ? "የኮርስ መግለጫ" : "Course description"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${courseData.category ? "bg-green-500" : "bg-muted dark:bg-slate-600"}`}
                    ></div>
                    <span className="text-sm dark:text-white">
                      {language === "am" ? "ምድብ እና ደረጃ" : "Category & level"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${curriculum.length > 0 && curriculum[0].title ? "bg-green-500" : "bg-muted dark:bg-slate-600"}`}
                    ></div>
                    <span className="text-sm dark:text-white">{language === "am" ? "ስርዓተ ትምህርት" : "Curriculum"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${courseData.price ? "bg-green-500" : "bg-muted dark:bg-slate-600"}`}
                    ></div>
                    <span className="text-sm dark:text-white">{language === "am" ? "ዋጋ" : "Pricing"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${courseData.thumbnail ? "bg-green-500" : "bg-muted dark:bg-slate-600"}`}
                    ></div>
                    <span className="text-sm dark:text-white">
                      {language === "am" ? "ኮርስ ምስል" : "Course thumbnail"}
                    </span>
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
