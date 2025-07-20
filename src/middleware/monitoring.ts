import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const requestStart = Date.now();
  
  // Create a response
  const response = NextResponse.next();
  
  // Add timing headers
  response.headers.set('X-Response-Time', `${Date.now() - requestStart}ms`);
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
