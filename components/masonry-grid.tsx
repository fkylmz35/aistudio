"use client"

import { motion } from "framer-motion"
import { GalleryCard } from "./gallery-card"

const mockImages = [
  { image: "/cyberpunk-city-neon.png", username: "ayse_design", aspectRatio: "portrait" as const },
  { image: "/abstract-digital-art-waves.jpg", username: "mehmet_art", aspectRatio: "landscape" as const },
  { image: "/minimalist-geometric-pattern.jpg", username: "zeynep_creates", aspectRatio: "square" as const },
  { image: "/fantasy-forest-magical.jpg", username: "ali_visual", aspectRatio: "portrait" as const },
  { image: "/futuristic-spaceship-interior.jpg", username: "fatma_studio", aspectRatio: "landscape" as const },
  { image: "/anime-portrait.png", username: "can_artworks", aspectRatio: "portrait" as const },
  { image: "/surreal-dreamscape-clouds.jpg", username: "elif_designs", aspectRatio: "square" as const },
  { image: "/sci-fi-robot-portrait.jpg", username: "burak_ai", aspectRatio: "portrait" as const },
  { image: "/underwater-coral-reef.png", username: "selin_art", aspectRatio: "landscape" as const },
  { image: "/vintage-car-illustration.jpg", username: "emre_visual", aspectRatio: "portrait" as const },
  { image: "/abstract-colorful-explosion.jpg", username: "deniz_creates", aspectRatio: "square" as const },
  { image: "/mountain-sunset-vista.png", username: "yusuf_photo", aspectRatio: "portrait" as const },
]

export function MasonryGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
    >
      {mockImages.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="break-inside-avoid"
        >
          <GalleryCard {...item} />
        </motion.div>
      ))}
    </motion.div>
  )
}
