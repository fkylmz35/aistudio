"use client"

import { useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { agents, type Agent } from "@/lib/agents"
import { useFavorites } from "@/contexts/favorites-context"
import { Heart, Coins, HeartOff, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { AuthGuard } from "@/components/auth-guard"

export default function FavoritesPage() {
  const { user } = useAuth()
  const { favorites, isLoading, isFavorite, toggleFavorite } = useFavorites()

  const favoriteAgents = agents.filter(agent => favorites.includes(agent.slug))

  const handleFavoriteClick = useCallback((e: React.MouseEvent, slug: string) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(slug)
  }, [toggleFavorite])

  // Auth guard for non-authenticated users
  if (!user) {
    return (
      <>
        <Header title="Favoriler" />
        <AuthGuard
          title="Favorilerinizi Görmek İçin Giriş Yapın"
          description="Favori agentlarınıza erişmek ve yeni favoriler eklemek için giriş yapın."
          benefits={[
            "40 kredi hediye ile başla",
            "Favori agentlarını kaydet",
            "Hızlı erişim sağla",
          ]}
          primaryButtonText="Giriş Yap"
          secondaryButtonText="Kayıt Ol"
        />
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Header title="Favoriler" />
        <div className="p-6 flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-zinc-500">Yükleniyor...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header title="Favoriler" />
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
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Favori{" "}
                <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Agentlarınız
                </span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Beğendiğiniz agentlara hızlıca erişin.
              </p>

              {/* Stats */}
              {favoriteAgents.length > 0 && (
                <div className="flex items-center justify-center gap-8 mt-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{favoriteAgents.length}</p>
                    <p className="text-sm text-zinc-500">Favori Agent</p>
                  </div>
                </div>
              )}
            </motion.div>

            {favoriteAgents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32"
              >
                <div className="w-24 h-24 rounded-3xl bg-zinc-900/50 border border-white/[0.08] flex items-center justify-center mb-6 backdrop-blur-sm">
                  <HeartOff className="w-12 h-12 text-zinc-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-3">Henüz favori yok</h2>
                <p className="text-zinc-500 max-w-sm mb-8 text-center">
                  Beğendiğiniz agentları favorilere ekleyerek hızlıca erişebilirsiniz.
                </p>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Agentları Keşfet
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {favoriteAgents.map((agent, index) => (
                  <FavoriteAgentCard
                    key={agent.slug}
                    agent={agent}
                    index={index}
                    onFavoriteClick={handleFavoriteClick}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function FavoriteAgentCard({
  agent,
  index,
  onFavoriteClick
}: {
  agent: Agent
  index: number
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
          "group relative p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300",
          "bg-zinc-900/50",
          "border-white/[0.05] hover:border-white/[0.15]",
          "hover:shadow-2xl hover:shadow-purple-500/5",
          !agent.isActive && "opacity-60"
        )}>
          {/* Favorite Button */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {!agent.isActive && (
              <span className="px-2 py-1 rounded-full bg-zinc-500/20 text-zinc-400 text-xs font-medium border border-zinc-500/30">
                Yakında
              </span>
            )}
            <button
              onClick={(e) => onFavoriteClick(e, agent.slug)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
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
                className="px-2 py-0.5 rounded-lg bg-white/[0.05] text-zinc-500 text-xs border border-white/[0.05]"
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
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    </motion.div>
  )
}
