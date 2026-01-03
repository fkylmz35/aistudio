"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import {
  User,
  Mail,
  Lock,
  Bell,
  Trash2,
  Loader2,
  Check,
  AlertTriangle,
  Eye,
  EyeOff,
  ChevronLeft,
  Settings as SettingsIcon
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase-browser"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"

// Password validation
const passwordRequirements = {
  minLength: { test: (p: string) => p.length >= 6, label: "En az 6 karakter" },
  hasUppercase: { test: (p: string) => /[A-Z]/.test(p), label: "En az 1 büyük harf" },
  hasLowercase: { test: (p: string) => /[a-z]/.test(p), label: "En az 1 küçük harf" },
  hasNumber: { test: (p: string) => /[0-9]/.test(p), label: "En az 1 rakam" },
}

const validatePassword = (password: string) => {
  return Object.values(passwordRequirements).every((req) => req.test(password))
}

export default function SettingsPage() {
  const router = useRouter()
  const { user, isLoading: isAuthLoading } = useAuth()
  const { toast } = useToast()

  // Profile state
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "")
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  // Email state
  const [newEmail, setNewEmail] = useState("")
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)

  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  // Notification state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  // Delete account state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Update profile
  const handleUpdateProfile = async () => {
    if (!fullName.trim()) {
      toast({ title: "Hata", description: "Ad soyad boş olamaz", variant: "destructive" })
      return
    }

    setIsUpdatingProfile(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName.trim() }
      })

      if (error) throw error

      toast({ title: "Başarılı", description: "Profil bilgileriniz güncellendi" })
    } catch (error) {
      console.error("[Settings] Update profile error:", error)
      toast({ title: "Hata", description: "Profil güncellenirken bir hata oluştu", variant: "destructive" })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  // Update email
  const handleUpdateEmail = async () => {
    if (!newEmail.trim()) {
      toast({ title: "Hata", description: "E-posta adresi boş olamaz", variant: "destructive" })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      toast({ title: "Hata", description: "Geçerli bir e-posta adresi girin", variant: "destructive" })
      return
    }

    setIsUpdatingEmail(true)
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail.trim() })

      if (error) throw error

      toast({
        title: "Doğrulama Maili Gönderildi",
        description: "Yeni e-posta adresinize doğrulama linki gönderildi"
      })
      setNewEmail("")
    } catch (error) {
      console.error("[Settings] Update email error:", error)
      toast({ title: "Hata", description: "E-posta güncellenirken bir hata oluştu", variant: "destructive" })
    } finally {
      setIsUpdatingEmail(false)
    }
  }

  // Update password
  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast({ title: "Hata", description: "Tüm şifre alanlarını doldurun", variant: "destructive" })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({ title: "Hata", description: "Şifreler eşleşmiyor", variant: "destructive" })
      return
    }

    if (!validatePassword(newPassword)) {
      toast({ title: "Hata", description: "Şifre gereksinimleri karşılanmıyor", variant: "destructive" })
      return
    }

    setIsUpdatingPassword(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) throw error

      toast({ title: "Başarılı", description: "Şifreniz başarıyla değiştirildi" })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("[Settings] Update password error:", error)
      toast({ title: "Hata", description: "Şifre güncellenirken bir hata oluştu", variant: "destructive" })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Delete account
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "HESABIMI SIL") {
      toast({ title: "Hata", description: "Onay metnini doğru girin", variant: "destructive" })
      return
    }

    setIsDeleting(true)
    try {
      // Note: Account deletion requires admin privileges or a server-side function
      // This is a placeholder - implement proper deletion via API route
      toast({
        title: "İşlem Başlatıldı",
        description: "Hesap silme talebiniz alındı. 24 saat içinde işleme alınacaktır."
      })
      setShowDeleteModal(false)
    } catch (error) {
      console.error("[Settings] Delete account error:", error)
      toast({ title: "Hata", description: "Hesap silinirken bir hata oluştu", variant: "destructive" })
    } finally {
      setIsDeleting(false)
    }
  }

  if (isAuthLoading) {
    return (
      <>
        <Header title="Hesap Ayarları" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      </>
    )
  }

  // Auth guard for non-authenticated users
  if (!user) {
    return (
      <>
        <Header title="Hesap Ayarları" />
        <AuthGuard
          title="Hesap Ayarlarına Erişim İçin Giriş Yapın"
          description="Hesap ayarlarınızı görüntülemek ve güncellemek için giriş yapmanız gerekiyor."
          benefits={[
            "Profil bilgilerinizi yönetin",
            "E-posta ve şifrenizi güncelleyin",
            "Bildirim tercihlerinizi ayarlayın",
          ]}
          primaryButtonText="Giriş Yap"
          secondaryButtonText="Kayıt Ol"
        />
      </>
    )
  }

  return (
    <>
      <Header title="Hesap Ayarları" />
      <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Background with noise texture */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-900"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Blur orbs for ambient effect */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {/* Back to Profile */}
            <Link
              href="/profile"
              className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Profile Dön
            </Link>

            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="p-6 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.05] flex items-center justify-center">
                  <User className="w-6 h-6 text-zinc-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Profil Bilgileri</h2>
                  <p className="text-sm text-zinc-500">Ad soyad bilgilerinizi güncelleyin</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ad Soyad"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.15] transition-all duration-150"
                  />
                </div>

                <button
                  onClick={handleUpdateProfile}
                  disabled={isUpdatingProfile}
                  className="px-6 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-zinc-200 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUpdatingProfile ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Kaydet
                </button>
              </div>
            </motion.div>

            {/* Email Change */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.05] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-zinc-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">E-posta Adresi</h2>
                  <p className="text-sm text-zinc-500">E-posta adresinizi değiştirin</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Mevcut E-posta</label>
                  <div className="px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-zinc-500">
                    {user?.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Yeni E-posta</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="yeni@email.com"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.15] transition-all duration-150"
                  />
                </div>

                <p className="text-xs text-zinc-500">
                  E-posta değişikliği için yeni adresinize doğrulama maili gönderilecektir.
                </p>

                <button
                  onClick={handleUpdateEmail}
                  disabled={isUpdatingEmail || !newEmail}
                  className="px-6 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-zinc-200 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUpdatingEmail ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  E-posta Değiştir
                </button>
              </div>
            </motion.div>

            {/* Password Change */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-6 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.05] flex items-center justify-center">
                  <Lock className="w-6 h-6 text-zinc-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Şifre Değiştir</h2>
                  <p className="text-sm text-zinc-500">Hesap şifrenizi güncelleyin</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Yeni Şifre</label>
                  <div className="relative">
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.15] transition-all duration-150 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password requirements */}
                  {newPassword && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {Object.entries(passwordRequirements).map(([key, req]) => (
                        <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
                          <div className={`w-2 h-2 rounded-full ${req.test(newPassword) ? "bg-green-500" : "bg-zinc-600"}`} />
                          <span className={`text-xs ${req.test(newPassword) ? "text-green-500" : "text-zinc-500"}`}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Şifre Tekrar</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.15] transition-all duration-150"
                  />
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="mt-2 text-xs text-red-400">Şifreler eşleşmiyor</p>
                  )}
                </div>

                <button
                  onClick={handleUpdatePassword}
                  disabled={isUpdatingPassword || !newPassword || !confirmPassword}
                  className="px-6 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-zinc-200 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUpdatingPassword ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  Şifre Değiştir
                </button>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-zinc-900/50 border border-white/[0.08] rounded-2xl backdrop-blur-sm mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.05] flex items-center justify-center">
                  <Bell className="w-6 h-6 text-zinc-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Bildirim Ayarları</h2>
                  <p className="text-sm text-zinc-500">E-posta bildirimlerinizi yönetin</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                  <div>
                    <p className="text-sm font-medium text-white">E-posta Bildirimleri</p>
                    <p className="text-xs text-zinc-500">Görsel oluşturma tamamlandığında bildirim al</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-12 h-6 rounded-full transition-all duration-150 ${emailNotifications ? "bg-green-500" : "bg-zinc-700"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${emailNotifications ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                  <div>
                    <p className="text-sm font-medium text-white">Pazarlama E-postaları</p>
                    <p className="text-xs text-zinc-500">Yenilikler ve kampanyalar hakkında bilgi al</p>
                  </div>
                  <button
                    onClick={() => setMarketingEmails(!marketingEmails)}
                    className={`w-12 h-6 rounded-full transition-all duration-150 ${marketingEmails ? "bg-green-500" : "bg-zinc-700"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${marketingEmails ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Delete Account */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-6 bg-zinc-900/50 border border-red-500/20 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-red-400">Hesabı Sil</h2>
                  <p className="text-sm text-zinc-500">Bu işlem geri alınamaz</p>
                </div>
              </div>

              <p className="text-sm text-zinc-400 mb-4">
                Hesabınızı sildiğinizde tüm verileriniz, oluşturduğunuz görseller ve kredi bakiyeniz kalıcı olarak silinecektir.
              </p>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-all duration-150 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Hesabı Sil
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 bg-zinc-900/90 border border-white/[0.08] rounded-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Hesabı Silmek İstediğinize Emin Misiniz?</h3>
                  <p className="text-sm text-zinc-500">Bu işlem geri alınamaz</p>
                </div>
              </div>

              <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl mb-4">
                <p className="text-sm text-zinc-400">
                  Hesabınız silindiğinde:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-zinc-500">
                  <li>• Tüm görselleriniz silinecek</li>
                  <li>• Kalan kredileriniz kaybolacak</li>
                  <li>• Hesap bilgileriniz kalıcı olarak silinecek</li>
                </ul>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Onaylamak için <span className="text-red-400 font-mono">HESABIMI SIL</span> yazın
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="HESABIMI SIL"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500/30 transition-all duration-150"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-all duration-150 border border-white/[0.05]"
                >
                  İptal
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || deleteConfirmText !== "HESABIMI SIL"}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Hesabı Sil
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
