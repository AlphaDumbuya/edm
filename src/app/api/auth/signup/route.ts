// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/db/users';
import { encrypt } from '@/lib/auth/session';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const newUser = await createUser(email, password, name);
    if (!newUser) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
    }
    const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // Ensure SESSION_MAX_AGE is declared within the function if used here

    return NextResponse.json({ message: 'Signup successful. Please log in.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
