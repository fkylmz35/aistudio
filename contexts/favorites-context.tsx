"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { supabase } from "@/lib/supabase-browser"
import { useAuth } from "./auth-context"

interface FavoritesContextType {
  favorites: string[]
  isLoading: boolean
  isFavorite: (agentSlug: string) => boolean
  toggleFavorite: (agentSlug: string) => Promise<void>
  refreshFavorites: () => Promise<void>
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([])
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from("user_favorites")
        .select("agent_slug")
        .eq("user_id", user.id)

      if (error) {
        console.error("Error fetching favorites:", error)
        return
      }

      setFavorites(data?.map(f => f.agent_slug) || [])
    } catch (error) {
      console.error("Exception fetching favorites:", error)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  const isFavorite = useCallback((agentSlug: string) => {
    return favorites.includes(agentSlug)
  }, [favorites])

  const toggleFavorite = useCallback(async (agentSlug: string) => {
    if (!user) return

    const isCurrentlyFavorite = favorites.includes(agentSlug)

    // Optimistic update
    if (isCurrentlyFavorite) {
      setFavorites(prev => prev.filter(slug => slug !== agentSlug))
    } else {
      setFavorites(prev => [...prev, agentSlug])
    }

    try {
      if (isCurrentlyFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from("user_favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("agent_slug", agentSlug)

        if (error) {
          // Rollback on error
          setFavorites(prev => [...prev, agentSlug])
          console.error("Error removing favorite:", error)
        }
      } else {
        // Add to favorites
        const { error } = await supabase
          .from("user_favorites")
          .insert({
            user_id: user.id,
            agent_slug: agentSlug
          })

        if (error) {
          // Rollback on error
          setFavorites(prev => prev.filter(slug => slug !== agentSlug))
          console.error("Error adding favorite:", error)
        }
      }
    } catch (error) {
      console.error("Exception toggling favorite:", error)
      // Rollback
      if (isCurrentlyFavorite) {
        setFavorites(prev => [...prev, agentSlug])
      } else {
        setFavorites(prev => prev.filter(slug => slug !== agentSlug))
      }
    }
  }, [user, favorites])

  const refreshFavorites = useCallback(async () => {
    await fetchFavorites()
  }, [fetchFavorites])

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        isFavorite,
        toggleFavorite,
        refreshFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
