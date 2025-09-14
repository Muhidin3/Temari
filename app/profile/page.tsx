"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import { User, Mail, Phone, MapPin, Calendar, Camera, Bell, Shield, CreditCard, Globe, Eye, EyeOff, Trash2, Download, Settings, Edit } from 'lucide-react'
import Afetch from "@/lib/Afetch"
import Link from "next/link"

export default function ProfilePage() {
  const [language] = useState("en")
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  })
  const [edit,setEdit] = useState(false)

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    location: "Addis Ababa, Ethiopia",
    website: "https://johndoe.com",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    birthDate: "1990-05-15",
    gender: "male",
    language: "en",
    timezone: "Africa/Addis_Ababa",
    role:'Student'
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (type: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [type]: value }))
  }
useEffect(()=>{
   (async()=>{
      const user=await Afetch('/api/profile').then(async(d)=>(await d.json()).data)
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName, 
        email: user.email,
        phone: user.phone || "",
        bio: user.bio || "",
        location: "Addis Ababa, Ethiopia",
        website: "https://johndoe.com",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
        birthDate: "1990-05-15",
        gender: "male",
        language: "en",
        timezone: "Africa/Addis_Ababa",
        role:user.role
      })
   })()
},[edit])


const handleSave= async()=>{
  const res = await Afetch('/api/profile',{method:'PUT',body:JSON.stringify(profile)}).then(async(a)=>await a.json())
}
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-row justify-between">
          <div className="">
            <h1 className="text-3xl font-bold mb-2">{language === "am" ? "የእኔ መገለጫ" : "My Profile"}</h1>
            <p className="text-muted-foreground">
              {language === "am" ? "የመገለጫ መረጃዎን እና ቅንብሮችዎን ያስተዳድሩ" : "Manage your profile information and settings"}
            </p>
          </div>
            <Button onClick={()=>setEdit(p=>!p)} className="mr-10 mt-5" disabled={edit}><Edit/> Edit</Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
         {!edit&&<div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-abuki-primary hover:bg-abuki-accent"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-semibold text-lg mb-1">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{profile.email}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">{profile.role}</Badge>
                  <Badge variant="outline">{language === "am" ? "ንቁ" : "Active"}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">{language === "am" ? "የመገለጫ ስታቲስቲክስ" : "Profile Stats"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {language === "am" ? "የተመዘገቡ ኮርሶች" : "Courses Enrolled"}
                  </span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {language === "am" ? "የተጠናቀቁ ኮርሶች" : "Courses Completed"}
                  </span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {language === "am" ? "ሰርተፊኬቶች" : "Certificates"}
                  </span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {language === "am" ? "የትምህርት ሰዓቶች" : "Learning Hours"}
                  </span>
                  <span className="font-medium">61</span>
                </div>
              </CardContent>
            </Card>
          </div>}

          {/* Main Content */}
          {edit && <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal">{language === "am" ? "ግላዊ" : "Personal"}</TabsTrigger>
                <TabsTrigger value="account">{language === "am" ? "መለያ" : "Account"}</TabsTrigger>
                <TabsTrigger value="notifications">{language === "am" ? "ማሳወቂያዎች" : "Notifications"}</TabsTrigger>
                <TabsTrigger value="privacy">{language === "am" ? "ግላዊነት" : "Privacy"}</TabsTrigger>
                <TabsTrigger value="billing">{language === "am" ? "ክፍያ" : "Billing"}</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "ግላዊ መረጃ" : "Personal Information"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "የመገለጫ መረጃዎን ያዘምኑ" : "Update your profile information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{language === "am" ? "የመጀመሪያ ስም" : "First Name"}</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{language === "am" ? "የአባት ስም" : "Last Name"}</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">{language === "am" ? "ስለ እኔ" : "Bio"}</Label>
                      <Textarea
                        id="bio"
                        placeholder={
                          language === "am" ? "ስለ እራስዎ ይንገሩን..." : "Tell us about yourself..."
                        }
                        value={profile.bio}
                        onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{language === "am" ? "ስልክ ቁጥር" : "Phone Number"}</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="phone"
                            className="pl-10"
                            value={profile.phone}
                            onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">{language === "am" ? "አድራሻ" : "Location"}</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="location"
                            className="pl-10"
                            value={profile.location}
                            onChange={(e) => handleProfileUpdate("location", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">{language === "am" ? "የልደት ቀን" : "Birth Date"}</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="birthDate"
                            type="date"
                            className="pl-10"
                            value={profile.birthDate}
                            onChange={(e) => handleProfileUpdate("birthDate", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">{language === "am" ? "ዌብሳይት" : "Website"}</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="website"
                            className="pl-10"
                            value={profile.website}
                            onChange={(e) => handleProfileUpdate("website", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end gap-4">
                      <Button variant="outline" >{language === "am" ? "ሰርዝ" : "Cancel"}</Button>
                      <Button className="bg-abuki-primary hover:bg-abuki-accent" onClick={()=>{handleSave();setEdit(false)}}>
                        {language === "am" ? "ለውጦችን አስቀምጥ" : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "የመለያ ቅንብሮች" : "Account Settings"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "የመለያ ደህንነት እና ቅንብሮች" : "Manage your account security and preferences"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">{language === "am" ? "ኢሜል አድራሻ" : "Email Address"}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={profile.email}
                          onChange={(e) => handleProfileUpdate("email", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">{language === "am" ? "የአሁኑ የይለፍ ቃል" : "Current Password"}</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">{language === "am" ? "አዲስ የይለፍ ቃል" : "New Password"}</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">{language === "am" ? "የይለፍ ቃል ያረጋግጡ" : "Confirm Password"}</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{language === "am" ? "የመለያ ድርጊቶች" : "Account Actions"}</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          {language === "am" ? "የእኔን ዳታ አውርድ" : "Download My Data"}
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                          <Trash2 className="mr-2 h-4 w-4" />
                          {language === "am" ? "መለያ ሰርዝ" : "Delete Account"}
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end gap-4">
                      <Button variant="outline">{language === "am" ? "ሰርዝ" : "Cancel"}</Button>
                      <Button className="bg-abuki-primary hover:bg-abuki-accent">
                        {language === "am" ? "ለውጦችን አስቀምጥ" : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "ማሳወቂያ ቅንብሮች" : "Notification Settings"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "እንዴት ማሳወቂያዎችን መቀበል እንደሚፈልጉ ይምረጡ" : "Choose how you want to receive notifications"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "ኢሜል ማሳወቂያዎች" : "Email Notifications"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "ስለ ኮርስ ዝማኔዎች እና መልዕክቶች" : "About course updates and messages"}
                          </p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(value) => handleNotificationChange("email", value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "ፑሽ ማሳወቂያዎች" : "Push Notifications"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "በመሳሪያዎ ላይ ቅጽበታዊ ማሳወቂያዎች" : "Instant notifications on your device"}
                          </p>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(value) => handleNotificationChange("push", value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "SMS ማሳወቂያዎች" : "SMS Notifications"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "አስፈላጊ ዝማኔዎች በSMS" : "Important updates via SMS"}
                          </p>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(value) => handleNotificationChange("sms", value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "የማርኬቲንግ ኢሜሎች" : "Marketing Emails"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "ስለ አዲስ ኮርሶች እና ቅናሾች" : "About new courses and promotions"}
                          </p>
                        </div>
                        <Switch
                          checked={notifications.marketing}
                          onCheckedChange={(value) => handleNotificationChange("marketing", value)}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end gap-4">
                      <Button variant="outline">{language === "am" ? "ሰርዝ" : "Cancel"}</Button>
                      <Button className="bg-abuki-primary hover:bg-abuki-accent">
                        {language === "am" ? "ለውጦችን አስቀምጥ" : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "ግላዊነት ቅንብሮች" : "Privacy Settings"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "የመገለጫዎ ታይነት እና ግላዊነት ይቆጣጠሩ" : "Control your profile visibility and privacy"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "የመገለጫ ታይነት" : "Profile Visibility"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "ሌሎች ተማሪዎች መገለጫዎን ማየት ይችላሉ" : "Other students can view your profile"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "የትምህርት እድገት" : "Learning Progress"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "የእድገት መረጃ ለሌሎች ይታይ" : "Show progress information to others"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "የመገለጫ ፎቶ" : "Profile Photo"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "ፎቶዎ በኮርሶች ውስጥ ይታይ" : "Show your photo in courses"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{language === "am" ? "የመገለጫ ስታቲስቲክስ" : "Profile Statistics"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {language === "am" ? "የኮርስ እና ሰርተፊኬት ቁጥሮች" : "Course and certificate counts"}
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end gap-4">
                      <Button variant="outline">{language === "am" ? "ሰርዝ" : "Cancel"}</Button>
                      <Button className="bg-abuki-primary hover:bg-abuki-accent">
                        {language === "am" ? "ለውጦችን አስቀምጥ" : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "am" ? "የክፍያ መረጃ" : "Billing Information"}</CardTitle>
                    <CardDescription>
                      {language === "am" ? "የክፍያ ዘዴዎች እና ታሪክ" : "Payment methods and billing history"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{language === "am" ? "የክፍያ ዘዴዎች" : "Payment Methods"}</h3>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                            <div>
                              <p className="font-medium">TeleBirr</p>
                              <p className="text-sm text-muted-foreground">**** **** **** 1234</p>
                            </div>
                          </div>
                          <Badge variant="secondary">{language === "am" ? "ዋና" : "Primary"}</Badge>
                        </div>
                      </Card>
                      <Button variant="outline" className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        {language === "am" ? "አዲስ የክፍያ ዘዴ ጨምር" : "Add Payment Method"}
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{language === "am" ? "የክፍያ ታሪክ" : "Billing History"}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Digital Marketing Mastery</p>
                            <p className="text-sm text-muted-foreground">2024-01-10</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">1,800 ETB</p>
                            <Badge variant="outline" className="text-xs">
                              {language === "am" ? "ተከፍሏል" : "Paid"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Complete Web Development Bootcamp</p>
                            <p className="text-sm text-muted-foreground">2024-01-05</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">2,500 ETB</p>
                            <Badge variant="outline" className="text-xs">
                              {language === "am" ? "ተከፍሏል" : "Paid"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end gap-4">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        {language === "am" ? "ደረሰኞች አውርድ" : "Download Receipts"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>}
        </div>
      </div>
    </div>
  )
}
