import { NextRequest, NextResponse } from 'next/server';
import { getDonationById, deleteDonation } from '@/lib/db/donations';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteDonation(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete donation.' }, { status: 500 });
  }
}
