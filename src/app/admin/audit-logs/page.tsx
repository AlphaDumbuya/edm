"use client";
import { useState, useEffect } from "react";

export default function AuditLogPage() {
  const [auditLogs, setAuditLogs] = useState<Array<{
    id: string;
    user?: { email?: string } | null;
    entityType: string;
    entityId?: string | null;
    action: string;
    timestamp: string;
    details?: any;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  const totalPages = Math.ceil(auditLogs.length / logsPerPage);

  const fetchAuditLogs = async () => {
    setLoading(true);
    // Ensure cookies are sent for authentication
    const res = await fetch("/api/admin/audit-logs", {
      credentials: "include"
    });
    if (res.ok) {
      const data = await res.json();
      setAuditLogs(data.auditLogs || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  // Pagination logic
  const paginatedLogs = auditLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  return (
    <div className="container mx-auto py-2 sm:py-8 px-1 sm:px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 gap-2 w-full">
        <h1 className="text-lg sm:text-2xl font-bold w-full sm:w-auto text-left mt-4 mb-2">Audit Log</h1>
        <div className="flex w-full sm:w-auto justify-end">
          <button
            className="flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition font-medium shadow w-auto justify-center"
            title="Refresh audit log list"
            onClick={fetchAuditLogs}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581m-2.638 2.638A7.974 7.974 0 0112 20c-4.418 0-8-3.582-8-8 0-1.657.507-3.197 1.382-4.462m2.638-2.638A7.974 7.974 0 0112 4c4.418 0 8 3.582 8 8 0-1.657-.507-3.197-1.382 4.462" />
            </svg>
            Refresh
          </button>
        </div>
      </div>
      {loading ? (
        <p className="text-gray-400 text-xs sm:text-sm">Loading...</p>
      ) : auditLogs.length === 0 ? (
        <p className="text-gray-400 text-xs sm:text-sm">No audit log entries found.</p>
      ) : (
        <>
          <div className="w-full mx-auto text-xs sm:text-sm" style={{ overflowX: 'auto' }}>
            <table className="min-w-full w-full bg-gray-900 text-gray-100 border border-gray-700 text-xs sm:text-sm">
              <thead className="bg-gray-800 text-gray-200">
                <tr>
                  <th className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 text-xs sm:text-sm">User ID</th>
                  <th className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 text-xs sm:text-sm">Entity Type</th>
                  <th className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 text-xs sm:text-sm">Entity ID</th>
                  <th className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 text-xs sm:text-sm">Action</th>
                  <th className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 text-xs sm:text-sm">Timestamp</th>
                  <th className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 text-xs sm:text-sm">Details</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-800">
                    <td className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 break-all max-w-[120px] xs:max-w-none text-xs sm:text-sm">{log.user?.email || 'Unknown User'}</td>
                    <td className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 break-all max-w-[80px] xs:max-w-none text-xs sm:text-sm">{log.entityType}</td>
                    <td className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 break-all max-w-[80px] xs:max-w-none text-xs sm:text-sm">{log.entityId || '-'}</td>
                    <td className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 break-all max-w-[80px] xs:max-w-none text-xs sm:text-sm">{log.action}</td>
                    <td className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 break-all max-w-[120px] xs:max-w-none text-xs sm:text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="py-1 px-2 sm:py-2 sm:px-4 border-b border-gray-700 text-xs sm:text-sm break-all max-w-[160px] xs:max-w-none">
                      {log.details ? (
                        <pre className="whitespace-pre-wrap text-gray-300 text-xs sm:text-sm">{JSON.stringify(log.details, null, 2)}</pre>
                      ) : ('N/A')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination controls */}
          <div className="flex flex-row items-center justify-between gap-4 mt-4 w-full max-w-lg mx-auto">
            <button
              className="px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 font-medium shadow disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-300 text-sm text-center flex-1">Page {currentPage} of {totalPages}</span>
            <button
              className="px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 font-medium shadow disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}