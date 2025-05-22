// src/app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the session cookie
    (await cookies()).set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // Expire the cookie immediately
      path: '/',
      sameSite: 'lax',
    });
    console.log('[/api/auth/logout] Session cookie cleared.');
    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  } catch (error: any) {
    console.error('[/api/auth/logout] Logout API error:', error.message);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
