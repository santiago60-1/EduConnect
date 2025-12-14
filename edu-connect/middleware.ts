import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // El middleware no hace nada aquí, la protección se maneja en el cliente con useAuth
  // Esto evita bucles infinitos de redirección
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profesor/:path*',
    '/estudiante/:path*',
    '/admin/:path*',
  ],
};
