import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Session endpoint works!" }, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Keep POST if needed for other auth flows
// import { auth } from "@/lib/auth";
// export const { POST } = auth;