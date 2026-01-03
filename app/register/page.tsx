"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase-browser"
import { Mail, Lock, Eye, EyeOff, Loader2, User, Check, Sparkles, Gift } from "lucide-react"

// Şifre validasyon kuralları
const passwordRequirements = {
  minLength: { test: (p: string) => p.length >= 6, label: "En az 6 karakter" },
  hasUppercase: { test: (p: string) => /[A-Z]/.test(p), label: "En az 1 büyük harf" },
  hasLowercase: { test: (p: string) => /[a-z]/.test(p), label: "En az 1 küçük harf" },
  hasNumber: { test: (p: string) => /[0-9]/.test(p), label: "En az 1 rakam" },
}

const validatePassword = (password: string) => {
  return Object.values(passwordRequirements).every((req) => req.test(password))
}

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor")
      return
    }

    if (!validatePassword(password)) {
      setError("Şifre gereksinimleri karşılanmıyor")
      return
    }

    setIsLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      const errorMessages: Record<string, string> = {
        "User already registered": "Bu email adresi zaten kayıtlı",
        "Password should be at least 6 characters": "Şifre en az 6 karakter olmalıdır",
        "Unable to validate email address: invalid format": "Geçersiz email formatı",
        "Signup requires a valid password": "Geçerli bir şifre giriniz",
        "To signup, please provide your email": "Lütfen email adresinizi girin",
        "Too many requests": "Çok fazla deneme yaptınız. Lütfen biraz bekleyin.",
        "Network error": "Bağlantı hatası. İnternet bağlantınızı kontrol edin.",
      }
      setError(errorMessages[error.message] || "Kayıt olurken bir hata oluştu")
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError("Google ile kayıt olurken bir hata oluştu")
      setIsGoogleLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background with noise texture */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-900"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Blur orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="bg-zinc-900/50 border border-white/[0.08] rounded-2xl p-8 text-center backdrop-blur-sm">
              <div className="w-20 h-20 bg-green-500/20 border border-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">Email Onayı Gerekli</h1>
              <p className="text-zinc-400 mb-6">
                <strong className="text-white">{email}</strong> adresine bir onay maili gönderdik. Lütfen mailinizi
                kontrol edin ve hesabınızı doğrulayın.
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-colors"
              >
                Giriş Sayfasına Dön
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with noise texture */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-900"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Blur orbs for ambient effect */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                <Image src="/logo.png" alt="Nairoo" width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-semibold text-white">Nairoo AI Studio</span>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-zinc-900/50 border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
                <Gift className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-400">40 Kredi Hediye</span>
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-white text-center mb-2">Hesap Oluştur</h1>
            <p className="text-zinc-400 text-center mb-8">Nairoo AI Studio ile görsel oluşturmaya başlayın</p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6"
              >
                <p className="text-red-400 text-sm text-center">{error}</p>
              </motion.div>
            )}

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-zinc-100 text-black font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google ile Kayıt Ol
                </>
              )}
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.08]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-900/50 text-zinc-500">veya</span>
              </div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/[0.15] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/[0.15] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Şifre</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-11 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/[0.15] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Şifre gereksinimleri */}
                {password && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {Object.entries(passwordRequirements).map(([key, req]) => (
                      <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
                        <div className={`w-2 h-2 rounded-full ${req.test(password) ? "bg-green-500" : "bg-zinc-600"}`} />
                        <span className={`text-xs ${req.test(password) ? "text-green-500" : "text-zinc-500"}`}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Şifre Tekrar</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/[0.15] transition-colors"
                  />
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-2 text-xs text-red-400">Şifreler eşleşmiyor</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-white focus:ring-white/20 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-zinc-400 cursor-pointer">
                  <Link href="/yasal#kullanim-sartlari" target="_blank" className="text-white hover:underline">Kullanım Şartları</Link>,{" "}
                  <Link href="/yasal#gizlilik" target="_blank" className="text-white hover:underline">Gizlilik Politikası</Link> ve{" "}
                  <Link href="/yasal#kvkk" target="_blank" className="text-white hover:underline">KVKK Aydınlatma Metni</Link>'ni okudum ve kabul ediyorum.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || !termsAccepted}
                className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Kayıt Olunuyor...
                  </>
                ) : (
                  "Kayıt Ol"
                )}
              </button>
            </form>

            <p className="text-center text-zinc-400 mt-6">
              Zaten hesabınız var mı?{" "}
              <Link href="/login" className="text-white hover:underline">
                Giriş Yap
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
