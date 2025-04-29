import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-provider"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hệ Thống Quản Lý Xe",
  description: "Hệ thống quản lý xe toàn diện",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-slate-50 p-4">{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
