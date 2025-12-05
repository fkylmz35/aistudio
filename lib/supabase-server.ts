import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("[Supabase Server] Missing environment variables:", {
    url: supabaseUrl ? "SET" : "MISSING",
    key: supabaseAnonKey ? "SET" : "MISSING",
  })
}

// Server client factory - server components ve route handlers için
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server Component'ta çağrıldığında set yapılamaz, bu beklenen bir durum
        }
      },
    },
  })
}
