"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { agents, agentTags, heroBanners, getAgentsByTag, type Agent } from "@/lib/agents"
import { useFavorites } from "@/contexts/favorites-context"
import { Search, Heart, ChevronLeft, ChevronRight, Coins, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("Tümü")
  const [currentBanner, setCurrentBanner] = useState(0)
  const { isFavorite, toggleFavorite } = useFavorites()

  // Auto-rotate banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % heroBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Filter agents
  const filteredAgents = getAgentsByTag(selectedTag).filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFavoriteClick = useCallback((e: React.MouseEvent, slug: string) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(slug)
  }, [toggleFavorite])

  const goToPrevBanner = () => {
    setCurrentBanner(prev => (prev - 1 + heroBanners.length) % heroBanners.length)
  }

  const goToNextBanner = () => {
    setCurrentBanner(prev => (prev + 1) % heroBanners.length)
  }

  return (
    <>
      <Header title="Keşfet" />
      <div className="p-6 space-y-8">
        {/* Hero Banner Carousel */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative h-[280px] md:h-[320px]">
            <AnimatePresence mode="wait">
              {heroBanners.map((banner, index) => (
                index === currentBanner && (
                  <motion.div
                    key={banner.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "absolute inset-0 rounded-2xl overflow-hidden",
                      "bg-gradient-to-br",
                      banner.gradient,
                      "border border-white/10"
                    )}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                          {banner.title}
                        </h2>
                        <p className="text-zinc-400 text-sm md:text-base max-w-md mb-6">
                          {banner.description}
                        </p>
                        <Link
                          href={`/agents/${banner.agentSlug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors"
                        >
                          <Sparkles className="w-4 h-4" />
                          Dene
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentBanner
                    ? "bg-white w-6"
                    : "bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Agent ara..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {agentTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  selectedTag === tag
                    ? "bg-white text-black"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredAgents.map((agent, index) => (
            <AgentCard
              key={agent.slug}
              agent={agent}
              index={index}
              isFavorite={isFavorite(agent.slug)}
              onFavoriteClick={handleFavoriteClick}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500">Aramanızla eşleşen agent bulunamadı.</p>
          </div>
        )}
      </div>
    </>
  )
}

function AgentCard({
  agent,
  index,
  isFavorite,
  onFavoriteClick
}: {
  agent: Agent
  index: number
  isFavorite: boolean
  onFavoriteClick: (e: React.MouseEvent, slug: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/agents/${agent.slug}`}>
        <div className={cn(
          "group relative p-5 rounded-2xl border backdrop-blur-md transition-all duration-300",
          "bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent",
          "border-white/[0.05] hover:border-white/[0.15]",
          "hover:from-white/[0.07] hover:via-white/[0.04] hover:to-white/[0.01]",
          !agent.isActive && "opacity-60"
        )}>
          {/* Status Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {!agent.isActive && (
              <span className="px-2 py-1 rounded-full bg-zinc-500/20 text-zinc-400 text-xs font-medium border border-zinc-500/30">
                Yakında
              </span>
            )}
            <button
              onClick={(e) => onFavoriteClick(e, agent.slug)}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                isFavorite
                  ? "bg-red-500/20 text-red-400"
                  : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white"
              )}
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </button>
          </div>

          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-white/[0.08] transition-colors">
            <agent.icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors">
            {agent.name}
          </h3>
          <p className="text-sm text-zinc-500 mb-4 line-clamp-2 group-hover:text-zinc-400 transition-colors">
            {agent.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {agent.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/[0.05] text-zinc-500 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Credit Cost */}
          <div className="flex items-center gap-1.5 text-sm">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-zinc-400">
              <span className="text-white font-medium">{agent.creditCost}</span> kredi/işlem
            </span>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    </motion.div>
  )
}
