"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabase-browser"
import { useAuth } from "@/contexts/auth-context"

interface CreditsContextType {
  credits: number
  isPro: boolean
  isLoading: boolean
  refreshCredits: () => Promise<void>
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined)

export function CreditsProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState<number>(0)
  const [isPro, setIsPro] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0)
      setIsPro(false)
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from("user_credits")
        .select("balance, is_pro_enabled")
        .eq("user_id", user.id)
        .single()

      if (error) {
        console.error("[Credits] Error fetching credits:", error)
        setCredits(0)
        setIsPro(false)
      } else {
        setCredits(data?.balance || 0)
        setIsPro(data?.is_pro_enabled || false)
      }
    } catch (error) {
      console.error("[Credits] Exception:", error)
      setCredits(0)
      setIsPro(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchCredits()
  }, [user])

  // Real-time subscription
  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel("user_credits_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_credits",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("[Credits] Real-time update:", payload)
          if (payload.new && "balance" in payload.new) {
            const newData = payload.new as { balance: number; is_pro_enabled?: boolean }
            setCredits(newData.balance)
            if ("is_pro_enabled" in newData) {
              setIsPro(newData.is_pro_enabled || false)
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  const refreshCredits = async () => {
    await fetchCredits()
  }

  return (
    <CreditsContext.Provider value={{ credits, isPro, isLoading, refreshCredits }}>
      {children}
    </CreditsContext.Provider>
  )
}

export function useCredits() {
  const context = useContext(CreditsContext)
  if (context === undefined) {
    throw new Error("useCredits must be used within a CreditsProvider")
  }
  return context
}
