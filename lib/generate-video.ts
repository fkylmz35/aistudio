const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL

export interface GenerateVideoRequest {
  user_id: string
  prompt: string
  mime_type: "image/jpeg" | "image/png" | "image/webp" | "video/mp4" | "video/webm" | null
  file_url: string | null
  duration: 4 | 8 | 12
  resolution: "720p" | "1080p"
  pro: boolean
  aspect_ratio: "16:9" | "9:16"
}

export interface GenerateVideoResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Video üretimi için webhook'a istek gönderir
 * Async çalışır - response beklemez, sadece isteği gönderir
 * @param request - Video üretim parametreleri
 * @returns İstek başarıyla gönderildi mi
 */
export async function generateVideo(request: GenerateVideoRequest): Promise<GenerateVideoResponse> {
  if (!WEBHOOK_URL) {
    return {
      success: false,
      error: "Webhook URL yapılandırılmamış",
    }
  }

  try {
    // Webhook URL'ini videogen endpoint'ine çevir
    const videoWebhookUrl = WEBHOOK_URL.replace("/imagegen", "/videogen")

    const payload = {
      user_id: request.user_id,
      prompt: request.prompt,
      mime_type: request.mime_type,
      file_url: request.file_url,
      duration: request.duration,
      resolution: request.resolution,
      pro: request.pro,
      aspect_ratio: request.aspect_ratio,
    }

    // Fire and forget - response beklemeden istek gönder
    fetch(videoWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Silent fail - webhook async çalışıyor
    })

    // İstek gönderildi olarak başarılı dön
    return {
      success: true,
      message: "Video oluşturma isteği gönderildi",
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "İstek gönderilirken bir hata oluştu",
    }
  }
}

/**
 * Kredi maliyetini hesaplar
 */
export function calculateVideoCredits(
  duration: number,
  pro: boolean,
  resolution: "720p" | "1080p",
  isVideoFile: boolean
): number {
  let creditPerSecond = 0

  if (isVideoFile) {
    // Video to Video (Kling O1)
    creditPerSecond = 9
  } else if (pro) {
    // Pro mode
    creditPerSecond = resolution === "1080p" ? 35 : 21
  } else {
    // Standard mode
    creditPerSecond = 7
  }

  return creditPerSecond * duration
}
