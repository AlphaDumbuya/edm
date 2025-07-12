import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/db/users';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;
  const role = searchParams.get('role') || undefined;
  const search = searchParams.get('search') || '';
  const data = await getAllUsers({ offset, limit, role, search });
  return NextResponse.json({ users: data.users, totalCount: data.totalCount });
}
