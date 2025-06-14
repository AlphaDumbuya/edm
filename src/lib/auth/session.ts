// src/lib/auth/session.ts
import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const secretKey = process.env.SESSION_SECRET;

// Ensure TextEncoder is only used if secretKey is valid
function getEncodedKey() {
  if (!secretKey || secretKey.length < 32) {
    console.error('CRITICAL: SESSION_SECRET environment variable is not set or is too short. It must be at least 32 characters for HS256 algorithm.');
    throw new Error('Server configuration error: Session secret is missing or invalid.');
  }
  return new TextEncoder().encode(secretKey);
}

export interface SessionPayload extends JWTPayload {
  userId: string;
  email?: string | null;
  name?: string | null;
  role: string;
  // iat (issuedAt) and exp (expirationTime) will be set by jose
}

export async function encrypt(payload: SessionPayload) {
  const encodedKey = getEncodedKey(); // This will throw if secretKey is invalid
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Session duration
    .sign(encodedKey);
}

export async function decrypt(sessionCookieValue: string | undefined): Promise<SessionPayload | null> {
  if (!sessionCookieValue) {
    return null;
  }
  try {
    const encodedKey = getEncodedKey(); // This will throw if secretKey is invalid during decryption attempt
    const { payload } = await jwtVerify(sessionCookieValue, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    // console.error('Failed to verify or decrypt session:', error); // Log specific JWT errors for debugging
    return null; // Treat as invalid session if any error occurs
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  const sessionCookie = await (await cookies()).get('session'); // Assuming 'session' is the name of your session cookie
  const session = await decrypt(sessionCookie?.value);
  if (!session) {
    return null;
  }
  return session.userId;
}
