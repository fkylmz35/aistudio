"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface PendingImage {
  id: string
  prompt: string
  aspect_ratio: string
  resolution: string
  created_at: string
  status: "pending" | "completed"
}

interface PendingImagesContextType {
  pendingImages: PendingImage[]
  addPendingImage: (image: Omit<PendingImage, "id" | "created_at" | "status">) => string
  removePendingImage: (id: string) => void
  clearPendingImages: () => void
}

const PendingImagesContext = createContext<PendingImagesContextType | null>(null)

const STORAGE_KEY = "mira-pending-images"

export function PendingImagesProvider({ children }: { children: ReactNode }) {
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([])

  // localStorage'dan yükle
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as PendingImage[]
        // 10 dakikadan eski pending'leri temizle
        const tenMinutesAgo = Date.now() - 10 * 60 * 1000
        const filtered = parsed.filter(
          (img) => new Date(img.created_at).getTime() > tenMinutesAgo
        )
        setPendingImages(filtered)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // localStorage'a kaydet
  useEffect(() => {
    if (pendingImages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingImages))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [pendingImages])

  const addPendingImage = (image: Omit<PendingImage, "id" | "created_at" | "status">): string => {
    const id = `pending-${Date.now()}-${Math.random().toString(36).substring(7)}`
    const newImage: PendingImage = {
      ...image,
      id,
      created_at: new Date().toISOString(),
      status: "pending",
    }
    setPendingImages((prev) => [newImage, ...prev])
    return id
  }

  const removePendingImage = (id: string) => {
    setPendingImages((prev) => prev.filter((img) => img.id !== id))
  }

  const clearPendingImages = () => {
    setPendingImages([])
  }

  return (
    <PendingImagesContext.Provider
      value={{ pendingImages, addPendingImage, removePendingImage, clearPendingImages }}
    >
      {children}
    </PendingImagesContext.Provider>
  )
}

export const usePendingImages = () => {
  const context = useContext(PendingImagesContext)
  if (!context) {
    throw new Error("usePendingImages must be used within a PendingImagesProvider")
  }
  return context
}
