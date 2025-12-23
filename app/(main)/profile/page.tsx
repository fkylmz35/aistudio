"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Mail, Calendar, ImageIcon, Sparkles, Settings, LogOut, Loader2, Crown, CreditCard, ChevronRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCredits } from "@/contexts/credits-context"
import { supabase } from "@/lib/supabase-browser"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading, signOut } = useAuth()
  const { credits, isPro, isLoading: isCreditsLoading } = useCredits()
  const [imageCount, setImageCount] = useState<number>(0)
  const [isImageCountLoading, setIsImageCountLoading] = useState(true)

  // Fetch image count from Supabase
  useEffect(() => {
    const fetchImageCount = async () => {
      if (!user) {
        setImageCount(0)
        setIsImageCountLoading(false)
        return
      }

      try {
        const { count, error } = await supabase
          .from("generated_images")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)

        if (error) {
          console.error("[Profile] Error fetching image count:", error)
          setImageCount(0)
        } else {
          setImageCount(count || 0)
        }
      } catch (error) {
        console.error("[Profile] Exception:", error)
        setImageCount(0)
      } finally {
        setIsImageCountLoading(false)
      }
    }

    fetchImageCount()
  }, [user])

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
    router.refresh()
  }

  // Format join date
  const formatJoinDate = (dateString: string | undefined) => {
    if (!dateString) return "Bilinmiyor"
    const date = new Date(dateString)
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ]
    return `${months[date.getMonth()]} ${date.getFullYear()}'den beri üye`
  }

  if (isLoading) {
    return (
      <>
        <Header title="Profil" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      </>
    )
  }

  // User data
  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Kullanıcı"
  const userEmail = user?.email || "Email bulunamadı"
  const avatarUrl = user?.user_metadata?.avatar_url
  const initials = userName.slice(0, 2).toUpperCase()
  const joinDate = formatJoinDate(user?.created_at)

  return (
    <>
      <Header title="Profil" />
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg shadow-sm mb-6"
          >
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-zinc-400 to-zinc-600 p-[2px]">
                  <div className="w-full h-full rounded-lg bg-[#141414] overflow-hidden flex items-center justify-center">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl || "/placeholder.svg"}
                        alt={userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-semibold text-white">{initials}</span>
                    )}
                  </div>
                </div>
                {/* Pro Badge */}
                {isPro && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg">
                    <Crown className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-semibold text-white">{userName}</h2>
                  {isPro && (
                    <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-xs font-medium text-amber-400">
                      Pro
                    </span>
                  )}
                </div>
                <p className="text-zinc-500 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {userEmail}
                </p>
                <p className="text-zinc-500 text-sm flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  {joinDate}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Current Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="relative p-5 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg shadow-sm mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isPro ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/20" : "bg-white/[0.05]"}`}>
                  <Crown className={`w-5 h-5 ${isPro ? "text-amber-400" : "text-zinc-400"}`} />
                </div>
                <div>
                  <p className="text-zinc-400 text-xs">Mevcut Paket</p>
                  <p className={`text-lg font-semibold ${isPro ? "text-amber-400" : "text-white"}`}>
                    {isPro ? "Pro Üyelik" : "Deneme Paketi"}
                  </p>
                </div>
              </div>
              {!isPro && (
                <Link
                  href="/pricing"
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-sm font-medium hover:from-amber-400 hover:to-yellow-400 transition-all duration-150"
                >
                  Pro'ya Yükselt
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <div className="p-5 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-zinc-400" />
                </div>
                <span className="text-zinc-400 text-sm">Oluşturulan Görseller</span>
              </div>
              <p className="text-3xl font-semibold text-white">
                {isImageCountLoading ? (
                  <span className="text-zinc-500">...</span>
                ) : (
                  imageCount.toLocaleString("tr-TR")
                )}
              </p>
            </div>

            <div className="p-5 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/10 to-yellow-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-zinc-400 text-sm">Kalan Kredi</span>
              </div>
              <p className="text-3xl font-semibold text-amber-400">
                {isCreditsLoading ? (
                  <span className="text-zinc-500">...</span>
                ) : (
                  credits.toLocaleString("tr-TR")
                )}
              </p>
              {/* Buy Credits Button */}
              <Link
                href="/pricing"
                className="flex items-center justify-center gap-2 mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-150"
              >
                <CreditCard className="w-4 h-4" />
                Kredi Satın Al
              </Link>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <Link
              href="/settings"
              className="w-full flex items-center justify-between p-4 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg shadow-sm hover:border-white/[0.15] transition-all duration-150"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  <Settings className="w-5 h-5 text-zinc-400" />
                </div>
                <span className="text-white text-sm font-medium">Hesap Ayarları</span>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-4 p-4 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg shadow-sm hover:border-red-500/20 transition-all duration-150 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-red-500/10">
                <LogOut className="w-5 h-5 text-zinc-400 group-hover:text-red-400" />
              </div>
              <span className="text-white text-sm font-medium group-hover:text-red-400">Çıkış Yap</span>
            </button>
          </motion.div>
        </div>
      </div>
    </>
  )
}
