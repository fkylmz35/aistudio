"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, Search, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryCardProps {
  image: string
  username: string
  likes?: number
  isLiked?: boolean
  aspectRatio?: "portrait" | "landscape" | "square"
}

export function GalleryCard({
  image,
  username,
  likes = 0,
  isLiked = false,
  aspectRatio = "portrait",
}: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [liked, setLiked] = useState(isLiked)

  const aspectClasses = {
    portrait: "aspect-[2/3]",
    landscape: "aspect-[3/2]",
    square: "aspect-square",
  }

  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-xl cursor-pointer group", aspectClasses[aspectRatio])}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image || "/placeholder.svg"} alt={`Created by ${username}`} className="w-full h-full object-cover" />

      {/* Hover Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between"
      >
        <span className="text-sm font-medium text-foreground">@{username}</span>

        <div className="flex items-center gap-2">
          <ActionButton icon={Eye} />
          <ActionButton icon={Search} />
          <ActionButton icon={Heart} isActive={liked} onClick={() => setLiked(!liked)} />
        </div>
      </motion.div>
    </motion.div>
  )
}

function ActionButton({
  icon: Icon,
  isActive,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors",
        isActive ? "bg-white/30 text-white" : "bg-black/50 text-foreground hover:bg-white/20",
      )}
    >
      <Icon className={cn("w-4 h-4", isActive && "fill-white")} />
    </button>
  )
}
