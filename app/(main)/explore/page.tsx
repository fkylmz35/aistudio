"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { agents, agentTags, heroBanners, getAgentsByTag, type Agent } from "@/lib/agents"
import { useFavorites } from "@/contexts/favorites-context"
import { Search, Heart, ChevronLeft, ChevronRight, Coins, Sparkles, Zap, ArrowRight } from "lucide-react"
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
      <Header title="Agent Marketplace" />

      {/* Main content with noise texture background */}
      <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Background with noise texture */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-900"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Blur orbs for ambient effect */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-60 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 p-6 space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-8"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="text-white">Özelleştirilmiş AI </span>
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                Agent'ları
              </span>
              <span className="text-white"> Keşfedin</span>
            </h1>
          </motion.div>

          {/* Featured Banner Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="relative h-[200px] md:h-[240px]">
              <AnimatePresence mode="wait">
                {heroBanners.map((banner, index) => (
                  index === currentBanner && (
                    <motion.div
                      key={banner.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-2xl overflow-hidden border border-white/[0.08]"
                    >
                      {/* Background with gradient */}
                      <div className={cn("absolute inset-0 bg-gradient-to-br", banner.gradient)} />
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
                          backgroundSize: '16px 16px'
                        }}
                      />
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-10">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
                            {banner.title}
                          </h2>
                          <p className="text-zinc-400 text-sm md:text-base max-w-md mb-4">
                            {banner.description}
                          </p>
                          <Link
                            href={`/agents/${banner.agentSlug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors text-sm"
                          >
                            <Zap className="w-4 h-4" />
                            Hemen Dene
                            <ArrowRight className="w-4 h-4" />
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
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/70 border border-white/[0.08] flex items-center justify-center text-white hover:bg-black/90 hover:border-white/[0.15] transition-all duration-150 z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNextBanner}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/70 border border-white/[0.08] flex items-center justify-center text-white hover:bg-black/90 hover:border-white/[0.15] transition-all duration-150 z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {heroBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === currentBanner
                      ? "bg-white w-6"
                      : "bg-white/40 hover:bg-white/60 w-1.5"
                  )}
                />
              ))}
            </div>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Agent ara..."
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-900/80 border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all backdrop-blur-sm"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {agentTags.map((tag) => {
                const isNairooTag = tag === "Nairoo"
                const isSelected = selectedTag === tag

                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      isSelected
                        ? isNairooTag
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/25"
                          : "bg-white text-black"
                        : isNairooTag
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/50"
                          : "bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-white/[0.08]"
                    )}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Nairoo Models Section */}
          {filteredAgents.filter(a => a.isNairooModel).length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h2 className="text-base font-semibold text-amber-400">Nairoo Modelleri</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAgents.filter(a => a.isNairooModel).map((agent, index) => (
                  <AgentCard
                    key={agent.slug}
                    agent={agent}
                    index={index}
                    isFavorite={isFavorite(agent.slug)}
                    onFavoriteClick={handleFavoriteClick}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Other Models Section */}
          {filteredAgents.filter(a => !a.isNairooModel).length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-zinc-400">Diğer Modeller</h2>
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAgents.filter(a => !a.isNairooModel).map((agent, index) => (
                  <AgentCard
                    key={agent.slug}
                    agent={agent}
                    index={index}
                    isFavorite={isFavorite(agent.slug)}
                    onFavoriteClick={handleFavoriteClick}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {filteredAgents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-zinc-600" />
              </div>
              <p className="text-zinc-500">Aramanızla eşleşen agent bulunamadı.</p>
            </motion.div>
          )}
        </div>
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
      className="h-full"
    >
      <Link href={`/agents/${agent.slug}`} className="block h-full">
        <div className={cn(
          "group relative rounded-2xl transition-all duration-300 h-full min-h-[280px] overflow-hidden",
          "bg-zinc-900/50 border border-white/[0.08]",
          "hover:border-white/[0.2] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40",
          !agent.isActive && "opacity-60"
        )}>
          {/* Full Background Thumbnail */}
          {agent.thumbnail && (
            <>
              <img
                src={agent.thumbnail}
                alt={agent.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay - Dark at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </>
          )}

          {/* Status Badge & Favorite - Top Right */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {!agent.isActive && (
              <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-zinc-300 text-xs font-medium border border-white/[0.1]">
                Yakında
              </span>
            )}
            <button
              onClick={(e) => onFavoriteClick(e, agent.slug)}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 backdrop-blur-sm",
                isFavorite
                  ? "bg-red-500/30 text-red-400 border border-red-500/40"
                  : "bg-black/50 text-zinc-400 hover:bg-black/70 hover:text-white border border-white/[0.1]"
              )}
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </button>
          </div>

          {/* Content - Positioned at bottom */}
          <div className="absolute inset-x-0 bottom-0 p-5 z-10">
            {/* Name */}
            <h3 className="text-lg font-semibold text-white mb-1.5 group-hover:text-white transition-colors drop-shadow-lg">
              {agent.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-zinc-300 mb-3 line-clamp-2 group-hover:text-zinc-200 transition-colors drop-shadow-md">
              {agent.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {agent.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "px-2 py-0.5 rounded-md text-xs backdrop-blur-sm",
                    tag === "Nairoo"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-white/10 text-zinc-300 border border-white/[0.1]"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Credit Cost */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.1]">
              <div className="flex items-center gap-1.5 text-sm">
                <Coins className="w-4 h-4 text-amber-400" />
                <span className="text-zinc-300">
                  <span className="text-white font-medium">{agent.creditCost}</span> kredi/işlem
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
