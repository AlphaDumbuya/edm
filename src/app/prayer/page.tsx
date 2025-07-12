"use client";

import React, { useEffect, useState } from 'react';
import { getAllPrayerRequests } from '@/lib/db/prayerRequests';
import PrayerMapClient from '@/components/prayer/PrayerMapClient';

function hasPrayedFor(prayerId: string): boolean {
  if (typeof window === 'undefined') return false;
  const prayed = localStorage.getItem('prayedRequests') || '[]';
  return JSON.parse(prayed).includes(prayerId);
}

function markPrayedFor(prayerId: string) {
  if (typeof window === 'undefined') return;
  const prayed = localStorage.getItem('prayedRequests') || '[]';
  const arr = JSON.parse(prayed);
  if (!arr.includes(prayerId)) {
    arr.push(prayerId);
    localStorage.setItem('prayedRequests', JSON.stringify(arr));
  }
}

export default function PrayerPage() {
  const [prayerRequests, setPrayerRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [_, forceUpdate] = useState(0); // for re-render

  useEffect(() => {
    (async () => {
      const { prayerRequests } = await getAllPrayerRequests({});
      setPrayerRequests(prayerRequests);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8" style={{ height: '350px' }}>
        <PrayerMapClient
          locations={[
            { lat: 8.387584, lng: -13.1517581, label: '66 Main Grafton Rd, Kossoh Town, Freetown, Sierra Leone' },
            { lat: 45.5092501, lng: -122.5366013, label: '12301 SE Stephens St, Portland, OR 97233, USA' },
          ]}
          zoom={16}
        />
      </div>
      <h1 className="text-2xl font-bold mb-6">Prayer Requests</h1>
      {prayerRequests.length === 0 ? (
        <p className="text-gray-500">No public prayer requests found yet.</p>
      ) : (
        <div className="space-y-6">
          {prayerRequests.map((req) => {
            const prayed = hasPrayedFor(req.id);
            return (
              <div key={req.id} className="bg-white rounded shadow p-4 border border-gray-100">
                <h2 className="text-lg font-semibold mb-2">{req.title}</h2>
                <p className="mb-2 text-gray-700">{req.body}</p>
                <div className="text-xs text-gray-500 mb-2">
                  {req.authorName && <span>By: {req.authorName} &middot; </span>}
                  {new Date(req.createdAt).toLocaleDateString()}
                </div>
                {!prayed ? (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => { markPrayedFor(req.id); forceUpdate((n) => n + 1); }}
                  >
                    Pray for this
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold">You have prayed for this</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}