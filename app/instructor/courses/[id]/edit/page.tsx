"use client"

import { useState, useEffect, useCallback } from "react"
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
import { Plus, Trash2, Play, Link, Save, Eye, DollarSign, Clock, BookOpen, GripVertical, FileText, AlertCircle, Upload, Edit } from "lucide-react"
import Afetch from "@/lib/Afetch"
import { useNotify } from "@/contexts/notification-context"
import { Myloading, Myloading2 } from "@/components/Myloading"
import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert"
import Section from "@/models/Section"
import { Badge } from "@/components/ui/badge"

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
  sections?:string[]
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
  status:string
}

interface Lesson {
  id: number
  title: string
  titleAm: string
  type: string
  content: string
  duration: string
  free: boolean
  retrived?:boolean
  _id?:string
  file?:File
  section?:any
}

interface Section {
  id: number
  title: string
  titleAm: string
  lessons: Lesson[]
  retrived?:boolean
}

export default function CourseBuilder({params}:any) {
  const { language } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const [files,setFiles] = useState<File[][]>([[]])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [thumbnail,setThumbnail] = useState<File | null>(null)
  const [previewVideo,setPreviewVideo] = useState<File | null>(null)
  const [validationError,setValidationError] = useState<string |null>()
  const [validationError2,setValidationError2] = useState<string |null>()
  const {notify} = useNotify()
  const [newSectionbtn,setNewSectionbtn] = useState(true)
  const [newSection,setNewSection] = useState('')
 

  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    titleAm: "",
    subtitle: "",
    subtitleAm: "",
    description: "",
    descriptionAm: "",
    shortDescription: "",
    shortDescriptionAm: "",
    sections:[],
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
    status:''
  })

  const [curriculum, setCurriculum] = useState<Section[]>([
    // {
    //   id: 0,
    //   title: "",
    //   titleAm: "",
    //   lessons: [
    //     {
    //       id: 0,
    //       title: "",
    //       titleAm: "",
    //       type: "video",
    //       content: "",
    //       duration: "",
    //       free: false,
    //     },
    //   ],
    // },
  ])
  const [courseSettings, setCourseSettings] = useState({
    isPublic: true,
    allowDiscussions: true,
    provideCertificate: true,
    allowDownload: false,
  })
  // fetch categories on component mount
  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(()=>{
     (async()=>{
      const {id} = await params
        const res = await Afetch(`/api/instructor/courses/${id}`).then(async(d)=>await d.json())

        const {title,titleAm,description,descriptionAm,sections,level,status,tags,shortDescription,shortDescriptionAm,price,requirements,whatYouWillLearn,targetAudience} = res.course
        setCourseData({
          title,
          titleAm,
          subtitle: "",
          subtitleAm: "",
          description,
          descriptionAm,
          shortDescription,
          shortDescriptionAm,
          sections,
          category:res.course.category._id,
          subcategory: "",
          level,
          language: "en",
          price,
          discountPrice: "",
          thumbnail: "",
          previewVideo: "",
          tags,
          requirements,
          whatYouWillLearn,
          targetAudience,
          status
        })
        setLoading(false)

        //sections
        const res2 = await Afetch(`/api/instructor/courses/${id}/section`).then(async(d)=>await d.json())
        // console.log(res2)

        //lessons
        const res3 = await Afetch(`/api/instructor/courses/${id}/lesson`).then(async(d)=>await d.json())
        // console.log('res3',res3)

        res2.sections.length!=0 && res2.sections.map(((section:any)=>{
          const oneSectionLessons = res3.lessons.filter((lesson:any)=>lesson.section==section._id)
          // console.log(oneSectionLessons)
          
          oneSectionLessons.map((lesson:any)=>{
            lesson.id = lesson._id
            lesson.type='Video'
            lesson.duration='Video'
            lesson.retrived=true
            lesson.file=lesson.videoUrl
            return
            
          })

          setCurriculum((p)=>{
            if (p.find((a)=>a.id==section._id)) return p 
            return [{
            id: section._id,
            title: section.title,
            titleAm: "",
            lessons:oneSectionLessons
          },...p]
          })
          
        }))


     })()
  },[])
 
  // Redirect if not instructor
  useEffect(() => {
    if (user && user.role !== "instructor") {
      router.push("/dashboard")
    }
  }, [user, router])

  const fetchCategories = async () => {
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

  const addSection = async () => {
    setLoading(true)
    const {id} = await params
    const res = await Afetch(`/api/instructor/courses/${id}/section`,
      {
        method:'POST',
        body:JSON.stringify({
          title:newSection,
          order:curriculum.length
        })
      }).then(async(data)=>await data.json());
      
    
    setFiles(p=>{
      return [...p,[]]
    });
    setCurriculum([
      ...curriculum,
      {
        id: res.section._id,
        title: res.section.title,
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
    ]);
    setNewSection('')
    setLoading(false)
  }

  const deleteSection = async (_id:string)=>{
    const {id} = await params
    const res = await Afetch(`/api/instructor/courses/${id}/section`,
      {
        method:'DELETE',
        body:JSON.stringify({
          _id:String(_id)
        })
      });
      console.log('Section Deleted',res)
  }

  const addLesson = (sectionId: any) => {
    console.log(sectionId)
    setCurriculum(
      curriculum.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: (section.lessons.pop()?.id as number) + 1 || 0,
                  title: "",
                  titleAm: "",
                  type: "video",
                  content: "",
                  duration: "",
                  free: false,
                  section:section.id
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
    if (!thumbnail) return "Course thumbnail is required"
    if (courseData.requirements.filter((req) => req.trim()).length === 0) return "At least one requirement is needed"
    if (courseData.whatYouWillLearn.filter((obj) => obj.trim()).length === 0)
      return "At least one learning objective is needed"
    if (courseData.targetAudience.filter((aud) => aud.trim()).length === 0)
      return "At least one target audience is needed"
    if (curriculum.length ==0 ) return 'You need to have at least one Section with a lesson'
    curriculum.map((section)=>{
      if (section.lessons.length ==0 ) return `Section ${section.title} must have at least one lesson`
    })
    return null
  }

  const handleDeleteLesson = async (id:any,newCurriculum:any)=>{
    setLoading(true)
    // console.log(newCurriculum)
    // console.log(id)
    const courseId = (await params).id
    const res = await Afetch(`/api/instructor/courses/${courseId}/lesson`,{method:'DELETE',body:JSON.stringify({id})})
    // console.log(res)
    console.log(await res.json())
    // setCurriculum(newCurriculum)
    setLoading(false)
  }

  const uploadCurriculum = async ()=>{
    //preventing already uploaded lesson from saving again
     const newcurr = curriculum.map((section)=>{
      section.lessons = section.lessons.filter(lesson=>!lesson.retrived)
      return section
    })
    try {
      const {id} = await params
      const form = new FormData()
      form.append('curriculum',JSON.stringify(newcurr))
      newcurr.map((section,i)=>{
          section.lessons.map((lesson,j)=>{
            form.append(`file_${i}_${j}`,lesson.file||'nofile')
          })
      })
      form.append('thumbnail',thumbnail || 'nofile')
      form.append('previewVideo',previewVideo || 'nofile')

      const response = await Afetch(`/api/instructor/courses/${id}/lesson`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
        },
        body: form,
      })
      
      const data = await response.json()
      console.log(data)

    } catch (error:any) {
      console.log(error)
    }

    setLoading(false)

  }

  const saveDraft = async () => {
    setLoading(true)
    uploadCurriculum()
    try {
      setSaving(true)

      const coursePayload = {
        ...courseData,
        price: Number.parseFloat(courseData.price),
        discountPrice: courseData.discountPrice ? Number.parseFloat(courseData.discountPrice) : undefined,
        requirements: courseData.requirements.filter((req) => req.trim()),
        whatYouWillLearn: courseData.whatYouWillLearn.filter((obj) => obj.trim()),
        targetAudience: courseData.targetAudience.filter((aud) => aud.trim()),
        tags: courseData.tags.filter((tag) => tag.trim()),
        sections:curriculum.map(section=>section.id)
      }

      const {id} = await params
      const response = await Afetch(`/api/instructor/courses/${id}`, {
        method: "PUT",
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
    if (validateCourse()) {
      console.log(validateCourse())
    }else{
      courseData.status='published'
      saveDraft()
      console.log('published')
    }
    
    return
    try {
      console.log(thumbnail)
      console.log(previewVideo)
      setSaving(true)

      const validationError = validateCourse()
      if (validationError) {
        toast.error(validationError)
        console.log(validationError)
        return
      }

      // Additional validation for publishing
      if (curriculum.length === 0 || !curriculum[0].title.trim()) {
        toast.error("At least one section is required for publishing")
        console.log("At least one section is required for publishing")

        return
      }
      return

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

 
// if (loading) return <div className="">
//   <Navigation/>
//   <Myloading/>
// </div>



  return (
    <div className="min-h-screen bg-background dark:bg-slate-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-row justify-around">
            <div className="">
              <h1 className="text-3xl font-bold mb-2 dark:text-white">
                {language === "am" ? "አዲስ ኮርስ ፍጠር" : "Edit Course"}
              </h1>
              <p className="text-muted-foreground dark:text-slate-400">
                {language === "am" ? "ተማሪዎችን ለማስተማር አዲስ ኮርስ ይፍጠሩ" : "Edit course to teach students"}
              </p>
            </div>
            <div className={`p-3 ${loading?'block':'hidden'}`}>
              <Myloading2/>
            </div>
          </div>
          <div className="flex gap-2">
          <div className="flex flex-row p-2">
            <Badge>{courseData.status.toLocaleUpperCase()}</Badge>
          </div>
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
              <TabsList className="grid w-full grid-cols-5 dark:bg-slate-800 sticky top-20 z-20">
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
                              {/* <Input
                                placeholder={language === "am" ? "የክፍል ርዕስ (እንግሊዝኛ)" : "Section title (English)"}
                                value={section.title}
                                className="dark:bg-slate-800"
                                onChange={(e) => {
                                  const newCurriculum = [...curriculum]
                                  newCurriculum[sectionIndex].title = e.target.value
                                  setCurriculum(newCurriculum)
                                }}
                              /> */}
                              <p className="rounded-sm p-2 "><span className="text-slate-600">Section:</span> {section.title}</p>
                              {/* <Input
                                placeholder={language === "am" ? "የክፍል ርዕስ (አማርኛ)" : "Section title (Amharic)"}
                                value={section.titleAm} 
                                onChange={(e) => {
                                  const newCurriculum = [...curriculum]
                                  newCurriculum[sectionIndex].titleAm = e.target.value
                                  setCurriculum(newCurriculum)
                                }}
                                className="amharic dark:bg-slate-800"
                              /> */}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCurriculum(curriculum.filter((_, i) => i !== sectionIndex))
                                deleteSection(String(section.id))
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {section.lessons.map((lesson, lessonIndex) => 
                            (
                              <div key={lesson.id} className="border rounded-lg">

                                {lesson.retrived ? 
                                <>
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
                                    className="dark:bg-slate-800"
                                    disabled
                                  />
                                  <Input
                                    placeholder={language === "am" ? "የትምህርት ርዕስ (አማርኛ)" : "Lesson title (Amharic)"}
                                    value={lesson.titleAm}
                                    onChange={(e) => {
                                      const newCurriculum = [...curriculum]
                                      newCurriculum[sectionIndex].lessons[lessonIndex].titleAm = e.target.value
                                      setCurriculum(newCurriculum)
                                    }}
                                    className="dark:bg-slate-800 amharic"
                                    disabled
                                  />
                                </div>
                                <Select
                                  value={lesson.type}
                                  onValueChange={(value) => {
                                    const newCurriculum = [...curriculum]
                                    newCurriculum[sectionIndex].lessons[lessonIndex].type = value
                                    setCurriculum(newCurriculum)
                                  }}
                                  disabled
                                >
                                  <SelectTrigger className="w-32 dark:bg-slate-800">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="dark:bg-slate-800 text-white">
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
                                  className="w-24 dark:bg-slate-800"
                                  value={lesson.duration}
                                  onChange={(e) => {
                                    const newCurriculum = [...curriculum]
                                    newCurriculum[sectionIndex].lessons[lessonIndex].duration = e.target.value
                                    setCurriculum(newCurriculum)
                                  }}
                                  disabled
                                />
                                {/* free switch */}
                                {/* <div className="flex items-center gap-2">
                                  <Switch
                                    checked={lesson.free}
                                    onCheckedChange={(checked) => {
                                      const newCurriculum = [...curriculum]
                                      newCurriculum[sectionIndex].lessons[lessonIndex].free = checked
                                      setCurriculum(newCurriculum)
                                    }}
                                    disabled
                                  />
                                  <Label className="text-xs">{language === "am" ? "ነፃ" : "Free"}</Label>
                                </div> */}
                                <Button variant={"outline"} className="">
                                  <Edit/>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newCurriculum = [...curriculum]
                                    newCurriculum[sectionIndex].lessons = newCurriculum[sectionIndex].lessons.filter(
                                      (_, i) => i !== lessonIndex
                                    )
                                    // setCurriculum(newCurriculum)
                                    handleDeleteLesson(lesson._id,newCurriculum)
                                  }}
                                  disabled={loading}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                </div>
                                  <div className="p-2 ">
                                    {/* <Input type="file" 
                                    placeholder="pleeeeeee"
                                    className="dark:bg-slate-800"
                                  /> */}
                                    <p className="dark:bg-slate-800 rounded-sm p-2 pl-4">
                                      <span className="text-slate-500">File Chosen: </span>
                                      {lesson.file as unknown as string}
                                      </p>
                                  </div>
                                </>:
                                <>
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
                                    className="dark:bg-slate-800"
                                  />
                                  <Input
                                    placeholder={language === "am" ? "የትምህርት ርዕስ (አማርኛ)" : "Lesson title (Amharic)"}
                                    value={lesson.titleAm}
                                    onChange={(e) => {
                                      const newCurriculum = [...curriculum]
                                      newCurriculum[sectionIndex].lessons[lessonIndex].titleAm = e.target.value
                                      setCurriculum(newCurriculum)
                                    }}
                                    className="dark:bg-slate-800 amharic"
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
                                  <SelectTrigger className="w-32 dark:bg-slate-800">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="dark:bg-slate-800 text-white">
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
                                  className="w-24 dark:bg-slate-800"
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
                                  disabled={loading}
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
                                    // setFiles((p)=>{
                                    //   p[sectionIndex][lessonIndex]=e.target.files![0]
                                    //   return p
                                    // })
                                    const newCurriculum = [...curriculum]
                                    newCurriculum[sectionIndex].lessons[lessonIndex].file = e.target.files![0]
                                    setCurriculum(newCurriculum)
                                  }}
                                  className="dark:bg-slate-800"
                                  />
                                </div>
                                </>}
                              </div>
                            )
                            )}
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
                    <div className="flex flex-row gap-x-3">
                            <Input 
                            className=""
                            placeholder="Section Title"
                            value={newSection}
                            onChange={(e)=>{
                              setNewSection(e.target.value)
                              if(e.target.value.length >0){
                                setNewSectionbtn(false)
                              }else{
                                setNewSectionbtn(true)
                              }
                            }}

                            />

                          <Button type="button" variant="outline" onClick={addSection} className="w-full" disabled={newSectionbtn}>
                            <Plus className="mr-2 h-4 w-4" />
                            {language === "am" ? "አዲስ ክፍል ጨምር" : "Add New Section"}
                          </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing">
                <Card className="dark:bg-slate-900 dark:border-slate-700">
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
                      {/* <div className="space-y-2">
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
                      </div> */}
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
                <Card className="dark:bg-slate-900 dark:border-slate-700">
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
                    <div className="grid w-full gap-1.5">
                  <Label htmlFor="file">Course Thumbnail</Label>
                  <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 dark:bg-slate-800 dark:border-green-700/30"
                       onDrop={(e)=>{e.preventDefault();
                                const files = e.dataTransfer.files;
                                if (files && files[0]) {
                                  const file = files[0];
                                  setThumbnail(file);

                                  // Trigger the same validation as file input
                                  const extension = file.name.split(".").pop()?.toLowerCase();

                                  if (["jpg", "png", "jepg", "skp", "3dm"].includes(extension || "")) {
                                    setValidationError(null);
                                  } else {
                                    setThumbnail(null)
                                    setValidationError(
                                      "Unsupported file format. Please Upload image only."
                                    );
                                  }
                                }}}
                       onDragOver={(e)=>{e.preventDefault()}}
                       onClick={()=>document.getElementById("file-input")?.click()}>

                    {thumbnail ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{thumbnail.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(thumbnail.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation();setThumbnail(null)}}>
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 rounded-full bg-primary/10 p-3 ">
                          <Upload className="h-6 w-6" />
                        </div>
                        <p className="mb-2 text-sm font-medium">Drag and drop your Thumbnail here</p>
                        <p className="mb-4 text-xs text-muted-foreground">
                          Supports Image files only
                        </p>
                        <Label htmlFor="file" asChild>
                          <Button variant="outline" size="sm">
                            Browse Files 
                          </Button>
                        </Label>
                      </>
                    )}
                  </div>
                  <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept=".png,.jep,.jpeg,.gif,.bmp,.webp,.tiff,.tif,.heic,.svg"
                  onChange={(e)=>{
                    if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              setThumbnail(file);

                              // Auto-detect file type
                              const extension = file.name.split(".").pop()?.toLowerCase();

                              // Validate file
                              if (["png", "jpg", "jepg", "skp", "3dm"].includes(extension || "")) {
                                setValidationError(null);
                              } else {
                                setThumbnail(null)
                                setValidationError(
                                  "Unsupported file format. Please upload image only."
                                );
                              }
                            }
                  }}
                />
                  {validationError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                  )}
                    </div>

                    {/* Preview Video */}
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="file">Preview Video</Label>
                      <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 dark:bg-slate-800 dark:border-green-700/30"
                          onDrop={(e)=>{
                            e.preventDefault();
                            const files = e.dataTransfer.files;
                            if (files && files[0]) {
                              const file = files[0];
                              setThumbnail(file);

                              // Trigger the same validation as file input
                              const extension = file.name.split(".").pop()?.toLowerCase();

                              if (["jpg", "png", "jepg", "skp", "3dm"].includes(extension || "")) {
                                setValidationError2(null);
                              } else {
                                setPreviewVideo(null)
                                setValidationError2(
                                  "Unsupported file format. Please Upload image only."
                                );
                              }
                            }
                          }}
                          onDragOver={(e)=>{e.preventDefault();}}
                          onClick={()=>document.getElementById("file-inputpreview")?.click()}>

                        {previewVideo ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full bg-primary/10 p-2">
                              <FileText className="h-6 w-6" />
                            </div>
                            <div className="text-center">
                              <p className="font-medium">{previewVideo.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(previewVideo.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                            <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation();setPreviewVideo(null)}}>
                              Change File
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="mb-4 rounded-full bg-primary/10 p-3 ">
                              <Upload className="h-6 w-6" />
                            </div>
                            <p className="mb-2 text-sm font-medium">Drag and drop your Preview Video here</p>
                            <p className="mb-4 text-xs text-muted-foreground">
                              Supports Video files only
                            </p>
                            <Label htmlFor="file" asChild>
                              <Button variant="outline" size="sm">
                                Browse Files 
                              </Button>
                            </Label>
                          </>
                        )}
                      </div>
                      <input
                      id="file-inputpreview"
                      type="file"
                      accept=".mp4,.mov,.avi,.mkv,.wmv,.flv,.webm,.m4v"
                      className="hidden"
                      onChange={(e)=>{
                        if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setPreviewVideo(file);

                                // Auto-detect file type
                                const extension = file.name.split(".").pop()?.toLowerCase();

                                // Validate file
                                if (["mp4", "mov", "avi", "mkv", "wmv","flv","webm","m4v"].includes(extension || "")) {
                                  setValidationError2(null);
                                } else {
                                  setPreviewVideo(null)
                                  setValidationError2(
                                    "Unsupported file format. Please upload image only."
                                  );
                                }
                              }
                      }}
                    />
                      {validationError2 && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{validationError2}</AlertDescription>
                        </Alert>
                  )}
                    </div>


                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="dark:bg-slate-900 dark:border-slate-700">
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
                      className={`w-4 h-4 rounded-full ${thumbnail ? "bg-green-500" : "bg-muted dark:bg-slate-600"}`}
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
