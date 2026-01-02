"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { uploadToStorage } from "@/lib/upload"
import { generateVideo, calculateVideoCredits } from "@/lib/generate-video"
import {
  Upload,
  ChevronDown,
  FileText,
  Settings,
  Film,
  X,
  Loader2,
  Play,
  Image as ImageIcon,
  Video,
  Clock,
  Zap,
  Wand2,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Nasıl çalışır adımları
const howItWorksSteps = [
  {
    icon: FileText,
    title: "İçeriğinizi Girin",
    description: "Metin yazın, görsel yükleyin veya video ekleyin",
    detail: "Sürükle-bırak ile kolay yükleme",
  },
  {
    icon: Settings,
    title: "Ayarlarınızı Seçin",
    description: "Süre, kalite ve en/boy oranını belirleyin",
    detail: "4-12 saniye, Standard veya Pro kalite",
  },
  {
    icon: Wand2,
    title: "AI Analiz ve Optimizasyon",
    description: "Nairoo AI içeriğinizi analiz eder ve optimize eder",
    detail: "Türkçe prompt'lar otomatik çevrilir",
  },
  {
    icon: Film,
    title: "Videonuzu Alın",
    description: "2-3 dakika içinde videonuz hazır",
    detail: "Otomatik olarak galerinize eklenir",
  },
]

// Özellikler
const features = [
  {
    icon: FileText,
    title: "Metinden Video",
    description: "Açıklamadan video oluştur",
  },
  {
    icon: ImageIcon,
    title: "Görselden Video",
    description: "Görselleri canlandır",
  },
  {
    icon: Video,
    title: "Video Düzenleme",
    description: "Videoları dönüştür",
  },
]

// Süre seçenekleri
const durationOptions = [4, 8, 12] as const

// En/boy oranı seçenekleri
const aspectRatioOptions = [
  { value: "16:9", label: "16:9", desc: "Yatay" },
  { value: "9:16", label: "9:16", desc: "Dikey" },
] as const

// Animasyon varyantları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const COOLDOWN_DURATION = 5000

// Animated number component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const duration = 300
    const startValue = displayValue
    const difference = value - startValue
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(startValue + difference * easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return <span>{displayValue}</span>
}

export default function VideoOlusturPage() {
  const [prompt, setPrompt] = useState("")
  const [duration, setDuration] = useState<4 | 8 | 12>(4)
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9")
  const [pro, setPro] = useState(false)
  const [resolution, setResolution] = useState<"720p" | "1080p">("720p")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCooldown, setIsCooldown] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)
  const [showAspectDropdown, setShowAspectDropdown] = useState(false)
  const [showResolutionDropdown, setShowResolutionDropdown] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  // Dosya video mu?
  const isVideoFile = selectedFile?.type?.startsWith("video/") || false

  // Kredi hesaplama
  const totalCredits = calculateVideoCredits(duration, pro, resolution, isVideoFile)

  // Dosya seçme
  const handleFileSelect = (file: File) => {
    const isImage = file.type.startsWith("image/")
    const isVideo = file.type.startsWith("video/")

    if (!isImage && !isVideo) {
      toast({
        title: "Geçersiz dosya",
        description: "Sadece görsel ve video dosyaları yüklenebilir",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)

    // Preview oluştur
    if (isImage) {
      setFilePreview(URL.createObjectURL(file))
    } else {
      setFilePreview(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removeFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
  }

  const handleGenerate = async () => {
    if ((!prompt.trim() && !selectedFile) || isGenerating || isCooldown || !user) {
      return
    }

    setIsGenerating(true)
    setIsCooldown(true)
    setIsUploading(selectedFile !== null)

    const currentPrompt = prompt.trim()

    try {
      let fileUrl: string | null = null
      let mimeType: "image/jpeg" | "image/png" | "image/webp" | "video/mp4" | "video/webm" | null = null

      if (selectedFile) {
        const uploadResult = await uploadToStorage(selectedFile, user.id)
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.error || "Dosya yüklenemedi")
        }
        fileUrl = uploadResult.url

        if (selectedFile.type === "image/jpeg") mimeType = "image/jpeg"
        else if (selectedFile.type === "image/png") mimeType = "image/png"
        else if (selectedFile.type === "image/webp") mimeType = "image/webp"
        else if (selectedFile.type === "video/mp4") mimeType = "video/mp4"
        else if (selectedFile.type === "video/webm") mimeType = "video/webm"
      }

      setIsUploading(false)

      const result = await generateVideo({
        user_id: user.id,
        prompt: currentPrompt,
        mime_type: mimeType,
        file_url: fileUrl,
        duration,
        resolution: pro ? resolution : "720p",
        pro,
        aspect_ratio: aspectRatio,
      })

      if (result.success) {
        toast({
          title: "Video oluşturuluyor...",
          description: "İşlem tamamlandığında galerinizde görünecektir.",
        })

        setPrompt("")
        setSelectedFile(null)
        setFilePreview(null)
      } else {
        toast({
          title: "Hata",
          description: result.error || "Bir hata oluştu",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Video oluşturulurken bir hata oluştu",
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

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview)
      }
    }
  }, [filePreview])

  // Close dropdowns when clicking outside
  const closeAllDropdowns = () => {
    setShowDurationDropdown(false)
    setShowAspectDropdown(false)
    setShowResolutionDropdown(false)
  }

  return (
    <>
      <Header title="Nairoo Video" />
      <div
        className="p-6 pb-52"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Drag overlay */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <p className="text-2xl font-medium text-white mb-2">Dosyayı buraya bırakın</p>
                <p className="text-zinc-400">Görsel veya video dosyası</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto pt-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-white">Nairoo </span>
                <span className="bg-gradient-to-r from-zinc-300 via-white to-zinc-300 bg-clip-text text-transparent">
                  Video
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto"
            >
              Metinden, görselden veya videodan profesyonel videolar oluşturun
            </motion.p>
          </motion.div>

          {/* Features Row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-8 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -2 }}
                className="group cursor-pointer text-center"
              >
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-800 group-hover:border-zinc-700 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">{feature.title}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-700" />
              <h2 className="text-lg font-medium text-zinc-300">Nasıl Çalışır?</h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-700" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  <div className="h-full p-5 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl transition-all duration-300 hover:bg-zinc-900/50 hover:border-zinc-700">
                    {/* Step number */}
                    <div className="absolute -top-3 -left-2 w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center text-xs font-bold shadow-lg">
                      {index + 1}
                    </div>

                    {/* Arrow connector */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-4 h-4 text-zinc-700" />
                      </div>
                    )}

                    <div className="flex flex-col items-center text-center pt-2">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-800/50 border border-zinc-700/50 mb-3 group-hover:bg-zinc-800 group-hover:border-zinc-600 transition-all">
                        <step.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                      </div>
                      <h3 className="text-sm font-medium text-zinc-200 mb-1">{step.title}</h3>
                      <p className="text-xs text-zinc-500 mb-2">{step.description}</p>
                      <p className="text-[10px] text-zinc-600">{step.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Selected file preview */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-40 left-1/2 -translate-x-1/2 z-50 w-full max-w-[680px] px-4 md:ml-9"
          >
            <div className="flex items-center gap-3 p-3 bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-sm">
              <div className="relative group">
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border border-zinc-700"
                  />
                ) : (
                  <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                    <Video className="w-8 h-8 text-zinc-400" />
                  </div>
                )}
                <button
                  onClick={removeFile}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-700 hover:bg-zinc-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate font-medium">{selectedFile.name}</p>
                <p className="text-xs text-zinc-500">
                  {isVideoFile ? "Video dosyası" : "Görsel dosyası"} • {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {isVideoFile && (
                <div className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg">
                  <p className="text-xs text-zinc-300 font-medium">Video Edit</p>
                </div>
              )}
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
          {/* Settings Row */}
          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            {/* Duration Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowDurationDropdown(!showDurationDropdown)
                  setShowAspectDropdown(false)
                  setShowResolutionDropdown(false)
                }}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-900/95 border border-zinc-800 rounded-xl text-sm hover:border-zinc-700 hover:bg-zinc-800/95 transition-all"
              >
                <Clock className="w-4 h-4 text-zinc-500" />
                <span className="text-white font-medium">{duration}s</span>
                <ChevronDown className={cn("w-3 h-3 text-zinc-500 transition-transform", showDurationDropdown && "rotate-180")} />
              </button>
              <AnimatePresence>
                {showDurationDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute bottom-full mb-2 left-0 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 min-w-[120px] shadow-2xl"
                  >
                    {durationOptions.map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setDuration(d)
                          setShowDurationDropdown(false)
                        }}
                        className={cn(
                          "w-full px-3 py-2 text-sm rounded-lg text-left transition-all",
                          d === duration ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        )}
                      >
                        {d} saniye
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pro Toggle */}
            <button
              onClick={() => setPro(!pro)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                pro
                  ? "bg-white text-black shadow-lg"
                  : "bg-zinc-900/95 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
              )}
            >
              <Zap className={cn("w-4 h-4", pro && "text-black")} />
              <span>{pro ? "Pro" : "Standard"}</span>
            </button>

            {/* Resolution Selector (always visible when Pro) */}
            <AnimatePresence>
              {pro && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: "auto" }}
                  exit={{ opacity: 0, scale: 0.95, width: 0 }}
                  className="relative overflow-visible"
                >
                  <button
                    onClick={() => {
                      setShowResolutionDropdown(!showResolutionDropdown)
                      setShowDurationDropdown(false)
                      setShowAspectDropdown(false)
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-zinc-900/95 border border-zinc-800 rounded-xl text-sm hover:border-zinc-700 hover:bg-zinc-800/95 transition-all whitespace-nowrap"
                  >
                    <span className="text-white font-medium">{resolution}</span>
                    <ChevronDown className={cn("w-3 h-3 text-zinc-500 transition-transform", showResolutionDropdown && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {showResolutionDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute bottom-full mb-2 left-0 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 min-w-[100px] shadow-2xl z-50"
                      >
                        {(["720p", "1080p"] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              setResolution(r)
                              setShowResolutionDropdown(false)
                            }}
                            className={cn(
                              "w-full px-3 py-2 text-sm rounded-lg text-left transition-all",
                              r === resolution ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Aspect Ratio Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAspectDropdown(!showAspectDropdown)
                  setShowDurationDropdown(false)
                  setShowResolutionDropdown(false)
                }}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-900/95 border border-zinc-800 rounded-xl text-sm hover:border-zinc-700 hover:bg-zinc-800/95 transition-all"
              >
                <span className="text-white font-medium">{aspectRatio}</span>
                <ChevronDown className={cn("w-3 h-3 text-zinc-500 transition-transform", showAspectDropdown && "rotate-180")} />
              </button>
              <AnimatePresence>
                {showAspectDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute bottom-full mb-2 right-0 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 min-w-[130px] shadow-2xl"
                  >
                    {aspectRatioOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setAspectRatio(option.value)
                          setShowAspectDropdown(false)
                        }}
                        className={cn(
                          "w-full px-3 py-2 text-sm rounded-lg text-left transition-all flex items-center justify-between",
                          option.value === aspectRatio ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        )}
                      >
                        <span>{option.label}</span>
                        <span className={cn("text-xs", option.value === aspectRatio ? "text-zinc-600" : "text-zinc-600")}>{option.desc}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Input Bar */}
          <div className="relative flex items-center gap-2 p-2.5 bg-zinc-900/95 border border-zinc-800 shadow-2xl rounded-2xl backdrop-blur-sm">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "shrink-0 w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200",
                selectedFile
                  ? "bg-white text-black"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
              )}
            >
              <Upload className="w-5 h-5" />
            </button>

            {/* Prompt Input */}
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating || isCooldown}
              placeholder={isCooldown ? "Oluşturuluyor..." : "Videonuzu tarif edin veya dosya yükleyin..."}
              className={cn(
                "flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none",
                (isGenerating || isCooldown) && "opacity-50 cursor-not-allowed"
              )}
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={(!prompt.trim() && !selectedFile) || isGenerating || isCooldown || !user}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                (prompt.trim() || selectedFile) && !isGenerating && !isCooldown && user
                  ? "bg-white text-black shadow-lg hover:bg-zinc-100"
                  : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              )}
            >
              {isGenerating || isCooldown ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isUploading ? "Yükleniyor..." : "Oluşturuluyor..."}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Video Oluştur</span>
                  <span className="text-zinc-500">-</span>
                  <span className="text-zinc-500"><AnimatedNumber value={totalCredits} /> Kredi</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Dropdown backdrop */}
      {(showDurationDropdown || showAspectDropdown || showResolutionDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAllDropdowns}
        />
      )}
    </>
  )
}
