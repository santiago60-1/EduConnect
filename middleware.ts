import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || 
                (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  
  const pathname = request.nextUrl.pathname;

  // Allow login page without token
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Protect other routes
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profesor/:path*',
    '/estudiante/:path*',
    '/admin/:path*',
  ],
};
