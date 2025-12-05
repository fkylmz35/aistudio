const WEBHOOK_URL = "https://n8n.fkylmz.cloud/webhook/imagegen"

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
  try {
    const payload = {
      prompt: request.prompt,
      aspect_ratio: request.aspect_ratio,
      resolution: request.resolution,
      user_id: request.user_id,
      reference_urls: request.reference_urls || [],
    }

    console.log("[Webhook] Sending request to:", WEBHOOK_URL)
    console.log("[Webhook] Payload:", JSON.stringify(payload, null, 2))

    // Fire and forget - response beklemeden istek gönder
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        console.log("[Webhook] Response status:", response.status)
        return response.text()
      })
      .then((text) => {
        console.log("[Webhook] Response body:", text)
      })
      .catch((error) => {
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

