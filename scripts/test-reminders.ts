import { sendEventReminders } from '@/lib/email/sendEventReminders';

async function testReminders() {
  console.log('Testing event reminder system...');
  try {
    await sendEventReminders();
    console.log('Reminder check completed successfully!');
  } catch (error) {
    console.error('Error running reminders:', error);
  }
}

testReminders().catch(console.error);
