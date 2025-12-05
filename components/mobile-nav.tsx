"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Compass, ImageIcon, Video, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/explore", label: "Keşfet", icon: Compass },
  { href: "/create/image", label: "Görsel", icon: ImageIcon },
  { href: "/create/video", label: "Video", icon: Video },
  { href: "/agents/ugc-image", label: "UGC", icon: Sparkles },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 p-2">
              <div className="relative">
                <item.icon
                  className={cn("w-6 h-6 transition-colors", isActive ? "text-foreground" : "text-muted-foreground")}
                />
                {isActive && (
                  <motion.div
                    layoutId="mobile-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground rounded-full"
                  />
                )}
              </div>
              <span className={cn("text-[10px] font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
