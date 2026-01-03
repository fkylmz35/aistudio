import { NextResponse, type NextRequest } from "next/server"

// Tüm sayfalar artık public erişime açık
// Auth kontrolü component seviyesinde yapılacak (action-based auth)
export async function middleware(request: NextRequest) {
  // Tüm sayfalara erişime izin ver
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
