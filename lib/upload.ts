import { supabase } from "@/lib/supabase-browser"

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

/**
 * Dosyayı Supabase Storage'a yükler ve public URL döndürür
 * @param file - Yüklenecek dosya
 * @param userId - Kullanıcı ID'si (dosya yolunda kullanılır)
 * @returns Public URL veya hata
 */
export async function uploadToStorage(file: File, userId: string): Promise<UploadResult> {
  try {
    // Benzersiz dosya adı oluştur (flat structure - no folders)
    const fileExt = file.name.split(".").pop()
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
