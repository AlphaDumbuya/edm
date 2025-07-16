import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId, action, entityType, entityId, details } = await req.json();
    await prisma.auditLog.create({
      data: {
        userId: userId && userId !== 'system' ? userId : null,
        action,
        entityType,
        entityId,
        details,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API audit log error:', error);
    return NextResponse.json({ error: 'Failed to create audit log entry' }, { status: 500 });
  }
}
