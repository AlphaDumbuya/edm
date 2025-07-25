import { NextResponse } from 'next/server';
import { EventReminderService } from '@/lib/services/event-reminder.service';

export const runtime = 'edge';
export const preferredRegion = 'iad1';
export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    // Verify request is authorized
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Process reminders
    await EventReminderService.processReminders();
    
    return new NextResponse('Reminders processed successfully', { status: 200 });
  } catch (error) {
    console.error('Failed to process reminders:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
