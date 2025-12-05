"use client"

import { motion } from "framer-motion"
import { Hourglass } from "lucide-react"

export function ComingSoon() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full" />
        <div className="relative p-4 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
          <Hourglass className="w-12 h-12 text-zinc-400" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-2">Yakında...</h2>
      <p className="text-zinc-500 max-w-md">Bu özellik üzerinde çalışıyoruz. Çok yakında sizlerle buluşacak.</p>
    </motion.div>
  )
}
