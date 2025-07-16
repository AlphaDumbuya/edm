"use client";
import React, { useState, useEffect } from 'react';
import AdminNotificationBell, { Notification } from './AdminNotificationBell';

interface AdminDashboardNotificationsClientProps {
  initialNotifications?: Notification[];
}

const AdminDashboardNotificationsClient: React.FC<AdminDashboardNotificationsClientProps> = ({ initialNotifications = [] }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/notifications');
    if (res.ok) {
      const data = await res.json();
      setNotifications(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  // Delete notification via API
  const handleRemove = async (id: string) => {
    const res = await fetch('/api/admin/notifications/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <AdminNotificationBell notifications={notifications} onRemove={handleRemove} />
  );
};

export default AdminDashboardNotificationsClient;
