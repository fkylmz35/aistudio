import { supabase } from "@/lib/supabase-browser"

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

// İzin verilen MIME tipleri
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
]

// İzin verilen dosya uzantıları
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "svg"]

/**
 * Dosya tipini doğrular
 * @param file - Kontrol edilecek dosya
 * @returns Dosya tipi geçerli mi
 */
function validateFileType(file: File): boolean {
  // MIME type kontrolü
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return false
  }

  // Dosya uzantısı kontrolü
  const ext = file.name.split(".").pop()?.toLowerCase()
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return false
  }

  return true
}

/**
 * Dosyayı Supabase Storage'a yükler ve public URL döndürür
 * @param file - Yüklenecek dosya
 * @param userId - Kullanıcı ID'si (dosya yolunda kullanılır)
 * @returns Public URL veya hata
 */
export async function uploadToStorage(file: File, userId: string): Promise<UploadResult> {
  try {
    // Dosya tipi doğrulaması
    if (!validateFileType(file)) {
      return {
        success: false,
        error: "Geçersiz dosya tipi. Sadece görsel dosyaları (jpg, png, gif, webp, svg) yüklenebilir.",
      }
    }

    // Benzersiz dosya adı oluştur (flat structure - no folders)
    const fileExt = file.name.split(".").pop()?.toLowerCase()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    // File'ı ArrayBuffer'a çevir
    const arrayBuffer = await file.arrayBuffer()
    const fileBlob = new Blob([arrayBuffer], { type: file.type })

    // Dosyayı yükle
    const { data, error } = await supabase.storage
      .from("temp-uploads")
      .upload(fileName, fileBlob, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      })

    if (error) {
      console.error("[Upload] Upload error:", error)
      return { success: false, error: error.message }
    }

    // Public URL al
    const { data: urlData } = supabase.storage
      .from("temp-uploads")
      .getPublicUrl(data.path)

    return {
      success: true,
      url: urlData.publicUrl,
    }
  } catch (error) {
    console.error("[Upload] Upload exception:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Dosya yüklenirken bir hata oluştu",
    }
  }
}

/**
 * Birden fazla dosyayı yükler
 * @param files - Yüklenecek dosyalar
 * @param userId - Kullanıcı ID'si
 * @returns Public URL'lerin listesi
 */
export async function uploadMultipleFiles(files: File[], userId: string): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadToStorage(file, userId))
  const results = await Promise.all(uploadPromises)

  return results
    .filter((result) => result.success && result.url)
    .map((result) => result.url as string)
}
