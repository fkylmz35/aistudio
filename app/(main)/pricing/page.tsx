"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Check, Sparkles, Crown, Loader2, ImageIcon, Zap, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCredits } from "@/contexts/credits-context"
import { supabase } from "@/lib/supabase-browser"

interface CreditPackage {
  id: string
  name: string
  credits: number
  price_tl: number
  discount_percent: number
  is_active: boolean
  is_popular: boolean
  features: string[]
}

// Fallback packages if Supabase fetch fails
const fallbackPackages: CreditPackage[] = [
  {
    id: "trial",
    name: "Deneme",
    credits: 40,
    price_tl: 0,
    discount_percent: 0,
    is_active: true,
    is_popular: false,
    features: ["Sadece Standart kalite", "40 kredi", "Temel özellikler"],
  },
  {
    id: "starter",
    name: "Başlangıç",
    credits: 100,
    price_tl: 99,
    discount_percent: 0,
    is_active: true,
    is_popular: false,
    features: ["Tüm kaliteler", "100 kredi", "Öncelikli destek"],
  },
  {
    id: "standard",
    name: "Standart",
    credits: 250,
    price_tl: 199,
    discount_percent: 20,
    is_active: true,
    is_popular: false,
    features: ["Tüm kaliteler", "250 kredi", "Öncelikli destek", "%20 tasarruf"],
  },
  {
    id: "pro",
    name: "Pro",
    credits: 600,
    price_tl: 399,
    discount_percent: 35,
    is_active: true,
    is_popular: true,
    features: ["Tüm kaliteler", "600 kredi", "VIP destek", "%35 tasarruf", "Erken erişim"],
  },
]

// Credit costs per quality
const creditCosts = {
  standart: 8,
  "1k": 25,
  "2k": 25,
  "4k": 50,
}

export default function PricingPage() {
  const [packages, setPackages] = useState<CreditPackage[]>(fallbackPackages)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { isPro } = useCredits()

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from("credit_packages")
          .select("*")
          .eq("is_active", true)
          .order("price_tl", { ascending: true })

        if (error) {
          console.error("[Pricing] Error fetching packages:", error)
        } else if (data && data.length > 0) {
          setPackages(data)
        }
      } catch (error) {
        console.error("[Pricing] Exception:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const calculateImages = (credits: number, quality: keyof typeof creditCosts) => {
    return Math.floor(credits / creditCosts[quality])
  }

  const getOriginalPrice = (pkg: CreditPackage) => {
    if (pkg.discount_percent <= 0) return null
    return Math.round(pkg.price_tl / (1 - pkg.discount_percent / 100))
  }

  const handlePurchase = (pkg: CreditPackage) => {
    alert(`${pkg.name} paketi satın alma işlemi yakında aktif olacak!`)
  }

  if (isLoading) {
    return (
      <>
        <Header title="Kredi Satın Al" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      </>
    )
  }

  return (
    <>
      <Header title="Kredi Satın Al" />

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
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-60 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                İhtiyacınıza Uygun <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Paketi</span> Seçin
              </h1>
              <p className="text-zinc-400 max-w-lg mx-auto">
                Yapay zeka ile sınırsız görsel üretin. Her paket ile farklı kalite seçeneklerine erişin.
              </p>
            </motion.div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {packages.map((pkg, index) => {
                const originalPrice = getOriginalPrice(pkg)
                const isCurrentPlan = pkg.price_tl === 0 && !isPro
                const isFree = pkg.price_tl === 0

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 ${
                      pkg.is_popular
                        ? "bg-gradient-to-b from-amber-500/10 to-transparent border-amber-500/30 hover:border-amber-500/50 shadow-lg shadow-amber-500/10"
                        : "bg-zinc-900/50 border-white/[0.08] hover:border-white/[0.15]"
                    }`}
                  >
                    {/* Popular Badge */}
                    {pkg.is_popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-semibold flex items-center gap-1 shadow-lg">
                          <Crown className="w-3 h-3" />
                          En Popüler
                        </span>
                      </div>
                    )}

                    {/* Current Plan Badge */}
                    {isCurrentPlan && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold">
                          Mevcut Paket
                        </span>
                      </div>
                    )}

                    {/* Package Name */}
                    <h3 className={`text-lg font-semibold mb-2 ${pkg.is_popular ? "text-amber-400" : "text-white"}`}>
                      {pkg.name}
                    </h3>

                    {/* Credits */}
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className={`text-4xl font-bold ${pkg.is_popular ? "text-amber-400" : "text-white"}`}>
                        {pkg.credits.toLocaleString("tr-TR")}
                      </span>
                      <span className="text-zinc-500 text-sm">kredi</span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      {isFree ? (
                        <span className="text-2xl font-bold text-green-400">Ücretsiz</span>
                      ) : (
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">{pkg.price_tl} ₺</span>
                          {originalPrice && (
                            <span className="text-sm text-zinc-500 line-through">{originalPrice} ₺</span>
                          )}
                        </div>
                      )}
                      {pkg.discount_percent > 0 && (
                        <span className="text-xs text-green-400 font-medium">%{pkg.discount_percent} indirim</span>
                      )}
                    </div>

                    {/* Image Calculations */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
                      <p className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        Üretebileceğin görsel sayısı:
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Standart</span>
                          <span className="text-white font-medium">{calculateImages(pkg.credits, "standart")} görsel</span>
                        </div>
                        {!isFree && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">1K / 2K</span>
                              <span className="text-white font-medium">{calculateImages(pkg.credits, "1k")} görsel</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">4K</span>
                              <span className="text-white font-medium">{calculateImages(pkg.credits, "4k")} görsel</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {(pkg.features || []).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                          <Check className={`w-4 h-4 shrink-0 ${pkg.is_popular ? "text-amber-400" : "text-green-400"}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Purchase Button */}
                    {isFree ? (
                      <button
                        disabled
                        className="w-full py-3 rounded-xl bg-zinc-800 text-zinc-500 text-sm font-medium cursor-not-allowed"
                      >
                        {isCurrentPlan ? "Mevcut Paketiniz" : "Kayıt Ol"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(pkg)}
                        className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                          pkg.is_popular
                            ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-500/20"
                            : "bg-white text-black hover:bg-zinc-200"
                        }`}
                      >
                        Satın Al
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Credit carry-over info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">
                  Kullanılmayan kredilerin %50&apos;si bir sonraki aya devredilir
                </span>
              </div>
            </motion.div>

            {/* Feature Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.08] backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Özellik Karşılaştırması
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.05]">
                      <th className="text-left py-3 text-sm font-medium text-zinc-400">Özellik</th>
                      <th className="text-center py-3 text-sm font-medium text-zinc-400">Deneme</th>
                      <th className="text-center py-3 text-sm font-medium text-zinc-400">Başlangıç</th>
                      <th className="text-center py-3 text-sm font-medium text-zinc-400">Standart</th>
                      <th className="text-center py-3 text-sm font-medium text-amber-400">Pro</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-3 text-zinc-300">Standart Kalite</td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-amber-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-3 text-zinc-300">1K / 2K Kalite</td>
                      <td className="text-center py-3 text-zinc-600">—</td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-amber-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-3 text-zinc-300">4K Kalite</td>
                      <td className="text-center py-3 text-zinc-600">—</td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-amber-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-3 text-zinc-300">Öncelikli Destek</td>
                      <td className="text-center py-3 text-zinc-600">—</td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-amber-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-3 text-zinc-300">VIP Destek</td>
                      <td className="text-center py-3 text-zinc-600">—</td>
                      <td className="text-center py-3 text-zinc-600">—</td>
                      <td className="text-center py-3 text-zinc-600">—</td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-amber-400 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3 text-zinc-300">Erken Erişim</td>
                      <td className="text-center py-3 text-zinc-600">—</td>
                      <td className="text-center py-3 text-zinc-600">—</td>
                      <td className="text-center py-3 text-zinc-600">—</td>
                      <td className="text-center py-3"><Check className="w-4 h-4 text-amber-400 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Credit Costs Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 rounded-xl bg-zinc-900/50 border border-white/[0.08]"
            >
              <p className="text-sm text-zinc-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-zinc-400">Kredi kullanımı:</strong> Standart kalite {creditCosts.standart} kredi,
                  1K/2K kalite {creditCosts["1k"]} kredi, 4K kalite {creditCosts["4k"]} kredi harcar.
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
