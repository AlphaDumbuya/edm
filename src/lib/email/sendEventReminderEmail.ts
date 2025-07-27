import { sendBrevoEmail } from './sendBrevoEmail';

export async function sendEventReminderEmail({
  name,
  email,
  event,
  reminderType = '1hour'
}: {
  name: string;
  email: string;
  event: any;
  reminderType?: '1week' | '1day' | '1hour' | '30min';
}) {
  // Parse the event date and time in UTC
  const eventDate = new Date(event.date.toISOString().split('T')[0] + 'T' + event.time + '+00:00');

  // Format the date for display
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format the time for display with timezone
  const formattedTime = `${eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })} (${event.timezone})`;

  const oneWeekHtml = `We're excited that you'll be joining us for <strong>${event.title}</strong> in one week! Please mark your calendar and get ready for a wonderful experience.`;
  const oneDayHtml = `Just 24 hours to go! Your registered event <strong>${event.title}</strong> is happening tomorrow. We hope you're as excited as we are!`;
  const oneHourHtml = `<strong>${event.title}</strong> is starting in one hour! Please prepare to join us soon.`;
  const thirtyMinHtml = `<strong>${event.title}</strong> is starting in 30 minutes! Get ready to join us.`;
  const oneWeekText = `We're excited that you'll be joining us for ${event.title} in one week! Please mark your calendar and get ready for a wonderful experience.`;
  const oneDayText = `Just 24 hours to go! Your registered event ${event.title} is happening tomorrow. We hope you're as excited as we are!`;
  const oneHourText = `${event.title} is starting in one hour! Please prepare to join us soon.`;
  const thirtyMinText = `${event.title} is starting in 30 minutes! Get ready to join us.`;

  const subjectLines = {
    '1week': `Reminder: ${event.title} - One Week to Go!`,
    '1day': `Reminder: ${event.title} - Tomorrow!`,
    '1hour': `Reminder: ${event.title} - Starting in 1 Hour!`,
    '30min': `Reminder: ${event.title} - Starting in 30 Minutes!`
  };

  const mailOptions = {
    to: email,
    from: 'EDM <noreply@edmsingapore.org>',
    subject: subjectLines[reminderType],
    html: `<div style="font-family: Arial, sans-serif;">
      <p>Hi ${name},</p>
      <p>${
        reminderType === '1week'
          ? oneWeekHtml
          : reminderType === '1day'
          ? oneDayHtml
          : reminderType === '1hour'
          ? oneHourHtml
          : thirtyMinHtml
      }</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
        <p style="margin: 5px 0; font-size: 0.9em; color: #666;">All times shown in ${event.timezone}</p>
        ${event.isVirtual === 'true' || event.isVirtual === true
          ? (reminderType === '1hour' || reminderType === '30min'
              ? `<p style="margin: 5px 0;"><strong>Join Event:</strong> <a href="${event.onlineLink}">${event.onlineLink}</a></p>`
              : '<p style="margin: 5px 0;"><em>This is a virtual event. The join link will be sent closer to the event time.</em></p>')
          : `<p style="margin: 5px 0;"><strong>Location:</strong> ${event.location}</p>`}
      </div>
      ${event.description ? `<p style="color: #666;">${event.description}</p>` : ''}
      <p>${reminderType === '1hour' || reminderType === '30min' ? 'See you very soon!' : 'We look forward to seeing you at the event!'}</p>
      <p>Blessings,<br>EDM Team</p>
    </div>`,
    text: `${subjectLines[reminderType]}\n\nHi ${name},\n${
      reminderType === '1week'
        ? oneWeekText
        : reminderType === '1day'
        ? oneDayText
        : reminderType === '1hour'
        ? oneHourText
        : thirtyMinText
    }\n\nDate: ${formattedDate}\nTime: ${formattedTime}\nAll times shown in ${event.timezone}\n\n${
      event.isVirtual === 'true' || event.isVirtual === true
        ? (reminderType === '1hour' || reminderType === '30min')
          ? `Join Event: ${event.onlineLink}`
          : 'Event Type: Virtual Event. The join link will be sent closer to the event time.'
        : `Location: ${event.location}`
    }\n\n${event.description || ''}\n\n${
      reminderType === '1hour' || reminderType === '30min' ? 'See you very soon!' : 'We look forward to seeing you at the event!'
    }\n\nBlessings,\nEDM Team`
  };

  await sendBrevoEmail({
    to: email,
    subject: mailOptions.subject,
    html: mailOptions.html,
    text: mailOptions.text,
  });
}
