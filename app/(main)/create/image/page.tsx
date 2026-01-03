"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { usePendingImages } from "@/contexts/pending-images-context"
import { uploadMultipleFiles } from "@/lib/upload"
import { generateImage } from "@/lib/generate-image"
import {
  ImagePlusIcon,
  ChevronDown,
  ArrowUp,
  Sparkles,
  Wand2,
  Palette,
  Loader2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Özellik kartları
const features = [
  {
    icon: Sparkles,
    title: "4K Destek",
    description: "4k desteği",
  },
  {
    icon: Wand2,
    title: "Pro Model",
    description: "Nano banana Pro modeli",
  },
  {
    icon: Palette,
    title: "Akıllı Prompt",
    description: "Promptun en iyi hale getirilerek düzenlendi",
  },
]

// Örnek görseller (Unsplash)
const sampleImages = {
  left: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
  right: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop"
}

// Aspect ratio seçenekleri
const aspectRatioOptions = [
  { value: "1:1", label: "1:1 (Kare)" },
  { value: "21:9", label: "21:9 (Sinematik)" },
  { value: "16:9", label: "16:9 (Geniş Ekran)" },
  { value: "9:16", label: "9:16 (Dikey Video)" },
  { value: "3:2", label: "3:2 (Fotoğraf)" },
  { value: "2:3", label: "2:3 (Portre Fotoğraf)" },
  { value: "4:3", label: "4:3 (Klasik)" },
  { value: "3:4", label: "3:4 (Portre Klasik)" },
  { value: "5:4", label: "5:4 (Yatay)" },
  { value: "4:5", label: "4:5 (Instagram Portre)" },
]

const qualities = ["Standart", "1K", "2K", "4K"]

const COOLDOWN_DURATION = 4000

export default function CreateImagePage() {
  const [prompt, setPrompt] = useState("")
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [quality, setQuality] = useState("Standart")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCooldown, setIsCooldown] = useState(false)
  const [showQualityDropdown, setShowQualityDropdown] = useState(false)
  const [showAspectDropdown, setShowAspectDropdown] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { user } = useAuth()
  const { addPendingImage } = usePendingImages()

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files].slice(0, 5))
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating || isCooldown || !user) {
      return
    }

    setIsGenerating(true)
    setIsCooldown(true)
    setIsUploading(selectedFiles.length > 0)

    const currentPrompt = prompt.trim()

    try {
      let referenceUrls: string[] = []
      if (selectedFiles.length > 0) {
        referenceUrls = await uploadMultipleFiles(selectedFiles, user.id)
      }

      setIsUploading(false)

      const result = await generateImage({
        prompt: currentPrompt,
        aspect_ratio: aspectRatio,
        resolution: quality,
        user_id: user.id,
        reference_urls: referenceUrls,
      })

      if (result.success) {
        addPendingImage({
          prompt: currentPrompt,
          aspect_ratio: aspectRatio,
          resolution: quality,
        })

        toast({
          title: "Görsel oluşturuluyor...",
          description: "İşlem tamamlandığında galerinizde görünecektir.",
        })

        setPrompt("")
        setSelectedFiles([])
      } else {
        toast({
          title: "Hata",
          description: result.error || "Bir hata oluştu",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Hata",
        description: "Görsel oluşturulurken bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      setIsUploading(false)
      setTimeout(() => {
        setIsCooldown(false)
      }, COOLDOWN_DURATION)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  return (
    <>
      <Header title="Görsel Oluştur" />

      {/* Ana içerik - Noise texture background */}
      <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Background with noise texture */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-900"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Blur orbs for ambient effect */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-zinc-700/15 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 p-6 pb-48">
          <div className="max-w-6xl mx-auto pt-8">

            {/* Hero Section with 3D Images */}
            <div className="relative flex items-center justify-center min-h-[400px] mb-8">

              {/* Sol görsel - 3D efekt */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotateY: 30 }}
                animate={{ opacity: 1, x: 0, rotateY: 12 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                  style={{
                    transform: "rotateY(-15deg) rotateX(5deg)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <img
                    src={sampleImages.left}
                    alt="AI Generated"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-2xl" />
              </motion.div>

              {/* Sağ görsel - 3D efekt */}
              <motion.div
                initial={{ opacity: 0, x: 100, rotateY: -30 }}
                animate={{ opacity: 1, x: 0, rotateY: -12 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative w-72 h-64 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                  style={{
                    transform: "rotateY(15deg) rotateX(-5deg)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <img
                    src={sampleImages.right}
                    alt="AI Generated"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-br from-zinc-500 to-zinc-700 rounded-2xl" />
              </motion.div>

              {/* Merkez içerik */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center z-20 px-4"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-white">Nairoo </span>
                  <span className="bg-gradient-to-r from-zinc-300 via-white to-zinc-300 bg-clip-text text-transparent">
                    AI
                  </span>
                </motion.h1>
                <motion.p
                  className="text-zinc-400 text-lg md:text-xl max-w-md mx-auto mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Görsellerinizi düzenleyin veya yeni görseller oluşturun.
                </motion.p>

                {/* Feature Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center justify-center gap-4 flex-wrap"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="relative w-32 h-44 md:w-36 md:h-48 rounded-3xl bg-gradient-to-b from-zinc-700 to-zinc-800 p-[1px] overflow-hidden shadow-xl shadow-black/40 border border-zinc-600/30">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative h-full w-full rounded-3xl bg-gradient-to-b from-zinc-800 to-zinc-900 flex flex-col items-center justify-center p-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-sm font-semibold text-white text-center mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-[10px] text-zinc-400 text-center leading-tight">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Seçilen dosyalar */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-[680px] px-4 md:ml-9"
          >
            <div className="flex gap-2 p-3 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-14 h-14 object-cover rounded-lg border border-zinc-700"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-zinc-700 hover:bg-zinc-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prompt Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[680px] px-4 md:ml-9"
      >
        <div className="animate-float">
          <div className="relative flex items-center gap-2 p-2.5 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-2xl">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File upload button */}
            <button
              onClick={handleFileUpload}
              className={cn(
                "shrink-0 w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200",
                selectedFiles.length > 0
                  ? "bg-white text-black"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
              )}
            >
              <ImagePlusIcon className="w-5 h-5" />
            </button>

            {/* Prompt input */}
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating || isCooldown}
              placeholder={isCooldown ? "Oluşturuluyor..." : "Görselinizi tanımlayın..."}
              className={cn(
                "flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none",
                (isGenerating || isCooldown) && "opacity-50 cursor-not-allowed"
              )}
            />

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              {/* Quality dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowQualityDropdown(!showQualityDropdown)
                    setShowAspectDropdown(false)
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-white transition-colors"
                >
                  <span className="text-zinc-500">Kalite:</span>
                  <span className="font-medium">{quality}</span>
                  <ChevronDown
                    className={cn("w-3 h-3 text-zinc-500 transition-transform", showQualityDropdown && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {showQualityDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute bottom-full mb-2 right-0 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 min-w-[110px] shadow-2xl"
                    >
                      {qualities.map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setQuality(q)
                            setShowQualityDropdown(false)
                          }}
                          className={cn(
                            "w-full px-3 py-2 text-xs rounded-lg text-left transition-all",
                            q === quality ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                          )}
                        >
                          {q}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Aspect ratio dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowAspectDropdown(!showAspectDropdown)
                    setShowQualityDropdown(false)
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-white transition-colors"
                >
                  <span className="font-medium">{aspectRatio}</span>
                  <ChevronDown className={cn("w-3 h-3 text-zinc-500 transition-transform", showAspectDropdown && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {showAspectDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute bottom-full mb-2 right-0 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 min-w-[160px] max-h-[280px] overflow-y-auto shadow-2xl"
                    >
                      {aspectRatioOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setAspectRatio(option.value)
                            setShowAspectDropdown(false)
                          }}
                          className={cn(
                            "w-full px-3 py-2 text-xs rounded-lg text-left transition-all",
                            option.value === aspectRatio
                              ? "bg-white text-black font-medium"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating || isCooldown || !user}
                className={cn(
                  "flex items-center justify-center rounded-xl transition-all duration-200 w-11 h-11",
                  prompt.trim() && !isGenerating && !isCooldown && user
                    ? "bg-white text-black hover:bg-zinc-200 shadow-lg"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                )}
              >
                {isGenerating || isCooldown ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowUp className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Upload status */}
          {isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-center text-xs text-zinc-500"
            >
              Dosyalar yükleniyor...
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Dropdown backdrop */}
      {(showQualityDropdown || showAspectDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowQualityDropdown(false)
            setShowAspectDropdown(false)
          }}
        />
      )}
    </>
  )
}
