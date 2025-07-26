import { NextResponse } from 'next/server';
import { EventReminderService } from '@/lib/services/event-reminder.service';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    await EventReminderService.processReminders();
    return NextResponse.json({ message: 'Reminders processed successfully' });
  } catch (error) {
    console.error('Error processing reminders:', error);
    return NextResponse.json({ error: 'Failed to process reminders' }, { status: 500 });
  }
}

// Allow this endpoint to be called every minute in development
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
export const revalidate = 0;
