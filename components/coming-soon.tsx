"use client"

import { motion } from "framer-motion"
import { Hourglass, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function ComingSoon() {
  return (
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />
          <div className="relative p-6 rounded-3xl bg-zinc-900/50 border border-white/[0.08] backdrop-blur-sm">
            <Hourglass className="w-16 h-16 text-purple-400" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Yakında{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Geliyor
          </span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-md mb-8">
          Bu özellik üzerinde çalışıyoruz. Çok yakında sizlerle buluşacak.
        </p>

        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/[0.08]"
        >
          <ArrowLeft className="w-5 h-5" />
          Marketplace'e Dön
        </Link>
      </motion.div>
    </div>
  )
}
