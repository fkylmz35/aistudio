"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { ImageIcon, Download, Trash2, ZoomIn, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase-browser"
import { useAuth } from "@/contexts/auth-context"
import { usePendingImages, type PendingImage } from "@/contexts/pending-images-context"

interface GeneratedImage {
  id: string
  user_id: string
  image_url: string
  prompt: string
  aspect_ratio: string
  resolution: string
  created_at: string
}

// Pending Card Component
function PendingCard({ pendingImage }: { pendingImage: PendingImage }) {
  const truncatedPrompt = pendingImage.prompt.length > 50
    ? pendingImage.prompt.substring(0, 50) + "..."
    : pendingImage.prompt

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/[0.05]"
    >
      {/* Blur/Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 animate-pulse" />

      {/* Loading Spinner */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-white/50 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white/50 animate-spin" style={{ animationDirection: "reverse" }} />
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-400">Oluşturuluyor...</p>
      </div>

      {/* Prompt Text */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-xs text-zinc-400 line-clamp-2">{truncatedPrompt}</p>
      </div>

      {/* Quality/Ratio Badge */}
      <div className="absolute top-3 right-3 flex gap-1.5">
        <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white/60">
          {pendingImage.resolution}
        </span>
        <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white/60">
          {pendingImage.aspect_ratio}
        </span>
      </div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)
  const [imageToDelete, setImageToDelete] = useState<GeneratedImage | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newImageIds, setNewImageIds] = useState<Set<string>>(new Set())
  const { user } = useAuth()
  const { pendingImages, removePendingImage } = usePendingImages()

  // Görselleri yükle
  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }

    const fetchImages = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("generated_images")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching images:", error)
      } else {
        setImages(data || [])
      }
      setIsLoading(false)
    }

    fetchImages()

    // Real-time subscription
    const channel = supabase
      .channel("generated_images_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "generated_images",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newImage = payload.new as GeneratedImage

          // Yeni görsel geldiğinde listeye ekle
          setImages((prev) => [newImage, ...prev])

          // Yeni görsel olarak işaretle (highlight için)
          setNewImageIds((prev) => new Set(prev).add(newImage.id))

          // 3 saniye sonra highlight'ı kaldır
          setTimeout(() => {
            setNewImageIds((prev) => {
              const next = new Set(prev)
              next.delete(newImage.id)
              return next
            })
          }, 3000)
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "generated_images",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Görsel silindiğinde listeden çıkar
          setImages((prev) => prev.filter((img) => img.id !== payload.old.id))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  // Pending images ile yeni görselleri eşleştir
  useEffect(() => {
    if (images.length > 0 && pendingImages.length > 0) {
      // En son eklenen görsel ile eşleştir
      const latestImage = images[0]
      const matchingPending = pendingImages.find(
        (p) => p.prompt.trim().toLowerCase() === latestImage.prompt?.trim().toLowerCase()
      )
      if (matchingPending) {
        removePendingImage(matchingPending.id)
      }
    }
  }, [images, pendingImages, removePendingImage])

  // Görseli sil - onay sonrası
  const confirmDelete = async () => {
    if (!imageToDelete) return

    setIsDeleting(true)
    const { error } = await supabase
      .from("generated_images")
      .delete()
      .eq("id", imageToDelete.id)

    if (error) {
      console.error("Error deleting image:", error)
    }

    setIsDeleting(false)
    setImageToDelete(null)
  }

  // Görseli indir
  const handleDownload = async (image: GeneratedImage) => {
    try {
      const response = await fetch(image.image_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `nairoo_${image.id}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download error:", error)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header title="Galeri" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
        </div>
      </>
    )
  }

  const hasContent = images.length > 0 || pendingImages.length > 0

  return (
    <>
      <Header title="Galeri" />
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {!hasContent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-6">
                <ImageIcon className="w-10 h-10 text-zinc-600" />
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Henüz görsel yok</h2>
              <p className="text-zinc-500 text-sm text-center max-w-md">
                Görsel oluştur sayfasından yeni görseller oluşturduğunuzda burada görünecekler.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {/* Pending Images First */}
                {pendingImages.map((pendingImage) => (
                  <PendingCard key={pendingImage.id} pendingImage={pendingImage} />
                ))}

                {/* Real Images */}
                {images.map((image, index) => {
                  const isNew = newImageIds.has(image.id)
                  return (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: isNew ? 1.05 : 1, y: isNew ? 0 : 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: isNew ? 0 : index * 0.05,
                        duration: isNew ? 0.5 : 0.3,
                        ease: "easeOut"
                      }}
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05]"
                    >
                      {/* New image highlight */}
                      {isNew && (
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ delay: 1, duration: 0.5 }}
                          className="absolute inset-0 z-10 bg-gradient-to-br from-green-500/20 to-transparent pointer-events-none"
                        />
                      )}

                      <img
                        src={image.image_url || "/placeholder.svg"}
                        alt={image.prompt}
                        className="w-full h-full object-cover"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white text-sm line-clamp-2 mb-3">{image.prompt}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedImage(image)}
                              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
                            >
                              <ZoomIn className="w-3.5 h-3.5" />
                              Görüntüle
                            </button>
                            <button
                              onClick={() => handleDownload(image)}
                              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setImageToDelete(image)}
                              className="p-2 rounded-lg bg-white/10 hover:bg-red-500/50 text-white transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quality/Ratio Badge */}
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white">
                          {image.resolution}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white">
                          {image.aspect_ratio}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image_url || "/placeholder.svg"}
                alt={selectedImage.prompt}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <p className="text-white text-sm">{selectedImage.prompt}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-zinc-400">
                  <span>Kalite: {selectedImage.resolution}</span>
                  <span>Oran: {selectedImage.aspect_ratio}</span>
                  <span>Tarih: {new Date(selectedImage.created_at).toLocaleDateString("tr-TR")}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {imageToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => !isDeleting && setImageToDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-white text-center mb-2">
                Görseli Sil
              </h3>
              <p className="text-sm text-zinc-400 text-center mb-6">
                Bu görseli silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setImageToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors disabled:opacity-50"
                >
                  İptal
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Siliniyor...
                    </>
                  ) : (
                    "Sil"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
