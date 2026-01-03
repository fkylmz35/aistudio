"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Lock, X, Sparkles } from "lucide-react"
import Link from "next/link"

interface LoginPromptModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

export function LoginPromptModal({
  isOpen,
  onClose,
  title,
  description,
}: LoginPromptModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm mx-4"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-500" />
              </button>

              {/* Lock Icon */}
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600/50">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 -z-10 blur-xl opacity-40 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-full" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-white text-center mb-2">
                {title}
              </h2>

              {/* Description */}
              <p className="text-zinc-400 text-center text-sm mb-5">
                {description}
              </p>

              {/* Bonus badge */}
              <div className="flex items-center justify-center gap-2 mb-6 py-2 px-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg mx-auto w-fit">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm text-zinc-300">40 kredi hediye ile başla</span>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link href="/register" className="block">
                  <button className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
                    Ücretsiz Başla
                  </button>
                </Link>
                <Link href="/login" className="block">
                  <button className="w-full py-3 px-4 bg-transparent border border-zinc-700 text-white font-medium rounded-xl hover:bg-zinc-800 hover:border-zinc-600 transition-colors">
                    Giriş Yap
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
