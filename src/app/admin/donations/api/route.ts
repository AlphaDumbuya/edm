import { NextRequest, NextResponse } from 'next/server';
import { getAllDonations } from '@/lib/db/donations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const paymentMethod = searchParams.get('paymentMethod') || undefined; // Added paymentMethod based on getAllDonations signature
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Basic parsing for orderBy - assumes format like 'createdAt:desc'
    const orderByParam = searchParams.get('orderBy');
    let orderBy: { [key: string]: 'asc' | 'desc' } | undefined = undefined;
    if (orderByParam) {
      const [field, order] = orderByParam.split(':');
      if (field && (order === 'asc' || order === 'desc')) {
        orderBy = { [field]: order };
      }
    }

    console.log('Received search parameters for donations API:');
    console.log('search:', search);
    console.log('status:', status);
    console.log('paymentMethod:', paymentMethod);
    console.log('offset:', offset);
    console.log('limit:', limit);
    console.log('orderBy:', orderBy);




    const result = await getAllDonations({
      search,
      status,
      paymentMethod,
      offset,
      limit,
      orderBy,
    });

    console.log('Result from getAllDonations:', result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in donations API route:', error);
    return NextResponse.json({ error: 'Failed to fetch donations.' }, { status: 500 });
  }
}

// You might also want to add handlers for other HTTP methods (POST, PUT, DELETE)
// depending on your needs for this API route.