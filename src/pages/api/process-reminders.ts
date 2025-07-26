import type { NextApiRequest, NextApiResponse } from 'next';
// Import your reminder processing logic
import { EventReminderService } from '../../lib/services/event-reminder-service.new';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await EventReminderService.processReminders();
    res.status(200).json({ message: 'Reminders processed successfully.' });
  } catch (error) {
    console.error('Error processing reminders:', error);
    res.status(500).json({ error: 'Failed to process reminders.' });
  }
}
