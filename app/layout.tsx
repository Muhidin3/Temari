import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
// import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/Footer"
import { Authprovider } from "@/contexts/AuthContext"
import { LangProvider } from "@/contexts/LanguageContext"

// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Temari - Ethiopian Learning Platform",
  description: "Learn new skills with courses designed for Ethiopians",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={inter.className}> */}
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Authprovider>
            <LangProvider>
              <Navigation/>
              {children}
              <Footer/>
              <Toaster />
            </LangProvider>
          </Authprovider>
        </ThemeProvider>
      </body>
    </html>
  )
}
