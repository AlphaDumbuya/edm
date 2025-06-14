import prisma from '@/lib/db/prisma';

export default async function AuditLogPage() {
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: {
 timestamp: 'desc',
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Audit Log</h1>

      {auditLogs.length === 0 ? (
        <p>No audit log entries found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Entity Type</th>
              <th className="py-2 px-4 border-b">Entity ID</th>
              <th className="py-2 px-4 border-b">Action</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{log.user?.email || 'Unknown User'}</td>
                <td className="py-2 px-4 border-b">{log.entityType}</td>
                <td className="py-2 px-4 border-b">{log.entityId || '-'}</td>
                <td className="py-2 px-4 border-b">{log.action}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b text-sm">
 {log.details ? (
 <pre className="whitespace-pre-wrap">{JSON.stringify(log.details, null, 2)}</pre>
 ) : ('N/A')}
 </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}