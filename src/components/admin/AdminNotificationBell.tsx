import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Trash2 } from 'lucide-react';

export interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

interface AdminNotificationBellProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const AdminNotificationBell: React.FC<AdminNotificationBellProps> = ({ notifications, onRemove }) => {
  const [open, setOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const unreadCount = notifications.length;

  useEffect(() => {
    if (unreadCount > 0) {
      setShake(true);
      const timeout = setTimeout(() => setShake(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [unreadCount]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (open && e.target instanceof Node) {
        const bell = document.getElementById('admin-notification-bell');
        const dropdown = document.getElementById('admin-notification-dropdown');
        if (bell && !bell.contains(e.target) && dropdown && !dropdown.contains(e.target)) {
          setOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      <button
        id="admin-notification-bell"
        className={`relative focus:outline-none ${shake ? 'animate-shake' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
      >
        <Bell className="w-7 h-7 text-blue-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border border-white">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div id="admin-notification-dropdown" className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 animate-fade-in">
          <div className="p-4 border-b font-semibold text-gray-700 flex justify-between items-center">
            <span className="flex items-center gap-2"><Bell className="w-5 h-5 text-blue-600" /> Notifications</span>
            <button className="text-xs text-gray-400 hover:text-red-500" onClick={() => setOpen(false)} title="Close notifications">✕</button>
          </div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <li className="p-6 text-gray-500 text-center flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                <span>No notifications</span>
              </li>
            ) : (
              notifications.map((n) => (
                <li key={n.id} className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition rounded-lg">
                  <div className="flex flex-col gap-1">
                    <span className="text-base text-gray-800 font-medium">{n.message}</span>
                    {n.createdAt && <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</span>}
                  </div>
                  <button
                    className="ml-3 text-gray-400 hover:text-red-500 p-2 rounded-full border border-transparent hover:border-red-200 transition"
                    onClick={() => onRemove(n.id)}
                    aria-label="Remove notification"
                    title="Delete notification"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      <style jsx>{`
        @keyframes shake {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-15deg); }
          40% { transform: rotate(10deg); }
          60% { transform: rotate(-10deg); }
          80% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-shake {
          animation: shake 0.7s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default AdminNotificationBell;
