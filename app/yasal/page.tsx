"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Shield, Cookie, ScrollText, ShoppingCart, Info } from "lucide-react"

const sections = [
  { id: "kvkk", title: "KVKK Aydınlatma Metni", icon: Shield },
  { id: "acik-riza", title: "Açık Rıza Metni", icon: FileText },
  { id: "gizlilik", title: "Gizlilik Politikası", icon: Shield },
  { id: "cerez", title: "Çerez Politikası", icon: Cookie },
  { id: "kullanim-sartlari", title: "Kullanım Şartları", icon: ScrollText },
  { id: "mesafeli-satis", title: "Mesafeli Satış Sözleşmesi", icon: ShoppingCart },
  { id: "on-bilgilendirme", title: "Ön Bilgilendirme Formu", icon: Info },
]

export default function YasalPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Nairoo AI"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-semibold text-white">Nairoo AI</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Yasal Bilgiler</h1>
          <p className="text-zinc-400">Nairoo AI Studio yasal metinleri ve politikaları</p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#141414] border border-white/10 rounded-2xl p-6 mb-12"
        >
          <h2 className="text-lg font-semibold text-white mb-4">İçindekiler</h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
              >
                <section.icon className="w-4 h-4 text-zinc-500" />
                <span className="text-sm">{index + 1}. {section.title}</span>
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Legal Sections */}
        <div className="space-y-12">
          {/* KVKK Aydınlatma Metni */}
          <motion.section
            id="kvkk"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-2">1. KVKK Aydınlatma Metni</h2>
              <p className="text-sm text-zinc-500 mb-6">Son Güncelleme: 12 Aralık 2025</p>

              <div className="space-y-4 text-zinc-300">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm"><strong className="text-white">Veri Sorumlusu:</strong> Faik Yılmaz</p>
                  <p className="text-sm"><strong className="text-white">E-posta:</strong> fkylmz35@outlook.com</p>
                  <p className="text-sm"><strong className="text-white">Adres:</strong> Fatih Mah. 4525. Sk. No:16/15 Isparta / Merkez</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">İşlenen Kişisel Veriler</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-zinc-400">
                    <li>Kimlik ve iletişim bilgileri</li>
                    <li>Hesap bilgileri</li>
                    <li>Kullanım verileri</li>
                    <li>Ödeme verileri</li>
                    <li>Teknik veriler</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">İşleme Amaçları</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-zinc-400">
                    <li>Üyelik</li>
                    <li>AI içerik üretimi</li>
                    <li>Kredi & abonelik yönetimi</li>
                    <li>Ödeme işlemleri</li>
                    <li>Güvenlik</li>
                    <li>Yasal yükümlülükler</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Hukuki Sebepler</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-zinc-400">
                    <li>Sözleşme</li>
                    <li>Meşru menfaat</li>
                    <li>Açık rıza</li>
                    <li>Kanuni yükümlülük</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Veri Aktarımı</h3>
                  <p className="text-sm text-zinc-400">Supabase, FAL AI, Google, Vercel, iyzico</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Saklama Süreleri</h3>
                  <p className="text-sm text-zinc-400">Hesap kapatılana kadar, loglar 2 yıl, ödemeler 10 yıl.</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Haklar</h3>
                  <p className="text-sm text-zinc-400">KVKK 11. maddesi kapsamındaki tüm haklar.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Açık Rıza Metni */}
          <motion.section
            id="acik-riza"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">2. KVKK Açık Rıza Metni – Yurtdışı Aktarım</h2>

              <div className="space-y-4 text-zinc-300">
                <p className="text-sm">
                  ABD'deki Supabase, FAL AI, Google ve Vercel sunucularına veri aktarımına açık rıza veriyorum.
                </p>
                <p className="text-sm text-zinc-400">
                  Rıza geri çekilebilir: <a href="mailto:fkylmz35@outlook.com" className="text-white hover:underline">fkylmz35@outlook.com</a>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Gizlilik Politikası */}
          <motion.section
            id="gizlilik"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">3. Gizlilik Politikası</h2>

              <div className="space-y-4 text-zinc-300">
                <div>
                  <h3 className="text-white font-medium mb-2">Yüklenen Dosyaların Saklanması</h3>
                  <p className="text-sm text-zinc-400">
                    İçerik üretimi için yüklenen tüm dosyalar <strong className="text-amber-400">24 saat içinde otomatik olarak silinir</strong>.
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">Silinen dosyalar geri getirilemez.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Çerez Politikası */}
          <motion.section
            id="cerez"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">4. Çerez Politikası</h2>

              <div className="text-zinc-300">
                <p className="text-sm text-zinc-400">Zorunlu ve analitik çerezler kullanılır.</p>
              </div>
            </div>
          </motion.section>

          {/* Kullanım Şartları */}
          <motion.section
            id="kullanim-sartlari"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">5. Kullanım Şartları</h2>

              <div className="space-y-6 text-zinc-300">
                <div>
                  <h3 className="text-white font-medium mb-3">Kredi Biriktirme</h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Aylık abonelikte ay sonunda kalan kredilerin <strong className="text-white">%50'si</strong> bir sonraki aya aktarılır.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Aktarım miktarı, satın alınan paket kredisinin <strong className="text-white">%50'sini geçemez</strong>.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Aktarılan krediler <strong className="text-white">yalnızca bir kez aktarılır</strong>; ikinci aya devredilmez, kullanılmazsa yanar.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Ücretsiz (Deneme) paketinde kredi aktarımı yoktur.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Yüklenen Dosyalar</h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Yüklenen dosyalar <strong className="text-white">24 saat içinde otomatik silinir</strong>.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Silinen dosyalar kurtarılamaz.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Uyuşmazlık Çözümü</h3>
                  <p className="text-sm text-zinc-400">
                    Uyuşmazlıklarda <strong className="text-white">Isparta mahkemeleri ve icra daireleri</strong> yetkilidir.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Mesafeli Satış Sözleşmesi */}
          <motion.section
            id="mesafeli-satis"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">6. Mesafeli Satış Sözleşmesi</h2>

              <div className="space-y-4 text-zinc-300">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Satıcı Bilgileri</h3>
                  <p className="text-sm"><strong className="text-white">Ad Soyad:</strong> Faik Yılmaz</p>
                  <p className="text-sm"><strong className="text-white">Adres:</strong> Fatih Mah. 4525. Sk. No:16/15 Isparta/Merkez</p>
                  <p className="text-sm"><strong className="text-white">E-posta:</strong> fkylmz35@outlook.com</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-xs text-zinc-500 mb-1">Ürün</p>
                    <p className="text-sm text-white">Dijital kredi / abonelik</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-xs text-zinc-500 mb-1">Teslim</p>
                    <p className="text-sm text-white">Anında dijital teslim</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-xs text-zinc-500 mb-1">Cayma Hakkı</p>
                    <p className="text-sm text-amber-400">Yoktur</p>
                    <p className="text-xs text-zinc-500 mt-1">(Yönetmelik Madde 15)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Ön Bilgilendirme Formu */}
          <motion.section
            id="on-bilgilendirme"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">7. Ön Bilgilendirme Formu</h2>

              <div className="space-y-4 text-zinc-300">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Satıcı Bilgileri</h3>
                  <p className="text-sm"><strong className="text-white">Ad Soyad:</strong> Faik Yılmaz</p>
                  <p className="text-sm"><strong className="text-white">Adres:</strong> Fatih Mah. 4525. Sk. No:16/15 Isparta/Merkez</p>
                  <p className="text-sm"><strong className="text-white">E-posta:</strong> fkylmz35@outlook.com</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-zinc-500 mb-1">Ürün</p>
                    <p className="text-xs text-white">Dijital kredi / abonelik</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-zinc-500 mb-1">Teslim</p>
                    <p className="text-xs text-white">Anında</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-zinc-500 mb-1">İade</p>
                    <p className="text-xs text-amber-400">Yoktur</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-zinc-500 mb-1">Ödeme</p>
                    <p className="text-xs text-white">iyzico</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-zinc-500 mb-1">KDV</p>
                    <p className="text-xs text-white">Dahildir</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Kredi Biriktirme</h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Aylık abonelikte ay sonunda kalan kredilerin <strong className="text-white">%50'si bir sonraki aya aktarılır.</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Aktarım miktarı, paket kredisinin <strong className="text-white">%50'sini geçemez.</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Aktarılan krediler <strong className="text-white">sadece bir kez aktarılır</strong>; sonraki ay kullanılmazsa yanar.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      Ücretsiz (Deneme) paketinde kredi aktarımı yoktur.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Back to top */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rotate-90" />
            Başa Dön
          </a>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center text-sm text-zinc-500">
          © 2024 Nairoo AI Studio. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  )
}
