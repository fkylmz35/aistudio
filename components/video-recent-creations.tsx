"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

const recentVideos = [
  { thumbnail: "/sunset-beach-video.jpg", prompt: "Sahil gün batımı", duration: "5s" },
  { thumbnail: "/city-drone-footage.jpg", prompt: "Şehir drone", duration: "10s" },
  { thumbnail: "/product-video-360.jpg", prompt: "Ürün tanıtım", duration: "8s" },
  { thumbnail: "/animated-logo-reveal.jpg", prompt: "Logo animasyonu", duration: "3s" },
]

export function VideoRecentCreations() {
  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-sm font-medium text-zinc-500 mb-4">Son Videolarınız</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {recentVideos.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="aspect-video rounded-xl overflow-hidden cursor-pointer group relative bg-[#141414]"
          >
            <img src={item.thumbnail || "/placeholder.svg"} alt={item.prompt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span className="text-[10px] text-white/80 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.prompt}
              </span>
              <span className="text-[10px] text-white/60 bg-black/50 px-1.5 py-0.5 rounded">{item.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
