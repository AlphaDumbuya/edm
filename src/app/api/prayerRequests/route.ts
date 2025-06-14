// src/app/api/prayerRequests/route.ts
import { getAllPrayerRequests } from '@/lib/db/prayerRequests';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { prayerRequests } = await getAllPrayerRequests();
    return NextResponse.json(prayerRequests);
  } catch (error) {
    console.error('Error in API route fetching prayer requests:', error);
    return NextResponse.json({ message: 'Failed to fetch prayer requests' }, { status: 500 });
  }
}