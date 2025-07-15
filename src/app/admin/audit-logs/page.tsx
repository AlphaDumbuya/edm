'use client';

import { useEffect, useState, useCallback } from 'react';
import { type AuditLog } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function AuditLogPage() {
  const [auditLogs, setAuditLogs] = useState<Array<AuditLog & { user: { email: string; name: string | null } | null }>>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAuditLogs = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/audit-logs');
      const data = await res.json();
      setAuditLogs(data);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAuditLogs();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchAuditLogs().finally(() => setLoading(false));
  }, [fetchAuditLogs]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const details = document.querySelectorAll('details[open]');
      details.forEach(detail => {
        if (!detail.contains(event.target as Node)) {
          detail.removeAttribute('open');
        }
      });
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Audit Log</h1>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Audit Log</h1>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {auditLogs.length === 0 ? (
        <p>No audit log entries found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">User</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Type</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Action</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Time</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm max-w-[200px] truncate" title={log.user?.email || 'Unknown User'}>
                    {log.user?.email || 'Unknown User'}
                  </td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{log.entityType}</td>
                  <td className="py-3 px-4 text-sm font-mono text-xs max-w-[100px] truncate" title={log.entityId || '-'}>
                    {log.entityId || '-'}
                  </td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{log.action}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {log.details ? (
                      <details className="group relative">
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                          View Details
                        </summary>
                        <div className="absolute z-50 left-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-lg shadow-lg">
                          <div className="p-4 max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-semibold">Log Details</h4>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  const details = e.currentTarget.closest('details');
                                  if (details) details.removeAttribute('open');
                                }}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                ×
                              </button>
                            </div>
                            <pre className="text-xs bg-gray-50 p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </details>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}