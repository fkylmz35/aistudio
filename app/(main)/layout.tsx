"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { FavoritesProvider } from "@/contexts/favorites-context"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="md:pl-[72px] pb-20 md:pb-6">{children}</main>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </FavoritesProvider>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
