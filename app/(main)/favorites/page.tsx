"use client"

import { useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { agents, type Agent } from "@/lib/agents"
import { useFavorites } from "@/contexts/favorites-context"
import { Heart, Coins, HeartOff } from "lucide-react"
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
      <div className="p-6">
        {favoriteAgents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <HeartOff className="w-8 h-8 text-zinc-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Henüz favori yok</h2>
            <p className="text-zinc-500 max-w-sm mb-6">
              Beğendiğiniz agentları favorilere ekleyerek hızlıca erişebilirsiniz.
            </p>
            <Link
              href="/explore"
              className="px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors"
            >
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
          "group relative p-5 rounded-2xl border backdrop-blur-md transition-all duration-300",
          "bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent",
          "border-white/[0.05] hover:border-white/[0.15]",
          "hover:from-white/[0.07] hover:via-white/[0.04] hover:to-white/[0.01]",
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
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-red-500/20 text-red-400 hover:bg-red-500/30"
            >
              <Heart className="w-4 h-4 fill-current" />
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
