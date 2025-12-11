"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ImageIcon,
  Video,
  Mic,
  Check,
  ArrowRight,
  Crown,
  Zap,
  Shield,
  Clock,
} from "lucide-react"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Features data
const features = [
  {
    icon: ImageIcon,
    title: "AI Görsel Üretimi",
    description: "Metinden görsel oluşturun. 4K'ya kadar yüksek çözünürlük desteği.",
    status: "active",
    badge: "Aktif",
  },
  {
    icon: Video,
    title: "AI Video Üretimi",
    description: "Promptlarınızdan etkileyici videolar oluşturun.",
    status: "coming",
    badge: "Yakında",
  },
  {
    icon: Mic,
    title: "AI Ses Üretimi",
    description: "Doğal ses sentezi ve seslendirme çözümleri.",
    status: "coming",
    badge: "Yakında",
  },
]

// How it works steps
const steps = [
  {
    number: "01",
    title: "Kayıt Olun",
    description: "Ücretsiz hesap oluşturun ve 400 kredi kazanın.",
  },
  {
    number: "02",
    title: "Prompt Yazın",
    description: "Hayalinizdeki görseli detaylı bir şekilde tanımlayın.",
  },
  {
    number: "03",
    title: "Üretin",
    description: "AI modelimiz saniyeler içinde görselinizi oluştursun.",
  },
  {
    number: "04",
    title: "İndirin",
    description: "Yüksek kaliteli görselinizi indirin ve kullanın.",
  },
]

// Pricing packages
const pricingPackages = [
  {
    name: "Deneme",
    credits: 400,
    price: 0,
    features: ["Standart kalite", "400 kredi", "Temel özellikler"],
    isPopular: false,
    isFree: true,
  },
  {
    name: "Başlangıç",
    credits: 1000,
    price: 99,
    features: ["Tüm kaliteler", "1.000 kredi/ay", "Öncelikli destek", "Hızlı üretim"],
    isPopular: false,
    isFree: false,
  },
  {
    name: "Standart",
    credits: 2500,
    price: 199,
    originalPrice: 249,
    features: ["Tüm kaliteler", "2.500 kredi/ay", "VIP destek", "%20 tasarruf", "Öncelikli sıra"],
    isPopular: true,
    isFree: false,
  },
  {
    name: "Pro",
    credits: 6000,
    price: 399,
    originalPrice: 599,
    features: ["Tüm kaliteler", "6.000 kredi/ay", "Özel destek", "%33 tasarruf", "Öncelikli sıra", "Erken özellik erişimi"],
    isPopular: false,
    isFree: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Nairoo AI"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-black" />

        {/* Animated color blobs - faster breathing */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full blur-[200px] opacity-60"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px] opacity-50"
            style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
            animate={{
              x: [0, -80, 60, 0],
              y: [0, 100, -50, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px] opacity-40"
            style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}
            animate={{
              x: [0, 60, -80, 0],
              y: [0, -60, 80, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-35"
            style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}
            animate={{
              x: [0, -100, 50, 0],
              y: [0, 50, -100, 0],
              scale: [1, 0.95, 1.15, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            {/* 3D Brand Title - Large with animated letter glow */}
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              {/* Background glow layer */}
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-7xl sm:text-9xl lg:text-[12rem] font-black text-white/10 blur-3xl select-none tracking-tight">
                  nAIroo
                </span>
              </div>

              {/* Main text - off-white/dirty white */}
              <h1 className="relative text-7xl sm:text-9xl lg:text-[12rem] font-black tracking-tight leading-none text-stone-200">
                nAIroo
              </h1>
              <p className="text-zinc-500 text-lg sm:text-2xl mt-4 tracking-[0.4em] uppercase font-light">AI Studio</p>
            </motion.div>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed pt-4"
            >
              Düşüncelerinizi saniyeler içinde profesyonel görsellere dönüştürün.
              <br className="hidden sm:block" />
              Sınırsız yaratıcılık, yapay zeka gücüyle.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <Link
                href="/register"
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(255,255,255,0.3)]"
              >
                Ücretsiz Başla
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-8 py-4 text-white/70 font-medium rounded-full border border-white/20 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all"
              >
                Giriş Yap
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-12 pt-16 text-center"
            >
              <div className="group">
                <div className="text-3xl font-bold text-white/80 group-hover:text-white transition-colors">400</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Ücretsiz Kredi</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="group">
                <div className="text-3xl font-bold text-white/80 group-hover:text-white transition-colors">4K</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Çözünürlük</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="group">
                <div className="text-3xl font-bold text-white/80 group-hover:text-white transition-colors">&lt;30s</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Üretim Süresi</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Güçlü Özellikler</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Profesyonel içerik üretimi için ihtiyacınız olan tüm araçlar tek platformda.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border backdrop-blur-sm ${
                  feature.status === "active"
                    ? "bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent border-white/10"
                    : "bg-white/[0.02] border-white/5"
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      feature.status === "active"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30"
                    }`}
                  >
                    {feature.badge}
                  </span>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    feature.status === "active" ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <feature.icon
                    className={`w-6 h-6 ${feature.status === "active" ? "text-white" : "text-zinc-500"}`}
                  />
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${feature.status === "active" ? "text-white" : "text-zinc-400"}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${feature.status === "active" ? "text-zinc-400" : "text-zinc-500"}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nasıl Çalışır?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Sadece 4 adımda profesyonel görseller oluşturun.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}

                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative" id="pricing">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Aylık Paketler</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              İhtiyacınıza uygun paketi seçin. Ücretsiz başlayın, dilediğiniz zaman yükseltin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border backdrop-blur-sm ${
                  pkg.isPopular
                    ? "bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent border-amber-500/30"
                    : "bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border-white/[0.05]"
                }`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-semibold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      En Popüler
                    </span>
                  </div>
                )}

                <h3 className={`text-lg font-semibold mb-2 ${pkg.isPopular ? "text-amber-400" : "text-white"}`}>
                  {pkg.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-3xl font-bold ${pkg.isPopular ? "text-amber-400" : "text-white"}`}>
                    {pkg.credits.toLocaleString("tr-TR")}
                  </span>
                  <span className="text-zinc-500 text-sm">kredi</span>
                </div>

                <div className="mb-6">
                  {pkg.isFree ? (
                    <span className="text-xl font-bold text-green-400">Ücretsiz</span>
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{pkg.price} ₺</span>
                        <span className="text-sm text-zinc-500">/ay</span>
                        {pkg.originalPrice && (
                          <span className="text-sm text-zinc-500 line-through">{pkg.originalPrice} ₺</span>
                        )}
                      </div>
                      {pkg.originalPrice && (
                        <span className="text-xs text-green-400 mt-1">
                          {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% indirim
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                      <Check className={`w-4 h-4 ${pkg.isPopular ? "text-amber-400" : "text-green-400"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`block w-full py-3 rounded-xl text-sm font-medium text-center transition-all ${
                    pkg.isPopular
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400"
                      : pkg.isFree
                      ? "bg-white/5 text-zinc-300 hover:bg-white/10"
                      : "bg-white text-black hover:bg-zinc-200"
                  }`}
                >
                  {pkg.isFree ? "Ücretsiz Başla" : "Satın Al"}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Credit carry-over info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">
                Kullanılmayan kredilerin %50'si bir sonraki aya devredilir
              </span>
            </div>
          </motion.div>

          {/* Payment methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <Image
              src="/payment-methods.png"
              alt="Ödeme Yöntemleri - iyzico, Mastercard, Visa, American Express, Troy"
              width={500}
              height={60}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[128px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Yaratıcılığınızı Serbest Bırakın
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-8">
              Hemen ücretsiz kayıt olun ve 400 kredi ile AI görsel üretmeye başlayın.
              Kredi kartı gerekmez.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-all"
              >
                Ücretsiz Kayıt Ol
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Shield className="w-4 h-4" />
                <span>Güvenli Ödeme</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Zap className="w-4 h-4" />
                <span>Anında Erişim</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Clock className="w-4 h-4" />
                <span>7/24 Destek</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Nairoo AI"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-lg font-semibold text-white">Nairoo AI Studio</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <Link href="/login" className="hover:text-white transition-colors">
                Giriş Yap
              </Link>
              <Link href="/register" className="hover:text-white transition-colors">
                Kayıt Ol
              </Link>
              <Link href="#pricing" className="hover:text-white transition-colors">
                Fiyatlandırma
              </Link>
              <Link href="/yasal" className="hover:text-white transition-colors">
                Yasal Bilgiler
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-zinc-500">
              © 2024 Nairoo AI Studio. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
