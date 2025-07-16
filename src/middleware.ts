import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define simple middleware function
export function middleware(request: NextRequest) {
  // Allow all routes for now
  return NextResponse.next();
}

// Configure matcher
export const config = {
  matcher: [
    // Skip all static files, API routes, and images
    '/((?!api|_next|static|favicon.ico).*)',
  ],
};

