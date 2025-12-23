"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
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
  Brain,
  Sparkles,
  Monitor,
  Cpu,
  ShoppingBag,
  Instagram,
  Eye,
  Camera,
  UserCheck,
  Loader2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const capabilities = [
  {
    icon: Brain,
    title: "Claude ile Akıllı Prompt Analizi",
    description: "Promptlarınız otomatik olarak analiz edilir ve optimize edilir",
  },
  {
    icon: Sparkles,
    title: "Sıfırdan Görsel Üretme",
    description: "Hayal gücünüzü saniyeler içinde görsele dönüştürün",
  },
  {
    icon: Monitor,
    title: "4K'ya Kadar Çözünürlük",
    description: "Ultra yüksek kalitede görseller oluşturun",
  },
  {
    icon: Cpu,
    title: "Nano Banana Pro Modeli",
    description: "En son nesil AI modeli ile üstün sonuçlar",
  },
  {
    icon: ShoppingBag,
    title: "E-Ticaret Görsel Düzenleme",
    description: "Ürün fotoğraflarınızı profesyonelce düzenleyin",
  },
  {
    icon: Instagram,
    title: "Sosyal Medya Görselleri",
    description: "Platformlara özel optimize edilmiş içerikler",
  },
  {
    icon: Eye,
    title: "Üst Düzey Gerçekçilik",
    description: "Fotogerçekçi sonuçlar ile fark edilemez kalite",
  },
  {
    icon: Camera,
    title: "Doğal Fotoğraf Estetiği",
    description: "Günlük yaşam karelerinin doğallığını yakalayın",
  },
  {
    icon: UserCheck,
    title: "Kişilik Koruma",
    description: "Düzenlemelerde özgün karakteristikleri muhafaza edin",
  },
]

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const COOLDOWN_DURATION = 4000 // 4 saniye cooldown

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
      setSelectedFiles((prev) => [...prev, ...files].slice(0, 5)) // Max 5 dosya
    }
    // Input'u temizle ki aynı dosya tekrar seçilebilsin
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

    // Prompt'u kaydet (formu temizlemeden önce)
    const currentPrompt = prompt.trim()

    try {
      // Dosyaları yükle
      let referenceUrls: string[] = []
      if (selectedFiles.length > 0) {
        referenceUrls = await uploadMultipleFiles(selectedFiles, user.id)
      }

      setIsUploading(false)

      // Webhook'a istek gönder
      const result = await generateImage({
        prompt: currentPrompt,
        aspect_ratio: aspectRatio,
        resolution: quality,
        user_id: user.id,
        reference_urls: referenceUrls,
      })

      if (result.success) {
        // Pending image ekle
        addPendingImage({
          prompt: currentPrompt,
          aspect_ratio: aspectRatio,
          resolution: quality,
        })

        toast({
          title: "Görsel oluşturuluyor...",
          description: "İşlem tamamlandığında galerinizde görünecektir.",
        })

        // Formu temizle
        setPrompt("")
        setSelectedFiles([])
      } else {
        toast({
          title: "Hata",
          description: result.error || "Bir hata oluştu",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Generate error:", error)
      toast({
        title: "Hata",
        description: "Görsel oluşturulurken bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      setIsUploading(false)
      // Cooldown timer - belirli süre sonra tekrar aktif et
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
      <div className="p-6 pb-32">
        <div className="max-w-4xl mx-auto pt-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <h2 className="text-xl text-white mb-1.5 md:text-4xl font-normal">Nairoo AI Studio neler yapabilir?</h2>
              <p className="text-zinc-500 text-xs max-w-sm mx-auto">
                Yaratıcılığınızı sınırsız kılacak güçlü özellikler
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5"
            >
              {capabilities.map((capability, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.01 }} className="group relative">
                  <div className="relative p-4 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg transition-all duration-150 ease-out hover:border-white/[0.15] hover:-translate-y-0.5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] group-hover:bg-white/[0.08] transition-colors duration-150">
                        <capability.icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-150" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-medium text-zinc-200 mb-0.5 group-hover:text-white transition-colors">
                          {capability.title}
                        </h3>
                        <p className="text-[11px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Seçilen dosyalar */}
      {selectedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-[680px] px-4 md:ml-9"
        >
          <div className="flex gap-2 p-2 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg shadow-sm">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[680px] px-4 md:ml-9"
      >
        <div className="animate-float">
          <div className="relative flex items-center gap-2 p-2 bg-[#0c0c0c]/95 border border-white/[0.08] shadow-sm rounded-xl">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleFileUpload}
              className={cn(
                "shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-colors",
                selectedFiles.length > 0
                  ? "bg-white/20 text-white"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400"
              )}
            >
              <ImagePlusIcon className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating || isCooldown}
              placeholder={isCooldown ? "Oluşturuluyor..." : "Görselinizi tanımlayın..."}
              className={cn(
                "flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none",
                (isGenerating || isCooldown) && "opacity-50 cursor-not-allowed"
              )}
            />

            <div className="flex items-center gap-1">
              <div className="relative">
                <button
                  onClick={() => {
                    setShowQualityDropdown(!showQualityDropdown)
                    setShowAspectDropdown(false)
                  }}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 text-xs text-white hover:bg-white/10 transition-colors"
                >
                  <span className="text-zinc-400">Kalite:</span>
                  {quality}
                  <ChevronDown
                    className={cn("w-3 h-3 text-zinc-400 transition-transform", showQualityDropdown && "rotate-180")}
                  />
                </button>
                {showQualityDropdown && (
                  <div className="absolute bottom-full mb-2 right-0 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg p-1 min-w-[100px] shadow-sm">
                    {qualities.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setQuality(q)
                          setShowQualityDropdown(false)
                        }}
                        className={cn(
                          "w-full px-3 py-1.5 text-xs rounded text-left transition-colors",
                          q === quality ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5",
                        )}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setShowAspectDropdown(!showAspectDropdown)
                    setShowQualityDropdown(false)
                  }}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {aspectRatio}
                  <ChevronDown className={cn("w-3 h-3 transition-transform", showAspectDropdown && "rotate-180")} />
                </button>
                {showAspectDropdown && (
                  <div className="absolute bottom-full mb-2 left-0 bg-[#0c0c0c]/95 border border-white/[0.08] rounded-lg p-1 min-w-[160px] max-h-[300px] overflow-y-auto shadow-sm">
                    {aspectRatioOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setAspectRatio(option.value)
                          setShowAspectDropdown(false)
                        }}
                        className={cn(
                          "w-full px-3 py-1.5 text-xs rounded text-left transition-colors",
                          option.value === aspectRatio
                            ? "bg-white/10 text-white"
                            : "text-zinc-400 hover:text-white hover:bg-white/5",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating || isCooldown || !user}
                className={cn(
                  "flex items-center justify-center rounded-lg transition-all duration-150 w-10 h-10",
                  prompt.trim() && !isGenerating && !isCooldown && user
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-white/[0.08] text-zinc-500 cursor-not-allowed",
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

          {/* Upload durumu */}
          {isUploading && (
            <div className="mt-2 text-center text-xs text-zinc-400">
              Dosyalar yükleniyor...
            </div>
          )}
        </div>
      </motion.div>

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
