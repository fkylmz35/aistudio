import { NextResponse, type NextRequest } from "next/server"

// Supabase URL'den project reference'ı çıkar
// https://aajvdtalqaidbhtryxdl.supabase.co -> aajvdtalqaidbhtryxdl
const getProjectRef = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return null
  const match = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)
  return match ? match[1] : null
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require auth
  const publicRoutes = ["/login", "/register", "/auth/callback", "/"]
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith("/auth/"))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Supabase auth token cookie kontrolü
  // Format: sb-<project-ref>-auth-token
  const projectRef = getProjectRef()
  const cookieName = projectRef ? `sb-${projectRef}-auth-token` : null
  const supabaseAuthToken = cookieName ? request.cookies.get(cookieName)?.value : null

  // Token yoksa login sayfasına yönlendir
  if (!supabaseAuthToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
