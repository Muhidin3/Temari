"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Users, BookOpen } from "lucide-react"
import { useLang } from "@/contexts/LanguageContext"
export default function ContactPage() {
  const {language} = useLang()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      titleAm: "ኢሜል",
      value: "support@abuki.et",
      description: "Send us an email anytime",
      descriptionAm: "በማንኛውም ጊዜ ኢሜል ይላኩልን",
    },
    {
      icon: Phone,
      title: "Phone",
      titleAm: "ስልክ",
      value: "+251 11 123 4567",
      description: "Call us during business hours",
      descriptionAm: "በስራ ሰዓት ውስጥ ይደውሉልን",
    },
    {
      icon: MapPin,
      title: "Address",
      titleAm: "አድራሻ",
      value: "Addis Ababa, Ethiopia",
      description: "Visit our office",
      descriptionAm: "ቢሮአችንን ይጎብኙ",
    },
    {
      icon: Clock,
      title: "Business Hours",
      titleAm: "የስራ ሰዓት",
      value: "Mon - Fri: 9AM - 6PM",
      description: "Ethiopian Time (EAT)",
      descriptionAm: "የኢትዮጵያ ሰዓት",
    },
  ]

  const categories = [
    { value: "general", label: "General Inquiry", labelAm: "አጠቃላይ ጥያቄ" },
    { value: "technical", label: "Technical Support", labelAm: "ቴክኒካል ድጋፍ" },
    { value: "billing", label: "Billing & Payments", labelAm: "ክፍያ እና ሂሳብ" },
    { value: "course", label: "Course Related", labelAm: "ኮርስ ተዛማጅ" },
    { value: "instructor", label: "Instructor Support", labelAm: "የአስተማሪ ድጋፍ" },
    { value: "partnership", label: "Partnership", labelAm: "አጋርነት" },
  ]

  const faqs = [
    {
      question: "How do I enroll in a course?",
      questionAm: "እንዴት በኮርስ ውስጥ እመዝገባለሁ?",
      answer:
        "Simply browse our course catalog, select a course, and click 'Enroll Now'. You'll be guided through the payment process.",
      answerAm: "የኮርስ ካታሎጋችንን ይመልከቱ፣ ኮርስ ይምረጡ እና 'አሁን ይመዝገቡ' የሚለውን ይጫኑ። በክፍያ ሂደት ውስጥ መመሪያ ይሰጥዎታል።",
    },
    {
      question: "What payment methods do you accept?",
      questionAm: "ምን አይነት የክፍያ ዘዴዎችን ትቀበላላችሁ?",
      answer: "We accept TeleBirr, CBE Birr, bank transfers, and major credit cards.",
      answerAm: "ቴሌ ብር፣ ሲቢኢ ብር፣ የባንክ ዝውውር እና ዋና ዋና ክሬዲት ካርዶችን እንቀበላለን።",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      questionAm: "ካልረካሁ ገንዘቤን መመለስ እችላለሁ?",
      answer: "Yes, we offer a 30-day money-back guarantee for all courses.",
      answerAm: "አዎ፣ ለሁሉም ኮርሶች የ30 ቀን የገንዘብ መመለሻ ዋስትና እንሰጣለን።",
    },
    {
      question: "How do I become an instructor?",
      questionAm: "እንዴት አስተማሪ እሆናለሁ?",
      answer: "Apply through our instructor application form. We'll review your qualifications and get back to you.",
      answerAm: "በአስተማሪ ማመልከቻ ቅጻችን ያመልክቱ። ብቃትዎን እንገመግማለን እና ምላሽ እንሰጥዎታለን።",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-abuki-light via-white to-abuki-light/50 py-20 dark:from-slate-900 dark:bg-gradient-to-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center ">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {language === "am" ? (
                <span className="amharic">
                  እኛን <span className="text-abuki-primary">ያግኙን</span>
                </span>
              ) : (
                <>
                  Get in <span className="text-abuki-primary">Touch</span>
                </>
              )}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {language === "am"
                ? "ጥያቄዎች አሉዎት? እርዳታ ይፈልጋሉ? የእኛ ቡድን እርስዎን ለመርዳት እዚህ አለ። በማንኛውም ጊዜ ያግኙን።"
                : "Have questions? Need help? Our team is here to assist you. Reach out to us anytime."}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="dark:bg-slate-900 dark:text-white">
              <CardHeader>
                <CardTitle className="text-2xl">{language === "am" ? "መልዕክት ይላኩ" : "Send us a Message"}</CardTitle>
                <CardDescription>
                  {language === "am"
                    ? "ቅጹን ይሙሉ እና በ24 ሰዣት ውስጥ ምላሽ እንሰጥዎታለን"
                    : "Fill out the form and we'll get back to you within 24 hours"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{language === "am" ? "ሙሉ ስም" : "Full Name"}</Label>
                      <Input
                        id="name"
                        placeholder={language === "am" ? "ስምዎን ያስገቡ" : "Enter your name"}
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{language === "am" ? "ኢሜል አድራሻ" : "Email Address"}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={language === "am" ? "ኢሜልዎን ያስገቡ" : "Enter your email"}
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{language === "am" ? "ስልክ ቁጥር" : "Phone Number"}</Label>
                      <Input
                        id="phone"
                        placeholder={language === "am" ? "ስልክ ቁጥርዎን ያስገቡ" : "Enter your phone number"}
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">{language === "am" ? "ምድብ" : "Category"}</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === "am" ? "ምድብ ይምረጡ" : "Select a category"} />
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{language === "am" ? "ርዕስ" : "Subject"}</Label>
                    <Input
                      id="subject"
                      placeholder={language === "am" ? "የመልዕክትዎ ርዕስ" : "Subject of your message"}
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{language === "am" ? "መልዕክት" : "Message"}</Label>
                    <Textarea
                      id="message"
                      placeholder={language === "am" ? "መልዕክትዎን እዚህ ይጻፉ..." : "Write your message here..."}
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-abuki-primary hover:bg-abuki-accent">
                    <Send className="mr-2 h-4 w-4" />
                    {language === "am" ? "መልዕክት ላክ" : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="dark:bg-slate-900 dark:text-white">
              <CardHeader>
                <CardTitle>{language === "am" ? "የመገናኛ መረጃ" : "Contact Information"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 ">
                    <div className="w-12 h-12 bg-abuki-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-abuki-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{language === "am" ? info.titleAm : info.title}</h3>
                      <p className="text-abuki-primary font-medium mb-1">{info.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === "am" ? info.descriptionAm : info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="dark:bg-slate-900 dark:text-white">
              <CardHeader>
                <CardTitle>{language === "am" ? "ሌሎች መንገዶች" : "Other Ways to Reach Us"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <MessageCircle className="h-5 w-5 text-abuki-primary" />
                  <div>
                    <p className="font-medium">{language === "am" ? "ቴሌግራም" : "Telegram"}</p>
                    <p className="text-sm text-muted-foreground">@AbukiSupport</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <HelpCircle className="h-5 w-5 text-abuki-primary" />
                  <div>
                    <p className="font-medium">{language === "am" ? "እርዳታ ማዕከል" : "Help Center"}</p>
                    <p className="text-sm text-muted-foreground">help.abuki.et</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <Users className="h-5 w-5 text-abuki-primary" />
                  <div>
                    <p className="font-medium">{language === "am" ? "ማህበረሰብ" : "Community"}</p>
                    <p className="text-sm text-muted-foreground">community.abuki.et</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12 ">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "am" ? "ተደጋጋሚ ጥያቄዎች" : "Frequently Asked Questions"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "am"
                ? "በተደጋጋሚ የሚጠየቁ ጥያቄዎች እና መልሶች"
                : "Common questions and answers to help you get started"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto ">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow dark:bg-slate-900 dark:text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{language === "am" ? faq.questionAm : faq.question}</h3>
                  <p className="text-muted-foreground">{language === "am" ? faq.answerAm : faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-abuki-primary to-abuki-accent text-white border-0">
            <CardContent className="p-12">
              <BookOpen className="h-16 w-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">{language === "am" ? "ዛሬ ጀምሩ!" : "Start Learning Today!"}</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {language === "am"
                  ? "በሺዎች የሚቆጠሩ ኮርሶች ውስጥ ይምረጡ እና የወደፊት ስራዎን ይገንቡ"
                  : "Choose from thousands of courses and build your future career"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-abuki-primary hover:bg-gray-100">
                  {language === "am" ? "ኮርሶችን ይመልከቱ" : "Browse Courses"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-abuki-primary bg-transparent"
                >
                  {language === "am" ? "ነፃ መለያ ይፍጠሩ" : "Create Free Account"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
