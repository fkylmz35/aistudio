"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Mail, Calendar, ImageIcon, Sparkles, Settings, LogOut, Loader2, Crown, CreditCard, ChevronRight, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCredits } from "@/contexts/credits-context"
import { supabase } from "@/lib/supabase-browser"
import { AuthGuard } from "@/components/auth-guard"

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

  // Auth guard for non-authenticated users
  if (!user) {
    return (
      <>
        <Header title="Profil" />
        <AuthGuard
          title="Profil Ayarlarına Erişim İçin Giriş Yapın"
          description="Hesap bilgilerinizi görüntülemek ve güncellemek için giriş yapmanız gerekiyor."
          benefits={[
            "Hesap bilgilerinizi yönetin",
            "Kredi bakiyenizi görün",
            "Ayarlarınızı özelleştirin",
          ]}
          primaryButtonText="Giriş Yap"
          secondaryButtonText="Kayıt Ol"
        />
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
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className="max-w-2xl mx-auto">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="relative p-6 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm mb-6"
            >
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 p-[2px]">
                    <div className="w-full h-full rounded-2xl bg-zinc-900 overflow-hidden flex items-center justify-center">
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
                  <p className="text-zinc-400 text-sm flex items-center gap-2">
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
              transition={{ delay: 0.1 }}
              className="relative p-5 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm mb-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPro ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20" : "bg-white/[0.05] border border-white/[0.05]"}`}>
                    <Crown className={`w-6 h-6 ${isPro ? "text-amber-400" : "text-zinc-400"}`} />
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
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-sm font-medium hover:from-amber-400 hover:to-yellow-400 transition-all duration-150"
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
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              <div className="p-5 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.05] flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-zinc-400" />
                  </div>
                  <span className="text-zinc-400 text-sm">Oluşturulan Görseller</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {isImageCountLoading ? (
                    <span className="text-zinc-500">...</span>
                  ) : (
                    imageCount.toLocaleString("tr-TR")
                  )}
                </p>
              </div>

              <div className="p-5 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-zinc-400 text-sm">Kalan Kredi</span>
                </div>
                <p className="text-3xl font-bold text-amber-400">
                  {isCreditsLoading ? (
                    <span className="text-zinc-500">...</span>
                  ) : (
                    credits.toLocaleString("tr-TR")
                  )}
                </p>
                {/* Buy Credits Button */}
                <Link
                  href="/pricing"
                  className="flex items-center justify-center gap-2 mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-150"
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
              className="space-y-3"
            >
              <Link
                href="/settings"
                className="w-full flex items-center justify-between p-4 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm hover:border-white/[0.15] transition-all duration-150 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors">
                    <Settings className="w-5 h-5 text-zinc-400" />
                  </div>
                  <span className="text-white text-sm font-medium">Hesap Ayarları</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-4 p-4 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm hover:border-red-500/30 transition-all duration-150 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.05] flex items-center justify-center group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-colors">
                  <LogOut className="w-5 h-5 text-zinc-400 group-hover:text-red-400 transition-colors" />
                </div>
                <span className="text-white text-sm font-medium group-hover:text-red-400 transition-colors">Çıkış Yap</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
