import { NextRequest, NextResponse } from 'next/server';
import { getAllDonations } from '@/lib/db/donations';
import prisma from '@/lib/db/prisma';
import { z } from 'zod';

// Zod schema for validating incoming donation data
const donationSchema = z.object({
  donorName: z.string().min(1),
  donorEmail: z.string().email(),
  amount: z.number().positive(),
  paymentMethod: z.string(),
  campaign: z.string().optional(),
});

// ✅ GET Handler
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const paymentMethod = searchParams.get('paymentMethod') || undefined;
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Parse and validate orderBy
    const orderByParam = searchParams.get('orderBy');
    let orderBy: { [key: string]: 'asc' | 'desc' } = { createdAt: 'desc' }; // default ordering
    if (orderByParam) {
      const [field, order] = orderByParam.split(':');
      if (field && (order === 'asc' || order === 'desc')) {
        orderBy = { [field]: order };
      }
    }

    const result = await getAllDonations({
      search,
      status,
      paymentMethod,
      offset,
      limit,
      orderBy,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in GET donations API:', error);
    return NextResponse.json({ error: 'Failed to fetch donations.' }, { status: 500 });
  }
}

// ✅ POST Handler
export async function POST(request: NextRequest) {
  try {
    // Ensure Content-Type is application/json
    if (request.headers.get('content-type') !== 'application/json') {
      return NextResponse.json({ error: 'Invalid content type. Expected application/json.' }, { status: 415 });
    }

    const body = await request.json();
    const parsed = donationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid donation data.', details: parsed.error.format() }, { status: 400 });
    }

    const newDonation = await prisma.donation.create({
      data: parsed.data,
    });

    return NextResponse.json({ success: true, donation: newDonation }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating donation in API route:', error); // Log the entire error object
    console.error('Error details:', error.message, error.stack); // Log message and stack trace
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Donation creation failed: Unique constraint failed.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to create donation.' }, { status: 500 });
  }
}
