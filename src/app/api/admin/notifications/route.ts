import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Fetch audit logs as notifications
  const auditLogs = await prisma.auditLog.findMany({
    where: {}, // Optionally filter by userId, entityType, etc.
    orderBy: { timestamp: 'desc' },
    take: 50, // Limit to recent 50 logs
  });
  // Map audit logs to notification format
  const notifications = auditLogs.map(log => {
    let name = '';
    if (log.details && typeof log.details === 'object' && !Array.isArray(log.details)) {
      name = (log.details as any).name || '';
    }
    return {
      id: log.id,
      message: `${log.action}${name ? ` - ${name}` : ''}`,
      createdAt: log.timestamp,
      details: log.details,
      entityType: log.entityType,
      entityId: log.entityId,
    };
  });
  return NextResponse.json(notifications);
}
