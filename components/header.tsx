"use client"

import Link from "next/link"
import { Bell, Coins } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useCredits } from "@/contexts/credits-context"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth()
  const { credits, isLoading: isCreditsLoading } = useCredits()

  // Get user avatar or initials
  const avatarUrl = user?.user_metadata?.avatar_url
  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"
  const initials = userName.slice(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-8 bg-background/80 backdrop-blur-xl border-b border-border">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-foreground"
      >
        {title}
      </motion.h1>

      <div className="flex items-center gap-3">
        {/* Credits Display */}
        {user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20"
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">
              {isCreditsLoading ? "..." : credits.toLocaleString("tr-TR")}
            </span>
          </motion.div>
        )}

        <button className="relative p-2.5 rounded-lg hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
        <Link href="/profile" className="relative ml-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-surface overflow-hidden flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl || "/placeholder.svg"} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-medium text-white">{initials}</span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </header>
  )
}
