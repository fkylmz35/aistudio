import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { PendingImagesProvider } from "@/contexts/pending-images-context"
import { CreditsProvider } from "@/contexts/credits-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mira AI Studio - Yapay Zeka ile Görsel Oluştur",
  description: "Profesyonel AI içerik üretim platformu - görsel ve video oluşturma",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className="font-sans antialiased">
        <AuthProvider>
          <CreditsProvider>
            <PendingImagesProvider>{children}</PendingImagesProvider>
          </CreditsProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
