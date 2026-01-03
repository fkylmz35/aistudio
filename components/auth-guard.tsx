"use client"

import { motion } from "framer-motion"
import { Lock, Check, Sparkles } from "lucide-react"
import Link from "next/link"

interface AuthGuardProps {
  title: string
  description: string
  benefits?: string[]
  bonusCard?: {
    title: string
    description: string
  }
  primaryButtonText?: string
  secondaryButtonText?: string
}

export function AuthGuard({
  title,
  description,
  benefits,
  bonusCard,
  primaryButtonText = "Giriş Yap",
  secondaryButtonText = "Ücretsiz Kayıt Ol",
}: AuthGuardProps) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Lock Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600/50 shadow-xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 -z-10 blur-2xl opacity-40 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-full" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-white text-center mb-3"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 text-center mb-6"
        >
          {description}
        </motion.p>

        {/* Bonus Card */}
        {bonusCard && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-6 p-4 bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">{bonusCard.title}</p>
                <p className="text-zinc-500 text-sm">{bonusCard.description}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 space-y-3"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-zinc-300 text-sm">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Link href="/login" className="block">
            <button className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors shadow-lg">
              {primaryButtonText}
            </button>
          </Link>
          <Link href="/register" className="block">
            <button className="w-full py-3 px-4 bg-transparent border border-zinc-700 text-white font-medium rounded-xl hover:bg-zinc-800 hover:border-zinc-600 transition-colors">
              {secondaryButtonText}
            </button>
          </Link>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-zinc-600 text-xs mt-6"
        >
          Hesap oluşturmak tamamen ücretsizdir
        </motion.p>
      </motion.div>
    </div>
  )
}
