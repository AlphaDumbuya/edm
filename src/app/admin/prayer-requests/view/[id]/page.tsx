"use client";

import { useParams } from 'next/navigation';

export default function ViewPrayerRequestPage() {
  const params = useParams();
  const requestId = Array.isArray(params?.id)
    ? params.id[0]
    : typeof params?.id === 'string'
      ? params.id
      : undefined;

  return (
    <div className="text-red-600 font-bold text-center py-12">
      Viewing individual prayer requests is currently disabled due to editor compatibility issues.<br />
      (ID: {requestId})
    </div>
  );
}