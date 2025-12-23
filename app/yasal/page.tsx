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
          {/* 1. KVKK Aydınlatma Metni */}
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

              <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
                <div>
                  <p><strong className="text-white">Veri Sorumlusu:</strong> Faik Yılmaz</p>
                  <p><strong className="text-white">E-posta:</strong> fkylmz35@outlook.com</p>
                  <p><strong className="text-white">Adres:</strong> Fatih Mah. 4525. Sk. No:16/15 Isparta / Merkez</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">İşlenen Kişisel Veriler</h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    <li>Kimlik ve iletişim bilgileri</li>
                    <li>Hesap bilgileri</li>
                    <li>Kullanım verileri</li>
                    <li>Ödeme verileri</li>
                    <li>Teknik veriler</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">İşleme Amaçları</h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
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
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    <li>Sözleşme</li>
                    <li>Meşru menfaat</li>
                    <li>Açık rıza</li>
                    <li>Kanuni yükümlülük</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Veri Aktarımı</h3>
                  <p className="text-zinc-400">Supabase, FAL AI, Google, Vercel</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Saklama Süreleri</h3>
                  <p className="text-zinc-400">Hesap kapatılana kadar, loglar 2 yıl, ödemeler 10 yıl.</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Haklar</h3>
                  <p className="text-zinc-400">KVKK 11. maddesi kapsamındaki tüm haklar.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 2. Açık Rıza Metni */}
          <motion.section
            id="acik-riza"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">2. KVKK Açık Rıza Metni – Yurtdışı Aktarım</h2>

              <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
                <p>
                  ABD'deki Supabase, FAL AI, Google ve Vercel sunucularına veri aktarımına açık rıza veriyorum.
                </p>
                <p className="text-zinc-400">
                  Rıza geri çekilebilir: <a href="mailto:fkylmz35@outlook.com" className="text-white hover:underline">fkylmz35@outlook.com</a>
                </p>
              </div>
            </div>
          </motion.section>

          {/* 3. Gizlilik Politikası */}
          <motion.section
            id="gizlilik"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">3. Gizlilik Politikası</h2>

              <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
                <div>
                  <h3 className="text-white font-medium mb-2">Yüklenen Dosyaların Saklanması</h3>
                  <p className="text-zinc-400">
                    İçerik üretimi için yüklenen tüm dosyalar <strong className="text-white">24 saat içinde otomatik olarak silinir</strong>.
                  </p>
                  <p className="text-zinc-400 mt-2">Silinen dosyalar geri getirilemez.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 4. Çerez Politikası */}
          <motion.section
            id="cerez"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">4. Çerez Politikası</h2>

              <div className="text-zinc-300 text-sm leading-relaxed">
                <p className="text-zinc-400">Zorunlu ve analitik çerezler kullanılır.</p>
              </div>
            </div>
          </motion.section>

          {/* 5. Kullanım Şartları */}
          <motion.section
            id="kullanim-sartlari"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">5. Kullanım Şartları</h2>

              <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
                <div>
                  <h3 className="text-white font-medium mb-3">Kredi Biriktirme</h3>
                  <ul className="list-disc list-inside space-y-2 text-zinc-400">
                    <li>Aylık abonelikte ay sonunda kalan kredilerin <strong className="text-white">%50'si</strong> bir sonraki aya aktarılır.</li>
                    <li>Aktarım miktarı, satın alınan paket kredisinin <strong className="text-white">%50'sini geçemez</strong>.</li>
                    <li>Aktarılan krediler <strong className="text-white">yalnızca bir kez aktarılır</strong>; ikinci aya devredilmez, kullanılmazsa yanar.</li>
                    <li>Ücretsiz (Deneme) paketinde kredi aktarımı yoktur.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Yüklenen Dosyalar</h3>
                  <ul className="list-disc list-inside space-y-2 text-zinc-400">
                    <li>Yüklenen dosyalar <strong className="text-white">24 saat içinde otomatik silinir</strong>.</li>
                    <li>Silinen dosyalar kurtarılamaz.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Uyuşmazlık Çözümü</h3>
                  <p className="text-zinc-400">
                    Uyuşmazlıklarda <strong className="text-white">Isparta mahkemeleri ve icra daireleri</strong> yetkilidir.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 6. Mesafeli Satış Sözleşmesi */}
          <motion.section
            id="mesafeli-satis"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">6. Mesafeli Satış Sözleşmesi</h2>

              <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
                <div>
                  <h3 className="text-white font-medium mb-3">Satıcı Bilgileri</h3>
                  <p><strong className="text-white">Ad Soyad:</strong> Faik Yılmaz</p>
                  <p><strong className="text-white">Adres:</strong> Fatih Mah. 4525. Sk. No:16/15 Isparta/Merkez</p>
                  <p><strong className="text-white">E-posta:</strong> fkylmz35@outlook.com</p>
                </div>

                <div>
                  <p><strong className="text-white">Ürün:</strong> Dijital kredi / abonelik</p>
                  <p><strong className="text-white">Teslim:</strong> Anında dijital teslim</p>
                  <p><strong className="text-white">Cayma Hakkı:</strong> Dijital ürünlerde cayma hakkı yoktur (Yönetmelik Madde 15)</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 7. Ön Bilgilendirme Formu */}
          <motion.section
            id="on-bilgilendirme"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">7. Ön Bilgilendirme Formu</h2>

              <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
                <div>
                  <h3 className="text-white font-medium mb-3">Satıcı Bilgileri</h3>
                  <p><strong className="text-white">Ad Soyad:</strong> Faik Yılmaz</p>
                  <p><strong className="text-white">Adres:</strong> Fatih Mah. 4525. Sk. No:16/15 Isparta/Merkez</p>
                  <p><strong className="text-white">E-posta:</strong> fkylmz35@outlook.com</p>
                </div>

                <div>
                  <p><strong className="text-white">Ürün:</strong> Dijital kredi / abonelik</p>
                  <p><strong className="text-white">Teslim:</strong> Anında</p>
                  <p><strong className="text-white">İade:</strong> Yoktur</p>
                  <p><strong className="text-white">KDV:</strong> Dahildir</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Kredi Biriktirme</h3>
                  <ul className="list-disc list-inside space-y-2 text-zinc-400">
                    <li>Aylık abonelikte ay sonunda kalan kredilerin <strong className="text-white">%50'si bir sonraki aya aktarılır.</strong></li>
                    <li>Aktarım miktarı, paket kredisinin <strong className="text-white">%50'sini geçemez.</strong></li>
                    <li>Aktarılan krediler <strong className="text-white">sadece bir kez aktarılır</strong>; sonraki ay kullanılmazsa yanar.</li>
                    <li>Ücretsiz (Deneme) paketinde kredi aktarımı yoktur.</li>
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
