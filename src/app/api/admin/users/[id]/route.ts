// src/app/api/admin/users/[id]/route.ts

import { NextResponse } from 'next/server';
import { updateUser as dbUpdateUser } from '@/lib/db/users';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Moved from users.ts
export async function findUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw new Error('Error finding user by ID');
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await findUserById(userId);

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in user GET API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { name, email } = body;

    const updatedUser = await dbUpdateUser(userId, { name, email });

    if (updatedUser) {
      return NextResponse.json(updatedUser);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in user PUT API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}