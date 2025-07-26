export type ReminderType = '1hour' | '1day' | '1week';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  isVirtual: boolean;
  onlineLink?: string;
}

export interface EventRegistration {
  id: string;
  name: string;
  email: string;
  eventId: string;
  status: 'REGISTERED' | 'CANCELLED';
  reminderSentAt?: Date | null;
  lastReminderType?: ReminderType | null;
  event: Event;
}
