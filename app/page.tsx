"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion, MotionConfig } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Sparkles,
  Check,
  ArrowRight,
  Crown,
  Zap,
  Shield,
  Clock,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ==================== Animation Variants (Optimized) ====================

const staggerContainer = (staggerDelay = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
  },
})

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
}

// ==================== Data ====================

const navLinks = [
  { href: "#products", label: "AI Agentlar" },
  { href: "#how-it-works", label: "Nasıl Kullanılır" },
  { href: "#pricing", label: "Fiyatlandırma" },
  { href: "#about", label: "Hakkımızda" },
]

const heroBanners = [
  {
    id: 1,
    title: "AI ile Görsel Üretin",
    description: "Hayal gücünüzü saniyeler içinde profesyonel görsellere dönüştürün",
    gradient: "from-purple-600/30 via-pink-500/20 to-transparent",
  },
  {
    id: 2,
    title: "Video Üretimi",
    description: "Metinden etkileyici videolar oluşturun - Yakında",
    gradient: "from-blue-600/30 via-cyan-500/20 to-transparent",
  },
  {
    id: 3,
    title: "UGC İçerik Stüdyosu",
    description: "Otantik kullanıcı içerikleri gibi görünen profesyonel görseller",
    gradient: "from-amber-600/30 via-orange-500/20 to-transparent",
  },
  {
    id: 4,
    title: "E-Ticaret için AI",
    description: "Ürünlerinizi profesyonel görseller ile öne çıkarın",
    gradient: "from-green-600/30 via-emerald-500/20 to-transparent",
  },
]

const productFeatures = [
  {
    title: "Özelleştirilmiş AI Modelleri",
    description: "Her ihtiyaca uygun özel eğitilmiş yapay zeka modelleri",
  },
  {
    title: "Görsel, Video, UGC Üretimi",
    description: "Tek platformda tüm içerik ihtiyaçlarınızı karşılayın",
  },
  {
    title: "Türkçe Prompt Desteği",
    description: "Ana dilinizde rahatça içerik üretin",
  },
  {
    title: "Saniyeler İçinde Sonuç",
    description: "Hızlı işlem süreleri ile zaman kaybetmeyin",
  },
]

const steps = [
  { num: "01", title: "Kayıt Ol", description: "Ücretsiz hesap oluştur ve 40 kredi kazan" },
  { num: "02", title: "Agent Seç", description: "İhtiyacına uygun AI agent'ı bul" },
  { num: "03", title: "Prompt Yaz", description: "Türkçe veya İngilizce tanımla" },
  { num: "04", title: "Sonucu Al", description: "Saniyeler içinde içeriğini indir" },
]

const showcaseAgents = [
  { slug: "gorsel-olustur", name: "Görsel Oluşturucu", description: "4K'ya kadar çözünürlükte profesyonel görseller", isActive: true },
  { slug: "video-olustur", name: "Video Oluşturucu", description: "Metinden etkileyici videolar üretin", isActive: false },
  { slug: "ugc-gorsel", name: "UGC Görsel", description: "Sosyal medya için otantik içerikler", isActive: false },
  { slug: "e-ticaret-gorsel", name: "E-Ticaret Düzenleme", description: "Ürün fotoğraflarını profesyonelleştirin", isActive: false },
]

const pricingPackages = [
  { name: "Deneme", credits: 40, price: 0, features: ["Standart kalite", "40 kredi", "Temel özellikler"], isPopular: false, isFree: true },
  { name: "Başlangıç", credits: 100, price: 99, features: ["Tüm kaliteler", "100 kredi/ay", "Öncelikli destek"], isPopular: false, isFree: false },
  { name: "Standart", credits: 250, price: 199, originalPrice: 249, features: ["Tüm kaliteler", "250 kredi/ay", "VIP destek", "%20 tasarruf"], isPopular: true, isFree: false },
  { name: "Pro", credits: 600, price: 399, originalPrice: 599, features: ["Tüm kaliteler", "600 kredi/ay", "Özel destek", "%33 tasarruf"], isPopular: false, isFree: false },
]

// ==================== Components ====================

// Section wrapper with scroll animation (optimized)
function AnimatedSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  )
}

// ==================== Main Component ====================

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Scroll progress for parallax (optimized - only 1 transform)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150])

  // Handle scroll for header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-rotate banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">

        {/* Floating Background Orbs - Optimized (2 orbs, reduced blur) */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            className="absolute rounded-full opacity-20"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              width: 600,
              height: 600,
              filter: "blur(120px)",
              left: "10%",
              top: "15%",
              y: backgroundY,
            }}
            animate={shouldReduceMotion ? {} : {
              x: [0, 80, -40, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute rounded-full opacity-15"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              width: 500,
              height: 500,
              filter: "blur(100px)",
              right: "10%",
              bottom: "20%",
            }}
            animate={shouldReduceMotion ? {} : {
              x: [0, -60, 40, 0],
              y: [0, 40, -60, 0],
              scale: [1, 0.95, 1.1, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Navigation Header */}
        <nav
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled ? "bg-[#0a0a0a]/95 border-b border-white/10" : "bg-transparent"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg overflow-hidden">
                  <Image src="/logo.png" alt="nAIroo" width={36} height={36} className="object-cover w-full h-full" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg font-bold text-white">n<span className="text-zinc-500">AI</span>roo</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login" className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors">
                  Kayıt Ol
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-zinc-400 hover:text-white">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-[#0a0a0a]/98 border-b border-white/10 overflow-hidden"
              >
                <div className="px-4 py-4 space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="block py-2 text-sm text-zinc-400 hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Link href="/login" className="flex-1 py-2 text-center text-sm text-zinc-300 border border-white/20 rounded-lg hover:bg-white/5">
                      Giriş Yap
                    </Link>
                    <Link href="/register" className="flex-1 py-2 text-center text-sm font-medium bg-white text-black rounded-lg">
                      Kayıt Ol
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section - Updated */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          {/* Bottom purple glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-purple-600/20 via-pink-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Logo/Brand */}
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold tracking-tight leading-none">
                  <span className="text-white">n</span>
                  <span className="text-zinc-500">AI</span>
                  <span className="text-white">roo</span>
                </h1>
                <span className="text-base sm:text-lg text-zinc-600 tracking-[0.4em] uppercase font-medium">AI STUDIO</span>
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <p className="text-lg sm:text-xl text-zinc-300">
                  Düşüncelerinizi saniyeler içinde hayata geçirin.
                </p>
                <p className="text-base sm:text-lg text-zinc-500">
                  Sınırsız yaratıcılık, yapay zeka gücüyle.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-8 py-3.5 bg-white text-black font-medium rounded-lg hover:bg-zinc-100 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  Ücretsiz Başla
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-3.5 text-zinc-400 font-medium hover:text-white transition-colors"
                >
                  Giriş Yap
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 sm:gap-16 pt-12">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white">40</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider mt-1">Ücretsiz Kredi</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white">ÖZEL</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider mt-1">AI Modelleri</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white">&lt;30s</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider mt-1">Üretim Süresi</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Carousel Banner Section - Sharp design */}
        <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <div className="relative h-[200px] sm:h-[240px]">
                <AnimatePresence mode="wait">
                  {heroBanners.map(
                    (banner, index) =>
                      index === currentBanner && (
                        <motion.div
                          key={banner.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className={cn("absolute inset-0 bg-gradient-to-br", banner.gradient, "bg-[#0f0f0f]")}
                        >
                          <div className="h-full flex items-center p-8 sm:p-10">
                            <div>
                              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{banner.title}</h3>
                              <p className="text-zinc-400 text-sm sm:text-base max-w-md">{banner.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <button
                onClick={() => setCurrentBanner((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentBanner((prev) => (prev + 1) % heroBanners.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {heroBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all",
                      index === currentBanner ? "bg-white w-4" : "bg-white/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Products Section - Sharp Cards */}
        <AnimatedSection id="products" className="py-16 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">AI Agent Marketplace</h2>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto">
                Profesyonel içerik üretimi için ihtiyacınız olan tüm yapay zeka araçları tek platformda.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer(0.08)}
            >
              {productFeatures.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={staggerItem}
                  className="p-5 rounded-lg bg-[#111111] border border-white/[0.08] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <h3 className="text-sm font-medium text-white mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* How It Works Section - Minimal */}
        <AnimatedSection id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Nasıl Kullanılır?</h2>
              <p className="text-zinc-500 text-sm">4 basit adımda profesyonel içerikler üretin.</p>
            </div>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer(0.1)}
            >
              {steps.map((step) => (
                <motion.div key={step.num} variants={staggerItem} className="text-center p-4">
                  <div className="text-3xl font-bold text-zinc-700 mb-3">{step.num}</div>
                  <h3 className="text-sm font-medium text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-zinc-500">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Agent Showcase Section - Sharp Cards */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Popüler AI Agent'lar</h2>
              <p className="text-zinc-500 text-sm">En çok kullanılan yapay zeka asistanlarımızı keşfedin.</p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer(0.08)}
            >
              {showcaseAgents.map((agent) => (
                <motion.div
                  key={agent.slug}
                  variants={staggerItem}
                  className={cn(
                    "relative p-5 rounded-lg bg-[#111111] border border-white/[0.08] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5",
                    !agent.isActive && "opacity-50"
                  )}
                >
                  {!agent.isActive && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] text-zinc-500 bg-white/5">
                      Yakında
                    </span>
                  )}
                  <h3 className="text-sm font-medium text-white mb-1">{agent.name}</h3>
                  <p className="text-xs text-zinc-500">{agent.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-8">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-zinc-400 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
              >
                Tüm Agent'ları Gör
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing Section - Sharp Cards */}
        <AnimatedSection id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Fiyatlandırma</h2>
              <p className="text-zinc-500 text-sm">Ücretsiz başlayın, dilediğiniz zaman yükseltin.</p>
            </div>

            {/* Free Credits Banner */}
            <div className="mb-8 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
                <Sparkles className="w-4 h-4" />
                40 Kredi Hediye ile Başla!
              </span>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer(0.08)}
            >
              {pricingPackages.map((pkg) => (
                <motion.div
                  key={pkg.name}
                  variants={staggerItem}
                  className={cn(
                    "relative p-5 rounded-lg border transition-all duration-200 hover:-translate-y-0.5",
                    pkg.isPopular
                      ? "bg-[#111111] border-amber-500/30"
                      : "bg-[#111111] border-white/[0.08] hover:border-white/20"
                  )}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                      <span className="px-2.5 py-1 rounded bg-amber-500 text-black text-[10px] font-semibold flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Popüler
                      </span>
                    </div>
                  )}

                  <h3 className={cn("text-sm font-medium mb-2", pkg.isPopular ? "text-amber-400" : "text-white")}>
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={cn("text-2xl font-bold", pkg.isPopular ? "text-amber-400" : "text-white")}>
                      {pkg.credits}
                    </span>
                    <span className="text-zinc-600 text-xs">kredi</span>
                  </div>

                  <div className="mb-4">
                    {pkg.isFree ? (
                      <span className="text-base font-semibold text-green-400">Ücretsiz</span>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-white">{pkg.price} ₺</span>
                        <span className="text-xs text-zinc-600">/ay</span>
                        {pkg.originalPrice && (
                          <span className="text-xs text-zinc-600 line-through">{pkg.originalPrice} ₺</span>
                        )}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                        <Check className={cn("w-3 h-3", pkg.isPopular ? "text-amber-400" : "text-green-400")} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/register"
                    className={cn(
                      "block w-full py-2.5 rounded-lg text-xs font-medium text-center transition-colors",
                      pkg.isPopular
                        ? "bg-amber-500 text-black hover:bg-amber-400"
                        : pkg.isFree
                        ? "bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10"
                        : "bg-white text-black hover:bg-zinc-200"
                    )}
                  >
                    {pkg.isFree ? "Ücretsiz Başla" : "Satın Al"}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Credit carry-over */}
            <div className="mt-6 text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                <Zap className="w-3 h-3" />
                Kullanılmayan kredilerin %50'si bir sonraki aya devredilir
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* About Section - Clean */}
        <AnimatedSection id="about" className="py-16 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Hakkımızda</h2>
            </div>

            <div className="p-6 rounded-lg bg-[#111111] border border-white/[0.08]">
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Nairoo AI Studio, yapay zeka ile içerik üretimini herkes için erişilebilir hale getirmek amacıyla kuruldu.
                Misyonumuz, yaratıcılığı demokratikleştirmek ve profesyonel içerik üretimini saniyeler içinde mümkün kılmaktır.
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Özelleştirilmiş AI modellerimiz ile görsel, video ve UGC içerikler oluşturabilir,
                markanızı güçlendirebilir ve sosyal medya varlığınızı yükseltebilirsiniz.
              </p>

              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2">İletişim</p>
                <a href="mailto:fkylmz35@outlook.com" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  fkylmz35@outlook.com
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section - Minimal */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-8 rounded-lg bg-[#111111] border border-white/[0.08]">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Hemen Ücretsiz Dene</h2>
              <p className="text-sm text-zinc-500 mb-6">40 kredi hediye ile AI görsel üretmeye başla. Kredi kartı gerekmez.</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-100 transition-colors"
                >
                  Ücretsiz Kayıt Ol
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="px-6 py-3 text-sm text-zinc-500 hover:text-white transition-colors">
                  Giriş Yap
                </Link>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/5">
                {[
                  { icon: Shield, label: "Güvenli" },
                  { icon: Zap, label: "Hızlı" },
                  { icon: Clock, label: "7/24 Erişim" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5 text-xs text-zinc-600">
                    <badge.icon className="w-3.5 h-3.5" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Footer - Minimal */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden">
                    <Image src="/logo.png" alt="nAIroo" width={32} height={32} className="object-cover w-full h-full" />
                  </div>
                  <span className="text-sm font-semibold text-white">n<span className="text-zinc-500">AI</span>roo</span>
                </div>
                <p className="text-xs text-zinc-600 max-w-xs">
                  Yapay zeka ile içerik üretimini herkes için erişilebilir hale getiriyoruz.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xs font-medium text-zinc-400 mb-3">Hızlı Linkler</h4>
                <ul className="space-y-2">
                  {[
                    { href: "#products", label: "AI Agentlar" },
                    { href: "#pricing", label: "Fiyatlandırma" },
                    { href: "#about", label: "Hakkımızda" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-xs text-zinc-600 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-xs font-medium text-zinc-400 mb-3">Yasal</h4>
                <ul className="space-y-2">
                  {[
                    { href: "/yasal#gizlilik", label: "Gizlilik Politikası" },
                    { href: "/yasal#kullanim-sartlari", label: "Kullanım Şartları" },
                    { href: "/yasal#kvkk", label: "KVKK" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-xs text-zinc-600 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
              <div className="text-xs text-zinc-600">© 2024 Nairoo AI Studio. Tüm hakları saklıdır.</div>
              <div className="flex items-center gap-4">
                {[Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a key={index} href="#" className="text-zinc-600 hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}
