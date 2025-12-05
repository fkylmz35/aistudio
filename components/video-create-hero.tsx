"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Scissors, Clock, Volume2, Type, Wand2, ImageIcon } from "lucide-react"

const videoPromptExamples = [
  "Sahilde gün batımı, dalgalar yavaşça kıyıya vuruyor",
  "Drone ile şehir manzarası, gece ışıkları",
  "Ürün tanıtım videosu, 360 derece dönüş",
  "Animasyonlu logo reveal",
]

const videoEditTools = [
  {
    icon: ImageIcon,
    label: "Görsellerden Video",
    description: "Görsellerden video oluştur",
    href: "/create/video/from-image",
  },
  { icon: Scissors, label: "Video Kes", description: "Videoyu kırp ve düzenle", href: "/create/video/trim" },
  { icon: Clock, label: "Hız Ayarla", description: "Yavaşlat veya hızlandır", href: "/create/video/speed" },
  { icon: Volume2, label: "Ses Ekle", description: "Müzik veya ses efekti", href: "/create/video/audio" },
  { icon: Type, label: "Altyazı Ekle", description: "Metin ve altyazı", href: "/create/video/captions" },
  { icon: Wand2, label: "Stil Uygula", description: "Video filtreleri", href: "/create/video/style" },
]

const videoFormats = [
  { label: "Kısa Video", description: "TikTok, Reels (9:16)", icon: "📱" },
  { label: "YouTube", description: "Yatay format (16:9)", icon: "🎬" },
  { label: "Kare", description: "Instagram (1:1)", icon: "📷" },
]

export function VideoCreateHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto text-center py-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Video Oluştur</h1>
      <p className="text-lg text-zinc-400 mb-8">Metinden video oluşturun veya mevcut videolarınızı düzenleyin.</p>

      {/* Video Format Quick Select */}
      <div className="flex justify-center gap-3 mb-8">
        {videoFormats.map((format, index) => (
          <motion.button
            key={format.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#141414] border border-white/[0.08] hover:bg-white/5 hover:border-white/10 transition-all group"
          >
            <span className="text-2xl">{format.icon}</span>
            <div className="text-left">
              <div className="text-sm font-medium text-white">{format.label}</div>
              <div className="text-xs text-zinc-500">{format.description}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Prompt Examples */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {videoPromptExamples.map((example, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="px-4 py-2 rounded-full text-zinc-400 bg-[#141414] border border-white/[0.08] hover:bg-white/5 hover:text-white transition-colors text-sm"
          >
            {example}
          </motion.button>
        ))}
      </div>

      {/* Edit Tools Section */}
      <div className="mt-12">
        <h2 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Video Araçları</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {videoEditTools.map((tool, index) => (
            <motion.div
              key={tool.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <Link
                href={tool.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#141414] border border-white/[0.08] hover:bg-white/5 hover:border-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <tool.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">{tool.label}</div>
                  <div className="text-xs text-zinc-500">{tool.description}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
