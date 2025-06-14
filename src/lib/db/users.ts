// src/lib/db/users.ts
import prisma from './prisma';
import bcrypt from 'bcryptjs';
import type { User as PrismaUser } from '@prisma/client'; // Import Prisma-generated User type

// Define a slightly simplified User type for application use if needed, or use PrismaUser directly
export interface AppUser {
  id: string;
  email: string;
  name?: string | null;
  // Do not include hashedPassword in AppUser that might be sent to client
}

export async function findUserByEmail(email: string): Promise<PrismaUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

export async function findUserById(id: string): Promise<AppUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { // Only select fields safe to expose or use in session
        id: true,
        email: true,
        name: true,
      }
    });
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    return null;
  }
}

export async function createUser(email: string, plainPassword_1: string, name?: string): Promise<PrismaUser | null> {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword_1, 10);
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name: name || null,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    // Consider more specific error handling, e.g., for unique constraint violation on email
    return null;
  }
}

export async function verifyPassword(plainPassword_1: string, hashedPassword_1: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainPassword_1, hashedPassword_1);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

// Placeholder for session creation - Neon DB sessions will be handled by session.ts
// This can be expanded for database-backed sessions if needed later.
export async function createDbSession(userId: string, expiresAt: Date) {
  try {
    const session = await prisma.session.create({
      data: {
        userId,
        expiresAt,
      },
    });
    return session;
  } catch (error) {
    console.error('Error creating DB session:', error);
    return null;
  }
}

export async function getDbSession(sessionId: string) {
  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session) { // Session expired
      await prisma.session.delete({ where: { id: sessionId }});
    }
    return null;
  } catch (error) {
    console.error('Error getting DB session:', error);
    return null;
  }
}

export async function deleteDbSession(sessionId: string) {
  try {
    await prisma.session.delete({
      where: { id: sessionId },
    });
  } catch (error) {
    console.error('Error deleting DB session:', error);
    // Fail silently or handle as appropriate
  }
}

export async function deleteUserDbSessions(userId: string) {
    try {
        await prisma.session.deleteMany({
            where: { userId: userId }
        });
    } catch (error) {
        console.error('Error deleting user DB sessions:', error);
    }
}
