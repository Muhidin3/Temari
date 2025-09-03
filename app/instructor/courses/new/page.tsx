"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Upload, Plus, Trash2, GripVertical, Play, FileText, ImageIcon, Link, Save, Eye, Settings, DollarSign, Users, Clock, BookOpen } from 'lucide-react'
import { useLang } from "@/contexts/LanguageContext"
export default function CourseBuilder() {
  const {language} = useLang()
  const [courseData, setCourseData] = useState({
    title: "",
    titleAm: "",
    subtitle: "",
    subtitleAm: "",
    description: "",
    descriptionAm: "",
    category: "",
    level: "",
    language: "en",
    price: "",
    comparePrice: "",
    thumbnail: null,
    previewVideo: "",
    tags: [],
    requirements: [""],
    objectives: [""],
    targetAudience: [""],
  })

  const [curriculum, setCurriculum] = useState([
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

  const categories = [
    { value: "development", label: "Development", labelAm: "ዲቨሎፕመንት" },
    { value: "business", label: "Business", labelAm: "ንግድ" },
    { value: "design", label: "Design", labelAm: "ዲዛይን" },
    { value: "marketing", label: "Marketing", labelAm: "ማርኬቲንግ" },
    { value: "photography", label: "Photography", labelAm: "ፎቶግራፊ" },
    { value: "music", label: "Music", labelAm: "ሙዚቃ" },
  ]

  const levels = [
    { value: "beginner", label: "Beginner", labelAm: "ጀማሪ" },
    { value: "intermediate", label: "Intermediate", labelAm: "መካከለኛ" },
    { value: "advanced", label: "Advanced", labelAm: "ከፍተኛ" },
  ]

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
          : section
      )
    )
  }

  const updateCourseData = (field: string, value: any) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: string) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as string[], ""],
    }))
  }

  const updateArrayItem = (field: string, index: number, value: string) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{language === "am" ? "አዲስ ኮርስ ፍጠር" : "Create New Course"}</h1>
            <p className="text-muted-foreground">
              {language === "am" ? "ተማሪዎችን ለማስተማር አዲስ ኮርስ ይፍጠሩ" : "Create a new course to teach students"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              {language === "am" ? "ቅድመ እይታ" : "Preview"}
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              {language === "am" ? "ረቂቅ አስቀምጥ" : "Save Draft"}
            </Button>
            <Button className="bg-abuki-primary hover:bg-abuki-accent">
              {language === "am" ? "ኮርስ አትም" : "Publish Course"}
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
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "መሰረታዊ መረጃ" : "Basic Information"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "የኮርስዎን መሰረታዊ መረጃ ያስገቡ" : "Enter the basic information about your course"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">{language === "am" ? "የኮርስ ርዕስ (እንግሊዝኛ)" : "Course Title (English)"}</Label>
                        <Input
                          id="title"
                          placeholder="Enter course title in English"
                          value={courseData.title}
                          onChange={(e) => updateCourseData("title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="titleAm">{language === "am" ? "የኮርስ ርዕስ (አማርኛ)" : "Course Title (Amharic)"}</Label>
                        <Input
                          id="titleAm"
                          placeholder="በአማርኛ የኮርስ ርዕስ ያስገቡ"
                          value={courseData.titleAm}
                          onChange={(e) => updateCourseData("titleAm", e.target.value)}
                          className="amharic"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subtitle">{language === "am" ? "ንዑስ ርዕስ (እንግሊዝኛ)" : "Subtitle (English)"}</Label>
                        <Input
                          id="subtitle"
                          placeholder="Brief description of your course"
                          value={courseData.subtitle}
                          onChange={(e) => updateCourseData("subtitle", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subtitleAm">{language === "am" ? "ንዑስ ርዕስ (አማርኛ)" : "Subtitle (Amharic)"}</Label>
                        <Input
                          id="subtitleAm"
                          placeholder="የኮርስዎ አጭር መግለጫ"
                          value={courseData.subtitleAm}
                          onChange={(e) => updateCourseData("subtitleAm", e.target.value)}
                          className="amharic"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="description">{language === "am" ? "መግለጫ (እንግሊዝኛ)" : "Description (English)"}</Label>
                        <Textarea
                          id="description"
                          placeholder="Detailed description of your course..."
                          rows={6}
                          value={courseData.description}
                          onChange={(e) => updateCourseData("description", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="descriptionAm">{language === "am" ? "መግለጫ (አማርኛ)" : "Description (Amharic)"}</Label>
                        <Textarea
                          id="descriptionAm"
                          placeholder="የኮርስዎ ዝርዝር መግለጫ..."
                          rows={6}
                          value={courseData.descriptionAm}
                          onChange={(e) => updateCourseData("descriptionAm", e.target.value)}
                          className="amharic"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">{language === "am" ? "ምድብ" : "Category"}</Label>
                        <Select value={courseData.category} onValueChange={(value) => updateCourseData("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={language === "am" ? "ምድብ ይምረጡ" : "Select category"} />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {language === "am" ? category.labelAm : category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="level">{language === "am" ? "ደረጃ" : "Level"}</Label>
                        <Select value={courseData.level} onValueChange={(value) => updateCourseData("level", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={language === "am" ? "ደረጃ ይምረጡ" : "Select level"} />
                          </SelectTrigger>
                          <SelectContent>
                            {levels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {language === "am" ? level.labelAm : level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseLanguage">{language === "am" ? "የኮርስ ቋንቋ" : "Course Language"}</Label>
                        <Select value={courseData.language} onValueChange={(value) => updateCourseData("language", value)}>
                          <SelectTrigger>
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
                      <Label>{language === "am" ? "የትምህርት ዓላማዎች" : "Learning Objectives"}</Label>
                      {courseData.objectives.map((objective, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={
                              language === "am" ? `ዓላማ ${index + 1}` : `Learning objective ${index + 1}`
                            }
                            value={objective}
                            onChange={(e) => updateArrayItem("objectives", index, e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("objectives", index)}
                            disabled={courseData.objectives.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => addArrayItem("objectives")}>
                        <Plus className="mr-2 h-4 w-4" />
                        {language === "am" ? "ዓላማ ጨምር" : "Add Objective"}
                      </Button>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-4">
                      <Label>{language === "am" ? "መስፈርቶች" : "Requirements"}</Label>
                      {courseData.requirements.map((requirement, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={
                              language === "am" ? `መስፈርት ${index + 1}` : `Requirement ${index + 1}`
                            }
                            value={requirement}
                            onChange={(e) => updateArrayItem("requirements", index, e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("requirements", index)}
                            disabled={courseData.requirements.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => addArrayItem("requirements")}>
                        <Plus className="mr-2 h-4 w-4" />
                        {language === "am" ? "መስፈርት ጨምር" : "Add Requirement"}
                      </Button>
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-4">
                      <Label>{language === "am" ? "ዒላማ ተመልካቾች" : "Target Audience"}</Label>
                      {courseData.targetAudience.map((audience, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={
                              language === "am" ? `ዒላማ ተመልካች ${index + 1}` : `Target audience ${index + 1}`
                            }
                            value={audience}
                            onChange={(e) => updateArrayItem("targetAudience", index, e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("targetAudience", index)}
                            disabled={courseData.targetAudience.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => addArrayItem("targetAudience")}>
                        <Plus className="mr-2 h-4 w-4" />
                        {language === "am" ? "ዒላማ ተመልካች ጨምር" : "Add Target Audience"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "ስርዓተ ትምህርት" : "Course Curriculum"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "የኮርስዎን ይዘት እና ትምህርቶች ያዘጋጁ" : "Organize your course content and lessons"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {curriculum.map((section, sectionIndex) => (
                      <Card key={section.id} className="border-2 border-dashed">
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
                              <div key={lesson.id} className="flex items-center gap-2 p-4 border rounded-lg">
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
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "የኮርስ ዋጋ" : "Course Pricing"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "የኮርስዎን ዋጋ ያዘጋጁ" : "Set the pricing for your course"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">{language === "am" ? "የኮርስ ዋጋ (ETB)" : "Course Price (ETB)"}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="price"
                            type="number"
                            placeholder="2500"
                            className="pl-10"
                            value={courseData.price}
                            onChange={(e) => updateCourseData("price", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comparePrice">{language === "am" ? "የንፅፅር ዋጋ (ETB)" : "Compare Price (ETB)"}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="comparePrice"
                            type="number"
                            placeholder="4000"
                            className="pl-10"
                            value={courseData.comparePrice}
                            onChange={(e) => updateCourseData("comparePrice", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2">{language === "am" ? "የዋጋ ምክር" : "Pricing Tips"}</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• {language === "am" ? "ተመሳሳይ ኮርሶችን ይመርምሩ" : "Research similar courses in your category"}</li>
                        <li>• {language === "am" ? "የኮርስዎን ርዝመት እና ጥራት ያስቡ" : "Consider your course length and quality"}</li>
                        <li>• {language === "am" ? "ለመጀመሪያ ኮርስዎ ዝቅተኛ ዋጋ ያስቡ" : "Consider lower pricing for your first course"}</li>
                        <li>• {language === "am" ? "የንፅፅር ዋጋ ቅናሽ ይፈጥራል" : "Compare price creates a discount effect"}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "ሚዲያ እና ይዘት" : "Media & Content"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "የኮርስ ምስል እና ቪዲዮ ይጨምሩ" : "Add course thumbnail and preview video"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Course Thumbnail */}
                    <div className="space-y-4">
                      <Label>{language === "am" ? "የኮርስ ምስል" : "Course Thumbnail"}</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            {language === "am" ? "ምስል ይጎትቱ እና ይጣሉ ወይም ይምረጡ" : "Drag and drop an image, or click to select"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {language === "am" ? "PNG, JPG እስከ 2MB" : "PNG, JPG up to 2MB"}
                          </p>
                        </div>
                        <Button variant="outline" className="mt-4">
                          <Upload className="mr-2 h-4 w-4" />
                          {language === "am" ? "ፋይል ይምረጡ" : "Choose File"}
                        </Button>
                      </div>
                    </div>

                    {/* Preview Video */}
                    <div className="space-y-4">
                      <Label htmlFor="previewVideo">{language === "am" ? "የቅድመ እይታ ቪዲዮ (YouTube URL)" : "Preview Video (YouTube URL)"}</Label>
                      <div className="relative">
                        <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="previewVideo"
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="pl-10"
                          value={courseData.previewVideo}
                          onChange={(e) => updateCourseData("previewVideo", e.target.value)}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === "am" 
                          ? "የቅድመ እይታ ቪዲዮ ተማሪዎች ኮርስዎን ከመግዛታቸው ውስጥ ይታይ"
                          : "A preview video helps students understand your course before purchasing"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "የኮርስ ቅንብሮች" : "Course Settings"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "ተጨማሪ የኮርስ ቅንብሮች" : "Additional course settings and preferences"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "ኮርስ ይፋ ይሁን" : "Make Course Public"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "ኮርስዎ በፍለጋ ውጤቶች ውስጥ ይታይ" : "Your course will appear in search results"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "ተማሪ ውይይት ፍቀድ" : "Allow Student Discussions"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "ተማሪዎች ጥያቄዎችን መጠየቅ እና ውይይት ማድረግ ይችላሉ" : "Students can ask questions and discuss"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "ሰርተፊኬት ይስጥ" : "Provide Certificate"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "ተማሪዎች ኮርስ ሲጨርሱ ሰርተፊኬት ይቀበላሉ" : "Students receive certificate upon completion"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "ኮርስ ማውረድ ፍቀድ" : "Allow Course Download"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "ተማሪዎች ኮርስ ይዘቶችን ማውረድ ይችላሉ" : "Students can download course content"}
                          </p>
                        </div>
                        <Switch />
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
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "የኮርስ ቅድመ እይታ" : "Course Preview"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Play className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{courseData.title || "Course Title"}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {courseData.subtitle || "Course subtitle will appear here"}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-abuki-primary">
                    {courseData.price ? `${courseData.price} ETB` : "Price"}
                  </div>
                  {courseData.comparePrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      {courseData.comparePrice} ETB
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "የኮርስ ስታቲስቲክስ" : "Course Statistics"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-abuki-primary" />
                    <span className="text-sm">{language === "am" ? "ክፍሎች" : "Sections"}</span>
                  </div>
                  <span className="font-medium">{curriculum.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-abuki-primary" />
                    <span className="text-sm">{language === "am" ? "ትምህርቶች" : "Lessons"}</span>
                  </div>
                  <span className="font-medium">
                    {curriculum
                      .reduce((total, section) => total + section.lessons.length, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-abuki-primary" />
                    <span className="text-sm">{language === "am" ? "ጠቅላላ ርዝመት" : "Total Duration"}</span>
                  </div>
                  <span className="font-medium">
                    {curriculum
                      .reduce((total, section) => {
                        return total + section.lessons.reduce((sectionTotal, lesson) => {
                          const duration = parseInt(lesson.duration) || 0
                          return sectionTotal + duration
                        }, 0)
                      }, 0)} min
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Publishing Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "የማተሚያ ዝርዝር" : "Publishing Checklist"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${courseData.title ? 'bg-green-500' : 'bg-muted'}`}></div>
                    <span className="text-sm">{language === "am" ? "የኮርስ ርዕስ" : "Course title"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${courseData.description ? 'bg-green-500' : 'bg-muted'}`}></div>
                    <span className="text-sm">{language === "am" ? "የኮርስ መግለጫ" : "Course description"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${courseData.category ? 'bg-green-500' : 'bg-muted'}`}></div>
                    <span className="text-sm">{language === "am" ? "ምድብ እና ደረጃ" : "Category & level"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${curriculum.length > 0 && curriculum[0].title ? 'bg-green-500' : 'bg-muted'}`}></div>
                    <span className="text-sm">{language === "am" ? "ስርዓተ ትምህርት" : "Curriculum"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${courseData.price ? 'bg-green-500' : 'bg-muted'}`}></div>
                    <span className="text-sm">{language === "am" ? "ዋጋ" : "Pricing"}</span>
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
