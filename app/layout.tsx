import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { NotificationProvider } from "@/contexts/notification-context"

// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abuki - Ethiopian Learning Platform",
  description: "Learn and grow with Ethiopia's premier online learning platform",
    // generator: 'v0.app'
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
        <NotificationProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <AuthProvider>
                  {children}
                <Toaster />
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}
