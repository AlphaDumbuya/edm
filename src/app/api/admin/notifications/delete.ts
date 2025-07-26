import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Audit Log ID required' }, { status: 400 });
    }
    await prisma.auditLog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = typeof error === 'object' && error !== null && 'message' in error
      ? (error as { message?: string }).message
      : undefined;
    return NextResponse.json({ error: errorMessage || 'Failed to delete audit log notification' }, { status: 500 });
  }
}
