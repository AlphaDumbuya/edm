import { NextRequest, NextResponse } from 'next/server';
import { getDonationById } from '@/lib/db/donations';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const donation = await getDonationById(params.id);
    if (!donation) {
      return NextResponse.json({ error: 'Donation not found.' }, { status: 404 });
    }
    return NextResponse.json({ donation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch donation.' }, { status: 500 });
  }
}
