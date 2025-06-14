
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth/session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/dashboard/profile', '/dashboard/settings'];
const publicRoutes = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const sessionCookie = (await cookies()).get('session')?.value;
  console.log('[Middleware] Path:', path);
  console.log('[Middleware] Session cookie value:', sessionCookie ? 'Exists' : 'Does not exist');
  
  let session;
  if (sessionCookie) {
    try {
      session = await decrypt(sessionCookie);
      console.log('[Middleware] Decrypted session:', session);
    } catch (e) {
      console.error('[Middleware] Error decrypting session:', e);
      session = null;
    }
  } else {
    session = null;
    console.log('[Middleware] No session cookie found.');
  }

  // 4. Redirect to /login if the user is not authenticated and trying to access a protected route
  if (isProtectedRoute && !session?.userId) {
    console.log('[Middleware] Protected route, no session. Redirecting to login.');
    return NextResponse.redirect(new URL('/auth/login?redirect=' + path, req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated and trying to access a public route (except /dashboard itself)
  if ( isPublicRoute && session?.userId && !path.startsWith('/dashboard') ) {
    console.log('[Middleware] Public route, user has session. Redirecting to dashboard.');
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
  
  console.log('[Middleware] Allowing request to proceed for path:', path);
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|favicon.ico).*)'],
};
