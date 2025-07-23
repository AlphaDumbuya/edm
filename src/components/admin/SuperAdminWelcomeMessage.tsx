"use client";
import React, { useEffect, useState } from "react";

export default function SuperAdminWelcomeMessage({ name }: { name: string }) {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState('SUPER_ADMIN');

  useEffect(() => {
    setTimeout(() => {
      try {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const found = cookies.find(c => c.startsWith('superadmin_welcome='));
        if (!found) {
          setShow(true);
        }
        // Try to get role from session token
        const sessionCookie = cookies.find(c => c.startsWith('next-auth.session-token='));
        if (sessionCookie) {
          const jwt = sessionCookie.split('=')[1];
          const base64Payload = jwt.split('.')[1];
          const payload = JSON.parse(atob(base64Payload));
          setRole(payload.role || 'SUPER_ADMIN');
        }
      } catch (err) {
        console.error('[SuperAdminWelcomeMessage] Error:', err);
      }
    }, 0);
  }, []);

  const handleOk = () => {
    document.cookie = 'superadmin_welcome=1; path=/; max-age=31536000';
    setShow(false);
  };

  if (!show) return null;
  let message = null;
  if (role === 'ADMIN') {
    message = (
      <>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome, {name}!</h2>
        <p className="mb-6 text-lg text-gray-700">You are logged in as <span className="font-semibold">Admin</span>. You have access to manage users, donations, events, and content. Please use your privileges responsibly.</p>
      </>
    );
  } else {
    message = (
      <>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome, {name}!</h2>
        <p className="mb-6 text-lg text-gray-700">Thank you for leading our organization. Your dashboard is ready—let's make a difference together!</p>
      </>
    );
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white bg-opacity-95 rounded-xl shadow-2xl p-8 text-center max-w-md mx-auto animate-fade-in">
        {message}
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={handleOk}
        >
          OK
        </button>
      </div>
    </div>
  );
}
