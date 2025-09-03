"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Users, BookOpen, Award, Globe, Heart, Zap, TrendingUp, CheckCircle } from "lucide-react"
import { useLang } from "@/contexts/LanguageContext"
export default function AboutPage() {
  const {language} = useLang()

  const stats = [
    {
      number: "50,000+",
      label: "Students",
      labelAm: "ተማሪዎች",
      icon: Users,
    },
    {
      number: "3,000+",
      label: "Courses",
      labelAm: "ኮርሶች",
      icon: BookOpen,
    },
    {
      number: "500+",
      label: "Instructors",
      labelAm: "አስተማሪዎች",
      icon: Award,
    },
    {
      number: "95%",
      label: "Success Rate",
      labelAm: "የስኬት መጠን",
      icon: TrendingUp,
    },
  ]

  const values = [
    {
      title: "Quality Education",
      titleAm: "ጥራት ያለው ትምህርት",
      description: "We provide world-class education tailored for Ethiopian learners",
      descriptionAm: "ለኢትዮጵያውያን ተማሪዎች የተዘጋጀ የዓለም ደረጃ ትምህርት እንሰጣለን",
      icon: Award,
      color: "text-blue-600",
    },
    {
      title: "Accessibility",
      titleAm: "ተደራሽነት",
      description: "Making quality education accessible to everyone, everywhere",
      descriptionAm: "ጥራት ያለው ትምህርት ለሁሉም ሰው፣ በየትም ቦታ ተደራሽ ማድረግ",
      icon: Globe,
      color: "text-green-600",
    },
    {
      title: "Innovation",
      titleAm: "ፈጠራ",
      description: "Using cutting-edge technology to enhance learning experiences",
      descriptionAm: "የትምህርት ልምዶችን ለማሻሻል ዘመናዊ ቴክኖሎጂ መጠቀም",
      icon: Zap,
      color: "text-purple-600",
    },
    {
      title: "Community",
      titleAm: "ማህበረሰብ",
      description: "Building a supportive learning community for all Ethiopians",
      descriptionAm: "ለሁሉም ኢትዮጵያውያን ደጋፊ የትምህርት ማህበረሰብ መገንባት",
      icon: Heart,
      color: "text-red-600",
    },
  ]

  const team = [
    {
      name: "Dr. Abebe Kebede",
      role: "Founder & CEO",
      roleAm: "መስራች እና ዋና ሥራ አስፈፃሚ",
      bio: "Former software engineer with 15+ years in education technology",
      bioAm: "በትምህርት ቴክኖሎጂ ላይ ከ15+ አመት ልምድ ያለው የቀድሞ ሶፍትዌር ኢንጂነር",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Hanan Mohammed",
      role: "Head of Education",
      roleAm: "የትምህርት ክፍል ኃላፊ",
      bio: "Educational expert specializing in curriculum development",
      bioAm: "በስርዓተ ትምህርት ማዳበር ላይ የተካነ የትምህርት ባለሙያ",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Meron Tadesse",
      role: "Head of Technology",
      roleAm: "የቴክኖሎጂ ክፍል ኃላፊ",
      bio: "Tech leader with expertise in scalable learning platforms",
      bioAm: "በሊሰፋ የሚችል የትምህርት መድረኮች ላይ ልምድ ያለው የቴክኖሎጂ መሪ",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Platform Launch",
      titleAm: "መድረክ ጅምር",
      description: "Abuki was founded with a vision to democratize education in Ethiopia",
      descriptionAm: "አቡኪ በኢትዮጵያ ትምህርትን ዲሞክራሲያዊ ለማድረግ በሚል ራዕይ ተመሠረተ",
    },
    {
      year: "2021",
      title: "10,000 Students",
      titleAm: "10,000 ተማሪዎች",
      description: "Reached our first major milestone of 10,000 active learners",
      descriptionAm: "የመጀመሪያ ዋና ዓላማችን የሆነውን 10,000 ንቁ ተማሪዎች ደረስን",
    },
    {
      year: "2022",
      title: "Mobile App Launch",
      titleAm: "የሞባይል አፕ ጅምር",
      description: "Launched mobile applications for iOS and Android platforms",
      descriptionAm: "ለiOS እና Android መድረኮች የሞባይል አፕሊኬሽኖችን አስጀመርን",
    },
    {
      year: "2023",
      title: "50,000 Students",
      titleAm: "50,000 ተማሪዎች",
      description: "Celebrated reaching 50,000 students across Ethiopia",
      descriptionAm: "በኢትዮጵያ ዙሪያ 50,000 ተማሪዎችን መድረሳችንን አከበርን",
    },
    {
      year: "2024",
      title: "AI Integration",
      titleAm: "AI ውህደት",
      description: "Integrated AI-powered personalized learning recommendations",
      descriptionAm: "በAI የሚንቀሳቀስ ግላዊ የትምህርት ምክሮችን አዋህደናል",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-abuki-light via-white to-abuki-light/50 py-20 dark:from-slate-950 dark:bg-gradient-to-b dark:to-abuki-primary">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-abuki-primary/10 text-abuki-primary border-abuki-primary/20 mb-6">
              {language === "am" ? "🇪🇹 ለኢትዮጵያ የተዘጋጀ" : "🇪🇹 Made for Ethiopia"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {language === "am" ? (
                <span className="amharic">
                  ስለ <span className="text-abuki-primary">አቡኪ</span>
                </span>
              ) : (
                <>
                  About <span className="text-abuki-primary">Abuki</span>
                </>
              )}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {language === "am"
                ? "አቡኪ የኢትዮጵያ ትምህርት ሥርዓትን ለመለወት እና ለሁሉም ሰው ጥራት ያለው ትምህርት ተደራሽ ለማድረግ የተዘጋጀ የመስመር ላይ የትምህርት መድረክ ነው።"
                : "Abuki is an online learning platform designed to transform Ethiopian education and make quality learning accessible to everyone, everywhere."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-abuki-primary hover:bg-abuki-accent">
                {language === "am" ? "ኮርሶችን ይመልከቱ" : "Explore Courses"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-abuki-primary text-abuki-primary hover:bg-abuki-light bg-transparent"
              >
                {language === "am" ? "እኛን ያግኙን" : "Contact Us"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-abuki-primary text-white">
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

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{language === "am" ? "የእኛ ተልእኮ" : "Our Mission"}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {language === "am"
                  ? "በኢትዮጵያ ውስጥ ለሁሉም ሰው ጥራት ያለው ትምህርት ተደራሽ ማድረግ። ዘመናዊ ቴክኖሎጂን በመጠቀም የትምህርት ልምዶችን ማሻሻል እና ተማሪዎች ክህሎታቸውን እንዲያሳድጉ እና ወደፊት ስራቸውን እንዲገነቡ መርዳት።"
                  : "To make quality education accessible to everyone in Ethiopia. We leverage modern technology to enhance learning experiences and help students develop their skills and build their future careers."}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-abuki-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{language === "am" ? "ተደራሽ ትምህርት" : "Accessible Education"}</h3>
                    <p className="text-muted-foreground">
                      {language === "am" ? "በየትም ቦታ፣ በማንኛውም ጊዜ ለመማር እድል" : "Opportunity to learn anywhere, anytime"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-abuki-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{language === "am" ? "የአካባቢ ይዘት" : "Local Content"}</h3>
                    <p className="text-muted-foreground">
                      {language === "am" ? "በኢትዮጵያ አውድ የተዘጋጁ ኮርሶች" : "Courses designed for Ethiopian context"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-abuki-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{language === "am" ? "ባለሙያ አስተማሪዎች" : "Expert Instructors"}</h3>
                    <p className="text-muted-foreground">
                      {language === "am" ? "ከኢትዮጵያ ምርጥ አስተማሪዎች ጋር ይማሩ" : "Learn from Ethiopia's best instructors"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Students learning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-abuki-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-abuki-secondary/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900 dark:via-abuki-primary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{language === "am" ? "የእኛ እሴቶች" : "Our Values"}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "am" ? "እነዚህ እሴቶች የእኛን ተልእኮ እና ራዕይ ይመራሉ" : "These values guide our mission and vision"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow dark:bg-slate-900 dark:text-white">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-muted`}>
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{language === "am" ? value.titleAm : value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {language === "am" ? value.descriptionAm : value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{language === "am" ? "የእኛ ጉዞ" : "Our Journey"}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "am"
                ? "ከመጀመሪያ ቀን ጀምሮ እስከ ዛሬ ድረስ የእኛ ዋና ዋና ስኬቶች"
                : "Key milestones from our founding to today"}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-abuki-primary rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && <div className="w-0.5 h-16 bg-abuki-primary/20 mt-4"></div>}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {language === "am" ? milestone.titleAm : milestone.title}
                      </h3>
                      <Badge variant="outline">{milestone.year}</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {language === "am" ? milestone.descriptionAm : milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{language === "am" ? "የእኛ ቡድን" : "Our Team"}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "am" ? "አቡኪን ወደ ስኬት የሚመሩ ባለሙያዎች" : "The experts driving Abuki's success"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-abuki-primary font-medium mb-3">
                    {language === "am" ? member.roleAm : member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">{language === "am" ? member.bioAm : member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-abuki-primary to-abuki-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "am" ? "ከእኛ ጋር ይቀላቀሉ" : "Join Our Mission"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {language === "am"
              ? "በኢትዮጵያ ትምህርት ለውጥ ላይ አካል ይሁኑ። ዛሬ ጀምሮ የወደፊት ስራዎን ይገንቡ።"
              : "Be part of the education transformation in Ethiopia. Start building your future career today."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-abuki-primary hover:bg-gray-100">
              {language === "am" ? "ተማሪ ይሁኑ" : "Become a Student"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-abuki-primary bg-transparent"
            >
              {language === "am" ? "አስተማሪ ይሁኑ" : "Become an Instructor"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
