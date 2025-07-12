"use client";
import React from "react";
import AdminDashboardOverlay from "@/components/admin/AdminDashboardOverlay";

export default function AdminDashboardClientLayout({ children, name }: { children: React.ReactNode; name: string }) {
  // Read the session token from the cookie and decode the user's name
  let realName = name;
  if (typeof document !== 'undefined') {
    try {
      const cookies = document.cookie.split(';').map(c => c.trim());
      const sessionCookie = cookies.find(c => c.startsWith('next-auth.session-token='));
      if (sessionCookie) {
        const jwt = sessionCookie.split('=')[1];
        const base64Payload = jwt.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        console.log('[AdminDashboardClientLayout] Decoded JWT payload:', payload);
        realName = payload.name || payload.email || realName;
      } else {
        console.log('[AdminDashboardClientLayout] No session token cookie found');
      }
    } catch (err) {
      console.error('[AdminDashboardClientLayout] Error decoding JWT:', err);
    }
  }
  return (
    <>
      <AdminDashboardOverlay name={realName} />
      {children}
    </>
  );
}
