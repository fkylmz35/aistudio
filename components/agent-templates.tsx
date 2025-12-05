"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface AgentTemplatesProps {
  type: "image" | "video"
}

const imageTemplates = [
  { image: "/ugc-product-photo-lifestyle.jpg", title: "Ürün Yaşam Tarzı", category: "E-Ticaret" },
  { image: "/ugc-influencer-selfie.jpg", title: "Influencer Tarzı", category: "Sosyal Medya" },
  { image: "/ugc-food-photography.jpg", title: "Yemek Fotoğrafı", category: "Restoran" },
  { image: "/ugc-fashion-lookbook.jpg", title: "Moda Lookbook", category: "Moda" },
  { image: "/placeholder.svg?height=300&width=200", title: "Teknoloji İnceleme", category: "Teknoloji" },
  { image: "/placeholder.svg?height=300&width=200", title: "Güzellik İpuçları", category: "Güzellik" },
]

const videoTemplates = [
  { image: "/placeholder.svg?height=300&width=200", title: "Kutu Açılımı", category: "E-Ticaret" },
  { image: "/placeholder.svg?height=300&width=200", title: "Ürün Demo", category: "Tanıtım" },
  { image: "/placeholder.svg?height=300&width=200", title: "Müşteri Yorumu", category: "Referans" },
  { image: "/placeholder.svg?height=300&width=200", title: "Eğitim Videosu", category: "Eğitim" },
  { image: "/placeholder.svg?height=300&width=200", title: "Önce/Sonra", category: "Dönüşüm" },
  { image: "/placeholder.svg?height=300&width=200", title: "Günlük Yaşam", category: "Lifestyle" },
]

export function AgentTemplates({ type }: AgentTemplatesProps) {
  const templates = type === "image" ? imageTemplates : videoTemplates

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {templates.map((template, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
            <img
              src={template.image || "/placeholder.svg"}
              alt={template.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-6 h-6 text-foreground fill-foreground" />
                </div>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Kullan
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-primary">{template.category}</span>
            <h3 className="text-sm font-medium text-foreground">{template.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
