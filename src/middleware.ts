import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth/session';
import { cookies } from 'next/headers'; // Import cookies from next/headers

// Define a basic type for your session object based on observed structure
interface Session {
  userId?: string;
  email?: string | null;
  name?: string | null;
  role?: string | null; // Added role property
  iat?: number;
  exp?: number;
  // Add any other properties that might be on your session object
}


// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/dashboard/profile', '/dashboard/settings'];
const publicRoutes = ['/', '/auth/login', '/auth/signup', '/auth/forgot-password'];
// Make sure all your admin paths start with /admin
const adminRoutes = ['/admin', '/admin/events', '/admin/prayer-requests', '/admin/users'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Determine the type of route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);
  const isAdminRoute = adminRoutes.some(route => path.startsWith(route)); // Check if it's an admin route

  // 3. Decrypt the session from the cookie
  // Correctly access the cookie
  const sessionCookie = (await cookies()).get('session')?.value;
  console.log('[Middleware] Path:', path);
  console.log('[Middleware] Session cookie value:', sessionCookie ? 'Exists' : 'Does not exist');

  let session: Session | null; // Use the defined Session type
  if (sessionCookie) {
    try {
      // Assert the decrypted session to our Session type
      session = await decrypt(sessionCookie) as Session;
      console.log('[Middleware] Decrypted session:', session);
    } catch (e) {
      console.error('[Middleware] Error decrypting session:', e);
      session = null;
    }
  } else {
    session = null;
    console.log('[Middleware] No session cookie found.');
  }

  // Get user role directly from the session object
  const userRole = session?.role; 


  // --- Middleware Logic ---

  // 1. If trying to access a public route while authenticated, redirect to dashboard (unless it's the dashboard itself)
  // Ensure we don't redirect if it's an admin route (covered by the isAdminRoute check later)
  if (isPublicRoute && session?.userId && path !== '/dashboard' && !isAdminRoute) {
      console.log('[Middleware] Authenticated user accessing public route. Redirecting to dashboard.');
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // 2. If trying to access a protected route without authentication, redirect to login
  // This applies to both standard protected routes AND admin routes if not authenticated
  if ((isProtectedRoute || isAdminRoute) && !session?.userId) {
      console.log('[Middleware] Accessing protected or admin route without session. Redirecting to /login.');
      return NextResponse.redirect(new URL('/login?redirect=' + path, req.nextUrl));
  }

  // 3. If trying to access an admin route with authentication, check role-based access
  if (isAdminRoute && session?.userId) { // Only check role if it's an admin route and user is authenticated
      const allowedAdminRoles = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER']; // Define roles allowed to access ANY admin route
      if (!userRole || !allowedAdminRoles.includes(userRole)) {
          console.log('[Middleware] Accessing admin route with insufficient privileges. Redirecting to /login.');
          // Redirect to login, or potentially an unauthorized page (login is safer as it handles unauthenticated state too)
          return NextResponse.redirect(new URL('/login?redirect=' + path, req.nextUrl));
      }
      // If authenticated and role is allowed, proceed
      console.log('[Middleware] Accessing admin route with sufficient privileges. Allowing access.');
      return NextResponse.next();
  }

  // 4. For any other routes that are not public, protected, or admin, allow access
  // This handles cases that don't fall into the above categories
   console.log('[Middleware] Allowing access to other routes:', path);
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|favicon.ico).*))'],
};

