'use client';

import { useEffect } from 'react';

interface User {
  email: string;
  name: string | null;
}

interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  details: any;
  timestamp: string;
  user: User | null;
}

export function AuditLogTable({ initialData }: { initialData: AuditLog[] }) {
  // Click outside handler for details elements
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

  return (
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
          {initialData.map((log) => (
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
  );
}
