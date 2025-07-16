import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true }
        }
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API /api/blog error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts.' }, { status: 500 });
  }
}
