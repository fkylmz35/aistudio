"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Compass, ImageIcon, Video, Sparkles, Film, Search, Command, LayoutGrid, Coins } from "lucide-react"
import { cn } from "@/lib/utils"

const mainNav = [
  { href: "/explore", label: "Keşfet", icon: Compass },
  { href: "/create/image", label: "Görsel Oluştur", icon: ImageIcon },
  { href: "/create/video", label: "Video Oluştur", icon: Video },
]

const agentsNav = [
  { href: "/agents/ugc-image", label: "UGC Görsel", icon: Sparkles },
  { href: "/agents/ugc-video", label: "UGC Video", icon: Film },
]

const libraryNav = [{ href: "/gallery", label: "Galeri", icon: LayoutGrid }]

const accountNav = [{ href: "/pricing", label: "Kredi Satın Al", icon: Coins }]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full z-50 flex flex-col bg-background border-r border-border"
      initial={{ width: 72 }}
      animate={{ width: isExpanded ? 240 : 72 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="h-16 flex items-center justify-center px-4 border-b border-border">
        <motion.div
          className="flex items-center gap-3"
          animate={{ justifyContent: isExpanded ? "flex-start" : "center" }}
        >
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" alt="Mira Logo" width={36} height={36} className="object-contain" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15, delay: 0.05 }}
                className="font-semibold text-lg text-foreground whitespace-nowrap"
              >
                Mira AI
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Search Button */}
      <div className="p-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border hover:bg-secondary/80 transition-colors">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, delay: 0.03 }}
                className="flex items-center justify-between flex-1"
              >
                <span className="text-sm text-muted-foreground">Ara</span>
                <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-background/50 rounded border border-border">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {mainNav.map((item, index) => (
          <NavItem
            key={item.href}
            {...item}
            isExpanded={isExpanded}
            isActive={pathname === item.href || (item.href !== "/explore" && pathname.startsWith(item.href))}
            delay={index * 0.03}
          />
        ))}

        {/* Agents Section */}
        <div className="pt-4 pb-2">
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Agents
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {agentsNav.map((item, index) => (
          <NavItem
            key={item.href}
            {...item}
            isExpanded={isExpanded}
            isActive={pathname === item.href}
            delay={(mainNav.length + index) * 0.03}
          />
        ))}

        {/* Library Section */}
        <div className="pt-4 pb-2">
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Kütüphane
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {libraryNav.map((item, index) => (
          <NavItem
            key={item.href}
            {...item}
            isExpanded={isExpanded}
            isActive={pathname === item.href}
            delay={(mainNav.length + agentsNav.length + index) * 0.03}
          />
        ))}

        {/* Account Section */}
        <div className="pt-4 pb-2">
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Hesap
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {accountNav.map((item, index) => (
          <NavItem
            key={item.href}
            {...item}
            isExpanded={isExpanded}
            isActive={pathname === item.href}
            delay={(mainNav.length + agentsNav.length + libraryNav.length + index) * 0.03}
          />
        ))}
      </nav>
    </motion.aside>
  )
}

function NavItem({
  href,
  label,
  icon: Icon,
  isExpanded,
  isActive,
  delay,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  isExpanded: boolean
  isActive: boolean
  delay: number
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150",
        isActive ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15, delay }}
            className="text-sm font-medium whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
}
