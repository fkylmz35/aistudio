import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug: Check if env vars are set
if (typeof window !== "undefined") {
  console.log("[Supabase Browser] Environment check:", {
    url: supabaseUrl ? "SET" : "MISSING",
    key: supabaseAnonKey ? "SET" : "MISSING",
  })
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Missing Supabase environment variables. URL: ${supabaseUrl ? "SET" : "MISSING"}, KEY: ${supabaseAnonKey ? "SET" : "MISSING"}`
  )
}

// Browser client - client components için
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
