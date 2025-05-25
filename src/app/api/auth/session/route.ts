// src/app/api/auth/session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt, type SessionPayload } from '@/lib/auth/session';

import { prisma } from '@/lib/db/prisma'; // Assuming your prisma client is exported from here
export async function GET(req: NextRequest) {
  console.log('[/api/auth/session] GET request received.');
  const sessionCookie = (await cookies()).get('session')?.value;

  if (!sessionCookie) {
    console.log('[/api/auth/session] No session cookie found.');
    return NextResponse.json({ user: null }, { status: 200 });
  }
  console.log('[/api/auth/session] Session cookie found:', sessionCookie.substring(0, 20) + "..."); // Log a snippet for privacy

  try {
    const decryptedSession = await decrypt(sessionCookie);
    console.log('[/api/auth/session] Attempted decryption. Result:', decryptedSession);

    if (decryptedSession && decryptedSession.userId) {
      console.log('[/api/auth/session] Session decrypted successfully. User ID:', decryptedSession.userId);
      // Return only necessary user fields

      // Fetch the latest user data from the database
      const latestUser = await prisma.user.findUnique({ where: { id: decryptedSession.userId } });

      if (!latestUser) {
        console.log('[/api/auth/session] User not found in database for ID:', decryptedSession.userId);
        // Clear invalid session cookie if user not found
        const response = NextResponse.json({ user: null, error: 'User not found' }, { status: 200 });
        response.cookies.set('session', '', { httpOnly: true, maxAge: 0, path: '/' });
        return response;
      }

      const userForClient = {
        // Use data from the latest user fetch
        ...latestUser, // Spread all properties from the latest user
      };
      return NextResponse.json({ user: userForClient }, { status: 200 });
    } else {
      console.log('[/api/auth/session] Session cookie present, but decryption failed or no userId in payload.');
      // Consider clearing the invalid cookie here as well
      const response = NextResponse.json({ user: null, error: 'Invalid session' }, { status: 200 }); // Changed to 200 to avoid breaking client if it expects user:null
      response.cookies.set('session', '', { httpOnly: true, maxAge: 0, path: '/' });
      return response;
    }
  } catch (error: any) {
    console.error('[/api/auth/session] CRITICAL: Error during session decryption:', error.message, error.stack);
    // This typically means SESSION_SECRET is wrong or token is malformed
    const response = NextResponse.json({ user: null, error: 'Session decryption failed.' }, { status: 500 });
    response.cookies.set('session', '', { httpOnly: true, maxAge: 0, path: '/' }); // Clear bad cookie
    return response;
  }
}
