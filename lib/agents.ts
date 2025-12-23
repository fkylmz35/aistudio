import { ImageIcon, Video, Sparkles, Film, Wand2, ShoppingBag, Edit } from "lucide-react"

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
  isNairooModel: boolean
}

export const agents: Agent[] = [
  {
    slug: "gorsel-olustur",
    name: "Nairoo Görsel",
    description: "Metinden yüksek kaliteli görseller oluşturun. 4K'ya kadar çözünürlük desteği.",
    longDescription: "Yapay zeka destekli görsel üretim aracı. Promptlarınızı saniyeler içinde profesyonel görsellere dönüştürün. Standart'tan 4K'ya kadar farklı çözünürlük seçenekleri ile ihtiyacınıza uygun görseller oluşturun.",
    icon: ImageIcon,
    tags: ["Nairoo", "Görsel", "Üretim"],
    creditCost: 8,
    isActive: true,
    thumbnail: "/agents/gorsel-olustur.jpg",
    features: [
      "4K'ya kadar çözünürlük",
      "Çoklu aspect ratio desteği",
      "Referans görsel yükleme",
      "Akıllı prompt analizi"
    ],
    isNairooModel: true
  },
  {
    slug: "video-olustur",
    name: "Nairoo Video",
    description: "Promptlarınızdan etkileyici videolar oluşturun.",
    longDescription: "AI destekli video üretim aracı. Metin promptlarından kısa videolar ve animasyonlar oluşturun.",
    icon: Video,
    tags: ["Nairoo", "Video", "Üretim"],
    creditCost: 20,
    isActive: false,
    thumbnail: "/agents/video-olustur.jpg",
    features: [
      "Metin → Video dönüşüm",
      "Farklı video stilleri",
      "Yüksek kalite çıktı"
    ],
    isNairooModel: true
  },
  {
    slug: "ugc-gorsel",
    name: "Nairoo UGC Görsel v2",
    description: "Kullanıcı tarafından oluşturulmuş içerik stilinde görseller üretin.",
    longDescription: "Sosyal medya ve reklam kampanyaları için otantik görünümlü UGC görselleri oluşturun. Gerçek kullanıcı içerikleri gibi görünen profesyonel görseller.",
    icon: Sparkles,
    tags: ["Nairoo", "UGC", "Görsel"],
    creditCost: 12,
    isActive: false,
    thumbnail: "/agents/ugc-gorsel.jpg",
    features: [
      "Otantik UGC stili",
      "Sosyal medya optimizasyonu",
      "Çoklu format desteği"
    ],
    isNairooModel: true
  },
  {
    slug: "ugc-video",
    name: "Nairoo UGC Video v2",
    description: "Kullanıcı tarafından oluşturulmuş içerik stilinde videolar üretin.",
    longDescription: "TikTok, Instagram Reels ve YouTube Shorts için UGC tarzı videolar oluşturun. Reklam kampanyalarınız için gerçekçi içerikler.",
    icon: Film,
    tags: ["Nairoo", "UGC", "Video"],
    creditCost: 30,
    isActive: false,
    thumbnail: "/agents/ugc-video.jpg",
    features: [
      "Kısa video formatları",
      "Platform optimizasyonu",
      "Gerçekçi UGC stili"
    ],
    isNairooModel: true
  },
  {
    slug: "gorsel-duzenleme",
    name: "Nairoo Edit v1.5",
    description: "Mevcut görsellerinizi AI ile düzenleyin ve geliştirin.",
    longDescription: "Fotoğraflarınızı AI ile düzenleyin. Arka plan değiştirme, nesne silme, renk düzeltme ve daha fazlası.",
    icon: Edit,
    tags: ["Nairoo", "Düzenleme", "Görsel"],
    creditCost: 6,
    isActive: false,
    thumbnail: "/agents/gorsel-duzenleme.jpg",
    features: [
      "Arka plan değiştirme",
      "Nesne silme/ekleme",
      "Renk düzeltme"
    ],
    isNairooModel: true
  },
  {
    slug: "e-ticaret-gorsel",
    name: "Nairoo Ürün Görsel",
    description: "Ürün fotoğraflarınız için profesyonel görseller oluşturun.",
    longDescription: "E-ticaret mağazanız için ürün görsellerini optimize edin. Profesyonel arka planlar, lifestyle fotoğraflar ve ürün sunumları.",
    icon: ShoppingBag,
    tags: ["Nairoo", "E-Ticaret", "Ürün"],
    creditCost: 10,
    isActive: false,
    thumbnail: "/agents/e-ticaret.jpg",
    features: [
      "Ürün fotoğrafı düzenleme",
      "Profesyonel arka planlar",
      "Lifestyle görseller"
    ],
    isNairooModel: true
  }
]

export const agentTags = [
  "Tümü",
  "Nairoo",
  "Görsel",
  "Video",
  "UGC",
  "Düzenleme",
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
  if (tag === "Nairoo") return agents.filter(agent => agent.isNairooModel)
  return agents.filter(agent => agent.tags.includes(tag))
}

export const getNairooAgents = (): Agent[] => {
  return agents.filter(agent => agent.isNairooModel)
}

export const getOtherAgents = (): Agent[] => {
  return agents.filter(agent => !agent.isNairooModel)
}

// Hero banner data for carousel
export const heroBanners = [
  {
    id: 1,
    agentSlug: "gorsel-olustur",
    title: "Nairoo ile Görsel Üretin",
    description: "Hayal gücünüzü saniyeler içinde profesyonel görsellere dönüştürün",
    gradient: "from-purple-600/20 via-pink-500/10 to-transparent",
    image: "/banners/gorsel-banner.jpg"
  },
  {
    id: 2,
    agentSlug: "video-olustur",
    title: "Nairoo Video Üretimi",
    description: "Metinden etkileyici videolar oluşturun - Yakında",
    gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
    image: "/banners/video-banner.jpg"
  },
  {
    id: 3,
    agentSlug: "ugc-gorsel",
    title: "Nairoo UGC Stüdyosu",
    description: "Otantik kullanıcı içerikleri gibi görünen profesyonel görseller",
    gradient: "from-amber-600/20 via-orange-500/10 to-transparent",
    image: "/banners/ugc-banner.jpg"
  },
  {
    id: 4,
    agentSlug: "e-ticaret-gorsel",
    title: "E-Ticaret için Nairoo",
    description: "Ürünlerinizi profesyonel görseller ile öne çıkarın",
    gradient: "from-green-600/20 via-emerald-500/10 to-transparent",
    image: "/banners/eticaret-banner.jpg"
  }
]
