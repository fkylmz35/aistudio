import { ImageIcon, Video, Sparkles, Film, Wand2, ShoppingBag, Instagram, Edit } from "lucide-react"

export interface Agent {
  slug: string
  name: string
  description: string
  longDescription: string
  icon: typeof ImageIcon
  tags: string[]
  creditCost: number
  isActive: boolean
  thumbnail: string
  features: string[]
}

export const agents: Agent[] = [
  {
    slug: "gorsel-olustur",
    name: "Görsel Oluştur",
    description: "Metinden yüksek kaliteli görseller oluşturun. 4K'ya kadar çözünürlük desteği.",
    longDescription: "Yapay zeka destekli görsel üretim aracı. Promptlarınızı saniyeler içinde profesyonel görsellere dönüştürün. Standart'tan 4K'ya kadar farklı çözünürlük seçenekleri ile ihtiyacınıza uygun görseller oluşturun.",
    icon: ImageIcon,
    tags: ["Görsel", "AI", "Üretim"],
    creditCost: 80,
    isActive: true,
    thumbnail: "/agents/gorsel-olustur.jpg",
    features: [
      "4K'ya kadar çözünürlük",
      "Çoklu aspect ratio desteği",
      "Referans görsel yükleme",
      "Akıllı prompt analizi"
    ]
  },
  {
    slug: "video-olustur",
    name: "Video Oluştur",
    description: "Promptlarınızdan etkileyici videolar oluşturun.",
    longDescription: "AI destekli video üretim aracı. Metin promptlarından kısa videolar ve animasyonlar oluşturun.",
    icon: Video,
    tags: ["Video", "AI", "Üretim"],
    creditCost: 200,
    isActive: false,
    thumbnail: "/agents/video-olustur.jpg",
    features: [
      "Metin → Video dönüşüm",
      "Farklı video stilleri",
      "Yüksek kalite çıktı"
    ]
  },
  {
    slug: "ugc-gorsel",
    name: "UGC Görsel",
    description: "Kullanıcı tarafından oluşturulmuş içerik stilinde görseller üretin.",
    longDescription: "Sosyal medya ve reklam kampanyaları için otantik görünümlü UGC görselleri oluşturun. Gerçek kullanıcı içerikleri gibi görünen profesyonel görseller.",
    icon: Sparkles,
    tags: ["UGC", "Sosyal Medya", "Görsel"],
    creditCost: 120,
    isActive: false,
    thumbnail: "/agents/ugc-gorsel.jpg",
    features: [
      "Otantik UGC stili",
      "Sosyal medya optimizasyonu",
      "Çoklu format desteği"
    ]
  },
  {
    slug: "ugc-video",
    name: "UGC Video",
    description: "Kullanıcı tarafından oluşturulmuş içerik stilinde videolar üretin.",
    longDescription: "TikTok, Instagram Reels ve YouTube Shorts için UGC tarzı videolar oluşturun. Reklam kampanyalarınız için gerçekçi içerikler.",
    icon: Film,
    tags: ["UGC", "Video", "Sosyal Medya"],
    creditCost: 300,
    isActive: false,
    thumbnail: "/agents/ugc-video.jpg",
    features: [
      "Kısa video formatları",
      "Platform optimizasyonu",
      "Gerçekçi UGC stili"
    ]
  },
  {
    slug: "gorsel-duzenleme",
    name: "Görsel Düzenleme",
    description: "Mevcut görsellerinizi AI ile düzenleyin ve geliştirin.",
    longDescription: "Fotoğraflarınızı AI ile düzenleyin. Arka plan değiştirme, nesne silme, renk düzeltme ve daha fazlası.",
    icon: Edit,
    tags: ["Düzenleme", "Görsel", "AI"],
    creditCost: 60,
    isActive: false,
    thumbnail: "/agents/gorsel-duzenleme.jpg",
    features: [
      "Arka plan değiştirme",
      "Nesne silme/ekleme",
      "Renk düzeltme"
    ]
  },
  {
    slug: "e-ticaret-gorsel",
    name: "E-Ticaret Görsel",
    description: "Ürün fotoğraflarınız için profesyonel görseller oluşturun.",
    longDescription: "E-ticaret mağazanız için ürün görsellerini optimize edin. Profesyonel arka planlar, lifestyle fotoğraflar ve ürün sunumları.",
    icon: ShoppingBag,
    tags: ["E-Ticaret", "Ürün", "Görsel"],
    creditCost: 100,
    isActive: false,
    thumbnail: "/agents/e-ticaret.jpg",
    features: [
      "Ürün fotoğrafı düzenleme",
      "Profesyonel arka planlar",
      "Lifestyle görseller"
    ]
  },
  {
    slug: "sosyal-medya",
    name: "Sosyal Medya",
    description: "Instagram, TikTok ve diğer platformlar için optimized içerikler.",
    longDescription: "Sosyal medya platformları için özel tasarlanmış görseller ve videolar. Doğru boyutlar, trendler ve stil önerileri.",
    icon: Instagram,
    tags: ["Sosyal Medya", "Instagram", "TikTok"],
    creditCost: 80,
    isActive: false,
    thumbnail: "/agents/sosyal-medya.jpg",
    features: [
      "Platform boyut optimizasyonu",
      "Trend analizi",
      "Hashtag önerileri"
    ]
  }
]

export const agentTags = [
  "Tümü",
  "Görsel",
  "Video",
  "UGC",
  "Düzenleme",
  "Sosyal Medya",
  "E-Ticaret"
]

export const getAgentBySlug = (slug: string): Agent | undefined => {
  return agents.find(agent => agent.slug === slug)
}

export const getActiveAgents = (): Agent[] => {
  return agents.filter(agent => agent.isActive)
}

export const getAgentsByTag = (tag: string): Agent[] => {
  if (tag === "Tümü") return agents
  return agents.filter(agent => agent.tags.includes(tag))
}

// Hero banner data for carousel
export const heroBanners = [
  {
    id: 1,
    agentSlug: "gorsel-olustur",
    title: "AI ile Görsel Üretin",
    description: "Hayal gücünüzü saniyeler içinde profesyonel görsellere dönüştürün",
    gradient: "from-purple-600/20 via-pink-500/10 to-transparent",
    image: "/banners/gorsel-banner.jpg"
  },
  {
    id: 2,
    agentSlug: "video-olustur",
    title: "Yapay Zeka Video Üretimi",
    description: "Metinden etkileyici videolar oluşturun - Yakında",
    gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
    image: "/banners/video-banner.jpg"
  },
  {
    id: 3,
    agentSlug: "ugc-gorsel",
    title: "UGC İçerik Stüdyosu",
    description: "Otantik kullanıcı içerikleri gibi görünen profesyonel görseller",
    gradient: "from-amber-600/20 via-orange-500/10 to-transparent",
    image: "/banners/ugc-banner.jpg"
  },
  {
    id: 4,
    agentSlug: "e-ticaret-gorsel",
    title: "E-Ticaret için AI",
    description: "Ürünlerinizi profesyonel görseller ile öne çıkarın",
    gradient: "from-green-600/20 via-emerald-500/10 to-transparent",
    image: "/banners/eticaret-banner.jpg"
  }
]
