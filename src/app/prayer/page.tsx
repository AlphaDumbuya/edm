"use client";

import React, { useEffect, useState } from 'react';
import { getAllPrayerRequests } from '@/lib/db/prayerRequests';
import PrayerMapClient from '@/components/prayer/PrayerMapClient';

interface PrayerRequest {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  authorName?: string;
  published: boolean;
}

function hasPrayedFor(prayerId: string): boolean {
  if (typeof window === 'undefined') return false;
  const prayed = localStorage.getItem('prayedRequests') || '[]';
  return JSON.parse(prayed).includes(prayerId);
}

async function markPrayedFor(prayerId: string) {
  if (typeof window === 'undefined') return;
  
  try {
    // Update the prayer request in the database
    await fetch('/api/prayer/mark-prayed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prayerId }),
    });

    // Update local storage
    const prayed = localStorage.getItem('prayedRequests') || '[]';
    const arr = JSON.parse(prayed);
    if (!arr.includes(prayerId)) {
      arr.push(prayerId);
      localStorage.setItem('prayedRequests', JSON.stringify(arr));
    }
  } catch (error) {
    console.error('Error marking prayer as prayed for:', error);
  }
}

export default function PrayerPage() {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [_, forceUpdate] = useState(0); // for re-render

  useEffect(() => {
    (async () => {
      const { prayerRequests: fetchedRequests } = await getAllPrayerRequests({});
      // Transform the data to match our PrayerRequest type
      const transformedRequests: PrayerRequest[] = fetchedRequests.map(req => ({
        id: req.id,
        title: req.title,
        body: req.body,
        createdAt: new Date(req.createdAt),
        published: req.published,
        authorName: req.authorName || undefined // Convert null to undefined
      }));
      setPrayerRequests(transformedRequests);
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
      {prayerRequests.length > 0 && prayerRequests[0].published && (
        <div className="mb-8 bg-primary/5 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Featured Prayer Request</h2>
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-lg mb-2">{prayerRequests[0].title}</h3>
            <p className="text-muted-foreground mb-3">{prayerRequests[0].body}</p>
            <div className="text-sm text-muted-foreground">
              <span className="block mt-1">
                Posted: {new Date(prayerRequests[0].createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">All Prayer Requests</h1>
      {prayerRequests.length === 0 ? (
        <p className="text-muted-foreground">No public prayer requests found yet.</p>
      ) : (
        <div className="space-y-6">
          {prayerRequests.map((req) => {
            const prayed = hasPrayedFor(req.id);
            return (
              <div key={req.id} className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-2">{req.title}</h2>
                <p className="mb-3 text-muted-foreground">{req.body}</p>
                <div className="text-sm text-muted-foreground mb-4">
                  {req.authorName && <span className="font-medium">{req.authorName} &middot; </span>}
                  {new Date(req.createdAt).toLocaleDateString()}
                </div>
                {!prayed ? (
                  <button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={() => { markPrayedFor(req.id); forceUpdate((n) => n + 1); }}
                  >
                    Pray for this Request
                  </button>
                ) : (
                  <span className="text-primary font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    You have prayed for this request
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}