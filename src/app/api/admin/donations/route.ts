import { NextRequest, NextResponse } from 'next/server';
import { getAllDonations, createDonation } from '@/lib/db/donations';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const paymentMethod = searchParams.get('paymentMethod') || undefined;
    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');
    const orderByParam = searchParams.get('orderBy');

    // Robust orderBy parsing
    let orderBy: any = undefined;
    if (orderByParam) {
      if (orderByParam.includes(':')) {
        const [field, dir] = orderByParam.split(':');
        orderBy = { [field]: dir };
      } else {
        try {
          orderBy = JSON.parse(orderByParam);
        } catch {
          orderBy = undefined;
        }
      }
    }

    const options = {
      search,
      status,
      paymentMethod,
      offset: offset ? parseInt(offset, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      orderBy,
    };
    const donations = await getAllDonations(options);
    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Only allow certain fields
    const { donorName, donorEmail, amount, paymentMethod, campaign } = body;
    if (!donorName || !donorEmail || !amount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    const donation = await createDonation({
      donorName,
      donorEmail,
      amount: Number(amount),
      paymentMethod,
      campaign,
    });
    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 });
  }
}
