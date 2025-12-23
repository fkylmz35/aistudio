"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { agents, agentTags, heroBanners, getAgentsByTag, getNairooAgents, getOtherAgents, type Agent } from "@/lib/agents"
import { useFavorites } from "@/contexts/favorites-context"
import { Search, Heart, ChevronLeft, ChevronRight, Coins } from "lucide-react"
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
        <div className="relative overflow-hidden rounded-xl">
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
                    className="absolute inset-0 rounded-xl overflow-hidden border border-white/[0.08]"
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${banner.image})` }}
                    />
                    {/* Fallback Gradient */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br -z-10", banner.gradient)} />
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
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
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                        >
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/70 border border-white/[0.08] flex items-center justify-center text-white hover:bg-black/90 hover:border-white/[0.15] transition-all duration-150 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/70 border border-white/[0.08] flex items-center justify-center text-white hover:bg-black/90 hover:border-white/[0.15] transition-all duration-150 z-20"
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
              className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-colors"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {agentTags.map((tag) => {
              const isNairooTag = tag === "Nairoo"
              const isSelected = selectedTag === tag

              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                    isSelected
                      ? isNairooTag
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/25"
                        : "bg-white text-black"
                      : isNairooTag
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/50"
                        : "bg-white/[0.08] text-zinc-400 hover:bg-white/[0.12] hover:text-white border border-white/[0.08]"
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* Nairoo Models Section */}
        {filteredAgents.filter(a => a.isNairooModel).length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
                <h2 className="text-lg font-semibold text-amber-400">Nairoo Modelleri</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredAgents.filter(a => a.isNairooModel).map((agent, index) => (
                <AgentCard
                  key={agent.slug}
                  agent={agent}
                  index={index}
                  isFavorite={isFavorite(agent.slug)}
                  onFavoriteClick={handleFavoriteClick}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* Other Models Section */}
        {filteredAgents.filter(a => !a.isNairooModel).length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-zinc-400">Diğer Modeller</h2>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredAgents.filter(a => !a.isNairooModel).map((agent, index) => (
                <AgentCard
                  key={agent.slug}
                  agent={agent}
                  index={index}
                  isFavorite={isFavorite(agent.slug)}
                  onFavoriteClick={handleFavoriteClick}
                />
              ))}
            </motion.div>
          </div>
        )}

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
          "group relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-150 ease-out",
          "border border-white/[0.08] shadow-sm",
          "hover:border-white/[0.15] hover:-translate-y-0.5 hover:shadow-lg",
          !agent.isActive && "opacity-60"
        )}>
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(/agents/${agent.slug}.jpg)` }}
          />

          {/* Fallback Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 -z-10" />

          {/* Gradient Overlay - Bottom to Top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          {/* Status Badge & Favorite - Top Right */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            {!agent.isActive && (
              <span className="px-2 py-1 rounded-lg bg-black/60 text-zinc-300 text-xs font-medium border border-white/[0.1]">
                Yakında
              </span>
            )}
            <button
              onClick={(e) => onFavoriteClick(e, agent.slug)}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150",
                isFavorite
                  ? "bg-red-500/30 text-red-400 border border-red-500/30"
                  : "bg-black/50 text-white/70 hover:bg-black/70 hover:text-white border border-white/[0.1]"
              )}
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </button>
          </div>

          {/* Content - Bottom with Gradient Background */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            {/* Name */}
            <h3 className="text-lg font-semibold text-white mb-1.5 drop-shadow-lg">
              {agent.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-zinc-300 mb-3 line-clamp-2 group-hover:text-white transition-colors">
              {agent.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {agent.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "px-2 py-0.5 rounded text-xs",
                    tag === "Nairoo"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-white/10 text-zinc-300 border border-white/[0.08]"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Credit Cost */}
            <div className="flex items-center gap-1.5 text-sm">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-zinc-300">
                <span className="text-white font-medium">{agent.creditCost}</span> kredi/işlem
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
