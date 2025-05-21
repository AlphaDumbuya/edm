// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, verifyPassword } from '@/lib/db/users';
import { encrypt } from '@/lib/auth/session';
import { cookies } from 'next/headers';

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials. User not found.' }, { status: 401 });
    }

    if (!user.hashedPassword) {
        console.error(`User ${email} found but has no hashedPassword set. Cannot perform password authentication.`);
        return NextResponse.json({ error: 'Authentication method not supported or account misconfigured.' }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, user.hashedPassword);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials. Password incorrect.' }, { status: 401 });
    }

    // Password is valid, create session
    const sessionPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      // emailVerified: user.emailVerified, // Include if you have email verification
    };

    const encryptedSession = await encrypt(sessionPayload);

    cookies().set('session', encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });

    const { hashedPassword, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: 'Login successful', user: userWithoutPassword },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Login API error:', error.message, error.stack);
    if (error instanceof SyntaxError && error.message.toLowerCase().includes('json')) {
      // This error would be from `await req.json()`
      return NextResponse.json({ error: 'Invalid request format. Expected JSON.' }, { status: 400 });
    }
    // For other errors (like SESSION_SECRET issues from encrypt, or DB issues)
    return NextResponse.json({ error: 'An internal server error occurred during login. Please try again or contact support if the issue persists.' }, { status: 500 });
  }
}
