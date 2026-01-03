import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { PendingImagesProvider } from "@/contexts/pending-images-context"
import { CreditsProvider } from "@/contexts/credits-context"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://nairoo.com"),
  title: {
    default: "Nairoo AI Studio - Yapay Zeka ile Görsel Oluştur",
    template: "%s | Nairoo AI Studio"
  },
  description: "Nairoo AI Studio ile yapay zeka destekli profesyonel görseller ve videolar oluşturun. Ücretsiz 40 kredi ile hemen başlayın.",
  keywords: [
    "AI görsel oluşturma",
    "yapay zeka görsel",
    "AI image generator",
    "görsel üretimi",
    "AI video oluşturma",
    "yapay zeka studio",
    "text to image",
    "Türkçe AI",
    "görsel tasarım",
    "AI sanat",
    "nairoo"
  ],
  authors: [{ name: "Nairoo" }],
  creator: "Nairoo",
  publisher: "Nairoo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://nairoo.com",
    siteName: "Nairoo AI Studio",
    title: "Nairoo AI Studio - Yapay Zeka ile Görsel Oluştur",
    description: "Nairoo AI Studio ile yapay zeka destekli profesyonel görseller ve videolar oluşturun. Ücretsiz 40 kredi ile hemen başlayın.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nairoo AI Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nairoo AI Studio - Yapay Zeka ile Görsel Oluştur",
    description: "Nairoo AI Studio ile yapay zeka destekli profesyonel görseller ve videolar oluşturun.",
    images: ["/og-image.png"],
    creator: "@nairoo",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://nairoo.com",
  },
  category: "technology",
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
