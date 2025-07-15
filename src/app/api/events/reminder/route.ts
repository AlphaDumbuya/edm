import { NextRequest, NextResponse } from 'next/server';
import { sendEventReminderEmail } from '../../../../lib/email/sendEventReminderEmail';

export async function POST(req: NextRequest) {
  try {
    const { name, email, event } = await req.json();
    if (!name || !email || !event) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await sendEventReminderEmail({ name, email, event });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Event reminder email error:', error);
    return NextResponse.json({ error: 'Failed to send reminder email' }, { status: 500 });
  }
}
