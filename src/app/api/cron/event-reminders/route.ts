import { sendEventReminders } from '@/lib/email/sendEventReminders';

export async function GET(request: Request) {
  try {
    // Verify cron secret
    const cronSecret = request.headers.get('x-cron-secret');
    if (!process.env.CRON_SECRET || cronSecret !== process.env.CRON_SECRET) {
      console.error('Unauthorized cron attempt');
      return new Response('Unauthorized', { status: 401 });
    }

    console.log('Starting event reminder check...');
    await sendEventReminders();
    console.log('Event reminders processed successfully');
    return new Response('Event reminders processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing event reminders:', error);
    return new Response('Error processing event reminders', { status: 500 });
  }
}
