import { NextRequest, NextResponse } from 'next/server';
import { getAllDonations } from '@/lib/db/donations';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const paymentMethod = searchParams.get('paymentMethod') || undefined;
    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');
    const orderByParam = searchParams.get('orderBy');

    const options = {
      search,
      status,
      paymentMethod,
      offset: offset ? parseInt(offset, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      orderBy: orderByParam ? JSON.parse(orderByParam) : undefined,
    };
    const donations = await getAllDonations(options);
    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}