const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL

export interface GenerateImageRequest {
  prompt: string
  aspect_ratio: string
  resolution: string
  user_id: string
  reference_urls?: string[]
}

export interface GenerateImageResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Görsel üretimi için webhook'a istek gönderir
 * Async çalışır - response beklemez, sadece isteği gönderir
 * @param request - Görsel üretim parametreleri
 * @returns İstek başarıyla gönderildi mi
 */
export async function generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
  if (!WEBHOOK_URL) {
    console.error("[Webhook] NEXT_PUBLIC_WEBHOOK_URL is not configured")
    return {
      success: false,
      error: "Webhook URL yapılandırılmamış",
    }
  }

  try {
    const payload = {
      prompt: request.prompt,
      aspect_ratio: request.aspect_ratio,
      resolution: request.resolution,
      user_id: request.user_id,
      reference_urls: request.reference_urls || [],
    }

    // Fire and forget - response beklemeden istek gönder
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.error("[Webhook] Error:", error)
    })

    // İstek gönderildi olarak başarılı dön
    return {
      success: true,
      message: "Görsel oluşturma isteği gönderildi",
    }
  } catch (error) {
    console.error("[Webhook] Generate image error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "İstek gönderilirken bir hata oluştu",
    }
  }
}

