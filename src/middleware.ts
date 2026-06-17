import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Memproteksi seluruh route yang diawali dengan /admin
  if (pathname.startsWith('/admin')) {
    // Abaikan rute login agar tidak terjadi infinite loop redirect
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET || "dummy_secret_for_development" 
    });

    if (!token) {
      // Redirect ke halaman login jika tidak ada token
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
