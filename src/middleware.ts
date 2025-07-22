import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define middleware function with monitoring
export function middleware(request: NextRequest) {
  // Skip monitoring for static files and images
  if (request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico)$/)) {
    return NextResponse.next();
  }

  // Don't redirect to verify page if user is accessing login or API endpoints
  if (request.nextUrl.pathname.startsWith('/api/') || 
      request.nextUrl.pathname === '/auth/login' ||
      request.nextUrl.pathname === '/auth/signup') {
    const requestStart = Date.now();
    const response = NextResponse.next();
    response.headers.set('X-Response-Time', `${Date.now() - requestStart}ms`);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    return response;
  }

  const requestStart = Date.now();
  const response = NextResponse.next();
  
  // Add timing headers
  response.headers.set('X-Response-Time', `${Date.now() - requestStart}ms`);
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

// Configure matcher to include API routes but exclude static files
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next|static|public|favicon.ico).*)',
  ],
};

