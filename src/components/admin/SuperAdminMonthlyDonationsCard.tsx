"use client";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function SuperAdminMonthlyDonationsCard() {
  const { data: session } = useSession();
  useEffect(() => {
    const role = session?.user?.role;
    const card = document.getElementById('super-admin-monthly-donations');
    if (card) {
      card.style.display = role === 'SUPER_ADMIN' ? '' : 'none';
    }
  }, [session]);
  return null;
}
