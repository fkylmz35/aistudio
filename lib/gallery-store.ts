"use client"

// Simple in-memory store for gallery images
// In a real app, this would be backed by a database

import { useSyncExternalStore } from "react"

export interface GalleryImage {
  id: string
  prompt: string
  quality: string
  aspectRatio: string
  imageUrl: string
  createdAt: Date
}

let galleryImages: GalleryImage[] = []
let listeners: (() => void)[] = []

export const galleryStore = {
  getImages: () => galleryImages,

  addImage: (image: Omit<GalleryImage, "id" | "createdAt">) => {
    const newImage: GalleryImage = {
      ...image,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
    }
    galleryImages = [newImage, ...galleryImages]
    listeners.forEach((listener) => listener())
    return newImage
  },

  deleteImage: (id: string) => {
    galleryImages = galleryImages.filter((img) => img.id !== id)
    listeners.forEach((listener) => listener())
  },

  subscribe: (listener: () => void) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
}

export function useGalleryStore() {
  const images = useSyncExternalStore(galleryStore.subscribe, galleryStore.getImages, galleryStore.getImages)

  return {
    images,
    addImage: galleryStore.addImage,
    deleteImage: galleryStore.deleteImage,
  }
}
