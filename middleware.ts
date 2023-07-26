import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(
      new URL(
        `${request.nextUrl.protocol}://${process.env.API_URL}${request.nextUrl.pathname}${request.nextUrl.search}`,
        request.url
      )
    )
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}
