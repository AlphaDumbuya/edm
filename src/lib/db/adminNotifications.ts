import prisma from './prisma';

export async function getRecentAdminNotifications(limit = 10) {
  // Fetch recent audit logs (all key activities)
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { timestamp: 'desc' },
    take: limit,
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  // Map audit logs to notification format
  return auditLogs.map((log) => ({
    id: log.id,
    message: `${log.action} (${log.entityType}) by ${log.user?.name || log.user?.email || 'System'}`,
    createdAt: log.timestamp.toISOString(),
  }));
}
